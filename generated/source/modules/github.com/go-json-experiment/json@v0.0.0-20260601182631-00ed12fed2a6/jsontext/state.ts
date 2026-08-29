import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Kind } from "./token.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int64, uint, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { AppendUnquote as AppendUnquote__from_jsonwire, ConsumeSimpleString as ConsumeSimpleString__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $state } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/state.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../support/maps.js";
import { invalidateBufferByte$uint8 } from "./decode.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64, goUint64 } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export const maxNestingDepth$int: int = 10000;
export class state {
    declare private readonly $goType: void;
    public constructor(public Tokens: stateMachine, public Names: objectNameStack, public Namespaces: objectNamespaceStack) {
    }
    static $zero(): state {
        return new state(stateMachine.$zero(), objectNameStack.$zero(), new objectNamespaceStack(RuntimeSlice.nil<objectNamespace$Storage>()));
    }
    static $copy($source: state): state {
        return new state(stateMachine.$copy($source.Tokens), objectNameStack.$copy($source.Names), $source.Namespaces);
    }
    declare private readonly then?: never;
    static $go$private$jsontext$reset(s: tsonicTypeScriptRuntime.Location<state> | undefined): void {
        const __gotots_store_7 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<state>).value;
        stateMachine.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Tokens"));
        const __gotots_store_8 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<state>).value;
        objectNameStack.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Names"));
        const __gotots_store_9 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<state>).value;
        objectNamespaceStack.$go$private$jsontext$reset(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Namespaces"));
    }
    $go$private$jsontext$appendStackPointer(b: RuntimeSlice<uint8>, where: int): RuntimeSlice<uint8> {
        let objectDepth = 0;
        for (let i = 1; i < this.Tokens.Depth(); i++) {
            const __gotots_store_16 = this;
            let e: tsonicTypeScriptRuntime.Location<stateEntry> | undefined = stateMachine.$go$private$jsontext$index(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Tokens"), i);
            let arrayDelta = -1;
            {
                let isLast = i === this.Tokens.Depth() - 1;
                if (isLast) {
                    __gotots_control_target_9: {
                        if (where < 0 && ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.Length() === 0n || where === 0 && !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.$go$private$jsontext$needObjectValue() || where > 0 && ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.NeedObjectName()) {
                            return b;
                        }
                        else if (where > 0 && ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.$go$private$jsontext$isArray()) {
                            arrayDelta = 0;
                        }
                    }
                }
            }
            __gotots_control_target_10: {
                if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.$go$private$jsontext$isObject()) {
                    const __gotots_argument_2 = b.append(0, [47]);
                    const __gotots_store_17 = this;
                    const __gotots_argument_3 = objectNameStack.$go$private$jsontext$getUnquoted(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Names"), objectDepth);
                    b = appendEscapePointerName(__gotots_argument_2, __gotots_argument_3);
                    objectDepth++;
                }
                else if (((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.$go$private$jsontext$isArray()) {
                    b = strconv__from_gostdlib.AppendUint(b.append(0, [47]), BigInt.asUintN(64, goInt64(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.Length() + BigInt.asIntN(64, goNumberToBigInt(arrayDelta)))), BigInt.asIntN(64, goNumberToBigInt(10)));
                }
            }
        }
        return b;
    }
}
export class Pointer {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
    AppendToken(tok: gostring): Pointer {
        const __gotots_conversion_18 = ((void Pointer,
            this.$value + "/") as gostring);
        const __gotots_conversion_19 = RuntimeSlice.make<uint8>(__gotots_conversion_18.length, null, 0);
        for (let __gotots_conversion_20 = 0; __gotots_conversion_20 < __gotots_conversion_18.length; __gotots_conversion_20++) {
            __gotots_conversion_19.set(__gotots_conversion_20, __gotots_conversion_18.charCodeAt(__gotots_conversion_20));
        }
        const __gotots_argument_0 = __gotots_conversion_19;
        const __gotots_conversion_21 = tok;
        const __gotots_conversion_22 = RuntimeSlice.make<uint8>(__gotots_conversion_21.length, null, 0);
        for (let __gotots_conversion_23 = 0; __gotots_conversion_23 < __gotots_conversion_21.length; __gotots_conversion_23++) {
            __gotots_conversion_22.set(__gotots_conversion_23, __gotots_conversion_21.charCodeAt(__gotots_conversion_23));
        }
        const __gotots_argument_1 = __gotots_conversion_22;
        const __gotots_conversion_24 = appendEscapePointerName(__gotots_argument_0, __gotots_argument_1);
        let __gotots_conversion_25 = "";
        for (let __gotots_conversion_26 = 0; __gotots_conversion_26 < __gotots_conversion_24.length; __gotots_conversion_26++) {
            __gotots_conversion_25 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_24.get(__gotots_conversion_26)));
        }
        return new Pointer(__gotots_conversion_25);
    }
    Contains(pc: Pointer): bool {
        const __gotots_results_4 = strings__from_gostdlib.CutPrefix(pc.$value, this.$value);
        let suffix = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        return ok && (suffix === "" || goStringIndex(suffix, 0) === 47);
    }
    LastToken(): gostring {
        let last = new Pointer(goStringSlice(this.$value, globalThis.Math.max(globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(this.$value, 47))), 0)));
        return unescapePointerToken(strings__from_gostdlib.TrimPrefix(last.$value, "/"));
    }
    Parent(): Pointer {
        return new Pointer(goStringSlice(this.$value, 0, globalThis.Math.max(globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(this.$value, 47))), 0)));
    }
}
export function unescapePointerToken(token: gostring): gostring {
    if (strings__from_gostdlib.Contains(token, "~")) {
        token = strings__from_gostdlib.ReplaceAll(token, "~1", "/");
        token = strings__from_gostdlib.ReplaceAll(token, "~0", "~");
    }
    return token;
}
export function appendEscapePointerName(b: RuntimeSlice<uint8>, name: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
    const __gotots_conversion_0 = name;
    let __gotots_conversion_1 = "";
    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
        __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
    }
    const __gotots_range_1 = __gotots_conversion_1;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_1, __gotots_range_index_1);
        const __gotots_range_value_1 = __gotots_range_decode_0[0];
        let r = __gotots_range_value_1;
        __gotots_range_index_1 += __gotots_range_decode_0[1];
        switch (r) {
            case 126: {
                const __gotots_slice_build_4 = b;
                const __gotots_slice_build_5 = "~0";
                const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
                    __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
                }
                b = goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
                break;
            }
            case 47: {
                const __gotots_slice_build_8 = b;
                const __gotots_slice_build_9 = "~1";
                const __gotots_slice_build_10 = goSliceAllocate<uint8>(__gotots_slice_build_9.length, null);
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_9.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_10.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
                }
                b = goSliceAppendSlice<uint8>(__gotots_slice_build_8, __gotots_slice_build_10, 0);
                break;
            }
            default: {
                b = utf8__from_gostdlib.AppendRune(b, r);
                break;
            }
        }
    }
    return b;
}
export class stateMachine {
    declare private readonly $goType: void;
    public constructor(public Stack: RuntimeSlice<uint64>, public Last: stateEntry) {
    }
    static $zero(): stateMachine {
        return new stateMachine(RuntimeSlice.nil<uint64>(), new stateEntry(0n));
    }
    static $copy($source: stateMachine): stateMachine {
        return new stateMachine($source.Stack, $source.Last);
    }
    declare private readonly then?: never;
    static InvalidateDisabledNamespaces(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): void {
        const __gotots_range_0 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Depth();
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            let i = __gotots_range_value_0;
            let e: tsonicTypeScriptRuntime.Location<stateEntry> | undefined = stateMachine.$go$private$jsontext$index(m, i);
            if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateEntry>).value.$go$private$jsontext$isActiveNamespace()) {
                stateEntry.$go$private$jsontext$invalidateNamespace(e);
            }
        }
    }
    static $go$private$jsontext$appendLiteral(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        __gotots_control_target_1: {
            if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.NeedObjectName()) {
                return $state.ErrNonStringName;
            }
            else if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isValidNamespace()) {
                return $state.errInvalidNamespace;
            }
            else {
                const __gotots_store_2 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value;
                stateEntry.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Last"));
                return void 0;
            }
        }
    }
    static $go$private$jsontext$appendNumber(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        return stateMachine.$go$private$jsontext$appendLiteral(m);
    }
    static $go$private$jsontext$appendString(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        __gotots_control_target_2: {
            if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isValidNamespace()) {
                return $state.errInvalidNamespace;
            }
            else {
                const __gotots_store_3 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value;
                stateEntry.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Last"));
                return void 0;
            }
        }
    }
    static $go$private$jsontext$index(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined, i: int): tsonicTypeScriptRuntime.Location<stateEntry> | undefined {
        if (i === ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length) {
            const __gotots_store_0 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value;
            return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Last");
        }
        return tsonicTypeScriptRuntime.projectLocation<uint64, stateEntry>(goSliceAddress<uint64>(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack, i), ($go$storage: uint64): stateEntry => {
            return new stateEntry($go$storage);
        }, ($go$value: stateEntry): uint64 => {
            return $go$value.$value;
        });
    }
    static $go$private$jsontext$popArray(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        __gotots_control_target_6: {
            if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isArray() || ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length === 0) {
                return $state.errMismatchDelim;
            }
            else if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isValidNamespace()) {
                return $state.errInvalidNamespace;
            }
            else {
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last = new stateEntry(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.get(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length - 1));
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.slice(0, ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length - 1, null);
                return void 0;
            }
        }
    }
    static $go$private$jsontext$popObject(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        __gotots_control_target_4: {
            if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isObject()) {
                return $state.errMismatchDelim;
            }
            else if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$needObjectValue()) {
                return $state.errMissingValue;
            }
            else if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isValidNamespace()) {
                return $state.errInvalidNamespace;
            }
            else {
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last = new stateEntry(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.get(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length - 1));
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.slice(0, ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length - 1, null);
                return void 0;
            }
        }
    }
    static $go$private$jsontext$pushArray(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        __gotots_control_target_5: {
            if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.NeedObjectName()) {
                return $state.ErrNonStringName;
            }
            else if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isValidNamespace()) {
                return $state.errInvalidNamespace;
            }
            else if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length === maxNestingDepth$int) {
                return $state.errMaxDepth;
            }
            else {
                const __gotots_store_6 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value;
                stateEntry.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Last"));
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.append(((void stateEntry,
                    0n) as uint64), [((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$value]);
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last = stateTypeArray$constant();
                return void 0;
            }
        }
    }
    static $go$private$jsontext$pushObject(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): GoInterface | undefined {
        __gotots_control_target_3: {
            if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.NeedObjectName()) {
                return $state.ErrNonStringName;
            }
            else if (!((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$go$private$jsontext$isValidNamespace()) {
                return $state.errInvalidNamespace;
            }
            else if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.length === maxNestingDepth$int) {
                return $state.errMaxDepth;
            }
            else {
                const __gotots_store_4 = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value;
                stateEntry.Increment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Last"));
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.append(((void stateEntry,
                    0n) as uint64), [((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last.$value]);
                ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last = stateTypeObject$constant();
                return void 0;
            }
        }
    }
    static $go$private$jsontext$reset(m: tsonicTypeScriptRuntime.Location<stateMachine> | undefined): void {
        ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack = ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.slice(0, 0, null);
        if (((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack.capacity > 1024) {
            ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Stack = RuntimeSlice.nil<uint64>();
        }
        ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<stateMachine>).value.Last = stateTypeArray$constant();
    }
    Depth(): int {
        return this.Stack.length + 1;
    }
    DepthLength(): [
        int,
        int64
    ] {
        return [this.Depth(), this.Last.Length()];
    }
    MayAppendDelim(b: RuntimeSlice<uint8>, next: Kind): RuntimeSlice<uint8> {
        __gotots_control_target_0: {
            if (this.Last.$go$private$jsontext$needImplicitColon()) {
                return b.append(0, [58]);
            }
            else if (this.Last.$go$private$jsontext$needImplicitComma(next) && this.Stack.length !== 0) {
                return b.append(0, [44]);
            }
            else {
                return b;
            }
        }
    }
    NeedIndent(next: Kind): int {
        let n: int = 0;
        let willEnd = next === 125 || next === 93;
        __gotots_control_target_7: {
            if (this.Depth() === 1) {
                return 0;
            }
            else if (this.Last.Length() === 0n && willEnd) {
                return 0;
            }
            else if (this.Last.Length() === 0n || this.Last.$go$private$jsontext$needImplicitComma(next)) {
                return this.Depth();
            }
            else if (willEnd) {
                return this.Depth() - 1;
            }
            else {
                return 0;
            }
        }
    }
    $go$private$jsontext$needDelim(next: Kind): uint8 {
        let delim: uint8 = 0;
        __gotots_control_target_8: {
            if (this.Last.$go$private$jsontext$needImplicitColon()) {
                return 58;
            }
            else if (this.Last.$go$private$jsontext$needImplicitComma(next) && this.Stack.length !== 0) {
                return 44;
            }
            else {
                return 0;
            }
        }
    }
}
export class stateEntry {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
    static DisableNamespace(e: tsonicTypeScriptRuntime.Location<stateEntry> | undefined): void {
        const __gotots_store_11 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_11.value =
            new stateEntry(goUint64(__gotots_store_11.value.$value | 4611686018427387904n)));
    }
    static Increment(e: tsonicTypeScriptRuntime.Location<stateEntry> | undefined): void {
        const __gotots_store_10 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_10.value =
            new stateEntry(goUint64(__gotots_store_10.value.$value + 1n)));
    }
    static $go$private$jsontext$decrement(e: tsonicTypeScriptRuntime.Location<stateEntry> | undefined): void {
        const __gotots_store_15 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_15.value =
            new stateEntry(goUint64(__gotots_store_15.value.$value - 1n)));
    }
    static $go$private$jsontext$invalidateNamespace(e: tsonicTypeScriptRuntime.Location<stateEntry> | undefined): void {
        const __gotots_store_1 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_1.value =
            new stateEntry(goUint64(__gotots_store_1.value.$value | 2305843009213693952n)));
    }
    Length(): int64 {
        return BigInt.asIntN(64, ((void stateEntry,
            goUint64(this.$value & stateCountMask$constant().$value)) as uint64));
    }
    NeedObjectName(): bool {
        return ((void stateEntry,
            goUint64(this.$value & (new stateEntry(9223372036854775809n)).$value)) as uint64)
            ===
                ((void stateEntry,
                    9223372036854775808n) as uint64);
    }
    $go$private$jsontext$isActiveNamespace(): bool {
        return ((void stateEntry,
            goUint64(this.$value & (stateDisableNamespace$constant()).$value)) as uint64)
            ===
                ((void stateEntry,
                    0n) as uint64);
    }
    $go$private$jsontext$isArray(): bool {
        return ((void stateEntry,
            goUint64(this.$value & stateTypeMask$constant().$value)) as uint64)
            === stateTypeArray$constant().$value;
    }
    $go$private$jsontext$isObject(): bool {
        return ((void stateEntry,
            goUint64(this.$value & stateTypeMask$constant().$value)) as uint64)
            === stateTypeObject$constant().$value;
    }
    $go$private$jsontext$isValidNamespace(): bool {
        return ((void stateEntry,
            goUint64(this.$value & (stateInvalidNamespace$constant()).$value)) as uint64)
            ===
                ((void stateEntry,
                    0n) as uint64);
    }
    $go$private$jsontext$needImplicitColon(): bool {
        return this.$go$private$jsontext$needObjectValue();
    }
    $go$private$jsontext$needImplicitComma(next: Kind): bool {
        return !this.$go$private$jsontext$needObjectValue() && this.Length() > 0n && !(next === 125) && !(next === 93);
    }
    $go$private$jsontext$needObjectValue(): bool {
        return ((void stateEntry,
            goUint64(this.$value & (new stateEntry(9223372036854775809n)).$value)) as uint64)
            ===
                ((void stateEntry,
                    9223372036854775809n) as uint64);
    }
}
export function stateTypeMask$constant(): stateEntry {
    return new stateEntry(9223372036854775808n);
}
export function stateTypeObject$constant(): stateEntry {
    return new stateEntry(9223372036854775808n);
}
export function stateTypeArray$constant(): stateEntry {
    return new stateEntry(0n);
}
export function stateDisableNamespace$constant(): stateEntry {
    return new stateEntry(4611686018427387904n);
}
export function stateInvalidNamespace$constant(): stateEntry {
    return new stateEntry(2305843009213693952n);
}
export function stateCountMask$constant(): stateEntry {
    return new stateEntry(2305843009213693951n);
}
export class objectNameStack {
    declare private readonly $goType: void;
    public constructor(public offsets: RuntimeSlice<int>, public unquotedNames: RuntimeSlice<uint8>) {
    }
    static $zero(): objectNameStack {
        return new objectNameStack(RuntimeSlice.nil<int>(), RuntimeSlice.nil<uint8>());
    }
    static $copy($source: objectNameStack): objectNameStack {
        return new objectNameStack($source.offsets, $source.unquotedNames);
    }
    declare private readonly then?: never;
    static ReplaceLastQuotedOffset(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined, i: int): void {
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.set(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1, ~i);
    }
    static $go$private$jsontext$clearLast(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined): void {
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.set(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1, invalidOffset$int);
    }
    static $go$private$jsontext$copyQuotedBuffer(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined, b: RuntimeSlice<uint8>): void {
        let i = 0;
        for (i = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1; i >= 0 && ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i) < 0; i--) {
            continue;
        }
        for (i = i + 1; i < ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length; i++) {
            if (i === ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1 && ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i) === invalidOffset$int) {
                if (i === 0) {
                    ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.set(i, 0);
                }
                else {
                    ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.set(i, ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i - 1));
                }
                break;
            }
            let quotedName = b.slice(~((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i), null, null);
            if (quotedName.get(0) === invalidateBufferByte$uint8) {
                quotedName.set(0, 34);
            }
            let startOffset = 0;
            if (i > 0) {
                startOffset = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i - 1);
            }
            {
                let n = ConsumeSimpleString__from_jsonwire(quotedName);
                if (n > 0) {
                    ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames = goSliceAppendSlice<uint8>(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.slice(0, startOffset, null), quotedName.slice(1, n - 1, null), 0);
                }
                else {
                    const __gotots_store_14 = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value;
                    const __gotots_results_2 = AppendUnquote__from_jsonwire(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.slice(0, startOffset, null), quotedName);
                    __gotots_store_14.unquotedNames = __gotots_results_2[0];
                }
            }
            ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.set(i, ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.length);
        }
    }
    static $go$private$jsontext$ensureCopiedBuffer(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined): void {
        if (((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length > 0 && ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1) < 0) {
            const __gotots_argument_4 = new GoInterfaceAdapter("BUG: copyQuotedBuffer not called beforehand");
            GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        }
    }
    static $go$private$jsontext$getUnquoted(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined, i: int): RuntimeSlice<uint8> {
        objectNameStack.$go$private$jsontext$ensureCopiedBuffer(ns);
        if (i === 0) {
            return ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.slice(0, ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(0), null);
        }
        else {
            return ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.slice(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i - 1), ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(i), null);
        }
    }
    static $go$private$jsontext$pop(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined): void {
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.slice(0, ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1, null);
    }
    static $go$private$jsontext$push(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined): void {
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.append(0, [invalidOffset$int]);
    }
    static $go$private$jsontext$replaceLastUnquotedName(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined, s: gostring): void {
        objectNameStack.$go$private$jsontext$ensureCopiedBuffer(ns);
        let startOffset = 0;
        if (((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length > 1) {
            startOffset = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.get(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 2);
        }
        const __gotots_slice_build_12 = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.slice(0, startOffset, null);
        const __gotots_slice_build_13 = s;
        const __gotots_slice_build_14 = goSliceAllocate<uint8>(__gotots_slice_build_13.length, null);
        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_13.length; __gotots_slice_build_15++) {
            __gotots_slice_build_14.set(__gotots_slice_build_15, __gotots_slice_build_13.charCodeAt(__gotots_slice_build_15));
        }
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames = goSliceAppendSlice<uint8>(__gotots_slice_build_12, __gotots_slice_build_14, 0);
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.set(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.length - 1, ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.length);
    }
    static $go$private$jsontext$reset(ns: tsonicTypeScriptRuntime.Location<objectNameStack> | undefined): void {
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.slice(0, 0, null);
        ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames = ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.slice(0, 0, null);
        if (((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets.capacity > 64) {
            ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.offsets = RuntimeSlice.nil<int>();
        }
        if (((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames.capacity > 1024) {
            ((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNameStack>).value.unquotedNames = RuntimeSlice.nil<uint8>();
        }
    }
}
export const invalidOffset$int: int = -9223372036854776000;
export class objectNamespaceStack {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<objectNamespace$Storage>) {
    }
    declare private readonly then?: never;
    static $go$private$jsontext$pop(nss: tsonicTypeScriptRuntime.Location<objectNamespaceStack> | undefined): void {
        void ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new objectNamespaceStack((((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value).$value.slice(0, ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.$value.length - 1, null)));
    }
    static $go$private$jsontext$push(nss: tsonicTypeScriptRuntime.Location<objectNamespaceStack> | undefined): void {
        if (((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.$value.capacity > ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.$value.length) {
            void ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                new objectNamespaceStack((((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value).$value.slice(0, ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.$value.length + 1, null)));
            objectNamespace.$go$private$jsontext$reset(((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.Last());
        }
        else {
            const __gotots_store_5 = (nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_slice_build_0 = ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.$value;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void objectNamespace.$storageOf, (void objectNamespace.$fromStorage,
                    {
                        endOffsets: RuntimeSlice.nil<uint>(),
                        allUnquotedNames: RuntimeSlice.nil<uint8>(),
                        mapNames: GoMap.nil()
                    })));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<objectNamespace$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, objectNamespace.$storageOf(objectNamespace.$copy(objectNamespace.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void objectNamespace.$storageOf, (void objectNamespace.$fromStorage,
                    {
                        endOffsets: RuntimeSlice.nil<uint>(),
                        allUnquotedNames: RuntimeSlice.nil<uint8>(),
                        mapNames: GoMap.nil()
                    })));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, objectNamespace.$zeroStorage());
                }
            }
            void (__gotots_store_5.value =
                new objectNamespaceStack(__gotots_slice_build_1));
        }
    }
    static $go$private$jsontext$reset(nss: tsonicTypeScriptRuntime.Location<objectNamespaceStack> | undefined): void {
        if (((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value.$value.capacity > 1024) {
            void ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                new objectNamespaceStack(RuntimeSlice.nil<objectNamespace$Storage>()));
        }
        void ((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new objectNamespaceStack((((nss ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespaceStack>).value).$value.slice(0, 0, null)));
    }
    Last(): tsonicTypeScriptRuntime.Location<objectNamespace> | undefined {
        return tsonicTypeScriptRuntime.projectLocation<objectNamespace$Storage, objectNamespace>(goSliceAddress<objectNamespace$Storage>(this.$value, this.$value.length - 1), objectNamespace.$fromStorage, objectNamespace.$storageOf);
    }
}
export type objectNamespace$Storage = {
    endOffsets: RuntimeSlice<uint>;
    allUnquotedNames: RuntimeSlice<uint8>;
    mapNames: GoMapValue<gostring, GoEmptyStruct>;
};
export class objectNamespace {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: objectNamespace$Storage) {
    }
    public static $storageOf($source: objectNamespace): objectNamespace$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: objectNamespace$Storage): objectNamespace {
        return new objectNamespace($source);
    }
    public get endOffsets(): RuntimeSlice<uint> {
        return this.$storage.endOffsets;
    }
    public set endOffsets($value: RuntimeSlice<uint>) {
        this.$storage.endOffsets = $value;
    }
    public get allUnquotedNames(): RuntimeSlice<uint8> {
        return this.$storage.allUnquotedNames;
    }
    public set allUnquotedNames($value: RuntimeSlice<uint8>) {
        this.$storage.allUnquotedNames = $value;
    }
    public get mapNames(): GoMapValue<gostring, GoEmptyStruct> {
        return this.$storage.mapNames;
    }
    public set mapNames($value: GoMapValue<gostring, GoEmptyStruct>) {
        this.$storage.mapNames = $value;
    }
    static $copy($source: objectNamespace): objectNamespace {
        return new objectNamespace({
            endOffsets: $source.$storage.endOffsets,
            allUnquotedNames: $source.$storage.allUnquotedNames,
            mapNames: $source.$storage.mapNames
        });
    }
    static $zeroStorage(): objectNamespace$Storage {
        return {
            endOffsets: RuntimeSlice.nil<uint>(),
            allUnquotedNames: RuntimeSlice.nil<uint8>(),
            mapNames: GoMap.nil()
        };
    }
    declare private readonly then?: never;
    static InsertUnquoted(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined, name: RuntimeSlice<uint8>): bool {
        return objectNamespace.$go$private$jsontext$insert(ns, name, false);
    }
    static $go$private$jsontext$getUnquoted(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined, i: int): RuntimeSlice<uint8> {
        if (i === 0) {
            return objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(0, objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.get(0), null);
        }
        else {
            return objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.get(i - 1), objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.get(i), null);
        }
    }
    static $go$private$jsontext$insert(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined, name: RuntimeSlice<uint8>, quoted: bool): bool {
        let allNames = RuntimeSlice.nil<uint8>();
        if (quoted) {
            const __gotots_results_0 = AppendUnquote__from_jsonwire(objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames, name);
            allNames = __gotots_results_0[0];
        }
        else {
            allNames = goSliceAppendSlice<uint8>(objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames, name, 0);
        }
        name = allNames.slice(objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.length, null, null);
        if (objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames.isNil() && (objectNamespace.$go$private$jsontext$length(ns) > 64 || objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.length > 1024)) {
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames = GoMap.make(0, []);
            let startOffset = 0;
            const __gotots_range_2 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let endOffset = __gotots_range_value_2;
                let name__shadow_1 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(startOffset, endOffset, null);
                const __gotots_store_12 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames;
                const __gotots_conversion_3 = name__shadow_1;
                let __gotots_conversion_4 = "";
                for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                    __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                }
                __gotots_store_12.store(__gotots_conversion_4, new GoEmptyStruct);
                startOffset = endOffset;
            }
        }
        if (objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames.isNil()) {
            let startOffset = 0;
            const __gotots_range_3 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                let endOffset = __gotots_range_value_3;
                const __gotots_conversion_6 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(startOffset, endOffset, null);
                let __gotots_conversion_7 = "";
                for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                    __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                }
                const __gotots_binary_operand_0 = __gotots_conversion_7;
                const __gotots_conversion_9 = name;
                let __gotots_conversion_10 = "";
                for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                    __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
                }
                const __gotots_binary_operand_1 = __gotots_conversion_10;
                if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
                    return false;
                }
                startOffset = endOffset;
            }
        }
        else {
            {
                const __gotots_map_0 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames;
                const __gotots_conversion_12 = name;
                let __gotots_conversion_13 = "";
                for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
                    __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
                }
                const __gotots_map_1 = __gotots_conversion_13;
                const __gotots_results_1 = __gotots_map_0.lookupOk(__gotots_map_1);
                let ok = __gotots_results_1[1];
                if (ok) {
                    return false;
                }
            }
            const __gotots_store_13 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames;
            const __gotots_conversion_15 = name;
            let __gotots_conversion_16 = "";
            for (let __gotots_conversion_17 = 0; __gotots_conversion_17 < __gotots_conversion_15.length; __gotots_conversion_17++) {
                __gotots_conversion_16 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_15.get(__gotots_conversion_17)));
            }
            __gotots_store_13.store(__gotots_conversion_16, new GoEmptyStruct);
        }
        objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames = allNames;
        objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.append(0, [globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.length)))]);
        return true;
    }
    static $go$private$jsontext$insertQuoted(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined, name: RuntimeSlice<uint8>, isVerbatim: bool): bool {
        if (isVerbatim) {
            name = name.slice(1, name.length - 1, null);
        }
        return objectNamespace.$go$private$jsontext$insert(ns, name, !isVerbatim);
    }
    static $go$private$jsontext$lastUnquoted(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined): RuntimeSlice<uint8> {
        return objectNamespace.$go$private$jsontext$getUnquoted(ns, objectNamespace.$go$private$jsontext$length(ns) - 1);
    }
    static $go$private$jsontext$length(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined): int {
        return objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.length;
    }
    static $go$private$jsontext$removeLast(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined): void {
        if (!objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames.isNil()) {
            const __gotots_map_2 = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames;
            const __gotots_conversion_27 = objectNamespace.$go$private$jsontext$lastUnquoted(ns);
            let __gotots_conversion_28 = "";
            for (let __gotots_conversion_29 = 0; __gotots_conversion_29 < __gotots_conversion_27.length; __gotots_conversion_29++) {
                __gotots_conversion_28 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_27.get(__gotots_conversion_29)));
            }
            const __gotots_map_3 = __gotots_conversion_28;
            __gotots_map_2.delete(__gotots_map_3);
        }
        if (objectNamespace.$go$private$jsontext$length(ns) - 1 === 0) {
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.slice(0, 0, null);
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(0, 0, null);
        }
        else {
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.slice(0, objectNamespace.$go$private$jsontext$length(ns) - 1, null);
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(0, objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.get(objectNamespace.$go$private$jsontext$length(ns) - 1), null);
        }
    }
    static $go$private$jsontext$reset(ns: tsonicTypeScriptRuntime.Location<objectNamespace> | undefined): void {
        objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.slice(0, 0, null);
        objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames = objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.slice(0, 0, null);
        objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).mapNames = GoMap.nil();
        if (objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets.capacity > 64) {
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).endOffsets = RuntimeSlice.nil<uint>();
        }
        if (objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames.capacity > 1024) {
            objectNamespace.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<objectNamespace>).value).allUnquotedNames = RuntimeSlice.nil<uint8>();
        }
    }
}
