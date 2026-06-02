import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, nodeSymbol, SymbolFlags } from "../ast/index.js";
import { NameResolver } from "../binder/index.js";
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
  emptyCompilerOptions,
  getEmitModuleKind,
  getEmitScriptTarget,
  getEmitStandardClassFields,
  getModuleResolutionKind,
  getStrictOptionValue,
  type CompilerOptions,
} from "../core/compilerOptions.js";
import { tristateIsTrue, type Tristate } from "../core/tristate.js";
import {
  createAsyncIterationTypesResolver,
  createFileIndexMap,
  createSyncIterationTypesResolver,
  countGlobalSymbols,
  getGlobalTypesResolver,
  type CheckerCoreState,
  type CheckerProgram,
  type IterationTypesResolver,
  type IterationResolverFactoryState,
} from "./checkerCore.js";
import { ObjectFlags, TypeFlags, type Signature, type Type, type TypeMapper } from "./types.js";
import { addUndefinedToGlobalsOrErrorOnRedeclaration, mergeGlobalSymbol } from "./globalResolution.js";

let nextCheckerId = 1;

interface CheckerInitializationDiagnostic {
  readonly file: string;
  readonly message: string;
  readonly args: string[];
}

type CheckerInitializationDiagnosticArgument =
  | string
  | number
  | boolean
  | object
  | null
  | undefined;

export function createCheckerCoreState(program: CheckerProgram | undefined): CheckerCoreState {
  program?.bindSourceFiles();
  const files = program?.sourceFiles() ?? [];
  const compilerOptions = program?.options() ?? emptyCompilerOptions;
  const missingSymbol = createMissingSymbol();
  const identityMapper: TypeMapper = { kind: 0, map: type => type };
  const fallbackSignature: Signature = makeCallSignature(unknownType);
  const uninitializedIterationTypesResolver = createUninitializedIterationTypesResolver();
  const state: CheckerCoreState = {
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
    languageVersion: getEmitScriptTarget(compilerOptions),
    moduleKind: getEmitModuleKind(compilerOptions),
    moduleResolutionKind: getModuleResolutionKind(compilerOptions),
    isInferencePartiallyBlocked: false,
    legacyDecorators: tristateIsTrue(compilerOptions.experimentalDecorators),
    emitStandardClassFields: getEmitStandardClassFields(compilerOptions),
    strictNullChecks: strictOption(compilerOptions, compilerOptions.strictNullChecks),
    strictFunctionTypes: strictOption(compilerOptions, compilerOptions.strictFunctionTypes),
    strictBindCallApply: strictOption(compilerOptions, compilerOptions.strictBindCallApply),
    strictPropertyInitialization: strictOption(compilerOptions, compilerOptions.strictPropertyInitialization),
    strictBuiltinIteratorReturn: strictOption(compilerOptions, compilerOptions.strictBuiltinIteratorReturn),
    noImplicitAny: strictOption(compilerOptions, compilerOptions.noImplicitAny),
    noImplicitThis: strictOption(compilerOptions, compilerOptions.noImplicitThis),
    useUnknownInCatchVariables: strictOption(compilerOptions, compilerOptions.useUnknownInCatchVariables),
    exactOptionalPropertyTypes: tristateIsTrue(compilerOptions.exactOptionalPropertyTypes),
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
    nodeLinks: new Map<AstNode, object>(),
    signatureLinks: new Map<AstNode, object>(),
    symbolNodeLinks: new Map<AstNode, object>(),
    typeNodeLinks: new Map<AstNode, object>(),
    enumMemberLinks: new Map<AstNode, object>(),
    assertionLinks: new Map<AstNode, object>(),
    arrayLiteralLinks: new Map<AstNode, object>(),
    switchStatementLinks: new Map<AstNode, object>(),
    jsxElementLinks: new Map<AstNode, object>(),
    symbolReferenceLinks: new Map<AstSymbol, object>(),
    valueSymbolLinks: new Map<AstSymbol, object>(),
    mappedSymbolLinks: new Map<AstSymbol, object>(),
    deferredSymbolLinks: new Map<AstSymbol, object>(),
    aliasSymbolLinks: new Map<AstSymbol, object>(),
    moduleSymbolLinks: new Map<AstSymbol, object>(),
    lateBoundLinks: new Map<AstSymbol, object>(),
    exportTypeLinks: new Map<AstSymbol, object>(),
    membersAndExportsLinks: new Map<AstSymbol, object>(),
    typeAliasLinks: new Map<AstSymbol, object>(),
    declaredTypeLinks: new Map<AstSymbol, object>(),
    spreadLinks: new Map<AstSymbol, object>(),
    varianceLinks: new Map<AstSymbol, object>(),
    reverseMappedSymbolLinks: new Map<AstSymbol, object>(),
    markedAssignmentSymbolLinks: new Map<AstSymbol, object>(),
    symbolContainerLinks: new Map<AstSymbol, object>(),
    sourceFileLinks: new Map<AstNode, object>(),
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
    syncIterationTypesResolver: uninitializedIterationTypesResolver,
    asyncIterationTypesResolver: uninitializedIterationTypesResolver,
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
  };
  initializeClosures(state);
  initializeIterationResolvers(state);
  initializeChecker(state);
  return state;
}

export function getTypeAliasTypeParameters(symbol: AstSymbol, state: CheckerCoreState): readonly Type[] {
  if (((symbol.flags ?? 0) & SymbolFlags.TypeAlias) === 0) {
    throw new Error("Attempted to fetch type alias parameters for non-type-alias symbol.");
  }
  const links = getOrCreateLink<{ typeParameters?: readonly Type[] }>(state.typeAliasLinks, symbol);
  if (links.typeParameters !== undefined) return links.typeParameters;
  const declaration = (symbol.declarations ?? []).find(node => node.kind === Kind.TypeAliasDeclaration || (node as { readonly typeParameters?: readonly unknown[] }).typeParameters !== undefined);
  const typeParameters = ((declaration as { readonly typeParameters?: readonly AstNode[] } | undefined)?.typeParameters ?? [])
    .map(typeParameter => ({
      flags: TypeFlags.TypeParameter,
      id: ++state.typeCount,
      symbol: nodeSymbol(typeParameter) ?? { name: symbolName(nodeSymbol(typeParameter)) || "T", escapedName: "T", flags: SymbolFlags.TypeParameter, declarations: [typeParameter] },
      data: { constraint: undefined },
    } as Type));
  links.typeParameters = typeParameters;
  return typeParameters;
}

export function initializeClosures(state: CheckerCoreState): void {
  state.isPrimitiveOrObjectOrEmptyType = (type: Type): boolean =>
    (type.flags & (TypeFlags.Primitive | TypeFlags.NonPrimitive)) !== 0 || isEmptyAnonymousObjectType(type);
  state.containsMissingType = (type: Type): boolean =>
    type === state.missingType || ((type.flags & TypeFlags.Union) !== 0 && firstConstituent(type) === state.missingType);
  state.couldContainTypeVariables = couldContainTypeVariablesWorker;
  state.isStringIndexSignatureOnlyType = isStringIndexSignatureOnlyTypeWorker;
  state.markNodeAssignments = markNodeAssignmentsWorker;
  state.compareTypesAssignable = compareTypesAssignableWorker;
}

export function initializeIterationResolvers(state: CheckerCoreState): void {
  const resolverState: IterationResolverFactoryState = {
    ...state,
    getGlobalTypesResolver: (names: readonly string[], arity: number, reportErrors: boolean): (() => readonly Type[]) =>
      getGlobalTypesResolver(createGlobalResolverHost(state), names, arity, reportErrors),
    getAwaitedType: (type: Type): Type => type,
  };
  state.syncIterationTypesResolver = createSyncIterationTypesResolver(resolverState);
  state.asyncIterationTypesResolver = createAsyncIterationTypesResolver(resolverState);
}

export function initializeChecker(state: CheckerCoreState): void {
  initializeGlobalSymbols(state);
  state.globalArrayType = getGlobalTypeOrFallback(state, "Array", 1, state.emptyGenericType);
  state.globalObjectType = getGlobalTypeOrFallback(state, "Object", 0, state.emptyObjectType);
  state.globalFunctionType = getGlobalTypeOrFallback(state, "Function", 0, state.anyFunctionType);
  state.globalCallableFunctionType = getGlobalTypeOrFallback(state, "CallableFunction", 0, state.globalFunctionType);
  state.globalNewableFunctionType = getGlobalTypeOrFallback(state, "NewableFunction", 0, state.globalFunctionType);
  state.globalStringType = getGlobalTypeOrFallback(state, "String", 0, state.stringType);
  state.globalNumberType = getGlobalTypeOrFallback(state, "Number", 0, state.numberType);
  state.globalBooleanType = getGlobalTypeOrFallback(state, "Boolean", 0, state.booleanType);
  state.globalRegExpType = getGlobalTypeOrFallback(state, "RegExp", 0, state.unknownType);
  state.globalReadonlyArrayType = getGlobalTypeOrFallback(state, "ReadonlyArray", 1, state.globalArrayType);
  state.globalThisType = getGlobalTypeOrFallback(state, "ThisType", 1, state.unknownType);
}

export function createNameResolver(state: CheckerCoreState): NameResolver {
  return new NameResolver({
    argumentsSymbol: () => state.argumentsSymbol ?? createSyntheticSymbol("arguments", SymbolFlags.FunctionScopedVariable),
    error: (location, message, ...args) => {
      pushDiagnostic(state, location, message.message, ...args);
    },
    getSymbolOfDeclaration: (node) => nodeSymbol(node),
  }, state.compilerOptions ?? {});
}

export function createNameResolverForSuggestion(state: CheckerCoreState): NameResolver {
  return new NameResolver({
    argumentsSymbol: () => state.argumentsSymbol ?? createSyntheticSymbol("arguments", SymbolFlags.FunctionScopedVariable),
    error: (location, message, ...args) => {
      pushSuggestionDiagnostic(state, location, message.message, ...args);
    },
    getSymbolOfDeclaration: (node) => nodeSymbol(node),
  }, state.compilerOptions ?? {});
}

export function getRequiresScopeChangeCache(state: CheckerCoreState, node: AstNode): number {
  return getOrCreateLink<{ declarationRequiresScopeChange?: number }>(state.nodeLinks, node).declarationRequiresScopeChange ?? 0;
}

export function setRequiresScopeChangeCache(state: CheckerCoreState, node: AstNode, value: number): void {
  getOrCreateLink<{ declarationRequiresScopeChange?: number }>(state.nodeLinks, node).declarationRequiresScopeChange = value;
}

export function checkAndReportErrorForInvalidInitializer(
  state: CheckerCoreState,
  errorLocation: AstNode | undefined,
  name: string,
  propertyWithInvalidInitializer: AstNode,
  result: AstSymbol | undefined,
): boolean {
  if (state.emitStandardClassFields) return false;
  if (errorLocation !== undefined && result === undefined && checkMissingThisPrefix(state, errorLocation, name)) return true;
  const propertyName = declarationName((propertyWithInvalidInitializer as { readonly name?: AstNode }).name);
  pushDiagnostic(
    state,
    errorLocation ?? propertyWithInvalidInitializer,
    "Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor",
    propertyName,
    name,
  );
  return true;
}

export function initializeGlobalSymbols(state: CheckerCoreState): void {
  const ambientModuleSymbols: AstSymbol[] = [];
  const augmentations: AstNode[] = [];
  for (const file of state.files) {
    if (!isExternalOrCommonJSModule(file)) {
      const locals = symbolTableOf(file, "locals");
      const globalThisSymbol = locals.get("globalThis");
      if (globalThisSymbol !== undefined) {
        for (const declaration of globalThisSymbol.declarations ?? []) {
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
  return { name: "__missing", escapedName: "__missing", flags: 0, declarations: [] };
}

function createUninitializedIterationTypesResolver(): IterationTypesResolver {
  const fail = (): never => {
    throw new Error("Iteration types resolver used before checker initialization completed.");
  };
  return {
    iteratorSymbolName: "",
    getGlobalIteratorType: fail,
    getGlobalIterableType: fail,
    getGlobalIterableTypeChecked: fail,
    getGlobalIterableIteratorType: fail,
    getGlobalIterableIteratorTypeChecked: fail,
    getGlobalIteratorObjectType: fail,
    getGlobalGeneratorType: fail,
    getGlobalBuiltinIteratorTypes: fail,
    resolveIterationType: fail,
  };
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

function createGlobalResolverHost(state: CheckerCoreState): Parameters<typeof getGlobalTypesResolver>[0] {
  return {
    emptyObjectType: state.emptyObjectType,
    emptyGenericType: state.emptyGenericType,
    resolveName: (_location, name, meaning) => resolveGlobalSymbol(state, name, meaning),
    getDeclaredTypeOfSymbol: symbol => getDeclaredTypeOfGlobalSymbol(state, symbol),
    getTypeAliasTypeParameters: symbol => getTypeAliasTypeParameters(symbol, state),
  };
}

function resolveGlobalSymbol(state: CheckerCoreState, name: string, meaning: number): AstSymbol | undefined {
  const symbol = state.globals.get(name);
  if (symbol === undefined) return undefined;
  if (meaning === 0 || ((symbol.flags ?? 0) & meaning) !== 0) return symbol;
  return undefined;
}

function getDeclaredTypeOfGlobalSymbol(state: CheckerCoreState, symbol: AstSymbol): Type {
  const cached = state.declaredTypeLinks.get(symbol) as { declaredType?: Type } | undefined;
  if (cached?.declaredType !== undefined) return cached.declaredType;
  const declaredType = {
    flags: TypeFlags.Object,
    id: ++state.typeCount,
    symbol,
    data: {
      objectFlags: ObjectFlags.Anonymous,
      members: symbol.members,
      declaredCallSignatures: [],
      declaredConstructSignatures: [],
      indexInfos: [],
    },
  } as Type;
  getOrCreateLink<{ declaredType?: Type }>(state.declaredTypeLinks, symbol).declaredType = declaredType;
  return declaredType;
}

function getGlobalTypeOrFallback(state: CheckerCoreState, name: string, arity: number, fallback: Type): Type {
  const resolver = getGlobalTypesResolver(createGlobalResolverHost(state), [name], arity, false);
  return resolver()[0] ?? fallback;
}

function createSyntheticSymbol(name: string, flags: SymbolFlags): AstSymbol {
  return { name, escapedName: name, flags, declarations: [] } as AstSymbol;
}

function getOrCreateLink<T extends object>(links: Map<object, object>, key: object): T {
  const existing = links.get(key);
  if (existing !== undefined) return existing as T;
  const created = {} as T;
  links.set(key, created);
  return created;
}

function firstConstituent(type: Type): Type | undefined {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types?.[0];
}

function isEmptyAnonymousObjectType(type: Type): boolean {
  if ((type.flags & TypeFlags.Object) === 0) return false;
  const data = type.data as {
    readonly objectFlags?: ObjectFlags;
    readonly members?: ReadonlyMap<string, unknown>;
    readonly declaredCallSignatures?: readonly unknown[];
    readonly declaredConstructSignatures?: readonly unknown[];
    readonly indexInfos?: readonly unknown[];
  } | undefined;
  if (data === undefined || (data.objectFlags ?? 0) === 0) return false;
  if (((data.objectFlags ?? 0) & ObjectFlags.Anonymous) === 0) return false;
  return (data.members?.size ?? 0) === 0
    && (data.declaredCallSignatures?.length ?? 0) === 0
    && (data.declaredConstructSignatures?.length ?? 0) === 0
    && (data.indexInfos?.length ?? 0) === 0;
}

function couldContainTypeVariablesWorker(type: Type): boolean {
  if ((type.flags & (TypeFlags.TypeVariable | TypeFlags.Instantiable)) !== 0) return true;
  const children = (type.data as { readonly types?: readonly Type[]; readonly resolvedTypeArguments?: readonly Type[]; readonly elementType?: Type } | undefined);
  if (children?.elementType !== undefined && couldContainTypeVariablesWorker(children.elementType)) return true;
  return (children?.types?.some(couldContainTypeVariablesWorker) ?? false)
    || (children?.resolvedTypeArguments?.some(couldContainTypeVariablesWorker) ?? false);
}

function isStringIndexSignatureOnlyTypeWorker(type: Type): boolean {
  const data = type.data as {
    readonly members?: ReadonlyMap<string, unknown>;
    readonly declaredCallSignatures?: readonly unknown[];
    readonly declaredConstructSignatures?: readonly unknown[];
    readonly indexInfos?: readonly { readonly keyType: Type }[];
  } | undefined;
  if ((data?.members?.size ?? 0) !== 0) return false;
  if ((data?.declaredCallSignatures?.length ?? 0) !== 0) return false;
  if ((data?.declaredConstructSignatures?.length ?? 0) !== 0) return false;
  const indexInfos = data?.indexInfos ?? [];
  return indexInfos.length === 1 && (indexInfos[0]!.keyType.flags & TypeFlags.StringLike) !== 0;
}

function markNodeAssignmentsWorker(node: AstNode): boolean {
  (node as { assignmentMarked?: boolean }).assignmentMarked = true;
  return true;
}

function compareTypesAssignableWorker(source: Type, target: Type): boolean {
  if (source === target) return true;
  if ((target.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return true;
  if ((source.flags & TypeFlags.Never) !== 0) return true;
  if ((source.flags & TypeFlags.StringLike) !== 0 && (target.flags & TypeFlags.String) !== 0) return true;
  if ((source.flags & TypeFlags.NumberLike) !== 0 && (target.flags & TypeFlags.Number) !== 0) return true;
  if ((source.flags & TypeFlags.BooleanLike) !== 0 && (target.flags & TypeFlags.Boolean) !== 0) return true;
  return false;
}

function checkMissingThisPrefix(state: CheckerCoreState, errorLocation: AstNode, name: string): boolean {
  const container = enclosingClassLike(errorLocation);
  const members = nodeSymbol(container)?.members;
  if (members?.has(name) !== true) return false;
  pushDiagnostic(state, errorLocation, "Cannot_find_name_0_Did_you_mean_the_instance_member_this_0", name);
  return true;
}

function enclosingClassLike(node: AstNode | undefined): AstNode | undefined {
  for (let current = node; current !== undefined; current = parentOf(current)) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) return current;
  }
  return undefined;
}

function declarationName(node: AstNode | undefined): string {
  const named = node as { readonly text?: string; readonly escapedText?: string } | undefined;
  return named?.text ?? named?.escapedText ?? "<unknown>";
}

function pushDiagnostic(
  state: CheckerCoreState,
  node: AstNode | undefined,
  message: string,
  ...args: readonly CheckerInitializationDiagnosticArgument[]
): void {
  const diagnostic: CheckerInitializationDiagnostic = {
    file: diagnosticFileOf(node),
    message,
    args: diagnosticArgumentsOf(args),
  };
  (state.diagnostics as object[]).push(diagnostic);
}

function pushSuggestionDiagnostic(
  state: CheckerCoreState,
  node: AstNode | undefined,
  message: string,
  ...args: readonly CheckerInitializationDiagnosticArgument[]
): void {
  const diagnostic: CheckerInitializationDiagnostic = {
    file: diagnosticFileOf(node),
    message,
    args: diagnosticArgumentsOf(args),
  };
  (state.suggestionDiagnostics as object[]).push(diagnostic);
}

function diagnosticArgumentOf(value: CheckerInitializationDiagnosticArgument): string {
  return String(value);
}

function diagnosticArgumentsOf(args: readonly CheckerInitializationDiagnosticArgument[]): string[] {
  return args.map(diagnosticArgumentOf);
}

function diagnosticFileOf(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const file = (node as { readonly fileName?: string }).fileName;
  return typeof file === "string" ? file : "";
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

function strictOption(options: CompilerOptions, value: Tristate | undefined): boolean {
  return getStrictOptionValue(options, value);
}
