import type { ECMALineStarts as ECMALineStarts__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class ECMALineInfo {
    declare private readonly $goType: void;
    public constructor(public text: gostring, public lineStarts: ECMALineStarts__from_core) {
    }
    static $copy($source: ECMALineInfo): ECMALineInfo {
        return new ECMALineInfo($source.text, $source.lineStarts);
    }
    declare private readonly then?: never;
    static LineCount(li: {
        value: ECMALineInfo;
    } | undefined): int {
        return (li ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lineStarts.$value.length;
    }
    static LineText(li: {
        value: ECMALineInfo;
    } | undefined, line: int): gostring {
        let pos = (li ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lineStarts.$value.get(line);
        let end = 0;
        if (line + 1 < (li ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lineStarts.$value.length) {
            end = (li ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lineStarts.$value.get(line + 1);
        }
        else {
            end = (li ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.text.length | 0;
        }
        return goStringSlice((li ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.text, pos, end);
    }
}
export function CreateECMALineInfo(text: gostring, lineStarts: ECMALineStarts__from_core): {
    value: ECMALineInfo;
} | undefined {
    return { value: new ECMALineInfo(text, lineStarts) };
}
