import { compareText } from "../deterministic-order.mjs";
import { invariantSemanticVariant } from "../semantic-variants.mjs";
import { canonicalStructFieldLayout } from "../struct-field-layout.mjs";

const scalarBasics = new Set([
  "bool", "byte", "float32", "float64", "int", "int8", "int16", "int32", "int64",
  "rune", "string", "uint", "uint8", "uint16", "uint32", "uint64", "uintptr",
]);
const complexBasics = new Set(["complex64", "complex128"]);

export function buildGoValueRequirementShape(type) {
  requireSemanticType(type, "Go value shape");
  switch (type.kind) {
    case "basic": {
      const name = requireBasicName(type.basic);
      if (name === "Pointer") return { kind: "unsafePointer" };
      if (scalarBasics.has(name)) return { kind: "scalar", name };
      if (complexBasics.has(name)) return { kind: "complex", name };
      throw new Error(`Go value shape has unsupported basic type '${name}'`);
    }
    case "named":
    case "alias":
      return {
        kind: "named",
        objectId: requireIdentity(type.reference?.objectId, "named Go value shape objectId"),
        typeArguments: requireArray(type.reference?.typeArgs, "named Go value shape type arguments").map(buildGoValueRequirementShape),
      };
    case "typeParameter":
      return {
        kind: "typeParameter",
        key: typeParameterKey(type.typeParameter),
        name: requireIdentity(type.typeParameter?.name, "Go value shape type-parameter name"),
      };
    case "pointer":
      return { kind: "pointer" };
    case "slice":
      return { kind: "slice" };
    case "map":
      return { kind: "map" };
    case "channel":
      return { kind: "channel" };
    case "signature":
      return { kind: "function" };
    case "interface":
      return { kind: "interface" };
    case "array":
      return {
        kind: "array",
        length: exactArrayLength(type.length),
        element: buildGoValueRequirementShape(type.element),
      };
    case "struct":
      return { kind: "struct", fields: buildStructFields(type.struct) };
    default:
      throw new Error(`Go value shape cannot represent semantic type kind '${type.kind}'`);
  }
}

export function buildGoValueOperationCatalog(units, options = {}) {
  const providers = options.providers ?? new Map();
  requireProviderMap(providers);
  const declarations = new Map();
  for (const unit of requireArray(units, "Go value-operation units")) {
    if (unit?.kind !== "type") throw new Error(`Go value-operation catalog received non-type unit '${unit?.id ?? "<unknown>"}'`);
    const declaration = invariantSemanticVariant(unit, "planned as one profile-invariant Go value operation").type;
    if (declaration === undefined) throw new Error(`Go type unit '${unit.id}' has no semantic declaration`);
    const objectId = requireIdentity(declaration.object?.id, `Go type unit '${unit.id}' objectId`);
    if (declarations.has(objectId)) throw new Error(`Go value-operation catalog duplicates '${objectId}'`);
    declarations.set(objectId, {
      objectId,
      unitId: unit.id,
      name: requireIdentity(declaration.object?.name, `Go type unit '${unit.id}' name`),
      intrinsicCarrier: intrinsicCarrier(declaration.rhs.kind),
      semanticDeclaration: declaration,
      typeParameters: requireArray(declaration.typeParameters, `Go type unit '${unit.id}' type parameters`).map((parameter) => ({
        key: typeParameterKey(parameter.reference),
        name: requireIdentity(parameter.reference?.name, `Go type unit '${unit.id}' type-parameter name`),
        semanticParameter: parameter,
      })),
      typeParameterCount: declaration.typeParameters.length,
      requirementShape: buildGoValueRequirementShape(declaration.rhs),
    });
  }

  const requirementCache = new Map();
  const usedProviderObjectIds = new Set();
  const resolving = [];
  const requirementsForDeclaration = (objectId) => {
    const cached = requirementCache.get(objectId);
    if (cached !== undefined) return cached;
    const provider = providers.get(objectId);
    if (provider !== undefined) {
      usedProviderObjectIds.add(objectId);
      const result = new Set(provider.operationTypeParameterIndexes);
      requirementCache.set(objectId, result);
      return result;
    }
    const declaration = declarations.get(objectId);
    if (declaration === undefined) throw new Error(`Go value operation for '${objectId}' has no generated declaration or reviewed provider`);
    if (declaration.intrinsicCarrier !== undefined) {
      const result = new Set();
      requirementCache.set(objectId, result);
      return result;
    }
    if (resolving.includes(objectId)) {
      throw new Error(`Go value-operation dependency cycle is not cut by a reference carrier: ${[...resolving, objectId].join(" -> ")}`);
    }
    resolving.push(objectId);
    const byKey = new Map(declaration.typeParameters.map((parameter, index) => [parameter.key, index]));
    const result = requirementsForShape(declaration.requirementShape, byKey, requirementsForDeclaration, declarations, providers);
    resolving.pop();
    requirementCache.set(objectId, result);
    return result;
  };

  const entries = [...declarations.values()].map((declaration) => ({
    ...declaration,
    disposition: providers.get(declaration.objectId)?.disposition ?? (declaration.intrinsicCarrier === undefined ? "generated" : "intrinsic"),
    operationTypeParameterIndexes: [...requirementsForDeclaration(declaration.objectId)].sort((left, right) => left - right),
  })).sort((left, right) => compareText(left.objectId, right.objectId));
  return {
    entries,
    byObjectId: new Map(entries.map((entry) => [entry.objectId, entry])),
    usedProviderObjectIds: [...usedProviderObjectIds].sort(compareText),
  };
}

function intrinsicCarrier(kind) {
  if (kind === "interface") return "interface";
  if (kind === "slice") return "slice";
  if (kind === "map") return "map";
  if (kind === "signature") return "function";
  return undefined;
}

function requirementsForShape(shape, localTypeParameters, resolveNamed, declarations, providers) {
  switch (shape.kind) {
    case "typeParameter": {
      const index = localTypeParameters.get(shape.key);
      if (index === undefined) throw new Error(`Go value shape references out-of-scope type parameter '${shape.key}'`);
      return new Set([index]);
    }
    case "array":
      return shape.length === "0"
        ? new Set()
        : requirementsForShape(shape.element, localTypeParameters, resolveNamed, declarations, providers);
    case "struct":
      return unionSets(shape.fields.map((field) => requirementsForShape(field.shape, localTypeParameters, resolveNamed, declarations, providers)));
    case "named": {
      const targetRequirements = resolveNamed(shape.objectId);
      const target = declarations.get(shape.objectId);
      const targetArity = target?.typeParameters.length ?? providers.get(shape.objectId)?.typeParameterCount;
      if (targetArity === undefined) throw new Error(`Go value operation for '${shape.objectId}' has no exact type-parameter arity`);
      if (shape.typeArguments.length !== targetArity) {
        throw new Error(`Go value operation for '${shape.objectId}' expected ${targetArity} type arguments, got ${shape.typeArguments.length}`);
      }
      return unionSets([...targetRequirements].map((index) => {
        const argument = shape.typeArguments[index];
        if (argument === undefined) throw new Error(`Go value operation for '${shape.objectId}' has invalid operation parameter index ${index}`);
        return requirementsForShape(argument, localTypeParameters, resolveNamed, declarations, providers);
      }));
    }
    case "scalar":
    case "complex":
    case "pointer":
    case "slice":
    case "map":
    case "channel":
    case "function":
    case "interface":
    case "unsafePointer":
      return new Set();
    default:
      throw new Error(`Go value-operation requirements cannot classify '${shape.kind}'`);
  }
}

function buildStructFields(structure) {
  const fields = requireArray(structure?.fields, "Go value struct fields");
  const semanticFields = fields.map((field, index) => {
    const variable = field?.variable;
    requireSemanticType(variable?.type, `Go value struct field #${index}`);
    const sourceName = requireIdentity(variable.name, `Go value struct field #${index} name`);
    if (variable.embedded !== true && variable.embedded !== false) throw new Error(`Go value struct field #${index} has no exact embedded flag`);
    return { embedded: variable.embedded, name: sourceName, type: variable.type };
  });
  return canonicalStructFieldLayout(semanticFields, "Go value struct fields")
    .map(({ blank, field, name }) => ({ name, blank, shape: buildGoValueRequirementShape(field.type) }));
}

function unionSets(sets) {
  const result = new Set();
  for (const set of sets) for (const value of set) result.add(value);
  return result;
}

function requireProviderMap(providers) {
  if (!(providers instanceof Map)) throw new Error("Go value-operation providers must be a Map keyed by exact object identity");
  for (const [objectId, provider] of providers) {
    requireIdentity(objectId, "Go value-operation provider objectId");
    if (provider === null || typeof provider !== "object" || Array.isArray(provider)) throw new Error(`Go value-operation provider '${objectId}' must be an object`);
    const keys = Object.keys(provider).sort(compareText);
    const expectedKeys = ["disposition", "operationTypeParameterIndexes", "typeParameterCount"];
    if (keys.length !== expectedKeys.length || keys.some((key, index) => key !== expectedKeys[index])) {
      throw new Error(`Go value-operation provider '${objectId}' keys must be exactly ${expectedKeys.join(", ")}; got ${keys.join(", ")}`);
    }
    if (provider.disposition !== "reviewed" && provider.disposition !== "generator-owned" && provider.disposition !== "intrinsic") {
      throw new Error(`Go value-operation provider '${objectId}' has invalid disposition '${provider.disposition}'`);
    }
    if (!Number.isSafeInteger(provider.typeParameterCount) || provider.typeParameterCount < 0) throw new Error(`Go value-operation provider '${objectId}' has invalid typeParameterCount`);
    const indexes = requireArray(provider.operationTypeParameterIndexes, `Go value-operation provider '${objectId}' operation indexes`);
    const seen = new Set();
    for (const index of indexes) {
      if (!Number.isSafeInteger(index) || index < 0 || index >= provider.typeParameterCount || seen.has(index)) {
        throw new Error(`Go value-operation provider '${objectId}' has invalid or duplicate operation index '${index}'`);
      }
      seen.add(index);
    }
  }
}

function typeParameterKey(reference) {
  const ownerId = requireIdentity(reference?.ownerId, "Go value-shape type-parameter owner");
  const role = reference?.role;
  const index = reference?.index;
  if ((role !== "type" && role !== "receiver") || !Number.isSafeInteger(index) || index < 0) {
    throw new Error("Go value-shape type parameter has no exact owner/role/index identity");
  }
  return `${ownerId}::${role}::${index}`;
}

function exactArrayLength(length) {
  if (typeof length !== "string" || !/^(0|[1-9][0-9]*)$/.test(length)) throw new Error(`Go value array length '${length}' is not exact`);
  return length;
}

function requireBasicName(basic) {
  const name = requireIdentity(basic?.name, "Go value basic name");
  if (basic?.untyped === true) throw new Error(`Go value shape cannot use untyped basic '${name}'`);
  return name;
}

function requireSemanticType(type, label) {
  if (type === null || typeof type !== "object" || Array.isArray(type) || typeof type.kind !== "string") throw new Error(`${label} is missing`);
}

function requireIdentity(value, label) {
  if (typeof value !== "string" || value === "" || value.includes("\0")) throw new Error(`${label} is missing`);
  return value;
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}
