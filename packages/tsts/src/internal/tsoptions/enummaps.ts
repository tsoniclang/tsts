import type { bool } from "../../go/scalars.js";
import {
  GoAssertComparableInterface,
  GoBoxComparableInterface,
  GoNamedNumberKey,
  GoStringKey,
  GoZeroInterface,
  type GoComparable,
  type GoInterface,
  type GoMap,
  type GoMapKeyDescriptor,
  type GoPtr,
  type GoSlice,
} from "../../go/compat.js";
import * as slices from "../../go/slices.js";
import type { MapEntry, OrderedMap } from "../collections/ordered_map.js";
import {
  NewOrderedMapFromList,
  OrderedMap_Get,
  OrderedMap_Keys,
  OrderedMap_Values,
} from "../collections/ordered_map.js";
import type { Set } from "../collections/set.js";
import { NewSetFromItems, Set_Has } from "../collections/set.js";
import * as core from "../core/core.js";
import type {
  CompilerOptions,
  JsxEmit,
  ModuleDetectionKind,
  ModuleKind,
  ModuleResolutionKind,
  NewLineKind,
  ScriptTarget,
} from "../core/compileroptions.js";
import {
  CompilerOptions_GetEmitScriptTarget,
  JsxEmitPreserve,
  JsxEmitReact,
  JsxEmitReactJSX,
  JsxEmitReactJSXDev,
  JsxEmitReactNative,
  ModuleDetectionKindAuto,
  ModuleDetectionKindForce,
  ModuleDetectionKindLegacy,
  ModuleKindAMD,
  ModuleKindCommonJS,
  ModuleKindES2015,
  ModuleKindES2020,
  ModuleKindES2022,
  ModuleKindESNext,
  ModuleKindNode16,
  ModuleKindNode18,
  ModuleKindNode20,
  ModuleKindNodeNext,
  ModuleKindPreserve,
  ModuleKindSystem,
  ModuleKindUMD,
  ModuleResolutionKindBundler,
  ModuleResolutionKindClassic,
  ModuleResolutionKindNode10,
  ModuleResolutionKindNode16,
  ModuleResolutionKindNodeNext,
  NewLineKindCRLF,
  NewLineKindLF,
  ScriptTargetES2015,
  ScriptTargetES2016,
  ScriptTargetES2017,
  ScriptTargetES2018,
  ScriptTargetES2019,
  ScriptTargetES2020,
  ScriptTargetES2021,
  ScriptTargetES2022,
  ScriptTargetES2023,
  ScriptTargetES2024,
  ScriptTargetES2025,
  ScriptTargetES5,
  ScriptTargetESNext,
} from "../core/compileroptions.js";
import {
  PollingKindDynamicPriority,
  PollingKindFixedChunkSize,
  PollingKindFixedInterval,
  PollingKindPriorityInterval,
  WatchDirectoryKindDynamicPriorityPolling,
  WatchDirectoryKindFixedChunkSizePolling,
  WatchDirectoryKindFixedPollingInterval,
  WatchDirectoryKindUseFsEvents,
  WatchFileKindDynamicPriorityPolling,
  WatchFileKindFixedChunkSizePolling,
  WatchFileKindFixedPollingInterval,
  WatchFileKindPriorityPollingInterval,
  WatchFileKindUseFsEvents,
  WatchFileKindUseFsEventsOnParentDirectory,
} from "../core/watchoptions.js";
import type { PollingKind, WatchDirectoryKind, WatchFileKind } from "../core/watchoptions.js";
import { ToFileNameLowerCase } from "../tspath/path.js";

function newCommandLineEnumMap<K extends GoComparable>(
  items: GoSlice<MapEntry<string, K>>,
  valueKey: GoMapKeyDescriptor<K>,
): GoPtr<OrderedMap<string, GoInterface<unknown>>> {
  const boxed: Array<MapEntry<string, GoInterface<unknown>>> = [];
  for (const item of items) {
    boxed.push({ Key: item.Key, Value: GoBoxComparableInterface(valueKey, item.Value) });
  }
  return NewOrderedMapFromList(boxed, GoStringKey);
}

export const moduleResolutionKindKey: GoMapKeyDescriptor<ModuleResolutionKind> = GoNamedNumberKey<ModuleResolutionKind>();
export const scriptTargetKey: GoMapKeyDescriptor<ScriptTarget> = GoNamedNumberKey<ScriptTarget>();
export const moduleKindKey: GoMapKeyDescriptor<ModuleKind> = GoNamedNumberKey<ModuleKind>();
export const moduleDetectionKindKey: GoMapKeyDescriptor<ModuleDetectionKind> = GoNamedNumberKey<ModuleDetectionKind>();
export const jsxEmitKey: GoMapKeyDescriptor<JsxEmit> = GoNamedNumberKey<JsxEmit>();
export const newLineKindKey: GoMapKeyDescriptor<NewLineKind> = GoNamedNumberKey<NewLineKind>();
const watchFileKindKey: GoMapKeyDescriptor<WatchFileKind> = GoNamedNumberKey<WatchFileKind>();
const watchDirectoryKindKey: GoMapKeyDescriptor<WatchDirectoryKind> = GoNamedNumberKey<WatchDirectoryKind>();
const pollingKindKey: GoMapKeyDescriptor<PollingKind> = GoNamedNumberKey<PollingKind>();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::LibMap","kind":"varGroup","status":"implemented","sigHash":"25fe45e16d662f740f50739d4607802bd9e005dde887ea4bbe5adceb3010f438"}
 *
 * Go source:
 * var LibMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	// JavaScript only
 * 	{Key: "es5", Value: "lib.es5.d.ts"},
 * 	{Key: "es6", Value: "lib.es2015.d.ts"},
 * 	{Key: "es2015", Value: "lib.es2015.d.ts"},
 * 	{Key: "es7", Value: "lib.es2016.d.ts"},
 * 	{Key: "es2016", Value: "lib.es2016.d.ts"},
 * 	{Key: "es2017", Value: "lib.es2017.d.ts"},
 * 	{Key: "es2018", Value: "lib.es2018.d.ts"},
 * 	{Key: "es2019", Value: "lib.es2019.d.ts"},
 * 	{Key: "es2020", Value: "lib.es2020.d.ts"},
 * 	{Key: "es2021", Value: "lib.es2021.d.ts"},
 * 	{Key: "es2022", Value: "lib.es2022.d.ts"},
 * 	{Key: "es2023", Value: "lib.es2023.d.ts"},
 * 	{Key: "es2024", Value: "lib.es2024.d.ts"},
 * 	{Key: "es2025", Value: "lib.es2025.d.ts"},
 * 	{Key: "esnext", Value: "lib.esnext.d.ts"},
 * 	// Host only
 * 	{Key: "dom", Value: "lib.dom.d.ts"},
 * 	{Key: "dom.iterable", Value: "lib.dom.iterable.d.ts"},
 * 	{Key: "dom.asynciterable", Value: "lib.dom.asynciterable.d.ts"},
 * 	{Key: "webworker", Value: "lib.webworker.d.ts"},
 * 	{Key: "webworker.importscripts", Value: "lib.webworker.importscripts.d.ts"},
 * 	{Key: "webworker.iterable", Value: "lib.webworker.iterable.d.ts"},
 * 	{Key: "webworker.asynciterable", Value: "lib.webworker.asynciterable.d.ts"},
 * 	{Key: "scripthost", Value: "lib.scripthost.d.ts"},
 * 	// ES2015 and later By-feature options
 * 	{Key: "es2015.core", Value: "lib.es2015.core.d.ts"},
 * 	{Key: "es2015.collection", Value: "lib.es2015.collection.d.ts"},
 * 	{Key: "es2015.generator", Value: "lib.es2015.generator.d.ts"},
 * 	{Key: "es2015.iterable", Value: "lib.es2015.iterable.d.ts"},
 * 	{Key: "es2015.promise", Value: "lib.es2015.promise.d.ts"},
 * 	{Key: "es2015.proxy", Value: "lib.es2015.proxy.d.ts"},
 * 	{Key: "es2015.reflect", Value: "lib.es2015.reflect.d.ts"},
 * 	{Key: "es2015.symbol", Value: "lib.es2015.symbol.d.ts"},
 * 	{Key: "es2015.symbol.wellknown", Value: "lib.es2015.symbol.wellknown.d.ts"},
 * 	{Key: "es2016.array.include", Value: "lib.es2016.array.include.d.ts"},
 * 	{Key: "es2016.intl", Value: "lib.es2016.intl.d.ts"},
 * 	{Key: "es2017.arraybuffer", Value: "lib.es2017.arraybuffer.d.ts"},
 * 	{Key: "es2017.date", Value: "lib.es2017.date.d.ts"},
 * 	{Key: "es2017.object", Value: "lib.es2017.object.d.ts"},
 * 	{Key: "es2017.sharedmemory", Value: "lib.es2017.sharedmemory.d.ts"},
 * 	{Key: "es2017.string", Value: "lib.es2017.string.d.ts"},
 * 	{Key: "es2017.intl", Value: "lib.es2017.intl.d.ts"},
 * 	{Key: "es2017.typedarrays", Value: "lib.es2017.typedarrays.d.ts"},
 * 	{Key: "es2018.asyncgenerator", Value: "lib.es2018.asyncgenerator.d.ts"},
 * 	{Key: "es2018.asynciterable", Value: "lib.es2018.asynciterable.d.ts"},
 * 	{Key: "es2018.intl", Value: "lib.es2018.intl.d.ts"},
 * 	{Key: "es2018.promise", Value: "lib.es2018.promise.d.ts"},
 * 	{Key: "es2018.regexp", Value: "lib.es2018.regexp.d.ts"},
 * 	{Key: "es2019.array", Value: "lib.es2019.array.d.ts"},
 * 	{Key: "es2019.object", Value: "lib.es2019.object.d.ts"},
 * 	{Key: "es2019.string", Value: "lib.es2019.string.d.ts"},
 * 	{Key: "es2019.symbol", Value: "lib.es2019.symbol.d.ts"},
 * 	{Key: "es2019.intl", Value: "lib.es2019.intl.d.ts"},
 * 	{Key: "es2020.bigint", Value: "lib.es2020.bigint.d.ts"},
 * 	{Key: "es2020.date", Value: "lib.es2020.date.d.ts"},
 * 	{Key: "es2020.promise", Value: "lib.es2020.promise.d.ts"},
 * 	{Key: "es2020.sharedmemory", Value: "lib.es2020.sharedmemory.d.ts"},
 * 	{Key: "es2020.string", Value: "lib.es2020.string.d.ts"},
 * 	{Key: "es2020.symbol.wellknown", Value: "lib.es2020.symbol.wellknown.d.ts"},
 * 	{Key: "es2020.intl", Value: "lib.es2020.intl.d.ts"},
 * 	{Key: "es2020.number", Value: "lib.es2020.number.d.ts"},
 * 	{Key: "es2021.promise", Value: "lib.es2021.promise.d.ts"},
 * 	{Key: "es2021.string", Value: "lib.es2021.string.d.ts"},
 * 	{Key: "es2021.weakref", Value: "lib.es2021.weakref.d.ts"},
 * 	{Key: "es2021.intl", Value: "lib.es2021.intl.d.ts"},
 * 	{Key: "es2022.array", Value: "lib.es2022.array.d.ts"},
 * 	{Key: "es2022.error", Value: "lib.es2022.error.d.ts"},
 * 	{Key: "es2022.intl", Value: "lib.es2022.intl.d.ts"},
 * 	{Key: "es2022.object", Value: "lib.es2022.object.d.ts"},
 * 	{Key: "es2022.string", Value: "lib.es2022.string.d.ts"},
 * 	{Key: "es2022.regexp", Value: "lib.es2022.regexp.d.ts"},
 * 	{Key: "es2023.array", Value: "lib.es2023.array.d.ts"},
 * 	{Key: "es2023.collection", Value: "lib.es2023.collection.d.ts"},
 * 	{Key: "es2023.intl", Value: "lib.es2023.intl.d.ts"},
 * 	{Key: "es2024.arraybuffer", Value: "lib.es2024.arraybuffer.d.ts"},
 * 	{Key: "es2024.collection", Value: "lib.es2024.collection.d.ts"},
 * 	{Key: "es2024.object", Value: "lib.es2024.object.d.ts"},
 * 	{Key: "es2024.promise", Value: "lib.es2024.promise.d.ts"},
 * 	{Key: "es2024.regexp", Value: "lib.es2024.regexp.d.ts"},
 * 	{Key: "es2024.sharedmemory", Value: "lib.es2024.sharedmemory.d.ts"},
 * 	{Key: "es2024.string", Value: "lib.es2024.string.d.ts"},
 * 	{Key: "es2025.collection", Value: "lib.es2025.collection.d.ts"},
 * 	{Key: "es2025.float16", Value: "lib.es2025.float16.d.ts"},
 * 	{Key: "es2025.intl", Value: "lib.es2025.intl.d.ts"},
 * 	{Key: "es2025.iterator", Value: "lib.es2025.iterator.d.ts"},
 * 	{Key: "es2025.promise", Value: "lib.es2025.promise.d.ts"},
 * 	{Key: "es2025.regexp", Value: "lib.es2025.regexp.d.ts"},
 * 	// Fallback for backward compatibility
 * 	{Key: "esnext.asynciterable", Value: "lib.es2018.asynciterable.d.ts"},
 * 	{Key: "esnext.symbol", Value: "lib.es2019.symbol.d.ts"},
 * 	{Key: "esnext.bigint", Value: "lib.es2020.bigint.d.ts"},
 * 	{Key: "esnext.weakref", Value: "lib.es2021.weakref.d.ts"},
 * 	{Key: "esnext.object", Value: "lib.es2024.object.d.ts"},
 * 	{Key: "esnext.regexp", Value: "lib.es2024.regexp.d.ts"},
 * 	{Key: "esnext.string", Value: "lib.es2024.string.d.ts"},
 * 	{Key: "esnext.float16", Value: "lib.es2025.float16.d.ts"},
 * 	{Key: "esnext.iterator", Value: "lib.es2025.iterator.d.ts"},
 * 	{Key: "esnext.promise", Value: "lib.es2025.promise.d.ts"},
 * 	// ESNext By-feature options
 * 	{Key: "esnext.array", Value: "lib.esnext.array.d.ts"},
 * 	{Key: "esnext.collection", Value: "lib.esnext.collection.d.ts"},
 * 	{Key: "esnext.date", Value: "lib.esnext.date.d.ts"},
 * 	{Key: "esnext.decorators", Value: "lib.esnext.decorators.d.ts"},
 * 	{Key: "esnext.disposable", Value: "lib.esnext.disposable.d.ts"},
 * 	{Key: "esnext.error", Value: "lib.esnext.error.d.ts"},
 * 	{Key: "esnext.intl", Value: "lib.esnext.intl.d.ts"},
 * 	{Key: "esnext.sharedmemory", Value: "lib.esnext.sharedmemory.d.ts"},
 * 	{Key: "esnext.temporal", Value: "lib.esnext.temporal.d.ts"},
 * 	{Key: "esnext.typedarrays", Value: "lib.esnext.typedarrays.d.ts"},
 * 	// Decorators
 * 	{Key: "decorators", Value: "lib.decorators.d.ts"},
 * 	{Key: "decorators.legacy", Value: "lib.decorators.legacy.d.ts"},
 * })
 */
export let LibMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<string>([
  // JavaScript only
  { Key: "es5", Value: "lib.es5.d.ts" },
  { Key: "es6", Value: "lib.es2015.d.ts" },
  { Key: "es2015", Value: "lib.es2015.d.ts" },
  { Key: "es7", Value: "lib.es2016.d.ts" },
  { Key: "es2016", Value: "lib.es2016.d.ts" },
  { Key: "es2017", Value: "lib.es2017.d.ts" },
  { Key: "es2018", Value: "lib.es2018.d.ts" },
  { Key: "es2019", Value: "lib.es2019.d.ts" },
  { Key: "es2020", Value: "lib.es2020.d.ts" },
  { Key: "es2021", Value: "lib.es2021.d.ts" },
  { Key: "es2022", Value: "lib.es2022.d.ts" },
  { Key: "es2023", Value: "lib.es2023.d.ts" },
  { Key: "es2024", Value: "lib.es2024.d.ts" },
  { Key: "es2025", Value: "lib.es2025.d.ts" },
  { Key: "esnext", Value: "lib.esnext.d.ts" },
  // Host only
  { Key: "dom", Value: "lib.dom.d.ts" },
  { Key: "dom.iterable", Value: "lib.dom.iterable.d.ts" },
  { Key: "dom.asynciterable", Value: "lib.dom.asynciterable.d.ts" },
  { Key: "webworker", Value: "lib.webworker.d.ts" },
  { Key: "webworker.importscripts", Value: "lib.webworker.importscripts.d.ts" },
  { Key: "webworker.iterable", Value: "lib.webworker.iterable.d.ts" },
  { Key: "webworker.asynciterable", Value: "lib.webworker.asynciterable.d.ts" },
  { Key: "scripthost", Value: "lib.scripthost.d.ts" },
  // ES2015 and later By-feature options
  { Key: "es2015.core", Value: "lib.es2015.core.d.ts" },
  { Key: "es2015.collection", Value: "lib.es2015.collection.d.ts" },
  { Key: "es2015.generator", Value: "lib.es2015.generator.d.ts" },
  { Key: "es2015.iterable", Value: "lib.es2015.iterable.d.ts" },
  { Key: "es2015.promise", Value: "lib.es2015.promise.d.ts" },
  { Key: "es2015.proxy", Value: "lib.es2015.proxy.d.ts" },
  { Key: "es2015.reflect", Value: "lib.es2015.reflect.d.ts" },
  { Key: "es2015.symbol", Value: "lib.es2015.symbol.d.ts" },
  { Key: "es2015.symbol.wellknown", Value: "lib.es2015.symbol.wellknown.d.ts" },
  { Key: "es2016.array.include", Value: "lib.es2016.array.include.d.ts" },
  { Key: "es2016.intl", Value: "lib.es2016.intl.d.ts" },
  { Key: "es2017.arraybuffer", Value: "lib.es2017.arraybuffer.d.ts" },
  { Key: "es2017.date", Value: "lib.es2017.date.d.ts" },
  { Key: "es2017.object", Value: "lib.es2017.object.d.ts" },
  { Key: "es2017.sharedmemory", Value: "lib.es2017.sharedmemory.d.ts" },
  { Key: "es2017.string", Value: "lib.es2017.string.d.ts" },
  { Key: "es2017.intl", Value: "lib.es2017.intl.d.ts" },
  { Key: "es2017.typedarrays", Value: "lib.es2017.typedarrays.d.ts" },
  { Key: "es2018.asyncgenerator", Value: "lib.es2018.asyncgenerator.d.ts" },
  { Key: "es2018.asynciterable", Value: "lib.es2018.asynciterable.d.ts" },
  { Key: "es2018.intl", Value: "lib.es2018.intl.d.ts" },
  { Key: "es2018.promise", Value: "lib.es2018.promise.d.ts" },
  { Key: "es2018.regexp", Value: "lib.es2018.regexp.d.ts" },
  { Key: "es2019.array", Value: "lib.es2019.array.d.ts" },
  { Key: "es2019.object", Value: "lib.es2019.object.d.ts" },
  { Key: "es2019.string", Value: "lib.es2019.string.d.ts" },
  { Key: "es2019.symbol", Value: "lib.es2019.symbol.d.ts" },
  { Key: "es2019.intl", Value: "lib.es2019.intl.d.ts" },
  { Key: "es2020.bigint", Value: "lib.es2020.bigint.d.ts" },
  { Key: "es2020.date", Value: "lib.es2020.date.d.ts" },
  { Key: "es2020.promise", Value: "lib.es2020.promise.d.ts" },
  { Key: "es2020.sharedmemory", Value: "lib.es2020.sharedmemory.d.ts" },
  { Key: "es2020.string", Value: "lib.es2020.string.d.ts" },
  { Key: "es2020.symbol.wellknown", Value: "lib.es2020.symbol.wellknown.d.ts" },
  { Key: "es2020.intl", Value: "lib.es2020.intl.d.ts" },
  { Key: "es2020.number", Value: "lib.es2020.number.d.ts" },
  { Key: "es2021.promise", Value: "lib.es2021.promise.d.ts" },
  { Key: "es2021.string", Value: "lib.es2021.string.d.ts" },
  { Key: "es2021.weakref", Value: "lib.es2021.weakref.d.ts" },
  { Key: "es2021.intl", Value: "lib.es2021.intl.d.ts" },
  { Key: "es2022.array", Value: "lib.es2022.array.d.ts" },
  { Key: "es2022.error", Value: "lib.es2022.error.d.ts" },
  { Key: "es2022.intl", Value: "lib.es2022.intl.d.ts" },
  { Key: "es2022.object", Value: "lib.es2022.object.d.ts" },
  { Key: "es2022.string", Value: "lib.es2022.string.d.ts" },
  { Key: "es2022.regexp", Value: "lib.es2022.regexp.d.ts" },
  { Key: "es2023.array", Value: "lib.es2023.array.d.ts" },
  { Key: "es2023.collection", Value: "lib.es2023.collection.d.ts" },
  { Key: "es2023.intl", Value: "lib.es2023.intl.d.ts" },
  { Key: "es2024.arraybuffer", Value: "lib.es2024.arraybuffer.d.ts" },
  { Key: "es2024.collection", Value: "lib.es2024.collection.d.ts" },
  { Key: "es2024.object", Value: "lib.es2024.object.d.ts" },
  { Key: "es2024.promise", Value: "lib.es2024.promise.d.ts" },
  { Key: "es2024.regexp", Value: "lib.es2024.regexp.d.ts" },
  { Key: "es2024.sharedmemory", Value: "lib.es2024.sharedmemory.d.ts" },
  { Key: "es2024.string", Value: "lib.es2024.string.d.ts" },
  { Key: "es2025.collection", Value: "lib.es2025.collection.d.ts" },
  { Key: "es2025.float16", Value: "lib.es2025.float16.d.ts" },
  { Key: "es2025.intl", Value: "lib.es2025.intl.d.ts" },
  { Key: "es2025.iterator", Value: "lib.es2025.iterator.d.ts" },
  { Key: "es2025.promise", Value: "lib.es2025.promise.d.ts" },
  { Key: "es2025.regexp", Value: "lib.es2025.regexp.d.ts" },
  // Fallback for backward compatibility
  { Key: "esnext.asynciterable", Value: "lib.es2018.asynciterable.d.ts" },
  { Key: "esnext.symbol", Value: "lib.es2019.symbol.d.ts" },
  { Key: "esnext.bigint", Value: "lib.es2020.bigint.d.ts" },
  { Key: "esnext.weakref", Value: "lib.es2021.weakref.d.ts" },
  { Key: "esnext.object", Value: "lib.es2024.object.d.ts" },
  { Key: "esnext.regexp", Value: "lib.es2024.regexp.d.ts" },
  { Key: "esnext.string", Value: "lib.es2024.string.d.ts" },
  { Key: "esnext.float16", Value: "lib.es2025.float16.d.ts" },
  { Key: "esnext.iterator", Value: "lib.es2025.iterator.d.ts" },
  { Key: "esnext.promise", Value: "lib.es2025.promise.d.ts" },
  // ESNext By-feature options
  { Key: "esnext.array", Value: "lib.esnext.array.d.ts" },
  { Key: "esnext.collection", Value: "lib.esnext.collection.d.ts" },
  { Key: "esnext.date", Value: "lib.esnext.date.d.ts" },
  { Key: "esnext.decorators", Value: "lib.esnext.decorators.d.ts" },
  { Key: "esnext.disposable", Value: "lib.esnext.disposable.d.ts" },
  { Key: "esnext.error", Value: "lib.esnext.error.d.ts" },
  { Key: "esnext.intl", Value: "lib.esnext.intl.d.ts" },
  { Key: "esnext.sharedmemory", Value: "lib.esnext.sharedmemory.d.ts" },
  { Key: "esnext.temporal", Value: "lib.esnext.temporal.d.ts" },
  { Key: "esnext.typedarrays", Value: "lib.esnext.typedarrays.d.ts" },
  // Decorators
  { Key: "decorators", Value: "lib.decorators.d.ts" },
  { Key: "decorators.legacy", Value: "lib.decorators.legacy.d.ts" },
], GoStringKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::Libs+LibFilesSet","kind":"varGroup","status":"implemented","sigHash":"f34f387c4210267242f23f238eae37bde89af5b03798a8e3434181fab33d25fa"}
 *
 * Go source:
 * var (
 * 	Libs        = slices.Collect(LibMap.Keys())
 * 	LibFilesSet = collections.NewSetFromItems(core.Map(slices.Collect(LibMap.Values()), func(s any) string { return s.(string) })...)
 * )
 */
export let Libs: GoSlice<string> = slices.Collect(OrderedMap_Keys(LibMap));
export let LibFilesSet: GoPtr<Set<string>> = NewSetFromItems<string>(
  GoStringKey,
  ...core.Map(slices.Collect(OrderedMap_Values(LibMap)), (s: GoInterface<unknown>): string => {
    if (s === undefined) {
      throw new TypeError("interface conversion: interface is nil, not string");
    }
    return GoAssertComparableInterface(s, GoStringKey, "string");
  }),
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::func::GetLibFileName","kind":"func","status":"implemented","sigHash":"9e5dd2f3a4780c8c093e5d46faa048ec147d29c4fabc8aa7b5527e09359fcf07"}
 *
 * Go source:
 * func GetLibFileName(libName string) (string, bool) {
 * 	// checks if the libName is a valid lib name or file name and converts the lib name to the filename if needed
 * 	libName = tspath.ToFileNameLowerCase(libName)
 * 	if LibFilesSet.Has(libName) {
 * 		return libName, true
 * 	}
 * 	lib, ok := LibMap.Get(libName)
 * 	if !ok {
 * 		return "", false
 * 	}
 * 	return lib.(string), true
 * }
 */
export function GetLibFileName(libName: string): [string, bool] {
  // checks if the libName is a valid lib name or file name and converts the lib name to the filename if needed
  const lowered = ToFileNameLowerCase(libName);
  if (Set_Has(LibFilesSet, lowered)) {
    return [lowered, true];
  }
  const [lib, ok] = OrderedMap_Get(LibMap, lowered, GoZeroInterface<unknown>);
  if (!ok) {
    return ["", false];
  }
  if (lib === undefined) {
    throw new TypeError("interface conversion: interface is nil, not string");
  }
  return [GoAssertComparableInterface(lib, GoStringKey, "string"), true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::moduleResolutionOptionMap","kind":"varGroup","status":"implemented","sigHash":"87bd50a730b596627e539c68e21f4a682790264e13eff26f5028e708549db89c"}
 *
 * Go source:
 * var moduleResolutionOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "node16", Value: core.ModuleResolutionKindNode16},
 * 	{Key: "nodenext", Value: core.ModuleResolutionKindNodeNext},
 * 	{Key: "bundler", Value: core.ModuleResolutionKindBundler},
 * 	{Key: "classic", Value: core.ModuleResolutionKindClassic},
 * 	{Key: "node", Value: core.ModuleResolutionKindNode10},
 * 	{Key: "node10", Value: core.ModuleResolutionKindNode10},
 * })
 */
export let moduleResolutionOptionMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<ModuleResolutionKind>([
  { Key: "node16", Value: ModuleResolutionKindNode16 },
  { Key: "nodenext", Value: ModuleResolutionKindNodeNext },
  { Key: "bundler", Value: ModuleResolutionKindBundler },
  { Key: "classic", Value: ModuleResolutionKindClassic },
  { Key: "node", Value: ModuleResolutionKindNode10 },
  { Key: "node10", Value: ModuleResolutionKindNode10 },
], moduleResolutionKindKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::targetOptionMap","kind":"varGroup","status":"implemented","sigHash":"393e301b9dd4992b4370bd4eee06a2c4012a04fcc59093f667c45c1042178744"}
 *
 * Go source:
 * var targetOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "es5", Value: core.ScriptTargetES5},
 * 	{Key: "es6", Value: core.ScriptTargetES2015},
 * 	{Key: "es2015", Value: core.ScriptTargetES2015},
 * 	{Key: "es2016", Value: core.ScriptTargetES2016},
 * 	{Key: "es2017", Value: core.ScriptTargetES2017},
 * 	{Key: "es2018", Value: core.ScriptTargetES2018},
 * 	{Key: "es2019", Value: core.ScriptTargetES2019},
 * 	{Key: "es2020", Value: core.ScriptTargetES2020},
 * 	{Key: "es2021", Value: core.ScriptTargetES2021},
 * 	{Key: "es2022", Value: core.ScriptTargetES2022},
 * 	{Key: "es2023", Value: core.ScriptTargetES2023},
 * 	{Key: "es2024", Value: core.ScriptTargetES2024},
 * 	{Key: "es2025", Value: core.ScriptTargetES2025},
 * 	{Key: "esnext", Value: core.ScriptTargetESNext},
 * })
 */
export let targetOptionMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<ScriptTarget>([
  { Key: "es5", Value: ScriptTargetES5 },
  { Key: "es6", Value: ScriptTargetES2015 },
  { Key: "es2015", Value: ScriptTargetES2015 },
  { Key: "es2016", Value: ScriptTargetES2016 },
  { Key: "es2017", Value: ScriptTargetES2017 },
  { Key: "es2018", Value: ScriptTargetES2018 },
  { Key: "es2019", Value: ScriptTargetES2019 },
  { Key: "es2020", Value: ScriptTargetES2020 },
  { Key: "es2021", Value: ScriptTargetES2021 },
  { Key: "es2022", Value: ScriptTargetES2022 },
  { Key: "es2023", Value: ScriptTargetES2023 },
  { Key: "es2024", Value: ScriptTargetES2024 },
  { Key: "es2025", Value: ScriptTargetES2025 },
  { Key: "esnext", Value: ScriptTargetESNext },
], scriptTargetKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::moduleOptionMap","kind":"varGroup","status":"implemented","sigHash":"3487d5a6c2db6cfafb6d157bdf2b023186bf5c469515832792fcdb5bded3bcdc"}
 *
 * Go source:
 * var moduleOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "commonjs", Value: core.ModuleKindCommonJS},
 * 	{Key: "amd", Value: core.ModuleKindAMD},
 * 	{Key: "system", Value: core.ModuleKindSystem},
 * 	{Key: "umd", Value: core.ModuleKindUMD},
 * 	{Key: "es6", Value: core.ModuleKindES2015},
 * 	{Key: "es2015", Value: core.ModuleKindES2015},
 * 	{Key: "es2020", Value: core.ModuleKindES2020},
 * 	{Key: "es2022", Value: core.ModuleKindES2022},
 * 	{Key: "esnext", Value: core.ModuleKindESNext},
 * 	{Key: "node16", Value: core.ModuleKindNode16},
 * 	{Key: "node18", Value: core.ModuleKindNode18},
 * 	{Key: "node20", Value: core.ModuleKindNode20},
 * 	{Key: "nodenext", Value: core.ModuleKindNodeNext},
 * 	{Key: "preserve", Value: core.ModuleKindPreserve},
 * })
 */
export let moduleOptionMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<ModuleKind>([
  { Key: "commonjs", Value: ModuleKindCommonJS },
  { Key: "amd", Value: ModuleKindAMD },
  { Key: "system", Value: ModuleKindSystem },
  { Key: "umd", Value: ModuleKindUMD },
  { Key: "es6", Value: ModuleKindES2015 },
  { Key: "es2015", Value: ModuleKindES2015 },
  { Key: "es2020", Value: ModuleKindES2020 },
  { Key: "es2022", Value: ModuleKindES2022 },
  { Key: "esnext", Value: ModuleKindESNext },
  { Key: "node16", Value: ModuleKindNode16 },
  { Key: "node18", Value: ModuleKindNode18 },
  { Key: "node20", Value: ModuleKindNode20 },
  { Key: "nodenext", Value: ModuleKindNodeNext },
  { Key: "preserve", Value: ModuleKindPreserve },
], moduleKindKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::moduleDetectionOptionMap","kind":"varGroup","status":"implemented","sigHash":"fad0acf17537c06b2e027fc7180d549d7886c51ce0f15f8007979be35bd91c57"}
 *
 * Go source:
 * var moduleDetectionOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "auto", Value: core.ModuleDetectionKindAuto},
 * 	{Key: "legacy", Value: core.ModuleDetectionKindLegacy},
 * 	{Key: "force", Value: core.ModuleDetectionKindForce},
 * })
 */
export let moduleDetectionOptionMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<ModuleDetectionKind>([
  { Key: "auto", Value: ModuleDetectionKindAuto },
  { Key: "legacy", Value: ModuleDetectionKindLegacy },
  { Key: "force", Value: ModuleDetectionKindForce },
], moduleDetectionKindKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::jsxOptionMap","kind":"varGroup","status":"implemented","sigHash":"8a2f7ea7f16fec423b580691b238abecb2072c46f0f0544498173ff9c0af1517"}
 *
 * Go source:
 * var jsxOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "preserve", Value: core.JsxEmitPreserve},
 * 	{Key: "react-native", Value: core.JsxEmitReactNative},
 * 	{Key: "react-jsx", Value: core.JsxEmitReactJSX},
 * 	{Key: "react-jsxdev", Value: core.JsxEmitReactJSXDev},
 * 	{Key: "react", Value: core.JsxEmitReact},
 * })
 */
export let jsxOptionMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<JsxEmit>([
  { Key: "preserve", Value: JsxEmitPreserve },
  { Key: "react-native", Value: JsxEmitReactNative },
  { Key: "react-jsx", Value: JsxEmitReactJSX },
  { Key: "react-jsxdev", Value: JsxEmitReactJSXDev },
  { Key: "react", Value: JsxEmitReact },
], jsxEmitKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::newLineOptionMap","kind":"varGroup","status":"implemented","sigHash":"d22974e3bbbf10d7c9f141f4dd1581a0d89ac6c9857dc2ac950e71388c9389c3"}
 *
 * Go source:
 * var newLineOptionMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "crlf", Value: core.NewLineKindCRLF},
 * 	{Key: "lf", Value: core.NewLineKindLF},
 * })
 */
export let newLineOptionMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<NewLineKind>([
  { Key: "crlf", Value: NewLineKindCRLF },
  { Key: "lf", Value: NewLineKindLF },
], newLineKindKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::targetToLibMap","kind":"varGroup","status":"implemented","sigHash":"2ce91543b05be99d66a31308da52da5f152980ea5efa843d79fdcc351e206c4e"}
 *
 * Go source:
 * var targetToLibMap = map[core.ScriptTarget]string{
 * 	core.ScriptTargetESNext: "lib.esnext.full.d.ts",
 * 	core.ScriptTargetES2025: "lib.es2025.full.d.ts",
 * 	core.ScriptTargetES2024: "lib.es2024.full.d.ts",
 * 	core.ScriptTargetES2023: "lib.es2023.full.d.ts",
 * 	core.ScriptTargetES2022: "lib.es2022.full.d.ts",
 * 	core.ScriptTargetES2021: "lib.es2021.full.d.ts",
 * 	core.ScriptTargetES2020: "lib.es2020.full.d.ts",
 * 	core.ScriptTargetES2019: "lib.es2019.full.d.ts",
 * 	core.ScriptTargetES2018: "lib.es2018.full.d.ts",
 * 	core.ScriptTargetES2017: "lib.es2017.full.d.ts",
 * 	core.ScriptTargetES2016: "lib.es2016.full.d.ts",
 * 	core.ScriptTargetES2015: "lib.es6.d.ts", // We don't use lib.es2015.full.d.ts due to breaking change.
 * }
 */
export let targetToLibMap: GoMap<ScriptTarget, string> = new globalThis.Map<ScriptTarget, string>([
  [ScriptTargetESNext, "lib.esnext.full.d.ts"],
  [ScriptTargetES2025, "lib.es2025.full.d.ts"],
  [ScriptTargetES2024, "lib.es2024.full.d.ts"],
  [ScriptTargetES2023, "lib.es2023.full.d.ts"],
  [ScriptTargetES2022, "lib.es2022.full.d.ts"],
  [ScriptTargetES2021, "lib.es2021.full.d.ts"],
  [ScriptTargetES2020, "lib.es2020.full.d.ts"],
  [ScriptTargetES2019, "lib.es2019.full.d.ts"],
  [ScriptTargetES2018, "lib.es2018.full.d.ts"],
  [ScriptTargetES2017, "lib.es2017.full.d.ts"],
  [ScriptTargetES2016, "lib.es2016.full.d.ts"],
  [ScriptTargetES2015, "lib.es6.d.ts"], // We don't use lib.es2015.full.d.ts due to breaking change.
]);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::func::TargetToLibMap","kind":"func","status":"implemented","sigHash":"f9aa6cb95af5e38191479291c367660bf1ff1b7ffe99110fbf8e472e7df01361"}
 *
 * Go source:
 * func TargetToLibMap() map[core.ScriptTarget]string {
 * 	return targetToLibMap
 * }
 */
export function TargetToLibMap(): GoMap<ScriptTarget, string> {
  return targetToLibMap;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::func::GetDefaultLibFileName","kind":"func","status":"implemented","sigHash":"7dad0ba4561e46dc473b018638fed966c97c5418cc88d2002f0687e1183619bf"}
 *
 * Go source:
 * func GetDefaultLibFileName(options *core.CompilerOptions) string {
 * 	name, ok := targetToLibMap[options.GetEmitScriptTarget()]
 * 	if !ok {
 * 		return "lib.d.ts"
 * 	}
 * 	return name
 * }
 */
export function GetDefaultLibFileName(options: GoPtr<CompilerOptions>): string {
  const key = CompilerOptions_GetEmitScriptTarget(options);
  const ok = targetToLibMap.has(key);
  const name = targetToLibMap.get(key) as string;
  if (!ok) {
    return "lib.d.ts";
  }
  return name;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::watchFileEnumMap","kind":"varGroup","status":"implemented","sigHash":"300620585ab6c3deb7de5b87a375b7b0bd14e2a7ac2eed59bf2f8a6765ab355e"}
 *
 * Go source:
 * var watchFileEnumMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "fixedpollinginterval", Value: core.WatchFileKindFixedPollingInterval},
 * 	{Key: "prioritypollinginterval", Value: core.WatchFileKindPriorityPollingInterval},
 * 	{Key: "dynamicprioritypolling", Value: core.WatchFileKindDynamicPriorityPolling},
 * 	{Key: "fixedchunksizepolling", Value: core.WatchFileKindFixedChunkSizePolling},
 * 	{Key: "usefsevents", Value: core.WatchFileKindUseFsEvents},
 * 	{Key: "usefseventsonparentdirectory", Value: core.WatchFileKindUseFsEventsOnParentDirectory},
 * })
 */
export let watchFileEnumMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<WatchFileKind>([
  { Key: "fixedpollinginterval", Value: WatchFileKindFixedPollingInterval },
  { Key: "prioritypollinginterval", Value: WatchFileKindPriorityPollingInterval },
  { Key: "dynamicprioritypolling", Value: WatchFileKindDynamicPriorityPolling },
  { Key: "fixedchunksizepolling", Value: WatchFileKindFixedChunkSizePolling },
  { Key: "usefsevents", Value: WatchFileKindUseFsEvents },
  { Key: "usefseventsonparentdirectory", Value: WatchFileKindUseFsEventsOnParentDirectory },
], watchFileKindKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::watchDirectoryEnumMap","kind":"varGroup","status":"implemented","sigHash":"dbed0eeb1082a7c0300864244f41220450fc9c06345268b3ab38899473cddbaf"}
 *
 * Go source:
 * var watchDirectoryEnumMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "usefsevents", Value: core.WatchDirectoryKindUseFsEvents},
 * 	{Key: "fixedpollinginterval", Value: core.WatchDirectoryKindFixedPollingInterval},
 * 	{Key: "dynamicprioritypolling", Value: core.WatchDirectoryKindDynamicPriorityPolling},
 * 	{Key: "fixedchunksizepolling", Value: core.WatchDirectoryKindFixedChunkSizePolling},
 * })
 */
export let watchDirectoryEnumMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<WatchDirectoryKind>([
  { Key: "usefsevents", Value: WatchDirectoryKindUseFsEvents },
  { Key: "fixedpollinginterval", Value: WatchDirectoryKindFixedPollingInterval },
  { Key: "dynamicprioritypolling", Value: WatchDirectoryKindDynamicPriorityPolling },
  { Key: "fixedchunksizepolling", Value: WatchDirectoryKindFixedChunkSizePolling },
], watchDirectoryKindKey);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/enummaps.go::varGroup::fallbackEnumMap","kind":"varGroup","status":"implemented","sigHash":"71515ae95b3808e5fdbd47f7d7b68331784bd75b39ec34afc23451e7d34fa867"}
 *
 * Go source:
 * var fallbackEnumMap = collections.NewOrderedMapFromList([]collections.MapEntry[string, any]{
 * 	{Key: "fixedinterval", Value: core.PollingKindFixedInterval},
 * 	{Key: "priorityinterval", Value: core.PollingKindPriorityInterval},
 * 	{Key: "dynamicpriority", Value: core.PollingKindDynamicPriority},
 * 	{Key: "fixedchunksize", Value: core.PollingKindFixedChunkSize},
 * })
 */
export let fallbackEnumMap: GoPtr<OrderedMap<string, GoInterface<unknown>>> = newCommandLineEnumMap<PollingKind>([
  { Key: "fixedinterval", Value: PollingKindFixedInterval },
  { Key: "priorityinterval", Value: PollingKindPriorityInterval },
  { Key: "dynamicpriority", Value: PollingKindDynamicPriority },
  { Key: "fixedchunksize", Value: PollingKindFixedChunkSize },
], pollingKindKey);
