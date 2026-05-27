/**
 * TypeFacts — narrowing-flag bitmask used by flow analysis.
 *
 * Ported from Strada `checker.go` — TypeFacts constants used to
 * record "the value at this flow node cannot be falsy" / "cannot
 * be undefined" / etc.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export const TypeFacts = {
  None: 0,
  TypeofEQString:    1 << 0,
  TypeofEQNumber:    1 << 1,
  TypeofEQBigInt:    1 << 2,
  TypeofEQBoolean:   1 << 3,
  TypeofEQSymbol:    1 << 4,
  TypeofEQObject:    1 << 5,
  TypeofEQFunction:  1 << 6,
  TypeofEQHostObject:1 << 7,
  TypeofEQUndefined: 1 << 8,
  TypeofNEString:    1 << 9,
  TypeofNENumber:    1 << 10,
  TypeofNEBigInt:    1 << 11,
  TypeofNEBoolean:   1 << 12,
  TypeofNESymbol:    1 << 13,
  TypeofNEObject:    1 << 14,
  TypeofNEFunction:  1 << 15,
  TypeofNEHostObject:1 << 16,
  TypeofNEUndefined: 1 << 17,
  EQUndefined:       1 << 18,
  EQNull:            1 << 19,
  EQUndefinedOrNull: 1 << 20,
  NEUndefined:       1 << 21,
  NENull:            1 << 22,
  NEUndefinedOrNull: 1 << 23,
  Truthy:            1 << 24,
  Falsy:             1 << 25,
  IsUndefined:       1 << 26,
  IsNull:            1 << 27,
  All:               (1 << 28) - 1,
} as const;

export type TypeFacts = number;

/**
 * Returns the TypeFacts bitmask that an arbitrary value of `t`
 * always satisfies. e.g. `string` always satisfies `TypeofEQString`.
 */
export function getTypeFactsOfType(t: Type): TypeFacts {
  const flags = (t as { flags?: number }).flags ?? 0;
  let facts: TypeFacts = TypeFacts.None;
  if ((flags & TypeFlags.String) !== 0) {
    facts |= TypeFacts.TypeofEQString | TypeFacts.TypeofNENumber | TypeFacts.TypeofNEBoolean |
      TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
      TypeFacts.TypeofNEUndefined | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull;
  }
  if ((flags & TypeFlags.Number) !== 0) {
    facts |= TypeFacts.TypeofEQNumber | TypeFacts.TypeofNEString | TypeFacts.TypeofNEBoolean |
      TypeFacts.TypeofNESymbol | TypeFacts.TypeofNEObject | TypeFacts.TypeofNEFunction |
      TypeFacts.TypeofNEUndefined | TypeFacts.NEUndefined | TypeFacts.NENull | TypeFacts.NEUndefinedOrNull;
  }
  if ((flags & TypeFlags.Boolean) !== 0) {
    facts |= TypeFacts.TypeofEQBoolean;
  }
  if ((flags & TypeFlags.Undefined) !== 0) {
    facts |= TypeFacts.TypeofEQUndefined | TypeFacts.EQUndefined | TypeFacts.EQUndefinedOrNull |
      TypeFacts.IsUndefined | TypeFacts.Falsy;
  }
  if ((flags & TypeFlags.Null) !== 0) {
    facts |= TypeFacts.EQNull | TypeFacts.EQUndefinedOrNull | TypeFacts.IsNull | TypeFacts.Falsy;
  }
  return facts;
}

/**
 * Combines TypeFacts of two siblings — used for union narrowing.
 */
export function unionTypeFacts(a: TypeFacts, b: TypeFacts): TypeFacts {
  return a | b;
}

/**
 * Restricts TypeFacts to those that *both* sides satisfy — used
 * for intersection narrowing.
 */
export function intersectTypeFacts(a: TypeFacts, b: TypeFacts): TypeFacts {
  return a & b;
}

/**
 * Returns true when the type has a specific TypeFact.
 */
export function hasTypeFact(facts: TypeFacts, mask: TypeFacts): boolean {
  return (facts & mask) !== 0;
}
