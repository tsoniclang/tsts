/**
 * Harness configuration parity helpers.
 */

export interface HarnessConfiguration {
  readonly name: string;
  readonly options: ReadonlyMap<string, string>;
}

export function expandHarnessConfigurations(raw: ReadonlyMap<string, string>, varyBy: ReadonlySet<string>): readonly HarnessConfiguration[] {
  const variableEntries = [...raw].filter(([key, value]) => varyBy.has(key.toLowerCase()) && value.includes(","));
  if (variableEntries.length === 0) return [{ name: "", options: raw }];
  const results: HarnessConfiguration[] = [];
  const visit = (index: number, selected: Map<string, string>, nameParts: string[]): void => {
    if (index === variableEntries.length) {
      const options = new Map(raw);
      for (const [key, value] of selected) options.set(key, value);
      results.push({ name: nameParts.join(", "), options });
      return;
    }
    const [key, value] = variableEntries[index]!;
    for (const part of value.split(",").map(item => item.trim()).filter(item => item.length > 0)) {
      selected.set(key, part);
      visit(index + 1, selected, [...nameParts, `${key}=${part}`]);
    }
    selected.delete(key);
  };
  visit(0, new Map(), []);
  return results;
}

export function configurationName(options: ReadonlyMap<string, string>, keys: readonly string[]): string {
  return keys.map(key => `${key}=${options.get(key) ?? ""}`).join(", ");
}
