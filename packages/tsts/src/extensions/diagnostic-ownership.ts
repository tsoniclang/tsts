import type { ExtensionDiagnostic } from "./host.js";

const hostOwnedDiagnostics = new WeakSet<object>();

export function markHostOwnedExtensionDiagnostic<T extends ExtensionDiagnostic>(diagnostic: T): T {
  hostOwnedDiagnostics.add(diagnostic);
  return diagnostic;
}

export function isHostOwnedExtensionDiagnostic(diagnostic: ExtensionDiagnostic): boolean {
  return hostOwnedDiagnostics.has(diagnostic);
}
