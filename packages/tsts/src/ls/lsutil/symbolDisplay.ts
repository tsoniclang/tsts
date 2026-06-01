import {
  Kind,
  NodeFlags,
  SymbolFlags,
  getCombinedModifierFlags,
  getCombinedNodeFlags,
  hasSyntacticModifier,
  isArrayBindingPattern,
  isBindingElement,
  isDeclaration,
  isExpression,
  isFunctionBlock,
  isFunctionExpression,
  isObjectBindingPattern,
  isParameterDeclaration,
  type Node,
  type Symbol,
} from "../../ast/index.js";
import { CheckFlags } from "../../ast/checkFlags.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import { SignatureKind, type SignatureKind as SignatureKindValue, type Type } from "../../checker/types.js";

export type ScriptElementKind = number;

export const ScriptElementKindUnknown: ScriptElementKind = 0;
export const ScriptElementKindWarning: ScriptElementKind = 1;
export const ScriptElementKindKeyword: ScriptElementKind = 2;
export const ScriptElementKindScriptElement: ScriptElementKind = 3;
export const ScriptElementKindModuleElement: ScriptElementKind = 4;
export const ScriptElementKindClassElement: ScriptElementKind = 5;
export const ScriptElementKindLocalClassElement: ScriptElementKind = 6;
export const ScriptElementKindInterfaceElement: ScriptElementKind = 7;
export const ScriptElementKindTypeElement: ScriptElementKind = 8;
export const ScriptElementKindEnumElement: ScriptElementKind = 9;
export const ScriptElementKindEnumMemberElement: ScriptElementKind = 10;
export const ScriptElementKindVariableElement: ScriptElementKind = 11;
export const ScriptElementKindLocalVariableElement: ScriptElementKind = 12;
export const ScriptElementKindVariableUsingElement: ScriptElementKind = 13;
export const ScriptElementKindVariableAwaitUsingElement: ScriptElementKind = 14;
export const ScriptElementKindFunctionElement: ScriptElementKind = 15;
export const ScriptElementKindLocalFunctionElement: ScriptElementKind = 16;
export const ScriptElementKindMemberFunctionElement: ScriptElementKind = 17;
export const ScriptElementKindMemberGetAccessorElement: ScriptElementKind = 18;
export const ScriptElementKindMemberSetAccessorElement: ScriptElementKind = 19;
export const ScriptElementKindMemberVariableElement: ScriptElementKind = 20;
export const ScriptElementKindMemberAccessorVariableElement: ScriptElementKind = 21;
export const ScriptElementKindConstructorImplementationElement: ScriptElementKind = 22;
export const ScriptElementKindCallSignatureElement: ScriptElementKind = 23;
export const ScriptElementKindIndexSignatureElement: ScriptElementKind = 24;
export const ScriptElementKindConstructSignatureElement: ScriptElementKind = 25;
export const ScriptElementKindParameterElement: ScriptElementKind = 26;
export const ScriptElementKindTypeParameterElement: ScriptElementKind = 27;
export const ScriptElementKindPrimitiveType: ScriptElementKind = 28;
export const ScriptElementKindLabel: ScriptElementKind = 29;
export const ScriptElementKindAlias: ScriptElementKind = 30;
export const ScriptElementKindConstElement: ScriptElementKind = 31;
export const ScriptElementKindLetElement: ScriptElementKind = 32;
export const ScriptElementKindDirectory: ScriptElementKind = 33;
export const ScriptElementKindExternalModuleName: ScriptElementKind = 34;
export const ScriptElementKindString: ScriptElementKind = 35;
export const ScriptElementKindLink: ScriptElementKind = 36;
export const ScriptElementKindLinkName: ScriptElementKind = 37;
export const ScriptElementKindLinkText: ScriptElementKind = 38;

export type ScriptElementKindModifier = number;

export const ScriptElementKindModifierNone: ScriptElementKindModifier = 0;
export const ScriptElementKindModifierPublic: ScriptElementKindModifier = 1 << 1;
export const ScriptElementKindModifierPrivate: ScriptElementKindModifier = 1 << 2;
export const ScriptElementKindModifierProtected: ScriptElementKindModifier = 1 << 3;
export const ScriptElementKindModifierExported: ScriptElementKindModifier = 1 << 4;
export const ScriptElementKindModifierAmbient: ScriptElementKindModifier = 1 << 5;
export const ScriptElementKindModifierStatic: ScriptElementKindModifier = 1 << 6;
export const ScriptElementKindModifierAbstract: ScriptElementKindModifier = 1 << 7;
export const ScriptElementKindModifierOptional: ScriptElementKindModifier = 1 << 8;
export const ScriptElementKindModifierDeprecated: ScriptElementKindModifier = 1 << 9;
export const ScriptElementKindModifierDts: ScriptElementKindModifier = 1 << 10;
export const ScriptElementKindModifierTs: ScriptElementKindModifier = 1 << 11;
export const ScriptElementKindModifierTsx: ScriptElementKindModifier = 1 << 12;
export const ScriptElementKindModifierJs: ScriptElementKindModifier = 1 << 13;
export const ScriptElementKindModifierJsx: ScriptElementKindModifier = 1 << 14;
export const ScriptElementKindModifierJson: ScriptElementKindModifier = 1 << 15;
export const ScriptElementKindModifierDmts: ScriptElementKindModifier = 1 << 16;
export const ScriptElementKindModifierMts: ScriptElementKindModifier = 1 << 17;
export const ScriptElementKindModifierMjs: ScriptElementKindModifier = 1 << 18;
export const ScriptElementKindModifierDcts: ScriptElementKindModifier = 1 << 19;
export const ScriptElementKindModifierCts: ScriptElementKindModifier = 1 << 20;
export const ScriptElementKindModifierCjs: ScriptElementKindModifier = 1 << 21;

interface ScriptElementKindModifierName {
  readonly flag: ScriptElementKindModifier;
  readonly name: string;
}

const scriptElementKindModifierNames: readonly ScriptElementKindModifierName[] = [
  { flag: ScriptElementKindModifierPublic, name: "public" },
  { flag: ScriptElementKindModifierPrivate, name: "private" },
  { flag: ScriptElementKindModifierProtected, name: "protected" },
  { flag: ScriptElementKindModifierExported, name: "export" },
  { flag: ScriptElementKindModifierAmbient, name: "declare" },
  { flag: ScriptElementKindModifierStatic, name: "static" },
  { flag: ScriptElementKindModifierAbstract, name: "abstract" },
  { flag: ScriptElementKindModifierOptional, name: "optional" },
  { flag: ScriptElementKindModifierDeprecated, name: "deprecated" },
  { flag: ScriptElementKindModifierDts, name: ".d.ts" },
  { flag: ScriptElementKindModifierTs, name: ".ts" },
  { flag: ScriptElementKindModifierTsx, name: ".tsx" },
  { flag: ScriptElementKindModifierJs, name: ".js" },
  { flag: ScriptElementKindModifierJsx, name: ".jsx" },
  { flag: ScriptElementKindModifierJson, name: ".json" },
  { flag: ScriptElementKindModifierDmts, name: ".d.mts" },
  { flag: ScriptElementKindModifierMts, name: ".mts" },
  { flag: ScriptElementKindModifierMjs, name: ".mjs" },
  { flag: ScriptElementKindModifierDcts, name: ".d.cts" },
  { flag: ScriptElementKindModifierCts, name: ".cts" },
  { flag: ScriptElementKindModifierCjs, name: ".cjs" },
];

export const FileExtensionKindModifiers: ScriptElementKindModifier =
  ScriptElementKindModifierDts
  | ScriptElementKindModifierTs
  | ScriptElementKindModifierTsx
  | ScriptElementKindModifierJs
  | ScriptElementKindModifierJsx
  | ScriptElementKindModifierJson
  | ScriptElementKindModifierDmts
  | ScriptElementKindModifierMts
  | ScriptElementKindModifierMjs
  | ScriptElementKindModifierDcts
  | ScriptElementKindModifierCts
  | ScriptElementKindModifierCjs;

export interface SymbolDisplayTypeChecker {
  getRootSymbols?(symbol: Symbol): readonly Symbol[];
  getTypeOfSymbolAtLocation?(symbol: Symbol, location: Node): Type | undefined;
  getNonNullableType?(type: Type): Type;
  getCallSignatures?(type: Type): readonly unknown[];
  getSignaturesOfType?(type: Type, kind: SignatureKindValue): readonly unknown[];
  isUndefinedSymbol?(symbol: Symbol): boolean;
  isArgumentsSymbol?(symbol: Symbol): boolean;
  getAliasedSymbol?(symbol: Symbol): Symbol;
  isDeprecatedDeclaration?(declaration: Node): boolean;
}

export function scriptElementKindModifierStrings(modifier: ScriptElementKindModifier): Set<string> {
  const result = new Set<string>();
  for (const entry of scriptElementKindModifierNames) {
    if ((modifier & entry.flag) !== 0) {
      result.add(entry.name);
    }
  }
  return result;
}

export function getSymbolKind(
  typeChecker: SymbolDisplayTypeChecker | undefined,
  symbol: Symbol,
  location: Node,
): ScriptElementKind {
  const result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location);
  if (result !== ScriptElementKindUnknown) return result;

  const flags = combinedLocalAndExportSymbolFlags(symbol);
  if ((flags & SymbolFlags.Class) !== 0) {
    const declaration = getDeclarationOfKind(symbol, Kind.ClassExpression);
    return declaration === undefined ? ScriptElementKindClassElement : ScriptElementKindLocalClassElement;
  }
  if ((flags & SymbolFlags.Enum) !== 0) return ScriptElementKindEnumElement;
  if ((flags & SymbolFlags.TypeAlias) !== 0) return ScriptElementKindTypeElement;
  if ((flags & SymbolFlags.Interface) !== 0) return ScriptElementKindInterfaceElement;
  if ((flags & SymbolFlags.TypeParameter) !== 0) return ScriptElementKindTypeParameterElement;
  if ((flags & SymbolFlags.EnumMember) !== 0) return ScriptElementKindEnumMemberElement;
  if ((flags & SymbolFlags.Alias) !== 0) return ScriptElementKindAlias;
  if ((flags & SymbolFlags.Module) !== 0) return ScriptElementKindModuleElement;

  return ScriptElementKindUnknown;
}

function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(
  typeChecker: SymbolDisplayTypeChecker | undefined,
  symbol: Symbol,
  location: Node,
): ScriptElementKind {
  const roots = typeChecker?.getRootSymbols?.(symbol) ?? [symbol];

  if (roots.length === 1
    && ((roots[0]!.flags ?? SymbolFlags.None) & SymbolFlags.Method) !== 0
    && hasCallableType(typeChecker, symbol, location)) {
    return ScriptElementKindMemberFunctionElement;
  }

  if (typeChecker !== undefined) {
    if (typeChecker.isUndefinedSymbol?.(symbol) === true) return ScriptElementKindVariableElement;
    if (typeChecker.isArgumentsSymbol?.(symbol) === true) return ScriptElementKindLocalVariableElement;
    if ((location.kind === Kind.ThisKeyword && isExpression(location)) || isThisInTypeQuery(location)) {
      return ScriptElementKindParameterElement;
    }
  }

  const flags = combinedLocalAndExportSymbolFlags(symbol);
  if ((flags & SymbolFlags.Variable) !== 0) {
    if (isFirstDeclarationOfSymbolParameter(symbol)) return ScriptElementKindParameterElement;
    if (symbol.valueDeclaration !== undefined && isVarConst(symbol.valueDeclaration)) return ScriptElementKindConstElement;
    if (symbol.valueDeclaration !== undefined && isVarUsing(symbol.valueDeclaration)) return ScriptElementKindVariableUsingElement;
    if (symbol.valueDeclaration !== undefined && isVarAwaitUsing(symbol.valueDeclaration)) return ScriptElementKindVariableAwaitUsingElement;
    if (hasLetDeclaration(symbol)) return ScriptElementKindLetElement;
    return isLocalVariableOrFunction(symbol) ? ScriptElementKindLocalVariableElement : ScriptElementKindVariableElement;
  }
  if ((flags & SymbolFlags.Function) !== 0) {
    return isLocalVariableOrFunction(symbol) ? ScriptElementKindLocalFunctionElement : ScriptElementKindFunctionElement;
  }
  if ((flags & SymbolFlags.GetAccessor) !== 0) return ScriptElementKindMemberGetAccessorElement;
  if ((flags & SymbolFlags.SetAccessor) !== 0) return ScriptElementKindMemberSetAccessorElement;
  if ((flags & SymbolFlags.Method) !== 0) return ScriptElementKindMemberFunctionElement;
  if ((flags & SymbolFlags.Constructor) !== 0) return ScriptElementKindConstructorImplementationElement;
  if ((flags & SymbolFlags.Signature) !== 0) return ScriptElementKindIndexSignatureElement;

  if ((flags & SymbolFlags.Property) !== 0) {
    if (typeChecker !== undefined
      && (flags & SymbolFlags.Transient) !== 0
      && (symbolCheckFlags(symbol) & CheckFlags.Synthetic) !== 0) {
      let unionPropertyKind = ScriptElementKindUnknown;
      for (const rootSymbol of roots) {
        const rootFlags = rootSymbol.flags ?? SymbolFlags.None;
        if ((rootFlags & (SymbolFlags.PropertyOrAccessor | SymbolFlags.Variable)) !== 0) {
          unionPropertyKind = ScriptElementKindMemberVariableElement;
          break;
        }
      }
      if (unionPropertyKind === ScriptElementKindUnknown) {
        return hasCallableType(typeChecker, symbol, location)
          ? ScriptElementKindMemberFunctionElement
          : ScriptElementKindMemberVariableElement;
      }
      return unionPropertyKind;
    }
    return ScriptElementKindMemberVariableElement;
  }

  return ScriptElementKindUnknown;
}

export function isFirstDeclarationOfSymbolParameter(symbol: Symbol): boolean {
  if (symbol.declarations.length === 0) return false;
  let current: Node | undefined = symbol.declarations[0];
  while (current !== undefined) {
    if (isParameterDeclaration(current)) return true;
    if (isBindingElement(current) || isObjectBindingPattern(current) || isArrayBindingPattern(current)) {
      current = current.parent;
      continue;
    }
    return false;
  }
  return false;
}

function isLocalVariableOrFunction(symbol: Symbol): boolean {
  if (symbol.parent !== undefined) return false;

  for (const declaration of symbol.declarations) {
    if (isFunctionExpression(declaration)) return true;
    if (declaration.kind !== Kind.VariableDeclaration && declaration.kind !== Kind.FunctionDeclaration) continue;

    let parent = declaration.parent;
    while (parent !== undefined && !isFunctionBlock(parent)) {
      if (parent.kind === Kind.SourceFile || parent.kind === Kind.ModuleBlock) break;
      parent = parent.parent;
    }
    if (isFunctionBlock(parent)) return true;
  }

  return false;
}

export function getSymbolModifiers(
  typeChecker: SymbolDisplayTypeChecker | undefined,
  symbol: Symbol | undefined,
): ScriptElementKindModifier {
  if (symbol === undefined) return ScriptElementKindModifierNone;

  let modifiers = getNormalizedSymbolModifiers(typeChecker, symbol);
  if (((symbol.flags ?? SymbolFlags.None) & SymbolFlags.Alias) !== 0 && typeChecker !== undefined) {
    const resolvedSymbol = typeChecker.getAliasedSymbol?.(symbol);
    if (resolvedSymbol !== undefined && resolvedSymbol !== symbol) {
      modifiers |= getNormalizedSymbolModifiers(typeChecker, resolvedSymbol);
    }
  }
  if (((symbol.flags ?? SymbolFlags.None) & SymbolFlags.Optional) !== 0) {
    modifiers |= ScriptElementKindModifierOptional;
  }
  return modifiers;
}

function getNormalizedSymbolModifiers(
  typeChecker: SymbolDisplayTypeChecker | undefined,
  symbol: Symbol,
): ScriptElementKindModifier {
  if (symbol.declarations.length === 0) return ScriptElementKindModifierNone;

  const declaration = symbol.declarations[0]!;
  const otherDeclarations = symbol.declarations.slice(1);
  const excludeFlags = otherDeclarations.length > 0
    && isDeprecatedDeclaration(typeChecker, declaration)
    && hasNonDeprecatedDeclaration(typeChecker, otherDeclarations)
      ? ModifierFlags.Deprecated
      : ModifierFlags.None;

  return getNodeModifiers(typeChecker, declaration, excludeFlags);
}

function isDeprecatedDeclaration(typeChecker: SymbolDisplayTypeChecker | undefined, declaration: Node): boolean {
  if (typeChecker !== undefined) {
    const result = typeChecker.isDeprecatedDeclaration?.(declaration);
    if (result !== undefined) return result;
  }
  if (hasSyntacticModifier(declaration, ModifierFlags.Deprecated)) return true;
  if ((getCombinedNodeFlags(declaration) & NodeFlags.PossiblyContainsDeprecatedTag) === 0) return false;

  let current: Node | undefined = declaration;
  while (current !== undefined) {
    if ((current.flags & NodeFlags.PossiblyContainsDeprecatedTag) !== 0) {
      return hasJSDocDeprecatedTag(current);
    }
    current = current.parent;
  }
  return false;
}

function getNodeModifiers(
  typeChecker: SymbolDisplayTypeChecker | undefined,
  node: Node,
  excludeFlags: ModifierFlags,
): ScriptElementKindModifier {
  let result = ScriptElementKindModifierNone;
  let flags = ModifierFlags.None;
  if (isDeclaration(node)) {
    flags = getCombinedModifierFlags(node);
    if (isDeprecatedDeclaration(typeChecker, node)) flags |= ModifierFlags.Deprecated;
    flags &= ~excludeFlags;
  }

  if ((flags & ModifierFlags.Private) !== 0) result |= ScriptElementKindModifierPrivate;
  if ((flags & ModifierFlags.Protected) !== 0) result |= ScriptElementKindModifierProtected;
  if ((flags & ModifierFlags.Public) !== 0) result |= ScriptElementKindModifierPublic;
  if ((flags & ModifierFlags.Static) !== 0) result |= ScriptElementKindModifierStatic;
  if ((flags & ModifierFlags.Abstract) !== 0) result |= ScriptElementKindModifierAbstract;
  if ((flags & ModifierFlags.Export) !== 0) result |= ScriptElementKindModifierExported;
  if ((flags & ModifierFlags.Deprecated) !== 0) result |= ScriptElementKindModifierDeprecated;
  if ((flags & ModifierFlags.Ambient) !== 0) result |= ScriptElementKindModifierAmbient;
  if ((node.flags & NodeFlags.Ambient) !== 0) result |= ScriptElementKindModifierAmbient;
  if (node.kind === Kind.ExportAssignment) result |= ScriptElementKindModifierExported;

  return result;
}

function combinedLocalAndExportSymbolFlags(symbol: Symbol): SymbolFlags {
  return (symbol.flags ?? SymbolFlags.None) | (symbol.exportSymbol?.flags ?? SymbolFlags.None);
}

function getDeclarationOfKind(symbol: Symbol, kind: Kind): Node | undefined {
  for (const declaration of symbol.declarations) {
    if (declaration.kind === kind) return declaration;
  }
  return undefined;
}

function hasCallableType(typeChecker: SymbolDisplayTypeChecker | undefined, symbol: Symbol, location: Node): boolean {
  if (typeChecker === undefined) return true;
  const rawType = typeChecker.getTypeOfSymbolAtLocation?.(symbol, location);
  if (rawType === undefined) return true;
  const type = typeChecker.getNonNullableType?.(rawType) ?? rawType;
  const callSignatures = typeChecker.getCallSignatures?.(type);
  if (callSignatures !== undefined) return callSignatures.length > 0;
  const signatures = typeChecker.getSignaturesOfType?.(type, SignatureKind.Call);
  return signatures === undefined || signatures.length > 0;
}

function symbolCheckFlags(symbol: Symbol): number {
  return (symbol as { readonly checkFlags?: number }).checkFlags ?? CheckFlags.None;
}

function isThisInTypeQuery(node: Node): boolean {
  return node.kind === Kind.ThisKeyword && node.parent !== undefined && node.parent.kind === Kind.TypeQuery;
}

function isVarConst(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Const;
}

function isVarUsing(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Using;
}

function isVarAwaitUsing(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.AwaitUsing;
}

function isLet(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Let;
}

function hasLetDeclaration(symbol: Symbol): boolean {
  for (const declaration of symbol.declarations) {
    if (isLet(declaration)) return true;
  }
  return false;
}

function hasNonDeprecatedDeclaration(
  typeChecker: SymbolDisplayTypeChecker | undefined,
  declarations: readonly Node[],
): boolean {
  for (const declaration of declarations) {
    if (!isDeprecatedDeclaration(typeChecker, declaration)) return true;
  }
  return false;
}

function hasJSDocDeprecatedTag(node: Node): boolean {
  const carrier = node as { readonly jsDoc?: readonly Node[]; readonly jsdoc?: readonly Node[] };
  const docs = carrier.jsDoc ?? carrier.jsdoc ?? [];
  for (const doc of docs) {
    const tagCarrier = doc as { readonly tags?: readonly Node[] | { readonly nodes?: readonly Node[] } };
    const rawTags = tagCarrier.tags;
    let tags: readonly Node[];
    if (rawTags === undefined) {
      tags = [];
    } else if (Array.isArray(rawTags)) {
      tags = rawTags;
    } else {
      tags = (rawTags as { readonly nodes?: readonly Node[] }).nodes ?? [];
    }
    for (const tag of tags) {
      const named = tag as { readonly tagName?: { readonly text?: string }; readonly name?: { readonly text?: string } };
      if (named.tagName?.text === "deprecated" || named.name?.text === "deprecated") return true;
      if (tag.kind === Kind.JSDocDeprecatedTag) return true;
    }
  }
  return false;
}
