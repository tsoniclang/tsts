import { createHash } from "node:crypto";

import { RemoteNode, RemoteNodeList } from "../../../_vendor/typescript-go/_packages/native-preview/src/api/node/node.generated.ts";
import { getNodeId, parseNodeHandle, RemoteSourceFile } from "../../../_vendor/typescript-go/_packages/native-preview/src/api/node/node.ts";
import { PROTOCOL_VERSION } from "../../../_vendor/typescript-go/_packages/native-preview/src/api/node/protocol.ts";

import { canonicalKindNames, canonicalNodeNameForKind, canonicalSchema } from "./tsgo-canonical-schema.mjs";

const schema = canonicalSchema();
const kindNames = canonicalKindNames();
const noSubstitutionTemplateLiteralKind = requireKind("NoSubstitutionTemplateLiteral");
const fieldPlansByKind = buildFieldPlans();
const responseKeys = Object.freeze([
  "data",
  "diagnostics",
  "encoderProtocolVersion",
  "fileName",
  "id",
  "jsDocDiagnostics",
  "noSubTemplateFlags",
  "schemaVersion",
  "sourceRevision",
  "sourceSha256",
  "textStarts",
]);

export function canonicalizeTSGoBridgeResponse(response, request, expectedRevision) {
  requirePlainObject(response, "TS-Go bridge response");
  requireExactKeys(response, responseKeys, "TS-Go bridge response");
  if (response.schemaVersion !== 2) throw new Error(`unsupported TS-Go bridge response schema ${String(response.schemaVersion)}`);
  if (response.id !== request.id) throw new Error(`TS-Go bridge response id ${String(response.id)} does not match request ${request.id}`);
  if (response.sourceRevision !== expectedRevision) {
    throw new Error(`TS-Go bridge source revision ${String(response.sourceRevision)} does not match pinned ${expectedRevision}`);
  }
  if (response.encoderProtocolVersion !== PROTOCOL_VERSION) {
    throw new Error(`TS-Go bridge protocol ${String(response.encoderProtocolVersion)} does not match decoder protocol ${PROTOCOL_VERSION}`);
  }
  if (response.fileName !== request.fileName) throw new Error(`TS-Go bridge returned the wrong file: ${String(response.fileName)}`);
  const expectedHash = createHash("sha256").update(request.text, "utf8").digest("hex");
  if (response.sourceSha256 !== expectedHash) throw new Error(`TS-Go bridge source hash ${String(response.sourceSha256)} does not match ${expectedHash}`);
  const data = decodeCanonicalBase64(response.data);
  const remoteSourceFile = new RemoteSourceFile(data, new TextDecoder());
  if (remoteSourceFile.fileName !== request.fileName) {
    throw new Error(`encoded TS-Go source file is '${remoteSourceFile.fileName}', expected '${request.fileName}'`);
  }
  if (remoteSourceFile.text !== request.text) throw new Error("encoded TS-Go source text does not match the bridge request");
  const textStarts = requireIntegerArray(response.textStarts, "TS-Go bridge textStarts");
  const noSubTemplateFlags = requireIntegerArray(response.noSubTemplateFlags, "TS-Go bridge noSubTemplateFlags");
  if (textStarts.length !== remoteSourceFile.nodes.length) {
    throw new Error(`TS-Go bridge textStarts has ${textStarts.length} entries for ${remoteSourceFile.nodes.length} encoded nodes`);
  }
  if (noSubTemplateFlags.length !== remoteSourceFile.nodes.length) {
    throw new Error(`TS-Go bridge noSubTemplateFlags has ${noSubTemplateFlags.length} entries for ${remoteSourceFile.nodes.length} encoded nodes`);
  }
  const context = {
    cache: new Map(),
    noSubTemplateFlags,
    sourceLength: request.text.length,
    textStarts,
  };
  const sourceFile = canonicalNode(remoteSourceFile, context, false);
  sourceFile.__porterDiagnostics = canonicalDiagnostics(response.diagnostics, "diagnostics", request.text.length);
  sourceFile.__porterJSDocDiagnostics = canonicalDiagnostics(response.jsDocDiagnostics, "jsDocDiagnostics", request.text.length);
  deepFreeze(sourceFile);
  return sourceFile;
}

function canonicalNode(node, context, opaque) {
  if (!(node instanceof RemoteNode)) throw new Error("TS-Go declaration bridge returned a non-node child");
  const cached = context.cache.get(node);
  if (cached !== undefined) {
    if (opaque && !cached.opaque) throw new Error("TS-Go implementation node was materialized before its declaration opacity boundary");
    return cached.value;
  }
  const index = parseNodeHandle(getNodeId(node)).index;
  const textStart = context.textStarts[index];
  if (!Number.isInteger(textStart) || textStart < -1 || textStart > context.sourceLength) {
    throw new Error(`TS-Go node ${index} has invalid text start ${String(textStart)}`);
  }
  const value = {
    Kind: node.kind,
    Flags: node.flags,
    __porterPos: node.pos,
    __porterEnd: node.end,
    __porterTextStart: textStart,
    __porterChildren: [],
    __porterJSDoc: [],
    __porterOpaqueImplementation: opaque,
  };
  const noSubTemplateFlags = context.noSubTemplateFlags[index];
  if (node.kind === noSubstitutionTemplateLiteralKind) {
    if (!Number.isInteger(noSubTemplateFlags) || noSubTemplateFlags < 0 || noSubTemplateFlags > 0xffff_ffff) {
      throw new Error(`TS-Go bridge omitted template flags for no-substitution template node ${index}`);
    }
  } else if (noSubTemplateFlags !== -1) {
    throw new Error(`TS-Go bridge attached no-substitution template flags to ${kindNames.get(node.kind) ?? node.kind} node ${index}`);
  }
  context.cache.set(node, { opaque, value });
  if (!opaque) {
    const plans = fieldPlansByKind.get(node.kind);
    if (plans === undefined) throw new Error(`pinned AST schema has no field plan for kind ${node.kind} (${kindNames.get(node.kind) ?? "unknown"})`);
    for (const plan of plans) {
      if (!(plan.remoteName in node)) {
        if (!plan.optional) throw new Error(`TS-Go decoder omits required '${plan.remoteName}' for ${plan.nodeName}.${plan.name}`);
        continue;
      }
      let remoteValue = node[plan.remoteName];
      if (remoteValue === undefined && plan.name === "TemplateFlags" && node.kind === noSubstitutionTemplateLiteralKind) {
        remoteValue = noSubTemplateFlags;
      }
      if (remoteValue === undefined) {
        if (!plan.optional) throw new Error(`TS-Go decoder returned undefined for required ${plan.nodeName}.${plan.name}`);
        continue;
      }
      value[plan.name] = canonicalValue(remoteValue, context, plan.opaqueImplementation);
    }
    if (node instanceof RemoteSourceFile) canonicalizeSourceFileMetadata(node, value, context);
    node.forEachChild((child) => {
      value.__porterChildren.push(canonicalNode(child, context, false));
      return undefined;
    });
    for (const document of node.jsDoc ?? []) value.__porterJSDoc.push(canonicalNode(document, context, false));
  }
  validateNodeRange(value, context.sourceLength, index);
  return value;
}

function canonicalizeSourceFileMetadata(sourceFile, value, context) {
  if (typeof sourceFile.fileName !== "string" || typeof sourceFile.path !== "string" ||
      !Number.isInteger(sourceFile.languageVariant) || !Number.isInteger(sourceFile.scriptKind) ||
      typeof sourceFile.isDeclarationFile !== "boolean") {
    throw new Error("TS-Go decoder returned invalid hand-written SourceFile metadata");
  }
  value.FileName = sourceFile.fileName;
  value.Path = sourceFile.path;
  value.LanguageVariant = sourceFile.languageVariant;
  value.ScriptKind = sourceFile.scriptKind;
  value.ReferencedFiles = canonicalFileReferences(sourceFile.referencedFiles, context, "ReferencedFiles");
  value.TypeReferenceDirectives = canonicalFileReferences(sourceFile.typeReferenceDirectives, context, "TypeReferenceDirectives");
  value.LibReferenceDirectives = canonicalFileReferences(sourceFile.libReferenceDirectives, context, "LibReferenceDirectives");
  value.ModuleAugmentations = sourceFile.moduleAugmentations.map((node) => canonicalNode(node, context, false));
  if (!Array.isArray(sourceFile.ambientModuleNames) || sourceFile.ambientModuleNames.some((name) => typeof name !== "string")) {
    throw new Error("TS-Go decoder returned invalid ambient module names");
  }
  value.AmbientModuleNames = [...sourceFile.ambientModuleNames];
  const indicator = sourceFile.externalModuleIndicator;
  if (indicator !== undefined) {
    if (indicator !== true && !(indicator instanceof RemoteNode)) throw new Error("TS-Go decoder returned invalid external-module evidence");
    value.ExternalModuleIndicator = indicator === true ? true : canonicalNode(indicator, context, false);
  }
  value.IsDeclarationFile = sourceFile.isDeclarationFile;
}

function canonicalFileReferences(references, context, label) {
  if (!Array.isArray(references)) throw new Error(`TS-Go decoder returned invalid ${label}`);
  return references.map((reference, index) => {
    requirePlainObject(reference, `TS-Go ${label}[${index}]`);
    requireExactKeys(reference, ["end", "fileName", "pos", "preserve", "resolutionMode"], `TS-Go ${label}[${index}]`);
    validateSpan(reference.pos, reference.end, context.sourceLength, `TS-Go ${label}[${index}]`);
    if (typeof reference.fileName !== "string" || reference.fileName === "" ||
        !Number.isInteger(reference.resolutionMode) || typeof reference.preserve !== "boolean") {
      throw new Error(`TS-Go decoder returned invalid ${label}[${index}]`);
    }
    return {
      Pos: reference.pos,
      End: reference.end,
      FileName: reference.fileName,
      ResolutionMode: reference.resolutionMode,
      Preserve: reference.preserve,
    };
  });
}

function canonicalValue(value, context, opaque) {
  if (value instanceof RemoteNode) return canonicalNode(value, context, opaque);
  if (value instanceof RemoteNodeList) {
    validateSpan(value.pos, value.end, context.sourceLength, "TS-Go node list");
    if (!Number.isInteger(value.transformFlags)) throw new Error("TS-Go node list has non-integer transform flags");
    if (value.hasTrailingComma !== undefined && typeof value.hasTrailingComma !== "boolean") {
      throw new Error("TS-Go node list has invalid trailing-comma evidence");
    }
    return {
      Nodes: [...value].map((node) => canonicalNode(node, context, false)),
      Pos: value.pos,
      End: value.end,
      TransformFlags: value.transformFlags,
      ...(value.hasTrailingComma === undefined ? {} : { HasTrailingComma: value.hasTrailingComma }),
    };
  }
  if (Array.isArray(value)) return value.map((entry) => canonicalValue(entry, context, false));
  if (value === null || ["string", "number", "boolean"].includes(typeof value)) return value;
  throw new Error(`TS-Go decoder returned unsupported declaration field value '${Object.prototype.toString.call(value)}'`);
}

function buildFieldPlans() {
  const result = new Map();
  const kindElements = schema.kindElementNames();
  for (let kind = 0; kind < kindElements.length; kind++) {
    const nodeName = canonicalNodeNameForKind(kind);
    const fields = new Map();
    for (const member of schema.members(nodeName)) fields.set(member.name, fieldPlan(nodeName, member));
    const plans = [...fields.values()].filter((plan) => !plan.noTS && plan.name !== "Kind" && plan.name !== "Flags");
    result.set(kind, Object.freeze(plans));
  }
  if (result.size !== kindElements.length) {
    throw new Error(`pinned AST field-plan coverage is ${result.size}/${kindElements.length}`);
  }
  return result;
}

function fieldPlan(nodeName, member) {
  const inherited = member.inherited ? schema.inheritedField(member.name, nodeName) : undefined;
  return Object.freeze({
    name: member.name,
    nodeName,
    noTS: member.noTS || inherited?.noTS === true,
    opaqueImplementation: member.visit === "functionBody",
    optional: member.optional || member.isChild(),
    remoteName: schema.uncapitalize(member.name),
  });
}

function canonicalDiagnostics(value, label, sourceLength) {
  if (!Array.isArray(value)) throw new Error(`TS-Go bridge ${label} must be an array`);
  return value.map((entry, index) => {
    requirePlainObject(entry, `TS-Go bridge ${label}[${index}]`);
    requireExactKeys(entry, ["code", "end", "pos"], `TS-Go bridge ${label}[${index}]`);
    if (!Number.isInteger(entry.code) || !Number.isInteger(entry.pos) || !Number.isInteger(entry.end)) {
      throw new Error(`TS-Go bridge ${label}[${index}] must contain integer code/pos/end`);
    }
    if (entry.pos < -1 || entry.end < -1 || entry.pos > sourceLength || entry.end > sourceLength || entry.end < entry.pos) {
      throw new Error(`TS-Go bridge ${label}[${index}] has invalid source span ${entry.pos}-${entry.end}`);
    }
    return { Code: entry.code, Pos: entry.pos, End: entry.end };
  });
}

function validateNodeRange(node, sourceLength, index) {
  validateSpan(node.__porterPos, node.__porterEnd, sourceLength, `TS-Go node ${index}`);
}

function validateSpan(pos, end, sourceLength, label) {
  if (!Number.isInteger(pos) || !Number.isInteger(end) || pos < -1 || end < -1 ||
      pos > sourceLength || end > sourceLength || end < pos) {
    throw new Error(`${label} has invalid UTF-16 span ${String(pos)}-${String(end)}`);
  }
}

function decodeCanonicalBase64(value) {
  if (typeof value !== "string" || value.length === 0) throw new Error("TS-Go bridge data must be non-empty base64");
  const data = Buffer.from(value, "base64");
  if (data.toString("base64") !== value) throw new Error("TS-Go bridge data is not canonical base64");
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}

function requireIntegerArray(value, label) {
  if (!Array.isArray(value) || value.some((entry) => !Number.isInteger(entry))) throw new Error(`${label} must be an integer array`);
  return value;
}

function requirePlainObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) {
    throw new Error(`${label} must be a plain object`);
  }
}

function requireExactKeys(value, expected, label) {
  const actual = Object.keys(value).sort();
  const keys = [...expected].sort();
  if (actual.length !== keys.length || keys.some((key, index) => key !== actual[index])) {
    throw new Error(`${label} keys must be exactly ${keys.join(", ")}; got ${actual.join(", ")}`);
  }
}

function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const entry of Object.values(value)) deepFreeze(entry, seen);
  return Object.freeze(value);
}

function requireKind(name) {
  for (const [kind, kindName] of kindNames) if (kindName === name) return kind;
  throw new Error(`pinned AST schema is missing concrete kind ${name}`);
}
