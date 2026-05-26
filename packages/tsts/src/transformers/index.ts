/**
 * Transformer passes for TS → JS lowering.
 *
 * Port of TS-Go `internal/transformers/`. The transformer pipeline
 * applies a series of passes — type erasure, import elision, target-
 * level downlevel, decorator lowering, etc. — between the AST and the
 * emitter.
 *
 * Current scope (committed in stages):
 *   - `transformer.ts`: base Transformer class with emit context wiring
 *   - `tstransforms/`: TypeScript-specific passes (typeeraser, importelision)
 *
 * Forthcoming (mirrors TS-Go file layout):
 *   - `chain.ts` (chain.go, transformer composition)
 *   - `destructuring.ts` (destructuring.go, destructuring lowering)
 *   - `modifiervisitor.ts` (modifier visiting helpers)
 *   - `utilities.ts`
 *   - `estransforms/`: ES feature downlevel passes (async, optional
 *     chaining, decorators, private fields, etc. — ~17 transformer
 *     files in TS-Go)
 *   - `jsxtransforms/`: JSX → JS lowering
 *   - `moduletransforms/`: module format conversion (ESM ↔ CJS ↔ AMD)
 *   - `declarations/`: .d.ts emission
 *   - `inliners/`: const-enum inlining
 */

export * from "./transformer.js";
export * from "./tstransforms/index.js";
