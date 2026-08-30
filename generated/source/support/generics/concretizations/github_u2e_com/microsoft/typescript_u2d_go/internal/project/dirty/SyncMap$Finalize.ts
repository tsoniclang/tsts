import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { configFileEntry as configFileEntry__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { realpathAliasSet as realpathAliasSet__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$realpathAliasSet, $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$realpathAliasSet as GoMap } from "../../../../../../../../maps.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$Project($argument0: {
    value: SyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>;
} | undefined): [
    GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>,
    bool
] {
    return SyncMap__from_dirty.Finalize$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project.make(0, []);
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return void 0;
    });
}
export function SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$configFileEntry($argument0: {
    value: SyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>;
} | undefined): [
    GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>,
    bool
] {
    return SyncMap__from_dirty.Finalize$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>($argument0, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry.make(0, []);
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined => {
        return void 0;
    });
}
export function SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet($argument0: {
    value: SyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>;
} | undefined): [
    GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>,
    bool
] {
    return SyncMap__from_dirty.Finalize$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>($argument0, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$realpathAliasSet.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined> => {
        return GoMap.make(0, []);
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return void 0;
    });
}
