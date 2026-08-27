import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { appendUint32s } from "./encoder.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class stringTable {
    declare private readonly $goType: void;
    public constructor(public fileText: gostring, public otherStrings: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, public offsets: RuntimeSlice<uint32>) {
    }
    declare private readonly then?: never;
    static $go$private$encoder$add(t: stringTable | undefined, text: gostring, kind: Kind__from_ast, pos: int, end: int): uint32 {
        let index = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets.length >>> 0;
        if (kind === KindSourceFile$constant__from_ast()) {
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets.append(0, [pos >>> 0, end >>> 0]);
            return index;
        }
        let length = text.length;
        if (end - pos > 0 && end <= (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileText.length) {
            let endOffset = 0;
            if (kind === KindStringLiteral$constant__from_ast() || kind === KindTemplateTail$constant__from_ast() || kind === KindNoSubstitutionTemplateLiteral$constant__from_ast()) {
                endOffset = 1;
            }
            end = end - endOffset;
            let start = end - length;
            let fileSlice = goStringSlice((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileText, start, end);
            if (fileSlice === text) {
                (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets.append(0, [start >>> 0, end >>> 0]);
                return index;
            }
        }
        const __gotots_binary_operand_4 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileText.length;
        const __gotots_receiver_3 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).otherStrings;
        const __gotots_binary_operand_5 = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(__gotots_receiver_3 === void 0 ? void 0 :
            (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value)));
        let offset = __gotots_binary_operand_4 + __gotots_binary_operand_5;
        const __gotots_receiver_4 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).otherStrings;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_4 === void 0 ? void 0 :
            (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, text);
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets.append(0, [offset >>> 0, offset + length >>> 0]);
        return index;
    }
    static $go$private$encoder$encode(t: stringTable | undefined): RuntimeSlice<uint8> {
        let result = RuntimeSlice.make<uint8>(0, stringTable.$go$private$encoder$encodedLength(t), 0);
        result = appendUint32s(result, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets);
        const __gotots_slice_build_0 = result;
        const __gotots_slice_build_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileText;
        const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
            __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
        }
        result = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
        const __gotots_argument_0 = result;
        const __gotots_receiver_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).otherStrings;
        const __gotots_argument_1 = strings__from_gostdlib.Builder.String(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value);
        const __gotots_slice_build_4 = __gotots_argument_0;
        const __gotots_slice_build_5 = __gotots_argument_1;
        const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
            __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
        }
        result = goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
        return result;
    }
    static $go$private$encoder$encodedLength(t: stringTable | undefined): int {
        const __gotots_binary_operand_2 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).offsets.length * 4 + (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileText.length;
        const __gotots_receiver_2 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).otherStrings;
        const __gotots_binary_operand_3 = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(__gotots_receiver_2 === void 0 ? void 0 :
            (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value)));
        return __gotots_binary_operand_2 + __gotots_binary_operand_3;
    }
    static $go$private$encoder$stringLength(t: stringTable | undefined): int {
        const __gotots_binary_operand_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileText.length;
        const __gotots_receiver_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).otherStrings;
        const __gotots_binary_operand_1 = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value)));
        return __gotots_binary_operand_0 + __gotots_binary_operand_1;
    }
}
export function newStringTable(fileText: gostring, stringCount: int): stringTable | undefined {
    const __gotots_struct_0 = named_strings.StringsBuilderOperations.$zero();
    let builder: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined = tsonicTypeScriptRuntime.location<strings__from_gostdlib.Builder>(__gotots_struct_0);
    return new stringTable(fileText, builder, RuntimeSlice.make<uint32>(0, stringCount * 2, 0));
}
