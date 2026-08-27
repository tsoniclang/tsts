import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$Clear$void_to_void, $goInterfaceMethod$DecreaseIndent$void_to_void, $goInterfaceMethod$GetColumn$void_to_Named_core$UTF16Offset, $goInterfaceMethod$GetIndent$void_to_int, $goInterfaceMethod$GetLine$void_to_int, $goInterfaceMethod$GetTextPos$void_to_int, $goInterfaceMethod$HasTrailingComment$void_to_bool, $goInterfaceMethod$HasTrailingWhitespace$void_to_bool, $goInterfaceMethod$IncreaseIndent$void_to_void, $goInterfaceMethod$IsAtStartOfLine$void_to_bool, $goInterfaceMethod$RawWrite$string_to_void, $goInterfaceMethod$String$void_to_string, $goInterfaceMethod$Write$string_to_void, $goInterfaceMethod$WriteComment$string_to_void, $goInterfaceMethod$WriteKeyword$string_to_void, $goInterfaceMethod$WriteLine$void_to_void, $goInterfaceMethod$WriteLineForce$bool_to_void, $goInterfaceMethod$WriteLiteral$string_to_void, $goInterfaceMethod$WriteOperator$string_to_void, $goInterfaceMethod$WriteParameter$string_to_void, $goInterfaceMethod$WriteProperty$string_to_void, $goInterfaceMethod$WritePunctuation$string_to_void, $goInterfaceMethod$WriteSpace$string_to_void, $goInterfaceMethod$WriteStringLiteral$string_to_void, $goInterfaceMethod$WriteSymbol$string_PointerTo_Named_ast$Symbol_to_void, $goInterfaceMethod$WriteTrailingSemicolon$string_to_void } from "../../../../../../support/interface-methods.js";
export interface EmitTextWriter extends GoInterfaceValue {
    Clear(): void;
    DecreaseIndent(): void;
    GetColumn(): UTF16Offset__from_core;
    GetIndent(): int;
    GetLine(): int;
    GetTextPos(): int;
    HasTrailingComment(): bool;
    HasTrailingWhitespace(): bool;
    IncreaseIndent(): void;
    IsAtStartOfLine(): bool;
    RawWrite($argument0: gostring): void;
    String(): gostring;
    Write($argument0: gostring): void;
    WriteComment($argument0: gostring): void;
    WriteKeyword($argument0: gostring): void;
    WriteLine(): void;
    WriteLineForce($argument0: bool): void;
    WriteLiteral($argument0: gostring): void;
    WriteOperator($argument0: gostring): void;
    WriteParameter($argument0: gostring): void;
    WriteProperty($argument0: gostring): void;
    WritePunctuation($argument0: gostring): void;
    WriteSpace($argument0: gostring): void;
    WriteStringLiteral($argument0: gostring): void;
    WriteSymbol($argument0: gostring, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void;
    WriteTrailingSemicolon($argument0: gostring): void;
}
export const EmitTextWriter$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Clear$void_to_void, $goInterfaceMethod$DecreaseIndent$void_to_void, $goInterfaceMethod$GetColumn$void_to_Named_core$UTF16Offset, $goInterfaceMethod$GetIndent$void_to_int, $goInterfaceMethod$GetLine$void_to_int, $goInterfaceMethod$GetTextPos$void_to_int, $goInterfaceMethod$HasTrailingComment$void_to_bool, $goInterfaceMethod$HasTrailingWhitespace$void_to_bool, $goInterfaceMethod$IncreaseIndent$void_to_void, $goInterfaceMethod$IsAtStartOfLine$void_to_bool, $goInterfaceMethod$RawWrite$string_to_void, $goInterfaceMethod$String$void_to_string, $goInterfaceMethod$Write$string_to_void, $goInterfaceMethod$WriteComment$string_to_void, $goInterfaceMethod$WriteKeyword$string_to_void, $goInterfaceMethod$WriteLine$void_to_void, $goInterfaceMethod$WriteLineForce$bool_to_void, $goInterfaceMethod$WriteLiteral$string_to_void, $goInterfaceMethod$WriteOperator$string_to_void, $goInterfaceMethod$WriteParameter$string_to_void, $goInterfaceMethod$WriteProperty$string_to_void, $goInterfaceMethod$WritePunctuation$string_to_void, $goInterfaceMethod$WriteSpace$string_to_void, $goInterfaceMethod$WriteStringLiteral$string_to_void, $goInterfaceMethod$WriteSymbol$string_PointerTo_Named_ast$Symbol_to_void, $goInterfaceMethod$WriteTrailingSemicolon$string_to_void]);
export function EmitTextWriter$is(value: GoInterfaceValue | undefined): value is EmitTextWriter {
    return value !== undefined && value.$go$implements(EmitTextWriter$contract);
}
