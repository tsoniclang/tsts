import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { GetSpellingSuggestion$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function GetSpellingSuggestion$PointerTo_Named_ast$Symbol($argument0: gostring, $argument1: iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument2: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => gostring) | undefined, $argument3: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => int) | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return GetSpellingSuggestion$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
export function GetSpellingSuggestion$PointerTo_Named_checker$Type($argument0: gostring, $argument1: iter.Seq<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument2: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => gostring) | undefined, $argument3: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => int) | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return GetSpellingSuggestion$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>((): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
export function GetSpellingSuggestion$string($argument0: gostring, $argument1: iter.Seq<gostring>, $argument2: (($0: gostring) => gostring) | undefined, $argument3: (($0: gostring, $1: gostring) => int) | undefined): gostring {
    return GetSpellingSuggestion$kernel<gostring>((): gostring => {
        return "";
    }, $argument0, $argument1, $argument2, $argument3);
}
