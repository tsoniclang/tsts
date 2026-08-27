import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../collections/package.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare _ExportSyntax_index: GoArray<uint8, 11>;
    declare knownRecursiveSearchPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
