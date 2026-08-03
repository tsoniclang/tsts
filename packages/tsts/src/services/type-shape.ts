import type { GoPtr } from "../go/compat.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { SymbolName } from "../internal/ast/symbol.js";
import { SymbolFlagsOptional } from "../internal/ast/symbolflags.js";
import type { Program } from "../internal/compiler/program.js";
import { Program_GetTypeCheckerForFile } from "../internal/compiler/program.js";
import type { Context } from "../go/context.js";
import { Background } from "../go/context.js";
import {
  Checker_GetApparentType,
  Checker_GetIndexInfosOfType,
  Checker_GetPropertiesOfType,
  Checker_GetReturnTypeOfSignature,
  Checker_GetSignaturesOfType,
  Checker_GetTypeArguments,
  Checker_GetTypeFromTypeNode,
  Checker_GetTypeOfPropertyOfType,
  Checker_GetWidenedType,
  Checker_IsArrayLikeType,
  Checker_RemoveMissingOrUndefinedType,
  IsTupleType,
} from "../internal/checker/exports.js";
import { Checker_isReadonlySymbol } from "../internal/checker/checker/symbols.js";
import { Checker_GetConstantValue } from "../internal/checker/services.js";
import { Checker_TypeToString } from "../internal/checker/printer.js";
import type { Checker } from "../internal/checker/checker/state.js";
import {
  ObjectFlagsReference,
  SignatureKindCall,
  SignatureKindConstruct,
  TypeFlagsAny,
  TypeFlagsBigIntLike,
  TypeFlagsBooleanLike,
  TypeFlagsIntersection,
  TypeFlagsNever,
  TypeFlagsNull,
  TypeFlagsNumberLike,
  TypeFlagsStringLike,
  TypeFlagsUnion,
  TypeFlagsUnknown,
  TypeFlagsVoidLike,
  TypeFlagsUndefined,
  TypeFlagsVoid,
  Type_Target,
  Type_Types,
} from "../internal/checker/types.js";
import type { Signature, Type } from "../internal/checker/types.js";

export interface TypeIndexInfo {
  readonly keyType: GoPtr<Type>;
  readonly valueType: GoPtr<Type>;
  readonly readonly: boolean;
  readonly declaration: GoPtr<Node>;
  readonly symbol: GoPtr<Symbol>;
  readonly components: readonly GoPtr<Node>[];
}

export interface TypePropertyInfo {
  readonly symbol: Symbol;
  readonly name: string;
  readonly type: Type;
  readonly optional: boolean;
  readonly readonly: boolean;
}

export interface CreateTypeShapeQueriesOptions {
  readonly sourceFile: GoPtr<SourceFile>;
  readonly context?: Context;
}

export interface TypeShapeQueries {
  readonly typeToString: (type: GoPtr<Type>) => string;
  readonly getTypeFromTypeNode: (node: GoPtr<Node>) => GoPtr<Type>;
  readonly getConstantValue: (node: GoPtr<Node>) => unknown;
  readonly isAny: (type: GoPtr<Type>) => boolean;
  readonly isUnknown: (type: GoPtr<Type>) => boolean;
  readonly isNever: (type: GoPtr<Type>) => boolean;
  readonly isVoidLike: (type: GoPtr<Type>) => boolean;
  readonly isNullish: (type: GoPtr<Type>) => boolean;
  readonly isStringLike: (type: GoPtr<Type>) => boolean;
  readonly isNumberLike: (type: GoPtr<Type>) => boolean;
  readonly isBooleanLike: (type: GoPtr<Type>) => boolean;
  readonly isBigIntLike: (type: GoPtr<Type>) => boolean;
  readonly isUnion: (type: GoPtr<Type>) => boolean;
  readonly isIntersection: (type: GoPtr<Type>) => boolean;
  readonly isTypeReference: (type: GoPtr<Type>) => boolean;
  readonly isTuple: (type: GoPtr<Type>) => boolean;
  readonly isArrayLike: (type: GoPtr<Type>) => boolean;
  readonly couldContainTypeVariables: (type: GoPtr<Type>) => boolean;
  readonly getUnionOrIntersectionTypes: (type: GoPtr<Type>) => readonly GoPtr<Type>[];
  readonly getTypeReferenceTarget: (type: GoPtr<Type>) => GoPtr<Type>;
  readonly getTypeArguments: (type: GoPtr<Type>) => readonly GoPtr<Type>[];
  readonly getTupleElementTypes: (type: GoPtr<Type>) => readonly GoPtr<Type>[];
  readonly getPropertyInfos: (type: GoPtr<Type>) => readonly TypePropertyInfo[];
  readonly getCallSignatures: (type: GoPtr<Type>) => readonly GoPtr<Signature>[];
  readonly getConstructSignatures: (type: GoPtr<Type>) => readonly GoPtr<Signature>[];
  readonly getReturnTypeOfSignature: (signature: GoPtr<Signature>) => GoPtr<Type>;
  readonly getIndexInfos: (type: GoPtr<Type>) => readonly TypeIndexInfo[];
  readonly getApparentType: (type: GoPtr<Type>) => GoPtr<Type>;
  readonly getWidenedType: (type: GoPtr<Type>) => GoPtr<Type>;
  readonly removeMissingOrUndefined: (type: GoPtr<Type>) => GoPtr<Type>;
}

export function createTypeShapeQueries(program: GoPtr<Program>, defaultOptions: CreateTypeShapeQueriesOptions): TypeShapeQueries {
  if (program === undefined || defaultOptions.sourceFile === undefined) {
    throw new Error("Type-shape queries require one source file from the compiler program.");
  }
  const queries: TypeShapeQueries = {
    typeToString: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_TypeToString(checker, type)) ?? "",
    getTypeFromTypeNode: (node) => withCheckerForNode(program, node, defaultOptions, (checker) => Checker_GetTypeFromTypeNode(checker, node)),
    getConstantValue: (node) => withCheckerForNode(program, node, defaultOptions, (checker) => Checker_GetConstantValue(checker, node)),
    isAny: (type) => hasFlags(type, TypeFlagsAny),
    isUnknown: (type) => hasFlags(type, TypeFlagsUnknown),
    isNever: (type) => hasFlags(type, TypeFlagsNever),
    isVoidLike: (type) => hasFlags(type, TypeFlagsVoidLike) || hasFlags(type, TypeFlagsVoid),
    isNullish: (type) => hasFlags(type, TypeFlagsNull) || hasFlags(type, TypeFlagsUndefined),
    isStringLike: (type) => hasFlags(type, TypeFlagsStringLike),
    isNumberLike: (type) => hasFlags(type, TypeFlagsNumberLike),
    isBooleanLike: (type) => hasFlags(type, TypeFlagsBooleanLike),
    isBigIntLike: (type) => hasFlags(type, TypeFlagsBigIntLike),
    isUnion: (type) => hasFlags(type, TypeFlagsUnion),
    isIntersection: (type) => hasFlags(type, TypeFlagsIntersection),
    isTypeReference: (type) => type !== undefined && (type.objectFlags & ObjectFlagsReference) !== 0,
    isTuple: isTupleType,
    isArrayLike: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_IsArrayLikeType(checker, type)) === true,
    couldContainTypeVariables: (type) => withCheckerForType(
      program,
      type,
      defaultOptions,
      (checker) => {
        if (checker === undefined) {
          throw new Error("The source type has no owning checker for genericity analysis.");
        }
        return checker.couldContainTypeVariables(type);
      },
    ) === true,
    getUnionOrIntersectionTypes: (type) => Type_Types(type) ?? [],
    getTypeReferenceTarget: (type) => Type_Target(type),
    getTypeArguments: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_GetTypeArguments(checker, type)) ?? [],
    getTupleElementTypes: (type) => withCheckerForType(program, type, defaultOptions, (checker) => {
      if (!isTupleType(type)) {
        return [];
      }
      return Checker_GetTypeArguments(checker, type);
    }) ?? [],
    getPropertyInfos: (type) => withCheckerForType(
      program,
      type,
      defaultOptions,
      (checker) => getTypePropertyInfos(checker, type),
    ) ?? [],
    getCallSignatures: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_GetSignaturesOfType(checker, type, SignatureKindCall)) ?? [],
    getConstructSignatures: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_GetSignaturesOfType(checker, type, SignatureKindConstruct)) ?? [],
    getReturnTypeOfSignature: (signature) => withCheckerForSignature(program, signature, defaultOptions, (checker) => Checker_GetReturnTypeOfSignature(checker, signature)),
    getIndexInfos: (type) => withCheckerForType(program, type, defaultOptions, (checker) =>
      (Checker_GetIndexInfosOfType(checker, type) ?? []).map((info) => ({
        keyType: info?.keyType,
        valueType: info?.valueType,
        readonly: info?.isReadonly === true,
        declaration: info?.declaration,
        symbol: info?.indexSymbol,
        components: info?.components ?? [],
      } satisfies TypeIndexInfo))) ?? [],
    getApparentType: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_GetApparentType(checker, type)),
    getWidenedType: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_GetWidenedType(checker, type)),
    removeMissingOrUndefined: (type) => withCheckerForType(program, type, defaultOptions, (checker) => Checker_RemoveMissingOrUndefinedType(checker, type)),
  };
  return Object.freeze(queries);
}

function hasFlags(type: GoPtr<Type>, flags: number): boolean {
  return type !== undefined && (type.flags & flags) !== 0;
}

function getTypePropertyInfos(
  checker: GoPtr<Checker>,
  type: GoPtr<Type>,
): readonly TypePropertyInfo[] {
  if (checker === undefined) {
    throw new Error("The source type has no owning checker for property analysis.");
  }
  const properties = Checker_GetPropertiesOfType(checker, type) ?? [];
  return properties.map((symbol) => {
    if (symbol === undefined) {
      throw new Error("The checker returned an absent property symbol for a source type.");
    }
    const name = SymbolName(symbol);
    const propertyType = Checker_GetTypeOfPropertyOfType(
      checker,
      type,
      symbol.Name,
    );
    if (propertyType === undefined) {
      throw new Error(
        `The checker returned property '${name}' without its effective source type.`,
      );
    }
    return {
      symbol,
      name,
      type: propertyType,
      optional: (symbol.Flags & SymbolFlagsOptional) !== 0,
      readonly: Checker_isReadonlySymbol(checker, symbol) === true,
    } satisfies TypePropertyInfo;
  });
}

function isTupleType(type: GoPtr<Type>): boolean {
  return type !== undefined && IsTupleType(type);
}

function withCheckerForNode<T>(
  program: GoPtr<Program>,
  node: GoPtr<Node>,
  defaultOptions: CreateTypeShapeQueriesOptions,
  callback: (checker: GoPtr<Checker>) => T,
): T | undefined {
  if (node === undefined) {
    return undefined;
  }
  return withCheckerForSourceFile(
    program,
    defaultOptions.sourceFile,
    defaultOptions,
    callback,
  );
}

function withCheckerForType<T>(
  program: GoPtr<Program>,
  type: GoPtr<Type>,
  defaultOptions: CreateTypeShapeQueriesOptions,
  callback: (checker: GoPtr<Checker>) => T,
): T | undefined {
  if (program === undefined || type === undefined) {
    return undefined;
  }
  if (type.checker !== undefined) {
    return callback(type.checker);
  }
  return withCheckerForSourceFile(
    program,
    defaultOptions.sourceFile,
    defaultOptions,
    callback,
  );
}

function withCheckerForSignature<T>(
  program: GoPtr<Program>,
  signature: GoPtr<Signature>,
  defaultOptions: CreateTypeShapeQueriesOptions,
  callback: (checker: GoPtr<Checker>) => T,
): T | undefined {
  if (program === undefined || signature === undefined) {
    return undefined;
  }
  return withCheckerForSourceFile(
    program,
    defaultOptions.sourceFile,
    defaultOptions,
    callback,
  );
}

function withCheckerForSourceFile<T>(
  program: GoPtr<Program>,
  sourceFile: GoPtr<SourceFile>,
  defaultOptions: CreateTypeShapeQueriesOptions,
  callback: (checker: GoPtr<Checker>) => T,
): T | undefined {
  if (sourceFile === undefined) {
    return undefined;
  }
  const [checker, done] = Program_GetTypeCheckerForFile(
    program,
    defaultOptions.context ?? Background(),
    sourceFile,
  );
  try {
    return callback(checker);
  } finally {
    done();
  }
}
