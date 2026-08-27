import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Version$Storage as Version__from_semver$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/semver/version.js";
import type * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
export class $PackageState {
    declare buildPartRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare buildRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare hyphenRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare logicalOrRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare numericIdentifierRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare partialRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare prereleasePartRegexp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare prereleaseRegexp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare rangeRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare versionRegexp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare versionZero: Version__from_semver$Storage;
    declare whitespaceRegExp: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
