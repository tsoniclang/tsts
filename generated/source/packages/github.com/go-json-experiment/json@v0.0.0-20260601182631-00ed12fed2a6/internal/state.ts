import type { NotForPublicUse$Storage as NotForPublicUse__from_internal$Storage } from "../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/internal.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare AllowInternalUse: NotForPublicUse__from_internal$Storage;
    declare ErrCycle: GoInterface | undefined;
    declare ErrNilInterface: GoInterface | undefined;
    declare ErrNonNilReference: GoInterface | undefined;
    declare NewMarshalerError: (($0: $goInterface$Interface_void | undefined, $1: GoInterface | undefined, $2: gostring) => GoInterface | undefined) | undefined;
    declare NewRawNumber: (() => $goInterface$Interface_void | undefined) | undefined;
    declare RawNumberOf: (($0: RuntimeSlice<uint8>) => $goInterface$Interface_void | undefined) | undefined;
    declare TransformMarshalError: (($0: $goInterface$Interface_void | undefined, $1: GoInterface | undefined) => GoInterface | undefined) | undefined;
    declare TransformUnmarshalError: (($0: $goInterface$Interface_void | undefined, $1: GoInterface | undefined) => GoInterface | undefined) | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
