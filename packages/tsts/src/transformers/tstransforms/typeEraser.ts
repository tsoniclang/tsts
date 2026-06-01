/**
 * TypeScript-specific type-syntax eraser.
 *
 * Substantive port of TS-Go `internal/transformers/tstransforms/typeeraser.go`
 * (~383 LoC). Removes TypeScript-only syntax (type declarations, type
 * annotations, interfaces, modifiers like `public`/`readonly`,
 * `declare`/`abstract`/`override`, satisfies / as expressions,
 * non-null assertions, etc.) leaving the underlying JavaScript intact.
 *
 * Port scope: full visit dispatch covering ~50 node kinds, ambient
 * statement elision, type-only import/export elision, interface/type
 * alias elision, parameter property modifier preservation for the
 * runtime transform, JSX type-argument stripping. Updater calls (e.g.
 * factory.updateClassDeclaration) are stubbed where the upstream
 * factory surface is unfinished.
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import {
  hasSyntacticModifier, hasDecorators, getDecorators,
  isThisParameter, isParameterPropertyDeclaration,
  isInstantiatedModule, shouldPreserveConstEnums, getInnermostModuleBody,
  getNodeName, getModifiers, getInitializer, getBody, getParameters,
  getAsteriskToken, getEqualsGreaterThan, getDotDotDotToken,
  getQuestionDotToken, getExpression, getArguments, getTag, getTemplate,
  getTypeAnnotation, getHeritageToken, getHeritageTypes, getHeritageClauses,
  getClassMembers, getJsxTagName, getJsxAttributes, getImportClause,
  getModuleSpecifier, getImportAttributes, getNamedBindings, getPhaseModifier,
  getNamedImportElements, getNamedExportElements, getExportClause,
  getModifierListNodes, getNodeFlags, getNodeLoc, setNodeLoc,
  nodeIsMissing, skipOuterExpressions,
  isJSDocTypeAssertion,
  isImportTypeOnly, isImportClauseTypeOnly, isExportTypeOnly,
  isSpecifierTypeOnly, isEnumConst, isTrue,
  getNodeListLength,
} from "../../ast/index.js";
import { isIdentifier, isAssertionExpression, isSatisfiesExpression, isStatement } from "../../ast/index.js";
import { Kind, getSubtreeFacts } from "../../ast/index.js";
import { extractModifiers } from "../modifierVisitor.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import type {
  Node as AstNode,
  Statement,
  ImportEqualsDeclaration,
  ImportDeclaration,
  ImportClause,
  NamedImports,
  ImportSpecifier,
  ExportDeclaration,
  NamedExports,
  ExportSpecifier,
  ModuleDeclaration,
  ParameterDeclaration,
  ClassDeclaration,
  ClassExpression,
  ConstructorDeclaration,
  MethodDeclaration,
  GetAccessorDeclaration,
  SetAccessorDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  ArrowFunction,
  VariableDeclaration,
  HeritageClause,
  ExpressionWithTypeArguments,
  PropertyDeclaration,
  ParenthesizedExpression,
  CallExpression,
  NewExpression,
  TaggedTemplateExpression,
  JsxSelfClosingElement,
  JsxOpeningElement,
  NodeList,
  ModifierList,
} from "../../ast/index.js";

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class TypeEraserTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  parentNode: AstNode | undefined;
  currentNode: AstNode | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  pushNode(node: AstNode): AstNode | undefined {
    const grandparent = this.parentNode;
    this.parentNode = this.currentNode;
    this.currentNode = node;
    return grandparent;
  }

  popNode(grandparent: AstNode | undefined): void {
    this.currentNode = this.parentNode;
    this.parentNode = grandparent;
  }

  elide(node: AstNode): AstNode {
    return this.emitContext().newNotEmittedStatement(node);
  }

  // -------------------------------------------------------------------------
  // Main visit dispatch
  // -------------------------------------------------------------------------

  visit(node: AstNode): AstNode | undefined {
    if ((getSubtreeFacts(node) & SubtreeFacts.ContainsTypeScript) === 0) {
      return node;
    }
    if (isStatement(node) && hasSyntacticModifier(node, ModifierFlags.Ambient)) {
      return this.elide(node);
    }

    const grandparent = this.pushNode(node);
    try {
      switch (node.kind) {
        // TypeScript accessibility / readonly / declare modifiers — elided.
        case Kind.PublicKeyword:
        case Kind.PrivateKeyword:
        case Kind.ProtectedKeyword:
        case Kind.AbstractKeyword:
        case Kind.OverrideKeyword:
        case Kind.ConstKeyword:
        case Kind.DeclareKeyword:
        case Kind.ReadonlyKeyword:
        // TypeScript type nodes — elided.
        case Kind.ArrayType:
        case Kind.TupleType:
        case Kind.OptionalType:
        case Kind.RestType:
        case Kind.TypeLiteral:
        case Kind.TypePredicate:
        case Kind.TypeParameter:
        case Kind.AnyKeyword:
        case Kind.UnknownKeyword:
        case Kind.BooleanKeyword:
        case Kind.StringKeyword:
        case Kind.NumberKeyword:
        case Kind.NeverKeyword:
        case Kind.VoidKeyword:
        case Kind.SymbolKeyword:
        case Kind.ConstructorType:
        case Kind.FunctionType:
        case Kind.TypeQuery:
        case Kind.TypeReference:
        case Kind.UnionType:
        case Kind.IntersectionType:
        case Kind.ConditionalType:
        case Kind.ParenthesizedType:
        case Kind.ThisType:
        case Kind.TypeOperator:
        case Kind.IndexedAccessType:
        case Kind.MappedType:
        case Kind.LiteralType:
        case Kind.IndexSignature:
          return undefined;

        case Kind.JSImportDeclaration:
          return undefined;

        case Kind.TypeAliasDeclaration:
        case Kind.JSTypeAliasDeclaration:
        case Kind.InterfaceDeclaration:
          return this.elide(node);

        case Kind.NamespaceExportDeclaration:
          return undefined;

        case Kind.ModuleDeclaration: {
          const md = node as unknown as ModuleDeclaration;
          const name = getNodeName(node);
          if (name === undefined || !isIdentifier(name)
            || !isInstantiatedModule(node, shouldPreserveConstEnums(this.compilerOptions))
            || getInnermostModuleBody(md) === undefined) {
            return this.elide(node);
          }
          return this.visitor().visitEachChild(node);
        }

        case Kind.ExpressionWithTypeArguments: {
          const n = node as unknown as ExpressionWithTypeArguments;
          return this.factory().updateExpressionWithTypeArguments(
            n, this.visitor().visitNode(getExpression(n)), undefined,
          );
        }

        case Kind.PropertyDeclaration: {
          const n = node as unknown as PropertyDeclaration;
          if (isTrue(this.compilerOptions.experimentalDecorators)
            && hasSyntacticModifier(node, ModifierFlags.Ambient | ModifierFlags.Abstract)
            && hasDecorators(node)) {
            return this.factory().updatePropertyDeclaration(
              n, this.visitor().visitModifiers(getModifiers(n)),
              this.visitor().visitNode(getNodeName(node)!),
              undefined, undefined,
              this.visitor().visitNode(getInitializer(n)),
            );
          }
          if (hasSyntacticModifier(node, ModifierFlags.Ambient | ModifierFlags.Abstract)) {
            return undefined;
          }
          return this.factory().updatePropertyDeclaration(
            n, this.visitor().visitModifiers(getModifiers(n)),
            this.visitor().visitNode(getNodeName(node)!),
            undefined, undefined,
            this.visitor().visitNode(getInitializer(n)),
          );
        }

        case Kind.Constructor: {
          const n = node as unknown as ConstructorDeclaration;
          if (nodeIsMissing(getBody(n))) return undefined;
          return this.factory().updateConstructorDeclaration(
            n, undefined, undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, this.visitor().visitNode(getBody(n)),
          );
        }

        case Kind.MethodDeclaration: {
          const n = node as unknown as MethodDeclaration;
          if (nodeIsMissing(getBody(n))) return undefined;
          return this.factory().updateMethodDeclaration(
            n, this.visitor().visitModifiers(getModifiers(n)),
            getAsteriskToken(n),
            this.visitor().visitNode(getNodeName(node)!),
            undefined, undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, this.visitor().visitNode(getBody(n)),
          );
        }

        case Kind.GetAccessor: {
          const n = node as unknown as GetAccessorDeclaration;
          if (nodeIsMissing(getBody(n)) && hasSyntacticModifier(node, ModifierFlags.Abstract)) {
            return undefined;
          }
          let body = this.visitor().visitNode(getBody(n));
          if (body === undefined) body = this.factory().newBlock([]);
          return this.factory().updateGetAccessorDeclaration(
            n, this.visitor().visitModifiers(getModifiers(n)),
            this.visitor().visitNode(getNodeName(node)!),
            undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, body,
          );
        }

        case Kind.SetAccessor: {
          const n = node as unknown as SetAccessorDeclaration;
          if (nodeIsMissing(getBody(n)) && hasSyntacticModifier(node, ModifierFlags.Abstract)) {
            return undefined;
          }
          let body = this.visitor().visitNode(getBody(n));
          if (body === undefined) body = this.factory().newBlock([]);
          return this.factory().updateSetAccessorDeclaration(
            n, this.visitor().visitModifiers(getModifiers(n)),
            this.visitor().visitNode(getNodeName(node)!),
            undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, body,
          );
        }

        case Kind.VariableDeclaration: {
          const n = node as unknown as VariableDeclaration;
          const updated = this.factory().updateVariableDeclaration(
            n, this.visitor().visitNode(getNodeName(node)!),
            undefined, undefined, this.visitor().visitNode(getInitializer(n)),
          );
          const t = getTypeAnnotation(n);
          if (t !== undefined) {
            this.emitContext().setTypeNode(getNodeName(updated)!, t);
          }
          return updated;
        }

        case Kind.HeritageClause: {
          const n = node as unknown as HeritageClause;
          if (getHeritageToken(n) === Kind.ImplementsKeyword) return undefined;
          return this.factory().updateHeritageClause(
            n, getHeritageToken(n), this.visitor().visitNodes(getHeritageTypes(n)),
          );
        }

        case Kind.ClassDeclaration: {
          const n = node as unknown as ClassDeclaration;
          return this.factory().updateClassDeclaration(
            n, this.visitor().visitModifiers(getModifiers(n)),
            this.visitor().visitNode(getNodeName(node)),
            undefined,
            this.visitor().visitNodes(getHeritageClauses(n)),
            this.visitor().visitNodes(getClassMembers(n)),
          );
        }

        case Kind.ClassExpression: {
          const n = node as unknown as ClassExpression;
          return this.factory().updateClassExpression(
            n, this.visitor().visitModifiers(getModifiers(n)),
            this.visitor().visitNode(getNodeName(node)),
            undefined,
            this.visitor().visitNodes(getHeritageClauses(n)),
            this.visitor().visitNodes(getClassMembers(n)),
          );
        }

        case Kind.FunctionDeclaration: {
          const n = node as unknown as FunctionDeclaration;
          if (nodeIsMissing(getBody(n))) return this.elide(node);
          return this.factory().updateFunctionDeclaration(
            n, this.visitor().visitModifiers(getModifiers(n)),
            getAsteriskToken(n),
            this.visitor().visitNode(getNodeName(node)),
            undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, this.visitor().visitNode(getBody(n)),
          );
        }

        case Kind.FunctionExpression: {
          const n = node as unknown as FunctionExpression;
          return this.factory().updateFunctionExpression(
            n, this.visitor().visitModifiers(getModifiers(n)),
            getAsteriskToken(n),
            this.visitor().visitNode(getNodeName(node)),
            undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, this.visitor().visitNode(getBody(n)),
          );
        }

        case Kind.ArrowFunction: {
          const n = node as unknown as ArrowFunction;
          return this.factory().updateArrowFunction(
            n, this.visitor().visitModifiers(getModifiers(n)),
            undefined, this.visitor().visitNodes(getParameters(n)),
            undefined, undefined, getEqualsGreaterThan(n),
            this.visitor().visitNode(getBody(n)),
          );
        }

        case Kind.Parameter: {
          if (isThisParameter(node)) return undefined;
          const n = node as unknown as ParameterDeclaration;
          let modifiers = isParameterPropertyDeclaration(node, this.parentNode!)
            ? extractModifiers(this.emitContext(), getModifiers(n), ModifierFlags.ParameterPropertyModifier)
            : undefined;
          if (hasDecorators(node)) {
            const decorators = getDecorators(node);
            const visited = this.visitor().visitSlice(decorators).items;
            if (modifiers === undefined) {
              modifiers = this.factory().newModifierList(visited);
            } else {
              modifiers = this.factory().newModifierList([...getModifierListNodes(modifiers as ModifierList | undefined), ...visited]);
            }
          }
          return this.factory().updateParameterDeclaration(
            n, modifiers, getDotDotDotToken(n),
            this.visitor().visitNode(getNodeName(node)!),
            undefined, undefined,
            this.visitor().visitNode(getInitializer(n)),
          );
        }

        case Kind.CallExpression: {
          const n = node as unknown as CallExpression;
          return this.factory().updateCallExpression(
            n, this.visitor().visitNode(getExpression(n)),
            getQuestionDotToken(n), undefined,
            this.visitor().visitNodes(getArguments(n)),
            getNodeFlags(node),
          );
        }

        case Kind.NewExpression: {
          const n = node as unknown as NewExpression;
          return this.factory().updateNewExpression(
            n, this.visitor().visitNode(getExpression(n)),
            undefined, this.visitor().visitNodes(getArguments(n)),
          );
        }

        case Kind.TaggedTemplateExpression: {
          const n = node as unknown as TaggedTemplateExpression;
          return this.factory().updateTaggedTemplateExpression(
            n, this.visitor().visitNode(getTag(n)),
            getQuestionDotToken(n), undefined,
            this.visitor().visitNode(getTemplate(n)),
            getNodeFlags(node),
          );
        }

        case Kind.NonNullExpression:
        case Kind.TypeAssertionExpression:
        case Kind.AsExpression:
        case Kind.SatisfiesExpression: {
          const partial = this.factory().newPartiallyEmittedExpression(
            this.visitor().visitNode(getExpression(node)),
          );
          this.emitContext().setOriginal(partial, node);
          setNodeLoc(partial, getNodeLoc(node));
          return partial;
        }

        case Kind.ParenthesizedExpression: {
          if (!isJSDocTypeAssertion(node)) {
            const n = node as unknown as ParenthesizedExpression;
            const expression = skipOuterExpressions(getExpression(n), OuterExpressionKinds.NotAssertionsOrTypeArgs);
            if (isAssertionExpression(expression) || isSatisfiesExpression(expression)) {
              const partial = this.factory().newPartiallyEmittedExpression(
                this.visitor().visitNode(getExpression(n)),
              );
              this.emitContext().setOriginal(partial, node);
              setNodeLoc(partial, getNodeLoc(node));
              return partial;
            }
          }
          return this.visitor().visitEachChild(node);
        }

        case Kind.JsxSelfClosingElement: {
          const n = node as unknown as JsxSelfClosingElement;
          return this.factory().updateJsxSelfClosingElement(
            n, this.visitor().visitNode(getJsxTagName(n)), undefined,
            this.visitor().visitNode(getJsxAttributes(n)),
          );
        }

        case Kind.JsxOpeningElement: {
          const n = node as unknown as JsxOpeningElement;
          return this.factory().updateJsxOpeningElement(
            n, this.visitor().visitNode(getJsxTagName(n)), undefined,
            this.visitor().visitNode(getJsxAttributes(n)),
          );
        }

        case Kind.ImportEqualsDeclaration: {
          const n = node as unknown as ImportEqualsDeclaration;
          if (isImportTypeOnly(n)) return undefined;
          return this.visitor().visitEachChild(node);
        }

        case Kind.ImportDeclaration: {
          const n = node as unknown as ImportDeclaration;
          const ic = getImportClause(n);
          if (ic === undefined) return node;
          const visited = this.visitor().visitNode(ic);
          if (visited === undefined) return undefined;
          return this.factory().updateImportDeclaration(
            n, getModifiers(n), visited, getModuleSpecifier(n), getImportAttributes(n),
          );
        }

        case Kind.ImportClause: {
          const n = node as unknown as ImportClause;
          if (isImportClauseTypeOnly(n)) return undefined;
          const name = getNodeName(node);
          const namedBindings = this.visitor().visitNode(getNamedBindings(n));
          if (name === undefined && namedBindings === undefined) return undefined;
          return this.factory().updateImportClause(n, getPhaseModifier(n), name, namedBindings);
        }

        case Kind.NamedImports: {
          const n = node as unknown as NamedImports;
          const elements = getNamedImportElements(n);
          if (elements.length === 0) return node;
          const visited = this.visitor().visitNodes(elements);
          if (!isTrue(this.compilerOptions.verbatimModuleSyntax) && getNodeListLength(visited) === 0) {
            return undefined;
          }
          return this.factory().updateNamedImports(n, visited);
        }

        case Kind.ImportSpecifier: {
          const n = node as unknown as ImportSpecifier;
          if (isSpecifierTypeOnly(n)) return undefined;
          return node;
        }

        case Kind.ExportDeclaration: {
          const n = node as unknown as ExportDeclaration;
          if (isExportTypeOnly(n)) return undefined;
          let exportClause: AstNode | undefined;
          const ec = getExportClause(n);
          if (ec !== undefined) {
            exportClause = this.visitor().visitNode(ec);
            if (exportClause === undefined) return undefined;
          }
          return this.factory().updateExportDeclaration(
            n, undefined, false, exportClause,
            this.visitor().visitNode(getModuleSpecifier(n)),
            this.visitor().visitNode(getImportAttributes(n)),
          );
        }

        case Kind.NamedExports: {
          const n = node as unknown as NamedExports;
          const elements = getNamedExportElements(n);
          if (elements.length === 0) return node;
          const visited = this.visitor().visitNodes(elements);
          if (!isTrue(this.compilerOptions.verbatimModuleSyntax) && getNodeListLength(visited) === 0) {
            return undefined;
          }
          return this.factory().updateNamedExports(n, visited);
        }

        case Kind.ExportSpecifier: {
          const n = node as unknown as ExportSpecifier;
          if (isSpecifierTypeOnly(n)) return undefined;
          return node;
        }

        case Kind.EnumDeclaration:
          if (isEnumConst(node)) return node;
          return this.visitor().visitEachChild(node);

        default:
          return this.visitor().visitEachChild(node);
      }
    } finally {
      this.popNode(grandparent);
    }
  }
}

export function newTypeEraserTransformer(opts: TransformOptions): Transformer {
  return new TypeEraserTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions {
  experimentalDecorators?: unknown;
  verbatimModuleSyntax?: unknown;
  readonly _opts?: unknown;
}

const SubtreeFacts = { ContainsTypeScript: 1 << 0 } as const;
const OuterExpressionKinds = { NotAssertionsOrTypeArgs: 0 } as const;
