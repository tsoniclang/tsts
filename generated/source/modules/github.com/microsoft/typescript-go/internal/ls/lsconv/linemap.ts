import type { TextPos as TextPos__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class LSPLineStarts {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<TextPos__from_core>) {
    }
    declare private readonly then?: never;
}
export class LSPLineMap {
    declare private readonly $goType: void;
    public constructor(public LineStarts: LSPLineStarts, public AsciiOnly: bool) {
    }
    static $copy($source: LSPLineMap): LSPLineMap {
        return new LSPLineMap($source.LineStarts, $source.AsciiOnly);
    }
    declare private readonly then?: never;
}
export function ComputeLSPLineStarts(text: gostring): {
    value: LSPLineMap;
} | undefined {
    let lineStarts = RuntimeSlice.make<TextPos__from_core>(0, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(text, "\n"))) + 1, 0);
    let asciiOnly = true;
    let textLen = text.length | 0;
    let pos = 0;
    let lineStart = 0;
    for (; pos < textLen;) {
        let b = goStringIndex(text, pos);
        if (b < RuneSelf$uint8__from_utf8) {
            pos = pos + 1;
            {
                const __gotots_switch_tag_0 = b;
                let __gotots_switch_selection_0 = -1;
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_0 = false;
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 13;
                    }
                    if (__gotots_switch_match_0) {
                        __gotots_switch_selection_0 = 0;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_1 = false;
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 = __gotots_switch_tag_0 === 10;
                    }
                    if (__gotots_switch_match_1) {
                        __gotots_switch_selection_0 = 1;
                    }
                }
                __gotots_control_target_0: {
                    if (__gotots_switch_selection_0 === 0) {
                        if (pos < textLen && goStringIndex(text, pos) === 10) {
                            pos = pos + 1;
                        }
                        __gotots_switch_selection_0 = 1;
                    }
                    if (__gotots_switch_selection_0 === 1) {
                        lineStarts = lineStarts.append(0, [lineStart]);
                        lineStart = pos;
                        break __gotots_control_target_0;
                    }
                }
            }
        }
        else {
            const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
            const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
                int32,
                int
            ];
            let size = __gotots_results_1[1];
            pos = pos + (size | 0);
            asciiOnly = false;
        }
    }
    lineStarts = lineStarts.append(0, [lineStart]);
    return { value: new LSPLineMap(new LSPLineStarts(lineStarts), asciiOnly) };
}
