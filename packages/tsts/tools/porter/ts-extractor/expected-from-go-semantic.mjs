// Declaration-only Go -> TypeScript signature mapping. Every input type comes
// from go/types; source spelling and function bodies are never consulted.

import { semanticVariants } from "../core/semantic-variants.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { blankValueName, safeIdentifier, safeParamName, uniqueName } from "../core/names.mjs";

export const ref = (id, args = []) => ({ t: "ref", id, args });

export function buildExpectedIndex(config, snapshot, tsById, profile, generatedTypeDeclarations = new Map()) {
  const pkgType = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      const ts = tsById.get(unit.id);
      const targetPath = ts?.path ?? exactGeneratedTypePath(config, file.importPath, unit.name, generatedTypeDeclarations);
      if (targetPath === undefined) continue;
      if (ts === undefined && (!Array.isArray(unit.semantic) || unit.semantic.length === 0)) {
        setExactIndexEntry(pkgType, objectKey(file.importPath, unit.name), targetPath, "TypeScript declaration path");
        continue;
      }
      for (const variant of semanticVariants(unit)) {
        const object = variant.type?.object;
        if (!object) continue;
        const key = objectKey(object.packagePath, object.name);
        setExactIndexEntry(pkgType, key, targetPath, "TypeScript declaration path");
      }
    }
  }
  return {
    goModule: config.goModulePath,
    tsRoot: config.tsRoot,
    core: profile.modules.core,
    compat: profile.modules.compat,
    bridge: profile.bridge,
    primKeyword: profile.primitives.keyword,
    primCore: profile.primitives.core,
    primCompat: profile.primitives.compat,
    constantRepresentations: {
      bigintBasics: new Set(profile.constantRepresentations?.bigintBasics ?? []),
      bigintNamedTypes: new Set(profile.constantRepresentations?.bigintNamedTypes ?? []),
    },
    stdlibTypes: profile.stdlibTypes,
    facadeTemplate: profile.facadeTemplate,
    pkgType,
  };
}

function exactGeneratedTypePath(config, importPath, name, generatedTypeDeclarations) {
  if (typeof name !== "string" || name.length === 0) return undefined;
  const packageDirectory = importPath === config.goModulePath
    ? config.tsRoot
    : importPath.startsWith(`${config.goModulePath}/`)
      ? `${config.tsRoot}/${importPath.slice(config.goModulePath.length + 1)}`
      : undefined;
  if (packageDirectory === undefined) return undefined;
  const candidates = [...(generatedTypeDeclarations.get(name) ?? [])]
    .filter((moduleId) => moduleId === packageDirectory || moduleId.startsWith(`${packageDirectory}/`))
    .sort(compareText);
  if (candidates.length > 1) {
    throw new Error(`Go type '${importPath}.${name}' has ambiguous generated TypeScript declarations: ${candidates.join(", ")}`);
  }
  return candidates[0];
}

export function goUnitDescriptor(unit, index) {
  const variants = semanticVariants(unit);
  if (variants.length === 0) return { kind: "other", issue: "missing canonical Go declaration semantics" };
  const byDescriptor = new Map();
  const seenProfiles = new Set();
  for (const semantic of variants) {
    for (const profile of semantic.profiles ?? []) {
      if (seenProfiles.has(profile)) throw new Error(`Go unit '${unit.id}' duplicates semantic profile '${profile}'`);
      seenProfiles.add(profile);
      const descriptor = semanticUnitDescriptor(unit, semantic, index, profile);
      const key = JSON.stringify(descriptor);
      const row = byDescriptor.get(key) ?? { descriptor, profiles: [] };
      row.profiles.push(profile);
      byDescriptor.set(key, row);
    }
  }
  const rows = [...byDescriptor.values()].map((row) => ({ ...row, profiles: row.profiles.sort((left, right) => left - right) }));
  rows.sort((left, right) => compareText(JSON.stringify(left.descriptor), JSON.stringify(right.descriptor)));
  if (rows.length === 1) return rows[0].descriptor;
  return { kind: "profileVariants", variants: rows };
}

function semanticUnitDescriptor(unit, semantic, index, profile) {
  if ((unit.kind === "func" || unit.kind === "method") && semantic.signature) {
    return functionUnitDescriptor(unit, semantic.signature, index);
  }
  if (unit.kind === "type" && semantic.type) {
    return typeUnitDescriptor(unit, semantic.type, index, profile);
  }
  if ((unit.kind === "constGroup" || unit.kind === "varGroup") && Array.isArray(semantic.valueSpecs)) {
    return valueUnitDescriptor(unit, semantic.valueSpecs, index);
  }
  return { kind: "other", issue: `canonical Go declaration kind '${semantic.kind}' does not match unit kind '${unit.kind}'` };
}

function functionUnitDescriptor(unit, signature, index) {
  const context = signatureContext(index, signature);
  const descriptor = signatureDescriptor(signature, context, {
    includeReceiver: unit.kind === "method",
  });
  return {
    kind: "func",
    modifiers: ["export"],
    signatures: [{ role: "implementation", declarationModifiers: ["export"], ...descriptor }],
  };
}

function typeUnitDescriptor(unit, declaration, index, profile) {
  const context = typeDeclarationContext(index, declaration);
  const typeParams = semanticTypeParameters(declaration.typeParameters, context, { defaultUnknown: true });
  const rhs = declaration.rhs;
  if (!rhs) return { kind: "other", issue: "Go type declaration has no canonical RHS" };
  if (rhs.kind === "struct") {
    const modifiers = ["export"];
    const heritage = [];
    const members = inlineStructMembers(rhs.struct, context, "declaration");
    return {
      kind: "interface",
      modifiers,
      typeParams,
      heritage,
      members,
      fragments: [{ modifiers, typeParams, heritage, members }],
    };
  }
  if (rhs.kind === "interface") {
    const modifiers = ["export"];
    const heritage = [];
    const members = interfaceMembers(rhs.interface, context);
    return {
      kind: "interface",
      modifiers,
      typeParams,
      heritage,
      members,
      fragments: [{ modifiers, typeParams, heritage, members }],
    };
  }
  return { kind: "alias", modifiers: ["export"], typeParams, type: semanticTypeDescriptor(rhs, context) };
}

function valueUnitDescriptor(unit, specs, index) {
  const declarations = [];
  const usedNames = new Set();
  let blankIndex = 0;
  for (const spec of specs) {
    for (const binding of spec.names ?? []) {
      const type = binding.type ?? binding.object?.type;
      const baseName = binding.name === "_" ? blankValueName(unit, blankIndex++) : safeIdentifier(binding.name);
      const declaration = {
        name: uniqueName(baseName, usedNames),
        declarationKind: unit.kind === "constGroup" ? "const" : "let",
        type: type ? semanticTypeDescriptor(type, emptyContext(index)) : undefined,
        missing: !type,
        definite: false,
        modifiers: ["export"],
      };
      if (unit.kind === "constGroup") {
        declaration.value = binding.constant ? semanticConstantValue(binding.constant, type, index) : undefined;
        declaration.valueIssue = binding.constant ? undefined : "go/types did not provide an exact constant value";
        declaration.initializerStatus = binding.constant ? "known" : "unsupported";
      }
      declarations.push(declaration);
    }
  }
  return { kind: "value", decls: declarations };
}

function semanticConstantValue(constant, type, index) {
  if (constant.kind === "Bool") return { kind: "boolean", value: constant.exact === "true" };
  if (constant.kind === "String") {
    if (typeof constant.stringValue !== "string") throw new Error("canonical Go String constant has no decoded stringValue");
    return { kind: "string", value: constant.stringValue };
  }
  if (constant.kind === "Int" && semanticConstantUsesBigInt(type, index)) {
    return { kind: "bigint", value: normalizeRationalText(constant.exact) };
  }
  if (constant.kind === "Int" || constant.kind === "Float") {
    return { kind: "number", value: normalizeRationalText(constant.exact) };
  }
  if (constant.kind === "Complex") return { kind: "complex", value: constant.exact };
  return { kind: `unsupported:${constant.kind}`, value: constant.exact };
}

function semanticConstantUsesBigInt(type, index) {
  const representations = index.constantRepresentations ?? {};
  if (type?.kind === "basic") return representations.bigintBasics?.has(type.basic?.name) === true;
  if (type?.kind === "named" || type?.kind === "alias") {
    return representations.bigintNamedTypes?.has(type.reference?.objectId) === true;
  }
  return false;
}

function normalizeRationalText(text) {
  const source = String(text);
  const slash = source.indexOf("/");
  if (slash < 0) return source;
  const numerator = BigInt(source.slice(0, slash));
  const denominator = BigInt(source.slice(slash + 1));
  const divisor = bigintGcd(numerator, denominator);
  const left = numerator / divisor;
  const right = denominator / divisor;
  return right === 1n ? String(left) : `${left}/${right}`;
}

function bigintGcd(left, right) {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b !== 0n) [a, b] = [b, a % b];
  return a === 0n ? 1n : a;
}

export function semanticTypeDescriptor(type, context) {
  if (!type || typeof type.kind !== "string") throw new Error("missing canonical go/types descriptor");
  switch (type.kind) {
    case "basic":
      return basicDescriptor(type.basic, context.index);
    case "named":
    case "alias":
      return referenceDescriptor(type.reference, context);
    case "typeParameter":
      return typeParameterDescriptor(type.typeParameter, context);
    case "pointer":
      return ref(`${context.index.compat}::${context.index.bridge.pointer}`, [semanticTypeDescriptor(type.element, context)]);
    case "slice":
      return ref(`${context.index.compat}::${context.index.bridge.slice}`, [semanticTypeDescriptor(type.element, context)]);
    case "array":
      return ref(`${context.index.compat}::${context.index.bridge.array}`, [
        semanticTypeDescriptor(type.element, context),
        { t: "literal", kind: "string", value: String(requireExactArrayLength(type.length)) },
      ]);
    case "map":
      return ref(`${context.index.compat}::${context.index.bridge.map}`, [
        semanticTypeDescriptor(type.key, context),
        semanticTypeDescriptor(type.element, context),
      ]);
    case "channel":
      return ref(`${context.index.compat}::${context.index.bridge.chan}`, [
        semanticTypeDescriptor(type.element, context),
        { t: "literal", kind: "string", value: type.direction },
      ]);
    case "signature":
      return signatureTypeDescriptor(type.signature, context);
    case "tuple":
      return { t: "tuple", elements: (type.tuple?.variables ?? []).map((variable) => semanticTypeDescriptor(variable.type, context)) };
    case "struct":
      return { t: "object", members: inlineStructMembers(type.struct, context, "type") };
    case "interface":
      return interfaceTypeDescriptor(type.interface, context);
    case "union":
      return unionDescriptor(type.union, context);
    default:
      throw new Error(`unsupported canonical go/types descriptor '${type.kind}'`);
  }
}

function basicDescriptor(basic, index) {
  if (!basic || typeof basic.name !== "string") throw new Error("invalid canonical Go basic type");
  const name = defaultBasicName(basic.name, basic.untyped);
  if (name in index.primKeyword) return { t: "kw", kw: index.primKeyword[name] };
  if (name in index.primCore) return ref(`${index.core}::${index.primCore[name]}`);
  if (name in index.primCompat) return ref(`${index.compat}::${index.primCompat[name]}`);
  if (name === "unsafe.Pointer") return ref(`${index.compat}::GoUnsafePointer`);
  throw new Error(`unmapped canonical Go basic type '${basic.name}'`);
}

function defaultBasicName(name, untyped) {
  if (!untyped) return name;
  const defaults = {
    "untyped bool": "bool",
    "untyped int": "int",
    "untyped rune": "rune",
    "untyped float": "float64",
    "untyped complex": "complex128",
    "untyped string": "string",
  };
  const mapped = defaults[name];
  if (!mapped) throw new Error(`unmapped untyped Go basic '${name}'`);
  return mapped;
}

function referenceDescriptor(reference, context) {
  if (!reference) throw new Error("canonical Go named/alias type has no reference identity");
  const args = (reference.typeArgs ?? []).map((argument) => semanticTypeDescriptor(argument, context));
  const name = reference.name;
  const packagePath = reference.packagePath;
  if (!packagePath) {
    if (name in context.index.primKeyword) return { t: "kw", kw: context.index.primKeyword[name] };
    if (name in context.index.primCore) return ref(`${context.index.core}::${context.index.primCore[name]}`, args);
    if (name in context.index.primCompat) return ref(`${context.index.compat}::${context.index.primCompat[name]}`, args);
    return ref(`name::${name}`, args);
  }
  const configured = context.index.stdlibTypes[`${packagePath}.${name}`];
  if (configured) return ref(`${context.index.compat}::${configured}`, args);
  if (isInternal(packagePath, context.index.goModule)) {
    const target = context.index.pkgType.get(objectKey(packagePath, name));
    if (target === undefined) throw new Error(`internal Go type '${packagePath}.${name}' has no exact @tsgo-unit declaration identity`);
    return ref(`${target}::${name}`, args);
  }
  return ref(`${context.index.facadeTemplate.replace("{importPath}", packagePath)}::${name}`, args);
}

function typeParameterDescriptor(reference, context) {
  if (!reference) throw new Error("canonical Go type parameter has no owner identity");
  const binding = context.typeParameters.get(typeParameterKey(reference));
  if (binding === undefined) throw new Error(`unbound Go type parameter ${typeParameterKey(reference)}`);
  return { t: "tp", depth: binding.depth, index: binding.index };
}

function signatureTypeDescriptor(signature, parentContext) {
  const context = signatureContext(parentContext.index, signature, parentContext.typeParameters);
  return { t: "fn", ...signatureDescriptor(signature, context, { includeReceiver: false }) };
}

function signatureDescriptor(signature, context, options) {
  if (!signature) throw new Error("missing canonical Go signature");
  const params = [];
  const usedNames = new Set();
  if (options.includeReceiver) {
    if (!signature.receiver?.type) throw new Error("Go method signature has no receiver");
    params.push(callableParameterDescriptor(
      uniqueName("receiver", usedNames),
      semanticTypeDescriptor(signature.receiver.type, context),
      false,
    ));
  }
  const variables = signature.parameters?.variables ?? [];
  let syntheticIndex = 0;
  for (let index = 0; index < variables.length; index++) {
    const variable = variables[index];
    const rest = signature.variadic && index === variables.length - 1;
    const parameterType = rest ? variadicElement(variable.type) : variable.type;
    const baseName = variable.name === "" ? `arg${syntheticIndex++}` : safeParamName(variable.name);
    const name = uniqueName(baseName, usedNames);
    const type = rest
      ? { t: "array", element: semanticTypeDescriptor(parameterType, context) }
      : semanticTypeDescriptor(parameterType, context);
    params.push(callableParameterDescriptor(name, type, rest));
  }
  return {
    params,
    ret: resultDescriptor(signature.results, context),
    missingReturnType: false,
    returnTypePolicy: "required",
    typeParams: semanticTypeParameters([
      ...(signature.receiverTypeParameters ?? []),
      ...(signature.typeParameters ?? []),
    ], context),
    signatureModifiers: [],
  };
}

function callableParameterDescriptor(name, type, rest) {
  return {
    name,
    role: "parameter",
    modifiers: [],
    type,
    rest,
    optional: false,
    optionalSyntax: "required",
    question: false,
    missingType: false,
    initializerStatus: "missing",
    initializer: undefined,
    initializerIssue: undefined,
  };
}

function variadicElement(type) {
  if (type?.kind !== "slice" || !type.element) throw new Error("Go variadic parameter is not represented by a canonical slice type");
  return type.element;
}

function resultDescriptor(tuple, context) {
  const results = (tuple?.variables ?? []).map((variable) => semanticTypeDescriptor(variable.type, context));
  if (results.length === 0) return { t: "kw", kw: "void" };
  if (results.length === 1) return results[0];
  return { t: "tuple", elements: results };
}

function semanticTypeParameters(parameters, context, options = {}) {
  return (parameters ?? []).map((parameter) => {
    const binding = context.typeParameters.get(typeParameterKey(parameter.reference));
    if (binding === undefined) throw new Error(`unbound Go type parameter ${typeParameterKey(parameter.reference)}`);
    return {
      name: safeIdentifier(parameter.reference.name),
      binding: { depth: binding.depth, index: binding.index },
      modifiers: { const: false, variance: null, unsupported: [] },
      constraint: semanticTypeDescriptor(parameter.constraint, context),
      default: options.defaultUnknown ? { t: "kw", kw: "unknown" } : null,
      invalidConstraint: null,
    };
  });
}

function inlineStructMembers(structure, context, contract) {
  const members = [];
  let embedded = 0;
  let blank = 0;
  for (const field of structure?.fields ?? []) {
    const variable = field.variable;
    const declarationMember = contract === "declaration";
    const name = variable.embedded
      ? `__tsgoEmbedded${declarationMember ? embedded++ : members.length}`
      : variable.name === "_" && declarationMember ? `__tsgoBlank${blank++}` : variable.name;
    members.push({
      kind: "property",
      name,
      modifiers: variable.embedded && declarationMember ? ["readonly"] : [],
      optional: variable.embedded && declarationMember || undefined,
      type: semanticTypeDescriptor(variable.type, context),
    });
  }
  return members.length === 0 ? [emptyObjectMember(contract)] : members;
}

function interfaceMembers(value, context) {
  const members = [];
  for (const method of value?.explicitMethods ?? []) {
    members.push({ kind: "method", name: method.name, modifiers: [], type: methodFunctionType(method, context) });
  }
  let embedded = 0;
  for (const type of value?.embeddedTypes ?? []) {
    members.push({
      kind: "property",
      name: `__tsgoEmbedded${embedded++}`,
      modifiers: ["readonly"],
      optional: true,
      type: semanticTypeDescriptor(type, context),
    });
  }
  if (members.length === 0) return [emptyObjectMember("declaration")];
  return members;
}

function methodFunctionType(method, context) {
  const signatureContextValue = signatureContext(context.index, method.signature, context.typeParameters);
  const descriptor = signatureDescriptor(method.signature, signatureContextValue, {
    includeReceiver: false,
  });
  return { t: "fn", ...descriptor };
}

function interfaceTypeDescriptor(value, context) {
  const typeSet = [];
  const methodMembers = (value?.explicitMethods ?? []).map((method) => ({
    kind: "property",
    name: method.name,
    modifiers: [],
    type: signatureTypeDescriptor(method.signature, context),
  }));
  if (methodMembers.length > 0) typeSet.push({ t: "object", members: methodMembers });
  let embeddedIndex = 0;
  for (const embedded of value?.embeddedTypes ?? []) {
    typeSet.push({
      t: "object",
      members: [{
        kind: "property",
        name: `__tsgoEmbedded${embeddedIndex++}`,
        modifiers: [],
        readonly: true,
        optional: true,
        type: semanticTypeDescriptor(embedded, context),
      }],
    });
  }
  if (value?.comparable && typeSet.length === 0) return ref("name::comparable");
  if (typeSet.length === 0) return { t: "kw", kw: "unknown" };
  return typeSet.length === 1 ? typeSet[0] : { t: "intersect", members: typeSet };
}

function unionDescriptor(union, context) {
  const terms = (union?.terms ?? []).map((term) => {
    const type = semanticTypeDescriptor(term.type, context);
    return term.tilde ? { t: "goApprox", type } : type;
  });
  if (terms.length === 0) throw new Error("canonical Go union has no terms");
  return terms.length === 1 ? terms[0] : { t: "union", members: terms };
}

function emptyObjectMember(contract) {
  return {
    kind: "property",
    name: "__tsgoEmpty",
    modifiers: contract === "declaration" ? ["readonly"] : [],
    ...(contract === "type" ? { readonly: true } : {}),
    optional: true,
    type: { t: "kw", kw: "never" },
  };
}

function signatureContext(index, signature, inherited = new Map()) {
  const parameters = [...(signature?.receiverTypeParameters ?? []), ...(signature?.typeParameters ?? [])];
  const typeParameters = bindTypeParameters(parameters, inherited);
  return { index, typeParameters };
}

function typeDeclarationContext(index, declaration) {
  return { index, typeParameters: bindTypeParameters(declaration.typeParameters ?? [], new Map()) };
}

function bindTypeParameters(parameters, inherited) {
  const typeParameters = new Map(inherited);
  if (parameters.length === 0) return typeParameters;
  const inheritedBindings = [...inherited.values()];
  const depth = inheritedBindings.length === 0 ? 0 : Math.max(...inheritedBindings.map((binding) => binding.depth)) + 1;
  parameters.forEach((parameter, index) => {
    typeParameters.set(typeParameterKey(parameter.reference), { depth, index });
  });
  return typeParameters;
}

function emptyContext(index) {
  return { index, typeParameters: new Map() };
}

function typeParameterKey(reference) {
  return `${reference.ownerId}::${reference.role}::${reference.index}`;
}

function requireExactArrayLength(length) {
  if (typeof length !== "string" || !/^(0|[1-9][0-9]*)$/.test(length)) throw new Error(`invalid canonical Go array length '${length}'`);
  return length;
}

function objectKey(packagePath, name) {
  return `${packagePath}::${name}`;
}

function setExactIndexEntry(index, key, value, label, equal = Object.is) {
  if (index.has(key) && !equal(index.get(key), value)) {
    throw new Error(`${label} identity '${key}' is ambiguous`);
  }
  index.set(key, value);
}

function isInternal(importPath, goModule) {
  return importPath === goModule || importPath.startsWith(`${goModule}/`);
}
