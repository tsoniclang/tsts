import type { GoPtr } from "../../../go/compat.js";
import type { HasFileName, Node, SourceFile } from "../../ast/ast.js";
import type { ReferenceResolver } from "../../binder/referenceresolver.js";
import type { ModuleKind } from "../../core/compileroptions.js";
import type { TransformOptions } from "../chain.js";
import type { Transformer } from "../transformer.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::type::ImpliedModuleTransformer","kind":"type","status":"stub","sigHash":"bba3453ca65bca4bf252bde994f7397978a8d160d66c5f665c723414bb0db34b","bodyHash":"717522209a1370056c2685713dc1aa872b935151de204acfba7cb2a02d238a2a"}
 *
 * Go source:
 * ImpliedModuleTransformer struct {
 * 	transformers.Transformer
 * 	opts                      *transformers.TransformOptions
 * 	resolver                  binder.ReferenceResolver
 * 	getEmitModuleFormatOfFile func(file ast.HasFileName) core.ModuleKind
 * 	cjsTransformer            *transformers.Transformer
 * 	esmTransformer            *transformers.Transformer
 * }
 */
export interface ImpliedModuleTransformer {
  readonly __tsgoEmbedded0?: Transformer;
  opts: GoPtr<TransformOptions>;
  resolver: ReferenceResolver;
  getEmitModuleFormatOfFile: (file: HasFileName) => ModuleKind;
  cjsTransformer: GoPtr<Transformer>;
  esmTransformer: GoPtr<Transformer>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::func::NewImpliedModuleTransformer","kind":"func","status":"stub","sigHash":"10ffc105389dbdfb7852a71023edd6f721a5e494ba6a0d77f56a4639f0fdb95a","bodyHash":"1cbca23d32f2dec4ada9139203ef258270f67fb980d9f4043c4696c219f6a001"}
 *
 * Go source:
 * func NewImpliedModuleTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
 * 	tx := &ImpliedModuleTransformer{opts: opts, resolver: opts.Resolver, getEmitModuleFormatOfFile: opts.GetEmitModuleFormatOfFile}
 * 	return tx.NewTransformer(tx.visit, opts.Context)
 * }
 */
export function NewImpliedModuleTransformer(opts: GoPtr<TransformOptions>): GoPtr<Transformer> {
  throw new globalThis.Error("TSGO_UNIMPLEMENTED github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::func::NewImpliedModuleTransformer");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::method::ImpliedModuleTransformer.visit","kind":"method","status":"stub","sigHash":"51b23f3a79a6daa719cf1fa10af4900226cee3adef7f6aff8ce2ebf69db69bc5","bodyHash":"42bcd725cd78751fb234e54763f9e9e8a36d13dfc8034959442e2777f032c2dc"}
 *
 * Go source:
 * func (tx *ImpliedModuleTransformer) visit(node *ast.Node) *ast.Node {
 * 	switch node.Kind {
 * 	case ast.KindSourceFile:
 * 		node = tx.visitSourceFile(node.AsSourceFile())
 * 	}
 * 	return node
 * }
 */
export function ImpliedModuleTransformer_visit(receiver: GoPtr<ImpliedModuleTransformer>, node: GoPtr<Node>): GoPtr<Node> {
  throw new globalThis.Error("TSGO_UNIMPLEMENTED github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::method::ImpliedModuleTransformer.visit");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::method::ImpliedModuleTransformer.visitSourceFile","kind":"method","status":"stub","sigHash":"98a420a53b8f012237527d946281eb087a4742a03340107d7294ff777665f1b8","bodyHash":"7808e768a7aa0c349934c32f1d7e93c71506c2e5dacd84c0eb26bd78ea2c48d9"}
 *
 * Go source:
 * func (tx *ImpliedModuleTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
 * 	if node.IsDeclarationFile {
 * 		return node.AsNode()
 * 	}
 * 
 * 	format := tx.getEmitModuleFormatOfFile(node)
 * 
 * 	var transformer *transformers.Transformer
 * 	if format >= core.ModuleKindES2015 {
 * 		if tx.esmTransformer == nil {
 * 			tx.esmTransformer = NewESModuleTransformer(tx.opts)
 * 		}
 * 		transformer = tx.esmTransformer
 * 	} else {
 * 		if tx.cjsTransformer == nil {
 * 			tx.cjsTransformer = NewCommonJSModuleTransformer(tx.opts)
 * 		}
 * 		transformer = tx.cjsTransformer
 * 	}
 * 
 * 	return transformer.TransformSourceFile(node).AsNode()
 * }
 */
export function ImpliedModuleTransformer_visitSourceFile(receiver: GoPtr<ImpliedModuleTransformer>, node: GoPtr<SourceFile>): GoPtr<Node> {
  throw new globalThis.Error("TSGO_UNIMPLEMENTED github.com/microsoft/typescript-go::internal/transformers/moduletransforms/impliedmodule.go::method::ImpliedModuleTransformer.visitSourceFile");
}
