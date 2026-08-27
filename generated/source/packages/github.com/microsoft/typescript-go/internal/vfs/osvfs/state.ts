import type { LimitedSemaphore as LimitedSemaphore__from_core } from "../../core/package.js";
import type { FS as FS__from_vfs } from "../package.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare blockingOpSema: LimitedSemaphore__from_core | undefined;
    declare hasProcSelfFD: (() => bool) | undefined;
    declare isFileSystemCaseSensitive: bool;
    declare isReparsePoint: (($0: gostring) => bool) | undefined;
    declare limitedWalkDirFuncPool: sync__from_gostdlib.Pool;
    declare osVFS: FS__from_vfs | undefined;
    declare readSema: LimitedSemaphore__from_core | undefined;
    declare writeSema: LimitedSemaphore__from_core | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
