/**
 * Exports/Imports map classification for package.json.
 *
 * Port of TS-Go `internal/packagejson/exportsorimports.go` (84 LoC).
 * Distinguishes the four shapes a `package.json` `exports` or
 * `imports` field can take: subpaths (`./foo`), imports (`#foo`),
 * conditions (`{ node, default }`), or invalid (mixed).
 */

import type { JSONValue } from "./jsonValue.js";
import { JSONValueType, asObject } from "./jsonValue.js";

export type ObjectKind = number;
export const ObjectKind = {
  Unknown: 0,
  Subpaths: 1,
  Conditions: 2,
  Imports: 3,
  Invalid: 4,
} as const;

export interface ExportsOrImports extends JSONValue {
  readonly objectKind: ObjectKind;
}

export function classifyExportsOrImports(v: JSONValue): ExportsOrImports {
  if (v.type !== JSONValueType.Object) {
    return { ...v, objectKind: ObjectKind.Unknown };
  }
  const obj = asObject(v);
  if (obj.size === 0) return { ...v, objectKind: ObjectKind.Conditions };
  let seenDot = false;
  let seenHash = false;
  let seenOther = false;
  for (const k of obj.keys()) {
    if (k.length > 0) {
      if (k[0] === ".") seenDot = true;
      else if (k[0] === "#") seenHash = true;
      else seenOther = true;
      if (seenOther && (seenDot || seenHash)) {
        return { ...v, objectKind: ObjectKind.Invalid };
      }
    }
  }
  if (seenDot) return { ...v, objectKind: ObjectKind.Subpaths };
  if (seenHash) return { ...v, objectKind: ObjectKind.Imports };
  return { ...v, objectKind: ObjectKind.Conditions };
}

export function isSubpaths(e: ExportsOrImports): boolean {
  return e.objectKind === ObjectKind.Subpaths;
}

export function isImports(e: ExportsOrImports): boolean {
  return e.objectKind === ObjectKind.Imports;
}

export function isConditions(e: ExportsOrImports): boolean {
  return e.objectKind === ObjectKind.Conditions;
}
