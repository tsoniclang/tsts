import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ComputedPropertyName as ComputedPropertyName__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, ModuleBlock as ModuleBlock__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, TryStatement as TryStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { Block as Block__from_ast, BodyBase as BodyBase__from_ast, ChildIsDecorated as ChildIsDecorated__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, EnumDeclaration as EnumDeclaration__from_ast, EnumMember as EnumMember__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsEnumConst as IsEnumConst__from_ast, IsEnumDeclaration as IsEnumDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInstantiatedModule as IsInstantiatedModule__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsTryStatement as IsTryStatement__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindOverrideKeyword$constant as KindOverrideKeyword$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPrivateKeyword$constant as KindPrivateKeyword$constant__from_ast, KindProtectedKeyword$constant as KindProtectedKeyword$constant__from_ast, KindPublicKeyword$constant as KindPublicKeyword$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, ModuleDeclaration as ModuleDeclaration__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsIdentifier$constant as SubtreeContainsIdentifier$constant__from_ast, SubtreeContainsTypeScript$constant as SubtreeContainsTypeScript$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindSystem$constant as ModuleKindSystem$constant__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Result as Result__from_evaluator } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import { AssignedNameOptions as AssignedNameOptions__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFNoLeadingComments$constant as EFNoLeadingComments$constant__from_printer, EFNoTrailingComments$constant as EFNoTrailingComments$constant__from_printer, EFNone$constant as EFNone$constant__from_printer, EFStartOnNewLine$constant as EFStartOnNewLine$constant__from_printer, EmitContext as EmitContext__from_printer, NameOptions as NameOptions__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ConvertVariableDeclarationToAssignmentExpression as ConvertVariableDeclarationToAssignmentExpression__from_transformers, CreateAssignmentCallback as CreateAssignmentCallback__from_transformers, ExtractModifiers as ExtractModifiers__from_transformers, FindSuperStatementIndexPath as FindSuperStatementIndexPath__from_transformers, FlattenDestructuringAssignment as FlattenDestructuringAssignment__from_transformers, FlattenLevelAll$constant as FlattenLevelAll$constant__from_transformers, IsGeneratedIdentifier as IsGeneratedIdentifier__from_transformers, IsIdentifierReference as IsIdentifierReference__from_transformers, IsLocalName as IsLocalName__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { Coalesce$PointerTo_Named_ast$Node$Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Coalesce.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstResult$SliceOf_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { IfElse$Named_ast$NodeFlags } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../support/maps.js";
import { constantExpression } from "./utilities.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
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
export class RuntimeSyntaxTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public parentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentSourceFile: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public currentEnum: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentNamespace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public resolver: ReferenceResolver__from_binder | undefined, public emitResolver: EmitResolver__from_printer | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$tstransforms$addVarForDeclaration(tx: RuntimeSyntaxTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        bool
    ] {
        RuntimeSyntaxTransformer.$go$private$tstransforms$recordDeclarationInScope(tx, node);
        if (!RuntimeSyntaxTransformer.$go$private$tstransforms$isFirstDeclarationInScope(tx, node)) {
            return [statements, false];
        }
        const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalNameEx(Transformer__from_transformers.Factory(__gotots_store_194.Transformer), node, new AssignedNameOptions__from_printer(false, true, false));
        const __gotots_store_195 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_196 = (Transformer__from_transformers.Factory(__gotots_store_195.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_196, "NodeFactory"), name, void 0, void 0, void 0);
        let varFlags = IfElse$Named_ast$NodeFlags(tsonicTypeScriptRuntime.sameLocation((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile), NodeFlagsNone$constant__from_ast(), NodeFlagsLet$constant__from_ast());
        const __gotots_store_197 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_198 = (Transformer__from_transformers.Factory(__gotots_store_197.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_68 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_198, "NodeFactory");
        const __gotots_store_199 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_200 = (Transformer__from_transformers.Factory(__gotots_store_199.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_169 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
        const __gotots_argument_170 = varFlags;
        let varDecls: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_68, __gotots_argument_169, __gotots_argument_170);
        let modifierMask = 4294905632;
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined)) {
            modifierMask = (modifierMask & ~32) >>> 0;
        }
        const __gotots_store_201 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_171 = Transformer__from_transformers.EmitContext(__gotots_store_201.Transformer);
        const __gotots_argument_172 = Node__from_ast.Modifiers(node);
        const __gotots_argument_173 = modifierMask;
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = ExtractModifiers__from_transformers(__gotots_argument_171, __gotots_argument_172, __gotots_argument_173);
        const __gotots_store_202 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_203 = (Transformer__from_transformers.Factory(__gotots_store_202.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "NodeFactory"), modifiers, varDecls);
        const __gotots_store_204 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_204.Transformer), varDecl, node);
        const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_205.Transformer), varStatement, node);
        if (IsEnumDeclaration__from_ast(node)) {
            const __gotots_store_206 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_206.Transformer), varDecls, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        else {
            const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_207.Transformer), varStatement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        const __gotots_store_208 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_208.Transformer), varStatement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_209.Transformer), varStatement, EFNoTrailingComments$constant__from_printer());
        statements = statements.append(void 0, [varStatement]);
        return [statements, true];
    }
    static $go$private$tstransforms$createExportAssignment(tx: RuntimeSyntaxTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, exportAssignmentSourceMapRange: TextRange__from_core, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceQualifiedProperty(tx, RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace), name);
        const __gotots_store_310 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let exportAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_310.Transformer), exportName, expression);
        const __gotots_store_311 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_311.Transformer), exportAssignment, original);
        const __gotots_store_312 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_312.Transformer), exportAssignment, TextRange__from_core.$copy(exportAssignmentSourceMapRange));
        return exportAssignment;
    }
    static $go$private$tstransforms$createExportStatement(tx: RuntimeSyntaxTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, exportAssignmentSourceMapRange: TextRange__from_core, exportStatementSourceMapRange: TextRange__from_core, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_269 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_270 = (Transformer__from_transformers.Factory(__gotots_store_269.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let exportStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_270, "NodeFactory"), RuntimeSyntaxTransformer.$go$private$tstransforms$createExportAssignment(tx, name, expression, TextRange__from_core.$copy(exportAssignmentSourceMapRange), original));
        const __gotots_store_271 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_271.Transformer), exportStatement, original);
        const __gotots_store_272 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_272.Transformer), exportStatement, TextRange__from_core.$copy(exportStatementSourceMapRange));
        return exportStatement;
    }
    static $go$private$tstransforms$createExportStatementForDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_233 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetExternalModuleOrNamespaceExportName(Transformer__from_transformers.Factory(__gotots_store_233.Transformer), RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace), node, false, true);
        const __gotots_store_234 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalName(Transformer__from_transformers.Factory(__gotots_store_234.Transformer), node);
        const __gotots_store_235 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_235.Transformer), exportName, localName);
        let exportAssignmentSourceMapRange = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
        if (!(Node__from_ast.Name(node) === undefined)) {
            exportAssignmentSourceMapRange = exportAssignmentSourceMapRange.WithPos(Node__from_ast.Pos(Node__from_ast.Name(node)));
        }
        const __gotots_store_236 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_236.Transformer), expression, TextRange__from_core.$copy(exportAssignmentSourceMapRange));
        const __gotots_store_237 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_238 = (Transformer__from_transformers.Factory(__gotots_store_237.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_238, "NodeFactory"), expression);
        let exportStatementSourceMapRange = TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).WithPos(-1);
        const __gotots_store_239 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_239.Transformer), statement, TextRange__from_core.$copy(exportStatementSourceMapRange));
        return statement;
    }
    static $go$private$tstransforms$createNamespaceExportExpression(tx: RuntimeSyntaxTransformer | undefined, exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, exportValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let memberName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceQualifiedProperty(tx, RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace), exportName);
        const __gotots_store_268 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_268.Transformer), memberName, exportValue);
        if (!(location === undefined)) {
            Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$copy(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value)));
        }
        return expression;
    }
    static $go$private$tstransforms$getEnumQualifiedElement(tx: RuntimeSyntaxTransformer | undefined, __go_enum: {
        value: EnumDeclaration__from_ast;
    } | undefined, member: {
        value: EnumMember__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_95 = tx;
        const __gotots_receiver_94 = tx;
        const __gotots_store_313 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((__go_enum ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_238 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_313, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_239 = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(__gotots_receiver_94, __gotots_argument_238);
        const __gotots_argument_240 = RuntimeSyntaxTransformer.$go$private$tstransforms$getExpressionForPropertyName(tx, member);
        let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceQualifiedElement(__gotots_receiver_95, __gotots_argument_239, __gotots_argument_240);
        const __gotots_store_314 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_314.Transformer), prop, 924);
        return prop;
    }
    static $go$private$tstransforms$getExportQualifiedReferenceToDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(tx, (void Node__from_ast.AsNode,
            node))) {
            const __gotots_store_210 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeFactory__from_printer.GetExternalModuleOrNamespaceExportName(Transformer__from_transformers.Factory(__gotots_store_210.Transformer), RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(tx, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace), node, false, true);
        }
        const __gotots_store_211 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.GetDeclarationNameEx(Transformer__from_transformers.Factory(__gotots_store_211.Transformer), (void Node__from_ast.AsNode,
            node), new NameOptions__from_printer(false, true));
    }
    static $go$private$tstransforms$getExpressionForPropertyName(tx: RuntimeSyntaxTransformer | undefined, member: {
        value: EnumMember__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EnumMember__from_ast.Name(member);
        switch (Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPrivateIdentifier$constant__from_ast(): {
                const __gotots_store_315 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_316 = (Transformer__from_transformers.Factory(__gotots_store_315.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_316, "NodeFactory"), "");
                break;
            }
            case KindComputedPropertyName$constant__from_ast(): {
                let n: {
                    value: ComputedPropertyName__from_ast;
                } | undefined = Node__from_ast.AsComputedPropertyName(name);
                const __gotots_store_317 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_317.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                break;
            }
            case KindIdentifier$constant__from_ast(): {
                const __gotots_store_318 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_319 = (Transformer__from_transformers.Factory(__gotots_store_318.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_319, "NodeFactory"), Node__from_ast.Text(name), TokenFlagsNone$constant__from_ast());
                break;
            }
            case KindStringLiteral$constant__from_ast(): {
                const __gotots_store_320 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_321 = (Transformer__from_transformers.Factory(__gotots_store_320.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_321, "NodeFactory"), Node__from_ast.Text(name), TokenFlagsNone$constant__from_ast());
                break;
            }
            case KindNumericLiteral$constant__from_ast(): {
                const __gotots_store_322 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_323 = (Transformer__from_transformers.Factory(__gotots_store_322.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_323, "NodeFactory"), Node__from_ast.Text(name), TokenFlagsNone$constant__from_ast());
                break;
            }
            default: {
                return name;
                break;
            }
        }
    }
    static $go$private$tstransforms$getNamespaceContainerName(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_221 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_221.Transformer), node);
    }
    static $go$private$tstransforms$getNamespaceQualifiedElement(tx: RuntimeSyntaxTransformer | undefined, ns: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_324 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_325 = ((Transformer__from_transformers.EmitContext(__gotots_store_324.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let qualifiedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_325, "NodeFactory"), ns, void 0, expression, NodeFlagsNone$constant__from_ast());
        const __gotots_store_326 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(__gotots_store_326.Transformer), qualifiedName, expression);
        return qualifiedName;
    }
    static $go$private$tstransforms$getNamespaceQualifiedProperty(tx: RuntimeSyntaxTransformer | undefined, ns: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_309 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.GetNamespaceMemberName(Transformer__from_transformers.Factory(__gotots_store_309.Transformer), ns, name, new NameOptions__from_printer(false, true));
    }
    static $go$private$tstransforms$getParameterProperties(tx: RuntimeSyntaxTransformer | undefined, __go_constructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined> {
        let parameterProperties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined>();
        if (!(__go_constructor === undefined)) {
            const __gotots_range_6 = Node__from_ast.Parameters(__go_constructor);
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                if (IsParameterPropertyDeclaration__from_ast(parameter, __go_constructor)) {
                    parameterProperties = parameterProperties.append(void 0, [Node__from_ast.AsParameterDeclaration(parameter)]);
                }
            }
        }
        return parameterProperties;
    }
    static $go$private$tstransforms$isExportOfNamespace(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined) && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope === undefined || !(Node__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBlock$constant__from_ast())) && !((Node__from_ast.ModifierFlags(node) & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0);
    }
    static $go$private$tstransforms$isFirstDeclarationInScope(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (!(name === undefined) && IsIdentifier__from_ast(name)) {
            let text = Node__from_ast.Text(name);
            {
                const __gotots_results_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName.lookupOk(text);
                let firstDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_8[0];
                let found = __gotots_results_8[1];
                if (found) {
                    return tsonicTypeScriptRuntime.sameLocation(firstDeclaration, node);
                }
            }
        }
        return false;
    }
    static $go$private$tstransforms$popNode(tx: RuntimeSyntaxTransformer | undefined, grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = grandparentNode;
    }
    static $go$private$tstransforms$popScope(tx: RuntimeSyntaxTransformer | undefined, savedCurrentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, savedCurrentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): void {
        if (!tsonicTypeScriptRuntime.sameLocation((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope, savedCurrentScope)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope = savedCurrentScope;
    }
    static $go$private$tstransforms$pushNode(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        grandparentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = node;
        return grandparentNode;
    }
    static $go$private$tstransforms$pushScope(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>
    ] {
        let savedCurrentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let savedCurrentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = GoMap.nil();
        savedCurrentScope = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope;
        savedCurrentScopeFirstDeclarationsOfName = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName;
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope = node;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = node;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName = GoMap.nil();
                break;
            }
            case KindCaseBlock$constant__from_ast():
            case KindModuleBlock$constant__from_ast():
            case KindBlock$constant__from_ast(): {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope = node;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName = GoMap.nil();
                break;
            }
            case KindFunctionDeclaration$constant__from_ast():
            case KindClassDeclaration$constant__from_ast():
            case KindVariableStatement$constant__from_ast(): {
                RuntimeSyntaxTransformer.$go$private$tstransforms$recordDeclarationInScope(tx, node);
                break;
            }
        }
        return [savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName];
    }
    static $go$private$tstransforms$recordDeclarationInScope(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindVariableStatement$constant__from_ast(): {
                RuntimeSyntaxTransformer.$go$private$tstransforms$recordDeclarationInScope(tx, VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList);
                return;
                break;
            }
            case KindVariableDeclarationList$constant__from_ast(): {
                const __gotots_range_3 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                    const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                    RuntimeSyntaxTransformer.$go$private$tstransforms$recordDeclarationInScope(tx, decl);
                }
                return;
                break;
            }
            case KindArrayBindingPattern$constant__from_ast():
            case KindObjectBindingPattern$constant__from_ast(): {
                const __gotots_range_4 = Node__from_ast.Elements(node);
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                    const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                    let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                    RuntimeSyntaxTransformer.$go$private$tstransforms$recordDeclarationInScope(tx, element);
                }
                return;
                break;
            }
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (!(name === undefined)) {
            if (IsIdentifier__from_ast(name)) {
                if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName.isNil()) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName = GoMap.make(0, []);
                }
                let text = Node__from_ast.Text(name);
                {
                    const __gotots_results_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName.lookupOk(text);
                    let found = __gotots_results_3[1];
                    if (!found) {
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName.store(text, node);
                    }
                }
            }
            else if (IsBindingPattern__from_ast(name)) {
                RuntimeSyntaxTransformer.$go$private$tstransforms$recordDeclarationInScope(tx, name);
            }
        }
    }
    static $go$private$tstransforms$shouldEmitEnumDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: EnumDeclaration__from_ast;
    } | undefined): bool {
        const __gotots_store_193 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_168 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_193, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return !IsEnumConst__from_ast(__gotots_argument_168) || CompilerOptions__from_core.ShouldPreserveConstEnums((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
    }
    static $go$private$tstransforms$shouldEmitModuleDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ModuleDeclaration__from_ast;
    } | undefined): bool {
        const __gotots_store_219 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_70 = Transformer__from_transformers.EmitContext(__gotots_store_219.Transformer);
        const __gotots_store_220 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_175 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_220, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let pn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(__gotots_receiver_70, __gotots_argument_175);
        if (pn === undefined) {
            return true;
        }
        return IsInstantiatedModule__from_ast(pn, CompilerOptions__from_core.ShouldPreserveConstEnums((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions));
    }
    static $go$private$tstransforms$transformConstructorBodyWorker(tx: RuntimeSyntaxTransformer | undefined, statementsIn: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, superPath: RuntimeSlice<int>, initializerStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let statementsOut = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let superStatementIndex = superPath.get(0);
        let superStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = statementsIn.get(superStatementIndex);
        const __gotots_argument_223 = statementsOut;
        const __gotots_store_295 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_9 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_295.Transformer), statementsIn.slice(0, superStatementIndex, null));
        const __gotots_argument_224 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_9[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_9[1])]));
        statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_223, __gotots_argument_224, void 0);
        if (IsTryStatement__from_ast(superStatement)) {
            let tryStatement: {
                value: TryStatement__from_ast;
            } | undefined = Node__from_ast.AsTryStatement(superStatement);
            let tryBlock: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock);
            const __gotots_receiver_90 = tx;
            const __gotots_store_296 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_225 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_296, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let grandparentOfTryStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$pushNode(__gotots_receiver_90, __gotots_argument_225);
            const __gotots_receiver_91 = tx;
            const __gotots_store_297 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_226 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_297, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let grandparentOfTryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$pushNode(__gotots_receiver_91, __gotots_argument_226);
            const __gotots_receiver_92 = tx;
            const __gotots_store_298 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_227 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_298, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_results_10 = RuntimeSyntaxTransformer.$go$private$tstransforms$pushScope(__gotots_receiver_92, __gotots_argument_227);
            let savedCurrentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_10[0];
            let savedCurrentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_results_10[1];
            let tryBlockStatements = RuntimeSyntaxTransformer.$go$private$tstransforms$transformConstructorBodyWorker(tx, NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, superPath.slice(1, null, null), initializerStatements);
            RuntimeSyntaxTransformer.$go$private$tstransforms$popScope(tx, savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName);
            RuntimeSyntaxTransformer.$go$private$tstransforms$popNode(tx, grandparentOfTryBlock);
            const __gotots_store_299 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_300 = (Transformer__from_transformers.Factory(__gotots_store_299.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let tryBlockStatementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_300, "NodeFactory"), tryBlockStatements);
            NodeList__from_ast.$storageOf(((tryBlockStatementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            const __gotots_argument_232 = statementsOut;
            const __gotots_store_301 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_302 = (Transformer__from_transformers.Factory(__gotots_store_301.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_93 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_302, "NodeFactory");
            const __gotots_argument_228 = tryStatement;
            const __gotots_store_303 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_304 = (Transformer__from_transformers.Factory(__gotots_store_303.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_229 = NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_304, "NodeFactory"), tryBlock, tryBlockStatementList, Block__from_ast.$storageOf(((tryBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
            const __gotots_store_305 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_230 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_305.Transformer), (tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause);
            const __gotots_store_306 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_231 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_306.Transformer), (tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock);
            const __gotots_argument_233 = NodeFactory__from_ast.UpdateTryStatement(__gotots_receiver_93, __gotots_argument_228, __gotots_argument_229, __gotots_argument_230, __gotots_argument_231);
            statementsOut = __gotots_argument_232.append(void 0, [__gotots_argument_233]);
            RuntimeSyntaxTransformer.$go$private$tstransforms$popNode(tx, grandparentOfTryStatement);
        }
        else {
            const __gotots_argument_234 = statementsOut;
            const __gotots_store_307 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_11 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_307.Transformer), statementsIn.slice(superStatementIndex, superStatementIndex + 1, null));
            const __gotots_argument_235 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_11[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_11[1])]));
            statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_234, __gotots_argument_235, void 0);
            statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statementsOut, initializerStatements, void 0);
        }
        const __gotots_argument_236 = statementsOut;
        const __gotots_store_308 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_12 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_308.Transformer), statementsIn.slice(superStatementIndex + 1, null, null));
        const __gotots_argument_237 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_12[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_12[1])]));
        statementsOut = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_236, __gotots_argument_237, void 0);
        return statementsOut;
    }
    static $go$private$tstransforms$transformEnumBody(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: EnumDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedCurrentEnum: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentEnum;
        const __gotots_store_212 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentEnum = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_212, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_store_213 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_69 = Transformer__from_transformers.Visitor(__gotots_store_213.Transformer);
        const __gotots_store_214 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_174 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_214, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        node = Node__from_ast.AsEnumDeclaration(NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_69, __gotots_argument_174));
        let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
        const __gotots_range_5 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_index_5;
            let i = __gotots_range_value_5;
            statements = RuntimeSyntaxTransformer.$go$private$tstransforms$transformEnumMember(tx, statements, node, i);
        }
        const __gotots_store_215 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_216 = (Transformer__from_transformers.Factory(__gotots_store_215.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeFactory"), statements);
        NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentEnum = savedCurrentEnum;
        const __gotots_store_217 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_218 = (Transformer__from_transformers.Factory(__gotots_store_217.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_218, "NodeFactory"), statementList, true);
    }
    static $go$private$tstransforms$transformEnumMember(tx: RuntimeSyntaxTransformer | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, __go_enum: {
        value: EnumDeclaration__from_ast;
    } | undefined, index: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let memberNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf((((__go_enum ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(index);
        let member: {
            value: EnumMember__from_ast;
        } | undefined = Node__from_ast.AsEnumMember(memberNode);
        let savedParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = memberNode;
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
        let useExplicitReverseMapping = false;
        const __gotots_store_280 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_280.Transformer), memberNode);
        const __gotots_receiver_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
        const __gotots_argument_203 = parseNode;
        let result = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_84).GetEnumMemberValue(__gotots_argument_203);
        const __gotots_type_switch_0: GoInterface | undefined = Result__from_evaluator.$storageOf(result).Value;
        switch (true) {
            case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
                let value: Number__from_jsnum = __gotots_type_switch_0.$go$value;
                const __gotots_argument_204 = new $goInterfaceAdapter$Named_jsnum$Number(value);
                const __gotots_store_281 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_205 = Transformer__from_transformers.Factory(__gotots_store_281.Transformer);
                const __gotots_argument_206 = constantExpression(__gotots_argument_204, __gotots_argument_205);
                const __gotots_argument_207 = expression;
                expression = Coalesce$PointerTo_Named_ast$Node$Named_ast$Node(__gotots_argument_206, __gotots_argument_207);
                useExplicitReverseMapping = true;
                break;
            }
            case $goInterfaceAdapter$string.$is(__gotots_type_switch_0): {
                let value: gostring = __gotots_type_switch_0.$go$value;
                const __gotots_argument_208 = new $goInterfaceAdapter$string(value);
                const __gotots_store_282 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_209 = Transformer__from_transformers.Factory(__gotots_store_282.Transformer);
                const __gotots_argument_210 = constantExpression(__gotots_argument_208, __gotots_argument_209);
                const __gotots_argument_211 = expression;
                expression = Coalesce$PointerTo_Named_ast$Node$Named_ast$Node(__gotots_argument_210, __gotots_argument_211);
                break;
            }
            default: {
                let value: GoInterface | undefined = __gotots_type_switch_0;
                if (expression === undefined) {
                    const __gotots_store_283 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    expression = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_283.Transformer));
                }
                useExplicitReverseMapping = !Result__from_evaluator.$storageOf(result).IsSyntacticallyString;
                break;
            }
        }
        const __gotots_store_284 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_284.Transformer), RuntimeSyntaxTransformer.$go$private$tstransforms$getEnumQualifiedElement(tx, __go_enum, member), expression);
        if (useExplicitReverseMapping) {
            const __gotots_store_285 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_87 = Transformer__from_transformers.Factory(__gotots_store_285.Transformer);
            const __gotots_store_286 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_287 = (Transformer__from_transformers.Factory(__gotots_store_286.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_86 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_287, "NodeFactory");
            const __gotots_receiver_85 = tx;
            const __gotots_store_288 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((__go_enum ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_212 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_288, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_213 = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(__gotots_receiver_85, __gotots_argument_212);
            const __gotots_argument_214 = void 0;
            const __gotots_argument_215 = expression;
            const __gotots_argument_216 = NodeFlagsNone$constant__from_ast();
            const __gotots_argument_217 = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_86, __gotots_argument_213, __gotots_argument_214, __gotots_argument_215, __gotots_argument_216);
            const __gotots_argument_218 = RuntimeSyntaxTransformer.$go$private$tstransforms$getExpressionForPropertyName(tx, member);
            expression = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_87, __gotots_argument_217, __gotots_argument_218);
        }
        const __gotots_store_289 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_290 = (Transformer__from_transformers.Factory(__gotots_store_289.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let memberStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_290, "NodeFactory"), expression);
        const __gotots_store_291 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_88 = Transformer__from_transformers.EmitContext(__gotots_store_291.Transformer);
        const __gotots_argument_219 = expression;
        const __gotots_store_292 = NodeBase__from_ast.$storageOf((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_220 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_292, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_88, __gotots_argument_219, __gotots_argument_220);
        const __gotots_store_293 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_89 = Transformer__from_transformers.EmitContext(__gotots_store_293.Transformer);
        const __gotots_argument_221 = memberStatement;
        const __gotots_store_294 = NodeBase__from_ast.$storageOf((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_222 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_294, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_89, __gotots_argument_221, __gotots_argument_222);
        statements = statements.append(void 0, [memberStatement]);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = savedParent;
        return statements;
    }
    static $go$private$tstransforms$transformModuleBody(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ModuleDeclaration__from_ast;
    } | undefined, namespaceLocalName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedCurrentNamespace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace;
        let savedCurrentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope;
        let savedCurrentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName;
        const __gotots_store_222 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_222, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName = GoMap.nil();
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_store_223 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_223.Transformer));
        let statementsLocation = TextRange__from_core.$zero();
        let blockLocation = TextRange__from_core.$zero();
        if (!(BodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body === undefined)) {
            if (Node__from_ast.$storageOf(((BodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleBlock$constant__from_ast()) {
                const __gotots_store_224 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_71 = Transformer__from_transformers.Visitor(__gotots_store_224.Transformer);
                const __gotots_store_225 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_176 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_225, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                node = Node__from_ast.AsModuleDeclaration(NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_71, __gotots_argument_176));
                let body: {
                    value: ModuleBlock__from_ast;
                } | undefined = Node__from_ast.AsModuleBlock(BodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body);
                statements = NodeList__from_ast.$storageOf((((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                statementsLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc));
                blockLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                    (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                        (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            StatementBase__from_ast.$storageOf((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc));
            }
            else {
                const __gotots_store_226 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_4 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_226.Transformer), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([BodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body]));
                statements = __gotots_results_4[0];
                let moduleBlock: {
                    value: ModuleBlock__from_ast;
                } | undefined = Node__from_ast.AsModuleBlock(BodyBase__from_ast.$storageOf((getInnermostModuleDeclarationFromDottedModule(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body);
                statementsLocation = TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((moduleBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc).WithPos(-1);
            }
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace = savedCurrentNamespace;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope = savedCurrentScope;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
        const __gotots_store_227 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        statements = EmitContext__from_printer.EndAndMergeVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_227.Transformer), statements);
        const __gotots_store_228 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_229 = (Transformer__from_transformers.Factory(__gotots_store_228.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_229, "NodeFactory"), statements);
        NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(statementsLocation));
        const __gotots_store_230 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_231 = (Transformer__from_transformers.Factory(__gotots_store_230.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_231, "NodeFactory"), statementList, true);
        Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(blockLocation));
        if (BodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body === undefined || !(Node__from_ast.$storageOf(((BodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleBlock$constant__from_ast())) {
            const __gotots_store_232 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_232.Transformer), block, EFNoComments$constant__from_printer());
        }
        return block;
    }
    static $go$private$tstransforms$visit(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$pushNode(tx, node);
                    const __gotots_receiver_2 = tx;
                    const __gotots_argument_2 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        RuntimeSyntaxTransformer.$go$private$tstransforms$popNode(__gotots_receiver_2, __gotots_argument_2);
                    };
                    const __gotots_results_0 = RuntimeSyntaxTransformer.$go$private$tstransforms$pushScope(tx, node);
                    let savedCurrentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[0];
                    let savedCurrentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_results_0[1];
                    const __gotots_receiver_3 = tx;
                    const __gotots_argument_3 = savedCurrentScope;
                    const __gotots_argument_4 = savedCurrentScopeFirstDeclarationsOfName;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        RuntimeSyntaxTransformer.$go$private$tstransforms$popScope(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4);
                    };
                    if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsTypeScript$constant__from_ast()) >>> 0 === 0 && ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentEnum === undefined || (Node__from_ast.SubtreeFacts(node) & SubtreeContainsIdentifier$constant__from_ast()) >>> 0 === 0)) {
                        __gotots_return_0 = node;
                        break __gotots_return_block_0;
                    }
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindPublicKeyword$constant__from_ast():
                        case KindPrivateKeyword$constant__from_ast():
                        case KindProtectedKeyword$constant__from_ast():
                        case KindReadonlyKeyword$constant__from_ast():
                        case KindOverrideKeyword$constant__from_ast(): {
                            node = void 0;
                            break;
                        }
                        case KindEnumDeclaration$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitEnumDeclaration(tx, Node__from_ast.AsEnumDeclaration(node));
                            break;
                        }
                        case KindModuleDeclaration$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitModuleDeclaration(tx, Node__from_ast.AsModuleDeclaration(node));
                            break;
                        }
                        case KindClassDeclaration$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                            break;
                        }
                        case KindClassExpression$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitClassExpression(tx, Node__from_ast.AsClassExpression(node));
                            break;
                        }
                        case KindConstructor$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitConstructorDeclaration(tx, Node__from_ast.AsConstructorDeclaration(node));
                            break;
                        }
                        case KindFunctionDeclaration$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitFunctionDeclaration(tx, Node__from_ast.AsFunctionDeclaration(node));
                            break;
                        }
                        case KindVariableStatement$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitVariableStatement(tx, Node__from_ast.AsVariableStatement(node));
                            break;
                        }
                        case KindExportDeclaration$constant__from_ast():
                        case KindImportDeclaration$constant__from_ast():
                        case KindImportClause$constant__from_ast(): {
                            if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope === undefined) && !(Node__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBlock$constant__from_ast())) {
                                node = void 0;
                            }
                            else {
                                const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                node = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                            }
                            break;
                        }
                        case KindImportEqualsDeclaration$constant__from_ast(): {
                            if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope === undefined) && !(Node__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBlock$constant__from_ast()) && Node__from_ast.$storageOf((((Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast()) {
                                node = void 0;
                            }
                            else if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined) && !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope === undefined) && Node__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBlock$constant__from_ast() && !(Node__from_ast.$storageOf((((Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast())) {
                                node = void 0;
                            }
                            else {
                                node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitImportEqualsDeclaration(tx, Node__from_ast.AsImportEqualsDeclaration(node));
                            }
                            break;
                        }
                        case KindIdentifier$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitIdentifier(tx, node);
                            break;
                        }
                        case KindShorthandPropertyAssignment$constant__from_ast(): {
                            node = RuntimeSyntaxTransformer.$go$private$tstransforms$visitShorthandPropertyAssignment(tx, Node__from_ast.AsShorthandPropertyAssignment(node));
                            break;
                        }
                        default: {
                            const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            node = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_2.Transformer), node);
                            break;
                        }
                    }
                    __gotots_return_0 = node;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_0 = __gotots_caught_2;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
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
    static $go$private$tstransforms$visitClassDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_32 = tx;
        const __gotots_store_82 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_69 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_82, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let exported = RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(__gotots_receiver_32, __gotots_argument_69);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (exported) {
            const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_33 = Transformer__from_transformers.Visitor(__gotots_store_83.Transformer);
            const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_70 = Transformer__from_transformers.EmitContext(__gotots_store_84.Transformer);
            const __gotots_store_85: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
            const __gotots_argument_71 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "ModifiersBase"));
            const __gotots_argument_72 = 4294965215;
            const __gotots_argument_73 = ExtractModifiers__from_transformers(__gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
            modifiers = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_33, __gotots_argument_73);
        }
        else {
            const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_34 = Transformer__from_transformers.Visitor(__gotots_store_86.Transformer);
            const __gotots_store_87: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
            const __gotots_argument_74 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "ModifiersBase"));
            modifiers = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_34, __gotots_argument_74);
        }
        const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_88.Transformer), ClassDeclaration__from_ast.Name(node));
        let __gotots_logical_result_1 = name === undefined;
        if (__gotots_logical_result_1) {
            let __gotots_logical_result_0 = exported;
            if (!__gotots_logical_result_0) {
                const __gotots_argument_75 = Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators);
                const __gotots_store_89 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_76 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_89, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_77 = void 0;
                __gotots_logical_result_0 = ChildIsDecorated__from_ast(__gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
            }
            __gotots_logical_result_1 = (__gotots_logical_result_0);
        }
        if (__gotots_logical_result_1) {
            const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_35 = Transformer__from_transformers.Factory(__gotots_store_90.Transformer);
            const __gotots_store_91 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_78 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_91, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            name = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_35, __gotots_argument_78);
        }
        const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_92.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_93.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
        let parameterProperties = RuntimeSyntaxTransformer.$go$private$tstransforms$getParameterProperties(tx, Find$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsConstructorDeclaration__from_ast));
        if (parameterProperties.length > 0) {
            let newMembers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_0 = parameterProperties;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = __gotots_range_value_0;
                if (IsIdentifier__from_ast(ParameterDeclaration__from_ast.Name(parameter))) {
                    const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_95 = (Transformer__from_transformers.Factory(__gotots_store_94.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeFactory");
                    const __gotots_argument_80 = void 0;
                    const __gotots_receiver_36 = ParameterDeclaration__from_ast.Name(parameter);
                    const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_79 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(__gotots_store_96.Transformer));
                    const __gotots_argument_81 = Node__from_ast.Clone(__gotots_receiver_36, __gotots_argument_79);
                    const __gotots_argument_82 = void 0;
                    const __gotots_argument_83 = void 0;
                    const __gotots_argument_84 = void 0;
                    let parameterProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyDeclaration(__gotots_receiver_37, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82, __gotots_argument_83, __gotots_argument_84);
                    const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_38 = Transformer__from_transformers.EmitContext(__gotots_store_97.Transformer);
                    const __gotots_argument_85 = parameterProperty;
                    const __gotots_store_98 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
                    const __gotots_argument_86 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_98, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_38, __gotots_argument_85, __gotots_argument_86);
                    newMembers = newMembers.append(void 0, [parameterProperty]);
                }
            }
            if (newMembers.length > 0) {
                newMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newMembers, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_100 = (Transformer__from_transformers.Factory(__gotots_store_99.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                members = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory"), newMembers);
                NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            }
        }
        const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_102 = (Transformer__from_transformers.Factory(__gotots_store_101.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateClassDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "NodeFactory"), node, modifiers, name, void 0, heritageClauses, members);
        if (exported) {
            const __gotots_receiver_39 = tx;
            const __gotots_store_103 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_87 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_103, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let __go_export: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$createExportStatementForDeclaration(__gotots_receiver_39, __gotots_argument_87);
            if (!(__go_export === undefined)) {
                const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([updated, __go_export]));
            }
        }
        return updated;
    }
    static $go$private$tstransforms$visitClassExpression(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ClassExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_40 = Transformer__from_transformers.Visitor(__gotots_store_106.Transformer);
        const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_88 = Transformer__from_transformers.EmitContext(__gotots_store_107.Transformer);
        const __gotots_store_108: ClassExpression__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
        const __gotots_argument_89 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "ModifiersBase"));
        const __gotots_argument_90 = 4294965215;
        const __gotots_argument_91 = ExtractModifiers__from_transformers(__gotots_argument_88, __gotots_argument_89, __gotots_argument_90);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_40, __gotots_argument_91);
        const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_109.Transformer), ClassExpression__from_ast.Name(node));
        const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_110.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
        const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_111.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
        let parameterProperties = RuntimeSyntaxTransformer.$go$private$tstransforms$getParameterProperties(tx, Find$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, IsConstructorDeclaration__from_ast));
        if (parameterProperties.length > 0) {
            let newMembers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_1 = parameterProperties;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = __gotots_range_value_1;
                if (IsIdentifier__from_ast(ParameterDeclaration__from_ast.Name(parameter))) {
                    const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_113 = (Transformer__from_transformers.Factory(__gotots_store_112.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory");
                    const __gotots_argument_93 = void 0;
                    const __gotots_receiver_41 = ParameterDeclaration__from_ast.Name(parameter);
                    const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_92 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(__gotots_store_114.Transformer));
                    const __gotots_argument_94 = Node__from_ast.Clone(__gotots_receiver_41, __gotots_argument_92);
                    const __gotots_argument_95 = void 0;
                    const __gotots_argument_96 = void 0;
                    const __gotots_argument_97 = void 0;
                    let parameterProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyDeclaration(__gotots_receiver_42, __gotots_argument_93, __gotots_argument_94, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97);
                    const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_43 = Transformer__from_transformers.EmitContext(__gotots_store_115.Transformer);
                    const __gotots_argument_98 = parameterProperty;
                    const __gotots_store_116 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
                    const __gotots_argument_99 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_116, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_43, __gotots_argument_98, __gotots_argument_99);
                    newMembers = newMembers.append(void 0, [parameterProperty]);
                }
            }
            if (newMembers.length > 0) {
                newMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(newMembers, NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                const __gotots_store_117 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_118 = (Transformer__from_transformers.Factory(__gotots_store_117.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                members = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "NodeFactory"), newMembers);
                NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            }
        }
        const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_120 = (Transformer__from_transformers.Factory(__gotots_store_119.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "NodeFactory"), node, modifiers, name, void 0, heritageClauses, members);
    }
    static $go$private$tstransforms$visitConstructorBody(tx: RuntimeSyntaxTransformer | undefined, body: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined, __go_constructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let parameterProperties = RuntimeSyntaxTransformer.$go$private$tstransforms$getParameterProperties(tx, __go_constructor);
        if (parameterProperties.length === 0) {
            const __gotots_store_240 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_72 = Transformer__from_transformers.EmitContext(__gotots_store_240.Transformer);
            const __gotots_store_241 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_177 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_241, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_store_242 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_178 = Transformer__from_transformers.Visitor(__gotots_store_242.Transformer);
            return EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_72, __gotots_argument_177, __gotots_argument_178);
        }
        const __gotots_receiver_73 = tx;
        const __gotots_store_243 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_179 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_243, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let grandparentOfBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$pushNode(__gotots_receiver_73, __gotots_argument_179);
        const __gotots_receiver_74 = tx;
        const __gotots_store_244 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_180 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_244, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_results_5 = RuntimeSyntaxTransformer.$go$private$tstransforms$pushScope(__gotots_receiver_74, __gotots_argument_180);
        let savedCurrentScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_5[0];
        let savedCurrentScopeFirstDeclarationsOfName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_results_5[1];
        const __gotots_store_245 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_245.Transformer));
        const __gotots_store_246 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_6 = NodeFactory__from_printer.SplitStandardPrologue(Transformer__from_transformers.Factory(__gotots_store_246.Transformer), NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        let prologue = __gotots_results_6[0];
        let rest = __gotots_results_6[1];
        let statements = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(prologue);
        let parameterPropertyAssignments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_7 = parameterProperties;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = __gotots_range_value_7;
            if (IsIdentifier__from_ast(ParameterDeclaration__from_ast.Name(parameter))) {
                const __gotots_receiver_75 = ParameterDeclaration__from_ast.Name(parameter);
                const __gotots_store_247 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_181 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(__gotots_store_247.Transformer));
                let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_75, __gotots_argument_181);
                Node__from_ast.$storageOf(((propertyName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((ParameterDeclaration__from_ast.Name(parameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                const __gotots_store_248 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_248.Transformer), propertyName, 396);
                const __gotots_receiver_76 = ParameterDeclaration__from_ast.Name(parameter);
                const __gotots_store_249 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_182 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(__gotots_store_249.Transformer));
                let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_76, __gotots_argument_182);
                Node__from_ast.$storageOf(((localName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((ParameterDeclaration__from_ast.Name(parameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                const __gotots_store_250 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_250.Transformer), localName, EFNoComments$constant__from_printer());
                const __gotots_store_251 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_252 = (Transformer__from_transformers.Factory(__gotots_store_251.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_79 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_252, "NodeFactory");
                const __gotots_store_253 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_78 = Transformer__from_transformers.Factory(__gotots_store_253.Transformer);
                const __gotots_store_254 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_255 = (Transformer__from_transformers.Factory(__gotots_store_254.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_77 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_255, "NodeFactory");
                const __gotots_store_256 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_183 = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_256.Transformer));
                const __gotots_argument_184 = void 0;
                const __gotots_argument_185 = propertyName;
                const __gotots_argument_186 = NodeFlagsNone$constant__from_ast();
                const __gotots_argument_187 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_77, __gotots_argument_183, __gotots_argument_184, __gotots_argument_185, __gotots_argument_186);
                const __gotots_argument_188 = localName;
                const __gotots_argument_189 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_78, __gotots_argument_187, __gotots_argument_188);
                let parameterProperty: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_79, __gotots_argument_189);
                const __gotots_store_257 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_80 = Transformer__from_transformers.EmitContext(__gotots_store_257.Transformer);
                const __gotots_argument_190 = parameterProperty;
                const __gotots_store_258 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
                const __gotots_argument_191 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_258, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                EmitContext__from_printer.SetOriginal(__gotots_receiver_80, __gotots_argument_190, __gotots_argument_191);
                const __gotots_store_259 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_259.Transformer), parameterProperty, EFStartOnNewLine$constant__from_printer());
                parameterPropertyAssignments = parameterPropertyAssignments.append(void 0, [parameterProperty]);
            }
        }
        let superPath = FindSuperStatementIndexPath__from_transformers(rest, 0);
        if (superPath.length > 0) {
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, RuntimeSyntaxTransformer.$go$private$tstransforms$transformConstructorBodyWorker(tx, rest, superPath, parameterPropertyAssignments), void 0);
        }
        else {
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, parameterPropertyAssignments, void 0);
            const __gotots_argument_192 = statements;
            const __gotots_store_260 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_7 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_260.Transformer), rest);
            const __gotots_argument_193 = FirstResult$SliceOf_PointerTo_Named_ast$Node(__gotots_results_7[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_7[1])]));
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_192, __gotots_argument_193, void 0);
        }
        const __gotots_store_261 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        statements = EmitContext__from_printer.EndAndMergeVariableEnvironment(Transformer__from_transformers.EmitContext(__gotots_store_261.Transformer), statements);
        const __gotots_store_262 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_263 = (Transformer__from_transformers.Factory(__gotots_store_262.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_263, "NodeFactory"), statements);
        NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        RuntimeSyntaxTransformer.$go$private$tstransforms$popScope(tx, savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName);
        RuntimeSyntaxTransformer.$go$private$tstransforms$popNode(tx, grandparentOfBody);
        const __gotots_store_264 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_265 = (Transformer__from_transformers.Factory(__gotots_store_264.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_265, "NodeFactory"), statementList, true);
        const __gotots_store_266 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_81 = Transformer__from_transformers.EmitContext(__gotots_store_266.Transformer);
        const __gotots_argument_194 = updated;
        const __gotots_store_267 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_195 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_267, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_81, __gotots_argument_194, __gotots_argument_195);
        Node__from_ast.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                        Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).StatementBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        return updated;
    }
    static $go$private$tstransforms$visitConstructorDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ConstructorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_44 = Transformer__from_transformers.Visitor(__gotots_store_121.Transformer);
        const __gotots_store_122 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_100 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "ModifiersBase"));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_44, __gotots_argument_100);
        const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_45 = Transformer__from_transformers.EmitContext(__gotots_store_123.Transformer);
        const __gotots_store_124 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
        const __gotots_argument_101 = Node__from_ast.ParameterList(new $ProjectedPropertyLocation(__gotots_store_124, "Node", Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_102 = Transformer__from_transformers.Visitor(__gotots_store_125.Transformer);
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = EmitContext__from_printer.VisitParameters(__gotots_receiver_45, __gotots_argument_101, __gotots_argument_102);
        const __gotots_receiver_46 = tx;
        const __gotots_argument_103 = Node__from_ast.AsBlock((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
        const __gotots_store_126 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_104 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_126, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$visitConstructorBody(__gotots_receiver_46, __gotots_argument_103, __gotots_argument_104);
        const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_128 = (Transformer__from_transformers.Factory(__gotots_store_127.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateConstructorDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory"), node, modifiers, void 0, parameters, void 0, void 0, body);
    }
    static $go$private$tstransforms$visitEnumDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: EnumDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!RuntimeSyntaxTransformer.$go$private$tstransforms$shouldEmitEnumDeclaration(tx, node)) {
            const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_2 = Transformer__from_transformers.EmitContext(__gotots_store_3.Transformer);
            const __gotots_store_4 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_2 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_4, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return EmitContext__from_printer.NewNotEmittedStatement(__gotots_receiver_2, __gotots_argument_2);
        }
        let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
        const __gotots_receiver_3 = tx;
        const __gotots_argument_3 = statements;
        const __gotots_store_5 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_4 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_5, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_results_1 = RuntimeSyntaxTransformer.$go$private$tstransforms$addVarForDeclaration(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4);
        statements = __gotots_results_1[0];
        let varAdded = __gotots_results_1[1];
        let emitFlags = EFNone$constant__from_printer();
        if (varAdded && (!(CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) === ModuleKindSystem$constant__from_core()) || !tsonicTypeScriptRuntime.sameLocation((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile))) {
            emitFlags = (emitFlags | 128) >>> 0;
        }
        const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_8 = Transformer__from_transformers.Factory(__gotots_store_6.Transformer);
        const __gotots_receiver_4 = tx;
        const __gotots_store_7 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_5 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_7, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_11 = RuntimeSyntaxTransformer.$go$private$tstransforms$getExportQualifiedReferenceToDeclaration(__gotots_receiver_4, __gotots_argument_5);
        const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_7 = Transformer__from_transformers.Factory(__gotots_store_8.Transformer);
        const __gotots_receiver_5 = tx;
        const __gotots_store_9 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_6 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_9, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_9 = RuntimeSyntaxTransformer.$go$private$tstransforms$getExportQualifiedReferenceToDeclaration(__gotots_receiver_5, __gotots_argument_6);
        const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_11 = (Transformer__from_transformers.Factory(__gotots_store_10.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory");
        const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_7 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_8 = false;
        const __gotots_argument_10 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_6, __gotots_argument_7, __gotots_argument_8);
        const __gotots_argument_12 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_7, __gotots_argument_9, __gotots_argument_10);
        let enumArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewLogicalORExpression(__gotots_receiver_8, __gotots_argument_11, __gotots_argument_12);
        const __gotots_receiver_9 = tx;
        const __gotots_store_14 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_13 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_14, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(__gotots_receiver_9, __gotots_argument_13)) {
            const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_10 = Transformer__from_transformers.Factory(__gotots_store_15.Transformer);
            const __gotots_store_16 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_14 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_16, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_15 = new AssignedNameOptions__from_printer(false, true, false);
            let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalNameEx(__gotots_receiver_10, __gotots_argument_14, __gotots_argument_15);
            const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            enumArg = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_17.Transformer), localName, enumArg);
        }
        const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_11 = Transformer__from_transformers.Factory(__gotots_store_18.Transformer);
        const __gotots_store_19 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_16 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_19, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let enumParamName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_11, __gotots_argument_16);
        const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_20.Transformer), enumParamName, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((EnumDeclaration__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_22 = (Transformer__from_transformers.Factory(__gotots_store_21.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let enumParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), void 0, void 0, enumParamName, void 0, void 0, void 0);
        let enumBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$transformEnumBody(tx, node);
        const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_24 = (Transformer__from_transformers.Factory(__gotots_store_23.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory");
        const __gotots_argument_17 = void 0;
        const __gotots_argument_18 = void 0;
        const __gotots_argument_19 = void 0;
        const __gotots_argument_20 = void 0;
        const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_26 = (Transformer__from_transformers.Factory(__gotots_store_25.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_21 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([enumParam]));
        const __gotots_argument_22 = void 0;
        const __gotots_argument_23 = void 0;
        const __gotots_argument_24 = enumBody;
        let enumFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewFunctionExpression(__gotots_receiver_12, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
        const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_28 = (Transformer__from_transformers.Factory(__gotots_store_27.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory");
        const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_30 = (Transformer__from_transformers.Factory(__gotots_store_29.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_25 = NodeFactory__from_ast.NewParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory"), enumFunc);
        const __gotots_argument_26 = void 0;
        const __gotots_argument_27 = void 0;
        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_32 = (Transformer__from_transformers.Factory(__gotots_store_31.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_28 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([enumArg]));
        const __gotots_argument_29 = NodeFlagsNone$constant__from_ast();
        let enumCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_13, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
        const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_34 = (Transformer__from_transformers.Factory(__gotots_store_33.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let enumStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory"), enumCall);
        const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_14 = Transformer__from_transformers.EmitContext(__gotots_store_35.Transformer);
        const __gotots_argument_30 = enumStatement;
        const __gotots_store_36 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_31 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_36, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_14, __gotots_argument_30, __gotots_argument_31);
        const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_15 = Transformer__from_transformers.EmitContext(__gotots_store_37.Transformer);
        const __gotots_argument_32 = enumStatement;
        const __gotots_store_38 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_33 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_38, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_15, __gotots_argument_32, __gotots_argument_33);
        const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_39.Transformer), enumStatement, emitFlags);
        const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_41 = (Transformer__from_transformers.Factory(__gotots_store_40.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory"), statements.append(void 0, [enumStatement]));
    }
    static $go$private$tstransforms$visitExpressionIdentifier(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_2 = (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentEnum === undefined) || !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNamespace === undefined));
        if (__gotots_logical_result_2) {
            const __gotots_store_273 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_196 = Transformer__from_transformers.EmitContext(__gotots_store_273.Transformer);
            const __gotots_argument_197 = node;
            __gotots_logical_result_2 = !IsGeneratedIdentifier__from_transformers(__gotots_argument_196, __gotots_argument_197);
        }
        let __gotots_logical_result_3 = __gotots_logical_result_2;
        if (__gotots_logical_result_3) {
            const __gotots_store_274 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_198 = Transformer__from_transformers.EmitContext(__gotots_store_274.Transformer);
            const __gotots_argument_199 = node;
            __gotots_logical_result_3 = !IsLocalName__from_transformers(__gotots_argument_198, __gotots_argument_199);
        }
        if (__gotots_logical_result_3) {
            const __gotots_store_275 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_275.Transformer), (void Node__from_ast.AsNode,
                node));
            const __gotots_receiver_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_200 = location;
            const __gotots_argument_201 = false;
            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<ReferenceResolver__from_binder>(__gotots_receiver_82).GetReferencedExportContainer(__gotots_argument_200, __gotots_argument_201);
            if (!(container === undefined) && (IsEnumDeclaration__from_ast(container) || IsModuleDeclaration__from_ast(container))) {
                let containerName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(tx, container);
                const __gotots_receiver_83 = node;
                const __gotots_store_276 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_202 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(__gotots_store_276.Transformer));
                let memberName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_83, __gotots_argument_202);
                const __gotots_store_277 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_277.Transformer), memberName, 396);
                const __gotots_store_278 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetNamespaceMemberName(Transformer__from_transformers.Factory(__gotots_store_278.Transformer), containerName, memberName, new NameOptions__from_printer(false, true));
                const __gotots_store_279 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AssignCommentAndSourceMapRanges(Transformer__from_transformers.EmitContext(__gotots_store_279.Transformer), expression, (void Node__from_ast.AsNode,
                    node));
                return expression;
            }
        }
        return node;
    }
    static $go$private$tstransforms$visitFunctionDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_47 = tx;
        const __gotots_store_129 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_105 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_129, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(__gotots_receiver_47, __gotots_argument_105)) {
            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_131 = (Transformer__from_transformers.Factory(__gotots_store_130.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeFactory");
            const __gotots_argument_110 = node;
            const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_48 = Transformer__from_transformers.Visitor(__gotots_store_132.Transformer);
            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_106 = Transformer__from_transformers.EmitContext(__gotots_store_133.Transformer);
            const __gotots_store_134 = FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
            const __gotots_argument_107 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_134, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_108 = 4294967263;
            const __gotots_argument_109 = ExtractModifiers__from_transformers(__gotots_argument_106, __gotots_argument_107, __gotots_argument_108);
            const __gotots_argument_111 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_48, __gotots_argument_109);
            const __gotots_argument_112 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken;
            const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_113 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_135.Transformer), FunctionDeclaration__from_ast.Name(node));
            const __gotots_argument_114 = void 0;
            const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_115 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_136.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters);
            const __gotots_argument_116 = void 0;
            const __gotots_argument_117 = void 0;
            const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_118 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_137.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body);
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateFunctionDeclaration(__gotots_receiver_49, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116, __gotots_argument_117, __gotots_argument_118);
            const __gotots_receiver_50 = tx;
            const __gotots_store_138 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_119 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_138, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let __go_export: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$createExportStatementForDeclaration(__gotots_receiver_50, __gotots_argument_119);
            if (!(__go_export === undefined)) {
                const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_140 = (Transformer__from_transformers.Factory(__gotots_store_139.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([updated, __go_export]));
            }
            return updated;
        }
        const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_51 = Transformer__from_transformers.Visitor(__gotots_store_141.Transformer);
        const __gotots_store_142 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_120 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_142, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_51, __gotots_argument_120);
    }
    static $go$private$tstransforms$visitIdentifier(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsIdentifierReference__from_transformers(node, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode)) {
            return RuntimeSyntaxTransformer.$go$private$tstransforms$visitExpressionIdentifier(tx, node);
        }
        return node;
    }
    static $go$private$tstransforms$visitImportEqualsDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ImportEqualsDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast()) {
            const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_57 = Transformer__from_transformers.Visitor(__gotots_store_157.Transformer);
            const __gotots_store_158 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_134 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_158, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_57, __gotots_argument_134);
        }
        const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let moduleReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.CreateExpressionFromEntityName(Transformer__from_transformers.Factory(__gotots_store_159.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
        const __gotots_store_160 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_160.Transformer), moduleReference, 896);
        const __gotots_receiver_58 = tx;
        const __gotots_store_161 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_135 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_161, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(__gotots_receiver_58, __gotots_argument_135)) {
            const __gotots_store_162 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_163 = (Transformer__from_transformers.Factory(__gotots_store_162.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "NodeFactory"), ImportEqualsDeclaration__from_ast.Name(node), void 0, void 0, moduleReference);
            const __gotots_store_164 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_59 = Transformer__from_transformers.EmitContext(__gotots_store_164.Transformer);
            const __gotots_argument_136 = varDecl;
            const __gotots_store_165 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_137 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_165, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_59, __gotots_argument_136, __gotots_argument_137);
            const __gotots_store_166 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_167 = (Transformer__from_transformers.Factory(__gotots_store_166.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_60 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "NodeFactory");
            const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_169 = (Transformer__from_transformers.Factory(__gotots_store_168.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_138 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
            const __gotots_argument_139 = NodeFlagsNone$constant__from_ast();
            let varList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_60, __gotots_argument_138, __gotots_argument_139);
            const __gotots_store_170 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_140 = Transformer__from_transformers.EmitContext(__gotots_store_170.Transformer);
            const __gotots_store_171 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_141 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "ModifiersBase"));
            const __gotots_argument_142 = ModifierFlagsExport$constant__from_ast();
            let varModifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = ExtractModifiers__from_transformers(__gotots_argument_140, __gotots_argument_141, __gotots_argument_142);
            const __gotots_store_172 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_173 = (Transformer__from_transformers.Factory(__gotots_store_172.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "NodeFactory"), varModifiers, varList);
            const __gotots_store_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_61 = Transformer__from_transformers.EmitContext(__gotots_store_174.Transformer);
            const __gotots_argument_143 = varStatement;
            const __gotots_store_175 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_144 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_175, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_61, __gotots_argument_143, __gotots_argument_144);
            const __gotots_store_176 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_62 = Transformer__from_transformers.EmitContext(__gotots_store_176.Transformer);
            const __gotots_argument_145 = varStatement;
            const __gotots_store_177 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_146 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_177, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_62, __gotots_argument_145, __gotots_argument_146);
            return varStatement;
        }
        else {
            const __gotots_receiver_63 = tx;
            const __gotots_argument_147 = ImportEqualsDeclaration__from_ast.Name(node);
            const __gotots_argument_148 = moduleReference;
            const __gotots_argument_149 = TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc));
            const __gotots_argument_150 = TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc));
            const __gotots_store_178 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_151 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_178, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$createExportStatement(__gotots_receiver_63, __gotots_argument_147, __gotots_argument_148, __gotots_argument_149, __gotots_argument_150, __gotots_argument_151);
            Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc)));
            return statement;
        }
    }
    static $go$private$tstransforms$visitModuleDeclaration(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ModuleDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!RuntimeSyntaxTransformer.$go$private$tstransforms$shouldEmitModuleDeclaration(tx, node)) {
            const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_16 = Transformer__from_transformers.EmitContext(__gotots_store_42.Transformer);
            const __gotots_store_43 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_34 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_43, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return EmitContext__from_printer.NewNotEmittedStatement(__gotots_receiver_16, __gotots_argument_34);
        }
        let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
        const __gotots_receiver_17 = tx;
        const __gotots_argument_35 = statements;
        const __gotots_store_44 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_36 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_44, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_results_2 = RuntimeSyntaxTransformer.$go$private$tstransforms$addVarForDeclaration(__gotots_receiver_17, __gotots_argument_35, __gotots_argument_36);
        statements = __gotots_results_2[0];
        let varAdded = __gotots_results_2[1];
        let emitFlags = EFNone$constant__from_printer();
        if (varAdded && (!(CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions) === ModuleKindSystem$constant__from_core()) || !tsonicTypeScriptRuntime.sameLocation((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentScope, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile))) {
            emitFlags = (emitFlags | 128) >>> 0;
        }
        const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_22 = Transformer__from_transformers.Factory(__gotots_store_45.Transformer);
        const __gotots_receiver_18 = tx;
        const __gotots_store_46 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_37 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_46, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_43 = RuntimeSyntaxTransformer.$go$private$tstransforms$getExportQualifiedReferenceToDeclaration(__gotots_receiver_18, __gotots_argument_37);
        const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_21 = Transformer__from_transformers.Factory(__gotots_store_47.Transformer);
        const __gotots_receiver_19 = tx;
        const __gotots_store_48 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_38 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_48, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_41 = RuntimeSyntaxTransformer.$go$private$tstransforms$getExportQualifiedReferenceToDeclaration(__gotots_receiver_19, __gotots_argument_38);
        const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_50 = (Transformer__from_transformers.Factory(__gotots_store_49.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory");
        const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_52 = (Transformer__from_transformers.Factory(__gotots_store_51.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_39 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_40 = false;
        const __gotots_argument_42 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_20, __gotots_argument_39, __gotots_argument_40);
        const __gotots_argument_44 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_21, __gotots_argument_41, __gotots_argument_42);
        let moduleArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewLogicalORExpression(__gotots_receiver_22, __gotots_argument_43, __gotots_argument_44);
        const __gotots_receiver_23 = tx;
        const __gotots_store_53 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_45 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_53, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(__gotots_receiver_23, __gotots_argument_45)) {
            const __gotots_store_54 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_24 = Transformer__from_transformers.Factory(__gotots_store_54.Transformer);
            const __gotots_store_55 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_46 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_55, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_47 = new AssignedNameOptions__from_printer(false, true, false);
            let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.GetLocalNameEx(__gotots_receiver_24, __gotots_argument_46, __gotots_argument_47);
            const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            moduleArg = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_56.Transformer), localName, moduleArg);
        }
        const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_25 = Transformer__from_transformers.Factory(__gotots_store_57.Transformer);
        const __gotots_store_58 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_48 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_58, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let moduleParamName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(__gotots_receiver_25, __gotots_argument_48);
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(__gotots_store_59.Transformer), moduleParamName, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((ModuleDeclaration__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_60 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_61 = (Transformer__from_transformers.Factory(__gotots_store_60.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let moduleParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeFactory"), void 0, void 0, moduleParamName, void 0, void 0, void 0);
        const __gotots_receiver_27 = tx;
        const __gotots_argument_50 = node;
        const __gotots_receiver_26 = tx;
        const __gotots_store_62 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_49 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_62, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_51 = RuntimeSyntaxTransformer.$go$private$tstransforms$getNamespaceContainerName(__gotots_receiver_26, __gotots_argument_49);
        let moduleBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$transformModuleBody(__gotots_receiver_27, __gotots_argument_50, __gotots_argument_51);
        const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_64 = (Transformer__from_transformers.Factory(__gotots_store_63.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "NodeFactory");
        const __gotots_argument_52 = void 0;
        const __gotots_argument_53 = void 0;
        const __gotots_argument_54 = void 0;
        const __gotots_argument_55 = void 0;
        const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_66 = (Transformer__from_transformers.Factory(__gotots_store_65.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_56 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([moduleParam]));
        const __gotots_argument_57 = void 0;
        const __gotots_argument_58 = void 0;
        const __gotots_argument_59 = moduleBody;
        let moduleFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewFunctionExpression(__gotots_receiver_28, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59);
        const __gotots_store_67 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_68 = (Transformer__from_transformers.Factory(__gotots_store_67.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "NodeFactory");
        const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_70 = (Transformer__from_transformers.Factory(__gotots_store_69.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_60 = NodeFactory__from_ast.NewParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "NodeFactory"), moduleFunc);
        const __gotots_argument_61 = void 0;
        const __gotots_argument_62 = void 0;
        const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_72 = (Transformer__from_transformers.Factory(__gotots_store_71.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_63 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([moduleArg]));
        const __gotots_argument_64 = NodeFlagsNone$constant__from_ast();
        let moduleCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_29, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63, __gotots_argument_64);
        const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_74 = (Transformer__from_transformers.Factory(__gotots_store_73.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let moduleStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeFactory"), moduleCall);
        const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_30 = Transformer__from_transformers.EmitContext(__gotots_store_75.Transformer);
        const __gotots_argument_65 = moduleStatement;
        const __gotots_store_76 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_66 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_76, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_30, __gotots_argument_65, __gotots_argument_66);
        const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_31 = Transformer__from_transformers.EmitContext(__gotots_store_77.Transformer);
        const __gotots_argument_67 = moduleStatement;
        const __gotots_store_78 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_68 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_78, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_31, __gotots_argument_67, __gotots_argument_68);
        const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_79.Transformer), moduleStatement, emitFlags);
        const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_81 = (Transformer__from_transformers.Factory(__gotots_store_80.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory"), statements.append(void 0, [moduleStatement]));
    }
    static $go$private$tstransforms$visitShorthandPropertyAssignment(tx: RuntimeSyntaxTransformer | undefined, node: {
        value: ShorthandPropertyAssignment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ShorthandPropertyAssignment__from_ast.Name(node);
        let exportedOrImportedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = RuntimeSyntaxTransformer.$go$private$tstransforms$visitExpressionIdentifier(tx, name);
        if (!tsonicTypeScriptRuntime.sameLocation(exportedOrImportedName, name)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = exportedOrImportedName;
            if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer === undefined)) {
                let equalsToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken;
                if (equalsToken === undefined) {
                    const __gotots_store_179 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_180 = (Transformer__from_transformers.Factory(__gotots_store_179.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    equalsToken = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "NodeFactory"), KindEqualsToken$constant__from_ast());
                }
                const __gotots_store_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_182 = (Transformer__from_transformers.Factory(__gotots_store_181.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_64 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "NodeFactory");
                const __gotots_argument_152 = void 0;
                const __gotots_argument_153 = expression;
                const __gotots_argument_154 = void 0;
                const __gotots_argument_155 = equalsToken;
                const __gotots_store_183 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_156 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_183.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
                expression = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_64, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154, __gotots_argument_155, __gotots_argument_156);
            }
            const __gotots_store_184 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_185 = (Transformer__from_transformers.Factory(__gotots_store_184.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeFactory"), void 0, ShorthandPropertyAssignment__from_ast.Name(node), void 0, void 0, expression);
            Node__from_ast.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Loc)));
            const __gotots_store_186 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_65 = Transformer__from_transformers.EmitContext(__gotots_store_186.Transformer);
            const __gotots_argument_157 = updated;
            const __gotots_store_187 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_158 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_187, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_65, __gotots_argument_157, __gotots_argument_158);
            const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_66 = Transformer__from_transformers.EmitContext(__gotots_store_188.Transformer);
            const __gotots_argument_159 = updated;
            const __gotots_store_189 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_160 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_189, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_66, __gotots_argument_159, __gotots_argument_160);
            return updated;
        }
        const __gotots_store_190 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_191 = (Transformer__from_transformers.Factory(__gotots_store_190.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_67 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "NodeFactory");
        const __gotots_argument_161 = node;
        const __gotots_argument_162 = void 0;
        const __gotots_argument_163 = exportedOrImportedName;
        const __gotots_argument_164 = void 0;
        const __gotots_argument_165 = void 0;
        const __gotots_argument_166: ShorthandPropertyAssignment__from_ast["EqualsToken"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken;
        const __gotots_store_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_167 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_192.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
        return NodeFactory__from_ast.UpdateShorthandPropertyAssignment(__gotots_receiver_67, __gotots_argument_161, __gotots_argument_162, __gotots_argument_163, __gotots_argument_164, __gotots_argument_165, __gotots_argument_166, __gotots_argument_167);
    }
    static $go$private$tstransforms$visitVariableStatement(tx: RuntimeSyntaxTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_52 = tx;
        const __gotots_store_143 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_121 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_143, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (RuntimeSyntaxTransformer.$go$private$tstransforms$isExportOfNamespace(__gotots_receiver_52, __gotots_argument_121)) {
            let expressions = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
            const __gotots_range_2 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                let v: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined = Node__from_ast.AsVariableDeclaration(declaration);
                if (VariableDeclaration__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined) {
                    continue;
                }
                if (IsBindingPattern__from_ast(VariableDeclaration__from_ast.Name(v))) {
                    const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_122 = __gotots_store_144.Transformer;
                    const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_123 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_145.Transformer), declaration);
                    const __gotots_argument_124 = false;
                    const __gotots_argument_125 = FlattenLevelAll$constant__from_transformers();
                    const __gotots_receiver_53 = tx;
                    const __gotots_argument_126 = new CreateAssignmentCallback__from_transformers(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                        return RuntimeSyntaxTransformer.$go$private$tstransforms$createNamespaceExportExpression(__gotots_receiver_53, $argument0, $argument1, $argument2);
                    });
                    let expression__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FlattenDestructuringAssignment__from_transformers(__gotots_argument_122, __gotots_argument_123, __gotots_argument_124, __gotots_argument_125, __gotots_argument_126);
                    if (!(expression__shadow_1 === undefined)) {
                        expressions = expressions.append(void 0, [expression__shadow_1]);
                    }
                }
                else {
                    const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_127 = Transformer__from_transformers.EmitContext(__gotots_store_146.Transformer);
                    const __gotots_argument_128 = v;
                    let expression__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ConvertVariableDeclarationToAssignmentExpression__from_transformers(__gotots_argument_127, __gotots_argument_128);
                    if (!(expression__shadow_1 === undefined)) {
                        expressions = expressions.append(void 0, [expression__shadow_1]);
                    }
                }
            }
            if (expressions.length === 0) {
                return void 0;
            }
            const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(__gotots_store_147.Transformer), expressions);
            const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_149 = (Transformer__from_transformers.Factory(__gotots_store_148.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "NodeFactory"), expression);
            const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_54 = Transformer__from_transformers.EmitContext(__gotots_store_150.Transformer);
            const __gotots_argument_129 = statement;
            const __gotots_store_151 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_130 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_151, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_54, __gotots_argument_129, __gotots_argument_130);
            const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_55 = Transformer__from_transformers.EmitContext(__gotots_store_152.Transformer);
            const __gotots_argument_131 = statement;
            const __gotots_store_153 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_132 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_153, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_55, __gotots_argument_131, __gotots_argument_132);
            let savedCurrent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = statement;
            const __gotots_store_154 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            statement = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_154.Transformer), statement);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = savedCurrent;
            return statement;
        }
        const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_56 = Transformer__from_transformers.Visitor(__gotots_store_155.Transformer);
        const __gotots_store_156 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_133 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_156, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_56, __gotots_argument_133);
    }
}
export function NewRuntimeSyntaxTransformer(opt: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let tx: RuntimeSyntaxTransformer | undefined = new RuntimeSyntaxTransformer(Transformer__from_transformers.$zero(), compilerOptions, void 0, void 0, void 0, void 0, GoMap.nil(), void 0, void 0, (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Resolver, (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitResolver);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return RuntimeSyntaxTransformer.$go$private$tstransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = emitContext;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export function getInnermostModuleDeclarationFromDottedModule(moduleDeclaration: {
    value: ModuleDeclaration__from_ast;
} | undefined): {
    value: ModuleDeclaration__from_ast;
} | undefined {
    for (; !(BodyBase__from_ast.$storageOf((moduleDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body === undefined) && Node__from_ast.$storageOf(((BodyBase__from_ast.$storageOf((moduleDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast();) {
        moduleDeclaration = Node__from_ast.AsModuleDeclaration(BodyBase__from_ast.$storageOf((moduleDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body);
    }
    return moduleDeclaration;
}
