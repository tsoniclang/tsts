import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import { $goMap$MapOf_Named_tspath$Path_To_string as GoMap } from "../../../../../../../../maps.js";
export function CloneableMap$Clone$Named_tspath$Path$string($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> {
    return $argument0.Clone$kernel(($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0.$value;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return new CloneableMap__from_dirty($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): GoMapValue<Path__from_tspath, gostring> => {
        return GoMap.make(0, []);
    }, (): gostring => {
        return "";
    });
}
