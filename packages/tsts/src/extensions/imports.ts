/**
 * ExtensionImportIndex — uniform import recognition over a SourceFile.
 *
 * Extensions frequently need to know whether a local name came from a specific
 * module (e.g. `int` from "@tsonic/core/types.js"). Hand-scanning every import
 * form is error-prone, so this index normalizes all supported forms into flat
 * `ImportBinding` records (spec "Import Recognition"):
 *
 *   import type { int } from "m";              → imported "int",  local "int"
 *   import type { int as int32 } from "m";     → imported "int",  local "int32"
 *   import { out } from "m";                    → imported "out",  local "out"
 *   import * as CoreTypes from "m";             → imported "*",    local "CoreTypes"
 *   import Def from "m";                        → imported "default", local "Def"
 *
 * The local spelling and the imported identity are kept distinct so an alias
 * resolves to its true imported name (`int32` → module::int).
 *
 * Module matching uses the raw specifier text by default; an optional resolver
 * callback lets a caller match on resolved module identity instead (spec
 * "Module Identity"), without this index knowing how resolution works.
 */

import {
  Kind,
  isIdentifier,
  isStringLiteral,
  type Identifier,
  type ImportDeclaration,
  type ModuleExportName,
  type SourceFile,
} from "../ast/index.js";

/** The name forms that appear on an import specifier (alias source or bound name). */
type ImportSpecifierName = ModuleExportName | Identifier;

/** One normalized binding introduced by an import declaration. */
export interface ImportBinding {
  readonly moduleSpecifier: string;
  /** The name as exported by the module ("*" for namespace, "default" for default). */
  readonly importedName: string;
  /** The name bound in the importing file's scope. */
  readonly localName: string;
  readonly isTypeOnly: boolean;
  readonly declaration: ImportDeclaration;
}

/** Lookup surface over a single source file's imports. */
export interface ExtensionImportIndex {
  importsFrom(sourceFile: SourceFile, moduleSpecifier: string): readonly ImportBinding[];
  resolveLocalName(sourceFile: SourceFile, localName: string): ImportBinding | undefined;
}

/**
 * Optional module-identity resolver. Given the importing file and a raw
 * specifier, returns a canonical identity string. When provided, `importsFrom`
 * matches on the resolved identity of both the query and each import; when
 * absent, matching is on raw specifier text.
 */
export type ModuleSpecifierResolver = (
  sourceFile: SourceFile,
  moduleSpecifier: string,
) => string | undefined;

function moduleSpecifierText(declaration: ImportDeclaration): string | undefined {
  const specifier = declaration.moduleSpecifier;
  return isStringLiteral(specifier) ? specifier.text : undefined;
}

/** Read the spelled name of a `ModuleExportName` (Identifier or StringLiteral). */
function exportNameText(name: ImportSpecifierName): string | undefined {
  if (isIdentifier(name)) return name.text;
  if (isStringLiteral(name)) return name.text;
  return undefined;
}

function bindingsOfImport(declaration: ImportDeclaration): readonly ImportBinding[] {
  const moduleSpecifier = moduleSpecifierText(declaration);
  if (moduleSpecifier === undefined) return [];
  const clause = declaration.importClause;
  if (clause === undefined) return [];
  const clauseIsTypeOnly = clause.phaseModifier === Kind.TypeKeyword;

  const defaultBinding: readonly ImportBinding[] = clause.name === undefined
    ? []
    : [{
        moduleSpecifier,
        importedName: "default",
        localName: clause.name.text,
        isTypeOnly: clauseIsTypeOnly,
        declaration,
      }];

  const namedBindings = clause.namedBindings;
  if (namedBindings === undefined) {
    return defaultBinding;
  }

  if (namedBindings.kind === Kind.NamespaceImport) {
    return [
      ...defaultBinding,
      {
        moduleSpecifier,
        importedName: "*",
        localName: namedBindings.name.text,
        isTypeOnly: clauseIsTypeOnly,
        declaration,
      },
    ];
  }

  // NamedImports: each element binds an imported name (with optional alias).
  const namedElements: readonly ImportBinding[] = namedBindings.elements.map(element => {
    const local = element.name.text;
    // propertyName present means `imported as local`; else local IS imported.
    const importedFromAlias = element.propertyName === undefined
      ? undefined
      : exportNameText(element.propertyName);
    const imported = importedFromAlias ?? local;
    return {
      moduleSpecifier,
      importedName: imported,
      localName: local,
      isTypeOnly: clauseIsTypeOnly || element.isTypeOnly,
      declaration,
    };
  });

  return [...defaultBinding, ...namedElements];
}

function allBindings(sourceFile: SourceFile): readonly ImportBinding[] {
  return sourceFile.statements.flatMap(statement =>
    statement.kind === Kind.ImportDeclaration || statement.kind === Kind.JSImportDeclaration
      ? bindingsOfImport(statement as ImportDeclaration)
      : [],
  );
}

/**
 * Build an import index. When `resolveModule` is supplied, module matching is
 * on resolved identity; otherwise on raw specifier text.
 */
export function createExtensionImportIndex(
  resolveModule?: ModuleSpecifierResolver,
): ExtensionImportIndex {
  const identityOf = (sourceFile: SourceFile, specifier: string): string => {
    if (resolveModule === undefined) return specifier;
    return resolveModule(sourceFile, specifier) ?? specifier;
  };

  return {
    importsFrom(sourceFile: SourceFile, moduleSpecifier: string): readonly ImportBinding[] {
      const wanted = identityOf(sourceFile, moduleSpecifier);
      return allBindings(sourceFile).filter(
        binding => identityOf(sourceFile, binding.moduleSpecifier) === wanted,
      );
    },
    resolveLocalName(sourceFile: SourceFile, localName: string): ImportBinding | undefined {
      return allBindings(sourceFile).find(binding => binding.localName === localName);
    },
  };
}
