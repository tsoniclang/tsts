/**
 * Text-change tracker.
 *
 * Port of TS-Go `internal/ls/change/tracker.go`, focusing on the core range
 * edit accumulator and deterministic edit ordering.
 */

import type { Position, Range, TextEdit } from "../../lsp/lsproto/index.js";
import { comparePositions } from "../../lsp/lsproto/index.js";
import { Kind, type Node, type SourceFile } from "../../ast/index.js";
import { nodeToStr } from "../../printer/printer.js";

export interface NodeOptions {
  readonly prefix?: string;
  readonly suffix?: string;
  readonly indentation?: number;
  readonly delta?: number;
  readonly leadingTriviaOption?: LeadingTriviaOption;
  readonly trailingTriviaOption?: TrailingTriviaOption;
  readonly joiner?: string;
}

export const enum LeadingTriviaOption {
  None = 0,
  Exclude = 1,
  IncludeAll = 2,
  JSDoc = 3,
  StartLine = 4,
}

export const enum TrailingTriviaOption {
  None = 0,
  Exclude = 1,
  ExcludeWhitespace = 2,
  Include = 3,
}

export const enum TrackerEditKind {
  Text = 1,
  Remove = 2,
  ReplaceWithSingleNode = 3,
  ReplaceWithMultipleNodes = 4,
}

export interface TrackerEdit {
  readonly kind: TrackerEditKind;
  readonly range: Range;
  readonly newText: string;
  readonly options: NodeOptions;
  readonly node?: Node;
  readonly nodes?: readonly Node[];
}

export interface DeletedNode {
  readonly sourceFile: SourceFile;
  readonly node: Node;
}

export interface NodesInsertedAtStartState {
  readonly node: Node;
  readonly sourceFile: SourceFile;
}

export class Tracker {
  private readonly changes = new Map<string, TrackerEdit[]>();
  private readonly deletedNodes: DeletedNode[] = [];
  private readonly nodesWithInsertionsAtStart = new Map<Node, NodesInsertedAtStartState>();
  readonly newLine: string;

  constructor(newLine = "\n") {
    this.newLine = newLine;
  }

  getChanges(): ReadonlyMap<string, readonly TextEdit[]> {
    this.finishDeleteDeclarations();
    this.finishNodesWithInsertionsAtStart();
    const result = new Map<string, readonly TextEdit[]>();
    for (const [fileName, changes] of this.changes) {
      const sorted = sortTrackerEdits(changes);
      assertNoOverlappingChanges(sorted);
      const textEdits = sorted.map(change => ({
        range: change.range,
        newText: computeNewText(change),
      }));
      if (textEdits.length > 0) result.set(fileName, textEdits);
    }
    return result;
  }

  replaceRangeWithText(fileName: string, range: Range, text: string): void {
    this.add(fileName, { kind: TrackerEditKind.Text, range, newText: text, options: {} });
  }

  replaceNode(sourceFile: SourceFile, oldNode: Node, newNode: Node, options: NodeOptions | undefined = undefined): void {
    const actualOptions = options ?? {
      leadingTriviaOption: LeadingTriviaOption.Exclude,
      trailingTriviaOption: TrailingTriviaOption.Exclude,
    };
    this.replaceRange(sourceFile, this.getAdjustedRange(sourceFile, oldNode, oldNode, actualOptions.leadingTriviaOption, actualOptions.trailingTriviaOption), newNode, actualOptions);
  }

  replaceNodeWithNodes(sourceFile: SourceFile, oldNode: Node, newNodes: readonly Node[], options: NodeOptions | undefined = undefined): void {
    const actualOptions = options ?? {
      leadingTriviaOption: LeadingTriviaOption.Exclude,
      trailingTriviaOption: TrailingTriviaOption.Exclude,
    };
    this.replaceRangeWithNodes(sourceFile, this.getAdjustedRange(sourceFile, oldNode, oldNode, actualOptions.leadingTriviaOption, actualOptions.trailingTriviaOption), newNodes, actualOptions);
  }

  replaceRange(sourceFile: SourceFile, range: Range, newNode: Node, options: NodeOptions): void {
    this.add(sourceFile.fileName, { kind: TrackerEditKind.ReplaceWithSingleNode, range, newText: "", options, node: newNode });
  }

  replaceRangeWithNodes(sourceFile: SourceFile, range: Range, newNodes: readonly Node[], options: NodeOptions): void {
    if (newNodes.length === 1) {
      this.replaceRange(sourceFile, range, newNodes[0]!, options);
      return;
    }
    this.add(sourceFile.fileName, { kind: TrackerEditKind.ReplaceWithMultipleNodes, range, newText: "", options, nodes: newNodes });
  }

  insertNodeAt(sourceFile: SourceFile, position: number, newNode: Node, options: NodeOptions): void {
    const lspPosition = positionToLineAndCharacter(sourceFile, position);
    this.replaceRange(sourceFile, { start: lspPosition, end: lspPosition }, newNode, options);
  }

  insertNodesAt(sourceFile: SourceFile, position: number, newNodes: readonly Node[], options: NodeOptions): void {
    const lspPosition = positionToLineAndCharacter(sourceFile, position);
    this.replaceRangeWithNodes(sourceFile, { start: lspPosition, end: lspPosition }, newNodes, options);
  }

  insertNodeAfter(sourceFile: SourceFile, after: Node, newNode: Node): void {
    this.insertNodeAt(sourceFile, this.endPosForInsertNodeAfter(sourceFile, after, newNode), newNode, this.getInsertNodeAfterOptions(sourceFile, after));
  }

  insertNodesAfter(sourceFile: SourceFile, after: Node, newNodes: readonly Node[]): void {
    if (newNodes.length === 0) return;
    this.insertNodesAt(sourceFile, this.endPosForInsertNodeAfter(sourceFile, after, newNodes[0]!), newNodes, this.getInsertNodeAfterOptions(sourceFile, after));
  }

  insertNodeBefore(sourceFile: SourceFile, before: Node, newNode: Node, blankLineBetween: boolean, leadingTriviaOption: LeadingTriviaOption): void {
    this.insertNodeAt(sourceFile, this.getAdjustedStartPosition(sourceFile, before, leadingTriviaOption), newNode, this.getOptionsForInsertNodeBefore(before, newNode, blankLineBetween));
  }

  tryInsertTypeAnnotation(sourceFile: SourceFile, node: Node, typeNode: Node): boolean {
    const endNode = functionLikeCloseParenOrName(node) ?? declarationName(node);
    if (endNode === undefined) return false;
    this.insertNodeAt(sourceFile, endNode.end, typeNode, { prefix: ": " });
    return true;
  }

  parenthesizeArrowParameters(sourceFile: SourceFile, arrowFunction: Node): void {
    const parameters = nodeArray(arrowFunction, "parameters");
    if (parameters.length === 0 || hasChildKind(arrowFunction, Kind.CloseParenToken)) return;
    const firstParam = parameters[0]!;
    const lastParam = parameters[parameters.length - 1]!;
    this.insertText(sourceFile.fileName, positionToLineAndCharacter(sourceFile, firstParam.pos), "(");
    this.insertText(sourceFile.fileName, positionToLineAndCharacter(sourceFile, lastParam.end), ")");
  }

  insertModifierBefore(sourceFile: SourceFile, modifier: Kind, before: Node): void {
    const token: Node = {
      kind: modifier,
      pos: before.pos,
      end: before.pos,
      flags: 0,
      parent: before.parent,
      forEachChild: () => undefined,
      getSourceFile: () => sourceFile,
    };
    this.insertNodeAt(sourceFile, before.pos, token, { suffix: " " });
  }

  delete(sourceFile: SourceFile, node: Node): void {
    this.deletedNodes.push({ sourceFile, node });
  }

  deleteRange(sourceFile: SourceFile, textRange: { readonly pos: number; readonly end: number }): void {
    this.replaceRangeWithText(sourceFile.fileName, rangeFromBounds(sourceFile, textRange.pos, textRange.end), "");
  }

  deleteNode(sourceFile: SourceFile, node: Node, leadingTrivia: LeadingTriviaOption, trailingTrivia: TrailingTriviaOption): void {
    this.replaceRangeWithText(sourceFile.fileName, this.getAdjustedRange(sourceFile, node, node, leadingTrivia, trailingTrivia), "");
  }

  deleteNodeRange(sourceFile: SourceFile, startNode: Node, endNode: Node, leadingTrivia: LeadingTriviaOption, trailingTrivia: TrailingTriviaOption): void {
    this.replaceRangeWithText(sourceFile.fileName, this.getAdjustedRange(sourceFile, startNode, endNode, leadingTrivia, trailingTrivia), "");
  }

  insertNodeInListAfter(sourceFile: SourceFile, after: Node, newNode: Node, containingList: readonly Node[] | undefined = undefined): void {
    const list = containingList ?? containingNodeList(after);
    if (list === undefined) return;
    const index = list.indexOf(after);
    if (index < 0) return;
    if (index !== list.length - 1) {
      this.insertNodeAt(sourceFile, after.end, newNode, { prefix: ", " });
      return;
    }
    this.insertNodeAt(sourceFile, after.end, newNode, { prefix: ", " });
  }

  insertImportSpecifierAtIndex(sourceFile: SourceFile, newSpecifier: Node, namedImports: Node, index: number): void {
    const elements = nodeArray(namedImports, "elements");
    const previous = index > 0 ? elements[index - 1] : undefined;
    if (previous !== undefined) {
      this.insertNodeInListAfter(sourceFile, previous, newSpecifier, elements);
    } else if (elements[0] !== undefined) {
      this.insertNodeBefore(sourceFile, elements[0], newSpecifier, false, LeadingTriviaOption.None);
    }
  }

  insertAtTopOfFile(sourceFile: SourceFile, statements: readonly Node[], blankLineBetween: boolean): void {
    if (statements.length === 0) return;
    const position = this.getInsertionPositionAtSourceFileTop(sourceFile);
    const options: NodeOptions = {
      prefix: position === 0 ? "" : this.newLine,
      suffix: (sourceFile.text.length === 0 || !isLineBreak(sourceFile.text.charCodeAt(position)) ? this.newLine : "") + (blankLineBetween ? this.newLine : ""),
    };
    this.insertNodesAt(sourceFile, position, statements, options);
  }

  insertMemberAtStart(sourceFile: SourceFile, node: Node, newElement: Node): void {
    this.nodesWithInsertionsAtStart.set(node, { sourceFile, node: newElement });
  }

  removeRange(fileName: string, range: Range): void {
    this.add(fileName, { kind: TrackerEditKind.Remove, range, newText: "", options: {} });
  }

  insertText(fileName: string, position: Position, text: string): void {
    this.replaceRangeWithText(fileName, { start: position, end: position }, text);
  }

  replaceText(fileName: string, start: Position, end: Position, text: string): void {
    this.replaceRangeWithText(fileName, { start, end }, text);
  }

  private add(fileName: string, edit: TrackerEdit): void {
    const list = this.changes.get(fileName) ?? [];
    this.changes.set(fileName, [...list, edit]);
  }

  setEmitFlags(node: Node, flags: number): void {
    (node as { emitFlags?: number }).emitFlags = flags;
  }

  addEmitFlags(node: Node, flags: number): void {
    const mutable = node as { emitFlags?: number };
    mutable.emitFlags = (mutable.emitFlags ?? 0) | flags;
  }

  private finishDeleteDeclarations(): void {
    for (const deleted of this.deletedNodes) {
      if (this.deletedNodes.some(other => other !== deleted && other.sourceFile === deleted.sourceFile && rangeContainsNode(other.node, deleted.node))) {
        continue;
      }
      this.deleteNode(deleted.sourceFile, deleted.node, LeadingTriviaOption.StartLine, TrailingTriviaOption.ExcludeWhitespace);
    }
    this.deletedNodes.length = 0;
  }

  private finishNodesWithInsertionsAtStart(): void {
    for (const [node, state] of this.nodesWithInsertionsAtStart) {
      const members = getMembersOrProperties(node);
      if (members === undefined) continue;
      this.insertNodeAt(state.sourceFile, members.pos, state.node, this.getInsertNodeAtStartInsertOptions());
    }
    this.nodesWithInsertionsAtStart.clear();
  }

  private endPosForInsertNodeAfter(_sourceFile: SourceFile, after: Node, _newNode: Node): number {
    return this.getAdjustedEndPosition(after, TrailingTriviaOption.None);
  }

  private getInsertNodeAfterOptions(sourceFile: SourceFile, node: Node): NodeOptions {
    switch (node.kind) {
      case Kind.Parameter:
        return {};
      case Kind.ClassDeclaration:
      case Kind.ModuleDeclaration:
        return { prefix: this.newLine, suffix: this.newLine };
      case Kind.VariableDeclaration:
      case Kind.StringLiteral:
      case Kind.Identifier:
        return { prefix: ", " };
      case Kind.PropertyAssignment:
        return { suffix: "," + this.newLine };
      case Kind.ExportKeyword:
        return { prefix: " " };
      default:
        return node.end === sourceFile.end && isStatement(node)
          ? { prefix: this.newLine, suffix: this.newLine }
          : { suffix: this.newLine };
    }
  }

  private getOptionsForInsertNodeBefore(before: Node, _inserted: Node, blankLineBetween: boolean): NodeOptions {
    return isStatement(before) || isClassOrTypeElement(before)
      ? { suffix: blankLineBetween ? this.newLine + this.newLine : this.newLine }
      : { suffix: " " };
  }

  private getInsertNodeAtStartInsertOptions(): NodeOptions {
    return { suffix: this.newLine };
  }

  private getInsertionPositionAtSourceFileTop(sourceFile: SourceFile): number {
    for (const statement of sourceFile.statements) {
      if (statement.kind !== Kind.ImportDeclaration && statement.kind !== Kind.ImportEqualsDeclaration) return statement.pos;
    }
    return sourceFile.statements[0]?.pos ?? 0;
  }

  getAdjustedRange(sourceFile: SourceFile, startNode: Node, endNode: Node, leadingOption: LeadingTriviaOption = LeadingTriviaOption.Exclude, trailingOption: TrailingTriviaOption = TrailingTriviaOption.Exclude): Range {
    return rangeFromBounds(
      sourceFile,
      this.getAdjustedStartPosition(sourceFile, startNode, leadingOption),
      this.getAdjustedEndPosition(endNode, trailingOption),
    );
  }

  private getAdjustedStartPosition(sourceFile: SourceFile, node: Node, leadingOption: LeadingTriviaOption): number {
    if (leadingOption === LeadingTriviaOption.None || leadingOption === LeadingTriviaOption.IncludeAll) return node.pos;
    if (leadingOption === LeadingTriviaOption.StartLine) return lineStartForPosition(sourceFile, node.pos);
    return tokenStart(node);
  }

  private getAdjustedEndPosition(node: Node, trailingOption: TrailingTriviaOption): number {
    if (trailingOption === TrailingTriviaOption.None || trailingOption === TrailingTriviaOption.Include) return node.end;
    return node.end;
  }
}

export function newTracker(newLine = "\n"): Tracker {
  return new Tracker(newLine);
}

export function sortTrackerEdits(edits: readonly TrackerEdit[]): readonly TrackerEdit[] {
  return [...edits].sort((left, right) => compareRanges(left.range, right.range));
}

export function compareRanges(left: Range, right: Range): number {
  return comparePositions(left.start, right.start)
    || comparePositions(left.end, right.end);
}

export function rangesOverlap(left: Range, right: Range): boolean {
  return comparePositions(left.end, right.start) > 0 && comparePositions(right.end, left.start) > 0;
}

export function assertNoOverlappingChanges(edits: readonly TrackerEdit[]): void {
  for (let index = 0; index < edits.length - 1; index += 1) {
    const left = edits[index]!;
    const right = edits[index + 1]!;
    if (rangesOverlap(left.range, right.range)) {
      throw new Error(`changes overlap: ${formatRange(left.range)} and ${formatRange(right.range)}`);
    }
  }
}

export function computeNewText(change: TrackerEdit): string {
  if (change.kind === TrackerEditKind.Remove) return "";
  if (change.kind === TrackerEditKind.ReplaceWithSingleNode) return withPrefixAndSuffix(printNode(change.node), change.options);
  if (change.kind === TrackerEditKind.ReplaceWithMultipleNodes) {
    const joiner = change.options.joiner ?? "\n";
    return withPrefixAndSuffix((change.nodes ?? []).map(printNode).join(joiner), change.options);
  }
  const prefix = change.options.prefix ?? "";
  const suffix = change.options.suffix ?? "";
  const text = change.newText;
  return `${prefix}${text}${text.endsWith(suffix) ? "" : suffix}`;
}

export function formatRange(range: Range): string {
  return `${range.start.line}:${range.start.character}-${range.end.line}:${range.end.character}`;
}

function withPrefixAndSuffix(text: string, options: NodeOptions): string {
  const prefix = options.prefix ?? "";
  const suffix = options.suffix ?? "";
  return `${prefix}${text}${text.endsWith(suffix) ? "" : suffix}`;
}

function printNode(node: Node | undefined): string {
  if (node === undefined) return "";
  try {
    const text = nodeToStr(node, { removeComments: true, emitTrailingNewlines: false });
    if (text !== "") return text;
  } catch {
  }
  const text = (node as { readonly text?: unknown }).text;
  if (typeof text === "string") return text;
  const escapedText = (node as { readonly escapedText?: unknown }).escapedText;
  if (typeof escapedText === "string") return escapedText;
  return tokenText(node.kind);
}

function tokenText(kind: Kind): string {
  switch (kind) {
    case Kind.SemicolonToken:
      return ";";
    case Kind.CommaToken:
      return ",";
    case Kind.TypeKeyword:
      return "type";
    case Kind.ExportKeyword:
      return "export";
    case Kind.StaticKeyword:
      return "static";
    case Kind.OverrideKeyword:
      return "override";
    case Kind.ReadonlyKeyword:
      return "readonly";
    default:
      return "";
  }
}

function rangeFromBounds(sourceFile: SourceFile, start: number, end: number): Range {
  return {
    start: positionToLineAndCharacter(sourceFile, start),
    end: positionToLineAndCharacter(sourceFile, end),
  };
}

function positionToLineAndCharacter(sourceFile: SourceFile, position: number): Position {
  const lineStarts = computeLineStarts(sourceFile.text);
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    if (lineStarts[index]! > position) break;
    line = index;
  }
  return { line, character: position - lineStarts[line]! };
}

function computeLineStarts(text: string): readonly number[] {
  const lineStarts: number[] = [0];
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if (code === 13 || code === 10) {
      if (code === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      lineStarts.push(index + 1);
    }
  }
  return lineStarts;
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

function tokenStart(node: Node): number {
  return node.pos;
}

function declarationName(node: Node): Node | undefined {
  return (node as { readonly name?: Node }).name;
}

function functionLikeCloseParenOrName(node: Node): Node | undefined {
  return findChild(node, Kind.CloseParenToken) ?? nodeArray(node, "parameters").at(-1) ?? declarationName(node);
}

function hasChildKind(node: Node, kind: Kind): boolean {
  return findChild(node, kind) !== undefined;
}

function findChild(node: Node, kind: Kind): Node | undefined {
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

function nodeArray(node: Node, propertyName: string): readonly Node[] {
  const value = (node as unknown as Record<string, unknown>)[propertyName];
  return Array.isArray(value) ? value.filter(isNode) : [];
}

function containingNodeList(node: Node): readonly Node[] | undefined {
  const parent = node.parent;
  for (const value of Object.values(parent as unknown as Record<string, unknown>)) {
    if (Array.isArray(value) && value.includes(node)) return value.filter(isNode);
  }
  return undefined;
}

function getMembersOrProperties(node: Node): { readonly pos: number; readonly end: number } | undefined {
  const members = nodeArray(node, "members");
  if (members.length > 0) return nodeArrayRange(members);
  const properties = nodeArray(node, "properties");
  return properties.length > 0 ? nodeArrayRange(properties) : undefined;
}

function nodeArrayRange(nodes: readonly Node[]): { readonly pos: number; readonly end: number } {
  return {
    pos: nodes[0]?.pos ?? 0,
    end: nodes[nodes.length - 1]?.end ?? 0,
  };
}

function isStatement(node: Node): boolean {
  return node.kind >= Kind.VariableStatement && node.kind <= Kind.DebuggerStatement;
}

function isClassOrTypeElement(node: Node): boolean {
  return node.kind >= Kind.Constructor && node.kind <= Kind.IndexSignature;
}

function rangeContainsNode(outer: Node, inner: Node): boolean {
  return outer.pos <= inner.pos && outer.end >= inner.end;
}

function isLineBreak(code: number): boolean {
  return code === 10 || code === 13;
}

function isNode(value: unknown): value is Node {
  return value !== null && typeof value === "object" && typeof (value as { readonly kind?: unknown }).kind === "number";
}
