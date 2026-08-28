import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ConditionalTypeNode as ConditionalTypeNode__from_ast, Diagnostic as Diagnostic__from_ast, ExportSpecifier as ExportSpecifier__from_ast, InferTypeNode as InferTypeNode__from_ast, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { BindingElement as BindingElement__from_ast, BodyBase as BodyBase__from_ast, FindAncestor as FindAncestor__from_ast, FindConstructorDeclaration as FindConstructorDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, GetImmediatelyInvokedFunctionExpression as GetImmediatelyInvokedFunctionExpression__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, HeritageClause as HeritageClause__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsClassElement as IsClassElement__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsConstAssertion as IsConstAssertion__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGlobalScopeAugmentation as IsGlobalScopeAugmentation__from_ast, IsGlobalSourceFile as IsGlobalSourceFile__from_ast, IsHeritageClause as IsHeritageClause__from_ast, IsInJSFile as IsInJSFile__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsModuleOrEnumDeclaration as IsModuleOrEnumDeclaration__from_ast, IsNullishCoalesce as IsNullishCoalesce__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsOptionalChain as IsOptionalChain__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPartOfParameterDeclaration as IsPartOfParameterDeclaration__from_ast, IsRequireCall as IsRequireCall__from_ast, IsSourceFile as IsSourceFile__from_ast, IsStatic as IsStatic__from_ast, IsTypeNode as IsTypeNode__from_ast, IsTypeQueryNode as IsTypeQueryNode__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSDoc$constant as KindJSDoc$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocReturnTag$constant as KindJSDocReturnTag$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, ModifierFlagsAsync$constant as ModifierFlagsAsync$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsSynthesized$constant as NodeFlagsSynthesized$constant__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsEnumMember$constant as SymbolFlagsEnumMember$constant__from_ast, SymbolFlagsFunction$constant as SymbolFlagsFunction$constant__from_ast, SymbolFlagsFunctionScopedVariable$constant as SymbolFlagsFunctionScopedVariable$constant__from_ast, SymbolFlagsGlobalLookup$constant as SymbolFlagsGlobalLookup$constant__from_ast, SymbolFlagsModuleMember$constant as SymbolFlagsModuleMember$constant__from_ast, SymbolFlagsType$constant as SymbolFlagsType$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, SymbolFlagsVariable$constant as SymbolFlagsVariable$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, ScriptTargetES2017$constant as ScriptTargetES2017$constant__from_core, ScriptTargetES2020$constant as ScriptTargetES2020$constant__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { IfElse$Named_core$Tristate, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class NameResolver {
    declare private readonly $goType: void;
    public constructor(public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public GetSymbolOfDeclaration: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public Error: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: Message__from_diagnostics;
    } | undefined, $2: RuntimeSlice<GoInterface | undefined>) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined, public Globals: SymbolTable__from_ast, public ArgumentsSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public RequireSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public Lookup: (($0: SymbolTable__from_ast, $1: gostring, $2: SymbolFlags__from_ast) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, public SymbolReferenced: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: SymbolFlags__from_ast) => void) | undefined, public SetRequiresScopeChangeCache: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: Tristate__from_core) => void) | undefined, public GetRequiresScopeChangeCache: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => Tristate__from_core) | undefined, public OnPropertyWithInvalidInitializer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: gostring, $2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $3: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined, public OnFailedToResolveSymbol: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: gostring, $2: SymbolFlags__from_ast, $3: {
        value: Message__from_diagnostics;
    } | undefined) => void) | undefined, public OnSuccessfullyResolvedSymbol: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $2: SymbolFlags__from_ast, $3: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $4: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $5: bool) => void) | undefined) {
    }
    static $copy($source: NameResolver): NameResolver {
        return new NameResolver($source.CompilerOptions, $source.GetSymbolOfDeclaration, $source.Error, $source.Globals, $source.ArgumentsSymbol, $source.RequireSymbol, $source.Lookup, $source.SymbolReferenced, $source.SetRequiresScopeChangeCache, $source.GetRequiresScopeChangeCache, $source.OnPropertyWithInvalidInitializer, $source.OnFailedToResolveSymbol, $source.OnSuccessfullyResolvedSymbol);
    }
    declare private readonly then?: never;
    static Resolve(r: {
        value: NameResolver;
    } | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring, meaning: SymbolFlags__from_ast, nameNotFoundMessage: {
        value: Message__from_diagnostics;
    } | undefined, isUse: bool, excludeGlobals: bool): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        let lastLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let lastSelfReferenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let propertyWithInvalidInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let associatedDeclarationForContainingInitializerOrBindingName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let withinDeferredContext = false;
        let grandparent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let originalLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = location;
        let nameIsConst = name === "const";
        loop: for (; !(location === undefined);) {
            if (nameIsConst && IsConstAssertion__from_ast(location)) {
                return void 0;
            }
            if (IsModuleOrEnumDeclaration__from_ast(location) && !(lastLocation === undefined) &&
                tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(location), lastLocation)) {
                lastLocation = location;
                location = Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            let locals: SymbolTable__from_ast = Node__from_ast.Locals(location);
            if (!locals.$value.isNil() && !IsGlobalSourceFile__from_ast(location)) {
                result = NameResolver.$go$private$binder$lookup(r, locals, name, meaning);
                if (!(result === undefined)) {
                    let useResult = true;
                    if (IsFunctionLike__from_ast(location) && !(lastLocation === undefined) && !tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Body(location))) {
                        if (!(((meaning & Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags) >>> 0 & SymbolFlagsType$constant__from_ast()) >>> 0 === 0) && !(Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDoc$constant__from_ast())) {
                            useResult = !((Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0) && (!((Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsSynthesized$constant__from_ast()) >>> 0 === 0) ||
                                tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Type(location)) || Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast() || Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocParameterTag$constant__from_ast() || Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocReturnTag$constant__from_ast() || Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeParameter$constant__from_ast());
                        }
                        if (!(((meaning & Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags) >>> 0 & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0)) {
                            if (NameResolver.$go$private$binder$useOuterVariableScopeInParameter(r, result, location, lastLocation)) {
                                useResult = false;
                            }
                            else if (!((Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsFunctionScopedVariable$constant__from_ast()) >>> 0 === 0)) {
                                useResult = Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast() || !((Node__from_ast.$storageOf(((lastLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsSynthesized$constant__from_ast()) >>> 0 === 0) || tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Type(location))
                                    && !(FindAncestor__from_ast(Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, IsParameterDeclaration__from_ast) === undefined);
                            }
                        }
                    }
                    else if (Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConditionalType$constant__from_ast()) {
                        useResult =
                            tsonicTypeScriptRuntime.sameLocation(lastLocation, (Node__from_ast.AsConditionalTypeNode(location) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType);
                    }
                    if (useResult) {
                        break loop;
                    }
                    result = void 0;
                }
            }
            withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation);
            {
                const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
                let __gotots_switch_selection_0 = -1;
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_0 = false;
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindSourceFile$constant__from_ast();
                    }
                    if (__gotots_switch_match_0) {
                        __gotots_switch_selection_0 = 0;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_1 = false;
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 = __gotots_switch_tag_0 === KindModuleDeclaration$constant__from_ast();
                    }
                    if (__gotots_switch_match_1) {
                        __gotots_switch_selection_0 = 1;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_2 = false;
                    if (!__gotots_switch_match_2) {
                        __gotots_switch_match_2 = __gotots_switch_tag_0 === KindEnumDeclaration$constant__from_ast();
                    }
                    if (__gotots_switch_match_2) {
                        __gotots_switch_selection_0 = 2;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_3 = false;
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_0 === KindPropertyDeclaration$constant__from_ast();
                    }
                    if (__gotots_switch_match_3) {
                        __gotots_switch_selection_0 = 3;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_4 = false;
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === KindClassDeclaration$constant__from_ast();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === KindClassExpression$constant__from_ast();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === KindInterfaceDeclaration$constant__from_ast();
                    }
                    if (__gotots_switch_match_4) {
                        __gotots_switch_selection_0 = 4;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_5 = false;
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 = __gotots_switch_tag_0 === KindExpressionWithTypeArguments$constant__from_ast();
                    }
                    if (__gotots_switch_match_5) {
                        __gotots_switch_selection_0 = 5;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_6 = false;
                    if (!__gotots_switch_match_6) {
                        __gotots_switch_match_6 = __gotots_switch_tag_0 === KindComputedPropertyName$constant__from_ast();
                    }
                    if (__gotots_switch_match_6) {
                        __gotots_switch_selection_0 = 6;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_7 = false;
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === KindMethodDeclaration$constant__from_ast();
                    }
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === KindConstructor$constant__from_ast();
                    }
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === KindGetAccessor$constant__from_ast();
                    }
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === KindSetAccessor$constant__from_ast();
                    }
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant__from_ast();
                    }
                    if (__gotots_switch_match_7) {
                        __gotots_switch_selection_0 = 7;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_8 = false;
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_0 === KindFunctionExpression$constant__from_ast();
                    }
                    if (__gotots_switch_match_8) {
                        __gotots_switch_selection_0 = 8;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_9 = false;
                    if (!__gotots_switch_match_9) {
                        __gotots_switch_match_9 = __gotots_switch_tag_0 === KindDecorator$constant__from_ast();
                    }
                    if (__gotots_switch_match_9) {
                        __gotots_switch_selection_0 = 9;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_10 = false;
                    if (!__gotots_switch_match_10) {
                        __gotots_switch_match_10 = __gotots_switch_tag_0 === KindParameter$constant__from_ast();
                    }
                    if (__gotots_switch_match_10) {
                        __gotots_switch_selection_0 = 10;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_11 = false;
                    if (!__gotots_switch_match_11) {
                        __gotots_switch_match_11 = __gotots_switch_tag_0 === KindBindingElement$constant__from_ast();
                    }
                    if (__gotots_switch_match_11) {
                        __gotots_switch_selection_0 = 11;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_12 = false;
                    if (!__gotots_switch_match_12) {
                        __gotots_switch_match_12 = __gotots_switch_tag_0 === KindInferType$constant__from_ast();
                    }
                    if (__gotots_switch_match_12) {
                        __gotots_switch_selection_0 = 12;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_13 = false;
                    if (!__gotots_switch_match_13) {
                        __gotots_switch_match_13 = __gotots_switch_tag_0 === KindExportSpecifier$constant__from_ast();
                    }
                    if (__gotots_switch_match_13) {
                        __gotots_switch_selection_0 = 13;
                    }
                }
                __gotots_control_target_0: {
                    if (__gotots_switch_selection_0 === 0) {
                        if (!IsExternalOrCommonJSModule__from_ast(Node__from_ast.AsSourceFile(location))) {
                            break __gotots_control_target_0;
                        }
                        __gotots_switch_selection_0 = 1;
                    }
                    if (__gotots_switch_selection_0 === 1) {
                        let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = NameResolver.$go$private$binder$getSymbolOfDeclaration(r, location);
                        if (moduleSymbol === undefined) {
                            break __gotots_control_target_0;
                        }
                        let moduleExports: SymbolTable__from_ast = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports);
                        if (IsSourceFile__from_ast(location) || (IsModuleDeclaration__from_ast(location) && !((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0) && !IsGlobalScopeAugmentation__from_ast(location))) {
                            result = moduleExports.$value.lookup(InternalSymbolNameDefault$string__from_ast);
                            if (!(result === undefined)) {
                                let localSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = GetLocalSymbolForExportDefault(result);
                                if (!(localSymbol === undefined) && !((Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & meaning) >>> 0 === 0) && Symbol__from_ast.$storageOf(((localSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === name) {
                                    break loop;
                                }
                                result = void 0;
                            }
                            let moduleExport: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = moduleExports.$value.lookup(name);
                            if (!(moduleExport === undefined) && Symbol__from_ast.$storageOf(((moduleExport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags === SymbolFlagsAlias$constant__from_ast() && (!(GetDeclarationOfKind__from_ast(moduleExport, KindExportSpecifier$constant__from_ast()) === undefined) || !(GetDeclarationOfKind__from_ast(moduleExport, KindNamespaceExport$constant__from_ast()) === undefined))) {
                                break __gotots_control_target_0;
                            }
                        }
                        if (name !== InternalSymbolNameDefault$string__from_ast) {
                            {
                                result = NameResolver.$go$private$binder$lookup(r, moduleExports, name, (meaning & SymbolFlagsModuleMember$constant__from_ast()) >>> 0);
                                if (!(result === undefined)) {
                                    if (IsSourceFile__from_ast(location) && !(((Node__from_ast.AsSourceFile(location) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined) && (Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsType$constant__from_ast()) >>> 0 === 0) {
                                        result = void 0;
                                    }
                                    else {
                                        break loop;
                                    }
                                }
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 2) {
                        let enumSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = NameResolver.$go$private$binder$getSymbolOfDeclaration(r, location);
                        if (enumSymbol === undefined) {
                            break __gotots_control_target_0;
                        }
                        result = NameResolver.$go$private$binder$lookup(r, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((enumSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports), name, (meaning & SymbolFlagsEnumMember$constant__from_ast()) >>> 0);
                        if (!(result === undefined)) {
                            if (!(nameNotFoundMessage === undefined) && CompilerOptions__from_core.GetIsolatedModules((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions) && (Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0 && !tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(location), GetSourceFileOfNode__from_ast(Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration))) {
                                let isolatedModulesLikeFlagName = IfElse$string(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax === TSTrue$constant__from_core(), "verbatimModuleSyntax", "isolatedModules");
                                NameResolver.$go$private$binder$error(r, originalLocation, $state__diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(name), new GoInterfaceAdapter(isolatedModulesLikeFlagName), new GoInterfaceAdapter(Symbol__from_ast.$storageOf(((enumSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name + "." + name)]));
                            }
                            break loop;
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 3) {
                        if (!IsStatic__from_ast(location)) {
                            let ctor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindConstructorDeclaration__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                            if (!(ctor === undefined) && !Node__from_ast.Locals(ctor).$value.isNil()) {
                                if (!(NameResolver.$go$private$binder$lookup(r, Node__from_ast.Locals(ctor), name, (meaning & SymbolFlagsValue$constant__from_ast()) >>> 0) === undefined)) {
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 4) {
                        result = NameResolver.$go$private$binder$lookup(r, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((NameResolver.$go$private$binder$getSymbolOfDeclaration(r, location) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members), name, (meaning & SymbolFlagsType$constant__from_ast()) >>> 0);
                        if (!(result === undefined)) {
                            if (!isTypeParameterSymbolDeclaredInContainer(result, location)) {
                                result = void 0;
                                break __gotots_control_target_0;
                            }
                            if (!(lastLocation === undefined) && IsStatic__from_ast(lastLocation)) {
                                if (!(nameNotFoundMessage === undefined)) {
                                    NameResolver.$go$private$binder$error(r, originalLocation, $state__diagnostics.Static_members_cannot_reference_class_type_parameters, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                                return void 0;
                            }
                            break loop;
                        }
                        if (IsClassExpression__from_ast(location) && !((meaning & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
                            let className: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(location);
                            if (!(className === undefined) && name === Node__from_ast.Text(className)) {
                                result = Node__from_ast.Symbol(location);
                                break loop;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 5) {
                        if (tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Expression(location))
                            && IsHeritageClause__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindExtendsKeyword$constant__from_ast()) {
                            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                            if (IsClassLike__from_ast(container)) {
                                result = NameResolver.$go$private$binder$lookup(r, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((NameResolver.$go$private$binder$getSymbolOfDeclaration(r, container) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members), name, (meaning & SymbolFlagsType$constant__from_ast()) >>> 0);
                                if (!(result === undefined)) {
                                    if (!(nameNotFoundMessage === undefined)) {
                                        NameResolver.$go$private$binder$error(r, originalLocation, $state__diagnostics.Base_class_expressions_cannot_reference_class_type_parameters, RuntimeSlice.nil<GoInterface | undefined>());
                                    }
                                    return void 0;
                                }
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 6) {
                        grandparent = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        if (IsClassLike__from_ast(grandparent) || IsInterfaceDeclaration__from_ast(grandparent)) {
                            result = NameResolver.$go$private$binder$lookup(r, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((NameResolver.$go$private$binder$getSymbolOfDeclaration(r, grandparent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members), name, (meaning & SymbolFlagsType$constant__from_ast()) >>> 0);
                            if (!(result === undefined)) {
                                if (!(nameNotFoundMessage === undefined)) {
                                    NameResolver.$go$private$binder$error(r, originalLocation, $state__diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                                return void 0;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 7) {
                        if (!((meaning & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0) && name === "arguments") {
                            result = NameResolver.$go$private$binder$argumentsSymbol(r);
                            break loop;
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 8) {
                        if (!((meaning & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0) && name === "arguments") {
                            result = NameResolver.$go$private$binder$argumentsSymbol(r);
                            break loop;
                        }
                        if (!((meaning & SymbolFlagsFunction$constant__from_ast()) >>> 0 === 0)) {
                            let functionName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FunctionExpression__from_ast.Name(Node__from_ast.AsFunctionExpression(location));
                            if (!(functionName === undefined) && name === Node__from_ast.Text(functionName)) {
                                result = Node__from_ast.Symbol(location);
                                break loop;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 9) {
                        if (!(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
                            location = Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        }
                        if (!(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (IsClassElement__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast())) {
                            location = Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 10) {
                        let parameterDeclaration: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(location);
                        if (!(lastLocation === undefined) && (tsonicTypeScriptRuntime.sameLocation(lastLocation, ParameterDeclaration__from_ast.$storageOf(((parameterDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer)
                            || tsonicTypeScriptRuntime.sameLocation(lastLocation, ParameterDeclaration__from_ast.Name(parameterDeclaration))
                                && IsBindingPattern__from_ast(lastLocation))) {
                            if (associatedDeclarationForContainingInitializerOrBindingName === undefined) {
                                associatedDeclarationForContainingInitializerOrBindingName = location;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 11) {
                        let bindingElement: {
                            value: BindingElement__from_ast;
                        } | undefined = Node__from_ast.AsBindingElement(location);
                        if (!(lastLocation === undefined) && (tsonicTypeScriptRuntime.sameLocation(lastLocation, (bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer)
                            || tsonicTypeScriptRuntime.sameLocation(lastLocation, BindingElement__from_ast.Name(bindingElement))
                                && IsBindingPattern__from_ast(lastLocation))) {
                            if (IsPartOfParameterDeclaration__from_ast(location) && associatedDeclarationForContainingInitializerOrBindingName === undefined) {
                                associatedDeclarationForContainingInitializerOrBindingName = location;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 12) {
                        if (!((meaning & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
                            let parameterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeParameterDeclaration__from_ast.Name(Node__from_ast.AsTypeParameterDeclaration((Node__from_ast.AsInferTypeNode(location) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter));
                            if (!(parameterName === undefined) && name === Node__from_ast.Text(parameterName)) {
                                result = Node__from_ast.Symbol((Node__from_ast.AsInferTypeNode(location) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter);
                                break loop;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 13) {
                        let exportSpecifier: {
                            value: ExportSpecifier__from_ast;
                        } | undefined = Node__from_ast.AsExportSpecifier(location);
                        if (!(lastLocation === undefined) &&
                            tsonicTypeScriptRuntime.sameLocation(lastLocation, (exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName) && !(Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined)) {
                            location = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        }
                        break __gotots_control_target_0;
                    }
                }
            }
            if (isSelfReferenceLocation(location, lastLocation)) {
                lastSelfReferenceLocation = location;
            }
            lastLocation = location;
            location = Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        if (isUse && !(result === undefined) && (lastSelfReferenceLocation === undefined || !tsonicTypeScriptRuntime.sameLocation(result, Node__from_ast.Symbol(lastSelfReferenceLocation)))) {
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SymbolReferenced === undefined)) {
                const __gotots_callee_0: NameResolver["SymbolReferenced"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SymbolReferenced;
                const __gotots_argument_0 = result;
                const __gotots_argument_1 = meaning;
                (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
            }
        }
        if (result === undefined && !excludeGlobals) {
            result = NameResolver.$go$private$binder$lookup(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Globals, name, (meaning | SymbolFlagsGlobalLookup$constant__from_ast()) >>> 0);
        }
        if (result === undefined) {
            if (!(originalLocation === undefined) && IsInJSFile__from_ast(originalLocation) && !(Node__from_ast.$storageOf(((originalLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
                if (IsRequireCall__from_ast(Node__from_ast.$storageOf(((originalLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, false)) {
                    return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RequireSymbol;
                }
            }
        }
        if (!(nameNotFoundMessage === undefined)) {
            let __gotots_logical_result_0 = !(propertyWithInvalidInitializer === undefined) && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OnPropertyWithInvalidInitializer === undefined);
            if (__gotots_logical_result_0) {
                const __gotots_callee_1: NameResolver["OnPropertyWithInvalidInitializer"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OnPropertyWithInvalidInitializer;
                const __gotots_argument_2 = originalLocation;
                const __gotots_argument_3 = name;
                const __gotots_argument_4 = propertyWithInvalidInitializer;
                const __gotots_argument_5 = result;
                __gotots_logical_result_0 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
            }
            if (__gotots_logical_result_0) {
                return void 0;
            }
            if (result === undefined) {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OnFailedToResolveSymbol === undefined)) {
                    const __gotots_callee_2: NameResolver["OnFailedToResolveSymbol"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OnFailedToResolveSymbol;
                    const __gotots_argument_6 = originalLocation;
                    const __gotots_argument_7 = name;
                    const __gotots_argument_8 = meaning;
                    const __gotots_argument_9 = nameNotFoundMessage;
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
                }
            }
            else {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OnSuccessfullyResolvedSymbol === undefined)) {
                    const __gotots_callee_3: NameResolver["OnSuccessfullyResolvedSymbol"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OnSuccessfullyResolvedSymbol;
                    const __gotots_argument_10 = originalLocation;
                    const __gotots_argument_11 = result;
                    const __gotots_argument_12 = meaning;
                    const __gotots_argument_13 = lastLocation;
                    const __gotots_argument_14 = associatedDeclarationForContainingInitializerOrBindingName;
                    const __gotots_argument_15 = withinDeferredContext;
                    (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
                }
            }
        }
        return result;
    }
    static $go$private$binder$argumentsSymbol(r: {
        value: NameResolver;
    } | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ArgumentsSymbol === undefined) {
            const __gotots_field_0 = "arguments";
            const __gotots_field_1 = 33554436;
            const __gotots_struct_0 = Symbol__from_ast.$zero();
            Symbol__from_ast.$storageOf(__gotots_struct_0).Name = __gotots_field_0;
            Symbol__from_ast.$storageOf(__gotots_struct_0).Flags = __gotots_field_1;
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ArgumentsSymbol =
                tsonicTypeScriptRuntime.location<Symbol__from_ast>(__gotots_struct_0);
        }
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ArgumentsSymbol;
    }
    static $go$private$binder$error(r: {
        value: NameResolver;
    } | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Error === undefined)) {
            const __gotots_callee_8: NameResolver["Error"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Error;
            const __gotots_argument_28 = location;
            const __gotots_argument_29 = message;
            const __gotots_argument_30 = args;
            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28, __gotots_argument_29, __gotots_argument_30);
        }
    }
    static $go$private$binder$getSymbolOfDeclaration(r: {
        value: NameResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GetSymbolOfDeclaration === undefined)) {
            const __gotots_callee_7: NameResolver["GetSymbolOfDeclaration"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GetSymbolOfDeclaration;
            const __gotots_argument_27 = node;
            return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
        }
        return Node__from_ast.Symbol(node);
    }
    static $go$private$binder$lookup(r: {
        value: NameResolver;
    } | undefined, symbols: SymbolTable__from_ast, name: gostring, meaning: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lookup === undefined)) {
            const __gotots_callee_4: NameResolver["Lookup"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lookup;
            const __gotots_argument_16 = symbols;
            const __gotots_argument_17 = name;
            const __gotots_argument_18 = meaning;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
        }
        if (!(meaning === 0)) {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = symbols.$value.lookup(name);
            if (!(__go_symbol === undefined)) {
                if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & meaning) >>> 0 === 0)) {
                    return __go_symbol;
                }
            }
        }
        return void 0;
    }
    static $go$private$binder$requiresScopeChange(r: {
        value: NameResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let d: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(node);
        return NameResolver.$go$private$binder$requiresScopeChangeWorker(r, ParameterDeclaration__from_ast.Name(d)) || !(ParameterDeclaration__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) && NameResolver.$go$private$binder$requiresScopeChangeWorker(r, ParameterDeclaration__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
    }
    static $go$private$binder$requiresScopeChangeWorker(r: {
        value: NameResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindArrowFunction$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindConstructor$constant__from_ast(): {
                return false;
                break;
            }
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindPropertyAssignment$constant__from_ast(): {
                return NameResolver.$go$private$binder$requiresScopeChangeWorker(r, Node__from_ast.Name(node));
                break;
            }
            case KindPropertyDeclaration$constant__from_ast(): {
                if (HasStaticModifier__from_ast(node)) {
                    return !CompilerOptions__from_core.GetEmitStandardClassFields((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions);
                }
                return NameResolver.$go$private$binder$requiresScopeChangeWorker(r, PropertyDeclaration__from_ast.Name(Node__from_ast.AsPropertyDeclaration(node)));
                break;
            }
            default: {
                if (IsNullishCoalesce__from_ast(node) || IsOptionalChain__from_ast(node)) {
                    return CompilerOptions__from_core.GetEmitScriptTarget((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions) < ScriptTargetES2020$constant__from_core();
                }
                if (IsBindingElement__from_ast(node) && !((Node__from_ast.AsBindingElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined) && IsObjectBindingPattern__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    return CompilerOptions__from_core.GetEmitScriptTarget((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions) < ScriptTargetES2017$constant__from_core();
                }
                if (IsTypeNode__from_ast(node)) {
                    return false;
                }
                const __gotots_receiver_2 = node;
                const __gotots_receiver_1 = r;
                const __gotots_argument_31 = new Visitor__from_ast(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return NameResolver.$go$private$binder$requiresScopeChangeWorker(__gotots_receiver_1, $argument0);
                });
                return Node__from_ast.ForEachChild(__gotots_receiver_2, __gotots_argument_31);
                break;
            }
        }
    }
    static $go$private$binder$useOuterVariableScopeInParameter(r: {
        value: NameResolver;
    } | undefined, result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lastLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (IsParameterDeclaration__from_ast(lastLocation)) {
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(location);
            if (!(body === undefined) && !(Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && Node__from_ast.Pos(Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) >= Node__from_ast.Pos(body) && Node__from_ast.End(Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) <= Node__from_ast.End(body)) {
                let functionLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = location;
                let declarationRequiresScopeChange = TSUnknown$constant__from_core();
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GetRequiresScopeChangeCache === undefined)) {
                    const __gotots_callee_5: NameResolver["GetRequiresScopeChangeCache"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GetRequiresScopeChangeCache;
                    const __gotots_argument_19 = functionLocation;
                    declarationRequiresScopeChange = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
                }
                if (declarationRequiresScopeChange === TSUnknown$constant__from_core()) {
                    const __gotots_argument_20 = Node__from_ast.Parameters(functionLocation);
                    const __gotots_receiver_0 = r;
                    const __gotots_argument_21 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        return NameResolver.$go$private$binder$requiresScopeChange(__gotots_receiver_0, $argument0);
                    };
                    const __gotots_argument_22 = Some$PointerTo_Named_ast$Node(__gotots_argument_20, __gotots_argument_21);
                    const __gotots_argument_23 = TSTrue$constant__from_core();
                    const __gotots_argument_24 = TSFalse$constant__from_core();
                    declarationRequiresScopeChange = IfElse$Named_core$Tristate(__gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
                    if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SetRequiresScopeChangeCache === undefined)) {
                        const __gotots_callee_6: NameResolver["SetRequiresScopeChangeCache"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SetRequiresScopeChangeCache;
                        const __gotots_argument_25 = functionLocation;
                        const __gotots_argument_26 = declarationRequiresScopeChange;
                        (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26);
                    }
                }
                return !(declarationRequiresScopeChange === TSTrue$constant__from_core());
            }
        }
        return false;
    }
}
export function GetLocalSymbolForExportDefault(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (!isExportDefaultSymbol(__go_symbol) || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0) {
        return void 0;
    }
    const __gotots_range_0 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        let localSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.LocalSymbol(decl);
        if (!(localSymbol === undefined)) {
            return localSymbol;
        }
    }
    return void 0;
}
export function isExportDefaultSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(__go_symbol === undefined) && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0 && HasSyntacticModifier__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0), ModifierFlagsDefault$constant__from_ast());
}
export function getIsDeferredContext(location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lastLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast()) && !(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast())) {
        return IsTypeQueryNode__from_ast(location) || (IsFunctionLikeDeclaration__from_ast(location) || Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyDeclaration$constant__from_ast() && !IsStatic__from_ast(location)) && (lastLocation === undefined || !tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Name(location)));
    }
    if (!(lastLocation === undefined) &&
        tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Name(location))) {
        return false;
    }
    if (!(BodyBase__from_ast.$storageOf(((Node__from_ast.BodyData(location) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase__from_ast>).value).AsteriskToken === undefined) || HasSyntacticModifier__from_ast(location, ModifierFlagsAsync$constant__from_ast())) {
        return true;
    }
    return GetImmediatelyInvokedFunctionExpression__from_ast(location) === undefined;
}
export function isTypeParameterSymbolDeclaredInContainer(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    const __gotots_range_1 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeParameter$constant__from_ast()) {
            let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (tsonicTypeScriptRuntime.sameLocation(parent, container)) {
                return true;
            }
        }
    }
    return false;
}
export function isSelfReferenceLocation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lastLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParameter$constant__from_ast(): {
            return !(lastLocation === undefined) &&
                tsonicTypeScriptRuntime.sameLocation(lastLocation, Node__from_ast.Name(node));
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSTypeAliasDeclaration$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
