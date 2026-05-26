/**
 * ES feature downlevel transformer passes.
 *
 * Port of TS-Go `internal/transformers/estransforms/`. Includes
 * separate passes for async/await, class fields, decorators,
 * optional chaining, optional catch, object rest/spread, etc., plus
 * the chained "target ES2017" / "target ES2018" pipelines that
 * compose them.
 *
 * Current scope:
 *   - `definitions.ts`: target → chain mapping + getESTransformer
 *
 * Forthcoming (one file per upstream pass):
 *   - async.ts (1007 LoC), classfields.ts (3612 LoC),
 *     esdecorator.ts (2745 LoC), forawait.ts (856 LoC),
 *     using.ts (790 LoC), namedevaluation.ts (572 LoC),
 *     objectrestspread.ts (593 LoC), optionalchain.ts (240 LoC),
 *     taggedtemplate.ts (172 LoC), logicalassignment.ts (113 LoC),
 *     exponentiation.ts (90 LoC), classthis.ts (28 LoC),
 *     nullishcoalescing.ts (49 LoC), optionalcatch.ts (37 LoC),
 *     usestrict.ts (50 LoC), utilities.ts (289 LoC)
 */

export * from "./definitions.js";
