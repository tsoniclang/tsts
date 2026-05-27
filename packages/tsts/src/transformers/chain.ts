/**
 * Transformer composition: chain multiple factories into a single
 * transformer that runs them in order.
 *
 * Port of TS-Go `internal/transformers/chain.go`. Each factory takes
 * the same options and produces a transformer; chaining runs them in
 * declaration order and feeds the output of each into the next.
 */

import { Transformer, type TransformOptions } from "./transformer.js";

/**
 * Factory function that produces a transformer from options.
 * Mirrors TS-Go's `func(opts *transformers.TransformOptions) *transformers.Transformer`.
 */
export type TransformerFactory = (opts: TransformOptions) => Transformer;

/**
 * Chains multiple transformer factories. The returned factory invokes
 * each in order with the same options; downstream consumers compose
 * the resulting transformers' source-file visitors.
 *
 * Mirrors TS-Go `Chain`.
 */
export function chain(...factories: readonly TransformerFactory[]): TransformerFactory {
  return (opts: TransformOptions): Transformer => {
    // The Go implementation returns a composite Transformer whose
    // TransformSourceFile applies each child in order. The TS port
    // mirrors that: run each factory, then compose source-file
    // transformations via the visitor chain.
    if (factories.length === 0) {
      throw new Error("chain: at least one factory required");
    }
    if (factories.length === 1) {
      return factories[0]!(opts);
    }
    const first = factories[0]!(opts);
    return new ChainedTransformer(first, factories.slice(1), opts);
  };
}

class ChainedTransformer extends Transformer {
  readonly #head: Transformer;
  readonly #rest: readonly TransformerFactory[];
  readonly #opts: TransformOptions;

  constructor(head: Transformer, rest: readonly TransformerFactory[], opts: TransformOptions) {
    super();
    this.#head = head;
    this.#rest = rest;
    this.#opts = opts;
    this.newTransformer((node) => node, opts.context);
  }

  override transformSourceFile(file: import("../ast/index.js").SourceFile): import("../ast/index.js").SourceFile {
    let current = this.#head.transformSourceFile(file);
    for (const factory of this.#rest) {
      const next = factory(this.#opts);
      current = next.transformSourceFile(current);
    }
    return current;
  }
}
