/**
 * Compiler-option effect classification.
 *
 * TS-Go marks each option with the compiler caches it invalidates:
 * program structure, module resolution, source-file parse state, bind
 * diagnostics, semantic diagnostics, emit, declaration path, and build-info.
 * This module exposes those classifications as reusable predicates so project,
 * builder, watch, and language-service code do not open-code option-name sets.
 */

import { optionCatalog, type OptionCatalogEntry } from "./optionCatalog.js";

export type OptionEffect =
  | "programStructure"
  | "moduleResolution"
  | "sourceFile"
  | "bindDiagnostics"
  | "semanticDiagnostics"
  | "emit"
  | "declarationPath"
  | "buildInfo";

export interface OptionEffectEntry {
  readonly option: string;
  readonly effects: readonly OptionEffect[];
}

const optionEffectEntries: readonly OptionEffectEntry[] = optionCatalog.map((entry) => ({
  option: entry.name,
  effects: effectsOfCatalogEntry(entry),
}));

function effectsOfCatalogEntry(entry: OptionCatalogEntry): readonly OptionEffect[] {
  const effects: OptionEffect[] = [];
  if (entry.affectsProgramStructure) effects.push("programStructure");
  if (entry.affectsModuleResolution) effects.push("moduleResolution");
  if (entry.affectsSourceFile) effects.push("sourceFile");
  if (entry.affectsBindDiagnostics) effects.push("bindDiagnostics");
  if (entry.affectsSemanticDiagnostics) effects.push("semanticDiagnostics");
  if (entry.affectsEmit) effects.push("emit");
  if (entry.affectsDeclarationPath) effects.push("declarationPath");
  if (entry.affectsBuildInfo) effects.push("buildInfo");
  return effects;
}

export const optionEffects: ReadonlyMap<string, readonly OptionEffect[]> = new Map(
  optionEffectEntries.map((entry) => [entry.option.toLowerCase(), entry.effects]),
);

export function effectsOfOption(optionName: string): readonly OptionEffect[] {
  return optionEffects.get(optionName.toLowerCase()) ?? [];
}

export function optionHasEffect(optionName: string, effect: OptionEffect): boolean {
  return effectsOfOption(optionName).includes(effect);
}

export function optionsWithEffect(effect: OptionEffect): readonly string[] {
  return optionEffectEntries
    .filter((entry) => entry.effects.includes(effect))
    .map((entry) => entry.option);
}

export function optionChangeRequiresProgramRebuild(optionName: string): boolean {
  const effects = effectsOfOption(optionName);
  return effects.includes("programStructure") ||
    effects.includes("moduleResolution") ||
    effects.includes("sourceFile");
}

export function optionChangeRequiresBindDiagnostics(optionName: string): boolean {
  const effects = effectsOfOption(optionName);
  return effects.includes("bindDiagnostics") ||
    effects.includes("programStructure") ||
    effects.includes("sourceFile");
}

export function optionChangeRequiresSemanticDiagnostics(optionName: string): boolean {
  const effects = effectsOfOption(optionName);
  return effects.includes("semanticDiagnostics") ||
    effects.includes("bindDiagnostics") ||
    effects.includes("programStructure");
}

export function optionChangeRequiresEmit(optionName: string): boolean {
  const effects = effectsOfOption(optionName);
  return effects.includes("emit") ||
    effects.includes("declarationPath") ||
    effects.includes("programStructure") ||
    effects.includes("sourceFile");
}

export function optionChangeRequiresBuildInfo(optionName: string): boolean {
  return effectsOfOption(optionName).includes("buildInfo") ||
    optionChangeRequiresProgramRebuild(optionName) ||
    optionChangeRequiresEmit(optionName);
}

export function collectChangedOptionEffects(
  oldOptions: Readonly<Record<string, unknown>>,
  newOptions: Readonly<Record<string, unknown>>,
): readonly OptionEffect[] {
  const changed = new Set<string>();
  for (const key of Object.keys(oldOptions)) {
    if (!Object.is(oldOptions[key], newOptions[key])) changed.add(key);
  }
  for (const key of Object.keys(newOptions)) {
    if (!Object.is(oldOptions[key], newOptions[key])) changed.add(key);
  }
  const effects = new Set<OptionEffect>();
  for (const option of changed) {
    for (const effect of effectsOfOption(option)) effects.add(effect);
  }
  return [...effects];
}

export function summarizeOptionInvalidation(
  oldOptions: Readonly<Record<string, unknown>>,
  newOptions: Readonly<Record<string, unknown>>,
): {
  readonly changedOptions: readonly string[];
  readonly effects: readonly OptionEffect[];
  readonly requiresProgramRebuild: boolean;
  readonly requiresBindDiagnostics: boolean;
  readonly requiresSemanticDiagnostics: boolean;
  readonly requiresEmit: boolean;
  readonly requiresBuildInfo: boolean;
} {
  const changedOptions = sortedChangedOptionNames(oldOptions, newOptions);
  const effects = collectChangedOptionEffects(oldOptions, newOptions);
  return {
    changedOptions,
    effects,
    requiresProgramRebuild: changedOptions.some(optionChangeRequiresProgramRebuild),
    requiresBindDiagnostics: changedOptions.some(optionChangeRequiresBindDiagnostics),
    requiresSemanticDiagnostics: changedOptions.some(optionChangeRequiresSemanticDiagnostics),
    requiresEmit: changedOptions.some(optionChangeRequiresEmit),
    requiresBuildInfo: changedOptions.some(optionChangeRequiresBuildInfo),
  };
}

function sortedChangedOptionNames(
  oldOptions: Readonly<Record<string, unknown>>,
  newOptions: Readonly<Record<string, unknown>>,
): readonly string[] {
  const names = new Set<string>();
  for (const key of Object.keys(oldOptions)) {
    if (!Object.is(oldOptions[key], newOptions[key])) names.add(key);
  }
  for (const key of Object.keys(newOptions)) {
    if (!Object.is(oldOptions[key], newOptions[key])) names.add(key);
  }
  return [...names].sort();
}
