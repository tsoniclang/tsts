import { fail } from "./common.mjs";
import {
  safeIdentifier,
  standardSelectorTypes,
} from "./policy.mjs";
import {
  buildSymbolIndex,
  importAliasMap,
} from "./render-indexes.mjs";

export function authoredFacadePathSet(config) {
  const sourceRootPrefix = config.tsRoot.replace(/\/$/, "");
  const set = new Set();
  for (const entry of config.authoredFacadeModules ?? []) {
    set.add(`${sourceRootPrefix}/${entry.replace(/^\/+/, "")}`);
  }
  return set;
}

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
  for (const usage of collectExternalRefUsages(config, snapshot)) {
    addOrMergeExternalFacade(facades, autoExternalRefFacadePolicy(usage));
  }
  return facades;
}

function addExternalFacade(facades, policy) {
  if (!policy.goName) fail("external facade policy must include goName");
  if (facades.has(policy.goName)) fail(`duplicate external facade policy for ${policy.goName}`);
  facades.set(policy.goName, policy);
}

function addOrMergeExternalFacade(facades, policy) {
  if (!policy.goName) fail("external facade policy must include goName");
  const existing = facades.get(policy.goName);
  if (!existing) {
    facades.set(policy.goName, policy);
    return;
  }
  if (existing.generated && existing.kind === "value" && policy.kind === "functionValue") {
    facades.set(policy.goName, policy);
  }
}

function collectExternalTypeUsages(config, snapshot) {
  const usages = new Map();
  const symbolIndex = buildSymbolIndex(config, snapshot);
  for (const file of snapshot.files ?? []) {
    const aliases = importAliasMap(file.imports ?? []);
    for (const unit of file.units ?? []) {
      collectExternalTypesFromUnit(config, symbolIndex, aliases, file.importPath, unit, usages);
    }
  }
  return [...usages.values()].sort((left, right) => left.goName.localeCompare(right.goName));
}

function collectExternalTypesFromUnit(config, symbolIndex, aliases, currentImportPath, unit, usages) {
  visitTypeExpr(unit.receiverType);
  visitTypeExpr(unit.typeExpression);
  for (const param of unit.typeParameterDetails ?? []) visitTypeExpr(param.constraint);
  for (const param of unit.parameters ?? []) visitTypeExpr(param.type);
  for (const result of unit.results ?? []) visitTypeExpr(result.type);
  for (const spec of unit.valueSpecs ?? []) visitTypeExpr(spec.type);
  for (const member of unit.members ?? []) visitTypeExpr(member.typeExpr);

  function visitTypeExpr(expr) {
    if (!expr) return;
    if (expr.kind === "selector") {
      const goName = externalGoNameForSelector(config, symbolIndex, aliases, currentImportPath, expr);
      if (goName) recordExternalUsage(usages, goName, 0);
    }
    if (expr.kind === "instantiation") {
      if (expr.element?.kind === "selector") {
        const goName = externalGoNameForSelector(config, symbolIndex, aliases, currentImportPath, expr.element);
        if (goName) recordExternalUsage(usages, goName, expr.typeArgs?.length ?? 0);
      }
    }
    visitTypeExpr(expr.element);
    visitTypeExpr(expr.key);
    visitTypeExpr(expr.value);
    visitTypeExpr(expr.left);
    visitTypeExpr(expr.right);
    for (const arg of expr.typeArgs ?? []) visitTypeExpr(arg);
    for (const param of expr.parameters ?? []) visitTypeExpr(param.type);
    for (const result of expr.results ?? []) visitTypeExpr(result.type);
    for (const member of expr.members ?? []) visitTypeExpr(member.typeExpr);
  }
}

function externalGoNameForSelector(config, symbolIndex, aliases, currentImportPath, expr) {
  const importPath = aliases.get(expr.package);
  if (!importPath) return `${expr.package}.${expr.name}`;
  if (standardSelectorTypes.has(`${importPath}.${expr.name}`)) return undefined;
  if (importPath.startsWith(config.goModulePath)) {
    return symbolIndex.has(`${importPath}::${expr.name}`) ? undefined : `${importPath}.${expr.name}`;
  }
  return `${importPath}.${expr.name}`;
}

function recordExternalUsage(usages, goName, arity) {
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

function collectExternalRefUsages(config, snapshot) {
  const usages = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      for (const ref of unit.externalRefs ?? []) {
        if (!ref.importPath || ref.importPath.startsWith(config.goModulePath)) continue;
        const goName = `${ref.importPath}.${ref.name}`;
        const role = ref.role === "call" ? "call" : "value";
        const existing = usages.get(goName);
        if (existing) {
          existing.count += ref.count ?? 1;
          if (role === "call") existing.role = "call";
          continue;
        }
        usages.set(goName, { goName, role, count: ref.count ?? 1 });
      }
    }
  }
  return [...usages.values()].sort((left, right) => left.goName.localeCompare(right.goName));
}

function autoExternalFacadePolicy(usage) {
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

function autoExternalRefFacadePolicy(usage) {
  const { importPath, name } = splitExternalGoName(usage.goName);
  return {
    goName: usage.goName,
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: usage.role === "call" ? "functionValue" : "value",
    arity: 0,
    generated: true,
  };
}

function normalizeExternalFacadePolicy(policy) {
  const { importPath, name } = splitExternalGoName(policy.goName);
  return {
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: "opaque",
    arity: 0,
    ...policy,
  };
}

function splitExternalGoName(goName) {
  const index = goName.lastIndexOf(".");
  if (index <= 0 || index === goName.length - 1) fail(`invalid external Go type name '${goName}'`);
  return { importPath: goName.slice(0, index), name: goName.slice(index + 1) };
}

function externalFacadeModulePath(importPath) {
  return `go/${importPath.split("/").map((segment) => safePathSegment(segment)).join("/")}.ts`;
}

function safePathSegment(segment) {
  return String(segment)
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .replace(/^([.])/, "_$1") || "_";
}

function knownExternalFacadePolicies() {
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
