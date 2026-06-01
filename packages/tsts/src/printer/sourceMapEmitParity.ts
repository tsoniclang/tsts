/**
 * Source-map emission parity helpers.
 *
 * TS-Go's printer records source-map boundaries while emitting tokens. This
 * module keeps the generated-position/source-position mapping logic separate
 * from textual emission.
 */

import type { Node as AstNode } from "../ast/index.js";

export interface SourceMapState {
  readonly mappings: SourceMapMapping[];
  readonly sourceFiles: Map<string, number>;
  generatedLine: number;
  generatedColumn: number;
}

export interface SourceMapMapping {
  readonly generatedLine: number;
  readonly generatedColumn: number;
  readonly sourceIndex: number;
  readonly sourceLine: number;
  readonly sourceColumn: number;
  readonly name?: string;
}

export function createSourceMapState(): SourceMapState {
  return {
    mappings: [],
    sourceFiles: new Map(),
    generatedLine: 0,
    generatedColumn: 0,
  };
}

export function emitSourceMapToken(state: SourceMapState, node: AstNode, text: string): void {
  const sourceFile = sourceFileName(node);
  if (sourceFile !== undefined) {
    const sourceIndex = getSourceIndex(state, sourceFile);
    state.mappings.push({
      generatedLine: state.generatedLine,
      generatedColumn: state.generatedColumn,
      sourceIndex,
      sourceLine: sourceLine(node),
      sourceColumn: sourceColumn(node),
      ...(nodeName(node).length === 0 ? {} : { name: nodeName(node) }),
    });
  }
  advanceGeneratedPosition(state, text);
}

export function advanceGeneratedPosition(state: SourceMapState, text: string): void {
  for (const char of text) {
    if (char === "\n") {
      state.generatedLine += 1;
      state.generatedColumn = 0;
    } else {
      state.generatedColumn += 1;
    }
  }
}

export function sourceMapSources(state: SourceMapState): readonly string[] {
  return [...state.sourceFiles.entries()].sort((left, right) => left[1] - right[1]).map(entry => entry[0]);
}

export function compactSourceMapMappings(mappings: readonly SourceMapMapping[]): readonly SourceMapMapping[] {
  const result: SourceMapMapping[] = [];
  let previous: SourceMapMapping | undefined;
  for (const mapping of mappings) {
    if (previous !== undefined && sameMapping(previous, mapping)) continue;
    result.push(mapping);
    previous = mapping;
  }
  return result;
}

export function serializeSourceMap(state: SourceMapState): SourceMapPayload {
  return {
    version: 3,
    sources: sourceMapSources(state),
    mappings: compactSourceMapMappings(state.mappings),
  };
}

export interface SourceMapPayload {
  readonly version: 3;
  readonly sources: readonly string[];
  readonly mappings: readonly SourceMapMapping[];
}

function getSourceIndex(state: SourceMapState, sourceFile: string): number {
  const existing = state.sourceFiles.get(sourceFile);
  if (existing !== undefined) return existing;
  const next = state.sourceFiles.size;
  state.sourceFiles.set(sourceFile, next);
  return next;
}

function sameMapping(left: SourceMapMapping, right: SourceMapMapping): boolean {
  return left.generatedLine === right.generatedLine
    && left.generatedColumn === right.generatedColumn
    && left.sourceIndex === right.sourceIndex
    && left.sourceLine === right.sourceLine
    && left.sourceColumn === right.sourceColumn
    && left.name === right.name;
}

function sourceFileName(node: AstNode): string | undefined {
  return (node as { readonly sourceFile?: { readonly fileName?: string }; readonly fileName?: string }).sourceFile?.fileName
    ?? (node as { readonly fileName?: string }).fileName;
}

function sourceLine(node: AstNode): number {
  return (node as { readonly line?: number }).line ?? 0;
}

function sourceColumn(node: AstNode): number {
  return (node as { readonly column?: number }).column ?? 0;
}

function nodeName(node: AstNode): string {
  const name = (node as { readonly name?: { readonly text?: string } }).name;
  return name?.text ?? "";
}
