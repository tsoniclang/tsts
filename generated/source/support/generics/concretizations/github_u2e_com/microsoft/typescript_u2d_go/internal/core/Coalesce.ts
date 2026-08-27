import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Coalesce$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Coalesce$PointerTo_Named_ast$Node$Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return Coalesce$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, Node__from_ast>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return $argument0 === undefined;
    }, $argument0, $argument1);
}
export function Coalesce$PointerTo_Named_ast$SourceFile$Named_ast$SourceFile($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
    return Coalesce$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, SourceFile__from_ast>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        return $argument0 === undefined;
    }, $argument0, $argument1);
}
export function Coalesce$PointerTo_Named_ast$Symbol$Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return Coalesce$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, Symbol__from_ast>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return $argument0 === undefined;
    }, $argument0, $argument1);
}
export function Coalesce$PointerTo_Named_checker$Type$Named_checker$Type($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return Coalesce$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, Type__from_checker>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return $argument0 === undefined;
    }, $argument0, $argument1);
}
export function Coalesce$PointerTo_Named_collections$SetOf_string$Named_collections$SetOf_string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
    return Coalesce$kernel<tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, Set__from_collections<gostring>>(($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): bool => {
        return $argument0 === undefined;
    }, $argument0, $argument1);
}
