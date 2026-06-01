/**
 * Trace-event writer and type tracer.
 *
 * Port of TS-Go `internal/tracing/tracing.go`. The implementation writes
 * Chrome trace-event JSON, preserves deterministic timestamps for baselines,
 * assigns stable thread IDs by checker/file key, and dumps checker type
 * descriptors through a checker-independent `TracedType` interface.
 */

import type { Node as AstNode, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import {
  getECMALineAndUTF16CharacterOfPosition,
  getSourceFileOfNode,
  nodeEnd,
  nodePos,
} from "../ast/index.js";
import { combinePaths, toPath } from "../tspath/index.js";
import type { FS } from "../vfs/index.js";

export interface Tracer {
  recordType(type: TracedType): void;
  dumpTypes(): Error | undefined;
}

export interface TracedType {
  id(): number;
  formatFlags(): readonly string[];
  isConditional(): boolean;
  symbol(): AstSymbol | undefined;
  aliasSymbol(): AstSymbol | undefined;
  aliasTypeArguments(): readonly TracedType[] | undefined;
  intrinsicName(): string;
  unionTypes(): readonly TracedType[] | undefined;
  intersectionTypes(): readonly TracedType[] | undefined;
  indexType(): TracedType | undefined;
  indexedAccessObjectType(): TracedType | undefined;
  indexedAccessIndexType(): TracedType | undefined;
  conditionalCheckType(): TracedType | undefined;
  conditionalExtendsType(): TracedType | undefined;
  conditionalTrueType(): TracedType | undefined;
  conditionalFalseType(): TracedType | undefined;
  substitutionBaseType(): TracedType | undefined;
  substitutionConstraintType(): TracedType | undefined;
  referenceTarget(): TracedType | undefined;
  referenceTypeArguments(): readonly TracedType[] | undefined;
  referenceNode(): AstNode | undefined;
  reverseMappedSourceType(): TracedType | undefined;
  reverseMappedMappedType(): TracedType | undefined;
  reverseMappedConstraintType(): TracedType | undefined;
  evolvingArrayElementType(): TracedType | undefined;
  evolvingArrayFinalType(): TracedType | undefined;
  isTuple(): boolean;
  pattern(): AstNode | undefined;
  recursionIdentity(): unknown;
  display(): string;
}

export interface TraceRecord {
  readonly configFilePath?: string;
  readonly tracePath?: string;
  readonly typesPath?: string;
  readonly checkerId: number;
}

export interface TraceEvent {
  readonly pid: number;
  readonly tid: number;
  readonly ph: string;
  readonly cat: string;
  readonly ts: number;
  readonly name?: string;
  readonly s?: string;
  readonly dur?: number;
  readonly args?: Record<string, unknown>;
}

export const sampleIntervalMilliseconds = 10;
export const traceFileName = "trace.json";

const mainThreadId = 1;
const firstSyntheticThreadId = 2;
const firstFileThreadId = 1_000_000;
const fileThreadIdHashRange = 1_000_000_000;
const traceThreadArgKeys = ["path", "fileName", "containingFileName", "jsFilePath", "declarationFilePath"] as const;

export type Phase =
  | "parse"
  | "program"
  | "bind"
  | "check"
  | "checkTypes"
  | "emit"
  | "session";

export const phaseParse: Phase = "parse";
export const phaseProgram: Phase = "program";
export const phaseBind: Phase = "bind";
export const phaseCheck: Phase = "check";
export const phaseCheckTypes: Phase = "checkTypes";
export const phaseEmit: Phase = "emit";
export const phaseSession: Phase = "session";

export class Tracing {
  private readonly fs: FS;
  private readonly traceDir: string;
  private readonly tracePath: string;
  private readonly configFilePath: string;
  private readonly legend: TraceRecord[] = [];
  private readonly tracers: TypeTracer[] = [];
  private traceContent = "";
  private traceStarted = false;
  private readonly threadIds = new Map<string, number>();
  private readonly threadKeys = new Map<number, TraceThreadKey>();
  private metadataTimestamp = 0;
  private readonly deterministic: boolean;
  private timestampCounter = 0;
  private readonly startTime = Date.now();
  private flushError: Error | undefined;

  constructor(fs: FS, traceDir: string, configFilePath: string, deterministic: boolean) {
    this.fs = fs;
    this.traceDir = traceDir;
    this.tracePath = combinePaths(traceDir, traceFileName);
    this.configFilePath = configFilePath;
    this.deterministic = deterministic;
  }

  start(): Error | undefined {
    this.traceStarted = true;
    this.traceContent = "[\n";
    const timestamp = this.timestamp();
    this.metadataTimestamp = timestamp;
    this.writeEvent({ pid: 1, tid: mainThreadId, ph: "M", cat: "__metadata", ts: timestamp, name: "process_name", args: { name: "tsgo" } });
    this.traceContent += ",\n";
    this.writeEvent({ pid: 1, tid: mainThreadId, ph: "M", cat: "__metadata", ts: timestamp, name: "thread_name", args: { name: "Main" } });
    this.traceContent += ",\n";
    this.writeEvent({ pid: 1, tid: mainThreadId, ph: "M", cat: "disabled-by-default-devtools.timeline", ts: timestamp, name: "TracingStartedInBrowser" });
    try {
      this.fs.writeFile(this.tracePath, this.traceContent);
      this.traceContent = "";
      return undefined;
    } catch (error) {
      this.traceStarted = false;
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  instant(phase: Phase, name: string, args: Record<string, unknown>): void {
    if (!this.traceStarted) return;
    const timestamp = this.timestamp();
    const tid = this.threadId(args);
    this.traceContent += ",\n";
    this.writeEvent({ pid: 1, tid, ph: "I", cat: phase, ts: timestamp, name, s: "g", args });
    this.maybeFlush();
  }

  push(phase: Phase, name: string, args: Record<string, unknown>, separateBeginAndEnd: boolean): () => void {
    if (!this.traceStarted) return () => {};
    if (separateBeginAndEnd) {
      const timestamp = this.timestamp();
      const tid = this.threadId(args);
      this.traceContent += ",\n";
      this.writeEvent({ pid: 1, tid, ph: "B", cat: phase, ts: timestamp, name, args });
      this.maybeFlush();
      return () => {
        if (!this.traceStarted) return;
        this.traceContent += ",\n";
        this.writeEvent({ pid: 1, tid, ph: "E", cat: phase, ts: this.timestamp(), name, args });
        this.maybeFlush();
      };
    }
    if (this.deterministic) return () => {};
    const startTime = Date.now();
    const startMicros = (startTime - this.startTime) * 1000;
    const clonedArgs = { ...args };
    return () => {
      const duration = (Date.now() - startTime) * 1000;
      const intervalMicros = sampleIntervalMilliseconds * 1000;
      if (intervalMicros - (startMicros % intervalMicros) > duration) return;
      if (!this.traceStarted) return;
      const tid = this.threadId(clonedArgs);
      this.traceContent += ",\n";
      this.writeEvent({ pid: 1, tid, ph: "X", cat: phase, ts: startMicros, name, dur: duration, args: clonedArgs });
      this.maybeFlush();
    };
  }

  newTypeTracer(checkerIndex: number): Tracer {
    const typesPath = combinePaths(this.traceDir, `types_${checkerIndex}.json`);
    const tracer = new TypeTracer(this.fs, checkerIndex, typesPath);
    this.tracers.push(tracer);
    this.legend.push({
      configFilePath: this.configFilePath,
      tracePath: this.tracePath,
      typesPath,
      checkerId: checkerIndex,
    });
    return tracer;
  }

  stopTracing(): Error | undefined {
    for (const tracer of this.tracers) {
      const error = tracer.dumpTypes();
      if (error !== undefined) return new Error(`failed to dump types for checker ${tracer.checkerIndex}: ${error.message}`);
    }
    if (this.traceStarted) {
      if (this.flushError !== undefined) {
        this.traceContent = "";
        this.traceStarted = false;
        return this.flushError;
      }
      try {
        this.fs.appendFile(this.tracePath, `${this.traceContent}\n]\n`);
        this.traceContent = "";
        this.traceStarted = false;
      } catch (error) {
        return error instanceof Error ? error : new Error(String(error));
      }
    }
    this.legend.sort((left, right) => (left.typesPath ?? "").localeCompare(right.typesPath ?? ""));
    try {
      this.fs.writeFile(combinePaths(this.traceDir, "legend.json"), JSON.stringify(this.legend, undefined, 2));
      return undefined;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  private timestamp(): number {
    if (this.deterministic) {
      this.timestampCounter += 1;
      return this.timestampCounter;
    }
    return (Date.now() - this.startTime) * 1000;
  }

  private writeEvent(event: TraceEvent): void {
    this.traceContent += JSON.stringify(omitEmpty(event));
  }

  private maybeFlush(): void {
    if (this.flushError !== undefined) {
      this.traceContent = "";
      return;
    }
    if (this.traceContent.length < 256 * 1024) return;
    try {
      this.fs.appendFile(this.tracePath, this.traceContent);
    } catch (error) {
      this.flushError = error instanceof Error ? error : new Error(String(error));
    }
    this.traceContent = "";
  }

  private threadId(args: Record<string, unknown>): number {
    const key = traceThreadKeyFromArgs(args);
    if (key === undefined) return mainThreadId;
    const keyText = traceThreadKeyText(key);
    const existing = this.threadIds.get(keyText);
    if (existing !== undefined) return existing;
    let tid = defaultThreadId(key);
    for (;;) {
      const existingKey = this.threadKeys.get(tid);
      if (existingKey === undefined || traceThreadKeyText(existingKey) === keyText) break;
      tid += 1;
    }
    this.threadIds.set(keyText, tid);
    this.threadKeys.set(tid, key);
    this.writeThreadNameEvent(tid, displayThreadName(key));
    return tid;
  }

  private writeThreadNameEvent(tid: number, name: string): void {
    this.traceContent += ",\n";
    this.writeEvent({ pid: 1, tid, ph: "M", cat: "__metadata", ts: this.metadataTimestamp, name: "thread_name", args: { name } });
  }
}

export function startTracing(fs: FS, traceDir: string, configFilePath: string, deterministic: boolean): { readonly tracing?: Tracing; readonly error?: Error } {
  const tracing = new Tracing(fs, traceDir, configFilePath, deterministic);
  const error = tracing.start();
  return error === undefined ? { tracing } : { error };
}

export function writeEventTo(event: TraceEvent): string {
  return JSON.stringify(omitEmpty(event));
}

export function traceEventName(event: TraceEvent): string {
  return event.name ?? "";
}

export function traceEventArgs(event: TraceEvent): ReadonlyMap<string, unknown> {
  return new Map(Object.entries(event.args ?? {}));
}

export function isDurationBeginEvent(event: TraceEvent): boolean {
  return event.ph === "B";
}

export function isDurationEndEvent(event: TraceEvent): boolean {
  return event.ph === "E";
}

export function isInstantEvent(event: TraceEvent): boolean {
  return event.ph === "I";
}

export function isCompleteDurationEvent(event: TraceEvent): boolean {
  return event.ph === "X";
}

export function compareTraceRecords(left: TraceRecord, right: TraceRecord): number {
  return (left.typesPath ?? "").localeCompare(right.typesPath ?? "")
    || left.checkerId - right.checkerId
    || (left.tracePath ?? "").localeCompare(right.tracePath ?? "")
    || (left.configFilePath ?? "").localeCompare(right.configFilePath ?? "");
}

export function sortTraceRecords(records: readonly TraceRecord[]): readonly TraceRecord[] {
  return [...records].sort(compareTraceRecords);
}

export function traceEventsAreWellNested(events: readonly TraceEvent[]): boolean {
  const stacks = new Map<number, TraceEvent[]>();
  for (const event of events) {
    if (isDurationBeginEvent(event)) {
      stacks.set(event.tid, [...stacks.get(event.tid) ?? [], event]);
      continue;
    }
    if (isDurationEndEvent(event)) {
      const stack = stacks.get(event.tid) ?? [];
      const begin = stack.at(-1);
      if (begin === undefined || begin.cat !== event.cat || begin.name !== event.name) return false;
      stacks.set(event.tid, stack.slice(0, -1));
    }
  }
  return [...stacks.values()].every(stack => stack.length === 0);
}

export function findTraceEvent(events: readonly TraceEvent[], phase: string, name: string, argName: string, argValue: unknown): TraceEvent | undefined {
  return events.find(event => event.ph === phase && event.name === name && event.args?.[argName] === argValue);
}

interface TraceThreadKey {
  readonly kind: "checker" | "file";
  readonly text: string;
  readonly index: number;
  readonly hasIndex: boolean;
}

function traceThreadKeyFromArgs(args: Record<string, unknown>): TraceThreadKey | undefined {
  const checkerId = args["checkerId"];
  if (typeof checkerId === "number") return { kind: "checker", text: "", index: checkerId, hasIndex: true };
  for (const key of traceThreadArgKeys) {
    const value = args[key];
    if (typeof value === "string" && value !== "") return { kind: "file", text: value, index: 0, hasIndex: false };
  }
  return undefined;
}

function traceThreadKeyText(key: TraceThreadKey): string {
  return key.hasIndex ? `${key.kind}:${key.index}` : `${key.kind}:${key.text}`;
}

function defaultThreadId(key: TraceThreadKey): number {
  if (key.kind === "checker" && key.hasIndex && key.index >= 0) return firstSyntheticThreadId + key.index;
  return stableTraceThreadId(key);
}

function displayThreadName(key: TraceThreadKey): string {
  return traceThreadKeyText(key);
}

function stableTraceThreadId(key: TraceThreadKey): number {
  return firstFileThreadId + (stableHash(traceThreadKeyText(key)) % fileThreadIdHashRange);
}

function stableHash(text: string): number {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
}

export function mapTypeIds(types: readonly TracedType[] | undefined): readonly number[] | undefined {
  if (types === undefined || types.length === 0) return undefined;
  return types.map(type => type.id());
}

export function traceLocationText(location: Location | undefined): string {
  if (location === undefined) return "";
  const start = location.start === undefined ? "" : `${location.start.line}:${location.start.character}`;
  const end = location.end === undefined ? "" : `${location.end.line}:${location.end.character}`;
  return `${location.path}${start === "" ? "" : `:${start}`}${end === "" ? "" : `-${end}`}`;
}

export function traceDescriptorKey(descriptor: TypeDescriptor): string {
  return [
    descriptor.id,
    descriptor.symbolName ?? "",
    descriptor.intrinsicName ?? "",
    descriptor.flags.join("|"),
    descriptor.recursionId ?? "",
  ].join(":");
}

export function sortTypeDescriptors(descriptors: readonly TypeDescriptor[]): readonly TypeDescriptor[] {
  return [...descriptors].sort((left, right) => left.id - right.id || traceDescriptorKey(left).localeCompare(traceDescriptorKey(right)));
}

export function groupTraceEventsByThread(events: readonly TraceEvent[]): ReadonlyMap<number, readonly TraceEvent[]> {
  const result = new Map<number, TraceEvent[]>();
  for (const event of events) {
    const list = result.get(event.tid) ?? [];
    result.set(event.tid, [...list, event]);
  }
  return result;
}

export function threadNameEvents(events: readonly TraceEvent[]): ReadonlyMap<number, string> {
  const result = new Map<number, string>();
  for (const event of events) {
    if (event.ph === "M" && event.name === "thread_name") {
      const name = event.args?.["name"];
      if (typeof name === "string") result.set(event.tid, name);
    }
  }
  return result;
}

export function traceEventsForPhase(events: readonly TraceEvent[], phase: Phase): readonly TraceEvent[] {
  return events.filter(event => event.cat === phase);
}

export function traceDurationEvents(events: readonly TraceEvent[]): readonly TraceEvent[] {
  return events.filter(event => isDurationBeginEvent(event) || isDurationEndEvent(event) || isCompleteDurationEvent(event));
}

export function traceInstantEvents(events: readonly TraceEvent[]): readonly TraceEvent[] {
  return events.filter(isInstantEvent);
}

export function traceEventDurationMicros(event: TraceEvent): number {
  return event.dur ?? 0;
}

export function totalTraceDurationMicros(events: readonly TraceEvent[]): number {
  return events.reduce((sum, event) => sum + traceEventDurationMicros(event), 0);
}

export function traceRecordForChecker(records: readonly TraceRecord[], checkerId: number): TraceRecord | undefined {
  return records.find(record => record.checkerId === checkerId);
}

export function traceTypeDescriptorById(descriptors: readonly TypeDescriptor[], id: number): TypeDescriptor | undefined {
  return descriptors.find(descriptor => descriptor.id === id);
}

class TypeTracer implements Tracer {
  readonly checkerIndex: number;
  private readonly fs: FS;
  private readonly typesPath: string;
  private readonly types: TracedType[] = [];

  constructor(fs: FS, checkerIndex: number, typesPath: string) {
    this.fs = fs;
    this.checkerIndex = checkerIndex;
    this.typesPath = typesPath;
  }

  recordType(type: TracedType): void {
    this.types.push(type);
  }

  dumpTypes(): Error | undefined {
    if (this.types.length === 0) return undefined;
    const recursionIdentityMap = new Map<unknown, number>();
    const descriptors = this.types.map(type => buildTypeDescriptor(type, recursionIdentityMap));
    try {
      this.fs.writeFile(this.typesPath, `${JSON.stringify(descriptors)}\n`);
      return undefined;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }
}

export interface TypeDescriptor {
  readonly id: number;
  readonly intrinsicName?: string;
  readonly symbolName?: string;
  readonly recursionId?: number;
  readonly isTuple?: boolean;
  readonly unionTypes?: readonly number[];
  readonly intersectionTypes?: readonly number[];
  readonly aliasTypeArguments?: readonly number[];
  readonly keyofType?: number;
  readonly indexedAccessObjectType?: number;
  readonly indexedAccessIndexType?: number;
  readonly conditionalCheckType?: number;
  readonly conditionalExtendsType?: number;
  readonly conditionalTrueType?: number;
  readonly conditionalFalseType?: number;
  readonly substitutionBaseType?: number;
  readonly constraintType?: number;
  readonly instantiatedType?: number;
  readonly typeArguments?: readonly number[];
  readonly referenceLocation?: Location;
  readonly reverseMappedSourceType?: number;
  readonly reverseMappedMappedType?: number;
  readonly reverseMappedConstraintType?: number;
  readonly evolvingArrayElementType?: number;
  readonly evolvingArrayFinalType?: number;
  readonly destructuringPattern?: Location;
  readonly firstDeclaration?: Location;
  readonly flags: readonly string[];
  readonly display?: string;
}

export interface Location {
  readonly path: string;
  readonly start?: LineAndChar;
  readonly end?: LineAndChar;
}

export interface LineAndChar {
  readonly line: number;
  readonly character: number;
}

function buildTypeDescriptor(type: TracedType, recursionIdentityMap: Map<unknown, number>): TypeDescriptor {
  const symbol = type.symbol();
  const aliasSymbol = type.aliasSymbol();
  const descriptor: MutableTypeDescriptor = {
    id: type.id(),
    flags: type.formatFlags(),
  };
  const recursionIdentity = type.recursionIdentity();
  if (recursionIdentity !== undefined && recursionIdentity !== null) {
    let token = recursionIdentityMap.get(recursionIdentity);
    if (token === undefined) {
      token = recursionIdentityMap.size;
      recursionIdentityMap.set(recursionIdentity, token);
    }
    descriptor.recursionId = token;
  }
  setString(descriptor, "intrinsicName", type.intrinsicName());
  const symbolName = aliasSymbol?.name ?? aliasSymbol?.escapedName ?? symbol?.name ?? symbol?.escapedName;
  setString(descriptor, "symbolName", symbolName);
  if (type.isTuple()) descriptor.isTuple = true;
  setIds(descriptor, "unionTypes", type.unionTypes());
  setIds(descriptor, "intersectionTypes", type.intersectionTypes());
  setIds(descriptor, "aliasTypeArguments", type.aliasTypeArguments());
  setId(descriptor, "keyofType", type.indexType());
  setId(descriptor, "indexedAccessObjectType", type.indexedAccessObjectType());
  setId(descriptor, "indexedAccessIndexType", type.indexedAccessIndexType());
  if (type.isConditional()) {
    setId(descriptor, "conditionalCheckType", type.conditionalCheckType());
    setId(descriptor, "conditionalExtendsType", type.conditionalExtendsType());
    descriptor.conditionalTrueType = type.conditionalTrueType()?.id() ?? -1;
    descriptor.conditionalFalseType = type.conditionalFalseType()?.id() ?? -1;
  }
  setId(descriptor, "substitutionBaseType", type.substitutionBaseType());
  setId(descriptor, "constraintType", type.substitutionConstraintType());
  setId(descriptor, "instantiatedType", type.referenceTarget());
  setIds(descriptor, "typeArguments", type.referenceTypeArguments());
  setLocation(descriptor, "referenceLocation", type.referenceNode());
  setId(descriptor, "reverseMappedSourceType", type.reverseMappedSourceType());
  setId(descriptor, "reverseMappedMappedType", type.reverseMappedMappedType());
  setId(descriptor, "reverseMappedConstraintType", type.reverseMappedConstraintType());
  setId(descriptor, "evolvingArrayElementType", type.evolvingArrayElementType());
  setId(descriptor, "evolvingArrayFinalType", type.evolvingArrayFinalType());
  setLocation(descriptor, "destructuringPattern", type.pattern());
  const firstDeclarationSymbol = aliasSymbol ?? symbol;
  setLocation(descriptor, "firstDeclaration", firstDeclarationSymbol?.declarations[0]);
  setString(descriptor, "display", type.display());
  return descriptor;
}

type MutableTypeDescriptor = {
  -readonly [K in keyof TypeDescriptor]?: TypeDescriptor[K];
} & { id: number; flags: readonly string[] };

function setString(target: MutableTypeDescriptor, key: keyof TypeDescriptor, value: string | undefined): void {
  if (value !== undefined && value !== "") {
    Object.assign(target, { [key]: value });
  }
}

function setId(target: MutableTypeDescriptor, key: keyof TypeDescriptor, type: TracedType | undefined): void {
  if (type !== undefined) Object.assign(target, { [key]: type.id() });
}

function setIds(target: MutableTypeDescriptor, key: keyof TypeDescriptor, types: readonly TracedType[] | undefined): void {
  if (types !== undefined && types.length > 0) Object.assign(target, { [key]: types.map(type => type.id()) });
}

function setLocation(target: MutableTypeDescriptor, key: keyof TypeDescriptor, node: AstNode | undefined): void {
  const location = getLocation(node);
  if (location !== undefined) Object.assign(target, { [key]: location });
}

function getLocation(node: AstNode | undefined): Location | undefined {
  if (node === undefined) return undefined;
  const file = getSourceFileOfNode(node) as SourceFile | undefined;
  if (file === undefined) return undefined;
  const start = getECMALineAndUTF16CharacterOfPosition(file, nodePos(node));
  const end = getECMALineAndUTF16CharacterOfPosition(file, nodeEnd(node));
  return {
    path: toPath(file.fileName, "", false),
    start: { line: start.line + 1, character: start.character + 1 },
    end: { line: end.line + 1, character: end.character + 1 },
  };
}

function omitEmpty(event: TraceEvent): Record<string, unknown> {
  const result: Record<string, unknown> = {
    pid: event.pid,
    tid: event.tid,
    ph: event.ph,
    cat: event.cat,
    ts: event.ts,
  };
  if (event.name !== undefined && event.name !== "") result["name"] = event.name;
  if (event.s !== undefined && event.s !== "") result["s"] = event.s;
  if (event.dur !== undefined) result["dur"] = event.dur;
  if (event.args !== undefined && Object.keys(event.args).length > 0) result["args"] = event.args;
  return result;
}
