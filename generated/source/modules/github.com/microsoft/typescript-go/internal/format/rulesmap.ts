import type { Kind as Kind__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FormattingContext } from "./context.js";
import type { ruleImpl } from "./rule.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { KindLastKeyword$constant as KindLastKeyword$constant__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/format/state.js";
import { Insert$SliceOf_PointerTo_Named_format$ruleImpl$PointerTo_Named_format$ruleImpl } from "../../../../../../support/generics/concretizations/slices/Insert.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { ruleAction, ruleActionModifySpaceAction$constant, ruleActionModifyTokenAction$constant, ruleActionNone$constant, ruleActionStopAction$constant, ruleActionStopProcessingSpaceActions$constant, ruleActionStopProcessingTokenActions$constant, ruleSpec, tokenRange } from "./rule.js";
import { getAllRules } from "./rules.js";
import { TextRangeWithKind } from "./scanner.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function getRules(context: FormattingContext | undefined, rules: RuntimeSlice<ruleImpl | undefined>): RuntimeSlice<ruleImpl | undefined> {
    const __gotots_callee_0 = $state.getRulesMap;
    const __gotots_slice_operand_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_slice_operand_1 = getRuleBucketIndex(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind, TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind);
    let bucket = __gotots_slice_operand_0.get(__gotots_slice_operand_1);
    if (bucket.length > 0) {
        let ruleActionMask = ruleActionNone$constant();
        const __gotots_range_0 = bucket;
        outer: for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let rule__shadow_1: ruleImpl | undefined = __gotots_range_value_0;
            let acceptRuleActions = new ruleAction(~getRuleActionExclusion(ruleActionMask).$value);
            if (!(((void ruleAction,
                (rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Action().$value & acceptRuleActions.$value) as number)
                ===
                    ((void ruleAction,
                        0) as number))) {
                let preds = (rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context();
                const __gotots_range_1 = preds;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let p: (($0: FormattingContext | undefined) => bool) | undefined = __gotots_range_value_1;
                    const __gotots_callee_1 = p;
                    const __gotots_argument_0 = context;
                    if (!(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0)) {
                        continue outer;
                    }
                }
                rules = rules.append(void 0, [rule__shadow_1]);
                ruleActionMask = new ruleAction(ruleActionMask.$value | (rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Action().$value);
            }
        }
        return rules;
    }
    return rules;
}
export function getRuleBucketIndex(row: Kind__from_ast, column: Kind__from_ast): int {
    Assert__from_debug(row <= KindLastKeyword$constant__from_ast() && column <= KindLastKeyword$constant__from_ast(), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Must compute formatting context from tokens")]));
    return (row * mapRowLength) + column;
}
export const maskBitSize$int: int = 5;
export const mask$int: int = 31;
export const mapRowLength: int = 167;
export function getRuleActionExclusion(ruleAction__shadow_1: ruleAction): ruleAction {
    let mask__shadow_1 = ruleActionNone$constant();
    if (!(((void ruleAction,
        ruleAction__shadow_1.$value & ruleActionStopProcessingSpaceActions$constant().$value) as number)
        ===
            ((void ruleAction,
                0) as number))) {
        mask__shadow_1 = new ruleAction(mask__shadow_1.$value | 28);
    }
    if (!(((void ruleAction,
        ruleAction__shadow_1.$value & ruleActionStopProcessingTokenActions$constant().$value) as number)
        ===
            ((void ruleAction,
                0) as number))) {
        mask__shadow_1 = new ruleAction(mask__shadow_1.$value | 96);
    }
    if (!(((void ruleAction,
        ruleAction__shadow_1.$value & ruleActionModifySpaceAction$constant().$value) as number)
        ===
            ((void ruleAction,
                0) as number))) {
        mask__shadow_1 = new ruleAction(mask__shadow_1.$value | 28);
    }
    if (!(((void ruleAction,
        ruleAction__shadow_1.$value & ruleActionModifyTokenAction$constant().$value) as number)
        ===
            ((void ruleAction,
                0) as number))) {
        mask__shadow_1 = new ruleAction(mask__shadow_1.$value | 96);
    }
    return mask__shadow_1;
}
export function buildRulesMap(): RuntimeSlice<RuntimeSlice<ruleImpl | undefined>> {
    let rules = getAllRules();
    let m = RuntimeSlice.make<RuntimeSlice<ruleImpl | undefined>>(27889, null, RuntimeSlice.nil<ruleImpl | undefined>());
    let rulesBucketConstructionStateList = RuntimeSlice.make<int>(m.length, null, 0);
    const __gotots_range_2 = rules;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = ruleSpec.$copy(ruleSpec.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
        let rule__shadow_1 = __gotots_range_value_2;
        let specificRule = tokenRange.$storageOf(tokenRange.$fromStorage(ruleSpec.$storageOf(rule__shadow_1).leftTokenRange)).isSpecific && tokenRange.$storageOf(tokenRange.$fromStorage(ruleSpec.$storageOf(rule__shadow_1).rightTokenRange)).isSpecific;
        const __gotots_range_3 = tokenRange.$storageOf(tokenRange.$fromStorage(ruleSpec.$storageOf(rule__shadow_1).leftTokenRange)).tokens;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let left = __gotots_range_value_3;
            const __gotots_range_4 = tokenRange.$storageOf(tokenRange.$fromStorage(ruleSpec.$storageOf(rule__shadow_1).rightTokenRange)).tokens;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                let right = __gotots_range_value_4;
                let index = getRuleBucketIndex(left, right);
                m.set(index, addRule(m.get(index), ruleSpec.$storageOf(rule__shadow_1).rule, specificRule, rulesBucketConstructionStateList, index));
            }
        }
    }
    return m;
}
export class RulesPosition {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function RulesPositionStopRulesSpecific$constant(): RulesPosition {
    return new RulesPosition(0);
}
export function RulesPositionStopRulesAny$constant(): RulesPosition {
    return new RulesPosition(5);
}
export function RulesPositionContextRulesSpecific$constant(): RulesPosition {
    return new RulesPosition(10);
}
export function RulesPositionContextRulesAny$constant(): RulesPosition {
    return new RulesPosition(15);
}
export function RulesPositionNoContextRulesSpecific$constant(): RulesPosition {
    return new RulesPosition(20);
}
export function RulesPositionNoContextRulesAny$constant(): RulesPosition {
    return new RulesPosition(25);
}
export function addRule(rules: RuntimeSlice<ruleImpl | undefined>, rule__shadow_1: ruleImpl | undefined, specificTokens: bool, constructionState: RuntimeSlice<int>, rulesBucketIndex: int): RuntimeSlice<ruleImpl | undefined> {
    let position = new RulesPosition(0);
    if (!(((void ruleAction,
        (rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Action().$value & ruleActionStopAction$constant().$value) as number)
        ===
            ((void ruleAction,
                0) as number))) {
        if (specificTokens) {
            position = RulesPositionStopRulesSpecific$constant();
        }
        else {
            position = RulesPositionStopRulesAny$constant();
        }
    }
    else if ((rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context().length !== 0) {
        if (specificTokens) {
            position = RulesPositionContextRulesSpecific$constant();
        }
        else {
            position = RulesPositionContextRulesAny$constant();
        }
    }
    else {
        if (specificTokens) {
            position = RulesPositionNoContextRulesSpecific$constant();
        }
        else {
            position = RulesPositionNoContextRulesAny$constant();
        }
    }
    let state = constructionState.get(rulesBucketIndex);
    rules = Insert$SliceOf_PointerTo_Named_format$ruleImpl$PointerTo_Named_format$ruleImpl(rules, getRuleInsertionIndex(state, position), RuntimeSlice.literal<ruleImpl | undefined>([rule__shadow_1]));
    constructionState.set(rulesBucketIndex, increaseInsertionIndex(state, position));
    return rules;
}
export function getRuleInsertionIndex(indexBitmap: int, maskPosition: RulesPosition): int {
    let index = 0;
    for (let pos = 0; pos <= maskPosition.$value; pos += maskBitSize$int) {
        index += indexBitmap & mask$int;
        indexBitmap = indexBitmap >> maskBitSize$int;
    }
    return index;
}
export function increaseInsertionIndex(indexBitmap: int, maskPosition: RulesPosition): int {
    let value = ((maskPosition.$value < 0 ? GoPanic.raiseRuntime("negative shift amount") : maskPosition.$value >= 64 ? indexBitmap < 0 ? -1 : 0 : indexBitmap >> maskPosition.$value) & mask$int) + 1;
    Assert__from_debug((value & mask$int) === value, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.")]));
    return (indexBitmap & ~(maskPosition.$value < 0 ? GoPanic.raiseRuntime("negative shift amount") : maskPosition.$value >= 64 ? 0 : mask$int << maskPosition.$value)) | (maskPosition.$value < 0 ? GoPanic.raiseRuntime("negative shift amount") : maskPosition.$value >= 64 ? 0 : value << maskPosition.$value);
}
