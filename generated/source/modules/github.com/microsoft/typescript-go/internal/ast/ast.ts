import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { LanguageVariant as LanguageVariant__from_core, ModuleKind as ModuleKind__from_core, ScriptKind as ScriptKind__from_core, TextPos as TextPos__from_core, TextRange$Storage as TextRange__from_core$Storage, Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ArrayLiteralExpression, ArrayTypeNode, ArrayTypeNode$Storage as ArrayTypeNode__from_ast$Storage, ArrowFunction, AsExpression, AwaitExpression, BigIntLiteral, BinaryExpression$Storage as BinaryExpression__from_ast$Storage, BindingElement, BindingPattern, Block$Storage as Block__from_ast$Storage, BreakStatement, CallExpression$Storage as CallExpression__from_ast$Storage, CallSignatureDeclaration, CaseBlock, CaseOrDefaultClause, CatchClause, ClassDeclaration, ClassExpression, ClassLikeBase, ClassStaticBlockDeclaration, ComputedPropertyName, ConditionalExpression$Storage as ConditionalExpression__from_ast$Storage, ConditionalTypeNode, ConstructSignatureDeclaration, ConstructSignatureDeclaration$Storage as ConstructSignatureDeclaration__from_ast$Storage, ConstructorDeclaration, ConstructorTypeNode, ContinueStatement, DebuggerStatement, Decorator, DeleteExpression, DoStatement, ElementAccessExpression$Storage as ElementAccessExpression__from_ast$Storage, EmptyStatement, EnumDeclaration, EnumMember, ExportAssignment, ExportDeclaration, ExportSpecifier, ExpressionStatement$Storage as ExpressionStatement__from_ast$Storage, ExpressionWithTypeArguments$Storage as ExpressionWithTypeArguments__from_ast$Storage, ExternalModuleReference, FlowNodeBase, ForInOrOfStatement, ForStatement, FunctionDeclaration$Storage as FunctionDeclaration__from_ast$Storage, FunctionExpression, FunctionTypeNode, FunctionTypeNode$Storage as FunctionTypeNode__from_ast$Storage, GetAccessorDeclaration, HeritageClause, HeritageClause$Storage as HeritageClause__from_ast$Storage, Identifier$Storage as Identifier__from_ast$Storage, IfStatement$Storage as IfStatement__from_ast$Storage, ImportAttributes, ImportClause, ImportDeclaration, ImportEqualsDeclaration, ImportSpecifier$Storage as ImportSpecifier__from_ast$Storage, ImportTypeNode, IndexSignatureDeclaration, IndexedAccessTypeNode, IndexedAccessTypeNode$Storage as IndexedAccessTypeNode__from_ast$Storage, InferTypeNode, InterfaceDeclaration$Storage as InterfaceDeclaration__from_ast$Storage, IntersectionTypeNode, IntersectionTypeNode$Storage as IntersectionTypeNode__from_ast$Storage, JSDocAllType, JSDocAugmentsTag, JSDocCallbackTag, JSDocDeprecatedTag$Storage as JSDocDeprecatedTag__from_ast$Storage, JSDocImplementsTag, JSDocImportTag, JSDocLink, JSDocLinkCode, JSDocLinkPlain, JSDocNameReference, JSDocNonNullableType, JSDocNullableType, JSDocOptionalType, JSDocOverloadTag, JSDocOverrideTag, JSDocParameterOrPropertyTag, JSDocPrivateTag, JSDocProtectedTag, JSDocPublicTag, JSDocReadonlyTag, JSDocReturnTag, JSDocSatisfiesTag, JSDocSeeTag, JSDocSignature, JSDocTemplateTag, JSDocText$Storage as JSDocText__from_ast$Storage, JSDocThisTag, JSDocThrowsTag, JSDocTypeExpression, JSDocTypeLiteral, JSDocTypeTag, JSDocTypedefTag, JSDocUnknownTag$Storage as JSDocUnknownTag__from_ast$Storage, JSDocVariadicType, JSDoc$Storage as JSDoc__from_ast$Storage, JsxAttribute, JsxAttributes, JsxClosingElement, JsxClosingFragment, JsxElement, JsxExpression, JsxFragment, JsxNamespacedName, JsxOpeningElement, JsxOpeningFragment, JsxSelfClosingElement, JsxSpreadAttribute, JsxText, KeywordExpression, KeywordExpression$Storage as KeywordExpression__from_ast$Storage, KeywordTypeNode, KeywordTypeNode$Storage as KeywordTypeNode__from_ast$Storage, LabeledStatement, LiteralTypeNode, LiteralTypeNode$Storage as LiteralTypeNode__from_ast$Storage, MappedTypeNode, MethodDeclaration, MethodSignatureDeclaration$Storage as MethodSignatureDeclaration__from_ast$Storage, MissingDeclaration, ModuleBlock, ModuleDeclaration, NamedExports, NamedImports, NamedTupleMember, NamespaceExportDeclaration, NamespaceImport, NewExpression, NoSubstitutionTemplateLiteral, NonNullExpression, NotEmittedStatement, NotEmittedTypeElement, NumericLiteral$Storage as NumericLiteral__from_ast$Storage, ObjectLiteralExpression, OptionalTypeNode, ParameterDeclaration$Storage as ParameterDeclaration__from_ast$Storage, ParenthesizedExpression$Storage as ParenthesizedExpression__from_ast$Storage, ParenthesizedTypeNode$Storage as ParenthesizedTypeNode__from_ast$Storage, PartiallyEmittedExpression, PostfixUnaryExpression, PrefixUnaryExpression$Storage as PrefixUnaryExpression__from_ast$Storage, PrivateIdentifier, PropertyAccessExpression$Storage as PropertyAccessExpression__from_ast$Storage, PropertyAssignment$Storage as PropertyAssignment__from_ast$Storage, PropertyDeclaration, PropertySignatureDeclaration$Storage as PropertySignatureDeclaration__from_ast$Storage, QualifiedName, RegularExpressionLiteral, RestTypeNode, ReturnStatement$Storage as ReturnStatement__from_ast$Storage, SatisfiesExpression, SemicolonClassElement, SetAccessorDeclaration, ShorthandPropertyAssignment, SpreadAssignment, SpreadElement, StringLiteral$Storage as StringLiteral__from_ast$Storage, SwitchStatement, SyntaxList, SyntheticExpression, SyntheticReferenceExpression, TaggedTemplateExpression, TemplateExpression, TemplateHead, TemplateLiteralLikeNodeBase, TemplateLiteralTypeNode, TemplateLiteralTypeSpan, TemplateMiddle, TemplateSpan, TemplateTail, ThisTypeNode, ThrowStatement, Token, Token$Storage as Token__from_ast$Storage, TryStatement, TupleTypeNode, TypeAliasDeclaration$Storage as TypeAliasDeclaration__from_ast$Storage, TypeAssertion, TypeLiteralNode$Storage as TypeLiteralNode__from_ast$Storage, TypeOfExpression, TypeOperatorNode$Storage as TypeOperatorNode__from_ast$Storage, TypeParameterDeclaration, TypeParameterDeclaration$Storage as TypeParameterDeclaration__from_ast$Storage, TypePredicateNode, TypeQueryNode, TypeReferenceNode$Storage as TypeReferenceNode__from_ast$Storage, UnionTypeNode, UnionTypeNode$Storage as UnionTypeNode__from_ast$Storage, VariableDeclarationList, VariableDeclarationList$Storage as VariableDeclarationList__from_ast$Storage, VariableDeclaration$Storage as VariableDeclaration__from_ast$Storage, VariableStatement, VariableStatement$Storage as VariableStatement__from_ast$Storage, VoidExpression, WhileStatement, WithStatement, YieldExpression } from "./ast_generated.js";
import type { Diagnostic } from "./diagnostic.js";
import type { FlowNode, FlowReduceLabelData, FlowSwitchClauseData } from "./flow.js";
import type { Kind } from "./kind_generated.js";
import type { ModifierFlags } from "./modifierflags.js";
import type { NodeFlags } from "./nodeflags.js";
import type { positionMapEntry$Storage as positionMapEntry__from_ast$Storage } from "./positionmap.js";
import type { SubtreeFacts } from "./subtreefacts.js";
import type { Symbol } from "./symbol.js";
import type { TokenFlags } from "./tokenflags.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int16, int32, uint32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/state.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Arena as Arena__from_core, ComputeECMALineStarts as ComputeECMALineStarts__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, NewTextRange as NewTextRange__from_core, Pattern as Pattern__from_core, ResolutionModeESM$constant as ResolutionModeESM$constant__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core, TextRange as TextRange__from_core, UndefinedTextRange as UndefinedTextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Arena$New$Named_ast$ModifierList } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Arena$New.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$PointerTo_Named_ast$ArrayLiteralExpression, $goInterfaceAdapter$PointerTo_Named_ast$ArrayTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$ArrowFunction, $goInterfaceAdapter$PointerTo_Named_ast$AsExpression, $goInterfaceAdapter$PointerTo_Named_ast$AwaitExpression, $goInterfaceAdapter$PointerTo_Named_ast$BigIntLiteral, $goInterfaceAdapter$PointerTo_Named_ast$BinaryExpression, $goInterfaceAdapter$PointerTo_Named_ast$BindingElement, $goInterfaceAdapter$PointerTo_Named_ast$BindingPattern, $goInterfaceAdapter$PointerTo_Named_ast$Block, $goInterfaceAdapter$PointerTo_Named_ast$BreakStatement, $goInterfaceAdapter$PointerTo_Named_ast$CallExpression, $goInterfaceAdapter$PointerTo_Named_ast$CallSignatureDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$CaseBlock, $goInterfaceAdapter$PointerTo_Named_ast$CaseOrDefaultClause, $goInterfaceAdapter$PointerTo_Named_ast$CatchClause, $goInterfaceAdapter$PointerTo_Named_ast$ClassDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ClassExpression, $goInterfaceAdapter$PointerTo_Named_ast$ClassStaticBlockDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ComputedPropertyName, $goInterfaceAdapter$PointerTo_Named_ast$ConditionalExpression, $goInterfaceAdapter$PointerTo_Named_ast$ConditionalTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$ConstructSignatureDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ConstructorDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ConstructorTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$ContinueStatement, $goInterfaceAdapter$PointerTo_Named_ast$DebuggerStatement, $goInterfaceAdapter$PointerTo_Named_ast$Decorator, $goInterfaceAdapter$PointerTo_Named_ast$DeleteExpression, $goInterfaceAdapter$PointerTo_Named_ast$DoStatement, $goInterfaceAdapter$PointerTo_Named_ast$ElementAccessExpression, $goInterfaceAdapter$PointerTo_Named_ast$EmptyStatement, $goInterfaceAdapter$PointerTo_Named_ast$EnumDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$EnumMember, $goInterfaceAdapter$PointerTo_Named_ast$ExportAssignment, $goInterfaceAdapter$PointerTo_Named_ast$ExportDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ExportSpecifier, $goInterfaceAdapter$PointerTo_Named_ast$ExpressionStatement, $goInterfaceAdapter$PointerTo_Named_ast$ExpressionWithTypeArguments, $goInterfaceAdapter$PointerTo_Named_ast$ExternalModuleReference, $goInterfaceAdapter$PointerTo_Named_ast$FlowReduceLabelData, $goInterfaceAdapter$PointerTo_Named_ast$FlowSwitchClauseData, $goInterfaceAdapter$PointerTo_Named_ast$ForInOrOfStatement, $goInterfaceAdapter$PointerTo_Named_ast$ForStatement, $goInterfaceAdapter$PointerTo_Named_ast$FunctionDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$FunctionExpression, $goInterfaceAdapter$PointerTo_Named_ast$FunctionTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$GetAccessorDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$HeritageClause, $goInterfaceAdapter$PointerTo_Named_ast$Identifier, $goInterfaceAdapter$PointerTo_Named_ast$IfStatement, $goInterfaceAdapter$PointerTo_Named_ast$ImportAttribute, $goInterfaceAdapter$PointerTo_Named_ast$ImportAttributes, $goInterfaceAdapter$PointerTo_Named_ast$ImportClause, $goInterfaceAdapter$PointerTo_Named_ast$ImportDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ImportEqualsDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ImportSpecifier, $goInterfaceAdapter$PointerTo_Named_ast$ImportTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$IndexSignatureDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$IndexedAccessTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$InferTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$InterfaceDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$IntersectionTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$JSDoc, $goInterfaceAdapter$PointerTo_Named_ast$JSDocAllType, $goInterfaceAdapter$PointerTo_Named_ast$JSDocAugmentsTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocCallbackTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocDeprecatedTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocImplementsTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocImportTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocLink, $goInterfaceAdapter$PointerTo_Named_ast$JSDocLinkCode, $goInterfaceAdapter$PointerTo_Named_ast$JSDocLinkPlain, $goInterfaceAdapter$PointerTo_Named_ast$JSDocNameReference, $goInterfaceAdapter$PointerTo_Named_ast$JSDocNonNullableType, $goInterfaceAdapter$PointerTo_Named_ast$JSDocNullableType, $goInterfaceAdapter$PointerTo_Named_ast$JSDocOptionalType, $goInterfaceAdapter$PointerTo_Named_ast$JSDocOverloadTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocOverrideTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocParameterOrPropertyTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocPrivateTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocProtectedTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocPublicTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocReadonlyTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocReturnTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocSatisfiesTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocSeeTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocSignature, $goInterfaceAdapter$PointerTo_Named_ast$JSDocTemplateTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocText, $goInterfaceAdapter$PointerTo_Named_ast$JSDocThisTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocThrowsTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocTypeExpression, $goInterfaceAdapter$PointerTo_Named_ast$JSDocTypeLiteral, $goInterfaceAdapter$PointerTo_Named_ast$JSDocTypeTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocTypedefTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocUnknownTag, $goInterfaceAdapter$PointerTo_Named_ast$JSDocVariadicType, $goInterfaceAdapter$PointerTo_Named_ast$JsxAttribute, $goInterfaceAdapter$PointerTo_Named_ast$JsxAttributes, $goInterfaceAdapter$PointerTo_Named_ast$JsxClosingElement, $goInterfaceAdapter$PointerTo_Named_ast$JsxClosingFragment, $goInterfaceAdapter$PointerTo_Named_ast$JsxElement, $goInterfaceAdapter$PointerTo_Named_ast$JsxExpression, $goInterfaceAdapter$PointerTo_Named_ast$JsxFragment, $goInterfaceAdapter$PointerTo_Named_ast$JsxNamespacedName, $goInterfaceAdapter$PointerTo_Named_ast$JsxOpeningElement, $goInterfaceAdapter$PointerTo_Named_ast$JsxOpeningFragment, $goInterfaceAdapter$PointerTo_Named_ast$JsxSelfClosingElement, $goInterfaceAdapter$PointerTo_Named_ast$JsxSpreadAttribute, $goInterfaceAdapter$PointerTo_Named_ast$JsxText, $goInterfaceAdapter$PointerTo_Named_ast$KeywordExpression, $goInterfaceAdapter$PointerTo_Named_ast$KeywordTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$LabeledStatement, $goInterfaceAdapter$PointerTo_Named_ast$LiteralTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$MappedTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$MetaProperty, $goInterfaceAdapter$PointerTo_Named_ast$MethodDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$MethodSignatureDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$MissingDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ModuleBlock, $goInterfaceAdapter$PointerTo_Named_ast$ModuleDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$NamedExports, $goInterfaceAdapter$PointerTo_Named_ast$NamedImports, $goInterfaceAdapter$PointerTo_Named_ast$NamedTupleMember, $goInterfaceAdapter$PointerTo_Named_ast$NamespaceExport, $goInterfaceAdapter$PointerTo_Named_ast$NamespaceExportDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$NamespaceImport, $goInterfaceAdapter$PointerTo_Named_ast$NewExpression, $goInterfaceAdapter$PointerTo_Named_ast$NoSubstitutionTemplateLiteral, $goInterfaceAdapter$PointerTo_Named_ast$NonNullExpression, $goInterfaceAdapter$PointerTo_Named_ast$NotEmittedStatement, $goInterfaceAdapter$PointerTo_Named_ast$NotEmittedTypeElement, $goInterfaceAdapter$PointerTo_Named_ast$NumericLiteral, $goInterfaceAdapter$PointerTo_Named_ast$OptionalTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$ParameterDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ParenthesizedExpression, $goInterfaceAdapter$PointerTo_Named_ast$ParenthesizedTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$PartiallyEmittedExpression, $goInterfaceAdapter$PointerTo_Named_ast$PostfixUnaryExpression, $goInterfaceAdapter$PointerTo_Named_ast$PrefixUnaryExpression, $goInterfaceAdapter$PointerTo_Named_ast$PrivateIdentifier, $goInterfaceAdapter$PointerTo_Named_ast$PropertyAccessExpression, $goInterfaceAdapter$PointerTo_Named_ast$PropertyAssignment, $goInterfaceAdapter$PointerTo_Named_ast$PropertyDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$PropertySignatureDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$QualifiedName, $goInterfaceAdapter$PointerTo_Named_ast$RegularExpressionLiteral, $goInterfaceAdapter$PointerTo_Named_ast$RestTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$ReturnStatement, $goInterfaceAdapter$PointerTo_Named_ast$SatisfiesExpression, $goInterfaceAdapter$PointerTo_Named_ast$SemicolonClassElement, $goInterfaceAdapter$PointerTo_Named_ast$SetAccessorDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$ShorthandPropertyAssignment, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_ast$SpreadAssignment, $goInterfaceAdapter$PointerTo_Named_ast$SpreadElement, $goInterfaceAdapter$PointerTo_Named_ast$StringLiteral, $goInterfaceAdapter$PointerTo_Named_ast$SwitchStatement, $goInterfaceAdapter$PointerTo_Named_ast$SyntaxList, $goInterfaceAdapter$PointerTo_Named_ast$SyntheticExpression, $goInterfaceAdapter$PointerTo_Named_ast$SyntheticReferenceExpression, $goInterfaceAdapter$PointerTo_Named_ast$TaggedTemplateExpression, $goInterfaceAdapter$PointerTo_Named_ast$TemplateExpression, $goInterfaceAdapter$PointerTo_Named_ast$TemplateHead, $goInterfaceAdapter$PointerTo_Named_ast$TemplateLiteralTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$TemplateLiteralTypeSpan, $goInterfaceAdapter$PointerTo_Named_ast$TemplateMiddle, $goInterfaceAdapter$PointerTo_Named_ast$TemplateSpan, $goInterfaceAdapter$PointerTo_Named_ast$TemplateTail, $goInterfaceAdapter$PointerTo_Named_ast$ThisTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$ThrowStatement, $goInterfaceAdapter$PointerTo_Named_ast$TryStatement, $goInterfaceAdapter$PointerTo_Named_ast$TupleTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$TypeAliasDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$TypeAssertion, $goInterfaceAdapter$PointerTo_Named_ast$TypeLiteralNode, $goInterfaceAdapter$PointerTo_Named_ast$TypeOfExpression, $goInterfaceAdapter$PointerTo_Named_ast$TypeOperatorNode, $goInterfaceAdapter$PointerTo_Named_ast$TypeParameterDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$TypePredicateNode, $goInterfaceAdapter$PointerTo_Named_ast$TypeQueryNode, $goInterfaceAdapter$PointerTo_Named_ast$TypeReferenceNode, $goInterfaceAdapter$PointerTo_Named_ast$UnionTypeNode, $goInterfaceAdapter$PointerTo_Named_ast$VariableDeclaration, $goInterfaceAdapter$PointerTo_Named_ast$VariableDeclarationList, $goInterfaceAdapter$PointerTo_Named_ast$VariableStatement, $goInterfaceAdapter$PointerTo_Named_ast$VoidExpression, $goInterfaceAdapter$PointerTo_Named_ast$WhileStatement, $goInterfaceAdapter$PointerTo_Named_ast$WithStatement, $goInterfaceAdapter$PointerTo_Named_ast$YieldExpression, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$ObjectLiteralExpression as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$AsNode$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$AsNodeFactory$void_to_PointerTo_Named_ast$NodeFactory, $goInterfaceMethod$BodyData$void_to_PointerTo_Named_ast$BodyBase, $goInterfaceMethod$ClassLikeData$void_to_PointerTo_Named_ast$ClassLikeBase, $goInterfaceMethod$Clone$Named_ast$NodeFactoryCoercible_to_PointerTo_Named_ast$Node, $goInterfaceMethod$DeclarationData$void_to_PointerTo_Named_ast$DeclarationBase, $goInterfaceMethod$ECMALineMap$void_to_SliceOf_Named_core$TextPos, $goInterfaceMethod$ExportableData$void_to_PointerTo_Named_ast$ExportableBase, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$FlowNodeData$void_to_PointerTo_Named_ast$FlowNodeBase, $goInterfaceMethod$ForEachChild$Named_ast$Visitor_to_bool, $goInterfaceMethod$FunctionLikeData$void_to_PointerTo_Named_ast$FunctionLikeBase, $goInterfaceMethod$IterChildren$void_to_Named_iter$SeqOf_PointerTo_Named_ast$Node, $goInterfaceMethod$LiteralLikeData$void_to_PointerTo_Named_ast$LiteralLikeNodeBase, $goInterfaceMethod$LocalsContainerData$void_to_PointerTo_Named_ast$LocalsContainerBase, $goInterfaceMethod$Modifiers$void_to_PointerTo_Named_ast$ModifierList, $goInterfaceMethod$Name$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$Path$void_to_Named_tspath$Path, $goInterfaceMethod$SubtreeFacts$void_to_Named_ast$SubtreeFacts, $goInterfaceMethod$TemplateLiteralLikeData$void_to_PointerTo_Named_ast$TemplateLiteralLikeNodeBase, $goInterfaceMethod$Text$void_to_string, $goInterfaceMethod$VisitEachChild$PointerTo_Named_ast$NodeVisitor_to_PointerTo_Named_ast$Node, $goInterfaceMethod$ast$computeSubtreeFacts$void_to_Named_ast$SubtreeFacts, $goInterfaceMethod$ast$propagateSubtreeFacts$void_to_Named_ast$SubtreeFacts, $goInterfaceMethod$ast$setModifiers$PointerTo_Named_ast$ModifierList_to_void, $goInterfaceMethod$ast$subtreeFactsWorker$Named_ast$nodeData_to_Named_ast$SubtreeFacts } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_ast$TokenCacheKey_To_PointerTo_Named_ast$Node, $goMap$MapOf_string_To_Named_ast$PragmaArgument, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$Node, $goMap$MapOf_PointerTo_Named_ast$Node_To_SliceOf_PointerTo_Named_ast$Node as GoMap } from "../../../../../../support/maps.js";
import { BinaryExpression, Block, BodyBase, CallExpression, CompositeBase, ConditionalExpression, DeclarationBase, ElementAccessExpression, ExportableBase, ExpressionStatement, ExpressionWithTypeArguments, FunctionDeclaration, FunctionLikeBase, FunctionLikeWithBodyBase, Identifier, IfStatement, ImportAttribute, ImportSpecifier, InterfaceDeclaration, IsArrayLiteralExpression, IsAssignmentOperator, IsBinaryExpression, IsCatchClause, IsComputedPropertyName, IsDecorator, IsForOfStatement, IsIdentifier, IsJSDocParameterTag, IsNamedExports, IsObjectLiteralExpression, IsPrivateIdentifier, IsPropertyAccessExpression, IsPropertyAssignment, IsQualifiedName, JSDoc, JSDocCommentBase, JSDocDeprecatedTag, JSDocTagBase, JSDocText, JSDocUnknownTag, LiteralExpressionBase, LiteralLikeNodeBase, LocalsContainerBase, MetaProperty, MethodSignatureDeclaration, NamedMemberBase, NamespaceExport, NodeFactory, NodeWithTypeArgumentsBase, NumericLiteral, ParameterDeclaration, ParenthesizedExpression, ParenthesizedTypeNode, PrefixUnaryExpression, PropertyAccessExpression, PropertyAssignment, PropertySignatureDeclaration, ReturnStatement, StringLiteral, TypeAliasDeclaration, TypeLiteralNode, TypeOperatorNode, TypeReferenceNode, VariableDeclaration } from "./ast_generated.js";
import { KindArrayBindingPattern$constant, KindArrayLiteralExpression$constant, KindAsExpression$constant, KindAwaitExpression$constant, KindBigIntLiteral$constant, KindBinaryExpression$constant, KindBindingElement$constant, KindBlock$constant, KindBreakStatement$constant, KindCallExpression$constant, KindCaseClause$constant, KindClassDeclaration$constant, KindClassExpression$constant, KindComputedPropertyName$constant, KindConditionalExpression$constant, KindConstructor$constant, KindContinueStatement$constant, KindDecorator$constant, KindDefaultClause$constant, KindDefaultKeyword$constant, KindDeleteExpression$constant, KindDoStatement$constant, KindElementAccessExpression$constant, KindEnumDeclaration$constant, KindEnumMember$constant, KindEqualsToken$constant, KindExportAssignment$constant, KindExportDeclaration$constant, KindExportSpecifier$constant, KindExpressionStatement$constant, KindExpressionWithTypeArguments$constant, KindExternalModuleReference$constant, KindForInStatement$constant, KindForOfStatement$constant, KindForStatement$constant, KindFunctionDeclaration$constant, KindFunctionExpression$constant, KindGetAccessor$constant, KindIdentifier$constant, KindIfStatement$constant, KindImportClause$constant, KindImportDeclaration$constant, KindImportEqualsDeclaration$constant, KindImportSpecifier$constant, KindImportType$constant, KindInterfaceDeclaration$constant, KindJSDoc$constant, KindJSDocAugmentsTag$constant, KindJSDocCallbackTag$constant, KindJSDocDeprecatedTag$constant, KindJSDocImplementsTag$constant, KindJSDocImportTag$constant, KindJSDocLink$constant, KindJSDocLinkCode$constant, KindJSDocLinkPlain$constant, KindJSDocNonNullableType$constant, KindJSDocNullableType$constant, KindJSDocOptionalType$constant, KindJSDocOverloadTag$constant, KindJSDocOverrideTag$constant, KindJSDocParameterTag$constant, KindJSDocPrivateTag$constant, KindJSDocPropertyTag$constant, KindJSDocProtectedTag$constant, KindJSDocPublicTag$constant, KindJSDocReadonlyTag$constant, KindJSDocReturnTag$constant, KindJSDocSatisfiesTag$constant, KindJSDocSeeTag$constant, KindJSDocTemplateTag$constant, KindJSDocText$constant, KindJSDocThisTag$constant, KindJSDocThrowsTag$constant, KindJSDocTypeExpression$constant, KindJSDocTypeTag$constant, KindJSDocTypedefTag$constant, KindJSDocUnknownTag$constant, KindJSImportDeclaration$constant, KindJSTypeAliasDeclaration$constant, KindJsxAttribute$constant, KindJsxAttributes$constant, KindJsxClosingElement$constant, KindJsxElement$constant, KindJsxExpression$constant, KindJsxFragment$constant, KindJsxNamespacedName$constant, KindJsxOpeningElement$constant, KindJsxSelfClosingElement$constant, KindJsxSpreadAttribute$constant, KindJsxText$constant, KindJsxTextAllWhiteSpaces$constant, KindLabeledStatement$constant, KindMappedType$constant, KindMetaProperty$constant, KindMethodDeclaration$constant, KindMethodSignature$constant, KindMinusMinusToken$constant, KindModuleBlock$constant, KindModuleDeclaration$constant, KindNamedExports$constant, KindNamedImports$constant, KindNamedTupleMember$constant, KindNamespaceExport$constant, KindNamespaceExportDeclaration$constant, KindNamespaceImport$constant, KindNewExpression$constant, KindNoSubstitutionTemplateLiteral$constant, KindNonNullExpression$constant, KindNumericLiteral$constant, KindObjectBindingPattern$constant, KindObjectLiteralExpression$constant, KindOptionalType$constant, KindParameter$constant, KindParenthesizedExpression$constant, KindParenthesizedType$constant, KindPartiallyEmittedExpression$constant, KindPlusPlusToken$constant, KindPostfixUnaryExpression$constant, KindPrefixUnaryExpression$constant, KindPrivateIdentifier$constant, KindPropertyAccessExpression$constant, KindPropertyAssignment$constant, KindPropertyDeclaration$constant, KindPropertySignature$constant, KindQuestionToken$constant, KindRegularExpressionLiteral$constant, KindRestType$constant, KindReturnStatement$constant, KindSatisfiesExpression$constant, KindSetAccessor$constant, KindShorthandPropertyAssignment$constant, KindSourceFile$constant, KindSpreadAssignment$constant, KindSpreadElement$constant, KindStringLiteral$constant, KindSwitchStatement$constant, KindTaggedTemplateExpression$constant, KindTemplateHead$constant, KindTemplateLiteralTypeSpan$constant, KindTemplateMiddle$constant, KindTemplateSpan$constant, KindTemplateTail$constant, KindThrowStatement$constant, KindTupleType$constant, KindTypeAliasDeclaration$constant, KindTypeAssertionExpression$constant, KindTypeKeyword$constant, KindTypeLiteral$constant, KindTypeOfExpression$constant, KindTypeOperator$constant, KindTypeParameter$constant, KindTypePredicate$constant, KindTypeQuery$constant, KindTypeReference$constant, KindVariableDeclaration$constant, KindVoidExpression$constant, KindWhileStatement$constant, KindWithStatement$constant, KindYieldExpression$constant, Kind_String } from "./kind_generated.js";
import { ModifierFlagsNone$constant, ModifierFlagsParameterPropertyModifier$constant } from "./modifierflags.js";
import { NodeFlagsAmbient$constant, NodeFlagsHasJSDoc$constant, NodeFlagsReparsed$constant } from "./nodeflags.js";
import { SourceFileParseOptions } from "./parseoptions.js";
import { ComputePositionMap, PositionMap } from "./positionmap.js";
import { SubtreeFactsNone$constant, propagateNodeListSubtreeFacts, propagateSubtreeFacts } from "./subtreefacts.js";
import { SymbolTable } from "./symbol.js";
import { GetAssignmentDeclarationKind, GetNameOfDeclaration, GetNonAssignedNameOfDeclaration, GetSourceFileOfNode, HasSyntacticModifier, IsBindingPattern, IsDeclaration, IsPropertyName, IsSourceFileJS, IsStringLiteralLike, IsStringOrNumericLiteralLike, IsTagName, JSDeclarationKindNone$constant, literalIsName } from "./utilities.js";
import { NodeVisitor } from "./visitor.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function SetParseJSDocForNode(fn: (($0: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, $1: tsonicTypeScriptRuntime.Location<Node> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>) | undefined): void {
    $state.parseJSDocForNode = fn;
}
export class Visitor {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined) {
    }
    declare private readonly then?: never;
}
export function visit(v: Visitor, node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!(node === undefined)) {
        const __gotots_callee_4 = v.$value;
        const __gotots_argument_32 = node;
        return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32);
    }
    return false;
}
export function visitNodes(v: Visitor, nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>): bool {
    const __gotots_range_0 = nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let node: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_0;
        const __gotots_callee_5 = v.$value;
        const __gotots_argument_34 = node;
        if ((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_34)) {
            return true;
        }
    }
    return false;
}
export function visitNodeList(v: Visitor, nodeList: tsonicTypeScriptRuntime.Location<NodeList> | undefined): bool {
    if (!(nodeList === undefined)) {
        return visitNodes(v, NodeList.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes);
    }
    return false;
}
export function visitModifiers(v: Visitor, modifiers: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): bool {
    if (!(modifiers === undefined)) {
        return visitNodes(v, (void NodeList.$storageOf, (void NodeList.$fromStorage,
            ModifierList.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes);
    }
    return false;
}
export class NodeFactoryHooks {
    declare private readonly $goType: void;
    public constructor(public OnCreate: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => void) | undefined, public OnUpdate: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: tsonicTypeScriptRuntime.Location<Node> | undefined) => void) | undefined, public OnClone: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined, $1: tsonicTypeScriptRuntime.Location<Node> | undefined) => void) | undefined) {
    }
    static $zero(): NodeFactoryHooks {
        return new NodeFactoryHooks(void 0, void 0, void 0);
    }
    static $copy($source: NodeFactoryHooks): NodeFactoryHooks {
        return new NodeFactoryHooks($source.OnCreate, $source.OnUpdate, $source.OnClone);
    }
    declare private readonly then?: never;
}
export interface NodeFactoryCoercible extends GoInterfaceValue {
    AsNodeFactory(): tsonicTypeScriptRuntime.Location<NodeFactory> | undefined;
}
export const NodeFactoryCoercible$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AsNodeFactory$void_to_PointerTo_Named_ast$NodeFactory]);
export function NodeFactoryCoercible$is(value: GoInterfaceValue | undefined): value is NodeFactoryCoercible {
    return value !== undefined && value.$go$implements(NodeFactoryCoercible$contract);
}
export function NewNodeFactory(hooks: NodeFactoryHooks): tsonicTypeScriptRuntime.Location<NodeFactory> | undefined {
    return tsonicTypeScriptRuntime.location<NodeFactory>(new NodeFactory(NodeFactoryHooks.$copy(hooks), Arena__from_core.$zero<ArrayTypeNode>(), Arena__from_core.$zero<BinaryExpression>(), Arena__from_core.$zero<Block>(), Arena__from_core.$zero<CallExpression>(), Arena__from_core.$zero<ConditionalExpression>(), Arena__from_core.$zero<ConstructSignatureDeclaration>(), Arena__from_core.$zero<ElementAccessExpression>(), Arena__from_core.$zero<ExpressionStatement>(), Arena__from_core.$zero<ExpressionWithTypeArguments>(), Arena__from_core.$zero<FunctionDeclaration>(), Arena__from_core.$zero<FunctionTypeNode>(), Arena__from_core.$zero<HeritageClause>(), Arena__from_core.$zero<Identifier>(), Arena__from_core.$zero<IfStatement>(), Arena__from_core.$zero<ImportSpecifier>(), Arena__from_core.$zero<IndexedAccessTypeNode>(), Arena__from_core.$zero<InterfaceDeclaration>(), Arena__from_core.$zero<IntersectionTypeNode>(), Arena__from_core.$zero<JSDoc>(), Arena__from_core.$zero<JSDocDeprecatedTag>(), Arena__from_core.$zero<JSDocText>(), Arena__from_core.$zero<JSDocUnknownTag>(), Arena__from_core.$zero<KeywordExpression>(), Arena__from_core.$zero<KeywordTypeNode>(), Arena__from_core.$zero<LiteralTypeNode>(), Arena__from_core.$zero<MethodSignatureDeclaration>(), Arena__from_core.$zero<ModifierList>(), Arena__from_core.$zero<NodeList>(), Arena__from_core.$zero<NumericLiteral>(), Arena__from_core.$zero<ParameterDeclaration>(), Arena__from_core.$zero<ParenthesizedExpression>(), Arena__from_core.$zero<ParenthesizedTypeNode>(), Arena__from_core.$zero<PrefixUnaryExpression>(), Arena__from_core.$zero<PropertyAccessExpression>(), Arena__from_core.$zero<PropertyAssignment>(), Arena__from_core.$zero<PropertySignatureDeclaration>(), Arena__from_core.$zero<ReturnStatement>(), Arena__from_core.$zero<StringLiteral>(), Arena__from_core.$zero<Token>(), Arena__from_core.$zero<TypeAliasDeclaration>(), Arena__from_core.$zero<TypeLiteralNode>(), Arena__from_core.$zero<TypeOperatorNode>(), Arena__from_core.$zero<TypeParameterDeclaration>(), Arena__from_core.$zero<TypeReferenceNode>(), Arena__from_core.$zero<UnionTypeNode>(), Arena__from_core.$zero<VariableDeclaration>(), Arena__from_core.$zero<VariableDeclarationList>(), Arena__from_core.$zero<VariableStatement>(), 0, 0));
}
export function newNode(kind: Kind, data: nodeData | undefined, hooks: NodeFactoryHooks): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_receiver_1 = data;
    let n: tsonicTypeScriptRuntime.Location<Node> | undefined = goInterfaceNonNil<nodeData>(__gotots_receiver_1).AsNode();
    Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(UndefinedTextRange__from_core());
    Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind = kind;
    Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data = data;
    if (!(hooks.OnCreate === undefined)) {
        const __gotots_callee_0 = hooks.OnCreate;
        const __gotots_argument_3 = n;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
    }
    return n;
}
export function updateNode(updated: tsonicTypeScriptRuntime.Location<Node> | undefined, original: tsonicTypeScriptRuntime.Location<Node> | undefined, hooks: NodeFactoryHooks): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (!tsonicTypeScriptRuntime.sameLocation(updated, original)) {
        Node.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags = Node.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags;
        Node.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc)));
        if (!(hooks.OnUpdate === undefined)) {
            const __gotots_callee_6 = hooks.OnUpdate;
            const __gotots_argument_35 = updated;
            const __gotots_argument_36 = original;
            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35, __gotots_argument_36);
        }
    }
    return updated;
}
export function cloneNode(updated: tsonicTypeScriptRuntime.Location<Node> | undefined, original: tsonicTypeScriptRuntime.Location<Node> | undefined, hooks: NodeFactoryHooks): tsonicTypeScriptRuntime.Location<Node> | undefined {
    updateNode(updated, original, NodeFactoryHooks.$copy(hooks));
    if (!tsonicTypeScriptRuntime.sameLocation(updated, original) && !(hooks.OnClone === undefined)) {
        const __gotots_callee_7 = hooks.OnClone;
        const __gotots_argument_37 = updated;
        const __gotots_argument_38 = original;
        (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37, __gotots_argument_38);
    }
    return updated;
}
export type NodeList$Storage = {
    Loc: TextRange__from_core$Storage;
    Nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>;
};
export class NodeList implements GoContainerStoredValue<NodeList$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NodeList$Storage) {
    }
    public static $storageOf($source: NodeList): NodeList$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NodeList$Storage): NodeList {
        return new NodeList($source);
    }
    public get Loc(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.Loc);
    }
    public set Loc($value: TextRange__from_core) {
        this.$storage.Loc = TextRange__from_core.$storageOf($value);
    }
    public get Nodes(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        return this.$storage.Nodes;
    }
    public set Nodes($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>) {
        this.$storage.Nodes = $value;
    }
    declare readonly [$goContainerStorageType]: NodeList$Storage;
    static $zero(): NodeList {
        return new NodeList({
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            Nodes: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>()
        });
    }
    static $copy($source: NodeList): NodeList {
        return new NodeList({
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.Loc))),
            Nodes: $source.$storage.Nodes
        });
    }
    declare private readonly then?: never;
    static Clone(list: tsonicTypeScriptRuntime.Location<NodeList> | undefined, f: NodeFactoryCoercible | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        const __gotots_receiver_10 = f;
        let result: tsonicTypeScriptRuntime.Location<NodeList> | undefined = NodeFactory.NewNodeList(goInterfaceNonNil<NodeFactoryCoercible>(__gotots_receiver_10).AsNodeFactory(), NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes);
        NodeList.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc)));
        return result;
    }
    static End(list: tsonicTypeScriptRuntime.Location<NodeList> | undefined): int {
        return TextRange__from_core.$fromStorage(NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc).End();
    }
    static HasTrailingComma(list: tsonicTypeScriptRuntime.Location<NodeList> | undefined): bool {
        if (NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length === 0) {
            return false;
        }
        let last: tsonicTypeScriptRuntime.Location<Node> | undefined = NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length - 1);
        return Node.End(last) < NodeList.End(list);
    }
    static Pos(list: tsonicTypeScriptRuntime.Location<NodeList> | undefined): int {
        return TextRange__from_core.$fromStorage(NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Loc).Pos();
    }
}
export type ModifierList$Storage = {
    NodeList: NodeList$Storage;
    ModifierFlags: uint32;
};
export class ModifierList implements GoContainerStoredValue<ModifierList$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ModifierList$Storage) {
    }
    public static $storageOf($source: ModifierList): ModifierList$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ModifierList$Storage): ModifierList {
        return new ModifierList($source);
    }
    public get NodeList(): NodeList {
        return NodeList.$fromStorage(this.$storage.NodeList);
    }
    public set NodeList($value: NodeList) {
        this.$storage.NodeList = NodeList.$storageOf($value);
    }
    public get ModifierFlags(): ModifierFlags {
        return this.$storage.ModifierFlags;
    }
    public set ModifierFlags($value: ModifierFlags) {
        this.$storage.ModifierFlags = $value;
    }
    declare readonly [$goContainerStorageType]: ModifierList$Storage;
    static $zero(): ModifierList {
        return new ModifierList({
            NodeList: NodeList.$storageOf(NodeList.$zero()),
            ModifierFlags: 0
        });
    }
    static $copy($source: ModifierList): ModifierList {
        return new ModifierList({
            NodeList: NodeList.$storageOf(NodeList.$copy(NodeList.$fromStorage($source.$storage.NodeList))),
            ModifierFlags: $source.$storage.ModifierFlags
        });
    }
    declare private readonly then?: never;
    static Clone(list: tsonicTypeScriptRuntime.Location<ModifierList> | undefined, f: tsonicTypeScriptRuntime.Location<NodeFactory> | undefined): tsonicTypeScriptRuntime.Location<ModifierList> | undefined {
        const __gotots_store_1 = ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeFactory>).value;
        let res: tsonicTypeScriptRuntime.Location<ModifierList> | undefined = Arena$New$Named_ast$ModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "modifierListArena"));
        (void NodeList.$storageOf, (void NodeList.$fromStorage,
            ModifierList.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList.$storageOf, (void NodeList.$fromStorage,
            ModifierList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Loc)));
        (void NodeList.$storageOf, (void NodeList.$fromStorage,
            ModifierList.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes = (void NodeList.$storageOf, (void NodeList.$fromStorage,
            ModifierList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes;
        ModifierList.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).ModifierFlags = ModifierList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).ModifierFlags;
        return res;
    }
}
export type Node$Storage = {
    Kind: int16;
    Flags: uint32;
    Loc: TextRange__from_core$Storage;
    id: atomic__from_gostdlib.Uint64;
    Parent: tsonicTypeScriptRuntime.Location<Node> | undefined;
    data: nodeData | undefined;
};
export class Node {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Node$Storage) {
    }
    public static $storageOf($source: Node): Node$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Node$Storage): Node {
        return new Node($source);
    }
    public get Kind(): Kind {
        return this.$storage.Kind;
    }
    public set Kind($value: Kind) {
        this.$storage.Kind = $value;
    }
    public get Flags(): NodeFlags {
        return this.$storage.Flags;
    }
    public set Flags($value: NodeFlags) {
        this.$storage.Flags = $value;
    }
    public get Loc(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.Loc);
    }
    public set Loc($value: TextRange__from_core) {
        this.$storage.Loc = TextRange__from_core.$storageOf($value);
    }
    public get id(): atomic__from_gostdlib.Uint64 {
        return this.$storage.id;
    }
    public set id($value: atomic__from_gostdlib.Uint64) {
        this.$storage.id = $value;
    }
    public get Parent(): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return this.$storage.Parent;
    }
    public set Parent($value: tsonicTypeScriptRuntime.Location<Node> | undefined) {
        this.$storage.Parent = $value;
    }
    public get data(): nodeData | undefined {
        return this.$storage.data;
    }
    public set data($value: nodeData | undefined) {
        this.$storage.data = $value;
    }
    static $zero(): Node {
        return new Node({
            Kind: 0,
            Flags: 0,
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            id: named_sync_atomic.SyncAtomicUint64Operations.$zero(),
            Parent: void 0,
            data: void 0
        });
    }
    static $copy($source: Node): Node {
        return new Node({
            Kind: $source.$storage.Kind,
            Flags: $source.$storage.Flags,
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.Loc))),
            id: named_sync_atomic.SyncAtomicUint64Operations.$copy($source.$storage.id),
            Parent: $source.$storage.Parent,
            data: $source.$storage.data
        });
    }
    static $equal($left: Node, $right: Node): bool {
        return $left.$storage.Kind === $right.$storage.Kind && $left.$storage.Flags === $right.$storage.Flags && TextRange__from_core.$equal(TextRange__from_core.$fromStorage($left.$storage.Loc), TextRange__from_core.$fromStorage($right.$storage.Loc)) && named_sync_atomic.SyncAtomicUint64Operations.$equal($left.$storage.id, $right.$storage.id) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.Parent, $right.$storage.Parent) && goInterfaceEqual($left.$storage.data, $right.$storage.data);
    }
    static $hash($source: Node): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Kind));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Flags));
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash(TextRange__from_core.$fromStorage($source.$storage.Loc)));
        $hash = GoMapHash.mix($hash, named_sync_atomic.SyncAtomicUint64Operations.$hash($source.$storage.id));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.Parent));
        $hash = GoMapHash.mix($hash, $source.$storage.data === undefined ? 0 : $source.$storage.data.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static GetResolutionModeOverride(node: tsonicTypeScriptRuntime.Location<Node> | undefined): [
        ModuleKind__from_core,
        bool
    ] {
        if (node === undefined) {
            return [ResolutionModeNone$constant__from_core(), false];
        }
        let attributes: tsonicTypeScriptRuntime.Location<NodeList> | undefined = (Node.AsImportAttributes(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
        if (NodeList.$storageOf(((attributes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.length !== 1) {
            return [ResolutionModeNone$constant__from_core(), false];
        }
        let elem: {
            value: ImportAttribute;
        } | undefined = Node.AsImportAttribute(NodeList.$storageOf(((attributes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes.get(0));
        if (!IsStringLiteralLike(ImportAttribute.Name(elem))) {
            return [ResolutionModeNone$constant__from_core(), false];
        }
        if (Node.Text(ImportAttribute.Name(elem)) !== "resolution-mode") {
            return [ResolutionModeNone$constant__from_core(), false];
        }
        if (!IsStringLiteralLike((elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value)) {
            return [ResolutionModeNone$constant__from_core(), false];
        }
        if (Node.Text((elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value) !== "import" && Node.Text((elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value) !== "require") {
            return [ResolutionModeNone$constant__from_core(), false];
        }
        if (Node.Text((elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value) === "import") {
            return [ResolutionModeESM$constant__from_core(), true];
        }
        else {
            return [ModuleKindCommonJS$constant__from_core(), true];
        }
    }
    static ArgumentList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindCallExpression$constant(): {
                return CallExpression.$storageOf(((Node.AsCallExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Arguments;
                break;
            }
            case KindNewExpression$constant(): {
                return (Node.AsNewExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Arguments;
                break;
            }
        }
        const __gotots_argument_9 = new $goInterfaceAdapter$string("Unhandled case in Node.Arguments: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Arguments(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.ArgumentList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static AsArrayLiteralExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ArrayLiteralExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ArrayLiteralExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ArrayLiteralExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsArrayTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ArrayTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ArrayTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ArrayTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsArrowFunction(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ArrowFunction;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ArrowFunction;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ArrowFunction.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsAsExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: AsExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: AsExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$AsExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsAwaitExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: AwaitExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: AwaitExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$AwaitExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsBigIntLiteral(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: BigIntLiteral;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: BigIntLiteral;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$BigIntLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsBinaryExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<BinaryExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<BinaryExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$BinaryExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsBindingElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: BindingElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: BindingElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$BindingElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsBindingPattern(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: BindingPattern;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: BindingPattern;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$BindingPattern.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsBlock(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Block> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<Block> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$Block.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsBreakStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: BreakStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: BreakStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$BreakStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsCallExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<CallExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<CallExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$CallExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsCallSignatureDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: CallSignatureDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: CallSignatureDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$CallSignatureDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsCaseBlock(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: CaseBlock;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: CaseBlock;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$CaseBlock.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsCaseOrDefaultClause(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: CaseOrDefaultClause;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: CaseOrDefaultClause;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$CaseOrDefaultClause.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsCatchClause(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: CatchClause;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: CatchClause;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$CatchClause.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsClassDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ClassDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ClassDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ClassDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsClassExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ClassExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ClassExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ClassExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsClassStaticBlockDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ClassStaticBlockDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ClassStaticBlockDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ClassStaticBlockDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsComputedPropertyName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ComputedPropertyName;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ComputedPropertyName;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ComputedPropertyName.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsConditionalExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ConditionalExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ConditionalExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ConditionalExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsConditionalTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ConditionalTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ConditionalTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ConditionalTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsConstructSignatureDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ConstructSignatureDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsConstructorDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ConstructorDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ConstructorDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ConstructorDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsConstructorTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ConstructorTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ConstructorTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ConstructorTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsContinueStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ContinueStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ContinueStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ContinueStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsDebuggerStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: DebuggerStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: DebuggerStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$DebuggerStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsDecorator(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: Decorator;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: Decorator;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$Decorator.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsDeleteExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: DeleteExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: DeleteExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$DeleteExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsDoStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: DoStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: DoStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$DoStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsElementAccessExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ElementAccessExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ElementAccessExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ElementAccessExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsEmptyStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: EmptyStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: EmptyStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$EmptyStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsEnumDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: EnumDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: EnumDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$EnumDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsEnumMember(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: EnumMember;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: EnumMember;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$EnumMember.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsExportAssignment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ExportAssignment;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ExportAssignment;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ExportAssignment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsExportDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ExportDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ExportDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ExportDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsExportSpecifier(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ExportSpecifier;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ExportSpecifier;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ExportSpecifier.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsExpressionStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ExpressionStatement> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ExpressionStatement> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ExpressionStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsExpressionWithTypeArguments(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ExpressionWithTypeArguments.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsExternalModuleReference(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ExternalModuleReference;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ExternalModuleReference;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ExternalModuleReference.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsFlowReduceLabelData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: FlowReduceLabelData;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: FlowReduceLabelData;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$FlowReduceLabelData.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsFlowSwitchClauseData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: FlowSwitchClauseData;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: FlowSwitchClauseData;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$FlowSwitchClauseData.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsForInOrOfStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ForInOrOfStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ForInOrOfStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ForInOrOfStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsForStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ForStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ForStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ForStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsFunctionDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<FunctionDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<FunctionDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$FunctionDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsFunctionExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: FunctionExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: FunctionExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$FunctionExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsFunctionTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<FunctionTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<FunctionTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$FunctionTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsGetAccessorDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: GetAccessorDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: GetAccessorDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$GetAccessorDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsHeritageClause(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<HeritageClause> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<HeritageClause> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$HeritageClause.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsIdentifier(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Identifier> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<Identifier> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$Identifier.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsIfStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<IfStatement> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<IfStatement> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$IfStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportAttribute(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ImportAttribute;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ImportAttribute;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportAttribute.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportAttributes(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ImportAttributes;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ImportAttributes;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportAttributes.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportClause(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ImportClause;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ImportClause;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportClause.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ImportDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ImportDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportEqualsDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ImportEqualsDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ImportEqualsDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportEqualsDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportSpecifier(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ImportSpecifier> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ImportSpecifier> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportSpecifier.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsImportTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ImportTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ImportTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ImportTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsIndexSignatureDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: IndexSignatureDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: IndexSignatureDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$IndexSignatureDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsIndexedAccessTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$IndexedAccessTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsInferTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: InferTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: InferTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$InferTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsInterfaceDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<InterfaceDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<InterfaceDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$InterfaceDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsIntersectionTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<IntersectionTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<IntersectionTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$IntersectionTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDoc(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<JSDoc> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<JSDoc> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDoc.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocAllType(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocAllType;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocAllType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocAllType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocAugmentsTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocAugmentsTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocAugmentsTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocAugmentsTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocCallbackTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocCallbackTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocCallbackTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocCallbackTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocDeprecatedTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocDeprecatedTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocImplementsTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocImplementsTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocImplementsTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocImplementsTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocImportTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocImportTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocImportTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocImportTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocLink(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocLink;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocLink;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocLink.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocLinkCode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocLinkCode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocLinkCode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocLinkCode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocLinkPlain(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocLinkPlain;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocLinkPlain;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocLinkPlain.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocNameReference(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocNameReference;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocNameReference;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocNameReference.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocNonNullableType(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocNonNullableType;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocNonNullableType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocNonNullableType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocNullableType(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocNullableType;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocNullableType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocNullableType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocOptionalType(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocOptionalType;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocOptionalType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocOptionalType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocOverloadTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocOverloadTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocOverloadTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocOverloadTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocOverrideTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocOverrideTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocOverrideTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocOverrideTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocParameterOrPropertyTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocParameterOrPropertyTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocParameterOrPropertyTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocParameterOrPropertyTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocPrivateTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocPrivateTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocPrivateTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocPrivateTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocProtectedTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocProtectedTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocProtectedTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocProtectedTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocPublicTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocPublicTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocPublicTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocPublicTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocReadonlyTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocReadonlyTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocReadonlyTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocReadonlyTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocReturnTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocReturnTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocReturnTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocReturnTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocSatisfiesTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocSatisfiesTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocSatisfiesTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocSatisfiesTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocSeeTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocSeeTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocSeeTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocSeeTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocSignature(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocSignature;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocSignature;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocSignature.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocTemplateTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocTemplateTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocTemplateTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocTemplateTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocText(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<JSDocText> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<JSDocText> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocText.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocThisTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocThisTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocThisTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocThisTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocThrowsTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocThrowsTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocThrowsTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocThrowsTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocTypeExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocTypeExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocTypeExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocTypeExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocTypeLiteral(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocTypeLiteral;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocTypeLiteral;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocTypeLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocTypeTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocTypeTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocTypeTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocTypeTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocTypedefTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocTypedefTag;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocTypedefTag;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocTypedefTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocUnknownTag(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<JSDocUnknownTag> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<JSDocUnknownTag> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocUnknownTag.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJSDocVariadicType(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JSDocVariadicType;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JSDocVariadicType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JSDocVariadicType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxAttribute(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxAttribute;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxAttribute;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxAttribute.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxAttributes(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxAttributes;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxAttributes;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxAttributes.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxClosingElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxClosingElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxClosingElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxClosingElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxClosingFragment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxClosingFragment;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxClosingFragment;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxClosingFragment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxFragment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxFragment;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxFragment;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxFragment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxNamespacedName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxNamespacedName;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxNamespacedName;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxNamespacedName.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxOpeningElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxOpeningElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxOpeningElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxOpeningElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxOpeningFragment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxOpeningFragment;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxOpeningFragment;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxOpeningFragment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxSelfClosingElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxSelfClosingElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxSelfClosingElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxSelfClosingElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxSpreadAttribute(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxSpreadAttribute;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxSpreadAttribute;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxSpreadAttribute.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsJsxText(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: JsxText;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: JsxText;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$JsxText.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsKeywordExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<KeywordExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<KeywordExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$KeywordExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsKeywordTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<KeywordTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<KeywordTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$KeywordTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsLabeledStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: LabeledStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: LabeledStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$LabeledStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsLiteralTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<LiteralTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<LiteralTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$LiteralTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsMappedTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: MappedTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: MappedTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$MappedTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsMetaProperty(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: MetaProperty;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: MetaProperty;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$MetaProperty.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsMethodDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: MethodDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: MethodDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$MethodDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsMethodSignatureDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$MethodSignatureDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsMissingDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: MissingDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: MissingDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$MissingDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsModuleBlock(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ModuleBlock;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ModuleBlock;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ModuleBlock.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsModuleDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ModuleDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ModuleDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ModuleDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsMutable(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<MutableNode> | undefined {
        return tsonicTypeScriptRuntime.projectLocation<Node, MutableNode>(n, ($go$source: Node): MutableNode => {
            return MutableNode.$fromStorage(Node.$storageOf($go$source));
        }, ($go$target: MutableNode): Node => {
            return Node.$fromStorage(MutableNode.$storageOf($go$target));
        });
    }
    static AsNamedExports(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NamedExports;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NamedExports;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NamedExports.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNamedImports(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NamedImports;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NamedImports;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NamedImports.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNamedTupleMember(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NamedTupleMember;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NamedTupleMember;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NamedTupleMember.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNamespaceExport(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NamespaceExport;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NamespaceExport;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NamespaceExport.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNamespaceExportDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NamespaceExportDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NamespaceExportDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NamespaceExportDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNamespaceImport(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NamespaceImport;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NamespaceImport;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NamespaceImport.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNewExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NewExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NewExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NewExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNoSubstitutionTemplateLiteral(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NoSubstitutionTemplateLiteral;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NoSubstitutionTemplateLiteral;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NoSubstitutionTemplateLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return n;
    }
    static AsNonNullExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NonNullExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NonNullExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NonNullExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNotEmittedStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NotEmittedStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NotEmittedStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NotEmittedStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNotEmittedTypeElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: NotEmittedTypeElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: NotEmittedTypeElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NotEmittedTypeElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsNumericLiteral(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NumericLiteral> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<NumericLiteral> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$NumericLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsObjectLiteralExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ObjectLiteralExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ObjectLiteralExpression;
        } | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsOptionalTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: OptionalTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: OptionalTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$OptionalTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsParameterDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ParameterDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ParameterDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ParameterDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsParenthesizedExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ParenthesizedExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ParenthesizedExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ParenthesizedExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsParenthesizedTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ParenthesizedTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPartiallyEmittedExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: PartiallyEmittedExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: PartiallyEmittedExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PartiallyEmittedExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPostfixUnaryExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: PostfixUnaryExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: PostfixUnaryExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PostfixUnaryExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPrefixUnaryExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<PrefixUnaryExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<PrefixUnaryExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PrefixUnaryExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPrivateIdentifier(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: PrivateIdentifier;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: PrivateIdentifier;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PrivateIdentifier.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPropertyAccessExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<PropertyAccessExpression> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<PropertyAccessExpression> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PropertyAccessExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPropertyAssignment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PropertyAssignment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPropertyDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: PropertyDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: PropertyDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PropertyDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsPropertySignatureDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$PropertySignatureDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsQualifiedName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: QualifiedName;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: QualifiedName;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$QualifiedName.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsRegularExpressionLiteral(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: RegularExpressionLiteral;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: RegularExpressionLiteral;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$RegularExpressionLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsRestTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: RestTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: RestTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$RestTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsReturnStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ReturnStatement> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<ReturnStatement> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ReturnStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSatisfiesExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SatisfiesExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SatisfiesExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SatisfiesExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSemicolonClassElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SemicolonClassElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SemicolonClassElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SemicolonClassElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSetAccessorDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SetAccessorDeclaration;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SetAccessorDeclaration;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SetAccessorDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsShorthandPropertyAssignment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ShorthandPropertyAssignment;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ShorthandPropertyAssignment;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ShorthandPropertyAssignment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSourceFile(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<SourceFile> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<SourceFile> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SourceFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSpreadAssignment(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SpreadAssignment;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SpreadAssignment;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SpreadAssignment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSpreadElement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SpreadElement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SpreadElement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SpreadElement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsStringLiteral(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<StringLiteral> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<StringLiteral> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$StringLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSwitchStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SwitchStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SwitchStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SwitchStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSyntaxList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SyntaxList;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SyntaxList;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SyntaxList.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSyntheticExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SyntheticExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SyntheticExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SyntheticExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsSyntheticReferenceExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: SyntheticReferenceExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: SyntheticReferenceExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$SyntheticReferenceExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTaggedTemplateExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TaggedTemplateExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TaggedTemplateExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TaggedTemplateExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateHead(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateHead;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateHead;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateHead.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateLiteralTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateLiteralTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateLiteralTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateLiteralTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateLiteralTypeSpan(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateLiteralTypeSpan;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateLiteralTypeSpan;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateLiteralTypeSpan.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateMiddle(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateMiddle;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateMiddle;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateMiddle.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateSpan(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateSpan;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateSpan;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateSpan.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTemplateTail(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TemplateTail;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TemplateTail;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TemplateTail.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsThisTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ThisTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ThisTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ThisTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsThrowStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: ThrowStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: ThrowStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$ThrowStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTryStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TryStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TryStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TryStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTupleTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TupleTypeNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TupleTypeNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TupleTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeAliasDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<TypeAliasDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<TypeAliasDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeAliasDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeAssertion(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TypeAssertion;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TypeAssertion;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeAssertion.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeLiteralNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<TypeLiteralNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<TypeLiteralNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeLiteralNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeOfExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TypeOfExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TypeOfExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeOfExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeOperatorNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<TypeOperatorNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<TypeOperatorNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeOperatorNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeParameterDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<TypeParameterDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<TypeParameterDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeParameterDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypePredicateNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TypePredicateNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TypePredicateNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypePredicateNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeQueryNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: TypeQueryNode;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: TypeQueryNode;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeQueryNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsTypeReferenceNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<TypeReferenceNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<TypeReferenceNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$TypeReferenceNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsUnionTypeNode(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<UnionTypeNode> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<UnionTypeNode> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$UnionTypeNode.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsVariableDeclaration(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<VariableDeclaration> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<VariableDeclaration> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$VariableDeclaration.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsVariableDeclarationList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<VariableDeclarationList> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<VariableDeclarationList> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$VariableDeclarationList.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsVariableStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<VariableStatement> | undefined {
        return (($value: nodeData | undefined): tsonicTypeScriptRuntime.Location<VariableStatement> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$VariableStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsVoidExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: VoidExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: VoidExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$VoidExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsWhileStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: WhileStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: WhileStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$WhileStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsWithStatement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: WithStatement;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: WithStatement;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$WithStatement.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static AsYieldExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): {
        value: YieldExpression;
    } | undefined {
        return (($value: nodeData | undefined): {
            value: YieldExpression;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ast$YieldExpression.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data);
    }
    static Attributes(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJsxOpeningElement$constant(): {
                return (Node.AsJsxOpeningElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                break;
            }
            case KindJsxSelfClosingElement$constant(): {
                return (Node.AsJsxSelfClosingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                break;
            }
        }
        const __gotots_argument_29 = new $goInterfaceAdapter$string("Unhandled case in Node.Attributes: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_29 === undefined ? GoPanicNilValue.create() : __gotots_argument_29);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Body(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        let data: tsonicTypeScriptRuntime.Location<BodyBase> | undefined = Node.BodyData(n);
        if (!(data === undefined)) {
            return BodyBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase>).value).Body;
        }
        return void 0;
    }
    static BodyData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<BodyBase> | undefined {
        const __gotots_receiver_3 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_3).BodyData();
    }
    static CanHaveStatements(n: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindSourceFile$constant():
            case KindBlock$constant():
            case KindModuleBlock$constant():
            case KindCaseClause$constant():
            case KindDefaultClause$constant(): {
                return true;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
    static Children(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJsxElement$constant(): {
                return (Node.AsJsxElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                break;
            }
            case KindJsxFragment$constant(): {
                return (Node.AsJsxFragment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                break;
            }
        }
        const __gotots_argument_5 = new $goInterfaceAdapter$string("Unhandled case in Node.Children: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static ClassLikeData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ClassLikeBase> | undefined {
        const __gotots_receiver_16 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_16).ClassLikeData();
    }
    static ClassName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJSDocAugmentsTag$constant(): {
                return (Node.AsJSDocAugmentsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassName;
                break;
            }
            case KindJSDocImplementsTag$constant(): {
                return (Node.AsJSDocImplementsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassName;
                break;
            }
        }
        const __gotots_argument_17 = new $goInterfaceAdapter$string("Unhandled case in Node.ClassName: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Clone(n: tsonicTypeScriptRuntime.Location<Node> | undefined, f: NodeFactoryCoercible | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        const __gotots_receiver_9 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        const __gotots_argument_24 = f;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_9).Clone(__gotots_argument_24);
    }
    static CommentList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJSDoc$constant(): {
                return JSDoc.$storageOf(((Node.AsJSDoc(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc>).value).Comment;
                break;
            }
            case KindJSDocUnknownTag$constant(): {
                return (void JSDocTagBase.$storageOf, (void JSDocTagBase.$fromStorage,
                    JSDocUnknownTag.$storageOf(((Node.AsJSDocUnknownTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocUnknownTag>).value).JSDocTagBase)).Comment;
                break;
            }
            case KindJSDocAugmentsTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocAugmentsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocImplementsTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocImplementsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocDeprecatedTag$constant(): {
                return (void JSDocTagBase.$storageOf, (void JSDocTagBase.$fromStorage,
                    JSDocDeprecatedTag.$storageOf(((Node.AsJSDocDeprecatedTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag>).value).JSDocTagBase)).Comment;
                break;
            }
            case KindJSDocPublicTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocPublicTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocPrivateTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocPrivateTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocProtectedTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocProtectedTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocReadonlyTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocReadonlyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocOverrideTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocOverrideTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocCallbackTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocCallbackTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocOverloadTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocOverloadTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocParameterTag$constant():
            case KindJSDocPropertyTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocParameterOrPropertyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocReturnTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocReturnTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocThisTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocThisTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocTypeTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocTypeTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocTemplateTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocTemplateTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocTypedefTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocTypedefTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocSeeTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocSeeTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocSatisfiesTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocSatisfiesTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocThrowsTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocThrowsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
            case KindJSDocImportTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocImportTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment;
                break;
            }
        }
        const __gotots_argument_23 = new $goInterfaceAdapter$string("Unhandled case in Node.CommentList: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_23 === undefined ? GoPanicNilValue.create() : __gotots_argument_23);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Comments(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.CommentList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static DeclarationData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<DeclarationBase> | undefined {
        const __gotots_receiver_12 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_12).DeclarationData();
    }
    static Decorators(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        if (Node.Modifiers(n) === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
        }
        return Filter$PointerTo_Named_ast$Node((void NodeList.$storageOf, (void NodeList.$fromStorage,
            ModifierList.$storageOf(((Node.Modifiers(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes, IsDecorator);
    }
    static EagerJSDoc(node: tsonicTypeScriptRuntime.Location<Node> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        if ((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsHasJSDoc$constant()) >>> 0 === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
        }
        if (file === undefined) {
            file = GetSourceFileOfNode(node);
            if (file === undefined) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
            }
        }
        if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.hasLazyJSDoc) {
            sync__from_gostdlib.RWMutex.RLock(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu);
            let jsdocs = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.lookup(node);
            sync__from_gostdlib.RWMutex.RUnlock(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu);
            return jsdocs;
        }
        return ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.lookup(node);
    }
    static ElementList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindNamedImports$constant(): {
                return (Node.AsNamedImports(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
                break;
            }
            case KindNamedExports$constant(): {
                return (Node.AsNamedExports(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
                break;
            }
            case KindObjectBindingPattern$constant():
            case KindArrayBindingPattern$constant(): {
                return (Node.AsBindingPattern(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
                break;
            }
            case KindArrayLiteralExpression$constant(): {
                return (Node.AsArrayLiteralExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
                break;
            }
            case KindTupleType$constant(): {
                return (Node.AsTupleTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
                break;
            }
        }
        const __gotots_argument_0 = new $goInterfaceAdapter$string("Unhandled case in Node.ElementList: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Elements(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.ElementList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static End(n: tsonicTypeScriptRuntime.Location<Node> | undefined): int {
        return TextRange__from_core.$fromStorage(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).End();
    }
    static ExportableData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ExportableBase> | undefined {
        const __gotots_receiver_15 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_15).ExportableData();
    }
    static Expression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindPropertyAccessExpression$constant(): {
                return PropertyAccessExpression.$storageOf(((Node.AsPropertyAccessExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression>).value).Expression;
                break;
            }
            case KindElementAccessExpression$constant(): {
                return ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).Expression;
                break;
            }
            case KindParenthesizedExpression$constant(): {
                return ParenthesizedExpression.$storageOf(((Node.AsParenthesizedExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression>).value).Expression;
                break;
            }
            case KindCallExpression$constant(): {
                return CallExpression.$storageOf(((Node.AsCallExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Expression;
                break;
            }
            case KindNewExpression$constant(): {
                return (Node.AsNewExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindExpressionWithTypeArguments$constant(): {
                return ExpressionWithTypeArguments.$storageOf(((Node.AsExpressionWithTypeArguments(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments>).value).Expression;
                break;
            }
            case KindComputedPropertyName$constant(): {
                return (Node.AsComputedPropertyName(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindNonNullExpression$constant(): {
                return (Node.AsNonNullExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindTypeAssertionExpression$constant(): {
                return (Node.AsTypeAssertion(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindAsExpression$constant(): {
                return (Node.AsAsExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindSatisfiesExpression$constant(): {
                return (Node.AsSatisfiesExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindTypeOfExpression$constant(): {
                return (Node.AsTypeOfExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindSpreadAssignment$constant(): {
                return (Node.AsSpreadAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindSpreadElement$constant(): {
                return (Node.AsSpreadElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindTemplateSpan$constant(): {
                return (Node.AsTemplateSpan(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindDeleteExpression$constant(): {
                return (Node.AsDeleteExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindVoidExpression$constant(): {
                return (Node.AsVoidExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindAwaitExpression$constant(): {
                return (Node.AsAwaitExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindYieldExpression$constant(): {
                return (Node.AsYieldExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindPartiallyEmittedExpression$constant(): {
                return (Node.AsPartiallyEmittedExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindIfStatement$constant(): {
                return IfStatement.$storageOf(((Node.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement>).value).Expression;
                break;
            }
            case KindDoStatement$constant(): {
                return (Node.AsDoStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindWhileStatement$constant(): {
                return (Node.AsWhileStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindWithStatement$constant(): {
                return (Node.AsWithStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindForInStatement$constant():
            case KindForOfStatement$constant(): {
                return (Node.AsForInOrOfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindSwitchStatement$constant(): {
                return (Node.AsSwitchStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindCaseClause$constant(): {
                return (Node.AsCaseOrDefaultClause(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindExpressionStatement$constant(): {
                return ExpressionStatement.$storageOf(((Node.AsExpressionStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement>).value).Expression;
                break;
            }
            case KindReturnStatement$constant(): {
                return ReturnStatement.$storageOf(((Node.AsReturnStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement>).value).Expression;
                break;
            }
            case KindThrowStatement$constant(): {
                return (Node.AsThrowStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindExternalModuleReference$constant(): {
                return (Node.AsExternalModuleReference(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindExportAssignment$constant(): {
                return (Node.AsExportAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindDecorator$constant(): {
                return (Node.AsDecorator(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindJsxExpression$constant(): {
                return (Node.AsJsxExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
            case KindJsxSpreadAttribute$constant(): {
                return (Node.AsJsxSpreadAttribute(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
                break;
            }
        }
        const __gotots_argument_1 = new $goInterfaceAdapter$string("Unhandled case in Node.Expression: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static FlowNodeData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<FlowNodeBase> | undefined {
        const __gotots_receiver_11 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_11).FlowNodeData();
    }
    static ForEachChild(n: tsonicTypeScriptRuntime.Location<Node> | undefined, v: Visitor): bool {
        const __gotots_receiver_2 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        const __gotots_argument_6 = v;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_2).ForEachChild(__gotots_argument_6);
    }
    static FunctionLikeData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined {
        const __gotots_receiver_5 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_5).FunctionLikeData();
    }
    static ImportClause(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindImportDeclaration$constant():
            case KindJSImportDeclaration$constant(): {
                return (Node.AsImportDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
                break;
            }
            case KindJSDocImportTag$constant(): {
                return (Node.AsJSDocImportTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
                break;
            }
        }
        const __gotots_argument_18 = new $goInterfaceAdapter$string("Unhandled case in Node.ImportClause: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_18 === undefined ? GoPanicNilValue.create() : __gotots_argument_18);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Initializer(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindVariableDeclaration$constant(): {
                return VariableDeclaration.$storageOf(((Node.AsVariableDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration>).value).Initializer;
                break;
            }
            case KindParameter$constant(): {
                return ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).Initializer;
                break;
            }
            case KindBindingElement$constant(): {
                return (Node.AsBindingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
                break;
            }
            case KindPropertyDeclaration$constant(): {
                return (Node.AsPropertyDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
                break;
            }
            case KindPropertySignature$constant(): {
                return PropertySignatureDeclaration.$storageOf(((Node.AsPropertySignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration>).value).Initializer;
                break;
            }
            case KindPropertyAssignment$constant(): {
                return PropertyAssignment.$storageOf(((Node.AsPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment>).value).Initializer;
                break;
            }
            case KindEnumMember$constant(): {
                return (Node.AsEnumMember(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
                break;
            }
            case KindForStatement$constant(): {
                return (Node.AsForStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
                break;
            }
            case KindForInStatement$constant():
            case KindForOfStatement$constant(): {
                return (Node.AsForInOrOfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
                break;
            }
            case KindJsxAttribute$constant(): {
                return (Node.AsJsxAttribute(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
                break;
            }
        }
        const __gotots_argument_14 = new $goInterfaceAdapter$string("Unhandled case in Node.Initializer");
        GoPanic.raise(__gotots_argument_14 === undefined ? GoPanicNilValue.create() : __gotots_argument_14);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static IsJSDoc(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
        return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindJSDoc$constant();
    }
    static IsTypeOnly(n: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindImportEqualsDeclaration$constant(): {
                return (Node.AsImportEqualsDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly;
                break;
            }
            case KindImportSpecifier$constant(): {
                return ImportSpecifier.$storageOf(((Node.AsImportSpecifier(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier>).value).IsTypeOnly;
                break;
            }
            case KindImportClause$constant(): {
                return (Node.AsImportClause(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier === KindTypeKeyword$constant();
                break;
            }
            case KindExportDeclaration$constant(): {
                return (Node.AsExportDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly;
                break;
            }
            case KindExportSpecifier$constant(): {
                return (Node.AsExportSpecifier(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly;
                break;
            }
        }
        return false;
    }
    static JSDoc(node: tsonicTypeScriptRuntime.Location<Node> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        if ((Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsHasJSDoc$constant()) >>> 0 === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
        }
        if (file === undefined) {
            file = GetSourceFileOfNode(node);
            if (file === undefined) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
            }
        }
        if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.hasLazyJSDoc) {
            return SourceFile.$go$private$ast$resolveJSDoc(file, node);
        }
        return ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.lookup(node);
    }
    static KindString(n: tsonicTypeScriptRuntime.Location<Node> | undefined): gostring {
        return Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind);
    }
    static Label(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindLabeledStatement$constant(): {
                return (Node.AsLabeledStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label;
                break;
            }
            case KindBreakStatement$constant(): {
                return (Node.AsBreakStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label;
                break;
            }
            case KindContinueStatement$constant(): {
                return (Node.AsContinueStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label;
                break;
            }
        }
        const __gotots_argument_26 = new $goInterfaceAdapter$string("Unhandled case in Node.Label: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_26 === undefined ? GoPanicNilValue.create() : __gotots_argument_26);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static LiteralLikeData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<LiteralLikeNodeBase> | undefined {
        const __gotots_receiver_18 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_18).LiteralLikeData();
    }
    static LocalSymbol(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Symbol> | undefined {
        let data: tsonicTypeScriptRuntime.Location<ExportableBase> | undefined = Node.ExportableData(n);
        if (!(data === undefined)) {
            return ExportableBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportableBase>).value).LocalSymbol;
        }
        return void 0;
    }
    static Locals(n: tsonicTypeScriptRuntime.Location<Node> | undefined): SymbolTable {
        let data: tsonicTypeScriptRuntime.Location<LocalsContainerBase> | undefined = Node.LocalsContainerData(n);
        if (!(data === undefined)) {
            return new SymbolTable(LocalsContainerBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LocalsContainerBase>).value).Locals);
        }
        return new SymbolTable($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.nil());
    }
    static LocalsContainerData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<LocalsContainerBase> | undefined {
        const __gotots_receiver_14 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_14).LocalsContainerData();
    }
    static MemberList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindClassDeclaration$constant(): {
                return (Node.AsClassDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members;
                break;
            }
            case KindClassExpression$constant(): {
                return (Node.AsClassExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members;
                break;
            }
            case KindInterfaceDeclaration$constant(): {
                return InterfaceDeclaration.$storageOf(((Node.AsInterfaceDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration>).value).Members;
                break;
            }
            case KindEnumDeclaration$constant(): {
                return (Node.AsEnumDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members;
                break;
            }
            case KindTypeLiteral$constant(): {
                return TypeLiteralNode.$storageOf(((Node.AsTypeLiteralNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeLiteralNode>).value).Members;
                break;
            }
            case KindMappedType$constant(): {
                return (Node.AsMappedTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members;
                break;
            }
        }
        const __gotots_argument_27 = new $goInterfaceAdapter$string("Unhandled case in Node.MemberList: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_27 === undefined ? GoPanicNilValue.create() : __gotots_argument_27);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Members(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.MemberList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static ModifierFlags(n: tsonicTypeScriptRuntime.Location<Node> | undefined): ModifierFlags {
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList> | undefined = Node.Modifiers(n);
        if (!(modifiers === undefined)) {
            return ModifierList.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).ModifierFlags;
        }
        return ModifierFlagsNone$constant();
    }
    static ModifierNodes(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList> | undefined = Node.Modifiers(n);
        if (!(modifiers === undefined)) {
            return (void NodeList.$storageOf, (void NodeList.$fromStorage,
                ModifierList.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value).NodeList)).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static Modifiers(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<ModifierList> | undefined {
        const __gotots_receiver_4 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_4).Modifiers();
    }
    static ModuleSpecifier(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindImportDeclaration$constant():
            case KindJSImportDeclaration$constant(): {
                return (Node.AsImportDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                break;
            }
            case KindExportDeclaration$constant(): {
                return (Node.AsExportDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                break;
            }
            case KindJSDocImportTag$constant(): {
                return (Node.AsJSDocImportTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                break;
            }
        }
        const __gotots_argument_7 = new $goInterfaceAdapter$string("Unhandled case in Node.ModuleSpecifier: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Name(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        const __gotots_receiver_0 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_0).Name();
    }
    static ParameterList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        const __gotots_receiver_6 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return FunctionLikeBase.$storageOf(((goInterfaceNonNil<nodeData>(__gotots_receiver_6).FunctionLikeData() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase>).value).Parameters;
    }
    static Parameters(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        return NodeList.$storageOf(((Node.ParameterList(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
    }
    static Pos(n: tsonicTypeScriptRuntime.Location<Node> | undefined): int {
        return TextRange__from_core.$fromStorage(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc).Pos();
    }
    static PostfixToken(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindMethodDeclaration$constant(): {
                return NamedMemberBase.$storageOf((Node.AsMethodDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
                break;
            }
            case KindShorthandPropertyAssignment$constant(): {
                return NamedMemberBase.$storageOf((Node.AsShorthandPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
                break;
            }
            case KindMethodSignature$constant(): {
                return (void NamedMemberBase.$storageOf, (void NamedMemberBase.$fromStorage,
                    MethodSignatureDeclaration.$storageOf(((Node.AsMethodSignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration>).value).NamedMemberBase)).PostfixToken;
                break;
            }
            case KindPropertySignature$constant(): {
                return (void NamedMemberBase.$storageOf, (void NamedMemberBase.$fromStorage,
                    PropertySignatureDeclaration.$storageOf(((Node.AsPropertySignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration>).value).NamedMemberBase)).PostfixToken;
                break;
            }
            case KindPropertyAssignment$constant(): {
                return (void NamedMemberBase.$storageOf, (void NamedMemberBase.$fromStorage,
                    PropertyAssignment.$storageOf(((Node.AsPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment>).value).NamedMemberBase)).PostfixToken;
                break;
            }
            case KindPropertyDeclaration$constant(): {
                return NamedMemberBase.$storageOf((Node.AsPropertyDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
                break;
            }
            case KindEnumMember$constant(): {
                return NamedMemberBase.$storageOf((Node.AsEnumMember(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
                break;
            }
            case KindGetAccessor$constant(): {
                return NamedMemberBase.$storageOf((Node.AsGetAccessorDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NamedMemberBase).PostfixToken;
                break;
            }
            case KindSetAccessor$constant(): {
                return NamedMemberBase.$storageOf((Node.AsSetAccessorDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NamedMemberBase).PostfixToken;
                break;
            }
        }
        return void 0;
    }
    static Properties(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.PropertyList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static PropertyList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindObjectLiteralExpression$constant(): {
                return (Node.AsObjectLiteralExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties;
                break;
            }
            case KindJsxAttributes$constant(): {
                return (Node.AsJsxAttributes(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties;
                break;
            }
        }
        const __gotots_argument_28 = new $goInterfaceAdapter$string("Unhandled case in Node.PropertyList: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_28 === undefined ? GoPanicNilValue.create() : __gotots_argument_28);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static PropertyName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindImportSpecifier$constant(): {
                return ImportSpecifier.$storageOf(((Node.AsImportSpecifier(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier>).value).PropertyName;
                break;
            }
            case KindExportSpecifier$constant(): {
                return (Node.AsExportSpecifier(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
                break;
            }
            case KindBindingElement$constant(): {
                return (Node.AsBindingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
                break;
            }
        }
        return void 0;
    }
    static PropertyNameOrName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.PropertyName(n);
        if (name === undefined) {
            name = Node.Name(n);
        }
        return name;
    }
    static QuestionDotToken(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindElementAccessExpression$constant(): {
                return ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).QuestionDotToken;
                break;
            }
            case KindPropertyAccessExpression$constant(): {
                return PropertyAccessExpression.$storageOf(((Node.AsPropertyAccessExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression>).value).QuestionDotToken;
                break;
            }
            case KindCallExpression$constant(): {
                return CallExpression.$storageOf(((Node.AsCallExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).QuestionDotToken;
                break;
            }
            case KindTaggedTemplateExpression$constant(): {
                return (Node.AsTaggedTemplateExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionDotToken;
                break;
            }
        }
        const __gotots_argument_30 = new $goInterfaceAdapter$string("Unhandled case in Node.QuestionDotToken: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_30 === undefined ? GoPanicNilValue.create() : __gotots_argument_30);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static QuestionToken(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindParameter$constant(): {
                return ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).QuestionToken;
                break;
            }
            case KindConditionalExpression$constant(): {
                return ConditionalExpression.$storageOf(((Node.AsConditionalExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression>).value).QuestionToken;
                break;
            }
            case KindMappedType$constant(): {
                return (Node.AsMappedTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken;
                break;
            }
            case KindNamedTupleMember$constant(): {
                return (Node.AsNamedTupleMember(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken;
                break;
            }
        }
        let postfix: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.PostfixToken(n);
        if (!(postfix === undefined) && Node.$storageOf(((postfix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindQuestionToken$constant()) {
            return postfix;
        }
        return void 0;
    }
    static RawText(n: tsonicTypeScriptRuntime.Location<Node> | undefined): gostring {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindTemplateHead$constant(): {
                return (Node.AsTemplateHead(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.RawText;
                break;
            }
            case KindTemplateMiddle$constant(): {
                return (Node.AsTemplateMiddle(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.RawText;
                break;
            }
            case KindTemplateTail$constant(): {
                return (Node.AsTemplateTail(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.RawText;
                break;
            }
        }
        const __gotots_argument_59 = new $goInterfaceAdapter$string("Unhandled case in Node.RawText: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_59 === undefined ? GoPanicNilValue.create() : __gotots_argument_59);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Statement(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindDoStatement$constant(): {
                return (Node.AsDoStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement;
                break;
            }
            case KindWhileStatement$constant(): {
                return (Node.AsWhileStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement;
                break;
            }
            case KindForStatement$constant(): {
                return (Node.AsForStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement;
                break;
            }
            case KindForInStatement$constant():
            case KindForOfStatement$constant(): {
                return (Node.AsForInOrOfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement;
                break;
            }
            case KindWithStatement$constant(): {
                return (Node.AsWithStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement;
                break;
            }
            case KindLabeledStatement$constant(): {
                return (Node.AsLabeledStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement;
                break;
            }
        }
        const __gotots_argument_33 = new $goInterfaceAdapter$string("Unhandled case in Node.Statement: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_33 === undefined ? GoPanicNilValue.create() : __gotots_argument_33);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static StatementList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindSourceFile$constant(): {
                return ((Node.AsSourceFile(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Statements;
                break;
            }
            case KindBlock$constant(): {
                return Block.$storageOf(((Node.AsBlock(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block>).value).Statements;
                break;
            }
            case KindModuleBlock$constant(): {
                return (Node.AsModuleBlock(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements;
                break;
            }
            case KindCaseClause$constant():
            case KindDefaultClause$constant(): {
                return (Node.AsCaseOrDefaultClause(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements;
                break;
            }
        }
        const __gotots_argument_8 = new $goInterfaceAdapter$string("Unhandled case in Node.StatementList: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Statements(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.StatementList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static SubtreeFacts(n: tsonicTypeScriptRuntime.Location<Node> | undefined): SubtreeFacts {
        const __gotots_receiver_8 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_8).SubtreeFacts();
    }
    static Symbol(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Symbol> | undefined {
        let data: tsonicTypeScriptRuntime.Location<DeclarationBase> | undefined = Node.DeclarationData(n);
        if (!(data === undefined)) {
            return DeclarationBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationBase>).value).Symbol;
        }
        return void 0;
    }
    static TagName(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJsxOpeningElement$constant(): {
                return (Node.AsJsxOpeningElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName;
                break;
            }
            case KindJsxClosingElement$constant(): {
                return (Node.AsJsxClosingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName;
                break;
            }
            case KindJsxSelfClosingElement$constant(): {
                return (Node.AsJsxSelfClosingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName;
                break;
            }
            case KindJSDocUnknownTag$constant(): {
                return (void JSDocTagBase.$storageOf, (void JSDocTagBase.$fromStorage,
                    JSDocUnknownTag.$storageOf(((Node.AsJSDocUnknownTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocUnknownTag>).value).JSDocTagBase)).TagName;
                break;
            }
            case KindJSDocAugmentsTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocAugmentsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocImplementsTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocImplementsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocDeprecatedTag$constant(): {
                return (void JSDocTagBase.$storageOf, (void JSDocTagBase.$fromStorage,
                    JSDocDeprecatedTag.$storageOf(((Node.AsJSDocDeprecatedTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag>).value).JSDocTagBase)).TagName;
                break;
            }
            case KindJSDocPublicTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocPublicTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocPrivateTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocPrivateTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocProtectedTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocProtectedTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocReadonlyTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocReadonlyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocOverrideTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocOverrideTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocCallbackTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocCallbackTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocOverloadTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocOverloadTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocParameterTag$constant():
            case KindJSDocPropertyTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocParameterOrPropertyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocReturnTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocReturnTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocThisTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocThisTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocTypeTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocTypeTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocTemplateTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocTemplateTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocTypedefTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocTypedefTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocSeeTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocSeeTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocSatisfiesTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocSatisfiesTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocThrowsTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocThrowsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
            case KindJSDocImportTag$constant(): {
                return JSDocTagBase.$storageOf((Node.AsJSDocImportTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
                break;
            }
        }
        const __gotots_argument_4 = new $goInterfaceAdapter$string("Unhandled case in Node.TagName: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static TemplateLiteralLikeData(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase> | undefined {
        const __gotots_receiver_17 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_17).TemplateLiteralLikeData();
    }
    static Text(n: tsonicTypeScriptRuntime.Location<Node> | undefined): gostring {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindIdentifier$constant(): {
                return Identifier.$storageOf(((Node.AsIdentifier(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier>).value).Text;
                break;
            }
            case KindPrivateIdentifier$constant(): {
                return (Node.AsPrivateIdentifier(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Text;
                break;
            }
            case KindStringLiteral$constant(): {
                return (void LiteralLikeNodeBase.$storageOf, (void LiteralLikeNodeBase.$fromStorage,
                    (void LiteralExpressionBase.$storageOf, (void LiteralExpressionBase.$fromStorage,
                        StringLiteral.$storageOf(((Node.AsStringLiteral(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).Text;
                break;
            }
            case KindNumericLiteral$constant(): {
                return (void LiteralLikeNodeBase.$storageOf, (void LiteralLikeNodeBase.$fromStorage,
                    (void LiteralExpressionBase.$storageOf, (void LiteralExpressionBase.$fromStorage,
                        NumericLiteral.$storageOf(((Node.AsNumericLiteral(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NumericLiteral>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).Text;
                break;
            }
            case KindBigIntLiteral$constant(): {
                return (void LiteralLikeNodeBase.$storageOf, (void LiteralLikeNodeBase.$fromStorage,
                    LiteralExpressionBase.$storageOf((Node.AsBigIntLiteral(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralExpressionBase).LiteralLikeNodeBase)).Text;
                break;
            }
            case KindMetaProperty$constant(): {
                return Node.Text(MetaProperty.Name(Node.AsMetaProperty(n)));
                break;
            }
            case KindNoSubstitutionTemplateLiteral$constant(): {
                return LiteralLikeNodeBase.$storageOf((Node.AsNoSubstitutionTemplateLiteral(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text;
                break;
            }
            case KindTemplateHead$constant(): {
                return LiteralLikeNodeBase.$storageOf((Node.AsTemplateHead(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text;
                break;
            }
            case KindTemplateMiddle$constant(): {
                return LiteralLikeNodeBase.$storageOf((Node.AsTemplateMiddle(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text;
                break;
            }
            case KindTemplateTail$constant(): {
                return LiteralLikeNodeBase.$storageOf((Node.AsTemplateTail(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateLiteralLikeNodeBase.LiteralLikeNodeBase).Text;
                break;
            }
            case KindJsxNamespacedName$constant(): {
                return Node.Text((Node.AsJsxNamespacedName(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace) + ":" + Node.Text((Node.AsJsxNamespacedName(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name);
                break;
            }
            case KindRegularExpressionLiteral$constant(): {
                return (void LiteralLikeNodeBase.$storageOf, (void LiteralLikeNodeBase.$fromStorage,
                    LiteralExpressionBase.$storageOf((Node.AsRegularExpressionLiteral(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralExpressionBase).LiteralLikeNodeBase)).Text;
                break;
            }
            case KindJSDocText$constant(): {
                return strings__from_gostdlib.Join((void JSDocCommentBase.$storageOf, (void JSDocCommentBase.$fromStorage,
                    JSDocText.$storageOf(((Node.AsJSDocText(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocText>).value).JSDocCommentBase)).text, "");
                break;
            }
            case KindJSDocLink$constant(): {
                return strings__from_gostdlib.Join(JSDocCommentBase.$storageOf((Node.AsJSDocLink(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocCommentBase).text, "");
                break;
            }
            case KindJSDocLinkCode$constant(): {
                return strings__from_gostdlib.Join(JSDocCommentBase.$storageOf((Node.AsJSDocLinkCode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocCommentBase).text, "");
                break;
            }
            case KindJSDocLinkPlain$constant(): {
                return strings__from_gostdlib.Join(JSDocCommentBase.$storageOf((Node.AsJSDocLinkPlain(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocCommentBase).text, "");
                break;
            }
        }
        const __gotots_argument_2 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unhandled case in Node.Text: %T", RuntimeSlice.literal<GoInterface | undefined>([Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data])));
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Type(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindVariableDeclaration$constant(): {
                return VariableDeclaration.$storageOf(((Node.AsVariableDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration>).value).Type;
                break;
            }
            case KindParameter$constant(): {
                return ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).Type;
                break;
            }
            case KindPropertySignature$constant(): {
                return PropertySignatureDeclaration.$storageOf(((Node.AsPropertySignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration>).value).Type;
                break;
            }
            case KindPropertyDeclaration$constant(): {
                return (Node.AsPropertyDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindPropertyAssignment$constant(): {
                return PropertyAssignment.$storageOf(((Node.AsPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment>).value).Type;
                break;
            }
            case KindShorthandPropertyAssignment$constant(): {
                return (Node.AsShorthandPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindTypePredicate$constant(): {
                return (Node.AsTypePredicateNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindParenthesizedType$constant(): {
                return ParenthesizedTypeNode.$storageOf(((Node.AsParenthesizedTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode>).value).Type;
                break;
            }
            case KindTypeOperator$constant(): {
                return TypeOperatorNode.$storageOf(((Node.AsTypeOperatorNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode>).value).Type;
                break;
            }
            case KindMappedType$constant(): {
                return (Node.AsMappedTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindTypeAssertionExpression$constant(): {
                return (Node.AsTypeAssertion(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindAsExpression$constant(): {
                return (Node.AsAsExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindSatisfiesExpression$constant(): {
                return (Node.AsSatisfiesExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindTypeAliasDeclaration$constant():
            case KindJSTypeAliasDeclaration$constant(): {
                return TypeAliasDeclaration.$storageOf(((Node.AsTypeAliasDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration>).value).Type;
                break;
            }
            case KindNamedTupleMember$constant(): {
                return (Node.AsNamedTupleMember(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindOptionalType$constant(): {
                return (Node.AsOptionalTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindRestType$constant(): {
                return (Node.AsRestTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindTemplateLiteralTypeSpan$constant(): {
                return (Node.AsTemplateLiteralTypeSpan(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindJSDocTypeExpression$constant(): {
                return (Node.AsJSDocTypeExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindJSDocParameterTag$constant():
            case KindJSDocPropertyTag$constant(): {
                return (Node.AsJSDocParameterOrPropertyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocNullableType$constant(): {
                return (Node.AsJSDocNullableType(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindJSDocNonNullableType$constant(): {
                return (Node.AsJSDocNonNullableType(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindJSDocOptionalType$constant(): {
                return (Node.AsJSDocOptionalType(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindExportAssignment$constant(): {
                return (Node.AsExportAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                break;
            }
            case KindBinaryExpression$constant(): {
                return BinaryExpression.$storageOf(((Node.AsBinaryExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Type;
                break;
            }
            default: {
                {
                    let funcLike: tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined = Node.FunctionLikeData(n);
                    if (!(funcLike === undefined)) {
                        return FunctionLikeBase.$storageOf(((funcLike ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase>).value).Type;
                    }
                }
                break;
            }
        }
        return void 0;
    }
    static TypeArgumentList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindCallExpression$constant(): {
                return CallExpression.$storageOf(((Node.AsCallExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).TypeArguments;
                break;
            }
            case KindNewExpression$constant(): {
                return (Node.AsNewExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments;
                break;
            }
            case KindTaggedTemplateExpression$constant(): {
                return (Node.AsTaggedTemplateExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments;
                break;
            }
            case KindTypeReference$constant(): {
                return (void NodeWithTypeArgumentsBase.$storageOf, (void NodeWithTypeArgumentsBase.$fromStorage,
                    TypeReferenceNode.$storageOf(((Node.AsTypeReferenceNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode>).value).NodeWithTypeArgumentsBase)).TypeArguments;
                break;
            }
            case KindExpressionWithTypeArguments$constant(): {
                return ExpressionWithTypeArguments.$storageOf(((Node.AsExpressionWithTypeArguments(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments>).value).TypeArguments;
                break;
            }
            case KindImportType$constant(): {
                return NodeWithTypeArgumentsBase.$storageOf((Node.AsImportTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments;
                break;
            }
            case KindTypeQuery$constant(): {
                return NodeWithTypeArgumentsBase.$storageOf((Node.AsTypeQueryNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments;
                break;
            }
            case KindJsxOpeningElement$constant(): {
                return (Node.AsJsxOpeningElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments;
                break;
            }
            case KindJsxSelfClosingElement$constant(): {
                return (Node.AsJsxSelfClosingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments;
                break;
            }
        }
        const __gotots_argument_19 = new $goInterfaceAdapter$string("Unhandled case in Node.TypeArguments");
        GoPanic.raise(__gotots_argument_19 === undefined ? GoPanicNilValue.create() : __gotots_argument_19);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static TypeArguments(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.TypeArgumentList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static TypeExpression(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindJSDocParameterTag$constant():
            case KindJSDocPropertyTag$constant(): {
                return (Node.AsJSDocParameterOrPropertyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocReturnTag$constant(): {
                return (Node.AsJSDocReturnTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocTypeTag$constant(): {
                return (Node.AsJSDocTypeTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocTypedefTag$constant(): {
                return (Node.AsJSDocTypedefTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocCallbackTag$constant(): {
                return (Node.AsJSDocCallbackTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocSatisfiesTag$constant(): {
                return (Node.AsJSDocSatisfiesTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
            case KindJSDocThrowsTag$constant(): {
                return (Node.AsJSDocThrowsTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                break;
            }
        }
        const __gotots_argument_10 = new $goInterfaceAdapter$string("Unhandled case in Node.TypeExpression: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
        GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static TypeParameterList(n: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<NodeList> | undefined {
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindClassDeclaration$constant(): {
                return (Node.AsClassDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters;
                break;
            }
            case KindClassExpression$constant(): {
                return (Node.AsClassExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters;
                break;
            }
            case KindInterfaceDeclaration$constant(): {
                return InterfaceDeclaration.$storageOf(((Node.AsInterfaceDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration>).value).TypeParameters;
                break;
            }
            case KindTypeAliasDeclaration$constant():
            case KindJSTypeAliasDeclaration$constant(): {
                return TypeAliasDeclaration.$storageOf(((Node.AsTypeAliasDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration>).value).TypeParameters;
                break;
            }
            case KindJSDocTemplateTag$constant(): {
                return (Node.AsJSDocTemplateTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameters;
                break;
            }
            default: {
                let funcLike: tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined = Node.FunctionLikeData(n);
                if (!(funcLike === undefined)) {
                    return FunctionLikeBase.$storageOf(((funcLike ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase>).value).TypeParameters;
                }
                break;
            }
        }
        const __gotots_argument_13 = new $goInterfaceAdapter$string("Unhandled case in Node.TypeParameterList");
        GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static TypeParameters(n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let list: tsonicTypeScriptRuntime.Location<NodeList> | undefined = Node.TypeParameterList(n);
        if (!(list === undefined)) {
            return NodeList.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
    }
    static VisitEachChild(n: tsonicTypeScriptRuntime.Location<Node> | undefined, v: {
        value: NodeVisitor;
    } | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        const __gotots_receiver_13 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        const __gotots_argument_25 = v;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_13).VisitEachChild(__gotots_argument_25);
    }
    static $go$private$ast$propagateSubtreeFacts(n: tsonicTypeScriptRuntime.Location<Node> | undefined): SubtreeFacts {
        const __gotots_receiver_24 = Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_24).$go$private$ast$propagateSubtreeFacts();
    }
}
export type MutableNode$Storage = {
    Kind: int16;
    Flags: uint32;
    Loc: TextRange__from_core$Storage;
    id: atomic__from_gostdlib.Uint64;
    Parent: tsonicTypeScriptRuntime.Location<Node> | undefined;
    data: nodeData | undefined;
};
export class MutableNode {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: MutableNode$Storage) {
    }
    public static $storageOf($source: MutableNode): MutableNode$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: MutableNode$Storage): MutableNode {
        return new MutableNode($source);
    }
    public get Kind(): Kind {
        return this.$storage.Kind;
    }
    public set Kind($value: Kind) {
        this.$storage.Kind = $value;
    }
    public get Flags(): NodeFlags {
        return this.$storage.Flags;
    }
    public set Flags($value: NodeFlags) {
        this.$storage.Flags = $value;
    }
    public get Loc(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.Loc);
    }
    public set Loc($value: TextRange__from_core) {
        this.$storage.Loc = TextRange__from_core.$storageOf($value);
    }
    public get id(): atomic__from_gostdlib.Uint64 {
        return this.$storage.id;
    }
    public set id($value: atomic__from_gostdlib.Uint64) {
        this.$storage.id = $value;
    }
    public get Parent(): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return this.$storage.Parent;
    }
    public set Parent($value: tsonicTypeScriptRuntime.Location<Node> | undefined) {
        this.$storage.Parent = $value;
    }
    public get data(): nodeData | undefined {
        return this.$storage.data;
    }
    public set data($value: nodeData | undefined) {
        this.$storage.data = $value;
    }
    declare private readonly then?: never;
    static SetExpression(m: tsonicTypeScriptRuntime.Location<MutableNode> | undefined, expr: tsonicTypeScriptRuntime.Location<Node> | undefined): void {
        let n: tsonicTypeScriptRuntime.Location<Node> | undefined = tsonicTypeScriptRuntime.projectLocation<MutableNode, Node>(m, ($go$source: MutableNode): Node => {
            return Node.$fromStorage(MutableNode.$storageOf($go$source));
        }, ($go$target: Node): MutableNode => {
            return MutableNode.$fromStorage(Node.$storageOf($go$target));
        });
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindPropertyAccessExpression$constant(): {
                PropertyAccessExpression.$storageOf(((Node.AsPropertyAccessExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression>).value).Expression = expr;
                break;
            }
            case KindElementAccessExpression$constant(): {
                ElementAccessExpression.$storageOf(((Node.AsElementAccessExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression>).value).Expression = expr;
                break;
            }
            case KindParenthesizedExpression$constant(): {
                ParenthesizedExpression.$storageOf(((Node.AsParenthesizedExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression>).value).Expression = expr;
                break;
            }
            case KindCallExpression$constant(): {
                CallExpression.$storageOf(((Node.AsCallExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression>).value).Expression = expr;
                break;
            }
            case KindNewExpression$constant(): {
                (Node.AsNewExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindExpressionWithTypeArguments$constant(): {
                ExpressionWithTypeArguments.$storageOf(((Node.AsExpressionWithTypeArguments(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments>).value).Expression = expr;
                break;
            }
            case KindComputedPropertyName$constant(): {
                (Node.AsComputedPropertyName(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindNonNullExpression$constant(): {
                (Node.AsNonNullExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindTypeAssertionExpression$constant(): {
                (Node.AsTypeAssertion(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindAsExpression$constant(): {
                (Node.AsAsExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindSatisfiesExpression$constant(): {
                (Node.AsSatisfiesExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindTypeOfExpression$constant(): {
                (Node.AsTypeOfExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindSpreadAssignment$constant(): {
                (Node.AsSpreadAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindSpreadElement$constant(): {
                (Node.AsSpreadElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindTemplateSpan$constant(): {
                (Node.AsTemplateSpan(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindDeleteExpression$constant(): {
                (Node.AsDeleteExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindVoidExpression$constant(): {
                (Node.AsVoidExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindAwaitExpression$constant(): {
                (Node.AsAwaitExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindYieldExpression$constant(): {
                (Node.AsYieldExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindPartiallyEmittedExpression$constant(): {
                (Node.AsPartiallyEmittedExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindIfStatement$constant(): {
                IfStatement.$storageOf(((Node.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement>).value).Expression = expr;
                break;
            }
            case KindDoStatement$constant(): {
                (Node.AsDoStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindWhileStatement$constant(): {
                (Node.AsWhileStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindWithStatement$constant(): {
                (Node.AsWithStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindForInStatement$constant():
            case KindForOfStatement$constant(): {
                (Node.AsForInOrOfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindSwitchStatement$constant(): {
                (Node.AsSwitchStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindCaseClause$constant(): {
                (Node.AsCaseOrDefaultClause(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindExpressionStatement$constant(): {
                ExpressionStatement.$storageOf(((Node.AsExpressionStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement>).value).Expression = expr;
                break;
            }
            case KindReturnStatement$constant(): {
                ReturnStatement.$storageOf(((Node.AsReturnStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement>).value).Expression = expr;
                break;
            }
            case KindThrowStatement$constant(): {
                (Node.AsThrowStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindExternalModuleReference$constant(): {
                (Node.AsExternalModuleReference(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindExportAssignment$constant(): {
                (Node.AsExportAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindDecorator$constant(): {
                (Node.AsDecorator(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindJsxExpression$constant(): {
                (Node.AsJsxExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            case KindJsxSpreadAttribute$constant(): {
                (Node.AsJsxSpreadAttribute(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression = expr;
                break;
            }
            default: {
                const __gotots_argument_12 = new $goInterfaceAdapter$string("Unhandled case in mutableNode.SetExpression: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
                GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
                break;
            }
        }
    }
    static SetInitializer(m: tsonicTypeScriptRuntime.Location<MutableNode> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node> | undefined): void {
        let n: tsonicTypeScriptRuntime.Location<Node> | undefined = tsonicTypeScriptRuntime.projectLocation<MutableNode, Node>(m, ($go$source: MutableNode): Node => {
            return Node.$fromStorage(MutableNode.$storageOf($go$source));
        }, ($go$target: Node): MutableNode => {
            return MutableNode.$fromStorage(Node.$storageOf($go$target));
        });
        switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
            case KindVariableDeclaration$constant(): {
                VariableDeclaration.$storageOf(((Node.AsVariableDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration>).value).Initializer = initializer;
                break;
            }
            case KindParameter$constant(): {
                ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).Initializer = initializer;
                break;
            }
            case KindBindingElement$constant(): {
                (Node.AsBindingElement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer = initializer;
                break;
            }
            case KindPropertyDeclaration$constant(): {
                (Node.AsPropertyDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer = initializer;
                break;
            }
            case KindPropertySignature$constant(): {
                PropertySignatureDeclaration.$storageOf(((Node.AsPropertySignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration>).value).Initializer = initializer;
                break;
            }
            case KindPropertyAssignment$constant(): {
                PropertyAssignment.$storageOf(((Node.AsPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment>).value).Initializer = initializer;
                break;
            }
            case KindEnumMember$constant(): {
                (Node.AsEnumMember(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer = initializer;
                break;
            }
            case KindForStatement$constant(): {
                (Node.AsForStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer = initializer;
                break;
            }
            case KindForInStatement$constant():
            case KindForOfStatement$constant(): {
                (Node.AsForInOrOfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer = initializer;
                break;
            }
            case KindJsxAttribute$constant(): {
                (Node.AsJsxAttribute(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer = initializer;
                break;
            }
            default: {
                const __gotots_argument_15 = new $goInterfaceAdapter$string("Unhandled case in mutableNode.SetInitializer");
                GoPanic.raise(__gotots_argument_15 === undefined ? GoPanicNilValue.create() : __gotots_argument_15);
                break;
            }
        }
    }
    static SetModifiers(n: tsonicTypeScriptRuntime.Location<MutableNode> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): void {
        const __gotots_receiver_7 = MutableNode.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MutableNode>).value).data;
        const __gotots_argument_16 = modifiers;
        goInterfaceNonNil<nodeData>(__gotots_receiver_7).$go$private$ast$setModifiers(__gotots_argument_16);
    }
    static SetType(m: tsonicTypeScriptRuntime.Location<MutableNode> | undefined, t: tsonicTypeScriptRuntime.Location<Node> | undefined): void {
        let n: tsonicTypeScriptRuntime.Location<Node> | undefined = tsonicTypeScriptRuntime.projectLocation<MutableNode, Node>(m, ($go$source: MutableNode): Node => {
            return Node.$fromStorage(MutableNode.$storageOf($go$source));
        }, ($go$target: Node): MutableNode => {
            return MutableNode.$fromStorage(Node.$storageOf($go$target));
        });
        switch (MutableNode.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MutableNode>).value).Kind) {
            case KindVariableDeclaration$constant(): {
                VariableDeclaration.$storageOf(((Node.AsVariableDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration>).value).Type = t;
                break;
            }
            case KindParameter$constant(): {
                ParameterDeclaration.$storageOf(((Node.AsParameterDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration>).value).Type = t;
                break;
            }
            case KindPropertySignature$constant(): {
                PropertySignatureDeclaration.$storageOf(((Node.AsPropertySignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration>).value).Type = t;
                break;
            }
            case KindPropertyDeclaration$constant(): {
                (Node.AsPropertyDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindPropertyAssignment$constant(): {
                PropertyAssignment.$storageOf(((Node.AsPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment>).value).Type = t;
                break;
            }
            case KindShorthandPropertyAssignment$constant(): {
                (Node.AsShorthandPropertyAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindTypePredicate$constant(): {
                (Node.AsTypePredicateNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindParenthesizedType$constant(): {
                ParenthesizedTypeNode.$storageOf(((Node.AsParenthesizedTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode>).value).Type = t;
                break;
            }
            case KindTypeOperator$constant(): {
                TypeOperatorNode.$storageOf(((Node.AsTypeOperatorNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode>).value).Type = t;
                break;
            }
            case KindMappedType$constant(): {
                (Node.AsMappedTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindTypeAssertionExpression$constant(): {
                (Node.AsTypeAssertion(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindAsExpression$constant(): {
                (Node.AsAsExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindSatisfiesExpression$constant(): {
                (Node.AsSatisfiesExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindTypeAliasDeclaration$constant():
            case KindJSTypeAliasDeclaration$constant(): {
                TypeAliasDeclaration.$storageOf(((Node.AsTypeAliasDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration>).value).Type = t;
                break;
            }
            case KindNamedTupleMember$constant(): {
                (Node.AsNamedTupleMember(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindOptionalType$constant(): {
                (Node.AsOptionalTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindRestType$constant(): {
                (Node.AsRestTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindTemplateLiteralTypeSpan$constant(): {
                (Node.AsTemplateLiteralTypeSpan(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindJSDocTypeExpression$constant(): {
                (Node.AsJSDocTypeExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindJSDocParameterTag$constant():
            case KindJSDocPropertyTag$constant(): {
                (Node.AsJSDocParameterOrPropertyTag(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression = t;
                break;
            }
            case KindJSDocNullableType$constant(): {
                (Node.AsJSDocNullableType(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindJSDocNonNullableType$constant(): {
                (Node.AsJSDocNonNullableType(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindJSDocOptionalType$constant(): {
                (Node.AsJSDocOptionalType(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindExportAssignment$constant(): {
                (Node.AsExportAssignment(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = t;
                break;
            }
            case KindBinaryExpression$constant(): {
                BinaryExpression.$storageOf(((Node.AsBinaryExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Type = t;
                break;
            }
            default: {
                {
                    let funcLike: tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined = Node.FunctionLikeData(n);
                    if (!(funcLike === undefined)) {
                        FunctionLikeBase.$storageOf(((funcLike ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase>).value).Type = t;
                    }
                    else {
                        const __gotots_argument_11 = new $goInterfaceAdapter$string("Unhandled case in mutableNode.SetType: " + Kind_String(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind));
                        GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
                    }
                }
                break;
            }
        }
    }
}
export interface nodeData extends GoInterfaceValue {
    AsNode(): tsonicTypeScriptRuntime.Location<Node> | undefined;
    BodyData(): tsonicTypeScriptRuntime.Location<BodyBase> | undefined;
    ClassLikeData(): tsonicTypeScriptRuntime.Location<ClassLikeBase> | undefined;
    Clone($argument0: NodeFactoryCoercible | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined;
    DeclarationData(): tsonicTypeScriptRuntime.Location<DeclarationBase> | undefined;
    ExportableData(): tsonicTypeScriptRuntime.Location<ExportableBase> | undefined;
    FlowNodeData(): tsonicTypeScriptRuntime.Location<FlowNodeBase> | undefined;
    ForEachChild($argument0: Visitor): bool;
    FunctionLikeData(): tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined;
    IterChildren(): iter__from_gostdlib.Seq<tsonicTypeScriptRuntime.Location<Node> | undefined>;
    LiteralLikeData(): tsonicTypeScriptRuntime.Location<LiteralLikeNodeBase> | undefined;
    LocalsContainerData(): tsonicTypeScriptRuntime.Location<LocalsContainerBase> | undefined;
    Modifiers(): tsonicTypeScriptRuntime.Location<ModifierList> | undefined;
    Name(): tsonicTypeScriptRuntime.Location<Node> | undefined;
    SubtreeFacts(): SubtreeFacts;
    TemplateLiteralLikeData(): tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase> | undefined;
    VisitEachChild($argument0: {
        value: NodeVisitor;
    } | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined;
    $go$private$ast$computeSubtreeFacts(): SubtreeFacts;
    $go$private$ast$propagateSubtreeFacts(): SubtreeFacts;
    $go$private$ast$setModifiers($argument0: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): void;
    $go$private$ast$subtreeFactsWorker($argument0: nodeData | undefined): SubtreeFacts;
}
export const nodeData$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AsNode$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$BodyData$void_to_PointerTo_Named_ast$BodyBase, $goInterfaceMethod$ClassLikeData$void_to_PointerTo_Named_ast$ClassLikeBase, $goInterfaceMethod$Clone$Named_ast$NodeFactoryCoercible_to_PointerTo_Named_ast$Node, $goInterfaceMethod$DeclarationData$void_to_PointerTo_Named_ast$DeclarationBase, $goInterfaceMethod$ExportableData$void_to_PointerTo_Named_ast$ExportableBase, $goInterfaceMethod$FlowNodeData$void_to_PointerTo_Named_ast$FlowNodeBase, $goInterfaceMethod$ForEachChild$Named_ast$Visitor_to_bool, $goInterfaceMethod$FunctionLikeData$void_to_PointerTo_Named_ast$FunctionLikeBase, $goInterfaceMethod$IterChildren$void_to_Named_iter$SeqOf_PointerTo_Named_ast$Node, $goInterfaceMethod$LiteralLikeData$void_to_PointerTo_Named_ast$LiteralLikeNodeBase, $goInterfaceMethod$LocalsContainerData$void_to_PointerTo_Named_ast$LocalsContainerBase, $goInterfaceMethod$Modifiers$void_to_PointerTo_Named_ast$ModifierList, $goInterfaceMethod$Name$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$SubtreeFacts$void_to_Named_ast$SubtreeFacts, $goInterfaceMethod$TemplateLiteralLikeData$void_to_PointerTo_Named_ast$TemplateLiteralLikeNodeBase, $goInterfaceMethod$VisitEachChild$PointerTo_Named_ast$NodeVisitor_to_PointerTo_Named_ast$Node, $goInterfaceMethod$ast$computeSubtreeFacts$void_to_Named_ast$SubtreeFacts, $goInterfaceMethod$ast$propagateSubtreeFacts$void_to_Named_ast$SubtreeFacts, $goInterfaceMethod$ast$setModifiers$PointerTo_Named_ast$ModifierList_to_void, $goInterfaceMethod$ast$subtreeFactsWorker$Named_ast$nodeData_to_Named_ast$SubtreeFacts]);
export function nodeData$is(value: GoInterfaceValue | undefined): value is nodeData {
    return value !== undefined && value.$go$implements(nodeData$contract);
}
export type NodeDefault$Storage = {
    Node: Node$Storage;
};
export class NodeDefault {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NodeDefault$Storage) {
    }
    public static $storageOf($source: NodeDefault): NodeDefault$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NodeDefault$Storage): NodeDefault {
        return new NodeDefault($source);
    }
    public get Node(): Node {
        return Node.$fromStorage(this.$storage.Node);
    }
    public set Node($value: Node) {
        this.$storage.Node = Node.$storageOf($value);
    }
    static $zero(): NodeDefault {
        return new NodeDefault({
            Node: Node.$storageOf(Node.$zero())
        });
    }
    static $copy($source: NodeDefault): NodeDefault {
        return new NodeDefault({
            Node: Node.$storageOf(Node.$copy(Node.$fromStorage($source.$storage.Node)))
        });
    }
    static $equal($left: NodeDefault, $right: NodeDefault): bool {
        return Node.$equal(Node.$fromStorage($left.$storage.Node), Node.$fromStorage($right.$storage.Node));
    }
    static $hash($source: NodeDefault): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Node.$hash(Node.$fromStorage($source.$storage.Node)));
        return $hash;
    }
    declare private readonly then?: never;
    static AsNode(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        const __gotots_store_0 = NodeDefault.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeDefault>).value);
        return tsonicTypeScriptRuntime.projectLocation<Node$Storage, Node>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Node"), Node.$fromStorage, Node.$storageOf);
    }
    static BodyData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<BodyBase> | undefined {
        return void 0;
    }
    static ClassLikeData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<ClassLikeBase> | undefined {
        return void 0;
    }
    static Clone(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined, v: NodeFactoryCoercible | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return void 0;
    }
    static DeclarationData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<DeclarationBase> | undefined {
        return void 0;
    }
    static ExportableData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<ExportableBase> | undefined {
        return void 0;
    }
    static FlowNodeData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<FlowNodeBase> | undefined {
        return void 0;
    }
    static ForEachChild(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined, v: Visitor): bool {
        return false;
    }
    static FunctionLikeData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<FunctionLikeBase> | undefined {
        return void 0;
    }
    static IterChildren(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): iter__from_gostdlib.Seq<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        const __gotots_receiver_19 = node;
        return named_iter.IterSeqValueOperations.$wrap(($argument0: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): void => {
            NodeDefault.$go$private$ast$forEachChildIter(__gotots_receiver_19, $argument0);
        });
    }
    static LiteralLikeData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<LiteralLikeNodeBase> | undefined {
        return void 0;
    }
    static LocalsContainerData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<LocalsContainerBase> | undefined {
        return void 0;
    }
    static Modifiers(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<ModifierList> | undefined {
        return void 0;
    }
    static Name(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return void 0;
    }
    static SubtreeFacts(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): SubtreeFacts {
        const __gotots_receiver_20 = (void Node.$storageOf, (void Node.$fromStorage,
            NodeDefault.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeDefault>).value).Node)).data;
        const __gotots_argument_39 = (void Node.$storageOf, (void Node.$fromStorage,
            NodeDefault.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeDefault>).value).Node)).data;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_20).$go$private$ast$subtreeFactsWorker(__gotots_argument_39);
    }
    static TemplateLiteralLikeData(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase> | undefined {
        return void 0;
    }
    static VisitEachChild(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined, v: {
        value: NodeVisitor;
    } | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return NodeDefault.AsNode(node);
    }
    static $go$private$ast$computeSubtreeFacts(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): SubtreeFacts {
        return SubtreeFactsNone$constant();
    }
    static $go$private$ast$forEachChildIter(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined, __go_yield: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): void {
        const __gotots_receiver_23 = (void Node.$storageOf, (void Node.$fromStorage,
            NodeDefault.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeDefault>).value).Node)).data;
        const __gotots_argument_40 = invert(__go_yield);
        goInterfaceNonNil<nodeData>(__gotots_receiver_23).ForEachChild(__gotots_argument_40);
    }
    static $go$private$ast$propagateSubtreeFacts(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined): SubtreeFacts {
        const __gotots_receiver_21 = (void Node.$storageOf, (void Node.$fromStorage,
            NodeDefault.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeDefault>).value).Node)).data;
        const __gotots_binary_operand_0 = goInterfaceNonNil<nodeData>(__gotots_receiver_21).SubtreeFacts();
        const __gotots_binary_operand_1 = 4261412863;
        return (__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0;
    }
    static $go$private$ast$setModifiers(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): void {
    }
    static $go$private$ast$subtreeFactsWorker(node: tsonicTypeScriptRuntime.Location<NodeDefault> | undefined, self: nodeData | undefined): SubtreeFacts {
        const __gotots_receiver_22 = self;
        return goInterfaceNonNil<nodeData>(__gotots_receiver_22).$go$private$ast$computeSubtreeFacts();
    }
}
export function invert(__go_yield: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): Visitor {
    return new Visitor((n: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        const __gotots_callee_8 = __go_yield;
        const __gotots_argument_41 = n;
        return !(__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41);
    });
}
export type NodeBase$Storage = {
    NodeDefault: NodeDefault$Storage;
};
export class NodeBase {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NodeBase$Storage) {
    }
    public static $storageOf($source: NodeBase): NodeBase$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NodeBase$Storage): NodeBase {
        return new NodeBase($source);
    }
    public get NodeDefault(): NodeDefault {
        return NodeDefault.$fromStorage(this.$storage.NodeDefault);
    }
    public set NodeDefault($value: NodeDefault) {
        this.$storage.NodeDefault = NodeDefault.$storageOf($value);
    }
    static $zero(): NodeBase {
        return new NodeBase({
            NodeDefault: NodeDefault.$storageOf(NodeDefault.$zero())
        });
    }
    static $copy($source: NodeBase): NodeBase {
        return new NodeBase({
            NodeDefault: NodeDefault.$storageOf(NodeDefault.$copy(NodeDefault.$fromStorage($source.$storage.NodeDefault)))
        });
    }
    static $equal($left: NodeBase, $right: NodeBase): bool {
        return NodeDefault.$equal(NodeDefault.$fromStorage($left.$storage.NodeDefault), NodeDefault.$fromStorage($right.$storage.NodeDefault));
    }
    static $hash($source: NodeBase): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, NodeDefault.$hash(NodeDefault.$fromStorage($source.$storage.NodeDefault)));
        return $hash;
    }
    declare private readonly then?: never;
}
export function IsWriteOnlyAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return accessKind(node) === AccessKindWrite$constant();
}
export function IsWriteAccess(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(accessKind(node) === AccessKindRead$constant());
}
export function IsWriteAccessForReference(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    let decl: tsonicTypeScriptRuntime.Location<Node> | undefined = GetDeclarationFromName(node);
    return (!(decl === undefined) && declarationIsWriteAccess(decl)) || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindDefaultKeyword$constant() || IsWriteAccess(node);
}
export function GetDeclarationFromName(name: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (name === undefined || Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent === undefined) {
        return void 0;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    {
        const __gotots_switch_tag_0 = Node.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindStringLiteral$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNoSubstitutionTemplateLiteral$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNumericLiteral$constant();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindIdentifier$constant();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindPrivateIdentifier$constant();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                if (IsComputedPropertyName(parent)) {
                    return Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                }
                __gotots_switch_selection_0 = 1;
            }
            if (__gotots_switch_selection_0 === 1) {
                if (IsDeclaration(parent)) {
                    if (tsonicTypeScriptRuntime.sameLocation(Node.Name(parent), name)) {
                        return parent;
                    }
                    return void 0;
                }
                if (IsQualifiedName(parent)) {
                    let tag: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                    if (IsJSDocParameterTag(tag) &&
                        tsonicTypeScriptRuntime.sameLocation(Node.Name(tag), parent)) {
                        return tag;
                    }
                    return void 0;
                }
                let binExp: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
                if (IsBinaryExpression(binExp) && !(GetAssignmentDeclarationKind(binExp).$value === JSDeclarationKindNone$constant().$value)) {
                    let leftHasSymbol = false;
                    if (!(BinaryExpression.$storageOf(((Node.AsBinaryExpression(binExp) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left === undefined) && !(Node.Symbol(BinaryExpression.$storageOf(((Node.AsBinaryExpression(binExp) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left) === undefined)) {
                        leftHasSymbol = true;
                    }
                    if (leftHasSymbol || !(Node.Symbol(binExp) === undefined)) {
                        if (tsonicTypeScriptRuntime.sameLocation(GetNameOfDeclaration((void Node.AsNode,
                            binExp)), name)) {
                            return (void Node.AsNode,
                                binExp);
                        }
                    }
                }
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                if (IsDeclaration(parent) &&
                    tsonicTypeScriptRuntime.sameLocation(Node.Name(parent), name)) {
                    return parent;
                }
                break __gotots_control_target_0;
            }
        }
    }
    return void 0;
}
export function declarationIsWriteAccess(decl: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (decl === undefined) {
        return false;
    }
    if (!((Node.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsAmbient$constant()) >>> 0 === 0)) {
        return true;
    }
    switch (Node.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBinaryExpression$constant():
        case KindBindingElement$constant():
        case KindClassDeclaration$constant():
        case KindClassExpression$constant():
        case KindDefaultKeyword$constant():
        case KindEnumDeclaration$constant():
        case KindEnumMember$constant():
        case KindExportSpecifier$constant():
        case KindImportClause$constant():
        case KindImportEqualsDeclaration$constant():
        case KindImportSpecifier$constant():
        case KindInterfaceDeclaration$constant():
        case KindJSDocCallbackTag$constant():
        case KindJSDocTypedefTag$constant():
        case KindJsxAttribute$constant():
        case KindModuleDeclaration$constant():
        case KindNamespaceExportDeclaration$constant():
        case KindNamespaceImport$constant():
        case KindNamespaceExport$constant():
        case KindParameter$constant():
        case KindShorthandPropertyAssignment$constant():
        case KindTypeAliasDeclaration$constant():
        case KindJSTypeAliasDeclaration$constant():
        case KindTypeParameter$constant(): {
            return true;
            break;
        }
        case KindPropertyAssignment$constant(): {
            return !IsArrayLiteralOrObjectLiteralDestructuringPattern(Node.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        case KindFunctionDeclaration$constant():
        case KindFunctionExpression$constant():
        case KindConstructor$constant():
        case KindMethodDeclaration$constant():
        case KindGetAccessor$constant():
        case KindSetAccessor$constant(): {
            switch (Node.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
                case KindFunctionDeclaration$constant(): {
                    return !((void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                        (void FunctionLikeWithBodyBase.$storageOf, (void FunctionLikeWithBodyBase.$fromStorage,
                            FunctionDeclaration.$storageOf(((Node.AsFunctionDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration>).value).FunctionLikeWithBodyBase)).BodyBase)).Body === undefined);
                    break;
                }
                case KindFunctionExpression$constant(): {
                    return !((void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                        FunctionLikeWithBodyBase.$storageOf((Node.AsFunctionExpression(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined);
                    break;
                }
                case KindConstructor$constant(): {
                    return !((void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                        FunctionLikeWithBodyBase.$storageOf((Node.AsConstructorDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined);
                    break;
                }
                case KindMethodDeclaration$constant(): {
                    return !((void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                        FunctionLikeWithBodyBase.$storageOf((Node.AsMethodDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined);
                    break;
                }
                case KindGetAccessor$constant(): {
                    return !((void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                        FunctionLikeWithBodyBase.$storageOf((Node.AsGetAccessorDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body === undefined);
                    break;
                }
                case KindSetAccessor$constant(): {
                    return !((void BodyBase.$storageOf, (void BodyBase.$fromStorage,
                        FunctionLikeWithBodyBase.$storageOf((Node.AsSetAccessorDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body === undefined);
                    break;
                }
            }
            return false;
            break;
        }
        case KindVariableDeclaration$constant():
        case KindPropertyDeclaration$constant(): {
            let hasInit = false;
            switch (Node.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
                case KindVariableDeclaration$constant(): {
                    hasInit = !(VariableDeclaration.$storageOf(((Node.AsVariableDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration>).value).Initializer === undefined);
                    break;
                }
                case KindPropertyDeclaration$constant(): {
                    hasInit = !((Node.AsPropertyDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined);
                    break;
                }
            }
            return hasInit || IsCatchClause(Node.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        case KindMethodSignature$constant():
        case KindPropertySignature$constant():
        case KindJSDocPropertyTag$constant():
        case KindJSDocParameterTag$constant(): {
            return false;
            break;
        }
        default: {
            const __gotots_argument_47 = new $goInterfaceAdapter$string("Unhandled case in declarationIsWriteAccess");
            GoPanic.raise(__gotots_argument_47 === undefined ? GoPanicNilValue.create() : __gotots_argument_47);
            break;
        }
    }
}
export function IsArrayLiteralOrObjectLiteralDestructuringPattern(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    if (!(IsArrayLiteralExpression(node) || IsObjectLiteralExpression(node))) {
        return false;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    if (IsBinaryExpression(parent) &&
        tsonicTypeScriptRuntime.sameLocation(BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left, node) && Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEqualsToken$constant()) {
        return true;
    }
    if (IsForOfStatement(parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node.Initializer(parent), node)) {
        return true;
    }
    if (IsPropertyAssignment(parent)) {
        return IsArrayLiteralOrObjectLiteralDestructuringPattern(Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
    }
    return IsArrayLiteralOrObjectLiteralDestructuringPattern(parent);
}
export function accessKind(node: tsonicTypeScriptRuntime.Location<Node> | undefined): AccessKind {
    let parent: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent;
    if (parent === undefined) {
        return AccessKindRead$constant();
    }
    switch (Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindParenthesizedExpression$constant(): {
            return accessKind(parent);
            break;
        }
        case KindPrefixUnaryExpression$constant(): {
            let operator = PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator;
            if (operator === KindPlusPlusToken$constant() || operator === KindMinusMinusToken$constant()) {
                return AccessKindReadWrite$constant();
            }
            return AccessKindRead$constant();
            break;
        }
        case KindPostfixUnaryExpression$constant(): {
            let operator: PostfixUnaryExpression["Operator"] = (Node.AsPostfixUnaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
            if (operator === KindPlusPlusToken$constant() || operator === KindMinusMinusToken$constant()) {
                return AccessKindReadWrite$constant();
            }
            return AccessKindRead$constant();
            break;
        }
        case KindBinaryExpression$constant(): {
            if (tsonicTypeScriptRuntime.sameLocation(BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left, node)) {
                let operator: tsonicTypeScriptRuntime.Location<Node> | undefined = BinaryExpression.$storageOf(((Node.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken;
                if (IsAssignmentOperator(Node.$storageOf(((operator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)) {
                    if (Node.$storageOf(((operator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindEqualsToken$constant()) {
                        return AccessKindWrite$constant();
                    }
                    return AccessKindReadWrite$constant();
                }
            }
            return AccessKindRead$constant();
            break;
        }
        case KindPropertyAccessExpression$constant(): {
            if (!tsonicTypeScriptRuntime.sameLocation(PropertyAccessExpression.Name(Node.AsPropertyAccessExpression(parent)), node)) {
                return AccessKindRead$constant();
            }
            return accessKind(parent);
            break;
        }
        case KindPropertyAssignment$constant(): {
            let parentAccess = accessKind(Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            if (tsonicTypeScriptRuntime.sameLocation(node, PropertyAssignment.Name(Node.AsPropertyAssignment(parent)))) {
                return reverseAccessKind(parentAccess);
            }
            return parentAccess;
            break;
        }
        case KindShorthandPropertyAssignment$constant(): {
            if (tsonicTypeScriptRuntime.sameLocation(node, (Node.AsShorthandPropertyAssignment(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer)) {
                return AccessKindRead$constant();
            }
            return accessKind(Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent);
            break;
        }
        case KindArrayLiteralExpression$constant(): {
            return accessKind(parent);
            break;
        }
        case KindForInStatement$constant():
        case KindForOfStatement$constant(): {
            if (tsonicTypeScriptRuntime.sameLocation(node, (Node.AsForInOrOfStatement(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer)) {
                return AccessKindWrite$constant();
            }
            return AccessKindRead$constant();
            break;
        }
        default: {
            return AccessKindRead$constant();
            break;
        }
    }
}
export function reverseAccessKind(a: AccessKind): AccessKind {
    switch (a) {
        case AccessKindRead$constant(): {
            return AccessKindWrite$constant();
            break;
        }
        case AccessKindWrite$constant(): {
            return AccessKindRead$constant();
            break;
        }
        case AccessKindReadWrite$constant(): {
            return AccessKindReadWrite$constant();
            break;
        }
    }
    const __gotots_argument_31 = new $goInterfaceAdapter$string("Unhandled case in reverseAccessKind");
    GoPanic.raise(__gotots_argument_31 === undefined ? GoPanicNilValue.create() : __gotots_argument_31);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export type AccessKind = int32;
export function AccessKindRead$constant(): AccessKind {
    return 0;
}
export function AccessKindWrite$constant(): AccessKind {
    return 1;
}
export function AccessKindReadWrite$constant(): AccessKind {
    return 2;
}
export function IsDeclarationNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(Node.DeclarationData(node) === undefined);
}
export function IsLocalsContainer(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return !(Node.LocalsContainerData(node) === undefined);
}
export function IsTypeOrJSTypeAliasDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindTypeAliasDeclaration$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindJSTypeAliasDeclaration$constant();
}
export function IsImportDeclarationOrJSImportDeclaration(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindImportDeclaration$constant() || Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindJSImportDeclaration$constant();
}
export function IsAnyExportAssignment(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindExportAssignment$constant();
}
export class PatternAmbientModule {
    declare private readonly $goType: void;
    public constructor(public Pattern: Pattern__from_core, public Symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined) {
    }
    static $copy($source: PatternAmbientModule): PatternAmbientModule {
        return new PatternAmbientModule(Pattern__from_core.$copy($source.Pattern), $source.Symbol);
    }
    static $equal($left: PatternAmbientModule, $right: PatternAmbientModule): bool {
        return Pattern__from_core.$equal($left.Pattern, $right.Pattern) &&
            tsonicTypeScriptRuntime.sameLocation($left.Symbol, $right.Symbol);
    }
    static $hash($source: PatternAmbientModule): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Pattern__from_core.$hash($source.Pattern));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Symbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export type CommentDirectiveKind = int32;
export function CommentDirectiveKindExpectError$constant(): CommentDirectiveKind {
    return 1;
}
export function CommentDirectiveKindIgnore$constant(): CommentDirectiveKind {
    return 2;
}
export type CommentDirective$Storage = {
    Loc: TextRange__from_core$Storage;
    Kind: int32;
};
export class CommentDirective {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CommentDirective$Storage) {
    }
    public static $storageOf($source: CommentDirective): CommentDirective$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: CommentDirective$Storage): CommentDirective {
        return new CommentDirective($source);
    }
    public get Loc(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.Loc);
    }
    public set Loc($value: TextRange__from_core) {
        this.$storage.Loc = TextRange__from_core.$storageOf($value);
    }
    public get Kind(): CommentDirectiveKind {
        return this.$storage.Kind;
    }
    public set Kind($value: CommentDirectiveKind) {
        this.$storage.Kind = $value;
    }
    static $zero(): CommentDirective {
        return new CommentDirective({
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            Kind: 0
        });
    }
    static $copy($source: CommentDirective): CommentDirective {
        return new CommentDirective({
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.Loc))),
            Kind: $source.$storage.Kind
        });
    }
    static $equal($left: CommentDirective, $right: CommentDirective): bool {
        return TextRange__from_core.$equal(TextRange__from_core.$fromStorage($left.$storage.Loc), TextRange__from_core.$fromStorage($right.$storage.Loc)) && $left.$storage.Kind === $right.$storage.Kind;
    }
    static $hash($source: CommentDirective): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash(TextRange__from_core.$fromStorage($source.$storage.Loc)));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Kind));
        return $hash;
    }
    declare private readonly then?: never;
}
export class SourceFileMetaData {
    declare private readonly $goType: void;
    public constructor(public PackageJsonType: gostring, public PackageJsonDirectory: gostring, public ImpliedNodeFormat: ModuleKind__from_core) {
    }
    static $zero(): SourceFileMetaData {
        return new SourceFileMetaData("", "", 0);
    }
    static $copy($source: SourceFileMetaData): SourceFileMetaData {
        return new SourceFileMetaData($source.PackageJsonType, $source.PackageJsonDirectory, $source.ImpliedNodeFormat);
    }
    static $equal($left: SourceFileMetaData, $right: SourceFileMetaData): bool {
        return $left.PackageJsonType === $right.PackageJsonType && $left.PackageJsonDirectory === $right.PackageJsonDirectory && $left.ImpliedNodeFormat === $right.ImpliedNodeFormat;
    }
    static $hash($source: SourceFileMetaData): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PackageJsonType));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PackageJsonDirectory));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ImpliedNodeFormat));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CheckJsDirective {
    declare private readonly $goType: void;
    public constructor(public Enabled: bool, public Range: CommentRange) {
    }
    static $copy($source: CheckJsDirective): CheckJsDirective {
        return new CheckJsDirective($source.Enabled, CommentRange.$copy($source.Range));
    }
    static $equal($left: CheckJsDirective, $right: CheckJsDirective): bool {
        return $left.Enabled === $right.Enabled && CommentRange.$equal($left.Range, $right.Range);
    }
    static $hash($source: CheckJsDirective): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.Enabled));
        $hash = GoMapHash.mix($hash, CommentRange.$hash($source.Range));
        return $hash;
    }
    declare private readonly then?: never;
}
export interface HasFileName extends GoInterfaceValue {
    FileName(): gostring;
    Path(): Path__from_tspath;
}
export const HasFileName$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Path$void_to_Named_tspath$Path]);
export function HasFileName$is(value: GoInterfaceValue | undefined): value is HasFileName {
    return value !== undefined && value.$go$implements(HasFileName$contract);
}
export class TokenCacheKey {
    declare private readonly $goType: void;
    public constructor(public parent: tsonicTypeScriptRuntime.Location<Node> | undefined, public loc: TextRange__from_core) {
    }
    static $copy($source: TokenCacheKey): TokenCacheKey {
        return new TokenCacheKey($source.parent, TextRange__from_core.$copy($source.loc));
    }
    static $equal($left: TokenCacheKey, $right: TokenCacheKey): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.parent, $right.parent)
            && TextRange__from_core.$equal($left.loc, $right.loc);
    }
    static $hash($source: TokenCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.parent));
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash($source.loc));
        return $hash;
    }
    declare private readonly then?: never;
}
export class SourceFile {
    declare private readonly $goType: void;
    public constructor(public NodeBase: NodeBase, public DeclarationBase: DeclarationBase, public LocalsContainerBase: LocalsContainerBase, public CompositeBase: CompositeBase, public fileName: gostring, public parseOptions: SourceFileParseOptions, public text: gostring, public Statements: tsonicTypeScriptRuntime.Location<NodeList> | undefined, public EndOfFileToken: tsonicTypeScriptRuntime.Location<Node> | undefined, public diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public jsDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public jsdocDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public LanguageVariant: LanguageVariant__from_core, public ScriptKind: ScriptKind__from_core, public IsDeclarationFile: bool, public ContainsNonASCII: bool, public UsesUriStyleNodeCoreModules: Tristate__from_core, public Identifiers: GoMapValue<gostring, gostring>, public IdentifierCount: int, public imports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, public ModuleAugmentations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, public AmbientModuleNames: RuntimeSlice<gostring>, public CommentDirectives: RuntimeSlice<CommentDirective$Storage>, public jsdocCache: GoMapValue<tsonicTypeScriptRuntime.Location<Node> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>>, public jsdocMu: sync__from_gostdlib.RWMutex, public hasLazyJSDoc: bool, public ReparsedClones: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, public Pragmas: RuntimeSlice<Pragma$Storage>, public ReferencedFiles: RuntimeSlice<{
        value: FileReference;
    } | undefined>, public TypeReferenceDirectives: RuntimeSlice<{
        value: FileReference;
    } | undefined>, public LibReferenceDirectives: RuntimeSlice<{
        value: FileReference;
    } | undefined>, public CheckJsDirective: {
        value: CheckJsDirective;
    } | undefined, public NodeCount: int, public TextCount: int, public CommonJSModuleIndicator: tsonicTypeScriptRuntime.Location<Node> | undefined, public ExternalModuleIndicator: tsonicTypeScriptRuntime.Location<Node> | undefined, public isBound: atomic__from_gostdlib.Bool, public bindOnce: sync__from_gostdlib.Once, public bindDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public BindSuggestionDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public EndFlowNode: tsonicTypeScriptRuntime.Location<FlowNode> | undefined, public SymbolCount: int, public ClassifiableNames: Set__from_collections<gostring>, public PatternAmbientModules: RuntimeSlice<{
        value: PatternAmbientModule;
    } | undefined>, public NestedCJSExports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>, public GlobalExports: SymbolTable, public ecmaLineMapMu: sync__from_gostdlib.RWMutex, public ecmaLineMap: RuntimeSlice<TextPos__from_core>, public Hash: Uint128__from_xxh3, public tokenCacheMu: sync__from_gostdlib.Mutex, public tokenCache: GoMapValue<TokenCacheKey, tsonicTypeScriptRuntime.Location<Node> | undefined>, public tokenFactory: tsonicTypeScriptRuntime.Location<NodeFactory> | undefined, public declarationMapMu: sync__from_gostdlib.Mutex, public declarationMap: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>>, public nameTableOnce: sync__from_gostdlib.Once, public nameTable: GoMapValue<gostring, int>, public positionMapOnce: sync__from_gostdlib.Once, public positionMap: {
        value: PositionMap;
    } | undefined) {
    }
    static $copy($source: SourceFile): SourceFile {
        return new SourceFile(NodeBase.$copy($source.NodeBase), DeclarationBase.$copy($source.DeclarationBase), LocalsContainerBase.$copy($source.LocalsContainerBase), CompositeBase.$copy($source.CompositeBase), $source.fileName, SourceFileParseOptions.$copy($source.parseOptions), $source.text, $source.Statements, $source.EndOfFileToken, $source.diagnostics, $source.jsDiagnostics, $source.jsdocDiagnostics, $source.LanguageVariant, $source.ScriptKind, $source.IsDeclarationFile, $source.ContainsNonASCII, $source.UsesUriStyleNodeCoreModules, $source.Identifiers, $source.IdentifierCount, $source.imports, $source.ModuleAugmentations, $source.AmbientModuleNames, $source.CommentDirectives, $source.jsdocCache, named_sync.SyncRWMutexOperations.$copy($source.jsdocMu), $source.hasLazyJSDoc, $source.ReparsedClones, $source.Pragmas, $source.ReferencedFiles, $source.TypeReferenceDirectives, $source.LibReferenceDirectives, $source.CheckJsDirective, $source.NodeCount, $source.TextCount, $source.CommonJSModuleIndicator, $source.ExternalModuleIndicator, named_sync_atomic.SyncAtomicBoolOperations.$copy($source.isBound), named_sync.SyncOnceOperations.$copy($source.bindOnce), $source.bindDiagnostics, $source.BindSuggestionDiagnostics, $source.EndFlowNode, $source.SymbolCount, Set__from_collections.$copy<gostring>($source.ClassifiableNames), $source.PatternAmbientModules, $source.NestedCJSExports, $source.GlobalExports, named_sync.SyncRWMutexOperations.$copy($source.ecmaLineMapMu), $source.ecmaLineMap, Uint128__from_xxh3.$copy($source.Hash), named_sync.SyncMutexOperations.$copy($source.tokenCacheMu), $source.tokenCache, $source.tokenFactory, named_sync.SyncMutexOperations.$copy($source.declarationMapMu), $source.declarationMap, named_sync.SyncOnceOperations.$copy($source.nameTableOnce), $source.nameTable, named_sync.SyncOnceOperations.$copy($source.positionMapOnce), $source.positionMap);
    }
    declare private readonly then?: never;
    static BindDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.bindDiagnostics;
    }
    static BindOnce(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, bind: (() => void) | undefined): void {
        sync__from_gostdlib.Once.Do(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.bindOnce, (): void => {
            const __gotots_callee_1 = bind;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
            atomic__from_gostdlib.Bool.Store(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.isBound, true);
        });
    }
    static Clone(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, f: NodeFactoryCoercible | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        const __gotots_receiver_25 = f;
        let updated: tsonicTypeScriptRuntime.Location<Node> | undefined = NodeFactory.NewSourceFile(goInterfaceNonNil<NodeFactoryCoercible>(__gotots_receiver_25).AsNodeFactory(), SourceFileParseOptions.$copy(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.parseOptions), ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.text, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Statements, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.EndOfFileToken);
        let newFile: tsonicTypeScriptRuntime.Location<SourceFile> | undefined = Node.AsSourceFile(updated);
        SourceFile.$go$private$ast$copyFrom(newFile, node);
        const __gotots_argument_42 = updated;
        const __gotots_store_3 = NodeBase.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
        const __gotots_argument_43 = NodeDefault.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault$Storage, NodeDefault>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), NodeDefault.$fromStorage, NodeDefault.$storageOf));
        const __gotots_receiver_26 = f;
        const __gotots_argument_44 = NodeFactoryHooks.$copy(((goInterfaceNonNil<NodeFactoryCoercible>(__gotots_receiver_26).AsNodeFactory() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeFactory>).value.hooks);
        return cloneNode(__gotots_argument_42, __gotots_argument_43, __gotots_argument_44);
    }
    static Diagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.diagnostics;
    }
    static ECMALineMap(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<TextPos__from_core> {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<TextPos__from_core> = RuntimeSlice.nil<TextPos__from_core>();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.RWMutex.RLock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMapMu);
                    let lineMap = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMap;
                    sync__from_gostdlib.RWMutex.RUnlock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMapMu);
                    if (lineMap.isNil()) {
                        sync__from_gostdlib.RWMutex.Lock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMapMu);
                        const __gotots_receiver_1 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMapMu;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncRWMutexUnlock(__gotots_receiver_1, $go$recovery);
                        });
                        lineMap = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMap;
                        if (lineMap.isNil()) {
                            lineMap = ComputeECMALineStarts__from_core(SourceFile.Text(node)).$value;
                            ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ecmaLineMap = lineMap;
                        }
                    }
                    __gotots_return_0 = lineMap;
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
    static FileName(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): gostring {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.parseOptions.FileName;
    }
    static ForEachChild(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, v: Visitor): bool {
        return visitNodeList(v, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Statements) || visit(v, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.EndOfFileToken);
    }
    static GetDeclarationMap(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>> {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        let __gotots_return_2: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>> = $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$Node.nil();
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.declarationMapMu);
                    const __gotots_receiver_28 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.declarationMapMu;
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_28, $go$recovery);
                    };
                    if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.declarationMap.isNil()) {
                        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.declarationMap = SourceFile.$go$private$ast$computeDeclarationMap(node);
                    }
                    __gotots_return_2 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.declarationMap;
                    break __gotots_return_block_2;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_2(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
        return __gotots_return_2;
    }
    static GetNameTable(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): GoMapValue<gostring, int> {
        sync__from_gostdlib.Once.Do(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.nameTableOnce, (): void => {
            let nameTable: GoMapValue<gostring, int> = GoMap__from_gotots_runtime.make<gostring, int>(0, ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.IdentifierCount, []);
            let walk: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined;
            walk = (node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
                if (IsIdentifier(node) && !IsTagName(node) && Node.Text(node) !== "" || IsStringOrNumericLiteralLike(node) && literalIsName(node) || IsPrivateIdentifier(node)) {
                    let text = Node.Text(node);
                    {
                        const __gotots_results_3 = nameTable.lookupOk(text);
                        let ok = __gotots_results_3[1];
                        if (ok) {
                            nameTable.store(text, -1);
                        }
                        else {
                            nameTable.store(text, Node.Pos(node));
                        }
                    }
                }
                Node.ForEachChild(node, new Visitor(walk));
                let jsdocNodes = Node.JSDoc(node, file);
                const __gotots_range_1 = jsdocNodes;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let jsdoc: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_1;
                    Node.ForEachChild(jsdoc, new Visitor(walk));
                }
                return false;
            };
            SourceFile.ForEachChild(file, new Visitor(walk));
            ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.nameTable = nameTable;
        });
        return ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.nameTable;
    }
    static GetOrCreateToken(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, kind: Kind, pos: int, end: int, parent: tsonicTypeScriptRuntime.Location<Node> | undefined, flags: TokenFlags): tsonicTypeScriptRuntime.Location<Node> | undefined {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenCacheMu);
                    const __gotots_receiver_27 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenCacheMu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_27, $go$recovery);
                    };
                    let loc = NewTextRange__from_core(pos, end);
                    let key = new TokenCacheKey(parent, TextRange__from_core.$copy(loc));
                    {
                        const __gotots_results_2 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenCache.lookupOk(key);
                        let token__shadow_1: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_results_2[0];
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            if (!(Node.$storageOf(((token__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === kind)) {
                                const __gotots_argument_45 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Token cache mismatch: %v != %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node.$storageOf(((token__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind), new $goInterfaceAdapter$Named_ast$Kind(kind)])));
                                GoPanic.raise(__gotots_argument_45 === undefined ? GoPanicNilValue.create() : __gotots_argument_45);
                            }
                            __gotots_return_1 = token__shadow_1;
                            break __gotots_return_block_1;
                        }
                    }
                    if (!((Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags & NodeFlagsReparsed$constant()) >>> 0 === 0)) {
                        const __gotots_argument_46 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Cannot create token from reparsed node of kind %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)])));
                        GoPanic.raise(__gotots_argument_46 === undefined ? GoPanicNilValue.create() : __gotots_argument_46);
                    }
                    if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenCache.isNil()) {
                        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenCache = $goMap$MapOf_Named_ast$TokenCacheKey_To_PointerTo_Named_ast$Node.make(0, []);
                    }
                    let token: tsonicTypeScriptRuntime.Location<Node> | undefined = createToken(kind, node, pos, end, flags);
                    Node.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(loc));
                    Node.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent = parent;
                    ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenCache.store(key, token);
                    __gotots_return_1 = token;
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static GetPositionMap(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): {
        value: PositionMap;
    } | undefined {
        sync__from_gostdlib.Once.Do(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.positionMapOnce, (): void => {
            if (!((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ContainsNonASCII) {
                ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.positionMap =
                    { value: new PositionMap(true, RuntimeSlice.nil<positionMapEntry__from_ast$Storage>()) };
            }
            else {
                ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.positionMap = ComputePositionMap(SourceFile.Text(file));
            }
        });
        return ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.positionMap;
    }
    static Imports(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.imports;
    }
    static IsBound(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): bool {
        return atomic__from_gostdlib.Bool.Load(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.isBound);
    }
    static IsJS(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): bool {
        return IsSourceFileJS(node);
    }
    static JSDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsDiagnostics;
    }
    static JSDocDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocDiagnostics;
    }
    static ParseOptions(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): SourceFileParseOptions {
        return SourceFileParseOptions.$copy(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.parseOptions);
    }
    static Path(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): Path__from_tspath {
        return new Path__from_tspath(SourceFileParseOptions.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.parseOptions).Path);
    }
    static SetBindDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.bindDiagnostics = diags;
    }
    static SetDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.diagnostics = diags;
    }
    static SetHasLazyJSDoc(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, lazy: bool): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.hasLazyJSDoc = lazy;
    }
    static SetJSDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsDiagnostics = diags;
    }
    static SetJSDocCache(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, cache: GoMapValue<tsonicTypeScriptRuntime.Location<Node> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>>): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache = cache;
    }
    static SetJSDocDiagnostics(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocDiagnostics = diags;
    }
    static Text(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): gostring {
        return ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.text;
    }
    static VisitEachChild(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, v: {
        value: NodeVisitor;
    } | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return NodeFactory.UpdateSourceFile((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, node, NodeVisitor.$go$private$ast$visitTopLevelStatements(v, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Statements), NodeVisitor.$go$private$ast$visitToken(v, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.EndOfFileToken));
    }
    static $go$private$ast$computeDeclarationMap(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>> {
        let result: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>> = $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$Node.make(0, []);
        let addDeclaration: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => void) | undefined = (declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): void => {
            let name = GetDeclarationName(declaration);
            if (name !== "") {
                result.store(name, result.lookup(name).append(void 0, [declaration]));
            }
        };
        let visit__shadow_1: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined;
        visit__shadow_1 = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
            {
                const __gotots_switch_tag_1 = Node.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
                let __gotots_switch_selection_1 = -1;
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_3 = false;
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_1 === KindFunctionDeclaration$constant();
                    }
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_1 === KindFunctionExpression$constant();
                    }
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_1 === KindMethodDeclaration$constant();
                    }
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_1 === KindMethodSignature$constant();
                    }
                    if (__gotots_switch_match_3) {
                        __gotots_switch_selection_1 = 0;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_4 = false;
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindClassDeclaration$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindClassExpression$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindInterfaceDeclaration$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindTypeAliasDeclaration$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindEnumDeclaration$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindModuleDeclaration$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindImportEqualsDeclaration$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindImportClause$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindNamespaceImport$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindGetAccessor$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindSetAccessor$constant();
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_1 === KindTypeLiteral$constant();
                    }
                    if (__gotots_switch_match_4) {
                        __gotots_switch_selection_1 = 1;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_5 = false;
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 = __gotots_switch_tag_1 === KindImportSpecifier$constant();
                    }
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 = __gotots_switch_tag_1 === KindExportSpecifier$constant();
                    }
                    if (__gotots_switch_match_5) {
                        __gotots_switch_selection_1 = 2;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_6 = false;
                    if (!__gotots_switch_match_6) {
                        __gotots_switch_match_6 = __gotots_switch_tag_1 === KindParameter$constant();
                    }
                    if (__gotots_switch_match_6) {
                        __gotots_switch_selection_1 = 3;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_7 = false;
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_1 === KindVariableDeclaration$constant();
                    }
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_1 === KindBindingElement$constant();
                    }
                    if (__gotots_switch_match_7) {
                        __gotots_switch_selection_1 = 4;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_8 = false;
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_1 === KindEnumMember$constant();
                    }
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_1 === KindPropertyDeclaration$constant();
                    }
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_1 === KindPropertySignature$constant();
                    }
                    if (__gotots_switch_match_8) {
                        __gotots_switch_selection_1 = 5;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_9 = false;
                    if (!__gotots_switch_match_9) {
                        __gotots_switch_match_9 = __gotots_switch_tag_1 === KindExportDeclaration$constant();
                    }
                    if (__gotots_switch_match_9) {
                        __gotots_switch_selection_1 = 6;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_10 = false;
                    if (!__gotots_switch_match_10) {
                        __gotots_switch_match_10 = __gotots_switch_tag_1 === KindImportDeclaration$constant();
                    }
                    if (__gotots_switch_match_10) {
                        __gotots_switch_selection_1 = 7;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_11 = false;
                    if (!__gotots_switch_match_11) {
                        __gotots_switch_match_11 = __gotots_switch_tag_1 === KindBinaryExpression$constant();
                    }
                    if (__gotots_switch_match_11) {
                        __gotots_switch_selection_1 = 8;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    __gotots_switch_selection_1 = 9;
                }
                __gotots_control_target_1: {
                    if (__gotots_switch_selection_1 === 0) {
                        let declarationName = GetDeclarationName(node__shadow_1);
                        if (declarationName !== "") {
                            let declarations = result.lookup(declarationName);
                            let lastDeclaration: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
                            if (declarations.length !== 0) {
                                lastDeclaration = declarations.get(declarations.length - 1);
                            }
                            if (!(lastDeclaration === undefined) &&
                                tsonicTypeScriptRuntime.sameLocation(Node.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent, Node.$storageOf(((lastDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Parent) &&
                                tsonicTypeScriptRuntime.sameLocation(Node.Symbol(node__shadow_1), Node.Symbol(lastDeclaration))) {
                                if (!(Node.Body(node__shadow_1) === undefined) && Node.Body(lastDeclaration) === undefined) {
                                    declarations.set(declarations.length - 1, node__shadow_1);
                                }
                            }
                            else {
                                result.store(declarationName, result.lookup(declarationName).append(void 0, [node__shadow_1]));
                            }
                        }
                        Node.ForEachChild(node__shadow_1, new Visitor(visit__shadow_1));
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 1) {
                        const __gotots_callee_11 = addDeclaration;
                        const __gotots_argument_48 = node__shadow_1;
                        (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
                        Node.ForEachChild(node__shadow_1, new Visitor(visit__shadow_1));
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 2) {
                        if (!(Node.PropertyName(node__shadow_1) === undefined)) {
                            const __gotots_callee_12 = addDeclaration;
                            const __gotots_argument_49 = node__shadow_1;
                            (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49);
                        }
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 3) {
                        if (!HasSyntacticModifier(node__shadow_1, ModifierFlagsParameterPropertyModifier$constant())) {
                            break __gotots_control_target_1;
                        }
                        __gotots_switch_selection_1 = 4;
                    }
                    if (__gotots_switch_selection_1 === 4) {
                        let name: tsonicTypeScriptRuntime.Location<Node> | undefined = Node.Name(node__shadow_1);
                        if (!(name === undefined)) {
                            if (IsBindingPattern(name)) {
                                Node.ForEachChild(Node.Name(node__shadow_1), new Visitor(visit__shadow_1));
                            }
                            else {
                                if (!(Node.Initializer(node__shadow_1) === undefined)) {
                                    const __gotots_callee_13 = visit__shadow_1;
                                    const __gotots_argument_50 = Node.Initializer(node__shadow_1);
                                    (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_50);
                                }
                                const __gotots_callee_14 = addDeclaration;
                                const __gotots_argument_51 = node__shadow_1;
                                (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51);
                            }
                        }
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 5) {
                        const __gotots_callee_15 = addDeclaration;
                        const __gotots_argument_52 = node__shadow_1;
                        (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52);
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 6) {
                        let exportClause: tsonicTypeScriptRuntime.Location<Node> | undefined = (Node.AsExportDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                        if (!(exportClause === undefined)) {
                            if (IsNamedExports(exportClause)) {
                                const __gotots_range_2 = Node.Elements(exportClause);
                                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                                    const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                                    let element: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_2;
                                    const __gotots_callee_16 = visit__shadow_1;
                                    const __gotots_argument_53 = element;
                                    (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_53);
                                }
                            }
                            else {
                                const __gotots_callee_17 = visit__shadow_1;
                                const __gotots_argument_54 = NamespaceExport.Name(Node.AsNamespaceExport(exportClause));
                                (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54);
                            }
                        }
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 7) {
                        let importClause: tsonicTypeScriptRuntime.Location<Node> | undefined = (Node.AsImportDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
                        if (!(importClause === undefined)) {
                            if (!(Node.Name(importClause) === undefined)) {
                                const __gotots_callee_18 = addDeclaration;
                                const __gotots_argument_55 = Node.Name(importClause);
                                (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55);
                            }
                            let namedBindings: tsonicTypeScriptRuntime.Location<Node> | undefined = (Node.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
                            if (!(namedBindings === undefined)) {
                                if (Node.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindNamespaceImport$constant()) {
                                    const __gotots_callee_19 = addDeclaration;
                                    const __gotots_argument_56 = namedBindings;
                                    (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56);
                                }
                                else {
                                    const __gotots_range_3 = Node.Elements(namedBindings);
                                    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                                        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                                        let element: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_3;
                                        const __gotots_callee_20 = visit__shadow_1;
                                        const __gotots_argument_57 = element;
                                        (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57);
                                    }
                                }
                            }
                        }
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 8) {
                        switch (GetAssignmentDeclarationKind(node__shadow_1).$value) {
                            case 2:
                            case 3:
                            case 4: {
                                const __gotots_callee_21 = addDeclaration;
                                const __gotots_argument_58 = node__shadow_1;
                                (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_58);
                                break;
                            }
                        }
                        Node.ForEachChild(node__shadow_1, new Visitor(visit__shadow_1));
                        break __gotots_control_target_1;
                    }
                    if (__gotots_switch_selection_1 === 9) {
                        Node.ForEachChild(node__shadow_1, new Visitor(visit__shadow_1));
                        break __gotots_control_target_1;
                    }
                }
            }
            return false;
        };
        SourceFile.ForEachChild(node, new Visitor(visit__shadow_1));
        return result;
    }
    static $go$private$ast$computeSubtreeFacts(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): SubtreeFacts {
        return propagateNodeListSubtreeFacts(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Statements, propagateSubtreeFacts);
    }
    static $go$private$ast$copyFrom(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, other: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): void {
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.LanguageVariant = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.LanguageVariant;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.IsDeclarationFile = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.IsDeclarationFile;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ContainsNonASCII = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ContainsNonASCII;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.UsesUriStyleNodeCoreModules = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.UsesUriStyleNodeCoreModules;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Identifiers = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Identifiers;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.imports = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.imports;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ModuleAugmentations = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ModuleAugmentations;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.AmbientModuleNames = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.AmbientModuleNames;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CommentDirectives = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CommentDirectives;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Pragmas = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Pragmas;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ReferencedFiles = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ReferencedFiles;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.TypeReferenceDirectives = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.TypeReferenceDirectives;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.LibReferenceDirectives = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.LibReferenceDirectives;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CommonJSModuleIndicator = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.CommonJSModuleIndicator;
        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ExternalModuleIndicator = ((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ExternalModuleIndicator;
        const __gotots_store_2 = (void Node.$storageOf, (void Node.$fromStorage,
            (void NodeDefault.$storageOf, (void NodeDefault.$fromStorage,
                NodeBase.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase).NodeDefault)).Node));
        __gotots_store_2.Flags = (__gotots_store_2.Flags | (void Node.$storageOf, (void Node.$fromStorage,
            (void NodeDefault.$storageOf, (void NodeDefault.$fromStorage,
                NodeBase.$storageOf(((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase).NodeDefault)).Node)).Flags) >>> 0;
    }
    static $go$private$ast$resolveJSDoc(node: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, n: tsonicTypeScriptRuntime.Location<Node> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    if ($state.parseJSDocForNode === undefined) {
                        const __gotots_argument_20 = new $goInterfaceAdapter$string("resolveJSDoc called but parseJSDocForNode is not registered; ensure the parser package is imported");
                        GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
                    }
                    sync__from_gostdlib.RWMutex.RLock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu);
                    {
                        const __gotots_results_0 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.lookupOk(n);
                        let jsdocs__shadow_1 = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            sync__from_gostdlib.RWMutex.RUnlock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu);
                            __gotots_return_0 = jsdocs__shadow_1;
                            break __gotots_return_block_0;
                        }
                    }
                    sync__from_gostdlib.RWMutex.RUnlock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu);
                    sync__from_gostdlib.RWMutex.Lock(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu);
                    const __gotots_receiver_8 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncRWMutexUnlock(__gotots_receiver_8, $go$recovery);
                    };
                    {
                        const __gotots_results_1 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.lookupOk(n);
                        let jsdocs__shadow_1 = __gotots_results_1[0];
                        let ok = __gotots_results_1[1];
                        if (ok) {
                            __gotots_return_0 = jsdocs__shadow_1;
                            break __gotots_return_block_0;
                        }
                    }
                    const __gotots_callee_3 = $state.parseJSDocForNode;
                    const __gotots_argument_21 = node;
                    const __gotots_argument_22 = n;
                    let jsdocs = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22);
                    if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.isNil()) {
                        ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache = GoMap.make(0, []);
                    }
                    ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.jsdocCache.store(n, jsdocs);
                    __gotots_return_0 = jsdocs;
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
}
export function createToken(kind: Kind, file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, pos: int, end: int, flags: TokenFlags): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory === undefined) {
        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory = NewNodeFactory(new NodeFactoryHooks(void 0, void 0, void 0));
    }
    let text = goStringSlice(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.text, pos, end);
    switch (kind) {
        case KindNumericLiteral$constant(): {
            return NodeFactory.NewNumericLiteral(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, flags);
            break;
        }
        case KindBigIntLiteral$constant(): {
            return NodeFactory.NewBigIntLiteral(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, flags);
            break;
        }
        case KindStringLiteral$constant(): {
            return NodeFactory.NewStringLiteral(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, flags);
            break;
        }
        case KindJsxText$constant():
        case KindJsxTextAllWhiteSpaces$constant(): {
            return NodeFactory.NewJsxText(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, kind === KindJsxTextAllWhiteSpaces$constant());
            break;
        }
        case KindRegularExpressionLiteral$constant(): {
            return NodeFactory.NewRegularExpressionLiteral(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, flags);
            break;
        }
        case KindNoSubstitutionTemplateLiteral$constant(): {
            return NodeFactory.NewNoSubstitutionTemplateLiteral(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, flags);
            break;
        }
        case KindTemplateHead$constant(): {
            return NodeFactory.NewTemplateHead(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, "", flags);
            break;
        }
        case KindTemplateMiddle$constant(): {
            return NodeFactory.NewTemplateMiddle(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, "", flags);
            break;
        }
        case KindTemplateTail$constant(): {
            return NodeFactory.NewTemplateTail(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text, "", flags);
            break;
        }
        case KindIdentifier$constant(): {
            return NodeFactory.NewIdentifier(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text);
            break;
        }
        case KindPrivateIdentifier$constant(): {
            return NodeFactory.NewPrivateIdentifier(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, text);
            break;
        }
        default: {
            return NodeFactory.NewToken(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.tokenFactory, kind);
            break;
        }
    }
}
export function GetDeclarationName(declaration: tsonicTypeScriptRuntime.Location<Node> | undefined): gostring {
    let name: tsonicTypeScriptRuntime.Location<Node> | undefined = GetNonAssignedNameOfDeclaration(declaration);
    if (!(name === undefined)) {
        if (IsComputedPropertyName(name)) {
            if (IsStringOrNumericLiteralLike(Node.Expression(name))) {
                return Node.Text(Node.Expression(name));
            }
            if (IsPropertyAccessExpression(Node.Expression(name))) {
                return Node.Text(Node.Name(Node.Expression(name)));
            }
        }
        else if (IsPropertyName(name)) {
            return Node.Text(name);
        }
    }
    return "";
}
export interface SourceFileLike extends GoInterfaceValue {
    ECMALineMap(): RuntimeSlice<TextPos__from_core>;
    Text(): gostring;
}
export const SourceFileLike$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ECMALineMap$void_to_SliceOf_Named_core$TextPos, $goInterfaceMethod$Text$void_to_string]);
export function SourceFileLike$is(value: GoInterfaceValue | undefined): value is SourceFileLike {
    return value !== undefined && value.$go$implements(SourceFileLike$contract);
}
export type CommentRange$Storage = {
    TextRange: TextRange__from_core$Storage;
    Kind: int16;
    HasTrailingNewLine: bool;
};
export class CommentRange implements GoContainerStoredValue<CommentRange$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CommentRange$Storage) {
    }
    public static $storageOf($source: CommentRange): CommentRange$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: CommentRange$Storage): CommentRange {
        return new CommentRange($source);
    }
    public get TextRange(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.TextRange);
    }
    public set TextRange($value: TextRange__from_core) {
        this.$storage.TextRange = TextRange__from_core.$storageOf($value);
    }
    public get Kind(): Kind {
        return this.$storage.Kind;
    }
    public set Kind($value: Kind) {
        this.$storage.Kind = $value;
    }
    public get HasTrailingNewLine(): bool {
        return this.$storage.HasTrailingNewLine;
    }
    public set HasTrailingNewLine($value: bool) {
        this.$storage.HasTrailingNewLine = $value;
    }
    declare readonly [$goContainerStorageType]: CommentRange$Storage;
    static $zero(): CommentRange {
        return new CommentRange({
            TextRange: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            Kind: 0,
            HasTrailingNewLine: false
        });
    }
    static $copy($source: CommentRange): CommentRange {
        return new CommentRange({
            TextRange: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.TextRange))),
            Kind: $source.$storage.Kind,
            HasTrailingNewLine: $source.$storage.HasTrailingNewLine
        });
    }
    static $equal($left: CommentRange, $right: CommentRange): bool {
        return TextRange__from_core.$equal(TextRange__from_core.$fromStorage($left.$storage.TextRange), TextRange__from_core.$fromStorage($right.$storage.TextRange)) && $left.$storage.Kind === $right.$storage.Kind && $left.$storage.HasTrailingNewLine === $right.$storage.HasTrailingNewLine;
    }
    static $hash($source: CommentRange): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash(TextRange__from_core.$fromStorage($source.$storage.TextRange)));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Kind));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.HasTrailingNewLine));
        return $hash;
    }
    declare private readonly then?: never;
}
export class FileReference {
    declare private readonly $goType: void;
    public constructor(public TextRange: TextRange__from_core, public FileName: gostring, public ResolutionMode: ModuleKind__from_core, public Preserve: bool) {
    }
    static $copy($source: FileReference): FileReference {
        return new FileReference(TextRange__from_core.$copy($source.TextRange), $source.FileName, $source.ResolutionMode, $source.Preserve);
    }
    static $equal($left: FileReference, $right: FileReference): bool {
        return TextRange__from_core.$equal($left.TextRange, $right.TextRange) && $left.FileName === $right.FileName && $left.ResolutionMode === $right.ResolutionMode && $left.Preserve === $right.Preserve;
    }
    static $hash($source: FileReference): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash($source.TextRange));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.FileName));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ResolutionMode));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.Preserve));
        return $hash;
    }
    declare private readonly then?: never;
}
export class PragmaArgument {
    declare private readonly $goType: void;
    public constructor(public TextRange: TextRange__from_core, public Name: gostring, public Value: gostring) {
    }
    static $zero(): PragmaArgument {
        return new PragmaArgument(TextRange__from_core.$zero(), "", "");
    }
    static $copy($source: PragmaArgument): PragmaArgument {
        return new PragmaArgument(TextRange__from_core.$copy($source.TextRange), $source.Name, $source.Value);
    }
    static $equal($left: PragmaArgument, $right: PragmaArgument): bool {
        return TextRange__from_core.$equal($left.TextRange, $right.TextRange) && $left.Name === $right.Name && $left.Value === $right.Value;
    }
    static $hash($source: PragmaArgument): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash($source.TextRange));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Name));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Value));
        return $hash;
    }
    declare private readonly then?: never;
}
export type Pragma$Storage = {
    CommentRange: CommentRange$Storage;
    Name: gostring;
    Args: GoMapValue<gostring, PragmaArgument>;
};
export class Pragma {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Pragma$Storage) {
    }
    public static $storageOf($source: Pragma): Pragma$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Pragma$Storage): Pragma {
        return new Pragma($source);
    }
    public get CommentRange(): CommentRange {
        return CommentRange.$fromStorage(this.$storage.CommentRange);
    }
    public set CommentRange($value: CommentRange) {
        this.$storage.CommentRange = CommentRange.$storageOf($value);
    }
    public get Name(): gostring {
        return this.$storage.Name;
    }
    public set Name($value: gostring) {
        this.$storage.Name = $value;
    }
    public get Args(): GoMapValue<gostring, PragmaArgument> {
        return this.$storage.Args;
    }
    public set Args($value: GoMapValue<gostring, PragmaArgument>) {
        this.$storage.Args = $value;
    }
    static $zero(): Pragma {
        return new Pragma({
            CommentRange: CommentRange.$storageOf(CommentRange.$zero()),
            Name: "",
            Args: $goMap$MapOf_string_To_Named_ast$PragmaArgument.nil()
        });
    }
    static $copy($source: Pragma): Pragma {
        return new Pragma({
            CommentRange: CommentRange.$storageOf(CommentRange.$copy(CommentRange.$fromStorage($source.$storage.CommentRange))),
            Name: $source.$storage.Name,
            Args: $source.$storage.Args
        });
    }
    declare private readonly then?: never;
}
export function forEachChild_JSDocParameterOrPropertyTag(node: {
    value: JSDocParameterOrPropertyTag;
} | undefined, v: Visitor): bool {
    return visit(v, JSDocTagBase.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName) || ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsNameFirst && (visit(v, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name) || visit(v, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression))) || (!(node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsNameFirst && (visit(v, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression) || visit(v, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name))) || visitNodeList(v, JSDocTagBase.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment);
}
export function visitEachChild_JSDocParameterOrPropertyTag(node: {
    value: JSDocParameterOrPropertyTag;
} | undefined, v: {
    value: NodeVisitor;
} | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    return NodeFactory.UpdateJSDocParameterOrPropertyTag((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, node, NodeVisitor.$go$private$ast$visitNode(v, JSDocTagBase.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName), NodeVisitor.$go$private$ast$visitNode(v, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsBracketed, NodeVisitor.$go$private$ast$visitNode(v, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsNameFirst, NodeVisitor.$go$private$ast$visitNodes(v, JSDocTagBase.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment));
}
