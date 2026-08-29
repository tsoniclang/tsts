import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ID as ID__from_compact } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/compact/package.js";
import type { Language as Language__from_language, Region as Region__from_language, Script as Script__from_language } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { fullTag as fullTag__from_compact } from "../internal/language/compact/language.js";
import type { bool, gostring, int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { Make as Make__from_compact, Tag as Tag__from_compact } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/compact/package.js";
import { $state as $state__language, Builder as Builder__from_language, Deprecated$constant as Deprecated$constant__from_language, Language_Canonicalize as Language_Canonicalize__from_language, Language_String as Language_String__from_language, Language_SuppressScript as Language_SuppressScript__from_language, Legacy$constant as Legacy$constant__from_language, Macro$constant as Macro$constant__from_language, Parse as Parse__from_language, Region_Canonicalize as Region_Canonicalize__from_language, Region_IsCountry as Region_IsCountry__from_language, Region_String as Region_String__from_language, Script_String as Script_String__from_language, Tag as Tag__from_language } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import { $state } from "../../../../../packages/golang.org/x/text@v0.38.0/language/state.js";
import { update } from "./parse.js";
import { _Latn$uint16, _MD$uint16, _Qaai$uint16, _Zinh$uint16, _mo$uint16, _nb$uint16, _no$uint16, _sh$uint16 } from "./tables.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type Tag$Storage = {
    language: uint16;
    locale: uint16;
    full: fullTag__from_compact | undefined;
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
    public get language(): ID__from_compact {
        return this.$storage.language;
    }
    public set language($value: ID__from_compact) {
        this.$storage.language = $value;
    }
    public get locale(): ID__from_compact {
        return this.$storage.locale;
    }
    public set locale($value: ID__from_compact) {
        this.$storage.locale = $value;
    }
    public get full(): fullTag__from_compact | undefined {
        return this.$storage.full;
    }
    public set full($value: fullTag__from_compact | undefined) {
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
    static $equal($left: Tag, $right: Tag): bool {
        return $left.$storage.language === $right.$storage.language && $left.$storage.locale === $right.$storage.locale && goInterfaceEqual($left.$storage.full, $right.$storage.full);
    }
    static $hash($source: Tag): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.language));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.locale));
        $hash = GoMapHash.mix($hash, $source.$storage.full === undefined ? 0 : $source.$storage.full.$go$hash());
        return $hash;
    }
    static $zeroStorage(): Tag$Storage {
        return {
            language: 0,
            locale: 0,
            full: void 0
        };
    }
    declare private readonly then?: never;
    static $go$private$language__package_1$isCompact(t: tsonicTypeScriptRuntime.Location<Tag> | undefined): bool {
        return Tag__from_compact.IsCompact(tsonicTypeScriptRuntime.projectLocation<Tag, Tag__from_compact>(t, ($go$source: Tag): Tag__from_compact => {
            return Tag__from_compact.$fromStorage(Tag.$storageOf($go$source));
        }, ($go$target: Tag__from_compact): Tag => {
            return Tag.$fromStorage(Tag__from_compact.$storageOf($go$target));
        }));
    }
    static $go$private$language__package_1$lang(t: tsonicTypeScriptRuntime.Location<Tag> | undefined): Language__from_language {
        return Tag__from_language.$storageOf(Tag.$go$private$language__package_1$tag(t)).LangID;
    }
    static $go$private$language__package_1$script(t: tsonicTypeScriptRuntime.Location<Tag> | undefined): Script__from_language {
        return Tag__from_language.$storageOf(Tag.$go$private$language__package_1$tag(t)).ScriptID;
    }
    static $go$private$language__package_1$tag(t: tsonicTypeScriptRuntime.Location<Tag> | undefined): Tag__from_language {
        return (($go$source: Tag): Tag__from_compact => {
            return Tag__from_compact.$fromStorage(Tag.$storageOf($go$source));
        })((t!).value).Tag();
    }
    Base(): [
        Base,
        Confidence
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next => t = t$next);
        {
            let b = Tag.$go$private$language__package_1$lang(t$location);
            if (!(b === 0)) {
                return [Base.$fromStorage({
                        langID: b
                    }), Exact$constant()];
            }
        }
        let tt = Tag.$go$private$language__package_1$tag(t$location);
        let c = High$constant();
        if (Tag__from_language.$storageOf(tt).ScriptID === 0 && !Region_IsCountry__from_language(Tag__from_language.$storageOf(tt).RegionID)) {
            c = Low$constant();
        }
        {
            const __gotots_results_6 = tt.Maximize();
            let tag = __gotots_results_6[0];
            let err: GoInterface | undefined = __gotots_results_6[1];
            if (err === undefined && !(Tag__from_language.$storageOf(tag).LangID === 0)) {
                return [Base.$fromStorage({
                        langID: Tag__from_language.$storageOf(tag).LangID
                    }), c];
            }
        }
        return [Base.$fromStorage({
                langID: 0
            }), No$constant()];
    }
    Extensions(): RuntimeSlice<Extension$Storage> {
        let t: Tag = Tag.$copy(this);
        const t$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next2 => t = t$next2);
        if (!Tag__from_compact.$fromStorage(Tag.$storageOf(Tag.$copy(t))).MayHaveExtensions()) {
            return RuntimeSlice.nil<Extension$Storage>();
        }
        let e = RuntimeSlice.literal<Extension$Storage>([]);
        const __gotots_range_0 = Tag.$go$private$language__package_1$tag(t$location2).Extensions();
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let ext = __gotots_range_value_0;
            const __gotots_slice_build_0 = e;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void Extension.$storageOf, (void Extension.$fromStorage,
                    {
                        s: ext
                    })));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<Extension$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, Extension.$storageOf(Extension.$copy(Extension.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void Extension.$storageOf, (void Extension.$fromStorage,
                    {
                        s: ext
                    })));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, Extension.$zeroStorage());
                }
            }
            e = __gotots_slice_build_1;
        }
        return e;
    }
    MarshalText(): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next3 => t = t$next3);
        let text: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
        let err: GoInterface | undefined = void 0;
        return Tag.$go$private$language__package_1$tag(t$location3).MarshalText();
    }
    Parent(): Tag {
        return Tag.$fromStorage(Tag__from_compact.$storageOf(Tag__from_compact.$fromStorage(Tag.$storageOf(Tag.$copy(this))).Parent()));
    }
    Raw(): [
        Base,
        Script,
        Region
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location4 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next4 => t = t$next4);
        let b: Base = Base.$zero();
        let s: Script = Script.$zero();
        let r: Region = Region.$zero();
        let tt = Tag.$go$private$language__package_1$tag(t$location4);
        return [Base.$fromStorage({
                langID: Tag__from_language.$storageOf(tt).LangID
            }), Script.$fromStorage({
                scriptID: Tag__from_language.$storageOf(tt).ScriptID
            }), Region.$fromStorage({
                regionID: Tag__from_language.$storageOf(tt).RegionID
            })];
    }
    Script(): [
        Script,
        Confidence
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location5 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next5 => t = t$next5);
        {
            let scr = Tag.$go$private$language__package_1$script(t$location5);
            if (!(scr === 0)) {
                return [Script.$fromStorage({
                        scriptID: scr
                    }), Exact$constant()];
            }
        }
        let tt = Tag.$go$private$language__package_1$tag(t$location5);
        const __gotots_assign_0 = 261;
        const __gotots_assign_1 = No$constant();
        let sc = __gotots_assign_0;
        let c = __gotots_assign_1;
        {
            let scr = Language_SuppressScript__from_language(Tag__from_language.$storageOf(tt).LangID);
            if (!(scr === 0)) {
                if (Tag__from_language.$storageOf(tt).RegionID === 0) {
                    return [Script.$fromStorage({
                            scriptID: scr
                        }), High$constant()];
                }
                const __gotots_assign_2 = scr;
                const __gotots_assign_3 = High$constant();
                sc = __gotots_assign_2;
                c = __gotots_assign_3;
            }
        }
        {
            const __gotots_results_10 = tt.Maximize();
            let tag = __gotots_results_10[0];
            let err: GoInterface | undefined = __gotots_results_10[1];
            if (err === undefined) {
                if (!(Tag__from_language.$storageOf(tag).ScriptID === sc)) {
                    const __gotots_assign_4 = Tag__from_language.$storageOf(tag).ScriptID;
                    const __gotots_assign_5 = Low$constant();
                    sc = __gotots_assign_4;
                    c = __gotots_assign_5;
                }
            }
            else {
                const __gotots_results_11 = canonicalize(new CanonType(39), Tag__from_language.$copy(tt));
                tt = __gotots_results_11[0];
                {
                    const __gotots_results_12 = tt.Maximize();
                    let tag__shadow_1 = __gotots_results_12[0];
                    let err__shadow_1: GoInterface | undefined = __gotots_results_12[1];
                    if (err__shadow_1 === undefined && !(Tag__from_language.$storageOf(tag__shadow_1).ScriptID === sc)) {
                        const __gotots_assign_6 = Tag__from_language.$storageOf(tag__shadow_1).ScriptID;
                        const __gotots_assign_7 = Low$constant();
                        sc = __gotots_assign_6;
                        c = __gotots_assign_7;
                    }
                }
            }
        }
        return [Script.$fromStorage({
                scriptID: sc
            }), c];
    }
    SetTypeForKey(key: gostring, value: gostring): [
        Tag,
        GoInterface | undefined
    ] {
        let t: Tag = Tag.$copy(this);
        const t$location6 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next6 => t = t$next6);
        const __gotots_results_8 = Tag.$go$private$language__package_1$tag(t$location6).SetTypeForKey(key, value);
        let tt = __gotots_results_8[0];
        let err: GoInterface | undefined = __gotots_results_8[1];
        return [makeTag(Tag__from_language.$copy(tt)), err];
    }
    String(): gostring {
        let t: Tag = Tag.$copy(this);
        const t$location7 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next7 => t = t$next7);
        return Tag.$go$private$language__package_1$tag(t$location7).String();
    }
    TypeForKey(key: gostring): gostring {
        let t: Tag = Tag.$copy(this);
        const t$location8 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next8 => t = t$next8);
        if (!Tag__from_compact.$fromStorage(Tag.$storageOf(Tag.$copy(t))).MayHaveExtensions()) {
            if (key !== "rg" && key !== "va") {
                return "";
            }
        }
        return Tag.$go$private$language__package_1$tag(t$location8).TypeForKey(key);
    }
}
export function makeTag(t: Tag__from_language): Tag {
    let tag: Tag = Tag.$zero();
    return Tag.$fromStorage(Tag__from_compact.$storageOf(Make__from_compact(Tag__from_language.$copy(t))));
}
export class CanonType {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    Canonicalize(t: Tag): [
        Tag,
        GoInterface | undefined
    ] {
        const t$location9 = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next9 => t = t$next9);
        if (Tag.$go$private$language__package_1$isCompact(t$location9)) {
            {
                const __gotots_results_4 = canonicalize(this, Tag__from_compact.$fromStorage(Tag.$storageOf(Tag.$copy(t))).Tag());
                let changed = __gotots_results_4[1];
                if (!changed) {
                    return [Tag.$copy(t), void 0];
                }
            }
        }
        {
            const __gotots_results_5 = canonicalize(this, Tag.$go$private$language__package_1$tag(t$location9));
            let tag = __gotots_results_5[0];
            const tag$location = tsonicTypeScriptRuntime.boundLocation({}, () => tag, tag$next => tag = tag$next);
            let changed = __gotots_results_5[1];
            if (changed) {
                Tag__from_language.RemakeString(tag$location);
                return [makeTag(Tag__from_language.$copy(tag)), void 0];
            }
        }
        return [Tag.$copy(t), void 0];
    }
    Compose(part: RuntimeSlice<$goInterface$Interface_void | undefined>): [
        Tag,
        GoInterface | undefined
    ] {
        let t: Tag = Tag.$zero();
        let err: GoInterface | undefined = void 0;
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_callee_1 = ($go$recovery: GoRecovery): void => {
                        if (!(($go$recovery === undefined ? undefined : $go$recovery.take()) === undefined)) {
                            const __gotots_struct_3 = Tag.$zero();
                            t = __gotots_struct_3;
                            err = $state__language.ErrSyntax;
                        }
                    };
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_1($go$recovery);
                    };
                    let b = Builder__from_language.$zero();
                    {
                        err = update(b, part);
                        if (!(err === undefined)) {
                            const __gotots_results_7: [
                                Tag,
                                GoInterface | undefined
                            ] = [Tag.$copy(Tag.$fromStorage($state.und)), err];
                            t = __gotots_results_7[0];
                            err = __gotots_results_7[1];
                            break __gotots_return_block_1;
                        }
                    }
                    const __gotots_store_0 = b;
                    const __gotots_results_8 = canonicalize(this, Tag__from_language.$copy(b.Tag));
                    __gotots_store_0.Tag = __gotots_results_8[0];
                    const __gotots_results_9: [
                        Tag,
                        GoInterface | undefined
                    ] = [makeTag(Builder__from_language.Make(b)), err];
                    t = __gotots_results_9[0];
                    err = __gotots_results_9[1];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return [Tag.$copy(t), err];
    }
    MustParse(s: gostring): Tag {
        const __gotots_results_13 = this.Parse(s);
        let t = __gotots_results_13[0];
        let err: GoInterface | undefined = __gotots_results_13[1];
        if (!(err === undefined)) {
            const __gotots_argument_0 = err;
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return Tag.$copy(t);
    }
    Parse(s: gostring): [
        Tag,
        GoInterface | undefined
    ] {
        let t: Tag = Tag.$zero();
        let err: GoInterface | undefined = void 0;
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_callee_0 = ($go$recovery: GoRecovery): void => {
                        if (!(($go$recovery === undefined ? undefined : $go$recovery.take()) === undefined)) {
                            const __gotots_struct_1 = Tag.$zero();
                            t = __gotots_struct_1;
                            err = $state__language.ErrSyntax;
                        }
                    };
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_0($go$recovery);
                    };
                    const __gotots_results_0 = Parse__from_language(s);
                    let tt = __gotots_results_0[0];
                    const tt$location = tsonicTypeScriptRuntime.boundLocation({}, () => tt, tt$next => tt = tt$next);
                    err = __gotots_results_0[1];
                    if (!(err === undefined)) {
                        const __gotots_results_1: [
                            Tag,
                            GoInterface | undefined
                        ] = [makeTag(Tag__from_language.$copy(tt)), err];
                        t = __gotots_results_1[0];
                        err = __gotots_results_1[1];
                        break __gotots_return_block_0;
                    }
                    const __gotots_results_2 = canonicalize(this, Tag__from_language.$copy(tt));
                    tt = __gotots_results_2[0];
                    let changed = __gotots_results_2[1];
                    if (changed) {
                        Tag__from_language.RemakeString(tt$location);
                    }
                    const __gotots_results_3: [
                        Tag,
                        GoInterface | undefined
                    ] = [makeTag(Tag__from_language.$copy(tt)), void 0];
                    t = __gotots_results_3[0];
                    err = __gotots_results_3[1];
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
        return [Tag.$copy(t), err];
    }
}
export function DeprecatedBase$constant(): CanonType {
    return new CanonType(1);
}
export function DeprecatedScript$constant(): CanonType {
    return new CanonType(2);
}
export function DeprecatedRegion$constant(): CanonType {
    return new CanonType(4);
}
export function SuppressScript$constant(): CanonType {
    return new CanonType(8);
}
export function Legacy$constant(): CanonType {
    return new CanonType(16);
}
export function Macro$constant(): CanonType {
    return new CanonType(32);
}
export function CLDR$constant(): CanonType {
    return new CanonType(64);
}
export function Raw$constant(): CanonType {
    return new CanonType(0);
}
export function All$constant(): CanonType {
    return new CanonType(63);
}
export function Default$constant(): CanonType {
    return new CanonType(23);
}
export function canonLang$constant(): CanonType {
    return new CanonType(49);
}
export function canonicalize(c: CanonType, t: Tag__from_language): [
    Tag__from_language,
    bool
] {
    if (c.$value === Raw$constant().$value) {
        return [Tag__from_language.$copy(t), false];
    }
    let changed = false;
    if (!(((void CanonType,
        c.$value & SuppressScript$constant().$value) as int)
        ===
            ((void CanonType,
                0) as int))) {
        if (Language_SuppressScript__from_language(Tag__from_language.$storageOf(t).LangID) === Tag__from_language.$storageOf(t).ScriptID) {
            Tag__from_language.$storageOf(t).ScriptID = 0;
            changed = true;
        }
    }
    if (!(((void CanonType,
        c.$value & canonLang$constant().$value) as int)
        ===
            ((void CanonType,
                0) as int))) {
        for (;;) {
            {
                const __gotots_results_2 = Language_Canonicalize__from_language(Tag__from_language.$storageOf(t).LangID);
                let l = __gotots_results_2[0];
                let aliasType = __gotots_results_2[1];
                if (!(l === Tag__from_language.$storageOf(t).LangID)) {
                    switch (aliasType) {
                        case Legacy$constant__from_language(): {
                            if (!(((void CanonType,
                                c.$value & Legacy$constant().$value) as int)
                                ===
                                    ((void CanonType,
                                        0) as int))) {
                                if (Tag__from_language.$storageOf(t).LangID === _sh$uint16 && Tag__from_language.$storageOf(t).ScriptID === 0) {
                                    Tag__from_language.$storageOf(t).ScriptID = _Latn$uint16;
                                }
                                Tag__from_language.$storageOf(t).LangID = l;
                                changed = true;
                            }
                            break;
                        }
                        case Macro$constant__from_language(): {
                            if (!(((void CanonType,
                                c.$value & Macro$constant().$value) as int)
                                ===
                                    ((void CanonType,
                                        0) as int))) {
                                if (((void CanonType,
                                    c.$value & CLDR$constant().$value) as int)
                                    ===
                                        ((void CanonType,
                                            0) as int) || !(Tag__from_language.$storageOf(t).LangID === _nb$uint16)) {
                                    changed = true;
                                    Tag__from_language.$storageOf(t).LangID = l;
                                }
                            }
                            break;
                        }
                        case Deprecated$constant__from_language(): {
                            if (!(((void CanonType,
                                c.$value & DeprecatedBase$constant().$value) as int)
                                ===
                                    ((void CanonType,
                                        0) as int))) {
                                if (Tag__from_language.$storageOf(t).LangID === _mo$uint16 && Tag__from_language.$storageOf(t).RegionID === 0) {
                                    Tag__from_language.$storageOf(t).RegionID = _MD$uint16;
                                }
                                Tag__from_language.$storageOf(t).LangID = l;
                                changed = true;
                                continue;
                            }
                            break;
                        }
                    }
                }
                else if (!(((void CanonType,
                    c.$value & Legacy$constant().$value) as int)
                    ===
                        ((void CanonType,
                            0) as int)) && Tag__from_language.$storageOf(t).LangID === _no$uint16 && !(((void CanonType,
                    c.$value & CLDR$constant().$value) as int)
                    ===
                        ((void CanonType,
                            0) as int))) {
                    Tag__from_language.$storageOf(t).LangID = _nb$uint16;
                    changed = true;
                }
            }
            break;
        }
    }
    if (!(((void CanonType,
        c.$value & DeprecatedScript$constant().$value) as int)
        ===
            ((void CanonType,
                0) as int))) {
        if (Tag__from_language.$storageOf(t).ScriptID === _Qaai$uint16) {
            changed = true;
            Tag__from_language.$storageOf(t).ScriptID = _Zinh$uint16;
        }
    }
    if (!(((void CanonType,
        c.$value & DeprecatedRegion$constant().$value) as int)
        ===
            ((void CanonType,
                0) as int))) {
        {
            let r = Region_Canonicalize__from_language(Tag__from_language.$storageOf(t).RegionID);
            if (!(r === Tag__from_language.$storageOf(t).RegionID)) {
                changed = true;
                Tag__from_language.$storageOf(t).RegionID = r;
            }
        }
    }
    return [Tag__from_language.$copy(t), changed];
}
export class Confidence {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function No$constant(): Confidence {
    return new Confidence(0);
}
export function Low$constant(): Confidence {
    return new Confidence(1);
}
export function High$constant(): Confidence {
    return new Confidence(2);
}
export function Exact$constant(): Confidence {
    return new Confidence(3);
}
export type Extension$Storage = {
    s: gostring;
};
export class Extension {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Extension$Storage) {
    }
    public static $storageOf($source: Extension): Extension$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Extension$Storage): Extension {
        return new Extension($source);
    }
    public get s(): gostring {
        return this.$storage.s;
    }
    public set s($value: gostring) {
        this.$storage.s = $value;
    }
    static $copy($source: Extension): Extension {
        return new Extension({
            s: $source.$storage.s
        });
    }
    static $equal($left: Extension, $right: Extension): bool {
        return $left.$storage.s === $right.$storage.s;
    }
    static $hash($source: Extension): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.s));
        return $hash;
    }
    static $zeroStorage(): Extension$Storage {
        return {
            s: ""
        };
    }
    declare private readonly then?: never;
    String(): gostring {
        return Extension.$storageOf(this).s;
    }
}
export type Base$Storage = {
    langID: uint16;
};
export class Base {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Base$Storage) {
    }
    public static $storageOf($source: Base): Base$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Base$Storage): Base {
        return new Base($source);
    }
    public get langID(): Language__from_language {
        return this.$storage.langID;
    }
    public set langID($value: Language__from_language) {
        this.$storage.langID = $value;
    }
    static $zero(): Base {
        return new Base({
            langID: 0
        });
    }
    static $copy($source: Base): Base {
        return new Base({
            langID: $source.$storage.langID
        });
    }
    static $equal($left: Base, $right: Base): bool {
        return $left.$storage.langID === $right.$storage.langID;
    }
    static $hash($source: Base): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.langID));
        return $hash;
    }
    static $zeroStorage(): Base$Storage {
        return {
            langID: 0
        };
    }
    declare private readonly then?: never;
    String(): gostring {
        return Language_String__from_language(Base.$storageOf(this).langID);
    }
}
export type Script$Storage = {
    scriptID: uint16;
};
export class Script {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Script$Storage) {
    }
    public static $storageOf($source: Script): Script$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Script$Storage): Script {
        return new Script($source);
    }
    public get scriptID(): Script__from_language {
        return this.$storage.scriptID;
    }
    public set scriptID($value: Script__from_language) {
        this.$storage.scriptID = $value;
    }
    static $zero(): Script {
        return new Script({
            scriptID: 0
        });
    }
    static $copy($source: Script): Script {
        return new Script({
            scriptID: $source.$storage.scriptID
        });
    }
    static $equal($left: Script, $right: Script): bool {
        return $left.$storage.scriptID === $right.$storage.scriptID;
    }
    static $hash($source: Script): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.scriptID));
        return $hash;
    }
    static $zeroStorage(): Script$Storage {
        return {
            scriptID: 0
        };
    }
    declare private readonly then?: never;
    String(): gostring {
        return Script_String__from_language(Script.$storageOf(this).scriptID);
    }
}
export type Region$Storage = {
    regionID: uint16;
};
export class Region {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Region$Storage) {
    }
    public static $storageOf($source: Region): Region$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Region$Storage): Region {
        return new Region($source);
    }
    public get regionID(): Region__from_language {
        return this.$storage.regionID;
    }
    public set regionID($value: Region__from_language) {
        this.$storage.regionID = $value;
    }
    static $zero(): Region {
        return new Region({
            regionID: 0
        });
    }
    static $copy($source: Region): Region {
        return new Region({
            regionID: $source.$storage.regionID
        });
    }
    static $equal($left: Region, $right: Region): bool {
        return $left.$storage.regionID === $right.$storage.regionID;
    }
    static $hash($source: Region): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.regionID));
        return $hash;
    }
    static $zeroStorage(): Region$Storage {
        return {
            regionID: 0
        };
    }
    declare private readonly then?: never;
    String(): gostring {
        return Region_String__from_language(Region.$storageOf(this).regionID);
    }
}
export type Variant$Storage = {
    variant: gostring;
};
export class Variant {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Variant$Storage) {
    }
    public static $storageOf($source: Variant): Variant$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Variant$Storage): Variant {
        return new Variant($source);
    }
    public get variant(): gostring {
        return this.$storage.variant;
    }
    public set variant($value: gostring) {
        this.$storage.variant = $value;
    }
    static $copy($source: Variant): Variant {
        return new Variant({
            variant: $source.$storage.variant
        });
    }
    static $equal($left: Variant, $right: Variant): bool {
        return $left.$storage.variant === $right.$storage.variant;
    }
    static $hash($source: Variant): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.variant));
        return $hash;
    }
    declare private readonly then?: never;
}
