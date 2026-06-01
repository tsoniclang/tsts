/**
 * Checker printer parity extras.
 *
 * Conceptual split from TS-Go `internal/checker/printer.go`: writer state,
 * node-builder flag projection, and stringification entry points used by
 * diagnostics and display.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Signature, Type, TypeParameter, TypePredicate } from "./types.js";
import { TypeFlags } from "./types.js";

export interface PrinterWriter {
  text: string;
  line: number;
  column: number;
  indent: number;
  atLineStart: boolean;
  trailingSemicolon: boolean;
}

export function createPrinterWithDefaults(): PrinterWriter {
  return createWriter();
}

export function createPrinterWithRemoveComments(): PrinterWriter {
  return createWriter();
}

export function createPrinterWithRemoveCommentsOmitTrailingSemicolonNeverAsciiEscape(): PrinterWriter {
  const writer = createWriter();
  writer.trailingSemicolon = false;
  return writer;
}

export function createPrinterWithRemoveCommentsNeverAsciiEscape(): PrinterWriter {
  return createWriter();
}

export function commitSemicolon(writer: PrinterWriter): void {
  if (writer.trailingSemicolon) writeTrailingSemicolon(writer);
}

export function clear(writer: PrinterWriter): void {
  writer.text = "";
  writer.line = 0;
  writer.column = 0;
  writer.atLineStart = true;
}

export function decreaseIndent(writer: PrinterWriter): void {
  writer.indent = Math.max(0, writer.indent - 1);
}

export function getColumn(writer: PrinterWriter): number {
  return writer.column;
}

export function getIndent(writer: PrinterWriter): number {
  return writer.indent;
}

export function getLine(writer: PrinterWriter): number {
  return writer.line;
}

export function getTextPos(writer: PrinterWriter): number {
  return writer.text.length;
}

export function hasTrailingComment(writer: PrinterWriter): boolean {
  return /\/\/[^\n]*$/.test(writer.text) || /\/\*[\s\S]*\*\/\s*$/.test(writer.text);
}

export function hasTrailingWhitespace(writer: PrinterWriter): boolean {
  return /\s$/.test(writer.text);
}

export function increaseIndent(writer: PrinterWriter): void {
  writer.indent += 1;
}

export function isAtStartOfLine(writer: PrinterWriter): boolean {
  return writer.atLineStart;
}

export function rawWrite(writer: PrinterWriter, text: string): void {
  append(writer, text);
}

export function string(writer: PrinterWriter): string {
  return writer.text;
}

export function write(writer: PrinterWriter, text: string): void {
  if (writer.atLineStart && text.length !== 0) append(writer, "  ".repeat(writer.indent));
  append(writer, text);
}

export function writeComment(writer: PrinterWriter, text: string): void {
  write(writer, text.startsWith("//") || text.startsWith("/*") ? text : `// ${text}`);
}

export function writeKeyword(writer: PrinterWriter, text: string): void {
  write(writer, text);
}

export function writeLine(writer: PrinterWriter): void {
  append(writer, "\n");
  writer.line += 1;
  writer.column = 0;
  writer.atLineStart = true;
}

export function writeLineForce(writer: PrinterWriter): void {
  if (!writer.atLineStart) writeLine(writer);
}

export function writeLiteral(writer: PrinterWriter, text: string): void {
  write(writer, text);
}

export function writeOperator(writer: PrinterWriter, text: string): void {
  writeSpace(writer);
  write(writer, text);
  writeSpace(writer);
}

export function writeParameter(writer: PrinterWriter, name: string, type: string | undefined): void {
  write(writer, type === undefined ? name : `${name}: ${type}`);
}

export function writeProperty(writer: PrinterWriter, name: string, type: string | undefined): void {
  write(writer, name);
  if (type !== undefined) {
    writePunctuation(writer, ":");
    writeSpace(writer);
    write(writer, type);
  }
}

export function writePunctuation(writer: PrinterWriter, text: string): void {
  write(writer, text);
}

export function writeSpace(writer: PrinterWriter): void {
  if (!hasTrailingWhitespace(writer) && !writer.atLineStart) append(writer, " ");
}

export function writeStringLiteral(writer: PrinterWriter, text: string): void {
  write(writer, JSON.stringify(text));
}

export function writeTrailingSemicolon(writer: PrinterWriter): void {
  write(writer, ";");
}

export function getTrailingSemicolonDeferringWriter(writer: PrinterWriter): PrinterWriter {
  return { ...writer, trailingSemicolon: false };
}

export function toNodeBuilderFlags(typeFormatFlags: number): number {
  const noTruncation = (typeFormatFlags & 1) !== 0 ? 1 : 0;
  const writeArrayAsGeneric = (typeFormatFlags & (1 << 1)) !== 0 ? 1 << 1 : 0;
  const useFullyQualified = (typeFormatFlags & (1 << 6)) !== 0 ? 1 << 6 : 0;
  return noTruncation | writeArrayAsGeneric | useFullyQualified;
}

export function symbolToStringEx(symbol: AstSymbol | undefined, enclosingDeclaration?: AstNode, flags = 0): string {
  void enclosingDeclaration;
  void flags;
  return symbol?.name ?? symbol?.escapedName ?? "";
}

export function signatureToStringEx(signature: Signature, enclosingDeclaration?: AstNode, flags = 0): string {
  void enclosingDeclaration;
  void flags;
  const parameters = signature.parameters.map(parameter => symbolToStringEx(parameter)).join(", ");
  const returnType = signature.resolvedReturnType === undefined ? "unknown" : typeToStringEx(signature.resolvedReturnType);
  return `(${parameters}) => ${returnType}`;
}

export function typePredicateToStringEx(predicate: TypePredicate | undefined): string {
  if (predicate === undefined) return "";
  const type = predicate.type === undefined ? "" : ` is ${typeToStringEx(predicate.type)}`;
  return `${predicate.parameterName}${type}`;
}

export function formatUnionTypes(types: readonly Type[]): string {
  return types.map(typeToStringEx).join(" | ");
}

export function typeParameterToStringEx(typeParameter: TypeParameter): string {
  const symbol = (typeParameter as { readonly symbol?: AstSymbol }).symbol;
  const constraint = typeParameter.constraint === undefined ? "" : ` extends ${typeToStringEx(typeParameter.constraint)}`;
  return `${symbolToStringEx(symbol) || "T"}${constraint}`;
}

export function typeToTypeNodeEx(type: Type): AstNode {
  return {
    kind: kindForType(type),
    text: typeToStringEx(type),
  } as unknown as AstNode;
}

export function typePredicateToTypePredicateNode(predicate: TypePredicate | undefined): AstNode | undefined {
  if (predicate === undefined) return undefined;
  return {
    kind: 0,
    parameterName: predicate.parameterName,
    type: predicate.type === undefined ? undefined : typeToTypeNodeEx(predicate.type),
  } as unknown as AstNode;
}

function createWriter(): PrinterWriter {
  return {
    text: "",
    line: 0,
    column: 0,
    indent: 0,
    atLineStart: true,
    trailingSemicolon: true,
  };
}

function append(writer: PrinterWriter, text: string): void {
  writer.text += text;
  const lastNewline = text.lastIndexOf("\n");
  if (lastNewline >= 0) {
    writer.line += text.split("\n").length - 1;
    writer.column = text.length - lastNewline - 1;
    writer.atLineStart = writer.column === 0;
  } else {
    writer.column += text.length;
    writer.atLineStart = false;
  }
}

function typeToStringEx(type: Type): string {
  if ((type.flags & TypeFlags.String) !== 0) return "string";
  if ((type.flags & TypeFlags.Number) !== 0) return "number";
  if ((type.flags & TypeFlags.Boolean) !== 0) return "boolean";
  if ((type.flags & TypeFlags.Void) !== 0) return "void";
  if ((type.flags & TypeFlags.Any) !== 0) return "any";
  if ((type.flags & TypeFlags.Unknown) !== 0) return "unknown";
  if ((type.flags & TypeFlags.Never) !== 0) return "never";
  if ((type.flags & TypeFlags.Union) !== 0) return formatUnionTypes((type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? []);
  return type.symbol?.name ?? (type.data as { readonly intrinsicName?: string; readonly value?: string | number | boolean } | undefined)?.intrinsicName
    ?? String((type.data as { readonly value?: string | number | boolean } | undefined)?.value ?? `type#${type.id}`);
}

function kindForType(type: Type): number {
  if ((type.flags & TypeFlags.String) !== 0) return 150;
  if ((type.flags & TypeFlags.Number) !== 0) return 151;
  if ((type.flags & TypeFlags.Boolean) !== 0) return 136;
  if ((type.flags & TypeFlags.Void) !== 0) return 116;
  return 0;
}
