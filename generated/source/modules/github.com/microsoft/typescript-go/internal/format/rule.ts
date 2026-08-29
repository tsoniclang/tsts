import type { Kind as Kind__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FormattingContext } from "./context.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$Named_format$tokenRange, $goInterfaceAdapter$SliceOf_Named_ast$Kind, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_ast$Kind as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class ruleImpl {
    declare private readonly $goType: void;
    public constructor(public debugName: gostring, public context: RuntimeSlice<(($0: FormattingContext | undefined) => bool) | undefined>, public action: ruleAction, public flags: ruleFlags) {
    }
    declare private readonly then?: never;
    Action(): ruleAction {
        return this.action;
    }
    Context(): RuntimeSlice<(($0: FormattingContext | undefined) => bool) | undefined> {
        return this.context;
    }
    Flags(): ruleFlags {
        return this.flags;
    }
}
export type tokenRange$Storage = {
    tokens: RuntimeSlice<Kind__from_ast>;
    isSpecific: bool;
};
export class tokenRange {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: tokenRange$Storage) {
    }
    public static $storageOf($source: tokenRange): tokenRange$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: tokenRange$Storage): tokenRange {
        return new tokenRange($source);
    }
    public get tokens(): RuntimeSlice<Kind__from_ast> {
        return this.$storage.tokens;
    }
    public set tokens($value: RuntimeSlice<Kind__from_ast>) {
        this.$storage.tokens = $value;
    }
    public get isSpecific(): bool {
        return this.$storage.isSpecific;
    }
    public set isSpecific($value: bool) {
        this.$storage.isSpecific = $value;
    }
    static $copy($source: tokenRange): tokenRange {
        return new tokenRange({
            tokens: $source.$storage.tokens,
            isSpecific: $source.$storage.isSpecific
        });
    }
    static $zeroStorage(): tokenRange$Storage {
        return {
            tokens: RuntimeSlice.nil<Kind__from_ast>(),
            isSpecific: false
        };
    }
    declare private readonly then?: never;
}
export type ruleSpec$Storage = {
    leftTokenRange: tokenRange$Storage;
    rightTokenRange: tokenRange$Storage;
    rule: ruleImpl | undefined;
};
export class ruleSpec {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ruleSpec$Storage) {
    }
    public static $storageOf($source: ruleSpec): ruleSpec$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ruleSpec$Storage): ruleSpec {
        return new ruleSpec($source);
    }
    public get leftTokenRange(): tokenRange {
        return tokenRange.$fromStorage(this.$storage.leftTokenRange);
    }
    public set leftTokenRange($value: tokenRange) {
        this.$storage.leftTokenRange = tokenRange.$storageOf($value);
    }
    public get rightTokenRange(): tokenRange {
        return tokenRange.$fromStorage(this.$storage.rightTokenRange);
    }
    public set rightTokenRange($value: tokenRange) {
        this.$storage.rightTokenRange = tokenRange.$storageOf($value);
    }
    public get rule(): ruleImpl | undefined {
        return this.$storage.rule;
    }
    public set rule($value: ruleImpl | undefined) {
        this.$storage.rule = $value;
    }
    static $copy($source: ruleSpec): ruleSpec {
        return new ruleSpec({
            leftTokenRange: tokenRange.$storageOf(tokenRange.$copy(tokenRange.$fromStorage($source.$storage.leftTokenRange))),
            rightTokenRange: tokenRange.$storageOf(tokenRange.$copy(tokenRange.$fromStorage($source.$storage.rightTokenRange))),
            rule: $source.$storage.rule
        });
    }
    static $zeroStorage(): ruleSpec$Storage {
        return {
            leftTokenRange: tokenRange.$zeroStorage(),
            rightTokenRange: tokenRange.$zeroStorage(),
            rule: void 0
        };
    }
    declare private readonly then?: never;
}
export function rule(debugName: gostring, left: GoInterface | undefined, right: GoInterface | undefined, context: RuntimeSlice<(($0: FormattingContext | undefined) => bool) | undefined>, action: ruleAction, flags: RuntimeSlice<int>): ruleSpec {
    let flag = ruleFlagsNone$constant();
    if (flags.length > 0) {
        flag = new ruleFlags(flags.get(0));
    }
    let leftRange = toTokenRange(left);
    let rightRange = toTokenRange(right);
    let rule__shadow_1: ruleImpl | undefined = new ruleImpl(debugName, context, action, flag);
    return ruleSpec.$fromStorage({
        leftTokenRange: tokenRange.$storageOf(tokenRange.$copy(leftRange)),
        rightTokenRange: tokenRange.$storageOf(tokenRange.$copy(rightRange)),
        rule: rule__shadow_1
    });
}
export function toTokenRange(e: GoInterface | undefined): tokenRange {
    const __gotots_type_switch_0: GoInterface | undefined = e;
    switch (true) {
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let t: Kind__from_ast = __gotots_type_switch_0.$go$value;
            return tokenRange.$fromStorage({
                isSpecific: true,
                tokens: RuntimeSlice.literal<Kind__from_ast>([t])
            });
            break;
        }
        case $goInterfaceAdapter$SliceOf_Named_ast$Kind.$is(__gotots_type_switch_0): {
            let t: RuntimeSlice<Kind__from_ast> = __gotots_type_switch_0.$go$value;
            return tokenRange.$fromStorage({
                isSpecific: true,
                tokens: t
            });
            break;
        }
        case $goInterfaceAdapter$Named_format$tokenRange.$is(__gotots_type_switch_0): {
            let t: tokenRange = tokenRange.$copy(__gotots_type_switch_0.$go$value);
            return tokenRange.$copy(t);
            break;
        }
    }
    const __gotots_argument_0 = new $goInterfaceAdapter$string("Unknown argument type passed to toTokenRange - only ast.Kind, []ast.Kind, and tokenRange supported");
    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export class ruleAction {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ruleActionNone$constant(): ruleAction {
    return new ruleAction(0);
}
export function ruleActionStopProcessingSpaceActions$constant(): ruleAction {
    return new ruleAction(1);
}
export function ruleActionStopProcessingTokenActions$constant(): ruleAction {
    return new ruleAction(2);
}
export function ruleActionInsertSpace$constant(): ruleAction {
    return new ruleAction(4);
}
export function ruleActionInsertNewLine$constant(): ruleAction {
    return new ruleAction(8);
}
export function ruleActionDeleteSpace$constant(): ruleAction {
    return new ruleAction(16);
}
export function ruleActionDeleteToken$constant(): ruleAction {
    return new ruleAction(32);
}
export function ruleActionInsertTrailingSemicolon$constant(): ruleAction {
    return new ruleAction(64);
}
export function ruleActionStopAction$constant(): ruleAction {
    return new ruleAction(3);
}
export function ruleActionModifySpaceAction$constant(): ruleAction {
    return new ruleAction(28);
}
export function ruleActionModifyTokenAction$constant(): ruleAction {
    return new ruleAction(96);
}
export class ruleFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ruleFlagsNone$constant(): ruleFlags {
    return new ruleFlags(0);
}
export function ruleFlagsCanDeleteNewLines$constant(): ruleFlags {
    return new ruleFlags(1);
}
