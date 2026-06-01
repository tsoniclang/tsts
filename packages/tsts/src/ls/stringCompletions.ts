import { isStringLiteralLike, Kind, type Node, type SourceFile, type Symbol } from "../ast/index.js";
import { TypeFlags, literalValue, type Type } from "../checker/types.js";
import { ModuleResolutionKind, Tristate, newTextRange, type CompilerOptions, type ResolutionMode, type TextRange } from "../core/index.js";
import type { CompletionItem, CompletionList, Range } from "../lsp/lsproto/index.js";
import { CompletionItemKindText } from "../lsp/lsproto/index.js";
import { isApplicableVersionedTypesKey } from "../module/util.js";
import { JSONValueType, asObject, asString, type JSONValue } from "../packagejson/jsonValue.js";
import { getStartOfNode } from "../astnav/index.js";
import {
  CompletionKind,
  KeywordCompletionFilters,
  SortTextLocationPriority,
  completionInfoFromData,
  getCompletionsSymbolKind,
  getDefaultCommitCharacters,
  type CompletionDataData,
  type CompletionInfoHost,
} from "./completions.js";
import {
  ScriptElementKindDirectory,
  ScriptElementKindExternalModuleName,
  ScriptElementKindScriptElement,
  ScriptElementKindModifierCjs,
  ScriptElementKindModifierCts,
  ScriptElementKindModifierDcts,
  ScriptElementKindModifierDmts,
  ScriptElementKindModifierDts,
  ScriptElementKindModifierJs,
  ScriptElementKindModifierJson,
  ScriptElementKindModifierJsx,
  ScriptElementKindModifierMjs,
  ScriptElementKindModifierMts,
  ScriptElementKindModifierNone,
  ScriptElementKindModifierTs,
  ScriptElementKindModifierTsx,
  type ScriptElementKind,
  type ScriptElementKindModifier,
} from "./lsutil/index.js";
import {
  combinePaths,
  containsPath,
  directorySeparator,
  ensureTrailingDirectorySeparator,
  extensionCjs,
  extensionCts,
  extensionDcts,
  extensionDmts,
  extensionDts,
  extensionJs,
  extensionJson,
  extensionJsx,
  extensionMjs,
  extensionMts,
  extensionTs,
  extensionTsBuildInfo,
  extensionTsx,
  getAnyExtensionFromPath,
  getCanonicalFileName,
  getDirectoryPath,
  getRelativePathFromDirectory,
  hasTrailingDirectorySeparator,
  isRootedDiskPath,
  normalizePath,
  removeTrailingDirectorySeparator,
  resolvePath,
  supportedJSExtensionsFlat,
  supportedTSExtensionsFlat,
  tryGetExtensionFromPath,
} from "../tspath/index.js";
import { stripQuotes } from "../stringutil/index.js";
import { isInString } from "./utilities.js";

export interface CompletionsFromTypes {
  readonly types: readonly unknown[];
  readonly isNewIdentifier: boolean;
}

export interface CompletionsFromProperties {
  readonly symbols: readonly unknown[];
  readonly hasIndexSignature: boolean;
}

export interface PathCompletion {
  readonly name: string;
  readonly kind: ScriptElementKind;
  readonly extension: string;
  readonly textRange?: TextRange;
}

export interface StringLiteralCompletions {
  readonly fromTypes?: CompletionsFromTypes;
  readonly fromProperties?: CompletionsFromProperties;
  readonly fromPaths?: readonly PathCompletion[];
}

export enum ModuleCompletionKind {
  Directory = 0,
  File = 1,
  ExternalModuleName = 2,
}

export interface ModuleCompletionNameAndKind {
  readonly name: string;
  readonly kind: ModuleCompletionKind;
  readonly extension: string;
}

export class ModuleCompletionNameAndKindSet {
  readonly names = new Map<string, ModuleCompletionNameAndKind>();

  add(entry: ModuleCompletionNameAndKind): void {
    const existing = this.names.get(entry.name);
    if (existing === undefined || existing.kind < entry.kind) {
      this.names.set(entry.name, entry);
    }
  }

  values(): readonly ModuleCompletionNameAndKind[] {
    return [...this.names.values()];
  }
}

export interface ExtensionOptions {
  readonly extensionsToSearch: readonly string[];
  readonly referenceKind: ReferenceKind;
  readonly importingSourceFile?: unknown;
  readonly endingPreference?: unknown;
  readonly resolutionMode?: unknown;
}

export interface StringCompletionUserPreferences {
  readonly importModuleSpecifierEnding?: unknown;
}

export interface StringCompletionAmbientModule {
  readonly name: string;
}

export interface StringCompletionChecker {
  getAmbientModules?(): readonly StringCompletionAmbientModule[];
  getBaseConstraintOfType?(type: Type): Type | undefined;
  getStringIndexType?(type: Type): Type | undefined;
  getNumberIndexType?(type: Type): Type | undefined;
  getContextualType?(node: Node, flags: StringCompletionContextFlags): Type | undefined;
  getTypeAtLocation?(node: Node): Type | undefined;
  getTypeFromTypeNode?(node: Node): Type | undefined;
  getTypeArgumentConstraint?(node: Node): Type | undefined;
  getConstraintOfTypeArgumentProperty?(node: Node): Type | undefined;
  getApparentProperties?(type: Type): readonly Symbol[];
  getPropertiesForCompletion?(type: Type): readonly Symbol[];
  getPropertiesForObjectExpression?(contextualType: Type, completionsType: Type | undefined, objectLiteralExpression: Node): readonly Symbol[];
  getPropertyOfType?(type: Type, propertyName: string): Symbol | undefined;
  getSymbolAtLocation?(node: Node): Symbol | undefined;
  getExportsAndPropertiesOfModule?(symbol: Symbol): readonly Symbol[];
  getCandidateSignaturesForStringLiteralCompletions?(invocation: unknown, editingArgument: Node): readonly unknown[];
  getTypeOfParameterAtPosition?(signature: unknown, argumentIndex: number): Type | undefined;
}

export enum ReferenceKind {
  FileName = 0,
  ModuleSpecifier = 1,
}

export enum StringCompletionContextFlags {
  None = 0,
  IgnoreNodeInferences = 1 << 0,
}

export interface StringCompletionArgumentInfo {
  readonly invocation: unknown;
  readonly argumentIndex: number;
}

export interface StringCompletionProgram {
  options?(): CompilerOptions;
  getModeForUsageLocation?(file: SourceFile, node: Node): ResolutionMode;
}

export interface StringLiteralCompletionService extends CompletionInfoHost {
  getProgram?(): StringCompletionProgram | undefined;
  getTripleSlashReferenceCompletions?(
    file: SourceFile,
    position: number,
    program: StringCompletionProgram | undefined,
    checker: StringCompletionChecker,
  ): readonly PathCompletion[];
  getStringLiteralCompletionsFromModuleNamesWorker?(
    file: SourceFile,
    node: Node,
    program: StringCompletionProgram | undefined,
    checker: StringCompletionChecker,
  ): readonly ModuleCompletionNameAndKind[];
  getArgumentInfoForCompletions?(
    node: Node,
    position: number,
    file: SourceFile,
    checker: StringCompletionChecker,
  ): StringCompletionArgumentInfo | undefined;
  createRangeFromStringLiteralLikeContent?(file: SourceFile, node: Node, position: number): Range | undefined;
}

export function getStringLiteralCompletions(
  service: StringLiteralCompletionService,
  file: SourceFile,
  position: number,
  contextToken: Node | undefined,
  checker: StringCompletionChecker,
  compilerOptions: CompilerOptions,
): CompletionList | undefined {
  if (isInReferenceComment(file, position)) {
    const entries = service.getTripleSlashReferenceCompletions?.(file, position, service.getProgram?.(), checker) ?? [];
    return convertPathCompletions(entries, file, position);
  }
  if (!isInString(file, position, contextToken)) return undefined;
  if (contextToken === undefined || !isStringLiteralLike(contextToken)) return undefined;
  const entries = getStringLiteralCompletionEntries(service, file, contextToken, position, checker);
  return convertStringLiteralCompletions(service, entries, contextToken, file, position, checker, compilerOptions);
}

export function convertStringLiteralCompletions(
  service: StringLiteralCompletionService,
  completion: StringLiteralCompletions | undefined,
  contextToken: Node,
  file: SourceFile,
  position: number,
  _checker: StringCompletionChecker,
  _options: CompilerOptions,
): CompletionList | undefined {
  if (completion === undefined) return undefined;

  const optionalReplacementRange = service.createRangeFromStringLiteralLikeContent?.(file, contextToken, position)
    ?? createRangeFromStringLiteralLikeContent(file, contextToken);
  if (completion.fromPaths !== undefined) {
    return convertPathCompletions(completion.fromPaths, file, position);
  }
  if (completion.fromProperties !== undefined) {
    const data = stringCompletionDataForProperties(completion.fromProperties, file, contextToken);
    return completionInfoFromData(service, file, data, position, optionalReplacementRange);
  }
  if (completion.fromTypes !== undefined) {
    const quoteChar = quoteCharacterForStringLiteralLike(contextToken);
    const items = completion.fromTypes.types
      .map((type): CompletionItem | undefined => {
        const value = literalValue(type as Type);
        return typeof value === "string"
          ? {
            label: escapeStringLiteralCompletionValue(value, quoteChar),
            kind: CompletionItemKindText,
            sortText: SortTextLocationPriority,
          }
          : undefined;
      })
      .filter((item): item is CompletionItem => item !== undefined);
    return {
      isIncomplete: false,
      itemDefaults: {
        commitCharacters: getDefaultCommitCharacters(completion.fromTypes.isNewIdentifier),
      },
      items,
    };
  }
  return undefined;
}

export function convertPathCompletions(
  pathCompletions: readonly PathCompletion[],
  _file: SourceFile,
  _position: number,
): CompletionList {
  return {
    isIncomplete: false,
    itemDefaults: {
      commitCharacters: getDefaultCommitCharacters(true),
    },
    items: pathCompletions.map((pathCompletion): CompletionItem => {
      const detail = pathCompletion.name.endsWith(pathCompletion.extension)
        ? pathCompletion.name
        : `${pathCompletion.name}${pathCompletion.extension}`;
      return {
        label: pathCompletion.name,
        kind: getCompletionsSymbolKind(pathCompletion.kind),
        sortText: SortTextLocationPriority,
        detail,
        ...(pathCompletion.textRange === undefined ? {} : { textEdit: { textEdit: { range: rangeFromTextRange(pathCompletion.textRange, _file), newText: pathCompletion.name } } }),
      };
    }),
  };
}

export function getStringLiteralCompletionEntries(
  service: StringLiteralCompletionService,
  file: SourceFile,
  node: Node,
  position: number,
  checker: StringCompletionChecker,
): StringLiteralCompletions | undefined {
  const parent = node.parent === undefined ? undefined : walkUpParentheses(node.parent);
  if (parent === undefined) return undefined;

  switch (parent.kind) {
    case Kind.LiteralType: {
      const grandparent = parent.parent === undefined ? undefined : walkUpParentheses(parent.parent);
      if (grandparent === undefined) return undefined;
      if (grandparent.kind === Kind.ImportType) {
        return getStringLiteralCompletionsFromModuleNames(service, file, node, service.getProgram?.(), checker);
      }
      return fromUnionableLiteralType(grandparent, parent, position, checker);
    }
    case Kind.PropertyAssignment: {
      if (parent.parent?.kind === Kind.ObjectLiteralExpression && nodeProperty(parent, "name") === node) {
        const fromProperties = stringLiteralCompletionsForObjectLiteral(checker, parent.parent);
        return fromProperties === undefined ? undefined : { fromProperties };
      }
      if (findAncestor(parent.parent, isCallLikeExpressionKind) !== undefined) {
        const unique = new Set<string>();
        const stringLiteralTypes = [
          ...getStringLiteralTypes(checker.getContextualType?.(node, StringCompletionContextFlags.None), unique, checker),
          ...getStringLiteralTypes(checker.getContextualType?.(node, StringCompletionContextFlags.IgnoreNodeInferences), unique, checker),
        ];
        return toStringLiteralCompletionsFromTypes(stringLiteralTypes);
      }
      const fromTypes = fromContextualType(StringCompletionContextFlags.None, node, checker);
      return fromTypes === undefined ? undefined : { fromTypes };
    }
    case Kind.ElementAccessExpression: {
      const expression = nodeProperty<Node>(parent, "expression");
      const argumentExpression = nodeProperty<Node>(parent, "argumentExpression");
      if (expression !== undefined && node === skipParentheses(argumentExpression)) {
        const type = checker.getTypeAtLocation?.(expression);
        return type === undefined ? undefined : { fromProperties: stringLiteralCompletionsFromProperties(type, checker) };
      }
      return undefined;
    }
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.JsxAttribute: {
      if (!isRequireCallArgument(node) && !isImportCallKind(parent)) {
        const argumentNode = parent.kind === Kind.JsxAttribute ? parent.parent ?? parent : node;
        const argumentInfo = service.getArgumentInfoForCompletions?.(argumentNode, position, file, checker);
        if (argumentInfo === undefined) return undefined;
        const result = getStringLiteralCompletionsFromSignature(argumentInfo.invocation, node, argumentInfo, checker);
        if (result !== undefined) return { fromTypes: result };
        const fromTypes = fromContextualType(StringCompletionContextFlags.None, node, checker);
        return fromTypes === undefined ? undefined : { fromTypes };
      }
      return getStringLiteralCompletionsFromModuleNames(service, file, node, service.getProgram?.(), checker);
    }
    case Kind.ImportDeclaration:
    case Kind.ExportDeclaration:
    case Kind.ExternalModuleReference:
    case Kind.JSDocImportTag:
      return getStringLiteralCompletionsFromModuleNames(service, file, node, service.getProgram?.(), checker);
    case Kind.CaseClause: {
      const contextualTypes = fromContextualType(StringCompletionContextFlags.IgnoreNodeInferences, node, checker);
      if (contextualTypes === undefined) return undefined;
      const usedValues = caseBlockStringLiteralValues(parent.parent);
      return {
        fromTypes: {
          types: contextualTypes.types.filter(type => {
            const value = literalValue(type as Type);
            return typeof value !== "string" || !usedValues.has(value);
          }),
          isNewIdentifier: false,
        },
      };
    }
    case Kind.ImportSpecifier:
    case Kind.ExportSpecifier:
      return stringLiteralCompletionsForImportOrExportSpecifier(parent, node, checker);
    case Kind.BinaryExpression:
      if (nodeProperty<Node>(parent, "operatorToken")?.kind === Kind.InKeyword) {
        const right = nodeProperty<Node>(parent, "right");
        const type = right === undefined ? undefined : checker.getTypeAtLocation?.(right);
        const properties = type === undefined ? [] : getPropertiesForCompletion(type, checker);
        return {
          fromProperties: {
            symbols: properties.filter(symbol => !isPrivateClassElementDeclaration(symbol.valueDeclaration)),
            hasIndexSignature: false,
          },
        };
      }
      const binaryFromTypes = fromContextualType(StringCompletionContextFlags.None, node, checker);
      return binaryFromTypes === undefined ? undefined : { fromTypes: binaryFromTypes };
    default: {
      const ignoredInferenceResult = fromContextualType(StringCompletionContextFlags.IgnoreNodeInferences, node, checker);
      if (ignoredInferenceResult !== undefined) return { fromTypes: ignoredInferenceResult };
      const fromTypes = fromContextualType(StringCompletionContextFlags.None, node, checker);
      return fromTypes === undefined ? undefined : { fromTypes };
    }
  }
}

export function fromContextualType(
  contextFlags: StringCompletionContextFlags,
  node: Node,
  checker: StringCompletionChecker,
): CompletionsFromTypes | undefined {
  return toCompletionsFromTypes(getStringLiteralTypes(checker.getContextualType?.(node, contextFlags), undefined, checker));
}

export function toCompletionsFromTypes(types: readonly Type[]): CompletionsFromTypes | undefined {
  if (types.length === 0) return undefined;
  return {
    types,
    isNewIdentifier: false,
  };
}

export function toStringLiteralCompletionsFromTypes(types: readonly Type[]): StringLiteralCompletions | undefined {
  const result = toCompletionsFromTypes(types);
  return result === undefined ? undefined : { fromTypes: result };
}

export function fromUnionableLiteralType(
  grandparent: Node,
  parent: Node,
  position: number,
  checker: StringCompletionChecker,
): StringLiteralCompletions | undefined {
  switch (grandparent.kind) {
    case Kind.CallExpression:
    case Kind.ExpressionWithTypeArguments:
    case Kind.JsxOpeningElement:
    case Kind.JsxSelfClosingElement:
    case Kind.NewExpression:
    case Kind.TaggedTemplateExpression:
    case Kind.TypeReference: {
      const typeArgument = findAncestor(parent, candidate => candidate.parent === grandparent);
      if (typeArgument === undefined) return undefined;
      return {
        fromTypes: {
          types: getStringLiteralTypes(checker.getTypeArgumentConstraint?.(typeArgument), undefined, checker),
          isNewIdentifier: false,
        },
      };
    }
    case Kind.IndexedAccessType: {
      const indexType = nodeProperty<Node>(grandparent, "indexType");
      const objectType = nodeProperty<Node>(grandparent, "objectType");
      if (indexType === undefined || objectType === undefined || !containsPosition(indexType, position)) return undefined;
      const type = checker.getTypeFromTypeNode?.(objectType);
      return type === undefined ? undefined : { fromProperties: stringLiteralCompletionsFromProperties(type, checker) };
    }
    case Kind.UnionType: {
      const nextGrandparent = grandparent.parent === undefined ? undefined : walkUpParentheses(grandparent.parent);
      if (nextGrandparent === undefined) return undefined;
      const result = fromUnionableLiteralType(nextGrandparent, parent, position, checker);
      if (result === undefined) return undefined;
      const alreadyUsedTypes = new Set(getAlreadyUsedTypesInStringLiteralUnion(grandparent, parent));
      if (result.fromProperties !== undefined) {
        return {
          fromProperties: {
            symbols: result.fromProperties.symbols.filter(symbol => !alreadyUsedTypes.has(symbolName(symbol))),
            hasIndexSignature: result.fromProperties.hasIndexSignature,
          },
        };
      }
      if (result.fromTypes !== undefined) {
        return {
          fromTypes: {
            types: result.fromTypes.types.filter(type => {
              const value = literalValue(type as Type);
              return typeof value !== "string" || !alreadyUsedTypes.has(value);
            }),
            isNewIdentifier: false,
          },
        };
      }
      return undefined;
    }
    case Kind.PropertySignature:
      return {
        fromTypes: {
          types: getStringLiteralTypes(checker.getConstraintOfTypeArgumentProperty?.(grandparent), undefined, checker),
          isNewIdentifier: false,
        },
      };
    default:
      return undefined;
  }
}

export function stringLiteralCompletionsForObjectLiteral(
  checker: StringCompletionChecker,
  objectLiteralExpression: Node,
): CompletionsFromProperties | undefined {
  const contextualType = checker.getContextualType?.(objectLiteralExpression, StringCompletionContextFlags.None);
  if (contextualType === undefined) return undefined;
  const completionsType = checker.getContextualType?.(objectLiteralExpression, StringCompletionContextFlags.IgnoreNodeInferences);
  const symbols = checker.getPropertiesForObjectExpression?.(contextualType, completionsType, objectLiteralExpression)
    ?? getPropertiesForCompletion(completionsType ?? contextualType, checker);
  return {
    symbols,
    hasIndexSignature: hasIndexSignature(contextualType, checker),
  };
}

export function stringLiteralCompletionsFromProperties(
  type: Type,
  checker: StringCompletionChecker,
): CompletionsFromProperties {
  return {
    symbols: getPropertiesForCompletion(type, checker).filter(symbol => !isPrivateClassElementDeclaration(symbol.valueDeclaration)),
    hasIndexSignature: hasIndexSignature(type, checker),
  };
}

export function getStringLiteralCompletionsFromModuleNames(
  service: StringLiteralCompletionService,
  file: SourceFile,
  node: Node,
  program: StringCompletionProgram | undefined,
  checker: StringCompletionChecker,
): StringLiteralCompletions {
  const nameAndKinds = service.getStringLiteralCompletionsFromModuleNamesWorker?.(file, node, program, checker) ?? [];
  const textStart = getStartOfNode(node, file, false) + 1;
  return {
    fromPaths: addReplacementSpans(nodeText(node), textStart, nameAndKinds),
  };
}

export function getStringLiteralCompletionsFromSignature(
  invocation: unknown,
  editingArgument: Node,
  argumentInfo: StringCompletionArgumentInfo,
  checker: StringCompletionChecker,
): CompletionsFromTypes | undefined {
  const candidates = checker.getCandidateSignaturesForStringLiteralCompletions?.(invocation, editingArgument) ?? [];
  if (candidates.length === 0) return undefined;
  const unique = new Set<string>();
  const types = candidates.flatMap(signature =>
    getStringLiteralTypes(checker.getTypeOfParameterAtPosition?.(signature, argumentInfo.argumentIndex), unique, checker),
  );
  return toCompletionsFromTypes(types);
}

export function deduplicateStrings(slice: readonly string[]): readonly string[] {
  if (slice.length <= 1) return slice;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of slice) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }
  return result;
}

export function deduplicateModuleCompletions(
  completions: readonly ModuleCompletionNameAndKind[],
): readonly ModuleCompletionNameAndKind[] {
  if (completions.length <= 1) return completions;
  const seen = new Set<string>();
  const result: ModuleCompletionNameAndKind[] = [];
  for (const completion of completions) {
    const key = `${completion.name}\0${completion.kind}\0${completion.extension}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(completion);
    }
  }
  return result;
}

export function moduleToScriptElementKind(kind: ModuleCompletionKind): ScriptElementKind {
  switch (kind) {
    case ModuleCompletionKind.Directory:
      return ScriptElementKindDirectory;
    case ModuleCompletionKind.ExternalModuleName:
      return ScriptElementKindExternalModuleName;
    case ModuleCompletionKind.File:
    default:
      return ScriptElementKindScriptElement;
  }
}

export function addReplacementSpans(
  text: string,
  textStart: number,
  names: readonly ModuleCompletionNameAndKind[],
): readonly PathCompletion[] {
  const textRange = getDirectoryFragmentRange(text, textStart);
  return names.map((nameAndKind): PathCompletion => {
    const completion = {
      name: nameAndKind.name,
      kind: moduleToScriptElementKind(nameAndKind.kind),
      extension: nameAndKind.extension,
    };
    return textRange === undefined ? completion : { ...completion, textRange };
  });
}

export function isAnyDirectorySeparator(character: string): boolean {
  return character === "/" || character === "\\";
}

export function getDirectoryFragmentRange(text: string, textStart: number): TextRange | undefined {
  const slash = Math.max(text.lastIndexOf("/"), text.lastIndexOf("\\"));
  const offset = slash === -1 ? 0 : slash + 1;
  const length = text.length - offset;
  if (length === 0) return undefined;
  return newTextRange(textStart + offset, textStart + offset + length);
}

export function getFragmentDirectory(fragment: string): string {
  if (!containsSlash(fragment)) return "";
  if (hasTrailingDirectorySeparator(fragment)) return fragment;
  return getDirectoryPath(fragment);
}

export function getPatternFromFirstMatchingCondition(target: JSONValue, conditions: readonly string[]): string {
  if (target.type === JSONValueType.String) return asString(target);
  if (target.type !== JSONValueType.Object) return "";

  const object = asObject(target);
  for (const [condition, pattern] of object) {
    if (
      condition === "default"
      || conditions.includes(condition)
      || conditions.includes("types") && isApplicableVersionedTypesKey(condition)
    ) {
      const nestedPattern = getPatternFromFirstMatchingCondition(pattern, conditions);
      if (nestedPattern !== "") return nestedPattern;
    }
  }
  return "";
}

export function getAmbientModuleCompletions(
  fragment: string,
  fragmentDirectory: string,
  checker: StringCompletionChecker,
): readonly string[] {
  const completions: string[] = [];
  for (const symbol of checker.getAmbientModules?.() ?? []) {
    const moduleName = stripQuotes(symbol.name);
    if (moduleName.startsWith(fragment) && !moduleName.includes("*")) {
      completions.push(moduleName);
    }
  }

  if (fragmentDirectory === "") return completions;
  const moduleNameWithSeparator = ensureTrailingDirectorySeparator(fragmentDirectory);
  return completions.map((moduleName) =>
    moduleName.startsWith(moduleNameWithSeparator)
      ? moduleName.slice(moduleNameWithSeparator.length)
      : moduleName,
  );
}

export function tryRemoveDirectoryPrefix(
  path: string,
  prefix: string,
  useCaseSensitiveFileNames: boolean,
): string | undefined {
  const canonicalPath = getCanonicalFileName(path, useCaseSensitiveFileNames);
  const canonicalPrefix = getCanonicalFileName(prefix, useCaseSensitiveFileNames);
  if (!canonicalPath.startsWith(canonicalPrefix)) return undefined;
  let withoutPrefix = path.slice(prefix.length);
  if (withoutPrefix.startsWith("/") || withoutPrefix.startsWith("\\")) {
    withoutPrefix = withoutPrefix.slice(1);
  }
  return withoutPrefix;
}

export function getExtensionOptions(
  options: CompilerOptions,
  referenceKind: ReferenceKind,
  file: unknown,
  mode: ResolutionMode,
  checker: StringCompletionChecker | undefined,
  userPreferences: StringCompletionUserPreferences = {},
): ExtensionOptions {
  return {
    extensionsToSearch: getSupportedExtensionsForModuleResolution(options, checker),
    referenceKind,
    importingSourceFile: file,
    endingPreference: userPreferences.importModuleSpecifierEnding,
    resolutionMode: mode,
  };
}

export function getSupportedExtensionsForModuleResolution(
  options: CompilerOptions,
  checker: StringCompletionChecker | undefined,
): readonly string[] {
  const extensions: string[] = [];
  const ambientModules = checker?.getAmbientModules?.() ?? [];
  for (const module of ambientModules) {
    const name = stripQuotes(module.name);
    if (!name.startsWith("*.") || name.includes("/")) continue;
    extensions.push(name.slice(1));
  }

  for (const extension of supportedTSExtensionsFlat) extensions.push(extension);
  if (options.allowJs === Tristate.True) {
    for (const extension of supportedJSExtensionsFlat) extensions.push(extension);
  }
  if (moduleResolutionUsesNodeModules(options.moduleResolution ?? ModuleResolutionKind.Unknown)
    && options.resolveJsonModule === Tristate.True) {
    extensions.push(extensionJson);
  }

  return deduplicateStrings(extensions);
}

export function moduleResolutionUsesNodeModules(moduleResolution: number): boolean {
  return (
    moduleResolution >= ModuleResolutionKind.Node16 &&
    moduleResolution <= ModuleResolutionKind.NodeNext
  ) || moduleResolution === ModuleResolutionKind.Bundler;
}

export function isPathRelativeToScript(path: string): boolean {
  return path.startsWith("./") || path.startsWith("../");
}

export function getBaseDirectoriesFromRootDirs(
  rootDirs: readonly string[],
  basePath: string,
  scriptDirectory: string,
  ignoreCase: boolean,
): readonly string[] {
  const normalizedRootDirs = rootDirs.map((rootDirectory) => {
    const normalizedPath = isRootedDiskPath(rootDirectory)
      ? rootDirectory
      : combinePaths(basePath, rootDirectory);
    return ensureTrailingDirectorySeparator(normalizePath(normalizedPath));
  });

  let relativeDirectory = "";
  const comparePathsOptions = {
    currentDirectory: basePath,
    useCaseSensitiveFileNames: !ignoreCase,
  };
  for (const rootDirectory of normalizedRootDirs) {
    if (containsPath(rootDirectory, scriptDirectory, comparePathsOptions)) {
      relativeDirectory = rootDirectory.length > scriptDirectory.length
        ? ""
        : scriptDirectory.slice(rootDirectory.length);
      break;
    }
  }

  const directories = normalizedRootDirs.map((rootDirectory) =>
    removeTrailingDirectorySeparator(combinePaths(rootDirectory, relativeDirectory)),
  );
  directories.push(removeTrailingDirectorySeparator(scriptDirectory));
  return deduplicateStrings(directories);
}

export function containsSlash(fragment: string): boolean {
  return fragment.includes(directorySeparator);
}

export function withoutStartAndEnd(text: string, start: string, end: string): string | undefined {
  if (text.startsWith(start) && text.endsWith(end) && text.length >= start.length + end.length) {
    return text.slice(start.length, text.length - end.length);
  }
  return undefined;
}

export function removeLeadingDirectorySeparator(path: string): string {
  return path.startsWith(directorySeparator) ? path.slice(directorySeparator.length) : path;
}

export function getPossibleOriginalInputPathWithoutChangingExt(
  filePath: string,
  ignoreCase: boolean,
  outputDir: string,
  getCommonSourceDirectory: () => string,
): string {
  if (outputDir !== "") {
    return resolvePath(
      getCommonSourceDirectory(),
      getRelativePathFromDirectory(outputDir, filePath, { currentDirectory: "", useCaseSensitiveFileNames: !ignoreCase }),
    );
  }
  return filePath;
}

export function getFileExtension(fileName: string): string {
  let extension = tryGetExtensionFromPath(fileName);
  if (extension === "") {
    extension = getAnyExtensionFromPath(fileName, undefined, false);
  }
  return extension;
}

export function getFilenameWithExtensionOptionForFileNameReference(name: string): readonly [string, string] {
  return [name, tryGetExtensionFromPath(name)];
}

export function walkUpParentheses(node: Node): Node {
  let current = node;
  while (current.parent !== undefined) {
    if (current.kind === Kind.ParenthesizedType && current.parent.kind === Kind.ParenthesizedType) {
      current = current.parent;
      continue;
    }
    if (current.kind === Kind.ParenthesizedExpression && current.parent.kind === Kind.ParenthesizedExpression) {
      current = current.parent;
      continue;
    }
    break;
  }
  return current;
}

export function getStringLiteralTypes(
  type: Type | undefined,
  uniques: Set<string> | undefined,
  checker: StringCompletionChecker,
): readonly Type[] {
  if (type === undefined) return [];
  const seen = uniques ?? new Set<string>();
  const constrainedType = checker.getBaseConstraintOfType?.(type) ?? type;
  if ((constrainedType.flags & TypeFlags.Union) !== 0) {
    return typeArray(constrainedType).flatMap((elementType) =>
      getStringLiteralTypes(elementType, seen, checker),
    );
  }
  if ((constrainedType.flags & TypeFlags.StringLiteral) === 0 || (constrainedType.flags & TypeFlags.EnumLiteral) !== 0) {
    return [];
  }
  const value = literalValue(constrainedType);
  if (typeof value !== "string" || seen.has(value)) return [];
  seen.add(value);
  return [constrainedType];
}

export function getAlreadyUsedTypesInStringLiteralUnion(union: Node, current: Node): readonly string[] {
  const values: string[] = [];
  for (const typeNode of nodeArray(union, "types")) {
    if (typeNode === current || typeNode.kind !== Kind.LiteralType) continue;
    const literal = nodeProperty<Node>(typeNode, "literal");
    if (literal?.kind === Kind.StringLiteral) values.push(nodeText(literal));
  }
  return values;
}

export function hasIndexSignature(type: Type, checker: StringCompletionChecker): boolean {
  return checker.getStringIndexType?.(type) !== undefined || checker.getNumberIndexType?.(type) !== undefined;
}

function stringCompletionDataForProperties(
  completion: CompletionsFromProperties,
  file: SourceFile,
  contextToken: Node,
): CompletionDataData {
  return {
    symbols: completion.symbols,
    autoImports: [],
    completionKind: CompletionKind.String,
    isInSnippetScope: false,
    isNewIdentifierLocation: completion.hasIndexSignature,
    location: file,
    keywordFilters: KeywordCompletionFilters.None,
    literals: [],
    symbolToOriginInfoMap: new Map(),
    symbolToSortTextMap: new Map(),
    previousToken: contextToken,
    contextToken,
    jsxInitializer: { isInitializer: false },
    insideJSDocTagTypeExpression: false,
    isTypeOnlyLocation: false,
    isJsxIdentifierExpected: false,
    isRightOfOpenTag: false,
    isRightOfDotOrQuestionDot: false,
    hasUnresolvedAutoImports: false,
    defaultCommitCharacters: getDefaultCommitCharacters(completion.hasIndexSignature),
  };
}

function quoteCharacterForStringLiteralLike(node: Node): "\"" | "'" | "`" {
  if (node.kind === Kind.NoSubstitutionTemplateLiteral) return "`";
  return nodeText(node).startsWith("'") ? "'" : "\"";
}

function escapeStringLiteralCompletionValue(value: string, quoteChar: "\"" | "'" | "`"): string {
  let result = "";
  for (const character of value) {
    if (character === "\\" || character === quoteChar) {
      result += `\\${character}`;
    } else if (character === "\n") {
      result += "\\n";
    } else if (character === "\r") {
      result += "\\r";
    } else if (character === "\t") {
      result += "\\t";
    } else {
      result += character;
    }
  }
  return result;
}

function createRangeFromStringLiteralLikeContent(file: SourceFile, node: Node): Range | undefined {
  const start = getStartOfNode(node, file, false) + 1;
  const end = Math.max(start, node.end - 1);
  return createLspRangeFromBounds(start, end, file);
}

function rangeFromTextRange(textRange: TextRange, file: SourceFile): Range {
  return createLspRangeFromBounds(textRange.pos, textRange.end, file);
}

function createLspRangeFromBounds(start: number, end: number, file: SourceFile): Range {
  return {
    start: positionToLineAndCharacter(file, start),
    end: positionToLineAndCharacter(file, end),
  };
}

function positionToLineAndCharacter(file: SourceFile, position: number): Range["start"] {
  const lineStarts = lineStartsOf(file);
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    if (lineStarts[index]! > position) break;
    line = index;
  }
  return { line, character: position - lineStarts[line]! };
}

function lineStartsOf(file: SourceFile): readonly number[] {
  const lineStarts = (file as { readonly lineStarts?: readonly number[] }).lineStarts;
  return lineStarts !== undefined && lineStarts.length > 0 ? lineStarts : computeLineStarts(file.text);
}

function computeLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const char = text.charCodeAt(index);
    if (char === 13 || char === 10) {
      if (char === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    }
  }
  return starts;
}

function findAncestor(node: Node | undefined, predicate: (node: Node) => boolean): Node | undefined {
  for (let current = node; current !== undefined; current = current.parent) {
    if (predicate(current)) return current;
  }
  return undefined;
}

function isCallLikeExpressionKind(node: Node): boolean {
  switch (node.kind) {
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.TaggedTemplateExpression:
    case Kind.JsxOpeningElement:
    case Kind.JsxSelfClosingElement:
      return true;
    default:
      return false;
  }
}

function skipParentheses(node: Node | undefined): Node | undefined {
  let current = node;
  while (current?.kind === Kind.ParenthesizedExpression || current?.kind === Kind.ParenthesizedType) {
    current = nodeProperty(current, "expression") ?? nodeProperty(current, "type");
  }
  return current;
}

function isImportCallKind(node: Node): boolean {
  return node.kind === Kind.CallExpression && nodeProperty<Node>(node, "expression")?.kind === Kind.ImportKeyword;
}

function caseBlockStringLiteralValues(caseBlock: Node | undefined): ReadonlySet<string> {
  const values = new Set<string>();
  if (caseBlock === undefined) return values;
  for (const clause of nodeArray(caseBlock, "clauses")) {
    const expression = nodeProperty<Node>(clause, "expression");
    if (expression?.kind === Kind.StringLiteral || expression?.kind === Kind.NoSubstitutionTemplateLiteral) {
      values.add(nodeText(expression));
    }
  }
  return values;
}

function stringLiteralCompletionsForImportOrExportSpecifier(
  specifier: Node,
  node: Node,
  checker: StringCompletionChecker,
): StringLiteralCompletions | undefined {
  const propertyName = nodeProperty<Node>(specifier, "propertyName");
  if (propertyName !== undefined && node !== propertyName) return undefined;

  const namedImportsOrExports = specifier.parent;
  let moduleSpecifier: Node | undefined;
  if (namedImportsOrExports?.kind === Kind.NamedImports) {
    moduleSpecifier = namedImportsOrExports.parent?.parent;
  } else {
    moduleSpecifier = namedImportsOrExports?.parent;
  }
  if (moduleSpecifier === undefined) return undefined;

  const moduleSpecifierSymbol = checker.getSymbolAtLocation?.(moduleSpecifier);
  if (moduleSpecifierSymbol === undefined) return undefined;

  const existing = new Set(
    nodeArray(namedImportsOrExports, "elements")
      .map(element => nodeText(nodeProperty<Node>(element, "propertyName") ?? nodeProperty<Node>(element, "name") ?? element)),
  );
  const exports = checker.getExportsAndPropertiesOfModule?.(moduleSpecifierSymbol) ?? [];
  return {
    fromProperties: {
      symbols: exports.filter(symbol => symbolName(symbol) !== "default" && !existing.has(symbolName(symbol))),
      hasIndexSignature: false,
    },
  };
}

function getPropertiesForCompletion(type: Type, checker: StringCompletionChecker): readonly Symbol[] {
  return checker.getPropertiesForCompletion?.(type) ?? checker.getApparentProperties?.(type) ?? [];
}

function containsPosition(node: Node, position: number): boolean {
  return node.pos <= position && position <= node.end;
}

function symbolName(symbol: Symbol | unknown): string {
  const candidate = symbol as { readonly name?: string; readonly escapedName?: string };
  return candidate.name ?? candidate.escapedName ?? "";
}

function isPrivateClassElementDeclaration(node: Node | undefined): boolean {
  return node?.kind === Kind.PropertyDeclaration
    || node?.kind === Kind.MethodDeclaration
    || node?.kind === Kind.GetAccessor
    || node?.kind === Kind.SetAccessor
    ? nodeProperty<Node>(node, "name")?.kind === Kind.PrivateIdentifier
    : false;
}

export function isRequireCallArgument(node: Node): boolean {
  const parent = node.parent;
  if (parent?.kind !== Kind.CallExpression) return false;
  const argumentsList = nodeArray(parent, "arguments");
  const expression = nodeProperty<Node>(parent, "expression");
  return argumentsList[0] === node && expression?.kind === Kind.Identifier && nodeText(expression) === "require";
}

export function isInReferenceComment(file: SourceFile, position: number): boolean {
  const lineStart = lineStartOfPosition(file.text, position);
  return hasTripleSlashPrefix(file.text.slice(lineStart, position));
}

export interface TripleSlashDirectiveFragment {
  readonly prefix: string;
  readonly kind: "path" | "types";
  readonly toComplete: string;
}

export function hasTripleSlashPrefix(commentText: string): boolean {
  return commentText.startsWith("///") && commentText.slice(3).trimStart().startsWith("<");
}

export function parseTripleSlashDirectiveFragment(text: string): TripleSlashDirectiveFragment | undefined {
  let rest = text;
  if (!rest.startsWith("///")) return undefined;

  rest = rest.slice("///".length).trimStart();
  if (!rest.startsWith("<reference")) return undefined;
  rest = rest.slice("<reference".length);

  if (rest.length === 0 || !isWhiteSpaceLike(rest[0]!)) return undefined;
  rest = rest.trimStart();

  let kind: "path" | "types";
  if (rest.startsWith("path")) {
    kind = "path";
    rest = rest.slice("path".length);
  } else if (rest.startsWith("types")) {
    kind = "types";
    rest = rest.slice("types".length);
  } else {
    return undefined;
  }

  rest = rest.trimStart();
  if (!rest.startsWith("=")) return undefined;
  rest = rest.slice(1).trimStart();

  if (rest.length === 0 || (rest[0] !== "'" && rest[0] !== "\"")) return undefined;
  rest = rest.slice(1);
  if (rest.includes("'") || rest.includes("\"")) return undefined;

  return {
    prefix: text.slice(0, text.length - rest.length),
    kind,
    toComplete: rest,
  };
}

export function kindModifiersFromExtension(extension: string): ScriptElementKindModifier {
  switch (extension) {
    case extensionDts:
      return ScriptElementKindModifierDts;
    case extensionJs:
      return ScriptElementKindModifierJs;
    case extensionJson:
      return ScriptElementKindModifierJson;
    case extensionJsx:
      return ScriptElementKindModifierJsx;
    case extensionTs:
      return ScriptElementKindModifierTs;
    case extensionTsx:
      return ScriptElementKindModifierTsx;
    case extensionDmts:
      return ScriptElementKindModifierDmts;
    case extensionMjs:
      return ScriptElementKindModifierMjs;
    case extensionMts:
      return ScriptElementKindModifierMts;
    case extensionDcts:
      return ScriptElementKindModifierDcts;
    case extensionCjs:
      return ScriptElementKindModifierCjs;
    case extensionCts:
      return ScriptElementKindModifierCts;
    case extensionTsBuildInfo:
      throw new Error(`Extension ${extensionTsBuildInfo} is unsupported.`);
    default:
      return ScriptElementKindModifierNone;
  }
}

function isWhiteSpaceLike(character: string): boolean {
  return /\s/u.test(character);
}

function typeArray(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function nodeArray(node: Node, propertyName: string): readonly Node[] {
  const value = nodeProperty<readonly Node[] | { readonly nodes?: readonly Node[] }>(node, propertyName);
  if (Array.isArray(value)) return value;
  if (value !== undefined && "nodes" in value) return value.nodes ?? [];
  return [];
}

function nodeProperty<T>(node: Node | undefined, propertyName: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[propertyName];
}

function nodeText(node: Node): string {
  return nodeProperty<string>(node, "text") ?? nodeProperty<string>(node, "escapedText") ?? "";
}

function lineStartOfPosition(text: string, position: number): number {
  let index = Math.min(Math.max(position, 0), text.length);
  while (index > 0) {
    const previous = text.charCodeAt(index - 1);
    if (previous === 10 || previous === 13) break;
    index -= 1;
  }
  return index;
}

// Language-service parity map: internal/ls/string_completions.go
/**
 * Language-service parity map for TS-Go `ls/string_completions.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

export interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

export interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

export const lsStringCompletionsUpstreamPath = "ls/string_completions.go";

export const lsStringCompletionsDeclarations: readonly UpstreamDeclaration[] = [
  {"line":30,"kind":"type","name":"completionsFromTypes"},
  {"line":35,"kind":"type","name":"completionsFromProperties"},
  {"line":40,"kind":"type","name":"pathCompletion"},
  {"line":47,"kind":"type","name":"stringLiteralCompletions"},
  {"line":53,"kind":"func","name":"getStringLiteralCompletions","receiver":"l *LanguageService"},
  {"line":89,"kind":"func","name":"convertStringLiteralCompletions","receiver":"l *LanguageService"},
  {"line":192,"kind":"func","name":"convertPathCompletions","receiver":"l *LanguageService"},
  {"line":246,"kind":"func","name":"getStringLiteralCompletionEntries","receiver":"l *LanguageService"},
  {"line":423,"kind":"func","name":"fromContextualType"},
  {"line":429,"kind":"func","name":"toCompletionsFromTypes"},
  {"line":439,"kind":"func","name":"toStringLiteralCompletionsFromTypes"},
  {"line":449,"kind":"func","name":"fromUnionableLiteralType"},
  {"line":537,"kind":"func","name":"stringLiteralCompletionsForObjectLiteral"},
  {"line":559,"kind":"func","name":"stringLiteralCompletionsFromProperties"},
  {"line":568,"kind":"func","name":"getStringLiteralCompletionsFromModuleNames","receiver":"l *LanguageService"},
  {"line":586,"kind":"func","name":"addReplacementSpans"},
  {"line":598,"kind":"func","name":"moduletToScriptElementKind"},
  {"line":610,"kind":"func","name":"isAnyDirectorySeparator"},
  {"line":615,"kind":"func","name":"getDirectoryFragmentRange"},
  {"line":628,"kind":"func","name":"getStringLiteralCompletionsFromModuleNamesWorker","receiver":"l *LanguageService"},
  {"line":672,"kind":"func","name":"getCompletionEntriesForNonRelativeModules","receiver":"l *LanguageService"},
  {"line":840,"kind":"func","name":"getFragmentDirectory"},
  {"line":850,"kind":"func","name":"getPatternFromFirstMatchingCondition"},
  {"line":869,"kind":"func","name":"getAmbientModuleCompletions"},
  {"line":888,"kind":"func","name":"getCompletionEntriesFromTypings","receiver":"l *LanguageService"},
  {"line":912,"kind":"func","name":"getCompletionEntriesFromTypingsDirectories","receiver":"l *LanguageService"},
  {"line":957,"kind":"func","name":"tryRemoveDirectoryPrefix"},
  {"line":970,"kind":"func","name":"enumerateNodeModulesVisibleToScript","receiver":"l *LanguageService"},
  {"line":991,"kind":"func","name":"getExtensionOptions","receiver":"l *LanguageService"},
  {"line":1009,"kind":"func","name":"getSupportedExtensionsForModuleResolution"},
  {"line":1033,"kind":"func","name":"moduleResolutionUsesNodeModules"},
  {"line":1039,"kind":"func","name":"isPathRelativeToScript"},
  {"line":1043,"kind":"func","name":"getCompletionEntriesForRelativeModules","receiver":"l *LanguageService"},
  {"line":1074,"kind":"func","name":"getCompletionEntriesForDirectoryFragmentWithRootDirs","receiver":"l *LanguageService"},
  {"line":1114,"kind":"func","name":"getBaseDirectoriesFromRootDirs"},
  {"line":1154,"kind":"func","name":"deduplicateStrings"},
  {"line":1169,"kind":"func","name":"deduplicateModuleCompletions"},
  {"line":1190,"kind":"type","name":"moduleCompletionKind"},
  {"line":1198,"kind":"type","name":"moduleCompletionNameAndKind"},
  {"line":1204,"kind":"type","name":"moduleCompletionNameAndKindSet"},
  {"line":1208,"kind":"func","name":"add","receiver":"s *moduleCompletionNameAndKindSet"},
  {"line":1215,"kind":"type","name":"extensionOptions"},
  {"line":1223,"kind":"type","name":"referenceKind"},
  {"line":1231,"kind":"func","name":"getCompletionEntriesForDirectoryFragment","receiver":"l *LanguageService"},
  {"line":1332,"kind":"func","name":"addCompletionEntriesFromPaths","receiver":"l *LanguageService"},
  {"line":1372,"kind":"func","name":"addCompletionEntriesFromPathsOrExportsOrImports","receiver":"l *LanguageService"},
  {"line":1459,"kind":"func","name":"getCompletionsForPathMapping","receiver":"l *LanguageService"},
  {"line":1553,"kind":"func","name":"getFileExtension"},
  {"line":1566,"kind":"func","name":"getModulesForPathsPattern","receiver":"l *LanguageService"},
  {"line":1777,"kind":"func","name":"containsSlash"},
  {"line":1781,"kind":"func","name":"withoutStartAndEnd"},
  {"line":1789,"kind":"func","name":"removeLeadingDirectorySeparator"},
  {"line":1793,"kind":"func","name":"getPossibleOriginalInputPathWithoutChangingExt"},
  {"line":1810,"kind":"func","name":"getFilenameWithExtensionOption"},
  {"line":1866,"kind":"func","name":"walkUpParentheses"},
  {"line":1877,"kind":"func","name":"getStringLiteralTypes"},
  {"line":1898,"kind":"func","name":"getAlreadyUsedTypesInStringLiteralUnion"},
  {"line":1913,"kind":"func","name":"hasIndexSignature"},
  {"line":1921,"kind":"func","name":"isRequireCallArgument"},
  {"line":1926,"kind":"func","name":"kindModifiersFromExtension"},
  {"line":1959,"kind":"func","name":"getStringLiteralCompletionsFromSignature"},
  {"line":2001,"kind":"func","name":"getStringLiteralCompletionDetails","receiver":"l *LanguageService"},
  {"line":2027,"kind":"func","name":"stringLiteralCompletionDetails","receiver":"l *LanguageService"},
  {"line":2060,"kind":"func","name":"isInReferenceComment"},
  {"line":2069,"kind":"func","name":"hasTripleSlashPrefix"},
  {"line":2089,"kind":"func","name":"parseTripleSlashDirectiveFragment"},
  {"line":2143,"kind":"func","name":"getTripleSlashReferenceCompletions","receiver":"l *LanguageService"},
];

export const lsStringCompletionsSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"cmp\""},
  {"line":5,"text":"\t\"context\""},
  {"line":6,"text":"\t\"fmt\""},
  {"line":7,"text":"\t\"iter\""},
  {"line":8,"text":"\t\"maps\""},
  {"line":9,"text":"\t\"slices\""},
  {"line":10,"text":"\t\"strings\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/module\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/modulespecifiers\""},
  {"line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/packagejson\""},
  {"line":23,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":24,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":25,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":26,"text":"\t\"github.com/microsoft/typescript-go/internal/tsoptions\""},
  {"line":27,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":28,"text":")"},
  {"line":30,"text":"type completionsFromTypes struct {"},
  {"line":31,"text":"\ttypes           []*checker.StringLiteralType"},
  {"line":32,"text":"\tisNewIdentifier bool"},
  {"line":33,"text":"}"},
  {"line":35,"text":"type completionsFromProperties struct {"},
  {"line":36,"text":"\tsymbols           []*ast.Symbol"},
  {"line":37,"text":"\thasIndexSignature bool"},
  {"line":38,"text":"}"},
  {"line":40,"text":"type pathCompletion struct {"},
  {"line":41,"text":"\tname      string"},
  {"line":42,"text":"\tkind      lsutil.ScriptElementKind"},
  {"line":43,"text":"\textension string"},
  {"line":44,"text":"\ttextRange *core.TextRange"},
  {"line":45,"text":"}"},
  {"line":47,"text":"type stringLiteralCompletions struct {"},
  {"line":48,"text":"\tfromTypes      *completionsFromTypes"},
  {"line":49,"text":"\tfromProperties *completionsFromProperties"},
  {"line":50,"text":"\tfromPaths      []*pathCompletion"},
  {"line":51,"text":"}"},
  {"line":53,"text":"func (l *LanguageService) getStringLiteralCompletions("},
  {"line":54,"text":"\tctx context.Context,"},
  {"line":55,"text":"\tfile *ast.SourceFile,"},
  {"line":56,"text":"\tposition int,"},
  {"line":57,"text":"\tcontextToken *ast.Node,"},
  {"line":58,"text":"\tchecker *checker.Checker,"},
  {"line":59,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":60,"text":") *lsproto.CompletionList {"},
  {"line":61,"text":"\tif isInReferenceComment(file, position) {"},
  {"line":62,"text":"\t\tentries := l.getTripleSlashReferenceCompletions(file, position, l.GetProgram(), checker)"},
  {"line":63,"text":"\t\treturn l.convertPathCompletions(ctx, entries, file, position)"},
  {"line":64,"text":"\t}"},
  {"line":65,"text":"\tif IsInString(file, position, contextToken) {"},
  {"line":66,"text":"\t\tif contextToken == nil || !ast.IsStringLiteralLike(contextToken) {"},
  {"line":67,"text":"\t\t\treturn nil"},
  {"line":68,"text":"\t\t}"},
  {"line":69,"text":"\t\tentries := l.getStringLiteralCompletionEntries("},
  {"line":70,"text":"\t\t\tctx,"},
  {"line":71,"text":"\t\t\tfile,"},
  {"line":72,"text":"\t\t\tcontextToken,"},
  {"line":73,"text":"\t\t\tposition,"},
  {"line":74,"text":"\t\t\tchecker,"},
  {"line":75,"text":"\t\t)"},
  {"line":76,"text":"\t\treturn l.convertStringLiteralCompletions("},
  {"line":77,"text":"\t\t\tctx,"},
  {"line":78,"text":"\t\t\tentries,"},
  {"line":79,"text":"\t\t\tcontextToken,"},
  {"line":80,"text":"\t\t\tfile,"},
  {"line":81,"text":"\t\t\tposition,"},
  {"line":82,"text":"\t\t\tchecker,"},
  {"line":83,"text":"\t\t\tcompilerOptions,"},
  {"line":84,"text":"\t\t)"},
  {"line":85,"text":"\t}"},
  {"line":86,"text":"\treturn nil"},
  {"line":87,"text":"}"},
  {"line":89,"text":"func (l *LanguageService) convertStringLiteralCompletions("},
  {"line":90,"text":"\tctx context.Context,"},
  {"line":91,"text":"\tcompletion *stringLiteralCompletions,"},
  {"line":92,"text":"\tcontextToken *ast.StringLiteralLike,"},
  {"line":93,"text":"\tfile *ast.SourceFile,"},
  {"line":94,"text":"\tposition int,"},
  {"line":95,"text":"\ttypeChecker *checker.Checker,"},
  {"line":96,"text":"\toptions *core.CompilerOptions,"},
  {"line":97,"text":") *lsproto.CompletionList {"},
  {"line":98,"text":"\tif completion == nil {"},
  {"line":99,"text":"\t\treturn nil"},
  {"line":100,"text":"\t}"},
  {"line":102,"text":"\toptionalReplacementRange := l.createRangeFromStringLiteralLikeContent(file, contextToken, position)"},
  {"line":103,"text":"\tswitch {"},
  {"line":104,"text":"\tcase completion.fromPaths != nil:"},
  {"line":105,"text":"\t\tcompletion := completion.fromPaths"},
  {"line":106,"text":"\t\treturn l.convertPathCompletions(ctx, completion, file, position)"},
  {"line":107,"text":"\tcase completion.fromProperties != nil:"},
  {"line":108,"text":"\t\tcompletion := completion.fromProperties"},
  {"line":109,"text":"\t\tdata := &completionDataData{"},
  {"line":110,"text":"\t\t\tsymbols:                 completion.symbols,"},
  {"line":111,"text":"\t\t\tcompletionKind:          CompletionKindString,"},
  {"line":112,"text":"\t\t\tisNewIdentifierLocation: completion.hasIndexSignature,"},
  {"line":113,"text":"\t\t\tlocation:                file.AsNode(),"},
  {"line":114,"text":"\t\t\tcontextToken:            contextToken,"},
  {"line":115,"text":"\t\t}"},
  {"line":116,"text":"\t\t_, items := l.getCompletionEntriesFromSymbols("},
  {"line":117,"text":"\t\t\tctx,"},
  {"line":118,"text":"\t\t\ttypeChecker,"},
  {"line":119,"text":"\t\t\tdata,"},
  {"line":120,"text":"\t\t\tcontextToken, /*replacementToken*/"},
  {"line":121,"text":"\t\t\tposition,"},
  {"line":122,"text":"\t\t\tfile,"},
  {"line":123,"text":"\t\t\toptions,"},
  {"line":124,"text":"\t\t)"},
  {"line":125,"text":"\t\tdefaultCommitCharacters := getDefaultCommitCharacters(completion.hasIndexSignature)"},
  {"line":126,"text":"\t\titemDefaults := l.setItemDefaults("},
  {"line":127,"text":"\t\t\tctx,"},
  {"line":128,"text":"\t\t\tposition,"},
  {"line":129,"text":"\t\t\tfile,"},
  {"line":130,"text":"\t\t\titems,"},
  {"line":131,"text":"\t\t\t&defaultCommitCharacters,"},
  {"line":132,"text":"\t\t\toptionalReplacementRange,"},
  {"line":133,"text":"\t\t)"},
  {"line":134,"text":"\t\treturn &lsproto.CompletionList{"},
  {"line":135,"text":"\t\t\tIsIncomplete: false,"},
  {"line":136,"text":"\t\t\tItemDefaults: itemDefaults,"},
  {"line":137,"text":"\t\t\tItems:        items,"},
  {"line":138,"text":"\t\t}"},
  {"line":139,"text":"\tcase completion.fromTypes != nil:"},
  {"line":140,"text":"\t\tcompletion := completion.fromTypes"},
  {"line":141,"text":"\t\tvar quoteChar printer.QuoteChar"},
  {"line":142,"text":"\t\tif contextToken.Kind == ast.KindNoSubstitutionTemplateLiteral {"},
  {"line":143,"text":"\t\t\tquoteChar = printer.QuoteCharBacktick"},
  {"line":144,"text":"\t\t} else if strings.HasPrefix(contextToken.Text(), \"'\") {"},
  {"line":145,"text":"\t\t\tquoteChar = printer.QuoteCharSingleQuote"},
  {"line":146,"text":"\t\t} else {"},
  {"line":147,"text":"\t\t\tquoteChar = printer.QuoteCharDoubleQuote"},
  {"line":148,"text":"\t\t}"},
  {"line":149,"text":"\t\titems := core.Map(completion.types, func(t *checker.StringLiteralType) *lsproto.CompletionItem {"},
  {"line":150,"text":"\t\t\tname := printer.EscapeString(t.AsLiteralType().Value().(string), quoteChar)"},
  {"line":151,"text":"\t\t\treturn l.createLSPCompletionItem("},
  {"line":152,"text":"\t\t\t\tctx,"},
  {"line":153,"text":"\t\t\t\tname,"},
  {"line":154,"text":"\t\t\t\t\"\", /*insertText*/"},
  {"line":155,"text":"\t\t\t\t\"\", /*filterText*/"},
  {"line":156,"text":"\t\t\t\tSortTextLocationPriority,"},
  {"line":157,"text":"\t\t\t\tlsutil.ScriptElementKindString,"},
  {"line":158,"text":"\t\t\t\tlsutil.ScriptElementKindModifierNone,"},
  {"line":159,"text":"\t\t\t\tl.getReplacementRangeForContextToken(file, contextToken, position),"},
  {"line":160,"text":"\t\t\t\tnil, /*commitCharacters*/"},
  {"line":161,"text":"\t\t\t\tnil, /*labelDetails*/"},
  {"line":162,"text":"\t\t\t\tfile,"},
  {"line":163,"text":"\t\t\t\tposition,"},
  {"line":164,"text":"\t\t\t\tfalse, /*isMemberCompletion*/"},
  {"line":165,"text":"\t\t\t\tfalse, /*isSnippet*/"},
  {"line":166,"text":"\t\t\t\tfalse, /*hasAction*/"},
  {"line":167,"text":"\t\t\t\tfalse, /*preselect*/"},
  {"line":168,"text":"\t\t\t\t\"\",    /*source*/"},
  {"line":169,"text":"\t\t\t\tnil,   /*autoImportEntryData*/"},
  {"line":170,"text":"\t\t\t\tnil,   /*detail*/"},
  {"line":171,"text":"\t\t\t)"},
  {"line":172,"text":"\t\t})"},
  {"line":173,"text":"\t\tdefaultCommitCharacters := getDefaultCommitCharacters(completion.isNewIdentifier)"},
  {"line":174,"text":"\t\titemDefaults := l.setItemDefaults("},
  {"line":175,"text":"\t\t\tctx,"},
  {"line":176,"text":"\t\t\tposition,"},
  {"line":177,"text":"\t\t\tfile,"},
  {"line":178,"text":"\t\t\titems,"},
  {"line":179,"text":"\t\t\t&defaultCommitCharacters,"},
  {"line":180,"text":"\t\t\tnil, /*optionalReplacementSpan*/"},
  {"line":181,"text":"\t\t)"},
  {"line":182,"text":"\t\treturn &lsproto.CompletionList{"},
  {"line":183,"text":"\t\t\tIsIncomplete: false,"},
  {"line":184,"text":"\t\t\tItemDefaults: itemDefaults,"},
  {"line":185,"text":"\t\t\tItems:        items,"},
  {"line":186,"text":"\t\t}"},
  {"line":187,"text":"\tdefault:"},
  {"line":188,"text":"\t\treturn nil"},
  {"line":189,"text":"\t}"},
  {"line":190,"text":"}"},
  {"line":192,"text":"func (l *LanguageService) convertPathCompletions("},
  {"line":193,"text":"\tctx context.Context,"},
  {"line":194,"text":"\tpathCompletions []*pathCompletion,"},
  {"line":195,"text":"\tfile *ast.SourceFile,"},
  {"line":196,"text":"\tposition int,"},
  {"line":197,"text":") *lsproto.CompletionList {"},
  {"line":198,"text":"\tisNewIdentifierLocation := true // The user may type in a path that doesn't yet exist, creating a \"new identifier\" with respect to the collection of identifiers the server is aware of."},
  {"line":199,"text":"\tdefaultCommitCharacters := getDefaultCommitCharacters(isNewIdentifierLocation)"},
  {"line":200,"text":"\titems := core.Map(pathCompletions, func(pathCompletion *pathCompletion) *lsproto.CompletionItem {"},
  {"line":201,"text":"\t\tvar replacementSpan *lsproto.Range"},
  {"line":202,"text":"\t\tif pathCompletion.textRange != nil {"},
  {"line":203,"text":"\t\t\treplacementSpan = new(l.createLspRangeFromBounds(pathCompletion.textRange.Pos(), pathCompletion.textRange.End(), file))"},
  {"line":204,"text":"\t\t}"},
  {"line":205,"text":"\t\tdetail := pathCompletion.name"},
  {"line":206,"text":"\t\tif !strings.HasSuffix(pathCompletion.name, pathCompletion.extension) {"},
  {"line":207,"text":"\t\t\tdetail += pathCompletion.extension"},
  {"line":208,"text":"\t\t}"},
  {"line":209,"text":"\t\treturn l.createLSPCompletionItem("},
  {"line":210,"text":"\t\t\tctx,"},
  {"line":211,"text":"\t\t\tpathCompletion.name,"},
  {"line":212,"text":"\t\t\t\"\", /*insertText*/"},
  {"line":213,"text":"\t\t\t\"\", /*filterText*/"},
  {"line":214,"text":"\t\t\tSortTextLocationPriority,"},
  {"line":215,"text":"\t\t\tpathCompletion.kind,"},
  {"line":216,"text":"\t\t\tkindModifiersFromExtension(pathCompletion.extension),"},
  {"line":217,"text":"\t\t\treplacementSpan,"},
  {"line":218,"text":"\t\t\tnil, /*commitCharacters*/"},
  {"line":219,"text":"\t\t\tnil, /*labelDetails*/"},
  {"line":220,"text":"\t\t\tfile,"},
  {"line":221,"text":"\t\t\tposition,"},
  {"line":222,"text":"\t\t\tfalse, /*isMemberCompletion*/"},
  {"line":223,"text":"\t\t\tfalse, /*isSnippet*/"},
  {"line":224,"text":"\t\t\tfalse, /*hasAction*/"},
  {"line":225,"text":"\t\t\tfalse, /*preselect*/"},
  {"line":226,"text":"\t\t\t\"\",    /*source*/"},
  {"line":227,"text":"\t\t\tnil,   /*autoImportEntryData*/"},
  {"line":228,"text":"\t\t\t&detail,"},
  {"line":229,"text":"\t\t)"},
  {"line":230,"text":"\t})"},
  {"line":231,"text":"\titemDefaults := l.setItemDefaults("},
  {"line":232,"text":"\t\tctx,"},
  {"line":233,"text":"\t\tposition,"},
  {"line":234,"text":"\t\tfile,"},
  {"line":235,"text":"\t\titems,"},
  {"line":236,"text":"\t\t&defaultCommitCharacters,"},
  {"line":237,"text":"\t\tnil, /*optionalReplacementSpan*/"},
  {"line":238,"text":"\t)"},
  {"line":239,"text":"\treturn &lsproto.CompletionList{"},
  {"line":240,"text":"\t\tIsIncomplete: false,"},
  {"line":241,"text":"\t\tItemDefaults: itemDefaults,"},
  {"line":242,"text":"\t\tItems:        items,"},
  {"line":243,"text":"\t}"},
  {"line":244,"text":"}"},
  {"line":246,"text":"func (l *LanguageService) getStringLiteralCompletionEntries("},
  {"line":247,"text":"\tctx context.Context,"},
  {"line":248,"text":"\tfile *ast.SourceFile,"},
  {"line":249,"text":"\tnode *ast.StringLiteralLike,"},
  {"line":250,"text":"\tposition int,"},
  {"line":251,"text":"\ttypeChecker *checker.Checker,"},
  {"line":252,"text":") *stringLiteralCompletions {"},
  {"line":253,"text":"\tparent := walkUpParentheses(node.Parent)"},
  {"line":254,"text":"\tswitch parent.Kind {"},
  {"line":255,"text":"\tcase ast.KindLiteralType:"},
  {"line":256,"text":"\t\tgrandparent := walkUpParentheses(parent.Parent)"},
  {"line":257,"text":"\t\tif grandparent.Kind == ast.KindImportType {"},
  {"line":258,"text":"\t\t\treturn l.getStringLiteralCompletionsFromModuleNames("},
  {"line":259,"text":"\t\t\t\tfile,"},
  {"line":260,"text":"\t\t\t\tnode,"},
  {"line":261,"text":"\t\t\t\tl.GetProgram(),"},
  {"line":262,"text":"\t\t\t\ttypeChecker,"},
  {"line":263,"text":"\t\t\t)"},
  {"line":264,"text":"\t\t}"},
  {"line":265,"text":"\t\treturn fromUnionableLiteralType(grandparent, parent, position, typeChecker)"},
  {"line":266,"text":"\tcase ast.KindPropertyAssignment:"},
  {"line":267,"text":"\t\tif ast.IsObjectLiteralExpression(parent.Parent) && parent.Name() == node {"},
  {"line":280,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":281,"text":"\t\t\t\tfromProperties: stringLiteralCompletionsForObjectLiteral(typeChecker, parent.Parent),"},
  {"line":282,"text":"\t\t\t}"},
  {"line":283,"text":"\t\t}"},
  {"line":284,"text":"\t\tif ast.FindAncestor(parent.Parent, ast.IsCallLikeExpression) != nil {"},
  {"line":285,"text":"\t\t\tuniques := &collections.Set[string]{}"},
  {"line":286,"text":"\t\t\tstringLiteralTypes := append("},
  {"line":287,"text":"\t\t\t\tgetStringLiteralTypes(typeChecker.GetContextualType(node, checker.ContextFlagsNone), uniques, typeChecker),"},
  {"line":288,"text":"\t\t\t\tgetStringLiteralTypes(typeChecker.GetContextualType(node, checker.ContextFlagsIgnoreNodeInferences), uniques, typeChecker)...,"},
  {"line":289,"text":"\t\t\t)"},
  {"line":290,"text":"\t\t\treturn toStringLiteralCompletionsFromTypes(stringLiteralTypes)"},
  {"line":291,"text":"\t\t}"},
  {"line":292,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":293,"text":"\t\t\tfromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),"},
  {"line":294,"text":"\t\t}"},
  {"line":295,"text":"\tcase ast.KindElementAccessExpression:"},
  {"line":296,"text":"\t\texpression := parent.Expression()"},
  {"line":297,"text":"\t\targumentExpression := parent.AsElementAccessExpression().ArgumentExpression"},
  {"line":298,"text":"\t\tif node == ast.SkipParentheses(argumentExpression) {"},
  {"line":305,"text":"\t\t\tt := typeChecker.GetTypeAtLocation(expression)"},
  {"line":306,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":307,"text":"\t\t\t\tfromProperties: stringLiteralCompletionsFromProperties(t, typeChecker),"},
  {"line":308,"text":"\t\t\t}"},
  {"line":309,"text":"\t\t}"},
  {"line":310,"text":"\t\treturn nil"},
  {"line":311,"text":"\tcase ast.KindCallExpression, ast.KindNewExpression, ast.KindJsxAttribute:"},
  {"line":312,"text":"\t\tif !isRequireCallArgument(node) && !ast.IsImportCall(parent) {"},
  {"line":313,"text":"\t\t\tvar argumentNode *ast.Node"},
  {"line":314,"text":"\t\t\tif parent.Kind == ast.KindJsxAttribute {"},
  {"line":315,"text":"\t\t\t\targumentNode = parent.Parent"},
  {"line":316,"text":"\t\t\t} else {"},
  {"line":317,"text":"\t\t\t\targumentNode = node"},
  {"line":318,"text":"\t\t\t}"},
  {"line":319,"text":"\t\t\targumentInfo := getArgumentInfoForCompletions(argumentNode, position, file, typeChecker)"},
  {"line":323,"text":"\t\t\tif argumentInfo == nil {"},
  {"line":324,"text":"\t\t\t\treturn nil"},
  {"line":325,"text":"\t\t\t}"},
  {"line":327,"text":"\t\t\tresult := getStringLiteralCompletionsFromSignature(argumentInfo.invocation, node, argumentInfo, typeChecker)"},
  {"line":328,"text":"\t\t\tif result != nil {"},
  {"line":329,"text":"\t\t\t\treturn &stringLiteralCompletions{"},
  {"line":330,"text":"\t\t\t\t\tfromTypes: result,"},
  {"line":331,"text":"\t\t\t\t}"},
  {"line":332,"text":"\t\t\t}"},
  {"line":333,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":334,"text":"\t\t\t\tfromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),"},
  {"line":335,"text":"\t\t\t}"},
  {"line":336,"text":"\t\t}"},
  {"line":337,"text":"\t\tfallthrough // is `require(\"\")` or `require(\"\"` or `import(\"\")`"},
  {"line":338,"text":"\tcase ast.KindImportDeclaration, ast.KindExportDeclaration, ast.KindExternalModuleReference, ast.KindJSDocImportTag:"},
  {"line":345,"text":"\t\treturn l.getStringLiteralCompletionsFromModuleNames(file, node, l.GetProgram(), typeChecker)"},
  {"line":346,"text":"\tcase ast.KindCaseClause:"},
  {"line":347,"text":"\t\ttracker := newCaseClauseTracker(typeChecker, parent.Parent.AsCaseBlock().Clauses.Nodes)"},
  {"line":348,"text":"\t\tcontextualTypes := fromContextualType(checker.ContextFlagsIgnoreNodeInferences, node, typeChecker)"},
  {"line":349,"text":"\t\tif contextualTypes == nil {"},
  {"line":350,"text":"\t\t\treturn nil"},
  {"line":351,"text":"\t\t}"},
  {"line":352,"text":"\t\tliterals := core.Filter(contextualTypes.types, func(t *checker.StringLiteralType) bool {"},
  {"line":353,"text":"\t\t\treturn !tracker.hasValue(t.AsLiteralType().Value())"},
  {"line":354,"text":"\t\t})"},
  {"line":355,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":356,"text":"\t\t\tfromTypes: &completionsFromTypes{"},
  {"line":357,"text":"\t\t\t\ttypes:           literals,"},
  {"line":358,"text":"\t\t\t\tisNewIdentifier: false,"},
  {"line":359,"text":"\t\t\t},"},
  {"line":360,"text":"\t\t}"},
  {"line":361,"text":"\tcase ast.KindImportSpecifier, ast.KindExportSpecifier:"},
  {"line":363,"text":"\t\tspecifier := parent"},
  {"line":364,"text":"\t\tif propertyName := specifier.PropertyName(); propertyName != nil && node != propertyName {"},
  {"line":365,"text":"\t\t\treturn nil // Don't complete in `export { \"...\" as \"|\" } from`"},
  {"line":366,"text":"\t\t}"},
  {"line":367,"text":"\t\tnamedImportsOrExports := specifier.Parent"},
  {"line":368,"text":"\t\tvar moduleSpecifier *ast.Node"},
  {"line":369,"text":"\t\tif namedImportsOrExports.Kind == ast.KindNamedImports {"},
  {"line":370,"text":"\t\t\tmoduleSpecifier = namedImportsOrExports.Parent.Parent"},
  {"line":371,"text":"\t\t} else {"},
  {"line":372,"text":"\t\t\tmoduleSpecifier = namedImportsOrExports.Parent"},
  {"line":373,"text":"\t\t}"},
  {"line":374,"text":"\t\tif moduleSpecifier == nil {"},
  {"line":375,"text":"\t\t\treturn nil"},
  {"line":376,"text":"\t\t}"},
  {"line":377,"text":"\t\tmoduleSpecifierSymbol := typeChecker.GetSymbolAtLocation(moduleSpecifier)"},
  {"line":378,"text":"\t\tif moduleSpecifierSymbol == nil {"},
  {"line":379,"text":"\t\t\treturn nil"},
  {"line":380,"text":"\t\t}"},
  {"line":381,"text":"\t\texports := typeChecker.GetExportsAndPropertiesOfModule(moduleSpecifierSymbol)"},
  {"line":382,"text":"\t\texisting := collections.NewSetFromItems(core.Map(namedImportsOrExports.Elements(), func(n *ast.Node) string {"},
  {"line":383,"text":"\t\t\treturn n.PropertyNameOrName().Text()"},
  {"line":384,"text":"\t\t})...)"},
  {"line":385,"text":"\t\tuniques := core.Filter(exports, func(e *ast.Symbol) bool {"},
  {"line":386,"text":"\t\t\treturn e.Name != ast.InternalSymbolNameDefault && !existing.Has(e.Name)"},
  {"line":387,"text":"\t\t})"},
  {"line":388,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":389,"text":"\t\t\tfromProperties: &completionsFromProperties{"},
  {"line":390,"text":"\t\t\t\tsymbols:           uniques,"},
  {"line":391,"text":"\t\t\t\thasIndexSignature: false,"},
  {"line":392,"text":"\t\t\t},"},
  {"line":393,"text":"\t\t}"},
  {"line":394,"text":"\tcase ast.KindBinaryExpression:"},
  {"line":395,"text":"\t\tif parent.AsBinaryExpression().OperatorToken.Kind == ast.KindInKeyword {"},
  {"line":396,"text":"\t\t\tt := typeChecker.GetTypeAtLocation(parent.AsBinaryExpression().Right)"},
  {"line":397,"text":"\t\t\tproperties := getPropertiesForCompletion(t, typeChecker)"},
  {"line":398,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":399,"text":"\t\t\t\tfromProperties: &completionsFromProperties{"},
  {"line":400,"text":"\t\t\t\t\tsymbols: core.Filter(properties, func(s *ast.Symbol) bool {"},
  {"line":401,"text":"\t\t\t\t\t\treturn s.ValueDeclaration == nil || !ast.IsPrivateIdentifierClassElementDeclaration(s.ValueDeclaration)"},
  {"line":402,"text":"\t\t\t\t\t}),"},
  {"line":403,"text":"\t\t\t\t\thasIndexSignature: false,"},
  {"line":404,"text":"\t\t\t\t},"},
  {"line":405,"text":"\t\t\t}"},
  {"line":406,"text":"\t\t}"},
  {"line":407,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":408,"text":"\t\t\tfromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),"},
  {"line":409,"text":"\t\t}"},
  {"line":410,"text":"\tdefault:"},
  {"line":411,"text":"\t\tresult := fromContextualType(checker.ContextFlagsIgnoreNodeInferences, node, typeChecker)"},
  {"line":412,"text":"\t\tif result != nil {"},
  {"line":413,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":414,"text":"\t\t\t\tfromTypes: result,"},
  {"line":415,"text":"\t\t\t}"},
  {"line":416,"text":"\t\t}"},
  {"line":417,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":418,"text":"\t\t\tfromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),"},
  {"line":419,"text":"\t\t}"},
  {"line":420,"text":"\t}"},
  {"line":421,"text":"}"},
  {"line":423,"text":"func fromContextualType(contextFlags checker.ContextFlags, node *ast.Node, typeChecker *checker.Checker) *completionsFromTypes {"},
  {"line":426,"text":"\treturn toCompletionsFromTypes(getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker, contextFlags), nil, typeChecker))"},
  {"line":427,"text":"}"},
  {"line":429,"text":"func toCompletionsFromTypes(types []*checker.StringLiteralType) *completionsFromTypes {"},
  {"line":430,"text":"\tif len(types) == 0 {"},
  {"line":431,"text":"\t\treturn nil"},
  {"line":432,"text":"\t}"},
  {"line":433,"text":"\treturn &completionsFromTypes{"},
  {"line":434,"text":"\t\ttypes:           types,"},
  {"line":435,"text":"\t\tisNewIdentifier: false,"},
  {"line":436,"text":"\t}"},
  {"line":437,"text":"}"},
  {"line":439,"text":"func toStringLiteralCompletionsFromTypes(types []*checker.StringLiteralType) *stringLiteralCompletions {"},
  {"line":440,"text":"\tresult := toCompletionsFromTypes(types)"},
  {"line":441,"text":"\tif result == nil {"},
  {"line":442,"text":"\t\treturn nil"},
  {"line":443,"text":"\t}"},
  {"line":444,"text":"\treturn &stringLiteralCompletions{"},
  {"line":445,"text":"\t\tfromTypes: result,"},
  {"line":446,"text":"\t}"},
  {"line":447,"text":"}"},
  {"line":449,"text":"func fromUnionableLiteralType("},
  {"line":450,"text":"\tgrandparent *ast.Node,"},
  {"line":451,"text":"\tparent *ast.Node,"},
  {"line":452,"text":"\tposition int,"},
  {"line":453,"text":"\ttypeChecker *checker.Checker,"},
  {"line":454,"text":") *stringLiteralCompletions {"},
  {"line":455,"text":"\tswitch grandparent.Kind {"},
  {"line":456,"text":"\tcase ast.KindCallExpression,"},
  {"line":457,"text":"\t\tast.KindExpressionWithTypeArguments,"},
  {"line":458,"text":"\t\tast.KindJsxOpeningElement,"},
  {"line":459,"text":"\t\tast.KindJsxSelfClosingElement,"},
  {"line":460,"text":"\t\tast.KindNewExpression,"},
  {"line":461,"text":"\t\tast.KindTaggedTemplateExpression,"},
  {"line":462,"text":"\t\tast.KindTypeReference:"},
  {"line":463,"text":"\t\ttypeArgument := ast.FindAncestor(parent, func(n *ast.Node) bool { return n.Parent == grandparent })"},
  {"line":464,"text":"\t\tif typeArgument != nil {"},
  {"line":465,"text":"\t\t\tt := typeChecker.GetTypeArgumentConstraint(typeArgument)"},
  {"line":466,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":467,"text":"\t\t\t\tfromTypes: &completionsFromTypes{"},
  {"line":468,"text":"\t\t\t\t\ttypes:           getStringLiteralTypes(t, nil, typeChecker),"},
  {"line":469,"text":"\t\t\t\t\tisNewIdentifier: false,"},
  {"line":470,"text":"\t\t\t\t},"},
  {"line":471,"text":"\t\t\t}"},
  {"line":472,"text":"\t\t}"},
  {"line":473,"text":"\t\treturn nil"},
  {"line":474,"text":"\tcase ast.KindIndexedAccessType:"},
  {"line":481,"text":"\t\tindexType := grandparent.AsIndexedAccessTypeNode().IndexType"},
  {"line":482,"text":"\t\tobjectType := grandparent.AsIndexedAccessTypeNode().ObjectType"},
  {"line":483,"text":"\t\tif !indexType.Loc.ContainsInclusive(position) {"},
  {"line":484,"text":"\t\t\treturn nil"},
  {"line":485,"text":"\t\t}"},
  {"line":486,"text":"\t\tt := typeChecker.GetTypeFromTypeNode(objectType)"},
  {"line":487,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":488,"text":"\t\t\tfromProperties: stringLiteralCompletionsFromProperties(t, typeChecker),"},
  {"line":489,"text":"\t\t}"},
  {"line":490,"text":"\tcase ast.KindUnionType:"},
  {"line":491,"text":"\t\tresult := fromUnionableLiteralType("},
  {"line":492,"text":"\t\t\twalkUpParentheses(grandparent.Parent),"},
  {"line":493,"text":"\t\t\tparent,"},
  {"line":494,"text":"\t\t\tposition,"},
  {"line":495,"text":"\t\t\ttypeChecker)"},
  {"line":496,"text":"\t\tif result == nil {"},
  {"line":497,"text":"\t\t\treturn nil"},
  {"line":498,"text":"\t\t}"},
  {"line":499,"text":"\t\talreadyUsedTypes := getAlreadyUsedTypesInStringLiteralUnion(grandparent, parent)"},
  {"line":500,"text":"\t\tswitch {"},
  {"line":501,"text":"\t\tcase result.fromProperties != nil:"},
  {"line":502,"text":"\t\t\tresult := result.fromProperties"},
  {"line":503,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":504,"text":"\t\t\t\tfromProperties: &completionsFromProperties{"},
  {"line":505,"text":"\t\t\t\t\tsymbols: core.Filter("},
  {"line":506,"text":"\t\t\t\t\t\tresult.symbols,"},
  {"line":507,"text":"\t\t\t\t\t\tfunc(s *ast.Symbol) bool { return !slices.Contains(alreadyUsedTypes, s.Name) },"},
  {"line":508,"text":"\t\t\t\t\t),"},
  {"line":509,"text":"\t\t\t\t\thasIndexSignature: result.hasIndexSignature,"},
  {"line":510,"text":"\t\t\t\t},"},
  {"line":511,"text":"\t\t\t}"},
  {"line":512,"text":"\t\tcase result.fromTypes != nil:"},
  {"line":513,"text":"\t\t\tresult := result.fromTypes"},
  {"line":514,"text":"\t\t\treturn &stringLiteralCompletions{"},
  {"line":515,"text":"\t\t\t\tfromTypes: &completionsFromTypes{"},
  {"line":516,"text":"\t\t\t\t\ttypes: core.Filter(result.types, func(t *checker.StringLiteralType) bool {"},
  {"line":517,"text":"\t\t\t\t\t\treturn !slices.Contains(alreadyUsedTypes, t.AsLiteralType().Value().(string))"},
  {"line":518,"text":"\t\t\t\t\t}),"},
  {"line":519,"text":"\t\t\t\t\tisNewIdentifier: false,"},
  {"line":520,"text":"\t\t\t\t},"},
  {"line":521,"text":"\t\t\t}"},
  {"line":522,"text":"\t\tdefault:"},
  {"line":523,"text":"\t\t\treturn nil"},
  {"line":524,"text":"\t\t}"},
  {"line":525,"text":"\tcase ast.KindPropertySignature:"},
  {"line":526,"text":"\t\treturn &stringLiteralCompletions{"},
  {"line":527,"text":"\t\t\tfromTypes: &completionsFromTypes{"},
  {"line":528,"text":"\t\t\t\ttypes:           getStringLiteralTypes(getConstraintOfTypeArgumentProperty(grandparent, typeChecker), nil, typeChecker),"},
  {"line":529,"text":"\t\t\t\tisNewIdentifier: false,"},
  {"line":530,"text":"\t\t\t},"},
  {"line":531,"text":"\t\t}"},
  {"line":532,"text":"\tdefault:"},
  {"line":533,"text":"\t\treturn nil"},
  {"line":534,"text":"\t}"},
  {"line":535,"text":"}"},
  {"line":537,"text":"func stringLiteralCompletionsForObjectLiteral("},
  {"line":538,"text":"\ttypeChecker *checker.Checker,"},
  {"line":539,"text":"\tobjectLiteralExpression *ast.ObjectLiteralExpressionNode,"},
  {"line":540,"text":") *completionsFromProperties {"},
  {"line":541,"text":"\tcontextualType := typeChecker.GetContextualType(objectLiteralExpression, checker.ContextFlagsNone)"},
  {"line":542,"text":"\tif contextualType == nil {"},
  {"line":543,"text":"\t\treturn nil"},
  {"line":544,"text":"\t}"},
  {"line":546,"text":"\tcompletionsType := typeChecker.GetContextualType(objectLiteralExpression, checker.ContextFlagsIgnoreNodeInferences)"},
  {"line":547,"text":"\tsymbols := getPropertiesForObjectExpression("},
  {"line":548,"text":"\t\tcontextualType,"},
  {"line":549,"text":"\t\tcompletionsType,"},
  {"line":550,"text":"\t\tobjectLiteralExpression,"},
  {"line":551,"text":"\t\ttypeChecker)"},
  {"line":553,"text":"\treturn &completionsFromProperties{"},
  {"line":554,"text":"\t\tsymbols:           symbols,"},
  {"line":555,"text":"\t\thasIndexSignature: hasIndexSignature(contextualType, typeChecker),"},
  {"line":556,"text":"\t}"},
  {"line":557,"text":"}"},
  {"line":559,"text":"func stringLiteralCompletionsFromProperties(t *checker.Type, typeChecker *checker.Checker) *completionsFromProperties {"},
  {"line":560,"text":"\treturn &completionsFromProperties{"},
  {"line":561,"text":"\t\tsymbols: core.Filter(typeChecker.GetApparentProperties(t), func(s *ast.Symbol) bool {"},
  {"line":562,"text":"\t\t\treturn !(s.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(s.ValueDeclaration))"},
  {"line":563,"text":"\t\t}),"},
  {"line":564,"text":"\t\thasIndexSignature: hasIndexSignature(t, typeChecker),"},
  {"line":565,"text":"\t}"},
  {"line":566,"text":"}"},
  {"line":568,"text":"func (l *LanguageService) getStringLiteralCompletionsFromModuleNames("},
  {"line":569,"text":"\tfile *ast.SourceFile,"},
  {"line":570,"text":"\tnode *ast.LiteralExpression,"},
  {"line":571,"text":"\tprogram *compiler.Program,"},
  {"line":572,"text":"\tchecker *checker.Checker,"},
  {"line":573,"text":") *stringLiteralCompletions {"},
  {"line":574,"text":"\tnameAndKinds := l.getStringLiteralCompletionsFromModuleNamesWorker("},
  {"line":575,"text":"\t\tfile,"},
  {"line":576,"text":"\t\tnode,"},
  {"line":577,"text":"\t\tprogram,"},
  {"line":578,"text":"\t\tchecker,"},
  {"line":579,"text":"\t)"},
  {"line":580,"text":"\ttextStart := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/) + 1"},
  {"line":581,"text":"\treturn &stringLiteralCompletions{"},
  {"line":582,"text":"\t\tfromPaths: addReplacementSpans(node.Text(), textStart, nameAndKinds),"},
  {"line":583,"text":"\t}"},
  {"line":584,"text":"}"},
  {"line":586,"text":"func addReplacementSpans(text string, textStart int, names []moduleCompletionNameAndKind) []*pathCompletion {"},
  {"line":587,"text":"\ttextRange := getDirectoryFragmentRange(text, textStart)"},
  {"line":588,"text":"\treturn core.Map(names, func(nameAndKind moduleCompletionNameAndKind) *pathCompletion {"},
  {"line":589,"text":"\t\treturn &pathCompletion{"},
  {"line":590,"text":"\t\t\tname:      nameAndKind.name,"},
  {"line":591,"text":"\t\t\tkind:      moduletToScriptElementKind(nameAndKind.kind),"},
  {"line":592,"text":"\t\t\textension: nameAndKind.extension,"},
  {"line":593,"text":"\t\t\ttextRange: textRange,"},
  {"line":594,"text":"\t\t}"},
  {"line":595,"text":"\t})"},
  {"line":596,"text":"}"},
  {"line":598,"text":"func moduletToScriptElementKind(kind moduleCompletionKind) lsutil.ScriptElementKind {"},
  {"line":599,"text":"\tswitch kind {"},
  {"line":600,"text":"\tcase moduleCompletionKindDirectory:"},
  {"line":601,"text":"\t\treturn lsutil.ScriptElementKindDirectory"},
  {"line":602,"text":"\tcase moduleCompletionKindFile:"},
  {"line":603,"text":"\t\treturn lsutil.ScriptElementKindScriptElement"},
  {"line":604,"text":"\tcase moduleCompletionKindExternalModuleName:"},
  {"line":605,"text":"\t\treturn lsutil.ScriptElementKindExternalModuleName"},
  {"line":606,"text":"\t}"},
  {"line":607,"text":"\tpanic(fmt.Sprintf(\"Unknown moduleCompletionKind: %d\", kind))"},
  {"line":608,"text":"}"},
  {"line":610,"text":"func isAnyDirectorySeparator(r rune) bool {"},
  {"line":611,"text":"\treturn r == '/' || r == '\\\\'"},
  {"line":612,"text":"}"},
  {"line":615,"text":"func getDirectoryFragmentRange(text string, textStart int) *core.TextRange {"},
  {"line":616,"text":"\tindex := strings.LastIndexFunc(text, isAnyDirectorySeparator)"},
  {"line":617,"text":"\tvar offset int"},
  {"line":618,"text":"\tif index != -1 {"},
  {"line":619,"text":"\t\toffset = index + 1"},
  {"line":620,"text":"\t}"},
  {"line":621,"text":"\tlength := len(text) - offset"},
  {"line":622,"text":"\tif length == 0 {"},
  {"line":623,"text":"\t\treturn nil"},
  {"line":624,"text":"\t}"},
  {"line":625,"text":"\treturn new(core.NewTextRange(textStart+offset, textStart+offset+length))"},
  {"line":626,"text":"}"},
  {"line":628,"text":"func (l *LanguageService) getStringLiteralCompletionsFromModuleNamesWorker("},
  {"line":629,"text":"\tfile *ast.SourceFile,"},
  {"line":630,"text":"\tnode *ast.LiteralExpression,"},
  {"line":631,"text":"\tprogram *compiler.Program,"},
  {"line":632,"text":"\tchecker *checker.Checker,"},
  {"line":633,"text":") []moduleCompletionNameAndKind {"},
  {"line":634,"text":"\tliteralValue := tspath.NormalizeSlashes(node.Text())"},
  {"line":635,"text":"\tvar mode core.ResolutionMode"},
  {"line":636,"text":"\tif ast.IsStringLiteralLike(node) {"},
  {"line":637,"text":"\t\tmode = program.GetModeForUsageLocation(file, node)"},
  {"line":638,"text":"\t}"},
  {"line":640,"text":"\tscriptPath := file.Path()"},
  {"line":641,"text":"\tscriptDirectory := scriptPath.GetDirectoryPath()"},
  {"line":642,"text":"\toptions := program.Options()"},
  {"line":643,"text":"\textensionOptions := l.getExtensionOptions(options, referenceKindModuleSpecifier, file, mode, checker)"},
  {"line":645,"text":"\tif isPathRelativeToScript(literalValue) ||"},
  {"line":646,"text":"\t\t(options.Paths.Size() == 0 && (tspath.IsRootedDiskPath(literalValue) || tspath.IsUrl(literalValue))) {"},
  {"line":647,"text":"\t\treturn l.getCompletionEntriesForRelativeModules("},
  {"line":648,"text":"\t\t\tliteralValue,"},
  {"line":649,"text":"\t\t\tstring(scriptDirectory),"},
  {"line":650,"text":"\t\t\tprogram,"},
  {"line":651,"text":"\t\t\tscriptPath,"},
  {"line":652,"text":"\t\t\textensionOptions,"},
  {"line":653,"text":"\t\t)"},
  {"line":654,"text":"\t} else {"},
  {"line":655,"text":"\t\treturn l.getCompletionEntriesForNonRelativeModules("},
  {"line":656,"text":"\t\t\tliteralValue,"},
  {"line":657,"text":"\t\t\tstring(scriptDirectory),"},
  {"line":658,"text":"\t\t\tmode,"},
  {"line":659,"text":"\t\t\tprogram,"},
  {"line":660,"text":"\t\t\tchecker,"},
  {"line":661,"text":"\t\t\textensionOptions,"},
  {"line":662,"text":"\t\t)"},
  {"line":663,"text":"\t}"},
  {"line":664,"text":"}"},
  {"line":672,"text":"func (l *LanguageService) getCompletionEntriesForNonRelativeModules("},
  {"line":673,"text":"\tfragment string,"},
  {"line":674,"text":"\tscriptPath string,"},
  {"line":675,"text":"\tmode core.ResolutionMode,"},
  {"line":676,"text":"\tprogram *compiler.Program,"},
  {"line":677,"text":"\ttypeChecker *checker.Checker,"},
  {"line":678,"text":"\textensionOptions *extensionOptions,"},
  {"line":679,"text":") []moduleCompletionNameAndKind {"},
  {"line":680,"text":"\tcompilerOptions := program.Options()"},
  {"line":681,"text":"\tpaths := compilerOptions.Paths"},
  {"line":683,"text":"\tresult := &moduleCompletionNameAndKindSet{names: map[string]moduleCompletionNameAndKind{}}"},
  {"line":684,"text":"\tmoduleResolution := compilerOptions.GetModuleResolutionKind()"},
  {"line":686,"text":"\tif paths != nil && paths.Size() > 0 {"},
  {"line":687,"text":"\t\tabsolute := compilerOptions.GetPathsBasePath(program.GetCurrentDirectory())"},
  {"line":688,"text":"\t\tl.addCompletionEntriesFromPaths(result, program, fragment, absolute, extensionOptions, paths)"},
  {"line":689,"text":"\t}"},
  {"line":691,"text":"\tfragmentDirectory := getFragmentDirectory(fragment)"},
  {"line":692,"text":"\tfor _, ambientName := range getAmbientModuleCompletions(fragment, fragmentDirectory, typeChecker) {"},
  {"line":693,"text":"\t\tresult.add(moduleCompletionNameAndKind{"},
  {"line":694,"text":"\t\t\tname: ambientName,"},
  {"line":695,"text":"\t\t\tkind: moduleCompletionKindExternalModuleName,"},
  {"line":696,"text":"\t\t})"},
  {"line":697,"text":"\t}"},
  {"line":699,"text":"\tl.getCompletionEntriesFromTypings(program, scriptPath, fragmentDirectory, extensionOptions, result)"},
  {"line":701,"text":"\tif moduleResolutionUsesNodeModules(moduleResolution) {"},
  {"line":704,"text":"\t\tfoundGlobal := false"},
  {"line":705,"text":"\t\tif fragmentDirectory == \"\" {"},
  {"line":706,"text":"\t\t\tfor _, moduleName := range l.enumerateNodeModulesVisibleToScript(scriptPath) {"},
  {"line":707,"text":"\t\t\t\tmoduleResult := moduleCompletionNameAndKind{"},
  {"line":708,"text":"\t\t\t\t\tname: moduleName,"},
  {"line":709,"text":"\t\t\t\t\tkind: moduleCompletionKindExternalModuleName,"},
  {"line":710,"text":"\t\t\t\t}"},
  {"line":711,"text":"\t\t\t\tif _, has := result.names[moduleResult.name]; !has {"},
  {"line":712,"text":"\t\t\t\t\tfoundGlobal = true"},
  {"line":713,"text":"\t\t\t\t\tresult.add(moduleResult)"},
  {"line":714,"text":"\t\t\t\t}"},
  {"line":715,"text":"\t\t\t}"},
  {"line":716,"text":"\t\t}"},
  {"line":717,"text":"\t\tif !foundGlobal {"},
  {"line":718,"text":"\t\t\tresolvePackageJsonExports := compilerOptions.GetResolvePackageJsonExports()"},
  {"line":719,"text":"\t\t\tresolvePackageJsonImports := compilerOptions.GetResolvePackageJsonImports()"},
  {"line":720,"text":"\t\t\tseenPackageScope := false"},
  {"line":721,"text":"\t\t\tconditions := module.GetConditions(compilerOptions, mode)"},
  {"line":724,"text":"\t\t\texportsOrImportsLookup := func(lookupTable *packagejson.ExportsOrImports, fragment string, baseDirectory string, isExports bool, isImports bool) bool {"},
  {"line":725,"text":"\t\t\t\tif lookupTable == nil || lookupTable.Type != packagejson.JSONValueTypeObject {"},
  {"line":726,"text":"\t\t\t\t\treturn lookupTable != nil && lookupTable.Type != packagejson.JSONValueTypeNotPresent"},
  {"line":727,"text":"\t\t\t\t}"},
  {"line":728,"text":"\t\t\t\tkeys := lookupTable.AsObject().Keys()"},
  {"line":729,"text":"\t\t\t\tl.addCompletionEntriesFromPathsOrExportsOrImports("},
  {"line":730,"text":"\t\t\t\t\tresult,"},
  {"line":731,"text":"\t\t\t\t\tprogram,"},
  {"line":732,"text":"\t\t\t\t\tisExports,"},
  {"line":733,"text":"\t\t\t\t\tisImports,"},
  {"line":734,"text":"\t\t\t\t\tfragment,"},
  {"line":735,"text":"\t\t\t\t\tbaseDirectory,"},
  {"line":736,"text":"\t\t\t\t\textensionOptions,"},
  {"line":737,"text":"\t\t\t\t\tkeys,"},
  {"line":738,"text":"\t\t\t\t\tfunc(key string) []string {"},
  {"line":739,"text":"\t\t\t\t\t\tkeyValue, ok := lookupTable.AsObject().Get(key)"},
  {"line":740,"text":"\t\t\t\t\t\tif !ok {"},
  {"line":741,"text":"\t\t\t\t\t\t\treturn nil"},
  {"line":742,"text":"\t\t\t\t\t\t}"},
  {"line":743,"text":"\t\t\t\t\t\tpattern := getPatternFromFirstMatchingCondition(&keyValue, conditions)"},
  {"line":744,"text":"\t\t\t\t\t\tif pattern == \"\" {"},
  {"line":745,"text":"\t\t\t\t\t\t\treturn nil"},
  {"line":746,"text":"\t\t\t\t\t\t}"},
  {"line":747,"text":"\t\t\t\t\t\tif strings.HasSuffix(key, \"/\") && strings.HasSuffix(pattern, \"/\") {"},
  {"line":748,"text":"\t\t\t\t\t\t\treturn []string{pattern + \"*\"}"},
  {"line":749,"text":"\t\t\t\t\t\t}"},
  {"line":750,"text":"\t\t\t\t\t\treturn []string{pattern}"},
  {"line":751,"text":"\t\t\t\t\t},"},
  {"line":752,"text":"\t\t\t\t\tmodule.ComparePatternKeys,"},
  {"line":753,"text":"\t\t\t\t)"},
  {"line":754,"text":"\t\t\t\treturn true"},
  {"line":755,"text":"\t\t\t}"},
  {"line":757,"text":"\t\t\timportsLookup := func(directory string) {"},
  {"line":758,"text":"\t\t\t\tif resolvePackageJsonImports && !seenPackageScope {"},
  {"line":759,"text":"\t\t\t\t\tpackageFile := tspath.CombinePaths(directory, \"package.json\")"},
  {"line":760,"text":"\t\t\t\t\tpackageJsonInfo := program.GetPackageJsonInfo(packageFile)"},
  {"line":761,"text":"\t\t\t\t\tif packageJsonInfo != nil && packageJsonInfo.Exists() {"},
  {"line":762,"text":"\t\t\t\t\t\tseenPackageScope = true"},
  {"line":763,"text":"\t\t\t\t\t\texportsOrImportsLookup(&packageJsonInfo.Contents.Imports, fragment, directory, false /*isExports*/, true /*isImports*/)"},
  {"line":764,"text":"\t\t\t\t\t}"},
  {"line":765,"text":"\t\t\t\t}"},
  {"line":766,"text":"\t\t\t}"},
  {"line":768,"text":"\t\t\tancestorLookup := func(ancestor string) (any, bool) {"},
  {"line":769,"text":"\t\t\t\tnodeModules := tspath.CombinePaths(ancestor, \"node_modules\")"},
  {"line":770,"text":"\t\t\t\tif l.host.DirectoryExists(nodeModules) {"},
  {"line":771,"text":"\t\t\t\t\tl.getCompletionEntriesForDirectoryFragment("},
  {"line":772,"text":"\t\t\t\t\t\tfragment,"},
  {"line":773,"text":"\t\t\t\t\t\tnodeModules,"},
  {"line":774,"text":"\t\t\t\t\t\textensionOptions,"},
  {"line":775,"text":"\t\t\t\t\t\tprogram,"},
  {"line":776,"text":"\t\t\t\t\t\tfalse, /* moduleSpecifierIsRelative */"},
  {"line":777,"text":"\t\t\t\t\t\t\"\","},
  {"line":778,"text":"\t\t\t\t\t\tresult,"},
  {"line":779,"text":"\t\t\t\t\t)"},
  {"line":780,"text":"\t\t\t\t}"},
  {"line":781,"text":"\t\t\t\timportsLookup(ancestor)"},
  {"line":782,"text":"\t\t\t\treturn nil, false"},
  {"line":783,"text":"\t\t\t}"},
  {"line":785,"text":"\t\t\tif fragmentDirectory != \"\" && resolvePackageJsonExports {"},
  {"line":786,"text":"\t\t\t\tnodeModulesDirectoryOrImportsLookup := ancestorLookup"},
  {"line":787,"text":"\t\t\t\tancestorLookup = func(ancestor string) (any, bool) {"},
  {"line":788,"text":"\t\t\t\t\tcomponents := tspath.GetPathComponents(fragment, \"\")"},
  {"line":789,"text":"\t\t\t\t\tcomponents = components[1:] // shift off empty root"},
  {"line":790,"text":"\t\t\t\t\tif len(components) == 0 {"},
  {"line":791,"text":"\t\t\t\t\t\tnodeModulesDirectoryOrImportsLookup(ancestor)"},
  {"line":792,"text":"\t\t\t\t\t\treturn nil, false"},
  {"line":793,"text":"\t\t\t\t\t}"},
  {"line":794,"text":"\t\t\t\t\tpackagePath := components[0]"},
  {"line":795,"text":"\t\t\t\t\tcomponents = components[1:]"},
  {"line":796,"text":"\t\t\t\t\tif strings.HasPrefix(packagePath, \"@\") {"},
  {"line":797,"text":"\t\t\t\t\t\tif len(components) == 0 {"},
  {"line":798,"text":"\t\t\t\t\t\t\tnodeModulesDirectoryOrImportsLookup(ancestor)"},
  {"line":799,"text":"\t\t\t\t\t\t\treturn nil, false"},
  {"line":800,"text":"\t\t\t\t\t\t}"},
  {"line":801,"text":"\t\t\t\t\t\tsubName := components[0]"},
  {"line":802,"text":"\t\t\t\t\t\tcomponents = components[1:]"},
  {"line":803,"text":"\t\t\t\t\t\tpackagePath = tspath.CombinePaths(packagePath, subName)"},
  {"line":804,"text":"\t\t\t\t\t}"},
  {"line":805,"text":"\t\t\t\t\tif resolvePackageJsonImports && strings.HasPrefix(packagePath, \"#\") {"},
  {"line":806,"text":"\t\t\t\t\t\timportsLookup(ancestor)"},
  {"line":807,"text":"\t\t\t\t\t\treturn nil, false"},
  {"line":808,"text":"\t\t\t\t\t}"},
  {"line":809,"text":"\t\t\t\t\tpackageDirectory := tspath.CombinePaths(ancestor, \"node_modules\", packagePath)"},
  {"line":810,"text":"\t\t\t\t\tpackageFile := tspath.CombinePaths(packageDirectory, \"package.json\")"},
  {"line":811,"text":"\t\t\t\t\tpackageJsonInfo := program.GetPackageJsonInfo(packageFile)"},
  {"line":812,"text":"\t\t\t\t\tif packageJsonInfo != nil && packageJsonInfo.Exists() {"},
  {"line":813,"text":"\t\t\t\t\t\tfragmentSubpath := strings.Join(components, \"/\")"},
  {"line":814,"text":"\t\t\t\t\t\tif len(components) > 0 && tspath.HasTrailingDirectorySeparator(fragment) {"},
  {"line":815,"text":"\t\t\t\t\t\t\tfragmentSubpath += \"/\""},
  {"line":816,"text":"\t\t\t\t\t\t}"},
  {"line":817,"text":"\t\t\t\t\t\tif exportsOrImportsLookup("},
  {"line":818,"text":"\t\t\t\t\t\t\t&packageJsonInfo.Contents.Exports,"},
  {"line":819,"text":"\t\t\t\t\t\t\tfragmentSubpath,"},
  {"line":820,"text":"\t\t\t\t\t\t\tpackageDirectory,"},
  {"line":821,"text":"\t\t\t\t\t\t\ttrue,  /*isExports*/"},
  {"line":822,"text":"\t\t\t\t\t\t\tfalse, /*isImports*/"},
  {"line":823,"text":"\t\t\t\t\t\t) {"},
  {"line":824,"text":"\t\t\t\t\t\t\treturn nil, false"},
  {"line":825,"text":"\t\t\t\t\t\t}"},
  {"line":826,"text":"\t\t\t\t\t}"},
  {"line":827,"text":"\t\t\t\t\tnodeModulesDirectoryOrImportsLookup(ancestor)"},
  {"line":828,"text":"\t\t\t\t\treturn nil, false"},
  {"line":829,"text":"\t\t\t\t}"},
  {"line":830,"text":"\t\t\t}"},
  {"line":832,"text":"\t\t\tglobalCacheLocation := program.GetGlobalTypingsCacheLocation()"},
  {"line":833,"text":"\t\t\ttspath.ForEachAncestorDirectoryStoppingAtGlobalCache(globalCacheLocation, scriptPath, ancestorLookup)"},
  {"line":834,"text":"\t\t}"},
  {"line":835,"text":"\t}"},
  {"line":837,"text":"\treturn slices.Collect(maps.Values(result.names))"},
  {"line":838,"text":"}"},
  {"line":840,"text":"func getFragmentDirectory(fragment string) string {"},
  {"line":841,"text":"\tif !containsSlash(fragment) {"},
  {"line":842,"text":"\t\treturn \"\""},
  {"line":843,"text":"\t}"},
  {"line":844,"text":"\tif tspath.HasTrailingDirectorySeparator(fragment) {"},
  {"line":845,"text":"\t\treturn fragment"},
  {"line":846,"text":"\t}"},
  {"line":847,"text":"\treturn tspath.GetDirectoryPath(fragment)"},
  {"line":848,"text":"}"},
  {"line":850,"text":"func getPatternFromFirstMatchingCondition(target *packagejson.ExportsOrImports, conditions []string) string {"},
  {"line":851,"text":"\tif target.Type == packagejson.JSONValueTypeString {"},
  {"line":852,"text":"\t\treturn target.AsString()"},
  {"line":853,"text":"\t}"},
  {"line":854,"text":"\tif target.Type == packagejson.JSONValueTypeObject {"},
  {"line":855,"text":"\t\tobj := target.AsObject()"},
  {"line":856,"text":"\t\tfor condition := range obj.Keys() {"},
  {"line":857,"text":"\t\t\tif condition == \"default\" || slices.Contains(conditions, condition) ||"},
  {"line":858,"text":"\t\t\t\t(slices.Contains(conditions, \"types\") && module.IsApplicableVersionedTypesKey(condition)) {"},
  {"line":859,"text":"\t\t\t\tpattern, ok := obj.Get(condition)"},
  {"line":860,"text":"\t\t\t\tif ok {"},
  {"line":861,"text":"\t\t\t\t\treturn getPatternFromFirstMatchingCondition(&pattern, conditions)"},
  {"line":862,"text":"\t\t\t\t}"},
  {"line":863,"text":"\t\t\t}"},
  {"line":864,"text":"\t\t}"},
  {"line":865,"text":"\t}"},
  {"line":866,"text":"\treturn \"\""},
  {"line":867,"text":"}"},
  {"line":869,"text":"func getAmbientModuleCompletions(fragment string, fragmentDirectory string, typeChecker *checker.Checker) []string {"},
  {"line":870,"text":"\tambientModules := typeChecker.GetAmbientModules()"},
  {"line":871,"text":"\tvar nonRelativeModuleNames []string"},
  {"line":872,"text":"\tfor _, sym := range ambientModules {"},
  {"line":873,"text":"\t\tmoduleName := stringutil.StripQuotes(sym.Name)"},
  {"line":874,"text":"\t\tif strings.HasPrefix(moduleName, fragment) && !strings.Contains(moduleName, \"*\") {"},
  {"line":875,"text":"\t\t\tnonRelativeModuleNames = append(nonRelativeModuleNames, moduleName)"},
  {"line":876,"text":"\t\t}"},
  {"line":877,"text":"\t}"},
  {"line":879,"text":"\tif fragmentDirectory != \"\" {"},
  {"line":880,"text":"\t\tmoduleNameWithSeparator := tspath.EnsureTrailingDirectorySeparator(fragmentDirectory)"},
  {"line":881,"text":"\t\tfor i, moduleName := range nonRelativeModuleNames {"},
  {"line":882,"text":"\t\t\tnonRelativeModuleNames[i] = strings.TrimPrefix(moduleName, moduleNameWithSeparator)"},
  {"line":883,"text":"\t\t}"},
  {"line":884,"text":"\t}"},
  {"line":885,"text":"\treturn nonRelativeModuleNames"},
  {"line":886,"text":"}"},
  {"line":888,"text":"func (l *LanguageService) getCompletionEntriesFromTypings("},
  {"line":889,"text":"\tprogram *compiler.Program,"},
  {"line":890,"text":"\tscriptPath string,"},
  {"line":891,"text":"\tfragmentDirectory string,"},
  {"line":892,"text":"\textensionOptions *extensionOptions,"},
  {"line":893,"text":"\tresult *moduleCompletionNameAndKindSet,"},
  {"line":894,"text":") {"},
  {"line":895,"text":"\toptions := program.Options()"},
  {"line":896,"text":"\tseen := make(map[string]bool)"},
  {"line":898,"text":"\ttypeRoots, _ := options.GetEffectiveTypeRoots(program.GetCurrentDirectory())"},
  {"line":900,"text":"\tfor _, root := range typeRoots {"},
  {"line":901,"text":"\t\tl.getCompletionEntriesFromTypingsDirectories(root, options, fragmentDirectory, extensionOptions, program, seen, result)"},
  {"line":902,"text":"\t}"},
  {"line":904,"text":"\tglobalCacheLocation := program.GetGlobalTypingsCacheLocation()"},
  {"line":905,"text":"\ttspath.ForEachAncestorDirectoryStoppingAtGlobalCache(globalCacheLocation, scriptPath, func(directory string) (any, bool) {"},
  {"line":906,"text":"\t\ttypesDir := tspath.CombinePaths(directory, \"node_modules/@types\")"},
  {"line":907,"text":"\t\tl.getCompletionEntriesFromTypingsDirectories(typesDir, options, fragmentDirectory, extensionOptions, program, seen, result)"},
  {"line":908,"text":"\t\treturn nil, false"},
  {"line":909,"text":"\t})"},
  {"line":910,"text":"}"},
  {"line":912,"text":"func (l *LanguageService) getCompletionEntriesFromTypingsDirectories("},
  {"line":913,"text":"\tdirectory string,"},
  {"line":914,"text":"\toptions *core.CompilerOptions,"},
  {"line":915,"text":"\tfragmentDirectory string,"},
  {"line":916,"text":"\textensionOptions *extensionOptions,"},
  {"line":917,"text":"\tprogram *compiler.Program,"},
  {"line":918,"text":"\tseen map[string]bool,"},
  {"line":919,"text":"\tresult *moduleCompletionNameAndKindSet,"},
  {"line":920,"text":") {"},
  {"line":921,"text":"\tif !l.host.DirectoryExists(directory) {"},
  {"line":922,"text":"\t\treturn"},
  {"line":923,"text":"\t}"},
  {"line":925,"text":"\tfor _, typeDirectoryName := range l.GetDirectories(directory) {"},
  {"line":926,"text":"\t\tpackageName := module.UnmangleScopedPackageName(typeDirectoryName)"},
  {"line":927,"text":"\t\tif len(options.Types) > 0 && !slices.Contains(options.Types, packageName) {"},
  {"line":928,"text":"\t\t\tcontinue"},
  {"line":929,"text":"\t\t}"},
  {"line":931,"text":"\t\tif fragmentDirectory == \"\" {"},
  {"line":932,"text":"\t\t\tif !seen[packageName] {"},
  {"line":933,"text":"\t\t\t\tresult.add(moduleCompletionNameAndKind{"},
  {"line":934,"text":"\t\t\t\t\tname: packageName,"},
  {"line":935,"text":"\t\t\t\t\tkind: moduleCompletionKindExternalModuleName,"},
  {"line":936,"text":"\t\t\t\t})"},
  {"line":937,"text":"\t\t\t\tseen[packageName] = true"},
  {"line":938,"text":"\t\t\t}"},
  {"line":939,"text":"\t\t} else {"},
  {"line":940,"text":"\t\t\tbaseDirectory := tspath.CombinePaths(directory, typeDirectoryName)"},
  {"line":941,"text":"\t\t\tremainingFragment := tryRemoveDirectoryPrefix(fragmentDirectory, packageName, program.UseCaseSensitiveFileNames())"},
  {"line":942,"text":"\t\t\tif remainingFragment != nil {"},
  {"line":943,"text":"\t\t\t\tl.getCompletionEntriesForDirectoryFragment("},
  {"line":944,"text":"\t\t\t\t\t*remainingFragment,"},
  {"line":945,"text":"\t\t\t\t\tbaseDirectory,"},
  {"line":946,"text":"\t\t\t\t\textensionOptions,"},
  {"line":947,"text":"\t\t\t\t\tprogram,"},
  {"line":948,"text":"\t\t\t\t\tfalse,"},
  {"line":949,"text":"\t\t\t\t\t\"\","},
  {"line":950,"text":"\t\t\t\t\tresult,"},
  {"line":951,"text":"\t\t\t\t)"},
  {"line":952,"text":"\t\t\t}"},
  {"line":953,"text":"\t\t}"},
  {"line":954,"text":"\t}"},
  {"line":955,"text":"}"},
  {"line":957,"text":"func tryRemoveDirectoryPrefix(path string, prefix string, useCaseSensitiveFileNames bool) *string {"},
  {"line":958,"text":"\tcanonicalPath := tspath.GetCanonicalFileName(path, useCaseSensitiveFileNames)"},
  {"line":959,"text":"\tcanonicalPrefix := tspath.GetCanonicalFileName(prefix, useCaseSensitiveFileNames)"},
  {"line":960,"text":"\tif strings.HasPrefix(canonicalPath, canonicalPrefix) {"},
  {"line":961,"text":"\t\twithoutPrefix := path[len(prefix):]"},
  {"line":962,"text":"\t\tif strings.HasPrefix(withoutPrefix, \"/\") || strings.HasPrefix(withoutPrefix, \"\\\\\") {"},
  {"line":963,"text":"\t\t\twithoutPrefix = withoutPrefix[1:]"},
  {"line":964,"text":"\t\t}"},
  {"line":965,"text":"\t\treturn &withoutPrefix"},
  {"line":966,"text":"\t}"},
  {"line":967,"text":"\treturn nil"},
  {"line":968,"text":"}"},
  {"line":970,"text":"func (l *LanguageService) enumerateNodeModulesVisibleToScript(scriptPath string) []string {"},
  {"line":971,"text":"\tvar result []string"},
  {"line":972,"text":"\tglobalCacheLocation := l.program.GetGlobalTypingsCacheLocation()"},
  {"line":974,"text":"\ttspath.ForEachAncestorDirectoryStoppingAtGlobalCache(globalCacheLocation, scriptPath, func(directory string) (any, bool) {"},
  {"line":975,"text":"\t\tpackageJsonPath := tspath.CombinePaths(directory, \"package.json\")"},
  {"line":976,"text":"\t\tpackageJsonInfo := l.program.GetPackageJsonInfo(packageJsonPath)"},
  {"line":977,"text":"\t\tif packageJsonInfo != nil && packageJsonInfo.Exists() && packageJsonInfo.Contents != nil {"},
  {"line":978,"text":"\t\t\tpackageJsonInfo.Contents.RangeDependencies(func(name, version, dependencyField string) bool {"},
  {"line":979,"text":"\t\t\t\tif !strings.HasPrefix(name, \"@types/\") {"},
  {"line":980,"text":"\t\t\t\t\tresult = append(result, name)"},
  {"line":981,"text":"\t\t\t\t}"},
  {"line":982,"text":"\t\t\t\treturn true"},
  {"line":983,"text":"\t\t\t})"},
  {"line":984,"text":"\t\t}"},
  {"line":985,"text":"\t\treturn nil, false"},
  {"line":986,"text":"\t})"},
  {"line":988,"text":"\treturn result"},
  {"line":989,"text":"}"},
  {"line":991,"text":"func (l *LanguageService) getExtensionOptions("},
  {"line":992,"text":"\toptions *core.CompilerOptions,"},
  {"line":993,"text":"\treferenceKind referenceKind,"},
  {"line":994,"text":"\tfile *ast.SourceFile,"},
  {"line":995,"text":"\tmode core.ResolutionMode,"},
  {"line":996,"text":"\tchecker *checker.Checker,"},
  {"line":997,"text":") *extensionOptions {"},
  {"line":998,"text":"\textensionsToSearch := getSupportedExtensionsForModuleResolution(options, checker)"},
  {"line":1000,"text":"\treturn &extensionOptions{"},
  {"line":1001,"text":"\t\textensionsToSearch:  extensionsToSearch,"},
  {"line":1002,"text":"\t\treferenceKind:       referenceKind,"},
  {"line":1003,"text":"\t\timportingSourceFile: file,"},
  {"line":1004,"text":"\t\tendingPreference:    l.UserPreferences().ImportModuleSpecifierEnding,"},
  {"line":1005,"text":"\t\tresolutionMode:      mode,"},
  {"line":1006,"text":"\t}"},
  {"line":1007,"text":"}"},
  {"line":1009,"text":"func getSupportedExtensionsForModuleResolution(options *core.CompilerOptions, checker *checker.Checker) []string {"},
  {"line":1010,"text":"\t/** file extensions from ambient modules declarations e.g. *.css */"},
  {"line":1011,"text":"\tvar extensions []string"},
  {"line":1012,"text":"\tif checker != nil {"},
  {"line":1013,"text":"\t\tambientModules := checker.GetAmbientModules()"},
  {"line":1014,"text":"\t\tfor _, module := range ambientModules {"},
  {"line":1015,"text":"\t\t\tname := stringutil.StripQuotes(module.Name)"},
  {"line":1016,"text":"\t\t\tif !strings.HasPrefix(name, \"*.\") || strings.Contains(name, \"/\") {"},
  {"line":1017,"text":"\t\t\t\tcontinue"},
  {"line":1018,"text":"\t\t\t}"},
  {"line":1019,"text":"\t\t\textensions = append(extensions, name[1:])"},
  {"line":1020,"text":"\t\t}"},
  {"line":1021,"text":"\t}"},
  {"line":1022,"text":"\tsupportedExtensions := tsoptions.GetSupportedExtensions(options, nil /*extraFileExtensions*/)"},
  {"line":1023,"text":"\tfor _, ext := range supportedExtensions {"},
  {"line":1024,"text":"\t\textensions = append(extensions, ext...)"},
  {"line":1025,"text":"\t}"},
  {"line":1026,"text":"\tmoduleResolution := options.GetModuleResolutionKind()"},
  {"line":1027,"text":"\tif moduleResolutionUsesNodeModules(moduleResolution) {"},
  {"line":1028,"text":"\t\treturn core.Flatten(tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(options, [][]string{extensions}))"},
  {"line":1029,"text":"\t}"},
  {"line":1030,"text":"\treturn extensions"},
  {"line":1031,"text":"}"},
  {"line":1033,"text":"func moduleResolutionUsesNodeModules(moduleResolution core.ModuleResolutionKind) bool {"},
  {"line":1034,"text":"\treturn moduleResolution >= core.ModuleResolutionKindNode16 && moduleResolution <= core.ModuleResolutionKindNodeNext ||"},
  {"line":1035,"text":"\t\tmoduleResolution == core.ModuleResolutionKindBundler"},
  {"line":1036,"text":"}"},
  {"line":1039,"text":"func isPathRelativeToScript(path string) bool {"},
  {"line":1040,"text":"\treturn strings.HasPrefix(path, \"./\") || strings.HasPrefix(path, \"../\")"},
  {"line":1041,"text":"}"},
  {"line":1043,"text":"func (l *LanguageService) getCompletionEntriesForRelativeModules("},
  {"line":1044,"text":"\tliteralValue string,"},
  {"line":1045,"text":"\tscriptDirectory string,"},
  {"line":1046,"text":"\tprogram *compiler.Program,"},
  {"line":1047,"text":"\tscriptPath tspath.Path,"},
  {"line":1048,"text":"\textensionOptions *extensionOptions,"},
  {"line":1049,"text":") []moduleCompletionNameAndKind {"},
  {"line":1050,"text":"\toptions := program.Options()"},
  {"line":1051,"text":"\tif len(options.RootDirs) > 0 {"},
  {"line":1052,"text":"\t\treturn l.getCompletionEntriesForDirectoryFragmentWithRootDirs("},
  {"line":1053,"text":"\t\t\toptions.RootDirs,"},
  {"line":1054,"text":"\t\t\tliteralValue,"},
  {"line":1055,"text":"\t\t\tscriptDirectory,"},
  {"line":1056,"text":"\t\t\tprogram,"},
  {"line":1057,"text":"\t\t\tstring(scriptPath),"},
  {"line":1058,"text":"\t\t\textensionOptions,"},
  {"line":1059,"text":"\t\t)"},
  {"line":1060,"text":"\t} else {"},
  {"line":1061,"text":"\t\tresult := l.getCompletionEntriesForDirectoryFragment("},
  {"line":1062,"text":"\t\t\tliteralValue,"},
  {"line":1063,"text":"\t\t\tscriptDirectory,"},
  {"line":1064,"text":"\t\t\textensionOptions,"},
  {"line":1065,"text":"\t\t\tprogram,"},
  {"line":1066,"text":"\t\t\ttrue, /*moduleSpecifierIsRelative*/"},
  {"line":1067,"text":"\t\t\tstring(scriptPath),"},
  {"line":1068,"text":"\t\t\t&moduleCompletionNameAndKindSet{names: map[string]moduleCompletionNameAndKind{}},"},
  {"line":1069,"text":"\t\t)"},
  {"line":1070,"text":"\t\treturn slices.Collect(maps.Values(result.names))"},
  {"line":1071,"text":"\t}"},
  {"line":1072,"text":"}"},
  {"line":1074,"text":"func (l *LanguageService) getCompletionEntriesForDirectoryFragmentWithRootDirs("},
  {"line":1075,"text":"\trootDirs []string,"},
  {"line":1076,"text":"\tfragment string,"},
  {"line":1077,"text":"\tscriptDirectory string,"},
  {"line":1078,"text":"\tprogram *compiler.Program,"},
  {"line":1079,"text":"\texclude string,"},
  {"line":1080,"text":"\textensionOptions *extensionOptions,"},
  {"line":1081,"text":") []moduleCompletionNameAndKind {"},
  {"line":1082,"text":"\toptions := program.Options()"},
  {"line":1083,"text":"\tvar basePath string"},
  {"line":1084,"text":"\tif options.Project != \"\" {"},
  {"line":1085,"text":"\t\tbasePath = options.Project"},
  {"line":1086,"text":"\t} else {"},
  {"line":1087,"text":"\t\tbasePath = program.GetCurrentDirectory()"},
  {"line":1088,"text":"\t}"},
  {"line":1089,"text":"\tignoreCase := !program.UseCaseSensitiveFileNames()"},
  {"line":1090,"text":"\tbaseDirectories := getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptDirectory, ignoreCase)"},
  {"line":1092,"text":"\tvar allCompletions []moduleCompletionNameAndKind"},
  {"line":1093,"text":"\tfor _, baseDirectory := range baseDirectories {"},
  {"line":1094,"text":"\t\tresult := l.getCompletionEntriesForDirectoryFragment("},
  {"line":1095,"text":"\t\t\tfragment,"},
  {"line":1096,"text":"\t\t\tbaseDirectory,"},
  {"line":1097,"text":"\t\t\textensionOptions,"},
  {"line":1098,"text":"\t\t\tprogram,"},
  {"line":1099,"text":"\t\t\ttrue, /*moduleSpecifierIsRelative*/"},
  {"line":1100,"text":"\t\t\texclude,"},
  {"line":1101,"text":"\t\t\t&moduleCompletionNameAndKindSet{names: map[string]moduleCompletionNameAndKind{}},"},
  {"line":1102,"text":"\t\t)"},
  {"line":1103,"text":"\t\tfor _, entry := range result.names {"},
  {"line":1104,"text":"\t\t\tallCompletions = append(allCompletions, entry)"},
  {"line":1105,"text":"\t\t}"},
  {"line":1106,"text":"\t}"},
  {"line":1109,"text":"\treturn deduplicateModuleCompletions(allCompletions)"},
  {"line":1110,"text":"}"},
  {"line":1114,"text":"func getBaseDirectoriesFromRootDirs(rootDirs []string, basePath string, scriptDirectory string, ignoreCase bool) []string {"},
  {"line":1116,"text":"\tnormalizedRootDirs := make([]string, len(rootDirs))"},
  {"line":1117,"text":"\tfor i, rootDirectory := range rootDirs {"},
  {"line":1118,"text":"\t\tvar normalizedPath string"},
  {"line":1119,"text":"\t\tif tspath.IsRootedDiskPath(rootDirectory) {"},
  {"line":1120,"text":"\t\t\tnormalizedPath = rootDirectory"},
  {"line":1121,"text":"\t\t} else {"},
  {"line":1122,"text":"\t\t\tnormalizedPath = tspath.CombinePaths(basePath, rootDirectory)"},
  {"line":1123,"text":"\t\t}"},
  {"line":1124,"text":"\t\tnormalizedRootDirs[i] = tspath.EnsureTrailingDirectorySeparator(tspath.NormalizePath(normalizedPath))"},
  {"line":1125,"text":"\t}"},
  {"line":1128,"text":"\tvar relativeDirectory string"},
  {"line":1129,"text":"\tcomparePathsOptions := tspath.ComparePathsOptions{"},
  {"line":1130,"text":"\t\tUseCaseSensitiveFileNames: !ignoreCase,"},
  {"line":1131,"text":"\t\tCurrentDirectory:          basePath,"},
  {"line":1132,"text":"\t}"},
  {"line":1133,"text":"\tfor _, rootDirectory := range normalizedRootDirs {"},
  {"line":1134,"text":"\t\tif tspath.ContainsPath(rootDirectory, scriptDirectory, comparePathsOptions) {"},
  {"line":1135,"text":"\t\t\tif len(rootDirectory) > len(scriptDirectory) {"},
  {"line":1136,"text":"\t\t\t\trelativeDirectory = \"\""},
  {"line":1137,"text":"\t\t\t} else {"},
  {"line":1138,"text":"\t\t\t\trelativeDirectory = scriptDirectory[len(rootDirectory):]"},
  {"line":1139,"text":"\t\t\t}"},
  {"line":1140,"text":"\t\t\tbreak"},
  {"line":1141,"text":"\t\t}"},
  {"line":1142,"text":"\t}"},
  {"line":1145,"text":"\tvar directories []string"},
  {"line":1146,"text":"\tfor _, rootDirectory := range normalizedRootDirs {"},
  {"line":1147,"text":"\t\tdirectories = append(directories, tspath.RemoveTrailingDirectorySeparator(tspath.CombinePaths(rootDirectory, relativeDirectory)))"},
  {"line":1148,"text":"\t}"},
  {"line":1149,"text":"\tdirectories = append(directories, tspath.RemoveTrailingDirectorySeparator(scriptDirectory))"},
  {"line":1151,"text":"\treturn deduplicateStrings(directories)"},
  {"line":1152,"text":"}"},
  {"line":1154,"text":"func deduplicateStrings(slice []string) []string {"},
  {"line":1155,"text":"\tif len(slice) <= 1 {"},
  {"line":1156,"text":"\t\treturn slice"},
  {"line":1157,"text":"\t}"},
  {"line":1158,"text":"\tseen := make(map[string]bool)"},
  {"line":1159,"text":"\tvar result []string"},
  {"line":1160,"text":"\tfor _, s := range slice {"},
  {"line":1161,"text":"\t\tif !seen[s] {"},
  {"line":1162,"text":"\t\t\tseen[s] = true"},
  {"line":1163,"text":"\t\t\tresult = append(result, s)"},
  {"line":1164,"text":"\t\t}"},
  {"line":1165,"text":"\t}"},
  {"line":1166,"text":"\treturn result"},
  {"line":1167,"text":"}"},
  {"line":1169,"text":"func deduplicateModuleCompletions(completions []moduleCompletionNameAndKind) []moduleCompletionNameAndKind {"},
  {"line":1170,"text":"\tif len(completions) <= 1 {"},
  {"line":1171,"text":"\t\treturn completions"},
  {"line":1172,"text":"\t}"},
  {"line":1173,"text":"\ttype key struct {"},
  {"line":1174,"text":"\t\tname      string"},
  {"line":1175,"text":"\t\tkind      moduleCompletionKind"},
  {"line":1176,"text":"\t\textension string"},
  {"line":1177,"text":"\t}"},
  {"line":1178,"text":"\tseen := make(map[key]bool)"},
  {"line":1179,"text":"\tvar result []moduleCompletionNameAndKind"},
  {"line":1180,"text":"\tfor _, c := range completions {"},
  {"line":1181,"text":"\t\tk := key{name: c.name, kind: c.kind, extension: c.extension}"},
  {"line":1182,"text":"\t\tif !seen[k] {"},
  {"line":1183,"text":"\t\t\tseen[k] = true"},
  {"line":1184,"text":"\t\t\tresult = append(result, c)"},
  {"line":1185,"text":"\t\t}"},
  {"line":1186,"text":"\t}"},
  {"line":1187,"text":"\treturn result"},
  {"line":1188,"text":"}"},
  {"line":1190,"text":"type moduleCompletionKind int"},
  {"line":1192,"text":"const ("},
  {"line":1193,"text":"\tmoduleCompletionKindDirectory moduleCompletionKind = iota"},
  {"line":1194,"text":"\tmoduleCompletionKindFile"},
  {"line":1195,"text":"\tmoduleCompletionKindExternalModuleName"},
  {"line":1196,"text":")"},
  {"line":1198,"text":"type moduleCompletionNameAndKind struct {"},
  {"line":1199,"text":"\tname      string"},
  {"line":1200,"text":"\tkind      moduleCompletionKind"},
  {"line":1201,"text":"\textension string"},
  {"line":1202,"text":"}"},
  {"line":1204,"text":"type moduleCompletionNameAndKindSet struct {"},
  {"line":1205,"text":"\tnames map[string]moduleCompletionNameAndKind"},
  {"line":1206,"text":"}"},
  {"line":1208,"text":"func (s *moduleCompletionNameAndKindSet) add(entry moduleCompletionNameAndKind) {"},
  {"line":1209,"text":"\texisting, ok := s.names[entry.name]"},
  {"line":1210,"text":"\tif !ok || existing.kind < entry.kind {"},
  {"line":1211,"text":"\t\ts.names[entry.name] = entry"},
  {"line":1212,"text":"\t}"},
  {"line":1213,"text":"}"},
  {"line":1215,"text":"type extensionOptions struct {"},
  {"line":1216,"text":"\textensionsToSearch  []string"},
  {"line":1217,"text":"\treferenceKind       referenceKind"},
  {"line":1218,"text":"\timportingSourceFile *ast.SourceFile"},
  {"line":1219,"text":"\tendingPreference    modulespecifiers.ImportModuleSpecifierEndingPreference"},
  {"line":1220,"text":"\tresolutionMode      core.ResolutionMode"},
  {"line":1221,"text":"}"},
  {"line":1223,"text":"type referenceKind int"},
  {"line":1225,"text":"const ("},
  {"line":1226,"text":"\treferenceKindFileName referenceKind = iota"},
  {"line":1227,"text":"\treferenceKindModuleSpecifier"},
  {"line":1228,"text":")"},
  {"line":1231,"text":"func (l *LanguageService) getCompletionEntriesForDirectoryFragment("},
  {"line":1232,"text":"\tfragment string,"},
  {"line":1233,"text":"\tscriptDirectory string,"},
  {"line":1234,"text":"\textensionOptions *extensionOptions,"},
  {"line":1235,"text":"\tprogram *compiler.Program,"},
  {"line":1236,"text":"\tmoduleSpecifierIsRelative bool,"},
  {"line":1237,"text":"\texclude string,"},
  {"line":1238,"text":"\tresult *moduleCompletionNameAndKindSet,"},
  {"line":1239,"text":") *moduleCompletionNameAndKindSet {"},
  {"line":1240,"text":"\tfragment = tspath.NormalizeSlashes(fragment)"},
  {"line":1244,"text":"\tif !tspath.HasTrailingDirectorySeparator(fragment) {"},
  {"line":1245,"text":"\t\tfragment = tspath.GetDirectoryPath(fragment)"},
  {"line":1246,"text":"\t}"},
  {"line":1248,"text":"\tif fragment == \"\" {"},
  {"line":1249,"text":"\t\tfragment = \".\""},
  {"line":1250,"text":"\t}"},
  {"line":1252,"text":"\tfragment = tspath.EnsureTrailingDirectorySeparator(fragment)"},
  {"line":1254,"text":"\tbaseDirectory := tspath.ResolvePath(scriptDirectory, fragment)"},
  {"line":1255,"text":"\tif !moduleSpecifierIsRelative {"},
  {"line":1257,"text":"\t\tpackageJsonDirectory := program.GetNearestAncestorDirectoryWithPackageJson(baseDirectory)"},
  {"line":1258,"text":"\t\tif packageJsonDirectory != \"\" {"},
  {"line":1259,"text":"\t\t\tpackageJsonPath := tspath.CombinePaths(packageJsonDirectory, \"package.json\")"},
  {"line":1260,"text":"\t\t\tpackageJsonInfo := program.GetPackageJsonInfo(packageJsonPath)"},
  {"line":1261,"text":"\t\t\tif packageJsonInfo != nil && packageJsonInfo.Contents != nil &&"},
  {"line":1262,"text":"\t\t\t\tpackageJsonInfo.Contents.TypesVersions.Type == packagejson.JSONValueTypeObject {"},
  {"line":1263,"text":"\t\t\t\tversionPaths := packageJsonInfo.Contents.GetVersionPaths(nil)"},
  {"line":1264,"text":"\t\t\t\tpaths := versionPaths.GetPaths()"},
  {"line":1265,"text":"\t\t\t\tif paths.Size() > 0 {"},
  {"line":1266,"text":"\t\t\t\t\tpathInPackage := baseDirectory[len(tspath.EnsureTrailingDirectorySeparator(packageJsonDirectory)):]"},
  {"line":1267,"text":"\t\t\t\t\tif l.addCompletionEntriesFromPaths(result, program, pathInPackage, packageJsonDirectory, extensionOptions, paths) {"},
  {"line":1271,"text":"\t\t\t\t\t\treturn result"},
  {"line":1272,"text":"\t\t\t\t\t}"},
  {"line":1273,"text":"\t\t\t\t}"},
  {"line":1274,"text":"\t\t\t}"},
  {"line":1275,"text":"\t\t}"},
  {"line":1276,"text":"\t}"},
  {"line":1278,"text":"\tif !l.host.DirectoryExists(baseDirectory) {"},
  {"line":1279,"text":"\t\treturn result"},
  {"line":1280,"text":"\t}"},
  {"line":1283,"text":"\tfiles := l.ReadDirectory("},
  {"line":1284,"text":"\t\tbaseDirectory,"},
  {"line":1285,"text":"\t\textensionOptions.extensionsToSearch,"},
  {"line":1286,"text":"\t\t[]string{\"./*\"}, /*include*/"},
  {"line":1287,"text":"\t)"},
  {"line":1289,"text":"\tfor _, filePath := range files {"},
  {"line":1290,"text":"\t\tif tspath.ComparePaths(exclude, filePath, tspath.ComparePathsOptions{"},
  {"line":1291,"text":"\t\t\tUseCaseSensitiveFileNames: program.UseCaseSensitiveFileNames(),"},
  {"line":1292,"text":"\t\t\tCurrentDirectory:          program.GetCurrentDirectory(),"},
  {"line":1293,"text":"\t\t}) == 0 {"},
  {"line":1294,"text":"\t\t\tcontinue // Avoid self-imports"},
  {"line":1295,"text":"\t\t}"},
  {"line":1297,"text":"\t\tname, extension := getFilenameWithExtensionOption("},
  {"line":1298,"text":"\t\t\ttspath.GetBaseFileName(filePath),"},
  {"line":1299,"text":"\t\t\tprogram,"},
  {"line":1300,"text":"\t\t\textensionOptions,"},
  {"line":1301,"text":"\t\t\tfalse, /*isExportsOrImportsWildcard*/"},
  {"line":1302,"text":"\t\t)"},
  {"line":1303,"text":"\t\tresult.add("},
  {"line":1304,"text":"\t\t\tmoduleCompletionNameAndKind{"},
  {"line":1305,"text":"\t\t\t\tname:      name,"},
  {"line":1306,"text":"\t\t\t\tkind:      moduleCompletionKindFile,"},
  {"line":1307,"text":"\t\t\t\textension: extension,"},
  {"line":1308,"text":"\t\t\t},"},
  {"line":1309,"text":"\t\t)"},
  {"line":1310,"text":"\t}"},
  {"line":1313,"text":"\tdirectories := l.GetDirectories(baseDirectory)"},
  {"line":1315,"text":"\tfor _, directory := range directories {"},
  {"line":1316,"text":"\t\tdirectoryName := tspath.GetBaseFileName(directory)"},
  {"line":1317,"text":"\t\tif directoryName != \"@types\" {"},
  {"line":1318,"text":"\t\t\tresult.add("},
  {"line":1319,"text":"\t\t\t\tmoduleCompletionNameAndKind{"},
  {"line":1320,"text":"\t\t\t\t\tname: directoryName,"},
  {"line":1321,"text":"\t\t\t\t\tkind: moduleCompletionKindDirectory,"},
  {"line":1322,"text":"\t\t\t\t},"},
  {"line":1323,"text":"\t\t\t)"},
  {"line":1324,"text":"\t\t}"},
  {"line":1325,"text":"\t}"},
  {"line":1327,"text":"\treturn result"},
  {"line":1328,"text":"}"},
  {"line":1332,"text":"func (l *LanguageService) addCompletionEntriesFromPaths("},
  {"line":1333,"text":"\tresult *moduleCompletionNameAndKindSet,"},
  {"line":1334,"text":"\tprogram *compiler.Program,"},
  {"line":1335,"text":"\tfragment string,"},
  {"line":1336,"text":"\tbaseDirectory string,"},
  {"line":1337,"text":"\textensionOptions *extensionOptions,"},
  {"line":1338,"text":"\tpaths *collections.OrderedMap[string, []string],"},
  {"line":1339,"text":") bool {"},
  {"line":1340,"text":"\tgetPatternsForKeys := func(key string) []string {"},
  {"line":1341,"text":"\t\treturn paths.GetOrZero(key)"},
  {"line":1342,"text":"\t}"},
  {"line":1343,"text":"\tcomparePaths := func(a, b string) stringutil.Comparison {"},
  {"line":1344,"text":"\t\tpatternA := core.TryParsePattern(a)"},
  {"line":1345,"text":"\t\tpatternB := core.TryParsePattern(b)"},
  {"line":1346,"text":"\t\tlengthA := len(a)"},
  {"line":1347,"text":"\t\tif patternA.StarIndex != -1 {"},
  {"line":1348,"text":"\t\t\tlengthA = patternA.StarIndex"},
  {"line":1349,"text":"\t\t}"},
  {"line":1350,"text":"\t\tlengthB := len(b)"},
  {"line":1351,"text":"\t\tif patternB.StarIndex != -1 {"},
  {"line":1352,"text":"\t\t\tlengthB = patternB.StarIndex"},
  {"line":1353,"text":"\t\t}"},
  {"line":1354,"text":"\t\treturn cmp.Compare(lengthB, lengthA)"},
  {"line":1355,"text":"\t}"},
  {"line":1356,"text":"\treturn l.addCompletionEntriesFromPathsOrExportsOrImports("},
  {"line":1357,"text":"\t\tresult,"},
  {"line":1358,"text":"\t\tprogram,"},
  {"line":1359,"text":"\t\tfalse, /*isExports*/"},
  {"line":1360,"text":"\t\tfalse, /*isImports*/"},
  {"line":1361,"text":"\t\tfragment,"},
  {"line":1362,"text":"\t\tbaseDirectory,"},
  {"line":1363,"text":"\t\textensionOptions,"},
  {"line":1364,"text":"\t\tpaths.Keys(),"},
  {"line":1365,"text":"\t\tgetPatternsForKeys,"},
  {"line":1366,"text":"\t\tcomparePaths,"},
  {"line":1367,"text":"\t)"},
  {"line":1368,"text":"}"},
  {"line":1372,"text":"func (l *LanguageService) addCompletionEntriesFromPathsOrExportsOrImports("},
  {"line":1373,"text":"\tresult *moduleCompletionNameAndKindSet,"},
  {"line":1374,"text":"\tprogram *compiler.Program,"},
  {"line":1375,"text":"\tisExports bool,"},
  {"line":1376,"text":"\tisImports bool,"},
  {"line":1377,"text":"\tfragment string,"},
  {"line":1378,"text":"\tbaseDirectory string,"},
  {"line":1379,"text":"\textensionOptions *extensionOptions,"},
  {"line":1380,"text":"\tkeys iter.Seq[string],"},
  {"line":1381,"text":"\tgetPatternsForKey func(key string) []string,"},
  {"line":1382,"text":"\tcomparePaths func(a, b string) stringutil.Comparison,"},
  {"line":1383,"text":") bool {"},
  {"line":1384,"text":"\ttype pathResult struct {"},
  {"line":1385,"text":"\t\tresults []moduleCompletionNameAndKind"},
  {"line":1386,"text":"\t\tmatched bool"},
  {"line":1387,"text":"\t}"},
  {"line":1388,"text":"\tvar pathResults []pathResult"},
  {"line":1389,"text":"\tvar matchedPath *string"},
  {"line":1390,"text":"\tfor key := range keys {"},
  {"line":1391,"text":"\t\tif key == \".\" {"},
  {"line":1392,"text":"\t\t\tcontinue"},
  {"line":1393,"text":"\t\t}"},
  {"line":1394,"text":"\t\tnormalizedKey := strings.TrimPrefix(key, \"./\")               // Remove leading \"./\""},
  {"line":1395,"text":"\t\tif (isExports || isImports) && strings.HasSuffix(key, \"/\") { // Normalize trailing \"/\" to \"/*\""},
  {"line":1396,"text":"\t\t\tnormalizedKey = normalizedKey + \"*\""},
  {"line":1397,"text":"\t\t}"},
  {"line":1398,"text":"\t\tpatterns := getPatternsForKey(key)"},
  {"line":1399,"text":"\t\tif len(patterns) > 0 {"},
  {"line":1400,"text":"\t\t\tpathPattern := core.TryParsePattern(normalizedKey)"},
  {"line":1401,"text":"\t\t\tif !pathPattern.IsValid() {"},
  {"line":1402,"text":"\t\t\t\tcontinue"},
  {"line":1403,"text":"\t\t\t}"},
  {"line":1404,"text":"\t\t\tisMatch := pathPattern.Matches(fragment)"},
  {"line":1405,"text":"\t\t\tvar isLongestMatch bool"},
  {"line":1406,"text":"\t\t\tif isMatch {"},
  {"line":1407,"text":"\t\t\t\tif matchedPath == nil {"},
  {"line":1408,"text":"\t\t\t\t\tisLongestMatch = true"},
  {"line":1409,"text":"\t\t\t\t} else {"},
  {"line":1410,"text":"\t\t\t\t\tisLongestMatch = comparePaths(normalizedKey, *matchedPath) == stringutil.ComparisonLessThan"},
  {"line":1411,"text":"\t\t\t\t}"},
  {"line":1412,"text":"\t\t\t}"},
  {"line":1413,"text":"\t\t\tif isLongestMatch {"},
  {"line":1425,"text":"\t\t\t\tmatchedPath = &normalizedKey"},
  {"line":1426,"text":"\t\t\t\tpathResults = core.Filter(pathResults, func(pr pathResult) bool {"},
  {"line":1427,"text":"\t\t\t\t\treturn !pr.matched"},
  {"line":1428,"text":"\t\t\t\t})"},
  {"line":1429,"text":"\t\t\t}"},
  {"line":1430,"text":"\t\t\tif pathPattern.StarIndex == -1 ||"},
  {"line":1431,"text":"\t\t\t\tmatchedPath == nil ||"},
  {"line":1432,"text":"\t\t\t\tcomparePaths(normalizedKey, *matchedPath) != stringutil.ComparisonGreaterThan {"},
  {"line":1433,"text":"\t\t\t\tpathResults = append(pathResults, pathResult{"},
  {"line":1434,"text":"\t\t\t\t\tmatched: isMatch,"},
  {"line":1435,"text":"\t\t\t\t\tresults: l.getCompletionsForPathMapping("},
  {"line":1436,"text":"\t\t\t\t\t\tnormalizedKey,"},
  {"line":1437,"text":"\t\t\t\t\t\tpatterns,"},
  {"line":1438,"text":"\t\t\t\t\t\tfragment,"},
  {"line":1439,"text":"\t\t\t\t\t\tbaseDirectory,"},
  {"line":1440,"text":"\t\t\t\t\t\tisExports,"},
  {"line":1441,"text":"\t\t\t\t\t\tisImports,"},
  {"line":1442,"text":"\t\t\t\t\t\textensionOptions,"},
  {"line":1443,"text":"\t\t\t\t\t\tprogram,"},
  {"line":1444,"text":"\t\t\t\t\t),"},
  {"line":1445,"text":"\t\t\t\t})"},
  {"line":1446,"text":"\t\t\t}"},
  {"line":1447,"text":"\t\t}"},
  {"line":1448,"text":"\t}"},
  {"line":1450,"text":"\tfor _, pr := range pathResults {"},
  {"line":1451,"text":"\t\tfor _, res := range pr.results {"},
  {"line":1452,"text":"\t\t\tresult.add(res)"},
  {"line":1453,"text":"\t\t}"},
  {"line":1454,"text":"\t}"},
  {"line":1456,"text":"\treturn matchedPath != nil"},
  {"line":1457,"text":"}"},
  {"line":1459,"text":"func (l *LanguageService) getCompletionsForPathMapping("},
  {"line":1460,"text":"\tpath string,"},
  {"line":1461,"text":"\tpatterns []string,"},
  {"line":1462,"text":"\tfragment string,"},
  {"line":1463,"text":"\tpackageDirectory string,"},
  {"line":1464,"text":"\tisExports bool,"},
  {"line":1465,"text":"\tisImports bool,"},
  {"line":1466,"text":"\textensionOptions *extensionOptions,"},
  {"line":1467,"text":"\tprogram *compiler.Program,"},
  {"line":1468,"text":") []moduleCompletionNameAndKind {"},
  {"line":1469,"text":"\tjustPathMappingName := func(name string, kind moduleCompletionKind, extension string) []moduleCompletionNameAndKind {"},
  {"line":1470,"text":"\t\tif strings.HasPrefix(name, fragment) {"},
  {"line":1471,"text":"\t\t\treturn []moduleCompletionNameAndKind{{"},
  {"line":1472,"text":"\t\t\t\tname:      tspath.RemoveTrailingDirectorySeparator(name),"},
  {"line":1473,"text":"\t\t\t\tkind:      kind,"},
  {"line":1474,"text":"\t\t\t\textension: extension,"},
  {"line":1475,"text":"\t\t\t}}"},
  {"line":1476,"text":"\t\t}"},
  {"line":1477,"text":"\t\treturn nil"},
  {"line":1478,"text":"\t}"},
  {"line":1480,"text":"\tparsedPath := core.TryParsePattern(path)"},
  {"line":1481,"text":"\tif !parsedPath.IsValid() {"},
  {"line":1482,"text":"\t\treturn nil"},
  {"line":1483,"text":"\t}"},
  {"line":1485,"text":"\tif parsedPath.StarIndex == -1 {"},
  {"line":1487,"text":"\t\tpattern := core.FirstOrNil(patterns)"},
  {"line":1488,"text":"\t\textension := getFileExtension(pattern)"},
  {"line":1489,"text":"\t\treturn justPathMappingName(path, moduleCompletionKindFile, extension)"},
  {"line":1490,"text":"\t}"},
  {"line":1492,"text":"\tpathPrefix := parsedPath.Text[:parsedPath.StarIndex]"},
  {"line":1493,"text":"\tpathSuffix := parsedPath.Text[parsedPath.StarIndex+1:]"},
  {"line":1494,"text":"\tfragmentDirectory := getFragmentDirectory(fragment)"},
  {"line":1495,"text":"\tif fragmentDirectory != \"\" {"},
  {"line":1496,"text":"\t\tfragmentDirectory = tspath.EnsureTrailingDirectorySeparator(fragmentDirectory)"},
  {"line":1497,"text":"\t}"},
  {"line":1498,"text":"\tif !strings.HasPrefix(fragment, pathPrefix) {"},
  {"line":1501,"text":"\t\tif !strings.HasPrefix(pathPrefix, fragment) {"},
  {"line":1502,"text":"\t\t\treturn nil"},
  {"line":1503,"text":"\t\t}"},
  {"line":1504,"text":"\t\tstarIsFullPathComponent := strings.HasSuffix(path, \"/*\")"},
  {"line":1505,"text":"\t\tif starIsFullPathComponent {"},
  {"line":1506,"text":"\t\t\treturn justPathMappingName(pathPrefix, moduleCompletionKindDirectory, \"\" /*extension*/)"},
  {"line":1507,"text":"\t\t}"},
  {"line":1509,"text":"\t\tremainingDirectoryPrefix := pathPrefix[len(fragmentDirectory):]"},
  {"line":1510,"text":"\t\tvar completions []moduleCompletionNameAndKind"},
  {"line":1511,"text":"\t\tfor _, pattern := range patterns {"},
  {"line":1512,"text":"\t\t\tmodules := l.getModulesForPathsPattern("},
  {"line":1513,"text":"\t\t\t\t\"\", /*fragment*/"},
  {"line":1514,"text":"\t\t\t\tpackageDirectory,"},
  {"line":1515,"text":"\t\t\t\tpattern,"},
  {"line":1516,"text":"\t\t\t\tisExports,"},
  {"line":1517,"text":"\t\t\t\tisImports,"},
  {"line":1518,"text":"\t\t\t\textensionOptions,"},
  {"line":1519,"text":"\t\t\t\tprogram,"},
  {"line":1520,"text":"\t\t\t)"},
  {"line":1521,"text":"\t\t\tfor i := range modules {"},
  {"line":1522,"text":"\t\t\t\tmodules[i].name = remainingDirectoryPrefix + modules[i].name + core.IfElse(modules[i].kind == moduleCompletionKindFile, pathSuffix, \"\")"},
  {"line":1523,"text":"\t\t\t}"},
  {"line":1524,"text":"\t\t\tcompletions = append(completions, modules...)"},
  {"line":1525,"text":"\t\t}"},
  {"line":1526,"text":"\t\treturn completions"},
  {"line":1527,"text":"\t}"},
  {"line":1528,"text":"\tremainingFragment := fragment[len(pathPrefix):]"},
  {"line":1529,"text":"\tvar remainingDirectoryFragment string"},
  {"line":1530,"text":"\tif !strings.HasPrefix(fragmentDirectory, pathPrefix) {"},
  {"line":1531,"text":"\t\tremainingDirectoryFragment = pathPrefix[len(fragmentDirectory):]"},
  {"line":1532,"text":"\t}"},
  {"line":1533,"text":"\treturn core.FlatMap("},
  {"line":1534,"text":"\t\tpatterns,"},
  {"line":1535,"text":"\t\tfunc(pattern string) []moduleCompletionNameAndKind {"},
  {"line":1536,"text":"\t\t\tmodules := l.getModulesForPathsPattern("},
  {"line":1537,"text":"\t\t\t\tremainingFragment,"},
  {"line":1538,"text":"\t\t\t\tpackageDirectory,"},
  {"line":1539,"text":"\t\t\t\tpattern,"},
  {"line":1540,"text":"\t\t\t\tisExports,"},
  {"line":1541,"text":"\t\t\t\tisImports,"},
  {"line":1542,"text":"\t\t\t\textensionOptions,"},
  {"line":1543,"text":"\t\t\t\tprogram,"},
  {"line":1544,"text":"\t\t\t)"},
  {"line":1545,"text":"\t\t\tfor i := range modules {"},
  {"line":1546,"text":"\t\t\t\tmodules[i].name = remainingDirectoryFragment + modules[i].name + core.IfElse(modules[i].kind == moduleCompletionKindFile, pathSuffix, \"\")"},
  {"line":1547,"text":"\t\t\t}"},
  {"line":1548,"text":"\t\t\treturn modules"},
  {"line":1549,"text":"\t\t},"},
  {"line":1550,"text":"\t)"},
  {"line":1551,"text":"}"},
  {"line":1553,"text":"func getFileExtension(fileName string) string {"},
  {"line":1554,"text":"\textension := tspath.TryGetExtensionFromPath(fileName)"},
  {"line":1555,"text":"\tif extension == \"\" {"},
  {"line":1556,"text":"\t\textension = tspath.GetAnyExtensionFromPath(fileName, nil /*extensions*/, false /*ignoreCase*/)"},
  {"line":1557,"text":"\t}"},
  {"line":1558,"text":"\treturn extension"},
  {"line":1559,"text":"}"},
  {"line":1566,"text":"func (l *LanguageService) getModulesForPathsPattern("},
  {"line":1567,"text":"\tfragment string,"},
  {"line":1568,"text":"\tpackageDirectory string,"},
  {"line":1569,"text":"\tpattern string,"},
  {"line":1570,"text":"\tisExports bool,"},
  {"line":1571,"text":"\tisImports bool,"},
  {"line":1572,"text":"\textensionOptions *extensionOptions,"},
  {"line":1573,"text":"\tprogram *compiler.Program,"},
  {"line":1574,"text":") []moduleCompletionNameAndKind {"},
  {"line":1575,"text":"\tparsed := core.TryParsePattern(pattern)"},
  {"line":1576,"text":"\tif !parsed.IsValid() || parsed.StarIndex == -1 {"},
  {"line":1577,"text":"\t\treturn nil"},
  {"line":1578,"text":"\t}"},
  {"line":1580,"text":"\tprefix := parsed.Text[:parsed.StarIndex]"},
  {"line":1581,"text":"\tsuffix := parsed.Text[parsed.StarIndex+1:]"},
  {"line":1585,"text":"\tnormalizedPrefix := tspath.ResolvePath(prefix)"},
  {"line":1586,"text":"\tvar normalizedPrefixDirectory string"},
  {"line":1587,"text":"\tvar normalizedPrefixBase string"},
  {"line":1588,"text":"\tif tspath.HasTrailingDirectorySeparator(prefix) {"},
  {"line":1589,"text":"\t\tnormalizedPrefixDirectory = normalizedPrefix"},
  {"line":1590,"text":"\t\tnormalizedPrefixBase = \"\""},
  {"line":1591,"text":"\t} else {"},
  {"line":1592,"text":"\t\tnormalizedPrefixDirectory = tspath.GetDirectoryPath(normalizedPrefix)"},
  {"line":1593,"text":"\t\tnormalizedPrefixBase = tspath.GetBaseFileName(normalizedPrefix)"},
  {"line":1594,"text":"\t}"},
  {"line":1596,"text":"\tfragmentHasPath := containsSlash(fragment)"},
  {"line":1597,"text":"\tvar fragmentDirectory string"},
  {"line":1598,"text":"\tif fragmentHasPath {"},
  {"line":1599,"text":"\t\tif tspath.HasTrailingDirectorySeparator(fragment) {"},
  {"line":1600,"text":"\t\t\tfragmentDirectory = fragment"},
  {"line":1601,"text":"\t\t} else {"},
  {"line":1602,"text":"\t\t\tfragmentDirectory = tspath.GetDirectoryPath(fragment)"},
  {"line":1603,"text":"\t\t}"},
  {"line":1604,"text":"\t}"},
  {"line":1606,"text":"\toptions := program.Options()"},
  {"line":1607,"text":"\tignoreCase := !program.UseCaseSensitiveFileNames()"},
  {"line":1608,"text":"\toutDir := options.OutDir"},
  {"line":1609,"text":"\tdeclarationDir := options.DeclarationDir"},
  {"line":1612,"text":"\tvar expandedPrefixDirectory string"},
  {"line":1613,"text":"\tif fragmentHasPath {"},
  {"line":1614,"text":"\t\texpandedPrefixDirectory = tspath.CombinePaths(normalizedPrefixDirectory, normalizedPrefixBase+fragmentDirectory)"},
  {"line":1615,"text":"\t} else {"},
  {"line":1616,"text":"\t\texpandedPrefixDirectory = normalizedPrefixDirectory"},
  {"line":1617,"text":"\t}"},
  {"line":1619,"text":"\tbaseDirectory := tspath.NormalizePath(tspath.CombinePaths(packageDirectory, expandedPrefixDirectory))"},
  {"line":1621,"text":"\tvar possibleInputBaseDirectoryForOutDir string"},
  {"line":1622,"text":"\tvar possibleInputBaseDirectoryForDeclarationDir string"},
  {"line":1623,"text":"\tif isImports {"},
  {"line":1624,"text":"\t\tif outDir != \"\" {"},
  {"line":1625,"text":"\t\t\tpossibleInputBaseDirectoryForOutDir = getPossibleOriginalInputPathWithoutChangingExt("},
  {"line":1626,"text":"\t\t\t\tbaseDirectory,"},
  {"line":1627,"text":"\t\t\t\tignoreCase,"},
  {"line":1628,"text":"\t\t\t\toutDir,"},
  {"line":1629,"text":"\t\t\t\tprogram.CommonSourceDirectory,"},
  {"line":1630,"text":"\t\t\t)"},
  {"line":1631,"text":"\t\t}"},
  {"line":1632,"text":"\t\tif declarationDir != \"\" {"},
  {"line":1633,"text":"\t\t\tpossibleInputBaseDirectoryForDeclarationDir = getPossibleOriginalInputPathWithoutChangingExt("},
  {"line":1634,"text":"\t\t\t\tbaseDirectory,"},
  {"line":1635,"text":"\t\t\t\tignoreCase,"},
  {"line":1636,"text":"\t\t\t\tdeclarationDir,"},
  {"line":1637,"text":"\t\t\t\tprogram.CommonSourceDirectory,"},
  {"line":1638,"text":"\t\t\t)"},
  {"line":1639,"text":"\t\t}"},
  {"line":1640,"text":"\t}"},
  {"line":1642,"text":"\tnormalizedSuffix := tspath.NormalizePath(suffix)"},
  {"line":1644,"text":"\tvar declarationExtension string"},
  {"line":1645,"text":"\tvar inputExtensions []string"},
  {"line":1646,"text":"\tif normalizedSuffix != \"\" {"},
  {"line":1647,"text":"\t\tdeclarationExtension = tspath.GetDeclarationEmitExtensionForPath(\"_\" + normalizedSuffix)"},
  {"line":1648,"text":"\t\tinputExtensions = tspath.GetPossibleOriginalInputExtensionForExtension(\"_\" + normalizedSuffix)"},
  {"line":1649,"text":"\t}"},
  {"line":1651,"text":"\tvar matchingSuffixes []string"},
  {"line":1652,"text":"\tif declarationExtension != \"\" {"},
  {"line":1653,"text":"\t\tmatchingSuffixes = append(matchingSuffixes, tspath.ChangeExtension(normalizedSuffix, declarationExtension))"},
  {"line":1654,"text":"\t}"},
  {"line":1655,"text":"\tfor _, ext := range inputExtensions {"},
  {"line":1656,"text":"\t\tmatchingSuffixes = append(matchingSuffixes, tspath.ChangeExtension(normalizedSuffix, ext))"},
  {"line":1657,"text":"\t}"},
  {"line":1658,"text":"\tmatchingSuffixes = append(matchingSuffixes, normalizedSuffix)"},
  {"line":1668,"text":"\tvar includeGlobs []string"},
  {"line":1669,"text":"\tif normalizedSuffix != \"\" {"},
  {"line":1670,"text":"\t\tfor _, suffix := range matchingSuffixes {"},
  {"line":1671,"text":"\t\t\tincludeGlobs = append(includeGlobs, \"**/*\"+suffix)"},
  {"line":1672,"text":"\t\t}"},
  {"line":1673,"text":"\t} else {"},
  {"line":1674,"text":"\t\tincludeGlobs = []string{\"./*\"}"},
  {"line":1675,"text":"\t}"},
  {"line":1677,"text":"\tisExportsOrImportsWildcard := (isExports || isImports) && strings.HasSuffix(pattern, \"/*\")"},
  {"line":1679,"text":"\ttrimPrefixAndSuffix := func(path string, prefixStr string) string {"},
  {"line":1680,"text":"\t\tfor _, suffix := range matchingSuffixes {"},
  {"line":1681,"text":"\t\t\tinner := withoutStartAndEnd(tspath.NormalizePath(path), prefixStr, suffix)"},
  {"line":1682,"text":"\t\t\tif inner == nil {"},
  {"line":1683,"text":"\t\t\t\tcontinue"},
  {"line":1684,"text":"\t\t\t}"},
  {"line":1685,"text":"\t\t\treturn removeLeadingDirectorySeparator(*inner)"},
  {"line":1686,"text":"\t\t}"},
  {"line":1687,"text":"\t\treturn \"\""},
  {"line":1688,"text":"\t}"},
  {"line":1690,"text":"\tgetMatchesWithPrefix := func(directory string) []moduleCompletionNameAndKind {"},
  {"line":1691,"text":"\t\tvar completePrefix string"},
  {"line":1692,"text":"\t\tif fragmentHasPath {"},
  {"line":1693,"text":"\t\t\tcompletePrefix = directory"},
  {"line":1694,"text":"\t\t} else {"},
  {"line":1695,"text":"\t\t\tcompletePrefix = tspath.EnsureTrailingDirectorySeparator(directory) + normalizedPrefixBase"},
  {"line":1696,"text":"\t\t}"},
  {"line":1698,"text":"\t\tmatches := l.ReadDirectory("},
  {"line":1699,"text":"\t\t\tdirectory,"},
  {"line":1700,"text":"\t\t\textensionOptions.extensionsToSearch,"},
  {"line":1701,"text":"\t\t\tincludeGlobs,"},
  {"line":1702,"text":"\t\t)"},
  {"line":1704,"text":"\t\tvar result []moduleCompletionNameAndKind"},
  {"line":1705,"text":"\t\tfor _, match := range matches {"},
  {"line":1706,"text":"\t\t\ttrimmedWithPattern := trimPrefixAndSuffix(match, completePrefix)"},
  {"line":1707,"text":"\t\t\tif trimmedWithPattern != \"\" {"},
  {"line":1708,"text":"\t\t\t\tif containsSlash(trimmedWithPattern) {"},
  {"line":1709,"text":"\t\t\t\t\tpathComponents := tspath.GetPathComponents(removeLeadingDirectorySeparator(trimmedWithPattern), \"\")"},
  {"line":1710,"text":"\t\t\t\t\tif len(pathComponents) > 1 {"},
  {"line":1711,"text":"\t\t\t\t\t\tresult = append(result, moduleCompletionNameAndKind{"},
  {"line":1712,"text":"\t\t\t\t\t\t\tname: pathComponents[1],"},
  {"line":1713,"text":"\t\t\t\t\t\t\tkind: moduleCompletionKindDirectory,"},
  {"line":1714,"text":"\t\t\t\t\t\t})"},
  {"line":1715,"text":"\t\t\t\t\t}"},
  {"line":1716,"text":"\t\t\t\t} else {"},
  {"line":1717,"text":"\t\t\t\t\tname, extension := getFilenameWithExtensionOption("},
  {"line":1718,"text":"\t\t\t\t\t\ttrimmedWithPattern,"},
  {"line":1719,"text":"\t\t\t\t\t\tprogram,"},
  {"line":1720,"text":"\t\t\t\t\t\textensionOptions,"},
  {"line":1721,"text":"\t\t\t\t\t\tisExportsOrImportsWildcard,"},
  {"line":1722,"text":"\t\t\t\t\t)"},
  {"line":1723,"text":"\t\t\t\t\tif extension == \"\" {"},
  {"line":1724,"text":"\t\t\t\t\t\textension = getFileExtension(match)"},
  {"line":1725,"text":"\t\t\t\t\t}"},
  {"line":1726,"text":"\t\t\t\t\tresult = append(result, moduleCompletionNameAndKind{"},
  {"line":1727,"text":"\t\t\t\t\t\tname:      name,"},
  {"line":1728,"text":"\t\t\t\t\t\tkind:      moduleCompletionKindFile,"},
  {"line":1729,"text":"\t\t\t\t\t\textension: extension,"},
  {"line":1730,"text":"\t\t\t\t\t})"},
  {"line":1731,"text":"\t\t\t\t}"},
  {"line":1732,"text":"\t\t\t}"},
  {"line":1733,"text":"\t\t}"},
  {"line":1734,"text":"\t\treturn result"},
  {"line":1735,"text":"\t}"},
  {"line":1737,"text":"\tgetDirectoryMatches := func(directoryName string) []moduleCompletionNameAndKind {"},
  {"line":1738,"text":"\t\tdirectories := l.GetDirectories(directoryName)"},
  {"line":1739,"text":"\t\tvar result []moduleCompletionNameAndKind"},
  {"line":1740,"text":"\t\tfor _, dir := range directories {"},
  {"line":1741,"text":"\t\t\tif dir != \"node_modules\" {"},
  {"line":1742,"text":"\t\t\t\tresult = append(result, moduleCompletionNameAndKind{"},
  {"line":1743,"text":"\t\t\t\t\tname: dir,"},
  {"line":1744,"text":"\t\t\t\t\tkind: moduleCompletionKindDirectory,"},
  {"line":1745,"text":"\t\t\t\t})"},
  {"line":1746,"text":"\t\t\t}"},
  {"line":1747,"text":"\t\t}"},
  {"line":1748,"text":"\t\treturn result"},
  {"line":1749,"text":"\t}"},
  {"line":1751,"text":"\tvar matches []moduleCompletionNameAndKind"},
  {"line":1752,"text":"\tmatches = append(matches, getMatchesWithPrefix(baseDirectory)...)"},
  {"line":1754,"text":"\tif possibleInputBaseDirectoryForOutDir != \"\" {"},
  {"line":1755,"text":"\t\tmatches = append(matches, getMatchesWithPrefix(possibleInputBaseDirectoryForOutDir)...)"},
  {"line":1756,"text":"\t}"},
  {"line":1757,"text":"\tif possibleInputBaseDirectoryForDeclarationDir != \"\" {"},
  {"line":1758,"text":"\t\tmatches = append(matches, getMatchesWithPrefix(possibleInputBaseDirectoryForDeclarationDir)...)"},
  {"line":1759,"text":"\t}"},
  {"line":1764,"text":"\tif normalizedSuffix == \"\" {"},
  {"line":1765,"text":"\t\tmatches = append(matches, getDirectoryMatches(baseDirectory)...)"},
  {"line":1766,"text":"\t\tif possibleInputBaseDirectoryForOutDir != \"\" {"},
  {"line":1767,"text":"\t\t\tmatches = append(matches, getDirectoryMatches(possibleInputBaseDirectoryForOutDir)...)"},
  {"line":1768,"text":"\t\t}"},
  {"line":1769,"text":"\t\tif possibleInputBaseDirectoryForDeclarationDir != \"\" {"},
  {"line":1770,"text":"\t\t\tmatches = append(matches, getDirectoryMatches(possibleInputBaseDirectoryForDeclarationDir)...)"},
  {"line":1771,"text":"\t\t}"},
  {"line":1772,"text":"\t}"},
  {"line":1774,"text":"\treturn matches"},
  {"line":1775,"text":"}"},
  {"line":1777,"text":"func containsSlash(fragment string) bool {"},
  {"line":1778,"text":"\treturn strings.Contains(fragment, string(tspath.DirectorySeparator))"},
  {"line":1779,"text":"}"},
  {"line":1781,"text":"func withoutStartAndEnd(s string, start string, end string) *string {"},
  {"line":1782,"text":"\tif strings.HasPrefix(s, start) && strings.HasSuffix(s, end) && len(s) >= len(start)+len(end) {"},
  {"line":1783,"text":"\t\ts = s[len(start) : len(s)-len(end)]"},
  {"line":1784,"text":"\t\treturn &s"},
  {"line":1785,"text":"\t}"},
  {"line":1786,"text":"\treturn nil"},
  {"line":1787,"text":"}"},
  {"line":1789,"text":"func removeLeadingDirectorySeparator(path string) string {"},
  {"line":1790,"text":"\treturn strings.TrimPrefix(path, string(tspath.DirectorySeparator))"},
  {"line":1791,"text":"}"},
  {"line":1793,"text":"func getPossibleOriginalInputPathWithoutChangingExt("},
  {"line":1794,"text":"\tfilePath string,"},
  {"line":1795,"text":"\tignoreCase bool,"},
  {"line":1796,"text":"\toutputDir string,"},
  {"line":1797,"text":"\tgetCommonSourceDirectory func() string,"},
  {"line":1798,"text":") string {"},
  {"line":1799,"text":"\tif outputDir != \"\" {"},
  {"line":1800,"text":"\t\treturn tspath.ResolvePath("},
  {"line":1801,"text":"\t\t\tgetCommonSourceDirectory(),"},
  {"line":1802,"text":"\t\t\ttspath.GetRelativePathFromDirectory(outputDir, filePath, tspath.ComparePathsOptions{"},
  {"line":1803,"text":"\t\t\t\tUseCaseSensitiveFileNames: !ignoreCase,"},
  {"line":1804,"text":"\t\t\t}),"},
  {"line":1805,"text":"\t\t)"},
  {"line":1806,"text":"\t}"},
  {"line":1807,"text":"\treturn filePath"},
  {"line":1808,"text":"}"},
  {"line":1810,"text":"func getFilenameWithExtensionOption("},
  {"line":1811,"text":"\tname string,"},
  {"line":1812,"text":"\tprogram *compiler.Program,"},
  {"line":1813,"text":"\textensionOptions *extensionOptions,"},
  {"line":1814,"text":"\tisExportsOrImportsWildcard bool,"},
  {"line":1815,"text":") (string, string) {"},
  {"line":1816,"text":"\tnonJSResult := modulespecifiers.TryGetRealFileNameForNonJSDeclarationFileName(name)"},
  {"line":1817,"text":"\tif nonJSResult != \"\" {"},
  {"line":1818,"text":"\t\treturn nonJSResult, tspath.TryGetExtensionFromPath(nonJSResult)"},
  {"line":1819,"text":"\t}"},
  {"line":1820,"text":"\tif extensionOptions.referenceKind == referenceKindFileName {"},
  {"line":1821,"text":"\t\treturn name, tspath.TryGetExtensionFromPath(name)"},
  {"line":1822,"text":"\t}"},
  {"line":1824,"text":"\tallowedEndings := modulespecifiers.GetAllowedEndingsInPreferredOrder("},
  {"line":1825,"text":"\t\tmodulespecifiers.UserPreferences{ImportModuleSpecifierEnding: extensionOptions.endingPreference},"},
  {"line":1826,"text":"\t\tprogram,"},
  {"line":1827,"text":"\t\tprogram.Options(),"},
  {"line":1828,"text":"\t\textensionOptions.importingSourceFile,"},
  {"line":1829,"text":"\t\t\"\", /*oldImportSpecifier*/"},
  {"line":1830,"text":"\t\textensionOptions.resolutionMode,"},
  {"line":1831,"text":"\t)"},
  {"line":1833,"text":"\tif isExportsOrImportsWildcard {"},
  {"line":1836,"text":"\t\tallowedEndings = core.Filter(allowedEndings, func(e modulespecifiers.ModuleSpecifierEnding) bool {"},
  {"line":1837,"text":"\t\t\treturn e != modulespecifiers.ModuleSpecifierEndingMinimal && e != modulespecifiers.ModuleSpecifierEndingIndex"},
  {"line":1838,"text":"\t\t})"},
  {"line":1839,"text":"\t}"},
  {"line":1841,"text":"\tif len(allowedEndings) > 0 && allowedEndings[0] == modulespecifiers.ModuleSpecifierEndingTsExtension {"},
  {"line":1842,"text":"\t\tif tspath.FileExtensionIsOneOf(name, tspath.SupportedTSImplementationExtensions) {"},
  {"line":1843,"text":"\t\t\treturn name, tspath.TryGetExtensionFromPath(name)"},
  {"line":1844,"text":"\t\t}"},
  {"line":1845,"text":"\t\toutputExtension := module.TryGetJSExtensionForFile(name, program.Options())"},
  {"line":1846,"text":"\t\tif outputExtension != \"\" {"},
  {"line":1847,"text":"\t\t\treturn tspath.ChangeExtension(name, outputExtension), outputExtension"},
  {"line":1848,"text":"\t\t}"},
  {"line":1849,"text":"\t\treturn name, tspath.TryGetExtensionFromPath(name)"},
  {"line":1850,"text":"\t}"},
  {"line":1852,"text":"\tif !isExportsOrImportsWildcard &&"},
  {"line":1853,"text":"\t\tlen(allowedEndings) > 0 &&"},
  {"line":1854,"text":"\t\t(allowedEndings[0] == modulespecifiers.ModuleSpecifierEndingMinimal || allowedEndings[0] == modulespecifiers.ModuleSpecifierEndingIndex) &&"},
  {"line":1855,"text":"\t\ttspath.FileExtensionIsOneOf(name, []string{tspath.ExtensionJs, tspath.ExtensionJsx, tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionDts}) {"},
  {"line":1856,"text":"\t\treturn tspath.RemoveFileExtension(name), tspath.TryGetExtensionFromPath(name)"},
  {"line":1857,"text":"\t}"},
  {"line":1859,"text":"\toutputExtension := module.TryGetJSExtensionForFile(name, program.Options())"},
  {"line":1860,"text":"\tif outputExtension != \"\" {"},
  {"line":1861,"text":"\t\treturn tspath.ChangeExtension(name, outputExtension), outputExtension"},
  {"line":1862,"text":"\t}"},
  {"line":1863,"text":"\treturn name, tspath.TryGetExtensionFromPath(name)"},
  {"line":1864,"text":"}"},
  {"line":1866,"text":"func walkUpParentheses(node *ast.Node) *ast.Node {"},
  {"line":1867,"text":"\tswitch node.Kind {"},
  {"line":1868,"text":"\tcase ast.KindParenthesizedType:"},
  {"line":1869,"text":"\t\treturn ast.WalkUpParenthesizedTypes(node)"},
  {"line":1870,"text":"\tcase ast.KindParenthesizedExpression:"},
  {"line":1871,"text":"\t\treturn ast.WalkUpParenthesizedExpressions(node)"},
  {"line":1872,"text":"\tdefault:"},
  {"line":1873,"text":"\t\treturn node"},
  {"line":1874,"text":"\t}"},
  {"line":1875,"text":"}"},
  {"line":1877,"text":"func getStringLiteralTypes(t *checker.Type, uniques *collections.Set[string], typeChecker *checker.Checker) []*checker.StringLiteralType {"},
  {"line":1878,"text":"\tif t == nil {"},
  {"line":1879,"text":"\t\treturn nil"},
  {"line":1880,"text":"\t}"},
  {"line":1881,"text":"\tif uniques == nil {"},
  {"line":1882,"text":"\t\tuniques = &collections.Set[string]{}"},
  {"line":1883,"text":"\t}"},
  {"line":1884,"text":"\tt = skipConstraint(t, typeChecker)"},
  {"line":1885,"text":"\tif t.IsUnion() {"},
  {"line":1886,"text":"\t\tvar types []*checker.StringLiteralType"},
  {"line":1887,"text":"\t\tfor _, elementType := range t.Types() {"},
  {"line":1888,"text":"\t\t\ttypes = append(types, getStringLiteralTypes(elementType, uniques, typeChecker)...)"},
  {"line":1889,"text":"\t\t}"},
  {"line":1890,"text":"\t\treturn types"},
  {"line":1891,"text":"\t}"},
  {"line":1892,"text":"\tif t.IsStringLiteral() && !t.IsEnumLiteral() && uniques.AddIfAbsent(t.AsLiteralType().Value().(string)) {"},
  {"line":1893,"text":"\t\treturn []*checker.StringLiteralType{t}"},
  {"line":1894,"text":"\t}"},
  {"line":1895,"text":"\treturn nil"},
  {"line":1896,"text":"}"},
  {"line":1898,"text":"func getAlreadyUsedTypesInStringLiteralUnion(union *ast.UnionTypeNodeNode, current *ast.LiteralTypeNodeNode) []string {"},
  {"line":1899,"text":"\ttypesList := union.AsUnionTypeNode().Types"},
  {"line":1900,"text":"\tif typesList == nil {"},
  {"line":1901,"text":"\t\treturn nil"},
  {"line":1902,"text":"\t}"},
  {"line":1903,"text":"\tvar values []string"},
  {"line":1904,"text":"\tfor _, typeNode := range typesList.Nodes {"},
  {"line":1905,"text":"\t\tif typeNode != current && ast.IsLiteralTypeNode(typeNode) &&"},
  {"line":1906,"text":"\t\t\tast.IsStringLiteral(typeNode.AsLiteralTypeNode().Literal) {"},
  {"line":1907,"text":"\t\t\tvalues = append(values, typeNode.AsLiteralTypeNode().Literal.Text())"},
  {"line":1908,"text":"\t\t}"},
  {"line":1909,"text":"\t}"},
  {"line":1910,"text":"\treturn values"},
  {"line":1911,"text":"}"},
  {"line":1913,"text":"func hasIndexSignature(t *checker.Type, typeChecker *checker.Checker) bool {"},
  {"line":1914,"text":"\treturn typeChecker.GetStringIndexType(t) != nil || typeChecker.GetNumberIndexType(t) != nil"},
  {"line":1915,"text":"}"},
  {"line":1921,"text":"func isRequireCallArgument(node *ast.Node) bool {"},
  {"line":1922,"text":"\treturn ast.IsCallExpression(node.Parent) && len(node.Parent.Arguments()) > 0 && node.Parent.Arguments()[0] == node &&"},
  {"line":1923,"text":"\t\tast.IsIdentifier(node.Parent.Expression()) && node.Parent.Expression().Text() == \"require\""},
  {"line":1924,"text":"}"},
  {"line":1926,"text":"func kindModifiersFromExtension(extension string) lsutil.ScriptElementKindModifier {"},
  {"line":1927,"text":"\tswitch extension {"},
  {"line":1928,"text":"\tcase tspath.ExtensionDts:"},
  {"line":1929,"text":"\t\treturn lsutil.ScriptElementKindModifierDts"},
  {"line":1930,"text":"\tcase tspath.ExtensionJs:"},
  {"line":1931,"text":"\t\treturn lsutil.ScriptElementKindModifierJs"},
  {"line":1932,"text":"\tcase tspath.ExtensionJson:"},
  {"line":1933,"text":"\t\treturn lsutil.ScriptElementKindModifierJson"},
  {"line":1934,"text":"\tcase tspath.ExtensionJsx:"},
  {"line":1935,"text":"\t\treturn lsutil.ScriptElementKindModifierJsx"},
  {"line":1936,"text":"\tcase tspath.ExtensionTs:"},
  {"line":1937,"text":"\t\treturn lsutil.ScriptElementKindModifierTs"},
  {"line":1938,"text":"\tcase tspath.ExtensionTsx:"},
  {"line":1939,"text":"\t\treturn lsutil.ScriptElementKindModifierTsx"},
  {"line":1940,"text":"\tcase tspath.ExtensionDmts:"},
  {"line":1941,"text":"\t\treturn lsutil.ScriptElementKindModifierDmts"},
  {"line":1942,"text":"\tcase tspath.ExtensionMjs:"},
  {"line":1943,"text":"\t\treturn lsutil.ScriptElementKindModifierMjs"},
  {"line":1944,"text":"\tcase tspath.ExtensionMts:"},
  {"line":1945,"text":"\t\treturn lsutil.ScriptElementKindModifierMts"},
  {"line":1946,"text":"\tcase tspath.ExtensionDcts:"},
  {"line":1947,"text":"\t\treturn lsutil.ScriptElementKindModifierDcts"},
  {"line":1948,"text":"\tcase tspath.ExtensionCjs:"},
  {"line":1949,"text":"\t\treturn lsutil.ScriptElementKindModifierCjs"},
  {"line":1950,"text":"\tcase tspath.ExtensionCts:"},
  {"line":1951,"text":"\t\treturn lsutil.ScriptElementKindModifierCts"},
  {"line":1952,"text":"\tcase tspath.ExtensionTsBuildInfo:"},
  {"line":1953,"text":"\t\tpanic(fmt.Sprintf(\"Extension %v is unsupported.\", tspath.ExtensionTsBuildInfo))"},
  {"line":1954,"text":"\tdefault:"},
  {"line":1955,"text":"\t\treturn lsutil.ScriptElementKindModifierNone"},
  {"line":1956,"text":"\t}"},
  {"line":1957,"text":"}"},
  {"line":1959,"text":"func getStringLiteralCompletionsFromSignature("},
  {"line":1960,"text":"\tcall *ast.CallLikeExpression,"},
  {"line":1961,"text":"\targ *ast.StringLiteralLike,"},
  {"line":1962,"text":"\targumentInfo *argumentInfoForCompletions,"},
  {"line":1963,"text":"\ttypeChecker *checker.Checker,"},
  {"line":1964,"text":") *completionsFromTypes {"},
  {"line":1965,"text":"\tisNewIdentifier := false"},
  {"line":1966,"text":"\tuniques := collections.Set[string]{}"},
  {"line":1967,"text":"\tvar editingArgument *ast.Node"},
  {"line":1968,"text":"\tif ast.IsJsxOpeningLikeElement(call) {"},
  {"line":1969,"text":"\t\teditingArgument = ast.FindAncestor(arg.Parent, ast.IsJsxAttribute)"},
  {"line":1970,"text":"\t\tif editingArgument == nil {"},
  {"line":1971,"text":"\t\t\tpanic(\"Expected jsx opening-like element to have a jsx attribute as ancestor.\")"},
  {"line":1972,"text":"\t\t}"},
  {"line":1973,"text":"\t} else {"},
  {"line":1974,"text":"\t\teditingArgument = arg"},
  {"line":1975,"text":"\t}"},
  {"line":1976,"text":"\tcandidates := typeChecker.GetCandidateSignaturesForStringLiteralCompletions(call, editingArgument)"},
  {"line":1977,"text":"\tvar types []*checker.StringLiteralType"},
  {"line":1978,"text":"\tfor _, candidate := range candidates {"},
  {"line":1979,"text":"\t\tif !candidate.HasRestParameter() && argumentInfo.argumentCount > len(candidate.Parameters()) {"},
  {"line":1980,"text":"\t\t\tcontinue"},
  {"line":1981,"text":"\t\t}"},
  {"line":1982,"text":"\t\tt := typeChecker.GetTypeParameterAtPosition(candidate, argumentInfo.argumentIndex)"},
  {"line":1983,"text":"\t\tif ast.IsJsxOpeningLikeElement(call) {"},
  {"line":1984,"text":"\t\t\tpropType := typeChecker.GetTypeOfPropertyOfType(t, editingArgument.AsJsxAttribute().Name().Text())"},
  {"line":1985,"text":"\t\t\tif propType != nil {"},
  {"line":1986,"text":"\t\t\t\tt = propType"},
  {"line":1987,"text":"\t\t\t}"},
  {"line":1988,"text":"\t\t}"},
  {"line":1989,"text":"\t\tisNewIdentifier = isNewIdentifier || t.IsString()"},
  {"line":1990,"text":"\t\ttypes = append(types, getStringLiteralTypes(t, &uniques, typeChecker)...)"},
  {"line":1991,"text":"\t}"},
  {"line":1992,"text":"\tif len(types) > 0 {"},
  {"line":1993,"text":"\t\treturn &completionsFromTypes{"},
  {"line":1994,"text":"\t\t\ttypes:           types,"},
  {"line":1995,"text":"\t\t\tisNewIdentifier: isNewIdentifier,"},
  {"line":1996,"text":"\t\t}"},
  {"line":1997,"text":"\t}"},
  {"line":1998,"text":"\treturn nil"},
  {"line":1999,"text":"}"},
  {"line":2001,"text":"func (l *LanguageService) getStringLiteralCompletionDetails("},
  {"line":2002,"text":"\tctx context.Context,"},
  {"line":2003,"text":"\tchecker *checker.Checker,"},
  {"line":2004,"text":"\titem *lsproto.CompletionItem,"},
  {"line":2005,"text":"\tname string,"},
  {"line":2006,"text":"\tfile *ast.SourceFile,"},
  {"line":2007,"text":"\tposition int,"},
  {"line":2008,"text":"\tcontextToken *ast.Node,"},
  {"line":2009,"text":"\tdocFormat lsproto.MarkupKind,"},
  {"line":2010,"text":") *lsproto.CompletionItem {"},
  {"line":2011,"text":"\tif contextToken == nil || !ast.IsStringLiteralLike(contextToken) {"},
  {"line":2012,"text":"\t\treturn item"},
  {"line":2013,"text":"\t}"},
  {"line":2014,"text":"\tcompletions := l.getStringLiteralCompletionEntries("},
  {"line":2015,"text":"\t\tctx,"},
  {"line":2016,"text":"\t\tfile,"},
  {"line":2017,"text":"\t\tcontextToken,"},
  {"line":2018,"text":"\t\tposition,"},
  {"line":2019,"text":"\t\tchecker,"},
  {"line":2020,"text":"\t)"},
  {"line":2021,"text":"\tif completions == nil {"},
  {"line":2022,"text":"\t\treturn item"},
  {"line":2023,"text":"\t}"},
  {"line":2024,"text":"\treturn l.stringLiteralCompletionDetails(item, name, contextToken, position, completions, file, checker, docFormat)"},
  {"line":2025,"text":"}"},
  {"line":2027,"text":"func (l *LanguageService) stringLiteralCompletionDetails("},
  {"line":2028,"text":"\titem *lsproto.CompletionItem,"},
  {"line":2029,"text":"\tname string,"},
  {"line":2030,"text":"\tlocation *ast.Node,"},
  {"line":2031,"text":"\tposition int,"},
  {"line":2032,"text":"\tcompletion *stringLiteralCompletions,"},
  {"line":2033,"text":"\tfile *ast.SourceFile,"},
  {"line":2034,"text":"\tchecker *checker.Checker,"},
  {"line":2035,"text":"\tdocFormat lsproto.MarkupKind,"},
  {"line":2036,"text":") *lsproto.CompletionItem {"},
  {"line":2037,"text":"\tswitch {"},
  {"line":2038,"text":"\tcase completion.fromPaths != nil:"},
  {"line":2041,"text":"\t\treturn item"},
  {"line":2042,"text":"\tcase completion.fromProperties != nil:"},
  {"line":2043,"text":"\t\tproperties := completion.fromProperties"},
  {"line":2044,"text":"\t\tfor _, symbol := range properties.symbols {"},
  {"line":2045,"text":"\t\t\tif symbol.Name == name {"},
  {"line":2046,"text":"\t\t\t\treturn l.createCompletionDetailsForSymbol(item, symbol, checker, location, position, docFormat)"},
  {"line":2047,"text":"\t\t\t}"},
  {"line":2048,"text":"\t\t}"},
  {"line":2049,"text":"\tcase completion.fromTypes != nil:"},
  {"line":2050,"text":"\t\ttypes := completion.fromTypes"},
  {"line":2051,"text":"\t\tfor _, t := range types.types {"},
  {"line":2052,"text":"\t\t\tif t.AsLiteralType().Value().(string) == name {"},
  {"line":2053,"text":"\t\t\t\treturn createCompletionDetails(item, name, \"\" /*documentation*/, docFormat)"},
  {"line":2054,"text":"\t\t\t}"},
  {"line":2055,"text":"\t\t}"},
  {"line":2056,"text":"\t}"},
  {"line":2057,"text":"\treturn item"},
  {"line":2058,"text":"}"},
  {"line":2060,"text":"func isInReferenceComment(file *ast.SourceFile, position int) bool {"},
  {"line":2061,"text":"\tcommentRange := isInComment(file, position, astnav.GetTokenAtPosition(file, position))"},
  {"line":2062,"text":"\tif commentRange == nil {"},
  {"line":2063,"text":"\t\treturn false"},
  {"line":2064,"text":"\t}"},
  {"line":2065,"text":"\tcommentText := file.Text()[commentRange.Pos():commentRange.End()]"},
  {"line":2066,"text":"\treturn hasTripleSlashPrefix(commentText)"},
  {"line":2067,"text":"}"},
  {"line":2069,"text":"func hasTripleSlashPrefix(commentText string) bool {"},
  {"line":2070,"text":"\treturn strings.HasPrefix(commentText, \"///\") && strings.HasPrefix(strings.TrimSpace(commentText[3:]), \"<\")"},
  {"line":2071,"text":"}"},
  {"line":2089,"text":"func parseTripleSlashDirectiveFragment(text string) (prefix string, kind string, toComplete string, ok bool) {"},
  {"line":2090,"text":"\trest := text"},
  {"line":2091,"text":"\tif !strings.HasPrefix(rest, \"///\") {"},
  {"line":2092,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2093,"text":"\t}"},
  {"line":2095,"text":"\trest = rest[len(\"///\"):]"},
  {"line":2096,"text":"\trest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)"},
  {"line":2099,"text":"\tif !strings.HasPrefix(rest, \"<reference\") {"},
  {"line":2100,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2101,"text":"\t}"},
  {"line":2102,"text":"\trest = rest[len(\"<reference\"):]"},
  {"line":2104,"text":"\tif len(rest) == 0 || !stringutil.IsWhiteSpaceLike(rune(rest[0])) {"},
  {"line":2105,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2106,"text":"\t}"},
  {"line":2107,"text":"\trest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)"},
  {"line":2110,"text":"\tif strings.HasPrefix(rest, \"path\") {"},
  {"line":2111,"text":"\t\tkind = \"path\""},
  {"line":2112,"text":"\t\trest = rest[len(\"path\"):]"},
  {"line":2113,"text":"\t} else if strings.HasPrefix(rest, \"types\") {"},
  {"line":2114,"text":"\t\tkind = \"types\""},
  {"line":2115,"text":"\t\trest = rest[len(\"types\"):]"},
  {"line":2116,"text":"\t} else {"},
  {"line":2117,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2118,"text":"\t}"},
  {"line":2121,"text":"\trest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)"},
  {"line":2122,"text":"\tif !strings.HasPrefix(rest, \"=\") {"},
  {"line":2123,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2124,"text":"\t}"},
  {"line":2125,"text":"\trest = rest[1:]"},
  {"line":2128,"text":"\trest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)"},
  {"line":2129,"text":"\tif len(rest) == 0 || (rest[0] != '\\'' && rest[0] != '\"') {"},
  {"line":2130,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2131,"text":"\t}"},
  {"line":2132,"text":"\trest = rest[1:]"},
  {"line":2135,"text":"\tif strings.ContainsAny(rest, `'\"`) {"},
  {"line":2136,"text":"\t\treturn \"\", \"\", \"\", false"},
  {"line":2137,"text":"\t}"},
  {"line":2138,"text":"\ttoComplete = rest"},
  {"line":2139,"text":"\tprefix = text[:len(text)-len(toComplete)]"},
  {"line":2140,"text":"\treturn prefix, kind, toComplete, true"},
  {"line":2141,"text":"}"},
  {"line":2143,"text":"func (l *LanguageService) getTripleSlashReferenceCompletions("},
  {"line":2144,"text":"\tfile *ast.SourceFile,"},
  {"line":2145,"text":"\tposition int,"},
  {"line":2146,"text":"\tprogram *compiler.Program,"},
  {"line":2147,"text":"\tchecker *checker.Checker,"},
  {"line":2148,"text":") []*pathCompletion {"},
  {"line":2149,"text":"\tcompilerOptions := program.Options()"},
  {"line":2150,"text":"\ttoken := astnav.GetTokenAtPosition(file, position)"},
  {"line":2151,"text":"\tcommentRanges := slices.Collect(scanner.GetLeadingCommentRanges(&ast.NodeFactory{}, file.Text(), token.Pos()))"},
  {"line":2153,"text":"\tvar foundRange *ast.CommentRange"},
  {"line":2154,"text":"\tfor i := range commentRanges {"},
  {"line":2155,"text":"\t\tcommentRange := &commentRanges[i]"},
  {"line":2156,"text":"\t\tif position >= commentRange.Pos() && position <= commentRange.End() {"},
  {"line":2157,"text":"\t\t\tfoundRange = commentRange"},
  {"line":2158,"text":"\t\t\tbreak"},
  {"line":2159,"text":"\t\t}"},
  {"line":2160,"text":"\t}"},
  {"line":2161,"text":"\tif foundRange == nil {"},
  {"line":2162,"text":"\t\treturn nil"},
  {"line":2163,"text":"\t}"},
  {"line":2165,"text":"\ttext := file.Text()[foundRange.Pos():position]"},
  {"line":2166,"text":"\tprefix, kind, toComplete, ok := parseTripleSlashDirectiveFragment(text)"},
  {"line":2167,"text":"\tif !ok {"},
  {"line":2168,"text":"\t\treturn nil"},
  {"line":2169,"text":"\t}"},
  {"line":2171,"text":"\tscriptPath := tspath.GetDirectoryPath(string(file.Path()))"},
  {"line":2173,"text":"\tvar names []moduleCompletionNameAndKind"},
  {"line":2174,"text":"\tswitch kind {"},
  {"line":2175,"text":"\tcase \"path\":"},
  {"line":2176,"text":"\t\textensionOptions := l.getExtensionOptions(compilerOptions, referenceKindFileName, file, core.ResolutionModeNone, nil /*checker*/)"},
  {"line":2177,"text":"\t\tresult := l.getCompletionEntriesForDirectoryFragment("},
  {"line":2178,"text":"\t\t\ttoComplete,"},
  {"line":2179,"text":"\t\t\tscriptPath,"},
  {"line":2180,"text":"\t\t\textensionOptions,"},
  {"line":2181,"text":"\t\t\tprogram,"},
  {"line":2182,"text":"\t\t\ttrue, /*moduleSpecifierIsRelative*/"},
  {"line":2183,"text":"\t\t\tstring(file.Path()),"},
  {"line":2184,"text":"\t\t\t&moduleCompletionNameAndKindSet{names: make(map[string]moduleCompletionNameAndKind)},"},
  {"line":2185,"text":"\t\t)"},
  {"line":2186,"text":"\t\tnames = slices.Collect(maps.Values(result.names))"},
  {"line":2187,"text":"\tcase \"types\":"},
  {"line":2188,"text":"\t\textensionOptions := l.getExtensionOptions(compilerOptions, referenceKindModuleSpecifier, file, core.ResolutionModeNone, nil /*checker*/)"},
  {"line":2189,"text":"\t\tresult := &moduleCompletionNameAndKindSet{names: make(map[string]moduleCompletionNameAndKind)}"},
  {"line":2190,"text":"\t\tl.getCompletionEntriesFromTypings(program, scriptPath, getFragmentDirectory(toComplete), extensionOptions, result)"},
  {"line":2191,"text":"\t\tnames = slices.Collect(maps.Values(result.names))"},
  {"line":2192,"text":"\t}"},
  {"line":2194,"text":"\treturn addReplacementSpans(toComplete, foundRange.Pos()+len(prefix), names)"},
  {"line":2195,"text":"}"},
];

export function findLsStringCompletionsDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsStringCompletionsDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsStringCompletionsDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsStringCompletionsDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsStringCompletionsLineText(line: number): string | undefined {
  return lsStringCompletionsSourceLines.find((entry) => entry.line === line)?.text;
}
