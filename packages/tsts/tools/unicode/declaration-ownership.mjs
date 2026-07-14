import { compareText } from "../porter/core/deterministic-order.mjs";
import { exactSemanticTypeObjectId } from "../porter/core/semantic-variants.mjs";
import {
  unicodeCaseArtifactPath,
  unicodeCaseSourcePath,
  unicodeCaseTypeNames,
  unicodeGeneratorId,
} from "./config.mjs";

export function buildUnicodeGeneratedDeclarationOwnerRows(config, snapshot) {
  const matches = (snapshot.files ?? []).filter((file) => file.path === unicodeCaseSourcePath);
  if (matches.length !== 1) {
    throw new Error(`Unicode generated type source '${unicodeCaseSourcePath}' must occur exactly once; got ${matches.length}`);
  }
  const units = (matches[0].units ?? []).filter((unit) => unit.kind === "type");
  const byName = new Map();
  for (const unit of units) {
    if (byName.has(unit.name)) throw new Error(`Unicode generated type source duplicates '${unit.name}'`);
    byName.set(unit.name, unit);
  }
  const actual = [...byName.keys()].sort(compareText);
  const expected = [...unicodeCaseTypeNames].sort(compareText);
  if (actual.length !== expected.length || actual.some((name, index) => name !== expected[index])) {
    throw new Error(`Unicode generated type ownership must cover exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  const moduleId = `${config.tsRoot.replace(/\/+$/, "")}/${unicodeCaseArtifactPath}`;
  return Object.freeze(expected.map((name) => {
    const unit = byName.get(name);
    return Object.freeze({
      generator: unicodeGeneratorId,
      objectId: exactSemanticTypeObjectId(unit),
      unitId: unit.id,
      moduleId,
      tsName: name,
    });
  }));
}
