import type { GoArray } from "@gotots/runtime/array.js";
import type { int32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare _Usage_index: GoArray<uint8, 4>;
    declare wildcardCharCodes: RuntimeSlice<int32>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
