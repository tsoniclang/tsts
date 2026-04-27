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
  isKeywordTypeNode,
  isMethodDeclaration,
  isMissingDeclaration,
  isModuleBlock,
  isModuleDeclaration,
  isNamedImports,
  isNamespaceImport,
  isNewExpression,
  isNumericLiteral,
  isNoSubstitutionTemplateLiteral,
  isObjectLiteralExpression,
  isObjectBindingPattern,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isPrivateIdentifier,
  isQualifiedName,
  isReturnStatement,
  isSatisfiesExpression,
  isSetAccessorDeclaration,
  isSpreadElement,
  isStringLiteral,
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
  type BindingElement,
  type BindingName,
  type ClassDeclaration,
  type ClassElement,
  type ConciseBody,
  type ConstructorDeclaration,
  type EntityName,
  type Expression,
  type FunctionDeclaration,
  type GetAccessorDeclaration,
  type ImportDeclaration,
  type InterfaceDeclaration,
  type MethodDeclaration,
  type ParameterDeclaration,
  type PropertyName,
  type SetAccessorDeclaration,
  type SourceFile,
  type Statement,
  type TypeElement,
  type TypeNode,
} from "../ast/index.js";
import { createDiagnostic, type Diagnostic } from "../diagnostics/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";

type PrimitiveTypeName = "any" | "boolean" | "number" | "string" | "unknown" | "void";

type CheckedType =
  | { readonly kind: PrimitiveTypeName | "unresolved" }
  | { readonly kind: "array"; readonly elementType: CheckedType }
  | { readonly kind: "classConstructor"; readonly name: string; readonly abstract: boolean }
  | { readonly kind: "function"; readonly typeParameters: readonly string[]; readonly parameters: readonly CheckedType[]; readonly returnType: CheckedType }
  | { readonly kind: "typeAlias"; readonly target: CheckedType }
  | { readonly kind: "typeParameter"; readonly name: string }
  | { readonly kind: "union"; readonly types: readonly CheckedType[] }
  | { readonly kind: "unqualifiedStaticMember"; readonly className: string; readonly memberName: string }
  | { readonly kind: "unqualifiedInstanceMember"; readonly memberName: string };

export type CheckDiagnostic = Diagnostic;

export interface CheckResult {
  readonly diagnostics: readonly CheckDiagnostic[];
}

interface CheckState {
  readonly diagnostics: CheckDiagnostic[];
}

type TypeEnvironment = Map<string, CheckedType>;

interface ClassMemberNames {
  readonly className: string | undefined;
  readonly instance: ReadonlySet<string>;
  readonly static: ReadonlySet<string>;
}

const anyType: CheckedType = { kind: "any" };
const unknownType: CheckedType = { kind: "unknown" };
const unresolvedType: CheckedType = { kind: "unresolved" };
const numberType: CheckedType = { kind: "number" };
const stringType: CheckedType = { kind: "string" };
const voidType: CheckedType = { kind: "void" };
const booleanType: CheckedType = { kind: "boolean" };
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

export function checkSourceFile(sourceFile: SourceFile): CheckResult {
  const state: CheckState = { diagnostics: [] };
  checkStatements(sourceFile.statements, state, new Map(), undefined, false);
  return { diagnostics: state.diagnostics };
}

export function checkProgram(program: Program): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [...program.diagnostics];
  if (diagnostics.length > 0) {
    return diagnostics;
  }
  for (const sourceFile of program.sourceFiles) {
    const result = checkSourceFile(sourceFile.sourceFile);
    diagnostics.push(...result.diagnostics.map(diagnostic => ({
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

function checkStatements(statements: readonly Statement[], state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean): void {
  checkFunctionDeclarationOverloads(statements, state, ambient);
  const statementListHasExportedElements = statements.some(statement => isExportedElement(statement));
  for (const statement of statements) {
    checkStatement(statement, state, environment, expectedReturnType, ambient, statementListHasExportedElements);
  }
}

function checkStatement(statement: Statement, state: CheckState, environment: TypeEnvironment, expectedReturnType: CheckedType | undefined, ambient: boolean, statementListHasExportedElements: boolean): void {
  if (isImportDeclaration(statement)) {
    bindImportDeclaration(statement, environment);
    return;
  }
  if (isImportEqualsDeclaration(statement)) {
    environment.set(statement.name.text, anyType);
    return;
  }
  if (isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type, environment, state);
      const initializerType = declaration.initializer === undefined ? undefined : inferExpression(declaration.initializer, state, environment);
      if (declaredType !== undefined && initializerType !== undefined) {
        checkAssignable(initializerType, declaredType, state);
      }
      setBindingNameType(declaration.name, declaredType ?? initializerType ?? unresolvedType, environment);
    }
    return;
  }
  if (isFunctionDeclaration(statement)) {
    checkFunctionDeclaration(statement, state, environment);
    return;
  }
  if (isClassDeclaration(statement)) {
    checkClassDeclaration(statement, state, environment, ambient || hasDeclareModifier(statement));
    return;
  }
  if (isInterfaceDeclaration(statement)) {
    checkInterfaceDeclaration(statement, state, environment);
    return;
  }
  if (isTypeAliasDeclaration(statement)) {
    const aliasEnvironment = new Map(environment);
    addTypeParametersToEnvironment(statement.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], aliasEnvironment);
    environment.set(statement.name.text, { kind: "typeAlias", target: typeFromTypeNode(statement.type, aliasEnvironment, state) });
    return;
  }
  if (isModuleDeclaration(statement)) {
    if (isModuleBlock(statement.body)) {
      checkStatements(statement.body.statements, state, new Map(environment), expectedReturnType, ambient || hasDeclareModifier(statement));
    }
    return;
  }
  if (isExportAssignment(statement)) {
    checkExportAssignment(statement, state, environment, statementListHasExportedElements);
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
    checkForInitializer(statement.initializer, state, loopEnvironment);
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
    inferExpression(statement.expression, state, environment);
    return;
  }
  if (isBlock(statement)) {
    checkBlock(statement, state, environment, expectedReturnType);
  }
}

function checkExportAssignment(statement: Extract<Statement, { readonly kind: Kind.ExportAssignment }>, state: CheckState, environment: TypeEnvironment, statementListHasExportedElements: boolean): void {
  if (isIdentifier(statement.expression) && !environment.has(statement.expression.text)) {
    state.diagnostics.push(createDiagnostic(2304, statement.expression.text));
  } else {
    inferExpression(statement.expression, state, environment);
  }
  if (statement.isExportEquals && statementListHasExportedElements) {
    state.diagnostics.push(createDiagnostic(2309));
  }
}

function bindImportDeclaration(statement: ImportDeclaration, environment: TypeEnvironment): void {
  if (statement.importClause?.name !== undefined) {
    environment.set(statement.importClause.name.text, anyType);
  }
  const namedBindings = statement.importClause?.namedBindings;
  if (namedBindings === undefined) {
    return;
  }
  if (isNamespaceImport(namedBindings)) {
    environment.set(namedBindings.name.text, anyType);
    return;
  }
  if (isNamedImports(namedBindings)) {
    for (const specifier of namedBindings.elements) {
      environment.set(specifier.name.text, anyType);
    }
  }
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

function checkForInitializer(initializer: Extract<Statement, { readonly kind: Kind.ForStatement }>["initializer"] | Extract<Statement, { readonly kind: Kind.ForInStatement }>["initializer"], state: CheckState, environment: TypeEnvironment): void {
  if (initializer === undefined) {
    return;
  }
  if (isVariableDeclarationList(initializer)) {
    for (const declaration of initializer.declarations) {
      const declaredType = declaration.type === undefined ? undefined : typeFromTypeNode(declaration.type, environment, state);
      const initializerType = declaration.initializer === undefined ? undefined : inferExpression(declaration.initializer, state, environment);
      if (declaredType !== undefined && initializerType !== undefined) {
        checkAssignable(initializerType, declaredType, state);
      }
      setBindingNameType(declaration.name, declaredType ?? initializerType ?? unresolvedType, environment);
    }
    return;
  }
  if (isMissingDeclaration(initializer)) {
    return;
  }
  inferExpression(initializer, state, environment);
}

function checkClassDeclaration(classDeclaration: ClassDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  const classIsAbstract = hasModifier(classDeclaration, Kind.AbstractKeyword);
  const classMembers = collectClassMemberNames(classDeclaration);
  if (classDeclaration.name !== undefined) {
    if (invalidClassNames.has(classDeclaration.name.text)) {
      state.diagnostics.push(createDiagnostic(2414, classDeclaration.name.text));
    }
    environment.set(classDeclaration.name.text, { kind: "classConstructor", name: classDeclaration.name.text, abstract: classIsAbstract });
  }
  const classEnvironment = new Map(environment);
  addTypeParametersToEnvironment(classDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], classEnvironment);
  if (!ambient) {
    checkClassMemberOverloads(classDeclaration.members, state);
  }
  for (const member of classDeclaration.members) {
    checkClassElement(member, state, classEnvironment, ambient, classIsAbstract, classMembers);
  }
}

function collectClassMemberNames(classDeclaration: ClassDeclaration): ClassMemberNames {
  const instance = new Set<string>();
  const staticMembers = new Set<string>();
  for (const member of classDeclaration.members) {
    const name = classElementName(member);
    if (name === undefined) {
      continue;
    }
    if (hasModifier(member, Kind.StaticKeyword)) {
      staticMembers.add(name);
    } else {
      instance.add(name);
    }
  }
  return { className: classDeclaration.name?.text, instance, static: staticMembers };
}

function classElementName(member: ClassElement): string | undefined {
  if (isMethodDeclaration(member) || isPropertyDeclaration(member) || isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
    return propertyNameText(member.name);
  }
  return undefined;
}

function checkInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: CheckState, environment: TypeEnvironment): void {
  if (invalidClassNames.has(interfaceDeclaration.name.text)) {
    state.diagnostics.push(createDiagnostic(2427, interfaceDeclaration.name.text));
  }
  environment.set(interfaceDeclaration.name.text, { kind: "typeAlias", target: anyType });
  const interfaceEnvironment = new Map(environment);
  addTypeParametersToEnvironment(interfaceDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], interfaceEnvironment);
  checkTypeElements(interfaceDeclaration.members, state, interfaceEnvironment, true);
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

function checkClassElement(member: ClassElement, state: CheckState, environment: TypeEnvironment, ambient: boolean, classIsAbstract: boolean, classMembers: ClassMemberNames): void {
  if (hasModifier(member, Kind.ConstKeyword)) {
    state.diagnostics.push(createDiagnostic(1248, "const"));
  }
  if (isGetAccessorDeclaration(member) || isSetAccessorDeclaration(member)) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkAccessorDeclaration(member, state, environment, ambient);
    return;
  }
  if (isConstructorDeclaration(member) || isMethodDeclaration(member)) {
    if (isMethodDeclaration(member)) {
      checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), false);
    }
    const memberEnvironment = new Map(environment);
    seedUnqualifiedClassMemberDiagnostics(memberEnvironment, classMembers, isMethodDeclaration(member) && hasModifier(member, Kind.StaticKeyword));
    checkSignatureParameters(member.parameters, state, memberEnvironment, isMethodDeclaration(member) || member.body === undefined);
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
    if (member.type !== undefined) {
      typeFromTypeNode(member.type, environment, state);
    }
    inferExpression(member.initializer, state, environment);
    return;
  }
  if (isPropertyDeclaration(member)) {
    checkAbstractMemberModifiers(member, state, classIsAbstract, propertyNameText(member.name), true);
    checkUninitializedProperty(member, state, ambient);
    if (member.type !== undefined) {
      typeFromTypeNode(member.type, environment, state);
    }
  }
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

function checkAccessorDeclaration(accessor: GetAccessorDeclaration | SetAccessorDeclaration, state: CheckState, environment: TypeEnvironment, ambient: boolean): void {
  const accessorEnvironment = new Map(environment);
  if (accessor.typeParameters !== undefined && accessor.typeParameters.length > 0) {
    state.diagnostics.push(createDiagnostic(1094));
  }
  if (isGetAccessorDeclaration(accessor)) {
    if (accessor.parameters.length > 0) {
      state.diagnostics.push(createDiagnostic(1054));
    }
    checkSignatureParameters(accessor.parameters, state, accessorEnvironment, true);
    const returnType = accessor.type === undefined ? undefined : typeFromTypeNode(accessor.type, accessorEnvironment, state);
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
    const parameterType = parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, accessorEnvironment, state);
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
    return;
  }
  if (ambient) {
    state.diagnostics.push(createDiagnostic(1183));
  }
  checkBlock(accessor.body, state, environment, expectedReturnType);
}

function checkSignatureParameters(parameters: readonly ParameterDeclaration[], state: CheckState, environment: TypeEnvironment, disallowParameterProperties: boolean): readonly CheckedType[] {
  return parameters.map(parameter => {
    if (disallowParameterProperties) {
      checkParameterPropertyModifiers(parameter, state);
    }
    checkImplicitAnyParameter(parameter, state);
    const parameterType = parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, environment, state);
    setBindingNameType(parameter.name, parameterType, environment);
    return parameterType;
  });
}

function addTypeParametersToEnvironment(typeParameters: readonly string[], environment: TypeEnvironment): void {
  for (const typeParameter of typeParameters) {
    environment.set(typeParameter, { kind: "typeParameter", name: typeParameter });
  }
}

function checkFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: CheckState, environment: TypeEnvironment): void {
  const functionEnvironment = new Map(environment);
  const typeParameters = functionDeclaration.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [];
  addTypeParametersToEnvironment(typeParameters, functionEnvironment);
  const parameterTypes = functionDeclaration.parameters.map(parameter => parameter.type === undefined ? unresolvedType : typeFromTypeNode(parameter.type, functionEnvironment, state));
  const returnType = functionDeclaration.type === undefined ? undefined : typeFromTypeNode(functionDeclaration.type, functionEnvironment, state);
  if (functionDeclaration.body === undefined && functionDeclaration.type === undefined) {
    state.diagnostics.push(createDiagnostic(7010, functionDeclaration.name?.text ?? "(Missing)", "any"));
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
  if (isIdentifier(expression)) {
    const bound = environment.get(expression.text);
    if (bound?.kind === "unqualifiedStaticMember") {
      state.diagnostics.push(createDiagnostic(2662, bound.memberName, bound.className));
      return unresolvedType;
    }
    if (bound?.kind === "unqualifiedInstanceMember") {
      state.diagnostics.push(createDiagnostic(2304, bound.memberName));
      return unresolvedType;
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
  if (isAsExpression(expression) || isSatisfiesExpression(expression)) {
    inferExpression(expression.expression, state, environment);
    return typeFromTypeNode(expression.type, environment, state);
  }
  if (isArrayLiteralExpression(expression)) {
    return inferArrayLiteral(expression.elements, state, environment);
  }
  if (isObjectLiteralExpression(expression)) {
    for (const property of expression.properties) {
      if (isGetAccessorDeclaration(property) || isSetAccessorDeclaration(property)) {
        if (property.body === undefined) {
          state.diagnostics.push(createDiagnostic(1005, "{"));
        }
        checkAccessorDeclaration(property, state, environment, false);
      }
    }
    return anyType;
  }
  if (isConditionalExpression(expression)) {
    inferExpression(expression.condition, state, environment);
    const whenTrue = inferExpression(expression.whenTrue, state, environment);
    const whenFalse = inferExpression(expression.whenFalse, state, environment);
    if (whenTrue.kind === "any" || whenFalse.kind === "any") {
      return anyType;
    }
    if (whenTrue.kind === "unresolved" || whenFalse.kind === "unresolved") {
      return unresolvedType;
    }
    return whenTrue.kind === whenFalse.kind ? whenTrue : unknownType;
  }
  if (isArrowFunction(expression)) {
    return inferArrowFunction(expression, state, environment);
  }
  if (isBinaryExpression(expression)) {
    const left = inferExpression(expression.left, state, environment);
    const right = inferExpression(expression.right, state, environment);
    if (isComparisonOperator(expression.operatorToken.kind) || expression.operatorToken.kind === Kind.AmpersandAmpersandToken || expression.operatorToken.kind === Kind.BarBarToken) {
      return booleanType;
    }
    if (isAssignmentOperator(expression.operatorToken.kind)) {
      return right;
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
    return receiver.kind === "array" ? receiver.elementType : unresolvedType;
  }
  if (isCallExpression(expression)) {
    if (isPropertyAccessExpression(expression.expression)) {
      const receiverType = inferExpression(expression.expression.expression, state, environment);
      const firstArgument = expression.arguments[0];
      if (receiverType.kind === "array" && expression.expression.name.text === "map" && firstArgument !== undefined && isArrowFunction(firstArgument)) {
        inferArrowFunction(firstArgument, state, environment, [receiverType.elementType]);
        for (const argument of expression.arguments.slice(1)) {
          inferExpression(argument, state, environment);
        }
        return { kind: "array", elementType: anyType };
      }
    }
    const calleeType = inferExpression(expression.expression, state, environment);
    const argumentTypes = expression.arguments.map(argument => inferExpression(argument, state, environment));
    if (calleeType.kind === "any" || calleeType.kind === "unknown" || calleeType.kind === "unresolved") {
      return anyType;
    }
    if (calleeType.kind === "function") {
    return instantiateFunctionReturnType(calleeType, expression.typeArguments?.map(typeArgument => typeFromTypeNode(typeArgument, environment, state)) ?? [], argumentTypes);
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
    return anyType;
  }
  return unresolvedType;
}

function inferArrowFunction(arrowFunction: ArrowFunction, state: CheckState, environment: TypeEnvironment, contextualParameterTypes: readonly CheckedType[] = []): CheckedType {
  const arrowEnvironment = new Map(environment);
  for (let parameterIndex = 0; parameterIndex < arrowFunction.parameters.length; parameterIndex += 1) {
    const parameter = arrowFunction.parameters[parameterIndex]!;
    checkParameterPropertyModifiers(parameter, state);
    const parameterType = parameter.type === undefined ? contextualParameterTypes[parameterIndex] ?? unresolvedType : typeFromTypeNode(parameter.type, arrowEnvironment, state);
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

function setBindingElementType(element: BindingElement, type: CheckedType, environment: TypeEnvironment): void {
  if (element.name !== undefined) {
    setBindingNameType(element.name, type, environment);
  }
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
  if (isTypeLiteralNode(type)) {
    checkTypeElements(type.members, state ?? { diagnostics: [] }, environment, true);
    return anyType;
  }
  if (isFunctionTypeNode(type) || isConstructorTypeNode(type)) {
    const signatureEnvironment = new Map(environment);
    const parameterTypes = checkSignatureParameters(type.parameters, state ?? { diagnostics: [] }, signatureEnvironment, true);
    const returnType = type.type === undefined ? unresolvedType : typeFromTypeNode(type.type, signatureEnvironment, state);
    return { kind: "function", typeParameters: type.typeParameters?.map(typeParameter => typeParameter.name.text) ?? [], parameters: parameterTypes, returnType };
  }
  if (isTypeReferenceNode(type)) {
    const name = entityNameText(type.typeName);
    const bound = name === undefined ? undefined : environment.get(name);
    if (bound?.kind === "typeParameter") {
      return bound;
    }
    if (bound?.kind === "typeAlias") {
      return bound.target;
    }
    if (bound !== undefined) {
      return anyType;
    }
    if (name === "Array" && type.typeArguments?.[0] !== undefined) {
      return { kind: "array", elementType: typeFromTypeNode(type.typeArguments[0], environment, state) };
    }
    if (name !== undefined && !name.includes(".") && !ambientTypeNames.has(name) && state !== undefined) {
      state.diagnostics.push(createDiagnostic(2304, name));
    }
    return anyType;
  }
  if (isTypeQueryNode(type)) {
    const name = entityNameText(type.exprName);
    const bound = name === undefined ? undefined : environment.get(name);
    return bound?.kind === "classConstructor" ? bound : anyType;
  }
  return anyType;
}

function checkAssignable(actual: CheckedType, expected: CheckedType, state: CheckState): void {
  if (expected.kind === "any" || actual.kind === "any" || expected.kind === "unknown" || actual.kind === "unresolved") {
    return;
  }
  if (!isAssignableTo(actual, expected)) {
    state.diagnostics.push(createDiagnostic(2322, displayType(actual), displayType(expected)));
  }
}

function requiresReturnValue(type: CheckedType): boolean {
  return type.kind !== "any" && type.kind !== "unknown" && type.kind !== "unresolved" && type.kind !== "void";
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
  if (parameter.type !== undefined || !isIdentifier(parameter.name)) {
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
  return { kind: "array", elementType: elementTypes.every(type => isSameType(type, first)) ? first : { kind: "union", types: uniqueTypes(elementTypes) } };
}

function instantiateFunctionReturnType(functionType: Extract<CheckedType, { readonly kind: "function" }>, explicitTypeArguments: readonly CheckedType[], argumentTypes: readonly CheckedType[]): CheckedType {
  if (functionType.typeParameters.length === 0) {
    return functionType.returnType;
  }
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
  return substituteType(functionType.returnType, substitutions);
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
  if (type.kind === "function") {
    return {
      kind: "function",
      typeParameters: type.typeParameters,
      parameters: type.parameters.map(parameter => substituteType(parameter, substitutions)),
      returnType: substituteType(type.returnType, substitutions),
    };
  }
  return type;
}

function isAssignableTo(actual: CheckedType, expected: CheckedType): boolean {
  if (actual.kind === "any" || expected.kind === "any") {
    return true;
  }
  if (actual.kind === expected.kind && actual.kind !== "array" && actual.kind !== "classConstructor" && actual.kind !== "function" && actual.kind !== "typeAlias" && actual.kind !== "typeParameter" && actual.kind !== "union") {
    return true;
  }
  if (actual.kind === "classConstructor" && expected.kind === "classConstructor") {
    return actual.name === expected.name && actual.abstract === expected.abstract;
  }
  if (actual.kind === "array" && expected.kind === "array") {
    return isAssignableTo(actual.elementType, expected.elementType);
  }
  if (actual.kind === "union") {
    return actual.types.every(type => isAssignableTo(type, expected));
  }
  if (expected.kind === "union") {
    return expected.types.some(type => isAssignableTo(actual, type));
  }
  if (actual.kind === "typeParameter" && expected.kind === "typeParameter") {
    return actual.name === expected.name;
  }
  return false;
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
  if (type.kind === "function") {
    return "function";
  }
  if (type.kind === "array") {
    return `${displayType(type.elementType)}[]`;
  }
  if (type.kind === "typeParameter") {
    return type.name;
  }
  if (type.kind === "classConstructor") {
    return `typeof ${type.name}`;
  }
  if (type.kind === "typeAlias") {
    return displayType(type.target);
  }
  if (type.kind === "union") {
    return type.types.map(displayType).join(" | ");
  }
  if (type.kind === "unqualifiedStaticMember" || type.kind === "unqualifiedInstanceMember") {
    return "unknown";
  }
  return type.kind === "unresolved" ? "unknown" : type.kind;
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
