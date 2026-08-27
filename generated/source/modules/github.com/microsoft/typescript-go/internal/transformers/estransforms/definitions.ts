import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { TransformOptions as TransformOptions__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { CompilerOptions as CompilerOptions__from_core, ScriptTargetES2016$constant as ScriptTargetES2016$constant__from_core, ScriptTargetES2017$constant as ScriptTargetES2017$constant__from_core, ScriptTargetES2018$constant as ScriptTargetES2018$constant__from_core, ScriptTargetES2019$constant as ScriptTargetES2019$constant__from_core, ScriptTargetES2020$constant as ScriptTargetES2020$constant__from_core, ScriptTargetES2021$constant as ScriptTargetES2021$constant__from_core, ScriptTargetES2022$constant as ScriptTargetES2022$constant__from_core, ScriptTargetES2023$constant as ScriptTargetES2023$constant__from_core, ScriptTargetES2024$constant as ScriptTargetES2024$constant__from_core, ScriptTargetES2025$constant as ScriptTargetES2025$constant__from_core, ScriptTargetESNext$constant as ScriptTargetESNext$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/estransforms/state.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function GetESTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    switch (CompilerOptions__from_core.GetEmitScriptTarget(options)) {
        case ScriptTargetESNext$constant__from_core(): {
            const __gotots_callee_0 = $state.esDecoratorAndClassFields;
            const __gotots_argument_0 = opts;
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            break;
        }
        case ScriptTargetES2025$constant__from_core():
        case ScriptTargetES2024$constant__from_core():
        case ScriptTargetES2023$constant__from_core():
        case ScriptTargetES2022$constant__from_core():
        case ScriptTargetES2021$constant__from_core(): {
            const __gotots_callee_1 = $state.NewESNextTransformer;
            const __gotots_argument_1 = opts;
            return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
            break;
        }
        case ScriptTargetES2020$constant__from_core(): {
            const __gotots_callee_2 = $state.NewES2021Transformer;
            const __gotots_argument_2 = opts;
            return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
            break;
        }
        case ScriptTargetES2019$constant__from_core(): {
            const __gotots_callee_3 = $state.NewES2020Transformer;
            const __gotots_argument_3 = opts;
            return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            break;
        }
        case ScriptTargetES2018$constant__from_core(): {
            const __gotots_callee_4 = $state.NewES2019Transformer;
            const __gotots_argument_4 = opts;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
            break;
        }
        case ScriptTargetES2017$constant__from_core(): {
            const __gotots_callee_5 = $state.NewES2018Transformer;
            const __gotots_argument_5 = opts;
            return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
            break;
        }
        case ScriptTargetES2016$constant__from_core(): {
            const __gotots_callee_6 = $state.NewES2017Transformer;
            const __gotots_argument_6 = opts;
            return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
            break;
        }
        default: {
            const __gotots_callee_7 = $state.NewES2016Transformer;
            const __gotots_argument_7 = opts;
            return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
            break;
        }
    }
}
