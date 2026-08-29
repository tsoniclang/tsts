import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { TransformOptions as TransformOptions__from_transformers, Transformer as Transformer__from_transformers } from "../package.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { newAsyncTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/async.js";
import { newClassFieldsTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/classfields.js";
import { newESDecoratorTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/esdecorator.js";
import { newExponentiationTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/exponentiation.js";
import { newforawaitTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/forawait.js";
import { newLogicalAssignmentTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/logicalassignment.js";
import { newNullishCoalescingTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/nullishcoalescing.js";
import { newObjectRestSpreadTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/objectrestspread.js";
import { newOptionalCatchTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/optionalcatch.js";
import { newOptionalChainTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/optionalchain.js";
import { newTaggedTemplateLiftRestrictionTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/taggedtemplate.js";
import { newUsingDeclarationTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/using.js";
import { Chain as Chain__from_transformers } from "../package.js";
import { $state } from "./state.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.NewES2016Transformer = void 0;
    $state.NewES2017Transformer = void 0;
    $state.NewES2018Transformer = void 0;
    $state.NewES2019Transformer = void 0;
    $state.NewES2020Transformer = void 0;
    $state.NewES2021Transformer = void 0;
    $state.NewESNextTransformer = void 0;
    $state.esDecoratorAndClassFields = void 0;
    $state.newlineNormalizer = void 0;
    {
        $state.esDecoratorAndClassFields = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([newESDecoratorTransformer, newClassFieldsTransformer]));
    }
    {
        $state.NewESNextTransformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([newUsingDeclarationTransformer, $state.esDecoratorAndClassFields]));
    }
    {
        $state.NewES2021Transformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([$state.NewESNextTransformer, newLogicalAssignmentTransformer]));
    }
    {
        $state.NewES2020Transformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([$state.NewES2021Transformer, newNullishCoalescingTransformer, newOptionalChainTransformer]));
    }
    {
        $state.NewES2019Transformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([$state.NewES2020Transformer, newOptionalCatchTransformer]));
    }
    {
        const __gotots_conversion_0 = strings__from_gostdlib.NewReplacer(RuntimeSlice.literal<gostring>(["\r\n", "\n", "\r", "\n"]));
        $state.newlineNormalizer = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<strings__from_gostdlib.Replacer>(__gotots_conversion_0, (): strings__from_gostdlib.Replacer => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: strings__from_gostdlib.Replacer): void => {
                named_strings.StringsReplacerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
    }
    {
        $state.NewES2018Transformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([$state.NewES2019Transformer, newObjectRestSpreadTransformer, newforawaitTransformer, newTaggedTemplateLiftRestrictionTransformer]));
    }
    {
        $state.NewES2017Transformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([$state.NewES2018Transformer, newAsyncTransformer]));
    }
    {
        $state.NewES2016Transformer = Chain__from_transformers(RuntimeSlice.literal<(($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined>([$state.NewES2017Transformer, newExponentiationTransformer]));
    }
}
export { GetESTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/definitions.js";
export { NewUseStrictTransformer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/estransforms/usestrict.js";
export { $state };
