/**
 * @types-acquisition options.
 *
 * Port of TS-Go `internal/core/typeacquisition.go` (24 LoC).
 */

import type { Tristate } from "./tristate.js";

export interface TypeAcquisition {
  enable?: Tristate;
  include?: readonly string[];
  exclude?: readonly string[];
  disableFilenameBasedTypeAcquisition?: Tristate;
}

export function typeAcquisitionEquals(a: TypeAcquisition | undefined, b: TypeAcquisition | undefined): boolean {
  if (a === b) return true;
  if (a === undefined || b === undefined) return false;
  if (a.enable !== b.enable) return false;
  if (a.disableFilenameBasedTypeAcquisition !== b.disableFilenameBasedTypeAcquisition) return false;
  return stringArraysEqual(a.include, b.include) && stringArraysEqual(a.exclude, b.exclude);
}

function stringArraysEqual(a: readonly string[] | undefined, b: readonly string[] | undefined): boolean {
  const al = a?.length ?? 0;
  const bl = b?.length ?? 0;
  if (al !== bl) return false;
  for (let i = 0; i < al; i++) {
    if (a![i] !== b![i]) return false;
  }
  return true;
}
