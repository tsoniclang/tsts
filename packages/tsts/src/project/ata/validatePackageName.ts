export interface PackageNameValidationResult {
  readonly valid: boolean;
  readonly reason?: string;
}

const packageNamePattern = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i;

export function validatePackageName(packageName: string): PackageNameValidationResult {
  if (packageName.length === 0) return { valid: false, reason: "Package name is empty" };
  if (packageName.includes("\\")) return { valid: false, reason: "Package name cannot contain backslashes" };
  if (packageName.includes("..")) return { valid: false, reason: "Package name cannot contain parent-directory segments" };
  if (packageName.startsWith(".") || packageName.startsWith("/")) return { valid: false, reason: "Package name cannot be relative or absolute" };
  if (!packageNamePattern.test(packageName)) return { valid: false, reason: "Package name contains invalid characters" };
  return { valid: true };
}
