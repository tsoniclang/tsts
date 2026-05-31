import type { Node as AstNode, SourceFile } from "../../ast/index.js";
import { parseSourceFile } from "../../parser/index.js";

export interface ParseTestCase<TNode> {
  readonly name: string;
  readonly source: string;
  readonly parse: (source: string) => TNode;
  readonly format: (node: TNode) => string;
}

export function runParseTest<TNode>(test: ParseTestCase<TNode>): string {
  const node = test.parse(test.source);
  return test.format(node);
}

export function parseTypeScript(text: string, jsx: boolean): SourceFile {
  const fileName = jsx ? "/main.tsx" : "/main.ts";
  return parseSourceFile(text, { fileName });
}

export function checkDiagnostics(file: SourceFile): void {
  const diagnostics = file.parseDiagnostics ?? [];
  if (diagnostics.length === 0) return;
  throw new Error(formatParseDiagnostics(diagnostics));
}

export function checkDiagnosticsMessage(file: SourceFile, message: string): void {
  const diagnostics = file.parseDiagnostics ?? [];
  if (diagnostics.length === 0) return;
  throw new Error(message + formatParseDiagnostics(diagnostics));
}

export function markSyntheticRecursive(node: AstNode | undefined): void {
  if (node === undefined) return;
  const mutable = node as { pos?: number; end?: number; fullStart?: number; loc?: unknown };
  mutable.pos = -1;
  mutable.end = -1;
  mutable.fullStart = -1;
  mutable.loc = undefined;
  for (const child of childNodes(node)) markSyntheticRecursive(child);
}

function formatParseDiagnostics(diagnostics: readonly unknown[]): string {
  return diagnostics.map((diagnostic) => {
    const record = diagnostic as { readonly text?: string; readonly messageText?: string; readonly message?: { readonly message?: string } };
    return record.text ?? record.messageText ?? record.message?.message ?? String(diagnostic);
  }).join("\n");
}

function childNodes(node: AstNode): readonly AstNode[] {
  const children: AstNode[] = [];
  for (const value of Object.values(node)) {
    if (isNode(value)) children.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) if (isNode(item)) children.push(item);
    } else if (typeof value === "object" && value !== null && Array.isArray((value as { nodes?: unknown }).nodes)) {
      for (const item of (value as { nodes: unknown[] }).nodes) if (isNode(item)) children.push(item);
    }
  }
  return children;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}
