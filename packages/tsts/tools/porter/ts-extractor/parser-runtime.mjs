// Parser loading and freshness checks for TS-side signature extraction.

import { existsSync, statSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
// .../packages/tsts/tools/porter/ts-extractor -> .../packages/tsts
const pkgRoot = join(here, "../../..");
const distInternal = join(pkgRoot, "dist/src/internal");
const srcInternal = join(pkgRoot, "src/internal");
const parserEntry = join(distInternal, "parser/parser/statements-declarations.js");

// --- dist presence + freshness ------------------------------------------------

function newestMtimeMs(dir, exts) {
  // Recursive newest mtime of files with the given extensions under dir.
  let newest = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const d = stack.pop();
    let entries;
    try {
      entries = readdirSync(d, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = join(d, e.name);
      if (e.isDirectory()) {
        stack.push(p);
      } else if (exts.some((x) => e.name.endsWith(x))) {
        const m = statSync(p).mtimeMs;
        if (m > newest) newest = m;
      }
    }
  }
  return newest;
}

// Asserts dist is present and not stale relative to src. Throws a clear,
// actionable error otherwise. mtime is used as a bootstrap freshness guard
// (deterministic enough for "did sources change after the build artifact").
// `distRoot`/`srcDirs` are absolute; default to the in-repo tsts layout.
export function assertDistFresh(distRoot = distInternal, srcDirs) {
  const entry = join(distRoot, "parser/parser/statements-declarations.js");
  if (!existsSync(entry)) {
    throw new Error(
      `TS parser dist not built (missing ${entry}).\n` +
        `Build the parser package first (e.g. npm run build).`,
    );
  }
  const distMtime = statSync(entry).mtimeMs;
  const watched = srcDirs ?? ["parser", "ast", "scanner", "core"].map((d) => join(srcInternal, d));
  let newestSrc = 0;
  for (const w of watched) {
    const m = newestMtimeMs(w, [".ts"]);
    if (m > newestSrc) newestSrc = m;
  }
  if (newestSrc > distMtime) {
    throw new Error(
      `TS parser dist is stale: parser/ast/scanner/core sources changed after the build artifact.\n` +
        `Rebuild dist before running the signature checker (npm run build).`,
    );
  }
}

// --- parser loading (dynamic, after the freshness gate) -----------------------

const parserApisByDistRoot = new Map();

// opts (optional): { distRoot, freshnessSrcDirs } absolute paths from the project
// profile; defaults to the in-repo tsts dist layout.
export async function loadParser(opts = {}) {
  const distRoot = resolve(opts.distRoot ?? distInternal);
  assertDistFresh(distRoot, opts.freshnessSrcDirs);
  let loading = parserApisByDistRoot.get(distRoot);
  if (loading === undefined) {
    loading = loadParserApi(distRoot);
    parserApisByDistRoot.set(distRoot, loading);
  }
  try {
    return await loading;
  } catch (error) {
    if (parserApisByDistRoot.get(distRoot) === loading) parserApisByDistRoot.delete(distRoot);
    throw error;
  }
}

async function loadParserApi(distRoot) {
  const Kinds = await import(join(distRoot, "ast/generated/kinds.js"));
  const Flags = await import(join(distRoot, "ast/generated/flags.js"));
  const Casts = await import(join(distRoot, "ast/generated/casts.js"));
  const Ast = await import(join(distRoot, "ast/ast.js"));
  const Diagnostics = await import(join(distRoot, "ast/diagnostic.js"));
  const ScannerUtilities = await import(join(distRoot, "scanner/utilities.js"));
  const { ParseSourceFile } = await import(join(distRoot, "parser/parser/statements-declarations.js"));
  const jsdocParser = await import(join(distRoot, "parser/jsdoc.js"));
  const { ScriptKindTS } = await import(join(distRoot, "core/scriptkind.js"));
  const { Node_End, Node_ForEachChild, Node_Pos } = await import(join(distRoot, "ast/spine.js"));
  jsdocParser.init();

  const kindName = new Map();
  for (const [key, value] of Object.entries(Kinds)) {
    if (key.startsWith("Kind") && typeof value === "number") kindName.set(value, key);
  }
  return {
    Kinds,
    Flags,
    Casts,
    ParseSourceFile,
    ScriptKindTS,
    Node_Pos,
    Node_End,
    Node_ForEachChild,
    Node_JSDoc: Ast.Node_JSDoc,
    SourceFile_Diagnostics: Ast.SourceFile_Diagnostics,
    SourceFile_JSDocDiagnostics: Ast.SourceFile_JSDocDiagnostics,
    Diagnostic_Code: Diagnostics.Diagnostic_Code,
    Diagnostic_Pos: Diagnostics.Diagnostic_Pos,
    Diagnostic_End: Diagnostics.Diagnostic_End,
    GetTextOfNodeFromSourceText: ScannerUtilities.GetTextOfNodeFromSourceText,
    kindName,
    distRoot,
  };
}

export function parseSource(api, fileName, sourceText) {
  // ParseSourceFile requires a normalized absolute path.
  const abs = fileName.startsWith("/") ? fileName : `/${fileName}`;
  return api.ParseSourceFile({ FileName: abs, Path: abs }, sourceText, api.ScriptKindTS);
}
