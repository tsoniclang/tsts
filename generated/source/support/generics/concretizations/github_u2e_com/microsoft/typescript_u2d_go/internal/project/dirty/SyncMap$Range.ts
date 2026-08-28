import type { configFileEntry as configFileEntry__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { SyncMap as SyncMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile, $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../../maps.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project($argument0: {
    value: SyncMap__from_dirty<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>;
} | undefined, $argument1: (($0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_dirty.Range$kernel<Path__from_tspath, {
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
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
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry($argument0: {
    value: SyncMap__from_dirty<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>;
} | undefined, $argument1: (($0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_dirty.Range$kernel<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: configFileEntry__from_project;
        } | undefined>;
    } | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: configFileEntry__from_project;
        } | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: configFileEntry__from_project;
        } | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry__from_project;
            } | undefined>;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, ($argument0: {
        value: configFileEntry__from_project;
    } | undefined): {
        value: configFileEntry__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: configFileEntry__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument1);
}
export function SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: {
    value: SyncMap__from_dirty<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>;
} | undefined, $argument1: (($0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>;
} | undefined) => bool) | undefined): void {
    return SyncMap__from_dirty.Range$kernel<Path__from_tspath, {
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
    }, ($argument0: GoInterfaceValue | undefined): Path__from_tspath => {
        return (($value: GoInterfaceValue | undefined): Path__from_tspath => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
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
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, ($argument0: {
        value: diskFile__from_project;
    } | undefined): {
        value: diskFile__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: diskFile__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument1);
}
