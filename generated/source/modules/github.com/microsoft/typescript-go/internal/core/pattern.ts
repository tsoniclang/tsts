import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { $goContainerStorageType, GoContainerStorage, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type Pattern$Storage = {
    Text: gostring;
    StarIndex: int;
};
export class Pattern implements GoContainerStoredValue<Pattern$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Pattern$Storage) {
    }
    public static $storageOf($source: Pattern): Pattern$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Pattern$Storage): Pattern {
        return new Pattern($source);
    }
    public get Text(): gostring {
        return this.$storage.Text;
    }
    public set Text($value: gostring) {
        this.$storage.Text = $value;
    }
    public get StarIndex(): int {
        return this.$storage.StarIndex;
    }
    public set StarIndex($value: int) {
        this.$storage.StarIndex = $value;
    }
    declare readonly [$goContainerStorageType]: Pattern$Storage;
    static $zero(): Pattern {
        return new Pattern({
            Text: "",
            StarIndex: 0
        });
    }
    static $copy($source: Pattern): Pattern {
        return new Pattern({
            Text: $source.$storage.Text,
            StarIndex: $source.$storage.StarIndex
        });
    }
    static $equal($left: Pattern, $right: Pattern): bool {
        return $left.$storage.Text === $right.$storage.Text && $left.$storage.StarIndex === $right.$storage.StarIndex;
    }
    static $hash($source: Pattern): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Text));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.StarIndex));
        return $hash;
    }
    static $zeroStorage(): Pattern$Storage {
        return {
            Text: "",
            StarIndex: 0
        };
    }
    declare private readonly then?: never;
    static IsValid(p: Pattern | undefined): bool {
        return Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex === -1 || Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex < Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Text.length;
    }
    static MatchedText(p: Pattern | undefined, candidate: gostring): gostring {
        if (!Pattern.Matches(p, candidate)) {
            const __gotots_argument_0 = new GoInterfaceAdapter("candidate does not match pattern");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        if (Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex === -1) {
            return "";
        }
        return goStringSlice(candidate, Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex, candidate.length - Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Text.length + Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex + 1);
    }
    static Matches(p: Pattern | undefined, candidate: gostring): bool {
        if (Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex === -1) {
            return Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Text === candidate;
        }
        return candidate.length >= Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Text.length - 1 && strings__from_gostdlib.HasPrefix(candidate, goStringSlice(Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Text, 0, Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex)) && strings__from_gostdlib.HasSuffix(candidate, goStringSlice(Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Text, Pattern.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).StarIndex + 1));
    }
}
export function TryParsePattern(pattern: gostring): Pattern {
    let starIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(pattern, "*")));
    if (starIndex === -1 || !strings__from_gostdlib.Contains(goStringSlice(pattern, starIndex + 1), "*")) {
        return Pattern.$fromStorage({
            Text: pattern,
            StarIndex: starIndex
        });
    }
    return Pattern.$fromStorage({
        Text: "",
        StarIndex: 0
    });
}
export function FindBestPatternMatch$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$zero$void_to_T0: () => T, values: RuntimeSlice<GoContainerStorage<T>>, getPattern: (($0: T) => Pattern) | undefined, candidate: gostring): T {
    let bestPattern: T = $go$zero$void_to_T0();
    let longestMatchPrefixLength = -1;
    const __gotots_range_0 = values;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_0.get(__gotots_range_index_0)));
        let value: T = __gotots_range_value_0;
        const __gotots_callee_0 = getPattern;
        const __gotots_argument_1 = $go$copy$T0_to_T0(value);
        let pattern = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        if ((Pattern.$storageOf(pattern).StarIndex === -1 || Pattern.$storageOf(pattern).StarIndex > longestMatchPrefixLength) && Pattern.Matches(pattern, candidate)) {
            bestPattern = $go$copy$T0_to_T0(value);
            longestMatchPrefixLength = Pattern.$storageOf(pattern).StarIndex;
        }
    }
    return $go$copy$T0_to_T0(bestPattern);
}
