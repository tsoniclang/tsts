import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsIdentifier as IsIdentifier__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { EmitContext as EmitContext__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function isClassThisAssignmentBlock(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsClassStaticBlockDeclaration__from_ast(node)) {
        let n: {
            value: ClassStaticBlockDeclaration__from_ast;
        } | undefined = Node__from_ast.AsClassStaticBlockDeclaration(node);
        let body: tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined = Node__from_ast.AsBlock((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body);
        if (NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1) {
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((Block__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
            if (IsExpressionStatement__from_ast(statement)) {
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(statement);
                if (IsAssignmentExpression__from_ast(expression, true)) {
                    let binary: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined = Node__from_ast.AsBinaryExpression(expression);
                    return IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) &&
                        tsonicTypeScriptRuntime.sameLocation(EmitContext__from_printer.ClassThis(emitContext, node), BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((binary ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast();
                }
            }
        }
    }
    return false;
}
