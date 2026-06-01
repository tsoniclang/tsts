export enum NameValidationResult {
  NameOk,
  EmptyName,
  NameTooLong,
  NameStartsWithDot,
  NameStartsWithUnderscore,
  NameContainsNonURISafeCharacters,
}

export interface PackageNameValidation {
  readonly result: NameValidationResult;
  readonly name: string;
  readonly isScopeName: boolean;
}

const maxPackageNameLength = 214;

export function validatePackageName(packageName: string): PackageNameValidation {
  return validatePackageNameWorker(packageName, true);
}

function validatePackageNameWorker(packageName: string, supportScopedPackage: boolean): PackageNameValidation {
  if (packageName.length === 0) return validation(NameValidationResult.EmptyName);
  if (packageName.length > maxPackageNameLength) return validation(NameValidationResult.NameTooLong);

  const firstChar = packageName[0]!;
  if (firstChar === ".") return validation(NameValidationResult.NameStartsWithDot);
  if (firstChar === "_") return validation(NameValidationResult.NameStartsWithUnderscore);

  if (supportScopedPackage && packageName.startsWith("@")) {
    const withoutScope = packageName.slice(1);
    const slashIndex = withoutScope.indexOf("/");
    if (slashIndex > 0 && slashIndex === withoutScope.lastIndexOf("/") && slashIndex < withoutScope.length - 1) {
      const scope = withoutScope.slice(0, slashIndex);
      const scopedPackageName = withoutScope.slice(slashIndex + 1);
      const scopeResult = validatePackageNameWorker(scope, false);
      if (scopeResult.result !== NameValidationResult.NameOk) {
        return { result: scopeResult.result, name: scope, isScopeName: true };
      }
      const packageResult = validatePackageNameWorker(scopedPackageName, false);
      if (packageResult.result !== NameValidationResult.NameOk) {
        return { result: packageResult.result, name: scopedPackageName, isScopeName: false };
      }
      return validation(NameValidationResult.NameOk);
    }
  }

  if (!isGoQueryEscapeIdentity(packageName)) {
    return validation(NameValidationResult.NameContainsNonURISafeCharacters);
  }
  return validation(NameValidationResult.NameOk);
}

function isGoQueryEscapeIdentity(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0x30 && code <= 0x39) continue;
    if (code >= 0x41 && code <= 0x5A) continue;
    if (code >= 0x61 && code <= 0x7A) continue;
    if (value[index] === "-" || value[index] === "_" || value[index] === "." || value[index] === "~") continue;
    return false;
  }
  return true;
}

function validation(result: NameValidationResult): PackageNameValidation {
  return { result, name: "", isScopeName: false };
}

export function renderPackageNameValidationFailure(
  typing: string,
  result: NameValidationResult,
  name: string,
  isScopeName: boolean,
): string {
  const kind = isScopeName ? "Scope" : "Package";
  const reportedName = name === "" ? typing : name;
  switch (result) {
    case NameValidationResult.EmptyName:
      return `'${typing}':: ${kind} name '${reportedName}' cannot be empty`;
    case NameValidationResult.NameTooLong:
      return `'${typing}':: ${kind} name '${reportedName}' should be less than ${maxPackageNameLength} characters`;
    case NameValidationResult.NameStartsWithDot:
      return `'${typing}':: ${kind} name '${reportedName}' cannot start with '.'`;
    case NameValidationResult.NameStartsWithUnderscore:
      return `'${typing}':: ${kind} name '${reportedName}' cannot start with '_'`;
    case NameValidationResult.NameContainsNonURISafeCharacters:
      return `'${typing}':: ${kind} name '${reportedName}' contains non URI safe characters`;
    case NameValidationResult.NameOk:
      throw new Error("Unexpected Ok result");
    default:
      throw new Error("Unknown package name validation result");
  }
}
