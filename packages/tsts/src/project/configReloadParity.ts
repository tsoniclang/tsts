/**
 * Config reload parity helpers.
 */

export interface ConfigReloadInput {
  readonly configPath: string;
  readonly oldFiles: readonly string[];
  readonly newFiles: readonly string[];
}

export interface ConfigReloadResult {
  readonly added: readonly string[];
  readonly removed: readonly string[];
  readonly unchanged: readonly string[];
}

export function computeConfigReload(input: ConfigReloadInput): ConfigReloadResult {
  const oldSet = new Set(input.oldFiles);
  const newSet = new Set(input.newFiles);
  return {
    added: input.newFiles.filter(file => !oldSet.has(file)).sort(),
    removed: input.oldFiles.filter(file => !newSet.has(file)).sort(),
    unchanged: input.newFiles.filter(file => oldSet.has(file)).sort(),
  };
}

export function configReloadAffectsProgram(result: ConfigReloadResult): boolean {
  return result.added.length > 0 || result.removed.length > 0;
}

export function configReloadSummary(input: ConfigReloadInput): string {
  const result = computeConfigReload(input);
  return `${input.configPath}: +${result.added.length} -${result.removed.length} =${result.unchanged.length}`;
}
