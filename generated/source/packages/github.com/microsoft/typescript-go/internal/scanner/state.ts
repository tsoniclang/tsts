import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { regularExpressionFlags } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/scanner/regexp.js";
import type { Kind as Kind__from_ast } from "../ast/package.js";
import type { Set as Set__from_collections } from "../collections/package.js";
import type { ScriptTarget as ScriptTarget__from_core } from "../core/package.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare binaryUnicodeProperties: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
    declare binaryUnicodePropertiesOfStrings: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
    declare charCodeToRegExpFlag: GoMapValue<int32, regularExpressionFlags>;
    declare maxAsciiCharacter: uint8;
    declare mergeConflictMarkerLength: int;
    declare nonBinaryUnicodeProperties: GoMapValue<gostring, gostring>;
    declare regExpFlagToFirstAvailableLanguageVersion: GoMapValue<regularExpressionFlags, ScriptTarget__from_core>;
    declare scriptValues: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
    declare textToKeyword: GoMapValue<gostring, Kind__from_ast>;
    declare textToToken: GoMapValue<gostring, Kind__from_ast>;
    declare tokenToText: GoArray<gostring, 351>;
    declare valuesOfNonBinaryUnicodeProperties: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
