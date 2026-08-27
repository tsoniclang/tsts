import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { EmitTextWriter } from "./emittextwriter.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/state.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$singleLineStringWriter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function GetSingleLineStringWriter(): [
    EmitTextWriter | undefined,
    (() => void) | undefined
] {
    let w: {
        value: singleLineStringWriter;
    } | undefined = (($value: GoInterface | undefined): {
        value: singleLineStringWriter;
    } | undefined => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get($state.singleLineStringWriterPool));
    singleLineStringWriter.Clear(w);
    return [new GoInterfaceAdapter(w), (): void => {
            sync__from_gostdlib.Pool.Put($state.singleLineStringWriterPool, new GoInterfaceAdapter(w));
        }];
}
export class singleLineStringWriter {
    declare private readonly $goType: void;
    public constructor(public builder: strings__from_gostdlib.Builder, public lastWritten: gostring) {
    }
    static $copy($source: singleLineStringWriter): singleLineStringWriter {
        return new singleLineStringWriter(named_strings.StringsBuilderOperations.$copy($source.builder), $source.lastWritten);
    }
    declare private readonly then?: never;
    static Clear(w: {
        value: singleLineStringWriter;
    } | undefined): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = "";
        strings__from_gostdlib.Builder.Reset((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder);
    }
    static RawWrite(w: {
        value: singleLineStringWriter;
    } | undefined, s: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = s;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, s);
    }
    static Write(w: {
        value: singleLineStringWriter;
    } | undefined, s: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = s;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, s);
    }
    static WriteComment(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteKeyword(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteLine(w: {
        value: singleLineStringWriter;
    } | undefined): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = " ";
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, " ");
    }
    static WriteLineForce(w: {
        value: singleLineStringWriter;
    } | undefined, force: bool): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = " ";
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, " ");
    }
    static WriteLiteral(w: {
        value: singleLineStringWriter;
    } | undefined, s: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = s;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, s);
    }
    static WriteOperator(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteParameter(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteProperty(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WritePunctuation(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteSpace(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteStringLiteral(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteSymbol(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastWritten = text;
        strings__from_gostdlib.Builder.WriteString((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder, text);
    }
    static WriteTrailingSemicolon(w: {
        value: singleLineStringWriter;
    } | undefined, text: gostring): void {
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
        let w: singleLineStringWriter = singleLineStringWriter.$copy(this);
        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(w.builder)));
    }
    HasTrailingComment(): bool {
        return false;
    }
    HasTrailingWhitespace(): bool {
        let w: singleLineStringWriter = singleLineStringWriter.$copy(this);
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
    String(): gostring {
        let w: singleLineStringWriter = singleLineStringWriter.$copy(this);
        return strings__from_gostdlib.Builder.String(w.builder);
    }
}
