/**
 * Index-signature declaration helpers.
 *
 * Ported from Strada `checker.go` — getIndexSignaturesOfType,
 * getStringOrNumericIndex, hasIndexSignatureDeclarations.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export interface IndexSignature {
  readonly keyType: Type;
  readonly valueType: Type;
  readonly isReadonly: boolean;
}

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;
const NUMBER: Type = { flags: TypeFlags.Number } as unknown as Type;
const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when a member is an IndexSignature declaration.
 */
export function isIndexSignatureDeclaration(node: AstNode): boolean {
  return node.kind === Kind.IndexSignature;
}

/**
 * Returns the index-signature declarations of a class/interface.
 */
export function getIndexSignatureDeclarations(decl: AstNode): readonly AstNode[] {
  const members = (decl as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  if (members === undefined) return [];
  return members.filter(isIndexSignatureDeclaration);
}

/**
 * Returns true when the IndexSignature uses `string` as its key.
 */
export function isStringIndexSignature(sig: AstNode): boolean {
  if (!isIndexSignatureDeclaration(sig)) return false;
  const params = (sig as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return false;
  const paramType = (params[0] as unknown as { type?: AstNode }).type;
  return paramType !== undefined && paramType.kind === Kind.StringKeyword;
}

/**
 * Returns true when the IndexSignature uses `number` as its key.
 */
export function isNumberIndexSignature(sig: AstNode): boolean {
  if (!isIndexSignatureDeclaration(sig)) return false;
  const params = (sig as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return false;
  const paramType = (params[0] as unknown as { type?: AstNode }).type;
  return paramType !== undefined && paramType.kind === Kind.NumberKeyword;
}

/**
 * Returns the resolved string-index value type, or undefined.
 */
export function getStringIndexValueType(t: Type): Type | undefined {
  const info = (t as unknown as { stringIndexInfo?: IndexSignature }).stringIndexInfo;
  return info?.valueType;
}

/**
 * Returns the resolved number-index value type, or undefined.
 */
export function getNumberIndexValueType(t: Type): Type | undefined {
  const info = (t as unknown as { numberIndexInfo?: IndexSignature }).numberIndexInfo;
  return info?.valueType;
}

/**
 * Builds an IndexSignature for a string key.
 */
export function createStringIndexSignature(valueType: Type, isReadonly = false): IndexSignature {
  return { keyType: STRING, valueType, isReadonly };
}

/**
 * Builds an IndexSignature for a number key.
 */
export function createNumberIndexSignature(valueType: Type, isReadonly = false): IndexSignature {
  return { keyType: NUMBER, valueType, isReadonly };
}

/**
 * Returns true when the type has either a string or a number index
 * signature.
 */
export function hasAnyIndexSignature(t: Type): boolean {
  return getStringIndexValueType(t) !== undefined ||
    getNumberIndexValueType(t) !== undefined;
}

/**
 * Returns the canonical value-type for an indexed access using the
 * given key kind. Falls back to Any when no signature matches.
 */
export function getIndexedValueType(t: Type, keyKind: "string" | "number"): Type {
  if (keyKind === "string") {
    return getStringIndexValueType(t) ?? ANY;
  }
  // Numeric keys can match the string index too, when present.
  return getNumberIndexValueType(t) ?? getStringIndexValueType(t) ?? ANY;
}
