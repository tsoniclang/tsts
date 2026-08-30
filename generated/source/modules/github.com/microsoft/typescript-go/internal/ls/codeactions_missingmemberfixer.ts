import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, FunctionExpression as FunctionExpression__from_ast, Kind as Kind__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { IndexInfo as IndexInfo__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ImportAdder as ImportAdder__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { Tracker as Tracker__from_change } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import type { QuotePreference as QuotePreference__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { Flags as Flags__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { BodyBase as BodyBase__from_ast, CheckFlagsMapped$constant as CheckFlagsMapped$constant__from_ast, CreateModifiersFromModifierFlags as CreateModifiersFromModifierFlags__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAllAccessorDeclarations as GetAllAccessorDeclarations__from_ast, HasAbstractModifier as HasAbstractModifier__from_ast, IsAutoAccessorPropertyDeclaration as IsAutoAccessorPropertyDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInJSFile as IsInJSFile__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindDotDotDotToken$constant as KindDotDotDotToken$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, ModifierFlagsAccessor$constant as ModifierFlagsAccessor$constant__from_ast, ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierFlagsOverride$constant as ModifierFlagsOverride$constant__from_ast, ModifierFlagsProtected$constant as ModifierFlagsProtected$constant__from_ast, ModifierFlagsPublic$constant as ModifierFlagsPublic$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, Symbol as Symbol__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, GetDeclarationModifierFlagsFromSymbol as GetDeclarationModifierFlagsFromSymbol__from_checker, GetPropertyNameFromType as GetPropertyNameFromType__from_checker, GetSetAccessorValueParameter as GetSetAccessorValueParameter__from_checker, IsTypeUsableAsPropertyName as IsTypeUsableAsPropertyName__from_checker, NewNodeBuilderEx as NewNodeBuilderEx__from_checker, NewNodeBuilder as NewNodeBuilder__from_checker, NodeBuilder as NodeBuilder__from_checker, Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { TryGetAutoImportableReferenceFromTypeNode as TryGetAutoImportableReferenceFromTypeNode__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import { GetQuotePreference as GetQuotePreference__from_lsutil, QuotePreferenceSingle$constant as QuotePreferenceSingle$constant__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { FlagsNoTruncation$constant as FlagsNoTruncation$constant__from_nodebuilder, FlagsNone$constant as FlagsNone$constant__from_nodebuilder, FlagsUseSingleQuotesForStringLiteralType$constant as FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder, InternalFlagsAllowUnresolvedNames$constant as InternalFlagsAllowUnresolvedNames$constant__from_nodebuilder, InternalFlagsNone$constant as InternalFlagsNone$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { FirstOrNil$PointerTo_Named_ast$Node, FirstOrNil$PointerTo_Named_checker$Signature } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { FlatMap$PointerTo_Named_checker$Type$PointerTo_Named_checker$Signature } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FlatMap.js";
import { IfElse$PointerTo_Named_ast$Node, IfElse$PointerTo_Named_ast$NodeList, IfElse$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { LastOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { OrElse$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/OrElse.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_bool } from "../../../../../../support/maps.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class preserveOptionalFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function preserveOptionalFlagsMethod$constant(): preserveOptionalFlags {
    return new preserveOptionalFlags(1);
}
export function preserveOptionalFlagsProperty$constant(): preserveOptionalFlags {
    return new preserveOptionalFlags(2);
}
export function preserveOptionalFlagsAll$constant(): preserveOptionalFlags {
    return new preserveOptionalFlags(3);
}
export class missingMemberFixer {
    declare private readonly $goType: void;
    public constructor(public changeTracker: Tracker__from_change | undefined, public typeChecker: {
        value: Checker__from_checker;
    } | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public preferences: UserPreferences__from_lsutil, public importAdder: ImportAdder__from_autoimport | undefined, public locale: Locale__from_locale) {
    }
    declare private readonly then?: never;
    static $go$private$ls$createBody(f: missingMemberFixer | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ambient: bool, quotePreference: QuotePreference__from_lsutil): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (ambient) {
            return void 0;
        }
        body = NodeFactory__from_ast.DeepCloneNode(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, body);
        if (body === undefined) {
            return missingMemberFixer.$go$private$ls$createStubbedMethodBody(f, quotePreference);
        }
        return body;
    }
    static $go$private$ls$createIndexSignatureDeclarationFromType(f: missingMemberFixer | undefined, classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, implementedType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, keyType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let indexInfo: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined = Checker__from_checker.GetIndexInfoOfType((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, implementedType, keyType);
        if (indexInfo === undefined) {
            return void 0;
        }
        let builder: NodeBuilder__from_checker | undefined = NewNodeBuilder__from_checker((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext);
        return NodeBuilder__from_checker.IndexInfoToIndexSignatureDeclaration(builder, indexInfo, classDeclaration, FlagsNone$constant__from_nodebuilder(), InternalFlagsNone$constant__from_nodebuilder(), void 0);
    }
    static $go$private$ls$createMemberFromSymbol(f: missingMemberFixer | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, preserveOptional: preserveOptionalFlags): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let declarations = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstOrNil$PointerTo_Named_ast$Node(declarations);
        let quotePreference = GetQuotePreference__from_lsutil(sourceFile, UserPreferences__from_lsutil.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
        let ambient = !((Node__from_ast.$storageOf(((enclosingDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0);
        let optional = !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0);
        let kind = KindPropertySignature$constant__from_ast();
        if (!(declaration === undefined)) {
            kind = Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        }
        let declarationName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createDeclarationName(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, __go_symbol, declaration);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = missingMemberFixer.$go$private$ls$createModifiers(f, __go_symbol, declaration);
        let flags = FlagsNoTruncation$constant__from_nodebuilder();
        if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
            flags = (flags | 268435456) >>> 0;
        }
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetWidenedType((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, Checker__from_checker.GetTypeOfSymbolAtLocation((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, __go_symbol, enclosingDeclaration));
        let nodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        switch (kind) {
            case KindPropertySignature$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast(): {
                const __gotots_results_0 = missingMemberFixer.$go$private$ls$createNodeBuilder(f);
                let nodeBuilder: NodeBuilder__from_checker | undefined = __gotots_results_0[0];
                let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = __gotots_results_0[1];
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createTypeNode(f, t, enclosingDeclaration, flags, nodeBuilder, idToSymbol);
                let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (optional && !(((void preserveOptionalFlags,
                    preserveOptional.$value & preserveOptionalFlagsProperty$constant().$value) as int)
                    ===
                        ((void preserveOptionalFlags,
                            0) as int))) {
                    questionToken = NodeFactory__from_ast.NewToken(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindQuestionToken$constant__from_ast());
                }
                return nodes.append(void 0, [NodeFactory__from_ast.NewPropertyDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, modifiers, createPropertyName(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, declarationName, quotePreference), questionToken, typeNode, void 0)]);
                break;
            }
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast(): {
                const __gotots_results_1 = missingMemberFixer.$go$private$ls$createNodeBuilder(f);
                let nodeBuilder: NodeBuilder__from_checker | undefined = __gotots_results_1[0];
                let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = __gotots_results_1[1];
                let accessors = GetAllAccessorDeclarations__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, declaration);
                let orderedAccessors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                if (accessors.SecondAccessor === undefined) {
                    orderedAccessors = orderedAccessors.append(void 0, [accessors.FirstAccessor]);
                }
                else {
                    orderedAccessors = orderedAccessors.append(void 0, [accessors.FirstAccessor, accessors.SecondAccessor]);
                }
                const __gotots_range_0 = orderedAccessors;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                    if (IsGetAccessorDeclaration__from_ast(__go_accessor)) {
                        nodes = nodes.append(void 0, [NodeFactory__from_ast.NewGetAccessorDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, modifiers, createPropertyName(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, declarationName, quotePreference), void 0, void 0, missingMemberFixer.$go$private$ls$createTypeNode(f, t, enclosingDeclaration, flags, nodeBuilder, idToSymbol), void 0, missingMemberFixer.$go$private$ls$createBody(f, body, ambient, quotePreference))]);
                    }
                    if (IsSetAccessorDeclaration__from_ast(__go_accessor)) {
                        let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetSetAccessorValueParameter__from_checker(__go_accessor);
                        if (parameter === undefined) {
                            const __gotots_argument_0 = new GoInterfaceAdapter("Expected set accessor to have a parameter.");
                            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                        }
                        nodes = nodes.append(void 0, [NodeFactory__from_ast.NewSetAccessorDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, modifiers, createPropertyName(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, declarationName, quotePreference), void 0, createDummyParameters(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, 1, RuntimeSlice.literal<gostring>([Node__from_ast.Text(Node__from_ast.Name(parameter))]), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([missingMemberFixer.$go$private$ls$createTypeNode(f, t, enclosingDeclaration, flags, nodeBuilder, idToSymbol)]), 1, IsInJSFile__from_ast(enclosingDeclaration)), void 0, void 0, missingMemberFixer.$go$private$ls$createBody(f, body, ambient, quotePreference))]);
                    }
                }
                return nodes;
                break;
            }
            case KindMethodSignature$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast(): {
                let signatures = missingMemberFixer.$go$private$ls$getCallSignatures(f, t);
                let preserveOptional__shadow_1 = optional && !(((void preserveOptionalFlags,
                    preserveOptional.$value & preserveOptionalFlagsMethod$constant().$value) as int)
                    ===
                        ((void preserveOptionalFlags,
                            0) as int));
                if (signatures.length === 0) {
                    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                }
                if (declarations.length === 1) {
                    let method: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createSignatureDeclarationFromSignature(f, FirstOrNil$PointerTo_Named_checker$Signature(signatures), KindMethodDeclaration$constant__from_ast(), sourceFile, enclosingDeclaration, missingMemberFixer.$go$private$ls$createBody(f, body, ambient, quotePreference), modifiers, declarationName, preserveOptional__shadow_1);
                    if (!(method === undefined)) {
                        nodes = nodes.append(void 0, [method]);
                    }
                    return nodes;
                }
                const __gotots_range_1 = signatures;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_range_value_1;
                    if (!(Signature__from_checker.Declaration(signature) === undefined) && !((Node__from_ast.$storageOf(((Signature__from_checker.Declaration(signature) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0)) {
                        continue;
                    }
                    let method: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createSignatureDeclarationFromSignature(f, signature, KindMethodDeclaration$constant__from_ast(), sourceFile, enclosingDeclaration, void 0, modifiers, declarationName, preserveOptional__shadow_1);
                    if (!(method === undefined)) {
                        nodes = nodes.append(void 0, [method]);
                    }
                }
                if (ambient) {
                    return nodes;
                }
                if (declarations.length > signatures.length) {
                    let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetSignatureFromDeclaration((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, LastOrNil$PointerTo_Named_ast$Node(declarations));
                    let method: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createSignatureDeclarationFromSignature(f, signature, KindMethodDeclaration$constant__from_ast(), sourceFile, enclosingDeclaration, missingMemberFixer.$go$private$ls$createBody(f, body, ambient, quotePreference), modifiers, declarationName, preserveOptional__shadow_1);
                    if (!(method === undefined)) {
                        nodes = nodes.append(void 0, [method]);
                    }
                }
                else {
                    let method: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = missingMemberFixer.$go$private$ls$createSignatureDeclarationFromSignatures(f, signatures, declarationName, preserveOptional__shadow_1, modifiers, quotePreference, body, enclosingDeclaration);
                    if (!(method === undefined)) {
                        nodes = nodes.append(void 0, [method]);
                    }
                }
                return nodes;
                break;
            }
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    static $go$private$ls$createModifiers(f: missingMemberFixer | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        let modifierFlags = ModifierFlagsNone$constant__from_ast();
        if (!(declaration === undefined)) {
            let effective = GetDeclarationModifierFlagsFromSymbol__from_checker(__go_symbol);
            modifierFlags = (effective & ModifierFlagsStatic$constant__from_ast()) >>> 0;
            if (!((effective & ModifierFlagsPublic$constant__from_ast()) >>> 0 === 0)) {
                modifierFlags = (modifierFlags | 1) >>> 0;
            }
            else if (!((effective & ModifierFlagsProtected$constant__from_ast()) >>> 0 === 0)) {
                modifierFlags = (modifierFlags | 4) >>> 0;
            }
            if (IsAutoAccessorPropertyDeclaration__from_ast(declaration)) {
                modifierFlags = (modifierFlags | 512) >>> 0;
            }
        }
        if (missingMemberFixer.$go$private$ls$shouldAddOverrideKeyword(f, declaration)) {
            modifierFlags = (modifierFlags | 16) >>> 0;
        }
        if (modifierFlags === ModifierFlagsNone$constant__from_ast()) {
            return void 0;
        }
        const __gotots_receiver_1 = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        const __gotots_argument_1 = modifierFlags;
        const __gotots_receiver_0 = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
        const __gotots_argument_2 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewModifier(__gotots_receiver_0, $argument0);
        };
        const __gotots_argument_3 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_1, __gotots_argument_2);
        return NodeFactory__from_ast.NewModifierList(__gotots_receiver_1, __gotots_argument_3);
    }
    static $go$private$ls$createNodeBuilder(f: missingMemberFixer | undefined): [
        NodeBuilder__from_checker | undefined,
        GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>
    ] {
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.make(0, []);
        let nodeBuilder: NodeBuilder__from_checker | undefined = NewNodeBuilderEx__from_checker((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext, idToSymbol);
        return [nodeBuilder, idToSymbol];
    }
    static $go$private$ls$createSignatureDeclarationFromSignature(f: missingMemberFixer | undefined, signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, kind: Kind__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let quotePreference = GetQuotePreference__from_lsutil(sourceFile, UserPreferences__from_lsutil.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
        let flags = 524545;
        if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
            flags = (flags | 268435456) >>> 0;
        }
        const __gotots_results_2 = missingMemberFixer.$go$private$ls$createNodeBuilder(f);
        let nodeBuilder: NodeBuilder__from_checker | undefined = __gotots_results_2[0];
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = __gotots_results_2[1];
        let signatureDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilder__from_checker.SignatureToSignatureDeclaration(nodeBuilder, signature, kind, enclosingDeclaration, flags, InternalFlagsAllowUnresolvedNames$constant__from_nodebuilder(), void 0);
        if (signatureDeclaration === undefined) {
            return void 0;
        }
        let isJS = IsInJSFile__from_ast(enclosingDeclaration);
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Node__from_ast.ParameterList(signatureDeclaration);
        let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = IfElse$PointerTo_Named_ast$NodeList(isJS, void 0, Node__from_ast.TypeParameterList(signatureDeclaration));
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(isJS, void 0, Node__from_ast.Type(signatureDeclaration));
        if (!(typeParameters === undefined) && NodeList__from_ast.$storageOf(((typeParameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            let nodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, NodeList__from_ast.$storageOf(((typeParameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
            const __gotots_range_3 = NodeList__from_ast.$storageOf(((typeParameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                let tp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                if (tp === undefined) {
                    continue;
                }
                if (IsTypeParameterDeclaration__from_ast(tp)) {
                    let typeParameter: tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined = Node__from_ast.AsTypeParameterDeclaration(tp);
                    let constraint: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeParameterDeclaration__from_ast.$storageOf(((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint;
                    if (!(constraint === undefined)) {
                        constraint = missingMemberFixer.$go$private$ls$importTypeNode(f, constraint, idToSymbol);
                    }
                    let defaultType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeParameterDeclaration__from_ast.$storageOf(((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType;
                    if (!(defaultType === undefined)) {
                        defaultType = missingMemberFixer.$go$private$ls$importTypeNode(f, defaultType, idToSymbol);
                    }
                    const __gotots_argument_12 = nodes;
                    const __gotots_receiver_3 = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
                    const __gotots_argument_6 = typeParameter;
                    const __gotots_store_0 = TypeParameterDeclaration__from_ast.$storageOf(((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value);
                    const __gotots_argument_7 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_0, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
                    const __gotots_argument_8 = TypeParameterDeclaration__from_ast.Name(typeParameter);
                    const __gotots_argument_9 = constraint;
                    const __gotots_argument_10 = TypeParameterDeclaration__from_ast.$storageOf(((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Expression;
                    const __gotots_argument_11 = defaultType;
                    const __gotots_argument_13 = NodeFactory__from_ast.UpdateTypeParameterDeclaration(__gotots_receiver_3, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                    nodes = __gotots_argument_12.append(void 0, [__gotots_argument_13]);
                }
                else {
                    nodes = nodes.append(void 0, [tp]);
                }
            }
            typeParameters = NodeFactory__from_ast.NewNodeList(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, nodes);
        }
        if (!(parameters === undefined)) {
            let nodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, NodeList__from_ast.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
            const __gotots_range_4 = NodeList__from_ast.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                if (p === undefined) {
                    continue;
                }
                let parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(p);
                let parameterTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type;
                if (!(parameterTypeNode === undefined)) {
                    parameterTypeNode = missingMemberFixer.$go$private$ls$importTypeNode(f, parameterTypeNode, idToSymbol);
                }
                const __gotots_argument_21 = nodes;
                const __gotots_receiver_4 = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory;
                const __gotots_argument_14 = parameter;
                const __gotots_store_1 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
                const __gotots_argument_15 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_1, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
                const __gotots_argument_16 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
                const __gotots_argument_17 = ParameterDeclaration__from_ast.Name(parameter);
                const __gotots_argument_18 = IfElse$PointerTo_Named_ast$Node(isJS, void 0, ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken);
                const __gotots_argument_19 = parameterTypeNode;
                const __gotots_argument_20 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer;
                const __gotots_argument_22 = NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_4, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
                nodes = __gotots_argument_21.append(void 0, [__gotots_argument_22]);
            }
            parameters = NodeFactory__from_ast.NewNodeList(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, nodes);
        }
        if (!(typeNode === undefined)) {
            typeNode = missingMemberFixer.$go$private$ls$importTypeNode(f, typeNode, idToSymbol);
        }
        let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (optional) {
            questionToken = NodeFactory__from_ast.NewToken(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindQuestionToken$constant__from_ast());
        }
        switch (kind) {
            case KindFunctionExpression$constant__from_ast(): {
                let fn: {
                    value: FunctionExpression__from_ast;
                } | undefined = Node__from_ast.AsFunctionExpression(signatureDeclaration);
                return NodeFactory__from_ast.UpdateFunctionExpression(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, fn, modifiers, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken, IfElse$PointerTo_Named_ast$Node(!(name === undefined) && IsIdentifier__from_ast(name), name, void 0), typeParameters, parameters, typeNode, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, OrElse$PointerTo_Named_ast$Node(body, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body));
                break;
            }
            case KindArrowFunction$constant__from_ast(): {
                let fn: {
                    value: ArrowFunction__from_ast;
                } | undefined = Node__from_ast.AsArrowFunction(signatureDeclaration);
                return NodeFactory__from_ast.UpdateArrowFunction(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, fn, modifiers, typeParameters, parameters, typeNode, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, (fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken, OrElse$PointerTo_Named_ast$Node(body, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body));
                break;
            }
            case KindMethodDeclaration$constant__from_ast(): {
                let method: {
                    value: MethodDeclaration__from_ast;
                } | undefined = Node__from_ast.AsMethodDeclaration(signatureDeclaration);
                let methodName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(name === undefined, NodeFactory__from_ast.NewIdentifier(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ""), createPropertyName(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, name, quotePreference));
                return NodeFactory__from_ast.UpdateMethodDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, method, modifiers, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((method ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken, methodName, questionToken, typeParameters, parameters, typeNode, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((method ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, body);
                break;
            }
            case KindFunctionDeclaration$constant__from_ast(): {
                let fn: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(signatureDeclaration);
                return NodeFactory__from_ast.UpdateFunctionDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, fn, modifiers, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken, IfElse$PointerTo_Named_ast$Node(!(name === undefined) && IsIdentifier__from_ast(name), name, void 0), typeParameters, parameters, typeNode, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).FullSignature, OrElse$PointerTo_Named_ast$Node(body, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body));
                break;
            }
        }
        return void 0;
    }
    static $go$private$ls$createSignatureDeclarationFromSignatures(f: missingMemberFixer | undefined, signatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, quotePreference: QuotePreference__from_lsutil, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (signatures.length === 0) {
            return void 0;
        }
        const __gotots_results_3 = missingMemberFixer.$go$private$ls$createNodeBuilder(f);
        let nodeBuilder: NodeBuilder__from_checker | undefined = __gotots_results_3[0];
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = __gotots_results_3[1];
        let maxArgsSignature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = signatures.get(0);
        let minArgumentCount = Signature__from_checker.MinArgumentCount(signatures.get(0));
        let hasRestParameter = false;
        const __gotots_range_5 = signatures;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_range_value_5;
            minArgumentCount = globalThis.Math.min(minArgumentCount, Signature__from_checker.MinArgumentCount(signature));
            if (Signature__from_checker.HasRestParameter(signature)) {
                hasRestParameter = true;
            }
            if (Signature__from_checker.Parameters(signature).length >= Signature__from_checker.Parameters(maxArgsSignature).length && (!Signature__from_checker.HasRestParameter(signature) || Signature__from_checker.HasRestParameter(maxArgsSignature))) {
                maxArgsSignature = signature;
            }
        }
        let maxNonRestArgs = Signature__from_checker.Parameters(maxArgsSignature).length - IfElse$int(Signature__from_checker.HasRestParameter(maxArgsSignature), 1, 0);
        let parameterNames = RuntimeSlice.make<gostring>(0, Signature__from_checker.Parameters(maxArgsSignature).length, "");
        const __gotots_range_6 = Signature__from_checker.Parameters(maxArgsSignature);
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_6;
            parameterNames = parameterNames.append("", [Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name]);
        }
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = createDummyParameters(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, maxNonRestArgs, parameterNames, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), minArgumentCount, IsInJSFile__from_ast(enclosingDeclaration));
        if (hasRestParameter) {
            let restParameterName = "rest";
            if (maxNonRestArgs < parameterNames.length && parameterNames.get(maxNonRestArgs) !== "") {
                restParameterName = parameterNames.get(maxNonRestArgs);
            }
            let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (maxNonRestArgs >= minArgumentCount) {
                questionToken = NodeFactory__from_ast.NewToken(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindQuestionToken$constant__from_ast());
            }
            NodeList__from_ast.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes = NodeList__from_ast.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.append(void 0, [NodeFactory__from_ast.NewParameterDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, void 0, NodeFactory__from_ast.NewToken(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindDotDotDotToken$constant__from_ast()), NodeFactory__from_ast.NewIdentifier(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, restParameterName), questionToken, NodeFactory__from_ast.NewArrayTypeNode(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewKeywordTypeNode(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindUnknownKeyword$constant__from_ast())), void 0)]);
        }
        let methodName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(name === undefined, NodeFactory__from_ast.NewIdentifier(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, ""), createPropertyName(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, name, quotePreference));
        return NodeFactory__from_ast.NewMethodDeclaration(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, modifiers, void 0, methodName, IfElse$PointerTo_Named_ast$Node(optional, NodeFactory__from_ast.NewToken(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindQuestionToken$constant__from_ast()), void 0), void 0, parameters, missingMemberFixer.$go$private$ls$getReturnTypeFromSignatures(f, signatures, enclosingDeclaration, nodeBuilder, idToSymbol), void 0, missingMemberFixer.$go$private$ls$createBody(f, body, false, quotePreference));
    }
    static $go$private$ls$createStubbedMethodBody(f: missingMemberFixer | undefined, quotePreference: QuotePreference__from_lsutil): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tokenFlags = TokenFlagsNone$constant__from_ast();
        if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
            tokenFlags = TokenFlagsSingleQuote$constant__from_ast();
        }
        return NodeFactory__from_ast.NewBlock(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewNodeList(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewThrowStatement(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewNewExpression(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewIdentifier(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, "Error"), void 0, NodeFactory__from_ast.NewNodeList(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewStringLiteral(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changeTracker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, Message__from_diagnostics.Localize($state__diagnostics.Method_not_implemented, Locale__from_locale.$copy((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).locale), RuntimeSlice.nil<GoInterface | undefined>()), tokenFlags)]))))])), true);
    }
    static $go$private$ls$createTypeNode(f: missingMemberFixer | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, nodeBuilder: NodeBuilder__from_checker | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return missingMemberFixer.$go$private$ls$importTypeNode(f, NodeBuilder__from_checker.TypeToTypeNode(nodeBuilder, t, enclosingDeclaration, flags, InternalFlagsNone$constant__from_nodebuilder(), void 0), idToSymbol);
    }
    static $go$private$ls$getCallSignatures(f: missingMemberFixer | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
        if (Type__from_checker.IsUnion(t)) {
            const __gotots_argument_4 = Type__from_checker.Types(t);
            const __gotots_receiver_2 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker;
            const __gotots_argument_5 = ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
                return Checker__from_checker.GetCallSignatures(__gotots_receiver_2, $argument0);
            };
            return FlatMap$PointerTo_Named_checker$Type$PointerTo_Named_checker$Signature(__gotots_argument_4, __gotots_argument_5);
        }
        return Checker__from_checker.GetCallSignatures((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, t);
    }
    static $go$private$ls$getReturnTypeFromSignatures(f: missingMemberFixer | undefined, signatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nodeBuilder: NodeBuilder__from_checker | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (signatures.length === 0) {
            return void 0;
        }
        let returnTypes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(0, signatures.length, void 0);
        const __gotots_range_9 = signatures;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
            const __gotots_range_value_11 = __gotots_range_9.get(__gotots_range_index_8);
            let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_range_value_11;
            returnTypes = returnTypes.append(void 0, [Checker__from_checker.GetReturnTypeOfSignature((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, signature)]);
        }
        let unionType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetUnionType((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeChecker, returnTypes);
        return missingMemberFixer.$go$private$ls$importTypeNode(f, NodeBuilder__from_checker.TypeToTypeNode(nodeBuilder, unionType, enclosingDeclaration, FlagsNoTruncation$constant__from_nodebuilder(), InternalFlagsAllowUnresolvedNames$constant__from_nodebuilder(), void 0), idToSymbol);
    }
    static $go$private$ls$importTypeNode(f: missingMemberFixer | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (typeNode === undefined || (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importAdder === undefined) {
            return typeNode;
        }
        const __gotots_results_4 = TryGetAutoImportableReferenceFromTypeNode__from_autoimport(typeNode, idToSymbol);
        let importedTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_4[0];
        let symbols = __gotots_results_4[1];
        if (!(importedTypeNode === undefined)) {
            const __gotots_range_7 = symbols;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_7;
                const __gotots_receiver_5 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importAdder;
                const __gotots_argument_23 = __go_symbol;
                const __gotots_argument_24 = true;
                goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_5).AddImportFromExportedSymbol(__gotots_argument_23, __gotots_argument_24);
            }
            return importedTypeNode;
        }
        let seen: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, bool> = $goMap$MapOf_PointerTo_Named_ast$Symbol_To_bool.make(0, []);
        const __gotots_range_8 = idToSymbol;
        const __gotots_range_keys_0 = __gotots_range_8.keys();
        for (const __gotots_range_value_8 of __gotots_range_keys_0) {
            const __gotots_range_value_9 = __gotots_range_8.lookupOk(__gotots_range_value_8);
            if (!__gotots_range_value_9[1]) {
                continue;
            }
            const __gotots_range_value_10 = __gotots_range_value_9[0];
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_10;
            if (__go_symbol === undefined || seen.lookup(__go_symbol)) {
                continue;
            }
            seen.store(__go_symbol, true);
            const __gotots_receiver_6 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importAdder;
            const __gotots_argument_25 = __go_symbol;
            const __gotots_argument_26 = true;
            goInterfaceNonNil<ImportAdder__from_autoimport>(__gotots_receiver_6).AddImportFromExportedSymbol(__gotots_argument_25, __gotots_argument_26);
        }
        return typeNode;
    }
    static $go$private$ls$shouldAddOverrideKeyword(f: missingMemberFixer | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return !(declaration === undefined) && Tristate_IsTrue__from_core((Program__from_compiler.Options((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitOverride) && HasAbstractModifier__from_ast(declaration);
    }
}
export function newMissingMemberFixer(changeTracker: Tracker__from_change | undefined, program: {
    value: Program__from_compiler;
} | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined, preferences: UserPreferences__from_lsutil, importAdder: ImportAdder__from_autoimport | undefined, locale__shadow_1: Locale__from_locale): missingMemberFixer | undefined {
    return new missingMemberFixer(changeTracker, typeChecker, program, UserPreferences__from_lsutil.$copy(preferences), importAdder, Locale__from_locale.$copy(locale__shadow_1));
}
export function createDummyParameters(factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, argCount: int, names: RuntimeSlice<gostring>, types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, minArgumentCount: int, inJS: bool): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    let parameters = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, argCount, void 0);
    let parameterNameCounts: GoMapValue<gostring, int> = GoMap.make<gostring, int>(0, 0, []);
    const __gotots_range_2 = argCount;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        let i = __gotots_range_value_2;
        let parameterName = "";
        if (i < names.length && names.get(i) !== "") {
            parameterName = names.get(i);
        }
        else {
            parameterName = "arg" + strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(i)));
        }
        let count = parameterNameCounts.lookup(parameterName);
        parameterNameCounts.store(parameterName, count + 1);
        if (count > 0) {
            parameterName = parameterName + strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(count)));
        }
        let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (i >= minArgumentCount) {
            questionToken = NodeFactory__from_ast.NewToken(factory, KindQuestionToken$constant__from_ast());
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (inJS) {
            typeNode = void 0;
        }
        else if (i < types.length && !(types.get(i) === undefined)) {
            typeNode = types.get(i);
        }
        else {
            typeNode = NodeFactory__from_ast.NewKeywordTypeNode(factory, KindUnknownKeyword$constant__from_ast());
        }
        parameters = parameters.append(void 0, [NodeFactory__from_ast.NewParameterDeclaration(factory, void 0, void 0, NodeFactory__from_ast.NewIdentifier(factory, parameterName), questionToken, typeNode, void 0)]);
    }
    return NodeFactory__from_ast.NewNodeList(factory, parameters);
}
export function createDeclarationName(factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!(__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsMapped$constant__from_ast()) >>> 0 === 0)) {
        let nameType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetNameTypeOfSymbol(typeChecker, __go_symbol);
        if (!(nameType === undefined) && IsTypeUsableAsPropertyName__from_checker(nameType)) {
            return NodeFactory__from_ast.NewIdentifier(factory, GetPropertyNameFromType__from_checker(nameType));
        }
    }
    if (!(declaration === undefined) && !(Node__from_ast.Name(declaration) === undefined)) {
        return Node__from_ast.Clone(Node__from_ast.Name(declaration), new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory(factory));
    }
    if (!(__go_symbol === undefined)) {
        return NodeFactory__from_ast.NewIdentifier(factory, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
    }
    return void 0;
}
export function createPropertyName(factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, quotePreference: QuotePreference__from_lsutil): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsIdentifier__from_ast(node) && Node__from_ast.Text(node) === "constructor") {
        let tokenFlags = TokenFlagsNone$constant__from_ast();
        if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
            tokenFlags = TokenFlagsSingleQuote$constant__from_ast();
        }
        return NodeFactory__from_ast.NewComputedPropertyName(factory, NodeFactory__from_ast.NewStringLiteral(factory, Node__from_ast.Text(node), tokenFlags));
    }
    return NodeFactory__from_ast.DeepCloneNode(factory, node);
}
