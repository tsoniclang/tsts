import { TypeFlags, type Type, type UnionOrIntersectionType } from "./types.js";

export type TypeFacts = number;
export const TypeFacts = {
  None: 0 as TypeFacts,
  TypeofEQString: 1 << 0 as TypeFacts,
  TypeofEQNumber: 1 << 1 as TypeFacts,
  TypeofEQBigInt: 1 << 2 as TypeFacts,
  TypeofEQBoolean: 1 << 3 as TypeFacts,
  TypeofEQSymbol: 1 << 4 as TypeFacts,
  TypeofEQObject: 1 << 5 as TypeFacts,
  TypeofEQFunction: 1 << 6 as TypeFacts,
  TypeofEQHostObject: 1 << 7 as TypeFacts,
  TypeofNEString: 1 << 8 as TypeFacts,
  TypeofNENumber: 1 << 9 as TypeFacts,
  TypeofNEBigInt: 1 << 10 as TypeFacts,
  TypeofNEBoolean: 1 << 11 as TypeFacts,
  TypeofNESymbol: 1 << 12 as TypeFacts,
  TypeofNEObject: 1 << 13 as TypeFacts,
  TypeofNEFunction: 1 << 14 as TypeFacts,
  TypeofNEHostObject: 1 << 15 as TypeFacts,
  EQUndefined: 1 << 16 as TypeFacts,
  EQNull: 1 << 17 as TypeFacts,
  EQUndefinedOrNull: (1 << 16) | (1 << 17) as TypeFacts,
  NEUndefined: 1 << 18 as TypeFacts,
  NENull: 1 << 19 as TypeFacts,
  NEUndefinedOrNull: (1 << 18) | (1 << 19) as TypeFacts,
  Truthy: 1 << 20 as TypeFacts,
  Falsy: 1 << 21 as TypeFacts,
  All: (1 << 22) - 1 as TypeFacts,
} as const;

export function getTypeFacts(type: Type): TypeFacts {
  if ((type.flags & TypeFlags.Union) !== 0) return unionTypes(type).reduce((facts, part) => facts | getTypeFacts(part), TypeFacts.None);
  if ((type.flags & TypeFlags.Intersection) !== 0) return unionTypes(type).reduce((facts, part) => facts & getTypeFacts(part), TypeFacts.All);
  if ((type.flags & TypeFlags.StringLike) !== 0) return TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | truthinessFacts(type);
  if ((type.flags & TypeFlags.NumberLike) !== 0) return TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | truthinessFacts(type);
  if ((type.flags & TypeFlags.BigIntLike) !== 0) return TypeFacts.TypeofEQBigInt | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | truthinessFacts(type);
  if ((type.flags & TypeFlags.BooleanLike) !== 0) return TypeFacts.TypeofEQBoolean | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | truthinessFacts(type);
  if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return TypeFacts.TypeofEQSymbol | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.Truthy;
  if ((type.flags & TypeFlags.Undefined) !== 0) return TypeFacts.EQUndefined | TypeFacts.EQUndefinedOrNull | TypeFacts.NENull | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction | TypeFacts.Falsy;
  if ((type.flags & TypeFlags.Null) !== 0) return TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.NEUndefined | TypeFacts.TypeofEQObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEFunction | TypeFacts.Falsy;
  if ((type.flags & TypeFlags.Object) !== 0) return TypeFacts.TypeofEQObject | TypeFacts.TypeofNEString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBigInt | TypeFacts.TypeofNEBoolean | TypeFacts.TypeofNESymbol | TypeFacts.NEUndefinedOrNull | TypeFacts.Truthy;
  if ((type.flags & TypeFlags.AnyOrUnknown) !== 0) return TypeFacts.All;
  if ((type.flags & TypeFlags.Never) !== 0) return TypeFacts.None;
  return TypeFacts.All;
}

export function getAdjustedTypeFacts(type: Type, facts: TypeFacts): TypeFacts {
  const typeFacts = getTypeFacts(type);
  if ((facts & TypeFacts.TypeofEQString) !== 0) return typeFacts & TypeFacts.TypeofEQString;
  if ((facts & TypeFacts.TypeofEQNumber) !== 0) return typeFacts & TypeFacts.TypeofEQNumber;
  if ((facts & TypeFacts.TypeofEQBigInt) !== 0) return typeFacts & TypeFacts.TypeofEQBigInt;
  if ((facts & TypeFacts.TypeofEQBoolean) !== 0) return typeFacts & TypeFacts.TypeofEQBoolean;
  if ((facts & TypeFacts.TypeofEQSymbol) !== 0) return typeFacts & TypeFacts.TypeofEQSymbol;
  if ((facts & TypeFacts.TypeofEQObject) !== 0) return typeFacts & TypeFacts.TypeofEQObject;
  if ((facts & TypeFacts.TypeofEQFunction) !== 0) return typeFacts & TypeFacts.TypeofEQFunction;
  if ((facts & TypeFacts.EQUndefinedOrNull) !== 0) return typeFacts & TypeFacts.EQUndefinedOrNull;
  if ((facts & TypeFacts.NEUndefinedOrNull) !== 0) return typeFacts & TypeFacts.NEUndefinedOrNull;
  if ((facts & TypeFacts.Truthy) !== 0) return typeFacts & TypeFacts.Truthy;
  if ((facts & TypeFacts.Falsy) !== 0) return typeFacts & TypeFacts.Falsy;
  return typeFacts & facts;
}

export function hasTypeFacts(type: Type, facts: TypeFacts): boolean {
  return (getTypeFacts(type) & facts) !== 0;
}

export function maybeTypeOfKind(type: Type, kind: "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "undefined"): boolean {
  const facts = getTypeFacts(type);
  switch (kind) {
    case "string": return (facts & TypeFacts.TypeofEQString) !== 0;
    case "number": return (facts & TypeFacts.TypeofEQNumber) !== 0;
    case "bigint": return (facts & TypeFacts.TypeofEQBigInt) !== 0;
    case "boolean": return (facts & TypeFacts.TypeofEQBoolean) !== 0;
    case "symbol": return (facts & TypeFacts.TypeofEQSymbol) !== 0;
    case "object": return (facts & TypeFacts.TypeofEQObject) !== 0;
    case "function": return (facts & TypeFacts.TypeofEQFunction) !== 0;
    case "undefined": return (facts & TypeFacts.EQUndefined) !== 0;
  }
}

export function isPossiblyNullOrUndefined(type: Type): boolean {
  return (getTypeFacts(type) & TypeFacts.EQUndefinedOrNull) !== 0;
}

export function isPossiblyTruthy(type: Type): boolean {
  return (getTypeFacts(type) & TypeFacts.Truthy) !== 0;
}

export function isPossiblyFalsy(type: Type): boolean {
  return (getTypeFacts(type) & TypeFacts.Falsy) !== 0;
}

export function extractDefinitelyFalsyTypes(type: Type): readonly Type[] {
  if ((type.flags & TypeFlags.Union) !== 0) return unionTypes(type).filter(isDefinitelyFalsyType);
  return isDefinitelyFalsyType(type) ? [type] : [];
}

export function removeDefinitelyFalsyTypes(type: Type): Type {
  if ((type.flags & TypeFlags.Union) === 0) return isDefinitelyFalsyType(type) ? neverTypeLike() : type;
  const kept = unionTypes(type).filter(part => !isDefinitelyFalsyType(part));
  if (kept.length === unionTypes(type).length) return type;
  if (kept.length === 0) return neverTypeLike();
  if (kept.length === 1) return kept[0]!;
  return { ...type, data: { objectFlags: 0, ...(type.data as object), types: kept } as UnionOrIntersectionType };
}

export function getNonNullableType(type: Type): Type {
  if ((type.flags & TypeFlags.Union) === 0) return isNullableType(type) ? neverTypeLike() : type;
  const kept = unionTypes(type).filter(part => !isNullableType(part));
  if (kept.length === unionTypes(type).length) return type;
  if (kept.length === 0) return neverTypeLike();
  if (kept.length === 1) return kept[0]!;
  return { ...type, data: { objectFlags: 0, ...(type.data as object), types: kept } as UnionOrIntersectionType };
}

export function addOptionality(type: Type, isProperty: boolean, isOptional: boolean): Type {
  if (!isOptional) return type;
  const undefinedType = undefinedTypeLike();
  if ((type.flags & TypeFlags.Undefined) !== 0) return type;
  const types = (type.flags & TypeFlags.Union) !== 0 ? [...unionTypes(type), undefinedType] : [type, undefinedType];
  return {
    id: -6,
    flags: TypeFlags.Union | (isProperty ? TypeFlags.ObjectFlagsType : TypeFlags.None),
    data: { objectFlags: 0, types },
  };
}

export function getFalsyFlagsOfTypes(types: readonly Type[]): TypeFacts {
  let facts = TypeFacts.None;
  for (const type of types) facts |= getTypeFacts(type) & TypeFacts.Falsy;
  return facts;
}

export function getTruthyFlagsOfTypes(types: readonly Type[]): TypeFacts {
  let facts = TypeFacts.None;
  for (const type of types) facts |= getTypeFacts(type) & TypeFacts.Truthy;
  return facts;
}

function truthinessFacts(type: Type): TypeFacts {
  const value = (type.data as { readonly value?: unknown } | undefined)?.value;
  if (value === undefined) return TypeFacts.Truthy | TypeFacts.Falsy;
  return value === false || value === 0 || value === 0n || value === "" ? TypeFacts.Falsy : TypeFacts.Truthy;
}

function isDefinitelyFalsyType(type: Type): boolean {
  const facts = getTypeFacts(type);
  return (facts & TypeFacts.Falsy) !== 0 && (facts & TypeFacts.Truthy) === 0;
}

function isNullableType(type: Type): boolean {
  return (type.flags & (TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void)) !== 0;
}

function unionTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function neverTypeLike(): Type {
  return { id: -4, flags: TypeFlags.Never, data: { intrinsicName: "never", objectFlags: 0 } };
}

function undefinedTypeLike(): Type {
  return { id: -5, flags: TypeFlags.Undefined, data: { intrinsicName: "undefined", objectFlags: 0 } };
}
