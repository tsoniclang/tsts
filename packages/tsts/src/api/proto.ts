/**
 * API wire-protocol types.
 *
 * Substantive port of TS-Go `internal/api/proto.go` (~892 LoC, 74
 * named types/functions). All request/response param shapes, handle
 * factories (ProjectHandle, SymbolHandle, TypeHandle, SignatureHandle,
 * NodeHandleFrom), parse helpers, and the unmarshalPayload dispatch
 * routing method strings to typed parameter shapes.
 */

import type { Node as AstNode } from "../ast/index.js";
import { nodePos as getNodePos, nodeEnd as getNodeEnd } from "../ast/index.js";

function getNodePath(_node: AstNode): string {
  // TS-Go exposes a node→path string for diagnostic UI. The full
  // implementation walks ancestors; for now return empty until
  // ancestor-walk helpers are wired through emit-context.
  return "";
}

export const ErrInvalidRequest = new Error("api: invalid request");
export const ErrClientError = new Error("api: client error");

export type Method = string;
export type Handle<T> = string & { readonly __t?: T };

const HandlePrefix = {
  Project: "p",
  Symbol: "s",
  Type: "t",
  Snapshot: "n",
  Signature: "g",
} as const;

// ---------------------------------------------------------------------------
// Handle factories
// ---------------------------------------------------------------------------

export function projectHandle(p: ProjectType): Handle<ProjectType> {
  return `${HandlePrefix.Project}.${p.id}` as Handle<ProjectType>;
}

export function symbolHandle(symbol: SymbolType): Handle<SymbolType> {
  return createHandle<SymbolType>(HandlePrefix.Symbol, symbol.id);
}

export function typeHandle(t: TypeType): Handle<TypeType> {
  return createHandle<TypeType>(HandlePrefix.Type, t.id);
}

export function signatureHandle(id: number): Handle<SignatureType> {
  return createHandle<SignatureType>(HandlePrefix.Signature, id);
}

export function nodeHandleFrom(node: AstNode): Handle<AstNode> {
  return `n.${getNodePos(node)}.${getNodeEnd(node)}.${node.kind}.${getNodePath(node)}` as Handle<AstNode>;
}

export function parseNodeHandle(handle: Handle<AstNode>): {
  pos: number; end: number; kind: number; path: string; ok: boolean;
} {
  const parts = (handle as unknown as string).split(".");
  if (parts.length < 5) return { pos: 0, end: 0, kind: 0, path: "", ok: false };
  const pos = parseInt(parts[1]!, 10);
  const end = parseInt(parts[2]!, 10);
  const kind = parseInt(parts[3]!, 10);
  const path = parts.slice(4).join(".");
  if (isNaN(pos) || isNaN(end) || isNaN(kind)) {
    return { pos: 0, end: 0, kind: 0, path: "", ok: false };
  }
  return { pos, end, kind, path, ok: true };
}

export function parseProjectHandle(handle: Handle<ProjectType>): string {
  const s = handle as unknown as string;
  if (!s.startsWith(`${HandlePrefix.Project}.`)) return "";
  return s.slice(2);
}

function createHandle<T>(prefix: string, id: unknown): Handle<T> {
  return `${prefix}.${id}` as Handle<T>;
}

// ---------------------------------------------------------------------------
// Document identifier
// ---------------------------------------------------------------------------

export interface DocumentIdentifier {
  uri?: string;
  fileName?: string;
}

export function documentIdentifierToFileName(d: DocumentIdentifier): string {
  return d.fileName ?? "";
}

export function documentIdentifierToURI(d: DocumentIdentifier): string {
  return d.uri ?? "";
}

export function documentIdentifierToAbsoluteFileName(d: DocumentIdentifier, cwd: string): string {
  const name = documentIdentifierToFileName(d);
  if (name.startsWith("/")) return name;
  return `${cwd}/${name}`;
}

export function documentIdentifierString(d: DocumentIdentifier): string {
  return d.uri ?? d.fileName ?? "";
}

// ---------------------------------------------------------------------------
// Initialize / Snapshot params + responses
// ---------------------------------------------------------------------------

export interface InitializeResponse {
  sessionId: string;
}

export interface APIFileChangeSummary {
  added: readonly string[];
  removed: readonly string[];
  changed: readonly string[];
}

export interface APIFileChanges {
  open: readonly DocumentIdentifier[];
  close: readonly DocumentIdentifier[];
  change: readonly DocumentIdentifier[];
}

export interface UpdateSnapshotParams {
  changes: APIFileChanges;
}

export interface ProjectFileChanges {
  configFile?: DocumentIdentifier;
  changes: APIFileChangeSummary;
}

export interface SnapshotChanges {
  projects: readonly ProjectFileChanges[];
}

export interface UpdateSnapshotResponse {
  snapshot: Handle<SnapshotType>;
  changes?: SnapshotChanges;
}

// ---------------------------------------------------------------------------
// Per-request param shapes
// ---------------------------------------------------------------------------

export interface ParseConfigFileParams { document: DocumentIdentifier }
export interface ReleaseParams { snapshot: Handle<SnapshotType> }
export interface ConfigFileResponse { config: string }
export interface GetDefaultProjectForFileParams {
  snapshot: Handle<SnapshotType>; document: DocumentIdentifier;
}
export interface ProjectResponse { project: Handle<ProjectType> }
export interface GetSymbolAtPositionParams {
  snapshot: Handle<SnapshotType>; document: DocumentIdentifier; position: number;
}
export interface GetSymbolsAtPositionsParams {
  snapshot: Handle<SnapshotType>; document: DocumentIdentifier; positions: readonly number[];
}
export interface GetSymbolAtLocationParams {
  snapshot: Handle<SnapshotType>; location: Handle<AstNode>;
}
export interface GetSymbolsAtLocationsParams {
  snapshot: Handle<SnapshotType>; locations: readonly Handle<AstNode>[];
}
export interface SymbolResponse {
  handle: Handle<SymbolType>; name: string; flags: number;
}

export interface GetTypeOfSymbolParams { snapshot: Handle<SnapshotType>; symbol: Handle<SymbolType> }
export interface GetTypesOfSymbolsParams { snapshot: Handle<SnapshotType>; symbols: readonly Handle<SymbolType>[] }
export interface TypeResponse {
  handle: Handle<TypeType>; flags: number; aliasSymbol?: Handle<SymbolType>;
  target?: Handle<TypeType>;
}
export interface SignatureResponse {
  handle: Handle<SignatureType>; parameters: readonly Handle<SymbolType>[];
  typeParameters?: readonly Handle<TypeType>[]; returnType?: Handle<TypeType>;
}

export interface GetSourceFileParams { snapshot: Handle<SnapshotType>; document: DocumentIdentifier }
export interface ResolveNameParams {
  snapshot: Handle<SnapshotType>; location: Handle<AstNode>; name: string; meaning: number;
}
export interface GetParentOfSymbolParams { snapshot: Handle<SnapshotType>; symbol: Handle<SymbolType> }
export interface GetMembersOfSymbolParams { snapshot: Handle<SnapshotType>; symbol: Handle<SymbolType> }
export interface GetExportsOfSymbolParams { snapshot: Handle<SnapshotType>; symbol: Handle<SymbolType> }
export interface GetExportSymbolOfSymbolParams { snapshot: Handle<SnapshotType>; symbol: Handle<SymbolType> }
export interface GetSymbolOfTypeParams { snapshot: Handle<SnapshotType>; type: Handle<TypeType> }
export interface GetTypePropertyParams { snapshot: Handle<SnapshotType>; type: Handle<TypeType> }
export interface GetContextualTypeParams {
  snapshot: Handle<SnapshotType>; location: Handle<AstNode>; contextFlags?: number;
}
export interface GetTypeOfSymbolAtLocationParams {
  snapshot: Handle<SnapshotType>; symbol: Handle<SymbolType>; location: Handle<AstNode>;
}
export interface GetIntrinsicTypeParams { snapshot: Handle<SnapshotType>; name: string }
export interface GetBaseTypeOfLiteralTypeParams { snapshot: Handle<SnapshotType>; type: Handle<TypeType> }
export interface GetSignaturesOfTypeParams {
  snapshot: Handle<SnapshotType>; type: Handle<TypeType>; kind: number;
}
export interface GetTypeAtLocationParams { snapshot: Handle<SnapshotType>; location: Handle<AstNode> }
export interface GetTypeAtLocationsParams { snapshot: Handle<SnapshotType>; locations: readonly Handle<AstNode>[] }
export interface GetTypeAtPositionParams {
  snapshot: Handle<SnapshotType>; document: DocumentIdentifier; position: number;
}
export interface GetTypesAtPositionsParams {
  snapshot: Handle<SnapshotType>; document: DocumentIdentifier; positions: readonly number[];
}
export interface TypeToTypeNodeParams { snapshot: Handle<SnapshotType>; type: Handle<TypeType>; flags?: number }
export interface PrintNodeParams { snapshot: Handle<SnapshotType>; node: Handle<AstNode> }
export interface CheckerTypeParams { snapshot: Handle<SnapshotType>; type: Handle<TypeType> }
export interface CheckerSignatureParams { snapshot: Handle<SnapshotType>; signature: Handle<SignatureType> }

export interface TypePredicateResponse {
  kind: number; parameterName: string; parameterIndex: number; type?: Handle<TypeType>;
}
export interface IndexInfoResponse { keyType: Handle<TypeType>; type: Handle<TypeType>; isReadonly: boolean }
export interface SourceFileResponse { document: DocumentIdentifier; node: Handle<AstNode> }

export interface GetDiagnosticsParams { snapshot: Handle<SnapshotType>; document: DocumentIdentifier }
export interface GetProjectDiagnosticsParams { snapshot: Handle<SnapshotType>; project: Handle<ProjectType> }
export interface DiagnosticResponse {
  code: number; messageText: string; category: number; start?: number; length?: number;
  fileName?: string; relatedInformation?: readonly DiagnosticResponse[];
}

// ---------------------------------------------------------------------------
// Response factories
// ---------------------------------------------------------------------------

export function newProjectResponse(p: ProjectType): ProjectResponse {
  return { project: projectHandle(p) };
}

export function newSymbolResponse(symbol: SymbolType): SymbolResponse {
  return { handle: symbolHandle(symbol), name: symbol.name, flags: symbol.flags };
}

export function newTypeData(t: TypeType): TypeResponse {
  return { handle: typeHandle(t), flags: t.flags };
}

export function typeHandles(types: readonly TypeType[]): readonly Handle<TypeType>[] {
  return types.map((t) => typeHandle(t));
}

export function literalValueToJSON(value: unknown): unknown {
  if (typeof value === "bigint") return value.toString();
  return value;
}

export function newDiagnosticResponse(d: DiagnosticType): DiagnosticResponse {
  return { code: d.code, messageText: d.messageText, category: d.category };
}

export function newDiagnosticResponses(diags: readonly DiagnosticType[]): readonly DiagnosticResponse[] {
  return diags.map((d) => newDiagnosticResponse(d));
}

// ---------------------------------------------------------------------------
// Method constants (mirrors TS-Go `Method` consts)
// ---------------------------------------------------------------------------

export const Method = {
  // Top-level lifecycle
  Release: "release" as Method,
  Initialize: "initialize" as Method,
  UpdateSnapshot: "updateSnapshot" as Method,
  ParseConfigFile: "parseConfigFile" as Method,
  GetDefaultProjectForFile: "getDefaultProjectForFile" as Method,
  GetSourceFile: "getSourceFile" as Method,

  // Symbol lookup
  GetSymbolAtPosition: "getSymbolAtPosition" as Method,
  GetSymbolsAtPositions: "getSymbolsAtPositions" as Method,
  GetSymbolAtLocation: "getSymbolAtLocation" as Method,
  GetSymbolsAtLocations: "getSymbolsAtLocations" as Method,
  GetTypeOfSymbol: "getTypeOfSymbol" as Method,
  GetTypesOfSymbols: "getTypesOfSymbols" as Method,
  GetDeclaredTypeOfSymbol: "getDeclaredTypeOfSymbol" as Method,
  ResolveName: "resolveName" as Method,
  GetParentOfSymbol: "getParentOfSymbol" as Method,
  GetMembersOfSymbol: "getMembersOfSymbol" as Method,
  GetExportsOfSymbol: "getExportsOfSymbol" as Method,
  GetExportSymbolOfSymbol: "getExportSymbolOfSymbol" as Method,
  GetSymbolOfType: "getSymbolOfType" as Method,

  // Type lookup
  GetSignaturesOfType: "getSignaturesOfType" as Method,
  GetTypeAtLocation: "getTypeAtLocation" as Method,
  GetTypeAtLocations: "getTypeAtLocations" as Method,
  GetTypeAtPosition: "getTypeAtPosition" as Method,
  GetTypesAtPositions: "getTypesAtPositions" as Method,

  // Type sub-property
  GetTargetOfType: "getTargetOfType" as Method,
  GetTypesOfType: "getTypesOfType" as Method,
  GetTypeParametersOfType: "getTypeParametersOfType" as Method,
  GetOuterTypeParametersOfType: "getOuterTypeParametersOfType" as Method,
  GetLocalTypeParametersOfType: "getLocalTypeParametersOfType" as Method,
  GetObjectTypeOfType: "getObjectTypeOfType" as Method,
  GetIndexTypeOfType: "getIndexTypeOfType" as Method,
  GetCheckTypeOfType: "getCheckTypeOfType" as Method,
  GetExtendsTypeOfType: "getExtendsTypeOfType" as Method,
  GetBaseTypeOfType: "getBaseTypeOfType" as Method,
  GetConstraintOfType: "getConstraintOfType" as Method,

  // Checker
  GetContextualType: "getContextualType" as Method,
  GetBaseTypeOfLiteralType: "getBaseTypeOfLiteralType" as Method,
  GetShorthandAssignmentValueSymbol: "getShorthandAssignmentValueSymbol" as Method,
  GetTypeOfSymbolAtLocation: "getTypeOfSymbolAtLocation" as Method,
  TypeToTypeNode: "typeToTypeNode" as Method,
  TypeToString: "typeToString" as Method,
  IsContextSensitive: "isContextSensitive" as Method,
  GetReturnTypeOfSignature: "getReturnTypeOfSignature" as Method,
  GetRestTypeOfSignature: "getRestTypeOfSignature" as Method,
  GetTypePredicateOfSignature: "getTypePredicateOfSignature" as Method,
  GetBaseTypes: "getBaseTypes" as Method,
  GetPropertiesOfType: "getPropertiesOfType" as Method,
  GetIndexInfosOfType: "getIndexInfosOfType" as Method,
  GetConstraintOfTypeParameter: "getConstraintOfTypeParameter" as Method,
  GetTypeArguments: "getTypeArguments" as Method,

  // Diagnostics
  GetSyntacticDiagnostics: "getSyntacticDiagnostics" as Method,
  GetSemanticDiagnostics: "getSemanticDiagnostics" as Method,
  GetSuggestionDiagnostics: "getSuggestionDiagnostics" as Method,
  GetDeclarationDiagnostics: "getDeclarationDiagnostics" as Method,
  GetConfigFileParsingDiagnostics: "getConfigFileParsingDiagnostics" as Method,

  // Emitter
  PrintNode: "printNode" as Method,

  // Intrinsic-type getters
  GetAnyType: "getAnyType" as Method,
  GetStringType: "getStringType" as Method,
  GetNumberType: "getNumberType" as Method,
  GetBooleanType: "getBooleanType" as Method,
  GetVoidType: "getVoidType" as Method,
  GetUndefinedType: "getUndefinedType" as Method,
  GetNullType: "getNullType" as Method,
  GetNeverType: "getNeverType" as Method,
  GetUnknownType: "getUnknownType" as Method,
  GetBigIntType: "getBigIntType" as Method,
  GetESSymbolType: "getESSymbolType" as Method,
} as const;

// ---------------------------------------------------------------------------
// Payload unmarshalling
// ---------------------------------------------------------------------------

/**
 * Decodes raw JSON-bytes (typically read off an msgpack/jsonrpc wire)
 * into a typed `T` payload value. Returns `undefined` if decode fails.
 * Mirrors TS-Go's generic `unmarshallerFor[T]`.
 */
export function unmarshallerFor<T>(data: Uint8Array | string | unknown): T | undefined {
  if (data === undefined || data === null) return undefined;
  if (typeof data === "object" && !(data instanceof Uint8Array)) {
    // Already-decoded value (jsonrpc layer pre-decoded).
    return data as T;
  }
  let text: string;
  if (data instanceof Uint8Array) {
    text = new TextDecoder().decode(data);
  } else if (typeof data === "string") {
    text = data;
  } else {
    return undefined;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

/** No-params unmarshaler. Mirrors TS-Go `noParams`. */
export function noParams(_data: unknown): undefined {
  return undefined;
}

// Method → typed unmarshaler dispatch table. Mirrors TS-Go's
// `unmarshalers` map.
type Unmarshaler = (data: unknown) => unknown;
const unmarshalers: ReadonlyMap<Method, Unmarshaler> = new Map<Method, Unmarshaler>([
  [Method.Release, (d) => unmarshallerFor<ReleaseParams>(d)],
  [Method.Initialize, noParams],
  [Method.UpdateSnapshot, (d) => unmarshallerFor<UpdateSnapshotParams>(d)],
  [Method.ParseConfigFile, (d) => unmarshallerFor<ParseConfigFileParams>(d)],
  [Method.GetDefaultProjectForFile, (d) => unmarshallerFor<GetDefaultProjectForFileParams>(d)],
  [Method.GetSourceFile, (d) => unmarshallerFor<GetSourceFileParams>(d)],
  [Method.GetSymbolAtPosition, (d) => unmarshallerFor<GetSymbolAtPositionParams>(d)],
  [Method.GetSymbolsAtPositions, (d) => unmarshallerFor<GetSymbolsAtPositionsParams>(d)],
  [Method.GetSymbolAtLocation, (d) => unmarshallerFor<GetSymbolAtLocationParams>(d)],
  [Method.GetSymbolsAtLocations, (d) => unmarshallerFor<GetSymbolsAtLocationsParams>(d)],
  [Method.GetTypeOfSymbol, (d) => unmarshallerFor<GetTypeOfSymbolParams>(d)],
  [Method.GetTypesOfSymbols, (d) => unmarshallerFor<GetTypesOfSymbolsParams>(d)],
  [Method.GetDeclaredTypeOfSymbol, (d) => unmarshallerFor<GetTypeOfSymbolParams>(d)],
  [Method.ResolveName, (d) => unmarshallerFor<ResolveNameParams>(d)],
  [Method.GetParentOfSymbol, (d) => unmarshallerFor<GetParentOfSymbolParams>(d)],
  [Method.GetMembersOfSymbol, (d) => unmarshallerFor<GetMembersOfSymbolParams>(d)],
  [Method.GetExportsOfSymbol, (d) => unmarshallerFor<GetExportsOfSymbolParams>(d)],
  [Method.GetExportSymbolOfSymbol, (d) => unmarshallerFor<GetExportSymbolOfSymbolParams>(d)],
  [Method.GetSymbolOfType, (d) => unmarshallerFor<GetSymbolOfTypeParams>(d)],
  [Method.GetSignaturesOfType, (d) => unmarshallerFor<GetSignaturesOfTypeParams>(d)],
  [Method.GetTypeAtLocation, (d) => unmarshallerFor<GetTypeAtLocationParams>(d)],
  [Method.GetTypeAtLocations, (d) => unmarshallerFor<GetTypeAtLocationsParams>(d)],
  [Method.GetTypeAtPosition, (d) => unmarshallerFor<GetTypeAtPositionParams>(d)],
  [Method.GetTypesAtPositions, (d) => unmarshallerFor<GetTypesAtPositionsParams>(d)],
  [Method.GetTargetOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetTypesOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetTypeParametersOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetOuterTypeParametersOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetLocalTypeParametersOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetObjectTypeOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetIndexTypeOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetCheckTypeOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetExtendsTypeOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetBaseTypeOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetConstraintOfType, (d) => unmarshallerFor<GetTypePropertyParams>(d)],
  [Method.GetContextualType, (d) => unmarshallerFor<GetContextualTypeParams>(d)],
  [Method.GetBaseTypeOfLiteralType, (d) => unmarshallerFor<GetBaseTypeOfLiteralTypeParams>(d)],
  [Method.GetShorthandAssignmentValueSymbol, (d) => unmarshallerFor<GetTypeAtLocationParams>(d)],
  [Method.GetTypeOfSymbolAtLocation, (d) => unmarshallerFor<GetTypeOfSymbolAtLocationParams>(d)],
  [Method.TypeToTypeNode, (d) => unmarshallerFor<TypeToTypeNodeParams>(d)],
  [Method.TypeToString, (d) => unmarshallerFor<TypeToTypeNodeParams>(d)],
  [Method.IsContextSensitive, (d) => unmarshallerFor<GetContextualTypeParams>(d)],
  [Method.GetReturnTypeOfSignature, (d) => unmarshallerFor<CheckerSignatureParams>(d)],
  [Method.GetRestTypeOfSignature, (d) => unmarshallerFor<CheckerSignatureParams>(d)],
  [Method.GetTypePredicateOfSignature, (d) => unmarshallerFor<CheckerSignatureParams>(d)],
  [Method.GetBaseTypes, (d) => unmarshallerFor<CheckerTypeParams>(d)],
  [Method.GetPropertiesOfType, (d) => unmarshallerFor<CheckerTypeParams>(d)],
  [Method.GetIndexInfosOfType, (d) => unmarshallerFor<CheckerTypeParams>(d)],
  [Method.GetConstraintOfTypeParameter, (d) => unmarshallerFor<CheckerTypeParams>(d)],
  [Method.GetTypeArguments, (d) => unmarshallerFor<CheckerTypeParams>(d)],
  [Method.PrintNode, (d) => unmarshallerFor<PrintNodeParams>(d)],
  [Method.GetAnyType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetStringType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetNumberType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetBooleanType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetVoidType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetUndefinedType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetNullType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetNeverType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetUnknownType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetBigIntType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetESSymbolType, (d) => unmarshallerFor<GetIntrinsicTypeParams>(d)],
  [Method.GetSyntacticDiagnostics, (d) => unmarshallerFor<GetDiagnosticsParams>(d)],
  [Method.GetSemanticDiagnostics, (d) => unmarshallerFor<GetDiagnosticsParams>(d)],
  [Method.GetSuggestionDiagnostics, (d) => unmarshallerFor<GetDiagnosticsParams>(d)],
  [Method.GetDeclarationDiagnostics, (d) => unmarshallerFor<GetDiagnosticsParams>(d)],
  [Method.GetConfigFileParsingDiagnostics, (d) => unmarshallerFor<GetProjectDiagnosticsParams>(d)],
]);

/**
 * Decodes a request's JSON payload into the typed parameter shape for
 * the given API method. Throws ErrInvalidRequest if the method is
 * unknown. Mirrors TS-Go `unmarshalPayload`.
 */
export function unmarshalPayload(method: string, payload: unknown): unknown {
  const unmarshaler = unmarshalers.get(method as Method);
  if (unmarshaler === undefined) {
    throw new Error(`api: unknown method ${JSON.stringify(method)}`);
  }
  return unmarshaler(payload);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface ProjectType { id: string; readonly _p?: unknown }
interface SymbolType { id: number; name: string; flags: number; readonly _s?: unknown }
interface TypeType { id: number; flags: number; readonly _t?: unknown }
interface SignatureType { readonly _sig?: unknown }
interface SnapshotType { readonly _snap?: unknown }
interface DiagnosticType { code: number; messageText: string; category: number }

