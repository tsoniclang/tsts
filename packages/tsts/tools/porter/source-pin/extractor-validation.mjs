import { existsSync } from "node:fs";
import path from "node:path";
import { readStableRegularFile } from "../core/provenance-filesystem.mjs";
import { resolveAndVerifyPinnedGoToolchain, validatePinnedGoToolchainContract } from "../go-toolchain-pin.mjs";
import { readSourcePinManifest } from "./manifest.mjs";
import { relativePath, resolveInside } from "./paths.mjs";

export function validateExtractor(repoRoot, manifest, snapshot, status) {
  const extractor = manifest.extractor;
  if (extractor === null || typeof extractor !== "object" || Array.isArray(extractor)) {
    status.issues.push({ path: status.manifestPath, reason: "extractor must be an object" });
    return;
  }
  try {
    validatePinnedGoToolchainContract(extractor);
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  let moduleRoot;
  try {
    moduleRoot = resolveInside(repoRoot, extractor.module, "extractor.module");
  } catch (error) {
    status.issues.push({ path: status.manifestPath, reason: error.message });
    return;
  }
  const goMod = path.join(moduleRoot, "go.mod");
  if (!existsSync(goMod)) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: "extractor go.mod is missing" });
    return;
  }
  const goModText = readStableRegularFile(goMod, "Porter extractor go.mod").toString("utf8");
  if (!new RegExp(`^toolchain\\s+${escapeRegExp(extractor.goVersion)}$`, "m").test(goModText)) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `go.mod must pin toolchain ${extractor.goVersion}` });
  }
  status.extractor = {
    expectedGoVersion: extractor.goVersion,
    actualGoVersion: snapshot?.environment?.goVersion ?? "",
    executable: snapshot?.semantic?.toolchainExecutable ?? "",
    executableHash: snapshot?.semantic?.toolchainHash ?? "",
    goroot: snapshot?.semantic?.goroot ?? "",
    gorootHash: snapshot?.semantic?.gorootHash ?? "",
    goos: snapshot?.environment?.goos ?? "",
    goarch: snapshot?.environment?.goarch ?? "",
  };
  if (snapshot !== undefined && snapshot.environment?.goVersion !== extractor.goVersion) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ran with ${snapshot.environment?.goVersion ?? "<unknown>"}, expected ${extractor.goVersion}` });
  }
  if (snapshot !== undefined && snapshot.semantic?.toolchainHash !== extractor.toolchainExecutableSha256) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `Go toolchain executable hash ${snapshot.semantic?.toolchainHash ?? "<unknown>"} does not match pinned ${extractor.toolchainExecutableSha256}` });
  }
  if (snapshot !== undefined) {
    const fields = new Map([
      ["gorootHashContract", "contract"], ["gorootHash", "sha256"], ["gorootEntryCount", "entryCount"],
      ["gorootFileCount", "fileCount"], ["gorootDirectoryCount", "directoryCount"],
      ["gorootSymlinkCount", "symlinkCount"], ["gorootBytes", "bytes"],
    ]);
    for (const [snapshotKey, pinKey] of fields) {
      if (snapshot.semantic?.[snapshotKey] !== extractor.goroot[pinKey]) {
        status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ${snapshotKey} ${snapshot.semantic?.[snapshotKey] ?? "<unknown>"} does not match pinned ${extractor.goroot[pinKey]}` });
      }
    }
  }
  if (snapshot !== undefined && snapshot.environment?.goos !== extractor.goos) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ran for ${snapshot.environment?.goos ?? "<unknown>"}, expected GOOS ${extractor.goos}` });
  }
  if (snapshot !== undefined && snapshot.environment?.goarch !== extractor.goarch) {
    status.issues.push({ path: relativePath(repoRoot, goMod), reason: `extractor ran for ${snapshot.environment?.goarch ?? "<unknown>"}, expected GOARCH ${extractor.goarch}` });
  }
}

export function resolvePinnedGoToolchain(repoRoot, config) {
  const { manifest } = readSourcePinManifest(repoRoot, config);
  return resolveAndVerifyPinnedGoToolchain(manifest?.extractor);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
