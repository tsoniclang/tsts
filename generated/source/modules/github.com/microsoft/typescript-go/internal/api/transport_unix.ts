import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { $goProviderInterfaceBridge$Named_net$Listener, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as net__from_gostdlib from "@gotots/gostdlib/net.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as path__from_gostdlib from "@gotots/gostdlib/path.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function newPipeListener(path__shadow_1: gostring): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    GoProviderInterfaceBridge.$from(os__from_gostdlib.Remove(path__shadow_1));
    const __gotots_results_0 = net__from_gostdlib.Listen("unix", path__shadow_1);
    return [$goProviderInterfaceBridge$Named_net$Listener.$from(__gotots_results_0[0]), GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export function GeneratePipePath(name: gostring): gostring {
    return path__from_gostdlib.Join(RuntimeSlice.literal<gostring>([os__from_gostdlib.TempDir(), name]));
}
