import {
  Kind,
  isArrowFunction,
  isAsExpression,
  isArrayLiteralExpression,
  isArrayTypeNode,
  isBinaryExpression,
  isBlock,
  isBreakStatement,
  isCallExpression,
  isCallSignatureDeclaration,
  isClassDeclaration,
  isComputedPropertyName,
  isContinueStatement,
  isConditionalExpression,
  isConstructorDeclaration,
  isConstructorTypeNode,
  isConstructSignatureDeclaration,
  isDoStatement,
  isElementAccessExpression,
  isEnumDeclaration,
  isExternalModuleReference,
  isExportDeclaration,
  isExportAssignment,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isFunctionTypeNode,
  isGetAccessorDeclaration,
  isArrayBindingPattern,
  isIdentifier,
  isIfStatement,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isInterfaceDeclaration,
  isIntersectionTypeNode,
  isKeywordExpression,
  isKeywordTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isMissingDeclaration,
  isModuleBlock,
  isModuleDeclaration,
  isNamedImports,
  isNamedExports,
  isNamespaceImport,
  isNewExpression,
  isNumericLiteral,
  isNoSubstitutionTemplateLiteral,
  isObjectLiteralExpression,
  isObjectBindingPattern,
  isParenthesizedTypeNode,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAssignment,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isPrivateIdentifier,
  isQualifiedName,
  isReturnStatement,
  isSatisfiesExpression,
  isSetAccessorDeclaration,
  isShorthandPropertyAssignment,
  isSpreadElement,
  isStringLiteral,
  isTypeAssertion,
  isTypeReferenceNode,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeQueryNode,
  isVariableStatement,
  isVariableDeclarationList,
  isUnionTypeNode,
  isWhileStatement,
  type Block,
  type ArrowFunction,
  type AssertionExpression,
  type BindingElement,
  type BindingName,
  type ClassDeclaration,
  type ClassElement,
  type ConciseBody,
  type ConstructorDeclaration,
  type EntityName,
  type EnumDeclaration,
  type Expression,
  type FunctionDeclaration,
  type GetAccessorDeclaration,
  type ImportDeclaration,
  type ImportSpecifier,
  type InterfaceDeclaration,
  type MethodSignatureDeclaration,
  type MethodDeclaration,
  type ParameterDeclaration,
  type PropertyName,
  type SetAccessorDeclaration,
  type SourceFile,
  type Statement,
  type TypeElement,
  type TypeAliasDeclaration,
  type TypeNode,
  type VariableDeclaration,
} from "../ast/index.js";
import { createDiagnostic, type Diagnostic } from "../diagnostics/index.js";
import type { CompilerOptions, Program, ProgramDiagnostic } from "../program/index.js";

type PrimitiveTypeName = "any" | "boolean" | "null" | "number" | "string" | "undefined" | "unknown" | "void";

type CheckedType =
  | { readonly kind: PrimitiveTypeName | "unresolved" }
  | { readonly kind: "array"; readonly elementType: CheckedType }
  | { readonly kind: "classInstance"; readonly name: string; readonly typeArguments: readonly CheckedType[]; readonly members: ClassMemberNames }
  | { readonly kind: "classConstructor"; readonly name: string; readonly typeParameters: readonly string[]; readonly typeArguments: readonly CheckedType[]; readonly abstract: boolean; readonly members: ClassMemberNames }
  | { readonly kind: "accessorProperty"; readonly type: CheckedType }
  | { readonly kind: "function"; readonly typeParameters: readonly string[]; readonly parameters: readonly CheckedType[]; readonly returnType: CheckedType }
  | { readonly kind: "interface"; readonly name: string; readonly members: InterfaceMembers }
  | { readonly kind: "intersection"; readonly types: readonly CheckedType[] }
  | { readonly kind: "moduleNamespace"; readonly moduleSpecifier: string; readonly diagnosticName: string; readonly exports: ReadonlyMap<string, CheckedType>; readonly exportEquals?: CheckedType }
  | { readonly kind: "namespace"; readonly name: string; readonly exports: ReadonlyMap<string, CheckedType> }
  | { readonly kind: "namespaceAndType"; readonly namespace: Extract<CheckedType, { readonly kind: "namespace" }>; readonly type: CheckedType }
  | { readonly kind: "object"; readonly properties: ReadonlyMap<string, CheckedType>; readonly readonlyProperties: ReadonlySet<string> }
  | { readonly kind: "record"; readonly keyType: CheckedType; readonly valueType: CheckedType }
  | { readonly kind: "thisClass"; readonly className: string; readonly abstractProperties: ReadonlySet<string>; readonly abstractPropertyDeclaringClasses: ReadonlyMap<string, string>; readonly uninitializedProperties: ReadonlySet<string>; readonly mode: "constructor" | "fieldInitializer" }
  | { readonly kind: "typeAlias"; readonly name: string; readonly typeParameters: readonly string[]; readonly target: CheckedType; readonly preserveDisplay: boolean }
  | { readonly kind: "typeAliasInstance"; readonly name: string; readonly typeArguments: readonly CheckedType[]; readonly target: CheckedType }
  | { readonly kind: "typeParameter"; readonly name: string }
  | { readonly kind: "union"; readonly types: readonly CheckedType[] }
  | { readonly kind: "unassignedVariable"; readonly name: string; readonly type: CheckedType }
  | { readonly kind: "unqualifiedStaticMember"; readonly className: string; readonly memberName: string }
  | { readonly kind: "unqualifiedInstanceMember"; readonly memberName: string }
  | { readonly kind: "valueOnly"; readonly name: string; readonly type: CheckedType }
  | { readonly kind: "valueAndType"; readonly value: CheckedType; readonly type: CheckedType };

export type CheckDiagnostic = Diagnostic;

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
  readonly options: CompilerOptions;
  readonly strictMode: boolean;
  readonly strictModeReason: "module" | "strict" | undefined;
  readonly resolveExternalModule?: (moduleSpecifier: string) => CheckedType | undefined;
}

type TypeEnvironment = Map<string, CheckedType>;

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
  readonly uninitializedProperties: ReadonlySet<string>;
}

interface AccessorContextTypes {
  readonly getterType?: CheckedType;
  readonly setterType?: CheckedType;
}

interface InterfaceMembers {
  readonly name: string;
  readonly properties: ReadonlyMap<string, CheckedType>;
}

interface ModuleExportInfo {
  readonly exports: ReadonlyMap<string, CheckedType>;
  readonly exportEquals?: CheckedType;
}

const anyType: CheckedType = { kind: "any" };
const unknownType: CheckedType = { kind: "unknown" };
const unresolvedType: CheckedType = { kind: "unresolved" };
const nullType: CheckedType = { kind: "null" };
const numberType: CheckedType = { kind: "number" };
const stringType: CheckedType = { kind: "string" };
const voidType: CheckedType = { kind: "void" };
const booleanType: CheckedType = { kind: "boolean" };
const undefinedType: CheckedType = { kind: "undefined" };
const invalidClassNames = new Set(["any", "bigint", "boolean", "never", "number", "object", "string", "symbol", "undefined", "unknown", "void"]);
const ambientTypeNames = new Set([
  "Array",
  "ArrayLike",
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
  "Required",
  "ReturnType",
  "Set",
  "String",
  "Symbol",
  "ThisType",
  "WeakMap",
  "WeakSet",
]);

export function checkSourceFile(sourceFile: SourceFile, options: CompilerOptions = {}): CheckResult {
  const state = checkStateForSourceFile(sourceFile, options);
  checkStatements(sourceFile.statements, state, new Map(), undefined, isDeclarationFile(sourceFile));
  return { diagnostics: state.diagnostics };
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
      strictMode: sourceFileStrictMode(sourceFile.sourceFile, program.options),
      strictModeReason: sourceFileStrictModeReason(sourceFile.sourceFile, program.options),
      resolveExternalModule: moduleSpecifier => moduleResolver(sourceFile.fileName, moduleSpecifier),
    };
    checkStatements(sourceFile.sourceFile.statements, state, new Map(globalEnvironment), undefined, isDeclarationFile(sourceFile.sourceFile));
    diagnostics.push(...state.diagnostics.map(diagnostic => ({
      fileName: sourceFile.fileName,
      code: diagnostic.code,
      category: diagnostic.category,
      key: diagnostic.key,
      messageText: diagnostic.messageText,
      message: diagnostic.message,
    })));
  }
  return diagnostics;
}

const syntaxDiagnosticCodes = new Set<number>([1003, 1005, 1068, 1127, 1128, 1359, 1434, 1440, 1490]);

function checkStateForSourceFile(sourceFile: SourceFile, options: CompilerOptions): CheckState {
  return {
    diagnostics: [],
    options,
    strictMode: sourceFileStrictMode(sourceFile, options),
    strictModeReason: sourceFileStrictModeReason(sourceFile, options),
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
    const environment = new Map(globalEnvironment);
    checkStatements(sourceFile.sourceFile.statements, emptyCheckState(program.options), environment, undefined, isDeclarationFile(sourceFile.sourceFile));
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
      collectModuleExport(statement, exports);
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
    const moduleEnvironment = new Map(globalEnvironment);
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
      checkStatements(sourceFile.sourceFile.statements, emptyCheckState(program.options), environment, undefined, isDeclarationFile(sourceFile.sourceFile));
      continue;
    }
    for (const statement of sourceFile.sourceFile.statements) {
      if (isModuleDeclaration(statement) && ambientModuleSpecifier(statement) === undefined && hasDeclareModifier(statement)) {
        checkModuleDeclaration(statement, emptyCheckState(program.options), environment, undefined, true);
      }
    }
  }
  return environment;
}

function standardGlobalEnvironment(): TypeEnvironment {
  return new Map([
    ["Math", {
      kind: "namespace",
      name: "Math",
      exports: new Map([
        ["random", { kind: "function", typeParameters: [], parameters: [], returnType: numberType }],
      ]),
    }],
  ]);
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

function collectModuleExport(statement: Statement, exports: Map<string, CheckedType>): void {
  if (isExportAssignment(statement) && !statement.isExportEquals) {
    mergeModuleExport(exports, "default", { kind: "valueOnly", name: "default", type: anyType });
    return;
  }
  if (isExportDeclaration(statement) && statement.moduleSpecifier === undefined && statement.exportClause !== undefined && isNamedExports(statement.exportClause)) {
    for (const element of statement.exportClause.elements) {
      const exportedName = moduleExportNameText(element.name);
      const localName = element.propertyName === undefined ? exportedName : moduleExportNameText(element.propertyName);
      mergeModuleExport(exports, exportedName, { kind: "valueOnly", name: localName, type: anyType });
    }
    return;
  }
  if (!isExportedElement(statement) || !hasDefaultModifier(statement as { readonly modifiers?: readonly { readonly kind: Kind }[] })) {
    return;
  }
  if (isInterfaceDeclaration(statement)) {
    mergeModuleExport(exports, "default", statement.name === undefined ? anyType : { kind: "interface", name: statement.name.text, members: { name: statement.name.text, properties: new Map() } });
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

function checkStatements(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean): void {
  prebindStatementDeclarations(statements, state, environment, ambient);
  checkFunctionDeclarationOverloads(statements, state, ambient);
  const statementListHasExportedElements = statements.some(statement => isExportedElement(statement));
  for (const statement of statements) {
    checkStatement(statement, state, environment, expectedReturnType, ambient, statementListHasExportedElements);
  }
}

function checkStatement(statement: Statement, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean, statementListHasExportedElements: boolean): void {
  if (isImportDeclaration(statement)) {
    bindImportDeclaration(statement, state, environment);
    return;
  }
  if (isImportEqualsDeclaration(statement)) {
    environment.set(statement.name.text, importEqualsDeclarationType(statement, state, environment));
    return;
  }
  if (isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      checkVariableDeclaration(declaration, state, environment, ambient || hasDeclareModifier(statement));
    }
    return;
  }
  if (isFunctionDeclaration(statement)) {
    checkFunctionDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isClassDeclaration(statement)) {
    checkClassDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isEnumDeclaration(statement)) {
    checkEnumDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isInterfaceDeclaration(statement)) {
    checkInterfaceDeclaration(statement, state, environment);
    return;
  }
  if (isTypeAliasDeclaration(statement)) {
    bindTypeAliasDeclaration(statement, state, environment);
    return;
  }
  if (isModuleDeclaration(statement)) {
    checkModuleDeclaration(statement, state, environment, expectedReturnType, ambient);
    return;
  }
  if (isExportAssignment(statement)) {
    checkExportAssignment(statement, state, environment, statementListHasExportedElements, ambient);
    return;
  }
  if (isIfStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.thenStatement, state, new Map(environment), expectedReturnType, ambient, false);
    if (statement.elseStatement !== undefined) {
      checkStatement(statement.elseStatement, state, new Map(environment), expectedReturnType, ambient, false);
    }
    return;
  }
  if (isWhileStatement(statement)) {
    inferExpression(statement.expression, state, environment);
    checkStatement(statement.statement, state, new Map(environment), expectedReturnType, ambient, false);
    return;
  }
  if (isDoStatement(statement)) {
    checkStatement(statement.statement, state, new Map(environment), expectedReturnType, ambient, false);
    inferExpression(statement.expression, state, environment);
    return;
  }
  if (isForStatement(statement)) {
    const loopEnvironment = new Map(environment);
    if (statement.initializer !== undefined) {
      checkForInitializer(statement.initializer, state, loopEnvironment);
    }
    if (statement.condition !== undefined) {
      inferExpression(statement.condition, state, loopEnvironment);
    }
    if (statement.incrementor !== undefined) {
      inferExpression(statement.incrementor, state, loopEnvironment);
    }
    checkStatement(statement.statement, state, loopEnvironment, expectedReturnType, ambient, false);
    return;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    const loopEnvironment = new Map(environment);
    checkForInitializer(statement.initializer, state, loopEnvironment, true);
    inferExpression(statement.expression, state, loopEnvironment);
    checkStatement(statement.statement, state, loopEnvironment, expectedReturnType, ambient, false);
    return;
  }
  if (isBreakStatement(statement) || isContinueStatement(statement)) {
    return;
  }
  if (isReturnStatement(statement)) {
    const actual = statement.expression === undefined ? voidType : inferExpression(statement.expression, state, environment);
    if (expectedReturnType !== undefined) {
      checkAssignable(actual, expectedReturnType, state);
    }
    return;
  }
  if (isExpressionStatement(statement)) {
    const expressionType = inferExpression(statement.expression, state, environment);
    if (isIdentifier(statement.expression) && statement.expression.text !== "" && expressionType.kind === "unresolved") {
      state.diagnostics.push(createDiagnostic(2304, statement.expression.text));
    }
    return;
  }
  if (isBlock(statement)) {
    checkBlock(statement, state, environment, expectedReturnType);
  }
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

function bindTypeAliasDeclaration(statement: TypeAliasDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const aliasEnvironment = new Map(environment);
  const typeParameters = statement.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, aliasEnvironment);
  environment.set(statement.name.text, { kind: "typeAlias", name: statement.name.text, typeParameters, target: typeFromTypeNode(statement.type, aliasEnvironment, state), preserveDisplay: isIntersectionTypeNode(statement.type) || isFunctionTypeNode(statement.type) });
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
  if (!isModuleBlock(moduleDeclaration.body)) {
    return;
  }
  const moduleName = moduleDeclarationName(moduleDeclaration);
  const namespaceEnvironment = new Map(environment);
  const moduleBodyAmbient = ambient || hasDeclareModifier(moduleDeclaration);
  checkStatements(moduleDeclaration.body.statements, state, namespaceEnvironment, expectedReturnType, moduleBodyAmbient);
  if (moduleName === undefined) {
    return;
  }
  const existing = environment.get(moduleName);
  const exports = new Map(existing?.kind === "namespace" ? existing.exports : []);
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
  const namespaceType: Extract<CheckedType, { readonly kind: "namespace" }> = { kind: "namespace", name: moduleName, exports };
  environment.set(moduleName, mergeNamespaceType(environment.get(moduleName), namespaceType));
}

function qualifyNamespaceExport(type: CheckedType, qualifiedName: string): CheckedType {
  if (type.kind !== "namespace") {
    return type;
  }
  const exports = new Map<string, CheckedType>();
  for (const [name, exported] of type.exports.entries()) {
    exports.set(name, qualifyNamespaceExport(exported, `${qualifiedName}.${name}`));
  }
  return { kind: "namespace", name: qualifiedName, exports };
}

function moduleDeclarationName(moduleDeclaration: Extract<Statement, { readonly kind: Kind.ModuleDeclaration }>): string | undefined {
  return isIdentifier(moduleDeclaration.name) ? moduleDeclaration.name.text : undefined;
}

function ambientModuleSpecifier(statement: Statement): string | undefined {
  return isModuleDeclaration(statement) && isStringLiteral(statement.name) ? statement.name.text : undefined;
}

function namespaceExportName(statement: Statement): string | undefined {
  if (isClassDeclaration(statement) || isFunctionDeclaration(statement) || isInterfaceDeclaration(statement) || isTypeAliasDeclaration(statement)) {
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
  const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type, environment, state);
  const initializerType = declaration.initializer === undefined ? undefined : inferExpressionWithContext(declaration.initializer, state, environment, declaredType);
  if (ambient && declaration.initializer !== undefined) {
    state.diagnostics.push(createDiagnostic(1039));
  }
  if (declaredType !== undefined && initializerType !== undefined) {
    checkAssignable(initializerType, declaredType, state);
  }
  if (declaration.initializer !== undefined) {
    diagnoseAbstractThisDestructuring(declaration.name, declaration.initializer, state, environment);
  }
  checkStrictModeBindingName(declaration.name, state, ambient);
  setBindingNameType(declaration.name, variableDeclarationBindingType(declaration, declaredType, initializerType, environment, ambient), environment);
}

function variableDeclarationBindingType(declaration: VariableDeclaration, declaredType: CheckedType | undefined, initializerType: CheckedType | undefined, environment: TypeEnvironment, ambient: boolean): CheckedType {
  if (
    !ambient
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
  const classIsAbstract = hasModifier(classDeclaration, Kind.AbstractKeyword);
  const inheritedMembers = inheritedClassMembers(classDeclaration, environment);
  const classMembers = collectClassMemberNames(classDeclaration, inheritedMembers, environment);
  if (classDeclaration.name !== undefined) {
    if (invalidClassNames.has(classDeclaration.name.text)) {
      state.diagnostics.push(createDiagnostic(2414, classDeclaration.name.text));
    }
    environment.set(classDeclaration.name.text, {
      kind: "classConstructor",
      name: classDeclaration.name.text,
      typeParameters: classDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [],
      typeArguments: [],
      abstract: classIsAbstract,
      members: classMembers,
    });
  }
  checkMissingAbstractMembers(classDeclaration, state, classIsAbstract, inheritedMembers, classMembers);
  checkAccessorAbstractPairs(classDeclaration.members, state);
  const classEnvironment = new Map(environment);
  addTypeParametersToEnvironment(classDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], classEnvironment);
  const accessorContextTypes = collectAccessorContextTypes(classDeclaration.members, classEnvironment);
  if (!ambient) {
    checkClassMemberOverloads(classDeclaration.members, state);
  }
  for (const member of classDeclaration.members) {
    checkClassElement(member, state, classEnvironment, ambient, classIsAbstract, classMembers, inheritedMembers, accessorContextTypes);
  }
}

function inheritedClassMembers(classDeclaration: ClassDeclaration, environment: TypeEnvironment): ClassMemberNames | undefined {
  for (const clause of classDeclaration.heritageClauses ?? []) {
    if (clause.token !== Kind.ExtendsKeyword) {
      continue;
    }
    const baseName = clause.types[0] === undefined ? undefined : expressionNameText(clause.types[0].expression);
    const baseType = baseName === undefined ? undefined : environment.get(baseName);
    return baseType?.kind === "classConstructor" ? baseType.members : undefined;
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

function collectClassMemberNames(classDeclaration: ClassDeclaration, inherited: ClassMemberNames | undefined, environment: TypeEnvironment): ClassMemberNames {
  const instance = new Set(inherited?.instance ?? []);
  const staticMembers = new Set(inherited?.static ?? []);
  const abstractMembers = new Map(inherited?.abstractMembers ?? []);
  const abstractProperties = new Set(inherited?.abstractProperties ?? []);
  const abstractPropertyDeclaringClasses = new Map(inherited?.abstractPropertyDeclaringClasses ?? []);
  const propertyDeclaringClasses = new Map(inherited?.propertyDeclaringClasses ?? []);
  const propertyTypes = new Map(inherited?.propertyTypes ?? []);
  const getAccessorProperties = new Set(inherited?.getAccessorProperties ?? []);
  const readonlyProperties = new Set(inherited?.readonlyProperties ?? []);
  const uninitializedProperties = new Set(inherited?.uninitializedProperties ?? []);
  for (const member of classDeclaration.members) {
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
        getAccessorProperties.delete(name);
        if (member.initializer === undefined) {
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
        uninitializedProperties.delete(name);
      } else if (isMethodDeclaration(member)) {
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
    uninitializedProperties,
  };
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

function checkMissingAbstractMembers(classDeclaration: ClassDeclaration, state: CheckState, classIsAbstract: boolean, inherited: ClassMemberNames | undefined, classMembers: ClassMemberNames): void {
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
    return member.body === undefined ? undefined : getterBodyReturnType(member.body);
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

function getterBodyReturnType(body: Block): CheckedType | undefined {
  for (const statement of body.statements) {
    if (isReturnStatement(statement) && statement.expression !== undefined) {
      return literalExpressionType(statement.expression);
    }
  }
  return undefined;
}

function checkInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (invalidClassNames.has(interfaceDeclaration.name.text)) {
    state.diagnostics.push(createDiagnostic(2427, interfaceDeclaration.name.text));
  }
  bindInterfaceDeclaration(interfaceDeclaration, state, environment);
  const interfaceEnvironment = new Map(environment);
  addTypeParametersToEnvironment(interfaceDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], interfaceEnvironment);
  checkTypeElements(interfaceDeclaration.members, state, interfaceEnvironment, true);
}

function bindInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const interfaceEnvironment = new Map(environment);
  addTypeParametersToEnvironment(interfaceDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], interfaceEnvironment);
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
  for (const member of interfaceDeclaration.members) {
    if (isMethodSignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        ownProperties.set(name, methodSignatureType(member, environment, state));
      }
      continue;
    }
    if (isPropertySignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        ownProperties.set(name, member.type === undefined ? anyType : typeFromTypeNode(member.type, environment, state));
      }
    }
  }
  for (const baseInterface of inheritedInterfaces) {
    for (const [name, basePropertyType] of baseInterface.properties.entries()) {
      const ownPropertyType = ownProperties.get(name);
      if (ownPropertyType !== undefined && !isAssignableTo(ownPropertyType, basePropertyType)) {
        state.diagnostics.push(createDiagnostic(2430, interfaceDeclaration.name.text, baseInterface.name));
      }
    }
  }
  const mergedProperties = new Map<string, CheckedType>();
  for (const baseInterface of inheritedInterfaces) {
    for (const [name, type] of baseInterface.properties.entries()) {
      mergedProperties.set(name, type);
    }
  }
  for (const [name, type] of ownProperties.entries()) {
    mergedProperties.set(name, type);
  }
  return { name: interfaceDeclaration.name.text, properties: mergedProperties };
}

function methodSignatureType(method: MethodSignatureDeclaration, environment: TypeEnvironment, state: CheckState): CheckedType {
  const signatureEnvironment = new Map(environment);
  const typeParameters = method.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, signatureEnvironment);
  return {
    kind: "function",
    typeParameters,
    parameters: method.parameters.map(parameter => parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, signatureEnvironment, state)),
    returnType: method.type === undefined ? unresolvedType : typeFromTypeNode(method.type, signatureEnvironment, state),
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

function checkClassElement(member: ClassElement, state: CheckState, environment: TypeEnvironment, ambient: boolean, classIsAbstract: boolean, classMembers: ClassMemberNames, inheritedMembers: ClassMemberNames | undefined, accessorContextTypes: ReadonlyMap<string, AccessorContextTypes>): void {
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
    const memberEnvironment = new Map(environment);
    if (isConstructorDeclaration(member) && classMembers.className !== undefined) {
      memberEnvironment.set("this", thisClassType(classMembers, "constructor"));
    }
    seedUnqualifiedClassMemberDiagnostics(memberEnvironment, classMembers, isMethodDeclaration(member) && hasModifier(member, Kind.StaticKeyword));
    checkSignatureParameters(member.parameters, state, memberEnvironment, isMethodDeclaration(member) || member.body === undefined, ambient);
    if (member.body !== undefined) {
      if (ambient) {
        state.diagnostics.push(createDiagnostic(1183));
      }
      const returnType = member.type === undefined ? undefined : typeFromTypeNode(member.type, memberEnvironment, state);
      checkBlock(member.body, state, memberEnvironment, returnType);
    }
    return;
  }
  if (isPropertyDeclaration(member) && member.initializer !== undefined) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkUninitializedProperty(member, state, ambient);
    checkAutoAccessorTarget(member, state, ambient);
    checkInheritedPropertyOverride(member, state, environment, classMembers, inheritedMembers);
    if (member.type !== undefined) {
      typeFromTypeNode(member.type, environment, state);
    }
    const initializerEnvironment = new Map(environment);
    if (classMembers.className !== undefined) {
      initializerEnvironment.set("this", thisClassType(classMembers, "fieldInitializer"));
    }
    inferExpression(member.initializer, state, initializerEnvironment);
    return;
  }
  if (isPropertyDeclaration(member)) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkUninitializedProperty(member, state, ambient);
    checkAutoAccessorTarget(member, state, ambient);
    checkInheritedPropertyOverride(member, state, environment, classMembers, inheritedMembers);
    if (member.type !== undefined) {
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
  if (expectedType === undefined || actualType === undefined || isAssignableTo(actualType, expectedType)) {
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
    abstractProperties: classMembers.abstractProperties,
    abstractPropertyDeclaringClasses: classMembers.abstractPropertyDeclaringClasses,
    uninitializedProperties: classMembers.uninitializedProperties,
    mode,
  };
}

function checkUninitializedProperty(member: Extract<ClassElement, { readonly kind: Kind.PropertyDeclaration }>, state: CheckState, ambient: boolean): void {
  if (
    ambient
    || member.type === undefined
    || member.initializer !== undefined
    || hasModifier(member, Kind.StaticKeyword)
    || hasModifier(member, Kind.AbstractKeyword)
    || (member as { readonly postfixToken?: { readonly kind: Kind } }).postfixToken?.kind === Kind.ExclamationToken
    || (member as { readonly postfixToken?: { readonly kind: Kind } }).postfixToken?.kind === Kind.QuestionToken
  ) {
    return;
  }
  const name = propertyNameText(member.name);
  if (name !== undefined) {
    state.diagnostics.push(createDiagnostic(2564, name));
  }
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
    if (isCallSignatureDeclaration(member) || isConstructSignatureDeclaration(member)) {
      checkSignatureParameters(member.parameters, state, environment, true);
      if (member.type !== undefined) {
        typeFromTypeNode(member.type, environment, state);
      }
      if (isConstructSignatureDeclaration(member) && member.type === undefined) {
        state.diagnostics.push(createDiagnostic(7013));
      }
      continue;
    }
    if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
      checkAccessorDeclaration(member, state, environment, ambient);
    }
  }
}

function checkAccessorDeclaration(accessor: GetAccessorDeclaration | SetAccessorDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean, contextualAccessorType?: CheckedType): void {
  const accessorEnvironment = new Map(environment);
  if (accessor.typeParameters !== undefined && accessor.typeParameters.length > 0) {
    state.diagnostics.push(createDiagnostic(1094));
  }
  if (isGetAccessorDeclaration(accessor)) {
    if (accessor.parameters.length > 0) {
      state.diagnostics.push(createDiagnostic(1054));
    }
    checkSignatureParameters(accessor.parameters, state, accessorEnvironment, true);
    const returnType = accessor.type === undefined ? contextualAccessorType : typeFromTypeNode(accessor.type, accessorEnvironment, state);
    checkAccessorBody(accessor, state, accessorEnvironment, ambient, returnType);
    return;
  }
  if (accessor.parameters.length !== 1) {
    state.diagnostics.push(createDiagnostic(1049));
  }
  for (const parameter of accessor.parameters) {
    checkParameterPropertyModifiers(parameter, state);
    if (parameter.questionToken !== undefined) {
      state.diagnostics.push(createDiagnostic(1051));
    }
    if (parameter.initializer !== undefined) {
      state.diagnostics.push(createDiagnostic(1052));
    }
    if (parameter.dotDotDotToken !== undefined) {
      state.diagnostics.push(createDiagnostic(1053));
    }
    const parameterType = parameter.type === undefined ? contextualAccessorType ?? unresolvedType : typeFromTypeNode(parameter.type, accessorEnvironment, state);
    setBindingNameType(parameter.name, parameterType, accessorEnvironment);
  }
  if (accessor.type !== undefined) {
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
  checkBlock(accessor.body, state, environment, expectedReturnType);
}

function checkSignatureParameters(parameters: readonly ParameterDeclaration[], state: CheckState, environment: TypeEnvironment, disallowParameterProperties: boolean, ambient = false): readonly CheckedType[] {
  return parameters.map(parameter => {
    if (disallowParameterProperties) {
      checkParameterPropertyModifiers(parameter, state);
    }
    checkImplicitAnyParameter(parameter, state);
    const parameterType = parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, environment, state);
    checkStrictModeBindingName(parameter.name, state, ambient);
    setBindingNameType(parameter.name, parameterType, environment);
    return parameterType;
  });
}

function addTypeParametersToEnvironment(typeParameters: readonly string[], environment: TypeEnvironment): void {
  for (const typeParameter of typeParameters) {
    environment.set(typeParameter, { kind: "typeParameter", name: typeParameter });
  }
}

function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  const functionEnvironment = new Map(environment);
  const typeParameters = functionDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, functionEnvironment);
  const parameterTypes = functionDeclaration.parameters.map(parameter => parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, functionEnvironment, state));
  const returnType = functionDeclaration.type === undefined ? undefined : typeFromTypeNode(functionDeclaration.type, functionEnvironment, state);
  if (!ambient && functionDeclaration.body === undefined && functionDeclaration.type === undefined) {
    state.diagnostics.push(createDiagnostic(7010, functionDeclaration.name?.text ?? "(Missing)", "any"));
  }
  if (functionDeclaration.name !== undefined) {
    checkStrictModeIdentifier(functionDeclaration.name.text, state, ambient);
  }
  if (functionDeclaration.name !== undefined) {
    environment.set(functionDeclaration.name.text, {
      kind: "function",
      typeParameters,
      parameters: parameterTypes,
      returnType: returnType ?? unresolvedType,
    });
  }
  for (let index = 0; index < functionDeclaration.parameters.length; index += 1) {
    const parameter = functionDeclaration.parameters[index]!;
    checkParameterPropertyModifiers(parameter, state);
    checkImplicitAnyParameter(parameter, state);
    checkStrictModeBindingName(parameter.name, state, ambient);
    setBindingNameType(parameter.name, parameterTypes[index] ?? unresolvedType, functionEnvironment);
  }
  if (functionDeclaration.body !== undefined) {
    checkBlock(functionDeclaration.body, state, functionEnvironment, returnType);
    if (returnType !== undefined && requiresReturnValue(returnType) && !blockContainsReturn(functionDeclaration.body)) {
      state.diagnostics.push(createDiagnostic(2355));
    }
  }
}

function checkBlock(block: Block, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): void {
  checkStatements(block.statements, state, new Map(environment), expectedReturnType, false);
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
  if (isWhileStatement(statement) || isDoStatement(statement) || isForStatement(statement) || isForInStatement(statement) || isForOfStatement(statement)) {
    return statementContainsReturn(statement.statement);
  }
  return false;
}

function inferExpression(expression: Expression, state: CheckState, environment: TypeEnvironment): CheckedType {
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
    const bound = environment.get(expression.text);
    if (bound?.kind === "valueAndType") {
      return bound.value;
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
    return bound ?? unresolvedType;
  }
  if (isParenthesizedExpression(expression)) {
    return inferExpression(expression.expression, state, environment);
  }
  if (isPrefixUnaryExpression(expression)) {
    inferExpression(expression.operand, state, environment);
    return expression.operator === Kind.ExclamationToken ? booleanType : numberType;
  }
  if (isPostfixUnaryExpression(expression)) {
    inferExpression(expression.operand, state, environment);
    return numberType;
  }
  if (isSpreadElement(expression)) {
    return inferExpression(expression.expression, state, environment);
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
  if (isBinaryExpression(expression)) {
    if (isAssignmentOperator(expression.operatorToken.kind)) {
      return inferAssignmentExpression(expression, state, environment);
    }
    const left = inferExpression(expression.left, state, environment);
    const right = inferExpression(expression.right, state, environment);
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
    if (expression.operatorToken.kind === Kind.PlusToken && (left.kind === "string" || right.kind === "string")) {
      return stringType;
    }
    if (left.kind === "number" && right.kind === "number") {
      return numberType;
    }
    return unresolvedType;
  }
  if (isPropertyAccessExpression(expression)) {
    return inferPropertyAccess(expression.expression, expression.name.text, state, environment);
  }
  if (isElementAccessExpression(expression)) {
    const receiver = inferExpression(expression.expression, state, environment);
    inferExpression(expression.argumentExpression, state, environment);
    if (receiver.kind === "array") {
      return receiver.elementType;
    }
    if ((receiver.kind === "namespace" || receiver.kind === "moduleNamespace") && isStringLiteral(expression.argumentExpression)) {
      return receiver.exports.get(expression.argumentExpression.text) ?? unresolvedType;
    }
    return unresolvedType;
  }
  if (isCallExpression(expression)) {
    if (isPropertyAccessExpression(expression.expression)) {
      const firstArgument = expression.arguments[0];
      if (expression.expression.name.text === "map" && firstArgument !== undefined && isArrowFunction(firstArgument)) {
        const receiverType = inferExpression(expression.expression.expression, state, environment);
        if (receiverType.kind === "array") {
          inferArrowFunction(firstArgument, state, environment, [receiverType.elementType]);
          for (const argument of expression.arguments.slice(1)) {
            inferExpression(argument, state, environment);
          }
          return { kind: "array", elementType: anyType };
        }
      }
    }
    const calleeType = inferExpression(expression.expression, state, environment);
    const argumentTypes = expression.arguments.map((argument, index) => inferExpressionWithContext(
      argument,
      state,
      environment,
      calleeType.kind === "function" ? calleeType.parameters[index] : undefined,
    ));
    if (calleeType.kind === "any" || calleeType.kind === "unknown" || calleeType.kind === "unresolved") {
      return anyType;
    }
    if (calleeType.kind === "function") {
      const typeArguments = expression.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [];
      const instantiatedParameters = instantiateFunctionParameterTypes(calleeType, typeArguments, argumentTypes);
      for (let index = 0; index < instantiatedParameters.length && index < argumentTypes.length; index += 1) {
        checkAssignable(argumentTypes[index]!, instantiatedParameters[index]!, state);
      }
      return instantiateFunctionReturnType(calleeType, typeArguments, argumentTypes);
    }
    if (calleeType.kind === "accessorProperty") {
      state.diagnostics.push(createDiagnostic(6234));
      return anyType;
    }
    return unresolvedType;
  }
  if (isNewExpression(expression)) {
    const constructorType = inferExpression(expression.expression, state, environment);
    if (isAbstractConstructorType(constructorType)) {
      state.diagnostics.push(createDiagnostic(2511));
    }
    for (const argument of expression.arguments ?? []) {
      inferExpression(argument, state, environment);
    }
    return constructorType.kind === "classConstructor"
      ? { kind: "classInstance", name: constructorType.name, typeArguments: constructorType.typeArguments, members: constructorType.members }
      : anyType;
  }
  return unresolvedType;
}

function inferExpressionWithContext(expression: Expression, state: CheckState, environment: TypeEnvironment, contextualType: CheckedType | undefined): CheckedType {
  if (isArrowFunction(expression) && contextualType?.kind === "function") {
    return inferArrowFunction(expression, state, environment, contextualType.parameters);
  }
  if (isObjectLiteralExpression(expression) && contextualType !== undefined) {
    return inferObjectLiteral(expression, state, environment, contextualType);
  }
  return inferExpression(expression, state, environment);
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
  const targetType = typeFromTypeNode(expression.type, environment, state);
  checkAssertionComparable(actualType, targetType, state);
  return targetType;
}

function inferAssignmentExpression(expression: Extract<Expression, { readonly kind: Kind.BinaryExpression }>, state: CheckState, environment: TypeEnvironment): CheckedType {
  const operator = expression.operatorToken.kind;
  if (assignmentOperatorReadsTarget(operator)) {
    inferExpression(expression.left, state, environment);
  } else {
    checkAssignmentTargetReference(expression.left, state, environment);
  }
  const targetType = assignmentTargetType(expression.left, environment);
  const right = inferExpressionWithContext(expression.right, state, environment, targetType);
  diagnoseAbstractThisDestructuring(expression.left, expression.right, state, environment);
  if (assignmentOperatorDefinitelyAssignsTarget(operator)) {
    assignExpressionTarget(expression.left, right, state, environment);
  }
  return right;
}

function assignmentTargetType(expression: Expression, environment: TypeEnvironment): CheckedType | undefined {
  if (isIdentifier(expression)) {
    const target = environment.get(expression.text);
    return target?.kind === "unassignedVariable" ? target.type : target;
  }
  if (isParenthesizedExpression(expression)) {
    return assignmentTargetType(expression.expression, environment);
  }
  return undefined;
}

function checkAssignmentTargetReference(expression: Expression, state: CheckState, environment: TypeEnvironment): void {
  if (isIdentifier(expression)) {
    return;
  }
  if (isParenthesizedExpression(expression)) {
    checkAssignmentTargetReference(expression.expression, state, environment);
    return;
  }
  if (isPropertyAccessExpression(expression)) {
    checkPropertyAssignmentTarget(expression.expression, expression.name.text, state, environment);
    return;
  }
  if (isElementAccessExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    inferExpression(expression.argumentExpression, state, environment);
    return;
  }
  inferExpression(expression, state, environment);
}

function checkPropertyAssignmentTarget(expression: Expression, propertyName: string, state: CheckState, environment: TypeEnvironment): void {
  const receiverType = inferExpression(expression, state, environment);
  if (receiverType.kind === "thisClass") {
    diagnoseThisPropertyAccess(receiverType, propertyName, state);
    return;
  }
  if (receiverType.kind === "classInstance" && receiverType.members.readonlyProperties.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2540, propertyName));
  }
}

function assignExpressionTarget(expression: Expression, assignedType: CheckedType, state: CheckState, environment: TypeEnvironment): void {
  if (isIdentifier(expression)) {
    const existing = environment.get(expression.text);
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
    const receiverType = inferExpression(expression.expression, state, environment);
    if (receiverType.kind === "object") {
      const targetType = receiverType.properties.get(expression.name.text);
      if (targetType !== undefined) {
        checkAssignable(assignedType, targetType, state);
      }
    }
  }
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

function inferArrowFunction(arrowFunction: ArrowFunction, state: CheckState, environment: TypeEnvironment, contextualParameterTypes: readonly CheckedType[] = []): CheckedType {
  const arrowEnvironment = new Map(environment);
  suppressImmediateThisDiagnostics(arrowEnvironment);
  for (let parameterIndex = 0; parameterIndex < arrowFunction.parameters.length; parameterIndex += 1) {
    const parameter = arrowFunction.parameters[parameterIndex]!;
    checkParameterPropertyModifiers(parameter, state);
    const parameterType = parameter.type === undefined ? contextualParameterTypes[parameterIndex] ?? unresolvedType : typeFromTypeNode(parameter.type, arrowEnvironment, state);
    checkStrictModeBindingName(parameter.name, state, false);
    setBindingNameType(parameter.name, parameterType, arrowEnvironment);
  }
  const declaredReturnType = arrowFunction.type === undefined ? undefined : typeFromTypeNode(arrowFunction.type, arrowEnvironment, state);
  const inferredReturnType = inferConciseBody(arrowFunction.body, state, arrowEnvironment, declaredReturnType);
  return {
    kind: "function",
    typeParameters: [],
    parameters: arrowFunction.parameters.map((parameter, parameterIndex) => parameter.type === undefined ? contextualParameterTypes[parameterIndex] ?? unresolvedType : typeFromTypeNode(parameter.type, arrowEnvironment, state)),
    returnType: declaredReturnType ?? inferredReturnType,
  };
}

function suppressImmediateThisDiagnostics(environment: TypeEnvironment): void {
  if (environment.get("this")?.kind === "thisClass") {
    environment.set("this", anyType);
  }
}

function inferConciseBody(body: ConciseBody, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined): CheckedType {
  if (isBlock(body)) {
    checkBlock(body, state, environment, expectedReturnType);
    return expectedReturnType ?? unresolvedType;
  }
  const bodyType = inferExpression(body, state, environment);
  if (expectedReturnType !== undefined) {
    checkAssignable(bodyType, expectedReturnType, state);
  }
  return bodyType;
}

function inferPropertyAccess(expression: Expression, propertyName: string, state: CheckState, environment: TypeEnvironment): CheckedType {
  const receiverType = inferExpression(expression, state, environment);
  if (receiverType.kind === "unresolved" && isIdentifier(expression) && !environment.has(expression.text)) {
    state.diagnostics.push(createDiagnostic(2304, expression.text));
    return anyType;
  }
  if (receiverType.kind === "thisClass") {
    diagnoseThisPropertyAccess(receiverType, propertyName, state);
    return anyType;
  }
  if (receiverType.kind === "classInstance") {
    const propertyType = receiverType.members.propertyTypes.get(propertyName);
    if (propertyType !== undefined) {
      return receiverType.members.getAccessorProperties.has(propertyName) ? { kind: "accessorProperty", type: propertyType } : propertyType;
    }
    return anyType;
  }
  if (receiverType.kind === "object") {
    const propertyType = receiverType.properties.get(propertyName);
    if (propertyType !== undefined) {
      return propertyType;
    }
    state.diagnostics.push(createDiagnostic(2339, propertyName, displayType(receiverType)));
    return anyType;
  }
  if (receiverType.kind === "interface") {
    const propertyType = receiverType.members.properties.get(propertyName);
    if (propertyType !== undefined) {
      return propertyType;
    }
    state.diagnostics.push(createDiagnostic(2339, propertyName, displayType(receiverType)));
    return anyType;
  }
  if (receiverType.kind === "moduleNamespace") {
    const propertyType = receiverType.exports.get(propertyName);
    if (propertyType !== undefined) {
      return propertyType;
    }
    state.diagnostics.push(createDiagnostic(2339, propertyName, displayType(receiverType)));
    return anyType;
  }
  if (receiverType.kind === "namespace") {
    const propertyType = receiverType.exports.get(propertyName);
    if (propertyType !== undefined) {
      return propertyType;
    }
    state.diagnostics.push(createDiagnostic(2339, propertyName, displayType(receiverType)));
    return anyType;
  }
  if (receiverType.kind === "number" && propertyName === "toFixed") {
    return { kind: "function", typeParameters: [], parameters: [], returnType: stringType };
  }
  if (receiverType.kind === "string" && propertyName === "length") {
    return numberType;
  }
  if (receiverType.kind === "array" && propertyName === "length") {
    return numberType;
  }
  if (receiverType.kind === "array" && arrayMethodReturnTypes.has(propertyName)) {
    return { kind: "function", typeParameters: [], parameters: [], returnType: arrayMethodReturnTypes.get(propertyName)! };
  }
  if (receiverType.kind === "string" && stringMethodReturnTypes.has(propertyName)) {
    return { kind: "function", typeParameters: [], parameters: [], returnType: stringMethodReturnTypes.get(propertyName)! };
  }
  if (receiverType.kind === "unknown" || receiverType.kind === "unresolved") {
    return anyType;
  }
  if (receiverType.kind !== "any" && receiverType.kind !== "function") {
    state.diagnostics.push(createDiagnostic(2339, propertyName, displayType(receiverType)));
    return anyType;
  }
  return anyType;
}

function diagnoseThisPropertyAccess(receiverType: Extract<CheckedType, { readonly kind: "thisClass" }>, propertyName: string, state: CheckState): void {
  if (receiverType.abstractProperties.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2715, propertyName, receiverType.abstractPropertyDeclaringClasses.get(propertyName) ?? receiverType.className));
  }
  if (receiverType.mode === "fieldInitializer" && receiverType.uninitializedProperties.has(propertyName)) {
    state.diagnostics.push(createDiagnostic(2729, propertyName));
  }
}

function setBindingNameType(name: BindingName, type: CheckedType, environment: TypeEnvironment): void {
  if (isIdentifier(name)) {
    environment.set(name.text, type);
    return;
  }
  if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      setBindingElementType(element, type, environment);
    }
  }
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
  state.diagnostics.push(createDiagnostic(state.strictModeReason === "module" ? 1215 : 1100, name));
}

function setBindingElementType(element: BindingElement, type: CheckedType, environment: TypeEnvironment): void {
  if (element.name !== undefined) {
    setBindingNameType(element.name, type, environment);
  }
}

function inferObjectLiteral(expression: Extract<Expression, { readonly kind: Kind.ObjectLiteralExpression }>, state: CheckState, environment: TypeEnvironment, contextualType?: CheckedType): CheckedType {
  const properties = new Map<string, CheckedType>();
  const readonlyProperties = new Set<string>();
  for (const property of expression.properties) {
    if (isPropertyAssignment(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        properties.set(name, inferExpressionWithContext(property.initializer, state, environment, contextualObjectPropertyType(contextualType, name)));
      }
      continue;
    }
    if (isShorthandPropertyAssignment(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        properties.set(name, environment.get(name) ?? anyType);
      }
      continue;
    }
    if (isMethodDeclaration(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        properties.set(name, contextualObjectPropertyType(contextualType, name) ?? methodDeclarationType(property, environment, state));
      }
      continue;
    }
    if (isGetAccessorDeclaration(property) || isSetAccessorDeclaration(property)) {
      const name = propertyNameDiagnosticText(property.name);
      if (name !== undefined) {
        properties.set(name, classMemberPropertyType(property, environment) ?? anyType);
        if (isGetAccessorDeclaration(property)) {
          readonlyProperties.add(name);
        }
      }
    }
  }
  const objectType: CheckedType = { kind: "object", properties, readonlyProperties };
  const objectEnvironment = new Map(environment);
  objectEnvironment.set("this", objectType);
  for (const property of expression.properties) {
    if (isPropertyAssignment(property)) {
      continue;
    }
    if (isShorthandPropertyAssignment(property)) {
      if (isIdentifier(property.name)) {
        inferExpression(property.name, state, environment);
      }
      continue;
    }
    if (isMethodDeclaration(property)) {
      checkObjectLiteralMethod(property, state, objectEnvironment);
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
    return contextualType.properties.get(propertyName);
  }
  if (contextualType.kind === "interface") {
    return contextualType.members.properties.get(propertyName);
  }
  return undefined;
}

function methodDeclarationType(method: MethodDeclaration, environment: TypeEnvironment, state: CheckState): CheckedType {
  const signatureEnvironment = new Map(environment);
  const typeParameters = method.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, signatureEnvironment);
  const parameters = method.parameters.map(parameter => parameter.type === undefined ? anyType : typeFromTypeNode(parameter.type, signatureEnvironment, state));
  const returnType = method.type === undefined ? methodBodyReturnType(method.body) : typeFromTypeNode(method.type, signatureEnvironment, state);
  return { kind: "function", typeParameters, parameters, returnType };
}

function methodBodyReturnType(body: Block | undefined): CheckedType {
  if (body === undefined) {
    return unresolvedType;
  }
  const returns = body.statements
    .filter(isReturnStatement)
    .map(statement => statement.expression === undefined ? voidType : literalExpressionType(statement.expression) ?? anyType);
  return returns.length === 0 ? voidType : unionType(returns);
}

function checkObjectLiteralMethod(method: MethodDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const methodEnvironment = new Map(environment);
  const typeParameters = method.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, methodEnvironment);
  checkSignatureParameters(method.parameters, state, methodEnvironment, true);
  if (method.body !== undefined) {
    const expectedReturnType = method.type === undefined ? undefined : typeFromTypeNode(method.type, methodEnvironment, state);
    checkBlock(method.body, state, methodEnvironment, expectedReturnType);
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
  if (isUnionTypeNode(type)) {
    return { kind: "union", types: type.types.map(unionMember => typeFromTypeNode(unionMember, environment, state)) };
  }
  if (isIntersectionTypeNode(type)) {
    return { kind: "intersection", types: type.types.map(intersectionMember => typeFromTypeNode(intersectionMember, environment, state)) };
  }
  if (isTypeLiteralNode(type)) {
    return typeLiteralType(type.members, state ?? emptyCheckState(), environment);
  }
  if (isParenthesizedTypeNode(type)) {
    return typeFromTypeNode(type.type, environment, state);
  }
  if (isFunctionTypeNode(type) || isConstructorTypeNode(type)) {
    const signatureEnvironment = new Map(environment);
    const typeParameters = type.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
    addTypeParametersToEnvironment(typeParameters, signatureEnvironment);
    const parameterTypes = checkSignatureParameters(type.parameters, state ?? emptyCheckState(), signatureEnvironment, true);
    const returnType = type.type === undefined ? unresolvedType : typeFromTypeNode(type.type, signatureEnvironment, state);
    return { kind: "function", typeParameters, parameters: parameterTypes, returnType };
  }
  if (isTypeReferenceNode(type)) {
    const resolved = resolveEntityName(type.typeName, environment, state, "type");
    if (resolved !== undefined) {
      return typeFromResolvedEntity(resolved, entityNameText(type.typeName), state, type.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? []);
    }
    const name = entityNameText(type.typeName);
    if (name === "Record" && type.typeArguments?.[0] !== undefined && type.typeArguments[1] !== undefined) {
      return {
        kind: "record",
        keyType: typeFromTypeNode(type.typeArguments[0], environment, state),
        valueType: typeFromTypeNode(type.typeArguments[1], environment, state),
      };
    }
    if (name === "Array" && type.typeArguments?.[0] !== undefined) {
      return { kind: "array", elementType: typeFromTypeNode(type.typeArguments[0], environment, state) };
    }
    return anyType;
  }
  if (isTypeQueryNode(type)) {
    const name = entityNameText(type.exprName);
    const bound = name === undefined ? undefined : environment.get(name);
    const typeArguments = type.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [];
    return bound === undefined ? anyType : instantiateTypeQuery(bound, typeArguments);
  }
  return anyType;
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
  if (type.kind === "intersection") {
    return { kind: "intersection", types: type.types.map(member => instantiateTypeQuery(member, typeArguments)) };
  }
  return type;
}

function instantiateClassConstructor(type: Extract<CheckedType, { readonly kind: "classConstructor" }>, typeArguments: readonly CheckedType[]): Extract<CheckedType, { readonly kind: "classConstructor" }> {
  const substitutions = classTypeSubstitutions(type, typeArguments);
  return {
    ...type,
    typeArguments: type.typeParameters.map(typeParameter => substitutions.get(typeParameter) ?? anyType),
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
    if (type.typeParameters.length > 0 && type.preserveDisplay) {
      return { kind: "typeAliasInstance", name: type.name, typeArguments: type.typeParameters.map(typeParameter => substitutions.get(typeParameter) ?? anyType), target };
    }
    return target;
  }
  if (type.kind === "typeAliasInstance") {
    return type;
  }
  if (type.kind === "classConstructor") {
    const instantiated = instantiateClassConstructor(type, typeArguments);
    return { kind: "classInstance", name: instantiated.name, typeArguments: instantiated.typeArguments, members: instantiated.members };
  }
  if (type.kind === "interface") {
    return type;
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
  return { diagnostics: [], options, strictMode: false, strictModeReason: undefined };
}

function typeLiteralType(members: readonly TypeElement[], state: CheckState, environment: TypeEnvironment): CheckedType {
  checkTypeElements(members, state, environment, true);
  const properties = new Map<string, CheckedType>();
  const readonlyProperties = new Set<string>();
  for (const member of members) {
    if (isPropertySignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        properties.set(name, member.type === undefined ? anyType : typeFromTypeNode(member.type, environment, state));
        if (hasModifier(member, Kind.ReadonlyKeyword)) {
          readonlyProperties.add(name);
        }
      }
      continue;
    }
    if (isMethodSignatureDeclaration(member)) {
      const name = propertyNameText(member.name);
      if (name !== undefined) {
        properties.set(name, methodSignatureType(member, environment, state));
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
  return { kind: "object", properties, readonlyProperties };
}

function accessorType(accessor: GetAccessorDeclaration | SetAccessorDeclaration, environment: TypeEnvironment, state: CheckState): CheckedType {
  if (isGetAccessorDeclaration(accessor)) {
    return accessor.type === undefined ? anyType : typeFromTypeNode(accessor.type, environment, state);
  }
  return accessor.parameters[0]?.type === undefined ? anyType : typeFromTypeNode(accessor.parameters[0].type, environment, state);
}

function checkAssignable(actual: CheckedType, expected: CheckedType, state: CheckState): void {
  if (expected.kind === "any" || actual.kind === "any" || actual.kind === "null" || expected.kind === "unknown" || expected.kind === "unresolved" || actual.kind === "unresolved") {
    return;
  }
  if (!isAssignableTo(actual, expected)) {
    state.diagnostics.push(createDiagnostic(2322, displayType(actual), displayType(expected)));
  }
}

function checkAssertionComparable(actual: CheckedType, target: CheckedType, state: CheckState): void {
  if (!typesSufficientlyOverlap(target, actual)) {
    state.diagnostics.push(createDiagnostic(2352, displayType(actual), displayType(target)));
  }
}

function typesSufficientlyOverlap(source: CheckedType, target: CheckedType): boolean {
  if (source.kind === "any" || target.kind === "any" || source.kind === "unknown" || target.kind === "unknown" || source.kind === "unresolved" || target.kind === "unresolved") {
    return true;
  }
  if (source.kind === "union") {
    return source.types.some(type => typesSufficientlyOverlap(type, target));
  }
  if (target.kind === "union") {
    return target.types.some(type => typesSufficientlyOverlap(source, type));
  }
  return isAssignableTo(source, target) || isAssignableTo(target, source);
}

function requiresReturnValue(type: CheckedType): boolean {
  return type.kind !== "any" && type.kind !== "unknown" && type.kind !== "unresolved" && type.kind !== "undefined" && type.kind !== "void";
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

function hasDeclareModifier(node: { readonly modifiers?: readonly { readonly kind: Kind }[] }): boolean {
  return hasModifier(node, Kind.DeclareKeyword);
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

function checkParameterPropertyModifiers(parameter: ParameterDeclaration, state: CheckState): void {
  if (parameter.modifiers?.some(modifier => modifier.kind === Kind.PublicKeyword || modifier.kind === Kind.PrivateKeyword || modifier.kind === Kind.ProtectedKeyword || modifier.kind === Kind.ReadonlyKeyword) === true) {
    state.diagnostics.push(createDiagnostic(2369));
  }
}

function checkImplicitAnyParameter(parameter: ParameterDeclaration, state: CheckState): void {
  const hasParameterPropertyModifier = parameter.modifiers?.some(modifier => modifier.kind === Kind.PublicKeyword || modifier.kind === Kind.PrivateKeyword || modifier.kind === Kind.ProtectedKeyword || modifier.kind === Kind.ReadonlyKeyword) === true;
  if ((state.options.noImplicitAny !== true && state.options.strict !== true && !hasParameterPropertyModifier) || parameter.type !== undefined || !isIdentifier(parameter.name)) {
    return;
  }
  state.diagnostics.push(createDiagnostic(7006, parameter.name.text, "any"));
}

function inferArrayLiteral(elements: readonly Expression[], state: CheckState, environment: TypeEnvironment): CheckedType {
  if (elements.length === 0) {
    return { kind: "array", elementType: anyType };
  }
  const elementTypes = elements.map(element => inferExpression(element, state, environment));
  const first = elementTypes[0]!;
  return { kind: "array", elementType: elementTypes.every(type => isSameType(type, first)) ? first : unionType(elementTypes) };
}

function unionType(types: readonly CheckedType[]): CheckedType {
  const flattened = types.flatMap(type => type.kind === "union" ? type.types : [type]);
  const unique = uniqueTypes(flattened);
  return unique.length === 1 ? unique[0]! : { kind: "union", types: unique };
}

function instantiateFunctionReturnType(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): CheckedType {
  if (functionType.typeParameters.length === 0) {
    return functionType.returnType;
  }
  return substituteType(functionType.returnType, functionTypeCallSubstitutions(functionType, explicitTypeArguments, argumentTypes));
}

function instantiateFunctionParameterTypes(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): readonly CheckedType[] {
  if (functionType.typeParameters.length === 0) {
    return functionType.parameters;
  }
  const substitutions = functionTypeCallSubstitutions(functionType, explicitTypeArguments, argumentTypes);
  return functionType.parameters.map(parameter => substituteType(parameter, substitutions));
}

function functionTypeCallSubstitutions(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): ReadonlyMap<string, CheckedType> {
  const substitutions = new Map<string, CheckedType>();
  for (let index = 0; index < explicitTypeArguments.length && index < functionType.typeParameters.length; index += 1) {
    substitutions.set(functionType.typeParameters[index]!, explicitTypeArguments[index]!);
  }
  for (let index = 0; index < functionType.parameters.length && index < argumentTypes.length; index += 1) {
    inferTypeParameterSubstitutions(functionType.parameters[index]!, argumentTypes[index]!, substitutions);
  }
  for (const typeParameter of functionType.typeParameters) {
    if (!substitutions.has(typeParameter)) {
      substitutions.set(typeParameter, anyType);
    }
  }
  return substitutions;
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
}

function substituteType(type: CheckedType, substitutions: ReadonlyMap<string, CheckedType>): CheckedType {
  if (type.kind === "typeParameter") {
    return substitutions.get(type.name) ?? type;
  }
  if (type.kind === "array") {
    return { kind: "array", elementType: substituteType(type.elementType, substitutions) };
  }
  if (type.kind === "union") {
    return { kind: "union", types: type.types.map(unionType => substituteType(unionType, substitutions)) };
  }
  if (type.kind === "intersection") {
    return { kind: "intersection", types: type.types.map(intersectionType => substituteType(intersectionType, substitutions)) };
  }
  if (type.kind === "classConstructor") {
    const typeArguments = type.typeParameters.length > 0
      ? type.typeParameters.map((typeParameter, index) => substitutions.get(typeParameter) ?? substituteType(type.typeArguments[index] ?? anyType, substitutions))
      : type.typeArguments.map(typeArgument => substituteType(typeArgument, substitutions));
    return { ...type, typeArguments };
  }
  if (type.kind === "classInstance") {
    return { ...type, typeArguments: type.typeArguments.map(typeArgument => substituteType(typeArgument, substitutions)) };
  }
  if (type.kind === "function") {
    return {
      kind: "function",
      typeParameters: type.typeParameters,
      parameters: type.parameters.map(parameter => substituteType(parameter, substitutions)),
      returnType: substituteType(type.returnType, substitutions),
    };
  }
  if (type.kind === "typeAliasInstance") {
    return {
      kind: "typeAliasInstance",
      name: type.name,
      typeArguments: type.typeArguments.map(typeArgument => substituteType(typeArgument, substitutions)),
      target: substituteType(type.target, substitutions),
    };
  }
  return type;
}

function isAssignableTo(actual: CheckedType, expected: CheckedType): boolean {
  if (actual.kind === "accessorProperty") {
    return isAssignableTo(actual.type, expected);
  }
  if (expected.kind === "accessorProperty") {
    return isAssignableTo(actual, expected.type);
  }
  if (actual.kind === "unassignedVariable") {
    return isAssignableTo(actual.type, expected);
  }
  if (expected.kind === "unassignedVariable") {
    return isAssignableTo(actual, expected.type);
  }
  if (actual.kind === "valueOnly") {
    return isAssignableTo(actual.type, expected);
  }
  if (expected.kind === "valueOnly") {
    return isAssignableTo(actual, expected.type);
  }
  if (actual.kind === "valueAndType") {
    return isAssignableTo(actual.value, expected);
  }
  if (expected.kind === "valueAndType") {
    return isAssignableTo(actual, expected.value);
  }
  if (actual.kind === "namespaceAndType") {
    return isAssignableTo(actual.type, expected);
  }
  if (expected.kind === "namespaceAndType") {
    return isAssignableTo(actual, expected.type);
  }
  if (actual.kind === "typeAliasInstance") {
    return isAssignableTo(actual.target, expected);
  }
  if (expected.kind === "typeAliasInstance") {
    return isAssignableTo(actual, expected.target);
  }
  if (actual.kind === "any" || expected.kind === "any") {
    return true;
  }
  if (actual.kind === expected.kind && actual.kind !== "array" && actual.kind !== "classConstructor" && actual.kind !== "classInstance" && actual.kind !== "function" && actual.kind !== "interface" && actual.kind !== "intersection" && actual.kind !== "namespace" && actual.kind !== "record" && actual.kind !== "thisClass" && actual.kind !== "typeAlias" && actual.kind !== "typeParameter" && actual.kind !== "union") {
    return true;
  }
  if (actual.kind === "classConstructor" && expected.kind === "classConstructor") {
    return actual.name === expected.name && actual.abstract === expected.abstract && typeArgumentsAssignableTo(actual.typeArguments, expected.typeArguments);
  }
  if (actual.kind === "classInstance" && expected.kind === "classInstance") {
    return actual.name === expected.name ? typeArgumentsAssignableTo(actual.typeArguments, expected.typeArguments) : classMembersAssignableTo(actual.members, expected.members);
  }
  if (actual.kind === "object" && expected.kind === "object") {
    return [...expected.properties.entries()].every(([name, expectedPropertyType]) => {
      const actualPropertyType = actual.properties.get(name);
      return actualPropertyType !== undefined && isAssignableTo(actualPropertyType, expectedPropertyType);
    });
  }
  if (actual.kind === "object" && expected.kind === "record") {
    return [...actual.properties.values()].every(actualPropertyType => isAssignableTo(actualPropertyType, expected.valueType));
  }
  if (actual.kind === "record" && expected.kind === "record") {
    return isAssignableTo(actual.keyType, expected.keyType) && isAssignableTo(actual.valueType, expected.valueType);
  }
  if (actual.kind === "object" && expected.kind === "interface") {
    return objectPropertiesAssignableTo(actual.properties, expected.members.properties);
  }
  if (actual.kind === "interface" && expected.kind === "interface") {
    return objectPropertiesAssignableTo(actual.members.properties, expected.members.properties);
  }
  if (actual.kind === "classInstance" && expected.kind === "interface") {
    return objectPropertiesAssignableTo(actual.members.propertyTypes, expected.members.properties);
  }
  if (actual.kind === "moduleNamespace" && expected.kind === "moduleNamespace") {
    return actual.moduleSpecifier === expected.moduleSpecifier;
  }
  if (actual.kind === "moduleNamespace" && expected.kind === "interface") {
    return objectPropertiesAssignableTo(actual.exports, expected.members.properties);
  }
  if (actual.kind === "interface" && expected.kind === "moduleNamespace") {
    return objectPropertiesAssignableTo(actual.members.properties, expected.exports);
  }
  if (actual.kind === "namespace" && expected.kind === "namespace") {
    return actual.name === expected.name;
  }
  if (actual.kind === "thisClass" && expected.kind === "thisClass") {
    return actual.className === expected.className;
  }
  if (actual.kind === "array" && expected.kind === "array") {
    return isAssignableTo(actual.elementType, expected.elementType);
  }
  if (actual.kind === "function" && expected.kind === "function") {
    return actual.parameters.length <= expected.parameters.length
      && actual.parameters.every((actualParameter, index) => isAssignableTo(expected.parameters[index]!, actualParameter))
      && isAssignableTo(actual.returnType, expected.returnType);
  }
  if (actual.kind === "union") {
    return actual.types.every(type => isAssignableTo(type, expected));
  }
  if (expected.kind === "union") {
    return expected.types.some(type => isAssignableTo(actual, type));
  }
  if (actual.kind === "intersection" && expected.kind === "intersection") {
    return actual.types.length === expected.types.length && actual.types.every((type, index) => isAssignableTo(type, expected.types[index]!));
  }
  if (actual.kind === "intersection") {
    return actual.types.every(type => isAssignableTo(type, expected));
  }
  if (expected.kind === "intersection") {
    return expected.types.every(type => isAssignableTo(actual, type));
  }
  if (actual.kind === "typeParameter" && expected.kind === "typeParameter") {
    return actual.name === expected.name;
  }
  return false;
}

function objectPropertiesAssignableTo(actual: ReadonlyMap<string, CheckedType>, expected: ReadonlyMap<string, CheckedType>): boolean {
  for (const [name, expectedPropertyType] of expected.entries()) {
    const actualPropertyType = actual.get(name);
    if (actualPropertyType === undefined || !isAssignableTo(actualPropertyType, expectedPropertyType)) {
      return false;
    }
  }
  return true;
}

function typeArgumentsAssignableTo(actual: readonly CheckedType[], expected: readonly CheckedType[]): boolean {
  if (actual.length !== expected.length) {
    return actual.length === 0 || expected.length === 0;
  }
  return actual.every((type, index) => isAssignableTo(type, expected[index]!) && isAssignableTo(expected[index]!, type));
}

function classMembersAssignableTo(actual: ClassMemberNames, expected: ClassMemberNames): boolean {
  for (const expectedMember of expected.instance) {
    if (!actual.instance.has(expectedMember)) {
      return false;
    }
    const expectedPropertyType = expected.propertyTypes.get(expectedMember);
    const actualPropertyType = actual.propertyTypes.get(expectedMember);
    if (expectedPropertyType !== undefined && actualPropertyType !== undefined && !isAssignableTo(actualPropertyType, expectedPropertyType)) {
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

function uniqueInOrder(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
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
]);

const arrayMethodReturnTypes = new Map<string, CheckedType>([
  ["concat", { kind: "array", elementType: anyType }],
  ["every", booleanType],
  ["filter", { kind: "array", elementType: anyType }],
  ["find", anyType],
  ["forEach", voidType],
  ["includes", booleanType],
  ["indexOf", numberType],
  ["join", stringType],
  ["map", { kind: "array", elementType: anyType }],
  ["pop", anyType],
  ["push", numberType],
  ["reduce", anyType],
  ["slice", { kind: "array", elementType: anyType }],
  ["some", booleanType],
]);

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
    return `(${type.parameters.map((parameter, index) => `arg${index}: ${displayType(parameter)}`).join(", ")}) => ${displayType(type.returnType)}`;
  }
  if (type.kind === "intersection") {
    return type.types.map(member => member.kind === "function" ? `(${displayType(member)})` : displayType(member)).join(" & ");
  }
  if (type.kind === "array") {
    return `${displayType(type.elementType)}[]`;
  }
  if (type.kind === "typeParameter") {
    return type.name;
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
    return type.name;
  }
  if (type.kind === "moduleNamespace") {
    return `typeof import("${type.diagnosticName}")`;
  }
  if (type.kind === "namespace") {
    return type.name;
  }
  if (type.kind === "object") {
    const entries = [...type.properties.entries()].map(([name, propertyType]) => {
      const readonly = type.readonlyProperties.has(name) ? "readonly " : "";
      return `${readonly}${name}: ${displayType(propertyType)};`;
    });
    return `{ ${entries.join(" ")} }`;
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
