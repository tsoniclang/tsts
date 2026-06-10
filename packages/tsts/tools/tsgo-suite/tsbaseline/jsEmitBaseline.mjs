// Faithful JS port of internal/testutil/tsbaseline/js_emit_baseline.go (pinned TS-Go),
// assembling the `<case>.js` whole-file baseline from the case inputs plus the emitted
// JS/DTS outputs in program source order (mirroring harnessutil's inputsAndOutputs
// population), the JSON-output parse-error baselines, and the //// [DtsFileErrors]
// block (the declaration recompile's error baseline). Differences from the Go
// original, each justified:
// - The noCheck-repeat comparison ("!!!! File ... differs from original emit") is not
//   ported yet; a reference baseline containing those markers fails the whole-file
//   comparison loudly rather than silently passing.
// - Sections are assembled with \n and compared after newline normalization (the suite
//   normalizes both sides), where Go writes \r\n.
import { getErrorBaseline } from "./errorBaseline.mjs";

const distRoot = new URL("../../../dist/src/", import.meta.url);
const dist = (p) => import(new URL(p, distRoot).href);

const [
  { Program_GetSourceFiles },
  { newEmitHost, emitHost_as_outputpaths_OutputPathsHost, emitHost_Options },
  { GetOutputPathsFor, OutputPaths_JsFilePath, OutputPaths_DeclarationFilePath, OutputPaths_SourceMapFilePath },
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
export function fileOutput(file, fullEmitPaths) {
  const fileName = fullEmitPaths ? removeTestPathPrefixes(file.unitName) : GetBaseFileName(file.unitName);
  return `//// [${fileName}]\n${file.content}`;
}

function compareTestFiles(a, b) {
  return a.unitName < b.unitName ? -1 : a.unitName > b.unitName ? 1 : 0;
}

// harnessutil.go compilation-output population: pair each non-declaration program source
// file (in program order) with its computed output paths, then append stragglers sorted
// by unit name. `emittedOutputs` is keyed in the program's own coordinates (the vfs
// paths the harness WriteFile override received), which are exactly the paths
// GetOutputPathsFor computes.
export function orderedEmittedFiles(program, emittedOutputs) {
  const js = new Map();
  const dts = new Map();
  const maps = new Map();
  for (const [name, content] of emittedOutputs) {
    if (/\.d\.[cm]?ts$/i.test(name)) {
      dts.set(name, content);
    } else if (/\.map$/i.test(name)) {
      maps.set(name, content);
    } else if (/\.[cm]?jsx?$/i.test(name)) {
      js.set(name, content);
    }
  }
  const JS = [];
  const DTS = [];
  const Maps = [];
  const take = (map, into, outputPath) => {
    if (outputPath === undefined || outputPath === "") {
      return;
    }
    if (map.has(outputPath)) {
      into.push({ unitName: outputPath, content: map.get(outputPath) });
      map.delete(outputPath);
    }
  };
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const fileName = SourceFile_FileName(sourceFile);
    if (fileName.startsWith("bundled:") || IsDeclarationFileName(fileName)) {
      continue;
    }
    const [emitHost, done] = newEmitHost(Background(), program, sourceFile);
    try {
      const host = emitHost_as_outputpaths_OutputPathsHost(emitHost);
      const paths = GetOutputPathsFor(sourceFile, emitHost_Options(emitHost), host, false);
      take(js, JS, OutputPaths_JsFilePath(paths));
      take(dts, DTS, OutputPaths_DeclarationFilePath(paths));
      // harnessutil pairs only the JS source map (extname+".map"); declaration maps are
      // never paired and always land in the name-sorted leftovers.
      take(maps, Maps, OutputPaths_SourceMapFilePath(paths));
    } finally {
      done();
    }
  }
  // add any unhandled outputs, ordered by unit name
  JS.push(...[...js].map(([rel, content]) => ({ unitName: rel, content })).sort(compareTestFiles));
  DTS.push(...[...dts].map(([rel, content]) => ({ unitName: rel, content })).sort(compareTestFiles));
  Maps.push(...[...maps].map(([rel, content]) => ({ unitName: rel, content })).sort(compareTestFiles));
  return { JS, DTS, Maps };
}

// js_emit_baseline.go DoJSEmitBaseline (assembly portion)
export function generateJsEmitBaseline({ program, toBeCompiled, otherFiles, tsConfigFiles, header, hasDiagnostics, fullEmitPaths, emittedOutputs, declarationCompilation }) {
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

  const { JS, DTS } = orderedEmittedFiles(program, emittedOutputs);

  let jsCode = "";
  for (const file of JS) {
    if (jsCode.length > 0 && !jsCode.endsWith("\n")) {
      jsCode += "\n";
    }
    if (!hasDiagnostics && file.unitName.endsWith(".json")) {
      const parseResult = ParseSourceFile({ FileName: file.unitName, Path: file.unitName }, file.content, ScriptKindJSON);
      const parseDiagnostics = SourceFile_Diagnostics(parseResult) ?? [];
      if (parseDiagnostics.length > 0) {
        jsCode += getErrorBaseline([file], parseDiagnostics);
        continue;
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

  if (declarationCompilation !== undefined && (declarationCompilation.declResult.diagnostics ?? []).length > 0) {
    jsCode += "\n\n//// [DtsFileErrors]\n";
    jsCode += "\n\n";
    jsCode += getErrorBaseline(
      [...(tsConfigFiles ?? []), ...declarationCompilation.declInputFiles, ...declarationCompilation.declOtherFiles],
      declarationCompilation.declResult.diagnostics,
    );
  }

  if (jsCode.length > 0) {
    return `${tsCode}\n\n${jsCode}`;
  }
  return NoContent;
}
