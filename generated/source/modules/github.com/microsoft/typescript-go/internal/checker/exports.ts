import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierFlags as ModifierFlags__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Type } from "./types.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { isTupleType } from "./checker.js";
import { getDeclarationModifierFlagsFromSymbol, getPropertyNameFromType, isTypeUsableAsPropertyName } from "./utilities.js";
export function IsTypeUsableAsPropertyName(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return isTypeUsableAsPropertyName(t);
}
export function GetPropertyNameFromType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): gostring {
    return getPropertyNameFromType(t);
}
export function GetDeclarationModifierFlagsFromSymbol(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): ModifierFlags__from_ast {
    return getDeclarationModifierFlagsFromSymbol(s);
}
export function IsTupleType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return isTupleType(t);
}
