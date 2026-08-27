import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { CompilerHost as CompilerHost__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo, $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoReader as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$ReadBuildInfo$PointerTo_Named_tsoptions$ParsedCommandLine_to_PointerTo_Named_incremental$BuildInfo } from "../../../../../../../support/interface-methods.js";
import { BuildInfo } from "./buildInfo.js";
import { buildInfoToSnapshot } from "./buildinfotosnapshot.js";
import { Program } from "./program.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface BuildInfoReader extends GoInterfaceValue {
    ReadBuildInfo($argument0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<BuildInfo> | undefined;
}
export const BuildInfoReader$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ReadBuildInfo$PointerTo_Named_tsoptions$ParsedCommandLine_to_PointerTo_Named_incremental$BuildInfo]);
export function BuildInfoReader$is(value: GoInterfaceValue | undefined): value is BuildInfoReader {
    return value !== undefined && value.$go$implements(BuildInfoReader$contract);
}
export class buildInfoReader {
    declare private readonly $goType: void;
    public constructor(public host: CompilerHost__from_compiler | undefined) {
    }
    declare private readonly then?: never;
    static ReadBuildInfo(r: buildInfoReader | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<BuildInfo> | undefined {
        let buildInfoFileName = ParsedCommandLine__from_tsoptions.GetBuildInfoFileName(config);
        if (buildInfoFileName === "") {
            return void 0;
        }
        const __gotots_receiver_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_receiver_2 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_1).FS();
        const __gotots_argument_1 = buildInfoFileName;
        const __gotots_results_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).ReadFile(__gotots_argument_1);
        let data = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (!ok) {
            return void 0;
        }
        let buildInfo = BuildInfo.$zero();
        const buildInfo$location = tsonicTypeScriptRuntime.boundLocation({}, () => buildInfo, buildInfo$next => buildInfo = buildInfo$next);
        const __gotots_conversion_0 = data;
        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
        }
        const __gotots_argument_2 = __gotots_conversion_1;
        const __gotots_argument_3 = new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo(buildInfo$location);
        const __gotots_argument_4 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
        let err: GoInterface | undefined = Unmarshal__from_json__package_1(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        if (!(err === undefined)) {
            return void 0;
        }
        return buildInfo$location;
    }
}
export function NewBuildInfoReader(host__shadow_1: CompilerHost__from_compiler | undefined): BuildInfoReader | undefined {
    return new GoInterfaceAdapter(new buildInfoReader(host__shadow_1));
}
export function ReadBuildInfoProgram(config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, reader: BuildInfoReader | undefined, host__shadow_1: CompilerHost__from_compiler | undefined): {
    value: Program;
} | undefined {
    const __gotots_receiver_0 = reader;
    const __gotots_argument_0 = config;
    let buildInfo: tsonicTypeScriptRuntime.Location<BuildInfo> | undefined = goInterfaceNonNil<BuildInfoReader>(__gotots_receiver_0).ReadBuildInfo(__gotots_argument_0);
    if (buildInfo === undefined || !BuildInfo.IsValidVersion(buildInfo) || !BuildInfo.IsIncremental(buildInfo)) {
        return void 0;
    }
    let incrementalProgram: {
        value: Program;
    } | undefined = { value: new Program(buildInfoToSnapshot(buildInfo, config, host__shadow_1), void 0, void 0, void 0) };
    return incrementalProgram;
}
