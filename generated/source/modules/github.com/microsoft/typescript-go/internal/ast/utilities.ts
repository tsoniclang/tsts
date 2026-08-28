import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModuleKind as ModuleKind__from_core, Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CheckJsDirective, HasFileName, ModifierList, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, Pragma$Storage as Pragma__from_ast$Storage } from "./ast.js";
import type { ArrowFunction, ClassDeclaration, ClassExpression, ConstructorDeclaration, ExportAssignment, ExportDeclaration, ForInOrOfStatement, ForStatement, FunctionExpression, GetAccessorDeclaration, ImportDeclaration, ImportEqualsDeclaration, ImportTypeNode, JsxText, MethodDeclaration, PostfixUnaryExpression, QualifiedName, SetAccessorDeclaration, TaggedTemplateExpression, TemplateLiteralLikeNodeBase } from "./ast_generated.js";
import type { Kind } from "./kind_generated.js";
import type { ModifierFlags } from "./modifierflags.js";
import type { NodeFlags } from "./nodeflags.js";
import type { SymbolFlags } from "./symbolflags.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int16, int32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/state.js";
import { CompareTextRanges as CompareTextRanges__from_core, CompilerOptions as CompilerOptions__from_core, JsxEmitReactJSX$constant as JsxEmitReactJSX$constant__from_core, JsxEmitReactJSXDev$constant as JsxEmitReactJSXDev$constant__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindES2015$constant as ModuleKindES2015$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleKindNode16$constant as ModuleKindNode16$constant__from_core, ModuleKindNodeNext$constant as ModuleKindNodeNext$constant__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ModuleKindPreserve$constant as ModuleKindPreserve$constant__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, ResolutionModeESM$constant as ResolutionModeESM$constant__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core, ScriptKindJS$constant as ScriptKindJS$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug, FailBadSyntaxKind as FailBadSyntaxKind__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionDcts$string as ExtensionDcts$string__from_tspath, ExtensionDmts$string as ExtensionDmts$string__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goStruct$Struct_Field_ast_u24_parent_PointerTo_Named_ast$Node_Tag__empty__Field_ast_u24_visit_PointerTo_Named_ast$Node_to_bool_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import { getCombinedFlags$Named_ast$ModifierFlags, getCombinedFlags$Named_ast$NodeFlags } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ast/getCombinedFlags.js";
import { Every$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { IfElse$Named_core$ModuleKind, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { BinarySearchFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/BinarySearchFunc.js";
import { Contains$SliceOf_Named_ast$Kind$Named_ast$Kind, Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_ast$Node_to_bool, $goInterfaceAdapter$PointerTo_Named_ast$hasFileNameImpl, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_ast$NodeId_To_Named_ast$ModuleInstanceState, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { IsDeclarationNode, Node, NodeBase, NodeDefault, NodeList, Pragma, SourceFile, SourceFileMetaData, Visitor, visitNodes } from "./ast.js";
import { ArrayTypeNode, BinaryExpression, BindingElement, BodyBase, CallExpression, ElementAccessExpression, FunctionDeclaration, FunctionLikeBase, FunctionLikeWithBodyBase, HeritageClause, ImportClause, InterfaceDeclaration, IsArrayLiteralExpression, IsArrowFunction, IsAsExpression, IsAssignmentOperator, IsBigIntLiteral, IsBinaryExpression, IsBindingElement, IsBlock, IsCallExpression, IsClassDeclaration, IsClassExpression, IsClassStaticBlockDeclaration, IsComputedPropertyName, IsConstructorDeclaration, IsDecorator, IsElementAccessExpression, IsEnumDeclaration, IsExportAssignment, IsExportDeclaration, IsExportSpecifier, IsExpressionWithTypeArguments, IsFunctionDeclaration, IsFunctionExpression, IsHeritageClause, IsIdentifier, IsImportDeclaration, IsImportEqualsDeclaration, IsImportSpecifier, IsImportTypeNode, IsInterfaceDeclaration, IsJSDocAugmentsTag, IsJSDocDeprecatedTag, IsJSDocImplementsTag, IsJSDocNameReference, IsJSTypeAliasDeclaration, IsJsxAttribute, IsJsxOpeningElement, IsJsxSelfClosingElement, IsJsxSpreadAttribute, IsLabeledStatement, IsLiteralKind, IsLiteralTypeNode, IsLogicalOrCoalescingAssignmentOperator, IsMetaProperty, IsMethodDeclaration, IsModifierKind, IsModuleBlock, IsModuleDeclaration, IsNamespaceExport, IsNamespaceImport, IsNewExpression, IsNonNullExpression, IsNumericLiteral, IsObjectLiteralExpression, IsParameterDeclaration, IsParenthesizedExpression, IsParenthesizedTypeNode, IsPrivateIdentifier, IsPropertyAccessExpression, IsPropertyDeclaration, IsPropertySignatureDeclaration, IsQualifiedName, IsShorthandPropertyAssignment, IsSourceFile, IsSpreadElement, IsStringLiteral, IsTaggedTemplateExpression, IsTokenKind, IsTypeLiteralNode, IsTypeQueryNode, IsTypeReferenceNode, IsVariableStatement, JSDoc, JsxNamespacedName, LiteralLikeNodeBase, LiteralTypeNode, LocalsContainerBase, MetaProperty, ModuleDeclaration, NodeFactory, NodeWithTypeArgumentsBase, ParameterDeclaration, PrefixUnaryExpression, PropertyAccessExpression, PropertyAssignment, ShorthandPropertyAssignment, TypeParameterDeclaration, TypeReferenceNode, VariableDeclaration, VariableDeclarationList, VariableStatement } from "./ast_generated.js";
import { NodeId, SymbolId } from "./ids.js";
import { KindAbstractKeyword$constant, KindAccessorKeyword$constant, KindAmpersandAmpersandEqualsToken$constant, KindAmpersandAmpersandToken$constant, KindAnyKeyword$constant, KindArrayBindingPattern$constant, KindArrayLiteralExpression$constant, KindArrayType$constant, KindArrowFunction$constant, KindAsExpression$constant, KindAsyncKeyword$constant, KindAwaitExpression$constant, KindBarBarEqualsToken$constant, KindBarBarToken$constant, KindBigIntKeyword$constant, KindBigIntLiteral$constant, KindBinaryExpression$constant, KindBindingElement$constant, KindBlock$constant, KindBooleanKeyword$constant, KindBreakStatement$constant, KindCallExpression$constant, KindCallSignature$constant, KindCaseBlock$constant, KindCaseClause$constant, KindCatchClause$constant, KindClassDeclaration$constant, KindClassExpression$constant, KindClassStaticBlockDeclaration$constant, KindCommaToken$constant, KindComputedPropertyName$constant, KindConditionalExpression$constant, KindConstKeyword$constant, KindConstructSignature$constant, KindConstructor$constant, KindConstructorType$constant, KindContinueStatement$constant, KindDebuggerStatement$constant, KindDeclareKeyword$constant, KindDecorator$constant, KindDefaultClause$constant, KindDefaultKeyword$constant, KindDeleteExpression$constant, KindDoStatement$constant, KindElementAccessExpression$constant, KindEmptyStatement$constant, KindEndOfFile$constant, KindEnumDeclaration$constant, KindEnumMember$constant, KindEqualsToken$constant, KindExclamationToken$constant, KindExportAssignment$constant, KindExportDeclaration$constant, KindExportKeyword$constant, KindExportSpecifier$constant, KindExpressionStatement$constant, KindExpressionWithTypeArguments$constant, KindExtendsKeyword$constant, KindExternalModuleReference$constant, KindFalseKeyword$constant, KindFirstCompoundAssignment$constant, KindFirstContextualKeyword$constant, KindFirstJSDocNode$constant, KindFirstJSDocTagNode$constant, KindFirstKeyword$constant, KindFirstNode$constant, KindFirstStatement$constant, KindFirstTemplateToken$constant, KindFirstTriviaToken$constant, KindFirstTypeNode$constant, KindForInStatement$constant, KindForOfStatement$constant, KindForStatement$constant, KindFunctionDeclaration$constant, KindFunctionExpression$constant, KindFunctionType$constant, KindGetAccessor$constant, KindGlobalKeyword$constant, KindIdentifier$constant, KindIfStatement$constant, KindImplementsKeyword$constant, KindImportClause$constant, KindImportDeclaration$constant, KindImportEqualsDeclaration$constant, KindImportKeyword$constant, KindImportSpecifier$constant, KindImportType$constant, KindInKeyword$constant, KindIndexSignature$constant, KindInferType$constant, KindInstanceOfKeyword$constant, KindInterfaceDeclaration$constant, KindIntrinsicKeyword$constant, KindJSDoc$constant, KindJSDocAllType$constant, KindJSDocAugmentsTag$constant, KindJSDocCallbackTag$constant, KindJSDocDeprecatedTag$constant, KindJSDocImplementsTag$constant, KindJSDocImportTag$constant, KindJSDocLink$constant, KindJSDocLinkCode$constant, KindJSDocLinkPlain$constant, KindJSDocNonNullableType$constant, KindJSDocNullableType$constant, KindJSDocOptionalType$constant, KindJSDocOverloadTag$constant, KindJSDocOverrideTag$constant, KindJSDocParameterTag$constant, KindJSDocPrivateTag$constant, KindJSDocPropertyTag$constant, KindJSDocProtectedTag$constant, KindJSDocPublicTag$constant, KindJSDocReadonlyTag$constant, KindJSDocReturnTag$constant, KindJSDocSatisfiesTag$constant, KindJSDocSeeTag$constant, KindJSDocSignature$constant, KindJSDocTemplateTag$constant, KindJSDocThisTag$constant, KindJSDocThrowsTag$constant, KindJSDocTypeExpression$constant, KindJSDocTypeTag$constant, KindJSDocTypedefTag$constant, KindJSDocUnknownTag$constant, KindJSDocVariadicType$constant, KindJSImportDeclaration$constant, KindJSTypeAliasDeclaration$constant, KindJsxAttribute$constant, KindJsxAttributes$constant, KindJsxClosingElement$constant, KindJsxElement$constant, KindJsxExpression$constant, KindJsxFragment$constant, KindJsxNamespacedName$constant, KindJsxOpeningElement$constant, KindJsxOpeningFragment$constant, KindJsxSelfClosingElement$constant, KindJsxSpreadAttribute$constant, KindJsxText$constant, KindLabeledStatement$constant, KindLastCompoundAssignment$constant, KindLastContextualKeyword$constant, KindLastJSDocNode$constant, KindLastJSDocTagNode$constant, KindLastKeyword$constant, KindLastStatement$constant, KindLastTemplateToken$constant, KindLastTriviaToken$constant, KindLastTypeNode$constant, KindLiteralType$constant, KindMappedType$constant, KindMetaProperty$constant, KindMethodDeclaration$constant, KindMethodSignature$constant, KindMinusMinusToken$constant, KindMinusToken$constant, KindMissingDeclaration$constant, KindModuleBlock$constant, KindModuleDeclaration$constant, KindNamedExports$constant, KindNamedImports$constant, KindNamedTupleMember$constant, KindNamespaceExport$constant, KindNamespaceExportDeclaration$constant, KindNamespaceImport$constant, KindNeverKeyword$constant, KindNewExpression$constant, KindNoSubstitutionTemplateLiteral$constant, KindNonNullExpression$constant, KindNotEmittedStatement$constant, KindNotEmittedTypeElement$constant, KindNullKeyword$constant, KindNumberKeyword$constant, KindNumericLiteral$constant, KindObjectBindingPattern$constant, KindObjectKeyword$constant, KindObjectLiteralExpression$constant, KindOmittedExpression$constant, KindOptionalType$constant, KindOutKeyword$constant, KindOverrideKeyword$constant, KindParameter$constant, KindParenthesizedExpression$constant, KindParenthesizedType$constant, KindPartiallyEmittedExpression$constant, KindPlusPlusToken$constant, KindPlusToken$constant, KindPostfixUnaryExpression$constant, KindPrefixUnaryExpression$constant, KindPrivateIdentifier$constant, KindPrivateKeyword$constant, KindPropertyAccessExpression$constant, KindPropertyAssignment$constant, KindPropertyDeclaration$constant, KindPropertySignature$constant, KindProtectedKeyword$constant, KindPublicKeyword$constant, KindQualifiedName$constant, KindQuestionQuestionEqualsToken$constant, KindQuestionQuestionToken$constant, KindQuestionToken$constant, KindReadonlyKeyword$constant, KindRegularExpressionLiteral$constant, KindRestType$constant, KindReturnStatement$constant, KindSatisfiesExpression$constant, KindSemicolonClassElement$constant, KindSetAccessor$constant, KindShorthandPropertyAssignment$constant, KindSourceFile$constant, KindSpreadAssignment$constant, KindSpreadElement$constant, KindStaticKeyword$constant, KindStringKeyword$constant, KindStringLiteral$constant, KindSuperKeyword$constant, KindSwitchStatement$constant, KindSymbolKeyword$constant, KindTaggedTemplateExpression$constant, KindTemplateExpression$constant, KindTemplateLiteralTypeSpan$constant, KindTemplateSpan$constant, KindThisKeyword$constant, KindThrowStatement$constant, KindTrueKeyword$constant, KindTryStatement$constant, KindTypeAliasDeclaration$constant, KindTypeAssertionExpression$constant, KindTypeKeyword$constant, KindTypeLiteral$constant, KindTypeOfExpression$constant, KindTypeOperator$constant, KindTypeParameter$constant, KindTypePredicate$constant, KindTypeQuery$constant, KindTypeReference$constant, KindUndefinedKeyword$constant, KindUnknownKeyword$constant, KindVariableDeclaration$constant, KindVariableDeclarationList$constant, KindVariableStatement$constant, KindVoidExpression$constant, KindVoidKeyword$constant, KindWhileStatement$constant, KindWithStatement$constant, KindYieldExpression$constant } from "./kind_generated.js";
import { ModifierFlagsAbstract$constant, ModifierFlagsAccessor$constant, ModifierFlagsAmbient$constant, ModifierFlagsAsync$constant, ModifierFlagsConst$constant, ModifierFlagsDecorator$constant, ModifierFlagsDefault$constant, ModifierFlagsExport$constant, ModifierFlagsIn$constant, ModifierFlagsNone$constant, ModifierFlagsOut$constant, ModifierFlagsOverride$constant, ModifierFlagsParameterPropertyModifier$constant, ModifierFlagsPrivate$constant, ModifierFlagsProtected$constant, ModifierFlagsPublic$constant, ModifierFlagsReadonly$constant, ModifierFlagsStatic$constant } from "./modifierflags.js";
import { NodeFlagsAwaitUsing$constant, NodeFlagsBlockScoped$constant, NodeFlagsConst$constant, NodeFlagsContainsThis$constant, NodeFlagsJSDoc$constant, NodeFlagsJavaScriptFile$constant, NodeFlagsJsonFile$constant, NodeFlagsLet$constant, NodeFlagsOptionalChain$constant, NodeFlagsPossiblyContainsDeprecatedTag$constant, NodeFlagsReparsed$constant, NodeFlagsSynthesized$constant, NodeFlagsUsing$constant } from "./nodeflags.js";
import { SubtreeContainsESObjectRestOrSpread$constant, SubtreeContainsObjectRestOrSpread$constant } from "./subtreefacts.js";
import { InternalSymbolNameDefault$string, InternalSymbolNameMissing$string, Symbol, SymbolTable } from "./symbol.js";
import { SymbolFlagsAlias$constant, SymbolFlagsAssignment$constant } from "./symbolflags.js";
import { TokenFlagsUnterminated$constant } from "./tokenflags.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function GetNodeId(node: tsonicTypeScriptRuntime.Location<Node> | undefined): NodeId {
    let id = atomic__from_gostdlib.Uint64.Load(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).id);
    if (id === 0n) {
        id = atomic__from_gostdlib.Uint64.Add($state.nextNodeId, 1n);
        if (!atomic__from_gostdlib.Uint64.CompareAndSwap(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).id, 0n, id)) {
            id = atomic__from_gostdlib.Uint64.Load(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).id);
        }
    }
    return new NodeId(id);
}
export function GetSymbolId(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined): SymbolId {
    let id = atomic__from_gostdlib.Uint64.Load(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).id);
    if (id === 0n) {
        id = atomic__from_gostdlib.Uint64.Add($state.nextSymbolId, 1n);
        if (!atomic__from_gostdlib.Uint64.CompareAndSwap(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).id, 0n, id)) {
            id = atomic__from_gostdlib.Uint64.Load(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).id);
        }
    }
    return new SymbolId(id);
}
export function GetSymbolTable(data: tsonicTypeScriptRuntime.Location<SymbolTable> | undefined): SymbolTable {
    if (((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SymbolTable>).value.$value.isNil()) {
        void ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new SymbolTable(GoMap.make(0, [])));
    }
    return ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SymbolTable>).value;
}
export function GetMembers(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined): SymbolTable {
    const __gotots_store_6 = Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value);
    const __gotots_argument_13 = tsonicTypeScriptRuntime.projectLocation<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>, SymbolTable>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Members"), ($go$storage: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>): SymbolTable => {
        return new SymbolTable($go$storage);
    }, ($go$value: SymbolTable): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined> => {
        return $go$value.$value;
    });
    return GetSymbolTable(__gotots_argument_13);
}
export function GetExports(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined): SymbolTable {
    const __gotots_store_4 = Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value);
    const __gotots_argument_11 = tsonicTypeScriptRuntime.projectLocation<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>, SymbolTable>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Exports"), ($go$storage: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>): SymbolTable => {
        return new SymbolTable($go$storage);
    }, ($go$value: SymbolTable): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined> => {
        return $go$value.$value;
    });
    return GetSymbolTable(__gotots_argument_11);
}
export function GetLocals(container: tsonicTypeScriptRuntime.Location<Node> | undefined): SymbolTable {
    const __gotots_store_5 = LocalsContainerBase.$storageOf(((Node.LocalsContainerData(container) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LocalsContainerBase>).value);
    const __gotots_argument_12 = tsonicTypeScriptRuntime.projectLocation<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>, SymbolTable>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Locals"), ($go$storage: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>): SymbolTable => {
        return new SymbolTable($go$storage);
    }, ($go$value: SymbolTable): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined> => {
        return $go$value.$value;
    });
    return GetSymbolTable(__gotots_argument_12);
}
export function NodeIsMissing(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return node === undefined || TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).Pos() === TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).End() && TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).Pos() >= 0 && !(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEndOfFile$constant());
}
export function NodeIsPresent(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !NodeIsMissing(node);
}
export function NodeIsSynthesized(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return PositionIsSynthesized(TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).Pos()) || PositionIsSynthesized(TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).End());
}
export function RangeIsSynthesized(loc: TextRange__from_core): bool {
    return PositionIsSynthesized(loc.Pos()) || PositionIsSynthesized(loc.End());
}
export function PositionIsSynthesized(pos: int): bool {
    return pos < 0;
}
export function NodeKindIs(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kinds: RuntimeSlice<Kind>): bool {
    return Contains$SliceOf_Named_ast$Kind$Named_ast$Kind(kinds, Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsModifierKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsModifierLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsModifier(node) || IsDecorator(node);
}
export function IsCompoundAssignment(token: Kind): bool {
    return token >= KindFirstCompoundAssignment$constant() && token <= KindLastCompoundAssignment$constant();
}
export function IsAssignmentExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, excludeCompoundAssignment: bool): bool {
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBinaryExpression$constant()) {
        let expr: tsonicTypeScriptRuntime.Location<BinaryExpression> | undefined = Node.AsBinaryExpression(node);
        return (Node.$storageOf(((BinaryExpression.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEqualsToken$constant() || !excludeCompoundAssignment && IsAssignmentOperator(Node.$storageOf(((BinaryExpression.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)) && IsLeftHandSideExpression(BinaryExpression.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left);
    }
    return false;
}
export function GetRightMostAssignedExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; IsAssignmentExpression(node, false);) {
        node = BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Right;
    }
    return node;
}
export function IsDestructuringAssignment(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (IsAssignmentExpression(node, true)) {
        let kind = Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
        return kind === KindObjectLiteralExpression$constant() || kind === KindArrayLiteralExpression$constant();
    }
    return false;
}
export function IsObjectBindingOrAssignmentElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBindingElement$constant():
        case KindPropertyAssignment$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindSpreadAssignment$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsArrayBindingOrAssignmentElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBindingElement$constant():
        case KindOmittedExpression$constant():
        case KindSpreadElement$constant():
        case KindArrayLiteralExpression$constant():
        case KindObjectLiteralExpression$constant():
        case KindIdentifier$constant():
        case KindPropertyAccessExpression$constant():
        case KindElementAccessExpression$constant(): {
            return true;
            break;
        }
    }
    return IsAssignmentExpression(node, true);
}
export function IsBindingPattern(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindObjectBindingPattern$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindArrayBindingPattern$constant();
}
export function IsForInOrOfStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindForInStatement$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindForOfStatement$constant());
}
export function IsAssignmentTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(GetAssignmentTarget(node) === undefined);
}
export function GetAssignmentTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (;;) {
        let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindBinaryExpression$constant(): {
                if (IsAssignmentOperator(Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) &&
                    tsonicTypeScriptRuntime.sameLocation(BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left, node)) {
                    return parent;
                }
                return void 0;
                break;
            }
            case KindPrefixUnaryExpression$constant(): {
                if (PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindPlusPlusToken$constant() || PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindMinusMinusToken$constant()) {
                    return parent;
                }
                return void 0;
                break;
            }
            case KindPostfixUnaryExpression$constant(): {
                if ((Node.AsPostfixUnaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator === KindPlusPlusToken$constant() || (Node.AsPostfixUnaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator === KindMinusMinusToken$constant()) {
                    return parent;
                }
                return void 0;
                break;
            }
            case KindForInStatement$constant():
            case KindForOfStatement$constant(): {
                if (tsonicTypeScriptRuntime.sameLocation(Node.Initializer(parent), node)) {
                    return parent;
                }
                return void 0;
                break;
            }
            case KindParenthesizedExpression$constant():
            case KindArrayLiteralExpression$constant():
            case KindSpreadElement$constant():
            case KindNonNullExpression$constant(): {
                node = parent;
                break;
            }
            case KindSpreadAssignment$constant(): {
                node = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                break;
            }
            case KindShorthandPropertyAssignment$constant(): {
                if (!tsonicTypeScriptRuntime.sameLocation(ShorthandPropertyAssignment.Name(Node.AsShorthandPropertyAssignment(parent)), node)) {
                    return void 0;
                }
                node = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                break;
            }
            case KindPropertyAssignment$constant(): {
                if (tsonicTypeScriptRuntime.sameLocation(PropertyAssignment.Name(Node.AsPropertyAssignment(parent)), node)) {
                    return void 0;
                }
                node = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                break;
            }
            default: {
                return void 0;
                break;
            }
        }
    }
}
export function IsLogicalBinaryOperator(token: Kind): bool {
    return token === KindBarBarToken$constant() || token === KindAmpersandAmpersandToken$constant();
}
export function IsLogicalOrCoalescingBinaryOperator(token: Kind): bool {
    return IsLogicalBinaryOperator(token) || token === KindQuestionQuestionToken$constant();
}
export function IsLogicalOrCoalescingBinaryExpression(expr: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsBinaryExpression(expr) && IsLogicalOrCoalescingBinaryOperator(Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsLogicalOrCoalescingAssignmentExpression(expr: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsBinaryExpression(expr) && IsLogicalOrCoalescingAssignmentOperator(Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsLogicalExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    for (;;) {
        if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindParenthesizedExpression$constant()) {
            node = Node.Expression(node);
        }
        else if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPrefixUnaryExpression$constant() && PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindExclamationToken$constant()) {
            node = PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operand;
        }
        else {
            return IsLogicalOrCoalescingBinaryExpression(node);
        }
    }
}
export function IsAccessor(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindGetAccessor$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSetAccessor$constant();
}
export function IsPropertyNameLiteral(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant():
        case KindStringLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant():
        case KindNumericLiteral$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsMemberName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPrivateIdentifier$constant();
}
export function IsEntityName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQualifiedName$constant();
}
export function IsPropertyName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant():
        case KindPrivateIdentifier$constant():
        case KindStringLiteral$constant():
        case KindNumericLiteral$constant():
        case KindComputedPropertyName$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsIdentifierName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindPropertyDeclaration$constant():
        case KindPropertySignature$constant():
        case KindMethodDeclaration$constant():
        case KindMethodSignature$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindEnumMember$constant():
        case KindPropertyAssignment$constant():
        case KindPropertyAccessExpression$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.Name(parent), node);
            break;
        }
        case KindQualifiedName$constant(): {
            return tsonicTypeScriptRuntime.sameLocation((Node.AsQualifiedName(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, node);
            break;
        }
        case KindBindingElement$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.PropertyName(parent), node);
            break;
        }
        case KindImportSpecifier$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.PropertyName(parent), node);
            break;
        }
        case KindExportSpecifier$constant():
        case KindJsxAttribute$constant():
        case KindJsxSelfClosingElement$constant():
        case KindJsxOpeningElement$constant():
        case KindJsxClosingElement$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsPushOrUnshiftIdentifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let text = Node.Text(node);
    return text === "push" || text === "unshift";
}
export function IsBooleanLiteral(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTrueKeyword$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindFalseKeyword$constant();
}
export function IsLiteralExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsLiteralKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsStringLiteralLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindStringLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsStringOrNumericLiteralLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsStringLiteralLike(node) || IsNumericLiteral(node);
}
export function IsSignedNumericLiteral(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPrefixUnaryExpression$constant()) {
        let node__shadow_1: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression> | undefined = Node.AsPrefixUnaryExpression(node);
        return (PrefixUnaryExpression.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindPlusToken$constant() || PrefixUnaryExpression.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindMinusToken$constant()) && IsNumericLiteral(PrefixUnaryExpression.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operand);
    }
    return false;
}
export function IsOptionalChain(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsOptionalChain$constant()) >>> 0 === 0)) {
        switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindPropertyAccessExpression$constant():
            case KindElementAccessExpression$constant():
            case KindCallExpression$constant():
            case KindNonNullExpression$constant(): {
                return true;
                break;
            }
        }
    }
    return false;
}
export function getQuestionDotToken(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return Node.QuestionDotToken(node);
}
export function IsOptionalChainRoot(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsOptionalChain(node) && !IsNonNullExpression(node) && !(getQuestionDotToken(node) === undefined);
}
export function IsOutermostOptionalChain(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    return !IsOptionalChain(parent) || IsOptionalChainRoot(parent) || !tsonicTypeScriptRuntime.sameLocation(node, Node.Expression(parent));
}
export function IsExpressionOfOptionalChainRoot(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsOptionalChainRoot(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node.Expression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), node);
}
export function IsNullishCoalesce(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBinaryExpression$constant() && Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQuestionQuestionToken$constant();
}
export function IsAssertionExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let kind = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
    return kind === KindTypeAssertionExpression$constant() || kind === KindAsExpression$constant();
}
export function isLeftHandSideExpressionKind(kind: Kind): bool {
    switch (kind) {
        case KindPropertyAccessExpression$constant():
        case KindElementAccessExpression$constant():
        case KindNewExpression$constant():
        case KindCallExpression$constant():
        case KindJsxElement$constant():
        case KindJsxSelfClosingElement$constant():
        case KindJsxFragment$constant():
        case KindTaggedTemplateExpression$constant():
        case KindArrayLiteralExpression$constant():
        case KindParenthesizedExpression$constant():
        case KindObjectLiteralExpression$constant():
        case KindClassExpression$constant():
        case KindFunctionExpression$constant():
        case KindIdentifier$constant():
        case KindPrivateIdentifier$constant():
        case KindRegularExpressionLiteral$constant():
        case KindNumericLiteral$constant():
        case KindBigIntLiteral$constant():
        case KindStringLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant():
        case KindTemplateExpression$constant():
        case KindFalseKeyword$constant():
        case KindNullKeyword$constant():
        case KindThisKeyword$constant():
        case KindTrueKeyword$constant():
        case KindSuperKeyword$constant():
        case KindNonNullExpression$constant():
        case KindExpressionWithTypeArguments$constant():
        case KindMetaProperty$constant():
        case KindImportKeyword$constant():
        case KindMissingDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsLeftHandSideExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return isLeftHandSideExpressionKind(Node.$storageOf(((SkipPartiallyEmittedExpressions(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function isUnaryExpressionKind(kind: Kind): bool {
    switch (kind) {
        case KindPrefixUnaryExpression$constant():
        case KindPostfixUnaryExpression$constant():
        case KindDeleteExpression$constant():
        case KindTypeOfExpression$constant():
        case KindVoidExpression$constant():
        case KindAwaitExpression$constant():
        case KindTypeAssertionExpression$constant(): {
            return true;
            break;
        }
    }
    return isLeftHandSideExpressionKind(kind);
}
export function isExpressionKind(kind: Kind): bool {
    switch (kind) {
        case KindConditionalExpression$constant():
        case KindYieldExpression$constant():
        case KindArrowFunction$constant():
        case KindBinaryExpression$constant():
        case KindSpreadElement$constant():
        case KindAsExpression$constant():
        case KindOmittedExpression$constant():
        case KindPartiallyEmittedExpression$constant():
        case KindSatisfiesExpression$constant(): {
            return true;
            break;
        }
    }
    return isUnaryExpressionKind(kind);
}
export function IsExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return isExpressionKind(Node.$storageOf(((SkipPartiallyEmittedExpressions(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsCommaExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBinaryExpression$constant() && Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindCommaToken$constant();
}
export function IsCommaSequence(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsCommaExpression(node);
}
export function IsIterationStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined, lookInLabeledStatements: bool): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindForStatement$constant():
        case KindForInStatement$constant():
        case KindForOfStatement$constant():
        case KindDoStatement$constant():
        case KindWhileStatement$constant(): {
            return true;
            break;
        }
        case KindLabeledStatement$constant(): {
            return lookInLabeledStatements && IsIterationStatement(Node.Statement(node), lookInLabeledStatements);
            break;
        }
    }
    return false;
}
export function IsAccessExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyAccessExpression$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindElementAccessExpression$constant();
}
export function isFunctionLikeDeclarationKind(kind: Kind): bool {
    switch (kind) {
        case KindFunctionDeclaration$constant():
        case KindMethodDeclaration$constant():
        case KindConstructor$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindFunctionExpression$constant():
        case KindArrowFunction$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsFunctionLikeDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && isFunctionLikeDeclarationKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsFunctionLikeKind(kind: Kind): bool {
    switch (kind) {
        case KindMethodSignature$constant():
        case KindCallSignature$constant():
        case KindJSDocSignature$constant():
        case KindConstructSignature$constant():
        case KindIndexSignature$constant():
        case KindFunctionType$constant():
        case KindConstructorType$constant(): {
            return true;
            break;
        }
    }
    return isFunctionLikeDeclarationKind(kind);
}
export function IsFunctionLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && IsFunctionLikeKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsFunctionLikeOrClassStaticBlockDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && (IsFunctionLike(node) || IsClassStaticBlockDeclaration(node));
}
export function IsFunctionOrSourceFile(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsFunctionLike(node) || IsSourceFile(node);
}
export function IsClassLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindClassDeclaration$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindClassExpression$constant();
}
export function IsClassOrInterfaceLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindClassDeclaration$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindClassExpression$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindInterfaceDeclaration$constant();
}
export function IsClassElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindConstructor$constant():
        case KindPropertyDeclaration$constant():
        case KindMethodDeclaration$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindIndexSignature$constant():
        case KindClassStaticBlockDeclaration$constant():
        case KindSemicolonClassElement$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsMethodOrAccessor(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindMethodDeclaration$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsPrivateIdentifierClassElementDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (IsPropertyDeclaration(node) || IsMethodOrAccessor(node)) && IsPrivateIdentifier(Node.Name(node));
}
export function IsObjectLiteralOrClassExpressionMethodOrAccessor(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let kind = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
    return (kind === KindMethodDeclaration$constant() || kind === KindGetAccessor$constant() || kind === KindSetAccessor$constant()) && (Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindObjectLiteralExpression$constant() || Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindClassExpression$constant());
}
export function IsTypeElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindConstructSignature$constant():
        case KindCallSignature$constant():
        case KindPropertySignature$constant():
        case KindMethodSignature$constant():
        case KindIndexSignature$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindNotEmittedTypeElement$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsObjectLiteralElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindPropertyAssignment$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindSpreadAssignment$constant():
        case KindMethodDeclaration$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsObjectLiteralMethod(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindMethodDeclaration$constant() && Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindObjectLiteralExpression$constant();
}
export function IsAutoAccessorPropertyDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsPropertyDeclaration(node) && HasAccessorModifier(node);
}
export function IsParameterPropertyDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined, parent: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsParameterDeclaration(node) && HasSyntacticModifier(node, ModifierFlagsParameterPropertyModifier$constant()) && Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindConstructor$constant();
}
export function IsJsxChild(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindJsxElement$constant():
        case KindJsxExpression$constant():
        case KindJsxSelfClosingElement$constant():
        case KindJsxText$constant():
        case KindJsxFragment$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsJsxAttributeLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsJsxAttribute(node) || IsJsxSpreadAttribute(node);
}
export function isDeclarationStatementKind(kind: Kind): bool {
    switch (kind) {
        case KindFunctionDeclaration$constant():
        case KindMissingDeclaration$constant():
        case KindClassDeclaration$constant():
        case KindInterfaceDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindEnumDeclaration$constant():
        case KindModuleDeclaration$constant():
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindImportEqualsDeclaration$constant():
        case KindExportDeclaration$constant():
        case KindExportAssignment$constant():
        case KindNamespaceExportDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsDeclarationStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return isDeclarationStatementKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function isStatementKindButNotDeclarationKind(kind: Kind): bool {
    switch (kind) {
        case KindBreakStatement$constant():
        case KindContinueStatement$constant():
        case KindDebuggerStatement$constant():
        case KindDoStatement$constant():
        case KindExpressionStatement$constant():
        case KindEmptyStatement$constant():
        case KindForInStatement$constant():
        case KindForOfStatement$constant():
        case KindForStatement$constant():
        case KindIfStatement$constant():
        case KindLabeledStatement$constant():
        case KindReturnStatement$constant():
        case KindSwitchStatement$constant():
        case KindThrowStatement$constant():
        case KindTryStatement$constant():
        case KindVariableStatement$constant():
        case KindWhileStatement$constant():
        case KindWithStatement$constant():
        case KindNotEmittedStatement$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsStatementButNotDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return isStatementKindButNotDeclarationKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let kind = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
    return isStatementKindButNotDeclarationKind(kind) || isDeclarationStatementKind(kind) || isBlockStatement(node);
}
export function isBlockStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBlock$constant())) {
        return false;
    }
    if (!(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) && (Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTryStatement$constant() || Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindCatchClause$constant())) {
        return false;
    }
    return !IsFunctionBlock(node);
}
export function IsFunctionBlock(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBlock$constant() && !(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) && IsFunctionLike(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
}
export function IsBlockOrCatchScoped(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !((GetCombinedNodeFlags(declaration) & NodeFlagsBlockScoped$constant()) >>> 0 === 0) || IsCatchClauseVariableDeclarationOrBindingElement(declaration);
}
export function IsCatchClauseVariableDeclarationOrBindingElement(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let node: tsonicTypeScriptRuntime.Location<Node> | undefined = GetRootDeclaration(declaration);
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableDeclaration$constant() && Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindCatchClause$constant();
}
export function IsTypeNodeKind(kind: Kind): bool {
    switch (kind) {
        case KindAnyKeyword$constant():
        case KindUnknownKeyword$constant():
        case KindNumberKeyword$constant():
        case KindBigIntKeyword$constant():
        case KindObjectKeyword$constant():
        case KindBooleanKeyword$constant():
        case KindStringKeyword$constant():
        case KindSymbolKeyword$constant():
        case KindVoidKeyword$constant():
        case KindUndefinedKeyword$constant():
        case KindNeverKeyword$constant():
        case KindIntrinsicKeyword$constant():
        case KindExpressionWithTypeArguments$constant():
        case KindJSDocAllType$constant():
        case KindJSDocNullableType$constant():
        case KindJSDocNonNullableType$constant():
        case KindJSDocOptionalType$constant():
        case KindJSDocVariadicType$constant(): {
            return true;
            break;
        }
    }
    return kind >= KindFirstTypeNode$constant() && kind <= KindLastTypeNode$constant();
}
export function IsTypeNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsTypeNodeKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsJSDocKind(kind: Kind): bool {
    return KindFirstJSDocNode$constant() <= kind && kind <= KindLastJSDocNode$constant();
}
export function IsJSDocTypeAssertion(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (node === undefined || !IsParenthesizedExpression(node) || !IsInJSFile(node)) {
        return false;
    }
    let expr: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Expression(node);
    return IsAsExpression(expr) && !(Node.Type(expr) === undefined) && !((Node.$storageOf(((Node.Type(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsReparsed$constant()) >>> 0 === 0);
}
export function IsPrologueDirective(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExpressionStatement$constant() && Node.$storageOf(((Node.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindStringLiteral$constant();
}
export type OuterExpressionKinds = int16;
export function OEKParentheses$constant(): OuterExpressionKinds {
    return 1;
}
export function OEKTypeAssertions$constant(): OuterExpressionKinds {
    return 2;
}
export function OEKNonNullAssertions$constant(): OuterExpressionKinds {
    return 4;
}
export function OEKPartiallyEmittedExpressions$constant(): OuterExpressionKinds {
    return 8;
}
export function OEKExpressionsWithTypeArguments$constant(): OuterExpressionKinds {
    return 16;
}
export const OEKExcludeJSDocTypeAssertion$int16: int16 = 64;
export function OEKAll$constant(): OuterExpressionKinds {
    return 63;
}
export function IsOuterExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kinds: OuterExpressionKinds): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindParenthesizedExpression$constant(): {
            return !((kinds & OEKParentheses$constant()) === 0) && !(!((kinds & OEKExcludeJSDocTypeAssertion$int16) === 0) && IsJSDocTypeAssertion(node));
            break;
        }
        case KindTypeAssertionExpression$constant():
        case KindAsExpression$constant(): {
            return !((kinds & OEKTypeAssertions$constant()) === 0);
            break;
        }
        case KindSatisfiesExpression$constant(): {
            return !((kinds & (48)) === 0);
            break;
        }
        case KindExpressionWithTypeArguments$constant(): {
            return !((kinds & OEKExpressionsWithTypeArguments$constant()) === 0);
            break;
        }
        case KindNonNullExpression$constant(): {
            return !((kinds & OEKNonNullAssertions$constant()) === 0);
            break;
        }
        case KindPartiallyEmittedExpression$constant(): {
            return !((kinds & OEKPartiallyEmittedExpressions$constant()) === 0);
            break;
        }
    }
    return false;
}
export function SkipOuterExpressions(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kinds: OuterExpressionKinds): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; IsOuterExpression(node, kinds);) {
        node = Node.Expression(node);
    }
    return node;
}
export function SkipParentheses(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return SkipOuterExpressions(node, OEKParentheses$constant());
}
export function SkipTypeParentheses(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; IsParenthesizedTypeNode(node);) {
        node = Node.Type(node);
    }
    return node;
}
export function SkipPartiallyEmittedExpressions(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return SkipOuterExpressions(node, OEKPartiallyEmittedExpressions$constant());
}
export function WalkUpParenthesizedExpressions(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; !(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindParenthesizedExpression$constant();) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return node;
}
export function WalkUpParenthesizedTypes(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; !(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindParenthesizedType$constant();) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return node;
}
export function GetSourceFileOfNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<SourceFile> | undefined {
    for (; !(node === undefined);) {
        if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSourceFile$constant()) {
            return Node.AsSourceFile(node);
        }
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return void 0;
}
export function newParentInChildrenSetter(): (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined {
    let state = $goStruct$Struct_Field_ast_u24_parent_PointerTo_Named_ast$Node_Tag__empty__Field_ast_u24_visit_PointerTo_Named_ast$Node_to_bool_Tag__empty_.$zero();
    state.visit = (node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        if (!(state.parent === undefined)) {
            Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent = state.parent;
        }
        let saveParent: tsonicTypeScriptRuntime.Location<Node> | undefined = state.parent;
        state.parent = node;
        Node.ForEachChild(node, new Visitor(state.visit));
        state.parent = saveParent;
        return false;
    };
    return state.visit;
}
export function SetParentInChildren(node: tsonicTypeScriptRuntime.Location<Node> | undefined): void {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                let fn: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined = (($value: GoInterface | undefined): (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_ast$Node_to_bool.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(sync__from_gostdlib.Pool.Get($state.setParentInChildrenPool));
                const __gotots_receiver_0 = $state.setParentInChildrenPool;
                const __gotots_argument_10 = new $goInterfaceAdapter$PointerTo_Named_ast$Node_to_bool(fn);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    recovery_sync.SyncPoolPut(__gotots_receiver_0, __gotots_argument_10, $go$recovery);
                };
                const __gotots_callee_3 = fn;
                const __gotots_argument_11 = node;
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
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
export function SetImportsOfSourceFile(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, imports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>): void {
    ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.imports = imports;
}
export function FindAncestor(node: tsonicTypeScriptRuntime.Location<Node> | undefined, callback: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; !(node === undefined);) {
        const __gotots_callee_4 = callback;
        const __gotots_argument_14 = node;
        if ((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14)) {
            return node;
        }
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return void 0;
}
export function FindAncestorKind(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kind: Kind): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; !(node === undefined);) {
        if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === kind) {
            return node;
        }
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return void 0;
}
export type FindAncestorResult = int32;
export function FindAncestorFalse$constant(): FindAncestorResult {
    return 0;
}
export function FindAncestorTrue$constant(): FindAncestorResult {
    return 1;
}
export function FindAncestorQuit$constant(): FindAncestorResult {
    return 2;
}
export function ToFindAncestorResult(b: bool): FindAncestorResult {
    if (b) {
        return FindAncestorTrue$constant();
    }
    return FindAncestorFalse$constant();
}
export function FindAncestorOrQuit(node: tsonicTypeScriptRuntime.Location<Node> | undefined, callback: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => FindAncestorResult) | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; !(node === undefined);) {
        const __gotots_callee_8 = callback;
        const __gotots_argument_26 = node;
        switch ((__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26)) {
            case FindAncestorQuit$constant(): {
                return void 0;
                break;
            }
            case FindAncestorTrue$constant(): {
                return node;
                break;
            }
        }
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return void 0;
}
export function IsNodeDescendantOf(node: tsonicTypeScriptRuntime.Location<Node> | undefined, ancestor: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    for (; !(node === undefined);) {
        if (tsonicTypeScriptRuntime.sameLocation(node, ancestor)) {
            return true;
        }
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return false;
}
export function ModifierToFlag(token: Kind): ModifierFlags {
    switch (token) {
        case KindStaticKeyword$constant(): {
            return ModifierFlagsStatic$constant();
            break;
        }
        case KindPublicKeyword$constant(): {
            return ModifierFlagsPublic$constant();
            break;
        }
        case KindProtectedKeyword$constant(): {
            return ModifierFlagsProtected$constant();
            break;
        }
        case KindPrivateKeyword$constant(): {
            return ModifierFlagsPrivate$constant();
            break;
        }
        case KindAbstractKeyword$constant(): {
            return ModifierFlagsAbstract$constant();
            break;
        }
        case KindAccessorKeyword$constant(): {
            return ModifierFlagsAccessor$constant();
            break;
        }
        case KindExportKeyword$constant(): {
            return ModifierFlagsExport$constant();
            break;
        }
        case KindDeclareKeyword$constant(): {
            return ModifierFlagsAmbient$constant();
            break;
        }
        case KindConstKeyword$constant(): {
            return ModifierFlagsConst$constant();
            break;
        }
        case KindDefaultKeyword$constant(): {
            return ModifierFlagsDefault$constant();
            break;
        }
        case KindAsyncKeyword$constant(): {
            return ModifierFlagsAsync$constant();
            break;
        }
        case KindReadonlyKeyword$constant(): {
            return ModifierFlagsReadonly$constant();
            break;
        }
        case KindOverrideKeyword$constant(): {
            return ModifierFlagsOverride$constant();
            break;
        }
        case KindInKeyword$constant(): {
            return ModifierFlagsIn$constant();
            break;
        }
        case KindOutKeyword$constant(): {
            return ModifierFlagsOut$constant();
            break;
        }
        case KindDecorator$constant(): {
            return ModifierFlagsDecorator$constant();
            break;
        }
    }
    return ModifierFlagsNone$constant();
}
export function ModifiersToFlags(modifiers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>): ModifierFlags {
    let flags = 0;
    const __gotots_range_1 = modifiers;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let modifier: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_1;
        flags = (flags | ModifierToFlag(Node.$storageOf(((modifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)) >>> 0;
    }
    return flags;
}
export function HasSyntacticModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined, flags: ModifierFlags): bool {
    return !((Node.ModifierFlags(node) & flags) >>> 0 === 0);
}
export function HasAccessorModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasSyntacticModifier(node, ModifierFlagsAccessor$constant());
}
export function HasStaticModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasSyntacticModifier(node, ModifierFlagsStatic$constant());
}
export function IsStatic(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsClassElement(node) && HasStaticModifier(node) || IsClassStaticBlockDeclaration(node);
}
export function CanHaveSymbol(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindArrowFunction$constant():
        case KindBinaryExpression$constant():
        case KindBindingElement$constant():
        case KindCallExpression$constant():
        case KindCallSignature$constant():
        case KindClassDeclaration$constant():
        case KindClassExpression$constant():
        case KindClassStaticBlockDeclaration$constant():
        case KindConstructor$constant():
        case KindConstructorType$constant():
        case KindConstructSignature$constant():
        case KindElementAccessExpression$constant():
        case KindEnumDeclaration$constant():
        case KindEnumMember$constant():
        case KindExportAssignment$constant():
        case KindExportDeclaration$constant():
        case KindExportSpecifier$constant():
        case KindFunctionDeclaration$constant():
        case KindFunctionExpression$constant():
        case KindFunctionType$constant():
        case KindGetAccessor$constant():
        case KindImportClause$constant():
        case KindImportEqualsDeclaration$constant():
        case KindImportSpecifier$constant():
        case KindIndexSignature$constant():
        case KindInterfaceDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindJsxAttribute$constant():
        case KindJsxAttributes$constant():
        case KindJsxSpreadAttribute$constant():
        case KindMappedType$constant():
        case KindMethodDeclaration$constant():
        case KindMethodSignature$constant():
        case KindModuleDeclaration$constant():
        case KindNamedTupleMember$constant():
        case KindNamespaceExport$constant():
        case KindNamespaceExportDeclaration$constant():
        case KindNamespaceImport$constant():
        case KindNewExpression$constant():
        case KindNoSubstitutionTemplateLiteral$constant():
        case KindNumericLiteral$constant():
        case KindObjectLiteralExpression$constant():
        case KindParameter$constant():
        case KindPropertyAccessExpression$constant():
        case KindPropertyAssignment$constant():
        case KindPropertyDeclaration$constant():
        case KindPropertySignature$constant():
        case KindSetAccessor$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindSourceFile$constant():
        case KindSpreadAssignment$constant():
        case KindStringLiteral$constant():
        case KindTypeAliasDeclaration$constant():
        case KindTypeLiteral$constant():
        case KindTypeParameter$constant():
        case KindVariableDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function CanHaveIllegalDecorators(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindPropertyAssignment$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindFunctionDeclaration$constant():
        case KindConstructor$constant():
        case KindIndexSignature$constant():
        case KindClassStaticBlockDeclaration$constant():
        case KindMissingDeclaration$constant():
        case KindVariableStatement$constant():
        case KindInterfaceDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindEnumDeclaration$constant():
        case KindModuleDeclaration$constant():
        case KindImportEqualsDeclaration$constant():
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindNamespaceExportDeclaration$constant():
        case KindExportDeclaration$constant():
        case KindExportAssignment$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function CanHaveIllegalModifiers(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindClassStaticBlockDeclaration$constant():
        case KindPropertyAssignment$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindMissingDeclaration$constant():
        case KindNamespaceExportDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function CanHaveModifiers(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindTypeParameter$constant():
        case KindParameter$constant():
        case KindPropertySignature$constant():
        case KindPropertyDeclaration$constant():
        case KindMethodSignature$constant():
        case KindMethodDeclaration$constant():
        case KindConstructor$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindIndexSignature$constant():
        case KindConstructorType$constant():
        case KindFunctionExpression$constant():
        case KindArrowFunction$constant():
        case KindClassExpression$constant():
        case KindVariableStatement$constant():
        case KindFunctionDeclaration$constant():
        case KindClassDeclaration$constant():
        case KindInterfaceDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindEnumDeclaration$constant():
        case KindModuleDeclaration$constant():
        case KindImportEqualsDeclaration$constant():
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindExportAssignment$constant():
        case KindExportDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function CanHaveDecorators(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindParameter$constant():
        case KindPropertyDeclaration$constant():
        case KindMethodDeclaration$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindClassExpression$constant():
        case KindClassDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsFunctionOrModuleBlock(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsSourceFile(node) || IsModuleBlock(node) || IsBlock(node) && IsFunctionLike(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
}
export function IsFunctionExpressionOrArrowFunction(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsFunctionExpression(node) || IsArrowFunction(node);
}
export function ForEachReturnStatement(body: tsonicTypeScriptRuntime.Location<Node> | undefined, visitor: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): bool {
    let traverse: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined;
    traverse = (node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindReturnStatement$constant(): {
                const __gotots_callee_10 = visitor;
                const __gotots_argument_32 = node;
                return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32);
                break;
            }
            case KindCaseBlock$constant():
            case KindBlock$constant():
            case KindIfStatement$constant():
            case KindDoStatement$constant():
            case KindWhileStatement$constant():
            case KindForStatement$constant():
            case KindForInStatement$constant():
            case KindForOfStatement$constant():
            case KindWithStatement$constant():
            case KindSwitchStatement$constant():
            case KindCaseClause$constant():
            case KindDefaultClause$constant():
            case KindLabeledStatement$constant():
            case KindTryStatement$constant():
            case KindCatchClause$constant(): {
                return Node.ForEachChild(node, new Visitor(traverse));
                break;
            }
        }
        return false;
    };
    const __gotots_callee_11 = traverse;
    const __gotots_argument_33 = body;
    return (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33);
}
export function GetRootDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBindingElement$constant();) {
        node = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return node;
}
export function getCombinedFlags$kernel<T>($go$binary_or$T0_T0_to_T0: ($0: T, $1: T) => T, node: tsonicTypeScriptRuntime.Location<Node> | undefined, getFlags: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => T) | undefined): T {
    node = GetRootDeclaration(node);
    const __gotots_callee_5 = getFlags;
    const __gotots_argument_18 = node;
    const __gotots_argument_19 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
    let flags: T = __gotots_argument_19;
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableDeclaration$constant()) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    if (!(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableDeclarationList$constant()) {
        const __gotots_argument_21 = flags;
        const __gotots_callee_6 = getFlags;
        const __gotots_argument_20 = node;
        const __gotots_argument_22 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
        flags = $go$binary_or$T0_T0_to_T0(__gotots_argument_21, __gotots_argument_22);
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    if (!(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableStatement$constant()) {
        const __gotots_argument_24 = flags;
        const __gotots_callee_7 = getFlags;
        const __gotots_argument_23 = node;
        const __gotots_argument_25 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
        flags = $go$binary_or$T0_T0_to_T0(__gotots_argument_24, __gotots_argument_25);
    }
    return flags;
}
export function GetCombinedModifierFlags(node: tsonicTypeScriptRuntime.Location<Node> | undefined): ModifierFlags {
    return getCombinedFlags$Named_ast$ModifierFlags(node, ($argument0: tsonicTypeScriptRuntime.Location<Node> | undefined): ModifierFlags => {
        return Node.ModifierFlags($argument0);
    });
}
export function GetCombinedNodeFlags(node: tsonicTypeScriptRuntime.Location<Node> | undefined): NodeFlags {
    return getCombinedFlags$Named_ast$NodeFlags(node, getNodeFlags);
}
export function getNodeFlags(node: tsonicTypeScriptRuntime.Location<Node> | undefined): NodeFlags {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags;
}
export function IsVarAwaitUsing(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (GetCombinedNodeFlags(node) & NodeFlagsBlockScoped$constant()) >>> 0 === NodeFlagsAwaitUsing$constant();
}
export function IsVarUsing(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (GetCombinedNodeFlags(node) & NodeFlagsBlockScoped$constant()) >>> 0 === NodeFlagsUsing$constant();
}
export function GetJSDocDeprecatedTag(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_range_7 = Node.JSDoc(node, void 0);
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
        let jsdoc: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_7;
        let tags: tsonicTypeScriptRuntime.Location<NodeList> | undefined = JSDoc.$storageOf(((Node.AsJSDoc(jsdoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc>).value).Tags;
        if (!(tags === undefined)) {
            const __gotots_range_8 = NodeList.$storageOf(((tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
                let tag: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_8;
                if (IsJSDocDeprecatedTag(tag)) {
                    return tag;
                }
            }
        }
    }
    return void 0;
}
export function IsDeprecatedDeclaration(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsDeprecatedDeclarationWithCachedFlags(declaration, GetCombinedNodeFlags(declaration));
}
export function IsDeprecatedDeclarationWithCachedFlags(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined, combinedFlags: NodeFlags): bool {
    if ((combinedFlags & NodeFlagsPossiblyContainsDeprecatedTag$constant()) >>> 0 === 0) {
        return false;
    }
    for (let n: tsonicTypeScriptRuntime.Location<Node> | undefined = declaration; !(n === undefined); n = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) {
        if (!((Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsPossiblyContainsDeprecatedTag$constant()) >>> 0 === 0)) {
            return !(GetJSDocDeprecatedTag(n) === undefined);
        }
    }
    return false;
}
export function IsVarConst(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (GetCombinedNodeFlags(node) & NodeFlagsBlockScoped$constant()) >>> 0 === NodeFlagsConst$constant();
}
export function IsVarConstLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch ((GetCombinedNodeFlags(node) & NodeFlagsBlockScoped$constant()) >>> 0) {
        case NodeFlagsConst$constant():
        case NodeFlagsUsing$constant():
        case NodeFlagsAwaitUsing$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsVarLet(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (GetCombinedNodeFlags(node) & NodeFlagsBlockScoped$constant()) >>> 0 === NodeFlagsLet$constant();
}
export function IsImportMeta(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindMetaProperty$constant()) {
        return (Node.AsMetaProperty(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.KeywordToken === KindImportKeyword$constant() && Node.Text(MetaProperty.Name(Node.AsMetaProperty(node))) === "meta";
    }
    return false;
}
export function WalkUpBindingElementsAndPatterns(binding: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let node: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((binding ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    for (; IsBindingElement(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);) {
        node = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
}
export function IsSourceFileJS(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): bool {
    return ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind === ScriptKindJS$constant__from_core() || ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind === ScriptKindJSX$constant__from_core();
}
export function IsInJSFile(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && !((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsJavaScriptFile$constant()) >>> 0 === 0);
}
export function IsDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeParameter$constant()) {
        return !(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined);
    }
    return IsDeclarationNode(node);
}
export function IsDeclarationName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !IsSourceFile(name) && !IsBindingPattern(name) && IsDeclaration(Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node.Name(Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), name);
}
export function IsDeclarationNameOrImportPropertyName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportSpecifier$constant():
        case KindExportSpecifier$constant(): {
            return IsIdentifier(name) || Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindStringLiteral$constant();
            break;
        }
        default: {
            return IsDeclarationName(name);
            break;
        }
    }
}
export function IsLiteralComputedPropertyDeclarationName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsStringOrNumericLiteralLike(node) && Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindComputedPropertyName$constant() && IsDeclaration(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
}
export function IsExternalModuleImportEqualsDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindImportEqualsDeclaration$constant() && Node.$storageOf((((Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExternalModuleReference$constant();
}
export function IsModuleOrEnumDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindModuleDeclaration$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEnumDeclaration$constant();
}
export function IsLiteralImportTypeNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsImportTypeNode(node) && IsLiteralTypeNode((Node.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) && IsStringLiteral(LiteralTypeNode.$storageOf(((Node.AsLiteralTypeNode((Node.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode>).value).Literal);
}
export function IsJsxTagName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindJsxOpeningElement$constant():
        case KindJsxClosingElement$constant():
        case KindJsxSelfClosingElement$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.TagName(parent), node);
            break;
        }
    }
    return false;
}
export function IsImportOrExportSpecifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsImportSpecifier(node) || IsExportSpecifier(node);
}
export function IsExportsIdentifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsIdentifier(node) && Node.Text(node) === "exports";
}
export function IsModuleIdentifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsIdentifier(node) && Node.Text(node) === "module";
}
export function IsThisIdentifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsIdentifier(node) && Node.Text(node) === "this";
}
export function IsThisParameter(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsParameterDeclaration(node) && !(Node.Name(node) === undefined) && IsThisIdentifier(Node.Name(node));
}
export function IsBindableStaticAccessExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, excludeThisKeyword: bool): bool {
    return IsPropertyAccessExpression(node) && (!excludeThisKeyword && Node.$storageOf(((Node.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindThisKeyword$constant() || IsIdentifier(Node.Name(node)) && IsBindableStaticNameExpression(Node.Expression(node), true)) || IsBindableStaticElementAccessExpression(node, excludeThisKeyword);
}
export function IsBindableStaticElementAccessExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, excludeThisKeyword: bool): bool {
    return IsLiteralLikeElementAccess(node) && ((!excludeThisKeyword && Node.$storageOf(((Node.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindThisKeyword$constant()) || IsEntityNameExpression(Node.Expression(node)) || IsBindableStaticAccessExpression(Node.Expression(node), true));
}
export function IsPrototypeAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (IsBindableStaticAccessExpression(node, false)) {
        {
            let name: tsonicTypeScriptRuntime.Location<Node> | undefined = GetElementOrPropertyAccessName(node);
            if (!(name === undefined)) {
                return Node.Text(name) === "prototype";
            }
        }
    }
    return false;
}
export function IsLiteralLikeElementAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsElementAccessExpression(node) && IsStringOrNumericLiteralLike(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression);
}
export function IsBindableStaticNameExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, excludeThisKeyword: bool): bool {
    return IsEntityNameExpression(node) || IsBindableStaticAccessExpression(node, excludeThisKeyword);
}
export function GetElementOrPropertyAccessName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindPropertyAccessExpression$constant(): {
            if (IsIdentifier(Node.Name(node))) {
                return Node.Name(node);
            }
            return void 0;
            break;
        }
        case KindElementAccessExpression$constant(): {
            {
                let arg: tsonicTypeScriptRuntime.Location<Node> | undefined = SkipParentheses(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression);
                if (IsStringOrNumericLiteralLike(arg)) {
                    return arg;
                }
            }
            return void 0;
            break;
        }
    }
    const __gotots_argument_9 = new GoInterfaceAdapter("Unhandled case in GetElementOrPropertyAccessName");
    GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function IsExpressionWithTypeArgumentsInClassExtendsClause(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(TryGetClassExtendingExpressionWithTypeArguments(node) === undefined);
}
export function TryGetClassExtendingExpressionWithTypeArguments(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_results_4 = TryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
    let cls: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_results_4[0];
    let isImplements = __gotots_results_4[1];
    if (!(cls === undefined) && !isImplements) {
        return cls;
    }
    return void 0;
}
export function TryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: tsonicTypeScriptRuntime.Location<Node> | undefined): [
    tsonicTypeScriptRuntime.Location<Node> | undefined,
    bool
] {
    let __go_class: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    let isImplements: bool = false;
    if (IsExpressionWithTypeArguments(node)) {
        if (IsHeritageClause(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) && IsClassLike(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
            return [Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, HeritageClause.$storageOf(((Node.AsHeritageClause(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause>).value).Token === KindImplementsKeyword$constant()];
        }
    }
    return [void 0, false];
}
export function GetNameOfDeclaration(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (declaration === undefined) {
        return void 0;
    }
    let nonAssignedName: tsonicTypeScriptRuntime.Location<Node> | undefined = GetNonAssignedNameOfDeclaration(declaration);
    if (!(nonAssignedName === undefined)) {
        return nonAssignedName;
    }
    if (IsFunctionExpression(declaration) || IsArrowFunction(declaration) || IsClassExpression(declaration)) {
        return GetAssignedName(declaration);
    }
    return void 0;
}
export function GetNonAssignedNameOfDeclaration(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBinaryExpression$constant():
        case KindCallExpression$constant(): {
            switch (GetAssignmentDeclarationKind(declaration).$value) {
                case 4:
                case 3:
                case 2: {
                    let left: tsonicTypeScriptRuntime.Location<Node> | undefined = BinaryExpression.$storageOf(((Node.AsBinaryExpression(declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left;
                    {
                        let name: tsonicTypeScriptRuntime.Location<Node> | undefined = GetElementOrPropertyAccessName(left);
                        if (!(name === undefined)) {
                            return name;
                        }
                    }
                    return left;
                    break;
                }
                case 5:
                case 6: {
                    return Node.Arguments(declaration).get(1);
                    break;
                }
            }
            return void 0;
            break;
        }
        case KindExportAssignment$constant(): {
            let expr: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Expression(declaration);
            if (IsIdentifier(expr)) {
                return expr;
            }
            return void 0;
            break;
        }
    }
    return Node.Name(declaration);
}
export function GetAssignedName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    if (!(parent === undefined)) {
        switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindPropertyAssignment$constant(): {
                return PropertyAssignment.Name(Node.AsPropertyAssignment(parent));
                break;
            }
            case KindBindingElement$constant(): {
                return BindingElement.Name(Node.AsBindingElement(parent));
                break;
            }
            case KindBinaryExpression$constant(): {
                if (tsonicTypeScriptRuntime.sameLocation(node, BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Right)) {
                    let left: tsonicTypeScriptRuntime.Location<Node> | undefined = BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left;
                    switch (Node.$storageOf(((left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
                        case KindIdentifier$constant(): {
                            return left;
                            break;
                        }
                        case KindPropertyAccessExpression$constant(): {
                            return PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(left));
                            break;
                        }
                        case KindElementAccessExpression$constant(): {
                            let arg: tsonicTypeScriptRuntime.Location<Node> | undefined = SkipParentheses(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression);
                            if (IsStringOrNumericLiteralLike(arg)) {
                                return arg;
                            }
                            break;
                        }
                    }
                }
                break;
            }
            case KindVariableDeclaration$constant(): {
                let name: tsonicTypeScriptRuntime.Location<Node> | undefined = VariableDeclaration.Name(Node.AsVariableDeclaration(parent));
                if (IsIdentifier(name)) {
                    return name;
                }
                break;
            }
        }
    }
    return void 0;
}
export class JSDeclarationKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function JSDeclarationKindNone$constant(): JSDeclarationKind {
    return new JSDeclarationKind(0);
}
export function JSDeclarationKindModuleExports$constant(): JSDeclarationKind {
    return new JSDeclarationKind(1);
}
export function JSDeclarationKindExportsProperty$constant(): JSDeclarationKind {
    return new JSDeclarationKind(2);
}
export function JSDeclarationKindThisProperty$constant(): JSDeclarationKind {
    return new JSDeclarationKind(3);
}
export function JSDeclarationKindProperty$constant(): JSDeclarationKind {
    return new JSDeclarationKind(4);
}
export function JSDeclarationKindObjectDefinePropertyValue$constant(): JSDeclarationKind {
    return new JSDeclarationKind(5);
}
export function JSDeclarationKindObjectDefinePropertyExports$constant(): JSDeclarationKind {
    return new JSDeclarationKind(6);
}
export function GetAssignmentDeclarationKind(node: tsonicTypeScriptRuntime.Location<Node> | undefined): JSDeclarationKind {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBinaryExpression$constant(): {
            let bin: tsonicTypeScriptRuntime.Location<BinaryExpression> | undefined = Node.AsBinaryExpression(node);
            if (Node.$storageOf(((BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEqualsToken$constant() && IsAccessExpression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left)) {
                if (IsInJSFile(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left)) {
                    if (IsModuleExportsAccessExpression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left) && !IsExportsIdentifier(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Right)) {
                        return JSDeclarationKindModuleExports$constant();
                    }
                    if ((IsModuleExportsAccessExpression(Node.Expression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left)) || IsExportsIdentifier(Node.Expression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left))) && !(GetElementOrPropertyAccessName(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left) === undefined)) {
                        return JSDeclarationKindExportsProperty$constant();
                    }
                    if (Node.$storageOf(((Node.Expression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindThisKeyword$constant()) {
                        return JSDeclarationKindThisProperty$constant();
                    }
                }
                if (Node.$storageOf(((BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyAccessExpression$constant() && IsEntityNameExpressionEx(Node.Expression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left), IsInJSFile(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left)) && IsIdentifier(Node.Name(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left)) || Node.$storageOf(((BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindElementAccessExpression$constant() && IsEntityNameExpressionEx(Node.Expression(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left), IsInJSFile(BinaryExpression.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left))) {
                    return JSDeclarationKindProperty$constant();
                }
            }
            break;
        }
        case KindCallExpression$constant(): {
            if (IsInJSFile(node) && IsBindableObjectDefinePropertyCall(node)) {
                let entityName: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Arguments(node).get(0);
                if (IsExportsIdentifier(entityName) || IsModuleExportsAccessExpression(entityName)) {
                    return JSDeclarationKindObjectDefinePropertyExports$constant();
                }
                return JSDeclarationKindObjectDefinePropertyValue$constant();
            }
            break;
        }
    }
    return JSDeclarationKindNone$constant();
}
export function IsBindableObjectDefinePropertyCall(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    {
        let args = Node.Arguments(node);
        if (args.length === 3) {
            {
                let expr: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Expression(node);
                if (IsPropertyAccessExpression(expr) && IsIdentifier(Node.Expression(expr)) && Node.Text(Node.Expression(expr)) === "Object" && Node.Text(Node.Name(expr)) === "defineProperty" && IsStringOrNumericLiteralLike(args.get(1)) && IsBindableStaticNameExpression(args.get(0), true)) {
                    return true;
                }
            }
        }
    }
    return false;
}
export function HasDynamicName(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let name: tsonicTypeScriptRuntime.Location<Node> | undefined = GetNameOfDeclaration(declaration);
    return !(name === undefined) && IsDynamicName(name);
}
export function IsDynamicName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let expr: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    switch (Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindComputedPropertyName$constant(): {
            expr = Node.Expression(name);
            break;
        }
        case KindElementAccessExpression$constant(): {
            expr = SkipParentheses(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression);
            break;
        }
        default: {
            return false;
            break;
        }
    }
    return !IsStringOrNumericLiteralLike(expr) && !IsSignedNumericLiteral(expr);
}
export function IsEntityNameExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsEntityNameExpressionEx(node, false);
}
export function IsEntityNameExpressionEx(node: tsonicTypeScriptRuntime.Location<Node> | undefined, allowJS: bool): bool {
    return IsIdentifier(node) || IsPropertyAccessEntityNameExpression(node, allowJS) || allowJS && (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindThisKeyword$constant() || isElementAccessEntityNameExpression(node, allowJS));
}
export function IsPropertyAccessEntityNameExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, allowJS: bool): bool {
    return IsPropertyAccessExpression(node) && IsIdentifier(Node.Name(node)) && IsEntityNameExpressionEx(Node.Expression(node), allowJS);
}
export function isElementAccessEntityNameExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, allowJS: bool): bool {
    return IsElementAccessExpression(node) && IsStringOrNumericLiteralLike(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression) && IsEntityNameExpressionEx(Node.Expression(node), allowJS);
}
export function IsDottedName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant():
        case KindThisKeyword$constant():
        case KindSuperKeyword$constant():
        case KindMetaProperty$constant(): {
            return true;
            break;
        }
        case KindPropertyAccessExpression$constant():
        case KindParenthesizedExpression$constant(): {
            return IsDottedName(Node.Expression(node));
            break;
        }
    }
    return false;
}
export function HasSamePropertyAccessName(node1: tsonicTypeScriptRuntime.Location<Node> | undefined, node2: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (Node.$storageOf(((node1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant() && Node.$storageOf(((node2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant()) {
        return Node.Text(node1) === Node.Text(node2);
    }
    else if (Node.$storageOf(((node1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyAccessExpression$constant() && Node.$storageOf(((node2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyAccessExpression$constant()) {
        return Node.Text(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(node1))) === Node.Text(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(node2))) && HasSamePropertyAccessName(Node.Expression(node1), Node.Expression(node2));
    }
    return false;
}
export function IsAmbientModule(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsModuleDeclaration(node) && (Node.$storageOf(((ModuleDeclaration.Name(Node.AsModuleDeclaration(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindStringLiteral$constant() || IsGlobalScopeAugmentation(node));
}
export function IsAmbientModuleSymbolName(s: gostring): bool {
    return strings__from_gostdlib.HasPrefix(s, "\"") && strings__from_gostdlib.HasSuffix(s, "\"");
}
export function IsExternalModule(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): bool {
    return !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ExternalModuleIndicator === undefined);
}
export function IsExternalOrCommonJSModule(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): bool {
    return !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ExternalModuleIndicator === undefined) || !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CommonJSModuleIndicator === undefined);
}
export function IsEffectiveExternalModule(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    return IsExternalModule(node) || (isCommonJSContainingModuleKind(CompilerOptions__from_core.GetEmitModuleKind(compilerOptions)) && !(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CommonJSModuleIndicator === undefined));
}
export function isCommonJSContainingModuleKind(kind: ModuleKind__from_core): bool {
    return kind === ModuleKindCommonJS$constant__from_core() || ModuleKindNode16$constant__from_core() <= kind && kind <= ModuleKindNodeNext$constant__from_core();
}
export function IsExternalModuleIndicator(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsAnyImportOrReExport(node) || IsExportAssignment(node) || HasSyntacticModifier(node, ModifierFlagsExport$constant());
}
export function IsExportNamespaceAsDefaultDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (IsExportDeclaration(node)) {
        let decl: {
            value: ExportDeclaration;
        } | undefined = Node.AsExportDeclaration(node);
        return IsNamespaceExport((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause) && ModuleExportNameIsDefault(Node.Name((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause));
    }
    return false;
}
export function IsGlobalScopeAugmentation(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsModuleDeclaration(node) && (Node.AsModuleDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Keyword === KindGlobalKeyword$constant();
}
export function IsModuleAugmentationExternal(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindSourceFile$constant(): {
            return IsExternalModule(Node.AsSourceFile(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent));
            break;
        }
        case KindModuleBlock$constant(): {
            let grandParent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
            return IsAmbientModule(grandParent) && IsSourceFile(Node.$storageOf(((grandParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) && !IsExternalModule(Node.AsSourceFile(Node.$storageOf(((grandParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent));
            break;
        }
    }
    return false;
}
export function IsModuleWithStringLiteralName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsModuleDeclaration(node) && Node.$storageOf(((Node.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindStringLiteral$constant();
}
export function GetContainingClass(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return FindAncestor(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, IsClassLike);
}
export function GetExtendsHeritageClauseElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return FirstOrNil$PointerTo_Named_ast$Node(GetExtendsHeritageClauseElements(node));
}
export function GetExtendsHeritageClauseElements(node: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    return GetHeritageElements(node, KindExtendsKeyword$constant());
}
export function GetImplementsHeritageClauseElements(node: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    return GetHeritageElements(node, KindImplementsKeyword$constant());
}
export function GetHeritageElements(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kind: Kind): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    let clause: tsonicTypeScriptRuntime.Location<Node> | undefined = GetHeritageClause(node, kind);
    if (!(clause === undefined)) {
        return NodeList.$storageOf(((HeritageClause.$storageOf(((Node.AsHeritageClause(clause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
}
export function GetHeritageClause(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kind: Kind): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let clauses: tsonicTypeScriptRuntime.Location<NodeList> | undefined = getHeritageClauses(node);
    if (!(clauses === undefined)) {
        const __gotots_range_9 = NodeList.$storageOf(((clauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
            const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
            let clause: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_9;
            if (HeritageClause.$storageOf(((Node.AsHeritageClause(clause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause>).value).Token === kind) {
                return clause;
            }
        }
    }
    return void 0;
}
export function getHeritageClauses(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindClassDeclaration$constant(): {
            return (Node.AsClassDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses;
            break;
        }
        case KindClassExpression$constant(): {
            return (Node.AsClassExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses;
            break;
        }
        case KindInterfaceDeclaration$constant(): {
            return InterfaceDeclaration.$storageOf(((Node.AsInterfaceDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration>).value).HeritageClauses;
            break;
        }
    }
    return void 0;
}
export function IsPartOfTypeQuery(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    for (; Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQualifiedName$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant();) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeQuery$constant();
}
export function IsPartOfParameterDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((GetRootDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindParameter$constant();
}
export function IsInTopLevelContext(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (IsIdentifier(node)) {
        let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        if ((IsClassDeclaration(parent) || IsFunctionDeclaration(parent)) &&
            tsonicTypeScriptRuntime.sameLocation(Node.Name(parent), node)) {
            node = parent;
        }
    }
    let container: tsonicTypeScriptRuntime.Location<Node> | undefined = GetThisContainer(node, true, false);
    return IsSourceFile(container);
}
export function GetThisContainer(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeArrowFunctions: bool, includeClassComputedPropertyName: bool): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (;;) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        if (node === undefined) {
            const __gotots_argument_15 = new GoInterfaceAdapter("nil parent in getThisContainer");
            GoPanic.raise(__gotots_argument_15 === undefined ? GoPanicNilValue.create() : __gotots_argument_15);
        }
        switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindComputedPropertyName$constant(): {
                if (includeClassComputedPropertyName && IsClassLike(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
                    return node;
                }
                node = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                break;
            }
            case KindDecorator$constant(): {
                if (Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindParameter$constant() && IsClassElement(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
                    node = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                }
                else if (IsClassElement(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
                    node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                }
                break;
            }
            case KindArrowFunction$constant(): {
                if (includeArrowFunctions) {
                    return node;
                }
                break;
            }
            case KindFunctionDeclaration$constant():
            case KindFunctionExpression$constant():
            case KindModuleDeclaration$constant():
            case KindClassStaticBlockDeclaration$constant():
            case KindPropertyDeclaration$constant():
            case KindPropertySignature$constant():
            case KindMethodDeclaration$constant():
            case KindMethodSignature$constant():
            case KindConstructor$constant():
            case KindGetAccessor$constant():
            case KindSetAccessor$constant():
            case KindCallSignature$constant():
            case KindConstructSignature$constant():
            case KindIndexSignature$constant():
            case KindEnumDeclaration$constant():
            case KindSourceFile$constant(): {
                return node;
                break;
            }
        }
    }
}
export function GetSuperContainer(node: tsonicTypeScriptRuntime.Location<Node> | undefined, stopOnFunctions: bool): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent; !(node === undefined); node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) {
        switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindComputedPropertyName$constant(): {
                node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                break;
            }
            case KindFunctionDeclaration$constant():
            case KindFunctionExpression$constant():
            case KindArrowFunction$constant(): {
                if (!stopOnFunctions) {
                    continue;
                }
                return node;
                break;
            }
            case KindPropertyDeclaration$constant():
            case KindPropertySignature$constant():
            case KindMethodDeclaration$constant():
            case KindMethodSignature$constant():
            case KindConstructor$constant():
            case KindGetAccessor$constant():
            case KindSetAccessor$constant():
            case KindClassStaticBlockDeclaration$constant(): {
                return node;
                break;
            }
            case KindDecorator$constant(): {
                if (Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindParameter$constant() && IsClassElement(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
                    node = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                }
                else if (IsClassElement(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
                    node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                }
                break;
            }
        }
    }
    return void 0;
}
export function GetImmediatelyInvokedFunctionExpression(fn: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsFunctionExpressionOrArrowFunction(fn)) {
        let prev: tsonicTypeScriptRuntime.Location<Node> | undefined = fn;
        let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        for (; IsParenthesizedExpression(parent);) {
            prev = parent;
            parent = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        }
        if (IsCallExpression(parent) &&
            tsonicTypeScriptRuntime.sameLocation(Node.Expression(parent), prev)) {
            return parent;
        }
    }
    return void 0;
}
export function IsEnumConst(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !((GetCombinedModifierFlags(node) & ModifierFlagsConst$constant()) >>> 0 === 0);
}
export function ExpressionIsAlias(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsEntityNameExpression(node) || IsClassExpression(node);
}
export function IsInstanceOfExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsBinaryExpression(node) && Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindInstanceOfKeyword$constant();
}
export function IsAnyImportOrReExport(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsImportNode(node) || IsExportDeclaration(node);
}
export function IsImportNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsAnyImportSyntax(node) || NodeKindIs(node, RuntimeSlice.literal<Kind>([KindJSImportDeclaration$constant()]));
}
export function IsAnyImportSyntax(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return NodeKindIs(node, RuntimeSlice.literal<Kind>([KindImportDeclaration$constant(), KindImportEqualsDeclaration$constant()]));
}
export function IsJsonSourceFile(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): bool {
    return ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind === ScriptKindJSON$constant__from_core();
}
export function IsInJsonFile(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsJsonFile$constant()) >>> 0 === 0);
}
export function GetExternalModuleName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindExportDeclaration$constant(): {
            return Node.ModuleSpecifier(node);
            break;
        }
        case KindImportEqualsDeclaration$constant(): {
            if (Node.$storageOf((((Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExternalModuleReference$constant()) {
                return Node.Expression((Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
            }
            return void 0;
            break;
        }
        case KindImportType$constant(): {
            return getImportTypeNodeLiteral(node);
            break;
        }
        case KindCallExpression$constant(): {
            return FirstOrNil$PointerTo_Named_ast$Node(Node.Arguments(node));
            break;
        }
        case KindModuleDeclaration$constant(): {
            if (IsStringLiteral(ModuleDeclaration.Name(Node.AsModuleDeclaration(node)))) {
                return ModuleDeclaration.Name(Node.AsModuleDeclaration(node));
            }
            return void 0;
            break;
        }
    }
    const __gotots_argument_7 = new GoInterfaceAdapter("Unhandled case in getExternalModuleName");
    GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function GetImportAttributes(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant(): {
            return (Node.AsImportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            break;
        }
        case KindExportDeclaration$constant(): {
            return (Node.AsExportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            break;
        }
    }
    const __gotots_argument_31 = new GoInterfaceAdapter("Unhandled case in getImportAttributes");
    GoPanic.raise(__gotots_argument_31 === undefined ? GoPanicNilValue.create() : __gotots_argument_31);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function getImportTypeNodeLiteral(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsImportTypeNode(node)) {
        let importTypeNode: {
            value: ImportTypeNode;
        } | undefined = Node.AsImportTypeNode(node);
        if (IsLiteralTypeNode((importTypeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument)) {
            let literalTypeNode: tsonicTypeScriptRuntime.Location<LiteralTypeNode> | undefined = Node.AsLiteralTypeNode((importTypeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument);
            if (IsStringLiteral(LiteralTypeNode.$storageOf(((literalTypeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode>).value).Literal)) {
                return LiteralTypeNode.$storageOf(((literalTypeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode>).value).Literal;
            }
        }
    }
    return void 0;
}
export function IsExpressionNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    {
        const __gotots_switch_tag_0 = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindSuperKeyword$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNullKeyword$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTrueKeyword$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindFalseKeyword$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindRegularExpressionLiteral$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindArrayLiteralExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindObjectLiteralExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindPropertyAccessExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindElementAccessExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindCallExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNewExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTaggedTemplateExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindAsExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTypeAssertionExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindSatisfiesExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNonNullExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindParenthesizedExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindFunctionExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindClassExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindArrowFunction$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindVoidExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindDeleteExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTypeOfExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindPrefixUnaryExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindPostfixUnaryExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindBinaryExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindConditionalExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindSpreadElement$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTemplateExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindOmittedExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindJsxElement$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindJsxSelfClosingElement$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindJsxFragment$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindYieldExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindAwaitExpression$constant();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindMetaProperty$constant();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindExpressionWithTypeArguments$constant();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindQualifiedName$constant();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_4 = false;
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindPrivateIdentifier$constant();
            }
            if (__gotots_switch_match_4) {
                __gotots_switch_selection_0 = 4;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_5 = false;
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindIdentifier$constant();
            }
            if (__gotots_switch_match_5) {
                __gotots_switch_selection_0 = 5;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_6 = false;
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindNumericLiteral$constant();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindBigIntLiteral$constant();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindStringLiteral$constant();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindNoSubstitutionTemplateLiteral$constant();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindThisKeyword$constant();
            }
            if (__gotots_switch_match_6) {
                __gotots_switch_selection_0 = 6;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            __gotots_switch_selection_0 = 7;
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return true;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                return !IsImportCall(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || !tsonicTypeScriptRuntime.sameLocation(Node.Expression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), node);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                return !IsHeritageClause(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 3) {
                for (; Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQualifiedName$constant();) {
                    node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                }
                return IsTypeQueryNode(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsJSDocLinkLike(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsJSDocNameReference(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsJsxTagName(node);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 4) {
                return IsBinaryExpression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
                    tsonicTypeScriptRuntime.sameLocation(BinaryExpression.$storageOf(((Node.AsBinaryExpression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left, node) && Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindInKeyword$constant();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 5) {
                if (IsTypeQueryNode(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsJSDocLinkLike(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsJSDocNameReference(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsJsxTagName(node)) {
                    return true;
                }
                __gotots_switch_selection_0 = 6;
            }
            if (__gotots_switch_selection_0 === 6) {
                return IsInExpressionContext(node);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 7) {
                return false;
                break __gotots_control_target_0;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function IsInExpressionContext(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindVariableDeclaration$constant():
        case KindParameter$constant():
        case KindPropertyDeclaration$constant():
        case KindPropertySignature$constant():
        case KindEnumMember$constant():
        case KindPropertyAssignment$constant():
        case KindBindingElement$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.Initializer(parent), node);
            break;
        }
        case KindExpressionStatement$constant():
        case KindIfStatement$constant():
        case KindDoStatement$constant():
        case KindWhileStatement$constant():
        case KindReturnStatement$constant():
        case KindWithStatement$constant():
        case KindSwitchStatement$constant():
        case KindCaseClause$constant():
        case KindDefaultClause$constant():
        case KindThrowStatement$constant():
        case KindTypeAssertionExpression$constant():
        case KindAsExpression$constant():
        case KindTemplateSpan$constant():
        case KindComputedPropertyName$constant():
        case KindSatisfiesExpression$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.Expression(parent), node);
            break;
        }
        case KindForStatement$constant(): {
            let s: {
                value: ForStatement;
            } | undefined = Node.AsForStatement(parent);
            return tsonicTypeScriptRuntime.sameLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer, node)
                && !(Node.$storageOf((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableDeclarationList$constant()) ||
                tsonicTypeScriptRuntime.sameLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition, node) ||
                tsonicTypeScriptRuntime.sameLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor, node);
            break;
        }
        case KindForInStatement$constant():
        case KindForOfStatement$constant(): {
            let s: {
                value: ForInOrOfStatement;
            } | undefined = Node.AsForInOrOfStatement(parent);
            return tsonicTypeScriptRuntime.sameLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer, node)
                && !(Node.$storageOf((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableDeclarationList$constant()) ||
                tsonicTypeScriptRuntime.sameLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, node);
            break;
        }
        case KindDecorator$constant():
        case KindJsxExpression$constant():
        case KindJsxSpreadAttribute$constant():
        case KindSpreadAssignment$constant(): {
            return true;
            break;
        }
        case KindExpressionWithTypeArguments$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(Node.Expression(parent), node)
                && !IsPartOfTypeNode(parent);
            break;
        }
        case KindShorthandPropertyAssignment$constant(): {
            return tsonicTypeScriptRuntime.sameLocation((Node.AsShorthandPropertyAssignment(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer, node);
            break;
        }
        default: {
            return IsExpressionNode(parent);
            break;
        }
    }
}
export function IsPartOfTypeNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let kind = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
    if (kind >= KindFirstTypeNode$constant() && kind <= KindLastTypeNode$constant()) {
        return true;
    }
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindAnyKeyword$constant():
        case KindUnknownKeyword$constant():
        case KindNumberKeyword$constant():
        case KindBigIntKeyword$constant():
        case KindStringKeyword$constant():
        case KindBooleanKeyword$constant():
        case KindSymbolKeyword$constant():
        case KindObjectKeyword$constant():
        case KindUndefinedKeyword$constant():
        case KindNullKeyword$constant():
        case KindNeverKeyword$constant(): {
            return true;
            break;
        }
        case KindVoidKeyword$constant(): {
            return !(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVoidExpression$constant());
            break;
        }
        case KindExpressionWithTypeArguments$constant(): {
            return isPartOfTypeExpressionWithTypeArguments(node);
            break;
        }
        case KindTypeParameter$constant(): {
            return Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindMappedType$constant() || Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindInferType$constant();
            break;
        }
        case KindIdentifier$constant(): {
            let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
            if (IsQualifiedName(parent) &&
                tsonicTypeScriptRuntime.sameLocation((Node.AsQualifiedName(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, node)) {
                return isPartOfTypeNodeInParent(parent);
            }
            if (IsPropertyAccessExpression(parent) &&
                tsonicTypeScriptRuntime.sameLocation(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(parent)), node)) {
                return isPartOfTypeNodeInParent(parent);
            }
            return isPartOfTypeNodeInParent(node);
            break;
        }
        case KindQualifiedName$constant():
        case KindPropertyAccessExpression$constant():
        case KindThisKeyword$constant(): {
            return isPartOfTypeNodeInParent(node);
            break;
        }
    }
    return false;
}
export function isPartOfTypeNodeInParent(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    if (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeQuery$constant()) {
        return false;
    }
    if (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindImportType$constant()) {
        return !(Node.AsImportTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf;
    }
    if (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind >= KindFirstTypeNode$constant() && Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind <= KindLastTypeNode$constant()) {
        return true;
    }
    switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindExpressionWithTypeArguments$constant(): {
            return isPartOfTypeExpressionWithTypeArguments(parent);
            break;
        }
        case KindTypeParameter$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(node, TypeParameterDeclaration.$storageOf(((Node.AsTypeParameterDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration>).value).Constraint);
            break;
        }
        case KindVariableDeclaration$constant():
        case KindParameter$constant():
        case KindPropertyDeclaration$constant():
        case KindPropertySignature$constant():
        case KindFunctionDeclaration$constant():
        case KindFunctionExpression$constant():
        case KindArrowFunction$constant():
        case KindConstructor$constant():
        case KindMethodDeclaration$constant():
        case KindMethodSignature$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindCallSignature$constant():
        case KindConstructSignature$constant():
        case KindIndexSignature$constant():
        case KindTypeAssertionExpression$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(node, Node.Type(parent));
            break;
        }
        case KindCallExpression$constant():
        case KindNewExpression$constant():
        case KindTaggedTemplateExpression$constant(): {
            return Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node.TypeArguments(parent), node);
            break;
        }
    }
    return false;
}
export function isPartOfTypeExpressionWithTypeArguments(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    return IsHeritageClause(parent) && (!IsClassLike(Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || HeritageClause.$storageOf(((Node.AsHeritageClause(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause>).value).Token === KindImplementsKeyword$constant()) || IsJSDocImplementsTag(parent) || IsJSDocAugmentsTag(parent);
}
export function IsJSDocLinkLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return NodeKindIs(node, RuntimeSlice.literal<Kind>([KindJSDocLink$constant(), KindJSDocLinkCode$constant(), KindJSDocLinkPlain$constant()]));
}
export function IsJSDocTag(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind >= KindFirstJSDocTagNode$constant() && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind <= KindLastJSDocTagNode$constant();
}
export function IsSuperCall(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsCallExpression(node) && Node.$storageOf(((Node.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSuperKeyword$constant();
}
export function IsImportCall(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!IsCallExpression(node)) {
        return false;
    }
    let e: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Expression(node);
    return Node.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindImportKeyword$constant() || IsMetaProperty(e) && (Node.AsMetaProperty(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.KeywordToken === KindImportKeyword$constant() && Node.Text(e) === "defer";
}
export function IsComputedNonLiteralName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsComputedPropertyName(name) && !IsStringOrNumericLiteralLike(Node.Expression(name));
}
export function IsQuestionToken(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQuestionToken$constant();
}
export function EntityNameToString(name: tsonicTypeScriptRuntime.Location<Node> | undefined, getTextOfNode: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => gostring) | undefined): gostring {
    switch (Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindThisKeyword$constant(): {
            return "this";
            break;
        }
        case KindIdentifier$constant():
        case KindPrivateIdentifier$constant(): {
            if (NodeIsSynthesized(name) || getTextOfNode === undefined) {
                return Node.Text(name);
            }
            const __gotots_callee_9 = getTextOfNode;
            const __gotots_argument_28 = name;
            return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
            break;
        }
        case KindQualifiedName$constant(): {
            return EntityNameToString((Node.AsQualifiedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left, getTextOfNode) + "." + EntityNameToString((Node.AsQualifiedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, getTextOfNode);
            break;
        }
        case KindPropertyAccessExpression$constant(): {
            return EntityNameToString(Node.Expression(name), getTextOfNode) + "." + EntityNameToString(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(name)), getTextOfNode);
            break;
        }
        case KindJsxNamespacedName$constant(): {
            return EntityNameToString((Node.AsJsxNamespacedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace, getTextOfNode) + ":" + EntityNameToString(JsxNamespacedName.Name(Node.AsJsxNamespacedName(name)), getTextOfNode);
            break;
        }
    }
    const __gotots_argument_29 = new GoInterfaceAdapter("Unhandled case in EntityNameToString");
    GoPanic.raise(__gotots_argument_29 === undefined ? GoPanicNilValue.create() : __gotots_argument_29);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function GetTextOfPropertyName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): gostring {
    const __gotots_results_8 = TryGetTextOfPropertyName(name);
    let text = __gotots_results_8[0];
    return text;
}
export function TryGetTextOfPropertyName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): [
    gostring,
    bool
] {
    switch (Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant():
        case KindPrivateIdentifier$constant():
        case KindStringLiteral$constant():
        case KindNumericLiteral$constant():
        case KindBigIntLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant(): {
            return [Node.Text(name), true];
            break;
        }
        case KindComputedPropertyName$constant(): {
            if (IsStringOrNumericLiteralLike(Node.Expression(name))) {
                return [Node.Text(Node.Expression(name)), true];
            }
            break;
        }
        case KindJsxNamespacedName$constant(): {
            return [Node.Text((Node.AsJsxNamespacedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace) + ":" + Node.Text(Node.Name(name)), true];
            break;
        }
    }
    return ["", false];
}
export function IsJSDocNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind >= KindFirstJSDocNode$constant() && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind <= KindLastJSDocNode$constant();
}
export function IsNonWhitespaceToken(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsTokenKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) && !IsWhitespaceOnlyJsxText(node);
}
export function IsWhitespaceOnlyJsxText(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindJsxText$constant() && (Node.AsJsxText(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ContainsOnlyTriviaWhiteSpaces;
}
export function GetNewTargetContainer(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let container: tsonicTypeScriptRuntime.Location<Node> | undefined = GetThisContainer(node, false, false);
    if (!(container === undefined)) {
        switch (Node.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindConstructor$constant():
            case KindFunctionDeclaration$constant():
            case KindFunctionExpression$constant(): {
                return container;
                break;
            }
        }
    }
    return void 0;
}
export function GetEnclosingBlockScopeContainer(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return FindAncestor(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, (current: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        return IsBlockScope(current, Node.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
    });
}
export function IsBlockScope(node: tsonicTypeScriptRuntime.Location<Node> | undefined, parentNode: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindSourceFile$constant():
        case KindCaseBlock$constant():
        case KindCatchClause$constant():
        case KindModuleDeclaration$constant():
        case KindForStatement$constant():
        case KindForInStatement$constant():
        case KindForOfStatement$constant():
        case KindConstructor$constant():
        case KindMethodDeclaration$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindFunctionDeclaration$constant():
        case KindFunctionExpression$constant():
        case KindArrowFunction$constant():
        case KindPropertyDeclaration$constant():
        case KindClassStaticBlockDeclaration$constant(): {
            return true;
            break;
        }
        case KindBlock$constant(): {
            return !IsFunctionLikeOrClassStaticBlockDeclaration(parentNode);
            break;
        }
    }
    return false;
}
export type SemanticMeaning = int32;
export function SemanticMeaningValue$constant(): SemanticMeaning {
    return 1;
}
export function SemanticMeaningType$constant(): SemanticMeaning {
    return 2;
}
export function SemanticMeaningNamespace$constant(): SemanticMeaning {
    return 4;
}
export function SemanticMeaningAll$constant(): SemanticMeaning {
    return 7;
}
export function GetMeaningFromDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): SemanticMeaning {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindVariableDeclaration$constant(): {
            return SemanticMeaningValue$constant();
            break;
        }
        case KindParameter$constant():
        case KindBindingElement$constant():
        case KindPropertyDeclaration$constant():
        case KindPropertySignature$constant():
        case KindPropertyAssignment$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindMethodDeclaration$constant():
        case KindMethodSignature$constant():
        case KindConstructor$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindFunctionDeclaration$constant():
        case KindFunctionExpression$constant():
        case KindArrowFunction$constant():
        case KindCatchClause$constant():
        case KindJsxAttribute$constant(): {
            return SemanticMeaningValue$constant();
            break;
        }
        case KindTypeParameter$constant():
        case KindInterfaceDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindTypeLiteral$constant(): {
            return SemanticMeaningType$constant();
            break;
        }
        case KindEnumMember$constant():
        case KindClassDeclaration$constant(): {
            return 3;
            break;
        }
        case KindModuleDeclaration$constant(): {
            if (IsAmbientModule(node)) {
                return 5;
            }
            else if (GetModuleInstanceState(node) === ModuleInstanceStateInstantiated$constant()) {
                return 5;
            }
            else {
                return SemanticMeaningNamespace$constant();
            }
            break;
        }
        case KindEnumDeclaration$constant():
        case KindNamedImports$constant():
        case KindImportSpecifier$constant():
        case KindImportEqualsDeclaration$constant():
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindExportAssignment$constant():
        case KindExportDeclaration$constant(): {
            return SemanticMeaningAll$constant();
            break;
        }
        case KindSourceFile$constant(): {
            return 5;
            break;
        }
    }
    return SemanticMeaningAll$constant();
}
export function IsPropertyAccessOrQualifiedName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyAccessExpression$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQualifiedName$constant();
}
export function IsLabelName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsLabelOfLabeledStatement(node) || IsJumpStatementTarget(node);
}
export function IsLabelOfLabeledStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!IsIdentifier(node)) {
        return false;
    }
    if (!IsLabeledStatement(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
        return false;
    }
    return tsonicTypeScriptRuntime.sameLocation(node, Node.Label(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent));
}
export function IsJumpStatementTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!IsIdentifier(node)) {
        return false;
    }
    if (!IsBreakOrContinueStatement(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
        return false;
    }
    return tsonicTypeScriptRuntime.sameLocation(node, Node.Label(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent));
}
export function IsBreakOrContinueStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return NodeKindIs(node, RuntimeSlice.literal<Kind>([KindBreakStatement$constant(), KindContinueStatement$constant()]));
}
export function pushAncestor(ancestors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, parent: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    return ancestors.append(void 0, [parent]);
}
export function popAncestor(ancestors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, node: tsonicTypeScriptRuntime.Location<Node> | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>,
    tsonicTypeScriptRuntime.Location<Node> | undefined
] {
    if (ancestors.length === 0) {
        return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>(), Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent];
    }
    let n = ancestors.length - 1;
    return [ancestors.slice(0, n, null), ancestors.get(n)];
}
export type ModuleInstanceState = int32;
export function ModuleInstanceStateUnknown$constant(): ModuleInstanceState {
    return 0;
}
export function ModuleInstanceStateNonInstantiated$constant(): ModuleInstanceState {
    return 1;
}
export function ModuleInstanceStateInstantiated$constant(): ModuleInstanceState {
    return 2;
}
export function ModuleInstanceStateConstEnumOnly$constant(): ModuleInstanceState {
    return 3;
}
export function GetModuleInstanceState(node: tsonicTypeScriptRuntime.Location<Node> | undefined): ModuleInstanceState {
    return getModuleInstanceState(node, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>(), $goMap$MapOf_Named_ast$NodeId_To_Named_ast$ModuleInstanceState.nil());
}
export function getModuleInstanceState(node: tsonicTypeScriptRuntime.Location<Node> | undefined, ancestors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, visited: GoMapValue<NodeId, ModuleInstanceState>): ModuleInstanceState {
    let __go_module: {
        value: ModuleDeclaration;
    } | undefined = Node.AsModuleDeclaration(node);
    if (!(BodyBase.$storageOf((__go_module ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body === undefined)) {
        return getModuleInstanceStateCached(BodyBase.$storageOf((__go_module ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body, pushAncestor(ancestors, node), visited);
    }
    else {
        return ModuleInstanceStateInstantiated$constant();
    }
}
export function getModuleInstanceStateCached(node: tsonicTypeScriptRuntime.Location<Node> | undefined, ancestors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, visited: GoMapValue<NodeId, ModuleInstanceState>): ModuleInstanceState {
    if (visited.isNil()) {
        visited = $goMap$MapOf_Named_ast$NodeId_To_Named_ast$ModuleInstanceState.make(0, []);
    }
    let nodeId = GetNodeId(node);
    {
        const __gotots_results_7 = visited.lookupOk(nodeId);
        let cached = __gotots_results_7[0];
        let ok = __gotots_results_7[1];
        if (ok) {
            if (!(cached === ModuleInstanceStateUnknown$constant())) {
                return cached;
            }
            return ModuleInstanceStateNonInstantiated$constant();
        }
    }
    visited.store(nodeId, ModuleInstanceStateUnknown$constant());
    let result = getModuleInstanceStateWorker(node, ancestors, visited);
    visited.store(nodeId, result);
    return result;
}
export function getModuleInstanceStateWorker(node: tsonicTypeScriptRuntime.Location<Node> | undefined, ancestors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, visited: GoMapValue<NodeId, ModuleInstanceState>): ModuleInstanceState {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindInterfaceDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant(): {
            return ModuleInstanceStateNonInstantiated$constant();
            break;
        }
        case KindEnumDeclaration$constant(): {
            if (IsEnumConst(node)) {
                return ModuleInstanceStateConstEnumOnly$constant();
            }
            break;
        }
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindImportEqualsDeclaration$constant(): {
            if (!HasSyntacticModifier(node, ModifierFlagsExport$constant())) {
                return ModuleInstanceStateNonInstantiated$constant();
            }
            break;
        }
        case KindExportDeclaration$constant(): {
            let decl: {
                value: ExportDeclaration;
            } | undefined = Node.AsExportDeclaration(node);
            if ((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined && !((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined) && Node.$storageOf((((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindNamedExports$constant()) {
                let state = ModuleInstanceStateNonInstantiated$constant();
                ancestors = pushAncestor(ancestors, node);
                ancestors = pushAncestor(ancestors, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                const __gotots_range_6 = Node.Elements((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                    const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                    let specifier: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_6;
                    let specifierState = getModuleInstanceStateForAliasTarget(specifier, ancestors, visited);
                    if (specifierState > state) {
                        state = specifierState;
                    }
                    if (state === ModuleInstanceStateInstantiated$constant()) {
                        return state;
                    }
                }
                return state;
            }
            break;
        }
        case KindModuleBlock$constant(): {
            let state = ModuleInstanceStateNonInstantiated$constant();
            ancestors = pushAncestor(ancestors, node);
            Node.ForEachChild(node, new Visitor((n: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
                let childState = getModuleInstanceStateCached(n, ancestors, visited);
                switch (childState) {
                    case ModuleInstanceStateNonInstantiated$constant(): {
                        return false;
                        break;
                    }
                    case ModuleInstanceStateConstEnumOnly$constant(): {
                        state = ModuleInstanceStateConstEnumOnly$constant();
                        return false;
                        break;
                    }
                    case ModuleInstanceStateInstantiated$constant(): {
                        state = ModuleInstanceStateInstantiated$constant();
                        return true;
                        break;
                    }
                }
                const __gotots_argument_30 = new GoInterfaceAdapter("Unhandled case in getModuleInstanceStateWorker");
                GoPanic.raise(__gotots_argument_30 === undefined ? GoPanicNilValue.create() : __gotots_argument_30);
                GoPanic.raiseRuntime("unreachable Go function end");
            }));
            return state;
            break;
        }
        case KindModuleDeclaration$constant(): {
            return getModuleInstanceState(node, ancestors, visited);
            break;
        }
    }
    return ModuleInstanceStateInstantiated$constant();
}
export function getModuleInstanceStateForAliasTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined, ancestors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, visited: GoMapValue<NodeId, ModuleInstanceState>): ModuleInstanceState {
    let name: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.PropertyNameOrName(node);
    if (!(Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant())) {
        return ModuleInstanceStateInstantiated$constant();
    }
    {
        const __gotots_results_9 = popAncestor(ancestors, node);
        let ancestors__shadow_1 = __gotots_results_9[0];
        let p: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_results_9[1];
        let __gotots_for_first_0 = true;
        for (;;) {
            if (__gotots_for_first_0) {
                __gotots_for_first_0 = false;
            }
            else {
                const __gotots_results_10 = popAncestor(ancestors__shadow_1, p);
                ancestors__shadow_1 = __gotots_results_10[0];
                p = __gotots_results_10[1];
            }
            if (!!(p === undefined)) {
                break;
            }
            {
                if (IsBlock(p) || IsModuleBlock(p) || IsSourceFile(p)) {
                    let found = ModuleInstanceStateUnknown$constant();
                    let statementsAncestors = pushAncestor(ancestors__shadow_1, p);
                    const __gotots_range_10 = Node.Statements(p);
                    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
                        const __gotots_range_value_10 = __gotots_range_10.get(__gotots_range_index_10);
                        let statement: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_10;
                        if (NodeHasName(statement, name)) {
                            let state = getModuleInstanceStateCached(statement, statementsAncestors, visited);
                            if (found === ModuleInstanceStateUnknown$constant() || state > found) {
                                found = state;
                            }
                            if (found === ModuleInstanceStateInstantiated$constant()) {
                                return found;
                            }
                            if (Node.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindImportEqualsDeclaration$constant()) {
                                found = ModuleInstanceStateInstantiated$constant();
                            }
                        }
                    }
                    if (!(found === ModuleInstanceStateUnknown$constant())) {
                        return found;
                    }
                }
            }
        }
    }
    return ModuleInstanceStateInstantiated$constant();
}
export function IsInstantiatedModule(node: tsonicTypeScriptRuntime.Location<Node> | undefined, preserveConstEnums: bool): bool {
    let moduleState = GetModuleInstanceState(node);
    return moduleState === ModuleInstanceStateInstantiated$constant() || (preserveConstEnums && moduleState === ModuleInstanceStateConstEnumOnly$constant());
}
export function NodeHasName(statement: tsonicTypeScriptRuntime.Location<Node> | undefined, id: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let name: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Name(statement);
    if (!(name === undefined)) {
        return IsIdentifier(name) && Node.Text(name) === Node.Text(id);
    }
    if (IsVariableStatement(statement)) {
        let declarations = NodeList.$storageOf(((VariableDeclarationList.$storageOf(((Node.AsVariableDeclarationList(VariableStatement.$storageOf(((Node.AsVariableStatement(statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        return Some$PointerTo_Named_ast$Node(declarations, (d: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
            return NodeHasName(d, id);
        });
    }
    return false;
}
export function IsInternalModuleImportEqualsDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsImportEqualsDeclaration(node) && !(Node.$storageOf((((Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExternalModuleReference$constant());
}
export function IsConstAssertion(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindAsExpression$constant():
        case KindTypeAssertionExpression$constant(): {
            return IsConstTypeReference(Node.Type(node));
            break;
        }
    }
    return false;
}
export function IsConstTypeReference(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsTypeReferenceNode(node) && Node.TypeArguments(node).length === 0 && IsIdentifier(TypeReferenceNode.$storageOf(((Node.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode>).value).TypeName) && Node.Text(TypeReferenceNode.$storageOf(((Node.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode>).value).TypeName) === "const";
}
export function IsGlobalSourceFile(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSourceFile$constant() && !IsExternalOrCommonJSModule(Node.AsSourceFile(node));
}
export function GetDeclarationOfKind(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined, kind: Kind): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_range_3 = Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Declarations;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let declaration: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_3;
        if (Node.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === kind) {
            return declaration;
        }
    }
    return void 0;
}
export function FindConstructorDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_range_4 = Node.Members(node);
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let member: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_4;
        if (IsConstructorDeclaration(member) && NodeIsPresent(Node.Body(member))) {
            return member;
        }
    }
    return void 0;
}
export function GetFirstIdentifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant(): {
            return node;
            break;
        }
        case KindQualifiedName$constant(): {
            return GetFirstIdentifier((Node.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left);
            break;
        }
        case KindPropertyAccessExpression$constant(): {
            return GetFirstIdentifier(PropertyAccessExpression.$storageOf(((Node.AsPropertyAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression>).value).Expression);
            break;
        }
    }
    const __gotots_argument_16 = new GoInterfaceAdapter("Unhandled case in GetFirstIdentifier");
    GoPanic.raise(__gotots_argument_16 === undefined ? GoPanicNilValue.create() : __gotots_argument_16);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function GetNamespaceDeclarationNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant(): {
            let importClause: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.ImportClause(node);
            if (!(importClause === undefined) && !((Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) && IsNamespaceImport((Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings)) {
                return (Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
            }
            break;
        }
        case KindImportEqualsDeclaration$constant(): {
            return node;
            break;
        }
        case KindExportDeclaration$constant(): {
            let exportClause: tsonicTypeScriptRuntime.Location<Node> | undefined = (Node.AsExportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
            if (!(exportClause === undefined) && IsNamespaceExport(exportClause)) {
                return exportClause;
            }
            break;
        }
        default: {
            const __gotots_argument_27 = new GoInterfaceAdapter("Unhandled case in getNamespaceDeclarationNode");
            GoPanic.raise(__gotots_argument_27 === undefined ? GoPanicNilValue.create() : __gotots_argument_27);
            break;
        }
    }
    return void 0;
}
export function ModuleExportNameIsDefault(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.Text(node) === InternalSymbolNameDefault$string;
}
export function IsDefaultImport(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant(): {
            let importClause: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.ImportClause(node);
            return !(importClause === undefined) && !((Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name === undefined);
            break;
        }
    }
    return false;
}
export function GetImpliedNodeFormatForFile(path: gostring, packageJsonType: gostring): ModuleKind__from_core {
    let impliedNodeFormat = ResolutionModeNone$constant__from_core();
    if (FileExtensionIsOneOf__from_tspath(path, RuntimeSlice.literal<gostring>([ExtensionDmts$string__from_tspath, ExtensionMts$string__from_tspath, ExtensionMjs$string__from_tspath]))) {
        impliedNodeFormat = ResolutionModeESM$constant__from_core();
    }
    else if (FileExtensionIsOneOf__from_tspath(path, RuntimeSlice.literal<gostring>([ExtensionDcts$string__from_tspath, ExtensionCts$string__from_tspath, ExtensionCjs$string__from_tspath]))) {
        impliedNodeFormat = ResolutionModeCommonJS$constant__from_core();
    }
    else if (FileExtensionIsOneOf__from_tspath(path, RuntimeSlice.literal<gostring>([ExtensionDts$string__from_tspath, ExtensionTs$string__from_tspath, ExtensionTsx$string__from_tspath, ExtensionJs$string__from_tspath, ExtensionJsx$string__from_tspath]))) {
        impliedNodeFormat = IfElse$Named_core$ModuleKind(packageJsonType === "module", ResolutionModeESM$constant__from_core(), ResolutionModeCommonJS$constant__from_core());
    }
    return impliedNodeFormat;
}
export function GetEmitModuleFormatOfFileWorker(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, sourceFileMetaData: SourceFileMetaData): ModuleKind__from_core {
    let result = GetImpliedNodeFormatForEmitWorker(fileName, CompilerOptions__from_core.GetEmitModuleKind(options), SourceFileMetaData.$copy(sourceFileMetaData));
    if (!(result === ModuleKindNone$constant__from_core())) {
        return result;
    }
    return CompilerOptions__from_core.GetEmitModuleKind(options);
}
export function GetImpliedNodeFormatForEmitWorker(fileName: gostring, emitModuleKind: ModuleKind__from_core, sourceFileMetaData: SourceFileMetaData): ModuleKind__from_core {
    if (ModuleKindNode16$constant__from_core() <= emitModuleKind && emitModuleKind <= ModuleKindNodeNext$constant__from_core()) {
        return sourceFileMetaData.ImpliedNodeFormat;
    }
    if (sourceFileMetaData.ImpliedNodeFormat === ModuleKindCommonJS$constant__from_core() && (sourceFileMetaData.PackageJsonType === "commonjs" || FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionCjs$string__from_tspath, ExtensionCts$string__from_tspath])))) {
        return ModuleKindCommonJS$constant__from_core();
    }
    if (sourceFileMetaData.ImpliedNodeFormat === ModuleKindESNext$constant__from_core() && (sourceFileMetaData.PackageJsonType === "module" || FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionMjs$string__from_tspath, ExtensionMts$string__from_tspath])))) {
        return ModuleKindESNext$constant__from_core();
    }
    return ModuleKindNone$constant__from_core();
}
export function GetDeclarationContainer(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return Node.$storageOf(((FindAncestor(GetRootDeclaration(node), (node__shadow_1: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        switch (Node.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindVariableDeclaration$constant():
            case KindVariableDeclarationList$constant():
            case KindImportSpecifier$constant():
            case KindNamedImports$constant():
            case KindNamespaceImport$constant():
            case KindImportClause$constant(): {
                return false;
                break;
            }
            default: {
                return true;
                break;
            }
        }
    }) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
}
export function IsNonLocalAlias(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined, excludes: SymbolFlags): bool {
    if (__go_symbol === undefined) {
        return false;
    }
    return (Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags & ((SymbolFlagsAlias$constant() | excludes) >>> 0)) >>> 0 === SymbolFlagsAlias$constant() || !((Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags & SymbolFlagsAlias$constant()) >>> 0 === 0) && !((Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags & SymbolFlagsAssignment$constant()) >>> 0 === 0);
}
export function IsAliasSymbolDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportEqualsDeclaration$constant():
        case KindNamespaceExportDeclaration$constant():
        case KindNamespaceImport$constant():
        case KindNamespaceExport$constant():
        case KindImportSpecifier$constant():
        case KindExportSpecifier$constant(): {
            return true;
            break;
        }
        case KindImportClause$constant(): {
            return !(ImportClause.Name(Node.AsImportClause(node)) === undefined);
            break;
        }
        case KindExportAssignment$constant(): {
            return ExpressionIsAlias(Node.Expression(node));
            break;
        }
        case KindVariableDeclaration$constant():
        case KindBindingElement$constant(): {
            return IsVariableDeclarationInitializedToRequire(node);
            break;
        }
        case KindBinaryExpression$constant(): {
            switch (GetAssignmentDeclarationKind(node).$value) {
                case 1:
                case 2: {
                    return ExpressionIsAlias(BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Right);
                    break;
                }
            }
            break;
        }
    }
    return false;
}
export function IsParseTreeNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsSynthesized$constant()) >>> 0 === 0;
}
export function GetNodeAtPosition(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, position: int, includeJSDoc: bool): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_store_1 = NodeBase.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
    let current: tsonicTypeScriptRuntime.Location<Node> | undefined = NodeDefault.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault.$fromStorage, NodeDefault.$storageOf));
    for (;;) {
        let child: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
        if (includeJSDoc) {
            const __gotots_range_0 = Node.JSDoc(current, file);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let jsdoc: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_0;
                if (nodeContainsPosition(jsdoc, position)) {
                    child = jsdoc;
                    break;
                }
            }
        }
        if (child === undefined) {
            Node.ForEachChild(current, new Visitor((node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
                if (nodeContainsPosition(node, position)) {
                    child = node;
                    return true;
                }
                return false;
            }));
        }
        if (child === undefined || IsMetaProperty(child)) {
            return current;
        }
        current = child;
    }
}
export function nodeContainsPosition(node: tsonicTypeScriptRuntime.Location<Node> | undefined, position: int): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind >= KindFirstNode$constant() && Node.Pos(node) <= position && (position < Node.End(node) || position === Node.End(node) && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEndOfFile$constant());
}
export function findImportOrRequire(text: gostring, start: int): [
    int,
    int
] {
    let index: int = 0;
    let size: int = 0;
    index = globalThis.Math.max(start, 0);
    let n = text.length;
    for (; index < n;) {
        let next = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexAny(goStringSlice(text, index), "ir")));
        if (next < 0) {
            break;
        }
        index += next;
        let expected = "";
        if (goStringIndex(text, index) === 105) {
            size = 6;
            expected = "import";
        }
        else {
            size = 7;
            expected = "require";
        }
        if (index + size <= n && goStringSlice(text, index, index + size) === expected) {
            return [index, size];
        }
        index++;
    }
    return [-1, 0];
}
export function ForEachDynamicImportOrRequireCall(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, includeTypeSpaceImports: bool, requireStringLiteralLikeArgument: bool, cb: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): bool {
    const __gotots_store_0 = NodeBase.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
    const __gotots_argument_0 = NodeDefault.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault.$fromStorage, NodeDefault.$storageOf));
    let isJavaScriptFile = IsInJSFile(__gotots_argument_0);
    const __gotots_results_0 = findImportOrRequire(SourceFile.Text(file), 0);
    let lastIndex = __gotots_results_0[0];
    let size = __gotots_results_0[1];
    for (; lastIndex >= 0;) {
        let node: tsonicTypeScriptRuntime.Location<Node> | undefined = GetNodeAtPosition(file, lastIndex, isJavaScriptFile && includeTypeSpaceImports);
        if (isJavaScriptFile && IsRequireCall(node, requireStringLiteralLikeArgument)) {
            const __gotots_callee_0 = cb;
            const __gotots_argument_1 = node;
            const __gotots_argument_2 = Node.Arguments(node).get(0);
            if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2)) {
                return true;
            }
        }
        else if (IsImportCall(node) && Node.Arguments(node).length > 0 && (!requireStringLiteralLikeArgument || IsStringLiteralLike(Node.Arguments(node).get(0)))) {
            const __gotots_callee_1 = cb;
            const __gotots_argument_3 = node;
            const __gotots_argument_4 = Node.Arguments(node).get(0);
            if ((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4)) {
                return true;
            }
        }
        else if (includeTypeSpaceImports && IsLiteralImportTypeNode(node)) {
            const __gotots_callee_2 = cb;
            const __gotots_argument_5 = node;
            const __gotots_argument_6 = LiteralTypeNode.$storageOf(((Node.AsLiteralTypeNode((Node.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode>).value).Literal;
            if ((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6)) {
                return true;
            }
        }
        lastIndex += size;
        const __gotots_results_1 = findImportOrRequire(SourceFile.Text(file), lastIndex);
        lastIndex = __gotots_results_1[0];
        size = __gotots_results_1[1];
    }
    return false;
}
export function IsRequireCall(node: tsonicTypeScriptRuntime.Location<Node> | undefined, requireStringLiteralLikeArgument: bool): bool {
    if (!IsCallExpression(node)) {
        return false;
    }
    let call: tsonicTypeScriptRuntime.Location<CallExpression> | undefined = Node.AsCallExpression(node);
    if (!IsIdentifier(CallExpression.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Expression) || Node.Text(CallExpression.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Expression) !== "require") {
        return false;
    }
    if (NodeList.$storageOf(((CallExpression.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length !== 1) {
        return false;
    }
    return !requireStringLiteralLikeArgument || IsStringLiteralLike(NodeList.$storageOf(((CallExpression.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(0));
}
export function IsRequireVariableStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (IsVariableStatement(node)) {
        {
            let declarations = NodeList.$storageOf(((VariableDeclarationList.$storageOf(((Node.AsVariableDeclarationList(VariableStatement.$storageOf(((Node.AsVariableStatement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
            if (declarations.length > 0) {
                return Every$PointerTo_Named_ast$Node(declarations, IsVariableDeclarationInitializedToRequire);
            }
        }
    }
    return false;
}
export function GetJSXImplicitImportBase(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): gostring {
    let jsxImportSourcePragma: tsonicTypeScriptRuntime.Location<Pragma> | undefined = GetPragmaFromSourceFile(file, "jsximportsource");
    let jsxRuntimePragma: tsonicTypeScriptRuntime.Location<Pragma> | undefined = GetPragmaFromSourceFile(file, "jsxruntime");
    if (GetPragmaArgument(jsxRuntimePragma, "factory") === "classic") {
        return "";
    }
    if ((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSX$constant__from_core() || (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core() || (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxImportSource !== "" || !(jsxImportSourcePragma === undefined) || GetPragmaArgument(jsxRuntimePragma, "factory") === "automatic") {
        let result = GetPragmaArgument(jsxImportSourcePragma, "factory");
        if (result === "") {
            result = (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxImportSource;
        }
        if (result === "") {
            result = "react";
        }
        return result;
    }
    return "";
}
export function GetJSXRuntimeImport(base: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    if (base === "") {
        return base;
    }
    return base + "/" + IfElse$string((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core(), "jsx-dev-runtime", "jsx-runtime");
}
export function GetPragmaFromSourceFile(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Pragma> | undefined {
    let result: tsonicTypeScriptRuntime.Location<Pragma> | undefined = void 0;
    if (!(file === undefined)) {
        const __gotots_range_2 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Pragmas;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_index_2;
            let i = __gotots_range_value_2;
            if ((void Pragma.$storageOf, (void Pragma.$fromStorage,
                ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Pragmas.get(i))).Name === name) {
                result =
                    tsonicTypeScriptRuntime.projectLocation<Pragma__from_ast$Storage, Pragma>(goSliceAddress<Pragma__from_ast$Storage>(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Pragmas, i), Pragma.$fromStorage, Pragma.$storageOf);
            }
        }
    }
    return result;
}
export function GetPragmaArgument(pragma: tsonicTypeScriptRuntime.Location<Pragma> | undefined, name: gostring): gostring {
    if (!(pragma === undefined)) {
        {
            const __gotots_results_3 = Pragma.$storageOf(((pragma ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Pragma>).value).Args.lookupOk(name);
            let arg = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                return arg.Value;
            }
        }
    }
    return "";
}
export function IsVariableDeclarationInitializedToRequire(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindBindingElement$constant()) {
        node = Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return isVariableDeclarationInitializedWithRequireHelper(node, false);
}
export function IsVariableDeclarationInitializedToBareOrAccessedRequire(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return isVariableDeclarationInitializedWithRequireHelper(node, true);
}
export function isVariableDeclarationInitializedWithRequireHelper(node: tsonicTypeScriptRuntime.Location<Node> | undefined, allowAccessedRequire: bool): bool {
    if (!IsInJSFile(node)) {
        return false;
    }
    if (!(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindVariableDeclaration$constant())) {
        return false;
    }
    let initializer: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Initializer(node);
    if (initializer === undefined) {
        return false;
    }
    if (allowAccessedRequire) {
        initializer = GetLeftmostAccessExpression(initializer);
    }
    return (Node.ModifierFlags(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) & ModifierFlagsExport$constant()) >>> 0 === 0 && Node.Type(node) === undefined && IsRequireCall(initializer, true);
}
export function GetModuleSpecifierOfBareOrAccessedRequire(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (isVariableDeclarationInitializedWithRequireHelper(node, false)) {
        return Node.Arguments(Node.Initializer(node)).get(0);
    }
    if (isVariableDeclarationInitializedWithRequireHelper(node, true)) {
        let leftmost: tsonicTypeScriptRuntime.Location<Node> | undefined = GetLeftmostAccessExpression(Node.Initializer(node));
        if (IsRequireCall(leftmost, true)) {
            return Node.Arguments(leftmost).get(0);
        }
    }
    return void 0;
}
export function IsModuleExportsAccessExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (IsAccessExpression(node) && IsModuleIdentifier(Node.Expression(node))) {
        {
            let name: tsonicTypeScriptRuntime.Location<Node> | undefined = GetElementOrPropertyAccessName(node);
            if (!(name === undefined)) {
                return Node.Text(name) === "exports";
            }
        }
    }
    return false;
}
export function IsCheckJSEnabledForFile(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    if (!(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CheckJsDirective === undefined)) {
        return (((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CheckJsDirective ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enabled;
    }
    return (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs === TSTrue$constant__from_core();
}
export function IsPlainJSFile(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, checkJs: Tristate__from_core): bool {
    return !(file === undefined) && (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind === ScriptKindJS$constant__from_core() || ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind === ScriptKindJSX$constant__from_core()) && ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CheckJsDirective === undefined && checkJs === TSUnknown$constant__from_core();
}
export function GetLeftmostAccessExpression(expr: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (; IsAccessExpression(expr);) {
        expr = Node.Expression(expr);
    }
    return expr;
}
export function IsTypeOnlyImportDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportSpecifier$constant(): {
            return Node.IsTypeOnly(node) || Node.IsTypeOnly(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        case KindNamespaceImport$constant(): {
            return Node.IsTypeOnly(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        case KindImportClause$constant():
        case KindImportEqualsDeclaration$constant(): {
            return Node.IsTypeOnly(node);
            break;
        }
    }
    return false;
}
export function isTypeOnlyExportDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindExportSpecifier$constant(): {
            return Node.IsTypeOnly(node) || Node.IsTypeOnly(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        case KindExportDeclaration$constant(): {
            let d: {
                value: ExportDeclaration;
            } | undefined = Node.AsExportDeclaration(node);
            return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly && !((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) && (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined;
            break;
        }
        case KindNamespaceExport$constant(): {
            return Node.IsTypeOnly(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
    }
    return false;
}
export function IsTypeOnlyImportOrExportDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node);
}
export function IsExclusivelyTypeOnlyImportOrExport(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindExportDeclaration$constant(): {
            return Node.IsTypeOnly(node);
            break;
        }
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant(): {
            {
                let importClause: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.ImportClause(node);
                if (!(importClause === undefined)) {
                    const __gotots_store_2 = (void NodeDefault.$storageOf, (void NodeDefault.$fromStorage,
                        NodeBase.$storageOf((Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
                    return Node.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Node"), Node.$fromStorage, Node.$storageOf));
                }
            }
            break;
        }
        case KindJSDocImportTag$constant(): {
            {
                let importClause: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.ImportClause(node);
                if (!(importClause === undefined)) {
                    const __gotots_store_3 = (void NodeDefault.$storageOf, (void NodeDefault.$fromStorage,
                        NodeBase.$storageOf((Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
                    return Node.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Node"), Node.$fromStorage, Node.$storageOf));
                }
            }
            break;
        }
    }
    return false;
}
export function GetClassLikeDeclarationOfSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return Find$PointerTo_Named_ast$Node(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Declarations, IsClassLike);
}
export function IsCallLikeExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindJsxOpeningElement$constant():
        case KindJsxSelfClosingElement$constant():
        case KindJsxOpeningFragment$constant():
        case KindCallExpression$constant():
        case KindNewExpression$constant():
        case KindTaggedTemplateExpression$constant():
        case KindDecorator$constant(): {
            return true;
            break;
        }
        case KindBinaryExpression$constant(): {
            return Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindInstanceOfKeyword$constant();
            break;
        }
    }
    return false;
}
export function IsJsxCallLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindJsxOpeningElement$constant():
        case KindJsxSelfClosingElement$constant():
        case KindJsxOpeningFragment$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsCallLikeOrFunctionLikeExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsCallLikeExpression(node) || IsFunctionExpressionOrArrowFunction(node);
}
export function NodeHasKind(node: tsonicTypeScriptRuntime.Location<Node> | undefined, kind: Kind): bool {
    if (node === undefined) {
        return false;
    }
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === kind;
}
export function IsContextualKeyword(token: Kind): bool {
    return KindFirstContextualKeyword$constant() <= token && token <= KindLastContextualKeyword$constant();
}
export function IsThisInTypeQuery(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!IsThisIdentifier(node)) {
        return false;
    }
    for (; IsQualifiedName(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation((Node.AsQualifiedName(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left, node);) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeQuery$constant();
}
export function IsLet(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (GetCombinedNodeFlags(node) & NodeFlagsBlockScoped$constant()) >>> 0 === NodeFlagsLet$constant();
}
export function IsClassMemberModifier(token: Kind): bool {
    return IsParameterPropertyModifier(token) || token === KindStaticKeyword$constant() || token === KindOverrideKeyword$constant() || token === KindAccessorKeyword$constant();
}
export function IsParameterPropertyModifier(kind: Kind): bool {
    return !((ModifierToFlag(kind) & ModifierFlagsParameterPropertyModifier$constant()) >>> 0 === 0);
}
export function ForEachChildAndJSDoc(node: tsonicTypeScriptRuntime.Location<Node> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, v: Visitor): bool {
    if (visitNodes(v, Node.JSDoc(node, sourceFile))) {
        return true;
    }
    return Node.ForEachChild(node, v);
}
export function HasTypeArguments(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindCallExpression$constant():
        case KindNewExpression$constant():
        case KindTaggedTemplateExpression$constant():
        case KindTypeReference$constant():
        case KindExpressionWithTypeArguments$constant():
        case KindImportType$constant():
        case KindTypeQuery$constant():
        case KindJsxOpeningElement$constant():
        case KindJsxSelfClosingElement$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsTypeReferenceType(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeReference$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExpressionWithTypeArguments$constant();
}
export function IsVariableLike(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBindingElement$constant():
        case KindEnumMember$constant():
        case KindParameter$constant():
        case KindPropertyAssignment$constant():
        case KindPropertyDeclaration$constant():
        case KindPropertySignature$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindVariableDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function HasInitializer(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindVariableDeclaration$constant():
        case KindParameter$constant():
        case KindBindingElement$constant():
        case KindPropertyDeclaration$constant():
        case KindPropertyAssignment$constant():
        case KindEnumMember$constant():
        case KindForStatement$constant():
        case KindForInStatement$constant():
        case KindForOfStatement$constant():
        case KindJsxAttribute$constant(): {
            return !(Node.Initializer(node) === undefined);
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function IsVariableParameterOrProperty(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindVariableDeclaration$constant():
        case KindParameter$constant():
        case KindPropertySignature$constant():
        case KindPropertyDeclaration$constant(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function GetTypeAnnotationNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindVariableDeclaration$constant():
        case KindParameter$constant():
        case KindPropertySignature$constant():
        case KindPropertyDeclaration$constant():
        case KindTypePredicate$constant():
        case KindParenthesizedType$constant():
        case KindTypeOperator$constant():
        case KindMappedType$constant():
        case KindTypeAssertionExpression$constant():
        case KindAsExpression$constant():
        case KindSatisfiesExpression$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindNamedTupleMember$constant():
        case KindOptionalType$constant():
        case KindRestType$constant():
        case KindTemplateLiteralTypeSpan$constant():
        case KindJSDocTypeExpression$constant():
        case KindJSDocPropertyTag$constant():
        case KindJSDocNullableType$constant():
        case KindJSDocNonNullableType$constant():
        case KindJSDocOptionalType$constant(): {
            return Node.Type(node);
            break;
        }
        default: {
            let funcLike: tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined = Node.FunctionLikeData(node);
            if (!(funcLike === undefined)) {
                return FunctionLikeBase.$storageOf(((funcLike ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase>).value).Type;
            }
            return void 0;
            break;
        }
    }
}
export function IsObjectTypeDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsClassLike(node) || IsInterfaceDeclaration(node) || IsTypeLiteralNode(node);
}
export function IsClassOrTypeElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsClassElement(node) || IsTypeElement(node);
}
export function GetClassExtendsHeritageElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let heritageElements = GetHeritageElements(node, KindExtendsKeyword$constant());
    if (heritageElements.length > 0) {
        return heritageElements.get(0);
    }
    return void 0;
}
export function GetImplementsTypeNodes(node: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    return GetHeritageElements(node, KindImplementsKeyword$constant());
}
export function IsTypeKeywordToken(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeKeyword$constant();
}
export function IsJSDocSingleCommentNodeList(nodeList: tsonicTypeScriptRuntime.Location<NodeList> | undefined): bool {
    if (nodeList === undefined || NodeList.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length === 0) {
        return false;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((NodeList.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    if (parent === undefined) {
        return false;
    }
    return IsJSDocSingleCommentNode(parent) &&
        tsonicTypeScriptRuntime.sameLocation(nodeList, Node.CommentList(parent));
}
export function IsJSDocSingleCommentNodeComment(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (node === undefined || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) {
        return false;
    }
    return IsJSDocSingleCommentNode(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(node, NodeList.$storageOf(((Node.CommentList(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(0));
}
export function IsJSDocSingleCommentNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return hasComment(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) && !(Node.CommentList(node) === undefined) && NodeList.$storageOf(((Node.CommentList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length === 1;
}
export function IsValidTypeOnlyAliasUseSite(useSite: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !((Node.$storageOf(((useSite ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & (12582912)) >>> 0 === 0) || IsPartOfTypeQuery(useSite) || isIdentifierInNonEmittingHeritageClause(useSite) || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) || !(IsExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}
export function isIdentifierInNonEmittingHeritageClause(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!IsIdentifier(node)) {
        return false;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    for (; IsPropertyAccessExpression(parent) || IsExpressionWithTypeArguments(parent);) {
        parent = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return IsHeritageClause(parent) && (HeritageClause.$storageOf(((Node.AsHeritageClause(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause>).value).Token === KindImplementsKeyword$constant() || IsInterfaceDeclaration(Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent));
}
export function isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    for (; NodeKindIs(node, RuntimeSlice.literal<Kind>([KindIdentifier$constant(), KindPropertyAccessExpression$constant()]));) {
        node = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    if (!(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindComputedPropertyName$constant())) {
        return false;
    }
    if (HasSyntacticModifier(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, ModifierFlagsAbstract$constant())) {
        return true;
    }
    return NodeKindIs(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, RuntimeSlice.literal<Kind>([KindInterfaceDeclaration$constant(), KindTypeLiteral$constant()]));
}
export function isShorthandPropertyNameUseSite(useSite: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsIdentifier(useSite) && IsShorthandPropertyAssignment(Node.$storageOf(((useSite ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(ShorthandPropertyAssignment.Name(Node.AsShorthandPropertyAssignment(Node.$storageOf(((useSite ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)), useSite);
}
export function GetPropertyNameForPropertyNameNode(name: tsonicTypeScriptRuntime.Location<Node> | undefined): gostring {
    switch (Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant():
        case KindPrivateIdentifier$constant():
        case KindStringLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant():
        case KindNumericLiteral$constant():
        case KindBigIntLiteral$constant():
        case KindJsxNamespacedName$constant(): {
            return Node.Text(name);
            break;
        }
        case KindComputedPropertyName$constant(): {
            let nameExpression: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Expression(name);
            if (IsStringOrNumericLiteralLike(nameExpression)) {
                return Node.Text(nameExpression);
            }
            if (IsSignedNumericLiteral(nameExpression)) {
                let text = Node.Text(PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(nameExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operand);
                if (PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(nameExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindMinusToken$constant()) {
                    text = "-" + text;
                }
                return text;
            }
            return InternalSymbolNameMissing$string;
            break;
        }
    }
    const __gotots_argument_17 = new GoInterfaceAdapter("Unhandled case in getPropertyNameForPropertyNameNode");
    GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function IsPartOfTypeOnlyImportOrExportDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(FindAncestor(node, IsTypeOnlyImportOrExportDeclaration) === undefined);
}
export function IsEmittableImport(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant(): {
            return !(Node.ImportClause(node) === undefined) && !Node.IsTypeOnly(Node.ImportClause(node));
            break;
        }
        case KindExportDeclaration$constant():
        case KindImportEqualsDeclaration$constant(): {
            return !Node.IsTypeOnly(node);
            break;
        }
        case KindCallExpression$constant(): {
            return IsImportCall(node);
            break;
        }
    }
    return false;
}
export function IsResolutionModeOverrideHost(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportType$constant():
        case KindExportDeclaration$constant():
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function HasResolutionModeOverride(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    let attributes: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportType$constant(): {
            attributes = (Node.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            break;
        }
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant(): {
            attributes = (Node.AsImportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            break;
        }
        case KindExportDeclaration$constant(): {
            attributes = (Node.AsExportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            break;
        }
    }
    if (!(attributes === undefined)) {
        const __gotots_results_6 = Node.GetResolutionModeOverride(attributes);
        let ok = __gotots_results_6[1];
        return ok;
    }
    return false;
}
export function IsStringTextContainingNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindStringLiteral$constant() || IsTemplateLiteralKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function IsTemplateLiteralKind(kind: Kind): bool {
    return KindFirstTemplateToken$constant() <= kind && kind <= KindLastTemplateToken$constant();
}
export function IsTemplateLiteralToken(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsTemplateLiteralKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
}
export function GetExternalModuleImportEqualsDeclarationExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    Assert__from_debug(IsExternalModuleImportEqualsDeclaration(node), RuntimeSlice.nil<GoInterface | undefined>());
    return Node.Expression((Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
}
export function CreateModifiersFromModifierFlags(flags: ModifierFlags, createModifier: (($0: Kind) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    if (!((flags & ModifierFlagsExport$constant()) >>> 0 === 0)) {
        const __gotots_argument_36 = result;
        const __gotots_callee_12 = createModifier;
        const __gotots_argument_35 = KindExportKeyword$constant();
        const __gotots_argument_37 = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
        result = __gotots_argument_36.append(void 0, [__gotots_argument_37]);
    }
    if (!((flags & ModifierFlagsAmbient$constant()) >>> 0 === 0)) {
        const __gotots_argument_39 = result;
        const __gotots_callee_13 = createModifier;
        const __gotots_argument_38 = KindDeclareKeyword$constant();
        const __gotots_argument_40 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38);
        result = __gotots_argument_39.append(void 0, [__gotots_argument_40]);
    }
    if (!((flags & ModifierFlagsDefault$constant()) >>> 0 === 0)) {
        const __gotots_argument_42 = result;
        const __gotots_callee_14 = createModifier;
        const __gotots_argument_41 = KindDefaultKeyword$constant();
        const __gotots_argument_43 = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41);
        result = __gotots_argument_42.append(void 0, [__gotots_argument_43]);
    }
    if (!((flags & ModifierFlagsConst$constant()) >>> 0 === 0)) {
        const __gotots_argument_45 = result;
        const __gotots_callee_15 = createModifier;
        const __gotots_argument_44 = KindConstKeyword$constant();
        const __gotots_argument_46 = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44);
        result = __gotots_argument_45.append(void 0, [__gotots_argument_46]);
    }
    if (!((flags & ModifierFlagsPublic$constant()) >>> 0 === 0)) {
        const __gotots_argument_48 = result;
        const __gotots_callee_16 = createModifier;
        const __gotots_argument_47 = KindPublicKeyword$constant();
        const __gotots_argument_49 = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47);
        result = __gotots_argument_48.append(void 0, [__gotots_argument_49]);
    }
    if (!((flags & ModifierFlagsPrivate$constant()) >>> 0 === 0)) {
        const __gotots_argument_51 = result;
        const __gotots_callee_17 = createModifier;
        const __gotots_argument_50 = KindPrivateKeyword$constant();
        const __gotots_argument_52 = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_50);
        result = __gotots_argument_51.append(void 0, [__gotots_argument_52]);
    }
    if (!((flags & ModifierFlagsProtected$constant()) >>> 0 === 0)) {
        const __gotots_argument_54 = result;
        const __gotots_callee_18 = createModifier;
        const __gotots_argument_53 = KindProtectedKeyword$constant();
        const __gotots_argument_55 = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_53);
        result = __gotots_argument_54.append(void 0, [__gotots_argument_55]);
    }
    if (!((flags & ModifierFlagsAbstract$constant()) >>> 0 === 0)) {
        const __gotots_argument_57 = result;
        const __gotots_callee_19 = createModifier;
        const __gotots_argument_56 = KindAbstractKeyword$constant();
        const __gotots_argument_58 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56);
        result = __gotots_argument_57.append(void 0, [__gotots_argument_58]);
    }
    if (!((flags & ModifierFlagsStatic$constant()) >>> 0 === 0)) {
        const __gotots_argument_60 = result;
        const __gotots_callee_20 = createModifier;
        const __gotots_argument_59 = KindStaticKeyword$constant();
        const __gotots_argument_61 = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59);
        result = __gotots_argument_60.append(void 0, [__gotots_argument_61]);
    }
    if (!((flags & ModifierFlagsOverride$constant()) >>> 0 === 0)) {
        const __gotots_argument_63 = result;
        const __gotots_callee_21 = createModifier;
        const __gotots_argument_62 = KindOverrideKeyword$constant();
        const __gotots_argument_64 = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62);
        result = __gotots_argument_63.append(void 0, [__gotots_argument_64]);
    }
    if (!((flags & ModifierFlagsReadonly$constant()) >>> 0 === 0)) {
        const __gotots_argument_66 = result;
        const __gotots_callee_22 = createModifier;
        const __gotots_argument_65 = KindReadonlyKeyword$constant();
        const __gotots_argument_67 = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_65);
        result = __gotots_argument_66.append(void 0, [__gotots_argument_67]);
    }
    if (!((flags & ModifierFlagsAccessor$constant()) >>> 0 === 0)) {
        const __gotots_argument_69 = result;
        const __gotots_callee_23 = createModifier;
        const __gotots_argument_68 = KindAccessorKeyword$constant();
        const __gotots_argument_70 = (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68);
        result = __gotots_argument_69.append(void 0, [__gotots_argument_70]);
    }
    if (!((flags & ModifierFlagsAsync$constant()) >>> 0 === 0)) {
        const __gotots_argument_72 = result;
        const __gotots_callee_24 = createModifier;
        const __gotots_argument_71 = KindAsyncKeyword$constant();
        const __gotots_argument_73 = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_71);
        result = __gotots_argument_72.append(void 0, [__gotots_argument_73]);
    }
    if (!((flags & ModifierFlagsIn$constant()) >>> 0 === 0)) {
        const __gotots_argument_75 = result;
        const __gotots_callee_25 = createModifier;
        const __gotots_argument_74 = KindInKeyword$constant();
        const __gotots_argument_76 = (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_74);
        result = __gotots_argument_75.append(void 0, [__gotots_argument_76]);
    }
    if (!((flags & ModifierFlagsOut$constant()) >>> 0 === 0)) {
        const __gotots_argument_78 = result;
        const __gotots_callee_26 = createModifier;
        const __gotots_argument_77 = KindOutKeyword$constant();
        const __gotots_argument_79 = (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_77);
        result = __gotots_argument_78.append(void 0, [__gotots_argument_79]);
    }
    return result;
}
export function GetThisParameter(signature: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (Node.Parameters(signature).length !== 0) {
        let thisParameter: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Parameters(signature).get(0);
        if (IsThisParameter(thisParameter)) {
            return thisParameter;
        }
    }
    return void 0;
}
export function ReplaceModifiers(factory: tsonicTypeScriptRuntime.Location<NodeFactory> | undefined, node: tsonicTypeScriptRuntime.Location<Node> | undefined, modifierArray: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindTypeParameter$constant(): {
            return NodeFactory.UpdateTypeParameterDeclaration(factory, Node.AsTypeParameterDeclaration(node), modifierArray, Node.Name(node), TypeParameterDeclaration.$storageOf(((Node.AsTypeParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration>).value).Constraint, TypeParameterDeclaration.$storageOf(((Node.AsTypeParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration>).value).Expression, TypeParameterDeclaration.$storageOf(((Node.AsTypeParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration>).value).DefaultType);
            break;
        }
        case KindParameter$constant(): {
            return NodeFactory.UpdateParameterDeclaration(factory, Node.AsParameterDeclaration(node), modifierArray, ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).DotDotDotToken, Node.Name(node), Node.QuestionToken(node), Node.Type(node), Node.Initializer(node));
            break;
        }
        case KindConstructorType$constant(): {
            return NodeFactory.UpdateConstructorTypeNode(factory, Node.AsConstructorTypeNode(node), modifierArray, Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node));
            break;
        }
        case KindPropertySignature$constant(): {
            return NodeFactory.UpdatePropertySignatureDeclaration(factory, Node.AsPropertySignatureDeclaration(node), modifierArray, Node.Name(node), Node.PostfixToken(node), Node.Type(node), Node.Initializer(node));
            break;
        }
        case KindPropertyDeclaration$constant(): {
            return NodeFactory.UpdatePropertyDeclaration(factory, Node.AsPropertyDeclaration(node), modifierArray, Node.Name(node), Node.PostfixToken(node), Node.Type(node), Node.Initializer(node));
            break;
        }
        case KindMethodSignature$constant(): {
            return NodeFactory.UpdateMethodSignatureDeclaration(factory, Node.AsMethodSignatureDeclaration(node), modifierArray, Node.Name(node), Node.PostfixToken(node), Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node));
            break;
        }
        case KindMethodDeclaration$constant(): {
            return NodeFactory.UpdateMethodDeclaration(factory, Node.AsMethodDeclaration(node), modifierArray, (void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsMethodDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken, Node.Name(node), Node.PostfixToken(node), Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsMethodDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, Node.Body(node));
            break;
        }
        case KindConstructor$constant(): {
            return NodeFactory.UpdateConstructorDeclaration(factory, Node.AsConstructorDeclaration(node), modifierArray, Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsConstructorDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, Node.Body(node));
            break;
        }
        case KindGetAccessor$constant(): {
            return NodeFactory.UpdateGetAccessorDeclaration(factory, Node.AsGetAccessorDeclaration(node), modifierArray, Node.Name(node), Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsGetAccessorDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, Node.Body(node));
            break;
        }
        case KindSetAccessor$constant(): {
            return NodeFactory.UpdateSetAccessorDeclaration(factory, Node.AsSetAccessorDeclaration(node), modifierArray, Node.Name(node), Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsSetAccessorDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, Node.Body(node));
            break;
        }
        case KindIndexSignature$constant(): {
            return NodeFactory.UpdateIndexSignatureDeclaration(factory, Node.AsIndexSignatureDeclaration(node), modifierArray, Node.ParameterList(node), Node.Type(node));
            break;
        }
        case KindFunctionExpression$constant(): {
            return NodeFactory.UpdateFunctionExpression(factory, Node.AsFunctionExpression(node), modifierArray, (void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsFunctionExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken, Node.Name(node), Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsFunctionExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, Node.Body(node));
            break;
        }
        case KindArrowFunction$constant(): {
            return NodeFactory.UpdateArrowFunction(factory, Node.AsArrowFunction(node), modifierArray, Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((Node.AsArrowFunction(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature, (Node.AsArrowFunction(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken, Node.Body(node));
            break;
        }
        case KindClassExpression$constant(): {
            return NodeFactory.UpdateClassExpression(factory, Node.AsClassExpression(node), modifierArray, Node.Name(node), Node.TypeParameterList(node), (Node.AsClassExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses, Node.MemberList(node));
            break;
        }
        case KindVariableStatement$constant(): {
            return NodeFactory.UpdateVariableStatement(factory, Node.AsVariableStatement(node), modifierArray, VariableStatement.$storageOf(((Node.AsVariableStatement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement>).value).DeclarationList);
            break;
        }
        case KindFunctionDeclaration$constant(): {
            return NodeFactory.UpdateFunctionDeclaration(factory, Node.AsFunctionDeclaration(node), modifierArray, (void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                (void FunctionLikeWithBodyBase.$storageOf, (void FunctionLikeWithBodyBase.$fromStorage,
                    FunctionDeclaration.$storageOf(((Node.AsFunctionDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken, Node.Name(node), Node.TypeParameterList(node), Node.ParameterList(node), Node.Type(node), (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                (void FunctionLikeWithBodyBase.$storageOf, (void FunctionLikeWithBodyBase.$fromStorage,
                    FunctionDeclaration.$storageOf(((Node.AsFunctionDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).FullSignature, Node.Body(node));
            break;
        }
        case KindClassDeclaration$constant(): {
            return NodeFactory.UpdateClassDeclaration(factory, Node.AsClassDeclaration(node), modifierArray, Node.Name(node), Node.TypeParameterList(node), (Node.AsClassDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses, Node.MemberList(node));
            break;
        }
        case KindInterfaceDeclaration$constant(): {
            return NodeFactory.UpdateInterfaceDeclaration(factory, Node.AsInterfaceDeclaration(node), modifierArray, Node.Name(node), Node.TypeParameterList(node), InterfaceDeclaration.$storageOf(((Node.AsInterfaceDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration>).value).HeritageClauses, Node.MemberList(node));
            break;
        }
        case KindTypeAliasDeclaration$constant(): {
            return NodeFactory.UpdateTypeAliasDeclaration(factory, Node.AsTypeAliasDeclaration(node), modifierArray, Node.Name(node), Node.TypeParameterList(node), Node.Type(node));
            break;
        }
        case KindEnumDeclaration$constant(): {
            return NodeFactory.UpdateEnumDeclaration(factory, Node.AsEnumDeclaration(node), modifierArray, Node.Name(node), Node.MemberList(node));
            break;
        }
        case KindModuleDeclaration$constant(): {
            return NodeFactory.UpdateModuleDeclaration(factory, Node.AsModuleDeclaration(node), modifierArray, (Node.AsModuleDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Keyword, Node.Name(node), Node.Body(node));
            break;
        }
        case KindImportEqualsDeclaration$constant(): {
            return NodeFactory.UpdateImportEqualsDeclaration(factory, Node.AsImportEqualsDeclaration(node), modifierArray, Node.IsTypeOnly(node), Node.Name(node), (Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
            break;
        }
        case KindImportDeclaration$constant(): {
            return NodeFactory.UpdateImportDeclaration(factory, Node.AsImportDeclaration(node), modifierArray, Node.ImportClause(node), Node.ModuleSpecifier(node), (Node.AsImportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            break;
        }
        case KindExportAssignment$constant(): {
            return NodeFactory.UpdateExportAssignment(factory, Node.AsExportAssignment(node), modifierArray, (Node.AsExportAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals, Node.Type(node), Node.Expression(node));
            break;
        }
        case KindExportDeclaration$constant(): {
            return NodeFactory.UpdateExportDeclaration(factory, Node.AsExportDeclaration(node), modifierArray, Node.IsTypeOnly(node), (Node.AsExportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause, Node.ModuleSpecifier(node), (Node.AsExportDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            break;
        }
    }
    const __gotots_argument_80 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Node that does not have modifiers tried to have modifier replaced: %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)])));
    GoPanic.raise(__gotots_argument_80 === undefined ? GoPanicNilValue.create() : __gotots_argument_80);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function IsLateVisibilityPaintedStatement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindImportEqualsDeclaration$constant():
        case KindVariableStatement$constant():
        case KindClassDeclaration$constant():
        case KindFunctionDeclaration$constant():
        case KindModuleDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindInterfaceDeclaration$constant():
        case KindEnumDeclaration$constant(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function IsExternalModuleAugmentation(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsAmbientModule(node) && IsModuleAugmentationExternal(node);
}
export function GetSourceFileOfModule(__go_module: tsonicTypeScriptRuntime.Location<Symbol> | undefined): tsonicTypeScriptRuntime.Location<SourceFile> | undefined {
    let declaration: tsonicTypeScriptRuntime.Location<Node> | undefined = Symbol.$storageOf(((__go_module ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).ValueDeclaration;
    if (declaration === undefined) {
        declaration = GetNonAugmentationDeclaration(__go_module);
    }
    return GetSourceFileOfNode(declaration);
}
export function GetNonAugmentationDeclaration(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return Find$PointerTo_Named_ast$Node(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        return !IsExternalModuleAugmentation(d) && !IsGlobalScopeAugmentation(d);
    });
}
export function IsTypeDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindTypeParameter$constant():
        case KindClassDeclaration$constant():
        case KindInterfaceDeclaration$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindEnumDeclaration$constant(): {
            return true;
            break;
        }
        case KindImportClause$constant(): {
            return Node.IsTypeOnly(node);
            break;
        }
        case KindImportSpecifier$constant():
        case KindExportSpecifier$constant(): {
            return Node.IsTypeOnly(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function IsTypeDeclarationName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindIdentifier$constant() && IsTypeDeclaration(Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(GetNameOfDeclaration(Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), name);
}
export function IsRightSideOfPropertyAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyAccessExpression$constant() &&
        tsonicTypeScriptRuntime.sameLocation(Node.Name(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), node);
}
export function IsArgumentExpressionOfElementAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) && Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindElementAccessExpression$constant() &&
        tsonicTypeScriptRuntime.sameLocation(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression, node);
}
export function ClimbPastPropertyAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsRightSideOfPropertyAccess(node)) {
        return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return node;
}
export function climbPastPropertyOrElementAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsRightSideOfPropertyAccess(node) || IsArgumentExpressionOfElementAccess(node)) {
        return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    }
    return node;
}
export function selectExpressionOfCallOrNewExpressionOrDecorator(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsCallExpression(node) || IsNewExpression(node) || IsDecorator(node)) {
        return Node.Expression(node);
    }
    return void 0;
}
export function selectTagOfTaggedTemplateExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsTaggedTemplateExpression(node)) {
        return (Node.AsTaggedTemplateExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag;
    }
    return void 0;
}
export function selectTagNameOfJsxOpeningLikeElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsJsxOpeningElement(node) || IsJsxSelfClosingElement(node)) {
        return Node.TagName(node);
    }
    return void 0;
}
export function IsCallExpressionTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    return isCalleeWorker(node, IsCallExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}
export function IsNewExpressionTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    return isCalleeWorker(node, IsNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}
export function IsCallOrNewExpressionTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    return isCalleeWorker(node, IsCallOrNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}
export function IsTaggedTemplateTag(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    return isCalleeWorker(node, IsTaggedTemplateExpression, selectTagOfTaggedTemplateExpression, includeElementAccess, skipPastOuterExpressions);
}
export function IsDecoratorTarget(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    return isCalleeWorker(node, IsDecorator, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}
export function IsJsxOpeningLikeElementTagName(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    return isCalleeWorker(node, IsJsxOpeningLikeElement, selectTagNameOfJsxOpeningLikeElement, includeElementAccess, skipPastOuterExpressions);
}
export function isCalleeWorker(node: tsonicTypeScriptRuntime.Location<Node> | undefined, pred: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined, calleeSelector: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => tsonicTypeScriptRuntime.Location<Node> | undefined) | undefined, includeElementAccess: bool, skipPastOuterExpressions: bool): bool {
    let target: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    if (includeElementAccess) {
        target = climbPastPropertyOrElementAccess(node);
    }
    else {
        target = ClimbPastPropertyAccess(node);
    }
    if (skipPastOuterExpressions) {
        if (IsExpression(target)) {
            target = SkipOuterExpressions(target, OEKAll$constant());
        }
    }
    let __gotots_logical_result_0 = !(target === undefined) && !(Node.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_callee_27 = pred;
        const __gotots_argument_81 = Node.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        __gotots_logical_result_0 = (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_81);
    }
    let __gotots_logical_result_1 = __gotots_logical_result_0;
    if (__gotots_logical_result_1) {
        const __gotots_callee_28 = calleeSelector;
        const __gotots_argument_82 = Node.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        __gotots_logical_result_1 =
            tsonicTypeScriptRuntime.sameLocation((__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_82), target);
    }
    return __gotots_logical_result_1;
}
export function IsRightSideOfQualifiedNameOrPropertyAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindQualifiedName$constant(): {
            return tsonicTypeScriptRuntime.sameLocation((Node.AsQualifiedName(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, node);
            break;
        }
        case KindPropertyAccessExpression$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(parent)), node);
            break;
        }
        case KindMetaProperty$constant(): {
            return tsonicTypeScriptRuntime.sameLocation(MetaProperty.Name(Node.AsMetaProperty(parent)), node);
            break;
        }
    }
    return false;
}
export function ShouldTransformImportCall(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, impliedNodeFormatForEmit: ModuleKind__from_core): bool {
    let moduleKind = CompilerOptions__from_core.GetEmitModuleKind(options);
    if (ModuleKindNode16$constant__from_core() <= moduleKind && moduleKind <= ModuleKindNodeNext$constant__from_core() || moduleKind === ModuleKindPreserve$constant__from_core()) {
        return false;
    }
    return impliedNodeFormatForEmit < ModuleKindES2015$constant__from_core();
}
export function HasQuestionToken(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsQuestionToken(Node.QuestionToken(node));
}
export function IsJsxOpeningLikeElement(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsJsxOpeningElement(node) || IsJsxSelfClosingElement(node);
}
export function GetInvokedExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindTaggedTemplateExpression$constant(): {
            return (Node.AsTaggedTemplateExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag;
            break;
        }
        case KindJsxOpeningElement$constant():
        case KindJsxSelfClosingElement$constant(): {
            return Node.TagName(node);
            break;
        }
        case KindBinaryExpression$constant(): {
            return BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Right;
            break;
        }
        case KindJsxOpeningFragment$constant(): {
            return node;
            break;
        }
        default: {
            return Node.Expression(node);
            break;
        }
    }
}
export function IsCallOrNewExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsCallExpression(node) || IsNewExpression(node);
}
export function IndexOfNode(nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, node: tsonicTypeScriptRuntime.Location<Node> | undefined): int {
    const __gotots_results_5 = BinarySearchFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes, node, CompareNodePositions);
    let index = __gotots_results_5[0];
    let ok = __gotots_results_5[1];
    if (ok) {
        return index;
    }
    return -1;
}
export function CompareNodePositions(n1: tsonicTypeScriptRuntime.Location<Node> | undefined, n2: tsonicTypeScriptRuntime.Location<Node> | undefined): int {
    return CompareTextRanges__from_core(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node.$storageOf(((n1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc)), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node.$storageOf(((n2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc)));
}
export function IsUnterminatedLiteral(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsLiteralKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) && !((LiteralLikeNodeBase.$storageOf(((Node.LiteralLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralLikeNodeBase>).value).TokenFlags & TokenFlagsUnterminated$constant()) === 0) || IsTemplateLiteralKind(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) && !((((Node.TemplateLiteralLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase>).value.TemplateFlags & TokenFlagsUnterminated$constant()) === 0);
}
export function IsInitializedProperty(member: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindPropertyDeclaration$constant() && !(Node.Initializer(member) === undefined);
}
export function IsTrivia(token: Kind): bool {
    return KindFirstTriviaToken$constant() <= token && token <= KindLastTriviaToken$constant();
}
export function HasDecorators(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasSyntacticModifier(node, ModifierFlagsDecorator$constant());
}
export class hasFileNameImpl {
    declare private readonly $goType: void;
    public constructor(public fileName: gostring, public path: Path__from_tspath) {
    }
    declare private readonly then?: never;
    static FileName(h: hasFileNameImpl | undefined): gostring {
        return (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileName;
    }
    static Path(h: hasFileNameImpl | undefined): Path__from_tspath {
        return (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path;
    }
}
export function NewHasFileName(fileName: gostring, path: Path__from_tspath): HasFileName | undefined {
    return new $goInterfaceAdapter$PointerTo_Named_ast$hasFileNameImpl(new hasFileNameImpl(fileName, path));
}
export function GetSemanticJsxChildren(children: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    return Filter$PointerTo_Named_ast$Node(children, (i: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        switch (Node.$storageOf(((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJsxExpression$constant(): {
                return !(Node.Expression(i) === undefined);
                break;
            }
            case KindJsxText$constant(): {
                return !(Node.AsJsxText(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ContainsOnlyTriviaWhiteSpaces;
                break;
            }
            default: {
                return true;
                break;
            }
        }
    });
}
export function hasComment(kind: Kind): bool {
    switch (kind) {
        case KindJSDoc$constant():
        case KindJSDocUnknownTag$constant():
        case KindJSDocAugmentsTag$constant():
        case KindJSDocImplementsTag$constant():
        case KindJSDocDeprecatedTag$constant():
        case KindJSDocPublicTag$constant():
        case KindJSDocPrivateTag$constant():
        case KindJSDocProtectedTag$constant():
        case KindJSDocReadonlyTag$constant():
        case KindJSDocOverrideTag$constant():
        case KindJSDocCallbackTag$constant():
        case KindJSDocOverloadTag$constant():
        case KindJSDocParameterTag$constant():
        case KindJSDocPropertyTag$constant():
        case KindJSDocReturnTag$constant():
        case KindJSDocThisTag$constant():
        case KindJSDocTypeTag$constant():
        case KindJSDocTemplateTag$constant():
        case KindJSDocTypedefTag$constant():
        case KindJSDocSeeTag$constant():
        case KindJSDocThrowsTag$constant():
        case KindJSDocSatisfiesTag$constant():
        case KindJSDocImportTag$constant(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function IsAssignmentPattern(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindArrayLiteralExpression$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindObjectLiteralExpression$constant();
}
export function GetElementsOfBindingOrAssignmentPattern(name: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
    switch (Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindObjectBindingPattern$constant():
        case KindArrayBindingPattern$constant():
        case KindArrayLiteralExpression$constant(): {
            return Node.Elements(name);
            break;
        }
        case KindObjectLiteralExpression$constant(): {
            return Node.Properties(name);
            break;
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
}
export function IsDeclarationBindingElement(bindingElement: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindVariableDeclaration$constant():
        case KindParameter$constant():
        case KindBindingElement$constant(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function GetTargetOfBindingOrAssignmentElement(bindingElement: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (IsDeclarationBindingElement(bindingElement)) {
        return Node.Name(bindingElement);
    }
    if (IsObjectLiteralElement(bindingElement)) {
        switch (Node.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindPropertyAssignment$constant(): {
                return GetTargetOfBindingOrAssignmentElement(Node.Initializer(bindingElement));
                break;
            }
            case KindShorthandPropertyAssignment$constant(): {
                return Node.Name(bindingElement);
                break;
            }
            case KindSpreadAssignment$constant(): {
                return GetTargetOfBindingOrAssignmentElement(Node.Expression(bindingElement));
                break;
            }
        }
        return void 0;
    }
    if (IsAssignmentExpression(bindingElement, true)) {
        return GetTargetOfBindingOrAssignmentElement(BinaryExpression.$storageOf(((Node.AsBinaryExpression(bindingElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left);
    }
    if (IsSpreadElement(bindingElement)) {
        return GetTargetOfBindingOrAssignmentElement(Node.Expression(bindingElement));
    }
    return bindingElement;
}
export function TryGetPropertyNameOfBindingOrAssignmentElement(bindingElement: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBindingElement$constant(): {
            if (!(Node.PropertyName(bindingElement) === undefined)) {
                let propertyName: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.PropertyName(bindingElement);
                if (IsComputedPropertyName(propertyName) && IsStringOrNumericLiteralLike(Node.Expression(propertyName))) {
                    return Node.Expression(propertyName);
                }
                return propertyName;
            }
            break;
        }
        case KindPropertyAssignment$constant(): {
            if (!(Node.Name(bindingElement) === undefined)) {
                let propertyName: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Name(bindingElement);
                if (IsComputedPropertyName(propertyName) && IsStringOrNumericLiteralLike(Node.Expression(propertyName))) {
                    return Node.Expression(propertyName);
                }
                return propertyName;
            }
            break;
        }
        case KindSpreadAssignment$constant(): {
            return Node.Name(bindingElement);
            break;
        }
    }
    let target: tsonicTypeScriptRuntime.Location<Node> | undefined = GetTargetOfBindingOrAssignmentElement(bindingElement);
    if (!(target === undefined) && IsPropertyName(target)) {
        return target;
    }
    return void 0;
}
export function ContainsObjectRestOrSpread(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!((Node.SubtreeFacts(node) & SubtreeContainsObjectRestOrSpread$constant()) >>> 0 === 0)) {
        return true;
    }
    if (!((Node.SubtreeFacts(node) & SubtreeContainsESObjectRestOrSpread$constant()) >>> 0 === 0)) {
        const __gotots_range_14 = GetElementsOfBindingOrAssignmentPattern(node);
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
            const __gotots_range_value_14 = __gotots_range_14.get(__gotots_range_index_14);
            let element: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_14;
            let target: tsonicTypeScriptRuntime.Location<Node> | undefined = GetTargetOfBindingOrAssignmentElement(element);
            if (!(target === undefined) && IsAssignmentPattern(target)) {
                if (!((Node.SubtreeFacts(target) & SubtreeContainsObjectRestOrSpread$constant()) >>> 0 === 0)) {
                    return true;
                }
                if (!((Node.SubtreeFacts(target) & SubtreeContainsESObjectRestOrSpread$constant()) >>> 0 === 0)) {
                    if (ContainsObjectRestOrSpread(target)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
export function IsEmptyObjectLiteral(expression: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsObjectLiteralExpression(expression) && Node.Properties(expression).length === 0;
}
export function IsEmptyArrayLiteral(expression: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsArrayLiteralExpression(expression) && Node.Elements(expression).length === 0;
}
export function GetRestIndicatorOfBindingOrAssignmentElement(bindingElement: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindParameter$constant(): {
            return ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(bindingElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).DotDotDotToken;
            break;
        }
        case KindBindingElement$constant(): {
            return (Node.AsBindingElement(bindingElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken;
            break;
        }
        case KindSpreadElement$constant():
        case KindSpreadAssignment$constant(): {
            return bindingElement;
            break;
        }
    }
    return void 0;
}
export function IsJSDocNameReferenceContext(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsJSDoc$constant()) >>> 0 === 0) && !(FindAncestor(node, (node__shadow_1: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        return IsJSDocNameReference(node__shadow_1) || IsJSDocLinkLike(node__shadow_1);
    }) === undefined);
}
export function GetJSDocRoot(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return FindAncestor(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, (n: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        return Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindJSDoc$constant();
    });
}
export function GetJSDocHost(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let jsDoc: tsonicTypeScriptRuntime.Location<Node> | undefined = GetJSDocRoot(node);
    if (jsDoc === undefined) {
        return void 0;
    }
    return Node.$storageOf(((jsDoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
}
export function GetHostSignatureFromJSDoc(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let host: tsonicTypeScriptRuntime.Location<Node> | undefined = GetJSDocHost(node);
    if (host === undefined) {
        return void 0;
    }
    if (IsPropertySignatureDeclaration(host) && !(Node.Type(host) === undefined) && IsFunctionLike(Node.Type(host))) {
        return Node.Type(host);
    }
    if (IsFunctionLike(host)) {
        return host;
    }
    return void 0;
}
export function GetNextJSDocCommentLocation(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    {
        let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
        if (!(parent === undefined)) {
            switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
                case KindPropertyAssignment$constant():
                case KindExportAssignment$constant():
                case KindPropertyDeclaration$constant():
                case KindVariableDeclaration$constant():
                case KindSatisfiesExpression$constant():
                case KindReturnStatement$constant():
                case KindVariableStatement$constant():
                case KindExpressionStatement$constant(): {
                    return parent;
                    break;
                }
                case KindVariableDeclarationList$constant(): {
                    if (tsonicTypeScriptRuntime.sameLocation(NodeList.$storageOf(((VariableDeclarationList.$storageOf(((Node.AsVariableDeclarationList(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(0), node)) {
                        return parent;
                    }
                    break;
                }
            }
        }
    }
    return void 0;
}
export function IsImportOrImportEqualsDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsImportDeclaration(node) || IsImportEqualsDeclaration(node);
}
export function IsPrimitiveLiteralValue(node: tsonicTypeScriptRuntime.Location<Node> | undefined, includeBigInt: bool): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindTrueKeyword$constant():
        case KindFalseKeyword$constant():
        case KindNumericLiteral$constant():
        case KindStringLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant(): {
            return true;
            break;
        }
        case KindBigIntLiteral$constant(): {
            return includeBigInt;
            break;
        }
        case KindPrefixUnaryExpression$constant(): {
            if (PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindMinusToken$constant()) {
                return IsNumericLiteral(PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operand) || (includeBigInt && IsBigIntLiteral(PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operand));
            }
            if (PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator === KindPlusToken$constant()) {
                return IsNumericLiteral(PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operand);
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
export function HasInferredType(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindParameter$constant():
        case KindPropertySignature$constant():
        case KindPropertyDeclaration$constant():
        case KindBindingElement$constant():
        case KindPropertyAccessExpression$constant():
        case KindElementAccessExpression$constant():
        case KindBinaryExpression$constant():
        case KindCallExpression$constant():
        case KindVariableDeclaration$constant():
        case KindExportAssignment$constant():
        case KindPropertyAssignment$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindJSDocParameterTag$constant():
        case KindJSDocPropertyTag$constant(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function IsKeyword(token: Kind): bool {
    return KindFirstKeyword$constant() <= token && token <= KindLastKeyword$constant();
}
export function IsNonContextualKeyword(token: Kind): bool {
    return IsKeyword(token) && !IsContextualKeyword(token);
}
export function HasModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined, flags: ModifierFlags): bool {
    return !((Node.ModifierFlags(node) & flags) >>> 0 === 0);
}
export function IsExpandoInitializer(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (initializer === undefined) {
        return false;
    }
    if (IsFunctionExpressionOrArrowFunction(initializer)) {
        return true;
    }
    if (IsInJSFile(initializer)) {
        return IsClassExpression(initializer) || (IsObjectLiteralExpression(initializer) && Node.Properties(initializer).length === 0 && Node.Type(declaration) === undefined);
    }
    return false;
}
export function GetContainingFunction(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return FindAncestor(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, IsFunctionLike);
}
export function ImportFromModuleSpecifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    {
        let result: tsonicTypeScriptRuntime.Location<Node> | undefined = TryGetImportFromModuleSpecifier(node);
        if (!(result === undefined)) {
            return result;
        }
    }
    FailBadSyntaxKind__from_debug(new $goInterfaceAdapter$PointerTo_Named_ast$Node(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), RuntimeSlice.nil<GoInterface | undefined>());
    return void 0;
}
export function TryGetImportFromModuleSpecifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    switch (Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindImportDeclaration$constant():
        case KindJSImportDeclaration$constant():
        case KindExportDeclaration$constant(): {
            return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
            break;
        }
        case KindExternalModuleReference$constant(): {
            return Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
            break;
        }
        case KindCallExpression$constant(): {
            if (IsImportCall(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || IsRequireCall(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, false)) {
                return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
            }
            return void 0;
            break;
        }
        case KindLiteralType$constant(): {
            if (!IsStringLiteral(node)) {
                return void 0;
            }
            if (IsImportTypeNode(Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent)) {
                return Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
            }
            return void 0;
            break;
        }
    }
    return void 0;
}
export function IsImplicitlyExportedJSDocDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!IsSourceFile(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) || !IsExternalOrCommonJSModule(Node.AsSourceFile(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent))) {
        return false;
    }
    if (IsJSTypeAliasDeclaration(node)) {
        return true;
    }
    return IsModuleDeclaration(node) && !((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsReparsed$constant()) >>> 0 === 0);
}
export function HasContextSensitiveParameters(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (Node.TypeParameters(node).isNil()) {
        if (Some$PointerTo_Named_ast$Node(Node.Parameters(node), (p: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
            return Node.Type(p) === undefined;
        })) {
            return true;
        }
        if (!IsArrowFunction(node)) {
            let parameter: tsonicTypeScriptRuntime.Location<Node> | undefined = FirstOrNil$PointerTo_Named_ast$Node(Node.Parameters(node));
            if (parameter === undefined || !IsThisParameter(parameter)) {
                return !((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsContainsThis$constant()) >>> 0 === 0);
            }
        }
    }
    return false;
}
export function IsInfinityOrNaNString(name: gostring): bool {
    return name === "Infinity" || name === "-Infinity" || name === "NaN";
}
export function GetFirstConstructorWithBody(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_range_5 = Node.Members(node);
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let member: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_5;
        if (IsConstructorDeclaration(member) && NodeIsPresent(Node.Body(member))) {
            return member;
        }
    }
    return void 0;
}
export function IsPotentiallyExecutableNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (KindFirstStatement$constant() <= Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind && Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind <= KindLastStatement$constant()) {
        if (IsVariableStatement(node)) {
            let declarationList: tsonicTypeScriptRuntime.Location<Node> | undefined = VariableStatement.$storageOf(((Node.AsVariableStatement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement>).value).DeclarationList;
            if (!((GetCombinedNodeFlags(declarationList) & NodeFlagsBlockScoped$constant()) >>> 0 === 0)) {
                return true;
            }
            let declarations = NodeList.$storageOf(((VariableDeclarationList.$storageOf(((Node.AsVariableDeclarationList(declarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
            return Some$PointerTo_Named_ast$Node(declarations, (d: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
                return !(Node.Initializer(d) === undefined);
            });
        }
        return true;
    }
    return IsClassDeclaration(node) || IsEnumDeclaration(node) || IsModuleDeclaration(node);
}
export function HasAbstractModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasSyntacticModifier(node, ModifierFlagsAbstract$constant());
}
export function HasAmbientModifier(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasSyntacticModifier(node, ModifierFlagsAmbient$constant());
}
export function NodeCanBeDecorated(useLegacyDecorators: bool, node: tsonicTypeScriptRuntime.Location<Node> | undefined, parent: tsonicTypeScriptRuntime.Location<Node> | undefined, grandparent: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (useLegacyDecorators && !(Node.Name(node) === undefined) && IsPrivateIdentifier(Node.Name(node))) {
        return false;
    }
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindClassDeclaration$constant(): {
            return true;
            break;
        }
        case KindClassExpression$constant(): {
            return !useLegacyDecorators;
            break;
        }
        case KindPropertyDeclaration$constant(): {
            return !(parent === undefined) && (useLegacyDecorators && IsClassDeclaration(parent) || !useLegacyDecorators && IsClassLike(parent) && !HasAbstractModifier(node) && !HasAmbientModifier(node));
            break;
        }
        case KindGetAccessor$constant():
        case KindSetAccessor$constant():
        case KindMethodDeclaration$constant(): {
            return !(parent === undefined) && !(Node.Body(node) === undefined) && (useLegacyDecorators && IsClassDeclaration(parent) || !useLegacyDecorators && IsClassLike(parent));
            break;
        }
        case KindParameter$constant(): {
            if (!useLegacyDecorators) {
                return false;
            }
            return !(parent === undefined) && !(Node.Body(parent) === undefined) && (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindConstructor$constant() || Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindMethodDeclaration$constant() || Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSetAccessor$constant()) && !tsonicTypeScriptRuntime.sameLocation(GetThisParameter(parent), node) && !(grandparent === undefined) && Node.$storageOf(((grandparent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindClassDeclaration$constant();
            break;
        }
    }
    return false;
}
export function ClassOrConstructorParameterIsDecorated(useLegacyDecorators: bool, node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (NodeIsDecorated(useLegacyDecorators, node, void 0, void 0)) {
        return true;
    }
    let __go_constructor: tsonicTypeScriptRuntime.Location<Node> | undefined = GetFirstConstructorWithBody(node);
    return !(__go_constructor === undefined) && ChildIsDecorated(useLegacyDecorators, __go_constructor, node);
}
export function ClassElementOrClassElementParameterIsDecorated(useLegacyDecorators: bool, node: tsonicTypeScriptRuntime.Location<Node> | undefined, parent: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let parameters: tsonicTypeScriptRuntime.Location<NodeList> | undefined = void 0;
    if (IsAccessor(node)) {
        let decls = GetAllAccessorDeclarations(Node.Members(parent), node);
        let firstAccessorWithDecorators: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
        if (HasDecorators(decls.FirstAccessor)) {
            firstAccessorWithDecorators = decls.FirstAccessor;
        }
        else if (!(decls.SecondAccessor === undefined) && HasDecorators(decls.SecondAccessor)) {
            firstAccessorWithDecorators = decls.SecondAccessor;
        }
        if (firstAccessorWithDecorators === undefined || !tsonicTypeScriptRuntime.sameLocation(node, firstAccessorWithDecorators)) {
            return false;
        }
        if (!(decls.SetAccessor === undefined)) {
            parameters = (void FunctionLikeBase.$storageOf, (void FunctionLikeBase.$fromStorage,
                FunctionLikeWithBodyBase.$storageOf((decls.SetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        }
    }
    else if (IsMethodDeclaration(node)) {
        parameters = Node.ParameterList(node);
    }
    if (NodeIsDecorated(useLegacyDecorators, node, parent, void 0)) {
        return true;
    }
    if (!(parameters === undefined) && NodeList.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length > 0) {
        const __gotots_range_11 = NodeList.$storageOf(((parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
            const __gotots_range_value_11 = __gotots_range_11.get(__gotots_range_index_11);
            let parameter: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_11;
            if (IsThisParameter(parameter)) {
                continue;
            }
            if (NodeIsDecorated(useLegacyDecorators, parameter, node, parent)) {
                return true;
            }
        }
    }
    return false;
}
export function NodeIsDecorated(useLegacyDecorators: bool, node: tsonicTypeScriptRuntime.Location<Node> | undefined, parent: tsonicTypeScriptRuntime.Location<Node> | undefined, grandparent: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasDecorators(node) && NodeCanBeDecorated(useLegacyDecorators, node, parent, grandparent);
}
export function NodeOrChildIsDecorated(useLegacyDecorators: bool, node: tsonicTypeScriptRuntime.Location<Node> | undefined, parent: tsonicTypeScriptRuntime.Location<Node> | undefined, grandparent: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return NodeIsDecorated(useLegacyDecorators, node, parent, grandparent) || ChildIsDecorated(useLegacyDecorators, node, parent);
}
export function ChildIsDecorated(useLegacyDecorators: bool, node: tsonicTypeScriptRuntime.Location<Node> | undefined, parent: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindClassDeclaration$constant():
        case KindClassExpression$constant(): {
            return Some$PointerTo_Named_ast$Node(Node.Members(node), (m: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
                return NodeOrChildIsDecorated(useLegacyDecorators, m, node, parent);
            });
            break;
        }
        case KindMethodDeclaration$constant():
        case KindSetAccessor$constant():
        case KindConstructor$constant(): {
            return Some$PointerTo_Named_ast$Node(Node.Parameters(node), (p: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
                return NodeIsDecorated(useLegacyDecorators, p, node, parent);
            });
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export class AllAccessorDeclarations {
    declare private readonly $goType: void;
    public constructor(public FirstAccessor: tsonicTypeScriptRuntime.Location<Node> | undefined, public SecondAccessor: tsonicTypeScriptRuntime.Location<Node> | undefined, public SetAccessor: {
        value: SetAccessorDeclaration;
    } | undefined, public GetAccessor: {
        value: GetAccessorDeclaration;
    } | undefined) {
    }
    static $copy($source: AllAccessorDeclarations): AllAccessorDeclarations {
        return new AllAccessorDeclarations($source.FirstAccessor, $source.SecondAccessor, $source.SetAccessor, $source.GetAccessor);
    }
    declare private readonly then?: never;
}
export function GetAllAccessorDeclarationsForDeclaration(__go_accessor: tsonicTypeScriptRuntime.Location<Node> | undefined, declarationsOfSymbol: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>): AllAccessorDeclarations {
    let otherKind = 0;
    if (Node.$storageOf(((__go_accessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSetAccessor$constant()) {
        otherKind = KindGetAccessor$constant();
    }
    else if (Node.$storageOf(((__go_accessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindGetAccessor$constant()) {
        otherKind = KindSetAccessor$constant();
    }
    else {
        const __gotots_argument_34 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unexpected node kind %q", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node.$storageOf(((__go_accessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)])));
        GoPanic.raise(__gotots_argument_34 === undefined ? GoPanicNilValue.create() : __gotots_argument_34);
    }
    let otherAccessor: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    const __gotots_range_12 = declarationsOfSymbol;
    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
        const __gotots_range_value_12 = __gotots_range_12.get(__gotots_range_index_12);
        let d: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_12;
        if (Node.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === otherKind) {
            otherAccessor = d;
            break;
        }
    }
    let firstAccessor: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    let secondAccessor: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    if (!(otherAccessor === undefined) && (Node.Pos(otherAccessor) < Node.Pos(__go_accessor))) {
        firstAccessor = otherAccessor;
        secondAccessor = __go_accessor;
    }
    else {
        firstAccessor = __go_accessor;
        secondAccessor = otherAccessor;
    }
    let setAccessor: {
        value: SetAccessorDeclaration;
    } | undefined = void 0;
    let getAccessor: {
        value: GetAccessorDeclaration;
    } | undefined = void 0;
    if (Node.$storageOf(((__go_accessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSetAccessor$constant()) {
        setAccessor = Node.AsSetAccessorDeclaration(__go_accessor);
        if (!(otherAccessor === undefined)) {
            getAccessor = Node.AsGetAccessorDeclaration(otherAccessor);
        }
    }
    else {
        getAccessor = Node.AsGetAccessorDeclaration(__go_accessor);
        if (!(otherAccessor === undefined)) {
            setAccessor = Node.AsSetAccessorDeclaration(otherAccessor);
        }
    }
    return new AllAccessorDeclarations(firstAccessor, secondAccessor, setAccessor, getAccessor);
}
export function GetAllAccessorDeclarations(parentDeclarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, __go_accessor: tsonicTypeScriptRuntime.Location<Node> | undefined): AllAccessorDeclarations {
    if (HasDynamicName(__go_accessor)) {
        return GetAllAccessorDeclarationsForDeclaration(__go_accessor, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node> | undefined>([__go_accessor]));
    }
    let accessorName = GetPropertyNameForPropertyNameNode(Node.Name(__go_accessor));
    let accessorStatic = IsStatic(__go_accessor);
    let matches = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    const __gotots_range_13 = parentDeclarations;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
        const __gotots_range_value_13 = __gotots_range_13.get(__gotots_range_index_13);
        let member: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_13;
        if (!IsAccessor(member) || IsStatic(member) !== accessorStatic) {
            continue;
        }
        let memberName = GetPropertyNameForPropertyNameNode(Node.Name(member));
        if (memberName === accessorName) {
            matches = matches.append(void 0, [member]);
        }
    }
    return GetAllAccessorDeclarationsForDeclaration(__go_accessor, matches);
}
export function IsAsyncFunction(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindFunctionDeclaration$constant():
        case KindFunctionExpression$constant():
        case KindArrowFunction$constant():
        case KindMethodDeclaration$constant(): {
            let data: tsonicTypeScriptRuntime.Location<BodyBase> | undefined = Node.BodyData(node);
            return !(BodyBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase>).value).Body === undefined) && BodyBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase>).value).AsteriskToken === undefined && HasSyntacticModifier(node, ModifierFlagsAsync$constant());
            break;
        }
    }
    return false;
}
export function GetRestParameterElementType(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (node === undefined) {
        return node;
    }
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindArrayType$constant()) {
        return ArrayTypeNode.$storageOf(((Node.AsArrayTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ArrayTypeNode>).value).ElementType;
    }
    if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeReference$constant() && !((void NodeWithTypeArgumentsBase.$storageOf, (void NodeWithTypeArgumentsBase.$fromStorage,
        TypeReferenceNode.$storageOf(((Node.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode>).value).NodeWithTypeArgumentsBase)).TypeArguments === undefined)) {
        return FirstOrNil$PointerTo_Named_ast$Node(NodeList.$storageOf((((void NodeWithTypeArgumentsBase.$storageOf, (void NodeWithTypeArgumentsBase.$fromStorage,
            TypeReferenceNode.$storageOf(((Node.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode>).value).NodeWithTypeArgumentsBase)).TypeArguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes);
    }
    return void 0;
}
export function TagNamesAreEquivalent(lhs: tsonicTypeScriptRuntime.Location<Node> | undefined, rhs: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!(Node.$storageOf(((lhs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === Node.$storageOf(((rhs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)) {
        return false;
    }
    switch (Node.$storageOf(((lhs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindIdentifier$constant(): {
            return Node.Text(lhs) === Node.Text(rhs);
            break;
        }
        case KindThisKeyword$constant(): {
            return true;
            break;
        }
        case KindJsxNamespacedName$constant(): {
            return Node.Text((Node.AsJsxNamespacedName(lhs) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace) === Node.Text((Node.AsJsxNamespacedName(rhs) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace) && Node.Text(JsxNamespacedName.Name(Node.AsJsxNamespacedName(lhs))) === Node.Text(JsxNamespacedName.Name(Node.AsJsxNamespacedName(rhs)));
            break;
        }
        case KindPropertyAccessExpression$constant(): {
            return Node.Text(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(lhs))) === Node.Text(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(rhs))) && TagNamesAreEquivalent(Node.Expression(lhs), Node.Expression(rhs));
            break;
        }
    }
    const __gotots_argument_8 = new GoInterfaceAdapter("Unhandled case in TagNamesAreEquivalent");
    GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function IsTagName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) && IsJSDocTag(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node.TagName(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent), node);
}
export function literalIsName(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return IsDeclarationName(node) || Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExternalModuleReference$constant() || isArgumentOfElementAccessExpression(node) || IsLiteralComputedPropertyDeclarationName(node);
}
export function isArgumentOfElementAccessExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && !(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) && Node.$storageOf(((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindElementAccessExpression$constant() &&
        tsonicTypeScriptRuntime.sameLocation(ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).ArgumentExpression, node);
}
export function GetReparsedNodeForNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (!(node === undefined) && !((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsJSDoc$constant()) >>> 0 === 0) && (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsReparsed$constant()) >>> 0 === 0) {
        {
            let file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined = GetSourceFileOfNode(node);
            if (!(file === undefined) && ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ReparsedClones.length !== 0) {
                const __gotots_results_2 = BinarySearchFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ReparsedClones, node, CompareNodePositions);
                let pos = __gotots_results_2[0];
                let found = __gotots_results_2[1];
                if (!found && pos > 0) {
                    pos--;
                }
                let candidate: tsonicTypeScriptRuntime.Location<Node> | undefined = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ReparsedClones.get(pos);
                if (TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node.$storageOf(((candidate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc)))) {
                    {
                        let reparsed: tsonicTypeScriptRuntime.Location<Node> | undefined = findCloneInNode(candidate, node);
                        if (!(reparsed === undefined)) {
                            return reparsed;
                        }
                    }
                }
            }
        }
    }
    return node;
}
export function findCloneInNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined, original: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (;;) {
        if (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === Node.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind && TextRange__from_core.$equal(TextRange__from_core.$fromStorage(Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc), TextRange__from_core.$fromStorage(Node.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc))) {
            return node;
        }
        let foundContainingChild = Node.ForEachChild(node, new Visitor((n: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
            if (TextRange__from_core.$fromStorage(Node.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc)))) {
                node = n;
                return true;
            }
            return false;
        }));
        if (!foundContainingChild) {
            return void 0;
        }
    }
}
export function IsExpandoPropertyDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(node === undefined) && IsBinaryExpression(node);
}
export function IsSuperProperty(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (IsPropertyAccessExpression(node) || IsElementAccessExpression(node)) && Node.$storageOf(((Node.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindSuperKeyword$constant();
}
export function IsNamedEvaluationSource(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    switch (Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindPropertyAssignment$constant(): {
            return !IsProtoSetter(PropertyAssignment.Name(Node.AsPropertyAssignment(node)));
            break;
        }
        case KindShorthandPropertyAssignment$constant(): {
            return !((Node.AsShorthandPropertyAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer === undefined);
            break;
        }
        case KindVariableDeclaration$constant(): {
            return IsIdentifier(VariableDeclaration.Name(Node.AsVariableDeclaration(node))) && !(Node.Initializer(node) === undefined);
            break;
        }
        case KindParameter$constant(): {
            return IsIdentifier(ParameterDeclaration.Name(Node.AsParameterDeclaration(node))) && !(Node.Initializer(node) === undefined) && ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).DotDotDotToken === undefined;
            break;
        }
        case KindBindingElement$constant(): {
            return IsIdentifier(BindingElement.Name(Node.AsBindingElement(node))) && !(Node.Initializer(node) === undefined) && (Node.AsBindingElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined;
            break;
        }
        case KindPropertyDeclaration$constant(): {
            return !(Node.Initializer(node) === undefined);
            break;
        }
        case KindBinaryExpression$constant(): {
            switch (Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
                case KindEqualsToken$constant():
                case KindAmpersandAmpersandEqualsToken$constant():
                case KindBarBarEqualsToken$constant():
                case KindQuestionQuestionEqualsToken$constant(): {
                    return IsIdentifier(BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left);
                    break;
                }
            }
            break;
        }
        case KindExportAssignment$constant(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsProtoSetter(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return (IsIdentifier(node) || IsStringLiteral(node)) && Node.Text(node) === "__proto__";
}
