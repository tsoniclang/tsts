/**
 * Checker tracing.
 *
 * Port of TS-Go `internal/checker/tracer.go`. A CheckerTracer is the
 * checker-local wrapper over a tracing session: every emitted event carries the
 * checker id, and type records are exposed through a typed adapter that mirrors
 * TS-Go's `tracing.TracedType` view over checker Type objects.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import {
  ObjectFlags,
  TypeFlags,
  asConditionalType,
  asEvolvingArrayType,
  asIndexType,
  asIndexedAccessType,
  asIntrinsicType,
  asIntersectionType,
  asReverseMappedType,
  asSubstitutionType,
  asTypeReference,
  asUnionType,
  formatTypeFlags,
  type Type,
} from "./types.js";

export type TracePhase = string;

export interface TraceEvent {
  readonly phase: TracePhase;
  readonly name: string;
  readonly args: Record<string, unknown>;
  readonly separateBeginAndEnd: boolean;
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

export interface TypeTraceRecorder {
  recordType(type: TracedType): void;
}

export interface TracingSession {
  newTypeTracer(checkerIndex: number): TypeTraceRecorder;
  push(phase: TracePhase, name: string, args: Record<string, unknown>, separateBeginAndEnd: boolean): () => void;
  instant(phase: TracePhase, name: string, args: Record<string, unknown>): void;
}

export interface CheckerTraceHost {
  typeToString(type: Type): string;
}

export class CheckerTracer {
  readonly tracing: TracingSession;
  readonly recorder: TypeTraceRecorder;
  readonly checkerIndex: number;

  constructor(tracing: TracingSession, checkerIndex: number) {
    this.tracing = tracing;
    this.recorder = tracing.newTypeTracer(checkerIndex);
    this.checkerIndex = checkerIndex;
  }

  recordType(type: Type): void {
    this.recorder.recordType(wrapType(type));
  }

  push(phase: TracePhase, name: string, args: Record<string, unknown> = {}, separateBeginAndEnd = false): () => void {
    if (!separateBeginAndEnd) {
      return this.tracing.push(phase, name, this.copyWithCheckerIndex(args), separateBeginAndEnd);
    }
    const [beginArgs, restoreBeginArgs] = this.temporarilyAddCheckerIndex(args);
    const pop = this.tracing.push(phase, name, beginArgs, separateBeginAndEnd);
    restoreBeginArgs();
    return () => {
      const [, restoreEndArgs] = this.temporarilyAddCheckerIndex(beginArgs);
      try {
        pop();
      } finally {
        restoreEndArgs();
      }
    };
  }

  instant(phase: TracePhase, name: string, args: Record<string, unknown> = {}): void {
    this.tracing.instant(phase, name, this.copyWithCheckerIndex(args));
  }

  copyWithCheckerIndex(args: Record<string, unknown>): Record<string, unknown> {
    return { ...args, checkerId: this.checkerIndex };
  }

  temporarilyAddCheckerIndex(args: Record<string, unknown> = {}): [Record<string, unknown>, () => void] {
    const previous = args["checkerId"];
    const hadPrevious = Object.hasOwn(args, "checkerId");
    args["checkerId"] = this.checkerIndex;
    return [args, () => {
      if (hadPrevious) {
        args["checkerId"] = previous;
      } else {
        delete args["checkerId"];
      }
    }];
  }
}

export function newTracer(tracing: TracingSession, checkerIndex: number): CheckerTracer {
  return new CheckerTracer(tracing, checkerIndex);
}

export class InMemoryTracingSession implements TracingSession, TypeTraceRecorder {
  readonly events: TraceEvent[] = [];
  readonly types: TracedType[] = [];

  newTypeTracer(_checkerIndex: number): TypeTraceRecorder {
    return this;
  }

  recordType(type: TracedType): void {
    this.types.push(type);
  }

  push(phase: TracePhase, name: string, args: Record<string, unknown>, separateBeginAndEnd: boolean): () => void {
    this.events.push({ phase, name, args: { ...args }, separateBeginAndEnd });
    return () => {
      this.events.push({ phase, name: `${name}:end`, args: { ...args }, separateBeginAndEnd });
    };
  }

  instant(phase: TracePhase, name: string, args: Record<string, unknown>): void {
    this.events.push({ phase, name, args: { ...args }, separateBeginAndEnd: false });
  }
}

class TracedTypeAdapter implements TracedType {
  readonly type: Type;
  readonly checker: CheckerTraceHost | undefined;

  constructor(type: Type, checker?: CheckerTraceHost) {
    this.type = type;
    this.checker = checker;
  }

  id(): number {
    return this.type.id;
  }

  formatFlags(): readonly string[] {
    const formatted = formatTypeFlags(this.type.flags);
    return formatted === "None" ? [] : formatted.split("|");
  }

  isConditional(): boolean {
    return (this.type.flags & TypeFlags.Conditional) !== 0;
  }

  symbol(): AstSymbol | undefined {
    return this.type.symbol;
  }

  aliasSymbol(): AstSymbol | undefined {
    return this.type.aliasSymbol;
  }

  aliasTypeArguments(): readonly TracedType[] | undefined {
    return wrapTypes(this.type.aliasTypeArguments);
  }

  intrinsicName(): string {
    return asIntrinsicType(this.type)?.intrinsicName ?? "";
  }

  unionTypes(): readonly TracedType[] | undefined {
    return wrapTypes(asUnionType(this.type)?.types);
  }

  intersectionTypes(): readonly TracedType[] | undefined {
    return wrapTypes(asIntersectionType(this.type)?.types);
  }

  indexType(): TracedType | undefined {
    return wrapOptionalType(asIndexType(this.type)?.type);
  }

  indexedAccessObjectType(): TracedType | undefined {
    return wrapOptionalType(asIndexedAccessType(this.type)?.objectType);
  }

  indexedAccessIndexType(): TracedType | undefined {
    return wrapOptionalType(asIndexedAccessType(this.type)?.indexType);
  }

  conditionalCheckType(): TracedType | undefined {
    return wrapOptionalType(conditionalData(this.type)?.checkType);
  }

  conditionalExtendsType(): TracedType | undefined {
    return wrapOptionalType(conditionalData(this.type)?.extendsType);
  }

  conditionalTrueType(): TracedType | undefined {
    const data = conditionalData(this.type);
    return wrapOptionalType(data?.resolvedTrueType ?? data?.trueType);
  }

  conditionalFalseType(): TracedType | undefined {
    const data = conditionalData(this.type);
    return wrapOptionalType(data?.resolvedFalseType ?? data?.falseType);
  }

  substitutionBaseType(): TracedType | undefined {
    return wrapOptionalType(substitutionData(this.type)?.baseType);
  }

  substitutionConstraintType(): TracedType | undefined {
    return wrapOptionalType(substitutionData(this.type)?.constraint);
  }

  referenceTarget(): TracedType | undefined {
    return wrapUnknownType(asTypeReference(this.type)?.target);
  }

  referenceTypeArguments(): readonly TracedType[] | undefined {
    return wrapTypes(asTypeReference(this.type)?.resolvedTypeArguments ?? asTypeReference(this.type)?.resolvedTypeArguments_);
  }

  referenceNode(): AstNode | undefined {
    return (asTypeReference(this.type) as { readonly node?: AstNode } | undefined)?.node;
  }

  reverseMappedSourceType(): TracedType | undefined {
    return wrapOptionalType(asReverseMappedType(this.type)?.source);
  }

  reverseMappedMappedType(): TracedType | undefined {
    return wrapUnknownType(asReverseMappedType(this.type)?.mappedType);
  }

  reverseMappedConstraintType(): TracedType | undefined {
    return wrapOptionalType(asReverseMappedType(this.type)?.constraintType);
  }

  evolvingArrayElementType(): TracedType | undefined {
    return wrapOptionalType(asEvolvingArrayType(this.type)?.elementType);
  }

  evolvingArrayFinalType(): TracedType | undefined {
    return wrapOptionalType(asEvolvingArrayType(this.type)?.finalArrayType);
  }

  isTuple(): boolean {
    return ((this.type.data as { readonly objectFlags?: number } | undefined)?.objectFlags ?? 0) & ObjectFlags.Tuple ? true : false;
  }

  pattern(): AstNode | undefined {
    return this.type.pattern;
  }

  recursionIdentity(): unknown {
    return this.type.symbol ?? this.type.aliasSymbol ?? this.type.pattern ?? this.type.id;
  }

  display(): string {
    if (this.checker === undefined) return "";
    const objectFlags = (this.type.data as { readonly objectFlags?: number } | undefined)?.objectFlags ?? 0;
    if ((objectFlags & ObjectFlags.Anonymous) === 0
      && (this.type.flags & (TypeFlags.Literal | TypeFlags.TemplateLiteral | TypeFlags.Union | TypeFlags.Intersection)) === 0) {
      return "";
    }
    try {
      return this.checker.typeToString(this.type);
    } catch {
      return "";
    }
  }
}

export function wrapType(type: Type, checker?: CheckerTraceHost): TracedType {
  return new TracedTypeAdapter(type, checker);
}

export function wrapTypes(types: readonly Type[] | undefined, checker?: CheckerTraceHost): readonly TracedType[] | undefined {
  return types === undefined || types.length === 0 ? undefined : types.map((type) => wrapType(type, checker));
}

function wrapOptionalType(type: Type | undefined): TracedType | undefined {
  return type === undefined ? undefined : wrapType(type);
}

function wrapUnknownType(value: unknown): TracedType | undefined {
  return isType(value) ? wrapType(value) : undefined;
}

function isType(value: unknown): value is Type {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly flags?: unknown }).flags === "number"
    && typeof (value as { readonly id?: unknown }).id === "number";
}

function conditionalData(type: Type): {
  readonly checkType?: Type;
  readonly extendsType?: Type;
  readonly trueType?: Type;
  readonly falseType?: Type;
  readonly resolvedTrueType?: Type;
  readonly resolvedFalseType?: Type;
} | undefined {
  return asConditionalType(type) as {
    readonly checkType?: Type;
    readonly extendsType?: Type;
    readonly trueType?: Type;
    readonly falseType?: Type;
    readonly resolvedTrueType?: Type;
    readonly resolvedFalseType?: Type;
  } | undefined;
}

function substitutionData(type: Type): {
  readonly baseType?: Type;
  readonly constraint?: Type;
} | undefined {
  return asSubstitutionType(type) as {
    readonly baseType?: Type;
    readonly constraint?: Type;
  } | undefined;
}
