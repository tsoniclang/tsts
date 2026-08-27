import type * as metrics from "@gotots/gostdlib/runtime/metrics.js";
import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare _Kind_index: GoArray<uint8, 3>;
    declare runtimeMetricsSamples: (() => RuntimeSlice<metrics.Sample>) | undefined;
    declare watcherID: atomic__from_gostdlib.Uint64;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
