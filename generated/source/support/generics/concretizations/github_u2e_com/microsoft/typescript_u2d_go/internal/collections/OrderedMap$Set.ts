import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { FileSystemWatcher as FileSystemWatcher__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { memberInfo as memberInfo__from_estransforms } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/esdecorator.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { WatcherID as WatcherID__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goMap$MapOf_Interface_void_To_SliceOf_string, $goMap$MapOf_Named_project$WatcherID_To_PointerTo_Named_lsproto$FileSystemWatcher, $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_estransforms$memberInfo, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_PointerTo_Named_ast$Node, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption, $goMap$MapOf_string_To_SliceOf_string, $goMap$MapOf_string_To_MapOf_string_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../maps.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function OrderedMap$Set$Interface_void$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<GoInterface | undefined, RuntimeSlice<gostring>>> | undefined, $argument1: GoInterface | undefined, $argument2: RuntimeSlice<gostring>): void {
    return OrderedMap__from_collections.Set$kernel<GoInterface | undefined, RuntimeSlice<gostring>>($argument0, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): GoMapValue<GoInterface | undefined, RuntimeSlice<gostring>> => {
        return $goMap$MapOf_Interface_void_To_SliceOf_string.make(0, []);
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument1, $argument2);
}
export function OrderedMap$Set$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<WatcherID__from_project, {
    value: FileSystemWatcher__from_lsproto;
} | undefined>> | undefined, $argument1: WatcherID__from_project, $argument2: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): void {
    return OrderedMap__from_collections.Set$kernel<WatcherID__from_project, {
        value: FileSystemWatcher__from_lsproto;
    } | undefined>($argument0, ($argument0: WatcherID__from_project): WatcherID__from_project => {
        return $argument0;
    }, ($argument0: gostring): WatcherID__from_project => {
        return new WatcherID__from_project($argument0);
    }, ($argument0: {
        value: FileSystemWatcher__from_lsproto;
    } | undefined): GoMapValue<WatcherID__from_project, {
        value: FileSystemWatcher__from_lsproto;
    } | undefined> => {
        return $goMap$MapOf_Named_project$WatcherID_To_PointerTo_Named_lsproto$FileSystemWatcher.make(0, []);
    }, ($argument0: WatcherID__from_project): gostring => {
        return $argument0.$value;
    }, (): WatcherID__from_project => {
        return new WatcherID__from_project("");
    }, (): {
        value: FileSystemWatcher__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$Named_tspath$Path$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, Path__from_tspath>> | undefined, $argument1: Path__from_tspath, $argument2: Path__from_tspath): void {
    return OrderedMap__from_collections.Set$kernel<Path__from_tspath, Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: Path__from_tspath): GoMapValue<Path__from_tspath, Path__from_tspath> => {
        return $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path.make(0, []);
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument1, $argument2);
}
export function OrderedMap$Set$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined, $argument1: Path__from_tspath, $argument2: {
    value: Project__from_project;
} | undefined): void {
    return OrderedMap__from_collections.Set$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): GoMapValue<Path__from_tspath, {
        value: Project__from_project;
    } | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project.make(0, []);
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, (): {
        value: Project__from_project;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: memberInfo__from_estransforms | undefined): void {
    return OrderedMap__from_collections.Set$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: memberInfo__from_estransforms | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_estransforms$memberInfo.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, (): memberInfo__from_estransforms | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: gostring, $argument2: GoInterface | undefined): void {
    return OrderedMap__from_collections.Set$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoMapValue<gostring, GoInterface | undefined> => {
        return $goMap$MapOf_string_To_Interface_void.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$MapOf_string_To_PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>> | undefined, $argument1: gostring, $argument2: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): void {
    return OrderedMap__from_collections.Set$kernel<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return GoMap.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $goMap$MapOf_string_To_PointerTo_Named_ast$Node.nil();
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined, $argument1: gostring, $argument2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
    return OrderedMap__from_collections.Set$kernel<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$PointerTo_Named_tsoptions$CommandLineOption($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>> | undefined, $argument1: gostring, $argument2: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): void {
    return OrderedMap__from_collections.Set$kernel<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> => {
        return $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, $argument1: gostring, $argument2: RuntimeSlice<gostring>): void {
    return OrderedMap__from_collections.Set$kernel<gostring, RuntimeSlice<gostring>>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): GoMapValue<gostring, RuntimeSlice<gostring>> => {
        return $goMap$MapOf_string_To_SliceOf_string.make(0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$int($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, int>> | undefined, $argument1: gostring, $argument2: int): void {
    return OrderedMap__from_collections.Set$kernel<gostring, int>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: int): GoMapValue<gostring, int> => {
        return GoMap__from_gotots_runtime.make<gostring, int>($argument0, 0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): int => {
        return 0;
    }, $argument1, $argument2);
}
export function OrderedMap$Set$string$string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, gostring>> | undefined, $argument1: gostring, $argument2: gostring): void {
    return OrderedMap__from_collections.Set$kernel<gostring, gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): GoMapValue<gostring, gostring> => {
        return GoMap__from_gotots_runtime.make<gostring, gostring>($argument0, 0, []);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, (): gostring => {
        return "";
    }, $argument1, $argument2);
}
