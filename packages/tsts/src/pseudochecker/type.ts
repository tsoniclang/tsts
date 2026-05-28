/**
 * PseudoType definitions.
 *
 * Port of TS-Go internal/pseudochecker/type.go.
 *
 * `PseudoType`s are skeletons of types — partially interpreted expressions and
 * type nodes composed to represent how you *should* construct a type out of
 * them. They can be trivially mapped into actual types by a real `Checker`, or
 * into a tree of `Node`s directly, without needing to make any intermediate
 * types, by a `NodeBuilder`. Unlike checker `Type`s, these are never
 * normalized, and multiple pseudo-types may refer to the same underlying
 * `Type`.
 *
 * In strada, these were implicit in the AST nodes constructed in
 * `expressionToTypeNode.ts`, which repurposed AST nodes for this purpose, but
 * in so doing, often confused whether or not it had validated nested nodes for
 * use at a given use-site. By keeping the mapping deferred like this, we can
 * know we haven't done any use-site checks until we're ready to map the
 * `PseudoType` into a `Node`, and can cache `PseudoType`s across multiple
 * target positions.
 *
 * Go models each variant as a struct embedding a shared `PseudoType` base with
 * a `Kind` tag plus a `data` interface; the `As*` methods cast `data` to the
 * concrete variant. The faithful TS port expresses this as a discriminated
 * union on `kind`, with constructor functions and `As*` accessors mirroring
 * the Go API. The `iota` kind enums are ported as literal-unions + const maps
 * per the NO-enum rule.
 */

import type { Node, TypeParameterDeclaration } from "../ast/index.js";

// ---------------------------------------------------------------------------
// PseudoTypeKind (Go: iota enum) → literal-union + const map
// ---------------------------------------------------------------------------

export type PseudoTypeKind =
  | typeof PseudoTypeKind.Direct
  | typeof PseudoTypeKind.Inferred
  | typeof PseudoTypeKind.NoResult
  | typeof PseudoTypeKind.MaybeConstLocation
  | typeof PseudoTypeKind.Union
  | typeof PseudoTypeKind.Undefined
  | typeof PseudoTypeKind.Null
  | typeof PseudoTypeKind.Any
  | typeof PseudoTypeKind.String
  | typeof PseudoTypeKind.Number
  | typeof PseudoTypeKind.BigInt
  | typeof PseudoTypeKind.Boolean
  | typeof PseudoTypeKind.False
  | typeof PseudoTypeKind.True
  | typeof PseudoTypeKind.SingleCallSignature
  | typeof PseudoTypeKind.Tuple
  | typeof PseudoTypeKind.ObjectLiteral
  | typeof PseudoTypeKind.StringLiteral
  | typeof PseudoTypeKind.NumericLiteral
  | typeof PseudoTypeKind.BigIntLiteral;

export const PseudoTypeKind = {
  Direct: 0,
  Inferred: 1,
  NoResult: 2,
  MaybeConstLocation: 3,
  Union: 4,
  Undefined: 5,
  Null: 6,
  Any: 7,
  String: 8,
  Number: 9,
  BigInt: 10,
  Boolean: 11,
  False: 12,
  True: 13,
  SingleCallSignature: 14,
  Tuple: 15,
  ObjectLiteral: 16,
  StringLiteral: 17,
  NumericLiteral: 18,
  BigIntLiteral: 19,
} as const;

// ---------------------------------------------------------------------------
// PseudoType variants
// ---------------------------------------------------------------------------

/** Common fields shared by every PseudoType variant (Go: embedded PseudoType base). */
interface PseudoTypeCommon {
  readonly kind: PseudoTypeKind;
}

/**
 * Base/keyword pseudo-types with no extra data: undefined, null, any, string,
 * number, bigint, boolean, false, true. (Go: PseudoTypeBase variants.)
 */
export interface PseudoTypeBase extends PseudoTypeCommon {
  readonly kind:
    | typeof PseudoTypeKind.Undefined
    | typeof PseudoTypeKind.Null
    | typeof PseudoTypeKind.Any
    | typeof PseudoTypeKind.String
    | typeof PseudoTypeKind.Number
    | typeof PseudoTypeKind.BigInt
    | typeof PseudoTypeKind.Boolean
    | typeof PseudoTypeKind.False
    | typeof PseudoTypeKind.True;
}

/** PseudoTypeDirect directly encodes the type referred to by a given TypeNode. */
export interface PseudoTypeDirect extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.Direct;
  readonly typeNode: Node;
}

/**
 * PseudoTypeInferred directly encodes the type referred to by a given
 * Expression. These represent cases where the expression was too complex for
 * the pseudochecker. Most of the time, these locations will produce an error
 * under ID. Specific error nodes (shorthand properties, spread assignments,
 * etc.) are stored on the ErrorNodes field, collected during pseudochecker
 * construction.
 */
export interface PseudoTypeInferred extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.Inferred;
  readonly expression: Node;
  readonly errorNodes: readonly Node[];
}

/**
 * PseudoTypeNoResult is analogous to PseudoTypeInferred in that it references a
 * case where the type was too complex for the pseudochecker. Rather than an
 * expression, however, it is referring to the return type of a signature or
 * declaration.
 */
export interface PseudoTypeNoResult extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.NoResult;
  readonly declaration: Node;
}

/**
 * PseudoTypeMaybeConstLocation encodes the const/regular types of a location so
 * the builder can later select the appropriate pseudotype based on the
 * location's context. This is used to ensure accuracy in nested expressions
 * without exposing type-based functionality to the pseudochecker. A nodebuilder
 * that doesn't do contextual typing would need to, as policy, reject these
 * types if they are in a contextually typed position! (Otherwise they could
 * pick one, but either type could be wrong, depending on context!) At the
 * top-level, which is generally what ID is concerned with, nothing is
 * contextually typed, so these cases don't generally cause problems. Once you
 * get into reused nodes in nested expressions, however, this becomes important.
 * In strada, checker `isConstContext` functionality exposed to the
 * pseudochecker + type comparison sanity checking on nested results masks the
 * need for this abstraction, but with it present it clearly highlights a
 * shortcoming of the ID inference model and how "standalone" it can(n't) truly
 * be without substantial restrictions on expression inference.
 */
export interface PseudoTypeMaybeConstLocation extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.MaybeConstLocation;
  readonly node: Node;
  readonly constType: PseudoType;
  readonly regularType: PseudoType;
}

/** PseudoTypeUnion is a collection of pseudotypes joined into a union. */
export interface PseudoTypeUnion extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.Union;
  readonly types: readonly PseudoType[];
}

/**
 * PseudoTypeSingleCallSignature represents an object type with a single call
 * signature, like an arrow or function expression.
 */
export interface PseudoTypeSingleCallSignature extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.SingleCallSignature;
  readonly signature: Node;
  readonly parameters: readonly PseudoParameter[];
  readonly typeParameters: readonly TypeParameterDeclaration[];
  readonly returnType: PseudoType;
}

/** PseudoTypeTuple represents a tuple originating from an `as const` array literal. */
export interface PseudoTypeTuple extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.Tuple;
  readonly elements: readonly PseudoType[];
}

/** PseudoTypeObjectLiteral represents an object type originating from an object literal. */
export interface PseudoTypeObjectLiteral extends PseudoTypeCommon {
  readonly kind: typeof PseudoTypeKind.ObjectLiteral;
  readonly elements: readonly PseudoObjectElement[];
}

/** PseudoTypeLiteral represents a literal type. */
export interface PseudoTypeLiteral extends PseudoTypeCommon {
  readonly kind:
    | typeof PseudoTypeKind.StringLiteral
    | typeof PseudoTypeKind.NumericLiteral
    | typeof PseudoTypeKind.BigIntLiteral;
  readonly node: Node;
}

/**
 * PseudoType is the discriminated union over every variant kind.
 * (Go: `type PseudoType struct { Kind; data }`.)
 */
export type PseudoType =
  | PseudoTypeBase
  | PseudoTypeDirect
  | PseudoTypeInferred
  | PseudoTypeNoResult
  | PseudoTypeMaybeConstLocation
  | PseudoTypeUnion
  | PseudoTypeSingleCallSignature
  | PseudoTypeTuple
  | PseudoTypeObjectLiteral
  | PseudoTypeLiteral;

// ---------------------------------------------------------------------------
// Singleton base/keyword pseudo-types
// ---------------------------------------------------------------------------

export const PseudoTypeUndefined: PseudoTypeBase = { kind: PseudoTypeKind.Undefined };
export const PseudoTypeNull: PseudoTypeBase = { kind: PseudoTypeKind.Null };
export const PseudoTypeAny: PseudoTypeBase = { kind: PseudoTypeKind.Any };
export const PseudoTypeString: PseudoTypeBase = { kind: PseudoTypeKind.String };
export const PseudoTypeNumber: PseudoTypeBase = { kind: PseudoTypeKind.Number };
export const PseudoTypeBigInt: PseudoTypeBase = { kind: PseudoTypeKind.BigInt };
export const PseudoTypeBoolean: PseudoTypeBase = { kind: PseudoTypeKind.Boolean };
export const PseudoTypeFalse: PseudoTypeBase = { kind: PseudoTypeKind.False };
export const PseudoTypeTrue: PseudoTypeBase = { kind: PseudoTypeKind.True };

// ---------------------------------------------------------------------------
// Constructors
// ---------------------------------------------------------------------------

export function newPseudoTypeDirect(typeNode: Node): PseudoType {
  return { kind: PseudoTypeKind.Direct, typeNode };
}

export function newPseudoTypeInferred(expr: Node): PseudoType {
  return { kind: PseudoTypeKind.Inferred, expression: expr, errorNodes: [] };
}

export function newPseudoTypeInferredWithErrors(expr: Node, errorNodes: readonly Node[]): PseudoType {
  return { kind: PseudoTypeKind.Inferred, expression: expr, errorNodes };
}

export function newPseudoTypeNoResult(decl: Node): PseudoType {
  return { kind: PseudoTypeKind.NoResult, declaration: decl };
}

export function newPseudoTypeMaybeConstLocation(loc: Node, ct: PseudoType, reg: PseudoType): PseudoType {
  return { kind: PseudoTypeKind.MaybeConstLocation, node: loc, constType: ct, regularType: reg };
}

export function newPseudoTypeUnion(types: readonly PseudoType[]): PseudoType {
  return { kind: PseudoTypeKind.Union, types };
}

export function newPseudoTypeSingleCallSignature(
  signature: Node,
  parameters: readonly PseudoParameter[],
  typeParameters: readonly TypeParameterDeclaration[],
  returnType: PseudoType,
): PseudoType {
  return {
    kind: PseudoTypeKind.SingleCallSignature,
    signature,
    parameters,
    typeParameters,
    returnType,
  };
}

export function newPseudoTypeTuple(elements: readonly PseudoType[]): PseudoType {
  return { kind: PseudoTypeKind.Tuple, elements };
}

export function newPseudoTypeObjectLiteral(elements: readonly PseudoObjectElement[]): PseudoType {
  return { kind: PseudoTypeKind.ObjectLiteral, elements };
}

export function newPseudoTypeStringLiteral(node: Node): PseudoType {
  return { kind: PseudoTypeKind.StringLiteral, node };
}

export function newPseudoTypeNumericLiteral(node: Node): PseudoType {
  return { kind: PseudoTypeKind.NumericLiteral, node };
}

export function newPseudoTypeBigIntLiteral(node: Node): PseudoType {
  return { kind: PseudoTypeKind.BigIntLiteral, node };
}

// ---------------------------------------------------------------------------
// Accessors (Go: PseudoType.As*)
// ---------------------------------------------------------------------------

export function asPseudoTypeDirect(t: PseudoType): PseudoTypeDirect {
  return t as PseudoTypeDirect;
}

export function asPseudoTypeInferred(t: PseudoType): PseudoTypeInferred {
  return t as PseudoTypeInferred;
}

export function asPseudoTypeNoResult(t: PseudoType): PseudoTypeNoResult {
  return t as PseudoTypeNoResult;
}

export function asPseudoTypeMaybeConstLocation(t: PseudoType): PseudoTypeMaybeConstLocation {
  return t as PseudoTypeMaybeConstLocation;
}

export function asPseudoTypeUnion(t: PseudoType): PseudoTypeUnion {
  return t as PseudoTypeUnion;
}

export function asPseudoTypeSingleCallSignature(t: PseudoType): PseudoTypeSingleCallSignature {
  return t as PseudoTypeSingleCallSignature;
}

export function asPseudoTypeTuple(t: PseudoType): PseudoTypeTuple {
  return t as PseudoTypeTuple;
}

export function asPseudoTypeObjectLiteral(t: PseudoType): PseudoTypeObjectLiteral {
  return t as PseudoTypeObjectLiteral;
}

export function asPseudoTypeLiteral(t: PseudoType): PseudoTypeLiteral {
  return t as PseudoTypeLiteral;
}

// ---------------------------------------------------------------------------
// PseudoParameter
// ---------------------------------------------------------------------------

export interface PseudoParameter {
  readonly rest: boolean;
  readonly name: Node;
  readonly optional: boolean;
  readonly type: PseudoType;
}

export function newPseudoParameter(
  isRest: boolean,
  name: Node,
  isOptional: boolean,
  t: PseudoType,
): PseudoParameter {
  return { rest: isRest, name, optional: isOptional, type: t };
}

// ---------------------------------------------------------------------------
// PseudoObjectElementKind (Go: iota enum) → literal-union + const map
// ---------------------------------------------------------------------------

export type PseudoObjectElementKind =
  | typeof PseudoObjectElementKind.Method
  | typeof PseudoObjectElementKind.PropertyAssignment
  | typeof PseudoObjectElementKind.SetAccessor
  | typeof PseudoObjectElementKind.GetAccessor;

export const PseudoObjectElementKind = {
  Method: 0,
  PropertyAssignment: 1,
  SetAccessor: 2,
  GetAccessor: 3,
} as const;

// ---------------------------------------------------------------------------
// PseudoObjectElement variants
// ---------------------------------------------------------------------------

/** Common fields shared by every PseudoObjectElement variant. */
interface PseudoObjectElementCommon {
  readonly name: Node;
  readonly optional: boolean;
  readonly kind: PseudoObjectElementKind;
}

export interface PseudoObjectMethod extends PseudoObjectElementCommon {
  readonly kind: typeof PseudoObjectElementKind.Method;
  readonly signature: Node;
  readonly typeParameters: readonly TypeParameterDeclaration[];
  readonly parameters: readonly PseudoParameter[];
  readonly returnType: PseudoType;
}

export interface PseudoPropertyAssignment extends PseudoObjectElementCommon {
  readonly kind: typeof PseudoObjectElementKind.PropertyAssignment;
  readonly readonly: boolean;
  readonly type: PseudoType;
}

export interface PseudoSetAccessor extends PseudoObjectElementCommon {
  readonly kind: typeof PseudoObjectElementKind.SetAccessor;
  readonly signature: Node;
  readonly parameter: PseudoParameter;
}

export interface PseudoGetAccessor extends PseudoObjectElementCommon {
  readonly kind: typeof PseudoObjectElementKind.GetAccessor;
  readonly signature: Node;
  readonly type: PseudoType;
}

/**
 * PseudoObjectElement is the discriminated union over every object-element
 * variant kind. (Go: `type PseudoObjectElement struct { Name; Optional; Kind;
 * data }`.)
 */
export type PseudoObjectElement =
  | PseudoObjectMethod
  | PseudoPropertyAssignment
  | PseudoSetAccessor
  | PseudoGetAccessor;

// ---------------------------------------------------------------------------
// PseudoObjectElement constructors
// ---------------------------------------------------------------------------

export function newPseudoObjectMethod(
  signature: Node,
  name: Node,
  optional: boolean,
  typeParameters: readonly TypeParameterDeclaration[],
  parameters: readonly PseudoParameter[],
  returnType: PseudoType,
): PseudoObjectElement {
  return {
    kind: PseudoObjectElementKind.Method,
    name,
    optional,
    signature,
    typeParameters,
    parameters,
    returnType,
  };
}

export function newPseudoPropertyAssignment(
  readonly: boolean,
  name: Node,
  optional: boolean,
  t: PseudoType,
): PseudoObjectElement {
  return {
    kind: PseudoObjectElementKind.PropertyAssignment,
    name,
    optional,
    readonly,
    type: t,
  };
}

export function newPseudoSetAccessor(
  signature: Node,
  name: Node,
  optional: boolean,
  p: PseudoParameter,
): PseudoObjectElement {
  return {
    kind: PseudoObjectElementKind.SetAccessor,
    name,
    optional,
    signature,
    parameter: p,
  };
}

export function newPseudoGetAccessor(
  signature: Node,
  name: Node,
  optional: boolean,
  t: PseudoType,
): PseudoObjectElement {
  return {
    kind: PseudoObjectElementKind.GetAccessor,
    name,
    optional,
    signature,
    type: t,
  };
}

// ---------------------------------------------------------------------------
// PseudoObjectElement accessors (Go: PseudoObjectElement.As*)
// ---------------------------------------------------------------------------

export function asPseudoObjectMethod(e: PseudoObjectElement): PseudoObjectMethod {
  return e as PseudoObjectMethod;
}

export function asPseudoPropertyAssignment(e: PseudoObjectElement): PseudoPropertyAssignment {
  return e as PseudoPropertyAssignment;
}

export function asPseudoSetAccessor(e: PseudoObjectElement): PseudoSetAccessor {
  return e as PseudoSetAccessor;
}

export function asPseudoGetAccessor(e: PseudoObjectElement): PseudoGetAccessor {
  return e as PseudoGetAccessor;
}

/**
 * Signature returns the underlying signature node for method/accessor elements,
 * or undefined for property assignments. (Go: PseudoObjectElement.Signature.)
 */
export function pseudoObjectElementSignature(e: PseudoObjectElement): Node | undefined {
  switch (e.kind) {
    case PseudoObjectElementKind.Method:
      return asPseudoObjectMethod(e).signature;
    case PseudoObjectElementKind.SetAccessor:
      return asPseudoSetAccessor(e).signature;
    case PseudoObjectElementKind.GetAccessor:
      return asPseudoGetAccessor(e).signature;
    default:
      return undefined;
  }
}
