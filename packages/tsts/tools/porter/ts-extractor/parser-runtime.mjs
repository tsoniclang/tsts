import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MessageChannel, receiveMessageOnPort, Worker } from "node:worker_threads";

import { parseGoFlagFile } from "../ast-generator/flag-emitters.mjs";
import { prepareTSGoDeclarationBridge } from "../tsgo-declaration-bridge/build.mjs";
import { canonicalKindNames, canonicalSchema } from "./tsgo-canonical-schema.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const nodeFlagsPath = path.resolve(here, "../../../schema/tsgo/nodeflags.go");
const scriptKindTS = Symbol("pinned TS-Go ScriptKindTS");
const parseTimeoutMilliseconds = 120_000;

let parserLoading;

export async function loadParser(...arguments_) {
  if (arguments_.length !== 0) throw new Error("Porter parser selection is fixed by the pinned TS-Go source contract and accepts no overrides");
  if (parserLoading === undefined) parserLoading = loadPinnedParser();
  try {
    return await parserLoading;
  } catch (error) {
    parserLoading = undefined;
    throw error;
  }
}

export function parseSource(api, fileName, sourceText) {
  if (api === null || typeof api !== "object" || typeof api.ParseSourceFile !== "function") throw new Error("Porter parser API is unavailable");
  if (typeof fileName !== "string" || fileName === "") throw new Error("Porter source file name must be non-empty");
  if (typeof sourceText !== "string") throw new Error(`Porter source '${fileName}' must be text`);
  const absolute = fileName.startsWith("/") ? fileName : `/${fileName}`;
  if (absolute.includes("\\") || path.posix.normalize(absolute) !== absolute) {
    throw new Error(`Porter source file name must be one normalized absolute TS-Go path: '${fileName}'`);
  }
  return api.ParseSourceFile({ FileName: absolute, Path: absolute }, sourceText, api.ScriptKindTS);
}

async function loadPinnedParser() {
  const bridge = prepareTSGoDeclarationBridge();
  const runtime = await startParserWorker(bridge);
  const schema = canonicalSchema();
  const Kinds = buildKinds(schema);
  const Flags = buildFlags();
  const Casts = buildCasts(schema, Kinds);
  const kindName = new Map([...canonicalKindNames()].map(([kind, name]) => [kind, `Kind${name}`]));
  const api = {
    Casts,
    Flags,
    Kinds,
    ParseSourceFile(options, sourceText, requestedScriptKind) {
      if (requestedScriptKind !== scriptKindTS) throw new Error("Porter declaration parser only accepts pinned TS-Go TypeScript source mode");
      requireParseOptions(options);
      if (typeof sourceText !== "string") throw new Error("Porter ParseSourceFile source must be text");
      return runtime.parse(options.FileName, sourceText);
    },
    ScriptKindTS: scriptKindTS,
    Node_Pos: (node) => requireCanonicalNode(node).__porterPos,
    Node_End: (node) => requireCanonicalNode(node).__porterEnd,
    Node_ForEachChild(node, callback) {
      const value = requireCanonicalNode(node);
      if (typeof callback !== "function") throw new Error("Node_ForEachChild callback must be a function");
      for (const child of value.__porterChildren) {
        const result = callback(child);
        if (result) return result;
      }
      return undefined;
    },
    Node_JSDoc: (node) => requireCanonicalNode(node).__porterJSDoc,
    SourceFile_Diagnostics: (sourceFile) => requireCanonicalNode(sourceFile).__porterDiagnostics,
    SourceFile_JSDocDiagnostics: (sourceFile) => requireCanonicalNode(sourceFile).__porterJSDocDiagnostics,
    Diagnostic_Code: (diagnostic) => requireDiagnostic(diagnostic).Code,
    Diagnostic_Pos: (diagnostic) => requireDiagnostic(diagnostic).Pos,
    Diagnostic_End: (diagnostic) => requireDiagnostic(diagnostic).End,
    GetTextOfNodeFromSourceText(sourceText, node, includeLeadingTrivia) {
      if (typeof sourceText !== "string") throw new Error("node source text must be a string");
      const value = requireCanonicalNode(node);
      const start = includeLeadingTrivia ? value.__porterPos : value.__porterTextStart;
      if (start === -1) return "";
      if (!Number.isInteger(start) || start < 0 || value.__porterEnd < start || value.__porterEnd > sourceText.length) {
        throw new Error(`node text span ${String(start)}-${String(value.__porterEnd)} is outside source length ${sourceText.length}`);
      }
      return sourceText.slice(start, value.__porterEnd);
    },
    kindName,
    parserIdentity: Object.freeze({ kind: "pinned-tsgo", revision: bridge.revision }),
  };
  return deepFreeze(api);
}

async function startParserWorker(bridge) {
  const { port1, port2 } = new MessageChannel();
  const worker = new Worker(new URL("./tsgo-parser-worker.mjs", import.meta.url), {
    execArgv: ["--experimental-strip-types", "--no-warnings", "--conditions=@typescript/source"],
    transferList: [port1],
    workerData: { binary: bridge.binary, port: port1, revision: bridge.revision },
  });
  const ready = await new Promise((resolve, reject) => {
    const onMessage = (message) => {
      cleanup();
      if (message?.kind === "ready" && message.revision === bridge.revision) resolve(message);
      else reject(deserializeWorkerError(message?.error, "TS-Go parser worker failed during startup"));
    };
    const onError = (error) => {
      cleanup();
      reject(error);
    };
    const onExit = (code) => {
      cleanup();
      reject(new Error(`TS-Go parser worker exited during startup with code ${code}`));
    };
    const cleanup = () => {
      port2.off("message", onMessage);
      worker.off("error", onError);
      worker.off("exit", onExit);
    };
    port2.on("message", onMessage);
    worker.on("error", onError);
    worker.on("exit", onExit);
  });
  if (ready.revision !== bridge.revision) throw new Error("TS-Go parser worker reported the wrong source revision");
  port2.unref();
  worker.unref();
  let requestID = 0;
  return Object.freeze({
    parse(fileName, text) {
      requestID++;
      if (!Number.isSafeInteger(requestID)) throw new Error("TS-Go parser request identity exhausted");
      const signal = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));
      port2.postMessage({ id: requestID, fileName, text, signal: signal.buffer });
      const wait = Atomics.wait(signal, 0, 0, parseTimeoutMilliseconds);
      if (wait === "timed-out") throw new Error(`pinned TS-Go parser timed out after ${parseTimeoutMilliseconds}ms for '${fileName}'`);
      const received = receiveMessageOnPort(port2)?.message;
      if (received === undefined) throw new Error(`pinned TS-Go parser signaled completion without a response for '${fileName}'`);
      if (received.id !== requestID) throw new Error(`pinned TS-Go parser response ${String(received.id)} does not match request ${requestID}`);
      if (received.kind === "request-error") throw deserializeWorkerError(received.error, `pinned TS-Go parser failed for '${fileName}'`);
      if (received.kind !== "result") throw new Error(`pinned TS-Go parser returned unexpected response kind '${String(received.kind)}'`);
      return deepFreeze(received.sourceFile);
    },
  });
}

function buildKinds(schema) {
  const values = {};
  for (const [kind, name] of canonicalKindNames()) values[`Kind${name}`] = kind;
  for (const marker of schema.schema.kinds.markers ?? []) {
    const concreteKind = schema.resolveKindMarkerValue(marker.value);
    const target = values[`Kind${concreteKind}`];
    if (!Number.isInteger(target)) throw new Error(`pinned AST marker ${marker.name} references missing kind ${concreteKind}`);
    values[`Kind${marker.name}`] = target;
  }
  values.KindString = (kind) => canonicalKindNames().has(kind) ? `Kind${canonicalKindNames().get(kind)}` : `Kind(${String(kind)})`;
  return Object.freeze(values);
}

function buildFlags() {
  const entries = parseGoFlagFile(readFileSync(nodeFlagsPath, "utf8"), "NodeFlags");
  const values = {};
  for (const entry of entries) if (entry.kind === "const") values[entry.name] = entry.value;
  return Object.freeze(values);
}

function buildCasts(schema, Kinds) {
  const casts = {};
  for (const nodeName of schema.nodeNames()) {
    const accepted = new Set(schema.kindTypesOf(nodeName).kindNames.map((name) => {
      const kind = Kinds[`Kind${name}`];
      if (!Number.isInteger(kind)) throw new Error(`pinned AST cast As${nodeName} references missing kind ${name}`);
      return kind;
    }));
    casts[`As${nodeName}`] = (node) => {
      const value = requireCanonicalNode(node);
      if (!accepted.has(value.Kind)) {
        throw new Error(`As${nodeName} cannot cast ${Kinds.KindString(value.Kind)}`);
      }
      return value;
    };
  }
  return Object.freeze(casts);
}

function requireParseOptions(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Porter ParseSourceFile options must be an object");
  const keys = Object.keys(value).sort();
  if (keys.length !== 2 || keys[0] !== "FileName" || keys[1] !== "Path") {
    throw new Error(`Porter ParseSourceFile option keys must be exactly FileName, Path; got ${keys.join(", ")}`);
  }
  if (typeof value.FileName !== "string" || !value.FileName.startsWith("/") || value.Path !== value.FileName) {
    throw new Error("Porter ParseSourceFile requires one normalized absolute FileName/Path identity");
  }
}

function requireCanonicalNode(value) {
  if (value === null || typeof value !== "object" || !Number.isInteger(value.Kind) || !Array.isArray(value.__porterChildren)) {
    throw new Error("Porter parser operation requires a canonical pinned TS-Go node");
  }
  return value;
}

function requireDiagnostic(value) {
  if (value === null || typeof value !== "object" || !Number.isInteger(value.Code) || !Number.isInteger(value.Pos) || !Number.isInteger(value.End)) {
    throw new Error("Porter parser operation requires a canonical pinned TS-Go diagnostic");
  }
  return value;
}

function deserializeWorkerError(value, fallback) {
  const error = new Error(typeof value?.message === "string" && value.message !== "" ? value.message : fallback);
  if (typeof value?.stack === "string" && value.stack !== "") error.stack = value.stack;
  return error;
}

function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || (typeof value !== "object" && typeof value !== "function") || seen.has(value)) return value;
  seen.add(value);
  if (value instanceof Map) {
    for (const [key, entry] of value) {
      deepFreeze(key, seen);
      deepFreeze(entry, seen);
    }
  } else {
    for (const entry of Object.values(value)) deepFreeze(entry, seen);
  }
  return Object.freeze(value);
}
