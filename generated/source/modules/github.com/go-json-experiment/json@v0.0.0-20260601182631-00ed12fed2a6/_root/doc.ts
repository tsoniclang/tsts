import type { GoArray } from "@gotots/runtime/array.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { GoMapHash } from "@gotots/runtime/map.js";
export class requireKeyedLiterals {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $zero(): requireKeyedLiterals {
        return new requireKeyedLiterals();
    }
    static $copy($source: requireKeyedLiterals): requireKeyedLiterals {
        return new requireKeyedLiterals();
    }
    static $equal($left: requireKeyedLiterals, $right: requireKeyedLiterals): bool {
        return true;
    }
    static $hash($source: requireKeyedLiterals): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
}
export class nonComparable {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoArray<(() => void) | undefined, 0>) {
    }
    declare private readonly then?: never;
}
