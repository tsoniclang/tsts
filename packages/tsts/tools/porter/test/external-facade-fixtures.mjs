export function externalSnapshot(externalDeclarations, usedObjectIds = externalDeclarations.map((declaration) => declaration.object.id)) {
  const used = new Set(usedObjectIds);
  const profileIndexes = [...new Set(externalDeclarations.flatMap((declaration) => declaration.profiles))]
    .sort((left, right) => left - right);
  return {
    gitRevision: "a".repeat(40),
    files: [{
      path: "fixture/use.go",
      generated: false,
      units: [{
        id: "fixture::fixture/use.go::func::Use",
        kind: "func",
        generated: false,
        metadata: { goPath: "fixture/use.go" },
        semantic: profileIndexes.map((profileIndex) => ({
          profiles: [profileIndex],
          signature: signature(externalDeclarations
            .filter((declaration) => used.has(declaration.object.id) && declaration.profiles.includes(profileIndex))
            .map((declaration, index) => variable(
              `fixture::func::Use::profile::${profileIndex}::signature::parameters::${index}`,
              `value${index}`,
              declaration.object.type,
            )), []),
        })),
      }],
    }],
    semantic: {
      externalDeclarations,
      profiles: profileIndexes.map(() => ({})),
    },
  };
}

export function externalType({
  packagePath,
  name,
  rhs,
  nilable = rhs.nilable,
  alias = false,
  methods = [],
  profiles = [0],
  typeParameters = [],
}) {
  const objectId = `${packagePath}::type::${name}`;
  const object = {
    id: objectId,
    name,
    packagePath,
    exported: true,
    type: { kind: alias ? "alias" : "named", nilable, reference: { objectId, packagePath, name, typeArgs: [] } },
  };
  return {
    kind: "type",
    packagePath,
    object,
    type: { alias, object, typeParameters, rhs, methods },
    profiles,
  };
}

export function basic(name, nilable = false) {
  return { kind: "basic", nilable, basic: { name, untyped: false } };
}

export function builtinType(name, nilable) {
  return { kind: "named", nilable, reference: { objectId: `builtin::type::${name}`, packagePath: "", name, typeArgs: [] } };
}

export function namedType(objectId, packagePath, name, typeArgs = [], nilable = false) {
  return { kind: "named", nilable, reference: { objectId, packagePath, name, typeArgs } };
}

export function sliceType(element) {
  return { kind: "slice", nilable: true, element };
}

export function structType(fields) {
  return {
    kind: "struct",
    nilable: false,
    struct: { fields: fields.map((entry) => ({ variable: entry, tag: "", tagValues: [], tagRemainder: "" })) },
  };
}

export function interfaceType(explicitMethods = []) {
  return {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods,
      embeddedTypes: [],
      embeddedKinds: [],
      completeMethods: explicitMethods,
      comparable: false,
      implicit: false,
      methodSetOnly: true,
    },
  };
}

export function method(id, ownerId, name, methodSignature) {
  return { id, ownerId, name, packagePath: "io", exported: true, signature: methodSignature };
}

export function signature(parameters, results = []) {
  return {
    receiverTypeParameters: [],
    typeParameters: [],
    parameters: { variables: parameters },
    results: { variables: results },
    variadic: false,
  };
}

export function variable(id, name, type, exported = false) {
  return { id, name, packagePath: "", exported, type };
}
