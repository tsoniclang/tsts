import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportDeclaration as ExportDeclaration__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ModifierFlags as ModifierFlags__from_ast, ModifierList as ModifierList__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeId as NodeId__from_ast, QualifiedName as QualifiedName__from_ast, SymbolFlags as SymbolFlags__from_ast, SymbolId as SymbolId__from_ast, SymbolTable as SymbolTable__from_ast, TypePredicateNode as TypePredicateNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { ModuleKind as ModuleKind__from_core, Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { Flags as Flags__from_nodebuilder, InternalFlags as InternalFlags__from_nodebuilder, SymbolTracker as SymbolTracker__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { NodeFactory as NodeFactory__from_printer, TypeReferenceSerializationKind as TypeReferenceSerializationKind__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { AliasSymbolLinks$Storage as AliasSymbolLinks__from_checker$Storage, EnumMemberLinks$Storage as EnumMemberLinks__from_checker$Storage, LiteralType, MappedSymbolLinks, MappedSymbolLinks$Storage as MappedSymbolLinks__from_checker$Storage, ReverseMappedSymbolLinks$Storage as ReverseMappedSymbolLinks__from_checker$Storage } from "./types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { BinaryExpression as BinaryExpression__from_ast, CheckFlagsLate$constant as CheckFlagsLate$constant__from_ast, DeclarationBase as DeclarationBase__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetDeclarationContainer as GetDeclarationContainer__from_ast, GetFirstIdentifier as GetFirstIdentifier__from_ast, GetNodeId as GetNodeId__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, GetSymbolId as GetSymbolId__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsAliasSymbolDeclaration as IsAliasSymbolDeclaration__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsExpandoPropertyDeclaration as IsExpandoPropertyDeclaration__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsExternalModuleAugmentation as IsExternalModuleAugmentation__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsGlobalSourceFile as IsGlobalSourceFile__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImplicitlyExportedJSDocDeclaration as IsImplicitlyExportedJSDocDeclaration__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsInJSFile as IsInJSFile__from_ast, IsInternalModuleImportEqualsDeclaration as IsInternalModuleImportEqualsDeclaration__from_ast, IsLateVisibilityPaintedStatement as IsLateVisibilityPaintedStatement__from_ast, IsNamespaceExport as IsNamespaceExport__from_ast, IsNonLocalAlias as IsNonLocalAlias__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsParseTreeNode as IsParseTreeNode__from_ast, IsPartOfTypeNode as IsPartOfTypeNode__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsThisIdentifier as IsThisIdentifier__from_ast, IsTypeOnlyImportOrExportDeclaration as IsTypeOnlyImportOrExportDeclaration__from_ast, IsVarConst as IsVarConst__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJSDocCallbackTag$constant as KindJSDocCallbackTag$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierFlagsParameterPropertyModifier$constant as ModifierFlagsParameterPropertyModifier$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeIsPresent as NodeIsPresent__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, StatementBase as StatementBase__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsBlockScopedVariable$constant as SymbolFlagsBlockScopedVariable$constant__from_ast, SymbolFlagsConstEnumOnlyModule$constant as SymbolFlagsConstEnumOnlyModule$constant__from_ast, SymbolFlagsNamespace$constant as SymbolFlagsNamespace$constant__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, SymbolFlagsProperty$constant as SymbolFlagsProperty$constant__from_ast, SymbolFlagsType$constant as SymbolFlagsType$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, Symbol as Symbol__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, Visitor as Visitor__from_ast, WalkUpBindingElementsAndPatterns as WalkUpBindingElementsAndPatterns__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewReferenceResolver as NewReferenceResolver__from_binder, ReferenceResolverHooks as ReferenceResolverHooks__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { CompilerOptions as CompilerOptions__from_core, LinkStore as LinkStore__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { NewResult as NewResult__from_evaluator, Result as Result__from_evaluator } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import { PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { FlagsMultilineObjectLiterals$constant as FlagsMultilineObjectLiterals$constant__from_nodebuilder, FlagsNone$constant as FlagsNone$constant__from_nodebuilder, InternalFlagsNone$constant as InternalFlagsNone$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { EmitContext as EmitContext__from_printer, SymbolAccessibilityAccessible$constant as SymbolAccessibilityAccessible$constant__from_printer, SymbolAccessibilityNotAccessible$constant as SymbolAccessibilityNotAccessible$constant__from_printer, SymbolAccessibilityNotResolved$constant as SymbolAccessibilityNotResolved$constant__from_printer, SymbolAccessibilityResult as SymbolAccessibilityResult__from_printer, TypeReferenceSerializationKindArrayLikeType$int32 as TypeReferenceSerializationKindArrayLikeType$int32__from_printer, TypeReferenceSerializationKindBigIntLikeType$int32 as TypeReferenceSerializationKindBigIntLikeType$int32__from_printer, TypeReferenceSerializationKindBooleanType$int32 as TypeReferenceSerializationKindBooleanType$int32__from_printer, TypeReferenceSerializationKindESSymbolType$int32 as TypeReferenceSerializationKindESSymbolType$int32__from_printer, TypeReferenceSerializationKindNumberLikeType$int32 as TypeReferenceSerializationKindNumberLikeType$int32__from_printer, TypeReferenceSerializationKindObjectType$int32 as TypeReferenceSerializationKindObjectType$int32__from_printer, TypeReferenceSerializationKindPromise$int32 as TypeReferenceSerializationKindPromise$int32__from_printer, TypeReferenceSerializationKindStringLikeType$int32 as TypeReferenceSerializationKindStringLikeType$int32__from_printer, TypeReferenceSerializationKindTypeWithCallSignature$int32 as TypeReferenceSerializationKindTypeWithCallSignature$int32__from_printer, TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32 as TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32__from_printer, TypeReferenceSerializationKindUnknown$int32 as TypeReferenceSerializationKindUnknown$int32__from_printer, TypeReferenceSerializationKindVoidNullableOrNeverType$int32 as TypeReferenceSerializationKindVoidNullableOrNeverType$int32__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Every$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { IfElse$PointerTo_Named_ast$ModifierList, IfElse$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationFileLinks, LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationLinks, LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$EnumMemberLinks, LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$JSXLinks, LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$AliasSymbolLinks, LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ReverseMappedSymbolLinks } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LinkStore$Get.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Values$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node$Named_ast$NodeId$PointerTo_Named_ast$Node, Values$Named_ast$SymbolTable$string$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/maps/Values.js";
import { Collect$PointerTo_Named_ast$Node, Collect$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$bool, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_ast$SymbolId_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationFileLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$JSXLinks, $goMap$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../support/maps.js";
import { Checker, ReferenceHintUnspecified$constant, isConstEnumSymbol, isFreshLiteralType, isTupleType } from "./checker.js";
import { NewNodeBuilder, NodeBuilder } from "./nodebuilder.js";
import { AliasSymbolLinks, EnumMemberLinks, IndexInfo, ReverseMappedSymbolLinks, Signature, Type, TypeFlagsAnyOrUnknown$constant, TypeFlagsBigIntLike$constant, TypeFlagsBooleanLike$constant, TypeFlagsESSymbolLike$constant, TypeFlagsEnumLike$constant, TypeFlagsLiteral$constant, TypeFlagsNumberLike$constant, TypeFlagsStringLike$constant } from "./types.js";
import { containsNonMissingUndefinedType, getAnyImportSyntax, isDeclarationReadonly, isOptionalDeclaration, pseudoBigIntToString } from "./utilities.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
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
export type JSXLinks$Storage = {
    importRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class JSXLinks implements GoContainerStoredValue<JSXLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: JSXLinks$Storage) {
    }
    public static $storageOf($source: JSXLinks): JSXLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: JSXLinks$Storage): JSXLinks {
        return new JSXLinks($source);
    }
    public get importRef(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.importRef;
    }
    public set importRef($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.importRef = $value;
    }
    declare readonly [$goContainerStorageType]: JSXLinks$Storage;
    static $zero(): JSXLinks {
        return new JSXLinks({
            importRef: void 0
        });
    }
    static $copy($source: JSXLinks): JSXLinks {
        return new JSXLinks({
            importRef: $source.$storage.importRef
        });
    }
    static $equal($left: JSXLinks, $right: JSXLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.importRef, $right.$storage.importRef);
    }
    static $hash($source: JSXLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.importRef));
        return $hash;
    }
    static $zeroStorage(): JSXLinks$Storage {
        return {
            importRef: void 0
        };
    }
    declare private readonly then?: never;
}
export type DeclarationLinks$Storage = {
    isVisible: uint8;
};
export class DeclarationLinks implements GoContainerStoredValue<DeclarationLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DeclarationLinks$Storage) {
    }
    public static $storageOf($source: DeclarationLinks): DeclarationLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DeclarationLinks$Storage): DeclarationLinks {
        return new DeclarationLinks($source);
    }
    public get isVisible(): Tristate__from_core {
        return this.$storage.isVisible;
    }
    public set isVisible($value: Tristate__from_core) {
        this.$storage.isVisible = $value;
    }
    declare readonly [$goContainerStorageType]: DeclarationLinks$Storage;
    static $zero(): DeclarationLinks {
        return new DeclarationLinks({
            isVisible: 0
        });
    }
    static $copy($source: DeclarationLinks): DeclarationLinks {
        return new DeclarationLinks({
            isVisible: $source.$storage.isVisible
        });
    }
    static $equal($left: DeclarationLinks, $right: DeclarationLinks): bool {
        return $left.$storage.isVisible === $right.$storage.isVisible;
    }
    static $hash($source: DeclarationLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.isVisible));
        return $hash;
    }
    static $zeroStorage(): DeclarationLinks$Storage {
        return {
            isVisible: 0
        };
    }
    declare private readonly then?: never;
}
export type DeclarationFileLinks$Storage = {
    aliasesMarked: bool;
};
export class DeclarationFileLinks implements GoContainerStoredValue<DeclarationFileLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DeclarationFileLinks$Storage) {
    }
    public static $storageOf($source: DeclarationFileLinks): DeclarationFileLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DeclarationFileLinks$Storage): DeclarationFileLinks {
        return new DeclarationFileLinks($source);
    }
    public get aliasesMarked(): bool {
        return this.$storage.aliasesMarked;
    }
    public set aliasesMarked($value: bool) {
        this.$storage.aliasesMarked = $value;
    }
    declare readonly [$goContainerStorageType]: DeclarationFileLinks$Storage;
    static $zero(): DeclarationFileLinks {
        return new DeclarationFileLinks({
            aliasesMarked: false
        });
    }
    static $copy($source: DeclarationFileLinks): DeclarationFileLinks {
        return new DeclarationFileLinks({
            aliasesMarked: $source.$storage.aliasesMarked
        });
    }
    static $equal($left: DeclarationFileLinks, $right: DeclarationFileLinks): bool {
        return $left.$storage.aliasesMarked === $right.$storage.aliasesMarked;
    }
    static $hash($source: DeclarationFileLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.aliasesMarked));
        return $hash;
    }
    static $zeroStorage(): DeclarationFileLinks$Storage {
        return {
            aliasesMarked: false
        };
    }
    declare private readonly then?: never;
}
export class EmitResolver {
    declare private readonly $goType: void;
    public constructor(public checker: {
        value: Checker;
    } | undefined, public checkerMu: tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex> | undefined, public isValueAliasDeclaration: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, public aliasMarkingVisitor: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, public referenceResolver: ReferenceResolver__from_binder | undefined, public jsxLinks: LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JSXLinks>, public declarationLinks: LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationLinks>, public declarationFileLinks: LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationFileLinks>) {
    }
    static $copy($source: EmitResolver): EmitResolver {
        return new EmitResolver($source.checker, $source.checkerMu, $source.isValueAliasDeclaration, $source.aliasMarkingVisitor, $source.referenceResolver, LinkStore__from_core.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JSXLinks>($source.jsxLinks), LinkStore__from_core.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationLinks>($source.declarationLinks), LinkStore__from_core.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationFileLinks>($source.declarationFileLinks));
    }
    declare private readonly then?: never;
    static CreateLateBoundIndexSignatures(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    container = EmitContext__from_printer.ParseNode(emitContext, container);
                    const __gotots_receiver_3: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_3 === void 0 ? void 0 :
                        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_4: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_5 = __gotots_receiver_4 === void 0 ? void 0 :
                        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_5, $go$recovery);
                    };
                    let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(container);
                    let staticInfos = Checker.$go$private$checker$getIndexInfosOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, sym));
                    let instanceIndexSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getIndexSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, sym);
                    let instanceInfos = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<IndexInfo> | undefined>();
                    if (!(instanceIndexSymbol === undefined)) {
                        let siblingSymbols = Collect$PointerTo_Named_ast$Symbol(Values$Named_ast$SymbolTable$string$PointerTo_Named_ast$Symbol(Checker.$go$private$checker$getMembersOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, sym)));
                        instanceInfos = Checker.$go$private$checker$getIndexInfosOfIndexSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, instanceIndexSymbol, siblingSymbols);
                    }
                    let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    const __gotots_range_2 = RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo> | undefined>>([staticInfos, instanceInfos]);
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_index_2;
                        const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
                        let i = __gotots_range_value_2;
                        let infoList = __gotots_range_value_3;
                        let isStatic = true;
                        if (i > 0) {
                            isStatic = false;
                        }
                        if (infoList.length === 0) {
                            continue;
                        }
                        const __gotots_range_3 = infoList;
                        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
                            let info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = __gotots_range_value_4;
                            if (!(IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).declaration === undefined)) {
                                continue;
                            }
                            if (tsonicTypeScriptRuntime.sameLocation(info, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyBaseTypeIndexInfo)) {
                                continue;
                            }
                            if (IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).components.length !== 0) {
                                let allComponentComputedNamesSerializable = !(enclosingDeclaration === undefined) && Every$PointerTo_Named_ast$Node(IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).components, (c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                                    return !(Node__from_ast.Name(c) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.Name(c)) && IsEntityNameExpression__from_ast(Node__from_ast.Expression(Node__from_ast.Name(c))) && EmitResolver.$go$private$checker$isEntityNameVisible(r, Node__from_ast.Expression(Node__from_ast.Name(c)), enclosingDeclaration, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer();
                                });
                                if (allComponentComputedNamesSerializable) {
                                    const __gotots_range_4 = IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).components;
                                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                                        const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
                                        let c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                                        if (Checker.$go$private$checker$hasLateBindableName((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, c)) {
                                            continue;
                                        }
                                        let firstIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast(Node__from_ast.Expression(Node__from_ast.Name(c)));
                                        const __gotots_callee_8: Checker["resolveName"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
                                        const __gotots_argument_30 = firstIdentifier;
                                        const __gotots_argument_31 = Node__from_ast.Text(firstIdentifier);
                                        const __gotots_argument_32 = 1160127;
                                        const __gotots_argument_33 = void 0;
                                        const __gotots_argument_34 = true;
                                        const __gotots_argument_35 = false;
                                        let name: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                                        if (!(name === undefined)) {
                                            const __gotots_receiver_6 = tracker;
                                            const __gotots_argument_36 = name;
                                            const __gotots_argument_37 = enclosingDeclaration;
                                            const __gotots_argument_38 = SymbolFlagsValue$constant__from_ast();
                                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_6).TrackSymbol(__gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
                                        }
                                        const __gotots_argument_39 = isStatic;
                                        const __gotots_store_8 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        const __gotots_slice_element_0 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), KindStaticKeyword$constant__from_ast());
                                        const __gotots_argument_40 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
                                        const __gotots_argument_41 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                                        let mods = IfElse$SliceOf_PointerTo_Named_ast$Node(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41);
                                        if (IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).isReadonly) {
                                            const __gotots_argument_42 = mods;
                                            const __gotots_store_9 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                            const __gotots_argument_43 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), KindReadonlyKeyword$constant__from_ast());
                                            mods = __gotots_argument_42.append(void 0, [__gotots_argument_43]);
                                        }
                                        const __gotots_store_10 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory");
                                        const __gotots_argument_44 = !mods.isNil();
                                        const __gotots_store_11 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        const __gotots_argument_45 = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"), mods);
                                        const __gotots_argument_46 = void 0;
                                        const __gotots_argument_47 = IfElse$PointerTo_Named_ast$ModifierList(__gotots_argument_44, __gotots_argument_45, __gotots_argument_46);
                                        const __gotots_argument_48 = Node__from_ast.Name(c);
                                        const __gotots_argument_49 = Node__from_ast.QuestionToken(c);
                                        const __gotots_argument_50 = NodeBuilder.TypeToTypeNode(requestNodeBuilder, Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Node__from_ast.Symbol(c)), enclosingDeclaration, flags, internalFlags, tracker);
                                        const __gotots_argument_51 = void 0;
                                        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyDeclaration(__gotots_receiver_7, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
                                        result = result.append(void 0, [decl]);
                                    }
                                    continue;
                                }
                            }
                            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilder.IndexInfoToIndexSignatureDeclaration(requestNodeBuilder, info, enclosingDeclaration, flags, internalFlags, tracker);
                            if (!(node === undefined) && isStatic) {
                                const __gotots_store_12 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_slice_element_1 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), KindStaticKeyword$constant__from_ast());
                                let modNodes = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
                                modNodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modNodes, Node__from_ast.ModifierNodes(node), void 0);
                                const __gotots_store_13 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), modNodes);
                                const __gotots_store_14 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                node = NodeFactory__from_ast.UpdateIndexSignatureDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), Node__from_ast.AsIndexSignatureDeclaration(node), mods, Node__from_ast.ParameterList(node), Node__from_ast.Type(node));
                            }
                            if (!(node === undefined)) {
                                result = result.append(void 0, [node]);
                            }
                        }
                    }
                    __gotots_return_0 = result;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static CreateLiteralConstValue(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    node = EmitContext__from_printer.ParseNode(emitContext, node);
                    const __gotots_receiver_6: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_6 === void 0 ? void 0 :
                        (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node));
                    const __gotots_receiver_7: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Unlock(__gotots_receiver_7 === void 0 ? void 0 :
                        (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    if (t === undefined) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    let enumResult: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsEnumLike$constant()) >>> 0 === 0)) {
                        const __gotots_receiver_8: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        sync__from_gostdlib.Mutex.Lock(__gotots_receiver_8 === void 0 ? void 0 :
                            (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                        const __gotots_receiver_9: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        const __gotots_receiver_10 = __gotots_receiver_9 === void 0 ? void 0 :
                            (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_10, $go$recovery);
                        });
                        let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                        enumResult = NodeBuilder.SymbolToExpression(requestNodeBuilder, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, SymbolFlagsValue$constant__from_ast(), node, FlagsNone$constant__from_nodebuilder(), InternalFlagsNone$constant__from_nodebuilder(), tracker);
                    }
                    else if (tsonicTypeScriptRuntime.sameLocation(t, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trueType)) {
                        const __gotots_store_15 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        enumResult = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), KindTrueKeyword$constant__from_ast());
                    }
                    else if (tsonicTypeScriptRuntime.sameLocation(t, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.falseType)) {
                        const __gotots_store_16 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        enumResult = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory"), KindFalseKeyword$constant__from_ast());
                    }
                    if (!(enumResult === undefined)) {
                        __gotots_return_0 = enumResult;
                        break __gotots_return_block_0;
                    }
                    if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsLiteral$constant()) >>> 0 === 0) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_type_switch_0: GoInterface | undefined = (Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value;
                    switch (true) {
                        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                            let value: gostring = __gotots_type_switch_0.$go$value;
                            const __gotots_store_17 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory"), value, TokenFlagsNone$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
                            let value: Number__from_jsnum = __gotots_type_switch_0.$go$value;
                            if (value.IsInf()) {
                                if (value.$value > 0) {
                                    const __gotots_store_18 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), "Infinity");
                                    break __gotots_return_block_0;
                                }
                                const __gotots_store_19 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory");
                                const __gotots_argument_52 = KindMinusToken$constant__from_ast();
                                const __gotots_store_20 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_argument_53 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), "Infinity");
                                __gotots_return_0 = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_11, __gotots_argument_52, __gotots_argument_53);
                                break __gotots_return_block_0;
                            }
                            if (value.IsNaN()) {
                                const __gotots_store_21 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                __gotots_return_0 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), "NaN");
                                break __gotots_return_block_0;
                            }
                            if (!(value.Abs().$value === value.$value)) {
                                const __gotots_store_22 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory");
                                const __gotots_argument_54 = KindMinusToken$constant__from_ast();
                                const __gotots_store_23 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_argument_55 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), goStringSlice(value.String(), 1), TokenFlagsNone$constant__from_ast());
                                __gotots_return_0 = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_12, __gotots_argument_54, __gotots_argument_55);
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_24 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), value.String(), TokenFlagsNone$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_0): {
                            let value: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_0.$go$value);
                            const __gotots_store_25 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewBigIntLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), pseudoBigIntToString(PseudoBigInt__from_jsnum.$copy(value)) + "n", TokenFlagsNone$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case $goInterfaceAdapter$bool.$is(__gotots_type_switch_0): {
                            let value: bool = __gotots_type_switch_0.$go$value;
                            let kind = KindFalseKeyword$constant__from_ast();
                            if (value) {
                                kind = KindTrueKeyword$constant__from_ast();
                            }
                            const __gotots_store_26 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), kind);
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                    const __gotots_argument_56 = new GoInterfaceAdapter("unhandled literal const value kind");
                    GoPanic.raise(__gotots_argument_56 === undefined ? GoPanicNilValue.create() : __gotots_argument_56);
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static CreateReturnTypeOfSignatureDeclaration(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, signatureDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(emitContext, signatureDeclaration);
                    if (original === undefined) {
                        const __gotots_store_27 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory"), KindAnyKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_11: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_11 === void 0 ? void 0 :
                        (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_12: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_13 = __gotots_receiver_12 === void 0 ? void 0 :
                        (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_13, $go$recovery);
                    };
                    let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                    __gotots_return_0 = NodeBuilder.SerializeReturnTypeForSignature(requestNodeBuilder, original, enclosingDeclaration, flags, internalFlags, tracker);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static CreateTypeOfDeclaration(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(emitContext, declaration);
                    if (original === undefined) {
                        const __gotots_store_28 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), KindAnyKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_12: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_12 === void 0 ? void 0 :
                        (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_13: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_14 = __gotots_receiver_13 === void 0 ? void 0 :
                        (__gotots_receiver_13 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_14, $go$recovery);
                    };
                    let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, declaration);
                    __gotots_return_0 = NodeBuilder.SerializeTypeForDeclaration(requestNodeBuilder, declaration, __go_symbol, enclosingDeclaration, (flags | FlagsMultilineObjectLiterals$constant__from_nodebuilder()) >>> 0, internalFlags, tracker);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static CreateTypeOfExpression(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    expression = EmitContext__from_printer.ParseNode(emitContext, expression);
                    if (expression === undefined) {
                        const __gotots_store_29 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory"), KindAnyKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_13: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_13 === void 0 ? void 0 :
                        (__gotots_receiver_13 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_14: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_15 = __gotots_receiver_14 === void 0 ? void 0 :
                        (__gotots_receiver_14 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_15, $go$recovery);
                    };
                    let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                    __gotots_return_0 = NodeBuilder.SerializeTypeForExpression(requestNodeBuilder, expression, enclosingDeclaration, (flags | FlagsMultilineObjectLiterals$constant__from_nodebuilder()) >>> 0, internalFlags, tracker);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static CreateTypeParametersOfSignatureDeclaration(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, signatureDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(emitContext, signatureDeclaration);
                    if (original === undefined) {
                        __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_14: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_14 === void 0 ? void 0 :
                        (__gotots_receiver_14 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_15: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_16 = __gotots_receiver_15 === void 0 ? void 0 :
                        (__gotots_receiver_15 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_16, $go$recovery);
                    };
                    let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                    __gotots_return_0 = NodeBuilder.SerializeTypeParametersForSignature(requestNodeBuilder, original, enclosingDeclaration, flags, internalFlags, tracker);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetBaseDeclarationsForPropertyDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    if (node === undefined) {
                        __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_15: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_15 === void 0 ? void 0 :
                        (__gotots_receiver_15 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_16: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_17 = __gotots_receiver_16 === void 0 ? void 0 :
                        (__gotots_receiver_16 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_17, $go$recovery);
                    };
                    let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
                    if (s === undefined || Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) {
                        __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break __gotots_return_block_0;
                    }
                    let parentType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent);
                    if (parentType === undefined) {
                        __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break __gotots_return_block_0;
                    }
                    let bases = Checker.$go$private$checker$getBaseTypes((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, parentType);
                    const __gotots_range_5 = bases;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                        const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
                        let b: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_6;
                        let baseProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getPropertyOfObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, b, Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                        if (!(baseProp === undefined)) {
                            __gotots_return_0 = Symbol__from_ast.$storageOf(((baseProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                            break __gotots_return_block_0;
                        }
                    }
                    __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetConstantValue(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): GoInterface | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_16: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_16 === void 0 ? void 0 :
                        (__gotots_receiver_16 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_17: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_18 = __gotots_receiver_17 === void 0 ? void 0 :
                        (__gotots_receiver_17 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_18, $go$recovery);
                    };
                    __gotots_return_0 = Checker.GetConstantValue((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetEffectiveDeclarationFlags(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: ModifierFlags__from_ast): ModifierFlags__from_ast {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: ModifierFlags__from_ast = 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_17: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_17 === void 0 ? void 0 :
                        (__gotots_receiver_17 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_18: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_19 = __gotots_receiver_18 === void 0 ? void 0 :
                        (__gotots_receiver_18 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_19, $go$recovery);
                    };
                    __gotots_return_0 = Checker.GetEffectiveDeclarationFlags((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node, flags);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetElementAccessExpressionName(r: {
        value: EmitResolver;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined): gostring {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: gostring = "";
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_30 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            ElementAccessExpression__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_57 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_30, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (!IsParseTreeNode__from_ast(__gotots_argument_57)) {
                        __gotots_return_0 = "";
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_18: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_18 === void 0 ? void 0 :
                        (__gotots_receiver_18 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_19: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_20 = __gotots_receiver_19 === void 0 ? void 0 :
                        (__gotots_receiver_19 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_20, $go$recovery);
                    };
                    const __gotots_receiver_21 = EmitResolver.$go$private$checker$getReferenceResolver(r);
                    const __gotots_argument_58 = expression;
                    __gotots_return_0 = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_21).GetElementAccessExpressionName(__gotots_argument_58);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetEnumMemberValue(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Result__from_evaluator {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: Result__from_evaluator = Result__from_evaluator.$zero();
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = NewResult__from_evaluator(void 0, false, false, false);
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_20: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_20 === void 0 ? void 0 :
                        (__gotots_receiver_20 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_21: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_22 = __gotots_receiver_21 === void 0 ? void 0 :
                        (__gotots_receiver_21 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_22, $go$recovery);
                    };
                    Checker.$go$private$checker$computeEnumMemberValues((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    const __gotots_store_31 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    if (!LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, EnumMemberLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "enumMemberLinks"), node)) {
                        __gotots_return_0 = NewResult__from_evaluator(void 0, false, false, false);
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_32 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_return_0 = Result__from_evaluator.$copy(Result__from_evaluator.$fromStorage(EnumMemberLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$EnumMemberLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "enumMemberLinks"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EnumMemberLinks>).value).value));
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetExternalModuleFileFromDeclaration(r: {
        value: EmitResolver;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(declaration)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_21: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_21 === void 0 ? void 0 :
                        (__gotots_receiver_21 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_22: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_23 = __gotots_receiver_22 === void 0 ? void 0 :
                        (__gotots_receiver_22 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_23, $go$recovery);
                    };
                    __gotots_return_0 = Checker.$go$private$checker$getExternalModuleFileFromDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, declaration);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetJsxFactoryEntity(r: {
        value: EmitResolver;
    } | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_22: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_22 === void 0 ? void 0 :
                        (__gotots_receiver_22 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_23: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_24 = __gotots_receiver_23 === void 0 ? void 0 :
                        (__gotots_receiver_23 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_24, $go$recovery);
                    };
                    __gotots_return_0 = Checker.$go$private$checker$getJsxFactoryEntity((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, location);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetJsxFragmentFactoryEntity(r: {
        value: EmitResolver;
    } | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_23: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_23 === void 0 ? void 0 :
                        (__gotots_receiver_23 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_24: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_25 = __gotots_receiver_24 === void 0 ? void 0 :
                        (__gotots_receiver_24 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_25, $go$recovery);
                    };
                    __gotots_return_0 = Checker.$go$private$checker$getJsxFragmentFactoryEntity((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, location);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetPropertiesOfContainerFunction(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        if (node === undefined) {
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([]);
        }
        let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
        if (s === undefined) {
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([]);
        }
        return Checker.$go$private$checker$getPropertiesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, s));
    }
    static GetReferencedExportContainer(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, prefixLocals: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_24: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_24 === void 0 ? void 0 :
                        (__gotots_receiver_24 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_25: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_26 = __gotots_receiver_25 === void 0 ? void 0 :
                        (__gotots_receiver_25 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_26, $go$recovery);
                    };
                    const __gotots_receiver_27 = EmitResolver.$go$private$checker$getReferenceResolver(r);
                    const __gotots_argument_59 = node;
                    const __gotots_argument_60 = prefixLocals;
                    __gotots_return_0 = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_27).GetReferencedExportContainer(__gotots_argument_59, __gotots_argument_60);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetReferencedImportDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_26: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_26 === void 0 ? void 0 :
                        (__gotots_receiver_26 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_27: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_28 = __gotots_receiver_27 === void 0 ? void 0 :
                        (__gotots_receiver_27 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_28, $go$recovery);
                    };
                    if (!IsParseTreeNode__from_ast(node)) {
                        const __gotots_store_33 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_return_0 = JSXLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$JSXLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "jsxLinks"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSXLinks>).value).importRef;
                        break __gotots_return_block_0;
                    }
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getReferencedValueOrAliasSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
                    if (IsNonLocalAlias__from_ast(__go_symbol, SymbolFlagsValue$constant__from_ast()) && Checker.$go$private$checker$getTypeOnlyAliasDeclarationEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, __go_symbol, SymbolFlagsValue$constant__from_ast()) === undefined) {
                        __gotots_return_0 = Checker.$go$private$checker$getDeclarationOfAliasSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, __go_symbol);
                        break __gotots_return_block_0;
                    }
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetReferencedMemberValueDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_27: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_27 === void 0 ? void 0 :
                        (__gotots_receiver_27 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_28: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_29 = __gotots_receiver_28 === void 0 ? void 0 :
                        (__gotots_receiver_28 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_29, $go$recovery);
                    };
                    const __gotots_receiver_30 = EmitResolver.$go$private$checker$getReferenceResolver(r);
                    const __gotots_argument_61 = node;
                    __gotots_return_0 = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_30).GetReferencedMemberValueDeclaration(__gotots_argument_61);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetReferencedValueDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_29: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_29 === void 0 ? void 0 :
                        (__gotots_receiver_29 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_30: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_31 = __gotots_receiver_30 === void 0 ? void 0 :
                        (__gotots_receiver_30 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_31, $go$recovery);
                    };
                    const __gotots_receiver_32 = EmitResolver.$go$private$checker$getReferenceResolver(r);
                    const __gotots_argument_62 = node;
                    __gotots_return_0 = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_32).GetReferencedValueDeclaration(__gotots_argument_62);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetReferencedValueDeclarations(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_31: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_31 === void 0 ? void 0 :
                        (__gotots_receiver_31 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_32: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_33 = __gotots_receiver_32 === void 0 ? void 0 :
                        (__gotots_receiver_32 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_33, $go$recovery);
                    };
                    const __gotots_receiver_34 = EmitResolver.$go$private$checker$getReferenceResolver(r);
                    const __gotots_argument_63 = node;
                    __gotots_return_0 = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_34).GetReferencedValueDeclarations(__gotots_argument_63);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetResolutionModeOverride(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: ModuleKind__from_core = 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_33: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_33 === void 0 ? void 0 :
                        (__gotots_receiver_33 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_34: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_35 = __gotots_receiver_34 === void 0 ? void 0 :
                        (__gotots_receiver_34 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_35, $go$recovery);
                    };
                    __gotots_return_0 = Checker.GetResolutionModeOverride((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Node__from_ast.AsImportAttributes(node), false);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static GetTypeReferenceSerializationKind(r: {
        value: EmitResolver;
    } | undefined, typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TypeReferenceSerializationKind__from_printer {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: TypeReferenceSerializationKind__from_printer = 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_34: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_34 === void 0 ? void 0 :
                        (__gotots_receiver_34 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_35: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_36 = __gotots_receiver_35 === void 0 ? void 0 :
                        (__gotots_receiver_35 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_36, $go$recovery);
                    };
                    if (typeName === undefined || location === undefined) {
                        __gotots_return_0 = TypeReferenceSerializationKindUnknown$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    let isTypeOnly = false;
                    if (IsQualifiedName__from_ast(typeName)) {
                        let rootValueSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$resolveEntityName((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, GetFirstIdentifier__from_ast(typeName), SymbolFlagsValue$constant__from_ast(), true, true, location);
                        if (!(rootValueSymbol === undefined) && Symbol__from_ast.$storageOf(((rootValueSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
                            isTypeOnly = Every$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((rootValueSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsTypeOnlyImportOrExportDeclaration__from_ast);
                        }
                    }
                    let valueSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$resolveEntityName((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, typeName, SymbolFlagsValue$constant__from_ast(), true, true, location);
                    let resolvedValueSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = valueSymbol;
                    if (!(valueSymbol === undefined) && !((Symbol__from_ast.$storageOf(((valueSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
                        resolvedValueSymbol = Checker.$go$private$checker$resolveAlias((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, valueSymbol);
                    }
                    isTypeOnly = isTypeOnly || (!(valueSymbol === undefined) && !(Checker.$go$private$checker$getTypeOnlyAliasDeclarationEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, valueSymbol, SymbolFlagsValue$constant__from_ast()) === undefined));
                    let typeSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$resolveEntityName((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, typeName, SymbolFlagsType$constant__from_ast(), true, true, location);
                    let resolvedTypeSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = typeSymbol;
                    if (!(typeSymbol === undefined) && !((Symbol__from_ast.$storageOf(((typeSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
                        resolvedTypeSymbol = Checker.$go$private$checker$resolveAlias((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, typeSymbol);
                    }
                    isTypeOnly = isTypeOnly || (!(typeSymbol === undefined) && !(Checker.$go$private$checker$getTypeOnlyAliasDeclarationEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, typeSymbol, SymbolFlagsType$constant__from_ast()) === undefined));
                    if (!(resolvedValueSymbol === undefined) &&
                        tsonicTypeScriptRuntime.sameLocation(resolvedValueSymbol, resolvedTypeSymbol)) {
                        const __gotots_callee_9: Checker["getGlobalPromiseConstructorSymbol"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getGlobalPromiseConstructorSymbol;
                        let globalPromiseSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))();
                        if (!(globalPromiseSymbol === undefined) &&
                            tsonicTypeScriptRuntime.sameLocation(resolvedValueSymbol, globalPromiseSymbol)) {
                            __gotots_return_0 = TypeReferenceSerializationKindPromise$int32__from_printer;
                            break __gotots_return_block_0;
                        }
                        let constructorType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, resolvedValueSymbol);
                        if (!(constructorType === undefined) && Checker.$go$private$checker$isConstructorType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, constructorType)) {
                            if (isTypeOnly) {
                                __gotots_return_0 = TypeReferenceSerializationKindTypeWithCallSignature$int32__from_printer;
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = TypeReferenceSerializationKindTypeWithConstructSignatureAndValue$int32__from_printer;
                            break __gotots_return_block_0;
                        }
                    }
                    if (resolvedTypeSymbol === undefined) {
                        if (isTypeOnly) {
                            __gotots_return_0 = TypeReferenceSerializationKindObjectType$int32__from_printer;
                            break __gotots_return_block_0;
                        }
                        __gotots_return_0 = TypeReferenceSerializationKindUnknown$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    let type_: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, resolvedTypeSymbol);
                    if (Checker.$go$private$checker$isErrorType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_)) {
                        if (isTypeOnly) {
                            __gotots_return_0 = TypeReferenceSerializationKindObjectType$int32__from_printer;
                            break __gotots_return_block_0;
                        }
                        __gotots_return_0 = TypeReferenceSerializationKindUnknown$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    if (!((((type_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsAnyOrUnknown$constant()) >>> 0 === 0)) {
                        __gotots_return_0 = TypeReferenceSerializationKindObjectType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isTypeAssignableToKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_, 262172)) {
                        __gotots_return_0 = TypeReferenceSerializationKindVoidNullableOrNeverType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isTypeAssignableToKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_, TypeFlagsBooleanLike$constant())) {
                        __gotots_return_0 = TypeReferenceSerializationKindBooleanType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isTypeAssignableToKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_, TypeFlagsNumberLike$constant())) {
                        __gotots_return_0 = TypeReferenceSerializationKindNumberLikeType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isTypeAssignableToKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_, TypeFlagsBigIntLike$constant())) {
                        __gotots_return_0 = TypeReferenceSerializationKindBigIntLikeType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isTypeAssignableToKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_, TypeFlagsStringLike$constant())) {
                        __gotots_return_0 = TypeReferenceSerializationKindStringLikeType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (isTupleType(type_)) {
                        __gotots_return_0 = TypeReferenceSerializationKindArrayLikeType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isTypeAssignableToKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_, TypeFlagsESSymbolLike$constant())) {
                        __gotots_return_0 = TypeReferenceSerializationKindESSymbolType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isFunctionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_)) {
                        __gotots_return_0 = TypeReferenceSerializationKindTypeWithCallSignature$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else if (Checker.$go$private$checker$isArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, type_)) {
                        __gotots_return_0 = TypeReferenceSerializationKindArrayLikeType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                    else {
                        __gotots_return_0 = TypeReferenceSerializationKindObjectType$int32__from_printer;
                        break __gotots_return_block_0;
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsDeclarationVisible(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_35: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_35 === void 0 ? void 0 :
                        (__gotots_receiver_35 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_36: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_37 = __gotots_receiver_36 === void 0 ? void 0 :
                        (__gotots_receiver_36 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_37, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.$go$private$checker$isDeclarationVisible(r, node);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsDefinitelyReferenceToGlobalSymbolObject(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsPropertyAccessExpression__from_ast(node) || !IsIdentifier__from_ast(Node__from_ast.Name(node)) || !IsPropertyAccessExpression__from_ast(Node__from_ast.Expression(node)) && !IsIdentifier__from_ast(Node__from_ast.Expression(node))) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                        if (Node__from_ast.Text(Node__from_ast.Expression(node)) !== "Symbol") {
                            __gotots_return_0 = false;
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_36: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        sync__from_gostdlib.Mutex.Lock(__gotots_receiver_36 === void 0 ? void 0 :
                            (__gotots_receiver_36 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                        const __gotots_receiver_37: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        const __gotots_receiver_38 = __gotots_receiver_37 === void 0 ? void 0 :
                            (__gotots_receiver_37 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_38, $go$recovery);
                        });
                        __gotots_return_0 =
                            tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$getResolvedSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Node__from_ast.Expression(node)), Checker.$go$private$checker$getGlobalSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, "Symbol", 1160127, void 0));
                        break __gotots_return_block_0;
                    }
                    if (!(Node__from_ast.$storageOf(((Node__from_ast.Expression(Node__from_ast.Expression(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) || Node__from_ast.Text(Node__from_ast.Expression(Node__from_ast.Expression(node))) !== "globalThis" || Node__from_ast.Text(Node__from_ast.Name(Node__from_ast.Expression(node))) !== "Symbol") {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_39: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_39 === void 0 ? void 0 :
                        (__gotots_receiver_39 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_40: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_41 = __gotots_receiver_40 === void 0 ? void 0 :
                        (__gotots_receiver_40 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_41, $go$recovery);
                    });
                    __gotots_return_0 =
                        tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$getResolvedSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Node__from_ast.Expression(Node__from_ast.Expression(node))), ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalThisSymbol);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsEntityNameVisible(r: {
        value: EmitResolver;
    } | undefined, entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SymbolAccessibilityResult__from_printer {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: SymbolAccessibilityResult__from_printer = SymbolAccessibilityResult__from_printer.$zero();
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_38: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_38 === void 0 ? void 0 :
                        (__gotots_receiver_38 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_39: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_40 = __gotots_receiver_39 === void 0 ? void 0 :
                        (__gotots_receiver_39 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_40, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.$go$private$checker$isEntityNameVisible(r, entityName, enclosingDeclaration, true);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsExpandoFunctionDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_39: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_39 === void 0 ? void 0 :
                        (__gotots_receiver_39 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_40: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_41 = __gotots_receiver_40 === void 0 ? void 0 :
                        (__gotots_receiver_40 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_41, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.IsExpandoFunctionDeclarationUnsafe(r, node);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsExpandoFunctionDeclarationUnsafe(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!IsParseTreeNode__from_ast(node)) {
            return false;
        }
        let props = EmitResolver.GetPropertiesOfContainerFunction(r, node);
        const __gotots_range_6 = props;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
            let p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_7;
            if (IsExpandoPropertyDeclaration__from_ast(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                return true;
            }
        }
        return false;
    }
    static IsImplementationOfOverload(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    if (NodeIsPresent__from_ast(Node__from_ast.Body(node))) {
                        if (IsGetAccessorDeclaration__from_ast(node) || IsSetAccessorDeclaration__from_ast(node)) {
                            __gotots_return_0 = false;
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_40: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        sync__from_gostdlib.Mutex.Lock(__gotots_receiver_40 === void 0 ? void 0 :
                            (__gotots_receiver_40 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                        const __gotots_receiver_41: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        const __gotots_receiver_42 = __gotots_receiver_41 === void 0 ? void 0 :
                            (__gotots_receiver_41 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_42, $go$recovery);
                        });
                        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
                        let signaturesOfSymbol = Checker.$go$private$checker$getSignaturesOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, __go_symbol);
                        if (signaturesOfSymbol.length > 1) {
                            __gotots_return_0 = true;
                            break __gotots_return_block_0;
                        }
                        if (signaturesOfSymbol.length === 1) {
                            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Signature.$storageOf(((signaturesOfSymbol.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration;
                            if (!tsonicTypeScriptRuntime.sameLocation(declaration, node) && (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0) {
                                __gotots_return_0 = true;
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    __gotots_return_0 = false;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsImportRequiredByAugmentation(r: {
        value: EmitResolver;
    } | undefined, decl: {
        value: ImportDeclaration__from_ast;
    } | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_34 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_64 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_34, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (!IsParseTreeNode__from_ast(__gotots_argument_64)) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_35 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_65 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_35, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(__gotots_argument_65);
                    if (DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol === undefined) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_41 = r;
                    const __gotots_store_36 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_66 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_36, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let importTarget: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = EmitResolver.GetExternalModuleFileFromDeclaration(__gotots_receiver_41, __gotots_argument_66);
                    if (importTarget === undefined) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    if (tsonicTypeScriptRuntime.sameLocation(importTarget, file)) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_42: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_42 === void 0 ? void 0 :
                        (__gotots_receiver_42 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_43: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_44 = __gotots_receiver_43 === void 0 ? void 0 :
                        (__gotots_receiver_43 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_44, $go$recovery);
                    };
                    let exports: SymbolTable__from_ast = Checker.$go$private$checker$getExportsOfModule((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol);
                    const __gotots_range_7 = named_iter.IterSeqValueOperations.$project(Values$Named_ast$SymbolTable$string$PointerTo_Named_ast$Symbol(exports));
                    if (__gotots_range_7 === void 0) {
                        GoPanic.raiseRuntime("call of nil function");
                    }
                    let __gotots_range_state_0 = 1;
                    let __gotots_range_return_0: bool = false;
                    __gotots_range_7(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                        if (__gotots_range_state_0 === 0) {
                            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                        }
                        if (__gotots_range_state_0 === -1) {
                            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                        }
                        if (__gotots_range_state_0 === -2) {
                            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                        }
                        if (__gotots_range_state_0 === 2) {
                            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                        }
                        __gotots_range_state_0 = -1;
                        const __gotots_range_value_8 = $argument0;
                        let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_8;
                        let merged: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getMergedSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, s);
                        if (!tsonicTypeScriptRuntime.sameLocation(merged, s)) {
                            if (Symbol__from_ast.$storageOf(((merged ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
                                const __gotots_range_8 = Symbol__from_ast.$storageOf(((merged ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                                for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
                                    const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_7);
                                    let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                                    let declFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(d);
                                    if (tsonicTypeScriptRuntime.sameLocation(declFile, importTarget)) {
                                        __gotots_range_return_0 = true;
                                        __gotots_range_state_0 = 2;
                                        return false;
                                    }
                                }
                            }
                        }
                        __gotots_range_state_0 = 1;
                        return true;
                    });
                    if (__gotots_range_state_0 === -1) {
                        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                    }
                    if (__gotots_range_state_0 === 2) {
                        __gotots_return_0 = __gotots_range_return_0;
                        break __gotots_return_block_0;
                    }
                    __gotots_range_state_0 = -2;
                    __gotots_return_0 = false;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsLateBound(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    if (node === undefined) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_43: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_43 === void 0 ? void 0 :
                        (__gotots_receiver_43 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_44: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_45 = __gotots_receiver_44 === void 0 ? void 0 :
                        (__gotots_receiver_44 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_45, $go$recovery);
                    };
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    __gotots_return_0 = !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsLate$constant__from_ast()) >>> 0 === 0);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsLiteralConstDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    if (isDeclarationReadonly(node) || IsVariableDeclaration__from_ast(node) && IsVarConst__from_ast(node)) {
                        const __gotots_receiver_44: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        sync__from_gostdlib.Mutex.Lock(__gotots_receiver_44 === void 0 ? void 0 :
                            (__gotots_receiver_44 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                        const __gotots_receiver_45: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                        const __gotots_receiver_46 = __gotots_receiver_45 === void 0 ? void 0 :
                            (__gotots_receiver_45 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_46, $go$recovery);
                        });
                        __gotots_return_0 = isFreshLiteralType(Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node)));
                        break __gotots_return_block_0;
                    }
                    __gotots_return_0 = false;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsOptionalParameter(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_45: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_45 === void 0 ? void 0 :
                        (__gotots_receiver_45 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_46: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_47 = __gotots_receiver_46 === void 0 ? void 0 :
                        (__gotots_receiver_46 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_47, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.$go$private$checker$isOptionalParameter(r, node);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsReferencedAliasDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    let c: {
                        value: Checker;
                    } | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
                    if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canCollectSymbolAliasAccessibilityData || !IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = true;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_46: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_46 === void 0 ? void 0 :
                        (__gotots_receiver_46 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_47: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_48 = __gotots_receiver_47 === void 0 ? void 0 :
                        (__gotots_receiver_47 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_48, $go$recovery);
                    };
                    if (IsAliasSymbolDeclaration__from_ast(node)) {
                        {
                            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration(c, node);
                            if (!(__go_symbol === undefined)) {
                                const __gotots_store_37 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                let aliasLinks: tsonicTypeScriptRuntime.Location<AliasSymbolLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$AliasSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "aliasSymbolLinks"), __go_symbol);
                                if (AliasSymbolLinks.$storageOf(((aliasLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AliasSymbolLinks>).value).referenced) {
                                    __gotots_return_0 = true;
                                    break __gotots_return_block_0;
                                }
                                let target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = AliasSymbolLinks.$storageOf(((aliasLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AliasSymbolLinks>).value).aliasTarget;
                                if (!(target === undefined) && !((Node__from_ast.ModifierFlags(node) & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0) && !((Checker.$go$private$checker$getSymbolFlags(c, target) & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0) && (CompilerOptions__from_core.ShouldPreserveConstEnums((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) || !isConstEnumOrConstEnumOnlyModule(target))) {
                                    __gotots_return_0 = true;
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                    }
                    __gotots_return_0 = false;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsSymbolAccessible(r: {
        value: EmitResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, meaning: SymbolFlags__from_ast, shouldComputeAliasToMarkVisible: bool): SymbolAccessibilityResult__from_printer {
        return EmitResolver.$go$private$checker$isSymbolAccessible(r, __go_symbol, enclosingDeclaration, meaning, shouldComputeAliasToMarkVisible);
    }
    static IsTopLevelValueImportEqualsWithEntityName(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    let c: {
                        value: Checker;
                    } | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
                    if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canCollectSymbolAliasAccessibilityData) {
                        __gotots_return_0 = true;
                        break __gotots_return_block_0;
                    }
                    if (!IsParseTreeNode__from_ast(node) || !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast()) || !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast())) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    if (IsImportEqualsDeclaration__from_ast(node) && (NodeIsMissing__from_ast((Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference) || Node__from_ast.$storageOf((((Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast())) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_47: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_47 === void 0 ? void 0 :
                        (__gotots_receiver_47 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_48: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_49 = __gotots_receiver_48 === void 0 ? void 0 :
                        (__gotots_receiver_48 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_49, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.$go$private$checker$isAliasResolvedToValue(r, Checker.$go$private$checker$getSymbolOfDeclaration(c, node), false);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static IsValueAliasDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    let c: {
                        value: Checker;
                    } | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
                    if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canCollectSymbolAliasAccessibilityData || !IsParseTreeNode__from_ast(node)) {
                        __gotots_return_0 = true;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_48: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_48 === void 0 ? void 0 :
                        (__gotots_receiver_48 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_49: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_50 = __gotots_receiver_49 === void 0 ? void 0 :
                        (__gotots_receiver_49 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_50, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.$go$private$checker$isValueAliasDeclarationWorker(r, node);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static MarkLinkedReferencesRecursively(r: {
        value: EmitResolver;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_49: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_49 === void 0 ? void 0 :
                        (__gotots_receiver_49 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_50: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_51 = __gotots_receiver_50 === void 0 ? void 0 :
                        (__gotots_receiver_50 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_51, $go$recovery);
                    };
                    if (!(file === undefined)) {
                        let visit: Visitor__from_ast = new Visitor__from_ast(void 0);
                        visit = new Visitor__from_ast((n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                            if (IsImportEqualsDeclaration__from_ast(n) && (Node__from_ast.ModifierFlags(n) & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0) {
                                return false;
                            }
                            if (IsImportDeclaration__from_ast(n)) {
                                return false;
                            }
                            Checker.$go$private$checker$markLinkedReferences((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, n, ReferenceHintUnspecified$constant(), void 0, void 0);
                            Node__from_ast.ForEachChild(n, visit);
                            return false;
                        });
                        SourceFile__from_ast.ForEachChild(file, visit);
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static PrecalculateDeclarationEmitVisibility(r: {
        value: EmitResolver;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_50: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_50 === void 0 ? void 0 :
                        (__gotots_receiver_50 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_51: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_52 = __gotots_receiver_51 === void 0 ? void 0 :
                        (__gotots_receiver_51 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_52, $go$recovery);
                    };
                    const __gotots_store_38 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_53 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "declarationFileLinks");
                    const __gotots_store_39 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    const __gotots_argument_67 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_39, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (DeclarationFileLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationFileLinks(__gotots_receiver_53, __gotots_argument_67) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationFileLinks>).value).aliasesMarked) {
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_40 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_54 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "declarationFileLinks");
                    const __gotots_store_41 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    const __gotots_argument_68 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_41, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    DeclarationFileLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationFileLinks(__gotots_receiver_54, __gotots_argument_68) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationFileLinks>).value).aliasesMarked = true;
                    const __gotots_store_42 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    Node__from_ast.ForEachChild(NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_42, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)), new Visitor__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.aliasMarkingVisitor));
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static RequiresAddingImplicitUndefined(r: {
        value: EmitResolver;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    if (!IsParseTreeNode__from_ast(declaration)) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_53: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_53 === void 0 ? void 0 :
                        (__gotots_receiver_53 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_54: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_55 = __gotots_receiver_54 === void 0 ? void 0 :
                        (__gotots_receiver_54 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_55, $go$recovery);
                    };
                    __gotots_return_0 = EmitResolver.$go$private$checker$requiresAddingImplicitUndefined(r, declaration, __go_symbol, enclosingDeclaration);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static RequiresAddingImplicitUndefinedUnsafe(r: {
        value: EmitResolver;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!IsParseTreeNode__from_ast(declaration)) {
            return false;
        }
        return EmitResolver.$go$private$checker$requiresAddingImplicitUndefined(r, declaration, __go_symbol, enclosingDeclaration);
    }
    static SetReferencedImportDeclaration(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_54: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_54 === void 0 ? void 0 :
                        (__gotots_receiver_54 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_55: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_56 = __gotots_receiver_55 === void 0 ? void 0 :
                        (__gotots_receiver_55 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_56, $go$recovery);
                    };
                    const __gotots_store_43 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    JSXLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$JSXLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "jsxLinks"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSXLinks>).value).importRef = ref;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static TryJSTypeNodeToTypeNode(r: {
        value: EmitResolver;
    } | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: Flags__from_nodebuilder, internalFlags: InternalFlags__from_nodebuilder, tracker: SymbolTracker__from_nodebuilder | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    typeNode = EmitContext__from_printer.ParseNode(emitContext, typeNode);
                    const __gotots_receiver_55: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    sync__from_gostdlib.Mutex.Lock(__gotots_receiver_55 === void 0 ? void 0 :
                        (__gotots_receiver_55 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                    const __gotots_receiver_56: EmitResolver["checkerMu"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu;
                    const __gotots_receiver_57 = __gotots_receiver_56 === void 0 ? void 0 :
                        (__gotots_receiver_56 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_57, $go$recovery);
                    };
                    let requestNodeBuilder: NodeBuilder | undefined = NewNodeBuilder((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, emitContext);
                    __gotots_return_0 = NodeBuilder.TryJSTypeNodeToTypeNode(requestNodeBuilder, typeNode, enclosingDeclaration, flags, internalFlags, tracker);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$checker$aliasMarkingVisitorWorker(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindBinaryExpression$constant__from_ast(): {
                if (isCommonJSModuleExports(node) && IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right)) {
                    EmitResolver.$go$private$checker$markLinkedAliases(r, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                }
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                    EmitResolver.$go$private$checker$markLinkedAliases(r, Node__from_ast.Expression(node));
                }
                break;
            }
            case KindExportSpecifier$constant__from_ast(): {
                EmitResolver.$go$private$checker$markLinkedAliases(r, Node__from_ast.PropertyNameOrName(node));
                break;
            }
        }
        return Node__from_ast.ForEachChild(node, new Visitor__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.aliasMarkingVisitor));
    }
    static $go$private$checker$declaredParameterTypeContainsUndefined(r: {
        value: EmitResolver;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(parameter);
        if (typeNode === undefined) {
            return false;
        }
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeFromTypeNode((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, typeNode);
        return Checker.$go$private$checker$isErrorType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, t) || Checker.$go$private$checker$containsUndefinedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, t);
    }
    static $go$private$checker$determineIfDeclarationIsVisible(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindJSDocCallbackTag$constant__from_ast():
            case KindJSDocTypedefTag$constant__from_ast(): {
                return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsSourceFile__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                return EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                break;
            }
            case KindVariableDeclaration$constant__from_ast():
            case KindModuleDeclaration$constant__from_ast():
            case KindClassDeclaration$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindTypeAliasDeclaration$constant__from_ast():
            case KindJSTypeAliasDeclaration$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindEnumDeclaration$constant__from_ast():
            case KindImportEqualsDeclaration$constant__from_ast(): {
                if (IsVariableDeclaration__from_ast(node)) {
                    if (IsBindingPattern__from_ast(Node__from_ast.Name(node)) && Node__from_ast.Elements(Node__from_ast.Name(node)).length === 0) {
                        return false;
                    }
                }
                if (IsExternalModuleAugmentation__from_ast(node) || IsImplicitlyExportedJSDocDeclaration__from_ast(node)) {
                    return true;
                }
                let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationContainer__from_ast(node);
                if ((Checker.$go$private$checker$getCombinedModifierFlagsCached((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node) & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0 && !(!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) && !((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0))) {
                    return IsGlobalSourceFile__from_ast(parent);
                }
                return EmitResolver.$go$private$checker$isDeclarationVisible(r, parent);
                break;
            }
            case KindPropertyDeclaration$constant__from_ast():
            case KindPropertySignature$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindMethodSignature$constant__from_ast(): {
                if (!(Checker.GetEffectiveDeclarationFlags((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node, 6) === 0)) {
                    return false;
                }
                return EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                break;
            }
            case KindConstructor$constant__from_ast():
            case KindConstructSignature$constant__from_ast():
            case KindCallSignature$constant__from_ast():
            case KindIndexSignature$constant__from_ast():
            case KindParameter$constant__from_ast():
            case KindModuleBlock$constant__from_ast():
            case KindFunctionType$constant__from_ast():
            case KindConstructorType$constant__from_ast():
            case KindTypeLiteral$constant__from_ast():
            case KindTypeReference$constant__from_ast():
            case KindArrayType$constant__from_ast():
            case KindTupleType$constant__from_ast():
            case KindUnionType$constant__from_ast():
            case KindIntersectionType$constant__from_ast():
            case KindParenthesizedType$constant__from_ast():
            case KindNamedTupleMember$constant__from_ast(): {
                return EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                break;
            }
            case KindImportClause$constant__from_ast():
            case KindNamespaceImport$constant__from_ast():
            case KindImportSpecifier$constant__from_ast(): {
                return false;
                break;
            }
            case KindTypeParameter$constant__from_ast(): {
                return true;
                break;
            }
            case KindSourceFile$constant__from_ast():
            case KindNamespaceExportDeclaration$constant__from_ast(): {
                return true;
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                return false;
                break;
            }
            case KindExportSpecifier$constant__from_ast(): {
                let exportDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                if (IsExportDeclaration__from_ast(exportDecl) && (Node__from_ast.AsExportDeclaration(exportDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) {
                    return EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((exportDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                }
                return false;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
    static $go$private$checker$getReferenceResolver(r: {
        value: EmitResolver;
    } | undefined): ReferenceResolver__from_binder | undefined {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referenceResolver === undefined) {
            const __gotots_argument_69: Checker["compilerOptions"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions;
            const __gotots_field_0: Checker["resolveName"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
            const __gotots_receiver_56: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_1 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                return Checker.$go$private$checker$getResolvedSymbolOrNil(__gotots_receiver_56, $argument0);
            };
            const __gotots_receiver_57: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_2 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                return Checker.$go$private$checker$getMergedSymbol(__gotots_receiver_57, $argument0);
            };
            const __gotots_receiver_58: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_3 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                return Checker.$go$private$checker$getParentOfSymbol(__gotots_receiver_58, $argument0);
            };
            const __gotots_receiver_59: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                return Checker.$go$private$checker$getSymbolOfDeclaration(__gotots_receiver_59, $argument0);
            };
            const __gotots_receiver_60: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_5 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return Checker.$go$private$checker$getTypeOnlyAliasDeclarationEx(__gotots_receiver_60, $argument0, $argument1);
            };
            const __gotots_receiver_61: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_6 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                return Checker.$go$private$checker$getExportSymbolOfValueSymbolIfExported(__gotots_receiver_61, $argument0);
            };
            const __gotots_receiver_62: EmitResolver["checker"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
            const __gotots_field_7 = ($argument0: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined): [
                gostring,
                bool
            ] => {
                return Checker.$go$private$checker$tryGetElementAccessExpressionName(__gotots_receiver_62, $argument0);
            };
            const __gotots_argument_70 = new ReferenceResolverHooks__from_binder(__gotots_field_0, __gotots_field_1, __gotots_field_2, __gotots_field_3, __gotots_field_4, __gotots_field_5, __gotots_field_6, __gotots_field_7);
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referenceResolver = NewReferenceResolver__from_binder(__gotots_argument_69, __gotots_argument_70);
        }
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referenceResolver;
    }
    static $go$private$checker$hasVisibleDeclarations(r: {
        value: EmitResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, shouldComputeAliasToMakeVisible: bool): SymbolAccessibilityResult__from_printer | undefined {
        let aliasesToMakeVisibleSet: GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = GoMap.nil();
        let addVisibleAlias: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined;
        if (shouldComputeAliasToMakeVisible) {
            addVisibleAlias = (declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, aliasingStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                const __gotots_store_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                DeclarationLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "declarationLinks"), declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationLinks>).value).isVisible = TSTrue$constant__from_core();
                if (aliasesToMakeVisibleSet.isNil()) {
                    aliasesToMakeVisibleSet = GoMap.make(0, []);
                }
                aliasesToMakeVisibleSet.store(GetNodeId__from_ast(declaration), aliasingStatement);
            };
        }
        else {
            addVisibleAlias = noopAddVisibleAlias;
        }
        const __gotots_range_0 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            if (IsIdentifier__from_ast(declaration)) {
                continue;
            }
            if (!EmitResolver.$go$private$checker$isDeclarationVisible(r, declaration)) {
                let anyImportSyntax: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAnyImportSyntax(declaration);
                if (!(anyImportSyntax === undefined) && !HasSyntacticModifier__from_ast(anyImportSyntax, ModifierFlagsExport$constant__from_ast()) && EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((anyImportSyntax ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    const __gotots_callee_0 = addVisibleAlias;
                    const __gotots_argument_0 = declaration;
                    const __gotots_argument_1 = anyImportSyntax;
                    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
                    continue;
                }
                if (IsVariableDeclaration__from_ast(declaration) && IsVariableStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !HasSyntacticModifier__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ModifierFlagsExport$constant__from_ast()) && EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    const __gotots_callee_1 = addVisibleAlias;
                    const __gotots_argument_2 = declaration;
                    const __gotots_argument_3 = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
                    continue;
                }
                if (IsLateVisibilityPaintedStatement__from_ast(declaration) && !HasSyntacticModifier__from_ast(declaration, ModifierFlagsExport$constant__from_ast()) && EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    const __gotots_callee_2 = addVisibleAlias;
                    const __gotots_argument_4 = declaration;
                    const __gotots_argument_5 = declaration;
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
                    continue;
                }
                if (IsBindingElement__from_ast(declaration)) {
                    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0) && IsInJSFile__from_ast(declaration) && !(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsVariableDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsVariableStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !HasSyntacticModifier__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ModifierFlagsExport$constant__from_ast()) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                        const __gotots_callee_3 = addVisibleAlias;
                        const __gotots_argument_6 = declaration;
                        const __gotots_argument_7 = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
                        continue;
                    }
                    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsBlockScopedVariable$constant__from_ast()) >>> 0 === 0)) {
                        let rootDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = WalkUpBindingElementsAndPatterns__from_ast(declaration);
                        if (IsParameterDeclaration__from_ast(rootDeclaration)) {
                            return void 0;
                        }
                        let variableStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((rootDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        if (!IsVariableStatement__from_ast(variableStatement)) {
                            return void 0;
                        }
                        if (HasSyntacticModifier__from_ast(variableStatement, ModifierFlagsExport$constant__from_ast())) {
                            continue;
                        }
                        if (!EmitResolver.$go$private$checker$isDeclarationVisible(r, Node__from_ast.$storageOf(((variableStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            return void 0;
                        }
                        const __gotots_callee_4 = addVisibleAlias;
                        const __gotots_argument_8 = declaration;
                        const __gotots_argument_9 = variableStatement;
                        (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
                        continue;
                    }
                }
                return void 0;
            }
        }
        return new SymbolAccessibilityResult__from_printer(SymbolAccessibilityAccessible$constant__from_printer(), Collect$PointerTo_Named_ast$Node(Values$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node$Named_ast$NodeId$PointerTo_Named_ast$Node(aliasesToMakeVisibleSet)), "", void 0, "");
    }
    static $go$private$checker$isAliasResolvedToValue(r: {
        value: EmitResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, excludeTypeOnlyValues: bool): bool {
        let c: {
            value: Checker;
        } | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
        if (__go_symbol === undefined) {
            return false;
        }
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
            {
                let container: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                if (!(container === undefined)) {
                    const __gotots_receiver_2 = c;
                    const __gotots_store_6 = NodeBase__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    const __gotots_argument_17 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_6, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let fileSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration(__gotots_receiver_2, __gotots_argument_17);
                    Checker.$go$private$checker$resolveExternalModuleSymbol(c, fileSymbol, false);
                }
            }
        }
        let target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getExportSymbolOfValueSymbolIfExported(c, Checker.$go$private$checker$resolveAlias(c, __go_symbol));
        if (tsonicTypeScriptRuntime.sameLocation(target, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownSymbol)) {
            return !excludeTypeOnlyValues || Checker.$go$private$checker$getTypeOnlyAliasDeclaration(c, __go_symbol) === undefined;
        }
        return !((Checker.$go$private$checker$getSymbolFlagsEx(c, __go_symbol, excludeTypeOnlyValues, true) & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0) && (CompilerOptions__from_core.ShouldPreserveConstEnums((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) || !isConstEnumOrConstEnumOnlyModule(target));
    }
    static $go$private$checker$isDeclarationVisible(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!IsParseTreeNode__from_ast(node)) {
            return false;
        }
        if (node === undefined) {
            return false;
        }
        const __gotots_store_2 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let links: tsonicTypeScriptRuntime.Location<DeclarationLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "declarationLinks"), node);
        if (DeclarationLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationLinks>).value).isVisible === TSUnknown$constant__from_core()) {
            if (EmitResolver.$go$private$checker$determineIfDeclarationIsVisible(r, node)) {
                DeclarationLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationLinks>).value).isVisible = TSTrue$constant__from_core();
            }
            else {
                DeclarationLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationLinks>).value).isVisible = TSFalse$constant__from_core();
            }
        }
        return DeclarationLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationLinks>).value).isVisible === TSTrue$constant__from_core();
    }
    static $go$private$checker$isEntityNameVisible(r: {
        value: EmitResolver;
    } | undefined, entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, shouldComputeAliasToMakeVisible: bool): SymbolAccessibilityResult__from_printer {
        if (!IsParseTreeNode__from_ast(entityName)) {
            return new SymbolAccessibilityResult__from_printer(SymbolAccessibilityNotAccessible$constant__from_printer(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), "", void 0, "");
        }
        let meaning = getMeaningOfEntityNameReference(entityName);
        let firstIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast(entityName);
        const __gotots_callee_5: Checker["resolveName"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
        const __gotots_argument_11 = enclosingDeclaration;
        const __gotots_argument_12 = Node__from_ast.Text(firstIdentifier);
        const __gotots_argument_13 = meaning;
        const __gotots_argument_14 = void 0;
        const __gotots_argument_15 = false;
        const __gotots_argument_16 = false;
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
        if (!(__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0) && !((meaning & SymbolFlagsType$constant__from_ast()) >>> 0 === 0)) {
            return new SymbolAccessibilityResult__from_printer(SymbolAccessibilityAccessible$constant__from_printer(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), "", void 0, "");
        }
        if (__go_symbol === undefined && IsThisIdentifier__from_ast(firstIdentifier)) {
            let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Checker.$go$private$checker$getThisContainer((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, firstIdentifier, false, false));
            if (EmitResolver.$go$private$checker$isSymbolAccessible(r, sym, enclosingDeclaration, meaning, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer()) {
                return new SymbolAccessibilityResult__from_printer(SymbolAccessibilityAccessible$constant__from_printer(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), "", void 0, "");
            }
        }
        if (__go_symbol === undefined) {
            return new SymbolAccessibilityResult__from_printer(SymbolAccessibilityNotResolved$constant__from_printer(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), Node__from_ast.Text(firstIdentifier), firstIdentifier, "");
        }
        let visible: SymbolAccessibilityResult__from_printer | undefined = EmitResolver.$go$private$checker$hasVisibleDeclarations(r, __go_symbol, shouldComputeAliasToMakeVisible);
        if (!(visible === undefined)) {
            return SymbolAccessibilityResult__from_printer.$copy(SymbolAccessibilityResult__from_printer.$copy((visible ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
        }
        return new SymbolAccessibilityResult__from_printer(SymbolAccessibilityNotAccessible$constant__from_printer(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), Node__from_ast.Text(firstIdentifier), firstIdentifier, "");
    }
    static $go$private$checker$isOptionalParameter(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return Checker.$go$private$checker$isOptionalParameter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, node);
    }
    static $go$private$checker$isOptionalUninitializedParameterProperty(r: {
        value: EmitResolver;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks && EmitResolver.$go$private$checker$isOptionalParameter(r, parameter) && (Node__from_ast.Initializer(parameter) === undefined) && HasSyntacticModifier__from_ast(parameter, ModifierFlagsParameterPropertyModifier$constant__from_ast());
    }
    static $go$private$checker$isRequiredInitializedParameter(r: {
        value: EmitResolver;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks || EmitResolver.$go$private$checker$isOptionalParameter(r, parameter) || Node__from_ast.Initializer(parameter) === undefined) {
            return false;
        }
        if (HasSyntacticModifier__from_ast(parameter, ModifierFlagsParameterPropertyModifier$constant__from_ast())) {
            return !(enclosingDeclaration === undefined) && IsFunctionLikeDeclaration__from_ast(enclosingDeclaration);
        }
        return true;
    }
    static $go$private$checker$isSymbolAccessible(r: {
        value: EmitResolver;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, meaning: SymbolFlags__from_ast, shouldComputeAliasToMarkVisible: bool): SymbolAccessibilityResult__from_printer {
        return Checker.IsSymbolAccessible((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, __go_symbol, enclosingDeclaration, meaning, shouldComputeAliasToMarkVisible);
    }
    static $go$private$checker$isValueAliasDeclarationWorker(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let c: {
            value: Checker;
        } | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker;
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindImportEqualsDeclaration$constant__from_ast(): {
                return EmitResolver.$go$private$checker$isAliasResolvedToValue(r, Checker.$go$private$checker$getSymbolOfDeclaration(c, node), false);
                break;
            }
            case KindImportClause$constant__from_ast():
            case KindNamespaceImport$constant__from_ast():
            case KindImportSpecifier$constant__from_ast():
            case KindExportSpecifier$constant__from_ast(): {
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration(c, node);
                return !(__go_symbol === undefined) && EmitResolver.$go$private$checker$isAliasResolvedToValue(r, __go_symbol, true);
                break;
            }
            case KindExportDeclaration$constant__from_ast(): {
                let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsExportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                return !(exportClause === undefined) && (IsNamespaceExport__from_ast(exportClause) || Some$PointerTo_Named_ast$Node(Node__from_ast.Elements(exportClause), (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isValueAliasDeclaration));
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                if (!(Node__from_ast.Expression(node) === undefined) && Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                    return EmitResolver.$go$private$checker$isAliasResolvedToValue(r, Checker.$go$private$checker$getSymbolOfDeclaration(c, node), true);
                }
                return true;
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                if (isCommonJSModuleExports(node) && IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right)) {
                    return EmitResolver.$go$private$checker$isAliasResolvedToValue(r, Checker.$go$private$checker$getSymbolOfDeclaration(c, node), true);
                }
                break;
            }
        }
        return false;
    }
    static $go$private$checker$markLinkedAliases(r: {
        value: EmitResolver;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast()) && !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (IsExportAssignment__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || isCommonJSModuleExports(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
            const __gotots_callee_6: Checker["resolveName"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
            const __gotots_argument_18 = node;
            const __gotots_argument_19 = Node__from_ast.Text(node);
            const __gotots_argument_20 = 2998271;
            const __gotots_argument_21 = void 0;
            const __gotots_argument_22 = false;
            const __gotots_argument_23 = false;
            exportSymbol = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
        }
        else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportSpecifier$constant__from_ast()) {
            exportSymbol = Checker.$go$private$checker$getTargetOfExportSpecifier((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, 2998271, false);
        }
        let visited: GoMapValue<SymbolId__from_ast, GoEmptyStruct> = $goMap$MapOf_Named_ast$SymbolId_To_Struct_void.make(2, []);
        for (; !(exportSymbol === undefined);) {
            const __gotots_results_0 = visited.lookupOk(GetSymbolId__from_ast(exportSymbol));
            let seen = __gotots_results_0[1];
            if (seen) {
                break;
            }
            visited.store(GetSymbolId__from_ast(exportSymbol), new GoEmptyStruct);
            let nextSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
            const __gotots_range_1 = Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                const __gotots_store_7 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                DeclarationLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "declarationLinks"), declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationLinks>).value).isVisible = TSTrue$constant__from_core();
                if (IsInternalModuleImportEqualsDeclaration__from_ast(declaration)) {
                    let internalModuleReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportEqualsDeclaration(declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference;
                    let firstIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast(internalModuleReference);
                    const __gotots_callee_7: Checker["resolveName"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
                    const __gotots_argument_24 = declaration;
                    const __gotots_argument_25 = Node__from_ast.Text(firstIdentifier);
                    const __gotots_argument_26 = 2998271;
                    const __gotots_argument_27 = void 0;
                    const __gotots_argument_28 = false;
                    const __gotots_argument_29 = false;
                    let importSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
                    nextSymbol = importSymbol;
                }
            }
            exportSymbol = nextSymbol;
        }
    }
    static $go$private$checker$requiresAddingImplicitUndefined(r: {
        value: EmitResolver;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!IsParseTreeNode__from_ast(declaration)) {
            return false;
        }
        switch (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyDeclaration$constant__from_ast():
            case KindPropertySignature$constant__from_ast():
            case KindJSDocPropertyTag$constant__from_ast(): {
                if (__go_symbol === undefined) {
                    __go_symbol = Checker.$go$private$checker$getSymbolOfDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, declaration);
                }
                let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, __go_symbol);
                const __gotots_store_3 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "mappedSymbolLinks"), __go_symbol);
                let __gotots_logical_result_0 = (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsProperty$constant__from_ast()) >>> 0 === 0)) && (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0)) && isOptionalDeclaration(declaration);
                if (__gotots_logical_result_0) {
                    const __gotots_store_4 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_logical_result_0 = LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "ReverseMappedSymbolLinks"), __go_symbol);
                }
                let __gotots_logical_result_1 = __gotots_logical_result_0;
                if (__gotots_logical_result_1) {
                    const __gotots_store_5 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_logical_result_1 = !(ReverseMappedSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ReverseMappedSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "ReverseMappedSymbolLinks"), __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks>).value).mappedType === undefined);
                }
                return __gotots_logical_result_1 && containsNonMissingUndefinedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checker, t);
                break;
            }
            case KindParameter$constant__from_ast():
            case KindJSDocParameterTag$constant__from_ast(): {
                return EmitResolver.$go$private$checker$requiresAddingImplicitUndefinedWorker(r, declaration, enclosingDeclaration);
                break;
            }
            default: {
                const __gotots_argument_10 = new GoInterfaceAdapter("Node cannot possibly require adding undefined");
                GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
                break;
            }
        }
    }
    static $go$private$checker$requiresAddingImplicitUndefinedWorker(r: {
        value: EmitResolver;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return (EmitResolver.$go$private$checker$isRequiredInitializedParameter(r, parameter, enclosingDeclaration) || EmitResolver.$go$private$checker$isOptionalUninitializedParameterProperty(r, parameter)) && !EmitResolver.$go$private$checker$declaredParameterTypeContainsUndefined(r, parameter);
    }
}
export function newEmitResolver(checker: {
    value: Checker;
} | undefined): {
    value: EmitResolver;
} | undefined {
    let e: {
        value: EmitResolver;
    } | undefined = { value: new EmitResolver(checker, void 0, void 0, void 0, void 0, LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JSXLinks>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<JSXLinks> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$JSXLinks.nil();
        }), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationLinks>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<DeclarationLinks> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationLinks.nil();
        }), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationFileLinks>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<DeclarationFileLinks> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationFileLinks.nil();
        })) };
    const __gotots_receiver_0 = e;
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isValueAliasDeclaration = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return EmitResolver.$go$private$checker$isValueAliasDeclarationWorker(__gotots_receiver_0, $argument0);
    };
    const __gotots_receiver_1 = e;
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.aliasMarkingVisitor = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return EmitResolver.$go$private$checker$aliasMarkingVisitorWorker(__gotots_receiver_1, $argument0);
    };
    const __gotots_store_1 = (checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerMu =
        tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "mu");
    return e;
}
export function isCommonJSModuleExports(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsBinaryExpression__from_ast(node) && IsExpressionStatement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsSourceFile__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(((Node__from_ast.AsSourceFile(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined)) {
        switch (GetAssignmentDeclarationKind__from_ast(node).$value) {
            case 1:
            case 2: {
                return true;
                break;
            }
        }
    }
    return false;
}
export function getMeaningOfEntityNameReference(entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SymbolFlags__from_ast {
    if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeQuery$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExpressionWithTypeArguments$constant__from_ast() && !IsPartOfTypeNode__from_ast(Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindComputedPropertyName$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypePredicate$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsTypePredicateNode(Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName, entityName)) {
        return 1160127;
    }
    if (Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast() || Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast() || (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsQualifiedName(Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left, entityName)) || (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), entityName)) || (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindElementAccessExpression$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(Node__from_ast.$storageOf(((entityName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), entityName))) {
        return SymbolFlagsNamespace$constant__from_ast();
    }
    return SymbolFlagsType$constant__from_ast();
}
export function noopAddVisibleAlias(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, aliasingStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
}
export function isConstEnumOrConstEnumOnlyModule(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return isConstEnumSymbol(s) || !((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsConstEnumOnlyModule$constant__from_ast()) >>> 0 === 0);
}
