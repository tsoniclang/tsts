import type { int } from "../../go/scalars.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import { Millisecond, type Duration } from "../../go/time.js";
import type { Tristate } from "./tristate.js";

import type { GoRef } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::type::WatchOptions","kind":"type","status":"implemented","sigHash":"878872bc263824b9d8ed38d79fa2fd5300d8036cdd21656a3238122d128c2e3e"}
 *
 * Go source:
 * WatchOptions struct {
 * 	Interval        *int               `json:"watchInterval"`
 * 	FileKind        WatchFileKind      `json:"watchFile"`
 * 	DirectoryKind   WatchDirectoryKind `json:"watchDirectory"`
 * 	FallbackPolling PollingKind        `json:"fallbackPolling"`
 * 	SyncWatchDir    Tristate           `json:"synchronousWatchDirectory"`
 * 	ExcludeDir      []string           `json:"excludeDirectories"`
 * 	ExcludeFiles    []string           `json:"excludeFiles"`
 * }
 */
export interface WatchOptions {
  Interval: GoRef<int>;
  FileKind: WatchFileKind;
  DirectoryKind: WatchDirectoryKind;
  FallbackPolling: PollingKind;
  SyncWatchDir: Tristate;
  ExcludeDir: GoSlice<string>;
  ExcludeFiles: GoSlice<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::type::WatchFileKind","kind":"type","status":"implemented","sigHash":"5671fb516878da4b72087729ceac403fec9dccefa4be16c20f523790162824c7"}
 *
 * Go source:
 * WatchFileKind int32
 */
export type WatchFileKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::constGroup::WatchFileKindNone+WatchFileKindFixedPollingInterval+WatchFileKindPriorityPollingInterval+WatchFileKindDynamicPriorityPolling+WatchFileKindFixedChunkSizePolling+WatchFileKindUseFsEvents+WatchFileKindUseFsEventsOnParentDirectory","kind":"constGroup","status":"implemented","sigHash":"dba235ffdfde1e367f589ac2361673b83927b8725b28609683ece6f8be3f1e8e"}
 *
 * Go source:
 * const (
 * 	WatchFileKindNone                         WatchFileKind = 0
 * 	WatchFileKindFixedPollingInterval         WatchFileKind = 1
 * 	WatchFileKindPriorityPollingInterval      WatchFileKind = 2
 * 	WatchFileKindDynamicPriorityPolling       WatchFileKind = 3
 * 	WatchFileKindFixedChunkSizePolling        WatchFileKind = 4
 * 	WatchFileKindUseFsEvents                  WatchFileKind = 5
 * 	WatchFileKindUseFsEventsOnParentDirectory WatchFileKind = 6
 * )
 */
export const WatchFileKindNone: WatchFileKind = 0;
export const WatchFileKindFixedPollingInterval: WatchFileKind = 1;
export const WatchFileKindPriorityPollingInterval: WatchFileKind = 2;
export const WatchFileKindDynamicPriorityPolling: WatchFileKind = 3;
export const WatchFileKindFixedChunkSizePolling: WatchFileKind = 4;
export const WatchFileKindUseFsEvents: WatchFileKind = 5;
export const WatchFileKindUseFsEventsOnParentDirectory: WatchFileKind = 6;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::type::WatchDirectoryKind","kind":"type","status":"implemented","sigHash":"aca9bd0301be74682f2002b0e23db631c5a2f80ded7ed202511d18e862f65d70"}
 *
 * Go source:
 * WatchDirectoryKind int32
 */
export type WatchDirectoryKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::constGroup::WatchDirectoryKindNone+WatchDirectoryKindUseFsEvents+WatchDirectoryKindFixedPollingInterval+WatchDirectoryKindDynamicPriorityPolling+WatchDirectoryKindFixedChunkSizePolling","kind":"constGroup","status":"implemented","sigHash":"53d8de034f4ba7fc8becbd35636a76f7e4b98ce6ce9ebe3e06335d3e6bdb7c3c"}
 *
 * Go source:
 * const (
 * 	WatchDirectoryKindNone                   WatchDirectoryKind = 0
 * 	WatchDirectoryKindUseFsEvents            WatchDirectoryKind = 1
 * 	WatchDirectoryKindFixedPollingInterval   WatchDirectoryKind = 2
 * 	WatchDirectoryKindDynamicPriorityPolling WatchDirectoryKind = 3
 * 	WatchDirectoryKindFixedChunkSizePolling  WatchDirectoryKind = 4
 * )
 */
export const WatchDirectoryKindNone: WatchDirectoryKind = 0;
export const WatchDirectoryKindUseFsEvents: WatchDirectoryKind = 1;
export const WatchDirectoryKindFixedPollingInterval: WatchDirectoryKind = 2;
export const WatchDirectoryKindDynamicPriorityPolling: WatchDirectoryKind = 3;
export const WatchDirectoryKindFixedChunkSizePolling: WatchDirectoryKind = 4;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::type::PollingKind","kind":"type","status":"implemented","sigHash":"36a1f69d9a2f294d0393a0c93438c39afc313a986d6f26141692da0ce32de3ec"}
 *
 * Go source:
 * PollingKind int32
 */
export type PollingKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::constGroup::PollingKindNone+PollingKindFixedInterval+PollingKindPriorityInterval+PollingKindDynamicPriority+PollingKindFixedChunkSize","kind":"constGroup","status":"implemented","sigHash":"c678b70bf1f44c4f75e3af24c8da1c10efe0e187be7aba1dc88021383a38a3c0"}
 *
 * Go source:
 * const (
 * 	PollingKindNone             PollingKind = 0
 * 	PollingKindFixedInterval    PollingKind = 1
 * 	PollingKindPriorityInterval PollingKind = 2
 * 	PollingKindDynamicPriority  PollingKind = 3
 * 	PollingKindFixedChunkSize   PollingKind = 4
 * )
 */
export const PollingKindNone: PollingKind = 0;
export const PollingKindFixedInterval: PollingKind = 1;
export const PollingKindPriorityInterval: PollingKind = 2;
export const PollingKindDynamicPriority: PollingKind = 3;
export const PollingKindFixedChunkSize: PollingKind = 4;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/watchoptions.go::method::WatchOptions.WatchInterval","kind":"method","status":"implemented","sigHash":"844ee5f41c0b2b975b26c0b38fe1aeb4bf7a438c68a01c0e8753d988710ef38f"}
 *
 * Go source:
 * func (w *WatchOptions) WatchInterval() time.Duration {
 * 	watchInterval := 2000 * time.Millisecond
 * 	if w != nil && w.Interval != nil {
 * 		watchInterval = time.Duration(*w.Interval) * time.Millisecond
 * 	}
 * 	return watchInterval
 * }
 */
export function WatchOptions_WatchInterval(receiver: GoPtr<WatchOptions>): Duration {
  const defaultInterval = BigInt.asIntN(64, 2_000n * Millisecond) as Duration;
  if (receiver !== undefined && receiver.Interval !== undefined) {
    if (!Number.isSafeInteger(receiver.Interval.v)) {
      throw new RangeError("watch interval must be a safe integer");
    }
    return BigInt.asIntN(64, BigInt(receiver.Interval.v) * Millisecond) as Duration;
  }
  return defaultInterval;
}

type WatchOptionsJsonFields = JsonFieldNamesForGoStructContract<
  WatchOptions,
  "github.com/microsoft/typescript-go::internal/core/watchoptions.go::type::WatchOptions",
  {
    readonly Interval: { readonly name: "watchInterval"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly FileKind: { readonly name: "watchFile"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly DirectoryKind: { readonly name: "watchDirectory"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly FallbackPolling: { readonly name: "fallbackPolling"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly SyncWatchDir: { readonly name: "synchronousWatchDirectory"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ExcludeDir: { readonly name: "excludeDirectories"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ExcludeFiles: { readonly name: "excludeFiles"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
  }
>;
