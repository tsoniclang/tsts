import type { bool, gostring, uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { Tag } from "./language.js";
import { langNoIndexOffset$uint16 } from "./tables.js";
export type CompactCoreInfo = uint32;
export function GetCompactCore(t: Tag): [
    CompactCoreInfo,
    bool
] {
    let cci: CompactCoreInfo = 0;
    let ok: bool = false;
    if (Tag.$storageOf(t).LangID > langNoIndexOffset$uint16) {
        return [0, false];
    }
    cci = (cci | Tag.$storageOf(t).LangID << (20) >>> 0) >>> 0;
    cci = (cci | Tag.$storageOf(t).ScriptID << 12 >>> 0) >>> 0;
    cci = (cci | Tag.$storageOf(t).RegionID) >>> 0;
    return [cci, true];
}
export function CompactCoreInfo_Tag(c: CompactCoreInfo): Tag {
    return Tag.$fromStorage({
        LangID: c >>> 20 & 65535,
        RegionID: (c & 1023) >>> 0 & 65535,
        ScriptID: c >>> 12 & 65535 & 255,
        pVariant: 0,
        pExt: 0,
        str: ""
    });
}
