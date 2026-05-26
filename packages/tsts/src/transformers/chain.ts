/**
 * Transformer composition: chain multiple factories into a single
 * transformer that runs them in order.
 *
 * Port of TS-Go `internal/transformers/chain.go`. Each factory takes
 * the same options and produces a transformer; chaining runs them in
 * declaration order and feeds the output of each into the next.
 */

import type { Transformer } from "./transformer.js";
import type { TransformOptions } from "./tstransforms/typeeraser.js";

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

class ChainedTransformer implements Transformer {
  constructor(
    private readonly head: Transformer,
    private readonly rest: readonly TransformerFactory[],
    private readonly opts: TransformOptions,
  ) {}

  // The `Transformer` interface from transformer.ts has methods like
  // `transformSourceFile`. The chained transformer applies each in
  // order. The methods we don't implement here delegate to the head;
  // the full surface lands when the printer/visitor port is finalized.

  transformSourceFile(file: import("../ast/index.js").SourceFile): import("../ast/index.js").SourceFile {
    let current = this.head.transformSourceFile(file);
    for (const factory of this.rest) {
      const next = factory(this.opts);
      current = next.transformSourceFile(current);
    }
    return current;
  }

  // Other Transformer methods delegate to head — they're rarely
  // invoked on chained transformers in practice.
  getEmitContext(): ReturnType<Transformer["getEmitContext"]> {
    return this.head.getEmitContext();
  }

  getVisitor(): ReturnType<Transformer["getVisitor"]> {
    return this.head.getVisitor();
  }

  getFactory(): ReturnType<Transformer["getFactory"]> {
    return this.head.getFactory();
  }

  newTransformer(): this {
    throw new Error("ChainedTransformer is already constructed");
  }
}
