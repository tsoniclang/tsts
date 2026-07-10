#!/usr/bin/env node
// Attribute a V8 CPU profile (and optional heap-allocation profile) to named
// cost categories for investigation:
// UTF-8 conversion, GC, value-key serialization, and per-phase scanner / parser
// / binder / checker / ast-build / emit time.
//
// Usage:
//   node attribute.mjs --cpu <file.cpuprofile> [--heap <file.heapprofile>] [--label NAME] [--json] [--top N]
//
// The CPU profile gives self-time per category (where the compiler spends CPU).
// The heap profile gives allocation bytes per category/site; allocation pressure
// can appear as GC CPU time rather than at its allocation site.
import { readStableRegularFile } from "../test-provenance.mjs";

// Category rules in priority order. Specific runtime functions are matched before
// the by-file-path phase buckets so e.g. getUtf8ByteInfo (in scanner.ts) counts
// as utf8-conv, not scanner. `fn` matches the callFrame functionName; `url` the file.
const RULES = [
  { cat: "gc", fn: /^\(garbage collector\)$/ },
  { cat: "vm-overhead", fn: /^\((program|idle|root|native|garbage|gc)\)?/ },
  // Candidate runtime overhead:
  { cat: "utf8-conv", fn: /getUtf8ByteInfo|byteAt|byteSlice|byteLen|decodeRuneInString|decodeLastRune|encodeUtf8|decodeUTF8|TextEncoder|TextDecoder|^#?encode$|^#?decode$/ },
  { cat: "utf8-conv", url: /\/(encoding|utf8)\.js/ },
  { cat: "value-key", fn: /goValueKey|goStructFieldsKey|goStructMapKey|goObjectId|keyBuilder_|writeByte|writeInt|writeString|Sum128|getRelationKey/ },
  { cat: "value-key", url: /\/xxh3\.js/ },
  // AST node construction = the {} as T + 22-closure adapter + factory allocations:
  { cat: "ast-build", url: /\/internal\/ast\// },
  // Go-runtime emulation (maps/slices/arena/sync):
  { cat: "go-runtime", url: /\/go\/(compat|sync|maps|slices)|\/core\/arena\.js/ },
  // Compiler phases (by directory in the file URL):
  { cat: "scanner", url: /\/internal\/scanner\// },
  { cat: "parser", url: /\/internal\/parser\// },
  { cat: "binder", url: /\/internal\/binder\// },
  { cat: "checker", url: /\/internal\/(checker|nodebuilder|evaluator)\// },
  { cat: "emit", url: /\/internal\/printer\// },
];

const CANDIDATE_OVERHEAD = new Set(["utf8-conv", "value-key", "gc", "ast-build", "go-runtime"]);

function categorize(callFrame) {
  const fn = callFrame.functionName || "";
  const url = callFrame.url || "";
  for (const r of RULES) {
    if (r.fn && r.fn.test(fn)) return r.cat;
    if (r.url && r.url.test(url)) return r.cat;
  }
  return "other";
}

function fileBase(callFrame) {
  return (callFrame.url || "").split("/").pop() || "(native)";
}

function attributeCpu(path) {
  const p = readProfile(path, "CPU");
  if (!Array.isArray(p.nodes) || p.nodes.length === 0 || !Number.isFinite(p.startTime) || !Number.isFinite(p.endTime) || p.endTime <= p.startTime) throw new Error("CPU profile has an invalid sampling envelope");
  const totalMicros = p.endTime - p.startTime;
  const byCat = new Map();
  const byFn = new Map();
  let totalHits = 0;
  for (const n of p.nodes) {
    if (n === null || typeof n !== "object" || n.callFrame === null || typeof n.callFrame !== "object" || !Number.isSafeInteger(n.hitCount ?? 0) || (n.hitCount ?? 0) < 0) throw new Error("CPU profile contains an invalid node");
    const h = n.hitCount ?? 0;
    if (h === 0) continue;
    totalHits += h;
    const cat = categorize(n.callFrame);
    byCat.set(cat, (byCat.get(cat) || 0) + h);
    const key = `${(n.callFrame.functionName || "(anon)")} [${fileBase(n.callFrame)}]`;
    byFn.set(key, (byFn.get(key) || 0) + h);
  }
  if (totalHits <= 0) throw new Error("CPU profile contains no sampled hits");
  return { kind: "cpu", totalMicros, totalHits, byCat, byFn };
}

function attributeHeap(path) {
  const p = readProfile(path, "heap");
  if (p.head === null || typeof p.head !== "object") throw new Error("heap profile has no root node");
  const byCat = new Map();
  const bySite = new Map();
  let totalBytes = 0;
  const stack = [p.head];
  const seen = new Set();
  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined) continue;
    if (node === null || typeof node !== "object" || seen.has(node) || node.callFrame === null || typeof node.callFrame !== "object" || !Number.isFinite(node.selfSize ?? 0) || (node.selfSize ?? 0) < 0 || !Array.isArray(node.children ?? [])) throw new Error("heap profile contains an invalid or cyclic node");
    seen.add(node);
    const s = node.selfSize ?? 0;
    if (s > 0) {
      totalBytes += s;
      const cat = categorize(node.callFrame);
      byCat.set(cat, (byCat.get(cat) || 0) + s);
      const key = `${(node.callFrame.functionName || "(anon)")} [${fileBase(node.callFrame)}]`;
      bySite.set(key, (bySite.get(key) || 0) + s);
    }
    for (const c of node.children ?? []) stack.push(c);
  }
  if (totalBytes <= 0) throw new Error("heap profile contains no sampled allocation bytes");
  return { kind: "heap", totalBytes, byCat, bySite };
}

function pctRows(map, total) {
  return [...map.entries()]
    .map(([k, v]) => ({ k, v, pct: total > 0 ? (100 * v) / total : 0 }))
    .sort((a, b) => b.v - a.v);
}

function printCpu(label, r) {
  const secs = r.totalMicros / 1e6;
  console.log(`\n# CPU self-time — ${label}  (total ${secs.toFixed(2)}s, ${r.totalHits} samples)`);
  console.log(`${"category".padEnd(14)} ${"%".padStart(7)} ${"time".padStart(8)}`);
  let candidateShare = 0;
  for (const { k, v, pct } of pctRows(r.byCat, r.totalHits)) {
    if (CANDIDATE_OVERHEAD.has(k)) candidateShare += pct;
    console.log(`${k.padEnd(14)} ${pct.toFixed(1).padStart(6)}% ${(secs * v / r.totalHits).toFixed(2).padStart(7)}s`);
  }
  console.log(`${"-".repeat(32)}`);
  console.log(`${"CANDIDATE".padEnd(14)} ${candidateShare.toFixed(1).padStart(6)}%  (heuristically tagged; not a proven recoverable fraction)`);
}

function printHeap(label, r, top) {
  const mb = r.totalBytes / 1048576;
  console.log(`\n# Heap allocation — ${label}  (sampled total ${mb.toFixed(1)} MB)`);
  console.log(`${"category".padEnd(14)} ${"%".padStart(7)} ${"bytes".padStart(10)}`);
  for (const { k, v, pct } of pctRows(r.byCat, r.totalBytes)) {
    console.log(`${k.padEnd(14)} ${pct.toFixed(1).padStart(6)}% ${(v / 1048576).toFixed(2).padStart(8)}MB`);
  }
  console.log(`\n  top allocation sites:`);
  for (const { k, pct } of pctRows(r.bySite, r.totalBytes).slice(0, top)) {
    console.log(`    ${pct.toFixed(1).padStart(5)}%  ${k}`);
  }
}

function printTopFns(r, top) {
  console.log(`\n  top self-time functions:`);
  for (const { k, pct } of pctRows(r.byFn, r.totalHits).slice(0, top)) {
    console.log(`    ${pct.toFixed(1).padStart(5)}%  ${k}`);
  }
}

function main() {
  const argv = process.argv.slice(2);
  const opt = { label: "profile", top: 12, json: false };
  let cpu, heap;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--cpu") cpu = requiredValue(argv, ++i, a);
    else if (a === "--heap") heap = requiredValue(argv, ++i, a);
    else if (a === "--label") opt.label = requiredValue(argv, ++i, a);
    else if (a === "--top") opt.top = Number(requiredValue(argv, ++i, a));
    else if (a === "--json") opt.json = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!cpu && !heap) {
    console.error("usage: attribute.mjs --cpu <file.cpuprofile> [--heap <file.heapprofile>] [--label NAME] [--top N] [--json]");
    process.exit(1);
  }
  if (!Number.isSafeInteger(opt.top) || opt.top < 1 || opt.top > 100) throw new Error("--top must be an integer from 1 through 100");
  const out = {};
  let cpuR, heapR;
  if (cpu) cpuR = attributeCpu(cpu);
  if (heap) heapR = attributeHeap(heap);
  if (opt.json) {
    out.schemaVersion = 1;
    out.classification = "heuristic-profile-attribution";
    if (cpuR) out.cpu = { totalMicros: cpuR.totalMicros, totalHits: cpuR.totalHits, byCat: Object.fromEntries(cpuR.byCat) };
    if (heapR) out.heap = { totalBytes: heapR.totalBytes, byCat: Object.fromEntries(heapR.byCat) };
    console.log(JSON.stringify(out, null, 2));
    return;
  }
  if (cpuR) { printCpu(opt.label, cpuR); printTopFns(cpuR, opt.top); }
  if (heapR) printHeap(opt.label, heapR, opt.top);
}

function readProfile(path, label) {
  let value;
  try {
    value = JSON.parse(readStableRegularFile(path, `${label} profile`).toString("utf8"));
  } catch (error) {
    throw new Error(`${label} profile is not valid stable JSON: ${path}`, { cause: error });
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} profile root must be an object`);
  return value;
}

function requiredValue(argv, index, option) {
  const value = argv[index];
  if (typeof value !== "string" || value === "") throw new Error(`${option} requires a value`);
  return value;
}

main();
