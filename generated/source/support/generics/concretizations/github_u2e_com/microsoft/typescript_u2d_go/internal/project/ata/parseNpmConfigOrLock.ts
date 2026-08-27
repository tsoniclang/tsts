import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { npmConfig as npmConfig__from_ata, npmLock as npmLock__from_ata } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ata/ata.js";
import type { Logger as Logger__from_logging } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/logging/logger.js";
import type { FS as FS__from_vfs } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { parseNpmConfigOrLock$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ata/ata.js";
import { $goInterfaceAdapter$PointerTo_Named_ata$npmConfig, $goInterfaceAdapter$PointerTo_Named_ata$npmLock as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
export function parseNpmConfigOrLock$Named_ata$npmConfig($argument0: FS__from_vfs | undefined, $argument1: Logger__from_logging | undefined, $argument2: gostring, $argument3: tsonicTypeScriptRuntime.Location<npmConfig__from_ata> | undefined): gostring {
    return parseNpmConfigOrLock$kernel<npmConfig__from_ata>(($argument0: tsonicTypeScriptRuntime.Location<npmConfig__from_ata> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ata$npmConfig($argument0);
    }, $argument0, $argument1, $argument2, $argument3);
}
export function parseNpmConfigOrLock$Named_ata$npmLock($argument0: FS__from_vfs | undefined, $argument1: Logger__from_logging | undefined, $argument2: gostring, $argument3: tsonicTypeScriptRuntime.Location<npmLock__from_ata> | undefined): gostring {
    return parseNpmConfigOrLock$kernel<npmLock__from_ata>(($argument0: tsonicTypeScriptRuntime.Location<npmLock__from_ata> | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument0, $argument1, $argument2, $argument3);
}
