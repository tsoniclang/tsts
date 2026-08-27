import { NopResetter, discard, nop } from "../../../../../modules/golang.org/x/text@v0.38.0/transform/transform.js";
import { $goInterfaceAdapter$Named_transform$nop, $goInterfaceAdapter$Named_transform$discard as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
export function $initialize(): void {
    $state.Discard = void 0;
    $state.ErrEndOfSpan = void 0;
    $state.ErrShortDst = void 0;
    $state.ErrShortSrc = void 0;
    $state.Nop = void 0;
    $state.errInconsistentByteCount = void 0;
    $state.errShortInternal = void 0;
    {
        $state.ErrShortDst = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("transform: short destination buffer"));
    }
    {
        $state.ErrShortSrc = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("transform: short source buffer"));
    }
    {
        $state.ErrEndOfSpan = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("transform: input and output are not identical"));
    }
    {
        $state.errInconsistentByteCount = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("transform: inconsistent byte count returned"));
    }
    {
        $state.errShortInternal = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("transform: short internal buffer"));
    }
    {
        $state.Discard = new GoInterfaceAdapter(new discard(NopResetter.$zero()));
    }
    {
        $state.Nop = new $goInterfaceAdapter$Named_transform$nop(new nop(NopResetter.$zero()));
    }
}
export { NopResetter, SpanningTransformer, SpanningTransformer$contract, SpanningTransformer$is, Transformer, Transformer$contract, Transformer$is } from "../../../../../modules/golang.org/x/text@v0.38.0/transform/transform.js";
export { $state };
