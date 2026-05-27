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

// Node-core module tables. Both are conservative subsets that cover the
// common cases. Full Strada tables are larger and version-tracked;
// updates land with the module-resolver port.
const NODE_CORE = [
  "assert", "async_hooks", "buffer", "child_process", "cluster", "console",
  "constants", "crypto", "dgram", "dns", "domain", "events", "fs", "http",
  "http2", "https", "inspector", "module", "net", "os", "path", "perf_hooks",
  "process", "punycode", "querystring", "readline", "repl", "stream",
  "string_decoder", "sys", "timers", "tls", "trace_events", "tty", "url",
  "util", "v8", "vm", "wasi", "worker_threads", "zlib",
] as const;
const UnprefixedNodeCoreModules: Record<string, boolean> = (() => {
  const m: Record<string, boolean> = {};
  for (const n of NODE_CORE) m[n] = true;
  return m;
})();
const ExclusivelyPrefixedNodeCoreModules: Record<string, boolean> = {
  // Node modules that *only* exist under the `node:` prefix.
  "test": true,
  "test/reporters": true,
  "sea": true,
};

function getStatements(file: SourceFile | AstNode): readonly AstNode[] {
  const stmts = (file as unknown as { statements?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).statements;
  if (stmts === undefined) return [];
  const inner = (stmts as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? (stmts as readonly AstNode[]);
}
function forEachDynamicImportOrRequireCall(
  file: SourceFile, includeTypeSpaceImports: boolean, requireStringLiteralLikeArgument: boolean,
  cb: (node: AstNode, moduleSpecifier: AstNode) => boolean,
): void {
  void includeTypeSpaceImports;
  // Walk the AST. For each CallExpression whose callee is the
  // ImportKeyword (dynamic import) or `require` Identifier, extract
  // the first string-literal argument and invoke cb.
  const walk = (node: AstNode | undefined): boolean => {
    if (node === undefined) return false;
    const k = (node as { kind?: number }).kind;
    if (k === 213 /* CallExpression */) {
      const expr = (node as unknown as { expression?: { kind?: number; text?: string } }).expression;
      const exprKind = expr?.kind;
      const isImport = exprKind === 102 /* ImportKeyword */;
      const isRequire = exprKind === 80 /* Identifier */ && expr?.text === "require";
      if (isImport || isRequire) {
        const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
        const first = args?.[0];
        if (first !== undefined) {
          const firstKind = (first as { kind?: number }).kind;
          if (!requireStringLiteralLikeArgument || firstKind === 11 /* StringLiteral */ || firstKind === 15 /* NoSubstitutionTemplateLiteral */) {
            if (cb(node, first)) return true;
          }
        }
      }
    }
    // Recurse into children (typed-AST visitor when available).
    const visitChildren = (n: AstNode): boolean => {
      for (const key of Object.keys(n as object)) {
        if (key === "parent") continue;
        const v = (n as unknown as Record<string, unknown>)[key];
        if (v === null || v === undefined) continue;
        if (Array.isArray(v)) {
          for (const item of v as unknown[]) {
            if (item !== null && typeof item === "object" && "kind" in (item as object)) {
              if (walk(item as AstNode)) return true;
            }
          }
        } else if (typeof v === "object" && "kind" in (v as object)) {
          if (walk(v as AstNode)) return true;
        } else if (typeof v === "object" && "nodes" in (v as object)) {
          const arr = (v as { nodes?: readonly AstNode[] }).nodes;
          if (arr !== undefined) {
            for (const item of arr) if (walk(item)) return true;
          }
        }
      }
      return false;
    };
    return visitChildren(node);
  };
  for (const stmt of getStatements(file)) walk(stmt);
}
function addImport(file: SourceFile, moduleSpecifier: AstNode): void {
  const arr = (file as unknown as { imports?: AstNode[] }).imports;
  if (arr !== undefined) arr.push(moduleSpecifier);
}
function isAnyImportOrReExport(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind;
  // 271 ImportDeclaration, 270 ImportEqualsDeclaration, 277 ExportDeclaration, 276 ExportAssignment
  return k === 271 || k === 270 || k === 277 || k === 276;
}
function getExternalModuleName(node: AstNode): AstNode | undefined {
  return (node as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
}
function getLiteralText(node: AstNode): string {
  return (node as unknown as { text?: string }).text ?? "";
}
function isExternalModuleNameRelative(name: string): boolean {
  if (name.length === 0) return false;
  return name.startsWith("./") || name.startsWith("../") || name === "." || name === "..";
}
function isDeclarationFile(file: SourceFile): boolean {
  return (file as unknown as { isDeclarationFile?: boolean }).isDeclarationFile === true;
}
function getUsesUriStyleNodeCoreModules(file: SourceFile): number {
  return (file as unknown as { usesUriStyleNodeCoreModules?: number }).usesUriStyleNodeCoreModules ?? 0;
}
function setUsesUriStyleNodeCoreModules(file: SourceFile, value: number): void {
  (file as unknown as { usesUriStyleNodeCoreModules?: number }).usesUriStyleNodeCoreModules = value;
}
function isAmbientModule(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== 272 /* ModuleDeclaration */) return false;
  const name = (node as unknown as { name?: { kind?: number } }).name;
  return name?.kind === 10 /* StringLiteral */;
}
function getModuleDeclarationName(node: AstNode): AstNode {
  return (node as unknown as { name: AstNode }).name;
}
function getModuleDeclarationBody(node: AstNode): AstNode | undefined {
  return (node as unknown as { body?: AstNode }).body;
}
function addModuleAugmentation(file: SourceFile, name: AstNode): void {
  const arr = (file as unknown as { moduleAugmentations?: AstNode[] }).moduleAugmentations;
  if (arr !== undefined) arr.push(name);
}
function addAmbientModuleName(file: SourceFile, name: string): void {
  const arr = (file as unknown as { ambientModuleNames?: string[] }).ambientModuleNames;
  if (arr !== undefined) arr.push(name);
}
void ExclusivelyPrefixedNodeCoreModules; void UnprefixedNodeCoreModules;
