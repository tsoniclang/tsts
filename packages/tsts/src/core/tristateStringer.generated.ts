/**
 * Stringer helpers for Tristate.
 *
 * Port of TS-Go `internal/core/tristate_stringer_generated.go`.
 */

import { Tristate, type Tristate as TristateValue, tristateToString } from "./tristate.js";

export function tristateString(value: TristateValue): string {
  return tristateToString(value);
}

export function isKnownTristate(value: TristateValue): boolean {
  return value === Tristate.Unknown || value === Tristate.False || value === Tristate.True;
}
