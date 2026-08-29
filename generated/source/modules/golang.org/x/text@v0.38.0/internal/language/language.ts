import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Language, Region, Script } from "./lookup.js";
import type { scanner } from "./parse.js";
import type { bool, gostring, int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/state.js";
import { $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Language_String, Language_StringToBuf, Region_Contains, Region_String, Script_String, getRegionID } from "./lookup.js";
import { addTags } from "./match.js";
import { Parse, getExtension, makeScanner, nextExtension, parseExtensions } from "./parse.js";
import { parentRel } from "./tables.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoArray } from "@gotots/runtime/array.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export const maxCoreSize$int: int = 12;
export type Tag$Storage = {
    LangID: uint16;
    RegionID: uint16;
    ScriptID: uint16;
    pVariant: uint8;
    pExt: uint16;
    str: gostring;
};
export class Tag {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Tag$Storage) {
    }
    public static $storageOf($source: Tag): Tag$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Tag$Storage): Tag {
        return new Tag($source);
    }
    public get LangID(): Language {
        return this.$storage.LangID;
    }
    public set LangID($value: Language) {
        this.$storage.LangID = $value;
    }
    public get RegionID(): Region {
        return this.$storage.RegionID;
    }
    public set RegionID($value: Region) {
        this.$storage.RegionID = $value;
    }
    public get ScriptID(): Script {
        return this.$storage.ScriptID;
    }
    public set ScriptID($value: Script) {
        this.$storage.ScriptID = $value;
    }
    public get pVariant(): uint8 {
        return this.$storage.pVariant;
    }
    public set pVariant($value: uint8) {
        this.$storage.pVariant = $value;
    }
    public get pExt(): uint16 {
        return this.$storage.pExt;
    }
    public set pExt($value: uint16) {
        this.$storage.pExt = $value;
    }
    public get str(): gostring {
        return this.$storage.str;
    }
    public set str($value: gostring) {
        this.$storage.str = $value;
    }
    static $zero(): Tag {
        return new Tag({
            LangID: 0,
            RegionID: 0,
            ScriptID: 0,
            pVariant: 0,
            pExt: 0,
            str: ""
        });
    }
    static $copy($source: Tag): Tag {
        return new Tag({
            LangID: $source.$storage.LangID,
            RegionID: $source.$storage.RegionID,
            ScriptID: $source.$storage.ScriptID,
            pVariant: $source.$storage.pVariant,
            pExt: $source.$storage.pExt,
            str: $source.$storage.str
        });
    }
    static $equal($left: Tag, $right: Tag): bool {
        return $left.$storage.LangID === $right.$storage.LangID && $left.$storage.RegionID === $right.$storage.RegionID && $left.$storage.ScriptID === $right.$storage.ScriptID && $left.$storage.pVariant === $right.$storage.pVariant && $left.$storage.pExt === $right.$storage.pExt && $left.$storage.str === $right.$storage.str;
    }
    static $hash($source: Tag): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.LangID));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.RegionID));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.ScriptID));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.pVariant));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.pExt));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.str));
        return $hash;
    }
    static $zeroStorage(): Tag$Storage {
        return {
            LangID: 0,
            RegionID: 0,
            ScriptID: 0,
            pVariant: 0,
            pExt: 0,
            str: ""
        };
    }
    declare private readonly then?: never;
    static RemakeString(t: tsonicTypeScriptRuntime.Location<Tag> | undefined): void {
        if (Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).str === "") {
            return;
        }
        let extra = goStringSlice(Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).str, Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant);
        if (Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant > 0) {
            extra = goStringSlice(extra, 1);
        }
        if (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value.$go$private$language$equalTags(Tag.$copy(Tag.$fromStorage($state.Und))) && strings__from_gostdlib.HasPrefix(extra, "x-")) {
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).str = extra;
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant = 0;
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pExt = 0;
            return;
        }
        let buf = GoArray.zero<uint8, 32>(32, 0);
        let b = goArraySlice(buf, 0, Tag.$go$private$language$genCoreBytes(t, goArraySlice(buf, 0, null, null)), null);
        if (extra !== "") {
            let diff = b.length - Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant;
            b = b.append(0, [45]);
            const __gotots_slice_build_0 = b;
            const __gotots_slice_build_1 = extra;
            const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
            }
            b = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant = Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant + diff & 255;
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pExt = Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pExt + diff & 65535;
        }
        else {
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pVariant = b.length & 255;
            Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).pExt = b.length & 65535;
        }
        const __gotots_conversion_0 = b;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).str = __gotots_conversion_1;
    }
    static $go$private$language$genCoreBytes(t: tsonicTypeScriptRuntime.Location<Tag> | undefined, buf: RuntimeSlice<uint8>): int {
        let n = Language_StringToBuf(Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).LangID, buf.slice(0, null, null));
        if (!(Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).ScriptID === 0)) {
            const __gotots_slice_build_4 = buf.slice(n, null, null);
            const __gotots_slice_build_5 = "-";
            const __gotots_slice_build_6 = globalThis.Math.min(__gotots_slice_build_4.length, __gotots_slice_build_5.length);
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6; __gotots_slice_build_7++) {
                __gotots_slice_build_4.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
            }
            n = n + __gotots_slice_build_6;
            const __gotots_slice_build_8 = buf.slice(n, null, null);
            const __gotots_slice_build_9 = Script_String(Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).ScriptID);
            const __gotots_slice_build_10 = globalThis.Math.min(__gotots_slice_build_8.length, __gotots_slice_build_9.length);
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_10; __gotots_slice_build_11++) {
                __gotots_slice_build_8.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
            }
            n = n + __gotots_slice_build_10;
        }
        if (!(Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).RegionID === 0)) {
            const __gotots_slice_build_12 = buf.slice(n, null, null);
            const __gotots_slice_build_13 = "-";
            const __gotots_slice_build_14 = globalThis.Math.min(__gotots_slice_build_12.length, __gotots_slice_build_13.length);
            for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_14; __gotots_slice_build_15++) {
                __gotots_slice_build_12.set(__gotots_slice_build_15, __gotots_slice_build_13.charCodeAt(__gotots_slice_build_15));
            }
            n = n + __gotots_slice_build_14;
            const __gotots_slice_build_16 = buf.slice(n, null, null);
            const __gotots_slice_build_17 = Region_String(Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).RegionID);
            const __gotots_slice_build_18 = globalThis.Math.min(__gotots_slice_build_16.length, __gotots_slice_build_17.length);
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_18; __gotots_slice_build_19++) {
                __gotots_slice_build_16.set(__gotots_slice_build_19, __gotots_slice_build_17.charCodeAt(__gotots_slice_build_19));
            }
            n = n + __gotots_slice_build_18;
        }
        return n;
    }
    static $go$private$language$setUndefinedLang(t: Tag | undefined, id: Language): void {
        if (Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).LangID === 0) {
            Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).LangID = id;
        }
    }
    static $go$private$language$setUndefinedRegion(t: Tag | undefined, id: Region): void {
        if (Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).RegionID === 0 || Region_Contains(Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).RegionID, id)) {
            Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).RegionID = id;
        }
    }
    static $go$private$language$setUndefinedScript(t: Tag | undefined, id: Script): void {
        if (Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).ScriptID === 0) {
            Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).ScriptID = id;
        }
    }
    Extension(x: uint8): [
        gostring,
        bool
    ] {
        let ext: gostring = "";
        let ok: bool = false;
        for (let i = Tag.$storageOf(this).pExt; i < Tag.$storageOf(this).str.length - 1;) {
            let ext__shadow_1 = "";
            const __gotots_results_4 = getExtension(Tag.$storageOf(this).str, i);
            i = __gotots_results_4[0];
            ext__shadow_1 = __gotots_results_4[1];
            if (goStringIndex(ext__shadow_1, 0) === x) {
                return [ext__shadow_1, true];
            }
        }
        return ["", false];
    }
    Extensions(): RuntimeSlice<gostring> {
        let e = RuntimeSlice.literal<gostring>([]);
        for (let i = Tag.$storageOf(this).pExt; i < Tag.$storageOf(this).str.length - 1;) {
            let ext = "";
            const __gotots_results_10 = getExtension(Tag.$storageOf(this).str, i);
            i = __gotots_results_10[0];
            ext = __gotots_results_10[1];
            e = e.append("", [ext]);
        }
        return e;
    }
    HasExtensions(): bool {
        return this.pExt < this.str.length;
    }
    HasString(): bool {
        return this.str !== "";
    }
    HasVariants(): bool {
        return this.pVariant < this.pExt;
    }
    IsPrivateUse(): bool {
        return this.str !== "" && this.pVariant === 0;
    }
    IsRoot(): bool {
        if (Tag.$storageOf(this).pVariant < Tag.$storageOf(this).str.length) {
            return false;
        }
        return this.$go$private$language$equalTags(Tag.$copy(Tag.$fromStorage($state.Und)));
    }
    MarshalText(): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next => t = t$next);
        let text: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
        let err: GoInterface | undefined = void 0;
        if (Tag.$storageOf(t).str !== "") {
            const __gotots_slice_build_36 = text;
            const __gotots_slice_build_37 = Tag.$storageOf(t).str;
            const __gotots_slice_build_38 = goSliceAllocate<uint8>(__gotots_slice_build_37.length, null);
            for (let __gotots_slice_build_39 = 0; __gotots_slice_build_39 < __gotots_slice_build_37.length; __gotots_slice_build_39++) {
                __gotots_slice_build_38.set(__gotots_slice_build_39, __gotots_slice_build_37.charCodeAt(__gotots_slice_build_39));
            }
            text = goSliceAppendSlice<uint8>(__gotots_slice_build_36, __gotots_slice_build_38, 0);
        }
        else if (Tag.$storageOf(t).ScriptID === 0 && Tag.$storageOf(t).RegionID === 0) {
            const __gotots_slice_build_40 = text;
            const __gotots_slice_build_41 = Language_String(Tag.$storageOf(t).LangID);
            const __gotots_slice_build_42 = goSliceAllocate<uint8>(__gotots_slice_build_41.length, null);
            for (let __gotots_slice_build_43 = 0; __gotots_slice_build_43 < __gotots_slice_build_41.length; __gotots_slice_build_43++) {
                __gotots_slice_build_42.set(__gotots_slice_build_43, __gotots_slice_build_41.charCodeAt(__gotots_slice_build_43));
            }
            text = goSliceAppendSlice<uint8>(__gotots_slice_build_40, __gotots_slice_build_42, 0);
        }
        else {
            let buf = GoArray.literal<uint8, 12>(12, 0, [], []);
            text = goArraySlice(buf, 0, Tag.$go$private$language$genCoreBytes(t$location, goArraySlice(buf, 0, null, null)), null);
        }
        return [text, void 0];
    }
    Maximize(): [
        Tag,
        GoInterface | undefined
    ] {
        return addTags(Tag.$copy(this));
    }
    Parent(): Tag {
        let t: Tag = Tag.$copy(this);
        if (Tag.$storageOf(t).str !== "") {
            const __gotots_results_5 = t.Raw();
            let b = __gotots_results_5[0];
            let s = __gotots_results_5[1];
            let r = __gotots_results_5[2];
            t = Tag.$fromStorage({
                LangID: b,
                ScriptID: s,
                RegionID: r,
                pVariant: 0,
                pExt: 0,
                str: ""
            });
            if (Tag.$storageOf(t).RegionID === 0 && !(Tag.$storageOf(t).ScriptID === 0) && !(Tag.$storageOf(t).LangID === 0)) {
                const __gotots_results_6 = addTags(Tag.$fromStorage({
                    LangID: Tag.$storageOf(t).LangID,
                    RegionID: 0,
                    ScriptID: 0,
                    pVariant: 0,
                    pExt: 0,
                    str: ""
                }));
                let base__shadow_1 = __gotots_results_6[0];
                if (Tag.$storageOf(base__shadow_1).ScriptID === Tag.$storageOf(t).ScriptID) {
                    return Tag.$fromStorage({
                        LangID: Tag.$storageOf(t).LangID,
                        RegionID: 0,
                        ScriptID: 0,
                        pVariant: 0,
                        pExt: 0,
                        str: ""
                    });
                }
            }
            return Tag.$copy(t);
        }
        if (!(Tag.$storageOf(t).LangID === 0)) {
            if (!(Tag.$storageOf(t).RegionID === 0)) {
                let maxScript = Tag.$storageOf(t).ScriptID;
                if (maxScript === 0) {
                    const __gotots_results_7 = addTags(Tag.$copy(t));
                    let max = __gotots_results_7[0];
                    maxScript = Tag.$storageOf(max).ScriptID;
                }
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < 5; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_index_0;
                    let i = __gotots_range_value_0;
                    if ((void parentRel.$storageOf, (void parentRel.$fromStorage,
                        $state.parents.get(i))).lang === Tag.$storageOf(t).LangID && (void parentRel.$storageOf, (void parentRel.$fromStorage,
                        $state.parents.get(i))).maxScript === maxScript) {
                        const __gotots_range_0 = (void parentRel.$storageOf, (void parentRel.$fromStorage,
                            $state.parents.get(i))).fromRegion;
                        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_0.length; __gotots_range_index_1++) {
                            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_1);
                            let r = __gotots_range_value_1;
                            if (r === Tag.$storageOf(t).RegionID) {
                                return Tag.$fromStorage({
                                    LangID: Tag.$storageOf(t).LangID,
                                    ScriptID: (void parentRel.$storageOf, (void parentRel.$fromStorage,
                                        $state.parents.get(i))).script,
                                    RegionID: (void parentRel.$storageOf, (void parentRel.$fromStorage,
                                        $state.parents.get(i))).toRegion,
                                    pVariant: 0,
                                    pExt: 0,
                                    str: ""
                                });
                            }
                        }
                    }
                }
                const __gotots_results_8 = addTags(Tag.$fromStorage({
                    LangID: Tag.$storageOf(t).LangID,
                    RegionID: 0,
                    ScriptID: 0,
                    pVariant: 0,
                    pExt: 0,
                    str: ""
                }));
                let base__shadow_1 = __gotots_results_8[0];
                if (!(Tag.$storageOf(base__shadow_1).ScriptID === maxScript)) {
                    return Tag.$fromStorage({
                        LangID: Tag.$storageOf(t).LangID,
                        ScriptID: maxScript,
                        RegionID: 0,
                        pVariant: 0,
                        pExt: 0,
                        str: ""
                    });
                }
                return Tag.$fromStorage({
                    LangID: Tag.$storageOf(t).LangID,
                    RegionID: 0,
                    ScriptID: 0,
                    pVariant: 0,
                    pExt: 0,
                    str: ""
                });
            }
            else if (!(Tag.$storageOf(t).ScriptID === 0)) {
                const __gotots_results_9 = addTags(Tag.$fromStorage({
                    LangID: Tag.$storageOf(t).LangID,
                    RegionID: 0,
                    ScriptID: 0,
                    pVariant: 0,
                    pExt: 0,
                    str: ""
                }));
                let base__shadow_1 = __gotots_results_9[0];
                if (!(Tag.$storageOf(base__shadow_1).ScriptID === Tag.$storageOf(t).ScriptID)) {
                    return Tag.$copy(Tag.$fromStorage($state.Und));
                }
                return Tag.$fromStorage({
                    LangID: Tag.$storageOf(t).LangID,
                    RegionID: 0,
                    ScriptID: 0,
                    pVariant: 0,
                    pExt: 0,
                    str: ""
                });
            }
        }
        return Tag.$copy(Tag.$fromStorage($state.Und));
    }
    Raw(): [
        Language,
        Script,
        Region
    ] {
        let b: Language = 0;
        let s: Script = 0;
        let r: Region = 0;
        return [this.LangID, this.ScriptID, this.RegionID];
    }
    SetTypeForKey(key: gostring, value: gostring): [
        Tag,
        GoInterface | undefined
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next2 => t = t$next2);
        if (t.IsPrivateUse()) {
            return [Tag.$copy(t), $state.errPrivateUse];
        }
        if (key.length !== 2) {
            return [Tag.$copy(t), $state.errInvalidArguments];
        }
        if (value === "") {
            const __gotots_results_2 = t.$go$private$language$findTypeForKey(key);
            let start = __gotots_results_2[0];
            let sep = __gotots_results_2[1];
            let end = __gotots_results_2[2];
            if (start !== sep) {
                __gotots_control_target_0: {
                    if (goStringIndex(Tag.$storageOf(t).str, start - 2) !== 45) {
                    }
                    else if (end === Tag.$storageOf(t).str.length || end + 2 < Tag.$storageOf(t).str.length && goStringIndex(Tag.$storageOf(t).str, end + 2) === 45) {
                        start = start - 2;
                    }
                }
                if (start === Tag.$storageOf(t).pVariant && end === Tag.$storageOf(t).str.length) {
                    Tag.$storageOf(t).str = "";
                    const __gotots_store_0 = Tag.$storageOf(t);
                    const __gotots_store_1 = Tag.$storageOf(t);
                    const __gotots_assign_0 = 0;
                    const __gotots_assign_1 = 0;
                    __gotots_store_0.pVariant = __gotots_assign_0;
                    __gotots_store_1.pExt = __gotots_assign_1;
                }
                else {
                    Tag.$storageOf(t).str = fmt__from_gostdlib.Sprintf("%s%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(goStringSlice(Tag.$storageOf(t).str, 0, start)), new GoInterfaceAdapter(goStringSlice(Tag.$storageOf(t).str, end))]));
                }
            }
            return [Tag.$copy(t), void 0];
        }
        if (value.length < 3 || value.length > 8) {
            return [Tag.$copy(t), $state.errInvalidArguments];
        }
        let buf = GoArray.zero<uint8, 26>(26, 0);
        let uStart = 0;
        if (Tag.$storageOf(t).str === "") {
            uStart = Tag.$go$private$language$genCoreBytes(t$location2, goArraySlice(buf, 0, null, null));
            buf.set(uStart, 45);
            uStart++;
        }
        let b = goArraySlice(buf, uStart, null, null);
        const __gotots_slice_build_24 = b;
        const __gotots_slice_build_25 = "u-";
        const __gotots_slice_build_26 = globalThis.Math.min(__gotots_slice_build_24.length, __gotots_slice_build_25.length);
        for (let __gotots_slice_build_27 = 0; __gotots_slice_build_27 < __gotots_slice_build_26; __gotots_slice_build_27++) {
            __gotots_slice_build_24.set(__gotots_slice_build_27, __gotots_slice_build_25.charCodeAt(__gotots_slice_build_27));
        }
        __gotots_slice_build_26;
        const __gotots_slice_build_28 = b.slice(2, null, null);
        const __gotots_slice_build_29 = key;
        const __gotots_slice_build_30 = globalThis.Math.min(__gotots_slice_build_28.length, __gotots_slice_build_29.length);
        for (let __gotots_slice_build_31 = 0; __gotots_slice_build_31 < __gotots_slice_build_30; __gotots_slice_build_31++) {
            __gotots_slice_build_28.set(__gotots_slice_build_31, __gotots_slice_build_29.charCodeAt(__gotots_slice_build_31));
        }
        __gotots_slice_build_30;
        b.set(4, 45);
        const __gotots_slice_operand_2 = b;
        const __gotots_binary_operand_0 = 5;
        const __gotots_slice_build_32 = b.slice(5, null, null);
        const __gotots_slice_build_33 = value;
        const __gotots_slice_build_34 = globalThis.Math.min(__gotots_slice_build_32.length, __gotots_slice_build_33.length);
        for (let __gotots_slice_build_35 = 0; __gotots_slice_build_35 < __gotots_slice_build_34; __gotots_slice_build_35++) {
            __gotots_slice_build_32.set(__gotots_slice_build_35, __gotots_slice_build_33.charCodeAt(__gotots_slice_build_35));
        }
        const __gotots_binary_operand_1 = __gotots_slice_build_34;
        const __gotots_slice_operand_3 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
        b = __gotots_slice_operand_2.slice(0, __gotots_slice_operand_3, null);
        let scan = makeScanner(b);
        {
            parseExtensions(scan);
            if (!(scan.err === undefined)) {
                return [Tag.$copy(t), scan.err];
            }
        }
        if (Tag.$storageOf(t).str === "") {
            const __gotots_store_2 = Tag.$storageOf(t);
            const __gotots_store_3 = Tag.$storageOf(t);
            const __gotots_assign_2 = uStart - 1 & 255;
            const __gotots_assign_3 = uStart - 1 & 65535;
            __gotots_store_2.pVariant = __gotots_assign_2;
            __gotots_store_3.pExt = __gotots_assign_3;
            const __gotots_conversion_3 = goArraySlice(buf, 0, uStart + b.length, null);
            let __gotots_conversion_4 = "";
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
            }
            Tag.$storageOf(t).str = __gotots_conversion_4;
        }
        else {
            let s = Tag.$storageOf(t).str;
            const __gotots_results_3 = t.$go$private$language$findTypeForKey(key);
            let start = __gotots_results_3[0];
            let sep = __gotots_results_3[1];
            let end = __gotots_results_3[2];
            let hasExt = __gotots_results_3[3];
            if (start === sep) {
                if (hasExt) {
                    b = b.slice(2, null, null);
                }
                Tag.$storageOf(t).str = fmt__from_gostdlib.Sprintf("%s-%s%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(goStringSlice(s, 0, sep)), new $goInterfaceAdapter$SliceOf_byte(b), new GoInterfaceAdapter(goStringSlice(s, end))]));
            }
            else {
                Tag.$storageOf(t).str = fmt__from_gostdlib.Sprintf("%s-%s%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(goStringSlice(s, 0, start + 3)), new GoInterfaceAdapter(value), new GoInterfaceAdapter(goStringSlice(s, end))]));
            }
        }
        return [Tag.$copy(t), void 0];
    }
    String(): gostring {
        let t: Tag = Tag.$copy(this);
        const t$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next3 => t = t$next3);
        if (Tag.$storageOf(t).str !== "") {
            return Tag.$storageOf(t).str;
        }
        if (Tag.$storageOf(t).ScriptID === 0 && Tag.$storageOf(t).RegionID === 0) {
            return Language_String(Tag.$storageOf(t).LangID);
        }
        let buf = GoArray.literal<uint8, 12>(12, 0, [], []);
        const __gotots_conversion_6 = goArraySlice(buf, 0, Tag.$go$private$language$genCoreBytes(t$location3, goArraySlice(buf, 0, null, null)), null);
        let __gotots_conversion_7 = "";
        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
        }
        return __gotots_conversion_7;
    }
    TypeForKey(key: gostring): gostring {
        {
            const __gotots_results_1 = this.$go$private$language$findTypeForKey(key);
            let start = __gotots_results_1[1];
            let end = __gotots_results_1[2];
            if (end !== start) {
                let s = goStringSlice(Tag.$storageOf(this).str, start, end);
                {
                    let p = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(s, 45)));
                    if (p >= 0) {
                        s = goStringSlice(s, 0, p);
                    }
                }
                return s;
            }
        }
        return "";
    }
    VariantOrPrivateUseTags(): gostring {
        if (Tag.$storageOf(this).pExt > 0) {
            return goStringSlice(Tag.$storageOf(this).str, Tag.$storageOf(this).pVariant, Tag.$storageOf(this).pExt);
        }
        return goStringSlice(Tag.$storageOf(this).str, Tag.$storageOf(this).pVariant);
    }
    Variants(): gostring {
        if (this.pVariant === 0) {
            return "";
        }
        return goStringSlice(this.str, this.pVariant, this.pExt);
    }
    $go$private$language$equalTags(a: Tag): bool {
        return Tag.$storageOf(this).LangID === Tag.$storageOf(a).LangID && Tag.$storageOf(this).ScriptID === Tag.$storageOf(a).ScriptID && Tag.$storageOf(this).RegionID === Tag.$storageOf(a).RegionID;
    }
    $go$private$language$findTypeForKey(key: gostring): [
        int,
        int,
        int,
        bool
    ] {
        let start: int = 0;
        let sep: int = 0;
        let end: int = 0;
        let hasExt: bool = false;
        let p = Tag.$storageOf(this).pExt;
        if (key.length !== 2 || p === Tag.$storageOf(this).str.length || p === 0) {
            return [p, p, p, false];
        }
        let s = Tag.$storageOf(this).str;
        for (p++; goStringIndex(s, p) !== 117; p++) {
            if (goStringIndex(s, p) > 117) {
                p--;
                return [p, p, p, false];
            }
            {
                p = nextExtension(s, p);
                if (p === s.length) {
                    return [s.length, s.length, s.length, false];
                }
            }
        }
        p++;
        let curKey = "";
        for (;;) {
            end = p;
            for (p++; p < s.length && goStringIndex(s, p) !== 45; p++) {
            }
            let n = p - end - 1;
            if (n <= 2 && curKey === key) {
                if (sep < end) {
                    sep++;
                }
                return [start, sep, end, true];
            }
            switch (n) {
                case 0:
                case 1: {
                    return [end, end, end, true];
                    break;
                }
                case 2: {
                    curKey = goStringSlice(s, end + 1, p);
                    if (curKey > key) {
                        return [end, end, end, true];
                    }
                    start = end;
                    sep = p;
                    break;
                }
            }
        }
    }
}
export function Make(s: gostring): Tag {
    const __gotots_results_0 = Parse(s);
    let t = __gotots_results_0[0];
    return Tag.$copy(t);
}
export function ParseRegion(s: gostring): [
    Region,
    GoInterface | undefined
] {
    let r: Region = 0;
    let err: GoInterface | undefined = void 0;
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_callee_0 = ($go$recovery: GoRecovery): void => {
                    if (!(($go$recovery === undefined ? undefined : $go$recovery.take()) === undefined)) {
                        r = 0;
                        err = $state.ErrSyntax;
                    }
                };
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_callee_0($go$recovery);
                };
                {
                    let n = s.length;
                    if (n < 2 || 3 < n) {
                        const __gotots_results_1: [
                            Region,
                            GoInterface | undefined
                        ] = [0, $state.ErrSyntax];
                        r = __gotots_results_1[0];
                        err = __gotots_results_1[1];
                        break __gotots_return_block_0;
                    }
                }
                let buf = GoArray.zero<uint8, 3>(3, 0);
                const __gotots_slice_operand_0 = buf;
                const __gotots_slice_build_20 = goArraySlice(buf, 0, null, null);
                const __gotots_slice_build_21 = s;
                const __gotots_slice_build_22 = globalThis.Math.min(__gotots_slice_build_20.length, __gotots_slice_build_21.length);
                for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_22; __gotots_slice_build_23++) {
                    __gotots_slice_build_20.set(__gotots_slice_build_23, __gotots_slice_build_21.charCodeAt(__gotots_slice_build_23));
                }
                const __gotots_slice_operand_1 = __gotots_slice_build_22;
                const __gotots_argument_0 = goArraySlice(__gotots_slice_operand_0, 0, __gotots_slice_operand_1, null);
                const __gotots_results_2: [
                    Region,
                    GoInterface | undefined
                ] = getRegionID(__gotots_argument_0);
                r = __gotots_results_2[0];
                err = __gotots_results_2[1];
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_1) {
            if (!(__gotots_caught_1 instanceof GoPanic)) {
                throw __gotots_caught_1;
            }
            __gotots_panic_0 = __gotots_caught_1;
        }
    }
    finally {
        if (__gotots_deferred_0 !== undefined) {
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return [r, err];
}
