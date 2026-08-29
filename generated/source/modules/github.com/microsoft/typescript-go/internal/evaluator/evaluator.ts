import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OuterExpressionKinds as OuterExpressionKinds__from_ast, TemplateExpression as TemplateExpression__from_ast, TemplateSpan as TemplateSpan__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, KindAmpersandToken$constant as KindAmpersandToken$constant__from_ast, KindAsteriskAsteriskToken$constant as KindAsteriskAsteriskToken$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindBarToken$constant as KindBarToken$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindCaretToken$constant as KindCaretToken$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindLessThanLessThanToken$constant as KindLessThanLessThanToken$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindPercentToken$constant as KindPercentToken$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTildeToken$constant as KindTildeToken$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, OEKParentheses$constant as OEKParentheses$constant__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FromString as FromString__from_jsnum, Number as Number__from_jsnum, PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_jsnum$Number as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type Result$Storage = {
    Value: GoInterface | undefined;
    IsSyntacticallyString: bool;
    ResolvedOtherFiles: bool;
    HasExternalReferences: bool;
};
export class Result {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Result$Storage) {
    }
    public static $storageOf($source: Result): Result$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Result$Storage): Result {
        return new Result($source);
    }
    public get Value(): GoInterface | undefined {
        return this.$storage.Value;
    }
    public set Value($value: GoInterface | undefined) {
        this.$storage.Value = $value;
    }
    public get IsSyntacticallyString(): bool {
        return this.$storage.IsSyntacticallyString;
    }
    public set IsSyntacticallyString($value: bool) {
        this.$storage.IsSyntacticallyString = $value;
    }
    public get ResolvedOtherFiles(): bool {
        return this.$storage.ResolvedOtherFiles;
    }
    public set ResolvedOtherFiles($value: bool) {
        this.$storage.ResolvedOtherFiles = $value;
    }
    public get HasExternalReferences(): bool {
        return this.$storage.HasExternalReferences;
    }
    public set HasExternalReferences($value: bool) {
        this.$storage.HasExternalReferences = $value;
    }
    static $zero(): Result {
        return new Result({
            Value: void 0,
            IsSyntacticallyString: false,
            ResolvedOtherFiles: false,
            HasExternalReferences: false
        });
    }
    static $copy($source: Result): Result {
        return new Result({
            Value: $source.$storage.Value,
            IsSyntacticallyString: $source.$storage.IsSyntacticallyString,
            ResolvedOtherFiles: $source.$storage.ResolvedOtherFiles,
            HasExternalReferences: $source.$storage.HasExternalReferences
        });
    }
    static $equal($left: Result, $right: Result): bool {
        return goInterfaceEqual($left.$storage.Value, $right.$storage.Value) && $left.$storage.IsSyntacticallyString === $right.$storage.IsSyntacticallyString && $left.$storage.ResolvedOtherFiles === $right.$storage.ResolvedOtherFiles && $left.$storage.HasExternalReferences === $right.$storage.HasExternalReferences;
    }
    static $hash($source: Result): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.$storage.Value === undefined ? 0 : $source.$storage.Value.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.IsSyntacticallyString));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.ResolvedOtherFiles));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.HasExternalReferences));
        return $hash;
    }
    static $zeroStorage(): Result$Storage {
        return {
            Value: void 0,
            IsSyntacticallyString: false,
            ResolvedOtherFiles: false,
            HasExternalReferences: false
        };
    }
    declare private readonly then?: never;
}
export function NewResult(value: GoInterface | undefined, isSyntacticallyString: bool, resolvedOtherFiles: bool, hasExternalReferences: bool): Result {
    return Result.$fromStorage({
        Value: value,
        IsSyntacticallyString: isSyntacticallyString,
        ResolvedOtherFiles: resolvedOtherFiles,
        HasExternalReferences: hasExternalReferences
    });
}
export class Evaluator {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => Result) | undefined) {
    }
    declare private readonly then?: never;
}
export function NewEvaluator(evaluateEntity: Evaluator, outerExpressionsToSkip: OuterExpressionKinds__from_ast): Evaluator {
    let evaluate: Evaluator = new Evaluator(void 0);
    evaluate = new Evaluator((expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Result => {
        let isSyntacticallyString = false;
        let resolvedOtherFiles = false;
        let hasExternalReferences = false;
        expr = SkipOuterExpressions__from_ast(expr, outerExpressionsToSkip | OEKParentheses$constant__from_ast());
        switch (Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPrefixUnaryExpression$constant__from_ast(): {
                const __gotots_callee_0 = evaluate.$value;
                const __gotots_argument_0 = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
                const __gotots_argument_1 = location;
                let result = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
                resolvedOtherFiles = Result.$storageOf(result).ResolvedOtherFiles;
                hasExternalReferences = Result.$storageOf(result).HasExternalReferences;
                {
                    const __gotots_results_0 = (($value: GoInterface | undefined): [
                        Number__from_jsnum,
                        boolean
                    ] => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return [new Number__from_jsnum(0), false];
                        }
                        return [$value.$go$value, true];
                    })(Result.$storageOf(result).Value);
                    let value = __gotots_results_0[0];
                    let ok = __gotots_results_0[1];
                    if (ok) {
                        switch (PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator) {
                            case KindPlusToken$constant__from_ast(): {
                                return Result.$fromStorage({
                                    Value: new GoInterfaceAdapter(value),
                                    IsSyntacticallyString: isSyntacticallyString,
                                    ResolvedOtherFiles: resolvedOtherFiles,
                                    HasExternalReferences: hasExternalReferences
                                });
                                break;
                            }
                            case KindMinusToken$constant__from_ast(): {
                                return Result.$fromStorage({
                                    Value: new GoInterfaceAdapter(new Number__from_jsnum(-value.$value)),
                                    IsSyntacticallyString: isSyntacticallyString,
                                    ResolvedOtherFiles: resolvedOtherFiles,
                                    HasExternalReferences: hasExternalReferences
                                });
                                break;
                            }
                            case KindTildeToken$constant__from_ast(): {
                                return Result.$fromStorage({
                                    Value: new GoInterfaceAdapter(value.BitwiseNOT()),
                                    IsSyntacticallyString: isSyntacticallyString,
                                    ResolvedOtherFiles: resolvedOtherFiles,
                                    HasExternalReferences: hasExternalReferences
                                });
                                break;
                            }
                        }
                    }
                }
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                const __gotots_callee_1 = evaluate.$value;
                const __gotots_argument_2 = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
                const __gotots_argument_3 = location;
                let left = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
                const __gotots_callee_2 = evaluate.$value;
                const __gotots_argument_4 = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
                const __gotots_argument_5 = location;
                let right = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
                let operator = Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
                isSyntacticallyString = (Result.$storageOf(left).IsSyntacticallyString || Result.$storageOf(right).IsSyntacticallyString) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPlusToken$constant__from_ast();
                resolvedOtherFiles = Result.$storageOf(left).ResolvedOtherFiles || Result.$storageOf(right).ResolvedOtherFiles;
                hasExternalReferences = Result.$storageOf(left).HasExternalReferences || Result.$storageOf(right).HasExternalReferences;
                const __gotots_results_1 = (($value: GoInterface | undefined): [
                    Number__from_jsnum,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [new Number__from_jsnum(0), false];
                    }
                    return [$value.$go$value, true];
                })(Result.$storageOf(left).Value);
                let leftNum = __gotots_results_1[0];
                let leftIsNum = __gotots_results_1[1];
                const __gotots_results_2 = (($value: GoInterface | undefined): [
                    Number__from_jsnum,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [new Number__from_jsnum(0), false];
                    }
                    return [$value.$go$value, true];
                })(Result.$storageOf(right).Value);
                let rightNum = __gotots_results_2[0];
                let rightIsNum = __gotots_results_2[1];
                if (leftIsNum && rightIsNum) {
                    switch (operator) {
                        case KindBarToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.BitwiseOR(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindAmpersandToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.BitwiseAND(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindGreaterThanGreaterThanToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.SignedRightShift(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.UnsignedRightShift(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindLessThanLessThanToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.LeftShift(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindCaretToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.BitwiseXOR(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindAsteriskToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(new Number__from_jsnum(leftNum.$value * rightNum.$value)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindSlashToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(new Number__from_jsnum(leftNum.$value / rightNum.$value)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindPlusToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(new Number__from_jsnum(leftNum.$value + rightNum.$value)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindMinusToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(new Number__from_jsnum(leftNum.$value - rightNum.$value)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindPercentToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.Remainder(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                        case KindAsteriskAsteriskToken$constant__from_ast(): {
                            return Result.$fromStorage({
                                Value: new GoInterfaceAdapter(leftNum.Exponentiate(rightNum)),
                                IsSyntacticallyString: isSyntacticallyString,
                                ResolvedOtherFiles: resolvedOtherFiles,
                                HasExternalReferences: hasExternalReferences
                            });
                            break;
                        }
                    }
                }
                const __gotots_results_3 = (($value: GoInterface | undefined): [
                    gostring,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return ["", false];
                    }
                    return [$value.$go$value, true];
                })(Result.$storageOf(left).Value);
                let leftStr = __gotots_results_3[0];
                let leftIsStr = __gotots_results_3[1];
                const __gotots_results_4 = (($value: GoInterface | undefined): [
                    gostring,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return ["", false];
                    }
                    return [$value.$go$value, true];
                })(Result.$storageOf(right).Value);
                let rightStr = __gotots_results_4[0];
                let rightIsStr = __gotots_results_4[1];
                if ((leftIsStr || leftIsNum) && (rightIsStr || rightIsNum) && operator === KindPlusToken$constant__from_ast()) {
                    if (leftIsNum) {
                        leftStr = leftNum.String();
                    }
                    if (rightIsNum) {
                        rightStr = rightNum.String();
                    }
                    return Result.$fromStorage({
                        Value: new $goInterfaceAdapter$string(leftStr + rightStr),
                        IsSyntacticallyString: isSyntacticallyString,
                        ResolvedOtherFiles: resolvedOtherFiles,
                        HasExternalReferences: hasExternalReferences
                    });
                }
                break;
            }
            case KindStringLiteral$constant__from_ast():
            case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                return Result.$fromStorage({
                    Value: new $goInterfaceAdapter$string(Node__from_ast.Text(expr)),
                    IsSyntacticallyString: true,
                    ResolvedOtherFiles: false,
                    HasExternalReferences: false
                });
                break;
            }
            case KindTemplateExpression$constant__from_ast(): {
                return evaluateTemplateExpression(expr, location, evaluate);
                break;
            }
            case KindNumericLiteral$constant__from_ast(): {
                return Result.$fromStorage({
                    Value: new GoInterfaceAdapter(FromString__from_jsnum(Node__from_ast.Text(expr))),
                    IsSyntacticallyString: false,
                    ResolvedOtherFiles: false,
                    HasExternalReferences: false
                });
                break;
            }
            case KindIdentifier$constant__from_ast(): {
                const __gotots_callee_3 = evaluateEntity.$value;
                const __gotots_argument_6 = expr;
                const __gotots_argument_7 = location;
                return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
                break;
            }
            case KindElementAccessExpression$constant__from_ast():
            case KindPropertyAccessExpression$constant__from_ast(): {
                if (IsEntityNameExpression__from_ast(Node__from_ast.Expression(expr))) {
                    const __gotots_callee_4 = evaluateEntity.$value;
                    const __gotots_argument_8 = expr;
                    const __gotots_argument_9 = location;
                    return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
                }
                break;
            }
        }
        return Result.$fromStorage({
            Value: void 0,
            IsSyntacticallyString: isSyntacticallyString,
            ResolvedOtherFiles: resolvedOtherFiles,
            HasExternalReferences: hasExternalReferences
        });
    });
    return evaluate;
}
export function evaluateTemplateExpression(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, evaluate: Evaluator): Result {
    let sb = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.WriteString(sb, Node__from_ast.Text((Node__from_ast.AsTemplateExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head));
    let resolvedOtherFiles = false;
    let hasExternalReferences = false;
    const __gotots_range_0 = NodeList__from_ast.$storageOf((((Node__from_ast.AsTemplateExpression(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let span: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        const __gotots_callee_5 = evaluate.$value;
        const __gotots_argument_10 = Node__from_ast.Expression(span);
        const __gotots_argument_11 = location;
        let spanResult = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
        if (Result.$storageOf(spanResult).Value === undefined) {
            return Result.$fromStorage({
                Value: void 0,
                IsSyntacticallyString: true,
                ResolvedOtherFiles: false,
                HasExternalReferences: false
            });
        }
        strings__from_gostdlib.Builder.WriteString(sb, AnyToString(Result.$storageOf(spanResult).Value));
        strings__from_gostdlib.Builder.WriteString(sb, Node__from_ast.Text((Node__from_ast.AsTemplateSpan(span) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal));
        resolvedOtherFiles = resolvedOtherFiles || Result.$storageOf(spanResult).ResolvedOtherFiles;
        hasExternalReferences = hasExternalReferences || Result.$storageOf(spanResult).HasExternalReferences;
    }
    return Result.$fromStorage({
        Value: new $goInterfaceAdapter$string(strings__from_gostdlib.Builder.String(sb)),
        IsSyntacticallyString: true,
        ResolvedOtherFiles: resolvedOtherFiles,
        HasExternalReferences: hasExternalReferences
    });
}
export function AnyToString(v: GoInterface | undefined): gostring {
    const __gotots_type_switch_0: GoInterface | undefined = v;
    switch (true) {
        case $goInterfaceAdapter$string.$is(__gotots_type_switch_0): {
            let v__shadow_1: gostring = __gotots_type_switch_0.$go$value;
            return v__shadow_1;
            break;
        }
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let v__shadow_1: Number__from_jsnum = __gotots_type_switch_0.$go$value;
            return v__shadow_1.String();
            break;
        }
        case $goInterfaceAdapter$bool.$is(__gotots_type_switch_0): {
            let v__shadow_1: bool = __gotots_type_switch_0.$go$value;
            return IfElse$string(v__shadow_1, "true", "false");
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_0): {
            let v__shadow_1: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_0.$go$value);
            return v__shadow_1.String();
            break;
        }
    }
    const __gotots_argument_12 = new $goInterfaceAdapter$string("Unhandled case in AnyToString");
    GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function IsTruthy(v: GoInterface | undefined): bool {
    const __gotots_type_switch_1: GoInterface | undefined = v;
    switch (true) {
        case $goInterfaceAdapter$string.$is(__gotots_type_switch_1): {
            let v__shadow_1: gostring = __gotots_type_switch_1.$go$value;
            return v__shadow_1.length !== 0;
            break;
        }
        case GoInterfaceAdapter.$is(__gotots_type_switch_1): {
            let v__shadow_1: Number__from_jsnum = __gotots_type_switch_1.$go$value;
            return !(v__shadow_1.$value ===
                ((void Number__from_jsnum,
                    0) as number)) && !v__shadow_1.IsNaN();
            break;
        }
        case $goInterfaceAdapter$bool.$is(__gotots_type_switch_1): {
            let v__shadow_1: bool = __gotots_type_switch_1.$go$value;
            return v__shadow_1;
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_1): {
            let v__shadow_1: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_1.$go$value);
            return !PseudoBigInt__from_jsnum.$equal(v__shadow_1, new PseudoBigInt__from_jsnum(false, ""));
            break;
        }
    }
    const __gotots_argument_13 = new $goInterfaceAdapter$string("Unhandled case in IsTruthy");
    GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
    GoPanic.raiseRuntime("unreachable Go function end");
}
