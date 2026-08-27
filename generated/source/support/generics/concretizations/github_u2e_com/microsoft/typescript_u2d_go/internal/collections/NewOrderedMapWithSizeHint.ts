import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { NewOrderedMapWithSizeHint$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goMap$MapOf_Interface_void_To_SliceOf_string, $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption, $goMap$MapOf_string_To_SliceOf_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project as GoMap } from "../../../../../../../maps.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function NewOrderedMapWithSizeHint$Interface_void$SliceOf_string($argument0: int): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<GoInterface | undefined, RuntimeSlice<gostring>>> | undefined {
    return NewOrderedMapWithSizeHint$kernel<GoInterface | undefined, RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>, $argument1: int): GoMapValue<GoInterface | undefined, RuntimeSlice<gostring>> => {
        return $goMap$MapOf_Interface_void_To_SliceOf_string.make($argument1, []);
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0);
}
export function NewOrderedMapWithSizeHint$Named_tspath$Path$Named_tspath$Path($argument0: int): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, Path__from_tspath>> | undefined {
    return NewOrderedMapWithSizeHint$kernel<Path__from_tspath, Path__from_tspath>(($argument0: Path__from_tspath, $argument1: int): GoMapValue<Path__from_tspath, Path__from_tspath> => {
        return $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path.make($argument1, []);
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument0);
}
export function NewOrderedMapWithSizeHint$Named_tspath$Path$PointerTo_Named_project$Project($argument0: int): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined {
    return NewOrderedMapWithSizeHint$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>(($argument0: {
        value: Project__from_project;
    } | undefined, $argument1: int): GoMapValue<Path__from_tspath, {
        value: Project__from_project;
    } | undefined> => {
        return GoMap.make($argument1, []);
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): {
        value: Project__from_project;
    } | undefined => {
        return void 0;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument0);
}
export function NewOrderedMapWithSizeHint$string$Interface_void($argument0: int): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
    return NewOrderedMapWithSizeHint$kernel<gostring, GoInterface | undefined>(($argument0: GoInterface | undefined, $argument1: int): GoMapValue<gostring, GoInterface | undefined> => {
        return $goMap$MapOf_string_To_Interface_void.make($argument1, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
export function NewOrderedMapWithSizeHint$string$PointerTo_Named_tsoptions$CommandLineOption($argument0: int): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>> | undefined {
    return NewOrderedMapWithSizeHint$kernel<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, $argument1: int): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> => {
        return $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption.make($argument1, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return void 0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
export function NewOrderedMapWithSizeHint$string$SliceOf_string($argument0: int): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined {
    return NewOrderedMapWithSizeHint$kernel<gostring, RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>, $argument1: int): GoMapValue<gostring, RuntimeSlice<gostring>> => {
        return $goMap$MapOf_string_To_SliceOf_string.make($argument1, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, (): gostring => {
        return "";
    }, $argument0);
}
