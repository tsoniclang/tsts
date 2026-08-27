import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { FileSystemWatcher as FileSystemWatcher__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { memberInfo as memberInfo__from_estransforms } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/esdecorator.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { ExportsOrImports as ExportsOrImports__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
import { JSONValue as JSONValue__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import { WatcherID as WatcherID__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function OrderedMap$Entries$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<WatcherID__from_project, {
    value: FileSystemWatcher__from_lsproto;
} | undefined>> | undefined): iter.Seq2<WatcherID__from_project, {
    value: FileSystemWatcher__from_lsproto;
} | undefined> {
    return OrderedMap__from_collections.Entries$kernel<WatcherID__from_project, {
        value: FileSystemWatcher__from_lsproto;
    } | undefined>($argument0, ($argument0: {
        value: FileSystemWatcher__from_lsproto;
    } | undefined): {
        value: FileSystemWatcher__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: WatcherID__from_project): WatcherID__from_project => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): WatcherID__from_project => {
        return new WatcherID__from_project($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined): iter.Seq2<Path__from_tspath, {
    value: Project__from_project;
} | undefined> {
    return OrderedMap__from_collections.Entries$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): Path__from_tspath => {
        return new Path__from_tspath($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$PointerTo_Named_ast$Node$PointerTo_Named_estransforms$memberInfo($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined>> | undefined): iter.Seq2<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined> {
    return OrderedMap__from_collections.Entries$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, memberInfo__from_estransforms | undefined>($argument0, ($argument0: memberInfo__from_estransforms | undefined): memberInfo__from_estransforms | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): iter.Seq2<gostring, GoInterface | undefined> {
    return OrderedMap__from_collections.Entries$kernel<gostring, GoInterface | undefined>($argument0, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$string$MapOf_string_To_PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>> | undefined): iter.Seq2<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> {
    return OrderedMap__from_collections.Entries$kernel<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>($argument0, ($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$string$Named_packagejson$ExportsOrImports($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined): iter.Seq2<gostring, ExportsOrImports__from_packagejson> {
    return OrderedMap__from_collections.Entries$kernel<gostring, ExportsOrImports__from_packagejson>($argument0, ($argument0: ExportsOrImports__from_packagejson): ExportsOrImports__from_packagejson => {
        return ExportsOrImports__from_packagejson.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$string$Named_packagejson$JSONValue($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue__from_packagejson>> | undefined): iter.Seq2<gostring, JSONValue__from_packagejson> {
    return OrderedMap__from_collections.Entries$kernel<gostring, JSONValue__from_packagejson>($argument0, ($argument0: JSONValue__from_packagejson): JSONValue__from_packagejson => {
        return JSONValue__from_packagejson.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
export function OrderedMap$Entries$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined): iter.Seq2<gostring, RuntimeSlice<gostring>> {
    return OrderedMap__from_collections.Entries$kernel<gostring, RuntimeSlice<gostring>>($argument0, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    });
}
