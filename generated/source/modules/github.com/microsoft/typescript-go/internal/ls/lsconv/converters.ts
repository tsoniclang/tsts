import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ScriptKind as ScriptKind__from_core, TextPos as TextPos__from_core, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { DiagnosticSeverity as DiagnosticSeverity__from_lsproto, DiagnosticTag as DiagnosticTag__from_lsproto, LanguageKind as LanguageKind__from_lsproto, PositionEncodingKind as PositionEncodingKind__from_lsproto, Position$Storage as Position__from_lsproto$Storage, Range$Storage as Range__from_lsproto$Storage, ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto, TextDocumentContentChangePartial as TextDocumentContentChangePartial__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { LSPLineMap } from "./linemap.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, int32, uint32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { Diagnostic as Diagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { IsBundled as IsBundled__from_bundled } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/package.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewTextRange as NewTextRange__from_core, ScriptKindJS$constant as ScriptKindJS$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, ScriptKindTS$constant as ScriptKindTS$constant__from_core, ScriptKindTSX$constant as ScriptKindTSX$constant__from_core, ScriptKindUnknown$constant as ScriptKindUnknown$constant__from_core, TextChange as TextChange__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { CategoryMessage$constant as CategoryMessage$constant__from_diagnostics, CategorySuggestion$constant as CategorySuggestion$constant__from_diagnostics, CategoryWarning$constant as CategoryWarning$constant__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { WriteFlattenedASTDiagnosticMessage as WriteFlattenedASTDiagnosticMessage__from_diagnosticwriter } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnosticwriter/package.js";
import { FromContext as FromContext__from_locale, Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/state.js";
import { DiagnosticRelatedInformation as DiagnosticRelatedInformation__from_lsproto, DiagnosticSeverityError$constant as DiagnosticSeverityError$constant__from_lsproto, DiagnosticSeverityHint$constant as DiagnosticSeverityHint$constant__from_lsproto, DiagnosticSeverityInformation$constant as DiagnosticSeverityInformation$constant__from_lsproto, DiagnosticSeverityWarning$constant as DiagnosticSeverityWarning$constant__from_lsproto, DiagnosticTagDeprecated$constant as DiagnosticTagDeprecated$constant__from_lsproto, DiagnosticTagUnnecessary$constant as DiagnosticTagUnnecessary$constant__from_lsproto, Diagnostic as Diagnostic__from_lsproto, DocumentUri as DocumentUri__from_lsproto, GetClientCapabilities as GetClientCapabilities__from_lsproto, IntegerOrString as IntegerOrString__from_lsproto, Location as Location__from_lsproto, PositionEncodingKindUTF8$constant as PositionEncodingKindUTF8$constant__from_lsproto, Position as Position__from_lsproto, Range as Range__from_lsproto, ResolvedDiagnosticClientCapabilities as ResolvedDiagnosticClientCapabilities__from_lsproto, ResolvedPublishDiagnosticsClientCapabilities as ResolvedPublishDiagnosticsClientCapabilities__from_lsproto, StringOrMarkupContent as StringOrMarkupContent__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { IsDynamicFileName as IsDynamicFileName__from_tspath, SplitVolumePath as SplitVolumePath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { ptrToSliceIfNonEmpty$Named_lsproto$DiagnosticTag, ptrToSliceIfNonEmpty$PointerTo_Named_lsproto$DiagnosticRelatedInformation } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/lsconv/ptrToSliceIfNonEmpty.js";
import { BinarySearch$Named_lsconv$LSPLineStarts$Named_core$TextPos } from "../../../../../../../support/generics/concretizations/slices/BinarySearch.js";
import { Contains$SliceOf_Named_lsproto$DiagnosticTag$Named_lsproto$DiagnosticTag } from "../../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$int32, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Text$void_to_string } from "../../../../../../../support/interface-methods.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as url__from_gostdlib from "@gotots/gostdlib/net/url.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringSlice } from "@gotots/runtime/string.js";
export class Converters {
    declare private readonly $goType: void;
    public constructor(public getLineMap: (($0: gostring) => {
        value: LSPLineMap;
    } | undefined) | undefined, public positionEncoding: PositionEncodingKind__from_lsproto) {
    }
    static $copy($source: Converters): Converters {
        return new Converters($source.getLineMap, $source.positionEncoding);
    }
    declare private readonly then?: never;
    static FromLSPRange(c: {
        value: Converters;
    } | undefined, script: Script | undefined, textRange: Range__from_lsproto): TextRange__from_core {
        return NewTextRange__from_core(Converters.LineAndCharacterToPosition(c, script, Position__from_lsproto.$copy(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf(textRange).Start))), Converters.LineAndCharacterToPosition(c, script, Position__from_lsproto.$copy(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf(textRange).End))));
    }
    static FromLSPTextChange(c: {
        value: Converters;
    } | undefined, script: Script | undefined, change: {
        value: TextDocumentContentChangePartial__from_lsproto;
    } | undefined): TextChange__from_core {
        return TextChange__from_core.$fromStorage({
            TextRange: TextRange__from_core.$storageOf(Converters.FromLSPRange(c, script, Range__from_lsproto.$copy((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range))),
            NewText: (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Text
        });
    }
    static LineAndCharacterToPosition(c: {
        value: Converters;
    } | undefined, script: Script | undefined, lineAndCharacter: Position__from_lsproto): TextPos__from_core {
        const __gotots_callee_1: Converters["getLineMap"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getLineMap;
        const __gotots_receiver_5 = script;
        const __gotots_argument_7 = goInterfaceNonNil<Script>(__gotots_receiver_5).FileName();
        let lineMap: {
            value: LSPLineMap;
        } | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
        let line = Position__from_lsproto.$storageOf(lineAndCharacter).Line | 0;
        let char = Position__from_lsproto.$storageOf(lineAndCharacter).Character | 0;
        const __gotots_receiver_6 = script;
        let textLen = goInterfaceNonNil<Script>(__gotots_receiver_6).Text().length | 0;
        if (line >= (lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts.$value.length) {
            return textLen;
        }
        let start = (lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts.$value.get(line);
        let lineEnd = 0;
        if (line + 1 < (lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts.$value.length) {
            lineEnd = (lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts.$value.get(line + 1);
        }
        else {
            lineEnd = textLen;
        }
        if ((lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AsciiOnly || (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding.$value === PositionEncodingKindUTF8$constant__from_lsproto().$value) {
            return globalThis.Math.max(start, globalThis.Math.min(start + char, lineEnd));
        }
        let utf16Char = 0;
        let pos = start;
        let end = lineEnd;
        const __gotots_receiver_7 = script;
        let text = goInterfaceNonNil<Script>(__gotots_receiver_7).Text();
        for (; pos < end;) {
            const __gotots_results_6 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
            const __gotots_results_7 = [__gotots_results_6[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_6[1]))] satisfies [
                int32,
                int
            ];
            let r = __gotots_results_7[0];
            let size = __gotots_results_7[1];
            let u16Len = globalThis.Number(BigInt.asIntN(64, utf16__from_gostdlib.RuneLen(r))) | 0;
            if (utf16Char + u16Len > char) {
                break;
            }
            utf16Char = utf16Char + u16Len;
            pos += size;
        }
        return pos | 0;
    }
    static PositionToLineAndCharacter(c: {
        value: Converters;
    } | undefined, script: Script | undefined, position: TextPos__from_core): Position__from_lsproto {
        const __gotots_argument_4 = 0;
        const __gotots_argument_2 = position;
        const __gotots_receiver_2 = script;
        const __gotots_argument_3 = goInterfaceNonNil<Script>(__gotots_receiver_2).Text().length | 0;
        const __gotots_argument_5 = globalThis.Math.min(__gotots_argument_2, __gotots_argument_3);
        position = globalThis.Math.max(__gotots_argument_4, __gotots_argument_5);
        const __gotots_callee_0: Converters["getLineMap"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getLineMap;
        const __gotots_receiver_3 = script;
        const __gotots_argument_6 = goInterfaceNonNil<Script>(__gotots_receiver_3).FileName();
        let lineMap: {
            value: LSPLineMap;
        } | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
        const __gotots_results_5 = BinarySearch$Named_lsconv$LSPLineStarts$Named_core$TextPos((lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts, position);
        let line = __gotots_results_5[0];
        let isLineStart = __gotots_results_5[1];
        if (!isLineStart) {
            line--;
        }
        line = globalThis.Math.max(0, globalThis.Math.min(line, (lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts.$value.length - 1));
        let start = (lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LineStarts.$value.get(line);
        let character = 0;
        if ((lineMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AsciiOnly || (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding.$value === PositionEncodingKindUTF8$constant__from_lsproto().$value) {
            character = position - start;
        }
        else {
            const __gotots_receiver_4 = script;
            const __gotots_slice_operand_0 = goInterfaceNonNil<Script>(__gotots_receiver_4).Text();
            const __gotots_slice_operand_1 = start;
            const __gotots_slice_operand_2 = position;
            const __gotots_range_1 = goStringSlice(__gotots_slice_operand_0, __gotots_slice_operand_1, __gotots_slice_operand_2);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length;) {
                const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_1, __gotots_range_index_1);
                const __gotots_range_value_2 = __gotots_range_decode_0[0];
                let r = __gotots_range_value_2;
                __gotots_range_index_1 += __gotots_range_decode_0[1];
                character = character + (globalThis.Number(BigInt.asIntN(64, utf16__from_gostdlib.RuneLen(r))) | 0);
            }
        }
        return Position__from_lsproto.$fromStorage({
            Line: line >>> 0,
            Character: character >>> 0
        });
    }
    static ToLSPLocation(c: {
        value: Converters;
    } | undefined, script: Script | undefined, rng: TextRange__from_core): Location__from_lsproto {
        const __gotots_receiver_8 = script;
        const __gotots_argument_8 = goInterfaceNonNil<Script>(__gotots_receiver_8).FileName();
        const __gotots_field_0 = FileNameToDocumentURI(__gotots_argument_8).$value;
        return Location__from_lsproto.$fromStorage({
            Uri: __gotots_field_0,
            Range: Range__from_lsproto.$storageOf(Converters.ToLSPRange(c, script, TextRange__from_core.$copy(rng)))
        });
    }
    static ToLSPRange(c: {
        value: Converters;
    } | undefined, script: Script | undefined, textRange: TextRange__from_core): Range__from_lsproto {
        return Range__from_lsproto.$fromStorage({
            Start: Position__from_lsproto.$storageOf(Converters.PositionToLineAndCharacter(c, script, textRange.Pos() | 0)),
            End: Position__from_lsproto.$storageOf(Converters.PositionToLineAndCharacter(c, script, textRange.End() | 0))
        });
    }
}
export interface Script extends GoInterfaceValue {
    FileName(): gostring;
    Text(): gostring;
}
export const Script$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Text$void_to_string]);
export function Script$is(value: GoInterfaceValue | undefined): value is Script {
    return value !== undefined && value.$go$implements(Script$contract);
}
export function NewConverters(positionEncoding: PositionEncodingKind__from_lsproto, getLineMap: (($0: gostring) => {
    value: LSPLineMap;
} | undefined) | undefined): {
    value: Converters;
} | undefined {
    return { value: new Converters(getLineMap, positionEncoding) };
}
export function LanguageKindToScriptKind(languageID: LanguageKind__from_lsproto): ScriptKind__from_core {
    switch (languageID.$value) {
        case "typescript": {
            return ScriptKindTS$constant__from_core();
            break;
        }
        case "typescriptreact": {
            return ScriptKindTSX$constant__from_core();
            break;
        }
        case "javascript": {
            return ScriptKindJS$constant__from_core();
            break;
        }
        case "javascriptreact": {
            return ScriptKindJSX$constant__from_core();
            break;
        }
        case "json": {
            return ScriptKindJSON$constant__from_core();
            break;
        }
        default: {
            return ScriptKindUnknown$constant__from_core();
            break;
        }
    }
}
export function FileNameToDocumentURI(fileName: gostring): DocumentUri__from_lsproto {
    if (IsBundled__from_bundled(fileName)) {
        return new DocumentUri__from_lsproto(fileName);
    }
    if (IsDynamicFileName__from_tspath(fileName)) {
        const __gotots_results_1 = strings__from_gostdlib.Cut(goStringSlice(fileName, 2), "/");
        let scheme = __gotots_results_1[0];
        let rest = __gotots_results_1[1];
        let ok = __gotots_results_1[2];
        if (!ok) {
            const __gotots_argument_0 = new GoInterfaceAdapter("invalid file name: " + fileName);
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        const __gotots_results_3 = strings__from_gostdlib.Cut(rest, "/");
        let authority = __gotots_results_3[0];
        let path = __gotots_results_3[1];
        ok = __gotots_results_3[2];
        if (!ok) {
            const __gotots_argument_1 = new GoInterfaceAdapter("invalid file name: " + fileName);
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        if (authority === "ts-nul-authority") {
            return new DocumentUri__from_lsproto(scheme + ":" + path);
        }
        return new DocumentUri__from_lsproto(scheme + "://" + authority + "/" + path);
    }
    const __gotots_results_4 = SplitVolumePath__from_tspath(fileName);
    let volume = __gotots_results_4[0];
    fileName = __gotots_results_4[1];
    if (volume !== "") {
        const __gotots_binary_operand_0 = "/";
        const __gotots_receiver_0 = $state.extraEscapeReplacer;
        const __gotots_binary_operand_1 = strings__from_gostdlib.Replacer.Replace(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Replacer>).value, volume);
        volume = __gotots_binary_operand_0 + __gotots_binary_operand_1;
    }
    fileName = strings__from_gostdlib.TrimPrefix(fileName, "//");
    let parts = strings__from_gostdlib.Split(fileName, "/");
    const __gotots_range_0 = parts;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let part = __gotots_range_value_1;
        const __gotots_store_0 = parts;
        const __gotots_store_1 = i;
        const __gotots_receiver_1 = $state.extraEscapeReplacer;
        __gotots_store_0.set(__gotots_store_1, strings__from_gostdlib.Replacer.Replace(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Replacer>).value, url__from_gostdlib.PathEscape(part)));
    }
    return new DocumentUri__from_lsproto("file://" + volume + strings__from_gostdlib.Join(parts, "/"));
}
export class diagnosticOptions {
    declare private readonly $goType: void;
    public constructor(public reportStyleChecksAsWarnings: bool, public relatedInformation: bool, public tagValueSet: RuntimeSlice<DiagnosticTag__from_lsproto>, public visualStudio: bool) {
    }
    declare private readonly then?: never;
}
export function DiagnosticToLSPPull(ctx: GoInterface | undefined, converters: {
    value: Converters;
} | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, reportStyleChecksAsWarnings: bool): {
    value: Diagnostic__from_lsproto;
} | undefined {
    let clientCaps: tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto> | undefined = GetClientCapabilities__from_lsproto(ctx);
    let clientDiagnosticCaps = ResolvedDiagnosticClientCapabilities__from_lsproto.$copy(((clientCaps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Diagnostic);
    return diagnosticToLSP(ctx, converters, diagnostic, new diagnosticOptions(reportStyleChecksAsWarnings, clientDiagnosticCaps.RelatedInformation, clientDiagnosticCaps.TagSupport.ValueSet, ((clientCaps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.VSSupportsVisualStudioExtensions));
}
export function DiagnosticToLSPPush(ctx: GoInterface | undefined, converters: {
    value: Converters;
} | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): {
    value: Diagnostic__from_lsproto;
} | undefined {
    let clientCaps: tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto> | undefined = GetClientCapabilities__from_lsproto(ctx);
    let clientDiagnosticCaps = ResolvedPublishDiagnosticsClientCapabilities__from_lsproto.$copy(((clientCaps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.PublishDiagnostics);
    return diagnosticToLSP(ctx, converters, diagnostic, new diagnosticOptions(false, clientDiagnosticCaps.RelatedInformation, clientDiagnosticCaps.TagSupport.ValueSet, ((clientCaps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.VSSupportsVisualStudioExtensions));
}
export function diagnosticToLSP(ctx: GoInterface | undefined, converters: {
    value: Converters;
} | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, opts: diagnosticOptions): {
    value: Diagnostic__from_lsproto;
} | undefined {
    let locale__shadow_1 = FromContext__from_locale(ctx);
    let severity = 0;
    const severity$location = tsonicTypeScriptRuntime.boundLocation({}, () => severity, severity$next => severity = severity$next);
    switch (Diagnostic__from_ast.Category(diagnostic)) {
        case CategorySuggestion$constant__from_diagnostics(): {
            severity = DiagnosticSeverityHint$constant__from_lsproto();
            break;
        }
        case CategoryMessage$constant__from_diagnostics(): {
            severity = DiagnosticSeverityInformation$constant__from_lsproto();
            break;
        }
        case CategoryWarning$constant__from_diagnostics(): {
            severity = DiagnosticSeverityWarning$constant__from_lsproto();
            break;
        }
        default: {
            severity = DiagnosticSeverityError$constant__from_lsproto();
            break;
        }
    }
    if (opts.reportStyleChecksAsWarnings && severity === DiagnosticSeverityError$constant__from_lsproto() && Set__from_collections.Has<int32>($state.styleCheckDiagnostics, Diagnostic__from_ast.Code(diagnostic))) {
        severity = DiagnosticSeverityWarning$constant__from_lsproto();
    }
    let relatedInformation = RuntimeSlice.nil<{
        value: DiagnosticRelatedInformation__from_lsproto;
    } | undefined>();
    if (opts.relatedInformation) {
        relatedInformation = RuntimeSlice.make<{
            value: DiagnosticRelatedInformation__from_lsproto;
        } | undefined>(0, Diagnostic__from_ast.RelatedInformation(diagnostic).length, void 0);
        const __gotots_range_2 = Diagnostic__from_ast.RelatedInformation(diagnostic);
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
            let related: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_3;
            relatedInformation = relatedInformation.append(void 0, [
                { value: new DiagnosticRelatedInformation__from_lsproto(Location__from_lsproto.$fromStorage({
                        Uri: FileNameToDocumentURI(SourceFile__from_ast.FileName(Diagnostic__from_ast.File(related))).$value,
                        Range: Range__from_lsproto.$storageOf(Converters.ToLSPRange(converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(Diagnostic__from_ast.File(related)), Diagnostic__from_ast.Loc(related)))
                    }), Diagnostic__from_ast.Localize(related, Locale__from_locale.$copy(locale__shadow_1))) },
            ]);
        }
    }
    let tags = RuntimeSlice.nil<DiagnosticTag__from_lsproto>();
    if (opts.tagValueSet.length > 0 && (Diagnostic__from_ast.ReportsUnnecessary(diagnostic) || Diagnostic__from_ast.ReportsDeprecated(diagnostic))) {
        tags = RuntimeSlice.make<DiagnosticTag__from_lsproto>(0, 2, 0);
        if (Diagnostic__from_ast.ReportsUnnecessary(diagnostic) && Contains$SliceOf_Named_lsproto$DiagnosticTag$Named_lsproto$DiagnosticTag(opts.tagValueSet, DiagnosticTagUnnecessary$constant__from_lsproto())) {
            tags = tags.append(0, [DiagnosticTagUnnecessary$constant__from_lsproto()]);
        }
        if (Diagnostic__from_ast.ReportsDeprecated(diagnostic) && Contains$SliceOf_Named_lsproto$DiagnosticTag$Named_lsproto$DiagnosticTag(opts.tagValueSet, DiagnosticTagDeprecated$constant__from_lsproto())) {
            tags = tags.append(0, [DiagnosticTagDeprecated$constant__from_lsproto()]);
        }
    }
    let lspRange = Range__from_lsproto.$zero();
    if (!(Diagnostic__from_ast.File(diagnostic) === undefined)) {
        lspRange = Converters.ToLSPRange(converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(Diagnostic__from_ast.File(diagnostic)), Diagnostic__from_ast.Loc(diagnostic));
    }
    let code: tsonicTypeScriptRuntime.Location<IntegerOrString__from_lsproto> | undefined = void 0;
    let source: tsonicTypeScriptRuntime.Location<gostring> | undefined = void 0;
    if (opts.visualStudio) {
        code =
            tsonicTypeScriptRuntime.location<IntegerOrString__from_lsproto>(new IntegerOrString__from_lsproto(void 0, tsonicTypeScriptRuntime.location<gostring>(fmt__from_gostdlib.Sprintf("TS%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(Diagnostic__from_ast.Code(diagnostic))])))));
    }
    else {
        code =
            tsonicTypeScriptRuntime.location<IntegerOrString__from_lsproto>(new IntegerOrString__from_lsproto(tsonicTypeScriptRuntime.location<int32>(Diagnostic__from_ast.Code(diagnostic)), void 0));
        source =
            tsonicTypeScriptRuntime.location<gostring>("ts");
    }
    return { value: new Diagnostic__from_lsproto(Range__from_lsproto.$copy(lspRange), severity$location, code, void 0, source, new StringOrMarkupContent__from_lsproto(tsonicTypeScriptRuntime.location<gostring>(messageChainToString(diagnostic, Locale__from_locale.$copy(locale__shadow_1))), void 0), ptrToSliceIfNonEmpty$Named_lsproto$DiagnosticTag(tags), ptrToSliceIfNonEmpty$PointerTo_Named_lsproto$DiagnosticRelatedInformation(relatedInformation), void 0) };
}
export function messageChainToString(diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, locale__shadow_1: Locale__from_locale): gostring {
    if (Diagnostic__from_ast.MessageChain(diagnostic).length === 0) {
        return Diagnostic__from_ast.Localize(diagnostic, Locale__from_locale.$copy(locale__shadow_1));
    }
    let b = named_strings.StringsBuilderOperations.$zero();
    const b$location = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next => b = b$next);
    WriteFlattenedASTDiagnosticMessage__from_diagnosticwriter(new $goInterfaceAdapter$PointerTo_Named_strings$Builder(b$location), diagnostic, "\n", Locale__from_locale.$copy(locale__shadow_1));
    return strings__from_gostdlib.Builder.String(b);
}
export function ptrToSliceIfNonEmpty$kernel<T>($go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, s: RuntimeSlice<GoContainerStorage<T>>): tsonicTypeScriptRuntime.Location<RuntimeSlice<GoContainerStorage<T>>> | undefined {
    const s$location = tsonicTypeScriptRuntime.boundLocation({}, () => s, s$next => s = s$next);
    if ($go$length$SliceOf_T0_to_int(s) === 0) {
        return void 0;
    }
    return s$location;
}
