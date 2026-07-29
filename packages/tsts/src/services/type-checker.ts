import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import type { Context } from "../go/context.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { Program_GetTypeCheckerForFile } from "../internal/compiler/program.js";
import type { Program } from "../internal/compiler/program.js";
import {
  Checker_GetPropertyOfType,
  Checker_GetReturnTypeOfSignature,
  Checker_GetSignaturesOfType,
  Checker_GetTypeFromTypeNode,
  Checker_GetTypeOfPropertyOfType,
} from "../internal/checker/exports.js";
import {
  Checker_finalizeResolvedCallEvidence,
  Checker_getResolvedSignature,
} from "../internal/checker/checker/signatures.js";
import { CheckModeNormal } from "../internal/checker/checker/state.js";
import type { Checker } from "../internal/checker/checker/state.js";
import {
  Checker_GetAliasedSymbol,
  Checker_getResolvedSourceElementAccessInfo,
  Checker_getResolvedSourcePropertyAccessInfo,
  Checker_GetSymbolAtLocation,
  Checker_getDeclaredTypeOfSymbol,
  Checker_getResolvedSymbolOrNil,
  Checker_getTypeOfSymbol,
  Checker_getWriteTypeOfSymbol,
  Checker_resolveExternalModuleName,
  Checker_resolveExternalModuleSymbol,
} from "../internal/checker/checker/symbols.js";
import type {
  ResolvedSourceElementAccessInfo as CheckerResolvedSourceElementAccessInfo,
  ResolvedSourcePropertyAccessInfo as CheckerResolvedSourcePropertyAccessInfo,
} from "../internal/checker/checker/symbols.js";
import { Checker_getContextualType, Checker_GetTypeAtLocation } from "../internal/checker/checker/types.js";
import { Checker_getResolvedSourceIterationInfo } from "../internal/checker/checker/syntax-checking.js";
import type { ExtensionCheckedIterationSelection } from "../internal/checker/checker/iteration-evidence.js";
import { Checker_GetConstantValue, Checker_GetExportsOfModule } from "../internal/checker/services.js";
import { Checker_TypeToString } from "../internal/checker/printer.js";
import type {
  ContextFlags,
  ResolvedCallEvidence,
  Signature,
  Type,
} from "../internal/checker/types.js";
import { ContextFlagsNone, SignatureKindCall, SignatureKindConstruct } from "../internal/checker/types.js";

export interface TypeCheckerQueryOptions {
  readonly context?: Context;
  readonly sourceFile?: GoPtr<SourceFile>;
}

export type ResolvedSourceCallInfo = ResolvedCallEvidence;
export type ResolvedSourcePropertyAccessInfo = CheckerResolvedSourcePropertyAccessInfo;
export type ResolvedSourceElementAccessInfo = CheckerResolvedSourceElementAccessInfo;
export type ResolvedSourceIterationInfo = ExtensionCheckedIterationSelection;

export interface TypeCheckerQueries {
  readonly getTypeAtLocation: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getTypeFromTypeNode: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getContextualType: (node: GoPtr<Node>, contextFlags?: ContextFlags, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getSymbolAtLocation: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getResolvedSymbol: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getResolvedSymbolOrNil: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getAliasedSymbol: (symbol: GoPtr<Symbol>, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getTypeOfSymbol: (symbol: GoPtr<Symbol>, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getWriteTypeOfSymbol: (symbol: GoPtr<Symbol>, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getDeclaredTypeOfSymbol: (symbol: GoPtr<Symbol>, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getResolvedSignature: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Signature>;
  readonly getResolvedCallInfo: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<ResolvedSourceCallInfo>;
  readonly getResolvedPropertyAccessInfo: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<ResolvedSourcePropertyAccessInfo>;
  readonly getResolvedElementAccessInfo: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<ResolvedSourceElementAccessInfo>;
  readonly getResolvedIterationInfo: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<ResolvedSourceIterationInfo>;
  readonly getReturnTypeOfSignature: (signature: GoPtr<Signature>, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getCallSignaturesOfType: (type: GoPtr<Type>, options?: TypeCheckerQueryOptions) => readonly GoPtr<Signature>[];
  readonly getConstructSignaturesOfType: (type: GoPtr<Type>, options?: TypeCheckerQueryOptions) => readonly GoPtr<Signature>[];
  readonly getPropertyOfType: (type: GoPtr<Type>, name: string, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getTypeOfPropertyOfType: (type: GoPtr<Type>, name: string, options?: TypeCheckerQueryOptions) => GoPtr<Type>;
  readonly getConstantValue: (node: GoPtr<Node>, options?: TypeCheckerQueryOptions) => unknown;
  readonly typeToString: (type: GoPtr<Type>, options?: TypeCheckerQueryOptions) => string;
  readonly getModuleSymbolFromSpecifier: (moduleSpecifier: GoPtr<Node>, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getResolvedExternalModuleSymbol: (moduleSymbol: GoPtr<Symbol>, dontResolveAlias?: boolean, options?: TypeCheckerQueryOptions) => GoPtr<Symbol>;
  readonly getExportsOfModule: (moduleSymbol: GoPtr<Symbol>, options?: TypeCheckerQueryOptions) => readonly GoPtr<Symbol>[];
  readonly getSymbolName: (symbol: GoPtr<Symbol>) => string;
  readonly getSymbolDeclarations: (symbol: GoPtr<Symbol>) => readonly GoPtr<Node>[];
  readonly getSymbolValueDeclaration: (symbol: GoPtr<Symbol>) => GoPtr<Node>;
  readonly getPrimarySymbolDeclaration: (symbol: GoPtr<Symbol>) => GoPtr<Node>;
  readonly getSymbolSourceFile: (symbol: GoPtr<Symbol>) => GoPtr<SourceFile>;
  readonly getTypeSymbol: (type: GoPtr<Type>) => GoPtr<Symbol>;
  readonly getTypeAliasSymbol: (type: GoPtr<Type>) => GoPtr<Symbol>;
  readonly getSignatureDeclaration: (signature: GoPtr<Signature>) => GoPtr<Node>;
  readonly getSignatureParameters: (signature: GoPtr<Signature>) => readonly GoPtr<Symbol>[];
  readonly getSignatureThisParameter: (signature: GoPtr<Signature>) => GoPtr<Symbol>;
}

export function createTypeCheckerQueries(program: GoPtr<Program>, defaultOptions: TypeCheckerQueryOptions = {}): TypeCheckerQueries {
  const callInfos = new WeakMap<Node, ResolvedSourceCallInfo>();
  const propertyAccessInfos = new WeakMap<Node, ResolvedSourcePropertyAccessInfo>();
  const elementAccessInfos = new WeakMap<Node, ResolvedSourceElementAccessInfo>();
  const iterationInfos = new WeakMap<Node, ResolvedSourceIterationInfo>();
  const queries: TypeCheckerQueries = {
    getTypeAtLocation: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_GetTypeAtLocation(checker, node)),
    getTypeFromTypeNode: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_GetTypeFromTypeNode(checker, node)),
    getContextualType: (node, contextFlags = ContextFlagsNone, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_getContextualType(checker, node, contextFlags)),
    getSymbolAtLocation: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_GetSymbolAtLocation(checker, node)),
    getResolvedSymbol: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => getDiagnosticFreeResolvedSymbol(checker, node)),
    getResolvedSymbolOrNil: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_getResolvedSymbolOrNil(checker, node)),
    getAliasedSymbol: (symbol, options = {}) =>
      withCheckerForSymbol(program, symbol, defaultOptions, options, (checker) => Checker_GetAliasedSymbol(checker, symbol)),
    getTypeOfSymbol: (symbol, options = {}) =>
      withCheckerForSymbol(program, symbol, defaultOptions, options, (checker) => Checker_getTypeOfSymbol(checker, symbol)),
    getWriteTypeOfSymbol: (symbol, options = {}) =>
      withCheckerForSymbol(program, symbol, defaultOptions, options, (checker) => Checker_getWriteTypeOfSymbol(checker, symbol)),
    getDeclaredTypeOfSymbol: (symbol, options = {}) =>
      withCheckerForSymbol(program, symbol, defaultOptions, options, (checker) => Checker_getDeclaredTypeOfSymbol(checker, symbol)),
    getResolvedSignature: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_getResolvedSignature(checker, node, undefined, CheckModeNormal)),
    getResolvedCallInfo: (node, options = {}) =>
      memoizeResolvedNodeQuery(callInfos, node, () =>
        withCheckerForNode(program, node, defaultOptions, options, (checker) => {
          const sourceResultType = Checker_GetTypeAtLocation(checker, node);
          return Checker_finalizeResolvedCallEvidence(checker, node, sourceResultType);
        })),
    getResolvedPropertyAccessInfo: (node, options = {}) =>
      memoizeResolvedNodeQuery(propertyAccessInfos, node, () =>
        withCheckerForNode(program, node, defaultOptions, options, (checker) =>
          Checker_getResolvedSourcePropertyAccessInfo(checker, node))),
    getResolvedElementAccessInfo: (node, options = {}) =>
      memoizeResolvedNodeQuery(elementAccessInfos, node, () =>
        withCheckerForNode(program, node, defaultOptions, options, (checker) =>
          Checker_getResolvedSourceElementAccessInfo(checker, node))),
    getResolvedIterationInfo: (node, options = {}) =>
      memoizeResolvedNodeQuery(iterationInfos, node, () =>
        withCheckerForNode(program, node, defaultOptions, options, (checker) =>
          Checker_getResolvedSourceIterationInfo(checker, node))),
    getReturnTypeOfSignature: (signature, options = {}) =>
      withCheckerForSignature(program, signature, defaultOptions, options, (checker) => Checker_GetReturnTypeOfSignature(checker, signature)),
    getCallSignaturesOfType: (type, options = {}) =>
      withCheckerForType(program, type, defaultOptions, options, (checker) => Checker_GetSignaturesOfType(checker, type, SignatureKindCall)) ?? [],
    getConstructSignaturesOfType: (type, options = {}) =>
      withCheckerForType(program, type, defaultOptions, options, (checker) => Checker_GetSignaturesOfType(checker, type, SignatureKindConstruct)) ?? [],
    getPropertyOfType: (type, name, options = {}) =>
      withCheckerForType(program, type, defaultOptions, options, (checker) => Checker_GetPropertyOfType(checker, type, name)),
    getTypeOfPropertyOfType: (type, name, options = {}) =>
      withCheckerForType(program, type, defaultOptions, options, (checker) => Checker_GetTypeOfPropertyOfType(checker, type, name)),
    getConstantValue: (node, options = {}) =>
      withCheckerForNode(program, node, defaultOptions, options, (checker) => Checker_GetConstantValue(checker, node)),
    typeToString: (type, options = {}) =>
      withCheckerForType(program, type, defaultOptions, options, (checker) => Checker_TypeToString(checker, type)) ?? "",
    getModuleSymbolFromSpecifier: (moduleSpecifier, options = {}) =>
      withCheckerForNode(program, moduleSpecifier, defaultOptions, options, (checker) => Checker_resolveExternalModuleName(checker, moduleSpecifier, moduleSpecifier, true as bool)),
    getResolvedExternalModuleSymbol: (moduleSymbol, dontResolveAlias = false, options = {}) =>
      withCheckerForSymbol(program, moduleSymbol, defaultOptions, options, (checker) => Checker_resolveExternalModuleSymbol(checker, moduleSymbol, dontResolveAlias as bool)),
    getExportsOfModule: (moduleSymbol, options = {}) =>
      withCheckerForSymbol(program, moduleSymbol, defaultOptions, options, (checker) => Checker_GetExportsOfModule(checker, moduleSymbol)) ?? [],
    getSymbolName: (symbol) => symbol?.Name ?? "",
    getSymbolDeclarations: (symbol) => symbol?.Declarations ?? [],
    getSymbolValueDeclaration: (symbol) => symbol?.ValueDeclaration,
    getPrimarySymbolDeclaration: (symbol) => getPrimarySymbolDeclaration(symbol),
    getSymbolSourceFile: (symbol) => getSymbolSourceFile(symbol),
    getTypeSymbol: (type) => type?.symbol,
    getTypeAliasSymbol: (type) => type?.alias?.symbol,
    getSignatureDeclaration: (signature) => signature?.declaration,
    getSignatureParameters: (signature) => signature?.parameters ?? [],
    getSignatureThisParameter: (signature) => signature?.thisParameter,
  };
  return Object.freeze(queries);
}

function memoizeResolvedNodeQuery<T extends object>(
  cache: WeakMap<Node, T>,
  node: GoPtr<Node>,
  query: () => GoPtr<T>,
): GoPtr<T> {
  if (node === undefined) {
    return undefined;
  }
  const cached = cache.get(node);
  if (cached !== undefined) {
    return cached;
  }
  const resolved = query();
  if (resolved !== undefined) {
    cache.set(node, resolved);
  }
  return resolved;
}

function getDiagnosticFreeResolvedSymbol(checker: GoPtr<Checker>, node: GoPtr<Node>): GoPtr<Symbol> {
  const resolved = Checker_getResolvedSymbolOrNil(checker, node);
  return resolved !== undefined && resolved !== checker?.unknownSymbol
    ? resolved
    : undefined;
}

function withCheckerForNode<T>(
  program: GoPtr<Program>,
  node: GoPtr<Node>,
  defaultOptions: TypeCheckerQueryOptions,
  options: TypeCheckerQueryOptions,
  callback: (checker: GoPtr<Checker>) => GoPtr<T>,
): GoPtr<T> {
  if (node === undefined) {
    return undefined;
  }
  return withChecker(program, options.sourceFile ?? defaultOptions.sourceFile ?? GetSourceFileOfNode(node), defaultOptions, options, callback);
}

function withCheckerForSymbol<T>(
  program: GoPtr<Program>,
  symbol: GoPtr<Symbol>,
  defaultOptions: TypeCheckerQueryOptions,
  options: TypeCheckerQueryOptions,
  callback: (checker: GoPtr<Checker>) => GoPtr<T>,
): GoPtr<T> {
  if (symbol === undefined) {
    return undefined;
  }
  return withChecker(program, options.sourceFile ?? defaultOptions.sourceFile ?? getSymbolSourceFile(symbol), defaultOptions, options, callback);
}

function withCheckerForType<T>(
  program: GoPtr<Program>,
  type: GoPtr<Type>,
  defaultOptions: TypeCheckerQueryOptions,
  options: TypeCheckerQueryOptions,
  callback: (checker: GoPtr<Checker>) => GoPtr<T>,
): GoPtr<T> {
  if (type === undefined) {
    return undefined;
  }
  if (type.checker !== undefined) {
    return callback(type.checker);
  }
  const sourceFile = options.sourceFile
    ?? defaultOptions.sourceFile
    ?? getSymbolSourceFile(type.symbol ?? type.alias?.symbol);
  return withChecker(program, sourceFile, defaultOptions, options, callback);
}

function withCheckerForSignature<T>(
  program: GoPtr<Program>,
  signature: GoPtr<Signature>,
  defaultOptions: TypeCheckerQueryOptions,
  options: TypeCheckerQueryOptions,
  callback: (checker: GoPtr<Checker>) => GoPtr<T>,
): GoPtr<T> {
  if (signature === undefined) {
    return undefined;
  }
  const ownedChecker = signature.resolvedReturnType?.checker
    ?? signature.typeParameters.find((type) => type?.checker !== undefined)?.checker;
  if (ownedChecker !== undefined) {
    return callback(ownedChecker);
  }
  const sourceFile = options.sourceFile
    ?? defaultOptions.sourceFile
    ?? GetSourceFileOfNode(signature.declaration);
  return withChecker(program, sourceFile, defaultOptions, options, callback);
}

function withChecker<T>(
  program: GoPtr<Program>,
  sourceFile: GoPtr<SourceFile>,
  defaultOptions: TypeCheckerQueryOptions,
  options: TypeCheckerQueryOptions,
  callback: (checker: GoPtr<Checker>) => GoPtr<T>,
): GoPtr<T> {
  if (program === undefined || sourceFile === undefined) {
    return undefined;
  }
  const context = options.context ?? defaultOptions.context ?? Background();
  const [checker, done] = Program_GetTypeCheckerForFile(program, context, sourceFile);
  try {
    return callback(checker);
  } finally {
    done();
  }
}

function getSymbolSourceFile(symbol: GoPtr<Symbol>): GoPtr<SourceFile> {
  const declaration = getPrimarySymbolDeclaration(symbol);
  return GetSourceFileOfNode(declaration);
}

function getPrimarySymbolDeclaration(symbol: GoPtr<Symbol>): GoPtr<Node> {
  return symbol?.ValueDeclaration ?? symbol?.Declarations?.find((candidate) => candidate !== undefined);
}
