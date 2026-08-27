import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { CommandLineOption } from "./commandlineoption.js";
import type { NameMap } from "./namemap.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
export class DidYouMeanOptionsDiagnostics {
    declare private readonly $goType: void;
    public constructor(public alternateMode: AlternateModeDiagnostics | undefined, public OptionDeclarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>, public UnknownOptionDiagnostic: {
        value: Message__from_diagnostics;
    } | undefined, public UnknownDidYouMeanDiagnostic: {
        value: Message__from_diagnostics;
    } | undefined) {
    }
    declare private readonly then?: never;
}
export class AlternateModeDiagnostics {
    declare private readonly $goType: void;
    public constructor(public diagnostic: {
        value: Message__from_diagnostics;
    } | undefined, public optionsNameMap: NameMap | undefined) {
    }
    declare private readonly then?: never;
}
export class ParseCommandLineWorkerDiagnostics {
    declare private readonly $goType: void;
    public constructor(public didYouMean: DidYouMeanOptionsDiagnostics, public optionsNameMap: NameMap | undefined, public optionsNameMapOnce: sync__from_gostdlib.Once, public OptionTypeMismatchDiagnostic: {
        value: Message__from_diagnostics;
    } | undefined) {
    }
    declare private readonly then?: never;
}
export function getParseCommandLineWorkerDiagnostics(decls: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>): ParseCommandLineWorkerDiagnostics | undefined {
    return new ParseCommandLineWorkerDiagnostics(new DidYouMeanOptionsDiagnostics(new AlternateModeDiagnostics($state__diagnostics.Compiler_option_0_may_only_be_used_with_build, $state.BuildNameMap), decls, $state__diagnostics.Unknown_compiler_option_0, $state__diagnostics.Unknown_compiler_option_0_Did_you_mean_1), void 0, named_sync.SyncOnceOperations.$zero(), $state__diagnostics.Compiler_option_0_expects_an_argument);
}
