/**
 * Folding range helpers.
 *
 * Porting surface for TS-Go `internal/ls/folding.go`.
 */

import {
  findChildOfKind,
  getStartOfNode,
  getTokenAtPositionPublic,
} from "../astnav/index.js";
import {
  Kind,
  NodeFlags,
  isAnyImportSyntax,
  isArrowFunction,
  isArrayLiteralExpression,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isCallOrNewExpression,
  isClassLikeDeclaration,
  isDeclaration,
  isFunctionLikeDeclaration,
  isIfStatement,
  isImportAttributes,
  isInterfaceDeclaration,
  isJsxElement,
  isJsxFragment,
  isJsxOpeningElement,
  isJsxSelfClosingElement,
  isJsxText,
  isModuleBlock,
  isNamedExports,
  isNamedImports,
  isNoSubstitutionTemplateLiteral,
  isParenthesizedExpression,
  isReturnStatement,
  isTupleTypeNode,
  isVariableStatement,
  type Node,
  type NodeArray,
  type SourceFile,
} from "../ast/index.js";
import type {
  DocumentUri,
  FoldingRange,
  FoldingRangeKind,
  FoldingRangeResponse,
  Position,
  Range,
} from "../lsp/lsproto/index.js";
import {
  FoldingRangeKindComment,
  FoldingRangeKindImports,
  FoldingRangeKindRegion,
} from "../lsp/lsproto/index.js";
import { scanCommentAt } from "../printer/comments.js";
import { positionsAreOnSameLine } from "../printer/utilities.js";
import { getTextOfNode } from "../scanner/utilities.js";
import { isInComment } from "./format.js";

export interface FoldingClientCapabilities {
  readonly collapsedText?: boolean;
  readonly lineFoldingOnly?: boolean;
}

export interface FoldingLanguageService {
  getProgramAndFile(documentURI: DocumentUri): readonly [unknown, SourceFile];
}

export interface RegionDelimiterResult {
  readonly isStart: boolean;
  readonly name: string;
}

export function provideFoldingRange(
  service: FoldingLanguageService,
  documentURI: DocumentUri,
  capabilities: FoldingClientCapabilities = {},
): FoldingRangeResponse {
  const [, sourceFile] = service.getProgramAndFile(documentURI);
  let ranges = addNodeOutliningSpans(sourceFile, capabilities);
  ranges = [...ranges, ...addRegionOutliningSpans(sourceFile, capabilities)];
  if (capabilities.lineFoldingOnly === true) {
    ranges = adjustFoldingEnd(ranges, sourceFile);
  }
  ranges.sort((left, right) => left.startLine - right.startLine || (left.startCharacter ?? 0) - (right.startCharacter ?? 0));
  return { foldingRanges: ranges };
}

export function adjustFoldingEnd(ranges: readonly FoldingRange[], sourceFile: SourceFile): FoldingRange[] {
  const sourceText = sourceFile.text;
  const result: FoldingRange[] = [];
  for (const range of ranges) {
    if (range.endCharacter !== undefined && range.endCharacter > 0) {
      const endOffset = lineAndCharacterToPosition(sourceFile, { line: range.endLine, character: range.endCharacter });
      if (endOffset > 0 && endOffset <= sourceText.length) {
        const foldEndCharacter = sourceText[endOffset - 1];
        if (foldEndCharacter === "}" || foldEndCharacter === "]" || foldEndCharacter === ")" || foldEndCharacter === "`" || foldEndCharacter === ">") {
          result.push(range.endLine > range.startLine ? { ...range, endLine: range.endLine - 1 } : range);
          continue;
        }
      }
    }
    result.push(range);
  }
  return result;
}

export function addNodeOutliningSpans(sourceFile: SourceFile, capabilities: FoldingClientCapabilities = {}): FoldingRange[] {
  const depthRemaining = 40;
  let current = 0;
  const statements = sourceFile.statements;
  const foldingRanges: FoldingRange[] = [];

  while (current < statements.length) {
    while (current < statements.length && !isAnyImportSyntax(statements[current]!)) {
      foldingRanges.push(...visitNode(statements[current]!, depthRemaining, sourceFile, capabilities));
      current += 1;
    }
    if (current === statements.length) break;

    const firstImport = current;
    while (current < statements.length && isAnyImportSyntax(statements[current]!)) {
      foldingRanges.push(...visitNode(statements[current]!, depthRemaining, sourceFile, capabilities));
      current += 1;
    }
    const lastImport = current - 1;
    if (lastImport !== firstImport) {
      const importKeyword = findChildOfKind(statements[firstImport]!, Kind.ImportKeyword, sourceFile);
      foldingRanges.push(createFoldingRangeFromBounds(
        importKeyword === undefined ? getStartOfNode(statements[firstImport]!, sourceFile, false) : getStartOfNode(importKeyword, sourceFile, false),
        statements[lastImport]!.end,
        FoldingRangeKindImports,
        sourceFile,
        capabilities,
      ));
    }
  }

  foldingRanges.push(...visitNode(sourceFile.endOfFileToken, depthRemaining, sourceFile, capabilities));
  return foldingRanges;
}

export function addRegionOutliningSpans(sourceFile: SourceFile, capabilities: FoldingClientCapabilities = {}): FoldingRange[] {
  const regions: FoldingRange[] = [];
  const out: FoldingRange[] = [];
  const lineStarts = lineStartsOf(sourceFile);
  const text = sourceFile.text;

  for (const currentLineStart of lineStarts) {
    const lineEnd = getLineEndOfPosition(sourceFile, currentLineStart);
    const lineText = text.slice(currentLineStart, lineEnd);
    const result = parseRegionDelimiter(lineText);
    if (result === undefined || isInComment(sourceFile, currentLineStart, getTokenAtPositionPublic(sourceFile, currentLineStart)) !== undefined) {
      continue;
    }

    if (result.isStart) {
      const slashIndex = lineText.indexOf("//");
      const commentStart = positionToLineAndCharacter(sourceFile, slashIndex < 0 ? currentLineStart : currentLineStart + slashIndex);
      const region: FoldingRange = {
        startLine: commentStart.line,
        startCharacter: commentStart.character,
        endLine: commentStart.line,
        endCharacter: commentStart.character,
        kind: FoldingRangeKindRegion,
      };
      if (supportsCollapsedText(capabilities)) {
        regionMutable(region).collapsedText = result.name === "" ? "#region" : result.name;
      }
      regions.push(region);
    } else if (regions.length > 0) {
      const region = regions.pop()!;
      const endingPosition = positionToLineAndCharacter(sourceFile, lineEnd);
      out.push({
        ...region,
        endLine: endingPosition.line,
        endCharacter: endingPosition.character,
      });
    }
  }
  return out;
}

function visitNode(
  node: Node,
  depthRemaining: number,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities,
): FoldingRange[] {
  if ((node.flags & NodeFlags.Reparsed) !== 0 || depthRemaining === 0) return [];
  const foldingRanges: FoldingRange[] = [];

  if ((!isBinaryExpression(node) && isDeclaration(node)) || isVariableStatement(node) || isReturnStatement(node) || isCallOrNewExpression(node) || node.kind === Kind.EndOfFile) {
    foldingRanges.push(...addOutliningForLeadingCommentsForNode(node, sourceFile, capabilities));
  }

  if (isFunctionLikeDeclaration(node) && node.parent !== undefined && isBinaryExpression(node.parent)) {
    const left = node.parent.left;
    if (left?.kind === Kind.PropertyAccessExpression) {
      foldingRanges.push(...addOutliningForLeadingCommentsForNode(left, sourceFile, capabilities));
    }
  }

  if (isBlock(node)) {
    foldingRanges.push(...addOutliningForLeadingCommentsForPos(node.statements.end, sourceFile, capabilities));
  } else if (isModuleBlock(node)) {
    foldingRanges.push(...addOutliningForLeadingCommentsForPos(node.statements.end, sourceFile, capabilities));
  } else if (isClassLikeDeclaration(node) || isInterfaceDeclaration(node)) {
    foldingRanges.push(...addOutliningForLeadingCommentsForPos(node.members.end, sourceFile, capabilities));
  }

  const span = getOutliningSpanForNode(node, sourceFile, capabilities);
  if (span !== undefined) foldingRanges.push(span);

  let nextDepth = depthRemaining - 1;
  if (isCallExpression(node)) {
    nextDepth += 1;
    foldingRanges.push(...visitNode(node.expression, nextDepth, sourceFile, capabilities));
    nextDepth -= 1;
    for (const argument of node.arguments) {
      foldingRanges.push(...visitNode(argument, nextDepth, sourceFile, capabilities));
    }
    for (const typeArgument of node.typeArguments ?? []) {
      foldingRanges.push(...visitNode(typeArgument, nextDepth, sourceFile, capabilities));
    }
  } else if (isIfStatement(node) && node.elseStatement !== undefined && isIfStatement(node.elseStatement)) {
    foldingRanges.push(...visitNode(node.expression, nextDepth, sourceFile, capabilities));
    foldingRanges.push(...visitNode(node.thenStatement, nextDepth, sourceFile, capabilities));
    foldingRanges.push(...visitNode(node.elseStatement, nextDepth + 1, sourceFile, capabilities));
  } else {
    node.forEachChild(child => {
      foldingRanges.push(...visitNode(child, nextDepth, sourceFile, capabilities));
      return undefined;
    });
  }

  return foldingRanges;
}

export function addOutliningForLeadingCommentsForNode(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange[] {
  if (isJsxText(node)) return [];
  return addOutliningForLeadingCommentsForPos(node.pos, sourceFile, capabilities);
}

export function addOutliningForLeadingCommentsForPos(
  pos: number,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange[] {
  const foldingRanges: FoldingRange[] = [];
  let firstSingleLineCommentStart = -1;
  let lastSingleLineCommentEnd = -1;
  let singleLineCommentCount = 0;
  const text = sourceFile.text;

  const combineAndAddMultipleSingleLineComments = (): FoldingRange | undefined => {
    if (singleLineCommentCount > 1) {
      return createFoldingRangeFromBounds(firstSingleLineCommentStart, lastSingleLineCommentEnd, FoldingRangeKindComment, sourceFile, capabilities);
    }
    return undefined;
  };

  for (const comment of getLeadingCommentRangesFromPosition(text, pos)) {
    if (comment.kind === Kind.SingleLineCommentTrivia) {
      const commentText = text.slice(comment.pos, comment.end);
      if (parseRegionDelimiter(commentText) !== undefined) {
        const combined = combineAndAddMultipleSingleLineComments();
        if (combined !== undefined) foldingRanges.push(combined);
        singleLineCommentCount = 0;
        continue;
      }
      if (singleLineCommentCount === 0) firstSingleLineCommentStart = comment.pos;
      lastSingleLineCommentEnd = comment.end;
      singleLineCommentCount += 1;
      continue;
    }

    if (comment.kind === Kind.MultiLineCommentTrivia) {
      const combined = combineAndAddMultipleSingleLineComments();
      if (combined !== undefined) foldingRanges.push(combined);
      foldingRanges.push(createFoldingRangeFromBounds(comment.pos, comment.end, FoldingRangeKindComment, sourceFile, capabilities));
      singleLineCommentCount = 0;
      continue;
    }

    throw new Error(`Unexpected comment kind: ${String(comment.kind)}`);
  }

  const combined = combineAndAddMultipleSingleLineComments();
  if (combined !== undefined) foldingRanges.push(combined);
  return foldingRanges;
}

export function parseRegionDelimiter(lineText: string): RegionDelimiterResult | undefined {
  let text = lineText.replace(/^\s+/u, "");
  if (!text.startsWith("//")) return undefined;
  text = text.slice(2).trim().replace(/\r$/u, "");
  if (!text.startsWith("#")) return undefined;
  text = text.slice(1);

  let isStart = true;
  if (text.startsWith("end")) {
    isStart = false;
    text = text.slice(3);
  }
  if (!text.startsWith("region")) return undefined;
  return { isStart, name: text.slice(6).trim() };
}

export function getOutliningSpanForNode(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  switch (node.kind) {
    case Kind.Block: {
      if (node.parent !== undefined && isFunctionLikeDeclaration(node.parent)) {
        return functionSpan(node.parent, node, sourceFile, capabilities);
      }
      switch (node.parent?.kind) {
        case Kind.DoStatement:
        case Kind.ForInStatement:
        case Kind.ForOfStatement:
        case Kind.ForStatement:
        case Kind.IfStatement:
        case Kind.WhileStatement:
        case Kind.WithStatement:
        case Kind.CatchClause:
          return spanForNode(node, Kind.OpenBraceToken, true, sourceFile, capabilities);
        case Kind.TryStatement: {
          const tryStatement = node.parent;
          if (nodeProperty<Node>(tryStatement, "tryBlock") === node) return spanForNode(node, Kind.OpenBraceToken, true, sourceFile, capabilities);
          if (nodeProperty<Node>(tryStatement, "finallyBlock") === node) {
            return spanForNode(node, Kind.OpenBraceToken, true, sourceFile, capabilities);
          }
          return createFoldingRange(createLspRangeFromNode(node, sourceFile), "", "", capabilities);
        }
        default:
          return createFoldingRange(createLspRangeFromNode(node, sourceFile), "", "", capabilities);
      }
    }
    case Kind.ModuleBlock:
      return spanForNode(node, Kind.OpenBraceToken, true, sourceFile, capabilities);
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
    case Kind.EnumDeclaration:
    case Kind.CaseBlock:
    case Kind.TypeLiteral:
    case Kind.ObjectBindingPattern:
      return spanForNode(node, Kind.OpenBraceToken, true, sourceFile, capabilities);
    case Kind.TupleType:
      return spanForNode(node, Kind.OpenBracketToken, !(node.parent !== undefined && isTupleTypeNode(node.parent)), sourceFile, capabilities);
    case Kind.CaseClause:
    case Kind.DefaultClause:
      return spanForNodeArray(nodeProperty<NodeArray>(node, "statements"), sourceFile, capabilities);
    case Kind.ObjectLiteralExpression:
      return spanForNode(node, Kind.OpenBraceToken, !(node.parent !== undefined && (isArrayLiteralExpression(node.parent) || isCallExpression(node.parent))), sourceFile, capabilities);
    case Kind.ArrayLiteralExpression:
      return spanForNode(node, Kind.OpenBracketToken, !(node.parent !== undefined && (isArrayLiteralExpression(node.parent) || isCallExpression(node.parent))), sourceFile, capabilities);
    case Kind.JsxElement:
    case Kind.JsxFragment:
      return spanForJSXElement(node, sourceFile, capabilities);
    case Kind.JsxSelfClosingElement:
    case Kind.JsxOpeningElement:
      return spanForJSXAttributes(node, sourceFile, capabilities);
    case Kind.TemplateExpression:
    case Kind.NoSubstitutionTemplateLiteral:
      return spanForTemplateLiteral(node, sourceFile, capabilities);
    case Kind.ArrayBindingPattern:
      return spanForNode(node, Kind.OpenBracketToken, !(node.parent !== undefined && node.parent.kind === Kind.BindingElement), sourceFile, capabilities);
    case Kind.ArrowFunction:
      return spanForArrowFunction(node, sourceFile, capabilities);
    case Kind.CallExpression:
      return spanForCallExpression(node, sourceFile, capabilities);
    case Kind.ParenthesizedExpression:
      return spanForParenthesizedExpression(node, sourceFile, capabilities);
    case Kind.NamedImports:
    case Kind.NamedExports:
    case Kind.ImportAttributes:
      return spanForImportExportElements(node, sourceFile, capabilities);
    default:
      return undefined;
  }
}

export function spanForImportExportElements(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  const elements = isNamedImports(node)
    ? node.elements
    : isNamedExports(node)
      ? node.elements
      : isImportAttributes(node)
        ? node.attributes
        : undefined;
  if (elements === undefined || elements.length === 0) return undefined;
  const openToken = findChildOfKind(node, Kind.OpenBraceToken, sourceFile);
  const closeToken = findChildOfKind(node, Kind.CloseBraceToken, sourceFile);
  if (openToken === undefined || closeToken === undefined || positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) return undefined;
  return rangeBetweenTokens(openToken, closeToken, sourceFile, false, capabilities);
}

export function spanForParenthesizedExpression(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  const start = getStartOfNode(node, sourceFile, false);
  if (positionsAreOnSameLine(start, node.end, sourceFile)) return undefined;
  return createFoldingRange(createLspRangeFromBounds(start, node.end, sourceFile), "", "", capabilities);
}

export function spanForCallExpression(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  if (!isCallExpression(node) || node.arguments.length === 0) return undefined;
  const openToken = findChildOfKind(node, Kind.OpenParenToken, sourceFile);
  const closeToken = findChildOfKind(node, Kind.CloseParenToken, sourceFile);
  if (openToken === undefined || closeToken === undefined || positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) return undefined;
  return rangeBetweenTokens(openToken, closeToken, sourceFile, true, capabilities);
}

export function spanForArrowFunction(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  if (!isArrowFunction(node)) return undefined;
  if (isBlock(node.body) || isParenthesizedExpression(node.body) || positionsAreOnSameLine(node.body.pos, node.body.end, sourceFile)) return undefined;
  return createFoldingRange(createLspRangeFromBounds(node.body.pos, node.body.end, sourceFile), "", "", capabilities);
}

export function spanForTemplateLiteral(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  if (isNoSubstitutionTemplateLiteral(node) && node.text.length === 0) return undefined;
  return createFoldingRangeFromBounds(getStartOfNode(node, sourceFile, false), node.end, "", sourceFile, capabilities);
}

export function spanForJSXElement(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  if (isJsxElement(node)) {
    const textRange = createLspRangeFromBounds(getStartOfNode(node.openingElement, sourceFile, false), node.closingElement.end, sourceFile);
    const tagName = getTextOfNode(node.openingElement.tagName);
    return createFoldingRange(textRange, "", `<${tagName}>...</${tagName}>`, capabilities);
  }
  if (isJsxFragment(node)) {
    return createFoldingRange(
      createLspRangeFromBounds(getStartOfNode(node.openingFragment, sourceFile, false), node.closingFragment.end, sourceFile),
      "",
      "<>...</>",
      capabilities,
    );
  }
  return undefined;
}

export function spanForJSXAttributes(
  node: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  const attributes = isJsxSelfClosingElement(node)
    ? node.attributes
    : isJsxOpeningElement(node)
      ? node.attributes
      : undefined;
  if (attributes === undefined || attributes.properties.length === 0) return undefined;
  return createFoldingRangeFromBounds(getStartOfNode(node, sourceFile, false), node.end, "", sourceFile, capabilities);
}

export function spanForNodeArray(
  statements: NodeArray | undefined,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  if (statements !== undefined && statements.length !== 0) {
    return createFoldingRange(createLspRangeFromBounds(statements.pos, statements.end, sourceFile), "", "", capabilities);
  }
  return undefined;
}

export function spanForNode(
  node: Node,
  open: Kind,
  useFullStart: boolean,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  const closeBrace = open === Kind.OpenBraceToken ? Kind.CloseBraceToken : Kind.CloseBracketToken;
  const openToken = findChildOfKind(node, open, sourceFile);
  const closeToken = findChildOfKind(node, closeBrace, sourceFile);
  if (openToken !== undefined && closeToken !== undefined) {
    return rangeBetweenTokens(openToken, closeToken, sourceFile, useFullStart, capabilities);
  }
  return undefined;
}

export function rangeBetweenTokens(
  openToken: Node,
  closeToken: Node,
  sourceFile: SourceFile,
  useFullStart: boolean,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange {
  const textRange = useFullStart
    ? createLspRangeFromBounds(openToken.pos, closeToken.end, sourceFile)
    : createLspRangeFromBounds(getStartOfNode(openToken, sourceFile, false), closeToken.end, sourceFile);
  return createFoldingRange(textRange, "", "", capabilities);
}

export function supportsCollapsedText(capabilities: FoldingClientCapabilities): boolean {
  return capabilities.collapsedText === true;
}

export function createFoldingRange(
  textRange: Range,
  foldingRangeKind: FoldingRangeKind | "",
  collapsedText: string,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange {
  return {
    startLine: textRange.start.line,
    startCharacter: textRange.start.character,
    endLine: textRange.end.line,
    endCharacter: textRange.end.character,
    ...(foldingRangeKind === "" ? {} : { kind: foldingRangeKind }),
    ...(collapsedText !== "" && supportsCollapsedText(capabilities) ? { collapsedText } : {}),
  };
}

export function createFoldingRangeFromBounds(
  pos: number,
  end: number,
  foldingRangeKind: FoldingRangeKind | "",
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange {
  return createFoldingRange(createLspRangeFromBounds(pos, end, sourceFile), foldingRangeKind, "", capabilities);
}

export function functionSpan(
  node: Node,
  body: Node,
  sourceFile: SourceFile,
  capabilities: FoldingClientCapabilities = {},
): FoldingRange | undefined {
  const openToken = tryGetFunctionOpenToken(node, body, sourceFile);
  const closeToken = findChildOfKind(body, Kind.CloseBraceToken, sourceFile);
  if (openToken !== undefined && closeToken !== undefined) {
    return rangeBetweenTokens(openToken, closeToken, sourceFile, true, capabilities);
  }
  return undefined;
}

export function tryGetFunctionOpenToken(node: Node, body: Node, sourceFile: SourceFile): Node | undefined {
  const parameters = nodeArray(node, "parameters");
  if (isNodeArrayMultiLine(parameters, sourceFile)) {
    const openParenToken = findChildOfKind(node, Kind.OpenParenToken, sourceFile);
    if (openParenToken !== undefined) return openParenToken;
  }
  return findChildOfKind(body, Kind.OpenBraceToken, sourceFile);
}

export function isNodeArrayMultiLine(list: readonly Node[], sourceFile: SourceFile): boolean {
  if (list.length === 0) return false;
  return !positionsAreOnSameLine(list[0]!.pos, list[list.length - 1]!.end, sourceFile);
}

function createLspRangeFromNode(node: Node, sourceFile: SourceFile): Range {
  return createLspRangeFromBounds(node.pos, node.end, sourceFile);
}

function createLspRangeFromBounds(start: number, end: number, sourceFile: SourceFile): Range {
  return {
    start: positionToLineAndCharacter(sourceFile, start),
    end: positionToLineAndCharacter(sourceFile, end),
  };
}

function positionToLineAndCharacter(sourceFile: SourceFile, position: number): Position {
  const starts = lineStartsOf(sourceFile);
  let low = 0;
  let high = starts.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const start = starts[middle] ?? 0;
    if (start <= position) low = middle + 1;
    else high = middle - 1;
  }
  const line = Math.max(0, high);
  return { line, character: position - (starts[line] ?? 0) };
}

function lineAndCharacterToPosition(sourceFile: SourceFile, position: Position): number {
  const starts = lineStartsOf(sourceFile);
  return (starts[position.line] ?? sourceFile.text.length) + position.character;
}

function getLineEndOfPosition(sourceFile: SourceFile, position: number): number {
  const lineStarts = lineStartsOf(sourceFile);
  const line = positionToLineAndCharacter(sourceFile, position).line;
  let lastCharacterPosition = line + 1 >= lineStarts.length ? sourceFile.end : lineStarts[line + 1]! - 1;
  if (
    lastCharacterPosition > 0
    && lastCharacterPosition < sourceFile.text.length
    && sourceFile.text.charCodeAt(lastCharacterPosition) === 10
    && sourceFile.text.charCodeAt(lastCharacterPosition - 1) === 13
  ) {
    lastCharacterPosition -= 1;
  }
  return lastCharacterPosition;
}

function lineStartsOf(sourceFile: SourceFile): readonly number[] {
  const lineStarts = (sourceFile as { readonly lineStarts?: readonly number[] }).lineStarts;
  return lineStarts !== undefined && lineStarts.length > 0 ? lineStarts : computeLineStarts(sourceFile.text);
}

function computeLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    }
  }
  return starts;
}

function getLeadingCommentRangesFromPosition(text: string, pos: number): readonly { readonly pos: number; readonly end: number; readonly kind: number }[] {
  const ranges: { readonly pos: number; readonly end: number; readonly kind: number }[] = [];
  let current = Math.max(0, pos);
  while (current < text.length) {
    const ch = text.charCodeAt(current);
    if (isWhiteSpaceOrLineBreak(ch)) {
      current += 1;
      continue;
    }
    const comment = scanCommentAt(text, current);
    if (comment === undefined) break;
    ranges.push({ pos: comment.pos, end: comment.end, kind: comment.kind });
    current = comment.end;
  }
  return ranges;
}

function isWhiteSpaceOrLineBreak(ch: number): boolean {
  return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch === 10 || ch === 13 || ch === 0x2028 || ch === 0x2029;
}

function nodeProperty<T>(node: Node, key: string): T | undefined {
  return (node as unknown as Record<string, T | undefined>)[key];
}

function nodeArray(node: Node, key: string): readonly Node[] {
  return nodeProperty<readonly Node[]>(node, key) ?? [];
}

function regionMutable(range: FoldingRange): { collapsedText?: string } {
  return range as { collapsedText?: string };
}

// Language-service parity map: internal/ls/folding.go
/**
 * Language-service parity map for TS-Go `ls/folding.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

export interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

export interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

export const lsFoldingUpstreamPath = "ls/folding.go";

export const lsFoldingDeclarations: readonly UpstreamDeclaration[] = [
  {"line":18,"kind":"func","name":"ProvideFoldingRange","receiver":"l *LanguageService"},
  {"line":38,"kind":"func","name":"adjustFoldingEnd","receiver":"l *LanguageService"},
  {"line":61,"kind":"func","name":"addNodeOutliningSpans","receiver":"l *LanguageService"},
  {"line":100,"kind":"func","name":"addRegionOutliningSpans","receiver":"l *LanguageService"},
  {"line":145,"kind":"func","name":"visitNode"},
  {"line":237,"kind":"func","name":"addOutliningForLeadingCommentsForNode"},
  {"line":244,"kind":"func","name":"addOutliningForLeadingCommentsForPos"},
  {"line":308,"kind":"type","name":"regionDelimiterResult"},
  {"line":313,"kind":"func","name":"parseRegionDelimiter"},
  {"line":341,"kind":"func","name":"getOutliningSpanForNode"},
  {"line":401,"kind":"func","name":"spanForImportExportElements"},
  {"line":422,"kind":"func","name":"spanForParenthesizedExpression"},
  {"line":431,"kind":"func","name":"spanForCallExpression"},
  {"line":444,"kind":"func","name":"spanForArrowFunction"},
  {"line":453,"kind":"func","name":"spanForTemplateLiteral"},
  {"line":460,"kind":"func","name":"spanForJSXElement"},
  {"line":474,"kind":"func","name":"spanForJSXAttributes"},
  {"line":487,"kind":"func","name":"spanForNodeArray"},
  {"line":494,"kind":"func","name":"spanForNode"},
  {"line":507,"kind":"func","name":"rangeBetweenTokens"},
  {"line":517,"kind":"func","name":"supportsCollapsedText"},
  {"line":521,"kind":"func","name":"createFoldingRange"},
  {"line":539,"kind":"func","name":"createFoldingRangeFromBounds"},
  {"line":543,"kind":"func","name":"functionSpan"},
  {"line":552,"kind":"func","name":"tryGetFunctionOpenToken"},
  {"line":562,"kind":"func","name":"isNodeArrayMultiLine"},
];

export const lsFoldingSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"cmp\""},
  {"line":5,"text":"\t\"context\""},
  {"line":6,"text":"\t\"slices\""},
  {"line":7,"text":"\t\"strings\""},
  {"line":8,"text":"\t\"unicode\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":16,"text":")"},
  {"line":18,"text":"func (l *LanguageService) ProvideFoldingRange(ctx context.Context, documentURI lsproto.DocumentUri) (lsproto.FoldingRangeResponse, error) {"},
  {"line":19,"text":"\t_, sourceFile := l.getProgramAndFile(documentURI)"},
  {"line":20,"text":"\tres := l.addNodeOutliningSpans(ctx, sourceFile)"},
  {"line":21,"text":"\tres = append(res, l.addRegionOutliningSpans(ctx, sourceFile)...)"},
  {"line":22,"text":"\tif lsproto.GetClientCapabilities(ctx).TextDocument.FoldingRange.LineFoldingOnly {"},
  {"line":23,"text":"\t\tres = l.adjustFoldingEnd(res, sourceFile)"},
  {"line":24,"text":"\t}"},
  {"line":25,"text":"\tslices.SortFunc(res, func(a, b *lsproto.FoldingRange) int {"},
  {"line":26,"text":"\t\tif c := cmp.Compare(a.StartLine, b.StartLine); c != 0 {"},
  {"line":27,"text":"\t\t\treturn c"},
  {"line":28,"text":"\t\t}"},
  {"line":29,"text":"\t\treturn cmp.Compare(*a.StartCharacter, *b.StartCharacter)"},
  {"line":30,"text":"\t})"},
  {"line":31,"text":"\treturn lsproto.FoldingRangesOrNull{FoldingRanges: &res}, nil"},
  {"line":32,"text":"}"},
  {"line":38,"text":"func (l *LanguageService) adjustFoldingEnd(ranges []*lsproto.FoldingRange, sourceFile *ast.SourceFile) []*lsproto.FoldingRange {"},
  {"line":39,"text":"\tsourceText := sourceFile.Text()"},
  {"line":40,"text":"\tresult := make([]*lsproto.FoldingRange, 0, len(ranges))"},
  {"line":41,"text":"\tfor _, r := range ranges {"},
  {"line":42,"text":"\t\tif r.EndCharacter != nil && *r.EndCharacter > 0 {"},
  {"line":43,"text":"\t\t\tendOffset := int(l.converters.LineAndCharacterToPosition(sourceFile, lsproto.Position{"},
  {"line":44,"text":"\t\t\t\tLine:      r.EndLine,"},
  {"line":45,"text":"\t\t\t\tCharacter: *r.EndCharacter,"},
  {"line":46,"text":"\t\t\t}))"},
  {"line":47,"text":"\t\t\tif endOffset > 0 && endOffset <= len(sourceText) {"},
  {"line":48,"text":"\t\t\t\tfoldEndChar := sourceText[endOffset-1]"},
  {"line":49,"text":"\t\t\t\tif foldEndChar == '}' || foldEndChar == ']' || foldEndChar == ')' || foldEndChar == '`' || foldEndChar == '>' {"},
  {"line":50,"text":"\t\t\t\t\tif r.EndLine > r.StartLine {"},
  {"line":51,"text":"\t\t\t\t\t\tr.EndLine--"},
  {"line":52,"text":"\t\t\t\t\t}"},
  {"line":53,"text":"\t\t\t\t}"},
  {"line":54,"text":"\t\t\t}"},
  {"line":55,"text":"\t\t}"},
  {"line":56,"text":"\t\tresult = append(result, r)"},
  {"line":57,"text":"\t}"},
  {"line":58,"text":"\treturn result"},
  {"line":59,"text":"}"},
  {"line":61,"text":"func (l *LanguageService) addNodeOutliningSpans(ctx context.Context, sourceFile *ast.SourceFile) []*lsproto.FoldingRange {"},
  {"line":62,"text":"\tdepthRemaining := 40"},
  {"line":63,"text":"\tcurrent := 0"},
  {"line":65,"text":"\tstatements := sourceFile.Statements"},
  {"line":66,"text":"\tn := len(statements.Nodes)"},
  {"line":67,"text":"\tfoldingRange := make([]*lsproto.FoldingRange, 0, 40)"},
  {"line":68,"text":"\tfor current < n {"},
  {"line":69,"text":"\t\tfor current < n && !ast.IsAnyImportSyntax(statements.Nodes[current]) {"},
  {"line":70,"text":"\t\t\tfoldingRange = append(foldingRange, visitNode(ctx, statements.Nodes[current], depthRemaining, sourceFile, l)...)"},
  {"line":71,"text":"\t\t\tcurrent++"},
  {"line":72,"text":"\t\t}"},
  {"line":73,"text":"\t\tif current == n {"},
  {"line":74,"text":"\t\t\tbreak"},
  {"line":75,"text":"\t\t}"},
  {"line":76,"text":"\t\tfirstImport := current"},
  {"line":77,"text":"\t\tfor current < n && ast.IsAnyImportSyntax(statements.Nodes[current]) {"},
  {"line":78,"text":"\t\t\tfoldingRange = append(foldingRange, visitNode(ctx, statements.Nodes[current], depthRemaining, sourceFile, l)...)"},
  {"line":79,"text":"\t\t\tcurrent++"},
  {"line":80,"text":"\t\t}"},
  {"line":81,"text":"\t\tlastImport := current - 1"},
  {"line":82,"text":"\t\tif lastImport != firstImport {"},
  {"line":83,"text":"\t\t\tfoldingRangeKind := lsproto.FoldingRangeKindImports"},
  {"line":84,"text":"\t\t\tfoldingRange = append(foldingRange, createFoldingRangeFromBounds("},
  {"line":85,"text":"\t\t\t\tctx,"},
  {"line":86,"text":"\t\t\t\tastnav.GetStartOfNode(astnav.FindChildOfKind(statements.Nodes[firstImport],"},
  {"line":87,"text":"\t\t\t\t\tast.KindImportKeyword, sourceFile), sourceFile, false /*includeJSDoc*/),"},
  {"line":88,"text":"\t\t\t\tstatements.Nodes[lastImport].End(),"},
  {"line":89,"text":"\t\t\t\tfoldingRangeKind,"},
  {"line":90,"text":"\t\t\t\tsourceFile,"},
  {"line":91,"text":"\t\t\t\tl))"},
  {"line":92,"text":"\t\t}"},
  {"line":93,"text":"\t}"},
  {"line":96,"text":"\tfoldingRange = append(foldingRange, visitNode(ctx, sourceFile.EndOfFileToken, depthRemaining, sourceFile, l)...)"},
  {"line":97,"text":"\treturn foldingRange"},
  {"line":98,"text":"}"},
  {"line":100,"text":"func (l *LanguageService) addRegionOutliningSpans(ctx context.Context, sourceFile *ast.SourceFile) []*lsproto.FoldingRange {"},
  {"line":101,"text":"\tregions := make([]*lsproto.FoldingRange, 0, 40)"},
  {"line":102,"text":"\tout := make([]*lsproto.FoldingRange, 0, 40)"},
  {"line":103,"text":"\tlineStarts := scanner.GetECMALineStarts(sourceFile)"},
  {"line":104,"text":"\tfor _, currentLineStart := range lineStarts {"},
  {"line":105,"text":"\t\tlineEnd := getLineEndOfPosition(sourceFile, int(currentLineStart))"},
  {"line":106,"text":"\t\tlineText := sourceFile.Text()[currentLineStart:lineEnd]"},
  {"line":107,"text":"\t\tresult := parseRegionDelimiter(lineText)"},
  {"line":108,"text":"\t\tif result == nil || isInComment(sourceFile, int(currentLineStart), astnav.GetTokenAtPosition(sourceFile, int(currentLineStart))) != nil {"},
  {"line":109,"text":"\t\t\tcontinue"},
  {"line":110,"text":"\t\t}"},
  {"line":112,"text":"\t\tif result.isStart {"},
  {"line":113,"text":"\t\t\tcommentStart := l.createLspPosition(strings.Index(sourceFile.Text()[currentLineStart:lineEnd], \"//\")+int(currentLineStart), sourceFile)"},
  {"line":114,"text":"\t\t\tfoldingRangeKindRegion := lsproto.FoldingRangeKindRegion"},
  {"line":115,"text":"\t\t\tregion := &lsproto.FoldingRange{"},
  {"line":116,"text":"\t\t\t\tStartLine:      commentStart.Line,"},
  {"line":117,"text":"\t\t\t\tStartCharacter: &commentStart.Character,"},
  {"line":118,"text":"\t\t\t\tKind:           &foldingRangeKindRegion,"},
  {"line":119,"text":"\t\t\t}"},
  {"line":120,"text":"\t\t\tif supportsCollapsedText(ctx) {"},
  {"line":121,"text":"\t\t\t\tcollapsedText := \"#region\""},
  {"line":122,"text":"\t\t\t\tif result.name != \"\" {"},
  {"line":123,"text":"\t\t\t\t\tcollapsedText = result.name"},
  {"line":124,"text":"\t\t\t\t}"},
  {"line":125,"text":"\t\t\t\tregion.CollapsedText = &collapsedText"},
  {"line":126,"text":"\t\t\t}"},
  {"line":130,"text":"\t\t\tregions = append(regions, region)"},
  {"line":131,"text":"\t\t} else {"},
  {"line":132,"text":"\t\t\tif len(regions) > 0 {"},
  {"line":133,"text":"\t\t\t\tregion := regions[len(regions)-1]"},
  {"line":134,"text":"\t\t\t\tregions = regions[:len(regions)-1]"},
  {"line":135,"text":"\t\t\t\tendingPosition := l.createLspPosition(lineEnd, sourceFile)"},
  {"line":136,"text":"\t\t\t\tregion.EndLine = endingPosition.Line"},
  {"line":137,"text":"\t\t\t\tregion.EndCharacter = &endingPosition.Character"},
  {"line":138,"text":"\t\t\t\tout = append(out, region)"},
  {"line":139,"text":"\t\t\t}"},
  {"line":140,"text":"\t\t}"},
  {"line":141,"text":"\t}"},
  {"line":142,"text":"\treturn out"},
  {"line":143,"text":"}"},
  {"line":145,"text":"func visitNode(ctx context.Context, n *ast.Node, depthRemaining int, sourceFile *ast.SourceFile, l *LanguageService) []*lsproto.FoldingRange {"},
  {"line":146,"text":"\tif n.Flags&ast.NodeFlagsReparsed != 0 || depthRemaining == 0 || ctx.Err() != nil {"},
  {"line":147,"text":"\t\treturn nil"},
  {"line":148,"text":"\t}"},
  {"line":149,"text":"\tfoldingRange := make([]*lsproto.FoldingRange, 0, 40)"},
  {"line":150,"text":"\tif (!ast.IsBinaryExpression(n) && ast.IsDeclaration(n)) || ast.IsVariableStatement(n) || ast.IsReturnStatement(n) || ast.IsCallOrNewExpression(n) || n.Kind == ast.KindEndOfFile {"},
  {"line":151,"text":"\t\tfoldingRange = append(foldingRange, addOutliningForLeadingCommentsForNode(ctx, n, sourceFile, l)...)"},
  {"line":152,"text":"\t}"},
  {"line":153,"text":"\tif ast.IsFunctionLike(n) && n.Parent != nil && ast.IsBinaryExpression(n.Parent) && n.Parent.AsBinaryExpression().Left != nil && ast.IsPropertyAccessExpression(n.Parent.AsBinaryExpression().Left) {"},
  {"line":154,"text":"\t\tfoldingRange = append(foldingRange, addOutliningForLeadingCommentsForNode(ctx, n.Parent.AsBinaryExpression().Left, sourceFile, l)...)"},
  {"line":155,"text":"\t}"},
  {"line":156,"text":"\tif ast.IsBlock(n) {"},
  {"line":157,"text":"\t\tstatements := n.AsBlock().Statements"},
  {"line":158,"text":"\t\tif statements != nil {"},
  {"line":159,"text":"\t\t\tfoldingRange = append(foldingRange, addOutliningForLeadingCommentsForPos(ctx, statements.End(), sourceFile, l)...)"},
  {"line":160,"text":"\t\t}"},
  {"line":161,"text":"\t}"},
  {"line":162,"text":"\tif ast.IsModuleBlock(n) {"},
  {"line":163,"text":"\t\tstatements := n.AsModuleBlock().Statements"},
  {"line":164,"text":"\t\tif statements != nil {"},
  {"line":165,"text":"\t\t\tfoldingRange = append(foldingRange, addOutliningForLeadingCommentsForPos(ctx, statements.End(), sourceFile, l)...)"},
  {"line":166,"text":"\t\t}"},
  {"line":167,"text":"\t}"},
  {"line":168,"text":"\tif ast.IsClassLike(n) || ast.IsInterfaceDeclaration(n) {"},
  {"line":169,"text":"\t\tvar members *ast.NodeList"},
  {"line":170,"text":"\t\tif ast.IsClassDeclaration(n) {"},
  {"line":171,"text":"\t\t\tmembers = n.AsClassDeclaration().Members"},
  {"line":172,"text":"\t\t} else if ast.IsClassExpression(n) {"},
  {"line":173,"text":"\t\t\tmembers = n.AsClassExpression().Members"},
  {"line":174,"text":"\t\t} else {"},
  {"line":175,"text":"\t\t\tmembers = n.AsInterfaceDeclaration().Members"},
  {"line":176,"text":"\t\t}"},
  {"line":177,"text":"\t\tif members != nil {"},
  {"line":178,"text":"\t\t\tfoldingRange = append(foldingRange, addOutliningForLeadingCommentsForPos(ctx, members.End(), sourceFile, l)...)"},
  {"line":179,"text":"\t\t}"},
  {"line":180,"text":"\t}"},
  {"line":182,"text":"\tspan := getOutliningSpanForNode(ctx, n, sourceFile, l)"},
  {"line":183,"text":"\tif span != nil {"},
  {"line":184,"text":"\t\tfoldingRange = append(foldingRange, span)"},
  {"line":185,"text":"\t}"},
  {"line":187,"text":"\tdepthRemaining--"},
  {"line":188,"text":"\tif ast.IsCallExpression(n) {"},
  {"line":189,"text":"\t\tdepthRemaining++"},
  {"line":190,"text":"\t\texpressionNodes := visitNode(ctx, n.Expression(), depthRemaining, sourceFile, l)"},
  {"line":191,"text":"\t\tif expressionNodes != nil {"},
  {"line":192,"text":"\t\t\tfoldingRange = append(foldingRange, expressionNodes...)"},
  {"line":193,"text":"\t\t}"},
  {"line":194,"text":"\t\tdepthRemaining--"},
  {"line":195,"text":"\t\tfor _, arg := range n.Arguments() {"},
  {"line":196,"text":"\t\t\tif arg != nil {"},
  {"line":197,"text":"\t\t\t\tfoldingRange = append(foldingRange, visitNode(ctx, arg, depthRemaining, sourceFile, l)...)"},
  {"line":198,"text":"\t\t\t}"},
  {"line":199,"text":"\t\t}"},
  {"line":200,"text":"\t\ttypeArguments := n.TypeArguments()"},
  {"line":201,"text":"\t\tfor _, typeArg := range typeArguments {"},
  {"line":202,"text":"\t\t\tif typeArg != nil {"},
  {"line":203,"text":"\t\t\t\tfoldingRange = append(foldingRange, visitNode(ctx, typeArg, depthRemaining, sourceFile, l)...)"},
  {"line":204,"text":"\t\t\t}"},
  {"line":205,"text":"\t\t}"},
  {"line":206,"text":"\t} else if ast.IsIfStatement(n) && n.AsIfStatement().ElseStatement != nil && ast.IsIfStatement(n.AsIfStatement().ElseStatement) {"},
  {"line":208,"text":"\t\tifStatement := n.AsIfStatement()"},
  {"line":209,"text":"\t\texpressionNodes := visitNode(ctx, n.Expression(), depthRemaining, sourceFile, l)"},
  {"line":210,"text":"\t\tif expressionNodes != nil {"},
  {"line":211,"text":"\t\t\tfoldingRange = append(foldingRange, expressionNodes...)"},
  {"line":212,"text":"\t\t}"},
  {"line":213,"text":"\t\tthenNode := visitNode(ctx, ifStatement.ThenStatement, depthRemaining, sourceFile, l)"},
  {"line":214,"text":"\t\tif thenNode != nil {"},
  {"line":215,"text":"\t\t\tfoldingRange = append(foldingRange, thenNode...)"},
  {"line":216,"text":"\t\t}"},
  {"line":217,"text":"\t\tdepthRemaining++"},
  {"line":218,"text":"\t\telseNode := visitNode(ctx, ifStatement.ElseStatement, depthRemaining, sourceFile, l)"},
  {"line":219,"text":"\t\tif elseNode != nil {"},
  {"line":220,"text":"\t\t\tfoldingRange = append(foldingRange, elseNode...)"},
  {"line":221,"text":"\t\t}"},
  {"line":222,"text":"\t\tdepthRemaining--"},
  {"line":223,"text":"\t} else {"},
  {"line":224,"text":"\t\tvisit := func(node *ast.Node) bool {"},
  {"line":225,"text":"\t\t\tchildNode := visitNode(ctx, node, depthRemaining, sourceFile, l)"},
  {"line":226,"text":"\t\t\tif childNode != nil {"},
  {"line":227,"text":"\t\t\t\tfoldingRange = append(foldingRange, childNode...)"},
  {"line":228,"text":"\t\t\t}"},
  {"line":229,"text":"\t\t\treturn false"},
  {"line":230,"text":"\t\t}"},
  {"line":231,"text":"\t\tn.ForEachChild(visit)"},
  {"line":232,"text":"\t}"},
  {"line":233,"text":"\tdepthRemaining++"},
  {"line":234,"text":"\treturn foldingRange"},
  {"line":235,"text":"}"},
  {"line":237,"text":"func addOutliningForLeadingCommentsForNode(ctx context.Context, n *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) []*lsproto.FoldingRange {"},
  {"line":238,"text":"\tif ast.IsJsxText(n) {"},
  {"line":239,"text":"\t\treturn nil"},
  {"line":240,"text":"\t}"},
  {"line":241,"text":"\treturn addOutliningForLeadingCommentsForPos(ctx, n.Pos(), sourceFile, l)"},
  {"line":242,"text":"}"},
  {"line":244,"text":"func addOutliningForLeadingCommentsForPos(ctx context.Context, pos int, sourceFile *ast.SourceFile, l *LanguageService) []*lsproto.FoldingRange {"},
  {"line":245,"text":"\tp := &printer.EmitContext{}"},
  {"line":246,"text":"\tfoldingRange := make([]*lsproto.FoldingRange, 0, 40)"},
  {"line":247,"text":"\tfirstSingleLineCommentStart := -1"},
  {"line":248,"text":"\tlastSingleLineCommentEnd := -1"},
  {"line":249,"text":"\tsingleLineCommentCount := 0"},
  {"line":250,"text":"\tfoldingRangeKindComment := lsproto.FoldingRangeKindComment"},
  {"line":252,"text":"\tcombineAndAddMultipleSingleLineComments := func() *lsproto.FoldingRange {"},
  {"line":254,"text":"\t\tif singleLineCommentCount > 1 {"},
  {"line":255,"text":"\t\t\treturn createFoldingRangeFromBounds(ctx, firstSingleLineCommentStart, lastSingleLineCommentEnd, foldingRangeKindComment, sourceFile, l)"},
  {"line":256,"text":"\t\t}"},
  {"line":257,"text":"\t\treturn nil"},
  {"line":258,"text":"\t}"},
  {"line":260,"text":"\tsourceText := sourceFile.Text()"},
  {"line":261,"text":"\tfor comment := range scanner.GetLeadingCommentRanges(&printer.NewNodeFactory(p).NodeFactory, sourceText, pos) {"},
  {"line":262,"text":"\t\tcommentPos := comment.Pos()"},
  {"line":263,"text":"\t\tcommentEnd := comment.End()"},
  {"line":265,"text":"\t\tif ctx.Err() != nil {"},
  {"line":266,"text":"\t\t\treturn nil"},
  {"line":267,"text":"\t\t}"},
  {"line":268,"text":"\t\tswitch comment.Kind {"},
  {"line":269,"text":"\t\tcase ast.KindSingleLineCommentTrivia:"},
  {"line":271,"text":"\t\t\tcommentText := sourceText[commentPos:commentEnd]"},
  {"line":272,"text":"\t\t\tif parseRegionDelimiter(commentText) != nil {"},
  {"line":273,"text":"\t\t\t\tcomments := combineAndAddMultipleSingleLineComments()"},
  {"line":274,"text":"\t\t\t\tif comments != nil {"},
  {"line":275,"text":"\t\t\t\t\tfoldingRange = append(foldingRange, comments)"},
  {"line":276,"text":"\t\t\t\t}"},
  {"line":277,"text":"\t\t\t\tsingleLineCommentCount = 0"},
  {"line":278,"text":"\t\t\t\tbreak"},
  {"line":279,"text":"\t\t\t}"},
  {"line":283,"text":"\t\t\tif singleLineCommentCount == 0 {"},
  {"line":284,"text":"\t\t\t\tfirstSingleLineCommentStart = commentPos"},
  {"line":285,"text":"\t\t\t}"},
  {"line":286,"text":"\t\t\tlastSingleLineCommentEnd = commentEnd"},
  {"line":287,"text":"\t\t\tsingleLineCommentCount++"},
  {"line":288,"text":"\t\t\tbreak"},
  {"line":289,"text":"\t\tcase ast.KindMultiLineCommentTrivia:"},
  {"line":290,"text":"\t\t\tcomments := combineAndAddMultipleSingleLineComments()"},
  {"line":291,"text":"\t\t\tif comments != nil {"},
  {"line":292,"text":"\t\t\t\tfoldingRange = append(foldingRange, comments)"},
  {"line":293,"text":"\t\t\t}"},
  {"line":294,"text":"\t\t\tfoldingRange = append(foldingRange, createFoldingRangeFromBounds(ctx, commentPos, commentEnd, foldingRangeKindComment, sourceFile, l))"},
  {"line":295,"text":"\t\t\tsingleLineCommentCount = 0"},
  {"line":296,"text":"\t\t\tbreak"},
  {"line":297,"text":"\t\tdefault:"},
  {"line":298,"text":"\t\t\tdebug.AssertNever(comment.Kind)"},
  {"line":299,"text":"\t\t}"},
  {"line":300,"text":"\t}"},
  {"line":301,"text":"\taddedComments := combineAndAddMultipleSingleLineComments()"},
  {"line":302,"text":"\tif addedComments != nil {"},
  {"line":303,"text":"\t\tfoldingRange = append(foldingRange, addedComments)"},
  {"line":304,"text":"\t}"},
  {"line":305,"text":"\treturn foldingRange"},
  {"line":306,"text":"}"},
  {"line":308,"text":"type regionDelimiterResult struct {"},
  {"line":309,"text":"\tisStart bool"},
  {"line":310,"text":"\tname    string"},
  {"line":311,"text":"}"},
  {"line":313,"text":"func parseRegionDelimiter(lineText string) *regionDelimiterResult {"},
  {"line":316,"text":"\tlineText = strings.TrimLeftFunc(lineText, unicode.IsSpace)"},
  {"line":317,"text":"\tif !strings.HasPrefix(lineText, \"//\") {"},
  {"line":318,"text":"\t\treturn nil"},
  {"line":319,"text":"\t}"},
  {"line":320,"text":"\tlineText = strings.TrimSpace(lineText[2:])"},
  {"line":321,"text":"\tlineText = strings.TrimSuffix(lineText, \"\\r\")"},
  {"line":322,"text":"\tif !strings.HasPrefix(lineText, \"#\") {"},
  {"line":323,"text":"\t\treturn nil"},
  {"line":324,"text":"\t}"},
  {"line":325,"text":"\tlineText = lineText[1:]"},
  {"line":326,"text":"\tisStart := true"},
  {"line":327,"text":"\tif strings.HasPrefix(lineText, \"end\") {"},
  {"line":328,"text":"\t\tisStart = false"},
  {"line":329,"text":"\t\tlineText = lineText[3:]"},
  {"line":330,"text":"\t}"},
  {"line":331,"text":"\tif !strings.HasPrefix(lineText, \"region\") {"},
  {"line":332,"text":"\t\treturn nil"},
  {"line":333,"text":"\t}"},
  {"line":334,"text":"\tlineText = lineText[6:]"},
  {"line":335,"text":"\treturn &regionDelimiterResult{"},
  {"line":336,"text":"\t\tisStart: isStart,"},
  {"line":337,"text":"\t\tname:    strings.TrimSpace(lineText),"},
  {"line":338,"text":"\t}"},
  {"line":339,"text":"}"},
  {"line":341,"text":"func getOutliningSpanForNode(ctx context.Context, n *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":342,"text":"\tswitch n.Kind {"},
  {"line":343,"text":"\tcase ast.KindBlock:"},
  {"line":344,"text":"\t\tif ast.IsFunctionLike(n.Parent) {"},
  {"line":345,"text":"\t\t\treturn functionSpan(ctx, n.Parent, n, sourceFile, l)"},
  {"line":346,"text":"\t\t}"},
  {"line":350,"text":"\t\tswitch n.Parent.Kind {"},
  {"line":351,"text":"\t\tcase ast.KindDoStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindForStatement, ast.KindIfStatement, ast.KindWhileStatement, ast.KindWithStatement, ast.KindCatchClause:"},
  {"line":352,"text":"\t\t\treturn spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)"},
  {"line":353,"text":"\t\tcase ast.KindTryStatement:"},
  {"line":355,"text":"\t\t\ttryStatement := n.Parent.AsTryStatement()"},
  {"line":356,"text":"\t\t\tif tryStatement.TryBlock == n {"},
  {"line":357,"text":"\t\t\t\treturn spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)"},
  {"line":358,"text":"\t\t\t} else if tryStatement.FinallyBlock == n {"},
  {"line":359,"text":"\t\t\t\tif span := spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l); span != nil {"},
  {"line":360,"text":"\t\t\t\t\treturn span"},
  {"line":361,"text":"\t\t\t\t}"},
  {"line":362,"text":"\t\t\t}"},
  {"line":363,"text":"\t\t\tfallthrough"},
  {"line":364,"text":"\t\tdefault:"},
  {"line":367,"text":"\t\t\treturn createFoldingRange(ctx, l.createLspRangeFromNode(n, sourceFile), \"\", \"\")"},
  {"line":368,"text":"\t\t}"},
  {"line":369,"text":"\tcase ast.KindModuleBlock:"},
  {"line":370,"text":"\t\treturn spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)"},
  {"line":371,"text":"\tcase ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration, ast.KindCaseBlock, ast.KindTypeLiteral, ast.KindObjectBindingPattern:"},
  {"line":372,"text":"\t\treturn spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)"},
  {"line":373,"text":"\tcase ast.KindTupleType:"},
  {"line":374,"text":"\t\treturn spanForNode(ctx, n, ast.KindOpenBracketToken, !ast.IsTupleTypeNode(n.Parent) /*useFullStart*/, sourceFile, l)"},
  {"line":375,"text":"\tcase ast.KindCaseClause, ast.KindDefaultClause:"},
  {"line":376,"text":"\t\treturn spanForNodeArray(ctx, n.AsCaseOrDefaultClause().Statements, sourceFile, l)"},
  {"line":377,"text":"\tcase ast.KindObjectLiteralExpression:"},
  {"line":378,"text":"\t\treturn spanForNode(ctx, n, ast.KindOpenBraceToken, !ast.IsArrayLiteralExpression(n.Parent) && !ast.IsCallExpression(n.Parent) /*useFullStart*/, sourceFile, l)"},
  {"line":379,"text":"\tcase ast.KindArrayLiteralExpression:"},
  {"line":380,"text":"\t\treturn spanForNode(ctx, n, ast.KindOpenBracketToken, !ast.IsArrayLiteralExpression(n.Parent) && !ast.IsCallExpression(n.Parent) /*useFullStart*/, sourceFile, l)"},
  {"line":381,"text":"\tcase ast.KindJsxElement, ast.KindJsxFragment:"},
  {"line":382,"text":"\t\treturn spanForJSXElement(ctx, n, sourceFile, l)"},
  {"line":383,"text":"\tcase ast.KindJsxSelfClosingElement, ast.KindJsxOpeningElement:"},
  {"line":384,"text":"\t\treturn spanForJSXAttributes(ctx, n, sourceFile, l)"},
  {"line":385,"text":"\tcase ast.KindTemplateExpression, ast.KindNoSubstitutionTemplateLiteral:"},
  {"line":386,"text":"\t\treturn spanForTemplateLiteral(ctx, n, sourceFile, l)"},
  {"line":387,"text":"\tcase ast.KindArrayBindingPattern:"},
  {"line":388,"text":"\t\treturn spanForNode(ctx, n, ast.KindOpenBracketToken, !ast.IsBindingElement(n.Parent) /*useFullStart*/, sourceFile, l)"},
  {"line":389,"text":"\tcase ast.KindArrowFunction:"},
  {"line":390,"text":"\t\treturn spanForArrowFunction(ctx, n, sourceFile, l)"},
  {"line":391,"text":"\tcase ast.KindCallExpression:"},
  {"line":392,"text":"\t\treturn spanForCallExpression(ctx, n, sourceFile, l)"},
  {"line":393,"text":"\tcase ast.KindParenthesizedExpression:"},
  {"line":394,"text":"\t\treturn spanForParenthesizedExpression(ctx, n, sourceFile, l)"},
  {"line":395,"text":"\tcase ast.KindNamedImports, ast.KindNamedExports, ast.KindImportAttributes:"},
  {"line":396,"text":"\t\treturn spanForImportExportElements(ctx, n, sourceFile, l)"},
  {"line":397,"text":"\t}"},
  {"line":398,"text":"\treturn nil"},
  {"line":399,"text":"}"},
  {"line":401,"text":"func spanForImportExportElements(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":402,"text":"\tvar elements *ast.NodeList"},
  {"line":403,"text":"\tswitch node.Kind {"},
  {"line":404,"text":"\tcase ast.KindNamedImports:"},
  {"line":405,"text":"\t\telements = node.AsNamedImports().Elements"},
  {"line":406,"text":"\tcase ast.KindNamedExports:"},
  {"line":407,"text":"\t\telements = node.AsNamedExports().Elements"},
  {"line":408,"text":"\tcase ast.KindImportAttributes:"},
  {"line":409,"text":"\t\telements = node.AsImportAttributes().Attributes"},
  {"line":410,"text":"\t}"},
  {"line":411,"text":"\tif elements == nil || len(elements.Nodes) == 0 {"},
  {"line":412,"text":"\t\treturn nil"},
  {"line":413,"text":"\t}"},
  {"line":414,"text":"\topenToken := astnav.FindChildOfKind(node, ast.KindOpenBraceToken, sourceFile)"},
  {"line":415,"text":"\tcloseToken := astnav.FindChildOfKind(node, ast.KindCloseBraceToken, sourceFile)"},
  {"line":416,"text":"\tif openToken == nil || closeToken == nil || printer.PositionsAreOnSameLine(openToken.Pos(), closeToken.Pos(), sourceFile) {"},
  {"line":417,"text":"\t\treturn nil"},
  {"line":418,"text":"\t}"},
  {"line":419,"text":"\treturn rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, false /*useFullStart*/, l)"},
  {"line":420,"text":"}"},
  {"line":422,"text":"func spanForParenthesizedExpression(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":423,"text":"\tstart := astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/)"},
  {"line":424,"text":"\tif printer.PositionsAreOnSameLine(start, node.End(), sourceFile) {"},
  {"line":425,"text":"\t\treturn nil"},
  {"line":426,"text":"\t}"},
  {"line":427,"text":"\ttextRange := l.createLspRangeFromBounds(start, node.End(), sourceFile)"},
  {"line":428,"text":"\treturn createFoldingRange(ctx, textRange, \"\", \"\")"},
  {"line":429,"text":"}"},
  {"line":431,"text":"func spanForCallExpression(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":432,"text":"\tif node.AsCallExpression().Arguments == nil || len(node.AsCallExpression().Arguments.Nodes) == 0 {"},
  {"line":433,"text":"\t\treturn nil"},
  {"line":434,"text":"\t}"},
  {"line":435,"text":"\topenToken := astnav.FindChildOfKind(node, ast.KindOpenParenToken, sourceFile)"},
  {"line":436,"text":"\tcloseToken := astnav.FindChildOfKind(node, ast.KindCloseParenToken, sourceFile)"},
  {"line":437,"text":"\tif openToken == nil || closeToken == nil || printer.PositionsAreOnSameLine(openToken.Pos(), closeToken.Pos(), sourceFile) {"},
  {"line":438,"text":"\t\treturn nil"},
  {"line":439,"text":"\t}"},
  {"line":441,"text":"\treturn rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, true /*useFullStart*/, l)"},
  {"line":442,"text":"}"},
  {"line":444,"text":"func spanForArrowFunction(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":445,"text":"\tarrowFunctionNode := node.AsArrowFunction()"},
  {"line":446,"text":"\tif ast.IsBlock(arrowFunctionNode.Body) || ast.IsParenthesizedExpression(arrowFunctionNode.Body) || printer.PositionsAreOnSameLine(arrowFunctionNode.Body.Pos(), arrowFunctionNode.Body.End(), sourceFile) {"},
  {"line":447,"text":"\t\treturn nil"},
  {"line":448,"text":"\t}"},
  {"line":449,"text":"\ttextRange := l.createLspRangeFromBounds(arrowFunctionNode.Body.Pos(), arrowFunctionNode.Body.End(), sourceFile)"},
  {"line":450,"text":"\treturn createFoldingRange(ctx, textRange, \"\", \"\")"},
  {"line":451,"text":"}"},
  {"line":453,"text":"func spanForTemplateLiteral(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":454,"text":"\tif node.Kind == ast.KindNoSubstitutionTemplateLiteral && len(node.Text()) == 0 {"},
  {"line":455,"text":"\t\treturn nil"},
  {"line":456,"text":"\t}"},
  {"line":457,"text":"\treturn createFoldingRangeFromBounds(ctx, astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/), node.End(), \"\", sourceFile, l)"},
  {"line":458,"text":"}"},
  {"line":460,"text":"func spanForJSXElement(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":461,"text":"\tif node.Kind == ast.KindJsxElement {"},
  {"line":462,"text":"\t\tjsxElement := node.AsJsxElement()"},
  {"line":463,"text":"\t\ttextRange := l.createLspRangeFromBounds(astnav.GetStartOfNode(jsxElement.OpeningElement, sourceFile, false /*includeJSDoc*/), jsxElement.ClosingElement.End(), sourceFile)"},
  {"line":464,"text":"\t\ttagName := scanner.GetTextOfNode(jsxElement.OpeningElement.TagName())"},
  {"line":465,"text":"\t\tbannerText := \"<\" + tagName + \">...</\" + tagName + \">\""},
  {"line":466,"text":"\t\treturn createFoldingRange(ctx, textRange, \"\", bannerText)"},
  {"line":467,"text":"\t}"},
  {"line":469,"text":"\tjsxFragment := node.AsJsxFragment()"},
  {"line":470,"text":"\ttextRange := l.createLspRangeFromBounds(astnav.GetStartOfNode(jsxFragment.OpeningFragment, sourceFile, false /*includeJSDoc*/), jsxFragment.ClosingFragment.End(), sourceFile)"},
  {"line":471,"text":"\treturn createFoldingRange(ctx, textRange, \"\", \"<>...</>\")"},
  {"line":472,"text":"}"},
  {"line":474,"text":"func spanForJSXAttributes(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":475,"text":"\tvar attributes *ast.JsxAttributesNode"},
  {"line":476,"text":"\tif node.Kind == ast.KindJsxSelfClosingElement {"},
  {"line":477,"text":"\t\tattributes = node.AsJsxSelfClosingElement().Attributes"},
  {"line":478,"text":"\t} else {"},
  {"line":479,"text":"\t\tattributes = node.AsJsxOpeningElement().Attributes"},
  {"line":480,"text":"\t}"},
  {"line":481,"text":"\tif len(attributes.Properties()) == 0 {"},
  {"line":482,"text":"\t\treturn nil"},
  {"line":483,"text":"\t}"},
  {"line":484,"text":"\treturn createFoldingRangeFromBounds(ctx, astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/), node.End(), \"\", sourceFile, l)"},
  {"line":485,"text":"}"},
  {"line":487,"text":"func spanForNodeArray(ctx context.Context, statements *ast.NodeList, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":488,"text":"\tif statements != nil && len(statements.Nodes) != 0 {"},
  {"line":489,"text":"\t\treturn createFoldingRange(ctx, l.createLspRangeFromBounds(statements.Pos(), statements.End(), sourceFile), \"\", \"\")"},
  {"line":490,"text":"\t}"},
  {"line":491,"text":"\treturn nil"},
  {"line":492,"text":"}"},
  {"line":494,"text":"func spanForNode(ctx context.Context, node *ast.Node, open ast.Kind, useFullStart bool, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":495,"text":"\tcloseBrace := ast.KindCloseBraceToken"},
  {"line":496,"text":"\tif open != ast.KindOpenBraceToken {"},
  {"line":497,"text":"\t\tcloseBrace = ast.KindCloseBracketToken"},
  {"line":498,"text":"\t}"},
  {"line":499,"text":"\topenToken := astnav.FindChildOfKind(node, open, sourceFile)"},
  {"line":500,"text":"\tcloseToken := astnav.FindChildOfKind(node, closeBrace, sourceFile)"},
  {"line":501,"text":"\tif openToken != nil && closeToken != nil {"},
  {"line":502,"text":"\t\treturn rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, useFullStart, l)"},
  {"line":503,"text":"\t}"},
  {"line":504,"text":"\treturn nil"},
  {"line":505,"text":"}"},
  {"line":507,"text":"func rangeBetweenTokens(ctx context.Context, openToken *ast.Node, closeToken *ast.Node, sourceFile *ast.SourceFile, useFullStart bool, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":508,"text":"\tvar textRange lsproto.Range"},
  {"line":509,"text":"\tif useFullStart {"},
  {"line":510,"text":"\t\ttextRange = l.createLspRangeFromBounds(openToken.Pos(), closeToken.End(), sourceFile)"},
  {"line":511,"text":"\t} else {"},
  {"line":512,"text":"\t\ttextRange = l.createLspRangeFromBounds(astnav.GetStartOfNode(openToken, sourceFile, false /*includeJSDoc*/), closeToken.End(), sourceFile)"},
  {"line":513,"text":"\t}"},
  {"line":514,"text":"\treturn createFoldingRange(ctx, textRange, \"\", \"\")"},
  {"line":515,"text":"}"},
  {"line":517,"text":"func supportsCollapsedText(ctx context.Context) bool {"},
  {"line":518,"text":"\treturn lsproto.GetClientCapabilities(ctx).TextDocument.FoldingRange.FoldingRange.CollapsedText"},
  {"line":519,"text":"}"},
  {"line":521,"text":"func createFoldingRange(ctx context.Context, textRange lsproto.Range, foldingRangeKind lsproto.FoldingRangeKind, collapsedText string) *lsproto.FoldingRange {"},
  {"line":522,"text":"\tvar kind *lsproto.FoldingRangeKind"},
  {"line":523,"text":"\tif foldingRangeKind != \"\" {"},
  {"line":524,"text":"\t\tkind = &foldingRangeKind"},
  {"line":525,"text":"\t}"},
  {"line":526,"text":"\tresult := &lsproto.FoldingRange{"},
  {"line":527,"text":"\t\tStartLine:      textRange.Start.Line,"},
  {"line":528,"text":"\t\tStartCharacter: &textRange.Start.Character,"},
  {"line":529,"text":"\t\tEndLine:        textRange.End.Line,"},
  {"line":530,"text":"\t\tEndCharacter:   &textRange.End.Character,"},
  {"line":531,"text":"\t\tKind:           kind,"},
  {"line":532,"text":"\t}"},
  {"line":533,"text":"\tif collapsedText != \"\" && supportsCollapsedText(ctx) {"},
  {"line":534,"text":"\t\tresult.CollapsedText = &collapsedText"},
  {"line":535,"text":"\t}"},
  {"line":536,"text":"\treturn result"},
  {"line":537,"text":"}"},
  {"line":539,"text":"func createFoldingRangeFromBounds(ctx context.Context, pos int, end int, foldingRangeKind lsproto.FoldingRangeKind, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":540,"text":"\treturn createFoldingRange(ctx, l.createLspRangeFromBounds(pos, end, sourceFile), foldingRangeKind, \"\")"},
  {"line":541,"text":"}"},
  {"line":543,"text":"func functionSpan(ctx context.Context, node *ast.Node, body *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {"},
  {"line":544,"text":"\topenToken := tryGetFunctionOpenToken(node, body, sourceFile)"},
  {"line":545,"text":"\tcloseToken := astnav.FindChildOfKind(body, ast.KindCloseBraceToken, sourceFile)"},
  {"line":546,"text":"\tif openToken != nil && closeToken != nil {"},
  {"line":547,"text":"\t\treturn rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, true /*useFullStart*/, l)"},
  {"line":548,"text":"\t}"},
  {"line":549,"text":"\treturn nil"},
  {"line":550,"text":"}"},
  {"line":552,"text":"func tryGetFunctionOpenToken(node *ast.SignatureDeclaration, body *ast.Node, sourceFile *ast.SourceFile) *ast.Node {"},
  {"line":553,"text":"\tif isNodeArrayMultiLine(node.Parameters(), sourceFile) {"},
  {"line":554,"text":"\t\topenParenToken := astnav.FindChildOfKind(node, ast.KindOpenParenToken, sourceFile)"},
  {"line":555,"text":"\t\tif openParenToken != nil {"},
  {"line":556,"text":"\t\t\treturn openParenToken"},
  {"line":557,"text":"\t\t}"},
  {"line":558,"text":"\t}"},
  {"line":559,"text":"\treturn astnav.FindChildOfKind(body, ast.KindOpenBraceToken, sourceFile)"},
  {"line":560,"text":"}"},
  {"line":562,"text":"func isNodeArrayMultiLine(list []*ast.Node, sourceFile *ast.SourceFile) bool {"},
  {"line":563,"text":"\tif len(list) == 0 {"},
  {"line":564,"text":"\t\treturn false"},
  {"line":565,"text":"\t}"},
  {"line":566,"text":"\treturn !printer.PositionsAreOnSameLine(list[0].Pos(), list[len(list)-1].End(), sourceFile)"},
  {"line":567,"text":"}"},
];

export function findLsFoldingDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsFoldingDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsFoldingDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsFoldingDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsFoldingLineText(line: number): string | undefined {
  return lsFoldingSourceLines.find((entry) => entry.line === line)?.text;
}
