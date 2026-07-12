export function semanticFunctionFixture(packagePath, name, parameters, { typeParameters = [], variadic = false } = {}) {
  const objectId = `${packagePath}::func::${name}`;
  const signature = semanticSignature(`${objectId}::signature`, packagePath, parameters, [], typeParameters, variadic);
  const objectSignature = semanticSignature(`${objectId}::type`, packagePath, parameters, [], typeParameters, variadic);
  const object = { id: objectId, name, packagePath, exported: true, type: { kind: "signature", nilable: true, signature: objectSignature } };
  return [{ kind: "func", packagePath, object, signature, profiles: [0] }];
}

export function semanticFunctionType(ownerId, packagePath, parameters, results) {
  return { kind: "signature", nilable: true, signature: semanticSignature(ownerId, packagePath, parameters, results) };
}

export function semanticSignature(ownerId, packagePath, parameters, results, typeParameters = [], variadic = false) {
  const variables = (entries, role) => ({
    variables: entries.map((entry, index) => ({
      id: `${ownerId}::${role}::${index}`,
      name: entry.name,
      packagePath,
      exported: false,
      type: entry.type,
    })),
  });
  return { receiverTypeParameters: [], typeParameters, parameters: variables(parameters, "parameters"), results: variables(results, "results"), variadic, parameterNameProvenance: "source" };
}

export function semanticTypeParameter(ownerId, index, name, constraint = semanticAnyType()) {
  return { reference: { ownerId, role: "type", index, name }, constraint };
}

export function semanticTypeParameterType(reference) {
  return { kind: "typeParameter", nilable: false, typeParameter: reference };
}

export function semanticTypeFixture(packagePath, name, rhs) {
  const objectId = `${packagePath}::type::${name}`;
  const object = { id: objectId, name, packagePath, exported: true, type: semanticNamedType(objectId, packagePath, name, rhs.nilable) };
  return {
    kind: "type",
    packagePath,
    object,
    type: {
      alias: false,
      object,
      typeParameters: [],
      rhs,
      methodSurface: "complete",
      methods: [],
      valueMethodSet: [],
      pointerMethodSet: [],
    },
    profiles: [0],
  };
}

export function writerTypeFixture() {
  const ownerId = "io::type::Writer::rhs";
  return semanticTypeFixture("io", "Writer", semanticInterfaceType([
    semanticMethod(`${ownerId}::explicitMethod::0::Write`, ownerId, "Write", [{ name: "p", type: semanticSliceType(semanticBasicType("byte")) }], [
      { name: "", type: semanticBasicType("int") },
      { name: "", type: semanticNamedType("builtin::type::error", "", "error", true) },
    ]),
  ]));
}

export function semanticMethod(id, ownerId, name, parameters, results) {
  const packagePath = id.slice(0, id.indexOf("::"));
  return { id, ownerId, name, packagePath, exported: true, signature: semanticSignature(`${id}::signature`, packagePath, parameters, results) };
}

export function semanticInterfaceType(explicitMethods) {
  return { kind: "interface", nilable: true, interface: { explicitMethods, embeddedTypes: [], embeddedKinds: [], completeMethods: explicitMethods, comparable: false, implicit: false, methodSetOnly: true, explicitMethodOrderProvenance: "source" } };
}

export function semanticConstraintType(comparable) {
  return { kind: "interface", nilable: true, interface: { explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable, implicit: true, methodSetOnly: false, explicitMethodOrderProvenance: "source" } };
}

export const semanticAnyType = () => semanticConstraintType(false);
export const semanticBasicType = (name) => ({ kind: "basic", nilable: false, basic: { name, untyped: false } });
export const semanticNamedType = (objectId, packagePath, name, nilable = false) => ({ kind: "named", nilable, reference: { objectId, packagePath, name, typeArgs: [] } });
export const semanticSliceType = (element) => ({ kind: "slice", nilable: true, element });
export const semanticStructType = (fields) => ({ kind: "struct", nilable: false, struct: { fields } });
