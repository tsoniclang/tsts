/**
 * Module-transformer shared helpers.
 *
 * Port of TS-Go `internal/transformers/moduletransforms/utilities.go`.
 * Cross-module deps forward-declared at file end.
 */

import { isSimpleCopiableExpression } from "../utilities.js";
import type { Node as AstNode, SourceFile, IdentifierNode, StringLiteralNode } from "../../ast/index.js";
import { Kind, nodeParent, nodeName, nodeText, stringLiteralTokenFlags } from "../../ast/index.js";
import { isStringLiteral, isIdentifier } from "../../ast/index.js";
import { changeExtension } from "../../tspath/extension.js";
import type { NodeFactory, EmitContext as TransformerEmitContext } from "../transformer.js";

const TokenFlags = { None: 0 } as const;
void TokenFlags;

// shouldRewriteModuleSpecifier — only rewrite relative path imports
// when the target output extension differs from the source extension.
function shouldRewriteModuleSpecifier(text: string, _options: CompilerOptions): boolean {
  if (text.length === 0) return false;
  const first = text.charCodeAt(0);
  // Only rewrite relative paths beginning with `.` or `./` or `../`.
  return first === 0x2e /* . */;
}
// getOutputExtension — map .ts/.tsx → .js/.jsx based on JSX flag.
function getOutputExtension(text: string, jsx: number): string {
  if (text.endsWith(".tsx")) return jsx === 0 ? ".js" : ".jsx";
  if (text.endsWith(".ts")) return ".js";
  if (text.endsWith(".mts")) return ".mjs";
  if (text.endsWith(".cts")) return ".cjs";
  return "";
}
function compilerOptionsJsx(options: CompilerOptions): number {
  return (options as unknown as { jsx?: number }).jsx ?? 0;
}
function getExternalModuleName(node: AstNode): AstNode | undefined {
  // For ImportDeclaration / ExportDeclaration, the module specifier is `.moduleSpecifier`.
  return (node as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
}
// AutoGenerateInfo accessors — IdentifierFlags bit-test wrappers.
function autoGenFlags(info: AutoGenerateInfo): number {
  return (info as unknown as { flags?: number }).flags ?? 0;
}
function autoGenInfoIsFileLevel(info: AutoGenerateInfo): boolean { return (autoGenFlags(info) & 1 /* FileLevel */) !== 0; }
function autoGenInfoIsOptimistic(info: AutoGenerateInfo): boolean { return (autoGenFlags(info) & 2 /* Optimistic */) !== 0; }
function autoGenInfoIsReservedInNestedScopes(info: AutoGenerateInfo): boolean { return (autoGenFlags(info) & 4 /* ReservedInNestedScopes */) !== 0; }

export function isDeclarationNameOfEnumOrNamespace(emitContext: EmitContext, node: IdentifierNode): boolean {
  const original = emitContext.mostOriginal(node as unknown as AstNode);
  if (original === undefined) return false;
  const parent = nodeParent(original);
  if (parent === undefined) return false;
  switch (parent.kind) {
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
      return original === nodeName(parent);
  }
  return false;
}

export function rewriteModuleSpecifier(
  emitContext: EmitContext,
  node: AstNode | undefined,
  compilerOptions: CompilerOptions,
): AstNode | undefined {
  if (node === undefined || !isStringLiteral(node) || !shouldRewriteModuleSpecifier(nodeText(node), compilerOptions)) {
    return node;
  }
  const updatedText = changeExtension(nodeText(node), getOutputExtension(nodeText(node), compilerOptionsJsx(compilerOptions)));
  if (updatedText !== nodeText(node)) {
    const updated = emitContext.factory().newStringLiteral(updatedText, stringLiteralTokenFlags(node));
    emitContext.setOriginal(updated, node);
    emitContext.assignCommentAndSourceMapRanges(updated, node);
    return updated;
  }
  return node;
}

export function createEmptyImports(factory: Factory): AstNode {
  return factory.newExportDeclaration(
    undefined,
    false,
    factory.newNamedExports(factory.newNodeList<AstNode>([])),
    undefined,
    undefined,
  );
}

export function getExternalModuleNameLiteral(
  factory: Factory,
  importNode: AstNode,
  sourceFile: SourceFile,
  host: unknown,
  resolver: EmitResolver,
  compilerOptions: CompilerOptions,
): StringLiteralNode | undefined {
  const moduleName = getExternalModuleName(importNode);
  if (moduleName !== undefined && isStringLiteral(moduleName)) {
    let name = tryGetModuleNameFromDeclaration(importNode, host, factory, resolver, compilerOptions);
    if (name === undefined) name = tryRenameExternalModule(factory, moduleName, sourceFile);
    if (name === undefined) name = factory.newStringLiteral(nodeText(moduleName), TokenFlags.None) as unknown as StringLiteralNode;
    return name;
  }
  return undefined;
}

export function tryGetModuleNameFromFile(
  factory: Factory,
  file: SourceFile | undefined,
  host: unknown,
  options: CompilerOptions,
): StringLiteralNode | undefined {
  if (file === undefined) return undefined;
  // file.moduleName is not yet supported
  return undefined;
}

export function tryGetModuleNameFromDeclaration(
  declaration: AstNode,
  host: unknown,
  factory: Factory,
  resolver: EmitResolver,
  compilerOptions: CompilerOptions,
): StringLiteralNode | undefined {
  if (resolver === undefined) return undefined;
  return tryGetModuleNameFromFile(
    factory,
    resolver.getExternalModuleFileFromDeclaration(declaration),
    host,
    compilerOptions,
  );
}

export function getExternalModuleNameFromPath(host: unknown, fileName: string, referencePath: string): string {
  // Not yet implemented in TS-Go
  return "";
}

export function tryRenameExternalModule(
  factory: Factory,
  moduleName: AstNode,
  sourceFile: SourceFile,
): StringLiteralNode | undefined {
  // Not yet implemented in TS-Go
  return undefined;
}

export function isFileLevelReservedGeneratedIdentifier(emitContext: EmitContext, name: IdentifierNode): boolean {
  const info = emitContext.getAutoGenerateInfo(name as unknown as AstNode) as AutoGenerateInfo | undefined;
  if (info === undefined) return false;
  return autoGenInfoIsFileLevel(info) && autoGenInfoIsOptimistic(info) && autoGenInfoIsReservedInNestedScopes(info);
}

export function isSimpleInlineableExpression(expression: AstNode): boolean {
  return !isIdentifier(expression) && isSimpleCopiableExpression(expression);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

// Factory/EmitContext are the canonical shapes from ../transformer.ts.
// We treat StringLiteral results loosely (AstNode) since transformer's
// NodeFactory does not narrow to StringLiteralNode.
type Factory = NodeFactory;
type EmitContext = TransformerEmitContext;

interface CompilerOptions { readonly _opts?: unknown; readonly [key: string]: unknown }
interface AutoGenerateInfo { readonly _info: unknown }
interface EmitResolver {
  getExternalModuleFileFromDeclaration(declaration: AstNode): SourceFile | undefined;
}

