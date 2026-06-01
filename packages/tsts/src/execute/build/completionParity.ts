/**
 * Build completion parity marker.
 */

export function isBuildComplete(pendingProjects: number, diagnosticCount: number): boolean {
  return pendingProjects === 0 && diagnosticCount === 0;
}
