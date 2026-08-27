import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, int, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/golang.org/x/text@v0.38.0/transform/state.js";
import { $goInterfaceMethod$Reset$void_to_void, $goInterfaceMethod$Span$SliceOf_byte_bool_to_int_Named_error, $goInterfaceMethod$Transform$SliceOf_byte_SliceOf_byte_bool_to_int_int_Named_error } from "../../../../../support/interface-methods.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface Transformer extends GoInterfaceValue {
    Reset(): void;
    Transform($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>, $argument2: bool): [
        int,
        int,
        GoInterface | undefined
    ];
}
export const Transformer$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Reset$void_to_void, $goInterfaceMethod$Transform$SliceOf_byte_SliceOf_byte_bool_to_int_int_Named_error]);
export function Transformer$is(value: GoInterfaceValue | undefined): value is Transformer {
    return value !== undefined && value.$go$implements(Transformer$contract);
}
export interface SpanningTransformer extends GoInterfaceValue {
    Reset(): void;
    Span($argument0: RuntimeSlice<uint8>, $argument1: bool): [
        int,
        GoInterface | undefined
    ];
    Transform($argument0: RuntimeSlice<uint8>, $argument1: RuntimeSlice<uint8>, $argument2: bool): [
        int,
        int,
        GoInterface | undefined
    ];
}
export const SpanningTransformer$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Reset$void_to_void, $goInterfaceMethod$Span$SliceOf_byte_bool_to_int_Named_error, $goInterfaceMethod$Transform$SliceOf_byte_SliceOf_byte_bool_to_int_int_Named_error]);
export function SpanningTransformer$is(value: GoInterfaceValue | undefined): value is SpanningTransformer {
    return value !== undefined && value.$go$implements(SpanningTransformer$contract);
}
export class NopResetter {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $zero(): NopResetter {
        return new NopResetter();
    }
    static $equal($left: NopResetter, $right: NopResetter): bool {
        return true;
    }
    static $hash($source: NopResetter): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    Reset(): void {
    }
}
export class nop {
    declare private readonly $goType: void;
    public constructor(public NopResetter: NopResetter) {
    }
    static $equal($left: nop, $right: nop): bool {
        return NopResetter.$equal($left.NopResetter, $right.NopResetter);
    }
    static $hash($source: nop): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, NopResetter.$hash($source.NopResetter));
        return $hash;
    }
    declare private readonly then?: never;
    Span(src: RuntimeSlice<uint8>, atEOF: bool): [
        int,
        GoInterface | undefined
    ] {
        let n: int = 0;
        let err: GoInterface | undefined = void 0;
        return [src.length, void 0];
    }
    Transform(dst: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>, atEOF: bool): [
        int,
        int,
        GoInterface | undefined
    ] {
        let nDst: int = 0;
        let nSrc: int = 0;
        let err: GoInterface | undefined = void 0;
        let n = RuntimeSlice.copy<uint8>(dst, src);
        if (n < src.length) {
            err = $state.ErrShortDst;
        }
        return [n, n, err];
    }
}
export class discard {
    declare private readonly $goType: void;
    public constructor(public NopResetter: NopResetter) {
    }
    static $equal($left: discard, $right: discard): bool {
        return NopResetter.$equal($left.NopResetter, $right.NopResetter);
    }
    static $hash($source: discard): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, NopResetter.$hash($source.NopResetter));
        return $hash;
    }
    declare private readonly then?: never;
    Transform(dst: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>, atEOF: bool): [
        int,
        int,
        GoInterface | undefined
    ] {
        let nDst: int = 0;
        let nSrc: int = 0;
        let err: GoInterface | undefined = void 0;
        return [0, src.length, void 0];
    }
}
