import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Identifier as Identifier__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { TypeId as TypeId__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { CopyOnWriteMap as CopyOnWriteMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/cow.js";
import { $goMap$MapOf_Named_checker$TypeId_To_PointerTo_Named_ast$Identifier } from "../../../../../../../maps.js";
import { GoMap } from "@gotots/runtime/map.js";
export function CopyOnWriteMap$Set$Named_checker$TypeId$PointerTo_Named_ast$Identifier($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteMap__from_collections<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>> | undefined, $argument1: TypeId__from_checker, $argument2: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): void {
    return CopyOnWriteMap__from_collections.Set$kernel<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>($argument0, ($argument0: GoMapValue<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>): GoMapValue<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: TypeId__from_checker): TypeId__from_checker => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): GoMapValue<TypeId__from_checker, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined> => {
        return $goMap$MapOf_Named_checker$TypeId_To_PointerTo_Named_ast$Identifier.make(0, []);
    }, (): tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function CopyOnWriteMap$Set$string$int($argument0: tsonicTypeScriptRuntime.Location<CopyOnWriteMap__from_collections<gostring, int>> | undefined, $argument1: gostring, $argument2: int): void {
    return CopyOnWriteMap__from_collections.Set$kernel<gostring, int>($argument0, ($argument0: GoMapValue<gostring, int>): GoMapValue<gostring, int> => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: int): GoMapValue<gostring, int> => {
        return GoMap.make<gostring, int>($argument0, 0, []);
    }, (): int => {
        return 0;
    }, $argument1, $argument2);
}
