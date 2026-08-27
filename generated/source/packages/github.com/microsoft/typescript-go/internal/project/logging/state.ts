import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
export class $PackageState {
    declare seq: atomic__from_gostdlib.Uint64;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
