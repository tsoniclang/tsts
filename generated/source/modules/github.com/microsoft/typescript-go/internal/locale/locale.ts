import type { ID as ID__from_compact } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/compact/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { fullTag as fullTag__from_compact } from "../../../../../golang.org/x/text@v0.38.0/internal/language/compact/language.js";
import type { bool, gostring, int, uint16 } from "@gotots/runtime/scalars.js";
import { Parse as Parse__from_language__package_1, Tag as Tag__from_language__package_1 } from "../../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import { $goInterfaceAdapter$Named_locale$Locale, $goInterfaceAdapter$Named_locale$contextKey as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
export class contextKey {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export type Locale$Storage = {
    language: uint16;
    locale: uint16;
    full: fullTag__from_compact | undefined;
};
export class Locale {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Locale$Storage) {
    }
    public static $storageOf($source: Locale): Locale$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Locale$Storage): Locale {
        return new Locale($source);
    }
    public get language(): ID__from_compact {
        return this.$storage.language;
    }
    public set language($value: ID__from_compact) {
        this.$storage.language = $value;
    }
    public get locale(): ID__from_compact {
        return this.$storage.locale;
    }
    public set locale($value: ID__from_compact) {
        this.$storage.locale = $value;
    }
    public get full(): fullTag__from_compact | undefined {
        return this.$storage.full;
    }
    public set full($value: fullTag__from_compact | undefined) {
        this.$storage.full = $value;
    }
    static $zero(): Locale {
        return new Locale({
            language: 0,
            locale: 0,
            full: void 0
        });
    }
    static $copy($source: Locale): Locale {
        return new Locale({
            language: $source.$storage.language,
            locale: $source.$storage.locale,
            full: $source.$storage.full
        });
    }
    static $equal($left: Locale, $right: Locale): bool {
        return $left.$storage.language === $right.$storage.language && $left.$storage.locale === $right.$storage.locale && goInterfaceEqual($left.$storage.full, $right.$storage.full);
    }
    static $hash($source: Locale): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.language));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.locale));
        $hash = GoMapHash.mix($hash, $source.$storage.full === undefined ? 0 : $source.$storage.full.$go$hash());
        return $hash;
    }
    static $zeroStorage(): Locale$Storage {
        return {
            language: 0,
            locale: 0,
            full: void 0
        };
    }
    declare private readonly then?: never;
}
export function WithLocale(ctx: GoInterface | undefined, locale: Locale): GoInterface | undefined {
    const __gotots_argument_0 = ctx;
    const __gotots_argument_1 = new GoInterfaceAdapter(new contextKey(0));
    const __gotots_argument_2 = new $goInterfaceAdapter$Named_locale$Locale(Locale.$copy(locale));
    return GoProviderProfileBridge.$from(provider_context.ContextWithValueDirect(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1, __gotots_argument_2));
}
export function FromContext(ctx: GoInterface | undefined): Locale {
    const __gotots_receiver_0 = ctx;
    const __gotots_argument_3 = new GoInterfaceAdapter(new contextKey(0));
    const __gotots_results_1 = (($value: $goInterface$Interface_void | undefined): [
        Locale,
        boolean
    ] => {
        if (!$goInterfaceAdapter$Named_locale$Locale.$is($value)) {
            return [Locale.$zero(), false];
        }
        return [Locale.$copy($value.$go$value), true];
    })(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Value(__gotots_argument_3));
    let locale = Locale.$copy(__gotots_results_1[0]);
    return Locale.$copy(locale);
}
export function Parse(localeStr: gostring): [
    Locale,
    bool
] {
    let locale: Locale = Locale.$zero();
    let ok: bool = false;
    const __gotots_results_0 = Parse__from_language__package_1(localeStr);
    let tag = __gotots_results_0[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
    return [Locale.$fromStorage(Tag__from_language__package_1.$storageOf(Tag__from_language__package_1.$copy(tag))), err === undefined];
}
