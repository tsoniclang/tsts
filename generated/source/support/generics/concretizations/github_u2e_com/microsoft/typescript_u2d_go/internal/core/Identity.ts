import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { PropertyAssignment as PropertyAssignment__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import type { ResolvedEntrypoint as ResolvedEntrypoint__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Identity$kernel as Identity$kernel__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { Pattern as Pattern__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/pattern.js";
import { PatternsAndIgnored as PatternsAndIgnored__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
export function Identity$Named_core$Pattern($argument0: Pattern__from_core): Pattern__from_core {
    return Identity$kernel__from_core<Pattern__from_core>(($argument0: Pattern__from_core): Pattern__from_core => {
        return Pattern__from_core.$copy($argument0);
    }, $argument0);
}
export function Identity$Named_project$PatternsAndIgnored($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project {
    return Identity$kernel__from_core<PatternsAndIgnored__from_project>(($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$copy($argument0);
    }, $argument0);
}
export function Identity$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return Identity$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Identity$PointerTo_Named_ast$PropertyAssignment($argument0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined {
    return Identity$kernel__from_core<tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Identity$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined {
    return Identity$kernel__from_core<tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Identity$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined {
    return Identity$kernel__from_core<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Identity$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> {
    return Identity$kernel__from_core<RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>(($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> => {
        return $argument0;
    }, $argument0);
}
export function Identity$string($argument0: gostring): gostring {
    return Identity$kernel__from_core<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
