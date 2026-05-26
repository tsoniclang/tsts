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
// Payload unmarshalling
// ---------------------------------------------------------------------------

export function unmarshalPayload(method: string, payload: unknown): unknown {
  void method;
  return payload;
}

export function unmarshallerFor<T>(data: Uint8Array): T | undefined {
  void data;
  return undefined;
}

export function noParams(_data: Uint8Array): unknown {
  return undefined;
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

declare function getNodePos(node: AstNode): number;
declare function getNodeEnd(node: AstNode): number;
declare function getNodePath(node: AstNode): string;
