import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, CaseBlock as CaseBlock__from_ast, CaseOrDefaultClause as CaseOrDefaultClause__from_ast, CatchClause as CatchClause__from_ast, ClassDeclaration as ClassDeclaration__from_ast, DoStatement as DoStatement__from_ast, ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, ForInOrOfStatement as ForInOrOfStatement__from_ast, ForStatement as ForStatement__from_ast, HasFileName as HasFileName__from_ast, ImportClause as ImportClause__from_ast, ImportDeclaration as ImportDeclaration__from_ast, LabeledStatement as LabeledStatement__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, PartiallyEmittedExpression as PartiallyEmittedExpression__from_ast, PostfixUnaryExpression as PostfixUnaryExpression__from_ast, SpreadAssignment as SpreadAssignment__from_ast, SpreadElement as SpreadElement__from_ast, SwitchStatement as SwitchStatement__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TryStatement as TryStatement__from_ast, VoidExpression as VoidExpression__from_ast, WhileStatement as WhileStatement__from_ast, WithStatement as WithStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { OrderedSet as OrderedSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ModuleKind as ModuleKind__from_core, ScriptTarget as ScriptTarget__from_core, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { AutoGenerateInfo as AutoGenerateInfo__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { externalModuleInfo } from "./externalmoduleinfo.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, ExportSpecifier as ExportSpecifier__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionStatement as ExpressionStatement__from_ast, FindAncestor as FindAncestor__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetNamespaceDeclarationNode as GetNamespaceDeclarationNode__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IfStatement as IfStatement__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlock as IsBlock__from_ast, IsClassExpression as IsClassExpression__from_ast, IsCommaExpression as IsCommaExpression__from_ast, IsDefaultImport as IsDefaultImport__from_ast, IsDestructuringAssignment as IsDestructuringAssignment__from_ast, IsEffectiveExternalModule as IsEffectiveExternalModule__from_ast, IsExpression as IsExpression__from_ast, IsExternalModuleImportEqualsDeclaration as IsExternalModuleImportEqualsDeclaration__from_ast, IsExternalModule as IsExternalModule__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportCall as IsImportCall__from_ast, IsImportClause as IsImportClause__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsImportSpecifier as IsImportSpecifier__from_ast, IsInJSFile as IsInJSFile__from_ast, IsNamedExports as IsNamedExports__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsRequireCall as IsRequireCall__from_ast, IsSourceFile as IsSourceFile__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPartiallyEmittedExpression$constant as KindPartiallyEmittedExpression$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, ModuleExportNameIsDefault as ModuleExportNameIsDefault__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsBlockScoped$constant as NodeFlagsBlockScoped$constant__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, ShouldTransformImportCall as ShouldTransformImportCall__from_ast, SourceFile as SourceFile__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsDynamicImport$constant as SubtreeContainsDynamicImport$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { MultiMap as MultiMap__from_collections, Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitPreserve$constant as JsxEmitPreserve$constant__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ScriptTargetES2020$constant as ScriptTargetES2020$constant__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EFCustomPrologue$constant as EFCustomPrologue$constant__from_printer, EFIndirectCall$constant as EFIndirectCall$constant__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFStartOnNewLine$constant as EFStartOnNewLine$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsOptimistic$int as GeneratedIdentifierFlagsOptimistic$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ConvertVariableDeclarationToAssignmentExpression as ConvertVariableDeclarationToAssignmentExpression__from_transformers, CreateAssignmentCallback as CreateAssignmentCallback__from_transformers, ExtractModifiers as ExtractModifiers__from_transformers, FlattenDestructuringAssignment as FlattenDestructuringAssignment__from_transformers, FlattenLevelAll$constant as FlattenLevelAll$constant__from_transformers, IsExportName as IsExportName__from_transformers, IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers, IsHelperName as IsHelperName__from_transformers, IsIdentifierReference as IsIdentifierReference__from_transformers, IsLocalName as IsLocalName__from_transformers, SingleOrMany as SingleOrMany__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $state as $state__tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { MultiMap$Len$string$PointerTo_Named_ast$ExportSpecifier } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/MultiMap$Len.js";
import { OrderedSet$Values$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Values.js";
import { Set$Add$PointerTo_Named_ast$Node, Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Coalesce$PointerTo_Named_ast$Node$Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Coalesce.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { FirstResult$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { IfElse$PointerTo_Named_ast$NodeVisitor } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { collectExternalModuleInfo, createExternalHelpersImportDeclarationIfNeeded, getExportNeedsImportStarHelper, getImportNeedsImportDefaultHelper, getImportNeedsImportStarHelper } from "./externalmoduleinfo.js";
import { getExternalModuleNameLiteral, isDeclarationNameOfEnumOrNamespace, isFileLevelReservedGeneratedIdentifier, isSimpleInlineableExpression, rewriteModuleSpecifier } from "./utilities.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class CommonJSModuleTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public topLevelVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public topLevelNestedVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public discardedValueVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public assignmentPatternVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public resolver: ReferenceResolver__from_binder | undefined, public getEmitModuleFormatOfFile: (($0: HasFileName__from_ast | undefined) => ModuleKind__from_core) | undefined, public moduleKind: ModuleKind__from_core, public languageVersion: ScriptTarget__from_core, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public currentModuleInfo: externalModuleInfo | undefined, public parentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$moduletransforms$appendExportEqualsIfNeeded(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined)) {
            let expressionResult: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitExportEquals(tx, ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals);
            if (!(expressionResult === undefined)) {
                const __gotots_store_601 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_602 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_601, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_179 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_602, "NodeFactory");
                const __gotots_store_603 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_178 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_603, "Transformer"));
                const __gotots_store_604 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_605 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_604, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_177 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_605, "NodeFactory");
                const __gotots_store_606 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_607 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_606, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_591 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_607, "NodeFactory"), "module");
                const __gotots_argument_592 = void 0;
                const __gotots_store_608 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_609 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_608, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_593 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_609, "NodeFactory"), "exports");
                const __gotots_argument_594 = NodeFlagsNone$constant__from_ast();
                const __gotots_argument_595 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_177, __gotots_argument_591, __gotots_argument_592, __gotots_argument_593, __gotots_argument_594);
                const __gotots_argument_596 = expressionResult;
                const __gotots_argument_597 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_178, __gotots_argument_595, __gotots_argument_596);
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_179, __gotots_argument_597);
                const __gotots_store_610 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_180 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_610, "Transformer"));
                const __gotots_argument_598 = statement;
                const __gotots_store_611 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_599 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_611, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_180, __gotots_argument_598, __gotots_argument_599);
                const __gotots_store_612 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_612, "Transformer")), statement, EFNoComments$constant__from_printer());
                statements = statements.append(void 0, [statement]);
            }
        }
        return statements;
    }
    static $go$private$moduletransforms$appendExportStatement(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, seen: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, allowComments: bool, liveBinding: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(Node__from_ast.$storageOf(((exportName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast())) {
            if (Set__from_collections.Has<gostring>(seen, Node__from_ast.Text(exportName))) {
                return statements;
            }
            Set$Add$string(seen, Node__from_ast.Text(exportName));
        }
        statements = statements.append(void 0, [CommonJSModuleTransformer.$go$private$moduletransforms$createExportStatement(tx, exportName, expression, location, allowComments, liveBinding)]);
        return statements;
    }
    static $go$private$moduletransforms$appendExportsOfBindingElement(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isForInOrOfInitializer: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined) || Node__from_ast.Name(decl) === undefined) {
            return statements;
        }
        if (IsBindingPattern__from_ast(Node__from_ast.Name(decl))) {
            const __gotots_range_18 = Node__from_ast.Elements(Node__from_ast.Name(decl));
            for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_18.length; __gotots_range_index_17++) {
                const __gotots_range_value_18 = __gotots_range_18.get(__gotots_range_index_17);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_18;
                if (!IsOmittedExpression__from_ast(element)) {
                    statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfBindingElement(tx, statements, element, isForInOrOfInitializer);
                }
            }
        }
        else {
            const __gotots_store_574 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_570 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_574, "Transformer"));
            const __gotots_argument_571 = Node__from_ast.Name(decl);
            if (!IsGeneratedIdentifier__from_transformers(__gotots_argument_570, __gotots_argument_571) && (!IsVariableDeclaration__from_ast(decl) || !(Node__from_ast.Initializer(decl) === undefined) || isForInOrOfInitializer)) {
                statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfDeclaration(tx, statements, decl, void 0, false);
            }
        }
        return statements;
    }
    static $go$private$moduletransforms$appendExportsOfClassOrFunctionDeclaration(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined)) {
            return statements;
        }
        let seen: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: GoMap.nil()
        }));
        if (HasSyntacticModifier__from_ast(decl, ModifierFlagsExport$constant__from_ast())) {
            let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (HasSyntacticModifier__from_ast(decl, ModifierFlagsDefault$constant__from_ast())) {
                const __gotots_store_244 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_245 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_244, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                exportName = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_245, "NodeFactory"), "default");
            }
            else {
                const __gotots_store_246 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                exportName = NodeFactory__from_printer.GetDeclarationName(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_246, "Transformer")), decl);
            }
            const __gotots_store_247 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let exportValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_247, "Transformer")), decl);
            const __gotots_receiver_100 = tx;
            const __gotots_argument_282 = statements;
            const __gotots_argument_283 = seen;
            const __gotots_argument_284 = exportName;
            const __gotots_argument_285 = exportValue;
            const __gotots_store_248 = Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
            const __gotots_argument_286 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_248, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                return TextRange__from_core.$fromStorage($go$storage);
            }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                return TextRange__from_core.$storageOf($go$value);
            });
            const __gotots_argument_287 = false;
            const __gotots_argument_288 = false;
            statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportStatement(__gotots_receiver_100, __gotots_argument_282, __gotots_argument_283, __gotots_argument_284, __gotots_argument_285, __gotots_argument_286, __gotots_argument_287, __gotots_argument_288);
        }
        if (!(Node__from_ast.Name(decl) === undefined)) {
            return CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfDeclaration(tx, statements, decl, seen, false);
        }
        return statements;
    }
    static $go$private$moduletransforms$appendExportsOfDeclaration(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, seen: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, liveBinding: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined)) {
            return statements;
        }
        if (seen === undefined) {
            seen =
                tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                    M: GoMap.nil()
                }));
        }
        {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(decl);
            const __gotots_store_233 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_binary_operand_0 = MultiMap$Len$string$PointerTo_Named_ast$ExportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_233, "exportSpecifiers"));
            const __gotots_binary_operand_1 = 0;
            if (__gotots_binary_operand_0 > __gotots_binary_operand_1 && !(name === undefined) && IsIdentifier__from_ast(name)) {
                const __gotots_store_234 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                name = NodeFactory__from_printer.GetDeclarationName(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_234, "Transformer")), decl);
                const __gotots_store_235 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let exportSpecifiers = MultiMap__from_collections.Get<gostring, {
                    value: ExportSpecifier__from_ast;
                } | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_235, "exportSpecifiers"), Node__from_ast.Text(name));
                if (exportSpecifiers.length > 0) {
                    let exportValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionIdentifier(tx, name);
                    const __gotots_range_3 = exportSpecifiers;
                    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                        let exportSpecifier: {
                            value: ExportSpecifier__from_ast;
                        } | undefined = __gotots_range_value_3;
                        const __gotots_receiver_98 = tx;
                        const __gotots_argument_274 = statements;
                        const __gotots_argument_275 = seen;
                        const __gotots_argument_276 = ExportSpecifier__from_ast.Name(exportSpecifier);
                        const __gotots_argument_277 = exportValue;
                        const __gotots_store_236 = Node__from_ast.$storageOf(((ExportSpecifier__from_ast.Name(exportSpecifier) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                        const __gotots_argument_278 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_236, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                            return TextRange__from_core.$fromStorage($go$storage);
                        }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                            return TextRange__from_core.$storageOf($go$value);
                        });
                        const __gotots_argument_279 = false;
                        const __gotots_argument_280 = liveBinding;
                        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportStatement(__gotots_receiver_98, __gotots_argument_274, __gotots_argument_275, __gotots_argument_276, __gotots_argument_277, __gotots_argument_278, __gotots_argument_279, __gotots_argument_280);
                    }
                }
            }
        }
        return statements;
    }
    static $go$private$moduletransforms$appendExportsOfImportDeclaration(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, decl: {
        value: ImportDeclaration__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined)) {
            return statements;
        }
        let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
        if (importClause === undefined) {
            return statements;
        }
        let seen: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: GoMap.nil()
        }));
        if (!(Node__from_ast.Name(importClause) === undefined)) {
            statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfDeclaration(tx, statements, importClause, seen, false);
        }
        let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
        if (!(namedBindings === undefined)) {
            switch (Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindNamespaceImport$constant__from_ast(): {
                    statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfDeclaration(tx, statements, namedBindings, seen, false);
                    break;
                }
                case KindNamedImports$constant__from_ast(): {
                    const __gotots_range_2 = Node__from_ast.Elements(namedBindings);
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                        let importBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfDeclaration(tx, statements, importBinding, seen, true);
                    }
                    break;
                }
            }
        }
        return statements;
    }
    static $go$private$moduletransforms$appendExportsOfVariableDeclarationList(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, node: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined, isForInOrOfInitializer: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined)) {
            return statements;
        }
        const __gotots_range_6 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
            statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfBindingElement(tx, statements, decl, isForInOrOfInitializer);
        }
        return statements;
    }
    static $go$private$moduletransforms$appendExportsOfVariableStatement(tx: CommonJSModuleTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfVariableDeclarationList(tx, statements, Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList), false);
    }
    static $go$private$moduletransforms$createAllExportExpressions(tx: CommonJSModuleTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let exportedNames = CommonJSModuleTransformer.$go$private$moduletransforms$getExports(tx, name);
        if (exportedNames.length > 0) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (CommonJSModuleTransformer.$go$private$moduletransforms$isDirectExport(tx, name)) {
                const __gotots_receiver_166 = name;
                const __gotots_store_554 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_560 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_554, "Transformer")));
                let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_166, __gotots_argument_560);
                const __gotots_store_555 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_555, "Transformer")), exportName, 396);
                const __gotots_store_556 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_557 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_556, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_167 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_557, "NodeFactory");
                const __gotots_store_558 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_559 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_558, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_561 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_559, "NodeFactory"), "exports");
                const __gotots_argument_562 = void 0;
                const __gotots_argument_563 = exportName;
                const __gotots_argument_564 = NodeFlagsNone$constant__from_ast();
                let propertyAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_167, __gotots_argument_561, __gotots_argument_562, __gotots_argument_563, __gotots_argument_564);
                const __gotots_store_560 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_560, "Transformer")), propertyAccess, EFNoComments$constant__from_printer());
                const __gotots_store_561 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_561, "Transformer")), propertyAccess, value);
                const __gotots_store_562 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_562, "Transformer")), expression, name);
            }
            else {
                const __gotots_store_563 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_563, "Transformer")), name, value);
            }
            const __gotots_range_17 = exportedNames;
            for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_17.length; __gotots_range_index_16++) {
                const __gotots_range_value_17 = __gotots_range_17.get(__gotots_range_index_16);
                let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_17;
                expression = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(tx, exportName, expression, location, false);
            }
            return expression;
        }
        if (CommonJSModuleTransformer.$go$private$moduletransforms$isDirectExport(tx, name)) {
            const __gotots_receiver_168 = name;
            const __gotots_store_564 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_565 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_564, "Transformer")));
            let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_168, __gotots_argument_565);
            const __gotots_store_565 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_565, "Transformer")), exportName, 396);
            const __gotots_store_566 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_567 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_566, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_169 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_567, "NodeFactory");
            const __gotots_store_568 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_569 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_568, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_566 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_569, "NodeFactory"), "exports");
            const __gotots_argument_567 = void 0;
            const __gotots_argument_568 = exportName;
            const __gotots_argument_569 = NodeFlagsNone$constant__from_ast();
            let propertyAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_169, __gotots_argument_566, __gotots_argument_567, __gotots_argument_568, __gotots_argument_569);
            const __gotots_store_570 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_570, "Transformer")), propertyAccess, EFNoComments$constant__from_printer());
            const __gotots_store_571 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_571, "Transformer")), propertyAccess, value);
            const __gotots_store_572 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_572, "Transformer")), result, name);
            return result;
        }
        const __gotots_store_573 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_573, "Transformer")), name, value);
    }
    static $go$private$moduletransforms$createExportExpression(tx: CommonJSModuleTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, liveBinding: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (liveBinding) {
            const __gotots_store_185 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_186 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_94 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "NodeFactory");
            const __gotots_store_187 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_188 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_85 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_188, "NodeFactory");
            const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_190 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_231 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "NodeFactory"), "Object");
            const __gotots_argument_232 = void 0;
            const __gotots_store_191 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_192 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_233 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_192, "NodeFactory"), "defineProperty");
            const __gotots_argument_234 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_260 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_85, __gotots_argument_231, __gotots_argument_232, __gotots_argument_233, __gotots_argument_234);
            const __gotots_argument_261 = void 0;
            const __gotots_argument_262 = void 0;
            const __gotots_store_193 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_194 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_93 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_194, "NodeFactory");
            const __gotots_store_195 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_196 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_5 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_196, "NodeFactory"), "exports");
            const __gotots_store_197 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_slice_element_6 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "Transformer")), name);
            const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_199 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_198, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_92 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "NodeFactory");
            const __gotots_store_200 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_201 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_91 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "NodeFactory");
            const __gotots_store_202 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_203 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_86 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "NodeFactory");
            const __gotots_argument_235 = void 0;
            const __gotots_store_204 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_205 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_236 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_205, "NodeFactory"), "enumerable");
            const __gotots_argument_237 = void 0;
            const __gotots_argument_238 = void 0;
            const __gotots_store_206 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_239 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "Transformer")));
            const __gotots_slice_element_3 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_86, __gotots_argument_235, __gotots_argument_236, __gotots_argument_237, __gotots_argument_238, __gotots_argument_239);
            const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_208 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_207, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_90 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory");
            const __gotots_argument_251 = void 0;
            const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_210 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_209, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_252 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "NodeFactory"), "get");
            const __gotots_argument_253 = void 0;
            const __gotots_argument_254 = void 0;
            const __gotots_store_211 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_212 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_89 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_212, "NodeFactory");
            const __gotots_argument_243 = void 0;
            const __gotots_argument_244 = void 0;
            const __gotots_argument_245 = void 0;
            const __gotots_argument_246 = void 0;
            const __gotots_store_213 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_214 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_213, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_247 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_214, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_248 = void 0;
            const __gotots_argument_249 = void 0;
            const __gotots_store_215 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_216 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_215, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_88 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeFactory");
            const __gotots_store_217 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_218 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_217, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_87 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_218, "NodeFactory");
            const __gotots_store_219 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_220 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_219, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_2 = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_220, "NodeFactory"), value);
            const __gotots_argument_240 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2]);
            const __gotots_argument_241 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_87, __gotots_argument_240);
            const __gotots_argument_242 = false;
            const __gotots_argument_250 = NodeFactory__from_ast.NewBlock(__gotots_receiver_88, __gotots_argument_241, __gotots_argument_242);
            const __gotots_argument_255 = NodeFactory__from_ast.NewFunctionExpression(__gotots_receiver_89, __gotots_argument_243, __gotots_argument_244, __gotots_argument_245, __gotots_argument_246, __gotots_argument_247, __gotots_argument_248, __gotots_argument_249, __gotots_argument_250);
            const __gotots_slice_element_4 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_90, __gotots_argument_251, __gotots_argument_252, __gotots_argument_253, __gotots_argument_254, __gotots_argument_255);
            const __gotots_argument_256 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_3, __gotots_slice_element_4]);
            const __gotots_argument_257 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_91, __gotots_argument_256);
            const __gotots_argument_258 = false;
            const __gotots_slice_element_7 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_92, __gotots_argument_257, __gotots_argument_258);
            const __gotots_argument_259 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_5, __gotots_slice_element_6, __gotots_slice_element_7]);
            const __gotots_argument_263 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_93, __gotots_argument_259);
            const __gotots_argument_264 = NodeFlagsNone$constant__from_ast();
            expression = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_94, __gotots_argument_260, __gotots_argument_261, __gotots_argument_262, __gotots_argument_263, __gotots_argument_264);
        }
        else {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast()) {
                const __gotots_store_221 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_222 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_221, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_95 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_222, "NodeFactory");
                const __gotots_store_223 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_224 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_223, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_265 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_224, "NodeFactory"), "exports");
                const __gotots_argument_266 = void 0;
                const __gotots_store_225 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_267 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_225, "Transformer")), name);
                const __gotots_argument_268 = NodeFlagsNone$constant__from_ast();
                left = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_95, __gotots_argument_265, __gotots_argument_266, __gotots_argument_267, __gotots_argument_268);
            }
            else {
                const __gotots_store_226 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_227 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_226, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_97 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_227, "NodeFactory");
                const __gotots_store_228 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_229 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_228, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_270 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_229, "NodeFactory"), "exports");
                const __gotots_argument_271 = void 0;
                const __gotots_receiver_96 = name;
                const __gotots_store_230 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_269 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_230, "Transformer")));
                const __gotots_argument_272 = Node__from_ast.Clone(__gotots_receiver_96, __gotots_argument_269);
                const __gotots_argument_273 = NodeFlagsNone$constant__from_ast();
                left = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_97, __gotots_argument_270, __gotots_argument_271, __gotots_argument_272, __gotots_argument_273);
            }
            const __gotots_store_231 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_231, "Transformer")), left, value);
        }
        if (!(location === undefined)) {
            const __gotots_store_232 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_232, "Transformer")), expression, TextRange__from_core.$copy(TextRange__from_core.$copy(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value)));
        }
        return expression;
    }
    static $go$private$moduletransforms$createExportStatement(tx: CommonJSModuleTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, allowComments: bool, liveBinding: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_239 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_240 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_239, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_240, "NodeFactory"), CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(tx, name, value, void 0, liveBinding));
        if (!(location === undefined)) {
            const __gotots_store_241 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_241, "Transformer")), statement, TextRange__from_core.$copy(TextRange__from_core.$copy(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value)));
        }
        const __gotots_store_242 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_242, "Transformer")), statement, EFStartOnNewLine$constant__from_printer());
        if (!allowComments) {
            const __gotots_store_243 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_243, "Transformer")), statement, EFNoComments$constant__from_printer());
        }
        return statement;
    }
    static $go$private$moduletransforms$createImportCallExpressionCommonJS(tx: CommonJSModuleTransformer | undefined, arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let needSyncEval = !(arg === undefined) && !isSimpleInlineableExpression(arg);
        let promiseResolveArguments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (needSyncEval) {
            const __gotots_store_613 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_614 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_613, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_183 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_614, "NodeFactory");
            const __gotots_store_615 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_616 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_615, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_603 = NodeFactory__from_ast.NewTemplateHead(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_616, "NodeFactory"), "", "", TokenFlagsNone$constant__from_ast());
            const __gotots_store_617 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_618 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_617, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_182 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_618, "NodeFactory");
            const __gotots_store_619 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_620 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_619, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_181 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_620, "NodeFactory");
            const __gotots_argument_600 = arg;
            const __gotots_store_621 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_622 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_621, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_601 = NodeFactory__from_ast.NewTemplateTail(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_622, "NodeFactory"), "", "", TokenFlagsNone$constant__from_ast());
            const __gotots_slice_element_12 = NodeFactory__from_ast.NewTemplateSpan(__gotots_receiver_181, __gotots_argument_600, __gotots_argument_601);
            const __gotots_argument_602 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_12]);
            const __gotots_argument_604 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_182, __gotots_argument_602);
            const __gotots_slice_element_13 = NodeFactory__from_ast.NewTemplateExpression(__gotots_receiver_183, __gotots_argument_603, __gotots_argument_604);
            promiseResolveArguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_13]);
        }
        const __gotots_store_623 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_624 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_623, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_185 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_624, "NodeFactory");
        const __gotots_store_625 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_626 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_625, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_184 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_626, "NodeFactory");
        const __gotots_store_627 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_628 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_627, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_605 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_628, "NodeFactory"), "Promise");
        const __gotots_argument_606 = void 0;
        const __gotots_store_629 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_630 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_629, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_607 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_630, "NodeFactory"), "resolve");
        const __gotots_argument_608 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_609 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_184, __gotots_argument_605, __gotots_argument_606, __gotots_argument_607, __gotots_argument_608);
        const __gotots_argument_610 = void 0;
        const __gotots_argument_611 = void 0;
        const __gotots_store_631 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_632 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_631, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_612 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_632, "NodeFactory"), promiseResolveArguments);
        const __gotots_argument_613 = NodeFlagsNone$constant__from_ast();
        let promiseResolveCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_185, __gotots_argument_609, __gotots_argument_610, __gotots_argument_611, __gotots_argument_612, __gotots_argument_613);
        let requireArguments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (needSyncEval) {
            const __gotots_store_633 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_634 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_633, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_14 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_634, "NodeFactory"), "s");
            requireArguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_14]);
        }
        else if (!(arg === undefined)) {
            requireArguments = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([arg]);
        }
        const __gotots_store_635 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_187 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_635, "Transformer"));
        const __gotots_store_636 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_637 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_636, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_186 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_637, "NodeFactory");
        const __gotots_store_638 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_639 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_638, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_614 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_639, "NodeFactory"), "require");
        const __gotots_argument_615 = void 0;
        const __gotots_argument_616 = void 0;
        const __gotots_store_640 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_641 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_640, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_617 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_641, "NodeFactory"), requireArguments);
        const __gotots_argument_618 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_619 = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_186, __gotots_argument_614, __gotots_argument_615, __gotots_argument_616, __gotots_argument_617, __gotots_argument_618);
        let requireCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewImportStarHelper(__gotots_receiver_187, __gotots_argument_619);
        let parameters = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (needSyncEval) {
            const __gotots_store_642 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_643 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_642, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_188 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_643, "NodeFactory");
            const __gotots_argument_620 = void 0;
            const __gotots_argument_621 = void 0;
            const __gotots_store_644 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_645 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_644, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_622 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_645, "NodeFactory"), "s");
            const __gotots_argument_623 = void 0;
            const __gotots_argument_624 = void 0;
            const __gotots_argument_625 = void 0;
            const __gotots_slice_element_15 = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_188, __gotots_argument_620, __gotots_argument_621, __gotots_argument_622, __gotots_argument_623, __gotots_argument_624, __gotots_argument_625);
            parameters = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_15]);
        }
        const __gotots_store_646 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_647 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_646, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_189 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_647, "NodeFactory");
        const __gotots_argument_626 = void 0;
        const __gotots_argument_627 = void 0;
        const __gotots_store_648 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_649 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_648, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_628 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_649, "NodeFactory"), parameters);
        const __gotots_argument_629 = void 0;
        const __gotots_argument_630 = void 0;
        const __gotots_store_650 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_651 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_650, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_631 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_651, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
        const __gotots_argument_632 = requireCall;
        let __go_function: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_189, __gotots_argument_626, __gotots_argument_627, __gotots_argument_628, __gotots_argument_629, __gotots_argument_630, __gotots_argument_631, __gotots_argument_632);
        const __gotots_store_652 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_653 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_652, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_191 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_653, "NodeFactory");
        const __gotots_store_654 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_655 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_654, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_190 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_655, "NodeFactory");
        const __gotots_argument_633 = promiseResolveCall;
        const __gotots_argument_634 = void 0;
        const __gotots_store_656 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_657 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_656, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_635 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_657, "NodeFactory"), "then");
        const __gotots_argument_636 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_637 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_190, __gotots_argument_633, __gotots_argument_634, __gotots_argument_635, __gotots_argument_636);
        const __gotots_argument_638 = void 0;
        const __gotots_argument_639 = void 0;
        const __gotots_store_658 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_659 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_658, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_640 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_659, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__go_function]));
        const __gotots_argument_641 = NodeFlagsNone$constant__from_ast();
        let downleveledImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_191, __gotots_argument_637, __gotots_argument_638, __gotots_argument_639, __gotots_argument_640, __gotots_argument_641);
        return downleveledImport;
    }
    static $go$private$moduletransforms$createRequireCall(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let args = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_213 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "Transformer"));
        const __gotots_argument_214 = node;
        const __gotots_argument_215 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile;
        const __gotots_argument_216 = void 0;
        const __gotots_argument_217 = void 0;
        const __gotots_argument_218 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        let moduleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getExternalModuleNameLiteral(__gotots_argument_213, __gotots_argument_214, __gotots_argument_215, __gotots_argument_216, __gotots_argument_217, __gotots_argument_218);
        if (!(moduleName === undefined)) {
            const __gotots_argument_222 = args;
            const __gotots_store_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_219 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "Transformer"));
            const __gotots_argument_220 = moduleName;
            const __gotots_argument_221 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
            const __gotots_argument_223 = rewriteModuleSpecifier(__gotots_argument_219, __gotots_argument_220, __gotots_argument_221);
            args = __gotots_argument_222.append(void 0, [__gotots_argument_223]);
        }
        const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_176 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_82 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "NodeFactory");
        const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_178 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_224 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "NodeFactory"), "require");
        const __gotots_argument_225 = void 0;
        const __gotots_argument_226 = void 0;
        const __gotots_store_179 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_180 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_227 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "NodeFactory"), args);
        const __gotots_argument_228 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewCallExpression(__gotots_receiver_82, __gotots_argument_224, __gotots_argument_225, __gotots_argument_226, __gotots_argument_227, __gotots_argument_228);
    }
    static $go$private$moduletransforms$createUnderscoreUnderscoreESModule(tx: CommonJSModuleTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_575 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_576 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_575, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_176 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_576, "NodeFactory");
        const __gotots_store_577 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_578 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_577, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_175 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_578, "NodeFactory");
        const __gotots_store_579 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_580 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_579, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_170 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_580, "NodeFactory");
        const __gotots_store_581 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_582 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_581, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_572 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_582, "NodeFactory"), "Object");
        const __gotots_argument_573 = void 0;
        const __gotots_store_583 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_584 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_583, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_574 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_584, "NodeFactory"), "defineProperty");
        const __gotots_argument_575 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_585 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_170, __gotots_argument_572, __gotots_argument_573, __gotots_argument_574, __gotots_argument_575);
        const __gotots_argument_586 = void 0;
        const __gotots_argument_587 = void 0;
        const __gotots_store_585 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_586 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_585, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_174 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_586, "NodeFactory");
        const __gotots_store_587 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_588 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_587, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_9 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_588, "NodeFactory"), "exports");
        const __gotots_store_589 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_590 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_589, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_10 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_590, "NodeFactory"), "__esModule", TokenFlagsNone$constant__from_ast());
        const __gotots_store_591 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_592 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_591, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_173 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_592, "NodeFactory");
        const __gotots_store_593 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_594 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_593, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_172 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_594, "NodeFactory");
        const __gotots_store_595 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_596 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_595, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_171 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_596, "NodeFactory");
        const __gotots_argument_576 = void 0;
        const __gotots_store_597 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_598 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_597, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_577 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_598, "NodeFactory"), "value");
        const __gotots_argument_578 = void 0;
        const __gotots_argument_579 = void 0;
        const __gotots_store_599 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_580 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_599, "Transformer")));
        const __gotots_slice_element_8 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_171, __gotots_argument_576, __gotots_argument_577, __gotots_argument_578, __gotots_argument_579, __gotots_argument_580);
        const __gotots_argument_581 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_8]);
        const __gotots_argument_582 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_172, __gotots_argument_581);
        const __gotots_argument_583 = false;
        const __gotots_slice_element_11 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_173, __gotots_argument_582, __gotots_argument_583);
        const __gotots_argument_584 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_9, __gotots_slice_element_10, __gotots_slice_element_11]);
        const __gotots_argument_588 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_174, __gotots_argument_584);
        const __gotots_argument_589 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_590 = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_175, __gotots_argument_585, __gotots_argument_586, __gotots_argument_587, __gotots_argument_588, __gotots_argument_589);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_176, __gotots_argument_590);
        const __gotots_store_600 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_600, "Transformer")), statement, EFCustomPrologue$constant__from_printer());
        return statement;
    }
    static $go$private$moduletransforms$destructuringNeedsFlattening(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (IsObjectLiteralExpression__from_ast(node)) {
            const __gotots_range_15 = Node__from_ast.Properties(node);
            for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_15.length; __gotots_range_index_14++) {
                const __gotots_range_value_15 = __gotots_range_15.get(__gotots_range_index_14);
                let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
                switch (Node__from_ast.$storageOf(((elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindPropertyAssignment$constant__from_ast(): {
                        if (CommonJSModuleTransformer.$go$private$moduletransforms$destructuringNeedsFlattening(tx, Node__from_ast.Initializer(elem))) {
                            return true;
                        }
                        break;
                    }
                    case KindShorthandPropertyAssignment$constant__from_ast(): {
                        if (CommonJSModuleTransformer.$go$private$moduletransforms$destructuringNeedsFlattening(tx, Node__from_ast.Name(elem))) {
                            return true;
                        }
                        break;
                    }
                    case KindSpreadAssignment$constant__from_ast(): {
                        if (CommonJSModuleTransformer.$go$private$moduletransforms$destructuringNeedsFlattening(tx, Node__from_ast.Expression(elem))) {
                            return true;
                        }
                        break;
                    }
                    case KindMethodDeclaration$constant__from_ast():
                    case KindGetAccessor$constant__from_ast():
                    case KindSetAccessor$constant__from_ast(): {
                        return false;
                        break;
                    }
                }
            }
        }
        else if (IsArrayLiteralExpression__from_ast(node)) {
            const __gotots_range_16 = NodeList__from_ast.$storageOf((((Node__from_ast.AsArrayLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_16.length; __gotots_range_index_15++) {
                const __gotots_range_value_16 = __gotots_range_16.get(__gotots_range_index_15);
                let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
                if (IsSpreadElement__from_ast(elem)) {
                    if (CommonJSModuleTransformer.$go$private$moduletransforms$destructuringNeedsFlattening(tx, Node__from_ast.Expression(elem))) {
                        return true;
                    }
                }
                else if (CommonJSModuleTransformer.$go$private$moduletransforms$destructuringNeedsFlattening(tx, elem)) {
                    return true;
                }
            }
        }
        else if (IsIdentifier__from_ast(node)) {
            let exportedNames = CommonJSModuleTransformer.$go$private$moduletransforms$getExports(tx, node);
            const __gotots_store_553 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_558 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_553, "Transformer"));
            const __gotots_argument_559 = node;
            if (IsExportName__from_transformers(__gotots_argument_558, __gotots_argument_559)) {
                return exportedNames.length > 1;
            }
            if (exportedNames.length === 0) {
                return false;
            }
            if (exportedNames.length === 1 && CommonJSModuleTransformer.$go$private$moduletransforms$isDirectExport(tx, node) && Node__from_ast.Text(exportedNames.get(0)) === Node__from_ast.Text(node)) {
                return false;
            }
            return true;
        }
        return false;
    }
    static $go$private$moduletransforms$getExports(tx: CommonJSModuleTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_519 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_535 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_519, "Transformer"));
        const __gotots_argument_536 = name;
        if (!IsGeneratedIdentifier__from_transformers(__gotots_argument_535, __gotots_argument_536)) {
            const __gotots_receiver_162 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_520 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_537 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_520, "Transformer")), name);
            let importDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_162).GetReferencedImportDeclaration(__gotots_argument_537);
            if (!(importDeclaration === undefined)) {
                const __gotots_store_521 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return MultiMap__from_collections.Get<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_521, "exportedBindings"), importDeclaration);
            }
            let bindingsSet = Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
                return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
            });
            const bindingsSet$location = tsonicTypeScriptRuntime.boundLocation({}, () => bindingsSet, bindingsSet$next => bindingsSet = bindingsSet$next);
            let bindings = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_receiver_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_522 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_538 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_522, "Transformer")), name);
            let declarations = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_163).GetReferencedValueDeclarations(__gotots_argument_538);
            if (!declarations.isNil()) {
                const __gotots_range_11 = declarations;
                for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
                    const __gotots_range_value_11 = __gotots_range_11.get(__gotots_range_index_10);
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
                    const __gotots_store_523 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let exportedBindings = MultiMap__from_collections.Get<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_523, "exportedBindings"), declaration);
                    const __gotots_range_12 = exportedBindings;
                    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_12.length; __gotots_range_index_11++) {
                        const __gotots_range_value_12 = __gotots_range_12.get(__gotots_range_index_11);
                        let binding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
                        if (!Set__from_collections.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(bindingsSet$location, binding)) {
                            Set$Add$PointerTo_Named_ast$Node(bindingsSet$location, binding);
                            bindings = bindings.append(void 0, [binding]);
                        }
                    }
                }
                return bindings;
            }
        }
        else {
            const __gotots_store_524 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_539 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_524, "Transformer"));
            const __gotots_argument_540 = name;
            if (isFileLevelReservedGeneratedIdentifier(__gotots_argument_539, __gotots_argument_540)) {
                const __gotots_store_525 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let exportSpecifiers = MultiMap__from_collections.Get<gostring, {
                    value: ExportSpecifier__from_ast;
                } | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_525, "exportSpecifiers"), Node__from_ast.Text(name));
                if (!exportSpecifiers.isNil()) {
                    let exportedNames = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    const __gotots_range_13 = exportSpecifiers;
                    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_13.length; __gotots_range_index_12++) {
                        const __gotots_range_value_13 = __gotots_range_13.get(__gotots_range_index_12);
                        let exportSpecifier: {
                            value: ExportSpecifier__from_ast;
                        } | undefined = __gotots_range_value_13;
                        exportedNames = exportedNames.append(void 0, [ExportSpecifier__from_ast.Name(exportSpecifier)]);
                    }
                    return exportedNames;
                }
            }
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    static $go$private$moduletransforms$getHelperExpressionForExport(tx: CommonJSModuleTransformer | undefined, node: {
        value: ExportDeclaration__from_ast;
    } | undefined, innerExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (getExportNeedsImportStarHelper(node)) {
            const __gotots_store_237 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_99 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_237, "Transformer"));
            const __gotots_store_238 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_281 = NodeFactory__from_printer.NewImportStarHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_238, "Transformer")), innerExpr);
            return NodeVisitor__from_ast.VisitNode(__gotots_receiver_99, __gotots_argument_281);
        }
        return innerExpr;
    }
    static $go$private$moduletransforms$getHelperExpressionForImport(tx: CommonJSModuleTransformer | undefined, node: {
        value: ImportDeclaration__from_ast;
    } | undefined, innerExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (getImportNeedsImportStarHelper(node)) {
            const __gotots_store_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_83 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "Transformer"));
            const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_229 = NodeFactory__from_printer.NewImportStarHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "Transformer")), innerExpr);
            return NodeVisitor__from_ast.VisitNode(__gotots_receiver_83, __gotots_argument_229);
        }
        if (getImportNeedsImportDefaultHelper(node)) {
            const __gotots_store_183 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_84 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "Transformer"));
            const __gotots_store_184 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_230 = NodeFactory__from_printer.NewImportDefaultHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "Transformer")), innerExpr);
            return NodeVisitor__from_ast.VisitNode(__gotots_receiver_84, __gotots_argument_230);
        }
        return innerExpr;
    }
    static $go$private$moduletransforms$isDirectExport(tx: CommonJSModuleTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_receiver_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_store_660 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_642 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_660, "Transformer")), name);
        const __gotots_argument_643 = false;
        let exportContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_192).GetReferencedExportContainer(__gotots_argument_642, __gotots_argument_643);
        return !(exportContainer === undefined) && IsSourceFile__from_ast(exportContainer);
    }
    static $go$private$moduletransforms$popNode(tx: CommonJSModuleTransformer | undefined, grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = grandparentNode;
    }
    static $go$private$moduletransforms$pushNode(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        grandparentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = node;
        return grandparentNode;
    }
    static $go$private$moduletransforms$shimOrRewriteImportOrRequireCall(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_500 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_500, "Transformer")), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
        let argumentsList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments;
        if (NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            let firstArgument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
            let firstArgumentChanged = false;
            if (IsStringLiteralLike__from_ast(firstArgument)) {
                const __gotots_store_501 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_517 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_501, "Transformer"));
                const __gotots_argument_518 = firstArgument;
                const __gotots_argument_519 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
                let rewritten: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = rewriteModuleSpecifier(__gotots_argument_517, __gotots_argument_518, __gotots_argument_519);
                firstArgumentChanged = !tsonicTypeScriptRuntime.sameLocation(rewritten, firstArgument);
                firstArgument = rewritten;
            }
            else {
                const __gotots_store_502 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                firstArgument = NodeFactory__from_printer.NewRewriteRelativeImportExtensionsHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_502, "Transformer")), firstArgument, ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitPreserve$constant__from_core());
                firstArgumentChanged = true;
            }
            const __gotots_store_503 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_6 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_503, "Transformer")), NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.slice(1, null, null));
            let rest = __gotots_results_6[0];
            let restChanged = __gotots_results_6[1];
            if (firstArgumentChanged || restChanged) {
                let __go_arguments = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([firstArgument]), rest, void 0);
                const __gotots_store_504 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_505 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_504, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                argumentsList = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_505, "NodeFactory"), __go_arguments);
                NodeList__from_ast.$storageOf(((argumentsList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            }
        }
        const __gotots_store_506 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_507 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_506, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateCallExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_507, "NodeFactory"), node, expression, CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).QuestionDotToken, void 0, argumentsList, Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags);
    }
    static $go$private$moduletransforms$shouldEmitUnderscoreUnderscoreESModule(tx: CommonJSModuleTransformer | undefined): bool {
        if (FileExtensionIsOneOf__from_tspath(SourceFile__from_ast.FileName((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile), $state__tspath.SupportedJSExtensionsFlat) && !((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined) && ((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined || Node__from_ast.$storageOf((((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast())) {
            return false;
        }
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportEquals === undefined && IsExternalModule__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile)) {
            return true;
        }
        return false;
    }
    static $go$private$moduletransforms$shouldTransformImportCall(tx: CommonJSModuleTransformer | undefined): bool {
        const __gotots_argument_504 = SourceFile__from_ast.FileName((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile);
        const __gotots_argument_505 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        const __gotots_callee_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).getEmitModuleFormatOfFile;
        const __gotots_argument_503 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile);
        const __gotots_argument_506 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_503);
        return ShouldTransformImportCall__from_ast(__gotots_argument_504, __gotots_argument_505, __gotots_argument_506);
    }
    static $go$private$moduletransforms$transformCommonJSModule(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_456 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_456, "Transformer")));
        const __gotots_store_457 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_0 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_457, "Transformer")), NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        let prologue = __gotots_results_0[0];
        let rest = __gotots_results_0[1];
        let statements = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(prologue);
        const __gotots_store_458 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_1 = NodeFactory__from_printer.SplitCustomPrologue(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_458, "Transformer")), rest);
        let custom = __gotots_results_1[0];
        rest = __gotots_results_1[1];
        const __gotots_argument_482 = statements;
        const __gotots_results_2 = NodeVisitor__from_ast.VisitSlice((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelVisitor, custom);
        const __gotots_argument_483 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_2[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_2[1])]));
        statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_482, __gotots_argument_483, void 0);
        if (CommonJSModuleTransformer.$go$private$moduletransforms$shouldEmitUnderscoreUnderscoreESModule(tx)) {
            statements = statements.append(void 0, [CommonJSModuleTransformer.$go$private$moduletransforms$createUnderscoreUnderscoreESModule(tx)]);
        }
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportedNames.length > 0) {
            const chunkSize$int: int = 50;
            let l = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportedNames.length;
            for (let i = 0; i < l; i += chunkSize$int) {
                const __gotots_store_459 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_459, "Transformer")));
                const __gotots_range_7 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportedNames.slice(i, globalThis.Math.min(i + chunkSize$int, l), null);
                for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                    const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
                    let nextId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                    let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (Node__from_ast.$storageOf(((nextId ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast()) {
                        const __gotots_store_460 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_461 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_460, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_154 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_461, "NodeFactory");
                        const __gotots_store_462 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_463 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_462, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_484 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_463, "NodeFactory"), "exports");
                        const __gotots_argument_485 = void 0;
                        const __gotots_store_464 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_486 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_464, "Transformer")), nextId);
                        const __gotots_argument_487 = NodeFlagsNone$constant__from_ast();
                        left = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_154, __gotots_argument_484, __gotots_argument_485, __gotots_argument_486, __gotots_argument_487);
                    }
                    else {
                        const __gotots_receiver_155 = nextId;
                        const __gotots_store_465 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_488 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_465, "Transformer")));
                        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_155, __gotots_argument_488);
                        const __gotots_store_466 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_466, "Transformer")), name, 396);
                        const __gotots_store_467 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_468 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_467, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_156 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_468, "NodeFactory");
                        const __gotots_store_469 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_470 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_469, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_489 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_470, "NodeFactory"), "exports");
                        const __gotots_argument_490 = void 0;
                        const __gotots_argument_491 = name;
                        const __gotots_argument_492 = NodeFlagsNone$constant__from_ast();
                        left = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_156, __gotots_argument_489, __gotots_argument_490, __gotots_argument_491, __gotots_argument_492);
                    }
                    const __gotots_store_471 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    right = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_471, "Transformer")), left, right);
                }
                const __gotots_store_472 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_473 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_472, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_473, "NodeFactory"), right);
                const __gotots_store_474 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_474, "Transformer")), statement, EFCustomPrologue$constant__from_printer());
                statements = statements.append(void 0, [statement]);
            }
        }
        let exportedFunctionsStart = statements.length;
        const __gotots_store_475 = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_range_8 = named_iter.IterSeqValueOperations.$project(OrderedSet$Values$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_475, "exportedFunctions")));
        if (__gotots_range_8 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_8(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
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
            let f: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfClassOrFunctionDeclaration(tx, statements, Node__from_ast.AsNode(f));
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        const __gotots_range_9 = statements.slice(exportedFunctionsStart, null, null);
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
            const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_8);
            let s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
            const __gotots_store_476 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_476, "Transformer")), s, EFCustomPrologue$constant__from_printer());
        }
        const __gotots_results_3 = NodeVisitor__from_ast.VisitSlice((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelVisitor, rest);
        rest = __gotots_results_3[0];
        statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, rest, void 0);
        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportEqualsIfNeeded(tx, statements);
        const __gotots_store_477 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        statements = EmitContext__from_printer.EndAndMergeVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_477, "Transformer")), statements);
        const __gotots_store_478 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_479 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_478, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_479, "NodeFactory"), statements);
        NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        const __gotots_store_480 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_481 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_480, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_481, "NodeFactory"), node, statementList, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken));
        const __gotots_store_482 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_157 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_482, "Transformer"));
        const __gotots_store_483 = NodeBase__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_493 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_483, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_store_484 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_494 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_484, "Transformer")));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_157, __gotots_argument_493, __gotots_argument_494);
        const __gotots_store_485 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_496 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_485, "Transformer"));
        const __gotots_argument_497 = result;
        const __gotots_argument_498 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        const __gotots_callee_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).getEmitModuleFormatOfFile;
        const __gotots_argument_495 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(node);
        const __gotots_argument_499 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_495);
        const __gotots_argument_500 = false;
        const __gotots_argument_501 = false;
        const __gotots_argument_502 = false;
        let externalHelpersImportDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createExternalHelpersImportDeclarationIfNeeded(__gotots_argument_496, __gotots_argument_497, __gotots_argument_498, __gotots_argument_499, __gotots_argument_500, __gotots_argument_501, __gotots_argument_502);
        if (!(externalHelpersImportDeclaration === undefined)) {
            const __gotots_store_486 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_4 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_486, "Transformer")), NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            let prologue__shadow_1 = __gotots_results_4[0];
            let rest__shadow_1 = __gotots_results_4[1];
            const __gotots_store_487 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_5 = NodeFactory__from_printer.SplitCustomPrologue(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_487, "Transformer")), rest__shadow_1);
            let custom__shadow_1 = __gotots_results_5[0];
            rest__shadow_1 = __gotots_results_5[1];
            let statements__shadow_1 = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(prologue__shadow_1);
            statements__shadow_1 = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements__shadow_1, custom__shadow_1, void 0);
            statements__shadow_1 = statements__shadow_1.append(void 0, [NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelVisitor, externalHelpersImportDeclaration)]);
            statements__shadow_1 = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements__shadow_1, rest__shadow_1, void 0);
            const __gotots_store_488 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_489 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_488, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let statementList__shadow_1: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_489, "NodeFactory"), statements__shadow_1);
            NodeList__from_ast.$storageOf(((statementList__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_store_490 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_491 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_490, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            result = Node__from_ast.AsSourceFile(NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_491, "NodeFactory"), result, statementList__shadow_1, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken));
        }
        const __gotots_store_492 = NodeBase__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_492, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
    }
    static $go$private$moduletransforms$transformInitializedVariable(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined) {
            return void 0;
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = VariableDeclaration__from_ast.Name(node);
        if (IsBindingPattern__from_ast(name)) {
            const __gotots_store_249 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_289 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_249, "Transformer"));
            const __gotots_argument_290 = node;
            let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ConvertVariableDeclarationToAssignmentExpression__from_transformers(__gotots_argument_289, __gotots_argument_290);
            return CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignment(tx, Node__from_ast.AsBinaryExpression(assignment), true);
        }
        const __gotots_store_250 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_251 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_250, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_101 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_251, "NodeFactory");
        const __gotots_store_252 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_253 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_252, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_291 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_253, "NodeFactory"), "exports");
        const __gotots_argument_292 = void 0;
        const __gotots_argument_293 = name;
        const __gotots_argument_294 = NodeFlagsNone$constant__from_ast();
        let propertyAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_101, __gotots_argument_291, __gotots_argument_292, __gotots_argument_293, __gotots_argument_294);
        const __gotots_store_254 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_254, "Transformer")), propertyAccess, name);
        const __gotots_store_255 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_255, "Transformer")), propertyAccess, VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
    }
    static $go$private$moduletransforms$visit(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(tx, node);
                    const __gotots_receiver_10 = tx;
                    const __gotots_argument_6 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_10, __gotots_argument_6);
                    };
                    __gotots_return_0 = CommonJSModuleTransformer.$go$private$moduletransforms$visitNoStack(tx, node, false);
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
    static $go$private$moduletransforms$visitAssignmentElement(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsBinaryExpression__from_ast(node)) {
            let n: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(node);
            if (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast()) {
                const __gotots_store_420 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_421 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_420, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_144 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_421, "NodeFactory");
                const __gotots_argument_445 = n;
                const __gotots_argument_446 = void 0;
                const __gotots_argument_447 = CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignmentTarget(tx, BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                const __gotots_argument_448 = void 0;
                const __gotots_argument_449 = BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken;
                const __gotots_store_422 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_450 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_422, "Transformer")), BinaryExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                return NodeFactory__from_ast.UpdateBinaryExpression(__gotots_receiver_144, __gotots_argument_445, __gotots_argument_446, __gotots_argument_447, __gotots_argument_448, __gotots_argument_449, __gotots_argument_450);
            }
        }
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignmentTargetNoStack(tx, node);
    }
    static $go$private$moduletransforms$visitAssignmentExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_15 = IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        if (__gotots_logical_result_15) {
            const __gotots_store_508 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_520 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_508, "Transformer"));
            const __gotots_argument_521 = BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
            let __gotots_logical_result_14 = !IsGeneratedIdentifier__from_transformers(__gotots_argument_520, __gotots_argument_521);
            if (!__gotots_logical_result_14) {
                const __gotots_store_509 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_522 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_509, "Transformer"));
                const __gotots_argument_523 = BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
                __gotots_logical_result_14 = isFileLevelReservedGeneratedIdentifier(__gotots_argument_522, __gotots_argument_523);
            }
            __gotots_logical_result_15 = (__gotots_logical_result_14);
        }
        let __gotots_logical_result_16 = __gotots_logical_result_15;
        if (__gotots_logical_result_16) {
            const __gotots_store_510 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_524 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_510, "Transformer"));
            const __gotots_argument_525 = BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
            __gotots_logical_result_16 = !IsLocalName__from_transformers(__gotots_argument_524, __gotots_argument_525);
        }
        if (__gotots_logical_result_16) {
            let exportedNames = CommonJSModuleTransformer.$go$private$moduletransforms$getExports(tx, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
            if (exportedNames.length > 0) {
                const __gotots_store_511 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_159 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_511, "Transformer"));
                const __gotots_store_512 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                const __gotots_argument_526 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_512, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_159, __gotots_argument_526);
                const __gotots_range_10 = exportedNames;
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
                    const __gotots_range_value_10 = __gotots_range_10.get(__gotots_range_index_9);
                    let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                    const __gotots_receiver_160 = tx;
                    const __gotots_argument_527 = exportName;
                    const __gotots_argument_528 = expression;
                    const __gotots_store_513 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node));
                    const __gotots_argument_529 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_513, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                        return TextRange__from_core.$fromStorage($go$storage);
                    }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                        return TextRange__from_core.$storageOf($go$value);
                    });
                    const __gotots_argument_530 = false;
                    expression = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(__gotots_receiver_160, __gotots_argument_527, __gotots_argument_528, __gotots_argument_529, __gotots_argument_530);
                }
                return expression;
            }
        }
        const __gotots_store_514 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_161 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_514, "Transformer"));
        const __gotots_store_515 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_531 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_515, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_161, __gotots_argument_531);
    }
    static $go$private$moduletransforms$visitAssignmentPattern(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(tx, node);
                    const __gotots_receiver_10 = tx;
                    const __gotots_argument_6 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_10, __gotots_argument_6);
                    };
                    __gotots_return_0 = CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentPatternNoStack(tx, node);
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
    static $go$private$moduletransforms$visitAssignmentPatternNoStack(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindObjectLiteralExpression$constant__from_ast():
            case KindArrayLiteralExpression$constant__from_ast(): {
                node = NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).assignmentPatternVisitor, node);
                break;
            }
            case KindPropertyAssignment$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentProperty(tx, Node__from_ast.AsPropertyAssignment(node));
                break;
            }
            case KindShorthandPropertyAssignment$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitShorthandAssignmentProperty(tx, Node__from_ast.AsShorthandPropertyAssignment(node));
                break;
            }
            case KindSpreadAssignment$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentRestProperty(tx, Node__from_ast.AsSpreadAssignment(node));
                break;
            }
            case KindSpreadElement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentRestElement(tx, Node__from_ast.AsSpreadElement(node));
                break;
            }
            default: {
                if (IsExpression__from_ast(node)) {
                    node = CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentElement(tx, node);
                    break;
                }
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitNoStack(tx, node, false);
                break;
            }
        }
        return node;
    }
    static $go$private$moduletransforms$visitAssignmentProperty(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_399 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_400 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_399, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_139 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_400, "NodeFactory");
        const __gotots_argument_423 = node;
        const __gotots_argument_424 = void 0;
        const __gotots_store_401 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_425 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_401, "Transformer")), PropertyAssignment__from_ast.Name(node));
        const __gotots_argument_426 = void 0;
        const __gotots_argument_427 = void 0;
        const __gotots_argument_428 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).assignmentPatternVisitor, PropertyAssignment__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
        return NodeFactory__from_ast.UpdatePropertyAssignment(__gotots_receiver_139, __gotots_argument_423, __gotots_argument_424, __gotots_argument_425, __gotots_argument_426, __gotots_argument_427, __gotots_argument_428);
    }
    static $go$private$moduletransforms$visitAssignmentRestElement(tx: CommonJSModuleTransformer | undefined, node: {
        value: SpreadElement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_418 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_419 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_418, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateSpreadElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_419, "NodeFactory"), node, CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignmentTarget(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression));
    }
    static $go$private$moduletransforms$visitAssignmentRestProperty(tx: CommonJSModuleTransformer | undefined, node: {
        value: SpreadAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_416 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_417 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_416, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateSpreadAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_417, "NodeFactory"), node, CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignmentTarget(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression));
    }
    static $go$private$moduletransforms$visitBinaryExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_357 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_382 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_357, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        if (IsDestructuringAssignment__from_ast(__gotots_argument_382)) {
            return CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignment(tx, node, resultIsDiscarded);
        }
        const __gotots_store_358 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_383 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_358, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_384 = false;
        if (IsAssignmentExpression__from_ast(__gotots_argument_383, __gotots_argument_384)) {
            return CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentExpression(tx, node);
        }
        const __gotots_store_359 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_385 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_359, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        if (IsCommaExpression__from_ast(__gotots_argument_385)) {
            return CommonJSModuleTransformer.$go$private$moduletransforms$visitCommaExpression(tx, node, resultIsDiscarded);
        }
        const __gotots_store_360 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_124 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_360, "Transformer"));
        const __gotots_store_361 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_386 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_361, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_124, __gotots_argument_386);
    }
    static $go$private$moduletransforms$visitCallExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let needsRewrite = false;
        if (Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions)) {
            const __gotots_store_338 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_358 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_338, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            let __gotots_logical_result_6 = IsImportCall__from_ast(__gotots_argument_358) && NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0;
            if (!__gotots_logical_result_6) {
                const __gotots_store_339 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_359 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_339, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                let __gotots_logical_result_5 = IsInJSFile__from_ast(__gotots_argument_359);
                if (__gotots_logical_result_5) {
                    const __gotots_store_340 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_360 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_340, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    const __gotots_argument_361 = false;
                    __gotots_logical_result_5 = IsRequireCall__from_ast(__gotots_argument_360, __gotots_argument_361);
                }
                __gotots_logical_result_6 = __gotots_logical_result_5;
            }
            if (__gotots_logical_result_6) {
                needsRewrite = true;
            }
        }
        const __gotots_store_341 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_362 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_341, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        if (IsImportCall__from_ast(__gotots_argument_362) && CommonJSModuleTransformer.$go$private$moduletransforms$shouldTransformImportCall(tx)) {
            return CommonJSModuleTransformer.$go$private$moduletransforms$visitImportCallExpression(tx, node, needsRewrite);
        }
        if (needsRewrite) {
            const __gotots_receiver_119 = tx;
            const __gotots_store_342 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
            const __gotots_argument_363 = Node__from_ast.AsCallExpression(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_342, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
                return Node__from_ast.$fromStorage($go$storage);
            }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
                return Node__from_ast.$storageOf($go$value);
            }));
            return CommonJSModuleTransformer.$go$private$moduletransforms$shimOrRewriteImportOrRequireCall(__gotots_receiver_119, __gotots_argument_363);
        }
        if (IsIdentifier__from_ast(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionIdentifier(tx, CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            const __gotots_store_343 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_344 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_343, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_120 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_344, "NodeFactory");
            const __gotots_argument_364 = node;
            const __gotots_argument_365 = expression;
            const __gotots_argument_366 = CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).QuestionDotToken;
            const __gotots_argument_367 = void 0;
            const __gotots_store_345 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_368 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_345, "Transformer")), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments);
            const __gotots_argument_369 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateCallExpression(__gotots_receiver_120, __gotots_argument_364, __gotots_argument_365, __gotots_argument_366, __gotots_argument_367, __gotots_argument_368, __gotots_argument_369);
            let __gotots_logical_result_7 = !IsIdentifier__from_ast(expression);
            if (__gotots_logical_result_7) {
                const __gotots_store_346 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_370 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_346, "Transformer"));
                const __gotots_argument_371 = CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression;
                __gotots_logical_result_7 = !IsHelperName__from_transformers(__gotots_argument_370, __gotots_argument_371);
            }
            if (__gotots_logical_result_7) {
                const __gotots_store_347 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_347, "Transformer")), updated, EFIndirectCall$constant__from_printer());
            }
            return updated;
        }
        const __gotots_store_348 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_121 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_348, "Transformer"));
        const __gotots_store_349 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_372 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_349, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_121, __gotots_argument_372);
    }
    static $go$private$moduletransforms$visitCommaExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        const __gotots_argument_532 = resultIsDiscarded;
        const __gotots_argument_533 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor;
        const __gotots_store_516 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_534 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_516, "Transformer"));
        let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(IfElse$PointerTo_Named_ast$NodeVisitor(__gotots_argument_532, __gotots_argument_533, __gotots_argument_534), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        const __gotots_store_517 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_518 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_517, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_518, "NodeFactory"), node, void 0, left, void 0, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, right);
    }
    static $go$private$moduletransforms$visitDestructuringAssignment(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined, valueIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (CommonJSModuleTransformer.$go$private$moduletransforms$destructuringNeedsFlattening(tx, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
            const __gotots_store_452 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_476 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_452, "Transformer");
            const __gotots_store_453 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
            const __gotots_argument_477 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_453, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_478 = !valueIsDiscarded;
            const __gotots_argument_479 = FlattenLevelAll$constant__from_transformers();
            const __gotots_receiver_152 = tx;
            const __gotots_argument_480 = new CreateAssignmentCallback__from_transformers(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return CommonJSModuleTransformer.$go$private$moduletransforms$createAllExportExpressions(__gotots_receiver_152, $argument0, $argument1, $argument2);
            });
            return FlattenDestructuringAssignment__from_transformers(__gotots_argument_476, __gotots_argument_477, __gotots_argument_478, __gotots_argument_479, __gotots_argument_480);
        }
        const __gotots_store_454 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_153 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_454, "Transformer"));
        const __gotots_store_455 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_481 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_455, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_153, __gotots_argument_481);
    }
    static $go$private$moduletransforms$visitDestructuringAssignmentTarget(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(tx, node);
                    const __gotots_receiver_166 = tx;
                    const __gotots_argument_558 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_166, __gotots_argument_558);
                    };
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindObjectLiteralExpression$constant__from_ast():
                        case KindArrayLiteralExpression$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentPatternNoStack(tx, node);
                            break;
                        }
                        default: {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignmentTargetNoStack(tx, node);
                            break;
                        }
                    }
                    __gotots_return_0 = node;
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
    static $go$private$moduletransforms$visitDestructuringAssignmentTargetNoStack(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_18 = IsIdentifier__from_ast(node);
        if (__gotots_logical_result_18) {
            const __gotots_store_526 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_541 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_526, "Transformer"));
            const __gotots_argument_542 = node;
            let __gotots_logical_result_17 = !IsGeneratedIdentifier__from_transformers(__gotots_argument_541, __gotots_argument_542);
            if (!__gotots_logical_result_17) {
                const __gotots_store_527 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_543 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_527, "Transformer"));
                const __gotots_argument_544 = node;
                __gotots_logical_result_17 = isFileLevelReservedGeneratedIdentifier(__gotots_argument_543, __gotots_argument_544);
            }
            __gotots_logical_result_18 = (__gotots_logical_result_17);
        }
        let __gotots_logical_result_19 = __gotots_logical_result_18;
        if (__gotots_logical_result_19) {
            const __gotots_store_528 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_545 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_528, "Transformer"));
            const __gotots_argument_546 = node;
            __gotots_logical_result_19 = !IsLocalName__from_transformers(__gotots_argument_545, __gotots_argument_546);
        }
        if (__gotots_logical_result_19) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionIdentifier(tx, node);
            let exportedNames = CommonJSModuleTransformer.$go$private$moduletransforms$getExports(tx, node);
            if (exportedNames.length > 0) {
                const __gotots_store_529 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_529, "Transformer")), "value", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
                const __gotots_store_530 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_530, "Transformer")), expression, value);
                const __gotots_range_14 = exportedNames;
                for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_14.length; __gotots_range_index_13++) {
                    const __gotots_range_value_14 = __gotots_range_14.get(__gotots_range_index_13);
                    let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
                    expression = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(tx, exportName, expression, void 0, false);
                }
                const __gotots_store_531 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_532 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_531, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_532, "NodeFactory"), expression);
                const __gotots_store_533 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_534 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_533, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_534, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
                const __gotots_store_535 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_536 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_535, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_536, "NodeFactory"), void 0, void 0, value, void 0, void 0, void 0);
                const __gotots_store_537 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_538 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_537, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_164 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_538, "NodeFactory");
                const __gotots_argument_547 = void 0;
                const __gotots_store_539 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_540 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_539, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_548 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_540, "NodeFactory"), "value");
                const __gotots_argument_549 = void 0;
                const __gotots_store_541 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_542 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_541, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_550 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_542, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([param]));
                const __gotots_argument_551 = void 0;
                const __gotots_argument_552 = void 0;
                const __gotots_store_543 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_544 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_543, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_553 = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_544, "NodeFactory"), statementList, false);
                let valueSetter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSetAccessorDeclaration(__gotots_receiver_164, __gotots_argument_547, __gotots_argument_548, __gotots_argument_549, __gotots_argument_550, __gotots_argument_551, __gotots_argument_552, __gotots_argument_553);
                const __gotots_store_545 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_546 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_545, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let propertyList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_546, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([valueSetter]));
                const __gotots_store_547 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_548 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_547, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                expression = NodeFactory__from_ast.NewObjectLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_548, "NodeFactory"), propertyList, false);
                const __gotots_store_549 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_550 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_549, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_165 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_550, "NodeFactory");
                const __gotots_argument_554 = expression;
                const __gotots_argument_555 = void 0;
                const __gotots_store_551 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_552 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_551, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_556 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_552, "NodeFactory"), "value");
                const __gotots_argument_557 = NodeFlagsNone$constant__from_ast();
                expression = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_165, __gotots_argument_554, __gotots_argument_555, __gotots_argument_556, __gotots_argument_557);
            }
            return expression;
        }
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitNoStack(tx, node, false);
    }
    static $go$private$moduletransforms$visitDiscardedValue(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(tx, node);
                    const __gotots_receiver_10 = tx;
                    const __gotots_argument_6 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_10, __gotots_argument_6);
                    };
                    __gotots_return_0 = CommonJSModuleTransformer.$go$private$moduletransforms$visitNoStack(tx, node, true);
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
    static $go$private$moduletransforms$visitExportEquals(tx: CommonJSModuleTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_193 = tx;
                    const __gotots_store_661 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_644 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_661, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(__gotots_receiver_193, __gotots_argument_644);
                    const __gotots_receiver_194 = tx;
                    const __gotots_argument_645 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_194, __gotots_argument_645);
                    };
                    const __gotots_store_662 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_return_0 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_662, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
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
    static $go$private$moduletransforms$visitExpressionIdentifier(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            const __gotots_store_423 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let info: tsonicTypeScriptRuntime.Location<AutoGenerateInfo__from_printer> | undefined = EmitContext__from_printer.GetAutoGenerateInfo(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_423, "Transformer")), node);
            let __gotots_logical_result_11 = !(!(info === undefined) && !((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo__from_printer>).value.Flags.HasAllowNameSubstitution());
            if (__gotots_logical_result_11) {
                const __gotots_store_424 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_451 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_424, "Transformer"));
                const __gotots_argument_452 = node;
                __gotots_logical_result_11 = !IsHelperName__from_transformers(__gotots_argument_451, __gotots_argument_452);
            }
            let __gotots_logical_result_12 = __gotots_logical_result_11;
            if (__gotots_logical_result_12) {
                const __gotots_store_425 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_453 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_425, "Transformer"));
                const __gotots_argument_454 = node;
                __gotots_logical_result_12 = !IsLocalName__from_transformers(__gotots_argument_453, __gotots_argument_454);
            }
            let __gotots_logical_result_13 = __gotots_logical_result_12;
            if (__gotots_logical_result_13) {
                const __gotots_store_426 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_455 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_426, "Transformer"));
                const __gotots_argument_456 = node;
                __gotots_logical_result_13 = !isDeclarationNameOfEnumOrNamespace(__gotots_argument_455, __gotots_argument_456);
            }
            if (__gotots_logical_result_13) {
                const __gotots_receiver_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                const __gotots_store_427 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_459 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_427, "Transformer")), node);
                const __gotots_store_428 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_457 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_428, "Transformer"));
                const __gotots_argument_458 = node;
                const __gotots_argument_460 = IsExportName__from_transformers(__gotots_argument_457, __gotots_argument_458);
                let exportContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_145).GetReferencedExportContainer(__gotots_argument_459, __gotots_argument_460);
                if (!(exportContainer === undefined) && IsSourceFile__from_ast(exportContainer)) {
                    const __gotots_store_429 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_430 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_429, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_147 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_430, "NodeFactory");
                    const __gotots_store_431 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_432 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_431, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_462 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_432, "NodeFactory"), "exports");
                    const __gotots_argument_463 = void 0;
                    const __gotots_receiver_146 = node;
                    const __gotots_store_433 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_461 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_433, "Transformer")));
                    const __gotots_argument_464 = Node__from_ast.Clone(__gotots_receiver_146, __gotots_argument_461);
                    const __gotots_argument_465 = NodeFlagsNone$constant__from_ast();
                    let reference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_147, __gotots_argument_462, __gotots_argument_463, __gotots_argument_464, __gotots_argument_465);
                    const __gotots_store_434 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_434, "Transformer")), reference, node);
                    Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                    return reference;
                }
                const __gotots_receiver_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                const __gotots_store_435 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_466 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_435, "Transformer")), node);
                let importDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_148).GetReferencedImportDeclaration(__gotots_argument_466);
                if (!(importDeclaration === undefined)) {
                    if (IsImportClause__from_ast(importDeclaration)) {
                        const __gotots_store_436 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_437 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_436, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_149 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_437, "NodeFactory");
                        const __gotots_store_438 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_467 = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_438, "Transformer")), Node__from_ast.$storageOf(((importDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        const __gotots_argument_468 = void 0;
                        const __gotots_store_439 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_440 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_439, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_469 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_440, "NodeFactory"), "default");
                        const __gotots_argument_470 = NodeFlagsNone$constant__from_ast();
                        let reference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_149, __gotots_argument_467, __gotots_argument_468, __gotots_argument_469, __gotots_argument_470);
                        const __gotots_store_441 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_441, "Transformer")), reference, node);
                        Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        return reference;
                    }
                    if (IsImportSpecifier__from_ast(importDeclaration)) {
                        const __gotots_store_442 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ImportSpecifier__from_ast.$storageOf(((Node__from_ast.AsImportSpecifier(importDeclaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).NodeBase)).NodeDefault));
                        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyNameOrName(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_442, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
                            return Node__from_ast.$fromStorage($go$storage);
                        }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
                            return Node__from_ast.$storageOf($go$value);
                        }));
                        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(importDeclaration, IsImportDeclaration__from_ast);
                        const __gotots_store_443 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_443, "Transformer")), Coalesce$PointerTo_Named_ast$Node$Named_ast$Node(decl, importDeclaration));
                        let reference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (IsStringLiteral__from_ast(name)) {
                            const __gotots_store_444 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_445 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_444, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_150 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_445, "NodeFactory");
                            const __gotots_argument_471 = target;
                            const __gotots_argument_472 = void 0;
                            const __gotots_store_446 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_473 = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_446, "Transformer")), name);
                            const __gotots_argument_474 = NodeFlagsNone$constant__from_ast();
                            reference = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_150, __gotots_argument_471, __gotots_argument_472, __gotots_argument_473, __gotots_argument_474);
                        }
                        else {
                            const __gotots_receiver_151 = name;
                            const __gotots_store_447 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_475 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_447, "Transformer")));
                            let referenceName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_151, __gotots_argument_475);
                            const __gotots_store_448 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_448, "Transformer")), referenceName, 396);
                            const __gotots_store_449 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_450 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_449, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            reference = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_450, "NodeFactory"), target, void 0, referenceName, NodeFlagsNone$constant__from_ast());
                        }
                        const __gotots_store_451 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_451, "Transformer")), reference, node);
                        Node__from_ast.$storageOf(((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        return reference;
                    }
                }
            }
        }
        return node;
    }
    static $go$private$moduletransforms$visitExpressionStatement(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_117 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor;
        const __gotots_store_330 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(ExpressionStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_350 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_330, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_117, __gotots_argument_350);
    }
    static $go$private$moduletransforms$visitForInOrOfStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_326 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_327 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_326, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_116 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_327, "NodeFactory");
        const __gotots_argument_345 = node;
        const __gotots_argument_346 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier;
        const __gotots_argument_347 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_328 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_348 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_328, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_329 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_349 = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_329, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
        return NodeFactory__from_ast.UpdateForInOrOfStatement(__gotots_receiver_116, __gotots_argument_345, __gotots_argument_346, __gotots_argument_347, __gotots_argument_348, __gotots_argument_349);
    }
    static $go$private$moduletransforms$visitForStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: ForStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_322 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_323 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_322, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_115 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_323, "NodeFactory");
        const __gotots_argument_340 = node;
        const __gotots_argument_341 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_324 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_342 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_324, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition);
        const __gotots_argument_343 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
        const __gotots_store_325 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_344 = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_325, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
        return NodeFactory__from_ast.UpdateForStatement(__gotots_receiver_115, __gotots_argument_340, __gotots_argument_341, __gotots_argument_342, __gotots_argument_343, __gotots_argument_344);
    }
    static $go$private$moduletransforms$visitIdentifier(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsIdentifierReference__from_transformers(node, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode)) {
            return CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionIdentifier(tx, node);
        }
        return node;
    }
    static $go$private$moduletransforms$visitImportCallExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined, rewriteOrShim: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).moduleKind === ModuleKindNone$constant__from_core() && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).languageVersion >= ScriptTargetES2020$constant__from_core()) {
            const __gotots_store_493 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_158 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_493, "Transformer"));
            const __gotots_store_494 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_507 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_494, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_158, __gotots_argument_507);
        }
        const __gotots_store_495 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_508 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_495, "Transformer"));
        const __gotots_store_496 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_509 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_496, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_510 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile;
        const __gotots_argument_511 = void 0;
        const __gotots_argument_512 = void 0;
        const __gotots_argument_513 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        let externalModuleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getExternalModuleNameLiteral(__gotots_argument_508, __gotots_argument_509, __gotots_argument_510, __gotots_argument_511, __gotots_argument_512, __gotots_argument_513);
        const __gotots_store_497 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let firstArgument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_497, "Transformer")), FirstOrNil$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes));
        let argument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(externalModuleName === undefined) && (firstArgument === undefined || !IsStringLiteral__from_ast(firstArgument) || Node__from_ast.Text(firstArgument) !== Node__from_ast.Text(externalModuleName))) {
            argument = externalModuleName;
        }
        else if (!(firstArgument === undefined) && rewriteOrShim) {
            if (IsStringLiteral__from_ast(firstArgument)) {
                const __gotots_store_498 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_514 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_498, "Transformer"));
                const __gotots_argument_515 = firstArgument;
                const __gotots_argument_516 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
                argument = rewriteModuleSpecifier(__gotots_argument_514, __gotots_argument_515, __gotots_argument_516);
            }
            else {
                const __gotots_store_499 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                argument = NodeFactory__from_printer.NewRewriteRelativeImportExtensionsHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_499, "Transformer")), firstArgument, ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitPreserve$constant__from_core());
            }
        }
        else {
            argument = firstArgument;
        }
        return CommonJSModuleTransformer.$go$private$moduletransforms$createImportCallExpressionCommonJS(tx, argument);
    }
    static $go$private$moduletransforms$visitNoStack(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!IsSourceFile__from_ast(node) && (Node__from_ast.SubtreeFacts(node) & (4718592)) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindForStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitForStatement(tx, Node__from_ast.AsForStatement(node));
                break;
            }
            case KindForInStatement$constant__from_ast():
            case KindForOfStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitForInOrOfStatement(tx, Node__from_ast.AsForInOrOfStatement(node));
                break;
            }
            case KindExpressionStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionStatement(tx, Node__from_ast.AsExpressionStatement(node));
                break;
            }
            case KindVoidExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitVoidExpression(tx, Node__from_ast.AsVoidExpression(node));
                break;
            }
            case KindParenthesizedExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitParenthesizedExpression(tx, Node__from_ast.AsParenthesizedExpression(node), resultIsDiscarded);
                break;
            }
            case KindPartiallyEmittedExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitPartiallyEmittedExpression(tx, Node__from_ast.AsPartiallyEmittedExpression(node), resultIsDiscarded);
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitCallExpression(tx, Node__from_ast.AsCallExpression(node));
                break;
            }
            case KindTaggedTemplateExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTaggedTemplateExpression(tx, Node__from_ast.AsTaggedTemplateExpression(node));
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitBinaryExpression(tx, Node__from_ast.AsBinaryExpression(node), resultIsDiscarded);
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitPrefixUnaryExpression(tx, Node__from_ast.AsPrefixUnaryExpression(node), resultIsDiscarded);
                break;
            }
            case KindPostfixUnaryExpression$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitPostfixUnaryExpression(tx, Node__from_ast.AsPostfixUnaryExpression(node), resultIsDiscarded);
                break;
            }
            case KindShorthandPropertyAssignment$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitShorthandPropertyAssignment(tx, Node__from_ast.AsShorthandPropertyAssignment(node));
                break;
            }
            case KindIdentifier$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitIdentifier(tx, node);
                break;
            }
            default: {
                const __gotots_store_172 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                node = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "Transformer")), node);
                break;
            }
        }
        return node;
    }
    static $go$private$moduletransforms$visitParenthesizedExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_argument_352 = resultIsDiscarded;
        const __gotots_argument_353 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor;
        const __gotots_store_332 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_354 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_332, "Transformer"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(IfElse$PointerTo_Named_ast$NodeVisitor(__gotots_argument_352, __gotots_argument_353, __gotots_argument_354), ParenthesizedExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
        const __gotots_store_333 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_334 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_333, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_334, "NodeFactory"), node, expression);
    }
    static $go$private$moduletransforms$visitPartiallyEmittedExpression(tx: CommonJSModuleTransformer | undefined, node: {
        value: PartiallyEmittedExpression__from_ast;
    } | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_argument_355 = resultIsDiscarded;
        const __gotots_argument_356 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor;
        const __gotots_store_335 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_357 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_335, "Transformer"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(IfElse$PointerTo_Named_ast$NodeVisitor(__gotots_argument_355, __gotots_argument_356, __gotots_argument_357), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_336 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_337 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_336, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdatePartiallyEmittedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_337, "NodeFactory"), node, expression);
    }
    static $go$private$moduletransforms$visitPostfixUnaryExpression(tx: CommonJSModuleTransformer | undefined, node: {
        value: PostfixUnaryExpression__from_ast;
    } | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_10 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator === KindPlusPlusToken$constant__from_ast() || (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator === KindMinusMinusToken$constant__from_ast()) && IsIdentifier__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand);
        if (__gotots_logical_result_10) {
            const __gotots_store_370 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_395 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_370, "Transformer"));
            const __gotots_argument_396 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand;
            __gotots_logical_result_10 = !IsLocalName__from_transformers(__gotots_argument_395, __gotots_argument_396);
        }
        if (__gotots_logical_result_10) {
            let exportedNames = CommonJSModuleTransformer.$go$private$moduletransforms$getExports(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand);
            if (exportedNames.length > 0) {
                let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                const __gotots_store_371 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_372 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_371, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_128 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_372, "NodeFactory");
                const __gotots_argument_397 = node;
                const __gotots_store_373 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_398 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_373, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand);
                const __gotots_argument_399 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdatePostfixUnaryExpression(__gotots_receiver_128, __gotots_argument_397, __gotots_argument_398, __gotots_argument_399);
                if (!resultIsDiscarded) {
                    const __gotots_store_374 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    temp = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_374, "Transformer")));
                    const __gotots_store_375 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_375, "Transformer")), temp);
                    const __gotots_store_376 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_376, "Transformer")), temp, expression);
                    const __gotots_store_377 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_129 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_377, "Transformer"));
                    const __gotots_argument_400 = expression;
                    const __gotots_store_378 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdateExpressionBase).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_401 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_378, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_129, __gotots_argument_400, __gotots_argument_401);
                }
                const __gotots_store_379 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_131 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_379, "Transformer"));
                const __gotots_argument_403 = expression;
                const __gotots_receiver_130 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand;
                const __gotots_store_380 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_402 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_380, "Transformer")));
                const __gotots_argument_404 = Node__from_ast.Clone(__gotots_receiver_130, __gotots_argument_402);
                expression = NodeFactory__from_printer.NewCommaExpression(__gotots_receiver_131, __gotots_argument_403, __gotots_argument_404);
                const __gotots_store_381 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_132 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_381, "Transformer"));
                const __gotots_argument_405 = expression;
                const __gotots_store_382 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdateExpressionBase).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_406 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_382, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_132, __gotots_argument_405, __gotots_argument_406);
                const __gotots_range_5 = exportedNames;
                for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                    const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
                    let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                    expression = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(tx, exportName, expression, void 0, false);
                    const __gotots_store_383 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_133 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_383, "Transformer"));
                    const __gotots_argument_407 = expression;
                    const __gotots_store_384 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdateExpressionBase).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_408 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_384, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_133, __gotots_argument_407, __gotots_argument_408);
                }
                if (!(temp === undefined)) {
                    const __gotots_store_385 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    expression = NodeFactory__from_printer.NewCommaExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_385, "Transformer")), expression, Node__from_ast.AsNode(temp));
                    const __gotots_store_386 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_134 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_386, "Transformer"));
                    const __gotots_argument_409 = expression;
                    const __gotots_store_387 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdateExpressionBase).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_410 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_387, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_134, __gotots_argument_409, __gotots_argument_410);
                }
                return expression;
            }
        }
        const __gotots_store_388 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_135 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_388, "Transformer"));
        const __gotots_store_389 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdateExpressionBase).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_411 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_389, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_135, __gotots_argument_411);
    }
    static $go$private$moduletransforms$visitPrefixUnaryExpression(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined, resultIsDiscarded: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_9 = (PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindPlusPlusToken$constant__from_ast() || PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindMinusMinusToken$constant__from_ast()) && IsIdentifier__from_ast(PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
        if (__gotots_logical_result_9) {
            const __gotots_store_362 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_387 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_362, "Transformer"));
            const __gotots_argument_388 = PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
            __gotots_logical_result_9 = !IsLocalName__from_transformers(__gotots_argument_387, __gotots_argument_388);
        }
        if (__gotots_logical_result_9) {
            let exportedNames = CommonJSModuleTransformer.$go$private$moduletransforms$getExports(tx, PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
            if (exportedNames.length > 0) {
                const __gotots_store_363 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_364 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_363, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_125 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_364, "NodeFactory");
                const __gotots_argument_389 = node;
                const __gotots_argument_390 = PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator;
                const __gotots_store_365 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_391 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_365, "Transformer")), PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdatePrefixUnaryExpression(__gotots_receiver_125, __gotots_argument_389, __gotots_argument_390, __gotots_argument_391);
                const __gotots_range_4 = exportedNames;
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                    const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                    let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                    expression = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(tx, exportName, expression, void 0, false);
                    const __gotots_store_366 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_126 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_366, "Transformer"));
                    const __gotots_argument_392 = expression;
                    const __gotots_store_367 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_393 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_367, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_126, __gotots_argument_392, __gotots_argument_393);
                }
                return expression;
            }
        }
        const __gotots_store_368 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_127 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_368, "Transformer"));
        const __gotots_store_369 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_394 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_369, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_127, __gotots_argument_394);
    }
    static $go$private$moduletransforms$visitShorthandAssignmentProperty(tx: CommonJSModuleTransformer | undefined, node: {
        value: ShorthandPropertyAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitDestructuringAssignmentTargetNoStack(tx, ShorthandPropertyAssignment__from_ast.Name(node));
        if (IsIdentifier__from_ast(target)) {
            const __gotots_store_402 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_403 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_402, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_140 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_403, "NodeFactory");
            const __gotots_argument_429 = node;
            const __gotots_argument_430 = void 0;
            const __gotots_argument_431 = target;
            const __gotots_argument_432 = void 0;
            const __gotots_argument_433 = void 0;
            const __gotots_argument_434 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken;
            const __gotots_store_404 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_435 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_404, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
            return NodeFactory__from_ast.UpdateShorthandPropertyAssignment(__gotots_receiver_140, __gotots_argument_429, __gotots_argument_430, __gotots_argument_431, __gotots_argument_432, __gotots_argument_433, __gotots_argument_434, __gotots_argument_435);
        }
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer === undefined)) {
            let equalsToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken;
            if (equalsToken === undefined) {
                const __gotots_store_405 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_406 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_405, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                equalsToken = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_406, "NodeFactory"), KindEqualsToken$constant__from_ast());
            }
            const __gotots_store_407 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_408 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_407, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_141 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_408, "NodeFactory");
            const __gotots_argument_436 = void 0;
            const __gotots_argument_437 = target;
            const __gotots_argument_438 = void 0;
            const __gotots_argument_439 = equalsToken;
            const __gotots_store_409 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_440 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_409, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
            target = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_141, __gotots_argument_436, __gotots_argument_437, __gotots_argument_438, __gotots_argument_439, __gotots_argument_440);
        }
        const __gotots_store_410 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_411 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_410, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_411, "NodeFactory"), void 0, ShorthandPropertyAssignment__from_ast.Name(node), void 0, void 0, target);
        const __gotots_store_412 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_142 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_412, "Transformer"));
        const __gotots_argument_441 = updated;
        const __gotots_store_413 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_442 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_413, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_142, __gotots_argument_441, __gotots_argument_442);
        const __gotots_store_414 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_143 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_414, "Transformer"));
        const __gotots_argument_443 = updated;
        const __gotots_store_415 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_444 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_415, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_143, __gotots_argument_443, __gotots_argument_444);
        return updated;
    }
    static $go$private$moduletransforms$visitShorthandPropertyAssignment(tx: CommonJSModuleTransformer | undefined, node: {
        value: ShorthandPropertyAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ShorthandPropertyAssignment__from_ast.Name(node);
        let exportedOrImportedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionIdentifier(tx, name);
        if (!tsonicTypeScriptRuntime.sameLocation(exportedOrImportedName, name)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = exportedOrImportedName;
            if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer === undefined)) {
                const __gotots_store_390 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_136 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_390, "Transformer"));
                const __gotots_argument_412 = expression;
                const __gotots_store_391 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_413 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_391, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
                expression = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_136, __gotots_argument_412, __gotots_argument_413);
            }
            const __gotots_store_392 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_393 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_392, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_393, "NodeFactory"), void 0, name, void 0, void 0, expression);
            Node__from_ast.$storageOf(((assignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Loc)));
            const __gotots_store_394 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_137 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_394, "Transformer"));
            const __gotots_argument_414 = assignment;
            const __gotots_store_395 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_415 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_395, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_137, __gotots_argument_414, __gotots_argument_415);
            return assignment;
        }
        const __gotots_store_396 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_397 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_396, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_138 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_397, "NodeFactory");
        const __gotots_argument_416 = node;
        const __gotots_argument_417 = void 0;
        const __gotots_argument_418 = exportedOrImportedName;
        const __gotots_argument_419 = void 0;
        const __gotots_argument_420 = void 0;
        const __gotots_argument_421 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken;
        const __gotots_store_398 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_422 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_398, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
        return NodeFactory__from_ast.UpdateShorthandPropertyAssignment(__gotots_receiver_138, __gotots_argument_416, __gotots_argument_417, __gotots_argument_418, __gotots_argument_419, __gotots_argument_420, __gotots_argument_421, __gotots_argument_422);
    }
    static $go$private$moduletransforms$visitSourceFile(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_4 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile;
        if (!__gotots_logical_result_4) {
            let __gotots_logical_result_3 = IsEffectiveExternalModule__from_ast(node, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
            if (!__gotots_logical_result_3) {
                const __gotots_store_319 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                const __gotots_binary_operand_2 = NodeDefault__from_ast.SubtreeFacts(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_319, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                const __gotots_binary_operand_3 = SubtreeContainsDynamicImport$constant__from_ast();
                __gotots_logical_result_3 = !((__gotots_binary_operand_2 & __gotots_binary_operand_3) >>> 0 === 0);
            }
            __gotots_logical_result_4 = !(__gotots_logical_result_3);
        }
        if (__gotots_logical_result_4) {
            const __gotots_store_320 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_320, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = node;
        const __gotots_argument_336 = node;
        const __gotots_argument_337 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions;
        const __gotots_store_321 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_338 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_321, "Transformer"));
        const __gotots_argument_339 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo = collectExternalModuleInfo(__gotots_argument_336, __gotots_argument_337, __gotots_argument_338, __gotots_argument_339);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$transformCommonJSModule(tx, node);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentModuleInfo = void 0;
        return updated;
    }
    static $go$private$moduletransforms$visitTaggedTemplateExpression(tx: CommonJSModuleTransformer | undefined, node: {
        value: TaggedTemplateExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsIdentifier__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$visitExpressionIdentifier(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
            const __gotots_store_350 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_351 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_350, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_122 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_351, "NodeFactory");
            const __gotots_argument_373 = node;
            const __gotots_argument_374 = expression;
            const __gotots_argument_375 = void 0;
            const __gotots_argument_376 = void 0;
            const __gotots_store_352 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_377 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_352, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template);
            const __gotots_argument_378 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateTaggedTemplateExpression(__gotots_receiver_122, __gotots_argument_373, __gotots_argument_374, __gotots_argument_375, __gotots_argument_376, __gotots_argument_377, __gotots_argument_378);
            let __gotots_logical_result_8 = !IsIdentifier__from_ast(expression);
            if (__gotots_logical_result_8) {
                const __gotots_store_353 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_379 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_353, "Transformer"));
                const __gotots_argument_380 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag;
                __gotots_logical_result_8 = !IsHelperName__from_transformers(__gotots_argument_379, __gotots_argument_380);
            }
            if (__gotots_logical_result_8) {
                const __gotots_store_354 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_354, "Transformer")), updated, EFIndirectCall$constant__from_printer());
            }
            return updated;
        }
        const __gotots_store_355 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_123 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_355, "Transformer"));
        const __gotots_store_356 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_381 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_356, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_123, __gotots_argument_381);
    }
    static $go$private$moduletransforms$visitTopLevel(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(tx, node);
                    const __gotots_receiver_10 = tx;
                    const __gotots_argument_6 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_10, __gotots_argument_6);
                    };
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindImportDeclaration$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelImportDeclaration(tx, Node__from_ast.AsImportDeclaration(node));
                            break;
                        }
                        case KindImportEqualsDeclaration$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelImportEqualsDeclaration(tx, Node__from_ast.AsImportEqualsDeclaration(node));
                            break;
                        }
                        case KindExportDeclaration$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelExportDeclaration(tx, Node__from_ast.AsExportDeclaration(node));
                            break;
                        }
                        case KindExportAssignment$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelExportAssignment(tx, Node__from_ast.AsExportAssignment(node));
                            break;
                        }
                        case KindFunctionDeclaration$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelFunctionDeclaration(tx, Node__from_ast.AsFunctionDeclaration(node));
                            break;
                        }
                        case KindClassDeclaration$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                            break;
                        }
                        case KindVariableStatement$constant__from_ast(): {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelVariableStatement(tx, Node__from_ast.AsVariableStatement(node));
                            break;
                        }
                        default: {
                            node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedNoStack(tx, node);
                            break;
                        }
                    }
                    __gotots_return_0 = node;
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
    static $go$private$moduletransforms$visitTopLevelClassDeclaration(tx: CommonJSModuleTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_124 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_148 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_149 = ModifierFlagsExport$constant__from_ast();
        if (HasSyntacticModifier__from_ast(__gotots_argument_148, __gotots_argument_149)) {
            const __gotots_argument_161 = statements;
            const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_126 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "NodeFactory");
            const __gotots_argument_155 = node;
            const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_68 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "Transformer"));
            const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_150 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "Transformer"));
            const __gotots_store_129 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
            const __gotots_argument_151 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "ModifiersBase"));
            const __gotots_argument_152 = 4294965215;
            const __gotots_argument_153 = ExtractModifiers__from_transformers(__gotots_argument_150, __gotots_argument_151, __gotots_argument_152);
            const __gotots_argument_156 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_68, __gotots_argument_153);
            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_69 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "Transformer"));
            const __gotots_store_131 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_154 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_157 = NodeFactory__from_printer.GetDeclarationName(__gotots_receiver_69, __gotots_argument_154);
            const __gotots_argument_158 = void 0;
            const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_159 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_160 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
            const __gotots_argument_162 = NodeFactory__from_ast.UpdateClassDeclaration(__gotots_receiver_70, __gotots_argument_155, __gotots_argument_156, __gotots_argument_157, __gotots_argument_158, __gotots_argument_159, __gotots_argument_160);
            statements = __gotots_argument_161.append(void 0, [__gotots_argument_162]);
        }
        else {
            const __gotots_argument_164 = statements;
            const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_71 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "Transformer"));
            const __gotots_store_135 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_163 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_165 = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_71, __gotots_argument_163);
            statements = __gotots_argument_164.append(void 0, [__gotots_argument_165]);
        }
        const __gotots_receiver_72 = tx;
        const __gotots_argument_166 = statements;
        const __gotots_store_136 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_167 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfClassOrFunctionDeclaration(__gotots_receiver_72, __gotots_argument_166, __gotots_argument_167);
        const __gotots_argument_168 = statements;
        const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_169 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "Transformer"));
        return SingleOrMany__from_transformers(__gotots_argument_168, __gotots_argument_169);
    }
    static $go$private$moduletransforms$visitTopLevelExportAssignment(tx: CommonJSModuleTransformer | undefined, node: {
        value: ExportAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
            return void 0;
        }
        const __gotots_receiver_64 = tx;
        const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_110 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_127 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "NodeFactory"), "default");
        const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_128 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_112 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node));
        const __gotots_argument_129 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
            return TextRange__from_core.$fromStorage($go$storage);
        }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
            return TextRange__from_core.$storageOf($go$value);
        });
        const __gotots_argument_130 = true;
        const __gotots_argument_131 = false;
        return CommonJSModuleTransformer.$go$private$moduletransforms$createExportStatement(__gotots_receiver_64, __gotots_argument_127, __gotots_argument_128, __gotots_argument_129, __gotots_argument_130, __gotots_argument_131);
    }
    static $go$private$moduletransforms$visitTopLevelExportDeclaration(tx: CommonJSModuleTransformer | undefined, node: {
        value: ExportDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) {
            return void 0;
        }
        const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_43 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Transformer"));
        const __gotots_store_63 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_88 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        let generatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_43, __gotots_argument_88);
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined) && IsNamedExports__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause)) {
            let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_65 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory");
            const __gotots_argument_97 = void 0;
            const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_67 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
            const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_69 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory");
            const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_71 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeFactory");
            const __gotots_argument_90 = generatedName;
            const __gotots_argument_91 = void 0;
            const __gotots_argument_92 = void 0;
            const __gotots_receiver_44 = tx;
            const __gotots_store_72 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_89 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_93 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_44, __gotots_argument_89);
            const __gotots_slice_element_1 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_45, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
            const __gotots_argument_94 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
            const __gotots_argument_95 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_46, __gotots_argument_94);
            const __gotots_argument_96 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_98 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_47, __gotots_argument_95, __gotots_argument_96);
            let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_48, __gotots_argument_97, __gotots_argument_98);
            const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_49 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "Transformer"));
            const __gotots_argument_99 = varStatement;
            const __gotots_store_74 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_100 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_49, __gotots_argument_99, __gotots_argument_100);
            const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_50 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "Transformer"));
            const __gotots_argument_101 = varStatement;
            const __gotots_store_76 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_102 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_50, __gotots_argument_101, __gotots_argument_102);
            statements = statements.append(void 0, [varStatement]);
            const __gotots_range_0 = Node__from_ast.Elements((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                let specifierName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyNameOrName(specifier);
                let exportNeedsImportDefault = ModuleExportNameIsDefault__from_ast(specifierName);
                let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (exportNeedsImportDefault) {
                    const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    target = NodeFactory__from_printer.NewImportDefaultHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "Transformer")), generatedName);
                }
                else {
                    target = generatedName;
                }
                let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsStringLiteral__from_ast(Node__from_ast.Name(specifier))) {
                    const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    exportName = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "Transformer")), Node__from_ast.Name(specifier));
                }
                else {
                    const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    exportName = NodeFactory__from_printer.GetExportName(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "Transformer")), Node__from_ast.AsNode(specifier));
                }
                let exportedValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsStringLiteral__from_ast(specifierName)) {
                    const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_81 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    exportedValue = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory"), target, void 0, specifierName, NodeFlagsNone$constant__from_ast());
                }
                else {
                    const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_83 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    exportedValue = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "NodeFactory"), target, void 0, specifierName, NodeFlagsNone$constant__from_ast());
                }
                const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_85 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statement__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "NodeFactory"), CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(tx, exportName, exportedValue, void 0, true));
                const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "Transformer")), statement__shadow_1, Node__from_ast.AsNode(specifier));
                const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "Transformer")), statement__shadow_1, Node__from_ast.AsNode(specifier));
                statements = statements.append(void 0, [statement__shadow_1]);
            }
            const __gotots_argument_103 = statements;
            const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_104 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "Transformer"));
            return SingleOrMany__from_transformers(__gotots_argument_103, __gotots_argument_104);
        }
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined)) {
            let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (IsStringLiteral__from_ast(Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause))) {
                const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                exportName = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "Transformer")), Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause));
            }
            else {
                const __gotots_receiver_51 = Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_105 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "Transformer")));
                exportName = Node__from_ast.Clone(__gotots_receiver_51, __gotots_argument_105);
            }
            const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_92 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "NodeFactory");
            const __gotots_receiver_54 = tx;
            const __gotots_argument_109 = exportName;
            const __gotots_receiver_53 = tx;
            const __gotots_argument_107 = node;
            const __gotots_receiver_52 = tx;
            const __gotots_store_93 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_106 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_108 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_52, __gotots_argument_106);
            const __gotots_argument_110 = CommonJSModuleTransformer.$go$private$moduletransforms$getHelperExpressionForExport(__gotots_receiver_53, __gotots_argument_107, __gotots_argument_108);
            const __gotots_argument_111 = void 0;
            const __gotots_argument_112 = false;
            const __gotots_argument_113 = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(__gotots_receiver_54, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112);
            let statement__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_55, __gotots_argument_113);
            const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_56 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "Transformer"));
            const __gotots_argument_114 = statement__shadow_1;
            const __gotots_store_95 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_115 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_56, __gotots_argument_114, __gotots_argument_115);
            const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_57 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "Transformer"));
            const __gotots_argument_116 = statement__shadow_1;
            const __gotots_store_97 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_117 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_57, __gotots_argument_116, __gotots_argument_117);
            return statement__shadow_1;
        }
        const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_99 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_61 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "NodeFactory");
        const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_60 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "Transformer"));
        const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_59 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "Transformer"));
        const __gotots_receiver_58 = tx;
        const __gotots_store_102 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_118 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_119 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_58, __gotots_argument_118);
        const __gotots_store_103 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_104 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_120 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "NodeFactory"), "exports");
        const __gotots_argument_121 = NodeFactory__from_printer.NewExportStarHelper(__gotots_receiver_59, __gotots_argument_119, __gotots_argument_120);
        const __gotots_argument_122 = NodeVisitor__from_ast.VisitNode(__gotots_receiver_60, __gotots_argument_121);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_61, __gotots_argument_122);
        const __gotots_store_105 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_62 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "Transformer"));
        const __gotots_argument_123 = statement;
        const __gotots_store_106 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_124 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_62, __gotots_argument_123, __gotots_argument_124);
        const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_63 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "Transformer"));
        const __gotots_argument_125 = statement;
        const __gotots_store_108 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_126 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_63, __gotots_argument_125, __gotots_argument_126);
        return statement;
    }
    static $go$private$moduletransforms$visitTopLevelFunctionDeclaration(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_113 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_132 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_133 = ModifierFlagsExport$constant__from_ast();
        if (HasSyntacticModifier__from_ast(__gotots_argument_132, __gotots_argument_133)) {
            const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_115 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_66 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory");
            const __gotots_argument_138 = node;
            const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_134 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "Transformer"));
            const __gotots_store_117 = FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
            const __gotots_argument_135 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "ModifiersBase"), ($go$storage: ModifiersBase__from_ast$Storage): ModifiersBase__from_ast => {
                return ModifiersBase__from_ast.$fromStorage($go$storage);
            }, ($go$value: ModifiersBase__from_ast): ModifiersBase__from_ast$Storage => {
                return ModifiersBase__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_136 = 4294965215;
            const __gotots_argument_139 = ExtractModifiers__from_transformers(__gotots_argument_134, __gotots_argument_135, __gotots_argument_136);
            const __gotots_argument_140 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken;
            const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_65 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "Transformer"));
            const __gotots_store_119 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_137 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_141 = NodeFactory__from_printer.GetDeclarationName(__gotots_receiver_65, __gotots_argument_137);
            const __gotots_argument_142 = void 0;
            const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_143 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "Transformer")), FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters);
            const __gotots_argument_144 = void 0;
            const __gotots_argument_145 = void 0;
            const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_146 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "Transformer")), BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body);
            return NodeFactory__from_ast.UpdateFunctionDeclaration(__gotots_receiver_66, __gotots_argument_138, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141, __gotots_argument_142, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145, __gotots_argument_146);
        }
        else {
            const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_67 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "Transformer"));
            const __gotots_store_123 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_147 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_67, __gotots_argument_147);
        }
    }
    static $go$private$moduletransforms$visitTopLevelImportDeclaration(tx: CommonJSModuleTransformer | undefined, node: {
        value: ImportDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
            const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_2 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory");
            const __gotots_receiver_10 = tx;
            const __gotots_store_3 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_6 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_7 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_10, __gotots_argument_6);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_11, __gotots_argument_7);
            const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_12 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer"));
            const __gotots_argument_8 = statement;
            const __gotots_store_5 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_9 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_12, __gotots_argument_8, __gotots_argument_9);
            const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_13 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer"));
            const __gotots_argument_10 = statement;
            const __gotots_store_7 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_11 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_13, __gotots_argument_10, __gotots_argument_11);
            return statement;
        }
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let variables = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_8 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_12 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        let namespaceDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNamespaceDeclarationNode__from_ast(__gotots_argument_12);
        let __gotots_logical_result_0 = !(namespaceDeclaration === undefined);
        if (__gotots_logical_result_0) {
            const __gotots_store_9 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_13 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            __gotots_logical_result_0 = !IsDefaultImport__from_ast(__gotots_argument_13);
        }
        if (__gotots_logical_result_0) {
            const __gotots_argument_22 = variables;
            const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_11 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory");
            const __gotots_receiver_14 = Node__from_ast.Name(namespaceDeclaration);
            const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_14 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Transformer")));
            const __gotots_argument_18 = Node__from_ast.Clone(__gotots_receiver_14, __gotots_argument_14);
            const __gotots_argument_19 = void 0;
            const __gotots_argument_20 = void 0;
            const __gotots_receiver_16 = tx;
            const __gotots_argument_16 = node;
            const __gotots_receiver_15 = tx;
            const __gotots_store_13 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_15 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_17 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_15, __gotots_argument_15);
            const __gotots_argument_21 = CommonJSModuleTransformer.$go$private$moduletransforms$getHelperExpressionForImport(__gotots_receiver_16, __gotots_argument_16, __gotots_argument_17);
            const __gotots_argument_23 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
            variables = __gotots_argument_22.append(void 0, [__gotots_argument_23]);
        }
        else {
            const __gotots_argument_32 = variables;
            const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_15 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory");
            const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_18 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer"));
            const __gotots_store_17 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_24 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_28 = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_18, __gotots_argument_24);
            const __gotots_argument_29 = void 0;
            const __gotots_argument_30 = void 0;
            const __gotots_receiver_20 = tx;
            const __gotots_argument_26 = node;
            const __gotots_receiver_19 = tx;
            const __gotots_store_18 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_25 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_27 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_19, __gotots_argument_25);
            const __gotots_argument_31 = CommonJSModuleTransformer.$go$private$moduletransforms$getHelperExpressionForImport(__gotots_receiver_20, __gotots_argument_26, __gotots_argument_27);
            const __gotots_argument_33 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_21, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31);
            variables = __gotots_argument_32.append(void 0, [__gotots_argument_33]);
            let __gotots_logical_result_1 = !(namespaceDeclaration === undefined);
            if (__gotots_logical_result_1) {
                const __gotots_store_19 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_34 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                __gotots_logical_result_1 = IsDefaultImport__from_ast(__gotots_argument_34);
            }
            if (__gotots_logical_result_1) {
                const __gotots_argument_41 = variables;
                const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_21 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory");
                const __gotots_receiver_22 = Node__from_ast.Name(namespaceDeclaration);
                const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_35 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Transformer")));
                const __gotots_argument_37 = Node__from_ast.Clone(__gotots_receiver_22, __gotots_argument_35);
                const __gotots_argument_38 = void 0;
                const __gotots_argument_39 = void 0;
                const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_23 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "Transformer"));
                const __gotots_store_24 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_36 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                const __gotots_argument_40 = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_23, __gotots_argument_36);
                const __gotots_argument_42 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_24, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
                variables = __gotots_argument_41.append(void 0, [__gotots_argument_42]);
            }
        }
        const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_26 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory");
        const __gotots_argument_45 = void 0;
        const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_28 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory");
        const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_30 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_43 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory"), variables);
        const __gotots_argument_44 = NodeFlagsConst$constant__from_ast();
        const __gotots_argument_46 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_25, __gotots_argument_43, __gotots_argument_44);
        let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_26, __gotots_argument_45, __gotots_argument_46);
        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_27 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Transformer"));
        const __gotots_argument_47 = varStatement;
        const __gotots_store_32 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_48 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_27, __gotots_argument_47, __gotots_argument_48);
        const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_28 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Transformer"));
        const __gotots_argument_49 = varStatement;
        const __gotots_store_34 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_50 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_28, __gotots_argument_49, __gotots_argument_50);
        statements = statements.append(void 0, [varStatement]);
        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfImportDeclaration(tx, statements, node);
        const __gotots_argument_51 = statements;
        const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_52 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Transformer"));
        return SingleOrMany__from_transformers(__gotots_argument_51, __gotots_argument_52);
    }
    static $go$private$moduletransforms$visitTopLevelImportEqualsDeclaration(tx: CommonJSModuleTransformer | undefined, node: {
        value: ImportEqualsDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_36 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_53 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        if (!IsExternalModuleImportEqualsDeclaration__from_ast(__gotots_argument_53)) {
            const __gotots_argument_54 = new $goInterfaceAdapter$string("import= for internal module references should be handled in an earlier transformer.");
            GoPanic.raise(__gotots_argument_54 === undefined ? GoPanicNilValue.create() : __gotots_argument_54);
        }
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_37 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_55 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_56 = ModifierFlagsExport$constant__from_ast();
        if (HasSyntacticModifier__from_ast(__gotots_argument_55, __gotots_argument_56)) {
            const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_39 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory");
            const __gotots_receiver_30 = tx;
            const __gotots_argument_58 = ImportEqualsDeclaration__from_ast.Name(node);
            const __gotots_receiver_29 = tx;
            const __gotots_store_40 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_57 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_59 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_29, __gotots_argument_57);
            const __gotots_store_41 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node));
            const __gotots_argument_60 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                return TextRange__from_core.$fromStorage($go$storage);
            }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                return TextRange__from_core.$storageOf($go$value);
            });
            const __gotots_argument_61 = false;
            const __gotots_argument_62 = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(__gotots_receiver_30, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_31, __gotots_argument_62);
            const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_32 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "Transformer"));
            const __gotots_argument_63 = statement;
            const __gotots_store_43 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_64 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_32, __gotots_argument_63, __gotots_argument_64);
            const __gotots_store_44 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_33 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "Transformer"));
            const __gotots_argument_65 = statement;
            const __gotots_store_45 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_66 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_33, __gotots_argument_65, __gotots_argument_66);
            statements = statements.append(void 0, [statement]);
        }
        else {
            const __gotots_store_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_47 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_39 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "NodeFactory");
            const __gotots_argument_76 = void 0;
            const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_49 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory");
            const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_51 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NodeFactory");
            const __gotots_store_52 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_53 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "NodeFactory");
            const __gotots_receiver_34 = ImportEqualsDeclaration__from_ast.Name(node);
            const __gotots_store_54 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_67 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "Transformer")));
            const __gotots_argument_69 = Node__from_ast.Clone(__gotots_receiver_34, __gotots_argument_67);
            const __gotots_argument_70 = void 0;
            const __gotots_argument_71 = void 0;
            const __gotots_receiver_35 = tx;
            const __gotots_store_55 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_68 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_72 = CommonJSModuleTransformer.$go$private$moduletransforms$createRequireCall(__gotots_receiver_35, __gotots_argument_68);
            const __gotots_slice_element_0 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_36, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
            const __gotots_argument_73 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
            const __gotots_argument_74 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_37, __gotots_argument_73);
            const __gotots_argument_75 = NodeFlagsConst$constant__from_ast();
            const __gotots_argument_77 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_38, __gotots_argument_74, __gotots_argument_75);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_39, __gotots_argument_76, __gotots_argument_77);
            const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_40 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Transformer"));
            const __gotots_argument_78 = statement;
            const __gotots_store_57 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_79 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_40, __gotots_argument_78, __gotots_argument_79);
            const __gotots_store_58 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_41 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "Transformer"));
            const __gotots_argument_80 = statement;
            const __gotots_store_59 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_81 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_41, __gotots_argument_80, __gotots_argument_81);
            statements = statements.append(void 0, [statement]);
        }
        const __gotots_receiver_42 = tx;
        const __gotots_argument_82 = statements;
        const __gotots_store_60 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_83 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_84 = void 0;
        const __gotots_argument_85 = false;
        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfDeclaration(__gotots_receiver_42, __gotots_argument_82, __gotots_argument_83, __gotots_argument_84, __gotots_argument_85);
        const __gotots_argument_86 = statements;
        const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_87 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "Transformer"));
        return SingleOrMany__from_transformers(__gotots_argument_86, __gotots_argument_87);
    }
    static $go$private$moduletransforms$visitTopLevelNested(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$pushNode(tx, node);
                    const __gotots_receiver_10 = tx;
                    const __gotots_argument_6 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        CommonJSModuleTransformer.$go$private$moduletransforms$popNode(__gotots_receiver_10, __gotots_argument_6);
                    };
                    __gotots_return_0 = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedNoStack(tx, node);
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
    static $go$private$moduletransforms$visitTopLevelNestedBlock(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor;
        const __gotots_store_318 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(Block__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_335 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_318, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_114, __gotots_argument_335);
    }
    static $go$private$moduletransforms$visitTopLevelNestedCaseBlock(tx: CommonJSModuleTransformer | undefined, node: {
        value: CaseBlock__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor;
        const __gotots_store_311 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_330 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_311, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_111, __gotots_argument_330);
    }
    static $go$private$moduletransforms$visitTopLevelNestedCaseOrDefaultClause(tx: CommonJSModuleTransformer | undefined, node: {
        value: CaseOrDefaultClause__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_312 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_313 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_312, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_112 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_313, "NodeFactory");
        const __gotots_argument_331 = node;
        const __gotots_store_314 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_332 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_314, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_argument_333 = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements);
        return NodeFactory__from_ast.UpdateCaseOrDefaultClause(__gotots_receiver_112, __gotots_argument_331, __gotots_argument_332, __gotots_argument_333);
    }
    static $go$private$moduletransforms$visitTopLevelNestedCatchClause(tx: CommonJSModuleTransformer | undefined, node: {
        value: CatchClause__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_316 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_317 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_316, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateCatchClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_317, "NodeFactory"), node, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration, NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Block));
    }
    static $go$private$moduletransforms$visitTopLevelNestedDoStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: DoStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_286 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_287 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_286, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_106 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_287, "NodeFactory");
        const __gotots_argument_316 = node;
        const __gotots_store_288 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_317 = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_288, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
        const __gotots_store_289 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_318 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_289, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        return NodeFactory__from_ast.UpdateDoStatement(__gotots_receiver_106, __gotots_argument_316, __gotots_argument_317, __gotots_argument_318);
    }
    static $go$private$moduletransforms$visitTopLevelNestedForInOrOfStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsVariableDeclarationList__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer) && (Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsBlockScoped$constant__from_ast()) >>> 0 === 0) {
            let exportStatements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfVariableDeclarationList(tx, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), Node__from_ast.AsVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer), true);
            if (exportStatements.length > 0) {
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
                const __gotots_store_270 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_270, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                const __gotots_store_271 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_271, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
                if (IsBlock__from_ast(body)) {
                    let block: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock(body);
                    let bodyStatements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(exportStatements, NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                    const __gotots_store_272 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_273 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_272, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let bodyStatementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_273, "NodeFactory"), bodyStatements);
                    NodeList__from_ast.$storageOf(((bodyStatementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                    const __gotots_store_274 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_275 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_274, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    body = NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_275, "NodeFactory"), block, bodyStatementList, Block__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
                }
                else {
                    let bodyStatements = exportStatements.append(void 0, [body]);
                    const __gotots_store_276 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_277 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_276, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_104 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_277, "NodeFactory");
                    const __gotots_store_278 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_279 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_278, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_309 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_279, "NodeFactory"), bodyStatements);
                    const __gotots_argument_310 = true;
                    body = NodeFactory__from_ast.NewBlock(__gotots_receiver_104, __gotots_argument_309, __gotots_argument_310);
                }
                const __gotots_store_280 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_281 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_280, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateForInOrOfStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_281, "NodeFactory"), node, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier, initializer, expression, body);
            }
        }
        const __gotots_store_282 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_283 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_282, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_105 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_283, "NodeFactory");
        const __gotots_argument_311 = node;
        const __gotots_argument_312 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier;
        const __gotots_argument_313 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_284 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_314 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_284, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_285 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_315 = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_285, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
        return NodeFactory__from_ast.UpdateForInOrOfStatement(__gotots_receiver_105, __gotots_argument_311, __gotots_argument_312, __gotots_argument_313, __gotots_argument_314, __gotots_argument_315);
    }
    static $go$private$moduletransforms$visitTopLevelNestedForStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: ForStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined) && IsVariableDeclarationList__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer) && (Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsBlockScoped$constant__from_ast()) >>> 0 === 0) {
            let exportStatements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfVariableDeclarationList(tx, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), Node__from_ast.AsVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer), false);
            if (exportStatements.length > 0) {
                let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
                const __gotots_store_259 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_260 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_259, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_260, "NodeFactory"), void 0, varDeclList);
                statements = statements.append(void 0, [varStatement]);
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, exportStatements, void 0);
                const __gotots_store_261 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let condition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_261, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition);
                let incrementor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
                const __gotots_store_262 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_262, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
                const __gotots_argument_300 = statements;
                const __gotots_store_263 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_264 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_263, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_301 = NodeFactory__from_ast.UpdateForStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_264, "NodeFactory"), node, void 0, condition, incrementor, body);
                statements = __gotots_argument_300.append(void 0, [__gotots_argument_301]);
                const __gotots_argument_302 = statements;
                const __gotots_store_265 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_303 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_265, "Transformer"));
                return SingleOrMany__from_transformers(__gotots_argument_302, __gotots_argument_303);
            }
        }
        const __gotots_store_266 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_267 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_266, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_103 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_267, "NodeFactory");
        const __gotots_argument_304 = node;
        const __gotots_argument_305 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_268 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_306 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_268, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition);
        const __gotots_argument_307 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
        const __gotots_store_269 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_308 = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_269, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
        return NodeFactory__from_ast.UpdateForStatement(__gotots_receiver_103, __gotots_argument_304, __gotots_argument_305, __gotots_argument_306, __gotots_argument_307, __gotots_argument_308);
    }
    static $go$private$moduletransforms$visitTopLevelNestedIfStatement(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_301 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_301, "Transformer")), IfStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).Expression);
        let thenStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, IfStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ThenStatement);
        if (thenStatement === undefined) {
            const __gotots_store_302 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_303 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_302, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_109 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_303, "NodeFactory");
            const __gotots_store_304 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_305 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_304, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_325 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_305, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
            const __gotots_argument_326 = false;
            thenStatement = NodeFactory__from_ast.NewBlock(__gotots_receiver_109, __gotots_argument_325, __gotots_argument_326);
        }
        let elseStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, IfStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement);
        const __gotots_store_306 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_307 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_306, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateIfStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_307, "NodeFactory"), node, expression, thenStatement, elseStatement);
    }
    static $go$private$moduletransforms$visitTopLevelNestedLabeledStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: LabeledStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
        if (statement === undefined) {
            const __gotots_store_294 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_295 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_294, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            statement = NodeFactory__from_ast.NewEmptyStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_295, "NodeFactory"));
        }
        const __gotots_store_296 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_297 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_296, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateLabeledStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_297, "NodeFactory"), node, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label, statement);
    }
    static $go$private$moduletransforms$visitTopLevelNestedNoStack(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindVariableStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelVariableStatement(tx, Node__from_ast.AsVariableStatement(node));
                break;
            }
            case KindForStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedForStatement(tx, Node__from_ast.AsForStatement(node));
                break;
            }
            case KindForInStatement$constant__from_ast():
            case KindForOfStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedForInOrOfStatement(tx, Node__from_ast.AsForInOrOfStatement(node));
                break;
            }
            case KindDoStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedDoStatement(tx, Node__from_ast.AsDoStatement(node));
                break;
            }
            case KindWhileStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedWhileStatement(tx, Node__from_ast.AsWhileStatement(node));
                break;
            }
            case KindLabeledStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedLabeledStatement(tx, Node__from_ast.AsLabeledStatement(node));
                break;
            }
            case KindWithStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedWithStatement(tx, Node__from_ast.AsWithStatement(node));
                break;
            }
            case KindIfStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedIfStatement(tx, Node__from_ast.AsIfStatement(node));
                break;
            }
            case KindSwitchStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedSwitchStatement(tx, Node__from_ast.AsSwitchStatement(node));
                break;
            }
            case KindCaseBlock$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedCaseBlock(tx, Node__from_ast.AsCaseBlock(node));
                break;
            }
            case KindCaseClause$constant__from_ast():
            case KindDefaultClause$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedCaseOrDefaultClause(tx, Node__from_ast.AsCaseOrDefaultClause(node));
                break;
            }
            case KindTryStatement$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedTryStatement(tx, Node__from_ast.AsTryStatement(node));
                break;
            }
            case KindCatchClause$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedCatchClause(tx, Node__from_ast.AsCatchClause(node));
                break;
            }
            case KindBlock$constant__from_ast(): {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedBlock(tx, Node__from_ast.AsBlock(node));
                break;
            }
            default: {
                node = CommonJSModuleTransformer.$go$private$moduletransforms$visitNoStack(tx, node, false);
                break;
            }
        }
        return node;
    }
    static $go$private$moduletransforms$visitTopLevelNestedSwitchStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: SwitchStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_308 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_309 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_308, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_110 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_309, "NodeFactory");
        const __gotots_argument_327 = node;
        const __gotots_store_310 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_328 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_310, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_argument_329 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CaseBlock);
        return NodeFactory__from_ast.UpdateSwitchStatement(__gotots_receiver_110, __gotots_argument_327, __gotots_argument_328, __gotots_argument_329);
    }
    static $go$private$moduletransforms$visitTopLevelNestedTryStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: TryStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_113 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor;
        const __gotots_store_315 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_334 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_315, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_113, __gotots_argument_334);
    }
    static $go$private$moduletransforms$visitTopLevelNestedVariableStatement(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_argument_296 = statements;
        const __gotots_store_256 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_102 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_256, "Transformer"));
        const __gotots_store_257 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_295 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_257, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_297 = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_102, __gotots_argument_295);
        statements = __gotots_argument_296.append(void 0, [__gotots_argument_297]);
        statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfVariableStatement(tx, statements, node);
        const __gotots_argument_298 = statements;
        const __gotots_store_258 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_299 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_258, "Transformer"));
        return SingleOrMany__from_transformers(__gotots_argument_298, __gotots_argument_299);
    }
    static $go$private$moduletransforms$visitTopLevelNestedWhileStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: WhileStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_290 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_291 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_290, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_107 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_291, "NodeFactory");
        const __gotots_argument_319 = node;
        const __gotots_store_292 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_320 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_292, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_store_293 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_321 = EmitContext__from_printer.VisitIterationBody(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_293, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor);
        return NodeFactory__from_ast.UpdateWhileStatement(__gotots_receiver_107, __gotots_argument_319, __gotots_argument_320, __gotots_argument_321);
    }
    static $go$private$moduletransforms$visitTopLevelNestedWithStatement(tx: CommonJSModuleTransformer | undefined, node: {
        value: WithStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_298 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_299 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_298, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_108 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_299, "NodeFactory");
        const __gotots_argument_322 = node;
        const __gotots_store_300 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_323 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_300, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_argument_324 = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
        return NodeFactory__from_ast.UpdateWithStatement(__gotots_receiver_108, __gotots_argument_322, __gotots_argument_323, __gotots_argument_324);
    }
    static $go$private$moduletransforms$visitTopLevelVariableStatement(tx: CommonJSModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_138 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_170 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_171 = ModifierFlagsExport$constant__from_ast();
        if (HasSyntacticModifier__from_ast(__gotots_argument_170, __gotots_argument_171)) {
            let variables = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
            let commitPendingVariables: (() => void) | undefined = (): void => {
                if (variables.length > 0) {
                    const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_140 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let variableList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory"), variables);
                    const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_142 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_73 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory");
                    const __gotots_argument_172 = node;
                    const __gotots_argument_173 = modifiers;
                    const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_144 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_174 = NodeFactory__from_ast.UpdateVariableDeclarationList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory"), Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList), variableList, Node__from_ast.$storageOf(((VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags);
                    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateVariableStatement(__gotots_receiver_73, __gotots_argument_172, __gotots_argument_173, __gotots_argument_174);
                    if (statements.length > 0) {
                        const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "Transformer")), statement, EFNoComments$constant__from_printer());
                    }
                    statements = statements.append(void 0, [statement]);
                    variables = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                }
            };
            let commitPendingExpressions: (() => void) | undefined = (): void => {
                if (expressions.length > 0) {
                    const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_147 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_74 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeFactory");
                    const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_175 = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "Transformer")), expressions);
                    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_74, __gotots_argument_175);
                    const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_75 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "Transformer"));
                    const __gotots_argument_176 = statement;
                    const __gotots_store_150 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
                    const __gotots_argument_177 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_75, __gotots_argument_176, __gotots_argument_177);
                    if (statements.length > 0) {
                        const __gotots_store_151 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "Transformer")), statement, EFNoComments$constant__from_printer());
                    }
                    statements = statements.append(void 0, [statement]);
                    expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                }
            };
            let pushVariable: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (variable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                const __gotots_callee_0 = commitPendingExpressions;
                (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
                variables = variables.append(void 0, [variable]);
            };
            let pushExpression: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                const __gotots_callee_1 = commitPendingVariables;
                (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                expressions = expressions.append(void 0, [expression]);
            };
            const __gotots_range_1 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let variable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                let v: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined = Node__from_ast.AsVariableDeclaration(variable);
                let __gotots_logical_result_2 = IsIdentifier__from_ast(VariableDeclaration__from_ast.Name(v));
                if (__gotots_logical_result_2) {
                    const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_178 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "Transformer"));
                    const __gotots_argument_179 = VariableDeclaration__from_ast.Name(v);
                    __gotots_logical_result_2 = IsLocalName__from_transformers(__gotots_argument_178, __gotots_argument_179);
                }
                if (__gotots_logical_result_2) {
                    if (modifiers === undefined) {
                        const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_180 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "Transformer"));
                        const __gotots_store_154 = VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value);
                        const __gotots_argument_181 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "ModifiersBase"), ($go$storage: ModifiersBase__from_ast$Storage): ModifiersBase__from_ast => {
                            return ModifiersBase__from_ast.$fromStorage($go$storage);
                        }, ($go$value: ModifiersBase__from_ast): ModifiersBase__from_ast$Storage => {
                            return ModifiersBase__from_ast.$storageOf($go$value);
                        }));
                        const __gotots_argument_182 = 4294965215;
                        modifiers = ExtractModifiers__from_transformers(__gotots_argument_180, __gotots_argument_181, __gotots_argument_182);
                    }
                    if (!(VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined)) {
                        const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_156 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_155, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_77 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory");
                        const __gotots_argument_187 = v;
                        const __gotots_argument_188 = VariableDeclaration__from_ast.Name(v);
                        const __gotots_argument_189 = void 0;
                        const __gotots_argument_190 = void 0;
                        const __gotots_receiver_76 = tx;
                        const __gotots_argument_183 = VariableDeclaration__from_ast.Name(v);
                        const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_184 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "Transformer")), VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
                        const __gotots_argument_185 = void 0;
                        const __gotots_argument_186 = false;
                        const __gotots_argument_191 = CommonJSModuleTransformer.$go$private$moduletransforms$createExportExpression(__gotots_receiver_76, __gotots_argument_183, __gotots_argument_184, __gotots_argument_185, __gotots_argument_186);
                        variable = NodeFactory__from_ast.UpdateVariableDeclaration(__gotots_receiver_77, __gotots_argument_187, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190, __gotots_argument_191);
                    }
                    const __gotots_callee_2 = pushVariable;
                    const __gotots_argument_192 = variable;
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_192);
                }
                else if (!(VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined) && !IsBindingPattern__from_ast(VariableDeclaration__from_ast.Name(v)) && (IsArrowFunction__from_ast(VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer) || IsFunctionExpression__from_ast(VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer) || IsClassExpression__from_ast(VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer))) {
                    const __gotots_callee_3 = pushVariable;
                    const __gotots_store_158 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_159 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_78 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "NodeFactory");
                    const __gotots_argument_193 = VariableDeclaration__from_ast.Name(v);
                    const __gotots_argument_194 = VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).ExclamationToken;
                    const __gotots_argument_195 = VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Type;
                    const __gotots_store_160 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_196 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "Transformer")), VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
                    const __gotots_argument_197 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_78, __gotots_argument_193, __gotots_argument_194, __gotots_argument_195, __gotots_argument_196);
                    (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_197);
                    const __gotots_store_161 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_162 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_79 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory");
                    const __gotots_store_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_164 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_198 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory"), "exports");
                    const __gotots_argument_199 = void 0;
                    const __gotots_argument_200 = VariableDeclaration__from_ast.Name(v);
                    const __gotots_argument_201 = NodeFlagsNone$constant__from_ast();
                    let propertyAccess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_79, __gotots_argument_198, __gotots_argument_199, __gotots_argument_200, __gotots_argument_201);
                    const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "Transformer")), propertyAccess, VariableDeclaration__from_ast.Name(v));
                    const __gotots_callee_4 = pushExpression;
                    const __gotots_store_166 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_81 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "Transformer"));
                    const __gotots_argument_203 = propertyAccess;
                    const __gotots_receiver_80 = VariableDeclaration__from_ast.Name(v);
                    const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_202 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "Transformer")));
                    const __gotots_argument_204 = Node__from_ast.Clone(__gotots_receiver_80, __gotots_argument_202);
                    const __gotots_argument_205 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_81, __gotots_argument_203, __gotots_argument_204);
                    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_205);
                }
                else if (IsIdentifier__from_ast(VariableDeclaration__from_ast.Name(v))) {
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$transformInitializedVariable(tx, v);
                    if (!(expression === undefined)) {
                        const __gotots_callee_5 = pushExpression;
                        const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_206 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "Transformer")), expression);
                        (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_206);
                    }
                }
                else if (IsBindingPattern__from_ast(VariableDeclaration__from_ast.Name(v))) {
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = CommonJSModuleTransformer.$go$private$moduletransforms$transformInitializedVariable(tx, v);
                    if (!(expression === undefined)) {
                        const __gotots_callee_6 = pushExpression;
                        const __gotots_argument_207 = expression;
                        (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_207);
                    }
                }
                else {
                    const __gotots_store_169 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_208 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "Transformer"));
                    const __gotots_argument_209 = v;
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ConvertVariableDeclarationToAssignmentExpression__from_transformers(__gotots_argument_208, __gotots_argument_209);
                    if (!(expression === undefined)) {
                        const __gotots_callee_7 = pushExpression;
                        const __gotots_store_170 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_210 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "Transformer")), expression);
                        (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_210);
                    }
                }
            }
            const __gotots_callee_8 = commitPendingVariables;
            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_callee_9 = commitPendingExpressions;
            (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))();
            statements = CommonJSModuleTransformer.$go$private$moduletransforms$appendExportsOfVariableStatement(tx, statements, node);
            const __gotots_argument_211 = statements;
            const __gotots_store_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_212 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "Transformer"));
            return SingleOrMany__from_transformers(__gotots_argument_211, __gotots_argument_212);
        }
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNestedVariableStatement(tx, node);
    }
    static $go$private$moduletransforms$visitVoidExpression(tx: CommonJSModuleTransformer | undefined, node: {
        value: VoidExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor;
        const __gotots_store_331 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase));
        const __gotots_argument_351 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_331, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_118, __gotots_argument_351);
    }
}
export function NewCommonJSModuleTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let tx: CommonJSModuleTransformer | undefined = new CommonJSModuleTransformer(Transformer__from_transformers.$zero(), void 0, void 0, void 0, void 0, compilerOptions, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Resolver, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GetEmitModuleFormatOfFile, 0, 0, void 0, void 0, void 0, void 0);
    const __gotots_receiver_1 = emitContext;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevel(__gotots_receiver_0, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_1, __gotots_argument_0);
    const __gotots_receiver_3 = emitContext;
    const __gotots_receiver_2 = tx;
    const __gotots_argument_1 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitTopLevelNested(__gotots_receiver_2, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).topLevelNestedVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_3, __gotots_argument_1);
    const __gotots_receiver_5 = emitContext;
    const __gotots_receiver_4 = tx;
    const __gotots_argument_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitDiscardedValue(__gotots_receiver_4, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discardedValueVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_5, __gotots_argument_2);
    const __gotots_receiver_7 = emitContext;
    const __gotots_receiver_6 = tx;
    const __gotots_argument_3 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return CommonJSModuleTransformer.$go$private$moduletransforms$visitAssignmentPattern(__gotots_receiver_6, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).assignmentPatternVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_7, __gotots_argument_3);
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).languageVersion = CompilerOptions__from_core.GetEmitScriptTarget(compilerOptions);
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).moduleKind = CompilerOptions__from_core.GetEmitModuleKind(compilerOptions);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_8 = tx;
    const __gotots_argument_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return CommonJSModuleTransformer.$go$private$moduletransforms$visit(__gotots_receiver_8, $argument0);
    };
    const __gotots_argument_5 = emitContext;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_9, __gotots_argument_4, __gotots_argument_5);
}
