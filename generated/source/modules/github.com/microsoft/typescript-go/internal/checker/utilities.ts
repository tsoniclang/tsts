import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { BindingElement as BindingElement__from_ast, ConditionalTypeNode as ConditionalTypeNode__from_ast, Diagnostic as Diagnostic__from_ast, ExportAssignment as ExportAssignment__from_ast, FindAncestorResult as FindAncestorResult__from_ast, ForStatement as ForStatement__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, JsxExpression as JsxExpression__from_ast, Kind as Kind__from_ast, ModifierFlags as ModifierFlags__from_ast, NamedTupleMember as NamedTupleMember__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Program } from "./checker.js";
import type { ArrayTypeMapper, MergedTypeMapper, SimpleTypeMapper, TypeMapperData } from "./mapper.js";
import type { ConditionalRoot, ConditionalType, IndexType, IndexedAccessType, LiteralType, ObjectType, StringMappingType, SubstitutionType, TemplateLiteralType, TupleType, TypeAlias, TypeParameter, TypeReference, UnionType, UniqueESSymbolType } from "./types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { BinaryExpression as BinaryExpression__from_ast, CheckFlagsContainsPrivate$constant as CheckFlagsContainsPrivate$constant__from_ast, CheckFlagsContainsPublic$constant as CheckFlagsContainsPublic$constant__from_ast, CheckFlagsContainsStatic$constant as CheckFlagsContainsStatic$constant__from_ast, CheckFlagsSynthetic$constant as CheckFlagsSynthetic$constant__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, EntityNameToString as EntityNameToString__from_ast, FindAncestorFalse$constant as FindAncestorFalse$constant__from_ast, FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestorTrue$constant as FindAncestorTrue$constant__from_ast, FindAncestor as FindAncestor__from_ast, GetAssignmentTarget as GetAssignmentTarget__from_ast, GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, GetContainingClass as GetContainingClass__from_ast, GetPropertyNameForPropertyNameNode as GetPropertyNameForPropertyNameNode__from_ast, GetRootDeclaration as GetRootDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasAccessorModifier as HasAccessorModifier__from_ast, HasModifier as HasModifier__from_ast, HasQuestionToken as HasQuestionToken__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindableStaticAccessExpression as IsBindableStaticAccessExpression__from_ast, IsBindableStaticNameExpression as IsBindableStaticNameExpression__from_ast, IsCallExpression as IsCallExpression__from_ast, IsClassElement as IsClassElement__from_ast, IsClassLike as IsClassLike__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsDecorator as IsDecorator__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsExpandoPropertyDeclaration as IsExpandoPropertyDeclaration__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportSpecifier as IsExportSpecifier__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsExternalModuleAugmentation as IsExternalModuleAugmentation__from_ast, IsForStatement as IsForStatement__from_ast, IsFunctionLikeOrClassStaticBlockDeclaration as IsFunctionLikeOrClassStaticBlockDeclaration__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsInJSFile as IsInJSFile__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJsxNamespacedName as IsJsxNamespacedName__from_ast, IsLogicalOrCoalescingAssignmentOperator as IsLogicalOrCoalescingAssignmentOperator__from_ast, IsModuleBlock as IsModuleBlock__from_ast, IsNamespaceExport as IsNamespaceExport__from_ast, IsNonNullExpression as IsNonNullExpression__from_ast, IsOuterExpression as IsOuterExpression__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPartOfTypeNode as IsPartOfTypeNode__from_ast, IsPrivateIdentifierClassElementDeclaration as IsPrivateIdentifierClassElementDeclaration__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertyName as IsPropertyName__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsPrototypeAccess as IsPrototypeAccess__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsStatic as IsStatic__from_ast, IsThisParameter as IsThisParameter__from_ast, IsTypeLiteralNode as IsTypeLiteralNode__from_ast, IsTypeOrJSTypeAliasDeclaration as IsTypeOrJSTypeAliasDeclaration__from_ast, IsTypeReferenceNode as IsTypeReferenceNode__from_ast, IsVarConst as IsVarConst__from_ast, IsVariableDeclarationInitializedToRequire as IsVariableDeclarationInitializedToRequire__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, IsVariableStatement as IsVariableStatement__from_ast, IsVoidExpression as IsVoidExpression__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsteriskAsteriskToken$constant as KindAsteriskAsteriskToken$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSDocSignature$constant as KindJSDocSignature$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindLessThanLessThanToken$constant as KindLessThanLessThanToken$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPercentToken$constant as KindPercentToken$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, ModifierFlagsAsync$constant as ModifierFlagsAsync$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierFlagsOverride$constant as ModifierFlagsOverride$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierFlagsProtected$constant as ModifierFlagsProtected$constant__from_ast, ModifierFlagsPublic$constant as ModifierFlagsPublic$constant__from_ast, ModifierFlagsReadonly$constant as ModifierFlagsReadonly$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, NewDiagnosticChain as NewDiagnosticChain__from_ast, NewDiagnostic as NewDiagnostic__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsOptionalChain$constant as NodeFlagsOptionalChain$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, SkipParentheses as SkipParentheses__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsGetAccessor$constant as SymbolFlagsGetAccessor$constant__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, SymbolFlagsPrototype$constant as SymbolFlagsPrototype$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TokenFlagsContainsSeparator$constant as TokenFlagsContainsSeparator$constant__from_ast, TypeNodeBase as TypeNodeBase__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, VariableDeclaration as VariableDeclaration__from_ast, Visitor as Visitor__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { ContainerFlagsIsContainer$constant as ContainerFlagsIsContainer$constant__from_binder, GetContainerFlags as GetContainerFlags__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromString as FromString__from_jsnum, NewPseudoBigInt as NewPseudoBigInt__from_jsnum, ParsePseudoBigInt as ParsePseudoBigInt__from_jsnum, PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { GetTypesPackageName as GetTypesPackageName__from___go_module, MangleScopedPackageName as MangleScopedPackageName__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { EscapeString as EscapeString__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ErrorCallback as ErrorCallback__from_scanner, GetErrorRangeForNode as GetErrorRangeForNode__from_scanner, GetTextOfNode as GetTextOfNode__from_scanner, IsIntrinsicJsxName as IsIntrinsicJsxName__from_scanner, NewScanner as NewScanner__from_scanner, Scanner as Scanner__from_scanner, SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CombinePaths as CombinePaths__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, TryGetExtensionFromPath as TryGetExtensionFromPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Compare$Named_jsnum$Number } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { IfElse$int, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Compare$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Compare.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_checker$ArrayTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$MergedTypeMapper, $goInterfaceAdapter$PointerTo_Named_checker$SimpleTypeMapper, $goInterfaceAdapter$bool, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { Checker, signatureHasRestParameter } from "./checker.js";
import { TypeMapper, TypeMapperKindArray$constant, TypeMapperKindMerged$constant, TypeMapperKindSimple$constant } from "./mapper.js";
import { ObjectFlagsObjectLiteral$constant, ObjectFlagsObjectTypeKindMask$constant, ObjectFlagsReference$constant, ObjectFlagsTuple$constant, Signature, TupleElementInfo, Type, TypeFlagsAny$constant, TypeFlagsBooleanLiteral$constant, TypeFlagsConditional$constant, TypeFlagsIndex$constant, TypeFlagsIndexedAccess$constant, TypeFlagsIntersection$constant, TypeFlagsNumberLiteral$constant, TypeFlagsObject$constant, TypeFlagsStringLiteral$constant, TypeFlagsStringMapping$constant, TypeFlagsStringOrNumberLiteralOrUnique$constant, TypeFlagsSubstitution$constant, TypeFlagsTemplateLiteral$constant, TypeFlagsTypeParameter$constant, TypeFlagsUndefined$constant, TypeFlagsUnion$constant, TypeFlagsUniqueESSymbol$constant } from "./types.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function NewDiagnosticForNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
    let loc = TextRange__from_core.$zero();
    if (!(node === undefined)) {
        file = GetSourceFileOfNode__from_ast(node);
        loc = GetErrorRangeForNode__from_scanner(file, node);
    }
    return NewDiagnostic__from_ast(file, TextRange__from_core.$copy(loc), message, args);
}
export function NewDiagnosticChainForNode(chain: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    if (!(chain === undefined)) {
        return NewDiagnosticChain__from_ast(chain, message, args);
    }
    return NewDiagnosticForNode(node, message, args);
}
export function findInMap$kernel<K, V>($go$zero$void_to_T1: () => V, m: GoMapValue<K, V>, predicate: (($0: V) => bool) | undefined): V {
    const __gotots_range_4 = m;
    const __gotots_range_keys_0 = __gotots_range_4.keys();
    for (const __gotots_range_value_5 of __gotots_range_keys_0) {
        const __gotots_range_value_6 = __gotots_range_4.lookupOk(__gotots_range_value_5);
        if (!__gotots_range_value_6[1]) {
            continue;
        }
        const __gotots_range_value_7 = __gotots_range_value_6[0];
        let value: V = __gotots_range_value_7;
        const __gotots_callee_7 = predicate;
        const __gotots_argument_19 = value;
        if ((__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19)) {
            return value;
        }
    }
    return $go$zero$void_to_T1();
}
export function hasOverrideModifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return HasSyntacticModifier__from_ast(node, ModifierFlagsOverride$constant__from_ast());
}
export function hasAsyncModifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return HasSyntacticModifier__from_ast(node, ModifierFlagsAsync$constant__from_ast());
}
export function getSelectedModifierFlags(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: ModifierFlags__from_ast): ModifierFlags__from_ast {
    return (Node__from_ast.ModifierFlags(node) & flags) >>> 0;
}
export function hasReadonlyModifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return HasModifier__from_ast(node, ModifierFlagsReadonly$constant__from_ast());
}
export function isStaticPrivateIdentifierProperty(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsPrivateIdentifierClassElementDeclaration__from_ast(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && IsStatic__from_ast(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
}
export type AssignmentKind = int32;
export function AssignmentKindNone$constant(): AssignmentKind {
    return 0;
}
export function AssignmentKindDefinite$constant(): AssignmentKind {
    return 1;
}
export function AssignmentKindCompound$constant(): AssignmentKind {
    return 2;
}
export function getAssignmentTargetKind(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): AssignmentKind {
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetAssignmentTarget__from_ast(node);
    if (target === undefined) {
        return AssignmentKindNone$constant();
    }
    switch (Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBinaryExpression$constant__from_ast(): {
            let binaryOperator = Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            if (binaryOperator === KindEqualsToken$constant__from_ast() || IsLogicalOrCoalescingAssignmentOperator__from_ast(binaryOperator)) {
                return AssignmentKindDefinite$constant();
            }
            return AssignmentKindCompound$constant();
            break;
        }
        case KindPrefixUnaryExpression$constant__from_ast():
        case KindPostfixUnaryExpression$constant__from_ast(): {
            return AssignmentKindCompound$constant();
            break;
        }
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast(): {
            return AssignmentKindDefinite$constant();
            break;
        }
    }
    const __gotots_argument_5 = new GoInterfaceAdapter("Unhandled case in getAssignmentTargetKind");
    GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function isDeleteTarget(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!IsAccessExpression__from_ast(node)) {
        return false;
    }
    node = WalkUpParenthesizedExpressions__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    return !(node === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDeleteExpression$constant__from_ast();
}
export function isInCompoundLikeAssignment(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetAssignmentTarget__from_ast(node);
    return !(target === undefined) && IsAssignmentExpression__from_ast(target, true) && isCompoundLikeAssignment(target);
}
export function isCompoundLikeAssignment(assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(assignment) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
    return Node__from_ast.$storageOf(((right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast() && isShiftOperatorOrHigher(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(right) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
}
export function isConstTypeReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsTypeReferenceNode__from_ast(node) && Node__from_ast.TypeArguments(node).length === 0 && IsIdentifier__from_ast(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName) && Node__from_ast.Text(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName) === "const";
}
export function isTypeReferenceIdentifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast();) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return IsTypeReferenceNode__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function IsInTypeQuery(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(FindAncestorOrQuit__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        switch (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindTypeQuery$constant__from_ast(): {
                return FindAncestorTrue$constant__from_ast();
                break;
            }
            case KindIdentifier$constant__from_ast():
            case KindQualifiedName$constant__from_ast(): {
                return FindAncestorFalse$constant__from_ast();
                break;
            }
        }
        return FindAncestorQuit$constant__from_ast();
    }) === undefined);
}
export function canHaveLocals(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindArrowFunction$constant__from_ast():
        case KindBlock$constant__from_ast():
        case KindCallSignature$constant__from_ast():
        case KindCaseBlock$constant__from_ast():
        case KindCatchClause$constant__from_ast():
        case KindClassStaticBlockDeclaration$constant__from_ast():
        case KindConditionalType$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindConstructorType$constant__from_ast():
        case KindConstructSignature$constant__from_ast():
        case KindForStatement$constant__from_ast():
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindFunctionType$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindIndexSignature$constant__from_ast():
        case KindJSDocSignature$constant__from_ast():
        case KindMappedType$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindSourceFile$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSTypeAliasDeclaration$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function isShorthandAmbientModuleSymbol(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return isShorthandAmbientModule(Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
}
export function isShorthandAmbientModule(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast() && Node__from_ast.Body(node) === undefined;
}
export function getAliasDeclarationFromName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportClause$constant__from_ast():
        case KindImportSpecifier$constant__from_ast():
        case KindNamespaceImport$constant__from_ast():
        case KindExportSpecifier$constant__from_ast():
        case KindExportAssignment$constant__from_ast():
        case KindImportEqualsDeclaration$constant__from_ast():
        case KindNamespaceExport$constant__from_ast(): {
            return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindQualifiedName$constant__from_ast(): {
            return getAliasDeclarationFromName(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
    }
    return void 0;
}
export function entityNameToString(name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    return EntityNameToString__from_ast(name, GetTextOfNode__from_scanner);
}
export function getContainingQualifiedNameNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (; IsQualifiedName__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return node;
}
export function isSideEffectImport(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsImportDeclaration__from_ast);
    return !(ancestor === undefined) && Node__from_ast.ImportClause(ancestor) === undefined;
}
export function getExternalModuleRequireArgument(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsVariableDeclarationInitializedToRequire__from_ast(node)) {
        return Node__from_ast.Arguments(Node__from_ast.Initializer(node)).get(0);
    }
    return void 0;
}
export function isRightSideOfAccessExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (IsPropertyAccessExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node) || IsElementAccessExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression, node));
}
export function isTopLevelInExternalModuleAugmentation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsModuleBlock__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsExternalModuleAugmentation__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function isSyntacticDefault(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return (IsExportAssignment__from_ast(node) && !(Node__from_ast.AsExportAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) || HasSyntacticModifier__from_ast(node, ModifierFlagsDefault$constant__from_ast()) || IsExportSpecifier__from_ast(node) || IsNamespaceExport__from_ast(node);
}
export function hasExportAssignmentSymbol(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.lookup(InternalSymbolNameExportEquals$string__from_ast) === undefined);
}
export function isTypeAlias(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsTypeOrJSTypeAliasDeclaration__from_ast(node);
}
export function hasOnlyExpressionInitializer(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableDeclaration$constant__from_ast():
        case KindParameter$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindEnumMember$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function hasDotDotDotToken(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParameter$constant__from_ast(): {
            return !(ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined);
            break;
        }
        case KindBindingElement$constant__from_ast(): {
            return !((Node__from_ast.AsBindingElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined);
            break;
        }
        case KindNamedTupleMember$constant__from_ast(): {
            return !((Node__from_ast.AsNamedTupleMember(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined);
            break;
        }
        case KindJsxExpression$constant__from_ast(): {
            return !((Node__from_ast.AsJsxExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined);
            break;
        }
    }
    return false;
}
export function IsTypeAny(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !(t === undefined) && !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsAny$constant()) >>> 0 === 0);
}
export function isExclamationToken(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExclamationToken$constant__from_ast();
}
export function isOptionalDeclaration(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return HasQuestionToken__from_ast(declaration);
}
export function isEmptyArrayLiteral(expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsArrayLiteralExpression__from_ast(expression) && Node__from_ast.Elements(expression).length === 0;
}
export function declarationBelongsToPrivateAmbientMember(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetRootDeclaration__from_ast(declaration);
    let memberDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = root;
    if (Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
        memberDeclaration = Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return isPrivateWithinAmbient(memberDeclaration);
}
export function isPrivateWithinAmbient(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return (HasModifier__from_ast(node, ModifierFlagsPrivate$constant__from_ast()) || IsPrivateIdentifierClassElementDeclaration__from_ast(node)) && !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0);
}
export function isTypeAssertion(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsAssertionExpression__from_ast(SkipParentheses__from_ast(node));
}
export function createSymbolTable(symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): SymbolTable__from_ast {
    if (symbols.length === 0) {
        return new SymbolTable__from_ast(GoMap.nil());
    }
    let result: SymbolTable__from_ast = new SymbolTable__from_ast(GoMap.make(0, []));
    const __gotots_range_0 = symbols;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_0;
        result.$value.store(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol);
    }
    return result;
}
export function CompareTypes(t1: tsonicTypeScriptRuntime.Location<Type> | undefined, t2: tsonicTypeScriptRuntime.Location<Type> | undefined): int {
    if (tsonicTypeScriptRuntime.sameLocation(t1, t2)) {
        return 0;
    }
    if (t1 === undefined) {
        return -1;
    }
    if (t2 === undefined) {
        return 1;
    }
    if (!tsonicTypeScriptRuntime.sameLocation(((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker, ((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker)) {
        const __gotots_argument_6 = new GoInterfaceAdapter("Cannot compare types from different checkers");
        GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
    }
    {
        let c = getSortOrderFlags(t1) - getSortOrderFlags(t2);
        if (c !== 0) {
            return c;
        }
    }
    {
        let c = compareTypeNames(t1, t2);
        if (c !== 0) {
            return c;
        }
    }
    __gotots_control_target_2: {
        if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (394239)) >>> 0 === 0)) {
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0)) {
            {
                const __gotots_callee_0 = ((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.compareSymbols;
                const __gotots_argument_7 = ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                const __gotots_argument_8 = ((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                let c = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8);
                if (c !== 0) {
                    return c;
                }
            }
            if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) && !((((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0)) {
                let r1: tsonicTypeScriptRuntime.Location<TypeReference> | undefined = Type.AsTypeReference(t1);
                let r2: tsonicTypeScriptRuntime.Location<TypeReference> | undefined = Type.AsTypeReference(t2);
                if (!((((((r1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsTuple$constant()) >>> 0 === 0) && !((((((r2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsTuple$constant()) >>> 0 === 0)) {
                    {
                        let c = compareTupleTypes(Type.AsTupleType(((r1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target), Type.AsTupleType(((r2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target));
                        if (c !== 0) {
                            return c;
                        }
                    }
                }
                if (((r1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node === undefined && ((r2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node === undefined) {
                    {
                        let c = compareTypeLists(((Type.AsTypeReference(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.resolvedTypeArguments, ((Type.AsTypeReference(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.resolvedTypeArguments);
                        if (c !== 0) {
                            return c;
                        }
                    }
                }
                else {
                    {
                        let c = Checker.$go$private$checker$compareNodes(((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker, ((r1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node, ((r2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node);
                        if (c !== 0) {
                            return c;
                        }
                    }
                    {
                        let c = compareTypeMappers(((Type.AsObjectType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType>).value.mapper, ((Type.AsObjectType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType>).value.mapper);
                        if (c !== 0) {
                            return c;
                        }
                    }
                }
            }
            else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0)) {
                return -1;
            }
            else if (!((((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0)) {
                return 1;
            }
            else {
                {
                    let c = ((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsObjectTypeKindMask$constant()) >>> 0) - ((((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsObjectTypeKindMask$constant()) >>> 0);
                    if (c !== 0) {
                        return c;
                    }
                }
                {
                    let c = compareTypeMappers(((Type.AsObjectType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType>).value.mapper, ((Type.AsObjectType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType>).value.mapper);
                    if (c !== 0) {
                        return c;
                    }
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            let o1: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsUnionType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origin;
            let o2: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsUnionType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origin;
            if (o1 === undefined && o2 === undefined) {
                {
                    let c = compareTypeLists(Type.Types(t1), Type.Types(t2));
                    if (c !== 0) {
                        return c;
                    }
                }
            }
            else if (o1 === undefined) {
                return 1;
            }
            else if (o2 === undefined) {
                return -1;
            }
            else {
                {
                    let c = CompareTypes(o1, o2);
                    if (c !== 0) {
                        return c;
                    }
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0)) {
            {
                let c = compareTypeLists(Type.Types(t1), Type.Types(t2));
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (114688)) >>> 0 === 0)) {
            {
                const __gotots_callee_1 = ((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.compareSymbols;
                const __gotots_argument_9 = ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                const __gotots_argument_10 = ((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                let c = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10);
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLiteral$constant()) >>> 0 === 0)) {
            {
                let c = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare((($value: GoInterface | undefined): gostring => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((Type.AsLiteralType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value), (($value: GoInterface | undefined): gostring => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((Type.AsLiteralType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value))));
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumberLiteral$constant()) >>> 0 === 0)) {
            {
                let c = Compare$Named_jsnum$Number((($value: GoInterface | undefined): Number__from_jsnum => {
                    if (!$goInterfaceAdapter$Named_jsnum$Number.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((Type.AsLiteralType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value), (($value: GoInterface | undefined): Number__from_jsnum => {
                    if (!$goInterfaceAdapter$Named_jsnum$Number.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((Type.AsLiteralType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value));
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBooleanLiteral$constant()) >>> 0 === 0)) {
            let b1 = (($value: GoInterface | undefined): bool => {
                if (!$goInterfaceAdapter$bool.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((Type.AsLiteralType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
            let b2 = (($value: GoInterface | undefined): bool => {
                if (!$goInterfaceAdapter$bool.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((Type.AsLiteralType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
            if (b1 !== b2) {
                if (b1) {
                    return 1;
                }
                return -1;
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0)) {
            {
                const __gotots_callee_2 = ((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.compareSymbols;
                const __gotots_argument_11 = ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                const __gotots_argument_12 = ((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                let c = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11, __gotots_argument_12);
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
            {
                let c = CompareTypes((Type.AsIndexType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, (Type.AsIndexType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target);
                if (c !== 0) {
                    return c;
                }
            }
            {
                let c = (Type.AsIndexType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexFlags - (Type.AsIndexType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexFlags;
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0)) {
            {
                let c = CompareTypes((Type.AsIndexedAccessType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, (Type.AsIndexedAccessType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType);
                if (c !== 0) {
                    return c;
                }
            }
            {
                let c = CompareTypes((Type.AsIndexedAccessType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, (Type.AsIndexedAccessType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType);
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
            {
                const __gotots_receiver_3 = ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.checker;
                const __gotots_store_0 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(TypeNodeBase__from_ast.$storageOf((((Type.AsConditionalType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
                const __gotots_argument_13 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                const __gotots_store_1 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(TypeNodeBase__from_ast.$storageOf((((Type.AsConditionalType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
                const __gotots_argument_14 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                let c = Checker.$go$private$checker$compareNodes(__gotots_receiver_3, __gotots_argument_13, __gotots_argument_14);
                if (c !== 0) {
                    return c;
                }
            }
            {
                let c = compareTypeMappers((Type.AsConditionalType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper, (Type.AsConditionalType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSubstitution$constant()) >>> 0 === 0)) {
            {
                let c = CompareTypes((Type.AsSubstitutionType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType, (Type.AsSubstitutionType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType);
                if (c !== 0) {
                    return c;
                }
            }
            {
                let c = CompareTypes((Type.AsSubstitutionType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint, (Type.AsSubstitutionType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint);
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0)) {
            {
                let c = Compare$SliceOf_string$string((Type.AsTemplateLiteralType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.texts, (Type.AsTemplateLiteralType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.texts);
                if (c !== 0) {
                    return c;
                }
            }
            {
                let c = compareTypeLists((Type.AsTemplateLiteralType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types, (Type.AsTemplateLiteralType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types);
                if (c !== 0) {
                    return c;
                }
            }
        }
        else if (!((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
            {
                let c = CompareTypes((Type.AsStringMappingType(t1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, (Type.AsStringMappingType(t2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target);
                if (c !== 0) {
                    return c;
                }
            }
        }
    }
    return ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id - ((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id;
}
export function getSortOrderFlags(t: tsonicTypeScriptRuntime.Location<Type> | undefined): int {
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (98304)) >>> 0 === 0) && (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) {
        return 65536;
    }
    return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags;
}
export function compareTypeNames(t1: tsonicTypeScriptRuntime.Location<Type> | undefined, t2: tsonicTypeScriptRuntime.Location<Type> | undefined): int {
    let s1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getTypeNameSymbol(t1);
    let s2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getTypeNameSymbol(t2);
    if (tsonicTypeScriptRuntime.sameLocation(s1, s2)) {
        if (!(((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined)) {
            return compareTypeLists((((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArguments, (((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArguments);
        }
        return 0;
    }
    if (s1 === undefined) {
        return 1;
    }
    if (s2 === undefined) {
        return -1;
    }
    return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(Symbol__from_ast.$storageOf(((s1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, Symbol__from_ast.$storageOf(((s2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name)));
}
export function getTypeNameSymbol(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined)) {
        return (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol;
    }
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (8912896)) >>> 0 === 0) || !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & (7)) >>> 0 === 0)) {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
    }
    return void 0;
}
export function compareTupleTypes(t1: {
    value: TupleType;
} | undefined, t2: {
    value: TupleType;
} | undefined): int {
    if (t1
        ===
            t2) {
        return 0;
    }
    if ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly !== (t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly) {
        return IfElse$int((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly, 1, -1);
    }
    if ((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.length !== (t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.length) {
        return (t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.length - (t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.length;
    }
    const __gotots_range_1 = (t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        let i = __gotots_range_value_1;
        {
            let c = TupleElementInfo.$storageOf(TupleElementInfo.$fromStorage((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).flags - TupleElementInfo.$storageOf(TupleElementInfo.$fromStorage((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).flags;
            if (c !== 0) {
                return c;
            }
        }
    }
    const __gotots_range_2 = (t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        let i = __gotots_range_value_2;
        {
            let c = compareElementLabels(TupleElementInfo.$storageOf(TupleElementInfo.$fromStorage((t1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).labeledDeclaration, TupleElementInfo.$storageOf(TupleElementInfo.$fromStorage((t2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).labeledDeclaration);
            if (c !== 0) {
                return c;
            }
        }
    }
    return 0;
}
export function compareElementLabels(n1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, n2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
    if (tsonicTypeScriptRuntime.sameLocation(n1, n2)) {
        return 0;
    }
    if (n1 === undefined) {
        return -1;
    }
    if (n2 === undefined) {
        return 1;
    }
    return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(Node__from_ast.Text(Node__from_ast.Name(n1)), Node__from_ast.Text(Node__from_ast.Name(n2)))));
}
export function compareTypeLists(s1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, s2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>): int {
    if (s1.length !== s2.length) {
        return s1.length - s2.length;
    }
    const __gotots_range_3 = s1;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_index_3;
        const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
        let i = __gotots_range_value_3;
        let t1: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_4;
        {
            let c = CompareTypes(t1, s2.get(i));
            if (c !== 0) {
                return c;
            }
        }
    }
    return 0;
}
export function compareTypeMappers(m1: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, m2: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): int {
    if (tsonicTypeScriptRuntime.sameLocation(m1, m2)) {
        return 0;
    }
    if (m1 === undefined) {
        return 1;
    }
    if (m2 === undefined) {
        return -1;
    }
    let kind1 = TypeMapper.Kind(m1);
    let kind2 = TypeMapper.Kind(m2);
    if (!(kind1 === kind2)) {
        return kind1 - kind2;
    }
    switch (kind1) {
        case TypeMapperKindSimple$constant(): {
            let m1__shadow_1: {
                value: SimpleTypeMapper;
            } | undefined = (($value: TypeMapperData | undefined): {
                value: SimpleTypeMapper;
            } | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_checker$SimpleTypeMapper.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(((m1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data);
            let m2__shadow_1: {
                value: SimpleTypeMapper;
            } | undefined = (($value: TypeMapperData | undefined): {
                value: SimpleTypeMapper;
            } | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_checker$SimpleTypeMapper.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(((m2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data);
            {
                let c = CompareTypes((m1__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source, (m2__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source);
                if (c !== 0) {
                    return c;
                }
            }
            return CompareTypes((m1__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, (m2__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target);
            break;
        }
        case TypeMapperKindArray$constant(): {
            let m1__shadow_1: {
                value: ArrayTypeMapper;
            } | undefined = (($value: TypeMapperData | undefined): {
                value: ArrayTypeMapper;
            } | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_checker$ArrayTypeMapper.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(((m1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data);
            let m2__shadow_1: {
                value: ArrayTypeMapper;
            } | undefined = (($value: TypeMapperData | undefined): {
                value: ArrayTypeMapper;
            } | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_checker$ArrayTypeMapper.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(((m2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data);
            {
                let c = compareTypeLists((m1__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources, (m2__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sources);
                if (c !== 0) {
                    return c;
                }
            }
            return compareTypeLists((m1__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targets, (m2__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targets);
            break;
        }
        case TypeMapperKindMerged$constant(): {
            let m1__shadow_1: {
                value: MergedTypeMapper;
            } | undefined = (($value: TypeMapperData | undefined): {
                value: MergedTypeMapper;
            } | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_checker$MergedTypeMapper.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(((m1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data);
            let m2__shadow_1: {
                value: MergedTypeMapper;
            } | undefined = (($value: TypeMapperData | undefined): {
                value: MergedTypeMapper;
            } | undefined => {
                if (!$goInterfaceAdapter$PointerTo_Named_checker$MergedTypeMapper.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(((m2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeMapper>).value.data);
            {
                let c = compareTypeMappers((m1__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m1, (m2__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m1);
                if (c !== 0) {
                    return c;
                }
            }
            return compareTypeMappers((m1__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2, (m2__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.m2);
            break;
        }
    }
    return 0;
}
export function getDeclarationModifierFlagsFromSymbol(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): ModifierFlags__from_ast {
    return getDeclarationModifierFlagsFromSymbolEx(s, false);
}
export function getDeclarationModifierFlagsFromSymbolEx(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, isWrite: bool): ModifierFlags__from_ast {
    if (!(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isWrite) {
            declaration = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsSetAccessorDeclaration__from_ast);
        }
        if (declaration === undefined && !((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsGetAccessor$constant__from_ast()) >>> 0 === 0)) {
            declaration = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsGetAccessorDeclaration__from_ast);
        }
        if (declaration === undefined) {
            declaration = Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
        }
        let flags = GetCombinedModifierFlags__from_ast(declaration);
        if (!(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && !((Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
            return flags;
        }
        return (flags & 4294967288) >>> 0;
    }
    if (!((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsSynthetic$constant__from_ast()) >>> 0 === 0)) {
        let accessModifier = 0;
        __gotots_control_target_4: {
            if (!((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsContainsPrivate$constant__from_ast()) >>> 0 === 0)) {
                accessModifier = ModifierFlagsPrivate$constant__from_ast();
            }
            else if (!((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsContainsPublic$constant__from_ast()) >>> 0 === 0)) {
                accessModifier = ModifierFlagsPublic$constant__from_ast();
            }
            else {
                accessModifier = ModifierFlagsProtected$constant__from_ast();
            }
        }
        let staticModifier = 0;
        if (!((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsContainsStatic$constant__from_ast()) >>> 0 === 0)) {
            staticModifier = ModifierFlagsStatic$constant__from_ast();
        }
        return (accessModifier | staticModifier) >>> 0;
    }
    if (!((Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0)) {
        return 257;
    }
    return ModifierFlagsNone$constant__from_ast();
}
export function isExponentiationOperator(kind: Kind__from_ast): bool {
    return kind === KindAsteriskAsteriskToken$constant__from_ast();
}
export function isMultiplicativeOperator(kind: Kind__from_ast): bool {
    return kind === KindAsteriskToken$constant__from_ast() || kind === KindSlashToken$constant__from_ast() || kind === KindPercentToken$constant__from_ast();
}
export function isMultiplicativeOperatorOrHigher(kind: Kind__from_ast): bool {
    return isExponentiationOperator(kind) || isMultiplicativeOperator(kind);
}
export function isAdditiveOperator(kind: Kind__from_ast): bool {
    return kind === KindPlusToken$constant__from_ast() || kind === KindMinusToken$constant__from_ast();
}
export function isAdditiveOperatorOrHigher(kind: Kind__from_ast): bool {
    return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind);
}
export function isShiftOperator(kind: Kind__from_ast): bool {
    return kind === KindLessThanLessThanToken$constant__from_ast() || kind === KindGreaterThanGreaterThanToken$constant__from_ast() || kind === KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast();
}
export function isShiftOperatorOrHigher(kind: Kind__from_ast): bool {
    return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind);
}
export function isObjectLiteralType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsObjectLiteral$constant()) >>> 0 === 0);
}
export function isDeclarationReadonly(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !((GetCombinedModifierFlags__from_ast(declaration) & ModifierFlagsReadonly$constant__from_ast()) >>> 0 === 0) && !IsParameterPropertyDeclaration__from_ast(declaration, Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export const orderedSetMapThreshold$int: int = 16;
export type orderedSet$Storage<T> = {
    valuesByKey: GoMapValue<T, GoEmptyStruct>;
    values: RuntimeSlice<GoContainerStorage<T>>;
};
export class orderedSet<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: orderedSet$Storage<T>) {
    }
    public static $storageOf<T>($source: orderedSet<T>): orderedSet$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: orderedSet$Storage<T>): orderedSet<T> {
        return new orderedSet<T>($source);
    }
    static $zero<T>($go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>): orderedSet<T> {
        return new orderedSet<T>({
            valuesByKey: $go$zero$void_to_MapOf_T0_To_Struct_void(),
            values: RuntimeSlice.nil<GoContainerStorage<T>>()
        });
    }
    declare private readonly then?: never;
    static $go$private$checker$add$kernel<T>(s: orderedSet<T> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct, $1: int) => GoMapValue<T, GoEmptyStruct>, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, value: T): void {
        const __gotots_slice_build_0 = orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(value)));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(value)));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
        }
        orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values = __gotots_slice_build_1;
        if (orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).valuesByKey.isNil()) {
            if ($go$length$SliceOf_T0_to_int(orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values) <= orderedSetMapThreshold$int) {
                return;
            }
            orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).valuesByKey = $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero(), $go$length$SliceOf_T0_to_int(orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values));
            const __gotots_range_5 = orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values.slice(0, $go$length$SliceOf_T0_to_int(orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values) - 1, null);
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                const __gotots_range_value_8 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_5.get(__gotots_range_index_4)));
                let v: T = __gotots_range_value_8;
                orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).valuesByKey.store(v, new GoEmptyStruct);
            }
        }
        orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).valuesByKey.store(value, new GoEmptyStruct);
    }
    static $go$private$checker$contains$kernel<T>(s: orderedSet<T> | undefined, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, value: T): bool {
        if (orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).valuesByKey.isNil()) {
            return generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$equal$T0_T0_to_bool, $go$from_container_storage$T0_to_T0, orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).values, $go$copy$T0_to_T0(value));
        }
        const __gotots_results_1 = orderedSet.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).valuesByKey.lookupOk(value);
        let ok = __gotots_results_1[1];
        return ok;
    }
}
export function getContainingFunctionOrClassStaticBlock(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, IsFunctionLikeOrClassStaticBlockDeclaration__from_ast);
}
export function isNodeDescendantOf(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; !(node === undefined);) {
        if (tsonicTypeScriptRuntime.sameLocation(node, ancestor)) {
            return true;
        }
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return false;
}
export function isTypeUsableAsPropertyName(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringOrNumberLiteralOrUnique$constant()) >>> 0 === 0);
}
export function getPropertyNameFromType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): gostring {
    __gotots_control_target_0: {
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLiteral$constant()) >>> 0 === 0)) {
            return (($value: GoInterface | undefined): gostring => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
        }
        else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumberLiteral$constant()) >>> 0 === 0)) {
            return (($value: GoInterface | undefined): Number__from_jsnum => {
                if (!$goInterfaceAdapter$Named_jsnum$Number.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value).String();
        }
        else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUniqueESSymbol$constant()) >>> 0 === 0)) {
            return (Type.AsUniqueESSymbolType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name;
        }
    }
    const __gotots_argument_4 = new GoInterfaceAdapter("Unhandled case in getPropertyNameFromType");
    GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function isNumericLiteralName(name: gostring): bool {
    return FromString__from_jsnum(name).String() === name;
}
export function isThisProperty(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return (IsPropertyAccessExpression__from_ast(node) || IsElementAccessExpression__from_ast(node)) && Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast();
}
export function isValidNumberString(s: gostring, roundTripOnly: bool): bool {
    if (s === "") {
        return false;
    }
    let n = FromString__from_jsnum(s);
    return !n.IsNaN() && !n.IsInf() && (!roundTripOnly || n.String() === s);
}
export function isValidBigIntString(s: gostring, roundTripOnly: bool): bool {
    if (s === "") {
        return false;
    }
    let scanner__shadow_1: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = NewScanner__from_scanner();
    Scanner__from_scanner.SetSkipTrivia(scanner__shadow_1, false);
    let success = true;
    Scanner__from_scanner.SetOnError(scanner__shadow_1, new ErrorCallback__from_scanner((diagnostic: {
        value: Message__from_diagnostics;
    } | undefined, start: int, length: int, args: RuntimeSlice<GoInterface | undefined>): void => {
        success = false;
    }));
    Scanner__from_scanner.SetText(scanner__shadow_1, s + "n");
    let result = Scanner__from_scanner.Scan(scanner__shadow_1);
    let negative = result === KindMinusToken$constant__from_ast();
    if (negative) {
        result = Scanner__from_scanner.Scan(scanner__shadow_1);
    }
    let flags = Scanner__from_scanner.TokenFlags(scanner__shadow_1);
    return success && result === KindBigIntLiteral$constant__from_ast() && Scanner__from_scanner.TokenEnd(scanner__shadow_1) === s.length + 1 && (flags & TokenFlagsContainsSeparator$constant__from_ast()) === 0 && (!roundTripOnly || s === pseudoBigIntToString(NewPseudoBigInt__from_jsnum(ParsePseudoBigInt__from_jsnum(Scanner__from_scanner.TokenValue(scanner__shadow_1)), negative)));
}
export function isValidESSymbolDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsVariableDeclaration__from_ast(node)) {
        return IsVarConst__from_ast(node) && IsIdentifier__from_ast(VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration(node))) && isVariableDeclarationInVariableStatement(node);
    }
    if (IsPropertyDeclaration__from_ast(node)) {
        return hasReadonlyModifier(node) && HasStaticModifier__from_ast(node);
    }
    return IsPropertySignatureDeclaration__from_ast(node) && hasReadonlyModifier(node);
}
export function isVariableDeclarationInVariableStatement(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsVariableDeclarationList__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsVariableStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function IsKnownSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return isLateBoundName(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
}
export function IsPrivateIdentifierSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (__go_symbol === undefined) {
        return false;
    }
    return strings__from_gostdlib.HasPrefix(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, "\u00FE#");
}
export function isLateBoundName(name: gostring): bool {
    return name.length >= 2 && goStringIndex(name, 0) === 254 && goStringIndex(name, 1) === 64;
}
export function isObjectOrArrayLiteralType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & (16512)) >>> 0 === 0);
}
export function getContainingClassExcludingClassDecorators(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let decorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (IsClassLike__from_ast(n)) {
            return FindAncestorQuit$constant__from_ast();
        }
        if (IsDecorator__from_ast(n)) {
            return FindAncestorTrue$constant__from_ast();
        }
        return FindAncestorFalse$constant__from_ast();
    });
    if (!(decorator === undefined) && IsClassLike__from_ast(Node__from_ast.$storageOf(((decorator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return GetContainingClass__from_ast(Node__from_ast.$storageOf(((decorator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    if (!(decorator === undefined)) {
        return GetContainingClass__from_ast(decorator);
    }
    return GetContainingClass__from_ast(node);
}
export function isThisTypeParameter(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && (Type.AsTypeParameter(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isThisType;
}
export function isClassInstanceProperty(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsInJSFile__from_ast(node) && IsExpandoPropertyDeclaration__from_ast(node)) {
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
        return (!IsBindableStaticAccessExpression__from_ast(left, false) || !IsPrototypeAccess__from_ast(Node__from_ast.Expression(left))) && !IsBindableStaticNameExpression__from_ast(left, true);
    }
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsClassLike__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsPropertyDeclaration__from_ast(node) && !HasAccessorModifier__from_ast(node);
}
export function isThisInitializedObjectBindingExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && (IsShorthandPropertyAssignment__from_ast(node) || IsPropertyAssignment__from_ast(node)) && IsBinaryExpression__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast() && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast();
}
export function isThisInitializedDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && IsVariableDeclaration__from_ast(node) && !(Node__from_ast.Initializer(node) === undefined) && Node__from_ast.$storageOf(((Node__from_ast.Initializer(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast();
}
export function isInAmbientOrTypeNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0) || !(FindAncestor__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return IsInterfaceDeclaration__from_ast(n) || IsTypeOrJSTypeAliasDeclaration__from_ast(n) || IsTypeLiteralNode__from_ast(n);
    }) === undefined);
}
export function isLiteralExpressionOfObject(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindObjectLiteralExpression$constant__from_ast():
        case KindArrayLiteralExpression$constant__from_ast():
        case KindRegularExpressionLiteral$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindClassExpression$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function isNonNullAccess(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsAccessExpression__from_ast(node) && IsNonNullExpression__from_ast(Node__from_ast.Expression(node));
}
export function getBindingElementPropertyName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return Node__from_ast.PropertyNameOrName(node);
}
export function isCallChain(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsCallExpression__from_ast(node) && !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0);
}
export function isSuperCall(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsCallExpression__from_ast(n) && Node__from_ast.$storageOf(((Node__from_ast.Expression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast();
}
export function getMembersOfDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindInterfaceDeclaration$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindTypeLiteral$constant__from_ast(): {
            return Node__from_ast.Members(node);
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            return Node__from_ast.Properties(node);
            break;
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
export function isInRightSideOfImportOrExportAssignment(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast();) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsImportEqualsDeclaration(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, node) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function isJsxIntrinsicTagName(tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsIdentifier__from_ast(tagName) && IsIntrinsicJsxName__from_scanner(Node__from_ast.Text(tagName)) || IsJsxNamespacedName__from_ast(tagName);
}
export function getContainingObjectLiteral(f: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if ((Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast() || Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast()) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast()) {
        return Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    else if (Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAssignment$constant__from_ast()) {
        return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return void 0;
}
export function isImportTypeQualifierPart(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    for (; IsQualifiedName__from_ast(parent);) {
        node = parent;
        parent = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if (!(parent === undefined) && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportType$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsImportTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier, node)) {
        return parent;
    }
    return void 0;
}
export function isInNameOfExpressionWithTypeArguments(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast();) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExpressionWithTypeArguments$constant__from_ast();
}
export function expressionResultIsUnused(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (;;) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (IsParenthesizedExpression__from_ast(parent)) {
            node = parent;
            continue;
        }
        if (IsExpressionStatement__from_ast(parent) || IsVoidExpression__from_ast(parent) || IsForStatement__from_ast(parent) && (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(parent), node)
            ||
                tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsForStatement(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor, node))) {
            return true;
        }
        if (IsBinaryExpression__from_ast(parent) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            if (tsonicTypeScriptRuntime.sameLocation(node, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
                return true;
            }
            node = parent;
            continue;
        }
        return false;
    }
}
export function pseudoBigIntToString(value: PseudoBigInt__from_jsnum): gostring {
    return value.String();
}
export function getSuperContainer(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, stopOnFunctions: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (;;) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (node === undefined) {
            return void 0;
        }
        {
            const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 = __gotots_switch_tag_0 === KindComputedPropertyName$constant__from_ast();
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant__from_ast();
                }
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindFunctionExpression$constant__from_ast();
                }
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindArrowFunction$constant__from_ast();
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_2 = false;
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindPropertyDeclaration$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindPropertySignature$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindMethodDeclaration$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindMethodSignature$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindConstructor$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindGetAccessor$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindSetAccessor$constant__from_ast();
                }
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindClassStaticBlockDeclaration$constant__from_ast();
                }
                if (__gotots_switch_match_2) {
                    __gotots_switch_selection_0 = 2;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_3 = false;
                if (!__gotots_switch_match_3) {
                    __gotots_switch_match_3 = __gotots_switch_tag_0 === KindDecorator$constant__from_ast();
                }
                if (__gotots_switch_match_3) {
                    __gotots_switch_selection_0 = 3;
                }
            }
            __gotots_control_target_1: {
                if (__gotots_switch_selection_0 === 0) {
                    node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    break __gotots_control_target_1;
                }
                if (__gotots_switch_selection_0 === 1) {
                    if (!stopOnFunctions) {
                        continue;
                    }
                    __gotots_switch_selection_0 = 2;
                }
                if (__gotots_switch_selection_0 === 2) {
                    return node;
                    break __gotots_control_target_1;
                }
                if (__gotots_switch_selection_0 === 3) {
                    if (IsParameterDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsClassElement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                        node = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    }
                    else if (IsClassElement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    }
                    break __gotots_control_target_1;
                }
            }
        }
    }
}
export function forEachYieldExpression(body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    let traverse: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined;
    traverse = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindYieldExpression$constant__from_ast(): {
                const __gotots_callee_3 = visitor;
                const __gotots_argument_15 = node;
                if ((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15)) {
                    return true;
                }
                let operand: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(node);
                if (operand === undefined) {
                    return false;
                }
                const __gotots_callee_4 = traverse;
                const __gotots_argument_16 = operand;
                return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
                break;
            }
            case KindEnumDeclaration$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindModuleDeclaration$constant__from_ast():
            case KindTypeAliasDeclaration$constant__from_ast(): {
                break;
            }
            default: {
                if (IsFunctionLike__from_ast(node)) {
                    if (!(Node__from_ast.Name(node) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.Name(node))) {
                        const __gotots_callee_5 = traverse;
                        const __gotots_argument_17 = Node__from_ast.Expression(Node__from_ast.Name(node));
                        return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17);
                    }
                }
                else if (!IsPartOfTypeNode__from_ast(node)) {
                    return Node__from_ast.ForEachChild(node, new Visitor__from_ast(traverse));
                }
                break;
            }
        }
        return false;
    };
    const __gotots_callee_6 = traverse;
    const __gotots_argument_18 = body;
    return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
}
export function getEnclosingContainer(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !((GetContainerFlags__from_binder(n) & ContainerFlagsIsContainer$constant__from_binder()) === 0);
    });
}
export function getDeclarationsOfKind(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, kind: Kind__from_ast): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Filter$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === kind;
    });
}
export function hasType(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.Type(node) === undefined);
}
export function getNonRestParameterCount(sig: tsonicTypeScriptRuntime.Location<Signature> | undefined): int {
    return Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters.length - IfElse$int(signatureHasRestParameter(sig), 1, 0);
}
export function minAndMax$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, slice: RuntimeSlice<GoContainerStorage<T>>, getValue: (($0: T) => int) | undefined): [
    int,
    int
] {
    let minValue = 0, maxValue = 0;
    const __gotots_range_6 = slice;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
        const __gotots_range_value_9 = __gotots_range_index_5;
        const __gotots_range_value_10 = $go$from_container_storage$T0_to_T0(__gotots_range_6.get(__gotots_range_index_5));
        let i = __gotots_range_value_9;
        let element: T = __gotots_range_value_10;
        const __gotots_callee_8 = getValue;
        const __gotots_argument_21 = element;
        let value = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21);
        if (i === 0) {
            minValue = value;
            maxValue = value;
        }
        else {
            minValue = globalThis.Math.min(minValue, value);
            maxValue = globalThis.Math.max(maxValue, value);
        }
    }
    return [minValue, maxValue];
}
export type FeatureMapEntry$Storage = {
    lib: gostring;
    props: RuntimeSlice<gostring>;
};
export class FeatureMapEntry {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FeatureMapEntry$Storage) {
    }
    public static $storageOf($source: FeatureMapEntry): FeatureMapEntry$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FeatureMapEntry$Storage): FeatureMapEntry {
        return new FeatureMapEntry($source);
    }
    public get lib(): gostring {
        return this.$storage.lib;
    }
    public set lib($value: gostring) {
        this.$storage.lib = $value;
    }
    public get props(): RuntimeSlice<gostring> {
        return this.$storage.props;
    }
    public set props($value: RuntimeSlice<gostring>) {
        this.$storage.props = $value;
    }
    static $copy($source: FeatureMapEntry): FeatureMapEntry {
        return new FeatureMapEntry({
            lib: $source.$storage.lib,
            props: $source.$storage.props
        });
    }
    declare private readonly then?: never;
}
export function rangeOfTypeParameters(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): TextRange__from_core {
    return NewTextRange__from_core(NodeList__from_ast.Pos(typeParameters) - 1, globalThis.Math.min(SourceFile__from_ast.Text(sourceFile).length, SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), NodeList__from_ast.End(typeParameters)) + 1));
}
export function tryGetPropertyAccessOrIdentifierToString(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    __gotots_control_target_3: {
        if (IsPropertyAccessExpression__from_ast(expr)) {
            let baseStr = tryGetPropertyAccessOrIdentifierToString(Node__from_ast.Expression(expr));
            if (baseStr !== "") {
                return baseStr + "." + entityNameToString(Node__from_ast.Name(expr));
            }
        }
        else if (IsElementAccessExpression__from_ast(expr)) {
            let baseStr = tryGetPropertyAccessOrIdentifierToString(Node__from_ast.Expression(expr));
            if (baseStr !== "" && IsPropertyName__from_ast(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression)) {
                return baseStr + "." + GetPropertyNameForPropertyNameNode__from_ast(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
            }
        }
        else if (IsIdentifier__from_ast(expr)) {
            return Node__from_ast.Text(expr);
        }
        else if (IsJsxNamespacedName__from_ast(expr)) {
            return entityNameToString(expr);
        }
    }
    return "";
}
export function allDeclarationsInSameSourceFile(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 1) {
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        const __gotots_range_7 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
            const __gotots_range_value_11 = __gotots_range_index_6;
            const __gotots_range_value_12 = __gotots_range_7.get(__gotots_range_index_6);
            let i = __gotots_range_value_11;
            let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
            if (i === 0) {
                sourceFile = GetSourceFileOfNode__from_ast(d);
            }
            else if (!tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(d), sourceFile)) {
                return false;
            }
        }
    }
    return true;
}
export function containsNonMissingUndefinedType(c: tsonicTypeScriptRuntime.Location<Checker> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    let candidate: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
        candidate = (Type.AsUnionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnionOrIntersectionType.types.get(0);
    }
    else {
        candidate = t;
    }
    return !((((candidate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUndefined$constant()) >>> 0 === 0) && !tsonicTypeScriptRuntime.sameLocation(candidate, ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.missingType);
}
export function getAnyImportSyntax(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let importNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportEqualsDeclaration$constant__from_ast(): {
            importNode = node;
            break;
        }
        case KindImportClause$constant__from_ast(): {
            importNode = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindNamespaceImport$constant__from_ast(): {
            importNode = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            importNode = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
    return importNode;
}
export function isReservedMemberName(name: gostring): bool {
    return name.length >= 2 && goStringIndex(name, 0) === 254 && goStringIndex(name, 1) !== 64 && goStringIndex(name, 1) !== 35;
}
export function introducesArgumentsExoticObject(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function symbolsToArray(symbols: SymbolTable__from_ast): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    const __gotots_range_8 = symbols.$value;
    const __gotots_range_keys_1 = __gotots_range_8.keys();
    for (const __gotots_range_value_13 of __gotots_range_keys_1) {
        const __gotots_range_value_14 = __gotots_range_8.lookupOk(__gotots_range_value_13);
        if (!__gotots_range_value_14[1]) {
            continue;
        }
        const __gotots_range_value_15 = __gotots_range_value_13;
        const __gotots_range_value_16 = __gotots_range_value_14[0];
        let id = __gotots_range_value_15;
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_16;
        if (!isReservedMemberName(id)) {
            result = result.append(void 0, [__go_symbol]);
        }
    }
    return result;
}
export function SkipAlias(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker: tsonicTypeScriptRuntime.Location<Checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
        return Checker.GetAliasedSymbol(checker, __go_symbol);
    }
    return __go_symbol;
}
export function IsExternalModuleSymbol(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    const __gotots_results_2 = utf8__from_gostdlib.DecodeRuneInString(Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
    const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
        int32,
        int
    ];
    let firstRune = __gotots_results_3[0];
    return !((Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0) && firstRune === 34;
}
export function ValueToString(value: GoInterface | undefined): gostring {
    const __gotots_type_switch_0: GoInterface | undefined = value;
    switch (true) {
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let value__shadow_1: gostring = __gotots_type_switch_0.$go$value;
            return "\"" + EscapeString__from_printer(value__shadow_1, 34) + "\"";
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
            let value__shadow_1: Number__from_jsnum = __gotots_type_switch_0.$go$value;
            return value__shadow_1.String();
            break;
        }
        case $goInterfaceAdapter$bool.$is(__gotots_type_switch_0): {
            let value__shadow_1: bool = __gotots_type_switch_0.$go$value;
            return IfElse$string(value__shadow_1, "true", "false");
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_0): {
            let value__shadow_1: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_0.$go$value);
            return value__shadow_1.String() + "n";
            break;
        }
    }
    const __gotots_argument_20 = new GoInterfaceAdapter("unhandled value type in valueToString");
    GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function nodeStartsNewLexicalEnvironment(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindConstructor$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast():
        case KindSourceFile$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export class DiagnosticDetails {
    declare private readonly $goType: void;
    public constructor(public Message: {
        value: Message__from_diagnostics;
    } | undefined, public Args: RuntimeSlice<GoInterface | undefined>) {
    }
    declare private readonly then?: never;
}
export function CreateModuleNotFoundChain(program: Program | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, moduleReference: gostring, mode: ModuleKind__from_core, packageName: gostring): DiagnosticDetails {
    const __gotots_receiver_1 = program;
    const __gotots_argument_1 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file);
    const __gotots_argument_2 = moduleReference;
    const __gotots_argument_3 = mode;
    let resolvedModule: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = goInterfaceNonNil<Program>(__gotots_receiver_1).GetResolvedModule(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
    if (!(resolvedModule === undefined) && ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.AlternateResult !== "") {
        if (strings__from_gostdlib.Contains(((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.AlternateResult, "/node_modules/@types/")) {
            packageName = "@types/" + MangleScopedPackageName__from___go_module(packageName);
        }
        return new DiagnosticDetails($state__diagnostics.There_are_types_at_0_but_this_result_could_not_be_resolved_when_respecting_package_json_exports_The_1_library_may_need_to_update_its_package_json_or_typings, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.AlternateResult), new GoInterfaceAdapter(packageName)]));
    }
    const __gotots_receiver_2 = program;
    let packagesMap: GoMapValue<gostring, bool> = goInterfaceNonNil<Program>(__gotots_receiver_2).GetPackagesMap();
    {
        const __gotots_results_0 = packagesMap.lookupOk(GetTypesPackageName__from___go_module(packageName));
        let ok = __gotots_results_0[1];
        if (ok) {
            return new DiagnosticDetails($state__diagnostics.If_the_0_package_actually_exposes_this_module_consider_sending_a_pull_request_to_amend_https_Colon_Slash_Slashgithub_com_SlashDefinitelyTyped_SlashDefinitelyTyped_Slashtree_Slashmaster_Slashtypes_Slash_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packageName), new GoInterfaceAdapter(MangleScopedPackageName__from___go_module(packageName))]));
        }
    }
    if (packagesMap.lookup(packageName)) {
        return new DiagnosticDetails($state__diagnostics.If_the_0_package_actually_exposes_this_module_try_adding_a_new_declaration_d_ts_file_containing_declare_module_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(packageName), new GoInterfaceAdapter(moduleReference)]));
    }
    return new DiagnosticDetails($state__diagnostics.Try_npm_i_save_dev_types_Slash_1_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(moduleReference), new GoInterfaceAdapter(MangleScopedPackageName__from___go_module(packageName))]));
}
export function CreateModeMismatchDetails(program: Program | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): DiagnosticDetails {
    let ext = TryGetExtensionFromPath__from_tspath(SourceFile__from_ast.FileName(file));
    let targetExt = IfElse$string(ext === ExtensionTs$string__from_tspath, ExtensionMts$string__from_tspath, IfElse$string(ext === ExtensionJs$string__from_tspath, ExtensionMjs$string__from_tspath, ""));
    const __gotots_receiver_0 = program;
    const __gotots_argument_0 = SourceFile__from_ast.Path(file);
    let meta = goInterfaceNonNil<Program>(__gotots_receiver_0).GetSourceFileMetaData(__gotots_argument_0);
    let packageJsonType = meta.PackageJsonType;
    let packageJsonDirectory = meta.PackageJsonDirectory;
    if (packageJsonDirectory !== "" && packageJsonType === "") {
        if (targetExt !== "") {
            return new DiagnosticDetails($state__diagnostics.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_add_the_field_type_Colon_module_to_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetExt), new GoInterfaceAdapter(CombinePaths__from_tspath(packageJsonDirectory, RuntimeSlice.literal<gostring>(["package.json"])))]));
        }
        return new DiagnosticDetails($state__diagnostics.To_convert_this_file_to_an_ECMAScript_module_add_the_field_type_Colon_module_to_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(CombinePaths__from_tspath(packageJsonDirectory, RuntimeSlice.literal<gostring>(["package.json"])))]));
    }
    if (targetExt !== "") {
        return new DiagnosticDetails($state__diagnostics.To_convert_this_file_to_an_ECMAScript_module_change_its_file_extension_to_0_or_create_a_local_package_json_file_with_type_Colon_module, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetExt)]));
    }
    return new DiagnosticDetails($state__diagnostics.To_convert_this_file_to_an_ECMAScript_module_create_a_local_package_json_file_with_type_Colon_module, RuntimeSlice.nil<GoInterface | undefined>());
}
export function walkUpOuterExpressions(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    for (; !(parent === undefined) && IsOuterExpression__from_ast(parent, OEKAll$constant__from_ast());) {
        parent = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return parent;
}
export function GetSetAccessorValueParameter(__go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let parameters = Node__from_ast.Parameters(__go_accessor);
    if (parameters.length > 0) {
        let hasThis = parameters.length === 2 && IsThisParameter__from_ast(parameters.get(0));
        return parameters.get(IfElse$int(hasThis, 1, 0));
    }
    return void 0;
}
