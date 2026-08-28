import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Matcher as Matcher__from_language__package_1, Tag$Storage as Tag__from_language__package_1$Storage } from "../../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int32, int64 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/state.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { $state as $state__language__package_1, Low$constant as Low$constant__from_language__package_1, Tag as Tag__from_language__package_1 } from "../../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import { SameMap$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/SameMap.js";
import { $goInterfaceAdapter$MapOf_Named_diagnostics$Key_To_string, $goInterfaceAdapter$Named_language__package_1$Tag, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_diagnostics$Key_To_string as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { keyToMessage } from "./diagnostics_generated.js";
import { _Category_name$string } from "./stringer_generated.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type Category = int32;
export function CategoryWarning$constant(): Category {
    return 0;
}
export function CategoryError$constant(): Category {
    return 1;
}
export function CategorySuggestion$constant(): Category {
    return 2;
}
export function CategoryMessage$constant(): Category {
    return 3;
}
export function Category_Name(category: Category): gostring {
    switch (category) {
        case CategoryWarning$constant(): {
            return "warning";
            break;
        }
        case CategoryError$constant(): {
            return "error";
            break;
        }
        case CategorySuggestion$constant(): {
            return "suggestion";
            break;
        }
        case CategoryMessage$constant(): {
            return "message";
            break;
        }
    }
    const __gotots_argument_0 = new GoInterfaceAdapter("Unhandled diagnostic category");
    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export class Key {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export class Message {
    declare private readonly $goType: void;
    public constructor(public code: int32, public category: Category, public key: Key, public text: gostring, public reportsUnnecessary: bool, public elidedInCompatibilityPyramid: bool, public reportsDeprecated: bool) {
    }
    static $copy($source: Message): Message {
        return new Message($source.code, $source.category, $source.key, $source.text, $source.reportsUnnecessary, $source.elidedInCompatibilityPyramid, $source.reportsDeprecated);
    }
    static $equal($left: Message, $right: Message): bool {
        return $left.code === $right.code && $left.category === $right.category && $left.key.$value === $right.key.$value && $left.text === $right.text && $left.reportsUnnecessary === $right.reportsUnnecessary && $left.elidedInCompatibilityPyramid === $right.elidedInCompatibilityPyramid && $left.reportsDeprecated === $right.reportsDeprecated;
    }
    static $hash($source: Message): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.code));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.category));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.key.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.text));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.reportsUnnecessary));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.elidedInCompatibilityPyramid));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.reportsDeprecated));
        return $hash;
    }
    declare private readonly then?: never;
    static Category(m: {
        value: Message;
    } | undefined): Category {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.category;
    }
    static Code(m: {
        value: Message;
    } | undefined): int32 {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.code;
    }
    static ElidedInCompatibilityPyramid(m: {
        value: Message;
    } | undefined): bool {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elidedInCompatibilityPyramid;
    }
    static Key(m: {
        value: Message;
    } | undefined): Key {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.key;
    }
    static Localize(m: {
        value: Message;
    } | undefined, locale__shadow_1: Locale__from_locale, args: RuntimeSlice<GoInterface | undefined>): gostring {
        return Localize(Locale__from_locale.$copy(locale__shadow_1), m, new Key(""), StringifyArgs(args));
    }
    static ReportsDeprecated(m: {
        value: Message;
    } | undefined): bool {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsDeprecated;
    }
    static ReportsUnnecessary(m: {
        value: Message;
    } | undefined): bool {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsUnnecessary;
    }
    static String(m: {
        value: Message;
    } | undefined): gostring {
        return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.text;
    }
}
export function Localize(locale__shadow_1: Locale__from_locale, message: {
    value: Message;
} | undefined, key: Key, args: RuntimeSlice<gostring>): gostring {
    if (message === undefined) {
        message = keyToMessage(key);
    }
    if (message === undefined) {
        const __gotots_argument_1 = new GoInterfaceAdapter("Unknown diagnostic message: " + key.$value);
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
    }
    let text: Message["text"] = (message ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.text;
    {
        const __gotots_results_0 = getLocalizedMessages(Tag__from_language__package_1.$fromStorage(Locale__from_locale.$storageOf(Locale__from_locale.$copy(locale__shadow_1)))).lookupOk((message ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.key);
        let localized = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            text = localized;
        }
    }
    return Format(text, args);
}
export function getLocalizedMessages(loc: Tag__from_language__package_1): GoMapValue<Key, gostring> {
    if (Tag__from_language__package_1.$equal(loc, Tag__from_language__package_1.$fromStorage($state__language__package_1.Und))) {
        return GoMap.nil();
    }
    {
        const __gotots_results_3 = sync__from_gostdlib.Map.Load($state.localizedMessagesCache, new $goInterfaceAdapter$Named_language__package_1$Tag(Tag__from_language__package_1.$copy(loc)));
        let cached: GoInterface | undefined = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (ok) {
            if (cached === undefined) {
                return GoMap.nil();
            }
            return (($value: GoInterface | undefined): GoMapValue<Key, gostring> => {
                if (!$goInterfaceAdapter$MapOf_Named_diagnostics$Key_To_string.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(cached);
        }
    }
    let messages: GoMapValue<Key, gostring> = GoMap.nil();
    const __gotots_receiver_0 = $state.matcher;
    const __gotots_argument_2 = RuntimeSlice.literal<Tag__from_language__package_1$Storage>([Tag__from_language__package_1.$storageOf(Tag__from_language__package_1.$copy(loc))]);
    const __gotots_results_4 = goInterfaceNonNil<Matcher__from_language__package_1>(__gotots_receiver_0).Match(__gotots_argument_2);
    let index = __gotots_results_4[1];
    let confidence = __gotots_results_4[2];
    if (confidence.$value >= Low$constant__from_language__package_1().$value && index >= 0 && index < $state.localeFuncs.length) {
        {
            let fn: (() => GoMapValue<Key, gostring>) | undefined = $state.localeFuncs.get(index);
            if (!(fn === undefined)) {
                const __gotots_callee_0 = fn;
                messages = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
        }
    }
    sync__from_gostdlib.Map.Store($state.localizedMessagesCache, new $goInterfaceAdapter$Named_language__package_1$Tag(Tag__from_language__package_1.$copy(loc)), new $goInterfaceAdapter$MapOf_Named_diagnostics$Key_To_string(messages));
    return messages;
}
export function Format(text: gostring, args: RuntimeSlice<gostring>): gostring {
    if (args.length === 0) {
        return text;
    }
    args = SameMap$string(args, (arg: gostring): gostring => {
        return strings__from_gostdlib.ToValidUTF8(arg, "\u00EF\u00BF\u00BD");
    });
    const __gotots_receiver_1 = $state.placeholderRegexp;
    return regexp__from_gostdlib.Regexp.ReplaceAllStringFunc(__gotots_receiver_1 === void 0 ? void 0 :
        (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, text, (match: gostring): gostring => {
        const __gotots_results_5 = strconv__from_gostdlib.ParseInt(goStringSlice(match, 1, match.length - 1), BigInt.asIntN(64, goNumberToBigInt(10)), BigInt.asIntN(64, goNumberToBigInt(0)));
        const __gotots_results_6 = [__gotots_results_5[0], GoProviderInterfaceBridge.$from(__gotots_results_5[1])] satisfies [
            int64,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let index = __gotots_results_6[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_6[1];
        if (!(err === undefined) || globalThis.Number(BigInt.asIntN(64, index)) >= args.length) {
            const __gotots_argument_3 = new GoInterfaceAdapter("Invalid formatting placeholder");
            GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
        }
        return args.get(globalThis.Number(BigInt.asIntN(64, index)));
    });
}
export function StringifyArgs(args: RuntimeSlice<GoInterface | undefined>): RuntimeSlice<gostring> {
    if (args.length === 0) {
        return RuntimeSlice.nil<gostring>();
    }
    let result = RuntimeSlice.make<gostring>(args.length, null, "");
    const __gotots_range_0 = args;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let arg: GoInterface | undefined = __gotots_range_value_1;
        {
            const __gotots_results_1 = (($value: GoInterface | undefined): [
                gostring,
                boolean
            ] => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return ["", false];
                }
                return [$value.$go$value, true];
            })(arg);
            let s = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                result.set(i, s);
            }
            else {
                result.set(i, fmt__from_gostdlib.Sprintf("%v", RuntimeSlice.literal<GoInterface | undefined>([arg])));
            }
        }
    }
    return result;
}
export function Category_String(i: Category): gostring {
    let idx = i - 0;
    if (i < 0 || idx >= 4) {
        return "Category(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
    }
    return goStringSlice(_Category_name$string, $state._Category_index.get(idx), $state._Category_index.get(idx + 1));
}
