import {
  isAssignmentExpression,
  isBindingElement,
  isCallLikeExpression,
  isClassDeclaration,
  isClassElement,
  isClassExpression,
  isConstructorDeclaration,
  isFunctionLike,
  isFunctionTypeNode,
  isIdentifier,
  isJsxOpeningLikeElement,
  isObjectBindingPattern,
  isPropertyName,
  isShorthandPropertyAssignment,
  isVariableDeclaration,
  isVariableDeclarationList,
  Kind,
  nodeText,
  skipOuterExpressions,
  type Node,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { SymbolFlags } from "../ast/flags.js";
import { firstOrNil, newTextRange, type TextRange } from "../core/index.js";
import type { Signature, Type } from "../checker/types.js";
import {
  type DefinitionResponse,
  type Location,
  type LocationLink,
  type Range,
} from "../lsp/lsproto/index.js";
import { fileNameToDocumentURI } from "./lsconv/index.js";

export function getDeclarationNameForKeyword(node: Node): Node {
  if (node.kind >= Kind.FirstKeyword && node.kind <= Kind.LastKeyword) {
    const parent = node.parent;
    if (parent !== undefined && isVariableDeclarationList(parent)) {
      const declaration = firstOrNil(parent.declarations);
      if (declaration !== undefined) return declaration.name;
    } else if (parent !== undefined) {
      const name = (parent as { readonly name?: Node }).name;
      if (name !== undefined && node.pos < name.pos) return name;
    }
  }
  return node;
}

export interface FileRange {
  readonly fileName: string;
  readonly fileRange: TextRange;
}

export interface RefInfo {
  readonly fileName: string;
  readonly file?: SourceFile;
}

export interface DefinitionLocationHost {
  getMappedLocation(fileName: string, textRange: TextRange, sourceFile: SourceFile): Location;
}

export interface DefinitionChecker {
  getResolvedSymbol?(node: Node): AstSymbol | undefined;
  getContextualType?(node: Node, flags: number): Type | undefined;
  getPropertySymbolsFromContextualType?(node: Node, type: Type, unionSymbolOk: boolean): readonly AstSymbol[];
  getTypeAtLocation?(node: Node): Type;
  getPropertyOfType?(type: Type, name: string): AstSymbol | undefined;
  getSymbolAtLocation?(node: Node): AstSymbol | undefined;
  resolveAlias?(symbol: AstSymbol): AstSymbol | undefined;
  getIndexSignaturesAtLocation?(node: Node): readonly Node[];
  getResolvedSignature?(node: Node): Signature | undefined;
  getRootSymbols?(symbol: AstSymbol): readonly AstSymbol[];
  getTypeOfSymbol?(symbol: AstSymbol): Type;
  getDeclaredTypeOfSymbol?(symbol: AstSymbol): Type;
  getTypeOfSymbolAtLocation?(symbol: AstSymbol, node: Node): Type;
  getCallSignatures?(type: Type): readonly Signature[];
  getReturnTypeOfSignature?(signature: Signature): Type;
  getFirstTypeArgumentFromKnownType?(type: Type): Type | undefined;
}

export function createDefinitionLocations(
  host: DefinitionLocationHost,
  originSelectionRange: Range,
  clientSupportsLink: boolean,
  declarations: readonly Node[],
  reference: RefInfo | undefined,
): DefinitionResponse {
  const links: LocationLink[] = [];
  const locationRanges = new Set<string>();

  if (reference !== undefined && reference.file !== undefined) {
    const targetRange = zeroRange();
    links.push({
      originSelectionRange,
      targetUri: fileNameToDocumentURI(reference.fileName),
      targetRange,
      targetSelectionRange: targetRange,
    });
  }

  for (const declaration of declarations) {
    const file = declaration.getSourceFile();
    const fileName = file.fileName;
    const name = getNameOfDeclaration(declaration) ?? declaration;
    const nameRange = name.kind === Kind.EmptyStatement
      ? newTextRange(name.pos, name.pos)
      : createRangeFromNode(name);
    const rangeKey = fileName + ":" + nameRange.pos + ":" + nameRange.end;
    if (locationRanges.has(rangeKey)) continue;
    locationRanges.add(rangeKey);

    const contextNode = getContextNode(declaration) ?? declaration;
    const contextRange = toContextRange(nameRange, file, contextNode) ?? nameRange;
    const targetSelectionLocation = host.getMappedLocation(fileName, nameRange, file);
    const targetLocation = host.getMappedLocation(fileName, contextRange, file);
    links.push({
      originSelectionRange,
      targetSelectionRange: targetSelectionLocation.range,
      targetUri: targetLocation.uri,
      targetRange: targetLocation.range,
    });
  }

  if (clientSupportsLink) return { definitionLinks: links };
  return createLocationsFromLinks(links);
}

export function createLocationsFromLinks(links: readonly LocationLink[]): DefinitionResponse {
  return {
    locations: links.map((link): Location => ({
      uri: link.targetUri,
      range: link.targetSelectionRange,
    })),
  };
}

export function createLocationFromFileAndRange(file: SourceFile, textRange: TextRange): DefinitionResponse {
  return {
    location: mappedLocation(file.fileName, file, textRange),
  };
}

export function getDeclarationsFromLocation(checker: DefinitionChecker, node: Node): readonly Node[] {
  if (isIdentifier(node) && isShorthandPropertyAssignment(node.parent)) {
    const shorthandSymbol = checker.getResolvedSymbol?.(node);
    const declarations = shorthandSymbol?.declarations ?? [];
    return [...declarations, ...getDeclarationsFromObjectLiteralElement(checker, node)];
  }

  if (isPropertyName(node) && isBindingElement(node.parent) && isObjectBindingPattern(node.parent.parent)) {
    const bindingElement = node.parent;
    if (bindingElement.dotDotDotToken === undefined && node === (bindingElement.propertyName ?? bindingElement.name)) {
      const name = tryGetTextOfPropertyName(node);
      if (name !== undefined) {
        const bindingPatternType = checker.getTypeAtLocation?.(node.parent.parent);
        const types = distributedTypes(bindingPatternType);
        const result: Node[] = [];
        for (const unionType of types) {
          const property = checker.getPropertyOfType?.(unionType, name);
          if (property !== undefined) result.push(...property.declarations);
        }
        return result;
      }
    }
  }

  const nameNode = getDeclarationNameForKeyword(node);
  let symbol = checker.getSymbolAtLocation?.(nameNode);
  if (symbol !== undefined) {
    if (
      ((symbol.flags ?? 0) & SymbolFlags.Class) !== 0
      && ((symbol.flags ?? 0) & (SymbolFlags.Function | SymbolFlags.Variable)) === 0
      && nameNode.kind === Kind.ConstructorKeyword
    ) {
      const constructorSymbol = symbol.members?.get("constructor");
      if (constructorSymbol !== undefined) symbol = constructorSymbol;
    }
    if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) {
      symbol = checker.resolveAlias?.(symbol) ?? symbol;
    }
    const objectLiteralElementDeclarations = getDeclarationsFromObjectLiteralElement(checker, nameNode);
    if (objectLiteralElementDeclarations.length > 0) return objectLiteralElementDeclarations;
    if (symbol.declarations.length > 0) return symbol.declarations;
  }

  return checker.getIndexSignaturesAtLocation?.(nameNode) ?? [];
}

export function getDeclarationsFromObjectLiteralElement(checker: DefinitionChecker, node: Node): readonly Node[] {
  const element = getContainingObjectLiteralElement(node);
  if (element === undefined) return [];

  const contextualType = checker.getContextualType?.(element.parent, 0);
  if (contextualType === undefined) return [];

  let properties = checker.getPropertySymbolsFromContextualType?.(element, contextualType, false) ?? [];
  if (properties.some((property) =>
    property.valueDeclaration !== undefined
    && property.valueDeclaration.parent.kind === Kind.ObjectLiteralExpression
    && isObjectLiteralElement(property.valueDeclaration)
    && getNameOfDeclaration(property.valueDeclaration) === node,
  )) {
    const withoutNodeInferencesType = checker.getContextualType?.(element.parent, 1);
    if (withoutNodeInferencesType !== undefined) {
      const withoutNodeInferenceProperties = checker.getPropertySymbolsFromContextualType?.(element, withoutNodeInferencesType, false) ?? [];
      if (withoutNodeInferenceProperties.length > 0) properties = withoutNodeInferenceProperties;
    }
  }

  return properties.flatMap((property) => property.declarations);
}

export function getAncestorCallLikeExpression(node: Node): Node | undefined {
  const target = findAncestor(node, (candidate) => !isRightSideOfPropertyAccess(candidate));
  const callLike = target?.parent;
  if (callLike !== undefined && isCallLikeExpression(callLike) && getInvokedExpression(callLike) === target) {
    return callLike;
  }
  return undefined;
}

export function tryGetSignatureDeclaration(typeChecker: DefinitionChecker, node: Node): Node | undefined {
  const callLike = getAncestorCallLikeExpression(node);
  const signature = callLike === undefined ? undefined : typeChecker.getResolvedSignature?.(callLike);
  const declaration = signature?.declaration;
  if (declaration !== undefined && isFunctionLike(declaration) && !isFunctionTypeNode(declaration)) {
    return declaration;
  }
  return undefined;
}

export function isJsxConstructorLike(node: Node): boolean {
  return isConstructorDeclaration(node)
    || node.kind === Kind.ConstructorType
    || node.kind === Kind.CallSignature
    || node.kind === Kind.ConstructSignature;
}

export function shouldIncludeCalledDeclaration(
  checker: DefinitionChecker,
  node: Node,
  declarations: readonly Node[],
  calledDeclaration: Node | undefined,
): readonly Node[] {
  if (calledDeclaration === undefined || (isJsxOpeningLikeElement(node.parent) && isJsxConstructorLike(calledDeclaration))) {
    return declarations;
  }
  const symbol = checker.getSymbolAtLocation?.(getDeclarationNameForKeyword(node));
  const rootSymbols = symbol === undefined ? [] : checker.getRootSymbols?.(symbol) ?? [];
  if (rootSymbols.some((rootSymbol) => symbolMatchesSignature(rootSymbol, calledDeclaration))) {
    if (!isConstructorDeclaration(calledDeclaration)) return [calledDeclaration];
    return [
      ...declarations.filter((declaration) => declaration !== calledDeclaration && (isClassDeclaration(declaration) || isClassExpression(declaration))),
      calledDeclaration,
    ];
  }
  return [...declarations.filter((declaration) => declaration !== calledDeclaration), calledDeclaration];
}

export function symbolMatchesSignature(symbol: AstSymbol | undefined, calledDeclaration: Node | undefined): boolean {
  if (symbol === undefined || calledDeclaration === undefined) return false;
  const calledSymbol = calledDeclaration.symbol;
  if (symbol === calledSymbol || (calledSymbol !== undefined && symbol === calledSymbol.parent)) return true;
  const parent = calledDeclaration.parent;
  return parent !== undefined
    && (
      isAssignmentExpression(parent, false)
      || (!isCallLikeExpression(parent) && canHaveSymbol(parent) && symbol === parent.symbol)
    );
}

export function getSymbolForOverriddenMember(typeChecker: DefinitionChecker, node: Node): AstSymbol | undefined {
  const classElement = findAncestor(node, isClassElement);
  if (classElement === undefined || getNameOfDeclaration(classElement) === undefined) return undefined;
  const baseDeclaration = findAncestor(classElement, isClassLike);
  if (baseDeclaration === undefined) return undefined;
  const baseTypeNode = getClassExtendsHeritageElement(baseDeclaration);
  if (baseTypeNode === undefined) return undefined;
  const expression = skipOuterExpressions(nodeExpression(baseTypeNode), 0);
  const base = isClassExpression(expression) ? expression.symbol : typeChecker.getSymbolAtLocation?.(expression);
  if (base === undefined) return undefined;
  const name = getTextOfPropertyName(getNameOfDeclaration(classElement));
  if (name === "") return undefined;
  const type = hasStaticModifier(classElement)
    ? typeChecker.getTypeOfSymbol?.(base)
    : typeChecker.getDeclaredTypeOfSymbol?.(base);
  return type === undefined ? undefined : typeChecker.getPropertyOfType?.(type, name);
}

export function getTypeOfSymbolAtLocation(checker: DefinitionChecker, symbol: AstSymbol, node: Node): Type | undefined {
  let type = checker.getTypeOfSymbolAtLocation?.(symbol, node);
  if (type === undefined) return undefined;
  const typeSymbol = type.symbol;
  if (
    typeSymbol === symbol
    || (
      typeSymbol !== undefined
      && symbol.valueDeclaration !== undefined
      && isVariableDeclaration(symbol.valueDeclaration)
      && nodeInitializer(symbol.valueDeclaration) === typeSymbol.valueDeclaration
    )
  ) {
    const signatures = checker.getCallSignatures?.(type) ?? [];
    if (signatures.length === 1) type = checker.getReturnTypeOfSignature?.(signatures[0]!) ?? type;
  }
  return type;
}

export function getDeclarationsFromType(type: Type | undefined): readonly Node[] {
  const result: Node[] = [];
  for (const distributedType of distributedTypes(type)) {
    for (const declaration of distributedType.symbol?.declarations ?? []) {
      appendIfUnique(result, declaration);
    }
  }
  return result;
}

function zeroRange(): Range {
  return {
    start: { line: 0, character: 0 },
    end: { line: 0, character: 0 },
  };
}

function mappedLocation(fileName: string, sourceFile: SourceFile, textRange: TextRange): Location {
  return {
    uri: fileNameToDocumentURI(fileName),
    range: createLspRangeFromRange(textRange, sourceFile),
  };
}

function createLspRangeFromRange(textRange: TextRange, sourceFile: SourceFile): Range {
  return {
    start: positionToLineAndCharacter(sourceFile, textRange.pos),
    end: positionToLineAndCharacter(sourceFile, textRange.end),
  };
}

function createRangeFromNode(node: Node): TextRange {
  return newTextRange(node.pos, node.end);
}

function positionToLineAndCharacter(sourceFile: SourceFile, position: number): Range["start"] {
  const lineStarts = sourceFileTextLineStarts(sourceFile.text);
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    if (lineStarts[index]! <= position) line = index;
    else break;
  }
  return { line, character: position - lineStarts[line]! };
}

function sourceFileTextLineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13) {
      if (text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    } else if (ch === 10) {
      starts.push(index + 1);
    }
  }
  return starts;
}

function getNameOfDeclaration(node: Node): Node | undefined {
  return (node as { readonly name?: Node }).name;
}

function nodeInitializer(node: Node): Node | undefined {
  return (node as { readonly initializer?: Node }).initializer;
}

function nodeExpression(node: Node | undefined): Node {
  if (node === undefined) throw new Error("expected expression node");
  const expression = (node as { readonly expression?: Node }).expression;
  if (expression === undefined) throw new Error("expected expression node");
  return expression;
}

function toContextRange(textRange: TextRange, contextFile: SourceFile, context: Node): TextRange | undefined {
  if (context.getSourceFile() !== contextFile) return undefined;
  if (context.pos <= textRange.pos && context.end >= textRange.end) return newTextRange(context.pos, context.end);
  return undefined;
}

function getContextNode(node: Node): Node | undefined {
  let current: Node | undefined = node;
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.SourceFile:
      case Kind.ModuleDeclaration:
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.Constructor:
        return current;
    }
    current = current.parent;
  }
  return undefined;
}

function tryGetTextOfPropertyName(node: Node): string | undefined {
  if (isIdentifier(node) || node.kind === Kind.PrivateIdentifier) return nodeText(node);
  if (node.kind === Kind.StringLiteral || node.kind === Kind.NumericLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral) {
    return nodeText(node);
  }
  return undefined;
}

function getTextOfPropertyName(node: Node | undefined): string {
  if (node === undefined) return "";
  return tryGetTextOfPropertyName(node) ?? nodeText(node);
}

function distributedTypes(type: Type | undefined): readonly Type[] {
  if (type === undefined) return [];
  const unionTypes = (type as { readonly types?: readonly Type[] }).types;
  return unionTypes ?? [type];
}

function appendIfUnique(result: Node[], declaration: Node): void {
  if (!result.includes(declaration)) result.push(declaration);
}

function getContainingObjectLiteralElement(node: Node): Node | undefined {
  const element = getContainingObjectLiteralElementWorker(node);
  return element !== undefined && element.parent.kind === Kind.ObjectLiteralExpression ? element : undefined;
}

function getContainingObjectLiteralElementWorker(node: Node): Node | undefined {
  let current: Node | undefined = node;
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.PropertyAssignment:
      case Kind.ShorthandPropertyAssignment:
      case Kind.SpreadAssignment:
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
        return current;
      case Kind.SourceFile:
      case Kind.Block:
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
        return undefined;
    }
    current = current.parent;
  }
  return undefined;
}

function isObjectLiteralElement(node: Node): boolean {
  switch (node.kind) {
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.SpreadAssignment:
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return true;
  }
  return false;
}

function findAncestor(node: Node | undefined, predicate: (node: Node) => boolean): Node | undefined {
  let current = node;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = current.parent;
  }
  return undefined;
}

function isRightSideOfPropertyAccess(node: Node): boolean {
  return node.parent !== undefined
    && node.parent.kind === Kind.PropertyAccessExpression
    && (node.parent as { readonly name?: Node }).name === node;
}

function getInvokedExpression(node: Node): Node | undefined {
  if (node.kind === Kind.CallExpression || node.kind === Kind.NewExpression) {
    return (node as { readonly expression?: Node }).expression;
  }
  if (node.kind === Kind.TaggedTemplateExpression) {
    return (node as { readonly tag?: Node }).tag;
  }
  return undefined;
}

function isClassLike(node: Node): boolean {
  return isClassDeclaration(node) || isClassExpression(node);
}

function getClassExtendsHeritageElement(node: Node): Node | undefined {
  const heritageClauses = (node as { readonly heritageClauses?: readonly Node[] }).heritageClauses;
  for (const clause of heritageClauses ?? []) {
    if (clause.kind !== Kind.HeritageClause) continue;
    const token = (clause as { readonly token?: Kind }).token;
    if (token !== Kind.ExtendsKeyword) continue;
    const types = (clause as { readonly types?: readonly Node[] }).types;
    return types?.[0];
  }
  return undefined;
}

function hasStaticModifier(node: Node): boolean {
  return modifiersOf(node).some((modifier) => modifier.kind === Kind.StaticKeyword);
}

function modifiersOf(node: Node): readonly Node[] {
  return (node as { readonly modifiers?: readonly Node[] }).modifiers ?? [];
}

function canHaveSymbol(node: Node): boolean {
  return node.symbol !== undefined;
}

// Language-service parity map: internal/ls/definition.go
/**
 * Language-service parity map for TS-Go `ls/definition.go`.
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

export const lsDefinitionUpstreamPath = "ls/definition.go";

export const lsDefinitionDeclarations: readonly UpstreamDeclaration[] = [
  {"line":17,"kind":"func","name":"ProvideDefinition","receiver":"l *LanguageService"},
  {"line":28,"kind":"func","name":"provideDefinitionWorker","receiver":"l *LanguageService"},
  {"line":100,"kind":"func","name":"ProvideTypeDefinition","receiver":"l *LanguageService"},
  {"line":137,"kind":"func","name":"getDeclarationNameForKeyword"},
  {"line":150,"kind":"type","name":"fileRange"},
  {"line":155,"kind":"func","name":"createDefinitionLocations","receiver":"l *LanguageService"},
  {"line":213,"kind":"func","name":"createLocationsFromLinks"},
  {"line":223,"kind":"func","name":"createLocationFromFileAndRange","receiver":"l *LanguageService"},
  {"line":230,"kind":"func","name":"getDeclarationsFromLocation"},
  {"line":304,"kind":"func","name":"getDeclarationsFromObjectLiteralElement"},
  {"line":334,"kind":"func","name":"getAncestorCallLikeExpression"},
  {"line":345,"kind":"func","name":"tryGetSignatureDeclaration"},
  {"line":362,"kind":"func","name":"isJsxConstructorLike"},
  {"line":374,"kind":"func","name":"symbolMatchesSignature"},
  {"line":387,"kind":"func","name":"getSymbolForOverriddenMember"},
  {"line":417,"kind":"func","name":"getTypeOfSymbolAtLocation"},
  {"line":430,"kind":"func","name":"getDeclarationsFromType"},
];

export const lsDefinitionSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"slices\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":15,"text":")"},
  {"line":17,"text":"func (l *LanguageService) ProvideDefinition("},
  {"line":18,"text":"\tctx context.Context,"},
  {"line":19,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":20,"text":"\tposition lsproto.Position,"},
  {"line":21,"text":") (lsproto.DefinitionResponse, error) {"},
  {"line":22,"text":"\tif l.UserPreferences().PreferGoToSourceDefinition {"},
  {"line":23,"text":"\t\treturn l.ProvideSourceDefinition(ctx, documentURI, position)"},
  {"line":24,"text":"\t}"},
  {"line":25,"text":"\treturn l.provideDefinitionWorker(ctx, documentURI, position)"},
  {"line":26,"text":"}"},
  {"line":28,"text":"func (l *LanguageService) provideDefinitionWorker("},
  {"line":29,"text":"\tctx context.Context,"},
  {"line":30,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":31,"text":"\tposition lsproto.Position,"},
  {"line":32,"text":") (lsproto.DefinitionResponse, error) {"},
  {"line":33,"text":"\tcaps := lsproto.GetClientCapabilities(ctx)"},
  {"line":34,"text":"\tclientSupportsLink := caps.TextDocument.Definition.LinkSupport"},
  {"line":36,"text":"\tprogram, file := l.getProgramAndFile(documentURI)"},
  {"line":37,"text":"\tpos := int(l.converters.LineAndCharacterToPosition(file, position))"},
  {"line":38,"text":"\tnode := astnav.GetTouchingPropertyName(file, pos)"},
  {"line":39,"text":"\treference := getReferenceAtPosition(file, pos, program)"},
  {"line":41,"text":"\tif node.Kind == ast.KindSourceFile {"},
  {"line":42,"text":"\t\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil"},
  {"line":43,"text":"\t}"},
  {"line":45,"text":"\toriginSelectionRange := l.createLspRangeFromNode(node, file)"},
  {"line":46,"text":"\tif reference != nil && reference.file != nil {"},
  {"line":47,"text":"\t\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, []*ast.Node{}, reference), nil"},
  {"line":48,"text":"\t}"},
  {"line":50,"text":"\tc, done := program.GetTypeCheckerForFile(ctx, file)"},
  {"line":51,"text":"\tdefer done()"},
  {"line":53,"text":"\tif node.Kind == ast.KindOverrideKeyword {"},
  {"line":54,"text":"\t\tif sym := getSymbolForOverriddenMember(c, node); sym != nil {"},
  {"line":55,"text":"\t\t\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, sym.Declarations, nil /*reference*/), nil"},
  {"line":56,"text":"\t\t}"},
  {"line":57,"text":"\t}"},
  {"line":59,"text":"\tif ast.IsJumpStatementTarget(node) {"},
  {"line":60,"text":"\t\tif label := getTargetLabel(node.Parent, node.Text()); label != nil {"},
  {"line":61,"text":"\t\t\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, []*ast.Node{label}, nil /*reference*/), nil"},
  {"line":62,"text":"\t\t}"},
  {"line":63,"text":"\t}"},
  {"line":65,"text":"\tif node.Kind == ast.KindCaseKeyword || node.Kind == ast.KindDefaultKeyword && ast.IsDefaultClause(node.Parent) {"},
  {"line":66,"text":"\t\tif stmt := ast.FindAncestor(node.Parent, ast.IsSwitchStatement); stmt != nil {"},
  {"line":67,"text":"\t\t\tfile := ast.GetSourceFileOfNode(stmt)"},
  {"line":68,"text":"\t\t\treturn l.createLocationFromFileAndRange(file, scanner.GetRangeOfTokenAtPosition(file, stmt.Pos())), nil"},
  {"line":69,"text":"\t\t}"},
  {"line":70,"text":"\t}"},
  {"line":72,"text":"\tif node.Kind == ast.KindReturnKeyword || node.Kind == ast.KindYieldKeyword || node.Kind == ast.KindAwaitKeyword {"},
  {"line":73,"text":"\t\tif fn := ast.FindAncestor(node, ast.IsFunctionLikeDeclaration); fn != nil {"},
  {"line":74,"text":"\t\t\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, []*ast.Node{fn}, nil /*reference*/), nil"},
  {"line":75,"text":"\t\t}"},
  {"line":76,"text":"\t}"},
  {"line":78,"text":"\tdeclarations := getDeclarationsFromLocation(c, node)"},
  {"line":79,"text":"\tcalledDeclaration := tryGetSignatureDeclaration(c, node)"},
  {"line":80,"text":"\tif calledDeclaration != nil && !(ast.IsJsxOpeningLikeElement(node.Parent) && isJsxConstructorLike(calledDeclaration)) {"},
  {"line":81,"text":"\t\tsymbol := c.GetSymbolAtLocation(getDeclarationNameForKeyword(node))"},
  {"line":82,"text":"\t\tif symbol != nil && core.Some(c.GetRootSymbols(symbol), func(rootSymbol *ast.Symbol) bool {"},
  {"line":83,"text":"\t\t\treturn symbolMatchesSignature(rootSymbol, calledDeclaration)"},
  {"line":84,"text":"\t\t}) {"},
  {"line":85,"text":"\t\t\tif !ast.IsConstructorDeclaration(calledDeclaration) {"},
  {"line":86,"text":"\t\t\t\tdeclarations = nil"},
  {"line":87,"text":"\t\t\t} else {"},
  {"line":88,"text":"\t\t\t\tdeclarations = core.Filter(slices.Clip(declarations), func(node *ast.Node) bool {"},
  {"line":89,"text":"\t\t\t\t\treturn node != calledDeclaration && (ast.IsClassDeclaration(node) || ast.IsClassExpression(node))"},
  {"line":90,"text":"\t\t\t\t})"},
  {"line":91,"text":"\t\t\t}"},
  {"line":92,"text":"\t\t} else {"},
  {"line":93,"text":"\t\t\tdeclarations = core.Filter(slices.Clip(declarations), func(node *ast.Node) bool { return node != calledDeclaration })"},
  {"line":94,"text":"\t\t}"},
  {"line":95,"text":"\t\tdeclarations = append(declarations, calledDeclaration)"},
  {"line":96,"text":"\t}"},
  {"line":97,"text":"\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, declarations, reference), nil"},
  {"line":98,"text":"}"},
  {"line":100,"text":"func (l *LanguageService) ProvideTypeDefinition("},
  {"line":101,"text":"\tctx context.Context,"},
  {"line":102,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":103,"text":"\tposition lsproto.Position,"},
  {"line":104,"text":") (lsproto.TypeDefinitionResponse, error) {"},
  {"line":105,"text":"\tcaps := lsproto.GetClientCapabilities(ctx)"},
  {"line":106,"text":"\tclientSupportsLink := caps.TextDocument.TypeDefinition.LinkSupport"},
  {"line":108,"text":"\tprogram, file := l.getProgramAndFile(documentURI)"},
  {"line":109,"text":"\tnode := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))"},
  {"line":110,"text":"\tif node.Kind == ast.KindSourceFile {"},
  {"line":111,"text":"\t\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil"},
  {"line":112,"text":"\t}"},
  {"line":113,"text":"\toriginSelectionRange := l.createLspRangeFromNode(node, file)"},
  {"line":115,"text":"\tc, done := program.GetTypeCheckerForFile(ctx, file)"},
  {"line":116,"text":"\tdefer done()"},
  {"line":118,"text":"\tnode = getDeclarationNameForKeyword(node)"},
  {"line":120,"text":"\tif symbol := c.GetSymbolAtLocation(node); symbol != nil {"},
  {"line":121,"text":"\t\tsymbolType := getTypeOfSymbolAtLocation(c, symbol, node)"},
  {"line":122,"text":"\t\tdeclarations := getDeclarationsFromType(symbolType)"},
  {"line":123,"text":"\t\tif typeArgument := c.GetFirstTypeArgumentFromKnownType(symbolType); typeArgument != nil {"},
  {"line":124,"text":"\t\t\tdeclarations = core.Concatenate(getDeclarationsFromType(typeArgument), declarations)"},
  {"line":125,"text":"\t\t}"},
  {"line":126,"text":"\t\tif len(declarations) != 0 {"},
  {"line":127,"text":"\t\t\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, declarations, nil /*reference*/), nil"},
  {"line":128,"text":"\t\t}"},
  {"line":129,"text":"\t\tif symbol.Flags&ast.SymbolFlagsValue == 0 && symbol.Flags&ast.SymbolFlagsType != 0 {"},
  {"line":130,"text":"\t\t\treturn l.createDefinitionLocations(originSelectionRange, clientSupportsLink, symbol.Declarations, nil /*reference*/), nil"},
  {"line":131,"text":"\t\t}"},
  {"line":132,"text":"\t}"},
  {"line":134,"text":"\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil"},
  {"line":135,"text":"}"},
  {"line":137,"text":"func getDeclarationNameForKeyword(node *ast.Node) *ast.Node {"},
  {"line":138,"text":"\tif node.Kind >= ast.KindFirstKeyword && node.Kind <= ast.KindLastKeyword {"},
  {"line":139,"text":"\t\tif ast.IsVariableDeclarationList(node.Parent) {"},
  {"line":140,"text":"\t\t\tif decl := core.FirstOrNil(node.Parent.AsVariableDeclarationList().Declarations.Nodes); decl != nil && decl.Name() != nil {"},
  {"line":141,"text":"\t\t\t\treturn decl.Name()"},
  {"line":142,"text":"\t\t\t}"},
  {"line":143,"text":"\t\t} else if node.Parent.DeclarationData() != nil && node.Parent.Name() != nil && node.Pos() < node.Parent.Name().Pos() {"},
  {"line":144,"text":"\t\t\treturn node.Parent.Name()"},
  {"line":145,"text":"\t\t}"},
  {"line":146,"text":"\t}"},
  {"line":147,"text":"\treturn node"},
  {"line":148,"text":"}"},
  {"line":150,"text":"type fileRange struct {"},
  {"line":151,"text":"\tfileName  string"},
  {"line":152,"text":"\tfileRange core.TextRange"},
  {"line":153,"text":"}"},
  {"line":155,"text":"func (l *LanguageService) createDefinitionLocations("},
  {"line":156,"text":"\toriginSelectionRange lsproto.Range,"},
  {"line":157,"text":"\tclientSupportsLink bool,"},
  {"line":158,"text":"\tdeclarations []*ast.Node,"},
  {"line":159,"text":"\treference *refInfo,"},
  {"line":160,"text":") lsproto.DefinitionResponse {"},
  {"line":161,"text":"\tlocations := make([]*lsproto.LocationLink, 0)"},
  {"line":162,"text":"\tlocationRanges := collections.Set[fileRange]{}"},
  {"line":164,"text":"\tif reference != nil {"},
  {"line":165,"text":"\t\ttargetRange := lsproto.Range{"},
  {"line":166,"text":"\t\t\tStart: lsproto.Position{"},
  {"line":167,"text":"\t\t\t\tLine:      0,"},
  {"line":168,"text":"\t\t\t\tCharacter: 0,"},
  {"line":169,"text":"\t\t\t},"},
  {"line":170,"text":"\t\t\tEnd: lsproto.Position{"},
  {"line":171,"text":"\t\t\t\tLine:      0,"},
  {"line":172,"text":"\t\t\t\tCharacter: 0,"},
  {"line":173,"text":"\t\t\t},"},
  {"line":174,"text":"\t\t}"},
  {"line":175,"text":"\t\tlocations = append(locations, &lsproto.LocationLink{"},
  {"line":176,"text":"\t\t\tOriginSelectionRange: &originSelectionRange,"},
  {"line":177,"text":"\t\t\tTargetUri:            lsconv.FileNameToDocumentURI(reference.fileName),"},
  {"line":178,"text":"\t\t\tTargetRange:          targetRange,"},
  {"line":179,"text":"\t\t\tTargetSelectionRange: targetRange,"},
  {"line":180,"text":"\t\t})"},
  {"line":181,"text":"\t}"},
  {"line":183,"text":"\tfor _, decl := range declarations {"},
  {"line":184,"text":"\t\tfile := ast.GetSourceFileOfNode(decl)"},
  {"line":185,"text":"\t\tfileName := file.FileName()"},
  {"line":186,"text":"\t\tname := core.OrElse(ast.GetNameOfDeclaration(decl), decl)"},
  {"line":187,"text":"\t\tvar nameRange core.TextRange"},
  {"line":188,"text":"\t\tif name.Kind == ast.KindEmptyStatement {"},
  {"line":189,"text":"\t\t\tnameRange = core.NewTextRange(name.Pos(), name.Pos())"},
  {"line":190,"text":"\t\t} else {"},
  {"line":191,"text":"\t\t\tnameRange = createRangeFromNode(name, file)"},
  {"line":192,"text":"\t\t}"},
  {"line":193,"text":"\t\tif locationRanges.AddIfAbsent(fileRange{fileName, nameRange}) {"},
  {"line":194,"text":"\t\t\tcontextNode := core.OrElse(getContextNode(decl), decl)"},
  {"line":195,"text":"\t\t\tcontextRange := core.OrElse(toContextRange(&nameRange, file, contextNode), &nameRange)"},
  {"line":196,"text":"\t\t\ttargetSelectionLoc := l.getMappedLocation(fileName, nameRange)"},
  {"line":197,"text":"\t\t\ttargetLoc := l.getMappedLocation(fileName, *contextRange)"},
  {"line":198,"text":"\t\t\tlocations = append(locations, &lsproto.LocationLink{"},
  {"line":199,"text":"\t\t\t\tOriginSelectionRange: &originSelectionRange,"},
  {"line":200,"text":"\t\t\t\tTargetSelectionRange: targetSelectionLoc.Range,"},
  {"line":201,"text":"\t\t\t\tTargetUri:            targetLoc.Uri,"},
  {"line":202,"text":"\t\t\t\tTargetRange:          targetLoc.Range,"},
  {"line":203,"text":"\t\t\t})"},
  {"line":204,"text":"\t\t}"},
  {"line":205,"text":"\t}"},
  {"line":207,"text":"\tif clientSupportsLink {"},
  {"line":208,"text":"\t\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{DefinitionLinks: &locations}"},
  {"line":209,"text":"\t}"},
  {"line":210,"text":"\treturn createLocationsFromLinks(locations)"},
  {"line":211,"text":"}"},
  {"line":213,"text":"func createLocationsFromLinks(links []*lsproto.LocationLink) lsproto.DefinitionResponse {"},
  {"line":214,"text":"\tlocations := core.Map(links, func(link *lsproto.LocationLink) lsproto.Location {"},
  {"line":215,"text":"\t\treturn lsproto.Location{"},
  {"line":216,"text":"\t\t\tUri:   link.TargetUri,"},
  {"line":217,"text":"\t\t\tRange: link.TargetSelectionRange,"},
  {"line":218,"text":"\t\t}"},
  {"line":219,"text":"\t})"},
  {"line":220,"text":"\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{Locations: &locations}"},
  {"line":221,"text":"}"},
  {"line":223,"text":"func (l *LanguageService) createLocationFromFileAndRange(file *ast.SourceFile, textRange core.TextRange) lsproto.DefinitionResponse {"},
  {"line":224,"text":"\tmappedLocation := l.getMappedLocation(file.FileName(), textRange)"},
  {"line":225,"text":"\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{"},
  {"line":226,"text":"\t\tLocation: &mappedLocation,"},
  {"line":227,"text":"\t}"},
  {"line":228,"text":"}"},
  {"line":230,"text":"func getDeclarationsFromLocation(c *checker.Checker, node *ast.Node) []*ast.Node {"},
  {"line":231,"text":"\tif ast.IsIdentifier(node) && ast.IsShorthandPropertyAssignment(node.Parent) {"},
  {"line":238,"text":"\t\tshorthandSymbol := c.GetResolvedSymbol(node)"},
  {"line":239,"text":"\t\tvar declarations []*ast.Node"},
  {"line":240,"text":"\t\tif shorthandSymbol != nil {"},
  {"line":241,"text":"\t\t\tdeclarations = shorthandSymbol.Declarations"},
  {"line":242,"text":"\t\t}"},
  {"line":243,"text":"\t\tcontextualDeclarations := getDeclarationsFromObjectLiteralElement(c, node)"},
  {"line":244,"text":"\t\treturn core.Concatenate(declarations, contextualDeclarations)"},
  {"line":245,"text":"\t}"},
  {"line":247,"text":"\tif ast.IsPropertyName(node) && ast.IsBindingElement(node.Parent) && ast.IsObjectBindingPattern(node.Parent.Parent) {"},
  {"line":257,"text":"\t\tbindingEl := node.Parent.AsBindingElement()"},
  {"line":258,"text":"\t\tif bindingEl.DotDotDotToken == nil && node == core.OrElse(bindingEl.PropertyName, node.Parent.Name()) {"},
  {"line":259,"text":"\t\t\tif name, ok := ast.TryGetTextOfPropertyName(node); ok {"},
  {"line":260,"text":"\t\t\t\tt := c.GetTypeAtLocation(node.Parent.Parent)"},
  {"line":261,"text":"\t\t\t\ttypes := []*checker.Type{t}"},
  {"line":262,"text":"\t\t\t\tif t.IsUnion() {"},
  {"line":263,"text":"\t\t\t\t\ttypes = t.Types()"},
  {"line":264,"text":"\t\t\t\t}"},
  {"line":265,"text":"\t\t\t\tvar result []*ast.Node"},
  {"line":266,"text":"\t\t\t\tfor _, unionType := range types {"},
  {"line":267,"text":"\t\t\t\t\tif prop := c.GetPropertyOfType(unionType, name); prop != nil {"},
  {"line":268,"text":"\t\t\t\t\t\tresult = append(result, prop.Declarations...)"},
  {"line":269,"text":"\t\t\t\t\t}"},
  {"line":270,"text":"\t\t\t\t}"},
  {"line":271,"text":"\t\t\t\treturn result"},
  {"line":272,"text":"\t\t\t}"},
  {"line":273,"text":"\t\t}"},
  {"line":274,"text":"\t}"},
  {"line":276,"text":"\tnode = getDeclarationNameForKeyword(node)"},
  {"line":277,"text":"\tif symbol := c.GetSymbolAtLocation(node); symbol != nil {"},
  {"line":278,"text":"\t\tif symbol.Flags&ast.SymbolFlagsClass != 0 && symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsVariable) == 0 && node.Kind == ast.KindConstructorKeyword {"},
  {"line":279,"text":"\t\t\tif constructor := symbol.Members[ast.InternalSymbolNameConstructor]; constructor != nil {"},
  {"line":280,"text":"\t\t\t\tsymbol = constructor"},
  {"line":281,"text":"\t\t\t}"},
  {"line":282,"text":"\t\t}"},
  {"line":283,"text":"\t\tif symbol.Flags&ast.SymbolFlagsAlias != 0 {"},
  {"line":284,"text":"\t\t\tif resolved, ok := c.ResolveAlias(symbol); ok {"},
  {"line":285,"text":"\t\t\t\tsymbol = resolved"},
  {"line":286,"text":"\t\t\t}"},
  {"line":287,"text":"\t\t}"},
  {"line":288,"text":"\t\tobjectLiteralElementDeclarations := getDeclarationsFromObjectLiteralElement(c, node)"},
  {"line":289,"text":"\t\tif len(objectLiteralElementDeclarations) > 0 {"},
  {"line":290,"text":"\t\t\treturn objectLiteralElementDeclarations"},
  {"line":291,"text":"\t\t}"},
  {"line":292,"text":"\t\tif len(symbol.Declarations) > 0 {"},
  {"line":293,"text":"\t\t\treturn symbol.Declarations"},
  {"line":294,"text":"\t\t}"},
  {"line":295,"text":"\t}"},
  {"line":296,"text":"\tif indexInfos := c.GetIndexSignaturesAtLocation(node); len(indexInfos) != 0 {"},
  {"line":297,"text":"\t\treturn indexInfos"},
  {"line":298,"text":"\t}"},
  {"line":299,"text":"\treturn nil"},
  {"line":300,"text":"}"},
  {"line":304,"text":"func getDeclarationsFromObjectLiteralElement(c *checker.Checker, node *ast.Node) []*ast.Node {"},
  {"line":305,"text":"\telement := getContainingObjectLiteralElement(node)"},
  {"line":306,"text":"\tif element == nil {"},
  {"line":307,"text":"\t\treturn nil"},
  {"line":308,"text":"\t}"},
  {"line":310,"text":"\tcontextualType := c.GetContextualType(element.Parent, checker.ContextFlagsNone)"},
  {"line":311,"text":"\tif contextualType == nil {"},
  {"line":312,"text":"\t\treturn nil"},
  {"line":313,"text":"\t}"},
  {"line":315,"text":"\tproperties := c.GetPropertySymbolsFromContextualType(element, contextualType, false /*unionSymbolOk*/)"},
  {"line":316,"text":"\tif core.Some(properties, func(p *ast.Symbol) bool {"},
  {"line":317,"text":"\t\treturn p.ValueDeclaration != nil && ast.IsObjectLiteralExpression(p.ValueDeclaration.Parent) && ast.IsObjectLiteralElement(p.ValueDeclaration) && p.ValueDeclaration.Name() == node"},
  {"line":318,"text":"\t}) {"},
  {"line":319,"text":"\t\tif withoutNodeInferencesType := c.GetContextualType(element.Parent, checker.ContextFlagsIgnoreNodeInferences); withoutNodeInferencesType != nil {"},
  {"line":320,"text":"\t\t\tif withoutNodeInferencesProperties := c.GetPropertySymbolsFromContextualType(element, withoutNodeInferencesType, false /*unionSymbolOk*/); len(withoutNodeInferencesProperties) > 0 {"},
  {"line":321,"text":"\t\t\t\tproperties = withoutNodeInferencesProperties"},
  {"line":322,"text":"\t\t\t}"},
  {"line":323,"text":"\t\t}"},
  {"line":324,"text":"\t}"},
  {"line":326,"text":"\tvar result []*ast.Node"},
  {"line":327,"text":"\tfor _, prop := range properties {"},
  {"line":328,"text":"\t\tresult = append(result, prop.Declarations...)"},
  {"line":329,"text":"\t}"},
  {"line":330,"text":"\treturn result"},
  {"line":331,"text":"}"},
  {"line":334,"text":"func getAncestorCallLikeExpression(node *ast.Node) *ast.Node {"},
  {"line":335,"text":"\ttarget := ast.FindAncestor(node, func(n *ast.Node) bool {"},
  {"line":336,"text":"\t\treturn !ast.IsRightSideOfPropertyAccess(n)"},
  {"line":337,"text":"\t})"},
  {"line":338,"text":"\tcallLike := target.Parent"},
  {"line":339,"text":"\tif callLike != nil && ast.IsCallLikeExpression(callLike) && ast.GetInvokedExpression(callLike) == target {"},
  {"line":340,"text":"\t\treturn callLike"},
  {"line":341,"text":"\t}"},
  {"line":342,"text":"\treturn nil"},
  {"line":343,"text":"}"},
  {"line":345,"text":"func tryGetSignatureDeclaration(typeChecker *checker.Checker, node *ast.Node) *ast.Node {"},
  {"line":346,"text":"\tvar signature *checker.Signature"},
  {"line":347,"text":"\tcallLike := getAncestorCallLikeExpression(node)"},
  {"line":348,"text":"\tif callLike != nil {"},
  {"line":349,"text":"\t\tsignature = typeChecker.GetResolvedSignature(callLike)"},
  {"line":350,"text":"\t}"},
  {"line":352,"text":"\tvar declaration *ast.Node"},
  {"line":353,"text":"\tif signature != nil && signature.Declaration() != nil {"},
  {"line":354,"text":"\t\tdeclaration = signature.Declaration()"},
  {"line":355,"text":"\t\tif ast.IsFunctionLike(declaration) && !ast.IsFunctionTypeNode(declaration) {"},
  {"line":356,"text":"\t\t\treturn declaration"},
  {"line":357,"text":"\t\t}"},
  {"line":358,"text":"\t}"},
  {"line":359,"text":"\treturn nil"},
  {"line":360,"text":"}"},
  {"line":362,"text":"func isJsxConstructorLike(node *ast.Node) bool {"},
  {"line":363,"text":"\tswitch {"},
  {"line":364,"text":"\tcase ast.IsConstructorDeclaration(node),"},
  {"line":365,"text":"\t\tast.IsConstructorTypeNode(node),"},
  {"line":366,"text":"\t\tast.IsCallSignatureDeclaration(node),"},
  {"line":367,"text":"\t\tast.IsConstructSignatureDeclaration(node):"},
  {"line":368,"text":"\t\treturn true"},
  {"line":369,"text":"\tdefault:"},
  {"line":370,"text":"\t\treturn false"},
  {"line":371,"text":"\t}"},
  {"line":372,"text":"}"},
  {"line":374,"text":"func symbolMatchesSignature(symbol *ast.Symbol, calledDeclaration *ast.Node) bool {"},
  {"line":375,"text":"\tif symbol == nil || calledDeclaration == nil {"},
  {"line":376,"text":"\t\treturn false"},
  {"line":377,"text":"\t}"},
  {"line":378,"text":"\tcalledSymbol := calledDeclaration.Symbol()"},
  {"line":379,"text":"\tif symbol == calledSymbol || calledSymbol != nil && symbol == calledSymbol.Parent {"},
  {"line":380,"text":"\t\treturn true"},
  {"line":381,"text":"\t}"},
  {"line":382,"text":"\tparent := calledDeclaration.Parent"},
  {"line":383,"text":"\treturn parent != nil && (ast.IsAssignmentExpression(parent, false /*excludeCompoundAssignment*/) ||"},
  {"line":384,"text":"\t\t!ast.IsCallLikeExpression(parent) && ast.CanHaveSymbol(parent) && symbol == parent.Symbol())"},
  {"line":385,"text":"}"},
  {"line":387,"text":"func getSymbolForOverriddenMember(typeChecker *checker.Checker, node *ast.Node) *ast.Symbol {"},
  {"line":388,"text":"\tclassElement := ast.FindAncestor(node, ast.IsClassElement)"},
  {"line":389,"text":"\tif classElement == nil || classElement.Name() == nil {"},
  {"line":390,"text":"\t\treturn nil"},
  {"line":391,"text":"\t}"},
  {"line":392,"text":"\tbaseDeclaration := ast.FindAncestor(classElement, ast.IsClassLike)"},
  {"line":393,"text":"\tif baseDeclaration == nil {"},
  {"line":394,"text":"\t\treturn nil"},
  {"line":395,"text":"\t}"},
  {"line":396,"text":"\tbaseTypeNode := ast.GetClassExtendsHeritageElement(baseDeclaration)"},
  {"line":397,"text":"\tif baseTypeNode == nil {"},
  {"line":398,"text":"\t\treturn nil"},
  {"line":399,"text":"\t}"},
  {"line":400,"text":"\texpression := ast.SkipParentheses(baseTypeNode.Expression())"},
  {"line":401,"text":"\tvar base *ast.Symbol"},
  {"line":402,"text":"\tif ast.IsClassExpression(expression) {"},
  {"line":403,"text":"\t\tbase = expression.Symbol()"},
  {"line":404,"text":"\t} else {"},
  {"line":405,"text":"\t\tbase = typeChecker.GetSymbolAtLocation(expression)"},
  {"line":406,"text":"\t}"},
  {"line":407,"text":"\tif base == nil {"},
  {"line":408,"text":"\t\treturn nil"},
  {"line":409,"text":"\t}"},
  {"line":410,"text":"\tname := ast.GetTextOfPropertyName(classElement.Name())"},
  {"line":411,"text":"\tif ast.HasStaticModifier(classElement) {"},
  {"line":412,"text":"\t\treturn typeChecker.GetPropertyOfType(typeChecker.GetTypeOfSymbol(base), name)"},
  {"line":413,"text":"\t}"},
  {"line":414,"text":"\treturn typeChecker.GetPropertyOfType(typeChecker.GetDeclaredTypeOfSymbol(base), name)"},
  {"line":415,"text":"}"},
  {"line":417,"text":"func getTypeOfSymbolAtLocation(c *checker.Checker, symbol *ast.Symbol, node *ast.Node) *checker.Type {"},
  {"line":418,"text":"\tt := c.GetTypeOfSymbolAtLocation(symbol, node)"},
  {"line":421,"text":"\tif t.Symbol() == symbol || t.Symbol() != nil && symbol.ValueDeclaration != nil && ast.IsVariableDeclaration(symbol.ValueDeclaration) && symbol.ValueDeclaration.Initializer() == t.Symbol().ValueDeclaration {"},
  {"line":422,"text":"\t\tsigs := c.GetCallSignatures(t)"},
  {"line":423,"text":"\t\tif len(sigs) == 1 {"},
  {"line":424,"text":"\t\t\treturn c.GetReturnTypeOfSignature(sigs[0])"},
  {"line":425,"text":"\t\t}"},
  {"line":426,"text":"\t}"},
  {"line":427,"text":"\treturn t"},
  {"line":428,"text":"}"},
  {"line":430,"text":"func getDeclarationsFromType(t *checker.Type) []*ast.Node {"},
  {"line":431,"text":"\tvar result []*ast.Node"},
  {"line":432,"text":"\tfor _, t := range t.Distributed() {"},
  {"line":433,"text":"\t\tif t.Symbol() != nil {"},
  {"line":434,"text":"\t\t\tfor _, decl := range t.Symbol().Declarations {"},
  {"line":435,"text":"\t\t\t\tresult = core.AppendIfUnique(result, decl)"},
  {"line":436,"text":"\t\t\t}"},
  {"line":437,"text":"\t\t}"},
  {"line":438,"text":"\t}"},
  {"line":439,"text":"\treturn result"},
  {"line":440,"text":"}"},
];

export function findLsDefinitionDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsDefinitionDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsDefinitionDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsDefinitionDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsDefinitionLineText(line: number): string | undefined {
  return lsDefinitionSourceLines.find((entry) => entry.line === line)?.text;
}
