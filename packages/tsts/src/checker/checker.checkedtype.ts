/**
 * Checker — intrinsic type singletons + leaf helpers.
 *
 * Part of the `checker.go` port, split by concern (see checker.ts).
 * Holds the checker's intrinsic `Type` singletons (the flags-based
 * `Type` from types.ts — the `types.go` port), assignability (delegated
 * to the `Relater`, the `relater.go` port), type-node resolution, and
 * binding-name binding. It depends only on types.ts + relater.ts, so it
 * remains the safe base of the checker's import graph.
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
import {
  type Type,
  type IntrinsicType,
  type ObjectType,
  type Signature,
  TypeFlags,
  ObjectFlags,
} from "./types.js";
import { type Relater, newRelater } from "./relater.js";

export type { Type } from "./types.js";

export interface CheckDiagnostic {
  readonly message: string;
}

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

export interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
  readonly relater: Relater;
  nextTypeId(): number;
}

export type TypeEnvironment = Map<string, Type>;

export function newCheckState(): CheckState {
  const idSource = { value: 1000 };
  return {
    diagnostics: [],
    relater: newRelater(),
    nextTypeId: () => {
      idSource.value += 1;
      return idSource.value;
    },
  };
}

// ---------------------------------------------------------------------------
// Intrinsic type singletons (mirror checker.go's `c.anyType` etc., created
// via `newIntrinsicType`). Fixed ids keep them stable across checks.
// ---------------------------------------------------------------------------

function intrinsicType(id: number, flags: TypeFlags, name: string): Type {
  const data: IntrinsicType = { intrinsicName: name, objectFlags: ObjectFlags.None };
  return { flags, id, data };
}

export const anyType: Type = intrinsicType(1, TypeFlags.Any, "any");
export const unknownType: Type = intrinsicType(2, TypeFlags.Unknown, "unknown");
export const numberType: Type = intrinsicType(3, TypeFlags.Number, "number");
export const stringType: Type = intrinsicType(4, TypeFlags.String, "string");
export const booleanType: Type = intrinsicType(5, TypeFlags.Boolean, "boolean");
export const voidType: Type = intrinsicType(6, TypeFlags.Void, "void");
export const undefinedType: Type = intrinsicType(7, TypeFlags.Undefined, "undefined");
export const nullType: Type = intrinsicType(8, TypeFlags.Null, "null");
export const neverType: Type = intrinsicType(9, TypeFlags.Never, "never");
// `unresolvedType` is the checker's error type: Any-flagged so it both
// accepts and is accepted, suppressing cascading diagnostics (mirrors
// checker.go's `errorType`).
export const unresolvedType: Type = intrinsicType(10, TypeFlags.Any, "error");

// ---------------------------------------------------------------------------
// Intrinsic identity predicates. Intrinsics are singletons, so identity is
// an exact discriminant (and distinguishes `any` from the error type, which
// share TypeFlags.Any).
// ---------------------------------------------------------------------------

export function isAnyType(type: Type): boolean { return type === anyType; }
export function isUnknownType(type: Type): boolean { return type === unknownType; }
export function isUnresolvedType(type: Type): boolean { return type === unresolvedType; }
export function isNumberType(type: Type): boolean { return type === numberType; }
export function isStringType(type: Type): boolean { return type === stringType; }
export function isBooleanType(type: Type): boolean { return type === booleanType; }

// ---------------------------------------------------------------------------
// Function types: anonymous object types carrying a single call signature
// (the on-model representation — functions are object types in TS-Go).
// ---------------------------------------------------------------------------

export function makeFunctionType(returnType: Type, state: CheckState): Type {
  const signature: Signature = {
    flags: 0,
    parameters: [],
    minArgumentCount: 0,
    resolvedReturnType: returnType,
  };
  const data: ObjectType = {
    objectFlags: ObjectFlags.Anonymous,
    declaredCallSignatures: [signature],
  };
  return { flags: TypeFlags.Object, id: state.nextTypeId(), data };
}

export function isFunctionType(type: Type): boolean {
  if ((type.flags & TypeFlags.Object) === 0) return false;
  const data = type.data as ObjectType | undefined;
  return data?.declaredCallSignatures !== undefined && data.declaredCallSignatures.length > 0;
}

export function getFunctionReturnType(type: Type): Type {
  const data = type.data as ObjectType | undefined;
  return data?.declaredCallSignatures?.[0]?.resolvedReturnType ?? unresolvedType;
}

// ---------------------------------------------------------------------------
// Leaf helpers
// ---------------------------------------------------------------------------

export function typeFromTypeNode(type: TypeNode): Type {
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

export function checkAssignable(actual: Type, expected: Type, state: CheckState): void {
  if (!state.relater.isTypeAssignableTo(actual, expected)) {
    state.diagnostics.push({
      message: `Type '${displayType(actual)}' is not assignable to type '${displayType(expected)}'.`,
    });
  }
}

export function setBindingNameType(name: BindingName, type: Type, environment: TypeEnvironment): void {
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

export function setBindingElementType(element: BindingElement, type: Type, environment: TypeEnvironment): void {
  if (element.name !== undefined) {
    setBindingNameType(element.name, type, environment);
  }
}

export function displayType(type: Type): string {
  if (isFunctionType(type)) return "function";
  const name = (type.data as IntrinsicType | undefined)?.intrinsicName;
  if (name === undefined || name === "error") return "unknown";
  return name;
}
