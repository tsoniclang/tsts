import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { InferTypeNode, PostfixUnaryExpression, TaggedTemplateExpression } from "./ast_generated.js";
import type { Kind } from "./kind_generated.js";
import type { bool, int, int32 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$Named_ast$Kind as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Node } from "./ast.js";
import { BinaryExpression, ConditionalExpression, PrefixUnaryExpression, TypeParameterDeclaration } from "./ast_generated.js";
import { KindAmpersandAmpersandEqualsToken$constant, KindAmpersandAmpersandToken$constant, KindAmpersandEqualsToken$constant, KindAmpersandToken$constant, KindAnyKeyword$constant, KindArrayLiteralExpression$constant, KindArrayType$constant, KindArrowFunction$constant, KindAsExpression$constant, KindAsKeyword$constant, KindAsteriskAsteriskEqualsToken$constant, KindAsteriskAsteriskToken$constant, KindAsteriskEqualsToken$constant, KindAsteriskToken$constant, KindAwaitExpression$constant, KindBarBarEqualsToken$constant, KindBarBarToken$constant, KindBarEqualsToken$constant, KindBarToken$constant, KindBigIntKeyword$constant, KindBigIntLiteral$constant, KindBinaryExpression$constant, KindBooleanKeyword$constant, KindCallExpression$constant, KindCaretEqualsToken$constant, KindCaretToken$constant, KindClassExpression$constant, KindCommaToken$constant, KindConditionalExpression$constant, KindConditionalType$constant, KindConstructorType$constant, KindDeleteExpression$constant, KindElementAccessExpression$constant, KindEqualsEqualsEqualsToken$constant, KindEqualsEqualsToken$constant, KindEqualsToken$constant, KindExclamationEqualsEqualsToken$constant, KindExclamationEqualsToken$constant, KindExpressionWithTypeArguments$constant, KindFalseKeyword$constant, KindFunctionExpression$constant, KindFunctionType$constant, KindGreaterThanEqualsToken$constant, KindGreaterThanGreaterThanEqualsToken$constant, KindGreaterThanGreaterThanGreaterThanEqualsToken$constant, KindGreaterThanGreaterThanGreaterThanToken$constant, KindGreaterThanGreaterThanToken$constant, KindGreaterThanToken$constant, KindIdentifier$constant, KindImportKeyword$constant, KindImportType$constant, KindInKeyword$constant, KindIndexedAccessType$constant, KindInferType$constant, KindInstanceOfKeyword$constant, KindIntersectionType$constant, KindIntrinsicKeyword$constant, KindJSDocAllType$constant, KindJSDocNonNullableType$constant, KindJSDocNullableType$constant, KindJSDocOptionalType$constant, KindJSDocVariadicType$constant, KindJsxElement$constant, KindJsxFragment$constant, KindJsxSelfClosingElement$constant, KindLessThanEqualsToken$constant, KindLessThanLessThanEqualsToken$constant, KindLessThanLessThanToken$constant, KindLessThanToken$constant, KindLiteralType$constant, KindMappedType$constant, KindMetaProperty$constant, KindMinusEqualsToken$constant, KindMinusToken$constant, KindMissingDeclaration$constant, KindNamedTupleMember$constant, KindNeverKeyword$constant, KindNewExpression$constant, KindNoSubstitutionTemplateLiteral$constant, KindNonNullExpression$constant, KindNullKeyword$constant, KindNumberKeyword$constant, KindNumericLiteral$constant, KindObjectKeyword$constant, KindObjectLiteralExpression$constant, KindOmittedExpression$constant, KindOptionalType$constant, KindParenthesizedExpression$constant, KindParenthesizedType$constant, KindPartiallyEmittedExpression$constant, KindPercentEqualsToken$constant, KindPercentToken$constant, KindPlusEqualsToken$constant, KindPlusToken$constant, KindPostfixUnaryExpression$constant, KindPrefixUnaryExpression$constant, KindPrivateIdentifier$constant, KindPropertyAccessExpression$constant, KindQuestionQuestionEqualsToken$constant, KindQuestionQuestionToken$constant, KindRegularExpressionLiteral$constant, KindRestType$constant, KindSatisfiesExpression$constant, KindSatisfiesKeyword$constant, KindSlashEqualsToken$constant, KindSlashToken$constant, KindSpreadElement$constant, KindStringKeyword$constant, KindStringLiteral$constant, KindSuperKeyword$constant, KindSymbolKeyword$constant, KindTaggedTemplateExpression$constant, KindTemplateExpression$constant, KindTemplateLiteralType$constant, KindThisKeyword$constant, KindThisType$constant, KindTrueKeyword$constant, KindTupleType$constant, KindTypeAssertionExpression$constant, KindTypeLiteral$constant, KindTypeOfExpression$constant, KindTypeOperator$constant, KindTypePredicate$constant, KindTypeQuery$constant, KindTypeReference$constant, KindUndefinedKeyword$constant, KindUnionType$constant, KindUnknownKeyword$constant, KindVoidExpression$constant, KindVoidKeyword$constant, KindYieldExpression$constant } from "./kind_generated.js";
import { IsOptionalChain } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class OperatorPrecedence {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function OperatorPrecedenceComma$constant(): OperatorPrecedence {
    return new OperatorPrecedence(0);
}
export function OperatorPrecedenceSpread$constant(): OperatorPrecedence {
    return new OperatorPrecedence(1);
}
export function OperatorPrecedenceYield$constant(): OperatorPrecedence {
    return new OperatorPrecedence(2);
}
export function OperatorPrecedenceAssignment$constant(): OperatorPrecedence {
    return new OperatorPrecedence(3);
}
export function OperatorPrecedenceConditional$constant(): OperatorPrecedence {
    return new OperatorPrecedence(4);
}
export function OperatorPrecedenceLogicalOR$constant(): OperatorPrecedence {
    return new OperatorPrecedence(5);
}
export function OperatorPrecedenceLogicalAND$constant(): OperatorPrecedence {
    return new OperatorPrecedence(6);
}
export function OperatorPrecedenceBitwiseOR$constant(): OperatorPrecedence {
    return new OperatorPrecedence(7);
}
export function OperatorPrecedenceBitwiseXOR$constant(): OperatorPrecedence {
    return new OperatorPrecedence(8);
}
export function OperatorPrecedenceBitwiseAND$constant(): OperatorPrecedence {
    return new OperatorPrecedence(9);
}
export function OperatorPrecedenceEquality$constant(): OperatorPrecedence {
    return new OperatorPrecedence(10);
}
export function OperatorPrecedenceRelational$constant(): OperatorPrecedence {
    return new OperatorPrecedence(11);
}
export function OperatorPrecedenceShift$constant(): OperatorPrecedence {
    return new OperatorPrecedence(12);
}
export function OperatorPrecedenceAdditive$constant(): OperatorPrecedence {
    return new OperatorPrecedence(13);
}
export function OperatorPrecedenceMultiplicative$constant(): OperatorPrecedence {
    return new OperatorPrecedence(14);
}
export function OperatorPrecedenceExponentiation$constant(): OperatorPrecedence {
    return new OperatorPrecedence(15);
}
export function OperatorPrecedenceUnary$constant(): OperatorPrecedence {
    return new OperatorPrecedence(16);
}
export function OperatorPrecedenceUpdate$constant(): OperatorPrecedence {
    return new OperatorPrecedence(17);
}
export function OperatorPrecedenceLeftHandSide$constant(): OperatorPrecedence {
    return new OperatorPrecedence(18);
}
export function OperatorPrecedenceOptionalChain$constant(): OperatorPrecedence {
    return new OperatorPrecedence(19);
}
export function OperatorPrecedenceMember$constant(): OperatorPrecedence {
    return new OperatorPrecedence(20);
}
export function OperatorPrecedencePrimary$constant(): OperatorPrecedence {
    return new OperatorPrecedence(21);
}
export function OperatorPrecedenceParentheses$constant(): OperatorPrecedence {
    return new OperatorPrecedence(22);
}
export function OperatorPrecedenceLowest$constant(): OperatorPrecedence {
    return new OperatorPrecedence(0);
}
export function OperatorPrecedenceHighest$constant(): OperatorPrecedence {
    return new OperatorPrecedence(22);
}
export function OperatorPrecedenceDisallowComma$constant(): OperatorPrecedence {
    return new OperatorPrecedence(2);
}
export function OperatorPrecedenceCoalesce$constant(): OperatorPrecedence {
    return new OperatorPrecedence(5);
}
export function OperatorPrecedenceInvalid$constant(): OperatorPrecedence {
    return new OperatorPrecedence(-1);
}
export function getOperator(expression: tsonicTypeScriptRuntime.Location<Node> | undefined): Kind {
    switch (Node.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindBinaryExpression$constant(): {
            return Node.$storageOf(((BinaryExpression.$storageOf(((Node.AsBinaryExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
            break;
        }
        case KindPrefixUnaryExpression$constant(): {
            return PrefixUnaryExpression.$storageOf(((Node.AsPrefixUnaryExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression>).value).Operator;
            break;
        }
        case KindPostfixUnaryExpression$constant(): {
            return (Node.AsPostfixUnaryExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operator;
            break;
        }
        default: {
            return Node.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
            break;
        }
    }
}
export function GetExpressionPrecedence(expression: tsonicTypeScriptRuntime.Location<Node> | undefined): OperatorPrecedence {
    let operator = getOperator(expression);
    let flags = new OperatorPrecedenceFlags(0);
    if (Node.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind === KindNewExpression$constant() && Node.ArgumentList(expression) === undefined) {
        flags = OperatorPrecedenceFlagsNewWithoutArguments$constant();
    }
    else if (IsOptionalChain(expression)) {
        flags = OperatorPrecedenceFlagsOptionalChain$constant();
    }
    return GetOperatorPrecedence(Node.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind, operator, flags);
}
export class OperatorPrecedenceFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function OperatorPrecedenceFlagsNewWithoutArguments$constant(): OperatorPrecedenceFlags {
    return new OperatorPrecedenceFlags(1);
}
export function OperatorPrecedenceFlagsOptionalChain$constant(): OperatorPrecedenceFlags {
    return new OperatorPrecedenceFlags(2);
}
export function GetOperatorPrecedence(nodeKind: Kind, operatorKind: Kind, flags: OperatorPrecedenceFlags): OperatorPrecedence {
    switch (nodeKind) {
        case KindSpreadElement$constant(): {
            return OperatorPrecedenceSpread$constant();
            break;
        }
        case KindYieldExpression$constant(): {
            return OperatorPrecedenceYield$constant();
            break;
        }
        case KindArrowFunction$constant(): {
            return OperatorPrecedenceAssignment$constant();
            break;
        }
        case KindConditionalExpression$constant(): {
            return OperatorPrecedenceConditional$constant();
            break;
        }
        case KindBinaryExpression$constant(): {
            switch (operatorKind) {
                case KindCommaToken$constant(): {
                    return OperatorPrecedenceComma$constant();
                    break;
                }
                case KindEqualsToken$constant():
                case KindPlusEqualsToken$constant():
                case KindMinusEqualsToken$constant():
                case KindAsteriskAsteriskEqualsToken$constant():
                case KindAsteriskEqualsToken$constant():
                case KindSlashEqualsToken$constant():
                case KindPercentEqualsToken$constant():
                case KindLessThanLessThanEqualsToken$constant():
                case KindGreaterThanGreaterThanEqualsToken$constant():
                case KindGreaterThanGreaterThanGreaterThanEqualsToken$constant():
                case KindAmpersandEqualsToken$constant():
                case KindCaretEqualsToken$constant():
                case KindBarEqualsToken$constant():
                case KindBarBarEqualsToken$constant():
                case KindAmpersandAmpersandEqualsToken$constant():
                case KindQuestionQuestionEqualsToken$constant(): {
                    return OperatorPrecedenceAssignment$constant();
                    break;
                }
                default: {
                    return GetBinaryOperatorPrecedence(operatorKind);
                    break;
                }
            }
            break;
        }
        case KindTypeAssertionExpression$constant():
        case KindNonNullExpression$constant():
        case KindPrefixUnaryExpression$constant():
        case KindTypeOfExpression$constant():
        case KindVoidExpression$constant():
        case KindDeleteExpression$constant():
        case KindAwaitExpression$constant(): {
            return OperatorPrecedenceUnary$constant();
            break;
        }
        case KindPostfixUnaryExpression$constant(): {
            return OperatorPrecedenceUpdate$constant();
            break;
        }
        case KindPropertyAccessExpression$constant():
        case KindElementAccessExpression$constant(): {
            if (!(((void OperatorPrecedenceFlags,
                flags.$value & OperatorPrecedenceFlagsOptionalChain$constant().$value) as int)
                ===
                    ((void OperatorPrecedenceFlags,
                        0) as int))) {
                return OperatorPrecedenceOptionalChain$constant();
            }
            return OperatorPrecedenceMember$constant();
            break;
        }
        case KindCallExpression$constant(): {
            if (!(((void OperatorPrecedenceFlags,
                flags.$value & OperatorPrecedenceFlagsOptionalChain$constant().$value) as int)
                ===
                    ((void OperatorPrecedenceFlags,
                        0) as int))) {
                return OperatorPrecedenceOptionalChain$constant();
            }
            return OperatorPrecedenceMember$constant();
            break;
        }
        case KindNewExpression$constant(): {
            if (!(((void OperatorPrecedenceFlags,
                flags.$value & OperatorPrecedenceFlagsNewWithoutArguments$constant().$value) as int)
                ===
                    ((void OperatorPrecedenceFlags,
                        0) as int))) {
                return OperatorPrecedenceLeftHandSide$constant();
            }
            return OperatorPrecedenceMember$constant();
            break;
        }
        case KindTaggedTemplateExpression$constant():
        case KindMetaProperty$constant():
        case KindExpressionWithTypeArguments$constant(): {
            return OperatorPrecedenceMember$constant();
            break;
        }
        case KindAsExpression$constant():
        case KindSatisfiesExpression$constant(): {
            return OperatorPrecedenceRelational$constant();
            break;
        }
        case KindThisKeyword$constant():
        case KindSuperKeyword$constant():
        case KindImportKeyword$constant():
        case KindIdentifier$constant():
        case KindPrivateIdentifier$constant():
        case KindNullKeyword$constant():
        case KindTrueKeyword$constant():
        case KindFalseKeyword$constant():
        case KindNumericLiteral$constant():
        case KindBigIntLiteral$constant():
        case KindStringLiteral$constant():
        case KindArrayLiteralExpression$constant():
        case KindObjectLiteralExpression$constant():
        case KindFunctionExpression$constant():
        case KindClassExpression$constant():
        case KindRegularExpressionLiteral$constant():
        case KindNoSubstitutionTemplateLiteral$constant():
        case KindTemplateExpression$constant():
        case KindOmittedExpression$constant():
        case KindJsxElement$constant():
        case KindJsxSelfClosingElement$constant():
        case KindJsxFragment$constant():
        case KindMissingDeclaration$constant(): {
            return OperatorPrecedencePrimary$constant();
            break;
        }
        case KindParenthesizedExpression$constant(): {
            return OperatorPrecedenceParentheses$constant();
            break;
        }
        default: {
            return OperatorPrecedenceInvalid$constant();
            break;
        }
    }
}
export function GetBinaryOperatorPrecedence(operatorKind: Kind): OperatorPrecedence {
    switch (operatorKind) {
        case KindQuestionQuestionToken$constant(): {
            return OperatorPrecedenceCoalesce$constant();
            break;
        }
        case KindBarBarToken$constant(): {
            return OperatorPrecedenceLogicalOR$constant();
            break;
        }
        case KindAmpersandAmpersandToken$constant(): {
            return OperatorPrecedenceLogicalAND$constant();
            break;
        }
        case KindBarToken$constant(): {
            return OperatorPrecedenceBitwiseOR$constant();
            break;
        }
        case KindCaretToken$constant(): {
            return OperatorPrecedenceBitwiseXOR$constant();
            break;
        }
        case KindAmpersandToken$constant(): {
            return OperatorPrecedenceBitwiseAND$constant();
            break;
        }
        case KindEqualsEqualsToken$constant():
        case KindExclamationEqualsToken$constant():
        case KindEqualsEqualsEqualsToken$constant():
        case KindExclamationEqualsEqualsToken$constant(): {
            return OperatorPrecedenceEquality$constant();
            break;
        }
        case KindLessThanToken$constant():
        case KindGreaterThanToken$constant():
        case KindLessThanEqualsToken$constant():
        case KindGreaterThanEqualsToken$constant():
        case KindInstanceOfKeyword$constant():
        case KindInKeyword$constant():
        case KindAsKeyword$constant():
        case KindSatisfiesKeyword$constant(): {
            return OperatorPrecedenceRelational$constant();
            break;
        }
        case KindLessThanLessThanToken$constant():
        case KindGreaterThanGreaterThanToken$constant():
        case KindGreaterThanGreaterThanGreaterThanToken$constant(): {
            return OperatorPrecedenceShift$constant();
            break;
        }
        case KindPlusToken$constant():
        case KindMinusToken$constant(): {
            return OperatorPrecedenceAdditive$constant();
            break;
        }
        case KindAsteriskToken$constant():
        case KindSlashToken$constant():
        case KindPercentToken$constant(): {
            return OperatorPrecedenceMultiplicative$constant();
            break;
        }
        case KindAsteriskAsteriskToken$constant(): {
            return OperatorPrecedenceExponentiation$constant();
            break;
        }
    }
    return OperatorPrecedenceInvalid$constant();
}
export function GetLeftmostExpression(node: tsonicTypeScriptRuntime.Location<Node> | undefined, stopAtCallExpressions: bool): tsonicTypeScriptRuntime.Location<Node> | undefined {
    for (;;) {
        {
            const __gotots_switch_tag_0 = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 = __gotots_switch_tag_0 === KindPostfixUnaryExpression$constant();
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === KindBinaryExpression$constant();
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_2 = false;
                if (!__gotots_switch_match_2) {
                    __gotots_switch_match_2 = __gotots_switch_tag_0 === KindConditionalExpression$constant();
                }
                if (__gotots_switch_match_2) {
                    __gotots_switch_selection_0 = 2;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_3 = false;
                if (!__gotots_switch_match_3) {
                    __gotots_switch_match_3 = __gotots_switch_tag_0 === KindTaggedTemplateExpression$constant();
                }
                if (__gotots_switch_match_3) {
                    __gotots_switch_selection_0 = 3;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_4 = false;
                if (!__gotots_switch_match_4) {
                    __gotots_switch_match_4 = __gotots_switch_tag_0 === KindCallExpression$constant();
                }
                if (__gotots_switch_match_4) {
                    __gotots_switch_selection_0 = 4;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_5 = false;
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_0 === KindAsExpression$constant();
                }
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_0 === KindElementAccessExpression$constant();
                }
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_0 === KindPropertyAccessExpression$constant();
                }
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_0 === KindNonNullExpression$constant();
                }
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_0 === KindPartiallyEmittedExpression$constant();
                }
                if (!__gotots_switch_match_5) {
                    __gotots_switch_match_5 = __gotots_switch_tag_0 === KindSatisfiesExpression$constant();
                }
                if (__gotots_switch_match_5) {
                    __gotots_switch_selection_0 = 5;
                }
            }
            __gotots_control_target_0: {
                if (__gotots_switch_selection_0 === 0) {
                    node = (Node.AsPostfixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Operand;
                    continue;
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 1) {
                    node = BinaryExpression.$storageOf(((Node.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression>).value).Left;
                    continue;
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 2) {
                    node = ConditionalExpression.$storageOf(((Node.AsConditionalExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression>).value).Condition;
                    continue;
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 3) {
                    node = (Node.AsTaggedTemplateExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag;
                    continue;
                    break __gotots_control_target_0;
                }
                if (__gotots_switch_selection_0 === 4) {
                    if (stopAtCallExpressions) {
                        return node;
                    }
                    __gotots_switch_selection_0 = 5;
                }
                if (__gotots_switch_selection_0 === 5) {
                    node = Node.Expression(node);
                    continue;
                    break __gotots_control_target_0;
                }
            }
        }
        return node;
    }
}
export type TypePrecedence = int32;
export function TypePrecedenceConditional$constant(): TypePrecedence {
    return 0;
}
export function TypePrecedenceJSDoc$constant(): TypePrecedence {
    return 1;
}
export function TypePrecedenceFunction$constant(): TypePrecedence {
    return 2;
}
export function TypePrecedenceUnion$constant(): TypePrecedence {
    return 3;
}
export function TypePrecedenceIntersection$constant(): TypePrecedence {
    return 4;
}
export function TypePrecedenceTypeOperator$constant(): TypePrecedence {
    return 5;
}
export function TypePrecedencePostfix$constant(): TypePrecedence {
    return 6;
}
export function TypePrecedenceNonArray$constant(): TypePrecedence {
    return 7;
}
export function TypePrecedenceLowest$constant(): TypePrecedence {
    return 0;
}
export function TypePrecedenceHighest$constant(): TypePrecedence {
    return 7;
}
export function GetTypeNodePrecedence(n: tsonicTypeScriptRuntime.Location<Node> | undefined): TypePrecedence {
    switch (Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind) {
        case KindConditionalType$constant(): {
            return TypePrecedenceConditional$constant();
            break;
        }
        case KindJSDocOptionalType$constant():
        case KindJSDocVariadicType$constant(): {
            return TypePrecedenceJSDoc$constant();
            break;
        }
        case KindFunctionType$constant():
        case KindConstructorType$constant(): {
            return TypePrecedenceFunction$constant();
            break;
        }
        case KindUnionType$constant(): {
            return TypePrecedenceUnion$constant();
            break;
        }
        case KindIntersectionType$constant(): {
            return TypePrecedenceIntersection$constant();
            break;
        }
        case KindTypeOperator$constant(): {
            return TypePrecedenceTypeOperator$constant();
            break;
        }
        case KindInferType$constant(): {
            if (!(TypeParameterDeclaration.$storageOf(((Node.AsTypeParameterDeclaration((Node.AsInferTypeNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration>).value).Constraint === undefined)) {
                return TypePrecedenceFunction$constant();
            }
            return TypePrecedenceTypeOperator$constant();
            break;
        }
        case KindIndexedAccessType$constant():
        case KindArrayType$constant():
        case KindOptionalType$constant(): {
            return TypePrecedencePostfix$constant();
            break;
        }
        case KindTypeQuery$constant(): {
            return TypePrecedenceTypeOperator$constant();
            break;
        }
        case KindAnyKeyword$constant():
        case KindUnknownKeyword$constant():
        case KindStringKeyword$constant():
        case KindNumberKeyword$constant():
        case KindBigIntKeyword$constant():
        case KindSymbolKeyword$constant():
        case KindBooleanKeyword$constant():
        case KindUndefinedKeyword$constant():
        case KindNeverKeyword$constant():
        case KindObjectKeyword$constant():
        case KindIntrinsicKeyword$constant():
        case KindVoidKeyword$constant():
        case KindJSDocAllType$constant():
        case KindJSDocNullableType$constant():
        case KindJSDocNonNullableType$constant():
        case KindLiteralType$constant():
        case KindTypePredicate$constant():
        case KindTypeReference$constant():
        case KindTypeLiteral$constant():
        case KindTupleType$constant():
        case KindRestType$constant():
        case KindParenthesizedType$constant():
        case KindThisType$constant():
        case KindMappedType$constant():
        case KindNamedTupleMember$constant():
        case KindTemplateLiteralType$constant():
        case KindImportType$constant():
        case KindPropertyAccessExpression$constant():
        case KindExpressionWithTypeArguments$constant(): {
            return TypePrecedenceNonArray$constant();
            break;
        }
        default: {
            const __gotots_argument_0 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("unhandled TypeNode: %v", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Node.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind)])));
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            break;
        }
    }
}
