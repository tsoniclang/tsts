import type { Options as Options__from_jsonopts } from "../../../../go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Token$Storage as Token__from_jsontext$Storage } from "../../../../go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare BeginArray: Token__from_jsontext$Storage;
    declare BeginObject: Token__from_jsontext$Storage;
    declare EndArray: Token__from_jsontext$Storage;
    declare EndObject: Token__from_jsontext$Storage;
    declare Null: Token__from_jsontext$Storage;
    declare allowInvalid: RuntimeSlice<Options__from_jsonopts | undefined>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
