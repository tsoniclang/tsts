import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, ArrowFunction as ArrowFunction__from_ast, AsExpression as AsExpression__from_ast, AwaitExpression as AwaitExpression__from_ast, BindingPattern as BindingPattern__from_ast, BreakStatement as BreakStatement__from_ast, CallSignatureDeclaration as CallSignatureDeclaration__from_ast, CaseBlock as CaseBlock__from_ast, CaseOrDefaultClause as CaseOrDefaultClause__from_ast, CatchClause as CatchClause__from_ast, ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast, ComputedPropertyName as ComputedPropertyName__from_ast, ConditionalTypeNode as ConditionalTypeNode__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ConstructorTypeNode as ConstructorTypeNode__from_ast, ContinueStatement as ContinueStatement__from_ast, Decorator as Decorator__from_ast, DeleteExpression as DeleteExpression__from_ast, DoStatement as DoStatement__from_ast, ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, ExternalModuleReference as ExternalModuleReference__from_ast, ForInOrOfStatement as ForInOrOfStatement__from_ast, ForStatement as ForStatement__from_ast, ImportAttributes as ImportAttributes__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, IndexSignatureDeclaration as IndexSignatureDeclaration__from_ast, InferTypeNode as InferTypeNode__from_ast, JSDocAugmentsTag as JSDocAugmentsTag__from_ast, JSDocImplementsTag as JSDocImplementsTag__from_ast, JSDocImportTag as JSDocImportTag__from_ast, JSDocNonNullableType as JSDocNonNullableType__from_ast, JSDocNullableType as JSDocNullableType__from_ast, JSDocOptionalType as JSDocOptionalType__from_ast, JSDocOverloadTag as JSDocOverloadTag__from_ast, JSDocOverrideTag as JSDocOverrideTag__from_ast, JSDocPrivateTag as JSDocPrivateTag__from_ast, JSDocProtectedTag as JSDocProtectedTag__from_ast, JSDocPublicTag as JSDocPublicTag__from_ast, JSDocReadonlyTag as JSDocReadonlyTag__from_ast, JSDocReturnTag as JSDocReturnTag__from_ast, JSDocSatisfiesTag as JSDocSatisfiesTag__from_ast, JSDocSeeTag as JSDocSeeTag__from_ast, JSDocSignature as JSDocSignature__from_ast, JSDocTemplateTag as JSDocTemplateTag__from_ast, JSDocThisTag as JSDocThisTag__from_ast, JSDocThrowsTag as JSDocThrowsTag__from_ast, JSDocTypeExpression as JSDocTypeExpression__from_ast, JSDocTypeLiteral as JSDocTypeLiteral__from_ast, JSDocTypeTag as JSDocTypeTag__from_ast, JSDocVariadicType as JSDocVariadicType__from_ast, JsxAttributes as JsxAttributes__from_ast, JsxClosingElement as JsxClosingElement__from_ast, JsxElement as JsxElement__from_ast, JsxExpression as JsxExpression__from_ast, JsxFragment as JsxFragment__from_ast, JsxOpeningElement as JsxOpeningElement__from_ast, JsxSelfClosingElement as JsxSelfClosingElement__from_ast, JsxSpreadAttribute as JsxSpreadAttribute__from_ast, JsxText as JsxText__from_ast, LabeledStatement as LabeledStatement__from_ast, MappedTypeNode as MappedTypeNode__from_ast, MissingDeclaration as MissingDeclaration__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, ModuleBlock as ModuleBlock__from_ast, NamedExports as NamedExports__from_ast, NamedImports as NamedImports__from_ast, NamedMemberBase$Storage as NamedMemberBase__from_ast$Storage, NewExpression as NewExpression__from_ast, Node$Storage as Node__from_ast$Storage, NonNullExpression as NonNullExpression__from_ast, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, OptionalTypeNode as OptionalTypeNode__from_ast, PartiallyEmittedExpression as PartiallyEmittedExpression__from_ast, PositionMap as PositionMap__from_ast, PostfixUnaryExpression as PostfixUnaryExpression__from_ast, PrivateIdentifier as PrivateIdentifier__from_ast, QualifiedName as QualifiedName__from_ast, RestTypeNode as RestTypeNode__from_ast, SatisfiesExpression as SatisfiesExpression__from_ast, SpreadAssignment as SpreadAssignment__from_ast, SpreadElement as SpreadElement__from_ast, SwitchStatement as SwitchStatement__from_ast, SyntaxList as SyntaxList__from_ast, SyntheticExpression as SyntheticExpression__from_ast, SyntheticReferenceExpression as SyntheticReferenceExpression__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TemplateExpression as TemplateExpression__from_ast, TemplateLiteralTypeNode as TemplateLiteralTypeNode__from_ast, TemplateLiteralTypeSpan as TemplateLiteralTypeSpan__from_ast, TemplateSpan as TemplateSpan__from_ast, ThrowStatement as ThrowStatement__from_ast, TryStatement as TryStatement__from_ast, TupleTypeNode as TupleTypeNode__from_ast, TypeAssertion as TypeAssertion__from_ast, TypeOfExpression as TypeOfExpression__from_ast, TypePredicateNode as TypePredicateNode__from_ast, TypeQueryNode as TypeQueryNode__from_ast, VoidExpression as VoidExpression__from_ast, WhileStatement as WhileStatement__from_ast, WithStatement as WithStatement__from_ast, YieldExpression as YieldExpression__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { uint32, uint8 } from "@gotots/runtime/scalars.js";
import { ArrayTypeNode as ArrayTypeNode__from_ast, BinaryExpression as BinaryExpression__from_ast, BindingElement as BindingElement__from_ast, Block as Block__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ConditionalExpression as ConditionalExpression__from_ast, ConstructSignatureDeclaration as ConstructSignatureDeclaration__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, EnumDeclaration as EnumDeclaration__from_ast, EnumMember as EnumMember__from_ast, ExportSpecifier as ExportSpecifier__from_ast, ExpressionStatement as ExpressionStatement__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, FunctionOrConstructorTypeNodeBase as FunctionOrConstructorTypeNodeBase__from_ast, FunctionTypeNode as FunctionTypeNode__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, HeritageClause as HeritageClause__from_ast, Identifier as Identifier__from_ast, IfStatement as IfStatement__from_ast, ImportAttribute as ImportAttribute__from_ast, ImportClause as ImportClause__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, InterfaceDeclaration as InterfaceDeclaration__from_ast, IntersectionTypeNode as IntersectionTypeNode__from_ast, JSDocCallbackTag as JSDocCallbackTag__from_ast, JSDocCommentBase as JSDocCommentBase__from_ast, JSDocDeprecatedTag as JSDocDeprecatedTag__from_ast, JSDocLinkCode as JSDocLinkCode__from_ast, JSDocLinkPlain as JSDocLinkPlain__from_ast, JSDocLink as JSDocLink__from_ast, JSDocNameReference as JSDocNameReference__from_ast, JSDocParameterOrPropertyTag as JSDocParameterOrPropertyTag__from_ast, JSDocTagBase as JSDocTagBase__from_ast, JSDocText as JSDocText__from_ast, JSDocTypedefTag as JSDocTypedefTag__from_ast, JSDocUnknownTag as JSDocUnknownTag__from_ast, JSDoc as JSDoc__from_ast, JsxAttribute as JsxAttribute__from_ast, JsxNamespacedName as JsxNamespacedName__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindAssertKeyword$constant as KindAssertKeyword$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDeferKeyword$constant as KindDeferKeyword$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindImportAttribute$constant as KindImportAttribute$constant__from_ast, KindImportAttributes$constant as KindImportAttributes$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJSDoc$constant as KindJSDoc$constant__from_ast, KindJSDocAugmentsTag$constant as KindJSDocAugmentsTag$constant__from_ast, KindJSDocCallbackTag$constant as KindJSDocCallbackTag$constant__from_ast, KindJSDocDeprecatedTag$constant as KindJSDocDeprecatedTag$constant__from_ast, KindJSDocImplementsTag$constant as KindJSDocImplementsTag$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindJSDocLink$constant as KindJSDocLink$constant__from_ast, KindJSDocLinkCode$constant as KindJSDocLinkCode$constant__from_ast, KindJSDocLinkPlain$constant as KindJSDocLinkPlain$constant__from_ast, KindJSDocNameReference$constant as KindJSDocNameReference$constant__from_ast, KindJSDocNonNullableType$constant as KindJSDocNonNullableType$constant__from_ast, KindJSDocNullableType$constant as KindJSDocNullableType$constant__from_ast, KindJSDocOptionalType$constant as KindJSDocOptionalType$constant__from_ast, KindJSDocOverloadTag$constant as KindJSDocOverloadTag$constant__from_ast, KindJSDocOverrideTag$constant as KindJSDocOverrideTag$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocPrivateTag$constant as KindJSDocPrivateTag$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocProtectedTag$constant as KindJSDocProtectedTag$constant__from_ast, KindJSDocPublicTag$constant as KindJSDocPublicTag$constant__from_ast, KindJSDocReadonlyTag$constant as KindJSDocReadonlyTag$constant__from_ast, KindJSDocReturnTag$constant as KindJSDocReturnTag$constant__from_ast, KindJSDocSatisfiesTag$constant as KindJSDocSatisfiesTag$constant__from_ast, KindJSDocSeeTag$constant as KindJSDocSeeTag$constant__from_ast, KindJSDocSignature$constant as KindJSDocSignature$constant__from_ast, KindJSDocTemplateTag$constant as KindJSDocTemplateTag$constant__from_ast, KindJSDocText$constant as KindJSDocText$constant__from_ast, KindJSDocThisTag$constant as KindJSDocThisTag$constant__from_ast, KindJSDocThrowsTag$constant as KindJSDocThrowsTag$constant__from_ast, KindJSDocTypeExpression$constant as KindJSDocTypeExpression$constant__from_ast, KindJSDocTypeLiteral$constant as KindJSDocTypeLiteral$constant__from_ast, KindJSDocTypeTag$constant as KindJSDocTypeTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindJSDocUnknownTag$constant as KindJSDocUnknownTag$constant__from_ast, KindJSDocVariadicType$constant as KindJSDocVariadicType$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxAttributes$constant as KindJsxAttributes$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxNamespacedName$constant as KindJsxNamespacedName$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxSpreadAttribute$constant as KindJsxSpreadAttribute$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMetaProperty$constant as KindMetaProperty$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindMissingDeclaration$constant as KindMissingDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNewKeyword$constant as KindNewKeyword$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOptionalType$constant as KindOptionalType$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPartiallyEmittedExpression$constant as KindPartiallyEmittedExpression$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindRestType$constant as KindRestType$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindSyntaxList$constant as KindSyntaxList$constant__from_ast, KindSyntheticExpression$constant as KindSyntheticExpression$constant__from_ast, KindSyntheticReferenceExpression$constant as KindSyntheticReferenceExpression$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateLiteralType$constant as KindTemplateLiteralType$constant__from_ast, KindTemplateLiteralTypeSpan$constant as KindTemplateLiteralTypeSpan$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTildeToken$constant as KindTildeToken$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindTypeKeyword$constant as KindTypeKeyword$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOfExpression$constant as KindTypeOfExpression$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindUniqueKeyword$constant as KindUniqueKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, MetaProperty as MetaProperty__from_ast, MethodDeclaration as MethodDeclaration__from_ast, MethodSignatureDeclaration as MethodSignatureDeclaration__from_ast, ModifiersBase as ModifiersBase__from_ast, ModuleDeclaration as ModuleDeclaration__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NamedTupleMember as NamedTupleMember__from_ast, NamespaceExportDeclaration as NamespaceExportDeclaration__from_ast, NamespaceExport as NamespaceExport__from_ast, NamespaceImport as NamespaceImport__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeWithTypeArgumentsBase as NodeWithTypeArgumentsBase__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, ParenthesizedTypeNode as ParenthesizedTypeNode__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, PropertySignatureDeclaration as PropertySignatureDeclaration__from_ast, ReturnStatement as ReturnStatement__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, TypeAliasDeclaration as TypeAliasDeclaration__from_ast, TypeLiteralNode as TypeLiteralNode__from_ast, TypeOperatorNode as TypeOperatorNode__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnionOrIntersectionTypeNodeBase as UnionOrIntersectionTypeNodeBase__from_ast, UnionTypeNode as UnionTypeNode__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$Named_ast$Kind as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { NodeDataTypeChildren, NodeDataTypeExtendedData, NodeDataTypeString, boolToByte, getNodeCommonData_SyntheticExpression, hasModifiers, recordExtendedData_BigIntLiteral, recordExtendedData_NoSubstitutionTemplateLiteral, recordExtendedData_NumericLiteral, recordExtendedData_RegularExpressionLiteral, recordExtendedData_SourceFile, recordExtendedData_StringLiteral, recordExtendedData_TemplateHead, recordExtendedData_TemplateMiddle, recordExtendedData_TemplateTail } from "./encoder.js";
import { stringTable } from "./stringtable.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function getNodeDataType(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): uint32 {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
        case KindPrivateIdentifier$constant__from_ast():
        case KindJsxText$constant__from_ast():
        case KindJSDocText$constant__from_ast():
        case KindJSDocLink$constant__from_ast():
        case KindJSDocLinkPlain$constant__from_ast():
        case KindJSDocLinkCode$constant__from_ast(): {
            return NodeDataTypeString;
            break;
        }
        case KindStringLiteral$constant__from_ast():
        case KindNumericLiteral$constant__from_ast():
        case KindBigIntLiteral$constant__from_ast():
        case KindRegularExpressionLiteral$constant__from_ast():
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindTemplateHead$constant__from_ast():
        case KindTemplateMiddle$constant__from_ast():
        case KindTemplateTail$constant__from_ast():
        case KindSourceFile$constant__from_ast(): {
            return NodeDataTypeExtendedData;
            break;
        }
        default: {
            return NodeDataTypeChildren;
            break;
        }
    }
}
export function getChildrenPropertyMask(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): uint8 {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindQualifiedName$constant__from_ast(): {
            let n: {
                value: QualifiedName__from_ast;
            } | undefined = Node__from_ast.AsQualifiedName(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right === undefined)) << 1);
            break;
        }
        case KindComputedPropertyName$constant__from_ast(): {
            let n: {
                value: ComputedPropertyName__from_ast;
            } | undefined = Node__from_ast.AsComputedPropertyName(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindDecorator$constant__from_ast(): {
            let n: {
                value: Decorator__from_ast;
            } | undefined = Node__from_ast.AsDecorator(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindIfStatement$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined = Node__from_ast.AsIfStatement(node);
            return (boolToByte(!(IfStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).Expression === undefined)) << 0) | (boolToByte(!(IfStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ThenStatement === undefined)) << 1) | (boolToByte(!(IfStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement === undefined)) << 2);
            break;
        }
        case KindDoStatement$constant__from_ast(): {
            let n: {
                value: DoStatement__from_ast;
            } | undefined = Node__from_ast.AsDoStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 1);
            break;
        }
        case KindWhileStatement$constant__from_ast(): {
            let n: {
                value: WhileStatement__from_ast;
            } | undefined = Node__from_ast.AsWhileStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement === undefined)) << 1);
            break;
        }
        case KindForStatement$constant__from_ast(): {
            let n: {
                value: ForStatement__from_ast;
            } | undefined = Node__from_ast.AsForStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement === undefined)) << 3);
            break;
        }
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast(): {
            let n: {
                value: ForInOrOfStatement__from_ast;
            } | undefined = Node__from_ast.AsForInOrOfStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement === undefined)) << 3);
            break;
        }
        case KindBreakStatement$constant__from_ast(): {
            let n: {
                value: BreakStatement__from_ast;
            } | undefined = Node__from_ast.AsBreakStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label === undefined)) << 0);
            break;
        }
        case KindContinueStatement$constant__from_ast(): {
            let n: {
                value: ContinueStatement__from_ast;
            } | undefined = Node__from_ast.AsContinueStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label === undefined)) << 0);
            break;
        }
        case KindReturnStatement$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast> | undefined = Node__from_ast.AsReturnStatement(node);
            return (boolToByte(!(ReturnStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast>).value).Expression === undefined)) << 0);
            break;
        }
        case KindWithStatement$constant__from_ast(): {
            let n: {
                value: WithStatement__from_ast;
            } | undefined = Node__from_ast.AsWithStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement === undefined)) << 1);
            break;
        }
        case KindSwitchStatement$constant__from_ast(): {
            let n: {
                value: SwitchStatement__from_ast;
            } | undefined = Node__from_ast.AsSwitchStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CaseBlock === undefined)) << 1);
            break;
        }
        case KindCaseBlock$constant__from_ast(): {
            let n: {
                value: CaseBlock__from_ast;
            } | undefined = Node__from_ast.AsCaseBlock(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clauses === undefined)) << 0);
            break;
        }
        case KindCaseClause$constant__from_ast():
        case KindDefaultClause$constant__from_ast(): {
            let n: {
                value: CaseOrDefaultClause__from_ast;
            } | undefined = Node__from_ast.AsCaseOrDefaultClause(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements === undefined)) << 1);
            break;
        }
        case KindThrowStatement$constant__from_ast(): {
            let n: {
                value: ThrowStatement__from_ast;
            } | undefined = Node__from_ast.AsThrowStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindTryStatement$constant__from_ast(): {
            let n: {
                value: TryStatement__from_ast;
            } | undefined = Node__from_ast.AsTryStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock === undefined)) << 2);
            break;
        }
        case KindCatchClause$constant__from_ast(): {
            let n: {
                value: CatchClause__from_ast;
            } | undefined = Node__from_ast.AsCatchClause(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Block === undefined)) << 1);
            break;
        }
        case KindLabeledStatement$constant__from_ast(): {
            let n: {
                value: LabeledStatement__from_ast;
            } | undefined = Node__from_ast.AsLabeledStatement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement === undefined)) << 1);
            break;
        }
        case KindExpressionStatement$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast> | undefined = Node__from_ast.AsExpressionStatement(node);
            return (boolToByte(!(ExpressionStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).Expression === undefined)) << 0);
            break;
        }
        case KindBlock$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock(node);
            return (boolToByte(!(Block__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements === undefined)) << 0);
            break;
        }
        case KindVariableStatement$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined = Node__from_ast.AsVariableStatement(node);
            const __gotots_store_0 = VariableStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value);
            const __gotots_argument_0 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_1 = hasModifiers(__gotots_argument_0);
            const __gotots_binary_operand_0 = boolToByte(__gotots_argument_1);
            const __gotots_binary_operand_1 = 0;
            const __gotots_binary_operand_2 = (__gotots_binary_operand_0 << __gotots_binary_operand_1);
            const __gotots_binary_operand_3 = (boolToByte(!(VariableStatement__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList === undefined)) << 1);
            return __gotots_binary_operand_2 | __gotots_binary_operand_3;
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined = Node__from_ast.AsVariableDeclaration(node);
            return (boolToByte(!(VariableDeclaration__from_ast.Name(n) === undefined)) << 0) | (boolToByte(!(VariableDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).ExclamationToken === undefined)) << 1) | (boolToByte(!(VariableDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Type === undefined)) << 2) | (boolToByte(!(VariableDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined)) << 3);
            break;
        }
        case KindVariableDeclarationList$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined = Node__from_ast.AsVariableDeclarationList(node);
            return (boolToByte(!(VariableDeclarationList__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations === undefined)) << 0);
            break;
        }
        case KindObjectBindingPattern$constant__from_ast():
        case KindArrayBindingPattern$constant__from_ast(): {
            let n: {
                value: BindingPattern__from_ast;
            } | undefined = Node__from_ast.AsBindingPattern(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements === undefined)) << 0);
            break;
        }
        case KindParameter$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(node);
            const __gotots_store_1 = ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
            const __gotots_argument_2 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_3 = hasModifiers(__gotots_argument_2);
            const __gotots_binary_operand_4 = boolToByte(__gotots_argument_3);
            const __gotots_binary_operand_5 = 0;
            const __gotots_binary_operand_6 = (__gotots_binary_operand_4 << __gotots_binary_operand_5);
            const __gotots_binary_operand_7 = (boolToByte(!(ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) << 1);
            const __gotots_binary_operand_8 = __gotots_binary_operand_6 | __gotots_binary_operand_7;
            const __gotots_binary_operand_9 = (boolToByte(!(ParameterDeclaration__from_ast.Name(n) === undefined)) << 2);
            const __gotots_binary_operand_10 = __gotots_binary_operand_8 | __gotots_binary_operand_9;
            const __gotots_binary_operand_11 = (boolToByte(!(ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken === undefined)) << 3);
            const __gotots_binary_operand_12 = __gotots_binary_operand_10 | __gotots_binary_operand_11;
            const __gotots_binary_operand_13 = (boolToByte(!(ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type === undefined)) << 4);
            const __gotots_binary_operand_14 = __gotots_binary_operand_12 | __gotots_binary_operand_13;
            const __gotots_binary_operand_15 = (boolToByte(!(ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined)) << 5);
            return __gotots_binary_operand_14 | __gotots_binary_operand_15;
            break;
        }
        case KindBindingElement$constant__from_ast(): {
            let n: {
                value: BindingElement__from_ast;
            } | undefined = Node__from_ast.AsBindingElement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName === undefined)) << 1) | (boolToByte(!(BindingElement__from_ast.Name(n) === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) << 3);
            break;
        }
        case KindMissingDeclaration$constant__from_ast(): {
            let n: {
                value: MissingDeclaration__from_ast;
            } | undefined = Node__from_ast.AsMissingDeclaration(node);
            const __gotots_store_2 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_4 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "ModifiersBase"));
            const __gotots_argument_5 = hasModifiers(__gotots_argument_4);
            const __gotots_binary_operand_16 = boolToByte(__gotots_argument_5);
            const __gotots_binary_operand_17 = 0;
            return (__gotots_binary_operand_16 << __gotots_binary_operand_17);
            break;
        }
        case KindFunctionDeclaration$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(node);
            const __gotots_store_3 = FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
            const __gotots_argument_6 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_7 = hasModifiers(__gotots_argument_6);
            const __gotots_binary_operand_18 = boolToByte(__gotots_argument_7);
            const __gotots_binary_operand_19 = 0;
            const __gotots_binary_operand_20 = (__gotots_binary_operand_18 << __gotots_binary_operand_19);
            const __gotots_binary_operand_21 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken === undefined)) << 1);
            const __gotots_binary_operand_22 = __gotots_binary_operand_20 | __gotots_binary_operand_21;
            const __gotots_binary_operand_23 = (boolToByte(!(FunctionDeclaration__from_ast.Name(n) === undefined)) << 2);
            const __gotots_binary_operand_24 = __gotots_binary_operand_22 | __gotots_binary_operand_23;
            const __gotots_binary_operand_25 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).TypeParameters === undefined)) << 3);
            const __gotots_binary_operand_26 = __gotots_binary_operand_24 | __gotots_binary_operand_25;
            const __gotots_binary_operand_27 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters === undefined)) << 4);
            const __gotots_binary_operand_28 = __gotots_binary_operand_26 | __gotots_binary_operand_27;
            const __gotots_binary_operand_29 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Type === undefined)) << 5);
            const __gotots_binary_operand_30 = __gotots_binary_operand_28 | __gotots_binary_operand_29;
            const __gotots_binary_operand_31 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body === undefined)) << 6);
            return __gotots_binary_operand_30 | __gotots_binary_operand_31;
            break;
        }
        case KindClassDeclaration$constant__from_ast(): {
            let n: {
                value: ClassDeclaration__from_ast;
            } | undefined = Node__from_ast.AsClassDeclaration(node);
            const __gotots_store_4: ClassDeclaration__from_ast["ClassLikeBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
            const __gotots_argument_8 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "ModifiersBase"));
            const __gotots_argument_9 = hasModifiers(__gotots_argument_8);
            const __gotots_binary_operand_32 = boolToByte(__gotots_argument_9);
            const __gotots_binary_operand_33 = 0;
            const __gotots_binary_operand_34 = (__gotots_binary_operand_32 << __gotots_binary_operand_33);
            const __gotots_binary_operand_35 = (boolToByte(!(ClassDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_36 = __gotots_binary_operand_34 | __gotots_binary_operand_35;
            const __gotots_binary_operand_37 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters === undefined)) << 2);
            const __gotots_binary_operand_38 = __gotots_binary_operand_36 | __gotots_binary_operand_37;
            const __gotots_binary_operand_39 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses === undefined)) << 3);
            const __gotots_binary_operand_40 = __gotots_binary_operand_38 | __gotots_binary_operand_39;
            const __gotots_binary_operand_41 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members === undefined)) << 4);
            return __gotots_binary_operand_40 | __gotots_binary_operand_41;
            break;
        }
        case KindClassExpression$constant__from_ast(): {
            let n: {
                value: ClassExpression__from_ast;
            } | undefined = Node__from_ast.AsClassExpression(node);
            const __gotots_store_5: ClassExpression__from_ast["ClassLikeBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
            const __gotots_argument_10 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "ModifiersBase"));
            const __gotots_argument_11 = hasModifiers(__gotots_argument_10);
            const __gotots_binary_operand_42 = boolToByte(__gotots_argument_11);
            const __gotots_binary_operand_43 = 0;
            const __gotots_binary_operand_44 = (__gotots_binary_operand_42 << __gotots_binary_operand_43);
            const __gotots_binary_operand_45 = (boolToByte(!(ClassExpression__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_46 = __gotots_binary_operand_44 | __gotots_binary_operand_45;
            const __gotots_binary_operand_47 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters === undefined)) << 2);
            const __gotots_binary_operand_48 = __gotots_binary_operand_46 | __gotots_binary_operand_47;
            const __gotots_binary_operand_49 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses === undefined)) << 3);
            const __gotots_binary_operand_50 = __gotots_binary_operand_48 | __gotots_binary_operand_49;
            const __gotots_binary_operand_51 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members === undefined)) << 4);
            return __gotots_binary_operand_50 | __gotots_binary_operand_51;
            break;
        }
        case KindHeritageClause$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined = Node__from_ast.AsHeritageClause(node);
            return (boolToByte(!(HeritageClause__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types === undefined)) << 0);
            break;
        }
        case KindInterfaceDeclaration$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast> | undefined = Node__from_ast.AsInterfaceDeclaration(node);
            const __gotots_store_6 = InterfaceDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value);
            const __gotots_argument_12 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_13 = hasModifiers(__gotots_argument_12);
            const __gotots_binary_operand_52 = boolToByte(__gotots_argument_13);
            const __gotots_binary_operand_53 = 0;
            const __gotots_binary_operand_54 = (__gotots_binary_operand_52 << __gotots_binary_operand_53);
            const __gotots_binary_operand_55 = (boolToByte(!(InterfaceDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_56 = __gotots_binary_operand_54 | __gotots_binary_operand_55;
            const __gotots_binary_operand_57 = (boolToByte(!(InterfaceDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).TypeParameters === undefined)) << 2);
            const __gotots_binary_operand_58 = __gotots_binary_operand_56 | __gotots_binary_operand_57;
            const __gotots_binary_operand_59 = (boolToByte(!(InterfaceDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).HeritageClauses === undefined)) << 3);
            const __gotots_binary_operand_60 = __gotots_binary_operand_58 | __gotots_binary_operand_59;
            const __gotots_binary_operand_61 = (boolToByte(!(InterfaceDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).Members === undefined)) << 4);
            return __gotots_binary_operand_60 | __gotots_binary_operand_61;
            break;
        }
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSTypeAliasDeclaration$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast> | undefined = Node__from_ast.AsTypeAliasDeclaration(node);
            const __gotots_store_7 = TypeAliasDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast>).value);
            const __gotots_argument_14 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_15 = hasModifiers(__gotots_argument_14);
            const __gotots_binary_operand_62 = boolToByte(__gotots_argument_15);
            const __gotots_binary_operand_63 = 0;
            const __gotots_binary_operand_64 = (__gotots_binary_operand_62 << __gotots_binary_operand_63);
            const __gotots_binary_operand_65 = (boolToByte(!(TypeAliasDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_66 = __gotots_binary_operand_64 | __gotots_binary_operand_65;
            const __gotots_binary_operand_67 = (boolToByte(!(TypeAliasDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast>).value).TypeParameters === undefined)) << 2);
            const __gotots_binary_operand_68 = __gotots_binary_operand_66 | __gotots_binary_operand_67;
            const __gotots_binary_operand_69 = (boolToByte(!(TypeAliasDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast>).value).Type === undefined)) << 3);
            return __gotots_binary_operand_68 | __gotots_binary_operand_69;
            break;
        }
        case KindEnumMember$constant__from_ast(): {
            let n: {
                value: EnumMember__from_ast;
            } | undefined = Node__from_ast.AsEnumMember(node);
            return (boolToByte(!(EnumMember__from_ast.Name(n) === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) << 1);
            break;
        }
        case KindEnumDeclaration$constant__from_ast(): {
            let n: {
                value: EnumDeclaration__from_ast;
            } | undefined = Node__from_ast.AsEnumDeclaration(node);
            const __gotots_store_8 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_16 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "ModifiersBase"));
            const __gotots_argument_17 = hasModifiers(__gotots_argument_16);
            const __gotots_binary_operand_70 = boolToByte(__gotots_argument_17);
            const __gotots_binary_operand_71 = 0;
            const __gotots_binary_operand_72 = (__gotots_binary_operand_70 << __gotots_binary_operand_71);
            const __gotots_binary_operand_73 = (boolToByte(!(EnumDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_74 = __gotots_binary_operand_72 | __gotots_binary_operand_73;
            const __gotots_binary_operand_75 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members === undefined)) << 2);
            return __gotots_binary_operand_74 | __gotots_binary_operand_75;
            break;
        }
        case KindModuleBlock$constant__from_ast(): {
            let n: {
                value: ModuleBlock__from_ast;
            } | undefined = Node__from_ast.AsModuleBlock(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements === undefined)) << 0);
            break;
        }
        case KindImportDeclaration$constant__from_ast():
        case KindJSImportDeclaration$constant__from_ast(): {
            let n: {
                value: ImportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportDeclaration(node);
            const __gotots_store_9 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_18 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "ModifiersBase"));
            const __gotots_argument_19 = hasModifiers(__gotots_argument_18);
            const __gotots_binary_operand_76 = boolToByte(__gotots_argument_19);
            const __gotots_binary_operand_77 = 0;
            const __gotots_binary_operand_78 = (__gotots_binary_operand_76 << __gotots_binary_operand_77);
            const __gotots_binary_operand_79 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined)) << 1);
            const __gotots_binary_operand_80 = __gotots_binary_operand_78 | __gotots_binary_operand_79;
            const __gotots_binary_operand_81 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined)) << 2);
            const __gotots_binary_operand_82 = __gotots_binary_operand_80 | __gotots_binary_operand_81;
            const __gotots_binary_operand_83 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 3);
            return __gotots_binary_operand_82 | __gotots_binary_operand_83;
            break;
        }
        case KindExternalModuleReference$constant__from_ast(): {
            let n: {
                value: ExternalModuleReference__from_ast;
            } | undefined = Node__from_ast.AsExternalModuleReference(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindNamespaceImport$constant__from_ast(): {
            let n: {
                value: NamespaceImport__from_ast;
            } | undefined = Node__from_ast.AsNamespaceImport(node);
            return (boolToByte(!(NamespaceImport__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindNamedImports$constant__from_ast(): {
            let n: {
                value: NamedImports__from_ast;
            } | undefined = Node__from_ast.AsNamedImports(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements === undefined)) << 0);
            break;
        }
        case KindExportAssignment$constant__from_ast(): {
            let n: {
                value: ExportAssignment__from_ast;
            } | undefined = Node__from_ast.AsExportAssignment(node);
            const __gotots_store_10 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_20 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "ModifiersBase"));
            const __gotots_argument_21 = hasModifiers(__gotots_argument_20);
            const __gotots_binary_operand_84 = boolToByte(__gotots_argument_21);
            const __gotots_binary_operand_85 = 0;
            const __gotots_binary_operand_86 = (__gotots_binary_operand_84 << __gotots_binary_operand_85);
            const __gotots_binary_operand_87 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 1);
            const __gotots_binary_operand_88 = __gotots_binary_operand_86 | __gotots_binary_operand_87;
            const __gotots_binary_operand_89 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 2);
            return __gotots_binary_operand_88 | __gotots_binary_operand_89;
            break;
        }
        case KindNamespaceExportDeclaration$constant__from_ast(): {
            let n: {
                value: NamespaceExportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsNamespaceExportDeclaration(node);
            const __gotots_store_11 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_22 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "ModifiersBase"));
            const __gotots_argument_23 = hasModifiers(__gotots_argument_22);
            const __gotots_binary_operand_90 = boolToByte(__gotots_argument_23);
            const __gotots_binary_operand_91 = 0;
            const __gotots_binary_operand_92 = (__gotots_binary_operand_90 << __gotots_binary_operand_91);
            const __gotots_binary_operand_93 = (boolToByte(!(NamespaceExportDeclaration__from_ast.Name(n) === undefined)) << 1);
            return __gotots_binary_operand_92 | __gotots_binary_operand_93;
            break;
        }
        case KindNamespaceExport$constant__from_ast(): {
            let n: {
                value: NamespaceExport__from_ast;
            } | undefined = Node__from_ast.AsNamespaceExport(node);
            return (boolToByte(!(NamespaceExport__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindNamedExports$constant__from_ast(): {
            let n: {
                value: NamedExports__from_ast;
            } | undefined = Node__from_ast.AsNamedExports(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements === undefined)) << 0);
            break;
        }
        case KindExportSpecifier$constant__from_ast(): {
            let n: {
                value: ExportSpecifier__from_ast;
            } | undefined = Node__from_ast.AsExportSpecifier(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName === undefined)) << 0) | (boolToByte(!(ExportSpecifier__from_ast.Name(n) === undefined)) << 1);
            break;
        }
        case KindCallSignature$constant__from_ast(): {
            let n: {
                value: CallSignatureDeclaration__from_ast;
            } | undefined = Node__from_ast.AsCallSignatureDeclaration(node);
            return (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).TypeParameters === undefined)) << 0) | (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters === undefined)) << 1) | (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Type === undefined)) << 2);
            break;
        }
        case KindConstructSignature$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast> | undefined = Node__from_ast.AsConstructSignatureDeclaration(node);
            return (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                ConstructSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters === undefined)) << 0) | (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                ConstructSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters === undefined)) << 1) | (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                ConstructSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Type === undefined)) << 2);
            break;
        }
        case KindConstructor$constant__from_ast(): {
            let n: {
                value: ConstructorDeclaration__from_ast;
            } | undefined = Node__from_ast.AsConstructorDeclaration(node);
            const __gotots_store_12 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_24 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "ModifiersBase"));
            const __gotots_argument_25 = hasModifiers(__gotots_argument_24);
            const __gotots_binary_operand_94 = boolToByte(__gotots_argument_25);
            const __gotots_binary_operand_95 = 0;
            const __gotots_binary_operand_96 = (__gotots_binary_operand_94 << __gotots_binary_operand_95);
            const __gotots_binary_operand_97 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters === undefined)) << 1);
            const __gotots_binary_operand_98 = __gotots_binary_operand_96 | __gotots_binary_operand_97;
            const __gotots_binary_operand_99 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined)) << 2);
            const __gotots_binary_operand_100 = __gotots_binary_operand_98 | __gotots_binary_operand_99;
            const __gotots_binary_operand_101 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined)) << 3);
            const __gotots_binary_operand_102 = __gotots_binary_operand_100 | __gotots_binary_operand_101;
            const __gotots_binary_operand_103 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) << 4);
            return __gotots_binary_operand_102 | __gotots_binary_operand_103;
            break;
        }
        case KindGetAccessor$constant__from_ast(): {
            let n: {
                value: GetAccessorDeclaration__from_ast;
            } | undefined = Node__from_ast.AsGetAccessorDeclaration(node);
            const __gotots_store_13: GetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
            const __gotots_argument_26 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NamedMemberBase"));
            const __gotots_argument_27 = hasModifiers(__gotots_argument_26);
            const __gotots_binary_operand_104 = boolToByte(__gotots_argument_27);
            const __gotots_binary_operand_105 = 0;
            const __gotots_binary_operand_106 = (__gotots_binary_operand_104 << __gotots_binary_operand_105);
            const __gotots_binary_operand_107 = (boolToByte(!(GetAccessorDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_108 = __gotots_binary_operand_106 | __gotots_binary_operand_107;
            const __gotots_binary_operand_109 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters === undefined)) << 2);
            const __gotots_binary_operand_110 = __gotots_binary_operand_108 | __gotots_binary_operand_109;
            const __gotots_binary_operand_111 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined)) << 3);
            const __gotots_binary_operand_112 = __gotots_binary_operand_110 | __gotots_binary_operand_111;
            const __gotots_binary_operand_113 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined)) << 4);
            const __gotots_binary_operand_114 = __gotots_binary_operand_112 | __gotots_binary_operand_113;
            const __gotots_binary_operand_115 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) << 5);
            return __gotots_binary_operand_114 | __gotots_binary_operand_115;
            break;
        }
        case KindSetAccessor$constant__from_ast(): {
            let n: {
                value: SetAccessorDeclaration__from_ast;
            } | undefined = Node__from_ast.AsSetAccessorDeclaration(node);
            const __gotots_store_14: SetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
            const __gotots_argument_28 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NamedMemberBase"));
            const __gotots_argument_29 = hasModifiers(__gotots_argument_28);
            const __gotots_binary_operand_116 = boolToByte(__gotots_argument_29);
            const __gotots_binary_operand_117 = 0;
            const __gotots_binary_operand_118 = (__gotots_binary_operand_116 << __gotots_binary_operand_117);
            const __gotots_binary_operand_119 = (boolToByte(!(SetAccessorDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_120 = __gotots_binary_operand_118 | __gotots_binary_operand_119;
            const __gotots_binary_operand_121 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters === undefined)) << 2);
            const __gotots_binary_operand_122 = __gotots_binary_operand_120 | __gotots_binary_operand_121;
            const __gotots_binary_operand_123 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined)) << 3);
            const __gotots_binary_operand_124 = __gotots_binary_operand_122 | __gotots_binary_operand_123;
            const __gotots_binary_operand_125 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined)) << 4);
            const __gotots_binary_operand_126 = __gotots_binary_operand_124 | __gotots_binary_operand_125;
            const __gotots_binary_operand_127 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) << 5);
            return __gotots_binary_operand_126 | __gotots_binary_operand_127;
            break;
        }
        case KindIndexSignature$constant__from_ast(): {
            let n: {
                value: IndexSignatureDeclaration__from_ast;
            } | undefined = Node__from_ast.AsIndexSignatureDeclaration(node);
            const __gotots_store_15 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_30 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "ModifiersBase"));
            const __gotots_argument_31 = hasModifiers(__gotots_argument_30);
            const __gotots_binary_operand_128 = boolToByte(__gotots_argument_31);
            const __gotots_binary_operand_129 = 0;
            const __gotots_binary_operand_130 = (__gotots_binary_operand_128 << __gotots_binary_operand_129);
            const __gotots_binary_operand_131 = (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters === undefined)) << 1);
            const __gotots_binary_operand_132 = __gotots_binary_operand_130 | __gotots_binary_operand_131;
            const __gotots_binary_operand_133 = (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Type === undefined)) << 2);
            return __gotots_binary_operand_132 | __gotots_binary_operand_133;
            break;
        }
        case KindMethodSignature$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast> | undefined = Node__from_ast.AsMethodSignatureDeclaration(node);
            const __gotots_store_16 = MethodSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value);
            const __gotots_argument_32 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<NamedMemberBase__from_ast$Storage, NamedMemberBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NamedMemberBase"), NamedMemberBase__from_ast.$fromStorage, NamedMemberBase__from_ast.$storageOf));
            const __gotots_argument_33 = hasModifiers(__gotots_argument_32);
            const __gotots_binary_operand_134 = boolToByte(__gotots_argument_33);
            const __gotots_binary_operand_135 = 0;
            const __gotots_binary_operand_136 = (__gotots_binary_operand_134 << __gotots_binary_operand_135);
            const __gotots_binary_operand_137 = (boolToByte(!(MethodSignatureDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_138 = __gotots_binary_operand_136 | __gotots_binary_operand_137;
            const __gotots_binary_operand_139 = (boolToByte(!((void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NamedMemberBase)).PostfixToken === undefined)) << 2);
            const __gotots_binary_operand_140 = __gotots_binary_operand_138 | __gotots_binary_operand_139;
            const __gotots_binary_operand_141 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters === undefined)) << 3);
            const __gotots_binary_operand_142 = __gotots_binary_operand_140 | __gotots_binary_operand_141;
            const __gotots_binary_operand_143 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters === undefined)) << 4);
            const __gotots_binary_operand_144 = __gotots_binary_operand_142 | __gotots_binary_operand_143;
            const __gotots_binary_operand_145 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Type === undefined)) << 5);
            return __gotots_binary_operand_144 | __gotots_binary_operand_145;
            break;
        }
        case KindMethodDeclaration$constant__from_ast(): {
            let n: {
                value: MethodDeclaration__from_ast;
            } | undefined = Node__from_ast.AsMethodDeclaration(node);
            const __gotots_store_17 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_34 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NamedMemberBase"));
            const __gotots_argument_35 = hasModifiers(__gotots_argument_34);
            const __gotots_binary_operand_146 = boolToByte(__gotots_argument_35);
            const __gotots_binary_operand_147 = 0;
            const __gotots_binary_operand_148 = (__gotots_binary_operand_146 << __gotots_binary_operand_147);
            const __gotots_binary_operand_149 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken === undefined)) << 1);
            const __gotots_binary_operand_150 = __gotots_binary_operand_148 | __gotots_binary_operand_149;
            const __gotots_binary_operand_151 = (boolToByte(!(MethodDeclaration__from_ast.Name(n) === undefined)) << 2);
            const __gotots_binary_operand_152 = __gotots_binary_operand_150 | __gotots_binary_operand_151;
            const __gotots_binary_operand_153 = (boolToByte(!(NamedMemberBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken === undefined)) << 3);
            const __gotots_binary_operand_154 = __gotots_binary_operand_152 | __gotots_binary_operand_153;
            const __gotots_binary_operand_155 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters === undefined)) << 4);
            const __gotots_binary_operand_156 = __gotots_binary_operand_154 | __gotots_binary_operand_155;
            const __gotots_binary_operand_157 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined)) << 5);
            const __gotots_binary_operand_158 = __gotots_binary_operand_156 | __gotots_binary_operand_157;
            const __gotots_binary_operand_159 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined)) << 6);
            const __gotots_binary_operand_160 = __gotots_binary_operand_158 | __gotots_binary_operand_159;
            const __gotots_binary_operand_161 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) << 7);
            return __gotots_binary_operand_160 | __gotots_binary_operand_161;
            break;
        }
        case KindPropertySignature$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast> | undefined = Node__from_ast.AsPropertySignatureDeclaration(node);
            const __gotots_store_18 = PropertySignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value);
            const __gotots_argument_36 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<NamedMemberBase__from_ast$Storage, NamedMemberBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NamedMemberBase"), NamedMemberBase__from_ast.$fromStorage, NamedMemberBase__from_ast.$storageOf));
            const __gotots_argument_37 = hasModifiers(__gotots_argument_36);
            const __gotots_binary_operand_162 = boolToByte(__gotots_argument_37);
            const __gotots_binary_operand_163 = 0;
            const __gotots_binary_operand_164 = (__gotots_binary_operand_162 << __gotots_binary_operand_163);
            const __gotots_binary_operand_165 = (boolToByte(!(PropertySignatureDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_166 = __gotots_binary_operand_164 | __gotots_binary_operand_165;
            const __gotots_binary_operand_167 = (boolToByte(!((void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                PropertySignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NamedMemberBase)).PostfixToken === undefined)) << 2);
            const __gotots_binary_operand_168 = __gotots_binary_operand_166 | __gotots_binary_operand_167;
            const __gotots_binary_operand_169 = (boolToByte(!(PropertySignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).Type === undefined)) << 3);
            const __gotots_binary_operand_170 = __gotots_binary_operand_168 | __gotots_binary_operand_169;
            const __gotots_binary_operand_171 = (boolToByte(!(PropertySignatureDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).Initializer === undefined)) << 4);
            return __gotots_binary_operand_170 | __gotots_binary_operand_171;
            break;
        }
        case KindPropertyDeclaration$constant__from_ast(): {
            let n: {
                value: PropertyDeclaration__from_ast;
            } | undefined = Node__from_ast.AsPropertyDeclaration(node);
            const __gotots_store_19 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_38 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NamedMemberBase"));
            const __gotots_argument_39 = hasModifiers(__gotots_argument_38);
            const __gotots_binary_operand_172 = boolToByte(__gotots_argument_39);
            const __gotots_binary_operand_173 = 0;
            const __gotots_binary_operand_174 = (__gotots_binary_operand_172 << __gotots_binary_operand_173);
            const __gotots_binary_operand_175 = (boolToByte(!(PropertyDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_176 = __gotots_binary_operand_174 | __gotots_binary_operand_175;
            const __gotots_binary_operand_177 = (boolToByte(!(NamedMemberBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken === undefined)) << 2);
            const __gotots_binary_operand_178 = __gotots_binary_operand_176 | __gotots_binary_operand_177;
            const __gotots_binary_operand_179 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 3);
            const __gotots_binary_operand_180 = __gotots_binary_operand_178 | __gotots_binary_operand_179;
            const __gotots_binary_operand_181 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) << 4);
            return __gotots_binary_operand_180 | __gotots_binary_operand_181;
            break;
        }
        case KindClassStaticBlockDeclaration$constant__from_ast(): {
            let n: {
                value: ClassStaticBlockDeclaration__from_ast;
            } | undefined = Node__from_ast.AsClassStaticBlockDeclaration(node);
            const __gotots_store_20 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_40 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "ModifiersBase"));
            const __gotots_argument_41 = hasModifiers(__gotots_argument_40);
            const __gotots_binary_operand_182 = boolToByte(__gotots_argument_41);
            const __gotots_binary_operand_183 = 0;
            const __gotots_binary_operand_184 = (__gotots_binary_operand_182 << __gotots_binary_operand_183);
            const __gotots_binary_operand_185 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body === undefined)) << 1);
            return __gotots_binary_operand_184 | __gotots_binary_operand_185;
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
            const __gotots_store_21 = BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value);
            const __gotots_argument_42 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_43 = hasModifiers(__gotots_argument_42);
            const __gotots_binary_operand_186 = boolToByte(__gotots_argument_43);
            const __gotots_binary_operand_187 = 0;
            const __gotots_binary_operand_188 = (__gotots_binary_operand_186 << __gotots_binary_operand_187);
            const __gotots_binary_operand_189 = (boolToByte(!(BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left === undefined)) << 1);
            const __gotots_binary_operand_190 = __gotots_binary_operand_188 | __gotots_binary_operand_189;
            const __gotots_binary_operand_191 = (boolToByte(!(BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Type === undefined)) << 2);
            const __gotots_binary_operand_192 = __gotots_binary_operand_190 | __gotots_binary_operand_191;
            const __gotots_binary_operand_193 = (boolToByte(!(BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken === undefined)) << 3);
            const __gotots_binary_operand_194 = __gotots_binary_operand_192 | __gotots_binary_operand_193;
            const __gotots_binary_operand_195 = (boolToByte(!(BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right === undefined)) << 4);
            return __gotots_binary_operand_194 | __gotots_binary_operand_195;
            break;
        }
        case KindPrefixUnaryExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined = Node__from_ast.AsPrefixUnaryExpression(node);
            return (boolToByte(!(PrefixUnaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand === undefined)) << 0);
            break;
        }
        case KindPostfixUnaryExpression$constant__from_ast(): {
            let n: {
                value: PostfixUnaryExpression__from_ast;
            } | undefined = Node__from_ast.AsPostfixUnaryExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand === undefined)) << 0);
            break;
        }
        case KindYieldExpression$constant__from_ast(): {
            let n: {
                value: YieldExpression__from_ast;
            } | undefined = Node__from_ast.AsYieldExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AsteriskToken === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 1);
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            let n: {
                value: ArrowFunction__from_ast;
            } | undefined = Node__from_ast.AsArrowFunction(node);
            const __gotots_store_22 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_44 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "ModifiersBase"));
            const __gotots_argument_45 = hasModifiers(__gotots_argument_44);
            const __gotots_binary_operand_196 = boolToByte(__gotots_argument_45);
            const __gotots_binary_operand_197 = 0;
            const __gotots_binary_operand_198 = (__gotots_binary_operand_196 << __gotots_binary_operand_197);
            const __gotots_binary_operand_199 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters === undefined)) << 1);
            const __gotots_binary_operand_200 = __gotots_binary_operand_198 | __gotots_binary_operand_199;
            const __gotots_binary_operand_201 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined)) << 2);
            const __gotots_binary_operand_202 = __gotots_binary_operand_200 | __gotots_binary_operand_201;
            const __gotots_binary_operand_203 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined)) << 3);
            const __gotots_binary_operand_204 = __gotots_binary_operand_202 | __gotots_binary_operand_203;
            const __gotots_binary_operand_205 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken === undefined)) << 4);
            const __gotots_binary_operand_206 = __gotots_binary_operand_204 | __gotots_binary_operand_205;
            const __gotots_binary_operand_207 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) << 5);
            return __gotots_binary_operand_206 | __gotots_binary_operand_207;
            break;
        }
        case KindFunctionExpression$constant__from_ast(): {
            let n: {
                value: FunctionExpression__from_ast;
            } | undefined = Node__from_ast.AsFunctionExpression(node);
            const __gotots_store_23 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_46 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "ModifiersBase"));
            const __gotots_argument_47 = hasModifiers(__gotots_argument_46);
            const __gotots_binary_operand_208 = boolToByte(__gotots_argument_47);
            const __gotots_binary_operand_209 = 0;
            const __gotots_binary_operand_210 = (__gotots_binary_operand_208 << __gotots_binary_operand_209);
            const __gotots_binary_operand_211 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken === undefined)) << 1);
            const __gotots_binary_operand_212 = __gotots_binary_operand_210 | __gotots_binary_operand_211;
            const __gotots_binary_operand_213 = (boolToByte(!(FunctionExpression__from_ast.Name(n) === undefined)) << 2);
            const __gotots_binary_operand_214 = __gotots_binary_operand_212 | __gotots_binary_operand_213;
            const __gotots_binary_operand_215 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters === undefined)) << 3);
            const __gotots_binary_operand_216 = __gotots_binary_operand_214 | __gotots_binary_operand_215;
            const __gotots_binary_operand_217 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined)) << 4);
            const __gotots_binary_operand_218 = __gotots_binary_operand_216 | __gotots_binary_operand_217;
            const __gotots_binary_operand_219 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined)) << 5);
            const __gotots_binary_operand_220 = __gotots_binary_operand_218 | __gotots_binary_operand_219;
            const __gotots_binary_operand_221 = (boolToByte(!((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body === undefined)) << 6);
            return __gotots_binary_operand_220 | __gotots_binary_operand_221;
            break;
        }
        case KindAsExpression$constant__from_ast(): {
            let n: {
                value: AsExpression__from_ast;
            } | undefined = Node__from_ast.AsAsExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 1);
            break;
        }
        case KindSatisfiesExpression$constant__from_ast(): {
            let n: {
                value: SatisfiesExpression__from_ast;
            } | undefined = Node__from_ast.AsSatisfiesExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 1);
            break;
        }
        case KindConditionalExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast> | undefined = Node__from_ast.AsConditionalExpression(node);
            return (boolToByte(!(ConditionalExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition === undefined)) << 0) | (boolToByte(!(ConditionalExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).QuestionToken === undefined)) << 1) | (boolToByte(!(ConditionalExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue === undefined)) << 2) | (boolToByte(!(ConditionalExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).ColonToken === undefined)) << 3) | (boolToByte(!(ConditionalExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse === undefined)) << 4);
            break;
        }
        case KindPropertyAccessExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(node);
            return (boolToByte(!(PropertyAccessExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression === undefined)) << 0) | (boolToByte(!(PropertyAccessExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).QuestionDotToken === undefined)) << 1) | (boolToByte(!(PropertyAccessExpression__from_ast.Name(n) === undefined)) << 2);
            break;
        }
        case KindElementAccessExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined = Node__from_ast.AsElementAccessExpression(node);
            return (boolToByte(!(ElementAccessExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression === undefined)) << 0) | (boolToByte(!(ElementAccessExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).QuestionDotToken === undefined)) << 1) | (boolToByte(!(ElementAccessExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression === undefined)) << 2);
            break;
        }
        case KindCallExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(node);
            return (boolToByte(!(CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression === undefined)) << 0) | (boolToByte(!(CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).QuestionDotToken === undefined)) << 1) | (boolToByte(!(CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).TypeArguments === undefined)) << 2) | (boolToByte(!(CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments === undefined)) << 3);
            break;
        }
        case KindNewExpression$constant__from_ast(): {
            let n: {
                value: NewExpression__from_ast;
            } | undefined = Node__from_ast.AsNewExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Arguments === undefined)) << 2);
            break;
        }
        case KindMetaProperty$constant__from_ast(): {
            let n: {
                value: MetaProperty__from_ast;
            } | undefined = Node__from_ast.AsMetaProperty(node);
            return (boolToByte(!(MetaProperty__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindNonNullExpression$constant__from_ast(): {
            let n: {
                value: NonNullExpression__from_ast;
            } | undefined = Node__from_ast.AsNonNullExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindSpreadElement$constant__from_ast(): {
            let n: {
                value: SpreadElement__from_ast;
            } | undefined = Node__from_ast.AsSpreadElement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindTemplateExpression$constant__from_ast(): {
            let n: {
                value: TemplateExpression__from_ast;
            } | undefined = Node__from_ast.AsTemplateExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans === undefined)) << 1);
            break;
        }
        case KindTemplateSpan$constant__from_ast(): {
            let n: {
                value: TemplateSpan__from_ast;
            } | undefined = Node__from_ast.AsTemplateSpan(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal === undefined)) << 1);
            break;
        }
        case KindTaggedTemplateExpression$constant__from_ast(): {
            let n: {
                value: TaggedTemplateExpression__from_ast;
            } | undefined = Node__from_ast.AsTaggedTemplateExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionDotToken === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template === undefined)) << 3);
            break;
        }
        case KindParenthesizedExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined = Node__from_ast.AsParenthesizedExpression(node);
            return (boolToByte(!(ParenthesizedExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression === undefined)) << 0);
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            let n: {
                value: ArrayLiteralExpression__from_ast;
            } | undefined = Node__from_ast.AsArrayLiteralExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements === undefined)) << 0);
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            let n: {
                value: ObjectLiteralExpression__from_ast;
            } | undefined = Node__from_ast.AsObjectLiteralExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties === undefined)) << 0);
            break;
        }
        case KindSpreadAssignment$constant__from_ast(): {
            let n: {
                value: SpreadAssignment__from_ast;
            } | undefined = Node__from_ast.AsSpreadAssignment(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindPropertyAssignment$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = Node__from_ast.AsPropertyAssignment(node);
            const __gotots_store_24 = PropertyAssignment__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value);
            const __gotots_argument_48 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<NamedMemberBase__from_ast$Storage, NamedMemberBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NamedMemberBase"), NamedMemberBase__from_ast.$fromStorage, NamedMemberBase__from_ast.$storageOf));
            const __gotots_argument_49 = hasModifiers(__gotots_argument_48);
            const __gotots_binary_operand_222 = boolToByte(__gotots_argument_49);
            const __gotots_binary_operand_223 = 0;
            const __gotots_binary_operand_224 = (__gotots_binary_operand_222 << __gotots_binary_operand_223);
            const __gotots_binary_operand_225 = (boolToByte(!(PropertyAssignment__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_226 = __gotots_binary_operand_224 | __gotots_binary_operand_225;
            const __gotots_binary_operand_227 = (boolToByte(!((void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                PropertyAssignment__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NamedMemberBase)).PostfixToken === undefined)) << 2);
            const __gotots_binary_operand_228 = __gotots_binary_operand_226 | __gotots_binary_operand_227;
            const __gotots_binary_operand_229 = (boolToByte(!(PropertyAssignment__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Type === undefined)) << 3);
            const __gotots_binary_operand_230 = __gotots_binary_operand_228 | __gotots_binary_operand_229;
            const __gotots_binary_operand_231 = (boolToByte(!(PropertyAssignment__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer === undefined)) << 4);
            return __gotots_binary_operand_230 | __gotots_binary_operand_231;
            break;
        }
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            let n: {
                value: ShorthandPropertyAssignment__from_ast;
            } | undefined = Node__from_ast.AsShorthandPropertyAssignment(node);
            const __gotots_store_25 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_50 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NamedMemberBase"));
            const __gotots_argument_51 = hasModifiers(__gotots_argument_50);
            const __gotots_binary_operand_232 = boolToByte(__gotots_argument_51);
            const __gotots_binary_operand_233 = 0;
            const __gotots_binary_operand_234 = (__gotots_binary_operand_232 << __gotots_binary_operand_233);
            const __gotots_binary_operand_235 = (boolToByte(!(ShorthandPropertyAssignment__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_236 = __gotots_binary_operand_234 | __gotots_binary_operand_235;
            const __gotots_binary_operand_237 = (boolToByte(!(NamedMemberBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken === undefined)) << 2);
            const __gotots_binary_operand_238 = __gotots_binary_operand_236 | __gotots_binary_operand_237;
            const __gotots_binary_operand_239 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 3);
            const __gotots_binary_operand_240 = __gotots_binary_operand_238 | __gotots_binary_operand_239;
            const __gotots_binary_operand_241 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken === undefined)) << 4);
            const __gotots_binary_operand_242 = __gotots_binary_operand_240 | __gotots_binary_operand_241;
            const __gotots_binary_operand_243 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer === undefined)) << 5);
            return __gotots_binary_operand_242 | __gotots_binary_operand_243;
            break;
        }
        case KindDeleteExpression$constant__from_ast(): {
            let n: {
                value: DeleteExpression__from_ast;
            } | undefined = Node__from_ast.AsDeleteExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindTypeOfExpression$constant__from_ast(): {
            let n: {
                value: TypeOfExpression__from_ast;
            } | undefined = Node__from_ast.AsTypeOfExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindVoidExpression$constant__from_ast(): {
            let n: {
                value: VoidExpression__from_ast;
            } | undefined = Node__from_ast.AsVoidExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindAwaitExpression$constant__from_ast(): {
            let n: {
                value: AwaitExpression__from_ast;
            } | undefined = Node__from_ast.AsAwaitExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindTypeAssertionExpression$constant__from_ast(): {
            let n: {
                value: TypeAssertion__from_ast;
            } | undefined = Node__from_ast.AsTypeAssertion(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 1);
            break;
        }
        case KindUnionType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast> | undefined = Node__from_ast.AsUnionTypeNode(node);
            return (boolToByte(!((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                UnionTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types === undefined)) << 0);
            break;
        }
        case KindIntersectionType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast> | undefined = Node__from_ast.AsIntersectionTypeNode(node);
            return (boolToByte(!((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                IntersectionTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types === undefined)) << 0);
            break;
        }
        case KindConditionalType$constant__from_ast(): {
            let n: {
                value: ConditionalTypeNode__from_ast;
            } | undefined = Node__from_ast.AsConditionalTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckType === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendsType === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FalseType === undefined)) << 3);
            break;
        }
        case KindTypeOperator$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast> | undefined = Node__from_ast.AsTypeOperatorNode(node);
            return (boolToByte(!(TypeOperatorNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Type === undefined)) << 0);
            break;
        }
        case KindInferType$constant__from_ast(): {
            let n: {
                value: InferTypeNode__from_ast;
            } | undefined = Node__from_ast.AsInferTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter === undefined)) << 0);
            break;
        }
        case KindArrayType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast> | undefined = Node__from_ast.AsArrayTypeNode(node);
            return (boolToByte(!(ArrayTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast>).value).ElementType === undefined)) << 0);
            break;
        }
        case KindIndexedAccessType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast> | undefined = Node__from_ast.AsIndexedAccessTypeNode(node);
            return (boolToByte(!(IndexedAccessTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType === undefined)) << 0) | (boolToByte(!(IndexedAccessTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).IndexType === undefined)) << 1);
            break;
        }
        case KindTypeReference$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined = Node__from_ast.AsTypeReferenceNode(node);
            return (boolToByte(!(TypeReferenceNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName === undefined)) << 0) | (boolToByte(!((void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                TypeReferenceNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments === undefined)) << 1);
            break;
        }
        case KindExpressionWithTypeArguments$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined = Node__from_ast.AsExpressionWithTypeArguments(node);
            return (boolToByte(!(ExpressionWithTypeArguments__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression === undefined)) << 0) | (boolToByte(!(ExpressionWithTypeArguments__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).TypeArguments === undefined)) << 1);
            break;
        }
        case KindLiteralType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast> | undefined = Node__from_ast.AsLiteralTypeNode(node);
            return (boolToByte(!(LiteralTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal === undefined)) << 0);
            break;
        }
        case KindTypePredicate$constant__from_ast(): {
            let n: {
                value: TypePredicateNode__from_ast;
            } | undefined = Node__from_ast.AsTypePredicateNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssertsModifier === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 2);
            break;
        }
        case KindImportAttribute$constant__from_ast(): {
            let n: {
                value: ImportAttribute__from_ast;
            } | undefined = Node__from_ast.AsImportAttribute(node);
            return (boolToByte(!(ImportAttribute__from_ast.Name(n) === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value === undefined)) << 1);
            break;
        }
        case KindImportAttributes$constant__from_ast(): {
            let n: {
                value: ImportAttributes__from_ast;
            } | undefined = Node__from_ast.AsImportAttributes(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 0);
            break;
        }
        case KindTypeQuery$constant__from_ast(): {
            let n: {
                value: TypeQueryNode__from_ast;
            } | undefined = Node__from_ast.AsTypeQueryNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName === undefined)) << 0) | (boolToByte(!(NodeWithTypeArgumentsBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments === undefined)) << 1);
            break;
        }
        case KindMappedType$constant__from_ast(): {
            let n: {
                value: MappedTypeNode__from_ast;
            } | undefined = Node__from_ast.AsMappedTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken === undefined)) << 3) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 4) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members === undefined)) << 5);
            break;
        }
        case KindTypeLiteral$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<TypeLiteralNode__from_ast> | undefined = Node__from_ast.AsTypeLiteralNode(node);
            return (boolToByte(!(TypeLiteralNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeLiteralNode__from_ast>).value).Members === undefined)) << 0);
            break;
        }
        case KindTupleType$constant__from_ast(): {
            let n: {
                value: TupleTypeNode__from_ast;
            } | undefined = Node__from_ast.AsTupleTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements === undefined)) << 0);
            break;
        }
        case KindNamedTupleMember$constant__from_ast(): {
            let n: {
                value: NamedTupleMember__from_ast;
            } | undefined = Node__from_ast.AsNamedTupleMember(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) << 0) | (boolToByte(!(NamedTupleMember__from_ast.Name(n) === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 3);
            break;
        }
        case KindOptionalType$constant__from_ast(): {
            let n: {
                value: OptionalTypeNode__from_ast;
            } | undefined = Node__from_ast.AsOptionalTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindRestType$constant__from_ast(): {
            let n: {
                value: RestTypeNode__from_ast;
            } | undefined = Node__from_ast.AsRestTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindParenthesizedType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode__from_ast> | undefined = Node__from_ast.AsParenthesizedTypeNode(node);
            return (boolToByte(!(ParenthesizedTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode__from_ast>).value).Type === undefined)) << 0);
            break;
        }
        case KindFunctionType$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast> | undefined = Node__from_ast.AsFunctionTypeNode(node);
            return (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                    FunctionTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).TypeParameters === undefined)) << 0) | (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                    FunctionTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).Parameters === undefined)) << 1) | (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                    FunctionTypeNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).Type === undefined)) << 2);
            break;
        }
        case KindConstructorType$constant__from_ast(): {
            let n: {
                value: ConstructorTypeNode__from_ast;
            } | undefined = Node__from_ast.AsConstructorTypeNode(node);
            const __gotots_store_26 = FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase);
            const __gotots_argument_52 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_53 = hasModifiers(__gotots_argument_52);
            const __gotots_binary_operand_244 = boolToByte(__gotots_argument_53);
            const __gotots_binary_operand_245 = 0;
            const __gotots_binary_operand_246 = (__gotots_binary_operand_244 << __gotots_binary_operand_245);
            const __gotots_binary_operand_247 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).TypeParameters === undefined)) << 1);
            const __gotots_binary_operand_248 = __gotots_binary_operand_246 | __gotots_binary_operand_247;
            const __gotots_binary_operand_249 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).Parameters === undefined)) << 2);
            const __gotots_binary_operand_250 = __gotots_binary_operand_248 | __gotots_binary_operand_249;
            const __gotots_binary_operand_251 = (boolToByte(!((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).Type === undefined)) << 3);
            return __gotots_binary_operand_250 | __gotots_binary_operand_251;
            break;
        }
        case KindTemplateLiteralType$constant__from_ast(): {
            let n: {
                value: TemplateLiteralTypeNode__from_ast;
            } | undefined = Node__from_ast.AsTemplateLiteralTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans === undefined)) << 1);
            break;
        }
        case KindTemplateLiteralTypeSpan$constant__from_ast(): {
            let n: {
                value: TemplateLiteralTypeSpan__from_ast;
            } | undefined = Node__from_ast.AsTemplateLiteralTypeSpan(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal === undefined)) << 1);
            break;
        }
        case KindSyntheticExpression$constant__from_ast(): {
            let n: {
                value: SyntheticExpression__from_ast;
            } | undefined = Node__from_ast.AsSyntheticExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TupleNameSource === undefined)) << 0);
            break;
        }
        case KindPartiallyEmittedExpression$constant__from_ast(): {
            let n: {
                value: PartiallyEmittedExpression__from_ast;
            } | undefined = Node__from_ast.AsPartiallyEmittedExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindJsxElement$constant__from_ast(): {
            let n: {
                value: JsxElement__from_ast;
            } | undefined = Node__from_ast.AsJsxElement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClosingElement === undefined)) << 2);
            break;
        }
        case KindJsxAttributes$constant__from_ast(): {
            let n: {
                value: JsxAttributes__from_ast;
            } | undefined = Node__from_ast.AsJsxAttributes(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties === undefined)) << 0);
            break;
        }
        case KindJsxNamespacedName$constant__from_ast(): {
            let n: {
                value: JsxNamespacedName__from_ast;
            } | undefined = Node__from_ast.AsJsxNamespacedName(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace === undefined)) << 0) | (boolToByte(!(JsxNamespacedName__from_ast.Name(n) === undefined)) << 1);
            break;
        }
        case KindJsxOpeningElement$constant__from_ast(): {
            let n: {
                value: JsxOpeningElement__from_ast;
            } | undefined = Node__from_ast.AsJsxOpeningElement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 2);
            break;
        }
        case KindJsxSelfClosingElement$constant__from_ast(): {
            let n: {
                value: JsxSelfClosingElement__from_ast;
            } | undefined = Node__from_ast.AsJsxSelfClosingElement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 2);
            break;
        }
        case KindJsxFragment$constant__from_ast(): {
            let n: {
                value: JsxFragment__from_ast;
            } | undefined = Node__from_ast.AsJsxFragment(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningFragment === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClosingFragment === undefined)) << 2);
            break;
        }
        case KindJsxAttribute$constant__from_ast(): {
            let n: {
                value: JsxAttribute__from_ast;
            } | undefined = Node__from_ast.AsJsxAttribute(node);
            return (boolToByte(!(JsxAttribute__from_ast.Name(n) === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) << 1);
            break;
        }
        case KindJsxSpreadAttribute$constant__from_ast(): {
            let n: {
                value: JsxSpreadAttribute__from_ast;
            } | undefined = Node__from_ast.AsJsxSpreadAttribute(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0);
            break;
        }
        case KindJsxClosingElement$constant__from_ast(): {
            let n: {
                value: JsxClosingElement__from_ast;
            } | undefined = Node__from_ast.AsJsxClosingElement(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName === undefined)) << 0);
            break;
        }
        case KindJsxExpression$constant__from_ast(): {
            let n: {
                value: JsxExpression__from_ast;
            } | undefined = Node__from_ast.AsJsxExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 1);
            break;
        }
        case KindSyntaxList$constant__from_ast(): {
            let n: {
                value: SyntaxList__from_ast;
            } | undefined = Node__from_ast.AsSyntaxList(node);
            return (boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children.length > 0) << 0);
            break;
        }
        case KindJSDoc$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<JSDoc__from_ast> | undefined = Node__from_ast.AsJSDoc(node);
            return (boolToByte(!(JSDoc__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Comment === undefined)) << 0) | (boolToByte(!(JSDoc__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags === undefined)) << 1);
            break;
        }
        case KindJSDocTypeExpression$constant__from_ast(): {
            let n: {
                value: JSDocTypeExpression__from_ast;
            } | undefined = Node__from_ast.AsJSDocTypeExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindJSDocNonNullableType$constant__from_ast(): {
            let n: {
                value: JSDocNonNullableType__from_ast;
            } | undefined = Node__from_ast.AsJSDocNonNullableType(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindJSDocNullableType$constant__from_ast(): {
            let n: {
                value: JSDocNullableType__from_ast;
            } | undefined = Node__from_ast.AsJSDocNullableType(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindJSDocVariadicType$constant__from_ast(): {
            let n: {
                value: JSDocVariadicType__from_ast;
            } | undefined = Node__from_ast.AsJSDocVariadicType(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindJSDocOptionalType$constant__from_ast(): {
            let n: {
                value: JSDocOptionalType__from_ast;
            } | undefined = Node__from_ast.AsJSDocOptionalType(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) << 0);
            break;
        }
        case KindJSDocTypeTag$constant__from_ast(): {
            let n: {
                value: JSDocTypeTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocTypeTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocUnknownTag$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<JSDocUnknownTag__from_ast> | undefined = Node__from_ast.AsJSDocUnknownTag(node);
            return (boolToByte(!((void JSDocTagBase__from_ast.$storageOf, (void JSDocTagBase__from_ast.$fromStorage,
                JSDocUnknownTag__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocUnknownTag__from_ast>).value).JSDocTagBase)).TagName === undefined)) << 0) | (boolToByte(!((void JSDocTagBase__from_ast.$storageOf, (void JSDocTagBase__from_ast.$fromStorage,
                JSDocUnknownTag__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocUnknownTag__from_ast>).value).JSDocTagBase)).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocTemplateTag$constant__from_ast(): {
            let n: {
                value: JSDocTemplateTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocTemplateTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Constraint === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameters === undefined)) << 2) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 3);
            break;
        }
        case KindJSDocReturnTag$constant__from_ast(): {
            let n: {
                value: JSDocReturnTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocReturnTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocPublicTag$constant__from_ast(): {
            let n: {
                value: JSDocPublicTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocPublicTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocPrivateTag$constant__from_ast(): {
            let n: {
                value: JSDocPrivateTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocPrivateTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocProtectedTag$constant__from_ast(): {
            let n: {
                value: JSDocProtectedTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocProtectedTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocReadonlyTag$constant__from_ast(): {
            let n: {
                value: JSDocReadonlyTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocReadonlyTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocOverrideTag$constant__from_ast(): {
            let n: {
                value: JSDocOverrideTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocOverrideTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocDeprecatedTag$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag__from_ast> | undefined = Node__from_ast.AsJSDocDeprecatedTag(node);
            return (boolToByte(!((void JSDocTagBase__from_ast.$storageOf, (void JSDocTagBase__from_ast.$fromStorage,
                JSDocDeprecatedTag__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag__from_ast>).value).JSDocTagBase)).TagName === undefined)) << 0) | (boolToByte(!((void JSDocTagBase__from_ast.$storageOf, (void JSDocTagBase__from_ast.$fromStorage,
                JSDocDeprecatedTag__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag__from_ast>).value).JSDocTagBase)).Comment === undefined)) << 1);
            break;
        }
        case KindJSDocSeeTag$constant__from_ast(): {
            let n: {
                value: JSDocSeeTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocSeeTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocImplementsTag$constant__from_ast(): {
            let n: {
                value: JSDocImplementsTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocImplementsTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassName === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocAugmentsTag$constant__from_ast(): {
            let n: {
                value: JSDocAugmentsTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocAugmentsTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassName === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocSatisfiesTag$constant__from_ast(): {
            let n: {
                value: JSDocSatisfiesTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocSatisfiesTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocThrowsTag$constant__from_ast(): {
            let n: {
                value: JSDocThrowsTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocThrowsTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocThisTag$constant__from_ast(): {
            let n: {
                value: JSDocThisTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocThisTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocImportTag$constant__from_ast(): {
            let n: {
                value: JSDocImportTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocImportTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined)) << 2) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 3) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 4);
            break;
        }
        case KindJSDocCallbackTag$constant__from_ast(): {
            let n: {
                value: JSDocCallbackTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocCallbackTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocCallbackTag__from_ast.Name(n) === undefined)) << 2) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 3);
            break;
        }
        case KindJSDocOverloadTag$constant__from_ast(): {
            let n: {
                value: JSDocOverloadTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocOverloadTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 2);
            break;
        }
        case KindJSDocTypedefTag$constant__from_ast(): {
            let n: {
                value: JSDocTypedefTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocTypedefTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 1) | (boolToByte(!(JSDocTypedefTag__from_ast.Name(n) === undefined)) << 2) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 3);
            break;
        }
        case KindJSDocSignature$constant__from_ast(): {
            let n: {
                value: JSDocSignature__from_ast;
            } | undefined = Node__from_ast.AsJSDocSignature(node);
            return (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).TypeParameters === undefined)) << 0) | (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters === undefined)) << 1) | (boolToByte(!(FunctionLikeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Type === undefined)) << 2);
            break;
        }
        case KindJSDocNameReference$constant__from_ast(): {
            let n: {
                value: JSDocNameReference__from_ast;
            } | undefined = Node__from_ast.AsJSDocNameReference(node);
            return (boolToByte(!(JSDocNameReference__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            let n: {
                value: ModuleDeclaration__from_ast;
            } | undefined = Node__from_ast.AsModuleDeclaration(node);
            const __gotots_store_27 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_54 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "ModifiersBase"));
            const __gotots_argument_55 = hasModifiers(__gotots_argument_54);
            const __gotots_binary_operand_252 = boolToByte(__gotots_argument_55);
            const __gotots_binary_operand_253 = 0;
            const __gotots_binary_operand_254 = (__gotots_binary_operand_252 << __gotots_binary_operand_253);
            const __gotots_binary_operand_255 = (boolToByte(!(ModuleDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_256 = __gotots_binary_operand_254 | __gotots_binary_operand_255;
            const __gotots_binary_operand_257 = (boolToByte(!(BodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body === undefined)) << 2);
            return __gotots_binary_operand_256 | __gotots_binary_operand_257;
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            let n: {
                value: ImportEqualsDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportEqualsDeclaration(node);
            const __gotots_store_28 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_56 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "ModifiersBase"));
            const __gotots_argument_57 = hasModifiers(__gotots_argument_56);
            const __gotots_binary_operand_258 = boolToByte(__gotots_argument_57);
            const __gotots_binary_operand_259 = 0;
            const __gotots_binary_operand_260 = (__gotots_binary_operand_258 << __gotots_binary_operand_259);
            const __gotots_binary_operand_261 = (boolToByte(!(ImportEqualsDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_262 = __gotots_binary_operand_260 | __gotots_binary_operand_261;
            const __gotots_binary_operand_263 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference === undefined)) << 2);
            return __gotots_binary_operand_262 | __gotots_binary_operand_263;
            break;
        }
        case KindExportDeclaration$constant__from_ast(): {
            let n: {
                value: ExportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsExportDeclaration(node);
            const __gotots_store_29 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_58 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "ModifiersBase"));
            const __gotots_argument_59 = hasModifiers(__gotots_argument_58);
            const __gotots_binary_operand_264 = boolToByte(__gotots_argument_59);
            const __gotots_binary_operand_265 = 0;
            const __gotots_binary_operand_266 = (__gotots_binary_operand_264 << __gotots_binary_operand_265);
            const __gotots_binary_operand_267 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined)) << 1);
            const __gotots_binary_operand_268 = __gotots_binary_operand_266 | __gotots_binary_operand_267;
            const __gotots_binary_operand_269 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined)) << 2);
            const __gotots_binary_operand_270 = __gotots_binary_operand_268 | __gotots_binary_operand_269;
            const __gotots_binary_operand_271 = (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 3);
            return __gotots_binary_operand_270 | __gotots_binary_operand_271;
            break;
        }
        case KindImportType$constant__from_ast(): {
            let n: {
                value: ImportTypeNode__from_ast;
            } | undefined = Node__from_ast.AsImportTypeNode(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier === undefined)) << 2) | (boolToByte(!(NodeWithTypeArgumentsBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments === undefined)) << 3);
            break;
        }
        case KindImportClause$constant__from_ast(): {
            let n: {
                value: ImportClause__from_ast;
            } | undefined = Node__from_ast.AsImportClause(node);
            return (boolToByte(!(ImportClause__from_ast.Name(n) === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined)) << 1);
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(node);
            return (boolToByte(!(ImportSpecifier__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).PropertyName === undefined)) << 0) | (boolToByte(!(ImportSpecifier__from_ast.Name(n) === undefined)) << 1);
            break;
        }
        case KindJSDocLink$constant__from_ast(): {
            let n: {
                value: JSDocLink__from_ast;
            } | undefined = Node__from_ast.AsJSDocLink(node);
            return (boolToByte(!(JSDocLink__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindJSDocLinkPlain$constant__from_ast(): {
            let n: {
                value: JSDocLinkPlain__from_ast;
            } | undefined = Node__from_ast.AsJSDocLinkPlain(node);
            return (boolToByte(!(JSDocLinkPlain__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindJSDocLinkCode$constant__from_ast(): {
            let n: {
                value: JSDocLinkCode__from_ast;
            } | undefined = Node__from_ast.AsJSDocLinkCode(node);
            return (boolToByte(!(JSDocLinkCode__from_ast.Name(n) === undefined)) << 0);
            break;
        }
        case KindTypeParameter$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined = Node__from_ast.AsTypeParameterDeclaration(node);
            const __gotots_store_30 = TypeParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value);
            const __gotots_argument_60 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_61 = hasModifiers(__gotots_argument_60);
            const __gotots_binary_operand_272 = boolToByte(__gotots_argument_61);
            const __gotots_binary_operand_273 = 0;
            const __gotots_binary_operand_274 = (__gotots_binary_operand_272 << __gotots_binary_operand_273);
            const __gotots_binary_operand_275 = (boolToByte(!(TypeParameterDeclaration__from_ast.Name(n) === undefined)) << 1);
            const __gotots_binary_operand_276 = __gotots_binary_operand_274 | __gotots_binary_operand_275;
            const __gotots_binary_operand_277 = (boolToByte(!(TypeParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint === undefined)) << 2);
            const __gotots_binary_operand_278 = __gotots_binary_operand_276 | __gotots_binary_operand_277;
            const __gotots_binary_operand_279 = (boolToByte(!(TypeParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Expression === undefined)) << 3);
            const __gotots_binary_operand_280 = __gotots_binary_operand_278 | __gotots_binary_operand_279;
            const __gotots_binary_operand_281 = (boolToByte(!(TypeParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType === undefined)) << 4);
            return __gotots_binary_operand_280 | __gotots_binary_operand_281;
            break;
        }
        case KindSyntheticReferenceExpression$constant__from_ast(): {
            let n: {
                value: SyntheticReferenceExpression__from_ast;
            } | undefined = Node__from_ast.AsSyntheticReferenceExpression(node);
            return (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) << 0) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ThisArg === undefined)) << 1);
            break;
        }
        case KindJSDocTypeLiteral$constant__from_ast(): {
            let n: {
                value: JSDocTypeLiteral__from_ast;
            } | undefined = Node__from_ast.AsJSDocTypeLiteral(node);
            return (boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocPropertyTags.length > 0) << 0);
            break;
        }
        case KindJSDocParameterTag$constant__from_ast():
        case KindJSDocPropertyTag$constant__from_ast(): {
            let n: {
                value: JSDocParameterOrPropertyTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocParameterOrPropertyTag(node);
            return (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName === undefined)) << 0) | (boolToByte(!(JSDocParameterOrPropertyTag__from_ast.Name(n) === undefined)) << 1) | (boolToByte(!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression === undefined)) << 2) | (boolToByte(!(JSDocTagBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).Comment === undefined)) << 3);
            break;
        }
        default: {
            return 0;
            break;
        }
    }
}
export function getNodeCommonData(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): uint32 {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBlock$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock(node);
            return boolToByte(Block__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine) << 24 >>> 0;
            break;
        }
        case KindHeritageClause$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined = Node__from_ast.AsHeritageClause(node);
            let tokenIdx = 0;
            switch (HeritageClause__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token) {
                case KindImplementsKeyword$constant__from_ast(): {
                    tokenIdx = 1;
                    break;
                }
            }
            return tokenIdx << 24 >>> 0;
            break;
        }
        case KindExportAssignment$constant__from_ast(): {
            let n: {
                value: ExportAssignment__from_ast;
            } | undefined = Node__from_ast.AsExportAssignment(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) << 24 >>> 0;
            break;
        }
        case KindExportSpecifier$constant__from_ast(): {
            let n: {
                value: ExportSpecifier__from_ast;
            } | undefined = Node__from_ast.AsExportSpecifier(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) << 24 >>> 0;
            break;
        }
        case KindPrefixUnaryExpression$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined = Node__from_ast.AsPrefixUnaryExpression(node);
            let operatorIdx = 0;
            switch (PrefixUnaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator) {
                case KindMinusToken$constant__from_ast(): {
                    operatorIdx = 1;
                    break;
                }
                case KindTildeToken$constant__from_ast(): {
                    operatorIdx = 2;
                    break;
                }
                case KindExclamationToken$constant__from_ast(): {
                    operatorIdx = 3;
                    break;
                }
                case KindPlusPlusToken$constant__from_ast(): {
                    operatorIdx = 4;
                    break;
                }
                case KindMinusMinusToken$constant__from_ast(): {
                    operatorIdx = 5;
                    break;
                }
            }
            return operatorIdx << 24 >>> 0;
            break;
        }
        case KindPostfixUnaryExpression$constant__from_ast(): {
            let n: {
                value: PostfixUnaryExpression__from_ast;
            } | undefined = Node__from_ast.AsPostfixUnaryExpression(node);
            let operatorIdx = 0;
            switch ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator) {
                case KindMinusMinusToken$constant__from_ast(): {
                    operatorIdx = 1;
                    break;
                }
            }
            return operatorIdx << 24 >>> 0;
            break;
        }
        case KindMetaProperty$constant__from_ast(): {
            let n: {
                value: MetaProperty__from_ast;
            } | undefined = Node__from_ast.AsMetaProperty(node);
            let keywordTokenIdx = 0;
            switch ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.KeywordToken) {
                case KindNewKeyword$constant__from_ast(): {
                    keywordTokenIdx = 1;
                    break;
                }
            }
            return keywordTokenIdx << 24 >>> 0;
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            let n: {
                value: ArrayLiteralExpression__from_ast;
            } | undefined = Node__from_ast.AsArrayLiteralExpression(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine) << 24 >>> 0;
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            let n: {
                value: ObjectLiteralExpression__from_ast;
            } | undefined = Node__from_ast.AsObjectLiteralExpression(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine) << 24 >>> 0;
            break;
        }
        case KindTypeOperator$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast> | undefined = Node__from_ast.AsTypeOperatorNode(node);
            let operatorIdx = 0;
            switch (TypeOperatorNode__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator) {
                case KindReadonlyKeyword$constant__from_ast(): {
                    operatorIdx = 1;
                    break;
                }
                case KindUniqueKeyword$constant__from_ast(): {
                    operatorIdx = 2;
                    break;
                }
            }
            return operatorIdx << 24 >>> 0;
            break;
        }
        case KindImportAttributes$constant__from_ast(): {
            let n: {
                value: ImportAttributes__from_ast;
            } | undefined = Node__from_ast.AsImportAttributes(node);
            let tokenIdx = 0;
            switch ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Token) {
                case KindAssertKeyword$constant__from_ast(): {
                    tokenIdx = 1;
                    break;
                }
            }
            return (boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MultiLine) << 24 >>> 0 | tokenIdx << 25 >>> 0) >>> 0;
            break;
        }
        case KindSyntheticExpression$constant__from_ast(): {
            return getNodeCommonData_SyntheticExpression(node);
            break;
        }
        case KindJsxText$constant__from_ast(): {
            let n: {
                value: JsxText__from_ast;
            } | undefined = Node__from_ast.AsJsxText(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ContainsOnlyTriviaWhiteSpaces) << 24 >>> 0;
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            let n: {
                value: ModuleDeclaration__from_ast;
            } | undefined = Node__from_ast.AsModuleDeclaration(node);
            let keywordIdx = 0;
            switch ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Keyword) {
                case KindNamespaceKeyword$constant__from_ast(): {
                    keywordIdx = 1;
                    break;
                }
            }
            return keywordIdx << 24 >>> 0;
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            let n: {
                value: ImportEqualsDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportEqualsDeclaration(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) << 24 >>> 0;
            break;
        }
        case KindExportDeclaration$constant__from_ast(): {
            let n: {
                value: ExportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsExportDeclaration(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) << 24 >>> 0;
            break;
        }
        case KindImportType$constant__from_ast(): {
            let n: {
                value: ImportTypeNode__from_ast;
            } | undefined = Node__from_ast.AsImportTypeNode(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf) << 24 >>> 0;
            break;
        }
        case KindImportClause$constant__from_ast(): {
            let n: {
                value: ImportClause__from_ast;
            } | undefined = Node__from_ast.AsImportClause(node);
            let phaseModifierIdx = 0;
            switch ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier) {
                case KindTypeKeyword$constant__from_ast(): {
                    phaseModifierIdx = 1;
                    break;
                }
                case KindDeferKeyword$constant__from_ast(): {
                    phaseModifierIdx = 2;
                    break;
                }
            }
            return phaseModifierIdx << 24 >>> 0;
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            let n: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(node);
            return boolToByte(ImportSpecifier__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).IsTypeOnly) << 24 >>> 0;
            break;
        }
        case KindJSDocTypeLiteral$constant__from_ast(): {
            let n: {
                value: JSDocTypeLiteral__from_ast;
            } | undefined = Node__from_ast.AsJSDocTypeLiteral(node);
            return boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsArrayType) << 24 >>> 0;
            break;
        }
        case KindJSDocParameterTag$constant__from_ast():
        case KindJSDocPropertyTag$constant__from_ast(): {
            let n: {
                value: JSDocParameterOrPropertyTag__from_ast;
            } | undefined = Node__from_ast.AsJSDocParameterOrPropertyTag(node);
            return (boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsBracketed) << 24 >>> 0 | boolToByte((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsNameFirst) << 25 >>> 0) >>> 0;
            break;
        }
    }
    return 0;
}
export function recordNodeStrings(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined): uint32 {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast(): {
            return stringTable.$go$private$encoder$add(strs, Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
            break;
        }
        case KindPrivateIdentifier$constant__from_ast(): {
            return stringTable.$go$private$encoder$add(strs, (Node__from_ast.AsPrivateIdentifier(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
            break;
        }
        case KindJsxText$constant__from_ast(): {
            return stringTable.$go$private$encoder$add(strs, LiteralLikeNodeBase__from_ast.$storageOf((Node__from_ast.AsJsxText(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralLikeNodeBase).Text, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.Pos(node), Node__from_ast.End(node));
            break;
        }
        case KindJSDocText$constant__from_ast(): {
            const __gotots_receiver_0 = strs;
            const __gotots_store_31 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void JSDocCommentBase__from_ast.$storageOf, (void JSDocCommentBase__from_ast.$fromStorage,
                        JSDocText__from_ast.$storageOf(((Node__from_ast.AsJSDocText(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDocText__from_ast>).value).JSDocCommentBase)).NodeBase)).NodeDefault));
            const __gotots_argument_62 = Node__from_ast.Text(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
            const __gotots_argument_63 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            const __gotots_argument_64 = Node__from_ast.Pos(node);
            const __gotots_argument_65 = Node__from_ast.End(node);
            return stringTable.$go$private$encoder$add(__gotots_receiver_0, __gotots_argument_62, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
            break;
        }
        case KindJSDocLink$constant__from_ast(): {
            const __gotots_receiver_1 = strs;
            const __gotots_store_32 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    JSDocCommentBase__from_ast.$storageOf((Node__from_ast.AsJSDocLink(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocCommentBase).NodeBase)).NodeDefault));
            const __gotots_argument_66 = Node__from_ast.Text(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
            const __gotots_argument_67 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            const __gotots_argument_68 = Node__from_ast.Pos(node);
            const __gotots_argument_69 = Node__from_ast.End(node);
            return stringTable.$go$private$encoder$add(__gotots_receiver_1, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69);
            break;
        }
        case KindJSDocLinkPlain$constant__from_ast(): {
            const __gotots_receiver_2 = strs;
            const __gotots_store_33 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    JSDocCommentBase__from_ast.$storageOf((Node__from_ast.AsJSDocLinkPlain(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocCommentBase).NodeBase)).NodeDefault));
            const __gotots_argument_70 = Node__from_ast.Text(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
            const __gotots_argument_71 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            const __gotots_argument_72 = Node__from_ast.Pos(node);
            const __gotots_argument_73 = Node__from_ast.End(node);
            return stringTable.$go$private$encoder$add(__gotots_receiver_2, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72, __gotots_argument_73);
            break;
        }
        case KindJSDocLinkCode$constant__from_ast(): {
            const __gotots_receiver_3 = strs;
            const __gotots_store_34 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    JSDocCommentBase__from_ast.$storageOf((Node__from_ast.AsJSDocLinkCode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocCommentBase).NodeBase)).NodeDefault));
            const __gotots_argument_74 = Node__from_ast.Text(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
            const __gotots_argument_75 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            const __gotots_argument_76 = Node__from_ast.Pos(node);
            const __gotots_argument_77 = Node__from_ast.End(node);
            return stringTable.$go$private$encoder$add(__gotots_receiver_3, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
            break;
        }
        default: {
            const __gotots_argument_78 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unexpected node kind %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)])));
            GoPanic.raise(__gotots_argument_78 === undefined ? GoPanicNilValue.create() : __gotots_argument_78);
            break;
        }
    }
}
export function recordExtendedData(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, strs: stringTable | undefined, positionMap: {
    value: PositionMap__from_ast;
} | undefined, extendedData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined, structuredData: tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>> | undefined): uint32 {
    let offset = ((extendedData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<uint8>>).value.length >>> 0;
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindStringLiteral$constant__from_ast(): {
            recordExtendedData_StringLiteral(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindNumericLiteral$constant__from_ast(): {
            recordExtendedData_NumericLiteral(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindBigIntLiteral$constant__from_ast(): {
            recordExtendedData_BigIntLiteral(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindRegularExpressionLiteral$constant__from_ast(): {
            recordExtendedData_RegularExpressionLiteral(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
            recordExtendedData_NoSubstitutionTemplateLiteral(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindTemplateHead$constant__from_ast(): {
            recordExtendedData_TemplateHead(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindTemplateMiddle$constant__from_ast(): {
            recordExtendedData_TemplateMiddle(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindTemplateTail$constant__from_ast(): {
            recordExtendedData_TemplateTail(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        case KindSourceFile$constant__from_ast(): {
            recordExtendedData_SourceFile(node, strs, positionMap, extendedData, structuredData);
            break;
        }
        default: {
            const __gotots_argument_79 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("unknown extended data node kind %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)])));
            GoPanic.raise(__gotots_argument_79 === undefined ? GoPanicNilValue.create() : __gotots_argument_79);
            break;
        }
    }
    return offset;
}
