import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const stalePathIdentity = /(?:^|\/)[0-9a-f]{32,}(?:\/|\.|$)/u;
const staleSymbolIdentity = /\$(?:goInterface(?:Method|Adapter|Bridge)?|go\$private)_[0-9a-f]{12,}/u;

test("package implementations use semantic package and support identities", async () => {
  const product = await readJson(join(repositoryRoot, "gotots.json"));
  const contracts = product.implementations.packages;
  assert.ok(Array.isArray(contracts) && contracts.length > 0);

  for (const relativeContract of contracts) {
    const contractPath = join(repositoryRoot, relativeContract);
    const bundleRoot = dirname(contractPath);
    const contract = await readJson(contractPath);
    assert.deepEqual(contract.compilation, product.semantics, relativeContract);
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

test("callable implementations use exact source and body identities", async () => {
  const product = await readJson(join(repositoryRoot, "gotots.json"));
  const contracts = product.implementations.callables;
  assert.ok(Array.isArray(contracts) && contracts.length > 0);

  const identities = new Set();
  const outputs = new Set();
  const sourcePrograms = new Set();
  for (const relativeContract of contracts) {
    const contractPath = join(repositoryRoot, relativeContract);
    const contractRoot = dirname(contractPath);
    const contract = await readJson(contractPath);
    assert.deepEqual(contract.compilation, product.semantics, relativeContract);
    assert.equal(contract.schemaVersion, 3, relativeContract);
    assert.match(contract.sourceProgramDigest, /^[0-9a-f]{64}$/u);
    sourcePrograms.add(contract.sourceProgramDigest);
    assert.match(contract.output, /^implementations\/tsts\/.+\.ts$/u);
    assert.ok(!outputs.has(contract.output), contract.output);
    outputs.add(contract.output);
    assert.deepEqual(
      contract.certificationSources,
      [...new Set(contract.certificationSources)].sort(),
      relativeContract,
    );

    const sources = [contract.source, ...contract.certificationSources];
    for (const relativeSource of sources) {
      assert.doesNotMatch(relativeSource, stalePathIdentity, relativeContract);
      const source = await readFile(join(contractRoot, relativeSource), "utf8");
      assert.doesNotMatch(source, staleSymbolIdentity, relativeSource);
    }

    const sortedCallables = [...contract.callables].sort((left, right) => {
      if (left.sourceIdentity < right.sourceIdentity) {
        return -1;
      }
      if (left.sourceIdentity > right.sourceIdentity) {
        return 1;
      }
      return 0;
    });
    assert.deepEqual(contract.callables, sortedCallables, relativeContract);
    for (const callable of contract.callables) {
      assert.ok(!identities.has(callable.sourceIdentity), callable.sourceIdentity);
      identities.add(callable.sourceIdentity);
      assert.match(callable.sourceBodyDigest, /^[0-9a-f]{64}$/u);
      assert.ok(callable.sourceSignature.length > 0);
      assert.ok(callable.export.length > 0);
      assert.ok(callable.variant === "source" || callable.variant === "kernel");
    }
  }
  assert.equal(sourcePrograms.size, 1, "callable contracts select different source programs");
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

test("product runner seals the fixed serial execution contract", async () => {
  const product = await readJson(join(repositoryRoot, "gotots.json"));
  assert.deepEqual(
    Object.keys(product.semantics).sort(),
    ["evaluationOrder", "integers"],
  );
  const runner = await readFile(join(repositoryRoot, "assembly/runner.ts"), "utf8");
  assert.match(
    runner,
    /import \{ state as osState \} from "@gotots\/gostdlib\/os\.js";/u,
  );
  assert.match(
    runner,
    /osState\.Args = osState\.Args\.append\("", \["--singleThreaded"\]\);/u,
  );
  assert.equal(runner.match(/"--singleThreaded"/gu)?.length, 1);
  assert.doesNotMatch(runner, /process\.argv/u);
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
