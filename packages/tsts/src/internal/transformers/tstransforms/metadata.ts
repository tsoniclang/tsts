import type { bool } from "../../../go/scalars.js";
import { GoNilSlice, type GoPtr, type GoSlice } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend, GoSliceAppendSlice } from "../../../go/compat.js";
import type { ModifierList, Node } from "../../ast/spine.js";
import { NodeFactory_NewModifierList, NodeFactory_NewNodeList } from "../../ast/spine.js";
import type { ClassDeclaration, ClassExpression, GetAccessorDeclaration, MethodDeclaration, PropertyDeclaration, SetAccessorDeclaration } from "../../ast/generated/data.js";
import { NewArrowFunction, NewDecorator, NewIdentifier, NewObjectLiteralExpression, NewPropertyAssignment, NewToken } from "../../ast/generated/factory.js";
import { KindBlock, KindCaseBlock, KindClassDeclaration, KindClassExpression, KindDefaultKeyword, KindEqualsGreaterThanToken, KindExportKeyword, KindGetAccessor, KindMethodDeclaration, KindModuleBlock, KindPropertyDeclaration, KindSetAccessor, KindSourceFile } from "../../ast/generated/kinds.js";
import { IsDecorator } from "../../ast/generated/predicates.js";
import { ClassElementOrClassElementParameterIsDecorated, ClassOrConstructorParameterIsDecorated, GetFirstConstructorWithBody, HasDecorators, IsClassLike, IsModifier } from "../../ast/utilities.js";
import { NodeFactory_UpdateClassDeclaration, NodeFactory_UpdateClassExpression, NodeFactory_UpdateGetAccessorDeclaration, NodeFactory_UpdateMethodDeclaration, NodeFactory_UpdatePropertyDeclaration, NodeFactory_UpdateSetAccessorDeclaration } from "../../ast/ast.js";
import { Node_SubtreeFacts } from "../../ast/spine.js";
import { SubtreeContainsDecorators } from "../../ast/subtreefacts.js";
import { Filter } from "../../core/core.js";
import { CompilerOptions_GetEmitScriptTarget, CompilerOptions_GetStrictOptionValue } from "../../core/compileroptions.js";
import type { ScriptTarget } from "../../core/compileroptions.js";
import { Tristate_IsTrue } from "../../core/tristate.js";
import { EmitContext_AddEmitHelper, EmitContext_ReadEmitHelpers } from "../../printer/emitcontext.js";
import type { EmitResolver } from "../../printer/emitresolver.js";
import { NodeFactory_NewMetadataHelper } from "../../printer/factory.js";
import type { TransformOptions } from "../chain.js";
import type { Transformer } from "../transformer.js";
import { Transformer_EmitContext, Transformer_Factory, Transformer_NewTransformer, Transformer_Visitor } from "../transformer.js";
import { NodeVisitor_VisitEachChild, NodeVisitor_VisitModifiers, NodeVisitor_VisitNode, NodeVisitor_VisitNodes } from "../../ast/visitor.js";
import type { NodeVisitor as ConcreteNodeVisitor } from "../../ast/visitor.js";
import type { metadataSerializer } from "./typeserializer.js";
import { metadataSerializer_SerializeParameterTypesOfNode, metadataSerializer_SerializeReturnTypeOfNode, metadataSerializer_SerializeTypeOfNode, newMetadataSerializer } from "./typeserializer.js";
import { Node_Modifiers } from "../../ast/spine.js";
import { getDecoratorsOfParameters } from "./legacydecorators.js";

import type { GoInterface } from "../../../go/compat.js";
import { GoSliceBuild, GoSliceMake, GoSliceStore } from "../../../go/compat.js";
import { GoSliceLoad } from "../../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::constGroup::USE_NEW_TYPE_METADATA_FORMAT","kind":"constGroup","status":"implemented","sigHash":"273dcdebb539096b9ef13508c6039fa57341a018341ac680cd2d1666a81759b4"}
 *
 * Go source:
 * const USE_NEW_TYPE_METADATA_FORMAT = false
 */
export const USE_NEW_TYPE_METADATA_FORMAT: bool = false;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::type::MetadataTransformer","kind":"type","status":"implemented","sigHash":"d6679af0816e053c4df3bdb0a1958133b76480ce6eb12bf3f8e2f704be44e59e"}
 *
 * Go source:
 * MetadataTransformer struct {
 * 	transformers.Transformer
 * 	legacyDecorators bool
 * 	resolver         printer.EmitResolver
 *
 * 	serializer          *metadataSerializer
 * 	languageVersion     core.ScriptTarget
 * 	strictNullChecks    bool
 * 	parent              *ast.Node
 * 	currentLexicalScope *ast.Node
 * }
 */
export interface MetadataTransformer {
  __tsgoEmbedded0: Transformer;
  legacyDecorators: bool;
  resolver: GoInterface<EmitResolver>;
  serializer: GoPtr<metadataSerializer>;
  languageVersion: ScriptTarget;
  strictNullChecks: bool;
  parent: GoPtr<Node>;
  currentLexicalScope: GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::func::NewMetadataTransformer","kind":"func","status":"implemented","sigHash":"ded46d7397187561b63f38a4e609ea34fab1e7a3a80471cef2632d8fa1c5ec5c"}
 *
 * Go source:
 * func NewMetadataTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
 * 	tx := &MetadataTransformer{
 * 		legacyDecorators: opt.CompilerOptions.ExperimentalDecorators.IsTrue(),
 * 		resolver:         opt.EmitResolver,
 * 		languageVersion:  opt.CompilerOptions.GetEmitScriptTarget(),
 * 		strictNullChecks: opt.CompilerOptions.GetStrictOptionValue(opt.CompilerOptions.StrictNullChecks),
 * 	}
 * 	return tx.NewTransformer(tx.visit, opt.Context)
 * }
 */
export function NewMetadataTransformer(opt: GoPtr<TransformOptions>): GoPtr<Transformer> {
  const tx: MetadataTransformer = {
    __tsgoEmbedded0: { emitContext: undefined, factory: undefined, visitor: undefined },
    legacyDecorators: Tristate_IsTrue(opt!.CompilerOptions!.ExperimentalDecorators) as bool,
    resolver: opt!.EmitResolver,
    serializer: undefined,
    languageVersion: CompilerOptions_GetEmitScriptTarget(opt!.CompilerOptions),
    strictNullChecks: CompilerOptions_GetStrictOptionValue(opt!.CompilerOptions, opt!.CompilerOptions!.StrictNullChecks) as bool,
    parent: undefined,
    currentLexicalScope: undefined,
  };
  return Transformer_NewTransformer(tx.__tsgoEmbedded0, (node) => MetadataTransformer_visit(tx, node), opt!.Context);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visit","kind":"method","status":"implemented","sigHash":"6a725d7bfb78b92078fb10e6132a5e66bf179077ef4c6ac427734c98f4df72fe"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visit(node *ast.Node) *ast.Node {
 * 	if (node.SubtreeFacts() & ast.SubtreeContainsDecorators) == 0 {
 * 		return node
 * 	}
 *
 * 	switch node.Kind {
 * 	case ast.KindClassDeclaration:
 * 		return tx.visitClassDeclaration(node.AsClassDeclaration())
 * 	case ast.KindClassExpression:
 * 		return tx.visitClassExpression(node.AsClassExpression())
 * 	case ast.KindPropertyDeclaration:
 * 		return tx.visitPropertyDeclaration(node.AsPropertyDeclaration())
 * 	case ast.KindMethodDeclaration:
 * 		return tx.visitMethodDeclaration(node.AsMethodDeclaration())
 * 	case ast.KindSetAccessor:
 * 		return tx.visitSetAccessor(node.AsSetAccessorDeclaration())
 * 	case ast.KindGetAccessor:
 * 		return tx.visitGetAccessor(node.AsGetAccessorDeclaration())
 * 	case ast.KindSourceFile:
 * 		tx.parent = nil
 * 		defer tx.setParent(nil)
 * 		tx.currentLexicalScope = node
 * 		defer tx.setCurrentLexicalScope(nil)
 * 		tx.serializer = newMetadataSerializer(tx.resolver, tx.Factory(), tx.EmitContext(), tx.languageVersion, tx.strictNullChecks)
 * 		updated := tx.Visitor().VisitEachChild(node)
 * 		tx.EmitContext().AddEmitHelper(updated, tx.EmitContext().ReadEmitHelpers()...)
 * 		return updated
 * 	case ast.KindModuleBlock, ast.KindBlock, ast.KindCaseBlock:
 * 		oldScope := tx.currentLexicalScope
 * 		tx.currentLexicalScope = node
 * 		defer tx.setCurrentLexicalScope(oldScope)
 * 		return tx.Visitor().VisitEachChild(node)
 * 	default:
 * 		return tx.Visitor().VisitEachChild(node)
 * 	}
 * }
 */
export function MetadataTransformer_visit(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>): GoPtr<Node> {
  if ((Node_SubtreeFacts(node) & SubtreeContainsDecorators) === 0) {
    return node;
  }

  const tx = receiver!;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;

  switch (node!.Kind) {
    case KindMethodDeclaration:
      return MetadataTransformer_visitMethodDeclaration(receiver, node as unknown as GoPtr<MethodDeclaration>);
    case KindSetAccessor:
      return MetadataTransformer_visitSetAccessor(receiver, node as unknown as GoPtr<SetAccessorDeclaration>);
    case KindGetAccessor:
      return MetadataTransformer_visitGetAccessor(receiver, node as unknown as GoPtr<GetAccessorDeclaration>);
    case KindPropertyDeclaration:
      return MetadataTransformer_visitPropertyDeclaration(receiver, node as unknown as GoPtr<PropertyDeclaration>);
    case KindSourceFile: {
      const savedParent = tx.parent;
      tx.parent = undefined;
      const savedScope0 = tx.currentLexicalScope;
      tx.currentLexicalScope = node;
      tx.serializer = newMetadataSerializer(tx.resolver, Transformer_Factory(tx.__tsgoEmbedded0), Transformer_EmitContext(tx.__tsgoEmbedded0), tx.languageVersion, tx.strictNullChecks);
      let updated: GoPtr<Node>;
      try {
        updated = NodeVisitor_VisitEachChild(visitor, node);
        EmitContext_AddEmitHelper(Transformer_EmitContext(tx.__tsgoEmbedded0), updated, ...EmitContext_ReadEmitHelpers(Transformer_EmitContext(tx.__tsgoEmbedded0)));
      } finally {
        MetadataTransformer_setCurrentLexicalScope(receiver, savedScope0);
        MetadataTransformer_setParent(receiver, savedParent);
      }
      return updated!;
    }
    case KindModuleBlock:
    case KindBlock:
    case KindCaseBlock: {
      const oldScope = tx.currentLexicalScope;
      tx.currentLexicalScope = node;
      let result: GoPtr<Node>;
      try {
        result = NodeVisitor_VisitEachChild(visitor, node);
      } finally {
        MetadataTransformer_setCurrentLexicalScope(receiver, oldScope);
      }
      return result!;
    }
    case KindClassDeclaration:
      return MetadataTransformer_visitClassDeclaration(receiver, node as unknown as GoPtr<ClassDeclaration>);
    case KindClassExpression:
      return MetadataTransformer_visitClassExpression(receiver, node as unknown as GoPtr<ClassExpression>);
    default:
      return NodeVisitor_VisitEachChild(visitor, node);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.setParent","kind":"method","status":"implemented","sigHash":"9d22518f2eda3506462926e737dabb279c82339ab65a8e42a3a56262468ff4fb"}
 *
 * Go source:
 * func (tx *MetadataTransformer) setParent(node *ast.Node) {
 * 	tx.parent = node
 * }
 */
export function MetadataTransformer_setParent(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>): void {
  const tx = receiver!;
  tx.parent = node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.setCurrentLexicalScope","kind":"method","status":"implemented","sigHash":"2bd038f1e3871586ee907962770a9b87c38969f6a115a1b24bef4c3ec18e4052"}
 *
 * Go source:
 * func (tx *MetadataTransformer) setCurrentLexicalScope(node *ast.Node) {
 * 	tx.currentLexicalScope = node
 * }
 */
export function MetadataTransformer_setCurrentLexicalScope(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>): void {
  const tx = receiver!;
  tx.currentLexicalScope = node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visitClassExpression","kind":"method","status":"implemented","sigHash":"7e4b84c111b963fb5f8d4d91d149dd25956f736b6be4b924caa6013b785a0a12"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
 * 	oldParent := tx.parent
 * 	tx.parent = node.AsNode()
 * 	defer tx.setParent(oldParent)
 *
 * 	if !ast.ClassOrConstructorParameterIsDecorated(tx.legacyDecorators, node.AsNode()) {
 * 		return tx.Visitor().VisitEachChild(node.AsNode())
 * 	}
 * 	modifiers := tx.injectClassTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode())
 * 	return tx.Factory().UpdateClassExpression(
 * 		node,
 * 		modifiers,
 * 		tx.Visitor().VisitNode(node.Name()),
 * 		tx.Visitor().VisitNodes(node.TypeParameters),
 * 		tx.Visitor().VisitNodes(node.HeritageClauses),
 * 		tx.Visitor().VisitNodes(node.Members),
 * 	)
 * }
 */
export function MetadataTransformer_visitClassExpression(receiver: GoPtr<MetadataTransformer>, node: GoPtr<ClassExpression>): GoPtr<Node> {
  const tx = receiver!;
  const oldParent = tx.parent;
  tx.parent = node as unknown as GoPtr<Node>;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const astFactory = Transformer_Factory(tx.__tsgoEmbedded0)!.__tsgoEmbedded0!;
  const nodeAsNode = node as unknown as GoPtr<Node>;
  let result: GoPtr<Node>;
  try {
    if (!ClassOrConstructorParameterIsDecorated(tx.legacyDecorators, nodeAsNode)) {
      result = NodeVisitor_VisitEachChild(visitor, nodeAsNode);
    } else {
      const modifiers = MetadataTransformer_injectClassTypeMetadata(receiver, NodeVisitor_VisitModifiers(visitor, Node_Modifiers(nodeAsNode)), nodeAsNode);
      result = NodeFactory_UpdateClassExpression(
        astFactory,
        node,
        modifiers,
        NodeVisitor_VisitNode(visitor, node!.name as unknown as GoPtr<Node>),
        NodeVisitor_VisitNodes(visitor, node!.TypeParameters),
        NodeVisitor_VisitNodes(visitor, node!.HeritageClauses),
        NodeVisitor_VisitNodes(visitor, node!.Members),
      );
    }
  } finally {
    MetadataTransformer_setParent(receiver, oldParent);
  }
  return result!;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visitClassDeclaration","kind":"method","status":"implemented","sigHash":"c7ffec6275286e3dbc7a5f0daeadcde48684520b1906086d1ca1df4c47a33f75"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visitClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
 * 	oldParent := tx.parent
 * 	tx.parent = node.AsNode()
 * 	defer tx.setParent(oldParent)
 *
 * 	if !ast.ClassOrConstructorParameterIsDecorated(tx.legacyDecorators, node.AsNode()) {
 * 		return tx.Visitor().VisitEachChild(node.AsNode())
 * 	}
 * 	modifiers := tx.injectClassTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode())
 * 	return tx.Factory().UpdateClassDeclaration(
 * 		node,
 * 		modifiers,
 * 		tx.Visitor().VisitNode(node.Name()),
 * 		tx.Visitor().VisitNodes(node.TypeParameters),
 * 		tx.Visitor().VisitNodes(node.HeritageClauses),
 * 		tx.Visitor().VisitNodes(node.Members),
 * 	)
 * }
 */
export function MetadataTransformer_visitClassDeclaration(receiver: GoPtr<MetadataTransformer>, node: GoPtr<ClassDeclaration>): GoPtr<Node> {
  const tx = receiver!;
  const oldParent = tx.parent;
  tx.parent = node as unknown as GoPtr<Node>;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const astFactory = Transformer_Factory(tx.__tsgoEmbedded0)!.__tsgoEmbedded0!;
  const nodeAsNode = node as unknown as GoPtr<Node>;
  let result: GoPtr<Node>;
  try {
    if (!ClassOrConstructorParameterIsDecorated(tx.legacyDecorators, nodeAsNode)) {
      result = NodeVisitor_VisitEachChild(visitor, nodeAsNode);
    } else {
      const modifiers = MetadataTransformer_injectClassTypeMetadata(receiver, NodeVisitor_VisitModifiers(visitor, Node_Modifiers(nodeAsNode)), nodeAsNode);
      result = NodeFactory_UpdateClassDeclaration(
        astFactory,
        node,
        modifiers,
        NodeVisitor_VisitNode(visitor, node!.name as unknown as GoPtr<Node>),
        NodeVisitor_VisitNodes(visitor, node!.TypeParameters),
        NodeVisitor_VisitNodes(visitor, node!.HeritageClauses),
        NodeVisitor_VisitNodes(visitor, node!.Members),
      );
    }
  } finally {
    MetadataTransformer_setParent(receiver, oldParent);
  }
  return result!;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visitPropertyDeclaration","kind":"method","status":"implemented","sigHash":"6c409a23d811c0e933edeef15c2e20f1f49a40f6fd609de60a6e6eec11b84bba"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visitPropertyDeclaration(node *ast.PropertyDeclaration) *ast.Node {
 * 	if !ast.HasDecorators(node.AsNode()) {
 * 		return tx.Visitor().VisitEachChild(node.AsNode())
 * 	}
 *
 * 	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
 * 	return tx.Factory().UpdatePropertyDeclaration(
 * 		node,
 * 		modifiers,
 * 		tx.Visitor().VisitNode(node.Name()),
 * 		tx.Visitor().VisitNode(node.PostfixToken),
 * 		tx.Visitor().VisitNode(node.Type),
 * 		tx.Visitor().VisitNode(node.Initializer),
 * 	)
 * }
 */
export function MetadataTransformer_visitPropertyDeclaration(receiver: GoPtr<MetadataTransformer>, node: GoPtr<PropertyDeclaration>): GoPtr<Node> {
  const tx = receiver!;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const astFactory = Transformer_Factory(tx.__tsgoEmbedded0)!.__tsgoEmbedded0!;
  const nodeAsNode = node as unknown as GoPtr<Node>;
  if (!HasDecorators(nodeAsNode)) {
    return NodeVisitor_VisitEachChild(visitor, nodeAsNode);
  }

  const modifiers = MetadataTransformer_injectClassElementTypeMetadata(receiver, NodeVisitor_VisitModifiers(visitor, Node_Modifiers(nodeAsNode)), nodeAsNode, tx.parent);
  return NodeFactory_UpdatePropertyDeclaration(
    astFactory,
    node,
    modifiers,
    NodeVisitor_VisitNode(visitor, node!.name as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.PostfixToken as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.Type as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.Initializer as unknown as GoPtr<Node>),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visitMethodDeclaration","kind":"method","status":"implemented","sigHash":"d647cf2a2af6fbe0399365c96373a7a60385762e0bc7ae359938f525e40bf306"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visitMethodDeclaration(node *ast.MethodDeclaration) *ast.Node {
 * 	if !ast.HasDecorators(node.AsNode()) && len(getDecoratorsOfParameters(node.AsNode())) == 0 {
 * 		return tx.Visitor().VisitEachChild(node.AsNode())
 * 	}
 *
 * 	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
 * 	return tx.Factory().UpdateMethodDeclaration(
 * 		node,
 * 		modifiers,
 * 		tx.Visitor().VisitNode(node.AsteriskToken),
 * 		tx.Visitor().VisitNode(node.Name()),
 * 		tx.Visitor().VisitNode(node.PostfixToken),
 * 		tx.Visitor().VisitNodes(node.TypeParameters),
 * 		tx.Visitor().VisitNodes(node.Parameters),
 * 		tx.Visitor().VisitNode(node.Type),
 * 		tx.Visitor().VisitNode(node.FullSignature),
 * 		tx.Visitor().VisitNode(node.Body),
 * 	)
 * }
 */
export function MetadataTransformer_visitMethodDeclaration(receiver: GoPtr<MetadataTransformer>, node: GoPtr<MethodDeclaration>): GoPtr<Node> {
  const tx = receiver!;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const astFactory = Transformer_Factory(tx.__tsgoEmbedded0)!.__tsgoEmbedded0!;
  const nodeAsNode = node as unknown as GoPtr<Node>;
  if (!HasDecorators(nodeAsNode) && getDecoratorsOfParameters(nodeAsNode).length === 0) {
    return NodeVisitor_VisitEachChild(visitor, nodeAsNode);
  }

  const modifiers = MetadataTransformer_injectClassElementTypeMetadata(receiver, NodeVisitor_VisitModifiers(visitor, Node_Modifiers(nodeAsNode)), nodeAsNode, tx.parent);
  return NodeFactory_UpdateMethodDeclaration(
    astFactory,
    node,
    modifiers,
    NodeVisitor_VisitNode(visitor, node!.AsteriskToken as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.name as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.PostfixToken as unknown as GoPtr<Node>),
    NodeVisitor_VisitNodes(visitor, node!.TypeParameters),
    NodeVisitor_VisitNodes(visitor, node!.Parameters),
    NodeVisitor_VisitNode(visitor, node!.Type as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.FullSignature as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.Body as unknown as GoPtr<Node>),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visitSetAccessor","kind":"method","status":"implemented","sigHash":"382125188ded0fe0bb9529e7636ef67bfd044508dc0ac0a58afbc6bb97a9317f"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visitSetAccessor(node *ast.SetAccessorDeclaration) *ast.Node {
 * 	if !ast.HasDecorators(node.AsNode()) && len(getDecoratorsOfParameters(node.AsNode())) == 0 {
 * 		return tx.Visitor().VisitEachChild(node.AsNode())
 * 	}
 *
 * 	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
 * 	return tx.Factory().UpdateSetAccessorDeclaration(
 * 		node,
 * 		modifiers,
 * 		tx.Visitor().VisitNode(node.Name()),
 * 		tx.Visitor().VisitNodes(node.TypeParameters),
 * 		tx.Visitor().VisitNodes(node.Parameters),
 * 		tx.Visitor().VisitNode(node.Type),
 * 		tx.Visitor().VisitNode(node.FullSignature),
 * 		tx.Visitor().VisitNode(node.Body),
 * 	)
 * }
 */
export function MetadataTransformer_visitSetAccessor(receiver: GoPtr<MetadataTransformer>, node: GoPtr<SetAccessorDeclaration>): GoPtr<Node> {
  const tx = receiver!;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const astFactory = Transformer_Factory(tx.__tsgoEmbedded0)!.__tsgoEmbedded0!;
  const nodeAsNode = node as unknown as GoPtr<Node>;
  if (!HasDecorators(nodeAsNode) && getDecoratorsOfParameters(nodeAsNode).length === 0) {
    return NodeVisitor_VisitEachChild(visitor, nodeAsNode);
  }

  const modifiers = MetadataTransformer_injectClassElementTypeMetadata(receiver, NodeVisitor_VisitModifiers(visitor, Node_Modifiers(nodeAsNode)), nodeAsNode, tx.parent);
  return NodeFactory_UpdateSetAccessorDeclaration(
    astFactory,
    node,
    modifiers,
    NodeVisitor_VisitNode(visitor, node!.name as unknown as GoPtr<Node>),
    NodeVisitor_VisitNodes(visitor, node!.TypeParameters),
    NodeVisitor_VisitNodes(visitor, node!.Parameters),
    NodeVisitor_VisitNode(visitor, node!.Type as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.FullSignature as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.Body as unknown as GoPtr<Node>),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.visitGetAccessor","kind":"method","status":"implemented","sigHash":"7f918208b108e38fefeaea0bea0b5e936c48952a2500384906ef485e6cea7a99"}
 *
 * Go source:
 * func (tx *MetadataTransformer) visitGetAccessor(node *ast.GetAccessorDeclaration) *ast.Node {
 * 	if !ast.HasDecorators(node.AsNode()) {
 * 		return tx.Visitor().VisitEachChild(node.AsNode())
 * 	}
 *
 * 	modifiers := tx.injectClassElementTypeMetadata(tx.Visitor().VisitModifiers(node.Modifiers()), node.AsNode(), tx.parent)
 * 	return tx.Factory().UpdateGetAccessorDeclaration(
 * 		node,
 * 		modifiers,
 * 		tx.Visitor().VisitNode(node.Name()),
 * 		tx.Visitor().VisitNodes(node.TypeParameters),
 * 		tx.Visitor().VisitNodes(node.Parameters),
 * 		tx.Visitor().VisitNode(node.Type),
 * 		tx.Visitor().VisitNode(node.FullSignature),
 * 		tx.Visitor().VisitNode(node.Body),
 * 	)
 * }
 */
export function MetadataTransformer_visitGetAccessor(receiver: GoPtr<MetadataTransformer>, node: GoPtr<GetAccessorDeclaration>): GoPtr<Node> {
  const tx = receiver!;
  const visitor = Transformer_Visitor(tx.__tsgoEmbedded0) as ConcreteNodeVisitor;
  const astFactory = Transformer_Factory(tx.__tsgoEmbedded0)!.__tsgoEmbedded0!;
  const nodeAsNode = node as unknown as GoPtr<Node>;
  if (!HasDecorators(nodeAsNode)) {
    return NodeVisitor_VisitEachChild(visitor, nodeAsNode);
  }

  const modifiers = MetadataTransformer_injectClassElementTypeMetadata(receiver, NodeVisitor_VisitModifiers(visitor, Node_Modifiers(nodeAsNode)), nodeAsNode, tx.parent);
  return NodeFactory_UpdateGetAccessorDeclaration(
    astFactory,
    node,
    modifiers,
    NodeVisitor_VisitNode(visitor, node!.name as unknown as GoPtr<Node>),
    NodeVisitor_VisitNodes(visitor, node!.TypeParameters),
    NodeVisitor_VisitNodes(visitor, node!.Parameters),
    NodeVisitor_VisitNode(visitor, node!.Type as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.FullSignature as unknown as GoPtr<Node>),
    NodeVisitor_VisitNode(visitor, node!.Body as unknown as GoPtr<Node>),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.injectClassTypeMetadata","kind":"method","status":"implemented","sigHash":"c2589e88b72f0183dfc7e49fdf632c95322e40d5524c7055e92d38af54407cfe"}
 *
 * Go source:
 * func (tx *MetadataTransformer) injectClassTypeMetadata(list *ast.ModifierList, node *ast.Node) *ast.ModifierList {
 * 	metadata := tx.getTypeMetadata(node, node)
 * 	if len(metadata) > 0 {
 * 		var originalNodes []*ast.Node
 * 		if list != nil {
 * 			originalNodes = list.Nodes
 * 		}
 * 		if len(originalNodes) == 0 {
 * 			res := tx.Factory().NewModifierList(metadata)
 * 			if list != nil {
 * 				res.Loc = list.Loc
 * 			}
 * 			return res
 * 		}
 * 		var modifiersArray []*ast.Node
 * 		if ast.IsModifier(originalNodes[0]) && (originalNodes[0].Kind == ast.KindDefaultKeyword || originalNodes[0].Kind == ast.KindExportKeyword) {
 * 			modifiersArray = append(modifiersArray, originalNodes[0])
 * 			if len(originalNodes) > 1 && (originalNodes[1].Kind == ast.KindDefaultKeyword || originalNodes[1].Kind == ast.KindExportKeyword) {
 * 				modifiersArray = append(modifiersArray, originalNodes[1])
 * 			}
 * 		}
 * 		restStart := len(modifiersArray)
 * 		decos := core.Filter(originalNodes, ast.IsDecorator)
 * 		modifiersArray = append(modifiersArray, decos...)
 * 		modifiersArray = append(modifiersArray, metadata...)
 * 		otherModifiers := core.Filter(originalNodes[restStart:], ast.IsModifier)
 * 		modifiersArray = append(modifiersArray, otherModifiers...)
 * 		res := tx.Factory().NewModifierList(modifiersArray)
 * 		res.Loc = list.Loc
 * 		return res
 * 	}
 * 	return list
 * }
 */
export function MetadataTransformer_injectClassTypeMetadata(receiver: GoPtr<MetadataTransformer>, list: GoPtr<ModifierList>, node: GoPtr<Node>): GoPtr<ModifierList> {
  const tx = receiver!;
  const factory = Transformer_Factory(tx.__tsgoEmbedded0)!;
  const metadata = MetadataTransformer_getTypeMetadata(receiver, node, node);
  if (metadata.length > 0) {
    let originalNodes: GoSlice<GoPtr<Node>> = GoNilSlice();
    if (list !== undefined) {
      originalNodes = list!.Nodes ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
    }
    if (originalNodes.length === 0) {
      const res = NodeFactory_NewModifierList(factory.__tsgoEmbedded0!, metadata);
      if (list !== undefined) {
        res!.Loc = list!.Loc;
      }
      return res;
    }
    let modifiersArray: GoSlice<GoPtr<Node>> = GoNilSlice();
    if (IsModifier(GoSliceLoad(originalNodes, 0, GoPointerValueOps<Node>())) && (GoSliceLoad(originalNodes, 0, GoPointerValueOps<Node>())!.Kind === KindDefaultKeyword || GoSliceLoad(originalNodes, 0, GoPointerValueOps<Node>())!.Kind === KindExportKeyword)) {
      modifiersArray = GoSliceAppend(modifiersArray, GoSliceLoad(originalNodes, 0, GoPointerValueOps<Node>()), GoPointerValueOps<Node>());
      if (originalNodes.length > 1 && (GoSliceLoad(originalNodes, 1, GoPointerValueOps<Node>())!.Kind === KindDefaultKeyword || GoSliceLoad(originalNodes, 1, GoPointerValueOps<Node>())!.Kind === KindExportKeyword)) {
        modifiersArray = GoSliceAppend(modifiersArray, GoSliceLoad(originalNodes, 1, GoPointerValueOps<Node>()), GoPointerValueOps<Node>());
      }
    }
    const restStart = modifiersArray.length;
    const decos = Filter(originalNodes, IsDecorator);
    modifiersArray = GoSliceAppendSlice(GoSliceAppendSlice(modifiersArray, decos, GoPointerValueOps<Node>()), metadata, GoPointerValueOps<Node>());
    const otherModifiers = Filter(originalNodes.slice(restStart), IsModifier);
    modifiersArray = GoSliceAppendSlice(modifiersArray, otherModifiers, GoPointerValueOps<Node>());
    const res = NodeFactory_NewModifierList(factory.__tsgoEmbedded0!, modifiersArray);
    res!.Loc = list!.Loc;
    return res;
  }
  return list;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.injectClassElementTypeMetadata","kind":"method","status":"implemented","sigHash":"19991ff546382a19f8e46712294792407118d309e10333360f96d46eb7fd25ef"}
 *
 * Go source:
 * func (tx *MetadataTransformer) injectClassElementTypeMetadata(list *ast.ModifierList, node *ast.Node, container *ast.Node) *ast.ModifierList {
 * 	if !ast.IsClassLike(container) {
 * 		return list
 * 	}
 * 	if !ast.ClassElementOrClassElementParameterIsDecorated(tx.legacyDecorators, node, container) {
 * 		return list
 * 	}
 * 	metadata := tx.getTypeMetadata(node, container)
 * 	if len(metadata) > 0 {
 * 		var originalNodes []*ast.Node
 * 		if list != nil {
 * 			originalNodes = list.Nodes
 * 		}
 * 		if len(originalNodes) == 0 {
 * 			res := tx.Factory().NewModifierList(metadata)
 * 			if list != nil {
 * 				res.Loc = list.Loc
 * 			}
 * 			return res
 * 		}
 * 		var modifiersArray []*ast.Node
 * 		decos := core.Filter(originalNodes, ast.IsDecorator)
 * 		modifiersArray = append(modifiersArray, decos...)
 * 		modifiersArray = append(modifiersArray, metadata...)
 * 		modifiers := core.Filter(originalNodes, ast.IsModifier)
 * 		modifiersArray = append(modifiersArray, modifiers...)
 * 		res := tx.Factory().NewModifierList(modifiersArray)
 * 		res.Loc = list.Loc
 * 		return res
 * 	}
 * 	return list
 * }
 */
export function MetadataTransformer_injectClassElementTypeMetadata(receiver: GoPtr<MetadataTransformer>, list: GoPtr<ModifierList>, node: GoPtr<Node>, container: GoPtr<Node>): GoPtr<ModifierList> {
  const tx = receiver!;
  const factory = Transformer_Factory(tx.__tsgoEmbedded0)!;
  if (!IsClassLike(container)) {
    return list;
  }
  if (!ClassElementOrClassElementParameterIsDecorated(tx.legacyDecorators, node, container)) {
    return list;
  }
  const metadata = MetadataTransformer_getTypeMetadata(receiver, node, container);
  if (metadata.length > 0) {
    let originalNodes: GoSlice<GoPtr<Node>> = GoNilSlice();
    if (list !== undefined) {
      originalNodes = list!.Nodes ?? GoSliceMake(0, 0, GoPointerValueOps<Node>());
    }
    if (originalNodes.length === 0) {
      const res = NodeFactory_NewModifierList(factory.__tsgoEmbedded0!, metadata);
      if (list !== undefined) {
        res!.Loc = list!.Loc;
      }
      return res;
    }
    let modifiersArray: GoSlice<GoPtr<Node>> = GoNilSlice();
    const decos = Filter(originalNodes, IsDecorator);
    modifiersArray = GoSliceAppendSlice(GoSliceAppendSlice(modifiersArray, decos, GoPointerValueOps<Node>()), metadata, GoPointerValueOps<Node>());
    const modifiers = Filter(originalNodes, IsModifier);
    modifiersArray = GoSliceAppendSlice(modifiersArray, modifiers, GoPointerValueOps<Node>());
    const res = NodeFactory_NewModifierList(factory.__tsgoEmbedded0!, modifiersArray);
    res!.Loc = list!.Loc;
    return res;
  }
  return list;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.getTypeMetadata","kind":"method","status":"implemented","sigHash":"e6d76691c725c618210a8236fdde27be2885476f7694974730f04ad39038086a"}
 *
 * Go source:
 * func (tx *MetadataTransformer) getTypeMetadata(node *ast.Node, container *ast.Node) []*ast.Node {
 * 	// Decorator metadata is not yet supported for ES decorators.
 * 	if !tx.legacyDecorators {
 * 		return nil
 * 	}
 * 	if USE_NEW_TYPE_METADATA_FORMAT {
 * 		return tx.getNewTypeMetadata(node, container)
 * 	}
 * 	return tx.getOldTypeMetadata(node, container)
 * }
 */
export function MetadataTransformer_getTypeMetadata(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>, container: GoPtr<Node>): GoSlice<GoPtr<Node>> {
  const tx = receiver!;
  // Decorator metadata is not yet supported for ES decorators.
  if (!tx.legacyDecorators) {
    return GoNilSlice();
  }
  if (USE_NEW_TYPE_METADATA_FORMAT) {
    return MetadataTransformer_getNewTypeMetadata(tx, node, container);
  }
  return MetadataTransformer_getOldTypeMetadata(tx, node, container);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.getOldTypeMetadata","kind":"method","status":"implemented","sigHash":"fd69259336c3735edfb929389125202f9ca9b1c53c97964128fe841ede873ad8"}
 *
 * Go source:
 * func (tx *MetadataTransformer) getOldTypeMetadata(node *ast.Node, container *ast.Node) []*ast.Node {
 * 	var decorators []*ast.Node
 * 	if tx.shouldAddTypeMetadata(node) {
 * 		typeMetadata := tx.Factory().NewMetadataHelper("design:type", tx.serializer.SerializeTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container))
 * 		decorators = append(decorators, tx.Factory().NewDecorator(typeMetadata))
 * 	}
 * 	if tx.shouldAddParamTypesMetadata(node) {
 * 		paramTypesMetadata := tx.Factory().NewMetadataHelper("design:paramtypes", tx.serializer.SerializeParameterTypesOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container))
 * 		decorators = append(decorators, tx.Factory().NewDecorator(paramTypesMetadata))
 * 	}
 * 	if tx.shouldAddReturnTypeMetadata(node) {
 * 		returnTypeMetadata := tx.Factory().NewMetadataHelper("design:returntype", tx.serializer.SerializeReturnTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node))
 * 		decorators = append(decorators, tx.Factory().NewDecorator(returnTypeMetadata))
 * 	}
 * 	return decorators
 * }
 */
export function MetadataTransformer_getOldTypeMetadata(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>, container: GoPtr<Node>): GoSlice<GoPtr<Node>> {
  const tx = receiver!;
  let decorators: GoSlice<GoPtr<Node>> = GoNilSlice();
  const factory = Transformer_Factory(tx.__tsgoEmbedded0)!;
  if (MetadataTransformer_shouldAddTypeMetadata(tx, node)) {
    const typeMetadata = NodeFactory_NewMetadataHelper(
      factory,
      "design:type",
      metadataSerializer_SerializeTypeOfNode(
        tx.serializer,
        { currentLexicalScope: tx.currentLexicalScope, currentNameScope: container, serializingConditionalTypeBranch: false },
        node,
        container,
      ),
    );
    decorators = GoSliceAppend(decorators, NewDecorator(factory.__tsgoEmbedded0, typeMetadata), GoPointerValueOps<Node>());
  }
  if (MetadataTransformer_shouldAddParamTypesMetadata(tx, node)) {
    const paramTypesMetadata = NodeFactory_NewMetadataHelper(
      factory,
      "design:paramtypes",
      metadataSerializer_SerializeParameterTypesOfNode(
        tx.serializer,
        { currentLexicalScope: tx.currentLexicalScope, currentNameScope: container, serializingConditionalTypeBranch: false },
        node,
        container,
      ),
    );
    decorators = GoSliceAppend(decorators, NewDecorator(factory.__tsgoEmbedded0, paramTypesMetadata), GoPointerValueOps<Node>());
  }
  if (MetadataTransformer_shouldAddReturnTypeMetadata(tx, node)) {
    const returnTypeMetadata = NodeFactory_NewMetadataHelper(
      factory,
      "design:returntype",
      metadataSerializer_SerializeReturnTypeOfNode(
        tx.serializer,
        { currentLexicalScope: tx.currentLexicalScope, currentNameScope: container, serializingConditionalTypeBranch: false },
        node,
      ),
    );
    decorators = GoSliceAppend(decorators, NewDecorator(factory.__tsgoEmbedded0, returnTypeMetadata), GoPointerValueOps<Node>());
  }
  return decorators;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.getNewTypeMetadata","kind":"method","status":"implemented","sigHash":"7f1ddab31565ba659f7714542c8a580c1d15074a0fdeb024aeb95f1bc7cc093a"}
 *
 * Go source:
 * func (tx *MetadataTransformer) getNewTypeMetadata(node *ast.Node, container *ast.Node) []*ast.Node {
 * 	var properties []*ast.Node
 * 	if tx.shouldAddTypeMetadata(node) {
 * 		properties = append(properties, tx.Factory().NewPropertyAssignment(
 * 			nil,
 * 			tx.Factory().NewIdentifier("type"),
 * 			nil,
 * 			nil,
 * 			tx.Factory().NewArrowFunction(
 * 				nil,
 * 				nil,
 * 				tx.Factory().NewNodeList([]*ast.Node{}),
 * 				nil,
 * 				nil,
 * 				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken),
 * 				tx.serializer.SerializeTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container),
 * 			),
 * 		))
 * 	}
 * 	if tx.shouldAddParamTypesMetadata(node) {
 * 		properties = append(properties, tx.Factory().NewPropertyAssignment(
 * 			nil,
 * 			tx.Factory().NewIdentifier("paramTypes"),
 * 			nil,
 * 			nil,
 * 			tx.Factory().NewArrowFunction(
 * 				nil,
 * 				nil,
 * 				tx.Factory().NewNodeList([]*ast.Node{}),
 * 				nil,
 * 				nil,
 * 				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken),
 * 				tx.serializer.SerializeParameterTypesOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node, container),
 * 			),
 * 		))
 * 	}
 * 	if tx.shouldAddReturnTypeMetadata(node) {
 * 		properties = append(properties, tx.Factory().NewPropertyAssignment(
 * 			nil,
 * 			tx.Factory().NewIdentifier("returnType"),
 * 			nil,
 * 			nil,
 * 			tx.Factory().NewArrowFunction(
 * 				nil,
 * 				nil,
 * 				tx.Factory().NewNodeList([]*ast.Node{}),
 * 				nil,
 * 				nil,
 * 				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken),
 * 				tx.serializer.SerializeReturnTypeOfNode(metadataSerializerContext{currentLexicalScope: tx.currentLexicalScope, currentNameScope: container}, node),
 * 			),
 * 		))
 * 	}
 * 	if len(properties) > 0 {
 * 		typeInfoMetadata := tx.Factory().NewMetadataHelper("design:typeinfo", tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList(properties), true))
 * 		return []*ast.Node{tx.Factory().NewDecorator(typeInfoMetadata)}
 * 	}
 * 	return nil
 * }
 */
export function MetadataTransformer_getNewTypeMetadata(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>, container: GoPtr<Node>): GoSlice<GoPtr<Node>> {
  const tx = receiver!;
  let properties: GoSlice<GoPtr<Node>> = GoNilSlice();
  const factory = Transformer_Factory(tx.__tsgoEmbedded0)!;
  const astFactory = factory.__tsgoEmbedded0;
  if (MetadataTransformer_shouldAddTypeMetadata(tx, node)) {
    properties = GoSliceAppend(properties, NewPropertyAssignment(
        astFactory,
        undefined,
        NewIdentifier(astFactory, "type"),
        undefined,
        undefined,
        NewArrowFunction(
          astFactory,
          undefined,
          undefined,
          NodeFactory_NewNodeList(astFactory, GoSliceMake(0, 0, GoPointerValueOps<Node>())),
          undefined,
          undefined,
          NewToken(astFactory, KindEqualsGreaterThanToken),
          metadataSerializer_SerializeTypeOfNode(
            tx.serializer,
            { currentLexicalScope: tx.currentLexicalScope, currentNameScope: container, serializingConditionalTypeBranch: false },
            node,
            container,
          ),
        ),
      ), GoPointerValueOps<Node>());
  }
  if (MetadataTransformer_shouldAddParamTypesMetadata(tx, node)) {
    properties = GoSliceAppend(properties, NewPropertyAssignment(
        astFactory,
        undefined,
        NewIdentifier(astFactory, "paramTypes"),
        undefined,
        undefined,
        NewArrowFunction(
          astFactory,
          undefined,
          undefined,
          NodeFactory_NewNodeList(astFactory, GoSliceMake(0, 0, GoPointerValueOps<Node>())),
          undefined,
          undefined,
          NewToken(astFactory, KindEqualsGreaterThanToken),
          metadataSerializer_SerializeParameterTypesOfNode(
            tx.serializer,
            { currentLexicalScope: tx.currentLexicalScope, currentNameScope: container, serializingConditionalTypeBranch: false },
            node,
            container,
          ),
        ),
      ), GoPointerValueOps<Node>());
  }
  if (MetadataTransformer_shouldAddReturnTypeMetadata(tx, node)) {
    properties = GoSliceAppend(properties, NewPropertyAssignment(
        astFactory,
        undefined,
        NewIdentifier(astFactory, "returnType"),
        undefined,
        undefined,
        NewArrowFunction(
          astFactory,
          undefined,
          undefined,
          NodeFactory_NewNodeList(astFactory, GoSliceMake(0, 0, GoPointerValueOps<Node>())),
          undefined,
          undefined,
          NewToken(astFactory, KindEqualsGreaterThanToken),
          metadataSerializer_SerializeReturnTypeOfNode(
            tx.serializer,
            { currentLexicalScope: tx.currentLexicalScope, currentNameScope: container, serializingConditionalTypeBranch: false },
            node,
          ),
        ),
      ), GoPointerValueOps<Node>());
  }
  if (properties.length > 0) {
    const typeInfoMetadata = NodeFactory_NewMetadataHelper(
      factory,
      "design:typeinfo",
      NewObjectLiteralExpression(astFactory, NodeFactory_NewNodeList(astFactory, properties), true),
    );
    return GoSliceBuild(1, 1, GoPointerValueOps<Node>(), (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, NewDecorator(astFactory, typeInfoMetadata), GoPointerValueOps<Node>());
    });
  }
  return GoNilSlice();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.shouldAddTypeMetadata","kind":"method","status":"implemented","sigHash":"0158613d7cf43d1b1b27ab2d31563fbd3585e448f8663e377159485b01796440"}
 *
 * Go source:
 * func (tx *MetadataTransformer) shouldAddTypeMetadata(node *ast.Node) bool {
 * 	switch node.Kind {
 * 	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindPropertyDeclaration:
 * 		return true
 * 	}
 * 	return false
 * }
 */
export function MetadataTransformer_shouldAddTypeMetadata(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>): bool {
  switch (node!.Kind) {
    case KindMethodDeclaration:
    case KindGetAccessor:
    case KindSetAccessor:
    case KindPropertyDeclaration:
      return true;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.shouldAddReturnTypeMetadata","kind":"method","status":"implemented","sigHash":"58a19346dc66255de43cde3c9e8c582dbc8bdd15c0c51243ca3263f47afa5bc7"}
 *
 * Go source:
 * func (tx *MetadataTransformer) shouldAddReturnTypeMetadata(node *ast.Node) bool {
 * 	return node.Kind == ast.KindMethodDeclaration
 * }
 */
export function MetadataTransformer_shouldAddReturnTypeMetadata(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>): bool {
  return node!.Kind === KindMethodDeclaration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/transformers/tstransforms/metadata.go::method::MetadataTransformer.shouldAddParamTypesMetadata","kind":"method","status":"implemented","sigHash":"763452b4192dc11c3e3ba9d18235b15f24c21ae570f1b8facfad02e0fc4e8af0"}
 *
 * Go source:
 * func (tx *MetadataTransformer) shouldAddParamTypesMetadata(node *ast.Node) bool {
 * 	switch node.Kind {
 * 	case ast.KindClassDeclaration, ast.KindClassExpression:
 * 		return ast.GetFirstConstructorWithBody(node) != nil
 * 	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
 * 		return true
 * 	}
 * 	return false
 * }
 */
export function MetadataTransformer_shouldAddParamTypesMetadata(receiver: GoPtr<MetadataTransformer>, node: GoPtr<Node>): bool {
  switch (node!.Kind) {
    case KindClassDeclaration:
    case KindClassExpression:
      return (GetFirstConstructorWithBody(node) !== undefined) as bool;
    case KindMethodDeclaration:
    case KindGetAccessor:
    case KindSetAccessor:
      return true;
  }
  return false;
}
