import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/spine.js";
import type { Type } from "../internal/checker/types.js";
import {
  Type_Flags,
  Type_Id,
  Type_Symbol,
  TypeFlagsUniqueESSymbol,
} from "../internal/checker/types.js";

export function checkedSourceTypesShareStableIdentity(
  left: GoPtr<Type>,
  right: GoPtr<Type>,
): boolean {
  if (left === right) {
    return true;
  }
  if (left?.checker !== undefined && left.checker === right?.checker && Type_Id(left) === Type_Id(right)) {
    return true;
  }
  const leftIsUniqueSymbol = (Type_Flags(left) & TypeFlagsUniqueESSymbol) !== 0;
  const rightIsUniqueSymbol = (Type_Flags(right) & TypeFlagsUniqueESSymbol) !== 0;
  if (!leftIsUniqueSymbol && !rightIsUniqueSymbol) {
    return false;
  }
  if (!leftIsUniqueSymbol || !rightIsUniqueSymbol) {
    return false;
  }
  const leftSymbol = Type_Symbol(left);
  const rightSymbol = Type_Symbol(right);
  if (leftSymbol === undefined || leftSymbol !== rightSymbol) {
    return false;
  }
  const leftDeclaration = leftSymbol.ValueDeclaration as GoPtr<Node>;
  const rightDeclaration = rightSymbol.ValueDeclaration as GoPtr<Node>;
  return leftDeclaration !== undefined && leftDeclaration === rightDeclaration;
}

export function preserveEquivalentCheckedSourceType(
  existing: GoPtr<Type>,
  incoming: GoPtr<Type>,
): GoPtr<Type> {
  if (incoming === undefined) {
    return undefined;
  }
  if (existing === undefined || existing === incoming) {
    return incoming;
  }
  return checkedSourceTypesShareStableIdentity(existing, incoming) ? existing : incoming;
}
