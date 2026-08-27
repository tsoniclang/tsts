import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type * as reflect from "@gotots/gostdlib/reflect.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Expected as Expected__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/expected.js";
import { $goReflectType$MapOf_string_To_string, $goReflectType$string } from "../../../../../../../reflection-types.js";
export function Expected$ExpectedJSONType$MapOf_string_To_string($argument0: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<GoMapValue<gostring, gostring>>> | undefined): gostring {
    return Expected__from_packagejson.ExpectedJSONType$kernel<GoMapValue<gostring, gostring>>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<GoMapValue<gostring, gostring>> | undefined): reflect.Type | undefined => {
        return $goReflectType$MapOf_string_To_string;
    });
}
export function Expected$ExpectedJSONType$string($argument0: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>> | undefined): gostring {
    return Expected__from_packagejson.ExpectedJSONType$kernel<gostring>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): reflect.Type | undefined => {
        return $goReflectType$string;
    });
}
