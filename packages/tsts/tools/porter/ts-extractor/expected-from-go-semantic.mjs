import { compareText } from "../core/deterministic-order.mjs";
import { blankValueName, safeIdentifier, uniqueName } from "../core/names.mjs";
import { semanticVariants } from "../core/semantic-variants.mjs";
import { semanticTypeContexts } from "../core/semantic-type-nilability.mjs";
import { canonicalizeGoTypeConstraint } from "./constraint-canonicalization.mjs";
import { buildDeclaredTypeRhsIndex, semanticConstantUsesBigInt } from "./constant-representation.mjs";
import {
  bindTypeParameters,
  semanticContractDescriptor,
  semanticSignatureDescriptor,
} from "./semantic-contract-descriptor.mjs";
import {
  semanticTypeDeclarationContract,
} from "./semantic-named-nilability.mjs";
import {
  addProfileSemanticStorageEvidence,
  buildTypeRepresentationEvidence,
} from "./semantic-pointer-lowering.mjs";
import {
  lowerSemanticSignature,
  lowerSemanticType,
  lowerSemanticTypeParameters,
  semanticContextWithTypeParameters,
} from "./semantic-type-contract.mjs";
import { buildTypeStorageIdentityMap } from "../core/type-storage-policies.mjs";

export const ref = (id, args = []) => ({ t: "ref", id, args });

export function buildExpectedIndex(config, snapshot, tsById, profile, generatedTypeOwnership = new Map(), options = {}) {
  requireOnlyOptions(options, new Set(["externalFacadeStorageView"]), "expected signature index");
  const evidence = addProfileSemanticStorageEvidence(
    buildTypeRepresentationEvidence(config, snapshot, options.externalFacadeStorageView),
    profile,
    buildTypeStorageIdentityMap(config, snapshot),
  );
  const pkgType = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      const ts = tsById.get(unit.id);
      if (ts === undefined && (!Array.isArray(unit.semantic) || unit.semantic.length === 0)) continue;
      for (const variant of semanticVariants(unit)) {
        const object = variant.type?.object;
        if (object === undefined) continue;
        const generated = generatedTypeOwnership.get(object.id);
        if (ts === undefined && generated === undefined) continue;
        const owner = ts === undefined
          ? { moduleId: generated.moduleId, tsName: generated.tsName }
          : { moduleId: ts.path, tsName: unit.name };
        setExactIndexEntry(pkgType, object.id, owner, "TypeScript declaration owner", sameDeclarationOwner);
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
    declaredTypeRhsByProfile: buildDeclaredTypeRhsIndex(snapshot),
    declaredTypeContractsByProfile: evidence.declaredTypeContractsByProfile,
    externalTypeContracts: evidence.externalTypeContracts,
    dependencyTypeContractsByProfile: evidence.dependencyTypeContractsByProfile,
    dependencyPointerTerminalsByProfile: evidence.dependencyPointerTerminalsByProfile,
    externalFacadeArities: evidence.externalFacadeArities,
    namedTypeStorage: evidence.namedTypeStorage,
    rawInterfaceObjects: evidence.rawInterfaceObjects,
    storageCarrierByIdentity: evidence.storageCarrierByIdentity,
    knownStorageIdentities: evidence.knownStorageIdentities,
    goConstraintId: profile.conventions?.goConstraintId,
    pkgType,
  };
}

export function goUnitDescriptor(unit, index) {
  const byDescriptor = new Map();
  const seenProfiles = new Set();
  for (const semantic of semanticVariants(unit)) {
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

export function semanticTypeDescriptor(type, context, options = {}) {
  requireOnlyOptions(options, new Set(["typeContext"]), "semantic type descriptor");
  const typeContext = options.typeContext ?? semanticTypeContexts.value;
  const loweringContext = {
    index: context.index,
    profile: context.profile,
    typeParameterConstraints: context.typeParameterConstraints,
  };
  const contract = lowerSemanticType(type, loweringContext, typeContext);
  return semanticContractDescriptor(contract, context, descriptorOperations(context.index));
}

function semanticUnitDescriptor(unit, semantic, index, profile) {
  if ((unit.kind === "func" || unit.kind === "method") && semantic.signature !== undefined) {
    return functionUnitDescriptor(unit, semantic.signature, index, profile);
  }
  if (unit.kind === "type" && semantic.type !== undefined) return typeUnitDescriptor(unit, semantic.type, index, profile);
  if ((unit.kind === "constGroup" || unit.kind === "varGroup") && Array.isArray(semantic.valueSpecs)) {
    return valueUnitDescriptor(unit, semantic.valueSpecs, index, profile);
  }
  return { kind: "other", issue: `canonical Go declaration kind '${semantic.kind}' does not match unit kind '${unit.kind}'` };
}

function functionUnitDescriptor(unit, signature, index, profile) {
  const contract = lowerSemanticSignature(signature, { index, profile }, { includeReceiver: unit.kind === "method" });
  const descriptor = semanticSignatureDescriptor(contract, { typeParameters: new Map() }, descriptorOperations(index), {
    includeReceiver: unit.kind === "method",
  });
  descriptor.typeParams = signatureTypeParameterDescriptors(contract, descriptor.typeParams, unit.typeParameterDetails, index);
  return {
    kind: "func",
    modifiers: ["export"],
    signatures: [{ role: "implementation", declarationModifiers: ["export"], ...descriptor }],
  };
}

function typeUnitDescriptor(unit, declaration, index, profile) {
  semanticTypeDeclarationContract(declaration, `Go type unit '${unit.id}'`);
  const loweringContext = semanticContextWithTypeParameters({ index, profile }, declaration.typeParameters ?? []);
  const loweredParameters = lowerSemanticTypeParameters(declaration.typeParameters ?? [], loweringContext);
  const typeParameters = bindTypeParameters(loweredParameters, new Map());
  const descriptorContext = { typeParameters };
  const typeParams = declarationTypeParameterDescriptors(
    loweredParameters,
    descriptorContext,
    unit.typeParameterDetails,
    index,
  );
  const operations = descriptorOperations(index);
  const rhs = declaration.rhs;

  if (declaration.alias === true) {
    return {
      kind: "alias",
      modifiers: ["export"],
      typeParams,
      type: declarationRhsDescriptor(rhs, loweringContext, descriptorContext, operations),
    };
  }
  if (rhs.kind === "struct") {
    const contract = lowerSemanticType(rhs, loweringContext, semanticTypeContexts.declarationShape);
    validateStructSyntax(contract, unit.members, unit.id);
    const object = semanticContractDescriptor(contract, descriptorContext, operations, { objectContract: "declaration" });
    const members = object.members;
    const modifiers = ["export"];
    const heritage = [];
    return { kind: "interface", modifiers, typeParams, heritage, members, fragments: [{ modifiers, typeParams, heritage, members }] };
  }
  if (rhs.kind === "interface") {
    const shape = lowerSemanticType(rhs, loweringContext, semanticTypeContexts.constraint);
    const { heritage, members } = interfaceDeclarationShape(shape, unit.members, descriptorContext, operations, unit.id);
    const modifiers = ["export"];
    return { kind: "interface", modifiers, typeParams, heritage, members, fragments: [{ modifiers, typeParams, heritage, members }] };
  }
  return {
    kind: "alias",
    modifiers: ["export"],
    typeParams,
    type: declarationRhsDescriptor(rhs, loweringContext, descriptorContext, operations),
  };
}

function declarationRhsDescriptor(rhs, loweringContext, descriptorContext, operations) {
  const contract = lowerSemanticType(rhs, loweringContext, semanticTypeContexts.declarationShape);
  return semanticContractDescriptor(contract, descriptorContext, operations);
}

function valueUnitDescriptor(unit, specs, index, profile) {
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
        type: type ? semanticTypeDescriptor(type, emptyContext(index, profile)) : undefined,
        missing: !type,
        definite: false,
        modifiers: ["export"],
      };
      if (unit.kind === "constGroup") {
        declaration.value = binding.constant ? semanticConstantValue(binding.constant, type, index, profile) : undefined;
        declaration.valueIssue = binding.constant ? undefined : "go/types did not provide an exact constant value";
        declaration.initializerStatus = binding.constant ? "known" : "unsupported";
      }
      declarations.push(declaration);
    }
  }
  return { kind: "value", decls: declarations };
}

function interfaceDeclarationShape(shape, sourceMembers, context, operations, unitId) {
  if (shape.kind !== "interfaceShape") throw new Error(`Go interface unit '${unitId}' did not lower to an interface shape`);
  if (!Array.isArray(sourceMembers)) throw new Error(`Go interface unit '${unitId}' has no syntax member order`);
  const members = [];
  const heritageTypes = [];
  let methodIndex = 0;
  let embeddedIndex = 0;
  for (const sourceMember of sourceMembers) {
    if (sourceMember?.kind === "method") {
      const method = shape.methods[methodIndex++];
      if (method === undefined || method.name !== sourceMember.name) throw new Error(`Go interface unit '${unitId}' syntax/semantic method order differs`);
      members.push({
        kind: "method",
        name: method.name,
        role: "signature",
        modifiers: [],
        type: { t: "fn", ...semanticSignatureDescriptor(method.signature, context, operations) },
      });
      continue;
    }
    if (sourceMember?.kind !== "embeddedInterface") throw new Error(`Go interface unit '${unitId}' has unsupported syntax member '${sourceMember?.kind}'`);
    const embedded = shape.embedded[embeddedIndex++];
    if (embedded === undefined) throw new Error(`Go interface unit '${unitId}' has more syntax embeddings than semantic embeddings`);
    const descriptor = semanticContractDescriptor(embedded.type, context, operations);
    if (embedded.embeddingKind === "interface") heritageTypes.push(descriptor);
    else members.push({ kind: "property", name: `__tsgoEmbedded${embeddedIndex - 1}`, modifiers: ["readonly"], optional: true, type: descriptor });
  }
  if (methodIndex !== shape.methods.length || embeddedIndex !== shape.embedded.length) {
    throw new Error(`Go interface unit '${unitId}' syntax/semantic member counts differ`);
  }
  if (members.length === 0) members.push(emptyDeclarationMember());
  return { heritage: heritageTypes.length === 0 ? [] : [{ token: "extends", space: "type", types: heritageTypes }], members };
}

function declarationTypeParameterDescriptors(parameters, context, sourceParameters, index) {
  return parameters.map((parameter, parameterIndex) => {
    const source = sourceParameters?.[parameterIndex];
    if (source !== undefined && source.name !== parameter.reference.name) throw new Error(`Go source and semantic type parameter #${parameterIndex} names differ`);
    const binding = context.typeParameters.get(typeParameterKey(parameter.reference));
    const constraint = canonicalizeGoTypeConstraint(
      semanticContractDescriptor(parameter.constraint, context, descriptorOperations(index)),
      source?.constraint,
      index,
    );
    return typeParameterDescriptor(parameter.reference.name, binding, constraint, null);
  });
}

function signatureTypeParameterDescriptors(contract, descriptors, sourceParameters, index) {
  const receiverCount = contract.receiverTypeParameters.length;
  return descriptors.map((descriptor, parameterIndex) => {
    const parameter = parameterIndex < receiverCount
      ? contract.receiverTypeParameters[parameterIndex]
      : contract.typeParameters[parameterIndex - receiverCount];
    const source = parameterIndex < receiverCount ? undefined : sourceParameters?.[parameterIndex - receiverCount];
    if (source !== undefined && source.name !== parameter.reference.name) throw new Error(`Go source and semantic type parameter #${parameterIndex - receiverCount} names differ`);
    return {
      ...descriptor,
      name: safeIdentifier(parameter.reference.name),
      constraint: canonicalizeGoTypeConstraint(descriptor.constraint, source?.constraint, index),
    };
  });
}

function descriptorOperations(index) {
  return {
    basic: (name) => basicDescriptor(name, index),
    carrierId: (key) => `${index.compat}::${requireBridge(index, key)}`,
    pointerCarrierId: (representation) => `${index.compat}::${requireBridge(index, pointerBridgeKey(representation))}`,
    compatId: (name) => `${index.compat}::${name}`,
    reference: (reference, argumentsList) => referenceDescriptor(reference, argumentsList, index),
  };
}

function basicDescriptor(name, index) {
  if (Object.hasOwn(index.primKeyword, name)) return { t: "kw", kw: index.primKeyword[name] };
  if (Object.hasOwn(index.primCore, name)) return ref(`${index.core}::${index.primCore[name]}`);
  if (Object.hasOwn(index.primCompat, name)) return ref(`${index.compat}::${index.primCompat[name]}`);
  throw new Error(`unmapped canonical Go basic type '${name}'`);
}

function referenceDescriptor(reference, argumentsList, index) {
  const { packagePath, name } = reference;
  if (packagePath === "") {
    if (Object.hasOwn(index.primKeyword, name)) return withArguments({ t: "kw", kw: index.primKeyword[name] }, argumentsList, reference.objectId);
    if (Object.hasOwn(index.primCore, name)) return ref(`${index.core}::${index.primCore[name]}`, argumentsList);
    if (Object.hasOwn(index.primCompat, name)) return ref(`${index.compat}::${index.primCompat[name]}`, argumentsList);
    throw new Error(`builtin Go type '${reference.objectId}' has no exact TypeScript mapping`);
  }
  const goName = `${packagePath}.${name}`;
  const storageIdentity = index.namedTypeStorage.get(reference.objectId);
  if (storageIdentity !== undefined) return ref(storageIdentity, argumentsList);
  if (isInternal(packagePath, index.goModule)) {
    const target = index.pkgType.get(reference.objectId);
    if (target === undefined) throw new Error(`internal Go type '${goName}' has no exact declaration ownership identity`);
    return ref(`${target.moduleId}::${target.tsName}`, argumentsList);
  }
  const external = index.externalTypeContracts.get(reference.objectId);
  if (external !== undefined) {
    const exactArity = index.externalFacadeArities.get(reference.objectId);
    if (exactArity === undefined || argumentsList.length !== exactArity) {
      throw new Error(`external Go type '${reference.objectId}' expected exact facade arity '${exactArity ?? "missing"}', got ${argumentsList.length}`);
    }
    return ref(external.storageIdentity, argumentsList);
  }
  throw new Error(`Go type '${reference.objectId}' has no exact declaration or profile storage identity`);
}

export function semanticConstantValue(constant, type, index, profile) {
  if (constant.kind === "Bool") return { kind: "boolean", value: constant.exact === "true" };
  if (constant.kind === "String") {
    if (typeof constant.stringValue !== "string") throw new Error("canonical Go String constant has no decoded stringValue");
    return { kind: "string", value: constant.stringValue };
  }
  if (constant.kind === "Int" && semanticConstantUsesBigInt(type, index, profile)) return { kind: "bigint", value: normalizeRationalText(constant.exact) };
  if (constant.kind === "Int" || constant.kind === "Float") return { kind: "number", value: normalizeRationalText(constant.exact) };
  if (constant.kind === "Complex") return { kind: "complex", value: constant.exact };
  return { kind: `unsupported:${constant.kind}`, value: constant.exact };
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

function typeParameterDescriptor(name, binding, constraint, defaultType) {
  if (binding === undefined) throw new Error(`unbound Go type parameter '${name}'`);
  return {
    name: safeIdentifier(name),
    binding: { depth: binding.depth, index: binding.index },
    modifiers: { const: false, variance: null, unsupported: [] },
    constraint,
    default: defaultType,
    invalidConstraint: null,
  };
}

function validateStructSyntax(contract, sourceMembers, unitId) {
  if (!Array.isArray(sourceMembers) || sourceMembers.length !== contract.fields.length) throw new Error(`Go struct unit '${unitId}' syntax/semantic field counts differ`);
  for (const [index, field] of contract.fields.entries()) {
    const source = sourceMembers[index];
    const expectedKind = field.embedded ? "embeddedField" : "field";
    if (source?.kind !== expectedKind || (!field.embedded && source.name !== field.name)) {
      throw new Error(`Go struct unit '${unitId}' syntax/semantic field #${index} differs`);
    }
  }
}

function emptyDeclarationMember() {
  return { kind: "property", name: "__tsgoEmpty", modifiers: ["readonly"], optional: true, type: { t: "kw", kw: "never" } };
}

function emptyContext(index, profile) {
  return { index, profile, typeParameters: new Map(), typeParameterConstraints: new Map() };
}

function typeParameterKey(reference) {
  return `${reference.ownerId}::${reference.role}::${reference.index}`;
}

function requireBridge(index, key) {
  const carrier = index.bridge[key];
  if (typeof carrier !== "string" || carrier === "") throw new Error(`canonical Go carrier '${key}' has no exact bridge identity`);
  return carrier;
}

function pointerBridgeKey(representation) {
  if (representation === "aggregate") return "pointer";
  if (representation === "slot") return "ref";
  if (representation === "constraint") return "pointerConstraint";
  throw new Error(`canonical semantic pointer has unknown representation '${representation}'`);
}

function withArguments(descriptor, argumentsList, objectId) {
  if (argumentsList.length === 0) return descriptor;
  throw new Error(`mapped keyword Go type '${objectId}' cannot accept explicit type arguments`);
}

function setExactIndexEntry(index, key, value, label, equals = Object.is) {
  if (index.has(key) && !equals(index.get(key), value)) throw new Error(`${label} identity '${key}' is ambiguous`);
  index.set(key, value);
}

function sameDeclarationOwner(left, right) {
  return left.moduleId === right.moduleId && left.tsName === right.tsName;
}

function isInternal(importPath, goModule) {
  return importPath === goModule || importPath.startsWith(`${goModule}/`);
}

function requireOnlyOptions(options, allowed, label) {
  if (options === null || typeof options !== "object" || Array.isArray(options)) throw new Error(`${label} options must be an object`);
  const unknown = Object.keys(options).filter((key) => !allowed.has(key));
  if (unknown.length !== 0) throw new Error(`${label} received unsupported option(s): ${unknown.sort().join(", ")}`);
}
