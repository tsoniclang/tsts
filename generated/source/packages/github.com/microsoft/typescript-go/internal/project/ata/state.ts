import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare safeFileNameToTypeName: GoMapValue<gostring, gostring>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
