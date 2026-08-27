import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, TextPos as TextPos__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Category as Category__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Tristate_IsTrue as Tristate_IsTrue__from_core, UTF16Len as UTF16Len__from_core, UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, CategoryError$constant as CategoryError$constant__from_diagnostics, CategoryMessage$constant as CategoryMessage$constant__from_diagnostics, CategorySuggestion$constant as CategorySuggestion$constant__from_diagnostics, CategoryWarning$constant as CategoryWarning$constant__from_diagnostics, Category_Name as Category_Name__from_diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnosticwriter/state.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { GetECMALineAndUTF16CharacterOfPosition as GetECMALineAndUTF16CharacterOfPosition__from_scanner, GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMAPositionOfLineAndByteOffset as GetECMAPositionOfLineAndByteOffset__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, ConvertToRelativePath as ConvertToRelativePath__from_tspath, PathIsAbsolute as PathIsAbsolute__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Keys$MapOf_Named_diagnosticwriter$FileLike_To_SliceOf_Named_diagnosticwriter$Diagnostic$Named_diagnosticwriter$FileLike$SliceOf_Named_diagnosticwriter$Diagnostic } from "../../../../../../support/generics/concretizations/maps/Keys.js";
import { Contains$SliceOf_int32$int32 } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { SortedFunc$Named_diagnosticwriter$FileLike } from "../../../../../../support/generics/concretizations/slices/SortedFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_diagnosticwriter$ASTDiagnostic, $goInterfaceAdapter$int, $goInterfaceAdapter$int32, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Category$void_to_Named_diagnostics$Category, $goInterfaceMethod$Code$void_to_int32, $goInterfaceMethod$ECMALineMap$void_to_SliceOf_Named_core$TextPos, $goInterfaceMethod$End$void_to_int, $goInterfaceMethod$File$void_to_Named_diagnosticwriter$FileLike, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Len$void_to_int, $goInterfaceMethod$Localize$Named_locale$Locale_to_string, $goInterfaceMethod$MessageChain$void_to_SliceOf_Named_diagnosticwriter$Diagnostic, $goInterfaceMethod$Pos$void_to_int, $goInterfaceMethod$RelatedInformation$void_to_SliceOf_Named_diagnosticwriter$Diagnostic, $goInterfaceMethod$Text$void_to_string } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_diagnosticwriter$FileLike_To_SliceOf_Named_diagnosticwriter$Diagnostic as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export interface FileLike extends GoInterfaceValue {
    ECMALineMap(): RuntimeSlice<TextPos__from_core>;
    FileName(): gostring;
    Text(): gostring;
}
export const FileLike$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ECMALineMap$void_to_SliceOf_Named_core$TextPos, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Text$void_to_string]);
export function FileLike$is(value: GoInterfaceValue | undefined): value is FileLike {
    return value !== undefined && value.$go$implements(FileLike$contract);
}
export interface Diagnostic extends GoInterfaceValue {
    Category(): Category__from_diagnostics;
    Code(): int32;
    End(): int;
    File(): FileLike | undefined;
    Len(): int;
    Localize($argument0: Locale__from_locale): gostring;
    MessageChain(): RuntimeSlice<Diagnostic | undefined>;
    Pos(): int;
    RelatedInformation(): RuntimeSlice<Diagnostic | undefined>;
}
export const Diagnostic$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Category$void_to_Named_diagnostics$Category, $goInterfaceMethod$Code$void_to_int32, $goInterfaceMethod$End$void_to_int, $goInterfaceMethod$File$void_to_Named_diagnosticwriter$FileLike, $goInterfaceMethod$Len$void_to_int, $goInterfaceMethod$Localize$Named_locale$Locale_to_string, $goInterfaceMethod$MessageChain$void_to_SliceOf_Named_diagnosticwriter$Diagnostic, $goInterfaceMethod$Pos$void_to_int, $goInterfaceMethod$RelatedInformation$void_to_SliceOf_Named_diagnosticwriter$Diagnostic]);
export function Diagnostic$is(value: GoInterfaceValue | undefined): value is Diagnostic {
    return value !== undefined && value.$go$implements(Diagnostic$contract);
}
export class ASTDiagnostic {
    declare private readonly $goType: void;
    public constructor(public Diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static File(d: ASTDiagnostic | undefined): FileLike | undefined {
        {
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Diagnostic__from_ast.File((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostic);
            if (!(file === undefined)) {
                return new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file);
            }
        }
        return void 0;
    }
    static MessageChain(d: ASTDiagnostic | undefined): RuntimeSlice<Diagnostic | undefined> {
        let chain = Diagnostic__from_ast.MessageChain((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostic);
        let result = RuntimeSlice.make<Diagnostic | undefined>(chain.length, null, void 0);
        const __gotots_range_8 = chain;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
            const __gotots_range_value_10 = __gotots_range_index_7;
            const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_7);
            let i = __gotots_range_value_10;
            let c: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_11;
            result.set(i, new $goInterfaceAdapter$PointerTo_Named_diagnosticwriter$ASTDiagnostic(new ASTDiagnostic(c)));
        }
        return result;
    }
    static RelatedInformation(d: ASTDiagnostic | undefined): RuntimeSlice<Diagnostic | undefined> {
        let related = Diagnostic__from_ast.RelatedInformation((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostic);
        let result = RuntimeSlice.make<Diagnostic | undefined>(related.length, null, void 0);
        const __gotots_range_9 = related;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
            const __gotots_range_value_12 = __gotots_range_index_8;
            const __gotots_range_value_13 = __gotots_range_9.get(__gotots_range_index_8);
            let i = __gotots_range_value_12;
            let r: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_13;
            result.set(i, new $goInterfaceAdapter$PointerTo_Named_diagnosticwriter$ASTDiagnostic(new ASTDiagnostic(r)));
        }
        return result;
    }
}
export function WrapASTDiagnostic(d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): ASTDiagnostic | undefined {
    return new ASTDiagnostic(d);
}
export function FromASTDiagnostics(diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<Diagnostic | undefined> {
    let result = RuntimeSlice.make<Diagnostic | undefined>(diags.length, null, void 0);
    const __gotots_range_1 = diags;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
        let i = __gotots_range_value_1;
        let d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_2;
        result.set(i, new $goInterfaceAdapter$PointerTo_Named_diagnosticwriter$ASTDiagnostic(WrapASTDiagnostic(d)));
    }
    return result;
}
export class FormattingOptions {
    declare private readonly $goType: void;
    public constructor(public Locale: Locale__from_locale, public ComparePathsOptions: ComparePathsOptions__from_tspath, public NewLine: gostring) {
    }
    declare private readonly then?: never;
}
export const foregroundColorEscapeGrey$string: gostring = "\u001B[90m";
export const foregroundColorEscapeRed$string: gostring = "\u001B[91m";
export const foregroundColorEscapeYellow$string: gostring = "\u001B[93m";
export const foregroundColorEscapeBlue$string: gostring = "\u001B[94m";
export const foregroundColorEscapeCyan$string: gostring = "\u001B[96m";
export const gutterStyleSequence$string: gostring = "\u001B[7m";
export const gutterSeparator$string: gostring = " ";
export const resetEscapeSequence$string: gostring = "\u001B[0m";
export const ellipsis$string: gostring = "...";
export function FormatDiagnosticWithColorAndContext(output: GoInterface | undefined, diagnostic: Diagnostic | undefined, formatOpts: FormattingOptions | undefined): void {
    const __gotots_receiver_0 = diagnostic;
    if (!(goInterfaceNonNil<Diagnostic>(__gotots_receiver_0).File() === undefined)) {
        const __gotots_receiver_1 = diagnostic;
        let file: FileLike | undefined = goInterfaceNonNil<Diagnostic>(__gotots_receiver_1).File();
        const __gotots_receiver_2 = diagnostic;
        let pos = goInterfaceNonNil<Diagnostic>(__gotots_receiver_2).Pos();
        WriteLocation(output, file, pos, formatOpts, new FormattedWriter(writeWithStyleAndReset));
        const __gotots_argument_0 = output;
        const __gotots_argument_1 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(" - ")]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1);
    }
    const __gotots_argument_3 = output;
    const __gotots_receiver_3 = diagnostic;
    const __gotots_argument_4 = Category_Name__from_diagnostics(goInterfaceNonNil<Diagnostic>(__gotots_receiver_3).Category());
    const __gotots_receiver_4 = diagnostic;
    const __gotots_argument_2 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_4).Category();
    const __gotots_argument_5 = getCategoryFormat(__gotots_argument_2);
    writeWithStyleAndReset(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
    const __gotots_argument_9 = output;
    const __gotots_argument_10 = "%s TS%d: %s";
    const __gotots_argument_6 = new GoInterfaceAdapter(foregroundColorEscapeGrey$string);
    const __gotots_receiver_5 = diagnostic;
    const __gotots_argument_7 = new $goInterfaceAdapter$int32(goInterfaceNonNil<Diagnostic>(__gotots_receiver_5).Code());
    const __gotots_argument_8 = new GoInterfaceAdapter(resetEscapeSequence$string);
    const __gotots_argument_11 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_6, __gotots_argument_7, __gotots_argument_8]);
    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_9), __gotots_argument_10, __gotots_argument_11);
    WriteFlattenedDiagnosticMessage(output, diagnostic, (formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale));
    const __gotots_receiver_6 = diagnostic;
    let __gotots_logical_result_0 = !(goInterfaceNonNil<Diagnostic>(__gotots_receiver_6).File() === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_receiver_7 = diagnostic;
        const __gotots_binary_operand_0 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_7).Code();
        const __gotots_binary_operand_1 = Message__from_diagnostics.Code($state__diagnostics.File_appears_to_be_binary);
        __gotots_logical_result_0 = __gotots_binary_operand_0 !== __gotots_binary_operand_1;
    }
    if (__gotots_logical_result_0) {
        const __gotots_argument_12 = output;
        const __gotots_argument_13 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_12), __gotots_argument_13);
        const __gotots_argument_15 = output;
        const __gotots_receiver_8 = diagnostic;
        const __gotots_argument_16 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_8).File();
        const __gotots_receiver_9 = diagnostic;
        const __gotots_argument_17 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_9).Pos();
        const __gotots_receiver_10 = diagnostic;
        const __gotots_argument_18 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_10).Len();
        const __gotots_receiver_11 = diagnostic;
        const __gotots_argument_14 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_11).Category();
        const __gotots_argument_19 = getCategoryFormat(__gotots_argument_14);
        const __gotots_argument_20 = "";
        const __gotots_argument_21 = formatOpts;
        writeCodeSnippet(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
        const __gotots_argument_22 = output;
        const __gotots_argument_23 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_22), __gotots_argument_23);
    }
    const __gotots_receiver_12 = diagnostic;
    let __gotots_logical_result_1 = (!goInterfaceNonNil<Diagnostic>(__gotots_receiver_12).RelatedInformation().isNil());
    if (__gotots_logical_result_1) {
        const __gotots_receiver_13 = diagnostic;
        const __gotots_binary_operand_2 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_13).RelatedInformation().length;
        const __gotots_binary_operand_3 = 0;
        __gotots_logical_result_1 = (__gotots_binary_operand_2 > __gotots_binary_operand_3);
    }
    if (__gotots_logical_result_1) {
        const __gotots_receiver_14 = diagnostic;
        const __gotots_range_0 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_14).RelatedInformation();
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let relatedInformation: Diagnostic | undefined = __gotots_range_value_0;
            const __gotots_receiver_15 = relatedInformation;
            let file: FileLike | undefined = goInterfaceNonNil<Diagnostic>(__gotots_receiver_15).File();
            if (!(file === undefined)) {
                const __gotots_argument_24 = output;
                const __gotots_argument_25 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_24), __gotots_argument_25);
                const __gotots_argument_26 = output;
                const __gotots_argument_27 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("  ")]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_26), __gotots_argument_27);
                const __gotots_receiver_16 = relatedInformation;
                let pos = goInterfaceNonNil<Diagnostic>(__gotots_receiver_16).Pos();
                WriteLocation(output, file, pos, formatOpts, new FormattedWriter(writeWithStyleAndReset));
                const __gotots_argument_28 = output;
                const __gotots_argument_29 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(" - ")]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_28), __gotots_argument_29);
                WriteFlattenedDiagnosticMessage(output, relatedInformation, (formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale));
                const __gotots_argument_30 = output;
                const __gotots_argument_31 = file;
                const __gotots_argument_32 = pos;
                const __gotots_receiver_17 = relatedInformation;
                const __gotots_argument_33 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_17).Len();
                const __gotots_argument_34 = foregroundColorEscapeCyan$string;
                const __gotots_argument_35 = "    ";
                const __gotots_argument_36 = formatOpts;
                writeCodeSnippet(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
            }
            const __gotots_argument_37 = output;
            const __gotots_argument_38 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_37), __gotots_argument_38);
        }
    }
}
export function writeCodeSnippet(writer: GoInterface | undefined, sourceFile: FileLike | undefined, start: int, length: int, squiggleColor: gostring, indent: gostring, formatOpts: FormattingOptions | undefined): void {
    const __gotots_results_2 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(sourceFile, start);
    let firstLine = __gotots_results_2[0];
    let firstLineChar = __gotots_results_2[1];
    const __gotots_results_3 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(sourceFile, start + length);
    let lastLine = __gotots_results_3[0];
    let lastLineChar = __gotots_results_3[1];
    if (length === 0) {
        lastLineChar = new UTF16Offset__from_core(lastLineChar.$value + 1);
    }
    const __gotots_argument_87 = sourceFile;
    const __gotots_receiver_29 = sourceFile;
    const __gotots_argument_88 = goInterfaceNonNil<FileLike>(__gotots_receiver_29).Text().length;
    let lastLineOfFile = GetECMALineOfPosition__from_scanner(__gotots_argument_87, __gotots_argument_88);
    let hasMoreThanFiveLines = lastLine - firstLine >= 4;
    let gutterWidth = strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(lastLine + 1))).length;
    if (hasMoreThanFiveLines) {
        gutterWidth = globalThis.Math.max(3, gutterWidth);
    }
    for (let i = firstLine; i <= lastLine; i++) {
        const __gotots_argument_89 = writer;
        const __gotots_argument_90 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_89), __gotots_argument_90);
        if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
            const __gotots_argument_91 = writer;
            const __gotots_argument_92 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(indent)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_91), __gotots_argument_92);
            const __gotots_argument_93 = writer;
            const __gotots_argument_94 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(gutterStyleSequence$string)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_93), __gotots_argument_94);
            const __gotots_argument_95 = writer;
            const __gotots_argument_96 = "%*s";
            const __gotots_argument_97 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(gutterWidth), new GoInterfaceAdapter(ellipsis$string)]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_95), __gotots_argument_96, __gotots_argument_97);
            const __gotots_argument_98 = writer;
            const __gotots_argument_99 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(resetEscapeSequence$string)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_98), __gotots_argument_99);
            const __gotots_argument_100 = writer;
            const __gotots_argument_101 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(gutterSeparator$string)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_100), __gotots_argument_101);
            const __gotots_argument_102 = writer;
            const __gotots_argument_103 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
            provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_102), __gotots_argument_103);
            i = lastLine - 1;
        }
        let lineStart = GetECMAPositionOfLineAndByteOffset__from_scanner(sourceFile, i, 0);
        let lineEnd = 0;
        if (i < lastLineOfFile) {
            lineEnd = GetECMAPositionOfLineAndByteOffset__from_scanner(sourceFile, i + 1, 0);
        }
        else {
            const __gotots_receiver_30 = sourceFile;
            lineEnd = goInterfaceNonNil<FileLike>(__gotots_receiver_30).Text().length;
        }
        const __gotots_receiver_31 = sourceFile;
        const __gotots_slice_operand_0 = goInterfaceNonNil<FileLike>(__gotots_receiver_31).Text();
        const __gotots_slice_operand_1 = lineStart;
        const __gotots_slice_operand_2 = lineEnd;
        const __gotots_argument_104 = goStringSlice(__gotots_slice_operand_0, __gotots_slice_operand_1, __gotots_slice_operand_2);
        const __gotots_argument_105 = unicode__from_gostdlib.IsSpace;
        let lineContent = strings__from_gostdlib.TrimRightFunc(__gotots_argument_104, __gotots_argument_105);
        lineContent = strings__from_gostdlib.ReplaceAll(lineContent, "\t", " ");
        const __gotots_argument_106 = writer;
        const __gotots_argument_107 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(indent)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_106), __gotots_argument_107);
        const __gotots_argument_108 = writer;
        const __gotots_argument_109 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(gutterStyleSequence$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_108), __gotots_argument_109);
        const __gotots_argument_110 = writer;
        const __gotots_argument_111 = "%*d";
        const __gotots_argument_112 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(gutterWidth), new $goInterfaceAdapter$int(i + 1)]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_110), __gotots_argument_111, __gotots_argument_112);
        const __gotots_argument_113 = writer;
        const __gotots_argument_114 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(resetEscapeSequence$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_113), __gotots_argument_114);
        const __gotots_argument_115 = writer;
        const __gotots_argument_116 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(gutterSeparator$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_115), __gotots_argument_116);
        const __gotots_argument_117 = writer;
        const __gotots_argument_118 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(lineContent)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_117), __gotots_argument_118);
        const __gotots_argument_119 = writer;
        const __gotots_argument_120 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_119), __gotots_argument_120);
        const __gotots_argument_121 = writer;
        const __gotots_argument_122 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(indent)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_121), __gotots_argument_122);
        const __gotots_argument_123 = writer;
        const __gotots_argument_124 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(gutterStyleSequence$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_123), __gotots_argument_124);
        const __gotots_argument_125 = writer;
        const __gotots_argument_126 = "%*s";
        const __gotots_argument_127 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(gutterWidth), new GoInterfaceAdapter("")]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_125), __gotots_argument_126, __gotots_argument_127);
        const __gotots_argument_128 = writer;
        const __gotots_argument_129 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(resetEscapeSequence$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_128), __gotots_argument_129);
        const __gotots_argument_130 = writer;
        const __gotots_argument_131 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(gutterSeparator$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_130), __gotots_argument_131);
        const __gotots_argument_132 = writer;
        const __gotots_argument_133 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(squiggleColor)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_132), __gotots_argument_133);
        switch (i) {
            case firstLine: {
                let lastCharForLine = 0;
                if (i === lastLine) {
                    lastCharForLine = lastLineChar.$value;
                }
                else {
                    lastCharForLine = UTF16Len__from_core(lineContent).$value;
                }
                const __gotots_argument_134 = writer;
                const __gotots_argument_135 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(firstLineChar.$value))))]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_134), __gotots_argument_135);
                const __gotots_argument_136 = writer;
                const __gotots_argument_137 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Repeat("~", BigInt.asIntN(64, goNumberToBigInt(lastCharForLine - firstLineChar.$value))))]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_136), __gotots_argument_137);
                break;
            }
            case lastLine: {
                const __gotots_argument_138 = writer;
                const __gotots_argument_139 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Repeat("~", BigInt.asIntN(64, goNumberToBigInt(lastLineChar.$value))))]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_138), __gotots_argument_139);
                break;
            }
            default: {
                const __gotots_argument_140 = writer;
                const __gotots_argument_141 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Repeat("~", BigInt.asIntN(64, goNumberToBigInt(UTF16Len__from_core(lineContent).$value))))]);
                provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_140), __gotots_argument_141);
                break;
            }
        }
        const __gotots_argument_142 = writer;
        const __gotots_argument_143 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(resetEscapeSequence$string)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_142), __gotots_argument_143);
    }
}
export function WriteFlattenedASTDiagnosticMessage(writer: GoInterface | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, newline: gostring, locale__shadow_1: Locale__from_locale): void {
    WriteFlattenedDiagnosticMessage(writer, new $goInterfaceAdapter$PointerTo_Named_diagnosticwriter$ASTDiagnostic(WrapASTDiagnostic(diagnostic)), newline, Locale__from_locale.$copy(locale__shadow_1));
}
export function WriteFlattenedDiagnosticMessage(writer: GoInterface | undefined, diagnostic: Diagnostic | undefined, newline: gostring, locale__shadow_1: Locale__from_locale): void {
    const __gotots_argument_85 = writer;
    const __gotots_receiver_27 = diagnostic;
    const __gotots_argument_83 = Locale__from_locale.$copy(locale__shadow_1);
    const __gotots_argument_84 = new GoInterfaceAdapter(goInterfaceNonNil<Diagnostic>(__gotots_receiver_27).Localize(__gotots_argument_83));
    const __gotots_argument_86 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_84]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_85), __gotots_argument_86);
    const __gotots_receiver_28 = diagnostic;
    const __gotots_range_2 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_28).MessageChain();
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
        let chain: Diagnostic | undefined = __gotots_range_value_3;
        flattenDiagnosticMessageChain(writer, chain, newline, Locale__from_locale.$copy(locale__shadow_1), 1);
    }
}
export function flattenDiagnosticMessageChain(writer: GoInterface | undefined, chain: Diagnostic | undefined, newLine: gostring, locale__shadow_1: Locale__from_locale, level: int): void {
    const __gotots_argument_175 = writer;
    const __gotots_argument_176 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(newLine)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_175), __gotots_argument_176);
    const __gotots_range_6 = level;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6; __gotots_range_index_5++) {
        const __gotots_argument_177 = writer;
        const __gotots_argument_178 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("  ")]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_177), __gotots_argument_178);
    }
    const __gotots_argument_181 = writer;
    const __gotots_receiver_42 = chain;
    const __gotots_argument_179 = Locale__from_locale.$copy(locale__shadow_1);
    const __gotots_argument_180 = new GoInterfaceAdapter(goInterfaceNonNil<Diagnostic>(__gotots_receiver_42).Localize(__gotots_argument_179));
    const __gotots_argument_182 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_180]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_181), __gotots_argument_182);
    const __gotots_receiver_43 = chain;
    const __gotots_range_7 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_43).MessageChain();
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
        const __gotots_range_value_9 = __gotots_range_7.get(__gotots_range_index_6);
        let child: Diagnostic | undefined = __gotots_range_value_9;
        flattenDiagnosticMessageChain(writer, child, newLine, Locale__from_locale.$copy(locale__shadow_1), level + 1);
    }
}
export function getCategoryFormat(category: Category__from_diagnostics): gostring {
    switch (category) {
        case CategoryError$constant__from_diagnostics(): {
            return foregroundColorEscapeRed$string;
            break;
        }
        case CategoryWarning$constant__from_diagnostics(): {
            return foregroundColorEscapeYellow$string;
            break;
        }
        case CategorySuggestion$constant__from_diagnostics(): {
            return foregroundColorEscapeGrey$string;
            break;
        }
        case CategoryMessage$constant__from_diagnostics(): {
            return foregroundColorEscapeBlue$string;
            break;
        }
    }
    const __gotots_argument_82 = new GoInterfaceAdapter("Unhandled diagnostic category");
    GoPanic.raise(__gotots_argument_82 === undefined ? GoPanicNilValue.create() : __gotots_argument_82);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export class FormattedWriter {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: GoInterface | undefined, $1: gostring, $2: gostring) => void) | undefined) {
    }
    declare private readonly then?: never;
}
export function writeWithStyleAndReset(output: GoInterface | undefined, text: gostring, formatStyle: gostring): void {
    const __gotots_argument_76 = output;
    const __gotots_argument_77 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(formatStyle)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_76), __gotots_argument_77);
    const __gotots_argument_78 = output;
    const __gotots_argument_79 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(text)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_78), __gotots_argument_79);
    const __gotots_argument_80 = output;
    const __gotots_argument_81 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(resetEscapeSequence$string)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_80), __gotots_argument_81);
}
export function WriteLocation(output: GoInterface | undefined, file: FileLike | undefined, pos: int, formatOpts: FormattingOptions | undefined, writeWithStyleAndReset__shadow_1: FormattedWriter): void {
    const __gotots_results_1 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(file, pos);
    let firstLine = __gotots_results_1[0];
    let firstChar = __gotots_results_1[1];
    let relativeFileName = "";
    if (!(formatOpts === undefined)) {
        const __gotots_receiver_25 = file;
        const __gotots_argument_61 = goInterfaceNonNil<FileLike>(__gotots_receiver_25).FileName();
        const __gotots_argument_62 = ComparePathsOptions__from_tspath.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ComparePathsOptions);
        relativeFileName = ConvertToRelativePath__from_tspath(__gotots_argument_61, __gotots_argument_62);
    }
    else {
        const __gotots_receiver_26 = file;
        relativeFileName = goInterfaceNonNil<FileLike>(__gotots_receiver_26).FileName();
    }
    const __gotots_callee_0 = writeWithStyleAndReset__shadow_1.$value;
    const __gotots_argument_63 = output;
    const __gotots_argument_64 = relativeFileName;
    const __gotots_argument_65 = foregroundColorEscapeCyan$string;
    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
    const __gotots_argument_66 = output;
    const __gotots_argument_67 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(":")]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_66), __gotots_argument_67);
    const __gotots_callee_1 = writeWithStyleAndReset__shadow_1.$value;
    const __gotots_argument_68 = output;
    const __gotots_argument_69 = strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(firstLine + 1)));
    const __gotots_argument_70 = foregroundColorEscapeYellow$string;
    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68, __gotots_argument_69, __gotots_argument_70);
    const __gotots_argument_71 = output;
    const __gotots_argument_72 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(":")]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_71), __gotots_argument_72);
    const __gotots_callee_2 = writeWithStyleAndReset__shadow_1.$value;
    const __gotots_argument_73 = output;
    const __gotots_argument_74 = strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(firstChar.$value + 1)));
    const __gotots_argument_75 = foregroundColorEscapeYellow$string;
    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
}
export class ErrorSummary {
    declare private readonly $goType: void;
    public constructor(public TotalErrorCount: int, public GlobalErrors: RuntimeSlice<Diagnostic | undefined>, public ErrorsByFile: GoMapValue<FileLike | undefined, RuntimeSlice<Diagnostic | undefined>>, public SortedFiles: RuntimeSlice<FileLike | undefined>) {
    }
    declare private readonly then?: never;
}
export function WriteErrorSummaryText(output: GoInterface | undefined, allDiagnostics: RuntimeSlice<Diagnostic | undefined>, formatOpts: FormattingOptions | undefined): void {
    let errorSummary: ErrorSummary | undefined = getErrorSummary(allDiagnostics);
    let totalErrorCount = (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TotalErrorCount;
    if (totalErrorCount === 0) {
        return;
    }
    let firstFile: FileLike | undefined = void 0;
    if ((errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SortedFiles.length > 0) {
        firstFile = (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SortedFiles.get(0);
    }
    let firstFileName = prettyPathForFileError(firstFile, (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorsByFile.lookup(firstFile), formatOpts);
    let numErroringFiles = (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorsByFile.length();
    let message = "";
    if (totalErrorCount === 1) {
        if ((errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GlobalErrors.length > 0 || firstFileName === "") {
            message = Message__from_diagnostics.Localize($state__diagnostics.Found_1_error, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        }
        else {
            message = Message__from_diagnostics.Localize($state__diagnostics.Found_1_error_in_0, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(firstFileName)]));
        }
    }
    else {
        switch (numErroringFiles) {
            case 0: {
                message = Message__from_diagnostics.Localize($state__diagnostics.Found_0_errors, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(totalErrorCount)]));
                break;
            }
            case 1: {
                message = Message__from_diagnostics.Localize($state__diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(totalErrorCount), new GoInterfaceAdapter(firstFileName)]));
                break;
            }
            default: {
                message = Message__from_diagnostics.Localize($state__diagnostics.Found_0_errors_in_1_files, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(totalErrorCount), new $goInterfaceAdapter$int(numErroringFiles)]));
                break;
            }
        }
    }
    const __gotots_argument_51 = output;
    const __gotots_argument_52 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_51), __gotots_argument_52);
    const __gotots_argument_53 = output;
    const __gotots_argument_54 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(message)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_53), __gotots_argument_54);
    const __gotots_argument_55 = output;
    const __gotots_argument_56 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_55), __gotots_argument_56);
    const __gotots_argument_57 = output;
    const __gotots_argument_58 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_57), __gotots_argument_58);
    if (numErroringFiles > 1) {
        writeTabularErrorsDisplay(output, errorSummary, formatOpts);
        const __gotots_argument_59 = output;
        const __gotots_argument_60 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_59), __gotots_argument_60);
    }
}
export function getErrorSummary(diags: RuntimeSlice<Diagnostic | undefined>): ErrorSummary | undefined {
    let totalErrorCount = 0;
    let globalErrors = RuntimeSlice.nil<Diagnostic | undefined>();
    let errorsByFile: GoMapValue<FileLike | undefined, RuntimeSlice<Diagnostic | undefined>> = GoMap.nil();
    const __gotots_range_3 = diags;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
        let diagnostic: Diagnostic | undefined = __gotots_range_value_4;
        const __gotots_receiver_33 = diagnostic;
        if (!(goInterfaceNonNil<Diagnostic>(__gotots_receiver_33).Category() === CategoryError$constant__from_diagnostics())) {
            continue;
        }
        totalErrorCount++;
        const __gotots_receiver_34 = diagnostic;
        if (goInterfaceNonNil<Diagnostic>(__gotots_receiver_34).File() === undefined) {
            globalErrors = globalErrors.append(void 0, [diagnostic]);
        }
        else {
            if (errorsByFile.isNil()) {
                errorsByFile = GoMap.make(0, []);
            }
            const __gotots_store_0 = errorsByFile;
            const __gotots_receiver_35 = diagnostic;
            const __gotots_store_1 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_35).File();
            const __gotots_map_0 = errorsByFile;
            const __gotots_receiver_36 = diagnostic;
            const __gotots_map_1 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_36).File();
            const __gotots_argument_154 = __gotots_map_0.lookup(__gotots_map_1);
            const __gotots_argument_155 = diagnostic;
            __gotots_store_0.store(__gotots_store_1, __gotots_argument_154.append(void 0, [__gotots_argument_155]));
        }
    }
    let sortedFiles = SortedFunc$Named_diagnosticwriter$FileLike(Keys$MapOf_Named_diagnosticwriter$FileLike_To_SliceOf_Named_diagnosticwriter$Diagnostic$Named_diagnosticwriter$FileLike$SliceOf_Named_diagnosticwriter$Diagnostic(errorsByFile), (a: FileLike | undefined, b: FileLike | undefined): int => {
        const __gotots_receiver_37 = a;
        const __gotots_argument_156 = goInterfaceNonNil<FileLike>(__gotots_receiver_37).FileName();
        const __gotots_receiver_38 = b;
        const __gotots_argument_157 = goInterfaceNonNil<FileLike>(__gotots_receiver_38).FileName();
        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(__gotots_argument_156, __gotots_argument_157)));
    });
    return new ErrorSummary(totalErrorCount, globalErrors, errorsByFile, sortedFiles);
}
export function writeTabularErrorsDisplay(output: GoInterface | undefined, errorSummary: ErrorSummary | undefined, formatOpts: FormattingOptions | undefined): void {
    let sortedFiles = (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SortedFiles;
    let maxErrors = 0;
    const __gotots_range_4 = (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorsByFile;
    const __gotots_range_keys_0 = __gotots_range_4.keys();
    for (const __gotots_range_value_5 of __gotots_range_keys_0) {
        const __gotots_range_value_6 = __gotots_range_4.lookupOk(__gotots_range_value_5);
        if (!__gotots_range_value_6[1]) {
            continue;
        }
        const __gotots_range_value_7 = __gotots_range_value_6[0];
        let errorsForFile = __gotots_range_value_7;
        maxErrors = globalThis.Math.max(maxErrors, errorsForFile.length);
    }
    let headerRow = Message__from_diagnostics.Localize($state__diagnostics.Errors_Files, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    let leftColumnHeadingLength = strings__from_gostdlib.Split(headerRow, " ").get(0).length;
    let lengthOfBiggestErrorCount = strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(maxErrors))).length;
    let leftPaddingGoal = globalThis.Math.max(leftColumnHeadingLength, lengthOfBiggestErrorCount);
    let headerPadding = globalThis.Math.max(lengthOfBiggestErrorCount - leftColumnHeadingLength, 0);
    const __gotots_argument_162 = output;
    const __gotots_argument_163 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(headerPadding))))]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_162), __gotots_argument_163);
    const __gotots_argument_164 = output;
    const __gotots_argument_165 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(headerRow)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_164), __gotots_argument_165);
    const __gotots_argument_166 = output;
    const __gotots_argument_167 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_166), __gotots_argument_167);
    const __gotots_range_5 = sortedFiles;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
        const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_4);
        let file: FileLike | undefined = __gotots_range_value_8;
        let fileErrors = (errorSummary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorsByFile.lookup(file);
        let errorCount = fileErrors.length;
        const __gotots_argument_168 = output;
        const __gotots_argument_169 = "%*d  ";
        const __gotots_argument_170 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(leftPaddingGoal), new $goInterfaceAdapter$int(errorCount)]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_168), __gotots_argument_169, __gotots_argument_170);
        const __gotots_argument_171 = output;
        const __gotots_argument_172 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(prettyPathForFileError(file, fileErrors, formatOpts))]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_171), __gotots_argument_172);
        const __gotots_argument_173 = output;
        const __gotots_argument_174 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_173), __gotots_argument_174);
    }
}
export function prettyPathForFileError(file: FileLike | undefined, fileErrors: RuntimeSlice<Diagnostic | undefined>, formatOpts: FormattingOptions | undefined): gostring {
    if (file === undefined || fileErrors.length === 0) {
        return "";
    }
    const __gotots_argument_158 = file;
    const __gotots_receiver_39 = fileErrors.get(0);
    const __gotots_argument_159 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_39).Pos();
    let line = GetECMALineOfPosition__from_scanner(__gotots_argument_158, __gotots_argument_159);
    const __gotots_receiver_40 = file;
    let fileName = goInterfaceNonNil<FileLike>(__gotots_receiver_40).FileName();
    if (PathIsAbsolute__from_tspath(fileName) && PathIsAbsolute__from_tspath((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ComparePathsOptions.CurrentDirectory)) {
        const __gotots_receiver_41 = file;
        const __gotots_argument_160 = goInterfaceNonNil<FileLike>(__gotots_receiver_41).FileName();
        const __gotots_argument_161 = ComparePathsOptions__from_tspath.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ComparePathsOptions);
        fileName = ConvertToRelativePath__from_tspath(__gotots_argument_160, __gotots_argument_161);
    }
    return fmt__from_gostdlib.Sprintf("%s%s:%d%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(fileName), new GoInterfaceAdapter(foregroundColorEscapeGrey$string), new $goInterfaceAdapter$int(line + 1), new GoInterfaceAdapter(resetEscapeSequence$string)]));
}
export function WriteFormatDiagnostic(output: GoInterface | undefined, diagnostic: Diagnostic | undefined, formatOpts: FormattingOptions | undefined): void {
    const __gotots_receiver_18 = diagnostic;
    if (!(goInterfaceNonNil<Diagnostic>(__gotots_receiver_18).File() === undefined)) {
        const __gotots_receiver_19 = diagnostic;
        const __gotots_argument_39 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_19).File();
        const __gotots_receiver_20 = diagnostic;
        const __gotots_argument_40 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_20).Pos();
        const __gotots_results_0 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(__gotots_argument_39, __gotots_argument_40);
        let line = __gotots_results_0[0];
        let character = __gotots_results_0[1];
        const __gotots_receiver_21 = diagnostic;
        const __gotots_receiver_22 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_21).File();
        let fileName = goInterfaceNonNil<FileLike>(__gotots_receiver_22).FileName();
        let relativeFileName = ConvertToRelativePath__from_tspath(fileName, ComparePathsOptions__from_tspath.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ComparePathsOptions));
        const __gotots_argument_41 = output;
        const __gotots_argument_42 = "%s(%d,%d): ";
        const __gotots_argument_43 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(relativeFileName), new $goInterfaceAdapter$int(line + 1), new $goInterfaceAdapter$int(character.$value + 1)]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_41), __gotots_argument_42, __gotots_argument_43);
    }
    const __gotots_argument_46 = output;
    const __gotots_argument_47 = "%s TS%d: ";
    const __gotots_receiver_23 = diagnostic;
    const __gotots_argument_44 = new GoInterfaceAdapter(Category_Name__from_diagnostics(goInterfaceNonNil<Diagnostic>(__gotots_receiver_23).Category()));
    const __gotots_receiver_24 = diagnostic;
    const __gotots_argument_45 = new $goInterfaceAdapter$int32(goInterfaceNonNil<Diagnostic>(__gotots_receiver_24).Code());
    const __gotots_argument_48 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_44, __gotots_argument_45]);
    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_46), __gotots_argument_47, __gotots_argument_48);
    WriteFlattenedDiagnosticMessage(output, diagnostic, (formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale));
    const __gotots_argument_49 = output;
    const __gotots_argument_50 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_49), __gotots_argument_50);
}
export function FormatDiagnosticsStatusWithColorAndTime(output: GoInterface | undefined, time: gostring, diag: Diagnostic | undefined, formatOpts: FormattingOptions | undefined): void {
    const __gotots_argument_144 = output;
    const __gotots_argument_145 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("[")]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_144), __gotots_argument_145);
    writeWithStyleAndReset(output, time, foregroundColorEscapeGrey$string);
    const __gotots_argument_146 = output;
    const __gotots_argument_147 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("] ")]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_146), __gotots_argument_147);
    WriteFlattenedDiagnosticMessage(output, diag, (formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale));
}
export function FormatDiagnosticsStatusAndTime(output: GoInterface | undefined, time: gostring, diag: Diagnostic | undefined, formatOpts: FormattingOptions | undefined): void {
    const __gotots_argument_148 = output;
    const __gotots_argument_149 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time), new GoInterfaceAdapter(" - ")]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_148), __gotots_argument_149);
    WriteFlattenedDiagnosticMessage(output, diag, (formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewLine, Locale__from_locale.$copy((formatOpts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Locale));
}
export function TryClearScreen(output: GoInterface | undefined, diag: Diagnostic | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    let __gotots_logical_result_2 = !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveWatchOutput) && !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedDiagnostics) && !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics);
    if (__gotots_logical_result_2) {
        const __gotots_argument_150 = $state.ScreenStartingCodes;
        const __gotots_receiver_32 = diag;
        const __gotots_argument_151 = goInterfaceNonNil<Diagnostic>(__gotots_receiver_32).Code();
        __gotots_logical_result_2 = Contains$SliceOf_int32$int32(__gotots_argument_150, __gotots_argument_151);
    }
    if (__gotots_logical_result_2) {
        const __gotots_argument_152 = output;
        const __gotots_argument_153 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("\u001B[2J\u001B[3J\u001B[H")]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_152), __gotots_argument_153);
        return true;
    }
    return false;
}
