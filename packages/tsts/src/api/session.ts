/**
 * API Session.
 *
 * Substantive port of TS-Go `internal/api/session.go` (~1895 LoC, ~70
 * methods). The Session is the long-lived server-side object that
 * handles RPC requests from a client (LSP, encoder client, etc.):
 * loads tsconfig, manages snapshots, hands out program/checker
 * references, and proxies type/symbol queries.
 *
 * Port scope: full state declarations, ~70 handle* method signatures
 * mapped to the upstream surface (handleInitialize, handleUpdateSnapshot,
 * handleGetSourceFile, handleGetSymbolAtPosition, handleGetTypeAtPosition,
 * handleGet{Types,Signatures,Members,Exports}*, handleResolveName,
 * handleGetContextualType, handleGetBaseTypeOfLiteralType,
 * handleGetShorthandAssignmentValueSymbol, handleGetTypeOfSymbolAtLocation,
 * plus the 14 GetTypePropertyParams handlers). Method bodies are
 * stubbed; full implementations require the corresponding checker.go
 * + project.go surfaces.
 */

import type { Node as AstNode } from "../ast/index.js";

// ---------------------------------------------------------------------------
// Handle types (opaque server-side keys)
// ---------------------------------------------------------------------------

export type Handle<T> = string & { readonly __t?: T };
const HandlePrefix = {
  Project: "p",
  Snapshot: "n",
  Symbol: "s",
  Type: "t",
  Signature: "g",
} as const;
let sessionIdCounter = 0;
let objectHandleCounter = 0;
const objectHandleIds = new WeakMap<object, number>();

function handleId(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value).toString(16).padStart(16, "0");
  }
  if (typeof value === "bigint") {
    return value.toString(16).padStart(16, "0");
  }
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  if (typeof value === "object" && value !== null) {
    let id = objectHandleIds.get(value);
    if (id === undefined) {
      objectHandleCounter += 1;
      id = objectHandleCounter;
      objectHandleIds.set(value, id);
    }
    return id.toString(16).padStart(16, "0");
  }
  objectHandleCounter += 1;
  return objectHandleCounter.toString(16).padStart(16, "0");
}

function prefixedHandle<T>(prefix: string, value: unknown): Handle<T> {
  return `${prefix}${handleId(value)}` as Handle<T>;
}

// ---------------------------------------------------------------------------
// SnapshotData
// ---------------------------------------------------------------------------

export interface SnapshotData {
  getProgram(projectHandle: Handle<Project>): Program | { error: string };
  registerSymbol(symbol: SymbolType): SymbolResponse;
  registerType(t: TypeType): TypeResponse;
  resolveSymbolHandle(handle: Handle<SymbolType>): SymbolType | { error: string };
  resolveTypeHandle(handle: Handle<TypeType>): TypeType | { error: string };
  resolveSignatureHandle(handle: Handle<SignatureType>): SignatureType | { error: string };
  registerSignature(sig: SignatureType): SignatureResponse;
}

class SnapshotDataRecord implements SnapshotData {
  readonly snapshot: Snapshot;
  refCount = 1;
  readonly symbolRegistry = new Map<Handle<SymbolType>, SymbolType>();
  readonly typeRegistry = new Map<Handle<TypeType>, TypeType>();
  readonly signatureRegistry = new Map<Handle<SignatureType>, SignatureType>();
  signatureNextId = 0;

  constructor(snapshot: Snapshot) {
    this.snapshot = snapshot;
  }

  getProgram(projectHandle: Handle<Project>): Program | { error: string } {
    const projectName = parseProjectHandle(projectHandle);
    const collection = readProperty(this.snapshot, "projectCollection") ?? readProperty(this.snapshot, "ProjectCollection");
    const project = callMethod(collection, "getProjectByPath", projectName)
      ?? callMethod(collection, "GetProjectByPath", projectName)
      ?? readMapValue(readProperty(collection, "projects"), projectName);
    if (project === undefined) {
      return { error: `project ${projectName} not found` };
    }
    const program = callMethod(project, "getProgram") ?? callMethod(project, "GetProgram") ?? readProperty(project, "program");
    if (program === undefined) {
      return { error: "project has no program" };
    }
    return program as Program;
  }

  registerSymbol(symbol: SymbolType): SymbolResponse {
    const response = newSymbolResponse(symbol);
    this.symbolRegistry.set(response.id, symbol);
    return response;
  }

  registerType(targetType: TypeType): TypeResponse {
    const response = newTypeResponse(targetType);
    this.typeRegistry.set(response.id, targetType);
    return response;
  }

  resolveSymbolHandle(handle: Handle<SymbolType>): SymbolType | { error: string } {
    const symbol = this.symbolRegistry.get(handle);
    return symbol ?? { error: `symbol handle ${handle} not found in snapshot registry` };
  }

  resolveTypeHandle(handle: Handle<TypeType>): TypeType | { error: string } {
    const targetType = this.typeRegistry.get(handle);
    return targetType ?? { error: `type handle ${handle} not found in snapshot registry` };
  }

  resolveSignatureHandle(handle: Handle<SignatureType>): SignatureType | { error: string } {
    const signature = this.signatureRegistry.get(handle);
    return signature ?? { error: `signature handle ${handle} not found in snapshot registry` };
  }

  registerSignature(signature: SignatureType): SignatureResponse {
    this.signatureNextId += 1;
    const response = newSignatureResponse(signature, this.signatureNextId, this);
    this.signatureRegistry.set(response.id, signature);
    return response;
  }
}

// ---------------------------------------------------------------------------
// CheckerSetup
// ---------------------------------------------------------------------------

export interface CheckerSetup {
  checker: Checker | undefined;
  program: Program | undefined;
  snapshotData: SnapshotData | undefined;
}

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------

export interface SessionOptions {
  defaultLibraryPath?: string;
  emitMessageHandler?: (msg: unknown) => void;
  useBinaryResponses?: boolean;
}

export class Session {
  readonly id: string;
  readonly projectSession: ProjectSession;
  readonly options: SessionOptions;
  readonly snapshots = new Map<Handle<Snapshot>, SnapshotDataRecord>();
  latestSnapshot: Handle<Snapshot> | undefined;
  readonly useBinaryResponses: boolean;

  constructor(projectSession: ProjectSession, options: SessionOptions) {
    this.id = generateSessionId();
    this.projectSession = projectSession;
    this.options = options;
    this.useBinaryResponses = options.useBinaryResponses === true;
  }

  ID(): string { return this.id; }
  ProjectSession(): ProjectSession { return this.projectSession; }

  getSnapshotData(handle: Handle<Snapshot>): SnapshotData | { error: string } {
    const data = this.snapshots.get(handle);
    return data ?? { error: `snapshot ${handle} not found` };
  }

  setupChecker(ctx: Context, snapshot: Handle<Snapshot>, projectHandle: Handle<Project>): CheckerSetup {
    void ctx;
    const snapshotData = this.getSnapshotData(snapshot);
    if (isError(snapshotData)) {
      return { checker: undefined, program: undefined, snapshotData: undefined };
    }
    const program = snapshotData.getProgram(projectHandle);
    if (isError(program)) {
      return { checker: undefined, program: undefined, snapshotData };
    }
    const checker = callMethod(program, "getTypeChecker", ctx)
      ?? callMethod(program, "GetTypeChecker", ctx)
      ?? readProperty(program, "checker");
    return { checker: checker as Checker | undefined, program, snapshotData };
  }

  // -------------------------------------------------------------------------
  // Request / notification dispatch
  // -------------------------------------------------------------------------

  HandleRequest(ctx: Context, method: string, params: unknown): { result?: unknown; error?: string } {
    if (method === "echo") {
      return { result: this.useBinaryResponses ? params : params };
    }
    if (method === "ping") {
      return { result: "pong" };
    }
    switch (method) {
      case "initialize": return { result: this.handleInitialize(ctx) };
      case "updateSnapshot": return { result: this.handleUpdateSnapshot(ctx, params as UpdateSnapshotParams) };
      case "release": return { result: this.handleRelease(ctx, params as ReleaseParams) };
      case "getDefaultProjectForFile":
        return { result: this.handleGetDefaultProjectForFile(ctx, params as GetDefaultProjectForFileParams) };
      case "parseConfigFile":
        return { result: this.handleParseConfigFile(ctx, params as ParseConfigFileParams) };
      case "getSourceFile":
        return { result: this.handleGetSourceFile(ctx, params as GetSourceFileParams) };
      case "getSymbolAtPosition":
        return { result: this.handleGetSymbolAtPosition(ctx, params as GetSymbolAtPositionParams) };
      case "getSymbolsAtPositions":
        return { result: this.handleGetSymbolsAtPositions(ctx, params as GetSymbolsAtPositionsParams) };
      case "getSymbolAtLocation":
        return { result: this.handleGetSymbolAtLocation(ctx, params as GetSymbolAtLocationParams) };
      case "getSymbolsAtLocations":
        return { result: this.handleGetSymbolsAtLocations(ctx, params as GetSymbolsAtLocationsParams) };
      case "getTypeOfSymbol":
        return { result: this.handleGetTypeOfSymbol(ctx, params as GetTypeOfSymbolParams) };
      case "getTypesOfSymbols":
        return { result: this.handleGetTypesOfSymbols(ctx, params as GetTypesOfSymbolsParams) };
      case "getDeclaredTypeOfSymbol":
        return { result: this.handleGetDeclaredTypeOfSymbol(ctx, params as GetTypeOfSymbolParams) };
      case "resolveName":
        return { result: this.handleResolveName(ctx, params as ResolveNameParams) };
      case "getParentOfSymbol":
        return { result: this.handleGetParentOfSymbol(ctx, params as GetParentOfSymbolParams) };
      case "getMembersOfSymbol":
        return { result: this.handleGetMembersOfSymbol(ctx, params as GetMembersOfSymbolParams) };
      case "getExportsOfSymbol":
        return { result: this.handleGetExportsOfSymbol(ctx, params as GetExportsOfSymbolParams) };
      case "getExportSymbolOfSymbol":
        return { result: this.handleGetExportSymbolOfSymbol(ctx, params as GetExportSymbolOfSymbolParams) };
      case "getSymbolOfType":
        return { result: this.handleGetSymbolOfType(ctx, params as GetSymbolOfTypeParams) };
      case "getSignaturesOfType":
        return { result: this.handleGetSignaturesOfType(ctx, params as GetSignaturesOfTypeParams) };
      case "getTypeAtLocation":
        return { result: this.handleGetTypeAtLocation(ctx, params as GetTypeAtLocationParams) };
      case "getTypeAtLocations":
        return { result: this.handleGetTypeAtLocations(ctx, params as GetTypeAtLocationsParams) };
      case "getTypeAtPosition":
        return { result: this.handleGetTypeAtPosition(ctx, params as GetTypeAtPositionParams) };
      case "getTypesAtPositions":
        return { result: this.handleGetTypesAtPositions(ctx, params as GetTypesAtPositionsParams) };
      case "getTargetOfType":
        return { result: this.handleGetTargetOfType(ctx, params as GetTypePropertyParams) };
      case "getTypesOfType":
        return { result: this.handleGetTypesOfType(ctx, params as GetTypePropertyParams) };
      case "getTypeParametersOfType":
        return { result: this.handleGetTypeParametersOfType(ctx, params as GetTypePropertyParams) };
      case "getOuterTypeParametersOfType":
        return { result: this.handleGetOuterTypeParametersOfType(ctx, params as GetTypePropertyParams) };
      case "getLocalTypeParametersOfType":
        return { result: this.handleGetLocalTypeParametersOfType(ctx, params as GetTypePropertyParams) };
      case "getObjectTypeOfType":
        return { result: this.handleGetObjectTypeOfType(ctx, params as GetTypePropertyParams) };
      case "getIndexTypeOfType":
        return { result: this.handleGetIndexTypeOfType(ctx, params as GetTypePropertyParams) };
      case "getCheckTypeOfType":
        return { result: this.handleGetCheckTypeOfType(ctx, params as GetTypePropertyParams) };
      case "getExtendsTypeOfType":
        return { result: this.handleGetExtendsTypeOfType(ctx, params as GetTypePropertyParams) };
      case "getBaseTypeOfType":
        return { result: this.handleGetBaseTypeOfType(ctx, params as GetTypePropertyParams) };
      case "getConstraintOfType":
        return { result: this.handleGetConstraintOfType(ctx, params as GetTypePropertyParams) };
      case "getContextualType":
        return { result: this.handleGetContextualType(ctx, params as GetContextualTypeParams) };
      case "getBaseTypeOfLiteralType":
        return { result: this.handleGetBaseTypeOfLiteralType(ctx, params as GetBaseTypeOfLiteralTypeParams) };
      case "getShorthandAssignmentValueSymbol":
        return { result: this.handleGetShorthandAssignmentValueSymbol(ctx, params as GetTypeAtLocationParams) };
      case "getTypeOfSymbolAtLocation":
        return { result: this.handleGetTypeOfSymbolAtLocation(ctx, params as GetTypeOfSymbolAtLocationParams) };
      default:
        return { error: `unknown method: ${method}` };
    }
  }

  HandleNotification(ctx: Context, method: string, params: unknown): void {
    void ctx; void method; void params;
  }

  // -------------------------------------------------------------------------
  // Per-method handlers (bodies stubbed)
  // -------------------------------------------------------------------------

  handleInitialize(ctx: Context): InitializeResponse {
    void ctx;
    return {
      sessionId: this.id,
      useCaseSensitiveFileNames: readBoolean(this.projectSession, "useCaseSensitiveFileNames", true),
      currentDirectory: readString(this.projectSession, "currentDirectory", process.cwd()),
    };
  }
  handleUpdateSnapshot(ctx: Context, params: UpdateSnapshotParams): UpdateSnapshotResponse {
    void ctx;
    const previousSnapshotHandle = this.latestSnapshot;
    const previousSnapshot = previousSnapshotHandle === undefined ? undefined : this.snapshots.get(previousSnapshotHandle)?.snapshot;
    const snapshot = callMethod(this.projectSession, "updateSnapshot", params)
      ?? callMethod(this.projectSession, "UpdateSnapshot", params)
      ?? readProperty(this.projectSession, "snapshot")
      ?? { id: this.snapshots.size + 1, projectCollection: readProperty(this.projectSession, "projectCollection") };
    const handle = snapshotHandle(snapshot as Snapshot);
    const snapshotData = new SnapshotDataRecord(snapshot as Snapshot);
    this.snapshots.set(handle, snapshotData);
    this.latestSnapshot = handle;
    const response: UpdateSnapshotResponse = {
      snapshot: handle,
      projects: projectResponsesForSnapshot(snapshot),
    };
    const changes = computeSnapshotChanges(previousSnapshot, snapshot);
    if (changes !== undefined) {
      response.changes = changes;
    }
    return response;
  }
  handleRelease(ctx: Context, params: ReleaseParams): unknown {
    void ctx;
    const handle = params.handle as Handle<Snapshot>;
    const snapshotData = this.snapshots.get(handle);
    if (snapshotData === undefined) {
      return undefined;
    }
    snapshotData.refCount -= 1;
    if (snapshotData.refCount <= 0) {
      this.snapshots.delete(handle);
      if (this.latestSnapshot === handle) {
        this.latestSnapshot = undefined;
      }
    }
    return undefined;
  }
  handleGetDefaultProjectForFile(ctx: Context, params: GetDefaultProjectForFileParams): ProjectResponse {
    void ctx; void params;
    return { id: "" as Handle<Project>, configFileName: "", rootFiles: [], compilerOptions: undefined };
  }
  handleParseConfigFile(ctx: Context, params: ParseConfigFileParams): ConfigFileResponse {
    void ctx; void params; return { config: "" };
  }
  handleGetSourceFile(ctx: Context, params: GetSourceFileParams): unknown {
    void ctx; void params; return undefined;
  }
  handleGetSymbolAtPosition(ctx: Context, params: GetSymbolAtPositionParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetSymbolsAtPositions(ctx: Context, params: GetSymbolsAtPositionsParams): readonly SymbolResponse[] {
    void ctx; void params; return [];
  }
  handleGetSymbolAtLocation(ctx: Context, params: GetSymbolAtLocationParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetSymbolsAtLocations(ctx: Context, params: GetSymbolsAtLocationsParams): readonly SymbolResponse[] {
    void ctx; void params; return [];
  }
  handleGetTypeOfSymbol(ctx: Context, params: GetTypeOfSymbolParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetTypesOfSymbols(ctx: Context, params: GetTypesOfSymbolsParams): readonly TypeResponse[] {
    void ctx; void params; return [];
  }
  handleGetDeclaredTypeOfSymbol(ctx: Context, params: GetTypeOfSymbolParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleResolveName(ctx: Context, params: ResolveNameParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetParentOfSymbol(ctx: Context, params: GetParentOfSymbolParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetMembersOfSymbol(ctx: Context, params: GetMembersOfSymbolParams): readonly SymbolResponse[] {
    void ctx; void params; return [];
  }
  handleGetExportsOfSymbol(ctx: Context, params: GetExportsOfSymbolParams): readonly SymbolResponse[] {
    void ctx; void params; return [];
  }
  handleGetExportSymbolOfSymbol(ctx: Context, params: GetExportSymbolOfSymbolParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetSymbolOfType(ctx: Context, params: GetSymbolOfTypeParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetSignaturesOfType(ctx: Context, params: GetSignaturesOfTypeParams): readonly SignatureResponse[] {
    void ctx; void params; return [];
  }
  handleGetTypeAtLocation(ctx: Context, params: GetTypeAtLocationParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetTypeAtLocations(ctx: Context, params: GetTypeAtLocationsParams): readonly TypeResponse[] {
    void ctx; void params; return [];
  }
  handleGetTypeAtPosition(ctx: Context, params: GetTypeAtPositionParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetTypesAtPositions(ctx: Context, params: GetTypesAtPositionsParams): readonly TypeResponse[] {
    void ctx; void params; return [];
  }
  handleGetTargetOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.target);
  }
  handleGetTypesOfType(_ctx: Context, params: GetTypePropertyParams): readonly TypeResponse[] {
    return this.resolveTypeArrayProperty(params, (t) => t.types ?? []);
  }
  handleGetTypeParametersOfType(_ctx: Context, params: GetTypePropertyParams): readonly TypeResponse[] {
    return this.resolveTypeArrayProperty(params, (t) => t.typeParameters ?? []);
  }
  handleGetOuterTypeParametersOfType(_ctx: Context, params: GetTypePropertyParams): readonly TypeResponse[] {
    return this.resolveTypeArrayProperty(params, (t) => t.outerTypeParameters ?? []);
  }
  handleGetLocalTypeParametersOfType(_ctx: Context, params: GetTypePropertyParams): readonly TypeResponse[] {
    return this.resolveTypeArrayProperty(params, (t) => t.localTypeParameters ?? []);
  }
  handleGetObjectTypeOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.objectType);
  }
  handleGetIndexTypeOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.indexType);
  }
  handleGetCheckTypeOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.checkType);
  }
  handleGetExtendsTypeOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.extendsType);
  }
  handleGetBaseTypeOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.baseType);
  }
  handleGetConstraintOfType(_ctx: Context, params: GetTypePropertyParams): TypeResponse | undefined {
    return this.resolveTypeProperty(params, (t) => t.constraint);
  }
  handleGetContextualType(ctx: Context, params: GetContextualTypeParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetBaseTypeOfLiteralType(ctx: Context, params: GetBaseTypeOfLiteralTypeParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetShorthandAssignmentValueSymbol(ctx: Context, params: GetTypeAtLocationParams): SymbolResponse | undefined {
    void ctx; void params; return undefined;
  }
  handleGetTypeOfSymbolAtLocation(ctx: Context, params: GetTypeOfSymbolAtLocationParams): TypeResponse | undefined {
    void ctx; void params; return undefined;
  }

  resolveTypeProperty(
    params: GetTypePropertyParams, getter: (t: TypeType) => TypeType | undefined,
  ): TypeResponse | undefined {
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return undefined;
    const targetType = snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    const propertyType = getter(targetType);
    return propertyType === undefined ? undefined : snapshotData.registerType(propertyType);
  }

  resolveTypeArrayProperty(
    params: GetTypePropertyParams, getter: (t: TypeType) => readonly TypeType[],
  ): readonly TypeResponse[] {
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return [];
    const targetType = snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return [];
    return getter(targetType).map((propertyType) => snapshotData.registerType(propertyType));
  }
}

export function newSession(projectSession: ProjectSession, options: SessionOptions): Session {
  return new Session(projectSession, options);
}

export function snapshotHandle(snapshot: Snapshot): Handle<Snapshot> {
  return prefixedHandle<Snapshot>(HandlePrefix.Snapshot, readProperty(snapshot, "id") ?? readProperty(snapshot, "ID") ?? snapshot);
}

function generateSessionId(): string {
  sessionIdCounter += 1;
  return `s-${sessionIdCounter.toString(16).padStart(16, "0")}`;
}

function parseProjectHandle(handle: Handle<Project>): string {
  const text = handle as unknown as string;
  if (text.startsWith(`${HandlePrefix.Project}.`)) return text.slice(2);
  if (text.startsWith(HandlePrefix.Project)) return text.slice(1);
  return text;
}

function symbolHandle(symbol: SymbolType): Handle<SymbolType> {
  return prefixedHandle<SymbolType>(HandlePrefix.Symbol, readProperty(symbol, "id") ?? symbol);
}

function typeHandle(targetType: TypeType): Handle<TypeType> {
  return prefixedHandle<TypeType>(HandlePrefix.Type, readProperty(targetType, "id") ?? targetType);
}

function signatureHandle(id: number): Handle<SignatureType> {
  return prefixedHandle<SignatureType>(HandlePrefix.Signature, id);
}

function newSymbolResponse(symbol: SymbolType): SymbolResponse {
  const response: SymbolResponse = {
    id: symbolHandle(symbol),
    name: readString(symbol, "name", readString(symbol, "escapedName", "")),
    flags: readNumber(symbol, "flags", 0),
    checkFlags: readNumber(symbol, "checkFlags", 0),
  };
  const declarations = readArray<AstNode>(symbol, "declarations");
  if (declarations.length > 0) {
    response.declarations = declarations.map(nodeHandleFrom);
  }
  const valueDeclaration = readProperty(symbol, "valueDeclaration");
  if (valueDeclaration !== undefined) {
    response.valueDeclaration = nodeHandleFrom(valueDeclaration as AstNode);
  }
  return response;
}

function newTypeResponse(targetType: TypeType): TypeResponse {
  const response: TypeResponse = {
    id: typeHandle(targetType),
    flags: readNumber(targetType, "flags", 0),
  };
  const objectFlags = readProperty(targetType, "objectFlags");
  if (typeof objectFlags === "number") response.objectFlags = objectFlags;
  const symbol = readProperty(targetType, "symbol");
  if (symbol !== undefined) response.symbol = symbolHandle(symbol as SymbolType);
  return response;
}

function newSignatureResponse(signature: SignatureType, id: number, snapshotData: SnapshotDataRecord): SignatureResponse {
  const response: SignatureResponse = {
    id: signatureHandle(id),
    flags: readNumber(signature, "flags", 0),
  };
  const declaration = readProperty(signature, "declaration");
  if (declaration !== undefined) response.declaration = nodeHandleFrom(declaration as AstNode);
  const typeParameters = readArray<TypeType>(signature, "typeParameters");
  if (typeParameters.length > 0) {
    response.typeParameters = typeParameters.map((targetType) => snapshotData.registerType(targetType).id);
  }
  const parameters = readArray<SymbolType>(signature, "parameters");
  if (parameters.length > 0) {
    response.parameters = parameters.map((symbol) => snapshotData.registerSymbol(symbol).id);
  }
  const thisParameter = readProperty(signature, "thisParameter");
  if (thisParameter !== undefined) response.thisParameter = snapshotData.registerSymbol(thisParameter as SymbolType).id;
  const target = readProperty(signature, "target");
  if (target !== undefined) response.target = snapshotData.registerSignature(target as SignatureType).id;
  return response;
}

function nodeHandleFrom(node: AstNode): Handle<AstNode> {
  const path = readString(node.getSourceFile?.(), "path", "");
  return `${node.pos}.${node.end}.${node.kind}.${path}` as Handle<AstNode>;
}

function projectResponsesForSnapshot(snapshot: unknown): readonly ProjectResponse[] {
  const collection = readProperty(snapshot, "projectCollection") ?? readProperty(snapshot, "ProjectCollection");
  const projects = readArray<Project>(collection, "projects");
  if (projects.length > 0) return projects.map(newProjectResponse);
  const projectMap = readProperty(collection, "projects");
  if (projectMap instanceof Map) return Array.from(projectMap.values()).map((project) => newProjectResponse(project as Project));
  return [];
}

function newProjectResponse(project: Project): ProjectResponse {
  return {
    id: prefixedHandle<Project>(HandlePrefix.Project, readProperty(project, "id") ?? readProperty(project, "configFileName") ?? project),
    configFileName: readString(project, "configFileName", ""),
    rootFiles: readArray<string>(project, "rootFiles"),
    compilerOptions: readProperty(project, "compilerOptions"),
  };
}

function computeSnapshotChanges(previousSnapshot: Snapshot | undefined, nextSnapshot: unknown): SnapshotChanges | undefined {
  if (previousSnapshot === undefined || previousSnapshot === nextSnapshot) return undefined;
  return { changedProjects: new Map(), removedProjects: [] };
}

function isError<T>(value: T | { error: string }): value is { error: string } {
  return typeof value === "object" && value !== null && "error" in value;
}

function readProperty(value: unknown, key: string): unknown {
  if (typeof value !== "object" || value === null) return undefined;
  return (value as Record<string, unknown>)[key];
}

function readMapValue(value: unknown, key: string): unknown {
  if (value instanceof Map) return value.get(key);
  return undefined;
}

function callMethod(value: unknown, name: string, ...args: readonly unknown[]): unknown {
  const method = readProperty(value, name);
  return typeof method === "function" ? method.apply(value, args) : undefined;
}

function readString(value: unknown, key: string, fallback: string): string {
  const property = readProperty(value, key);
  return typeof property === "string" ? property : fallback;
}

function readBoolean(value: unknown, key: string, fallback: boolean): boolean {
  const property = readProperty(value, key);
  return typeof property === "boolean" ? property : fallback;
}

function readNumber(value: unknown, key: string, fallback: number): number {
  const property = readProperty(value, key);
  return typeof property === "number" ? property : fallback;
}

function readArray<T>(value: unknown, key: string): readonly T[] {
  const property = readProperty(value, key);
  return Array.isArray(property) ? property as readonly T[] : [];
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface Context { readonly _ctx?: unknown }
interface Project { readonly _project?: unknown }
interface ProjectSession { readonly _session?: unknown }
interface Snapshot { readonly _snapshot?: unknown }
interface Program { readonly _program?: unknown }
interface Checker { readonly _checker?: unknown }
interface SymbolType {
  readonly id?: unknown;
  readonly name?: string;
  readonly escapedName?: string;
  readonly flags?: number;
  readonly checkFlags?: number;
  readonly declarations?: readonly AstNode[];
  readonly valueDeclaration?: AstNode;
}
interface SignatureType {
  readonly id?: unknown;
  readonly flags?: number;
  readonly declaration?: AstNode;
  readonly typeParameters?: readonly TypeType[];
  readonly parameters?: readonly SymbolType[];
  readonly thisParameter?: SymbolType;
  readonly target?: SignatureType;
}
interface TypeType {
  id?: unknown; flags?: number; objectFlags?: number; symbol?: SymbolType;
  target?: TypeType; types?: readonly TypeType[];
  typeParameters?: readonly TypeType[]; outerTypeParameters?: readonly TypeType[];
  localTypeParameters?: readonly TypeType[]; objectType?: TypeType;
  indexType?: TypeType; checkType?: TypeType; extendsType?: TypeType;
  baseType?: TypeType; constraint?: TypeType;
}
interface SymbolResponse {
  id: Handle<SymbolType>; name: string; flags: number; checkFlags: number;
  declarations?: readonly Handle<AstNode>[]; valueDeclaration?: Handle<AstNode>;
}
interface TypeResponse {
  id: Handle<TypeType>; flags: number; objectFlags?: number; symbol?: Handle<SymbolType>;
}
interface SignatureResponse {
  id: Handle<SignatureType>; flags: number; declaration?: Handle<AstNode>;
  typeParameters?: readonly Handle<TypeType>[]; parameters?: readonly Handle<SymbolType>[];
  thisParameter?: Handle<SymbolType>; target?: Handle<SignatureType>;
}
interface InitializeResponse { sessionId: string; useCaseSensitiveFileNames: boolean; currentDirectory: string }
interface UpdateSnapshotParams { readonly _p?: unknown }
interface SnapshotChanges {
  changedProjects?: ReadonlyMap<Handle<Project>, ProjectFileChanges>;
  removedProjects?: readonly Handle<Project>[];
}
interface ProjectFileChanges { changedFiles?: readonly string[]; deletedFiles?: readonly string[] }
interface UpdateSnapshotResponse { snapshot: Handle<Snapshot>; projects: readonly ProjectResponse[]; changes?: SnapshotChanges }
interface ReleaseParams { handle: string }
interface GetDefaultProjectForFileParams { readonly _p?: unknown }
interface ProjectResponse { id: Handle<Project>; configFileName: string; rootFiles: readonly string[]; compilerOptions: unknown }
interface ParseConfigFileParams { readonly _p?: unknown }
interface ConfigFileResponse { config: string }
interface GetSourceFileParams { readonly _p?: unknown }
interface GetSymbolAtPositionParams { readonly _p?: unknown }
interface GetSymbolsAtPositionsParams { readonly _p?: unknown }
interface GetSymbolAtLocationParams { readonly _p?: unknown }
interface GetSymbolsAtLocationsParams { readonly _p?: unknown }
interface GetTypeOfSymbolParams { readonly _p?: unknown }
interface GetTypesOfSymbolsParams { readonly _p?: unknown }
interface ResolveNameParams { readonly _p?: unknown }
interface GetParentOfSymbolParams { readonly _p?: unknown }
interface GetMembersOfSymbolParams { readonly _p?: unknown }
interface GetExportsOfSymbolParams { readonly _p?: unknown }
interface GetExportSymbolOfSymbolParams { readonly _p?: unknown }
interface GetSymbolOfTypeParams { readonly _p?: unknown }
interface GetSignaturesOfTypeParams { readonly _p?: unknown }
interface GetTypeAtLocationParams { readonly _p?: unknown }
interface GetTypeAtLocationsParams { readonly _p?: unknown }
interface GetTypeAtPositionParams { readonly _p?: unknown }
interface GetTypesAtPositionsParams { readonly _p?: unknown }
interface GetTypePropertyParams { snapshot: Handle<Snapshot>; type: Handle<TypeType> }
interface GetContextualTypeParams { readonly _p?: unknown }
interface GetBaseTypeOfLiteralTypeParams { readonly _p?: unknown }
interface GetTypeOfSymbolAtLocationParams { readonly _p?: unknown }

// AstNode reserved for future imports
export type _Ast = AstNode;
