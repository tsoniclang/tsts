import type { int32, uint8 } from "@gotots/runtime/scalars.js";
import { EscapeCodes, keyEscape$uint8, pasteIndicatorError } from "../../../../../modules/golang.org/x/term@v0.44.0/_root/terminal.js";
import { $state } from "./state.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.ErrPasteIndicator = pasteIndicatorError.$zeroStorage();
    $state.crlf = RuntimeSlice.nil<uint8>();
    $state.pasteEnd = RuntimeSlice.nil<uint8>();
    $state.pasteStart = RuntimeSlice.nil<uint8>();
    $state.space = RuntimeSlice.nil<int32>();
    $state.vt100EscapeCodes = EscapeCodes.$zeroStorage();
    {
        $state.vt100EscapeCodes =
            (void EscapeCodes.$storageOf, (void EscapeCodes.$fromStorage,
                {
                    Black: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 48, 109]),
                    Red: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 49, 109]),
                    Green: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 50, 109]),
                    Yellow: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 51, 109]),
                    Blue: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 52, 109]),
                    Magenta: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 53, 109]),
                    Cyan: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 54, 109]),
                    White: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 51, 55, 109]),
                    Reset: RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 48, 109])
                }));
    }
    {
        $state.crlf = RuntimeSlice.literal<uint8>([13, 10]);
    }
    {
        $state.pasteStart = RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 50, 48, 48, 126]);
    }
    {
        $state.pasteEnd = RuntimeSlice.literal<uint8>([keyEscape$uint8, 91, 50, 48, 49, 126]);
    }
    {
        $state.space = RuntimeSlice.literal<int32>([32]);
    }
    {
        $state.ErrPasteIndicator =
            (void pasteIndicatorError.$storageOf, (void pasteIndicatorError.$fromStorage,
                {}));
    }
}
export { GetSize, IsTerminal } from "../../../../../modules/golang.org/x/term@v0.44.0/_root/term.js";
export { EscapeCodes, EscapeCodes$Storage } from "../../../../../modules/golang.org/x/term@v0.44.0/_root/terminal.js";
export { $state };
