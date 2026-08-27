import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ClassificationTypeName as ClassificationTypeName__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { KindParameter$constant as KindParameter$constant__from_ast, Node as Node__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsEnum$constant as SymbolFlagsEnum$constant__from_ast, SymbolFlagsEnumMember$constant as SymbolFlagsEnumMember$constant__from_ast, SymbolFlagsFunction$constant as SymbolFlagsFunction$constant__from_ast, SymbolFlagsGetAccessor$constant as SymbolFlagsGetAccessor$constant__from_ast, SymbolFlagsInterface$constant as SymbolFlagsInterface$constant__from_ast, SymbolFlagsMethod$constant as SymbolFlagsMethod$constant__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, SymbolFlagsProperty$constant as SymbolFlagsProperty$constant__from_ast, SymbolFlagsSetAccessor$constant as SymbolFlagsSetAccessor$constant__from_ast, SymbolFlagsTypeAlias$constant as SymbolFlagsTypeAlias$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolFlagsVariable$constant as SymbolFlagsVariable$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ClassificationTypeNameClassName$constant as ClassificationTypeNameClassName$constant__from_lsproto, ClassificationTypeNameEnumName$constant as ClassificationTypeNameEnumName$constant__from_lsproto, ClassificationTypeNameFieldName$constant as ClassificationTypeNameFieldName$constant__from_lsproto, ClassificationTypeNameIdentifier$constant as ClassificationTypeNameIdentifier$constant__from_lsproto, ClassificationTypeNameInterfaceName$constant as ClassificationTypeNameInterfaceName$constant__from_lsproto, ClassificationTypeNameKeyword$constant as ClassificationTypeNameKeyword$constant__from_lsproto, ClassificationTypeNameLocalName$constant as ClassificationTypeNameLocalName$constant__from_lsproto, ClassificationTypeNameMethodName$constant as ClassificationTypeNameMethodName$constant__from_lsproto, ClassificationTypeNameModuleName$constant as ClassificationTypeNameModuleName$constant__from_lsproto, ClassificationTypeNameOperator$constant as ClassificationTypeNameOperator$constant__from_lsproto, ClassificationTypeNameParameterName$constant as ClassificationTypeNameParameterName$constant__from_lsproto, ClassificationTypeNamePropertyName$constant as ClassificationTypeNamePropertyName$constant__from_lsproto, ClassificationTypeNamePunctuation$constant as ClassificationTypeNamePunctuation$constant__from_lsproto, ClassificationTypeNameString$constant as ClassificationTypeNameString$constant__from_lsproto, ClassificationTypeNameText$constant as ClassificationTypeNameText$constant__from_lsproto, ClassificationTypeNameTypeParameterName$constant as ClassificationTypeNameTypeParameterName$constant__from_lsproto, ClassificationTypeNameWhiteSpace$constant as ClassificationTypeNameWhiteSpace$constant__from_lsproto, StringLiteralClassifiedTextRun as StringLiteralClassifiedTextRun__from_lsproto, VSClassifiedTextRun as VSClassifiedTextRun__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class displayPartsWriter {
    declare private readonly $goType: void;
    public constructor(public builder: strings__from_gostdlib.Builder, public runs: RuntimeSlice<{
        value: VSClassifiedTextRun__from_lsproto;
    } | undefined>, public vsCapability: bool, public lastWritten: gostring) {
    }
    static $copy($source: displayPartsWriter): displayPartsWriter {
        return new displayPartsWriter(named_strings.StringsBuilderOperations.$copy($source.builder), $source.runs, $source.vsCapability, $source.lastWritten);
    }
    declare private readonly then?: never;
    static Clear(w: {
        value: displayPartsWriter;
    } | undefined): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = "";
        strings__from_gostdlib.Builder.Reset((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.runs = RuntimeSlice.nil<{
            value: VSClassifiedTextRun__from_lsproto;
        } | undefined>();
    }
    static GetRuns(w: {
        value: displayPartsWriter;
    } | undefined): RuntimeSlice<{
        value: VSClassifiedTextRun__from_lsproto;
    } | undefined> {
        return (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.runs;
    }
    static RawWrite(w: {
        value: displayPartsWriter;
    } | undefined, s: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameText$constant__from_lsproto(), s);
    }
    static String(w: {
        value: displayPartsWriter;
    } | undefined): gostring {
        return strings__from_gostdlib.Builder.String((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder);
    }
    static Write(w: {
        value: displayPartsWriter;
    } | undefined, s: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameText$constant__from_lsproto(), s);
    }
    static WriteClassified(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring, classification: ClassificationTypeName__from_lsproto): void {
        displayPartsWriter.$go$private$ls$addRun(w, classification, text);
    }
    static WriteComment(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameText$constant__from_lsproto(), text);
    }
    static WriteFrom(w: {
        value: displayPartsWriter;
    } | undefined, other: {
        value: displayPartsWriter;
    } | undefined): void {
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, displayPartsWriter.String(other));
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.vsCapability) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.runs = goSliceAppendSlice<{
                value: VSClassifiedTextRun__from_lsproto;
            } | undefined>((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.runs, displayPartsWriter.GetRuns(other), void 0);
        }
        if ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten !== "") {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten;
        }
    }
    static WriteKeyword(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameKeyword$constant__from_lsproto(), text);
    }
    static WriteLine(w: {
        value: displayPartsWriter;
    } | undefined): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameWhiteSpace$constant__from_lsproto(), " ");
    }
    static WriteLineForce(w: {
        value: displayPartsWriter;
    } | undefined, force: bool): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameWhiteSpace$constant__from_lsproto(), " ");
    }
    static WriteLiteral(w: {
        value: displayPartsWriter;
    } | undefined, s: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameString$constant__from_lsproto(), s);
    }
    static WriteOperator(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameOperator$constant__from_lsproto(), text);
    }
    static WriteParameter(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameParameterName$constant__from_lsproto(), text);
    }
    static WriteProperty(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNamePropertyName$constant__from_lsproto(), text);
    }
    static WritePunctuation(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNamePunctuation$constant__from_lsproto(), text);
    }
    static WriteSpace(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameWhiteSpace$constant__from_lsproto(), text);
    }
    static WriteStringLiteral(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNameString$constant__from_lsproto(), text);
    }
    static WriteSymbol(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        let classification = classificationForSymbol(__go_symbol);
        displayPartsWriter.$go$private$ls$addRun(w, classification, text);
    }
    static WriteTrailingSemicolon(w: {
        value: displayPartsWriter;
    } | undefined, text: gostring): void {
        displayPartsWriter.$go$private$ls$addRun(w, ClassificationTypeNamePunctuation$constant__from_lsproto(), text);
    }
    static $go$private$ls$addRun(w: {
        value: displayPartsWriter;
    } | undefined, classification: ClassificationTypeName__from_lsproto, text: gostring): void {
        if (text === "") {
            return;
        }
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.vsCapability) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.runs = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.runs.append(void 0, [
                { value: new VSClassifiedTextRun__from_lsproto(classification.$value, text, void 0, 0, StringLiteralClassifiedTextRun__from_lsproto.$zero()) },
            ]);
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    DecreaseIndent(): void {
    }
    GetColumn(): UTF16Offset__from_core {
        return new UTF16Offset__from_core(0);
    }
    GetIndent(): int {
        return 0;
    }
    GetLine(): int {
        return 0;
    }
    GetTextPos(): int {
        let w: displayPartsWriter = displayPartsWriter.$copy(this);
        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(w.builder)));
    }
    HasTrailingComment(): bool {
        return false;
    }
    HasTrailingWhitespace(): bool {
        let w: displayPartsWriter = displayPartsWriter.$copy(this);
        if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(w.builder))) === 0) {
            return false;
        }
        const __gotots_results_0 = utf8__from_gostdlib.DecodeLastRuneInString(w.lastWritten);
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_1[0];
        if (ch === RuneError$int32__from_utf8) {
            return false;
        }
        return IsWhiteSpaceLike__from_stringutil(ch);
    }
    IncreaseIndent(): void {
    }
    IsAtStartOfLine(): bool {
        return false;
    }
}
export function newDisplayPartsWriter(vsCapability: bool): {
    value: displayPartsWriter;
} | undefined {
    return { value: new displayPartsWriter(named_strings.StringsBuilderOperations.$zero(), RuntimeSlice.nil<{
            value: VSClassifiedTextRun__from_lsproto;
        } | undefined>(), vsCapability, "") };
}
export function classificationForSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): ClassificationTypeName__from_lsproto {
    if (__go_symbol === undefined) {
        return ClassificationTypeNameText$constant__from_lsproto();
    }
    let flags = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags;
    __gotots_control_target_0: {
        if (!((flags & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0)) {
            if (isFirstDeclarationOfSymbolParameter(__go_symbol)) {
                return ClassificationTypeNameParameterName$constant__from_lsproto();
            }
            return ClassificationTypeNameLocalName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsProperty$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNamePropertyName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsGetAccessor$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNamePropertyName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsSetAccessor$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNamePropertyName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsEnumMember$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameFieldName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsFunction$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameMethodName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameClassName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsInterface$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameInterfaceName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameEnumName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameModuleName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsMethod$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameMethodName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameTypeParameterName$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsTypeAlias$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameIdentifier$constant__from_lsproto();
        }
        else if (!((flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
            return ClassificationTypeNameIdentifier$constant__from_lsproto();
        }
        else {
            return ClassificationTypeNameText$constant__from_lsproto();
        }
    }
}
export function isFirstDeclarationOfSymbolParameter(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    let declarations = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    if (declarations.length === 0) {
        return false;
    }
    return Node__from_ast.$storageOf(((declarations.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast();
}
