import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(toolDirectory, "..", "..");
const sourceRoot = join(packageRoot, "src", "internal", "bundled", "libs");
const destinationRoot = join(packageRoot, "dist", "src", "internal", "bundled", "libs");
const generatedIndex = join(packageRoot, "dist", "src", "internal", "bundled", "libs_generated.js");

if (!existsSync(generatedIndex)) {
  throw new Error(`Bundled library index was not built: ${generatedIndex}`);
}

const { LibNames } = await import(pathToFileURL(generatedIndex).href);
const expectedNames = [...LibNames];
const sourceNames = readdirSync(sourceRoot)
  .filter((name) => name.endsWith(".d.ts"))
  .sort((left, right) => left.localeCompare(right));

assertExactLibraryNames(expectedNames, sourceNames, "source bundled-library directory");
mkdirSync(destinationRoot, { recursive: true });

for (const name of expectedNames) {
  if (!/^lib(?:\.[A-Za-z0-9_-]+)*\.d\.ts$/.test(name)) {
    throw new Error(`Bundled library index contains an invalid file name: ${JSON.stringify(name)}`);
  }
  copyFileSync(join(sourceRoot, name), join(destinationRoot, name));
}

const destinationNames = readdirSync(destinationRoot)
  .filter((name) => name.endsWith(".d.ts"))
  .sort((left, right) => left.localeCompare(right));
assertExactLibraryNames(expectedNames, destinationNames, "built bundled-library directory");

console.log(`Copied ${expectedNames.length} indexed bundled libraries into the built package.`);

function assertExactLibraryNames(expected, actual, description) {
  if (expected.length !== actual.length || expected.some((name, index) => name !== actual[index])) {
    const expectedSet = new Set(expected);
    const actualSet = new Set(actual);
    const missing = expected.filter((name) => !actualSet.has(name));
    const extra = actual.filter((name) => !expectedSet.has(name));
    throw new Error(`${description} differs from LibNames (missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}).`);
  }
}
