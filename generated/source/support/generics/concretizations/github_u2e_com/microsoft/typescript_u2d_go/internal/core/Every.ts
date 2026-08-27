import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { InferenceInfo as InferenceInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { existingImport$Storage as existingImport__from_autoimport$Storage, newImportBinding as newImportBinding__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Every$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { existingImport as existingImport__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
export function Every$Interface_void($argument0: RuntimeSlice<GoInterface | undefined>, $argument1: (($0: GoInterface | undefined) => bool) | undefined): bool {
    return Every$kernel<GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$Named_autoimport$existingImport($argument0: RuntimeSlice<existingImport__from_autoimport$Storage>, $argument1: (($0: existingImport__from_autoimport) => bool) | undefined): bool {
    return Every$kernel<existingImport__from_autoimport>(($argument0: existingImport__from_autoimport): existingImport__from_autoimport => {
        return existingImport__from_autoimport.$copy($argument0);
    }, ($argument0: existingImport__from_autoimport$Storage): existingImport__from_autoimport => {
        return existingImport__from_autoimport.$fromStorage($argument0);
    }, $argument0, $argument1);
}
export function Every$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    return Every$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): bool {
    return Every$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$PointerTo_Named_autoimport$newImportBinding($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined) => bool) | undefined): bool {
    return Every$kernel<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$PointerTo_Named_checker$InferenceInfo($argument0: RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined>, $argument1: (($0: {
    value: InferenceInfo__from_checker;
} | undefined) => bool) | undefined): bool {
    return Every$kernel<{
        value: InferenceInfo__from_checker;
    } | undefined>(($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => bool) | undefined): bool {
    return Every$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): bool {
    return Every$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Every$string($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => bool) | undefined): bool {
    return Every$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, $argument1);
}
