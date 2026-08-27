import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, AwaitExpression as AwaitExpression__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ForInOrOfStatement as ForInOrOfStatement__from_ast, FunctionFlags as FunctionFlags__from_ast, LabeledStatement as LabeledStatement__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast, YieldExpression as YieldExpression__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Block as Block__from_ast, BodyBase as BodyBase__from_ast, ExpressionBase as ExpressionBase__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, FunctionFlagsAsync$constant as FunctionFlagsAsync$constant__from_ast, FunctionFlagsGenerator$constant as FunctionFlagsGenerator$constant__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, GetFunctionFlags as GetFunctionFlags__from_ast, IsBlock as IsBlock__from_ast, IsIdentifier as IsIdentifier__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindAsyncKeyword$constant as KindAsyncKeyword$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ReturnStatement as ReturnStatement__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsForAwaitOrAsyncGenerator$constant as SubtreeContainsForAwaitOrAsyncGenerator$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedSet as OrderedSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__printer, AutoGenerateOptions as AutoGenerateOptions__from_printer, EFNoTokenTrailingSourceMaps$constant as EFNoTokenTrailingSourceMaps$constant__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsReservedInNestedScopes$int as GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { OrderedSet$Size$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Size.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { isSimpleParameterList } from "./async.js";
import { superAccessState } from "./utilities.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class forAwaitHierarchyFacts {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function forAwaitHierarchyFactsHasLexicalThis$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(1);
}
export function forAwaitHierarchyFactsIterationContainer$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(2);
}
export const forAwaitHierarchyFactsAncestorFactsMask$int: int = 3;
export function forAwaitHierarchyFactsSourceFileExcludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(2);
}
export function forAwaitHierarchyFactsStrictModeSourceFileIncludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(0);
}
export function forAwaitHierarchyFactsClassOrFunctionIncludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(1);
}
export function forAwaitHierarchyFactsClassOrFunctionExcludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(2);
}
export function forAwaitHierarchyFactsArrowFunctionIncludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(0);
}
export function forAwaitHierarchyFactsArrowFunctionExcludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(2);
}
export function forAwaitHierarchyFactsIterationStatementIncludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(2);
}
export function forAwaitHierarchyFactsIterationStatementExcludes$constant(): forAwaitHierarchyFacts {
    return new forAwaitHierarchyFacts(0);
}
export class forawaitTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public superAccessState: superAccessState, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public enclosingFunctionFlags: FunctionFlags__from_ast, public forAwaitHierarchyFacts: forAwaitHierarchyFacts, public exportedVariableStatement: bool, public fallbackNodeVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public noAsyncModifierVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$affectsSubtree(tx: forawaitTransformer | undefined, excludeFacts: forAwaitHierarchyFacts, includeFacts: forAwaitHierarchyFacts): bool {
        return !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts.$value === (new forAwaitHierarchyFacts(((void forAwaitHierarchyFacts,
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts.$value & ~excludeFacts.$value) as int)
            | includeFacts.$value)).$value);
    }
    static $go$private$estransforms$convertForOfStatementHead(tx: forawaitTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined, boundValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nonUserCode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_202 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "Transformer"));
        let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
        const __gotots_store_203 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "Transformer")), value);
        let iteratorValueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(f, value, boundValue);
        const __gotots_store_204 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let iteratorValueStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_204, "NodeFactory"), iteratorValueExpression);
        const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_205, "Transformer")), iteratorValueStatement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_receiver_81 = f;
        const __gotots_argument_213 = nonUserCode;
        const __gotots_store_206 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_214 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "NodeFactory"), KindFalseKeyword$constant__from_ast());
        let exitNonUserCodeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_81, __gotots_argument_213, __gotots_argument_214);
        const __gotots_store_207 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let exitNonUserCodeStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_207, "NodeFactory"), exitNonUserCodeExpression);
        const __gotots_store_208 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "Transformer")), exitNonUserCodeStatement, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([iteratorValueStatement, exitNonUserCodeStatement]);
        const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let binding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.CreateForOfBindingStatement(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_209, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer, value);
        const __gotots_argument_215 = statements;
        const __gotots_store_210 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_216 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "Transformer")), binding);
        statements = __gotots_argument_215.append(void 0, [__gotots_argument_216]);
        let bodyLocation = TextRange__from_core.$zero();
        let statementsLocation = TextRange__from_core.$zero();
        const __gotots_store_211 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEmbeddedStatement(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
        if (IsBlock__from_ast(statement)) {
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, Node__from_ast.Statements(statement), void 0);
            bodyLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
            statementsLocation = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList(statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc));
        }
        else {
            statements = statements.append(void 0, [statement]);
        }
        const __gotots_store_212 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let stmtList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_212, "NodeFactory"), statements);
        NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(statementsLocation));
        const __gotots_store_213 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_213, "NodeFactory"), stmtList, true);
        Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(bodyLocation));
        return block;
    }
    static $go$private$estransforms$createDownlevelAwait(tx: forawaitTransformer | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_109 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_41 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory");
            const __gotots_argument_102 = void 0;
            const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_103 = NodeFactory__from_printer.NewAwaitHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "Transformer")), expression);
            return NodeFactory__from_ast.NewYieldExpression(__gotots_receiver_41, __gotots_argument_102, __gotots_argument_103);
        }
        const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_112 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewAwaitExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "NodeFactory"), expression);
    }
    static $go$private$estransforms$doWithHierarchyFacts(tx: forawaitTransformer | undefined, cb: (($0: forawaitTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, excludeFacts: forAwaitHierarchyFacts, includeFacts: forAwaitHierarchyFacts): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (forawaitTransformer.$go$private$estransforms$affectsSubtree(tx, excludeFacts, includeFacts)) {
            let ancestorFacts = forawaitTransformer.$go$private$estransforms$enterSubtree(tx, excludeFacts, includeFacts);
            const __gotots_callee_0 = cb;
            const __gotots_argument_23 = tx;
            const __gotots_argument_24 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23, __gotots_argument_24);
            forawaitTransformer.$go$private$estransforms$exitSubtree(tx, ancestorFacts);
            return result;
        }
        const __gotots_callee_1 = cb;
        const __gotots_argument_25 = tx;
        const __gotots_argument_26 = node;
        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26);
    }
    static $go$private$estransforms$enterSubtree(tx: forawaitTransformer | undefined, excludeFacts: forAwaitHierarchyFacts, includeFacts: forAwaitHierarchyFacts): forAwaitHierarchyFacts {
        let ancestorFacts = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts = new forAwaitHierarchyFacts((new forAwaitHierarchyFacts(((void forAwaitHierarchyFacts,
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts.$value & ~excludeFacts.$value) as int)
            | includeFacts.$value)).$value &
            ((void forAwaitHierarchyFacts,
                forAwaitHierarchyFactsAncestorFactsMask$int) as int));
        return ancestorFacts;
    }
    static $go$private$estransforms$exitSubtree(tx: forawaitTransformer | undefined, ancestorFacts: forAwaitHierarchyFacts): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts = ancestorFacts;
    }
    static $go$private$estransforms$fallbackVisitor(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties === undefined) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindFunctionExpression$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindConstructor$constant__from_ast(): {
                return node;
                break;
            }
        }
        const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        superAccessState.$go$private$estransforms$trackSuperAccess(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "superAccessState"), node);
        return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fallbackNodeVisitor, node);
    }
    static $go$private$estransforms$transformAsyncGeneratorFunctionBody(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "Transformer"));
        let innerParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (!isSimpleParameterList(Node__from_ast.Parameters(node))) {
            const __gotots_store_183 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_74 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "Transformer"));
            const __gotots_argument_192 = Node__from_ast.ParameterList(node);
            const __gotots_store_184 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_193 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "Transformer"));
            innerParameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_74, __gotots_argument_192, __gotots_argument_193);
        }
        let savedCapturedSuperProperties: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties;
        let savedHasSuperElementAccess = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess;
        let savedHasSuperPropertyAssignment = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment;
        let savedSuperBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding;
        let savedSuperIndexBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding;
        const __gotots_struct_0 = OrderedSet__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return GoMap.nil();
        });
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties =
            tsonicTypeScriptRuntime.location<OrderedSet__from_collections<gostring>>(__gotots_struct_0);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess = false;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment = false;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding = NodeFactory__from_printer.NewUniqueNameEx(f, "_super", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding = NodeFactory__from_printer.NewUniqueNameEx(f, "_superIndex", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
        const __gotots_store_185 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_75 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeFactory");
        const __gotots_argument_194 = Node__from_ast.AsBlock(Node__from_ast.Body(node));
        const __gotots_store_186 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_195 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "Transformer")), Node__from_ast.StatementList(Node__from_ast.Body(node)));
        const __gotots_argument_196 = Block__from_ast.$storageOf(((Node__from_ast.AsBlock(Node__from_ast.Body(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
        let asyncBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateBlock(__gotots_receiver_75, __gotots_argument_194, __gotots_argument_195, __gotots_argument_196);
        const __gotots_store_187 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_76 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "NodeFactory");
        const __gotots_argument_197 = Node__from_ast.AsBlock(asyncBody);
        const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_198 = EmitContext__from_printer.EndAndMergeVariableEnvironmentList(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_188, "Transformer")), Node__from_ast.StatementList(asyncBody));
        const __gotots_argument_199 = Block__from_ast.$storageOf(((Node__from_ast.AsBlock(asyncBody) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
        asyncBody = NodeFactory__from_ast.UpdateBlock(__gotots_receiver_76, __gotots_argument_197, __gotots_argument_198, __gotots_argument_199);
        let emitSuperHelpers = OrderedSet$Size$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties) > 0 || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess;
        if (emitSuperHelpers) {
            const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            asyncBody = superAccessState.$go$private$estransforms$substituteSuperAccessesInBody(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "superAccessState"), asyncBody);
        }
        let innerParams: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (!(innerParameters === undefined)) {
            innerParams = innerParameters;
        }
        else {
            const __gotots_store_190 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            innerParams = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(Node__from_ast.Name(node) === undefined)) {
            name = NodeFactory__from_printer.NewGeneratedNameForNode(f, Node__from_ast.Name(node));
        }
        const __gotots_store_191 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_77 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "NodeFactory");
        const __gotots_argument_200 = void 0;
        const __gotots_store_192 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_201 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_192, "NodeFactory"), KindAsteriskToken$constant__from_ast());
        const __gotots_argument_202 = name;
        const __gotots_argument_203 = void 0;
        const __gotots_argument_204 = innerParams;
        const __gotots_argument_205 = void 0;
        const __gotots_argument_206 = void 0;
        const __gotots_argument_207 = asyncBody;
        let generatorFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewFunctionExpression(__gotots_receiver_77, __gotots_argument_200, __gotots_argument_201, __gotots_argument_202, __gotots_argument_203, __gotots_argument_204, __gotots_argument_205, __gotots_argument_206, __gotots_argument_207);
        const __gotots_store_193 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let returnStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeFactory"), NodeFactory__from_printer.NewAsyncGeneratorHelper(f, generatorFunc, !(((void forAwaitHierarchyFacts,
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).forAwaitHierarchyFacts.$value & forAwaitHierarchyFactsHasLexicalThis$constant().$value) as int)
            ===
                ((void forAwaitHierarchyFacts,
                    0) as int))));
        const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_194, "Transformer")));
        if (emitSuperHelpers) {
            if (OrderedSet$Size$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties) > 0) {
                const __gotots_store_195 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_78 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "Transformer"));
                const __gotots_store_196 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_208 = superAccessState.$go$private$estransforms$createSuperAccessVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_196, "superAccessState"));
                EmitContext__from_printer.AddInitializationStatement(__gotots_receiver_78, __gotots_argument_208);
            }
        }
        let outerStatements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([returnStatement]);
        const __gotots_store_197 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_80 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "NodeFactory");
        const __gotots_argument_210 = Node__from_ast.AsBlock(Node__from_ast.Body(node));
        const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_79 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_198, "Transformer"));
        const __gotots_store_199 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_209 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "NodeFactory"), outerStatements);
        const __gotots_argument_211 = EmitContext__from_printer.EndAndMergeVariableEnvironmentList(__gotots_receiver_79, __gotots_argument_209);
        const __gotots_argument_212 = Block__from_ast.$storageOf(((Node__from_ast.AsBlock(Node__from_ast.Body(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
        let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateBlock(__gotots_receiver_80, __gotots_argument_210, __gotots_argument_211, __gotots_argument_212);
        if (emitSuperHelpers && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess) {
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment) {
                const __gotots_store_200 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitHelper(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_200, "Transformer")), block, RuntimeSlice.literal<{
                    value: EmitHelper__from_printer;
                } | undefined>([$state__printer.AdvancedAsyncSuperHelper]));
            }
            else {
                const __gotots_store_201 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitHelper(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "Transformer")), block, RuntimeSlice.literal<{
                    value: EmitHelper__from_printer;
                } | undefined>([$state__printer.AsyncSuperHelper]));
            }
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties = savedCapturedSuperProperties;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess = savedHasSuperElementAccess;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding = savedSuperBinding;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding = savedSuperIndexBinding;
        return block;
    }
    static $go$private$estransforms$transformAsyncGeneratorFunctionParameterList(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (isSimpleParameterList(Node__from_ast.Parameters(node))) {
            const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_72 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "Transformer"));
            const __gotots_argument_184 = Node__from_ast.ParameterList(node);
            const __gotots_store_176 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_185 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "Transformer"));
            return EmitContext__from_printer.VisitParameters(__gotots_receiver_72, __gotots_argument_184, __gotots_argument_185);
        }
        let newParameters = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_0 = Node__from_ast.Parameters(node);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            let param: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(parameter);
            if (!(ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) || !(ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) {
                break;
            }
            const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_178 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_73 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "NodeFactory");
            const __gotots_argument_186 = void 0;
            const __gotots_argument_187 = void 0;
            const __gotots_store_179 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_188 = NodeFactory__from_printer.NewGeneratedNameForNodeEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "Transformer")), ParameterDeclaration__from_ast.Name(param), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
            const __gotots_argument_189 = void 0;
            const __gotots_argument_190 = void 0;
            const __gotots_argument_191 = void 0;
            let newParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_73, __gotots_argument_186, __gotots_argument_187, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190, __gotots_argument_191);
            newParameters = newParameters.append(void 0, [newParameter]);
        }
        const __gotots_store_180 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_181 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let newParametersArray: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "NodeFactory"), newParameters);
        NodeList__from_ast.$storageOf(((newParametersArray ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.ParameterList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        return newParametersArray;
    }
    static $go$private$estransforms$transformForAwaitOfStatement(tx: forawaitTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined, outermostLabeledStatement: {
        value: LabeledStatement__from_ast;
    } | undefined, ancestorFacts: forAwaitHierarchyFacts): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_113 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let f: {
            value: NodeFactory__from_printer;
        } | undefined = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "Transformer"));
        const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        let iterator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsIdentifier__from_ast(expression)) {
            iterator = NodeFactory__from_printer.NewGeneratedNameForNode(f, expression);
        }
        else {
            iterator = NodeFactory__from_printer.NewTempVariable(f);
        }
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsIdentifier__from_ast(expression)) {
            result = NodeFactory__from_printer.NewGeneratedNameForNode(f, iterator);
        }
        else {
            result = NodeFactory__from_printer.NewTempVariable(f);
        }
        let nonUserCode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
        let done: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
        const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "Transformer")), done);
        let errorRecord: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueName(f, "e");
        let catchVariable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(f, errorRecord);
        let returnMethod: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(f);
        let callValues: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAsyncValuesHelper(f, expression);
        Node__from_ast.$storageOf(((callValues ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_116 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "NodeFactory");
        const __gotots_store_117 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory");
        const __gotots_argument_104 = iterator;
        const __gotots_argument_105 = void 0;
        const __gotots_store_118 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_106 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "NodeFactory"), "next");
        const __gotots_argument_107 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_108 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_42, __gotots_argument_104, __gotots_argument_105, __gotots_argument_106, __gotots_argument_107);
        const __gotots_argument_109 = void 0;
        const __gotots_argument_110 = void 0;
        const __gotots_store_119 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_111 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_argument_112 = NodeFlagsNone$constant__from_ast();
        let callNext: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_43, __gotots_argument_108, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112);
        const __gotots_store_120 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_44 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "NodeFactory");
        const __gotots_argument_113 = result;
        const __gotots_argument_114 = void 0;
        const __gotots_store_121 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_115 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory"), "done");
        const __gotots_argument_116 = NodeFlagsNone$constant__from_ast();
        let getDone: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_44, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116);
        const __gotots_store_122 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "NodeFactory");
        const __gotots_argument_117 = result;
        const __gotots_argument_118 = void 0;
        const __gotots_store_123 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_119 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "NodeFactory"), "value");
        const __gotots_argument_120 = NodeFlagsNone$constant__from_ast();
        let getValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_45, __gotots_argument_117, __gotots_argument_118, __gotots_argument_119, __gotots_argument_120);
        let callReturn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionCallCall(f, returnMethod, iterator, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "Transformer")), errorRecord);
        const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "Transformer")), returnMethod);
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((void forAwaitHierarchyFacts,
            ancestorFacts.$value & forAwaitHierarchyFactsIterationContainer$constant().$value) as int)
            ===
                ((void forAwaitHierarchyFacts,
                    0) as int))) {
            initializer = NodeFactory__from_printer.InlineExpressions(f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_printer.NewAssignmentExpression(f, errorRecord, NodeFactory__from_printer.NewVoidZeroExpression(f)), callValues]));
        }
        else {
            initializer = callValues;
        }
        const __gotots_store_126 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let iteratorDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "NodeFactory"), iterator, void 0, void 0, initializer);
        Node__from_ast.$storageOf(((iteratorDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_127 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "NodeFactory");
        const __gotots_store_128 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory");
        const __gotots_store_129 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "NodeFactory");
        const __gotots_argument_121 = nonUserCode;
        const __gotots_argument_122 = void 0;
        const __gotots_argument_123 = void 0;
        const __gotots_store_130 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_124 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeFactory"), KindTrueKeyword$constant__from_ast());
        const __gotots_slice_element_0 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_46, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124);
        const __gotots_slice_element_1 = iteratorDecl;
        const __gotots_store_131 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_2 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeFactory"), result, void 0, void 0, void 0);
        const __gotots_argument_125 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0, __gotots_slice_element_1, __gotots_slice_element_2]);
        const __gotots_argument_126 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_47, __gotots_argument_125);
        const __gotots_argument_127 = NodeFlagsNone$constant__from_ast();
        let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_48, __gotots_argument_126, __gotots_argument_127);
        Node__from_ast.$storageOf(((varDeclList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_receiver_49 = f;
        const __gotots_slice_element_3 = NodeFactory__from_printer.NewAssignmentExpression(f, result, forawaitTransformer.$go$private$estransforms$createDownlevelAwait(tx, callNext));
        const __gotots_slice_element_4 = NodeFactory__from_printer.NewAssignmentExpression(f, done, getDone);
        const __gotots_store_132 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_5 = NodeFactory__from_ast.NewPrefixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeFactory"), KindExclamationToken$constant__from_ast(), done);
        const __gotots_argument_128 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_3, __gotots_slice_element_4, __gotots_slice_element_5]);
        let condition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.InlineExpressions(__gotots_receiver_49, __gotots_argument_128);
        const __gotots_receiver_50 = f;
        const __gotots_argument_129 = nonUserCode;
        const __gotots_store_133 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_130 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "NodeFactory"), KindTrueKeyword$constant__from_ast());
        let incrementor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_50, __gotots_argument_129, __gotots_argument_130);
        const __gotots_store_134 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let forStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewForStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "NodeFactory"), varDeclList, condition, incrementor, forawaitTransformer.$go$private$estransforms$convertForOfStatementHead(tx, node, getValue, nonUserCode));
        Node__from_ast.$storageOf(((forStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Loc)));
        const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "Transformer")), forStatement, EFNoTokenTrailingSourceMaps$constant__from_printer());
        const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_51 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "Transformer"));
        const __gotots_argument_131 = forStatement;
        const __gotots_store_137 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_132 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_51, __gotots_argument_131, __gotots_argument_132);
        const __gotots_store_138 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_52 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "NodeFactory");
        const __gotots_store_139 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_133 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_printer.RestoreEnclosingLabel(f, forStatement, outermostLabeledStatement)]));
        const __gotots_argument_134 = true;
        let tryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_52, __gotots_argument_133, __gotots_argument_134);
        const __gotots_store_140 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_59 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory");
        const __gotots_store_141 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_58 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "NodeFactory");
        const __gotots_store_142 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_57 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory");
        const __gotots_receiver_56 = f;
        const __gotots_argument_143 = errorRecord;
        const __gotots_store_143 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "NodeFactory");
        const __gotots_store_144 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_54 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory");
        const __gotots_store_145 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_53 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "NodeFactory");
        const __gotots_argument_135 = void 0;
        const __gotots_store_146 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_136 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "NodeFactory"), "error");
        const __gotots_argument_137 = void 0;
        const __gotots_argument_138 = void 0;
        const __gotots_argument_139 = catchVariable;
        const __gotots_slice_element_6 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_53, __gotots_argument_135, __gotots_argument_136, __gotots_argument_137, __gotots_argument_138, __gotots_argument_139);
        const __gotots_argument_140 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_6]);
        const __gotots_argument_141 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_54, __gotots_argument_140);
        const __gotots_argument_142 = false;
        const __gotots_argument_144 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_55, __gotots_argument_141, __gotots_argument_142);
        const __gotots_argument_145 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_56, __gotots_argument_143, __gotots_argument_144);
        const __gotots_slice_element_7 = NodeFactory__from_ast.NewExpressionStatement(__gotots_receiver_57, __gotots_argument_145);
        const __gotots_argument_146 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_7]);
        const __gotots_argument_147 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_58, __gotots_argument_146);
        const __gotots_argument_148 = false;
        let catchBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_59, __gotots_argument_147, __gotots_argument_148);
        const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "Transformer")), catchBody, EFSingleLine$constant__from_printer());
        const __gotots_store_148 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_60 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "NodeFactory");
        const __gotots_store_149 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_149 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "NodeFactory"), catchVariable, void 0, void 0, void 0);
        const __gotots_argument_150 = catchBody;
        let catchClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCatchClause(__gotots_receiver_60, __gotots_argument_149, __gotots_argument_150);
        const __gotots_store_150 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_64 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "NodeFactory");
        const __gotots_argument_162 = void 0;
        const __gotots_store_151 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_61 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "NodeFactory");
        const __gotots_argument_151 = void 0;
        const __gotots_store_152 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_152 = NodeFactory__from_ast.NewPrefixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "NodeFactory"), KindExclamationToken$constant__from_ast(), nonUserCode);
        const __gotots_argument_153 = void 0;
        const __gotots_store_153 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_154 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "NodeFactory"), KindAmpersandAmpersandToken$constant__from_ast());
        const __gotots_store_154 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_155 = NodeFactory__from_ast.NewPrefixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeFactory"), KindExclamationToken$constant__from_ast(), done);
        const __gotots_argument_163 = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_61, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154, __gotots_argument_155);
        const __gotots_argument_164 = void 0;
        const __gotots_store_155 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_165 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_155, "NodeFactory"), KindAmpersandAmpersandToken$constant__from_ast());
        const __gotots_receiver_63 = f;
        const __gotots_argument_160 = returnMethod;
        const __gotots_store_156 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_62 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory");
        const __gotots_argument_156 = iterator;
        const __gotots_argument_157 = void 0;
        const __gotots_store_157 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_158 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "NodeFactory"), "return");
        const __gotots_argument_159 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_161 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_62, __gotots_argument_156, __gotots_argument_157, __gotots_argument_158, __gotots_argument_159);
        const __gotots_argument_166 = NodeFactory__from_printer.NewAssignmentExpression(__gotots_receiver_63, __gotots_argument_160, __gotots_argument_161);
        let innerIfCondition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_64, __gotots_argument_162, __gotots_argument_163, __gotots_argument_164, __gotots_argument_165, __gotots_argument_166);
        const __gotots_store_158 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_65 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory");
        const __gotots_argument_167 = innerIfCondition;
        const __gotots_store_159 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_168 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "NodeFactory"), forawaitTransformer.$go$private$estransforms$createDownlevelAwait(tx, callReturn));
        const __gotots_argument_169 = void 0;
        let innerIfStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIfStatement(__gotots_receiver_65, __gotots_argument_167, __gotots_argument_168, __gotots_argument_169);
        const __gotots_store_160 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "Transformer")), innerIfStatement, EFSingleLine$constant__from_printer());
        const __gotots_store_161 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_66 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "NodeFactory");
        const __gotots_store_162 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_170 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([innerIfStatement]));
        const __gotots_argument_171 = false;
        let innerTryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_66, __gotots_argument_170, __gotots_argument_171);
        const __gotots_store_163 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_69 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "NodeFactory");
        const __gotots_argument_177 = errorRecord;
        const __gotots_store_164 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_68 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory");
        const __gotots_store_165 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_67 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "NodeFactory");
        const __gotots_argument_172 = errorRecord;
        const __gotots_argument_173 = void 0;
        const __gotots_store_166 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_174 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "NodeFactory"), "error");
        const __gotots_argument_175 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_176 = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_67, __gotots_argument_172, __gotots_argument_173, __gotots_argument_174, __gotots_argument_175);
        const __gotots_argument_178 = NodeFactory__from_ast.NewThrowStatement(__gotots_receiver_68, __gotots_argument_176);
        const __gotots_argument_179 = void 0;
        let innerFinallyIf: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIfStatement(__gotots_receiver_69, __gotots_argument_177, __gotots_argument_178, __gotots_argument_179);
        const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "Transformer")), innerFinallyIf, EFSingleLine$constant__from_printer());
        const __gotots_store_168 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "NodeFactory");
        const __gotots_store_169 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_180 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([innerFinallyIf]));
        const __gotots_argument_181 = false;
        let innerFinallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_70, __gotots_argument_180, __gotots_argument_181);
        const __gotots_store_170 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "Transformer")), innerFinallyBlock, EFSingleLine$constant__from_printer());
        const __gotots_store_171 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let innerTryStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTryStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "NodeFactory"), innerTryBlock, void 0, innerFinallyBlock);
        const __gotots_store_172 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_71 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "NodeFactory");
        const __gotots_store_173 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_182 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([innerTryStatement]));
        const __gotots_argument_183 = true;
        let finallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_71, __gotots_argument_182, __gotots_argument_183);
        const __gotots_store_174 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewTryStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "NodeFactory"), tryBlock, catchClause, finallyBlock);
    }
    static $go$private$estransforms$visit(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsForAwaitOrAsyncGenerator$constant__from_ast()) >>> 0 === 0) {
            return forawaitTransformer.$go$private$estransforms$fallbackVisitor(tx, node);
        }
        const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        superAccessState.$go$private$estransforms$trackSuperAccess(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "superAccessState"), node);
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindAwaitExpression$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$visitAwaitExpression(tx, Node__from_ast.AsAwaitExpression(node));
                break;
            }
            case KindYieldExpression$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$visitYieldExpression(tx, Node__from_ast.AsYieldExpression(node));
                break;
            }
            case KindReturnStatement$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$visitReturnStatement(tx, Node__from_ast.AsReturnStatement(node));
                break;
            }
            case KindLabeledStatement$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$visitLabeledStatement(tx, Node__from_ast.AsLabeledStatement(node));
                break;
            }
            case KindDoStatement$constant__from_ast():
            case KindWhileStatement$constant__from_ast():
            case KindForInStatement$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitDefault($argument0, $argument1);
                }, node, forAwaitHierarchyFactsIterationStatementExcludes$constant(), forAwaitHierarchyFactsIterationStatementIncludes$constant());
                break;
            }
            case KindForOfStatement$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$visitForOfStatement(tx, Node__from_ast.AsForInOrOfStatement(node), void 0);
                break;
            }
            case KindForStatement$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitDefault($argument0, $argument1);
                }, node, forAwaitHierarchyFactsIterationStatementExcludes$constant(), forAwaitHierarchyFactsIterationStatementIncludes$constant());
                break;
            }
            case KindConstructor$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitConstructorDeclaration($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            case KindMethodDeclaration$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitMethodDeclaration($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            case KindGetAccessor$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitGetAccessorDeclaration($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            case KindSetAccessor$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitSetAccessorDeclaration($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            case KindFunctionDeclaration$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitFunctionDeclaration($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            case KindFunctionExpression$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitFunctionExpression($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            case KindArrowFunction$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitArrowFunction($argument0, $argument1);
                }, node, forAwaitHierarchyFactsArrowFunctionExcludes$constant(), forAwaitHierarchyFactsArrowFunctionIncludes$constant());
                break;
            }
            case KindClassDeclaration$constant__from_ast():
            case KindClassExpression$constant__from_ast(): {
                return forawaitTransformer.$go$private$estransforms$doWithHierarchyFacts(tx, ($argument0: forawaitTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return forawaitTransformer.$go$private$estransforms$visitDefault($argument0, $argument1);
                }, node, forAwaitHierarchyFactsClassOrFunctionExcludes$constant(), forAwaitHierarchyFactsClassOrFunctionIncludes$constant());
                break;
            }
            default: {
                const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Transformer")), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitArrowFunction(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: ArrowFunction__from_ast;
        } | undefined = Node__from_ast.AsArrowFunction(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_102 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_40 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "NodeFactory");
        const __gotots_argument_94 = decl;
        const __gotots_store_103 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_95 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "ModifiersBase"));
        const __gotots_argument_96 = void 0;
        const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_38 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "Transformer"));
        const __gotots_argument_90 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_105 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_91 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "Transformer"));
        const __gotots_argument_97 = EmitContext__from_printer.VisitParameters(__gotots_receiver_38, __gotots_argument_90, __gotots_argument_91);
        const __gotots_argument_98 = void 0;
        const __gotots_argument_99 = void 0;
        const __gotots_argument_100 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken;
        const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_39 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "Transformer"));
        const __gotots_argument_92 = Node__from_ast.Body(node);
        const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_93 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "Transformer"));
        const __gotots_argument_101 = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_39, __gotots_argument_92, __gotots_argument_93);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateArrowFunction(__gotots_receiver_40, __gotots_argument_94, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitAwaitExpression(tx: forawaitTransformer | undefined, node: {
        value: AwaitExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_14 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory");
            const __gotots_argument_9 = void 0;
            const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_7 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Transformer"));
            const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_8 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_argument_10 = NodeFactory__from_printer.NewAwaitHelper(__gotots_receiver_7, __gotots_argument_8);
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewYieldExpression(__gotots_receiver_8, __gotots_argument_9, __gotots_argument_10);
            Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_9 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Transformer"));
            const __gotots_argument_11 = result;
            const __gotots_store_18 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase));
            const __gotots_argument_12 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_9, __gotots_argument_11, __gotots_argument_12);
            return result;
        }
        const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_10 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "Transformer"));
        const __gotots_store_20 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase));
        const __gotots_argument_13 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_10, __gotots_argument_13);
    }
    static $go$private$estransforms$visitConstructorDeclaration(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: ConstructorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsConstructorDeclaration(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_54 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory");
        const __gotots_argument_34 = decl;
        const __gotots_store_55 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_35 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "ModifiersBase"));
        const __gotots_argument_36 = void 0;
        const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_19 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Transformer"));
        const __gotots_argument_30 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_31 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "Transformer"));
        const __gotots_argument_37 = EmitContext__from_printer.VisitParameters(__gotots_receiver_19, __gotots_argument_30, __gotots_argument_31);
        const __gotots_argument_38 = void 0;
        const __gotots_argument_39 = void 0;
        const __gotots_store_58 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_20 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "Transformer"));
        const __gotots_argument_32 = Node__from_ast.Body(node);
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_33 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "Transformer"));
        const __gotots_argument_40 = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_20, __gotots_argument_32, __gotots_argument_33);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateConstructorDeclaration(__gotots_receiver_21, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitDefault(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "Transformer")), node);
    }
    static $go$private$estransforms$visitFallback(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return forawaitTransformer.$go$private$estransforms$fallbackVisitor(tx, node);
    }
    static $go$private$estransforms$visitForOfStatement(tx: forawaitTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined, outermostLabeledStatement: {
        value: LabeledStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let ancestorFacts = forawaitTransformer.$go$private$estransforms$enterSubtree(tx, forAwaitHierarchyFactsIterationStatementExcludes$constant(), forAwaitHierarchyFactsIterationStatementIncludes$constant());
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier === undefined)) {
            result = forawaitTransformer.$go$private$estransforms$transformForAwaitOfStatement(tx, node, outermostLabeledStatement, ancestorFacts);
        }
        else {
            const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_18 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Transformer"));
            const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_17 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Transformer"));
            const __gotots_store_52 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_27 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_28 = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_17, __gotots_argument_27);
            const __gotots_argument_29 = outermostLabeledStatement;
            result = NodeFactory__from_printer.RestoreEnclosingLabel(__gotots_receiver_18, __gotots_argument_28, __gotots_argument_29);
        }
        forawaitTransformer.$go$private$estransforms$exitSubtree(tx, ancestorFacts);
        return result;
    }
    static $go$private$estransforms$visitFunctionDeclaration(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_receiver_32 = tx;
            const __gotots_store_85 = FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
            const __gotots_argument_80 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "ModifiersBase"), ($go$storage: ModifiersBase__from_ast$Storage): ModifiersBase__from_ast => {
                return ModifiersBase__from_ast.$fromStorage($go$storage);
            }, ($go$value: ModifiersBase__from_ast): ModifiersBase__from_ast$Storage => {
                return ModifiersBase__from_ast.$storageOf($go$value);
            }));
            modifiers = forawaitTransformer.$go$private$estransforms$visitModifiersNoAsync(__gotots_receiver_32, __gotots_argument_80);
        }
        else {
            const __gotots_store_86 = FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
            modifiers = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "ModifiersBase"), ($go$storage: ModifiersBase__from_ast$Storage): ModifiersBase__from_ast => {
                return ModifiersBase__from_ast.$fromStorage($go$storage);
            }, ($go$value: ModifiersBase__from_ast): ModifiersBase__from_ast$Storage => {
                return ModifiersBase__from_ast.$storageOf($go$value);
            }));
        }
        let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            asteriskToken = void 0;
        }
        else {
            asteriskToken = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken;
        }
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            parameters = forawaitTransformer.$go$private$estransforms$transformAsyncGeneratorFunctionParameterList(tx, node);
            body = forawaitTransformer.$go$private$estransforms$transformAsyncGeneratorFunctionBody(tx, node);
        }
        else {
            const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_33 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "Transformer"));
            const __gotots_argument_81 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters;
            const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_82 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "Transformer"));
            parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_33, __gotots_argument_81, __gotots_argument_82);
            const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_34 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "Transformer"));
            const __gotots_argument_83 = Node__from_ast.Body(node);
            const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_84 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "Transformer"));
            body = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_34, __gotots_argument_83, __gotots_argument_84);
        }
        const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_92 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateFunctionDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "NodeFactory"), decl, modifiers, asteriskToken, FunctionDeclaration__from_ast.Name(decl), void 0, parameters, void 0, void 0, body);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitFunctionExpression(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: FunctionExpression__from_ast;
        } | undefined = Node__from_ast.AsFunctionExpression(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_receiver_35 = tx;
            const __gotots_store_93 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_85 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "ModifiersBase"));
            modifiers = forawaitTransformer.$go$private$estransforms$visitModifiersNoAsync(__gotots_receiver_35, __gotots_argument_85);
        }
        else {
            const __gotots_store_94 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            modifiers = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "ModifiersBase"));
        }
        let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            asteriskToken = void 0;
        }
        else {
            asteriskToken = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
        }
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            parameters = forawaitTransformer.$go$private$estransforms$transformAsyncGeneratorFunctionParameterList(tx, node);
            body = forawaitTransformer.$go$private$estransforms$transformAsyncGeneratorFunctionBody(tx, node);
        }
        else {
            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_36 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "Transformer"));
            const __gotots_argument_86 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
            const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_87 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "Transformer"));
            parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_36, __gotots_argument_86, __gotots_argument_87);
            const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_37 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "Transformer"));
            const __gotots_argument_88 = Node__from_ast.Body(node);
            const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_89 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "Transformer"));
            body = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_37, __gotots_argument_88, __gotots_argument_89);
        }
        const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_100 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateFunctionExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory"), decl, modifiers, asteriskToken, FunctionExpression__from_ast.Name(decl), void 0, parameters, void 0, void 0, body);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitGetAccessorDeclaration(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: GetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsGetAccessorDeclaration(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_70 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "NodeFactory");
        const __gotots_argument_60 = decl;
        const __gotots_store_71 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_61 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NamedMemberBase"));
        const __gotots_store_72 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_62 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "Transformer")), GetAccessorDeclaration__from_ast.Name(decl));
        const __gotots_argument_63 = void 0;
        const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_26 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "Transformer"));
        const __gotots_argument_56 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_57 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "Transformer"));
        const __gotots_argument_64 = EmitContext__from_printer.VisitParameters(__gotots_receiver_26, __gotots_argument_56, __gotots_argument_57);
        const __gotots_argument_65 = void 0;
        const __gotots_argument_66 = void 0;
        const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_27 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "Transformer"));
        const __gotots_argument_58 = Node__from_ast.Body(node);
        const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_59 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "Transformer"));
        const __gotots_argument_67 = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_27, __gotots_argument_58, __gotots_argument_59);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_28, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitLabeledStatement(tx: forawaitTransformer | undefined, node: {
        value: LabeledStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = unwrapInnermostStatementOfLabel(node);
            if (Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForOfStatement$constant__from_ast() && !((Node__from_ast.AsForInOrOfStatement(statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier === undefined)) {
                return forawaitTransformer.$go$private$estransforms$visitForOfStatement(tx, Node__from_ast.AsForInOrOfStatement(statement), node);
            }
            const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_15 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "Transformer"));
            const __gotots_store_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_20 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "Transformer")), statement);
            const __gotots_argument_21 = node;
            return NodeFactory__from_printer.RestoreEnclosingLabel(__gotots_receiver_15, __gotots_argument_20, __gotots_argument_21);
        }
        const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_16 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "Transformer"));
        const __gotots_store_48 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_22 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_16, __gotots_argument_22);
    }
    static $go$private$estransforms$visitMethodDeclaration(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: MethodDeclaration__from_ast;
        } | undefined = Node__from_ast.AsMethodDeclaration(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_receiver_22 = tx;
            const __gotots_store_60 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_41 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NamedMemberBase"));
            modifiers = forawaitTransformer.$go$private$estransforms$visitModifiersNoAsync(__gotots_receiver_22, __gotots_argument_41);
        }
        else {
            const __gotots_store_61 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            modifiers = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NamedMemberBase"));
        }
        let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            asteriskToken = void 0;
        }
        else {
            asteriskToken = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
        }
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            parameters = forawaitTransformer.$go$private$estransforms$transformAsyncGeneratorFunctionParameterList(tx, node);
            body = forawaitTransformer.$go$private$estransforms$transformAsyncGeneratorFunctionBody(tx, node);
        }
        else {
            const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_23 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Transformer"));
            const __gotots_argument_42 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
            const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_43 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "Transformer"));
            parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_23, __gotots_argument_42, __gotots_argument_43);
            const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_24 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "Transformer"));
            const __gotots_argument_44 = Node__from_ast.Body(node);
            const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_45 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "Transformer"));
            body = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_24, __gotots_argument_44, __gotots_argument_45);
        }
        const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_67 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
        const __gotots_argument_46 = decl;
        const __gotots_argument_47 = modifiers;
        const __gotots_argument_48 = asteriskToken;
        const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_49 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "Transformer")), MethodDeclaration__from_ast.Name(decl));
        const __gotots_argument_50 = void 0;
        const __gotots_argument_51 = void 0;
        const __gotots_argument_52 = parameters;
        const __gotots_argument_53 = void 0;
        const __gotots_argument_54 = void 0;
        const __gotots_argument_55 = body;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_25, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitModifiersNoAsync(tx: forawaitTransformer | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        return NodeVisitor__from_ast.VisitModifiers((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).noAsyncModifierVisitor, modifiers);
    }
    static $go$private$estransforms$visitReturnStatement(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(ReturnStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast>).value).Expression === undefined)) {
                const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "Transformer")), ReturnStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast>).value).Expression);
            }
            else {
                const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "Transformer")));
            }
            const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_42 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory"), node, forawaitTransformer.$go$private$estransforms$createDownlevelAwait(tx, expression));
        }
        const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_14 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "Transformer"));
        const __gotots_store_44 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(StatementBase__from_ast.$storageOf(StatementBase__from_ast.$fromStorage(ReturnStatement__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_19 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_14, __gotots_argument_19);
    }
    static $go$private$estransforms$visitSetAccessorDeclaration(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: SetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsSetAccessorDeclaration(node);
        let savedEnclosingFunctionFlags = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = GetFunctionFlags__from_ast(node);
        const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_78 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "NodeFactory");
        const __gotots_argument_72 = decl;
        const __gotots_store_79 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_73 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "NamedMemberBase"));
        const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_74 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "Transformer")), SetAccessorDeclaration__from_ast.Name(decl));
        const __gotots_argument_75 = void 0;
        const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_29 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "Transformer"));
        const __gotots_argument_68 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_69 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "Transformer"));
        const __gotots_argument_76 = EmitContext__from_printer.VisitParameters(__gotots_receiver_29, __gotots_argument_68, __gotots_argument_69);
        const __gotots_argument_77 = void 0;
        const __gotots_argument_78 = void 0;
        const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_30 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "Transformer"));
        const __gotots_argument_70 = Node__from_ast.Body(node);
        const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_71 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "Transformer"));
        const __gotots_argument_79 = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_30, __gotots_argument_70, __gotots_argument_71);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_31, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags = savedEnclosingFunctionFlags;
        return updated;
    }
    static $go$private$estransforms$visitSourceFile(tx: forawaitTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let ancestorFacts = forawaitTransformer.$go$private$estransforms$enterSubtree(tx, forAwaitHierarchyFactsSourceFileExcludes$constant(), forAwaitHierarchyFactsStrictModeSourceFileIncludes$constant());
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportedVariableStatement = false;
        const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_5 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Transformer"));
        const __gotots_store_10 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_5 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_5, __gotots_argument_5);
        const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_6 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Transformer"));
        const __gotots_argument_6 = visited;
        const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_7 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Transformer")));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_6, __gotots_argument_6, __gotots_argument_7);
        forawaitTransformer.$go$private$estransforms$exitSubtree(tx, ancestorFacts);
        return visited;
    }
    static $go$private$estransforms$visitYieldExpression(tx: forawaitTransformer | undefined, node: {
        value: YieldExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0) && !(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionFlags & FunctionFlagsGenerator$constant__from_ast()) >>> 0 === 0)) {
            if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AsteriskToken === undefined)) {
                const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let asyncValuesResult: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAsyncValuesHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Transformer")), expression);
                Node__from_ast.$storageOf(((asyncValuesResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let asyncDelegatorResult: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAsyncDelegatorHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "Transformer")), asyncValuesResult);
                Node__from_ast.$storageOf(((asyncDelegatorResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_25 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let innerYield: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateYieldExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), node, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AsteriskToken, asyncDelegatorResult);
                const __gotots_store_26 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let awaitedYield: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAwaitHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Transformer")), innerYield);
                const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_28 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let result__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewYieldExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"), void 0, awaitedYield);
                Node__from_ast.$storageOf(((result__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase)).NodeDefault)).Node)).Loc)));
                const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_11 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "Transformer"));
                const __gotots_argument_14 = result__shadow_1;
                const __gotots_store_30 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
                const __gotots_argument_15 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                EmitContext__from_printer.SetOriginal(__gotots_receiver_11, __gotots_argument_14, __gotots_argument_15);
                return result__shadow_1;
            }
            let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression === undefined)) {
                const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                innerExpression = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            }
            else {
                const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                innerExpression = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "Transformer")));
            }
            const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_34 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewYieldExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory"), void 0, forawaitTransformer.$go$private$estransforms$createDownlevelAwait(tx, innerExpression));
            Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase)).NodeDefault)).Node)).Loc)));
            const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_12 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Transformer"));
            const __gotots_argument_16 = result;
            const __gotots_store_36 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
            const __gotots_argument_17 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_12, __gotots_argument_16, __gotots_argument_17);
            return result;
        }
        const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_13 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "Transformer"));
        const __gotots_store_38 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
        const __gotots_argument_18 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_13, __gotots_argument_18);
    }
}
export function newforawaitTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let tx: forawaitTransformer | undefined = new forawaitTransformer(Transformer__from_transformers.$zero(), superAccessState.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions, 0, new forAwaitHierarchyFacts(0), false, void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return forawaitTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let result: tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined = Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
    const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "superAccessState");
    const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_argument_2 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer"));
    const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_argument_3 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Transformer"));
    superAccessState.$go$private$estransforms$initSuperAccessVisitor(__gotots_receiver_2, __gotots_argument_2, __gotots_argument_3);
    const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_4 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer"));
    const __gotots_receiver_3 = tx;
    const __gotots_argument_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return forawaitTransformer.$go$private$estransforms$visitFallback(__gotots_receiver_3, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fallbackNodeVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_4, __gotots_argument_4);
    const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).noAsyncModifierVisitor = EmitContext__from_printer.NewNodeVisitor(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Transformer")), (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsyncKeyword$constant__from_ast()) {
            return void 0;
        }
        return node;
    });
    return result;
}
export function unwrapInnermostStatementOfLabel(node: {
    value: LabeledStatement__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (;;) {
        if (!(Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLabeledStatement$constant__from_ast())) {
            return (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement;
        }
        node = Node__from_ast.AsLabeledStatement((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
    }
}
