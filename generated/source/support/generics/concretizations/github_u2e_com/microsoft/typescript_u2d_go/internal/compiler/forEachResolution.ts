import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type { ModeAwareCache as ModeAwareCache__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
import type { ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { forEachResolution$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/program.js";
export function forEachResolution$PointerTo_Named___go_module$ResolvedModule($argument0: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>>, $argument1: (($0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, $argument2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    return forEachResolution$kernel<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>($argument0, $argument1, $argument2);
}
export function forEachResolution$PointerTo_Named___go_module$ResolvedTypeReferenceDirective($argument0: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>>, $argument1: (($0: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, $argument2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    return forEachResolution$kernel<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>($argument0, $argument1, $argument2);
}
