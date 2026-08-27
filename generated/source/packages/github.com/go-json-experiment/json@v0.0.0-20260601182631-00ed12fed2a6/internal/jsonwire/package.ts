import type { uint8 } from "@gotots/runtime/scalars.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import { GoArray } from "@gotots/runtime/array.js";
export function $initialize(): void {
    $state.ErrInvalidUTF8 = void 0;
    $state.escapeASCII = GoArray.zero<uint8, 128>(128, 0);
    {
        $state.escapeASCII = GoArray.literal<uint8, 128>(128, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    {
        $state.ErrInvalidUTF8 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid UTF-8"));
    }
}
export { AppendUnquote, ConsumeFalse, ConsumeLiteral, ConsumeNull, ConsumeNumber, ConsumeNumberResumable, ConsumeNumberState, ConsumeSimpleNumber, ConsumeSimpleString, ConsumeString, ConsumeStringResumable, ConsumeTrue, ConsumeWhitespace, ParseUint, UnquoteMayCopy, ValueFlags } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/decode.js";
export { AppendFloat, AppendQuote, NeedEscape, ReformatNumber, ReformatString } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/encode.js";
export { CompareUTF16, HasSuffixByte, InvalidTextError, QuoteRune, TrimSuffixByte, TrimSuffixString, TrimSuffixWhitespace, TruncatePointer } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/wire.js";
export { $state };
