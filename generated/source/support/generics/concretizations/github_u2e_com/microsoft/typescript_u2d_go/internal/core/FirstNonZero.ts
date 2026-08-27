import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FirstNonZero$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
export function FirstNonZero$Named_lsproto$DocumentUri($argument0: RuntimeSlice<gostring>): DocumentUri__from_lsproto {
    return FirstNonZero$kernel<DocumentUri__from_lsproto>(($argument0: DocumentUri__from_lsproto, $argument1: DocumentUri__from_lsproto): bool => {
        return !($argument0.$value === $argument1.$value);
    }, ($argument0: gostring): DocumentUri__from_lsproto => {
        return new DocumentUri__from_lsproto($argument0);
    }, (): DocumentUri__from_lsproto => {
        return new DocumentUri__from_lsproto("");
    }, $argument0);
}
export function FirstNonZero$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FirstNonZero$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function FirstNonZero$string($argument0: RuntimeSlice<gostring>): gostring {
    return FirstNonZero$kernel<gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return !($argument0 === $argument1);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
