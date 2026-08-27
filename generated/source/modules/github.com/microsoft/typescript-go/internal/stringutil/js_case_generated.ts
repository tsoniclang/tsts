import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
export type specialCasingCondition = uint8;
export function specialCasingConditionNone$constant(): specialCasingCondition {
    return 0;
}
export function specialCasingConditionFinalSigma$constant(): specialCasingCondition {
    return 1;
}
export class specialCasingMapping {
    declare private readonly $goType: void;
    public constructor(public lower: gostring, public upper: gostring, public condition: specialCasingCondition) {
    }
    static $zero(): specialCasingMapping {
        return new specialCasingMapping("", "", 0);
    }
    static $copy($source: specialCasingMapping): specialCasingMapping {
        return new specialCasingMapping($source.lower, $source.upper, $source.condition);
    }
    declare private readonly then?: never;
}
