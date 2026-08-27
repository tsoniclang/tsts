import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { ClassLikeBase as ClassLikeBase__from_ast, GetRightMostAssignedExpression as GetRightMostAssignedExpression__from_ast, IsFunctionLike as IsFunctionLike__from_ast, JSDocParameterOrPropertyTag as JSDocParameterOrPropertyTag__from_ast, JSDoc as JSDoc__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function findMatchingParameter(fun: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parameterTag: {
    value: JSDocParameterOrPropertyTag__from_ast;
} | undefined, jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
    tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined,
    bool
] {
    let tagIndex = -1;
    let paramCount = -1;
    const __gotots_range_0 = NodeList__from_ast.$storageOf(((JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsDoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocParameterTag$constant__from_ast()) {
            paramCount++;
            if (Node__from_ast.AsJSDocParameterOrPropertyTag(tag)
                ===
                    parameterTag) {
                tagIndex = paramCount;
                break;
            }
        }
    }
    const __gotots_range_1 = Node__from_ast.Parameters(fun);
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
        let parameterIndex = __gotots_range_value_1;
        let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
        if (Node__from_ast.$storageOf(((Node__from_ast.Name(parameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
            if (Node__from_ast.$storageOf(((JSDocParameterOrPropertyTag__from_ast.Name(parameterTag) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast() && ((Node__from_ast.Text(Node__from_ast.Name(parameter)) === Node__from_ast.Text(JSDocParameterOrPropertyTag__from_ast.Name(parameterTag))) || (parameterIndex === tagIndex && Node__from_ast.Text(JSDocParameterOrPropertyTag__from_ast.Name(parameterTag)).length === 0))) {
                return [Node__from_ast.AsParameterDeclaration(parameter), true];
            }
        }
        else if (parameterIndex === tagIndex) {
            return [Node__from_ast.AsParameterDeclaration(parameter), true];
        }
    }
    return [void 0, false];
}
export function skipSatisfiesExpressions(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (; !(node === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSatisfiesExpression$constant__from_ast();) {
        node = Node__from_ast.Expression(node);
    }
    return node;
}
export function getFunctionLikeHost(host: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let fun: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = host;
    switch (Node__from_ast.$storageOf(((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableStatement$constant__from_ast(): {
            {
                let nodes = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(host) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                if (nodes.length !== 0) {
                    fun = Node__from_ast.Initializer(nodes.get(0));
                }
            }
            break;
        }
        case KindPropertyAssignment$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast(): {
            fun = Node__from_ast.Initializer(host);
            break;
        }
        case KindExportAssignment$constant__from_ast():
        case KindReturnStatement$constant__from_ast(): {
            fun = Node__from_ast.Expression(host);
            break;
        }
        case KindExpressionStatement$constant__from_ast(): {
            fun = GetRightMostAssignedExpression__from_ast(Node__from_ast.Expression(host));
            break;
        }
    }
    fun = skipSatisfiesExpressions(fun);
    if (IsFunctionLike__from_ast(fun)) {
        return fun;
    }
    return void 0;
}
export function getClassLikeData(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ClassLikeBase__from_ast> | undefined {
    let __go_class: tsonicTypeScriptRuntime.Location<ClassLikeBase__from_ast> | undefined = void 0;
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassDeclaration$constant__from_ast(): {
            const __gotots_store_0 = (Node__from_ast.AsClassDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __go_class = ClassLikeBase__from_ast.ClassLikeData(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "ClassLikeBase"));
            break;
        }
        case KindClassExpression$constant__from_ast(): {
            const __gotots_store_1 = (Node__from_ast.AsClassExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __go_class = ClassLikeBase__from_ast.ClassLikeData(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "ClassLikeBase"));
            break;
        }
    }
    return __go_class;
}
