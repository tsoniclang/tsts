import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { FileIncludeReason as FileIncludeReason__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileInclude.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
export function Set$Len$Named_lsproto$DocumentUri($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<DocumentUri__from_lsproto>> | undefined): int {
    return Set__from_collections.Len$kernel<DocumentUri__from_lsproto>($argument0, ($argument0: GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct>): int => {
        return $argument0.length();
    });
}
export function Set$Len$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): int {
    return Set__from_collections.Len$kernel<Path__from_tspath>($argument0, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): int => {
        return $argument0.length();
    });
}
export function Set$Len$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> | undefined): int {
    return Set__from_collections.Len$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($argument0, ($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct>): int => {
        return $argument0.length();
    });
}
export function Set$Len$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined): int {
    return Set__from_collections.Len$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($argument0, ($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct>): int => {
        return $argument0.length();
    });
}
export function Set$Len$PointerTo_Named_compiler$FileIncludeReason($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<{
    value: FileIncludeReason__from_compiler;
} | undefined>> | undefined): int {
    return Set__from_collections.Len$kernel<{
        value: FileIncludeReason__from_compiler;
    } | undefined>($argument0, ($argument0: GoMapValue<{
        value: FileIncludeReason__from_compiler;
    } | undefined, GoEmptyStruct>): int => {
        return $argument0.length();
    });
}
export function Set$Len$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): int {
    return Set__from_collections.Len$kernel<gostring>($argument0, ($argument0: GoMapValue<gostring, GoEmptyStruct>): int => {
        return $argument0.length();
    });
}
