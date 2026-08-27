import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncMapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$Project($argument0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>;
} | undefined): void {
    return SyncMapEntry__from_dirty.Delete$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project__from_project;
        } | undefined>;
    } | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project__from_project;
        } | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project__from_project;
        } | undefined>;
    } | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project__from_project;
        } | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project__from_project;
            } | undefined>;
        } | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    });
}
export function SyncMapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>;
} | undefined): void {
    return SyncMapEntry__from_dirty.Delete$kernel<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: diskFile__from_project;
        } | undefined>;
    } | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: diskFile__from_project;
        } | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: diskFile__from_project;
        } | undefined>;
    } | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: diskFile__from_project;
        } | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: diskFile__from_project;
            } | undefined>;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: diskFile__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    });
}
