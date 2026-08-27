import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { DiffMaps$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function DiffMaps$Named_tspath$Path$PointerTo_Named_ast$SourceFile($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument2: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined, $argument3: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined, $argument4: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined): void {
    return DiffMaps$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
