import {
  Kind,
  NodeFlags,
  SymbolFlags,
  isIdentifier,
  type Node,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/index.js";
import type { Signature, Type } from "../checker/types.js";
import type { ImportAdder } from "./autoimport/importAdder.js";
import { type QuotePreference, QuotePreferenceSingle, type UserPreferences, getQuotePreference } from "./lsutil/index.js";

export type PreserveOptionalFlags = number;
export const PreserveOptionalFlagsMethod: PreserveOptionalFlags = 1 << 0;
export const PreserveOptionalFlagsProperty: PreserveOptionalFlags = 1 << 1;
export const PreserveOptionalFlagsAll: PreserveOptionalFlags = PreserveOptionalFlagsMethod | PreserveOptionalFlagsProperty;

export interface MissingMemberProgram {
  options(): {
    readonly noImplicitOverride?: boolean | "on" | "off" | "auto";
  };
}

export interface MissingMemberChecker {
  getWidenedType?(type: Type): Type;
  getTypeOfSymbolAtLocation?(symbol: AstSymbol, node: Node): Type;
  getCallSignatures?(type: Type): readonly Signature[];
  getReturnTypeOfSignature?(signature: Signature): Type;
  getUnionType?(types: readonly Type[]): Type;
  getSignatureFromDeclaration?(node: Node): Signature | undefined;
  getDeclarationModifierFlagsFromSymbol?(symbol: AstSymbol): ModifierFlags;
  getNameTypeOfSymbol?(symbol: AstSymbol): Type | undefined;
  isTypeUsableAsPropertyName?(type: Type): boolean;
  getPropertyNameFromType?(type: Type): string;
}

export interface MissingMemberNodeBuilder {
  typeToTypeNode?(type: Type, enclosingDeclaration: Node, flags: number): Node | undefined;
  signatureToSignatureDeclaration?(signature: Signature, kind: Kind, enclosingDeclaration: Node, flags: number): Node | undefined;
  indexInfoToIndexSignatureDeclaration?(indexInfo: unknown, classDeclaration: Node, flags: number): Node | undefined;
}

export interface MissingMemberFactory {
  createIdentifier(text: string): Node;
  cloneNode(node: Node): Node;
  createQuestionToken?(): Node;
}

export interface MissingMemberFixerOptions {
  readonly typeChecker: MissingMemberChecker;
  readonly program: MissingMemberProgram;
  readonly preferences: UserPreferences;
  readonly importAdder?: ImportAdder;
  readonly factory?: MissingMemberFactory;
  readonly nodeBuilderFactory?: (idToSymbol: Map<Node, AstSymbol>) => MissingMemberNodeBuilder;
  readonly locale?: string;
}

export interface DummyParameter {
  readonly name: string;
  readonly optional: boolean;
  readonly type: Node | undefined;
}

export interface StubbedMethodBody {
  readonly kind: "stubbed-method-body";
  readonly message: string;
  readonly quotePreference: QuotePreference;
}

export class MissingMemberFixer {
  readonly #typeChecker: MissingMemberChecker;
  readonly #program: MissingMemberProgram;
  readonly #preferences: UserPreferences;
  readonly #importAdder: ImportAdder | undefined;
  readonly #factory: MissingMemberFactory | undefined;
  readonly #nodeBuilderFactory: ((idToSymbol: Map<Node, AstSymbol>) => MissingMemberNodeBuilder) | undefined;
  readonly #locale: string;

  constructor(options: MissingMemberFixerOptions) {
    this.#typeChecker = options.typeChecker;
    this.#program = options.program;
    this.#preferences = options.preferences;
    this.#importAdder = options.importAdder;
    this.#factory = options.factory;
    this.#nodeBuilderFactory = options.nodeBuilderFactory;
    this.#locale = options.locale ?? "en";
  }

  createNodeBuilder(): readonly [MissingMemberNodeBuilder, Map<Node, AstSymbol>] {
    const idToSymbol = new Map<Node, AstSymbol>();
    return [this.#nodeBuilderFactory?.(idToSymbol) ?? {}, idToSymbol];
  }

  createMemberFromSymbol(
    symbol: AstSymbol,
    enclosingDeclaration: Node,
    sourceFile: SourceFile,
    body: Node | undefined,
    preserveOptional: PreserveOptionalFlags,
  ): readonly Node[] {
    const declarations = symbol.declarations;
    const declaration = declarations[0];
    const quotePreference = getQuotePreference(sourceFile, this.#preferences);
    const optional = ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0;
    const kind = declaration?.kind ?? Kind.PropertySignature;
    const declarationName = this.createDeclarationName(symbol, declaration);
    const modifiers = this.createModifiers(symbol, declaration);
    const symbolType = this.#typeChecker.getTypeOfSymbolAtLocation?.(symbol, enclosingDeclaration);
    const widenedType = symbolType === undefined ? undefined : this.#typeChecker.getWidenedType?.(symbolType) ?? symbolType;

    switch (kind) {
      case Kind.PropertySignature:
      case Kind.PropertyDeclaration:
        return declarationName === undefined || widenedType === undefined
          ? []
          : [this.createPropertyMemberNode(declarationName, widenedType, enclosingDeclaration, quotePreference, optional && (preserveOptional & PreserveOptionalFlagsProperty) !== 0, modifiers)];
      case Kind.MethodSignature:
      case Kind.MethodDeclaration: {
        const signatures = widenedType === undefined ? [] : this.getCallSignatures(widenedType);
        if (signatures.length === 0 || declarationName === undefined) return [];
        const method = this.createSignatureDeclarationFromSignatures(
          signatures,
          declarationName,
          optional && (preserveOptional & PreserveOptionalFlagsMethod) !== 0,
          modifiers,
          quotePreference,
          body,
          enclosingDeclaration,
        );
        return method === undefined ? [] : [method];
      }
      default:
        return [];
    }
  }

  getCallSignatures(type: Type): readonly Signature[] {
    const unionTypes = (type as { readonly types?: readonly Type[] }).types;
    if (unionTypes !== undefined) return unionTypes.flatMap((unionType) => this.#typeChecker.getCallSignatures?.(unionType) ?? []);
    return this.#typeChecker.getCallSignatures?.(type) ?? [];
  }

  createTypeNode(type: Type, enclosingDeclaration: Node, flags: number, nodeBuilder: MissingMemberNodeBuilder, idToSymbol: ReadonlyMap<Node, AstSymbol>): Node | undefined {
    return this.importTypeNode(nodeBuilder.typeToTypeNode?.(type, enclosingDeclaration, flags), idToSymbol);
  }

  createModifiers(symbol: AstSymbol, declaration: Node | undefined): ModifierFlags {
    let modifierFlags = ModifierFlags.None;
    if (declaration !== undefined) {
      const effective = this.#typeChecker.getDeclarationModifierFlagsFromSymbol?.(symbol) ?? ModifierFlags.None;
      modifierFlags = effective & ModifierFlags.Static;
      if ((effective & ModifierFlags.Public) !== 0) modifierFlags |= ModifierFlags.Public;
      else if ((effective & ModifierFlags.Protected) !== 0) modifierFlags |= ModifierFlags.Protected;
      if (isAutoAccessorPropertyDeclaration(declaration)) modifierFlags |= ModifierFlags.Accessor;
    }
    if (this.shouldAddOverrideKeyword(declaration)) modifierFlags |= ModifierFlags.Override;
    return modifierFlags;
  }

  shouldAddOverrideKeyword(declaration: Node | undefined): boolean {
    return declaration !== undefined
      && tristateIsTrue(this.#program.options().noImplicitOverride)
      && hasAbstractModifier(declaration);
  }

  createSignatureDeclarationFromSignatures(
    signatures: readonly Signature[],
    name: Node,
    optional: boolean,
    _modifiers: ModifierFlags,
    quotePreference: QuotePreference,
    body: Node | undefined,
    enclosingDeclaration: Node,
  ): Node | undefined {
    if (signatures.length === 0) return undefined;
    const [nodeBuilder, idToSymbol] = this.createNodeBuilder();
    let maxArgsSignature = signatures[0]!;
    let minArgumentCount = maxArgsSignature.minArgumentCount;
    let hasRestParameter = false;

    for (const signature of signatures) {
      minArgumentCount = Math.min(minArgumentCount, signature.minArgumentCount);
      const signatureHasRest = hasRestParameterSignature(signature);
      hasRestParameter ||= signatureHasRest;
      if (signature.parameters.length >= maxArgsSignature.parameters.length && (!signatureHasRest || hasRestParameterSignature(maxArgsSignature))) {
        maxArgsSignature = signature;
      }
    }

    const maxNonRestArgs = maxArgsSignature.parameters.length - (hasRestParameterSignature(maxArgsSignature) ? 1 : 0);
    const parameterNames = maxArgsSignature.parameters.map((symbol) => symbol.name ?? "");
    const parameters = createDummyParameters(maxNonRestArgs, parameterNames, undefined, minArgumentCount, isInJSFile(enclosingDeclaration));

    if (hasRestParameter) {
      const restName = maxNonRestArgs < parameterNames.length && parameterNames[maxNonRestArgs] !== ""
        ? parameterNames[maxNonRestArgs]!
        : "rest";
      parameters.push({
        name: restName,
        optional: maxNonRestArgs >= minArgumentCount,
        type: undefined,
      });
    }

    const returnType = this.getReturnTypeFromSignatures(signatures, enclosingDeclaration, nodeBuilder, idToSymbol);
    return this.createMethodShape(name, optional, parameters, returnType, body ?? this.createBody(undefined, false, quotePreference));
  }

  getReturnTypeFromSignatures(
    signatures: readonly Signature[],
    enclosingDeclaration: Node,
    nodeBuilder: MissingMemberNodeBuilder,
    idToSymbol: ReadonlyMap<Node, AstSymbol>,
  ): Node | undefined {
    const returnTypes = signatures
      .map((signature) => this.#typeChecker.getReturnTypeOfSignature?.(signature))
      .filter((type): type is Type => type !== undefined);
    if (returnTypes.length === 0) return undefined;
    const unionType = this.#typeChecker.getUnionType?.(returnTypes) ?? returnTypes[0]!;
    return this.importTypeNode(nodeBuilder.typeToTypeNode?.(unionType, enclosingDeclaration, 0), idToSymbol);
  }

  importTypeNode(typeNode: Node | undefined, idToSymbol: ReadonlyMap<Node, AstSymbol>): Node | undefined {
    if (typeNode === undefined || this.#importAdder === undefined) return typeNode;
    const seen = new Set<AstSymbol>();
    for (const symbol of idToSymbol.values()) {
      if (seen.has(symbol)) continue;
      seen.add(symbol);
      this.#importAdder.addImportFromExportedSymbol(symbol, true);
    }
    return typeNode;
  }

  createBody(body: Node | undefined, ambient: boolean, quotePreference: QuotePreference): Node | StubbedMethodBody | undefined {
    if (ambient) return undefined;
    if (body !== undefined) return this.#factory?.cloneNode(body) ?? body;
    return this.createStubbedMethodBody(quotePreference);
  }

  createStubbedMethodBody(quotePreference: QuotePreference): StubbedMethodBody {
    return {
      kind: "stubbed-method-body",
      message: this.#locale === "" ? "Method not implemented." : "Method not implemented.",
      quotePreference,
    };
  }

  createDeclarationName(symbol: AstSymbol | undefined, declaration: Node | undefined): Node | undefined {
    const symbolCheckFlags = (symbol as { readonly checkFlags?: number } | undefined)?.checkFlags ?? 0;
    if (symbol !== undefined && symbolCheckFlags !== 0) {
      const nameType = this.#typeChecker.getNameTypeOfSymbol?.(symbol);
      if (nameType !== undefined && this.#typeChecker.isTypeUsableAsPropertyName?.(nameType) === true) {
        const name = this.#typeChecker.getPropertyNameFromType?.(nameType);
        if (name !== undefined) return this.#factory?.createIdentifier(name);
      }
    }
    const declarationName = declarationNameNode(declaration);
    if (declarationName !== undefined) return this.#factory?.cloneNode(declarationName) ?? declarationName;
    const symbolName = symbol?.name ?? symbol?.escapedName;
    return symbolName === undefined ? undefined : this.#factory?.createIdentifier(symbolName);
  }

  createPropertyName(node: Node, quotePreference: QuotePreference): Node {
    if (isIdentifier(node) && nodeText(node) === "constructor" && quotePreference === QuotePreferenceSingle) {
      return this.#factory?.cloneNode(node) ?? node;
    }
    return this.#factory?.cloneNode(node) ?? node;
  }

  private createPropertyMemberNode(
    name: Node,
    type: Type,
    enclosingDeclaration: Node,
    quotePreference: QuotePreference,
    optional: boolean,
    modifiers: ModifierFlags,
  ): Node {
    const [nodeBuilder, idToSymbol] = this.createNodeBuilder();
    const typeNode = this.createTypeNode(type, enclosingDeclaration, 0, nodeBuilder, idToSymbol);
    return this.createMemberShape(this.createPropertyName(name, quotePreference), typeNode, optional, modifiers);
  }

  private createMemberShape(name: Node, _typeNode: Node | undefined, _optional: boolean, _modifiers: ModifierFlags): Node {
    return this.#factory?.cloneNode(name) ?? name;
  }

  private createMethodShape(
    name: Node,
    _optional: boolean,
    _parameters: readonly DummyParameter[],
    _returnType: Node | undefined,
    _body: Node | StubbedMethodBody | undefined,
  ): Node {
    return this.#factory?.cloneNode(name) ?? name;
  }
}

export function newMissingMemberFixer(options: MissingMemberFixerOptions): MissingMemberFixer {
  return new MissingMemberFixer(options);
}

export function createDummyParameters(
  argCount: number,
  names: readonly string[],
  types: readonly Node[] | undefined,
  minArgumentCount: number,
  inJS: boolean,
): DummyParameter[] {
  const parameters: DummyParameter[] = [];
  const parameterNameCounts = new Map<string, number>();
  for (let index = 0; index < argCount; index += 1) {
    let parameterName = index < names.length && names[index] !== "" ? names[index]! : "arg" + index.toString();
    const count = parameterNameCounts.get(parameterName) ?? 0;
    parameterNameCounts.set(parameterName, count + 1);
    if (count > 0) parameterName += count.toString();
    parameters.push({
      name: parameterName,
      optional: index >= minArgumentCount,
      type: inJS ? undefined : types?.[index],
    });
  }
  return parameters;
}

export function createDeclarationName(
  factory: MissingMemberFactory | undefined,
  typeChecker: MissingMemberChecker,
  symbol: AstSymbol | undefined,
  declaration: Node | undefined,
): Node | undefined {
  const options: {
    typeChecker: MissingMemberChecker;
    program: MissingMemberProgram;
    preferences: UserPreferences;
    factory?: MissingMemberFactory;
  } = {
    typeChecker,
    program: { options: () => ({}) },
    preferences: {},
  };
  if (factory !== undefined) options.factory = factory;
  return new MissingMemberFixer(options).createDeclarationName(symbol, declaration);
}

export function createPropertyName(
  factory: MissingMemberFactory | undefined,
  node: Node,
  quotePreference: QuotePreference,
): Node {
  return factory?.cloneNode(node) ?? node;
}

function declarationNameNode(node: Node | undefined): Node | undefined {
  return (node as { readonly name?: Node } | undefined)?.name;
}

function hasAbstractModifier(node: Node): boolean {
  return modifiersOf(node).some((modifier) => modifier.kind === Kind.AbstractKeyword);
}

function isAutoAccessorPropertyDeclaration(node: Node): boolean {
  return modifiersOf(node).some((modifier) => modifier.kind === Kind.AccessorKeyword);
}

function modifiersOf(node: Node): readonly Node[] {
  return (node as { readonly modifiers?: readonly Node[] }).modifiers ?? [];
}

function hasRestParameterSignature(signature: Signature): boolean {
  return ((signature.flags ?? 0) & 1) !== 0 || signature.parameters.some((parameter) =>
    parameter.valueDeclaration !== undefined && parameter.valueDeclaration.kind === Kind.Parameter
    && (parameter.valueDeclaration as { readonly dotDotDotToken?: Node }).dotDotDotToken !== undefined);
}

function isInJSFile(node: Node): boolean {
  return (node.getSourceFile().flags & NodeFlags.JavaScriptFile) !== 0;
}

function nodeText(node: Node): string {
  return (node as { readonly text?: string }).text ?? "";
}

function tristateIsTrue(value: boolean | "on" | "off" | "auto" | undefined): boolean {
  return value === true || value === "on";
}

// Language-service parity map: internal/ls/codeactions_missingmemberfixer.go
/**
 * Language-service parity map for TS-Go `ls/codeactions_missingmemberfixer.go`.
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

export const lsCodeActionsMissingMemberFixerUpstreamPath = "ls/codeactions_missingmemberfixer.go";

export const lsCodeActionsMissingMemberFixerDeclarations: readonly UpstreamDeclaration[] = [
  {"line":18,"kind":"type","name":"preserveOptionalFlags"},
  {"line":26,"kind":"type","name":"missingMemberFixer"},
  {"line":35,"kind":"func","name":"newMissingMemberFixer"},
  {"line":46,"kind":"func","name":"createNodeBuilder","receiver":"f *missingMemberFixer"},
  {"line":52,"kind":"func","name":"createMemberFromSymbol","receiver":"f *missingMemberFixer"},
  {"line":166,"kind":"func","name":"getCallSignatures","receiver":"f *missingMemberFixer"},
  {"line":173,"kind":"func","name":"createTypeNode","receiver":"f *missingMemberFixer"},
  {"line":177,"kind":"func","name":"createModifiers","receiver":"f *missingMemberFixer"},
  {"line":200,"kind":"func","name":"shouldAddOverrideKeyword","receiver":"f *missingMemberFixer"},
  {"line":204,"kind":"func","name":"createSignatureDeclarationFromSignature","receiver":"f *missingMemberFixer"},
  {"line":301,"kind":"func","name":"createSignatureDeclarationFromSignatures","receiver":"f *missingMemberFixer"},
  {"line":355,"kind":"func","name":"getReturnTypeFromSignatures","receiver":"f *missingMemberFixer"},
  {"line":369,"kind":"func","name":"importTypeNode","receiver":"f *missingMemberFixer"},
  {"line":393,"kind":"func","name":"createIndexSignatureDeclarationFromType","receiver":"f *missingMemberFixer"},
  {"line":403,"kind":"func","name":"createBody","receiver":"f *missingMemberFixer"},
  {"line":414,"kind":"func","name":"createStubbedMethodBody","receiver":"f *missingMemberFixer"},
  {"line":431,"kind":"func","name":"createDummyParameters"},
  {"line":469,"kind":"func","name":"createDeclarationName"},
  {"line":485,"kind":"func","name":"createPropertyName"},
];

export const lsCodeActionsMissingMemberFixerSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"strconv\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/diagnostics\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/locale\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/autoimport\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/change\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/nodebuilder\""},
  {"line":16,"text":")"},
  {"line":18,"text":"type preserveOptionalFlags int"},
  {"line":20,"text":"const ("},
  {"line":21,"text":"\tpreserveOptionalFlagsMethod preserveOptionalFlags = 1 << iota"},
  {"line":22,"text":"\tpreserveOptionalFlagsProperty"},
  {"line":23,"text":"\tpreserveOptionalFlagsAll = preserveOptionalFlagsMethod | preserveOptionalFlagsProperty"},
  {"line":24,"text":")"},
  {"line":26,"text":"type missingMemberFixer struct {"},
  {"line":27,"text":"\tchangeTracker *change.Tracker"},
  {"line":28,"text":"\ttypeChecker   *checker.Checker"},
  {"line":29,"text":"\tprogram       *compiler.Program"},
  {"line":30,"text":"\tpreferences   lsutil.UserPreferences"},
  {"line":31,"text":"\timportAdder   autoimport.ImportAdder"},
  {"line":32,"text":"\tlocale        locale.Locale"},
  {"line":33,"text":"}"},
  {"line":35,"text":"func newMissingMemberFixer(changeTracker *change.Tracker, program *compiler.Program, typeChecker *checker.Checker, preferences lsutil.UserPreferences, importAdder autoimport.ImportAdder, locale locale.Locale) *missingMemberFixer {"},
  {"line":36,"text":"\treturn &missingMemberFixer{"},
  {"line":37,"text":"\t\tchangeTracker: changeTracker,"},
  {"line":38,"text":"\t\ttypeChecker:   typeChecker,"},
  {"line":39,"text":"\t\tprogram:       program,"},
  {"line":40,"text":"\t\tpreferences:   preferences,"},
  {"line":41,"text":"\t\timportAdder:   importAdder,"},
  {"line":42,"text":"\t\tlocale:        locale,"},
  {"line":43,"text":"\t}"},
  {"line":44,"text":"}"},
  {"line":46,"text":"func (f *missingMemberFixer) createNodeBuilder() (*checker.NodeBuilder, map[*ast.IdentifierNode]*ast.Symbol) {"},
  {"line":47,"text":"\tidToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)"},
  {"line":48,"text":"\tnodeBuilder := checker.NewNodeBuilderEx(f.typeChecker, f.changeTracker.EmitContext, idToSymbol)"},
  {"line":49,"text":"\treturn nodeBuilder, idToSymbol"},
  {"line":50,"text":"}"},
  {"line":52,"text":"func (f *missingMemberFixer) createMemberFromSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, body *ast.FunctionBody, preserveOptional preserveOptionalFlags) []*ast.Node {"},
  {"line":53,"text":"\tdeclarations := symbol.Declarations"},
  {"line":54,"text":"\tdeclaration := core.FirstOrNil(declarations)"},
  {"line":56,"text":"\tquotePreference := lsutil.GetQuotePreference(sourceFile, f.preferences)"},
  {"line":57,"text":"\tambient := enclosingDeclaration.Flags&ast.NodeFlagsAmbient != 0"},
  {"line":58,"text":"\toptional := symbol.Flags&ast.SymbolFlagsOptional != 0"},
  {"line":59,"text":"\tkind := ast.KindPropertySignature"},
  {"line":60,"text":"\tif declaration != nil {"},
  {"line":61,"text":"\t\tkind = declaration.Kind"},
  {"line":62,"text":"\t}"},
  {"line":63,"text":"\tdeclarationName := createDeclarationName(f.changeTracker.NodeFactory, f.typeChecker, symbol, declaration)"},
  {"line":64,"text":"\tmodifiers := f.createModifiers(symbol, declaration)"},
  {"line":66,"text":"\tflags := nodebuilder.FlagsNoTruncation"},
  {"line":67,"text":"\tif quotePreference == lsutil.QuotePreferenceSingle {"},
  {"line":68,"text":"\t\tflags |= nodebuilder.FlagsUseSingleQuotesForStringLiteralType"},
  {"line":69,"text":"\t}"},
  {"line":71,"text":"\tt := f.typeChecker.GetWidenedType(f.typeChecker.GetTypeOfSymbolAtLocation(symbol, enclosingDeclaration))"},
  {"line":72,"text":"\tvar nodes []*ast.Node"},
  {"line":74,"text":"\tswitch kind {"},
  {"line":75,"text":"\tcase ast.KindPropertySignature, ast.KindPropertyDeclaration:"},
  {"line":76,"text":"\t\tnodeBuilder, idToSymbol := f.createNodeBuilder()"},
  {"line":77,"text":"\t\ttypeNode := f.createTypeNode(t, enclosingDeclaration, flags, nodeBuilder, idToSymbol)"},
  {"line":78,"text":"\t\tvar questionToken *ast.TokenNode"},
  {"line":79,"text":"\t\tif optional && preserveOptional&preserveOptionalFlagsProperty != 0 {"},
  {"line":80,"text":"\t\t\tquestionToken = f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken)"},
  {"line":81,"text":"\t\t}"},
  {"line":82,"text":"\t\treturn append(nodes, f.changeTracker.NodeFactory.NewPropertyDeclaration(modifiers, createPropertyName(f.changeTracker.NodeFactory, declarationName, quotePreference), questionToken, typeNode, nil /*initializer*/))"},
  {"line":84,"text":"\tcase ast.KindGetAccessor, ast.KindSetAccessor:"},
  {"line":85,"text":"\t\tnodeBuilder, idToSymbol := f.createNodeBuilder()"},
  {"line":86,"text":"\t\taccessors := ast.GetAllAccessorDeclarations(symbol.Declarations, declaration)"},
  {"line":87,"text":"\t\tvar orderedAccessors []*ast.Node"},
  {"line":88,"text":"\t\tif accessors.SecondAccessor == nil {"},
  {"line":89,"text":"\t\t\torderedAccessors = append(orderedAccessors, accessors.FirstAccessor)"},
  {"line":90,"text":"\t\t} else {"},
  {"line":91,"text":"\t\t\torderedAccessors = append(orderedAccessors, accessors.FirstAccessor, accessors.SecondAccessor)"},
  {"line":92,"text":"\t\t}"},
  {"line":94,"text":"\t\tfor _, accessor := range orderedAccessors {"},
  {"line":95,"text":"\t\t\tif ast.IsGetAccessorDeclaration(accessor) {"},
  {"line":96,"text":"\t\t\t\tnodes = append(nodes,"},
  {"line":97,"text":"\t\t\t\t\tf.changeTracker.NodeFactory.NewGetAccessorDeclaration("},
  {"line":98,"text":"\t\t\t\t\t\tmodifiers, createPropertyName(f.changeTracker.NodeFactory, declarationName, quotePreference),"},
  {"line":99,"text":"\t\t\t\t\t\tnil /*typeParameters*/, nil /*parameters*/, f.createTypeNode(t, enclosingDeclaration, flags, nodeBuilder, idToSymbol), nil /*fullSignature*/, f.createBody(body, ambient, quotePreference)),"},
  {"line":100,"text":"\t\t\t\t)"},
  {"line":101,"text":"\t\t\t}"},
  {"line":103,"text":"\t\t\tif ast.IsSetAccessorDeclaration(accessor) {"},
  {"line":104,"text":"\t\t\t\tparameter := checker.GetSetAccessorValueParameter(accessor)"},
  {"line":105,"text":"\t\t\t\tif parameter == nil {"},
  {"line":106,"text":"\t\t\t\t\tpanic(\"Expected set accessor to have a parameter.\")"},
  {"line":107,"text":"\t\t\t\t}"},
  {"line":109,"text":"\t\t\t\tnodes = append(nodes, f.changeTracker.NodeFactory.NewSetAccessorDeclaration("},
  {"line":110,"text":"\t\t\t\t\tmodifiers, createPropertyName(f.changeTracker.NodeFactory, declarationName, quotePreference),"},
  {"line":111,"text":"\t\t\t\t\tnil /*typeParameters*/, createDummyParameters(f.changeTracker.NodeFactory, 1, []string{parameter.Name().Text()}, []*ast.TypeNode{f.createTypeNode(t, enclosingDeclaration, flags, nodeBuilder, idToSymbol)}, 1, ast.IsInJSFile(enclosingDeclaration)),"},
  {"line":112,"text":"\t\t\t\t\tnil /*type*/, nil /*fullSignature*/, f.createBody(body, ambient, quotePreference)),"},
  {"line":113,"text":"\t\t\t\t)"},
  {"line":114,"text":"\t\t\t}"},
  {"line":115,"text":"\t\t}"},
  {"line":116,"text":"\t\treturn nodes"},
  {"line":118,"text":"\tcase ast.KindMethodSignature, ast.KindMethodDeclaration:"},
  {"line":119,"text":"\t\tsignatures := f.getCallSignatures(t)"},
  {"line":120,"text":"\t\tpreserveOptional := optional && preserveOptional&preserveOptionalFlagsMethod != 0"},
  {"line":121,"text":"\t\tif len(signatures) == 0 {"},
  {"line":122,"text":"\t\t\treturn nil"},
  {"line":123,"text":"\t\t}"},
  {"line":125,"text":"\t\tif len(declarations) == 1 {"},
  {"line":126,"text":"\t\t\tmethod := f.createSignatureDeclarationFromSignature(core.FirstOrNil(signatures), ast.KindMethodDeclaration, sourceFile, enclosingDeclaration, f.createBody(body, ambient, quotePreference), modifiers, declarationName, preserveOptional)"},
  {"line":127,"text":"\t\t\tif method != nil {"},
  {"line":128,"text":"\t\t\t\tnodes = append(nodes, method)"},
  {"line":129,"text":"\t\t\t}"},
  {"line":130,"text":"\t\t\treturn nodes"},
  {"line":131,"text":"\t\t}"},
  {"line":133,"text":"\t\tfor _, signature := range signatures {"},
  {"line":134,"text":"\t\t\tif signature.Declaration() != nil && signature.Declaration().Flags&ast.NodeFlagsAmbient != 0 {"},
  {"line":135,"text":"\t\t\t\tcontinue"},
  {"line":136,"text":"\t\t\t}"},
  {"line":138,"text":"\t\t\tmethod := f.createSignatureDeclarationFromSignature(signature, ast.KindMethodDeclaration, sourceFile, enclosingDeclaration, nil, modifiers, declarationName, preserveOptional)"},
  {"line":139,"text":"\t\t\tif method != nil {"},
  {"line":140,"text":"\t\t\t\tnodes = append(nodes, method)"},
  {"line":141,"text":"\t\t\t}"},
  {"line":142,"text":"\t\t}"},
  {"line":144,"text":"\t\tif ambient {"},
  {"line":145,"text":"\t\t\treturn nodes"},
  {"line":146,"text":"\t\t}"},
  {"line":148,"text":"\t\tif len(declarations) > len(signatures) {"},
  {"line":149,"text":"\t\t\tsignature := f.typeChecker.GetSignatureFromDeclaration(core.LastOrNil(declarations))"},
  {"line":150,"text":"\t\t\tmethod := f.createSignatureDeclarationFromSignature(signature, ast.KindMethodDeclaration, sourceFile, enclosingDeclaration, f.createBody(body, ambient, quotePreference), modifiers, declarationName, preserveOptional)"},
  {"line":151,"text":"\t\t\tif method != nil {"},
  {"line":152,"text":"\t\t\t\tnodes = append(nodes, method)"},
  {"line":153,"text":"\t\t\t}"},
  {"line":154,"text":"\t\t} else {"},
  {"line":155,"text":"\t\t\tmethod := f.createSignatureDeclarationFromSignatures(signatures, declarationName, preserveOptional, modifiers, quotePreference, body, enclosingDeclaration)"},
  {"line":156,"text":"\t\t\tif method != nil {"},
  {"line":157,"text":"\t\t\t\tnodes = append(nodes, method)"},
  {"line":158,"text":"\t\t\t}"},
  {"line":159,"text":"\t\t}"},
  {"line":161,"text":"\t\treturn nodes"},
  {"line":162,"text":"\t}"},
  {"line":163,"text":"\treturn nil"},
  {"line":164,"text":"}"},
  {"line":166,"text":"func (f *missingMemberFixer) getCallSignatures(t *checker.Type) []*checker.Signature {"},
  {"line":167,"text":"\tif t.IsUnion() {"},
  {"line":168,"text":"\t\treturn core.FlatMap(t.Types(), f.typeChecker.GetCallSignatures)"},
  {"line":169,"text":"\t}"},
  {"line":170,"text":"\treturn f.typeChecker.GetCallSignatures(t)"},
  {"line":171,"text":"}"},
  {"line":173,"text":"func (f *missingMemberFixer) createTypeNode(t *checker.Type, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, nodeBuilder *checker.NodeBuilder, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *ast.TypeNode {"},
  {"line":174,"text":"\treturn f.importTypeNode(nodeBuilder.TypeToTypeNode(t, enclosingDeclaration, flags, nodebuilder.InternalFlagsNone, nil /*tracker*/), idToSymbol)"},
  {"line":175,"text":"}"},
  {"line":177,"text":"func (f *missingMemberFixer) createModifiers(symbol *ast.Symbol, declaration *ast.Node) *ast.ModifierList {"},
  {"line":178,"text":"\tmodifierFlags := ast.ModifierFlagsNone"},
  {"line":179,"text":"\tif declaration != nil {"},
  {"line":180,"text":"\t\teffective := checker.GetDeclarationModifierFlagsFromSymbol(symbol)"},
  {"line":181,"text":"\t\tmodifierFlags = effective & ast.ModifierFlagsStatic"},
  {"line":182,"text":"\t\tif effective&ast.ModifierFlagsPublic != 0 {"},
  {"line":183,"text":"\t\t\tmodifierFlags |= ast.ModifierFlagsPublic"},
  {"line":184,"text":"\t\t} else if effective&ast.ModifierFlagsProtected != 0 {"},
  {"line":185,"text":"\t\t\tmodifierFlags |= ast.ModifierFlagsProtected"},
  {"line":186,"text":"\t\t}"},
  {"line":187,"text":"\t\tif ast.IsAutoAccessorPropertyDeclaration(declaration) {"},
  {"line":188,"text":"\t\t\tmodifierFlags |= ast.ModifierFlagsAccessor"},
  {"line":189,"text":"\t\t}"},
  {"line":190,"text":"\t}"},
  {"line":191,"text":"\tif f.shouldAddOverrideKeyword(declaration) {"},
  {"line":192,"text":"\t\tmodifierFlags |= ast.ModifierFlagsOverride"},
  {"line":193,"text":"\t}"},
  {"line":194,"text":"\tif modifierFlags == ast.ModifierFlagsNone {"},
  {"line":195,"text":"\t\treturn nil"},
  {"line":196,"text":"\t}"},
  {"line":197,"text":"\treturn f.changeTracker.NodeFactory.NewModifierList(ast.CreateModifiersFromModifierFlags(modifierFlags, f.changeTracker.NodeFactory.NewModifier))"},
  {"line":198,"text":"}"},
  {"line":200,"text":"func (f *missingMemberFixer) shouldAddOverrideKeyword(declaration *ast.Node) bool {"},
  {"line":201,"text":"\treturn declaration != nil && f.program.Options().NoImplicitOverride.IsTrue() && ast.HasAbstractModifier(declaration)"},
  {"line":202,"text":"}"},
  {"line":204,"text":"func (f *missingMemberFixer) createSignatureDeclarationFromSignature(signature *checker.Signature, kind ast.Kind, sourceFile *ast.SourceFile, enclosingDeclaration *ast.Node, body *ast.FunctionBody, modifiers *ast.ModifierList, name *ast.PropertyName, optional bool) *ast.Node {"},
  {"line":205,"text":"\tquotePreference := lsutil.GetQuotePreference(sourceFile, f.preferences)"},
  {"line":206,"text":"\tflags := nodebuilder.FlagsNoTruncation | nodebuilder.FlagsSuppressAnyReturnType | nodebuilder.FlagsAllowEmptyTuple"},
  {"line":207,"text":"\tif quotePreference == lsutil.QuotePreferenceSingle {"},
  {"line":208,"text":"\t\tflags |= nodebuilder.FlagsUseSingleQuotesForStringLiteralType"},
  {"line":209,"text":"\t}"},
  {"line":211,"text":"\tnodeBuilder, idToSymbol := f.createNodeBuilder()"},
  {"line":212,"text":"\tsignatureDeclaration := nodeBuilder.SignatureToSignatureDeclaration(signature, kind, enclosingDeclaration, flags, nodebuilder.InternalFlagsAllowUnresolvedNames, nil /*tracker*/)"},
  {"line":213,"text":"\tif signatureDeclaration == nil {"},
  {"line":214,"text":"\t\treturn nil"},
  {"line":215,"text":"\t}"},
  {"line":217,"text":"\tisJS := ast.IsInJSFile(enclosingDeclaration)"},
  {"line":218,"text":"\tparameters := signatureDeclaration.ParameterList()"},
  {"line":219,"text":"\ttypeParameters := core.IfElse(isJS, nil, signatureDeclaration.TypeParameterList())"},
  {"line":220,"text":"\ttypeNode := core.IfElse(isJS, nil, signatureDeclaration.Type())"},
  {"line":222,"text":"\tif typeParameters != nil && len(typeParameters.Nodes) > 0 {"},
  {"line":223,"text":"\t\tnodes := make([]*ast.Node, 0, len(typeParameters.Nodes))"},
  {"line":224,"text":"\t\tfor _, tp := range typeParameters.Nodes {"},
  {"line":225,"text":"\t\t\tif tp == nil {"},
  {"line":226,"text":"\t\t\t\tcontinue"},
  {"line":227,"text":"\t\t\t}"},
  {"line":229,"text":"\t\t\tif ast.IsTypeParameterDeclaration(tp) {"},
  {"line":230,"text":"\t\t\t\ttypeParameter := tp.AsTypeParameterDeclaration()"},
  {"line":232,"text":"\t\t\t\tconstraint := typeParameter.Constraint"},
  {"line":233,"text":"\t\t\t\tif constraint != nil {"},
  {"line":234,"text":"\t\t\t\t\tconstraint = f.importTypeNode(constraint, idToSymbol)"},
  {"line":235,"text":"\t\t\t\t}"},
  {"line":237,"text":"\t\t\t\tdefaultType := typeParameter.DefaultType"},
  {"line":238,"text":"\t\t\t\tif defaultType != nil {"},
  {"line":239,"text":"\t\t\t\t\tdefaultType = f.importTypeNode(defaultType, idToSymbol)"},
  {"line":240,"text":"\t\t\t\t}"},
  {"line":242,"text":"\t\t\t\tnodes = append(nodes,"},
  {"line":243,"text":"\t\t\t\t\tf.changeTracker.NodeFactory.UpdateTypeParameterDeclaration(typeParameter, typeParameter.Modifiers(), typeParameter.Name(), constraint, typeParameter.Expression, defaultType))"},
  {"line":244,"text":"\t\t\t} else {"},
  {"line":245,"text":"\t\t\t\tnodes = append(nodes, tp)"},
  {"line":246,"text":"\t\t\t}"},
  {"line":247,"text":"\t\t}"},
  {"line":248,"text":"\t\ttypeParameters = f.changeTracker.NodeFactory.NewNodeList(nodes)"},
  {"line":249,"text":"\t}"},
  {"line":251,"text":"\tif parameters != nil {"},
  {"line":252,"text":"\t\tnodes := make([]*ast.Node, 0, len(parameters.Nodes))"},
  {"line":253,"text":"\t\tfor _, p := range parameters.Nodes {"},
  {"line":254,"text":"\t\t\tif p == nil {"},
  {"line":255,"text":"\t\t\t\tcontinue"},
  {"line":256,"text":"\t\t\t}"},
  {"line":258,"text":"\t\t\tparameter := p.AsParameterDeclaration()"},
  {"line":259,"text":"\t\t\tparameterTypeNode := parameter.Type"},
  {"line":260,"text":"\t\t\tif parameterTypeNode != nil {"},
  {"line":261,"text":"\t\t\t\tparameterTypeNode = f.importTypeNode(parameterTypeNode, idToSymbol)"},
  {"line":262,"text":"\t\t\t}"},
  {"line":264,"text":"\t\t\tnodes = append(nodes,"},
  {"line":265,"text":"\t\t\t\tf.changeTracker.NodeFactory.UpdateParameterDeclaration(parameter, parameter.Modifiers(), parameter.DotDotDotToken, parameter.Name(), core.IfElse(isJS, nil, parameter.QuestionToken), parameterTypeNode, parameter.Initializer))"},
  {"line":266,"text":"\t\t}"},
  {"line":267,"text":"\t\tparameters = f.changeTracker.NodeFactory.NewNodeList(nodes)"},
  {"line":268,"text":"\t}"},
  {"line":270,"text":"\tif typeNode != nil {"},
  {"line":271,"text":"\t\ttypeNode = f.importTypeNode(typeNode, idToSymbol)"},
  {"line":272,"text":"\t}"},
  {"line":274,"text":"\tvar questionToken *ast.TokenNode"},
  {"line":275,"text":"\tif optional {"},
  {"line":276,"text":"\t\tquestionToken = f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken)"},
  {"line":277,"text":"\t}"},
  {"line":279,"text":"\tswitch kind {"},
  {"line":280,"text":"\tcase ast.KindFunctionExpression:"},
  {"line":281,"text":"\t\tfn := signatureDeclaration.AsFunctionExpression()"},
  {"line":282,"text":"\t\treturn f.changeTracker.NodeFactory.UpdateFunctionExpression(fn, modifiers, fn.AsteriskToken, core.IfElse(name != nil && ast.IsIdentifier(name), name, nil), typeParameters, parameters, typeNode, fn.FullSignature, core.OrElse(body, fn.Body))"},
  {"line":284,"text":"\tcase ast.KindArrowFunction:"},
  {"line":285,"text":"\t\tfn := signatureDeclaration.AsArrowFunction()"},
  {"line":286,"text":"\t\treturn f.changeTracker.NodeFactory.UpdateArrowFunction(fn, modifiers, typeParameters, parameters, typeNode, fn.FullSignature, fn.EqualsGreaterThanToken, core.OrElse(body, fn.Body))"},
  {"line":288,"text":"\tcase ast.KindMethodDeclaration:"},
  {"line":289,"text":"\t\tmethod := signatureDeclaration.AsMethodDeclaration()"},
  {"line":290,"text":"\t\tmethodName := core.IfElse(name == nil, f.changeTracker.NodeFactory.NewIdentifier(\"\"), createPropertyName(f.changeTracker.NodeFactory, name, quotePreference))"},
  {"line":291,"text":"\t\treturn f.changeTracker.NodeFactory.UpdateMethodDeclaration(method, modifiers, method.AsteriskToken, methodName, questionToken, typeParameters, parameters, typeNode, method.FullSignature, body)"},
  {"line":293,"text":"\tcase ast.KindFunctionDeclaration:"},
  {"line":294,"text":"\t\tfn := signatureDeclaration.AsFunctionDeclaration()"},
  {"line":295,"text":"\t\treturn f.changeTracker.NodeFactory.UpdateFunctionDeclaration(fn, modifiers, fn.AsteriskToken, core.IfElse(name != nil && ast.IsIdentifier(name), name, nil), typeParameters, parameters, typeNode, fn.FullSignature, core.OrElse(body, fn.Body))"},
  {"line":296,"text":"\t}"},
  {"line":298,"text":"\treturn nil"},
  {"line":299,"text":"}"},
  {"line":301,"text":"func (f *missingMemberFixer) createSignatureDeclarationFromSignatures(signatures []*checker.Signature, name *ast.PropertyName, optional bool, modifiers *ast.ModifierList, quotePreference lsutil.QuotePreference, body *ast.FunctionBody, enclosingDeclaration *ast.Node) *ast.Node {"},
  {"line":302,"text":"\tif len(signatures) == 0 {"},
  {"line":303,"text":"\t\treturn nil"},
  {"line":304,"text":"\t}"},
  {"line":306,"text":"\tnodeBuilder, idToSymbol := f.createNodeBuilder()"},
  {"line":307,"text":"\tmaxArgsSignature := signatures[0]"},
  {"line":308,"text":"\tminArgumentCount := signatures[0].MinArgumentCount()"},
  {"line":310,"text":"\thasRestParameter := false"},
  {"line":311,"text":"\tfor _, signature := range signatures {"},
  {"line":312,"text":"\t\tminArgumentCount = min(minArgumentCount, signature.MinArgumentCount())"},
  {"line":313,"text":"\t\tif signature.HasRestParameter() {"},
  {"line":314,"text":"\t\t\thasRestParameter = true"},
  {"line":315,"text":"\t\t}"},
  {"line":316,"text":"\t\tif len(signature.Parameters()) >= len(maxArgsSignature.Parameters()) && (!signature.HasRestParameter() || maxArgsSignature.HasRestParameter()) {"},
  {"line":317,"text":"\t\t\tmaxArgsSignature = signature"},
  {"line":318,"text":"\t\t}"},
  {"line":319,"text":"\t}"},
  {"line":321,"text":"\tmaxNonRestArgs := len(maxArgsSignature.Parameters()) - core.IfElse(maxArgsSignature.HasRestParameter(), 1, 0)"},
  {"line":322,"text":"\tparameterNames := make([]string, 0, len(maxArgsSignature.Parameters()))"},
  {"line":323,"text":"\tfor _, symbol := range maxArgsSignature.Parameters() {"},
  {"line":324,"text":"\t\tparameterNames = append(parameterNames, symbol.Name)"},
  {"line":325,"text":"\t}"},
  {"line":326,"text":"\tparameters := createDummyParameters(f.changeTracker.NodeFactory, maxNonRestArgs, parameterNames, nil /*types*/, minArgumentCount, ast.IsInJSFile(enclosingDeclaration))"},
  {"line":328,"text":"\tif hasRestParameter {"},
  {"line":329,"text":"\t\trestParameterName := \"rest\""},
  {"line":330,"text":"\t\tif maxNonRestArgs < len(parameterNames) && parameterNames[maxNonRestArgs] != \"\" {"},
  {"line":331,"text":"\t\t\trestParameterName = parameterNames[maxNonRestArgs]"},
  {"line":332,"text":"\t\t}"},
  {"line":334,"text":"\t\tvar questionToken *ast.QuestionToken"},
  {"line":335,"text":"\t\tif maxNonRestArgs >= minArgumentCount {"},
  {"line":336,"text":"\t\t\tquestionToken = f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken)"},
  {"line":337,"text":"\t\t}"},
  {"line":339,"text":"\t\tparameters.Nodes = append(parameters.Nodes, f.changeTracker.NodeFactory.NewParameterDeclaration("},
  {"line":340,"text":"\t\t\tnil /*modifiers*/, f.changeTracker.NodeFactory.NewToken(ast.KindDotDotDotToken),"},
  {"line":341,"text":"\t\t\tf.changeTracker.NodeFactory.NewIdentifier(restParameterName), questionToken,"},
  {"line":342,"text":"\t\t\tf.changeTracker.NodeFactory.NewArrayTypeNode(f.changeTracker.NodeFactory.NewKeywordTypeNode(ast.KindUnknownKeyword)), nil, /*initializer*/"},
  {"line":343,"text":"\t\t))"},
  {"line":344,"text":"\t}"},
  {"line":346,"text":"\tmethodName := core.IfElse(name == nil, f.changeTracker.NodeFactory.NewIdentifier(\"\"), createPropertyName(f.changeTracker.NodeFactory, name, quotePreference))"},
  {"line":348,"text":"\treturn f.changeTracker.NodeFactory.NewMethodDeclaration("},
  {"line":349,"text":"\t\tmodifiers, nil /*asteriskToken*/, methodName, core.IfElse(optional, f.changeTracker.NodeFactory.NewToken(ast.KindQuestionToken), nil),"},
  {"line":350,"text":"\t\tnil /*typeParameters*/, parameters, f.getReturnTypeFromSignatures(signatures, enclosingDeclaration, nodeBuilder, idToSymbol),"},
  {"line":351,"text":"\t\tnil /*fullSignature*/, f.createBody(body, false /*ambient*/, quotePreference),"},
  {"line":352,"text":"\t)"},
  {"line":353,"text":"}"},
  {"line":355,"text":"func (f *missingMemberFixer) getReturnTypeFromSignatures(signatures []*checker.Signature, enclosingDeclaration *ast.Node, nodeBuilder *checker.NodeBuilder, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *ast.TypeNode {"},
  {"line":356,"text":"\tif len(signatures) == 0 {"},
  {"line":357,"text":"\t\treturn nil"},
  {"line":358,"text":"\t}"},
  {"line":360,"text":"\treturnTypes := make([]*checker.Type, 0, len(signatures))"},
  {"line":361,"text":"\tfor _, signature := range signatures {"},
  {"line":362,"text":"\t\treturnTypes = append(returnTypes, f.typeChecker.GetReturnTypeOfSignature(signature))"},
  {"line":363,"text":"\t}"},
  {"line":365,"text":"\tunionType := f.typeChecker.GetUnionType(returnTypes)"},
  {"line":366,"text":"\treturn f.importTypeNode(nodeBuilder.TypeToTypeNode(unionType, enclosingDeclaration, nodebuilder.FlagsNoTruncation, nodebuilder.InternalFlagsAllowUnresolvedNames, nil /*typeArguments*/), idToSymbol)"},
  {"line":367,"text":"}"},
  {"line":369,"text":"func (f *missingMemberFixer) importTypeNode(typeNode *ast.TypeNode, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) *ast.TypeNode {"},
  {"line":370,"text":"\tif typeNode == nil || f.importAdder == nil {"},
  {"line":371,"text":"\t\treturn typeNode"},
  {"line":372,"text":"\t}"},
  {"line":374,"text":"\timportedTypeNode, symbols := autoimport.TryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol)"},
  {"line":375,"text":"\tif importedTypeNode != nil {"},
  {"line":376,"text":"\t\tfor _, symbol := range symbols {"},
  {"line":377,"text":"\t\t\tf.importAdder.AddImportFromExportedSymbol(symbol, true /*isValidTypeOnlyUseSite*/)"},
  {"line":378,"text":"\t\t}"},
  {"line":379,"text":"\t\treturn importedTypeNode"},
  {"line":380,"text":"\t}"},
  {"line":382,"text":"\tseen := make(map[*ast.Symbol]bool)"},
  {"line":383,"text":"\tfor _, symbol := range idToSymbol {"},
  {"line":384,"text":"\t\tif symbol == nil || seen[symbol] {"},
  {"line":385,"text":"\t\t\tcontinue"},
  {"line":386,"text":"\t\t}"},
  {"line":387,"text":"\t\tseen[symbol] = true"},
  {"line":388,"text":"\t\tf.importAdder.AddImportFromExportedSymbol(symbol, true /*isValidTypeOnlyUseSite*/)"},
  {"line":389,"text":"\t}"},
  {"line":390,"text":"\treturn typeNode"},
  {"line":391,"text":"}"},
  {"line":393,"text":"func (f *missingMemberFixer) createIndexSignatureDeclarationFromType(classDeclaration *ast.Node, implementedType *checker.Type, keyType *checker.Type) *ast.Node {"},
  {"line":394,"text":"\tindexInfo := f.typeChecker.GetIndexInfoOfType(implementedType, keyType)"},
  {"line":395,"text":"\tif indexInfo == nil {"},
  {"line":396,"text":"\t\treturn nil"},
  {"line":397,"text":"\t}"},
  {"line":399,"text":"\tbuilder := checker.NewNodeBuilder(f.typeChecker, f.changeTracker.EmitContext)"},
  {"line":400,"text":"\treturn builder.IndexInfoToIndexSignatureDeclaration(indexInfo, classDeclaration, nodebuilder.FlagsNone, nodebuilder.InternalFlagsNone, nil)"},
  {"line":401,"text":"}"},
  {"line":403,"text":"func (f *missingMemberFixer) createBody(body *ast.FunctionBody, ambient bool, quotePreference lsutil.QuotePreference) *ast.FunctionBody {"},
  {"line":404,"text":"\tif ambient {"},
  {"line":405,"text":"\t\treturn nil"},
  {"line":406,"text":"\t}"},
  {"line":407,"text":"\tbody = f.changeTracker.NodeFactory.DeepCloneNode(body)"},
  {"line":408,"text":"\tif body == nil {"},
  {"line":409,"text":"\t\treturn f.createStubbedMethodBody(quotePreference)"},
  {"line":410,"text":"\t}"},
  {"line":411,"text":"\treturn body"},
  {"line":412,"text":"}"},
  {"line":414,"text":"func (f *missingMemberFixer) createStubbedMethodBody(quotePreference lsutil.QuotePreference) *ast.FunctionBody {"},
  {"line":415,"text":"\ttokenFlags := ast.TokenFlagsNone"},
  {"line":416,"text":"\tif quotePreference == lsutil.QuotePreferenceSingle {"},
  {"line":417,"text":"\t\ttokenFlags = ast.TokenFlagsSingleQuote"},
  {"line":418,"text":"\t}"},
  {"line":420,"text":"\treturn f.changeTracker.NodeFactory.NewBlock(f.changeTracker.NodeFactory.NewNodeList([]*ast.Node{"},
  {"line":421,"text":"\t\tf.changeTracker.NodeFactory.NewThrowStatement("},
  {"line":422,"text":"\t\t\tf.changeTracker.NodeFactory.NewNewExpression("},
  {"line":423,"text":"\t\t\t\tf.changeTracker.NodeFactory.NewIdentifier(\"Error\"), nil /*typeArguments*/, f.changeTracker.NodeFactory.NewNodeList([]*ast.Node{"},
  {"line":424,"text":"\t\t\t\t\tf.changeTracker.NodeFactory.NewStringLiteral(diagnostics.Method_not_implemented.Localize(f.locale), tokenFlags),"},
  {"line":425,"text":"\t\t\t\t}),"},
  {"line":426,"text":"\t\t\t),"},
  {"line":427,"text":"\t\t),"},
  {"line":428,"text":"\t}), true /*multiLine*/)"},
  {"line":429,"text":"}"},
  {"line":431,"text":"func createDummyParameters(factory *ast.NodeFactory, argCount int, names []string, types []*ast.TypeNode, minArgumentCount int, inJS bool) *ast.ParameterList {"},
  {"line":432,"text":"\tparameters := make([]*ast.Node, 0, argCount)"},
  {"line":433,"text":"\tparameterNameCounts := make(map[string]int)"},
  {"line":435,"text":"\tfor i := range argCount {"},
  {"line":436,"text":"\t\tparameterName := \"\""},
  {"line":437,"text":"\t\tif i < len(names) && names[i] != \"\" {"},
  {"line":438,"text":"\t\t\tparameterName = names[i]"},
  {"line":439,"text":"\t\t} else {"},
  {"line":440,"text":"\t\t\tparameterName = \"arg\" + strconv.Itoa(i)"},
  {"line":441,"text":"\t\t}"},
  {"line":443,"text":"\t\tcount := parameterNameCounts[parameterName]"},
  {"line":444,"text":"\t\tparameterNameCounts[parameterName] = count + 1"},
  {"line":446,"text":"\t\tif count > 0 {"},
  {"line":447,"text":"\t\t\tparameterName += strconv.Itoa(count)"},
  {"line":448,"text":"\t\t}"},
  {"line":450,"text":"\t\tvar questionToken *ast.QuestionToken"},
  {"line":451,"text":"\t\tif i >= minArgumentCount {"},
  {"line":452,"text":"\t\t\tquestionToken = factory.NewToken(ast.KindQuestionToken)"},
  {"line":453,"text":"\t\t}"},
  {"line":455,"text":"\t\tvar typeNode *ast.TypeNode"},
  {"line":456,"text":"\t\tif inJS {"},
  {"line":457,"text":"\t\t\ttypeNode = nil"},
  {"line":458,"text":"\t\t} else if i < len(types) && types[i] != nil {"},
  {"line":459,"text":"\t\t\ttypeNode = types[i]"},
  {"line":460,"text":"\t\t} else {"},
  {"line":461,"text":"\t\t\ttypeNode = factory.NewKeywordTypeNode(ast.KindUnknownKeyword)"},
  {"line":462,"text":"\t\t}"},
  {"line":463,"text":"\t\tparameters = append(parameters,"},
  {"line":464,"text":"\t\t\tfactory.NewParameterDeclaration(nil /*modifiers*/, nil /*dotDotDotToken*/, factory.NewIdentifier(parameterName), questionToken, typeNode, nil /*initializer*/))"},
  {"line":465,"text":"\t}"},
  {"line":466,"text":"\treturn factory.NewNodeList(parameters)"},
  {"line":467,"text":"}"},
  {"line":469,"text":"func createDeclarationName(factory *ast.NodeFactory, typeChecker *checker.Checker, symbol *ast.Symbol, declaration *ast.Node) *ast.PropertyName {"},
  {"line":470,"text":"\tif symbol != nil && symbol.CheckFlags&ast.CheckFlagsMapped != 0 {"},
  {"line":471,"text":"\t\tnameType := typeChecker.GetNameTypeOfSymbol(symbol)"},
  {"line":472,"text":"\t\tif nameType != nil && checker.IsTypeUsableAsPropertyName(nameType) {"},
  {"line":473,"text":"\t\t\treturn factory.NewIdentifier(checker.GetPropertyNameFromType(nameType))"},
  {"line":474,"text":"\t\t}"},
  {"line":475,"text":"\t}"},
  {"line":476,"text":"\tif declaration != nil && declaration.Name() != nil {"},
  {"line":477,"text":"\t\treturn declaration.Name().Clone(factory)"},
  {"line":478,"text":"\t}"},
  {"line":479,"text":"\tif symbol != nil {"},
  {"line":480,"text":"\t\treturn factory.NewIdentifier(symbol.Name)"},
  {"line":481,"text":"\t}"},
  {"line":482,"text":"\treturn nil"},
  {"line":483,"text":"}"},
  {"line":485,"text":"func createPropertyName(factory *ast.NodeFactory, node *ast.Node, quotePreference lsutil.QuotePreference) *ast.PropertyName {"},
  {"line":486,"text":"\tif ast.IsIdentifier(node) && node.Text() == \"constructor\" {"},
  {"line":487,"text":"\t\ttokenFlags := ast.TokenFlagsNone"},
  {"line":488,"text":"\t\tif quotePreference == lsutil.QuotePreferenceSingle {"},
  {"line":489,"text":"\t\t\ttokenFlags = ast.TokenFlagsSingleQuote"},
  {"line":490,"text":"\t\t}"},
  {"line":491,"text":"\t\treturn factory.NewComputedPropertyName(factory.NewStringLiteral(node.Text(), tokenFlags))"},
  {"line":492,"text":"\t}"},
  {"line":493,"text":"\treturn factory.DeepCloneNode(node)"},
  {"line":494,"text":"}"},
];

export function findLsCodeActionsMissingMemberFixerDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsCodeActionsMissingMemberFixerDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsCodeActionsMissingMemberFixerDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsCodeActionsMissingMemberFixerDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsCodeActionsMissingMemberFixerLineText(line: number): string | undefined {
  return lsCodeActionsMissingMemberFixerSourceLines.find((entry) => entry.line === line)?.text;
}
