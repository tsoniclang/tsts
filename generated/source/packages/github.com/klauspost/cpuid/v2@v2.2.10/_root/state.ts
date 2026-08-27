import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CPUInfo$Storage as CPUInfo__from_cpuid$Storage, Features, Vendor } from "../../../../../../modules/github.com/klauspost/cpuid/v2@v2.2.10/_root/cpuid.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare CPU: CPUInfo__from_cpuid$Storage;
    declare _FeatureID_index: GoArray<uint16, 228>;
    declare _Vendor_index: GoArray<uint8, 33>;
    declare cpuid: (($0: uint32) => [
        uint32,
        uint32,
        uint32,
        uint32
    ]) | undefined;
    declare cpuidex: (($0: uint32, $1: uint32) => [
        uint32,
        uint32,
        uint32,
        uint32
    ]) | undefined;
    declare darwinHasAVX512: (() => bool) | undefined;
    declare detectArmFlag: tsonicTypeScriptRuntime.Location<bool> | undefined;
    declare disableFlag: tsonicTypeScriptRuntime.Location<gostring> | undefined;
    declare displayFeats: tsonicTypeScriptRuntime.Location<bool> | undefined;
    declare level1Features: Features;
    declare level2Features: Features;
    declare level3Features: Features;
    declare level4Features: Features;
    declare oneOfLevel: Features;
    declare rdtscpAsm: (() => [
        uint32,
        uint32,
        uint32,
        uint32
    ]) | undefined;
    declare vendorMapping: GoMapValue<gostring, Vendor>;
    declare xgetbv: (($0: uint32) => [
        uint32,
        uint32
    ]) | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
