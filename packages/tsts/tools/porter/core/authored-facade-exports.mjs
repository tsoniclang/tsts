import ts from "typescript";

import { resolveRepo } from "./runtime.mjs";

export function buildAuthoredFacadeExportIndex(relativePaths) {
  const paths = [...new Set(relativePaths)].sort();
  const rootNames = paths.map(resolveRepo);
  const program = ts.createProgram({
    rootNames,
    options: {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      noEmit: true,
      skipLibCheck: true,
      target: ts.ScriptTarget.ESNext,
      types: [],
    },
  });
  const checker = program.getTypeChecker();
  const output = new Map();
  for (const [index, relativePath] of paths.entries()) {
    const sourceFile = program.getSourceFile(rootNames[index]);
    if (sourceFile === undefined) {
      output.set(relativePath, { error: "authored facade module does not exist", symbols: new Map() });
      continue;
    }
    const syntaxErrors = program.getSyntacticDiagnostics(sourceFile);
    if (syntaxErrors.length > 0) {
      output.set(relativePath, {
        error: `authored facade module has a syntax error: ${formatDiagnostic(syntaxErrors[0])}`,
        symbols: new Map(),
      });
      continue;
    }
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (moduleSymbol === undefined) {
      output.set(relativePath, { error: "authored facade module has no external-module symbol", symbols: new Map() });
      continue;
    }
    const symbols = new Map();
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      const resolved = resolveAlias(checker, exported);
      symbols.set(exported.getName(), {
        type: (resolved.flags & ts.SymbolFlags.Type) !== 0,
        value: (resolved.flags & ts.SymbolFlags.Value) !== 0,
      });
    }
    output.set(relativePath, { error: undefined, symbols });
  }
  return output;
}

function resolveAlias(checker, symbol) {
  if ((symbol.flags & ts.SymbolFlags.Alias) === 0) return symbol;
  const resolved = checker.getAliasedSymbol(symbol);
  return resolved === undefined ? symbol : resolved;
}

function formatDiagnostic(diagnostic) {
  return ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
}
