import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Identifier as Identifier__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { TypeId as TypeId__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { CopyOnWriteMap as CopyOnWriteMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/cow.js";
export function CopyOnWriteMap$Get$Named_checker$TypeId$PointerTo_Named_ast$Identifier($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteMap__from_collections<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>> | undefined, $argument1: TypeId__from_checker): [
    tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined,
    bool
] {
    return CopyOnWriteMap__from_collections.Get$kernel<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined => {
        return $argument0;
    }, $argument1);
}
export function CopyOnWriteMap$Get$string$int($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteMap__from_collections<gostring, int>> | undefined, $argument1: gostring): [
    int,
    bool
] {
    return CopyOnWriteMap__from_collections.Get$kernel<gostring, int>($argument0, ($argument0: int): int => {
        return $argument0;
    }, $argument1);
}
