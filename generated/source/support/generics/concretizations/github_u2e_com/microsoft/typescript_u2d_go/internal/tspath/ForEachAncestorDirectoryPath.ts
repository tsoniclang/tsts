import type { directory as directory__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { ForEachAncestorDirectoryPath$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function ForEachAncestorDirectoryPath$Interface_void($argument0: Path__from_tspath, $argument1: (($0: Path__from_tspath) => [
    GoInterface | undefined,
    bool
]) | undefined): [
    GoInterface | undefined,
    bool
] {
    return ForEachAncestorDirectoryPath$kernel<GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function ForEachAncestorDirectoryPath$PointerTo_Named_autoimport$directory($argument0: Path__from_tspath, $argument1: (($0: Path__from_tspath) => [
    directory__from_autoimport | undefined,
    bool
]) | undefined): [
    directory__from_autoimport | undefined,
    bool
] {
    return ForEachAncestorDirectoryPath$kernel<directory__from_autoimport | undefined>(($argument0: directory__from_autoimport | undefined): directory__from_autoimport | undefined => {
        return $argument0;
    }, (): directory__from_autoimport | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function ForEachAncestorDirectoryPath$SliceOf_string($argument0: Path__from_tspath, $argument1: (($0: Path__from_tspath) => [
    RuntimeSlice<gostring>,
    bool
]) | undefined): [
    RuntimeSlice<gostring>,
    bool
] {
    return ForEachAncestorDirectoryPath$kernel<RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument0, $argument1);
}
