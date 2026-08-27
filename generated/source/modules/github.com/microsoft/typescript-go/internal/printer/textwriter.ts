import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TextPos as TextPos__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitTextWriter } from "./emittextwriter.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { ComputeECMALineStartsSeq as ComputeECMALineStartsSeq__from_core, UTF16Len as UTF16Len__from_core, UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$textWriter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class textWriter {
    declare private readonly $goType: void;
    public constructor(public newLine: gostring, public indentSize: int, public builder: strings__from_gostdlib.Builder, public lastWritten: gostring, public indent: int, public lineStart: bool, public lineCount: int, public linePos: int, public hasTrailingCommentState: bool) {
    }
    static $zero(): textWriter {
        return new textWriter("", 0, named_strings.StringsBuilderOperations.$zero(), "", 0, false, 0, 0, false);
    }
    static $copy($source: textWriter): textWriter {
        return new textWriter($source.newLine, $source.indentSize, named_strings.StringsBuilderOperations.$copy($source.builder), $source.lastWritten, $source.indent, $source.lineStart, $source.lineCount, $source.linePos, $source.hasTrailingCommentState);
    }
    declare private readonly then?: never;
    static Clear(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): void {
        void ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new textWriter(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.newLine, ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.indentSize, named_strings.StringsBuilderOperations.$zero(), "", 0, true, 0, 0, false));
    }
    static DecreaseIndent(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): void {
        const __gotots_store_0 = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value;
        __gotots_store_0.indent = __gotots_store_0.indent - 1;
    }
    static GetColumn(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): UTF16Offset__from_core {
        if (((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart) {
            return new UTF16Offset__from_core(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.indent * ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.indentSize);
        }
        return UTF16Len__from_core(goStringSlice(strings__from_gostdlib.Builder.String(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder), ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.linePos));
    }
    static GetIndent(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): int {
        return ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.indent;
    }
    static GetLine(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): int {
        return ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineCount;
    }
    static GetTextPos(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): int {
        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder)));
    }
    static Grow(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, n: int): void {
        strings__from_gostdlib.Builder.Grow(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder, BigInt.asIntN(64, goNumberToBigInt(n)));
    }
    static HasTrailingWhitespace(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): bool {
        if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder))) === 0) {
            return false;
        }
        const __gotots_results_0 = utf8__from_gostdlib.DecodeLastRuneInString(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lastWritten);
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
    static IncreaseIndent(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): void {
        const __gotots_store_1 = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value;
        __gotots_store_1.indent = __gotots_store_1.indent + 1;
    }
    static IsAtStartOfLine(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): bool {
        return ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart;
    }
    static RawWrite(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, s: gostring): void {
        if (s !== "") {
            strings__from_gostdlib.Builder.WriteString(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder, s);
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lastWritten = s;
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.hasTrailingCommentState = false;
        }
        textWriter.$go$private$printer$updateLineCountAndPosFor(w, s);
    }
    static String(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): gostring {
        return strings__from_gostdlib.Builder.String(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder);
    }
    static Write(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, s: gostring): void {
        if (s !== "") {
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.hasTrailingCommentState = false;
        }
        textWriter.$go$private$printer$writeText(w, s);
    }
    static WriteComment(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        if (text !== "") {
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.hasTrailingCommentState = true;
        }
        textWriter.$go$private$printer$writeText(w, text);
    }
    static WriteKeyword(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WriteLine(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): void {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart) {
            textWriter.$go$private$printer$writeLineRaw(w);
        }
    }
    static WriteLineForce(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, force: bool): void {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart || force) {
            textWriter.$go$private$printer$writeLineRaw(w);
        }
    }
    static WriteLiteral(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, s: gostring): void {
        textWriter.Write(w, s);
    }
    static WriteOperator(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WriteParameter(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WriteProperty(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WritePunctuation(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WriteSpace(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WriteStringLiteral(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static WriteSymbol(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        textWriter.Write(w, text);
    }
    static WriteTrailingSemicolon(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, text: gostring): void {
        textWriter.Write(w, text);
    }
    static $go$private$printer$updateLineCountAndPosFor(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, s: gostring): void {
        let count = 0;
        let lastLineStart = 0;
        const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(ComputeECMALineStartsSeq__from_core(s));
        if (__gotots_range_0 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_0(($argument0: TextPos__from_core): bool => {
            if (__gotots_range_state_0 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_0 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_0 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_0 = -1;
            const __gotots_range_value_0 = $argument0;
            let lineStart = __gotots_range_value_0;
            count++;
            lastLineStart = lineStart;
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        if (count > 1) {
            const __gotots_store_2 = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value;
            __gotots_store_2.lineCount = __gotots_store_2.lineCount + (count - 1);
            let curLen = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder)));
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.linePos = curLen - s.length + lastLineStart;
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart = (((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.linePos - curLen) === 0;
            return;
        }
        ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart = false;
    }
    static $go$private$printer$writeLineRaw(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined): void {
        strings__from_gostdlib.Builder.WriteString(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder, ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.newLine);
        ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lastWritten = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.newLine;
        const __gotots_store_3 = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value;
        __gotots_store_3.lineCount = __gotots_store_3.lineCount + 1;
        ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.linePos = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder)));
        ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart = true;
        ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.hasTrailingCommentState = false;
    }
    static $go$private$printer$writeText(w: tsonicTypeScriptRuntime.Location<textWriter> | undefined, s: gostring): void {
        if (s !== "") {
            if (((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart) {
                strings__from_gostdlib.Builder.WriteString(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder, getIndentString(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.indent, ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.indentSize));
                ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lineStart = false;
            }
            strings__from_gostdlib.Builder.WriteString(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.builder, s);
            ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<textWriter>).value.lastWritten = s;
            textWriter.$go$private$printer$updateLineCountAndPosFor(w, s);
        }
    }
    HasTrailingComment(): bool {
        return this.hasTrailingCommentState;
    }
}
export const defaultIndentSize$int: int = 4;
export function GetDefaultIndentSize(): int {
    return defaultIndentSize$int;
}
export function getIndentString(indent: int, indentSize: int): gostring {
    if (indent === 0) {
        return "";
    }
    return strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(indent * indentSize)));
}
export function NewTextWriter(newLine: gostring, indentSize: int): EmitTextWriter | undefined {
    if (indentSize <= 0) {
        indentSize = 4;
    }
    let w = textWriter.$zero();
    const w$location = tsonicTypeScriptRuntime.boundLocation({}, () => w, w$next => w = w$next);
    w.newLine = newLine;
    w.indentSize = indentSize;
    textWriter.Clear(w$location);
    return new GoInterfaceAdapter(w$location);
}
