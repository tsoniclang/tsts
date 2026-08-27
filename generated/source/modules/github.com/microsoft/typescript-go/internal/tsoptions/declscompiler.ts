import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { $goInterfaceAdapter$Named_core$Tristate, $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goReflectType$PointerTo_Named_core$CompilerOptions } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { CommandLineOption } from "./commandlineoption.js";
import { CommandLineOptionNameMap } from "./tsconfigparsing.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function optionsHaveChanges(oldOptions: {
    value: CompilerOptions__from_core;
} | undefined, newOptions: {
    value: CompilerOptions__from_core;
} | undefined, declFilter: (($0: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined) => bool) | undefined): bool {
    if (oldOptions
        ===
            newOptions) {
        return false;
    }
    if (oldOptions === undefined || newOptions === undefined) {
        return true;
    }
    let oldOptionsValue = reflect__from_gostdlib.ValueOf(new GoInterfaceAdapter(oldOptions)).Elem();
    return ForEachCompilerOptionValue(newOptions, declFilter, (option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: reflect__from_gostdlib.Value, i: int): bool => {
        let newValue: GoInterface | undefined = value.Interface();
        let oldValue: GoInterface | undefined = oldOptionsValue.Field(BigInt.asIntN(64, goNumberToBigInt(i))).Interface();
        if (CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).strictFlag) {
            return CompilerOptions__from_core.GetStrictOptionValue(oldOptions, (($value: GoInterface | undefined): Tristate__from_core => {
                if (!$goInterfaceAdapter$Named_core$Tristate.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(oldValue)) !== CompilerOptions__from_core.GetStrictOptionValue(newOptions, (($value: GoInterface | undefined): Tristate__from_core => {
                if (!$goInterfaceAdapter$Named_core$Tristate.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(newValue));
        }
        if (CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).allowJsFlag) {
            return CompilerOptions__from_core.GetAllowJS(oldOptions) !== CompilerOptions__from_core.GetAllowJS(newOptions);
        }
        return !reflect__from_gostdlib.DeepEqual(newValue, oldValue);
    });
}
export function ForEachCompilerOptionValue(options: {
    value: CompilerOptions__from_core;
} | undefined, declFilter: (($0: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined) => bool) | undefined, fn: (($0: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, $1: reflect__from_gostdlib.Value, $2: int) => bool) | undefined): bool {
    let optionsValue = reflect__from_gostdlib.ValueOf(new GoInterfaceAdapter(options)).Elem();
    const __gotots_range_0 = globalThis.Number(BigInt.asIntN(64, optionsValue.NumField()));
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        let i = __gotots_range_value_0;
        const __gotots_receiver_0 = $state.optionsType;
        const __gotots_argument_0 = i;
        let field = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_0)));
        if (!field.IsExported()) {
            continue;
        }
        {
            let optionDeclaration: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap).Get(field.Name);
            let __gotots_logical_result_0 = !(optionDeclaration === undefined);
            if (__gotots_logical_result_0) {
                const __gotots_callee_0 = declFilter;
                const __gotots_argument_1 = optionDeclaration;
                __gotots_logical_result_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
            }
            if (__gotots_logical_result_0) {
                const __gotots_callee_1 = fn;
                const __gotots_argument_2 = optionDeclaration;
                const __gotots_argument_3 = optionsValue.Field(BigInt.asIntN(64, goNumberToBigInt(i)));
                const __gotots_argument_4 = i;
                if ((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4)) {
                    return true;
                }
            }
        }
    }
    return false;
}
export function CompilerOptionsAffectSemanticDiagnostics(oldOptions: {
    value: CompilerOptions__from_core;
} | undefined, newOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    return optionsHaveChanges(oldOptions, newOptions, (option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): bool => {
        return CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).AffectsSemanticDiagnostics;
    });
}
export function CompilerOptionsAffectDeclarationPath(oldOptions: {
    value: CompilerOptions__from_core;
} | undefined, newOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    return optionsHaveChanges(oldOptions, newOptions, (option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): bool => {
        return CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).AffectsDeclarationPath;
    });
}
export function CompilerOptionsAffectEmit(oldOptions: {
    value: CompilerOptions__from_core;
} | undefined, newOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    return optionsHaveChanges(oldOptions, newOptions, (option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): bool => {
        return CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).AffectsEmit;
    });
}
