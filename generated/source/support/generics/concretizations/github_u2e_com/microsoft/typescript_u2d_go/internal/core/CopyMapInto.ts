import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { CopyMapInto$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../maps.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function CopyMapInto$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>, $argument1: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> {
    return CopyMapInto$kernel<GoMapValue<Path__from_tspath, GoEmptyStruct>, GoMapValue<Path__from_tspath, GoEmptyStruct>, Path__from_tspath, GoEmptyStruct>(($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoEmptyStruct => {
        return (void GoEmptyStruct.$copy,
            $argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): bool => {
        return $argument0.isNil();
    }, (): GoEmptyStruct => {
        return GoEmptyStruct.$zero();
    }, $argument0, $argument1);
}
