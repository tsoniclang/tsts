import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { NewOrderedMapWithSizeHint$string$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { OrderedMap$GetOrZero$string$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$GetOrZero.js";
import { OrderedMap$Set$string$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { CommandLineOption } from "./commandlineoption.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function GetNameMapFromList(optDecls: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>): NameMap | undefined {
    let optionsNames: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>> | undefined = NewOrderedMapWithSizeHint$string$PointerTo_Named_tsoptions$CommandLineOption(optDecls.length);
    let shortOptionNames: GoMapValue<gostring, gostring> = GoMap.make<gostring, gostring>("", 0, []);
    const __gotots_range_0 = optDecls;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = __gotots_range_value_0;
        OrderedMap$Set$string$PointerTo_Named_tsoptions$CommandLineOption(optionsNames, strings__from_gostdlib.ToLower(CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), option);
        if (CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ShortName !== "") {
            shortOptionNames.store(CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ShortName, CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name);
        }
    }
    return new NameMap(optionsNames, shortOptionNames);
}
export class NameMap {
    declare private readonly $goType: void;
    public constructor(public optionsNames: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>> | undefined, public shortOptionNames: GoMapValue<gostring, gostring>) {
    }
    declare private readonly then?: never;
    static Get(nm: NameMap | undefined, name: gostring): tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined {
        return OrderedMap$GetOrZero$string$PointerTo_Named_tsoptions$CommandLineOption((nm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).optionsNames, strings__from_gostdlib.ToLower(name));
    }
    static GetOptionDeclarationFromName(nm: NameMap | undefined, optionName: gostring, allowShort: bool): tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined {
        optionName = strings__from_gostdlib.ToLower(optionName);
        if (allowShort) {
            let short = (nm ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shortOptionNames.lookup(optionName);
            if (short !== "") {
                optionName = short;
            }
        }
        return NameMap.Get(nm, optionName);
    }
}
