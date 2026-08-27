import type { Tristate } from "./tristate.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Equal$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class TypeAcquisition {
    declare private readonly $goType: void;
    public constructor(public Enable: Tristate, public Include: RuntimeSlice<gostring>, public Exclude: RuntimeSlice<gostring>, public DisableFilenameBasedTypeAcquisition: Tristate) {
    }
    static $copy($source: TypeAcquisition): TypeAcquisition {
        return new TypeAcquisition($source.Enable, $source.Include, $source.Exclude, $source.DisableFilenameBasedTypeAcquisition);
    }
    declare private readonly then?: never;
    static Equals(ta: {
        value: TypeAcquisition;
    } | undefined, other: {
        value: TypeAcquisition;
    } | undefined): bool {
        if (ta
            ===
                other) {
            return true;
        }
        if (ta === undefined || other === undefined) {
            return false;
        }
        return ((ta ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable === (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable && Equal$SliceOf_string$string((ta ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Include, (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Include) && Equal$SliceOf_string$string((ta ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Exclude, (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Exclude) && (ta ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableFilenameBasedTypeAcquisition === (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableFilenameBasedTypeAcquisition);
    }
}
