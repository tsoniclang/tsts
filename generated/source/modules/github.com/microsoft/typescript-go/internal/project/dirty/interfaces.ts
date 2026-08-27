import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool } from "@gotots/runtime/scalars.js";
export interface Value<T> extends GoInterfaceValue {
    Change($argument0: (($0: T) => void) | undefined): void;
    ChangeIf($argument0: (($0: T) => bool) | undefined, $argument1: (($0: T) => void) | undefined): bool;
    Delete(): void;
    Dirty(): bool;
    Locked($argument0: (($0: Value<T> | undefined) => void) | undefined): void;
    Original(): T;
    Value(): T;
}
