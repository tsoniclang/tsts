import type { int } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoChannel } from "@gotots/runtime/channel.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class UnlimitedSemaphore {
    declare private readonly $goType: void;
    public constructor() {
    }
    declare private readonly then?: never;
}
export class LimitedSemaphore {
    declare private readonly $goType: void;
    public constructor(public ch: GoChannel<GoEmptyStruct> | undefined, public release: (() => void) | undefined) {
    }
    declare private readonly then?: never;
    static Acquire(s: LimitedSemaphore | undefined): (() => void) | undefined {
        let release: (() => void) | undefined = void 0;
        GoChannel.send((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ch, new GoEmptyStruct);
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).release;
    }
}
export function NewLimitedSemaphore(maxConcurrency: int): LimitedSemaphore | undefined {
    if (maxConcurrency <= 0) {
        const __gotots_argument_0 = new GoInterfaceAdapter("maxConcurrency must be positive");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    let s: LimitedSemaphore | undefined = new LimitedSemaphore(GoChannel.make<GoEmptyStruct>(maxConcurrency, (): GoEmptyStruct => {
        return GoEmptyStruct.$zero();
    }, (value: GoEmptyStruct): GoEmptyStruct => {
        return (void GoEmptyStruct.$copy,
            value);
    }), void 0);
    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).release = (): void => {
        GoChannel.receive((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ch)[0];
    };
    return s;
}
