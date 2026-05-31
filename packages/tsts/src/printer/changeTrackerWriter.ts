/**
 * Change-tracker writer.
 *
 * Port of TS-Go `internal/printer/changetrackerwriter.go` (~238 LoC).
 * EmitTextWriter wrapper that records text-edit operations to be
 * applied to an existing file (used by refactor / quickfix actions).
 */

import type { EmitTextWriter } from "./textWriter.js";
import { newTextWriter } from "./textWriter.js";
import { skipTrivia } from "../scanner/trivia.js";

export interface TextChange {
  span: { start: number; length: number };
  newText: string;
}

export interface PrintHandlers {
  readonly onBeforeEmitNode?: (node: TriviaPositionKey | undefined) => void;
  readonly onAfterEmitNode?: (node: TriviaPositionKey | undefined) => void;
  readonly onBeforeEmitNodeList?: (nodes: TriviaPositionKey | undefined) => void;
  readonly onAfterEmitNodeList?: (nodes: TriviaPositionKey | undefined) => void;
  readonly onBeforeEmitToken?: (node: TriviaPositionKey | undefined) => void;
  readonly onAfterEmitToken?: (node: TriviaPositionKey | undefined) => void;
}

export interface TriviaPositionKey {
  readonly pos?: number;
  readonly end?: number;
}

export class ChangeTrackerWriter implements EmitTextWriter {
  inner: EmitTextWriter;
  changes: TextChange[] = [];
  currentChange: TextChange | undefined;
  private lastNonTriviaPosition = 0;
  private readonly positions = new WeakMap<object, number>();
  private readonly ends = new WeakMap<object, number>();

  constructor(inner: EmitTextWriter) {
    this.inner = inner;
  }

  write(text: string): void {
    this.inner.write(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeTrailingSemicolon(text: string): void {
    this.inner.writeTrailingSemicolon(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeKeyword(text: string): void {
    this.inner.writeKeyword(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeOperator(text: string): void {
    this.inner.writeOperator(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writePunctuation(text: string): void {
    this.inner.writePunctuation(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeParameter(text: string): void {
    this.inner.writeParameter(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeSpace(text: string): void {
    this.inner.writeSpace(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeStringLiteral(text: string): void {
    this.inner.writeStringLiteral(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeLiteral(text: string): void {
    this.inner.writeLiteral(text);
    this.setLastNonTriviaPosition(text, true);
  }
  writeSymbol(text: string, symbol: unknown): void {
    this.inner.writeSymbol(text, symbol);
    this.setLastNonTriviaPosition(text, false);
  }
  writeProperty(text: string): void {
    this.inner.writeProperty(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeComment(text: string): void { this.inner.writeComment(text); }
  writeLine(): void { this.inner.writeLine(); }
  writeLineForce(force: boolean): void { this.inner.writeLineForce(force); }
  writeLineRepeat(count: number): void { this.inner.writeLineRepeat(count); }
  increaseIndent(): void { this.inner.increaseIndent(); }
  decreaseIndent(): void { this.inner.decreaseIndent(); }
  getText(): string { return this.inner.getText(); }
  toString(): string { return this.inner.toString(); }
  getTextPos(): number { return this.inner.getTextPos(); }
  getLine(): number { return this.inner.getLine(); }
  getColumn(): number { return this.inner.getColumn(); }
  getIndent(): number { return this.inner.getIndent(); }
  isAtStartOfLine(): boolean { return this.inner.isAtStartOfLine(); }
  rawWrite(text: string): void {
    this.inner.rawWrite(text);
    this.setLastNonTriviaPosition(text, false);
  }
  writeLiteralStringLiteral(text: string): void {
    this.inner.writeLiteralStringLiteral(text);
    this.setLastNonTriviaPosition(text, true);
  }
  hasTrailingComment(): boolean { return this.inner.hasTrailingComment(); }
  hasTrailingWhitespace(): boolean { return this.inner.hasTrailingWhitespace(); }
  grow(size: number): void { this.inner.grow(size); }
  clear(): void {
    this.inner.clear();
    this.changes = [];
    this.currentChange = undefined;
    this.lastNonTriviaPosition = 0;
  }

  getPrintHandlers(): PrintHandlers {
    return {
      onBeforeEmitNode: node => this.setPos(node),
      onAfterEmitNode: node => this.setEnd(node),
      onBeforeEmitNodeList: node => this.setPos(node),
      onAfterEmitNodeList: node => this.setEnd(node),
      onBeforeEmitToken: node => this.setPos(node),
      onAfterEmitToken: node => this.setEnd(node),
    };
  }

  setPos(node: TriviaPositionKey | undefined): void {
    if (node !== undefined && typeof node === "object") this.positions.set(node, this.lastNonTriviaPosition);
  }

  setEnd(node: TriviaPositionKey | undefined): void {
    if (node !== undefined && typeof node === "object") this.ends.set(node, this.lastNonTriviaPosition);
  }

  getPos(node: TriviaPositionKey): number {
    return this.positions.get(node) ?? node.pos ?? 0;
  }

  getEnd(node: TriviaPositionKey): number {
    return this.ends.get(node) ?? node.end ?? this.getPos(node);
  }

  startChange(start: number, length: number): void {
    this.currentChange = { span: { start, length }, newText: "" };
  }

  endChange(): void {
    if (this.currentChange !== undefined) {
      this.changes.push(this.currentChange);
      this.currentChange = undefined;
    }
  }

  getChanges(): readonly TextChange[] {
    return this.changes;
  }

  assignPositionsToNode(node: TriviaPositionKey | undefined): void {
    this.assignPositionsToNodeWorker(node, new Set<object>());
  }

  assignPositionsToNodeArray(nodes: readonly TriviaPositionKey[] | undefined): void {
    if (nodes === undefined) return;
    for (const node of nodes) this.assignPositionsToNodeWorker(node, new Set<object>());
  }

  private assignPositionsToNodeWorker(node: TriviaPositionKey | undefined, seen: Set<object>): void {
    if (node === undefined || typeof node !== "object" || seen.has(node)) return;
    seen.add(node);
    const mutable = node as { pos?: number; end?: number; [key: string]: unknown };
    mutable.pos = this.getPos(node);
    mutable.end = this.getEnd(node);
    for (const value of Object.values(mutable)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item !== null && typeof item === "object") this.assignPositionsToNodeWorker(item as TriviaPositionKey, seen);
        }
      } else if (value !== null && typeof value === "object") {
        this.assignPositionsToNodeWorker(value as TriviaPositionKey, seen);
      }
    }
  }

  private setLastNonTriviaPosition(text: string, force: boolean): void {
    if (!force && skipTrivia(text, 0) === text.length) return;
    let trimmedEnd = text.length;
    while (trimmedEnd > 0 && /\s/u.test(text[trimmedEnd - 1]!)) trimmedEnd -= 1;
    this.lastNonTriviaPosition = this.inner.getTextPos() - (text.length - trimmedEnd);
  }
}

export function newChangeTrackerWriter(inner: EmitTextWriter): ChangeTrackerWriter;
export function newChangeTrackerWriter(newLine: string, indentSize?: number): ChangeTrackerWriter;
export function newChangeTrackerWriter(innerOrNewLine: EmitTextWriter | string, indentSize = 4): ChangeTrackerWriter {
  return typeof innerOrNewLine === "string"
    ? new ChangeTrackerWriter(newTextWriter(innerOrNewLine, indentSize))
    : new ChangeTrackerWriter(innerOrNewLine);
}
