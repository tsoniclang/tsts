/**
 * CheckMode flags.
 *
 * Ported from Strada `checker.go` — CheckMode is a bitset that
 * threads through the checkExpression family controlling how nested
 * calls handle contextual typing, inference, and signature
 * resolution.
 */

export type CheckMode = number;
export const CheckMode = {
  Normal: 0,
  Contextual: 1 << 0,
  Inferential: 1 << 1,
  SkipContextSensitive: 1 << 2,
  SkipGenericFunctions: 1 << 3,
  IsForSignatureHelp: 1 << 4,
  RestBindingElement: 1 << 5,
  TypeOnly: 1 << 6,
} as const;

export function hasMode(mode: CheckMode, flag: number): boolean {
  return (mode & flag) !== 0;
}

export function withMode(mode: CheckMode, flag: number): CheckMode {
  return mode | flag;
}

export function withoutMode(mode: CheckMode, flag: number): CheckMode {
  return mode & ~flag;
}

/**
 * Strips inference-specific flags when entering a non-inferential
 * sub-expression.
 */
export function stripInferenceModes(mode: CheckMode): CheckMode {
  return mode & ~(CheckMode.Inferential | CheckMode.SkipContextSensitive | CheckMode.SkipGenericFunctions);
}
