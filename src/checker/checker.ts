import {
  Kind,
  NodeFlags,
  forEachChild,
  isAwaitExpression,
  isArrowFunction,
  isAsExpression,
  isArrayLiteralExpression,
  isArrayTypeNode,
  isBigIntLiteral,
  isBindingElement,
  isBinaryExpression,
  isBlock,
  isBreakStatement,
  isCallExpression,
  isCallSignatureDeclaration,
  isClassDeclaration,
  isClassExpression,
  isClassStaticBlockDeclaration,
  isComputedPropertyName,
  isContinueStatement,
  isConditionalExpression,
  isConstructorDeclaration,
  isConstructorTypeNode,
  isConstructSignatureDeclaration,
  isDebuggerStatement,
  isDoStatement,
  isElementAccessExpression,
  isEnumDeclaration,
  isExternalModuleReference,
  isExportDeclaration,
  isExportAssignment,
  isExpressionStatement,
  isExpressionWithTypeArguments,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isFunctionExpression,
  isFunctionTypeNode,
  isGetAccessorDeclaration,
  isArrayBindingPattern,
  isIdentifier,
  isIfStatement,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isImportTypeNode,
  isInterfaceDeclaration,
  isIntersectionTypeNode,
  isKeywordExpression,
  isKeywordTypeNode,
  isIndexSignatureDeclaration,
  isIndexedAccessTypeNode,
  isJSDoc,
  isJSDocParameterTag,
  isJSDocReturnTag,
  isJSDocTemplateTag,
  isJSDocTypeTag,
  isLabeledStatement,
  isLiteralTypeNode,
  isMappedTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isMissingDeclaration,
  isModuleBlock,
  isModuleDeclaration,
  isNamedTupleMember,
  isNamedImports,
  isNamedExports,
  isNamespaceImport,
  isNamespaceExportDeclaration,
  isNewExpression,
  isNonNullExpression,
  isNumericLiteral,
  isNoSubstitutionTemplateLiteral,
  isObjectLiteralExpression,
  isObjectBindingPattern,
  isOptionalTypeNode,
  isParenthesizedTypeNode,
  isParenthesizedExpression,
  isParameterDeclaration,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAssignment,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isPrivateIdentifier,
  isQualifiedName,
  isReturnStatement,
  isRestTypeNode,
  isSatisfiesExpression,
  isSetAccessorDeclaration,
  isShorthandPropertyAssignment,
  isSourceFile,
  isSpreadElement,
  isStringLiteral,
  isSwitchStatement,
  isTaggedTemplateExpression,
  isThrowStatement,
  isTypeAssertion,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeNode,
  isTypePredicateNode,
  isTypeQueryNode,
  isTypeReferenceNode,
  isTupleTypeNode,
  isVariableStatement,
  isVariableDeclaration,
  isVariableDeclarationList,
  isUnionTypeNode,
  isWhileStatement,
  isWithStatement,
  isYieldExpression,
  type Block,
  type ArrowFunction,
  type AssertionExpression,
  type BindingElement,
  type BindingName,
  type ClassDeclaration,
  type ClassElement,
  type ClassExpression,
  type ConciseBody,
  type ConstructorDeclaration,
  type EntityName,
  type EnumDeclaration,
  type Expression,
  type ExpressionWithTypeArguments,
  type FunctionDeclaration,
  type FunctionExpression,
  type GetAccessorDeclaration,
  type ImportDeclaration,
  type ImportSpecifier,
  type InterfaceDeclaration,
  type Identifier,
  type IndexSignatureDeclaration,
  type MethodSignatureDeclaration,
  type MethodDeclaration,
  type Node,
  type NodeArray,
  type ParameterDeclaration,
  type PropertyName,
  type PropertySignatureDeclaration,
  type SetAccessorDeclaration,
  type SourceFile,
  type Statement,
  type TypeElement,
  type TypeAliasDeclaration,
  type TypeNode,
  type TypeParameterDeclaration,
  type TypePredicateNode,
  type TypeReferenceNode,
  type VariableDeclaration,
} from "../ast/index.js";
import { createDiagnostic, type Diagnostic } from "../diagnostics/index.js";
import type { CompilerOptions, Program, ProgramDiagnostic } from "../program/index.js";

type PrimitiveTypeName = "any" | "boolean" | "never" | "null" | "number" | "string" | "undefined" | "unknown" | "void";

type ClassLikeDeclaration = ClassDeclaration | ClassExpression;

interface TupleElementType {
  readonly name?: string;
  readonly type: CheckedType;
  readonly optional: boolean;
}

type CheckedType =
  | { readonly kind: PrimitiveTypeName | "unresolved" }
  | { readonly kind: "array"; readonly elementType: CheckedType }
  | { readonly kind: "readonlyArray"; readonly elementType: CheckedType }
  | { readonly kind: "builtinConstructor"; readonly name: string; readonly instanceType: CheckedType; readonly constructorParameters: readonly CheckedType[]; readonly staticProperties: ReadonlyMap<string, CheckedType> }
  | { readonly kind: "classInstance"; readonly name: string; readonly typeParameters: readonly string[]; readonly typeArguments: readonly CheckedType[]; readonly members: ClassMemberNames; readonly arrayBaseElementType?: CheckedType }
  | { readonly kind: "classConstructor"; readonly name: string; readonly typeParameters: readonly string[]; readonly typeArguments: readonly CheckedType[]; readonly constructorParameters: readonly CheckedType[]; readonly abstract: boolean; readonly members: ClassMemberNames; readonly baseType?: CheckedType; readonly arrayBaseElementType?: CheckedType }
  | { readonly kind: "accessorProperty"; readonly type: CheckedType }
  | { readonly kind: "arrayLike"; readonly elementType: CheckedType }
  | { readonly kind: "arrayIterator"; readonly elementType: CheckedType }
  | { readonly kind: "function"; readonly typeParameters: readonly string[]; readonly parameters: readonly CheckedType[]; readonly returnType: CheckedType; readonly parameterNames?: readonly string[]; readonly restParameterIndex?: number; readonly minArgumentCount?: number; readonly maxArgumentCount?: number; readonly overloads?: readonly CheckedFunctionType[]; readonly construct?: boolean }
  | { readonly kind: "functionDeclaration"; readonly name: string; readonly type: CheckedFunctionType }
  | { readonly kind: "globalObject" }
  | { readonly kind: "intrinsicConstructor"; readonly intrinsic: "Set" }
  | { readonly kind: "intrinsicFunction"; readonly intrinsic: "Array.from" | "Array.isArray" | "ArrayBuffer.isView" }
  | { readonly kind: "interface"; readonly name: string; readonly members: InterfaceMembers; readonly typeArguments?: readonly CheckedType[] }
  | { readonly kind: "intersection"; readonly types: readonly CheckedType[] }
  | { readonly kind: "iterable"; readonly elementType: CheckedType }
  | { readonly kind: "moduleNamespace"; readonly moduleSpecifier: string; readonly diagnosticName: string; readonly exports: ReadonlyMap<string, CheckedType>; readonly exportEquals?: CheckedType }
  | { readonly kind: "namespace"; readonly name: string; readonly exports: ReadonlyMap<string, CheckedType>; readonly enumLike?: boolean }
  | { readonly kind: "namespaceAndType"; readonly namespace: Extract<CheckedType, { readonly kind: "namespace" }>; readonly type: CheckedType }
  | { readonly kind: "nonNullable"; readonly target: CheckedType }
  | { readonly kind: "object"; readonly properties: ReadonlyMap<string, CheckedType>; readonly readonlyProperties: ReadonlySet<string>; readonly optionalProperties: ReadonlySet<string>; readonly methodProperties: ReadonlySet<string>; readonly callSignatures?: readonly CheckedFunctionType[]; readonly stringIndexType?: CheckedType; readonly numberIndexType?: CheckedType; readonly contextualDiagnostics?: boolean }
  | { readonly kind: "record"; readonly keyType: CheckedType; readonly valueType: CheckedType; readonly mappedArraySource?: CheckedType }
  | { readonly kind: "thisClass"; readonly className: string; readonly members: ClassMemberNames; readonly abstractProperties: ReadonlySet<string>; readonly abstractPropertyDeclaringClasses: ReadonlyMap<string, string>; readonly uninitializedProperties: ReadonlySet<string>; readonly mode: "constructor" | "fieldInitializer" | "method" }
  | { readonly kind: "typeAlias"; readonly name: string; readonly typeParameters: readonly string[]; readonly target: CheckedType; readonly preserveDisplay: boolean; readonly requiresExplicitDeclarationAnnotation: boolean }
  | { readonly kind: "typeAliasInstance"; readonly name: string; readonly typeArguments: readonly CheckedType[]; readonly target: CheckedType; readonly requiresExplicitDeclarationAnnotation: boolean }
  | { readonly kind: "typeParameter"; readonly name: string; readonly constraint?: CheckedType }
  | { readonly kind: "set"; readonly elementType: CheckedType }
  | { readonly kind: "booleanLiteral"; readonly value: boolean }
  | { readonly kind: "numberLiteral"; readonly value: string }
  | { readonly kind: "stringLiteral"; readonly value: string }
  | { readonly kind: "tuple"; readonly elements: readonly TupleElementType[]; readonly restElementType?: CheckedType }
  | { readonly kind: "typePredicate"; readonly parameterName: string; readonly assertedType: CheckedType; readonly asserts: boolean; readonly parameterIndex?: number }
  | { readonly kind: "union"; readonly types: readonly CheckedType[] }
  | { readonly kind: "unassignedVariable"; readonly name: string; readonly type: CheckedType }
  | { readonly kind: "unqualifiedStaticMember"; readonly className: string; readonly memberName: string }
  | { readonly kind: "unqualifiedInstanceMember"; readonly memberName: string }
  | { readonly kind: "valueOnly"; readonly name: string; readonly type: CheckedType }
  | { readonly kind: "valueAndType"; readonly value: CheckedType; readonly type: CheckedType };

type CheckedFunctionType = Extract<CheckedType, { readonly kind: "function" }>;

export type CheckDiagnostic = Diagnostic;

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
  readonly options: CompilerOptions;
  readonly isJavaScriptFile: boolean;
  readonly strictMode: boolean;
  readonly strictModeReason: "class" | "module" | "strict" | undefined;
  readonly argumentsForbiddenInClassInitializerOrStaticBlock: boolean;
  readonly insideFunction: boolean;
  readonly iterationDepth: number;
  readonly yieldType: CheckedType | undefined;
  readonly resolveExternalModule?: (moduleSpecifier: string) => CheckedType | undefined;
  readonly functionOverloadInfo?: FunctionOverloadInfo;
}

type TypeEnvironment = Map<string, CheckedType>;

interface BindingCorrelation {
  readonly sourceType: CheckedType;
  readonly bindings: ReadonlyMap<string, string>;
}

const environmentCorrelations = new WeakMap<TypeEnvironment, readonly BindingCorrelation[]>();
const readonlyEnvironmentBindings = new WeakMap<TypeEnvironment, ReadonlySet<string>>();

function cloneTypeEnvironment(environment: TypeEnvironment): TypeEnvironment {
  const cloned = new Map(environment);
  copyEnvironmentCorrelations(environment, cloned);
  copyReadonlyEnvironmentBindings(environment, cloned);
  return cloned;
}

function copyEnvironmentCorrelations(source: TypeEnvironment, target: TypeEnvironment): void {
  const correlations = environmentCorrelations.get(source);
  if (correlations !== undefined) {
    environmentCorrelations.set(target, correlations);
  }
}

function addEnvironmentCorrelation(environment: TypeEnvironment, correlation: BindingCorrelation): void {
  const existing = environmentCorrelations.get(environment) ?? [];
  environmentCorrelations.set(environment, [...existing, correlation]);
}

function copyReadonlyEnvironmentBindings(source: TypeEnvironment, target: TypeEnvironment): void {
  const readonlyBindings = readonlyEnvironmentBindings.get(source);
  if (readonlyBindings !== undefined) {
    readonlyEnvironmentBindings.set(target, new Set(readonlyBindings));
  }
}

function setEnvironmentBindingReadonly(environment: TypeEnvironment, name: string, readonly: boolean): void {
  const existing = readonlyEnvironmentBindings.get(environment);
  if (readonly) {
    if (existing === undefined) {
      readonlyEnvironmentBindings.set(environment, new Set([name]));
      return;
    }
    (existing as Set<string>).add(name);
    return;
  }
  if (existing !== undefined) {
    (existing as Set<string>).delete(name);
  }
}

function isReadonlyEnvironmentBinding(environment: TypeEnvironment, name: string): boolean {
  return readonlyEnvironmentBindings.get(environment)?.has(name) === true;
}

interface ClassMemberNames {
  readonly className: string | undefined;
  readonly instance: ReadonlySet<string>;
  readonly static: ReadonlySet<string>;
  readonly abstractMembers: ReadonlyMap<string, string>;
  readonly abstractProperties: ReadonlySet<string>;
  readonly abstractPropertyDeclaringClasses: ReadonlyMap<string, string>;
  readonly propertyDeclaringClasses: ReadonlyMap<string, string>;
  readonly propertyTypes: ReadonlyMap<string, CheckedType>;
  readonly getAccessorProperties: ReadonlySet<string>;
  readonly readonlyProperties: ReadonlySet<string>;
  readonly optionalProperties: ReadonlySet<string>;
  readonly nominalProperties: ReadonlySet<string>;
  readonly uninitializedProperties: ReadonlySet<string>;
}

interface AccessorContextTypes {
  readonly getterType?: CheckedType;
  readonly setterType?: CheckedType;
}

interface InterfaceMembers {
  readonly name: string;
  readonly typeParameters: readonly string[];
  readonly properties: ReadonlyMap<string, CheckedType>;
  readonly optionalProperties: ReadonlySet<string>;
  readonly methodProperties: ReadonlySet<string>;
  readonly callSignatures: readonly CheckedFunctionType[];
  readonly stringIndexType?: CheckedType;
  readonly numberIndexType?: CheckedType;
}

interface SubstitutionContext {
  readonly types: WeakMap<object, CheckedType>;
  readonly interfaceMembers: WeakMap<InterfaceMembers, InterfaceMembers>;
}

interface ModuleExportInfo {
  readonly exports: ReadonlyMap<string, CheckedType>;
  readonly exportEquals?: CheckedType;
}

interface FunctionOverloadInfo {
  readonly declarationsWithImplementation: ReadonlySet<FunctionDeclaration>;
  readonly implementations: ReadonlySet<FunctionDeclaration>;
}

const anyType: CheckedType = { kind: "any" };
const unknownType: CheckedType = { kind: "unknown" };
const unresolvedType: CheckedType = { kind: "unresolved" };
const neverType: CheckedType = { kind: "never" };
const nullType: CheckedType = { kind: "null" };
const numberType: CheckedType = { kind: "number" };
const stringType: CheckedType = { kind: "string" };
const voidType: CheckedType = { kind: "void" };
const booleanType: CheckedType = { kind: "boolean" };
const undefinedType: CheckedType = { kind: "undefined" };
const globalObjectType: CheckedType = { kind: "globalObject" };
const emptyStringSet: ReadonlySet<string> = new Set();
const emptyTypeSubstitutions: ReadonlyMap<string, CheckedType> = new Map();

function standardFunctionType(parameters: readonly CheckedType[], returnType: CheckedType, options: Omit<CheckedFunctionType, "kind" | "typeParameters" | "parameters" | "returnType"> = {}): CheckedFunctionType {
  return { kind: "function", typeParameters: [], parameters, ...options, returnType };
}

function functionDeclarationBinding(name: string, type: CheckedFunctionType): Extract<CheckedType, { readonly kind: "functionDeclaration" }> {
  return { kind: "functionDeclaration", name, type };
}

function standardGlobalFunction(name: string, parameters: readonly CheckedType[], returnType: CheckedType, options: Omit<CheckedFunctionType, "kind" | "typeParameters" | "parameters" | "returnType"> = {}): CheckedType {
  return functionDeclarationBinding(name, standardFunctionType(parameters, returnType, options));
}

function standardInterfaceType(
  name: string,
  properties: ReadonlyMap<string, CheckedType>,
  options: {
    readonly optionalProperties?: ReadonlySet<string>;
    readonly methodProperties?: ReadonlySet<string>;
    readonly stringIndexType?: CheckedType;
    readonly numberIndexType?: CheckedType;
  } = {},
): CheckedType {
  return {
    kind: "interface",
    name,
    members: {
      name,
      typeParameters: [],
      properties,
      optionalProperties: options.optionalProperties ?? emptyStringSet,
      methodProperties: options.methodProperties ?? emptyStringSet,
      callSignatures: [],
      ...(options.stringIndexType === undefined ? {} : { stringIndexType: options.stringIndexType }),
      ...(options.numberIndexType === undefined ? {} : { numberIndexType: options.numberIndexType }),
    },
  };
}

const boxedNumberType: CheckedType = {
  kind: "interface",
  name: "Number",
  members: {
    name: "Number",
    typeParameters: [],
    properties: new Map<string, CheckedType>([
      ["toExponential", { kind: "function", typeParameters: [], parameters: [], returnType: stringType }],
      ["toFixed", { kind: "function", typeParameters: [], parameters: [], returnType: stringType }],
      ["toPrecision", { kind: "function", typeParameters: [], parameters: [], returnType: stringType }],
      ["toString", { kind: "function", typeParameters: [], parameters: [], returnType: stringType }],
      ["valueOf", { kind: "function", typeParameters: [], parameters: [], returnType: numberType }],
    ]),
    optionalProperties: new Set(),
    methodProperties: new Set(["toExponential", "toFixed", "toPrecision", "toString", "valueOf"]),
    callSignatures: [],
  },
};
const boxedStringType: CheckedType = {
  kind: "interface",
  name: "String",
  members: {
    name: "String",
    typeParameters: [],
    properties: new Map<string, CheckedType>([
      ["length", numberType],
      ["toString", { kind: "function", typeParameters: [], parameters: [], returnType: stringType }],
      ["valueOf", { kind: "function", typeParameters: [], parameters: [], returnType: stringType }],
    ]),
    optionalProperties: new Set(),
    methodProperties: new Set(["toString", "valueOf"]),
    callSignatures: [],
  },
};
const errorInterfaceType: CheckedType = {
  kind: "interface",
  name: "Error",
  members: {
    name: "Error",
    typeParameters: [],
    properties: new Map<string, CheckedType>([
      ["name", stringType],
      ["message", stringType],
    ]),
    optionalProperties: new Set(),
    methodProperties: new Set(),
    callSignatures: [],
  },
};
const stringDictionaryType: CheckedType = {
  kind: "object",
  properties: new Map(),
  readonlyProperties: new Set(),
  optionalProperties: new Set(),
  methodProperties: new Set(),
  stringIndexType: stringType,
};
const optionalStringDictionaryType = unionType([stringDictionaryType, undefinedType]);
const stringArraySliceType = standardFunctionType([numberType, numberType], { kind: "array", elementType: stringType }, { minArgumentCount: 0, maxArgumentCount: 2 });
const templateStringsArrayType = standardInterfaceType("TemplateStringsArray", new Map<string, CheckedType>([
  ["length", numberType],
  ["raw", { kind: "readonlyArray", elementType: stringType }],
]), {
  numberIndexType: stringType,
});
const regExpMatchArrayType = standardInterfaceType("RegExpMatchArray", new Map<string, CheckedType>([
  ["length", numberType],
  ["0", stringType],
  ["index", unionType([numberType, undefinedType])],
  ["input", unionType([stringType, undefinedType])],
  ["groups", optionalStringDictionaryType],
  ["slice", stringArraySliceType],
]), {
  optionalProperties: new Set(["index", "input", "groups"]),
  methodProperties: new Set(["slice"]),
  numberIndexType: stringType,
});
const regExpExecArrayType = standardInterfaceType("RegExpExecArray", new Map<string, CheckedType>([
  ["length", numberType],
  ["0", stringType],
  ["index", numberType],
  ["input", stringType],
  ["groups", optionalStringDictionaryType],
  ["slice", stringArraySliceType],
]), {
  optionalProperties: new Set(["groups"]),
  methodProperties: new Set(["slice"]),
  numberIndexType: stringType,
});
const regexpInterfaceType: CheckedType = {
  kind: "interface",
  name: "RegExp",
  members: {
    name: "RegExp",
    typeParameters: [],
    properties: new Map<string, CheckedType>([
      ["exec", standardFunctionType([stringType], unionType([regExpExecArrayType, nullType]), { parameterNames: ["string"] })],
      ["test", { kind: "function", typeParameters: [], parameters: [stringType], parameterNames: ["string"], returnType: booleanType }],
      ["source", stringType],
      ["global", booleanType],
    ]),
    optionalProperties: new Set(),
    methodProperties: new Set(["exec", "test"]),
    callSignatures: [],
  },
};
const iArgumentsType: CheckedType = {
  kind: "interface",
  name: "IArguments",
  members: {
    name: "IArguments",
    typeParameters: [],
    properties: new Map([
      ["length", numberType],
      ["callee", anyType],
    ]),
    optionalProperties: new Set(),
    methodProperties: new Set(),
    callSignatures: [],
    numberIndexType: anyType,
  },
};
const typedArrayGlobalNames = [
  "BigInt64Array",
  "BigUint64Array",
  "DataView",
  "Float16Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
] as const;
const invalidClassNames = new Set(["any", "bigint", "boolean", "never", "number", "object", "string", "symbol", "undefined", "unknown", "void"]);
const typeOnlyKeywordValueNames = new Set(["any", "bigint", "boolean", "never", "number", "object", "string", "symbol", "unknown", "void"]);
const strictModeReservedIdentifierNames = new Set(["private", "protected", "public"]);
const ambientTypeNames = new Set([
  "Array",
  "ArrayIterator",
  "ArrayLike",
  "BigInt",
  "Boolean",
  "CallableFunction",
  "ConstructorParameters",
  "Date",
  "Error",
  "Exclude",
  "Extract",
  "Function",
  "IArguments",
  "InstanceType",
  "IterableIterator",
  "Map",
  "NewableFunction",
  "NonNullable",
  "Number",
  "Object",
  "Omit",
  "Parameters",
  "Partial",
  "Pick",
  "Promise",
  "PropertyKey",
  "Readonly",
  "ReadonlyArray",
  "Record",
  "RegExp",
  "RegExpExecArray",
  "RegExpMatchArray",
  "Required",
  "ReturnType",
  "Set",
  "String",
  "Symbol",
  "TemplateStringsArray",
  "ThisType",
  "WeakMap",
  "WeakSet",
  ...typedArrayGlobalNames,
]);

export function checkSourceFile(sourceFile: SourceFile, options: CompilerOptions = {}): CheckResult {
  const state = checkStateForSourceFile(sourceFile, options);
  checkStatements(sourceFile.statements, state, standardGlobalEnvironment(), undefined, isDeclarationFile(sourceFile));
  return { diagnostics: reportableCheckDiagnostics(state) };
}

export function checkProgram(program: Program): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [...program.diagnostics];
  if (diagnostics.some(diagnostic => diagnostic.code === undefined || !syntaxDiagnosticCodes.has(diagnostic.code))) {
    return diagnostics;
  }
  const globalEnvironment = globalEnvironmentForProgram(program);
  const moduleResolver = programModuleResolver(program, globalEnvironment);
  for (const sourceFile of program.sourceFiles) {
    const state: CheckState = {
      diagnostics: [],
      options: program.options,
      isJavaScriptFile: isJavaScriptFileName(sourceFile.fileName),
      strictMode: sourceFileStrictMode(sourceFile.sourceFile, program.options),
      strictModeReason: sourceFileStrictModeReason(sourceFile.sourceFile, program.options),
      argumentsForbiddenInClassInitializerOrStaticBlock: false,
      insideFunction: false,
      iterationDepth: 0,
      yieldType: undefined,
      resolveExternalModule: moduleSpecifier => moduleResolver(sourceFile.fileName, moduleSpecifier),
    };
    checkStatements(sourceFile.sourceFile.statements, state, cloneTypeEnvironment(globalEnvironment), undefined, isDeclarationFile(sourceFile.sourceFile));
    const checkDiagnostics = reportableCheckDiagnostics(state);
    if (checkDiagnostics.length > 0) {
      diagnostics.push(...checkDiagnostics.map(diagnostic => ({
        fileName: sourceFile.fileName,
        code: diagnostic.code,
        category: diagnostic.category,
        key: diagnostic.key,
        messageText: diagnostic.messageText,
        message: diagnostic.message,
      })));
    }
  }
  return diagnostics;
}

function reportableCheckDiagnostics(state: CheckState): readonly CheckDiagnostic[] {
  if (shouldReportAllCheckDiagnostics(state)) {
    return state.diagnostics;
  }
  return state.diagnostics.filter(diagnostic => plainJavaScriptCheckDiagnosticCodes.has(diagnostic.code));
}

function shouldReportAllCheckDiagnostics(state: CheckState): boolean {
  return !state.isJavaScriptFile || state.options.checkJs === true;
}

const syntaxDiagnosticCodes = new Set<number>([1003, 1005, 1011, 1068, 1109, 1127, 1128, 1200, 1359, 1434, 1437, 1440, 1490]);
const plainJavaScriptCheckDiagnosticCodes = new Set<number>([
  1100,
  1101,
  1104,
  1105,
  1107,
  1114,
  1115,
  1116,
  1155,
  1183,
  1210,
  1212,
  1215,
  1244,
  1245,
  1248,
  1253,
  1267,
  1268,
  1318,
  1344,
  1355,
  18045,
]);

function checkStateForSourceFile(sourceFile: SourceFile, options: CompilerOptions): CheckState {
  return {
    diagnostics: [],
    options,
    isJavaScriptFile: isJavaScriptFileName(sourceFile.fileName),
    strictMode: sourceFileStrictMode(sourceFile, options),
    strictModeReason: sourceFileStrictModeReason(sourceFile, options),
    argumentsForbiddenInClassInitializerOrStaticBlock: false,
    insideFunction: false,
    iterationDepth: 0,
    yieldType: undefined,
  };
}

function sourceFileStrictMode(sourceFile: SourceFile, options: CompilerOptions): boolean {
  return options.alwaysStrict === true || sourceFileHasUseStrictPrologue(sourceFile) || sourceFileIsExternalModule(sourceFile);
}

function sourceFileStrictModeReason(sourceFile: SourceFile, options: CompilerOptions): "module" | "strict" | undefined {
  if (sourceFileIsExternalModule(sourceFile)) {
    return "module";
  }
  return options.alwaysStrict === true || sourceFileHasUseStrictPrologue(sourceFile) ? "strict" : undefined;
}

function sourceFileHasUseStrictPrologue(sourceFile: SourceFile): boolean {
  for (const statement of sourceFile.statements) {
    if (!isExpressionStatement(statement) || !isStringLiteral(statement.expression)) {
      return false;
    }
    if (statement.expression.text === "use strict") {
      return true;
    }
  }
  return false;
}

function sourceFileIsExternalModule(sourceFile: SourceFile): boolean {
  return sourceFile.statements.some(statement => isImportDeclaration(statement) || isImportEqualsDeclaration(statement) || isExportDeclaration(statement) || isExportAssignment(statement) || isExportedElement(statement));
}

function isDeclarationFile(sourceFile: SourceFile): boolean {
  return sourceFile.isDeclarationFile || sourceFile.fileName.endsWith(".d.ts") || sourceFile.fileName.endsWith(".d.mts") || sourceFile.fileName.endsWith(".d.cts");
}

function isJavaScriptFileName(fileName: string): boolean {
  return fileName.endsWith(".js") || fileName.endsWith(".jsx") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs");
}

function isRelativeModuleName(moduleSpecifier: string): boolean {
  return moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../") || moduleSpecifier.startsWith(".\\") || moduleSpecifier.startsWith("..\\");
}

function programModuleResolver(program: Program, globalEnvironment: TypeEnvironment): (containingFileName: string, moduleSpecifier: string) => CheckedType | undefined {
  const sourceFiles = new Map(program.sourceFiles.map(sourceFile => [sourceFile.fileName, sourceFile]));
  const ambientModules = new Map<string, Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>>();
  for (const sourceFile of program.sourceFiles) {
    for (const statement of sourceFile.sourceFile.statements) {
      const specifier = ambientModuleSpecifier(statement);
      if (specifier !== undefined && !sourceFileIsExternalModule(sourceFile.sourceFile)) {
        ambientModules.set(specifier, statement as Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>);
      }
    }
  }
  const exportCache = new Map<string, ModuleExportInfo>();
  const ambientExportCache = new Map<string, ModuleExportInfo>();
  const moduleNamespaceForResolvedFile = (moduleSpecifier: string, resolvedFileName: string): CheckedType => {
    const exportInfo = moduleExportInfo(resolvedFileName);
    return {
      kind: "moduleNamespace",
      moduleSpecifier,
      diagnosticName: moduleNamespaceDiagnosticName(moduleSpecifier),
      exports: exportInfo.exports,
      ...(exportInfo.exportEquals === undefined ? {} : { exportEquals: exportInfo.exportEquals }),
    };
  };
  const moduleExportInfo = (fileName: string): ModuleExportInfo => {
    const cached = exportCache.get(fileName);
    if (cached !== undefined) {
      return cached;
    }
    const sourceFile = sourceFiles.get(fileName);
    if (sourceFile === undefined) {
      return { exports: new Map() };
    }
    const pending: ModuleExportInfo = { exports: new Map() };
    exportCache.set(fileName, pending);
    const environment = cloneTypeEnvironment(globalEnvironment);
    const exportState: CheckState = {
      ...emptyCheckState(program.options),
      resolveExternalModule: moduleSpecifier => {
        const resolvedFileName = sourceFile.resolvedModules.find(module => module.specifier === moduleSpecifier)?.fileName;
        if (resolvedFileName !== undefined) {
          return moduleNamespaceForResolvedFile(moduleSpecifier, resolvedFileName);
        }
        if (ambientModules.has(moduleSpecifier)) {
          const ambientExports = ambientModuleExportInfo(moduleSpecifier);
          const namespace: CheckedType = {
            kind: "moduleNamespace",
            moduleSpecifier,
            diagnosticName: moduleNamespaceDiagnosticName(moduleSpecifier),
            exports: ambientExports.exports,
          };
          return ambientExports.exportEquals === undefined ? namespace : { ...namespace, exportEquals: ambientExports.exportEquals };
        }
        return undefined;
      },
    };
    checkStatements(sourceFile.sourceFile.statements, exportState, environment, undefined, isDeclarationFile(sourceFile.sourceFile));
    const exports = new Map<string, CheckedType>();
    let exportEquals: CheckedType | undefined;
    for (const statement of sourceFile.sourceFile.statements) {
      if (isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && isStringLiteral(statement.moduleSpecifier)) {
        const moduleSpecifier = statement.moduleSpecifier;
        const reexportedFileName = sourceFile.resolvedModules.find(module => module.specifier === moduleSpecifier.text)?.fileName;
        const reexported = reexportedFileName === undefined ? undefined : moduleExportInfo(reexportedFileName);
        collectReExports(statement, reexported, exports);
        continue;
      }
      collectModuleExport(statement, exports, environment);
      if (isExportAssignment(statement) && !statement.isExportEquals && isIdentifier(statement.expression)) {
        const exported = environment.get(statement.expression.text);
        if (exported !== undefined) {
          mergeModuleExport(exports, "default", exported);
        }
      }
      if (isExportAssignment(statement) && statement.isExportEquals) {
        exportEquals = isIdentifier(statement.expression) ? environment.get(statement.expression.text) ?? anyType : anyType;
        continue;
      }
      if (!isExportedElement(statement)) {
        continue;
      }
      for (const exportName of namespaceExportNames(statement)) {
        const exportType = environment.get(exportName);
        if (exportType !== undefined) {
          exports.set(exportName, exportType);
        }
      }
    }
    const info = exportEquals === undefined ? { exports } : { exports, exportEquals };
    exportCache.set(fileName, info);
    return info;
  };
  const ambientModuleExportInfo = (moduleSpecifier: string): ModuleExportInfo => {
    const cached = ambientExportCache.get(moduleSpecifier);
    if (cached !== undefined) {
      return cached;
    }
    const moduleDeclaration = ambientModules.get(moduleSpecifier);
    if (moduleDeclaration === undefined || !isModuleBlock(moduleDeclaration.body)) {
      return { exports: new Map() };
    }
    const moduleEnvironment = cloneTypeEnvironment(globalEnvironment);
    checkStatements(moduleDeclaration.body.statements, emptyCheckState(), moduleEnvironment, undefined, true);
    const info = ambientModuleExports(moduleDeclaration.body.statements, moduleEnvironment);
    ambientExportCache.set(moduleSpecifier, info);
    return info;
  };
  return (containingFileName, moduleSpecifier) => {
    const sourceFile = sourceFiles.get(containingFileName);
    const resolvedFileName = sourceFile?.resolvedModules.find(module => module.specifier === moduleSpecifier)?.fileName;
    if (resolvedFileName !== undefined) {
      return moduleNamespaceForResolvedFile(moduleSpecifier, resolvedFileName);
    }
    if (ambientModules.has(moduleSpecifier)) {
      const ambientExports = ambientModuleExportInfo(moduleSpecifier);
      const namespace: CheckedType = {
        kind: "moduleNamespace",
        moduleSpecifier,
        diagnosticName: moduleNamespaceDiagnosticName(moduleSpecifier),
        exports: ambientExports.exports,
      };
      return ambientExports.exportEquals === undefined ? namespace : { ...namespace, exportEquals: ambientExports.exportEquals };
    }
    return undefined;
  };
}

function globalEnvironmentForProgram(program: Program): TypeEnvironment {
  const environment: TypeEnvironment = standardGlobalEnvironment();
  for (const sourceFile of program.sourceFiles) {
    if (!sourceFileIsExternalModule(sourceFile.sourceFile)) {
      checkStatements(sourceFile.sourceFile.statements, checkStateForSourceFile(sourceFile.sourceFile, program.options), environment, undefined, isDeclarationFile(sourceFile.sourceFile));
      continue;
    }
    for (const statement of sourceFile.sourceFile.statements) {
      if (isModuleDeclaration(statement) && ambientModuleSpecifier(statement) === undefined && hasDeclareModifier(statement)) {
        checkModuleDeclaration(statement, checkStateForSourceFile(sourceFile.sourceFile, program.options), environment, undefined, true);
      }
    }
  }
  return environment;
}

function standardGlobalEnvironment(): TypeEnvironment {
  const entries: Array<readonly [string, CheckedType]> = [
    ["Array", { kind: "valueAndType", value: { kind: "object", properties: new Map([["from", { kind: "intrinsicFunction", intrinsic: "Array.from" }], ["fromAsync", anyType], ["isArray", { kind: "intrinsicFunction", intrinsic: "Array.isArray" }]]), readonlyProperties: new Set(), optionalProperties: new Set(), methodProperties: new Set() }, type: anyType }],
    ["ArrayBuffer", { kind: "valueAndType", value: { kind: "object", properties: new Map([["isView", { kind: "intrinsicFunction", intrinsic: "ArrayBuffer.isView" }]]), readonlyProperties: new Set(), optionalProperties: new Set(), methodProperties: new Set() }, type: anyType }],
    ["ArrayBufferView", anyType],
    ["BigInt", anyType],
    ["Date", anyType],
    ["Error", { kind: "valueAndType", value: { kind: "builtinConstructor", name: "Error", instanceType: errorInterfaceType, constructorParameters: [stringType], staticProperties: new Map() }, type: errorInterfaceType }],
    ["FinalizationRegistry", anyType],
    ["console", {
      kind: "object",
      properties: new Map([
        ["debug", { kind: "function", typeParameters: [], parameters: [anyType], restParameterIndex: 0, returnType: voidType }],
        ["error", { kind: "function", typeParameters: [], parameters: [anyType], restParameterIndex: 0, returnType: voidType }],
        ["info", { kind: "function", typeParameters: [], parameters: [anyType], restParameterIndex: 0, returnType: voidType }],
        ["log", { kind: "function", typeParameters: [], parameters: [anyType], restParameterIndex: 0, returnType: voidType }],
        ["warn", { kind: "function", typeParameters: [], parameters: [anyType], restParameterIndex: 0, returnType: voidType }],
      ]),
      readonlyProperties: new Set(),
      optionalProperties: new Set(),
      methodProperties: new Set(["debug", "error", "info", "log", "warn"]),
    }],
    ["eval", standardGlobalFunction("eval", [stringType], anyType, { minArgumentCount: 0, maxArgumentCount: 1 })],
    ["Iterable", anyType],
    ["IterableIterator", { kind: "arrayIterator", elementType: anyType }],
    ["Math", {
      kind: "namespace",
      name: "Math",
      exports: new Map([
        ["E", numberType],
        ["LN10", numberType],
        ["LN2", numberType],
        ["LOG10E", numberType],
        ["LOG2E", numberType],
        ["PI", numberType],
        ["SQRT1_2", numberType],
        ["SQRT2", numberType],
        ["abs", standardFunctionType([numberType], numberType)],
        ["acos", standardFunctionType([numberType], numberType)],
        ["asin", standardFunctionType([numberType], numberType)],
        ["atan", standardFunctionType([numberType], numberType)],
        ["atan2", standardFunctionType([numberType, numberType], numberType)],
        ["ceil", standardFunctionType([numberType], numberType)],
        ["cos", standardFunctionType([numberType], numberType)],
        ["exp", standardFunctionType([numberType], numberType)],
        ["floor", standardFunctionType([numberType], numberType)],
        ["log", standardFunctionType([numberType], numberType)],
        ["max", standardFunctionType([numberType], numberType, { restParameterIndex: 0, minArgumentCount: 0 })],
        ["min", standardFunctionType([numberType], numberType, { restParameterIndex: 0, minArgumentCount: 0 })],
        ["pow", standardFunctionType([numberType, numberType], numberType)],
        ["random", { kind: "function", typeParameters: [], parameters: [], returnType: numberType }],
        ["round", standardFunctionType([numberType], numberType)],
        ["sin", standardFunctionType([numberType], numberType)],
        ["sqrt", { kind: "function", typeParameters: [], parameters: [numberType], returnType: numberType }],
        ["tan", standardFunctionType([numberType], numberType)],
      ]),
    }],
    ["Promise", anyType],
    ["Number", { kind: "valueAndType", value: anyType, type: boxedNumberType }],
    ["Object", {
      kind: "valueAndType",
      value: {
        kind: "builtinConstructor",
        name: "Object",
        instanceType: globalObjectType,
        constructorParameters: [anyType],
        staticProperties: new Map([
          ["create", { kind: "function", typeParameters: [], parameters: [globalObjectType], parameterNames: ["o"], minArgumentCount: 1, maxArgumentCount: 1, returnType: anyType }],
        ]),
      },
      type: globalObjectType,
    }],
    ["RegExp", { kind: "valueAndType", value: { kind: "builtinConstructor", name: "RegExp", instanceType: regexpInterfaceType, constructorParameters: [stringType], staticProperties: new Map() }, type: regexpInterfaceType }],
    ["RegExpExecArray", regExpExecArrayType],
    ["RegExpMatchArray", regExpMatchArrayType],
    ["Set", { kind: "intrinsicConstructor", intrinsic: "Set" }],
    ["String", { kind: "valueAndType", value: { kind: "builtinConstructor", name: "String", instanceType: boxedStringType, constructorParameters: [anyType], staticProperties: new Map() }, type: boxedStringType }],
    ["Symbol", anyType],
    ["TemplateStringsArray", templateStringsArrayType],
    ["WeakMap", anyType],
    ["WeakRef", anyType],
    ["WeakSet", anyType],
    ["parseInt", standardGlobalFunction("parseInt", [stringType], numberType)],
    ["undefined", undefinedType],
  ];
  for (const name of typedArrayGlobalNames) {
    entries.push([name, anyType]);
  }
  return new Map(entries);
}

function collectReExports(statement: Extract<Statement, { readonly kind: Kind.ExportDeclaration }>, reexported: ModuleExportInfo | undefined, exports: Map<string, CheckedType>): void {
  if (statement.exportClause === undefined) {
    if (reexported !== undefined) {
      for (const [name, type] of reexported.exports.entries()) {
        mergeModuleExport(exports, name, type);
      }
    }
    return;
  }
  if (!isNamedExports(statement.exportClause)) {
    return;
  }
  for (const element of statement.exportClause.elements) {
    const exportedName = moduleExportNameText(element.name);
    const localName = element.propertyName === undefined ? exportedName : moduleExportNameText(element.propertyName);
    mergeModuleExport(exports, exportedName, reexported?.exports.get(localName) ?? anyType);
  }
}

function collectModuleExport(statement: Statement, exports: Map<string, CheckedType>, environment: TypeEnvironment): void {
  if (isExportAssignment(statement) && !statement.isExportEquals) {
    mergeModuleExport(exports, "default", { kind: "valueOnly", name: "default", type: anyType });
    return;
  }
  if (isExportDeclaration(statement) && statement.moduleSpecifier === undefined && statement.exportClause !== undefined && isNamedExports(statement.exportClause)) {
    for (const element of statement.exportClause.elements) {
      const exportedName = moduleExportNameText(element.name);
      const localName = element.propertyName === undefined ? exportedName : moduleExportNameText(element.propertyName);
      mergeModuleExport(exports, exportedName, environment.get(localName) ?? { kind: "valueOnly", name: localName, type: anyType });
    }
    return;
  }
  if (!isExportedElement(statement) || !hasDefaultModifier(statement as { readonly modifiers?: readonly { readonly kind: Kind }[] })) {
    return;
  }
  if (isInterfaceDeclaration(statement)) {
    mergeModuleExport(exports, "default", statement.name === undefined ? anyType : environment.get(statement.name.text) ?? anyType);
    return;
  }
  if (isClassDeclaration(statement) || isFunctionDeclaration(statement)) {
    mergeModuleExport(exports, "default", anyType);
  }
}

function mergeModuleExport(exports: Map<string, CheckedType>, name: string, type: CheckedType): void {
  const existing = exports.get(name);
  exports.set(name, mergeBinding(existing, type, anyType));
}

function ambientModuleExports(statements: readonly Statement[], environment: TypeEnvironment): ModuleExportInfo {
  for (const statement of statements) {
    if (isExportAssignment(statement) && statement.isExportEquals) {
      const exported = isIdentifier(statement.expression) ? environment.get(statement.expression.text) : undefined;
      const namespace = exported === undefined ? undefined : namespaceMeaning(exported);
      if (namespace !== undefined) {
        return { exports: namespace.exports, exportEquals: exported! };
      }
      if (exported?.kind === "moduleNamespace") {
        return { exports: exported.exports, exportEquals: exported.exportEquals ?? exported };
      }
      if (exported?.kind === "object") {
        return { exports: exported.properties, exportEquals: exported };
      }
      return exported === undefined ? { exports: new Map() } : { exports: new Map(), exportEquals: exported };
    }
  }
  const exports = new Map<string, CheckedType>();
  for (const statement of statements) {
    if (!isExportedElement(statement)) {
      continue;
    }
    for (const exportName of namespaceExportNames(statement)) {
      const exportType = environment.get(exportName);
      exports.set(exportName, exportType ?? anyType);
    }
  }
  return { exports };
}

function checkStatements(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean, reportAmbientStatementDiagnostic = true): void {
  prebindStatementDeclarations(statements, state, environment, ambient);
  const functionOverloadInfo = prebindFunctionOverloadDeclarations(statements, state, environment, ambient);
  const statementState = functionOverloadInfo === undefined ? state : { ...state, functionOverloadInfo };
  checkFunctionDeclarationOverloads(statements, state, ambient);
  let ambientDiagnosticStatement: Statement | undefined;
  if (ambient && reportAmbientStatementDiagnostic && statements.some(isStatementDisallowedInAmbientContext)) {
    state.diagnostics.push(createDiagnostic(1036));
    ambientDiagnosticStatement = statements.find(isStatementDisallowedInAmbientContext);
  }
  const statementListHasExportedElements = statements.some(statement => isExportedElement(statement));
  for (const statement of statements) {
    checkStatement(statement, statementState, environment, expectedReturnType, ambient, statementListHasExportedElements, statement === ambientDiagnosticStatement);
  }
}

function checkStatement(statement: Statement, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean, statementListHasExportedElements: boolean, ambientStatementDiagnosticReported = false, singleStatementContext = false): void {
  if (isImportDeclaration(statement)) {
    bindImportDeclaration(statement, state, environment);
    return;
  }
  if (isImportEqualsDeclaration(statement)) {
    environment.set(statement.name.text, importEqualsDeclarationType(statement, state, environment));
    return;
  }
  if (isVariableStatement(statement)) {
    checkJavaScriptDeclareModifier(statement, state);
    checkSingleStatementDeclaration(statement, state, singleStatementContext);
    for (const declaration of statement.declarationList.declarations) {
      checkVariableDeclaration(declaration, state, environment, ambient || hasDeclareModifier(statement));
    }
    return;
  }
  if (isFunctionDeclaration(statement)) {
    checkJavaScriptDeclareModifier(statement, state);
    checkFunctionDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isClassDeclaration(statement)) {
    checkJavaScriptDeclareModifier(statement, state);
    checkClassDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isEnumDeclaration(statement)) {
    checkJavaScriptDeclareModifier(statement, state);
    checkEnumDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isInterfaceDeclaration(statement)) {
    checkSingleStatementDeclaration(statement, state, singleStatementContext);
    checkInterfaceDeclaration(statement, state, environment);
    return;
  }
  if (isTypeAliasDeclaration(statement)) {
    checkSingleStatementDeclaration(statement, state, singleStatementContext);
    bindTypeAliasDeclaration(statement, state, environment);
    return;
  }
  if (isModuleDeclaration(statement)) {
    checkJavaScriptDeclareModifier(statement, state);
    checkModuleDeclaration(statement, state, environment, expectedReturnType, ambient);
    return;
  }
  if (isExportAssignment(statement)) {
    checkExportAssignment(statement, state, environment, statementListHasExportedElements, ambient);
    return;
  }
  if (isIfStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.thenStatement, state, narrowedEnvironmentForCondition(statement.expression, state, environment), expectedReturnType, ambient, false, false, true);
    if (statement.elseStatement !== undefined) {
      checkStatement(statement.elseStatement, state, cloneTypeEnvironment(environment), expectedReturnType, ambient, false, false, true);
    }
    return;
  }
  if (isWhileStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.statement, enterIteration(state), cloneTypeEnvironment(environment), expectedReturnType, ambient, false, false, true);
    return;
  }
  if (isDoStatement(statement)) {
    checkStatement(statement.statement, enterIteration(state), cloneTypeEnvironment(environment), expectedReturnType, ambient, false, false, true);
    inferExpression(statement.expression, state, environment);
    return;
  }
  if (isForStatement(statement)) {
    const loopEnvironment = cloneTypeEnvironment(environment);
    if (statement.initializer !== undefined) {
      checkForInitializer(statement.initializer, state, loopEnvironment);
    }
    if (statement.condition !== undefined) {
      inferExpression(statement.condition, state, loopEnvironment);
    }
    if (statement.incrementor !== undefined) {
      inferExpression(statement.incrementor, state, loopEnvironment);
    }
    checkStatement(statement.statement, enterIteration(state), loopEnvironment, expectedReturnType, ambient, false, false, true);
    return;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    const loopEnvironment = cloneTypeEnvironment(environment);
    checkForInitializer(statement.initializer, state, loopEnvironment, true);
    const iteratedType = inferExpression(statement.expression, state, loopEnvironment);
    if (isForOfStatement(statement)) {
      checkIterationInputType(iteratedType, state, "forOf");
    }
    checkStatement(statement.statement, enterIteration(state), loopEnvironment, expectedReturnType, ambient, false, false, true);
    return;
  }
  if (isSwitchStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkSwitchDefaultClauses(statement, state);
    for (let clauseIndex = 0; clauseIndex < statement.caseBlock.clauses.length; clauseIndex += 1) {
      const clause = statement.caseBlock.clauses[clauseIndex]!;
      if (clause.kind === Kind.CaseClause) {
        inferExpression(clause.expression, state, environment);
      }
      checkStatements(clause.statements, state, switchClauseEnvironment(statement.expression, statement.caseBlock.clauses, clauseIndex, state, environment), expectedReturnType, ambient, false);
    }
    return;
  }
  if (isContinueStatement(statement)) {
    if (!ambientStatementDiagnosticReported) {
      checkBreakOrContinueStatement(statement, state);
    }
    return;
  }
  if (isBreakStatement(statement)) {
    if (!ambientStatementDiagnosticReported) {
      checkBreakOrContinueStatement(statement, state);
    }
    return;
  }
  if (isDebuggerStatement(statement)) {
    return;
  }
  if (isReturnStatement(statement)) {
    if (!state.insideFunction) {
      state.diagnostics.push(createDiagnostic(1108));
    }
    const actual = statement.expression === undefined ? voidType : inferExpressionWithContext(statement.expression, state, environment, expectedReturnType);
    if (expectedReturnType !== undefined) {
      checkAssignable(actual, expectedReturnType, state);
    }
    return;
  }
  if (isThrowStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    return;
  }
  if (isWithStatement(statement)) {
    if (state.strictMode) {
      state.diagnostics.push(createDiagnostic(1101));
    }
    state.diagnostics.push(createDiagnostic(2410));
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.statement, state, cloneTypeEnvironment(environment), expectedReturnType, ambient, false);
    return;
  }
  if (isLabeledStatement(statement)) {
    checkDuplicateLabel(statement, state);
    if (state.strictMode && isVariableStatement(statement.statement)) {
      state.diagnostics.push(createDiagnostic(1344));
    }
    checkStatement(statement.statement, state, environment, expectedReturnType, ambient, false, false, singleStatementContext);
    return;
  }
  if (isExpressionStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    applyAssertionCallNarrowing(statement.expression, state, environment);
    return;
  }
  if (isBlock(statement)) {
    checkBlock(statement, state, environment, expectedReturnType);
  }
}

function checkSingleStatementDeclaration(statement: Statement, state: CheckState, singleStatementContext: boolean): void {
  if (!singleStatementContext) {
    return;
  }
  const declarationKind = singleStatementDeclarationKind(statement);
  if (declarationKind !== undefined) {
    state.diagnostics.push(createDiagnostic(1156, declarationKind));
  }
}

function singleStatementDeclarationKind(statement: Statement): string | undefined {
  if (isVariableStatement(statement)) {
    if ((statement.declarationList.flags & NodeFlags.Const) !== 0) {
      return "const";
    }
    if ((statement.declarationList.flags & NodeFlags.Let) !== 0) {
      return "let";
    }
  }
  if (isInterfaceDeclaration(statement)) {
    return "interface";
  }
  if (isTypeAliasDeclaration(statement)) {
    return "type";
  }
  return undefined;
}

function checkSwitchDefaultClauses(statement: Extract<Statement, { readonly kind: Kind.SwitchStatement }>, state: CheckState): void {
  let seenDefault = false;
  for (const clause of statement.caseBlock.clauses) {
    if (clause.kind !== Kind.DefaultClause) {
      continue;
    }
    if (seenDefault) {
      state.diagnostics.push(createDiagnostic(1113));
      return;
    }
    seenDefault = true;
  }
}

function checkBreakOrContinueStatement(statement: Extract<Statement, { readonly kind: Kind.BreakStatement | Kind.ContinueStatement }>, state: CheckState): void {
  const targetLabel = statement.label?.text;
  let current: Node | undefined = statement;
  while (current !== undefined) {
    if (current !== statement && isFunctionOrStaticBlockJumpBoundary(current)) {
      state.diagnostics.push(createDiagnostic(1107));
      return;
    }
    if (isLabeledStatement(current) && targetLabel !== undefined && current.label.text === targetLabel) {
      if (isContinueStatement(statement) && !isIterationStatement(current.statement, true)) {
        state.diagnostics.push(createDiagnostic(1115));
      }
      return;
    }
    if (isSwitchStatement(current) && isBreakStatement(statement) && targetLabel === undefined) {
      return;
    }
    if (targetLabel === undefined && isIterationStatement(current, false)) {
      return;
    }
    current = current.parent;
  }

  if (targetLabel !== undefined) {
    state.diagnostics.push(createDiagnostic(isBreakStatement(statement) ? 1116 : 1115));
    return;
  }
  state.diagnostics.push(createDiagnostic(isBreakStatement(statement) ? 1105 : 1104));
}

function checkDuplicateLabel(statement: Extract<Statement, { readonly kind: Kind.LabeledStatement }>, state: CheckState): void {
  const label = statement.label.text;
  let current: Node | undefined = statement.parent;
  while (current !== undefined && !isFunctionOrStaticBlockJumpBoundary(current)) {
    if (isLabeledStatement(current) && current.label.text === label) {
      state.diagnostics.push(createDiagnostic(1114, label));
      return;
    }
    current = current.parent;
  }
}

function isIterationStatement(node: Node, lookInLabeledStatements: boolean): boolean {
  if (isWhileStatement(node) || isDoStatement(node) || isForStatement(node) || isForInStatement(node) || isForOfStatement(node)) {
    return true;
  }
  return lookInLabeledStatements && isLabeledStatement(node) && isIterationStatement(node.statement, true);
}

function isFunctionOrStaticBlockJumpBoundary(node: Node): boolean {
  return isFunctionDeclaration(node)
    || isFunctionExpression(node)
    || isArrowFunction(node)
    || isMethodDeclaration(node)
    || isConstructorDeclaration(node)
    || isGetAccessorDeclaration(node)
    || isSetAccessorDeclaration(node)
    || isClassStaticBlockDeclaration(node);
}

function isStatementDisallowedInAmbientContext(statement: Statement): boolean {
  return !isImportDeclaration(statement)
    && !isImportEqualsDeclaration(statement)
    && !isVariableStatement(statement)
    && !isFunctionDeclaration(statement)
    && !isClassDeclaration(statement)
    && !isEnumDeclaration(statement)
    && !isInterfaceDeclaration(statement)
    && !isTypeAliasDeclaration(statement)
    && !isModuleDeclaration(statement)
    && !isNamespaceExportDeclaration(statement)
    && !isExportDeclaration(statement)
    && !isExportAssignment(statement);
}

function enterIteration(state: CheckState): CheckState {
  return { ...state, iterationDepth: state.iterationDepth + 1 };
}

function enterFunction(state: CheckState, yieldType?: CheckedType): CheckState {
  return { ...state, argumentsForbiddenInClassInitializerOrStaticBlock: false, insideFunction: true, iterationDepth: 0, yieldType };
}

function enterArrowFunction(state: CheckState): CheckState {
  return { ...state, insideFunction: true, iterationDepth: 0, yieldType: undefined };
}

function enterClassBody(state: CheckState): CheckState {
  return { ...state, strictMode: true, strictModeReason: "class" };
}

function enterClassInitializerOrStaticBlock(state: CheckState): CheckState {
  return { ...state, argumentsForbiddenInClassInitializerOrStaticBlock: true };
}

function prebindStatementDeclarations(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  for (const statement of statements) {
    if (isTypeAliasDeclaration(statement)) {
      bindTypeAliasDeclaration(statement, emptyCheckState(state.options), environment);
    }
  }
  for (const statement of statements) {
    if (isInterfaceDeclaration(statement)) {
      bindInterfaceDeclaration(statement, emptyCheckState(state.options), environment);
    } else if (isEnumDeclaration(statement)) {
      bindEnumDeclaration(statement, emptyCheckState(state.options), environment, ambient || hasDeclareModifier(statement));
    }
  }
}

function prebindFunctionOverloadDeclarations(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, ambient: boolean): FunctionOverloadInfo | undefined {
  const declarationsWithImplementation = new Set<FunctionDeclaration>();
  const implementations = new Set<FunctionDeclaration>();
  for (let index = 0; index < statements.length; index += 1) {
    const statement = statements[index]!;
    if (!isFunctionDeclaration(statement) || statement.name === undefined) {
      continue;
    }
    const group = consecutiveFunctionDeclarations(statements, index, statement.name.text);
    if (group.length <= 1) {
      continue;
    }
    index += group.length - 1;
    const overloads = group.filter(declaration => declaration.body === undefined);
    if (overloads.length === 0) {
      continue;
    }
    const implementation = group.find(declaration => declaration.body !== undefined);
    const ambientGroup = ambient || group.every(declaration => hasDeclareModifier(declaration));
    if (implementation === undefined && !ambientGroup) {
      continue;
    }
    const signatureState = emptyCheckState(state.options);
    const overloadTypes = overloads.map(overload => functionDeclarationType(overload, environment, signatureState));
    const surfaceType = implementation === undefined
      ? overloadTypes[0]!
      : functionDeclarationType(implementation, environment, signatureState);
    environment.set(statement.name.text, functionDeclarationBinding(statement.name.text, { ...surfaceType, overloads: overloadTypes }));
    if (implementation !== undefined) {
      implementations.add(implementation);
      for (const overload of overloads) {
        declarationsWithImplementation.add(overload);
      }
      diagnoseImplementationSignatureCompatibility(overloadTypes, surfaceType, state);
    }
  }
  if (declarationsWithImplementation.size === 0 && implementations.size === 0) {
    return undefined;
  }
  return { declarationsWithImplementation, implementations };
}

function consecutiveFunctionDeclarations(statements: readonly Statement[], startIndex: number, name: string): readonly FunctionDeclaration[] {
  const declarations: FunctionDeclaration[] = [];
  for (let index = startIndex; index < statements.length; index += 1) {
    const statement = statements[index]!;
    if (!isFunctionDeclaration(statement) || statement.name?.text !== name) {
      break;
    }
    declarations.push(statement);
  }
  return declarations;
}

function diagnoseImplementationSignatureCompatibility(overloads: readonly CheckedFunctionType[], implementation: CheckedFunctionType, state: CheckState): void {
  const reported = new Set<string>();
  for (const overload of overloads) {
    if (functionOverloadCompatibleWithImplementation(overload, implementation, state.options)) {
      continue;
    }
    const key = functionSignatureKey(overload);
    if (reported.has(key)) {
      continue;
    }
    reported.add(key);
    state.diagnostics.push(createDiagnostic(2394));
  }
}

function functionOverloadCompatibleWithImplementation(overload: CheckedFunctionType, implementation: CheckedFunctionType, options: CompilerOptions): boolean {
  if ((implementation.minArgumentCount ?? 0) > (overload.minArgumentCount ?? 0)) {
    return false;
  }
  for (let index = 0; index < implementation.parameters.length && index < overload.parameters.length; index += 1) {
    const overloadParameter = functionParameterTypeAt(overload, index);
    const implementationParameter = functionParameterTypeAt(implementation, index);
    if (overloadParameter === undefined || implementationParameter === undefined) {
      continue;
    }
    if (!isAssignableTo(overloadParameter, implementationParameter, options)) {
      return false;
    }
  }
  return implementation.returnType.kind === "unresolved"
    || overload.returnType.kind === "unresolved"
    || isAssignableTo(overload.returnType, implementation.returnType, options);
}

function functionSignatureKey(functionType: CheckedFunctionType): string {
  return `${functionType.parameters.map(displayType).join(",")}=>${displayType(functionType.returnType)}`;
}

function bindTypeAliasDeclaration(statement: TypeAliasDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const aliasEnvironment = cloneTypeEnvironment(environment);
  const typeParameters = statement.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, aliasEnvironment);
  addTypeParameterConstraintsToEnvironment(statement.typeParameters, aliasEnvironment);
  environment.set(statement.name.text, {
    kind: "typeAlias",
    name: statement.name.text,
    typeParameters,
    target: typeFromTypeNode(statement.type, aliasEnvironment, state),
    preserveDisplay: isIntersectionTypeNode(statement.type) || isFunctionTypeNode(statement.type),
    requiresExplicitDeclarationAnnotation: typeAliasRequiresExplicitDeclarationAnnotation(statement),
  });
}

function typeAliasRequiresExplicitDeclarationAnnotation(statement: TypeAliasDeclaration): boolean {
  return typeNodeReferencesName(statement.type, statement.name.text)
    && typeNodeHasNonTrivialSerializationCycle(statement.type);
}

function typeNodeReferencesName(type: TypeNode, name: string): boolean {
  const visit = (node: Node): true | undefined => {
    if (isTypeReferenceNode(node) && entityNameText(node.typeName) === name) {
      return true;
    }
    return forEachChild(node, visit);
  };
  return visit(type) === true;
}

function typeNodeHasNonTrivialSerializationCycle(type: TypeNode): boolean {
  const visit = (node: Node): true | undefined => {
    if (
      node.kind === Kind.ConditionalType
      || node.kind === Kind.IndexedAccessType
      || node.kind === Kind.InferType
      || node.kind === Kind.MappedType
    ) {
      return true;
    }
    return forEachChild(node, visit);
  };
  return visit(type) === true;
}

function importEqualsDeclarationType(statement: Extract<Statement, { readonly kind: Kind.ImportEqualsDeclaration }>, state: CheckState, environment: TypeEnvironment): CheckedType {
  if (isExternalModuleReference(statement.moduleReference) && isStringLiteral(statement.moduleReference.expression)) {
    const moduleSpecifier = statement.moduleReference.expression.text;
    const resolved = state.resolveExternalModule?.(moduleSpecifier);
    return resolved?.kind === "moduleNamespace" ? resolved.exportEquals ?? resolved : resolved ?? { kind: "moduleNamespace", moduleSpecifier, diagnosticName: moduleNamespaceDiagnosticName(moduleSpecifier), exports: new Map() };
  }
  if (isIdentifier(statement.moduleReference) || isQualifiedName(statement.moduleReference)) {
    return resolveEntityName(statement.moduleReference, environment, state, "namespace") ?? anyType;
  }
  return anyType;
}

function moduleNamespaceDiagnosticName(moduleSpecifier: string): string {
  const withoutRelativePrefix = moduleSpecifier.replace(/^\.?\//, "");
  return withoutRelativePrefix.replace(/\.(?:[cm]?[jt]sx?|d\.[cm]?ts)$/, "");
}

function checkExportAssignment(statement: Extract<Statement, { readonly kind: Kind.ExportAssignment }>, state: CheckState, environment: TypeEnvironment, statementListHasExportedElements: boolean, ambient: boolean): void {
  if (ambient && !isEntityNameExpression(statement.expression)) {
    state.diagnostics.push(createDiagnostic(2714));
    return;
  }
  if (!ambient || !statement.isExportEquals) {
    if (isIdentifier(statement.expression) && !environment.has(statement.expression.text)) {
      state.diagnostics.push(createDiagnostic(2304, statement.expression.text));
    } else {
      inferExpression(statement.expression, state, environment);
    }
  }
  if (statement.isExportEquals && statementListHasExportedElements) {
    state.diagnostics.push(createDiagnostic(2309));
  }
}

function isEntityNameExpression(expression: Expression): boolean {
  if (isIdentifier(expression)) {
    return true;
  }
  return isPropertyAccessExpression(expression) && isEntityNameExpression(expression.expression);
}

function checkModuleDeclaration(moduleDeclaration: Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean): void {
  if (isMissingModuleDeclarationName(moduleDeclaration)) {
    state.diagnostics.push(createDiagnostic(moduleDeclaration.keyword === Kind.ModuleKeyword ? 2591 : 2304, moduleDeclaration.keyword === Kind.ModuleKeyword ? "module" : "namespace"));
  }
  if (isGlobalAmbientExternalModuleDeclaration(moduleDeclaration) && isStringLiteral(moduleDeclaration.name) && isRelativeModuleName(moduleDeclaration.name.text)) {
    state.diagnostics.push(createDiagnostic(2436));
  }
  if (isGlobalAmbientExternalModuleDeclaration(moduleDeclaration) && isModuleBlock(moduleDeclaration.body)) {
    for (const statement of moduleDeclaration.body.statements) {
      if (isAmbientExternalModuleRelativeImportOrExport(statement)) {
        state.diagnostics.push(createDiagnostic(2439));
      }
    }
  }
  const moduleName = moduleDeclarationName(moduleDeclaration);
  const namespaceEnvironment = cloneTypeEnvironment(environment);
  const moduleBodyAmbient = ambient || hasDeclareModifier(moduleDeclaration);
  if (isModuleBlock(moduleDeclaration.body)) {
    if (!moduleBodyAmbient) {
      checkNamespaceValueDeclarationDuplicates(moduleDeclaration.body.statements, state);
    }
    checkStatements(moduleDeclaration.body.statements, state, namespaceEnvironment, expectedReturnType, moduleBodyAmbient);
  } else if (isModuleDeclaration(moduleDeclaration.body)) {
    checkModuleDeclaration(moduleDeclaration.body, state, namespaceEnvironment, expectedReturnType, moduleBodyAmbient);
  }
  if (moduleName === undefined) {
    return;
  }
  const existing = environment.get(moduleName);
  const exports = new Map(existing?.kind === "namespace" ? existing.exports : []);
  if (isModuleBlock(moduleDeclaration.body)) {
    for (const statement of moduleDeclaration.body.statements) {
      if (!moduleBodyAmbient && !isExportedElement(statement)) {
        continue;
      }
      for (const exportName of namespaceExportNames(statement)) {
        const exportType = namespaceEnvironment.get(exportName);
        if (exportType !== undefined) {
          exports.set(exportName, qualifyNamespaceExport(exportType, `${moduleName}.${exportName}`));
        }
      }
    }
  } else if (isModuleDeclaration(moduleDeclaration.body)) {
    const exportName = moduleDeclarationName(moduleDeclaration.body);
    const exportType = exportName === undefined ? undefined : namespaceEnvironment.get(exportName);
    if (exportName !== undefined && exportType !== undefined) {
      exports.set(exportName, qualifyNamespaceExport(exportType, `${moduleName}.${exportName}`));
    }
  }
  const namespaceType: Extract<CheckedType, { readonly kind: "namespace" }> = { kind: "namespace", name: moduleName, exports };
  environment.set(moduleName, mergeNamespaceType(environment.get(moduleName), namespaceType));
}

function isMissingModuleDeclarationName(moduleDeclaration: Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>): boolean {
  return isIdentifier(moduleDeclaration.name) && moduleDeclaration.name.text === "";
}

function checkNamespaceValueDeclarationDuplicates(statements: readonly Statement[], state: CheckState): void {
  const variableNames = new Set<string>();
  const functionNames = new Set<string>();
  for (const statement of statements) {
    if (isVariableStatement(statement)) {
      for (const name of statement.declarationList.declarations.flatMap(declaration => bindingNameExportNames(declaration.name))) {
        variableNames.add(name);
      }
    }
    if (isFunctionDeclaration(statement) && statement.name !== undefined) {
      functionNames.add(statement.name.text);
    }
  }
  const duplicates = new Set([...variableNames].filter(name => functionNames.has(name)));
  if (duplicates.size === 0) {
    return;
  }
  for (const statement of statements) {
    for (const name of namespaceValueDeclarationNames(statement)) {
      if (duplicates.has(name)) {
        state.diagnostics.push(createDiagnostic(2300, name));
      }
    }
  }
}

function namespaceValueDeclarationNames(statement: Statement): readonly string[] {
  if (isVariableStatement(statement)) {
    return statement.declarationList.declarations.flatMap(declaration => bindingNameExportNames(declaration.name));
  }
  if (isFunctionDeclaration(statement) && statement.name !== undefined) {
    return [statement.name.text];
  }
  return [];
}

function isGlobalAmbientExternalModuleDeclaration(moduleDeclaration: Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>): boolean {
  return hasDeclareModifier(moduleDeclaration)
    && isStringLiteral(moduleDeclaration.name)
    && isSourceFile(moduleDeclaration.parent)
    && !sourceFileIsExternalModule(moduleDeclaration.parent);
}

function isAmbientExternalModuleRelativeImportOrExport(statement: Statement): boolean {
  if (isImportDeclaration(statement) && isStringLiteral(statement.moduleSpecifier)) {
    return isRelativeModuleName(statement.moduleSpecifier.text);
  }
  if (isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && isStringLiteral(statement.moduleSpecifier)) {
    return isRelativeModuleName(statement.moduleSpecifier.text);
  }
  return isImportEqualsDeclaration(statement)
    && isExternalModuleReference(statement.moduleReference)
    && isStringLiteral(statement.moduleReference.expression)
    && isRelativeModuleName(statement.moduleReference.expression.text);
}

function qualifyNamespaceExport(type: CheckedType, qualifiedName: string): CheckedType {
  if (type.kind !== "namespace") {
    return type;
  }
  const exports = new Map<string, CheckedType>();
  for (const [name, exported] of type.exports.entries()) {
    exports.set(name, qualifyNamespaceExport(exported, `${qualifiedName}.${name}`));
  }
  return { kind: "namespace", name: qualifiedName, exports, ...(type.enumLike === true ? { enumLike: true } : {}) };
}

function moduleDeclarationName(moduleDeclaration: Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>): string | undefined {
  return isIdentifier(moduleDeclaration.name) && moduleDeclaration.name.text !== "" ? moduleDeclaration.name.text : undefined;
}

function ambientModuleSpecifier(statement: Statement): string | undefined {
  return isModuleDeclaration(statement) && isStringLiteral(statement.name) ? statement.name.text : undefined;
}

function namespaceExportName(statement: Statement): string | undefined {
  if (isClassDeclaration(statement) || isFunctionDeclaration(statement) || isInterfaceDeclaration(statement) || isTypeAliasDeclaration(statement) || isEnumDeclaration(statement)) {
    return statement.name?.text;
  }
  if (isModuleDeclaration(statement)) {
    return moduleDeclarationName(statement);
  }
  if (isImportEqualsDeclaration(statement)) {
    return statement.name.text;
  }
  return undefined;
}

function namespaceExportNames(statement: Statement): readonly string[] {
  if (isVariableStatement(statement)) {
    return statement.declarationList.declarations.flatMap(declaration => bindingNameExportNames(declaration.name));
  }
  const name = namespaceExportName(statement);
  return name === undefined ? [] : [name];
}

function bindingNameExportNames(name: BindingName): readonly string[] {
  if (isIdentifier(name)) {
    return [name.text];
  }
  if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
    return name.elements.flatMap(element => element.name === undefined ? [] : bindingNameExportNames(element.name));
  }
  return [];
}

function bindImportDeclaration(statement: ImportDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const moduleType = importDeclarationModuleType(statement, state);
  if (statement.importClause?.name !== undefined) {
    mergeEnvironmentBinding(environment, statement.importClause.name.text, defaultImportType(statement, moduleType, state));
  }
  const namedBindings = statement.importClause?.namedBindings;
  if (namedBindings === undefined) {
    return;
  }
  if (isNamespaceImport(namedBindings)) {
    environment.set(namedBindings.name.text, moduleType ?? anyType);
    return;
  }
  if (isNamedImports(namedBindings)) {
    for (const specifier of namedBindings.elements) {
      mergeEnvironmentBinding(environment, specifier.name.text, namedImportType(statement, specifier, moduleType, state));
    }
  }
}

function importDeclarationModuleType(statement: ImportDeclaration, state: CheckState): Extract<CheckedType, { readonly kind: "moduleNamespace" }> | undefined {
  if (statement.moduleSpecifier === undefined || !isStringLiteral(statement.moduleSpecifier)) {
    return undefined;
  }
  const resolved = state.resolveExternalModule?.(statement.moduleSpecifier.text);
  return resolved?.kind === "moduleNamespace" ? resolved : undefined;
}

function defaultImportType(statement: ImportDeclaration, moduleType: Extract<CheckedType, { readonly kind: "moduleNamespace" }> | undefined, state: CheckState): CheckedType {
  if (moduleType === undefined) {
    return anyType;
  }
  const explicitDefault = moduleType.exports.get("default");
  if (explicitDefault !== undefined) {
    return explicitDefault;
  }
  const syntheticDefault = syntheticDefaultImportType(moduleType);
  if (allowSyntheticDefaultImports(state.options) && syntheticDefault !== undefined) {
    return syntheticDefault;
  }
  const moduleName = quotedModuleDiagnosticName(moduleType.diagnosticName);
  if (moduleType.exportEquals !== undefined) {
    state.diagnostics.push(createDiagnostic(1259, moduleName, "esModuleInterop"));
    return moduleType.exportEquals;
  }
  state.diagnostics.push(createDiagnostic(1192, moduleName));
  return anyType;
}

function namedImportType(statement: ImportDeclaration, specifier: ImportSpecifier, moduleType: Extract<CheckedType, { readonly kind: "moduleNamespace" }> | undefined, state: CheckState): CheckedType {
  const importedName = specifier.propertyName === undefined ? specifier.name.text : moduleExportNameText(specifier.propertyName);
  const imported = moduleType?.exports.get(importedName);
  if (imported !== undefined) {
    return imported;
  }
  if (importedName === "default" && moduleType !== undefined && allowSyntheticDefaultImports(state.options)) {
    const syntheticDefault = syntheticDefaultImportType(moduleType);
    if (syntheticDefault !== undefined) {
      return syntheticDefault;
    }
  }
  if (moduleType !== undefined) {
    state.diagnostics.push(createDiagnostic(2305, quotedModuleSpecifier(statement), importedName));
  }
  return anyType;
}

function moduleExportNameText(name: { readonly text: string }): string {
  return name.text;
}

function allowSyntheticDefaultImports(options: CompilerOptions): boolean {
  return options.allowSyntheticDefaultImports === true
    || options.esModuleInterop === true
    || (options.allowSyntheticDefaultImports === undefined && options.module === "system");
}

function syntheticDefaultImportType(moduleType: Extract<CheckedType, { readonly kind: "moduleNamespace" }>): CheckedType | undefined {
  return moduleType.exportEquals ?? moduleType;
}

function quotedModuleSpecifier(statement: ImportDeclaration): string {
  return isStringLiteral(statement.moduleSpecifier) ? quotedModuleDiagnosticName(statement.moduleSpecifier.text) : "\"\"";
}

function quotedModuleDiagnosticName(moduleName: string): string {
  return `"${moduleName}"`;
}

function mergeEnvironmentBinding(environment: TypeEnvironment, name: string, type: CheckedType): void {
  environment.set(name, mergeBinding(environment.get(name), type, type));
}

function mergeBinding(existing: CheckedType | undefined, next: CheckedType, incompatible: CheckedType): CheckedType {
  if (existing === undefined) {
    return next;
  }
  const existingValue = valueMeaning(existing);
  const nextValue = valueMeaning(next);
  const existingType = typeMeaning(existing);
  const nextType = typeMeaning(next);
  const mergedValue = existingValue ?? nextValue;
  const mergedType = existingType ?? nextType;
  if (mergedValue !== undefined && mergedType !== undefined && (existingValue === undefined || existingType === undefined || nextValue === undefined || nextType === undefined)) {
    return { kind: "valueAndType", value: mergedValue, type: mergedType };
  }
  return isSameType(existing, next) ? existing : incompatible;
}

function mergeNamespaceType(existing: CheckedType | undefined, namespace: Extract<CheckedType, { readonly kind: "namespace" }>): CheckedType {
  if (existing?.kind === "namespaceAndType") {
    return { kind: "namespaceAndType", namespace, type: existing.type };
  }
  const existingType = existing === undefined || existing.kind === "namespace" ? undefined : typeMeaning(existing);
  return existingType === undefined ? namespace : { kind: "namespaceAndType", namespace, type: existingType };
}

function mergeTypeNamespace(existing: CheckedType | undefined, type: CheckedType): CheckedType {
  if (existing?.kind === "namespaceAndType") {
    return { kind: "namespaceAndType", namespace: existing.namespace, type };
  }
  return existing?.kind === "namespace" ? { kind: "namespaceAndType", namespace: existing, type } : type;
}

function mergeClassBinding(existing: CheckedType | undefined, classType: Extract<CheckedType, { readonly kind: "classConstructor" }>): CheckedType {
  const existingType = existing === undefined ? undefined : typeMeaning(existing);
  if (existingType?.kind === "interface" && valueMeaning(existing!) === undefined) {
    return { kind: "valueAndType", value: classType, type: existingType };
  }
  return classType;
}

function valueMeaning(type: CheckedType): CheckedType | undefined {
  if (type.kind === "valueAndType") {
    return type.value;
  }
  if (type.kind === "namespaceAndType") {
    return namespaceValueMeaning(type.namespace);
  }
  if (type.kind === "valueOnly") {
    return type.type;
  }
  if (type.kind === "functionDeclaration") {
    return type.type;
  }
  if (type.kind === "interface" || type.kind === "typeAlias" || type.kind === "typeParameter") {
    return undefined;
  }
  return type;
}

function typeMeaning(type: CheckedType): CheckedType | undefined {
  if (type.kind === "valueAndType") {
    return type.type;
  }
  if (type.kind === "namespaceAndType") {
    return type.type;
  }
  if (type.kind === "valueOnly") {
    return undefined;
  }
  if (type.kind === "functionDeclaration") {
    return undefined;
  }
  if (type.kind === "interface" || type.kind === "typeAlias" || type.kind === "typeParameter" || type.kind === "classConstructor") {
    return type;
  }
  return undefined;
}

function namespaceMeaning(type: CheckedType): Extract<CheckedType, { readonly kind: "namespace" }> | undefined {
  if (type.kind === "namespace") {
    return type;
  }
  if (type.kind === "namespaceAndType") {
    return type.namespace;
  }
  return undefined;
}

function namespaceValueMeaning(namespace: Extract<CheckedType, { readonly kind: "namespace" }>): CheckedType | undefined {
  return [...namespace.exports.values()].some(exported => valueMeaning(exported) !== undefined) ? namespace : undefined;
}

function checkFunctionDeclarationOverloads(statements: readonly Statement[], state: CheckState, ambient: boolean): void {
  if (ambient) {
    return;
  }
  const pendingNames: string[] = [];
  for (const statement of statements) {
    if (isFunctionDeclaration(statement) && statement.name !== undefined) {
      if (hasDeclareModifier(statement)) {
        diagnosePendingFunctionOverloads(pendingNames, state);
        continue;
      }
      if (statement.body === undefined) {
        pendingNames.push(statement.name.text);
        continue;
      }
      checkFunctionImplementationOverloads(statement.name.text, pendingNames, state);
      continue;
    }
    diagnosePendingFunctionOverloads(pendingNames, state);
  }
  diagnosePendingFunctionOverloads(pendingNames, state);
}

function checkFunctionImplementationOverloads(implementationName: string, pendingNames: string[], state: CheckState): void {
  if (pendingNames.length === 0) {
    return;
  }
  const immediateName = pendingNames[pendingNames.length - 1]!;
  if (implementationName === immediateName) {
    removeTrailingFunctionOverloads(pendingNames, immediateName);
  } else {
    state.diagnostics.push(createDiagnostic(2389, immediateName));
    removeTrailingFunctionOverloads(pendingNames, immediateName);
  }
  diagnosePendingFunctionOverloads(pendingNames, state);
}

function removeTrailingFunctionOverloads(pendingNames: string[], resolvedName: string): void {
  while (pendingNames[pendingNames.length - 1] === resolvedName) {
    pendingNames.pop();
  }
}

function diagnosePendingFunctionOverloads(pendingNames: string[], state: CheckState): void {
  const diagnosticCount = uniqueInOrder(pendingNames).length;
  for (let index = 0; index < diagnosticCount; index += 1) {
    state.diagnostics.push(createDiagnostic(2391));
  }
  pendingNames.length = 0;
}

function checkForInitializer(initializer: Extract<Statement, { readonly kind: Kind.ForStatement }>["initializer"] | Extract<Statement, { readonly kind: Kind.ForInStatement }>["initializer"], state: CheckState, environment: TypeEnvironment, assumeAssigned = false): void {
  if (initializer === undefined) {
    return;
  }
  if (isVariableDeclarationList(initializer)) {
    for (const declaration of initializer.declarations) {
      checkVariableDeclaration(declaration, state, environment, assumeAssigned);
    }
    return;
  }
  if (isMissingDeclaration(initializer)) {
    return;
  }
  inferExpression(initializer, state, environment);
}

function checkVariableDeclaration(declaration: VariableDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  if (declaration.type !== undefined) {
    checkJavaScriptTypeAnnotation(state);
  }
  const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type, environment, state);
  if (declaration.initializer !== undefined) {
    attachJSDocIfMissing(declaration.initializer, declaration);
  }
  const initializerType = declaration.initializer === undefined ? undefined : inferExpressionWithContext(declaration.initializer, state, environment, declaredType);
  if (ambient && declaration.initializer !== undefined) {
    checkAmbientVariableInitializer(declaration, state, environment);
  }
  if (declaredType !== undefined && initializerType !== undefined) {
    checkAssignable(initializerType, declaredType, state);
  }
  if (initializerType !== undefined && isArrayBindingPattern(declaration.name)) {
    checkIterationInputType(initializerType, state, "destructuring");
  }
  if (declaration.initializer !== undefined) {
    diagnoseAbstractThisDestructuring(declaration.name, declaration.initializer, state, environment);
  }
  if (!ambient && isConstVariableDeclaration(declaration) && declaration.initializer === undefined && !isForInOrOfDeclaration(declaration)) {
    state.diagnostics.push(createDiagnostic(1155, "const"));
  }
  checkStrictModeBindingName(declaration.name, state, ambient);
  const bindingType = variableDeclarationBindingType(declaration, declaredType, initializerType, environment, ambient, state.options);
  setBindingNameType(declaration.name, bindingType, environment, isConstVariableDeclaration(declaration));
  if (initializerType !== undefined) {
    registerObjectBindingCorrelation(declaration.name, initializerType, environment);
  }
}

function registerObjectBindingCorrelation(name: BindingName, sourceType: CheckedType, environment: TypeEnvironment): void {
  if (!isObjectBindingPattern(name)) {
    return;
  }
  if (!correlationSourceCanNarrow(sourceType)) {
    return;
  }
  const bindings = objectBindingCorrelationBindings(name);
  if (bindings.size < 2) {
    return;
  }
  addEnvironmentCorrelation(environment, { sourceType, bindings });
}

function correlationSourceCanNarrow(type: CheckedType): boolean {
  if (type.kind === "typeAliasInstance") {
    return correlationSourceCanNarrow(type.target);
  }
  return type.kind === "union";
}

function objectBindingCorrelationBindings(name: BindingName): ReadonlyMap<string, string> {
  const bindings = new Map<string, string>();
  if (!isObjectBindingPattern(name)) {
    return bindings;
  }
  for (const element of name.elements) {
    const propertyName = bindingElementPropertyName(element);
    if (propertyName !== undefined && element.name !== undefined && isIdentifier(element.name)) {
      bindings.set(element.name.text, propertyName);
    }
  }
  return bindings;
}

function variableDeclarationBindingType(declaration: VariableDeclaration, declaredType: CheckedType | undefined, initializerType: CheckedType | undefined, environment: TypeEnvironment, ambient: boolean, options: CompilerOptions): CheckedType {
  if (
    !ambient
    && strictOptionValue(options, "strictNullChecks")
    && initializerType === undefined
    && declaration.type !== undefined
    && declaredType !== undefined
    && declaration.exclamationToken === undefined
    && isIdentifier(declaration.name)
    && typeNodeRequiresDefiniteAssignment(declaration.type, environment)
  ) {
    return { kind: "unassignedVariable", name: declaration.name.text, type: declaredType };
  }
  return declaredType ?? initializerType ?? unresolvedType;
}

function typeNodeRequiresDefiniteAssignment(type: TypeNode, environment: TypeEnvironment): boolean {
  if (isKeywordTypeNode(type)) {
    return type.kind !== Kind.AnyKeyword
      && type.kind !== Kind.UnknownKeyword
      && type.kind !== Kind.VoidKeyword
      && type.kind !== Kind.UndefinedKeyword;
  }
  if (isUnionTypeNode(type)) {
    return type.types.every(unionMember => typeNodeRequiresDefiniteAssignment(unionMember, environment));
  }
  if (isTypeReferenceNode(type)) {
    const name = entityNameText(type.typeName);
    const bound = name === undefined ? undefined : environment.get(name);
    return bound?.kind === "typeAlias" ? checkedTypeRequiresDefiniteAssignment(bound.target) : true;
  }
  return true;
}

function checkedTypeRequiresDefiniteAssignment(type: CheckedType): boolean {
  if (type.kind === "any" || type.kind === "unknown" || type.kind === "unresolved" || type.kind === "undefined" || type.kind === "void") {
    return false;
  }
  if (type.kind === "typeAlias") {
    return checkedTypeRequiresDefiniteAssignment(type.target);
  }
  if (type.kind === "union") {
    return type.types.every(checkedTypeRequiresDefiniteAssignment);
  }
  return true;
}

function diagnoseAbstractThisDestructuring(target: BindingName | Expression, initializer: Expression, state: CheckState, environment: TypeEnvironment): void {
  const thisType = thisTypeFromExpression(initializer, environment);
  if (thisType === undefined || thisType.mode !== "constructor") {
    return;
  }
  for (const propertyName of destructuredPropertyNames(target)) {
    if (thisType.abstractProperties.has(propertyName)) {
      state.diagnostics.push(createDiagnostic(2715, propertyName, thisType.abstractPropertyDeclaringClasses.get(propertyName) ?? thisType.className));
    }
  }
}

function checkAmbientVariableInitializer(declaration: VariableDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (declaration.initializer === undefined) {
    return;
  }
  if (isConstVariableDeclaration(declaration) && declaration.type === undefined) {
    if (!isAmbientConstInitializer(declaration.initializer, environment)) {
      state.diagnostics.push(createDiagnostic(1254));
    }
    return;
  }
  state.diagnostics.push(createDiagnostic(1039));
}

function isConstVariableDeclaration(declaration: VariableDeclaration): boolean {
  return isVariableDeclarationList(declaration.parent) && (declaration.parent.flags & NodeFlags.Const) !== 0;
}

function isForInOrOfDeclaration(declaration: VariableDeclaration): boolean {
  const declarationList = declaration.parent;
  if (!isVariableDeclarationList(declarationList)) {
    return false;
  }
  return isForInStatement(declarationList.parent) || isForOfStatement(declarationList.parent);
}

function isAmbientConstInitializer(expression: Expression, environment: TypeEnvironment): boolean {
  if (isNumericLiteral(expression) || isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression) || isBigIntLiteral(expression)) {
    return true;
  }
  if (isKeywordExpression(expression) && (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword)) {
    return true;
  }
  return isSimpleLiteralEnumReference(expression, environment);
}

function isSimpleLiteralEnumReference(expression: Expression, environment: TypeEnvironment): boolean {
  if (isPropertyAccessExpression(expression)) {
    return isEnumLikeEntityExpression(expression.expression, environment);
  }
  return isElementAccessExpression(expression)
    && expression.argumentExpression !== undefined
    && isStringOrNumberLikeLiteralExpression(expression.argumentExpression)
    && isEnumLikeEntityExpression(expression.expression, environment);
}

function isStringOrNumberLikeLiteralExpression(expression: Expression): boolean {
  return isStringLiteral(expression) || isNumericLiteral(expression) || isNoSubstitutionTemplateLiteral(expression);
}

function isEnumLikeEntityExpression(expression: Expression, environment: TypeEnvironment): boolean {
  return namespaceFromEntityExpression(expression, environment)?.enumLike === true;
}

function namespaceFromEntityExpression(expression: Expression, environment: TypeEnvironment): Extract<CheckedType, { readonly kind: "namespace" }> | undefined {
  if (isIdentifier(expression)) {
    return namespaceMeaning(environment.get(expression.text) ?? unresolvedType);
  }
  if (isPropertyAccessExpression(expression)) {
    const namespace = namespaceFromEntityExpression(expression.expression, environment);
    const exported = namespace?.exports.get(expression.name.text);
    return namespaceMeaning(exported ?? unresolvedType);
  }
  return undefined;
}

function thisTypeFromExpression(expression: Expression, environment: TypeEnvironment): Extract<CheckedType, { readonly kind: "thisClass" }> | undefined {
  if (isParenthesizedExpression(expression)) {
    return thisTypeFromExpression(expression.expression, environment);
  }
  if (!isKeywordExpression(expression) || expression.kind !== Kind.ThisKeyword) {
    return undefined;
  }
  const type = environment.get("this");
  return type?.kind === "thisClass" ? type : undefined;
}

function destructuredPropertyNames(target: BindingName | Expression): readonly string[] {
  if (isObjectBindingPattern(target)) {
    return target.elements.flatMap(element => bindingElementPropertyNames(element));
  }
  if (isParenthesizedExpression(target)) {
    return destructuredPropertyNames(target.expression);
  }
  if (isObjectLiteralExpression(target)) {
    return target.properties.flatMap(property => {
      if (isShorthandPropertyAssignment(property)) {
        const propertyName = propertyNameDiagnosticText(property.name);
        return propertyName === undefined ? [] : [propertyName];
      }
      if (isPropertyAssignment(property)) {
        const propertyName = propertyNameDiagnosticText(property.name);
        return propertyName === undefined ? [] : [propertyName];
      }
      return [];
    });
  }
  return [];
}

function bindingElementPropertyNames(element: BindingElement): readonly string[] {
  if (element.propertyName !== undefined) {
    const propertyName = propertyNameDiagnosticText(element.propertyName);
    return propertyName === undefined ? [] : [propertyName];
  }
  if (element.name === undefined) {
    return [];
  }
  if (isIdentifier(element.name)) {
    return [element.name.text];
  }
  return destructuredPropertyNames(element.name);
}

function checkClassDeclaration(classDeclaration: ClassDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  checkClassLike(classDeclaration, state, environment, ambient, true);
}

function inferClassExpression(classExpression: ClassExpression, state: CheckState, environment: TypeEnvironment): CheckedType {
  return checkClassLike(classExpression, state, environment, false, false);
}

function checkClassLike(classDeclaration: ClassLikeDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean, bindOuterName: boolean): CheckedType {
  const classIsAbstract = hasModifier(classDeclaration, Kind.AbstractKeyword);
  checkClassHeritageClauses(classDeclaration, state);
  const inheritedMembers = inheritedClassMembers(classDeclaration, environment);
  const classEnvironment = cloneTypeEnvironment(environment);
  addTypeParametersToEnvironment(classDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], classEnvironment);
  addTypeParameterConstraintsToEnvironment(classDeclaration.typeParameters, classEnvironment);
  const classMembers = collectClassMemberNames(classDeclaration, inheritedMembers, classEnvironment, state.options);
  const constructorAssignedProperties = collectConstructorAssignedThisProperties(classDeclaration.members);
  const classType: CheckedType = {
    kind: "classConstructor",
    name: classDeclaration.name?.text ?? "(anonymous class)",
    typeParameters: classDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [],
    typeArguments: [],
    constructorParameters: classConstructorParameterTypes(classDeclaration, classEnvironment),
    abstract: classIsAbstract,
    members: classMembers,
    ...classBaseType(classDeclaration, classEnvironment),
    ...classArrayBaseElementType(classDeclaration, classEnvironment, state),
  };
  if (classDeclaration.name !== undefined) {
    if (invalidClassNames.has(classDeclaration.name.text)) {
      state.diagnostics.push(createDiagnostic(2414, classDeclaration.name.text));
    }
    classEnvironment.set(classDeclaration.name.text, classType);
    if (bindOuterName) {
      environment.set(classDeclaration.name.text, mergeClassBinding(environment.get(classDeclaration.name.text), classType));
    }
  }
  checkClassImplementedInterfaces(classDeclaration, classType, state, classEnvironment);
  checkDerivedConstructorSuperCalls(classDeclaration, classType, state);
  checkMissingAbstractMembers(classDeclaration, state, classIsAbstract, inheritedMembers, classMembers);
  checkAccessorAbstractPairs(classDeclaration.members, state);
  const accessorContextTypes = collectAccessorContextTypes(classDeclaration.members, classEnvironment);
  if (!ambient) {
    checkClassMemberOverloads(classDeclaration.members, state);
  }
  const classBodyState = enterClassBody(state);
  for (const member of classDeclaration.members) {
    checkClassElement(member, classBodyState, classEnvironment, ambient, classIsAbstract, classMembers, inheritedMembers, accessorContextTypes, constructorAssignedProperties);
  }
  return classType;
}

function checkClassHeritageClauses(classDeclaration: ClassLikeDeclaration, state: CheckState): void {
  let seenExtends = false;
  for (const clause of classDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ExtendsKeyword) {
      continue;
    }
    if (seenExtends) {
      state.diagnostics.push(createDiagnostic(1172));
      continue;
    }
    seenExtends = true;
    if (clause.types.length > 1) {
      state.diagnostics.push(createDiagnostic(1174));
    }
  }
}

function classBaseType(classDeclaration: ClassLikeDeclaration, environment: TypeEnvironment): { readonly baseType: CheckedType } | Record<string, never> {
  for (const clause of classDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ExtendsKeyword || clause.types[0] === undefined) {
      continue;
    }
    return { baseType: inferExpression(clause.types[0].expression, emptyCheckState(), environment) };
  }
  return {};
}

function checkClassImplementedInterfaces(classDeclaration: ClassLikeDeclaration, classType: Extract<CheckedType, { readonly kind: "classConstructor" }>, state: CheckState, environment: TypeEnvironment): void {
  const className = classDeclaration.name?.text ?? "(anonymous class)";
  for (const clause of classDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ImplementsKeyword) {
      continue;
    }
    for (const heritageType of clause.types) {
      const implementedType = implementedInterfaceType(heritageType, environment, state);
      if (implementedType !== undefined && classMissingImplementedInterfaceProperties(classConstructorInstanceType(classType), implementedType).length > 0) {
        state.diagnostics.push(createDiagnostic(2420, className, implementedType.name));
      }
    }
  }
}

function classMissingImplementedInterfaceProperties(classInstance: Extract<CheckedType, { readonly kind: "classInstance" }>, implementedType: Extract<CheckedType, { readonly kind: "interface" }>): readonly string[] {
  const missing: string[] = [];
  for (const propertyName of implementedType.members.properties.keys()) {
    if (implementedType.members.optionalProperties.has(propertyName)) {
      continue;
    }
    if (propertyAccessType(classInstance, propertyName) === undefined) {
      missing.push(propertyName);
    }
  }
  return missing;
}

function implementedInterfaceType(heritageType: ExpressionWithTypeArguments, environment: TypeEnvironment, state: CheckState): Extract<CheckedType, { readonly kind: "interface" }> | undefined {
  const typeName = expressionNameText(heritageType.expression);
  const type = typeName === undefined ? undefined : typeMeaning(environment.get(typeName) ?? unresolvedType);
  if (type?.kind !== "interface") {
    return undefined;
  }
  if (heritageType.typeArguments === undefined || heritageType.typeArguments.length === 0) {
    return type;
  }
  return instantiateInterfaceType(type, heritageType.typeArguments.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)));
}

function checkDerivedConstructorSuperCalls(classDeclaration: ClassLikeDeclaration, classType: Extract<CheckedType, { readonly kind: "classConstructor" }>, state: CheckState): void {
  if (classType.baseType === undefined) {
    return;
  }
  for (const member of classDeclaration.members) {
    if (!isConstructorDeclaration(member) || member.body === undefined) {
      continue;
    }
    if (!constructorBodyContainsSuperCall(member.body)) {
      state.diagnostics.push(createDiagnostic(2377));
    }
    diagnoseThisBeforeSuper(member.body, state);
  }
}

function constructorBodyContainsSuperCall(body: Block): boolean {
  return body.statements.some(statement => constructorNodeContainsSuperCall(statement));
}

function constructorNodeContainsSuperCall(node: Node): boolean {
  if (isNestedThisOrSuperBoundary(node)) {
    return false;
  }
  if (isCallExpression(node) && isSuperExpression(node.expression)) {
    return true;
  }
  return forEachChild(node, child => constructorNodeContainsSuperCall(child) ? true : undefined) === true;
}

type ThisBeforeSuperResult = "continue" | "super";

function diagnoseThisBeforeSuper(body: Block, state: CheckState): void {
  for (const statement of body.statements) {
    if (diagnoseThisBeforeSuperInNode(statement, state) === "super") {
      return;
    }
  }
}

function diagnoseThisBeforeSuperInNode(node: Node, state: CheckState): ThisBeforeSuperResult {
  if (isNestedThisOrSuperBoundary(node)) {
    return "continue";
  }
  if (isCallExpression(node) && isSuperExpression(node.expression)) {
    for (const argument of node.arguments ?? []) {
      diagnoseThisBeforeSuperInNode(argument, state);
    }
    return "super";
  }
  if (isThisExpression(node)) {
    state.diagnostics.push(createDiagnostic(17009));
  }
  return forEachChild(node, child => {
    const result = diagnoseThisBeforeSuperInNode(child, state);
    return result === "super" ? result : undefined;
  }) ?? "continue";
}

function isThisExpression(node: Node): boolean {
  return isKeywordExpression(node) && node.kind === Kind.ThisKeyword;
}

function isSuperExpression(node: Node): boolean {
  return isKeywordExpression(node) && node.kind === Kind.SuperKeyword;
}

function isNestedThisOrSuperBoundary(node: Node): boolean {
  return isFunctionDeclaration(node)
    || isFunctionExpression(node)
    || isArrowFunction(node)
    || isClassDeclaration(node)
    || isClassExpression(node);
}

function inheritedClassMembers(classDeclaration: ClassLikeDeclaration, environment: TypeEnvironment): ClassMemberNames | undefined {
  for (const clause of classDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ExtendsKeyword) {
      continue;
    }
    const baseType = clause.types[0] === undefined ? undefined : resolveExpressionValue(clause.types[0].expression, environment);
    return baseType?.kind === "classConstructor" ? baseType.members : undefined;
  }
  return undefined;
}

function classConstructorParameterTypes(classDeclaration: ClassLikeDeclaration, environment: TypeEnvironment): readonly CheckedType[] {
  const constructor = classDeclaration.members.find(isConstructorDeclaration);
  if (constructor === undefined) {
    return [];
  }
  return constructor.parameters.map(parameter => parameterTypeFromDeclaration(parameter, environment, undefined));
}

function classArrayBaseElementType(classDeclaration: ClassLikeDeclaration, environment: TypeEnvironment, state: CheckState): { readonly arrayBaseElementType: CheckedType } | Record<string, never> {
  for (const clause of classDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ExtendsKeyword) {
      continue;
    }
    const baseType = clause.types[0];
    if (baseType === undefined || !isIdentifier(baseType.expression) || baseType.expression.text !== "Array") {
      continue;
    }
    const elementType = baseType.typeArguments?.[0] === undefined ? anyType : typeFromTypeNode(baseType.typeArguments[0], environment, state);
    return { arrayBaseElementType: elementType };
  }
  return {};
}

function optionalArrayBaseElementType(elementType: CheckedType | undefined): { readonly arrayBaseElementType: CheckedType } | Record<string, never> {
  return elementType === undefined ? {} : { arrayBaseElementType: elementType };
}

function resolveExpressionValue(expression: Expression, environment: TypeEnvironment): CheckedType | undefined {
  if (isIdentifier(expression)) {
    const bound = environment.get(expression.text);
    return bound === undefined ? undefined : valueMeaning(bound);
  }
  if (isPropertyAccessExpression(expression)) {
    const receiver = resolveExpressionValue(expression.expression, environment);
    if (receiver === undefined) {
      return undefined;
    }
    const property = propertyAccessType(receiver, expression.name.text, environment);
    return property === undefined ? undefined : valueMeaning(property);
  }
  if (isParenthesizedExpression(expression)) {
    return resolveExpressionValue(expression.expression, environment);
  }
  return undefined;
}

function checkEnumDeclaration(enumDeclaration: EnumDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  bindEnumDeclaration(enumDeclaration, state, environment, ambient);
}

function bindEnumDeclaration(enumDeclaration: EnumDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  const exports = new Map<string, CheckedType>();
  for (const member of enumDeclaration.members) {
    const name = propertyNameText(member.name);
    if (name !== undefined) {
      exports.set(name, numberType);
    }
    if (ambient && member.initializer !== undefined && !isConstantEnumInitializer(member.initializer)) {
      state.diagnostics.push(createDiagnostic(1066));
    }
  }
  environment.set(enumDeclaration.name.text, mergeNamespaceType(environment.get(enumDeclaration.name.text), {
    kind: "namespace",
    name: enumDeclaration.name.text,
    exports,
    enumLike: true,
  }));
}

function isConstantEnumInitializer(expression: Expression): boolean {
  if (isNumericLiteral(expression) || isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression)) {
    return true;
  }
  if (isPrefixUnaryExpression(expression) && (expression.operator === Kind.PlusToken || expression.operator === Kind.MinusToken || expression.operator === Kind.TildeToken)) {
    return isConstantEnumInitializer(expression.operand);
  }
  if (isParenthesizedExpression(expression)) {
    return isConstantEnumInitializer(expression.expression);
  }
  if (isBinaryExpression(expression) && isConstantEnumBinaryOperator(expression.operatorToken.kind)) {
    return isConstantEnumInitializer(expression.left) && isConstantEnumInitializer(expression.right);
  }
  return false;
}

function isConstantEnumBinaryOperator(kind: Kind): boolean {
  return kind === Kind.PlusToken
    || kind === Kind.MinusToken
    || kind === Kind.AsteriskToken
    || kind === Kind.SlashToken
    || kind === Kind.PercentToken
    || kind === Kind.LessThanLessThanToken
    || kind === Kind.GreaterThanGreaterThanToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanToken
    || kind === Kind.AmpersandToken
    || kind === Kind.BarToken
    || kind === Kind.CaretToken;
}

function collectClassMemberNames(classDeclaration: ClassLikeDeclaration, inherited: ClassMemberNames | undefined, environment: TypeEnvironment, options: CompilerOptions): ClassMemberNames {
  const instance = new Set(inherited?.instance ?? []);
  const staticMembers = new Set(inherited?.static ?? []);
  const abstractMembers = new Map(inherited?.abstractMembers ?? []);
  const abstractProperties = new Set(inherited?.abstractProperties ?? []);
  const abstractPropertyDeclaringClasses = new Map(inherited?.abstractPropertyDeclaringClasses ?? []);
  const propertyDeclaringClasses = new Map(inherited?.propertyDeclaringClasses ?? []);
  const propertyTypes = new Map(inherited?.propertyTypes ?? []);
  const getAccessorProperties = new Set(inherited?.getAccessorProperties ?? []);
  const readonlyProperties = new Set(inherited?.readonlyProperties ?? []);
  const optionalProperties = new Set(inherited?.optionalProperties ?? []);
  const nominalProperties = new Set(inherited?.nominalProperties ?? []);
  const uninitializedProperties = new Set(inherited?.uninitializedProperties ?? []);
  const methodOverloadTypes = classMethodOverloadTypes(classDeclaration.members, environment, options);
  for (const member of classDeclaration.members) {
    if (isConstructorDeclaration(member)) {
      collectParameterProperties(
        member,
        classDeclaration,
        environment,
        instance,
        abstractMembers,
        abstractProperties,
        abstractPropertyDeclaringClasses,
        propertyDeclaringClasses,
        propertyTypes,
        getAccessorProperties,
        readonlyProperties,
        optionalProperties,
        nominalProperties,
        uninitializedProperties,
      );
      continue;
    }
    const name = classElementName(member);
    if (name === undefined) {
      continue;
    }
    if (hasModifier(member, Kind.StaticKeyword)) {
      staticMembers.add(name);
    } else {
      instance.add(name);
      if (isAbstractPropertyLike(member)) {
        if (classDeclaration.name !== undefined) {
          abstractMembers.set(name, classDeclaration.name.text);
          propertyDeclaringClasses.set(name, classDeclaration.name.text);
        }
        abstractProperties.add(name);
        if (classDeclaration.name !== undefined) {
          abstractPropertyDeclaringClasses.set(name, classDeclaration.name.text);
        }
        const memberType = classMemberPropertyType(member, environment);
        if (memberType !== undefined) {
          propertyTypes.set(name, memberType);
        }
        uninitializedProperties.add(name);
        if (hasModifier(member, Kind.ReadonlyKeyword)) {
          readonlyProperties.add(name);
        }
        setClassMemberOptionality(member, name, optionalProperties);
        setClassMemberNominality(member, name, nominalProperties);
      } else if (isPropertyDeclaration(member)) {
        abstractMembers.delete(name);
        abstractProperties.delete(name);
        abstractPropertyDeclaringClasses.delete(name);
        if (classDeclaration.name !== undefined) {
          propertyDeclaringClasses.set(name, classDeclaration.name.text);
        }
        const memberType = classMemberPropertyType(member, environment);
        if (memberType !== undefined) {
          propertyTypes.set(name, memberType);
        }
        if (hasModifier(member, Kind.ReadonlyKeyword)) {
          readonlyProperties.add(name);
        } else {
          readonlyProperties.delete(name);
        }
        setClassMemberOptionality(member, name, optionalProperties);
        setClassMemberNominality(member, name, nominalProperties);
        getAccessorProperties.delete(name);
        if (member.initializer === undefined && !hasDeclareModifier(member)) {
          uninitializedProperties.add(name);
        } else {
          uninitializedProperties.delete(name);
        }
      } else if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
        if (!hasModifier(member, Kind.AbstractKeyword)) {
          abstractMembers.delete(name);
        } else if (classDeclaration.name !== undefined) {
          abstractMembers.set(name, classDeclaration.name.text);
        }
        abstractProperties.delete(name);
        abstractPropertyDeclaringClasses.delete(name);
        if (classDeclaration.name !== undefined) {
          propertyDeclaringClasses.set(name, classDeclaration.name.text);
        }
        const memberType = classMemberPropertyType(member, environment);
        if (memberType !== undefined) {
          propertyTypes.set(name, memberType);
        }
        if (isGetAccessorDeclaration(member)) {
          getAccessorProperties.add(name);
        }
        readonlyProperties.delete(name);
        optionalProperties.delete(name);
        setClassMemberNominality(member, name, nominalProperties);
        uninitializedProperties.delete(name);
      } else if (isMethodDeclaration(member)) {
        if (classDeclaration.name !== undefined) {
          propertyDeclaringClasses.set(name, classDeclaration.name.text);
        }
        propertyTypes.set(name, methodOverloadTypes.get(name) ?? methodDeclarationType(member, environment, emptyCheckState(options)));
        optionalProperties.delete(name);
        setClassMemberNominality(member, name, nominalProperties);
        if (hasModifier(member, Kind.AbstractKeyword)) {
          if (classDeclaration.name !== undefined) {
            abstractMembers.set(name, classDeclaration.name.text);
          }
        } else {
          abstractMembers.delete(name);
        }
      }
    }
  }
  return {
    className: classDeclaration.name?.text,
    instance,
    static: staticMembers,
    abstractMembers,
    abstractProperties,
    abstractPropertyDeclaringClasses,
    propertyDeclaringClasses,
    propertyTypes,
    getAccessorProperties,
    readonlyProperties,
    optionalProperties,
    nominalProperties,
    uninitializedProperties,
  };
}

function setClassMemberOptionality(member: ClassElement, name: string, optionalProperties: Set<string>): void {
  if (isPropertyDeclaration(member) && member.postfixToken?.kind === Kind.QuestionToken) {
    optionalProperties.add(name);
  } else {
    optionalProperties.delete(name);
  }
}

function setClassMemberNominality(member: ClassElement, name: string, nominalProperties: Set<string>): void {
  if (hasModifier(member, Kind.PrivateKeyword) || hasModifier(member, Kind.ProtectedKeyword)) {
    nominalProperties.add(name);
  } else {
    nominalProperties.delete(name);
  }
}

function classMethodOverloadTypes(members: readonly ClassElement[], environment: TypeEnvironment, options: CompilerOptions): ReadonlyMap<string, CheckedFunctionType> {
  const groups = new Map<string, MethodDeclaration[]>();
  for (const member of members) {
    if (!isMethodDeclaration(member)) {
      continue;
    }
    const name = propertyNameText(member.name);
    if (name === undefined) {
      continue;
    }
    const group = groups.get(name) ?? [];
    group.push(member);
    groups.set(name, group);
  }
  const overloadTypes = new Map<string, CheckedFunctionType>();
  for (const [name, group] of groups.entries()) {
    const overloadDeclarations = group.filter(member => member.body === undefined);
    if (overloadDeclarations.length === 0) {
      continue;
    }
    const signatureState = emptyCheckState(options);
    const overloads = overloadDeclarations.map(member => methodDeclarationType(member, environment, signatureState) as CheckedFunctionType);
    const implementation = group.find(member => member.body !== undefined);
    const surface = implementation === undefined
      ? overloads[0]!
      : methodDeclarationType(implementation, environment, signatureState) as CheckedFunctionType;
    overloadTypes.set(name, { ...surface, overloads });
  }
  return overloadTypes;
}

function collectParameterProperties(
  constructor: ConstructorDeclaration,
  classDeclaration: ClassLikeDeclaration,
  environment: TypeEnvironment,
  instance: Set<string>,
  abstractMembers: Map<string, string>,
  abstractProperties: Set<string>,
  abstractPropertyDeclaringClasses: Map<string, string>,
  propertyDeclaringClasses: Map<string, string>,
  propertyTypes: Map<string, CheckedType>,
  getAccessorProperties: Set<string>,
  readonlyProperties: Set<string>,
  optionalProperties: Set<string>,
  nominalProperties: Set<string>,
  uninitializedProperties: Set<string>,
): void {
  for (const parameter of constructor.parameters) {
    const name = parameterPropertyMemberName(parameter);
    if (name === undefined) {
      continue;
    }
    instance.add(name);
    abstractMembers.delete(name);
    abstractProperties.delete(name);
    abstractPropertyDeclaringClasses.delete(name);
    getAccessorProperties.delete(name);
    uninitializedProperties.delete(name);
    if (classDeclaration.name !== undefined) {
      propertyDeclaringClasses.set(name, classDeclaration.name.text);
    }
    const parameterType = parameterPropertyType(parameter, environment);
    if (parameterType !== undefined) {
      propertyTypes.set(name, parameterType);
    }
    if (hasModifier(parameter, Kind.ReadonlyKeyword)) {
      readonlyProperties.add(name);
    } else {
      readonlyProperties.delete(name);
    }
    if (parameter.questionToken !== undefined || parameter.initializer !== undefined) {
      optionalProperties.add(name);
    } else {
      optionalProperties.delete(name);
    }
    if (hasModifier(parameter, Kind.PrivateKeyword) || hasModifier(parameter, Kind.ProtectedKeyword)) {
      nominalProperties.add(name);
    } else {
      nominalProperties.delete(name);
    }
  }
}

function parameterPropertyMemberName(parameter: ParameterDeclaration): string | undefined {
  if (!isIdentifier(parameter.name) || !isParameterProperty(parameter)) {
    return undefined;
  }
  return parameter.name.text;
}

function isParameterProperty(parameter: ParameterDeclaration): boolean {
  return parameter.modifiers?.some(modifier => modifier.kind === Kind.PublicKeyword || modifier.kind === Kind.PrivateKeyword || modifier.kind === Kind.ProtectedKeyword || modifier.kind === Kind.ReadonlyKeyword) === true;
}

function parameterPropertyType(parameter: ParameterDeclaration, environment: TypeEnvironment): CheckedType | undefined {
  const makeOptional = (type: CheckedType): CheckedType => parameter.questionToken === undefined ? type : unionType([type, undefinedType]);
  if (parameter.type !== undefined) {
    return makeOptional(typeFromTypeNode(parameter.type, environment));
  }
  if (parameter.initializer === undefined) {
    return undefined;
  }
  const initializerType = literalExpressionType(parameter.initializer);
  return initializerType === undefined ? undefined : makeOptional(initializerType);
}

function classElementName(member: ClassElement): string | undefined {
  if (isMethodDeclaration(member) || isPropertyDeclaration(member) || isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
    return propertyNameText(member.name);
  }
  return undefined;
}

function isAbstractPropertyLike(member: ClassElement): boolean {
  return hasModifier(member, Kind.AbstractKeyword)
    && (isPropertyDeclaration(member) || isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member));
}

function checkMissingAbstractMembers(classDeclaration: ClassLikeDeclaration, state: CheckState, classIsAbstract: boolean, inherited: ClassMemberNames | undefined, classMembers: ClassMemberNames): void {
  if (classIsAbstract || inherited === undefined || classDeclaration.name === undefined) {
    return;
  }
  const missing = [...classMembers.abstractMembers.entries()]
    .filter(([, declaringClass]) => declaringClass !== classDeclaration.name!.text);
  if (missing.length === 0) {
    return;
  }
  const baseClassName = missing[0]![1];
  const memberList = missing.map(([memberName]) => `'${memberName}'`).join(", ");
  state.diagnostics.push(createDiagnostic(2654, classDeclaration.name.text, baseClassName, memberList));
}

function checkAccessorAbstractPairs(members: readonly ClassElement[], state: CheckState): void {
  const accessors = new Map<string, { get?: GetAccessorDeclaration; set?: SetAccessorDeclaration }>();
  for (const member of members) {
    if (!isGetAccessorDeclaration(member) && !isSetAccessorDeclaration(member)) {
      continue;
    }
    const name = propertyNameText(member.name);
    if (name === undefined) {
      continue;
    }
    const existing = accessors.get(name) ?? {};
    if (isGetAccessorDeclaration(member)) {
      existing.get = member;
    } else {
      existing.set = member;
    }
    accessors.set(name, existing);
  }
  for (const pair of accessors.values()) {
    if (pair.get === undefined || pair.set === undefined) {
      continue;
    }
    if (hasModifier(pair.get, Kind.AbstractKeyword) !== hasModifier(pair.set, Kind.AbstractKeyword)) {
      state.diagnostics.push(createDiagnostic(2676));
      state.diagnostics.push(createDiagnostic(2676));
    }
  }
}

function collectAccessorContextTypes(members: readonly ClassElement[], environment: TypeEnvironment): ReadonlyMap<string, AccessorContextTypes> {
  const contexts = new Map<string, AccessorContextTypes>();
  for (const member of members) {
    if (!isGetAccessorDeclaration(member) && !isSetAccessorDeclaration(member)) {
      continue;
    }
    const name = propertyNameText(member.name);
    if (name === undefined) {
      continue;
    }
    const existing = contexts.get(name) ?? {};
    const memberType = classMemberPropertyType(member, environment);
    if (memberType === undefined) {
      contexts.set(name, existing);
    } else if (isGetAccessorDeclaration(member)) {
      contexts.set(name, { ...existing, getterType: memberType });
    } else {
      contexts.set(name, { ...existing, setterType: memberType });
    }
  }
  return contexts;
}

function classMemberPropertyType(member: ClassElement, environment: TypeEnvironment, state?: CheckState): CheckedType | undefined {
  if (isPropertyDeclaration(member)) {
    if (member.type !== undefined) {
      return typeFromTypeNode(member.type, environment, state);
    }
    return member.initializer === undefined ? undefined : literalExpressionType(member.initializer);
  }
  if (isGetAccessorDeclaration(member)) {
    if (member.type !== undefined) {
      return typeFromTypeNode(member.type, environment, state);
    }
    return member.body === undefined ? undefined : getterBodyReturnType(member.body, state?.options, environment);
  }
  if (isSetAccessorDeclaration(member)) {
    const parameter = member.parameters[0];
    return parameter?.type === undefined ? undefined : typeFromTypeNode(parameter.type, environment, state);
  }
  return undefined;
}

function literalExpressionType(expression: Expression): CheckedType | undefined {
  if (isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression)) {
    return stringType;
  }
  if (isNumericLiteral(expression)) {
    return numberType;
  }
  if (isKeywordExpression(expression) && (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword)) {
    return booleanType;
  }
  return undefined;
}

function literalExpressionNarrowType(expression: Expression): CheckedType | undefined {
  if (isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression)) {
    return { kind: "stringLiteral", value: expression.text };
  }
  if (isNumericLiteral(expression)) {
    return { kind: "numberLiteral", value: expression.text };
  }
  if (isKeywordExpression(expression) && (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword)) {
    return { kind: "booleanLiteral", value: expression.kind === Kind.TrueKeyword };
  }
  return undefined;
}

function getterBodyReturnType(body: Block, options?: CompilerOptions, environment?: TypeEnvironment): CheckedType | undefined {
  for (const statement of body.statements) {
    if (isReturnStatement(statement) && statement.expression !== undefined) {
      return returnExpressionType(statement.expression, options, environment);
    }
  }
  return undefined;
}

function checkInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (invalidClassNames.has(interfaceDeclaration.name.text)) {
    state.diagnostics.push(createDiagnostic(2427, interfaceDeclaration.name.text));
  }
  bindInterfaceDeclaration(interfaceDeclaration, state, environment);
  const interfaceEnvironment = cloneTypeEnvironment(environment);
  addTypeParametersToEnvironment(interfaceDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], interfaceEnvironment);
  addTypeParameterConstraintsToEnvironment(interfaceDeclaration.typeParameters, interfaceEnvironment);
  checkTypeElements(interfaceDeclaration.members, state, interfaceEnvironment, true);
}

function bindInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const interfaceEnvironment = cloneTypeEnvironment(environment);
  addTypeParametersToEnvironment(interfaceDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], interfaceEnvironment);
  addTypeParameterConstraintsToEnvironment(interfaceDeclaration.typeParameters, interfaceEnvironment);
  const inheritedInterfaces = inheritedInterfaceMembers(interfaceDeclaration, environment);
  const members = collectInterfaceMembers(interfaceDeclaration, inheritedInterfaces, state, interfaceEnvironment);
  environment.set(interfaceDeclaration.name.text, mergeTypeNamespace(environment.get(interfaceDeclaration.name.text), { kind: "interface", name: interfaceDeclaration.name.text, members }));
}

function inheritedInterfaceMembers(interfaceDeclaration: InterfaceDeclaration, environment: TypeEnvironment): readonly InterfaceMembers[] {
  const inherited: InterfaceMembers[] = [];
  for (const clause of interfaceDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ExtendsKeyword) {
      continue;
    }
    for (const heritageType of clause.types) {
      const baseName = expressionNameText(heritageType.expression);
      const baseType = baseName === undefined ? undefined : environment.get(baseName);
      if (baseType?.kind === "interface") {
        inherited.push(baseType.members);
      }
    }
  }
  return inherited;
}

function collectInterfaceMembers(interfaceDeclaration: InterfaceDeclaration, inheritedInterfaces: readonly InterfaceMembers[], state: CheckState, environment: TypeEnvironment): InterfaceMembers {
  const ownProperties = new Map<string, CheckedType>();
  const ownOptionalProperties = new Set<string>();
  const ownMethodProperties = new Set<string>();
  const ownCallSignatures: CheckedFunctionType[] = [];
  let stringIndexType: CheckedType | undefined;
  let numberIndexType: CheckedType | undefined;
  for (const member of interfaceDeclaration.members) {
    if (isCallSignatureDeclaration(member)) {
      ownCallSignatures.push(signatureDeclarationType(member, environment, state, false));
      continue;
    }
    if (isMethodSignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        ownProperties.set(name, signatureDeclarationType(member, environment, state, false));
        ownMethodProperties.add(name);
        if (member.postfixToken?.kind === Kind.QuestionToken) {
          ownOptionalProperties.add(name);
        }
      }
      continue;
    }
    if (isIndexSignatureDeclaration(member)) {
      const keyType = member.parameters[0]?.type;
      const valueType = member.type === undefined ? anyType : typeFromTypeNode(member.type, environment, undefined);
      if (keyType?.kind === Kind.StringKeyword) {
        stringIndexType = valueType;
      } else if (keyType?.kind === Kind.NumberKeyword) {
        numberIndexType = valueType;
      }
      continue;
    }
    if (isPropertySignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        ownProperties.set(name, propertySignatureDeclaredType(member, environment, state));
        if (member.postfixToken?.kind === Kind.QuestionToken) {
          ownOptionalProperties.add(name);
        }
      }
    }
  }
  for (const baseInterface of inheritedInterfaces) {
    for (const [name, basePropertyType] of baseInterface.properties.entries()) {
      const ownPropertyType = ownProperties.get(name);
      if (ownPropertyType !== undefined && !isAssignableTo(ownPropertyType, basePropertyType, state.options)) {
        state.diagnostics.push(createDiagnostic(2430, interfaceDeclaration.name.text, baseInterface.name));
      }
    }
  }
  const mergedProperties = new Map<string, CheckedType>();
  const mergedOptionalProperties = new Set<string>();
  const mergedMethodProperties = new Set<string>();
  const mergedCallSignatures: CheckedFunctionType[] = [];
  for (const baseInterface of inheritedInterfaces) {
    for (const [name, type] of baseInterface.properties.entries()) {
      mergedProperties.set(name, type);
    }
    for (const name of baseInterface.optionalProperties) {
      mergedOptionalProperties.add(name);
    }
    for (const name of baseInterface.methodProperties) {
      mergedMethodProperties.add(name);
    }
    mergedCallSignatures.push(...baseInterface.callSignatures);
    stringIndexType ??= baseInterface.stringIndexType;
    numberIndexType ??= baseInterface.numberIndexType;
  }
  for (const [name, type] of ownProperties.entries()) {
    mergedProperties.set(name, type);
    if (ownOptionalProperties.has(name)) {
      mergedOptionalProperties.add(name);
    } else {
      mergedOptionalProperties.delete(name);
    }
    if (ownMethodProperties.has(name)) {
      mergedMethodProperties.add(name);
    } else {
      mergedMethodProperties.delete(name);
    }
  }
  return {
    name: interfaceDeclaration.name.text,
    typeParameters: interfaceDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [],
    properties: mergedProperties,
    optionalProperties: mergedOptionalProperties,
    methodProperties: mergedMethodProperties,
    callSignatures: [...mergedCallSignatures, ...ownCallSignatures],
    ...(stringIndexType === undefined ? {} : { stringIndexType }),
    ...(numberIndexType === undefined ? {} : { numberIndexType }),
  };
}

function signatureDeclarationType(signature: Pick<MethodSignatureDeclaration, "typeParameters" | "parameters" | "type">, environment: TypeEnvironment, state: CheckState, reportDiagnostics = true, construct = false): CheckedFunctionType {
  const signatureEnvironment = cloneTypeEnvironment(environment);
  const typeParameters = signature.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, signatureEnvironment);
  addTypeParameterConstraintsToEnvironment(signature.typeParameters, signatureEnvironment);
  const diagnosticState = reportDiagnostics ? state : undefined;
  const returnType = signature.type === undefined ? anyType : bindTypePredicateParameterIndex(typeFromTypeNode(signature.type, signatureEnvironment, diagnosticState), signature.parameters);
  return {
    kind: "function",
    typeParameters,
    parameters: signature.parameters.map(parameter => parameterTypeFromDeclaration(parameter, signatureEnvironment, diagnosticState)),
    parameterNames: parameterDisplayNames(signature.parameters),
    ...signatureRestParameterIndex(signature.parameters),
    ...signatureMinArgumentCount(signature.parameters, state),
    ...signatureMaxArgumentCount(signature.parameters, state),
    returnType,
    ...(construct ? { construct: true } : {}),
  };
}

type OverloadGroup =
  | { readonly kind: "constructor" }
  | { readonly kind: "method"; readonly name: string };

function checkClassMemberOverloads(members: readonly ClassElement[], state: CheckState): void {
  const pendingGroups: OverloadGroup[] = [];
  for (const member of members) {
    if (isConstructorDeclaration(member) || isMethodDeclaration(member)) {
      if (hasModifier(member, Kind.AbstractKeyword)) {
        diagnosePendingOverloadGroups(pendingGroups, state);
        continue;
      }
      const group = classMemberOverloadGroup(member);
      if (member.body === undefined) {
        if (group !== undefined) {
          pendingGroups.push(group);
        }
        continue;
      }
      checkClassMemberImplementationOverloads(group, pendingGroups, state);
      continue;
    }
    diagnosePendingOverloadGroups(pendingGroups, state);
  }
  diagnosePendingOverloadGroups(pendingGroups, state);
}

function classMemberOverloadGroup(member: ConstructorDeclaration | MethodDeclaration): OverloadGroup | undefined {
  if (isConstructorDeclaration(member)) {
    return { kind: "constructor" };
  }
  const name = propertyNameText(member.name);
  return name === undefined ? undefined : { kind: "method", name };
}

function checkClassMemberImplementationOverloads(implementationGroup: OverloadGroup | undefined, pendingGroups: OverloadGroup[], state: CheckState): void {
  if (pendingGroups.length === 0 || implementationGroup === undefined) {
    return;
  }
  const immediateGroup = pendingGroups[pendingGroups.length - 1]!;
  if (implementationGroup.kind === "constructor" && immediateGroup.kind === "constructor") {
    removeTrailingMatchingOverloadGroups(pendingGroups, implementationGroup);
    return;
  }
  if (implementationGroup.kind === "method" && immediateGroup.kind === "method") {
    if (implementationGroup.name === immediateGroup.name) {
      removeTrailingMatchingOverloadGroups(pendingGroups, implementationGroup);
    } else {
      state.diagnostics.push(createDiagnostic(2389, immediateGroup.name));
      removeTrailingMatchingOverloadGroups(pendingGroups, immediateGroup);
    }
    diagnosePendingOverloadGroups(pendingGroups, state);
    return;
  }
  diagnosePendingOverloadGroups(pendingGroups, state);
}

function removeTrailingMatchingOverloadGroups(pendingGroups: OverloadGroup[], resolvedGroup: OverloadGroup): void {
  while (pendingGroups.length > 0 && sameOverloadGroup(pendingGroups[pendingGroups.length - 1]!, resolvedGroup)) {
    pendingGroups.pop();
  }
}

function sameOverloadGroup(left: OverloadGroup, right: OverloadGroup): boolean {
  return left.kind === right.kind && (left.kind === "constructor" || right.kind === "constructor" || left.name === right.name);
}

function diagnosePendingOverloadGroups(pendingGroups: OverloadGroup[], state: CheckState): void {
  if (pendingGroups.length === 0) {
    return;
  }
  if (pendingGroups.some(group => group.kind === "constructor")) {
    state.diagnostics.push(createDiagnostic(2390));
  }
  const methodDiagnosticCount = uniqueInOrder(pendingGroups.filter(group => group.kind === "method").map(group => group.name)).length;
  for (let index = 0; index < methodDiagnosticCount; index += 1) {
    state.diagnostics.push(createDiagnostic(2391));
  }
  pendingGroups.length = 0;
}

function propertyNameText(name: PropertyName): string | undefined {
  if (isIdentifier(name) || isNumericLiteral(name)) {
    return name.text;
  }
  if (isStringLiteral(name) || isNoSubstitutionTemplateLiteral(name)) {
    return `"${name.text}"`;
  }
  if (isPrivateIdentifier(name)) {
    return name.text.startsWith("#") ? name.text : `#${name.text}`;
  }
  if (isComputedPropertyName(name)) {
    return undefined;
  }
  return undefined;
}

function propertyNameDiagnosticText(name: PropertyName): string | undefined {
  if (isIdentifier(name) || isNumericLiteral(name) || isStringLiteral(name) || isNoSubstitutionTemplateLiteral(name)) {
    return name.text;
  }
  if (isPrivateIdentifier(name)) {
    return name.text.startsWith("#") ? name.text : `#${name.text}`;
  }
  return undefined;
}

function checkClassElement(member: ClassElement, state: CheckState, environment: TypeEnvironment, ambient: boolean, classIsAbstract: boolean, classMembers: ClassMemberNames, inheritedMembers: ClassMemberNames | undefined, accessorContextTypes: ReadonlyMap<string, AccessorContextTypes>, constructorAssignedProperties: ReadonlySet<string>): void {
  checkJavaScriptDeclareModifier(member, state);
  if (hasModifier(member, Kind.ConstKeyword)) {
    state.diagnostics.push(createDiagnostic(1248, "const"));
  }
  if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkInheritedPropertyOverride(member, state, environment, classMembers, inheritedMembers);
    checkAccessorDeclaration(member, state, environment, ambient, accessorContextType(member, accessorContextTypes));
    return;
  }
  if (isConstructorDeclaration(member) || isMethodDeclaration(member)) {
    if (isMethodDeclaration(member)) {
      checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), false);
    }
    const memberEnvironment = createFunctionEnvironment(environment);
    seedArgumentsObject(memberEnvironment);
    if (classMembers.className !== undefined && !hasModifier(member, Kind.StaticKeyword)) {
      memberEnvironment.set("this", thisClassType(classMembers, isConstructorDeclaration(member) ? "constructor" : "method"));
    }
    if (isMethodDeclaration(member)) {
      addTypeParametersToEnvironment(member.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], memberEnvironment);
      addTypeParameterConstraintsToEnvironment(member.typeParameters, memberEnvironment);
    }
    seedUnqualifiedClassMemberDiagnostics(memberEnvironment, classMembers, isMethodDeclaration(member) && hasModifier(member, Kind.StaticKeyword));
    checkSignatureParameters(member.parameters, state, memberEnvironment, isMethodDeclaration(member) || member.body === undefined, ambient);
    if (member.body !== undefined) {
      if (ambient) {
        state.diagnostics.push(createDiagnostic(1183));
      }
      if (member.type !== undefined) {
        checkJavaScriptTypeAnnotation(state);
      }
      const returnType = member.type === undefined ? undefined : typeFromTypeNode(member.type, memberEnvironment, state);
      const yieldType = isMethodDeclaration(member) && member.asteriskToken !== undefined ? generatorYieldType(returnType) : undefined;
      checkBlock(member.body, enterFunction(state, yieldType), memberEnvironment, isMethodDeclaration(member) && member.asteriskToken !== undefined ? undefined : returnType);
      if (!isMethodDeclaration(member) || member.asteriskToken === undefined) {
        checkFunctionReturnCompleteness(member.body, returnType, state);
      }
    }
    return;
  }
  if (isClassStaticBlockDeclaration(member)) {
    checkBlock(member.body, enterClassInitializerOrStaticBlock(state), cloneTypeEnvironment(environment), undefined);
    return;
  }
  if (isIndexSignatureDeclaration(member)) {
    checkIndexSignatureDeclaration(member, state, environment);
    return;
  }
  if (isPropertyDeclaration(member) && member.initializer !== undefined) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkUninitializedProperty(member, state, ambient, constructorAssignedProperties);
    checkAutoAccessorTarget(member, state, ambient);
    checkInheritedPropertyOverride(member, state, environment, classMembers, inheritedMembers);
    if (member.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
      typeFromTypeNode(member.type, environment, state);
    }
    const initializerEnvironment = cloneTypeEnvironment(environment);
    if (classMembers.className !== undefined) {
      initializerEnvironment.set("this", thisClassType(classMembers, "fieldInitializer"));
    }
    inferExpression(member.initializer, enterClassInitializerOrStaticBlock(state), initializerEnvironment);
    return;
  }
  if (isPropertyDeclaration(member)) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkUninitializedProperty(member, state, ambient, constructorAssignedProperties);
    checkAutoAccessorTarget(member, state, ambient);
    checkInheritedPropertyOverride(member, state, environment, classMembers, inheritedMembers);
    if (member.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
      typeFromTypeNode(member.type, environment, state);
    }
  }
}

function accessorContextType(accessor: GetAccessorDeclaration | SetAccessorDeclaration, accessorContextTypes: ReadonlyMap<string, AccessorContextTypes>): CheckedType | undefined {
  const name = propertyNameText(accessor.name);
  if (name === undefined) {
    return undefined;
  }
  const context = accessorContextTypes.get(name);
  if (isGetAccessorDeclaration(accessor)) {
    return accessor.type === undefined ? context?.setterType : undefined;
  }
  const parameter = accessor.parameters[0];
  return parameter?.type === undefined ? context?.getterType : undefined;
}

function checkAutoAccessorTarget(member: Extract<ClassElement, { readonly kind: Kind.PropertyDeclaration }>, state: CheckState, ambient: boolean): void {
  if (!ambient && hasModifier(member, Kind.AccessorKeyword) && !targetSupportsAccessors(state.options.target)) {
    state.diagnostics.push(createDiagnostic(18045));
  }
}

function targetSupportsAccessors(target: CompilerOptions["target"]): boolean {
  return target !== "es3" && target !== "es5";
}

function targetSupportsUplevelIteration(target: CompilerOptions["target"]): boolean {
  return targetOrder(target) >= targetOrder("es2015");
}

function targetOrder(target: CompilerOptions["target"]): number {
  switch (target) {
    case "es3":
      return 3;
    case "es5":
      return 5;
    case "es2015":
      return 2015;
    case "es2016":
      return 2016;
    case "es2017":
      return 2017;
    case "es2018":
      return 2018;
    case "es2019":
      return 2019;
    case "es2020":
      return 2020;
    case "es2021":
      return 2021;
    case "es2022":
      return 2022;
    case "es2023":
      return 2023;
    case "es2024":
      return 2024;
    case "esnext":
      return Number.MAX_SAFE_INTEGER;
    default:
      return 3;
  }
}

function checkInheritedPropertyOverride(member: ClassElement, state: CheckState, environment: TypeEnvironment, classMembers: ClassMemberNames, inheritedMembers: ClassMemberNames | undefined): void {
  if (inheritedMembers === undefined || hasModifier(member, Kind.AbstractKeyword)) {
    return;
  }
  const name = classElementName(member);
  if (name === undefined) {
    return;
  }
  const expectedType = inheritedMembers.propertyTypes.get(name);
  const actualType = classMemberPropertyType(member, environment, state);
  if (expectedType === undefined || actualType === undefined || isAssignableTo(actualType, expectedType, state.options)) {
    return;
  }
  state.diagnostics.push(createDiagnostic(2416, name, classMembers.className ?? "", inheritedMembers.propertyDeclaringClasses.get(name) ?? inheritedMembers.className ?? ""));
}

function seedUnqualifiedClassMemberDiagnostics(environment: TypeEnvironment, classMembers: ClassMemberNames, staticMethod: boolean): void {
  if (staticMethod) {
    for (const memberName of classMembers.instance) {
      environment.set(memberName, { kind: "unqualifiedInstanceMember", memberName });
    }
    return;
  }
  if (classMembers.className === undefined) {
    return;
  }
  for (const memberName of classMembers.static) {
    environment.set(memberName, { kind: "unqualifiedStaticMember", className: classMembers.className, memberName });
  }
}

function thisClassType(classMembers: ClassMemberNames, mode: Extract<CheckedType, { readonly kind: "thisClass" }>["mode"]): CheckedType {
  return {
    kind: "thisClass",
    className: classMembers.className ?? "",
    members: classMembers,
    abstractProperties: classMembers.abstractProperties,
    abstractPropertyDeclaringClasses: classMembers.abstractPropertyDeclaringClasses,
    uninitializedProperties: classMembers.uninitializedProperties,
    mode,
  };
}

function checkUninitializedProperty(member: Extract<ClassElement, { readonly kind: Kind.PropertyDeclaration }>, state: CheckState, ambient: boolean, constructorAssignedProperties: ReadonlySet<string>): void {
  const name = propertyNameText(member.name);
  if (
    ambient
    || !strictOptionValue(state.options, "strictNullChecks")
    || member.type === undefined
    || member.initializer !== undefined
    || hasModifier(member, Kind.StaticKeyword)
    || hasModifier(member, Kind.AbstractKeyword)
    || hasDeclareModifier(member)
    || (member as { readonly postfixToken?: { readonly kind: Kind } }).postfixToken?.kind === Kind.ExclamationToken
    || (member as { readonly postfixToken?: { readonly kind: Kind } }).postfixToken?.kind === Kind.QuestionToken
    || (name !== undefined && constructorAssignedProperties.has(name))
  ) {
    return;
  }
  if (name !== undefined) {
    state.diagnostics.push(createDiagnostic(2564, name));
  }
}

function collectConstructorAssignedThisProperties(members: readonly ClassElement[]): ReadonlySet<string> {
  const assigned = new Set<string>();
  for (const member of members) {
    if (!isConstructorDeclaration(member) || member.body === undefined) {
      continue;
    }
    for (const statement of member.body.statements) {
      const name = constructorThisPropertyAssignmentName(statement);
      if (name !== undefined) {
        assigned.add(name);
      }
    }
  }
  return assigned;
}

function constructorThisPropertyAssignmentName(statement: Statement): string | undefined {
  if (!isExpressionStatement(statement) || !isBinaryExpression(statement.expression) || !assignmentOperatorDefinitelyAssignsTarget(statement.expression.operatorToken.kind)) {
    return undefined;
  }
  const target = statement.expression.left;
  if (!isPropertyAccessExpression(target) || !isKeywordExpression(target.expression) || target.expression.kind !== Kind.ThisKeyword) {
    return undefined;
  }
  return target.name.text;
}

function checkAbstractMemberModifiers(member: ClassElement, state: CheckState, classIsAbstract: boolean, memberName: string | undefined, propertyLike: boolean): void {
  if (!hasModifier(member, Kind.AbstractKeyword)) {
    return;
  }
  if (!classIsAbstract) {
    state.diagnostics.push(createDiagnostic(propertyLike ? 1253 : 1244));
  }
  if (isMethodDeclaration(member) && member.body !== undefined) {
    state.diagnostics.push(createDiagnostic(1245, memberName ?? ""));
  }
  if ((isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) && member.body !== undefined) {
    state.diagnostics.push(createDiagnostic(1318));
  }
  if (isPropertyDeclaration(member) && member.initializer !== undefined) {
    state.diagnostics.push(createDiagnostic(1267, memberName ?? ""));
  }
}

function checkTypeElements(members: readonly TypeElement[], state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  for (const member of members) {
    if (isIndexSignatureDeclaration(member)) {
      checkIndexSignatureDeclaration(member, state, environment);
      continue;
    }
    if (isCallSignatureDeclaration(member) || isConstructSignatureDeclaration(member)) {
      const signatureEnvironment = cloneTypeEnvironment(environment);
      addTypeParametersToEnvironment(member.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], signatureEnvironment);
      addTypeParameterConstraintsToEnvironment(member.typeParameters, signatureEnvironment);
      checkSignatureParameters(member.parameters, state, signatureEnvironment, true);
      if (member.type !== undefined) {
        typeFromTypeNode(member.type, signatureEnvironment, state);
      }
      if (isConstructSignatureDeclaration(member) && member.type === undefined && strictOptionValue(state.options, "noImplicitAny")) {
        state.diagnostics.push(createDiagnostic(7013));
      } else if (isCallSignatureDeclaration(member) && member.type === undefined && strictOptionValue(state.options, "noImplicitAny")) {
        state.diagnostics.push(createDiagnostic(7020));
      }
      continue;
    }
    if (isMethodSignatureDeclaration(member)) {
      const signatureEnvironment = cloneTypeEnvironment(environment);
      addTypeParametersToEnvironment(member.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], signatureEnvironment);
      addTypeParameterConstraintsToEnvironment(member.typeParameters, signatureEnvironment);
      checkSignatureParameters(member.parameters, state, signatureEnvironment, true);
      if (member.type !== undefined) {
        typeFromTypeNode(member.type, signatureEnvironment, state);
      }
      if (member.type === undefined && strictOptionValue(state.options, "noImplicitAny")) {
        state.diagnostics.push(createDiagnostic(7010, propertyNameText(member.name) ?? "(Missing)", "any"));
      }
      continue;
    }
    if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
      checkAccessorDeclaration(member, state, environment, ambient);
    }
  }
}

function checkIndexSignatureDeclaration(member: IndexSignatureDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (member.parameters.length !== 1) {
    state.diagnostics.push(createDiagnostic(1096));
    checkIndexSignatureValueType(member, environment, state);
    return;
  }
  const parameter = member.parameters[0]!;
  if (parameter.dotDotDotToken !== undefined) {
    state.diagnostics.push(createDiagnostic(1017));
    checkIndexSignatureValueType(member, environment, state);
    return;
  }
  if (parameter.questionToken !== undefined) {
    state.diagnostics.push(createDiagnostic(1019));
    checkIndexSignatureValueType(member, environment, state);
    return;
  }
  checkIndexSignatureParameterType(parameter.type, state);
  checkIndexSignatureValueType(member, environment, state);
}

function checkIndexSignatureValueType(member: IndexSignatureDeclaration, environment: TypeEnvironment, state: CheckState): void {
  if (member.type !== undefined) {
    typeFromTypeNode(member.type, environment, state);
  }
}

function checkIndexSignatureParameterType(type: TypeNode | undefined, state: CheckState): void {
  if (type === undefined) {
    state.diagnostics.push(createDiagnostic(1021));
    return;
  }
  if (type.kind !== Kind.StringKeyword && type.kind !== Kind.NumberKeyword && type.kind !== Kind.SymbolKeyword && type.kind !== Kind.TemplateLiteralType) {
    state.diagnostics.push(createDiagnostic(1268));
  }
}

function checkAccessorDeclaration(accessor: GetAccessorDeclaration | SetAccessorDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean, contextualAccessorType?: CheckedType): void {
  const accessorEnvironment = createFunctionEnvironment(environment);
  seedArgumentsObject(accessorEnvironment);
  if (accessor.typeParameters !== undefined && accessor.typeParameters.length > 0) {
    state.diagnostics.push(createDiagnostic(1094));
  }
  if (isGetAccessorDeclaration(accessor)) {
    if (accessor.parameters.length > 0) {
      state.diagnostics.push(createDiagnostic(1054));
    }
    checkSignatureParameters(accessor.parameters, state, accessorEnvironment, true);
    if (accessor.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
    }
    const returnType = accessor.type === undefined ? contextualAccessorType : typeFromTypeNode(accessor.type, accessorEnvironment, state);
    checkAccessorBody(accessor, state, accessorEnvironment, ambient, returnType);
    return;
  }
  if (accessor.parameters.length !== 1) {
    state.diagnostics.push(createDiagnostic(1049));
  }
  for (const parameter of accessor.parameters) {
    checkParameterModifiers(parameter, state, false);
    if (parameter.questionToken !== undefined) {
      state.diagnostics.push(createDiagnostic(1051));
    }
    if (parameter.initializer !== undefined) {
      state.diagnostics.push(createDiagnostic(1052));
    }
    if (parameter.dotDotDotToken !== undefined) {
      state.diagnostics.push(createDiagnostic(1053));
    }
    if (parameter.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
    }
    const parameterType = parameterTypeFromDeclaration(parameter, accessorEnvironment, state, contextualAccessorType ?? unresolvedType);
    checkRestParameterArrayType(parameter, parameterType, state);
    setBindingNameType(parameter.name, parameterType, accessorEnvironment);
  }
  if (accessor.type !== undefined) {
    checkJavaScriptTypeAnnotation(state);
    state.diagnostics.push(createDiagnostic(1095));
    typeFromTypeNode(accessor.type, accessorEnvironment, state);
  }
  checkAccessorBody(accessor, state, accessorEnvironment, ambient, undefined);
}

function checkAccessorBody(accessor: GetAccessorDeclaration | SetAccessorDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean, expectedReturnType: CheckedType | undefined): void {
  if (accessor.body === undefined) {
    if (!ambient && !hasModifier(accessor, Kind.AbstractKeyword)) {
      state.diagnostics.push(createDiagnostic(1005, "{"));
    }
    return;
  }
  if (ambient) {
    state.diagnostics.push(createDiagnostic(1183));
  }
  checkBlock(accessor.body, enterFunction(state), environment, expectedReturnType);
}

function checkSignatureParameters(parameters: readonly ParameterDeclaration[], state: CheckState, environment: TypeEnvironment, disallowParameterProperties: boolean, ambient = false, contextualParameterTypes: readonly CheckedType[] = []): readonly CheckedType[] {
  checkParameterListGrammar(parameters, state);
  return parameters.map((parameter, parameterIndex) => {
    checkParameterModifiers(parameter, state, !disallowParameterProperties);
    if (parameter.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
    }
    const contextualParameterType = contextualParameterTypes[parameterIndex];
    checkImplicitAnyParameter(parameter, state, contextualParameterType);
    const parameterType = parameterTypeFromDeclaration(parameter, environment, state, contextualParameterType);
    checkRestParameterArrayType(parameter, parameterType, state);
    checkStrictModeBindingName(parameter.name, state, ambient);
    setBindingNameType(parameter.name, parameterType, environment);
    if (parameter.initializer !== undefined) {
      inferExpression(parameter.initializer, enterFunction(state), environment);
    }
    return parameterType;
  });
}

function parameterDisplayNames(parameters: readonly ParameterDeclaration[]): readonly string[] {
  return parameters.map((parameter, index) => isIdentifier(parameter.name) ? parameter.name.text : `arg${index}`);
}

function addTypeParametersToEnvironment(typeParameters: readonly string[], environment: TypeEnvironment): void {
  for (const typeParameter of typeParameters) {
    environment.set(typeParameter, { kind: "typeParameter", name: typeParameter });
  }
}

function addTypeParameterConstraintsToEnvironment(typeParameters: NodeArray<TypeParameterDeclaration> | undefined, environment: TypeEnvironment): void {
  if (typeParameters === undefined) {
    return;
  }
  for (const typeParameter of typeParameters) {
    if (typeParameter.constraint === undefined) {
      continue;
    }
    environment.set(typeParameter.name.text, {
      kind: "typeParameter",
      name: typeParameter.name.text,
      constraint: typeFromTypeNode(typeParameter.constraint, environment, undefined),
    });
  }
}

function effectiveTypeParameterNames(explicitTypeParameters: NodeArray<TypeParameterDeclaration> | undefined, jsDocOwner: Node): readonly string[] {
  return uniqueInOrder([
    ...(explicitTypeParameters?.map(typeParameter => typeParameter.name.text) ?? []),
    ...jsDocTypeParameterNames(jsDocOwner),
  ]);
}

function jsDocTypeParameterNames(node: Node): readonly string[] {
  const names: string[] = [];
  for (const tag of jsDocTags(node)) {
    if (isJSDocTemplateTag(tag)) {
      names.push(...tag.typeParameters.map(typeParameter => typeParameter.name.text));
    }
  }
  return names;
}

function jsDocParameterTypeMap(node: Node, environment: TypeEnvironment, state: CheckState): ReadonlyMap<string, CheckedType> {
  const parameterTypes = new Map<string, CheckedType>();
  for (const tag of jsDocTags(node)) {
    if (!isJSDocParameterTag(tag) || tag.typeExpression === undefined) {
      continue;
    }
    const name = entityNameText(tag.name);
    if (name !== undefined) {
      parameterTypes.set(name, typeFromTypeNode(tag.typeExpression, environment, state));
    }
  }
  return parameterTypes;
}

function jsDocReturnType(node: Node, environment: TypeEnvironment, state: CheckState): CheckedType | undefined {
  for (const tag of jsDocTags(node)) {
    if (isJSDocReturnTag(tag) && tag.typeExpression !== undefined) {
      return typeFromTypeNode(tag.typeExpression, environment, state);
    }
  }
  return undefined;
}

function jsDocTypeTagType(node: Node, environment: TypeEnvironment, state: CheckState): CheckedType | undefined {
  for (const tag of jsDocTags(node)) {
    if (isJSDocTypeTag(tag) && isTypeNode(tag.typeExpression)) {
      return typeFromTypeNode(tag.typeExpression, environment, state);
    }
  }
  return undefined;
}

function jsDocTags(node: Node): readonly Node[] {
  const tags: Node[] = [];
  for (const jsDoc of node.jsDoc ?? []) {
    if (isJSDoc(jsDoc) && jsDoc.tags !== undefined) {
      tags.push(...jsDoc.tags);
    }
  }
  return tags;
}

function jsDocParameterType(parameter: ParameterDeclaration, parameterTypes: ReadonlyMap<string, CheckedType>): CheckedType | undefined {
  if (!isIdentifier(parameter.name)) {
    return undefined;
  }
  return parameterTypes.get(parameter.name.text);
}

function attachJSDocIfMissing(target: Node, source: Node): void {
  const jsDoc = source.jsDoc;
  if ((target.jsDoc?.length ?? 0) > 0 || jsDoc === undefined || jsDoc.length === 0) {
    return;
  }
  Object.defineProperty(target, "jsDoc", {
    configurable: true,
    enumerable: true,
    value: jsDoc,
  });
}

function functionDeclarationType(functionDeclaration: FunctionDeclaration, environment: TypeEnvironment, state: CheckState): CheckedFunctionType {
  const functionEnvironment = createFunctionEnvironment(environment);
  const typeParameters = effectiveTypeParameterNames(functionDeclaration.typeParameters, functionDeclaration);
  addTypeParametersToEnvironment(typeParameters, functionEnvironment);
  addTypeParameterConstraintsToEnvironment(functionDeclaration.typeParameters, functionEnvironment);
  const jsDocParameterTypes = jsDocParameterTypeMap(functionDeclaration, functionEnvironment, state);
  const parameterTypes = functionDeclaration.parameters.map(parameter => parameterTypeFromDeclaration(parameter, functionEnvironment, state, jsDocParameterType(parameter, jsDocParameterTypes)));
  const returnType = functionDeclaration.type === undefined
    ? jsDocReturnType(functionDeclaration, functionEnvironment, state)
    : bindTypePredicateParameterIndex(typeFromTypeNode(functionDeclaration.type, functionEnvironment, state), functionDeclaration.parameters);
  return {
    kind: "function",
    typeParameters,
    parameters: parameterTypes,
    parameterNames: parameterDisplayNames(functionDeclaration.parameters),
    ...signatureRestParameterIndex(functionDeclaration.parameters),
    ...signatureMinArgumentCount(functionDeclaration.parameters, state),
    ...signatureMaxArgumentCount(functionDeclaration.parameters, state, functionDeclaration.body),
    returnType: returnType ?? unresolvedType,
  };
}

function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  if (functionDeclaration.type !== undefined) {
    checkJavaScriptTypeAnnotation(state);
  }
  const functionEnvironment = createFunctionEnvironment(environment);
  const typeParameters = effectiveTypeParameterNames(functionDeclaration.typeParameters, functionDeclaration);
  addTypeParametersToEnvironment(typeParameters, functionEnvironment);
  addTypeParameterConstraintsToEnvironment(functionDeclaration.typeParameters, functionEnvironment);
  const jsDocParameterTypes = jsDocParameterTypeMap(functionDeclaration, functionEnvironment, state);
  const parameterTypes = functionDeclaration.parameters.map(parameter => parameterTypeFromDeclaration(parameter, functionEnvironment, state, jsDocParameterType(parameter, jsDocParameterTypes)));
  const returnType = functionDeclaration.type === undefined
    ? jsDocReturnType(functionDeclaration, functionEnvironment, state)
    : bindTypePredicateParameterIndex(typeFromTypeNode(functionDeclaration.type, functionEnvironment, state), functionDeclaration.parameters);
  const isImplementedOverloadDeclaration = state.functionOverloadInfo?.declarationsWithImplementation.has(functionDeclaration) === true;
  if (strictOptionValue(state.options, "noImplicitAny") && functionDeclaration.body === undefined && functionDeclaration.type === undefined && returnType === undefined && !isImplementedOverloadDeclaration) {
    state.diagnostics.push(createDiagnostic(7010, functionDeclaration.name?.text ?? "(Missing)", "any"));
  }
  if (functionDeclaration.name !== undefined) {
    checkStrictModeIdentifier(functionDeclaration.name.text, state, ambient);
  }
  if (functionDeclaration.name !== undefined) {
    const existingFunctionType = callableFunctionType(environment.get(functionDeclaration.name.text));
    const overloads = existingFunctionType?.overloads;
    const functionType: CheckedFunctionType = {
      kind: "function",
      typeParameters,
      parameters: parameterTypes,
      parameterNames: parameterDisplayNames(functionDeclaration.parameters),
      ...signatureRestParameterIndex(functionDeclaration.parameters),
      ...signatureMinArgumentCount(functionDeclaration.parameters, state),
      ...signatureMaxArgumentCount(functionDeclaration.parameters, state, functionDeclaration.body),
      returnType: returnType ?? unresolvedType,
      ...(overloads === undefined ? {} : { overloads }),
    };
    if (functionDeclaration.body !== undefined || overloads === undefined) {
      environment.set(functionDeclaration.name.text, functionDeclarationBinding(functionDeclaration.name.text, functionType));
    }
    functionEnvironment.set(functionDeclaration.name.text, functionDeclarationBinding(functionDeclaration.name.text, functionType));
  }
  seedArgumentsObject(functionEnvironment);
  checkParameterListGrammar(functionDeclaration.parameters, state);
  for (let index = 0; index < functionDeclaration.parameters.length; index += 1) {
    const parameter = functionDeclaration.parameters[index]!;
    checkParameterModifiers(parameter, state, false);
    if (parameter.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
    }
    checkImplicitAnyParameter(parameter, state, jsDocParameterType(parameter, jsDocParameterTypes));
    checkRestParameterArrayType(parameter, parameterTypes[index] ?? unresolvedType, state);
    checkStrictModeBindingName(parameter.name, state, ambient);
    setBindingNameType(parameter.name, parameterTypes[index] ?? unresolvedType, functionEnvironment);
    if (parameter.initializer !== undefined) {
      inferExpression(parameter.initializer, enterFunction(state), functionEnvironment);
    }
  }
  if (functionDeclaration.body !== undefined) {
    const yieldType = functionDeclaration.asteriskToken === undefined ? undefined : generatorYieldType(returnType);
    checkBlock(functionDeclaration.body, enterFunction(state, yieldType), functionEnvironment, functionDeclaration.asteriskToken === undefined ? returnType : undefined);
    if (functionDeclaration.asteriskToken === undefined) {
      checkFunctionReturnCompleteness(functionDeclaration.body, returnType, state);
    }
    checkDeclarationEmitInferredReturnType(functionDeclaration, state, functionEnvironment);
  }
}

function checkDeclarationEmitInferredReturnType(functionDeclaration: FunctionDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (state.options.declaration !== true || functionDeclaration.type !== undefined || functionDeclaration.body === undefined) {
    return;
  }
  const returnType = methodBodyReturnType(functionDeclaration.body, state.options, environment);
  if (typeRequiresExplicitDeclarationAnnotation(returnType)) {
    state.diagnostics.push(createDiagnostic(5088, functionDeclaration.name?.text ?? "(Missing)"));
  }
}

function typeRequiresExplicitDeclarationAnnotation(type: CheckedType): boolean {
  if (type.kind === "typeAliasInstance") {
    return type.requiresExplicitDeclarationAnnotation || typeRequiresExplicitDeclarationAnnotation(type.target);
  }
  if (type.kind === "array" || type.kind === "readonlyArray" || type.kind === "arrayLike" || type.kind === "arrayIterator" || type.kind === "iterable" || type.kind === "set") {
    return typeRequiresExplicitDeclarationAnnotation(type.elementType);
  }
  if (type.kind === "tuple") {
    return type.elements.some(element => typeRequiresExplicitDeclarationAnnotation(element.type))
      || (type.restElementType !== undefined && typeRequiresExplicitDeclarationAnnotation(type.restElementType));
  }
  if (type.kind === "union" || type.kind === "intersection") {
    return type.types.some(typeRequiresExplicitDeclarationAnnotation);
  }
  if (type.kind === "function") {
    return type.parameters.some(typeRequiresExplicitDeclarationAnnotation)
      || typeRequiresExplicitDeclarationAnnotation(type.returnType)
      || type.overloads?.some(typeRequiresExplicitDeclarationAnnotation) === true;
  }
  if (type.kind === "object") {
    return [...type.properties.values()].some(typeRequiresExplicitDeclarationAnnotation)
      || type.callSignatures?.some(typeRequiresExplicitDeclarationAnnotation) === true
      || (type.stringIndexType !== undefined && typeRequiresExplicitDeclarationAnnotation(type.stringIndexType))
      || (type.numberIndexType !== undefined && typeRequiresExplicitDeclarationAnnotation(type.numberIndexType));
  }
  if (type.kind === "interface") {
    return [...type.members.properties.values()].some(typeRequiresExplicitDeclarationAnnotation)
      || type.members.callSignatures.some(typeRequiresExplicitDeclarationAnnotation);
  }
  if (type.kind === "builtinConstructor") {
    return typeRequiresExplicitDeclarationAnnotation(type.instanceType)
      || type.constructorParameters.some(typeRequiresExplicitDeclarationAnnotation)
      || [...type.staticProperties.values()].some(typeRequiresExplicitDeclarationAnnotation);
  }
  if (type.kind === "nonNullable") {
    return typeRequiresExplicitDeclarationAnnotation(type.target);
  }
  return false;
}

function inferFunctionExpression(functionExpression: FunctionExpression, state: CheckState, environment: TypeEnvironment, contextualParameterTypes: readonly CheckedType[] = [], contextualReturnType?: CheckedType): CheckedFunctionType {
  if (functionExpression.type !== undefined) {
    checkJavaScriptTypeAnnotation(state);
  }
  const functionEnvironment = createFunctionEnvironment(environment);
  const typeParameters = effectiveTypeParameterNames(functionExpression.typeParameters, functionExpression);
  addTypeParametersToEnvironment(typeParameters, functionEnvironment);
  addTypeParameterConstraintsToEnvironment(functionExpression.typeParameters, functionEnvironment);
  const jsDocParameterTypes = jsDocParameterTypeMap(functionExpression, functionEnvironment, state);
  const parameterTypes = functionExpression.parameters.map((parameter, parameterIndex) => parameterTypeFromDeclaration(parameter, functionEnvironment, state, jsDocParameterType(parameter, jsDocParameterTypes) ?? contextualParameterTypes[parameterIndex]));
  const jsDocDeclaredReturnType = jsDocReturnType(functionExpression, functionEnvironment, state);
  const declaredReturnType = functionExpression.type === undefined ? jsDocDeclaredReturnType : bindTypePredicateParameterIndex(typeFromTypeNode(functionExpression.type, functionEnvironment, state), functionExpression.parameters);
  seedArgumentsObject(functionEnvironment);
  checkParameterListGrammar(functionExpression.parameters, state);
  for (let index = 0; index < functionExpression.parameters.length; index += 1) {
    const parameter = functionExpression.parameters[index]!;
    checkParameterModifiers(parameter, state, false);
    if (parameter.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
    }
    checkImplicitAnyParameter(parameter, state, jsDocParameterType(parameter, jsDocParameterTypes) ?? contextualParameterTypes[index]);
    checkRestParameterArrayType(parameter, parameterTypes[index] ?? unresolvedType, state);
    checkStrictModeBindingName(parameter.name, state, false);
    setBindingNameType(parameter.name, parameterTypes[index] ?? unresolvedType, functionEnvironment);
    if (parameter.initializer !== undefined) {
      inferExpression(parameter.initializer, enterFunction(state), functionEnvironment);
    }
  }
  const expectedReturnType = declaredReturnType ?? contextualReturnType;
  const inferredReturnType = methodBodyReturnType(functionExpression.body, state.options, functionEnvironment);
  const functionType: CheckedFunctionType = {
    kind: "function",
    typeParameters,
    parameters: parameterTypes,
    parameterNames: parameterDisplayNames(functionExpression.parameters),
    ...signatureRestParameterIndex(functionExpression.parameters),
    ...signatureMinArgumentCount(functionExpression.parameters, state),
    ...signatureMaxArgumentCount(functionExpression.parameters, state, functionExpression.body),
    returnType: declaredReturnType ?? inferredReturnType,
  };
  if (functionExpression.name !== undefined) {
    checkStrictModeIdentifier(functionExpression.name.text, state, false);
    functionEnvironment.set(functionExpression.name.text, functionType);
  }
  const yieldType = functionExpression.asteriskToken === undefined ? undefined : generatorYieldType(declaredReturnType);
  checkBlock(functionExpression.body, enterFunction(state, yieldType), functionEnvironment, functionExpression.asteriskToken === undefined ? declaredReturnType : undefined);
  if (declaredReturnType !== undefined && functionExpression.asteriskToken === undefined) {
    checkFunctionReturnCompleteness(functionExpression.body, declaredReturnType, state);
  }
  return functionType;
}

function checkBlock(block: Block, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): void {
  checkStatements(block.statements, state, cloneTypeEnvironment(environment), expectedReturnType, false);
}

function seedArgumentsObject(environment: TypeEnvironment): void {
  environment.set("arguments", iArgumentsType);
}

function createFunctionEnvironment(environment: TypeEnvironment): TypeEnvironment {
  const functionEnvironment = new Map<string, CheckedType>();
  for (const [name, type] of environment.entries()) {
    functionEnvironment.set(name, removeCapturedDefiniteAssignmentState(type));
  }
  copyEnvironmentCorrelations(environment, functionEnvironment);
  copyReadonlyEnvironmentBindings(environment, functionEnvironment);
  return functionEnvironment;
}

function removeCapturedDefiniteAssignmentState(type: CheckedType): CheckedType {
  return type.kind === "unassignedVariable" ? type.type : type;
}

function checkFunctionReturnCompleteness(body: Block, returnType: CheckedType | undefined, state: CheckState): void {
  if (returnType === undefined) {
    return;
  }
  if (returnType.kind === "never") {
    if (!blockDefinitelyTerminates(body)) {
      state.diagnostics.push(createDiagnostic(2534));
    }
    return;
  }
  if (!requiresReturnValue(returnType)) {
    return;
  }
  if (!blockContainsReturn(body)) {
    state.diagnostics.push(createDiagnostic(2355));
    return;
  }
  if (!returnTypeAllowsImplicitUndefined(returnType) && !blockDefinitelyTerminates(body)) {
    state.diagnostics.push(createDiagnostic(2366));
  }
}

function generatorYieldType(returnType: CheckedType | undefined): CheckedType | undefined {
  if (returnType === undefined) {
    return undefined;
  }
  if (returnType.kind === "typeAliasInstance") {
    return generatorYieldType(returnType.target);
  }
  if (returnType.kind === "arrayIterator" || returnType.kind === "iterable") {
    return returnType.elementType;
  }
  if (returnType.kind === "union") {
    const yieldTypes = returnType.types.map(generatorYieldType).filter((type): type is CheckedType => type !== undefined);
    return yieldTypes.length === 0 ? undefined : unionType(yieldTypes);
  }
  return undefined;
}

function blockContainsReturn(block: Block): boolean {
  return block.statements.some(statementContainsReturn);
}

function statementContainsReturn(statement: Statement): boolean {
  if (isReturnStatement(statement)) {
    return true;
  }
  if (isBlock(statement)) {
    return blockContainsReturn(statement);
  }
  if (isIfStatement(statement)) {
    return statementContainsReturn(statement.thenStatement) || (statement.elseStatement !== undefined && statementContainsReturn(statement.elseStatement));
  }
  if (isSwitchStatement(statement)) {
    return statement.caseBlock.clauses.some(clause => clause.statements.some(statementContainsReturn));
  }
  if (isWhileStatement(statement) || isDoStatement(statement) || isForStatement(statement) || isForInStatement(statement) || isForOfStatement(statement)) {
    return statementContainsReturn(statement.statement);
  }
  return false;
}

function blockDefinitelyTerminates(block: Block): boolean {
  return block.statements.some(statementDefinitelyTerminates);
}

function statementDefinitelyTerminates(statement: Statement): boolean {
  if (isReturnStatement(statement) || isThrowStatement(statement)) {
    return true;
  }
  if (isBlock(statement)) {
    return blockDefinitelyTerminates(statement);
  }
  if (isIfStatement(statement)) {
    return statement.elseStatement !== undefined
      && statementDefinitelyTerminates(statement.thenStatement)
      && statementDefinitelyTerminates(statement.elseStatement);
  }
  if (isSwitchStatement(statement)) {
    return switchDefinitelyTerminates(statement);
  }
  if (isLabeledStatement(statement)) {
    return statementDefinitelyTerminates(statement.statement);
  }
  return false;
}

function switchDefinitelyTerminates(statement: Extract<Statement, { readonly kind: Kind.SwitchStatement }>): boolean {
  if (!statement.caseBlock.clauses.some(clause => clause.kind === Kind.DefaultClause)) {
    return false;
  }
  return statement.caseBlock.clauses.every((_, clauseIndex) => clauseSuffixDefinitelyTerminates(statement.caseBlock.clauses, clauseIndex));
}

function clauseSuffixDefinitelyTerminates(clauses: readonly Extract<Statement, { readonly kind: Kind.SwitchStatement }>["caseBlock"]["clauses"][number][], startIndex: number): boolean {
  for (let clauseIndex = startIndex; clauseIndex < clauses.length; clauseIndex += 1) {
    for (const statement of clauses[clauseIndex]!.statements) {
      if (isBreakStatement(statement)) {
        return false;
      }
      if (statementDefinitelyTerminates(statement)) {
        return true;
      }
    }
  }
  return false;
}

function inferExpression(expression: Expression, state: CheckState, environment: TypeEnvironment): CheckedType {
  const jsDocType = jsDocTypeTagType(expression, environment, state);
  if (jsDocType !== undefined) {
    inferJSDocAnnotatedExpression(expression, state, environment);
    return jsDocType;
  }
  if (isNumericLiteral(expression)) {
    return numberType;
  }
  if (isStringLiteral(expression)) {
    return stringType;
  }
  if (isKeywordExpression(expression)) {
    if (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword) {
      return booleanType;
    }
    if (expression.kind === Kind.NullKeyword) {
      return nullType;
    }
    if (expression.kind === Kind.ThisKeyword) {
      return environment.get("this") ?? anyType;
    }
    return anyType;
  }
  if (isIdentifier(expression)) {
    if (expression.text === "arguments" && state.argumentsForbiddenInClassInitializerOrStaticBlock) {
      state.diagnostics.push(createDiagnostic(2815));
      return iArgumentsType;
    }
    const bound = environment.get(expression.text);
    if (bound === undefined) {
      if (expression.text !== "") {
        if (typeOnlyKeywordValueNames.has(expression.text)) {
          state.diagnostics.push(createDiagnostic(2693, expression.text));
          return unresolvedType;
        }
        checkStrictModeReservedIdentifierExpression(expression.text, state);
        state.diagnostics.push(createDiagnostic(2304, expression.text));
      }
      return unresolvedType;
    }
    if (bound?.kind === "valueAndType") {
      return bound.value;
    }
    if (bound?.kind === "functionDeclaration") {
      return bound.type;
    }
    if (bound?.kind === "namespaceAndType") {
      const namespaceValue = namespaceValueMeaning(bound.namespace);
      if (namespaceValue !== undefined) {
        return namespaceValue;
      }
      state.diagnostics.push(createDiagnostic(2708, expression.text));
      return anyType;
    }
    if (bound?.kind === "unqualifiedStaticMember") {
      state.diagnostics.push(createDiagnostic(2662, bound.memberName, bound.className));
      return unresolvedType;
    }
    if (bound?.kind === "unqualifiedInstanceMember") {
      state.diagnostics.push(createDiagnostic(2304, bound.memberName));
      return unresolvedType;
    }
    if (bound?.kind === "unassignedVariable") {
      state.diagnostics.push(createDiagnostic(2454, bound.name));
      return bound.type;
    }
    return bound;
  }
  if (isExpressionWithTypeArguments(expression)) {
    for (const typeArgument of expression.typeArguments ?? []) {
      typeFromTypeNode(typeArgument, environment, state);
    }
    return inferExpression(expression.expression, state, environment);
  }
  if (isParenthesizedExpression(expression)) {
    return inferExpression(expression.expression, state, environment);
  }
  if (isPrefixUnaryExpression(expression)) {
    if (expression.operator === Kind.PlusPlusToken || expression.operator === Kind.MinusMinusToken) {
      checkUpdateTargetReference(expression.operand, state, environment);
    }
    inferExpression(expression.operand, state, environment);
    return expression.operator === Kind.ExclamationToken ? booleanType : numberType;
  }
  if (isPostfixUnaryExpression(expression)) {
    checkUpdateTargetReference(expression.operand, state, environment);
    inferExpression(expression.operand, state, environment);
    return numberType;
  }
  if (isSpreadElement(expression)) {
    const spreadType = inferExpression(expression.expression, state, environment);
    const iterationType = literalExpressionNarrowType(expression.expression) ?? spreadType;
    return checkIterationInputType(iterationType, state, "spread") ? unresolvedType : spreadType;
  }
  if (isAwaitExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    return anyType;
  }
  if (isYieldExpression(expression)) {
    const yieldedType = expression.expression === undefined ? undefinedType : inferExpression(expression.expression, state, environment);
    if (state.yieldType !== undefined && expression.asteriskToken === undefined) {
      checkAssignable(yieldedType, state.yieldType, state);
    }
    return anyType;
  }
  if (isAsExpression(expression) || isTypeAssertion(expression)) {
    return inferAssertionExpression(expression, state, environment);
  }
  if (isSatisfiesExpression(expression)) {
    const actualType = inferExpression(expression.expression, state, environment);
    const targetType = typeFromTypeNode(expression.type, environment, state);
    checkAssignable(actualType, targetType, state);
    return actualType;
  }
  if (isArrayLiteralExpression(expression)) {
    return inferArrayLiteral(expression.elements, state, environment);
  }
  if (isObjectLiteralExpression(expression)) {
    return inferObjectLiteral(expression, state, environment);
  }
  if (isClassExpression(expression)) {
    return inferClassExpression(expression, state, environment);
  }
  if (isConditionalExpression(expression)) {
    inferExpression(expression.condition, state, environment);
    diagnoseAlwaysFalsyExpression(expression.condition, state);
    const whenTrue = inferExpression(expression.whenTrue, state, environment);
    const whenFalse = inferExpression(expression.whenFalse, state, environment);
    if (whenTrue.kind === "any" || whenFalse.kind === "any") {
      return anyType;
    }
    if (whenTrue.kind === "unresolved" || whenFalse.kind === "unresolved") {
      return unresolvedType;
    }
    return isSameType(whenTrue, whenFalse) ? whenTrue : unionType([whenTrue, whenFalse]);
  }
  if (isArrowFunction(expression)) {
    return inferArrowFunction(expression, state, environment);
  }
  if (isFunctionExpression(expression)) {
    return inferFunctionExpression(expression, state, environment);
  }
  if (isBinaryExpression(expression)) {
    if (isAssignmentOperator(expression.operatorToken.kind)) {
      return inferAssignmentExpression(expression, state, environment);
    }
    const left = inferExpression(expression.left, state, environment);
    const right = inferExpression(expression.right, state, environment);
    if (expression.operatorToken.kind === Kind.CommaToken) {
      if (state.options.allowUnreachableCode !== true && isSideEffectFreeExpression(expression.left) && !isIndirectCallCommaExpression(expression)) {
        state.diagnostics.push(createDiagnostic(2695));
      }
      return right;
    }
    if (expression.operatorToken.kind === Kind.BarBarToken) {
      diagnoseAlwaysFalsyExpression(expression.left, state);
      return isAlwaysFalsyExpression(expression.left) ? right : unionType([left, right]);
    }
    if (expression.operatorToken.kind === Kind.AmpersandAmpersandToken) {
      diagnoseAlwaysFalsyExpression(expression.left, state);
      return isAlwaysFalsyExpression(expression.left) ? left : unionType([left, right]);
    }
    if (isComparisonOperator(expression.operatorToken.kind)) {
      return booleanType;
    }
    if (expression.operatorToken.kind === Kind.PlusToken) {
      return inferPlusExpressionType(left, right, state);
    }
    if (isNumericArithmeticOperator(expression.operatorToken.kind)) {
      checkArithmeticOperandType(left, state, 2362);
      checkArithmeticOperandType(right, state, 2363);
      return numberType;
    }
    return unresolvedType;
  }
  if (isPropertyAccessExpression(expression)) {
    return inferPropertyAccess(expression.expression, expression.questionDotToken !== undefined, expression.name.text, state, environment);
  }
  if (isElementAccessExpression(expression)) {
    const receiver = accessorReadType(inferExpression(expression.expression, state, environment));
    const argumentRuntimeType = inferExpression(expression.argumentExpression, state, environment);
    const argumentType = literalExpressionNarrowType(expression.argumentExpression) ?? argumentRuntimeType;
    const invalidIndexType = invalidElementAccessIndexType(argumentType);
    if (invalidIndexType !== undefined) {
      state.diagnostics.push(createDiagnostic(2538, displayType(invalidIndexType)));
    }
    if (receiver.kind === "array") {
      return receiver.elementType;
    }
    if (receiver.kind === "arrayLike" || receiver.kind === "readonlyArray") {
      return receiver.elementType;
    }
    if (receiver.kind === "interface") {
      if (isIArgumentsType(receiver) && isSymbolIteratorExpression(expression.argumentExpression)) {
        return { kind: "function", typeParameters: [], parameters: [], returnType: { kind: "arrayIterator", elementType: anyType } };
      }
      return interfaceElementAccessType(receiver.members, expression.argumentExpression);
    }
    if ((receiver.kind === "namespace" || receiver.kind === "moduleNamespace") && isStringLiteral(expression.argumentExpression)) {
      return receiver.exports.get(expression.argumentExpression.text) ?? unresolvedType;
    }
    if (receiver.kind === "tuple" || receiver.kind === "union") {
      return indexedAccessType(receiver, argumentType);
    }
    return unresolvedType;
  }
  if (isCallExpression(expression)) {
    if (isPropertyAccessExpression(expression.expression)) {
      const firstArgument = expression.arguments[0];
      if (expression.expression.name.text === "map" && firstArgument !== undefined && isArrowFunction(firstArgument)) {
        const receiverType = inferExpression(expression.expression.expression, state, environment);
        if (receiverType.kind === "array") {
          const callbackType = inferArrowFunction(firstArgument, state, environment, [receiverType.elementType, numberType, receiverType]);
          for (const argument of expression.arguments.slice(1)) {
            inferExpression(argument, state, environment);
          }
          return { kind: "array", elementType: callbackType.kind === "function" ? callbackType.returnType : anyType };
        }
      }
    }
    const functionExpressionCallee = callExpressionFunctionExpressionCallee(expression.expression);
    if (functionExpressionCallee !== undefined) {
      const argumentTypes = expression.arguments.map(argument => inferExpression(argument, state, environment));
      const calleeFunction = inferFunctionExpression(
        functionExpressionCallee,
        state,
        environment,
        contextualParameterTypesFromCallArguments(functionExpressionCallee.parameters, argumentTypes),
      );
      checkCallArguments(argumentTypes, calleeFunction, state);
      return calleeFunction.returnType.kind === "typePredicate" ? booleanType : calleeFunction.returnType;
    }
    const calleeType = inferExpression(expression.expression, state, environment);
    if (calleeType.kind === "intrinsicFunction") {
      return inferIntrinsicCall(expression, calleeType, state, environment);
    }
    const calleeFunction = callableFunctionType(calleeType);
    const contextualCalleeFunction = callContextFunctionType(calleeFunction);
    const argumentTypes = expression.arguments.map((argument, index) => inferExpressionWithContext(
      argument,
      state,
      environment,
      contextualCalleeFunction === undefined ? undefined : functionParameterTypeAt(contextualCalleeFunction, index),
    ));
    if (calleeType.kind === "any" || calleeType.kind === "unknown" || calleeType.kind === "unresolved") {
      return anyType;
    }
    if (calleeFunction !== undefined) {
      const typeArguments = expression.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [];
      checkCallTypeArgumentArity(calleeFunction, typeArguments.length, state);
      const callFunction = resolveCallFunctionType(calleeFunction, typeArguments, argumentTypes, state);
      const instantiatedFunction = instantiateFunctionTypeForCall(callFunction, typeArguments, argumentTypes);
      if (!callHasMatchingOverload(calleeFunction, typeArguments, argumentTypes, state.options)) {
        state.diagnostics.push(createDiagnostic(2769));
      } else {
        checkCallArguments(argumentTypes, instantiatedFunction, state);
      }
      return instantiatedFunction.returnType.kind === "typePredicate" ? booleanType : instantiatedFunction.returnType;
    }
    if (calleeType.kind === "accessorProperty") {
      state.diagnostics.push(createDiagnostic(6234));
      return anyType;
    }
    return unresolvedType;
  }
  if (isTaggedTemplateExpression(expression)) {
    const substitutionTypes = expression.template.kind === Kind.TemplateExpression
      ? expression.template.templateSpans.map(span => inferExpression(span.expression, state, environment))
      : [];
    const tagType = inferExpression(expression.tag, state, environment);
    if (tagType.kind === "any" || tagType.kind === "unknown" || tagType.kind === "unresolved") {
      return anyType;
    }
    const tagFunction = callableFunctionType(tagType);
    if (tagFunction !== undefined) {
      const typeArguments = expression.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [];
      checkCallTypeArgumentArity(tagFunction, typeArguments.length, state);
      const argumentTypes = [anyType, ...substitutionTypes];
      const callFunction = resolveCallFunctionType(tagFunction, typeArguments, argumentTypes, state);
      const instantiatedFunction = instantiateFunctionTypeForCall(callFunction, typeArguments, argumentTypes);
      if (!callHasMatchingOverload(tagFunction, typeArguments, argumentTypes, state.options)) {
        state.diagnostics.push(createDiagnostic(2769));
      } else {
        checkCallArguments(argumentTypes, instantiatedFunction, state);
      }
      return instantiatedFunction.returnType.kind === "typePredicate" ? booleanType : instantiatedFunction.returnType;
    }
    return unresolvedType;
  }
  if (isNewExpression(expression)) {
    const constructorType = inferExpression(expression.expression, state, environment);
    if (isAbstractConstructorType(constructorType)) {
      state.diagnostics.push(createDiagnostic(2511));
    }
    const explicitTypeArguments = expression.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [];
    const contextualConstructorType = constructorType.kind === "classConstructor" && explicitTypeArguments.length > 0
      ? instantiateClassConstructor(constructorType, explicitTypeArguments)
      : constructorType;
    const argumentTypes = (expression.arguments ?? []).map((argument, index) => inferExpressionWithContext(
      argument,
      state,
      environment,
      contextualConstructorType.kind === "classConstructor" ? contextualConstructorType.constructorParameters[index] : undefined,
    ));
    const instantiatedConstructorType = constructorType.kind === "classConstructor"
      ? instantiateClassConstructorForNew(constructorType, explicitTypeArguments, argumentTypes)
      : constructorType;
    if (constructorType.kind === "intrinsicConstructor" && constructorType.intrinsic === "Set") {
      return { kind: "set", elementType: expression.typeArguments?.[0] === undefined ? anyType : typeFromTypeNode(expression.typeArguments[0], environment, state) };
    }
    if (constructorType.kind === "builtinConstructor") {
      checkFixedCallArguments(argumentTypes, constructorType.constructorParameters, state);
      return constructorType.instanceType;
    }
    if (instantiatedConstructorType.kind === "classConstructor") {
      checkFixedCallArguments(argumentTypes, instantiatedConstructorType.constructorParameters, state);
      return {
        kind: "classInstance",
        name: instantiatedConstructorType.name,
        typeParameters: instantiatedConstructorType.typeParameters,
        typeArguments: instantiatedConstructorType.typeArguments,
        members: instantiatedConstructorType.members,
        ...optionalArrayBaseElementType(instantiatedConstructorType.arrayBaseElementType),
      };
    }
    return anyType;
  }
  return unresolvedType;
}

function callExpressionFunctionExpressionCallee(expression: Expression): FunctionExpression | undefined {
  if (isParenthesizedExpression(expression)) {
    return callExpressionFunctionExpressionCallee(expression.expression);
  }
  return isFunctionExpression(expression) ? expression : undefined;
}

function contextualParameterTypesFromCallArguments(parameters: readonly ParameterDeclaration[], argumentTypes: readonly CheckedType[]): readonly CheckedType[] {
  const contextualParameterTypes: CheckedType[] = [];
  const restIndex = parameters.findIndex(parameter => parameter.dotDotDotToken !== undefined);
  const fixedParameterCount = restIndex === -1 ? parameters.length : restIndex;
  for (let index = 0; index < fixedParameterCount; index += 1) {
    const argumentType = argumentTypes[index];
    if (argumentType !== undefined) {
      contextualParameterTypes[index] = argumentType;
    }
  }
  if (restIndex !== -1) {
    const restTypes = argumentTypes.slice(restIndex);
    contextualParameterTypes[restIndex] = restTypes.length === 0 ? { kind: "array", elementType: anyType } : { kind: "array", elementType: unionType(restTypes) };
  }
  return contextualParameterTypes;
}

function inferJSDocAnnotatedExpression(expression: Expression, state: CheckState, environment: TypeEnvironment): void {
  if (isParenthesizedExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    return;
  }
  if (isAsExpression(expression) || isTypeAssertion(expression) || isSatisfiesExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    return;
  }
}

function inferExpressionWithContext(expression: Expression, state: CheckState, environment: TypeEnvironment, contextualType: CheckedType | undefined): CheckedType {
  const contextualFunction = callableFunctionType(contextualType);
  if (isArrowFunction(expression) && contextualFunction !== undefined) {
    return inferArrowFunction(expression, state, environment, contextualFunction.parameters, contextualFunction.returnType);
  }
  if (isFunctionExpression(expression) && contextualFunction !== undefined) {
    return inferFunctionExpression(expression, state, environment, contextualFunction.parameters, contextualFunction.returnType);
  }
  if (isObjectLiteralExpression(expression) && contextualType !== undefined) {
    return inferObjectLiteral(expression, state, environment, contextualType);
  }
  if (isArrayLiteralExpression(expression)) {
    const contextualTuple = contextualTupleType(contextualType);
    if (contextualTuple !== undefined) {
      return inferTupleLiteral(expression.elements, state, environment, contextualTuple);
    }
    const contextualElementType = contextualArrayElementType(contextualType);
    if (contextualElementType !== undefined) {
      return inferArrayLiteral(expression.elements, state, environment, contextualElementType, contextualType);
    }
  }
  const narrowLiteral = literalExpressionNarrowType(expression);
  if (narrowLiteral !== undefined && contextualType !== undefined && isAssignableTo(narrowLiteral, contextualType, state.options)) {
    inferExpression(expression, state, environment);
    return contextualPrimitiveTypeForLiteral(narrowLiteral, contextualType) ?? narrowLiteral;
  }
  return inferExpression(expression, state, environment);
}

function contextualPrimitiveTypeForLiteral(literalType: CheckedType, contextualType: CheckedType): CheckedType | undefined {
  if (contextualType.kind === "typeAliasInstance") {
    return contextualPrimitiveTypeForLiteral(literalType, contextualType.target);
  }
  if (contextualType.kind === "number" && literalType.kind === "numberLiteral") {
    return numberType;
  }
  if (contextualType.kind === "string" && literalType.kind === "stringLiteral") {
    return stringType;
  }
  if (contextualType.kind === "boolean" && literalType.kind === "booleanLiteral") {
    return booleanType;
  }
  return undefined;
}

function inferIntrinsicCall(expression: Extract<Expression, { readonly kind: Kind.CallExpression }>, calleeType: Extract<CheckedType, { readonly kind: "intrinsicFunction" }>, state: CheckState, environment: TypeEnvironment): CheckedType {
  if (calleeType.intrinsic === "Array.from") {
    return inferArrayFromCall(expression, state, environment);
  }
  if (calleeType.intrinsic === "Array.isArray") {
    for (const argument of expression.arguments) {
      inferExpression(argument, state, environment);
    }
    return booleanType;
  }
  if (calleeType.intrinsic === "ArrayBuffer.isView") {
    for (const argument of expression.arguments) {
      inferExpression(argument, state, environment);
    }
    return booleanType;
  }
  return anyType;
}

function contextualTupleType(contextualType: CheckedType | undefined): Extract<CheckedType, { readonly kind: "tuple" }> | undefined {
  if (contextualType === undefined) {
    return undefined;
  }
  if (contextualType.kind === "typeAliasInstance") {
    return contextualTupleType(contextualType.target);
  }
  return contextualType.kind === "tuple" ? contextualType : undefined;
}

function inferArrayFromCall(expression: Extract<Expression, { readonly kind: Kind.CallExpression }>, state: CheckState, environment: TypeEnvironment): CheckedType {
  const sourceArgument = expression.arguments[0];
  if (sourceArgument === undefined) {
    return { kind: "array", elementType: anyType };
  }
  const sourceType = inferExpression(sourceArgument, state, environment);
  const sourceElementType = collectionElementType(sourceType);
  const mapperArgument = expression.arguments[1];
  if (mapperArgument === undefined) {
    return { kind: "array", elementType: sourceElementType };
  }
  const mapperType = inferExpressionWithContext(mapperArgument, state, environment, {
    kind: "function",
    typeParameters: [],
    parameters: [sourceElementType, numberType],
    returnType: anyType,
  });
  for (const argument of expression.arguments.slice(2)) {
    inferExpression(argument, state, environment);
  }
  const mappedElementType = mapperType.kind === "function"
    ? (mapperType.returnType.kind === "typePredicate" ? booleanType : mapperType.returnType)
    : anyType;
  return { kind: "array", elementType: mappedElementType };
}

function collectionElementType(type: CheckedType): CheckedType {
  if (type.kind === "unassignedVariable") {
    return collectionElementType(type.type);
  }
  if (type.kind === "array" || type.kind === "readonlyArray" || type.kind === "arrayLike" || type.kind === "arrayIterator" || type.kind === "iterable" || type.kind === "set") {
    return type.elementType;
  }
  if (type.kind === "union") {
    return unionType(type.types.map(collectionElementType));
  }
  if (type.kind === "any" || type.kind === "unknown" || type.kind === "unresolved") {
    return anyType;
  }
  return anyType;
}

function callableFunctionType(type: CheckedType | undefined): CheckedFunctionType | undefined {
  if (type === undefined) {
    return undefined;
  }
  if (type.kind === "function") {
    return type;
  }
  if (type.kind === "functionDeclaration") {
    return type.type;
  }
  if (type.kind === "object" && type.callSignatures !== undefined) {
    return callableFromCallSignatures(type.callSignatures);
  }
  if (type.kind === "interface") {
    return callableFromCallSignatures(type.members.callSignatures);
  }
  if (type.kind === "typeAliasInstance") {
    return callableFunctionType(type.target);
  }
  if (type.kind === "valueAndType") {
    return callableFunctionType(type.value);
  }
  if (type.kind === "valueOnly") {
    return callableFunctionType(type.type);
  }
  if (type.kind === "nonNullable") {
    return callableFunctionType(nonNullableType(type.target));
  }
  return undefined;
}

function callableFromCallSignatures(signatures: readonly CheckedFunctionType[]): CheckedFunctionType | undefined {
  const callSignatures = signatures.filter(signature => signature.construct !== true);
  const [first, ...overloads] = callSignatures;
  if (first === undefined) {
    return undefined;
  }
  return overloads.length === 0 ? first : { ...first, overloads: callSignatures };
}

function callContextFunctionType(functionType: CheckedFunctionType | undefined): CheckedFunctionType | undefined {
  return functionType?.overloads?.[0] ?? functionType;
}

function resolveCallFunctionType(functionType: CheckedFunctionType, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[], state: CheckState): CheckedFunctionType {
  if (functionType.overloads === undefined || functionType.overloads.length === 0) {
    return functionType;
  }
  for (const overload of functionType.overloads) {
    const instantiatedOverload = instantiateFunctionTypeForCall(overload, explicitTypeArguments, argumentTypes);
    if (callArgumentsAssignable(argumentTypes, instantiatedOverload, state.options)) {
      return overload;
    }
  }
  return functionType.overloads[0]!;
}

function callHasMatchingOverload(functionType: CheckedFunctionType, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[], options: CompilerOptions): boolean {
  if (functionType.overloads === undefined || functionType.overloads.length === 0) {
    return true;
  }
  return functionType.overloads.some(overload => callArgumentsAssignable(argumentTypes, instantiateFunctionTypeForCall(overload, explicitTypeArguments, argumentTypes), options));
}

function switchClauseEnvironment(
  expression: Expression,
  clauses: Extract<Statement, { readonly kind: Kind.SwitchStatement }>["caseBlock"]["clauses"],
  clauseIndex: number,
  state: CheckState,
  environment: TypeEnvironment,
): TypeEnvironment {
  const narrowed = cloneTypeEnvironment(environment);
  const clause = clauses[clauseIndex]!;
  if (!isIdentifier(expression)) {
    return narrowed;
  }
  const switchType = environment.get(expression.text);
  const caseTypes = precedingSwitchCaseTypes(clauses, clauseIndex, environment);
  if (clause.kind === Kind.CaseClause) {
    const caseType = switchCaseExpressionType(clause.expression, environment);
    if (caseType !== undefined && switchType !== undefined) {
      narrowed.set(expression.text, narrowType(switchType, caseType, state.options));
    }
    if (caseType !== undefined) {
      applyCorrelatedSwitchNarrowing(expression.text, caseType, undefined, state.options, environment, narrowed);
    }
    return narrowed;
  }
  if (caseTypes.length > 0 && switchType !== undefined) {
    narrowed.set(expression.text, excludeTypes(switchType, caseTypes, state.options));
  }
  if (caseTypes.length > 0) {
    applyCorrelatedSwitchNarrowing(expression.text, undefined, caseTypes, state.options, environment, narrowed);
  }
  return narrowed;
}

function precedingSwitchCaseTypes(
  clauses: Extract<Statement, { readonly kind: Kind.SwitchStatement }>["caseBlock"]["clauses"],
  clauseIndex: number,
  environment: TypeEnvironment,
): readonly CheckedType[] {
  const types: CheckedType[] = [];
  for (let index = 0; index < clauseIndex; index += 1) {
    const current = clauses[index]!;
    if (current.kind === Kind.CaseClause) {
      const type = switchCaseExpressionType(current.expression, environment);
      if (type !== undefined) {
        types.push(type);
      }
    }
  }
  return types;
}

function switchCaseExpressionType(expression: Expression, environment: TypeEnvironment): CheckedType | undefined {
  return literalExpressionNarrowType(expression) ?? expressionFlowType(expression, environment);
}

function applyCorrelatedSwitchNarrowing(
  switchBindingName: string,
  caseType: CheckedType | undefined,
  excludedTypes: readonly CheckedType[] | undefined,
  options: CompilerOptions,
  source: TypeEnvironment,
  target: TypeEnvironment,
): void {
  for (const correlation of environmentCorrelations.get(source) ?? []) {
    const discriminantProperty = correlation.bindings.get(switchBindingName);
    if (discriminantProperty === undefined) {
      continue;
    }
    const narrowedSourceType = caseType !== undefined
      ? narrowTypeByDiscriminantProperty(correlation.sourceType, discriminantProperty, caseType, options)
      : excludeTypesByDiscriminantProperty(correlation.sourceType, discriminantProperty, excludedTypes ?? [], options);
    for (const [bindingName, propertyName] of correlation.bindings.entries()) {
      target.set(bindingName, correlatedBindingPropertyType(narrowedSourceType, propertyName));
    }
  }
}

function correlatedBindingPropertyType(sourceType: CheckedType, propertyName: string): CheckedType {
  if (sourceType.kind === "never") {
    return neverType;
  }
  return propertyAccessType(sourceType, propertyName) ?? anyType;
}

function excludeTypes(current: CheckedType, excludedTypes: readonly CheckedType[], options: CompilerOptions): CheckedType {
  if (current.kind === "unassignedVariable") {
    return excludeTypes(current.type, excludedTypes, options);
  }
  if (current.kind === "valueAndType") {
    return { ...current, value: excludeTypes(current.value, excludedTypes, options) };
  }
  if (current.kind === "typeAliasInstance") {
    return { ...current, target: excludeTypes(current.target, excludedTypes, options) };
  }
  if (current.kind !== "union") {
    return excludedTypes.some(excluded => typesSufficientlyOverlap(current, excluded, options)) ? neverType : current;
  }
  const remaining = current.types.filter(type => !excludedTypes.some(excluded => typesSufficientlyOverlap(type, excluded, options)));
  return remaining.length === 0 ? neverType : unionType(remaining.map(type => excludeTypes(type, excludedTypes, options)));
}

function excludeTypesByDiscriminantProperty(current: CheckedType, propertyName: string, excludedTypes: readonly CheckedType[], options: CompilerOptions): CheckedType {
  if (current.kind === "unassignedVariable") {
    return excludeTypesByDiscriminantProperty(current.type, propertyName, excludedTypes, options);
  }
  if (current.kind === "valueAndType") {
    return { ...current, value: excludeTypesByDiscriminantProperty(current.value, propertyName, excludedTypes, options) };
  }
  if (current.kind === "typeAliasInstance") {
    return { ...current, target: excludeTypesByDiscriminantProperty(current.target, propertyName, excludedTypes, options) };
  }
  if (current.kind === "nonNullable") {
    return excludeTypesByDiscriminantProperty(nonNullableType(current.target), propertyName, excludedTypes, options);
  }
  if (current.kind !== "union") {
    const propertyType = propertyAccessType(current, propertyName);
    return propertyType !== undefined && excludedTypes.some(excluded => typesSufficientlyOverlap(propertyType, excluded, options)) ? neverType : current;
  }
  const remaining = current.types.filter(member => {
    if (member.kind === "null" || member.kind === "undefined") {
      return false;
    }
    const propertyType = propertyAccessType(member, propertyName);
    return propertyType !== undefined && !excludedTypes.some(excluded => typesSufficientlyOverlap(propertyType, excluded, options));
  });
  return remaining.length === 0 ? neverType : unionType(remaining);
}

function narrowedEnvironmentForCondition(expression: Expression, state: CheckState, environment: TypeEnvironment): TypeEnvironment {
  const narrowed = cloneTypeEnvironment(environment);
  applyConditionNarrowing(expression, state, environment, narrowed);
  return narrowed;
}

function applyConditionNarrowing(expression: Expression, state: CheckState, source: TypeEnvironment, target: TypeEnvironment): void {
  if (isParenthesizedExpression(expression)) {
    applyConditionNarrowing(expression.expression, state, source, target);
    return;
  }
  if (isBinaryExpression(expression) && expression.operatorToken.kind === Kind.AmpersandAmpersandToken) {
    applyConditionNarrowing(expression.left, state, source, target);
    applyConditionNarrowing(expression.right, state, target, target);
    return;
  }
  if (!isCallExpression(expression)) {
    return;
  }
  applyDirectPredicateCallNarrowing(expression, state, source, target);
  applyArrayEveryPredicateNarrowing(expression, state, source, target);
}

function applyDirectPredicateCallNarrowing(expression: Extract<Expression, { readonly kind: Kind.CallExpression }>, state: CheckState, source: TypeEnvironment, target: TypeEnvironment): void {
  const predicate = predicateFromCallExpression(expression, source);
  if (predicate?.parameterIndex === undefined) {
    return;
  }
  const argument = expression.arguments[predicate.parameterIndex];
  if (argument !== undefined) {
    narrowExpressionBinding(argument, predicate.assertedType, state.options, source, target);
  }
}

function applyAssertionCallNarrowing(expression: Expression, state: CheckState, environment: TypeEnvironment): void {
  if (!isCallExpression(expression)) {
    return;
  }
  const predicate = predicateFromCallExpression(expression, environment);
  if (predicate?.asserts !== true || predicate.parameterIndex === undefined) {
    return;
  }
  const argument = expression.arguments[predicate.parameterIndex];
  if (argument !== undefined) {
    narrowExpressionBinding(argument, predicate.assertedType, state.options, environment, environment);
  }
}

function applyArrayEveryPredicateNarrowing(expression: Extract<Expression, { readonly kind: Kind.CallExpression }>, state: CheckState, source: TypeEnvironment, target: TypeEnvironment): void {
  if (!isPropertyAccessExpression(expression.expression) || expression.expression.name.text !== "every") {
    return;
  }
  const receiver = expression.expression.expression;
  const receiverType = expressionFlowType(receiver, source);
  if (receiverType?.kind !== "array") {
    return;
  }
  const callbackType = expression.arguments[0] === undefined ? undefined : expressionFlowType(expression.arguments[0], source);
  if (callbackType?.kind !== "function" || callbackType.returnType.kind !== "typePredicate") {
    return;
  }
  narrowExpressionBinding(receiver, { kind: "array", elementType: callbackType.returnType.assertedType }, state.options, source, target);
}

function predicateFromCallExpression(expression: Extract<Expression, { readonly kind: Kind.CallExpression }>, environment: TypeEnvironment): Extract<CheckedType, { readonly kind: "typePredicate" }> | undefined {
  const calleeType = expressionFlowType(expression.expression, environment);
  const calleeFunction = callableFunctionType(calleeType);
  if (calleeFunction !== undefined) {
    const argumentTypes = expression.arguments.map(argument => expressionFlowType(argument, environment) ?? anyType);
    const returnType = instantiateFunctionReturnType(calleeFunction, [], argumentTypes);
    return returnType.kind === "typePredicate" ? returnType : undefined;
  }
  if (calleeType?.kind === "intrinsicFunction" && calleeType.intrinsic === "ArrayBuffer.isView") {
    return { kind: "typePredicate", parameterName: "arg0", parameterIndex: 0, assertedType: anyType, asserts: false };
  }
  if (calleeType?.kind === "intrinsicFunction" && calleeType.intrinsic === "Array.isArray") {
    return { kind: "typePredicate", parameterName: "arg0", parameterIndex: 0, assertedType: { kind: "array", elementType: anyType }, asserts: false };
  }
  return undefined;
}

function narrowExpressionBinding(expression: Expression, assertedType: CheckedType, options: CompilerOptions, source: TypeEnvironment, target: TypeEnvironment): void {
  if (isParenthesizedExpression(expression)) {
    narrowExpressionBinding(expression.expression, assertedType, options, source, target);
    return;
  }
  if (isPropertyAccessExpression(expression) && isIdentifier(expression.expression)) {
    const current = source.get(expression.expression.text);
    if (current !== undefined) {
      target.set(expression.expression.text, narrowTypeByDiscriminantProperty(current, expression.name.text, assertedType, options));
    }
    return;
  }
  if (!isIdentifier(expression)) {
    return;
  }
  const current = source.get(expression.text);
  if (current !== undefined) {
    target.set(expression.text, narrowType(current, assertedType, options));
  }
}

function narrowTypeByDiscriminantProperty(current: CheckedType, propertyName: string, assertedType: CheckedType, options: CompilerOptions): CheckedType {
  if (current.kind === "unassignedVariable") {
    return narrowTypeByDiscriminantProperty(current.type, propertyName, assertedType, options);
  }
  if (current.kind === "valueAndType") {
    return { ...current, value: narrowTypeByDiscriminantProperty(current.value, propertyName, assertedType, options) };
  }
  if (current.kind === "typeAliasInstance") {
    return { ...current, target: narrowTypeByDiscriminantProperty(current.target, propertyName, assertedType, options) };
  }
  if (current.kind === "nonNullable") {
    return narrowTypeByDiscriminantProperty(nonNullableType(current.target), propertyName, assertedType, options);
  }
  if (current.kind !== "union") {
    return current;
  }
  const narrowedMembers = current.types.filter(member => {
    if (member.kind === "null" || member.kind === "undefined") {
      return false;
    }
    const propertyType = propertyAccessType(member, propertyName);
    return propertyType !== undefined && typesSufficientlyOverlap(propertyType, assertedType, options);
  });
  return narrowedMembers.length === 0 ? current : unionType(narrowedMembers);
}

function narrowType(current: CheckedType, assertedType: CheckedType, options: CompilerOptions): CheckedType {
  if (current.kind === "unassignedVariable") {
    return narrowType(current.type, assertedType, options);
  }
  if (current.kind === "valueAndType") {
    return { ...current, value: narrowType(current.value, assertedType, options) };
  }
  if (current.kind === "typeAliasInstance") {
    return { ...current, target: narrowType(current.target, assertedType, options) };
  }
  if (current.kind === "nonNullable") {
    return narrowType(nonNullableType(current.target), assertedType, options);
  }
  if (assertedType.kind === "nonNullable") {
    return narrowType(current, nonNullableType(assertedType.target), options);
  }
  if (current.kind === "array" && assertedType.kind === "array") {
    return { kind: "array", elementType: narrowType(current.elementType, assertedType.elementType, options) };
  }
  if (current.kind === "union") {
    const narrowedMembers = current.types.filter(type => typesSufficientlyOverlap(type, assertedType, options));
    return narrowedMembers.length === 0 ? current : unionType(narrowedMembers.map(type => narrowType(type, assertedType, options)));
  }
  if (current.kind === "any" || current.kind === "unknown" || current.kind === "unresolved") {
    return assertedType;
  }
  if (isAssignableTo(assertedType, current, options)) {
    return assertedType;
  }
  if (isAssignableTo(current, assertedType)) {
    return current;
  }
  return current;
}

function expressionFlowType(expression: Expression, environment: TypeEnvironment): CheckedType | undefined {
  if (isParenthesizedExpression(expression)) {
    return expressionFlowType(expression.expression, environment);
  }
  if (isAsExpression(expression) || isTypeAssertion(expression)) {
    if (isConstTypeReference(expression.type)) {
      return constAssertionFlowType(expression.expression, environment);
    }
    return typeFromTypeNode(expression.type, environment);
  }
  if (isSatisfiesExpression(expression)) {
    return expressionFlowType(expression.expression, environment);
  }
  if (isIdentifier(expression)) {
    const bound = environment.get(expression.text);
    if (bound?.kind === "valueAndType") {
      return bound.value;
    }
    if (bound?.kind === "namespaceAndType") {
      return namespaceValueMeaning(bound.namespace) ?? bound.namespace;
    }
    return bound;
  }
  if (isPropertyAccessExpression(expression)) {
    const receiverType = expressionFlowType(expression.expression, environment);
    if (receiverType === undefined) {
      return undefined;
    }
    if (expression.questionDotToken !== undefined) {
      const propertyType = propertyAccessType(nonNullableType(receiverType), expression.name.text, environment);
      return propertyType === undefined ? undefined : unionType([propertyType, undefinedType]);
    }
    return propertyAccessType(receiverType, expression.name.text, environment);
  }
  if (isCallExpression(expression)) {
    const calleeType = expressionFlowType(expression.expression, environment);
    if (calleeType?.kind === "intrinsicFunction" && calleeType.intrinsic === "Array.from") {
      const sourceType = expression.arguments[0] === undefined ? anyType : expressionFlowType(expression.arguments[0], environment) ?? anyType;
      return { kind: "array", elementType: collectionElementType(sourceType) };
    }
    const calleeFunction = callableFunctionType(calleeType);
    if (calleeFunction !== undefined) {
      const argumentTypes = expression.arguments.map(argument => expressionFlowType(argument, environment) ?? anyType);
      const returnType = instantiateFunctionReturnType(calleeFunction, [], argumentTypes);
      return returnType.kind === "typePredicate" ? booleanType : returnType;
    }
  }
  if (isTaggedTemplateExpression(expression)) {
    const tagType = expressionFlowType(expression.tag, environment);
    const tagFunction = callableFunctionType(tagType);
    if (tagFunction !== undefined) {
      const substitutionTypes = expression.template.kind === Kind.TemplateExpression
        ? expression.template.templateSpans.map(span => expressionFlowType(span.expression, environment) ?? anyType)
        : [];
      const returnType = instantiateFunctionReturnType(tagFunction, [], [anyType, ...substitutionTypes]);
      return returnType.kind === "typePredicate" ? booleanType : returnType;
    }
  }
  return undefined;
}

function diagnoseAlwaysFalsyExpression(expression: Expression, state: CheckState): void {
  if (isAlwaysFalsyExpression(expression)) {
    state.diagnostics.push(createDiagnostic(2873));
  }
}

function isAlwaysFalsyExpression(expression: Expression): boolean {
  if (isParenthesizedExpression(expression)) {
    return isAlwaysFalsyExpression(expression.expression);
  }
  if (isAsExpression(expression) || isTypeAssertion(expression) || isSatisfiesExpression(expression)) {
    return isAlwaysFalsyExpression(expression.expression);
  }
  return isKeywordExpression(expression) && expression.kind === Kind.NullKeyword;
}

function inferAssertionExpression(expression: AssertionExpression, state: CheckState, environment: TypeEnvironment): CheckedType {
  const actualType = inferExpression(expression.expression, state, environment);
  if (isConstTypeReference(expression.type)) {
    return constAssertionType(expression.expression, actualType, state, environment);
  }
  const targetType = typeFromTypeNode(expression.type, environment, state);
  checkAssertionComparable(actualType, targetType, state);
  return targetType;
}

function isConstTypeReference(type: TypeNode): boolean {
  return isTypeReferenceNode(type)
    && type.typeArguments === undefined
    && isIdentifier(type.typeName)
    && type.typeName.text === "const";
}

function constAssertionType(expression: Expression, actualType: CheckedType, state: CheckState, environment: TypeEnvironment): CheckedType {
  if (isParenthesizedExpression(expression)) {
    return constAssertionType(expression.expression, actualType, state, environment);
  }
  if (isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression)) {
    return { kind: "stringLiteral", value: expression.text };
  }
  if (isNumericLiteral(expression)) {
    return { kind: "numberLiteral", value: expression.text };
  }
  if (isKeywordExpression(expression) && (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword)) {
    return { kind: "booleanLiteral", value: expression.kind === Kind.TrueKeyword };
  }
  if (isArrayLiteralExpression(expression)) {
    return {
      kind: "tuple",
      elements: expression.elements.map(element => ({
        type: constAssertionType(element, inferExpression(element, state, environment), state, environment),
        optional: false,
      })),
    };
  }
  if (isObjectLiteralExpression(expression)) {
    const properties = new Map<string, CheckedType>();
    for (const property of expression.properties) {
      if (isPropertyAssignment(property)) {
        const name = propertyNameText(property.name);
        if (name !== undefined) {
          properties.set(name, constAssertionType(property.initializer, inferExpression(property.initializer, state, environment), state, environment));
        }
      } else if (isShorthandPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.set(property.name.text, environment.get(property.name.text) ?? anyType);
      }
    }
    return { kind: "object", properties, readonlyProperties: new Set(properties.keys()), optionalProperties: new Set(), methodProperties: new Set() };
  }
  if (isValidConstAssertionExpression(expression)) {
    return actualType;
  }
  state.diagnostics.push(createDiagnostic(1355));
  return actualType;
}

function isValidConstAssertionExpression(expression: Expression): boolean {
  if (isParenthesizedExpression(expression)) {
    return isValidConstAssertionExpression(expression.expression);
  }
  return isStringLiteral(expression)
    || isNoSubstitutionTemplateLiteral(expression)
    || isNumericLiteral(expression)
    || isArrayLiteralExpression(expression)
    || isObjectLiteralExpression(expression)
    || isPropertyAccessExpression(expression)
    || (isElementAccessExpression(expression) && isStringLiteral(expression.argumentExpression))
    || (isKeywordExpression(expression) && (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword));
}

function constAssertionFlowType(expression: Expression, environment: TypeEnvironment): CheckedType | undefined {
  if (isParenthesizedExpression(expression)) {
    return constAssertionFlowType(expression.expression, environment);
  }
  if (isStringLiteral(expression) || isNoSubstitutionTemplateLiteral(expression)) {
    return { kind: "stringLiteral", value: expression.text };
  }
  if (isNumericLiteral(expression)) {
    return { kind: "numberLiteral", value: expression.text };
  }
  if (isKeywordExpression(expression) && (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword)) {
    return { kind: "booleanLiteral", value: expression.kind === Kind.TrueKeyword };
  }
  if (isArrayLiteralExpression(expression)) {
    return {
      kind: "tuple",
      elements: expression.elements.map(element => ({
        type: constAssertionFlowType(element, environment) ?? anyType,
        optional: false,
      })),
    };
  }
  if (isObjectLiteralExpression(expression)) {
    const properties = new Map<string, CheckedType>();
    for (const property of expression.properties) {
      if (isPropertyAssignment(property)) {
        const name = propertyNameText(property.name);
        if (name !== undefined) {
          properties.set(name, constAssertionFlowType(property.initializer, environment) ?? anyType);
        }
      } else if (isShorthandPropertyAssignment(property) && isIdentifier(property.name)) {
        properties.set(property.name.text, environment.get(property.name.text) ?? anyType);
      }
    }
    return { kind: "object", properties, readonlyProperties: new Set(properties.keys()), optionalProperties: new Set(), methodProperties: new Set() };
  }
  return expressionFlowType(expression, environment);
}

function inferAssignmentExpression(expression: Extract<Expression, { readonly kind: Kind.BinaryExpression }>, state: CheckState, environment: TypeEnvironment): CheckedType {
  const operator = expression.operatorToken.kind;
  const targetWasRead = assignmentOperatorReadsTarget(operator);
  if (targetWasRead) {
    inferExpression(expression.left, state, environment);
  }
  checkAssignmentTargetReference(expression.left, state, environment, !targetWasRead);
  const targetType = assignmentTargetType(expression.left, environment);
  const right = inferExpressionWithContext(expression.right, state, environment, targetType);
  diagnoseAbstractThisDestructuring(expression.left, expression.right, state, environment);
  if (assignmentOperatorDefinitelyAssignsTarget(operator)) {
    assignExpressionTarget(expression.left, right, state, environment);
  }
  return right;
}

function isSideEffectFreeExpression(expression: Expression): boolean {
  const unwrapped = skipParenthesizedExpression(expression);
  switch (unwrapped.kind) {
    case Kind.Identifier:
    case Kind.StringLiteral:
    case Kind.RegularExpressionLiteral:
    case Kind.TaggedTemplateExpression:
    case Kind.TemplateExpression:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
    case Kind.FunctionExpression:
    case Kind.ClassExpression:
    case Kind.ArrowFunction:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.TypeOfExpression:
    case Kind.NonNullExpression:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxElement:
      return true;
    case Kind.ConditionalExpression:
      return isSideEffectFreeExpression(unwrapped.whenTrue) && isSideEffectFreeExpression(unwrapped.whenFalse);
    case Kind.BinaryExpression:
      return !isAssignmentOperator(unwrapped.operatorToken.kind)
        && isSideEffectFreeExpression(unwrapped.left)
        && isSideEffectFreeExpression(unwrapped.right);
    case Kind.PrefixUnaryExpression:
      return unwrapped.operator === Kind.ExclamationToken
        || unwrapped.operator === Kind.PlusToken
        || unwrapped.operator === Kind.MinusToken
        || unwrapped.operator === Kind.TildeToken;
    case Kind.PostfixUnaryExpression:
      return false;
    default:
      return false;
  }
}

function skipParenthesizedExpression(expression: Expression): Expression {
  let current = expression;
  while (isParenthesizedExpression(current)) {
    current = current.expression;
  }
  return current;
}

function isIndirectCallCommaExpression(expression: Extract<Expression, { readonly kind: Kind.BinaryExpression }>): boolean {
  const parent = expression.parent;
  if (parent === undefined || !isParenthesizedExpression(parent)) {
    return false;
  }
  const grandParent = parent.parent;
  if (grandParent === undefined) {
    return false;
  }
  return isNumericLiteral(expression.left)
    && expression.left.text === "0"
    && (
      isCallExpression(grandParent) && grandParent.expression === parent
      || isTaggedTemplateExpression(grandParent)
    )
    && (isPropertyAccessExpression(expression.right) || isElementAccessExpression(expression.right) || isIdentifier(expression.right) && expression.right.text === "eval");
}

function assignmentTargetType(expression: Expression, environment: TypeEnvironment): CheckedType | undefined {
  if (isIdentifier(expression)) {
    const target = environment.get(expression.text);
    if (target?.kind === "functionDeclaration" || target !== undefined && isReadonlyEnvironmentBinding(environment, expression.text)) {
      return undefined;
    }
    return target?.kind === "unassignedVariable" ? target.type : target;
  }
  if (isParenthesizedExpression(expression)) {
    return assignmentTargetType(expression.expression, environment);
  }
  if (isPropertyAccessExpression(expression)) {
    const receiverType = inferExpression(expression.expression, emptyCheckState(), environment);
    return propertyAssignmentTargetType(receiverType, expression.name.text, environment);
  }
  return undefined;
}

function checkAssignmentTargetReference(expression: Expression, state: CheckState, environment: TypeEnvironment, diagnoseMissingProperty = true): void {
  if (isIdentifier(expression)) {
    checkIdentifierWriteTarget(expression, state, environment);
    return;
  }
  if (isParenthesizedExpression(expression)) {
    checkAssignmentTargetReference(expression.expression, state, environment, diagnoseMissingProperty);
    return;
  }
  if (isNonNullExpression(expression) || isAsExpression(expression) || isTypeAssertion(expression) || isSatisfiesExpression(expression)) {
    checkAssignmentTargetReference(expression.expression, state, environment, diagnoseMissingProperty);
    return;
  }
  if (isPropertyAccessExpression(expression)) {
    checkPropertyAssignmentTarget(expression.expression, expression.name.text, state, environment, diagnoseMissingProperty);
    return;
  }
  if (isElementAccessExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    inferExpression(expression.argumentExpression, state, environment);
    return;
  }
  if (isObjectLiteralExpression(expression) || isArrayLiteralExpression(expression)) {
    inferExpression(expression, state, environment);
    return;
  }
  inferExpression(expression, state, environment);
  state.diagnostics.push(createDiagnostic(2364));
}

function checkUpdateTargetReference(expression: Expression, state: CheckState, environment: TypeEnvironment): void {
  if (isIdentifier(expression)) {
    checkIdentifierWriteTarget(expression, state, environment);
    return;
  }
  if (isParenthesizedExpression(expression)) {
    checkUpdateTargetReference(expression.expression, state, environment);
    return;
  }
  if (isNonNullExpression(expression) || isAsExpression(expression) || isTypeAssertion(expression) || isSatisfiesExpression(expression)) {
    checkUpdateTargetReference(expression.expression, state, environment);
    return;
  }
  if (isPropertyAccessExpression(expression)) {
    checkPropertyAssignmentTarget(expression.expression, expression.name.text, state, environment, true);
    return;
  }
  if (isElementAccessExpression(expression)) {
    return;
  }
  state.diagnostics.push(createDiagnostic(2357));
}

function checkIdentifierWriteTarget(expression: Identifier, state: CheckState, environment: TypeEnvironment): void {
  checkStrictModeIdentifier(expression.text, state, false);
  const target = environment.get(expression.text);
  if (target !== undefined && isReadonlyEnvironmentBinding(environment, expression.text)) {
    state.diagnostics.push(createDiagnostic(2588, expression.text));
  }
  if (target?.kind === "functionDeclaration") {
    state.diagnostics.push(createDiagnostic(2630, expression.text));
  }
  if (isClassValue(target)) {
    state.diagnostics.push(createDiagnostic(2629, expression.text));
  }
  if (isEnumValue(target)) {
    state.diagnostics.push(createDiagnostic(2628, expression.text));
  }
  if (isPlainNamespace(target)) {
    state.diagnostics.push(createDiagnostic(2708, expression.text));
  }
}

function isClassValue(type: CheckedType | undefined): boolean {
  if (type?.kind === "classConstructor") {
    return true;
  }
  if (type?.kind === "valueAndType") {
    return isClassValue(type.value);
  }
  return false;
}

function isEnumValue(type: CheckedType | undefined): boolean {
  if (type?.kind === "namespace") {
    return type.enumLike === true;
  }
  if (type?.kind === "namespaceAndType") {
    return isEnumValue(type.namespace);
  }
  return false;
}

function isPlainNamespace(type: CheckedType | undefined): boolean {
  return type?.kind === "namespace" && type.enumLike !== true;
}

function checkPropertyAssignmentTarget(expression: Expression, propertyName: string, state: CheckState, environment: TypeEnvironment, diagnoseMissingProperty: boolean): void {
  const receiverType = inferExpression(expression, state, environment);
  const targetType = propertyAssignmentTargetType(receiverType, propertyName, environment);
  if (receiverType.kind === "namespace" && receiverType.enumLike === true && receiverType.exports.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2540, propertyName));
    return;
  }
  if (receiverType.kind === "thisClass") {
    diagnoseThisPropertyAccess(receiverType, propertyName, state);
    if (targetType === undefined && diagnoseMissingProperty) {
      diagnoseMissingPropertyAccess(receiverType, propertyName, state);
    }
    return;
  }
  if (receiverType.kind === "classInstance" && receiverType.members.readonlyProperties.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2540, propertyName));
  }
}

function assignExpressionTarget(expression: Expression, assignedType: CheckedType, state: CheckState, environment: TypeEnvironment): void {
  if (isIdentifier(expression)) {
    const existing = environment.get(expression.text);
    if (existing?.kind === "functionDeclaration") {
      return;
    }
    if (isReadonlyEnvironmentBinding(environment, expression.text)) {
      return;
    }
    if (isClassValue(existing) || isEnumValue(existing) || isPlainNamespace(existing)) {
      return;
    }
    const targetType = existing?.kind === "unassignedVariable" ? existing.type : existing;
    if (targetType !== undefined) {
      checkAssignable(assignedType, targetType, state);
      environment.set(expression.text, targetType);
      return;
    }
    environment.set(expression.text, assignedType);
    return;
  }
  if (isParenthesizedExpression(expression)) {
    assignExpressionTarget(expression.expression, assignedType, state, environment);
    return;
  }
  if (isPropertyAccessExpression(expression)) {
    const targetType = assignmentTargetType(expression, environment);
    if (targetType !== undefined) {
      checkAssignable(assignedType, targetType, state);
      return;
    }
    assignJavaScriptExpandoProperty(expression.expression, expression.name.text, assignedType, state, environment);
  }
}

function assignJavaScriptExpandoProperty(receiverExpression: Expression, propertyName: string, assignedType: CheckedType, state: CheckState, environment: TypeEnvironment): void {
  if (!state.isJavaScriptFile) {
    return;
  }
  const receiverType = inferExpression(receiverExpression, emptyCheckState(), environment);
  const objectType = writableObjectType(receiverType);
  if (objectType === undefined || objectType.properties.has(propertyName)) {
    return;
  }
  (objectType.properties as Map<string, CheckedType>).set(propertyName, assignedType);
}

function writableObjectType(type: CheckedType): Extract<CheckedType, { readonly kind: "object" }> | undefined {
  if (type.kind === "typeAliasInstance") {
    return writableObjectType(type.target);
  }
  if (type.kind === "valueAndType" || type.kind === "valueOnly" || type.kind === "accessorProperty") {
    return writableObjectType(type.type);
  }
  return type.kind === "object" ? type : undefined;
}

function propertyAssignmentTargetType(receiverType: CheckedType, propertyName: string, environment: TypeEnvironment): CheckedType | undefined {
  const propertyType = propertyAccessType(receiverType, propertyName, environment);
  return propertyType?.kind === "accessorProperty" ? propertyType.type : propertyType;
}

function assignmentOperatorReadsTarget(kind: Kind): boolean {
  return kind !== Kind.EqualsToken
    && kind !== Kind.AmpersandAmpersandEqualsToken
    && kind !== Kind.BarBarEqualsToken
    && kind !== Kind.QuestionQuestionEqualsToken;
}

function assignmentOperatorDefinitelyAssignsTarget(kind: Kind): boolean {
  return kind === Kind.EqualsToken
    || kind === Kind.BarBarEqualsToken
    || kind === Kind.QuestionQuestionEqualsToken;
}

function inferArrowFunction(arrowFunction: ArrowFunction, state: CheckState, environment: TypeEnvironment, contextualParameterTypes: readonly CheckedType[] = [], contextualReturnType?: CheckedType): CheckedType {
  if (arrowFunction.type !== undefined) {
    checkJavaScriptTypeAnnotation(state);
  }
  const arrowEnvironment = createFunctionEnvironment(environment);
  suppressImmediateThisDiagnostics(arrowEnvironment);
  const typeParameters = effectiveTypeParameterNames(arrowFunction.typeParameters, arrowFunction);
  addTypeParametersToEnvironment(typeParameters, arrowEnvironment);
  addTypeParameterConstraintsToEnvironment(arrowFunction.typeParameters, arrowEnvironment);
  const jsDocParameterTypes = jsDocParameterTypeMap(arrowFunction, arrowEnvironment, state);
  const parameterTypes = arrowFunction.parameters.map((parameter, parameterIndex) => parameterTypeFromDeclaration(parameter, arrowEnvironment, state, jsDocParameterType(parameter, jsDocParameterTypes) ?? contextualParameterTypes[parameterIndex]));
  checkParameterListGrammar(arrowFunction.parameters, state);
  for (let parameterIndex = 0; parameterIndex < arrowFunction.parameters.length; parameterIndex += 1) {
    const parameter = arrowFunction.parameters[parameterIndex]!;
    checkParameterModifiers(parameter, state, false);
    if (parameter.type !== undefined) {
      checkJavaScriptTypeAnnotation(state);
    }
    const contextualParameterType = contextualParameterTypes[parameterIndex];
    const jsDocType = jsDocParameterType(parameter, jsDocParameterTypes);
    checkImplicitAnyParameter(parameter, state, jsDocType ?? contextualParameterType);
    const parameterType = parameterTypes[parameterIndex] ?? unresolvedType;
    checkRestParameterArrayType(parameter, parameterType, state);
    checkStrictModeBindingName(parameter.name, state, false);
    setBindingNameType(parameter.name, parameterType, arrowEnvironment);
    if (parameter.initializer !== undefined) {
      inferExpression(parameter.initializer, state, arrowEnvironment);
    }
  }
  const declaredReturnType = arrowFunction.type === undefined
    ? jsDocReturnType(arrowFunction, arrowEnvironment, state)
    : bindTypePredicateParameterIndex(typeFromTypeNode(arrowFunction.type, arrowEnvironment, state), arrowFunction.parameters);
  const inferredReturnType = inferConciseBody(arrowFunction.body, state, arrowEnvironment, declaredReturnType, declaredReturnType !== undefined);
  return {
    kind: "function",
    typeParameters,
    parameters: parameterTypes,
    parameterNames: parameterDisplayNames(arrowFunction.parameters),
    ...signatureRestParameterIndex(arrowFunction.parameters),
    ...signatureMinArgumentCount(arrowFunction.parameters, state),
    ...signatureMaxArgumentCount(arrowFunction.parameters, state),
    returnType: declaredReturnType ?? inferredReturnType,
  };
}

function suppressImmediateThisDiagnostics(environment: TypeEnvironment): void {
  const thisType = environment.get("this");
  if (thisType?.kind === "thisClass") {
    environment.set("this", { ...thisType, mode: "method" });
  }
}

function inferConciseBody(body: ConciseBody, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, requireReturnCompleteness: boolean): CheckedType {
  if (isBlock(body)) {
    checkBlock(body, enterArrowFunction(state), environment, expectedReturnType);
    if (requireReturnCompleteness && expectedReturnType !== undefined) {
      checkFunctionReturnCompleteness(body, expectedReturnType, state);
    }
    return methodBodyReturnType(body, state.options, environment);
  }
  const bodyType = inferExpression(body, state, environment);
  if (expectedReturnType !== undefined) {
    checkAssignable(bodyType, expectedReturnType, state);
  }
  return bodyType;
}

function inferPropertyAccess(expression: Expression, optionalChain: boolean, propertyName: string, state: CheckState, environment: TypeEnvironment): CheckedType {
  const receiverType = inferExpression(expression, state, environment);
  if (optionalChain) {
    const nonNullReceiverType = nonNullableType(receiverType);
    const propertyType = propertyAccessType(nonNullReceiverType, propertyName, environment);
    if (propertyType !== undefined) {
      return unionType([propertyType, undefinedType]);
    }
  }
  if (receiverType.kind === "thisClass") {
    const propertyType = propertyAccessType(receiverType, propertyName, environment);
    diagnoseThisPropertyAccess(receiverType, propertyName, state);
    if (propertyType !== undefined) {
      return propertyType;
    }
    diagnoseMissingPropertyAccess(receiverType, propertyName, state);
    return anyType;
  }
  if (!optionalChain && strictOptionValue(state.options, "strictNullChecks") && unionContainsUndefined(receiverType)) {
    const nonNullReceiverType = nonNullableType(receiverType);
    const propertyType = propertyAccessType(nonNullReceiverType, propertyName, environment);
    if (propertyType !== undefined) {
      state.diagnostics.push(createDiagnostic(18048, expressionNameText(expression) ?? propertyName));
      return propertyType;
    }
  }
  const propertyType = propertyAccessType(receiverType, propertyName, environment);
  if (propertyType !== undefined) {
    return propertyType;
  }
  if (receiverType.kind === "unknown" || receiverType.kind === "unresolved") {
    return anyType;
  }
  if (receiverType.kind !== "any" && receiverType.kind !== "function" && receiverType.kind !== "functionDeclaration") {
    diagnoseMissingPropertyAccess(receiverType, propertyName, state);
    return anyType;
  }
  return anyType;
}

function unionContainsUndefined(type: CheckedType): boolean {
  return type.kind === "undefined" || (type.kind === "union" && type.types.some(unionContainsUndefined));
}

function diagnoseMissingPropertyAccess(receiverType: CheckedType, propertyName: string, state: CheckState): void {
  const suggestion = suggestedPropertyName(receiverType, propertyName);
  if (suggestion !== undefined) {
    state.diagnostics.push(createDiagnostic(2551, propertyName, displayType(receiverType), suggestion));
    return;
  }
  state.diagnostics.push(createDiagnostic(2339, propertyName, displayType(receiverType)));
}

function suggestedPropertyName(receiverType: CheckedType, propertyName: string): string | undefined {
  return spellingSuggestion(propertyName, propertyAccessCandidateNames(receiverType));
}

function spellingSuggestion(name: string, candidates: readonly string[]): string | undefined {
  const maximumLengthDifference = Math.max(2, Math.trunc(name.length * 0.34));
  let bestDistance = Math.floor(name.length * 0.4) + 0.9;
  let bestName: string | undefined;
  for (const candidate of candidates) {
    const maxLength = Math.max(candidate.length, name.length);
    const minLength = Math.min(candidate.length, name.length);
    if (candidate.length === 0 || maxLength - minLength > maximumLengthDifference || candidate === name) {
      continue;
    }
    if (candidate.length < 3 && candidate.toLowerCase() !== name.toLowerCase()) {
      continue;
    }
    const distance = levenshteinWithMax(name, candidate, bestDistance);
    if (distance === undefined) {
      continue;
    }
    if (distance < bestDistance) {
      bestName = candidate;
      bestDistance = distance;
    } else if (distance === bestDistance && (bestName === undefined || candidate < bestName)) {
      bestName = candidate;
    }
  }
  return bestName;
}

function propertyAccessCandidateNames(receiverType: CheckedType): readonly string[] {
  if (receiverType.kind === "thisClass" || receiverType.kind === "classInstance") {
    return [...uniqueInOrder([...receiverType.members.propertyTypes.keys(), ...receiverType.members.instance])].sort();
  }
  if (receiverType.kind === "interface") {
    return [...receiverType.members.properties.keys()].sort();
  }
  if (receiverType.kind === "object") {
    return [...receiverType.properties.keys()].sort();
  }
  if (receiverType.kind === "builtinConstructor") {
    return [...receiverType.staticProperties.keys()].sort();
  }
  if (receiverType.kind === "typeAliasInstance" || receiverType.kind === "typeAlias") {
    return propertyAccessCandidateNames(receiverType.target);
  }
  return [];
}

function levenshteinWithMax(left: string, right: string, maxValue: number): number | undefined {
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  let current = Array.from({ length: right.length + 1 }, () => 0);
  const sentinel = maxValue + 0.01;
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const leftCharacter = left[leftIndex - 1]!;
    const minRightIndex = Math.max(Math.ceil(leftIndex - maxValue), 1);
    const maxRightIndex = Math.min(Math.floor(maxValue + leftIndex), right.length);
    let columnMinimum = leftIndex;
    current[0] = columnMinimum;
    for (let rightIndex = 1; rightIndex < minRightIndex; rightIndex += 1) {
      current[rightIndex] = sentinel;
    }
    for (let rightIndex = minRightIndex; rightIndex <= maxRightIndex; rightIndex += 1) {
      const rightCharacter = right[rightIndex - 1]!;
      const substitutionDistance = leftCharacter.toLowerCase() === rightCharacter.toLowerCase()
        ? previous[rightIndex - 1]! + 0.1
        : previous[rightIndex - 1]! + 2;
      const distance = leftCharacter === rightCharacter
        ? previous[rightIndex - 1]!
        : Math.min(previous[rightIndex]! + 1, current[rightIndex - 1]! + 1, substitutionDistance);
      current[rightIndex] = distance;
      columnMinimum = Math.min(columnMinimum, distance);
    }
    for (let rightIndex = maxRightIndex + 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = sentinel;
    }
    if (columnMinimum > maxValue) {
      return undefined;
    }
    [previous, current] = [current, previous];
  }
  const result = previous[right.length]!;
  return result > maxValue ? undefined : result;
}

function propertyAccessType(receiverType: CheckedType, propertyName: string, environment?: TypeEnvironment): CheckedType | undefined {
  if (receiverType.kind === "accessorProperty") {
    return propertyAccessType(receiverType.type, propertyName, environment);
  }
  if (receiverType.kind === "valueAndType") {
    return propertyAccessType(receiverType.value, propertyName, environment);
  }
  if (receiverType.kind === "valueOnly") {
    return propertyAccessType(receiverType.type, propertyName, environment);
  }
  if (receiverType.kind === "functionDeclaration") {
    return propertyAccessType(receiverType.type, propertyName, environment);
  }
  if (receiverType.kind === "namespaceAndType") {
    return propertyAccessType(receiverType.namespace, propertyName, environment) ?? propertyAccessType(receiverType.type, propertyName, environment);
  }
  if (receiverType.kind === "typeAliasInstance") {
    return propertyAccessType(receiverType.target, propertyName, environment);
  }
  if (receiverType.kind === "union") {
    const propertyTypes = receiverType.types.map(type => propertyAccessType(type, propertyName, environment));
    return propertyTypes.every(type => type !== undefined) ? unionType(propertyTypes) : undefined;
  }
  if (receiverType.kind === "intersection") {
    if (receiverType.types.some(type => type.kind === "any")) {
      return anyType;
    }
    const propertyTypes = receiverType.types.flatMap(type => {
      const propertyType = propertyAccessType(type, propertyName, environment);
      return propertyType === undefined ? [] : [propertyType];
    });
    if (propertyTypes.length === 0) {
      return undefined;
    }
    return propertyTypes.length === 1 ? propertyTypes[0]! : { kind: "intersection", types: propertyTypes };
  }
  if (receiverType.kind === "classInstance") {
    const propertyType = classInstancePropertyType(receiverType, propertyName);
    if (propertyType !== undefined) {
      return receiverType.members.getAccessorProperties.has(propertyName) ? { kind: "accessorProperty", type: propertyType } : propertyType;
    }
    return receiverType.members.instance.has(propertyName) ? anyType : undefined;
  }
  if (receiverType.kind === "thisClass") {
    const propertyType = receiverType.members.propertyTypes.get(propertyName);
    if (propertyType !== undefined) {
      return receiverType.members.getAccessorProperties.has(propertyName) ? { kind: "accessorProperty", type: propertyType } : propertyType;
    }
    return receiverType.members.instance.has(propertyName) ? anyType : undefined;
  }
  if (receiverType.kind === "classConstructor") {
    if (propertyName === "prototype") {
      return {
        kind: "classInstance",
        name: receiverType.name,
        typeParameters: receiverType.typeParameters,
        typeArguments: receiverType.typeArguments,
        members: receiverType.members,
        ...optionalArrayBaseElementType(receiverType.arrayBaseElementType),
      };
    }
    return receiverType.members.static.has(propertyName) ? anyType : undefined;
  }
  if (receiverType.kind === "builtinConstructor") {
    if (propertyName === "prototype") {
      return receiverType.instanceType;
    }
    return receiverType.staticProperties.get(propertyName);
  }
  if (receiverType.kind === "object") {
    return receiverType.properties.get(propertyName) ?? receiverType.stringIndexType ?? receiverType.numberIndexType;
  }
  if (receiverType.kind === "interface") {
    return receiverType.members.properties.get(propertyName) ?? receiverType.members.stringIndexType ?? receiverType.members.numberIndexType;
  }
  if (receiverType.kind === "moduleNamespace" || receiverType.kind === "namespace") {
    return receiverType.exports.get(propertyName);
  }
  if (receiverType.kind === "function" && propertyName === "apply") {
    return functionApplyType(receiverType);
  }
  if (receiverType.kind === "function" && propertyName === "call") {
    return functionCallType(receiverType);
  }
  if (receiverType.kind === "stringLiteral") {
    return propertyAccessType(stringType, propertyName, environment);
  }
  if (receiverType.kind === "numberLiteral") {
    return propertyAccessType(numberType, propertyName, environment);
  }
  if (receiverType.kind === "booleanLiteral") {
    return propertyAccessType(booleanType, propertyName, environment);
  }
  if (receiverType.kind === "number" && numberMethodReturnTypes.has(propertyName)) {
    return { kind: "function", typeParameters: [], parameters: [], returnType: numberMethodReturnTypes.get(propertyName)! };
  }
  if (receiverType.kind === "string" && propertyName === "length") {
    return numberType;
  }
  if (receiverType.kind === "string" && stringMethodReturnTypes.has(propertyName)) {
    return { kind: "function", typeParameters: [], parameters: [], returnType: stringMethodReturnTypes.get(propertyName)! };
  }
  if (receiverType.kind === "array" || receiverType.kind === "readonlyArray") {
    return arrayPropertyAccessType(receiverType, propertyName, environment);
  }
  if (receiverType.kind === "arrayLike") {
    return propertyName === "length" ? numberType : undefined;
  }
  if (receiverType.kind === "set" && propertyName === "values") {
    return { kind: "function", typeParameters: [], parameters: [], returnType: { kind: "iterable", elementType: receiverType.elementType } };
  }
  return undefined;
}

function functionApplyType(functionType: CheckedFunctionType): CheckedFunctionType {
  return {
    kind: "function",
    typeParameters: [],
    parameters: [anyType, functionApplyArgumentArrayType(functionType)],
    parameterNames: ["thisArg", "argArray"],
    minArgumentCount: 1,
    maxArgumentCount: 2,
    returnType: functionType.returnType,
  };
}

function functionCallType(functionType: CheckedFunctionType): CheckedFunctionType {
  return {
    kind: "function",
    typeParameters: [],
    parameters: [anyType, ...functionType.parameters],
    parameterNames: ["thisArg", ...(functionType.parameterNames ?? functionType.parameters.map((_parameter, index) => `arg${index}`))],
    minArgumentCount: (functionType.minArgumentCount ?? functionType.parameters.length) + 1,
    ...(functionType.maxArgumentCount === undefined ? {} : { maxArgumentCount: functionType.maxArgumentCount + 1 }),
    returnType: functionType.returnType,
  };
}

function functionApparentProperties(): ReadonlyMap<string, CheckedType> {
  const variadicFunctionMember: CheckedFunctionType = {
    kind: "function",
    typeParameters: [],
    parameters: [anyType],
    restParameterIndex: 0,
    minArgumentCount: 0,
    returnType: anyType,
  };
  return new Map([
    ["apply", variadicFunctionMember],
    ["call", variadicFunctionMember],
  ]);
}

function functionApplyArgumentArrayType(functionType: CheckedFunctionType): CheckedType {
  const restParameterIndex = functionType.restParameterIndex;
  const fixedParameterCount = restParameterIndex ?? functionType.parameters.length;
  const minArgumentCount = functionType.minArgumentCount ?? 0;
  const elements: TupleElementType[] = [];
  for (let index = 0; index < fixedParameterCount; index += 1) {
    elements.push({
      ...(functionType.parameterNames?.[index] === undefined ? {} : { name: functionType.parameterNames[index] }),
      type: functionType.parameters[index] ?? anyType,
      optional: index >= minArgumentCount,
    });
  }
  if (restParameterIndex !== undefined) {
    return { kind: "tuple", elements, restElementType: restArgumentElementType(functionType.parameters[restParameterIndex] ?? anyType) };
  }
  if (functionType.maxArgumentCount === undefined) {
    return { kind: "tuple", elements, restElementType: anyType };
  }
  return { kind: "tuple", elements };
}

function arrayPropertyAccessType(receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>, propertyName: string, environment?: TypeEnvironment): CheckedType | undefined {
  if (propertyName === "length") {
    return numberType;
  }
  const methodType = arrayMethodType(receiverType, propertyName);
  if (methodType !== undefined) {
    return methodType;
  }
  return arrayInterfacePropertyType(environment, receiverType, propertyName);
}

function arrayMethodType(receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>, propertyName: string): CheckedFunctionType | undefined {
  if (propertyName === "concat") {
    return arrayConcatMethodType(receiverType);
  }
  const returnType = arrayMethodReturnType(receiverType, propertyName);
  if (returnType === undefined) {
    return undefined;
  }
  const callbackParameters = arrayCallbackParameterTypes(receiverType, propertyName);
  return {
    kind: "function",
    typeParameters: [],
    parameters: callbackParameters === undefined
      ? arrayMethodParameterTypes(receiverType, propertyName)
      : [{ kind: "function", typeParameters: [], parameters: callbackParameters, returnType: anyType }],
    ...(callbackParameters === undefined ? {} : { minArgumentCount: propertyName === "sort" ? 0 : 1, maxArgumentCount: propertyName === "sort" ? 1 : 2 }),
    returnType,
  };
}

function arrayConcatMethodType(receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>): CheckedFunctionType {
  const returnType: CheckedType = { kind: "array", elementType: receiverType.elementType };
  const arrayArgumentType: CheckedType = { kind: "readonlyArray", elementType: receiverType.elementType };
  const mixedArgumentType = unionType([receiverType.elementType, arrayArgumentType]);
  const arrayOnlyOverload: CheckedFunctionType = {
    kind: "function",
    typeParameters: [],
    parameters: [arrayArgumentType],
    restParameterIndex: 0,
    minArgumentCount: 0,
    returnType,
  };
  const mixedOverload: CheckedFunctionType = {
    kind: "function",
    typeParameters: [],
    parameters: [mixedArgumentType],
    restParameterIndex: 0,
    minArgumentCount: 0,
    returnType,
  };
  return { ...arrayOnlyOverload, overloads: [arrayOnlyOverload, mixedOverload] };
}

function arrayMethodParameterTypes(receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>, propertyName: string): readonly CheckedType[] {
  if (receiverType.kind === "array" && (propertyName === "push" || propertyName === "unshift")) {
    return [receiverType.elementType];
  }
  return [];
}

function arrayCallbackParameterTypes(receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>, propertyName: string): readonly CheckedType[] | undefined {
  if (propertyName === "sort") {
    return [receiverType.elementType, receiverType.elementType];
  }
  if (arrayElementCallbackMethodNames.has(propertyName)) {
    return [receiverType.elementType, numberType, receiverType];
  }
  if (propertyName === "reduce" || propertyName === "reduceRight") {
    return [anyType, receiverType.elementType, numberType, receiverType];
  }
  return undefined;
}

function arrayMethodReturnType(receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>, propertyName: string): CheckedType | undefined {
  if (receiverType.kind === "readonlyArray" && mutableArrayMethodNames.has(propertyName)) {
    return undefined;
  }
  if (propertyName === "values") {
    return { kind: "iterable", elementType: receiverType.elementType };
  }
  const fixedReturnType = arrayMethodReturnTypes.get(propertyName);
  if (fixedReturnType !== undefined) {
    return fixedReturnType;
  }
  if (arrayElementMethodNames.has(propertyName)) {
    return receiverType.elementType;
  }
  if (arraySelfMethodNames.has(propertyName)) {
    return receiverType;
  }
  if (arrayArrayMethodNames.has(propertyName)) {
    return { kind: "array", elementType: receiverType.elementType };
  }
  return undefined;
}

function arrayInterfacePropertyType(environment: TypeEnvironment | undefined, receiverType: Extract<CheckedType, { readonly kind: "array" | "readonlyArray" }>, propertyName: string): CheckedType | undefined {
  const arrayInterface = interfaceMeaning(environment?.get(receiverType.kind === "readonlyArray" ? "ReadonlyArray" : "Array"));
  const propertyType = arrayInterface?.members.properties.get(propertyName);
  if (arrayInterface === undefined || propertyType === undefined) {
    return undefined;
  }
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < arrayInterface.members.typeParameters.length; index += 1) {
    substitutions.set(arrayInterface.members.typeParameters[index]!, index === 0 ? receiverType.elementType : anyType);
  }
  return substituteType(propertyType, substitutions);
}

function interfaceMeaning(type: CheckedType | undefined): Extract<CheckedType, { readonly kind: "interface" }> | undefined {
  if (type?.kind === "interface") {
    return type;
  }
  if (type?.kind === "namespaceAndType") {
    return interfaceMeaning(type.type);
  }
  if (type?.kind === "valueAndType") {
    return interfaceMeaning(type.type);
  }
  return undefined;
}

function interfaceElementAccessType(members: InterfaceMembers, argument: Expression): CheckedType {
  if (isStringLiteral(argument)) {
    return members.properties.get(argument.text) ?? members.stringIndexType ?? members.numberIndexType ?? unresolvedType;
  }
  if (isNumericLiteral(argument)) {
    return members.numberIndexType ?? members.stringIndexType ?? unresolvedType;
  }
  return members.numberIndexType ?? members.stringIndexType ?? unresolvedType;
}

function indexedAccessType(objectType: CheckedType, indexType: CheckedType): CheckedType {
  if (objectType.kind === "accessorProperty") {
    return indexedAccessType(objectType.type, indexType);
  }
  if (objectType.kind === "typeAliasInstance") {
    return indexedAccessType(objectType.target, indexType);
  }
  if (indexType.kind === "typeAliasInstance") {
    return indexedAccessType(objectType, indexType.target);
  }
  if (objectType.kind === "any" || objectType.kind === "unknown" || objectType.kind === "unresolved" || indexType.kind === "any" || indexType.kind === "unresolved") {
    return anyType;
  }
  if ((objectType.kind === "array" || objectType.kind === "readonlyArray" || objectType.kind === "arrayLike") && (indexType.kind === "number" || indexType.kind === "numberLiteral")) {
    return objectType.elementType;
  }
  if (objectType.kind === "tuple" && indexType.kind === "numberLiteral") {
    const element = objectType.elements[Number(indexType.value)];
    return element?.type ?? objectType.restElementType ?? undefinedType;
  }
  if (objectType.kind === "object" && indexType.kind === "stringLiteral") {
    return objectType.properties.get(indexType.value) ?? unresolvedType;
  }
  if (objectType.kind === "interface" && indexType.kind === "stringLiteral") {
    return objectType.members.properties.get(indexType.value) ?? objectType.members.stringIndexType ?? objectType.members.numberIndexType ?? unresolvedType;
  }
  if (objectType.kind === "union") {
    return unionType(objectType.types.map(member => indexedAccessType(member, indexType)));
  }
  if (indexType.kind === "union") {
    return unionType(indexType.types.map(member => indexedAccessType(objectType, member)));
  }
  return anyType;
}

function accessorReadType(type: CheckedType): CheckedType {
  return type.kind === "accessorProperty" ? type.type : type;
}

function invalidElementAccessIndexType(type: CheckedType): CheckedType | undefined {
  if (type.kind === "unassignedVariable") {
    return invalidElementAccessIndexType(type.type);
  }
  if (type.kind === "valueOnly") {
    return invalidElementAccessIndexType(type.type);
  }
  if (type.kind === "valueAndType") {
    return invalidElementAccessIndexType(type.value);
  }
  if (type.kind === "typeAliasInstance") {
    return invalidElementAccessIndexType(type.target);
  }
  if (type.kind === "typeParameter") {
    return type.constraint === undefined ? undefined : invalidElementAccessIndexType(type.constraint);
  }
  if (type.kind === "nonNullable") {
    return invalidElementAccessIndexType(nonNullableType(type.target));
  }
  if (type.kind === "union") {
    return type.types.find(member => invalidElementAccessIndexType(member) !== undefined);
  }
  if (type.kind === "any" || type.kind === "never" || type.kind === "number" || type.kind === "numberLiteral" || type.kind === "string" || type.kind === "stringLiteral" || type.kind === "unresolved") {
    return undefined;
  }
  return type;
}

function diagnoseThisPropertyAccess(receiverType: Extract<CheckedType, { readonly kind: "thisClass" }>, propertyName: string, state: CheckState): void {
  if (receiverType.mode !== "method" && receiverType.abstractProperties.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2715, propertyName, receiverType.abstractPropertyDeclaringClasses.get(propertyName) ?? receiverType.className));
  }
  if (receiverType.mode === "fieldInitializer" && receiverType.uninitializedProperties.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2729, propertyName));
  }
}

function setBindingNameType(name: BindingName, type: CheckedType, environment: TypeEnvironment, readonly = false): void {
  if (isIdentifier(name)) {
    environment.set(name.text, type);
    setEnvironmentBindingReadonly(environment, name.text, readonly);
    return;
  }
  if (isObjectBindingPattern(name)) {
    for (const element of name.elements) {
      setBindingElementType(element, objectBindingElementType(type, element), environment, readonly);
    }
    return;
  }
  if (isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      const elementType = arrayBindingElementType(type);
      setBindingElementType(element, element.dotDotDotToken === undefined ? elementType : { kind: "array", elementType }, environment, readonly);
    }
  }
}

function objectBindingElementType(type: CheckedType, element: BindingElement): CheckedType {
  const propertyName = bindingElementPropertyName(element);
  if (propertyName === undefined) {
    return anyType;
  }
  if (type.kind === "any" || type.kind === "unknown" || type.kind === "unresolved") {
    return anyType;
  }
  return propertyAccessType(type, propertyName) ?? anyType;
}

function arrayBindingElementType(type: CheckedType): CheckedType {
  if (type.kind === "array") {
    return type.elementType;
  }
  if (type.kind === "readonlyArray" || type.kind === "arrayLike" || type.kind === "arrayIterator" || type.kind === "iterable" || type.kind === "set") {
    return type.elementType;
  }
  if (type.kind === "interface" && isIArgumentsType(type)) {
    return anyType;
  }
  if (type.kind === "any" || type.kind === "unknown" || type.kind === "unresolved") {
    return anyType;
  }
  return anyType;
}

function checkIterationInputType(type: CheckedType, state: CheckState, use: "forOf" | "spread" | "destructuring"): boolean {
  if (state.options.noLib === true) {
    return false;
  }
  const normalized = type.kind === "typeAliasInstance" ? type.target : type;
  if (normalized.kind === "never") {
    if (use === "destructuring") {
      state.diagnostics.push(createDiagnostic(2488, displayType(normalized)));
      return true;
    }
    return false;
  }
  if (normalized.kind === "any" || normalized.kind === "unknown" || normalized.kind === "unresolved") {
    return false;
  }
  if (normalized.kind === "array" || normalized.kind === "readonlyArray") {
    return false;
  }
  if (normalized.kind === "string" || normalized.kind === "stringLiteral") {
    if (use === "spread" && !targetSupportsUplevelIteration(state.options.target) && state.options.downlevelIteration !== true) {
      state.diagnostics.push(createDiagnostic(2802, displayType(normalized)));
      return true;
    }
    return false;
  }
  if (iterationRequiresUplevelSupport(normalized)) {
    if (!targetSupportsUplevelIteration(state.options.target) && state.options.downlevelIteration !== true) {
      state.diagnostics.push(createDiagnostic(2802, displayType(normalized)));
      return true;
    }
    return false;
  }
  if (use === "forOf") {
    state.diagnostics.push(createDiagnostic(2495, displayType(normalized)));
    return true;
  }
  return false;
}

function iterationRequiresUplevelSupport(type: CheckedType): boolean {
  return type.kind === "arrayIterator"
    || type.kind === "iterable"
    || type.kind === "set"
    || type.kind === "arrayLike"
    || (type.kind === "interface" && isIArgumentsType(type));
}

function isIArgumentsType(type: CheckedType): boolean {
  return type.kind === "interface" && type.name === "IArguments";
}

function isSymbolIteratorExpression(expression: Expression): boolean {
  return isPropertyAccessExpression(expression) && isIdentifier(expression.expression) && expression.expression.text === "Symbol" && expression.name.text === "iterator";
}

function bindingElementPropertyName(element: BindingElement): string | undefined {
  if (element.propertyName !== undefined) {
    return propertyNameDiagnosticText(element.propertyName);
  }
  return element.name !== undefined && isIdentifier(element.name) ? element.name.text : undefined;
}

function checkStrictModeBindingName(name: BindingName, state: CheckState, ambient: boolean): void {
  if (ambient || !state.strictMode) {
    return;
  }
  if (isIdentifier(name)) {
    checkStrictModeIdentifier(name.text, state, ambient);
    return;
  }
  if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      if (element.name !== undefined) {
        checkStrictModeBindingName(element.name, state, ambient);
      }
    }
  }
}

function checkStrictModeIdentifier(name: string, state: CheckState, ambient: boolean): void {
  if (ambient || !state.strictMode || (name !== "arguments" && name !== "eval")) {
    return;
  }
  const code = state.strictModeReason === "class" ? 1210 : state.strictModeReason === "module" ? 1215 : 1100;
  state.diagnostics.push(createDiagnostic(code, name));
}

function checkStrictModeReservedIdentifierExpression(name: string, state: CheckState): void {
  if (state.strictMode && strictModeReservedIdentifierNames.has(name)) {
    state.diagnostics.push(createDiagnostic(1212, name));
  }
}

function setBindingElementType(element: BindingElement, type: CheckedType, environment: TypeEnvironment, readonly = false): void {
  if (element.name !== undefined) {
    setBindingNameType(element.name, type, environment, readonly);
  }
}

function inferObjectLiteral(expression: Extract<Expression, { readonly kind: Kind.ObjectLiteralExpression }>, state: CheckState, environment: TypeEnvironment, contextualType?: CheckedType): CheckedType {
  const properties = new Map<string, CheckedType>();
  const readonlyProperties = new Set<string>();
  let contextualDiagnostics = false;
  for (const property of expression.properties) {
    if (isPropertyAssignment(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        contextualDiagnostics = checkExcessObjectLiteralProperty(name, contextualType, state) || contextualDiagnostics;
        const expectedPropertyType = contextualObjectPropertyInitializerType(contextualType, name);
        const propertyType = inferExpressionWithContext(property.initializer, state, environment, expectedPropertyType);
        if (expectedPropertyType !== undefined && !isAssignableTo(propertyType, expectedPropertyType, state.options)) {
          checkAssignable(propertyType, expectedPropertyType, state);
          contextualDiagnostics = true;
        }
        properties.set(name, propertyType);
      }
      continue;
    }
    if (isShorthandPropertyAssignment(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        contextualDiagnostics = checkExcessObjectLiteralProperty(name, contextualType, state) || contextualDiagnostics;
        properties.set(name, environment.get(name) ?? unresolvedType);
      }
      continue;
    }
    if (isMethodDeclaration(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        contextualDiagnostics = checkExcessObjectLiteralProperty(name, contextualType, state) || contextualDiagnostics;
        properties.set(name, contextualObjectPropertyInitializerType(contextualType, name) ?? methodDeclarationType(property, environment, state));
      }
      continue;
    }
    if (isGetAccessorDeclaration(property) || isSetAccessorDeclaration(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        contextualDiagnostics = checkExcessObjectLiteralProperty(name, contextualType, state) || contextualDiagnostics;
        properties.set(name, classMemberPropertyType(property, environment) ?? anyType);
        if (isGetAccessorDeclaration(property)) {
          readonlyProperties.add(name);
        }
      }
    }
  }
  const objectType: CheckedType = { kind: "object", properties, readonlyProperties, optionalProperties: new Set(), methodProperties: new Set(), ...(contextualDiagnostics ? { contextualDiagnostics } : {}) };
  const objectEnvironment = cloneTypeEnvironment(environment);
  objectEnvironment.set("this", objectType);
  for (const property of expression.properties) {
    if (isPropertyAssignment(property)) {
      continue;
    }
    if (isShorthandPropertyAssignment(property)) {
      if (isIdentifier(property.name)) {
        if (environment.has(property.name.text)) {
          inferExpression(property.name, state, environment);
        } else {
          state.diagnostics.push(createDiagnostic(18004, property.name.text));
        }
      }
      continue;
    }
    if (isMethodDeclaration(property)) {
      const name = propertyNameDiagnosticText(property.name);
      checkObjectLiteralMethod(property, state, objectEnvironment, name === undefined ? undefined : contextualObjectPropertyInitializerType(contextualType, name));
      continue;
    }
    if (isGetAccessorDeclaration(property) || isSetAccessorDeclaration(property)) {
      if (isGetAccessorDeclaration(property) && property.type === undefined && accessorReturnsMissingSelfProperty(property, objectType)) {
        state.diagnostics.push(createDiagnostic(7023, propertyNameDiagnosticText(property.name) ?? "(Missing)", "any"));
      }
      checkAccessorDeclaration(property, state, objectEnvironment, false);
    }
  }
  return objectType;
}

function checkExcessObjectLiteralProperty(propertyName: string, contextualType: CheckedType | undefined, state: CheckState): boolean {
  if (contextualType !== undefined && !contextualObjectAllowsProperty(contextualType, propertyName)) {
    state.diagnostics.push(createDiagnostic(2353, propertyName, displayType(contextualType)));
    return true;
  }
  return false;
}

function contextualObjectAllowsProperty(contextualType: CheckedType, propertyName: string): boolean {
  if (contextualType.kind === "typeAliasInstance") {
    return contextualObjectAllowsProperty(contextualType.target, propertyName);
  }
  if (contextualType.kind === "record") {
    return true;
  }
  if (contextualType.kind === "object") {
    if (contextualType.stringIndexType !== undefined || contextualType.numberIndexType !== undefined) {
      return true;
    }
    if (contextualType.properties.size === 0 && (contextualType.callSignatures?.length ?? 0) === 0) {
      return true;
    }
    return contextualType.properties.has(propertyName);
  }
  if (contextualType.kind === "interface") {
    if (contextualType.members.properties.size === 0
      && contextualType.members.stringIndexType === undefined
      && contextualType.members.numberIndexType === undefined) {
      return true;
    }
    return contextualType.members.properties.has(propertyName)
      || contextualType.members.stringIndexType !== undefined
      || contextualType.members.numberIndexType !== undefined;
  }
  if (contextualType.kind === "classInstance") {
    return contextualType.members.propertyTypes.has(propertyName);
  }
  return true;
}

function contextualObjectPropertyType(contextualType: CheckedType | undefined, propertyName: string): CheckedType | undefined {
  if (contextualType === undefined) {
    return undefined;
  }
  if (contextualType.kind === "typeAliasInstance") {
    return contextualObjectPropertyType(contextualType.target, propertyName);
  }
  if (contextualType.kind === "record") {
    return contextualType.valueType;
  }
  if (contextualType.kind === "object") {
    return contextualType.properties.get(propertyName) ?? contextualType.stringIndexType ?? contextualType.numberIndexType;
  }
  if (contextualType.kind === "interface") {
    return contextualType.members.properties.get(propertyName) ?? contextualType.members.stringIndexType ?? contextualType.members.numberIndexType;
  }
  if (contextualType.kind === "classInstance") {
    return classInstancePropertyType(contextualType, propertyName);
  }
  return undefined;
}

function contextualObjectPropertyInitializerType(contextualType: CheckedType | undefined, propertyName: string): CheckedType | undefined {
  const propertyType = contextualObjectPropertyType(contextualType, propertyName);
  if (propertyType === undefined || !contextualObjectPropertyIsOptional(contextualType, propertyName)) {
    return propertyType;
  }
  return removeUndefinedType(propertyType);
}

function contextualObjectPropertyIsOptional(contextualType: CheckedType | undefined, propertyName: string): boolean {
  if (contextualType === undefined) {
    return false;
  }
  if (contextualType.kind === "typeAliasInstance") {
    return contextualObjectPropertyIsOptional(contextualType.target, propertyName);
  }
  if (contextualType.kind === "object") {
    return contextualType.optionalProperties.has(propertyName);
  }
  if (contextualType.kind === "interface") {
    return contextualType.members.optionalProperties.has(propertyName);
  }
  if (contextualType.kind === "classInstance") {
    return contextualType.members.optionalProperties.has(propertyName);
  }
  return false;
}

function removeUndefinedType(type: CheckedType): CheckedType {
  if (type.kind === "union") {
    const members = type.types.filter(member => member.kind !== "undefined");
    return members.length === 0 ? undefinedType : unionType(members);
  }
  if (type.kind === "typeAliasInstance") {
    return { ...type, target: removeUndefinedType(type.target) };
  }
  return type;
}

function methodDeclarationType(method: MethodDeclaration, environment: TypeEnvironment, state: CheckState): CheckedType {
  const signatureEnvironment = cloneTypeEnvironment(environment);
  const typeParameters = method.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, signatureEnvironment);
  addTypeParameterConstraintsToEnvironment(method.typeParameters, signatureEnvironment);
  const parameters = method.parameters.map(parameter => parameterTypeFromDeclaration(parameter, signatureEnvironment, state));
  const returnType = method.type === undefined ? methodBodyReturnType(method.body, state.options, signatureEnvironment) : bindTypePredicateParameterIndex(typeFromTypeNode(method.type, signatureEnvironment, state), method.parameters);
  return { kind: "function", typeParameters, parameters, parameterNames: parameterDisplayNames(method.parameters), ...signatureRestParameterIndex(method.parameters), ...signatureMinArgumentCount(method.parameters, state), ...signatureMaxArgumentCount(method.parameters, state, method.body), returnType };
}

function methodBodyReturnType(body: Block | undefined, options?: CompilerOptions, environment?: TypeEnvironment): CheckedType {
  if (body === undefined) {
    return unresolvedType;
  }
  const returns = body.statements
    .filter(isReturnStatement)
    .map(statement => statement.expression === undefined ? voidType : returnExpressionType(statement.expression, options, environment));
  return returns.length === 0 ? voidType : unionType(returns);
}

function returnExpressionType(expression: Expression, options?: CompilerOptions, environment?: TypeEnvironment): CheckedType {
  const type = environment !== undefined
    ? inferExpression(expression, emptyCheckState(options), environment)
    : literalExpressionType(expression) ?? anyType;
  if (!strictOptionValue(options ?? {}, "strictNullChecks") && (type.kind === "null" || type.kind === "undefined")) {
    return anyType;
  }
  return type;
}

function checkObjectLiteralMethod(method: MethodDeclaration, state: CheckState, environment: TypeEnvironment, contextualType?: CheckedType): void {
  const methodEnvironment = createFunctionEnvironment(environment);
  seedArgumentsObject(methodEnvironment);
  const typeParameters = method.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, methodEnvironment);
  addTypeParameterConstraintsToEnvironment(method.typeParameters, methodEnvironment);
  const contextualFunction = callableFunctionType(contextualType);
  checkSignatureParameters(method.parameters, state, methodEnvironment, true, false, contextualFunction?.parameters ?? []);
  if (method.body !== undefined) {
    const declaredReturnType = method.type === undefined ? undefined : typeFromTypeNode(method.type, methodEnvironment, state);
    const yieldType = method.asteriskToken === undefined ? undefined : generatorYieldType(declaredReturnType);
    checkBlock(method.body, enterFunction(state, yieldType), methodEnvironment, method.asteriskToken === undefined ? declaredReturnType : undefined);
    if (declaredReturnType !== undefined && method.asteriskToken === undefined) {
      checkFunctionReturnCompleteness(method.body, declaredReturnType, state);
    }
  }
}

function accessorReturnsMissingSelfProperty(accessor: GetAccessorDeclaration, selfType: Extract<CheckedType, { readonly kind: "object" }>): boolean {
  if (accessor.body === undefined) {
    return false;
  }
  const aliases = new Set(["this"]);
  for (const statement of accessor.body.statements) {
    if (isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (isIdentifier(declaration.name) && declaration.initializer !== undefined && expressionIsSelfAlias(declaration.initializer, aliases)) {
          aliases.add(declaration.name.text);
        }
      }
      continue;
    }
    if (isReturnStatement(statement) && statement.expression !== undefined && expressionContainsMissingSelfProperty(statement.expression, aliases, selfType)) {
      return true;
    }
  }
  return false;
}

function expressionContainsMissingSelfProperty(expression: Expression, aliases: ReadonlySet<string>, selfType: Extract<CheckedType, { readonly kind: "object" }>): boolean {
  if (isParenthesizedExpression(expression)) {
    return expressionContainsMissingSelfProperty(expression.expression, aliases, selfType);
  }
  if (isPropertyAccessExpression(expression)) {
    if (expressionIsSelfAlias(expression.expression, aliases) && !selfType.properties.has(expression.name.text)) {
      return true;
    }
    return expressionContainsMissingSelfProperty(expression.expression, aliases, selfType);
  }
  if (isElementAccessExpression(expression)) {
    return expressionContainsMissingSelfProperty(expression.expression, aliases, selfType)
      || expressionContainsMissingSelfProperty(expression.argumentExpression, aliases, selfType);
  }
  if (isCallExpression(expression)) {
    return expressionContainsMissingSelfProperty(expression.expression, aliases, selfType)
      || expression.arguments.some(argument => expressionContainsMissingSelfProperty(argument, aliases, selfType));
  }
  if (isTaggedTemplateExpression(expression)) {
    return expressionContainsMissingSelfProperty(expression.tag, aliases, selfType)
      || (expression.template.kind === Kind.TemplateExpression
        && expression.template.templateSpans.some(span => expressionContainsMissingSelfProperty(span.expression, aliases, selfType)));
  }
  if (isBinaryExpression(expression)) {
    return expressionContainsMissingSelfProperty(expression.left, aliases, selfType)
      || expressionContainsMissingSelfProperty(expression.right, aliases, selfType);
  }
  return false;
}

function expressionIsSelfAlias(expression: Expression, aliases: ReadonlySet<string>): boolean {
  if (isParenthesizedExpression(expression)) {
    return expressionIsSelfAlias(expression.expression, aliases);
  }
  if (isKeywordExpression(expression) && expression.kind === Kind.ThisKeyword) {
    return aliases.has("this");
  }
  return isIdentifier(expression) && aliases.has(expression.text);
}

function typeFromTypeNode(type: TypeNode, environment: TypeEnvironment = new Map(), state?: CheckState): CheckedType {
  if (isKeywordTypeNode(type)) {
    switch (type.kind) {
      case Kind.AnyKeyword:
        return anyType;
      case Kind.BooleanKeyword:
        return { kind: "boolean" };
      case Kind.NeverKeyword:
        return neverType;
      case Kind.NumberKeyword:
        return numberType;
      case Kind.StringKeyword:
        return stringType;
      case Kind.UndefinedKeyword:
        return undefinedType;
      case Kind.VoidKeyword:
        return voidType;
      case Kind.UnknownKeyword:
        return unknownType;
      default:
        return unknownType;
    }
  }
  if (isArrayTypeNode(type)) {
    return { kind: "array", elementType: typeFromTypeNode(type.elementType, environment, state) };
  }
  if (isIndexedAccessTypeNode(type)) {
    const objectType = typeFromTypeNode(type.objectType, environment, state);
    const indexType = typeFromTypeNode(type.indexType, environment, state);
    const invalidIndexType = invalidElementAccessIndexType(indexType);
    if (invalidIndexType !== undefined) {
      state?.diagnostics.push(createDiagnostic(2538, displayType(invalidIndexType)));
      return anyType;
    }
    return indexedAccessType(objectType, indexType);
  }
  if (isTupleTypeNode(type)) {
    return tupleTypeFromTypeNode(type.elements, environment, state);
  }
  if (isUnionTypeNode(type)) {
    return unionType(type.types.map(unionMember => typeFromTypeNode(unionMember, environment, state)));
  }
  if (isIntersectionTypeNode(type)) {
    return { kind: "intersection", types: type.types.map(intersectionMember => typeFromTypeNode(intersectionMember, environment, state)) };
  }
  if (isLiteralTypeNode(type)) {
    return literalTypeNodeType(type);
  }
  if (isTypeLiteralNode(type)) {
    return typeLiteralType(type.members, state ?? emptyCheckState(), environment);
  }
  if (isMappedTypeNode(type)) {
    return mappedType(type, state ?? emptyCheckState(), environment);
  }
  if (isParenthesizedTypeNode(type)) {
    return typeFromTypeNode(type.type, environment, state);
  }
  if (isFunctionTypeNode(type) || isConstructorTypeNode(type)) {
    const signatureEnvironment = cloneTypeEnvironment(environment);
    const typeParameters = type.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
    addTypeParametersToEnvironment(typeParameters, signatureEnvironment);
    addTypeParameterConstraintsToEnvironment(type.typeParameters, signatureEnvironment);
    const parameterTypes = checkSignatureParameters(type.parameters, state ?? emptyCheckState(), signatureEnvironment, true);
    const returnType = type.type === undefined ? unresolvedType : bindTypePredicateParameterIndex(typeFromTypeNode(type.type, signatureEnvironment, state), type.parameters);
    return { kind: "function", typeParameters, parameters: parameterTypes, parameterNames: parameterDisplayNames(type.parameters), ...signatureRestParameterIndex(type.parameters), ...signatureMinArgumentCount(type.parameters, state ?? emptyCheckState()), ...signatureMaxArgumentCount(type.parameters, state ?? emptyCheckState()), returnType, ...(isConstructorTypeNode(type) ? { construct: true } : {}) };
  }
  if (isTypeReferenceNode(type)) {
    const name = entityNameText(type.typeName);
    if (name === "Array") {
      if (!hasTypeArgumentArity(type, "Array<T>", 1, state)) {
        return { kind: "array", elementType: anyType };
      }
      return { kind: "array", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "ArrayLike") {
      if (!hasTypeArgumentArity(type, "ArrayLike<T>", 1, state)) {
        return { kind: "arrayLike", elementType: anyType };
      }
      return { kind: "arrayLike", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "ArrayIterator") {
      if (!hasTypeArgumentArity(type, "ArrayIterator<T>", 1, state)) {
        return { kind: "arrayIterator", elementType: anyType };
      }
      return { kind: "arrayIterator", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "ReadonlyArray") {
      if (!hasTypeArgumentArity(type, "ReadonlyArray<T>", 1, state)) {
        return { kind: "readonlyArray", elementType: anyType };
      }
      return { kind: "readonlyArray", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "Iterable") {
      if (!hasTypeArgumentArity(type, "Iterable<T>", 1, state)) {
        return { kind: "iterable", elementType: anyType };
      }
      return { kind: "iterable", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "IterableIterator") {
      if (!hasTypeArgumentCountInRange(type, "IterableIterator<T, TReturn, TNext>", 1, 3, state)) {
        return { kind: "arrayIterator", elementType: anyType };
      }
      return { kind: "arrayIterator", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "Set") {
      if (!hasTypeArgumentArity(type, "Set<T>", 1, state)) {
        return { kind: "set", elementType: anyType };
      }
      return { kind: "set", elementType: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    if (name === "NonNullable") {
      if (!hasTypeArgumentArity(type, "NonNullable<T>", 1, state)) {
        return { kind: "nonNullable", target: anyType };
      }
      return { kind: "nonNullable", target: typeFromTypeNode(type.typeArguments![0]!, environment, state) };
    }
    const resolved = resolveEntityName(type.typeName, environment, state, "type");
    if (resolved !== undefined) {
      return typeFromResolvedEntity(resolved, entityNameText(type.typeName), state, type.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? []);
    }
    if (name === "IArguments") {
      return iArgumentsType;
    }
    if (name === "TemplateStringsArray") {
      return templateStringsArrayType;
    }
    if (name === "RegExpExecArray") {
      return regExpExecArrayType;
    }
    if (name === "RegExpMatchArray") {
      return regExpMatchArrayType;
    }
    if (name === "Record") {
      if (!hasTypeArgumentArity(type, "Record<K, T>", 2, state)) {
        return {
          kind: "record",
          keyType: anyType,
          valueType: anyType,
        };
      }
      return {
        kind: "record",
        keyType: typeFromTypeNode(type.typeArguments![0]!, environment, state),
        valueType: typeFromTypeNode(type.typeArguments![1]!, environment, state),
      };
    }
    return anyType;
  }
  if (isTypePredicateNode(type)) {
    return typePredicateType(type, environment, state);
  }
  if (isTypeQueryNode(type)) {
    const bound = resolveTypeQueryName(type.exprName, environment, state);
    const typeArguments = type.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [];
    return bound === undefined ? anyType : instantiateTypeQuery(bound, typeArguments);
  }
  if (isImportTypeNode(type)) {
    return anyType;
  }
  return anyType;
}

function tupleTypeFromTypeNode(elements: NodeArray<TypeNode>, environment: TypeEnvironment, state?: CheckState): CheckedType {
  const tupleElements: TupleElementType[] = [];
  let restElementType: CheckedType | undefined;
  for (const element of elements) {
    const tupleElement = tupleElementTypeFromTypeNode(element, environment, state);
    if (tupleElement.rest) {
      restElementType = tupleElement.type;
    } else {
      tupleElements.push(tupleElement.name === undefined
        ? { type: tupleElement.type, optional: tupleElement.optional }
        : { name: tupleElement.name, type: tupleElement.type, optional: tupleElement.optional });
    }
  }
  return restElementType === undefined ? { kind: "tuple", elements: tupleElements } : { kind: "tuple", elements: tupleElements, restElementType };
}

function tupleElementTypeFromTypeNode(element: TypeNode, environment: TypeEnvironment, state?: CheckState): TupleElementType & { readonly rest: boolean } {
  if (isNamedTupleMember(element)) {
    if (element.dotDotDotToken !== undefined) {
      return {
        name: element.name.text,
        type: tupleRestElementType(typeFromTypeNode(element.type, environment, state)),
        optional: element.questionToken !== undefined,
        rest: true,
      };
    }
    return {
      name: element.name.text,
      type: typeFromTypeNode(element.type, environment, state),
      optional: element.questionToken !== undefined,
      rest: false,
    };
  }
  if (isRestTypeNode(element)) {
    return {
      type: tupleRestElementType(typeFromTypeNode(element.type, environment, state)),
      optional: false,
      rest: true,
    };
  }
  if (isOptionalTypeNode(element)) {
    return {
      type: typeFromTypeNode(element.type, environment, state),
      optional: true,
      rest: false,
    };
  }
  return {
    type: typeFromTypeNode(element, environment, state),
    optional: false,
    rest: false,
  };
}

function tupleRestElementType(type: CheckedType): CheckedType {
  if (type.kind === "array" || type.kind === "readonlyArray") {
    return type.elementType;
  }
  if (type.kind === "typeAliasInstance") {
    return tupleRestElementType(type.target);
  }
  return type;
}

function typePredicateType(type: TypePredicateNode, environment: TypeEnvironment, state: CheckState | undefined): CheckedType {
  const parameterName = type.parameterName.kind === Kind.ThisType ? "this" : type.parameterName.text;
  return {
    kind: "typePredicate",
    parameterName,
    assertedType: type.type === undefined ? unknownType : typeFromTypeNode(type.type, environment, state),
    asserts: type.assertsModifier !== undefined,
  };
}

function hasTypeArgumentArity(type: TypeReferenceNode, displayName: string, required: number, state: CheckState | undefined): boolean {
  const actual = type.typeArguments?.length ?? 0;
  if (actual === required) {
    return true;
  }
  state?.diagnostics.push(createDiagnostic(2314, displayName, String(required)));
  return false;
}

function hasTypeArgumentCountInRange(type: TypeReferenceNode, displayName: string, minimum: number, maximum: number, state: CheckState | undefined): boolean {
  const actual = type.typeArguments?.length ?? 0;
  if (actual >= minimum && actual <= maximum) {
    return true;
  }
  state?.diagnostics.push(createDiagnostic(2707, displayName, String(minimum), String(maximum)));
  return false;
}

function literalTypeNodeType(type: Extract<TypeNode, { readonly kind: Kind.LiteralType }>): CheckedType {
  const literal = type.literal;
  if (isStringLiteral(literal) || isNoSubstitutionTemplateLiteral(literal)) {
    return { kind: "stringLiteral", value: literal.text };
  }
  if (isNumericLiteral(literal)) {
    return { kind: "numberLiteral", value: literal.text };
  }
  if (isBigIntLiteral(literal)) {
    return anyType;
  }
  if (isPrefixUnaryExpression(literal) && (literal.operator === Kind.MinusToken || literal.operator === Kind.PlusToken) && isNumericLiteral(literal.operand)) {
    return numberType;
  }
  if (isKeywordExpression(literal)) {
    if (literal.kind === Kind.NullKeyword) {
      return nullType;
    }
    if (literal.kind === Kind.TrueKeyword || literal.kind === Kind.FalseKeyword) {
      return { kind: "booleanLiteral", value: literal.kind === Kind.TrueKeyword };
    }
  }
  return anyType;
}

function bindTypePredicateParameterIndex(type: CheckedType, parameters: readonly ParameterDeclaration[]): CheckedType {
  if (type.kind !== "typePredicate" || type.parameterIndex !== undefined || type.parameterName === "this") {
    return type;
  }
  const parameterIndex = parameters.findIndex(parameter => isIdentifier(parameter.name) && parameter.name.text === type.parameterName);
  return parameterIndex === -1 ? type : { ...type, parameterIndex };
}

function resolveTypeQueryName(typeName: EntityName, environment: TypeEnvironment, state: CheckState | undefined): CheckedType | undefined {
  if (isIdentifier(typeName)) {
    if (typeName.text === "") {
      return undefined;
    }
    const bound = environment.get(typeName.text);
    if (bound === undefined) {
      state?.diagnostics.push(createDiagnostic(2304, typeName.text));
    }
    return bound;
  }
  const namespace = resolveTypeQueryNamespace(typeName.left, environment, state);
  if (namespace === undefined) {
    return undefined;
  }
  const exported = namespace.exports.get(typeName.right.text);
  if (exported === undefined) {
    const namespaceName = namespace.kind === "namespace" ? namespace.name : namespace.diagnosticName;
    state?.diagnostics.push(createDiagnostic(2694, namespaceName, typeName.right.text));
    return undefined;
  }
  return exported;
}

function resolveTypeQueryNamespace(typeName: EntityName, environment: TypeEnvironment, state: CheckState | undefined): Extract<CheckedType, { readonly kind: "namespace" | "moduleNamespace" }> | undefined {
  const resolved = resolveTypeQueryName(typeName, environment, state);
  if (resolved?.kind === "namespace" || resolved?.kind === "moduleNamespace") {
    return resolved;
  }
  if (resolved?.kind === "namespaceAndType") {
    return resolved.namespace;
  }
  const namespaceName = entityNameText(typeName);
  if (namespaceName !== undefined && resolved !== undefined) {
    state?.diagnostics.push(createDiagnostic(2503, namespaceName));
  }
  return undefined;
}

function instantiateTypeQuery(type: CheckedType, typeArguments: readonly CheckedType[]): CheckedType {
  if (type.kind === "valueAndType") {
    return instantiateTypeQuery(type.value, typeArguments);
  }
  if (type.kind === "classConstructor") {
    return instantiateClassConstructor(type, typeArguments);
  }
  if (type.kind === "function") {
    return instantiateFunctionType(type, typeArguments);
  }
  if (type.kind === "functionDeclaration") {
    return instantiateTypeQuery(type.type, typeArguments);
  }
  if (type.kind === "intersection") {
    return { kind: "intersection", types: type.types.map(member => instantiateTypeQuery(member, typeArguments)) };
  }
  return type;
}

function instantiateClassConstructor(type: Extract<CheckedType, { readonly kind: "classConstructor" }>, typeArguments: readonly CheckedType[]): Extract<CheckedType, { readonly kind: "classConstructor" }> {
  const substitutions = classTypeSubstitutions(type, typeArguments);
  return instantiateClassConstructorWithSubstitutions(type, substitutions);
}

function instantiateClassConstructorForNew(type: Extract<CheckedType, { readonly kind: "classConstructor" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): Extract<CheckedType, { readonly kind: "classConstructor" }> {
  if (explicitTypeArguments.length > 0 || type.typeParameters.length === 0) {
    return instantiateClassConstructor(type, explicitTypeArguments);
  }
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < argumentTypes.length; index += 1) {
    const parameter = type.constructorParameters[index];
    if (parameter !== undefined) {
      inferTypeParameterSubstitutions(parameter, argumentTypes[index]!, substitutions);
    }
  }
  for (const typeParameter of type.typeParameters) {
    if (!substitutions.has(typeParameter)) {
      substitutions.set(typeParameter, anyType);
    }
  }
  return instantiateClassConstructorWithSubstitutions(type, substitutions);
}

function instantiateClassConstructorWithSubstitutions(type: Extract<CheckedType, { readonly kind: "classConstructor" }>, substitutions: ReadonlyMap<string, CheckedType>): Extract<CheckedType, { readonly kind: "classConstructor" }> {
  const typeArguments = type.typeParameters.length > 0
    ? type.typeParameters.map((typeParameter, index) => substitutions.get(typeParameter) ?? substituteType(type.typeArguments[index] ?? anyType, substitutions))
    : type.typeArguments.map(typeArgument => substituteType(typeArgument, substitutions));
  return {
    ...type,
    typeArguments,
    constructorParameters: type.constructorParameters.map(parameter => substituteType(parameter, substitutions)),
    members: type.members,
    ...optionalBaseType(type.baseType === undefined ? undefined : substituteType(type.baseType, substitutions)),
    ...optionalArrayBaseElementType(type.arrayBaseElementType === undefined ? undefined : substituteType(type.arrayBaseElementType, substitutions)),
  };
}

function instantiateFunctionType(type: Extract<CheckedType, { readonly kind: "function" }>, typeArguments: readonly CheckedType[]): CheckedType {
  if (type.typeParameters.length === 0) {
    return type;
  }
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < type.typeParameters.length; index += 1) {
    substitutions.set(type.typeParameters[index]!, typeArguments[index] ?? anyType);
  }
  return {
    kind: "function",
    typeParameters: [],
    parameters: type.parameters.map(parameter => substituteType(parameter, substitutions)),
    ...(type.parameterNames === undefined ? {} : { parameterNames: type.parameterNames }),
    ...(type.restParameterIndex === undefined ? {} : { restParameterIndex: type.restParameterIndex }),
    ...(type.minArgumentCount === undefined ? {} : { minArgumentCount: type.minArgumentCount }),
    ...(type.maxArgumentCount === undefined ? {} : { maxArgumentCount: type.maxArgumentCount }),
    ...(type.construct === undefined ? {} : { construct: type.construct }),
    returnType: substituteType(type.returnType, substitutions),
  };
}

function classTypeSubstitutions(type: Extract<CheckedType, { readonly kind: "classConstructor" }>, typeArguments: readonly CheckedType[]): ReadonlyMap<string, CheckedType> {
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < type.typeParameters.length; index += 1) {
    substitutions.set(type.typeParameters[index]!, typeArguments[index] ?? anyType);
  }
  return substitutions;
}

function classConstructorTypeArgumentSubstitutions(type: Extract<CheckedType, { readonly kind: "classConstructor" }>): ReadonlyMap<string, CheckedType> {
  return type.typeParameters.length === 0 ? emptyTypeSubstitutions : classTypeSubstitutions(type, type.typeArguments);
}

function classInstanceTypeArgumentSubstitutions(type: Extract<CheckedType, { readonly kind: "classInstance" }>): ReadonlyMap<string, CheckedType> {
  if (type.typeParameters.length === 0) {
    return emptyTypeSubstitutions;
  }
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < type.typeParameters.length; index += 1) {
    substitutions.set(type.typeParameters[index]!, type.typeArguments[index] ?? anyType);
  }
  return substitutions;
}

function substituteTypeIfNeeded(type: CheckedType, substitutions: ReadonlyMap<string, CheckedType>): CheckedType {
  return substitutions.size === 0 ? type : substituteType(type, substitutions);
}

function classInstancePropertyType(type: Extract<CheckedType, { readonly kind: "classInstance" }>, propertyName: string): CheckedType | undefined {
  const propertyType = type.members.propertyTypes.get(propertyName);
  return propertyType === undefined ? undefined : substituteTypeIfNeeded(propertyType, classInstanceTypeArgumentSubstitutions(type));
}

function classInstancePropertyTypes(type: Extract<CheckedType, { readonly kind: "classInstance" }>): ReadonlyMap<string, CheckedType> {
  const substitutions = classInstanceTypeArgumentSubstitutions(type);
  if (substitutions.size === 0) {
    return type.members.propertyTypes;
  }
  return new Map([...type.members.propertyTypes.entries()].map(([name, propertyType]) => [name, substituteType(propertyType, substitutions)]));
}

function classConstructorPropertyTypes(type: Extract<CheckedType, { readonly kind: "classConstructor" }>): ReadonlyMap<string, CheckedType> {
  const substitutions = classConstructorTypeArgumentSubstitutions(type);
  if (substitutions.size === 0) {
    return type.members.propertyTypes;
  }
  return new Map([...type.members.propertyTypes.entries()].map(([name, propertyType]) => [name, substituteType(propertyType, substitutions)]));
}

function interfaceTypeSubstitutions(type: Extract<CheckedType, { readonly kind: "interface" }>, typeArguments: readonly CheckedType[]): ReadonlyMap<string, CheckedType> {
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < type.members.typeParameters.length; index += 1) {
    substitutions.set(type.members.typeParameters[index]!, typeArguments[index] ?? anyType);
  }
  return substitutions;
}

function instantiateInterfaceType(type: Extract<CheckedType, { readonly kind: "interface" }>, typeArguments: readonly CheckedType[]): Extract<CheckedType, { readonly kind: "interface" }> {
  if (type.members.typeParameters.length === 0 && typeArguments.length === 0) {
    return type;
  }
  const substitutions = interfaceTypeSubstitutions(type, typeArguments);
  const instantiated = substituteType(type, substitutions) as Extract<CheckedType, { readonly kind: "interface" }>;
  return {
    ...instantiated,
    typeArguments: type.members.typeParameters.map(typeParameter => substitutions.get(typeParameter) ?? anyType),
  };
}

function typeFromResolvedEntity(type: CheckedType, diagnosticName: string | undefined, state: CheckState | undefined, typeArguments: readonly CheckedType[] = []): CheckedType {
  if (type.kind === "typeParameter") {
    return type;
  }
  if (type.kind === "valueOnly") {
    state?.diagnostics.push(createDiagnostic(2749, diagnosticName ?? type.name));
    return unresolvedType;
  }
  if (type.kind === "valueAndType") {
    return typeFromResolvedEntity(type.type, diagnosticName, state, typeArguments);
  }
  if (type.kind === "namespaceAndType") {
    return typeFromResolvedEntity(type.type, diagnosticName, state, typeArguments);
  }
  if (type.kind === "typeAlias") {
    const substitutions = new Map<string, CheckedType>();
    for (let index = 0; index < type.typeParameters.length; index += 1) {
      substitutions.set(type.typeParameters[index]!, typeArguments[index] ?? anyType);
    }
    const target = substituteType(type.target, substitutions);
    if (type.preserveDisplay || type.requiresExplicitDeclarationAnnotation) {
      return {
        kind: "typeAliasInstance",
        name: type.name,
        typeArguments: type.typeParameters.map(typeParameter => substitutions.get(typeParameter) ?? anyType),
        target,
        requiresExplicitDeclarationAnnotation: type.requiresExplicitDeclarationAnnotation,
      };
    }
    return target;
  }
  if (type.kind === "typeAliasInstance") {
    return type;
  }
  if (type.kind === "classConstructor") {
    const instantiated = instantiateClassConstructor(type, typeArguments);
    return {
      kind: "classInstance",
      name: instantiated.name,
      typeParameters: instantiated.typeParameters,
      typeArguments: instantiated.typeArguments,
      members: instantiated.members,
      ...optionalArrayBaseElementType(instantiated.arrayBaseElementType),
    };
  }
  if (type.kind === "interface") {
    return instantiateInterfaceType(type, typeArguments);
  }
  if (type.kind === "namespace") {
    return anyType;
  }
  return type;
}

function resolveEntityName(typeName: EntityName, environment: TypeEnvironment, state: CheckState | undefined, meaning: "type" | "namespace"): CheckedType | undefined {
  if (isIdentifier(typeName)) {
    if (typeName.text === "") {
      return undefined;
    }
    const bound = environment.get(typeName.text);
    if (bound === undefined && meaning === "type" && !ambientTypeNames.has(typeName.text)) {
      state?.diagnostics.push(createDiagnostic(2304, typeName.text));
    }
    if (bound === undefined && meaning === "namespace") {
      state?.diagnostics.push(createDiagnostic(2503, typeName.text));
    }
    if (bound !== undefined && meaning === "namespace" && namespaceMeaning(bound) === undefined && typeMeaning(bound) === undefined) {
      state?.diagnostics.push(createDiagnostic(2503, typeName.text));
    }
    return bound;
  }
  const namespace = resolveEntityNamespace(typeName.left, environment, state);
  if (namespace === undefined) {
    return undefined;
  }
  const exported = namespace.exports.get(typeName.right.text);
  if (exported === undefined) {
    state?.diagnostics.push(createDiagnostic(2694, namespace.name, typeName.right.text));
    return undefined;
  }
  return exported;
}

function resolveEntityNamespace(typeName: EntityName, environment: TypeEnvironment, state: CheckState | undefined): Extract<CheckedType, { readonly kind: "namespace" }> | undefined {
  const resolved = resolveEntityName(typeName, environment, state, "namespace");
  if (resolved?.kind === "namespace") {
    return resolved;
  }
  if (resolved?.kind === "namespaceAndType") {
    return resolved.namespace;
  }
  const namespaceName = entityNameText(typeName);
  if (namespaceName !== undefined && resolved !== undefined) {
    state?.diagnostics.push(createDiagnostic(2503, namespaceName));
  }
  return undefined;
}

function emptyCheckState(options: CompilerOptions = {}): CheckState {
  return { diagnostics: [], options, isJavaScriptFile: false, strictMode: false, strictModeReason: undefined, argumentsForbiddenInClassInitializerOrStaticBlock: false, insideFunction: false, iterationDepth: 0, yieldType: undefined };
}

function typeLiteralType(members: readonly TypeElement[], state: CheckState, environment: TypeEnvironment): CheckedType {
  checkTypeElements(members, state, environment, true);
  const properties = new Map<string, CheckedType>();
  const readonlyProperties = new Set<string>();
  const optionalProperties = new Set<string>();
  const methodProperties = new Set<string>();
  const callSignatures: CheckedFunctionType[] = [];
  let stringIndexType: CheckedType | undefined;
  let numberIndexType: CheckedType | undefined;
  for (const member of members) {
    if (isCallSignatureDeclaration(member)) {
      callSignatures.push(signatureDeclarationType(member, environment, state, false));
      continue;
    }
    if (isConstructSignatureDeclaration(member)) {
      callSignatures.push(signatureDeclarationType(member, environment, state, false, true));
      continue;
    }
    if (isPropertySignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        properties.set(name, propertySignatureDeclaredType(member, environment, state));
        if (member.postfixToken?.kind === Kind.QuestionToken) {
          optionalProperties.add(name);
        }
        if (hasModifier(member, Kind.ReadonlyKeyword)) {
          readonlyProperties.add(name);
        }
      }
      continue;
    }
    if (isMethodSignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        properties.set(name, signatureDeclarationType(member, environment, state, false));
        methodProperties.add(name);
        if (member.postfixToken?.kind === Kind.QuestionToken) {
          optionalProperties.add(name);
        }
      }
      continue;
    }
    if (isIndexSignatureDeclaration(member)) {
      const keyType = member.parameters[0]?.type;
      const valueType = member.type === undefined ? anyType : typeFromTypeNode(member.type, environment, undefined);
      if (keyType?.kind === Kind.StringKeyword) {
        stringIndexType = valueType;
      } else if (keyType?.kind === Kind.NumberKeyword) {
        numberIndexType = valueType;
      }
      continue;
    }
    if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        properties.set(name, accessorType(member, environment, state));
        if (isGetAccessorDeclaration(member)) {
          readonlyProperties.add(name);
        }
      }
    }
  }
  return {
    kind: "object",
    properties,
    readonlyProperties,
    optionalProperties,
    methodProperties,
    ...(callSignatures.length === 0 ? {} : { callSignatures }),
    ...(stringIndexType === undefined ? {} : { stringIndexType }),
    ...(numberIndexType === undefined ? {} : { numberIndexType }),
  };
}

function propertySignatureDeclaredType(member: PropertySignatureDeclaration, environment: TypeEnvironment, state: CheckState): CheckedType {
  const declaredType = member.type === undefined ? anyType : typeFromTypeNode(member.type, environment, state);
  return member.postfixToken?.kind === Kind.QuestionToken ? unionType([declaredType, undefinedType]) : declaredType;
}

function mappedType(type: Extract<TypeNode, { readonly kind: Kind.MappedType }>, state: CheckState, environment: TypeEnvironment): CheckedType {
  const mappedEnvironment = cloneTypeEnvironment(environment);
  const keyType = type.typeParameter.constraint === undefined ? anyType : typeFromTypeNode(type.typeParameter.constraint, environment, state);
  mappedEnvironment.set(type.typeParameter.name.text, { kind: "typeParameter", name: type.typeParameter.name.text, constraint: keyType });
  if (type.nameType !== undefined) {
    typeFromTypeNode(type.nameType, mappedEnvironment, state);
  }
  if (type.type === undefined) {
    if (strictOptionValue(state.options, "noImplicitAny")) {
      state.diagnostics.push(createDiagnostic(7039));
    }
    return { kind: "record", keyType, valueType: anyType };
  }
  const mappedArraySource = mappedArraySourceType(type.typeParameter.constraint, environment, state);
  return {
    kind: "record",
    keyType,
    valueType: typeFromTypeNode(type.type, mappedEnvironment, state),
    ...(mappedArraySource === undefined ? {} : { mappedArraySource }),
  };
}

function mappedArraySourceType(constraint: TypeNode | undefined, environment: TypeEnvironment, state: CheckState): CheckedType | undefined {
  if (constraint?.kind !== Kind.TypeOperator || constraint.operator !== Kind.KeyOfKeyword) {
    return undefined;
  }
  return typeFromTypeNode(constraint.type, environment, state);
}

function accessorType(accessor: GetAccessorDeclaration | SetAccessorDeclaration, environment: TypeEnvironment, state: CheckState): CheckedType {
  if (isGetAccessorDeclaration(accessor)) {
    return accessor.type === undefined ? anyType : typeFromTypeNode(accessor.type, environment, state);
  }
  return accessor.parameters[0]?.type === undefined ? anyType : typeFromTypeNode(accessor.parameters[0].type, environment, state);
}

function checkCallTypeArgumentArity(functionType: CheckedFunctionType, actual: number, state: CheckState): void {
  if (actual === 0) {
    return;
  }
  const expected = callTypeParameterCount(functionType);
  if (actual !== expected) {
    state.diagnostics.push(createDiagnostic(2558, String(expected), String(actual)));
  }
}

function callTypeParameterCount(functionType: CheckedFunctionType): number {
  const signatures = functionType.overloads === undefined || functionType.overloads.length === 0 ? [functionType] : functionType.overloads;
  const counts = uniqueInOrder(signatures.map(signature => signature.typeParameters.length));
  return counts.length === 1 ? counts[0]! : functionType.typeParameters.length;
}

function checkCallArguments(argumentTypes: readonly CheckedType[], functionType: Extract<CheckedType, { readonly kind: "function" }>, state: CheckState): void {
  const minArgumentCount = functionType.minArgumentCount ?? 0;
  const maxArgumentCount = functionType.maxArgumentCount;
  if (argumentTypes.length < minArgumentCount || (maxArgumentCount !== undefined && argumentTypes.length > maxArgumentCount)) {
    state.diagnostics.push(createDiagnostic(2554, displayArgumentCountRange(minArgumentCount, maxArgumentCount), String(argumentTypes.length)));
    return;
  }
  for (let index = 0; index < argumentTypes.length; index += 1) {
    const argumentType = argumentTypes[index]!;
    const parameterType = functionParameterTypeAt(functionType, index);
    if (parameterType === undefined) {
      continue;
    }
    if (parameterType.kind === "any" || argumentType.kind === "any" || parameterType.kind === "unknown" || parameterType.kind === "unresolved" || argumentType.kind === "unresolved") {
      continue;
    }
    if (!isAssignableTo(argumentType, parameterType, state.options)) {
      if (argumentType.kind === "object" && argumentType.contextualDiagnostics === true) {
        continue;
      }
      state.diagnostics.push(createDiagnostic(2345, displayType(argumentType), displayType(parameterType)));
      return;
    }
  }
}

function callArgumentsAssignable(argumentTypes: readonly CheckedType[], functionType: CheckedFunctionType, options: CompilerOptions): boolean {
  const minArgumentCount = functionType.minArgumentCount ?? 0;
  const maxArgumentCount = functionType.maxArgumentCount;
  if (argumentTypes.length < minArgumentCount || (maxArgumentCount !== undefined && argumentTypes.length > maxArgumentCount)) {
    return false;
  }
  for (let index = 0; index < argumentTypes.length; index += 1) {
    const argumentType = argumentTypes[index]!;
    const parameterType = functionParameterTypeAt(functionType, index);
    if (parameterType === undefined) {
      continue;
    }
    if (parameterType.kind === "any" || argumentType.kind === "any" || parameterType.kind === "unknown" || parameterType.kind === "unresolved" || argumentType.kind === "unresolved") {
      continue;
    }
    if (!isAssignableTo(argumentType, parameterType, options)) {
      return false;
    }
  }
  return true;
}

function checkFixedCallArguments(argumentTypes: readonly CheckedType[], parameterTypes: readonly CheckedType[], state: CheckState): void {
  for (let index = 0; index < parameterTypes.length && index < argumentTypes.length; index += 1) {
    const argumentType = argumentTypes[index]!;
    const parameterType = parameterTypes[index]!;
    if (parameterType.kind === "any" || argumentType.kind === "any" || parameterType.kind === "unknown" || parameterType.kind === "unresolved" || argumentType.kind === "unresolved") {
      continue;
    }
    if (!isAssignableTo(argumentType, parameterType, state.options)) {
      if (argumentType.kind === "object" && argumentType.contextualDiagnostics === true) {
        continue;
      }
      state.diagnostics.push(createDiagnostic(2345, displayType(argumentType), displayType(parameterType)));
      return;
    }
  }
}

function checkAssignable(actual: CheckedType, expected: CheckedType, state: CheckState): void {
  if (expected.kind === "any" || actual.kind === "any" || expected.kind === "unknown" || expected.kind === "unresolved" || actual.kind === "unresolved") {
    return;
  }
  if (!isAssignableTo(actual, expected, state.options)) {
    if (actual.kind === "object" && actual.contextualDiagnostics === true) {
      return;
    }
    state.diagnostics.push(assignabilityDiagnostic(actual, expected));
  }
}

function assignabilityDiagnostic(actual: CheckedType, expected: CheckedType): Diagnostic {
  if (actual.kind === "globalObject" && expected.kind !== "globalObject") {
    return createDiagnostic(2696);
  }
  const missingProperties = missingRequiredProperties(actual, expected);
  if (missingProperties !== undefined && missingProperties.length > 0) {
    const actualDisplay = displayType(actual);
    const expectedDisplay = displayType(expected);
    if (missingProperties.length === 1) {
      return createDiagnostic(2741, missingProperties[0]!, actualDisplay, expectedDisplay);
    }
    if (missingProperties.length <= 3) {
      return createDiagnostic(2739, actualDisplay, expectedDisplay, missingProperties.join(", "));
    }
    return createDiagnostic(2740, actualDisplay, expectedDisplay, missingProperties.slice(0, 4).join(", "), String(missingProperties.length - 4));
  }
  return createDiagnostic(2322, displayType(actual), displayType(expected));
}

function checkAssertionComparable(actual: CheckedType, target: CheckedType, state: CheckState): void {
  if (!typesSufficientlyOverlap(target, actual, state.options)) {
    state.diagnostics.push(createDiagnostic(2352, displayType(actual), displayType(target)));
  }
}

function typesSufficientlyOverlap(source: CheckedType, target: CheckedType, options: CompilerOptions = {}): boolean {
  if (source.kind === "any" || target.kind === "any" || source.kind === "unknown" || target.kind === "unknown" || source.kind === "unresolved" || target.kind === "unresolved") {
    return true;
  }
  if (source.kind === "union") {
    return source.types.some(type => typesSufficientlyOverlap(type, target, options));
  }
  if (target.kind === "union") {
    return target.types.some(type => typesSufficientlyOverlap(source, type, options));
  }
  if (source.kind === "tuple" && target.kind === "array") {
    return tupleSufficientlyOverlapsArray(source, target.elementType, options);
  }
  if (source.kind === "array" && target.kind === "tuple") {
    return tupleSufficientlyOverlapsArray(target, source.elementType, options);
  }
  return isAssignableTo(source, target, options) || isAssignableTo(target, source, options);
}

function tupleSufficientlyOverlapsArray(tuple: Extract<CheckedType, { readonly kind: "tuple" }>, arrayElementType: CheckedType, options: CompilerOptions): boolean {
  if (tuple.restElementType !== undefined && typesSufficientlyOverlap(tuple.restElementType, arrayElementType, options)) {
    return true;
  }
  return tuple.elements.some(element => typesSufficientlyOverlap(element.type, arrayElementType, options));
}

function requiresReturnValue(type: CheckedType): boolean {
  if (type.kind === "typePredicate") {
    return !type.asserts;
  }
  return type.kind !== "any" && type.kind !== "unresolved" && type.kind !== "undefined" && type.kind !== "void";
}

function returnTypeAllowsImplicitUndefined(type: CheckedType): boolean {
  if (type.kind === "typeAliasInstance") {
    return returnTypeAllowsImplicitUndefined(type.target);
  }
  if (type.kind === "union") {
    return type.types.some(returnTypeAllowsImplicitUndefined);
  }
  return type.kind === "any" || type.kind === "unresolved" || type.kind === "undefined" || type.kind === "void";
}

function isAbstractConstructorType(type: CheckedType): boolean {
  if (type.kind === "classConstructor") {
    return type.abstract;
  }
  if (type.kind === "union") {
    return type.types.some(isAbstractConstructorType);
  }
  return false;
}

function hasDeclareModifier(node: object): boolean {
  return hasModifier(node, Kind.DeclareKeyword);
}

function checkJavaScriptDeclareModifier(node: object, state: CheckState): void {
  if (state.isJavaScriptFile && hasDeclareModifier(node)) {
    state.diagnostics.push(createDiagnostic(8009, "declare"));
  }
}

function checkJavaScriptTypeAnnotation(state: CheckState): void {
  if (state.isJavaScriptFile) {
    state.diagnostics.push(createDiagnostic(8010));
  }
}

function hasDefaultModifier(node: { readonly modifiers?: readonly { readonly kind: Kind }[] }): boolean {
  return hasModifier(node, Kind.DefaultKeyword);
}

function isExportedElement(statement: Statement): boolean {
  return !isExportAssignment(statement) && hasModifier(statement, Kind.ExportKeyword);
}

function hasModifier(node: object, kind: Kind): boolean {
  return (node as { readonly modifiers?: readonly { readonly kind: Kind }[] }).modifiers?.some(modifier => modifier.kind === kind) === true;
}

function checkParameterModifiers(parameter: ParameterDeclaration, state: CheckState, allowParameterProperties: boolean): void {
  checkParameterModifierGrammar(parameter, state);
  if (!allowParameterProperties && isParameterProperty(parameter)) {
    state.diagnostics.push(createDiagnostic(2369));
  }
}

function checkParameterListGrammar(parameters: readonly ParameterDeclaration[], state: CheckState): void {
  let sawOptionalParameter = false;
  let reportedQuestionInitializer = false;
  for (let index = 0; index < parameters.length; index += 1) {
    const parameter = parameters[index]!;
    const hasRest = parameter.dotDotDotToken !== undefined;
    if (hasRest && index < parameters.length - 1) {
      state.diagnostics.push(createDiagnostic(1014));
    }
    if (hasRest && parameter.questionToken !== undefined) {
      state.diagnostics.push(createDiagnostic(1047));
    }
    if (hasRest && parameter.initializer !== undefined) {
      state.diagnostics.push(createDiagnostic(1048));
    }
    if (!reportedQuestionInitializer && parameter.questionToken !== undefined && parameter.initializer !== undefined) {
      state.diagnostics.push(createDiagnostic(1015));
      reportedQuestionInitializer = true;
    }
    if (sawOptionalParameter && isRequiredParameter(parameter)) {
      state.diagnostics.push(createDiagnostic(1016));
    }
    if (isOptionalParameter(parameter)) {
      sawOptionalParameter = true;
    }
  }
}

function isOptionalParameter(parameter: ParameterDeclaration): boolean {
  return parameter.questionToken !== undefined;
}

function isRequiredParameter(parameter: ParameterDeclaration): boolean {
  return parameter.questionToken === undefined && parameter.initializer === undefined && parameter.dotDotDotToken === undefined;
}

function checkParameterModifierGrammar(parameter: ParameterDeclaration, state: CheckState): void {
  let sawAccessibilityModifier = false;
  for (const modifier of parameter.modifiers ?? []) {
    if (modifier.kind === Kind.Decorator) {
      continue;
    }
    if (isAccessibilityModifierKind(modifier.kind)) {
      if (sawAccessibilityModifier) {
        state.diagnostics.push(createDiagnostic(1028));
        return;
      }
      sawAccessibilityModifier = true;
      continue;
    }
    const modifierName = invalidParameterModifierName(modifier.kind);
    if (modifierName !== undefined) {
      state.diagnostics.push(createDiagnostic(1090, modifierName));
      return;
    }
  }
  if (!isParameterProperty(parameter)) {
    return;
  }
  if (!isIdentifier(parameter.name)) {
    state.diagnostics.push(createDiagnostic(1187));
    return;
  }
  if (parameter.dotDotDotToken !== undefined) {
    state.diagnostics.push(createDiagnostic(1317));
  }
}

function isAccessibilityModifierKind(kind: Kind): boolean {
  return kind === Kind.PublicKeyword || kind === Kind.PrivateKeyword || kind === Kind.ProtectedKeyword;
}

function invalidParameterModifierName(kind: Kind): string | undefined {
  switch (kind) {
    case Kind.AsyncKeyword:
      return "async";
    case Kind.DeclareKeyword:
      return "declare";
    case Kind.ExportKeyword:
      return "export";
    case Kind.StaticKeyword:
      return "static";
    default:
      return undefined;
  }
}

function strictOptionValue(options: CompilerOptions, optionName: "noImplicitAny" | "strictNullChecks"): boolean {
  return options[optionName] === undefined ? options.strict !== false : options[optionName] === true;
}

function checkImplicitAnyParameter(parameter: ParameterDeclaration, state: CheckState, contextualType?: CheckedType): void {
  const hasParameterPropertyModifier = isParameterProperty(parameter);
  if (contextualType !== undefined && !hasParameterPropertyModifier) {
    return;
  }
  if (state.isJavaScriptFile && state.options.checkJs !== true && !hasParameterPropertyModifier) {
    return;
  }
  if ((!strictOptionValue(state.options, "noImplicitAny") && !hasParameterPropertyModifier) || parameter.type !== undefined || parameter.initializer !== undefined || !isIdentifier(parameter.name)) {
    return;
  }
  state.diagnostics.push(parameter.dotDotDotToken === undefined
    ? createDiagnostic(7006, parameter.name.text, "any")
    : createDiagnostic(7019, parameter.name.text));
}

function checkRestParameterArrayType(parameter: ParameterDeclaration, parameterType: CheckedType, state: CheckState): void {
  if (parameter.dotDotDotToken === undefined || parameter.type === undefined || isObjectBindingPattern(parameter.name) || isArrayBindingPattern(parameter.name)) {
    return;
  }
  if (parameter.questionToken !== undefined || !isRestParameterArrayType(parameterType)) {
    state.diagnostics.push(createDiagnostic(2370));
  }
}

function isRestParameterArrayType(type: CheckedType): boolean {
  if (type.kind === "any" || type.kind === "never" || type.kind === "array" || type.kind === "readonlyArray" || type.kind === "tuple") {
    return true;
  }
  if (type.kind === "typeAlias") {
    return isRestParameterArrayType(type.target);
  }
  if (type.kind === "typeAliasInstance") {
    return isRestParameterArrayType(type.target);
  }
  if (type.kind === "typeParameter") {
    return type.constraint !== undefined && isRestParameterArrayType(type.constraint);
  }
  if (type.kind === "record") {
    return type.mappedArraySource !== undefined && isRestParameterArrayType(type.mappedArraySource);
  }
  if (type.kind === "union") {
    return type.types.every(isRestParameterArrayType);
  }
  if (type.kind === "intersection") {
    return type.types.some(isRestParameterArrayType);
  }
  return false;
}

function parameterTypeFromDeclaration(parameter: ParameterDeclaration, environment: TypeEnvironment, state: CheckState | undefined, contextualType?: CheckedType): CheckedType {
  if (parameter.type !== undefined) {
    return typeFromTypeNode(parameter.type, environment, state);
  }
  if (contextualType !== undefined) {
    return contextualType;
  }
  return parameter.dotDotDotToken === undefined ? anyType : { kind: "array", elementType: anyType };
}

function signatureRestParameterIndex(parameters: readonly ParameterDeclaration[]): { readonly restParameterIndex: number } | Record<string, never> {
  const restParameterIndex = parameters.findIndex(parameter => parameter.dotDotDotToken !== undefined);
  return restParameterIndex === -1 ? {} : { restParameterIndex };
}

function signatureMinArgumentCount(parameters: readonly ParameterDeclaration[], state: CheckState): { readonly minArgumentCount: number } | Record<string, never> {
  if (state.isJavaScriptFile) {
    return {};
  }
  const optionalIndex = parameters.findIndex(parameter => parameter.questionToken !== undefined || parameter.initializer !== undefined || parameter.dotDotDotToken !== undefined);
  const minArgumentCount = optionalIndex === -1 ? parameters.length : optionalIndex;
  return minArgumentCount === 0 ? {} : { minArgumentCount };
}

function signatureMaxArgumentCount(parameters: readonly ParameterDeclaration[], state: CheckState, body?: Block): { readonly maxArgumentCount: number } | Record<string, never> {
  if (parameters.some(parameter => parameter.dotDotDotToken !== undefined)) {
    return {};
  }
  if (state.isJavaScriptFile && bodyContainsOwnArgumentsReference(body)) {
    return {};
  }
  return { maxArgumentCount: parameters.length };
}

function bodyContainsOwnArgumentsReference(body: Block | undefined): boolean {
  if (body === undefined) {
    return false;
  }
  return nodeContainsOwnArgumentsReference(body);
}

function nodeContainsOwnArgumentsReference(node: Node): boolean {
  const stack: Node[] = [node];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (isIdentifier(current) && isArgumentsValueReference(current)) {
      return true;
    }
    if (startsNewNonArrowArgumentsScope(current)) {
      continue;
    }
    current.forEachChild(child => {
      stack.push(child);
      return undefined;
    }, children => {
      for (let index = children.length - 1; index >= 0; index -= 1) {
        stack.push(children[index]!);
      }
      return undefined;
    });
  }
  return false;
}

function isArgumentsValueReference(identifier: Identifier): boolean {
  if (identifier.text !== "arguments") {
    return false;
  }
  const parent = identifier.parent;
  if (parent === undefined) {
    return true;
  }
  if (isPropertyAccessExpression(parent) && parent.name === identifier) {
    return false;
  }
  if (isPropertyAssignment(parent) && parent.name === identifier) {
    return false;
  }
  if (isParameterDeclaration(parent) && parent.name === identifier) {
    return false;
  }
  if (isVariableDeclaration(parent) && parent.name === identifier) {
    return false;
  }
  if (isBindingElement(parent) && (parent.name === identifier || parent.propertyName === identifier)) {
    return false;
  }
  if ((isFunctionDeclaration(parent) || isClassDeclaration(parent) || isInterfaceDeclaration(parent) || isTypeAliasDeclaration(parent)) && parent.name === identifier) {
    return false;
  }
  if ((isMethodDeclaration(parent) || isMethodSignatureDeclaration(parent) || isPropertySignatureDeclaration(parent) || isGetAccessorDeclaration(parent) || isSetAccessorDeclaration(parent)) && parent.name === identifier) {
    return false;
  }
  if (isQualifiedName(parent) && parent.right === identifier) {
    return false;
  }
  if (isLabeledStatement(parent) && parent.label === identifier) {
    return false;
  }
  return true;
}

function startsNewNonArrowArgumentsScope(node: Node): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.Constructor
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.ClassDeclaration
    || node.kind === Kind.ClassExpression;
}

function displayArgumentCountRange(minArgumentCount: number, maxArgumentCount: number | undefined): string {
  if (maxArgumentCount === undefined || minArgumentCount === maxArgumentCount) {
    return String(minArgumentCount);
  }
  return `${minArgumentCount}-${maxArgumentCount}`;
}

function inferArrayLiteral(elements: readonly Expression[], state: CheckState, environment: TypeEnvironment, contextualElementType?: CheckedType, contextualArrayType?: CheckedType): CheckedType {
  if (elements.length === 0) {
    if (contextualArrayType !== undefined) {
      return contextualArrayType;
    }
    return { kind: "array", elementType: strictOptionValue(state.options, "noImplicitAny") ? neverType : anyType };
  }
  const elementTypes = elements.map(element => inferExpressionWithContext(element, state, environment, contextualElementType));
  if (contextualElementType !== undefined && !typeContainsTypeParameter(contextualElementType)) {
    for (let index = 0; index < elementTypes.length; index += 1) {
      if (isObjectLiteralExpression(elements[index]!)) {
        continue;
      }
      const elementType = elementTypes[index]!;
      checkAssignable(elementType, contextualElementType, state);
    }
  }
  if (contextualArrayType !== undefined && !typeContainsTypeParameter(contextualArrayType)) {
    return contextualArrayType;
  }
  const first = elementTypes[0]!;
  return { kind: "array", elementType: elementTypes.every(type => isSameType(type, first)) ? first : unionType(elementTypes) };
}

function inferTupleLiteral(elements: readonly Expression[], state: CheckState, environment: TypeEnvironment, contextualTuple: Extract<CheckedType, { readonly kind: "tuple" }>): CheckedType {
  return {
    kind: "tuple",
    elements: elements.map((element, index) => {
      const contextualElementType = contextualTuple.elements[index]?.type ?? contextualTuple.restElementType;
      return {
        type: inferExpressionWithContext(element, state, environment, contextualElementType),
        optional: false,
      };
    }),
  };
}

function typeContainsTypeParameter(type: CheckedType): boolean {
  if (type.kind === "typeParameter") {
    return true;
  }
  if (type.kind === "array" || type.kind === "readonlyArray" || type.kind === "arrayLike" || type.kind === "arrayIterator" || type.kind === "iterable" || type.kind === "set") {
    return typeContainsTypeParameter(type.elementType);
  }
  if (type.kind === "function") {
    return type.parameters.some(typeContainsTypeParameter)
      || typeContainsTypeParameter(type.returnType)
      || type.overloads?.some(typeContainsTypeParameter) === true;
  }
  if (type.kind === "tuple") {
    return type.elements.some(element => typeContainsTypeParameter(element.type))
      || (type.restElementType !== undefined && typeContainsTypeParameter(type.restElementType));
  }
  if (type.kind === "object") {
    return [...type.properties.values()].some(typeContainsTypeParameter)
      || type.callSignatures?.some(typeContainsTypeParameter) === true
      || (type.stringIndexType !== undefined && typeContainsTypeParameter(type.stringIndexType))
      || (type.numberIndexType !== undefined && typeContainsTypeParameter(type.numberIndexType));
  }
  if (type.kind === "interface") {
    return [...type.members.properties.values()].some(typeContainsTypeParameter)
      || type.members.callSignatures.some(typeContainsTypeParameter)
      || (type.members.stringIndexType !== undefined && typeContainsTypeParameter(type.members.stringIndexType))
      || (type.members.numberIndexType !== undefined && typeContainsTypeParameter(type.members.numberIndexType));
  }
  if (type.kind === "classInstance" || type.kind === "classConstructor") {
    return type.typeArguments.some(typeContainsTypeParameter)
      || (type.kind === "classConstructor" && type.constructorParameters.some(typeContainsTypeParameter))
      || (type.kind === "classConstructor" && type.baseType !== undefined && typeContainsTypeParameter(type.baseType))
      || (type.arrayBaseElementType !== undefined && typeContainsTypeParameter(type.arrayBaseElementType));
  }
  if (type.kind === "builtinConstructor") {
    return typeContainsTypeParameter(type.instanceType)
      || type.constructorParameters.some(typeContainsTypeParameter)
      || [...type.staticProperties.values()].some(typeContainsTypeParameter);
  }
  if (type.kind === "union" || type.kind === "intersection") {
    return type.types.some(typeContainsTypeParameter);
  }
  if (type.kind === "typeAlias") {
    return typeContainsTypeParameter(type.target);
  }
  if (type.kind === "typeAliasInstance") {
    return type.typeArguments.some(typeContainsTypeParameter) || typeContainsTypeParameter(type.target);
  }
  if (type.kind === "nonNullable") {
    return typeContainsTypeParameter(type.target);
  }
  if (type.kind === "record") {
    return typeContainsTypeParameter(type.keyType)
      || typeContainsTypeParameter(type.valueType)
      || (type.mappedArraySource !== undefined && typeContainsTypeParameter(type.mappedArraySource));
  }
  if (type.kind === "typePredicate") {
    return typeContainsTypeParameter(type.assertedType);
  }
  return false;
}

function contextualArrayElementType(contextualType: CheckedType | undefined): CheckedType | undefined {
  if (contextualType === undefined) {
    return undefined;
  }
  if (contextualType.kind === "typeAliasInstance") {
    return contextualArrayElementType(contextualType.target);
  }
  if (contextualType.kind === "array" || contextualType.kind === "readonlyArray") {
    return contextualType.elementType;
  }
  return undefined;
}

function unionType(types: readonly CheckedType[]): CheckedType {
  const flattened = types.flatMap(type => type.kind === "union" ? type.types : [type]);
  if (flattened.some(type => type.kind === "any")) {
    return anyType;
  }
  if (flattened.some(type => type.kind === "unknown")) {
    return unknownType;
  }
  const unique = uniqueTypes(flattened);
  return unique.length === 1 ? unique[0]! : { kind: "union", types: unique };
}

function nonNullableType(type: CheckedType): CheckedType {
  if (type.kind === "union") {
    const members = type.types.filter(member => member.kind !== "null" && member.kind !== "undefined");
    return members.length === 0 ? unresolvedType : unionType(members);
  }
  if (type.kind === "null" || type.kind === "undefined") {
    return unresolvedType;
  }
  if (type.kind === "nonNullable") {
    return nonNullableType(type.target);
  }
  return type;
}

function instantiateFunctionReturnType(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): CheckedType {
  if (functionType.typeParameters.length === 0) {
    return functionType.returnType;
  }
  return substituteType(functionType.returnType, functionTypeCallSubstitutions(functionType, explicitTypeArguments, argumentTypes));
}

function instantiateFunctionTypeForCall(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): Extract<CheckedType, { readonly kind: "function" }> {
  const substitutions = functionTypeCallSubstitutions(functionType, explicitTypeArguments, argumentTypes);
  return {
    kind: "function",
    typeParameters: functionType.typeParameters.length === 0 ? [] : functionType.typeParameters,
    parameters: functionType.parameters.map(parameter => substituteType(parameter, substitutions)),
    ...(functionType.parameterNames === undefined ? {} : { parameterNames: functionType.parameterNames }),
    ...(functionType.restParameterIndex === undefined ? {} : { restParameterIndex: functionType.restParameterIndex }),
    ...(functionType.minArgumentCount === undefined ? {} : { minArgumentCount: functionType.minArgumentCount }),
    ...(functionType.maxArgumentCount === undefined ? {} : { maxArgumentCount: functionType.maxArgumentCount }),
    ...(functionType.construct === undefined ? {} : { construct: functionType.construct }),
    ...(functionType.overloads === undefined ? {} : { overloads: functionType.overloads.map(overload => substituteType(overload, substitutions) as CheckedFunctionType) }),
    returnType: substituteType(functionType.returnType, substitutions),
  };
}

function functionTypeCallSubstitutions(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): ReadonlyMap<string, CheckedType> {
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < explicitTypeArguments.length && index < functionType.typeParameters.length; index += 1) {
    substitutions.set(functionType.typeParameters[index]!, explicitTypeArguments[index]!);
  }
  for (let index = 0; index < argumentTypes.length; index += 1) {
    const parameter = functionParameterTypeAt(functionType, index);
    if (parameter !== undefined) {
      inferTypeParameterSubstitutions(parameter, argumentTypes[index]!, substitutions);
    }
  }
  for (const typeParameter of functionType.typeParameters) {
    if (!substitutions.has(typeParameter)) {
      substitutions.set(typeParameter, anyType);
    }
  }
  return substitutions;
}

function functionParameterTypeAt(functionType: Extract<CheckedType, { readonly kind: "function" }>, argumentIndex: number): CheckedType | undefined {
  if (functionType.restParameterIndex !== undefined && argumentIndex >= functionType.restParameterIndex) {
    const restParameterType = functionType.parameters[functionType.restParameterIndex];
    return restParameterType === undefined ? undefined : restArgumentElementType(restParameterType);
  }
  return functionType.parameters[argumentIndex];
}

function restArgumentElementType(restParameterType: CheckedType): CheckedType {
  if (restParameterType.kind === "array" || restParameterType.kind === "readonlyArray" || restParameterType.kind === "arrayLike" || restParameterType.kind === "arrayIterator" || restParameterType.kind === "iterable" || restParameterType.kind === "set") {
    return restParameterType.elementType;
  }
  if (restParameterType.kind === "typeAliasInstance") {
    return restArgumentElementType(restParameterType.target);
  }
  return restParameterType;
}

function readonlyArrayAssignableElementType(type: CheckedType): CheckedType | undefined {
  if (type.kind === "array" || type.kind === "readonlyArray") {
    return type.elementType;
  }
  if (type.kind === "classInstance") {
    return type.arrayBaseElementType;
  }
  if (type.kind === "typeAliasInstance") {
    return readonlyArrayAssignableElementType(type.target);
  }
  return undefined;
}

function mutableArrayAssignableElementType(type: CheckedType): CheckedType | undefined {
  if (type.kind === "array") {
    return type.elementType;
  }
  if (type.kind === "classInstance") {
    return type.arrayBaseElementType;
  }
  if (type.kind === "typeAliasInstance") {
    return mutableArrayAssignableElementType(type.target);
  }
  return undefined;
}

function inferTypeParameterSubstitutions(parameter: CheckedType, argument: CheckedType, substitutions: Map<string, CheckedType>): void {
  if (parameter.kind === "typeParameter") {
    if (!substitutions.has(parameter.name)) {
      substitutions.set(parameter.name, argument);
    }
    return;
  }
  if (parameter.kind === "array" && argument.kind === "array") {
    inferTypeParameterSubstitutions(parameter.elementType, argument.elementType, substitutions);
  }
  if (parameter.kind === "readonlyArray") {
    const argumentElementType = readonlyArrayAssignableElementType(argument);
    if (argumentElementType !== undefined) {
      inferTypeParameterSubstitutions(parameter.elementType, argumentElementType, substitutions);
    }
  }
  if ((parameter.kind === "arrayLike" || parameter.kind === "arrayIterator" || parameter.kind === "iterable" || parameter.kind === "set") && parameter.kind === argument.kind) {
    inferTypeParameterSubstitutions(parameter.elementType, argument.elementType, substitutions);
  }
  if (parameter.kind === "tuple" && argument.kind === "tuple") {
    for (let index = 0; index < parameter.elements.length && index < argument.elements.length; index += 1) {
      inferTypeParameterSubstitutions(parameter.elements[index]!.type, argument.elements[index]!.type, substitutions);
    }
    if (parameter.restElementType !== undefined && argument.restElementType !== undefined) {
      inferTypeParameterSubstitutions(parameter.restElementType, argument.restElementType, substitutions);
    }
  }
}

function substituteType(type: CheckedType, substitutions: ReadonlyMap<string, CheckedType>): CheckedType {
  if (substitutions.size === 0) {
    return type;
  }
  return substituteTypeWithContext(type, substitutions, {
    types: new WeakMap<object, CheckedType>(),
    interfaceMembers: new WeakMap<InterfaceMembers, InterfaceMembers>(),
  });
}

function substituteTypeWithContext(type: CheckedType, substitutions: ReadonlyMap<string, CheckedType>, context: SubstitutionContext): CheckedType {
  if (type.kind === "typeParameter") {
    return substitutions.get(type.name) ?? type;
  }
  const cached = context.types.get(type);
  if (cached !== undefined) {
    return cached;
  }
  if (type.kind === "array") {
    const result: CheckedType = { kind: "array", elementType: substituteTypeWithContext(type.elementType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "readonlyArray") {
    const result: CheckedType = { kind: "readonlyArray", elementType: substituteTypeWithContext(type.elementType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "arrayLike") {
    const result: CheckedType = { kind: "arrayLike", elementType: substituteTypeWithContext(type.elementType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "arrayIterator") {
    const result: CheckedType = { kind: "arrayIterator", elementType: substituteTypeWithContext(type.elementType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "iterable") {
    const result: CheckedType = { kind: "iterable", elementType: substituteTypeWithContext(type.elementType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "set") {
    const result: CheckedType = { kind: "set", elementType: substituteTypeWithContext(type.elementType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "tuple") {
    const result: CheckedType = {
      kind: "tuple",
      elements: type.elements.map(element => ({ ...element, type: substituteTypeWithContext(element.type, substitutions, context) })),
      ...(type.restElementType === undefined ? {} : { restElementType: substituteTypeWithContext(type.restElementType, substitutions, context) }),
    };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "nonNullable") {
    const result = nonNullableType(substituteTypeWithContext(type.target, substitutions, context));
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "typePredicate") {
    const result: CheckedType = { ...type, assertedType: substituteTypeWithContext(type.assertedType, substitutions, context) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "union") {
    const result: CheckedType = { kind: "union", types: type.types.map(unionType => substituteTypeWithContext(unionType, substitutions, context)) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "intersection") {
    const result: CheckedType = { kind: "intersection", types: type.types.map(intersectionType => substituteTypeWithContext(intersectionType, substitutions, context)) };
    context.types.set(type, result);
    return result;
  }
  if (type.kind === "object") {
    const result: CheckedType = { ...type };
    context.types.set(type, result);
    Object.assign(result, {
      properties: new Map([...type.properties.entries()].map(([name, propertyType]) => [name, substituteTypeWithContext(propertyType, substitutions, context)])),
      readonlyProperties: type.readonlyProperties,
      optionalProperties: type.optionalProperties,
      methodProperties: type.methodProperties,
      ...(type.callSignatures === undefined ? {} : { callSignatures: type.callSignatures.map(signature => substituteTypeWithContext(signature, substitutions, context) as CheckedFunctionType) }),
      ...(type.stringIndexType === undefined ? {} : { stringIndexType: substituteTypeWithContext(type.stringIndexType, substitutions, context) }),
      ...(type.numberIndexType === undefined ? {} : { numberIndexType: substituteTypeWithContext(type.numberIndexType, substitutions, context) }),
      ...(type.contextualDiagnostics === undefined ? {} : { contextualDiagnostics: type.contextualDiagnostics }),
    });
    return result;
  }
  if (type.kind === "interface") {
    const result: CheckedType = { ...type };
    context.types.set(type, result);
    Object.assign(result, {
      ...(type.typeArguments === undefined ? {} : { typeArguments: type.typeArguments.map(typeArgument => substituteTypeWithContext(typeArgument, substitutions, context)) }),
      members: substituteInterfaceMembers(type.members, substitutions, context),
    });
    return result;
  }
  if (type.kind === "classConstructor") {
    const typeArguments = type.typeParameters.length > 0
      ? type.typeParameters.map((typeParameter, index) => substitutions.get(typeParameter) ?? substituteTypeWithContext(type.typeArguments[index] ?? anyType, substitutions, context))
      : type.typeArguments.map(typeArgument => substituteTypeWithContext(typeArgument, substitutions, context));
    const result: CheckedType = { ...type, typeArguments };
    context.types.set(type, result);
    Object.assign(result, {
      constructorParameters: type.constructorParameters.map(parameter => substituteTypeWithContext(parameter, substitutions, context)),
      members: type.members,
      ...optionalBaseType(type.baseType === undefined ? undefined : substituteTypeWithContext(type.baseType, substitutions, context)),
      ...optionalArrayBaseElementType(type.arrayBaseElementType === undefined ? undefined : substituteTypeWithContext(type.arrayBaseElementType, substitutions, context)),
    });
    return result;
  }
  if (type.kind === "classInstance") {
    const result: CheckedType = { ...type, typeArguments: type.typeArguments.map(typeArgument => substituteTypeWithContext(typeArgument, substitutions, context)) };
    context.types.set(type, result);
    Object.assign(result, {
      members: type.members,
      ...optionalArrayBaseElementType(type.arrayBaseElementType === undefined ? undefined : substituteTypeWithContext(type.arrayBaseElementType, substitutions, context)),
    });
    return result;
  }
  if (type.kind === "builtinConstructor") {
    const result: CheckedType = { ...type };
    context.types.set(type, result);
    Object.assign(result, {
      instanceType: substituteTypeWithContext(type.instanceType, substitutions, context),
      constructorParameters: type.constructorParameters.map(parameter => substituteTypeWithContext(parameter, substitutions, context)),
      staticProperties: new Map([...type.staticProperties.entries()].map(([name, propertyType]) => [name, substituteTypeWithContext(propertyType, substitutions, context)])),
    });
    return result;
  }
  if (type.kind === "function") {
    const result: CheckedType = { ...type };
    context.types.set(type, result);
    Object.assign(result, {
      parameters: type.parameters.map(parameter => substituteTypeWithContext(parameter, substitutions, context)),
      ...(type.parameterNames === undefined ? {} : { parameterNames: type.parameterNames }),
      ...(type.restParameterIndex === undefined ? {} : { restParameterIndex: type.restParameterIndex }),
      ...(type.minArgumentCount === undefined ? {} : { minArgumentCount: type.minArgumentCount }),
      ...(type.maxArgumentCount === undefined ? {} : { maxArgumentCount: type.maxArgumentCount }),
      ...(type.construct === undefined ? {} : { construct: type.construct }),
      ...(type.overloads === undefined ? {} : { overloads: type.overloads.map(overload => substituteTypeWithContext(overload, substitutions, context) as CheckedFunctionType) }),
      returnType: substituteTypeWithContext(type.returnType, substitutions, context),
    });
    return result;
  }
  if (type.kind === "typeAliasInstance") {
    const result: CheckedType = { ...type };
    context.types.set(type, result);
    Object.assign(result, {
      typeArguments: type.typeArguments.map(typeArgument => substituteTypeWithContext(typeArgument, substitutions, context)),
      target: substituteTypeWithContext(type.target, substitutions, context),
    });
    return result;
  }
  if (type.kind === "record") {
    const result: CheckedType = {
      kind: "record",
      keyType: substituteTypeWithContext(type.keyType, substitutions, context),
      valueType: substituteTypeWithContext(type.valueType, substitutions, context),
      ...(type.mappedArraySource === undefined ? {} : { mappedArraySource: substituteTypeWithContext(type.mappedArraySource, substitutions, context) }),
    };
    context.types.set(type, result);
    return result;
  }
  context.types.set(type, type);
  return type;
}

function substituteInterfaceMembers(members: InterfaceMembers, substitutions: ReadonlyMap<string, CheckedType>, context: SubstitutionContext): InterfaceMembers {
  const cached = context.interfaceMembers.get(members);
  if (cached !== undefined) {
    return cached;
  }
  const result: InterfaceMembers = { ...members };
  context.interfaceMembers.set(members, result);
  Object.assign(result, {
    properties: new Map([...members.properties.entries()].map(([name, propertyType]) => [name, substituteTypeWithContext(propertyType, substitutions, context)])),
    callSignatures: members.callSignatures.map(signature => substituteTypeWithContext(signature, substitutions, context) as CheckedFunctionType),
    ...(members.stringIndexType === undefined ? {} : { stringIndexType: substituteTypeWithContext(members.stringIndexType, substitutions, context) }),
    ...(members.numberIndexType === undefined ? {} : { numberIndexType: substituteTypeWithContext(members.numberIndexType, substitutions, context) }),
  });
  return result;
}

function isAssignableTo(actual: CheckedType, expected: CheckedType, options: CompilerOptions = {}): boolean {
  if (actual.kind === "accessorProperty") {
    return isAssignableTo(actual.type, expected, options);
  }
  if (expected.kind === "accessorProperty") {
    return isAssignableTo(actual, expected.type, options);
  }
  if (actual.kind === "unassignedVariable") {
    return isAssignableTo(actual.type, expected, options);
  }
  if (expected.kind === "unassignedVariable") {
    return isAssignableTo(actual, expected.type, options);
  }
  if (actual.kind === "valueOnly") {
    return isAssignableTo(actual.type, expected, options);
  }
  if (expected.kind === "valueOnly") {
    return isAssignableTo(actual, expected.type, options);
  }
  if (actual.kind === "valueAndType") {
    return isAssignableTo(actual.value, expected, options);
  }
  if (expected.kind === "valueAndType") {
    return isAssignableTo(actual, expected.value, options);
  }
  if (actual.kind === "functionDeclaration") {
    return isAssignableTo(actual.type, expected, options);
  }
  if (expected.kind === "functionDeclaration") {
    return isAssignableTo(actual, expected.type, options);
  }
  if (actual.kind === "namespaceAndType") {
    return isAssignableTo(actual.type, expected, options);
  }
  if (expected.kind === "namespaceAndType") {
    return isAssignableTo(actual, expected.type, options);
  }
  if (actual.kind === "nonNullable") {
    return isAssignableTo(nonNullableType(actual.target), expected, options);
  }
  if (expected.kind === "nonNullable") {
    return isAssignableTo(actual, nonNullableType(expected.target), options);
  }
  if (actual.kind === "typeAliasInstance") {
    return isAssignableTo(actual.target, expected, options);
  }
  if (expected.kind === "typeAliasInstance") {
    return isAssignableTo(actual, expected.target, options);
  }
  if (actual.kind === "any" || expected.kind === "any") {
    return true;
  }
  if (expected.kind === "unknown") {
    return true;
  }
  if (actual.kind === "never") {
    return true;
  }
  if (!strictOptionValue(options, "strictNullChecks") && (actual.kind === "null" || actual.kind === "undefined")) {
    return true;
  }
  if (expected.kind === "globalObject") {
    return actual.kind !== "null" && actual.kind !== "undefined";
  }
  if (actual.kind === "globalObject") {
    return false;
  }
  if (actual.kind === "stringLiteral") {
    return expected.kind === "string" || (expected.kind === "stringLiteral" && actual.value === expected.value);
  }
  if (expected.kind === "stringLiteral") {
    return false;
  }
  if (actual.kind === "numberLiteral") {
    return expected.kind === "number" || (expected.kind === "numberLiteral" && actual.value === expected.value);
  }
  if (expected.kind === "numberLiteral") {
    return false;
  }
  if (actual.kind === "booleanLiteral") {
    return expected.kind === "boolean" || (expected.kind === "booleanLiteral" && actual.value === expected.value);
  }
  if (expected.kind === "booleanLiteral") {
    return false;
  }
  if (isEmptyObjectLikeType(expected)) {
    if (actual.kind === "union") {
      return actual.types.every(type => isAssignableTo(type, expected, options));
    }
    return actual.kind !== "null" && actual.kind !== "undefined";
  }
  if (actual.kind === expected.kind && actual.kind !== "array" && actual.kind !== "readonlyArray" && actual.kind !== "arrayLike" && actual.kind !== "arrayIterator" && actual.kind !== "builtinConstructor" && actual.kind !== "classConstructor" && actual.kind !== "classInstance" && actual.kind !== "function" && actual.kind !== "interface" && actual.kind !== "intersection" && actual.kind !== "iterable" && actual.kind !== "namespace" && actual.kind !== "object" && actual.kind !== "record" && actual.kind !== "set" && actual.kind !== "thisClass" && actual.kind !== "tuple" && actual.kind !== "typeAlias" && actual.kind !== "typeParameter" && actual.kind !== "typePredicate" && actual.kind !== "union") {
    return true;
  }
  if (actual.kind === "classConstructor" && expected.kind === "classConstructor") {
    return classConstructorsAssignableTo(actual, expected, options);
  }
  if (actual.kind === "classInstance" && expected.kind === "classInstance") {
    return classInstancesAssignableTo(actual, expected, options);
  }
  if (actual.kind === "object" && expected.kind === "classInstance") {
    return expected.members.nominalProperties.size === 0
      && objectPropertiesAssignableTo(actual.properties, classInstancePropertyTypes(expected), options, expected.members.optionalProperties, actual.optionalProperties);
  }
  if (actual.kind === "interface" && expected.kind === "classInstance") {
    return expected.members.nominalProperties.size === 0
      && objectPropertiesAssignableTo(actual.members.properties, classInstancePropertyTypes(expected), options, expected.members.optionalProperties, actual.members.optionalProperties);
  }
  if (actual.kind === "object" && expected.kind === "object") {
    return objectPropertiesAssignableTo(actual.properties, expected.properties, options, expected.optionalProperties, actual.optionalProperties)
      && callSignaturesAssignableTo(actual.callSignatures ?? [], expected.callSignatures ?? [], options)
      && objectPropertiesAssignableToIndexSignatures(actual.properties, expected.stringIndexType, expected.numberIndexType, options);
  }
  if (actual.kind === "string" && expected.kind === "object" && expected.numberIndexType !== undefined && expected.properties.size === 0 && expected.stringIndexType === undefined && (expected.callSignatures?.length ?? 0) === 0) {
    return isAssignableTo(stringType, expected.numberIndexType, options);
  }
  if ((actual.kind === "array" || actual.kind === "readonlyArray") && expected.kind === "object") {
    return typePropertiesAssignableTo(actual, expected.properties, options, expected.optionalProperties);
  }
  if (actual.kind === "classConstructor" && expected.kind === "object") {
    return typePropertiesAssignableTo(actual, expected.properties, options, expected.optionalProperties)
      && callSignaturesAssignableTo([classConstructorConstructSignature(actual)], expected.callSignatures ?? [], options);
  }
  if (actual.kind === "classConstructor" && expected.kind === "interface") {
    return typePropertiesAssignableTo(actual, expected.members.properties, options, expected.members.optionalProperties)
      && callSignaturesAssignableTo([classConstructorConstructSignature(actual)], expected.members.callSignatures, options);
  }
  if ((actual.kind === "array" || actual.kind === "readonlyArray") && expected.kind === "interface") {
    return typePropertiesAssignableTo(actual, expected.members.properties, options, expected.members.optionalProperties);
  }
  if (actual.kind === "interface" && expected.kind === "object") {
    return objectPropertiesAssignableTo(actual.members.properties, expected.properties, options, expected.optionalProperties, actual.members.optionalProperties)
      && callSignaturesAssignableTo(actual.members.callSignatures, expected.callSignatures ?? [], options)
      && interfaceIndexSignaturesAssignableToObject(actual.members, expected.stringIndexType, expected.numberIndexType, options);
  }
  if (actual.kind === "classInstance" && expected.kind === "object") {
    return objectPropertiesAssignableTo(classInstancePropertyTypes(actual), expected.properties, options, expected.optionalProperties, actual.members.optionalProperties)
      && callSignaturesAssignableTo([], expected.callSignatures ?? [], options)
      && indexSignaturesAssignableTo(undefined, undefined, expected.stringIndexType, expected.numberIndexType, options);
  }
  if (actual.kind === "object" && expected.kind === "record") {
    return [...actual.properties.values()].every(actualPropertyType => isAssignableTo(actualPropertyType, expected.valueType, options));
  }
  if (actual.kind === "object" && expected.kind === "arrayLike") {
    const lengthType = actual.properties.get("length");
    return lengthType !== undefined && isAssignableTo(lengthType, numberType, options);
  }
  if (actual.kind === "record" && expected.kind === "record") {
    return isAssignableTo(actual.keyType, expected.keyType, options) && isAssignableTo(actual.valueType, expected.valueType, options);
  }
  if (actual.kind === "object" && expected.kind === "interface") {
    return objectPropertiesAssignableToInterface(actual.properties, actual.callSignatures ?? [], expected.members, options, actual.optionalProperties);
  }
  if (actual.kind === "interface" && expected.kind === "interface") {
    return objectPropertiesAssignableToInterface(actual.members.properties, actual.members.callSignatures, expected.members, options, actual.members.optionalProperties, actual.members.stringIndexType, actual.members.numberIndexType, true);
  }
  if (actual.kind === "classInstance" && expected.kind === "interface") {
    return objectPropertiesAssignableToInterface(classInstancePropertyTypes(actual), [], expected.members, options, actual.members.optionalProperties, undefined, undefined, true);
  }
  if (actual.kind === "function" && expected.kind === "object") {
    return objectPropertiesAssignableTo(functionApparentProperties(), expected.properties, options, expected.optionalProperties)
      && callSignaturesAssignableTo([actual], expected.callSignatures ?? [], options);
  }
  if (actual.kind === "function" && expected.kind === "interface") {
    return objectPropertiesAssignableToInterface(functionApparentProperties(), [actual], expected.members, options);
  }
  if (actual.kind === "moduleNamespace" && expected.kind === "moduleNamespace") {
    return actual.moduleSpecifier === expected.moduleSpecifier;
  }
  if (actual.kind === "moduleNamespace" && expected.kind === "interface") {
    return objectPropertiesAssignableToInterface(actual.exports, [], expected.members, options, emptyStringSet, undefined, undefined, true);
  }
  if (actual.kind === "interface" && expected.kind === "moduleNamespace") {
    return objectPropertiesAssignableTo(actual.members.properties, expected.exports, options);
  }
  if (actual.kind === "namespace" && expected.kind === "namespace") {
    return actual.name === expected.name;
  }
  if (actual.kind === "thisClass" && expected.kind === "thisClass") {
    return actual.className === expected.className;
  }
  if (actual.kind === "array" && expected.kind === "array") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (expected.kind === "array") {
    const actualElementType = mutableArrayAssignableElementType(actual);
    if (actualElementType !== undefined) {
      return isAssignableTo(actualElementType, expected.elementType, options);
    }
  }
  if (expected.kind === "readonlyArray") {
    const actualElementType = readonlyArrayAssignableElementType(actual);
    if (actualElementType !== undefined) {
      return isAssignableTo(actualElementType, expected.elementType, options);
    }
  }
  if (actual.kind === "readonlyArray" && expected.kind === "readonlyArray") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "array" && (expected.kind === "arrayLike" || expected.kind === "iterable")) {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "readonlyArray" && expected.kind === "arrayLike") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "classInstance" && actual.arrayBaseElementType !== undefined && (expected.kind === "arrayLike" || expected.kind === "iterable")) {
    return isAssignableTo(actual.arrayBaseElementType, expected.elementType, options);
  }
  if (actual.kind === "arrayLike" && expected.kind === "arrayLike") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "arrayIterator" && (expected.kind === "arrayIterator" || expected.kind === "iterable")) {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "iterable" && expected.kind === "iterable") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "set" && expected.kind === "iterable") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "set" && expected.kind === "set") {
    return isAssignableTo(actual.elementType, expected.elementType, options);
  }
  if (actual.kind === "tuple" && expected.kind === "tuple") {
    return tupleAssignableTo(actual, expected, options);
  }
  if (actual.kind === "function" && expected.kind === "function") {
    return functionTypeAssignableTo(actual, expected, options);
  }
  if (actual.kind === "classConstructor" && expected.kind === "function" && expected.construct === true) {
    return functionTypeAssignableTo(classConstructorConstructSignature(actual), expected, options);
  }
  if (actual.kind === "boolean" && expected.kind === "typePredicate") {
    return true;
  }
  if (actual.kind === "typePredicate" && expected.kind === "boolean") {
    return true;
  }
  if (actual.kind === "typePredicate" && expected.kind === "typePredicate") {
    return actual.parameterIndex === expected.parameterIndex && isAssignableTo(actual.assertedType, expected.assertedType, options);
  }
  if (actual.kind === "union") {
    return actual.types.every(type => isAssignableTo(type, expected, options));
  }
  if (expected.kind === "union") {
    return expected.types.some(type => isAssignableTo(actual, type, options));
  }
  if (actual.kind === "intersection" && expected.kind === "intersection") {
    return actual.types.length === expected.types.length && actual.types.every((type, index) => isAssignableTo(type, expected.types[index]!, options));
  }
  if (actual.kind === "intersection") {
    return actual.types.every(type => isAssignableTo(type, expected, options));
  }
  if (expected.kind === "intersection") {
    return expected.types.every(type => isAssignableTo(actual, type, options));
  }
  if (actual.kind === "typeParameter" && expected.kind === "typeParameter") {
    return actual.name === expected.name;
  }
  if (actual.kind === "classConstructor" && expected.kind === "typeParameter") {
    return classConstructorExtendsTypeParameter(actual, expected);
  }
  return false;
}

function classConstructorExtendsTypeParameter(actual: Extract<CheckedType, { readonly kind: "classConstructor" }>, expected: Extract<CheckedType, { readonly kind: "typeParameter" }>): boolean {
  return actual.baseType !== undefined && typeReferencesTypeParameter(actual.baseType, expected.name);
}

function typeReferencesTypeParameter(type: CheckedType, name: string): boolean {
  if (type.kind === "typeParameter") {
    return type.name === name;
  }
  if (type.kind === "typeAliasInstance") {
    return typeReferencesTypeParameter(type.target, name);
  }
  if (type.kind === "valueAndType" || type.kind === "valueOnly" || type.kind === "accessorProperty") {
    return typeReferencesTypeParameter(type.type, name);
  }
  return false;
}

function optionalBaseType(baseType: CheckedType | undefined): { readonly baseType: CheckedType } | Record<string, never> {
  return baseType === undefined ? {} : { baseType };
}

function functionTypeAssignableTo(actual: CheckedFunctionType, expected: CheckedFunctionType, options: CompilerOptions = {}): boolean {
  const actualSignatures = actual.overloads === undefined || actual.overloads.length === 0 ? [actual] : actual.overloads;
  const expectedSignatures = expected.overloads === undefined || expected.overloads.length === 0 ? [expected] : expected.overloads;
  return expectedSignatures.every(expectedSignature => actualSignatures.every(actualSignature => functionSignatureAssignableTo(actualSignature, expectedSignature, options)));
}

function functionSignatureAssignableTo(actual: CheckedFunctionType, expected: CheckedFunctionType, options: CompilerOptions = {}): boolean {
  if ((actual.construct === true) !== (expected.construct === true)) {
    return false;
  }
  return actual.parameters.length <= expected.parameters.length
    && actual.parameters.every((actualParameter, index) => isAssignableTo(expected.parameters[index]!, actualParameter, options))
    && (expected.returnType.kind === "void" || isAssignableTo(actual.returnType, expected.returnType, options));
}

function classConstructorConstructSignature(type: Extract<CheckedType, { readonly kind: "classConstructor" }>): CheckedFunctionType {
  return {
    kind: "function",
    typeParameters: type.typeParameters,
    parameters: type.constructorParameters,
    returnType: classConstructorInstanceType(type),
    construct: true,
  };
}

function classConstructorInstanceType(type: Extract<CheckedType, { readonly kind: "classConstructor" }>): Extract<CheckedType, { readonly kind: "classInstance" }> {
  return {
    kind: "classInstance",
    name: type.name,
    typeParameters: type.typeParameters,
    typeArguments: type.typeArguments.length > 0 ? type.typeArguments : type.typeParameters.map(typeParameter => ({ kind: "typeParameter", name: typeParameter })),
    members: type.members,
    ...optionalArrayBaseElementType(type.arrayBaseElementType),
  };
}

function isEmptyObjectLikeType(type: CheckedType): boolean {
  if (type.kind === "object") {
    return type.properties.size === 0
      && (type.callSignatures?.length ?? 0) === 0
      && type.stringIndexType === undefined
      && type.numberIndexType === undefined;
  }
  if (type.kind === "interface") {
    return type.members.properties.size === 0
      && type.members.callSignatures.length === 0
      && type.members.stringIndexType === undefined
      && type.members.numberIndexType === undefined;
  }
  return false;
}

function objectPropertiesAssignableTo(
  actual: ReadonlyMap<string, CheckedType>,
  expected: ReadonlyMap<string, CheckedType>,
  options: CompilerOptions = {},
  optionalExpected: ReadonlySet<string> = emptyStringSet,
  optionalActual: ReadonlySet<string> = emptyStringSet,
): boolean {
  for (const [name, expectedPropertyType] of expected.entries()) {
    const actualPropertyType = actual.get(name);
    if (actualPropertyType === undefined) {
      if (optionalExpected.has(name)) {
        continue;
      }
      return false;
    }
    if (optionalActual.has(name) && !optionalExpected.has(name)) {
      return false;
    }
    if (!isAssignableTo(actualPropertyType, expectedPropertyType, options)) {
      return false;
    }
  }
  return true;
}

function objectPropertiesAssignableToInterface(
  actual: ReadonlyMap<string, CheckedType>,
  actualCallSignatures: readonly CheckedFunctionType[],
  expected: InterfaceMembers,
  options: CompilerOptions = {},
  actualOptionalProperties: ReadonlySet<string> = emptyStringSet,
  actualStringIndexType?: CheckedType,
  actualNumberIndexType?: CheckedType,
  requireActualIndexSignatures = false,
): boolean {
  if (!objectPropertiesAssignableTo(actual, expected.properties, options, expected.optionalProperties, actualOptionalProperties)) {
    return false;
  }
  if (!callSignaturesAssignableTo(actualCallSignatures, expected.callSignatures, options)) {
    return false;
  }
  if (requireActualIndexSignatures) {
    return indexSignaturesAssignableTo(actualStringIndexType, actualNumberIndexType, expected.stringIndexType, expected.numberIndexType, options);
  }
  if (!objectPropertiesAssignableToIndexSignatures(actual, expected.stringIndexType, expected.numberIndexType, options)) {
    return false;
  }
  return true;
}

function indexSignaturesAssignableTo(actualStringIndexType: CheckedType | undefined, actualNumberIndexType: CheckedType | undefined, expectedStringIndexType: CheckedType | undefined, expectedNumberIndexType: CheckedType | undefined, options: CompilerOptions = {}): boolean {
  if (expectedStringIndexType !== undefined && (actualStringIndexType === undefined || !isAssignableTo(actualStringIndexType, expectedStringIndexType, options))) {
    return false;
  }
  if (expectedNumberIndexType !== undefined && (actualNumberIndexType === undefined || !isAssignableTo(actualNumberIndexType, expectedNumberIndexType, options))) {
    return false;
  }
  return true;
}

function interfaceIndexSignaturesAssignableToObject(actual: InterfaceMembers, expectedStringIndexType: CheckedType | undefined, expectedNumberIndexType: CheckedType | undefined, options: CompilerOptions = {}): boolean {
  if (expectedStringIndexType !== undefined) {
    if (actual.stringIndexType !== undefined) {
      if (!isAssignableTo(actual.stringIndexType, expectedStringIndexType, options)) {
        return false;
      }
    } else if (!objectPropertiesAssignableToIndexSignatures(actual.properties, expectedStringIndexType, undefined, options)) {
      return false;
    }
  }
  if (expectedNumberIndexType !== undefined) {
    if (actual.numberIndexType !== undefined) {
      return isAssignableTo(actual.numberIndexType, expectedNumberIndexType, options);
    }
    if (actual.stringIndexType !== undefined) {
      return isAssignableTo(actual.stringIndexType, expectedNumberIndexType, options);
    }
    return false;
  }
  return true;
}

function objectPropertiesAssignableToIndexSignatures(actual: ReadonlyMap<string, CheckedType>, stringIndexType: CheckedType | undefined, numberIndexType: CheckedType | undefined, options: CompilerOptions = {}): boolean {
  if (stringIndexType !== undefined && ![...actual.values()].every(actualPropertyType => isAssignableTo(actualPropertyType, stringIndexType, options))) {
    return false;
  }
  if (numberIndexType !== undefined && ![...actual.entries()].every(([name, actualPropertyType]) => !isArrayIndexPropertyName(name) || isAssignableTo(actualPropertyType, numberIndexType, options))) {
    return false;
  }
  return true;
}

function callSignaturesAssignableTo(actual: readonly CheckedFunctionType[], expected: readonly CheckedFunctionType[], options: CompilerOptions = {}): boolean {
  return expected.every(expectedSignature => actual.some(actualSignature => isAssignableTo(actualSignature, expectedSignature, options)));
}

function isArrayIndexPropertyName(name: string): boolean {
  return /^(0|[1-9][0-9]*)$/.test(name);
}

function typePropertiesAssignableTo(actual: CheckedType, expected: ReadonlyMap<string, CheckedType>, options: CompilerOptions = {}, optionalExpected: ReadonlySet<string> = emptyStringSet): boolean {
  for (const [name, expectedPropertyType] of expected.entries()) {
    const actualPropertyType = propertyAccessType(actual, name);
    if (actualPropertyType === undefined) {
      if (optionalExpected.has(name)) {
        continue;
      }
      return false;
    }
    if (!isAssignableTo(actualPropertyType, expectedPropertyType, options)) {
      return false;
    }
  }
  return true;
}

function missingRequiredProperties(actual: CheckedType, expected: CheckedType): readonly string[] | undefined {
  if (actual.kind === "readonlyArray" && expected.kind === "array") {
    return undefined;
  }
  if ((expected.kind === "array" || expected.kind === "readonlyArray") && actual.kind === "classInstance" && actual.arrayBaseElementType !== undefined) {
    return undefined;
  }
  if (!structuralMissingPropertyDiagnosticApplies(actual)) {
    return undefined;
  }
  const expectedProperties = requiredPropertyNames(expected);
  if (expectedProperties === undefined || expectedProperties.length === 0) {
    return undefined;
  }
  return expectedProperties.filter(name => !typeHasDeclaredProperty(actual, name));
}

function typeHasDeclaredProperty(type: CheckedType, name: string): boolean {
  if (type.kind === "typeAliasInstance") {
    return typeHasDeclaredProperty(type.target, name);
  }
  if (type.kind === "object") {
    return type.properties.has(name);
  }
  if (type.kind === "interface") {
    return type.members.properties.has(name);
  }
  if (type.kind === "classInstance") {
    return type.members.propertyTypes.has(name) || type.members.instance.has(name);
  }
  return propertyAccessType(type, name) !== undefined;
}

function structuralMissingPropertyDiagnosticApplies(actual: CheckedType): boolean {
  return actual.kind === "array"
    || actual.kind === "readonlyArray"
    || actual.kind === "tuple"
    || actual.kind === "object"
    || actual.kind === "classInstance"
    || actual.kind === "interface";
}

function requiredPropertyNames(type: CheckedType): readonly string[] | undefined {
  if (type.kind === "typeAliasInstance") {
    return requiredPropertyNames(type.target);
  }
  if (type.kind === "array" || type.kind === "readonlyArray") {
    return arrayRequiredPropertyNames;
  }
  if (type.kind === "object") {
    return [...type.properties.keys()].filter(name => !type.optionalProperties.has(name));
  }
  if (type.kind === "interface") {
    return [...type.members.properties.keys()].filter(name => !type.members.optionalProperties.has(name));
  }
  if (type.kind === "classInstance") {
    return classInstanceRequiredPropertyNames(type);
  }
  return undefined;
}

function classInstanceRequiredPropertyNames(type: Extract<CheckedType, { readonly kind: "classInstance" }>): readonly string[] {
  const own: string[] = [];
  const inherited: string[] = [];
  for (const name of type.members.instance) {
    if (type.members.optionalProperties.has(name)) {
      continue;
    }
    if (type.members.propertyDeclaringClasses.get(name) === type.name) {
      own.push(name);
    } else {
      inherited.push(name);
    }
  }
  return [...own, ...inherited];
}

function tupleAssignableTo(actual: Extract<CheckedType, { readonly kind: "tuple" }>, expected: Extract<CheckedType, { readonly kind: "tuple" }>, options: CompilerOptions = {}): boolean {
  const requiredExpectedCount = expected.elements.filter(element => !element.optional).length;
  if (actual.elements.length < requiredExpectedCount) {
    return false;
  }
  if (expected.restElementType === undefined && actual.elements.length > expected.elements.length) {
    return false;
  }
  for (let index = 0; index < expected.elements.length; index += 1) {
    const actualElement = actual.elements[index];
    if (actualElement === undefined) {
      if (!expected.elements[index]!.optional) {
        return false;
      }
      continue;
    }
    if (!isAssignableTo(actualElement.type, expected.elements[index]!.type, options)) {
      return false;
    }
  }
  if (expected.restElementType !== undefined) {
    for (const actualElement of actual.elements.slice(expected.elements.length)) {
      if (!isAssignableTo(actualElement.type, expected.restElementType, options)) {
        return false;
      }
    }
  }
  return true;
}

function typeArgumentsAssignableTo(actual: readonly CheckedType[], expected: readonly CheckedType[], options: CompilerOptions = {}): boolean {
  if (actual.length !== expected.length) {
    return actual.length === 0 || expected.length === 0;
  }
  return actual.every((type, index) => isAssignableTo(type, expected[index]!, options) && isAssignableTo(expected[index]!, type, options));
}

function classMembersAssignableTo(actual: ClassMemberNames, expected: ClassMemberNames, options: CompilerOptions = {}, actualPropertyTypes: ReadonlyMap<string, CheckedType> = actual.propertyTypes, expectedPropertyTypes: ReadonlyMap<string, CheckedType> = expected.propertyTypes): boolean {
  if (expected.nominalProperties.size > 0) {
    return false;
  }
  for (const expectedMember of expected.instance) {
    if (!actual.instance.has(expectedMember)) {
      if (expected.optionalProperties.has(expectedMember)) {
        continue;
      }
      return false;
    }
    if (actual.optionalProperties.has(expectedMember) && !expected.optionalProperties.has(expectedMember)) {
      return false;
    }
    const expectedPropertyType = expectedPropertyTypes.get(expectedMember);
    const actualPropertyType = actualPropertyTypes.get(expectedMember);
    if (expectedPropertyType !== undefined && actualPropertyType !== undefined && !isAssignableTo(actualPropertyType, expectedPropertyType, options)) {
      return false;
    }
  }
  return true;
}

function classInstancesAssignableTo(actual: Extract<CheckedType, { readonly kind: "classInstance" }>, expected: Extract<CheckedType, { readonly kind: "classInstance" }>, options: CompilerOptions = {}): boolean {
  if (actual.name === expected.name) {
    return typeArgumentsAssignableTo(actual.typeArguments, expected.typeArguments, options);
  }
  return classMembersAssignableTo(actual.members, expected.members, options, classInstancePropertyTypes(actual), classInstancePropertyTypes(expected));
}

function classConstructorsAssignableTo(actual: Extract<CheckedType, { readonly kind: "classConstructor" }>, expected: Extract<CheckedType, { readonly kind: "classConstructor" }>, options: CompilerOptions = {}): boolean {
  if (actual.name === expected.name) {
    return actual.abstract === expected.abstract && typeArgumentsAssignableTo(actual.typeArguments, expected.typeArguments, options);
  }
  if (actual.abstract && !expected.abstract) {
    return false;
  }
  return functionSignatureAssignableTo(classConstructorConstructSignature(actual), classConstructorConstructSignature(expected), options)
    && classMembersAssignableTo(actual.members, expected.members, options, classConstructorPropertyTypes(actual), classConstructorPropertyTypes(expected))
    && staticClassMembersAssignableTo(actual.members, expected.members);
}

function staticClassMembersAssignableTo(actual: ClassMemberNames, expected: ClassMemberNames): boolean {
  for (const expectedMember of expected.static) {
    if (!actual.static.has(expectedMember)) {
      return false;
    }
  }
  return true;
}

function uniqueTypes(types: readonly CheckedType[]): readonly CheckedType[] {
  const unique: CheckedType[] = [];
  for (const type of types) {
    if (!unique.some(existing => isSameType(existing, type))) {
      unique.push(type);
    }
  }
  return unique;
}

function isSameType(left: CheckedType, right: CheckedType): boolean {
  return isAssignableTo(left, right) && isAssignableTo(right, left);
}

function uniqueInOrder<T>(values: readonly T[]): readonly T[] {
  const seen = new Set<T>();
  const unique: T[] = [];
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value);
      unique.push(value);
    }
  }
  return unique;
}

const stringMethodReturnTypes = new Map<string, CheckedType>([
  ["endsWith", booleanType],
  ["includes", booleanType],
  ["match", anyType],
  ["matchAll", anyType],
  ["replace", stringType],
  ["slice", stringType],
  ["split", anyType],
  ["startsWith", booleanType],
  ["toLowerCase", stringType],
  ["trim", stringType],
]);

const numberMethodReturnTypes = new Map<string, CheckedType>([
  ["toExponential", stringType],
  ["toFixed", stringType],
  ["toPrecision", stringType],
  ["toString", stringType],
  ["valueOf", numberType],
]);

const arrayMethodReturnTypes = new Map<string, CheckedType>([
  ["at", anyType],
  ["entries", anyType],
  ["every", booleanType],
  ["find", anyType],
  ["findIndex", numberType],
  ["findLast", anyType],
  ["findLastIndex", numberType],
  ["flat", { kind: "array", elementType: anyType }],
  ["flatMap", { kind: "array", elementType: anyType }],
  ["forEach", voidType],
  ["includes", booleanType],
  ["indexOf", numberType],
  ["join", stringType],
  ["keys", anyType],
  ["lastIndexOf", numberType],
  ["map", { kind: "array", elementType: anyType }],
  ["push", numberType],
  ["reduce", anyType],
  ["reduceRight", anyType],
  ["some", booleanType],
  ["toLocaleString", stringType],
  ["toReversed", { kind: "array", elementType: anyType }],
  ["toSorted", { kind: "array", elementType: anyType }],
  ["toSpliced", { kind: "array", elementType: anyType }],
  ["toString", stringType],
  ["unshift", numberType],
  ["values", anyType],
  ["with", { kind: "array", elementType: anyType }],
]);

const arrayElementMethodNames = new Set(["pop", "shift"]);
const arraySelfMethodNames = new Set(["copyWithin", "fill", "reverse", "sort"]);
const arrayArrayMethodNames = new Set(["concat", "filter", "slice", "splice"]);
const arrayElementCallbackMethodNames = new Set(["every", "filter", "find", "findIndex", "findLast", "findLastIndex", "flatMap", "forEach", "map", "some"]);
const mutableArrayMethodNames = new Set(["copyWithin", "fill", "pop", "push", "reverse", "shift", "sort", "splice", "unshift"]);
const arrayRequiredPropertyNames = [
  "length",
  "pop",
  "push",
  "concat",
  "join",
  "reverse",
  "shift",
  "slice",
  "sort",
  "splice",
  "unshift",
  "indexOf",
  "lastIndexOf",
  "every",
  "some",
  "forEach",
  "map",
  "filter",
  "reduce",
  "reduceRight",
  "find",
  "findIndex",
  "fill",
  "copyWithin",
  "entries",
  "keys",
  "values",
  "includes",
  "flatMap",
];

function inferPlusExpressionType(left: CheckedType, right: CheckedType, state: CheckState): CheckedType {
  if (isUnresolvedOperandType(left) || isUnresolvedOperandType(right)) {
    return unresolvedType;
  }
  if (isStringLikeOperandType(left) || isStringLikeOperandType(right)) {
    return stringType;
  }
  if (isAnyOperandType(left) || isAnyOperandType(right)) {
    return anyType;
  }
  if (isNumberLikeOperandType(left) && isNumberLikeOperandType(right)) {
    return numberType;
  }
  state.diagnostics.push(createDiagnostic(2365, "+", displayType(left), displayType(right)));
  return anyType;
}

function checkArithmeticOperandType(type: CheckedType, state: CheckState, diagnosticCode: 2362 | 2363): boolean {
  if (isUnresolvedOperandType(type)) {
    return false;
  }
  if (isAnyOperandType(type) || isNumberLikeOperandType(type)) {
    return true;
  }
  state.diagnostics.push(createDiagnostic(diagnosticCode));
  return false;
}

function isAnyOperandType(type: CheckedType): boolean {
  if (type.kind === "unassignedVariable") {
    return isAnyOperandType(type.type);
  }
  if (type.kind === "valueOnly") {
    return isAnyOperandType(type.type);
  }
  if (type.kind === "valueAndType") {
    return isAnyOperandType(type.value);
  }
  if (type.kind === "typeAliasInstance") {
    return isAnyOperandType(type.target);
  }
  if (type.kind === "nonNullable") {
    return isAnyOperandType(nonNullableType(type.target));
  }
  return type.kind === "any";
}

function isUnresolvedOperandType(type: CheckedType): boolean {
  if (type.kind === "unassignedVariable") {
    return isUnresolvedOperandType(type.type);
  }
  if (type.kind === "valueOnly") {
    return isUnresolvedOperandType(type.type);
  }
  if (type.kind === "valueAndType") {
    return isUnresolvedOperandType(type.value);
  }
  if (type.kind === "typeAliasInstance") {
    return isUnresolvedOperandType(type.target);
  }
  if (type.kind === "nonNullable") {
    return isUnresolvedOperandType(nonNullableType(type.target));
  }
  return type.kind === "unresolved";
}

function isStringLikeOperandType(type: CheckedType): boolean {
  if (type.kind === "unassignedVariable") {
    return isStringLikeOperandType(type.type);
  }
  if (type.kind === "valueOnly") {
    return isStringLikeOperandType(type.type);
  }
  if (type.kind === "valueAndType") {
    return isStringLikeOperandType(type.value);
  }
  if (type.kind === "typeAliasInstance") {
    return isStringLikeOperandType(type.target);
  }
  if (type.kind === "nonNullable") {
    return isStringLikeOperandType(nonNullableType(type.target));
  }
  if (type.kind === "union") {
    return type.types.every(isStringLikeOperandType);
  }
  return type.kind === "string" || type.kind === "stringLiteral";
}

function isNumberLikeOperandType(type: CheckedType): boolean {
  if (type.kind === "unassignedVariable") {
    return isNumberLikeOperandType(type.type);
  }
  if (type.kind === "valueOnly") {
    return isNumberLikeOperandType(type.type);
  }
  if (type.kind === "valueAndType") {
    return isNumberLikeOperandType(type.value);
  }
  if (type.kind === "typeAliasInstance") {
    return isNumberLikeOperandType(type.target);
  }
  if (type.kind === "nonNullable") {
    return isNumberLikeOperandType(nonNullableType(type.target));
  }
  if (type.kind === "union") {
    return type.types.every(isNumberLikeOperandType);
  }
  return type.kind === "number" || type.kind === "numberLiteral";
}

function isNumericArithmeticOperator(kind: Kind): boolean {
  return kind === Kind.MinusToken
    || kind === Kind.AsteriskToken
    || kind === Kind.AsteriskAsteriskToken
    || kind === Kind.SlashToken
    || kind === Kind.PercentToken
    || kind === Kind.LessThanLessThanToken
    || kind === Kind.GreaterThanGreaterThanToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanToken
    || kind === Kind.AmpersandToken
    || kind === Kind.BarToken
    || kind === Kind.CaretToken;
}

function isComparisonOperator(kind: Kind): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken
    || kind === Kind.LessThanToken
    || kind === Kind.LessThanEqualsToken
    || kind === Kind.GreaterThanToken
    || kind === Kind.GreaterThanEqualsToken
    || kind === Kind.InstanceOfKeyword
    || kind === Kind.InKeyword;
}

function isAssignmentOperator(kind: Kind): boolean {
  return kind === Kind.EqualsToken
    || kind === Kind.PlusEqualsToken
    || kind === Kind.MinusEqualsToken
    || kind === Kind.AsteriskEqualsToken
    || kind === Kind.AsteriskAsteriskEqualsToken
    || kind === Kind.SlashEqualsToken
    || kind === Kind.PercentEqualsToken
    || kind === Kind.AmpersandEqualsToken
    || kind === Kind.BarEqualsToken
    || kind === Kind.CaretEqualsToken
    || kind === Kind.LessThanLessThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanEqualsToken
    || kind === Kind.AmpersandAmpersandEqualsToken
    || kind === Kind.BarBarEqualsToken
    || kind === Kind.QuestionQuestionEqualsToken;
}

function displayType(type: CheckedType): string {
  if (type.kind === "accessorProperty") {
    return displayType(type.type);
  }
  if (type.kind === "function") {
    if (type.overloads !== undefined && type.overloads.length > 0) {
      return `{ ${type.overloads.map(displayCallSignatureType).join(" ")} }`;
    }
    const typeParameters = type.typeParameters.length === 0 ? "" : `<${type.typeParameters.join(", ")}>`;
    const prefix = type.construct === true ? "new " : "";
    return `${prefix}${typeParameters}(${type.parameters.map((parameter, index) => `${type.parameterNames?.[index] ?? `arg${index}`}: ${displayType(parameter)}`).join(", ")}) => ${displayType(type.returnType)}`;
  }
  if (type.kind === "functionDeclaration") {
    return displayType(type.type);
  }
  if (type.kind === "intersection") {
    return type.types.map(member => member.kind === "function" ? `(${displayType(member)})` : displayType(member)).join(" & ");
  }
  if (type.kind === "array") {
    return `${displayType(type.elementType)}[]`;
  }
  if (type.kind === "readonlyArray") {
    return `readonly ${displayType(type.elementType)}[]`;
  }
  if (type.kind === "arrayLike") {
    return `ArrayLike<${displayType(type.elementType)}>`;
  }
  if (type.kind === "arrayIterator") {
    return `ArrayIterator<${displayType(type.elementType)}>`;
  }
  if (type.kind === "iterable") {
    return `Iterable<${displayType(type.elementType)}>`;
  }
  if (type.kind === "set") {
    return `Set<${displayType(type.elementType)}>`;
  }
  if (type.kind === "stringLiteral") {
    return JSON.stringify(type.value);
  }
  if (type.kind === "numberLiteral") {
    return type.value;
  }
  if (type.kind === "booleanLiteral") {
    return type.value ? "true" : "false";
  }
  if (type.kind === "builtinConstructor") {
    return `typeof ${type.name}`;
  }
  if (type.kind === "tuple") {
    return displayTupleType(type);
  }
  if (type.kind === "typeParameter") {
    return type.name;
  }
  if (type.kind === "typePredicate") {
    return `${type.parameterName} is ${displayType(type.assertedType)}`;
  }
  if (type.kind === "intrinsicConstructor" || type.kind === "intrinsicFunction") {
    return type.intrinsic;
  }
  if (type.kind === "globalObject") {
    return "Object";
  }
  if (type.kind === "classConstructor") {
    if (type.typeParameters.length > 0 || type.typeArguments.length > 0) {
      const instanceType = displayGenericNamedType(type.name, type.typeArguments.length > 0 ? type.typeArguments : type.typeParameters.map(() => anyType));
      const prototypeType = displayGenericNamedType(type.name, type.typeParameters.map(() => anyType));
      return `{ new (): ${instanceType}; prototype: ${prototypeType}; }`;
    }
    return `typeof ${type.name}`;
  }
  if (type.kind === "classInstance") {
    return displayGenericNamedType(type.name, type.typeArguments);
  }
  if (type.kind === "interface") {
    return displayGenericNamedType(type.name, type.typeArguments ?? []);
  }
  if (type.kind === "moduleNamespace") {
    return `typeof import("${type.diagnosticName}")`;
  }
  if (type.kind === "namespace") {
    return type.name;
  }
  if (type.kind === "nonNullable") {
    return displayType(nonNullableType(type.target));
  }
  if (type.kind === "object") {
    const callSignatures = (type.callSignatures ?? []).map(displayCallSignatureType);
    const indexSignatures = [
      ...(type.stringIndexType === undefined ? [] : [`[index: string]: ${displayType(type.stringIndexType)};`]),
      ...(type.numberIndexType === undefined ? [] : [`[index: number]: ${displayType(type.numberIndexType)};`]),
    ];
    if (type.properties.size === 0 && indexSignatures.length === 0 && type.callSignatures?.length === 1) {
      return displayType(type.callSignatures[0]!);
    }
    const entries = [...type.properties.entries()].map(([name, propertyType]) => {
      const readonly = type.readonlyProperties.has(name) ? "readonly " : "";
      const optional = type.optionalProperties.has(name) ? "?" : "";
      if (type.methodProperties.has(name) && propertyType.kind === "function") {
        return `${readonly}${displayMethodSignature(name, optional, propertyType)}`;
      }
      return `${readonly}${name}${optional}: ${displayType(propertyType)};`;
    });
    const members = [...callSignatures, ...indexSignatures, ...entries];
    if (members.length === 0) {
      return "{}";
    }
    return `{ ${members.join(" ")} }`;
  }
  if (type.kind === "record") {
    return `Record<${displayType(type.keyType)}, ${displayType(type.valueType)}>`;
  }
  if (type.kind === "thisClass") {
    return type.className;
  }
  if (type.kind === "typeAlias") {
    return displayType(type.target);
  }
  if (type.kind === "typeAliasInstance") {
    return displayGenericNamedType(type.name, type.typeArguments);
  }
  if (type.kind === "union") {
    return type.types.map(displayType).join(" | ");
  }
  if (type.kind === "unassignedVariable") {
    return displayType(type.type);
  }
  if (type.kind === "valueOnly") {
    return displayType(type.type);
  }
  if (type.kind === "valueAndType") {
    return displayType(type.value);
  }
  if (type.kind === "namespaceAndType") {
    return type.namespace.name;
  }
  if (type.kind === "unqualifiedStaticMember" || type.kind === "unqualifiedInstanceMember") {
    return "unknown";
  }
  return type.kind === "unresolved" ? "unknown" : type.kind;
}

function displayCallSignatureType(type: CheckedFunctionType): string {
  const typeParameters = type.typeParameters.length === 0 ? "" : `<${type.typeParameters.join(", ")}>`;
  const prefix = type.construct === true ? "new " : "";
  return `${prefix}${typeParameters}(${type.parameters.map((parameter, index) => `${type.parameterNames?.[index] ?? `arg${index}`}: ${displayType(parameter)}`).join(", ")}): ${displayType(type.returnType)};`;
}

function displayMethodSignature(name: string, optional: string, type: CheckedFunctionType): string {
  const typeParameters = type.typeParameters.length === 0 ? "" : `<${type.typeParameters.join(", ")}>`;
  return `${name}${optional}${typeParameters}(${type.parameters.map((parameter, index) => `${type.parameterNames?.[index] ?? `arg${index}`}: ${displayType(parameter)}`).join(", ")}): ${displayType(type.returnType)};`;
}

function displayTupleType(type: Extract<CheckedType, { readonly kind: "tuple" }>): string {
  const elements = type.elements.map(element => {
    const label = element.name === undefined ? "" : `${element.name}${element.optional ? "?" : ""}: `;
    return `${label}${displayType(element.type)}`;
  });
  if (type.restElementType !== undefined) {
    elements.push(`...${displayType(type.restElementType)}[]`);
  }
  return `[${elements.join(", ")}]`;
}

function displayGenericNamedType(name: string, typeArguments: readonly CheckedType[]): string {
  return typeArguments.length === 0 ? name : `${name}<${typeArguments.map(displayType).join(", ")}>`;
}

function entityNameText(typeName: EntityName): string | undefined {
  if (isIdentifier(typeName)) {
    return typeName.text;
  }
  if (isQualifiedName(typeName)) {
    const left = entityNameText(typeName.left);
    return left === undefined ? typeName.right.text : `${left}.${typeName.right.text}`;
  }
  return undefined;
}

function expressionNameText(expression: Expression): string | undefined {
  if (isIdentifier(expression)) {
    return expression.text;
  }
  if (isPropertyAccessExpression(expression)) {
    const left = expressionNameText(expression.expression);
    return left === undefined ? expression.name.text : `${left}.${expression.name.text}`;
  }
  return undefined;
}
