import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Tristate } from "../../core/index.js";
import {
  IndentStyleBlock,
  IndentStyleNone,
  IndentStyleSmart,
  SemicolonPreferenceIgnore,
  SemicolonPreferenceInsert,
  SemicolonPreferenceRemove,
  fromLSFormatOptions,
  getDefaultFormatCodeSettings,
  parseIndentStyle,
  parseSemicolonPreference,
  toLSFormatOptions,
} from "./formatCodeOptions.js";

export class FormatCodeOptionsTests {
  parses_indent_style_like_ts_go(): void {
    Assert.Equal(IndentStyleNone, parseIndentStyle("none"));
    Assert.Equal(IndentStyleBlock, parseIndentStyle("BLOCK"));
    Assert.Equal(IndentStyleSmart, parseIndentStyle("smart"));
    Assert.Equal(IndentStyleBlock, parseIndentStyle(1.9));
    Assert.Equal(IndentStyleSmart, parseIndentStyle("unexpected"));
  }

  parses_semicolon_preference_like_ts_go(): void {
    Assert.Equal(SemicolonPreferenceIgnore, parseSemicolonPreference("IGNORE"));
    Assert.Equal(SemicolonPreferenceInsert, parseSemicolonPreference("insert"));
    Assert.Equal(SemicolonPreferenceRemove, parseSemicolonPreference("remove"));
    Assert.Equal(SemicolonPreferenceIgnore, parseSemicolonPreference(false));
  }

  exposes_ts_go_default_format_settings(): void {
    const settings = getDefaultFormatCodeSettings();

    Assert.Equal(4, settings.indentSize);
    Assert.Equal(4, settings.tabSize);
    Assert.Equal("\n", settings.newLineCharacter);
    Assert.Equal(Tristate.True, settings.convertTabsToSpaces);
    Assert.Equal(IndentStyleSmart, settings.indentStyle);
    Assert.Equal(SemicolonPreferenceIgnore, settings.semicolons);
    Assert.Equal(Tristate.False, settings.insertSpaceAfterConstructor);
    Assert.Equal(Tristate.True, settings.insertSpaceAfterCommaDelimiter);
    Assert.Equal(Tristate.True, settings.indentSwitchCase);
  }

  applies_lsp_formatting_options_to_settings_copy(): void {
    const defaults = getDefaultFormatCodeSettings();
    const updated = fromLSFormatOptions(defaults, {
      tabSize: 2,
      insertSpaces: false,
      trimTrailingWhitespace: false,
    });

    Assert.Equal(4, defaults.tabSize);
    Assert.Equal(2, updated.tabSize);
    Assert.Equal(2, updated.indentSize);
    Assert.Equal(Tristate.False, updated.convertTabsToSpaces);
    Assert.Equal(Tristate.False, updated.trimTrailingWhitespace);
  }

  preserves_existing_trim_preference_when_lsp_option_is_absent(): void {
    const defaults = getDefaultFormatCodeSettings();
    const updated = fromLSFormatOptions(defaults, {
      tabSize: 8,
      insertSpaces: true,
    });

    Assert.Equal(Tristate.True, updated.trimTrailingWhitespace);
  }

  converts_settings_back_to_lsp_formatting_options(): void {
    const options = toLSFormatOptions({
      ...getDefaultFormatCodeSettings(),
      tabSize: 3,
      convertTabsToSpaces: Tristate.False,
      trimTrailingWhitespace: Tristate.True,
    });

    Assert.Equal(3, options.tabSize);
    Assert.False(options.insertSpaces);
    Assert.True(options.trimTrailingWhitespace!);
  }
}

A<FormatCodeOptionsTests>().method((t) => t.parses_indent_style_like_ts_go).add(FactAttribute);
A<FormatCodeOptionsTests>().method((t) => t.parses_semicolon_preference_like_ts_go).add(FactAttribute);
A<FormatCodeOptionsTests>().method((t) => t.exposes_ts_go_default_format_settings).add(FactAttribute);
A<FormatCodeOptionsTests>().method((t) => t.applies_lsp_formatting_options_to_settings_copy).add(FactAttribute);
A<FormatCodeOptionsTests>().method((t) => t.preserves_existing_trim_preference_when_lsp_option_is_absent).add(FactAttribute);
A<FormatCodeOptionsTests>().method((t) => t.converts_settings_back_to_lsp_formatting_options).add(FactAttribute);
