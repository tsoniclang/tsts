import type { Method } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/proto.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare ErrClientError: GoInterface | undefined;
    declare ErrConnClosed: GoInterface | undefined;
    declare ErrInvalidRequest: GoInterface | undefined;
    declare ErrRequestTimeout: GoInterface | undefined;
    declare _MessageType_index: GoArray<uint8, 8>;
    declare sessionIDCounter: atomic__from_gostdlib.Uint64;
    declare unmarshalers: GoMapValue<Method, (($0: RuntimeSlice<uint8>) => [
        $goInterface$Interface_void | undefined,
        GoInterface | undefined
    ]) | undefined>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
