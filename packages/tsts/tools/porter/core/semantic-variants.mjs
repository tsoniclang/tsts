export function semanticProfileKey(profile) {
  if (typeof profile?.experiments !== "string") throw new TypeError("semantic profile keys require the profile's exact experiments string");
  if (typeof profile?.goexperiment !== "string") throw new TypeError("semantic profile keys require the profile's exact GOEXPERIMENT setting");
  const cgo = profile?.cgoEnabled === true ? "1" : "0";
  const tags = Array.isArray(profile?.buildTags) ? profile.buildTags.join(",") : "";
  return `${profile?.goos ?? ""}/${profile?.goarch ?? ""}:cgo=${cgo}:arch=${profile?.architecture ?? ""}:compiler=gc:experiments=${profile.experiments}:goexperiment=${profile.goexperiment}:tags=${tags}`;
}

export function semanticProfileStateKey(profile) {
  const cgo = profile?.cgoEnabled === true ? "1" : "0";
  const tags = Array.isArray(profile?.buildTags) ? profile.buildTags.join(",") : "";
  return `${profile?.goos ?? ""}/${profile?.goarch ?? ""}:cgo=${cgo}:arch=${profile?.architecture ?? ""}:compiler=gc:experiments=${profile?.experiments ?? ""}:tags=${tags}`;
}

export function canonicalSchemaValue(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalSchemaValue).join(",")}]`;
  const entries = Object.keys(value)
    .filter((key) => value[key] !== undefined)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalSchemaValue(value[key])}`);
  return `{${entries.join(",")}}`;
}

export function canonicalSemanticDeclaration(declaration) {
  return JSON.stringify(orderSemanticDeclaration(declaration));
}

export function canonicalSemanticModule(module) {
  return JSON.stringify(ordered(module, ["path", "version", "sum", "replacePath", "replaceVersion", "replaceSum"]));
}

export function semanticVariants(unit) {
  if (!Array.isArray(unit?.semantic) || unit.semantic.length === 0) {
    throw new Error(`Go unit '${unit?.id ?? "<unknown>"}' has no semantic profile variants`);
  }
  return unit.semantic;
}

export function invariantSemanticVariant(unit, purpose) {
  const variants = semanticVariants(unit);
  const canonical = new Map();
  for (const variant of variants) {
    const key = canonicalSemanticDeclaration(variant);
    canonical.set(key, variant);
  }
  if (canonical.size !== 1) {
    throw new Error(`Go unit '${unit.id}' has ${canonical.size} profile-dependent declaration shapes and cannot be ${purpose} as one invariant declaration`);
  }
  return variants[0];
}

export function semanticVariantForProfile(unit, profileIndex, semanticEvidence) {
  if (!Number.isSafeInteger(profileIndex) || profileIndex < 0) throw new TypeError("semantic profile selection requires a non-negative integer index");
  if (Array.isArray(semanticEvidence?.profiles) && profileIndex >= semanticEvidence.profiles.length) throw new RangeError(`semantic ${profileLabel(profileIndex, semanticEvidence)} is out of bounds`);
  const matches = semanticVariants(unit).filter((variant) => (variant.profiles ?? []).includes(profileIndex));
  if (matches.length > 1) throw new Error(`Go unit '${unit.id}' has multiple semantic variants for ${profileLabel(profileIndex, semanticEvidence)}`);
  return matches[0];
}

function profileLabel(index, semanticEvidence) {
  const profile = semanticEvidence?.profiles?.[index];
  return profile === undefined ? `profile index ${index}` : `profile index ${index} ('${semanticProfileKey(profile)}')`;
}

function orderSemanticDeclaration(value) {
  const output = ordered(value, ["kind", "packagePath", "object", "type", "valueSpecs", "signature"], {
    object: orderObject, type: orderTypeDeclaration, valueSpecs: (items) => mapItems(items, orderValueSpec), signature: orderSignature,
  });
  if (output !== null && typeof output === "object" && !Array.isArray(output)) output.profiles = null;
  return output;
}

function orderObject(value) {
  return ordered(value, ["id", "name", "packagePath", "exported", "type"], { type: orderType });
}

function orderTypeDeclaration(value) {
  return ordered(value, ["alias", "object", "typeParameters", "rhs"], {
    object: orderObject, typeParameters: (items) => mapItems(items, orderTypeParameter), rhs: orderType,
  });
}

function orderValueSpec(value) {
  return ordered(value, ["specIndex", "names"], { names: (items) => mapItems(items, orderValueBinding) });
}

function orderValueBinding(value) {
  return ordered(value, ["name", "nameIndex", "blank", "type", "object", "constant"], {
    type: orderType, object: orderObject, constant: (item) => ordered(item, ["kind", "exact", "stringValue"]),
  });
}

function orderType(value) {
  return ordered(value, ["kind", "basic", "reference", "typeParameter", "element", "key", "length", "direction", "signature", "tuple", "struct", "interface", "union"], {
    basic: (item) => ordered(item, ["name", "untyped"]), reference: orderTypeReference, typeParameter: orderTypeParameterReference,
    element: orderType, key: orderType, signature: orderSignature, tuple: orderTuple,
    struct: (item) => ordered(item, ["fields"], { fields: (items) => mapItems(items, orderStructField) }),
    interface: orderInterface,
    union: (item) => ordered(item, ["terms"], { terms: (items) => mapItems(items, (term) => ordered(term, ["tilde", "type"], { type: orderType })) }),
  });
}

function orderTypeReference(value) {
  return ordered(value, ["objectId", "packagePath", "name", "typeArgs"], { typeArgs: (items) => mapItems(items, orderType) });
}

function orderTypeParameterReference(value) {
  return ordered(value, ["ownerId", "role", "index", "name"]);
}

function orderTypeParameter(value) {
  return ordered(value, ["reference", "constraint"], { reference: orderTypeParameterReference, constraint: orderType });
}

function orderSignature(value) {
  return ordered(value, ["receiver", "receiverTypeParameters", "typeParameters", "parameters", "results", "variadic"], {
    receiver: orderVariable, receiverTypeParameters: (items) => mapItems(items, orderTypeParameter),
    typeParameters: (items) => mapItems(items, orderTypeParameter), parameters: orderTuple, results: orderTuple,
  });
}

function orderTuple(value) {
  return ordered(value, ["variables"], { variables: (items) => mapItems(items, orderVariable) });
}

function orderVariable(value) {
  return ordered(value, ["id", "name", "packagePath", "embedded", "exported", "type"], { type: orderType });
}

function orderStructField(value) {
  return ordered(value, ["variable", "tag", "tagValues", "tagRemainder"], {
    variable: orderVariable, tagValues: (items) => mapItems(items, (item) => ordered(item, ["key", "value"])),
  });
}

function orderInterface(value) {
  return ordered(value, ["explicitMethods", "embeddedTypes", "embeddedKinds", "completeMethods", "comparable", "implicit", "methodSetOnly"], {
    explicitMethods: (items) => mapItems(items, orderMethod), embeddedTypes: (items) => mapItems(items, orderType),
    completeMethods: (items) => mapItems(items, orderMethod),
  });
}

function orderMethod(value) {
  return ordered(value, ["id", "ownerId", "name", "packagePath", "exported", "signature"], { signature: orderSignature });
}

function ordered(value, keys, transforms = {}) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return value;
  const output = {};
  for (const key of keys) {
    if (!Object.hasOwn(value, key) || value[key] === undefined) continue;
    output[key] = transforms[key] === undefined ? value[key] : transforms[key](value[key]);
  }
  return output;
}

function mapItems(value, transform) {
  return Array.isArray(value) ? value.map(transform) : value;
}
