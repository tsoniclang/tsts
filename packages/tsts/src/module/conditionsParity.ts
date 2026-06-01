/**
 * Module condition-set parity helpers.
 */

export interface ConditionSet {
  readonly values: readonly string[];
}

export function createConditionSet(values: readonly string[]): ConditionSet {
  return { values: [...new Set(values)].sort() };
}

export function conditionSetIncludes(set: ConditionSet, condition: string): boolean {
  return set.values.includes(condition);
}

export function mergeConditionSets(left: ConditionSet, right: ConditionSet): ConditionSet {
  return createConditionSet([...left.values, ...right.values]);
}

export function conditionPriority(condition: string): number {
  if (condition === "types") return 100;
  if (condition === "import") return 90;
  if (condition === "require") return 80;
  if (condition === "node") return 70;
  if (condition === "default") return 0;
  return 50;
}

export function orderConditionsForLookup(set: ConditionSet): readonly string[] {
  return [...set.values].sort((left, right) => conditionPriority(right) - conditionPriority(left) || left.localeCompare(right));
}
