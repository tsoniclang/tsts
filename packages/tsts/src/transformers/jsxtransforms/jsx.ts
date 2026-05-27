/**
 * JSX transformer (classic + automatic runtimes).
 *
 * Port of TS-Go `internal/transformers/jsxtransforms/jsx.go` (~1193 LoC).
 * Transforms JSX into either `React.createElement(...)` calls
 * (classic runtime) or `_jsx`/`_jsxs`/`_jsxDEV` calls with implicit
 * runtime imports.
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import type { Node as AstNode, NodeArray, SourceFile, JsxElement, JsxSelfClosingElement, JsxFragment, JsxOpeningFragment, JsxText, JsxExpression, JsxAttribute, JsxSpreadAttribute, TextRange } from "../../ast/index.js";
import {
  nodeLoc, nodeText, nodePos, nodeEnd, nodeExpression, nodeInitializerOf,
  nodeAttributesProperties, nodeTagName, newTextRange, setLoc,
  compilerOptionsJsx, compilerOptionsEmitScriptTarget, compilerOptionsReactNamespace,
  getJSXRuntimeImport, getJSXImplicitImportBase,
  sourceFileName, sourceFileText, sourceFileIsDeclarationFile,
  sourceFileStatementsRO, sourceFileEndOfFileToken,
  isExternalModule, isExternalOrCommonJSModule, isPrologueDirective,
  isIntrinsicJsxName, isIdentifierText, isLineBreak, isWhiteSpaceSingleLine,
  skipTrivia, getSemanticJsxChildren,
  jsxOpeningElement, jsxChildren, jsxFragmentOpeningFragment, jsxFragmentChildren,
  jsxAttributeName, jsxAttributeInitializer, jsxSpreadAttributeExpression,
  jsxNamespacedNamespaceText, jsxNamespacedNameText,
  jsxExpressionExpression, jsxExpressionDotDotDot, jsxTextText,
  variableDeclarationName, objectLiteralProperties, propertyAssignmentNameRO,
  importSpecifierName, importSpecifierPropertyName,
  qualifiedNameLeft, qualifiedNameRight,
  compareStringsCaseSensitive, setParentInChildren, clearNodeSynthesizedFlag,
  setNodeParent, getECMALineAndUTF16CharacterOfPosition,
  stringLiteralTokenFlags, setStringLiteralTokenFlags,
} from "../../ast/index.js";
import {
  isSourceFile, isIdentifier, isJsxOpeningLikeElement, isJsxElement,
  isJsxSelfClosingElement, isJsxFragment, isJsxExpression, isJsxNamespacedName,
  isJsxSpreadAttribute, isStringLiteral, isPropertyAssignment,
  isObjectLiteralExpression, isSpreadAssignment, isQualifiedName,
  isModuleDeclaration,
} from "../../ast/index.js";
import { Kind, NodeFlags, subtreeFacts } from "../../ast/index.js";
import { JsxEmit } from "../../core/compileroptions.js";
import { EmitFlags } from "../../printer/emitflags.js";
import { GeneratedIdentifierFlags } from "../../printer/namegenerator.js";
const TokenFlags = { None: 0 } as const;
const ScriptTarget = { ES2018: 5 } as const;

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class JSXTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  readonly emitResolver: EmitResolver;

  importSpecifier = "";
  filenameDeclaration: AstNode | undefined;
  utilizedImplicitRuntimeImports: Map<string, Map<string, AstNode>>;
  inJsxChild = false;
  currentSourceFile: SourceFile | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions as unknown as CompilerOptions;
    this.emitResolver = opts.emitResolver as unknown as EmitResolver;
    this.utilizedImplicitRuntimeImports = new Map();
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  // -------------------------------------------------------------------------
  // Filename + implicit-import bookkeeping
  // -------------------------------------------------------------------------

  getCurrentFileNameExpression(): AstNode {
    if (this.filenameDeclaration !== undefined) {
      return variableDeclarationName(this.filenameDeclaration);
    }
    const d = this.factory().newVariableDeclaration(
      this.factory().newUniqueNameEx("_jsxFileName", {
        flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
      }),
      undefined,
      undefined,
      this.factory().newStringLiteral(sourceFileName(this.currentSourceFile!), TokenFlags.None),
    );
    this.filenameDeclaration = d;
    return variableDeclarationName(d);
  }

  getJsxFactoryCalleePrimitive(isStaticChildren: boolean): string {
    if (compilerOptionsJsx(this.compilerOptions) === JsxEmit.ReactJSXDev) return "jsxDEV";
    if (isStaticChildren) return "jsxs";
    return "jsx";
  }

  getJsxFactoryCallee(isStaticChildren: boolean): AstNode {
    return this.getImplicitImportForName(this.getJsxFactoryCalleePrimitive(isStaticChildren));
  }

  getImplicitJsxFragmentReference(): AstNode {
    return this.getImplicitImportForName("Fragment");
  }

  getImplicitImportForName(name: string): AstNode {
    let importSource = this.importSpecifier;
    if (name !== "createElement") {
      importSource = getJSXRuntimeImport(importSource, this.compilerOptions);
    }
    let existing = this.utilizedImplicitRuntimeImports.get(importSource);
    if (existing !== undefined) {
      const elem = existing.get(name);
      if (elem !== undefined) return importSpecifierName(elem);
    } else {
      existing = new Map();
      this.utilizedImplicitRuntimeImports.set(importSource, existing);
    }

    const generatedName = this.factory().newUniqueNameEx("_" + name, {
      flags:
        GeneratedIdentifierFlags.Optimistic |
        GeneratedIdentifierFlags.FileLevel |
        GeneratedIdentifierFlags.AllowNameSubstitution,
    });
    const specifier = this.factory().newImportSpecifier(false, this.factory().newIdentifier(name), generatedName);
    this.emitResolver.setReferencedImportDeclaration(generatedName, specifier);
    existing.set(name, specifier);
    return importSpecifierName(specifier);
  }

  setInChild(v: boolean): void {
    this.inJsxChild = v;
  }

  // -------------------------------------------------------------------------
  // Visit dispatch
  // -------------------------------------------------------------------------

  visit(node: AstNode | undefined): AstNode | undefined {
    if (node === undefined) return undefined;
    if ((subtreeFacts(node) & SubtreeFacts.ContainsJsx) === 0) return node;
    switch (node.kind) {
      case Kind.SourceFile:
        this.setInChild(false);
        return this.visitSourceFile(node as unknown as SourceFile);
      case Kind.JsxElement:
        return this.visitJsxElement(node as unknown as JsxElement);
      case Kind.JsxSelfClosingElement:
        return this.visitJsxSelfClosingElement(node as unknown as JsxSelfClosingElement);
      case Kind.JsxFragment:
        return this.visitJsxFragment(node as unknown as JsxFragment);
      case Kind.JsxOpeningElement:
        throw new Error("JsxOpeningElement should not be visited, handled in visitJsxElement");
      case Kind.JsxOpeningFragment:
        throw new Error("JsxOpeningFragment should not be visited, handled in visitJsxFragment");
      case Kind.JsxText:
        this.setInChild(false);
        return this.visitJsxText(node as unknown as JsxText);
      case Kind.JsxExpression:
        this.setInChild(false);
        return this.visitJsxExpression(node as unknown as JsxExpression);
    }
    this.setInChild(false);
    return this.visitor().visitEachChild(node);
  }

  shouldUseCreateElement(node: AstNode): boolean {
    return this.importSpecifier.length === 0 || hasKeyAfterPropsSpread(node);
  }

  isAnyPrologueDirective(node: AstNode): boolean {
    return isPrologueDirective(node) || (this.emitContext().emitFlags(node) & EmitFlags.CustomPrologue) !== 0;
  }

  insertStatementAfterCustomPrologue(to: AstNode[], statement: AstNode | undefined): AstNode[] {
    if (statement === undefined) return to;
    let idx = 0;
    while (idx < to.length && this.isAnyPrologueDirective(to[idx]!)) idx++;
    return [...to.slice(0, idx), statement, ...to.slice(idx)];
  }

  visitSourceFile(file: SourceFile): AstNode {
    if (sourceFileIsDeclarationFile(file)) return file as unknown as AstNode;

    this.currentSourceFile = file;
    this.importSpecifier = getJSXImplicitImportBase(this.compilerOptions, file);
    this.filenameDeclaration = undefined;
    this.utilizedImplicitRuntimeImports.clear();

    let visited = this.visitor().visitEachChild(file as unknown as AstNode);
    this.emitContext().addEmitHelpers(visited, this.emitContext().readEmitHelpers());

    let statements = sourceFileStatementsRO(visited as unknown as SourceFile).slice();
    let statementsUpdated = false;
    if (this.filenameDeclaration !== undefined) {
      statements = this.insertStatementAfterCustomPrologue(
        statements,
        this.factory().newVariableStatement(
          undefined,
          this.factory().newVariableDeclarationList(
            this.factory().newNodeList([this.filenameDeclaration]),
            NodeFlags.Const,
          ),
        ),
      );
      statementsUpdated = true;
    }

    if (this.utilizedImplicitRuntimeImports.size > 0) {
      if (isExternalModule(file)) {
        statementsUpdated = true;
        const newStatements: AstNode[] = [];
        for (const [importSource, importSpecifiersMap] of this.utilizedImplicitRuntimeImports.entries()) {
          const sorted = getSortedSpecifiers(importSpecifiersMap);
          const s = this.factory().newImportDeclaration(
            undefined,
            this.factory().newImportClause(Kind.Unknown, undefined, this.factory().newNamedImports(this.factory().newNodeList(sorted))),
            this.factory().newStringLiteral(importSource, TokenFlags.None),
            undefined,
          );
          setParentInChildren(s);
          newStatements.push(s);
        }
        for (const e of newStatements) statements = this.insertStatementAfterCustomPrologue(statements, e);
      } else if (isExternalOrCommonJSModule(file)) {
        statementsUpdated = true;
        const newStatements: AstNode[] = [];
        for (const [importSource, importSpecifiersMap] of this.utilizedImplicitRuntimeImports.entries()) {
          const sorted = getSortedSpecifiers(importSpecifiersMap);
          const asBindingElems: AstNode[] = [];
          for (const elem of sorted) {
            asBindingElems.push(
              this.factory().newBindingElement(undefined, importSpecifierPropertyName(elem), importSpecifierName(elem), undefined),
            );
          }
          const s = this.factory().newVariableStatement(
            undefined,
            this.factory().newVariableDeclarationList(
              this.factory().newNodeList([
                this.factory().newVariableDeclaration(
                  this.factory().newBindingPattern(Kind.ObjectBindingPattern, this.factory().newNodeList(asBindingElems)),
                  undefined,
                  undefined,
                  this.factory().newCallExpression(
                    this.factory().newIdentifier("require"),
                    undefined,
                    undefined,
                    this.factory().newNodeList([this.factory().newStringLiteral(importSource, TokenFlags.None)]),
                    NodeFlags.None,
                  ),
                ),
              ]),
              NodeFlags.Const,
            ),
          );
          setParentInChildren(s);
          newStatements.push(s);
        }
        for (const e of newStatements) statements = this.insertStatementAfterCustomPrologue(statements, e);
      }
    }

    if (statementsUpdated) {
      visited = this.factory().updateSourceFile(file, this.factory().newNodeList(statements), sourceFileEndOfFileToken(file));
    }

    this.currentSourceFile = undefined;
    this.importSpecifier = "";
    this.filenameDeclaration = undefined;
    this.utilizedImplicitRuntimeImports.clear();

    return visited;
  }

  visitJsxElement(element: JsxElement): AstNode {
    const transform = this.shouldUseCreateElement(element as unknown as AstNode)
      ? (e: AstNode, c: NodeArray<AstNode> | undefined, l: TextRange) => this.visitJsxOpeningLikeElementCreateElement(e, c, l)
      : (e: AstNode, c: NodeArray<AstNode> | undefined, l: TextRange) => this.visitJsxOpeningLikeElementJSX(e, c, l);
    const location = newTextRange(
      skipTrivia(sourceFileText(this.currentSourceFile!), nodePos(element as unknown as AstNode)),
      nodeEnd(element as unknown as AstNode),
    );
    return transform(jsxOpeningElement(element), jsxChildren(element) as NodeArray<AstNode>, location as unknown as TextRange);
  }

  visitJsxSelfClosingElement(element: JsxSelfClosingElement): AstNode {
    const transform = this.shouldUseCreateElement(element as unknown as AstNode)
      ? (e: AstNode, c: NodeArray<AstNode> | undefined, l: TextRange) => this.visitJsxOpeningLikeElementCreateElement(e, c, l)
      : (e: AstNode, c: NodeArray<AstNode> | undefined, l: TextRange) => this.visitJsxOpeningLikeElementJSX(e, c, l);
    const location = newTextRange(
      skipTrivia(sourceFileText(this.currentSourceFile!), nodePos(element as unknown as AstNode)),
      nodeEnd(element as unknown as AstNode),
    ) as unknown as TextRange;
    return transform(element as unknown as AstNode, undefined, location);
  }

  visitJsxFragment(fragment: JsxFragment): AstNode {
    const useCreateElement = this.importSpecifier.length === 0;
    const location = newTextRange(
      skipTrivia(sourceFileText(this.currentSourceFile!), nodePos(fragment as unknown as AstNode)),
      nodeEnd(fragment as unknown as AstNode),
    ) as unknown as TextRange;
    if (useCreateElement) {
      return this.visitJsxOpeningFragmentCreateElement(
        jsxFragmentOpeningFragment(fragment) as JsxOpeningFragment,
        jsxFragmentChildren(fragment) as NodeArray<AstNode>,
        location,
      );
    }
    return this.visitJsxOpeningFragmentJSX(
      jsxFragmentOpeningFragment(fragment) as JsxOpeningFragment,
      jsxFragmentChildren(fragment) as NodeArray<AstNode>,
      location,
    );
  }

  // -------------------------------------------------------------------------
  // Child conversion
  // -------------------------------------------------------------------------

  convertJsxChildrenToChildrenPropObject(children: readonly AstNode[]): AstNode | undefined {
    const prop = this.convertJsxChildrenToChildrenPropAssignment(children);
    if (prop === undefined) return undefined;
    return this.factory().newObjectLiteralExpression(this.factory().newNodeList([prop]), false);
  }

  transformJsxChildToExpression(node: AstNode): AstNode | undefined {
    const prev = this.inJsxChild;
    this.setInChild(true);
    try {
      return this.visitor().visit(node);
    } finally {
      this.setInChild(prev);
    }
  }

  convertJsxChildrenToChildrenPropAssignment(children: readonly AstNode[]): AstNode | undefined {
    const nonWhitespace = getSemanticJsxChildren(children);
    if (
      nonWhitespace.length === 1 &&
      (nonWhitespace[0]!.kind !== Kind.JsxExpression || jsxExpressionDotDotDot(nonWhitespace[0]!) === undefined)
    ) {
      const result = this.transformJsxChildToExpression(nonWhitespace[0]!);
      if (result === undefined) return undefined;
      return this.factory().newPropertyAssignment(undefined, this.factory().newIdentifier("children"), undefined, undefined, result);
    }
    const results: AstNode[] = [];
    for (const child of nonWhitespace) {
      const res = this.transformJsxChildToExpression(child);
      if (res === undefined) continue;
      this.emitContext().setEmitFlags(res, this.emitContext().emitFlags(res) & ~EmitFlags.StartOnNewLine);
      results.push(res);
    }
    if (results.length === 0) return undefined;
    return this.factory().newPropertyAssignment(
      undefined,
      this.factory().newIdentifier("children"),
      undefined,
      undefined,
      this.factory().newArrayLiteralExpression(this.factory().newNodeList(results), false),
    );
  }

  // -------------------------------------------------------------------------
  // Tag-name / attribute conversion
  // -------------------------------------------------------------------------

  getTagName(node: AstNode): AstNode {
    if (node.kind === Kind.JsxElement) {
      return this.getTagName(jsxOpeningElement(node as unknown as JsxElement));
    }
    if (isJsxOpeningLikeElement(node)) {
      const tagName = nodeTagName(node);
      if (isIdentifier(tagName) && isIntrinsicJsxName(nodeText(tagName))) {
        return this.factory().newStringLiteral(nodeText(tagName), TokenFlags.None);
      }
      if (isJsxNamespacedName(tagName)) {
        return this.factory().newStringLiteral(
          jsxNamespacedNamespaceText(tagName) + ":" + jsxNamespacedNameText(tagName),
          TokenFlags.None,
        );
      }
      return this.factory().createExpressionFromEntityName(tagName);
    }
    throw new Error("unhandled node kind passed to getTagName");
  }

  visitJsxOpeningLikeElementJSX(
    element: AstNode,
    children: NodeArray<AstNode> | undefined,
    location: TextRange,
  ): AstNode {
    const tagName = this.getTagName(element);
    let childrenProp: AstNode | undefined;
    if (children !== undefined && children.length > 0) {
      childrenProp = this.convertJsxChildrenToChildrenPropAssignment(children);
    }
    let keyAttr: AstNode | undefined;
    let attrs = nodeAttributesProperties(element);
    for (let i = 0; i < attrs.length; i++) {
      const p = attrs[i]!;
      if (
        p.kind === Kind.JsxAttribute &&
        jsxAttributeName(p) !== undefined &&
        isIdentifier(jsxAttributeName(p)!) &&
        nodeText(jsxAttributeName(p)!) === "key"
      ) {
        keyAttr = p;
        attrs = [...attrs.slice(0, i), ...attrs.slice(i + 1)];
        break;
      }
    }
    let object: AstNode;
    if (attrs.length > 0) {
      object = this.transformJsxAttributesToObjectProps(attrs, childrenProp);
    } else {
      const objectChildren: AstNode[] = [];
      if (childrenProp !== undefined) objectChildren.push(childrenProp);
      object = this.factory().newObjectLiteralExpression(this.factory().newNodeList(objectChildren), false);
    }
    return this.visitJsxOpeningLikeElementOrFragmentJSX(tagName, object, keyAttr, children, location);
  }

  transformJsxAttributesToObjectProps(attrs: readonly AstNode[], childrenProp: AstNode | undefined): AstNode {
    const target = compilerOptionsEmitScriptTarget(this.compilerOptions);
    if (target >= ScriptTarget.ES2018) {
      return this.factory().newObjectLiteralExpression(
        this.factory().newNodeList(this.transformJsxAttributesToProps(attrs, childrenProp)),
        false,
      );
    }
    return this.transformJsxAttributesToExpression(attrs, childrenProp);
  }

  transformJsxAttributesToExpression(attrs: readonly AstNode[], childrenProp: AstNode | undefined): AstNode {
    let expressions: AstNode[] = [];
    let properties: AstNode[] = [];

    for (const attr of attrs) {
      if (isJsxSpreadAttribute(attr)) {
        const e = nodeExpression(attr);
        if (isObjectLiteralExpression(e) && !hasProto(e)) {
          for (const prop of objectLiteralProperties(e)) {
            if (isSpreadAssignment(prop)) {
              ({ expressions, properties } = this.combinePropertiesIntoNewExpression(expressions, properties));
              expressions.push(this.visitor().visit(nodeExpression(prop))!);
              continue;
            }
            properties.push(this.visitor().visit(prop)!);
          }
          continue;
        }
        ({ expressions, properties } = this.combinePropertiesIntoNewExpression(expressions, properties));
        expressions.push(this.visitor().visit(nodeExpression(attr))!);
        continue;
      }
      properties.push(this.transformJsxAttributeToObjectLiteralElement(attr as unknown as JsxAttribute));
    }

    if (childrenProp !== undefined) properties.push(childrenProp);

    ({ expressions } = this.combinePropertiesIntoNewExpression(expressions, properties));

    if (expressions.length > 0 && !isObjectLiteralExpression(expressions[0]!)) {
      expressions = [
        this.factory().newObjectLiteralExpression(this.factory().newNodeList<AstNode>([]), false),
        ...expressions,
      ];
    }

    if (expressions.length === 1) return expressions[0]!;
    return this.factory().newAssignHelper(expressions, compilerOptionsEmitScriptTarget(this.compilerOptions));
  }

  combinePropertiesIntoNewExpression(
    expressions: AstNode[],
    props: AstNode[],
  ): { expressions: AstNode[]; properties: AstNode[] } {
    if (props.length === 0) return { expressions, properties: props };
    const newObj = this.factory().newObjectLiteralExpression(this.factory().newNodeList(props), false);
    return { expressions: [...expressions, newObj], properties: [] };
  }

  transformJsxAttributesToProps(attrs: readonly AstNode[], childrenProp: AstNode | undefined): AstNode[] {
    const props: AstNode[] = [];
    for (const attr of attrs) {
      if (attr.kind === Kind.JsxSpreadAttribute) {
        for (const r of this.transformJsxSpreadAttributesToProps(attr as unknown as JsxSpreadAttribute)) {
          props.push(r);
        }
      } else {
        props.push(this.transformJsxAttributeToObjectLiteralElement(attr as unknown as JsxAttribute));
      }
    }
    if (childrenProp !== undefined) props.push(childrenProp);
    return props;
  }

  transformJsxSpreadAttributesToProps(node: JsxSpreadAttribute): AstNode[] {
    const e = jsxSpreadAttributeExpression(node);
    if (isObjectLiteralExpression(e) && !hasProto(e)) {
      const { items } = this.visitor().visitSlice(objectLiteralProperties(e));
      return [...items];
    }
    return [this.factory().newSpreadAssignment(this.visitor().visit(e)!)];
  }

  transformJsxAttributeToObjectLiteralElement(node: JsxAttribute): AstNode {
    const name = this.getAttributeName(node);
    const expression = this.transformJsxAttributeInitializer(jsxAttributeInitializer(node));
    return this.factory().newPropertyAssignment(undefined, name, undefined, undefined, expression);
  }

  getAttributeName(node: JsxAttribute): AstNode {
    const name = jsxAttributeName(node)!;
    if (isIdentifier(name)) {
      const text = nodeText(name);
      if (isIdentifierText(text, LanguageVariant.Standard)) return name;
      return this.factory().newStringLiteral(text, TokenFlags.None);
    }
    return this.factory().newStringLiteral(
      jsxNamespacedNamespaceText(name) + ":" + jsxNamespacedNameText(name),
      TokenFlags.None,
    );
  }

  transformJsxAttributeInitializer(node: AstNode | undefined): AstNode {
    if (node === undefined) return this.factory().newTrueExpression();
    if (node.kind === Kind.StringLiteral) {
      const res = this.factory().newStringLiteral(decodeEntities(nodeText(node)), stringLiteralTokenFlags(node));
      setLoc(res, nodeLoc(node));
      setStringLiteralTokenFlags(res, stringLiteralTokenFlags(node));
      return res;
    }
    if (node.kind === Kind.JsxExpression) {
      const inner = nodeExpression(node);
      if (inner === undefined) return this.factory().newTrueExpression();
      return this.visitor().visit(inner)!;
    }
    if (isJsxElement(node) || isJsxSelfClosingElement(node) || isJsxFragment(node)) {
      this.setInChild(false);
      return this.visitor().visit(node)!;
    }
    throw new Error("Unhandled node kind found in jsx initializer");
  }

  visitJsxOpeningLikeElementOrFragmentJSX(
    tagName: AstNode,
    object: AstNode,
    keyAttr: AstNode | undefined,
    children: NodeArray<AstNode> | undefined,
    location: TextRange,
  ): AstNode {
    let nonWhitespace: readonly AstNode[] = [];
    if (children !== undefined) nonWhitespace = getSemanticJsxChildren(children);
    const isStaticChildren =
      nonWhitespace.length > 1 ||
      (nonWhitespace.length === 1 &&
        isJsxExpression(nonWhitespace[0]!) &&
        jsxExpressionDotDotDot(nonWhitespace[0]!) !== undefined);

    const args: AstNode[] = [tagName, object];
    if (keyAttr !== undefined) {
      args.push(this.transformJsxAttributeInitializer(nodeInitializerOf(keyAttr)));
    }

    if (compilerOptionsJsx(this.compilerOptions) === JsxEmit.ReactJSXDev) {
      const originalFile = this.emitContext().mostOriginal(this.currentSourceFile! as unknown as AstNode);
      if (originalFile !== undefined && isSourceFile(originalFile)) {
        if (keyAttr === undefined) args.push(this.factory().newVoidZeroExpression());
        args.push(isStaticChildren ? this.factory().newTrueExpression() : this.factory().newFalseExpression());
        const { line, character } = getECMALineAndUTF16CharacterOfPosition(originalFile as unknown as SourceFile, location.pos);
        args.push(
          this.factory().newObjectLiteralExpression(
            this.factory().newNodeList([
              this.factory().newPropertyAssignment(undefined, this.factory().newIdentifier("fileName"), undefined, undefined, this.getCurrentFileNameExpression()),
              this.factory().newPropertyAssignment(undefined, this.factory().newIdentifier("lineNumber"), undefined, undefined, this.factory().newNumericLiteral(String(line + 1), TokenFlags.None)),
              this.factory().newPropertyAssignment(undefined, this.factory().newIdentifier("columnNumber"), undefined, undefined, this.factory().newNumericLiteral(String(character + 1), TokenFlags.None)),
            ]),
            false,
          ),
        );
        args.push(this.factory().newThisExpression());
      }
    }

    const element = this.factory().newCallExpression(
      this.getJsxFactoryCallee(isStaticChildren),
      undefined,
      undefined,
      this.factory().newNodeList(args),
      NodeFlags.None,
    );
    setLoc(element, location);
    if (this.inJsxChild) this.emitContext().addEmitFlags(element, EmitFlags.StartOnNewLine);
    return element;
  }

  visitJsxOpeningFragmentJSX(
    fragment: JsxOpeningFragment,
    children: NodeArray<AstNode> | undefined,
    location: TextRange,
  ): AstNode {
    let childrenProps: AstNode | undefined;
    if (children !== undefined && children.length > 0) {
      childrenProps = this.convertJsxChildrenToChildrenPropObject(children);
    }
    if (childrenProps === undefined) {
      childrenProps = this.factory().newObjectLiteralExpression(this.factory().newNodeList<AstNode>([]), false);
    }
    return this.visitJsxOpeningLikeElementOrFragmentJSX(
      this.getImplicitJsxFragmentReference(),
      childrenProps,
      undefined,
      children,
      location,
    );
  }

  // -------------------------------------------------------------------------
  // Classic-runtime (createElement) path
  // -------------------------------------------------------------------------

  createReactNamespace(reactNamespace: string, parent: AstNode): AstNode {
    const ns = reactNamespace.length === 0 ? "React" : reactNamespace;
    const react = this.factory().newIdentifier(ns);
    clearNodeSynthesizedFlag(react);
    setNodeParent(react, this.emitContext().parseNode(parent)!);
    const container = this.emitResolver.getReferencedExportContainer(react, false);
    if (container !== undefined && isModuleDeclaration(container)) {
      const containerName = this.factory().newGeneratedNameForNode(container);
      return this.factory().newPropertyAccessExpression(containerName, undefined, react, NodeFlags.None);
    }
    return react;
  }

  createJsxFactoryExpressionFromEntityName(e: AstNode, parent: AstNode): AstNode {
    if (isQualifiedName(e)) {
      const left = this.createJsxFactoryExpressionFromEntityName(qualifiedNameLeft(e), parent);
      const right = this.factory().newIdentifier(nodeText(qualifiedNameRight(e)));
      return this.factory().newPropertyAccessExpression(left, undefined, right, NodeFlags.None);
    }
    return this.createReactNamespace(nodeText(e), parent);
  }

  createJsxPseudoFactoryExpression(parent: AstNode, e: AstNode | undefined, target: string): AstNode {
    if (e !== undefined) return this.createJsxFactoryExpressionFromEntityName(e, parent);
    return this.factory().newPropertyAccessExpression(
      this.createReactNamespace(compilerOptionsReactNamespace(this.compilerOptions), parent),
      undefined,
      this.factory().newIdentifier(target),
      NodeFlags.None,
    );
  }

  createJsxFactoryExpression(parent: AstNode): AstNode {
    const e = this.emitResolver.getJsxFactoryEntity(this.currentSourceFile! as unknown as AstNode);
    return this.createJsxPseudoFactoryExpression(parent, e, "createElement");
  }

  createJsxFragmentFactoryExpression(parent: AstNode): AstNode {
    const e = this.emitResolver.getJsxFragmentFactoryEntity(this.currentSourceFile! as unknown as AstNode);
    return this.createJsxPseudoFactoryExpression(parent, e, "Fragment");
  }

  visitJsxOpeningLikeElementCreateElement(
    element: AstNode,
    children: NodeArray<AstNode> | undefined,
    location: TextRange,
  ): AstNode {
    const tagName = this.getTagName(element);
    const attrs = nodeAttributesProperties(element);
    let objectProperties: AstNode;
    if (attrs.length > 0) {
      objectProperties = this.transformJsxAttributesToObjectProps(attrs, undefined);
    } else {
      objectProperties = this.factory().newKeywordExpression(Kind.NullKeyword);
    }

    let callee: AstNode;
    if (this.importSpecifier.length === 0) {
      callee = this.createJsxFactoryExpression(element);
    } else {
      callee = this.getImplicitImportForName("createElement");
    }

    const newChildren: AstNode[] = [];
    if (children !== undefined && children.length > 0) {
      for (const c of children) {
        const res = this.transformJsxChildToExpression(c);
        if (res !== undefined) newChildren.push(res);
      }
    }

    if (newChildren.length > 1) {
      for (const child of newChildren) this.emitContext().addEmitFlags(child, EmitFlags.StartOnNewLine);
    }

    const args: AstNode[] = [tagName, objectProperties, ...newChildren];
    const result = this.factory().newCallExpression(
      callee,
      undefined,
      undefined,
      this.factory().newNodeList(args),
      NodeFlags.None,
    );
    setLoc(result, location);
    if (this.inJsxChild) this.emitContext().addEmitFlags(result, EmitFlags.StartOnNewLine);
    return result;
  }

  visitJsxOpeningFragmentCreateElement(
    fragment: JsxOpeningFragment,
    children: NodeArray<AstNode> | undefined,
    location: TextRange,
  ): AstNode {
    const tagName = this.createJsxFragmentFactoryExpression(fragment as unknown as AstNode);
    const callee = this.createJsxFactoryExpression(fragment as unknown as AstNode);

    const newChildren: AstNode[] = [];
    if (children !== undefined && children.length > 0) {
      for (const c of children) {
        const res = this.transformJsxChildToExpression(c);
        if (res !== undefined) newChildren.push(res);
      }
    }

    if (newChildren.length > 1) {
      for (const child of newChildren) this.emitContext().addEmitFlags(child, EmitFlags.StartOnNewLine);
    }

    const args: AstNode[] = [tagName, this.factory().newKeywordExpression(Kind.NullKeyword), ...newChildren];
    const result = this.factory().newCallExpression(
      callee,
      undefined,
      undefined,
      this.factory().newNodeList(args),
      NodeFlags.None,
    );
    setLoc(result, location);
    if (this.inJsxChild) this.emitContext().addEmitFlags(result, EmitFlags.StartOnNewLine);
    return result;
  }

  visitJsxText(text: JsxText): AstNode | undefined {
    const fixed = fixupWhitespaceAndDecodeEntities(jsxTextText(text));
    if (fixed.length === 0) return undefined;
    return this.factory().newStringLiteral(fixed, TokenFlags.None);
  }

  visitJsxExpression(expression: JsxExpression): AstNode {
    const e = this.visitor().visit(jsxExpressionExpression(expression))!;
    if (jsxExpressionDotDotDot(expression as unknown as AstNode) !== undefined) {
      return this.factory().newSpreadElement(e);
    }
    return e;
  }
}

export function newJsxTransformer(opts: TransformOptions): Transformer {
  return new JSXTransformer(opts);
}

// ---------------------------------------------------------------------------
// hasKeyAfterPropsSpread
// ---------------------------------------------------------------------------

function hasKeyAfterPropsSpread(node: AstNode): boolean {
  let spread = false;
  let opener = node;
  if (node.kind === Kind.JsxElement) opener = jsxOpeningElement(node as unknown as JsxElement);
  for (const elem of nodeAttributesProperties(opener)) {
    if (
      isJsxSpreadAttribute(elem) &&
      (!isObjectLiteralExpression(nodeExpression(elem)) ||
        objectLiteralProperties(nodeExpression(elem)).some(isSpreadAssignment))
    ) {
      spread = true;
    } else if (spread && elem.kind === Kind.JsxAttribute && jsxAttributeName(elem) !== undefined && isIdentifier(jsxAttributeName(elem)!) && nodeText(jsxAttributeName(elem)!) === "key") {
      return true;
    }
  }
  return false;
}

function hasProto(obj: AstNode): boolean {
  for (const p of objectLiteralProperties(obj)) {
    if (
      isPropertyAssignment(p) &&
      (isStringLiteral(propertyAssignmentNameRO(p)) || isIdentifier(propertyAssignmentNameRO(p))) &&
      nodeText(propertyAssignmentNameRO(p)) === "__proto__"
    ) {
      return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// Import-specifier sorting
// ---------------------------------------------------------------------------

function sortImportSpecifiers(a: AstNode, b: AstNode): number {
  const aPropName = importSpecifierPropertyName(a);
  const bPropName = importSpecifierPropertyName(b);
  const res = compareStringsCaseSensitive(aPropName !== undefined ? nodeText(aPropName) : "", bPropName !== undefined ? nodeText(bPropName) : "");
  if (res !== 0) return res;
  return compareStringsCaseSensitive(nodeText(importSpecifierName(a)), nodeText(importSpecifierName(b)));
}

function getSortedSpecifiers(m: Map<string, AstNode>): AstNode[] {
  const res = Array.from(m.values());
  res.sort(sortImportSpecifiers);
  return res;
}

// ---------------------------------------------------------------------------
// JSX text whitespace + entity decoding
// ---------------------------------------------------------------------------

function addLineOfJsxText(parts: string[], trimmedLine: string, isInitial: boolean): void {
  const decoded = decodeEntities(trimmedLine);
  if (!isInitial) parts.push(" ");
  parts.push(decoded);
}

export function fixupWhitespaceAndDecodeEntities(text: string): string {
  const parts: string[] = [];
  let initial = true;
  let firstNonWhitespace = 0;
  let lastNonWhitespaceEnd = -1;

  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (isLineBreak(c)) {
      if (firstNonWhitespace !== -1 && lastNonWhitespaceEnd !== -1) {
        addLineOfJsxText(parts, text.slice(firstNonWhitespace, lastNonWhitespaceEnd + 1), initial);
        initial = false;
      }
      firstNonWhitespace = -1;
    } else if (!isWhiteSpaceSingleLine(c)) {
      lastNonWhitespaceEnd = i;
      if (firstNonWhitespace === -1) firstNonWhitespace = i;
    }
  }

  if (firstNonWhitespace !== -1) {
    addLineOfJsxText(parts, text.slice(firstNonWhitespace), initial);
  }
  return parts.join("");
}

export function decodeEntities(text: string): string {
  let i = text.indexOf("&");
  if (i < 0) return text;

  let result = "";
  let t = text;
  for (;;) {
    result += t.slice(0, i);
    t = t.slice(i);
    const semi = t.indexOf(";");
    if (semi < 0) break;
    const entity = t.slice(1, semi);
    const decoded = decodeEntity(entity);
    if (decoded !== undefined) {
      result += String.fromCodePoint(decoded);
    } else {
      result += t.slice(0, semi + 1);
    }
    t = t.slice(semi + 1);
    i = t.indexOf("&");
    if (i < 0) break;
  }
  result += t;
  return result;
}

function decodeEntity(entity: string): number | undefined {
  if (entity.length === 0) return undefined;
  if (entity.charCodeAt(0) === 0x23 /* # */) {
    let e = entity.slice(1);
    if (e.length === 0) return undefined;
    let base = 10;
    if (e.charCodeAt(0) === 0x78 /* x */ || e.charCodeAt(0) === 0x58 /* X */) {
      base = 16;
      e = e.slice(1);
    }
    if (e.length === 0) return undefined;
    if (base === 16 && !/^[0-9a-fA-F]+$/.test(e)) return undefined;
    if (base === 10 && !/^[0-9]+$/.test(e)) return undefined;
    const parsed = parseInt(e, base);
    if (Number.isNaN(parsed)) return undefined;
    return parsed;
  }
  return entities.get(entity);
}

// XML/HTML named entity table (cf. Strada `entities`).
const entities: Map<string, number> = new Map([
  ["quot", 0x0022], ["amp", 0x0026], ["apos", 0x0027], ["lt", 0x003C], ["gt", 0x003E],
  ["nbsp", 0x00A0], ["iexcl", 0x00A1], ["cent", 0x00A2], ["pound", 0x00A3], ["curren", 0x00A4],
  ["yen", 0x00A5], ["brvbar", 0x00A6], ["sect", 0x00A7], ["uml", 0x00A8], ["copy", 0x00A9],
  ["ordf", 0x00AA], ["laquo", 0x00AB], ["not", 0x00AC], ["shy", 0x00AD], ["reg", 0x00AE],
  ["macr", 0x00AF], ["deg", 0x00B0], ["plusmn", 0x00B1], ["sup2", 0x00B2], ["sup3", 0x00B3],
  ["acute", 0x00B4], ["micro", 0x00B5], ["para", 0x00B6], ["middot", 0x00B7], ["cedil", 0x00B8],
  ["sup1", 0x00B9], ["ordm", 0x00BA], ["raquo", 0x00BB], ["frac14", 0x00BC], ["frac12", 0x00BD],
  ["frac34", 0x00BE], ["iquest", 0x00BF], ["Agrave", 0x00C0], ["Aacute", 0x00C1], ["Acirc", 0x00C2],
  ["Atilde", 0x00C3], ["Auml", 0x00C4], ["Aring", 0x00C5], ["AElig", 0x00C6], ["Ccedil", 0x00C7],
  ["Egrave", 0x00C8], ["Eacute", 0x00C9], ["Ecirc", 0x00CA], ["Euml", 0x00CB], ["Igrave", 0x00CC],
  ["Iacute", 0x00CD], ["Icirc", 0x00CE], ["Iuml", 0x00CF], ["ETH", 0x00D0], ["Ntilde", 0x00D1],
  ["Ograve", 0x00D2], ["Oacute", 0x00D3], ["Ocirc", 0x00D4], ["Otilde", 0x00D5], ["Ouml", 0x00D6],
  ["times", 0x00D7], ["Oslash", 0x00D8], ["Ugrave", 0x00D9], ["Uacute", 0x00DA], ["Ucirc", 0x00DB],
  ["Uuml", 0x00DC], ["Yacute", 0x00DD], ["THORN", 0x00DE], ["szlig", 0x00DF], ["agrave", 0x00E0],
  ["aacute", 0x00E1], ["acirc", 0x00E2], ["atilde", 0x00E3], ["auml", 0x00E4], ["aring", 0x00E5],
  ["aelig", 0x00E6], ["ccedil", 0x00E7], ["egrave", 0x00E8], ["eacute", 0x00E9], ["ecirc", 0x00EA],
  ["euml", 0x00EB], ["igrave", 0x00EC], ["iacute", 0x00ED], ["icirc", 0x00EE], ["iuml", 0x00EF],
  ["eth", 0x00F0], ["ntilde", 0x00F1], ["ograve", 0x00F2], ["oacute", 0x00F3], ["ocirc", 0x00F4],
  ["otilde", 0x00F5], ["ouml", 0x00F6], ["divide", 0x00F7], ["oslash", 0x00F8], ["ugrave", 0x00F9],
  ["uacute", 0x00FA], ["ucirc", 0x00FB], ["uuml", 0x00FC], ["yacute", 0x00FD], ["thorn", 0x00FE],
  ["yuml", 0x00FF], ["OElig", 0x0152], ["oelig", 0x0153], ["Scaron", 0x0160], ["scaron", 0x0161],
  ["Yuml", 0x0178], ["fnof", 0x0192], ["circ", 0x02C6], ["tilde", 0x02DC],
  ["Alpha", 0x0391], ["Beta", 0x0392], ["Gamma", 0x0393], ["Delta", 0x0394], ["Epsilon", 0x0395],
  ["Zeta", 0x0396], ["Eta", 0x0397], ["Theta", 0x0398], ["Iota", 0x0399], ["Kappa", 0x039A],
  ["Lambda", 0x039B], ["Mu", 0x039C], ["Nu", 0x039D], ["Xi", 0x039E], ["Omicron", 0x039F],
  ["Pi", 0x03A0], ["Rho", 0x03A1], ["Sigma", 0x03A3], ["Tau", 0x03A4], ["Upsilon", 0x03A5],
  ["Phi", 0x03A6], ["Chi", 0x03A7], ["Psi", 0x03A8], ["Omega", 0x03A9],
  ["alpha", 0x03B1], ["beta", 0x03B2], ["gamma", 0x03B3], ["delta", 0x03B4], ["epsilon", 0x03B5],
  ["zeta", 0x03B6], ["eta", 0x03B7], ["theta", 0x03B8], ["iota", 0x03B9], ["kappa", 0x03BA],
  ["lambda", 0x03BB], ["mu", 0x03BC], ["nu", 0x03BD], ["xi", 0x03BE], ["omicron", 0x03BF],
  ["pi", 0x03C0], ["rho", 0x03C1], ["sigmaf", 0x03C2], ["sigma", 0x03C3], ["tau", 0x03C4],
  ["upsilon", 0x03C5], ["phi", 0x03C6], ["chi", 0x03C7], ["psi", 0x03C8], ["omega", 0x03C9],
  ["thetasym", 0x03D1], ["upsih", 0x03D2], ["piv", 0x03D6],
  ["ensp", 0x2002], ["emsp", 0x2003], ["thinsp", 0x2009], ["zwnj", 0x200C], ["zwj", 0x200D],
  ["lrm", 0x200E], ["rlm", 0x200F], ["ndash", 0x2013], ["mdash", 0x2014], ["lsquo", 0x2018],
  ["rsquo", 0x2019], ["sbquo", 0x201A], ["ldquo", 0x201C], ["rdquo", 0x201D], ["bdquo", 0x201E],
  ["dagger", 0x2020], ["Dagger", 0x2021], ["bull", 0x2022], ["hellip", 0x2026], ["permil", 0x2030],
  ["prime", 0x2032], ["Prime", 0x2033], ["lsaquo", 0x2039], ["rsaquo", 0x203A], ["oline", 0x203E],
  ["frasl", 0x2044], ["euro", 0x20AC], ["image", 0x2111], ["weierp", 0x2118], ["real", 0x211C],
  ["trade", 0x2122], ["alefsym", 0x2135], ["larr", 0x2190], ["uarr", 0x2191], ["rarr", 0x2192],
  ["darr", 0x2193], ["harr", 0x2194], ["crarr", 0x21B5], ["lArr", 0x21D0], ["uArr", 0x21D1],
  ["rArr", 0x21D2], ["dArr", 0x21D3], ["hArr", 0x21D4],
  ["forall", 0x2200], ["part", 0x2202], ["exist", 0x2203], ["empty", 0x2205], ["nabla", 0x2207],
  ["isin", 0x2208], ["notin", 0x2209], ["ni", 0x220B], ["prod", 0x220F], ["sum", 0x2211],
  ["minus", 0x2212], ["lowast", 0x2217], ["radic", 0x221A], ["prop", 0x221D], ["infin", 0x221E],
  ["ang", 0x2220], ["and", 0x2227], ["or", 0x2228], ["cap", 0x2229], ["cup", 0x222A],
  ["int", 0x222B], ["there4", 0x2234], ["sim", 0x223C], ["cong", 0x2245], ["asymp", 0x2248],
  ["ne", 0x2260], ["equiv", 0x2261], ["le", 0x2264], ["ge", 0x2265], ["sub", 0x2282],
  ["sup", 0x2283], ["nsub", 0x2284], ["sube", 0x2286], ["supe", 0x2287],
  ["oplus", 0x2295], ["otimes", 0x2297], ["perp", 0x22A5], ["sdot", 0x22C5],
  ["lceil", 0x2308], ["rceil", 0x2309], ["lfloor", 0x230A], ["rfloor", 0x230B],
  ["lang", 0x2329], ["rang", 0x232A], ["loz", 0x25CA],
  ["spades", 0x2660], ["clubs", 0x2663], ["hearts", 0x2665], ["diams", 0x2666],
]);

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown; readonly [key: string]: unknown }
interface EmitResolver {
  setReferencedImportDeclaration(name: AstNode, specifier: AstNode): void;
  getReferencedExportContainer(name: AstNode, prefixLocals: boolean): AstNode | undefined;
  getJsxFactoryEntity(file: AstNode): AstNode | undefined;
  getJsxFragmentFactoryEntity(file: AstNode): AstNode | undefined;
}

// TextRange comes from ast/index.js (imported above).

// LanguageVariant/JsxEmit dev-flag/ScriptTarget — stub until printer port.
const LanguageVariant = { Standard: 0 } as const;
const SubtreeFacts = { ContainsJsx: 1 << 2 } as const;
