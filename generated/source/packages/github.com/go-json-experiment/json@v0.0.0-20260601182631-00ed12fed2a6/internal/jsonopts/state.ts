import type { Options, Struct, Struct$Storage as Struct__from_jsonopts$Storage } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare DefaultOptionsV1: Struct__from_jsonopts$Storage;
    declare DefaultOptionsV2: Struct__from_jsonopts$Storage;
    declare GetUnknownOption: (($0: Struct, $1: Options | undefined) => [
        GoInterface | undefined,
        bool
    ]) | undefined;
    declare JoinUnknownOption: (($0: Struct, $1: Options | undefined) => Struct) | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
