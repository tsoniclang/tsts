import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Tristate } from "./tristate.js";
import type { gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class WatchOptions {
    declare private readonly $goType: void;
    public constructor(public Interval: tsonicTypeScriptRuntime.Location<int> | undefined, public FileKind: WatchFileKind, public DirectoryKind: WatchDirectoryKind, public FallbackPolling: PollingKind, public SyncWatchDir: Tristate, public ExcludeDir: RuntimeSlice<gostring>, public ExcludeFiles: RuntimeSlice<gostring>) {
    }
    static $copy($source: WatchOptions): WatchOptions {
        return new WatchOptions($source.Interval, $source.FileKind, $source.DirectoryKind, $source.FallbackPolling, $source.SyncWatchDir, $source.ExcludeDir, $source.ExcludeFiles);
    }
    declare private readonly then?: never;
    static WatchInterval(w: {
        value: WatchOptions;
    } | undefined): time__from_gostdlib.Duration {
        let watchInterval = named_time.TimeDurationValueOperations.$wrap(2000000000n);
        if (!(w === undefined) && !((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Interval === undefined)) {
            watchInterval = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(BigInt.asIntN(64, goNumberToBigInt((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Interval ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value)))) * named_time.TimeDurationValueOperations.$project(time__from_gostdlib.Millisecond)));
        }
        return watchInterval;
    }
}
export type WatchFileKind = int32;
export function WatchFileKindFixedPollingInterval$constant(): WatchFileKind {
    return 1;
}
export function WatchFileKindPriorityPollingInterval$constant(): WatchFileKind {
    return 2;
}
export function WatchFileKindDynamicPriorityPolling$constant(): WatchFileKind {
    return 3;
}
export function WatchFileKindFixedChunkSizePolling$constant(): WatchFileKind {
    return 4;
}
export function WatchFileKindUseFsEvents$constant(): WatchFileKind {
    return 5;
}
export function WatchFileKindUseFsEventsOnParentDirectory$constant(): WatchFileKind {
    return 6;
}
export type WatchDirectoryKind = int32;
export function WatchDirectoryKindUseFsEvents$constant(): WatchDirectoryKind {
    return 1;
}
export function WatchDirectoryKindFixedPollingInterval$constant(): WatchDirectoryKind {
    return 2;
}
export function WatchDirectoryKindDynamicPriorityPolling$constant(): WatchDirectoryKind {
    return 3;
}
export function WatchDirectoryKindFixedChunkSizePolling$constant(): WatchDirectoryKind {
    return 4;
}
export type PollingKind = int32;
export function PollingKindFixedInterval$constant(): PollingKind {
    return 1;
}
export function PollingKindPriorityInterval$constant(): PollingKind {
    return 2;
}
export function PollingKindDynamicPriority$constant(): PollingKind {
    return 3;
}
export function PollingKindFixedChunkSize$constant(): PollingKind {
    return 4;
}
