import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ObjectLiteralExpression as ObjectLiteralExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Memoize$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function Memoize$PointerTo_Named_ast$ObjectLiteralExpression($argument0: (() => {
    value: ObjectLiteralExpression__from_ast;
} | undefined) | undefined): (() => {
    value: ObjectLiteralExpression__from_ast;
} | undefined) | undefined {
    return Memoize$kernel<{
        value: ObjectLiteralExpression__from_ast;
    } | undefined>((): {
        value: ObjectLiteralExpression__from_ast;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function Memoize$PointerTo_Named_ast$PropertyAssignment($argument0: (() => tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) | undefined): (() => tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) | undefined {
    return Memoize$kernel<tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined>((): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function Memoize$PointerTo_Named_ast$SourceFile($argument0: (() => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) | undefined): (() => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) | undefined {
    return Memoize$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>((): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function Memoize$PointerTo_Named_ast$Symbol($argument0: (() => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined): (() => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined {
    return Memoize$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function Memoize$PointerTo_Named_checker$Type($argument0: (() => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): (() => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined {
    return Memoize$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>((): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0);
}
export function Memoize$SliceOf_PointerTo_Named_checker$Type($argument0: (() => RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>) | undefined): (() => RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>) | undefined {
    return Memoize$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>>((): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
    }, $argument0);
}
export function Memoize$string($argument0: (() => gostring) | undefined): (() => gostring) | undefined {
    return Memoize$kernel<gostring>((): gostring => {
        return "";
    }, $argument0);
}
