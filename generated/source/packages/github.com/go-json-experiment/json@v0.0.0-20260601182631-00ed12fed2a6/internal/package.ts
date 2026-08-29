import { NotForPublicUse } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/internal.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
export function $initialize(): void {
    $state.AllowInternalUse = NotForPublicUse.$zeroStorage();
    $state.ErrCycle = void 0;
    $state.ErrNilInterface = void 0;
    $state.ErrNonNilReference = void 0;
    $state.NewMarshalerError = void 0;
    $state.NewRawNumber = void 0;
    $state.RawNumberOf = void 0;
    $state.TransformMarshalError = void 0;
    $state.TransformUnmarshalError = void 0;
    {
        $state.ErrCycle = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("encountered a cycle"));
    }
    {
        $state.ErrNonNilReference = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("value must be passed as a non-nil pointer reference"));
    }
    {
        $state.ErrNilInterface = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("cannot derive concrete type for nil interface with finite type set"));
    }
}
export { ExpJSONFormat$bool } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/exp_jsonformat_off.js";
export { NotForPublicUse, NotForPublicUse$Storage } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/internal.js";
export { $state };
