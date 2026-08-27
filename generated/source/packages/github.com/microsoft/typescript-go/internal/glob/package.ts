import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
export function $initialize(): void {
    $state.errBadRange = void 0;
    $state.errInvalidUTF8 = void 0;
    {
        $state.errBadRange = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("'[' patterns must be of the form [x-y]"));
    }
    {
        $state.errInvalidUTF8 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid UTF-8 encoding"));
    }
}
export { Glob, Parse } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/glob/glob.js";
