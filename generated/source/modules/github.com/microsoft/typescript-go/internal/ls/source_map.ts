import type { gostring } from "@gotots/runtime/scalars.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class script {
    declare private readonly $goType: void;
    public constructor(public fileName: gostring, public text: gostring) {
    }
    declare private readonly then?: never;
    static FileName(s: script | undefined): gostring {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileName;
    }
    static Text(s: script | undefined): gostring {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).text;
    }
}
