import {
  Kind,
  isBlock,
  isFunctionLikeDeclaration,
  isJSDocSignature,
  isJSDocTypeExpression,
  isJSDocTypeLiteral,
  isNoSubstitutionTemplateLiteral,
  isStringLiteral,
  isTemplateExpression,
  isTemplateHead,
  isTemplateSpan,
  isTemplateTail,
  isVariableDeclaration,
  isVariableDeclarationList,
  isVariableStatement,
  type Node,
  type NodeArray,
  type SourceFile,
  type TemplateSpan,
} from "../ast/index.js";
import { getStartOfNode } from "../astnav/index.js";
import { TextRange } from "../core/index.js";
import type {
  Position,
  SelectionRange,
  SelectionRangeParams,
  SelectionRangeResponse,
  TextDocumentIdentifier,
} from "../lsp/lsproto/index.js";
import { scanTrailingCommentRanges } from "../printer/comments.js";

export interface SelectionRangeConverters {
  lineAndCharacterToPosition(file: SourceFile, position: Position): number;
  positionToLineAndCharacter(file: SourceFile, position: number): Position;
  toLSPRange(file: SourceFile, range: TextRange): SelectionRange["range"];
}

export interface SelectionRangeLanguageService {
  readonly converters: SelectionRangeConverters;
  getProgramAndFile(uri: TextDocumentIdentifier["uri"]): readonly [unknown, SourceFile | undefined];
}

export function provideSelectionRanges(
  service: SelectionRangeLanguageService,
  params: SelectionRangeParams,
): SelectionRangeResponse {
  const [, sourceFile] = service.getProgramAndFile(params.textDocument.uri);
  if (sourceFile === undefined) {
    return {};
  }

  const results: SelectionRange[] = [];
  for (const position of params.positions) {
    const pos = service.converters.lineAndCharacterToPosition(sourceFile, position);
    const selectionRange = getSmartSelectionRange(service, sourceFile, pos);
    if (selectionRange !== undefined) {
      results.push(selectionRange);
    }
  }

  return { selectionRanges: results };
}

export function getSmartSelectionRange(
  service: Pick<SelectionRangeLanguageService, "converters">,
  sourceFile: SourceFile,
  pos: number,
): SelectionRange | undefined {
  const nodeContainsPosition = (node: Node | undefined): boolean => {
    if (node === undefined) {
      return false;
    }
    const start = getStartOfNode(node, sourceFile, true);
    return start <= pos && pos < node.end;
  };

  const pushSelectionRange = (
    current: SelectionRange | undefined,
    start: number,
    end: number,
  ): SelectionRange | undefined => {
    if (start === end) {
      return current;
    }
    if (!(start <= pos && pos <= end)) {
      return current;
    }

    const range = service.converters.toLSPRange(sourceFile, new TextRange(start, end));
    if (current !== undefined && rangesEqual(current.range, range)) {
      return current;
    }

    if (current === undefined) {
      return { range };
    }
    return { range, parent: current };
  };

  const pushSelectionCommentRange = (
    current: SelectionRange | undefined,
    start: number,
    end: number,
  ): SelectionRange | undefined => {
    let next = pushSelectionRange(current, start, end);
    let commentPos = start;
    const text = sourceFile.text;
    while (commentPos < end && commentPos < text.length && text[commentPos] === "/") {
      commentPos += 1;
    }
    next = pushSelectionRange(next, commentPos, end);
    return next;
  };

  const positionsAreOnSameLine = (pos1: number, pos2: number): boolean => {
    if (pos1 === pos2) {
      return true;
    }
    const position1 = service.converters.positionToLineAndCharacter(sourceFile, pos1);
    const position2 = service.converters.positionToLineAndCharacter(sourceFile, pos2);
    return position1.line === position2.line;
  };

  const shouldSkipNode = (node: Node, parent: Node | undefined): boolean => {
    if (isBlock(node)) {
      return true;
    }
    if (isTemplateSpan(node) || isTemplateHead(node) || isTemplateTail(node)) {
      return true;
    }
    if (parent !== undefined && isVariableDeclarationList(node) && isVariableStatement(parent)) {
      return true;
    }
    if (parent !== undefined && isVariableDeclaration(node) && isVariableDeclarationList(parent)) {
      if (parent.declarations.length === 1) {
        return true;
      }
    }
    return isJSDocTypeExpression(node) || isJSDocSignature(node) || isJSDocTypeLiteral(node);
  };

  let result: SelectionRange | undefined = {
    range: service.converters.toLSPRange(sourceFile, new TextRange(sourceFile.pos, sourceFile.end)),
  };

  let current: Node | undefined = sourceFile;
  while (current !== undefined) {
    let next: Node | undefined;
    const parent = current;

    const visit = (node: Node): boolean | undefined => {
      if (next !== undefined) {
        return undefined;
      }

      const foundComment = scanTrailingCommentRanges(sourceFile.text, node.end)[0];
      if (foundComment !== undefined && foundComment.kind === Kind.SingleLineCommentTrivia) {
        result = pushSelectionCommentRange(result, foundComment.pos, foundComment.end);
      }

      if (nodeContainsPosition(node)) {
        if (isBlock(node) && isFunctionLikeDeclaration(parent)) {
          const start = getStartOfNode(node, sourceFile, false);
          if (!positionsAreOnSameLine(start, node.end)) {
            result = pushSelectionRange(result, start, node.end);
          }
        }

        if (isTemplateSpan(parent)) {
          result = pushTemplateSpanSelectionRange(result, parent, node, sourceFile, pos, pushSelectionRange);
        }

        if (!shouldSkipNode(node, parent)) {
          const start = getStartOfNode(node, sourceFile, false);
          const end = node.end;
          result = pushSelectionRange(result, start, end);

          if (isStringLiteral(node) || isTemplateExpression(node) || isNoSubstitutionTemplateLiteral(node)) {
            if (start + 1 < end - 1) {
              result = pushSelectionRange(result, start + 1, end - 1);
            }
          }
        }

        next = node;
      }
      return undefined;
    };

    const visitNodes = (nodes: NodeArray<Node>): boolean | undefined => {
      if (nodes.length > 0) {
        const shouldSkipList = isVariableDeclarationList(parent) || isTemplateExpression(parent);
        if (!shouldSkipList) {
          const start = getStartOfNode(nodes[0]!, sourceFile, false);
          const end = nodes[nodes.length - 1]!.end;
          if (start <= pos && pos < end) {
            result = pushSelectionRange(result, start, end);
          }
        }
      }
      return undefined;
    };

    for (const jsdoc of current.jsDoc ?? []) {
      visit(jsdoc);
    }
    current.forEachChild(visit, visitNodes);
    current = next;
  }

  return result;
}

function pushTemplateSpanSelectionRange(
  result: SelectionRange | undefined,
  templateSpan: TemplateSpan,
  node: Node,
  sourceFile: SourceFile,
  pos: number,
  pushSelectionRange: (
    current: SelectionRange | undefined,
    start: number,
    end: number,
  ) => SelectionRange | undefined,
): SelectionRange | undefined {
  const literal = templateSpan.literal;
  const spanStart = node.pos - 2;
  const spanEnd = getStartOfNode(literal, sourceFile, false) + 1;
  if (spanStart >= 0 && spanEnd <= sourceFile.text.length && spanStart < spanEnd && spanStart <= pos && pos <= spanEnd) {
    return pushSelectionRange(result, spanStart, spanEnd);
  }
  return result;
}

function rangesEqual(left: SelectionRange["range"], right: SelectionRange["range"]): boolean {
  return left.start.line === right.start.line &&
    left.start.character === right.start.character &&
    left.end.line === right.end.line &&
    left.end.character === right.end.character;
}
