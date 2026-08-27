import type { PatternAmbientModule as PatternAmbientModule__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Pattern$Storage as Pattern__from_core$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/pattern.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FindBestPatternMatch$kernel, Pattern as Pattern__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/pattern.js";
export function FindBestPatternMatch$Named_core$Pattern($argument0: RuntimeSlice<Pattern__from_core$Storage>, $argument1: (($0: Pattern__from_core) => Pattern__from_core) | undefined, $argument2: gostring): Pattern__from_core {
    return FindBestPatternMatch$kernel<Pattern__from_core>(($argument0: Pattern__from_core): Pattern__from_core => {
        return Pattern__from_core.$copy($argument0);
    }, ($argument0: Pattern__from_core$Storage): Pattern__from_core => {
        return Pattern__from_core.$fromStorage($argument0);
    }, (): Pattern__from_core => {
        return Pattern__from_core.$zero();
    }, $argument0, $argument1, $argument2);
}
export function FindBestPatternMatch$PointerTo_Named_ast$PatternAmbientModule($argument0: RuntimeSlice<{
    value: PatternAmbientModule__from_ast;
} | undefined>, $argument1: (($0: {
    value: PatternAmbientModule__from_ast;
} | undefined) => Pattern__from_core) | undefined, $argument2: gostring): {
    value: PatternAmbientModule__from_ast;
} | undefined {
    return FindBestPatternMatch$kernel<{
        value: PatternAmbientModule__from_ast;
    } | undefined>(($argument0: {
        value: PatternAmbientModule__from_ast;
    } | undefined): {
        value: PatternAmbientModule__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: PatternAmbientModule__from_ast;
    } | undefined): {
        value: PatternAmbientModule__from_ast;
    } | undefined => {
        return $argument0;
    }, (): {
        value: PatternAmbientModule__from_ast;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
