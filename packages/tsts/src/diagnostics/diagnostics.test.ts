import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { categoryName, format, localize, stringifyArgs, type LocaleMessages, type LocaleProvider } from "./diagnostics.js";
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

export class DiagnosticsCategoryTests {
  category_name_returns_canonical_lowercase_names(): void {
    Assert.Equal("warning", categoryName(DiagnosticCategory.Warning));
    Assert.Equal("error", categoryName(DiagnosticCategory.Error));
    Assert.Equal("suggestion", categoryName(DiagnosticCategory.Suggestion));
    Assert.Equal("message", categoryName(DiagnosticCategory.Message));
  }
}

export class DiagnosticsFormatTests {
  format_returns_text_unchanged_when_no_args(): void {
    Assert.Equal("Identifier expected.", format("Identifier expected.", []));
  }

  format_replaces_single_placeholder(): void {
    Assert.Equal("')' expected.", format("'{0}' expected.", [")"]));
  }

  format_replaces_multiple_placeholders(): void {
    Assert.Equal(
      "The parser expected to find a '}' to match the '{' token here.",
      format("The parser expected to find a '{1}' to match the '{0}' token here.", ["{", "}"]),
    );
  }
}

export class DiagnosticsStringifyArgsTests {
  string_args_pass_through(): void {
    Assert.Equal<readonly string[]>(["a", "b"], stringifyArgs(["a", "b"]));
  }

  non_string_args_get_stringified(): void {
    Assert.Equal<readonly string[]>(["42", "true"], stringifyArgs([42, true]));
  }

  empty_args_return_empty_array(): void {
    Assert.Equal<readonly string[]>([], stringifyArgs([]));
  }
}

export class DiagnosticsLocalizeTests {
  english_default_returns_message_text(): void {
    Assert.Equal("Identifier expected.", localize("en", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  undefined_locale_uses_english(): void {
    Assert.Equal("Identifier expected.", localize("", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  with_single_argument(): void {
    Assert.Equal("')' expected.", localize("en", X_0_expected, "", [")"], lookupByKey, localeProvider));
  }

  with_multiple_arguments(): void {
    Assert.Equal(
      "The parser expected to find a '}' to match the '{' token here.",
      localize("en", Parser_expected_close, "", ["{", "}"], lookupByKey, localeProvider),
    );
  }

  unknown_locale_falls_back_to_english(): void {
    Assert.Equal("Identifier expected.", localize("af-ZA", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  german_localization(): void {
    Assert.Equal("Es wurde ein Bezeichner erwartet.", localize("de-DE", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  french_localization(): void {
    Assert.Equal("Identificateur attendu.", localize("fr-FR", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  spanish_localization(): void {
    Assert.Equal("Se esperaba un identificador.", localize("es-ES", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  japanese_localization(): void {
    Assert.Equal("識別子が必要です。", localize("ja-JP", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  chinese_simplified_localization(): void {
    Assert.Equal("应为标识符。", localize("zh-CN", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  korean_localization(): void {
    Assert.Equal("식별자가 필요합니다.", localize("ko-KR", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  russian_localization(): void {
    Assert.Equal("Ожидался идентификатор.", localize("ru-RU", Identifier_expected, "", [], lookupByKey, localeProvider));
  }

  german_with_argument(): void {
    Assert.Equal("\")\" wurde erwartet.", localize("de-DE", X_0_expected, "", [")"], lookupByKey, localeProvider));
  }
}

export class DiagnosticsLocalizeByKeyTests {
  by_key_without_args(): void {
    Assert.Equal("Identifier expected.", localize("en", undefined, "Identifier_expected_1003", [], lookupByKey, localeProvider));
  }

  by_key_with_args(): void {
    Assert.Equal("')' expected.", localize("en", undefined, "_0_expected_1005", [")"], lookupByKey, localeProvider));
  }
}

A<DiagnosticsCategoryTests>().method((t) => t.category_name_returns_canonical_lowercase_names).add(FactAttribute);
A<DiagnosticsFormatTests>().method((t) => t.format_returns_text_unchanged_when_no_args).add(FactAttribute);
A<DiagnosticsFormatTests>().method((t) => t.format_replaces_single_placeholder).add(FactAttribute);
A<DiagnosticsFormatTests>().method((t) => t.format_replaces_multiple_placeholders).add(FactAttribute);
A<DiagnosticsStringifyArgsTests>().method((t) => t.string_args_pass_through).add(FactAttribute);
A<DiagnosticsStringifyArgsTests>().method((t) => t.non_string_args_get_stringified).add(FactAttribute);
A<DiagnosticsStringifyArgsTests>().method((t) => t.empty_args_return_empty_array).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.english_default_returns_message_text).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.undefined_locale_uses_english).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.with_single_argument).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.with_multiple_arguments).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.unknown_locale_falls_back_to_english).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.german_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.french_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.spanish_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.japanese_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.chinese_simplified_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.korean_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.russian_localization).add(FactAttribute);
A<DiagnosticsLocalizeTests>().method((t) => t.german_with_argument).add(FactAttribute);
A<DiagnosticsLocalizeByKeyTests>().method((t) => t.by_key_without_args).add(FactAttribute);
A<DiagnosticsLocalizeByKeyTests>().method((t) => t.by_key_with_args).add(FactAttribute);
