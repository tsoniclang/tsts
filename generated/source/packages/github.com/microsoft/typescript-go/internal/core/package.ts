import type { ModuleKind, ModuleResolutionKind } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int32, uint8 } from "@gotots/runtime/scalars.js";
import { CompilerOptions, JsxEmitNone$constant, JsxEmitPreserve$constant, JsxEmitReact$constant, JsxEmitReactJSX$constant, JsxEmitReactJSXDev$constant, JsxEmitReactNative$constant, ModuleDetectionKindAuto$constant, ModuleDetectionKindForce$constant, ModuleDetectionKindLegacy$constant, ModuleDetectionKindNone$constant, ModuleKindAMD$constant, ModuleKindCommonJS$constant, ModuleKindES2015$constant, ModuleKindES2020$constant, ModuleKindES2022$constant, ModuleKindESNext$constant, ModuleKindNode16$constant, ModuleKindNode18$constant, ModuleKindNode20$constant, ModuleKindNodeNext$constant, ModuleKindNone$constant, ModuleKindPreserve$constant, ModuleKindSystem$constant, ModuleKindUMD$constant, ModuleResolutionKindBundler$constant, ModuleResolutionKindClassic$constant, ModuleResolutionKindNode10$constant, ModuleResolutionKindNode16$constant, ModuleResolutionKindNodeNext$constant, ModuleResolutionKindUnknown$constant, NewLineKindCRLF$constant, NewLineKindLF$constant, NewLineKindNone$constant, ResolutionModeCommonJS$constant, ResolutionModeESM$constant, ResolutionModeNone$constant, ScriptTargetES2015$constant, ScriptTargetES2016$constant, ScriptTargetES2017$constant, ScriptTargetES2018$constant, ScriptTargetES2019$constant, ScriptTargetES2020$constant, ScriptTargetES2021$constant, ScriptTargetES2022$constant, ScriptTargetES2023$constant, ScriptTargetES2024$constant, ScriptTargetES2025$constant, ScriptTargetES5$constant, ScriptTargetESNext$constant, ScriptTargetLatest$constant, ScriptTargetLatestStandard$constant, ScriptTargetNone$constant, noCopy } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import { CheckerLifetimeAPI$constant, CheckerLifetimeDiagnostics$constant, CheckerLifetimeTemporary$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/context.js";
import { levenshteinBuffers } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { LanguageVariantJSX$constant, LanguageVariantStandard$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/languagevariant.js";
import { ScriptKindDeferred$constant, ScriptKindExternal$constant, ScriptKindJS$constant, ScriptKindJSON$constant, ScriptKindJSX$constant, ScriptKindTS$constant, ScriptKindTSX$constant, ScriptKindUnknown$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/scriptkind.js";
import { UnlimitedSemaphore } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/semaphore.js";
import { TSFalse$constant, TSTrue$constant, TSUnknown$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/tristate.js";
import { PollingKindDynamicPriority$constant, PollingKindFixedChunkSize$constant, PollingKindFixedInterval$constant, PollingKindPriorityInterval$constant, WatchDirectoryKindDynamicPriorityPolling$constant, WatchDirectoryKindFixedChunkSizePolling$constant, WatchDirectoryKindFixedPollingInterval$constant, WatchDirectoryKindUseFsEvents$constant, WatchFileKindDynamicPriorityPolling$constant, WatchFileKindFixedChunkSizePolling$constant, WatchFileKindFixedPollingInterval$constant, WatchFileKindPriorityPollingInterval$constant, WatchFileKindUseFsEvents$constant, WatchFileKindUseFsEventsOnParentDirectory$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/watchoptions.js";
import { Copy$MapOf_string_To_bool$MapOf_string_To_bool$string$bool } from "../../../../../../support/generics/concretizations/maps/Copy.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_core$levenshteinBuffers as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goReflectType$Named_core$CompilerOptions } from "../../../../../../support/reflection-types.js";
import { $state } from "./state.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoArray } from "@gotots/runtime/array.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function $initialize(): void {
    CheckerLifetimeAPI = CheckerLifetimeAPI$constant();
    CheckerLifetimeDiagnostics = CheckerLifetimeDiagnostics$constant();
    CheckerLifetimeTemporary = CheckerLifetimeTemporary$constant();
    JsxEmitNone = JsxEmitNone$constant();
    JsxEmitPreserve = JsxEmitPreserve$constant();
    JsxEmitReact = JsxEmitReact$constant();
    JsxEmitReactJSX = JsxEmitReactJSX$constant();
    JsxEmitReactJSXDev = JsxEmitReactJSXDev$constant();
    JsxEmitReactNative = JsxEmitReactNative$constant();
    LanguageVariantJSX = LanguageVariantJSX$constant();
    LanguageVariantStandard = LanguageVariantStandard$constant();
    ModuleDetectionKindAuto = ModuleDetectionKindAuto$constant();
    ModuleDetectionKindForce = ModuleDetectionKindForce$constant();
    ModuleDetectionKindLegacy = ModuleDetectionKindLegacy$constant();
    ModuleDetectionKindNone = ModuleDetectionKindNone$constant();
    ModuleKindAMD = ModuleKindAMD$constant();
    ModuleKindCommonJS = ModuleKindCommonJS$constant();
    ModuleKindES2015 = ModuleKindES2015$constant();
    ModuleKindES2020 = ModuleKindES2020$constant();
    ModuleKindES2022 = ModuleKindES2022$constant();
    ModuleKindESNext = ModuleKindESNext$constant();
    ModuleKindNode16 = ModuleKindNode16$constant();
    ModuleKindNode18 = ModuleKindNode18$constant();
    ModuleKindNode20 = ModuleKindNode20$constant();
    ModuleKindNodeNext = ModuleKindNodeNext$constant();
    ModuleKindNone = ModuleKindNone$constant();
    ModuleKindPreserve = ModuleKindPreserve$constant();
    ModuleKindSystem = ModuleKindSystem$constant();
    ModuleKindUMD = ModuleKindUMD$constant();
    ModuleResolutionKindBundler = ModuleResolutionKindBundler$constant();
    ModuleResolutionKindClassic = ModuleResolutionKindClassic$constant();
    ModuleResolutionKindNode10 = ModuleResolutionKindNode10$constant();
    ModuleResolutionKindNode16 = ModuleResolutionKindNode16$constant();
    ModuleResolutionKindNodeNext = ModuleResolutionKindNodeNext$constant();
    ModuleResolutionKindUnknown = ModuleResolutionKindUnknown$constant();
    NewLineKindCRLF = NewLineKindCRLF$constant();
    NewLineKindLF = NewLineKindLF$constant();
    NewLineKindNone = NewLineKindNone$constant();
    PollingKindDynamicPriority = PollingKindDynamicPriority$constant();
    PollingKindFixedChunkSize = PollingKindFixedChunkSize$constant();
    PollingKindFixedInterval = PollingKindFixedInterval$constant();
    PollingKindPriorityInterval = PollingKindPriorityInterval$constant();
    ResolutionModeCommonJS = ResolutionModeCommonJS$constant();
    ResolutionModeESM = ResolutionModeESM$constant();
    ResolutionModeNone = ResolutionModeNone$constant();
    ScriptKindDeferred = ScriptKindDeferred$constant();
    ScriptKindExternal = ScriptKindExternal$constant();
    ScriptKindJS = ScriptKindJS$constant();
    ScriptKindJSON = ScriptKindJSON$constant();
    ScriptKindJSX = ScriptKindJSX$constant();
    ScriptKindTS = ScriptKindTS$constant();
    ScriptKindTSX = ScriptKindTSX$constant();
    ScriptKindUnknown = ScriptKindUnknown$constant();
    ScriptTargetES2015 = ScriptTargetES2015$constant();
    ScriptTargetES2016 = ScriptTargetES2016$constant();
    ScriptTargetES2017 = ScriptTargetES2017$constant();
    ScriptTargetES2018 = ScriptTargetES2018$constant();
    ScriptTargetES2019 = ScriptTargetES2019$constant();
    ScriptTargetES2020 = ScriptTargetES2020$constant();
    ScriptTargetES2021 = ScriptTargetES2021$constant();
    ScriptTargetES2022 = ScriptTargetES2022$constant();
    ScriptTargetES2023 = ScriptTargetES2023$constant();
    ScriptTargetES2024 = ScriptTargetES2024$constant();
    ScriptTargetES2025 = ScriptTargetES2025$constant();
    ScriptTargetES5 = ScriptTargetES5$constant();
    ScriptTargetESNext = ScriptTargetESNext$constant();
    ScriptTargetLatest = ScriptTargetLatest$constant();
    ScriptTargetLatestStandard = ScriptTargetLatestStandard$constant();
    ScriptTargetNone = ScriptTargetNone$constant();
    TSFalse = TSFalse$constant();
    TSTrue = TSTrue$constant();
    TSUnknown = TSUnknown$constant();
    WatchDirectoryKindDynamicPriorityPolling = WatchDirectoryKindDynamicPriorityPolling$constant();
    WatchDirectoryKindFixedChunkSizePolling = WatchDirectoryKindFixedChunkSizePolling$constant();
    WatchDirectoryKindFixedPollingInterval = WatchDirectoryKindFixedPollingInterval$constant();
    WatchDirectoryKindUseFsEvents = WatchDirectoryKindUseFsEvents$constant();
    WatchFileKindDynamicPriorityPolling = WatchFileKindDynamicPriorityPolling$constant();
    WatchFileKindFixedChunkSizePolling = WatchFileKindFixedChunkSizePolling$constant();
    WatchFileKindFixedPollingInterval = WatchFileKindFixedPollingInterval$constant();
    WatchFileKindPriorityPollingInterval = WatchFileKindPriorityPollingInterval$constant();
    WatchFileKindUseFsEvents = WatchFileKindUseFsEvents$constant();
    WatchFileKindUseFsEventsOnParentDirectory = WatchFileKindUseFsEventsOnParentDirectory$constant();
    $state.EmptyCompilerOptions = void 0;
    $state.ExclusivelyPrefixedNodeCoreModules = GoMap.nil<gostring, bool>(false);
    $state.ModuleKindToModuleResolutionKind = GoMap.nil<ModuleKind, ModuleResolutionKind>(0);
    $state.NodeCoreModules = void 0;
    $state.UnprefixedNodeCoreModules = GoMap.nil<gostring, bool>(false);
    $state._LanguageVariant_index = GoArray.zero<uint8, 3>(3, 0);
    $state._ModuleKind_index_0 = GoArray.zero<uint8, 9>(9, 0);
    $state._ModuleKind_index_1 = GoArray.zero<uint8, 5>(5, 0);
    $state._ModuleKind_index_2 = GoArray.zero<uint8, 3>(3, 0);
    $state._ScriptKind_index = GoArray.zero<uint8, 9>(9, 0);
    $state._ScriptTarget_index_0 = GoArray.zero<uint8, 14>(14, 0);
    $state._ScriptTarget_index_1 = GoArray.zero<uint8, 3>(3, 0);
    $state._Tristate_index = GoArray.zero<uint8, 4>(4, 0);
    $state.levenshteinBuffersPool = named_sync.SyncPoolOperations.$zero();
    $state.optionsType = void 0;
    $state.version = "";
    $state.versionMajorMinor = "";
    {
        $state.EmptyCompilerOptions =
            { value: new CompilerOptions(noCopy.$zero(), 0, 0, 0, 0, 0, 0, 0, 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, "", "", "", RuntimeSlice.nil<gostring>(), 0, "", "", 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", void 0, 0, 0, "", 0, 0, 0, 0, 0, "", "", RuntimeSlice.nil<gostring>(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, "", RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, void 0, 0, 0, "", 0, 0, "", "", 0, "", 0, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, void 0) };
    }
    {
        $state.optionsType = $goReflectType$Named_core$CompilerOptions;
    }
    {
        $state.ModuleKindToModuleResolutionKind = GoMap.make<int32, ModuleResolutionKind>(0, 2, [[ModuleKindNode16$constant(), ModuleResolutionKindNode16$constant()], [ModuleKindNodeNext$constant(), ModuleResolutionKindNodeNext$constant()]]);
    }
    {
        const __gotots_field_0 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter({ value: new levenshteinBuffers(RuntimeSlice.nil<float64>(), RuntimeSlice.nil<float64>()) });
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.levenshteinBuffersPool = __gotots_struct_0;
    }
    {
        $state._LanguageVariant_index = GoArray.literal<uint8, 3>(3, 0, [0, 1, 2], [0, 23, 41]);
    }
    {
        $state._ModuleKind_index_0 = GoArray.literal<uint8, 9>(9, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8], [0, 4, 12, 15, 18, 24, 30, 36, 42]);
    }
    {
        $state._ModuleKind_index_1 = GoArray.literal<uint8, 5>(5, 0, [0, 1, 2, 3, 4], [0, 6, 12, 18, 24]);
    }
    {
        $state._ModuleKind_index_2 = GoArray.literal<uint8, 3>(3, 0, [0, 1, 2], [0, 8, 16]);
    }
    {
        $state.UnprefixedNodeCoreModules = GoMap.make<gostring, bool>(false, 54, [["assert", true], ["assert/strict", true], ["async_hooks", true], ["buffer", true], ["child_process", true], ["cluster", true], ["console", true], ["constants", true], ["crypto", true], ["dgram", true], ["diagnostics_channel", true], ["dns", true], ["dns/promises", true], ["domain", true], ["events", true], ["fs", true], ["fs/promises", true], ["http", true], ["http2", true], ["https", true], ["inspector", true], ["inspector/promises", true], ["module", true], ["net", true], ["os", true], ["path", true], ["path/posix", true], ["path/win32", true], ["perf_hooks", true], ["process", true], ["punycode", true], ["querystring", true], ["readline", true], ["readline/promises", true], ["repl", true], ["stream", true], ["stream/consumers", true], ["stream/promises", true], ["stream/web", true], ["string_decoder", true], ["sys", true], ["timers", true], ["timers/promises", true], ["tls", true], ["trace_events", true], ["tty", true], ["url", true], ["util", true], ["util/types", true], ["v8", true], ["vm", true], ["wasi", true], ["worker_threads", true], ["zlib", true]]);
    }
    {
        $state.ExclusivelyPrefixedNodeCoreModules = GoMap.make<gostring, bool>(false, 5, [["node:quic", true], ["node:sea", true], ["node:sqlite", true], ["node:test", true], ["node:test/reporters", true]]);
    }
    {
        $state.NodeCoreModules = sync__from_gostdlib.OnceValue<GoMapValue<gostring, bool>>((): GoMapValue<gostring, bool> => {
            let nodeCoreModules: GoMapValue<gostring, bool> = GoMap.make<gostring, bool>(false, $state.UnprefixedNodeCoreModules.length() * 2 + $state.ExclusivelyPrefixedNodeCoreModules.length(), []);
            const __gotots_range_0 = $state.UnprefixedNodeCoreModules;
            const __gotots_range_keys_0 = __gotots_range_0.keys();
            for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                if (!__gotots_range_value_1[1]) {
                    continue;
                }
                const __gotots_range_value_2 = __gotots_range_value_0;
                let unprefixed = __gotots_range_value_2;
                nodeCoreModules.store(unprefixed, true);
                nodeCoreModules.store("node:" + unprefixed, true);
            }
            Copy$MapOf_string_To_bool$MapOf_string_To_bool$string$bool(nodeCoreModules, $state.ExclusivelyPrefixedNodeCoreModules);
            return nodeCoreModules;
        });
    }
    {
        $state._ScriptKind_index = GoArray.literal<uint8, 9>(9, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8], [0, 17, 29, 42, 54, 67, 85, 99, 117]);
    }
    {
        $state._ScriptTarget_index_0 = GoArray.literal<uint8, 14>(14, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [0, 4, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73]);
    }
    {
        $state._ScriptTarget_index_1 = GoArray.literal<uint8, 3>(3, 0, [0, 1, 2], [0, 6, 10]);
    }
    {
        new UnlimitedSemaphore;
    }
    {
        void 0;
    }
    {
        $state._Tristate_index = GoArray.literal<uint8, 4>(4, 0, [0, 1, 2, 3], [0, 9, 16, 22]);
    }
    {
        $state.version = "7.0.0-dev";
    }
    {
        $state.versionMajorMinor = ((): gostring => {
            let seenMajor = false;
            let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexFunc($state.version, (r: int32): bool => {
                if (r === 46) {
                    if (seenMajor) {
                        return true;
                    }
                    seenMajor = true;
                }
                return false;
            })));
            if (i === -1) {
                const __gotots_argument_0 = new $goInterfaceAdapter$string("invalid version string: " + $state.version);
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            }
            return goStringSlice($state.version, 0, i);
        })();
    }
    {
        void 0;
    }
    {
        void 0;
    }
}
export { Arena, Arena$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
export { BreadthFirstSearchLevel, BreadthFirstSearchLevel$Storage, BreadthFirstSearchOptions, BreadthFirstSearchOptions$Storage, BreadthFirstSearchResult, BreadthFirstSearchResult$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/bfs.js";
export { BuildOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/buildoptions.js";
export { CompilerOptions, GetNewLineKind, JsxEmit, JsxEmitNone$constant, JsxEmitPreserve$constant, JsxEmitReact$constant, JsxEmitReactJSX$constant, JsxEmitReactJSXDev$constant, JsxEmitReactNative$constant, JsxEmit_String, ModuleDetectionKind, ModuleDetectionKindAuto$constant, ModuleDetectionKindForce$constant, ModuleDetectionKindLegacy$constant, ModuleDetectionKindNone$constant, ModuleKind, ModuleKindAMD$constant, ModuleKindCommonJS$constant, ModuleKindES2015$constant, ModuleKindES2020$constant, ModuleKindES2022$constant, ModuleKindESNext$constant, ModuleKindNode16$constant, ModuleKindNode18$constant, ModuleKindNode20$constant, ModuleKindNodeNext$constant, ModuleKindNone$constant, ModuleKindPreserve$constant, ModuleKindSystem$constant, ModuleKindUMD$constant, ModuleKind_IsNonNodeESM, ModuleKind_String, ModuleKind_SupportsImportAttributes, ModuleResolutionKind, ModuleResolutionKindBundler$constant, ModuleResolutionKindClassic$constant, ModuleResolutionKindNode10$constant, ModuleResolutionKindNode16$constant, ModuleResolutionKindNodeNext$constant, ModuleResolutionKindUnknown$constant, ModuleResolutionKind_String, NewLineKind, NewLineKindCRLF$constant, NewLineKindLF$constant, NewLineKindNone$constant, NewLineKind_GetNewLineCharacter, ResolutionModeCommonJS$constant, ResolutionModeESM$constant, ResolutionModeNone$constant, ScriptTarget, ScriptTargetES2015$constant, ScriptTargetES2016$constant, ScriptTargetES2017$constant, ScriptTargetES2018$constant, ScriptTargetES2019$constant, ScriptTargetES2020$constant, ScriptTargetES2021$constant, ScriptTargetES2022$constant, ScriptTargetES2023$constant, ScriptTargetES2024$constant, ScriptTargetES2025$constant, ScriptTargetES5$constant, ScriptTargetESNext$constant, ScriptTargetLatest$constant, ScriptTargetLatestStandard$constant, ScriptTargetNone$constant, ScriptTarget_String } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
export { CheckerLifetime, CheckerLifetimeAPI$constant, CheckerLifetimeDiagnostics$constant, CheckerLifetimeTemporary$constant, GetCheckerLifetime, GetRequestID, WithCheckerLifetime, WithRequestID } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/context.js";
export { ApplyDebugStackLimit, CheckEachDefined, CompareBooleans, ComputeECMALineStarts, ComputeECMALineStartsSeq, ECMALineStarts, GetScriptKindFromFileName, GetSpellingSuggestionForStrings, IndexAfter, ShouldRewriteModuleSpecifier, SingleElementSlice, StringifyJson, UTF16Len, UTF16Offset } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export { LanguageVariant, LanguageVariantJSX$constant, LanguageVariantStandard$constant, LanguageVariant_String } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/languagevariant.js";
export { LinkStore, LinkStore$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/linkstore.js";
export { NonRelativeModuleNameForTypingCache } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/nodemodules.js";
export { ParsedOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/parsedoptions.js";
export { Pattern, Pattern$Storage, TryParsePattern } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/pattern.js";
export { ProjectReference, ResolveConfigFileNameOfProjectReference, ResolveProjectReferencePath } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/projectreference.js";
export { ScriptKind, ScriptKindDeferred$constant, ScriptKindExternal$constant, ScriptKindJS$constant, ScriptKindJSON$constant, ScriptKindJSX$constant, ScriptKindTS$constant, ScriptKindTSX$constant, ScriptKindUnknown$constant, ScriptKind_String } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/scriptkind.js";
export { LimitedSemaphore, NewLimitedSemaphore, UnlimitedSemaphore } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/semaphore.js";
export { Stack, Stack$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/stack.js";
export { CompareTextRanges, NewTextRange, TextPos, TextRange, TextRange$Storage, UndefinedTextRange } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/text.js";
export { ApplyBulkEdits, TextChange, TextChange$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/textchange.js";
export { BoolToTristate, TSFalse$constant, TSTrue$constant, TSUnknown$constant, Tristate, Tristate_DefaultIfUnknown, Tristate_IsFalse, Tristate_IsFalseOrUnknown, Tristate_IsTrue, Tristate_IsTrueOrUnknown, Tristate_IsUnknown, Tristate_MarshalJSON, Tristate_String, Tristate_UnmarshalJSON } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/tristate.js";
export { TypeAcquisition } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/typeacquisition.js";
export { Version, VersionMajorMinor } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/version.js";
export { PollingKind, PollingKindDynamicPriority$constant, PollingKindFixedChunkSize$constant, PollingKindFixedInterval$constant, PollingKindPriorityInterval$constant, WatchDirectoryKind, WatchDirectoryKindDynamicPriorityPolling$constant, WatchDirectoryKindFixedChunkSizePolling$constant, WatchDirectoryKindFixedPollingInterval$constant, WatchDirectoryKindUseFsEvents$constant, WatchFileKind, WatchFileKindDynamicPriorityPolling$constant, WatchFileKindFixedChunkSizePolling$constant, WatchFileKindFixedPollingInterval$constant, WatchFileKindPriorityPollingInterval$constant, WatchFileKindUseFsEvents$constant, WatchFileKindUseFsEventsOnParentDirectory$constant, WatchOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/watchoptions.js";
export { NewThrottleGroup, NewWorkGroup, ThrottleGroup, WorkGroup, WorkGroup$contract, WorkGroup$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/core/workgroup.js";
export let CheckerLifetimeAPI: ReturnType<typeof CheckerLifetimeAPI$constant>;
export let CheckerLifetimeDiagnostics: ReturnType<typeof CheckerLifetimeDiagnostics$constant>;
export let CheckerLifetimeTemporary: ReturnType<typeof CheckerLifetimeTemporary$constant>;
export let JsxEmitNone: ReturnType<typeof JsxEmitNone$constant>;
export let JsxEmitPreserve: ReturnType<typeof JsxEmitPreserve$constant>;
export let JsxEmitReact: ReturnType<typeof JsxEmitReact$constant>;
export let JsxEmitReactJSX: ReturnType<typeof JsxEmitReactJSX$constant>;
export let JsxEmitReactJSXDev: ReturnType<typeof JsxEmitReactJSXDev$constant>;
export let JsxEmitReactNative: ReturnType<typeof JsxEmitReactNative$constant>;
export let LanguageVariantJSX: ReturnType<typeof LanguageVariantJSX$constant>;
export let LanguageVariantStandard: ReturnType<typeof LanguageVariantStandard$constant>;
export let ModuleDetectionKindAuto: ReturnType<typeof ModuleDetectionKindAuto$constant>;
export let ModuleDetectionKindForce: ReturnType<typeof ModuleDetectionKindForce$constant>;
export let ModuleDetectionKindLegacy: ReturnType<typeof ModuleDetectionKindLegacy$constant>;
export let ModuleDetectionKindNone: ReturnType<typeof ModuleDetectionKindNone$constant>;
export let ModuleKindAMD: ReturnType<typeof ModuleKindAMD$constant>;
export let ModuleKindCommonJS: ReturnType<typeof ModuleKindCommonJS$constant>;
export let ModuleKindES2015: ReturnType<typeof ModuleKindES2015$constant>;
export let ModuleKindES2020: ReturnType<typeof ModuleKindES2020$constant>;
export let ModuleKindES2022: ReturnType<typeof ModuleKindES2022$constant>;
export let ModuleKindESNext: ReturnType<typeof ModuleKindESNext$constant>;
export let ModuleKindNode16: ReturnType<typeof ModuleKindNode16$constant>;
export let ModuleKindNode18: ReturnType<typeof ModuleKindNode18$constant>;
export let ModuleKindNode20: ReturnType<typeof ModuleKindNode20$constant>;
export let ModuleKindNodeNext: ReturnType<typeof ModuleKindNodeNext$constant>;
export let ModuleKindNone: ReturnType<typeof ModuleKindNone$constant>;
export let ModuleKindPreserve: ReturnType<typeof ModuleKindPreserve$constant>;
export let ModuleKindSystem: ReturnType<typeof ModuleKindSystem$constant>;
export let ModuleKindUMD: ReturnType<typeof ModuleKindUMD$constant>;
export let ModuleResolutionKindBundler: ReturnType<typeof ModuleResolutionKindBundler$constant>;
export let ModuleResolutionKindClassic: ReturnType<typeof ModuleResolutionKindClassic$constant>;
export let ModuleResolutionKindNode10: ReturnType<typeof ModuleResolutionKindNode10$constant>;
export let ModuleResolutionKindNode16: ReturnType<typeof ModuleResolutionKindNode16$constant>;
export let ModuleResolutionKindNodeNext: ReturnType<typeof ModuleResolutionKindNodeNext$constant>;
export let ModuleResolutionKindUnknown: ReturnType<typeof ModuleResolutionKindUnknown$constant>;
export let NewLineKindCRLF: ReturnType<typeof NewLineKindCRLF$constant>;
export let NewLineKindLF: ReturnType<typeof NewLineKindLF$constant>;
export let NewLineKindNone: ReturnType<typeof NewLineKindNone$constant>;
export let PollingKindDynamicPriority: ReturnType<typeof PollingKindDynamicPriority$constant>;
export let PollingKindFixedChunkSize: ReturnType<typeof PollingKindFixedChunkSize$constant>;
export let PollingKindFixedInterval: ReturnType<typeof PollingKindFixedInterval$constant>;
export let PollingKindPriorityInterval: ReturnType<typeof PollingKindPriorityInterval$constant>;
export let ResolutionModeCommonJS: ReturnType<typeof ResolutionModeCommonJS$constant>;
export let ResolutionModeESM: ReturnType<typeof ResolutionModeESM$constant>;
export let ResolutionModeNone: ReturnType<typeof ResolutionModeNone$constant>;
export let ScriptKindDeferred: ReturnType<typeof ScriptKindDeferred$constant>;
export let ScriptKindExternal: ReturnType<typeof ScriptKindExternal$constant>;
export let ScriptKindJS: ReturnType<typeof ScriptKindJS$constant>;
export let ScriptKindJSON: ReturnType<typeof ScriptKindJSON$constant>;
export let ScriptKindJSX: ReturnType<typeof ScriptKindJSX$constant>;
export let ScriptKindTS: ReturnType<typeof ScriptKindTS$constant>;
export let ScriptKindTSX: ReturnType<typeof ScriptKindTSX$constant>;
export let ScriptKindUnknown: ReturnType<typeof ScriptKindUnknown$constant>;
export let ScriptTargetES2015: ReturnType<typeof ScriptTargetES2015$constant>;
export let ScriptTargetES2016: ReturnType<typeof ScriptTargetES2016$constant>;
export let ScriptTargetES2017: ReturnType<typeof ScriptTargetES2017$constant>;
export let ScriptTargetES2018: ReturnType<typeof ScriptTargetES2018$constant>;
export let ScriptTargetES2019: ReturnType<typeof ScriptTargetES2019$constant>;
export let ScriptTargetES2020: ReturnType<typeof ScriptTargetES2020$constant>;
export let ScriptTargetES2021: ReturnType<typeof ScriptTargetES2021$constant>;
export let ScriptTargetES2022: ReturnType<typeof ScriptTargetES2022$constant>;
export let ScriptTargetES2023: ReturnType<typeof ScriptTargetES2023$constant>;
export let ScriptTargetES2024: ReturnType<typeof ScriptTargetES2024$constant>;
export let ScriptTargetES2025: ReturnType<typeof ScriptTargetES2025$constant>;
export let ScriptTargetES5: ReturnType<typeof ScriptTargetES5$constant>;
export let ScriptTargetESNext: ReturnType<typeof ScriptTargetESNext$constant>;
export let ScriptTargetLatest: ReturnType<typeof ScriptTargetLatest$constant>;
export let ScriptTargetLatestStandard: ReturnType<typeof ScriptTargetLatestStandard$constant>;
export let ScriptTargetNone: ReturnType<typeof ScriptTargetNone$constant>;
export let TSFalse: ReturnType<typeof TSFalse$constant>;
export let TSTrue: ReturnType<typeof TSTrue$constant>;
export let TSUnknown: ReturnType<typeof TSUnknown$constant>;
export let WatchDirectoryKindDynamicPriorityPolling: ReturnType<typeof WatchDirectoryKindDynamicPriorityPolling$constant>;
export let WatchDirectoryKindFixedChunkSizePolling: ReturnType<typeof WatchDirectoryKindFixedChunkSizePolling$constant>;
export let WatchDirectoryKindFixedPollingInterval: ReturnType<typeof WatchDirectoryKindFixedPollingInterval$constant>;
export let WatchDirectoryKindUseFsEvents: ReturnType<typeof WatchDirectoryKindUseFsEvents$constant>;
export let WatchFileKindDynamicPriorityPolling: ReturnType<typeof WatchFileKindDynamicPriorityPolling$constant>;
export let WatchFileKindFixedChunkSizePolling: ReturnType<typeof WatchFileKindFixedChunkSizePolling$constant>;
export let WatchFileKindFixedPollingInterval: ReturnType<typeof WatchFileKindFixedPollingInterval$constant>;
export let WatchFileKindPriorityPollingInterval: ReturnType<typeof WatchFileKindPriorityPollingInterval$constant>;
export let WatchFileKindUseFsEvents: ReturnType<typeof WatchFileKindUseFsEvents$constant>;
export let WatchFileKindUseFsEventsOnParentDirectory: ReturnType<typeof WatchFileKindUseFsEventsOnParentDirectory$constant>;
export { $state };
