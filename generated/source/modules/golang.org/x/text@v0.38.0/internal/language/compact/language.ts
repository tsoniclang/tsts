import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { ID } from "./compact.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, uint16 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/compact/state.js";
import { Builder as Builder__from_language, ParseRegion as ParseRegion__from_language, Region_String as Region_String__from_language, Tag as Tag__from_language } from "../../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import { $goInterfaceAdapter$Named_language$Tag as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$IsRoot$void_to_bool, $goInterfaceMethod$Parent$void_to_Named_language$Tag } from "../../../../../../../support/interface-methods.js";
import { ID_Tag, getCoreIndex } from "./compact.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type Tag$Storage = {
    language: uint16;
    locale: uint16;
    full: fullTag | undefined;
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
    public get language(): ID {
        return this.$storage.language;
    }
    public set language($value: ID) {
        this.$storage.language = $value;
    }
    public get locale(): ID {
        return this.$storage.locale;
    }
    public set locale($value: ID) {
        this.$storage.locale = $value;
    }
    public get full(): fullTag | undefined {
        return this.$storage.full;
    }
    public set full($value: fullTag | undefined) {
        this.$storage.full = $value;
    }
    static $zero(): Tag {
        return new Tag({
            language: 0,
            locale: 0,
            full: void 0
        });
    }
    static $copy($source: Tag): Tag {
        return new Tag({
            language: $source.$storage.language,
            locale: $source.$storage.locale,
            full: $source.$storage.full
        });
    }
    static $zeroStorage(): Tag$Storage {
        return {
            language: 0,
            locale: 0,
            full: void 0
        };
    }
    declare private readonly then?: never;
    static IsCompact(t: tsonicTypeScriptRuntime.Location<Tag> | undefined): bool {
        return Tag.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Tag>).value).full === undefined;
    }
    MayHaveExtensions(): bool {
        return !(Tag.$storageOf(this).full === undefined) || Tag.$storageOf(this).language >= $state.coreTags.length || !(Tag.$storageOf(this).language === Tag.$storageOf(this).locale);
    }
    Parent(): Tag {
        if (!(Tag.$storageOf(this).full === undefined)) {
            const __gotots_receiver_3 = Tag.$storageOf(this).full;
            const __gotots_argument_1 = goInterfaceNonNil<fullTag>(__gotots_receiver_3).Parent();
            return Make(__gotots_argument_1);
        }
        if (!(Tag.$storageOf(this).language === Tag.$storageOf(this).locale)) {
            return Tag.$fromStorage({
                language: Tag.$storageOf(this).language,
                locale: Tag.$storageOf(this).language,
                full: void 0
            });
        }
        const __gotots_results_13 = FromTag(ID_Tag(Tag.$storageOf(this).language).Parent());
        let lang = __gotots_results_13[0];
        return Tag.$fromStorage({
            language: lang,
            locale: lang,
            full: void 0
        });
    }
    Tag(): Tag__from_language {
        if (!(Tag.$storageOf(this).full === undefined)) {
            return Tag__from_language.$copy((($value: fullTag | undefined): Tag__from_language => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return Tag__from_language.$copy($value.$go$value);
            })(Tag.$storageOf(this).full));
        }
        let tag = ID_Tag(Tag.$storageOf(this).language);
        if (!(Tag.$storageOf(this).language === Tag.$storageOf(this).locale)) {
            let loc = ID_Tag(Tag.$storageOf(this).locale);
            const __gotots_results_12 = tag.SetTypeForKey("rg", strings__from_gostdlib.ToLower(Region_String__from_language(Tag__from_language.$storageOf(loc).RegionID)) + "zzzz");
            tag = __gotots_results_12[0];
        }
        return Tag__from_language.$copy(tag);
    }
}
export interface fullTag extends GoInterfaceValue {
    IsRoot(): bool;
    Parent(): Tag__from_language;
}
export const fullTag$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$IsRoot$void_to_bool, $goInterfaceMethod$Parent$void_to_Named_language$Tag]);
export function fullTag$is(value: GoInterfaceValue | undefined): value is fullTag {
    return value !== undefined && value.$go$implements(fullTag$contract);
}
export function Make(t: Tag__from_language): Tag {
    let tag: Tag = Tag.$zero();
    {
        let region = t.TypeForKey("rg");
        if (region.length === 6 && goStringSlice(region, 2) === "zzzz") {
            {
                const __gotots_results_0 = ParseRegion__from_language(goStringSlice(region, 0, 2));
                let r = __gotots_results_0[0];
                let err: GoInterface | undefined = __gotots_results_0[1];
                if (err === undefined) {
                    let tFull = Tag__from_language.$copy(t);
                    const __gotots_results_1 = t.SetTypeForKey("rg", "");
                    t = __gotots_results_1[0];
                    let exact1 = false, exact2 = false;
                    const __gotots_store_0 = Tag.$storageOf(tag);
                    const __gotots_results_2 = FromTag(Tag__from_language.$copy(t));
                    __gotots_store_0.language = __gotots_results_2[0];
                    exact1 = __gotots_results_2[1];
                    Tag__from_language.$storageOf(t).RegionID = r;
                    const __gotots_store_1 = Tag.$storageOf(tag);
                    const __gotots_results_3 = FromTag(Tag__from_language.$copy(t));
                    __gotots_store_1.locale = __gotots_results_3[0];
                    exact2 = __gotots_results_3[1];
                    if (!exact1 || !exact2) {
                        Tag.$storageOf(tag).full = new GoInterfaceAdapter(Tag__from_language.$copy(tFull));
                    }
                    return Tag.$copy(tag);
                }
            }
        }
    }
    const __gotots_results_4 = FromTag(Tag__from_language.$copy(t));
    let lang = __gotots_results_4[0];
    let ok = __gotots_results_4[1];
    Tag.$storageOf(tag).language = lang;
    Tag.$storageOf(tag).locale = lang;
    if (!ok) {
        Tag.$storageOf(tag).full = new GoInterfaceAdapter(Tag__from_language.$copy(t));
    }
    return Tag.$copy(tag);
}
export function FromTag(t: Tag__from_language): [
    ID,
    bool
] {
    let id: ID = 0;
    let exact: bool = false;
    exact = true;
    const __gotots_results_5 = t.Raw();
    let b = __gotots_results_5[0];
    let s = __gotots_results_5[1];
    let r = __gotots_results_5[2];
    if (t.HasString()) {
        if (t.IsPrivateUse()) {
            return [0, false];
        }
        let hasExtra = false;
        if (t.HasVariants()) {
            if (t.HasExtensions()) {
                const __gotots_struct_0 = Builder__from_language.$zero();
                let build = __gotots_struct_0;
                const __gotots_receiver_0 = build;
                const __gotots_field_0 = b;
                const __gotots_field_1 = s;
                const __gotots_field_2 = r;
                const __gotots_struct_1 = Tag__from_language.$zero();
                Tag__from_language.$storageOf(__gotots_struct_1).LangID = __gotots_field_0;
                Tag__from_language.$storageOf(__gotots_struct_1).ScriptID = __gotots_field_1;
                Tag__from_language.$storageOf(__gotots_struct_1).RegionID = __gotots_field_2;
                const __gotots_argument_0 = __gotots_struct_1;
                Builder__from_language.SetTag(__gotots_receiver_0, __gotots_argument_0);
                Builder__from_language.AddVariant(build, RuntimeSlice.literal<gostring>([t.Variants()]));
                exact = false;
                t = Builder__from_language.Make(build);
            }
            hasExtra = true;
        }
        else {
            const __gotots_results_6 = t.Extension(117);
            let ok = __gotots_results_6[1];
            if (ok) {
                let old = Tag__from_language.$copy(t);
                let variant = t.TypeForKey("va");
                const __gotots_field_3 = b;
                const __gotots_field_4 = s;
                const __gotots_field_5 = r;
                const __gotots_struct_2 = Tag__from_language.$zero();
                Tag__from_language.$storageOf(__gotots_struct_2).LangID = __gotots_field_3;
                Tag__from_language.$storageOf(__gotots_struct_2).ScriptID = __gotots_field_4;
                Tag__from_language.$storageOf(__gotots_struct_2).RegionID = __gotots_field_5;
                t = __gotots_struct_2;
                if (variant !== "") {
                    const __gotots_results_7 = t.SetTypeForKey("va", variant);
                    t = __gotots_results_7[0];
                    hasExtra = true;
                }
                exact = Tag__from_language.$equal(old, t);
            }
            else {
                exact = false;
            }
        }
        if (hasExtra) {
            const __gotots_range_0 = $state.specialTags;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_index_0;
                const __gotots_range_value_1 = Tag__from_language.$copy(Tag__from_language.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                let i = __gotots_range_value_0;
                let s__shadow_1 = __gotots_range_value_1;
                if (Tag__from_language.$equal(s__shadow_1, t)) {
                    return [i + $state.coreTags.length & 65535, exact];
                }
            }
            exact = false;
        }
    }
    {
        const __gotots_results_8 = getCoreIndex(Tag__from_language.$copy(t));
        let x = __gotots_results_8[0];
        let ok = __gotots_results_8[1];
        if (ok) {
            return [x, exact];
        }
    }
    exact = false;
    if (!(r === 0) && s === 0) {
        const __gotots_results_9 = t.Maximize();
        let t__shadow_1 = __gotots_results_9[0];
        {
            const __gotots_results_10 = getCoreIndex(Tag__from_language.$copy(t__shadow_1));
            let x = __gotots_results_10[0];
            let ok = __gotots_results_10[1];
            if (ok) {
                return [x, exact];
            }
        }
    }
    for (t = t.Parent(); !Tag__from_language.$equal(t, Tag__from_language.$fromStorage($state.root)); t = t.Parent()) {
        {
            const __gotots_results_11 = getCoreIndex(Tag__from_language.$copy(t));
            let x = __gotots_results_11[0];
            let ok = __gotots_results_11[1];
            if (ok) {
                return [x, exact];
            }
        }
    }
    return [0, exact];
}
