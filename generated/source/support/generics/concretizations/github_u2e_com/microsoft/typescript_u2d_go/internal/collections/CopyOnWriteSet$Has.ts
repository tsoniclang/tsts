import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SymbolId as SymbolId__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { CopyOnWriteSet as CopyOnWriteSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/cow.js";
export function CopyOnWriteSet$Has$Named_ast$SymbolId($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteSet__from_collections<SymbolId__from_ast>> | undefined, $argument1: SymbolId__from_ast): bool {
    return CopyOnWriteSet__from_collections.Has$kernel<SymbolId__from_ast>($argument0, $argument1);
}
export function CopyOnWriteSet$Has$string($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteSet__from_collections<gostring>> | undefined, $argument1: gostring): bool {
    return CopyOnWriteSet__from_collections.Has$kernel<gostring>($argument0, $argument1);
}
