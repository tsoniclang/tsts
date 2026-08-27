import type { fieldInfo$Storage as fieldInfo__from_lsutil$Storage } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/userpreferences.js";
import type { $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage } from "../../../../../../../support/anonymous-structs.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare FileExtensionKindModifiers: uint32;
    declare caseInsensitiveOrganizeImportsComparer: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>;
    declare caseSensitiveOrganizeImportsComparer: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>;
    declare configPathParsers: GoMapValue<gostring, (($0: GoInterface | undefined) => GoInterface | undefined) | undefined>;
    declare fieldInfoCache: (() => RuntimeSlice<fieldInfo__from_lsutil$Storage>) | undefined;
    declare organizeImportsComparers: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>;
    declare scriptElementKindModifierNames: RuntimeSlice<$goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage>;
    declare typeParsers: GoMapValue<reflect__from_gostdlib.Type | undefined, (($0: GoInterface | undefined) => GoInterface | undefined) | undefined>;
    declare typeSerializers: GoMapValue<reflect__from_gostdlib.Type | undefined, (($0: GoInterface | undefined) => GoInterface | undefined) | undefined>;
    declare unstableNameIndex: (() => GoMapValue<gostring, int>) | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
