import type { TextPos as TextPos__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $goInterfaceMethod$ECMALineMap$void_to_SliceOf_Named_core$TextPos, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Text$void_to_string } from "../../../../../../support/interface-methods.js";
export interface Source extends GoInterfaceValue {
    ECMALineMap(): RuntimeSlice<TextPos__from_core>;
    FileName(): gostring;
    Text(): gostring;
}
export const Source$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ECMALineMap$void_to_SliceOf_Named_core$TextPos, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Text$void_to_string]);
export function Source$is(value: GoInterfaceValue | undefined): value is Source {
    return value !== undefined && value.$go$implements(Source$contract);
}
