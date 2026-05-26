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
 *   - `chain.ts`: factory composition
 *   - `tstransforms/`: TypeScript-specific passes (typeeraser, importelision)
 *   - `estransforms/`: ES-target chain definitions
 *
 * Forthcoming:
 *   - `destructuring.ts` (destructuring.go, 1500+ LoC)
 *   - `modifiervisitor.ts`
 *   - `utilities.ts`
 *   - `estransforms/`: individual feature passes (async, classfields,
 *     decorators, optional chaining, etc.)
 *   - `jsxtransforms/`: JSX → JS lowering
 *   - `moduletransforms/`: module format conversion (ESM ↔ CJS ↔ AMD)
 *   - `declarations/`: .d.ts emission
 *   - `inliners/`: const-enum inlining
 */

export * from "./transformer.js";
export * from "./chain.js";
export * from "./tstransforms/index.js";
export * from "./estransforms/index.js";
