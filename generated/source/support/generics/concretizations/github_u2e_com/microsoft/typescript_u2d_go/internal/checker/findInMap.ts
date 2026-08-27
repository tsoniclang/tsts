import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { findInMap$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
export function findInMap$string$PointerTo_Named_ast$Symbol($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return findInMap$kernel<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
