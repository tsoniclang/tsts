import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import {
  forEachChild,
  getECMALineAndUTF16CharacterOfPosition,
  getECMALineOfPosition,
  getSourceFileOfNode,
  isBindingElement,
  isDeclarationName,
  isExportAssignment,
  isExportSpecifier,
  isExpression,
  isIdentifier,
  isImportClause,
  isImportEqualsDeclaration,
  isImportSpecifier,
  isJsxClosingElement,
  isJsxOpeningElement,
  isJsxSelfClosingElement,
  isMetaProperty,
  isOmittedExpression,
  isPropertyAccessExpression,
  isQualifiedName,
  isTypeAliasDeclaration,
  isTypeNode,
  Kind,
  nodeEnd,
  nodeFlags,
  nodeParent,
  nodePos,
  nodeText,
  skipTrivia,
  type Node,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../../ast/index.js";
import { NodeFlags } from "../../ast/flags.js";
import { getBaseFileName } from "../../tspath/index.js";
import { changeTsExtension, harnessNewLine, isDefaultLibraryFile, noContent, removeTestPathPrefixes, splitLines } from "./util.js";

export interface TypeSymbolEntry {
  readonly fileName: string;
  readonly line: number;
  readonly sourceText: string;
  readonly type?: string;
  readonly symbol?: string;
  readonly underline?: string;
}

export interface TypeAndSymbolBaselineInput {
  readonly baselinePath: string;
  readonly header: string;
  readonly files: readonly NamedSource[];
  readonly entries: readonly TypeSymbolEntry[];
  readonly options: BaselineOptions;
  readonly skipTypeBaselines?: boolean;
  readonly skipSymbolBaselines?: boolean;
  readonly hasErrorBaseline?: boolean;
}

export function doTypeAndSymbolBaseline(input: TypeAndSymbolBaselineInput): readonly BaselineResult[] {
  const results: BaselineResult[] = [];
  if (input.skipTypeBaselines !== true) {
    results.push(compareToBaseline(
      changeTsExtension(input.baselinePath, ".types"),
      generateBaseline(input.files, input.entries, input.header, false),
      input.options,
    ));
  }
  if (input.skipSymbolBaselines !== true) {
    results.push(compareToBaseline(
      changeTsExtension(input.baselinePath, ".symbols"),
      generateBaseline(input.files, input.entries, input.header, true),
      input.options,
    ));
  }
  return results;
}

export function generateBaseline(
  files: readonly NamedSource[],
  entries: readonly TypeSymbolEntry[],
  header: string,
  isSymbolBaseline: boolean,
): string {
  const sections = iterateBaseline(files, groupEntriesByFile(entries, isSymbolBaseline), isSymbolBaseline);
  if (sections.length === 0) return noContent;
  return `//// [${header}] ////${harnessNewLine}${harnessNewLine}${sections.join("")}`;
}

export function iterateBaseline(
  files: readonly NamedSource[],
  entriesByFile: ReadonlyMap<string, readonly TypeSymbolEntry[]>,
  isSymbolBaseline: boolean,
): readonly string[] {
  const baselines: string[] = [];
  for (const file of files) {
    const fileEntries = entriesByFile.get(normalizeKey(file.name)) ?? [];
    const section = generateFileBaseline(file, fileEntries, isSymbolBaseline);
    if (section.length > 0) baselines.push(section);
  }
  return baselines;
}

/**
 * The fixed virtual-directory prefixes the harness mounts test inputs under,
 * mirroring TS-Go's `testPathPrefixReplacer` (internal/testutil/tsbaseline/util.go).
 * `/.src/` is the harness current directory (`srcFolder`); the others cover the
 * lib/ts/bundled virtual mounts. TS-Go strips these from the rendered
 * `.types`/`.symbols` section so the `=== <path> ===` line is relative
 * (e.g. `src1/main.ts`, not `/.src/src1/main.ts`). Applied here only — the
 * error/output baselines keep their own (vendored) path rendering.
 */
const virtualMountPrefixes: readonly string[] = ["/.ts/", "/.lib/", "/.src/", "bundled:///libs/"];

function stripVirtualMountPrefixes(path: string): string {
  return virtualMountPrefixes.reduce((acc, prefix) => acc.replaceAll(prefix, ""), path);
}

function generateFileBaseline(file: NamedSource, entries: readonly TypeSymbolEntry[], isSymbolBaseline: boolean): string {
  const lines = splitLines(file.content);
  const out: string[] = [];
  out.push(`=== ${stripVirtualMountPrefixes(removeTestPathPrefixes(file.name, false))} ===`);
  let lastLine = -1;
  for (const entry of entries) {
    if (entry.line < 0 || entry.line >= lines.length) continue;
    if (lastLine === -1) {
      out.push(...lines.slice(0, entry.line + 1));
    } else if (lastLine !== entry.line) {
      if (!isBracketOrBlank(lines[lastLine + 1] ?? "")) out.push("");
      out.push(...lines.slice(lastLine + 1, entry.line + 1));
    }
    lastLine = entry.line;
    const text = entry.sourceText.replace(/[\r\n]/g, "");
    const value = isSymbolBaseline ? entry.symbol : entry.type;
    if (value === undefined || value.length === 0) continue;
    out.push(`>${text} : ${value}`);
    if (entry.underline !== undefined && entry.underline.length > 0) {
      out.push(`>${" ".repeat(text.length)} : ${entry.underline}`);
    }
  }
  if (lastLine + 1 < lines.length) {
    if (!isBracketOrBlank(lines[lastLine + 1] ?? "")) out.push("");
    out.push(...lines.slice(lastLine + 1));
  }
  out.push("");
  return `${out.join(harnessNewLine)}${harnessNewLine}`;
}

function groupEntriesByFile(entries: readonly TypeSymbolEntry[], isSymbolBaseline: boolean): ReadonlyMap<string, readonly TypeSymbolEntry[]> {
  // Preserve walker (document) order: TS-Go's iterateBaseline writes the
  // typeWriterResults in the exact order getTypes/getSymbols returns them (a
  // pre-order AST traversal) and never reorders them. Grouping here keeps each
  // file's entries in insertion order; we deliberately do NOT sort by line or
  // sourceText, which would diverge from TS-Go (e.g. emit `1` before `1 + 2`).
  const grouped = new Map<string, TypeSymbolEntry[]>();
  for (const entry of entries) {
    if (isSymbolBaseline && (entry.symbol ?? "") === "") continue;
    if (!isSymbolBaseline && (entry.type ?? "") === "") continue;
    const key = normalizeKey(entry.fileName);
    const list = grouped.get(key) ?? [];
    list.push(entry);
    grouped.set(key, list);
  }
  return grouped;
}

export function isTypeBaselineNodeReuseLine(line: string): boolean {
  if (!line.startsWith(">")) return false;
  const afterPrefix = line.slice(1);
  if (afterPrefix.length === 0) return false;
  const afterSourceText = afterPrefix.slice(1).replace(/^[ ]+/, "");
  if (!afterSourceText.startsWith(":")) return false;
  for (const char of afterSourceText.slice(1)) {
    if (char !== " " && char !== "^" && char !== "\r") return false;
  }
  return true;
}

export function diffFixupOldTypeBaseline(text: string): string {
  const output: string[] = [];
  let perfStats = false;
  for (let line of text.split("\n")) {
    if (isTypeBaselineNodeReuseLine(line)) continue;
    if (!perfStats && line.startsWith("=== Performance Stats ===")) {
      perfStats = true;
      continue;
    }
    if (perfStats) {
      if (line.startsWith("=== ")) perfStats = false;
      else continue;
    }

    const relativePrefixNew = "=== ";
    const relativePrefixOld = `${relativePrefixNew}./`;
    if (line.startsWith(relativePrefixOld)) {
      line = `${relativePrefixNew}${line.slice(relativePrefixOld.length)}`;
    }
    output.push(line);
  }
  return output.join("\n");
}

export interface TypeWriterResult {
  readonly line: number;
  readonly sourceText: string;
  readonly symbol: string;
  readonly type: string;
  readonly underline: string;
}

export function typeWriterResultToEntry(fileName: string, result: TypeWriterResult): TypeSymbolEntry {
  return {
    fileName,
    line: result.line,
    sourceText: result.sourceText,
    symbol: result.symbol,
    type: result.type,
    underline: result.underline,
  };
}

export interface TypeWriterProgram {
  getSourceFile(fileName: string): SourceFile | undefined;
  getTypeAtLocation?(node: Node, sourceFile: SourceFile): string | undefined;
  getSymbolAtLocation?(node: Node, sourceFile: SourceFile): TypeWriterSymbol | AstSymbol | undefined;
  symbolToString?(symbol: TypeWriterSymbol | AstSymbol, node: Node): string;
}

export interface TypeWriterSymbol {
  readonly name?: string;
  readonly escapedName?: string;
  readonly declarations?: readonly Node[];
}

export class TypeWriterWalker {
  private currentSourceFile: SourceFile | undefined;
  private readonly declarationTextCache = new Map<Node, string>();

  constructor(
    private readonly program: TypeWriterProgram,
    private readonly hadErrorBaseline: boolean,
  ) {
  }

  getTypes(fileName: string): readonly TypeWriterResult[] {
    const sourceFile = this.program.getSourceFile(fileName);
    if (sourceFile === undefined) return [];
    this.currentSourceFile = sourceFile;
    return this.visitNode(sourceFile, false);
  }

  getSymbols(fileName: string): readonly TypeWriterResult[] {
    const sourceFile = this.program.getSourceFile(fileName);
    if (sourceFile === undefined) return [];
    this.currentSourceFile = sourceFile;
    return this.visitNode(sourceFile, true);
  }

  private visitNode(node: Node, isSymbolWalk: boolean): readonly TypeWriterResult[] {
    const results: TypeWriterResult[] = [];
    for (const child of forEachAstNode(node)) {
      if (isExpression(child) || isIdentifier(child) || isDeclarationName(child)) {
        const result = this.writeTypeOrSymbol(child, isSymbolWalk);
        if (result !== undefined) results.push(result);
      }
    }
    return results;
  }

  private writeTypeOrSymbol(node: Node, isSymbolWalk: boolean): TypeWriterResult | undefined {
    const sourceFile = this.currentSourceFile;
    if (sourceFile === undefined) return undefined;
    const actualPos = skipTrivia(sourceFile.text, nodePos(node));
    const line = getECMALineOfPosition(sourceFile, actualPos);
    const sourceText = sourceTextOfNode(sourceFile, node);

    if (!isSymbolWalk) {
      if (shouldSkipTypeNode(node)) return undefined;
      if (isOmittedExpression(node)) return undefined;
      const type = this.program.getTypeAtLocation?.(node, sourceFile);
      if (type === undefined || type.length === 0) return undefined;
      if (!this.hadErrorBaseline && type === "any" && !shouldPrintAnyType(node, sourceFile)) {
        return undefined;
      }
      return { line, sourceText, type, symbol: "", underline: "" };
    }

    const symbol = this.program.getSymbolAtLocation?.(node, sourceFile);
    if (symbol === undefined) return undefined;
    return { line, sourceText, type: "", symbol: this.formatSymbol(symbol, node), underline: "" };
  }

  private formatSymbol(symbol: TypeWriterSymbol | AstSymbol, node: Node): string {
    const symbolName = this.program.symbolToString?.(symbol, node)
      ?? symbol.escapedName
      ?? symbol.name
      ?? "";
    const output: string[] = [`Symbol(${escapeInternalSymbolName(symbolName)}`];
    const declarations = symbol.declarations ?? [];
    for (let index = 0; index < declarations.length; index += 1) {
      if (index >= 5) {
        output.push(` ... and ${declarations.length - index} more`);
        break;
      }
      output.push(", ");
      output.push(this.formatDeclaration(declarations[index]!));
    }
    output.push(")");
    return output.join("");
  }

  private formatDeclaration(declaration: Node): string {
    const cached = this.declarationTextCache.get(declaration);
    if (cached !== undefined) return cached;
    const sourceFile = getSourceFileOfNode(declaration);
    const fileName = getBaseFileName(sourceFile === undefined ? "" : nodeFileName(sourceFile));
    let text: string;
    if (sourceFile === undefined || isDefaultLibraryFile(fileName)) {
      text = `Decl(${fileName}, --, --)`;
    } else {
      const location = getECMALineAndUTF16CharacterOfPosition(sourceFile, nodePos(declaration));
      text = `Decl(${fileName}, ${location.line}, ${location.character})`;
    }
    this.declarationTextCache.set(declaration, text);
    return text;
  }
}

export function newTypeWriterWalker(program: TypeWriterProgram, hadErrorBaseline: boolean): TypeWriterWalker {
  return new TypeWriterWalker(program, hadErrorBaseline);
}

export function entriesFromTypeWriterWalker(
  files: readonly NamedSource[],
  walker: TypeWriterWalker,
  isSymbolBaseline: boolean,
): readonly TypeSymbolEntry[] {
  const entries: TypeSymbolEntry[] = [];
  for (const file of files) {
    const results = isSymbolBaseline ? walker.getSymbols(file.name) : walker.getTypes(file.name);
    for (const result of results) entries.push(typeWriterResultToEntry(file.name, result));
  }
  return entries;
}

export function forEachAstNode(node: Node): readonly Node[] {
  const result: Node[] = [];
  const work: Node[] = [node];
  const children: Node[] = [];
  while (work.length > 0) {
    const current = work.pop()!;
    if (shouldTraverseReparsedNode(current)) {
      if (shouldRecordReparsedNode(current)) result.push(current);
      forEachChild(current, child => {
        children.push(child);
        return undefined;
      });
      children.reverse();
      work.push(...children);
      children.length = 0;
    }
  }
  return result;
}

function shouldTraverseReparsedNode(node: Node): boolean {
  if ((nodeFlags(node) & NodeFlags.Reparsed) === 0) return true;
  if (node.kind === Kind.AsExpression || node.kind === Kind.SatisfiesExpression) return true;
  const parent = nodeParent(node);
  return (parent?.kind === Kind.AsExpression || parent?.kind === Kind.SatisfiesExpression)
    && nodeExpression(parent) === node;
}

function shouldRecordReparsedNode(node: Node): boolean {
  const parent = nodeParent(node);
  return (nodeFlags(node) & NodeFlags.Reparsed) === 0
    || parent?.kind === Kind.AsExpression
    || parent?.kind === Kind.SatisfiesExpression;
}

function shouldSkipTypeNode(node: Node): boolean {
  const parent = nodeParent(node);
  if (isPartOfTypeNode(node)) return true;
  if ((node.kind === Kind.AsExpression || node.kind === Kind.SatisfiesExpression)
    && (nodeType(node) !== undefined && (nodeFlags(nodeType(node)) & NodeFlags.Reparsed) !== 0)) {
    return true;
  }
  // Mirror TS-Go's writeTypeOrSymbol type-skip: an identifier is skipped only
  // when its parent declaration carries NO value meaning (e.g. an interface or
  // type-parameter name), with an exception that keeps the NAME identifier of a
  // (JS)type-alias declaration so `type T = ...` still prints `>T : <type>`.
  // The previous predicate skipped EVERY declaration name (`name === node`),
  // which dropped value-meaning names like function/method/parameter/variable
  // names that TS-Go emits. Now we test the parent's semantic meaning exactly.
  if (isIdentifier(node)
    && parent !== undefined
    && (getMeaningFromDeclaration(parent) & SemanticMeaningValue) === 0
    && !(isTypeOrJSTypeAliasDeclaration(parent) && declarationName(parent) === node)) {
    return true;
  }
  return false;
}

/** Bit flags mirroring TS-Go's `ast.SemanticMeaning` (utilities.go). */
const SemanticMeaningValue = 1 << 0;
const SemanticMeaningType = 1 << 1;
const SemanticMeaningNamespace = 1 << 2;
const SemanticMeaningAll = SemanticMeaningValue | SemanticMeaningType | SemanticMeaningNamespace;

/**
 * Port of TS-Go's `ast.GetMeaningFromDeclaration` (internal/ast/utilities.go).
 * Returns the bitset of semantic meanings a declaration node introduces. Only
 * the `Value` bit is consulted by the type walker's skip test, but the full
 * switch is reproduced to stay faithful to the reference node coverage.
 *
 * For `ModuleDeclaration`, TS-Go distinguishes ambient/instantiated modules
 * (Namespace|Value) from a pure non-instantiated namespace (Namespace only).
 * Computing the precise module-instance state requires the binder, which the
 * testutil deliberately does not depend on; we treat module/namespace names as
 * carrying value meaning (the common case), matching ambient and instantiated
 * modules. A pure type-only namespace name is the only residual divergence.
 */
function getMeaningFromDeclaration(node: Node): number {
  switch (node.kind) {
    case Kind.VariableDeclaration:
      return SemanticMeaningValue;
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.CatchClause:
    case Kind.JsxAttribute:
      return SemanticMeaningValue;
    case Kind.TypeParameter:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.JSTypeAliasDeclaration:
    case Kind.TypeLiteral:
      return SemanticMeaningType;
    case Kind.EnumMember:
    case Kind.ClassDeclaration:
      return SemanticMeaningValue | SemanticMeaningType;
    case Kind.ModuleDeclaration:
      // See note above: namespace name treated as value-bearing.
      return SemanticMeaningNamespace | SemanticMeaningValue;
    case Kind.EnumDeclaration:
    case Kind.NamedImports:
    case Kind.ImportSpecifier:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ExportAssignment:
    case Kind.ExportDeclaration:
      return SemanticMeaningAll;
    case Kind.SourceFile:
      return SemanticMeaningNamespace | SemanticMeaningValue;
    default:
      return SemanticMeaningAll;
  }
}

function shouldPrintAnyType(node: Node, sourceFile: SourceFile): boolean {
  const parent = nodeParent(node);
  return parent === undefined
    || (!isBindingElement(parent)
      && !isPropertyAccessExpression(parent)
      && !isQualifiedName(parent)
      && !isLabelName(node)
      && !isGlobalScopeAugmentation(parent)
      && !isMetaProperty(parent)
      && !isImportStatementName(node)
      && !isExportStatementName(node)
      && !isIntrinsicJsxTag(node, sourceFile));
}

function isPartOfTypeNode(node: Node): boolean {
  if (isTypeNode(node)) return true;
  const parent = nodeParent(node);
  if (node.kind === Kind.ExpressionWithTypeArguments) return isPartOfTypeExpressionWithTypeArguments(node);
  if (node.kind === Kind.Identifier) {
    if (parent !== undefined && isQualifiedName(parent) && qualifiedNameRight(parent) === node) {
      return isPartOfTypeNodeInParent(parent);
    }
    if (parent !== undefined && isPropertyAccessExpression(parent) && propertyAccessName(parent) === node) {
      return isPartOfTypeNodeInParent(parent);
    }
    return isPartOfTypeNodeInParent(node);
  }
  if (node.kind === Kind.QualifiedName || node.kind === Kind.PropertyAccessExpression || node.kind === Kind.ThisKeyword) {
    return isPartOfTypeNodeInParent(node);
  }
  return false;
}

function isPartOfTypeNodeInParent(node: Node): boolean {
  const parent = nodeParent(node);
  if (parent === undefined) return false;
  if (parent.kind === Kind.TypeQuery) return false;
  if (parent.kind === Kind.ImportType) return importTypeIsTypeOf(parent) !== true;
  if (parent.kind >= Kind.FirstTypeNode && parent.kind <= Kind.LastTypeNode) return true;
  if (parent.kind === Kind.ExpressionWithTypeArguments) return isPartOfTypeExpressionWithTypeArguments(parent);
  if (parent.kind === Kind.TypeParameter) return nodeConstraint(parent) === node;
  if (nodeType(parent) === node) return true;
  if ((parent.kind === Kind.CallExpression || parent.kind === Kind.NewExpression || parent.kind === Kind.TaggedTemplateExpression)
    && nodeArray(parent, "typeArguments").includes(node)) {
    return true;
  }
  return false;
}

function isPartOfTypeExpressionWithTypeArguments(node: Node): boolean {
  const parent = nodeParent(node);
  if (parent === undefined) return false;
  return parent.kind === Kind.HeritageClause || parent.kind === Kind.JSDocImplementsTag || parent.kind === Kind.JSDocAugmentsTag;
}

function isTypeOrJSTypeAliasDeclaration(node: Node): boolean {
  return isTypeAliasDeclaration(node) || node.kind === Kind.JSTypeAliasDeclaration;
}

function isImportStatementName(node: Node): boolean {
  const parent = nodeParent(node);
  if (parent === undefined) return false;
  if (isImportSpecifier(parent) && (nodeName(parent) === node || propertyName(parent) === node)) return true;
  if (isImportClause(parent) && nodeName(parent) === node) return true;
  if (isImportEqualsDeclaration(parent) && nodeName(parent) === node) return true;
  return false;
}

function isExportStatementName(node: Node): boolean {
  const parent = nodeParent(node);
  if (parent === undefined) return false;
  if (isExportAssignment(parent) && nodeExpression(parent) === node) return true;
  if (isExportSpecifier(parent) && (nodeName(parent) === node || propertyName(parent) === node)) return true;
  return false;
}

function isIntrinsicJsxTag(node: Node, sourceFile: SourceFile): boolean {
  const parent = nodeParent(node);
  if (parent === undefined || !(isJsxOpeningElement(parent) || isJsxClosingElement(parent) || isJsxSelfClosingElement(parent))) return false;
  if (tagName(parent) !== node) return false;
  return /^[a-z]/.test(sourceTextOfNode(sourceFile, node)) || sourceTextOfNode(sourceFile, node).includes("-");
}

function sourceTextOfNode(sourceFile: SourceFile, node: Node): string {
  const pos = skipTrivia(sourceFile.text, nodePos(node));
  return sourceFile.text.slice(pos, nodeEnd(node)).replace(/[\r\n]/g, "");
}

function escapeInternalSymbolName(name: string): string {
  return name.replace(/^__@/, "").replace(/@\d+$/, "");
}

function nodeFileName(node: Node): string {
  return stringProperty(node, "fileName");
}

function isLabelName(node: Node): boolean {
  const parent = nodeParent(node);
  return parent?.kind === Kind.LabeledStatement && nodeLabel(parent) === node;
}

function isGlobalScopeAugmentation(node: Node): boolean {
  return booleanProperty(node, "globalScopeAugmentation");
}

function importTypeIsTypeOf(node: Node): boolean {
  return booleanProperty(node, "isTypeOf");
}

function nodeExpression(node: Node): Node | undefined { return nodeProperty(node, "expression"); }
function nodeType(node: Node | undefined): Node | undefined { return nodeProperty(node, "type"); }
function nodeConstraint(node: Node): Node | undefined { return nodeProperty(node, "constraint"); }
function nodeName(node: Node): Node | undefined { return nodeProperty(node, "name"); }
function nodeLabel(node: Node): Node | undefined { return nodeProperty(node, "label"); }
function propertyName(node: Node): Node | undefined { return nodeProperty(node, "propertyName"); }
function tagName(node: Node): Node | undefined { return nodeProperty(node, "tagName"); }
function declarationName(node: Node): Node | undefined { return nodeProperty(node, "name"); }
function qualifiedNameRight(node: Node): Node | undefined { return nodeProperty(node, "right"); }
function propertyAccessName(node: Node): Node | undefined { return nodeProperty(node, "name"); }

function nodeArray(node: Node, property: string): readonly Node[] {
  const value: unknown = Reflect.get(node, property);
  return Array.isArray(value) ? value.filter((item): item is Node => isNodeLike(item)) : [];
}

function nodeProperty(node: Node | undefined, property: string): Node | undefined {
  if (node === undefined) return undefined;
  const value: unknown = Reflect.get(node, property);
  return isNodeLike(value) ? value : undefined;
}

function stringProperty(node: Node, property: string): string {
  const value: unknown = Reflect.get(node, property);
  return typeof value === "string" ? value : "";
}

function booleanProperty(node: Node, property: string): boolean {
  const value: unknown = Reflect.get(node, property);
  return value === true;
}

function isNodeLike(value: unknown): value is Node {
  return typeof value === "object" && value !== null && "kind" in value && "pos" in value && "end" in value;
}

function isBracketOrBlank(line: string): boolean {
  return /^\s*(?:[{}|])?\s*$/.test(line);
}

function normalizeKey(fileName: string): string {
  return removeTestPathPrefixes(fileName, false).toLowerCase();
}
