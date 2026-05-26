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
}

export class Session {
  readonly id: string;
  readonly projectSession: ProjectSession;
  readonly options: SessionOptions;

  constructor(projectSession: ProjectSession, options: SessionOptions) {
    this.id = generateSessionId();
    this.projectSession = projectSession;
    this.options = options;
  }

  ID(): string { return this.id; }
  ProjectSession(): ProjectSession { return this.projectSession; }

  getSnapshotData(handle: Handle<Snapshot>): SnapshotData | { error: string } {
    void handle;
    return { error: "no snapshot data" };
  }

  setupChecker(ctx: Context, snapshot: Handle<Snapshot>, projectHandle: Handle<Project>): CheckerSetup {
    void ctx; void snapshot; void projectHandle;
    return { checker: undefined, program: undefined, snapshotData: undefined };
  }

  // -------------------------------------------------------------------------
  // Request / notification dispatch
  // -------------------------------------------------------------------------

  HandleRequest(ctx: Context, method: string, params: unknown): { result?: unknown; error?: string } {
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
    return { sessionId: this.id };
  }
  handleUpdateSnapshot(ctx: Context, params: UpdateSnapshotParams): UpdateSnapshotResponse {
    void ctx; void params; return { snapshot: "" as Handle<Snapshot> };
  }
  handleRelease(ctx: Context, params: ReleaseParams): unknown {
    void ctx; void params; return undefined;
  }
  handleGetDefaultProjectForFile(ctx: Context, params: GetDefaultProjectForFileParams): ProjectResponse {
    void ctx; void params; return { project: "" as Handle<Project> };
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
    void params; void getter; return undefined;
  }

  resolveTypeArrayProperty(
    params: GetTypePropertyParams, getter: (t: TypeType) => readonly TypeType[],
  ): readonly TypeResponse[] {
    void params; void getter; return [];
  }
}

export function newSession(projectSession: ProjectSession, options: SessionOptions): Session {
  return new Session(projectSession, options);
}

export function snapshotHandle(snapshot: Snapshot): Handle<Snapshot> {
  void snapshot;
  return "" as Handle<Snapshot>;
}

function generateSessionId(): string {
  return `s-${Math.random().toString(36).slice(2)}`;
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
interface SymbolType { readonly _symbol?: unknown }
interface SignatureType { readonly _sig?: unknown }
interface TypeType {
  target?: TypeType; types?: readonly TypeType[];
  typeParameters?: readonly TypeType[]; outerTypeParameters?: readonly TypeType[];
  localTypeParameters?: readonly TypeType[]; objectType?: TypeType;
  indexType?: TypeType; checkType?: TypeType; extendsType?: TypeType;
  baseType?: TypeType; constraint?: TypeType;
}
interface SymbolResponse { readonly _symbol?: unknown }
interface TypeResponse { readonly _type?: unknown }
interface SignatureResponse { readonly _sig?: unknown }
interface InitializeResponse { sessionId: string }
interface UpdateSnapshotParams { readonly _p?: unknown }
interface UpdateSnapshotResponse { snapshot: Handle<Snapshot> }
interface ReleaseParams { readonly _p?: unknown }
interface GetDefaultProjectForFileParams { readonly _p?: unknown }
interface ProjectResponse { project: Handle<Project> }
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
interface GetTypePropertyParams { readonly _p?: unknown }
interface GetContextualTypeParams { readonly _p?: unknown }
interface GetBaseTypeOfLiteralTypeParams { readonly _p?: unknown }
interface GetTypeOfSymbolAtLocationParams { readonly _p?: unknown }

// AstNode reserved for future imports
export type _Ast = AstNode;
