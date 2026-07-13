import type { bool } from "../../go/scalars.js";
import type { GoMapKeyDescriptor, GoPtr } from "../../go/compat.js";
import { GoBigIntKey, GoBooleanKey, GoPointerKey, GoStructField, GoStructKey } from "../../go/compat.js";
import type { SourceFile } from "../ast/ast.js";
import type { Node } from "../ast/spine.js";
import type { Symbol } from "../ast/symbol.js";
import type { CacheHashKey, NonExistentPropertyKey } from "./checker/state.js";
import type { Type } from "./types.js";

export const goNodePointerKey: GoMapKeyDescriptor<GoPtr<Node>> = GoPointerKey<Node>();
export const goSourceFilePointerKey: GoMapKeyDescriptor<GoPtr<SourceFile>> = GoPointerKey<SourceFile>();
export const goSymbolPointerKey: GoMapKeyDescriptor<GoPtr<Symbol>> = GoPointerKey<Symbol>();
export const goTypePointerKey: GoMapKeyDescriptor<GoPtr<Type>> = GoPointerKey<Type>();

export const cacheHashKeyDescriptor: GoMapKeyDescriptor<CacheHashKey> = GoStructKey<CacheHashKey, readonly [bigint, bigint]>(
  [
    GoStructField((value: CacheHashKey) => value.Hi, GoBigIntKey),
    GoStructField((value: CacheHashKey) => value.Lo, GoBigIntKey),
  ],
  ([Hi, Lo]) => ({ Hi, Lo }),
);

export const nonExistentPropertyKeyDescriptor: GoMapKeyDescriptor<NonExistentPropertyKey> = GoStructKey<
  NonExistentPropertyKey,
  readonly [GoPtr<Node>, GoPtr<Type>, bool]
>(
  [
    GoStructField((value: NonExistentPropertyKey) => value.propNode, goNodePointerKey),
    GoStructField((value: NonExistentPropertyKey) => value.containingType, goTypePointerKey),
    GoStructField((value: NonExistentPropertyKey) => value.isUncheckedJS, GoBooleanKey),
  ],
  ([propNode, containingType, isUncheckedJS]) => ({ propNode, containingType, isUncheckedJS }),
);
