import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ASTDiagnostic as ASTDiagnostic__from_diagnosticwriter, Diagnostic as Diagnostic__from_diagnosticwriter } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnosticwriter/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { CommandLineTesting, System } from "./compile.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Tristate_IsTrue as Tristate_IsTrue__from_core, Tristate_IsUnknown as Tristate_IsUnknown__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FormatDiagnosticWithColorAndContext as FormatDiagnosticWithColorAndContext__from_diagnosticwriter, FormatDiagnosticsStatusAndTime as FormatDiagnosticsStatusAndTime__from_diagnosticwriter, FormatDiagnosticsStatusWithColorAndTime as FormatDiagnosticsStatusWithColorAndTime__from_diagnosticwriter, FormattingOptions as FormattingOptions__from_diagnosticwriter, FromASTDiagnostics as FromASTDiagnostics__from_diagnosticwriter, TryClearScreen as TryClearScreen__from_diagnosticwriter, WrapASTDiagnostic as WrapASTDiagnostic__from_diagnosticwriter, WriteErrorSummaryText as WriteErrorSummaryText__from_diagnosticwriter, WriteFormatDiagnostic as WriteFormatDiagnostic__from_diagnosticwriter } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnosticwriter/package.js";
import { Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void, $goDeferred$Named_io$Writer_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { IfElse$Named_io$Writer_string_Named_diagnosticwriter$Diagnostic_PointerTo_Named_diagnosticwriter$FormattingOptions_to_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_diagnosticwriter$ASTDiagnostic as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$OnBuildStatusReportEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnWatchStatusReportEnd$void_to_void } from "../../../../../../../support/interface-methods.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function getFormatOptsOfSys(sys: System | undefined, locale__shadow_1: Locale__from_locale): FormattingOptions__from_diagnosticwriter | undefined {
    const __gotots_field_2 = "\n";
    const __gotots_receiver_1 = sys;
    const __gotots_field_0 = goInterfaceNonNil<System>(__gotots_receiver_1).GetCurrentDirectory();
    const __gotots_receiver_2 = sys;
    const __gotots_receiver_3 = goInterfaceNonNil<System>(__gotots_receiver_2).FS();
    const __gotots_field_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).UseCaseSensitiveFileNames();
    const __gotots_field_3 = new ComparePathsOptions__from_tspath(__gotots_field_1, __gotots_field_0);
    return new FormattingOptions__from_diagnosticwriter(Locale__from_locale.$copy(locale__shadow_1), __gotots_field_3, __gotots_field_2);
}
export function QuietDiagnosticReporter(diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void {
}
export function CreateDiagnosticReporter(sys: System | undefined, w: GoInterface | undefined, locale__shadow_1: Locale__from_locale, options: {
    value: CompilerOptions__from_core;
} | undefined): (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined {
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Quiet)) {
        return QuietDiagnosticReporter;
    }
    let formatOpts: FormattingOptions__from_diagnosticwriter | undefined = getFormatOptsOfSys(sys, Locale__from_locale.$copy(locale__shadow_1));
    if (shouldBePretty(sys, options)) {
        return (diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void => {
            FormatDiagnosticWithColorAndContext__from_diagnosticwriter(w, new GoInterfaceAdapter(WrapASTDiagnostic__from_diagnosticwriter(diagnostic)), formatOpts);
            const __gotots_argument_0 = w;
            const __gotots_argument_1 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1);
        };
    }
    return (diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void => {
        WriteFormatDiagnostic__from_diagnosticwriter(w, new GoInterfaceAdapter(WrapASTDiagnostic__from_diagnosticwriter(diagnostic)), formatOpts);
    };
}
export function defaultIsPretty(sys: System | undefined): bool {
    const __gotots_receiver_7 = sys;
    const __gotots_argument_11 = "NO_COLOR";
    const __gotots_binary_operand_0 = goInterfaceNonNil<System>(__gotots_receiver_7).GetEnvironmentVariable(__gotots_argument_11);
    const __gotots_binary_operand_1 = "";
    if (__gotots_binary_operand_0 !== __gotots_binary_operand_1) {
        return false;
    }
    const __gotots_receiver_8 = sys;
    const __gotots_argument_12 = "FORCE_COLOR";
    const __gotots_binary_operand_2 = goInterfaceNonNil<System>(__gotots_receiver_8).GetEnvironmentVariable(__gotots_argument_12);
    const __gotots_binary_operand_3 = "";
    if (__gotots_binary_operand_2 !== __gotots_binary_operand_3) {
        return true;
    }
    const __gotots_receiver_9 = sys;
    return goInterfaceNonNil<System>(__gotots_receiver_9).WriteOutputIsTTY();
}
export function shouldBePretty(sys: System | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    if (options === undefined || Tristate_IsUnknown__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pretty)) {
        return defaultIsPretty(sys);
    }
    return Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pretty);
}
export class colors {
    declare private readonly $goType: void;
    public constructor(public showColors: bool, public isWindows: bool, public isWindowsTerminal: bool, public isVSCode: bool, public supportsRicherColors: bool) {
    }
    declare private readonly then?: never;
    static $go$private$tsc$blue(c: colors | undefined, str: gostring): gostring {
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).showColors) {
            return str;
        }
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isWindows && !(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isWindowsTerminal && !(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isVSCode) {
            return colors.$go$private$tsc$brightWhite(c, str);
        }
        return "\u001B[94m" + str + "\u001B[39m";
    }
    static $go$private$tsc$blueBackground(c: colors | undefined, str: gostring): gostring {
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).showColors) {
            return str;
        }
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).supportsRicherColors) {
            return "\u001B[48;5;68m" + str + "\u001B[39;49m";
        }
        else {
            return "\u001B[44m" + str + "\u001B[39;49m";
        }
    }
    static $go$private$tsc$bold(c: colors | undefined, str: gostring): gostring {
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).showColors) {
            return str;
        }
        return "\u001B[1m" + str + "\u001B[22m";
    }
    static $go$private$tsc$brightWhite(c: colors | undefined, str: gostring): gostring {
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).showColors) {
            return str;
        }
        return "\u001B[97m" + str + "\u001B[39m";
    }
}
export function createColors(sys: System | undefined): colors | undefined {
    if (!defaultIsPretty(sys)) {
        return new colors(false, false, false, false, false);
    }
    const __gotots_receiver_10 = sys;
    const __gotots_argument_13 = "OS";
    let os = goInterfaceNonNil<System>(__gotots_receiver_10).GetEnvironmentVariable(__gotots_argument_13);
    let isWindows = strings__from_gostdlib.Contains(strings__from_gostdlib.ToLower(os), "windows");
    const __gotots_receiver_11 = sys;
    const __gotots_argument_14 = "WT_SESSION";
    const __gotots_binary_operand_4 = goInterfaceNonNil<System>(__gotots_receiver_11).GetEnvironmentVariable(__gotots_argument_14);
    const __gotots_binary_operand_5 = "";
    let isWindowsTerminal = __gotots_binary_operand_4 !== __gotots_binary_operand_5;
    const __gotots_receiver_12 = sys;
    const __gotots_argument_15 = "TERM_PROGRAM";
    const __gotots_binary_operand_6 = goInterfaceNonNil<System>(__gotots_receiver_12).GetEnvironmentVariable(__gotots_argument_15);
    const __gotots_binary_operand_7 = "vscode";
    let isVSCode = __gotots_binary_operand_6 === __gotots_binary_operand_7;
    const __gotots_receiver_13 = sys;
    const __gotots_argument_16 = "COLORTERM";
    const __gotots_binary_operand_8 = goInterfaceNonNil<System>(__gotots_receiver_13).GetEnvironmentVariable(__gotots_argument_16);
    const __gotots_binary_operand_9 = "truecolor";
    let __gotots_logical_result_0 = __gotots_binary_operand_8 === __gotots_binary_operand_9;
    if (!__gotots_logical_result_0) {
        const __gotots_receiver_14 = sys;
        const __gotots_argument_17 = "TERM";
        const __gotots_binary_operand_10 = goInterfaceNonNil<System>(__gotots_receiver_14).GetEnvironmentVariable(__gotots_argument_17);
        const __gotots_binary_operand_11 = "xterm-256color";
        __gotots_logical_result_0 = __gotots_binary_operand_10 === __gotots_binary_operand_11;
    }
    let supportsRicherColors = __gotots_logical_result_0;
    return new colors(true, isWindows, isWindowsTerminal, isVSCode, supportsRicherColors);
}
export function QuietDiagnosticsReporter(diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): void {
}
export function CreateReportErrorSummary(sys: System | undefined, locale__shadow_1: Locale__from_locale, options: {
    value: CompilerOptions__from_core;
} | undefined): (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined {
    if (shouldBePretty(sys, options)) {
        let formatOpts: FormattingOptions__from_diagnosticwriter | undefined = getFormatOptsOfSys(sys, Locale__from_locale.$copy(locale__shadow_1));
        return (diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): void => {
            const __gotots_receiver_0 = sys;
            const __gotots_argument_2 = goInterfaceNonNil<System>(__gotots_receiver_0).Writer();
            const __gotots_argument_3 = FromASTDiagnostics__from_diagnosticwriter(diagnostics);
            const __gotots_argument_4 = formatOpts;
            WriteErrorSummaryText__from_diagnosticwriter(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        };
    }
    return QuietDiagnosticsReporter;
}
export function CreateBuilderStatusReporter(sys: System | undefined, w: GoInterface | undefined, locale__shadow_1: Locale__from_locale, options: {
    value: CompilerOptions__from_core;
} | undefined, testing: CommandLineTesting | undefined): (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined {
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Quiet)) {
        return QuietDiagnosticReporter;
    }
    let formatOpts: FormattingOptions__from_diagnosticwriter | undefined = getFormatOptsOfSys(sys, Locale__from_locale.$copy(locale__shadow_1));
    let writeStatus: (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined = IfElse$Named_io$Writer_string_Named_diagnosticwriter$Diagnostic_PointerTo_Named_diagnosticwriter$FormattingOptions_to_void(shouldBePretty(sys, options), FormatDiagnosticsStatusWithColorAndTime__from_diagnosticwriter, FormatDiagnosticsStatusAndTime__from_diagnosticwriter);
    return (diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void => {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let writerDiagnostic: ASTDiagnostic__from_diagnosticwriter | undefined = WrapASTDiagnostic__from_diagnosticwriter(diagnostic);
                    if (!(testing === undefined)) {
                        const __gotots_receiver_15 = testing;
                        const __gotots_argument_18 = w;
                        goInterfaceNonNil<CommandLineTesting>(__gotots_receiver_15).OnBuildStatusReportStart(__gotots_argument_18);
                        const __gotots_receiver_16: CommandLineTesting = goInterfaceNonNil<CommandLineTesting>(testing);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$OnBuildStatusReportEnd$Named_io$Writer_to_void, __gotots_receiver_16);
                        const __gotots_argument_19 = w;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? __gotots_receiver_16.OnBuildStatusReportEnd(__gotots_argument_19) : __gotots_deferred_1($go$recovery, __gotots_receiver_16, __gotots_argument_19);
                        });
                    }
                    const __gotots_callee_1 = writeStatus;
                    const __gotots_argument_20 = w;
                    const __gotots_receiver_17 = sys;
                    const __gotots_argument_21 = goInterfaceNonNil<System>(__gotots_receiver_17).Now().Format("03:04:05 PM");
                    const __gotots_argument_22 = new GoInterfaceAdapter(writerDiagnostic);
                    const __gotots_argument_23 = formatOpts;
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
                    const __gotots_argument_24 = w;
                    const __gotots_argument_25 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine), new $goInterfaceAdapter$string((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
                    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_24), __gotots_argument_25);
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    };
}
export function CreateWatchStatusReporter(sys: System | undefined, locale__shadow_1: Locale__from_locale, options: {
    value: CompilerOptions__from_core;
} | undefined, testing: CommandLineTesting | undefined): (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined {
    let formatOpts: FormattingOptions__from_diagnosticwriter | undefined = getFormatOptsOfSys(sys, Locale__from_locale.$copy(locale__shadow_1));
    let writeStatus: (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined = IfElse$Named_io$Writer_string_Named_diagnosticwriter$Diagnostic_PointerTo_Named_diagnosticwriter$FormattingOptions_to_void(shouldBePretty(sys, options), FormatDiagnosticsStatusWithColorAndTime__from_diagnosticwriter, FormatDiagnosticsStatusAndTime__from_diagnosticwriter);
    return (diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void => {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let writerDiagnostic: ASTDiagnostic__from_diagnosticwriter | undefined = WrapASTDiagnostic__from_diagnosticwriter(diagnostic);
                    const __gotots_receiver_4 = sys;
                    let writer: GoInterface | undefined = goInterfaceNonNil<System>(__gotots_receiver_4).Writer();
                    if (!(testing === undefined)) {
                        const __gotots_receiver_5 = testing;
                        goInterfaceNonNil<CommandLineTesting>(__gotots_receiver_5).OnWatchStatusReportStart();
                        const __gotots_receiver_6: CommandLineTesting = goInterfaceNonNil<CommandLineTesting>(testing);
                        const __gotots_deferred_1 = $goDeferred$void_to_void.resolveMethod($goInterfaceMethod$OnWatchStatusReportEnd$void_to_void, __gotots_receiver_6);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? __gotots_receiver_6.OnWatchStatusReportEnd() : __gotots_deferred_1($go$recovery, __gotots_receiver_6);
                        });
                    }
                    TryClearScreen__from_diagnosticwriter(writer, new GoInterfaceAdapter(writerDiagnostic), options);
                    const __gotots_callee_0 = writeStatus;
                    const __gotots_argument_5 = writer;
                    const __gotots_receiver_7 = sys;
                    const __gotots_argument_6 = goInterfaceNonNil<System>(__gotots_receiver_7).Now().Format("03:04:05 PM");
                    const __gotots_argument_7 = new GoInterfaceAdapter(writerDiagnostic);
                    const __gotots_argument_8 = formatOpts;
                    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                    const __gotots_argument_9 = writer;
                    const __gotots_argument_10 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine), new $goInterfaceAdapter$string((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
                    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_9), __gotots_argument_10);
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    };
}
