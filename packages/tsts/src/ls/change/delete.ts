/**
 * Delete helpers for change tracker.
 *
 * Porting anchor for TS-Go `internal/ls/change/delete.go`.
 */

import type { Position, Range } from "../../lsp/lsproto/index.js";
import { comparePositions } from "../../lsp/lsproto/index.js";
import { Kind, type Node, type SourceFile } from "../../ast/index.js";
import type { Tracker } from "./tracker.js";
import { LeadingTriviaOption, TrailingTriviaOption } from "./tracker.js";

export interface DeleteOptions {
  readonly leadingTrivia: LeadingTriviaOption;
  readonly trailingTrivia: TrailingTriviaOption;
}

export const defaultDeleteOptions: DeleteOptions = {
  leadingTrivia: LeadingTriviaOption.IncludeAll,
  trailingTrivia: TrailingTriviaOption.Include,
};

export function deleteRange(tracker: Tracker, fileName: string, range: Range): void {
  tracker.removeRange(fileName, range);
}

export function deletePositionRange(tracker: Tracker, fileName: string, start: Position, end: Position): void {
  tracker.removeRange(fileName, normalizeRange({ start, end }));
}

export function normalizeRange(range: Range): Range {
  return comparePositions(range.start, range.end) <= 0 ? range : { start: range.end, end: range.start };
}

export function rangeWithTrivia(range: Range, leadingStart: Position | undefined, trailingEnd: Position | undefined, options: DeleteOptions = defaultDeleteOptions): Range {
  return {
    start: options.leadingTrivia === LeadingTriviaOption.IncludeAll && leadingStart !== undefined ? leadingStart : range.start,
    end: options.trailingTrivia === TrailingTriviaOption.Include && trailingEnd !== undefined ? trailingEnd : range.end,
  };
}

export function deleteDeclaration(
  tracker: Tracker,
  deletedNodesInLists: Map<Node, boolean>,
  sourceFile: SourceFile,
  node: Node,
): void {
  switch (node.kind) {
    case Kind.Parameter: {
      const oldFunction = node.parent;
      if (oldFunction.kind === Kind.ArrowFunction && nodeArray(oldFunction, "parameters").length === 1 && findChildOfKind(oldFunction, Kind.OpenParenToken) === undefined) {
        tracker.replaceRangeWithText(sourceFile.fileName, tracker.getAdjustedRange(sourceFile, node, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include), "()");
      } else {
        deleteNodeInList(tracker, deletedNodesInLists, sourceFile, node);
      }
      return;
    }

    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ImportEqualsDeclaration: {
      const firstImport = sourceFile.imports[0]?.parent;
      const isFirstImport = firstImport === node || sourceFile.statements.find(isAnyImportSyntax) === node;
      const leadingTrivia = isFirstImport
        ? LeadingTriviaOption.Exclude
        : hasJSDocNodes(node)
          ? LeadingTriviaOption.JSDoc
          : LeadingTriviaOption.StartLine;
      deleteNode(tracker, sourceFile, node, leadingTrivia, TrailingTriviaOption.Include);
      return;
    }

    case Kind.BindingElement: {
      const pattern = node.parent;
      const elements = nodeArray(pattern, "elements");
      const preserveComma = pattern.kind === Kind.ArrayBindingPattern && node !== elements[elements.length - 1];
      if (preserveComma) deleteNode(tracker, sourceFile, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Exclude);
      else deleteNodeInList(tracker, deletedNodesInLists, sourceFile, node);
      return;
    }

    case Kind.VariableDeclaration:
      deleteVariableDeclaration(tracker, deletedNodesInLists, sourceFile, node);
      return;

    case Kind.TypeParameter:
      deleteNodeInList(tracker, deletedNodesInLists, sourceFile, node);
      return;

    case Kind.ImportSpecifier: {
      const namedImports = node.parent;
      if (nodeArray(namedImports, "elements").length === 1) deleteImportBinding(tracker, sourceFile, namedImports);
      else deleteNodeInList(tracker, deletedNodesInLists, sourceFile, node);
      return;
    }

    case Kind.NamespaceImport:
      deleteImportBinding(tracker, sourceFile, node);
      return;

    case Kind.SemicolonToken:
      deleteNode(tracker, sourceFile, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Exclude);
      return;

    case Kind.TypeKeyword:
    case Kind.FunctionKeyword:
      deleteNode(tracker, sourceFile, node, LeadingTriviaOption.Exclude, TrailingTriviaOption.Include);
      return;

    case Kind.ClassDeclaration:
    case Kind.FunctionDeclaration:
      deleteNode(
        tracker,
        sourceFile,
        node,
        hasJSDocNodes(node) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine,
        TrailingTriviaOption.Include,
      );
      return;

    default:
      if (node.parent === undefined) {
        deleteNode(tracker, sourceFile, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
      } else if (node.parent.kind === Kind.ImportClause && nodeName(node.parent) === node) {
        deleteDefaultImport(tracker, sourceFile, node.parent);
      } else if (node.parent.kind === Kind.CallExpression && nodeArray(node.parent, "arguments").includes(node)) {
        deleteNodeInList(tracker, deletedNodesInLists, sourceFile, node);
      } else {
        deleteNode(tracker, sourceFile, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
      }
  }
}

export function deleteDefaultImport(tracker: Tracker, sourceFile: SourceFile, importClause: Node): void {
  if (property<Node>(importClause, "namedBindings") === undefined) {
    deleteNode(tracker, sourceFile, importClause.parent, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
    return;
  }
  const name = nodeName(importClause);
  if (name === undefined) return;
  const nextToken = getTokenAtPosition(sourceFile, name.end);
  if (nextToken !== undefined && nextToken.kind === Kind.CommaToken) {
    const end = skipTrivia(sourceFile.text, nextToken.end, false);
    tracker.replaceRangeWithText(sourceFile.fileName, rangeFromBounds(sourceFile, name.pos, end), "");
  } else {
    deleteNode(tracker, sourceFile, name, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
  }
}

export function deleteImportBinding(tracker: Tracker, sourceFile: SourceFile, node: Node): void {
  const importClause = node.parent;
  if (nodeName(importClause) !== undefined) {
    const previousToken = getTokenAtPosition(sourceFile, node.pos - 1);
    if (previousToken === undefined) throw new Error("previousToken should not be undefined");
    tracker.replaceRangeWithText(sourceFile.fileName, rangeFromBounds(sourceFile, previousToken.pos, node.end), "");
    return;
  }
  const importDecl = findAncestor(node, ancestor => ancestor.kind === Kind.ImportDeclaration || ancestor.kind === Kind.JSImportDeclaration);
  if (importDecl === undefined) throw new Error("import declaration should not be undefined");
  deleteNode(tracker, sourceFile, importDecl, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
}

export function deleteVariableDeclaration(
  tracker: Tracker,
  deletedNodesInLists: Map<Node, boolean>,
  sourceFile: SourceFile,
  node: Node,
): void {
  const parent = node.parent;
  if (parent.kind === Kind.CatchClause) {
    const openParen = findChildOfKind(parent, Kind.OpenParenToken);
    const closeParen = findChildOfKind(parent, Kind.CloseParenToken);
    if (openParen === undefined || closeParen === undefined) throw new Error("catch clause should have parens");
    tracker.deleteNodeRange(sourceFile, openParen, closeParen, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
    return;
  }

  if (nodeArray(parent, "declarations").length !== 1) {
    deleteNodeInList(tracker, deletedNodesInLists, sourceFile, node);
    return;
  }

  const grandparent = parent.parent;
  switch (grandparent.kind) {
    case Kind.ForOfStatement:
    case Kind.ForInStatement:
      tracker.replaceRangeWithText(sourceFile.fileName, tracker.getAdjustedRange(sourceFile, node, node), "{}");
      return;
    case Kind.ForStatement:
      deleteNode(tracker, sourceFile, parent, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
      return;
    case Kind.VariableStatement:
      deleteNode(
        tracker,
        sourceFile,
        grandparent,
        hasJSDocNodes(grandparent) ? LeadingTriviaOption.JSDoc : LeadingTriviaOption.StartLine,
        TrailingTriviaOption.Include,
      );
      return;
    default:
      throw new Error(`Unexpected grandparent kind: ${String(grandparent.kind)}`);
  }
}

export function deleteNode(
  tracker: Tracker,
  sourceFile: SourceFile,
  node: Node,
  leadingTrivia: LeadingTriviaOption,
  trailingTrivia: TrailingTriviaOption,
): void {
  tracker.replaceRangeWithText(sourceFile.fileName, tracker.getAdjustedRange(sourceFile, node, node, leadingTrivia, trailingTrivia), "");
}

export function deleteNodeInList(
  tracker: Tracker,
  deletedNodesInLists: Map<Node, boolean>,
  sourceFile: SourceFile,
  node: Node,
): void {
  const containingList = containingNodeList(node);
  if (containingList === undefined) throw new Error("containingList should not be undefined");
  const index = containingList.indexOf(node);
  if (index < 0) throw new Error("node should be in containing list");
  if (containingList.length === 1) {
    deleteNode(tracker, sourceFile, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.Include);
    return;
  }
  if (deletedNodesInLists.get(node) === true) throw new Error("Deleting a node twice");
  deletedNodesInLists.set(node, true);
  const startPos = startPositionToDeleteNodeInList(tracker, sourceFile, node);
  const endPos = index === containingList.length - 1
    ? node.end
    : endPositionToDeleteNodeInList(tracker, sourceFile, node, index > 0 ? containingList[index - 1] : undefined, containingList[index + 1]!);
  tracker.replaceRangeWithText(sourceFile.fileName, rangeFromBounds(sourceFile, startPos, endPos), "");
}

export function startPositionToDeleteNodeInList(tracker: Tracker, sourceFile: SourceFile, node: Node): number {
  const start = tracker.getAdjustedRange(sourceFile, node, node, LeadingTriviaOption.IncludeAll, TrailingTriviaOption.None).start;
  return skipTrivia(sourceFile.text, offsetOfPosition(sourceFile, start), false);
}

export function endPositionToDeleteNodeInList(
  tracker: Tracker,
  sourceFile: SourceFile,
  node: Node,
  prevNode: Node | undefined,
  nextNode: Node,
): number {
  const end = startPositionToDeleteNodeInList(tracker, sourceFile, nextNode);
  if (prevNode === undefined || positionsAreOnSameLine(node.end, end, sourceFile)) return end;
  return end;
}

export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile): boolean {
  return lineStartForPosition(sourceFile, pos1) === lineStartForPosition(sourceFile, pos2);
}

function isAnyImportSyntax(node: Node): boolean {
  return node.kind === Kind.ImportDeclaration || node.kind === Kind.JSImportDeclaration || node.kind === Kind.ImportEqualsDeclaration;
}

function hasJSDocNodes(node: Node): boolean {
  return ((node as { readonly jsDoc?: readonly Node[] }).jsDoc?.length ?? 0) > 0;
}

function property<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}

function nodeName(node: Node | undefined): Node | undefined {
  return property<Node>(node, "name");
}

function nodeArray(node: Node | undefined, key: string): readonly Node[] {
  return property<readonly Node[]>(node, key) ?? [];
}

function findAncestor(node: Node | undefined, predicate: (node: Node) => boolean): Node | undefined {
  let current = node;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = current.parent;
  }
  return undefined;
}

function findChildOfKind(node: Node, kind: Kind): Node | undefined {
  let found: Node | undefined;
  node.forEachChild(child => {
    if (child.kind === kind) {
      found = child;
      return true;
    }
    return undefined;
  });
  return found;
}

function containingNodeList(node: Node): readonly Node[] | undefined {
  const parent = node.parent;
  for (const value of Object.values(parent as unknown as Record<string, unknown>)) {
    if (Array.isArray(value) && value.includes(node)) return value.filter(isNode);
  }
  return undefined;
}

function getTokenAtPosition(sourceFile: SourceFile, position: number): Node | undefined {
  let result: Node | undefined;
  const visit = (node: Node): boolean | undefined => {
    if (node.pos <= position && position <= node.end) {
      result = node;
      node.forEachChild(visit);
    }
    return undefined;
  };
  sourceFile.forEachChild(visit);
  return result;
}

function rangeFromBounds(sourceFile: SourceFile, start: number, end: number): Range {
  return {
    start: positionToLineAndCharacter(sourceFile, start),
    end: positionToLineAndCharacter(sourceFile, end),
  };
}

function positionToLineAndCharacter(sourceFile: SourceFile, position: number): Position {
  const starts = computeLineStarts(sourceFile.text);
  let line = 0;
  for (let index = 0; index < starts.length; index += 1) {
    if (starts[index]! > position) break;
    line = index;
  }
  return { line, character: position - starts[line]! };
}

function offsetOfPosition(sourceFile: SourceFile, position: Position): number {
  const starts = computeLineStarts(sourceFile.text);
  return (starts[position.line] ?? sourceFile.text.length) + position.character;
}

function lineStartForPosition(sourceFile: SourceFile, position: number): number {
  const starts = computeLineStarts(sourceFile.text);
  let result = 0;
  for (const start of starts) {
    if (start > position) break;
    result = start;
  }
  return result;
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

function skipTrivia(text: string, start: number, stopAfterLineBreak: boolean): number {
  let position = start;
  while (position < text.length) {
    const ch = text.charCodeAt(position);
    if (ch === 32 || ch === 9 || ch === 11 || ch === 12) {
      position += 1;
      continue;
    }
    if ((ch === 10 || ch === 13) && !stopAfterLineBreak) {
      position += ch === 13 && text.charCodeAt(position + 1) === 10 ? 2 : 1;
      continue;
    }
    break;
  }
  return position;
}

function isNode(value: unknown): value is Node {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}
