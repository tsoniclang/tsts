// Faithful JS port of internal/testutil/tsbaseline/js_emit_baseline.go (pinned TS-Go),
// assembling the `<case>.js` whole-file baseline from the case inputs plus the emitted
// JS/DTS outputs in program source order (mirroring harnessutil's inputsAndOutputs
// population). Differences from the Go original, each justified:
// - The DtsFileErrors block (a second compilation of the emitted declaration files) is not
//   ported yet; no current-corpus reference baseline contains "//// [DtsFileErrors]". If a
//   declaration-compilation diagnostic case ever appears, the whole-file comparison fails
//   loudly rather than silently passing.
// - The noCheck-repeat comparison ("!!!! File ... differs from original emit") is not
//   ported yet; no current-corpus reference baseline contains those markers.
// - Sections are assembled with \n and compared after newline normalization (the suite
//   normalizes both sides), where Go writes \r\n.
import { relative, sep } from "node:path";

const distRoot = new URL("../../../dist/src/", import.meta.url);
const dist = (p) => import(new URL(p, distRoot).href);

const [
  { Program_GetSourceFiles },
  { newEmitHost, emitHost_as_outputpaths_OutputPathsHost, emitHost_Options },
  { GetOutputPathsFor, OutputPaths_JsFilePath, OutputPaths_DeclarationFilePath },
  { SourceFile_FileName, SourceFile_Diagnostics },
  { IsDeclarationFileName },
  { GetBaseFileName },
  { ParseSourceFile },
  { ScriptKindJSON },
  { Background },
] = await Promise.all([
  dist("internal/compiler/program.js"),
  dist("internal/compiler/emitHost.js"),
  dist("internal/outputpaths/outputpaths.js"),
  dist("internal/ast/ast.js"),
  dist("internal/tspath/extension.js"),
  dist("internal/tspath/path.js"),
  dist("internal/parser/parser/statements-declarations.js"),
  dist("internal/core/scriptkind.js"),
  dist("go/context.js"),
]);

import { removeTestPathPrefixes } from "./typeSymbolWalker.mjs";

export const NoContent = "<no content>";

// js_emit_baseline.go fileOutput
function fileOutput(file, fullEmitPaths) {
  const fileName = fullEmitPaths ? removeTestPathPrefixes(file.unitName) : GetBaseFileName(file.unitName);
  return `//// [${fileName}]\n${file.content}`;
}

function compareTestFiles(a, b) {
  return a.unitName < b.unitName ? -1 : a.unitName > b.unitName ? 1 : 0;
}

// harnessutil.go compilation-output population: pair each non-declaration program source
// file (in program order) with its computed output paths, then append stragglers sorted
// by unit name.
function orderedEmittedFiles(program, caseDir, emittedOutputs) {
  const js = new Map();
  const dts = new Map();
  for (const [rel, content] of emittedOutputs) {
    if (/\.d\.[cm]?ts$/i.test(rel)) {
      dts.set(rel, content);
    } else if (/\.map$/i.test(rel)) {
      // Source maps are baselined separately (sourcemap_baseline.go), never inside the
      // .js emit baseline.
    } else if (/\.[cm]?jsx?$/i.test(rel)) {
      js.set(rel, content);
    }
  }
  const JS = [];
  const DTS = [];
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const fileName = SourceFile_FileName(sourceFile);
    if (fileName.startsWith("bundled:") || IsDeclarationFileName(fileName)) {
      continue;
    }
    const [emitHost, done] = newEmitHost(Background(), program, sourceFile);
    try {
      const host = emitHost_as_outputpaths_OutputPathsHost(emitHost);
      const paths = GetOutputPathsFor(sourceFile, emitHost_Options(emitHost), host, false);
      const jsPath = OutputPaths_JsFilePath(paths);
      const dtsPath = OutputPaths_DeclarationFilePath(paths);
      if (jsPath !== undefined && jsPath !== "") {
        const rel = relative(caseDir, jsPath).split(sep).join("/");
        if (js.has(rel)) {
          JS.push({ unitName: rel, content: js.get(rel) });
          js.delete(rel);
        }
      }
      if (dtsPath !== undefined && dtsPath !== "") {
        const rel = relative(caseDir, dtsPath).split(sep).join("/");
        if (dts.has(rel)) {
          DTS.push({ unitName: rel, content: dts.get(rel) });
          dts.delete(rel);
        }
      }
    } finally {
      done();
    }
  }
  // add any unhandled outputs, ordered by unit name
  const jsLeftovers = [...js].map(([rel, content]) => ({ unitName: rel, content })).sort(compareTestFiles);
  JS.push(...jsLeftovers);
  const dtsLeftovers = [...dts].map(([rel, content]) => ({ unitName: rel, content })).sort(compareTestFiles);
  DTS.push(...dtsLeftovers);
  return { JS, DTS };
}

// js_emit_baseline.go DoJSEmitBaseline (assembly portion)
export function generateJsEmitBaseline({ caseDir, program, toBeCompiled, otherFiles, header, hasDiagnostics, fullEmitPaths, emittedOutputs }) {
  let tsCode = `//// [${header}] ////\n\n`;
  const tsSources = [...otherFiles, ...toBeCompiled];
  for (let index = 0; index < tsSources.length; index++) {
    const file = tsSources[index];
    tsCode += `//// [${GetBaseFileName(file.unitName)}]\n`;
    tsCode += file.content;
    if (index < tsSources.length - 1) {
      tsCode += "\n";
    }
  }

  const { JS, DTS } = orderedEmittedFiles(program, caseDir, emittedOutputs);

  let jsCode = "";
  for (const file of JS) {
    if (jsCode.length > 0 && !jsCode.endsWith("\n")) {
      jsCode += "\n";
    }
    if (!hasDiagnostics && file.unitName.endsWith(".json")) {
      const parseResult = ParseSourceFile({ FileName: file.unitName, Path: file.unitName }, file.content, ScriptKindJSON);
      const parseDiagnostics = SourceFile_Diagnostics(parseResult) ?? [];
      if (parseDiagnostics.length > 0) {
        throw new Error(`jsEmitBaseline: JSON output '${file.unitName}' has parse diagnostics; the GetErrorBaseline path of js_emit_baseline.go is not ported yet.`);
      }
    }
    jsCode += fileOutput(file, fullEmitPaths);
  }

  if (DTS.length > 0) {
    jsCode += "\n\n";
    for (const declFile of DTS) {
      jsCode += fileOutput(declFile, fullEmitPaths);
    }
  }

  if (jsCode.length > 0) {
    return `${tsCode}\n\n${jsCode}`;
  }
  return NoContent;
}
