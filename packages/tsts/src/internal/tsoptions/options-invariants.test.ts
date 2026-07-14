import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CompilerOptions } from "../core/compileroptions.js";
import { JsxEmitReactJSX, ModuleDetectionKindForce, ModuleKindESNext, ModuleResolutionKindBundler, NewLineKindLF, ScriptTargetES2022 } from "../core/compileroptions.js";
import { GoZeroInterface, type GoInterface, type GoPtr } from "../../go/compat.js";
import { OrderedMap_Get } from "../collections/ordered_map.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import { OptionsDeclarations } from "./declscompiler.js";
import { jsxOptionMap, moduleDetectionOptionMap, moduleOptionMap, moduleResolutionOptionMap, newLineOptionMap, targetOptionMap } from "./enummaps.js";
import { parseCompilerOptions } from "./parsinghelpers.js";

const compilerOptionsSourcePath = join(process.cwd(), "packages/tsts/src/internal/core/compileroptions.ts");

function compilerOptionJsonKey(fieldName: string): string {
  if (fieldName === "ESModuleInterop") {
    return "esModuleInterop";
  }
  return fieldName.slice(0, 1).toLowerCase() + fieldName.slice(1);
}

function compilerOptionKeys(): string[] {
  const sourceText = readFileSync(compilerOptionsSourcePath, "utf8");
  const body = /export interface CompilerOptions \{([\s\S]*?)\n\}/.exec(sourceText)?.[1];
  assert.ok(body !== undefined, "CompilerOptions interface not found");

  const keys: string[] = [];
  for (const line of body.split("\n")) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\??:/.exec(line);
    if (match === null) {
      continue;
    }
    const fieldName = match[1];
    assert.ok(fieldName !== undefined);
    if (fieldName.startsWith("__")) {
      continue;
    }
    keys.push(compilerOptionJsonKey(fieldName));
  }
  return keys;
}

test("parseCompilerOptions recognizes every CompilerOptions field", () => {
  const missingKeys: string[] = [];
  for (const key of compilerOptionKeys()) {
    const options = {} as CompilerOptions;
    if (!parseCompilerOptions(key, compilerOptionProbeValue(key), options)) {
      missingKeys.push(key);
    }
  }

  assert.deepEqual(missingKeys, []);
});

function compilerOptionProbeValue(key: string): GoInterface<unknown> {
  switch (key) {
    case "jsx":
    case "module":
    case "moduleDetection":
    case "moduleResolution":
    case "newLine":
    case "target":
      return 0;
    default:
      return undefined;
  }
}

test("parseCompilerOptions preserves named enum identity from command-line option maps", () => {
  const options = {} as CompilerOptions;
  assert.equal(parseCompilerOptions("moduleResolution", enumOptionValue(moduleResolutionOptionMap, "bundler"), options), true);
  assert.equal(parseCompilerOptions("target", enumOptionValue(targetOptionMap, "es2022"), options), true);
  assert.equal(parseCompilerOptions("module", enumOptionValue(moduleOptionMap, "esnext"), options), true);
  assert.equal(parseCompilerOptions("moduleDetection", enumOptionValue(moduleDetectionOptionMap, "force"), options), true);
  assert.equal(parseCompilerOptions("jsx", enumOptionValue(jsxOptionMap, "react-jsx"), options), true);
  assert.equal(parseCompilerOptions("newLine", enumOptionValue(newLineOptionMap, "lf"), options), true);

  assert.equal(options.ModuleResolution, ModuleResolutionKindBundler);
  assert.equal(options.Target, ScriptTargetES2022);
  assert.equal(options.Module, ModuleKindESNext);
  assert.equal(options.ModuleDetection, ModuleDetectionKindForce);
  assert.equal(options.Jsx, JsxEmitReactJSX);
  assert.equal(options.NewLine, NewLineKindLF);
});

function enumOptionValue(map: GoPtr<OrderedMap<string, GoInterface<unknown>>>, key: string): GoInterface<unknown> {
  const [value, found] = OrderedMap_Get(map, key, GoZeroInterface);
  assert.equal(found, true);
  return value;
}

test("OptionsDeclarations mirrors the CompilerOptions declaration surface", () => {
  const declarations = new Map<string, string>();
  for (const declaration of OptionsDeclarations) {
    declarations.set(declaration!.Name.toLowerCase(), declaration!.Name);
  }

  const internalOptions = new Set([
    "allownontsextensions",
    "build",
    "configfilepath",
    "nodtsresolution",
    "noemitforjsfiles",
    "pathsbasepath",
    "suppressoutputpathcheck",
  ]);
  const missingDeclarations: string[] = [];

  for (const key of compilerOptionKeys()) {
    const lowerKey = key.toLowerCase();
    if (declarations.has(lowerKey)) {
      declarations.delete(lowerKey);
      continue;
    }
    if (!internalOptions.has(lowerKey)) {
      missingDeclarations.push(key);
    }
  }

  declarations.delete("plugins");

  assert.deepEqual(missingDeclarations, []);
  assert.deepEqual([...declarations.values()].sort(), []);
});

test("OptionsDeclarations marks semantic-diagnostic options as affecting build info", () => {
  const missingBuildInfoFlags: string[] = [];
  for (const option of OptionsDeclarations) {
    if (option!.AffectsSemanticDiagnostics && !option!.AffectsBuildInfo) {
      missingBuildInfoFlags.push(option!.Name);
    }
  }

  assert.deepEqual(missingBuildInfoFlags, []);
});
