import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int32 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare entities: GoMapValue<gostring, int32>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
