import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsedcommandline.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { parseCache as parseCache__from_build } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/parseCache.js";
import { $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
export function parseCache$delete$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine($argument0: tsonicTypeScriptRuntime.Location<parseCache__from_build<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>> | undefined, $argument1: Path__from_tspath): void {
    return parseCache__from_build.$go$private$build$delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
