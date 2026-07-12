export function exactSemanticTypeDeclarationIdentity(declaration, label = "Go type declaration") {
  if (declaration?.alias !== true && declaration?.alias !== false) throw new Error(`${label} has no exact alias flag`);
  const object = declaration.object;
  const objectId = object?.id;
  if (typeof objectId !== "string" || objectId === "") throw new Error(`${label} has no exact type object identity`);
  if (declaration.rhs === undefined) throw new Error(`${label} has no canonical declaration RHS`);
  const objectType = object?.type;
  const expectedObjectKind = declaration.alias ? "alias" : "named";
  if (objectType?.kind === expectedObjectKind) {
    const reference = objectType.reference;
    if (reference?.objectId !== objectId || reference?.packagePath !== object.packagePath || reference?.name !== object.name ||
        !Array.isArray(reference?.typeArgs) || reference.typeArgs.length !== 0) {
      throw new Error(`${label} object type does not identify its exact uninstantiated Go ${expectedObjectKind} object`);
    }
    return { object, objectId, objectType, intrinsicKind: expectedObjectKind };
  }
  if (isUnsafePointerDeclaration(declaration)) {
    return { object, objectId, objectType, intrinsicKind: "unsafe-pointer-basic" };
  }
  throw new Error(`${label} object '${objectId}' is not a canonical named/alias type or the exact unsafe.Pointer basic declaration`);
}

function isUnsafePointerDeclaration(declaration) {
  const object = declaration.object;
  const objectType = object?.type;
  const rhs = declaration.rhs;
  return declaration.alias === false && object?.id === "unsafe::type::Pointer" && object?.packagePath === "unsafe" && object?.name === "Pointer" &&
    objectType?.kind === "basic" && objectType.nilable === true && objectType.basic?.name === "Pointer" && objectType.basic?.untyped === false &&
    rhs?.kind === "basic" && rhs.nilable === true && rhs.basic?.name === "Pointer" && rhs.basic?.untyped === false &&
    Array.isArray(declaration.typeParameters) && declaration.typeParameters.length === 0;
}
