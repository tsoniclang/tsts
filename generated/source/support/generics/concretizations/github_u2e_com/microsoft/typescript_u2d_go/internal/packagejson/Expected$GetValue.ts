import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Expected as Expected__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/expected.js";
import { GoMap } from "@gotots/runtime/map.js";
export function Expected$GetValue$MapOf_string_To_string($argument0: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<GoMapValue<gostring, gostring>>> | undefined): [
    GoMapValue<gostring, gostring>,
    bool
] {
    return Expected__from_packagejson.GetValue$kernel<GoMapValue<gostring, gostring>>($argument0, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
        return $argument0;
    }, (): GoMapValue<gostring, gostring> => {
        return GoMap.nil<gostring, gostring>("");
    });
}
export function Expected$GetValue$string($argument0: tsonicTypeScriptRuntime.Location<Expected__from_packagejson<gostring>> | undefined): [
    gostring,
    bool
] {
    return Expected__from_packagejson.GetValue$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    });
}
