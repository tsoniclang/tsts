/**
 * ES-target transformer pipeline definitions.
 *
 * Port of TS-Go `internal/transformers/estransforms/definitions.go`.
 *
 * Each downlevel target is built by chaining the necessary feature
 * transformers. The chain order matters — features lower into one
 * another, so e.g. `async` must run after `forAwait` (which needs
 * unaltered async forms to recognize them).
 *
 * Individual transformer constructors (`newAsyncTransformer`,
 * `newClassFieldsTransformer`, etc.) live in their own files; this
 * file just wires the target → chain mapping.
 */

import { chain, type TransformerFactory } from "../chain.js";
import type { Transformer } from "../transformer.js";

import type { CompilerOptionsForTypeEraser as CompilerOptionsForESTransform, TransformOptions } from "../tstransforms/typeeraser.js";

// Forward declarations: each ES feature has its own constructor in
// the matching file (classfields.ts, optionalchain.ts, etc.).
declare const newESDecoratorTransformer: TransformerFactory;
declare const newClassFieldsTransformer: TransformerFactory;
declare const newUsingDeclarationTransformer: TransformerFactory;
declare const newLogicalAssignmentTransformer: TransformerFactory;
declare const newNullishCoalescingTransformer: TransformerFactory;
declare const newOptionalChainTransformer: TransformerFactory;
declare const newOptionalCatchTransformer: TransformerFactory;
declare const newObjectRestSpreadTransformer: TransformerFactory;
declare const newforawaitTransformer: TransformerFactory;
declare const newTaggedTemplateLiftRestrictionTransformer: TransformerFactory;
declare const newAsyncTransformer: TransformerFactory;
declare const newExponentiationTransformer: TransformerFactory;

const esDecoratorAndClassFields = chain(newESDecoratorTransformer, newClassFieldsTransformer);

export const newESNextTransformer = chain(newUsingDeclarationTransformer, esDecoratorAndClassFields);

// 2025: only module syntax (import attributes, JSON modules), untransformed regex modifiers
// 2024: no new downlevel syntax
// 2023: no new downlevel syntax
// 2022: class static blocks + class fields handled by newClassFieldsTransformer

export const newES2021Transformer = chain(newESNextTransformer, newLogicalAssignmentTransformer);
export const newES2020Transformer = chain(newES2021Transformer, newNullishCoalescingTransformer, newOptionalChainTransformer);
export const newES2019Transformer = chain(newES2020Transformer, newOptionalCatchTransformer);
export const newES2018Transformer = chain(
  newES2019Transformer,
  newObjectRestSpreadTransformer,
  newforawaitTransformer,
  newTaggedTemplateLiftRestrictionTransformer,
);
export const newES2017Transformer = chain(newES2018Transformer, newAsyncTransformer);
export const newES2016Transformer = chain(newES2017Transformer, newExponentiationTransformer);

/**
 * Forward-declared script target. Real shape lands with the core port.
 */
export type ScriptTarget =
  | "es3"
  | "es5"
  | "es2015"
  | "es2016"
  | "es2017"
  | "es2018"
  | "es2019"
  | "es2020"
  | "es2021"
  | "es2022"
  | "es2023"
  | "es2024"
  | "es2025"
  | "esnext"
  | "latest";

export const ScriptTarget: {
  readonly ES3: ScriptTarget;
  readonly ES5: ScriptTarget;
  readonly ES2015: ScriptTarget;
  readonly ES2016: ScriptTarget;
  readonly ES2017: ScriptTarget;
  readonly ES2018: ScriptTarget;
  readonly ES2019: ScriptTarget;
  readonly ES2020: ScriptTarget;
  readonly ES2021: ScriptTarget;
  readonly ES2022: ScriptTarget;
  readonly ES2023: ScriptTarget;
  readonly ES2024: ScriptTarget;
  readonly ES2025: ScriptTarget;
  readonly ESNext: ScriptTarget;
  readonly Latest: ScriptTarget;
} = {
  ES3: "es3",
  ES5: "es5",
  ES2015: "es2015",
  ES2016: "es2016",
  ES2017: "es2017",
  ES2018: "es2018",
  ES2019: "es2019",
  ES2020: "es2020",
  ES2021: "es2021",
  ES2022: "es2022",
  ES2023: "es2023",
  ES2024: "es2024",
  ES2025: "es2025",
  ESNext: "esnext",
  Latest: "latest",
};

/**
 * Forward-declared `core.CompilerOptions` field used by
 * `getESTransformer`.
 */
export interface CompilerOptionsForESTransformer extends CompilerOptionsForESTransform {
  getEmitScriptTarget(): ScriptTarget;
}

/**
 * Returns the transformer pipeline appropriate for the target script
 * level. Mirrors TS-Go `GetESTransformer`.
 */
export function getESTransformer(opts: TransformOptions & { readonly compilerOptions: CompilerOptionsForESTransformer }): Transformer {
  const target = opts.compilerOptions.getEmitScriptTarget();
  switch (target) {
    case ScriptTarget.ESNext:
      return esDecoratorAndClassFields(opts);
    case ScriptTarget.ES2025:
    case ScriptTarget.ES2024:
    case ScriptTarget.ES2023:
    case ScriptTarget.ES2022:
    case ScriptTarget.ES2021:
      return newESNextTransformer(opts);
    case ScriptTarget.ES2020:
      return newES2021Transformer(opts);
    case ScriptTarget.ES2019:
      return newES2020Transformer(opts);
    case ScriptTarget.ES2018:
      return newES2019Transformer(opts);
    case ScriptTarget.ES2017:
      return newES2018Transformer(opts);
    case ScriptTarget.ES2016:
      return newES2017Transformer(opts);
    default:
      return newES2016Transformer(opts);
  }
}
