/**
 * Tristate enum: True / False / Unknown.
 *
 * Port of TS-Go internal/core/tristate.go. Used pervasively in
 * CompilerOptions where a flag has not been explicitly set.
 */

export type Tristate = 0 | 1 | 2;
export const Tristate: {
  readonly Unknown: Tristate;
  readonly False: Tristate;
  readonly True: Tristate;
} = {
  Unknown: 0,
  False: 1,
  True: 2,
};

export function tristateIsTrue(t: Tristate | undefined): boolean {
  return t === Tristate.True;
}

export function tristateIsTrueOrUnknown(t: Tristate | undefined): boolean {
  return t === undefined || t === Tristate.True || t === Tristate.Unknown;
}

export function tristateIsFalse(t: Tristate | undefined): boolean {
  return t === Tristate.False;
}

export function tristateIsFalseOrUnknown(t: Tristate): boolean {
  return t === Tristate.False || t === Tristate.Unknown;
}

export function tristateIsUnknown(t: Tristate): boolean {
  return t === Tristate.Unknown;
}

export function tristateDefaultIfUnknown(t: Tristate, value: Tristate): Tristate {
  return t === Tristate.Unknown ? value : t;
}

export function boolToTristate(b: boolean): Tristate {
  return b ? Tristate.True : Tristate.False;
}

export function tristateFromJSON(value: unknown): Tristate {
  if (value === true) return Tristate.True;
  if (value === false) return Tristate.False;
  return Tristate.Unknown;
}

export function tristateToJSON(t: Tristate): boolean | null {
  if (t === Tristate.True) return true;
  if (t === Tristate.False) return false;
  return null;
}
