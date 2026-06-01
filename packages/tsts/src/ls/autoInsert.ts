import {
  Kind,
  NodeFlags,
  isIdentifier,
  isJsxElement,
  isJsxFragment,
  isJsxNamespacedName,
  isJsxOpeningElement,
  isJsxOpeningFragment,
  isJsxText,
  isPropertyAccessExpression,
  tagNamesAreEquivalent,
  type JsxElement,
  type JsxFragment,
  type JsxNamespacedName,
  type JsxTagNameExpression,
  type Node,
  type PropertyAccessExpression,
  type SourceFile,
} from "../ast/index.js";
import { findPrecedingToken } from "../astnav/index.js";
import {
  InsertTextFormatSnippet,
  type Position,
  type VsOnAutoInsertParams,
  type VsOnAutoInsertResponse,
} from "../lsp/lsproto/index.js";

export interface AutoInsertSourceFile extends SourceFile {
  readonly lineStarts: readonly number[];
}

export interface AutoInsertConverters {
  lineAndCharacterToPosition(file: AutoInsertSourceFile, position: Position): number;
}

export interface AutoInsertLanguageService {
  readonly converters: AutoInsertConverters;
  getProgramAndFile(uri: string): readonly [unknown, AutoInsertSourceFile];
}

export function provideOnAutoInsert(
  service: AutoInsertLanguageService,
  params: VsOnAutoInsertParams,
): VsOnAutoInsertResponse {
  if (params._vs_ch !== ">") {
    return {};
  }

  const [, sourceFile] = service.getProgramAndFile(params._vs_textDocument.uri);
  const position = service.converters.lineAndCharacterToPosition(sourceFile, params._vs_position);
  const token = findPrecedingToken(sourceFile, position);
  if (token === undefined) {
    return {};
  }

  const closingText = autoInsertClosingText(token);
  if (closingText === "") {
    return {};
  }

  return {
    vsOnAutoInsertResponseItem: {
      _vs_textEditFormat: InsertTextFormatSnippet,
      _vs_textEdit: {
        range: { start: params._vs_position, end: params._vs_position },
        newText: `$0${escapeSnippetText(closingText)}`,
      },
    },
  };
}

export function autoInsertClosingText(token: Node): string {
  let element: Node | undefined;
  const tokenParent = nodeParent(token);
  if (token.kind === Kind.GreaterThanToken && tokenParent !== undefined && isJsxOpeningElement(tokenParent)) {
    element = nodeParent(tokenParent);
  } else if (isJsxText(token) && tokenParent !== undefined && isJsxElement(tokenParent)) {
    element = tokenParent;
  }

  if (element !== undefined && isJsxElement(element) && isUnclosedTag(element)) {
    return `</${jsxTagNameText(element.openingElement.tagName)}>`;
  }

  let fragment: Node | undefined;
  if (token.kind === Kind.GreaterThanToken && tokenParent !== undefined && isJsxOpeningFragment(tokenParent)) {
    fragment = nodeParent(tokenParent);
  } else if (isJsxText(token) && tokenParent !== undefined && isJsxFragment(tokenParent)) {
    fragment = tokenParent;
  }

  if (fragment !== undefined && isJsxFragment(fragment) && isUnclosedFragment(fragment)) {
    return "</>";
  }

  return "";
}

export function isUnclosedTag(node: JsxElement): boolean {
  const openingElement = node.openingElement;
  const closingElement = node.closingElement;
  if (!tagNamesAreEquivalent(openingElement.tagName, closingElement.tagName)) {
    return true;
  }

  const parent = nodeParent(node);
  if (parent !== undefined && isJsxElement(parent)) {
    return tagNamesAreEquivalent(openingElement.tagName, parent.openingElement.tagName) && isUnclosedTag(parent);
  }

  return false;
}

export function isUnclosedFragment(node: JsxFragment): boolean {
  const closingFragment = node.closingFragment;
  if ((closingFragment.flags & NodeFlags.ThisNodeHasError) !== 0) {
    return true;
  }

  const parent = nodeParent(node);
  if (parent !== undefined && isJsxFragment(parent) && isUnclosedFragment(parent)) {
    return true;
  }

  return false;
}

export function escapeSnippetText(text: string): string {
  return text.replaceAll("$", "\\$");
}

function jsxTagNameText(node: JsxTagNameExpression): string {
  if (isIdentifier(node)) {
    return node.text;
  }
  if (node.kind === Kind.ThisKeyword) {
    return "this";
  }
  if (isJsxNamespacedName(node)) {
    return jsxNamespacedNameText(node);
  }
  if (isPropertyAccessExpression(node)) {
    return propertyAccessNameText(node);
  }
  throw new Error("Unhandled case in jsxTagNameText");
}

function jsxNamespacedNameText(node: JsxNamespacedName): string {
  return `${node.namespace.text}:${node.name.text}`;
}

function propertyAccessNameText(node: PropertyAccessExpression): string {
  return `${jsxTagNameText(node.expression as JsxTagNameExpression)}.${node.name.text}`;
}

function nodeParent(node: Node): Node | undefined {
  return node.parent === undefined ? undefined : node.parent;
}
