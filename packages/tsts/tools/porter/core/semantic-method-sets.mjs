import { canonicalSemanticSignature } from "./semantic-variants.mjs";
import { hashText } from "./runtime.mjs";

export function buildSemanticMethodSetSignatureIndex(snapshot) {
  const index = new Map();
  for (const [entryIndex, entry] of (snapshot.semantic?.methodSetSignatures ?? []).entries()) {
    const label = `snapshot.semantic.methodSetSignatures[${entryIndex}]`;
    if (typeof entry?.id !== "string" || typeof entry?.methodId !== "string" || entry.signature === undefined) {
      throw new Error(`${label} is not one exact selected method signature`);
    }
    const expectedId = `${entry.methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(entry.signature))}`;
    if (entry.id !== expectedId) throw new Error(`${label}.id does not hash its exact selected signature`);
    if (index.has(entry.id)) throw new Error(`${label}.id duplicates '${entry.id}'`);
    index.set(entry.id, entry);
  }
  return index;
}

export function materializeSemanticMethodSet(declaration, mode, signatureIndex) {
  if (mode !== "value" && mode !== "pointer") throw new Error(`unknown Go method-set mode '${mode}'`);
  const selections = declaration?.[`${mode}MethodSet`];
  if (!Array.isArray(selections)) throw new Error(`external Go type has no exact ${mode} method set`);
  return selections.map((selection, index) => {
    const signature = signatureIndex.get(selection.signatureId);
    if (signature === undefined) throw new Error(`Go ${mode} method selection #${index} '${selection.key}' has no selected-signature evidence`);
    if (signature.methodId !== selection.methodId) {
      throw new Error(`Go ${mode} method selection #${index} '${selection.key}' resolves to another declaring method`);
    }
    return { ...selection, signature: signature.signature };
  });
}

export function pointerOnlySemanticMethodSet(declaration, signatureIndex) {
  const valueKeys = new Set(materializeSemanticMethodSet(declaration, "value", signatureIndex).map((method) => method.key));
  return materializeSemanticMethodSet(declaration, "pointer", signatureIndex).filter((method) => !valueKeys.has(method.key));
}
