import { computeTypingsInfo, type TypingsInfo } from "./ata.js";
import { safeFileNameToTypeName } from "./typesMap.js";
import { NameValidationResult, validatePackageName } from "./validatePackageName.js";
import { getBaseFileName, hasJSFileExtension, removeFileExtension, toFileNameLowerCase } from "../../tspath/index.js";

export interface TypingsDiscoveryInput {
  readonly projectRootPath: string;
  readonly imports: readonly string[];
  readonly fileNames?: readonly string[];
  readonly include?: readonly string[];
  readonly exclude?: readonly string[];
  readonly dependencies?: ReadonlyMap<string, string>;
  readonly devDependencies?: ReadonlyMap<string, string>;
  readonly compilerOptions?: object;
}

export function discoverTypings(input: TypingsDiscoveryInput): TypingsInfo {
  const inferredTypings = new Map<string, string>();
  addInferredTypings(inferredTypings, input.include ?? []);
  getTypingNamesFromSourceFileNames(inferredTypings, input.fileNames ?? []);

  for (const moduleName of input.imports) {
    if (moduleName.startsWith(".") || moduleName.startsWith("/")) continue;
    const packageName = packageNameFromModule(moduleName);
    if (validatePackageName(packageName).result !== NameValidationResult.NameOk) continue;
    if (input.dependencies?.has(packageName) === true || input.devDependencies?.has(packageName) === true) continue;
    addInferredTyping(inferredTypings, packageName);
  }

  for (const excludedTypingName of input.exclude ?? []) {
    inferredTypings.delete(excludedTypingName);
  }
  return computeTypingsInfo(input.projectRootPath, [...inferredTypings.keys()], input.compilerOptions);
}

export function packageNameFromModule(moduleName: string): string {
  if (!moduleName.startsWith("@")) return moduleName.split("/")[0] ?? moduleName;
  const parts = moduleName.split("/");
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : moduleName;
}

export function addInferredTyping(inferredTypings: Map<string, string>, typingName: string): void {
  if (!inferredTypings.has(typingName)) inferredTypings.set(typingName, "");
}

export function addInferredTypings(inferredTypings: Map<string, string>, typingNames: readonly string[]): void {
  for (const typingName of typingNames) addInferredTyping(inferredTypings, typingName);
}

export function getTypingNamesFromSourceFileNames(
  inferredTypings: Map<string, string>,
  fileNames: readonly string[],
): void {
  let hasJsxFile = false;
  const fromFileNames: string[] = [];
  for (const fileName of fileNames) {
    if (!hasJSFileExtension(fileName)) continue;
    hasJsxFile = hasJsxFile || fileName.toLowerCase().endsWith(".jsx");
    const inferredTypingName = removeFileExtension(toFileNameLowerCase(getBaseFileName(fileName)));
    const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
    const typeName = safeFileNameToTypeName.get(cleanedTypingName);
    if (typeName !== undefined) fromFileNames.push(typeName);
  }
  addInferredTypings(inferredTypings, fromFileNames);
  if (hasJsxFile) addInferredTyping(inferredTypings, "react");
}

export function removeMinAndVersionNumbers(fileName: string): string {
  let end = fileName.length;
  for (let position = end; position > 0;) {
    let char = fileName[position - 1]!;
    if (isAsciiDigit(char)) {
      do {
        position -= 1;
        char = position > 0 ? fileName[position - 1]! : "";
      } while (position > 0 && isAsciiDigit(char));
    } else if (position > 3 && (char === "n" || char === "N")) {
      position -= 1;
      char = fileName[position - 1]!;
      if (char !== "i" && char !== "I") break;
      position -= 1;
      char = fileName[position - 1]!;
      if (char !== "m" && char !== "M") break;
      position -= 1;
      char = position > 0 ? fileName[position - 1]! : "";
    } else {
      break;
    }

    if (char !== "-" && char !== ".") break;
    position -= 1;
    end = position;
  }
  return fileName.slice(0, end);
}

function isAsciiDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}
