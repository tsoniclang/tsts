export const baseConfig = {
  goModulePath: "github.com/microsoft/typescript-go",
  primaryUnitKinds: ["constGroup", "func", "method", "type", "varGroup"],
  tsRoot: "packages/tsts/src",
  policies: [
    { match: "**/*_test.go", category: "test", reason: "test reason" },
  ],
  overrides: [
    { match: "internal/jsnum/**", category: "manual-required", reason: "manual reason" },
  ],
  tsFilePolicies: [
    { match: "packages/tsts/src/internal/ls/**", category: "forbidden-source", reason: "ls forbidden" },
    { match: "packages/tsts/src/internal/lsp/**", category: "forbidden-source", reason: "lsp forbidden" },
    { match: "packages/tsts/src/**/*fourslash*", category: "forbidden-source", reason: "fourslash forbidden" },
    { match: "packages/tsts/src/**/*.ts", category: "requires-tsgo-unit", reason: "metadata required" },
  ],
  largeFileLineThreshold: 5000,
  largeFileSplitPlan: {
    schemaVersion: 1,
    files: {},
  },
  overrideCategories: ["extension-host", "host-native", "runtime-correctness-performance", "runtime-performance", "runtime-representation"],
};
export const testSigHash = "a".repeat(64);
export const testBodyHash = "b".repeat(64);
export function snapshotWith(files) {
  return {
    sourceRoot: "/tmp/tsgo",
    gitRevision: "abc123",
    summary: {
      goFileCount: files.length,
      lineCount: files.reduce((sum, file) => sum + file.lineCount, 0),
      unitCount: files.reduce((sum, file) => sum + file.units.length, 0),
    },
    files,
  };
}

export function emptyCounts() {
  return {
    parseErrors: 0,
    duplicateGoIDs: 0,
    duplicateTsIDs: 0,
    orphan: 0,
    forbiddenTsFiles: 0,
    untrackedTsFiles: 0,
    stale: 0,
    missing: 0,
    stubbed: 0,
    largeFileSplitFailures: 0,
  };
}

export function emptyGeneratedArtifacts() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [], unresolved: [] };
}

export function fileRecord(overrides) {
  return {
    path: "internal/debug/debug.go",
    importPath: "github.com/microsoft/typescript-go/internal/debug",
    packageName: "debug",
    lineCount: 10,
    generated: false,
    structTags: [],
    units: [],
    featureCounts: {},
    ...overrides,
  };
}

export function unitRecord(overrides) {
  const goPath = overrides?.goPath ?? "internal/debug/debug.go";
  const metadata = { goPath, ...(overrides?.metadata ?? {}) };
  const normalizedOverrides = { ...overrides };
  delete normalizedOverrides.goPath;
  delete normalizedOverrides.metadata;
  return {
    id: "m::internal/debug/debug.go::func::Fail",
    kind: "func",
    name: "Fail",
    qualifiedName: "Fail",
    generated: false,
    startLine: 1,
    endLine: 3,
    signature: "func Fail()",
    sigHash: "sig",
    bodyHash: "body",
    snippet: "func Fail() {}",
    nodeKindCounts: {},
    featureCounts: {},
    metadata,
    ...normalizedOverrides,
  };
}

export function identType(name) {
  return { kind: "ident", name, text: name };
}

export function selectorType(packageName, name) {
  return { kind: "selector", package: packageName, name, text: `${packageName}.${name}` };
}

export function pointerType(element) {
  return { kind: "pointer", text: `*${element.text}`, element };
}

export function sliceType(element) {
  return { kind: "slice", text: `[]${element.text}`, element };
}

export function mapType(key, value) {
  return { kind: "map", text: `map[${key.text}]${value.text}`, key, value };
}

export function channelType(element) {
  return { kind: "channel", text: `chan ${element.text}`, element, direction: "bidirectional" };
}

export function instantiationType(element, typeArgs) {
  return { kind: "instantiation", text: `${element.text}[${typeArgs.map((arg) => arg.text).join(", ")}]`, element, typeArgs };
}

export function funcType(parameters, results) {
  return { kind: "func", text: "func", parameters, results };
}

export function interfaceType(members) {
  return { kind: "interface", text: "interface", members };
}
