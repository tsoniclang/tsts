import type { gostring } from "@gotots/runtime/scalars.js";
import { IsLineBreak as IsLineBreak__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { ECMALineInfo } from "./lineinfo.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function TryGetSourceMappingURL(lineInfo: {
    value: ECMALineInfo;
} | undefined): gostring {
    if (!(lineInfo === undefined)) {
        for (let index = ECMALineInfo.LineCount(lineInfo) - 1; index >= 0; index--) {
            let line = ECMALineInfo.LineText(lineInfo, index);
            line = strings__from_gostdlib.TrimLeftFunc(line, unicode__from_gostdlib.IsSpace);
            line = strings__from_gostdlib.TrimRightFunc(line, IsLineBreak__from_stringutil);
            if (line.length === 0) {
                continue;
            }
            if (line.length < 4 || !strings__from_gostdlib.HasPrefix(line, "//") || goStringIndex(line, 2) !== 35 && goStringIndex(line, 2) !== 64 || goStringIndex(line, 3) !== 32) {
                break;
            }
            {
                const __gotots_results_1 = strings__from_gostdlib.CutPrefix(goStringSlice(line, 4), "sourceMappingURL=");
                let url = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    return strings__from_gostdlib.TrimRightFunc(url, unicode__from_gostdlib.IsSpace);
                }
            }
        }
    }
    return "";
}
