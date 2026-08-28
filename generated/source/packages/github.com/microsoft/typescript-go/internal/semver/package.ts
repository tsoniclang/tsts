import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { gostring, uint32 } from "@gotots/runtime/scalars.js";
import { Version } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/semver/version.js";
import { $state } from "./state.js";
import * as provider_regexp from "@gotots/gostdlib/internal/facets/provider-regexp.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.buildPartRegExp = void 0;
    $state.buildRegExp = void 0;
    $state.hyphenRegExp = void 0;
    $state.logicalOrRegExp = void 0;
    $state.numericIdentifierRegExp = void 0;
    $state.partialRegExp = void 0;
    $state.prereleasePartRegexp = void 0;
    $state.prereleaseRegexp = void 0;
    $state.rangeRegExp = void 0;
    $state.versionRegexp = void 0;
    $state.versionZero = Version.$storageOf(Version.$zero());
    $state.whitespaceRegExp = void 0;
    {
        const __gotots_conversion_0 = regexp__from_gostdlib.MustCompile("(?i)^(0|[1-9]\\d*)(?:\\.(0|[1-9]\\d*)(?:\\.(0|[1-9]\\d*)(?:-([a-z0-9-.]+))?(?:\\+([a-z0-9-.]+))?)?)?$");
        $state.versionRegexp = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_0, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_1 = regexp__from_gostdlib.MustCompile("(?i)^(?:0|[1-9]\\d*|[a-z-][a-z0-9-]*)(?:\\.(?:0|[1-9]\\d*|[a-zA-Z-][a-zA-Z0-9-]*))*$");
        $state.prereleaseRegexp = __gotots_conversion_1 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_1, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_1;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_1, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_2 = regexp__from_gostdlib.MustCompile("(?i)^(?:0|[1-9]\\d*|[a-z-][a-z0-9-]*)$");
        $state.prereleasePartRegexp = __gotots_conversion_2 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_2, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_2;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_2, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_3 = regexp__from_gostdlib.MustCompile("(?i)^[a-z0-9-]+(?:\\.[a-z0-9-]+)*$");
        $state.buildRegExp = __gotots_conversion_3 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_3, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_3;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_4 = regexp__from_gostdlib.MustCompile("(?i)^[a-z0-9-]+$");
        $state.buildPartRegExp = __gotots_conversion_4 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_4, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_4;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_5 = regexp__from_gostdlib.MustCompile("^(?:0|[1-9]\\d*)$");
        $state.numericIdentifierRegExp = __gotots_conversion_5 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_5, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_5;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_5, $go$providerPointerValue);
            });
    }
    {
        $state.versionZero =
            (void Version.$storageOf, (void Version.$fromStorage,
                {
                    prerelease: RuntimeSlice.literal<gostring>(["0"]),
                    major: 0,
                    minor: 0,
                    patch: 0,
                    build: RuntimeSlice.nil<gostring>()
                }));
    }
    {
        const __gotots_conversion_6 = regexp__from_gostdlib.MustCompile("\\|\\|");
        $state.logicalOrRegExp = __gotots_conversion_6 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_6, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_6;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_6, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_7 = regexp__from_gostdlib.MustCompile("\\s+");
        $state.whitespaceRegExp = __gotots_conversion_7 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_7, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_7;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_7, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_8 = regexp__from_gostdlib.MustCompile("(?i)^([x*0]|[1-9]\\d*)(?:\\.([x*0]|[1-9]\\d*)(?:\\.([x*0]|[1-9]\\d*)(?:-([a-z0-9-.]+))?(?:\\+([a-z0-9-.]+))?)?)?$");
        $state.partialRegExp = __gotots_conversion_8 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_8, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_8;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_8, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_9 = regexp__from_gostdlib.MustCompile("(?i)^\\s*([a-z0-9-+.*]+)\\s+-\\s+([a-z0-9-+.*]+)\\s*$");
        $state.hyphenRegExp = __gotots_conversion_9 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_9, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_9;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_9, $go$providerPointerValue);
            });
    }
    {
        const __gotots_conversion_10 = regexp__from_gostdlib.MustCompile("(?i)^([~^<>=]|<=|>=)?\\s*([a-z0-9-+.*]+)$");
        $state.rangeRegExp = __gotots_conversion_10 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_10, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_10;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_10, $go$providerPointerValue);
            });
    }
}
export { MustParse, SemverParseError, TryParseVersion, Version, Version$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/semver/version.js";
export { TryParseVersionRange, VersionRange } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/semver/version_range.js";
