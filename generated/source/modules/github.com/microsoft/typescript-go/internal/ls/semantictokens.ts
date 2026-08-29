import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast, SemanticMeaning as SemanticMeaning__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ObjectType as ObjectType__from_checker, UnionType as UnionType__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import { GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCatchClause as IsCatchClause__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsImportClause as IsImportClause__from_ast, IsImportSpecifier as IsImportSpecifier__from_ast, IsNamespaceImport as IsNamespaceImport__from_ast, IsRightSideOfQualifiedNameOrPropertyAccess as IsRightSideOfQualifiedNameOrPropertyAccess__from_ast, IsSourceFile as IsSourceFile__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, Node as Node__from_ast, SemanticMeaningType$constant as SemanticMeaningType$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsEnum$constant as SymbolFlagsEnum$constant__from_ast, SymbolFlagsInterface$constant as SymbolFlagsInterface$constant__from_ast, SymbolFlagsTypeAlias$constant as SymbolFlagsTypeAlias$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, SignatureKindCall$constant as SignatureKindCall$constant__from_checker, SignatureKindConstruct$constant as SignatureKindConstruct$constant__from_checker, StructuredType as StructuredType__from_checker, TypeFlagsUnion$constant as TypeFlagsUnion$constant__from_checker, Type as Type__from_checker, UnionOrIntersectionType as UnionOrIntersectionType__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/state.js";
import { GetClientCapabilities as GetClientCapabilities__from_lsproto, Position as Position__from_lsproto, ResolvedSemanticTokensClientCapabilities as ResolvedSemanticTokensClientCapabilities__from_lsproto, SemanticTokenModifier as SemanticTokenModifier__from_lsproto, SemanticTokenType as SemanticTokenType__from_lsproto, SemanticTokensLegend as SemanticTokensLegend__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { ContainsFunc$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$uint32, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_lsproto$SemanticTokenModifier_To_uint32, $goMap$MapOf_Named_ls$tokenType_To_uint32 as GoMap } from "../../../../../../support/maps.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class tokenType {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function tokenTypeNamespace$constant(): tokenType {
    return new tokenType(0);
}
export function tokenTypeClass$constant(): tokenType {
    return new tokenType(1);
}
export function tokenTypeEnum$constant(): tokenType {
    return new tokenType(2);
}
export function tokenTypeInterface$constant(): tokenType {
    return new tokenType(3);
}
export function tokenTypeTypeParameter$constant(): tokenType {
    return new tokenType(5);
}
export function tokenTypeType$constant(): tokenType {
    return new tokenType(6);
}
export function tokenTypeParameter$constant(): tokenType {
    return new tokenType(7);
}
export function tokenTypeVariable$constant(): tokenType {
    return new tokenType(8);
}
export function tokenTypeProperty$constant(): tokenType {
    return new tokenType(9);
}
export function tokenTypeEnumMember$constant(): tokenType {
    return new tokenType(10);
}
export function tokenTypeFunction$constant(): tokenType {
    return new tokenType(13);
}
export function tokenTypeMethod$constant(): tokenType {
    return new tokenType(14);
}
export class tokenModifier {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function tokenModifierDeclaration$constant(): tokenModifier {
    return new tokenModifier(1);
}
export function tokenModifierReadonly$constant(): tokenModifier {
    return new tokenModifier(4);
}
export function tokenModifierStatic$constant(): tokenModifier {
    return new tokenModifier(8);
}
export function tokenModifierAsync$constant(): tokenModifier {
    return new tokenModifier(64);
}
export function tokenModifierDefaultLibrary$constant(): tokenModifier {
    return new tokenModifier(512);
}
export function tokenModifierLocal$constant(): tokenModifier {
    return new tokenModifier(1024);
}
export function SemanticTokensLegend(clientCapabilities: ResolvedSemanticTokensClientCapabilities__from_lsproto): {
    value: SemanticTokensLegend__from_lsproto;
} | undefined {
    let types = RuntimeSlice.make<gostring>(0, $state.tokenTypes.length, "");
    const __gotots_range_0 = $state.tokenTypes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = new SemanticTokenType__from_lsproto(__gotots_range_0.get(__gotots_range_index_0));
        let t = __gotots_range_value_0;
        if (Contains$SliceOf_string$string(clientCapabilities.TokenTypes, t.$value)) {
            types = types.append("", [t.$value]);
        }
    }
    let modifiers = RuntimeSlice.make<gostring>(0, $state.tokenModifiers.length, "");
    const __gotots_range_1 = $state.tokenModifiers;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = new SemanticTokenModifier__from_lsproto(__gotots_range_1.get(__gotots_range_index_1));
        let m = __gotots_range_value_1;
        if (Contains$SliceOf_string$string(clientCapabilities.TokenModifiers, m.$value)) {
            modifiers = modifiers.append("", [m.$value]);
        }
    }
    return { value: new SemanticTokensLegend__from_lsproto(types, modifiers) };
}
export type semanticToken$Storage = {
    node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    tokenType: int;
    tokenModifier: int;
};
export class semanticToken {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: semanticToken$Storage) {
    }
    public static $storageOf($source: semanticToken): semanticToken$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: semanticToken$Storage): semanticToken {
        return new semanticToken($source);
    }
    public get node(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.node;
    }
    public set node($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.node = $value;
    }
    public get tokenType(): tokenType {
        return new tokenType(this.$storage.tokenType);
    }
    public set tokenType($value: tokenType) {
        this.$storage.tokenType = $value.$value;
    }
    public get tokenModifier(): tokenModifier {
        return new tokenModifier(this.$storage.tokenModifier);
    }
    public set tokenModifier($value: tokenModifier) {
        this.$storage.tokenModifier = $value.$value;
    }
    static $copy($source: semanticToken): semanticToken {
        return new semanticToken({
            node: $source.$storage.node,
            tokenType: ((void tokenType,
                $source.$storage.tokenType) as int),
            tokenModifier: ((void tokenModifier,
                $source.$storage.tokenModifier) as int)
        });
    }
    static $zeroStorage(): semanticToken$Storage {
        return {
            node: void 0,
            tokenType: ((void tokenType,
                0) as int),
            tokenModifier: ((void tokenModifier,
                0) as int)
        };
    }
    declare private readonly then?: never;
}
export function classifySymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SemanticMeaning__from_ast): [
    tokenType,
    bool
] {
    let flags = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags;
    if (!((flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
        return [tokenTypeClass$constant(), true];
    }
    if (!((flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
        return [tokenTypeEnum$constant(), true];
    }
    if (!((flags & SymbolFlagsTypeAlias$constant__from_ast()) >>> 0 === 0)) {
        return [tokenTypeType$constant(), true];
    }
    if (!((flags & SymbolFlagsInterface$constant__from_ast()) >>> 0 === 0)) {
        if (!((meaning & SemanticMeaningType$constant__from_ast()) === 0)) {
            return [tokenTypeInterface$constant(), true];
        }
    }
    if (!((flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
        return [tokenTypeTypeParameter$constant(), true];
    }
    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    if (decl === undefined && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        decl = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
    }
    if (!(decl === undefined)) {
        if (IsBindingElement__from_ast(decl)) {
            decl = getDeclarationForBindingElement(decl);
        }
        {
            let tokenType__shadow_1 = tokenFromDeclarationMapping(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
            if (tokenType__shadow_1.$value >= 0) {
                return [tokenType__shadow_1, true];
            }
        }
    }
    return [new tokenType(0), false];
}
export function tokenFromDeclarationMapping(kind: Kind__from_ast): tokenType {
    switch (kind) {
        case KindVariableDeclaration$constant__from_ast(): {
            return tokenTypeVariable$constant();
            break;
        }
        case KindParameter$constant__from_ast(): {
            return tokenTypeParameter$constant();
            break;
        }
        case KindPropertyDeclaration$constant__from_ast(): {
            return tokenTypeProperty$constant();
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            return tokenTypeNamespace$constant();
            break;
        }
        case KindEnumDeclaration$constant__from_ast(): {
            return tokenTypeEnum$constant();
            break;
        }
        case KindEnumMember$constant__from_ast(): {
            return tokenTypeEnumMember$constant();
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast(): {
            return tokenTypeClass$constant();
            break;
        }
        case KindMethodDeclaration$constant__from_ast(): {
            return tokenTypeMethod$constant();
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast(): {
            return tokenTypeFunction$constant();
            break;
        }
        case KindMethodSignature$constant__from_ast(): {
            return tokenTypeMethod$constant();
            break;
        }
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            return tokenTypeProperty$constant();
            break;
        }
        case KindPropertySignature$constant__from_ast(): {
            return tokenTypeProperty$constant();
            break;
        }
        case KindInterfaceDeclaration$constant__from_ast(): {
            return tokenTypeInterface$constant();
            break;
        }
        case KindTypeAliasDeclaration$constant__from_ast(): {
            return tokenTypeType$constant();
            break;
        }
        case KindTypeParameter$constant__from_ast(): {
            return tokenTypeTypeParameter$constant();
            break;
        }
        case KindPropertyAssignment$constant__from_ast():
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            return tokenTypeProperty$constant();
            break;
        }
        default: {
            return new tokenType(-1);
            break;
        }
    }
}
export function reclassifyByType(c: {
    value: Checker__from_checker;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tt: tokenType): tokenType {
    if (tt.$value === tokenTypeVariable$constant().$value || tt.$value === tokenTypeProperty$constant().$value || tt.$value === tokenTypeParameter$constant().$value) {
        let typ: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(c, node);
        if (!(typ === undefined)) {
            let test: (($0: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined) => bool) | undefined = (condition: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): bool => {
                const __gotots_callee_0 = condition;
                const __gotots_argument_2 = typ;
                if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2)) {
                    return true;
                }
                if (!((Type__from_checker.Flags(typ) & TypeFlagsUnion$constant__from_checker()) >>> 0 === 0)) {
                    const __gotots_store_0 = (Type__from_checker.AsUnionType(typ) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_3 = UnionOrIntersectionType__from_checker.Types(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "UnionOrIntersectionType"));
                    const __gotots_argument_4 = condition;
                    if (ContainsFunc$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(__gotots_argument_3, __gotots_argument_4)) {
                        return true;
                    }
                }
                return false;
            };
            let __gotots_logical_result_0 = !(tt.$value === tokenTypeParameter$constant().$value);
            if (__gotots_logical_result_0) {
                const __gotots_callee_1 = test;
                const __gotots_argument_5 = (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
                    return Checker__from_checker.GetSignaturesOfType(c, t, SignatureKindConstruct$constant__from_checker()).length > 0;
                };
                __gotots_logical_result_0 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
            }
            if (__gotots_logical_result_0) {
                return tokenTypeClass$constant();
            }
            const __gotots_callee_2 = test;
            const __gotots_argument_6 = (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
                return Checker__from_checker.GetSignaturesOfType(c, t, SignatureKindCall$constant__from_checker()).length > 0;
            };
            let hasCallSignatures = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
            if (hasCallSignatures) {
                const __gotots_callee_3 = test;
                const __gotots_argument_7 = (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
                    let objType: tsonicTypeScriptRuntime.Location<ObjectType__from_checker> | undefined = Type__from_checker.AsObjectType(t);
                    let __gotots_logical_result_1 = !(objType === undefined);
                    if (__gotots_logical_result_1) {
                        const __gotots_store_1 = ((objType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType__from_checker>).value;
                        const __gotots_binary_operand_0 = StructuredType__from_checker.Properties(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "StructuredType")).length;
                        const __gotots_binary_operand_1 = 0;
                        __gotots_logical_result_1 = __gotots_binary_operand_0 > __gotots_binary_operand_1;
                    }
                    return __gotots_logical_result_1;
                };
                let hasNoProperties = !(__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
                if (hasNoProperties || isExpressionInCallExpression(node)) {
                    if (tt.$value === tokenTypeProperty$constant().$value) {
                        return tokenTypeMethod$constant();
                    }
                    return tokenTypeFunction$constant();
                }
            }
        }
    }
    return tt;
}
export function isLocalDeclaration(decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (IsBindingElement__from_ast(decl)) {
        decl = getDeclarationForBindingElement(decl);
    }
    if (IsVariableDeclaration__from_ast(decl)) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (!(parent === undefined) && IsCatchClause__from_ast(parent)) {
            return tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(decl), sourceFile);
        }
        if (!(parent === undefined) && IsVariableDeclarationList__from_ast(parent)) {
            let grandparent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (!(grandparent === undefined)) {
                let greatGrandparent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                return (!IsSourceFile__from_ast(greatGrandparent) || IsCatchClause__from_ast(grandparent)) &&
                    tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(decl), sourceFile);
            }
        }
    }
    else if (IsFunctionDeclaration__from_ast(decl)) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        return !(parent === undefined) && !IsSourceFile__from_ast(parent) &&
            tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(decl), sourceFile);
    }
    return false;
}
export function getDeclarationForBindingElement(element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (;;) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (!(parent === undefined) && IsBindingPattern__from_ast(parent)) {
            let grandparent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (!(grandparent === undefined) && IsBindingElement__from_ast(grandparent)) {
                element = grandparent;
                continue;
            }
            return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        return element;
    }
}
export function isInImportClause(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    return !(parent === undefined) && (IsImportClause__from_ast(parent) || IsImportSpecifier__from_ast(parent) || IsNamespaceImport__from_ast(parent));
}
export function isExpressionInCallExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; IsRightSideOfQualifiedNameOrPropertyAccess__from_ast(node);) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    return !(parent === undefined) && IsCallExpression__from_ast(parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(parent), node);
}
export function isInfinityOrNaNString(text: gostring): bool {
    return text === "Infinity" || text === "NaN";
}
export function encodeSemanticTokens(ctx: GoInterface | undefined, tokens: RuntimeSlice<semanticToken$Storage>, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, converters: {
    value: Converters__from_lsconv;
} | undefined): RuntimeSlice<uint32> {
    let typeMapping: GoMapValue<tokenType, uint32> = GoMap.make(0, []);
    let modifierMapping: GoMapValue<SemanticTokenModifier__from_lsproto, uint32> = $goMap$MapOf_Named_lsproto$SemanticTokenModifier_To_uint32.make(0, []);
    let clientCapabilities = ResolvedSemanticTokensClientCapabilities__from_lsproto.$copy(((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.SemanticTokens);
    let clientIdx = 0;
    const __gotots_range_2 = $state.tokenTypes;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        const __gotots_range_value_3 = new SemanticTokenType__from_lsproto(__gotots_range_2.get(__gotots_range_index_2));
        let i = __gotots_range_value_2;
        let serverType = __gotots_range_value_3;
        if (Contains$SliceOf_string$string(clientCapabilities.TokenTypes, serverType.$value)) {
            typeMapping.store(new tokenType(i), clientIdx);
            clientIdx++;
        }
    }
    let clientBit = 0;
    const __gotots_range_3 = $state.tokenModifiers;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = new SemanticTokenModifier__from_lsproto(__gotots_range_3.get(__gotots_range_index_3));
        let serverModifier = __gotots_range_value_4;
        if (Contains$SliceOf_string$string(clientCapabilities.TokenModifiers, serverModifier.$value)) {
            modifierMapping.store(serverModifier, clientBit);
            clientBit++;
        }
    }
    let encoded = RuntimeSlice.make<uint32>(0, tokens.length * 5, 0);
    let prevLine = 0;
    let prevChar = 0;
    const __gotots_range_4 = tokens;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_5 = semanticToken.$copy(semanticToken.$fromStorage(__gotots_range_4.get(__gotots_range_index_4)));
        let token = __gotots_range_value_5;
        const __gotots_results_0 = typeMapping.lookupOk(new tokenType(semanticToken.$storageOf(token).tokenType));
        let clientTypeIdx = __gotots_results_0[0];
        let typeSupported = __gotots_results_0[1];
        if (!typeSupported) {
            continue;
        }
        let clientModifierMask = 0;
        const __gotots_range_5 = $state.tokenModifiers;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_6 = __gotots_range_index_5;
            const __gotots_range_value_7 = new SemanticTokenModifier__from_lsproto(__gotots_range_5.get(__gotots_range_index_5));
            let i = __gotots_range_value_6;
            let serverModifier = __gotots_range_value_7;
            if (!(((void tokenModifier,
                ((void tokenModifier,
                    semanticToken.$storageOf(token).tokenModifier) as int)
                    & (new tokenModifier(i < 0 ? GoPanic.raiseRuntime("negative shift amount") : i >= 64 ? 0 : 1 << i)).$value) as int)
                ===
                    ((void tokenModifier,
                        0) as int))) {
                {
                    const __gotots_results_1 = modifierMapping.lookupOk(serverModifier);
                    let clientBit__shadow_1 = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (ok) {
                        clientModifierMask = (clientModifierMask | (clientBit__shadow_1 < 0 ? GoPanic.raiseRuntime("negative shift amount") : clientBit__shadow_1 >= 32 ? 0 : 1 >>> 0 << clientBit__shadow_1 >>> 0)) >>> 0;
                    }
                }
            }
        }
        let tokenStart = GetTokenPosOfNode__from_scanner(semanticToken.$storageOf(token).node, file, false);
        let tokenEnd = Node__from_ast.End(semanticToken.$storageOf(token).node);
        let startPos = Converters__from_lsconv.PositionToLineAndCharacter(converters, new GoInterfaceAdapter(file), tokenStart | 0);
        let endPos = Converters__from_lsconv.PositionToLineAndCharacter(converters, new GoInterfaceAdapter(file), tokenEnd | 0);
        let tokenLength = 0;
        if (Position__from_lsproto.$storageOf(startPos).Line === Position__from_lsproto.$storageOf(endPos).Line) {
            tokenLength = Position__from_lsproto.$storageOf(endPos).Character - Position__from_lsproto.$storageOf(startPos).Character;
        }
        else {
            const __gotots_argument_0 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("semantic tokens: token spans multiple lines: start=(%d,%d) end=(%d,%d) for token at offset %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint32(Position__from_lsproto.$storageOf(startPos).Line), new $goInterfaceAdapter$uint32(Position__from_lsproto.$storageOf(startPos).Character), new $goInterfaceAdapter$uint32(Position__from_lsproto.$storageOf(endPos).Line), new $goInterfaceAdapter$uint32(Position__from_lsproto.$storageOf(endPos).Character), new $goInterfaceAdapter$int(tokenStart)])));
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        let line = Position__from_lsproto.$storageOf(startPos).Line;
        let char = Position__from_lsproto.$storageOf(startPos).Character;
        if (encoded.length > 0 && (line < prevLine || (line === prevLine && char <= prevChar))) {
            const __gotots_argument_1 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("semantic tokens: positions must be strictly increasing: prev=(%d,%d) current=(%d,%d) for token at offset %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint32(prevLine), new $goInterfaceAdapter$uint32(prevChar), new $goInterfaceAdapter$uint32(line), new $goInterfaceAdapter$uint32(char), new $goInterfaceAdapter$int(tokenStart)])));
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        let deltaLine = line - prevLine;
        let deltaChar = 0;
        if (deltaLine === 0) {
            deltaChar = char - prevChar;
        }
        else {
            deltaChar = char;
        }
        encoded = encoded.append(0, [deltaLine, deltaChar, tokenLength, clientTypeIdx, clientModifierMask]);
        prevLine = line;
        prevChar = char;
    }
    return encoded;
}
