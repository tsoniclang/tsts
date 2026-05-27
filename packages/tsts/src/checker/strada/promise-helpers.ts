/**
 * Async function and Promise-related helpers.
 *
 * Ported from Strada `checker.go` — checkAsyncFunctionReturnType,
 * isPromiseLike, getReturnTypeOfAsyncFunctionDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isPromiseType, createPromiseType, getAwaitedType } from "./promises.js";

const VOID: Type = { flags: TypeFlags.Void } as unknown as Type;

/**
 * Returns true when the function-like declaration is marked async.
 */
export function isAsyncFunction(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.AsyncKeyword) === true;
}

/**
 * Returns the inferred return type of an async function — wraps the
 * body's return type in Promise.
 */
export function inferAsyncReturnType(bodyReturnType: Type): Type {
  if (isPromiseType(bodyReturnType)) return bodyReturnType;
  return createPromiseType(bodyReturnType);
}

/**
 * Returns the awaited result type — `Promise<T>` → T.
 */
export function awaitResult(t: Type): Type {
  return getAwaitedType(t);
}

/**
 * Returns true when a return type annotation on an async function is
 * legal (must be Promise<T>, Any, or Unknown).
 */
export function isLegalAsyncReturnType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & (TypeFlags.Any | TypeFlags.Unknown | TypeFlags.Void)) !== 0) return true;
  return isPromiseType(t);
}

/**
 * Returns the canonical Promise<void> type — used for async functions
 * with no explicit return.
 */
export function getPromiseVoidType(): Type {
  return createPromiseType(VOID);
}

/**
 * Returns true when a value is "thenable" — has a `then` method.
 */
export function isThenable(t: Type): boolean {
  if (isPromiseType(t)) return true;
  const members = (t as unknown as { symbol?: { members?: Map<string, unknown> } }).symbol?.members;
  return members?.has("then") === true;
}

/**
 * Returns the return-type annotation of an async function.
 */
export function getAsyncReturnAnnotation(decl: AstNode): AstNode | undefined {
  if (!isAsyncFunction(decl)) return undefined;
  return (decl as unknown as { type?: AstNode }).type;
}
