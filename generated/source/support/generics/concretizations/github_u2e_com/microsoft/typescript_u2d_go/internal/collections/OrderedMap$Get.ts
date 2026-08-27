import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
export function OrderedMap$Get$Named_tspath$Path$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, Path__from_tspath>> | undefined, $argument1: Path__from_tspath): [
    Path__from_tspath,
    bool
] {
    return OrderedMap__from_collections.Get$kernel<Path__from_tspath, Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, $argument1);
}
export function OrderedMap$Get$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined, $argument1: Path__from_tspath): [
    {
        value: Project__from_project;
    } | undefined,
    bool
] {
    return OrderedMap__from_collections.Get$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, $argument1);
}
export function OrderedMap$Get$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: gostring): [
    GoInterface | undefined,
    bool
] {
    return OrderedMap__from_collections.Get$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, $argument1);
}
export function OrderedMap$Get$string$MapOf_string_To_PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>> | undefined, $argument1: gostring): [
    GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
    bool
] {
    return OrderedMap__from_collections.Get$kernel<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>($argument0, ($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, $argument1);
}
export function OrderedMap$Get$string$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined, $argument1: gostring): [
    ExportsOrImports__from_packagejson,
    bool
] {
    return OrderedMap__from_collections.Get$kernel<gostring, ExportsOrImports__from_packagejson>($argument0, ($argument0: ExportsOrImports__from_packagejson): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$copy($argument0);
    }, $argument1);
}
