/**
 * Extension host unit tests (node:test).
 *
 * Run via the TS-stripping loader:
 *   node --import ./packages/tsts/tools/register.mjs --test \
 *     packages/tsts/src/extensions/host.test.ts
 *
 * Covers registration, ordering (dependsOn/runsAfter/registration-order),
 * duplicate-id / missing-dependency / cycle fatals, the typed fact store across
 * all four instance kinds plus program facts, cross-extension dependsOn reads,
 * hook-exception conversion, and per-store fact isolation. The compiler AST
 * objects are stubbed with tiny fakes: the fact store keys by object identity
 * only and never reads node/symbol/type fields, so opaque objects suffice.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { defineFactKey } from "./factKeys.js";
import { createExtensionFacts } from "./facts.js";
import { orderExtensions } from "./ordering.js";
import { createExtensionHost, type CompilerExtension } from "./host.js";
import type { ExtensionProgram } from "./contexts.js";
import type { CheckerLike } from "./checkerFacade.js";
import type { Node, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import type { Type } from "../checker/types.js";

// ---------------------------------------------------------------------------
// Fakes — opaque identity-only stand-ins for compiler objects.
// ---------------------------------------------------------------------------

const fakeNode = (tag: string): Node => ({ tag } as unknown as Node);
const fakeSymbol = (tag: string): AstSymbol => ({ tag } as unknown as AstSymbol);
const fakeType = (tag: string): Type => ({ tag } as unknown as Type);
const fakeSourceFile = (fileName: string): SourceFile =>
  ({ fileName, text: "" } as unknown as SourceFile);

const fakeProgram: ExtensionProgram = {};
const fakeChecker: CheckerLike = {
  getTypeAtLocation: () => undefined,
  getSymbolAtLocation: () => undefined,
  getDeclaredTypeOfSymbol: () => undefined,
  getContextualType: () => undefined,
  getTypeOfSymbolAtLocation: () => undefined,
};
const NO_OPTIONS: ReadonlyMap<string, ReadonlyMap<string, unknown>> = new Map();

const extension = (
  id: string,
  overrides: Partial<CompilerExtension> = {},
): CompilerExtension => ({
  id,
  displayName: id,
  version: "1.0.0",
  ...overrides,
});

// ---------------------------------------------------------------------------
// Registration & ordering
// ---------------------------------------------------------------------------

test("registers extensions and exposes them in sorted order", () => {
  const host = createExtensionHost([extension("a"), extension("b")]);
  assert.equal(host.ok, true);
  assert.deepEqual(host.extensions.map(e => e.id), ["a", "b"]);
  assert.equal(host.facts.diagnostics().length, 0);
});

test("zero extensions: host is a no-op with no facts or diagnostics", () => {
  const host = createExtensionHost([]);
  assert.equal(host.ok, true);
  assert.equal(host.extensions.length, 0);
  host.runConfigure(fakeProgram, NO_OPTIONS);
  host.runAfterParse([fakeSourceFile("a.ts")], fakeProgram);
  host.runAfterCheckProgram(fakeProgram, fakeChecker);
  assert.equal(host.facts.diagnostics().length, 0);
});

test("duplicate extension id is a fatal registration diagnostic", () => {
  const host = createExtensionHost([extension("dup"), extension("dup")]);
  assert.equal(host.ok, false);
  assert.equal(host.extensions.length, 0);
  const diagnostics = host.facts.diagnostics();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]!.code, 9000002);
});

test("missing hard dependency is a fatal registration diagnostic", () => {
  const host = createExtensionHost([extension("a", { dependsOn: ["missing"] })]);
  assert.equal(host.ok, false);
  const diagnostics = host.facts.diagnostics();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]!.code, 9000003);
  assert.match(diagnostics[0]!.text, /missing/);
});

test("dependency cycle is a fatal registration diagnostic", () => {
  const host = createExtensionHost([
    extension("a", { dependsOn: ["b"] }),
    extension("b", { dependsOn: ["a"] }),
  ]);
  assert.equal(host.ok, false);
  const diagnostics = host.facts.diagnostics();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]!.code, 9000004);
});

test("dependsOn orders the dependency before the dependent", () => {
  const result = orderExtensions([
    extension("consumer", { dependsOn: ["provider"] }),
    extension("provider"),
  ]);
  assert.equal(result.ok, true);
  assert.ok(result.ok && result.order.indexOf("provider") < result.order.indexOf("consumer"));
});

test("runsAfter orders softly when target is present", () => {
  const result = orderExtensions([
    extension("late", { runsAfter: ["early"] }),
    extension("early"),
  ]);
  assert.equal(result.ok, true);
  assert.ok(result.ok && result.order.indexOf("early") < result.order.indexOf("late"));
});

test("runsAfter referencing an absent extension is ignored (no fatal)", () => {
  const result = orderExtensions([extension("only", { runsAfter: ["ghost"] })]);
  assert.equal(result.ok, true);
  assert.ok(result.ok && result.order.length === 1);
});

test("independent extensions keep registration order", () => {
  const result = orderExtensions([extension("z"), extension("m"), extension("a")]);
  assert.equal(result.ok, true);
  assert.ok(result.ok);
  assert.deepEqual(result.order, ["z", "m", "a"]);
});

// ---------------------------------------------------------------------------
// Fact store: typed keys across all instance kinds
// ---------------------------------------------------------------------------

interface SampleFact {
  readonly kind: string;
  readonly width: number;
}

test("node/symbol/type/sourcefile/program facts store and retrieve by typed key", () => {
  const facts = createExtensionFacts();
  const key = defineFactKey<SampleFact>("ext", "sample", "a sample fact");

  const node = fakeNode("n");
  const symbol = fakeSymbol("s");
  const type = fakeType("t");
  const file = fakeSourceFile("f.ts");

  assert.equal(facts.getNodeFact(node, key), undefined);
  assert.equal(facts.hasNodeFact(node, key), false);

  facts.setNodeFact(node, key, { kind: "node", width: 1 });
  facts.setSymbolFact(symbol, key, { kind: "symbol", width: 2 });
  facts.setTypeFact(type, key, { kind: "type", width: 3 });
  facts.setSourceFileFact(file, key, { kind: "file", width: 4 });
  facts.setProgramFact(key, { kind: "program", width: 5 });

  assert.equal(facts.hasNodeFact(node, key), true);
  assert.deepEqual(facts.getNodeFact(node, key), { kind: "node", width: 1 });
  assert.deepEqual(facts.getSymbolFact(symbol, key), { kind: "symbol", width: 2 });
  assert.deepEqual(facts.getTypeFact(type, key), { kind: "type", width: 3 });
  assert.deepEqual(facts.getSourceFileFact(file, key), { kind: "file", width: 4 });
  assert.deepEqual(facts.getProgramFact(key), { kind: "program", width: 5 });
});

test("fact stores are isolated: same instance + key does not bleed across kinds", () => {
  const facts = createExtensionFacts();
  // Reuse one object as both a node and a symbol fake to prove the WeakMaps
  // are independent stores keyed within their own kind.
  const shared = { tag: "shared" };
  const key = defineFactKey<number>("ext", "iso", "isolation");

  facts.setNodeFact(shared as unknown as Node, key, 11);
  assert.equal(facts.getSymbolFact(shared as unknown as AstSymbol, key), undefined);
  assert.equal(facts.getNodeFact(shared as unknown as Node, key), 11);
});

test("distinct typed keys do not collide on the same node", () => {
  const facts = createExtensionFacts();
  const node = fakeNode("n");
  const keyA = defineFactKey<string>("ext", "a", "key a");
  const keyB = defineFactKey<string>("ext", "b", "key b");
  facts.setNodeFact(node, keyA, "alpha");
  facts.setNodeFact(node, keyB, "beta");
  assert.equal(facts.getNodeFact(node, keyA), "alpha");
  assert.equal(facts.getNodeFact(node, keyB), "beta");
});

test("re-setting a fact replaces rather than appends", () => {
  const facts = createExtensionFacts();
  const node = fakeNode("n");
  const key = defineFactKey<number>("ext", "v", "value");
  facts.setNodeFact(node, key, 1);
  facts.setNodeFact(node, key, 2);
  assert.equal(facts.getNodeFact(node, key), 2);
});

// ---------------------------------------------------------------------------
// Cross-extension fact reads (dependsOn enables shared facts)
// ---------------------------------------------------------------------------

test("a dependent extension reads facts written by its dependency", () => {
  const providerKey = defineFactKey<string>("provider", "tag", "provider tag");
  const node = fakeNode("shared");
  const observed: (string | undefined)[] = [];

  const provider = extension("provider", {
    afterCheckSourceFile: context => {
      context.facts.setNodeFact(node, providerKey, "from-provider");
    },
  });
  const consumer = extension("consumer", {
    dependsOn: ["provider"],
    afterCheckSourceFile: context => {
      observed.push(context.facts.getNodeFact(node, providerKey));
    },
  });

  const host = createExtensionHost([consumer, provider]);
  assert.equal(host.ok, true);
  host.runAfterCheck(fakeSourceFile("f.ts"), fakeChecker, fakeProgram);
  // provider runs first (dependsOn), so consumer observes its fact.
  assert.deepEqual(observed, ["from-provider"]);
});

// ---------------------------------------------------------------------------
// Hook exception handling
// ---------------------------------------------------------------------------

test("a thrown hook becomes a fatal 9000001 diagnostic naming extension and hook", () => {
  const boom = extension("boom", {
    afterCheckProgram: () => {
      throw new Error("kaboom");
    },
  });
  const host = createExtensionHost([boom]);
  host.runAfterCheckProgram(fakeProgram, fakeChecker);
  const diagnostics = host.facts.diagnostics();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]!.code, 9000001);
  assert.match(diagnostics[0]!.text, /boom/);
  assert.match(diagnostics[0]!.text, /afterCheckProgram/);
  assert.match(diagnostics[0]!.text, /kaboom/);
});

test("a throwing hook does not prevent later extensions from running", () => {
  const ran: string[] = [];
  const first = extension("first", {
    afterCheckProgram: () => {
      throw new Error("x");
    },
  });
  const second = extension("second", {
    runsAfter: ["first"],
    afterCheckProgram: () => {
      ran.push("second");
    },
  });
  const host = createExtensionHost([first, second]);
  host.runAfterCheckProgram(fakeProgram, fakeChecker);
  assert.deepEqual(ran, ["second"]);
  assert.equal(host.facts.diagnostics().length, 1);
});

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

test("re-running a phase for the same file does not re-invoke the hook", () => {
  let calls = 0;
  const counter = extension("counter", {
    afterBindSourceFile: () => {
      calls = calls + 1;
    },
  });
  const host = createExtensionHost([counter]);
  const file = fakeSourceFile("same.ts");
  host.runAfterBind(file, fakeProgram);
  host.runAfterBind(file, fakeProgram);
  assert.equal(calls, 1);
});

test("validateProgram diagnostics surface through the fact store", () => {
  const validator = extension("validator", {
    validateProgram: () => [
      {
        message: {
          key: "X",
          code: 9100001,
          category: 1,
          message: "bad",
        },
        category: 1,
        code: 9100001,
        text: "bad thing",
      },
    ],
  });
  const host = createExtensionHost([validator]);
  host.runValidateProgram(fakeProgram, fakeChecker);
  const diagnostics = host.facts.diagnostics();
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]!.code, 9100001);
});
