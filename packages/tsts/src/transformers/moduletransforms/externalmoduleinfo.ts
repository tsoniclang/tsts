/**
 * External module info collector + helpers.
 *
 * Port of TS-Go `internal/transformers/moduletransforms/externalmoduleinfo.go`.
 * Scans a source file to collect:
 * - external imports / exports referenced
 * - export specifiers keyed by local name
 * - exported bindings keyed by original declaration
 * - exported function declarations
 * - export= assignment, if any
 * - hasExportStarsToExportValues flag
 *
 * Cross-module deps forward-declared at the file end.
 */

import { isLocalName } from "../utilities.js";
import type { Node as AstNode, SourceFile, ImportDeclaration, ImportEqualsDeclaration, ExportDeclaration, ExportAssignment, VariableStatement, FunctionDeclaration, ClassDeclaration } from "../../ast/index.js";
import {
  sourceFileStatementsRO, hasSyntacticModifier,
  importEqualsModuleReference, exportDeclarationModuleSpecifier,
  exportDeclarationExportClause, variableStatementDeclarationListRO,
  variableDeclarationListDeclarationsRO, classDeclName, namedExportsElements,
  namedElements, exportSpecifierName, exportSpecifierPropertyNameOrName,
  moduleExportNameIsDefault, nodeText, nodeName, bindingPatternElements,
  getNamespaceDeclarationNode, importDeclarationImportClause,
  importClauseNamedBindings, isDefaultImport, exportAssignmentIsExportEquals,
  isEffectiveExternalModule,
} from "../../ast/index.js";
import {
  isExportAssignment, isNamedExports, isNamedImports,
  isBindingPattern, isExternalModuleReference,
} from "../../ast/index.js";
import { Kind } from "../../ast/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import { ModuleKind } from "../../core/compileroptions.js";
import { EmitFlags } from "../../printer/emitflags.js";
const TokenFlags = { None: 0 } as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExternalModuleInfo {
  externalImports: AstNode[];
  exportSpecifiers: Map<string, AstNode[]>;
  exportedBindings: Map<AstNode, AstNode[]>;
  exportedNames: AstNode[];
  exportedFunctions: Set<AstNode>;
  exportEquals: ExportAssignment | undefined;
  hasExportStarsToExportValues: boolean;
}

// ---------------------------------------------------------------------------
// Collector
// ---------------------------------------------------------------------------

class ExternalModuleInfoCollector {
  readonly sourceFile: SourceFile;
  readonly compilerOptions: CompilerOptions;
  readonly emitContext: EmitContext;
  readonly resolver: ReferenceResolver;

  readonly uniqueExports = new Set<string>();
  hasExportDefault = false;
  readonly output: ExternalModuleInfo;

  constructor(sourceFile: SourceFile, compilerOptions: CompilerOptions, emitContext: EmitContext, resolver: ReferenceResolver) {
    this.sourceFile = sourceFile;
    this.compilerOptions = compilerOptions;
    this.emitContext = emitContext;
    this.resolver = resolver;
    this.output = {
      externalImports: [],
      exportSpecifiers: new Map(),
      exportedBindings: new Map(),
      exportedNames: [],
      exportedFunctions: new Set(),
      exportEquals: undefined,
      hasExportStarsToExportValues: false,
    };
  }

  collect(): ExternalModuleInfo {
    let hasImportStar = false;
    let hasImportDefault = false;
    for (const node of sourceFileStatementsRO(this.sourceFile)) {
      if (isNotEmittedStatement(node)) {
        const original = this.emitContext.mostOriginal(node);
        if (original !== undefined && isExportAssignment(original)) {
          if (exportAssignmentIsExportEquals(original as unknown as ExportAssignment) && this.output.exportEquals === undefined) {
            this.output.exportEquals = original as unknown as ExportAssignment;
          }
        }
        continue;
      }
      switch (node.kind) {
        case Kind.ImportDeclaration: {
          const n = node as unknown as ImportDeclaration;
          this.addExternalImport(node);
          if (!hasImportStar && getImportNeedsImportStarHelper(n)) hasImportStar = true;
          if (!hasImportDefault && getImportNeedsImportDefaultHelper(n)) hasImportDefault = true;
          break;
        }
        case Kind.ImportEqualsDeclaration: {
          const n = node as unknown as ImportEqualsDeclaration;
          if (isExternalModuleReference(importEqualsModuleReference(n))) {
            this.addExternalImport(node);
          }
          break;
        }
        case Kind.ExportDeclaration: {
          const n = node as unknown as ExportDeclaration;
          if (exportDeclarationModuleSpecifier(n) !== undefined) {
            this.addExternalImport(node);
            const exportClause = exportDeclarationExportClause(n);
            if (exportClause === undefined) {
              this.output.hasExportStarsToExportValues = true;
            } else if (isNamedExports(exportClause)) {
              this.addExportedNamesForExportDeclaration(n);
              if (!hasImportDefault) hasImportDefault = containsDefaultReference(exportClause);
            } else {
              // export * as ns from "mod"
              const name = namespaceExportName(exportClause);
              const nameText = nodeText(name);
              if (this.addUniqueExport(nameText)) {
                this.addExportedBinding(node, name);
                this.addExportedName(name);
              }
              hasImportStar = true;
            }
          } else {
            this.addExportedNamesForExportDeclaration(node as unknown as ExportDeclaration);
          }
          break;
        }
        case Kind.ExportAssignment: {
          const n = node as unknown as ExportAssignment;
          if (exportAssignmentIsExportEquals(n) && this.output.exportEquals === undefined) {
            this.output.exportEquals = n;
          }
          break;
        }
        case Kind.VariableStatement: {
          const n = node as unknown as VariableStatement;
          if (hasSyntacticModifier(node, ModifierFlags.Export)) {
            for (const decl of variableDeclarationListDeclarationsRO(variableStatementDeclarationListRO(n))) {
              this.collectExportedVariableInfo(decl);
            }
          }
          break;
        }
        case Kind.FunctionDeclaration: {
          const n = node as unknown as FunctionDeclaration;
          if (hasSyntacticModifier(node, ModifierFlags.Export)) {
            this.addExportedFunctionDeclaration(n, undefined, hasSyntacticModifier(node, ModifierFlags.Default));
          }
          break;
        }
        case Kind.ClassDeclaration: {
          const n = node as unknown as ClassDeclaration;
          if (hasSyntacticModifier(node, ModifierFlags.Export)) {
            if (hasSyntacticModifier(node, ModifierFlags.Default)) {
              if (!this.hasExportDefault) {
                let name = classDeclName(n);
                if (name === undefined) name = this.emitContext.factory().newGeneratedNameForNode(node);
                this.addExportedBinding(node, name);
                this.hasExportDefault = true;
              }
            } else {
              const name = classDeclName(n);
              if (name !== undefined) {
                if (this.addUniqueExport(nodeText(name))) {
                  this.addExportedBinding(node, name);
                  this.addExportedName(name);
                }
              }
            }
          }
          break;
        }
      }
    }
    return this.output;
  }

  addUniqueExport(name: string): boolean {
    if (!this.uniqueExports.has(name)) {
      this.uniqueExports.add(name);
      return true;
    }
    return false;
  }

  addExportedBinding(decl: AstNode, name: AstNode): void {
    const key = this.emitContext.mostOriginal(decl) ?? decl;
    const arr = this.output.exportedBindings.get(key) ?? [];
    arr.push(name);
    this.output.exportedBindings.set(key, arr);
  }

  addExternalImport(node: AstNode): void {
    this.output.externalImports.push(node);
  }

  addExportedName(name: AstNode): void {
    this.output.exportedNames.push(name);
  }

  addExportedNamesForExportDeclaration(node: ExportDeclaration): void {
    const exportClause = exportDeclarationExportClause(node);
    if (exportClause === undefined) return;
    for (const specifier of namedExportsElements(exportClause)) {
      const specifierNameText = nodeText(exportSpecifierName(specifier));
      if (this.addUniqueExport(specifierNameText)) {
        const name = exportSpecifierPropertyNameOrName(specifier);
        if (name.kind !== Kind.StringLiteral) {
          if (exportDeclarationModuleSpecifier(node) === undefined) {
            const arr = this.output.exportSpecifiers.get(nodeText(name)) ?? [];
            arr.push(specifier);
            this.output.exportSpecifiers.set(nodeText(name), arr);
          }

          let decl = this.resolver.getReferencedImportDeclaration(this.emitContext.mostOriginal(name) ?? name);
          if (decl === undefined) {
            decl = this.resolver.getReferencedValueDeclaration(this.emitContext.mostOriginal(name) ?? name);
          }
          if (decl !== undefined) {
            if (decl.kind === Kind.FunctionDeclaration) {
              this.uniqueExports.delete(specifierNameText);
              this.addExportedFunctionDeclaration(
                decl as unknown as FunctionDeclaration,
                exportSpecifierName(specifier),
                moduleExportNameIsDefault(exportSpecifierName(specifier)),
              );
              continue;
            }
            this.addExportedBinding(decl, exportSpecifierName(specifier));
          }
        }
        this.addExportedName(exportSpecifierName(specifier));
      }
    }
  }

  addExportedFunctionDeclaration(node: FunctionDeclaration, name: AstNode | undefined, isDefault: boolean): void {
    this.output.exportedFunctions.add(this.emitContext.mostOriginal(node as unknown as AstNode) ?? (node as unknown as AstNode));
    if (isDefault) {
      if (!this.hasExportDefault) {
        let n = name;
        if (n === undefined) n = this.emitContext.factory().newGeneratedNameForNode(node as unknown as AstNode);
        this.addExportedBinding(node as unknown as AstNode, n);
        this.hasExportDefault = true;
      }
    } else {
      let n = name;
      if (n === undefined) n = functionDeclarationName(node);
      const nameText = nodeText(n);
      if (this.addUniqueExport(nameText)) {
        this.addExportedBinding(node as unknown as AstNode, n);
      }
    }
  }

  collectExportedVariableInfo(decl: AstNode): void {
    const declName = nodeName(decl);
    if (declName !== undefined && isBindingPattern(declName)) {
      for (const element of bindingPatternElements(declName)) {
        if (nodeName(element) !== undefined) this.collectExportedVariableInfo(element);
      }
    } else if (declName !== undefined && !this.emitContext.hasAutoGenerateInfo(declName)) {
      const text = nodeText(declName);
      if (this.addUniqueExport(text)) {
        this.addExportedName(declName);
        if (isLocalName(this.emitContext as unknown as never, declName as never)) {
          this.addExportedBinding(decl, declName);
        }
      }
    }
  }
}

export function collectExternalModuleInfo(
  sourceFile: SourceFile,
  compilerOptions: CompilerOptions,
  emitContext: EmitContext,
  resolver: ReferenceResolver,
): ExternalModuleInfo {
  return new ExternalModuleInfoCollector(sourceFile, compilerOptions, emitContext, resolver).collect();
}

// ---------------------------------------------------------------------------
// External helpers import
// ---------------------------------------------------------------------------

export const externalHelpersModuleNameText = "tslib";

export function createExternalHelpersImportDeclarationIfNeeded(
  emitContext: EmitContext,
  sourceFile: SourceFile,
  compilerOptions: CompilerOptions,
  fileModuleKind: number,
  hasExportStarsToExportValues: boolean,
  hasImportStar: boolean,
  hasImportDefault: boolean,
): AstNode | undefined {
  if (compilerOptionsImportHelpers(compilerOptions) && isEffectiveExternalModule(sourceFile, compilerOptions)) {
    const moduleKind = compilerOptionsGetEmitModuleKind(compilerOptions);
    const helpers = getImportedHelpers(emitContext, sourceFile);
    if (
      fileModuleKind === ModuleKind.CommonJS ||
      (fileModuleKind === ModuleKind.None && moduleKind === ModuleKind.CommonJS)
    ) {
      const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(
        emitContext,
        sourceFile,
        compilerOptions,
        helpers,
        hasExportStarsToExportValues,
        hasImportStar || hasImportDefault,
        fileModuleKind,
      );
      if (externalHelpersModuleName !== undefined) {
        const externalHelpersImportDeclaration = emitContext.factory().newImportEqualsDeclaration(
          undefined,
          false,
          externalHelpersModuleName,
          emitContext.factory().newExternalModuleReference(emitContext.factory().newStringLiteral(externalHelpersModuleNameText, TokenFlags.None)),
        );
        emitContext.addEmitFlags(externalHelpersImportDeclaration, EmitFlags.CustomPrologue);
        return externalHelpersImportDeclaration;
      }
    } else {
      const helperNames: string[] = [];
      for (const helper of helpers) {
        const importName = emitHelperImportName(helper);
        if (importName.length > 0 && !helperNames.includes(importName)) helperNames.push(importName);
      }
      if (helperNames.length > 0) {
        helperNames.sort();
        const importSpecifiers: AstNode[] = helperNames.map((name) => {
          if (isFileLevelUniqueName(sourceFile, name, undefined)) {
            return emitContext.factory().newImportSpecifier(false, undefined, emitContext.factory().newIdentifier(name));
          }
          return emitContext.factory().newImportSpecifier(false, emitContext.factory().newIdentifier(name), emitContext.factory().newUnscopedHelperName(name));
        });
        const namedBindings = emitContext.factory().newNamedImports(emitContext.factory().newNodeList(importSpecifiers));
        const parseNode = emitContext.mostOriginal(sourceFile as unknown as AstNode);
        if (parseNode !== undefined) emitContext.addEmitFlags(parseNode, EmitFlags.ExternalHelpers);

        const externalHelpersImportDeclaration = emitContext.factory().newImportDeclaration(
          undefined,
          emitContext.factory().newImportClause(Kind.Unknown, undefined, namedBindings),
          emitContext.factory().newStringLiteral(externalHelpersModuleNameText, TokenFlags.None),
          undefined,
        );

        emitContext.addEmitFlags(externalHelpersImportDeclaration, EmitFlags.CustomPrologue);
        return externalHelpersImportDeclaration;
      }
    }
  }
  return undefined;
}

function getImportedHelpers(emitContext: EmitContext, sourceFile: SourceFile): EmitHelper[] {
  const helpers: EmitHelper[] = [];
  for (const helper of emitContext.getEmitHelpers(sourceFile as unknown as AstNode)) {
    if (!emitHelperScoped(helper)) helpers.push(helper);
  }
  return helpers;
}

function getOrCreateExternalHelpersModuleNameIfNeeded(
  emitContext: EmitContext,
  node: SourceFile,
  compilerOptions: CompilerOptions,
  helpers: EmitHelper[],
  hasExportStarsToExportValues: boolean,
  hasImportStarOrImportDefault: boolean,
  fileModuleKind: number,
): AstNode | undefined {
  let externalHelpersModuleName = emitContext.getExternalHelpersModuleName(node);
  if (externalHelpersModuleName !== undefined) return externalHelpersModuleName;

  const create =
    helpers.length > 0 ||
    ((hasExportStarsToExportValues || hasImportStarOrImportDefault) && fileModuleKind < ModuleKind.System);

  if (create) {
    externalHelpersModuleName = emitContext.factory().newUniqueName(externalHelpersModuleNameText);
    emitContext.setExternalHelpersModuleName(node, externalHelpersModuleName);
  }

  return externalHelpersModuleName;
}

// ---------------------------------------------------------------------------
// Default-reference detection
// ---------------------------------------------------------------------------

function isNamedDefaultReference(e: AstNode): boolean {
  return moduleExportNameIsDefault(exportSpecifierPropertyNameOrName(e));
}

export function containsDefaultReference(node: AstNode | undefined): boolean {
  return (
    node !== undefined &&
    (isNamedImports(node) || isNamedExports(node)) &&
    namedElements(node).some(isNamedDefaultReference)
  );
}

export function getExportNeedsImportStarHelper(node: ExportDeclaration): boolean {
  return getNamespaceDeclarationNode(node as unknown as AstNode) !== undefined;
}

export function getImportNeedsImportStarHelper(node: ImportDeclaration): boolean {
  if (getNamespaceDeclarationNode(node as unknown as AstNode) !== undefined) return true;
  const importClause = importDeclarationImportClause(node);
  if (importClause === undefined) return false;
  const bindings = importClauseNamedBindings(importClause);
  if (bindings === undefined) return false;
  if (!isNamedImports(bindings)) return false;
  const elements = namedElements(bindings);
  let defaultRefCount = 0;
  for (const binding of elements) {
    if (isNamedDefaultReference(binding)) defaultRefCount++;
  }
  return (defaultRefCount > 0 && defaultRefCount !== elements.length) ||
    (elements.length - defaultRefCount !== 0 && isDefaultImport(node as unknown as AstNode));
}

export function getImportNeedsImportDefaultHelper(node: ImportDeclaration): boolean {
  if (getImportNeedsImportStarHelper(node)) return false;
  if (isDefaultImport(node as unknown as AstNode)) return true;
  const importClause = importDeclarationImportClause(node);
  if (importClause === undefined) return false;
  const bindings = importClauseNamedBindings(importClause);
  return bindings !== undefined && isNamedImports(bindings) && containsDefaultReference(bindings);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext {
  factory(): Factory;
  mostOriginal(node: AstNode): AstNode | undefined;
  hasAutoGenerateInfo(node: AstNode): boolean;
  getEmitHelpers(node: AstNode): readonly EmitHelper[];
  getExternalHelpersModuleName(node: SourceFile): AstNode | undefined;
  setExternalHelpersModuleName(node: SourceFile, name: AstNode): void;
  addEmitFlags(node: AstNode, flags: number): void;
}

interface Factory {
  newGeneratedNameForNode(node: AstNode): AstNode;
  newIdentifier(name: string): AstNode;
  newStringLiteral(text: string, flags: number): AstNode;
  newImportEqualsDeclaration(modifiers: unknown, isTypeOnly: boolean, name: AstNode, moduleReference: AstNode): AstNode;
  newExternalModuleReference(specifier: AstNode): AstNode;
  newImportDeclaration(modifiers: unknown, importClause: AstNode, moduleSpecifier: AstNode, attributes: unknown): AstNode;
  newImportClause(phaseModifier: number, name: AstNode | undefined, namedBindings: AstNode | undefined): AstNode;
  newImportSpecifier(isTypeOnly: boolean, propertyName: AstNode | undefined, name: AstNode): AstNode;
  newNamedImports(elements: unknown): AstNode;
  newNodeList<T extends AstNode>(items: readonly T[]): unknown;
  newUnscopedHelperName(name: string): AstNode;
  newUniqueName(name: string): AstNode;
}

interface CompilerOptions { readonly _opts?: unknown; readonly [key: string]: unknown }
interface ReferenceResolver {
  getReferencedImportDeclaration(node: AstNode): AstNode | undefined;
  getReferencedValueDeclaration(node: AstNode): AstNode | undefined;
}
interface EmitHelper { readonly _h: unknown }

// Strada helpers not yet wired to ast/index.js
declare function isNotEmittedStatement(node: AstNode): boolean;
declare function namespaceExportName(node: AstNode): AstNode;
declare function functionDeclarationName(node: FunctionDeclaration): AstNode;
declare function compilerOptionsImportHelpers(opts: CompilerOptions): boolean;
declare function compilerOptionsGetEmitModuleKind(opts: CompilerOptions): number;
declare function isFileLevelUniqueName(file: SourceFile, name: string, hasGlobalName: ((name: string) => boolean) | undefined): boolean;
declare function emitHelperImportName(helper: EmitHelper): string;
declare function emitHelperScoped(helper: EmitHelper): boolean;
