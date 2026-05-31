import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import {
  anyType,
  bigintType,
  booleanType,
  makeCallSignature,
  neverType,
  nullType,
  numberType,
  regularFalseType,
  regularTrueType,
  stringType,
  undefinedType,
  unknownType,
  unresolvedType,
  voidType,
} from "./checker.checkedtype.js";
import {
  createAsyncIterationTypesResolver,
  createFileIndexMap,
  createSyncIterationTypesResolver,
  countGlobalSymbols,
  getGlobalTypesResolver,
  type CheckerCoreState,
  type CheckerProgram,
} from "./checkerCore.js";
import type { Signature, Type, TypeMapper } from "./types.js";
import { addUndefinedToGlobalsOrErrorOnRedeclaration, mergeGlobalSymbol } from "./globalResolution.js";

let nextCheckerId = 1;

export function createCheckerCoreState(program: CheckerProgram | undefined): CheckerCoreState {
  program?.bindSourceFiles();
  const files = program?.sourceFiles() ?? [];
  const compilerOptions = program?.options();
  const missingSymbol = createMissingSymbol();
  const identityMapper: TypeMapper = { kind: 0, map: type => type };
  const fallbackSignature: Signature = makeCallSignature(unknownType);
  const state = {
    id: nextCheckerId++,
    program,
    compilerOptions,
    files,
    fileIndexMap: createFileIndexMap(files),
    compareSymbols: compareSymbolsBySourceOrder,
    compareSymbolChains: compareSymbolChainsBySourceOrder,
    typeCount: 0,
    symbolCount: countGlobalSymbols(files),
    totalInstantiationCount: 0,
    instantiationCount: 0,
    instantiationDepth: 0,
    inlineLevel: 0,
    currentNode: undefined,
    varianceTypeParameter: undefined,
    languageVersion: optionNumber(compilerOptions, "languageVersion"),
    moduleKind: optionNumber(compilerOptions, "moduleKind"),
    moduleResolutionKind: optionNumber(compilerOptions, "moduleResolutionKind"),
    isInferencePartiallyBlocked: false,
    legacyDecorators: optionBool(compilerOptions, "experimentalDecorators"),
    emitStandardClassFields: optionBool(compilerOptions, "emitStandardClassFields"),
    strictNullChecks: strictOption(compilerOptions, "strictNullChecks"),
    strictFunctionTypes: strictOption(compilerOptions, "strictFunctionTypes"),
    strictBindCallApply: strictOption(compilerOptions, "strictBindCallApply"),
    strictPropertyInitialization: strictOption(compilerOptions, "strictPropertyInitialization"),
    strictBuiltinIteratorReturn: strictOption(compilerOptions, "strictBuiltinIteratorReturn"),
    noImplicitAny: strictOption(compilerOptions, "noImplicitAny"),
    noImplicitThis: strictOption(compilerOptions, "noImplicitThis"),
    useUnknownInCatchVariables: strictOption(compilerOptions, "useUnknownInCatchVariables"),
    exactOptionalPropertyTypes: optionBool(compilerOptions, "exactOptionalPropertyTypes"),
    canCollectSymbolAliasAccessibilityData: false,
    wasCanceled: false,
    saveDeferredDiagnostics: false,
    arrayVariances: [],
    globals: new Map<string, AstSymbol>(),
    stringLiteralTypes: new Map<string, Type>(),
    numberLiteralTypes: new Map<number, Type>(),
    nanType: undefined,
    bigintLiteralTypes: new Map<string, Type>(),
    enumLiteralTypes: new Map<string, Type>(),
    enumNaNLiteralTypes: new Map<AstSymbol, Type>(),
    indexedAccessTypes: new Map<string, Type>(),
    templateLiteralTypes: new Map<string, Type>(),
    stringMappingTypes: new Map<string, Type>(),
    uniqueESSymbolTypes: new Map<AstSymbol, Type>(),
    thisExpandoKinds: new Map<AstSymbol, number>(),
    thisExpandoLocations: new Map<AstSymbol, AstNode>(),
    subtypeReductionCache: new Map<string, readonly Type[]>(),
    cachedTypes: new Map<string, Type>(),
    cachedSignatures: new Map<string, Signature>(),
    undefinedProperties: new Map<string, AstSymbol>(),
    narrowedTypes: new Map<string, Type>(),
    assignmentReducedTypes: new Map<string, Type>(),
    discriminatedContextualTypes: new Map<string, Type>(),
    instantiationExpressionTypes: new Map<string, Type>(),
    substitutionTypes: new Map<string, Type>(),
    reverseMappedCache: new Map<string, Type>(),
    reverseHomomorphicMappedCache: new Map<string, Type>(),
    iterationTypesCache: new Map(),
    markerTypes: new Set<Type>(),
    undefinedSymbol: undefined,
    argumentsSymbol: undefined,
    requireSymbol: undefined,
    unknownSymbol: undefined,
    unresolvedSymbols: new Map<string, AstSymbol>(),
    errorTypes: new Map<string, Type>(),
    moduleSymbols: new Map<AstNode, AstSymbol>(),
    globalThisSymbol: undefined,
    symbolTableAliasCache: new Map<number, readonly AstSymbol[]>(),
    tupleTypes: new Map<string, Type>(),
    unionTypes: new Map<string, Type>(),
    unionOfUnionTypes: new Map<string, Type>(),
    intersectionTypes: new Map<string, Type>(),
    propertiesTypes: new Map<string, Type>(),
    diagnostics: [],
    suggestionDiagnostics: [],
    mergedSymbols: new Map<AstSymbol, AstSymbol>(),
    nodeLinks: new Map<AstNode, unknown>(),
    signatureLinks: new Map<AstNode, unknown>(),
    symbolNodeLinks: new Map<AstNode, unknown>(),
    typeNodeLinks: new Map<AstNode, unknown>(),
    enumMemberLinks: new Map<AstNode, unknown>(),
    assertionLinks: new Map<AstNode, unknown>(),
    arrayLiteralLinks: new Map<AstNode, unknown>(),
    switchStatementLinks: new Map<AstNode, unknown>(),
    jsxElementLinks: new Map<AstNode, unknown>(),
    symbolReferenceLinks: new Map<AstSymbol, unknown>(),
    valueSymbolLinks: new Map<AstSymbol, unknown>(),
    mappedSymbolLinks: new Map<AstSymbol, unknown>(),
    deferredSymbolLinks: new Map<AstSymbol, unknown>(),
    aliasSymbolLinks: new Map<AstSymbol, unknown>(),
    moduleSymbolLinks: new Map<AstSymbol, unknown>(),
    lateBoundLinks: new Map<AstSymbol, unknown>(),
    exportTypeLinks: new Map<AstSymbol, unknown>(),
    membersAndExportsLinks: new Map<AstSymbol, unknown>(),
    typeAliasLinks: new Map<AstSymbol, unknown>(),
    declaredTypeLinks: new Map<AstSymbol, unknown>(),
    spreadLinks: new Map<AstSymbol, unknown>(),
    varianceLinks: new Map<AstSymbol, unknown>(),
    reverseMappedSymbolLinks: new Map<AstSymbol, unknown>(),
    markedAssignmentSymbolLinks: new Map<AstSymbol, unknown>(),
    symbolContainerLinks: new Map<AstSymbol, unknown>(),
    sourceFileLinks: new Map<AstNode, unknown>(),
    patternForType: new Map<Type, AstNode>(),
    contextFreeTypes: new Map<AstNode, Type>(),
    anyType,
    autoType: anyType,
    wildcardType: anyType,
    blockedStringType: stringType,
    errorType: unresolvedType,
    unresolvedType,
    nonInferrableAnyType: anyType,
    intrinsicMarkerType: unknownType,
    unknownType,
    undefinedType,
    undefinedWideningType: undefinedType,
    missingType: undefinedType,
    undefinedOrMissingType: undefinedType,
    optionalType: undefinedType,
    nullType,
    nullWideningType: nullType,
    stringType,
    numberType,
    bigintType,
    regularFalseType,
    falseType: regularFalseType,
    regularTrueType,
    trueType: regularTrueType,
    booleanType,
    esSymbolType: unknownType,
    voidType,
    neverType,
    silentNeverType: neverType,
    implicitNeverType: neverType,
    unreachableNeverType: neverType,
    nonPrimitiveType: unknownType,
    stringOrNumberType: unknownType,
    stringNumberSymbolType: unknownType,
    numberOrBigIntType: unknownType,
    templateConstraintType: unknownType,
    numericStringType: stringType,
    uniqueLiteralType: unknownType,
    uniqueLiteralMapper: identityMapper,
    reliabilityFlags: 0,
    reportUnreliableMapper: identityMapper,
    reportUnmeasurableMapper: identityMapper,
    restrictiveMapper: identityMapper,
    permissiveMapper: identityMapper,
    emptyObjectType: unknownType,
    emptyJsxObjectType: unknownType,
    emptyFreshJsxObjectType: unknownType,
    emptyTypeLiteralType: unknownType,
    unknownEmptyObjectType: unknownType,
    unknownUnionType: unknownType,
    emptyGenericType: unknownType,
    anyFunctionType: anyType,
    noConstraintType: unknownType,
    circularConstraintType: unresolvedType,
    resolvingDefaultType: unresolvedType,
    markerSuperType: unknownType,
    markerSubType: unknownType,
    markerOtherType: unknownType,
    markerSuperTypeForCheck: unknownType,
    markerSubTypeForCheck: unknownType,
    noTypePredicate: undefined,
    anySignature: makeCallSignature(anyType),
    unknownSignature: fallbackSignature,
    resolvingSignature: fallbackSignature,
    silentNeverSignature: makeCallSignature(neverType),
    cachedArgumentsReferenced: new Map<AstNode, boolean>(),
    enumNumberIndexInfo: undefined,
    anyBaseTypeIndexInfo: undefined,
    patternAmbientModules: [],
    patternAmbientModuleAugmentations: new Map<string, AstSymbol>(),
    globalObjectType: unknownType,
    globalFunctionType: unknownType,
    globalCallableFunctionType: unknownType,
    globalNewableFunctionType: unknownType,
    globalArrayType: unknownType,
    globalReadonlyArrayType: unknownType,
    globalStringType: stringType,
    globalNumberType: numberType,
    globalBooleanType: booleanType,
    globalRegExpType: unknownType,
    globalThisType: unknownType,
    anyArrayType: anyType,
    autoArrayType: anyType,
    anyReadonlyArrayType: anyType,
    deferredGlobalImportMetaExpressionType: unknownType,
    contextualBindingPatterns: [],
    emptyStringType: stringType,
    zeroType: numberType,
    zeroBigIntType: bigintType,
    typeofType: unknownType,
    typeResolutions: [],
    resolutionStart: 0,
    inVarianceComputation: false,
    apparentArgumentCount: undefined,
    lastGetCombinedNodeFlagsNode: undefined,
    lastGetCombinedNodeFlagsResult: 0,
    lastGetCombinedModifierFlagsNode: undefined,
    lastGetCombinedModifierFlagsResult: 0,
    freeInferenceState: undefined,
    freeFlowState: undefined,
    flowLoopCache: new Map<string, Type>(),
    flowLoopStack: [],
    sharedFlows: [],
    antecedentTypes: [],
    flowAnalysisDisabled: false,
    flowInvocationCount: 0,
    flowTypeCache: new Map<AstNode, Type>(),
    lastFlowNode: undefined,
    lastFlowNodeReachable: true,
    flowNodeReachable: new Map<unknown, boolean>(),
    flowNodePostSuper: new Map<unknown, boolean>(),
    renamedBindingElementsInTypes: [],
    contextualInfos: [],
    inferenceContextInfos: [],
    awaitedTypeStack: [],
    reverseMappedSourceStack: [],
    reverseMappedTargetStack: [],
    reverseExpandingFlags: 0,
    subtypeRelation: undefined,
    strictSubtypeRelation: undefined,
    assignableRelation: undefined,
    comparableRelation: undefined,
    identityRelation: undefined,
    enumRelation: new Map<string, number>(),
    getGlobalESSymbolType: () => unknownType,
    getGlobalBigIntType: () => bigintType,
    getGlobalImportMetaType: () => unknownType,
    getGlobalImportAttributesType: () => unknownType,
    getGlobalImportAttributesTypeChecked: () => unknownType,
    getGlobalNonNullableTypeAliasOrNil: () => undefined,
    getGlobalExtractSymbol: () => missingSymbol,
    getGlobalDisposableType: () => unknownType,
    getGlobalAsyncDisposableType: () => unknownType,
    getGlobalAwaitedSymbol: () => missingSymbol,
    getGlobalAwaitedSymbolOrNil: () => undefined,
    getGlobalNaNSymbolOrNil: () => undefined,
    getGlobalRecordSymbol: () => missingSymbol,
    getGlobalTemplateStringsArrayType: () => unknownType,
    getGlobalESSymbolConstructorSymbolOrNil: () => undefined,
    getGlobalESSymbolConstructorTypeSymbolOrNil: () => undefined,
    getGlobalImportCallOptionsType: () => unknownType,
    getGlobalImportCallOptionsTypeChecked: () => unknownType,
    getGlobalPromiseType: () => unknownType,
    getGlobalPromiseTypeChecked: () => unknownType,
    getGlobalPromiseLikeType: () => unknownType,
    getGlobalPromiseConstructorSymbol: () => missingSymbol,
    getGlobalPromiseConstructorSymbolOrNil: () => undefined,
    getGlobalOmitSymbol: () => missingSymbol,
    getGlobalNoInferSymbolOrNil: () => undefined,
    getGlobalIteratorType: () => unknownType,
    getGlobalIterableType: () => unknownType,
    getGlobalIterableTypeChecked: () => unknownType,
    getGlobalIterableIteratorType: () => unknownType,
    getGlobalIterableIteratorTypeChecked: () => unknownType,
    getGlobalIteratorObjectType: () => unknownType,
    getGlobalGeneratorType: () => unknownType,
    getGlobalAsyncIteratorType: () => unknownType,
    getGlobalAsyncIterableType: () => unknownType,
    getGlobalAsyncIterableTypeChecked: () => unknownType,
    getGlobalAsyncIterableIteratorType: () => unknownType,
    getGlobalAsyncIterableIteratorTypeChecked: () => unknownType,
    getGlobalAsyncIteratorObjectType: () => unknownType,
    getGlobalAsyncGeneratorType: () => unknownType,
    getGlobalIteratorYieldResultType: () => unknownType,
    getGlobalIteratorReturnResultType: () => unknownType,
    getGlobalTypedPropertyDescriptorType: () => unknownType,
    getGlobalClassDecoratorContextType: () => unknownType,
    getGlobalClassMethodDecoratorContextType: () => unknownType,
    getGlobalClassGetterDecoratorContextType: () => unknownType,
    getGlobalClassSetterDecoratorContextType: () => unknownType,
    getGlobalClassAccessorDecoratorContextType: () => unknownType,
    getGlobalClassAccessorDecoratorTargetType: () => unknownType,
    getGlobalClassAccessorDecoratorResultType: () => unknownType,
    getGlobalClassFieldDecoratorContextType: () => unknownType,
    syncIterationTypesResolver: undefined,
    asyncIterationTypesResolver: undefined,
    isPrimitiveOrObjectOrEmptyType: (type: Type) => type === unknownType || type === anyType,
    containsMissingType: (type: Type) => type === undefinedType,
    couldContainTypeVariables: () => false,
    isStringIndexSignatureOnlyType: () => false,
    markNodeAssignments: () => false,
    compareTypesAssignable: (source: Type, target: Type) => source === target,
    emitResolver: undefined,
    jsxNamespace: "JSX",
    jsxFactoryEntity: undefined,
    skipDirectInferenceNodes: new Set<AstNode>(),
    packagesMap: new Map<string, boolean>(program?.getPackagesMap?.() ?? []),
    activeMappers: [],
    activeTypeMappersCaches: [],
    ambientModules: [],
    withinUnreachableCode: false,
    reportedUnreachableNodes: new Set<AstNode>(),
    nonExistentProperties: new Set<string>(),
    deferredDiagnosticCallbacks: [],
    typeToStringNodebuilder: undefined,
    tracer: undefined,
  } as unknown as CheckerCoreState;
  state.syncIterationTypesResolver = createSyncIterationTypesResolver({
    ...state,
    getGlobalTypesResolver: (names, arity, reportErrors) => getGlobalTypesResolver({
      emptyObjectType: state.emptyObjectType,
      emptyGenericType: state.emptyGenericType,
      resolveName: () => undefined,
      getDeclaredTypeOfSymbol: () => state.emptyObjectType,
      getTypeAliasTypeParameters: () => [],
    }, names, arity, reportErrors),
    getAwaitedType: type => type,
  });
  state.asyncIterationTypesResolver = createAsyncIterationTypesResolver({
    ...state,
    getGlobalTypesResolver: (names, arity, reportErrors) => getGlobalTypesResolver({
      emptyObjectType: state.emptyObjectType,
      emptyGenericType: state.emptyGenericType,
      resolveName: () => undefined,
      getDeclaredTypeOfSymbol: () => state.emptyObjectType,
      getTypeAliasTypeParameters: () => [],
    }, names, arity, reportErrors),
    getAwaitedType: type => type,
  });
  initializeGlobalSymbols(state);
  return state;
}

export function initializeGlobalSymbols(state: CheckerCoreState): void {
  const ambientModuleSymbols: AstSymbol[] = [];
  const augmentations: AstNode[] = [];
  for (const file of state.files) {
    if (!isExternalOrCommonJSModule(file)) {
      const locals = symbolTableOf(file, "locals");
      const globalThis = locals.get("globalThis");
      if (globalThis !== undefined) {
        for (const declaration of globalThis.declarations ?? []) {
          pushDiagnostic(state, declaration, "Declaration_name_conflicts_with_built_in_global_identifier_0", "globalThis");
        }
      }
      for (const symbol of locals.values()) {
        if (((symbol.flags ?? 0) & SymbolFlags.Module) !== 0 && isAmbientModuleSymbolName(symbolName(symbol))) {
          ambientModuleSymbols.push(symbol);
        } else {
          mergeGlobalSymbol(state.globals, symbol);
        }
      }
    }
    const patterns = (file as { readonly patternAmbientModules?: readonly unknown[] }).patternAmbientModules ?? [];
    state.patternAmbientModules = [...state.patternAmbientModules, ...patterns];
    augmentations.push(...((file as { readonly moduleAugmentations?: readonly AstNode[] }).moduleAugmentations ?? []));
    const globalExports = symbolTableOf(file, "globalExports");
    for (const [name, symbol] of globalExports) if (!state.globals.has(name)) state.globals.set(name, symbol);
  }
  for (const augmentation of augmentations) {
    if (isGlobalScopeAugmentation(parentOf(augmentation))) {
      const exports = symbolTableOf(moduleSymbolOf(augmentation), "exports");
      for (const symbol of exports.values()) mergeGlobalSymbol(state.globals, symbol);
    }
  }
  addUndefinedToGlobalsOrErrorOnRedeclaration(state as unknown as Parameters<typeof addUndefinedToGlobalsOrErrorOnRedeclaration>[0]);
  for (const symbol of ambientModuleSymbols) mergeGlobalSymbol(state.globals, symbol);
  for (const augmentation of augmentations) {
    if (!isGlobalScopeAugmentation(parentOf(augmentation))) mergeModuleAugmentationSymbol(state, augmentation);
  }
}

function createMissingSymbol(): AstSymbol {
  return { name: "__missing", escapedName: "__missing", flags: 0, declarations: [] } as unknown as AstSymbol;
}

function isExternalOrCommonJSModule(file: AstNode): boolean {
  return (file as { readonly externalModuleIndicator?: unknown }).externalModuleIndicator !== undefined
    || (file as { readonly commonJsModuleIndicator?: unknown }).commonJsModuleIndicator !== undefined;
}

function symbolTableOf(node: unknown, field: string): Map<string, AstSymbol> {
  const table = (node as Record<string, unknown> | undefined)?.[field];
  return table instanceof Map ? table as Map<string, AstSymbol> : new Map<string, AstSymbol>();
}

function moduleSymbolOf(node: AstNode): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol }).symbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function isGlobalScopeAugmentation(node: AstNode | undefined): boolean {
  return (node as { readonly globalScopeAugmentation?: boolean } | undefined)?.globalScopeAugmentation === true
    || (node as { readonly name?: { readonly text?: string } } | undefined)?.name?.text === "global";
}

function isAmbientModuleSymbolName(name: string): boolean {
  return name.startsWith("\"") || name.includes("*");
}

function mergeModuleAugmentationSymbol(state: CheckerCoreState, augmentation: AstNode): void {
  const symbol = moduleSymbolOf(augmentation);
  const nameNode = (augmentation as { readonly name?: { readonly text?: string } }).name;
  const name = nameNode?.text ?? symbolName(symbol);
  if (symbol === undefined || name.length === 0) return;
  let target = state.globals.get(name);
  if (target === undefined) {
    target = { name, escapedName: name, flags: SymbolFlags.Module, declarations: [], exports: new Map() } as AstSymbol;
    state.globals.set(name, target);
  }
  target.exports = mergeSymbolTableInto(target.exports, symbolTableOf(symbol, "exports"));
}

function mergeSymbolTableInto(target: Map<string, AstSymbol> | undefined, source: Map<string, AstSymbol>): Map<string, AstSymbol> {
  const result = target ?? new Map<string, AstSymbol>();
  for (const symbol of source.values()) mergeGlobalSymbol(result, symbol);
  return result;
}

function pushDiagnostic(state: CheckerCoreState, node: AstNode, message: string, ...args: readonly unknown[]): void {
  (state.diagnostics as unknown[]).push({ file: node, message, args });
}

function compareSymbolsBySourceOrder(left: AstSymbol, right: AstSymbol): number {
  return compareNodesBySourceOrder(left.declarations[0], right.declarations[0]);
}

function compareSymbolChainsBySourceOrder(left: readonly AstSymbol[], right: readonly AstSymbol[]): number {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index++) {
    const result = compareSymbolsBySourceOrder(left[index]!, right[index]!);
    if (result !== 0) return result;
  }
  return left.length - right.length;
}

function compareNodesBySourceOrder(left: AstNode | undefined, right: AstNode | undefined): number {
  if (left === right) return 0;
  if (left === undefined) return -1;
  if (right === undefined) return 1;
  const leftFile = (left as { sourceFile?: AstNode }).sourceFile;
  const rightFile = (right as { sourceFile?: AstNode }).sourceFile;
  if (leftFile !== rightFile) return sourceFileName(leftFile).localeCompare(sourceFileName(rightFile));
  return nodePos(left) - nodePos(right);
}

function sourceFileName(file: AstNode | undefined): string {
  return (file as { fileName?: string } | undefined)?.fileName ?? "";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.escapedName ?? symbol?.name ?? "";
}

function nodePos(node: AstNode): number {
  return (node as { pos?: number }).pos ?? 0;
}

function optionBool(options: unknown, key: string): boolean {
  const value = (options as Record<string, unknown> | undefined)?.[key];
  if (typeof value === "function") return value() === true;
  return value === true;
}

function strictOption(options: unknown, key: string): boolean {
  const strict = optionBool(options, "strict");
  const value = (options as Record<string, unknown> | undefined)?.[key];
  return value === undefined ? strict : value === true;
}

function optionNumber(options: unknown, key: string): number {
  const value = (options as Record<string, unknown> | undefined)?.[key];
  if (typeof value === "function") {
    const called = value();
    return typeof called === "number" ? called : 0;
  }
  return typeof value === "number" ? value : 0;
}
