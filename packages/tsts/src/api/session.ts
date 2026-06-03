/**
 * API Session.
 *
 * Substantive port of TS-Go `internal/api/session.go` (~1895 LoC, ~70
 * methods). The Session is the long-lived server-side object that
 * handles RPC requests from a client (LSP, encoder client, etc.):
 * loads tsconfig, manages snapshots, hands out program/checker
 * references, and proxies type/symbol queries.
 *
 * Port scope: state declarations plus request handlers that mirror TS-Go's
 * handle* methods. The handlers resolve snapshot/project/checker state,
 * register returned symbols/types/signatures into the per-snapshot registries,
 * and preserve binary-vs-base64 source-file responses.
 */

import { Buffer } from "node:buffer";
import { ChildPropertiesByKind, Kind, type Node as AstNode, type SourceFile } from "../ast/index.js";
import { getTouchingPropertyName } from "../astnav/index.js";
import { printFile } from "../printer/index.js";
import { decodeNodes } from "./encoder/decoder.js";
import { encodeNode, encodeSourceFile } from "./encoder/encoder.js";

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
let sessionIDCounter = 0;
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
  readonly snapshot: Snapshot;
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
    sessionIDCounter += 1;
    this.id = formatSessionID(sessionIDCounter);
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
      case "getResolvedSignature":
        return { result: this.handleGetResolvedSignature(ctx, params as GetResolvedSignatureParams) };
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
      case "getNonNullableType":
        return { result: this.handleGetNonNullableType(ctx, params as GetNonNullableTypeParams) };
      case "getTypeFromTypeNode":
        return { result: this.handleGetTypeFromTypeNode(ctx, params as GetTypeFromTypeNodeParams) };
      case "getWidenedType":
        return { result: this.handleGetWidenedType(ctx, params as GetWidenedTypeParams) };
      case "getParameterType":
        return { result: this.handleGetParameterType(ctx, params as GetParameterTypeParams) };
      case "isArrayLikeType":
        return { result: this.handleIsArrayLikeType(ctx, params as IsArrayLikeTypeParams) };
      case "getShorthandAssignmentValueSymbol":
        return { result: this.handleGetShorthandAssignmentValueSymbol(ctx, params as GetTypeAtLocationParams) };
      case "getTypeOfSymbolAtLocation":
        return { result: this.handleGetTypeOfSymbolAtLocation(ctx, params as GetTypeOfSymbolAtLocationParams) };
      case "typeToTypeNode":
        return { result: this.handleTypeToTypeNode(ctx, params as TypeToTypeNodeParams) };
      case "signatureToSignatureDeclaration":
        return { result: this.handleSignatureToSignatureDeclaration(ctx, params as SignatureToSignatureDeclarationParams) };
      case "typeToString":
        return { result: this.handleTypeToString(ctx, params as TypeToTypeNodeParams) };
      case "printNode":
        return { result: this.handlePrintNode(ctx, params as PrintNodeParams) };
      case "isContextSensitive":
        return { result: this.handleIsContextSensitive(ctx, params as GetContextualTypeParams) };
      case "getReturnTypeOfSignature":
        return { result: this.handleGetReturnTypeOfSignature(ctx, params as CheckerSignatureParams) };
      case "getRestTypeOfSignature":
        return { result: this.handleGetRestTypeOfSignature(ctx, params as CheckerSignatureParams) };
      case "getTypePredicateOfSignature":
        return { result: this.handleGetTypePredicateOfSignature(ctx, params as CheckerSignatureParams) };
      case "getBaseTypes":
        return { result: this.handleGetBaseTypes(ctx, params as CheckerTypeParams) };
      case "getPropertiesOfType":
        return { result: this.handleGetPropertiesOfType(ctx, params as CheckerTypeParams) };
      case "getIndexInfosOfType":
        return { result: this.handleGetIndexInfosOfType(ctx, params as CheckerTypeParams) };
      case "getConstraintOfTypeParameter":
        return { result: this.handleGetConstraintOfTypeParameter(ctx, params as CheckerTypeParams) };
      case "getTypeArguments":
        return { result: this.handleGetTypeArguments(ctx, params as CheckerTypeParams) };
      case "getAnyType":
      case "getStringType":
      case "getNumberType":
      case "getBooleanType":
      case "getVoidType":
      case "getUndefinedType":
      case "getNullType":
      case "getNeverType":
      case "getUnknownType":
      case "getBigIntType":
      case "getESSymbolType":
        return { result: this.handleGetIntrinsicType(ctx, params as GetIntrinsicTypeParams, method) };
      case "getSyntacticDiagnostics":
        return { result: this.handleGetSyntacticDiagnostics(ctx, params as GetDiagnosticsParams) };
      case "getSemanticDiagnostics":
        return { result: this.handleGetSemanticDiagnostics(ctx, params as GetDiagnosticsParams) };
      case "getSuggestionDiagnostics":
        return { result: this.handleGetSuggestionDiagnostics(ctx, params as GetDiagnosticsParams) };
      case "getDeclarationDiagnostics":
        return { result: this.handleGetDeclarationDiagnostics(ctx, params as GetDiagnosticsParams) };
      case "getConfigFileParsingDiagnostics":
        return { result: this.handleGetConfigFileParsingDiagnostics(ctx, params as GetProjectDiagnosticsParams) };
      default:
        return { error: `unknown method: ${method}` };
    }
  }

  HandleNotification(ctx: Context, method: string, params: unknown): void {
    void ctx; void method; void params;
  }

  // -------------------------------------------------------------------------
  // Per-method handlers
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
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return emptyProjectResponse();
    const uri = documentIdentifierToURI(params.file);
    const fileName = documentIdentifierToFileName(params.file);
    const project = callMethod(snapshotData.snapshot, "getDefaultProject", uri)
      ?? callMethod(snapshotData.snapshot, "GetDefaultProject", uri)
      ?? callMethod(snapshotData.snapshot, "getDefaultProject", fileName)
      ?? callMethod(snapshotData.snapshot, "GetDefaultProject", fileName);
    return project === undefined ? emptyProjectResponse() : newProjectResponse(project as Project);
  }
  handleParseConfigFile(ctx: Context, params: ParseConfigFileParams): ConfigFileResponse {
    void ctx;
    const currentDirectory = readString(this.projectSession, "currentDirectory", process.cwd());
    const configFileName = documentIdentifierToAbsoluteFileName(params.file, currentDirectory);
    const parsed = callMethod(this.projectSession, "parseConfigFile", configFileName)
      ?? callMethod(this.projectSession, "ParseConfigFile", configFileName);
    if (parsed !== undefined) {
      return {
        fileNames: readArray<string>(parsed, "fileNames"),
        options: readProperty(parsed, "options") ?? readProperty(parsed, "compilerOptions"),
      };
    }
    const fs = callMethod(this.projectSession, "fs") ?? callMethod(this.projectSession, "FS") ?? readProperty(this.projectSession, "fs");
    const text = readFileFromFs(fs, configFileName);
    if (text === undefined) return { fileNames: [], options: undefined };
    try {
      const json = JSON.parse(text) as { files?: readonly string[]; compilerOptions?: unknown };
      return { fileNames: [...(json.files ?? [])], options: json.compilerOptions };
    } catch {
      return { fileNames: [], options: undefined };
    }
  }
  handleGetSourceFile(ctx: Context, params: GetSourceFileParams): unknown {
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return undefined;
    const program = snapshotData.getProgram(params.project);
    if (isError(program)) return undefined;
    const sourceFile = getProgramSourceFile(program, params.file);
    if (sourceFile === undefined) return this.useBinaryResponses ? new Uint8Array() : undefined;
    const data = encodeSourceFile(sourceFile);
    return this.useBinaryResponses ? data : { data: Buffer.from(data).toString("base64") };
  }
  handleGetSymbolAtPosition(ctx: Context, params: GetSymbolAtPositionParams): SymbolResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = getNodeAtDocumentPosition(setup.program, params.file, params.position);
    if (node === undefined) return undefined;
    return registerCheckerSymbol(setup.snapshotData, setup.checker, "getSymbolAtLocation", node);
  }
  handleGetSymbolsAtPositions(ctx: Context, params: GetSymbolsAtPositionsParams): readonly SymbolResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return [];
    return params.positions
      .map((position) => {
        const node = getNodeAtDocumentPosition(setup.program!, params.file, position);
        return node === undefined ? undefined : registerCheckerSymbol(setup.snapshotData!, setup.checker!, "getSymbolAtLocation", node);
      })
      .filter((response): response is SymbolResponse => response !== undefined);
  }
  handleGetSymbolAtLocation(ctx: Context, params: GetSymbolAtLocationParams): SymbolResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    return registerCheckerSymbol(setup.snapshotData, setup.checker, "getSymbolAtLocation", node);
  }
  handleGetSymbolsAtLocations(ctx: Context, params: GetSymbolsAtLocationsParams): readonly SymbolResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return [];
    return params.locations
      .map((location) => {
        const node = resolveNodeHandle(setup.program!, location);
        return node === undefined ? undefined : registerCheckerSymbol(setup.snapshotData!, setup.checker!, "getSymbolAtLocation", node);
      })
      .filter((response): response is SymbolResponse => response !== undefined);
  }
  handleGetTypeOfSymbol(ctx: Context, params: GetTypeOfSymbolParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const symbol = setup.snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getTypeOfSymbol", symbol);
  }
  handleGetTypesOfSymbols(ctx: Context, params: GetTypesOfSymbolsParams): readonly TypeResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return [];
    return params.symbols
      .map((symbolHandleValue) => {
        const symbol = setup.snapshotData!.resolveSymbolHandle(symbolHandleValue);
        return isError(symbol) ? undefined : registerCheckerType(setup.snapshotData!, setup.checker!, "getTypeOfSymbol", symbol);
      })
      .filter((response): response is TypeResponse => response !== undefined);
  }
  handleGetDeclaredTypeOfSymbol(ctx: Context, params: GetTypeOfSymbolParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const symbol = setup.snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getDeclaredTypeOfSymbol", symbol);
  }
  handleResolveName(ctx: Context, params: ResolveNameParams): SymbolResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const location = params.location !== undefined
      ? resolveNodeHandle(setup.program, params.location)
      : params.file !== undefined && params.position !== undefined
        ? getNodeAtDocumentPosition(setup.program, params.file, params.position)
        : undefined;
    const symbol = callMethod(setup.checker, "resolveName", params.name, location, params.meaning, params.excludeGlobals === true)
      ?? callMethod(setup.checker, "ResolveName", params.name, location, params.meaning, params.excludeGlobals === true);
    return symbol === undefined ? undefined : setup.snapshotData.registerSymbol(symbol as SymbolType);
  }
  handleGetParentOfSymbol(ctx: Context, params: GetParentOfSymbolParams): SymbolResponse | undefined {
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return undefined;
    const symbol = snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return undefined;
    const parent = readProperty(symbol, "parent") ?? readProperty(symbol, "Parent");
    return parent === undefined ? undefined : snapshotData.registerSymbol(parent as SymbolType);
  }
  handleGetMembersOfSymbol(ctx: Context, params: GetMembersOfSymbolParams): readonly SymbolResponse[] {
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return [];
    const symbol = snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return [];
    return symbolTableValues(readProperty(symbol, "members") ?? readProperty(symbol, "Members"))
      .map((member) => snapshotData.registerSymbol(member));
  }
  handleGetExportsOfSymbol(ctx: Context, params: GetExportsOfSymbolParams): readonly SymbolResponse[] {
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return [];
    const symbol = snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return [];
    return symbolTableValues(readProperty(symbol, "exports") ?? readProperty(symbol, "Exports"))
      .map((exported) => snapshotData.registerSymbol(exported));
  }
  handleGetExportSymbolOfSymbol(ctx: Context, params: GetExportSymbolOfSymbolParams): SymbolResponse | undefined {
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return undefined;
    const symbol = snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return undefined;
    const exportSymbol = readProperty(symbol, "exportSymbol") ?? readProperty(symbol, "ExportSymbol") ?? symbol;
    return snapshotData.registerSymbol(exportSymbol as SymbolType);
  }
  handleGetSymbolOfType(ctx: Context, params: GetSymbolOfTypeParams): SymbolResponse | undefined {
    void ctx;
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return undefined;
    const targetType = snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    const symbol = readProperty(targetType, "symbol") ?? callMethod(targetType, "symbol") ?? callMethod(targetType, "Symbol");
    return symbol === undefined ? undefined : snapshotData.registerSymbol(symbol as SymbolType);
  }
  handleGetSignaturesOfType(ctx: Context, params: GetSignaturesOfTypeParams): readonly SignatureResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return [];
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return [];
    const signatures = callMethod(setup.checker, "getSignaturesOfType", targetType, params.kind)
      ?? callMethod(setup.checker, "GetSignaturesOfType", targetType, params.kind)
      ?? readArray<SignatureType>(targetType, params.kind === 1 ? "constructSignatures" : "callSignatures");
    return arrayFromUnknown<SignatureType>(signatures).map((signature) => setup.snapshotData!.registerSignature(signature));
  }
  // handleGetResolvedSignature returns the resolved signature of a call-like expression.
  // Port of TS-Go `func (s *Session) handleGetResolvedSignature`.
  handleGetResolvedSignature(ctx: Context, params: GetResolvedSignatureParams): SignatureResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    const signature = callMethod(setup.checker, "getResolvedSignature", node)
      ?? callMethod(setup.checker, "GetResolvedSignature", node);
    if (signature === undefined) return undefined;
    return setup.snapshotData.registerSignature(signature as SignatureType);
  }
  handleGetTypeAtLocation(ctx: Context, params: GetTypeAtLocationParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getTypeAtLocation", node);
  }
  handleGetTypeAtLocations(ctx: Context, params: GetTypeAtLocationsParams): readonly TypeResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return [];
    return params.locations
      .map((location) => {
        const node = resolveNodeHandle(setup.program!, location);
        return node === undefined ? undefined : registerCheckerType(setup.snapshotData!, setup.checker!, "getTypeAtLocation", node);
      })
      .filter((response): response is TypeResponse => response !== undefined);
  }
  handleGetTypeAtPosition(ctx: Context, params: GetTypeAtPositionParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = getNodeAtDocumentPosition(setup.program, params.file, params.position);
    if (node === undefined) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getTypeAtLocation", node);
  }
  handleGetTypesAtPositions(ctx: Context, params: GetTypesAtPositionsParams): readonly TypeResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return [];
    return params.positions
      .map((position) => {
        const node = getNodeAtDocumentPosition(setup.program!, params.file, position);
        return node === undefined ? undefined : registerCheckerType(setup.snapshotData!, setup.checker!, "getTypeAtLocation", node);
      })
      .filter((response): response is TypeResponse => response !== undefined);
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
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getContextualType", node);
  }
  handleGetBaseTypeOfLiteralType(ctx: Context, params: GetBaseTypeOfLiteralTypeParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getBaseTypeOfLiteralType", targetType);
  }
  handleGetShorthandAssignmentValueSymbol(ctx: Context, params: GetTypeAtLocationParams): SymbolResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    return registerCheckerSymbol(setup.snapshotData, setup.checker, "getShorthandAssignmentValueSymbol", node);
  }
  handleGetTypeOfSymbolAtLocation(ctx: Context, params: GetTypeOfSymbolAtLocationParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const symbol = setup.snapshotData.resolveSymbolHandle(params.symbol);
    if (isError(symbol)) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getTypeOfSymbolAtLocation", symbol, node);
  }
  handleGetNonNullableType(ctx: Context, params: GetNonNullableTypeParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getNonNullableType", targetType);
  }
  handleGetTypeFromTypeNode(ctx: Context, params: GetTypeFromTypeNodeParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getTypeFromTypeNode", node);
  }
  handleGetWidenedType(ctx: Context, params: GetWidenedTypeParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getWidenedType", targetType);
  }
  handleGetParameterType(ctx: Context, params: GetParameterTypeParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined || params.index < 0) return undefined;
    const signature = setup.snapshotData.resolveSignatureHandle(params.signature);
    if (isError(signature)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getTypeAtPosition", signature, params.index);
  }
  handleIsArrayLikeType(ctx: Context, params: IsArrayLikeTypeParams): boolean {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return false;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return false;
    const result = callMethod(setup.checker, "isArrayLikeType", targetType) ?? callMethod(setup.checker, "IsArrayLikeType", targetType);
    return result === true;
  }
  handleTypeToTypeNode(ctx: Context, params: TypeToTypeNodeParams): unknown {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    const enclosingDeclaration = params.location === undefined ? undefined : resolveNodeHandle(setup.program, params.location);
    const node = callMethod(setup.checker, "typeToTypeNode", targetType, enclosingDeclaration, params.flags ?? 0, undefined)
      ?? callMethod(setup.checker, "TypeToTypeNode", targetType, enclosingDeclaration, params.flags ?? 0, undefined);
    return encodeResponseNode(node, this.useBinaryResponses);
  }
  handleSignatureToSignatureDeclaration(ctx: Context, params: SignatureToSignatureDeclarationParams): unknown {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const signature = setup.snapshotData.resolveSignatureHandle(params.signature);
    if (isError(signature)) return undefined;
    const enclosingDeclaration = params.location === undefined ? undefined : resolveNodeHandle(setup.program, params.location);
    const node = callMethod(setup.checker, "signatureToSignatureDeclaration", signature, params.kind, enclosingDeclaration, params.flags ?? 0)
      ?? callMethod(setup.checker, "SignatureToSignatureDeclaration", signature, params.kind, enclosingDeclaration, params.flags ?? 0);
    return encodeResponseNode(node, this.useBinaryResponses);
  }
  handleTypeToString(ctx: Context, params: TypeToTypeNodeParams): string | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    const enclosingDeclaration = params.location === undefined ? undefined : resolveNodeHandle(setup.program, params.location);
    const result = callMethod(setup.checker, "typeToStringEx", targetType, enclosingDeclaration, params.flags ?? 0, undefined)
      ?? callMethod(setup.checker, "TypeToStringEx", targetType, enclosingDeclaration, params.flags ?? 0, undefined)
      ?? callMethod(setup.checker, "typeToString", targetType, enclosingDeclaration, params.flags ?? 0)
      ?? callMethod(setup.checker, "TypeToString", targetType, enclosingDeclaration, params.flags ?? 0);
    return typeof result === "string" ? result : undefined;
  }
  handlePrintNode(ctx: Context, params: PrintNodeParams): string {
    void ctx;
    const node = decodeNodes(Buffer.from(params.data, "base64"));
    if (node === undefined) return "";
    if (node.kind === Kind.SourceFile) {
      return printFile(node as SourceFile, printNodeOptions(params));
    }
    return printFile({
      kind: Kind.SourceFile,
      pos: node.pos,
      end: node.end,
      flags: 0,
      text: "",
      fileName: "",
      path: "",
      statements: [node],
      endOfFileToken: { kind: Kind.EndOfFile, pos: node.end, end: node.end, flags: 0 },
    } as unknown as SourceFile);
  }
  handleGetIntrinsicType(ctx: Context, params: GetIntrinsicTypeParams, method: string): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = callMethod(setup.checker, method) ?? callMethod(setup.checker, capitalizeMethod(method));
    return targetType === undefined ? undefined : setup.snapshotData.registerType(targetType as TypeType);
  }
  handleIsContextSensitive(ctx: Context, params: GetContextualTypeParams): boolean {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.program === undefined) return false;
    const node = resolveNodeHandle(setup.program, params.location);
    if (node === undefined) return false;
    const result = callMethod(setup.checker, "isContextSensitive", node) ?? callMethod(setup.checker, "IsContextSensitive", node);
    return result === true;
  }
  handleGetReturnTypeOfSignature(ctx: Context, params: CheckerSignatureParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const signature = setup.snapshotData.resolveSignatureHandle(params.signature);
    if (isError(signature)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getReturnTypeOfSignature", signature);
  }
  handleGetRestTypeOfSignature(ctx: Context, params: CheckerSignatureParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const signature = setup.snapshotData.resolveSignatureHandle(params.signature);
    if (isError(signature)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getRestTypeOfSignature", signature);
  }
  handleGetTypePredicateOfSignature(ctx: Context, params: CheckerSignatureParams): TypePredicateResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const signature = setup.snapshotData.resolveSignatureHandle(params.signature);
    if (isError(signature)) return undefined;
    const predicate = callMethod(setup.checker, "getTypePredicateOfSignature", signature)
      ?? callMethod(setup.checker, "GetTypePredicateOfSignature", signature);
    if (predicate === undefined) return undefined;
    const predicateType = readProperty(predicate, "type") as TypeType | undefined;
    const response: TypePredicateResponse = {
      kind: readNumber(predicate, "kind", 0),
      parameterName: readString(predicate, "parameterName", ""),
      parameterIndex: readNumber(predicate, "parameterIndex", 0),
    };
    if (predicateType !== undefined) response.type = setup.snapshotData.registerType(predicateType).id;
    return response;
  }
  handleGetBaseTypes(ctx: Context, params: CheckerTypeParams): readonly TypeResponse[] {
    return this.resolveCheckerTypeArray(ctx, params, "getBaseTypes");
  }
  handleGetPropertiesOfType(ctx: Context, params: CheckerTypeParams): readonly SymbolResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return [];
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return [];
    const props = callMethod(setup.checker, "getPropertiesOfType", targetType)
      ?? callMethod(setup.checker, "GetPropertiesOfType", targetType)
      ?? readProperty(targetType, "properties");
    return arrayFromUnknown<SymbolType>(props).map((symbol) => setup.snapshotData!.registerSymbol(symbol));
  }
  handleGetIndexInfosOfType(ctx: Context, params: CheckerTypeParams): readonly IndexInfoResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return [];
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return [];
    const infos = callMethod(setup.checker, "getIndexInfosOfType", targetType)
      ?? callMethod(setup.checker, "GetIndexInfosOfType", targetType)
      ?? readProperty(targetType, "indexInfos");
    return arrayFromUnknown<IndexInfoType>(infos).map((info) => ({
      keyType: setup.snapshotData!.registerType(readProperty(info, "keyType") as TypeType),
      valueType: setup.snapshotData!.registerType(readProperty(info, "valueType") as TypeType),
      isReadonly: readBoolean(info, "isReadonly", false),
    }));
  }
  handleGetConstraintOfTypeParameter(ctx: Context, params: CheckerTypeParams): TypeResponse | undefined {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return undefined;
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return undefined;
    return registerCheckerType(setup.snapshotData, setup.checker, "getConstraintOfTypeParameter", targetType)
      ?? this.resolveTypeProperty({ snapshot: params.snapshot, type: params.type }, (type) => type.constraint);
  }
  handleGetTypeArguments(ctx: Context, params: CheckerTypeParams): readonly TypeResponse[] {
    return this.resolveCheckerTypeArray(ctx, params, "getTypeArguments");
  }
  handleGetSyntacticDiagnostics(ctx: Context, params: GetDiagnosticsParams): readonly DiagnosticResponse[] {
    return this.getProgramDiagnostics(ctx, params, "getSyntacticDiagnostics");
  }
  handleGetSemanticDiagnostics(ctx: Context, params: GetDiagnosticsParams): readonly DiagnosticResponse[] {
    return this.getProgramDiagnostics(ctx, params, "getSemanticDiagnostics");
  }
  handleGetSuggestionDiagnostics(ctx: Context, params: GetDiagnosticsParams): readonly DiagnosticResponse[] {
    return this.getProgramDiagnostics(ctx, params, "getSuggestionDiagnostics");
  }
  handleGetDeclarationDiagnostics(ctx: Context, params: GetDiagnosticsParams): readonly DiagnosticResponse[] {
    return this.getProgramDiagnostics(ctx, params, "getDeclarationDiagnostics");
  }
  handleGetConfigFileParsingDiagnostics(ctx: Context, params: GetProjectDiagnosticsParams): readonly DiagnosticResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.program === undefined) return [];
    const diagnostics = callMethod(setup.program, "getConfigFileParsingDiagnostics")
      ?? callMethod(setup.program, "GetConfigFileParsingDiagnostics");
    return arrayFromUnknown<DiagnosticType>(diagnostics).map(newDiagnosticResponse);
  }
  resolveCheckerTypeArray(ctx: Context, params: CheckerTypeParams, methodName: string): readonly TypeResponse[] {
    const setup = this.setupChecker(ctx, params.snapshot, params.project);
    if (setup.checker === undefined || setup.snapshotData === undefined) return [];
    const targetType = setup.snapshotData.resolveTypeHandle(params.type);
    if (isError(targetType)) return [];
    const types = callMethod(setup.checker, methodName, targetType)
      ?? callMethod(setup.checker, capitalizeMethod(methodName), targetType)
      ?? [];
    return arrayFromUnknown<TypeType>(types).map((type) => setup.snapshotData!.registerType(type));
  }
  getProgramDiagnostics(ctx: Context, params: GetDiagnosticsParams, methodName: string): readonly DiagnosticResponse[] {
    const snapshotData = this.getSnapshotData(params.snapshot);
    if (isError(snapshotData)) return [];
    const program = snapshotData.getProgram(params.project);
    if (isError(program)) return [];
    const sourceFile = params.file === undefined ? undefined : getProgramSourceFile(program, params.file);
    const diagnostics = callMethod(program, methodName, ctx, sourceFile)
      ?? callMethod(program, capitalizeMethod(methodName), ctx, sourceFile)
      ?? [];
    return arrayFromUnknown<DiagnosticType>(diagnostics).map(newDiagnosticResponse);
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

// formatSessionID renders a session counter value into its handle string.
// Port of TS-Go `func formatSessionID(id uint64) string`.
function formatSessionID(id: number): string {
  return `api-session-${id}`;
}

function parseProjectHandle(handle: Handle<Project>): string {
  const text: string = handle;
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

function emptyProjectResponse(): ProjectResponse {
  return { id: "" as Handle<Project>, configFileName: "", rootFiles: [], compilerOptions: undefined };
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

function arrayFromUnknown<T>(value: unknown): readonly T[] {
  if (Array.isArray(value)) return value as readonly T[];
  if (value instanceof Map) return Array.from(value.values()) as readonly T[];
  if (typeof value === "object" && value !== null && Symbol.iterator in value) {
    return Array.from(value as Iterable<T>);
  }
  return [];
}

function symbolTableValues(value: unknown): readonly SymbolType[] {
  if (value instanceof Map) return Array.from(value.values()) as readonly SymbolType[];
  if (Array.isArray(value)) return value as readonly SymbolType[];
  if (typeof value === "object" && value !== null) return Object.values(value as Record<string, SymbolType>);
  return [];
}

function documentIdentifierToFileName(file: DocumentIdentifier): string {
  return file.fileName ?? file.uri ?? "";
}

function documentIdentifierToURI(file: DocumentIdentifier): string {
  return file.uri ?? file.fileName ?? "";
}

function documentIdentifierToAbsoluteFileName(file: DocumentIdentifier, currentDirectory: string): string {
  const fileName = documentIdentifierToFileName(file);
  if (fileName.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(fileName)) return fileName;
  return `${currentDirectory.replace(/[\\/]$/, "")}/${fileName}`;
}

function readFileFromFs(fs: unknown, fileName: string): string | undefined {
  const result = callMethod(fs, "readFile", fileName) ?? callMethod(fs, "ReadFile", fileName);
  if (typeof result === "string") return result;
  if (Array.isArray(result) && typeof result[0] === "string") return result[0];
  if (typeof result === "object" && result !== null) {
    const content = readProperty(result, "content") ?? readProperty(result, "text");
    if (typeof content === "string") return content;
  }
  return undefined;
}

function getProgramSourceFile(program: Program, file: DocumentIdentifier): SourceFile | undefined {
  const fileName = documentIdentifierToFileName(file);
  const sourceFile = callMethod(program, "getSourceFile", fileName)
    ?? callMethod(program, "GetSourceFile", fileName)
    ?? readMapValue(readProperty(program, "sourceFiles"), fileName);
  return sourceFile as SourceFile | undefined;
}

function getNodeAtDocumentPosition(program: Program, file: DocumentIdentifier, position: number): AstNode | undefined {
  const sourceFile = getProgramSourceFile(program, file);
  if (sourceFile === undefined) return undefined;
  const mappedPosition = utf16ToUtf8Position(sourceFile, position);
  return getTouchingPropertyName(sourceFile, mappedPosition);
}

function utf16ToUtf8Position(sourceFile: SourceFile, position: number): number {
  const positionMap = callMethod(sourceFile, "getPositionMap") ?? callMethod(sourceFile, "GetPositionMap") ?? readProperty(sourceFile, "positionMap");
  const converted = callMethod(positionMap, "utf16ToUtf8", position) ?? callMethod(positionMap, "UTF16ToUTF8", position);
  return typeof converted === "number" ? converted : position;
}

function resolveNodeHandle(program: Program, handle: Handle<AstNode>): AstNode | undefined {
  const parsed = parseNodeHandle(handle);
  if (parsed === undefined) return undefined;
  const sourceFile = getProgramSourceFile(program, { fileName: parsed.path });
  if (sourceFile === undefined) return undefined;
  return findNodeByRangeAndKind(sourceFile, parsed.pos, parsed.end, parsed.kind);
}

function parseNodeHandle(handle: Handle<AstNode>): { pos: number; end: number; kind: number; path: string } | undefined {
  const text: string = handle;
  const parts = text.split(".", 4);
  if (parts.length !== 4) return undefined;
  const pos = Number.parseInt(parts[0]!, 10);
  const end = Number.parseInt(parts[1]!, 10);
  const kind = Number.parseInt(parts[2]!, 10);
  if (!Number.isFinite(pos) || !Number.isFinite(end) || !Number.isFinite(kind)) return undefined;
  return { pos, end, kind, path: parts[3]! };
}

function findNodeByRangeAndKind(node: AstNode, pos: number, end: number, kind: number): AstNode | undefined {
  if (node.pos === pos && node.end === end && node.kind === kind) return node;
  const childProperties = ChildPropertiesByKind.get(node.kind) ?? [];
  for (const property of childProperties) {
    const value: unknown = Reflect.get(node, property);
    if (Array.isArray(value)) {
      for (const child of value) {
        if (isAstNode(child)) {
          const found = findNodeByRangeAndKind(child, pos, end, kind);
          if (found !== undefined) return found;
        }
      }
    } else if (isAstNode(value)) {
      const found = findNodeByRangeAndKind(value, pos, end, kind);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null
    && typeof (value as { kind?: unknown }).kind === "number"
    && typeof (value as { pos?: unknown }).pos === "number"
    && typeof (value as { end?: unknown }).end === "number";
}

function registerCheckerType(snapshotData: SnapshotData, checker: Checker, methodName: string, ...args: readonly unknown[]): TypeResponse | undefined {
  const value = callMethod(checker, methodName, ...args) ?? callMethod(checker, capitalizeMethod(methodName), ...args);
  return value === undefined ? undefined : snapshotData.registerType(value as TypeType);
}

function registerCheckerSymbol(snapshotData: SnapshotData, checker: Checker, methodName: string, ...args: readonly unknown[]): SymbolResponse | undefined {
  const value = callMethod(checker, methodName, ...args) ?? callMethod(checker, capitalizeMethod(methodName), ...args);
  return value === undefined ? undefined : snapshotData.registerSymbol(value as SymbolType);
}

function encodeResponseNode(node: unknown, useBinaryResponses: boolean): unknown {
  if (!isAstNode(node)) return undefined;
  const sourceFile = sourceFileOfNode(node);
  const data = encodeNode(node, sourceFile);
  return useBinaryResponses ? data : { data: Buffer.from(data).toString("base64") };
}

function sourceFileOfNode(node: AstNode): SourceFile {
  const sourceFile = callMethod(node, "getSourceFile") ?? callMethod(node, "GetSourceFile");
  if (isAstNode(sourceFile) && sourceFile.kind === Kind.SourceFile) return sourceFile as SourceFile;
  return {
    kind: Kind.SourceFile,
    pos: node.pos,
    end: node.end,
    flags: 0,
    text: "",
    fileName: "",
    path: "",
    statements: node.kind === Kind.SourceFile ? (node as SourceFile).statements : [node],
    endOfFileToken: { kind: Kind.EndOfFile, pos: node.end, end: node.end, flags: 0 },
  } as unknown as SourceFile;
}

function newDiagnosticResponse(diagnostic: DiagnosticType): DiagnosticResponse {
  const file = readProperty(diagnostic, "file") as { fileName?: string } | undefined;
  const messageText = readProperty(diagnostic, "messageText") ?? readProperty(diagnostic, "message") ?? readProperty(diagnostic, "text");
  return {
    fileName: file?.fileName ?? readString(diagnostic, "fileName", ""),
    pos: readNumber(diagnostic, "pos", 0),
    end: readNumber(diagnostic, "end", 0),
    code: readNumber(diagnostic, "code", 0),
    category: readNumber(diagnostic, "category", 0),
    text: typeof messageText === "string" ? messageText : String(messageText ?? ""),
  };
}

function printNodeOptions(params: PrintNodeParams): Parameters<typeof printFile>[1] {
  const options: NonNullable<Parameters<typeof printFile>[1]> = {};
  if (params.preserveSourceNewlines !== undefined) options.preserveSourceNewlines = params.preserveSourceNewlines;
  if (params.neverAsciiEscape !== undefined) options.neverAsciiEscape = params.neverAsciiEscape;
  if (params.terminateUnterminatedLiterals !== undefined) options.terminateUnterminatedLiterals = params.terminateUnterminatedLiterals;
  return options;
}

function capitalizeMethod(name: string): string {
  return name.length === 0 ? name : name[0]!.toUpperCase() + name.slice(1);
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
  baseType?: TypeType; constraint?: TypeType; properties?: readonly SymbolType[];
  indexInfos?: readonly IndexInfoType[];
}
interface IndexInfoType { keyType?: TypeType; valueType?: TypeType; isReadonly?: boolean }
interface DiagnosticType {
  file?: { fileName?: string }; fileName?: string; pos?: number; end?: number;
  code?: number; category?: number; messageText?: unknown; message?: unknown; text?: unknown;
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
interface DocumentIdentifier { uri?: string; fileName?: string }
interface InitializeResponse { sessionId: string; useCaseSensitiveFileNames: boolean; currentDirectory: string }
interface UpdateSnapshotParams { readonly _p?: unknown }
interface SnapshotChanges {
  changedProjects?: ReadonlyMap<Handle<Project>, ProjectFileChanges>;
  removedProjects?: readonly Handle<Project>[];
}
interface ProjectFileChanges { changedFiles?: readonly string[]; deletedFiles?: readonly string[] }
interface UpdateSnapshotResponse { snapshot: Handle<Snapshot>; projects: readonly ProjectResponse[]; changes?: SnapshotChanges }
interface ReleaseParams { handle: string }
interface GetDefaultProjectForFileParams { snapshot: Handle<Snapshot>; file: DocumentIdentifier }
interface ProjectResponse { id: Handle<Project>; configFileName: string; rootFiles: readonly string[]; compilerOptions: unknown }
interface ParseConfigFileParams { file: DocumentIdentifier }
interface ConfigFileResponse { fileNames: readonly string[]; options: unknown }
interface GetSourceFileParams { snapshot: Handle<Snapshot>; project: Handle<Project>; file: DocumentIdentifier }
interface GetSymbolAtPositionParams { snapshot: Handle<Snapshot>; project: Handle<Project>; file: DocumentIdentifier; position: number }
interface GetSymbolsAtPositionsParams { snapshot: Handle<Snapshot>; project: Handle<Project>; file: DocumentIdentifier; positions: readonly number[] }
interface GetSymbolAtLocationParams { snapshot: Handle<Snapshot>; project: Handle<Project>; location: Handle<AstNode> }
interface GetSymbolsAtLocationsParams { snapshot: Handle<Snapshot>; project: Handle<Project>; locations: readonly Handle<AstNode>[] }
interface GetTypeOfSymbolParams { snapshot: Handle<Snapshot>; project: Handle<Project>; symbol: Handle<SymbolType> }
interface GetTypesOfSymbolsParams { snapshot: Handle<Snapshot>; project: Handle<Project>; symbols: readonly Handle<SymbolType>[] }
interface ResolveNameParams {
  snapshot: Handle<Snapshot>; project: Handle<Project>; name: string; meaning: number;
  location?: Handle<AstNode>; file?: DocumentIdentifier; position?: number; excludeGlobals?: boolean;
}
interface GetParentOfSymbolParams { snapshot: Handle<Snapshot>; symbol: Handle<SymbolType> }
interface GetMembersOfSymbolParams { snapshot: Handle<Snapshot>; symbol: Handle<SymbolType> }
interface GetExportsOfSymbolParams { snapshot: Handle<Snapshot>; symbol: Handle<SymbolType> }
interface GetExportSymbolOfSymbolParams { snapshot: Handle<Snapshot>; symbol: Handle<SymbolType> }
interface GetSymbolOfTypeParams { snapshot: Handle<Snapshot>; type: Handle<TypeType> }
interface GetSignaturesOfTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType>; kind: number }
interface GetResolvedSignatureParams { snapshot: Handle<Snapshot>; project: Handle<Project>; location: Handle<AstNode> }
interface GetTypeAtLocationParams { snapshot: Handle<Snapshot>; project: Handle<Project>; location: Handle<AstNode> }
interface GetTypeAtLocationsParams { snapshot: Handle<Snapshot>; project: Handle<Project>; locations: readonly Handle<AstNode>[] }
interface GetTypeAtPositionParams { snapshot: Handle<Snapshot>; project: Handle<Project>; file: DocumentIdentifier; position: number }
interface GetTypesAtPositionsParams { snapshot: Handle<Snapshot>; project: Handle<Project>; file: DocumentIdentifier; positions: readonly number[] }
interface GetTypePropertyParams { snapshot: Handle<Snapshot>; type: Handle<TypeType> }
interface GetContextualTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; location: Handle<AstNode> }
interface GetBaseTypeOfLiteralTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType> }
interface GetNonNullableTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType> }
interface GetTypeFromTypeNodeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; location: Handle<AstNode> }
interface GetWidenedTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType> }
interface GetParameterTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; signature: Handle<SignatureType>; index: number }
interface IsArrayLikeTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType> }
interface GetTypeOfSymbolAtLocationParams { snapshot: Handle<Snapshot>; project: Handle<Project>; symbol: Handle<SymbolType>; location: Handle<AstNode> }
interface GetIntrinsicTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project> }
interface TypeToTypeNodeParams {
  snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType>;
  location?: Handle<AstNode>; flags?: number;
}
interface SignatureToSignatureDeclarationParams {
  snapshot: Handle<Snapshot>; project: Handle<Project>; signature: Handle<SignatureType>;
  kind: number; location?: Handle<AstNode>; flags?: number;
}
interface PrintNodeParams {
  data: string; preserveSourceNewlines?: boolean; neverAsciiEscape?: boolean; terminateUnterminatedLiterals?: boolean;
}
interface CheckerTypeParams { snapshot: Handle<Snapshot>; project: Handle<Project>; type: Handle<TypeType> }
interface CheckerSignatureParams { snapshot: Handle<Snapshot>; project: Handle<Project>; signature: Handle<SignatureType> }
interface TypePredicateResponse {
  kind: number; parameterName: string; parameterIndex: number; type?: Handle<TypeType>;
}
interface IndexInfoResponse { keyType: TypeResponse; valueType: TypeResponse; isReadonly: boolean }
interface GetDiagnosticsParams { snapshot: Handle<Snapshot>; project: Handle<Project>; file?: DocumentIdentifier }
interface GetProjectDiagnosticsParams { snapshot: Handle<Snapshot>; project: Handle<Project> }
interface DiagnosticResponse {
  fileName?: string; pos: number; end: number; code: number; category: number; text: string;
}

// AstNode reserved for future imports
export type _Ast = AstNode;
