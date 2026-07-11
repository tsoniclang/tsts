import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalJson, executableProvenance, hashInputRoots } from "../test-provenance.mjs";
import { ensureTstsBuild, preparedTstsBuildEvidence, tstsBuildRequest, verifyTstsBuild } from "../tsts-build.mjs";
import { assertUninjectedNodeProcess, repositoryPaths } from "./benchmark-evidence.mjs";

const contextPath = fileURLToPath(import.meta.url);
const provenancePath = fileURLToPath(new URL("../test-provenance.mjs", import.meta.url));
const buildPath = fileURLToPath(new URL("../tsts-build.mjs", import.meta.url));
const benchmarkCorePath = fileURLToPath(new URL("./benchmark-core.mjs", import.meta.url));
const compilerArgumentsPath = fileURLToPath(new URL("./compiler-arguments.mjs", import.meta.url));
const benchmarkEvidencePath = fileURLToPath(new URL("./benchmark-evidence.mjs", import.meta.url));

export async function prepareTstsMicrobenchmark({ driverPath, noBuild, quiet = false }) {
  assertUninjectedNodeProcess();
  const { repoRoot, packageRoot } = repositoryPaths();
  const tscPath = join(repoRoot, "node_modules/typescript/bin/tsc");
  const build = await ensureTstsBuild({ repoRoot, packageRoot, buildRoot: join(repoRoot, ".temp/profiling/prepared-tsts"), noBuild, logger: quiet ? () => {} : console.log });
  const harness = microHarnessEvidence(driverPath);
  const evidence = {
    schemaVersion: 1,
    classification: "exploratory-not-a-regression-gate",
    runtime: {
      version: process.version,
      versions: process.versions,
      executable: executableProvenance(process.execPath),
      execArgv: [...process.execArgv],
      startupNodeOptions: process.env.NODE_OPTIONS ?? "",
      startupNodePath: process.env.NODE_PATH ?? "",
    },
    harness,
    tstsBuild: preparedTstsBuildEvidence(build),
  };
  return {
    dist: build.path,
    evidence,
    reverify() {
      const request = tstsBuildRequest({ repoRoot, packageRoot, tscPath });
      if (canonicalJson(request) !== canonicalJson(build.provenance.request)) throw new Error("TSTS source/build inputs changed during microbenchmark execution");
      const verified = verifyTstsBuild(dirname(build.path), request, build.buildId);
      if (verified === undefined || canonicalJson(preparedTstsBuildEvidence(verified)) !== canonicalJson(evidence.tstsBuild)) throw new Error("prepared TSTS build changed during microbenchmark execution");
      if (canonicalJson(microHarnessEvidence(driverPath)) !== canonicalJson(harness)) throw new Error("microbenchmark harness changed during execution");
    },
  };
}

function microHarnessEvidence(driverPath) {
  return hashInputRoots([
    { label: "microbenchmark-driver", path: driverPath },
    { label: "microbenchmark-context", path: contextPath },
    { label: "microbenchmark-provenance", path: provenancePath },
    { label: "microbenchmark-prepared-build", path: buildPath },
    { label: "microbenchmark-statistics", path: benchmarkCorePath },
    { label: "microbenchmark-compiler-arguments", path: compilerArgumentsPath },
    { label: "microbenchmark-environment", path: benchmarkEvidencePath },
  ]);
}
