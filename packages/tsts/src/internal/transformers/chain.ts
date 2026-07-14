import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { Node } from "../ast/spine.js";
import { NodeDefault_AsNode } from "../ast/spine.js";
import { AsSourceFile } from "../ast/ast.js";
import type { HasFileName } from "../ast/ast.js";
import { KindSourceFile } from "../ast/generated/kinds.js";
import type { ReferenceResolver } from "../binder/referenceresolver.js";
import type { CompilerOptions, ModuleKind } from "../core/compileroptions.js";
import type { EmitContext } from "../printer/emitcontext.js";
import type { EmitResolver } from "../printer/emitresolver.js";
import type { Transformer } from "./transformer.js";
import { Transformer_NewTransformer, Transformer_TransformSourceFile } from "./transformer.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/chain.go::type::chainedTransformer","kind":"type","status":"implemented","sigHash":"48e08dc8c1052921aa216ab0dbe966a1daf0fe1e267f2ba63ab4f590f4609b5a"}
 *
 * Go source:
 * chainedTransformer struct {
 * 	Transformer
 * 	components []*Transformer
 * }
 */
export interface chainedTransformer {
  __tsgoEmbedded0: Transformer;
  components: GoSlice<GoPtr<Transformer>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/chain.go::method::chainedTransformer.visit","kind":"method","status":"implemented","sigHash":"76b735d77978416328612ee41871d9358e9e38e5a14c34da05ebff41aacbd713"}
 *
 * Go source:
 * func (ch *chainedTransformer) visit(node *ast.Node) *ast.Node {
 * 	if node.Kind != ast.KindSourceFile {
 * 		panic("Chained transform passed non-sourcefile initial node")
 * 	}
 * 	result := node.AsSourceFile()
 * 	for _, t := range ch.components {
 * 		result = t.TransformSourceFile(result)
 * 	}
 * 	return result.AsNode()
 * }
 */
export function chainedTransformer_visit(receiver: GoPtr<chainedTransformer>, node: GoPtr<Node>): GoPtr<Node> {
  if (node!.Kind !== KindSourceFile) {
    throw new globalThis.Error("Chained transform passed non-sourcefile initial node");
  }
  let result = AsSourceFile(node);
  for (const t of receiver!.components) {
    result = Transformer_TransformSourceFile(t, result);
  }
  return NodeDefault_AsNode(result);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/chain.go::type::TransformOptions","kind":"type","status":"implemented","sigHash":"f9126e4bd18e0921cf75ce180475c5bb9e80371d71f407ae5503a6b0cb428f99"}
 *
 * Go source:
 * TransformOptions struct {
 * 	Context                   *printer.EmitContext
 * 	CompilerOptions           *core.CompilerOptions
 * 	Resolver                  binder.ReferenceResolver
 * 	EmitResolver              printer.EmitResolver
 * 	GetEmitModuleFormatOfFile func(file ast.HasFileName) core.ModuleKind
 * }
 */
export interface TransformOptions {
  Context: GoPtr<EmitContext>;
  CompilerOptions: GoPtr<CompilerOptions>;
  Resolver: GoInterface<ReferenceResolver>;
  EmitResolver: GoInterface<EmitResolver>;
  GetEmitModuleFormatOfFile: GoFunc<(file: GoInterface<HasFileName>) => ModuleKind>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/chain.go::type::TransformerFactory","kind":"type","status":"implemented","sigHash":"93865b0767aad67ac61b95deb0cd6d64e956573d05eb869ae59ea5032e77211e"}
 *
 * Go source:
 * TransformerFactory = func(opt *TransformOptions) *Transformer
 */
export type TransformerFactory = GoFunc<(opt: GoPtr<TransformOptions>) => GoPtr<Transformer>>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/chain.go::func::Chain","kind":"func","status":"implemented","sigHash":"4535077da7abe385074521f6b03eeea9c03e894e07723703758c8f3d6c353b91"}
 *
 * Go source:
 * func Chain(transforms ...TransformerFactory) TransformerFactory {
 * 	if len(transforms) < 2 {
 * 		if len(transforms) == 0 {
 * 			panic("Expected some number of transforms to chain, but got none")
 * 		}
 * 		return transforms[0]
 * 	}
 * 	return func(opt *TransformOptions) *Transformer {
 * 		constructed := make([]*Transformer, 0, len(transforms))
 * 		for _, t := range transforms {
 * 			// TODO: flatten nested chains?
 * 			if result := t(opt); result != nil {
 * 				constructed = append(constructed, result)
 * 			}
 * 		}
 * 		switch len(constructed) {
 * 		case 0:
 * 			return nil
 * 		case 1:
 * 			return constructed[0]
 * 		}
 * 		ch := &chainedTransformer{components: constructed}
 * 		return ch.NewTransformer(ch.visit, opt.Context)
 * 	}
 * }
 */
export function Chain(...transforms: Array<TransformerFactory>): TransformerFactory {
  if (transforms.length < 2) {
    if (transforms.length === 0) {
      throw new globalThis.Error("Expected some number of transforms to chain, but got none");
    }
    return transforms[0]!;
  }
  return (opt: GoPtr<TransformOptions>): GoPtr<Transformer> => {
    const constructed: GoSlice<GoPtr<Transformer>> = [];
    for (const t of transforms) {
      // TODO: flatten nested chains?
      const result = t!(opt);
      if (result !== undefined) {
        constructed.push(result);
      }
    }
    switch (constructed.length) {
      case 0:
        return undefined;
      case 1:
        return constructed[0];
    }
    const ch: chainedTransformer = {
      __tsgoEmbedded0: { emitContext: undefined, factory: undefined, visitor: undefined },
      components: constructed,
    };
    return Transformer_NewTransformer(ch.__tsgoEmbedded0, (node) => chainedTransformer_visit(ch, node), opt!.Context);
  };
}
