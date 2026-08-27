import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FindAncestorResult as FindAncestorResult__from_ast, ModifierFlags as ModifierFlags__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Type as Type__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { bool, int, uint32 } from "@gotots/runtime/scalars.js";
import { CheckFlagsSynthetic$constant as CheckFlagsSynthetic$constant__from_ast, FindAncestorFalse$constant as FindAncestorFalse$constant__from_ast, FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestorTrue$constant as FindAncestorTrue$constant__from_ast, GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, IsArrayBindingPattern as IsArrayBindingPattern__from_ast, IsBindingElement as IsBindingElement__from_ast, IsDeclaration as IsDeclaration__from_ast, IsDeprecatedDeclaration as IsDeprecatedDeclaration__from_ast, IsExpression as IsExpression__from_ast, IsFunctionBlock as IsFunctionBlock__from_ast, IsLet as IsLet__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsThisInTypeQuery as IsThisInTypeQuery__from_ast, IsVarAwaitUsing as IsVarAwaitUsing__from_ast, IsVarConst as IsVarConst__from_ast, IsVarUsing as IsVarUsing__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, ModifierFlagsAbstract$constant as ModifierFlagsAbstract$constant__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModifierFlagsDeprecated$constant as ModifierFlagsDeprecated$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierFlagsProtected$constant as ModifierFlagsProtected$constant__from_ast, ModifierFlagsPublic$constant as ModifierFlagsPublic$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, Node as Node__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsConstructor$constant as SymbolFlagsConstructor$constant__from_ast, SymbolFlagsEnum$constant as SymbolFlagsEnum$constant__from_ast, SymbolFlagsEnumMember$constant as SymbolFlagsEnumMember$constant__from_ast, SymbolFlagsFunction$constant as SymbolFlagsFunction$constant__from_ast, SymbolFlagsGetAccessor$constant as SymbolFlagsGetAccessor$constant__from_ast, SymbolFlagsInterface$constant as SymbolFlagsInterface$constant__from_ast, SymbolFlagsMethod$constant as SymbolFlagsMethod$constant__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, SymbolFlagsProperty$constant as SymbolFlagsProperty$constant__from_ast, SymbolFlagsSetAccessor$constant as SymbolFlagsSetAccessor$constant__from_ast, SymbolFlagsSignature$constant as SymbolFlagsSignature$constant__from_ast, SymbolFlagsTransient$constant as SymbolFlagsTransient$constant__from_ast, SymbolFlagsTypeAlias$constant as SymbolFlagsTypeAlias$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolFlagsVariable$constant as SymbolFlagsVariable$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class ScriptElementKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ScriptElementKindUnknown$constant(): ScriptElementKind {
    return new ScriptElementKind(0);
}
export function ScriptElementKindWarning$constant(): ScriptElementKind {
    return new ScriptElementKind(1);
}
export function ScriptElementKindKeyword$constant(): ScriptElementKind {
    return new ScriptElementKind(2);
}
export function ScriptElementKindScriptElement$constant(): ScriptElementKind {
    return new ScriptElementKind(3);
}
export function ScriptElementKindModuleElement$constant(): ScriptElementKind {
    return new ScriptElementKind(4);
}
export function ScriptElementKindClassElement$constant(): ScriptElementKind {
    return new ScriptElementKind(5);
}
export function ScriptElementKindLocalClassElement$constant(): ScriptElementKind {
    return new ScriptElementKind(6);
}
export function ScriptElementKindInterfaceElement$constant(): ScriptElementKind {
    return new ScriptElementKind(7);
}
export function ScriptElementKindTypeElement$constant(): ScriptElementKind {
    return new ScriptElementKind(8);
}
export function ScriptElementKindEnumElement$constant(): ScriptElementKind {
    return new ScriptElementKind(9);
}
export function ScriptElementKindEnumMemberElement$constant(): ScriptElementKind {
    return new ScriptElementKind(10);
}
export function ScriptElementKindVariableElement$constant(): ScriptElementKind {
    return new ScriptElementKind(11);
}
export function ScriptElementKindLocalVariableElement$constant(): ScriptElementKind {
    return new ScriptElementKind(12);
}
export function ScriptElementKindVariableUsingElement$constant(): ScriptElementKind {
    return new ScriptElementKind(13);
}
export function ScriptElementKindVariableAwaitUsingElement$constant(): ScriptElementKind {
    return new ScriptElementKind(14);
}
export function ScriptElementKindFunctionElement$constant(): ScriptElementKind {
    return new ScriptElementKind(15);
}
export function ScriptElementKindLocalFunctionElement$constant(): ScriptElementKind {
    return new ScriptElementKind(16);
}
export function ScriptElementKindMemberFunctionElement$constant(): ScriptElementKind {
    return new ScriptElementKind(17);
}
export function ScriptElementKindMemberGetAccessorElement$constant(): ScriptElementKind {
    return new ScriptElementKind(18);
}
export function ScriptElementKindMemberSetAccessorElement$constant(): ScriptElementKind {
    return new ScriptElementKind(19);
}
export function ScriptElementKindMemberVariableElement$constant(): ScriptElementKind {
    return new ScriptElementKind(20);
}
export function ScriptElementKindConstructorImplementationElement$constant(): ScriptElementKind {
    return new ScriptElementKind(22);
}
export function ScriptElementKindCallSignatureElement$constant(): ScriptElementKind {
    return new ScriptElementKind(23);
}
export function ScriptElementKindIndexSignatureElement$constant(): ScriptElementKind {
    return new ScriptElementKind(24);
}
export function ScriptElementKindConstructSignatureElement$constant(): ScriptElementKind {
    return new ScriptElementKind(25);
}
export function ScriptElementKindParameterElement$constant(): ScriptElementKind {
    return new ScriptElementKind(26);
}
export function ScriptElementKindTypeParameterElement$constant(): ScriptElementKind {
    return new ScriptElementKind(27);
}
export function ScriptElementKindPrimitiveType$constant(): ScriptElementKind {
    return new ScriptElementKind(28);
}
export function ScriptElementKindLabel$constant(): ScriptElementKind {
    return new ScriptElementKind(29);
}
export function ScriptElementKindAlias$constant(): ScriptElementKind {
    return new ScriptElementKind(30);
}
export function ScriptElementKindConstElement$constant(): ScriptElementKind {
    return new ScriptElementKind(31);
}
export function ScriptElementKindLetElement$constant(): ScriptElementKind {
    return new ScriptElementKind(32);
}
export function ScriptElementKindDirectory$constant(): ScriptElementKind {
    return new ScriptElementKind(33);
}
export function ScriptElementKindExternalModuleName$constant(): ScriptElementKind {
    return new ScriptElementKind(34);
}
export function ScriptElementKindString$constant(): ScriptElementKind {
    return new ScriptElementKind(35);
}
export type ScriptElementKindModifier = uint32;
export function ScriptElementKindModifierNone$constant(): ScriptElementKindModifier {
    return 0;
}
export function ScriptElementKindModifierPublic$constant(): ScriptElementKindModifier {
    return 2;
}
export function ScriptElementKindModifierPrivate$constant(): ScriptElementKindModifier {
    return 4;
}
export function ScriptElementKindModifierProtected$constant(): ScriptElementKindModifier {
    return 8;
}
export function ScriptElementKindModifierExported$constant(): ScriptElementKindModifier {
    return 16;
}
export function ScriptElementKindModifierAmbient$constant(): ScriptElementKindModifier {
    return 32;
}
export function ScriptElementKindModifierStatic$constant(): ScriptElementKindModifier {
    return 64;
}
export function ScriptElementKindModifierAbstract$constant(): ScriptElementKindModifier {
    return 128;
}
export function ScriptElementKindModifierOptional$constant(): ScriptElementKindModifier {
    return 256;
}
export function ScriptElementKindModifierDeprecated$constant(): ScriptElementKindModifier {
    return 512;
}
export function ScriptElementKindModifierDts$constant(): ScriptElementKindModifier {
    return 1024;
}
export function ScriptElementKindModifierTs$constant(): ScriptElementKindModifier {
    return 2048;
}
export function ScriptElementKindModifierTsx$constant(): ScriptElementKindModifier {
    return 4096;
}
export function ScriptElementKindModifierJs$constant(): ScriptElementKindModifier {
    return 8192;
}
export function ScriptElementKindModifierJsx$constant(): ScriptElementKindModifier {
    return 16384;
}
export function ScriptElementKindModifierJson$constant(): ScriptElementKindModifier {
    return 32768;
}
export function ScriptElementKindModifierDmts$constant(): ScriptElementKindModifier {
    return 65536;
}
export function ScriptElementKindModifierMts$constant(): ScriptElementKindModifier {
    return 131072;
}
export function ScriptElementKindModifierMjs$constant(): ScriptElementKindModifier {
    return 262144;
}
export function ScriptElementKindModifierDcts$constant(): ScriptElementKindModifier {
    return 524288;
}
export function ScriptElementKindModifierCts$constant(): ScriptElementKindModifier {
    return 1048576;
}
export function ScriptElementKindModifierCjs$constant(): ScriptElementKindModifier {
    return 2097152;
}
export function GetSymbolKind(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ScriptElementKind {
    let result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, __go_symbol, location);
    if (!(result.$value === ScriptElementKindUnknown$constant().$value)) {
        return result;
    }
    let flags = Symbol__from_ast.CombinedLocalAndExportSymbolFlags(__go_symbol);
    if (!((flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindClassExpression$constant__from_ast());
        if (!(decl === undefined)) {
            return ScriptElementKindLocalClassElement$constant();
        }
        return ScriptElementKindClassElement$constant();
    }
    if (!((flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindEnumElement$constant();
    }
    if (!((flags & SymbolFlagsTypeAlias$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindTypeElement$constant();
    }
    if (!((flags & SymbolFlagsInterface$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindInterfaceElement$constant();
    }
    if (!((flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindTypeParameterElement$constant();
    }
    if (!((flags & SymbolFlagsEnumMember$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindEnumMemberElement$constant();
    }
    if (!((flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindAlias$constant();
    }
    if (!((flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindModuleElement$constant();
    }
    return ScriptElementKindUnknown$constant();
}
export function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ScriptElementKind {
    let roots = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    if (!(typeChecker === undefined)) {
        roots = Checker__from_checker.GetRootSymbols(typeChecker, __go_symbol);
    }
    else {
        roots = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([__go_symbol]);
    }
    if (roots.length === 1 && !((Symbol__from_ast.$storageOf(((roots.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsMethod$constant__from_ast()) >>> 0 === 0) && (typeChecker === undefined || Checker__from_checker.GetCallSignatures(typeChecker, Checker__from_checker.GetNonNullableType(typeChecker, Checker__from_checker.GetTypeOfSymbolAtLocation(typeChecker, __go_symbol, location))).length > 0)) {
        return ScriptElementKindMemberFunctionElement$constant();
    }
    if (!(typeChecker === undefined)) {
        if (Checker__from_checker.IsUndefinedSymbol(typeChecker, __go_symbol)) {
            return ScriptElementKindVariableElement$constant();
        }
        if (Checker__from_checker.IsArgumentsSymbol(typeChecker, __go_symbol)) {
            return ScriptElementKindLocalVariableElement$constant();
        }
        if (Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast() && IsExpression__from_ast(location) || IsThisInTypeQuery__from_ast(location)) {
            return ScriptElementKindParameterElement$constant();
        }
    }
    let flags = Symbol__from_ast.CombinedLocalAndExportSymbolFlags(__go_symbol);
    if (!((flags & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0)) {
        if (isFirstDeclarationOfSymbolParameter(__go_symbol)) {
            return ScriptElementKindParameterElement$constant();
        }
        else if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsVarConst__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
            return ScriptElementKindConstElement$constant();
        }
        else if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsVarUsing__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
            return ScriptElementKindVariableUsingElement$constant();
        }
        else if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsVarAwaitUsing__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
            return ScriptElementKindVariableAwaitUsingElement$constant();
        }
        else if (Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsLet__from_ast)) {
            return ScriptElementKindLetElement$constant();
        }
        if (isLocalVariableOrFunction(__go_symbol)) {
            return ScriptElementKindLocalVariableElement$constant();
        }
        return ScriptElementKindVariableElement$constant();
    }
    if (!((flags & SymbolFlagsFunction$constant__from_ast()) >>> 0 === 0)) {
        if (isLocalVariableOrFunction(__go_symbol)) {
            return ScriptElementKindLocalFunctionElement$constant();
        }
        return ScriptElementKindFunctionElement$constant();
    }
    if (!((flags & SymbolFlagsGetAccessor$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindMemberGetAccessorElement$constant();
    }
    if (!((flags & SymbolFlagsSetAccessor$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindMemberSetAccessorElement$constant();
    }
    if (!((flags & SymbolFlagsMethod$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindMemberFunctionElement$constant();
    }
    if (!((flags & SymbolFlagsConstructor$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindConstructorImplementationElement$constant();
    }
    if (!((flags & SymbolFlagsSignature$constant__from_ast()) >>> 0 === 0)) {
        return ScriptElementKindIndexSignatureElement$constant();
    }
    if (!((flags & SymbolFlagsProperty$constant__from_ast()) >>> 0 === 0)) {
        if (!(typeChecker === undefined) && !((flags & SymbolFlagsTransient$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsSynthetic$constant__from_ast()) >>> 0 === 0)) {
            let unionPropertyKind = new ScriptElementKind(0);
            const __gotots_range_0 = roots;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let rootSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_0;
                if (!((Symbol__from_ast.$storageOf(((rootSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (98311)) >>> 0 === 0)) {
                    unionPropertyKind = ScriptElementKindMemberVariableElement$constant();
                    break;
                }
            }
            if (unionPropertyKind.$value === ScriptElementKindUnknown$constant().$value) {
                let typeOfUnionProperty: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbolAtLocation(typeChecker, __go_symbol, location);
                if (Checker__from_checker.GetCallSignatures(typeChecker, typeOfUnionProperty).length > 0) {
                    return ScriptElementKindMemberFunctionElement$constant();
                }
                return ScriptElementKindMemberVariableElement$constant();
            }
            return unionPropertyKind;
        }
        return ScriptElementKindMemberVariableElement$constant();
    }
    return ScriptElementKindUnknown$constant();
}
export function isFirstDeclarationOfSymbolParameter(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        declaration = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
    }
    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(declaration, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (IsParameterDeclaration__from_ast(n)) {
            return FindAncestorTrue$constant__from_ast();
        }
        if (IsBindingElement__from_ast(n) || IsObjectBindingPattern__from_ast(n) || IsArrayBindingPattern__from_ast(n)) {
            return FindAncestorFalse$constant__from_ast();
        }
        return FindAncestorQuit$constant__from_ast();
    });
    return !(result === undefined);
}
export function isLocalVariableOrFunction(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
        return false;
    }
    const __gotots_range_1 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast()) {
            return true;
        }
        if (!(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionDeclaration$constant__from_ast())) {
            continue;
        }
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        for (; !IsFunctionBlock__from_ast(parent); parent = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) {
            if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleBlock$constant__from_ast()) {
                break;
            }
        }
        if (IsFunctionBlock__from_ast(parent)) {
            return true;
        }
    }
    return false;
}
export function GetSymbolModifiers(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): ScriptElementKindModifier {
    if (__go_symbol === undefined) {
        return ScriptElementKindModifierNone$constant();
    }
    let modifiers = getNormalizedSymbolModifiers(typeChecker, __go_symbol);
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0) && !(typeChecker === undefined)) {
        let resolvedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetAliasedSymbol(typeChecker, __go_symbol);
        if (!tsonicTypeScriptRuntime.sameLocation(resolvedSymbol, __go_symbol)) {
            modifiers = (modifiers | getNormalizedSymbolModifiers(typeChecker, resolvedSymbol)) >>> 0;
        }
    }
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0)) {
        modifiers = (modifiers | 256) >>> 0;
    }
    return modifiers;
}
export function getNormalizedSymbolModifiers(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): ScriptElementKindModifier {
    let modifierSet = 0;
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
        let declarations = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.slice(1, null, null);
        let excludeFlags = 0;
        if (declarations.length > 0 && isDeprecatedDeclaration(typeChecker, declaration) && Some$PointerTo_Named_ast$Node(declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return !isDeprecatedDeclaration(typeChecker, d);
        })) {
            excludeFlags = ModifierFlagsDeprecated$constant__from_ast();
        }
        else {
            excludeFlags = ModifierFlagsNone$constant__from_ast();
        }
        modifierSet = getNodeModifiers(typeChecker, declaration, excludeFlags);
    }
    return modifierSet;
}
export function isDeprecatedDeclaration(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(typeChecker === undefined)) {
        return Checker__from_checker.IsDeprecatedDeclaration(typeChecker, declaration);
    }
    return IsDeprecatedDeclaration__from_ast(declaration);
}
export function getNodeModifiers(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, excludeFlags: ModifierFlags__from_ast): ScriptElementKindModifier {
    let result = 0;
    let flags = 0;
    if (IsDeclaration__from_ast(node)) {
        flags = GetCombinedModifierFlags__from_ast(node);
        if (isDeprecatedDeclaration(typeChecker, node)) {
            flags = (flags | 65536) >>> 0;
        }
        flags = (flags & ~excludeFlags) >>> 0;
    }
    if (!((flags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 4) >>> 0;
    }
    if (!((flags & ModifierFlagsProtected$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 8) >>> 0;
    }
    if (!((flags & ModifierFlagsPublic$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 2) >>> 0;
    }
    if (!((flags & ModifierFlagsStatic$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 64) >>> 0;
    }
    if (!((flags & ModifierFlagsAbstract$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 128) >>> 0;
    }
    if (!((flags & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 16) >>> 0;
    }
    if (!((flags & ModifierFlagsDeprecated$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 512) >>> 0;
    }
    if (!((flags & ModifierFlagsAmbient$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 32) >>> 0;
    }
    if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0)) {
        result = (result | 32) >>> 0;
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast()) {
        result = (result | 16) >>> 0;
    }
    return result;
}
