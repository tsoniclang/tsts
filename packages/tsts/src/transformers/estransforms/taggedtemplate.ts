/**
 * Tagged-template invalid-escape lift transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/taggedtemplate.go`.
 *
 * Earlier ES versions banned certain escape sequences (`\u`, `\x`,
 * octal `\0n`) in tagged-template literals. ES2018 lifted that
 * restriction: the cooked value can be `undefined` while the raw value
 * carries the original text. This transformer rewrites pre-lift
 * tagged templates into calls that explicitly pass cooked/raw arrays.
 */

import type { Node as AstNode, SourceFile } from "../../ast/index.js";
import { nodeKind, sourceFileEndOfFileToken, isExternalModule } from "../../ast/index.js";
import { isNoSubstitutionTemplateLiteral } from "../../ast/index.js";
import { Kind } from "../../ast/index.js";
import {
  visitNode, visitEachChildOf, addEmitHelpers, readEmitHelpers,
  newVariableStatement, newVariableDeclarationList,
  newVariableDeclaration, newNodeList, updateSourceFile,
  newTemplateObjectHelper, newArrayLiteralExpression, newCallExpression,
  newStringLiteral, newVoidZeroExpression, newUniqueName,
  newLogicalORExpression, newAssignmentExpression,
} from "../../printer/factory-helpers.js";

import { Transformer, type EmitContext } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

const KindSourceFile = Kind.SourceFile;
const KindTaggedTemplateExpression = Kind.TaggedTemplateExpression;
const KindNoSubstitutionTemplateLiteral = Kind.NoSubstitutionTemplateLiteral;
const KindTemplateTail = Kind.TemplateTail;
void KindSourceFile; void KindTaggedTemplateExpression;
void KindNoSubstitutionTemplateLiteral; void KindTemplateTail;

class TaggedTemplateTransformer extends Transformer {
  private currentSourceFile: SourceFile | undefined;
  private taggedTemplateStringDeclarations: AstNode[] = [];

  constructor(opts: TransformOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsInvalidTemplateEscape(node)) return node;
    const kind = nodeKind(node);
    if (kind === KindSourceFile) return this.visitSourceFile(node as unknown as SourceFile);
    if (kind === KindTaggedTemplateExpression) return this.processTaggedTemplateExpression(node);
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitSourceFile(node: SourceFile): AstNode {
    this.currentSourceFile = node;
    this.taggedTemplateStringDeclarations = [];

    let visited = visitEachChildOf(this.getVisitor(), node as unknown as AstNode);

    if (this.taggedTemplateStringDeclarations.length > 0) {
      const factory = this.getFactory();
      const existing = sourceFileStatements(visited as unknown as SourceFile);
      const variableStatement = newVariableStatement(
        factory,
        undefined,
        newVariableDeclarationList(factory, newNodeList(factory, this.taggedTemplateStringDeclarations), 0),
      );
      const combined = [...existing, variableStatement];
      visited = updateSourceFile(factory, visited as unknown as SourceFile, newNodeList(factory, combined), sourceFileEndOfFileToken(visited as unknown as SourceFile)) as unknown as AstNode;
    }

    const emit = this.getEmitContext();
    addEmitHelpers(emit, visited, readEmitHelpers(emit));
    return visited;
  }

  private processTaggedTemplateExpression(node: AstNode): AstNode {
    const visitor = this.getVisitor();
    const factory = this.getFactory();
    const tag = visitNode(visitor, taggedTemplateTag(node));
    const template = taggedTemplateTemplate(node);

    if (!hasInvalidEscape(template)) {
      return visitEachChildOf(visitor, node);
    }

    const templateArguments: AstNode[] = [/* placeholder for template object */ undefined as unknown as AstNode];
    const cookedStrings: AstNode[] = [];
    const rawStrings: AstNode[] = [];

    if (isNoSubstitutionTemplateLiteral(template)) {
      cookedStrings.push(createTemplateCooked(factory, templateLiteralLikeData(template)));
      rawStrings.push(getRawLiteral(factory, template));
    } else {
      const head = templateExpressionHead(template);
      cookedStrings.push(createTemplateCooked(factory, templateLiteralLikeData(head)));
      rawStrings.push(getRawLiteral(factory, head));
      const spans = templateExpressionSpans(template);
      for (const span of spans) {
        const literal = templateSpanLiteral(span);
        cookedStrings.push(createTemplateCooked(factory, templateLiteralLikeData(literal)));
        rawStrings.push(getRawLiteral(factory, literal));
        templateArguments.push(visitNode(visitor, templateSpanExpression(span)));
      }
    }

    const helperCall = newTemplateObjectHelper(
      factory,
      newArrayLiteralExpression(factory, newNodeList(factory, cookedStrings), false),
      newArrayLiteralExpression(factory, newNodeList(factory, rawStrings), false),
    );

    if (this.currentSourceFile !== undefined && isExternalModule(this.currentSourceFile)) {
      const tempVar = newUniqueName(factory, "templateObject");
      this.taggedTemplateStringDeclarations.push(newVariableDeclaration(factory, tempVar, undefined, undefined, undefined));
      templateArguments[0] = newLogicalORExpression(factory, tempVar, newAssignmentExpression(factory, tempVar, helperCall));
    } else {
      templateArguments[0] = helperCall;
    }

    return newCallExpression(factory, tag, undefined, undefined, newNodeList(factory, templateArguments));
  }
}

const newlineNormalizer = (s: string): string => s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

function createTemplateCooked(
  factory: ReturnType<Transformer["getFactory"]>,
  template: { readonly text: string; readonly templateFlags: number },
): AstNode {
  if ((template.templateFlags & TokenFlagsIsInvalid) !== 0) {
    return newVoidZeroExpression(factory);
  }
  return newStringLiteral(factory, template.text, 0);
}

function getRawLiteral(
  factory: ReturnType<Transformer["getFactory"]>,
  node: AstNode,
): AstNode {
  let text = templateLiteralLikeData(node).rawText;
  if (text === "") {
    text = getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, false);
    const kind = nodeKind(node);
    const isLast = kind === KindNoSubstitutionTemplateLiteral || kind === KindTemplateTail;
    const endLen = isLast ? 1 : 2;
    text = text.slice(1, text.length - endLen);
  }
  text = newlineNormalizer(text);
  return newStringLiteral(factory, text, 0);
}

function hasInvalidEscape(template: AstNode): boolean {
  if (isNoSubstitutionTemplateLiteral(template)) {
    return (templateLiteralLikeData(template).templateFlags & TokenFlagsContainsInvalidEscape) !== 0;
  }
  const head = templateExpressionHead(template);
  if ((templateLiteralLikeData(head).templateFlags & TokenFlagsContainsInvalidEscape) !== 0) {
    return true;
  }
  for (const span of templateExpressionSpans(template)) {
    const literal = templateSpanLiteral(span);
    if ((templateLiteralLikeData(literal).templateFlags & TokenFlagsContainsInvalidEscape) !== 0) {
      return true;
    }
  }
  return false;
}

export function newTaggedTemplateLiftRestrictionTransformer(opts: TransformOptions): Transformer {
  return new TaggedTemplateTransformer(opts);
}

// Strada-specific helpers still forward-declared.
declare function subtreeContainsInvalidTemplateEscape(node: AstNode): boolean;
declare function taggedTemplateTag(node: AstNode): AstNode;
declare function taggedTemplateTemplate(node: AstNode): AstNode;
declare function templateLiteralLikeData(node: AstNode): { readonly text: string; readonly rawText: string; readonly templateFlags: number };
declare function templateExpressionHead(node: AstNode): AstNode;
declare function templateExpressionSpans(node: AstNode): readonly AstNode[];
declare function templateSpanLiteral(span: AstNode): AstNode;
declare function templateSpanExpression(span: AstNode): AstNode;
declare function getSourceFileOfNode(node: AstNode): SourceFile;
declare function getSourceTextOfNodeFromSourceFile(file: SourceFile, node: AstNode, includeTrivia: boolean): string;
declare function sourceFileStatements(file: SourceFile): readonly AstNode[];
const TokenFlagsIsInvalid = 1 << 0;
const TokenFlagsContainsInvalidEscape = 1 << 1;
