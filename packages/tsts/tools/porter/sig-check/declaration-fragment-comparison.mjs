export function compareDeclarationFragments(expectedDeclaration, actualDeclaration, push, compareFragment) {
  const expected = expectedDeclaration.fragments;
  const actual = actualDeclaration.fragments;
  if (!Array.isArray(expected) && !Array.isArray(actual)) return false;
  if (!Array.isArray(expected) || !Array.isArray(actual)) {
    push("declaration-fragment-contract", "declaration fragments must use the current array contract", expected, actual);
    return true;
  }
  if (expected.length !== actual.length) {
    push("declaration-fragment-count", "declaration fragment count differs", expected.length, actual.length);
  }
  const count = Math.min(expected.length, actual.length);
  for (let index = 0; index < count; index++) {
    const fragmentPush = (kind, detail, left, right) => push(kind, `fragment #${index}: ${detail}`, left, right);
    compareFragment(expected[index], actual[index], index, fragmentPush);
  }
  validateFragmentAggregate(expectedDeclaration, "expected declaration", push);
  validateFragmentAggregate(actualDeclaration, "TypeScript declaration", push);
  return true;
}

function validateFragmentAggregate(declaration, label, push) {
  const fragments = declaration.fragments;
  if (fragments.length === 0) {
    push("invalid-signature-contract", `${label} fragments must contain at least one declaration fragment`);
    return;
  }
  if (declaration.kind === "interface") {
    const firstTypeParameters = fragments[0].typeParams;
    if (!sameJson(declaration.typeParams, firstTypeParameters) ||
        !sameJson(declaration.heritage, fragments.flatMap((fragment) => fragment.heritage ?? [])) ||
        !sameJson(declaration.members, fragments.flatMap((fragment) => fragment.members ?? []))) {
      push("invalid-signature-contract", `${label} interface fragments do not reconstruct the declaration contract`);
    }
  } else if (declaration.kind === "enum" &&
      !sameJson(declaration.members, fragments.flatMap((fragment) => fragment.members ?? []))) {
    push("invalid-signature-contract", `${label} enum fragments do not reconstruct the declaration contract`);
  }
}

const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);
