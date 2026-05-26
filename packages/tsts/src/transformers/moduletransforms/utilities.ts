/**
 * Module-transformer shared helpers.
 *
 * Port of TS-Go `internal/transformers/moduletransforms/utilities.go`.
 * Cross-module deps forward-declared at file end.
 */

import { isSimpleCopiableExpression } from "../utilities.js";
import type { Node as AstNode, SourceFile, IdentifierNode, StringLiteralNode } from "../../ast/index.js";

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
    if (name === undefined) name = factory.newStringLiteral(nodeText(moduleName), TokenFlags.None);
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
  const info = emitContext.getAutoGenerateInfo(name as unknown as AstNode);
  if (info === undefined) return false;
  return autoGenInfoIsFileLevel(info) && autoGenInfoIsOptimistic(info) && autoGenInfoIsReservedInNestedScopes(info);
}

export function isSimpleInlineableExpression(expression: AstNode): boolean {
  return !isIdentifier(expression) && isSimpleCopiableExpression(expression);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext {
  factory(): Factory;
  mostOriginal(node: AstNode): AstNode | undefined;
  setOriginal(node: AstNode, original: AstNode): void;
  assignCommentAndSourceMapRanges(node: AstNode, original: AstNode): void;
  getAutoGenerateInfo(node: AstNode): AutoGenerateInfo | undefined;
}

interface Factory {
  newStringLiteral(text: string, flags: number): StringLiteralNode;
  newExportDeclaration(modifiers: unknown, isTypeOnly: boolean, namedExports: AstNode, moduleSpecifier: unknown, attributes: unknown): AstNode;
  newNamedExports(specifiers: unknown): AstNode;
  newNodeList<T extends AstNode>(items: readonly T[]): unknown;
}

interface CompilerOptions { readonly _opts?: unknown; readonly [key: string]: unknown }
interface AutoGenerateInfo { readonly _info: unknown }
interface EmitResolver {
  getExternalModuleFileFromDeclaration(declaration: AstNode): SourceFile | undefined;
}

declare const Kind: { EnumDeclaration: number; ModuleDeclaration: number };
declare const TokenFlags: { None: number };

declare function nodeParent(node: AstNode): AstNode | undefined;
declare function nodeName(parent: AstNode): AstNode | undefined;
declare function nodeText(node: AstNode): string;
declare function isStringLiteral(node: AstNode): boolean;
declare function isIdentifier(node: AstNode): boolean;
declare function shouldRewriteModuleSpecifier(text: string, options: CompilerOptions): boolean;
declare function changeExtension(text: string, ext: string): string;
declare function getOutputExtension(text: string, jsx: number): string;
declare function compilerOptionsJsx(options: CompilerOptions): number;
declare function getExternalModuleName(node: AstNode): AstNode | undefined;
declare function stringLiteralTokenFlags(node: AstNode): number;
declare function autoGenInfoIsFileLevel(info: AutoGenerateInfo): boolean;
declare function autoGenInfoIsOptimistic(info: AutoGenerateInfo): boolean;
declare function autoGenInfoIsReservedInNestedScopes(info: AutoGenerateInfo): boolean;
