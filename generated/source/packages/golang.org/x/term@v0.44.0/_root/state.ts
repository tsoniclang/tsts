import type { EscapeCodes$Storage as EscapeCodes__from_term$Storage, pasteIndicatorError$Storage as pasteIndicatorError__from_term$Storage } from "../../../../../modules/golang.org/x/term@v0.44.0/_root/terminal.js";
import type { int32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare ErrPasteIndicator: pasteIndicatorError__from_term$Storage;
    declare crlf: RuntimeSlice<uint8>;
    declare pasteEnd: RuntimeSlice<uint8>;
    declare pasteStart: RuntimeSlice<uint8>;
    declare space: RuntimeSlice<int32>;
    declare vt100EscapeCodes: EscapeCodes__from_term$Storage;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
