import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, ArrowFunction as ArrowFunction__from_ast, AwaitExpression as AwaitExpression__from_ast, BindingPattern as BindingPattern__from_ast, CatchClause as CatchClause__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ForInOrOfStatement as ForInOrOfStatement__from_ast, ForStatement as ForStatement__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, PostfixUnaryExpression as PostfixUnaryExpression__from_ast, SourceFile as SourceFile__from_ast, SpreadAssignment as SpreadAssignment__from_ast, SpreadElement as SpreadElement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Block as Block__from_ast, BodyBase as BodyBase__from_ast, ExpressionBase as ExpressionBase__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, FunctionFlagsAsync$constant as FunctionFlagsAsync$constant__from_ast, FunctionFlagsAsyncGenerator$constant as FunctionFlagsAsyncGenerator$constant__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, GetFunctionFlags as GetFunctionFlags__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlock as IsBlock__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsIdentifierName as IsIdentifierName__from_ast, IsIdentifier as IsIdentifier__from_ast, IsLabelName as IsLabelName__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsPostfixUnaryExpression as IsPostfixUnaryExpression__from_ast, IsPrefixUnaryExpression as IsPrefixUnaryExpression__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsyncKeyword$constant as KindAsyncKeyword$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindDotDotDotToken$constant as KindDotDotDotToken$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsBlockScoped$constant as NodeFlagsBlockScoped$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedSet as OrderedSet__from_collections, Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__printer, AutoGenerateOptions as AutoGenerateOptions__from_printer, EFNoLexicalArguments$constant as EFNoLexicalArguments$constant__from_printer, EFNoLexicalThis$constant as EFNoLexicalThis$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsReservedInNestedScopes$int as GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ConvertBindingPatternToAssignmentPattern as ConvertBindingPatternToAssignmentPattern__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { OrderedSet$Size$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Size.js";
import { Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clone$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clone.js";
import { Set$Keys$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { superAccessState } from "./utilities.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class asyncContextFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function asyncContextNonTopLevel$constant(): asyncContextFlags {
    return new asyncContextFlags(1);
}
export function asyncContextHasLexicalThis$constant(): asyncContextFlags {
    return new asyncContextFlags(2);
}
export class lexicalArgumentsInfo {
    declare private readonly $goType: void;
    public constructor(public binding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public used: bool) {
    }
    static $zero(): lexicalArgumentsInfo {
        return new lexicalArgumentsInfo(void 0, false);
    }
    static $copy($source: lexicalArgumentsInfo): lexicalArgumentsInfo {
        return new lexicalArgumentsInfo($source.binding, $source.used);
    }
    declare private readonly then?: never;
}
export class asyncTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public superAccessState: superAccessState, public contextFlags: asyncContextFlags, public enclosingFunctionParameterNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public lexicalArguments: lexicalArgumentsInfo, public asyncBodyVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public fallbackNodeVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$collidesWithParameterName(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (name === undefined) {
            return false;
        }
        if (IsIdentifier__from_ast(name)) {
            return !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames === undefined) && Set__from_collections.Has<gostring>((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames, Node__from_ast.Text(name));
        }
        if (IsBindingPattern__from_ast(name)) {
            const __gotots_range_9 = NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
                const __gotots_range_value_12 = __gotots_range_9.get(__gotots_range_index_8);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
                if (!IsOmittedExpression__from_ast(element) && asyncTransformer.$go$private$estransforms$collidesWithParameterName(tx, element)) {
                    return true;
                }
            }
        }
        return false;
    }
    static $go$private$estransforms$convertToFunctionBlock(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsBlock__from_ast(node)) {
            return node;
        }
        const __gotots_store_178 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_179 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_178, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let ret: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "NodeFactory"), node);
        Node__from_ast.$storageOf(((ret ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_180 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "Transformer")), ret, node);
        const __gotots_store_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_182 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_182, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([ret]));
        NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_183 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_184 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_184, "NodeFactory"), list, true);
        Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        return block;
    }
    static $go$private$estransforms$createCaptureArgumentsStatement(tx: asyncTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_168 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_167, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "NodeFactory");
        const __gotots_argument_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.binding;
        const __gotots_argument_160 = void 0;
        const __gotots_argument_161 = void 0;
        const __gotots_store_169 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_170 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_162 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "NodeFactory"), "arguments");
        let variable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_55, __gotots_argument_159, __gotots_argument_160, __gotots_argument_161, __gotots_argument_162);
        const __gotots_store_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_172 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_56 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "NodeFactory");
        const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_174 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_173, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_163 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_174, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([variable]));
        const __gotots_argument_164 = NodeFlagsNone$constant__from_ast();
        let declList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_56, __gotots_argument_163, __gotots_argument_164);
        const __gotots_store_175 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_176 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_176, "NodeFactory"), void 0, declList);
        const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "Transformer")), statement, 589824);
        return statement;
    }
    static $go$private$estransforms$doWithContext(tx: asyncTransformer | undefined, flags: asyncContextFlags, cb: (($0: asyncTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let flagsToSet = new asyncContextFlags(flags.$value &
            ((void asyncContextFlags,
                ~(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextFlags.$value) as int));
        if (!(flagsToSet.$value ===
            ((void asyncContextFlags,
                0) as int))) {
            asyncTransformer.$go$private$estransforms$setContextFlag(tx, flagsToSet, true);
            const __gotots_callee_0 = cb;
            const __gotots_argument_27 = tx;
            const __gotots_argument_28 = node;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28);
            asyncTransformer.$go$private$estransforms$setContextFlag(tx, flagsToSet, false);
            return result;
        }
        const __gotots_callee_1 = cb;
        const __gotots_argument_29 = tx;
        const __gotots_argument_30 = node;
        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29, __gotots_argument_30);
    }
    static $go$private$estransforms$fallbackVisitor(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties === undefined && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.binding === undefined) {
            return node;
        }
        const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        superAccessState.$go$private$estransforms$trackSuperAccess(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "superAccessState"), node);
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
            case KindParameter$constant__from_ast():
            case KindBindingElement$constant__from_ast():
            case KindVariableDeclaration$constant__from_ast(): {
                break;
            }
            case KindIdentifier$constant__from_ast(): {
                if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.binding === undefined) && Node__from_ast.Text(node) === "arguments" && !IsIdentifierName__from_ast(node) && !IsLabelName__from_ast(node)) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.used = true;
                    return (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.binding;
                }
                break;
            }
        }
        return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fallbackNodeVisitor, node);
    }
    static $go$private$estransforms$getOriginalIfFunctionLike(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_185 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "Transformer")), node);
        if (!(original === undefined) && IsFunctionLikeDeclaration__from_ast(original)) {
            return original;
        }
        return node;
    }
    static $go$private$estransforms$hoistVariable(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (name === undefined) {
            return;
        }
        if (IsIdentifier__from_ast(name)) {
            const __gotots_store_190 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "Transformer")), name);
        }
        else if (IsBindingPattern__from_ast(name)) {
            const __gotots_range_11 = NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
                const __gotots_range_value_14 = __gotots_range_11.get(__gotots_range_index_10);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
                if (!IsOmittedExpression__from_ast(element)) {
                    asyncTransformer.$go$private$estransforms$hoistVariable(tx, element);
                }
            }
        }
    }
    static $go$private$estransforms$hoistVariableDeclarationList(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined): void {
        const __gotots_range_10 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
            const __gotots_range_value_13 = __gotots_range_10.get(__gotots_range_index_9);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
            asyncTransformer.$go$private$estransforms$hoistVariable(tx, decl);
        }
    }
    static $go$private$estransforms$inContext(tx: asyncTransformer | undefined, flags: asyncContextFlags): bool {
        return !(((void asyncContextFlags,
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextFlags.$value & flags.$value) as int)
            ===
                ((void asyncContextFlags,
                    0) as int));
    }
    static $go$private$estransforms$inHasLexicalThisContext(tx: asyncTransformer | undefined): bool {
        return asyncTransformer.$go$private$estransforms$inContext(tx, asyncContextHasLexicalThis$constant());
    }
    static $go$private$estransforms$inTopLevelContext(tx: asyncTransformer | undefined): bool {
        return !asyncTransformer.$go$private$estransforms$inContext(tx, asyncContextNonTopLevel$constant());
    }
    static $go$private$estransforms$isVariableDeclarationListWithCollidingName(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_logical_result_0 = !(node === undefined) && IsVariableDeclarationList__from_ast(node) && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsBlockScoped$constant__from_ast()) >>> 0 === 0;
        if (__gotots_logical_result_0) {
            const __gotots_argument_155 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            const __gotots_receiver_54 = tx;
            const __gotots_argument_156 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return asyncTransformer.$go$private$estransforms$collidesWithParameterName(__gotots_receiver_54, $argument0);
            };
            __gotots_logical_result_0 = ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(__gotots_argument_155, __gotots_argument_156);
        }
        return __gotots_logical_result_0;
    }
    static $go$private$estransforms$recordDeclarationName(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, names: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): void {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
        if (name === undefined) {
            return;
        }
        if (IsIdentifier__from_ast(name)) {
            Set$Add$string(names, Node__from_ast.Text(name));
        }
        else if (IsBindingPattern__from_ast(name)) {
            const __gotots_range_7 = NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                const __gotots_range_value_10 = __gotots_range_7.get(__gotots_range_index_6);
                let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                if (!IsOmittedExpression__from_ast(element)) {
                    asyncTransformer.$go$private$estransforms$recordDeclarationName(tx, element, names);
                }
            }
        }
    }
    static $go$private$estransforms$setContextFlag(tx: asyncTransformer | undefined, flag: asyncContextFlags, val: bool): void {
        if (val) {
            const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_9.contextFlags = new asyncContextFlags(__gotots_store_9.contextFlags.$value | flag.$value);
        }
        else {
            const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_10.contextFlags = new asyncContextFlags(__gotots_store_10.contextFlags.$value & ~flag.$value);
        }
    }
    static $go$private$estransforms$transformAsyncFunctionBody(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, outerParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let isArrow = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast();
        let savedCapturedSuperProperties: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties;
        let savedHasSuperElementAccess = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess;
        let savedHasSuperPropertyAssignment = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment;
        let savedSuperBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding;
        let savedSuperIndexBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding;
        if (!isArrow) {
            const __gotots_struct_0 = OrderedSet__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
                return GoMap.nil();
            });
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties =
                tsonicTypeScriptRuntime.location<OrderedSet__from_collections<gostring>>(__gotots_struct_0);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess = false;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment = false;
            const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "Transformer")), "_super", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
            const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "Transformer")), "_superIndex", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
        }
        let innerParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (!isSimpleParameterList(Node__from_ast.Parameters(node))) {
            const __gotots_store_109 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_44 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "Transformer"));
            const __gotots_argument_135 = Node__from_ast.ParameterList(node);
            const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_136 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "Transformer"));
            innerParameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_44, __gotots_argument_135, __gotots_argument_136);
        }
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        let captureLexicalArguments = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.binding === undefined;
        if (captureLexicalArguments) {
            const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_field_0 = NodeFactory__from_printer.NewUniqueName(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "Transformer")), "arguments");
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(__gotots_field_0, false);
        }
        let argumentsExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(innerParameters === undefined)) {
            if (isArrow) {
                let parameterBindings = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                let outerLen = NodeList__from_ast.$storageOf(((outerParameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length;
                const __gotots_range_3 = Node__from_ast.Parameters(node);
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                    const __gotots_range_value_5 = __gotots_range_index_2;
                    const __gotots_range_value_6 = __gotots_range_3.get(__gotots_range_index_2);
                    let i = __gotots_range_value_5;
                    let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                    if (i >= outerLen) {
                        break;
                    }
                    let originalParameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(param);
                    let outerParameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(NodeList__from_ast.$storageOf(((outerParameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i));
                    if (!(ParameterDeclaration__from_ast.$storageOf(((originalParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) || !(ParameterDeclaration__from_ast.$storageOf(((originalParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) {
                        const __gotots_argument_137 = parameterBindings;
                        const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_113 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_138 = NodeFactory__from_ast.NewSpreadElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory"), ParameterDeclaration__from_ast.Name(outerParameter));
                        parameterBindings = __gotots_argument_137.append(void 0, [__gotots_argument_138]);
                        break;
                    }
                    parameterBindings = parameterBindings.append(void 0, [ParameterDeclaration__from_ast.Name(outerParameter)]);
                }
                const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_115 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_114, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_45 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory");
                const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_117 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_139 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory"), parameterBindings);
                const __gotots_argument_140 = false;
                argumentsExpression = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_45, __gotots_argument_139, __gotots_argument_140);
            }
            else {
                const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_119 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_118, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                argumentsExpression = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeFactory"), "arguments");
            }
        }
        let savedEnclosingFunctionParameterNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames =
            tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                M: GoMap.nil()
            }));
        const __gotots_range_4 = Node__from_ast.Parameters(node);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
            const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_3);
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            asyncTransformer.$go$private$estransforms$recordDeclarationName(tx, parameter, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames);
        }
        let hasLexicalThis = asyncTransformer.$go$private$estransforms$inHasLexicalThisContext(tx);
        let asyncBody: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = asyncTransformer.$go$private$estransforms$transformAsyncFunctionBodyWorker(tx, Node__from_ast.Body(node));
        const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_121 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_120, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory");
        const __gotots_argument_141 = Node__from_ast.AsBlock(asyncBody);
        const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_142 = EmitContext__from_printer.EndAndMergeVariableEnvironmentList(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "Transformer")), Node__from_ast.StatementList(asyncBody));
        const __gotots_argument_143 = Block__from_ast.$storageOf(((Node__from_ast.AsBlock(asyncBody) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
        asyncBody = NodeFactory__from_ast.UpdateBlock(__gotots_receiver_46, __gotots_argument_141, __gotots_argument_142, __gotots_argument_143);
        let emitSuperHelpers = !((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties === undefined) && (OrderedSet$Size$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties) > 0 || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess);
        if (emitSuperHelpers) {
            innerParameters = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superAccessVisitor, innerParameters);
            const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            asyncBody = superAccessState.$go$private$estransforms$substituteSuperAccessesInBody(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "superAccessState"), asyncBody);
        }
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!isArrow) {
            const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "Transformer")));
            if (emitSuperHelpers) {
                if (OrderedSet$Size$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties) > 0) {
                    const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_47 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "Transformer"));
                    const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_144 = superAccessState.$go$private$estransforms$createSuperAccessVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "superAccessState"));
                    EmitContext__from_printer.AddInitializationStatement(__gotots_receiver_47, __gotots_argument_144);
                }
            }
            if (captureLexicalArguments && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.used) {
                const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddInitializationStatement(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "Transformer")), asyncTransformer.$go$private$estransforms$createCaptureArgumentsStatement(tx));
            }
            const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_129 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "NodeFactory");
            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_145 = NodeFactory__from_printer.NewAwaiterHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "Transformer")), hasLexicalThis, argumentsExpression, innerParameters, asyncBody);
            const __gotots_slice_element_0 = NodeFactory__from_ast.NewReturnStatement(__gotots_receiver_48, __gotots_argument_145);
            let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
            const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_132 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_50 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeFactory");
            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_49 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "Transformer"));
            const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_135 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_146 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeFactory"), statements);
            const __gotots_argument_147 = EmitContext__from_printer.EndAndMergeVariableEnvironmentList(__gotots_receiver_49, __gotots_argument_146);
            const __gotots_argument_148 = true;
            let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_50, __gotots_argument_147, __gotots_argument_148);
            Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Body(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            if (emitSuperHelpers && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess) {
                if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment) {
                    const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitHelper(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "Transformer")), block, RuntimeSlice.literal<{
                        value: EmitHelper__from_printer;
                    } | undefined>([$state__printer.AdvancedAsyncSuperHelper]));
                }
                else {
                    const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddEmitHelper(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "Transformer")), block, RuntimeSlice.literal<{
                        value: EmitHelper__from_printer;
                    } | undefined>([$state__printer.AsyncSuperHelper]));
                }
            }
            result = block;
        }
        else {
            const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            result = NodeFactory__from_printer.NewAwaiterHelper(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "Transformer")), hasLexicalThis, argumentsExpression, innerParameters, asyncBody);
            if (captureLexicalArguments && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.used) {
                let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = asyncTransformer.$go$private$estransforms$convertToFunctionBlock(tx, result);
                const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_140 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_51 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory");
                const __gotots_argument_149 = Node__from_ast.AsBlock(block);
                const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_150 = EmitContext__from_printer.MergeEnvironmentList(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "Transformer")), Node__from_ast.StatementList(block), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([asyncTransformer.$go$private$estransforms$createCaptureArgumentsStatement(tx)]));
                const __gotots_argument_151 = Block__from_ast.$storageOf(((Node__from_ast.AsBlock(block) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine;
                result = NodeFactory__from_ast.UpdateBlock(__gotots_receiver_51, __gotots_argument_149, __gotots_argument_150, __gotots_argument_151);
            }
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
        if (!isArrow) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties = savedCapturedSuperProperties;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess = savedHasSuperElementAccess;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding = savedSuperBinding;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding = savedSuperIndexBinding;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        }
        else if (captureLexicalArguments && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.used) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        }
        else if (captureLexicalArguments) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments.used = false;
        }
        return result;
    }
    static $go$private$estransforms$transformAsyncFunctionBodyWorker(tx: asyncTransformer | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsBlock__from_ast(body)) {
            const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_160 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_159, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory"), Node__from_ast.AsBlock(body), NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor, Node__from_ast.StatementList(body)), Block__from_ast.$storageOf(((Node__from_ast.AsBlock(body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
        }
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor, body);
        const __gotots_store_161 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_162 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let ret: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), visited);
        Node__from_ast.$storageOf(((ret ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_164 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([ret]));
        NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_166 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_165, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "NodeFactory"), list, false);
        Node__from_ast.$storageOf(((block ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        return block;
    }
    static $go$private$estransforms$transformAsyncFunctionParameterList(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (isSimpleParameterList(Node__from_ast.Parameters(node))) {
            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_41 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "Transformer"));
            const __gotots_argument_121 = Node__from_ast.ParameterList(node);
            const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_122 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "Transformer"));
            return EmitContext__from_printer.VisitParameters(__gotots_receiver_41, __gotots_argument_121, __gotots_argument_122);
        }
        let newParameters = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_2 = Node__from_ast.Parameters(node);
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
            const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_1);
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            let param: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(parameter);
            if (!(ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) || !(ParameterDeclaration__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) {
                if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast()) {
                    const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_98 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "NodeFactory");
                    const __gotots_argument_123 = void 0;
                    const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_100 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_124 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory"), KindDotDotDotToken$constant__from_ast());
                    const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_125 = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "Transformer")), "args", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
                    const __gotots_argument_126 = void 0;
                    const __gotots_argument_127 = void 0;
                    const __gotots_argument_128 = void 0;
                    let restParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_42, __gotots_argument_123, __gotots_argument_124, __gotots_argument_125, __gotots_argument_126, __gotots_argument_127, __gotots_argument_128);
                    newParameters = newParameters.append(void 0, [restParameter]);
                }
                break;
            }
            const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_103 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_43 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory");
            const __gotots_argument_129 = void 0;
            const __gotots_argument_130 = void 0;
            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_131 = NodeFactory__from_printer.NewGeneratedNameForNodeEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "Transformer")), ParameterDeclaration__from_ast.Name(param), new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsReservedInNestedScopes$int__from_printer), "", ""));
            const __gotots_argument_132 = void 0;
            const __gotots_argument_133 = void 0;
            const __gotots_argument_134 = void 0;
            let newParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_43, __gotots_argument_129, __gotots_argument_130, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133, __gotots_argument_134);
            newParameters = newParameters.append(void 0, [newParameter]);
        }
        const __gotots_store_105 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_106 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let newParametersArray: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "NodeFactory"), newParameters);
        NodeList__from_ast.$storageOf(((newParametersArray ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.ParameterList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        return newParametersArray;
    }
    static $go$private$estransforms$transformInitializedVariable(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsBindingPattern__from_ast(VariableDeclaration__from_ast.Name(node))) {
            const __gotots_store_186 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_165 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_186, "Transformer"));
            const __gotots_argument_166 = Node__from_ast.AsBindingPattern(VariableDeclaration__from_ast.Name(node));
            target = ConvertBindingPatternToAssignmentPattern__from_transformers(__gotots_argument_165, __gotots_argument_166);
        }
        else {
            target = VariableDeclaration__from_ast.Name(node);
        }
        const __gotots_store_187 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let converted: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "Transformer")), target, VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
        const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetSourceMapRange(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_188, "Transformer")), converted, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Loc)));
        const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "Transformer")), converted);
    }
    static $go$private$estransforms$transformMethodBody(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let savedCapturedSuperProperties: tsonicTypeScriptRuntime.Location<OrderedSet__from_collections<gostring>> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties;
        let savedHasSuperElementAccess = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess;
        let savedHasSuperPropertyAssignment = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment;
        let savedSuperBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding;
        let savedSuperIndexBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding;
        const __gotots_struct_1 = OrderedSet__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return GoMap.nil();
        });
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties =
            tsonicTypeScriptRuntime.location<OrderedSet__from_collections<gostring>>(__gotots_struct_1);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess = false;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment = false;
        const __gotots_store_142 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "Transformer")), "_super", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
        const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_143, "Transformer")), "_superIndex", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
        const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.StartVariableEnvironment(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "Transformer")));
        const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_52 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "Transformer"));
        const __gotots_argument_152 = Node__from_ast.Body(node);
        const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_153 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "Transformer"));
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_52, __gotots_argument_152, __gotots_argument_153);
        let emitSuperHelpers = (OrderedSet$Size$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties) > 0 || (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess) && !(((GetFunctionFlags__from_ast(asyncTransformer.$go$private$estransforms$getOriginalIfFunctionLike(tx, node)) & FunctionFlagsAsyncGenerator$constant__from_ast()) >>> 0) === FunctionFlagsAsyncGenerator$constant__from_ast());
        if (emitSuperHelpers) {
            if (OrderedSet$Size$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties) > 0) {
                const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_53 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "Transformer"));
                const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_154 = superAccessState.$go$private$estransforms$createSuperAccessVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "superAccessState"));
                EmitContext__from_printer.AddInitializationStatement(__gotots_receiver_53, __gotots_argument_154);
            }
        }
        const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let mergedStatements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = EmitContext__from_printer.EndAndMergeVariableEnvironmentList(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "Transformer")), Node__from_ast.StatementList(updated));
        if (emitSuperHelpers && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess && !Block__from_ast.$storageOf(((Node__from_ast.AsBlock(updated) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine) {
            const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_151 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let newBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "NodeFactory"), mergedStatements, true);
            Node__from_ast.$storageOf(((newBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((updated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            updated = newBlock;
        }
        else {
            const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_153 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            updated = NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "NodeFactory"), Node__from_ast.AsBlock(updated), mergedStatements, Block__from_ast.$storageOf(((Node__from_ast.AsBlock(updated) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
        }
        if (emitSuperHelpers && (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess) {
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment) {
                const __gotots_store_154 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitHelper(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "Transformer")), updated, RuntimeSlice.literal<{
                    value: EmitHelper__from_printer;
                } | undefined>([$state__printer.AdvancedAsyncSuperHelper]));
            }
            else {
                const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitHelper(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_155, "Transformer")), updated, RuntimeSlice.literal<{
                    value: EmitHelper__from_printer;
                } | undefined>([$state__printer.AsyncSuperHelper]));
            }
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.capturedSuperProperties = savedCapturedSuperProperties;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperElementAccess = savedHasSuperElementAccess;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superBinding = savedSuperBinding;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).superAccessState.superIndexBinding = savedSuperIndexBinding;
        return updated;
    }
    static $go$private$estransforms$visit(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_binary_operand_0 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer")), node);
                    const __gotots_binary_operand_1 = EFNoLexicalThis$constant__from_printer();
                    if (!((__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0 === 0) && asyncTransformer.$go$private$estransforms$inHasLexicalThisContext(tx)) {
                        asyncTransformer.$go$private$estransforms$setContextFlag(tx, asyncContextHasLexicalThis$constant(), false);
                        const __gotots_receiver_7 = tx;
                        const __gotots_argument_6 = asyncContextHasLexicalThis$constant();
                        const __gotots_argument_7 = true;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            asyncTransformer.$go$private$estransforms$setContextFlag(__gotots_receiver_7, __gotots_argument_6, __gotots_argument_7);
                        });
                    }
                    if ((Node__from_ast.SubtreeFacts(node) & (266240)) >>> 0 === 0) {
                        __gotots_return_0 = asyncTransformer.$go$private$estransforms$fallbackVisitor(tx, node);
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    superAccessState.$go$private$estransforms$trackSuperAccess(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "superAccessState"), node);
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindAsyncKeyword$constant__from_ast(): {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSourceFile$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindAwaitExpression$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$visitAwaitExpression(tx, Node__from_ast.AsAwaitExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindMethodDeclaration$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitMethodDeclaration($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionDeclaration$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitFunctionDeclaration($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionExpression$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitFunctionExpression($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindArrowFunction$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, asyncContextNonTopLevel$constant(), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitArrowFunction($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindGetAccessor$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitGetAccessorDeclaration($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSetAccessor$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitSetAccessorDeclaration($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindConstructor$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitConstructorDeclaration($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassDeclaration$constant__from_ast():
                        case KindClassExpression$constant__from_ast(): {
                            __gotots_return_0 = asyncTransformer.$go$private$estransforms$doWithContext(tx, new asyncContextFlags(3), ($argument0: asyncTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return asyncTransformer.$go$private$estransforms$visitDefault($argument0, $argument1);
                            }, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Transformer")), node);
                            break __gotots_return_block_0;
                            break;
                        }
                    }
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
    static $go$private$estransforms$visitArrowFunction(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_binary_operand_2 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "Transformer")), node);
                    const __gotots_binary_operand_3 = EFNoLexicalArguments$constant__from_printer();
                    if (!((__gotots_binary_operand_2 & __gotots_binary_operand_3) >>> 0 === 0)) {
                        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
                        const __gotots_callee_2 = (): void => {
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_2();
                        });
                    }
                    let decl: {
                        value: ArrowFunction__from_ast;
                    } | undefined = Node__from_ast.AsArrowFunction(node);
                    let functionFlags = GetFunctionFlags__from_ast(node);
                    let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                    let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!((functionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
                        parameters = asyncTransformer.$go$private$estransforms$transformAsyncFunctionParameterList(tx, node);
                        body = asyncTransformer.$go$private$estransforms$transformAsyncFunctionBody(tx, node, parameters);
                    }
                    else {
                        const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_23 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "Transformer"));
                        const __gotots_argument_59 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
                        const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_60 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Transformer"));
                        parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_23, __gotots_argument_59, __gotots_argument_60);
                        const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_24 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Transformer"));
                        const __gotots_argument_61 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body;
                        const __gotots_store_52 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_62 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "Transformer"));
                        body = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_24, __gotots_argument_61, __gotots_argument_62);
                    }
                    const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_54 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory");
                    const __gotots_argument_64 = decl;
                    const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_25 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "Transformer"));
                    const __gotots_store_56 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_63 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "ModifiersBase"));
                    const __gotots_argument_65 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_25, __gotots_argument_63);
                    const __gotots_argument_66 = void 0;
                    const __gotots_argument_67 = parameters;
                    const __gotots_argument_68 = void 0;
                    const __gotots_argument_69 = void 0;
                    const __gotots_argument_70 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken;
                    const __gotots_argument_71 = body;
                    __gotots_return_0 = NodeFactory__from_ast.UpdateArrowFunction(__gotots_receiver_26, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
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
    static $go$private$estransforms$visitAsyncBodyNode(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (isNodeWithPossibleHoistedDeclaration(node)) {
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindVariableStatement$constant__from_ast(): {
                    return asyncTransformer.$go$private$estransforms$visitVariableStatementInAsyncBody(tx, node);
                    break;
                }
                case KindForStatement$constant__from_ast(): {
                    return asyncTransformer.$go$private$estransforms$visitForStatementInAsyncBody(tx, Node__from_ast.AsForStatement(node));
                    break;
                }
                case KindForInStatement$constant__from_ast(): {
                    return asyncTransformer.$go$private$estransforms$visitForInStatementInAsyncBody(tx, Node__from_ast.AsForInOrOfStatement(node));
                    break;
                }
                case KindForOfStatement$constant__from_ast(): {
                    return asyncTransformer.$go$private$estransforms$visitForOfStatementInAsyncBody(tx, Node__from_ast.AsForInOrOfStatement(node));
                    break;
                }
                case KindCatchClause$constant__from_ast(): {
                    return asyncTransformer.$go$private$estransforms$visitCatchClauseInAsyncBody(tx, Node__from_ast.AsCatchClause(node));
                    break;
                }
                case KindBlock$constant__from_ast():
                case KindSwitchStatement$constant__from_ast():
                case KindCaseBlock$constant__from_ast():
                case KindCaseClause$constant__from_ast():
                case KindDefaultClause$constant__from_ast():
                case KindTryStatement$constant__from_ast():
                case KindDoStatement$constant__from_ast():
                case KindWhileStatement$constant__from_ast():
                case KindIfStatement$constant__from_ast():
                case KindWithStatement$constant__from_ast():
                case KindLabeledStatement$constant__from_ast(): {
                    return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor, node);
                    break;
                }
            }
        }
        return asyncTransformer.$go$private$estransforms$visit(tx, node);
    }
    static $go$private$estransforms$visitAwaitExpression(tx: asyncTransformer | undefined, node: {
        value: AwaitExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (asyncTransformer.$go$private$estransforms$inTopLevelContext(tx)) {
            const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_9 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Transformer"));
            const __gotots_store_18 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase));
            const __gotots_argument_9 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_9, __gotots_argument_9);
        }
        const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_20 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory");
        const __gotots_argument_10 = void 0;
        const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_11 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        let yieldExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewYieldExpression(__gotots_receiver_10, __gotots_argument_10, __gotots_argument_11);
        Node__from_ast.$storageOf(((yieldExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_11 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Transformer"));
        const __gotots_argument_12 = yieldExpr;
        const __gotots_store_23 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase));
        const __gotots_argument_13 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_11, __gotots_argument_12, __gotots_argument_13);
        return yieldExpr;
    }
    static $go$private$estransforms$visitCatchClauseInAsyncBody(tx: asyncTransformer | undefined, node: {
        value: CatchClause__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let catchClauseNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: GoMap.nil()
        }));
        if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration === undefined)) {
            asyncTransformer.$go$private$estransforms$recordDeclarationName(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration, catchClauseNames);
        }
        let catchClauseUnshadowedNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = void 0;
        const __gotots_range_0 = Set$Keys$string(catchClauseNames);
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            let escapedName = __gotots_range_value_2;
            if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames === undefined) && Set__from_collections.Has<gostring>((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames, escapedName)) {
                if (catchClauseUnshadowedNames === undefined) {
                    catchClauseUnshadowedNames = Set$Clone$string((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames);
                }
                Set__from_collections.Delete<gostring>(catchClauseUnshadowedNames, escapedName);
            }
        }
        if (!(catchClauseUnshadowedNames === undefined)) {
            let savedEnclosingFunctionParameterNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames = catchClauseUnshadowedNames;
            const __gotots_receiver_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor;
            const __gotots_store_93 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_119 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_39, __gotots_argument_119);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
            return result;
        }
        const __gotots_receiver_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor;
        const __gotots_store_94 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_120 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_40, __gotots_argument_120);
    }
    static $go$private$estransforms$visitConstructorDeclaration(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: ConstructorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsConstructorDeclaration(node);
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
        const __gotots_store_69 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_70 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "NodeFactory");
        const __gotots_argument_97 = decl;
        const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_33 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "Transformer"));
        const __gotots_store_72 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_94 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "ModifiersBase"));
        const __gotots_argument_98 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_33, __gotots_argument_94);
        const __gotots_argument_99 = void 0;
        const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_34 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "Transformer"));
        const __gotots_argument_95 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_96 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "Transformer"));
        const __gotots_argument_100 = EmitContext__from_printer.VisitParameters(__gotots_receiver_34, __gotots_argument_95, __gotots_argument_96);
        const __gotots_argument_101 = void 0;
        const __gotots_argument_102 = void 0;
        const __gotots_argument_103 = asyncTransformer.$go$private$estransforms$transformMethodBody(tx, node);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateConstructorDeclaration(__gotots_receiver_35, __gotots_argument_97, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101, __gotots_argument_102, __gotots_argument_103);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        return updated;
    }
    static $go$private$estransforms$visitDefault(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "Transformer")), node);
    }
    static $go$private$estransforms$visitFallback(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return asyncTransformer.$go$private$estransforms$fallbackVisitor(tx, node);
    }
    static $go$private$estransforms$visitForInStatementInAsyncBody(tx: asyncTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let visitedInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (asyncTransformer.$go$private$estransforms$isVariableDeclarationListWithCollidingName(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer)) {
            visitedInitializer = asyncTransformer.$go$private$estransforms$visitVariableDeclarationListWithCollidingNames(tx, Node__from_ast.AsVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer), true);
        }
        else {
            const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            visitedInitializer = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        }
        const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_86 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "NodeFactory");
        const __gotots_argument_109 = node;
        const __gotots_argument_110 = void 0;
        const __gotots_argument_111 = visitedInitializer;
        const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_112 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_argument_113 = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
        return NodeFactory__from_ast.UpdateForInOrOfStatement(__gotots_receiver_37, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111, __gotots_argument_112, __gotots_argument_113);
    }
    static $go$private$estransforms$visitForOfStatementInAsyncBody(tx: asyncTransformer | undefined, node: {
        value: ForInOrOfStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let visitedInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (asyncTransformer.$go$private$estransforms$isVariableDeclarationListWithCollidingName(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer)) {
            visitedInitializer = asyncTransformer.$go$private$estransforms$visitVariableDeclarationListWithCollidingNames(tx, Node__from_ast.AsVariableDeclarationList((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer), true);
        }
        else {
            const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            visitedInitializer = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        }
        const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_90 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeFactory");
        const __gotots_argument_114 = node;
        const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_115 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AwaitModifier);
        const __gotots_argument_116 = visitedInitializer;
        const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_117 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        const __gotots_argument_118 = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statement);
        return NodeFactory__from_ast.UpdateForInOrOfStatement(__gotots_receiver_38, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116, __gotots_argument_117, __gotots_argument_118);
    }
    static $go$private$estransforms$visitForStatementInAsyncBody(tx: asyncTransformer | undefined, node: {
        value: ForStatement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer;
        let visitedInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(initializer === undefined) && asyncTransformer.$go$private$estransforms$isVariableDeclarationListWithCollidingName(tx, initializer)) {
            visitedInitializer = asyncTransformer.$go$private$estransforms$visitVariableDeclarationListWithCollidingNames(tx, Node__from_ast.AsVariableDeclarationList(initializer), false);
        }
        else {
            const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            visitedInitializer = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        }
        const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_81 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory");
        const __gotots_argument_104 = node;
        const __gotots_argument_105 = visitedInitializer;
        const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_106 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition);
        const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_107 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "Transformer")), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor);
        const __gotots_argument_108 = NodeVisitor__from_ast.VisitEmbeddedStatement((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IterationStatementBase.Statement);
        return NodeFactory__from_ast.UpdateForStatement(__gotots_receiver_36, __gotots_argument_104, __gotots_argument_105, __gotots_argument_106, __gotots_argument_107, __gotots_argument_108);
    }
    static $go$private$estransforms$visitFunctionDeclaration(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(node);
        let functionFlags = GetFunctionFlags__from_ast(node);
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((functionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            parameters = asyncTransformer.$go$private$estransforms$transformAsyncFunctionParameterList(tx, node);
            body = asyncTransformer.$go$private$estransforms$transformAsyncFunctionBody(tx, node, parameters);
        }
        else {
            const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_15 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "Transformer"));
            const __gotots_argument_31 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters;
            const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_32 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Transformer"));
            parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_15, __gotots_argument_31, __gotots_argument_32);
            const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_16 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "Transformer"));
            const __gotots_argument_33 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body;
            const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_34 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Transformer"));
            body = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_16, __gotots_argument_33, __gotots_argument_34);
        }
        const __gotots_store_34 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_35 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NodeFactory");
        const __gotots_argument_36 = decl;
        const __gotots_store_36 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_17 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "Transformer"));
        const __gotots_store_37 = FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
        const __gotots_argument_35 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "ModifiersBase"), ($go$storage: ModifiersBase__from_ast$Storage): ModifiersBase__from_ast => {
            return ModifiersBase__from_ast.$fromStorage($go$storage);
        }, ($go$value: ModifiersBase__from_ast): ModifiersBase__from_ast$Storage => {
            return ModifiersBase__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_37 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_17, __gotots_argument_35);
        const __gotots_argument_38 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken;
        const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_39 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "Transformer")), FunctionDeclaration__from_ast.Name(decl));
        const __gotots_argument_40 = void 0;
        const __gotots_argument_41 = parameters;
        const __gotots_argument_42 = void 0;
        const __gotots_argument_43 = void 0;
        const __gotots_argument_44 = body;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateFunctionDeclaration(__gotots_receiver_18, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        return updated;
    }
    static $go$private$estransforms$visitFunctionExpression(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: FunctionExpression__from_ast;
        } | undefined = Node__from_ast.AsFunctionExpression(node);
        let functionFlags = GetFunctionFlags__from_ast(node);
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((functionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            parameters = asyncTransformer.$go$private$estransforms$transformAsyncFunctionParameterList(tx, node);
            body = asyncTransformer.$go$private$estransforms$transformAsyncFunctionBody(tx, node, parameters);
        }
        else {
            const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_19 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "Transformer"));
            const __gotots_argument_45 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
            const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_46 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "Transformer"));
            parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_19, __gotots_argument_45, __gotots_argument_46);
            const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_20 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "Transformer"));
            const __gotots_argument_47 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body;
            const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_48 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "Transformer"));
            body = EmitContext__from_printer.VisitFunctionBody(__gotots_receiver_20, __gotots_argument_47, __gotots_argument_48);
        }
        const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_44 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory");
        const __gotots_argument_50 = decl;
        const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_21 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "Transformer"));
        const __gotots_store_46 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_49 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "ModifiersBase"));
        const __gotots_argument_51 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_21, __gotots_argument_49);
        const __gotots_argument_52 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
        const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_53 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "Transformer")), FunctionExpression__from_ast.Name(decl));
        const __gotots_argument_54 = void 0;
        const __gotots_argument_55 = parameters;
        const __gotots_argument_56 = void 0;
        const __gotots_argument_57 = void 0;
        const __gotots_argument_58 = body;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateFunctionExpression(__gotots_receiver_22, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        return updated;
    }
    static $go$private$estransforms$visitGetAccessorDeclaration(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: GetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsGetAccessorDeclaration(node);
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
        const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_58 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory");
        const __gotots_argument_75 = decl;
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_27 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "Transformer"));
        const __gotots_store_60 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_72 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NamedMemberBase"));
        const __gotots_argument_76 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_27, __gotots_argument_72);
        const __gotots_argument_77 = GetAccessorDeclaration__from_ast.Name(decl);
        const __gotots_argument_78 = void 0;
        const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_28 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "Transformer"));
        const __gotots_argument_73 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_74 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Transformer"));
        const __gotots_argument_79 = EmitContext__from_printer.VisitParameters(__gotots_receiver_28, __gotots_argument_73, __gotots_argument_74);
        const __gotots_argument_80 = void 0;
        const __gotots_argument_81 = void 0;
        const __gotots_argument_82 = asyncTransformer.$go$private$estransforms$transformMethodBody(tx, node);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_29, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        return updated;
    }
    static $go$private$estransforms$visitMethodDeclaration(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: MethodDeclaration__from_ast;
        } | undefined = Node__from_ast.AsMethodDeclaration(node);
        let functionFlags = GetFunctionFlags__from_ast(node);
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((functionFlags & FunctionFlagsAsync$constant__from_ast()) >>> 0 === 0)) {
            parameters = asyncTransformer.$go$private$estransforms$transformAsyncFunctionParameterList(tx, node);
            body = asyncTransformer.$go$private$estransforms$transformAsyncFunctionBody(tx, node, parameters);
        }
        else {
            const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_12 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Transformer"));
            const __gotots_argument_14 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
            const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_15 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "Transformer"));
            parameters = EmitContext__from_printer.VisitParameters(__gotots_receiver_12, __gotots_argument_14, __gotots_argument_15);
            body = asyncTransformer.$go$private$estransforms$transformMethodBody(tx, node);
        }
        const __gotots_store_26 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_27 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "NodeFactory");
        const __gotots_argument_17 = decl;
        const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_13 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "Transformer"));
        const __gotots_store_29 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_16 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NamedMemberBase"));
        const __gotots_argument_18 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_13, __gotots_argument_16);
        const __gotots_argument_19 = BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
        const __gotots_argument_20 = MethodDeclaration__from_ast.Name(decl);
        const __gotots_argument_21 = void 0;
        const __gotots_argument_22 = void 0;
        const __gotots_argument_23 = parameters;
        const __gotots_argument_24 = void 0;
        const __gotots_argument_25 = void 0;
        const __gotots_argument_26 = body;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_14, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        return updated;
    }
    static $go$private$estransforms$visitSetAccessorDeclaration(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let decl: {
            value: SetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsSetAccessorDeclaration(node);
        let savedLexicalArguments = lexicalArgumentsInfo.$copy((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = new lexicalArgumentsInfo(void 0, false);
        const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_64 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "NodeFactory");
        const __gotots_argument_86 = decl;
        const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_30 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "Transformer"));
        const __gotots_store_66 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_83 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "NamedMemberBase"));
        const __gotots_argument_87 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_30, __gotots_argument_83);
        const __gotots_argument_88 = SetAccessorDeclaration__from_ast.Name(decl);
        const __gotots_argument_89 = void 0;
        const __gotots_store_67 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_31 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "Transformer"));
        const __gotots_argument_84 = FunctionLikeBase__from_ast.$storageOf(FunctionLikeBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_85 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "Transformer"));
        const __gotots_argument_90 = EmitContext__from_printer.VisitParameters(__gotots_receiver_31, __gotots_argument_84, __gotots_argument_85);
        const __gotots_argument_91 = void 0;
        const __gotots_argument_92 = void 0;
        const __gotots_argument_93 = asyncTransformer.$go$private$estransforms$transformMethodBody(tx, node);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_32, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lexicalArguments = lexicalArgumentsInfo.$copy(savedLexicalArguments);
        return updated;
    }
    static $go$private$estransforms$visitSourceFile(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            const __gotots_store_12 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
        }
        asyncTransformer.$go$private$estransforms$setContextFlag(tx, asyncContextNonTopLevel$constant(), false);
        asyncTransformer.$go$private$estransforms$setContextFlag(tx, asyncContextHasLexicalThis$constant(), false);
        const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_7 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Transformer"));
        const __gotots_store_14 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_6 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_7, __gotots_argument_6);
        const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_8 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Transformer"));
        const __gotots_argument_7 = visited;
        const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_8 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer")));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_8, __gotots_argument_7, __gotots_argument_8);
        return visited;
    }
    static $go$private$estransforms$visitVariableDeclarationListWithCollidingNames(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined, hasReceiver: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        asyncTransformer.$go$private$estransforms$hoistVariableDeclarationList(tx, node);
        let variables = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_5 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
            const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_4);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            if (!(VariableDeclaration__from_ast.$storageOf(((Node__from_ast.AsVariableDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined)) {
                variables = variables.append(void 0, [decl]);
            }
        }
        if (variables.length === 0) {
            if (hasReceiver) {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
                let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (IsBindingPattern__from_ast(name)) {
                    const __gotots_store_156 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_157 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "Transformer"));
                    const __gotots_argument_158 = Node__from_ast.AsBindingPattern(name);
                    target = ConvertBindingPatternToAssignmentPattern__from_transformers(__gotots_argument_157, __gotots_argument_158);
                }
                else {
                    target = name;
                }
                const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_157, "Transformer")), target);
            }
            return void 0;
        }
        let expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_6 = variables;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
            const __gotots_range_value_9 = __gotots_range_6.get(__gotots_range_index_5);
            let variable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
            expressions = expressions.append(void 0, [asyncTransformer.$go$private$estransforms$transformInitializedVariable(tx, Node__from_ast.AsVariableDeclaration(variable))]);
        }
        const __gotots_store_158 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.InlineExpressions(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "Transformer")), expressions);
    }
    static $go$private$estransforms$visitVariableStatementInAsyncBody(tx: asyncTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let declList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList;
        if (asyncTransformer.$go$private$estransforms$isVariableDeclarationListWithCollidingName(tx, declList)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = asyncTransformer.$go$private$estransforms$visitVariableDeclarationListWithCollidingNames(tx, Node__from_ast.AsVariableDeclarationList(declList), false);
            if (!(expression === undefined)) {
                const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_77 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "NodeFactory"), expression);
            }
            return void 0;
        }
        const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "Transformer")), node);
    }
}
export function newAsyncTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let tx: asyncTransformer | undefined = new asyncTransformer(Transformer__from_transformers.$zero(), superAccessState.$zero(), new asyncContextFlags(0), void 0, lexicalArgumentsInfo.$zero(), void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return asyncTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
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
        return asyncTransformer.$go$private$estransforms$visitAsyncBodyNode(__gotots_receiver_3, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).asyncBodyVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_4, __gotots_argument_4);
    const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_6 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Transformer"));
    const __gotots_receiver_5 = tx;
    const __gotots_argument_5 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return asyncTransformer.$go$private$estransforms$visitFallback(__gotots_receiver_5, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fallbackNodeVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_6, __gotots_argument_5);
    return result;
}
export function assignmentTargetContainsSuperProperty(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPropertyAccessExpression$constant__from_ast():
        case KindElementAccessExpression$constant__from_ast(): {
            return Node__from_ast.$storageOf(((Node__from_ast.Expression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast();
            break;
        }
        case KindParenthesizedExpression$constant__from_ast(): {
            return assignmentTargetContainsSuperProperty(ParenthesizedExpression__from_ast.$storageOf(((Node__from_ast.AsParenthesizedExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            return ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((Node__from_ast.AsArrayLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, assignmentTargetContainsSuperProperty);
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            const __gotots_range_1 = NodeList__from_ast.$storageOf((((Node__from_ast.AsObjectLiteralExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
                let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                switch (Node__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindPropertyAssignment$constant__from_ast(): {
                        if (assignmentTargetContainsSuperProperty(PropertyAssignment__from_ast.$storageOf(((Node__from_ast.AsPropertyAssignment(prop) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
                            return true;
                        }
                        break;
                    }
                    case KindShorthandPropertyAssignment$constant__from_ast(): {
                        if (assignmentTargetContainsSuperProperty(ShorthandPropertyAssignment__from_ast.Name(Node__from_ast.AsShorthandPropertyAssignment(prop)))) {
                            return true;
                        }
                        break;
                    }
                    case KindSpreadAssignment$constant__from_ast(): {
                        if (assignmentTargetContainsSuperProperty((Node__from_ast.AsSpreadAssignment(prop) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
                            return true;
                        }
                        break;
                    }
                }
            }
            break;
        }
        case KindSpreadElement$constant__from_ast(): {
            return assignmentTargetContainsSuperProperty((Node__from_ast.AsSpreadElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            break;
        }
    }
    return false;
}
export function isUpdateExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsPrefixUnaryExpression__from_ast(node)) {
        let op = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator;
        return op === KindPlusPlusToken$constant__from_ast() || op === KindMinusMinusToken$constant__from_ast();
    }
    if (IsPostfixUnaryExpression__from_ast(node)) {
        let op = (Node__from_ast.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
        return op === KindPlusPlusToken$constant__from_ast() || op === KindMinusMinusToken$constant__from_ast();
    }
    return false;
}
export function isSimpleParameterList(params: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): bool {
    const __gotots_range_8 = params;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
        const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_7);
        let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
        let p: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(param);
        if (!(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) || !IsIdentifier__from_ast(ParameterDeclaration__from_ast.Name(p))) {
            return false;
        }
    }
    return true;
}
export function isNodeWithPossibleHoistedDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBlock$constant__from_ast():
        case KindVariableStatement$constant__from_ast():
        case KindWithStatement$constant__from_ast():
        case KindIfStatement$constant__from_ast():
        case KindSwitchStatement$constant__from_ast():
        case KindCaseBlock$constant__from_ast():
        case KindCaseClause$constant__from_ast():
        case KindDefaultClause$constant__from_ast():
        case KindLabeledStatement$constant__from_ast():
        case KindForStatement$constant__from_ast():
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast():
        case KindDoStatement$constant__from_ast():
        case KindWhileStatement$constant__from_ast():
        case KindTryStatement$constant__from_ast():
        case KindCatchClause$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
