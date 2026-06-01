import {
  Tristate,
  boolToTristate,
  tristateIsTrue,
  type Tristate as TristateValue,
} from "../../core/index.js";
import type { FormattingOptions } from "../../lsp/lsproto/index.js";
import { getDefaultIndentSize } from "../../printer/textWriter.js";

export type IndentStyle = 0 | 1 | 2;
export const IndentStyleNone: IndentStyle = 0;
export const IndentStyleBlock: IndentStyle = 1;
export const IndentStyleSmart: IndentStyle = 2;

export function parseIndentStyle(value: unknown): IndentStyle {
  if (typeof value === "string") {
    const text = value.toLowerCase();
    if (text === "none") return IndentStyleNone;
    if (text === "block") return IndentStyleBlock;
    if (text === "smart") return IndentStyleSmart;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const style = Math.trunc(value);
    if (style === IndentStyleNone || style === IndentStyleBlock || style === IndentStyleSmart) return style;
  }
  return IndentStyleSmart;
}

export type SemicolonPreference = "ignore" | "insert" | "remove";
export const SemicolonPreferenceIgnore: SemicolonPreference = "ignore";
export const SemicolonPreferenceInsert: SemicolonPreference = "insert";
export const SemicolonPreferenceRemove: SemicolonPreference = "remove";

export function parseSemicolonPreference(value: unknown): SemicolonPreference {
  if (typeof value === "string") {
    const text = value.toLowerCase();
    if (text === SemicolonPreferenceIgnore) return SemicolonPreferenceIgnore;
    if (text === SemicolonPreferenceInsert) return SemicolonPreferenceInsert;
    if (text === SemicolonPreferenceRemove) return SemicolonPreferenceRemove;
  }
  return SemicolonPreferenceIgnore;
}

export interface EditorSettings {
  readonly baseIndentSize: number;
  readonly indentSize: number;
  readonly tabSize: number;
  readonly newLineCharacter: string;
  readonly convertTabsToSpaces: TristateValue;
  readonly indentStyle: IndentStyle;
  readonly trimTrailingWhitespace: TristateValue;
}

export interface FormatCodeSettings extends EditorSettings {
  readonly insertSpaceAfterCommaDelimiter: TristateValue;
  readonly insertSpaceAfterSemicolonInForStatements: TristateValue;
  readonly insertSpaceBeforeAndAfterBinaryOperators: TristateValue;
  readonly insertSpaceAfterConstructor: TristateValue;
  readonly insertSpaceAfterKeywordsInControlFlowStatements: TristateValue;
  readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions: TristateValue;
  readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: TristateValue;
  readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: TristateValue;
  readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: TristateValue;
  readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces: TristateValue;
  readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: TristateValue;
  readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: TristateValue;
  readonly insertSpaceAfterTypeAssertion: TristateValue;
  readonly insertSpaceBeforeFunctionParenthesis: TristateValue;
  readonly placeOpenBraceOnNewLineForFunctions: TristateValue;
  readonly placeOpenBraceOnNewLineForControlBlocks: TristateValue;
  readonly insertSpaceBeforeTypeAnnotation: TristateValue;
  readonly indentMultiLineObjectLiteralBeginningOnBlankLine: TristateValue;
  readonly semicolons: SemicolonPreference;
  readonly indentSwitchCase: TristateValue;
}

export function fromLSFormatOptions(settings: FormatCodeSettings, options: FormattingOptions): FormatCodeSettings {
  return {
    ...settings,
    tabSize: options.tabSize,
    indentSize: options.tabSize,
    convertTabsToSpaces: boolToTristate(options.insertSpaces),
    trimTrailingWhitespace: options.trimTrailingWhitespace === undefined
      ? settings.trimTrailingWhitespace
      : boolToTristate(options.trimTrailingWhitespace),
  };
}

export function toLSFormatOptions(settings: FormatCodeSettings): FormattingOptions {
  return {
    tabSize: settings.tabSize,
    insertSpaces: tristateIsTrue(settings.convertTabsToSpaces),
    trimTrailingWhitespace: tristateIsTrue(settings.trimTrailingWhitespace),
  };
}

export function getDefaultFormatCodeSettings(): FormatCodeSettings {
  return {
    baseIndentSize: 0,
    indentSize: getDefaultIndentSize(),
    tabSize: getDefaultIndentSize(),
    newLineCharacter: "\n",
    convertTabsToSpaces: Tristate.True,
    indentStyle: IndentStyleSmart,
    trimTrailingWhitespace: Tristate.True,
    insertSpaceAfterConstructor: Tristate.False,
    insertSpaceAfterCommaDelimiter: Tristate.True,
    insertSpaceAfterSemicolonInForStatements: Tristate.True,
    insertSpaceBeforeAndAfterBinaryOperators: Tristate.True,
    insertSpaceAfterKeywordsInControlFlowStatements: Tristate.True,
    insertSpaceAfterFunctionKeywordForAnonymousFunctions: Tristate.False,
    insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: Tristate.False,
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: Tristate.False,
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: Tristate.True,
    insertSpaceAfterOpeningAndBeforeClosingEmptyBraces: Tristate.Unknown,
    insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: Tristate.False,
    insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: Tristate.False,
    insertSpaceAfterTypeAssertion: Tristate.Unknown,
    insertSpaceBeforeFunctionParenthesis: Tristate.False,
    placeOpenBraceOnNewLineForFunctions: Tristate.False,
    placeOpenBraceOnNewLineForControlBlocks: Tristate.False,
    insertSpaceBeforeTypeAnnotation: Tristate.Unknown,
    indentMultiLineObjectLiteralBeginningOnBlankLine: Tristate.Unknown,
    semicolons: SemicolonPreferenceIgnore,
    indentSwitchCase: Tristate.True,
  };
}
