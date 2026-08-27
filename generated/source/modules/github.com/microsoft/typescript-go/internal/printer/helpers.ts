import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class Priority {
    declare private readonly $goType: void;
    public constructor(public Value: int) {
    }
    static $copy($source: Priority): Priority {
        return new Priority($source.Value);
    }
    static $equal($left: Priority, $right: Priority): bool {
        return $left.Value === $right.Value;
    }
    static $hash($source: Priority): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class EmitHelper {
    declare private readonly $goType: void;
    public constructor(public Name: gostring, public Scoped: bool, public Text: gostring, public TextCallback: (($0: (($0: gostring) => gostring) | undefined) => gostring) | undefined, public Priority: {
        value: Priority;
    } | undefined, public Dependencies: RuntimeSlice<{
        value: EmitHelper;
    } | undefined>, public ImportName: gostring) {
    }
    static $copy($source: EmitHelper): EmitHelper {
        return new EmitHelper($source.Name, $source.Scoped, $source.Text, $source.TextCallback, $source.Priority, $source.Dependencies, $source.ImportName);
    }
    declare private readonly then?: never;
}
export function compareEmitHelpers(x: {
    value: EmitHelper;
} | undefined, y: {
    value: EmitHelper;
} | undefined): int {
    if (x
        ===
            y) {
        return 0;
    }
    if ((x ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Priority
        ===
            (y ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Priority) {
        return 0;
    }
    if ((x ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Priority === undefined) {
        return 1;
    }
    if ((y ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Priority === undefined) {
        return -1;
    }
    return ((x ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Priority ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value - ((y ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Priority ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value;
}
