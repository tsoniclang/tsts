import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { TransformOptions as TransformOptions__from_transformers, Transformer as Transformer__from_transformers } from "../package.js";
import type * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
export class $PackageState {
    declare NewES2016Transformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare NewES2017Transformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare NewES2018Transformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare NewES2019Transformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare NewES2020Transformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare NewES2021Transformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare NewESNextTransformer: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare esDecoratorAndClassFields: (($0: TransformOptions__from_transformers | undefined) => Transformer__from_transformers | undefined) | undefined;
    declare newlineNormalizer: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Replacer> | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
