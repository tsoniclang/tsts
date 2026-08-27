import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { CacheHashKey as CacheHashKey__from_checker, NonExistentPropertyKey as NonExistentPropertyKey__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { TypeId as TypeId__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Number as Number__from_jsnum } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/jsnum.js";
import type { PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/pseudobigint.js";
import type { CodeFixProvider as CodeFixProvider__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { Range as Range__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { $goMap$MapOf_Named_checker$CacheHashKey_To_Struct_void, $goMap$MapOf_Named_checker$NonExistentPropertyKey_To_Struct_void, $goMap$MapOf_Named_checker$TypeId_To_Struct_void, $goMap$MapOf_Named_jsnum$Number_To_Struct_void, $goMap$MapOf_Named_jsnum$PseudoBigInt_To_Struct_void, $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_lsproto$Range_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_PointerTo_Named_checker$Type_To_Struct_void, $goMap$MapOf_PointerTo_Named_ls$CodeFixProvider_To_Struct_void, $goMap$MapOf_int_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function Set$Add$Named_checker$CacheHashKey($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<CacheHashKey__from_checker>> | undefined, $argument1: CacheHashKey__from_checker): void {
    return Set__from_collections.Add$kernel<CacheHashKey__from_checker>($argument0, ($argument0: GoEmptyStruct): GoMapValue<CacheHashKey__from_checker, GoEmptyStruct> => {
        return $goMap$MapOf_Named_checker$CacheHashKey_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_checker$NonExistentPropertyKey($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<NonExistentPropertyKey__from_checker>> | undefined, $argument1: NonExistentPropertyKey__from_checker): void {
    return Set__from_collections.Add$kernel<NonExistentPropertyKey__from_checker>($argument0, ($argument0: GoEmptyStruct): GoMapValue<NonExistentPropertyKey__from_checker, GoEmptyStruct> => {
        return $goMap$MapOf_Named_checker$NonExistentPropertyKey_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_checker$TypeId($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<TypeId__from_checker>> | undefined, $argument1: TypeId__from_checker): void {
    return Set__from_collections.Add$kernel<TypeId__from_checker>($argument0, ($argument0: GoEmptyStruct): GoMapValue<TypeId__from_checker, GoEmptyStruct> => {
        return $goMap$MapOf_Named_checker$TypeId_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_jsnum$Number($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Number__from_jsnum>> | undefined, $argument1: Number__from_jsnum): void {
    return Set__from_collections.Add$kernel<Number__from_jsnum>($argument0, ($argument0: GoEmptyStruct): GoMapValue<Number__from_jsnum, GoEmptyStruct> => {
        return $goMap$MapOf_Named_jsnum$Number_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_jsnum$PseudoBigInt($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<PseudoBigInt__from_jsnum>> | undefined, $argument1: PseudoBigInt__from_jsnum): void {
    return Set__from_collections.Add$kernel<PseudoBigInt__from_jsnum>($argument0, ($argument0: GoEmptyStruct): GoMapValue<PseudoBigInt__from_jsnum, GoEmptyStruct> => {
        return $goMap$MapOf_Named_jsnum$PseudoBigInt_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<DocumentUri__from_lsproto>> | undefined, $argument1: DocumentUri__from_lsproto): void {
    return Set__from_collections.Add$kernel<DocumentUri__from_lsproto>($argument0, ($argument0: GoEmptyStruct): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_lsproto$Range($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Range__from_lsproto>> | undefined, $argument1: Range__from_lsproto): void {
    return Set__from_collections.Add$kernel<Range__from_lsproto>($argument0, ($argument0: GoEmptyStruct): GoMapValue<Range__from_lsproto, GoEmptyStruct> => {
        return $goMap$MapOf_Named_lsproto$Range_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, $argument1: Path__from_tspath): void {
    return Set__from_collections.Add$kernel<Path__from_tspath>($argument0, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    return Set__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
    return Set__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$PointerTo_Named_checker$Type($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): void {
    return Set__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>($argument0, ($argument0: GoEmptyStruct): GoMapValue<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_checker$Type_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$PointerTo_Named_ls$CodeFixProvider($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<CodeFixProvider__from_ls | undefined>> | undefined, $argument1: CodeFixProvider__from_ls | undefined): void {
    return Set__from_collections.Add$kernel<CodeFixProvider__from_ls | undefined>($argument0, ($argument0: GoEmptyStruct): GoMapValue<CodeFixProvider__from_ls | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ls$CodeFixProvider_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$int($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<int>> | undefined, $argument1: int): void {
    return Set__from_collections.Add$kernel<int>($argument0, ($argument0: GoEmptyStruct): GoMapValue<int, GoEmptyStruct> => {
        return $goMap$MapOf_int_To_Struct_void.make(0, []);
    }, $argument1);
}
export function Set$Add$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: gostring): void {
    return Set__from_collections.Add$kernel<gostring>($argument0, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, $argument1);
}
