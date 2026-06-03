import { forEachChild, type Node as AstNode, type SourceFile } from "../../ast/index.js";
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

export interface SyntheticRecursiveVisitor {
  visitNode(node: AstNode | undefined): AstNode | undefined;
  visitEachChild(node: AstNode): AstNode;
}

export function newSyntheticRecursiveVisitor(): SyntheticRecursiveVisitor {
  const visitor: SyntheticRecursiveVisitor = {
    visitNode(node: AstNode | undefined): AstNode | undefined {
      if (node === undefined) return undefined;
      markSyntheticNode(node);
      return visitor.visitEachChild(node);
    },
    visitEachChild(node: AstNode): AstNode {
      // Collect every child: the generated visitor treats any non-`undefined`
      // return as "stop and propagate", so a continue/collect callback MUST
      // return `undefined`. Returning `false` here would stop after the first
      // child, leaving siblings unmarked.
      forEachChild(node, child => {
        visitor.visitNode(child);
        return undefined;
      });
      return node;
    },
  };
  return visitor;
}

export function markSyntheticRecursive(node: AstNode | undefined): void {
  newSyntheticRecursiveVisitor().visitNode(node);
}

function markSyntheticNode(node: AstNode): void {
  if (node === undefined) return;
  node.pos = -1;
  node.end = -1;
  Reflect.set(node, "fullStart", -1);
  Reflect.set(node, "loc", undefined);
}

function formatParseDiagnostics(diagnostics: readonly unknown[]): string {
  return diagnostics.map((diagnostic) => {
    const record = diagnostic as { readonly text?: string; readonly messageText?: string; readonly message?: { readonly message?: string } };
    return record.text ?? record.messageText ?? record.message?.message ?? String(diagnostic);
  }).join("\n");
}
