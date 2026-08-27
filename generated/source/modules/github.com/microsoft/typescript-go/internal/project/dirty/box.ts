import type { Value } from "./interfaces.js";
import type { bool, uint32 } from "@gotots/runtime/scalars.js";
import type { GoStorage } from "@gotots/runtime/storage.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type Box$Storage<T> = {
    original: GoStorage<T>;
    value: GoStorage<T>;
    dirty: bool;
    __go_delete: bool;
};
export class Box<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Box$Storage<T>) {
    }
    public static $storageOf<T>($source: Box<T>): Box$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: Box$Storage<T>): Box<T> {
        return new Box<T>($source);
    }
    static $copy<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, $source: Box<T>): Box<T> {
        return new Box<T>({
            original: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.original))),
            value: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.value))),
            dirty: $source.$storage.dirty,
            __go_delete: $source.$storage.__go_delete
        });
    }
    static $equal<T>($go$equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $left: Box<T>, $right: Box<T>): bool {
        return $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.original), $go$from_storage$T0_to_T0($right.$storage.original)) && $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.value), $go$from_storage$T0_to_T0($right.$storage.value)) && $left.$storage.dirty === $right.$storage.dirty && $left.$storage.__go_delete === $right.$storage.__go_delete;
    }
    static $hash<T>($go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$hash$T0_to_uint32: ($0: T) => uint32, $source: Box<T>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.original)));
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.value)));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.dirty));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.__go_delete));
        return $hash;
    }
    declare private readonly then?: never;
    static Change$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$constraint_method$dirty$Clone$T0_to_T0: ($0: T) => T, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, apply: (($0: T) => void) | undefined): void {
        if (!Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty) {
            Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value = $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$constraint_method$dirty$Clone$T0_to_T0($go$from_storage$T0_to_T0(Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value))));
            Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty = true;
        }
        const __gotots_callee_1 = apply;
        const __gotots_argument_1 = $go$copy$T0_to_T0($go$from_storage$T0_to_T0(Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
    }
    static ChangeIf$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$constraint_method$dirty$Clone$T0_to_T0: ($0: T) => T, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, cond: (($0: T) => bool) | undefined, apply: (($0: T) => void) | undefined): bool {
        const __gotots_callee_0 = cond;
        const __gotots_argument_0 = $go$copy$T0_to_T0($go$from_storage$T0_to_T0(Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
        if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0)) {
            Box.Change$kernel<T>(b, $go$constraint_method$dirty$Clone$T0_to_T0, $go$copy$T0_to_T0, $go$from_storage$T0_to_T0, $go$to_storage$T0_to_T0, apply);
            return true;
        }
        return false;
    }
    static Delete<T>(b: {
        value: Box<T>;
    } | undefined): void {
        Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).__go_delete = true;
    }
    static Dirty<T>(b: {
        value: Box<T>;
    } | undefined): bool {
        return Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty;
    }
    static Finalize$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$zero$void_to_T0: () => T): [
        T,
        bool
    ] {
        return [$go$copy$T0_to_T0(Box.Value$kernel<T>(b, $go$copy$T0_to_T0, $go$from_storage$T0_to_T0, $go$zero$void_to_T0)), Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty || Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).__go_delete];
    }
    static Locked$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$interface_adapt$PointerTo_Named_dirty$BoxOf_T0_to_Named_dirty$ValueOf_T0: ($0: {
        value: Box<T>;
    } | undefined) => Value<T> | undefined, fn: (($0: Value<T> | undefined) => void) | undefined): void {
        const __gotots_callee_2 = fn;
        const __gotots_argument_2 = $go$interface_adapt$PointerTo_Named_dirty$BoxOf_T0_to_Named_dirty$ValueOf_T0(b);
        (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
    }
    static Original$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T): T {
        return $go$copy$T0_to_T0($go$from_storage$T0_to_T0(Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).original));
    }
    static Set$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, value: T): void {
        Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value = $go$to_storage$T0_to_T0($go$copy$T0_to_T0(value));
        Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).__go_delete = false;
        Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty = true;
    }
    static Value$kernel<T>(b: {
        value: Box<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$zero$void_to_T0: () => T): T {
        if (Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).__go_delete) {
            let zero: T = $go$zero$void_to_T0();
            return $go$copy$T0_to_T0(zero);
        }
        return $go$copy$T0_to_T0($go$from_storage$T0_to_T0(Box.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
    }
}
export function NewBox$kernel<T>($go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, original: T): {
    value: Box<T>;
} | undefined {
    return { value: Box.$fromStorage<T>({
            original: $go$to_storage$T0_to_T0(original),
            value: $go$to_storage$T0_to_T0(original),
            dirty: false,
            __go_delete: false
        }) };
}
