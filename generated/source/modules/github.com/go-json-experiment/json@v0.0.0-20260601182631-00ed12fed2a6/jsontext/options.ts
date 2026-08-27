import type { Options as Options__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { Bools as Bools__from_jsonflags } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { IndentPrefix as IndentPrefix__from_jsonopts, Indent as Indent__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import { QuoteRune as QuoteRune__from_jsonwire } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/package.js";
import { $goInterfaceAdapter$Named_jsonflags$Bools, $goInterfaceAdapter$Named_jsonopts$Indent, $goInterfaceAdapter$Named_jsonopts$IndentPrefix, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function AllowDuplicateNames(v: bool): Options__from_jsonopts | undefined {
    if (v) {
        return new $goInterfaceAdapter$Named_jsonflags$Bools(new Bools__from_jsonflags(3n));
    }
    else {
        return new $goInterfaceAdapter$Named_jsonflags$Bools(new Bools__from_jsonflags(2n));
    }
}
export function AllowInvalidUTF8(v: bool): Options__from_jsonopts | undefined {
    if (v) {
        return new $goInterfaceAdapter$Named_jsonflags$Bools(new Bools__from_jsonflags(5n));
    }
    else {
        return new $goInterfaceAdapter$Named_jsonflags$Bools(new Bools__from_jsonflags(4n));
    }
}
export function WithIndent(indent: gostring): Options__from_jsonopts | undefined {
    switch (indent) {
        case "\t": {
            return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts("\t"));
            break;
        }
        case "    ": {
            return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts("    "));
            break;
        }
        case "   ": {
            return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts("   "));
            break;
        }
        case "  ": {
            return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts("  "));
            break;
        }
        case " ": {
            return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts(" "));
            break;
        }
        case "": {
            return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts(""));
            break;
        }
    }
    {
        let s = strings__from_gostdlib.Trim(indent, " \t");
        if (s.length > 0) {
            const __gotots_binary_operand_4 = "json: invalid character ";
            const __gotots_conversion_3 = s;
            const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
            }
            const __gotots_argument_2 = __gotots_conversion_4;
            const __gotots_binary_operand_5 = QuoteRune__from_jsonwire(__gotots_argument_2);
            const __gotots_binary_operand_6 = __gotots_binary_operand_4 + __gotots_binary_operand_5;
            const __gotots_binary_operand_7 = " in indent";
            const __gotots_argument_3 = new GoInterfaceAdapter(__gotots_binary_operand_6 + __gotots_binary_operand_7);
            GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
        }
    }
    return new $goInterfaceAdapter$Named_jsonopts$Indent(new Indent__from_jsonopts(indent));
}
export function WithIndentPrefix(prefix: gostring): Options__from_jsonopts | undefined {
    {
        let s = strings__from_gostdlib.Trim(prefix, " \t");
        if (s.length > 0) {
            const __gotots_binary_operand_0 = "json: invalid character ";
            const __gotots_conversion_0 = s;
            const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
            }
            const __gotots_argument_0 = __gotots_conversion_1;
            const __gotots_binary_operand_1 = QuoteRune__from_jsonwire(__gotots_argument_0);
            const __gotots_binary_operand_2 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
            const __gotots_binary_operand_3 = " in indent prefix";
            const __gotots_argument_1 = new GoInterfaceAdapter(__gotots_binary_operand_2 + __gotots_binary_operand_3);
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
    }
    return new $goInterfaceAdapter$Named_jsonopts$IndentPrefix(new IndentPrefix__from_jsonopts(prefix));
}
