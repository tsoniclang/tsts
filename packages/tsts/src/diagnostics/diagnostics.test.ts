import test from "node:test";
import assert from "node:assert/strict";

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { name as categoryName, format, localize, stringifyArgs, type LocaleMessages, type LocaleProvider } from "./diagnostics.js";
import type { DiagnosticMessage } from "./types.js";

const Identifier_expected: DiagnosticMessage = {
  key: "Identifier_expected_1003",
  code: 1003,
  category: DiagnosticCategory.Error,
  message: "Identifier expected.",
};

const X_0_expected: DiagnosticMessage = {
  key: "_0_expected_1005",
  code: 1005,
  category: DiagnosticCategory.Error,
  message: "'{0}' expected.",
};

const Parser_expected_close: DiagnosticMessage = {
  key: "The_parser_expected_to_find_a_1_to_match_the_0_token_here_1007",
  code: 1007,
  category: DiagnosticCategory.Error,
  message: "The parser expected to find a '{1}' to match the '{0}' token here.",
};

const STUB_CATALOG = new Map<string, DiagnosticMessage>([
  [Identifier_expected.key, Identifier_expected],
  [X_0_expected.key, X_0_expected],
  [Parser_expected_close.key, Parser_expected_close],
]);

const localeTables = new Map<string, LocaleMessages>([
  ["de-DE", new Map<string, string>([
    ["Identifier_expected_1003", "Es wurde ein Bezeichner erwartet."],
    ["_0_expected_1005", "\"{0}\" wurde erwartet."],
  ])],
  ["fr-FR", new Map<string, string>([["Identifier_expected_1003", "Identificateur attendu."]])],
  ["es-ES", new Map<string, string>([["Identifier_expected_1003", "Se esperaba un identificador."]])],
  ["ja-JP", new Map<string, string>([["Identifier_expected_1003", "識別子が必要です。"]])],
  ["zh-CN", new Map<string, string>([["Identifier_expected_1003", "应为标识符。"]])],
  ["ko-KR", new Map<string, string>([["Identifier_expected_1003", "식별자가 필요합니다."]])],
  ["ru-RU", new Map<string, string>([["Identifier_expected_1003", "Ожидался идентификатор."]])],
]);

const localeProvider: LocaleProvider = (loc) => {
  if (loc === "") return undefined;
  return localeTables.get(loc);
};

const lookupByKey = (key: string): DiagnosticMessage | undefined => STUB_CATALOG.get(key);

test("category name returns canonical lowercase names", () => {
  assert.strictEqual(categoryName(DiagnosticCategory.Warning), "warning");
  assert.strictEqual(categoryName(DiagnosticCategory.Error), "error");
  assert.strictEqual(categoryName(DiagnosticCategory.Suggestion), "suggestion");
  assert.strictEqual(categoryName(DiagnosticCategory.Message), "message");
});

test("format returns text unchanged when no args", () => {
  assert.strictEqual(format("Identifier expected.", []), "Identifier expected.");
});

test("format replaces single placeholder", () => {
  assert.strictEqual(format("'{0}' expected.", [")"]), "')' expected.");
});

test("format replaces multiple placeholders", () => {
  assert.strictEqual(
    format("The parser expected to find a '{1}' to match the '{0}' token here.", ["{", "}"]),
    "The parser expected to find a '}' to match the '{' token here.",
  );
});

test("string args pass through", () => {
  assert.deepStrictEqual(stringifyArgs(["a", "b"]), ["a", "b"]);
});

test("non string args get stringified", () => {
  assert.deepStrictEqual(stringifyArgs([42, true]), ["42", "true"]);
});

test("empty args return empty array", () => {
  assert.deepStrictEqual(stringifyArgs([]), []);
});

test("english default returns message text", () => {
  assert.strictEqual(localize("en", Identifier_expected, "", [], lookupByKey, localeProvider), "Identifier expected.");
});

test("undefined locale uses english", () => {
  assert.strictEqual(localize("", Identifier_expected, "", [], lookupByKey, localeProvider), "Identifier expected.");
});

test("with single argument", () => {
  assert.strictEqual(localize("en", X_0_expected, "", [")"], lookupByKey, localeProvider), "')' expected.");
});

test("with multiple arguments", () => {
  assert.strictEqual(
    localize("en", Parser_expected_close, "", ["{", "}"], lookupByKey, localeProvider),
    "The parser expected to find a '}' to match the '{' token here.",
  );
});

test("unknown locale falls back to english", () => {
  assert.strictEqual(localize("af-ZA", Identifier_expected, "", [], lookupByKey, localeProvider), "Identifier expected.");
});

test("german localization", () => {
  assert.strictEqual(localize("de-DE", Identifier_expected, "", [], lookupByKey, localeProvider), "Es wurde ein Bezeichner erwartet.");
});

test("french localization", () => {
  assert.strictEqual(localize("fr-FR", Identifier_expected, "", [], lookupByKey, localeProvider), "Identificateur attendu.");
});

test("spanish localization", () => {
  assert.strictEqual(localize("es-ES", Identifier_expected, "", [], lookupByKey, localeProvider), "Se esperaba un identificador.");
});

test("japanese localization", () => {
  assert.strictEqual(localize("ja-JP", Identifier_expected, "", [], lookupByKey, localeProvider), "識別子が必要です。");
});

test("chinese simplified localization", () => {
  assert.strictEqual(localize("zh-CN", Identifier_expected, "", [], lookupByKey, localeProvider), "应为标识符。");
});

test("korean localization", () => {
  assert.strictEqual(localize("ko-KR", Identifier_expected, "", [], lookupByKey, localeProvider), "식별자가 필요합니다.");
});

test("russian localization", () => {
  assert.strictEqual(localize("ru-RU", Identifier_expected, "", [], lookupByKey, localeProvider), "Ожидался идентификатор.");
});

test("german with argument", () => {
  assert.strictEqual(localize("de-DE", X_0_expected, "", [")"], lookupByKey, localeProvider), "\")\" wurde erwartet.");
});

test("by key without args", () => {
  assert.strictEqual(localize("en", undefined, "Identifier_expected_1003", [], lookupByKey, localeProvider), "Identifier expected.");
});

test("by key with args", () => {
  assert.strictEqual(localize("en", undefined, "_0_expected_1005", [")"], lookupByKey, localeProvider), "')' expected.");
});
