import type { resolved as resolved__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { ForEachAncestorDirectory$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function ForEachAncestorDirectory$Interface_void($argument0: gostring, $argument1: (($0: gostring) => [
    GoInterface | undefined,
    bool
]) | undefined): [
    GoInterface | undefined,
    bool
] {
    return ForEachAncestorDirectory$kernel<GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function ForEachAncestorDirectory$PointerTo_Named___go_module$resolved($argument0: gostring, $argument1: (($0: gostring) => [
    resolved__from___go_module | undefined,
    bool
]) | undefined): [
    resolved__from___go_module | undefined,
    bool
] {
    return ForEachAncestorDirectory$kernel<resolved__from___go_module | undefined>(($argument0: resolved__from___go_module | undefined): resolved__from___go_module | undefined => {
        return $argument0;
    }, (): resolved__from___go_module | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function ForEachAncestorDirectory$string($argument0: gostring, $argument1: (($0: gostring) => [
    gostring,
    bool
]) | undefined): [
    gostring,
    bool
] {
    return ForEachAncestorDirectory$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
