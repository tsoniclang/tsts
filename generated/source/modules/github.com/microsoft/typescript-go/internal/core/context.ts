import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$Named_core$CheckerLifetime, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_core$key as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
export class key {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function requestIDKey$constant(): key {
    return new key(0);
}
export function checkerLifetimeKey$constant(): key {
    return new key(1);
}
export function WithRequestID(ctx: GoInterface | undefined, id: gostring): GoInterface | undefined {
    const __gotots_argument_0 = ctx;
    const __gotots_argument_1 = new GoInterfaceAdapter(requestIDKey$constant());
    const __gotots_argument_2 = new $goInterfaceAdapter$string(id);
    return GoProviderProfileBridge.$from(provider_context.ContextWithValueDirect(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1, __gotots_argument_2));
}
export function GetRequestID(ctx: GoInterface | undefined): gostring {
    {
        const __gotots_receiver_1 = ctx;
        const __gotots_argument_7 = new GoInterfaceAdapter(requestIDKey$constant());
        const __gotots_results_1 = (($value: $goInterface$Interface_void | undefined): [
            gostring,
            boolean
        ] => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return ["", false];
            }
            return [$value.$go$value, true];
        })(goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Value(__gotots_argument_7));
        let id = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (ok) {
            return id;
        }
    }
    return "";
}
export class CheckerLifetime {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function CheckerLifetimeTemporary$constant(): CheckerLifetime {
    return new CheckerLifetime(0);
}
export function CheckerLifetimeDiagnostics$constant(): CheckerLifetime {
    return new CheckerLifetime(1);
}
export function CheckerLifetimeAPI$constant(): CheckerLifetime {
    return new CheckerLifetime(2);
}
export function WithCheckerLifetime(ctx: GoInterface | undefined, lifetime: CheckerLifetime): GoInterface | undefined {
    const __gotots_argument_3 = ctx;
    const __gotots_argument_4 = new GoInterfaceAdapter(checkerLifetimeKey$constant());
    const __gotots_argument_5 = new $goInterfaceAdapter$Named_core$CheckerLifetime(lifetime);
    return GoProviderProfileBridge.$from(provider_context.ContextWithValueDirect(GoProviderProfileBridge.$to(__gotots_argument_3), __gotots_argument_4, __gotots_argument_5));
}
export function GetCheckerLifetime(ctx: GoInterface | undefined): CheckerLifetime {
    {
        const __gotots_receiver_0 = ctx;
        const __gotots_argument_6 = new GoInterfaceAdapter(checkerLifetimeKey$constant());
        const __gotots_results_0 = (($value: $goInterface$Interface_void | undefined): [
            CheckerLifetime,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$CheckerLifetime.$is($value)) {
                return [new CheckerLifetime(0), false];
            }
            return [$value.$go$value, true];
        })(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Value(__gotots_argument_6));
        let lifetime = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            return lifetime;
        }
    }
    return CheckerLifetimeTemporary$constant();
}
