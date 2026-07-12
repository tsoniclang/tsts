import { compareText } from "../core/deterministic-order.mjs";
import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { semanticDeclarationVariantsHash } from "../core/semantic-declaration-hash.mjs";
import { semanticRelationsOfKind } from "../core/semantic-relations.mjs";
import { buildSemanticTypeCatalog } from "../core/type-storage-policies.mjs";
import { extractIndexedReviewedTypeDescriptor } from "../ts-extractor/extract-signatures.mjs";
import { createCanonicalDeclarationResolver } from "../ts-extractor/module-resolution.mjs";

export function buildTypeEquivalenceRelationRegistry({ api, config, moduleIndex, snapshot, valueEnvironments }) {
  const declarations = buildSemanticTypeCatalog(snapshot);
  const relations = semanticRelationsOfKind(config, "typescript-type-equivalence");
  const aliases = {};
  const memberOwners = new Map();
  const relationByMember = new Map();
  const inventory = [];
  const mismatches = [];
  const invalidRelations = new Set();
  const relationObjectIds = new Set();
  for (const [index, relation] of relations.entries()) {
    const label = `semanticRelations[typescript-type-equivalence:${index}]`;
    requireExactObject(relation, new Set(["goDeclarationHash", "kind", "members", "objectId", "reason"]), label);
    requireIdentity(relation.objectId, `${label}.objectId`);
    if (relationObjectIds.has(relation.objectId)) throw new Error(`${label}.objectId duplicates relation '${relation.objectId}'`);
    relationObjectIds.add(relation.objectId);
    requireHash(relation.goDeclarationHash, `${label}.goDeclarationHash`);
    requireReason(relation.reason, `${label}.reason`);
    if (!Array.isArray(relation.members) || relation.members.length < 2) throw new Error(`${label}.members must contain at least two declarations`);
    const semantic = declarations.get(relation.objectId);
    if (semantic === undefined) throw new Error(`${label}.objectId '${relation.objectId}' has no extracted Go type declaration`);
    const goHash = semanticDeclarationVariantsHash(semantic, `type equivalence '${relation.objectId}'`);
    if (goHash !== relation.goDeclarationHash) throw new Error(`${label} Go declaration snapshot drifted: config=${relation.goDeclarationHash} current=${goHash}`);
    const members = [];
    for (const [memberIndex, member] of relation.members.entries()) {
      const memberLabel = `${label}.members[${memberIndex}]`;
      requireExactObject(member, new Set(["declarationHash", "identity"]), memberLabel);
      requireStorageIdentity(member.identity, `${memberLabel}.identity`);
      requireHash(member.declarationHash, `${memberLabel}.declarationHash`);
      if (memberOwners.has(member.identity)) throw new Error(`${memberLabel}.identity is already owned by '${memberOwners.get(member.identity)}'`);
      const { moduleId, name } = splitIdentity(member.identity);
      try {
        const extracted = extractIndexedReviewedTypeDescriptor(api, moduleIndex, moduleId, name, valueEnvironments);
        if (extracted.declarationId !== member.identity) {
          throw new Error(`equivalence member resolves to '${extracted.declarationId}' instead of direct declaration '${member.identity}'`);
        }
        const actualHash = externalTypeScriptDeclarationHash(extracted.descriptor);
        if (actualHash !== member.declarationHash) {
          invalidRelations.add(relation.objectId);
          mismatches.push({
            id: `type-equivalence:${relation.objectId}`,
            file: moduleId,
            kind: "type-equivalence-typescript-drift",
            detail: `equivalence member '${member.identity}' drifted: config=${member.declarationHash} current=${actualHash}`,
          });
        }
      } catch (error) {
        invalidRelations.add(relation.objectId);
        mismatches.push({
          id: `type-equivalence:${relation.objectId}`,
          file: moduleId,
          kind: "type-equivalence-contract-error",
          detail: `equivalence member '${member.identity}' failed closed: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
      memberOwners.set(member.identity, relation.objectId);
      members.push({ ...member });
    }
    members.sort((left, right) => compareText(left.identity, right.identity));
    const canonical = members[0].identity;
    for (const member of members) {
      relationByMember.set(member.identity, relation.objectId);
      if (!invalidRelations.has(relation.objectId) && member.identity !== canonical) aliases[member.identity] = canonical;
    }
    inventory.push({
      goDeclarationHash: relation.goDeclarationHash,
      members,
      objectId: relation.objectId,
      reason: relation.reason.trim(),
      uses: [],
    });
  }
  const baseCanonicalize = createCanonicalDeclarationResolver(moduleIndex, aliases);
  const inventoryByObject = new Map(inventory.map((entry) => [entry.objectId, entry]));
  return {
    canonicalize(identity, useSite = "<unspecified>") {
      const canonical = baseCanonicalize(identity);
      const objectId = relationByMember.get(identity);
      if (objectId !== undefined && canonical !== identity) inventoryByObject.get(objectId).uses.push(useSite);
      return canonical;
    },
    forUseSite(useSite) {
      return (identity) => this.canonicalize(identity, useSite);
    },
    finalize() {
      for (const entry of inventory) {
        entry.uses = [...new Set(entry.uses)].sort(compareText);
        if (!invalidRelations.has(entry.objectId) && entry.uses.length === 0) mismatches.push({
          id: `type-equivalence:${entry.objectId}`,
          file: splitIdentity(entry.members[0].identity).moduleId,
          kind: "unused-type-equivalence-relation",
          detail: `reviewed TypeScript equivalence for '${entry.objectId}' was not consumed by the complete signature audit`,
        });
      }
      mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id));
      return { checked: inventory.length, inventory, mismatches };
    },
  };
}

function splitIdentity(identity) {
  const separator = identity.lastIndexOf("::");
  return { moduleId: identity.slice(0, separator), name: identity.slice(separator + 2) };
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort(compareText).join(", ")}`);
}

function requireIdentity(value, label) {
  if (typeof value !== "string" || !/^(?:builtin|[^:\s]+)::type::[^:\s]+$/.test(value)) throw new Error(`${label} must be one exact Go type identity`);
}

function requireStorageIdentity(value, label) {
  if (typeof value !== "string" || !/^[^:\s]+::[^:\s]+$/.test(value)) throw new Error(`${label} must be one exact TypeScript declaration identity`);
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length < 20) throw new Error(`${label} must specifically justify the duplicate TypeScript declaration identity`);
}
