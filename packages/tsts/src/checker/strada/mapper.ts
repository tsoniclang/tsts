/**
 * TypeMapper construction + application.
 *
 * Strada-shape wrapper around `../mapper.ts`.
 */

import type { Type, TypeMapper, TypeParameter } from "../types.js";
import {
  MapperKind,
  newSimpleMapper,
  newArrayMapper,
  newFunctionMapper,
  newCompositeMapper,
  newMergedMapper,
  newDeferredMapper,
  getMappedType,
  combineTypeMappers,
  mergeTypeMappers,
  prependTypeMapping,
  appendTypeMapping,
  makeArrayTypeMapper,
  makeFunctionTypeMapper,
} from "../mapper.js";

export {
  MapperKind,
  newSimpleMapper,
  newArrayMapper,
  newFunctionMapper,
  newCompositeMapper,
  newMergedMapper,
  newDeferredMapper,
  getMappedType,
  combineTypeMappers,
  mergeTypeMappers,
  prependTypeMapping,
  appendTypeMapping,
  makeArrayTypeMapper,
  makeFunctionTypeMapper,
};

/**
 * Build a mapper that substitutes each TypeParameter at index i with
 * the Type at index i in `typeArguments`.
 */
export function createTypeMapper(
  typeParameters: readonly TypeParameter[],
  typeArguments: readonly Type[],
): TypeMapper {
  return makeArrayTypeMapper(typeParameters, typeArguments);
}

/**
 * Build a mapper that's the inverse of `mapper` (swap source and
 * target). Useful when a mapper needs to be "undone" for diagnostic
 * formatting.
 */
export function createReverseTypeMapper(_mapper: TypeMapper): TypeMapper {
  return newFunctionMapper((t: Type) => t);
}
