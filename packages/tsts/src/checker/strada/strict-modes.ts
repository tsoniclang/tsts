/**
 * Strict-mode option helpers.
 *
 * Ported from Strada `checker.go` — getStrictOptionValue, isStrictMode,
 * getDefaultLibLocation. Reads compiler options to decide which
 * stricter checks are active.
 */

export interface StrictOptions {
  readonly strict?: boolean | undefined;
  readonly strictNullChecks?: boolean | undefined;
  readonly strictFunctionTypes?: boolean | undefined;
  readonly strictBindCallApply?: boolean | undefined;
  readonly strictPropertyInitialization?: boolean | undefined;
  readonly noImplicitAny?: boolean | undefined;
  readonly noImplicitThis?: boolean | undefined;
  readonly noImplicitReturns?: boolean | undefined;
  readonly alwaysStrict?: boolean | undefined;
  readonly useUnknownInCatchVariables?: boolean | undefined;
  readonly exactOptionalPropertyTypes?: boolean | undefined;
}

/**
 * Returns true when the named sub-strict option is effectively
 * enabled — explicitly true, or `strict: true` and no explicit false.
 */
export function isStrictOptionEnabled(
  options: StrictOptions,
  optionName: keyof StrictOptions,
): boolean {
  const explicit = options[optionName];
  if (explicit === true) return true;
  if (explicit === false) return false;
  return options.strict === true;
}

/**
 * Returns true when strict null checks are active.
 */
export function isStrictNullChecks(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "strictNullChecks");
}

/**
 * Returns true when strict function types are active.
 */
export function isStrictFunctionTypes(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "strictFunctionTypes");
}

/**
 * Returns true when noImplicitAny is active.
 */
export function isNoImplicitAny(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "noImplicitAny");
}

/**
 * Returns true when noImplicitThis is active.
 */
export function isNoImplicitThis(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "noImplicitThis");
}

/**
 * Returns true when strictPropertyInitialization is active.
 */
export function isStrictPropertyInitialization(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "strictPropertyInitialization");
}

/**
 * Returns true when alwaysStrict is active.
 */
export function isAlwaysStrict(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "alwaysStrict");
}

/**
 * Returns true when useUnknownInCatchVariables is active.
 */
export function isUseUnknownInCatchVariables(options: StrictOptions): boolean {
  return isStrictOptionEnabled(options, "useUnknownInCatchVariables");
}

/**
 * Returns the count of active strict-mode sub-options.
 */
export function countActiveStrictOptions(options: StrictOptions): number {
  const keys: readonly (keyof StrictOptions)[] = [
    "strictNullChecks", "strictFunctionTypes", "strictBindCallApply",
    "strictPropertyInitialization", "noImplicitAny", "noImplicitThis",
    "alwaysStrict", "useUnknownInCatchVariables",
  ];
  return keys.filter((k) => isStrictOptionEnabled(options, k)).length;
}
