import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const stalePathIdentity = /(?:^|\/)[0-9a-f]{32,}(?:\/|\.|$)/u;
const staleSymbolIdentity = /\$(?:goInterface(?:Method|Adapter|Bridge)?|go\$private)_[0-9a-f]{12,}/u;

test("implementation bundles use semantic package and support identities", async () => {
  const product = await readJson(join(repositoryRoot, "gotots.json"));
  const contracts = product.implementations.bundles;
  assert.ok(Array.isArray(contracts) && contracts.length > 0);

  for (const relativeContract of contracts) {
    const contractPath = join(repositoryRoot, relativeContract);
    const bundleRoot = dirname(contractPath);
    const contract = await readJson(contractPath);
    const expectedSource = semanticSourcePath(contract.package);
    assert.equal(contract.source, expectedSource, relativeContract);
    assert.deepEqual(
      contract.certificationSources,
      [...new Set(contract.certificationSources)].sort(),
      relativeContract,
    );

    const tsconfig = await readJson(join(bundleRoot, contract.tsconfig));
    const expectedFiles = new Set([contract.source, ...contract.certificationSources]);
    assert.deepEqual(new Set(tsconfig.files), expectedFiles, relativeContract);

    for (const relativeSource of expectedFiles) {
      assert.doesNotMatch(relativeSource, stalePathIdentity, relativeContract);
      const source = await readFile(join(bundleRoot, relativeSource), "utf8");
      assert.doesNotMatch(source, staleSymbolIdentity, relativeSource);
    }
  }
});

test("product runner imports the selected semantic package", async () => {
  const product = await readJson(join(repositoryRoot, "gotots.json"));
  const goMod = await readFile(join(repositoryRoot, "vendor/typescript-go/go.mod"), "utf8");
  const modulePath = /^module\s+(\S+)$/mu.exec(goMod)?.[1];
  assert.notEqual(modulePath, undefined);
  const packagePath = product.source.package.replace(/^\.\//u, "");
  const expectedImport = `./modules/${modulePath}/${packagePath}/main.js`;
  const runner = await readFile(join(repositoryRoot, "assembly/runner.ts"), "utf8");
  assert.ok(runner.includes(JSON.stringify(expectedImport)));
  assert.doesNotMatch(runner, stalePathIdentity);
});

function semanticSourcePath(packageContract) {
  const version = packageContract.moduleVersion.length === 0
    ? ""
    : `@${packageContract.moduleVersion}`;
  const relativePackage = packageContract.importPath === packageContract.modulePath
    ? "_root"
    : packageContract.importPath.slice(packageContract.modulePath.length + 1);
  return `target/packages/${packageContract.modulePath}${version}/${relativePackage}/package.ts`;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}
