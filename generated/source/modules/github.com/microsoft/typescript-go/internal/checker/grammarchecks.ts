import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool } from "@gotots/runtime/scalars.js";
import { IsStringOrNumericLiteralLike as IsStringOrNumericLiteralLike__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, Node as Node__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function getIdentifierFromEntityNameExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast(): {
            return node;
            break;
        }
        case KindPropertyAccessExpression$constant__from_ast(): {
            return PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(node));
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function isInitializerStringOrNumberLiteralExpression(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsStringOrNumericLiteralLike__from_ast(expr) || Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPrefixUnaryExpression$constant__from_ast() && PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindMinusToken$constant__from_ast() && Node__from_ast.$storageOf(((PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNumericLiteral$constant__from_ast();
}
export function isInitializerBigIntLiteralExpression(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBigIntLiteral$constant__from_ast()) {
        return true;
    }
    if (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPrefixUnaryExpression$constant__from_ast()) {
        let unaryExpr: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined = Node__from_ast.AsPrefixUnaryExpression(expr);
        return PrefixUnaryExpression__from_ast.$storageOf(((unaryExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindMinusToken$constant__from_ast() && Node__from_ast.$storageOf(((PrefixUnaryExpression__from_ast.$storageOf(((unaryExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBigIntLiteral$constant__from_ast();
    }
    return false;
}
