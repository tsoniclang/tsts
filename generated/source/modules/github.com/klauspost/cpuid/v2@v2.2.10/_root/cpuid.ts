import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_$Storage } from "../../../../../../support/anonymous-structs.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int64, uint32, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/klauspost/cpuid/v2@v2.2.10/_root/state.js";
import { $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { addInfo, initCPU } from "./detect_ref.js";
import { _FeatureID_name$string } from "./featureid_string.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoArray, goArrayLocation } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class Vendor {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function Intel$constant(): Vendor {
    return new Vendor(1);
}
export function AMD$constant(): Vendor {
    return new Vendor(2);
}
export function VIA$constant(): Vendor {
    return new Vendor(3);
}
export function Transmeta$constant(): Vendor {
    return new Vendor(4);
}
export function NSC$constant(): Vendor {
    return new Vendor(5);
}
export function KVM$constant(): Vendor {
    return new Vendor(6);
}
export function MSVM$constant(): Vendor {
    return new Vendor(7);
}
export function VMware$constant(): Vendor {
    return new Vendor(8);
}
export function XenHVM$constant(): Vendor {
    return new Vendor(9);
}
export function Bhyve$constant(): Vendor {
    return new Vendor(10);
}
export function Hygon$constant(): Vendor {
    return new Vendor(11);
}
export function SiS$constant(): Vendor {
    return new Vendor(12);
}
export function RDC$constant(): Vendor {
    return new Vendor(13);
}
export function QEMU$constant(): Vendor {
    return new Vendor(26);
}
export function QNX$constant(): Vendor {
    return new Vendor(27);
}
export function ACRN$constant(): Vendor {
    return new Vendor(28);
}
export function SRE$constant(): Vendor {
    return new Vendor(29);
}
export function Apple$constant(): Vendor {
    return new Vendor(30);
}
export class FeatureID {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    String(): gostring {
        if (this.$value < 0 || this.$value >=
            ((void FeatureID,
                227) as int)) {
            return "FeatureID(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(this.$value)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
        }
        return goStringSlice(_FeatureID_name$string, $state._FeatureID_index.get(this.$value), $state._FeatureID_index.get(((void FeatureID,
            this.$value + 1) as int)));
    }
}
export const UNKNOWN$int: int = -1;
export function AVX$constant(): FeatureID {
    return new FeatureID(13);
}
export function AVX2$constant(): FeatureID {
    return new FeatureID(18);
}
export function AVX512BW$constant(): FeatureID {
    return new FeatureID(21);
}
export function AVX512CD$constant(): FeatureID {
    return new FeatureID(22);
}
export function AVX512DQ$constant(): FeatureID {
    return new FeatureID(23);
}
export function AVX512F$constant(): FeatureID {
    return new FeatureID(25);
}
export function AVX512VL$constant(): FeatureID {
    return new FeatureID(31);
}
export function BMI1$constant(): FeatureID {
    return new FeatureID(42);
}
export function BMI2$constant(): FeatureID {
    return new FeatureID(43);
}
export function CMOV$constant(): FeatureID {
    return new FeatureID(49);
}
export function CMPXCHG8$constant(): FeatureID {
    return new FeatureID(52);
}
export function CX16$constant(): FeatureID {
    return new FeatureID(55);
}
export function F16C$constant(): FeatureID {
    return new FeatureID(59);
}
export function FMA3$constant(): FeatureID {
    return new FeatureID(61);
}
export function FXSR$constant(): FeatureID {
    return new FeatureID(66);
}
export function LAHF$constant(): FeatureID {
    return new FeatureID(101);
}
export function LZCNT$constant(): FeatureID {
    return new FeatureID(104);
}
export function MMX$constant(): FeatureID {
    return new FeatureID(109);
}
export function MOVBE$constant(): FeatureID {
    return new FeatureID(111);
}
export function OSXSAVE$constant(): FeatureID {
    return new FeatureID(122);
}
export function POPCNT$constant(): FeatureID {
    return new FeatureID(124);
}
export function SSE$constant(): FeatureID {
    return new FeatureID(154);
}
export function SSE2$constant(): FeatureID {
    return new FeatureID(155);
}
export function SSE3$constant(): FeatureID {
    return new FeatureID(156);
}
export function SSE4$constant(): FeatureID {
    return new FeatureID(157);
}
export function SSE42$constant(): FeatureID {
    return new FeatureID(158);
}
export function SSSE3$constant(): FeatureID {
    return new FeatureID(160);
}
export function SYSCALL$constant(): FeatureID {
    return new FeatureID(172);
}
export function SYSEE$constant(): FeatureID {
    return new FeatureID(173);
}
export function X87$constant(): FeatureID {
    return new FeatureID(191);
}
export function lastID$constant(): FeatureID {
    return new FeatureID(226);
}
export function firstID$constant(): FeatureID {
    return new FeatureID(0);
}
export type CPUInfo$Storage = {
    BrandName: gostring;
    VendorID: int;
    VendorString: gostring;
    HypervisorVendorID: int;
    HypervisorVendorString: gostring;
    featureSet: GoArray<uint64, 4>;
    PhysicalCores: int;
    ThreadsPerCore: int;
    LogicalCores: int;
    Family: int;
    Model: int;
    Stepping: int;
    CacheLine: int;
    Hz: int64;
    BoostFreq: int64;
    Cache: $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_$Storage;
    SGX: SGXSupport$Storage;
    AMDMemEncryption: AMDMemEncryptionSupport$Storage;
    AVX10Level: uint8;
    maxFunc: uint32;
    maxExFunc: uint32;
};
export class CPUInfo {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CPUInfo$Storage) {
    }
    public static $storageOf($source: CPUInfo): CPUInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: CPUInfo$Storage): CPUInfo {
        return new CPUInfo($source);
    }
    public get BrandName(): gostring {
        return this.$storage.BrandName;
    }
    public set BrandName($value: gostring) {
        this.$storage.BrandName = $value;
    }
    public get VendorID(): Vendor {
        return new Vendor(this.$storage.VendorID);
    }
    public set VendorID($value: Vendor) {
        this.$storage.VendorID = $value.$value;
    }
    public get VendorString(): gostring {
        return this.$storage.VendorString;
    }
    public set VendorString($value: gostring) {
        this.$storage.VendorString = $value;
    }
    public get HypervisorVendorID(): Vendor {
        return new Vendor(this.$storage.HypervisorVendorID);
    }
    public set HypervisorVendorID($value: Vendor) {
        this.$storage.HypervisorVendorID = $value.$value;
    }
    public get HypervisorVendorString(): gostring {
        return this.$storage.HypervisorVendorString;
    }
    public set HypervisorVendorString($value: gostring) {
        this.$storage.HypervisorVendorString = $value;
    }
    public get featureSet(): flagSet {
        return new flagSet(this.$storage.featureSet);
    }
    public set featureSet($value: flagSet) {
        this.$storage.featureSet = $value.$value;
    }
    public get PhysicalCores(): int {
        return this.$storage.PhysicalCores;
    }
    public set PhysicalCores($value: int) {
        this.$storage.PhysicalCores = $value;
    }
    public get ThreadsPerCore(): int {
        return this.$storage.ThreadsPerCore;
    }
    public set ThreadsPerCore($value: int) {
        this.$storage.ThreadsPerCore = $value;
    }
    public get LogicalCores(): int {
        return this.$storage.LogicalCores;
    }
    public set LogicalCores($value: int) {
        this.$storage.LogicalCores = $value;
    }
    public get Family(): int {
        return this.$storage.Family;
    }
    public set Family($value: int) {
        this.$storage.Family = $value;
    }
    public get Model(): int {
        return this.$storage.Model;
    }
    public set Model($value: int) {
        this.$storage.Model = $value;
    }
    public get Stepping(): int {
        return this.$storage.Stepping;
    }
    public set Stepping($value: int) {
        this.$storage.Stepping = $value;
    }
    public get CacheLine(): int {
        return this.$storage.CacheLine;
    }
    public set CacheLine($value: int) {
        this.$storage.CacheLine = $value;
    }
    public get Hz(): int64 {
        return this.$storage.Hz;
    }
    public set Hz($value: int64) {
        this.$storage.Hz = $value;
    }
    public get BoostFreq(): int64 {
        return this.$storage.BoostFreq;
    }
    public set BoostFreq($value: int64) {
        this.$storage.BoostFreq = $value;
    }
    public get Cache(): $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_ {
        return $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$fromStorage(this.$storage.Cache);
    }
    public set Cache($value: $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_) {
        this.$storage.Cache = $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$storageOf($value);
    }
    public get SGX(): SGXSupport {
        return SGXSupport.$fromStorage(this.$storage.SGX);
    }
    public set SGX($value: SGXSupport) {
        this.$storage.SGX = SGXSupport.$storageOf($value);
    }
    public get AMDMemEncryption(): AMDMemEncryptionSupport {
        return AMDMemEncryptionSupport.$fromStorage(this.$storage.AMDMemEncryption);
    }
    public set AMDMemEncryption($value: AMDMemEncryptionSupport) {
        this.$storage.AMDMemEncryption = AMDMemEncryptionSupport.$storageOf($value);
    }
    public get AVX10Level(): uint8 {
        return this.$storage.AVX10Level;
    }
    public set AVX10Level($value: uint8) {
        this.$storage.AVX10Level = $value;
    }
    public get maxFunc(): uint32 {
        return this.$storage.maxFunc;
    }
    public set maxFunc($value: uint32) {
        this.$storage.maxFunc = $value;
    }
    public get maxExFunc(): uint32 {
        return this.$storage.maxExFunc;
    }
    public set maxExFunc($value: uint32) {
        this.$storage.maxExFunc = $value;
    }
    static $zero(): CPUInfo {
        return new CPUInfo({
            BrandName: "",
            VendorID: ((void Vendor,
                0) as int),
            VendorString: "",
            HypervisorVendorID: ((void Vendor,
                0) as int),
            HypervisorVendorString: "",
            featureSet: new flagSet(GoArray.zero<uint64, 4>(4, ((void flags,
                0n) as uint64))).$value,
            PhysicalCores: 0,
            ThreadsPerCore: 0,
            LogicalCores: 0,
            Family: 0,
            Model: 0,
            Stepping: 0,
            CacheLine: 0,
            Hz: 0n,
            BoostFreq: 0n,
            Cache: $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$storageOf($goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$zero()),
            SGX: SGXSupport.$storageOf(SGXSupport.$zero()),
            AMDMemEncryption: AMDMemEncryptionSupport.$storageOf(AMDMemEncryptionSupport.$zero()),
            AVX10Level: 0,
            maxFunc: 0,
            maxExFunc: 0
        });
    }
    declare private readonly then?: never;
    FeatureSet(): RuntimeSlice<gostring> {
        const __gotots_argument_0 = 0;
        const __gotots_store_2 = CPUInfo.$storageOf(this);
        const __gotots_argument_1 = flagSet.$go$private$cpuid$nEnabled(tsonicTypeScriptRuntime.projectLocation<GoArray<uint64, 4>, flagSet>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "featureSet"), ($go$storage: GoArray<uint64, 4>): flagSet => {
            return new flagSet($go$storage);
        }, ($go$value: flagSet): GoArray<uint64, 4> => {
            return $go$value.$value;
        }));
        const __gotots_argument_2 = "";
        let s = RuntimeSlice.make<gostring>(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        s = goSliceAppendSlice<gostring>(s, new flagSet(CPUInfo.$storageOf(this).featureSet).Strings(), "");
        return s;
    }
}
export function init(): void {
    initCPU();
    Detect();
}
export function Detect(): void {
    CPUInfo.$storageOf(CPUInfo.$fromStorage($state.CPU)).ThreadsPerCore = 1;
    $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$fromStorage(CPUInfo.$storageOf(CPUInfo.$fromStorage($state.CPU)).Cache).L1I = -1;
    $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$fromStorage(CPUInfo.$storageOf(CPUInfo.$fromStorage($state.CPU)).Cache).L1D = -1;
    $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$fromStorage(CPUInfo.$storageOf(CPUInfo.$fromStorage($state.CPU)).Cache).L2 = -1;
    $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_.$fromStorage(CPUInfo.$storageOf(CPUInfo.$fromStorage($state.CPU)).Cache).L3 = -1;
    let safe = true;
    if (!($state.detectArmFlag === undefined)) {
        safe = !(($state.detectArmFlag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value;
    }
    addInfo(tsonicTypeScriptRuntime.projectLocation<CPUInfo$Storage, CPUInfo>(tsonicTypeScriptRuntime.propertyLocation($state, "CPU"), ($go$storage: CPUInfo$Storage): CPUInfo => {
        return CPUInfo.$fromStorage($go$storage);
    }, ($go$value: CPUInfo): CPUInfo$Storage => {
        return CPUInfo.$storageOf($go$value);
    }), safe);
    if (!($state.displayFeats === undefined) &&
        (($state.displayFeats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value) {
        fmt__from_gostdlib.Println(RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("cpu features:"), new GoInterfaceAdapter(strings__from_gostdlib.Join(CPUInfo.$fromStorage($state.CPU).FeatureSet(), ","))]));
        os__from_gostdlib.Exit(BigInt.asIntN(64, goNumberToBigInt(1)));
    }
    if (!($state.disableFlag === undefined)) {
        let s = strings__from_gostdlib.Split((($state.disableFlag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, ",");
        const __gotots_range_1 = s;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let feat = __gotots_range_value_1;
            let feat__shadow_1 = ParseFeature(strings__from_gostdlib.TrimSpace(feat));
            if (!(feat__shadow_1.$value ===
                ((void FeatureID,
                    UNKNOWN$int) as int))) {
                const __gotots_store_1 = CPUInfo.$storageOf(CPUInfo.$fromStorage($state.CPU));
                flagSet.$go$private$cpuid$unset(tsonicTypeScriptRuntime.projectLocation<GoArray<uint64, 4>, flagSet>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "featureSet"), ($go$storage: GoArray<uint64, 4>): flagSet => {
                    return new flagSet($go$storage);
                }, ($go$value: flagSet): GoArray<uint64, 4> => {
                    return $go$value.$value;
                }), feat__shadow_1);
            }
        }
    }
}
export class Features {
    declare private readonly $goType: void;
    constructor(public readonly $value: tsonicTypeScriptRuntime.Location<flagSet> | undefined) {
    }
    declare private readonly then?: never;
}
export function CombineFeatures(ids: RuntimeSlice<int>): Features {
    let v = new flagSet(GoArray.zero<uint64, 4>(4, ((void flags,
        0n) as uint64)));
    const v$location = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next => v = v$next);
    const __gotots_range_0 = ids;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = new FeatureID(__gotots_range_0.get(__gotots_range_index_0));
        let id = __gotots_range_value_0;
        flagSet.$go$private$cpuid$set(v$location, id);
    }
    return new Features(v$location);
}
export class flags {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
}
export const flagBitsLog2$int: int = 6;
export const flagMask$int: int = 63;
export class flagSet {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoArray<uint64, 4>) {
    }
    declare private readonly then?: never;
    static $go$private$cpuid$inSet(s: flagSet | undefined, feat: FeatureID): bool {
        const __gotots_address_15 = s;
        const __gotots_address_16 = ((void FeatureID,
            feat.$value >>
                ((void FeatureID,
                    flagBitsLog2$int) as int)) as int);
        const __gotots_address_17 = (__gotots_address_15 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_18 = __gotots_address_17.$value;
        __gotots_address_18.get(__gotots_address_16);
        const __gotots_address_19 = goArrayLocation(__gotots_address_18);
        const __gotots_binary_operand_2 = (($go$storage: uint64): flags => {
            return new flags($go$storage);
        })((tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_19, 0), __gotots_address_19[1] + globalThis.Number(__gotots_address_16))!).value).$value;
        const __gotots_binary_operand_3 = (new flags((new FeatureID(feat.$value &
            ((void FeatureID,
                flagMask$int) as int))).$value < 0 ? GoPanic.raiseRuntime("negative shift amount") : (new FeatureID(feat.$value &
            ((void FeatureID,
                flagMask$int) as int))).$value >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt((new FeatureID(feat.$value &
            ((void FeatureID,
                flagMask$int) as int))).$value)))).$value;
        return !(((void flags,
            goUint64(__gotots_binary_operand_2 & __gotots_binary_operand_3)) as uint64)
            ===
                ((void flags,
                    0n) as uint64));
    }
    static $go$private$cpuid$nEnabled(s: tsonicTypeScriptRuntime.Location<flagSet> | undefined): int {
        let n: int = 0;
        const __gotots_range_2 = goArraySlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<flagSet>).value.$value, 0, null, null);
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = new flags(__gotots_range_2.get(__gotots_range_index_2));
            let v = __gotots_range_value_2;
            n += globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.OnesCount64(v.$value)));
        }
        return n;
    }
    static $go$private$cpuid$set(s: tsonicTypeScriptRuntime.Location<flagSet> | undefined, feat: FeatureID): void {
        const __gotots_address_0 = s;
        const __gotots_address_1 = ((void FeatureID,
            feat.$value >>
                ((void FeatureID,
                    flagBitsLog2$int) as int)) as int);
        const __gotots_address_2 = ((__gotots_address_0 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<flagSet>).value;
        const __gotots_address_3 = __gotots_address_2.$value;
        __gotots_address_3.get(__gotots_address_1);
        const __gotots_address_4 = goArrayLocation(__gotots_address_3);
        const __gotots_store_0 = (tsonicTypeScriptRuntime.projectLocation<uint64, flags>(tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_4, 0), __gotots_address_4[1] + globalThis.Number(__gotots_address_1)), ($go$storage: uint64): flags => {
            return new flags($go$storage);
        }, ($go$value: flags): uint64 => {
            return $go$value.$value;
        })
            ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_0.value =
            new flags(goUint64(__gotots_store_0.value.$value |
                ((void flags,
                    (new FeatureID(feat.$value &
                        ((void FeatureID,
                            flagMask$int) as int))).$value < 0 ? GoPanic.raiseRuntime("negative shift amount") : (new FeatureID(feat.$value &
                        ((void FeatureID,
                            flagMask$int) as int))).$value >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt((new FeatureID(feat.$value &
                        ((void FeatureID,
                            flagMask$int) as int))).$value))) as uint64))));
    }
    static $go$private$cpuid$unset(s: tsonicTypeScriptRuntime.Location<flagSet> | undefined, offset: FeatureID): void {
        let bit = new flags(((void flags,
            (new FeatureID(offset.$value &
                ((void FeatureID,
                    flagMask$int) as int))).$value < 0 ? GoPanic.raiseRuntime("negative shift amount") : (new FeatureID(offset.$value &
                ((void FeatureID,
                    flagMask$int) as int))).$value >= 64 ? 0n : goUint64(goUint64(1n) << globalThis.BigInt((new FeatureID(offset.$value &
                ((void FeatureID,
                    flagMask$int) as int))).$value))) as uint64));
        const __gotots_address_5 = s;
        const __gotots_address_6 = ((void FeatureID,
            offset.$value >>
                ((void FeatureID,
                    flagBitsLog2$int) as int)) as int);
        const __gotots_address_7 = ((__gotots_address_5 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<flagSet>).value;
        const __gotots_address_8 = __gotots_address_7.$value;
        __gotots_address_8.get(__gotots_address_6);
        const __gotots_address_9 = goArrayLocation(__gotots_address_8);
        const __gotots_store_3 = (tsonicTypeScriptRuntime.projectLocation<uint64, flags>(tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_9, 0), __gotots_address_9[1] + globalThis.Number(__gotots_address_6)), ($go$storage: uint64): flags => {
            return new flags($go$storage);
        }, ($go$value: flags): uint64 => {
            return $go$value.$value;
        })
            ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_10 = s;
        const __gotots_address_11 = ((void FeatureID,
            offset.$value >>
                ((void FeatureID,
                    flagBitsLog2$int) as int)) as int);
        const __gotots_address_12 = ((__gotots_address_10 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<flagSet>).value;
        const __gotots_address_13 = __gotots_address_12.$value;
        __gotots_address_13.get(__gotots_address_11);
        const __gotots_address_14 = goArrayLocation(__gotots_address_13);
        const __gotots_binary_operand_0 = (($go$storage: uint64): flags => {
            return new flags($go$storage);
        })((tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_14, 0), __gotots_address_14[1] + globalThis.Number(__gotots_address_11))!).value).$value;
        const __gotots_binary_operand_1 = ((void flags,
            goUint64(~bit.$value)) as uint64);
        void (__gotots_store_3.value =
            new flags(goUint64(__gotots_binary_operand_0 & __gotots_binary_operand_1)));
    }
    Strings(): RuntimeSlice<gostring> {
        let s: flagSet = new flagSet(this.$value.copy());
        if (false) {
            return RuntimeSlice.literal<gostring>([""]);
        }
        let r = RuntimeSlice.make<gostring>(0, null, "");
        for (let i = firstID$constant(); i.$value < lastID$constant().$value; i = new FeatureID(i.$value + 1)) {
            if (flagSet.$go$private$cpuid$inSet(s, i)) {
                r = r.append("", [i.String()]);
            }
        }
        return r;
    }
}
export function ParseFeature(s: gostring): FeatureID {
    s = strings__from_gostdlib.ToUpper(s);
    for (let i = firstID$constant(); i.$value < lastID$constant().$value; i = new FeatureID(i.$value + 1)) {
        if (i.String() === s) {
            return i;
        }
    }
    return new FeatureID(UNKNOWN$int);
}
export type SGXEPCSection$Storage = {
    BaseAddress: uint64;
    EPCSize: uint64;
};
export class SGXEPCSection {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SGXEPCSection$Storage) {
    }
    public static $storageOf($source: SGXEPCSection): SGXEPCSection$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SGXEPCSection$Storage): SGXEPCSection {
        return new SGXEPCSection($source);
    }
    public get BaseAddress(): uint64 {
        return this.$storage.BaseAddress;
    }
    public set BaseAddress($value: uint64) {
        this.$storage.BaseAddress = $value;
    }
    public get EPCSize(): uint64 {
        return this.$storage.EPCSize;
    }
    public set EPCSize($value: uint64) {
        this.$storage.EPCSize = $value;
    }
    declare private readonly then?: never;
}
export type SGXSupport$Storage = {
    Available: bool;
    LaunchControl: bool;
    SGX1Supported: bool;
    SGX2Supported: bool;
    MaxEnclaveSizeNot64: int64;
    MaxEnclaveSize64: int64;
    EPCSections: RuntimeSlice<SGXEPCSection$Storage>;
};
export class SGXSupport {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SGXSupport$Storage) {
    }
    public static $storageOf($source: SGXSupport): SGXSupport$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SGXSupport$Storage): SGXSupport {
        return new SGXSupport($source);
    }
    public get Available(): bool {
        return this.$storage.Available;
    }
    public set Available($value: bool) {
        this.$storage.Available = $value;
    }
    public get LaunchControl(): bool {
        return this.$storage.LaunchControl;
    }
    public set LaunchControl($value: bool) {
        this.$storage.LaunchControl = $value;
    }
    public get SGX1Supported(): bool {
        return this.$storage.SGX1Supported;
    }
    public set SGX1Supported($value: bool) {
        this.$storage.SGX1Supported = $value;
    }
    public get SGX2Supported(): bool {
        return this.$storage.SGX2Supported;
    }
    public set SGX2Supported($value: bool) {
        this.$storage.SGX2Supported = $value;
    }
    public get MaxEnclaveSizeNot64(): int64 {
        return this.$storage.MaxEnclaveSizeNot64;
    }
    public set MaxEnclaveSizeNot64($value: int64) {
        this.$storage.MaxEnclaveSizeNot64 = $value;
    }
    public get MaxEnclaveSize64(): int64 {
        return this.$storage.MaxEnclaveSize64;
    }
    public set MaxEnclaveSize64($value: int64) {
        this.$storage.MaxEnclaveSize64 = $value;
    }
    public get EPCSections(): RuntimeSlice<SGXEPCSection$Storage> {
        return this.$storage.EPCSections;
    }
    public set EPCSections($value: RuntimeSlice<SGXEPCSection$Storage>) {
        this.$storage.EPCSections = $value;
    }
    static $zero(): SGXSupport {
        return new SGXSupport({
            Available: false,
            LaunchControl: false,
            SGX1Supported: false,
            SGX2Supported: false,
            MaxEnclaveSizeNot64: 0n,
            MaxEnclaveSize64: 0n,
            EPCSections: RuntimeSlice.nil<SGXEPCSection$Storage>()
        });
    }
    declare private readonly then?: never;
}
export type AMDMemEncryptionSupport$Storage = {
    Available: bool;
    CBitPossition: uint32;
    NumVMPL: uint32;
    PhysAddrReduction: uint32;
    NumEntryptedGuests: uint32;
    MinSevNoEsAsid: uint32;
};
export class AMDMemEncryptionSupport {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: AMDMemEncryptionSupport$Storage) {
    }
    public static $storageOf($source: AMDMemEncryptionSupport): AMDMemEncryptionSupport$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: AMDMemEncryptionSupport$Storage): AMDMemEncryptionSupport {
        return new AMDMemEncryptionSupport($source);
    }
    public get Available(): bool {
        return this.$storage.Available;
    }
    public set Available($value: bool) {
        this.$storage.Available = $value;
    }
    public get CBitPossition(): uint32 {
        return this.$storage.CBitPossition;
    }
    public set CBitPossition($value: uint32) {
        this.$storage.CBitPossition = $value;
    }
    public get NumVMPL(): uint32 {
        return this.$storage.NumVMPL;
    }
    public set NumVMPL($value: uint32) {
        this.$storage.NumVMPL = $value;
    }
    public get PhysAddrReduction(): uint32 {
        return this.$storage.PhysAddrReduction;
    }
    public set PhysAddrReduction($value: uint32) {
        this.$storage.PhysAddrReduction = $value;
    }
    public get NumEntryptedGuests(): uint32 {
        return this.$storage.NumEntryptedGuests;
    }
    public set NumEntryptedGuests($value: uint32) {
        this.$storage.NumEntryptedGuests = $value;
    }
    public get MinSevNoEsAsid(): uint32 {
        return this.$storage.MinSevNoEsAsid;
    }
    public set MinSevNoEsAsid($value: uint32) {
        this.$storage.MinSevNoEsAsid = $value;
    }
    static $zero(): AMDMemEncryptionSupport {
        return new AMDMemEncryptionSupport({
            Available: false,
            CBitPossition: 0,
            NumVMPL: 0,
            PhysAddrReduction: 0,
            NumEntryptedGuests: 0,
            MinSevNoEsAsid: 0
        });
    }
    declare private readonly then?: never;
}
