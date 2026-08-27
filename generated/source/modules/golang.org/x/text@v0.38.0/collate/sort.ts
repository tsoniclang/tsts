import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Buffer } from "./collate.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { int, uint8 } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$Swap$int_int_to_void } from "../../../../../support/interface-methods.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface swapper extends GoInterfaceValue {
    Swap($argument0: int, $argument1: int): void;
}
export const swapper$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Swap$int_int_to_void]);
export function swapper$is(value: GoInterfaceValue | undefined): value is swapper {
    return value !== undefined && value.$go$implements(swapper$contract);
}
export class sorter {
    declare private readonly $goType: void;
    public constructor(public buf: tsonicTypeScriptRuntime.Location<Buffer> | undefined, public keys: RuntimeSlice<RuntimeSlice<uint8>>, public src: swapper | undefined) {
    }
    static $zero(): sorter {
        return new sorter(void 0, RuntimeSlice.nil<RuntimeSlice<uint8>>(), void 0);
    }
    declare private readonly then?: never;
}
