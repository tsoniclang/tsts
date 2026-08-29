import type { uint8 } from "@gotots/runtime/scalars.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type EscapeCodes$Storage = {
    Black: RuntimeSlice<uint8>;
    Red: RuntimeSlice<uint8>;
    Green: RuntimeSlice<uint8>;
    Yellow: RuntimeSlice<uint8>;
    Blue: RuntimeSlice<uint8>;
    Magenta: RuntimeSlice<uint8>;
    Cyan: RuntimeSlice<uint8>;
    White: RuntimeSlice<uint8>;
    Reset: RuntimeSlice<uint8>;
};
export class EscapeCodes {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: EscapeCodes$Storage) {
    }
    public static $storageOf($source: EscapeCodes): EscapeCodes$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: EscapeCodes$Storage): EscapeCodes {
        return new EscapeCodes($source);
    }
    public get Black(): RuntimeSlice<uint8> {
        return this.$storage.Black;
    }
    public set Black($value: RuntimeSlice<uint8>) {
        this.$storage.Black = $value;
    }
    public get Red(): RuntimeSlice<uint8> {
        return this.$storage.Red;
    }
    public set Red($value: RuntimeSlice<uint8>) {
        this.$storage.Red = $value;
    }
    public get Green(): RuntimeSlice<uint8> {
        return this.$storage.Green;
    }
    public set Green($value: RuntimeSlice<uint8>) {
        this.$storage.Green = $value;
    }
    public get Yellow(): RuntimeSlice<uint8> {
        return this.$storage.Yellow;
    }
    public set Yellow($value: RuntimeSlice<uint8>) {
        this.$storage.Yellow = $value;
    }
    public get Blue(): RuntimeSlice<uint8> {
        return this.$storage.Blue;
    }
    public set Blue($value: RuntimeSlice<uint8>) {
        this.$storage.Blue = $value;
    }
    public get Magenta(): RuntimeSlice<uint8> {
        return this.$storage.Magenta;
    }
    public set Magenta($value: RuntimeSlice<uint8>) {
        this.$storage.Magenta = $value;
    }
    public get Cyan(): RuntimeSlice<uint8> {
        return this.$storage.Cyan;
    }
    public set Cyan($value: RuntimeSlice<uint8>) {
        this.$storage.Cyan = $value;
    }
    public get White(): RuntimeSlice<uint8> {
        return this.$storage.White;
    }
    public set White($value: RuntimeSlice<uint8>) {
        this.$storage.White = $value;
    }
    public get Reset(): RuntimeSlice<uint8> {
        return this.$storage.Reset;
    }
    public set Reset($value: RuntimeSlice<uint8>) {
        this.$storage.Reset = $value;
    }
    static $zeroStorage(): EscapeCodes$Storage {
        return {
            Black: RuntimeSlice.nil<uint8>(),
            Red: RuntimeSlice.nil<uint8>(),
            Green: RuntimeSlice.nil<uint8>(),
            Yellow: RuntimeSlice.nil<uint8>(),
            Blue: RuntimeSlice.nil<uint8>(),
            Magenta: RuntimeSlice.nil<uint8>(),
            Cyan: RuntimeSlice.nil<uint8>(),
            White: RuntimeSlice.nil<uint8>(),
            Reset: RuntimeSlice.nil<uint8>()
        };
    }
    declare private readonly then?: never;
}
export const keyEscape$uint8: uint8 = 27;
export type pasteIndicatorError$Storage = {};
export class pasteIndicatorError {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: pasteIndicatorError$Storage) {
    }
    public static $storageOf($source: pasteIndicatorError): pasteIndicatorError$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: pasteIndicatorError$Storage): pasteIndicatorError {
        return new pasteIndicatorError($source);
    }
    static $zeroStorage(): pasteIndicatorError$Storage {
        return {};
    }
    declare private readonly then?: never;
}
