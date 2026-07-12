import { createHash } from "node:crypto";

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
export const testSignature = "func Fail()";
export const testSigHash = signatureHash(testSignature);
export const testBodyHash = "b".repeat(64);
export const testSemanticProfileKey = "linux/amd64:cgo=0:arch=GOAMD64=v1:compiler=gc:experiments=:goexperiment=:tags=";
export const testSemanticProfileIndex = 0;
export function signatureHash(signature) {
  return createHash("sha256").update(signature.replaceAll("\r\n", "\n")).digest("hex");
}
export function testSemanticEnvironment({ architecture = "GOAMD64=v1", cgoEnabled = false, goarch = "amd64", goexperiment = "", goos = "linux" } = {}) {
  const values = {
    CGO_ENABLED: cgoEnabled ? "1" : "0", GO111MODULE: "on", GO386: "sse2", GOAMD64: "v1", GOARCH: goarch,
    GOARM: "7", GOARM64: "v8.0", GOAUTH: "off", GOBIN: "", GOCACHE: "/cache", GOCACHEPROG: "", GODEBUG: "",
    GOENV: "off", GOEXPERIMENT: goexperiment, GOFIPS140: "off", GOFLAGS: "", GOINSECURE: "", GOMIPS: "hardfloat",
    GOMIPS64: "hardfloat", GOMODCACHE: "/modcache", GONOPROXY: "", GONOSUMDB: "", GOPACKAGESDRIVER: "off", GOPATH: "/go",
    GOPPC64: "power8", GOPRIVATE: "", GOPROXY: "off", GORISCV64: "rva20u64", GOROOT: "/toolchain",
    GOSUMDB: "off", GOOS: goos, GOTMPDIR: "", GOTOOLCHAIN: "local", GOVCS: "off",
    GOWASM: "", GOWORK: "off", PATH: "/toolchain/bin",
  };
  if (architecture.includes("=")) {
    const separator = architecture.indexOf("=");
    values[architecture.slice(0, separator)] = architecture.slice(separator + 1);
  }
  return Object.entries(values).map(([key, value]) => `${key}=${value}`).sort();
}
export function testSemanticProfile({ coveredFiles = [], packageIds = [] } = {}) {
  return {
    goos: "linux",
    goarch: "amd64",
    cgoEnabled: false,
    architecture: "GOAMD64=v1",
    experiments: "",
    goexperiment: "",
    buildTags: [],
    buildFlags: ["-mod=readonly"],
    toolTags: ["amd64.v1"],
    environment: testSemanticEnvironment(),
    packageIds: [...new Set(packageIds)].sort(),
    coveredFiles: [...new Set(coveredFiles)].sort(),
  };
}
export function snapshotWith(files) {
  return {
    sourceRoot: "/tmp/tsgo",
    gitRevision: "abc123",
    summary: {
      goFileCount: files.length,
      lineCount: files.reduce((sum, file) => sum + file.lineCount, 0),
      unitCount: files.reduce((sum, file) => sum + file.units.length, 0),
    },
    semantic: {
      requiredFiles: files.map((file) => file.path).sort(),
      excludedFiles: [],
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [], selections: [], unresolvedSelections: [] },
      methodSetSignatures: [],
      profiles: [testSemanticProfile({
        coveredFiles: files.map((file) => file.path),
        packageIds: files.map((file) => file.importPath),
      })],
    },
    files,
  };
}

export function emptyCounts() {
  return {
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
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}

export function fileRecord(overrides) {
  const filePath = overrides?.path ?? "internal/debug/debug.go";
  return {
    path: filePath,
    sourceHash: "a".repeat(64),
    gitBlobHash: "b".repeat(40),
    byteLength: 4096,
    importPath: "github.com/microsoft/typescript-go/internal/debug",
    packageName: "debug",
    lineCount: 10,
    generated: false,
    buildTags: [],
    implicitBuildTags: [],
    imports: [],
    units: [],
    metadata: { basename: filePath.slice(filePath.lastIndexOf("/") + 1) },
    ...overrides,
  };
}

export function unitRecord(overrides) {
  const goPath = overrides?.goPath ?? "internal/debug/debug.go";
  const metadata = { goPath, ...(overrides?.metadata ?? {}) };
  const normalizedOverrides = { ...overrides };
  delete normalizedOverrides.goPath;
  delete normalizedOverrides.metadata;
  const kind = normalizedOverrides.kind ?? "func";
  const name = normalizedOverrides.name ?? "Fail";
  const qualifiedName = normalizedOverrides.qualifiedName ?? (kind === "method" ? `${normalizedOverrides.receiver ?? "Receiver"}.${name}` : name);
  const unitId = normalizedOverrides.id ?? "m::internal/debug/debug.go::func::Fail";
  const semantic = normalizedOverrides.semantic ?? [semanticDeclaration(kind, name, normalizedOverrides.valueSpecs, goPath, normalizedOverrides.receiver ?? "Receiver", unitId)];
  const signature = normalizedOverrides.signature ?? testSignature;
  const startOffset = normalizedOverrides.startOffset ?? 0;
  return {
    id: "m::internal/debug/debug.go::func::Fail",
    kind,
    name,
    qualifiedName,
    exported: /^\p{Lu}/u.test(name),
    generated: false,
    startLine: 1,
    endLine: 1,
    startOffset,
    endOffset: normalizedOverrides.endOffset ?? startOffset + Buffer.byteLength(signature),
    signature,
    sigHash: testSigHash,
    bodyHash: testBodyHash,
    snippet: testSignature,
    typeParameters: [],
    typeParameterDetails: [],
    parameters: [],
    results: [],
    valueSpecs: [],
    members: [],
    semantic,
    metadata,
    ...normalizedOverrides,
  };
}

function semanticDeclaration(kind, name, valueSpecs = [], goPath = "internal/debug/debug.go", receiverName = "Receiver", unitId = "m::internal/debug/debug.go::func::Fail") {
  const directory = goPath.split("/").slice(0, -1).join("/");
  const packagePath = directory === "" ? "m" : `m/${directory}`;
  const objectSignature = {
    receiverTypeParameters: [],
    typeParameters: [],
    parameters: { variables: [] },
    results: { variables: [] },
    variadic: false,
    parameterNameProvenance: "source",
  };
  const ownerId = kind === "method"
    ? `${packagePath}::type::${receiverName}::method::${name}`
    : `${packagePath}::${kind === "type" ? "type" : "func"}::${name}`;
  const signature = kind === "method"
    ? {
        receiver: {
          id: `${ownerId}::signature::receiver`,
          name: "",
          nameKind: "unnamed",
          packagePath,
          exported: false,
          type: { kind: "named", nilable: false, reference: { objectId: `${packagePath}::type::${receiverName}`, packagePath, name: receiverName, typeArgs: [] } },
        },
        receiverMode: "value",
        ...objectSignature,
      }
    : objectSignature;
  const object = {
    id: ownerId,
    name,
    packagePath,
    exported: /^\p{Lu}/u.test(name),
    type: kind === "type"
      ? { kind: "named", nilable: false, reference: { objectId: `${packagePath}::type::${name}`, packagePath, name, typeArgs: [] } }
      : { kind: "signature", nilable: true, signature: objectSignature },
  };
  if (kind === "type") {
    return {
      kind,
      packagePath,
      object,
      type: {
        alias: false,
        object,
        typeParameters: [],
        rhs: { kind: "struct", nilable: false, struct: { fields: [] } },
        methodSurface: "declaration-units",
        methods: [],
        valueMethodSet: [],
        pointerMethodSet: [],
      },
      profiles: [testSemanticProfileIndex],
    };
  }
  if (kind === "constGroup" || kind === "varGroup") {
    const specs = valueSpecs.length === 0 ? [{ names: [name], type: identType("int") }] : valueSpecs;
    return {
      kind,
      packagePath,
      valueSpecs: specs.map((specification, specIndex) => ({
        specIndex,
        names: specification.names.map((bindingName, nameIndex) => {
          const bindingId = `${packagePath}::${kind === "constGroup" ? "const" : "var"}::${bindingName}`;
          const typeOwner = bindingName === "_" ? `${unitId}::spec::${specIndex}::name::${nameIndex}::type` : `${bindingId}::type`;
          const type = testSemanticType(
            specification.type ?? identType("int"),
            packagePath,
            kind === "constGroup" && specification.type === undefined,
            {},
            typeOwner,
          );
          const binding = {
            name: bindingName,
            nameIndex,
            blank: bindingName === "_",
            type,
            ...(bindingName === "_" ? {} : {
              object: {
                id: bindingId,
                name: bindingName,
                packagePath,
                exported: /^\p{Lu}/u.test(bindingName),
                type,
              },
            }),
          };
          if (kind === "constGroup") binding.constant = { kind: "Int", exact: "0" };
          return binding;
        }),
      })),
      profiles: [testSemanticProfileIndex],
    };
  }
  return { kind, packagePath, object, signature, profiles: [testSemanticProfileIndex] };
}

export function semanticFunctionDeclaration({
  kind = "func",
  name,
  packagePath,
  parameters = [],
  results = [],
  packages = {},
}) {
  const ownerId = `${packagePath}::${kind}::${name}`;
  const signature = testSemanticSignature(`${ownerId}::signature`, packagePath, parameters, results, packages);
  const objectSignature = testSemanticSignature(`${ownerId}::type`, packagePath, parameters, results, packages);
  const object = {
    id: ownerId,
    name,
    packagePath,
    exported: /^\p{Lu}/u.test(name),
    type: { kind: "signature", nilable: true, signature: objectSignature },
  };
  return [{ kind, packagePath, object, signature, profiles: [testSemanticProfileIndex] }];
}

function testSemanticSignature(ownerPath, packagePath, parameters, results, packages) {
  const variables = (items, role) => {
    let index = 0;
    return items.flatMap((item) => (item.names?.length ? item.names : [""]).map((name) => {
      const id = `${ownerPath}::${role}::${index++}`;
      const nameKind = name === "" ? "unnamed" : name === "_" ? "blank" : "named";
      return { id, name, nameKind, packagePath, exported: false, type: testSemanticType(item.type, packagePath, false, packages, `${id}::type`) };
    }));
  };
  return {
    receiverTypeParameters: [], typeParameters: [],
    parameters: { variables: variables(parameters, "parameters") },
    results: { variables: variables(results, "results") },
    variadic: parameters.at(-1)?.variadic === true,
    parameterNameProvenance: "source",
  };
}

function testSemanticType(type, packagePath, untyped, packages = {}, ownerPath = "test") {
  if (type.kind === "ident") {
    if (new Set(["bool", "byte", "complex128", "complex64", "float32", "float64", "int", "int16", "int32", "int64", "int8", "rune", "string", "uint", "uint16", "uint32", "uint64", "uint8", "uintptr"]).has(type.name)) {
      return { kind: "basic", nilable: false, basic: { name: untyped ? `untyped ${type.name}` : type.name, untyped } };
    }
    const referencePackage = type.name === "error" ? "" : packagePath;
    const prefix = referencePackage === "" ? "builtin" : referencePackage;
    return { kind: "named", nilable: type.name === "error", reference: { objectId: `${prefix}::type::${type.name}`, packagePath: referencePackage, name: type.name, typeArgs: [] } };
  }
  if (type.kind === "selector") {
    const referencePackage = packages[type.package] ?? type.package;
    return { kind: "named", nilable: false, reference: { objectId: `${referencePackage}::type::${type.name}`, packagePath: referencePackage, name: type.name, typeArgs: [] } };
  }
  if (type.kind === "pointer" || type.kind === "slice") return { kind: type.kind, nilable: true, element: testSemanticType(type.element, packagePath, false, packages, `${ownerPath}::element`) };
  if (type.kind === "ellipsis") return { kind: "slice", nilable: true, element: testSemanticType(type.element, packagePath, false, packages, `${ownerPath}::element`) };
  if (type.kind === "array") return { kind: "array", nilable: false, length: String(type.length), element: testSemanticType(type.element, packagePath, false, packages, `${ownerPath}::element`) };
  if (type.kind === "map") return { kind: "map", nilable: true, key: testSemanticType(type.key, packagePath, false, packages, `${ownerPath}::key`), element: testSemanticType(type.value, packagePath, false, packages, `${ownerPath}::element`) };
  if (type.kind === "channel") return { kind: "channel", nilable: true, direction: type.direction ?? "bidirectional", element: testSemanticType(type.element, packagePath, false, packages, `${ownerPath}::element`) };
  if (type.kind === "instantiation") {
    const base = testSemanticType(type.element, packagePath, false, packages);
    if (base.kind !== "named" && base.kind !== "alias") throw new Error("test instantiation requires a named or alias base");
    return { ...base, reference: { ...base.reference, typeArgs: type.typeArgs.map((argument, index) => testSemanticType(argument, packagePath, false, packages, `${ownerPath}::typeArg::${index}`)) } };
  }
  if (type.kind === "func") {
    return {
      kind: "signature",
      nilable: true,
      signature: testSemanticSignature(ownerPath, packagePath, type.parameters ?? [], type.results ?? [], packages),
    };
  }
  throw new Error(`test semantic type '${type.kind}' is not implemented`);
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

export function completeDeclarationAuditStatus() {
  const complete = () => ({ state: "complete" });
  return {
    signatureCheck: {
      state: "complete",
      selection: { kind: "all-active" },
      authoredFacades: complete(),
      externalPackageSurface: complete(),
      typeStoragePolicies: complete(),
      typeEquivalenceRelations: complete(),
      ambientReferenceRelations: complete(),
      declarationOwnership: complete(),
      untrackedTypeScript: complete(),
    },
    jsonTagCheck: complete(),
  };
}
