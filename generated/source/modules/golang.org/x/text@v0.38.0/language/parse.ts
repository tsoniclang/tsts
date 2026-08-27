import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { Extension$Storage as Extension__from_language__package_1$Storage, Variant$Storage as Variant__from_language__package_1$Storage } from "./language.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Builder as Builder__from_language, Tag as Tag__from_language } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import { $state } from "../../../../../packages/golang.org/x/text@v0.38.0/language/state.js";
import { $goInterfaceAdapter$Named_language__package_1$Base, $goInterfaceAdapter$Named_language__package_1$Extension, $goInterfaceAdapter$Named_language__package_1$Region, $goInterfaceAdapter$Named_language__package_1$Script, $goInterfaceAdapter$Named_language__package_1$Variant, $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension, $goInterfaceAdapter$SliceOf_Named_language__package_1$Variant, $goInterfaceAdapter$Named_language__package_1$Tag as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Error_void_to_string$contract as GoInterface$contract, $goInterface$Interface_Method_Error_void_to_string$is as GoInterface$is } from "../../../../../support/interface-contracts.js";
import { Base, Default$constant, Extension, Region, Script, Tag, Variant } from "./language.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function Parse(s: gostring): [
    Tag,
    GoInterface | undefined
] {
    let t: Tag = Tag.$zero();
    let err: GoInterface | undefined = void 0;
    return Default$constant().Parse(s);
}
export function update(b: Builder__from_language | undefined, part: RuntimeSlice<$goInterface$Interface_void | undefined>): GoInterface | undefined {
    let err: GoInterface | undefined = void 0;
    const __gotots_range_0 = part;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let x: $goInterface$Interface_void | undefined = __gotots_range_value_0;
        const __gotots_type_switch_0: $goInterface$Interface_void | undefined = x;
        switch (true) {
            case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                let v: Tag = Tag.$copy(__gotots_type_switch_0.$go$value);
                const v$location = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next => v = v$next);
                Builder__from_language.SetTag(b, Tag.$go$private$language__package_1$tag(v$location));
                break;
            }
            case $goInterfaceAdapter$Named_language__package_1$Base.$is(__gotots_type_switch_0): {
                let v: Base = Base.$copy(__gotots_type_switch_0.$go$value);
                Tag__from_language.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag).LangID = Base.$storageOf(v).langID;
                break;
            }
            case $goInterfaceAdapter$Named_language__package_1$Script.$is(__gotots_type_switch_0): {
                let v: Script = Script.$copy(__gotots_type_switch_0.$go$value);
                Tag__from_language.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag).ScriptID = Script.$storageOf(v).scriptID;
                break;
            }
            case $goInterfaceAdapter$Named_language__package_1$Region.$is(__gotots_type_switch_0): {
                let v: Region = Region.$copy(__gotots_type_switch_0.$go$value);
                Tag__from_language.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Tag).RegionID = Region.$storageOf(v).regionID;
                break;
            }
            case $goInterfaceAdapter$Named_language__package_1$Variant.$is(__gotots_type_switch_0): {
                let v: Variant = Variant.$copy(__gotots_type_switch_0.$go$value);
                if (Variant.$storageOf(v).variant === "") {
                    err = $state.errInvalidArgument;
                    break;
                }
                Builder__from_language.AddVariant(b, RuntimeSlice.literal<gostring>([Variant.$storageOf(v).variant]));
                break;
            }
            case $goInterfaceAdapter$Named_language__package_1$Extension.$is(__gotots_type_switch_0): {
                let v: Extension = Extension.$copy(__gotots_type_switch_0.$go$value);
                if (Extension.$storageOf(v).s === "") {
                    err = $state.errInvalidArgument;
                    break;
                }
                Builder__from_language.SetExt(b, Extension.$storageOf(v).s);
                break;
            }
            case $goInterfaceAdapter$SliceOf_Named_language__package_1$Variant.$is(__gotots_type_switch_0): {
                let v: RuntimeSlice<Variant__from_language__package_1$Storage> = __gotots_type_switch_0.$go$value;
                Builder__from_language.ClearVariants(b);
                const __gotots_range_1 = v;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = Variant.$copy(Variant.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
                    let v__shadow_1 = __gotots_range_value_1;
                    Builder__from_language.AddVariant(b, RuntimeSlice.literal<gostring>([Variant.$storageOf(v__shadow_1).variant]));
                }
                break;
            }
            case $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension.$is(__gotots_type_switch_0): {
                let v: RuntimeSlice<Extension__from_language__package_1$Storage> = __gotots_type_switch_0.$go$value;
                Builder__from_language.ClearExtensions(b);
                const __gotots_range_2 = v;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = Extension.$copy(Extension.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
                    let e = __gotots_range_value_2;
                    Builder__from_language.SetExt(b, Extension.$storageOf(e).s);
                }
                break;
            }
            case GoInterface$is(__gotots_type_switch_0): {
                let v: GoInterface | undefined = __gotots_type_switch_0;
                if (!(v === undefined)) {
                    err = v;
                }
                break;
            }
        }
    }
    return err;
}
