/**
 * Printer emit-pipeline parity helpers.
 *
 * TS-Go's printer keeps comment emission, list formatting, substitution,
 * notification, source-map hooks, and writer state in one tight pipeline. TSTS
 * keeps the same contract as reusable operations for the split printer files.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";

export interface PrinterPipelineHost {
  readonly writer: TextWriterLike;
  readonly commentWriter: CommentWriterLike;
  readonly sourceMap?: SourceMapWriterLike;
  readonly substituteNode?: (hint: EmitHint, node: AstNode) => AstNode;
  readonly notifyEmit?: (hint: EmitHint, node: AstNode) => void;
  readonly emitNode?: (hint: EmitHint, node: AstNode) => void;
}

export type EmitHint =
  | "source-file"
  | "expression"
  | "identifier"
  | "statement"
  | "type-node"
  | "unspecified";

export interface TextWriterLike {
  write(text: string): void;
  writeLine(): void;
  increaseIndent(): void;
  decreaseIndent(): void;
  getText(): string;
}

export interface CommentWriterLike {
  emitLeadingComments(node: AstNode, writer: TextWriterLike): void;
  emitTrailingComments(node: AstNode, writer: TextWriterLike): void;
}

export interface SourceMapWriterLike {
  emitStart(node: AstNode): void;
  emitEnd(node: AstNode): void;
  emitToken(node: AstNode, token: string): void;
}

export interface EmitListOptions {
  readonly prefix?: string;
  readonly suffix?: string;
  readonly separator?: string;
  readonly multiline?: boolean;
  readonly trailingSeparator?: boolean;
}

export function emitSourceFile(sourceFile: SourceFile, host: PrinterPipelineHost): string {
  emitNodeWithPipeline("source-file", sourceFile, host);
  return host.writer.getText();
}

export function emitNodeWithPipeline(hint: EmitHint, node: AstNode, host: PrinterPipelineHost): void {
  const substituted = host.substituteNode?.(hint, node) ?? node;
  host.notifyEmit?.(hint, substituted);
  host.sourceMap?.emitStart(substituted);
  host.commentWriter.emitLeadingComments(substituted, host.writer);
  if (host.emitNode !== undefined) {
    host.emitNode(hint, substituted);
  } else {
    emitFallbackNode(hint, substituted, host);
  }
  host.commentWriter.emitTrailingComments(substituted, host.writer);
  host.sourceMap?.emitEnd(substituted);
}

export function emitList(nodes: readonly AstNode[], hint: EmitHint, host: PrinterPipelineHost, options: EmitListOptions = {}): void {
  const separator = options.separator ?? ", ";
  if (options.prefix !== undefined) host.writer.write(options.prefix);
  if (options.multiline === true) host.writer.increaseIndent();
  for (let index = 0; index < nodes.length; index += 1) {
    if (index > 0) writeListSeparator(host.writer, separator, options.multiline === true);
    emitNodeWithPipeline(hint, nodes[index]!, host);
  }
  if (options.trailingSeparator === true && nodes.length > 0) host.writer.write(separator.trimEnd());
  if (options.multiline === true) host.writer.decreaseIndent();
  if (options.suffix !== undefined) host.writer.write(options.suffix);
}

export function emitDelimitedList(nodes: readonly AstNode[], hint: EmitHint, host: PrinterPipelineHost, open: string, close: string): void {
  emitList(nodes, hint, host, { prefix: open, suffix: close, separator: ", " });
}

export function emitIndentedBlock(statements: readonly AstNode[], host: PrinterPipelineHost): void {
  host.writer.write("{");
  host.writer.writeLine();
  host.writer.increaseIndent();
  for (const statement of statements) {
    emitNodeWithPipeline("statement", statement, host);
    host.writer.writeLine();
  }
  host.writer.decreaseIndent();
  host.writer.write("}");
}

export function emitToken(host: PrinterPipelineHost, node: AstNode, token: string): void {
  host.sourceMap?.emitToken(node, token);
  host.writer.write(token);
}

export function emitIdentifierName(node: AstNode, host: PrinterPipelineHost): void {
  const text = nodeText((node as { readonly name?: AstNode }).name ?? node);
  host.writer.write(escapeIdentifier(text));
}

export function emitStringLiteral(text: string, host: PrinterPipelineHost): void {
  host.writer.write(JSON.stringify(text));
}

export function emitPropertyName(node: AstNode, host: PrinterPipelineHost): void {
  const expression = (node as { readonly expression?: AstNode }).expression;
  if (expression !== undefined) {
    host.writer.write("[");
    emitNodeWithPipeline("expression", expression, host);
    host.writer.write("]");
    return;
  }
  emitIdentifierName(node, host);
}

export function emitModifiers(modifiers: readonly AstNode[] | undefined, host: PrinterPipelineHost): void {
  if (modifiers === undefined) return;
  for (const modifier of modifiers) {
    host.writer.write(nodeText(modifier));
    host.writer.write(" ");
  }
}

export function emitHeritageClauses(clauses: readonly AstNode[] | undefined, host: PrinterPipelineHost): void {
  if (clauses === undefined || clauses.length === 0) return;
  host.writer.write(" ");
  emitList(clauses, "type-node", host, { separator: " " });
}

export function createTextWriter(): TextWriterLike {
  let text = "";
  let indent = 0;
  let atLineStart = true;
  const writeIndent = (): void => {
    if (!atLineStart) return;
    text += "  ".repeat(indent);
    atLineStart = false;
  };
  return {
    write(value) {
      writeIndent();
      text += value;
    },
    writeLine() {
      text += "\n";
      atLineStart = true;
    },
    increaseIndent() {
      indent += 1;
    },
    decreaseIndent() {
      indent = Math.max(0, indent - 1);
    },
    getText() {
      return text;
    },
  };
}

export function createCommentWriter(): CommentWriterLike {
  return {
    emitLeadingComments(node, writer) {
      for (const comment of commentsOf(node, "leadingComments")) writer.write(comment);
    },
    emitTrailingComments(node, writer) {
      for (const comment of commentsOf(node, "trailingComments")) writer.write(comment);
    },
  };
}

export function createPrinterPipelineHost(overrides: Partial<PrinterPipelineHost> = {}): PrinterPipelineHost {
  return {
    writer: overrides.writer ?? createTextWriter(),
    commentWriter: overrides.commentWriter ?? createCommentWriter(),
    ...(overrides.sourceMap === undefined ? {} : { sourceMap: overrides.sourceMap }),
    ...(overrides.substituteNode === undefined ? {} : { substituteNode: overrides.substituteNode }),
    ...(overrides.notifyEmit === undefined ? {} : { notifyEmit: overrides.notifyEmit }),
    ...(overrides.emitNode === undefined ? {} : { emitNode: overrides.emitNode }),
  };
}

function emitFallbackNode(hint: EmitHint, node: AstNode, host: PrinterPipelineHost): void {
  const text = nodeText(node);
  if (text.length > 0) {
    host.writer.write(text);
    return;
  }
  const children = childNodes(node);
  if (children.length === 0) return;
  emitList(children, hint === "source-file" ? "statement" : "unspecified", host, { separator: " " });
}

function writeListSeparator(writer: TextWriterLike, separator: string, multiline: boolean): void {
  writer.write(separator);
  if (multiline) writer.writeLine();
}

function nodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const data = node as {
    readonly text?: string;
    readonly escapedText?: string;
    readonly token?: string;
    readonly kindName?: string;
  };
  return data.text ?? data.escapedText ?? data.token ?? data.kindName ?? "";
}

function childNodes(node: AstNode): readonly AstNode[] {
  return (node as { readonly children?: readonly AstNode[]; readonly statements?: readonly AstNode[]; readonly members?: readonly AstNode[] }).children
    ?? (node as { readonly statements?: readonly AstNode[] }).statements
    ?? (node as { readonly members?: readonly AstNode[] }).members
    ?? [];
}

function commentsOf(node: AstNode, key: "leadingComments" | "trailingComments"): readonly string[] {
  return (node as { readonly leadingComments?: readonly string[]; readonly trailingComments?: readonly string[] })[key] ?? [];
}

function escapeIdentifier(text: string): string {
  if (/^[$_A-Za-z][$_0-9A-Za-z]*$/.test(text)) return text;
  return JSON.stringify(text);
}
