import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  createNodeArray,
  createSourceFile,
  createStringLiteral,
  createToken,
  type EndOfFile,
  type NodeArray,
  type Path,
  type SourceFile,
  type Statement,
  type StringLiteral,
} from "../../ast/index.js";
import { Tristate } from "../../core/index.js";
import { TokenFlags } from "../../scanner/tokenFlags.js";
import {
  getQuotePreference,
  isNonContextualKeyword,
  moduleSpecifierToValidIdentifier,
  moduleSymbolToValidIdentifier,
  probablyUsesSemicolons,
  quotePreferenceFromString,
  shouldUseUriStyleNodeCoreModules,
} from "./utilities.js";

function sourceFile(imports: readonly StringLiteral[] = []): SourceFile {
  const file = createSourceFile(
    "input.ts",
    "input.ts" as Path,
    "",
    createNodeArray([]) as NodeArray<Statement>,
    createToken(Kind.EndOfFile) as EndOfFile,
    [],
    0,
    0,
  );
  return {
    ...file,
    imports,
    forEachChild: () => undefined,
  };
}

function moduleSpecifier(text: string, flags = TokenFlags.None): StringLiteral {
  return createStringLiteral(text, flags);
}

export class LsUtilUtilitiesTests {
  defaults_to_semicolons_when_file_has_no_evidence(): void {
    Assert.True(probablyUsesSemicolons(sourceFile()));
  }

  detects_uri_style_node_core_module_imports(): void {
    const result = shouldUseUriStyleNodeCoreModules(sourceFile([moduleSpecifier("node:fs")]), {
      usesUriStyleNodeCoreModules: () => Tristate.False,
    });

    Assert.Equal(Tristate.True, result);
  }

  detects_non_uri_style_node_core_module_imports(): void {
    const result = shouldUseUriStyleNodeCoreModules(sourceFile([moduleSpecifier("fs")]), {
      usesUriStyleNodeCoreModules: () => Tristate.True,
    });

    Assert.Equal(Tristate.False, result);
  }

  falls_back_to_program_uri_style_when_file_has_no_node_core_import(): void {
    const result = shouldUseUriStyleNodeCoreModules(sourceFile([moduleSpecifier("not-core")]), {
      usesUriStyleNodeCoreModules: () => Tristate.Unknown,
    });

    Assert.Equal(Tristate.Unknown, result);
  }

  reads_quote_preference_from_string_literal_flags_and_user_preferences(): void {
    Assert.Equal("single", quotePreferenceFromString(moduleSpecifier("pkg", TokenFlags.SingleQuote)));
    Assert.Equal("double", quotePreferenceFromString(moduleSpecifier("pkg")));
    Assert.Equal("single", getQuotePreference(sourceFile(), { quotePreference: "single" }));
    Assert.Equal("double", getQuotePreference(sourceFile([moduleSpecifier("pkg", TokenFlags.SingleQuote)]), { quotePreference: "double" }));
    Assert.Equal("single", getQuotePreference(sourceFile([moduleSpecifier("pkg", TokenFlags.SingleQuote)]), { quotePreference: "auto" }));
  }

  converts_module_specifiers_to_valid_identifiers(): void {
    Assert.Equal("fooBar", moduleSpecifierToValidIdentifier("@scope/foo-bar/index.ts", false));
    Assert.Equal("FooBar", moduleSpecifierToValidIdentifier("@scope/foo-bar/index.ts", true));
    Assert.Equal("_class", moduleSpecifierToValidIdentifier("class.ts", false));
    Assert.Equal("Patch", moduleSpecifierToValidIdentifier("9-patch.ts", false));
    Assert.Equal("fooBar", moduleSymbolToValidIdentifier({ name: "\"foo-bar\"", declarations: [] }, false));
  }

  distinguishes_non_contextual_keywords_from_contextual_keywords(): void {
    Assert.True(isNonContextualKeyword(Kind.ClassKeyword));
    Assert.False(isNonContextualKeyword(Kind.AsKeyword));
    Assert.False(isNonContextualKeyword(undefined));
  }
}

A<LsUtilUtilitiesTests>().method((t) => t.defaults_to_semicolons_when_file_has_no_evidence).add(FactAttribute);
A<LsUtilUtilitiesTests>().method((t) => t.detects_uri_style_node_core_module_imports).add(FactAttribute);
A<LsUtilUtilitiesTests>().method((t) => t.detects_non_uri_style_node_core_module_imports).add(FactAttribute);
A<LsUtilUtilitiesTests>().method((t) => t.falls_back_to_program_uri_style_when_file_has_no_node_core_import).add(FactAttribute);
A<LsUtilUtilitiesTests>().method((t) => t.reads_quote_preference_from_string_literal_flags_and_user_preferences).add(FactAttribute);
A<LsUtilUtilitiesTests>().method((t) => t.converts_module_specifiers_to_valid_identifiers).add(FactAttribute);
A<LsUtilUtilitiesTests>().method((t) => t.distinguishes_non_contextual_keywords_from_contextual_keywords).add(FactAttribute);
