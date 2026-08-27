import type { Options as Options__from_jsonopts } from "../../../../go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { Clip$SliceOf_Named_jsonopts$Options$Named_jsonopts$Options } from "../../../../../../support/generics/concretizations/slices/Clip.js";
import { $state as $state__jsontext, AllowInvalidUTF8 as AllowInvalidUTF8__from_jsontext, Token as Token__from_jsontext } from "../../../../go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $state } from "./state.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.BeginArray = Token__from_jsontext.$storageOf(Token__from_jsontext.$zero());
    $state.BeginObject = Token__from_jsontext.$storageOf(Token__from_jsontext.$zero());
    $state.EndArray = Token__from_jsontext.$storageOf(Token__from_jsontext.$zero());
    $state.EndObject = Token__from_jsontext.$storageOf(Token__from_jsontext.$zero());
    $state.Null = Token__from_jsontext.$storageOf(Token__from_jsontext.$zero());
    $state.allowInvalid = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
    {
        $state.allowInvalid = Clip$SliceOf_Named_jsonopts$Options$Named_jsonopts$Options(RuntimeSlice.literal<Options__from_jsonopts | undefined>([AllowInvalidUTF8__from_jsontext(true)]));
    }
    {
        $state.BeginObject = Token__from_jsontext.$storageOf(Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginObject)));
    }
    {
        $state.EndObject = Token__from_jsontext.$storageOf(Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndObject)));
    }
    {
        $state.Null = Token__from_jsontext.$storageOf(Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.Null)));
    }
    {
        $state.BeginArray = Token__from_jsontext.$storageOf(Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.BeginArray)));
    }
    {
        $state.EndArray = Token__from_jsontext.$storageOf(Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__jsontext.EndArray)));
    }
}
export { AllowDuplicateNames, Deterministic, Marshal, MarshalEncode, MarshalIndent, MarshalIndentWrite, MarshalWrite, NewDecoder, Unmarshal, UnmarshalDecode, UnmarshalRead } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/json/json.js";
export { $state };
