import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { searchNodeKey$Storage as searchNodeKey__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { searchNodeKey as searchNodeKey__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_project$searchNodeKey as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncSet$Range$Named_project$searchNodeKey($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<searchNodeKey__from_project>> | undefined, $argument1: (($0: searchNodeKey__from_project) => bool) | undefined): void {
    return SyncSet__from_collections.Range$kernel<searchNodeKey__from_project>($argument0, ($argument0: searchNodeKey__from_project): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$copy($argument0);
    }, ($argument0: GoInterfaceValue | undefined): searchNodeKey__from_project => {
        return (($value: GoInterfaceValue | undefined): searchNodeKey__from_project => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return searchNodeKey__from_project.$copy($value.$go$value);
        })($argument0);
    }, (): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$zero();
    }, $argument1);
}
export function SyncSet$Range$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, $argument1: (($0: Path__from_tspath) => bool) | undefined): void {
    return SyncSet__from_collections.Range$kernel<Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!$goInterfaceAdapter$Named_tspath$Path.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument1);
}
export function SyncSet$Range$PointerTo_Named_ast$SourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): void {
    return SyncSet__from_collections.Range$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SourceFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument1);
}
export function SyncSet$Range$string($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined, $argument1: (($0: gostring) => bool) | undefined): void {
    return SyncSet__from_collections.Range$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): gostring => {
        return (($value: GoInterfaceValue | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): gostring => {
        return "";
    }, $argument1);
}
