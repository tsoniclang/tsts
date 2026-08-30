import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { BindingPattern as BindingPattern__from_ast, ForStatement as ForStatement__from_ast, ImportAttribute as ImportAttribute__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, Kind as Kind__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, SourceFile as SourceFile__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TryStatement as TryStatement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { BindingElement as BindingElement__from_ast, CanHaveModifiers as CanHaveModifiers__from_ast, ConditionalExpression as ConditionalExpression__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsDecorator as IsDecorator__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsIdentifier as IsIdentifier__from_ast, IsKeywordKind as IsKeywordKind__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsNumericLiteral as IsNumericLiteral__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsSuperCall as IsSuperCall__from_ast, IsTryStatement as IsTryStatement__from_ast, KindAmpersandAmpersandEqualsToken$constant as KindAmpersandAmpersandEqualsToken$constant__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindAmpersandEqualsToken$constant as KindAmpersandEqualsToken$constant__from_ast, KindAmpersandToken$constant as KindAmpersandToken$constant__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindAsteriskAsteriskEqualsToken$constant as KindAsteriskAsteriskEqualsToken$constant__from_ast, KindAsteriskAsteriskToken$constant as KindAsteriskAsteriskToken$constant__from_ast, KindAsteriskEqualsToken$constant as KindAsteriskEqualsToken$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindBarBarEqualsToken$constant as KindBarBarEqualsToken$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBarEqualsToken$constant as KindBarEqualsToken$constant__from_ast, KindBarToken$constant as KindBarToken$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCaretEqualsToken$constant as KindCaretEqualsToken$constant__from_ast, KindCaretToken$constant as KindCaretToken$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportAttribute$constant as KindImportAttribute$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxSpreadAttribute$constant as KindJsxSpreadAttribute$constant__from_ast, KindLessThanLessThanEqualsToken$constant as KindLessThanLessThanEqualsToken$constant__from_ast, KindLessThanLessThanToken$constant as KindLessThanLessThanToken$constant__from_ast, KindMinusEqualsToken$constant as KindMinusEqualsToken$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPartiallyEmittedExpression$constant as KindPartiallyEmittedExpression$constant__from_ast, KindPercentEqualsToken$constant as KindPercentEqualsToken$constant__from_ast, KindPercentToken$constant as KindPercentToken$constant__from_ast, KindPlusEqualsToken$constant as KindPlusEqualsToken$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionQuestionEqualsToken$constant as KindQuestionQuestionEqualsToken$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSlashEqualsToken$constant as KindSlashEqualsToken$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindTypeOfExpression$constant as KindTypeOfExpression$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PositionIsSynthesized as PositionIsSynthesized__from_ast, SkipParentheses as SkipParentheses__from_ast, VariableDeclaration as VariableDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EFExportName$constant as EFExportName$constant__from_printer, EFHelperName$constant as EFHelperName$constant__from_printer, EFLocalName$constant as EFLocalName$constant__from_printer, EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetECMALineOfPosition as GetECMALineOfPosition__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { FindLast$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindLast.js";
import { LastOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { Reverse$SliceOf_int$int } from "../../../../../../support/generics/concretizations/slices/Reverse.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
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
export function IsGeneratedIdentifier(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return EmitContext__from_printer.HasAutoGenerateInfo(emitContext, name);
}
export function IsHelperName(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !((EmitContext__from_printer.EmitFlags(emitContext, name) & EFHelperName$constant__from_printer()) >>> 0 === 0);
}
export function IsLocalName(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !((EmitContext__from_printer.EmitFlags(emitContext, name) & EFLocalName$constant__from_printer()) >>> 0 === 0);
}
export function IsExportName(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !((EmitContext__from_printer.EmitFlags(emitContext, name) & EFExportName$constant__from_printer()) >>> 0 === 0);
}
export function IsIdentifierReference(name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBinaryExpression$constant__from_ast():
        case KindPrefixUnaryExpression$constant__from_ast():
        case KindPostfixUnaryExpression$constant__from_ast():
        case KindYieldExpression$constant__from_ast():
        case KindAsExpression$constant__from_ast():
        case KindSatisfiesExpression$constant__from_ast():
        case KindElementAccessExpression$constant__from_ast():
        case KindNonNullExpression$constant__from_ast():
        case KindSpreadElement$constant__from_ast():
        case KindSpreadAssignment$constant__from_ast():
        case KindParenthesizedExpression$constant__from_ast():
        case KindArrayLiteralExpression$constant__from_ast():
        case KindDeleteExpression$constant__from_ast():
        case KindTypeOfExpression$constant__from_ast():
        case KindVoidExpression$constant__from_ast():
        case KindAwaitExpression$constant__from_ast():
        case KindTypeAssertionExpression$constant__from_ast():
        case KindExpressionWithTypeArguments$constant__from_ast():
        case KindJsxSelfClosingElement$constant__from_ast():
        case KindJsxSpreadAttribute$constant__from_ast():
        case KindJsxExpression$constant__from_ast():
        case KindPartiallyEmittedExpression$constant__from_ast(): {
            return true;
            break;
        }
        case KindComputedPropertyName$constant__from_ast():
        case KindDecorator$constant__from_ast():
        case KindIfStatement$constant__from_ast():
        case KindDoStatement$constant__from_ast():
        case KindWhileStatement$constant__from_ast():
        case KindWithStatement$constant__from_ast():
        case KindReturnStatement$constant__from_ast():
        case KindSwitchStatement$constant__from_ast():
        case KindCaseClause$constant__from_ast():
        case KindThrowStatement$constant__from_ast():
        case KindExpressionStatement$constant__from_ast():
        case KindExportAssignment$constant__from_ast():
        case KindPropertyAccessExpression$constant__from_ast():
        case KindTemplateSpan$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(parent), name);
            break;
        }
        case KindVariableDeclaration$constant__from_ast():
        case KindParameter$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindEnumMember$constant__from_ast():
        case KindJsxAttribute$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(parent), name);
            break;
        }
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsShorthandPropertyAssignment(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer, name);
            break;
        }
        case KindForStatement$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(parent), name)
                ||
                    tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsForStatement(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Condition, name) ||
                tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsForStatement(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incrementor, name);
            break;
        }
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(parent), name)
                ||
                    tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(parent), name);
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsImportEqualsDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, name);
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Body(parent), name);
            break;
        }
        case KindConditionalExpression$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition, name)
                ||
                    tsonicTypeScriptRuntime.sameLocation(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue, name) ||
                tsonicTypeScriptRuntime.sameLocation(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse, name);
            break;
        }
        case KindCallExpression$constant__from_ast():
        case KindNewExpression$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Expression(parent), name)
                || Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.Arguments(parent), name);
            break;
        }
        case KindTaggedTemplateExpression$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsTaggedTemplateExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag, name);
            break;
        }
        case KindImportAttribute$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsImportAttribute(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value, name);
            break;
        }
        case KindJsxOpeningElement$constant__from_ast():
        case KindJsxClosingElement$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TagName(parent), name);
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function convertBindingElementToArrayAssignmentElement(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: {
    value: BindingElement__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (BindingElement__from_ast.Name(element) === undefined) {
        const __gotots_store_11 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let elision: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewOmittedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"));
        const __gotots_receiver_6 = emitContext;
        const __gotots_argument_13 = elision;
        const __gotots_store_12 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_14 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_12, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_6, __gotots_argument_13, __gotots_argument_14);
        const __gotots_receiver_7 = emitContext;
        const __gotots_argument_15 = elision;
        const __gotots_store_13 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_16 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_13, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_7, __gotots_argument_15, __gotots_argument_16);
        return elision;
    }
    if (!((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) {
        const __gotots_store_14 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let spread: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSpreadElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), BindingElement__from_ast.Name(element));
        const __gotots_receiver_8 = emitContext;
        const __gotots_argument_17 = spread;
        const __gotots_store_15 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_18 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_15, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_8, __gotots_argument_17, __gotots_argument_18);
        const __gotots_receiver_9 = emitContext;
        const __gotots_argument_19 = spread;
        const __gotots_store_16 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_20 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_16, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_9, __gotots_argument_19, __gotots_argument_20);
        return spread;
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = convertBindingNameToAssignmentElementTarget(emitContext, BindingElement__from_ast.Name(element));
    if (!((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) {
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, expression, (element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_receiver_10 = emitContext;
        const __gotots_argument_21 = assignment;
        const __gotots_store_17 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_22 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_17, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_10, __gotots_argument_21, __gotots_argument_22);
        const __gotots_receiver_11 = emitContext;
        const __gotots_argument_23 = assignment;
        const __gotots_store_18 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_24 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_18, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_11, __gotots_argument_23, __gotots_argument_24);
        return assignment;
    }
    return expression;
}
export function convertBindingElementToObjectAssignmentElement(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: {
    value: BindingElement__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) {
        const __gotots_store_19 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let spread: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSpreadAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), BindingElement__from_ast.Name(element));
        const __gotots_receiver_12 = emitContext;
        const __gotots_argument_25 = spread;
        const __gotots_store_20 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_26 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_20, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_12, __gotots_argument_25, __gotots_argument_26);
        const __gotots_receiver_13 = emitContext;
        const __gotots_argument_27 = spread;
        const __gotots_store_21 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_28 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_21, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_13, __gotots_argument_27, __gotots_argument_28);
        return spread;
    }
    if (!((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName === undefined)) {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = convertBindingNameToAssignmentElementTarget(emitContext, BindingElement__from_ast.Name(element));
        if (!((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) {
            expression = NodeFactory__from_printer.NewAssignmentExpression((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, expression, (element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        }
        const __gotots_store_22 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let assignment__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), void 0, (element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName, void 0, void 0, expression);
        const __gotots_receiver_14 = emitContext;
        const __gotots_argument_29 = assignment__shadow_1;
        const __gotots_store_23 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_30 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_23, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_14, __gotots_argument_29, __gotots_argument_30);
        const __gotots_receiver_15 = emitContext;
        const __gotots_argument_31 = assignment__shadow_1;
        const __gotots_store_24 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_32 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_24, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_15, __gotots_argument_31, __gotots_argument_32);
        return assignment__shadow_1;
    }
    let equalsToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (!((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) {
        const __gotots_store_25 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        equalsToken = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), KindEqualsToken$constant__from_ast());
    }
    const __gotots_store_26 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewShorthandPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), void 0, BindingElement__from_ast.Name(element), void 0, void 0, equalsToken, (element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
    const __gotots_receiver_16 = emitContext;
    const __gotots_argument_33 = assignment;
    const __gotots_store_27 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_34 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_27, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.SetOriginal(__gotots_receiver_16, __gotots_argument_33, __gotots_argument_34);
    const __gotots_receiver_17 = emitContext;
    const __gotots_argument_35 = assignment;
    const __gotots_store_28 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_36 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_28, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_17, __gotots_argument_35, __gotots_argument_36);
    return assignment;
}
export function ConvertBindingPatternToAssignmentPattern(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: {
    value: BindingPattern__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch ((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Kind) {
        case KindArrayBindingPattern$constant__from_ast(): {
            return convertBindingElementToArrayAssignmentPattern(emitContext, element);
            break;
        }
        case KindObjectBindingPattern$constant__from_ast(): {
            return convertBindingElementToObjectAssignmentPattern(emitContext, element);
            break;
        }
        default: {
            const __gotots_argument_4 = new $goInterfaceAdapter$string("Unknown binding pattern");
            GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
            break;
        }
    }
}
export function convertBindingElementToObjectAssignmentPattern(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: {
    value: BindingPattern__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let properties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_1 = NodeList__from_ast.$storageOf((((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let element__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        properties = properties.append(void 0, [convertBindingElementToObjectAssignmentElement(emitContext, Node__from_ast.AsBindingElement(element__shadow_1))]);
    }
    const __gotots_store_7 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let propertyList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory"), properties);
    NodeList__from_ast.$storageOf(((propertyList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
    const __gotots_store_8 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let __go_object: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), propertyList, false);
    const __gotots_receiver_4 = emitContext;
    const __gotots_argument_9 = __go_object;
    const __gotots_store_9 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_10 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_9, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.SetOriginal(__gotots_receiver_4, __gotots_argument_9, __gotots_argument_10);
    const __gotots_receiver_5 = emitContext;
    const __gotots_argument_11 = __go_object;
    const __gotots_store_10 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_12 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_10, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_5, __gotots_argument_11, __gotots_argument_12);
    return __go_object;
}
export function convertBindingElementToArrayAssignmentPattern(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: {
    value: BindingPattern__from_ast;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let elements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_0 = NodeList__from_ast.$storageOf((((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let element__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        elements = elements.append(void 0, [convertBindingElementToArrayAssignmentElement(emitContext, Node__from_ast.AsBindingElement(element__shadow_1))]);
    }
    const __gotots_store_3 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let elementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), elements);
    NodeList__from_ast.$storageOf(((elementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf((((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
    const __gotots_store_4 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let __go_object: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrayLiteralExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), elementList, false);
    const __gotots_receiver_2 = emitContext;
    const __gotots_argument_5 = __go_object;
    const __gotots_store_5 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_6 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_5, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.SetOriginal(__gotots_receiver_2, __gotots_argument_5, __gotots_argument_6);
    const __gotots_receiver_3 = emitContext;
    const __gotots_argument_7 = __go_object;
    const __gotots_store_6 = NodeBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
    const __gotots_argument_8 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_6, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_3, __gotots_argument_7, __gotots_argument_8);
    return __go_object;
}
export function convertBindingNameToAssignmentElementTarget(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsBindingPattern__from_ast(element)) {
        return ConvertBindingPatternToAssignmentPattern(emitContext, Node__from_ast.AsBindingPattern(element));
    }
    return element;
}
export function ConvertVariableDeclarationToAssignmentExpression(emitContext: {
    value: EmitContext__from_printer;
} | undefined, element: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (VariableDeclaration__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer === undefined) {
        return void 0;
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = convertBindingNameToAssignmentElementTarget(emitContext, VariableDeclaration__from_ast.Name(element));
    let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, expression, VariableDeclaration__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
    const __gotots_receiver_0 = emitContext;
    const __gotots_argument_0 = assignment;
    const __gotots_store_0 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
        VariableDeclaration__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
    const __gotots_argument_1 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.SetOriginal(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1);
    const __gotots_receiver_1 = emitContext;
    const __gotots_argument_2 = assignment;
    const __gotots_store_1 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
        VariableDeclaration__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
    const __gotots_argument_3 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_1, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    EmitContext__from_printer.AssignCommentAndSourceMapRanges(__gotots_receiver_1, __gotots_argument_2, __gotots_argument_3);
    return assignment;
}
export function SingleOrMany(nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, factory: {
    value: NodeFactory__from_printer;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (nodes.isNil()) {
        return void 0;
    }
    if (nodes.length === 1) {
        return nodes.get(0);
    }
    const __gotots_store_2 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory"), nodes);
}
export function IsSimpleCopiableExpression(expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsStringLiteralLike__from_ast(expression) || IsNumericLiteral__from_ast(expression) || IsKeywordKind__from_ast(Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || IsIdentifier__from_ast(expression);
}
export function IsOriginalNodeSingleLine(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(emitContext, node);
    if (original === undefined) {
        return false;
    }
    let source: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(original);
    if (source === undefined) {
        return false;
    }
    let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(source), TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos());
    let endLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(source), TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).End());
    return startLine === endLine;
}
export function IsSimpleInlineableExpression(expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !IsIdentifier__from_ast(expression) && IsSimpleCopiableExpression(expression);
}
export function FindSuperStatementIndexPath(statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, start: int): RuntimeSlice<int> {
    let indices = findSuperStatementIndexPathWorker(statements, start, RuntimeSlice.nil<int>());
    Reverse$SliceOf_int$int(indices);
    return indices;
}
export function findSuperStatementIndexPathWorker(statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, start: int, indices: RuntimeSlice<int>): RuntimeSlice<int> {
    for (let i = start; i < statements.length; i++) {
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = statements.get(i);
        if (!(GetSuperCallFromStatement(statement) === undefined)) {
            return indices.append(0, [i]);
        }
        else if (IsTryStatement__from_ast(statement)) {
            {
                let result = findSuperStatementIndexPathWorker(Node__from_ast.Statements((Node__from_ast.AsTryStatement(statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock), 0, indices);
                if (!result.isNil()) {
                    return result.append(0, [i]);
                }
            }
        }
    }
    return RuntimeSlice.nil<int>();
}
export function GetSuperCallFromStatement(statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!IsExpressionStatement__from_ast(statement)) {
        return void 0;
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(Node__from_ast.Expression(statement));
    if (IsSuperCall__from_ast(expression)) {
        return expression;
    }
    return void 0;
}
export function MoveRangePastModifiers(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    if (IsPropertyDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node)) {
        return NewTextRange__from_core(Node__from_ast.Pos(Node__from_ast.Name(node)), Node__from_ast.End(node));
    }
    let lastModifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (CanHaveModifiers__from_ast(node)) {
        lastModifier = LastOrNil$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(node));
    }
    if (!(lastModifier === undefined) && !PositionIsSynthesized__from_ast(Node__from_ast.End(lastModifier))) {
        return NewTextRange__from_core(Node__from_ast.End(lastModifier), Node__from_ast.End(node));
    }
    return MoveRangePastDecorators(node);
}
export function MoveRangePastDecorators(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    let lastDecorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (CanHaveModifiers__from_ast(node)) {
        let nodes = Node__from_ast.ModifierNodes(node);
        if (!nodes.isNil()) {
            lastDecorator = FindLast$PointerTo_Named_ast$Node(nodes, IsDecorator__from_ast);
        }
    }
    if (!(lastDecorator === undefined) && !PositionIsSynthesized__from_ast(Node__from_ast.End(lastDecorator))) {
        return NewTextRange__from_core(Node__from_ast.End(lastDecorator), Node__from_ast.End(node));
    }
    return TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
}
export function GetNonAssignmentOperatorForCompoundAssignment(kind: Kind__from_ast): Kind__from_ast {
    switch (kind) {
        case KindPlusEqualsToken$constant__from_ast(): {
            return KindPlusToken$constant__from_ast();
            break;
        }
        case KindMinusEqualsToken$constant__from_ast(): {
            return KindMinusToken$constant__from_ast();
            break;
        }
        case KindAsteriskEqualsToken$constant__from_ast(): {
            return KindAsteriskToken$constant__from_ast();
            break;
        }
        case KindAsteriskAsteriskEqualsToken$constant__from_ast(): {
            return KindAsteriskAsteriskToken$constant__from_ast();
            break;
        }
        case KindSlashEqualsToken$constant__from_ast(): {
            return KindSlashToken$constant__from_ast();
            break;
        }
        case KindPercentEqualsToken$constant__from_ast(): {
            return KindPercentToken$constant__from_ast();
            break;
        }
        case KindLessThanLessThanEqualsToken$constant__from_ast(): {
            return KindLessThanLessThanToken$constant__from_ast();
            break;
        }
        case KindGreaterThanGreaterThanEqualsToken$constant__from_ast(): {
            return KindGreaterThanGreaterThanToken$constant__from_ast();
            break;
        }
        case KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast(): {
            return KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast();
            break;
        }
        case KindAmpersandEqualsToken$constant__from_ast(): {
            return KindAmpersandToken$constant__from_ast();
            break;
        }
        case KindBarEqualsToken$constant__from_ast(): {
            return KindBarToken$constant__from_ast();
            break;
        }
        case KindCaretEqualsToken$constant__from_ast(): {
            return KindCaretToken$constant__from_ast();
            break;
        }
        case KindBarBarEqualsToken$constant__from_ast(): {
            return KindBarBarToken$constant__from_ast();
            break;
        }
        case KindAmpersandAmpersandEqualsToken$constant__from_ast(): {
            return KindAmpersandAmpersandToken$constant__from_ast();
            break;
        }
        case KindQuestionQuestionEqualsToken$constant__from_ast(): {
            return KindQuestionQuestionToken$constant__from_ast();
            break;
        }
    }
    return kind;
}
