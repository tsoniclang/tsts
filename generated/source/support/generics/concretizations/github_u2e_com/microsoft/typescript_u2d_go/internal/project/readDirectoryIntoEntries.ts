import type { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { Entries as Entries__from_vfs } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { readDirectoryIntoEntries$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
export function readDirectoryIntoEntries$MapOf_Named_tspath$Path_To_string($argument0: GoMapValue<Path__from_tspath, gostring>, $argument1: (($0: Path__from_tspath) => bool) | undefined, $argument2: Entries__from_vfs | undefined): void {
    return readDirectoryIntoEntries$kernel<GoMapValue<Path__from_tspath, gostring>>(($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function readDirectoryIntoEntries$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>, $argument1: (($0: Path__from_tspath) => bool) | undefined, $argument2: Entries__from_vfs | undefined): void {
    return readDirectoryIntoEntries$kernel<CloneableMap__from_dirty<Path__from_tspath, gostring>>(($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0.$value;
    }, $argument0, $argument1, $argument2);
}
