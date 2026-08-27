import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { ToFileNameLowerCase as ToFileNameLowerCase__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Get$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function GetLibFileName(libName: gostring): [
    gostring,
    bool
] {
    libName = ToFileNameLowerCase__from_tspath(libName);
    if (Set__from_collections.Has<gostring>($state.LibFilesSet, libName)) {
        return [libName, true];
    }
    const __gotots_results_1 = OrderedMap$Get$string$Interface_void($state.LibMap, libName);
    let lib: GoInterface | undefined = __gotots_results_1[0];
    let ok = __gotots_results_1[1];
    if (!ok) {
        return ["", false];
    }
    return [(($value: GoInterface | undefined): gostring => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(lib), true];
}
export function GetDefaultLibFileName(options: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    const __gotots_results_0 = $state.targetToLibMap.lookupOk(CompilerOptions__from_core.GetEmitScriptTarget(options));
    let name = __gotots_results_0[0];
    let ok = __gotots_results_0[1];
    if (!ok) {
        return "lib.d.ts";
    }
    return name;
}
