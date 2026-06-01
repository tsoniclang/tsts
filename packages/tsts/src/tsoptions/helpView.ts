/**
 * Command-line help view model.
 *
 * TS-Go renders a simplified help view by filtering the declaration table by
 * category and `ShowInSimplifiedHelpView`. This module prepares that model in
 * a form that command-line and editor hosts can render consistently.
 */

import type { CommandLineOption } from "./commandLineOption.js";
import { optionDeclarations } from "./declsCompiler.js";
import { defaultOptionValueForHelp } from "./optionDefaults.js";
import { optionCatalogByName, type OptionCategoryName } from "./optionCatalog.js";

export interface HelpOption {
  readonly name: string;
  readonly shortName: string | undefined;
  readonly category: OptionCategoryName;
  readonly valueShape: string;
  readonly defaultValue: unknown;
  readonly isCommandLineOnly: boolean;
  readonly isTSConfigOnly: boolean;
}

export interface HelpCategory {
  readonly category: OptionCategoryName;
  readonly options: readonly HelpOption[];
}

const catalogByName = optionCatalogByName();

export function getHelpOptions(simplified: boolean): readonly HelpOption[] {
  const result: HelpOption[] = [];
  for (const declaration of optionDeclarations) {
    if (simplified && declaration.showInSimplifiedHelpView !== true) continue;
    result.push(helpOptionFromDeclaration(declaration));
  }
  return result;
}

export function groupHelpOptionsByCategory(simplified: boolean): readonly HelpCategory[] {
  const groups = new Map<OptionCategoryName, HelpOption[]>();
  for (const option of getHelpOptions(simplified)) {
    const bucket = groups.get(option.category);
    if (bucket === undefined) {
      groups.set(option.category, [option]);
    } else {
      bucket.push(option);
    }
  }
  return [...groups.entries()].map(([category, options]) => ({ category, options }));
}

function helpOptionFromDeclaration(declaration: CommandLineOption): HelpOption {
  const catalog = catalogByName.get(declaration.name.toLowerCase());
  return {
    name: declaration.name,
    shortName: declaration.shortName,
    category: catalog?.category ?? "uncategorized",
    valueShape: helpValueShape(declaration),
    defaultValue: declaration.defaultValueDescription ?? defaultOptionValueForHelp(declaration.name),
    isCommandLineOnly: declaration.isCommandLineOnly === true,
    isTSConfigOnly: declaration.isTSConfigOnly === true,
  };
}

function helpValueShape(declaration: CommandLineOption): string {
  if (typeof declaration.type === "string") {
    if (declaration.type === "list") {
      const element = declaration.element ?? declaration.elements?.();
      return element === undefined ? "list" : `list<${helpValueShape(element)}>`;
    }
    if (declaration.type === "listOrElement") {
      const element = declaration.element ?? declaration.elements?.();
      return element === undefined ? "listOrElement" : `${helpValueShape(element)} | list<${helpValueShape(element)}>`;
    }
    return declaration.type;
  }
  return [...declaration.type.keys()].join(" | ");
}

export function renderPlainHelp(simplified: boolean): string {
  const lines: string[] = [];
  for (const category of groupHelpOptionsByCategory(simplified)) {
    lines.push(category.category);
    for (const option of category.options) {
      const flag = option.shortName === undefined
        ? `--${option.name}`
        : `--${option.name}, -${option.shortName}`;
      const defaultText = option.defaultValue === undefined ? "" : ` default=${String(option.defaultValue)}`;
      lines.push(`  ${flag} ${option.valueShape}${defaultText}`);
    }
  }
  return lines.join("\n");
}
