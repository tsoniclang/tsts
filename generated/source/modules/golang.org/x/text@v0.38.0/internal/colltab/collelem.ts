import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { int, int32, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$byte, $goInterfaceAdapter$string, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_unicode from "@gotots/gostdlib/internal/facets/named-unicode.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class Level {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function Secondary$constant(): Level {
    return new Level(1);
}
export function Tertiary$constant(): Level {
    return new Level(2);
}
export function Quaternary$constant(): Level {
    return new Level(3);
}
export function Identity$constant(): Level {
    return new Level(4);
}
export const defaultSecondary$int: int = 32;
export const defaultSecondary$uint32: uint32 = 32;
export const defaultTertiary$int: int = 2;
export const defaultTertiary$uint8: uint8 = 2;
export const maxTertiary$uint8: uint8 = 31;
export const MaxQuaternary$int: int = 2097151;
export type Elem = uint32;
export function maxCE$constant(): Elem {
    return 2952790015;
}
export const maxContract$uint32: uint32 = 3758096383;
export const maxExpand$uint32: uint32 = 4026531839;
export class ceType {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ceNormal$constant(): ceType {
    return new ceType(0);
}
export function ceContractionIndex$constant(): ceType {
    return new ceType(1);
}
export function ceExpansionIndex$constant(): ceType {
    return new ceType(2);
}
export function ceDecompose$constant(): ceType {
    return new ceType(3);
}
export function Elem_ctype(ce: Elem): ceType {
    if (ce <= maxCE$constant()) {
        return ceNormal$constant();
    }
    if (ce <= maxContract$uint32) {
        return ceContractionIndex$constant();
    }
    else {
        if (ce <= maxExpand$uint32) {
            return ceExpansionIndex$constant();
        }
        return ceDecompose$constant();
    }
}
export const ceTypeMask$uint32: uint32 = 3221225472;
export const ceTypeMaskExt$uint32: uint32 = 3758096384;
export const ceIgnoreMask$uint32: uint32 = 4027580415;
export const ceType1$uint32: uint32 = 1073741824;
export const ceType2$uint32: uint32 = 0;
export const ceType3or4$uint32: uint32 = 2147483648;
export const ceType4$uint32: uint32 = 2684354560;
export const ceTypeQ$uint32: uint32 = 3221225472;
export const Ignore$uint32: uint32 = 2684354560;
export const firstNonPrimary$uint32: uint32 = 2147483648;
export const lastSpecialPrimary$uint32: uint32 = 2684354560;
export const hasTertiaryMask$uint32: uint32 = 1073741824;
export const primaryValueMask$uint32: uint32 = 1073741312;
export const compactPrimaryBits$uint32: uint32 = 16;
export const maxTertiaryBits$int: int = 8;
export const maxSecondaryDiffBits$int: int = 4;
export const maxTertiaryCompactBits$uint32: uint32 = 5;
export const primaryShift$int: int = 9;
export const compactSecondaryShift$uint32: uint32 = 5;
export const minCompactSecondary$int: int = 28;
export const minCompactSecondary$uint8: uint8 = 28;
export function makeImplicitCE(primary: int): Elem {
    return ((ceType1$uint32 | primary << primaryShift$int >>> 0) >>> 0 | defaultSecondary$uint32) >>> 0;
}
export function MakeElem(primary: int, secondary: int, tertiary: int, ccc: uint8): [
    Elem,
    GoInterface | undefined
] {
    {
        let w = primary;
        if (w >= 2097152 || w < 0) {
            return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: primary weight out of bounds: %x >= %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(w), new GoInterfaceAdapter(2097152)])))];
        }
    }
    {
        let w = secondary;
        if (w >= 4096 || w < 0) {
            return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: secondary weight out of bounds: %x >= %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(w), new GoInterfaceAdapter(4096)])))];
        }
    }
    {
        let w = tertiary;
        if (w >= 256 || w < 0) {
            return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: tertiary weight out of bounds: %x >= %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(w), new GoInterfaceAdapter(256)])))];
        }
    }
    let ce = 0;
    if (primary !== 0) {
        if (ccc !== 0) {
            if (primary >= 65536) {
                return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: primary weight with non-zero CCC out of bounds: %x >= %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(primary), new GoInterfaceAdapter(65536)])))];
            }
            if (secondary !== defaultSecondary$int) {
                return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: cannot combine non-default secondary value (%x) with non-zero CCC (%x)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(secondary), new $goInterfaceAdapter$byte(ccc)])))];
            }
            ce = tertiary << (24) >>> 0;
            ce = (ce | ccc << compactPrimaryBits$uint32 >>> 0) >>> 0;
            ce = (ce | primary >>> 0) >>> 0;
            ce = (ce | 2147483648) >>> 0;
        }
        else if (tertiary === defaultTertiary$int) {
            if (secondary >= 256) {
                return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: secondary weight with non-zero primary out of bounds: %x >= %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(secondary), new GoInterfaceAdapter(256)])))];
            }
            ce = (primary << (9)) + secondary >>> 0;
            ce = (ce | 1073741824) >>> 0;
        }
        else {
            let d = secondary - defaultSecondary$int + maxSecondaryDiffBits$int;
            if (d >= 16 || d < 0) {
                return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: secondary weight diff out of bounds: %x < 0 || %x > %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(d), new GoInterfaceAdapter(d), new GoInterfaceAdapter(16)])))];
            }
            if (tertiary >= 32) {
                return [0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("makeCE: tertiary weight with non-zero primary out of bounds: %x > %x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(tertiary), new GoInterfaceAdapter(32)])))];
            }
            ce = (primary << maxSecondaryDiffBits$int) + d >>> 0;
            ce = (ce << maxTertiaryCompactBits$uint32 >>> 0) + (tertiary >>> 0);
        }
    }
    else {
        ce = (secondary << maxTertiaryBits$int) + tertiary >>> 0;
        ce = ce + (ccc << (20) >>> 0);
        ce = (ce | 2684354560) >>> 0;
    }
    return [ce, void 0];
}
export function Elem_CCC(ce: Elem): uint8 {
    if (!((ce & ceType3or4$uint32) >>> 0 === 0)) {
        if ((ce & ceType4$uint32) >>> 0 === ceType3or4$uint32) {
            return ce >>> 16 & 255;
        }
        return ce >>> 20 & 255;
    }
    return 0;
}
export function Elem_Primary(ce: Elem): int {
    if (ce >= firstNonPrimary$uint32) {
        if (ce > lastSpecialPrimary$uint32) {
            return 0;
        }
        return ce & 65535;
    }
    return (ce & primaryValueMask$uint32) >>> 0 >> primaryShift$int;
}
export function Elem_Secondary(ce: Elem): int {
    switch ((ce & ceTypeMask$uint32) >>> 0) {
        case ceType1$uint32: {
            return ce & 255;
            break;
        }
        case ceType2$uint32: {
            return minCompactSecondary$int + (((ce >>> compactSecondaryShift$uint32) & 15) >>> 0);
            break;
        }
        case ceType3or4$uint32: {
            if (ce < ceType4$uint32) {
                return defaultSecondary$int;
            }
            return ce >>> 8 & 4095;
            break;
        }
        case ceTypeQ$uint32: {
            return 0;
            break;
        }
    }
    const __gotots_argument_0 = new $goInterfaceAdapter$string("should not reach here");
    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function Elem_Tertiary(ce: Elem): uint8 {
    if ((ce & hasTertiaryMask$uint32) >>> 0 === 0) {
        if ((ce & ceType3or4$uint32) >>> 0 === 0) {
            return (ce & 31) >>> 0 & 255;
        }
        if ((ce & ceType4$uint32) >>> 0 === ceType4$uint32) {
            return ce & 255;
        }
        return ce >>> 24 & 255 & 31;
    }
    else if ((ce & ceTypeMask$uint32) >>> 0 === ceType1$uint32) {
        return defaultTertiary$uint8;
    }
    return 0;
}
export function Elem_updateTertiary(ce: Elem, t: uint8): Elem {
    if ((ce & ceTypeMask$uint32) >>> 0 === ceType1$uint32) {
        let nce = (ce & primaryValueMask$uint32) >>> 0;
        nce = (nce | (ce & 255) - minCompactSecondary$uint8 << compactSecondaryShift$uint32 >>> 0) >>> 0;
        ce = nce;
    }
    else if ((ce & ceTypeMaskExt$uint32) >>> 0 === ceType3or4$uint32) {
        ce = (ce & 3774873599) >>> 0;
        return (ce | (t << 24 >>> 0)) >>> 0;
    }
    else {
        ce = (ce & 4294967264) >>> 0;
    }
    return (ce | t) >>> 0;
}
export function Elem_Quaternary(ce: Elem): int {
    if ((ce & ceTypeMask$uint32) >>> 0 === ceTypeQ$uint32) {
        return (ce & primaryValueMask$uint32) >>> 0 >> primaryShift$int;
    }
    else if ((ce & ceIgnoreMask$uint32) >>> 0 === Ignore$uint32) {
        return 0;
    }
    return MaxQuaternary$int;
}
export const maxNBits$uint32: uint32 = 4;
export const maxTrieIndexBits$uint32: uint32 = 12;
export function splitContractIndex(ce: Elem): [
    int,
    int,
    int
] {
    let index: int = 0;
    let n: int = 0;
    let offset: int = 0;
    n = (ce & (15)) >>> 0;
    ce = ce >>> 4;
    index = (ce & (4095)) >>> 0;
    ce = ce >>> 12;
    offset = (ce & (8191)) >>> 0;
    return [index, n, offset];
}
export function splitExpandIndex(ce: Elem): int {
    let index: int = 0;
    return ce & 65535;
}
export function splitDecompose(ce: Elem): [
    uint8,
    uint8
] {
    let t1__shadow_1: uint8 = 0;
    let t2__shadow_1: uint8 = 0;
    return [ce & 255, ce >>> 8 & 255];
}
export const minUnified: int32 = 19968;
export const maxUnified$int32: int32 = 40959;
export const minCompatibility$int32: int32 = 63744;
export const maxCompatibility$int32: int32 = 64255;
export const commonUnifiedOffset$int: int = 65536;
export const rareUnifiedOffset$int: int = 131072;
export const otherOffset$int: int = 327680;
export function implicitPrimary(r: int32): int {
    const __gotots_conversion_0 = unicode__from_gostdlib.state.Ideographic;
    const __gotots_argument_1 = __gotots_conversion_0 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<unicode__from_gostdlib.RangeTable>(__gotots_conversion_0, (): unicode__from_gostdlib.RangeTable => {
            return __gotots_conversion_0;
        }, ($go$providerPointerValue: unicode__from_gostdlib.RangeTable): void => {
            named_unicode.UnicodeRangeTableOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
        });
    const __gotots_argument_2 = r;
    const __gotots_conversion_1 = __gotots_argument_1;
    if (unicode__from_gostdlib.Is(__gotots_conversion_1 === undefined ? undefined :
        (__gotots_conversion_1 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value, __gotots_argument_2)) {
        if (r >= minUnified && r <= maxUnified$int32) {
            return r + commonUnifiedOffset$int;
        }
        if (r >= minCompatibility$int32 && r <= maxCompatibility$int32) {
            return r + commonUnifiedOffset$int;
        }
        return r + rareUnifiedOffset$int;
    }
    return r + otherOffset$int;
}
