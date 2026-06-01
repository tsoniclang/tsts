/**
 * Generated-name parity helpers.
 */

export interface GeneratedNameSet {
  readonly reserved: Set<string>;
  readonly counters: Map<string, number>;
}

export function createGeneratedNameSet(reserved: readonly string[] = []): GeneratedNameSet {
  return { reserved: new Set(reserved), counters: new Map() };
}

export function generateName(set: GeneratedNameSet, baseName: string): string {
  const base = sanitizeName(baseName);
  let counter = set.counters.get(base) ?? 0;
  let candidate = counter === 0 ? base : `${base}_${counter}`;
  while (set.reserved.has(candidate)) {
    counter += 1;
    candidate = `${base}_${counter}`;
  }
  set.counters.set(base, counter + 1);
  set.reserved.add(candidate);
  return candidate;
}

export function reserveGeneratedName(set: GeneratedNameSet, name: string): void {
  set.reserved.add(name);
}

function sanitizeName(name: string): string {
  const sanitized = name.replace(/[^$_0-9A-Za-z]/g, "_");
  return /^[$_A-Za-z]/.test(sanitized) ? sanitized : `_${sanitized}`;
}
