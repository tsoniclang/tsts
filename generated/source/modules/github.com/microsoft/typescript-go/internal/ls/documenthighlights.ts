import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CaseBlock as CaseBlock__from_ast, FindAncestorResult as FindAncestorResult__from_ast, Kind as Kind__from_ast, ModifierFlags as ModifierFlags__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast, SwitchStatement as SwitchStatement__from_ast, TryStatement as TryStatement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { FindAncestorFalse$constant as FindAncestorFalse$constant__from_ast, FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestorTrue$constant as FindAncestorTrue$constant__from_ast, FindAncestor as FindAncestor__from_ast, ForEachReturnStatement as ForEachReturnStatement__from_ast, GetContainingFunction as GetContainingFunction__from_ast, IfStatement as IfStatement__from_ast, IsAwaitExpression as IsAwaitExpression__from_ast, IsBreakOrContinueStatement as IsBreakOrContinueStatement__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassLike as IsClassLike__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsFunctionBlock as IsFunctionBlock__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIfStatement as IsIfStatement__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsLabeledStatement as IsLabeledStatement__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsThrowStatement as IsThrowStatement__from_ast, IsTryStatement as IsTryStatement__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeNode as IsTypeNode__from_ast, IsYieldExpression as IsYieldExpression__from_ast, KindAsyncKeyword$constant as KindAsyncKeyword$constant__from_ast, KindAwaitKeyword$constant as KindAwaitKeyword$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBreakKeyword$constant as KindBreakKeyword$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCaseKeyword$constant as KindCaseKeyword$constant__from_ast, KindCatchKeyword$constant as KindCatchKeyword$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindContinueKeyword$constant as KindContinueKeyword$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindDoKeyword$constant as KindDoKeyword$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindElseKeyword$constant as KindElseKeyword$constant__from_ast, KindFinallyKeyword$constant as KindFinallyKeyword$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForKeyword$constant as KindForKeyword$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindIfKeyword$constant as KindIfKeyword$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindReturnKeyword$constant as KindReturnKeyword$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSwitchKeyword$constant as KindSwitchKeyword$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindThrowKeyword$constant as KindThrowKeyword$constant__from_ast, KindTryKeyword$constant as KindTryKeyword$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindWhileKeyword$constant as KindWhileKeyword$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindYieldKeyword$constant as KindYieldKeyword$constant__from_ast, ModifierFlagsAbstract$constant as ModifierFlagsAbstract$constant__from_ast, ModifierToFlag as ModifierToFlag__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, StatementBase as StatementBase__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { GetFirstToken as GetFirstToken__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { flatMapChildren$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/flatMapChildren.js";
import { getChildrenFromNonJSDocNode } from "./utilities.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function getIfElseKeywords(ifStatement: tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    for (; IsIfStatement__from_ast((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).StatementBase)).NodeBase)).NodeDefault)).Node)).Parent);) {
        let parentingIf: tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined = Node__from_ast.AsIfStatement((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                        IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).StatementBase)).NodeBase)).NodeDefault)).Node)).Parent);
        let elseStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfStatement__from_ast.$storageOf(((parentingIf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement;
        const __gotots_equal_operand_0 = elseStatement;
        const __gotots_store_1 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).StatementBase)).NodeBase));
        if (!tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)))) {
            break;
        }
        ifStatement = parentingIf;
    }
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    for (;;) {
        const __gotots_store_2 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_3 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_4 = sourceFile;
        let children = getChildrenFromNonJSDocNode(__gotots_argument_3, __gotots_argument_4);
        if (children.length > 0 && Node__from_ast.$storageOf(((children.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIfKeyword$constant__from_ast()) {
            keywords = keywords.append(void 0, [children.get(0)]);
        }
        for (let i = children.length - 1; i >= 0; i--) {
            if (Node__from_ast.$storageOf(((children.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindElseKeyword$constant__from_ast()) {
                keywords = keywords.append(void 0, [children.get(i)]);
                break;
            }
        }
        let elseStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement;
        if (elseStatement === undefined || !IsIfStatement__from_ast(elseStatement)) {
            break;
        }
        ifStatement = Node__from_ast.AsIfStatement(elseStatement);
    }
    return keywords;
}
export function getReturnOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let funcNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, IsFunctionLike__from_ast);
    if (funcNode === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(funcNode);
    if (!(body === undefined)) {
        ForEachReturnStatement__from_ast(body, (ret: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            let keyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(ret, KindReturnKeyword$constant__from_ast(), sourceFile);
            if (!(keyword === undefined)) {
                keywords = keywords.append(void 0, [keyword]);
            }
            return false;
        });
        let throwStatements = aggregateOwnedThrowStatements(body, sourceFile);
        const __gotots_range_0 = throwStatements;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let __go_throw: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            let keyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(__go_throw, KindThrowKeyword$constant__from_ast(), sourceFile);
            if (!(keyword === undefined)) {
                keywords = keywords.append(void 0, [keyword]);
            }
        }
    }
    return keywords;
}
export function aggregateOwnedThrowStatements(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsThrowStatement__from_ast(node)) {
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([node]);
    }
    if (IsTryStatement__from_ast(node)) {
        let statement: {
            value: TryStatement__from_ast;
        } | undefined = Node__from_ast.AsTryStatement(node);
        let tryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock;
        let catchClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause;
        let finallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock;
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(catchClause === undefined)) {
            result = aggregateOwnedThrowStatements(catchClause, sourceFile);
        }
        else if (!(tryBlock === undefined)) {
            result = aggregateOwnedThrowStatements(tryBlock, sourceFile);
        }
        if (!(finallyBlock === undefined)) {
            result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, aggregateOwnedThrowStatements(finallyBlock, sourceFile), void 0);
        }
        return result;
    }
    if (IsFunctionLike__from_ast(node)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    return flatMapChildren$PointerTo_Named_ast$Node(node, sourceFile, aggregateOwnedThrowStatements);
}
export function flatMapChildren$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, cb: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<GoContainerStorage<T>>) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    let result = RuntimeSlice.nil<GoContainerStorage<T>>();
    Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        const __gotots_callee_1 = cb;
        const __gotots_argument_5 = child;
        const __gotots_argument_6 = sourceFile;
        let value = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6);
        if (!value.isNil()) {
            const __gotots_slice_build_0 = result;
            const __gotots_slice_build_1 = value;
            let __gotots_slice_build_2 = __gotots_slice_build_1;
            if (__gotots_slice_build_1.length > 0) {
                __gotots_slice_build_2 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_1.length, null);
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_1.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_2.set(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_1.get(__gotots_slice_build_5))));
                }
            }
            const __gotots_slice_build_4 = __gotots_slice_build_0.length + __gotots_slice_build_2.length;
            let __gotots_slice_build_3 = __gotots_slice_build_0;
            if (__gotots_slice_build_4 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_3 = __gotots_slice_build_0.$withLength(__gotots_slice_build_4);
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                }
            }
            else {
                __gotots_slice_build_3 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_4));
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_0.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_5))));
                }
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                }
                for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.$initialize(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                }
            }
            result = __gotots_slice_build_3;
        }
        return false;
    }));
    return result;
}
export function getThrowOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let owner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getThrowStatementOwner(node);
    if (owner === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let throwStatements = aggregateOwnedThrowStatements(owner, sourceFile);
    const __gotots_range_1 = throwStatements;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let __go_throw: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        let keyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(__go_throw, KindThrowKeyword$constant__from_ast(), sourceFile);
        if (!(keyword === undefined)) {
            keywords = keywords.append(void 0, [keyword]);
        }
    }
    if (IsFunctionBlock__from_ast(owner)) {
        ForEachReturnStatement__from_ast(owner, (ret: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            let keyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(ret, KindReturnKeyword$constant__from_ast(), sourceFile);
            if (!(keyword === undefined)) {
                keywords = keywords.append(void 0, [keyword]);
            }
            return false;
        });
    }
    return keywords;
}
export function getThrowStatementOwner(throwStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = throwStatement;
    for (; !(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined);) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (IsFunctionBlock__from_ast(parent) || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
            return parent;
        }
        if (IsTryStatement__from_ast(parent)) {
            let tryStatement: {
                value: TryStatement__from_ast;
            } | undefined = Node__from_ast.AsTryStatement(parent);
            if (tsonicTypeScriptRuntime.sameLocation((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock, child)
                && !((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause === undefined)) {
                return child;
            }
        }
        child = parent;
    }
    return void 0;
}
export function getTryCatchFinallyOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let tryStatement: {
        value: TryStatement__from_ast;
    } | undefined = Node__from_ast.AsTryStatement(node);
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(node, sourceFile);
    if (!(token === undefined) && Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTryKeyword$constant__from_ast()) {
        keywords = keywords.append(void 0, [token]);
    }
    if (!((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CatchClause === undefined)) {
        {
            let catchToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindCatchKeyword$constant__from_ast(), sourceFile);
            if (!(catchToken === undefined)) {
                keywords = keywords.append(void 0, [catchToken]);
            }
        }
    }
    if (!((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock === undefined)) {
        {
            let finallyKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindFinallyKeyword$constant__from_ast(), sourceFile);
            if (!(finallyKeyword === undefined)) {
                keywords = keywords.append(void 0, [finallyKeyword]);
            }
        }
    }
    return keywords;
}
export function getSwitchCaseDefaultOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let switchStatement: {
        value: SwitchStatement__from_ast;
    } | undefined = Node__from_ast.AsSwitchStatement(node);
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(node, sourceFile);
    if (Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSwitchKeyword$constant__from_ast()) {
        keywords = keywords.append(void 0, [token]);
    }
    let clauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (Node__from_ast.AsCaseBlock((switchStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CaseBlock) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clauses;
    const __gotots_range_2 = NodeList__from_ast.$storageOf(((clauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let clause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
        let clauseToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil((void Node__from_ast.AsNode,
            clause), sourceFile);
        if (Node__from_ast.$storageOf(((clauseToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCaseKeyword$constant__from_ast() || Node__from_ast.$storageOf(((clauseToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast()) {
            keywords = keywords.append(void 0, [clauseToken]);
        }
        let breakAndContinueStatements = aggregateAllBreakAndContinueStatements(clause, sourceFile);
        const __gotots_range_3 = breakAndContinueStatements;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            let __gotots_logical_result_0 = Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBreakStatement$constant__from_ast();
            if (__gotots_logical_result_0) {
                const __gotots_store_0 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((switchStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_1 = statement;
                __gotots_logical_result_0 = ownsBreakOrContinueStatement(__gotots_argument_0, __gotots_argument_1);
            }
            if (__gotots_logical_result_0) {
                keywords = keywords.append(void 0, [GetFirstToken__from_lsutil(statement, sourceFile)]);
            }
        }
    }
    return keywords;
}
export function aggregateAllBreakAndContinueStatements(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsBreakOrContinueStatement__from_ast(node)) {
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([node]);
    }
    if (IsFunctionLike__from_ast(node)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    return flatMapChildren$PointerTo_Named_ast$Node(node, sourceFile, aggregateAllBreakAndContinueStatements);
}
export function ownsBreakOrContinueStatement(owner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let actualOwner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getBreakOrContinueOwner(statement);
    if (actualOwner === undefined) {
        return false;
    }
    return tsonicTypeScriptRuntime.sameLocation(actualOwner, owner);
}
export function getBreakOrContinueOwner(statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FindAncestorOrQuit__from_ast(statement, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        {
            const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 = __gotots_switch_tag_0 === KindSwitchStatement$constant__from_ast();
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindForStatement$constant__from_ast();
                }
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindForInStatement$constant__from_ast();
                }
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindForOfStatement$constant__from_ast();
                }
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindWhileStatement$constant__from_ast();
                }
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindDoStatement$constant__from_ast();
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                __gotots_switch_selection_0 = 2;
            }
            __gotots_control_target_0: {
                if (__gotots_switch_selection_0 === 0) {
                    if (Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindContinueStatement$constant__from_ast()) {
                        return FindAncestorFalse$constant__from_ast();
                    }
                    __gotots_switch_selection_0 = 1;
                }
                if (__gotots_switch_selection_0 === 1) {
                    if (Node__from_ast.Label(statement) === undefined || isLabeledBy(node, Node__from_ast.Text(Node__from_ast.Label(statement)))) {
                        return FindAncestorTrue$constant__from_ast();
                    }
                    return FindAncestorFalse$constant__from_ast();
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 2) {
                    if (IsFunctionLike__from_ast(node)) {
                        return FindAncestorQuit$constant__from_ast();
                    }
                    return FindAncestorFalse$constant__from_ast();
                    break __gotots_control_target_0;
                }
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    });
}
export function isLabeledBy(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, labelName: gostring): bool {
    return !(FindAncestorOrQuit__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (owner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (!IsLabeledStatement__from_ast(owner)) {
            return FindAncestorQuit$constant__from_ast();
        }
        if (Node__from_ast.Text(Node__from_ast.Label(owner)) === labelName) {
            return FindAncestorTrue$constant__from_ast();
        }
        return FindAncestorFalse$constant__from_ast();
    }) === undefined);
}
export function getBreakOrContinueStatementOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    {
        let owner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getBreakOrContinueOwner(node);
        if (!(owner === undefined)) {
            switch (Node__from_ast.$storageOf(((owner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindForStatement$constant__from_ast():
                case KindForInStatement$constant__from_ast():
                case KindForOfStatement$constant__from_ast():
                case KindDoStatement$constant__from_ast():
                case KindWhileStatement$constant__from_ast(): {
                    return getLoopBreakContinueOccurrences(owner, sourceFile);
                    break;
                }
                case KindSwitchStatement$constant__from_ast(): {
                    return getSwitchCaseDefaultOccurrences(owner, sourceFile);
                    break;
                }
            }
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
export function getLoopBreakContinueOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(node, sourceFile);
    if (Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForKeyword$constant__from_ast() || Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDoKeyword$constant__from_ast() || Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindWhileKeyword$constant__from_ast()) {
        keywords = keywords.append(void 0, [token]);
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDoStatement$constant__from_ast()) {
            let loopTokens = getChildrenFromNonJSDocNode(node, sourceFile);
            for (let i = loopTokens.length - 1; i >= 0; i--) {
                if (Node__from_ast.$storageOf(((loopTokens.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindWhileKeyword$constant__from_ast()) {
                    keywords = keywords.append(void 0, [loopTokens.get(i)]);
                    break;
                }
            }
        }
    }
    let breakAndContinueStatements = aggregateAllBreakAndContinueStatements(node, sourceFile);
    const __gotots_range_4 = breakAndContinueStatements;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
        let token__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(statement, sourceFile);
        if (ownsBreakOrContinueStatement(node, statement) && (Node__from_ast.$storageOf(((token__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBreakKeyword$constant__from_ast() || Node__from_ast.$storageOf(((token__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindContinueKeyword$constant__from_ast())) {
            keywords = keywords.append(void 0, [token__shadow_1]);
        }
    }
    return keywords;
}
export function getAsyncAndAwaitOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let fun: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetContainingFunction__from_ast(node);
    if (fun === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_5 = Node__from_ast.ModifierNodes(fun);
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let modifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        if (Node__from_ast.$storageOf(((modifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsyncKeyword$constant__from_ast()) {
            keywords = keywords.append(void 0, [modifier]);
        }
    }
    Node__from_ast.ForEachChild(fun, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        traverseWithoutCrossingFunction(child, sourceFile, (child__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (IsAwaitExpression__from_ast(child__shadow_1)) {
                let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(child__shadow_1, sourceFile);
                if (Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAwaitKeyword$constant__from_ast()) {
                    keywords = keywords.append(void 0, [token]);
                }
            }
        });
        return false;
    }));
    return keywords;
}
export function getYieldOccurrences(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let parentFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, IsFunctionLike__from_ast);
    if (parentFunc === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let keywords = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    Node__from_ast.ForEachChild(parentFunc, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        traverseWithoutCrossingFunction(child, sourceFile, (child__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (IsYieldExpression__from_ast(child__shadow_1)) {
                let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstToken__from_lsutil(child__shadow_1, sourceFile);
                if (Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindYieldKeyword$constant__from_ast()) {
                    keywords = keywords.append(void 0, [token]);
                }
            }
        });
        return false;
    }));
    return keywords;
}
export function traverseWithoutCrossingFunction(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, cb: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
    const __gotots_callee_0 = cb;
    const __gotots_argument_2 = node;
    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
    if (!IsFunctionLike__from_ast(node) && !IsClassLike__from_ast(node) && !IsInterfaceDeclaration__from_ast(node) && !IsModuleDeclaration__from_ast(node) && !IsTypeAliasDeclaration__from_ast(node) && !IsTypeNode__from_ast(node)) {
        Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            traverseWithoutCrossingFunction(child, sourceFile, cb);
            return false;
        }));
    }
}
export function getModifierOccurrences(kind: Kind__from_ast, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let nodesToSearch = getNodesToSearchForModifier(node, ModifierToFlag__from_ast(kind));
    const __gotots_range_6 = nodesToSearch;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
        let modifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findModifier(n, kind);
        if (!(modifier === undefined)) {
            result = result.append(void 0, [modifier]);
        }
    }
    return result;
}
export function getNodesToSearchForModifier(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifierFlag: ModifierFlags__from_ast): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (container === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    switch (Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindModuleBlock$constant__from_ast():
        case KindSourceFile$constant__from_ast():
        case KindBlock$constant__from_ast():
        case KindCaseClause$constant__from_ast():
        case KindDefaultClause$constant__from_ast(): {
            if (!(((modifierFlag & ModifierFlagsAbstract$constant__from_ast()) >>> 0) === 0) && IsClassDeclaration__from_ast(declaration)) {
                return goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Node__from_ast.Members(declaration), void 0).append(void 0, [declaration]);
            }
            else {
                return goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Node__from_ast.Statements(container), void 0);
            }
            break;
        }
        case KindConstructor$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast(): {
            result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Node__from_ast.Parameters(container), void 0);
            if (IsClassLike__from_ast(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Node__from_ast.Members(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), void 0);
            }
            return result;
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindTypeLiteral$constant__from_ast(): {
            let nodes = Node__from_ast.Members(container);
            result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, nodes, void 0);
            if (!(((modifierFlag & (15)) >>> 0) === 0)) {
                let __go_constructor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                const __gotots_range_7 = nodes;
                for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                    const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
                    let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                    if (IsConstructorDeclaration__from_ast(member)) {
                        __go_constructor = member;
                        break;
                    }
                }
                if (!(__go_constructor === undefined)) {
                    result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(result, Node__from_ast.Parameters(__go_constructor), void 0);
                }
            }
            else if (!(((modifierFlag & ModifierFlagsAbstract$constant__from_ast()) >>> 0) === 0)) {
                result = result.append(void 0, [container]);
            }
            return result;
            break;
        }
        default: {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            break;
        }
    }
}
export function findModifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_range_8 = Node__from_ast.ModifierNodes(node);
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
        let modifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
        if (Node__from_ast.$storageOf(((modifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === kind) {
            return modifier;
        }
    }
    return void 0;
}
