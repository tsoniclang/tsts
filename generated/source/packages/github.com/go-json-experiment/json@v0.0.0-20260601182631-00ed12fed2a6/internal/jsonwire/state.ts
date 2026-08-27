import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare ErrInvalidUTF8: GoInterface | undefined;
    declare escapeASCII: GoArray<uint8, 128>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
