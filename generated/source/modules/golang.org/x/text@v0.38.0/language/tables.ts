import type { bool, uint16, uint8 } from "@gotots/runtime/scalars.js";
export const _de$uint16: uint16 = 269;
export const _en$uint16: uint16 = 313;
export const _fr$uint16: uint16 = 350;
export const _it$uint16: uint16 = 505;
export const _mo$uint16: uint16 = 784;
export const _no$uint16: uint16 = 879;
export const _nb$uint16: uint16 = 839;
export const _sh$uint16: uint16 = 1031;
export const _mul$uint16: uint16 = 806;
export const _MD$uint16: uint16 = 189;
export const _Latn$uint16: uint16 = 91;
export const _Qaai$uint16: uint16 = 157;
export const _Zinh$uint16: uint16 = 255;
export type mutualIntelligibility$Storage = {
    want: uint16;
    have: uint16;
    distance: uint8;
    oneway: bool;
};
export class mutualIntelligibility {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: mutualIntelligibility$Storage) {
    }
    public static $storageOf($source: mutualIntelligibility): mutualIntelligibility$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: mutualIntelligibility$Storage): mutualIntelligibility {
        return new mutualIntelligibility($source);
    }
    public get want(): uint16 {
        return this.$storage.want;
    }
    public set want($value: uint16) {
        this.$storage.want = $value;
    }
    public get have(): uint16 {
        return this.$storage.have;
    }
    public set have($value: uint16) {
        this.$storage.have = $value;
    }
    public get distance(): uint8 {
        return this.$storage.distance;
    }
    public set distance($value: uint8) {
        this.$storage.distance = $value;
    }
    public get oneway(): bool {
        return this.$storage.oneway;
    }
    public set oneway($value: bool) {
        this.$storage.oneway = $value;
    }
    static $zero(): mutualIntelligibility {
        return new mutualIntelligibility({
            want: 0,
            have: 0,
            distance: 0,
            oneway: false
        });
    }
    static $copy($source: mutualIntelligibility): mutualIntelligibility {
        return new mutualIntelligibility({
            want: $source.$storage.want,
            have: $source.$storage.have,
            distance: $source.$storage.distance,
            oneway: $source.$storage.oneway
        });
    }
    declare private readonly then?: never;
}
export type scriptIntelligibility$Storage = {
    wantLang: uint16;
    haveLang: uint16;
    wantScript: uint8;
    haveScript: uint8;
    distance: uint8;
};
export class scriptIntelligibility {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: scriptIntelligibility$Storage) {
    }
    public static $storageOf($source: scriptIntelligibility): scriptIntelligibility$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: scriptIntelligibility$Storage): scriptIntelligibility {
        return new scriptIntelligibility($source);
    }
    public get wantLang(): uint16 {
        return this.$storage.wantLang;
    }
    public set wantLang($value: uint16) {
        this.$storage.wantLang = $value;
    }
    public get haveLang(): uint16 {
        return this.$storage.haveLang;
    }
    public set haveLang($value: uint16) {
        this.$storage.haveLang = $value;
    }
    public get wantScript(): uint8 {
        return this.$storage.wantScript;
    }
    public set wantScript($value: uint8) {
        this.$storage.wantScript = $value;
    }
    public get haveScript(): uint8 {
        return this.$storage.haveScript;
    }
    public set haveScript($value: uint8) {
        this.$storage.haveScript = $value;
    }
    public get distance(): uint8 {
        return this.$storage.distance;
    }
    public set distance($value: uint8) {
        this.$storage.distance = $value;
    }
    static $zero(): scriptIntelligibility {
        return new scriptIntelligibility({
            wantLang: 0,
            haveLang: 0,
            wantScript: 0,
            haveScript: 0,
            distance: 0
        });
    }
    static $copy($source: scriptIntelligibility): scriptIntelligibility {
        return new scriptIntelligibility({
            wantLang: $source.$storage.wantLang,
            haveLang: $source.$storage.haveLang,
            wantScript: $source.$storage.wantScript,
            haveScript: $source.$storage.haveScript,
            distance: $source.$storage.distance
        });
    }
    declare private readonly then?: never;
}
export type regionIntelligibility$Storage = {
    lang: uint16;
    script: uint8;
    group: uint8;
    distance: uint8;
};
export class regionIntelligibility {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: regionIntelligibility$Storage) {
    }
    public static $storageOf($source: regionIntelligibility): regionIntelligibility$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: regionIntelligibility$Storage): regionIntelligibility {
        return new regionIntelligibility($source);
    }
    public get lang(): uint16 {
        return this.$storage.lang;
    }
    public set lang($value: uint16) {
        this.$storage.lang = $value;
    }
    public get script(): uint8 {
        return this.$storage.script;
    }
    public set script($value: uint8) {
        this.$storage.script = $value;
    }
    public get group(): uint8 {
        return this.$storage.group;
    }
    public set group($value: uint8) {
        this.$storage.group = $value;
    }
    public get distance(): uint8 {
        return this.$storage.distance;
    }
    public set distance($value: uint8) {
        this.$storage.distance = $value;
    }
    static $zero(): regionIntelligibility {
        return new regionIntelligibility({
            lang: 0,
            script: 0,
            group: 0,
            distance: 0
        });
    }
    static $copy($source: regionIntelligibility): regionIntelligibility {
        return new regionIntelligibility({
            lang: $source.$storage.lang,
            script: $source.$storage.script,
            group: $source.$storage.group,
            distance: $source.$storage.distance
        });
    }
    declare private readonly then?: never;
}
