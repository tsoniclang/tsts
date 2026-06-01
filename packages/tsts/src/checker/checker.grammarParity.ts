/**
 * Grammar and erasable-syntax checks.
 *
 * Ports the TS-Go `grammarchecks.go` checker-facing rules into reusable
 * structural predicates. These checks are syntactic but depend on checker
 * context such as strict mode, ambient declarations, decorators, and type-only
 * positions.
 */

import type { Node as AstNode } from "../ast/index.js";
import { Kind } from "../ast/index.js";

export type GrammarDiagnosticCategory =
  | "modifier"
  | "heritage"
  | "binding"
  | "import-export"
  | "type-only"
  | "strict-mode"
  | "decorator"
  | "jsx"
  | "jsdoc"
  | "erasable-syntax";

export interface GrammarDiagnostic {
  readonly node: AstNode;
  readonly category: GrammarDiagnosticCategory;
  readonly message: string;
}

export interface GrammarCheckOptions {
  readonly strictMode: boolean;
  readonly jsx: boolean;
  readonly allowDecorators: boolean;
  readonly erasableSyntaxOnly: boolean;
  readonly allowImportAttributes: boolean;
}

export interface ModifierState {
  readonly seen: ReadonlySet<Kind>;
  readonly accessibility?: Kind;
  readonly staticSeen: boolean;
  readonly readonlySeen: boolean;
  readonly overrideSeen: boolean;
  readonly asyncSeen: boolean;
  readonly exportSeen: boolean;
  readonly declareSeen: boolean;
}

export function checkGrammarNode(node: AstNode, options: GrammarCheckOptions): readonly GrammarDiagnostic[] {
  const diagnostics: GrammarDiagnostic[] = [];
  checkGrammarModifiers(node, options, diagnostics);
  checkGrammarNodeShape(node, options, diagnostics);
  if (options.erasableSyntaxOnly) checkErasableSyntax(node, diagnostics);
  for (const child of childrenOf(node)) diagnostics.push(...checkGrammarNode(child, options));
  return diagnostics;
}

export function checkGrammarModifiers(node: AstNode, options: GrammarCheckOptions, diagnostics: GrammarDiagnostic[]): void {
  const modifiers = nodeArray(node, "modifiers");
  const state = createModifierState();
  for (const modifier of modifiers) {
    const next = consumeModifier(state, modifier.kind, node, diagnostics);
    Object.assign(state as MutableModifierState, next);
  }
  if (!options.allowDecorators && nodeArray(node, "decorators").length !== 0) {
    diagnostics.push({ node, category: "decorator", message: "Decorators are not valid here." });
  }
  if (state.overrideSeen && !isClassElement(node)) {
    diagnostics.push({ node, category: "modifier", message: "An 'override' modifier can only appear on a class member." });
  }
  if (state.staticSeen && !isClassElement(node)) {
    diagnostics.push({ node, category: "modifier", message: "A 'static' modifier can only appear on a class member." });
  }
  if (state.readonlySeen && !isReadonlyAllowed(node)) {
    diagnostics.push({ node, category: "modifier", message: "A 'readonly' modifier can only appear on a property declaration or index signature." });
  }
  if (state.asyncSeen && !isAsyncAllowed(node)) {
    diagnostics.push({ node, category: "modifier", message: "An 'async' modifier can only appear on a function-like declaration." });
  }
}

export function checkGrammarNodeShape(node: AstNode, options: GrammarCheckOptions, diagnostics: GrammarDiagnostic[]): void {
  switch (node.kind) {
    case Kind.ClassDeclaration:
      checkClassGrammar(node, diagnostics);
      break;
    case Kind.InterfaceDeclaration:
      checkInterfaceGrammar(node, diagnostics);
      break;
    case Kind.FunctionDeclaration:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      checkFunctionLikeGrammar(node, diagnostics);
      break;
    case Kind.VariableDeclaration:
    case Kind.BindingElement:
      checkBindingGrammar(node, diagnostics);
      break;
    case Kind.ImportDeclaration:
    case Kind.ImportEqualsDeclaration:
      checkImportGrammar(node, options, diagnostics);
      break;
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
      checkExportGrammar(node, diagnostics);
      break;
    case Kind.JsxElement:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxFragment:
      if (!options.jsx) diagnostics.push({ node, category: "jsx", message: "JSX syntax is not enabled." });
      break;
    default:
      break;
  }
}

export function checkClassGrammar(node: AstNode, diagnostics: GrammarDiagnostic[]): void {
  const heritage = nodeArray(node, "heritageClauses");
  const extendsClauses = heritage.filter(clause => heritageClauseToken(clause) === Kind.ExtendsKeyword);
  if (extendsClauses.length > 1) diagnostics.push({ node, category: "heritage", message: "A class can only have one 'extends' clause." });
  for (const member of nodeArray(node, "members")) {
    if (member.kind === Kind.Constructor && nodeArray(member, "typeParameters").length !== 0) {
      diagnostics.push({ node: member, category: "type-only", message: "Type parameters cannot appear on a constructor declaration." });
    }
    if (member.kind === Kind.Constructor && hasModifier(member, Kind.StaticKeyword)) {
      diagnostics.push({ node: member, category: "modifier", message: "A constructor cannot be static." });
    }
  }
}

export function checkInterfaceGrammar(node: AstNode, diagnostics: GrammarDiagnostic[]): void {
  const heritage = nodeArray(node, "heritageClauses");
  for (const clause of heritage) {
    if (heritageClauseToken(clause) !== Kind.ExtendsKeyword) {
      diagnostics.push({ node: clause, category: "heritage", message: "An interface can only extend named object types." });
    }
  }
  for (const member of nodeArray(node, "members")) {
    if (hasModifier(member, Kind.PrivateKeyword) || hasModifier(member, Kind.ProtectedKeyword) || hasModifier(member, Kind.PublicKeyword)) {
      diagnostics.push({ node: member, category: "modifier", message: "Accessibility modifiers are not permitted in an interface." });
    }
  }
}

export function checkFunctionLikeGrammar(node: AstNode, diagnostics: GrammarDiagnostic[]): void {
  const parameters = nodeArray(node, "parameters");
  checkGrammarParameterList(parameters, diagnostics);
  if (node.kind === Kind.GetAccessor && parameters.length !== 0) {
    diagnostics.push({ node, category: "binding", message: "A get accessor cannot have parameters." });
  }
  if (node.kind === Kind.SetAccessor && parameters.length !== 1) {
    diagnostics.push({ node, category: "binding", message: "A set accessor must have exactly one parameter." });
  }
  if (node.kind === Kind.SetAccessor && nodeArray(parameters[0] ?? node, "typeParameters").length !== 0) {
    diagnostics.push({ node, category: "type-only", message: "A set accessor cannot have type parameters." });
  }
}

export function checkGrammarParameterList(parameters: readonly AstNode[], diagnostics: GrammarDiagnostic[]): void {
  let seenOptional = false;
  let seenRest = false;
  const names = new Set<string>();
  for (const parameter of parameters) {
    const name = nodeName(parameter);
    if (name.length !== 0 && names.has(name)) {
      diagnostics.push({ node: parameter, category: "binding", message: `Duplicate parameter name '${name}'.` });
    }
    names.add(name);
    if (seenRest) diagnostics.push({ node: parameter, category: "binding", message: "A rest parameter must be last in a parameter list." });
    if (isRest(parameter)) seenRest = true;
    if (seenOptional && !isOptional(parameter) && !isRest(parameter)) {
      diagnostics.push({ node: parameter, category: "binding", message: "A required parameter cannot follow an optional parameter." });
    }
    if (isOptional(parameter)) seenOptional = true;
  }
}

export function checkBindingGrammar(node: AstNode, diagnostics: GrammarDiagnostic[]): void {
  if (isRest(node) && hasInitializer(node)) {
    diagnostics.push({ node, category: "binding", message: "A rest element cannot have an initializer." });
  }
  if (isOptional(node) && hasInitializer(node)) {
    diagnostics.push({ node, category: "binding", message: "Parameter cannot have question mark and initializer." });
  }
  const name = nodeName(node);
  if (name === "eval" || name === "arguments") {
    diagnostics.push({ node, category: "strict-mode", message: `'${name}' cannot be used as a binding name in strict mode.` });
  }
}

export function checkImportGrammar(node: AstNode, options: GrammarCheckOptions, diagnostics: GrammarDiagnostic[]): void {
  const specifier = moduleSpecifierText(node);
  if (specifier.length === 0 && node.kind === Kind.ImportDeclaration) {
    diagnostics.push({ node, category: "import-export", message: "Import declaration requires a module specifier." });
  }
  if (!options.allowImportAttributes && nodeArray(node, "attributes").length !== 0) {
    diagnostics.push({ node, category: "import-export", message: "Import attributes are not enabled." });
  }
  if (node.kind === Kind.ImportEqualsDeclaration && isTypeOnly(node)) {
    diagnostics.push({ node, category: "type-only", message: "An import equals declaration cannot be type-only." });
  }
}

export function checkExportGrammar(node: AstNode, diagnostics: GrammarDiagnostic[]): void {
  if (node.kind === Kind.ExportAssignment && isTypeOnly(node)) {
    diagnostics.push({ node, category: "type-only", message: "An export assignment cannot be type-only." });
  }
  const namedExports = nodeArray(node, "exportClause");
  const names = new Set<string>();
  for (const specifier of namedExports) {
    const name = nodeName(specifier);
    if (names.has(name)) diagnostics.push({ node: specifier, category: "import-export", message: `Duplicate export '${name}'.` });
    names.add(name);
  }
}

export function checkErasableSyntax(node: AstNode, diagnostics: GrammarDiagnostic[]): void {
  if (node.kind === Kind.EnumDeclaration) {
    diagnostics.push({ node, category: "erasable-syntax", message: "Enum declarations are not erasable syntax." });
  }
  if (node.kind === Kind.Parameter && isParameterProperty(node)) {
    diagnostics.push({ node, category: "erasable-syntax", message: "Parameter properties are not erasable syntax." });
  }
  if (node.kind === Kind.ImportEqualsDeclaration && !isTypeOnly(node)) {
    diagnostics.push({ node, category: "erasable-syntax", message: "Value import-equals declarations are not erasable syntax." });
  }
}

export function createModifierState(): MutableModifierState {
  return {
    seen: new Set(),
    staticSeen: false,
    readonlySeen: false,
    overrideSeen: false,
    asyncSeen: false,
    exportSeen: false,
    declareSeen: false,
  };
}

export interface MutableModifierState {
  seen: Set<Kind>;
  accessibility?: Kind;
  staticSeen: boolean;
  readonlySeen: boolean;
  overrideSeen: boolean;
  asyncSeen: boolean;
  exportSeen: boolean;
  declareSeen: boolean;
}

export function consumeModifier(
  state: ModifierState,
  modifier: Kind,
  node: AstNode,
  diagnostics: GrammarDiagnostic[],
): MutableModifierState {
  const next: MutableModifierState = {
    seen: new Set(state.seen),
    ...(state.accessibility === undefined ? {} : { accessibility: state.accessibility }),
    staticSeen: state.staticSeen,
    readonlySeen: state.readonlySeen,
    overrideSeen: state.overrideSeen,
    asyncSeen: state.asyncSeen,
    exportSeen: state.exportSeen,
    declareSeen: state.declareSeen,
  };
  if (next.seen.has(modifier)) diagnostics.push({ node, category: "modifier", message: "Duplicate modifier." });
  next.seen.add(modifier);
  if (isAccessibilityModifier(modifier)) {
    if (next.accessibility !== undefined) diagnostics.push({ node, category: "modifier", message: "Accessibility modifier already seen." });
    next.accessibility = modifier;
  }
  if (modifier === Kind.StaticKeyword) next.staticSeen = true;
  if (modifier === Kind.ReadonlyKeyword) next.readonlySeen = true;
  if (modifier === Kind.OverrideKeyword) next.overrideSeen = true;
  if (modifier === Kind.AsyncKeyword) next.asyncSeen = true;
  if (modifier === Kind.ExportKeyword) next.exportSeen = true;
  if (modifier === Kind.DeclareKeyword) next.declareSeen = true;
  if (next.declareSeen && next.asyncSeen) diagnostics.push({ node, category: "modifier", message: "'declare' and 'async' cannot be combined." });
  return next;
}

export function isAccessibilityModifier(kind: Kind): boolean {
  return kind === Kind.PublicKeyword || kind === Kind.PrivateKeyword || kind === Kind.ProtectedKeyword;
}

export function isClassElement(node: AstNode): boolean {
  return node.kind === Kind.PropertyDeclaration
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.Constructor
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.IndexSignature;
}

export function isReadonlyAllowed(node: AstNode): boolean {
  return node.kind === Kind.PropertyDeclaration
    || node.kind === Kind.PropertySignature
    || node.kind === Kind.IndexSignature
    || node.kind === Kind.Parameter;
}

export function isAsyncAllowed(node: AstNode): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction
    || node.kind === Kind.MethodDeclaration;
}

export function isParameterProperty(node: AstNode): boolean {
  if (node.kind !== Kind.Parameter) return false;
  const modifiers = nodeArray(node, "modifiers");
  return modifiers.some(modifier => isAccessibilityModifier(modifier.kind) || modifier.kind === Kind.ReadonlyKeyword);
}

export function hasModifier(node: AstNode, kind: Kind): boolean {
  return nodeArray(node, "modifiers").some(modifier => modifier.kind === kind);
}

function nodeArray(node: AstNode, field: "modifiers" | "decorators" | "members" | "parameters" | "typeParameters" | "heritageClauses" | "attributes" | "exportClause"): readonly AstNode[] {
  const candidate = node as {
    readonly modifiers?: readonly AstNode[];
    readonly decorators?: readonly AstNode[];
    readonly members?: readonly AstNode[];
    readonly parameters?: readonly AstNode[];
    readonly typeParameters?: readonly AstNode[];
    readonly heritageClauses?: readonly AstNode[];
    readonly attributes?: readonly AstNode[];
    readonly exportClause?: readonly AstNode[];
  };
  if (field === "modifiers") return candidate.modifiers ?? [];
  if (field === "decorators") return candidate.decorators ?? [];
  if (field === "members") return candidate.members ?? [];
  if (field === "parameters") return candidate.parameters ?? [];
  if (field === "typeParameters") return candidate.typeParameters ?? [];
  if (field === "heritageClauses") return candidate.heritageClauses ?? [];
  if (field === "attributes") return candidate.attributes ?? [];
  return candidate.exportClause ?? [];
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const candidate = node as {
    readonly statements?: readonly AstNode[];
    readonly members?: readonly AstNode[];
    readonly elements?: readonly AstNode[];
    readonly children?: readonly AstNode[];
  };
  return candidate.statements ?? candidate.members ?? candidate.elements ?? candidate.children ?? [];
}

function nodeName(node: AstNode): string {
  const candidate = node as { readonly name?: AstNode | string; readonly text?: string; readonly escapedText?: string };
  if (typeof candidate.name === "string") return candidate.name;
  if (candidate.name !== undefined) return nodeName(candidate.name);
  return candidate.text ?? candidate.escapedText ?? "";
}

function isRest(node: AstNode): boolean {
  return Boolean((node as { readonly dotDotDotToken?: unknown; readonly rest?: boolean }).dotDotDotToken)
    || Boolean((node as { readonly rest?: boolean }).rest);
}

function isOptional(node: AstNode): boolean {
  return Boolean((node as { readonly questionToken?: unknown; readonly optional?: boolean }).questionToken)
    || Boolean((node as { readonly optional?: boolean }).optional);
}

function hasInitializer(node: AstNode): boolean {
  return (node as { readonly initializer?: AstNode }).initializer !== undefined;
}

function moduleSpecifierText(node: AstNode): string {
  const specifier = (node as { readonly moduleSpecifier?: AstNode | string; readonly text?: string }).moduleSpecifier;
  if (typeof specifier === "string") return specifier;
  if (specifier !== undefined) return nodeName(specifier);
  return (node as { readonly text?: string }).text ?? "";
}

function heritageClauseToken(node: AstNode): Kind | undefined {
  return (node as { readonly token?: Kind }).token;
}

function isTypeOnly(node: AstNode): boolean {
  return Boolean((node as { readonly isTypeOnly?: boolean; readonly typeOnly?: boolean }).isTypeOnly)
    || Boolean((node as { readonly typeOnly?: boolean }).typeOnly);
}
