/**
 * Module-reference collection.
 *
 * Port of TS-Go `internal/parser/references.go` (~71 LoC). Walks a
 * SourceFile's top-level statements collecting external module
 * references (`import`, `export`, dynamic `import(...)`, `require(...)`,
 * ambient `module "x" {}` declarations + augmentations).
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";
import {
  hasSyntacticModifier, getNodeFlags, isInJSFile, isExternalModule,
} from "../ast/index.js";
import {
  isStringLiteral, isModuleDeclaration,
} from "../ast/index.js";
import { NodeFlags } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { Tristate } from "../core/tristate.js";

export function collectExternalModuleReferences(file: SourceFile): void {
  for (const node of getStatements(file)) {
    collectModuleReferences(file, node, false);
  }
  if ((getNodeFlags(file as unknown as AstNode) & NodeFlags.PossiblyContainsDynamicImport) !== 0
    || isInJSFile(file as unknown as AstNode)) {
    forEachDynamicImportOrRequireCall(file, true, true, (node, moduleSpecifier) => {
      void node;
      addImport(file, moduleSpecifier);
      return false;
    });
  }
}

function collectModuleReferences(file: SourceFile, node: AstNode, inAmbientModule: boolean): void {
  if (isAnyImportOrReExport(node)) {
    const moduleNameExpr = getExternalModuleName(node);
    if (moduleNameExpr !== undefined && isStringLiteral(moduleNameExpr)) {
      const moduleName = getLiteralText(moduleNameExpr);
      if (moduleName !== "" && (!inAmbientModule || !isExternalModuleNameRelative(moduleName))) {
        addImport(file, moduleNameExpr);
        if (getUsesUriStyleNodeCoreModules(file) !== Tristate.True && !isDeclarationFile(file)) {
          if (moduleName.startsWith("node:") && !ExclusivelyPrefixedNodeCoreModules[moduleName]) {
            setUsesUriStyleNodeCoreModules(file, Tristate.True);
          } else if (getUsesUriStyleNodeCoreModules(file) === Tristate.Unknown
            && UnprefixedNodeCoreModules[moduleName]) {
            setUsesUriStyleNodeCoreModules(file, Tristate.False);
          }
        }
      }
    }
    return;
  }
  if (isModuleDeclaration(node) && isAmbientModule(node)
    && (inAmbientModule || hasSyntacticModifier(node, ModifierFlags.Ambient) || isDeclarationFile(file))) {
    const name = getModuleDeclarationName(node);
    const nameText = getLiteralText(name);
    if (isExternalModule(file) || (inAmbientModule && !isExternalModuleNameRelative(nameText))) {
      addModuleAugmentation(file, name);
    } else if (!inAmbientModule) {
      addAmbientModuleName(file, nameText);
      const body = getModuleDeclarationBody(node);
      if (body !== undefined) {
        for (const statement of getStatements(body)) {
          collectModuleReferences(file, statement, true);
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

// Forward-declared helpers — full ports come with parser body completion.
declare const ExclusivelyPrefixedNodeCoreModules: Record<string, boolean>;
declare const UnprefixedNodeCoreModules: Record<string, boolean>;
declare function getStatements(file: SourceFile | AstNode): readonly AstNode[];
declare function forEachDynamicImportOrRequireCall(
  file: SourceFile, includeTypeSpaceImports: boolean, requireStringLiteralLikeArgument: boolean,
  cb: (node: AstNode, moduleSpecifier: AstNode) => boolean,
): void;
declare function addImport(file: SourceFile, moduleSpecifier: AstNode): void;
declare function isAnyImportOrReExport(node: AstNode): boolean;
declare function getExternalModuleName(node: AstNode): AstNode | undefined;
declare function getLiteralText(node: AstNode): string;
declare function isExternalModuleNameRelative(name: string): boolean;
declare function isDeclarationFile(file: SourceFile): boolean;
declare function getUsesUriStyleNodeCoreModules(file: SourceFile): number;
declare function setUsesUriStyleNodeCoreModules(file: SourceFile, value: number): void;
declare function isAmbientModule(node: AstNode): boolean;
declare function getModuleDeclarationName(node: AstNode): AstNode;
declare function getModuleDeclarationBody(node: AstNode): AstNode | undefined;
declare function addModuleAugmentation(file: SourceFile, name: AstNode): void;
declare function addAmbientModuleName(file: SourceFile, name: string): void;
