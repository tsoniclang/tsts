import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_math_big from "@gotots/gostdlib/internal/facets/named-math-big.js";
import * as big__from_gostdlib from "@gotots/gostdlib/math/big.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export class PseudoBigInt {
    declare private readonly $goType: void;
    public constructor(public Negative: bool, public Base10Value: gostring) {
    }
    static $copy($source: PseudoBigInt): PseudoBigInt {
        return new PseudoBigInt($source.Negative, $source.Base10Value);
    }
    static $equal($left: PseudoBigInt, $right: PseudoBigInt): bool {
        return $left.Negative === $right.Negative && $left.Base10Value === $right.Base10Value;
    }
    static $hash($source: PseudoBigInt): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.Negative));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Base10Value));
        return $hash;
    }
    declare private readonly then?: never;
    String(): gostring {
        if (this.Base10Value.length === 0) {
            return "0";
        }
        if (this.Negative) {
            return "-" + this.Base10Value;
        }
        return this.Base10Value;
    }
}
export function NewPseudoBigInt(value: gostring, negative: bool): PseudoBigInt {
    value = strings__from_gostdlib.TrimLeft(value, "0");
    return new PseudoBigInt(negative && value.length !== 0, value);
}
export function ParseValidBigInt(text: gostring): PseudoBigInt {
    const __gotots_results_3 = strings__from_gostdlib.CutPrefix(text, "-");
    text = __gotots_results_3[0];
    let negative = __gotots_results_3[1];
    return NewPseudoBigInt(ParsePseudoBigInt(text), negative);
}
export function ParsePseudoBigInt(stringValue: gostring): gostring {
    stringValue = strings__from_gostdlib.TrimSuffix(stringValue, "n");
    let b1 = 0;
    if (stringValue.length > 1) {
        b1 = goStringIndex(stringValue, 1);
    }
    switch (b1) {
        case 98:
        case 66:
        case 111:
        case 79:
        case 120:
        case 88: {
            break;
        }
        default: {
            stringValue = strings__from_gostdlib.TrimLeft(stringValue, "0");
            if (stringValue === "") {
                return "0";
            }
            return stringValue;
            break;
        }
    }
    const __gotots_receiver_0 = tsonicTypeScriptRuntime.location<big__from_gostdlib.Int>(named_math_big.MathBigIntOperations.$zero());
    const __gotots_results_0 = big__from_gostdlib.Int.SetString(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value, stringValue, BigInt.asIntN(64, goNumberToBigInt(0)));
    const __gotots_conversion_0 = __gotots_results_0[0];
    const __gotots_results_1 = [__gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Int>(__gotots_conversion_0, (): big__from_gostdlib.Int => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: big__from_gostdlib.Int): void => {
                named_math_big.MathBigIntOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            }), __gotots_results_0[1]] satisfies [
        tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int> | undefined,
        bool
    ];
    let bi: tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int> | undefined = __gotots_results_1[0];
    let ok = __gotots_results_1[1];
    if (!ok) {
        const __gotots_argument_0 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Failed to parse big int: %q", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(stringValue)])));
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    const __gotots_receiver_1 = bi;
    return big__from_gostdlib.Int.String(__gotots_receiver_1 === void 0 ? void 0 :
        (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value);
}
