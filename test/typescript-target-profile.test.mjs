import assert from "node:assert/strict";
import { link, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import { sealTargetManifest, verifyTargetManifest } from "../scripts/target-manifest.mjs";
import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";
import { readTypeScriptTargetProfile } from "../scripts/typescript-target-profile.mjs";

const scratchRoot = resolve(".temp", "profile-tests");

test("target profile has one stable semantic identity", async () => {
  const root = await createScratch("identity-");
  const first = join(root, "first.json");
  const second = join(root, "second.json");
  await writeRepresentationTransportManifest(root);
  await writeFile(first, JSON.stringify({
    schemaVersion: 11,
    execution: "synchronous",
    assembly: { modulePackaging: "single-esm", minification: "full" },
    optimizations: {
      pointerFlows: "closed-direct",
      scalarProjections: "closed-direct",
      representationProjections: "closed-direct",
    },
    acceptance: {
      pointerKeyMapCount: 69,
      dominatingNilCheckEliminationCount: 2843,
      sourcePrimitiveTypeReferenceCount: 11,
      sourcePrimitiveImportBindingCount: 11,
    },
    evidence: representationTransportEvidence(),
  }), "utf8");
  await writeFile(second, JSON.stringify({
    evidence: representationTransportEvidence(),
    optimizations: {
      representationProjections: "closed-direct",
      scalarProjections: "closed-direct",
      pointerFlows: "closed-direct",
    },
    assembly: { modulePackaging: "single-esm", minification: "full" },
    acceptance: {
      pointerKeyMapCount: 69,
      dominatingNilCheckEliminationCount: 2843,
      sourcePrimitiveTypeReferenceCount: 11,
      sourcePrimitiveImportBindingCount: 11,
    },
    execution: "synchronous",
    schemaVersion: 11,
  }, undefined, 2), "utf8");

  const left = await readTypeScriptTargetProfile(first);
  const right = await readTypeScriptTargetProfile(second);
  assert.equal(left.digest, right.digest);
  assert.equal(left.execution, "synchronous");
  assert.deepEqual(left.assembly, {
    modulePackaging: "single-esm",
    minification: "full",
  });
  assert.equal(Object.isFrozen(left.assembly), true);
  assert.deepEqual(left.optimizations, right.optimizations);
  assert.equal(Object.isFrozen(left.optimizations), true);
  assert.deepEqual(left.acceptance, {
    pointerKeyMapCount: 69,
    dominatingNilCheckEliminationCount: 2843,
    sourcePrimitiveTypeReferenceCount: 11,
    sourcePrimitiveImportBindingCount: 11,
  });
  assert.equal(Object.isFrozen(left.acceptance), true);
  assert.deepEqual(left.representationTransports.callables, [{
    kind: "generic-kernel",
    moduleSpecifier: "@provider/kernel.js",
    exportName: "Kernel",
  }]);
  assert.match(left.representationTransports.digest, /^[0-9a-f]{64}$/u);
  assert.equal(Object.isFrozen(left.representationTransports), true);
  assert.equal(Object.isFrozen(left.representationTransports.callables), true);
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects effect and diagnostic compatibility fields", async () => {
  const root = await createScratch("removed-fields-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 11,
    execution: "synchronous",
    assembly: { modulePackaging: "single-esm", minification: "full" },
    optimizations: { cooperativeEffects: "closed-program" },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /unsupported field 'cooperativeEffects'/u,
  );
  await writeFile(path, JSON.stringify({
    schemaVersion: 11,
    execution: "synchronous",
    assembly: { modulePackaging: "single-esm", minification: "full" },
    optimizations: {},
    diagnostics: { planningPhases: true },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /unsupported field 'diagnostics'/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects unknown product configuration", async () => {
  const root = await createScratch("invalid-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 11,
    execution: "synchronous",
    assembly: { modulePackaging: "single-esm", minification: "full" },
    optimizations: {},
    fallback: true,
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /unsupported field 'fallback'/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects non-synchronous execution", async () => {
  const root = await createScratch("execution-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 11,
    execution: "unrestricted",
    assembly: { modulePackaging: "single-esm", minification: "full" },
    optimizations: {
      pointerFlows: "closed-direct",
      scalarProjections: "closed-direct",
      representationProjections: "closed-direct",
    },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /execution must be 'synchronous'/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects alternate executable packaging", async () => {
  const root = await createScratch("packaging-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 11,
    execution: "synchronous",
    assembly: { modulePackaging: "multi-esm", minification: "full" },
    optimizations: {
      pointerFlows: "closed-direct",
      scalarProjections: "closed-direct",
      representationProjections: "closed-direct",
    },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /modulePackaging must be 'single-esm'/u,
  );
  await writeFile(path, JSON.stringify({
    ...canonicalProfile(),
    assembly: { modulePackaging: "single-esm", minification: "none" },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /minification must be 'full'/u,
  );
  await writeFile(path, JSON.stringify({
    ...canonicalProfile(),
    assembly: { modulePackaging: "single-esm" },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /minification must be 'full'/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects invalid optimization acceptance", async () => {
  const root = await createScratch("acceptance-");
  const path = join(root, "profile.json");
  await writeRepresentationTransportManifest(root);
  const accepted = canonicalProfile().acceptance;
  for (const acceptance of [
    {},
    { ...accepted, pointerKeyMapCount: 0 },
    { ...accepted, dominatingNilCheckEliminationCount: 0 },
    { ...accepted, sourcePrimitiveTypeReferenceCount: 0 },
    { ...accepted, sourcePrimitiveImportBindingCount: 0 },
    { ...accepted, sourcePrimitiveTypeReferenceCount: undefined },
    { ...accepted, sourcePrimitiveImportBindingCount: undefined },
    { ...accepted, fallback: true },
  ]) {
    await writeFile(path, JSON.stringify({
      ...canonicalProfile(),
      acceptance,
    }), "utf8");
    await assert.rejects(
      readTypeScriptTargetProfile(path),
      /acceptance|pointerKeyMapCount|dominatingNilCheckEliminationCount|sourcePrimitive/u,
    );
  }
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile derives only certified generic-kernel transports", async () => {
  const root = await createScratch("transports-");
  await writeRepresentationTransportManifest(root, [
    genericKernel("@provider/z.js", "Z"),
    {
      kind: "ordinary-facet",
      export: "Ignored",
    },
    genericKernel("@provider/a.js", "A"),
  ]);
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify(canonicalProfile()), "utf8");

  const profile = await readTypeScriptTargetProfile(path);
  assert.deepEqual(profile.representationTransports.callables, [{
    kind: "generic-kernel",
    moduleSpecifier: "@provider/a.js",
    exportName: "A",
  }, {
    kind: "generic-kernel",
    moduleSpecifier: "@provider/z.js",
    exportName: "Z",
  }]);
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects uncertified, duplicate, and escaping transports", async () => {
  const root = await createScratch("transport-invalid-");
  const path = join(root, "profile.json");
  const invalid = {
    ...genericKernel("@provider/kernel.js", "Kernel"),
    effect: "async",
  };
  await writeRepresentationTransportManifest(root, [invalid]);
  await writeFile(path, JSON.stringify(canonicalProfile()), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /generic kernel 0:0 is uncertified/u,
  );

  const duplicate = genericKernel("@provider/kernel.js", "Kernel");
  await writeRepresentationTransportManifest(root, [duplicate, duplicate]);
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /callable identity is duplicated/u,
  );

  await writeFile(path, JSON.stringify({
    ...canonicalProfile(),
    evidence: { representationTransportManifest: "../manifest.json" },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /must be a repository-relative path/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target manifest rejects profile drift and unselected remnants", async () => {
  const root = await createScratch("manifest-");
  await writeFile(join(root, "program.ts"), "export {};\n", "utf8");
  const canonicalDigest = "1".repeat(64);
  const profileDigest = "2".repeat(64);
  const toolchainDigest = "3".repeat(64);
  await sealTargetManifest(root, canonicalDigest, profileDigest, toolchainDigest);
  await verifyTargetManifest(root, canonicalDigest, profileDigest);
  await assert.rejects(
    verifyTargetManifest(root, canonicalDigest, "4".repeat(64)),
    /target profile digest differs/u,
  );
  await writeFile(join(root, "unselected.ts"), "throw new Error();\n", "utf8");
  await assert.rejects(
    verifyTargetManifest(root, canonicalDigest, profileDigest),
    /content, type, or membership differs/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target manifest rejects byte mutation and hard links", async () => {
  const root = await createScratch("target-bytes-");
  const target = join(root, "target");
  await mkdir(target);
  await writeFile(join(target, "program.ts"), "export const value = 1;\n", "utf8");
  await sealTargetManifest(target, "1".repeat(64), "2".repeat(64), "3".repeat(64));
  await writeFile(join(target, "program.ts"), "export const value = 2;\n", "utf8");
  await assert.rejects(
    verifyTargetManifest(target, "1".repeat(64), "2".repeat(64)),
    /content, type, or membership differs/u,
  );

  const hardlinkTarget = join(root, "hardlink-target");
  await mkdir(hardlinkTarget);
  const external = join(root, "external.ts");
  await writeFile(external, "export {};\n", "utf8");
  await link(external, join(hardlinkTarget, "program.ts"));
  await assert.rejects(
    sealTargetManifest(
      hardlinkTarget,
      "1".repeat(64),
      "2".repeat(64),
      "3".repeat(64),
    ),
    /hard link/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target manifest ordering is locale independent code-unit order", async () => {
  const root = await createScratch("target-order-");
  for (const path of ["z.ts", "ä.ts", "A.ts", "a.ts"]) {
    await writeFile(join(root, path), "export {};\n", "utf8");
  }
  const original = String.prototype.localeCompare;
  String.prototype.localeCompare = () => {
    throw new Error("locale ordering is forbidden");
  };
  try {
    await sealTargetManifest(root, "1".repeat(64), "2".repeat(64), "3".repeat(64));
  } finally {
    String.prototype.localeCompare = original;
  }
  const manifest = JSON.parse(
    await readFile(join(root, "tsts-target-manifest.json"), "utf8"),
  );
  assert.deepEqual(
    manifest.members.map((member) => member.path),
    ["A.ts", "a.ts", "z.ts", "ä.ts"],
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

async function createScratch(prefix) {
  await mkdir(scratchRoot, { recursive: true });
  return mkdtemp(join(scratchRoot, prefix));
}

function canonicalProfile() {
  return {
    schemaVersion: 11,
    execution: "synchronous",
    assembly: { modulePackaging: "single-esm", minification: "full" },
    optimizations: {
      pointerFlows: "closed-direct",
      scalarProjections: "closed-direct",
      representationProjections: "closed-direct",
    },
    acceptance: {
      pointerKeyMapCount: 69,
      dominatingNilCheckEliminationCount: 2843,
      sourcePrimitiveTypeReferenceCount: 11,
      sourcePrimitiveImportBindingCount: 11,
    },
    evidence: representationTransportEvidence(),
  };
}

function representationTransportEvidence() {
  return { representationTransportManifest: "manifest.json" };
}

function genericKernel(moduleSpecifier, exportName) {
  return {
    kind: "generic-callable-kernel",
    moduleSpecifier,
    exportName,
    capabilities: ["kernel"],
    effect: "sync",
    genericTypeArguments: [{ typeParameter: 0, facet: "logical" }],
    implementationSites: ["src/kernel.ts#Kernel@1"],
    targetFingerprint: "b".repeat(64),
  };
}

async function writeRepresentationTransportManifest(
  root,
  facets = [genericKernel("@provider/kernel.js", "Kernel")],
) {
  const byModule = new Map();
  for (const facet of facets) {
    const specifier = facet.moduleSpecifier ?? "@provider/kernel.js";
    const selected = { ...facet };
    delete selected.moduleSpecifier;
    delete selected.exportName;
    if (facet.exportName !== undefined) {
      selected.export = facet.exportName;
    }
    const existing = byModule.get(specifier);
    if (existing === undefined) {
      byModule.set(specifier, [selected]);
    } else {
      existing.push(selected);
    }
  }
  await writeFile(join(root, "manifest.json"), JSON.stringify({
    schemaVersion: 32,
    manifestDigest: "a".repeat(64),
    facetModules: [...byModule].map(([specifier, moduleFacets]) => ({
      specifier,
      facets: moduleFacets,
    })),
  }), "utf8");
}
