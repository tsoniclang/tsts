import { compareText } from "./deterministic-order.mjs";
import { safeIdentifier, standardSelectorTypes } from "./names.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { buildSymbolIndex } from "./render-indexes.mjs";
import { fail } from "./runtime.mjs";
import { semanticVariants } from "./semantic-variants.mjs";

export function buildExternalFacadeMap(config, snapshot) {
  const facades = new Map();
  for (const policy of knownExternalFacadePolicies()) {
    addExternalFacade(facades, policy);
  }
  for (const policy of config.externalFacadePolicies ?? []) {
    addExternalFacade(facades, normalizeExternalFacadePolicy(policy));
  }
  for (const usage of collectExternalTypeUsages(config, snapshot)) {
    const existing = facades.get(usage.goName);
    if (existing) {
      if (existing.arity !== usage.arity) {
        fail(`external facade arity mismatch for ${usage.goName}: configured ${existing.arity}, observed ${usage.arity}`);
      }
      continue;
    }
    addExternalFacade(facades, autoExternalFacadePolicy(usage));
  }
  return facades;
}

export function addExternalFacade(facades, policy) {
  if (!policy.goName) fail("external facade policy must include goName");
  if (facades.has(policy.goName)) fail(`duplicate external facade policy for ${policy.goName}`);
  facades.set(policy.goName, policy);
}

export function collectExternalTypeUsages(config, snapshot) {
  const usages = new Map();
  const symbolIndex = buildSymbolIndex(config, snapshot);
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (!isActivePortPolicy(policyForUnit(config, unit, file))) continue;
      collectExternalTypesFromUnit(config, symbolIndex, unit, usages);
    }
  }
  return [...usages.values()].sort((left, right) => compareText(left.goName, right.goName));
}

export function collectExternalTypesFromUnit(config, symbolIndex, unit, usages) {
  if (unit.semantic === undefined) return;
  for (const declaration of semanticVariants(unit)) {
    visitObject(declaration.object);
    visitObject(declaration.type?.object);
    visitType(declaration.type?.rhs);
    visitSignature(declaration.signature);
    for (const specification of declaration.valueSpecs ?? []) {
      for (const binding of specification.names ?? []) {
        visitType(binding.type);
        visitObject(binding.object);
      }
    }
  }

  function visitObject(object) {
    if (object !== undefined) visitType(object.type);
  }

  function visitSignature(signature) {
    if (signature === undefined) return;
    visitVariable(signature.receiver);
    for (const parameter of [...(signature.receiverTypeParameters ?? []), ...(signature.typeParameters ?? [])]) visitType(parameter.constraint);
    for (const variable of signature.parameters?.variables ?? []) visitVariable(variable);
    for (const variable of signature.results?.variables ?? []) visitVariable(variable);
  }

  function visitVariable(variable) {
    if (variable !== undefined) visitType(variable.type);
  }

  function visitType(type) {
    if (type === undefined) return;
    if (type.kind === "named" || type.kind === "alias") {
      const reference = type.reference;
      const goName = `${reference.packagePath}.${reference.name}`;
      if (reference.packagePath !== ""
        && !standardSelectorTypes.has(goName)
        && !(reference.packagePath.startsWith(config.goModulePath) && symbolIndex.has(`${reference.packagePath}::${reference.name}`))) {
        recordExternalUsage(usages, goName, reference.typeArgs?.length ?? 0);
      }
      for (const argument of reference.typeArgs ?? []) visitType(argument);
      return;
    }
    visitType(type.element);
    visitType(type.key);
    visitSignature(type.signature);
    for (const variable of type.tuple?.variables ?? []) visitVariable(variable);
    for (const field of type.struct?.fields ?? []) visitVariable(field.variable);
    for (const method of type.interface?.explicitMethods ?? []) visitSignature(method.signature);
    for (const embedded of type.interface?.embeddedTypes ?? []) visitType(embedded);
    for (const term of type.union?.terms ?? []) visitType(term.type);
  }
}

export function recordExternalUsage(usages, goName, arity) {
  const existing = usages.get(goName);
  if (existing) {
    if (existing.arity !== arity) {
      fail(`external type '${goName}' used with both ${existing.arity} and ${arity} type argument(s)`);
    }
    existing.count++;
    return;
  }
  usages.set(goName, { goName, arity, count: 1 });
}

export function autoExternalFacadePolicy(usage) {
  const { importPath, name } = splitExternalGoName(usage.goName);
  return {
    goName: usage.goName,
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: "opaque",
    arity: usage.arity,
    generated: true,
  };
}

export function normalizeExternalFacadePolicy(policy) {
  const { importPath, name } = splitExternalGoName(policy.goName);
  const normalized = {
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: "opaque",
    arity: 0,
    ...policy,
  };
  if (normalized.tsInitializer !== undefined && normalized.kind !== "value") {
    throw new Error(`external facade ${normalized.goName} may declare tsInitializer only when kind is 'value'`);
  }
  return normalized;
}

export function splitExternalGoName(goName) {
  const index = goName.lastIndexOf(".");
  if (index <= 0 || index === goName.length - 1) fail(`invalid external Go type name '${goName}'`);
  return { importPath: goName.slice(0, index), name: goName.slice(index + 1) };
}

export function externalFacadeModulePath(importPath) {
  return `go/${importPath.split("/").map((segment) => safePathSegment(segment)).join("/")}.ts`;
}

export function safePathSegment(segment) {
  return String(segment)
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .replace(/^([.])/, "_$1") || "_";
}

export function knownExternalFacadePolicies() {
  const byteSlice = { kind: "slice", text: "[]byte", element: { kind: "ident", name: "byte", text: "byte" } };
  const intType = { kind: "ident", name: "int", text: "int" };
  const int64Type = { kind: "ident", name: "int64", text: "int64" };
  const errorType = { kind: "ident", name: "error", text: "error" };
  const boolType = { kind: "ident", name: "bool", text: "bool" };
  const stringType = { kind: "ident", name: "string", text: "string" };

  return [
    {
      goName: "io.Writer",
      tsModule: "go/io.ts",
      tsName: "Writer",
      kind: "interface",
      arity: 0,
      members: [{ kind: "method", name: "Write", parameters: [{ names: ["p"], type: byteSlice }], results: [{ type: intType }, { type: errorType }] }],
    },
    {
      goName: "io.Reader",
      tsModule: "go/io.ts",
      tsName: "Reader",
      kind: "interface",
      arity: 0,
      members: [{ kind: "method", name: "Read", parameters: [{ names: ["p"], type: byteSlice }], results: [{ type: intType }, { type: errorType }] }],
    },
    {
      goName: "encoding.TextMarshaler",
      tsModule: "go/encoding.ts",
      tsName: "TextMarshaler",
      kind: "interface",
      arity: 0,
      members: [{ kind: "method", name: "MarshalText", results: [{ type: byteSlice }, { type: errorType }] }],
    },
    { goName: "io.Closer", tsModule: "go/io.ts", tsName: "Closer", kind: "interface", arity: 0, members: [{ kind: "method", name: "Close", results: [{ type: errorType }] }] },
    { goName: "io.ReadCloser", tsModule: "go/io.ts", tsName: "ReadCloser", kind: "interface", arity: 0, extends: ["io.Reader", "io.Closer"] },
    { goName: "io.WriteCloser", tsModule: "go/io.ts", tsName: "WriteCloser", kind: "interface", arity: 0, extends: ["io.Writer", "io.Closer"] },
    { goName: "io.ReadWriter", tsModule: "go/io.ts", tsName: "ReadWriter", kind: "interface", arity: 0, extends: ["io.Reader", "io.Writer"] },
    { goName: "io.ReadWriteCloser", tsModule: "go/io.ts", tsName: "ReadWriteCloser", kind: "interface", arity: 0, extends: ["io.Reader", "io.Writer", "io.Closer"] },
    {
      goName: "context.Context",
      tsModule: "go/context.ts",
      tsName: "Context",
      kind: "interface",
      arity: 0,
      members: [
        { kind: "method", name: "Err", results: [{ type: errorType }] },
        { kind: "method", name: "Value", parameters: [{ names: ["key"], type: { kind: "ident", name: "any", text: "any" } }], results: [{ type: { kind: "ident", name: "any", text: "any" } }] },
      ],
    },
    { goName: "context.CancelFunc", tsModule: "go/context.ts", tsName: "CancelFunc", kind: "function", arity: 0 },
    { goName: "time.Time", tsModule: "go/time.ts", tsName: "Time", kind: "class", arity: 0 },
    { goName: "time.Duration", tsModule: "go/time.ts", tsName: "Duration", kind: "type", arity: 0, typeExpression: int64Type },
    { goName: "sync.Mutex", tsModule: "go/sync.ts", tsName: "Mutex", kind: "class", arity: 0, members: [{ kind: "method", name: "Lock" }, { kind: "method", name: "Unlock" }] },
    { goName: "sync.RWMutex", tsModule: "go/sync.ts", tsName: "RWMutex", kind: "class", arity: 0, members: [{ kind: "method", name: "Lock" }, { kind: "method", name: "Unlock" }, { kind: "method", name: "RLock" }, { kind: "method", name: "RUnlock" }] },
    { goName: "sync.Once", tsModule: "go/sync.ts", tsName: "Once", kind: "class", arity: 0, members: [{ kind: "method", name: "Do", parameters: [{ names: ["f"], type: { kind: "func", text: "func()", parameters: [], results: [] } }] }] },
    { goName: "sync.WaitGroup", tsModule: "go/sync.ts", tsName: "WaitGroup", kind: "class", arity: 0, members: [{ kind: "method", name: "Add", parameters: [{ names: ["delta"], type: intType }] }, { kind: "method", name: "Done" }, { kind: "method", name: "Wait" }] },
    { goName: "sync.Map", tsModule: "go/sync.ts", tsName: "Map", kind: "class", arity: 0 },
    ...["Bool", "Int32", "Int64", "Uint32", "Uint64"].map((name) => ({ goName: `sync/atomic.${name}`, tsModule: "go/sync/atomic.ts", tsName: name, kind: "class", arity: 0 })),
    { goName: "regexp.Regexp", tsModule: "go/regexp.ts", tsName: "Regexp", kind: "class", arity: 0, members: [{ kind: "method", name: "MatchString", parameters: [{ names: ["s"], type: stringType }], results: [{ type: boolType }] }] },
    { goName: "strings.Builder", tsModule: "go/strings.ts", tsName: "Builder", kind: "class", arity: 0, members: [{ kind: "method", name: "String", results: [{ type: stringType }] }] },
    { goName: "testing.T", tsModule: "go/testing.ts", tsName: "T", kind: "class", arity: 0 },
    { goName: "testing.B", tsModule: "go/testing.ts", tsName: "B", kind: "class", arity: 0 },
    { goName: "testing.M", tsModule: "go/testing.ts", tsName: "M", kind: "class", arity: 0 },
    { goName: "testing.TB", tsModule: "go/testing.ts", tsName: "TB", kind: "interface", arity: 0 },
  ];
}
