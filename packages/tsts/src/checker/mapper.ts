/**
 * Type mapper.
 *
 * Substantive port of TS-Go `internal/checker/mapper.go` (~296 LoC).
 * Constructs and applies TypeMappers — substitutions of type parameters
 * with concrete types used by inference, instantiation, and generic
 * type construction.
 */

import type { Type, TypeMapper, TypeParameter } from "./types.js";

export type MapperKind = 0 | 1 | 2 | 3 | 4 | 5;
export const MapperKind = {
  Simple: 0 as MapperKind,
  Array: 1 as MapperKind,
  Function: 2 as MapperKind,
  Composite: 3 as MapperKind,
  Merged: 4 as MapperKind,
  Deferred: 5 as MapperKind,
} as const;

export function newSimpleMapper(source: Type, target: Type): TypeMapper {
  return { kind: MapperKind.Simple, sources: [source], targets: [target] };
}

export function newArrayMapper(sources: readonly Type[], targets: readonly Type[]): TypeMapper {
  return { kind: MapperKind.Array, sources, targets };
}

export function newFunctionMapper(fn: (t: Type) => Type): TypeMapper {
  return { kind: MapperKind.Function, map: fn };
}

export function newCompositeMapper(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
  return { kind: MapperKind.Composite, mapper1, mapper2 };
}

export function newMergedMapper(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
  return { kind: MapperKind.Merged, mapper1, mapper2 };
}

export function newDeferredMapper(source: Type, target: () => Type): TypeMapper {
  return {
    kind: MapperKind.Deferred,
    sources: [source],
    map: (t) => (t === source ? target() : t),
  };
}

export function getMappedType(t: Type, mapper: TypeMapper | undefined): Type {
  if (mapper === undefined) return t;
  switch (mapper.kind) {
    case MapperKind.Simple:
      if (mapper.sources![0] === t) return mapper.targets![0]!;
      return t;
    case MapperKind.Array:
      for (let i = 0; i < (mapper.sources?.length ?? 0); i += 1) {
        if (mapper.sources![i] === t) return mapper.targets![i]!;
      }
      return t;
    case MapperKind.Function:
      return mapper.map!(t);
    case MapperKind.Composite:
      return getMappedType(getMappedType(t, mapper.mapper1), mapper.mapper2);
    case MapperKind.Merged: {
      const mapped = getMappedType(t, mapper.mapper1);
      return mapped === t ? getMappedType(t, mapper.mapper2) : mapped;
    }
    case MapperKind.Deferred:
      return mapper.map!(t);
    default:
      return t;
  }
}

export function combineTypeMappers(
  mapper1: TypeMapper | undefined, mapper2: TypeMapper | undefined,
): TypeMapper | undefined {
  if (mapper1 === undefined) return mapper2;
  if (mapper2 === undefined) return mapper1;
  return newCompositeMapper(mapper1, mapper2);
}

export function mergeTypeMappers(
  mapper1: TypeMapper | undefined, mapper2: TypeMapper | undefined,
): TypeMapper | undefined {
  if (mapper1 === undefined) return mapper2;
  if (mapper2 === undefined) return mapper1;
  return newMergedMapper(mapper1, mapper2);
}

export function prependTypeMapping(
  source: Type, target: Type, mapper: TypeMapper | undefined,
): TypeMapper {
  return combineTypeMappers(newSimpleMapper(source, target), mapper)!;
}

export function appendTypeMapping(
  mapper: TypeMapper | undefined, source: Type, target: Type,
): TypeMapper {
  return combineTypeMappers(mapper, newSimpleMapper(source, target))!;
}

export function makeArrayTypeMapper(
  sources: readonly TypeParameter[], targets: readonly Type[],
): TypeMapper {
  return newArrayMapper(sources as unknown as readonly Type[], targets);
}

export function makeFunctionTypeMapper(fn: (t: Type) => Type): TypeMapper {
  return newFunctionMapper(fn);
}
