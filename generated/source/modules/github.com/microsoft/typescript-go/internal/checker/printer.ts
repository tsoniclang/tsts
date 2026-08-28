import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Flags as Flags__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { EmitContext as EmitContext__from_printer, EmitTextWriter as EmitTextWriter__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TypeFormatFlags } from "./types.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { $goInterfaceAdapter$PointerTo_Named_checker$semicolonRemoverWriter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { TypeFormatFlagsNodeBuilderFlagsMask$constant } from "./types.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function createPrinterWithDefaults(emitContext: {
    value: EmitContext__from_printer;
} | undefined): Printer__from_printer | undefined {
    return NewPrinter__from_printer(new PrinterOptions__from_printer(false, 0, false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
}
export function createPrinterWithRemoveComments(emitContext: {
    value: EmitContext__from_printer;
} | undefined): Printer__from_printer | undefined {
    return NewPrinter__from_printer(new PrinterOptions__from_printer(true, 0, false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
}
export function createPrinterWithRemoveCommentsOmitTrailingSemicolonNeverAsciiEscape(emitContext: {
    value: EmitContext__from_printer;
} | undefined): Printer__from_printer | undefined {
    return NewPrinter__from_printer(new PrinterOptions__from_printer(true, 0, false, 0, false, false, false, false, false, true, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
}
export function createPrinterWithRemoveCommentsNeverAsciiEscape(emitContext: {
    value: EmitContext__from_printer;
} | undefined): Printer__from_printer | undefined {
    return NewPrinter__from_printer(new PrinterOptions__from_printer(true, 0, false, 0, false, false, false, false, false, true, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
}
export class semicolonRemoverWriter {
    declare private readonly $goType: void;
    public constructor(public hasPendingSemicolon: bool, public inner: EmitTextWriter__from_printer | undefined) {
    }
    static $copy($source: semicolonRemoverWriter): semicolonRemoverWriter {
        return new semicolonRemoverWriter($source.hasPendingSemicolon, $source.inner);
    }
    static $equal($left: semicolonRemoverWriter, $right: semicolonRemoverWriter): bool {
        return $left.hasPendingSemicolon === $right.hasPendingSemicolon && goInterfaceEqual($left.inner, $right.inner);
    }
    static $hash($source: semicolonRemoverWriter): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.hasPendingSemicolon));
        $hash = GoMapHash.mix($hash, $source.inner === undefined ? 0 : $source.inner.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Clear(s: {
        value: semicolonRemoverWriter;
    } | undefined): void {
        const __gotots_receiver_0: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_0).Clear();
    }
    static DecreaseIndent(s: {
        value: semicolonRemoverWriter;
    } | undefined): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_1: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_1).DecreaseIndent();
    }
    static GetColumn(s: {
        value: semicolonRemoverWriter;
    } | undefined): UTF16Offset__from_core {
        const __gotots_receiver_2: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_2).GetColumn();
    }
    static GetIndent(s: {
        value: semicolonRemoverWriter;
    } | undefined): int {
        const __gotots_receiver_3: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_3).GetIndent();
    }
    static GetLine(s: {
        value: semicolonRemoverWriter;
    } | undefined): int {
        const __gotots_receiver_4: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_4).GetLine();
    }
    static GetTextPos(s: {
        value: semicolonRemoverWriter;
    } | undefined): int {
        const __gotots_receiver_5: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_5).GetTextPos();
    }
    static HasTrailingComment(s: {
        value: semicolonRemoverWriter;
    } | undefined): bool {
        const __gotots_receiver_6: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_6).HasTrailingComment();
    }
    static HasTrailingWhitespace(s: {
        value: semicolonRemoverWriter;
    } | undefined): bool {
        const __gotots_receiver_7: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_7).HasTrailingWhitespace();
    }
    static IncreaseIndent(s: {
        value: semicolonRemoverWriter;
    } | undefined): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_8: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_8).IncreaseIndent();
    }
    static IsAtStartOfLine(s: {
        value: semicolonRemoverWriter;
    } | undefined): bool {
        const __gotots_receiver_9: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_9).IsAtStartOfLine();
    }
    static RawWrite(s: {
        value: semicolonRemoverWriter;
    } | undefined, s1: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_10: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_0 = s1;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_10).RawWrite(__gotots_argument_0);
    }
    static String(s: {
        value: semicolonRemoverWriter;
    } | undefined): gostring {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_11: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        return goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_11).String();
    }
    static Write(s: {
        value: semicolonRemoverWriter;
    } | undefined, s1: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_12: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_1 = s1;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_12).Write(__gotots_argument_1);
    }
    static WriteComment(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_13: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_2 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_13).WriteComment(__gotots_argument_2);
    }
    static WriteKeyword(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_14: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_3 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_14).WriteKeyword(__gotots_argument_3);
    }
    static WriteLine(s: {
        value: semicolonRemoverWriter;
    } | undefined): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_15: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_15).WriteLine();
    }
    static WriteLineForce(s: {
        value: semicolonRemoverWriter;
    } | undefined, force: bool): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_16: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_4 = force;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_16).WriteLineForce(__gotots_argument_4);
    }
    static WriteLiteral(s: {
        value: semicolonRemoverWriter;
    } | undefined, s1: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_17: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_5 = s1;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_17).WriteLiteral(__gotots_argument_5);
    }
    static WriteOperator(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_18: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_6 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_18).WriteOperator(__gotots_argument_6);
    }
    static WriteParameter(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_19: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_7 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_19).WriteParameter(__gotots_argument_7);
    }
    static WriteProperty(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_20: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_8 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_20).WriteProperty(__gotots_argument_8);
    }
    static WritePunctuation(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_21: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_9 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_21).WritePunctuation(__gotots_argument_9);
    }
    static WriteSpace(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_22: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_10 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_22).WriteSpace(__gotots_argument_10);
    }
    static WriteStringLiteral(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_23: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_11 = text;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_23).WriteStringLiteral(__gotots_argument_11);
    }
    static WriteSymbol(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        semicolonRemoverWriter.$go$private$checker$commitSemicolon(s);
        const __gotots_receiver_24: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_12 = text;
        const __gotots_argument_13 = __go_symbol;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_24).WriteSymbol(__gotots_argument_12, __gotots_argument_13);
    }
    static WriteTrailingSemicolon(s: {
        value: semicolonRemoverWriter;
    } | undefined, text: gostring): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasPendingSemicolon = true;
    }
    static $go$private$checker$commitSemicolon(s: {
        value: semicolonRemoverWriter;
    } | undefined): void {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasPendingSemicolon) {
            const __gotots_receiver_25: semicolonRemoverWriter["inner"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
            const __gotots_argument_14 = ";";
            goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_25).WriteTrailingSemicolon(__gotots_argument_14);
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasPendingSemicolon = false;
        }
    }
}
export function getTrailingSemicolonDeferringWriter(writer: EmitTextWriter__from_printer | undefined): EmitTextWriter__from_printer | undefined {
    return new GoInterfaceAdapter({ value: new semicolonRemoverWriter(false, writer) });
}
export function toNodeBuilderFlags(flags: TypeFormatFlags): Flags__from_nodebuilder {
    return (flags & TypeFormatFlagsNodeBuilderFlagsMask$constant()) >>> 0;
}
