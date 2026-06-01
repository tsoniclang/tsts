import {
  Kind,
  NodeFlags,
  findAncestor,
  isJsxClosingElement,
  isJsxElement,
  isJsxFragment,
  isJsxOpeningElement,
  tagNamesAreEquivalent,
  type JsxClosingElement,
  type JsxElement,
  type JsxFragment,
  type JsxOpeningElement,
  type Node,
  type SourceFile,
} from "../ast/index.js";
import { findPrecedingToken, getStartOfNode } from "../astnav/index.js";
import type {
  LinkedEditingRangeParams,
  LinkedEditingRangeResponse,
  Position,
  Range,
} from "../lsp/lsproto/index.js";

export const jsxTagWordPattern = "[a-zA-Z0-9:\\-\\._$]*";

export interface LinkedEditingSourceFile extends SourceFile {
  readonly lineStarts: readonly number[];
}

export interface LinkedEditingConverters {
  lineAndCharacterToPosition(file: LinkedEditingSourceFile, position: Position): number;
  positionToLineAndCharacter(file: LinkedEditingSourceFile, position: number): Position;
}

export interface LinkedEditingLanguageService {
  readonly converters: LinkedEditingConverters;
  getProgramAndFile(uri: string): readonly [unknown, LinkedEditingSourceFile];
}

export function provideLinkedEditingRange(
  service: LinkedEditingLanguageService,
  params: LinkedEditingRangeParams,
): LinkedEditingRangeResponse {
  const [, sourceFile] = service.getProgramAndFile(params.textDocument.uri);
  const position = service.converters.lineAndCharacterToPosition(sourceFile, params.position);
  const token = findPrecedingToken(sourceFile, position);

  if (token === undefined || nodeParent(token)?.kind === Kind.SourceFile) {
    return {};
  }

  return linkedEditingRangeForToken(sourceFile, token, position, service.converters);
}

export function linkedEditingRangeForToken(
  sourceFile: LinkedEditingSourceFile,
  token: Node,
  position: number,
  converters: LinkedEditingConverters,
): LinkedEditingRangeResponse {
  const tokenParent = nodeParent(token);
  const tokenGrandparent = tokenParent === undefined ? undefined : nodeParent(tokenParent);

  if (tokenGrandparent !== undefined && isJsxFragment(tokenGrandparent)) {
    return linkedEditingRangeForFragment(sourceFile, tokenGrandparent, position, converters);
  }

  const tag = findAncestor(tokenParent, (node) => isJsxOpeningElement(node) || isJsxClosingElement(node));
  if (tag === undefined || !(isJsxOpeningElement(tag) || isJsxClosingElement(tag))) {
    return {};
  }

  const element = nodeParent(tag);
  if (element === undefined || !isJsxElement(element)) {
    return {};
  }

  return linkedEditingRangeForElement(sourceFile, element, position, converters);
}

function linkedEditingRangeForFragment(
  sourceFile: LinkedEditingSourceFile,
  fragment: JsxFragment,
  position: number,
  converters: LinkedEditingConverters,
): LinkedEditingRangeResponse {
  const openFragment = fragment.openingFragment;
  const closeFragment = fragment.closingFragment;
  if (
    (openFragment.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0
    || (closeFragment.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0
  ) {
    return {};
  }

  const openPos = getStartOfNode(openFragment, sourceFile, false) + "<".length;
  const closePos = getStartOfNode(closeFragment, sourceFile, false) + "</".length;
  if (position !== openPos && position !== closePos) {
    return {};
  }

  const openLineChar = converters.positionToLineAndCharacter(sourceFile, openPos);
  const closeLineChar = converters.positionToLineAndCharacter(sourceFile, closePos);
  return linkedEditingRanges([
    { start: openLineChar, end: openLineChar },
    { start: closeLineChar, end: closeLineChar },
  ]);
}

function linkedEditingRangeForElement(
  sourceFile: LinkedEditingSourceFile,
  jsxElement: JsxElement,
  position: number,
  converters: LinkedEditingConverters,
): LinkedEditingRangeResponse {
  const openTag = jsxElement.openingElement;
  const closeTag = jsxElement.closingElement;

  const openTagNameStart = getStartOfNode(openTag.tagName, sourceFile, false);
  const openTagNameEnd = openTag.tagName.end;
  const closeTagNameStart = getStartOfNode(closeTag.tagName, sourceFile, false);
  const closeTagNameEnd = closeTag.tagName.end;

  if (!tagsAreWellFormed(sourceFile, openTag, closeTag, openTagNameStart, openTagNameEnd, closeTagNameStart, closeTagNameEnd)) {
    return {};
  }
  if (!positionIsWithinLinkedTagNames(position, openTagNameStart, openTagNameEnd, closeTagNameStart, closeTagNameEnd)) {
    return {};
  }
  if (!tagNamesAreEquivalent(openTag.tagName, closeTag.tagName)) {
    return {};
  }

  return linkedEditingRanges([
    {
      start: converters.positionToLineAndCharacter(sourceFile, openTagNameStart),
      end: converters.positionToLineAndCharacter(sourceFile, openTagNameEnd),
    },
    {
      start: converters.positionToLineAndCharacter(sourceFile, closeTagNameStart),
      end: converters.positionToLineAndCharacter(sourceFile, closeTagNameEnd),
    },
  ]);
}

function tagsAreWellFormed(
  sourceFile: LinkedEditingSourceFile,
  openTag: JsxOpeningElement,
  closeTag: JsxClosingElement,
  openTagNameStart: number,
  openTagNameEnd: number,
  closeTagNameStart: number,
  closeTagNameEnd: number,
): boolean {
  return openTagNameStart !== getStartOfNode(openTag, sourceFile, false)
    && closeTagNameStart !== getStartOfNode(closeTag, sourceFile, false)
    && openTagNameEnd !== openTag.end
    && closeTagNameEnd !== closeTag.end;
}

function positionIsWithinLinkedTagNames(
  position: number,
  openTagNameStart: number,
  openTagNameEnd: number,
  closeTagNameStart: number,
  closeTagNameEnd: number,
): boolean {
  return (openTagNameStart <= position && position <= openTagNameEnd)
    || (closeTagNameStart <= position && position <= closeTagNameEnd);
}

function linkedEditingRanges(ranges: readonly Range[]): LinkedEditingRangeResponse {
  return {
    linkedEditingRanges: {
      ranges,
      wordPattern: jsxTagWordPattern,
    },
  };
}

function nodeParent(node: Node): Node | undefined {
  return node.parent === undefined ? undefined : node.parent;
}
