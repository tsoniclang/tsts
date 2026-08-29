import type { ExportSpecifier as ExportSpecifier__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { MultiMap as MultiMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/multimap.js";
export function MultiMap$Len$string$PointerTo_Named_ast$ExportSpecifier($argument0: MultiMap__from_collections<gostring, {
    value: ExportSpecifier__from_ast;
} | undefined> | undefined): int {
    return MultiMap__from_collections.Len$kernel<gostring, {
        value: ExportSpecifier__from_ast;
    } | undefined>($argument0, ($argument0: GoMapValue<gostring, RuntimeSlice<{
        value: ExportSpecifier__from_ast;
    } | undefined>>): int => {
        return $argument0.length();
    });
}
