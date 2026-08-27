import type { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { $goInterfaceMethod$AppendFile$string_string_to_Named_error, $goInterfaceMethod$Chtimes$string_Named_time$Time_Named_time$Time_to_Named_error, $goInterfaceMethod$DirectoryExists$string_to_bool, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetAccessibleEntries$string_to_Named_vfs$Entries, $goInterfaceMethod$ReadFile$string_to_string_bool, $goInterfaceMethod$Realpath$string_to_string, $goInterfaceMethod$Remove$string_to_Named_error, $goInterfaceMethod$Stat$string_to_Named_fs$FileInfo, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool, $goInterfaceMethod$WalkDir$string_Named_fs$WalkDirFunc_to_Named_error, $goInterfaceMethod$WriteFile$string_string_to_Named_error } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface FS extends GoInterfaceValue {
    AppendFile($argument0: gostring, $argument1: gostring): GoInterface | undefined;
    Chtimes($argument0: gostring, $argument1: time__from_gostdlib.Time, $argument2: time__from_gostdlib.Time): GoInterface | undefined;
    DirectoryExists($argument0: gostring): bool;
    FileExists($argument0: gostring): bool;
    GetAccessibleEntries($argument0: gostring): Entries;
    ReadFile($argument0: gostring): [
        gostring,
        bool
    ];
    Realpath($argument0: gostring): gostring;
    Remove($argument0: gostring): GoInterface | undefined;
    Stat($argument0: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined;
    UseCaseSensitiveFileNames(): bool;
    WalkDir($argument0: gostring, $argument1: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined;
    WriteFile($argument0: gostring, $argument1: gostring): GoInterface | undefined;
}
export const FS$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AppendFile$string_string_to_Named_error, $goInterfaceMethod$Chtimes$string_Named_time$Time_Named_time$Time_to_Named_error, $goInterfaceMethod$DirectoryExists$string_to_bool, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetAccessibleEntries$string_to_Named_vfs$Entries, $goInterfaceMethod$ReadFile$string_to_string_bool, $goInterfaceMethod$Realpath$string_to_string, $goInterfaceMethod$Remove$string_to_Named_error, $goInterfaceMethod$Stat$string_to_Named_fs$FileInfo, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool, $goInterfaceMethod$WalkDir$string_Named_fs$WalkDirFunc_to_Named_error, $goInterfaceMethod$WriteFile$string_string_to_Named_error]);
export function FS$is(value: GoInterfaceValue | undefined): value is FS {
    return value !== undefined && value.$go$implements(FS$contract);
}
export type Entries$Storage = {
    Files: RuntimeSlice<gostring>;
    Directories: RuntimeSlice<gostring>;
    Symlinks: GoMapValue<gostring, GoEmptyStruct>;
};
export class Entries implements GoContainerStoredValue<Entries$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Entries$Storage) {
    }
    public static $storageOf($source: Entries): Entries$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Entries$Storage): Entries {
        return new Entries($source);
    }
    public get Files(): RuntimeSlice<gostring> {
        return this.$storage.Files;
    }
    public set Files($value: RuntimeSlice<gostring>) {
        this.$storage.Files = $value;
    }
    public get Directories(): RuntimeSlice<gostring> {
        return this.$storage.Directories;
    }
    public set Directories($value: RuntimeSlice<gostring>) {
        this.$storage.Directories = $value;
    }
    public get Symlinks(): GoMapValue<gostring, GoEmptyStruct> {
        return this.$storage.Symlinks;
    }
    public set Symlinks($value: GoMapValue<gostring, GoEmptyStruct>) {
        this.$storage.Symlinks = $value;
    }
    declare readonly [$goContainerStorageType]: Entries$Storage;
    static $zero(): Entries {
        return new Entries({
            Files: RuntimeSlice.nil<gostring>(),
            Directories: RuntimeSlice.nil<gostring>(),
            Symlinks: GoMap.nil()
        });
    }
    static $copy($source: Entries): Entries {
        return new Entries({
            Files: $source.$storage.Files,
            Directories: $source.$storage.Directories,
            Symlinks: $source.$storage.Symlinks
        });
    }
    declare private readonly then?: never;
}
