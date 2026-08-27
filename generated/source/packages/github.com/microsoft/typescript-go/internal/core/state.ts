import type { CompilerOptions, ModuleKind, ModuleResolutionKind } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare EmptyCompilerOptions: {
        value: CompilerOptions;
    } | undefined;
    declare ExclusivelyPrefixedNodeCoreModules: GoMapValue<gostring, bool>;
    declare ModuleKindToModuleResolutionKind: GoMapValue<ModuleKind, ModuleResolutionKind>;
    declare NodeCoreModules: (() => GoMapValue<gostring, bool>) | undefined;
    declare UnprefixedNodeCoreModules: GoMapValue<gostring, bool>;
    declare _LanguageVariant_index: GoArray<uint8, 3>;
    declare _ModuleKind_index_0: GoArray<uint8, 9>;
    declare _ModuleKind_index_1: GoArray<uint8, 5>;
    declare _ModuleKind_index_2: GoArray<uint8, 3>;
    declare _ScriptKind_index: GoArray<uint8, 9>;
    declare _ScriptTarget_index_0: GoArray<uint8, 14>;
    declare _ScriptTarget_index_1: GoArray<uint8, 3>;
    declare _Tristate_index: GoArray<uint8, 4>;
    declare levenshteinBuffersPool: sync__from_gostdlib.Pool;
    declare optionsType: reflect__from_gostdlib.Type | undefined;
    declare version: gostring;
    declare versionMajorMinor: gostring;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
