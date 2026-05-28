/**
 * Checker — shared checked-type model + leaf helpers.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * This module holds the simplified structural type model the checker
 * currently uses, plus the leaf helpers that depend only on it
 * (assignability, type-node resolution, binding-name binding). It has
 * no dependency on the statement/expression/declaration check files,
 * so it is the safe base of the import graph.
 *
 * NOTE: `CheckedType` is a deliberately-simplified stand-in for the
 * flags-based `Type` in types.ts (the `types.go` port). Migrating the
 * checker onto the real `Type` is part of the checker.go body port.
 */

import {
  Kind,
  isIdentifier,
  isObjectBindingPattern,
  isArrayBindingPattern,
  isKeywordTypeNode,
  type BindingElement,
  type BindingName,
  type TypeNode,
} from "../ast/index.js";

export type PrimitiveTypeName =
  | "any"
  | "boolean"
  | "number"
  | "string"
  | "unknown"
  | "void";

export type CheckedType =
  | { readonly kind: PrimitiveTypeName | "unresolved" }
  | { readonly kind: "function"; readonly returnType: CheckedType };

export interface CheckDiagnostic {
  readonly message: string;
}

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

export interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
}

export type TypeEnvironment = Map<string, CheckedType>;

export const anyType: CheckedType = { kind: "any" };
export const unknownType: CheckedType = { kind: "unknown" };
export const unresolvedType: CheckedType = { kind: "unresolved" };
export const numberType: CheckedType = { kind: "number" };
export const stringType: CheckedType = { kind: "string" };
export const voidType: CheckedType = { kind: "void" };
export const booleanType: CheckedType = { kind: "boolean" };

export function typeFromTypeNode(type: TypeNode): CheckedType {
  if (isKeywordTypeNode(type)) {
    switch (type.kind) {
      case Kind.AnyKeyword:
        return anyType;
      case Kind.BooleanKeyword:
        return booleanType;
      case Kind.NumberKeyword:
        return numberType;
      case Kind.StringKeyword:
        return stringType;
      case Kind.VoidKeyword:
        return voidType;
      case Kind.UnknownKeyword:
        return unknownType;
      default:
        return unknownType;
    }
  }
  return anyType;
}

export function checkAssignable(actual: CheckedType, expected: CheckedType, state: CheckState): void {
  if (expected.kind === "any" || actual.kind === "any" || expected.kind === "unknown" || actual.kind === "unresolved") {
    return;
  }
  if (actual.kind !== expected.kind) {
    state.diagnostics.push({
      message: `Type '${displayType(actual)}' is not assignable to type '${displayType(expected)}'.`,
    });
  }
}

export function setBindingNameType(name: BindingName, type: CheckedType, environment: TypeEnvironment): void {
  if (isIdentifier(name)) {
    environment.set(name.text, type);
    return;
  }
  if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      setBindingElementType(element, type, environment);
    }
  }
}

export function setBindingElementType(element: BindingElement, type: CheckedType, environment: TypeEnvironment): void {
  if (element.name !== undefined) {
    setBindingNameType(element.name, type, environment);
  }
}

export function displayType(type: CheckedType): string {
  return type.kind === "function" ? "function" : type.kind === "unresolved" ? "unknown" : type.kind;
}
