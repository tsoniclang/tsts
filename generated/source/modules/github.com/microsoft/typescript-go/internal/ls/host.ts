import type { Registry as Registry__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import type { UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { ECMALineInfo as ECMALineInfo__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $goInterfaceMethod$AutoImportRegistry$void_to_PointerTo_Named_autoimport$Registry, $goInterfaceMethod$Converters$void_to_PointerTo_Named_lsconv$Converters, $goInterfaceMethod$DirectoryExists$string_to_bool, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetDirectories$string_to_SliceOf_string, $goInterfaceMethod$GetECMALineInfo$string_to_PointerTo_Named_sourcemap$ECMALineInfo, $goInterfaceMethod$GetPreferences$string_to_Named_lsutil$UserPreferences, $goInterfaceMethod$ReadDirectory$string_string_SliceOf_string_SliceOf_string_SliceOf_string_int_to_SliceOf_string, $goInterfaceMethod$ReadFile$string_to_string_bool, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool } from "../../../../../../support/interface-methods.js";
export interface Host extends GoInterfaceValue {
    AutoImportRegistry(): {
        value: Registry__from_autoimport;
    } | undefined;
    Converters(): {
        value: Converters__from_lsconv;
    } | undefined;
    DirectoryExists($argument0: gostring): bool;
    FileExists($argument0: gostring): bool;
    GetDirectories($argument0: gostring): RuntimeSlice<gostring>;
    GetECMALineInfo($argument0: gostring): {
        value: ECMALineInfo__from_sourcemap;
    } | undefined;
    GetPreferences($argument0: gostring): UserPreferences__from_lsutil;
    ReadDirectory($argument0: gostring, $argument1: gostring, $argument2: RuntimeSlice<gostring>, $argument3: RuntimeSlice<gostring>, $argument4: RuntimeSlice<gostring>, $argument5: int): RuntimeSlice<gostring>;
    ReadFile($argument0: gostring): [
        gostring,
        bool
    ];
    UseCaseSensitiveFileNames(): bool;
}
export const Host$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AutoImportRegistry$void_to_PointerTo_Named_autoimport$Registry, $goInterfaceMethod$Converters$void_to_PointerTo_Named_lsconv$Converters, $goInterfaceMethod$DirectoryExists$string_to_bool, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetDirectories$string_to_SliceOf_string, $goInterfaceMethod$GetECMALineInfo$string_to_PointerTo_Named_sourcemap$ECMALineInfo, $goInterfaceMethod$GetPreferences$string_to_Named_lsutil$UserPreferences, $goInterfaceMethod$ReadDirectory$string_string_SliceOf_string_SliceOf_string_SliceOf_string_int_to_SliceOf_string, $goInterfaceMethod$ReadFile$string_to_string_bool, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool]);
export function Host$is(value: GoInterfaceValue | undefined): value is Host {
    return value !== undefined && value.$go$implements(Host$contract);
}
