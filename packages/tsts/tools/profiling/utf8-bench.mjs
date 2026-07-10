#!/usr/bin/env node
import { performance } from "node:perf_hooks";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { dispersion } from "./benchmark-core.mjs";
import { prepareTstsMicrobenchmark } from "./microbenchmark-context.mjs";

const driverPath = fileURLToPath(import.meta.url);
const options = parseArgs(process.argv.slice(2));
const context = await prepareTstsMicrobenchmark({ driverPath, noBuild: options.noBuild, quiet: options.json });
const utf8Dist = join(context.dist, "src/go/unicode/utf8.js");
const unicodeDist = join(context.dist, "src/go/unicode.js");
const coreDist = join(context.dist, "src/internal/core/core.js");
const stringutilDist = join(context.dist, "src/internal/stringutil/util.js");
const stringCompareDist = join(context.dist, "src/internal/stringutil/compare.js");

const utf8 = await import(pathToFileURL(utf8Dist).href);
const unicode = await import(pathToFileURL(unicodeDist).href);
const core = await import(pathToFileURL(coreDist).href);
const stringutil = await import(pathToFileURL(stringutilDist).href);
const stringCompare = await import(pathToFileURL(stringCompareDist).href);

const encoder = new globalThis.TextEncoder();
const decoder = new globalThis.TextDecoder("utf-8");

function parseArgs(argv) {
  const parsed = { runs: 7, json: false, noBuild: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--runs") parsed.runs = Number(argv[++i]);
    else if (arg === "--json") parsed.json = true;
    else if (arg === "--no-build") parsed.noBuild = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isSafeInteger(parsed.runs) || parsed.runs < 5) throw new Error("--runs must be an integer of at least 5");
  return parsed;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function measure(fn) {
  const start = performance.now();
  const checksum = fn();
  const millis = performance.now() - start;
  return { millis, checksum };
}

function runPair(name, legacy, current, runs) {
  const legacySamples = [];
  const currentSamples = [];
  let legacyChecksum;
  let currentChecksum;

  legacy();
  current();

  for (let run = 0; run < runs; run++) {
    const first = run % 2 === 0 ? "legacy" : "current";
    const samples = first === "legacy"
      ? [measure(legacy), measure(current)]
      : [measure(current), measure(legacy)];
    const legacyResult = first === "legacy" ? samples[0] : samples[1];
    const currentResult = first === "legacy" ? samples[1] : samples[0];
    legacySamples.push(legacyResult.millis);
    currentSamples.push(currentResult.millis);
    legacyChecksum = legacyResult.checksum;
    currentChecksum = currentResult.checksum;
  }

  if (legacyChecksum !== currentChecksum) {
    throw new Error(`${name} checksum mismatch: legacy=${legacyChecksum} current=${currentChecksum}`);
  }

  const legacyMs = median(legacySamples);
  const currentMs = median(currentSamples);
  if (!Number.isFinite(legacyMs) || legacyMs <= 0 || !Number.isFinite(currentMs) || currentMs <= 0) throw new Error(`${name} produced a non-positive timing sample`);
  return {
    name,
    legacyMs,
    currentMs,
    speedup: legacyMs / currentMs,
    checksum: currentChecksum,
    legacySamples,
    currentSamples,
    legacyDispersion: dispersion(legacySamples),
    currentDispersion: dispersion(currentSamples),
  };
}

function legacyByteLen(s) {
  return encoder.encode(s).length;
}

function legacyByteAt(s, i) {
  return encoder.encode(s)[i];
}

function legacyByteSlice(s, start, end) {
  return decoder.decode(encoder.encode(s).subarray(start, end));
}

function legacyUTF16Len(s) {
  return decoder.decode(encoder.encode(s)).length;
}

function legacyContainsNonASCII(s) {
  for (let offset = 0; offset < legacyByteLen(s); offset++) {
    if (legacyByteAt(s, offset) >= 0x80) return true;
  }
  return false;
}

function legacyDecodeRuneInStringAt(s, offset) {
  const bytes = encoder.encode(s);
  return utf8.DecodeRuneInBytesAt(bytes, offset);
}

function legacySplitLines(text) {
  const lines = [];
  let start = 0;
  let pos = 0;
  while (pos < legacyByteLen(text)) {
    const ch = legacyByteAt(text, pos);
    if (ch === 0x0d || ch === 0x0a) {
      if (ch === 0x0d && pos + 1 < legacyByteLen(text) && legacyByteAt(text, pos + 1) === 0x0a) {
        lines.push(legacyByteSlice(text, start, pos));
        pos += 2;
        start = pos;
        continue;
      }
      lines.push(legacyByteSlice(text, start, pos));
      pos++;
      start = pos;
      continue;
    }
    pos++;
  }
  if (start < legacyByteLen(text)) {
    lines.push(legacyByteSlice(text, start));
  }
  return lines;
}

function legacyCompareStringsCaseInsensitive(a, b) {
  if (a === b) {
    return 0;
  }
  for (;;) {
    const [ca, sa] = legacyDecodeRuneInStringAt(a, 0);
    const [cb, sb] = legacyDecodeRuneInStringAt(b, 0);
    if (sa === 0) {
      return sb === 0 ? 0 : -1;
    }
    if (sb === 0) {
      return 1;
    }
    const lca = unicode.ToLower(ca);
    const lcb = unicode.ToLower(cb);
    if (lca !== lcb) {
      return lca < lcb ? -1 : 1;
    }
    a = legacyByteSlice(a, sa);
    b = legacyByteSlice(b, sb);
  }
}

function makeAsciiSource(lineCount) {
  const line = "export const value = condition ? left + right : fallback;\n";
  return line.repeat(lineCount);
}

function makeMixedSource(lineCount) {
  const line = "const café = `𝄞${value}`; // ελληνικά 中文 русский 😀\r\n";
  return line.repeat(lineCount);
}

function checksumStrings(values) {
  let checksum = 0;
  for (const value of values) {
    checksum = (checksum + value.length) | 0;
    if (value.length > 0) checksum = (checksum + value.charCodeAt(0)) | 0;
  }
  return checksum;
}

const asciiSource = makeAsciiSource(2_000);
const mixedSource = makeMixedSource(300);
const smallAsciiSource = makeAsciiSource(48);
const smallMixedSource = makeMixedSource(24);
const compareLeft = makeMixedSource(40);
const compareRight = compareLeft.toUpperCase();

const benchmarks = [
  runPair(
    "short-string repeated byte indexing",
    () => {
      let checksum = 0;
      const byteLength = legacyByteLen(smallMixedSource);
      for (let pass = 0; pass < 20; pass++) {
        for (let offset = 0; offset < byteLength; offset++) checksum = (checksum + legacyByteAt(smallMixedSource, offset)) | 0;
      }
      return checksum;
    },
    () => {
      let checksum = 0;
      const byteLength = utf8.StringByteLen(smallMixedSource);
      for (let pass = 0; pass < 20; pass++) {
        for (let offset = 0; offset < byteLength; offset++) checksum = (checksum + utf8.StringByteAt(smallMixedSource, offset)) | 0;
      }
      return checksum;
    },
    options.runs,
  ),
  runPair(
    "ContainsNonASCII short ASCII source",
    () => {
      let checksum = 0;
      for (let pass = 0; pass < 2; pass++) checksum += legacyContainsNonASCII(smallAsciiSource) ? 1 : 0;
      return checksum;
    },
    () => {
      let checksum = 0;
      for (let pass = 0; pass < 2; pass++) checksum += stringutil.ContainsNonASCII(smallAsciiSource) ? 1 : 0;
      return checksum;
    },
    options.runs,
  ),
  runPair(
    "ContainsNonASCII short Unicode source",
    () => {
      let checksum = 0;
      for (let pass = 0; pass < 1_000; pass++) checksum += legacyContainsNonASCII(smallMixedSource) ? 1 : 0;
      return checksum;
    },
    () => {
      let checksum = 0;
      for (let pass = 0; pass < 1_000; pass++) checksum += stringutil.ContainsNonASCII(smallMixedSource) ? 1 : 0;
      return checksum;
    },
    options.runs,
  ),
  runPair(
    "UTF16Len large mixed source",
    () => {
      let checksum = 0;
      for (let i = 0; i < 800; i++) checksum += legacyUTF16Len(mixedSource);
      return checksum;
    },
    () => {
      let checksum = 0;
      for (let i = 0; i < 800; i++) checksum += core.UTF16Len(mixedSource);
      return checksum;
    },
    options.runs,
  ),
  runPair(
    "byte length repeated ASCII source",
    () => {
      let checksum = 0;
      for (let i = 0; i < 400; i++) checksum += legacyByteLen(asciiSource);
      return checksum;
    },
    () => {
      let checksum = 0;
      for (let i = 0; i < 400; i++) checksum += utf8.StringByteLen(asciiSource);
      return checksum;
    },
    options.runs,
  ),
  runPair(
    "decode runes by byte offset",
    () => {
      let checksum = 0;
      const byteLength = legacyByteLen(mixedSource);
      for (let pass = 0; pass < 2; pass++) {
        let offset = 0;
        while (offset < byteLength) {
          const [rune, size] = legacyDecodeRuneInStringAt(mixedSource, offset);
          checksum = (checksum + rune + size) | 0;
          offset += size === 0 ? 1 : size;
        }
      }
      return checksum;
    },
    () => {
      let checksum = 0;
      const byteLength = utf8.StringByteLen(mixedSource);
      for (let pass = 0; pass < 2; pass++) {
        let offset = 0;
        while (offset < byteLength) {
          const [rune, size] = utf8.DecodeRuneInStringAt(mixedSource, offset);
          checksum = (checksum + rune + size) | 0;
          offset += size === 0 ? 1 : size;
        }
      }
      return checksum;
    },
    options.runs,
  ),
  runPair(
    "SplitLines mixed CRLF source",
    () => checksumStrings(legacySplitLines(mixedSource)),
    () => checksumStrings(stringutil.SplitLines(mixedSource)),
    options.runs,
  ),
  runPair(
    "case-insensitive compare mixed source",
    () => {
      let checksum = 0;
      for (let i = 0; i < 2; i++) {
        checksum += legacyCompareStringsCaseInsensitive(compareLeft, compareRight);
      }
      return checksum;
    },
    () => {
      let checksum = 0;
      for (let i = 0; i < 2; i++) {
        checksum += stringCompare.CompareStringsCaseInsensitive(compareLeft, compareRight);
      }
      return checksum;
    },
    options.runs,
  ),
];

context.reverify();

if (options.json) {
  console.log(JSON.stringify({ schemaVersion: 1, classification: "exploratory-not-a-regression-gate", runs: options.runs, evidence: context.evidence, benchmarks }, null, 2));
} else {
  console.log(`# UTF-8/source-text performance benchmark`);
  console.log(`classification: exploratory, not a regression gate`);
  console.log(`prepared TSTS build: ${context.evidence.tstsBuild.buildId}`);
  console.log(`runs: ${options.runs} (median with dispersion)`);
  console.log(`| case | legacy ms | current ms | current CV | speedup |`);
  console.log(`|---|---:|---:|---:|---:|`);
  for (const row of benchmarks) {
    console.log(`| ${row.name} | ${row.legacyMs.toFixed(3)} | ${row.currentMs.toFixed(3)} | ${(row.currentDispersion.coefficientOfVariation * 100).toFixed(1)}% | ${row.speedup.toFixed(1)}x |`);
  }
}
