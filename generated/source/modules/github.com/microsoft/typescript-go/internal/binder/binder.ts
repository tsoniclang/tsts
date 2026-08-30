import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CaseBlock as CaseBlock__from_ast, CaseOrDefaultClause as CaseOrDefaultClause__from_ast, CatchClause as CatchClause__from_ast, ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast, ConditionalTypeNode as ConditionalTypeNode__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, DeleteExpression as DeleteExpression__from_ast, DoStatement as DoStatement__from_ast, ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, FlowFlags as FlowFlags__from_ast, FlowList$Storage as FlowList__from_ast$Storage, FlowNode$Storage as FlowNode__from_ast$Storage, ForInOrOfStatement as ForInOrOfStatement__from_ast, ForStatement as ForStatement__from_ast, LabeledStatement as LabeledStatement__from_ast, MetaProperty as MetaProperty__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, ModuleInstanceState as ModuleInstanceState__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeFlags as NodeFlags__from_ast, PostfixUnaryExpression as PostfixUnaryExpression__from_ast, QualifiedName as QualifiedName__from_ast, SwitchStatement as SwitchStatement__from_ast, SymbolFlags as SymbolFlags__from_ast, Symbol$Storage as Symbol__from_ast$Storage, TryStatement as TryStatement__from_ast, WhileStatement as WhileStatement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BinaryExpression as BinaryExpression__from_ast, BindingElement as BindingElement__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, ConditionalExpression as ConditionalExpression__from_ast, DeclarationBase as DeclarationBase__from_ast, Diagnostic as Diagnostic__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExportSpecifier as ExportSpecifier__from_ast, ExportableBase as ExportableBase__from_ast, ExpressionIsAlias as ExpressionIsAlias__from_ast, ExpressionStatement as ExpressionStatement__from_ast, FindAncestor as FindAncestor__from_ast, FlowFlagsArrayMutation$constant as FlowFlagsArrayMutation$constant__from_ast, FlowFlagsAssignment$constant as FlowFlagsAssignment$constant__from_ast, FlowFlagsBranchLabel$constant as FlowFlagsBranchLabel$constant__from_ast, FlowFlagsCall$constant as FlowFlagsCall$constant__from_ast, FlowFlagsFalseCondition$constant as FlowFlagsFalseCondition$constant__from_ast, FlowFlagsLoopLabel$constant as FlowFlagsLoopLabel$constant__from_ast, FlowFlagsReduceLabel$constant as FlowFlagsReduceLabel$constant__from_ast, FlowFlagsReferenced$constant as FlowFlagsReferenced$constant__from_ast, FlowFlagsShared$constant as FlowFlagsShared$constant__from_ast, FlowFlagsStart$constant as FlowFlagsStart$constant__from_ast, FlowFlagsSwitchClause$constant as FlowFlagsSwitchClause$constant__from_ast, FlowFlagsTrueCondition$constant as FlowFlagsTrueCondition$constant__from_ast, FlowFlagsUnreachable$constant as FlowFlagsUnreachable$constant__from_ast, FlowList as FlowList__from_ast, FlowNodeBase as FlowNodeBase__from_ast, FlowNode as FlowNode__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, GetContainingClass as GetContainingClass__from_ast, GetElementOrPropertyAccessName as GetElementOrPropertyAccessName__from_ast, GetExports as GetExports__from_ast, GetImmediatelyInvokedFunctionExpression as GetImmediatelyInvokedFunctionExpression__from_ast, GetLocals as GetLocals__from_ast, GetMembers as GetMembers__from_ast, GetModuleInstanceState as GetModuleInstanceState__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSymbolId as GetSymbolId__from_ast, GetSymbolTable as GetSymbolTable__from_ast, HasDynamicName as HasDynamicName__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, Identifier as Identifier__from_ast, IfStatement as IfStatement__from_ast, ImportClause as ImportClause__from_ast, InternalSymbolNameAssignmentDeclaration$string as InternalSymbolNameAssignmentDeclaration$string__from_ast, InternalSymbolNameCall$string as InternalSymbolNameCall$string__from_ast, InternalSymbolNameClass$string as InternalSymbolNameClass$string__from_ast, InternalSymbolNameComputed$string as InternalSymbolNameComputed$string__from_ast, InternalSymbolNameConstructor$string as InternalSymbolNameConstructor$string__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, InternalSymbolNameExportStar$string as InternalSymbolNameExportStar$string__from_ast, InternalSymbolNameFunction$string as InternalSymbolNameFunction$string__from_ast, InternalSymbolNameGlobal$string as InternalSymbolNameGlobal$string__from_ast, InternalSymbolNameIndex$string as InternalSymbolNameIndex$string__from_ast, InternalSymbolNameJSXAttributes$string as InternalSymbolNameJSXAttributes$string__from_ast, InternalSymbolNameMissing$string as InternalSymbolNameMissing$string__from_ast, InternalSymbolNameNew$string as InternalSymbolNameNew$string__from_ast, InternalSymbolNameObject$string as InternalSymbolNameObject$string__from_ast, InternalSymbolNameType$string as InternalSymbolNameType$string__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsAssignmentOperator as IsAssignmentOperator__from_ast, IsAssignmentTarget as IsAssignmentTarget__from_ast, IsAsyncFunction as IsAsyncFunction__from_ast, IsAutoAccessorPropertyDeclaration as IsAutoAccessorPropertyDeclaration__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlockOrCatchScoped as IsBlockOrCatchScoped__from_ast, IsBooleanLiteral as IsBooleanLiteral__from_ast, IsCallExpression as IsCallExpression__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConditionalTypeNode as IsConditionalTypeNode__from_ast, IsDeclarationStatement as IsDeclarationStatement__from_ast, IsDestructuringAssignment as IsDestructuringAssignment__from_ast, IsDottedName as IsDottedName__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsEnumConst as IsEnumConst__from_ast, IsExpandoInitializer as IsExpandoInitializer__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExportSpecifier as IsExportSpecifier__from_ast, IsExpressionOfOptionalChainRoot as IsExpressionOfOptionalChainRoot__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsExternalModule as IsExternalModule__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsForInOrOfStatement as IsForInOrOfStatement__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGlobalScopeAugmentation as IsGlobalScopeAugmentation__from_ast, IsIdentifierName as IsIdentifierName__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImplicitlyExportedJSDocDeclaration as IsImplicitlyExportedJSDocDeclaration__from_ast, IsInJSFile as IsInJSFile__from_ast, IsInTopLevelContext as IsInTopLevelContext__from_ast, IsJSTypeAliasDeclaration as IsJSTypeAliasDeclaration__from_ast, IsJsonSourceFile as IsJsonSourceFile__from_ast, IsJsxNamespacedName as IsJsxNamespacedName__from_ast, IsLeftHandSideExpression as IsLeftHandSideExpression__from_ast, IsLocalsContainer as IsLocalsContainer__from_ast, IsLogicalExpression as IsLogicalExpression__from_ast, IsLogicalOrCoalescingAssignmentExpression as IsLogicalOrCoalescingAssignmentExpression__from_ast, IsLogicalOrCoalescingAssignmentOperator as IsLogicalOrCoalescingAssignmentOperator__from_ast, IsLogicalOrCoalescingBinaryOperator as IsLogicalOrCoalescingBinaryOperator__from_ast, IsModuleAugmentationExternal as IsModuleAugmentationExternal__from_ast, IsModuleBlock as IsModuleBlock__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsNamespaceExport as IsNamespaceExport__from_ast, IsNullishCoalesce as IsNullishCoalesce__from_ast, IsObjectLiteralMethod as IsObjectLiteralMethod__from_ast, IsObjectLiteralOrClassExpressionMethodOrAccessor as IsObjectLiteralOrClassExpressionMethodOrAccessor__from_ast, IsOptionalChainRoot as IsOptionalChainRoot__from_ast, IsOptionalChain as IsOptionalChain__from_ast, IsOutermostOptionalChain as IsOutermostOptionalChain__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPartOfParameterDeclaration as IsPartOfParameterDeclaration__from_ast, IsPartOfTypeQuery as IsPartOfTypeQuery__from_ast, IsPotentiallyExecutableNode as IsPotentiallyExecutableNode__from_ast, IsPrefixUnaryExpression as IsPrefixUnaryExpression__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyNameLiteral as IsPropertyNameLiteral__from_ast, IsPushOrUnshiftIdentifier as IsPushOrUnshiftIdentifier__from_ast, IsRequireCall as IsRequireCall__from_ast, IsSignedNumericLiteral as IsSignedNumericLiteral__from_ast, IsSourceFile as IsSourceFile__from_ast, IsStatic as IsStatic__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsStringOrNumericLiteralLike as IsStringOrNumericLiteralLike__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeOfExpression as IsTypeOfExpression__from_ast, IsVariableDeclarationInitializedToRequire as IsVariableDeclarationInitializedToRequire__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KeywordExpression as KeywordExpression__from_ast, KindAmpersandAmpersandEqualsToken$constant as KindAmpersandAmpersandEqualsToken$constant__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAwaitKeyword$constant as KindAwaitKeyword$constant__from_ast, KindBarBarEqualsToken$constant as KindBarBarEqualsToken$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindEqualsEqualsToken$constant as KindEqualsEqualsToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExclamationEqualsEqualsToken$constant as KindExclamationEqualsEqualsToken$constant__from_ast, KindExclamationEqualsToken$constant as KindExclamationEqualsToken$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFirstFutureReservedWord$constant as KindFirstFutureReservedWord$constant__from_ast, KindFirstStatement$constant as KindFirstStatement$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInstanceOfKeyword$constant as KindInstanceOfKeyword$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxAttributes$constant as KindJsxAttributes$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindLastFutureReservedWord$constant as KindLastFutureReservedWord$constant__from_ast, KindLastStatement$constant as KindLastStatement$constant__from_ast, KindLastToken$constant as KindLastToken$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMetaProperty$constant as KindMetaProperty$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindQuestionQuestionEqualsToken$constant as KindQuestionQuestionEqualsToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOfExpression$constant as KindTypeOfExpression$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, KindYieldKeyword$constant as KindYieldKeyword$constant__from_ast, Kind_String as Kind_String__from_ast, LocalsContainerBase as LocalsContainerBase__from_ast, ModifierFlagsAsync$constant as ModifierFlagsAsync$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, ModuleDeclaration as ModuleDeclaration__from_ast, ModuleExportNameIsDefault as ModuleExportNameIsDefault__from_ast, ModuleInstanceStateConstEnumOnly$constant as ModuleInstanceStateConstEnumOnly$constant__from_ast, ModuleInstanceStateNonInstantiated$constant as ModuleInstanceStateNonInstantiated$constant__from_ast, NewDiagnostic as NewDiagnostic__from_ast, NewFlowReduceLabelData as NewFlowReduceLabelData__from_ast, NewFlowSwitchClauseData as NewFlowSwitchClauseData__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsAwaitContext$constant as NodeFlagsAwaitContext$constant__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsContainsThis$constant as NodeFlagsContainsThis$constant__from_ast, NodeFlagsExportContext$constant as NodeFlagsExportContext$constant__from_ast, NodeFlagsHasAsyncFunctions$constant as NodeFlagsHasAsyncFunctions$constant__from_ast, NodeFlagsHasExplicitReturn$constant as NodeFlagsHasExplicitReturn$constant__from_ast, NodeFlagsHasImplicitReturn$constant as NodeFlagsHasImplicitReturn$constant__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, NodeFlagsOptionalChain$constant as NodeFlagsOptionalChain$constant__from_ast, NodeFlagsThisNodeHasError$constant as NodeFlagsThisNodeHasError$constant__from_ast, NodeFlagsThisNodeOrAnySubNodesHasError$constant as NodeFlagsThisNodeOrAnySubNodesHasError$constant__from_ast, NodeFlagsUnreachable$constant as NodeFlagsUnreachable$constant__from_ast, NodeFlagsYieldContext$constant as NodeFlagsYieldContext$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeIsPresent as NodeIsPresent__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PatternAmbientModule as PatternAmbientModule__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, SkipParentheses as SkipParentheses__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAccessor$constant as SymbolFlagsAccessor$constant__from_ast, SymbolFlagsAccessorExcludes$constant as SymbolFlagsAccessorExcludes$constant__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsAliasExcludes$constant as SymbolFlagsAliasExcludes$constant__from_ast, SymbolFlagsAll$constant as SymbolFlagsAll$constant__from_ast, SymbolFlagsAssignment$constant as SymbolFlagsAssignment$constant__from_ast, SymbolFlagsBlockScopedVariable$constant as SymbolFlagsBlockScopedVariable$constant__from_ast, SymbolFlagsBlockScopedVariableExcludes$constant as SymbolFlagsBlockScopedVariableExcludes$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsClassExcludes$constant as SymbolFlagsClassExcludes$constant__from_ast, SymbolFlagsClassifiable$constant as SymbolFlagsClassifiable$constant__from_ast, SymbolFlagsConstEnum$constant as SymbolFlagsConstEnum$constant__from_ast, SymbolFlagsConstEnumExcludes$constant as SymbolFlagsConstEnumExcludes$constant__from_ast, SymbolFlagsConstEnumOnlyModule$constant as SymbolFlagsConstEnumOnlyModule$constant__from_ast, SymbolFlagsConstructor$constant as SymbolFlagsConstructor$constant__from_ast, SymbolFlagsEnum$constant as SymbolFlagsEnum$constant__from_ast, SymbolFlagsEnumMember$constant as SymbolFlagsEnumMember$constant__from_ast, SymbolFlagsEnumMemberExcludes$constant as SymbolFlagsEnumMemberExcludes$constant__from_ast, SymbolFlagsExportStar$constant as SymbolFlagsExportStar$constant__from_ast, SymbolFlagsExportValue$constant as SymbolFlagsExportValue$constant__from_ast, SymbolFlagsFunction$constant as SymbolFlagsFunction$constant__from_ast, SymbolFlagsFunctionExcludes$constant as SymbolFlagsFunctionExcludes$constant__from_ast, SymbolFlagsFunctionScopedVariable$constant as SymbolFlagsFunctionScopedVariable$constant__from_ast, SymbolFlagsFunctionScopedVariableExcludes$constant as SymbolFlagsFunctionScopedVariableExcludes$constant__from_ast, SymbolFlagsGetAccessor$constant as SymbolFlagsGetAccessor$constant__from_ast, SymbolFlagsGetAccessorExcludes$constant as SymbolFlagsGetAccessorExcludes$constant__from_ast, SymbolFlagsInterface$constant as SymbolFlagsInterface$constant__from_ast, SymbolFlagsInterfaceExcludes$constant as SymbolFlagsInterfaceExcludes$constant__from_ast, SymbolFlagsMethod$constant as SymbolFlagsMethod$constant__from_ast, SymbolFlagsMethodExcludes$constant as SymbolFlagsMethodExcludes$constant__from_ast, SymbolFlagsNamespaceModule$constant as SymbolFlagsNamespaceModule$constant__from_ast, SymbolFlagsNamespaceModuleExcludes$constant as SymbolFlagsNamespaceModuleExcludes$constant__from_ast, SymbolFlagsNone$constant as SymbolFlagsNone$constant__from_ast, SymbolFlagsObjectLiteral$constant as SymbolFlagsObjectLiteral$constant__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, SymbolFlagsParameterExcludes$constant as SymbolFlagsParameterExcludes$constant__from_ast, SymbolFlagsProperty$constant as SymbolFlagsProperty$constant__from_ast, SymbolFlagsPropertyExcludes$constant as SymbolFlagsPropertyExcludes$constant__from_ast, SymbolFlagsRegularEnum$constant as SymbolFlagsRegularEnum$constant__from_ast, SymbolFlagsRegularEnumExcludes$constant as SymbolFlagsRegularEnumExcludes$constant__from_ast, SymbolFlagsReplaceableByMethod$constant as SymbolFlagsReplaceableByMethod$constant__from_ast, SymbolFlagsSetAccessor$constant as SymbolFlagsSetAccessor$constant__from_ast, SymbolFlagsSetAccessorExcludes$constant as SymbolFlagsSetAccessorExcludes$constant__from_ast, SymbolFlagsSignature$constant as SymbolFlagsSignature$constant__from_ast, SymbolFlagsTypeAlias$constant as SymbolFlagsTypeAlias$constant__from_ast, SymbolFlagsTypeAliasExcludes$constant as SymbolFlagsTypeAliasExcludes$constant__from_ast, SymbolFlagsTypeLiteral$constant as SymbolFlagsTypeLiteral$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolFlagsTypeParameterExcludes$constant as SymbolFlagsTypeParameterExcludes$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, SymbolFlagsValueModule$constant as SymbolFlagsValueModule$constant__from_ast, SymbolFlagsValueModuleExcludes$constant as SymbolFlagsValueModuleExcludes$constant__from_ast, SymbolFlagsVariable$constant as SymbolFlagsVariable$constant__from_ast, SymbolName as SymbolName__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TypeAliasDeclaration as TypeAliasDeclaration__from_ast, VariableDeclaration as VariableDeclaration__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/state.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Arena as Arena__from_core, Pattern as Pattern__from_core, TextRange as TextRange__from_core, TryParsePattern as TryParsePattern__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { DeclarationNameToString as DeclarationNameToString__from_scanner, GetErrorRangeForNode as GetErrorRangeForNode__from_scanner, GetIdentifierToken as GetIdentifierToken__from_scanner, GetRangeOfTokenAtPosition as GetRangeOfTokenAtPosition__from_scanner, GetSourceTextOfNodeFromSourceFile as GetSourceTextOfNodeFromSourceFile__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { RemoveFileExtension as RemoveFileExtension__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$PointerTo_Named_ast$Symbol, Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { AppendIfUnique$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/AppendIfUnique.js";
import { Arena$New$Named_ast$FlowList, Arena$New$Named_ast$FlowNode, Arena$New$Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Arena$New.js";
import { Arena$NewSlice1$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Arena$NewSlice1.js";
import { IfElse$Named_ast$SymbolFlags, IfElse$PointerTo_Named_ast$FlowNode, IfElse$PointerTo_Named_diagnostics$Message, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { OrElse$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/OrElse.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_binder$Binder as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
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
export type ContainerFlags = int32;
export function ContainerFlagsNone$constant(): ContainerFlags {
    return 0;
}
export function ContainerFlagsIsContainer$constant(): ContainerFlags {
    return 1;
}
export function ContainerFlagsIsBlockScopedContainer$constant(): ContainerFlags {
    return 2;
}
export function ContainerFlagsIsControlFlowContainer$constant(): ContainerFlags {
    return 4;
}
export function ContainerFlagsIsFunctionLike$constant(): ContainerFlags {
    return 8;
}
export function ContainerFlagsIsFunctionExpression$constant(): ContainerFlags {
    return 16;
}
export function ContainerFlagsHasLocals$constant(): ContainerFlags {
    return 32;
}
export function ContainerFlagsIsInterface$constant(): ContainerFlags {
    return 64;
}
export function ContainerFlagsIsThisContainer$constant(): ContainerFlags {
    return 256;
}
export function ContainerFlagsPropagatesThisKeyword$constant(): ContainerFlags {
    return 512;
}
export type ExpandoAssignmentInfo$Storage = {
    node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    blockScopeContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class ExpandoAssignmentInfo {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ExpandoAssignmentInfo$Storage) {
    }
    public static $storageOf($source: ExpandoAssignmentInfo): ExpandoAssignmentInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ExpandoAssignmentInfo$Storage): ExpandoAssignmentInfo {
        return new ExpandoAssignmentInfo($source);
    }
    public get node(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.node;
    }
    public set node($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.node = $value;
    }
    public get container(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.container;
    }
    public set container($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.container = $value;
    }
    public get blockScopeContainer(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.blockScopeContainer;
    }
    public set blockScopeContainer($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.blockScopeContainer = $value;
    }
    static $copy($source: ExpandoAssignmentInfo): ExpandoAssignmentInfo {
        return new ExpandoAssignmentInfo({
            node: $source.$storage.node,
            container: $source.$storage.container,
            blockScopeContainer: $source.$storage.blockScopeContainer
        });
    }
    static $equal($left: ExpandoAssignmentInfo, $right: ExpandoAssignmentInfo): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.node, $right.$storage.node)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.container, $right.$storage.container) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.blockScopeContainer, $right.$storage.blockScopeContainer);
    }
    static $hash($source: ExpandoAssignmentInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.node));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.container));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.blockScopeContainer));
        return $hash;
    }
    static $zeroStorage(): ExpandoAssignmentInfo$Storage {
        return {
            node: void 0,
            container: void 0,
            blockScopeContainer: void 0
        };
    }
    declare private readonly then?: never;
}
export class Binder {
    declare private readonly $goType: void;
    public constructor(public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public bindFunc: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, public unreachableFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public thisContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public blockScopeContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public lastContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public currentBreakTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public currentContinueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public currentReturnTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public currentTrueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public currentFalseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public currentExceptionTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public preSwitchCaseFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public activeLabelList: {
        value: ActiveLabel;
    } | undefined, public emitFlags: NodeFlags__from_ast, public seenThisKeyword: bool, public hasExplicitReturn: bool, public hasFlowEffects: bool, public inAssignmentPattern: bool, public seenParseError: bool, public symbolCount: int, public classifiableNames: Set__from_collections<gostring>, public notConstEnumOnlyModules: Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public symbolArena: Arena__from_core<Symbol__from_ast>, public flowNodeArena: Arena__from_core<FlowNode__from_ast>, public flowListArena: Arena__from_core<FlowList__from_ast>, public singleDeclarationsArena: Arena__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public expandoAssignments: RuntimeSlice<ExpandoAssignmentInfo$Storage>, public nestedCJSExports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    static $copy($source: Binder): Binder {
        return new Binder($source.file, $source.bindFunc, $source.unreachableFlow, $source.container, $source.thisContainer, $source.blockScopeContainer, $source.lastContainer, $source.currentFlow, $source.currentBreakTarget, $source.currentContinueTarget, $source.currentReturnTarget, $source.currentTrueTarget, $source.currentFalseTarget, $source.currentExceptionTarget, $source.preSwitchCaseFlow, $source.activeLabelList, $source.emitFlags, $source.seenThisKeyword, $source.hasExplicitReturn, $source.hasFlowEffects, $source.inAssignmentPattern, $source.seenParseError, $source.symbolCount, Set__from_collections.$copy<gostring>($source.classifiableNames), Set__from_collections.$copy<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>($source.notConstEnumOnlyModules), Arena__from_core.$copy<Symbol__from_ast>($source.symbolArena), Arena__from_core.$copy<FlowNode__from_ast>($source.flowNodeArena), Arena__from_core.$copy<FlowList__from_ast>($source.flowListArena), Arena__from_core.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($source.singleDeclarationsArena), $source.expandoAssignments, $source.nestedCJSExports);
    }
    declare private readonly then?: never;
    static $go$private$binder$addAntecedent(b: {
        value: Binder;
    } | undefined, label: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        if (!((FlowNode__from_ast.$storageOf(((antecedent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags & FlowFlagsUnreachable$constant__from_ast()) >>> 0 === 0)) {
            return;
        }
        let last: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined = void 0;
        for (let list: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined = FlowNode__from_ast.$storageOf(((label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents; !(list === undefined); list = FlowList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Next) {
            if (tsonicTypeScriptRuntime.sameLocation(FlowList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Flow, antecedent)) {
                return;
            }
            last = list;
        }
        if (last === undefined) {
            FlowNode__from_ast.$storageOf(((label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents = Binder.$go$private$binder$newFlowList(b, antecedent, void 0);
        }
        else {
            FlowList__from_ast.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Next = Binder.$go$private$binder$newFlowList(b, antecedent, void 0);
        }
        setFlowNodeReferenced(antecedent);
    }
    static $go$private$binder$addDeclarationToSymbol(b: {
        value: Binder;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast): void {
        const __gotots_store_32 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
        __gotots_store_32.Flags = (__gotots_store_32.Flags | symbolFlags) >>> 0;
        DeclarationBase__from_ast.$storageOf(((Node__from_ast.DeclarationData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast>).value).Symbol = __go_symbol;
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.isNil()) {
            Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations = Binder.$go$private$binder$newSingleDeclaration(b, node);
        }
        else {
            Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations = AppendIfUnique$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, node);
        }
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsConstEnumOnlyModule$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (304)) >>> 0 === 0)) {
            const __gotots_store_33 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
            __gotots_store_33.Flags = (__gotots_store_33.Flags & ~268435456) >>> 0;
            const __gotots_store_34 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            Set$Add$PointerTo_Named_ast$Symbol(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "notConstEnumOnlyModules"), __go_symbol);
        }
        if (!((symbolFlags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0)) {
            SetValueDeclaration(__go_symbol, node);
        }
    }
    static $go$private$binder$addDiagnostic(b: {
        value: Binder;
    } | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void {
        SourceFile__from_ast.SetBindDiagnostics((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, SourceFile__from_ast.BindDiagnostics((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file).append(void 0, [diagnostic]));
    }
    static $go$private$binder$addLateBoundAssignmentDeclarationToSymbol(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        let exports: SymbolTable__from_ast = GetExports__from_ast(__go_symbol);
        let assignmentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = exports.$value.lookup(InternalSymbolNameAssignmentDeclaration$string__from_ast);
        if (assignmentSymbol === undefined) {
            assignmentSymbol = Binder.$go$private$binder$newSymbol(b, SymbolFlagsNone$constant__from_ast(), InternalSymbolNameAssignmentDeclaration$string__from_ast);
            exports.$value.store(InternalSymbolNameAssignmentDeclaration$string__from_ast, assignmentSymbol);
        }
        Symbol__from_ast.$storageOf(((assignmentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations = Symbol__from_ast.$storageOf(((assignmentSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.append(void 0, [node]);
    }
    static $go$private$binder$addToContainerChain(b: {
        value: Binder;
    } | undefined, next: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastContainer === undefined)) {
            LocalsContainerBase__from_ast.$storageOf(((Node__from_ast.LocalsContainerData((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastContainer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast>).value).NextContainer = next;
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastContainer = next;
    }
    static $go$private$binder$bind(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (node === undefined) {
            return false;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast(): {
                (void FlowNodeBase__from_ast.$storageOf, (void FlowNodeBase__from_ast.$fromStorage,
                    Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).FlowNodeBase)).FlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                Binder.$go$private$binder$checkContextualIdentifier(b, node);
                break;
            }
            case KindThisKeyword$constant__from_ast():
            case KindSuperKeyword$constant__from_ast(): {
                if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast()) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = true;
                }
                (void FlowNodeBase__from_ast.$storageOf, (void FlowNodeBase__from_ast.$fromStorage,
                    KeywordExpression__from_ast.$storageOf(((Node__from_ast.AsKeywordExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<KeywordExpression__from_ast>).value).FlowNodeBase)).FlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                break;
            }
            case KindQualifiedName$constant__from_ast(): {
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow === undefined) && IsPartOfTypeQuery__from_ast(node)) {
                    FlowNodeBase__from_ast.$storageOf((Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FlowNodeBase).FlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                }
                break;
            }
            case KindMetaProperty$constant__from_ast(): {
                FlowNodeBase__from_ast.$storageOf((Node__from_ast.AsMetaProperty(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FlowNodeBase).FlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                break;
            }
            case KindPrivateIdentifier$constant__from_ast(): {
                Binder.$go$private$binder$checkPrivateIdentifier(b, node);
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast(): {
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow === undefined) && isNarrowableReference(node)) {
                    setFlowNode(node, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
                }
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                switch (GetAssignmentDeclarationKind__from_ast(node).$value) {
                    case 1: {
                        Binder.$go$private$binder$bindModuleExportsAssignment(b, node);
                        break;
                    }
                    case 2: {
                        Binder.$go$private$binder$bindExportsOrObjectDefineProperty(b, node);
                        break;
                    }
                    case 4: {
                        Binder.$go$private$binder$bindExpandoPropertyAssignment(b, node);
                        break;
                    }
                    case 3: {
                        Binder.$go$private$binder$bindThisPropertyAssignment(b, node);
                        break;
                    }
                }
                Binder.$go$private$binder$checkStrictModeBinaryExpression(b, node);
                break;
            }
            case KindCatchClause$constant__from_ast(): {
                Binder.$go$private$binder$checkStrictModeCatchClause(b, node);
                break;
            }
            case KindDeleteExpression$constant__from_ast(): {
                Binder.$go$private$binder$checkStrictModeDeleteExpression(b, node);
                break;
            }
            case KindPostfixUnaryExpression$constant__from_ast(): {
                Binder.$go$private$binder$checkStrictModePostfixUnaryExpression(b, node);
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                Binder.$go$private$binder$checkStrictModePrefixUnaryExpression(b, node);
                break;
            }
            case KindWithStatement$constant__from_ast(): {
                Binder.$go$private$binder$checkStrictModeWithStatement(b, node);
                break;
            }
            case KindLabeledStatement$constant__from_ast(): {
                Binder.$go$private$binder$checkStrictModeLabeledStatement(b, node);
                break;
            }
            case KindThisType$constant__from_ast(): {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = true;
                break;
            }
            case KindTypeParameter$constant__from_ast(): {
                Binder.$go$private$binder$bindTypeParameter(b, node);
                break;
            }
            case KindParameter$constant__from_ast(): {
                Binder.$go$private$binder$bindParameter(b, node);
                break;
            }
            case KindVariableDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindVariableDeclarationOrBindingElement(b, node);
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                FlowNodeBase__from_ast.$storageOf((Node__from_ast.AsBindingElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FlowNodeBase).FlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                Binder.$go$private$binder$bindVariableDeclarationOrBindingElement(b, node);
                break;
            }
            case KindPropertyDeclaration$constant__from_ast():
            case KindPropertySignature$constant__from_ast(): {
                Binder.$go$private$binder$bindPropertyWorker(b, node);
                break;
            }
            case KindPropertyAssignment$constant__from_ast():
            case KindShorthandPropertyAssignment$constant__from_ast(): {
                Binder.$go$private$binder$bindPropertyOrMethodOrAccessor(b, node, SymbolFlagsProperty$constant__from_ast(), SymbolFlagsPropertyExcludes$constant__from_ast());
                break;
            }
            case KindEnumMember$constant__from_ast(): {
                Binder.$go$private$binder$bindPropertyOrMethodOrAccessor(b, node, SymbolFlagsEnumMember$constant__from_ast(), SymbolFlagsEnumMemberExcludes$constant__from_ast());
                break;
            }
            case KindCallSignature$constant__from_ast():
            case KindConstructSignature$constant__from_ast():
            case KindIndexSignature$constant__from_ast(): {
                Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsSignature$constant__from_ast(), SymbolFlagsNone$constant__from_ast());
                break;
            }
            case KindMethodDeclaration$constant__from_ast():
            case KindMethodSignature$constant__from_ast(): {
                Binder.$go$private$binder$bindPropertyOrMethodOrAccessor(b, node, (SymbolFlagsMethod$constant__from_ast() | getOptionalSymbolFlagForNode(node)) >>> 0, IfElse$Named_ast$SymbolFlags(IsObjectLiteralMethod__from_ast(node), SymbolFlagsValue$constant__from_ast(), SymbolFlagsMethodExcludes$constant__from_ast()));
                break;
            }
            case KindFunctionDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindFunctionDeclaration(b, node);
                break;
            }
            case KindConstructor$constant__from_ast(): {
                Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsConstructor$constant__from_ast(), SymbolFlagsNone$constant__from_ast());
                break;
            }
            case KindGetAccessor$constant__from_ast(): {
                Binder.$go$private$binder$bindPropertyOrMethodOrAccessor(b, node, SymbolFlagsGetAccessor$constant__from_ast(), SymbolFlagsGetAccessorExcludes$constant__from_ast());
                break;
            }
            case KindSetAccessor$constant__from_ast(): {
                Binder.$go$private$binder$bindPropertyOrMethodOrAccessor(b, node, SymbolFlagsSetAccessor$constant__from_ast(), SymbolFlagsSetAccessorExcludes$constant__from_ast());
                break;
            }
            case KindFunctionType$constant__from_ast():
            case KindConstructorType$constant__from_ast(): {
                Binder.$go$private$binder$bindFunctionOrConstructorType(b, node);
                break;
            }
            case KindTypeLiteral$constant__from_ast():
            case KindMappedType$constant__from_ast(): {
                Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsTypeLiteral$constant__from_ast(), InternalSymbolNameType$string__from_ast);
                break;
            }
            case KindObjectLiteralExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsObjectLiteral$constant__from_ast(), InternalSymbolNameObject$string__from_ast);
                break;
            }
            case KindFunctionExpression$constant__from_ast():
            case KindArrowFunction$constant__from_ast(): {
                Binder.$go$private$binder$bindFunctionExpression(b, node);
                break;
            }
            case KindClassExpression$constant__from_ast():
            case KindClassDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindClassLikeDeclaration(b, node);
                break;
            }
            case KindInterfaceDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsInterface$constant__from_ast(), SymbolFlagsInterfaceExcludes$constant__from_ast());
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                switch (GetAssignmentDeclarationKind__from_ast(node).$value) {
                    case 5: {
                        Binder.$go$private$binder$bindExpandoPropertyAssignment(b, node);
                        break;
                    }
                    case 6: {
                        Binder.$go$private$binder$bindExportsOrObjectDefineProperty(b, node);
                        break;
                    }
                }
                if (IsInJSFile__from_ast(node)) {
                    Binder.$go$private$binder$bindCallExpression(b, node);
                }
                break;
            }
            case KindTypeAliasDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsTypeAlias$constant__from_ast(), SymbolFlagsTypeAliasExcludes$constant__from_ast());
                break;
            }
            case KindJSTypeAliasDeclaration$constant__from_ast(): {
                if (!IsSourceFile__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer)) {
                    Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsTypeAlias$constant__from_ast(), SymbolFlagsTypeAliasExcludes$constant__from_ast());
                }
                break;
            }
            case KindEnumDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindEnumDeclaration(b, node);
                break;
            }
            case KindModuleDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindModuleDeclaration(b, node);
                break;
            }
            case KindImportEqualsDeclaration$constant__from_ast():
            case KindNamespaceImport$constant__from_ast():
            case KindImportSpecifier$constant__from_ast():
            case KindExportSpecifier$constant__from_ast(): {
                Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsAlias$constant__from_ast(), SymbolFlagsAliasExcludes$constant__from_ast());
                break;
            }
            case KindNamespaceExportDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindNamespaceExportDeclaration(b, node);
                break;
            }
            case KindImportClause$constant__from_ast(): {
                Binder.$go$private$binder$bindImportClause(b, node);
                break;
            }
            case KindExportDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindExportDeclaration(b, node);
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                Binder.$go$private$binder$bindExportAssignment(b, node);
                break;
            }
            case KindSourceFile$constant__from_ast(): {
                Binder.$go$private$binder$bindSourceFileIfExternalModule(b);
                break;
            }
            case KindJsxAttributes$constant__from_ast(): {
                Binder.$go$private$binder$bindJsxAttributes(b, node);
                break;
            }
            case KindJsxAttribute$constant__from_ast(): {
                Binder.$go$private$binder$bindJsxAttribute(b, node, SymbolFlagsProperty$constant__from_ast(), SymbolFlagsPropertyExcludes$constant__from_ast());
                break;
            }
        }
        let thisNodeOrAnySubnodesHasError = !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsThisNodeHasError$constant__from_ast()) >>> 0 === 0);
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind > KindLastToken$constant__from_ast()) {
            let saveSeenParseError: Binder["seenParseError"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenParseError;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenParseError = false;
            let containerFlags = GetContainerFlags(node);
            if (containerFlags === ContainerFlagsNone$constant()) {
                Binder.$go$private$binder$bindChildren(b, node);
            }
            else {
                Binder.$go$private$binder$bindContainer(b, node, containerFlags);
            }
            if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenParseError) {
                thisNodeOrAnySubnodesHasError = true;
            }
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenParseError = saveSeenParseError;
        }
        if (thisNodeOrAnySubnodesHasError) {
            const __gotots_store_2 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
            __gotots_store_2.Flags = (__gotots_store_2.Flags | 131072) >>> 0;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenParseError = true;
        }
        return false;
    }
    static $go$private$binder$bindAccessExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsOptionalChain__from_ast(node)) {
            Binder.$go$private$binder$bindOptionalChainFlow(b, node);
        }
        else {
            Binder.$go$private$binder$bindEachChild(b, node);
        }
    }
    static $go$private$binder$bindAnonymousDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, name: gostring): void {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$newSymbol(b, symbolFlags, name);
        if (!((symbolFlags & (106508)) >>> 0 === 0)) {
            Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent = Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container);
        }
        Binder.$go$private$binder$addDeclarationToSymbol(b, __go_symbol, node, symbolFlags);
    }
    static $go$private$binder$bindAssignmentTargetFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindArrayLiteralExpression$constant__from_ast(): {
                const __gotots_range_6 = Node__from_ast.Elements(node);
                for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                    const __gotots_range_value_9 = __gotots_range_6.get(__gotots_range_index_5);
                    let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                    if (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSpreadElement$constant__from_ast()) {
                        Binder.$go$private$binder$bindAssignmentTargetFlow(b, Node__from_ast.Expression(e));
                    }
                    else {
                        Binder.$go$private$binder$bindDestructuringTargetFlow(b, e);
                    }
                }
                break;
            }
            case KindObjectLiteralExpression$constant__from_ast(): {
                const __gotots_range_7 = Node__from_ast.Properties(node);
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                    const __gotots_range_value_10 = __gotots_range_7.get(__gotots_range_index_6);
                    let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                    switch (Node__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindPropertyAssignment$constant__from_ast(): {
                            Binder.$go$private$binder$bindDestructuringTargetFlow(b, Node__from_ast.Initializer(p));
                            break;
                        }
                        case KindShorthandPropertyAssignment$constant__from_ast(): {
                            Binder.$go$private$binder$bindAssignmentTargetFlow(b, ShorthandPropertyAssignment__from_ast.Name(Node__from_ast.AsShorthandPropertyAssignment(p)));
                            break;
                        }
                        case KindSpreadAssignment$constant__from_ast(): {
                            Binder.$go$private$binder$bindAssignmentTargetFlow(b, Node__from_ast.Expression(p));
                            break;
                        }
                    }
                }
                break;
            }
            default: {
                if (isNarrowableReference(node)) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createFlowMutation(b, FlowFlagsAssignment$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node);
                }
                break;
            }
        }
    }
    static $go$private$binder$bindBinaryExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
        let operator = Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        if (IsLogicalOrCoalescingBinaryOperator__from_ast(operator) || IsLogicalOrCoalescingAssignmentOperator__from_ast(operator)) {
            if (isTopLevelLogicalExpression(node)) {
                let postExpressionLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
                let saveCurrentFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                let saveHasFlowEffects: Binder["hasFlowEffects"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects;
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = false;
                Binder.$go$private$binder$bindLogicalLikeExpression(b, node, postExpressionLabel, postExpressionLabel);
                if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postExpressionLabel);
                }
                else {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = saveCurrentFlow;
                }
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects || saveHasFlowEffects;
            }
            else {
                Binder.$go$private$binder$bindLogicalLikeExpression(b, node, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget);
            }
        }
        else {
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Type);
            if (operator === KindCommaToken$constant__from_ast()) {
                Binder.$go$private$binder$maybeBindExpressionFlowIfCall(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            }
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken);
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            if (operator === KindCommaToken$constant__from_ast()) {
                Binder.$go$private$binder$maybeBindExpressionFlowIfCall(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            }
            if (IsAssignmentOperator__from_ast(operator) && !IsAssignmentTarget__from_ast(node)) {
                Binder.$go$private$binder$bindAssignmentTargetFlow(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                if (operator === KindEqualsToken$constant__from_ast() && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindElementAccessExpression$constant__from_ast()) {
                    let elementAccess: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined = Node__from_ast.AsElementAccessExpression(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                    if (isNarrowableOperand(ElementAccessExpression__from_ast.$storageOf(((elementAccess ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression)) {
                        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createFlowMutation(b, FlowFlagsArrayMutation$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node);
                    }
                }
            }
        }
    }
    static $go$private$binder$bindBindingElementFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let elem: {
            value: BindingElement__from_ast;
        } | undefined = Node__from_ast.AsBindingElement(node);
        Binder.$go$private$binder$bind(b, (elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken);
        Binder.$go$private$binder$bind(b, (elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName);
        Binder.$go$private$binder$bindInitializer(b, (elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        Binder.$go$private$binder$bind(b, BindingElement__from_ast.Name(elem));
    }
    static $go$private$binder$bindBlockScopedDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): void {
        {
            const __gotots_switch_tag_1 = Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            let __gotots_switch_selection_1 = -1;
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_13 = false;
                if (!__gotots_switch_match_13) {
                    __gotots_switch_match_13 = __gotots_switch_tag_1 === KindModuleDeclaration$constant__from_ast();
                }
                if (__gotots_switch_match_13) {
                    __gotots_switch_selection_1 = 0;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_14 = false;
                if (!__gotots_switch_match_14) {
                    __gotots_switch_match_14 = __gotots_switch_tag_1 === KindSourceFile$constant__from_ast();
                }
                if (__gotots_switch_match_14) {
                    __gotots_switch_selection_1 = 1;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                __gotots_switch_selection_1 = 2;
            }
            __gotots_control_target_2: {
                if (__gotots_switch_selection_1 === 0) {
                    Binder.$go$private$binder$declareModuleMember(b, node, symbolFlags, symbolExcludes);
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 1) {
                    if (IsExternalOrCommonJSModule__from_ast(Node__from_ast.AsSourceFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container))) {
                        Binder.$go$private$binder$declareModuleMember(b, node, symbolFlags, symbolExcludes);
                        break __gotots_control_target_2;
                    }
                    __gotots_switch_selection_1 = 2;
                }
                if (__gotots_switch_selection_1 === 2) {
                    Binder.$go$private$binder$declareSymbol(b, GetLocals__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer), void 0, node, symbolFlags, symbolExcludes);
                    break __gotots_control_target_2;
                }
            }
        }
    }
    static $go$private$binder$bindBreakOrContinueFlow(b: {
        value: Binder;
    } | undefined, flowLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        if (!(flowLabel === undefined)) {
            Binder.$go$private$binder$addAntecedent(b, flowLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = true;
        }
    }
    static $go$private$binder$bindBreakOrContinueStatement(b: {
        value: Binder;
    } | undefined, label: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, currentTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, getTarget: (($0: {
        value: ActiveLabel;
    } | undefined) => tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined) | undefined): void {
        Binder.$go$private$binder$bind(b, label);
        if (!(label === undefined)) {
            let activeLabel: {
                value: ActiveLabel;
            } | undefined = Binder.$go$private$binder$findActiveLabel(b, Node__from_ast.Text(label));
            if (!(activeLabel === undefined)) {
                (activeLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referenced = true;
                const __gotots_receiver_8 = b;
                const __gotots_callee_0 = getTarget;
                const __gotots_argument_31 = activeLabel;
                const __gotots_argument_32 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31);
                Binder.$go$private$binder$bindBreakOrContinueFlow(__gotots_receiver_8, __gotots_argument_32);
            }
        }
        else {
            Binder.$go$private$binder$bindBreakOrContinueFlow(b, currentTarget);
        }
    }
    static $go$private$binder$bindBreakStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$bindBreakOrContinueStatement(b, Node__from_ast.Label(node), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget, ($argument0: {
            value: ActiveLabel;
        } | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined => {
            return ActiveLabel.BreakTarget($argument0);
        });
    }
    static $go$private$binder$bindCallExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined && IsRequireCall__from_ast(node, false)) {
            Binder.$go$private$binder$setCommonJSModuleIndicator(b, node);
        }
    }
    static $go$private$binder$bindCallExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let call: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(node);
        if (IsOptionalChain__from_ast(node)) {
            Binder.$go$private$binder$bindOptionalChainFlow(b, node);
        }
        else {
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            if (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast() || Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast()) {
                Binder.$go$private$binder$bindNodeList(b, CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).TypeArguments);
                Binder.$go$private$binder$bindEach(b, NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
                Binder.$go$private$binder$bind(b, CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            }
            else {
                Binder.$go$private$binder$bindEachChild(b, node);
                if (Node__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createFlowCall(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node);
                }
            }
        }
        if (IsPropertyAccessExpression__from_ast(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression)) {
            let access: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            if (IsIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(access)) && isNarrowableOperand(PropertyAccessExpression__from_ast.$storageOf(((access ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).Expression) && IsPushOrUnshiftIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(access))) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createFlowMutation(b, FlowFlagsArrayMutation$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node);
            }
        }
    }
    static $go$private$binder$bindCaseBlock(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let switchStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        let clauses = NodeList__from_ast.$storageOf((((Node__from_ast.AsCaseBlock(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        let isNarrowingSwitch = Node__from_ast.$storageOf(((Node__from_ast.Expression(switchStatement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTrueKeyword$constant__from_ast() || isNarrowingExpression(Node__from_ast.Expression(switchStatement));
        let fallthroughFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
        for (let i = 0; i < clauses.length; i++) {
            let clauseStart = i;
            for (; Node__from_ast.Statements(clauses.get(i)).length === 0 && i + 1 < clauses.length;) {
                if (tsonicTypeScriptRuntime.sameLocation(fallthroughFlow, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow)) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow;
                }
                Binder.$go$private$binder$bind(b, clauses.get(i));
                i++;
            }
            let preCaseLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
            let preCaseFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow;
            if (isNarrowingSwitch) {
                preCaseFlow = Binder.$go$private$binder$createFlowSwitchClause(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow, switchStatement, clauseStart, i + 1);
            }
            Binder.$go$private$binder$addAntecedent(b, preCaseLabel, preCaseFlow);
            Binder.$go$private$binder$addAntecedent(b, preCaseLabel, fallthroughFlow);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preCaseLabel);
            let clause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = clauses.get(i);
            Binder.$go$private$binder$bind(b, clause);
            fallthroughFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
            if ((FlowNode__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags & FlowFlagsUnreachable$constant__from_ast()) >>> 0 === 0 && i !== clauses.length - 1) {
                (Node__from_ast.AsCaseOrDefaultClause(clause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FallthroughFlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
            }
        }
    }
    static $go$private$binder$bindCaseOrDefaultClause(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let clause: {
            value: CaseOrDefaultClause__from_ast;
        } | undefined = Node__from_ast.AsCaseOrDefaultClause(node);
        if (!((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) {
            let saveCurrentFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow;
            Binder.$go$private$binder$bind(b, (clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = saveCurrentFlow;
        }
        Binder.$go$private$binder$bindEach(b, NodeList__from_ast.$storageOf((((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
    }
    static $go$private$binder$bindChildren(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let saveInAssignmentPattern: Binder["inAssignmentPattern"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = false;
        if (tsonicTypeScriptRuntime.sameLocation((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow)) {
            {
                let flowNodeData: tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast> | undefined = Node__from_ast.FlowNodeData(node);
                if (!(flowNodeData === undefined)) {
                    FlowNodeBase__from_ast.$storageOf(((flowNodeData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast>).value).FlowNode = void 0;
                }
            }
            if (IsPotentiallyExecutableNode__from_ast(node)) {
                const __gotots_store_17 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                __gotots_store_17.Flags = (__gotots_store_17.Flags | 134217728) >>> 0;
            }
            Binder.$go$private$binder$bindEachChild(b, node);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = saveInAssignmentPattern;
            return;
        }
        if (KindFirstStatement$constant__from_ast() <= Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind <= KindLastStatement$constant__from_ast()) {
            {
                let flowNodeData: tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast> | undefined = Node__from_ast.FlowNodeData(node);
                if (!(flowNodeData === undefined)) {
                    FlowNodeBase__from_ast.$storageOf(((flowNodeData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast>).value).FlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                }
            }
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindWhileStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindWhileStatement(b, node);
                break;
            }
            case KindDoStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindDoStatement(b, node);
                break;
            }
            case KindForStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindForStatement(b, node);
                break;
            }
            case KindForInStatement$constant__from_ast():
            case KindForOfStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindForInOrForOfStatement(b, node);
                break;
            }
            case KindIfStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindIfStatement(b, node);
                break;
            }
            case KindReturnStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindReturnStatement(b, node);
                break;
            }
            case KindThrowStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindThrowStatement(b, node);
                break;
            }
            case KindBreakStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindBreakStatement(b, node);
                break;
            }
            case KindContinueStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindContinueStatement(b, node);
                break;
            }
            case KindTryStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindTryStatement(b, node);
                break;
            }
            case KindSwitchStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindSwitchStatement(b, node);
                break;
            }
            case KindCaseBlock$constant__from_ast(): {
                Binder.$go$private$binder$bindCaseBlock(b, node);
                break;
            }
            case KindCaseClause$constant__from_ast():
            case KindDefaultClause$constant__from_ast(): {
                Binder.$go$private$binder$bindCaseOrDefaultClause(b, node);
                break;
            }
            case KindExpressionStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindExpressionStatement(b, node);
                break;
            }
            case KindLabeledStatement$constant__from_ast(): {
                Binder.$go$private$binder$bindLabeledStatement(b, node);
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindPrefixUnaryExpressionFlow(b, node);
                break;
            }
            case KindPostfixUnaryExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindPostfixUnaryExpressionFlow(b, node);
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                if (IsDestructuringAssignment__from_ast(node)) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = saveInAssignmentPattern;
                    Binder.$go$private$binder$bindDestructuringAssignmentFlow(b, node);
                    return;
                }
                Binder.$go$private$binder$bindBinaryExpressionFlow(b, node);
                break;
            }
            case KindDeleteExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindDeleteExpressionFlow(b, node);
                break;
            }
            case KindConditionalExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindConditionalExpressionFlow(b, node);
                break;
            }
            case KindVariableDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindVariableDeclarationFlow(b, node);
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindAccessExpressionFlow(b, node);
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindCallExpressionFlow(b, node);
                break;
            }
            case KindNonNullExpression$constant__from_ast(): {
                Binder.$go$private$binder$bindNonNullExpressionFlow(b, node);
                break;
            }
            case KindSourceFile$constant__from_ast(): {
                let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(node);
                Binder.$go$private$binder$bindEachStatementFunctionsFirst(b, ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements);
                Binder.$go$private$binder$bind(b, ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken);
                break;
            }
            case KindBlock$constant__from_ast():
            case KindModuleBlock$constant__from_ast(): {
                Binder.$go$private$binder$bindEachStatementFunctionsFirst(b, Node__from_ast.StatementList(node));
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                Binder.$go$private$binder$bindBindingElementFlow(b, node);
                break;
            }
            case KindParameter$constant__from_ast(): {
                Binder.$go$private$binder$bindParameterFlow(b, node);
                break;
            }
            case KindObjectLiteralExpression$constant__from_ast():
            case KindArrayLiteralExpression$constant__from_ast():
            case KindPropertyAssignment$constant__from_ast():
            case KindSpreadElement$constant__from_ast(): {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = saveInAssignmentPattern;
                Binder.$go$private$binder$bindEachChild(b, node);
                break;
            }
            default: {
                Binder.$go$private$binder$bindEachChild(b, node);
                break;
            }
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = saveInAssignmentPattern;
    }
    static $go$private$binder$bindClassLikeDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindClassDeclaration$constant__from_ast(): {
                Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsClass$constant__from_ast(), SymbolFlagsClassExcludes$constant__from_ast());
                break;
            }
            case KindClassExpression$constant__from_ast(): {
                let nameText = InternalSymbolNameClass$string__from_ast;
                if (!(name === undefined)) {
                    nameText = Node__from_ast.Text(name);
                    const __gotots_store_8 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "classifiableNames"), nameText);
                }
                Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsClass$constant__from_ast(), nameText);
                break;
            }
        }
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(node);
        let prototypeSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$newSymbol(b, 4194308, "prototype");
        let symbolExport: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = GetExports__from_ast(__go_symbol).$value.lookup(Symbol__from_ast.$storageOf(((prototypeSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
        if (!(symbolExport === undefined)) {
            Binder.$go$private$binder$errorOnNode(b, Symbol__from_ast.$storageOf(((symbolExport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0), $state__diagnostics.Duplicate_identifier_0, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(SymbolName__from_ast(prototypeSymbol))]));
        }
        GetExports__from_ast(__go_symbol).$value.store(Symbol__from_ast.$storageOf(((prototypeSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, prototypeSymbol);
        Symbol__from_ast.$storageOf(((prototypeSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent = __go_symbol;
    }
    static $go$private$binder$bindCommonJSTypeExports(b: {
        value: Binder;
    } | undefined, moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        let moduleExports: SymbolTable__from_ast = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports);
        {
            let exportEquals: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = moduleExports.$value.lookup(InternalSymbolNameExportEquals$string__from_ast);
            if (!(exportEquals === undefined)) {
                const __gotots_range_5 = moduleExports.$value;
                const __gotots_range_keys_0 = __gotots_range_5.keys();
                for (const __gotots_range_value_6 of __gotots_range_keys_0) {
                    const __gotots_range_value_7 = __gotots_range_5.lookupOk(__gotots_range_value_6);
                    if (!__gotots_range_value_7[1]) {
                        continue;
                    }
                    const __gotots_range_value_8 = __gotots_range_value_7[0];
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_8;
                    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name !== InternalSymbolNameExportEquals$string__from_ast && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (790504)) >>> 0 === 0)) {
                        GetExports__from_ast(exportEquals).$value.store(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol);
                        const __gotots_store_42 = Symbol__from_ast.$storageOf(((exportEquals ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
                        __gotots_store_42.Flags = (__gotots_store_42.Flags | 1024) >>> 0;
                    }
                }
            }
        }
    }
    static $go$private$binder$bindCondition(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, trueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, falseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        Binder.$go$private$binder$doWithConditionalBranches(b, ($argument0: {
            value: Binder;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return Binder.$go$private$binder$bind($argument0, $argument1);
        }, node, trueTarget, falseTarget);
        if (node === undefined || !isLogicalAssignmentExpression(node) && !IsLogicalExpression__from_ast(node) && !(IsOptionalChain__from_ast(node) && IsOutermostOptionalChain__from_ast(node))) {
            Binder.$go$private$binder$addAntecedent(b, trueTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsTrueCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
            Binder.$go$private$binder$addAntecedent(b, falseTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsFalseCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
        }
    }
    static $go$private$binder$bindConditionalExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast> | undefined = Node__from_ast.AsConditionalExpression(node);
        let trueLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let falseLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let postExpressionLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let saveCurrentFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
        let saveHasFlowEffects: Binder["hasFlowEffects"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = false;
        Binder.$go$private$binder$bindCondition(b, ConditionalExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition, trueLabel, falseLabel);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, trueLabel);
        Binder.$go$private$binder$bind(b, ConditionalExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).QuestionToken);
        Binder.$go$private$binder$bind(b, ConditionalExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue);
        Binder.$go$private$binder$addAntecedent(b, postExpressionLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, falseLabel);
        Binder.$go$private$binder$bind(b, ConditionalExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).ColonToken);
        Binder.$go$private$binder$bind(b, ConditionalExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse);
        Binder.$go$private$binder$addAntecedent(b, postExpressionLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postExpressionLabel);
        }
        else {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = saveCurrentFlow;
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects || saveHasFlowEffects;
    }
    static $go$private$binder$bindContainer(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, containerFlags: ContainerFlags): void {
        let saveContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container;
        let saveThisContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer;
        let savedBlockScopeContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer;
        if (!((containerFlags & ContainerFlagsIsContainer$constant()) === 0)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container = node;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer = node;
            if (!((containerFlags & ContainerFlagsHasLocals$constant()) === 0)) {
                Binder.$go$private$binder$addToContainerChain(b, node);
            }
        }
        else if (!((containerFlags & ContainerFlagsIsBlockScopedContainer$constant()) === 0)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer = node;
            Binder.$go$private$binder$addToContainerChain(b, node);
        }
        if (!((containerFlags & ContainerFlagsIsThisContainer$constant()) === 0)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer = node;
        }
        if (!((containerFlags & ContainerFlagsIsControlFlowContainer$constant()) === 0)) {
            let saveCurrentFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
            let saveBreakTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget;
            let saveContinueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget;
            let saveReturnTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget;
            let saveExceptionTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget;
            let saveActiveLabelList: {
                value: ActiveLabel;
            } | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList;
            let saveHasExplicitReturn: Binder["hasExplicitReturn"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasExplicitReturn;
            let saveSeenThisKeyword: Binder["seenThisKeyword"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword;
            let isImmediatelyInvoked = (!((containerFlags & ContainerFlagsIsFunctionExpression$constant()) === 0) && !HasSyntacticModifier__from_ast(node, ModifierFlagsAsync$constant__from_ast()) && !isGeneratorFunctionExpression(node) && !(GetImmediatelyInvokedFunctionExpression__from_ast(node) === undefined)) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassStaticBlockDeclaration$constant__from_ast();
            if (!isImmediatelyInvoked) {
                let flowStart: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$newFlowNode(b, FlowFlagsStart$constant__from_ast());
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = flowStart;
                if (!((containerFlags & (144)) === 0)) {
                    FlowNode__from_ast.$storageOf(((flowStart ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Node = node;
                }
            }
            if (isImmediatelyInvoked || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructor$constant__from_ast()) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget = Binder.$go$private$binder$newFlowNode(b, FlowFlagsBranchLabel$constant__from_ast());
            }
            else {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget = void 0;
            }
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget = void 0;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget = void 0;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget = void 0;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList = void 0;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasExplicitReturn = false;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = false;
            Binder.$go$private$binder$bindChildren(b, node);
            const __gotots_store_18 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
            __gotots_store_18.Flags = (__gotots_store_18.Flags & ~263040) >>> 0;
            if ((FlowNode__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags & FlowFlagsUnreachable$constant__from_ast()) >>> 0 === 0 && !((containerFlags & ContainerFlagsIsFunctionLike$constant()) === 0)) {
                let bodyData: tsonicTypeScriptRuntime.Location<BodyBase__from_ast> | undefined = Node__from_ast.BodyData(node);
                if (!(bodyData === undefined) && NodeIsPresent__from_ast(BodyBase__from_ast.$storageOf(((bodyData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase__from_ast>).value).Body)) {
                    const __gotots_store_19 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                    __gotots_store_19.Flags = (__gotots_store_19.Flags | 256) >>> 0;
                    if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasExplicitReturn) {
                        const __gotots_store_20 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                        __gotots_store_20.Flags = (__gotots_store_20.Flags | 512) >>> 0;
                    }
                    BodyBase__from_ast.$storageOf(((bodyData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase__from_ast>).value).EndFlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
                }
            }
            if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword) {
                const __gotots_store_21 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                __gotots_store_21.Flags = (__gotots_store_21.Flags | 128) >>> 0;
            }
            if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
                const __gotots_store_22 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                __gotots_store_22.Flags = (__gotots_store_22.Flags | (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitFlags) >>> 0;
                ((Node__from_ast.AsSourceFile(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndFlowNode = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
            }
            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget === undefined)) {
                Binder.$go$private$binder$addAntecedent(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget);
                if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructor$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassStaticBlockDeclaration$constant__from_ast()) {
                    setReturnFlowNode(node, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
                }
            }
            if (!isImmediatelyInvoked) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = saveCurrentFlow;
            }
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget = saveBreakTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget = saveContinueTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget = saveReturnTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget = saveExceptionTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList = saveActiveLabelList;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasExplicitReturn = saveHasExplicitReturn;
            if (!((containerFlags & ContainerFlagsPropagatesThisKeyword$constant()) === 0)) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = saveSeenThisKeyword || (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword;
            }
            else {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = saveSeenThisKeyword;
            }
        }
        else if (!((containerFlags & ContainerFlagsIsInterface$constant()) === 0)) {
            let saveSeenThisKeyword: Binder["seenThisKeyword"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = false;
            Binder.$go$private$binder$bindChildren(b, node);
            if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword) {
                const __gotots_store_23 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                __gotots_store_23.Flags = (__gotots_store_23.Flags | 128) >>> 0;
            }
            else {
                const __gotots_store_24 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                __gotots_store_24.Flags = (__gotots_store_24.Flags & ~128) >>> 0;
            }
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenThisKeyword = saveSeenThisKeyword;
        }
        else {
            Binder.$go$private$binder$bindChildren(b, node);
        }
        if (IsSourceFile__from_ast(node) && IsInJSFile__from_ast(node)) {
            const __gotots_range_1 = Node__from_ast.Statements(node);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                if (IsJSTypeAliasDeclaration__from_ast(statement)) {
                    Binder.$go$private$binder$bindBlockScopedDeclaration(b, statement, SymbolFlagsTypeAlias$constant__from_ast(), SymbolFlagsTypeAliasExcludes$constant__from_ast());
                }
            }
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined)) {
                Binder.$go$private$binder$declareCommonJSVariable(b, "module");
                Binder.$go$private$binder$declareCommonJSVariable(b, "exports");
            }
        }
        if (IsSourceFile__from_ast(node) && IsExternalOrCommonJSModule__from_ast(Node__from_ast.AsSourceFile(node)) || IsAmbientModule__from_ast(node)) {
            Binder.$go$private$binder$bindCommonJSTypeExports(b, Node__from_ast.Symbol(node));
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container = saveContainer;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer = saveThisContainer;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer = savedBlockScopeContainer;
    }
    static $go$private$binder$bindContinueStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$bindBreakOrContinueStatement(b, Node__from_ast.Label(node), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget, ($argument0: {
            value: ActiveLabel;
        } | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined => {
            return ActiveLabel.ContinueTarget($argument0);
        });
    }
    static $go$private$binder$bindDeferredExpandoAssignment(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getParentOfPropertyAssignment(node);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$lookupEntity(b, parent, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer);
        if (__go_symbol === undefined) {
            __go_symbol = Binder.$go$private$binder$lookupEntity(b, parent, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container);
        }
        {
            __go_symbol = getInitializerSymbol(__go_symbol);
            if (!(__go_symbol === undefined)) {
                if (HasDynamicName__from_ast(node)) {
                    Binder.$go$private$binder$bindAnonymousDeclaration(b, node, 67108868, InternalSymbolNameComputed$string__from_ast);
                    Binder.$go$private$binder$addLateBoundAssignmentDeclarationToSymbol(b, node, __go_symbol);
                }
                else {
                    let exports: SymbolTable__from_ast = GetExports__from_ast(__go_symbol);
                    {
                        let existing: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = exports.$value.lookup(Binder.$go$private$binder$getDeclarationName(b, node));
                        if (existing === undefined || !((Symbol__from_ast.$storageOf(((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAssignment$constant__from_ast()) >>> 0 === 0)) {
                            Binder.$go$private$binder$declareSymbol(b, exports, __go_symbol, node, 67108868, SymbolFlagsPropertyExcludes$constant__from_ast());
                        }
                    }
                }
            }
        }
    }
    static $go$private$binder$bindDeferredExpandoAssignments(b: {
        value: Binder;
    } | undefined): void {
        const __gotots_range_0: Binder["expandoAssignments"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandoAssignments;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = ExpandoAssignmentInfo.$copy(ExpandoAssignmentInfo.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
            let info = __gotots_range_value_0;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container = ExpandoAssignmentInfo.$storageOf(info).container;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer = ExpandoAssignmentInfo.$storageOf(info).blockScopeContainer;
            Binder.$go$private$binder$bindDeferredExpandoAssignment(b, ExpandoAssignmentInfo.$storageOf(info).node);
        }
    }
    static $go$private$binder$bindDeleteExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: {
            value: DeleteExpression__from_ast;
        } | undefined = Node__from_ast.AsDeleteExpression(node);
        Binder.$go$private$binder$bindEachChild(b, node);
        if (Node__from_ast.$storageOf((((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast()) {
            Binder.$go$private$binder$bindAssignmentTargetFlow(b, (expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        }
    }
    static $go$private$binder$bindDestructuringAssignmentFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = false;
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken);
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = true;
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Type);
        }
        else {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = true;
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Type);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inAssignmentPattern = false;
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken);
            Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        }
        Binder.$go$private$binder$bindAssignmentTargetFlow(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
    }
    static $go$private$binder$bindDestructuringTargetFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsBinaryExpression__from_ast(node) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast()) {
            Binder.$go$private$binder$bindAssignmentTargetFlow(b, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        }
        else {
            Binder.$go$private$binder$bindAssignmentTargetFlow(b, node);
        }
    }
    static $go$private$binder$bindDoStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: DoStatement__from_ast;
        } | undefined = Node__from_ast.AsDoStatement(node);
        let preDoLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createLoopLabel(b);
        let preConditionLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$setContinueTarget(b, node, Binder.$go$private$binder$createBranchLabel(b));
        let postDoLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$addAntecedent(b, preDoLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = preDoLabel;
        Binder.$go$private$binder$bindIterativeStatement(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, postDoLabel, preConditionLabel);
        Binder.$go$private$binder$addAntecedent(b, preConditionLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preConditionLabel);
        Binder.$go$private$binder$bindCondition(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, preDoLabel, postDoLabel);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postDoLabel);
    }
    static $go$private$binder$bindEach(b: {
        value: Binder;
    } | undefined, nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): void {
        const __gotots_range_8 = nodes;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
            const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_7);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
            Binder.$go$private$binder$bind(b, node);
        }
    }
    static $go$private$binder$bindEachChild(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Node__from_ast.ForEachChild(node, new Visitor__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bindFunc));
    }
    static $go$private$binder$bindEachStatementFunctionsFirst(b: {
        value: Binder;
    } | undefined, statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): void {
        const __gotots_range_3 = NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionDeclaration$constant__from_ast()) {
                Binder.$go$private$binder$bind(b, node);
            }
        }
        const __gotots_range_4 = NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionDeclaration$constant__from_ast())) {
                Binder.$go$private$binder$bind(b, node);
            }
        }
    }
    static $go$private$binder$bindEnumDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsEnumConst__from_ast(node)) {
            Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsConstEnum$constant__from_ast(), SymbolFlagsConstEnumExcludes$constant__from_ast());
        }
        else {
            Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsRegularEnum$constant__from_ast(), SymbolFlagsRegularEnumExcludes$constant__from_ast());
        }
    }
    static $go$private$binder$bindExpandoPropertyAssignment(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_slice_build_0: Binder["expandoAssignments"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandoAssignments;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void ExpandoAssignmentInfo.$storageOf, (void ExpandoAssignmentInfo.$fromStorage,
                {
                    node: node,
                    container: (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container,
                    blockScopeContainer: (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer
                })));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<ExpandoAssignmentInfo$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, ExpandoAssignmentInfo.$storageOf(ExpandoAssignmentInfo.$copy(ExpandoAssignmentInfo.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void ExpandoAssignmentInfo.$storageOf, (void ExpandoAssignmentInfo.$fromStorage,
                {
                    node: node,
                    container: (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container,
                    blockScopeContainer: (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.blockScopeContainer
                })));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, ExpandoAssignmentInfo.$zeroStorage());
            }
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandoAssignments = __gotots_slice_build_1;
    }
    static $go$private$binder$bindExportAssignment(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container;
        if (Node__from_ast.Symbol(container) === undefined && IsExportAssignment__from_ast(node)) {
            Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsValue$constant__from_ast(), Binder.$go$private$binder$getDeclarationName(b, node));
        }
        else {
            let flags = IfElse$Named_ast$SymbolFlags(ExpressionIsAlias__from_ast(Node__from_ast.Expression(node)), SymbolFlagsAlias$constant__from_ast(), SymbolFlagsProperty$constant__from_ast());
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol(container)), Node__from_ast.Symbol(container), node, flags, SymbolFlagsAll$constant__from_ast());
            if ((Node__from_ast.AsExportAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
                SetValueDeclaration(__go_symbol, node);
            }
        }
    }
    static $go$private$binder$bindExportDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let decl: {
            value: ExportDeclaration__from_ast;
        } | undefined = Node__from_ast.AsExportDeclaration(node);
        if (Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container) === undefined) {
            Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsExportStar$constant__from_ast(), Binder.$go$private$binder$getDeclarationName(b, node));
        }
        else if ((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined) {
            Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container)), Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), node, SymbolFlagsExportStar$constant__from_ast(), SymbolFlagsNone$constant__from_ast());
        }
        else if (IsNamespaceExport__from_ast((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause)) {
            Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container)), Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause, SymbolFlagsAlias$constant__from_ast(), SymbolFlagsAliasExcludes$constant__from_ast());
        }
    }
    static $go$private$binder$bindExportsOrObjectDefineProperty(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (Binder.$go$private$binder$setCommonJSModuleIndicator(b, node)) {
            Binder.$go$private$binder$trackNestedCJSExport(b, node);
            const __gotots_store_4 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_4, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let flags = IfElse$Named_ast$SymbolFlags(IsBinaryExpression__from_ast(node) && ExpressionIsAlias__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right), SymbolFlagsAlias$constant__from_ast(), SymbolFlagsFunctionScopedVariable$constant__from_ast());
            Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol(container)), Node__from_ast.Symbol(container), node, flags, SymbolFlagsFunctionScopedVariableExcludes$constant__from_ast());
        }
    }
    static $go$private$binder$bindExpressionStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast> | undefined = Node__from_ast.AsExpressionStatement(node);
        Binder.$go$private$binder$bind(b, ExpressionStatement__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).Expression);
        Binder.$go$private$binder$maybeBindExpressionFlowIfCall(b, ExpressionStatement__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).Expression);
    }
    static $go$private$binder$bindForInOrForOfStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: ForInOrOfStatement__from_ast;
        } | undefined = Node__from_ast.AsForInOrOfStatement(node);
        let preLoopLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$setContinueTarget(b, node, Binder.$go$private$binder$createLoopLabel(b));
        let postLoopLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        Binder.$go$private$binder$addAntecedent(b, preLoopLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = preLoopLabel;
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForOfStatement$constant__from_ast()) {
            Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier);
        }
        Binder.$go$private$binder$addAntecedent(b, postLoopLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        if (!(Node__from_ast.$storageOf((((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclarationList$constant__from_ast())) {
            Binder.$go$private$binder$bindAssignmentTargetFlow(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        }
        Binder.$go$private$binder$bindIterativeStatement(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement, postLoopLabel, preLoopLabel);
        Binder.$go$private$binder$addAntecedent(b, preLoopLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postLoopLabel);
    }
    static $go$private$binder$bindForStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: ForStatement__from_ast;
        } | undefined = Node__from_ast.AsForStatement(node);
        let preLoopLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$setContinueTarget(b, node, Binder.$go$private$binder$createLoopLabel(b));
        let preBodyLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let preIncrementorLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let postLoopLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        Binder.$go$private$binder$addAntecedent(b, preLoopLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = preLoopLabel;
        Binder.$go$private$binder$bindCondition(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition, preBodyLabel, postLoopLabel);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preBodyLabel);
        Binder.$go$private$binder$bindIterativeStatement(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, postLoopLabel, preIncrementorLabel);
        Binder.$go$private$binder$addAntecedent(b, preIncrementorLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preIncrementorLabel);
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
        Binder.$go$private$binder$addAntecedent(b, preLoopLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postLoopLabel);
    }
    static $go$private$binder$bindFunctionDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0 && IsAsyncFunction__from_ast(node)) {
            const __gotots_store_6 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_6.emitFlags = (__gotots_store_6.emitFlags | 262144) >>> 0;
        }
        Binder.$go$private$binder$checkStrictModeFunctionName(b, node);
        Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsFunction$constant__from_ast(), SymbolFlagsFunctionExcludes$constant__from_ast());
    }
    static $go$private$binder$bindFunctionExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0 && IsAsyncFunction__from_ast(node)) {
            const __gotots_store_7 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_7.emitFlags = (__gotots_store_7.emitFlags | 262144) >>> 0;
        }
        setFlowNode(node, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        let bindingName = InternalSymbolNameFunction$string__from_ast;
        if (IsFunctionExpression__from_ast(node) && !(FunctionExpression__from_ast.Name(Node__from_ast.AsFunctionExpression(node)) === undefined)) {
            Binder.$go$private$binder$checkStrictModeFunctionName(b, node);
            bindingName = Node__from_ast.Text(FunctionExpression__from_ast.Name(Node__from_ast.AsFunctionExpression(node)));
        }
        Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsFunction$constant__from_ast(), bindingName);
    }
    static $go$private$binder$bindFunctionOrConstructorType(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$newSymbol(b, SymbolFlagsSignature$constant__from_ast(), Binder.$go$private$binder$getDeclarationName(b, node));
        Binder.$go$private$binder$addDeclarationToSymbol(b, __go_symbol, node, SymbolFlagsSignature$constant__from_ast());
        let typeLiteralSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$newSymbol(b, SymbolFlagsTypeLiteral$constant__from_ast(), InternalSymbolNameType$string__from_ast);
        Binder.$go$private$binder$addDeclarationToSymbol(b, typeLiteralSymbol, node, SymbolFlagsTypeLiteral$constant__from_ast());
        Symbol__from_ast.$storageOf(((typeLiteralSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members = new SymbolTable__from_ast(GoMap.make(0, [])).$value;
        new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((typeLiteralSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.store(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol);
    }
    static $go$private$binder$bindIfStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined = Node__from_ast.AsIfStatement(node);
        let thenLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let elseLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let postIfLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$bindCondition(b, IfStatement__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).Expression, thenLabel, elseLabel);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, thenLabel);
        Binder.$go$private$binder$bind(b, IfStatement__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ThenStatement);
        Binder.$go$private$binder$addAntecedent(b, postIfLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, elseLabel);
        Binder.$go$private$binder$bind(b, IfStatement__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement);
        Binder.$go$private$binder$addAntecedent(b, postIfLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postIfLabel);
    }
    static $go$private$binder$bindImportClause(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(ImportClause__from_ast.Name(Node__from_ast.AsImportClause(node)) === undefined)) {
            Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsAlias$constant__from_ast(), SymbolFlagsAliasExcludes$constant__from_ast());
        }
    }
    static $go$private$binder$bindInitializedVariableFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindVariableDeclaration$constant__from_ast(): {
                name = VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration(node));
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                name = BindingElement__from_ast.Name(Node__from_ast.AsBindingElement(node));
                break;
            }
        }
        if (!(name === undefined) && IsBindingPattern__from_ast(name)) {
            const __gotots_range_9 = Node__from_ast.Elements(name);
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
                const __gotots_range_value_12 = __gotots_range_9.get(__gotots_range_index_8);
                let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
                Binder.$go$private$binder$bindInitializedVariableFlow(b, child);
            }
        }
        else {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createFlowMutation(b, FlowFlagsAssignment$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node);
        }
    }
    static $go$private$binder$bindInitializer(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (node === undefined) {
            return;
        }
        let entryFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
        Binder.$go$private$binder$bind(b, node);
        if (tsonicTypeScriptRuntime.sameLocation(entryFlow, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow)
            ||
                tsonicTypeScriptRuntime.sameLocation(entryFlow, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow)) {
            return;
        }
        let exitFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$addAntecedent(b, exitFlow, entryFlow);
        Binder.$go$private$binder$addAntecedent(b, exitFlow, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, exitFlow);
    }
    static $go$private$binder$bindIterativeStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, breakTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, continueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        let saveBreakTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget;
        let saveContinueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget = breakTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget = continueTarget;
        Binder.$go$private$binder$bind(b, node);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget = saveBreakTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentContinueTarget = saveContinueTarget;
    }
    static $go$private$binder$bindJsxAttribute(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): void {
        Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, symbolFlags, symbolExcludes);
    }
    static $go$private$binder$bindJsxAttributes(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsObjectLiteral$constant__from_ast(), InternalSymbolNameJSXAttributes$string__from_ast);
    }
    static $go$private$binder$bindLabeledStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: LabeledStatement__from_ast;
        } | undefined = Node__from_ast.AsLabeledStatement(node);
        let postStatementLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList =
            { value: new ActiveLabel((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList, postStatementLabel, void 0, Node__from_ast.Text((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label), false) };
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label);
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.referenced) {
            const __gotots_store_38 = Node__from_ast.$storageOf((((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
            __gotots_store_38.Flags = (__gotots_store_38.Flags | 134217728) >>> 0;
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
        Binder.$go$private$binder$addAntecedent(b, postStatementLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postStatementLabel);
    }
    static $go$private$binder$bindLogicalLikeExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, trueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, falseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
        let preRightLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        if (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAmpersandAmpersandToken$constant__from_ast() || Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAmpersandAmpersandEqualsToken$constant__from_ast()) {
            Binder.$go$private$binder$bindCondition(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, preRightLabel, falseTarget);
        }
        else {
            Binder.$go$private$binder$bindCondition(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, trueTarget, preRightLabel);
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preRightLabel);
        Binder.$go$private$binder$bind(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken);
        if (IsLogicalOrCoalescingAssignmentOperator__from_ast(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
            Binder.$go$private$binder$doWithConditionalBranches(b, ($argument0: {
                value: Binder;
            } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return Binder.$go$private$binder$bind($argument0, $argument1);
            }, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, trueTarget, falseTarget);
            Binder.$go$private$binder$bindAssignmentTargetFlow(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            Binder.$go$private$binder$addAntecedent(b, trueTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsTrueCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
            Binder.$go$private$binder$addAntecedent(b, falseTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsFalseCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
        }
        else {
            Binder.$go$private$binder$bindCondition(b, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, trueTarget, falseTarget);
        }
    }
    static $go$private$binder$bindModifiers(b: {
        value: Binder;
    } | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): void {
        if (!(modifiers === undefined)) {
            Binder.$go$private$binder$bindEach(b, (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes);
        }
    }
    static $go$private$binder$bindModuleDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$setExportContextFlag(b, node);
        if (IsAmbientModule__from_ast(node)) {
            if (HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast())) {
                Binder.$go$private$binder$errorOnFirstToken(b, node, $state__diagnostics.X_export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible, RuntimeSlice.nil<GoInterface | undefined>());
            }
            if (IsModuleAugmentationExternal__from_ast(node)) {
                Binder.$go$private$binder$declareModuleSymbol(b, node);
            }
            else {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ModuleDeclaration__from_ast.Name(Node__from_ast.AsModuleDeclaration(node));
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsValueModule$constant__from_ast(), SymbolFlagsValueModuleExcludes$constant__from_ast());
                if (IsStringLiteral__from_ast(name)) {
                    let pattern = TryParsePattern__from_core(Node__from_ast.Text(name));
                    if (!Pattern__from_core.IsValid(pattern)) {
                        Binder.$go$private$binder$errorOnFirstToken(b, name, $state__diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(Node__from_ast.Text(name))]));
                    }
                    else if (Pattern__from_core.$storageOf(pattern).StarIndex >= 0) {
                        (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.PatternAmbientModules = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.PatternAmbientModules.append(void 0, [
                            { value: new PatternAmbientModule__from_ast(Pattern__from_core.$copy(pattern), __go_symbol) },
                        ]);
                    }
                }
            }
        }
        else {
            let state = Binder.$go$private$binder$declareModuleSymbol(b, node);
            if (!(state === ModuleInstanceStateNonInstantiated$constant__from_ast())) {
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(node);
                let __gotots_logical_result_0 = ((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (304)) >>> 0 === 0) && state === ModuleInstanceStateConstEnumOnly$constant__from_ast();
                if (__gotots_logical_result_0) {
                    const __gotots_store_9 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_logical_result_0 = !Set__from_collections.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "notConstEnumOnlyModules"), __go_symbol);
                }
                let constEnumOnlyModule = __gotots_logical_result_0;
                if (constEnumOnlyModule) {
                    const __gotots_store_10 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
                    __gotots_store_10.Flags = (__gotots_store_10.Flags | 268435456) >>> 0;
                }
                else {
                    const __gotots_store_11 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
                    __gotots_store_11.Flags = (__gotots_store_11.Flags & ~268435456) >>> 0;
                    const __gotots_store_12 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    Set$Add$PointerTo_Named_ast$Symbol(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "notConstEnumOnlyModules"), __go_symbol);
                }
            }
        }
    }
    static $go$private$binder$bindModuleExportsAssignment(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (Binder.$go$private$binder$setCommonJSModuleIndicator(b, node)) {
            Binder.$go$private$binder$trackNestedCJSExport(b, node);
            const __gotots_store_3 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_3, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let flags = IfElse$Named_ast$SymbolFlags(ExpressionIsAlias__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right), SymbolFlagsAlias$constant__from_ast(), SymbolFlagsProperty$constant__from_ast());
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol(container)), Node__from_ast.Symbol(container), node, flags, 0);
            SetValueDeclaration(__go_symbol, node);
        }
    }
    static $go$private$binder$bindNamespaceExportDeclaration(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(Node__from_ast.Modifiers(node) === undefined)) {
            Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Modifiers_cannot_appear_here, RuntimeSlice.nil<GoInterface | undefined>());
        }
        __gotots_control_target_3: {
            if (!IsSourceFile__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Global_module_exports_may_only_appear_at_top_level, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else if (!IsExternalModule__from_ast(Node__from_ast.AsSourceFile(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
                Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Global_module_exports_may_only_appear_in_module_files, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else if (!((Node__from_ast.AsSourceFile(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
                Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Global_module_exports_may_only_appear_in_declaration_files, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else {
                const __gotots_receiver_1 = b;
                const __gotots_store_13 = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value;
                const __gotots_argument_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "GlobalExports");
                const __gotots_argument_4 = GetSymbolTable__from_ast(__gotots_argument_3);
                const __gotots_argument_5 = DeclarationBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol;
                const __gotots_argument_6 = node;
                const __gotots_argument_7 = SymbolFlagsAlias$constant__from_ast();
                const __gotots_argument_8 = SymbolFlagsAliasExcludes$constant__from_ast();
                Binder.$go$private$binder$declareSymbol(__gotots_receiver_1, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
            }
        }
    }
    static $go$private$binder$bindNodeList(b: {
        value: Binder;
    } | undefined, nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): void {
        if (!(nodeList === undefined)) {
            Binder.$go$private$binder$bindEach(b, NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        }
    }
    static $go$private$binder$bindNonNullExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsOptionalChain__from_ast(node)) {
            Binder.$go$private$binder$bindOptionalChainFlow(b, node);
        }
        else {
            Binder.$go$private$binder$bindEachChild(b, node);
        }
    }
    static $go$private$binder$bindOptionalChain(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, trueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, falseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        let preChainLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = void 0;
        if (IsOptionalChainRoot__from_ast(node)) {
            preChainLabel = Binder.$go$private$binder$createBranchLabel(b);
        }
        Binder.$go$private$binder$bindOptionalExpression(b, Node__from_ast.Expression(node), IfElse$PointerTo_Named_ast$FlowNode(!(preChainLabel === undefined), preChainLabel, trueTarget), falseTarget);
        if (!(preChainLabel === undefined)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preChainLabel);
        }
        Binder.$go$private$binder$doWithConditionalBranches(b, ($argument0: {
            value: Binder;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return Binder.$go$private$binder$bindOptionalChainRest($argument0, $argument1);
        }, node, trueTarget, falseTarget);
        if (IsOutermostOptionalChain__from_ast(node)) {
            Binder.$go$private$binder$addAntecedent(b, trueTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsTrueCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
            Binder.$go$private$binder$addAntecedent(b, falseTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsFalseCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
        }
    }
    static $go$private$binder$bindOptionalChainFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (isTopLevelLogicalExpression(node)) {
            let postExpressionLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
            let saveCurrentFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
            let saveHasFlowEffects: Binder["hasFlowEffects"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects;
            Binder.$go$private$binder$bindOptionalChain(b, node, postExpressionLabel, postExpressionLabel);
            if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postExpressionLabel);
            }
            else {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = saveCurrentFlow;
            }
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects || saveHasFlowEffects;
        }
        else {
            Binder.$go$private$binder$bindOptionalChain(b, node, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget);
        }
    }
    static $go$private$binder$bindOptionalChainRest(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyAccessExpression$constant__from_ast(): {
                Binder.$go$private$binder$bind(b, Node__from_ast.QuestionDotToken(node));
                Binder.$go$private$binder$bind(b, Node__from_ast.Name(node));
                break;
            }
            case KindElementAccessExpression$constant__from_ast(): {
                Binder.$go$private$binder$bind(b, Node__from_ast.QuestionDotToken(node));
                Binder.$go$private$binder$bind(b, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                Binder.$go$private$binder$bind(b, Node__from_ast.QuestionDotToken(node));
                Binder.$go$private$binder$bindNodeList(b, Node__from_ast.TypeArgumentList(node));
                Binder.$go$private$binder$bindEach(b, Node__from_ast.Arguments(node));
                break;
            }
        }
        return false;
    }
    static $go$private$binder$bindOptionalExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, trueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, falseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        Binder.$go$private$binder$doWithConditionalBranches(b, ($argument0: {
            value: Binder;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return Binder.$go$private$binder$bind($argument0, $argument1);
        }, node, trueTarget, falseTarget);
        if (!IsOptionalChain__from_ast(node) || IsOutermostOptionalChain__from_ast(node)) {
            Binder.$go$private$binder$addAntecedent(b, trueTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsTrueCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
            Binder.$go$private$binder$addAntecedent(b, falseTarget, Binder.$go$private$binder$createFlowCondition(b, FlowFlagsFalseCondition$constant__from_ast(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node));
        }
    }
    static $go$private$binder$bindParameter(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let decl: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(node);
        if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0) {
            Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, ParameterDeclaration__from_ast.Name(decl));
        }
        if (IsBindingPattern__from_ast(ParameterDeclaration__from_ast.Name(decl))) {
            let index = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.Parameters(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
            Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsFunctionScopedVariable$constant__from_ast(), "__" + strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(index))));
        }
        else {
            Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsFunctionScopedVariable$constant__from_ast(), SymbolFlagsParameterExcludes$constant__from_ast());
        }
        if (IsParameterPropertyDeclaration__from_ast(node, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            let classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            let flags = (SymbolFlagsProperty$constant__from_ast() | IfElse$Named_ast$SymbolFlags(!(ParameterDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken === undefined), SymbolFlagsOptional$constant__from_ast(), SymbolFlagsNone$constant__from_ast())) >>> 0;
            Binder.$go$private$binder$declareSymbol(b, GetMembers__from_ast(Node__from_ast.Symbol(classDeclaration)), Node__from_ast.Symbol(classDeclaration), node, flags, SymbolFlagsPropertyExcludes$constant__from_ast());
        }
    }
    static $go$private$binder$bindParameterFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let param: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(node);
        const __gotots_receiver_6 = b;
        const __gotots_store_39 = ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
        const __gotots_argument_27 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_39, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
        Binder.$go$private$binder$bindModifiers(__gotots_receiver_6, __gotots_argument_27);
        Binder.$go$private$binder$bind(b, ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken);
        Binder.$go$private$binder$bind(b, ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken);
        Binder.$go$private$binder$bind(b, ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type);
        Binder.$go$private$binder$bindInitializer(b, ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
        Binder.$go$private$binder$bind(b, ParameterDeclaration__from_ast.Name(param));
    }
    static $go$private$binder$bindPostfixUnaryExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: {
            value: PostfixUnaryExpression__from_ast;
        } | undefined = Node__from_ast.AsPostfixUnaryExpression(node);
        Binder.$go$private$binder$bindEachChild(b, node);
        if ((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator === KindPlusPlusToken$constant__from_ast() || (expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator === KindMinusMinusToken$constant__from_ast()) {
            Binder.$go$private$binder$bindAssignmentTargetFlow(b, (expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand);
        }
    }
    static $go$private$binder$bindPrefixUnaryExpressionFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined = Node__from_ast.AsPrefixUnaryExpression(node);
        if (PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindExclamationToken$constant__from_ast()) {
            let saveTrueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget = saveTrueTarget;
            Binder.$go$private$binder$bindEachChild(b, node);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget = saveTrueTarget;
        }
        else {
            Binder.$go$private$binder$bindEachChild(b, node);
            if (PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindPlusPlusToken$constant__from_ast() || PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindMinusMinusToken$constant__from_ast()) {
                Binder.$go$private$binder$bindAssignmentTargetFlow(b, PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
            }
        }
    }
    static $go$private$binder$bindPropertyOrMethodOrAccessor(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): void {
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0 && IsAsyncFunction__from_ast(node)) {
            const __gotots_store_5 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_5.emitFlags = (__gotots_store_5.emitFlags | 262144) >>> 0;
        }
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow === undefined) && IsObjectLiteralOrClassExpressionMethodOrAccessor__from_ast(node)) {
            setFlowNode(node, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        }
        if (HasDynamicName__from_ast(node)) {
            Binder.$go$private$binder$bindAnonymousDeclaration(b, node, symbolFlags, InternalSymbolNameComputed$string__from_ast);
        }
        else {
            Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, symbolFlags, symbolExcludes);
        }
    }
    static $go$private$binder$bindPropertyWorker(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let isAutoAccessor = IsAutoAccessorPropertyDeclaration__from_ast(node);
        let includes = IfElse$Named_ast$SymbolFlags(isAutoAccessor, SymbolFlagsAccessor$constant__from_ast(), SymbolFlagsProperty$constant__from_ast());
        let excludes = IfElse$Named_ast$SymbolFlags(isAutoAccessor, SymbolFlagsAccessorExcludes$constant__from_ast(), SymbolFlagsPropertyExcludes$constant__from_ast());
        Binder.$go$private$binder$bindPropertyOrMethodOrAccessor(b, node, (includes | getOptionalSymbolFlagForNode(node)) >>> 0, excludes);
    }
    static $go$private$binder$bindReturnStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$bind(b, Node__from_ast.Expression(node));
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget === undefined)) {
            Binder.$go$private$binder$addAntecedent(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasExplicitReturn = true;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = true;
    }
    static $go$private$binder$bindSourceFileAsExternalModule(b: {
        value: Binder;
    } | undefined): void {
        const __gotots_receiver_5 = b;
        const __gotots_store_37 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_24 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_37, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_25 = SymbolFlagsValueModule$constant__from_ast();
        const __gotots_argument_26 = "\"" + RemoveFileExtension__from_tspath(SourceFile__from_ast.FileName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file)) + "\"";
        Binder.$go$private$binder$bindAnonymousDeclaration(__gotots_receiver_5, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
    }
    static $go$private$binder$bindSourceFileIfExternalModule(b: {
        value: Binder;
    } | undefined): void {
        const __gotots_receiver_2 = b;
        const __gotots_store_14 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_9 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_14, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        Binder.$go$private$binder$setExportContextFlag(__gotots_receiver_2, __gotots_argument_9);
        if (IsExternalOrCommonJSModule__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file)) {
            Binder.$go$private$binder$bindSourceFileAsExternalModule(b);
        }
        else if (IsJsonSourceFile__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file)) {
            Binder.$go$private$binder$bindSourceFileAsExternalModule(b);
            let originalSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = DeclarationBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol;
            const __gotots_receiver_3 = b;
            const __gotots_store_15 = Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
            const __gotots_argument_10 = new $ProjectedPropertyLocation(__gotots_store_15, "Exports", ($go$storage: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): SymbolTable__from_ast => {
                return new SymbolTable__from_ast($go$storage);
            }, ($go$value: SymbolTable__from_ast): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
                return $go$value.$value;
            });
            const __gotots_argument_11 = GetSymbolTable__from_ast(__gotots_argument_10);
            const __gotots_argument_12 = DeclarationBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol;
            const __gotots_store_16 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_13 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_16, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_14 = SymbolFlagsProperty$constant__from_ast();
            const __gotots_argument_15 = SymbolFlagsAll$constant__from_ast();
            Binder.$go$private$binder$declareSymbol(__gotots_receiver_3, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
            DeclarationBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol = originalSymbol;
        }
    }
    static $go$private$binder$bindSwitchStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: SwitchStatement__from_ast;
        } | undefined = Node__from_ast.AsSwitchStatement(node);
        let postSwitchLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        let saveBreakTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget;
        let savePreSwitchCaseFlow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget = postSwitchLabel;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow;
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CaseBlock);
        Binder.$go$private$binder$addAntecedent(b, postSwitchLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        let hasDefault = Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((Node__from_ast.AsCaseBlock((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CaseBlock) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return Node__from_ast.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultClause$constant__from_ast();
        });
        if (!hasDefault) {
            Binder.$go$private$binder$addAntecedent(b, postSwitchLabel, Binder.$go$private$binder$createFlowSwitchClause(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow, node, 0, 0));
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentBreakTarget = saveBreakTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.preSwitchCaseFlow = savePreSwitchCaseFlow;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postSwitchLabel);
    }
    static $go$private$binder$bindThisPropertyAssignment(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!IsInJSFile__from_ast(node)) {
            return;
        }
        let bin: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
        if (IsPropertyAccessExpression__from_ast(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && IsPrivateIdentifier__from_ast(PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(BinaryExpression__from_ast.$storageOf(((bin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left))) || (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer === undefined) {
            return;
        }
        {
            const __gotots_results_0 = Binder.$go$private$binder$getThisClassAndSymbolTable(b);
            let classSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_0[0];
            let symbolTable: SymbolTable__from_ast = __gotots_results_0[1];
            if (!symbolTable.$value.isNil()) {
                if (HasDynamicName__from_ast(node)) {
                    Binder.$go$private$binder$declareSymbolEx(b, symbolTable, classSymbol, node, SymbolFlagsProperty$constant__from_ast(), SymbolFlagsNone$constant__from_ast(), true, true);
                    Binder.$go$private$binder$addLateBoundAssignmentDeclarationToSymbol(b, node, classSymbol);
                }
                else {
                    Binder.$go$private$binder$declareSymbolEx(b, symbolTable, classSymbol, node, 67108868, SymbolFlagsNone$constant__from_ast(), true, false);
                }
            }
            else if (!(Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast())) {
                const __gotots_argument_1 = new $goInterfaceAdapter$string("Unhandled case in bindThisPropertyAssignment: " + Kind_String__from_ast(Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
                GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
            }
        }
    }
    static $go$private$binder$bindThrowStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$bind(b, Node__from_ast.Expression(node));
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = true;
    }
    static $go$private$binder$bindTryStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: TryStatement__from_ast;
        } | undefined = Node__from_ast.AsTryStatement(node);
        let saveReturnTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget;
        let saveExceptionTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget;
        let normalExitLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let returnLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let exceptionLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        if (!((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock === undefined)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget = returnLabel;
        }
        Binder.$go$private$binder$addAntecedent(b, exceptionLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget = exceptionLabel;
        Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock);
        Binder.$go$private$binder$addAntecedent(b, normalExitLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        if (!((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause === undefined)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, exceptionLabel);
            exceptionLabel = Binder.$go$private$binder$createBranchLabel(b);
            Binder.$go$private$binder$addAntecedent(b, exceptionLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget = exceptionLabel;
            Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause);
            Binder.$go$private$binder$addAntecedent(b, normalExitLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget = saveReturnTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget = saveExceptionTarget;
        if (!((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock === undefined)) {
            let finallyLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
            FlowNode__from_ast.$storageOf(((finallyLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents = Binder.$go$private$binder$combineFlowLists(b, FlowNode__from_ast.$storageOf(((normalExitLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents, Binder.$go$private$binder$combineFlowLists(b, FlowNode__from_ast.$storageOf(((exceptionLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents, FlowNode__from_ast.$storageOf(((returnLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents));
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = finallyLabel;
            Binder.$go$private$binder$bind(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock);
            if (!((FlowNode__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags & FlowFlagsUnreachable$constant__from_ast()) >>> 0 === 0)) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
            }
            else {
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget === undefined) && !(FlowNode__from_ast.$storageOf(((returnLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents === undefined)) {
                    Binder.$go$private$binder$addAntecedent(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentReturnTarget, Binder.$go$private$binder$createReduceLabel(b, finallyLabel, FlowNode__from_ast.$storageOf(((returnLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow));
                }
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget === undefined) && !(FlowNode__from_ast.$storageOf(((exceptionLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents === undefined)) {
                    Binder.$go$private$binder$addAntecedent(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget, Binder.$go$private$binder$createReduceLabel(b, finallyLabel, FlowNode__from_ast.$storageOf(((exceptionLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow));
                }
                if (!(FlowNode__from_ast.$storageOf(((normalExitLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents === undefined)) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createReduceLabel(b, finallyLabel, FlowNode__from_ast.$storageOf(((normalExitLabel ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
                }
                else {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
                }
            }
        }
        else {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, normalExitLabel);
        }
    }
    static $go$private$binder$bindTypeParameter(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInferType$constant__from_ast()) {
            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Binder.$go$private$binder$getInferTypeContainer(b, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            if (!(container === undefined)) {
                Binder.$go$private$binder$declareSymbol(b, GetLocals__from_ast(container), void 0, node, SymbolFlagsTypeParameter$constant__from_ast(), SymbolFlagsTypeParameterExcludes$constant__from_ast());
            }
            else {
                Binder.$go$private$binder$bindAnonymousDeclaration(b, node, SymbolFlagsTypeParameter$constant__from_ast(), Binder.$go$private$binder$getDeclarationName(b, node));
            }
        }
        else {
            Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsTypeParameter$constant__from_ast(), SymbolFlagsTypeParameterExcludes$constant__from_ast());
        }
    }
    static $go$private$binder$bindVariableDeclarationFlow(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$bindEachChild(b, node);
        if (!(Node__from_ast.Initializer(node) === undefined) || IsForInOrOfStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            Binder.$go$private$binder$bindInitializedVariableFlow(b, node);
        }
    }
    static $go$private$binder$bindVariableDeclarationOrBindingElement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, Node__from_ast.Name(node));
        {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
            if (!(name === undefined) && !IsBindingPattern__from_ast(name)) {
                __gotots_control_target_1: {
                    if (IsVariableDeclarationInitializedToRequire__from_ast(node)) {
                        Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsAlias$constant__from_ast(), SymbolFlagsAliasExcludes$constant__from_ast());
                    }
                    else if (IsBlockOrCatchScoped__from_ast(node)) {
                        Binder.$go$private$binder$bindBlockScopedDeclaration(b, node, SymbolFlagsBlockScopedVariable$constant__from_ast(), SymbolFlagsBlockScopedVariableExcludes$constant__from_ast());
                    }
                    else if (IsPartOfParameterDeclaration__from_ast(node)) {
                        Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsFunctionScopedVariable$constant__from_ast(), SymbolFlagsParameterExcludes$constant__from_ast());
                    }
                    else {
                        Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, SymbolFlagsFunctionScopedVariable$constant__from_ast(), SymbolFlagsFunctionScopedVariableExcludes$constant__from_ast());
                    }
                }
            }
        }
    }
    static $go$private$binder$bindWhileStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let stmt: {
            value: WhileStatement__from_ast;
        } | undefined = Node__from_ast.AsWhileStatement(node);
        let preWhileLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$setContinueTarget(b, node, Binder.$go$private$binder$createLoopLabel(b));
        let preBodyLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        let postWhileLabel: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$createBranchLabel(b);
        Binder.$go$private$binder$addAntecedent(b, preWhileLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = preWhileLabel;
        Binder.$go$private$binder$bindCondition(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, preBodyLabel, postWhileLabel);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, preBodyLabel);
        Binder.$go$private$binder$bindIterativeStatement(b, (stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, postWhileLabel, preWhileLabel);
        Binder.$go$private$binder$addAntecedent(b, preWhileLabel, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$finishFlowLabel(b, postWhileLabel);
    }
    static $go$private$binder$checkContextualIdentifier(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (SourceFile__from_ast.Diagnostics((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file).length === 0 && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0 && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0 && !IsIdentifierName__from_ast(node)) {
            let originalKeywordKind = GetIdentifierToken__from_scanner(Node__from_ast.Text(node));
            if (originalKeywordKind === KindIdentifier$constant__from_ast()) {
                return;
            }
            if (originalKeywordKind >= KindFirstFutureReservedWord$constant__from_ast() && originalKeywordKind <= KindLastFutureReservedWord$constant__from_ast()) {
                Binder.$go$private$binder$errorOnNode(b, node, Binder.$go$private$binder$getStrictModeIdentifierMessage(b, node), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(DeclarationNameToString__from_scanner(node))]));
            }
            else if (originalKeywordKind === KindAwaitKeyword$constant__from_ast()) {
                if (IsExternalModule__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file) && IsInTopLevelContext__from_ast(node)) {
                    Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(DeclarationNameToString__from_scanner(node))]));
                }
                else if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAwaitContext$constant__from_ast()) >>> 0 === 0)) {
                    Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(DeclarationNameToString__from_scanner(node))]));
                }
            }
            else if (originalKeywordKind === KindYieldKeyword$constant__from_ast() && !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsYieldContext$constant__from_ast()) >>> 0 === 0)) {
                Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(DeclarationNameToString__from_scanner(node))]));
            }
        }
    }
    static $go$private$binder$checkPrivateIdentifier(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (Node__from_ast.Text(node) === "#constructor") {
            if (SourceFile__from_ast.Diagnostics((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file).length === 0) {
                Binder.$go$private$binder$errorOnNode(b, node, $state__diagnostics.X_constructor_is_a_reserved_word, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(DeclarationNameToString__from_scanner(node))]));
            }
        }
    }
    static $go$private$binder$checkStrictModeBinaryExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
        if (IsLeftHandSideExpression__from_ast(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && IsAssignmentOperator__from_ast(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
            Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        }
    }
    static $go$private$binder$checkStrictModeCatchClause(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let clause: {
            value: CatchClause__from_ast;
        } | undefined = Node__from_ast.AsCatchClause(node);
        if (!((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration === undefined)) {
            Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration)));
        }
    }
    static $go$private$binder$checkStrictModeDeleteExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: {
            value: DeleteExpression__from_ast;
        } | undefined = Node__from_ast.AsDeleteExpression(node);
        if (Node__from_ast.$storageOf((((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
            Binder.$go$private$binder$errorOnNode(b, (expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, $state__diagnostics.X_delete_cannot_be_called_on_an_identifier_in_strict_mode, RuntimeSlice.nil<GoInterface | undefined>());
        }
    }
    static $go$private$binder$checkStrictModeEvalOrArguments(b: {
        value: Binder;
    } | undefined, contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(name === undefined) && isEvalOrArgumentsIdentifier(name)) {
            Binder.$go$private$binder$errorOnNode(b, name, Binder.$go$private$binder$getStrictModeEvalOrArgumentsMessage(b, contextNode), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(Node__from_ast.Text(name))]));
        }
    }
    static $go$private$binder$checkStrictModeFunctionName(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0) {
            Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, Node__from_ast.Name(node));
        }
    }
    static $go$private$binder$checkStrictModeLabeledStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let data: {
            value: LabeledStatement__from_ast;
        } | undefined = Node__from_ast.AsLabeledStatement(node);
        if (IsDeclarationStatement__from_ast((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement) || IsVariableStatement__from_ast((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement)) {
            Binder.$go$private$binder$errorOnFirstToken(b, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label, $state__diagnostics.A_label_is_not_allowed_here, RuntimeSlice.nil<GoInterface | undefined>());
        }
    }
    static $go$private$binder$checkStrictModePostfixUnaryExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand);
    }
    static $go$private$binder$checkStrictModePrefixUnaryExpression(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let expr: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined = Node__from_ast.AsPrefixUnaryExpression(node);
        if (PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindPlusPlusToken$constant__from_ast() || PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindMinusMinusToken$constant__from_ast()) {
            Binder.$go$private$binder$checkStrictModeEvalOrArguments(b, node, PrefixUnaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
        }
    }
    static $go$private$binder$checkStrictModeWithStatement(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Binder.$go$private$binder$errorOnFirstToken(b, node, $state__diagnostics.X_with_statements_are_not_allowed_in_strict_mode, RuntimeSlice.nil<GoInterface | undefined>());
    }
    static $go$private$binder$combineFlowLists(b: {
        value: Binder;
    } | undefined, head: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined, tail: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined {
        if (head === undefined) {
            return tail;
        }
        return Binder.$go$private$binder$newFlowList(b, FlowList__from_ast.$storageOf(((head ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Flow, Binder.$go$private$binder$combineFlowLists(b, FlowList__from_ast.$storageOf(((head ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Next, tail));
    }
    static $go$private$binder$createBranchLabel(b: {
        value: Binder;
    } | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        return Binder.$go$private$binder$newFlowNode(b, FlowFlagsBranchLabel$constant__from_ast());
    }
    static $go$private$binder$createDiagnosticForNode(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        return NewDiagnostic__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, GetErrorRangeForNode__from_scanner((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, node), message, args);
    }
    static $go$private$binder$createFlowCall(b: {
        value: Binder;
    } | undefined, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        setFlowNodeReferenced(antecedent);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = true;
        return Binder.$go$private$binder$newFlowNodeEx(b, FlowFlagsCall$constant__from_ast(), node, antecedent);
    }
    static $go$private$binder$createFlowCondition(b: {
        value: Binder;
    } | undefined, flags: FlowFlags__from_ast, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        if (!((FlowNode__from_ast.$storageOf(((antecedent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags & FlowFlagsUnreachable$constant__from_ast()) >>> 0 === 0)) {
            return antecedent;
        }
        if (expression === undefined) {
            if (!((flags & FlowFlagsTrueCondition$constant__from_ast()) >>> 0 === 0)) {
                return antecedent;
            }
            return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
        }
        if ((Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTrueKeyword$constant__from_ast() && !((flags & FlowFlagsFalseCondition$constant__from_ast()) >>> 0 === 0) || Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFalseKeyword$constant__from_ast() && !((flags & FlowFlagsTrueCondition$constant__from_ast()) >>> 0 === 0)) && !IsExpressionOfOptionalChainRoot__from_ast(expression) && !IsNullishCoalesce__from_ast(Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
        }
        if (!isNarrowingExpression(expression)) {
            return antecedent;
        }
        setFlowNodeReferenced(antecedent);
        return Binder.$go$private$binder$newFlowNodeEx(b, flags, expression, antecedent);
    }
    static $go$private$binder$createFlowMutation(b: {
        value: Binder;
    } | undefined, flags: FlowFlags__from_ast, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        setFlowNodeReferenced(antecedent);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasFlowEffects = true;
        let result: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$newFlowNodeEx(b, flags, node, antecedent);
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget === undefined)) {
            Binder.$go$private$binder$addAntecedent(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentExceptionTarget, result);
        }
        return result;
    }
    static $go$private$binder$createFlowSwitchClause(b: {
        value: Binder;
    } | undefined, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, switchStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, clauseStart: int, clauseEnd: int): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        setFlowNodeReferenced(antecedent);
        return Binder.$go$private$binder$newFlowNodeEx(b, FlowFlagsSwitchClause$constant__from_ast(), NewFlowSwitchClauseData__from_ast(switchStatement, clauseStart, clauseEnd), antecedent);
    }
    static $go$private$binder$createLoopLabel(b: {
        value: Binder;
    } | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        return Binder.$go$private$binder$newFlowNode(b, FlowFlagsLoopLabel$constant__from_ast());
    }
    static $go$private$binder$createReduceLabel(b: {
        value: Binder;
    } | undefined, target: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, antecedents: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        return Binder.$go$private$binder$newFlowNodeEx(b, FlowFlagsReduceLabel$constant__from_ast(), NewFlowReduceLabelData__from_ast(target, antecedents), antecedent);
    }
    static $go$private$binder$declareClassMember(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (IsStatic__from_ast(node)) {
            return Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container)), Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), node, symbolFlags, symbolExcludes);
        }
        return Binder.$go$private$binder$declareSymbol(b, GetMembers__from_ast(Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container)), Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), node, symbolFlags, symbolExcludes);
    }
    static $go$private$binder$declareCommonJSVariable(b: {
        value: Binder;
    } | undefined, name: gostring): void {
        const __gotots_store_40 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_28 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_40, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let locals: SymbolTable__from_ast = GetLocals__from_ast(__gotots_argument_28);
        if (locals.$value.lookup(name) === undefined) {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$newSymbol(b, 134217729, name);
            const __gotots_receiver_7 = b;
            const __gotots_store_41 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_29 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_41, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations = Binder.$go$private$binder$newSingleDeclaration(__gotots_receiver_7, __gotots_argument_29);
            Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
            if (name === "module") {
                let exportsProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$newSymbol(b, 134217732, "exports");
                Symbol__from_ast.$storageOf(((exportsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                Symbol__from_ast.$storageOf(((exportsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                Symbol__from_ast.$storageOf(((exportsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent = __go_symbol;
                Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members = new SymbolTable__from_ast(GoMap.make(1, [])).$value;
                new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.store("exports", exportsProperty);
            }
            locals.$value.store(name, __go_symbol);
        }
    }
    static $go$private$binder$declareModuleMember(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container;
        let hasExportModifier = !((GetCombinedModifierFlags__from_ast(node) & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0) || IsImplicitlyExportedJSDocDeclaration__from_ast(node);
        if (!((symbolFlags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
            if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportSpecifier$constant__from_ast() || (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast() && hasExportModifier)) {
                return Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol(container)), Node__from_ast.Symbol(container), node, symbolFlags, symbolExcludes);
            }
            return Binder.$go$private$binder$declareSymbol(b, GetLocals__from_ast(container), void 0, node, symbolFlags, symbolExcludes);
        }
        if (!IsAmbientModule__from_ast(node) && (hasExportModifier || !((Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsExportContext$constant__from_ast()) >>> 0 === 0))) {
            if (!IsLocalsContainer__from_ast(container) || (HasSyntacticModifier__from_ast(node, ModifierFlagsDefault$constant__from_ast()) && Binder.$go$private$binder$getDeclarationName(b, node) === InternalSymbolNameMissing$string__from_ast)) {
                return Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol(container)), Node__from_ast.Symbol(container), node, symbolFlags, symbolExcludes);
            }
            let exportKind = SymbolFlagsNone$constant__from_ast();
            if (!((symbolFlags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0)) {
                exportKind = SymbolFlagsExportValue$constant__from_ast();
            }
            let local: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Binder.$go$private$binder$declareSymbol(b, GetLocals__from_ast(container), void 0, node, exportKind, symbolExcludes);
            Symbol__from_ast.$storageOf(((local ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol = Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol(container)), Node__from_ast.Symbol(container), node, symbolFlags, symbolExcludes);
            ExportableBase__from_ast.$storageOf(((Node__from_ast.ExportableData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportableBase__from_ast>).value).LocalSymbol = local;
            return local;
        }
        return Binder.$go$private$binder$declareSymbol(b, GetLocals__from_ast(container), void 0, node, symbolFlags, symbolExcludes);
    }
    static $go$private$binder$declareModuleSymbol(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleInstanceState__from_ast {
        let state = GetModuleInstanceState__from_ast(node);
        let instantiated = !(state === ModuleInstanceStateNonInstantiated$constant__from_ast());
        Binder.$go$private$binder$declareSymbolAndAddToSymbolTable(b, node, IfElse$Named_ast$SymbolFlags(instantiated, SymbolFlagsValueModule$constant__from_ast(), SymbolFlagsNamespaceModule$constant__from_ast()), IfElse$Named_ast$SymbolFlags(instantiated, SymbolFlagsValueModuleExcludes$constant__from_ast(), SymbolFlagsNamespaceModuleExcludes$constant__from_ast()));
        return state;
    }
    static $go$private$binder$declareSourceFileMember(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (IsExternalModule__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file)) {
            return Binder.$go$private$binder$declareModuleMember(b, node, symbolFlags, symbolExcludes);
        }
        const __gotots_receiver_4 = b;
        const __gotots_store_29 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_18 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_29, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_19 = GetLocals__from_ast(__gotots_argument_18);
        const __gotots_argument_20 = void 0;
        const __gotots_argument_21 = node;
        const __gotots_argument_22 = symbolFlags;
        const __gotots_argument_23 = symbolExcludes;
        return Binder.$go$private$binder$declareSymbol(__gotots_receiver_4, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
    }
    static $go$private$binder$declareSymbol(b: {
        value: Binder;
    } | undefined, symbolTable: SymbolTable__from_ast, parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, includes: SymbolFlags__from_ast, excludes: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return Binder.$go$private$binder$declareSymbolEx(b, symbolTable, parent, node, includes, excludes, false, false);
    }
    static $go$private$binder$declareSymbolAndAddToSymbolTable(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolFlags: SymbolFlags__from_ast, symbolExcludes: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        switch (Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindModuleDeclaration$constant__from_ast(): {
                return Binder.$go$private$binder$declareModuleMember(b, node, symbolFlags, symbolExcludes);
                break;
            }
            case KindSourceFile$constant__from_ast(): {
                return Binder.$go$private$binder$declareSourceFileMember(b, node, symbolFlags, symbolExcludes);
                break;
            }
            case KindClassExpression$constant__from_ast():
            case KindClassDeclaration$constant__from_ast(): {
                return Binder.$go$private$binder$declareClassMember(b, node, symbolFlags, symbolExcludes);
                break;
            }
            case KindEnumDeclaration$constant__from_ast(): {
                return Binder.$go$private$binder$declareSymbol(b, GetExports__from_ast(Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container)), Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), node, symbolFlags, symbolExcludes);
                break;
            }
            case KindTypeLiteral$constant__from_ast():
            case KindObjectLiteralExpression$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindJsxAttributes$constant__from_ast(): {
                return Binder.$go$private$binder$declareSymbol(b, GetMembers__from_ast(Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container)), Node__from_ast.Symbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), node, symbolFlags, symbolExcludes);
                break;
            }
            case KindFunctionType$constant__from_ast():
            case KindConstructorType$constant__from_ast():
            case KindCallSignature$constant__from_ast():
            case KindConstructSignature$constant__from_ast():
            case KindIndexSignature$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindMethodSignature$constant__from_ast():
            case KindConstructor$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindArrowFunction$constant__from_ast():
            case KindClassStaticBlockDeclaration$constant__from_ast():
            case KindTypeAliasDeclaration$constant__from_ast():
            case KindJSTypeAliasDeclaration$constant__from_ast():
            case KindMappedType$constant__from_ast(): {
                return Binder.$go$private$binder$declareSymbol(b, GetLocals__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.container), void 0, node, symbolFlags, symbolExcludes);
                break;
            }
        }
        const __gotots_argument_2 = new $goInterfaceAdapter$string("Unhandled case in declareSymbolAndAddToSymbolTable");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$binder$declareSymbolEx(b: {
        value: Binder;
    } | undefined, symbolTable: SymbolTable__from_ast, parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, includes: SymbolFlags__from_ast, excludes: SymbolFlags__from_ast, isReplaceableByMethod: bool, isComputedName: bool): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        Assert__from_debug(isComputedName || !HasDynamicName__from_ast(node), RuntimeSlice.nil<GoInterface | undefined>());
        let isDefaultExport = HasSyntacticModifier__from_ast(node, ModifierFlagsDefault$constant__from_ast()) || IsExportSpecifier__from_ast(node) && ModuleExportNameIsDefault__from_ast(ExportSpecifier__from_ast.Name(Node__from_ast.AsExportSpecifier(node)));
        let name = "";
        __gotots_control_target_4: {
            if (isComputedName) {
                name = InternalSymbolNameComputed$string__from_ast;
            }
            else if (isDefaultExport && !(parent === undefined)) {
                name = InternalSymbolNameDefault$string__from_ast;
            }
            else {
                name = Binder.$go$private$binder$getDeclarationName(b, node);
            }
        }
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        if (name === InternalSymbolNameMissing$string__from_ast) {
            __go_symbol = Binder.$go$private$binder$newSymbol(b, SymbolFlagsNone$constant__from_ast(), InternalSymbolNameMissing$string__from_ast);
        }
        else {
            __go_symbol = symbolTable.$value.lookup(name);
            if (!((includes & SymbolFlagsClassifiable$constant__from_ast()) >>> 0 === 0)) {
                const __gotots_store_26 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "classifiableNames"), name);
            }
            if (__go_symbol === undefined) {
                __go_symbol = Binder.$go$private$binder$newSymbol(b, SymbolFlagsNone$constant__from_ast(), name);
                symbolTable.$value.store(name, __go_symbol);
                if (isReplaceableByMethod) {
                    const __gotots_store_27 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
                    __gotots_store_27.Flags = (__gotots_store_27.Flags | 536870912) >>> 0;
                }
            }
            else if (isReplaceableByMethod && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsReplaceableByMethod$constant__from_ast()) >>> 0 === 0) {
                return __go_symbol;
            }
            else if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & excludes) >>> 0 === 0)) {
                if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsReplaceableByMethod$constant__from_ast()) >>> 0 === 0)) {
                    __go_symbol = Binder.$go$private$binder$newSymbol(b, SymbolFlagsNone$constant__from_ast(), name);
                    symbolTable.$value.store(name, __go_symbol);
                }
                else if (!(!((includes & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAssignment$constant__from_ast()) >>> 0 === 0) || !((includes & SymbolFlagsAssignment$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsVariable$constant__from_ast()) >>> 0 === 0))) {
                    let message: {
                        value: Message__from_diagnostics;
                    } | undefined = void 0;
                    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsBlockScopedVariable$constant__from_ast()) >>> 0 === 0)) {
                        message = $state__diagnostics.Cannot_redeclare_block_scoped_variable_0;
                    }
                    else {
                        message = $state__diagnostics.Duplicate_identifier_0;
                    }
                    let messageNeedsName = true;
                    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0) || !((includes & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
                        message = $state__diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
                        messageNeedsName = false;
                    }
                    let multipleDefaultExports = false;
                    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0) {
                        if (isDefaultExport) {
                            message = $state__diagnostics.A_module_cannot_have_multiple_default_exports;
                            messageNeedsName = false;
                            multipleDefaultExports = true;
                        }
                        else {
                            if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0 && IsExportAssignment__from_ast(node) && !(Node__from_ast.AsExportAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
                                message = $state__diagnostics.A_module_cannot_have_multiple_default_exports;
                                messageNeedsName = false;
                                multipleDefaultExports = true;
                            }
                        }
                    }
                    let declarationName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
                    if (declarationName === undefined) {
                        declarationName = node;
                    }
                    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = void 0;
                    if (messageNeedsName) {
                        diag = Binder.$go$private$binder$createDiagnosticForNode(b, declarationName, message, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(Binder.$go$private$binder$getDisplayName(b, node))]));
                    }
                    else {
                        diag = Binder.$go$private$binder$createDiagnosticForNode(b, declarationName, message, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    if (IsTypeAliasDeclaration__from_ast(node) && NodeIsMissing__from_ast(Node__from_ast.Type(node)) && HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast()) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (2887656)) >>> 0 === 0)) {
                        Diagnostic__from_ast.AddRelatedInfo(diag, Binder.$go$private$binder$createDiagnosticForNode(b, node, $state__diagnostics.Did_you_mean_0, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("export type { " + Node__from_ast.Text(TypeAliasDeclaration__from_ast.Name(Node__from_ast.AsTypeAliasDeclaration(node))) + " }")])));
                    }
                    const __gotots_range_2 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_index_2;
                        const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
                        let index = __gotots_range_value_2;
                        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(declaration);
                        if (decl === undefined) {
                            decl = declaration;
                        }
                        let d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = void 0;
                        if (messageNeedsName) {
                            d = Binder.$go$private$binder$createDiagnosticForNode(b, decl, message, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(Binder.$go$private$binder$getDisplayName(b, declaration))]));
                        }
                        else {
                            d = Binder.$go$private$binder$createDiagnosticForNode(b, decl, message, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        if (multipleDefaultExports) {
                            Diagnostic__from_ast.AddRelatedInfo(d, Binder.$go$private$binder$createDiagnosticForNode(b, declarationName, IfElse$PointerTo_Named_diagnostics$Message(index === 0, $state__diagnostics.Another_export_default_is_here, $state__diagnostics.X_and_here), RuntimeSlice.nil<GoInterface | undefined>()));
                        }
                        Binder.$go$private$binder$addDiagnostic(b, d);
                        if (multipleDefaultExports) {
                            Diagnostic__from_ast.AddRelatedInfo(diag, Binder.$go$private$binder$createDiagnosticForNode(b, decl, $state__diagnostics.The_first_export_default_is_here, RuntimeSlice.nil<GoInterface | undefined>()));
                        }
                    }
                    Binder.$go$private$binder$addDiagnostic(b, diag);
                    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAccessor$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAccessor$constant__from_ast()) >>> 0 === (includes & SymbolFlagsAccessor$constant__from_ast()) >>> 0)) {
                        const __gotots_store_28 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value);
                        __gotots_store_28.Flags = (__gotots_store_28.Flags | 98304) >>> 0;
                    }
                    __go_symbol = Binder.$go$private$binder$newSymbol(b, SymbolFlagsNone$constant__from_ast(), name);
                }
            }
        }
        Binder.$go$private$binder$addDeclarationToSymbol(b, __go_symbol, node, includes);
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) {
            Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent = parent;
        }
        else if (!tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, parent)) {
            const __gotots_argument_16 = new $goInterfaceAdapter$string("Existing symbol parent should match new one");
            GoPanic.raise(__gotots_argument_16 === undefined ? GoPanicNilValue.create() : __gotots_argument_16);
        }
        return __go_symbol;
    }
    static $go$private$binder$doWithConditionalBranches(b: {
        value: Binder;
    } | undefined, action: (($0: {
        value: Binder;
    } | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, trueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, falseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
        let savedTrueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget;
        let savedFalseTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget = trueTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget = falseTarget;
        const __gotots_callee_1 = action;
        const __gotots_argument_33 = b;
        const __gotots_argument_34 = value;
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33, __gotots_argument_34);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentTrueTarget = savedTrueTarget;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFalseTarget = savedFalseTarget;
    }
    static $go$private$binder$errorOnFirstToken(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        let span = GetRangeOfTokenAtPosition__from_scanner((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, Node__from_ast.Pos(node));
        Binder.$go$private$binder$addDiagnostic(b, NewDiagnostic__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, TextRange__from_core.$copy(span), message, args));
    }
    static $go$private$binder$errorOnNode(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        Binder.$go$private$binder$addDiagnostic(b, Binder.$go$private$binder$createDiagnosticForNode(b, node, message, args));
    }
    static $go$private$binder$findActiveLabel(b: {
        value: Binder;
    } | undefined, name: gostring): {
        value: ActiveLabel;
    } | undefined {
        for (let label: {
            value: ActiveLabel;
        } | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList; !(label === undefined); label = (label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next) {
            if ((label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name === name) {
                return label;
            }
        }
        return void 0;
    }
    static $go$private$binder$finishFlowLabel(b: {
        value: Binder;
    } | undefined, label: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        if (FlowNode__from_ast.$storageOf(((label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents === undefined) {
            return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow;
        }
        if (FlowList__from_ast.$storageOf(((FlowNode__from_ast.$storageOf(((label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Next === undefined) {
            return FlowList__from_ast.$storageOf(((FlowNode__from_ast.$storageOf(((label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Flow;
        }
        return label;
    }
    static $go$private$binder$getDeclarationName(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        if (IsExportAssignment__from_ast(node)) {
            return IfElse$string((Node__from_ast.AsExportAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals, InternalSymbolNameExportEquals$string__from_ast, InternalSymbolNameDefault$string__from_ast);
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
        if (!(name === undefined)) {
            if (IsAmbientModule__from_ast(node)) {
                let moduleName = Node__from_ast.Text(name);
                if (IsGlobalScopeAugmentation__from_ast(node)) {
                    return InternalSymbolNameGlobal$string__from_ast;
                }
                return "\"" + moduleName + "\"";
            }
            if (IsPrivateIdentifier__from_ast(name)) {
                let containingClass: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetContainingClass__from_ast(node);
                if (containingClass === undefined) {
                    return InternalSymbolNameMissing$string__from_ast;
                }
                return GetSymbolNameForPrivateIdentifier(Node__from_ast.Symbol(containingClass), Node__from_ast.Text(name));
            }
            if (IsPropertyNameLiteral__from_ast(name) || IsJsxNamespacedName__from_ast(name)) {
                return Node__from_ast.Text(name);
            }
            if (IsComputedPropertyName__from_ast(name)) {
                let nameExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(name);
                if (IsStringOrNumericLiteralLike__from_ast(nameExpression)) {
                    return Node__from_ast.Text(nameExpression);
                }
                if (IsSignedNumericLiteral__from_ast(nameExpression)) {
                    let unaryExpression: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined = Node__from_ast.AsPrefixUnaryExpression(nameExpression);
                    return TokenToString__from_scanner(PrefixUnaryExpression__from_ast.$storageOf(((unaryExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator) + Node__from_ast.Text(PrefixUnaryExpression__from_ast.$storageOf(((unaryExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
                }
                const __gotots_argument_17 = new $goInterfaceAdapter$string("Only computed properties with literal names have declaration names");
                GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
            }
            return InternalSymbolNameMissing$string__from_ast;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindConstructor$constant__from_ast(): {
                return InternalSymbolNameConstructor$string__from_ast;
                break;
            }
            case KindFunctionType$constant__from_ast():
            case KindCallSignature$constant__from_ast(): {
                return InternalSymbolNameCall$string__from_ast;
                break;
            }
            case KindConstructorType$constant__from_ast():
            case KindConstructSignature$constant__from_ast(): {
                return InternalSymbolNameNew$string__from_ast;
                break;
            }
            case KindIndexSignature$constant__from_ast(): {
                return InternalSymbolNameIndex$string__from_ast;
                break;
            }
            case KindExportDeclaration$constant__from_ast(): {
                return InternalSymbolNameExportStar$string__from_ast;
                break;
            }
            case KindSourceFile$constant__from_ast():
            case KindBinaryExpression$constant__from_ast(): {
                return InternalSymbolNameExportEquals$string__from_ast;
                break;
            }
        }
        return InternalSymbolNameMissing$string__from_ast;
    }
    static $go$private$binder$getDisplayName(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        let nameNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (!(nameNode === undefined)) {
            return DeclarationNameToString__from_scanner(nameNode);
        }
        let name = Binder.$go$private$binder$getDeclarationName(b, node);
        if (name !== InternalSymbolNameMissing$string__from_ast) {
            return name;
        }
        return "(Missing)";
    }
    static $go$private$binder$getInferTypeContainer(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let extendsType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            return !(parent === undefined) && IsConditionalTypeNode__from_ast(parent) &&
                tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsConditionalTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendsType, n);
        });
        if (!(extendsType === undefined)) {
            return Node__from_ast.$storageOf(((extendsType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        return void 0;
    }
    static $go$private$binder$getStrictModeEvalOrArgumentsMessage(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        if (!(GetContainingClass__from_ast(node) === undefined)) {
            return $state__diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode;
        }
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined)) {
            return $state__diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
        }
        return $state__diagnostics.Invalid_use_of_0_in_strict_mode;
    }
    static $go$private$binder$getStrictModeIdentifierMessage(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        if (!(GetContainingClass__from_ast(node) === undefined)) {
            return $state__diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode;
        }
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined)) {
            return $state__diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode;
        }
        return $state__diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode;
    }
    static $go$private$binder$getThisClassAndSymbolTable(b: {
        value: Binder;
    } | undefined): [
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined,
        SymbolTable__from_ast
    ] {
        let classSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        let symbolTable: SymbolTable__from_ast = new SymbolTable__from_ast(GoMap.nil());
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer === undefined) {
            return [void 0, new SymbolTable__from_ast(GoMap.nil())];
        }
        switch (Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindFunctionDeclaration$constant__from_ast():
            case KindFunctionExpression$constant__from_ast(): {
                break;
            }
            case KindConstructor$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindClassStaticBlockDeclaration$constant__from_ast(): {
                classSymbol = Node__from_ast.Symbol(Node__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                if (IsStatic__from_ast((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.thisContainer)) {
                    symbolTable = GetExports__from_ast(classSymbol);
                }
                else {
                    symbolTable = GetMembers__from_ast(classSymbol);
                }
                break;
            }
        }
        return [classSymbol, symbolTable];
    }
    static $go$private$binder$hasExportDeclarations(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                statements = Node__from_ast.Statements(node);
                break;
            }
            case KindModuleDeclaration$constant__from_ast(): {
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(node);
                if (!(body === undefined) && IsModuleBlock__from_ast(body)) {
                    statements = Node__from_ast.Statements(body);
                }
                break;
            }
        }
        return Some$PointerTo_Named_ast$Node(statements, (s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return IsExportDeclaration__from_ast(s) || IsExportAssignment__from_ast(s);
        });
    }
    static $go$private$binder$lookupEntity(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (IsIdentifier__from_ast(node)) {
            return Binder.$go$private$binder$lookupName(b, Node__from_ast.Text(node), container);
        }
        if (Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast()) {
            {
                const __gotots_results_1 = Binder.$go$private$binder$getThisClassAndSymbolTable(b);
                let symbolTable: SymbolTable__from_ast = __gotots_results_1[1];
                if (!symbolTable.$value.isNil()) {
                    {
                        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetElementOrPropertyAccessName__from_ast(node);
                        if (!(name === undefined)) {
                            return symbolTable.$value.lookup(Node__from_ast.Text(name));
                        }
                    }
                }
            }
            return void 0;
        }
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getInitializerSymbol(Binder.$go$private$binder$lookupEntity(b, Node__from_ast.Expression(node), container));
            if (!(__go_symbol === undefined) && !new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.isNil()) {
                {
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetElementOrPropertyAccessName__from_ast(node);
                    if (!(name === undefined)) {
                        return new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.lookup(Node__from_ast.Text(name));
                    }
                }
            }
        }
        return void 0;
    }
    static $go$private$binder$lookupName(b: {
        value: Binder;
    } | undefined, name: gostring, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        {
            let localsContainer: tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast> | undefined = Node__from_ast.LocalsContainerData(container);
            if (!(localsContainer === undefined)) {
                {
                    let local: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = new SymbolTable__from_ast(LocalsContainerBase__from_ast.$storageOf(((localsContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast>).value).Locals).$value.lookup(name);
                    if (!(local === undefined)) {
                        return OrElse$PointerTo_Named_ast$Symbol(Symbol__from_ast.$storageOf(((local ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol, local);
                    }
                }
            }
        }
        {
            let declaration: tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast> | undefined = Node__from_ast.DeclarationData(container);
            if (!(declaration === undefined) && !(DeclarationBase__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast>).value).Symbol === undefined)) {
                return new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast>).value).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.lookup(name);
            }
        }
        return void 0;
    }
    static $go$private$binder$maybeBindExpressionFlowIfCall(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsCallExpression__from_ast(node)) {
            if (!(Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) && IsDottedName__from_ast(Node__from_ast.Expression(node))) {
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow = Binder.$go$private$binder$createFlowCall(b, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentFlow, node);
            }
        }
    }
    static $go$private$binder$newFlowList(b: {
        value: Binder;
    } | undefined, head: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, tail: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined {
        const __gotots_store_46 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined = Arena$New$Named_ast$FlowList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "flowListArena"));
        FlowList__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Flow = head;
        FlowList__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowList__from_ast>).value).Next = tail;
        return result;
    }
    static $go$private$binder$newFlowNode(b: {
        value: Binder;
    } | undefined, flags: FlowFlags__from_ast): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        const __gotots_store_1 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Arena$New$Named_ast$FlowNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "flowNodeArena"));
        FlowNode__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags = flags;
        return result;
    }
    static $go$private$binder$newFlowNodeEx(b: {
        value: Binder;
    } | undefined, flags: FlowFlags__from_ast, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, antecedent: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        let result: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined = Binder.$go$private$binder$newFlowNode(b, flags);
        FlowNode__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Node = node;
        FlowNode__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Antecedent = antecedent;
        return result;
    }
    static $go$private$binder$newSingleDeclaration(b: {
        value: Binder;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_43 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return Arena$NewSlice1$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "singleDeclarationsArena"), declaration);
    }
    static $go$private$binder$newSymbol(b: {
        value: Binder;
    } | undefined, flags: SymbolFlags__from_ast, name: gostring): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        const __gotots_store_30 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_30.symbolCount = __gotots_store_30.symbolCount + 1;
        const __gotots_store_31 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Arena$New$Named_ast$Symbol(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "symbolArena"));
        Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags = flags;
        Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name = name;
        return result;
    }
    static $go$private$binder$setCommonJSModuleIndicator(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_logical_result_1 = !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined);
        if (__gotots_logical_result_1) {
            const __gotots_equal_operand_0 = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator;
            const __gotots_store_25 = NodeBase__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            __gotots_logical_result_1 = !tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_25, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
        }
        if (__gotots_logical_result_1) {
            return false;
        }
        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined) {
            (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator = node;
            if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined) {
                Binder.$go$private$binder$bindSourceFileAsExternalModule(b);
            }
        }
        return true;
    }
    static $go$private$binder$setContinueTarget(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, target: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        let label: {
            value: ActiveLabel;
        } | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.activeLabelList;
        for (; !(label === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLabeledStatement$constant__from_ast();) {
            (label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.continueTarget = target;
            label = (label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
            node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        return target;
    }
    static $go$private$binder$setExportContextFlag(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0) && !Binder.$go$private$binder$hasExportDeclarations(b, node)) {
            const __gotots_store_35 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
            __gotots_store_35.Flags = (__gotots_store_35.Flags | 64) >>> 0;
        }
        else {
            const __gotots_store_36 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
            __gotots_store_36.Flags = (__gotots_store_36.Flags & ~64) >>> 0;
        }
    }
    static $go$private$binder$trackNestedCJSExport(b: {
        value: Binder;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(IsSourceFile__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsExpressionStatement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsSourceFile__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nestedCJSExports = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nestedCJSExports.append(void 0, [node]);
        }
    }
}
export class ActiveLabel {
    declare private readonly $goType: void;
    public constructor(public next: {
        value: ActiveLabel;
    } | undefined, public breakTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public continueTarget: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, public name: gostring, public referenced: bool) {
    }
    static $copy($source: ActiveLabel): ActiveLabel {
        return new ActiveLabel($source.next, $source.breakTarget, $source.continueTarget, $source.name, $source.referenced);
    }
    static $equal($left: ActiveLabel, $right: ActiveLabel): bool {
        return $left.next
            ===
                $right.next
            &&
                tsonicTypeScriptRuntime.sameLocation($left.breakTarget, $right.breakTarget) &&
            tsonicTypeScriptRuntime.sameLocation($left.continueTarget, $right.continueTarget) && $left.name === $right.name && $left.referenced === $right.referenced;
    }
    static $hash($source: ActiveLabel): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.next));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.breakTarget));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.continueTarget));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.name));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.referenced));
        return $hash;
    }
    declare private readonly then?: never;
    static BreakTarget(label: {
        value: ActiveLabel;
    } | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        return (label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.breakTarget;
    }
    static ContinueTarget(label: {
        value: ActiveLabel;
    } | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
        return (label ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.continueTarget;
    }
}
export function BindSourceFile(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    if (!SourceFile__from_ast.IsBound(file)) {
        bindSourceFile(file);
    }
}
export function getBinder(): {
    value: Binder;
} | undefined {
    return (($value: GoInterface | undefined): {
        value: Binder;
    } | undefined => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get($state.binderPool));
}
export function putBinder(b: {
    value: Binder;
} | undefined): void {
    void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        new Binder(void 0, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bindFunc, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, 0, false, false, false, false, false, 0, Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return $goMap$MapOf_string_To_Struct_void.nil();
        }), Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
            return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.nil();
        }), Arena__from_core.$zero<Symbol__from_ast>(), Arena__from_core.$zero<FlowNode__from_ast>(), Arena__from_core.$zero<FlowList__from_ast>(), Arena__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<ExpandoAssignmentInfo$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()));
    sync__from_gostdlib.Pool.Put($state.binderPool, new GoInterfaceAdapter(b));
}
export function bindSourceFile(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    SourceFile__from_ast.BindOnce(file, (): void => {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let b: {
                        value: Binder;
                    } | undefined = getBinder();
                    const __gotots_argument_0 = b;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        putBinder(__gotots_argument_0);
                    };
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file = file;
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unreachableFlow = Binder.$go$private$binder$newFlowNode(b, FlowFlagsUnreachable$constant__from_ast());
                    const __gotots_receiver_0 = b;
                    const __gotots_store_0 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    const __gotots_argument_1 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    Binder.$go$private$binder$bind(__gotots_receiver_0, __gotots_argument_1);
                    Binder.$go$private$binder$bindDeferredExpandoAssignments(b);
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.SymbolCount = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symbolCount;
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ClassifiableNames = Set__from_collections.$copy<gostring>((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.classifiableNames);
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NestedCJSExports = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nestedCJSExports;
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
    });
}
export function GetSymbolNameForPrivateIdentifier(containingClassSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, description: gostring): gostring {
    return "\u00FE#" + strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(globalThis.Number(BigInt.asIntN(64, GetSymbolId__from_ast(containingClassSymbol).$value))))) + "@" + description;
}
export function setFlowNodeReferenced(flow: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
    if ((FlowNode__from_ast.$storageOf(((flow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value).Flags & FlowFlagsReferenced$constant__from_ast()) >>> 0 === 0) {
        const __gotots_store_44 = FlowNode__from_ast.$storageOf(((flow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value);
        __gotots_store_44.Flags = (__gotots_store_44.Flags | 2048) >>> 0;
    }
    else {
        const __gotots_store_45 = FlowNode__from_ast.$storageOf(((flow ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNode__from_ast>).value);
        __gotots_store_45.Flags = (__gotots_store_45.Flags | 4096) >>> 0;
    }
}
export function getParentOfPropertyAssignment(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBinaryExpression$constant__from_ast(): {
            return Node__from_ast.Expression(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            break;
        }
        case KindCallExpression$constant__from_ast(): {
            return Node__from_ast.Arguments(node).get(0);
            break;
        }
    }
    const __gotots_argument_30 = new $goInterfaceAdapter$string("Unhandled case in getParentOfPropertyAssignment");
    GoPanic.raise(__gotots_argument_30 === undefined ? GoPanicNilValue.create() : __gotots_argument_30);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function getInitializerSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (__go_symbol === undefined || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) {
        return void 0;
    }
    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    __gotots_control_target_5: {
        if (IsFunctionDeclaration__from_ast(declaration) || IsInJSFile__from_ast(declaration) && IsClassDeclaration__from_ast(declaration)) {
            return __go_symbol;
        }
        else if (IsVariableDeclaration__from_ast(declaration) && (!((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsConst$constant__from_ast()) >>> 0 === 0) || IsInJSFile__from_ast(declaration))) {
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(declaration);
            if (IsExpandoInitializer__from_ast(declaration, initializer)) {
                return Node__from_ast.Symbol(initializer);
            }
        }
        else if (IsBinaryExpression__from_ast(declaration) && IsInJSFile__from_ast(declaration)) {
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
            if (IsExpandoInitializer__from_ast(declaration, initializer)) {
                return Node__from_ast.Symbol(initializer);
            }
        }
    }
    return void 0;
}
export function isUseStrictPrologueDirective(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let nodeText = GetSourceTextOfNodeFromSourceFile__from_scanner(sourceFile, Node__from_ast.Expression(node), false);
    return nodeText === "\"use strict\"" || nodeText === "'use strict'";
}
export function FindUseStrictPrologue(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_range_11 = statements;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
        const __gotots_range_value_14 = __gotots_range_11.get(__gotots_range_index_10);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
        if (IsPrologueDirective__from_ast(statement)) {
            if (isUseStrictPrologueDirective(sourceFile, statement)) {
                return statement;
            }
        }
        else {
            return void 0;
        }
    }
    return void 0;
}
export function isEvalOrArgumentsIdentifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsIdentifier__from_ast(node)) {
        let text = Node__from_ast.Text(node);
        return text === "eval" || text === "arguments";
    }
    return false;
}
export function isLogicalAssignmentExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsLogicalOrCoalescingAssignmentExpression__from_ast(SkipParentheses__from_ast(node));
}
export function setFlowNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flowNode: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
    let data: tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast> | undefined = Node__from_ast.FlowNodeData(node);
    if (!(data === undefined)) {
        FlowNodeBase__from_ast.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FlowNodeBase__from_ast>).value).FlowNode = flowNode;
    }
}
export function setReturnFlowNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, returnFlowNode: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): void {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindConstructor$constant__from_ast(): {
            (Node__from_ast.AsConstructorDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReturnFlowNode = returnFlowNode;
            break;
        }
        case KindFunctionDeclaration$constant__from_ast(): {
            FunctionDeclaration__from_ast.$storageOf(((Node__from_ast.AsFunctionDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).ReturnFlowNode = returnFlowNode;
            break;
        }
        case KindFunctionExpression$constant__from_ast(): {
            (Node__from_ast.AsFunctionExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReturnFlowNode = returnFlowNode;
            break;
        }
        case KindClassStaticBlockDeclaration$constant__from_ast(): {
            (Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReturnFlowNode = returnFlowNode;
            break;
        }
    }
}
export function isGeneratorFunctionExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsFunctionExpression__from_ast(node) && !((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
        FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsFunctionExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken === undefined);
}
export function SetValueDeclaration(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let valueDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    if (valueDeclaration === undefined || isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node) || !(Node__from_ast.$storageOf(((valueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && isEffectiveModuleDeclaration(valueDeclaration)) {
        Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration = node;
    }
}
export function GetContainerFlags(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ContainerFlags {
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindClassExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindClassDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindEnumDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindObjectLiteralExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTypeLiteral$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindJsxAttributes$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindModuleDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindTypeAliasDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindJSTypeAliasDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindMappedType$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindIndexSignature$constant__from_ast();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindSourceFile$constant__from_ast();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_4 = false;
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindSetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindMethodDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_4) {
                __gotots_switch_selection_0 = 4;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_5 = false;
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindClassStaticBlockDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_5) {
                __gotots_switch_selection_0 = 5;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_6 = false;
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindMethodSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindCallSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindFunctionType$constant__from_ast();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindConstructSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindConstructorType$constant__from_ast();
            }
            if (__gotots_switch_match_6) {
                __gotots_switch_selection_0 = 6;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_7 = false;
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindFunctionExpression$constant__from_ast();
            }
            if (__gotots_switch_match_7) {
                __gotots_switch_selection_0 = 7;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_8 = false;
            if (!__gotots_switch_match_8) {
                __gotots_switch_match_8 = __gotots_switch_tag_0 === KindArrowFunction$constant__from_ast();
            }
            if (__gotots_switch_match_8) {
                __gotots_switch_selection_0 = 8;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_9 = false;
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindModuleBlock$constant__from_ast();
            }
            if (__gotots_switch_match_9) {
                __gotots_switch_selection_0 = 9;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_10 = false;
            if (!__gotots_switch_match_10) {
                __gotots_switch_match_10 = __gotots_switch_tag_0 === KindPropertyDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_10) {
                __gotots_switch_selection_0 = 10;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_11 = false;
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindCatchClause$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindForStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindForInStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindForOfStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindCaseBlock$constant__from_ast();
            }
            if (__gotots_switch_match_11) {
                __gotots_switch_selection_0 = 11;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_12 = false;
            if (!__gotots_switch_match_12) {
                __gotots_switch_match_12 = __gotots_switch_tag_0 === KindBlock$constant__from_ast();
            }
            if (__gotots_switch_match_12) {
                __gotots_switch_selection_0 = 12;
            }
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return ContainerFlagsIsContainer$constant();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                return 65;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                return 33;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 3) {
                return 37;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 4) {
                if (IsObjectLiteralOrClassExpressionMethodOrAccessor__from_ast(node)) {
                    return 429;
                }
                __gotots_switch_selection_0 = 5;
            }
            if (__gotots_switch_selection_0 === 5) {
                return 301;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 6) {
                return 557;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 7) {
                return 317;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 8) {
                return 573;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 9) {
                return ContainerFlagsIsControlFlowContainer$constant();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 10) {
                if (!(Node__from_ast.Initializer(node) === undefined)) {
                    return 260;
                }
                else {
                    return ContainerFlagsNone$constant();
                }
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 11) {
                return 34;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 12) {
                if (IsFunctionLike__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsClassStaticBlockDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    return ContainerFlagsNone$constant();
                }
                else {
                    return 34;
                }
                break __gotots_control_target_0;
            }
        }
    }
    return ContainerFlagsNone$constant();
}
export function isNarrowingExpression(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
        case KindThisKeyword$constant__from_ast(): {
            return true;
            break;
        }
        case KindPropertyAccessExpression$constant__from_ast():
        case KindElementAccessExpression$constant__from_ast(): {
            return containsNarrowableReference(expr);
            break;
        }
        case KindCallExpression$constant__from_ast(): {
            return hasNarrowableArgument(expr);
            break;
        }
        case KindParenthesizedExpression$constant__from_ast():
        case KindNonNullExpression$constant__from_ast():
        case KindTypeOfExpression$constant__from_ast(): {
            return isNarrowingExpression(Node__from_ast.Expression(expr));
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            return isNarrowingBinaryExpression(Node__from_ast.AsBinaryExpression(expr));
            break;
        }
        case KindPrefixUnaryExpression$constant__from_ast(): {
            return PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindExclamationToken$constant__from_ast() && isNarrowingExpression(PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
            break;
        }
    }
    return false;
}
export function containsNarrowableReference(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (isNarrowableReference(expr)) {
        return true;
    }
    if (!((Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
        switch (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast():
            case KindCallExpression$constant__from_ast():
            case KindNonNullExpression$constant__from_ast(): {
                return containsNarrowableReference(Node__from_ast.Expression(expr));
                break;
            }
        }
    }
    return false;
}
export function isNarrowableReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
        case KindThisKeyword$constant__from_ast():
        case KindSuperKeyword$constant__from_ast():
        case KindMetaProperty$constant__from_ast(): {
            return true;
            break;
        }
        case KindPropertyAccessExpression$constant__from_ast():
        case KindParenthesizedExpression$constant__from_ast():
        case KindNonNullExpression$constant__from_ast(): {
            return isNarrowableReference(Node__from_ast.Expression(node));
            break;
        }
        case KindElementAccessExpression$constant__from_ast(): {
            let expr: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined = Node__from_ast.AsElementAccessExpression(node);
            return IsStringOrNumericLiteralLike__from_ast(ElementAccessExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression) || IsEntityNameExpression__from_ast(ElementAccessExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression) && isNarrowableReference(ElementAccessExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).Expression);
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            let expr: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
            return Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast() && isNarrowableReference(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right) || IsAssignmentOperator__from_ast(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && IsLeftHandSideExpression__from_ast(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            break;
        }
    }
    return false;
}
export function hasNarrowableArgument(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let call: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(expr);
    const __gotots_range_10 = NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
        const __gotots_range_value_13 = __gotots_range_10.get(__gotots_range_index_9);
        let argument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
        if (containsNarrowableReference(argument)) {
            return true;
        }
    }
    if (IsPropertyAccessExpression__from_ast(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression)) {
        if (containsNarrowableReference(Node__from_ast.Expression(CallExpression__from_ast.$storageOf(((call ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression))) {
            return true;
        }
    }
    return false;
}
export function isNarrowingBinaryExpression(expr: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindEqualsToken$constant__from_ast():
        case KindBarBarEqualsToken$constant__from_ast():
        case KindAmpersandAmpersandEqualsToken$constant__from_ast():
        case KindQuestionQuestionEqualsToken$constant__from_ast(): {
            return containsNarrowableReference(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            break;
        }
        case KindEqualsEqualsToken$constant__from_ast():
        case KindExclamationEqualsToken$constant__from_ast():
        case KindEqualsEqualsEqualsToken$constant__from_ast():
        case KindExclamationEqualsEqualsToken$constant__from_ast(): {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            return isNarrowableOperand(left) || isNarrowableOperand(right) || isNarrowingTypeOfOperands(right, left) || isNarrowingTypeOfOperands(left, right) || (IsBooleanLiteral__from_ast(right) && isNarrowingExpression(left) || IsBooleanLiteral__from_ast(left) && isNarrowingExpression(right));
            break;
        }
        case KindInstanceOfKeyword$constant__from_ast(): {
            return isNarrowableOperand(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            break;
        }
        case KindInKeyword$constant__from_ast(): {
            return isNarrowingExpression(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            break;
        }
        case KindCommaToken$constant__from_ast(): {
            return isNarrowingExpression(BinaryExpression__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
            break;
        }
    }
    return false;
}
export function isNarrowableOperand(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParenthesizedExpression$constant__from_ast(): {
            return isNarrowableOperand(Node__from_ast.Expression(expr));
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            let binary: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(expr);
            switch (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindEqualsToken$constant__from_ast(): {
                    return isNarrowableOperand(BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                    break;
                }
                case KindCommaToken$constant__from_ast(): {
                    return isNarrowableOperand(BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                    break;
                }
            }
            break;
        }
    }
    return containsNarrowableReference(expr);
}
export function isNarrowingTypeOfOperands(expr1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expr2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsTypeOfExpression__from_ast(expr1) && isNarrowableOperand(Node__from_ast.Expression(expr1)) && IsStringLiteralLike__from_ast(expr2);
}
export function getOptionalSymbolFlagForNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SymbolFlags__from_ast {
    let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PostfixToken(node);
    return IfElse$Named_ast$SymbolFlags(!(postfixToken === undefined) && Node__from_ast.$storageOf(((postfixToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQuestionToken$constant__from_ast(), SymbolFlagsOptional$constant__from_ast(), SymbolFlagsNone$constant__from_ast());
}
export function isStatementCondition(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIfStatement$constant__from_ast():
        case KindWhileStatement$constant__from_ast():
        case KindDoStatement$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
            break;
        }
        case KindForStatement$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsForStatement(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition, node);
            break;
        }
        case KindConditionalExpression$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition, node);
            break;
        }
    }
    return false;
}
export function isTopLevelLogicalExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; IsParenthesizedExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsPrefixUnaryExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindExclamationToken$constant__from_ast();) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return !isStatementCondition(node) && !IsLogicalExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(IsOptionalChain__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node));
}
export function isAssignmentDeclaration(decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsBinaryExpression__from_ast(decl) || IsAccessExpression__from_ast(decl) || IsIdentifier__from_ast(decl) || IsCallExpression__from_ast(decl);
}
export function isEffectiveModuleDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsModuleDeclaration__from_ast(node) || IsIdentifier__from_ast(node);
}
