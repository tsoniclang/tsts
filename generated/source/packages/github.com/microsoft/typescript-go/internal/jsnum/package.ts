import { MaxSafeInteger$constant, MinSafeInteger$constant, Number } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/jsnum.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
export function $initialize(): void {
    MaxSafeInteger = MaxSafeInteger$constant();
    MinSafeInteger = MinSafeInteger$constant();
    $state.errUnknownPrefix = void 0;
    $state.negativeZero =
        ((void Number,
            0) as number);
    {
        $state.negativeZero =
            ((void Number,
                math__from_gostdlib.Copysign(0, -1)) as number);
    }
    {
        $state.errUnknownPrefix = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("unknown number prefix"));
    }
}
export { Inf, MaxSafeInteger$constant, MinSafeInteger$constant, NaN, Number } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/jsnum.js";
export { NewPseudoBigInt, ParsePseudoBigInt, ParseValidBigInt, PseudoBigInt } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/pseudobigint.js";
export { FromString } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/string.js";
export let MaxSafeInteger: ReturnType<typeof MaxSafeInteger$constant>;
export let MinSafeInteger: ReturnType<typeof MinSafeInteger$constant>;
