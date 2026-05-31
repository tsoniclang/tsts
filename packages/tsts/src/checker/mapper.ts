/**
 * Type mapper.
 *
 * Substantive port of TS-Go `internal/checker/mapper.go` (~296 LoC).
 * Constructs and applies TypeMappers — substitutions of type parameters
 * with concrete types used by inference, instantiation, and generic
 * type construction.
 */

import type { Type, TypeMapper, TypeParameter } from "./types.js";

export type MapperKind = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface MapperKindTable {
  readonly Unknown: MapperKind;
  readonly Simple: MapperKind;
  readonly Array: MapperKind;
  readonly Merged: MapperKind;
  readonly ArrayToSingle: MapperKind;
  readonly Deferred: MapperKind;
  readonly Function: MapperKind;
}
export const MapperKind: MapperKindTable = {
  Unknown: 0 as MapperKind,
  Simple: 1 as MapperKind,
  Array: 2 as MapperKind,
  Merged: 3 as MapperKind,
  ArrayToSingle: 4 as MapperKind,
  Deferred: 5 as MapperKind,
  Function: 6 as MapperKind,
} as const;

export function newTypeMapper(sources: readonly Type[], targets: readonly Type[]): TypeMapper {
  if (sources.length !== targets.length) {
    throw new Error("Type mapper source/target arity mismatch");
  }
  if (sources.length === 1) return newSimpleMapper(sources[0]!, targets[0]!);
  return newArrayMapper(sources, targets);
}

export function newSimpleMapper(source: Type, target: Type): TypeMapper {
  return { kind: MapperKind.Simple, sources: [source], targets: [target] };
}

export function newSimpleTypeMapper(source: Type, target: Type): TypeMapper {
  return newSimpleMapper(source, target);
}

export function newArrayMapper(sources: readonly Type[], targets: readonly Type[]): TypeMapper {
  if (sources.length !== targets.length) {
    throw new Error("Type mapper source/target arity mismatch");
  }
  return { kind: MapperKind.Array, sources, targets };
}

export function newArrayTypeMapper(sources: readonly Type[], targets: readonly Type[]): TypeMapper {
  return newArrayMapper(sources, targets);
}

export function newArrayToSingleMapper(sources: readonly Type[], target: Type): TypeMapper {
  return { kind: MapperKind.ArrayToSingle, sources, targets: [target] };
}

export function newArrayToSingleTypeMapper(sources: readonly Type[], target: Type): TypeMapper {
  return newArrayToSingleMapper(sources, target);
}

export function newFunctionMapper(fn: (t: Type) => Type): TypeMapper {
  return { kind: MapperKind.Function, map: fn };
}

export function newFunctionTypeMapper(fn: (t: Type) => Type): TypeMapper {
  return newFunctionMapper(fn);
}

export function newCompositeMapper(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
  return newCompositeTypeMapper(mapper1, mapper2);
}

export function newCompositeTypeMapper(
  mapper1: TypeMapper,
  mapper2: TypeMapper,
  instantiateType: (type: Type, mapper: TypeMapper) => Type = getMappedType,
): TypeMapper {
  return {
    kind: MapperKind.Merged,
    mapper1,
    mapper2,
    map: (type) => {
      const mapped = getMappedType(type, mapper1);
      return mapped === type ? getMappedType(type, mapper2) : instantiateType(mapped, mapper2);
    },
  };
}

export function newMergedMapper(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
  return { kind: MapperKind.Merged, mapper1, mapper2 };
}

export function newMergedTypeMapper(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
  return newMergedMapper(mapper1, mapper2);
}

export function newDeferredMapper(source: Type, target: () => Type): TypeMapper {
  return newDeferredArrayMapper([source], [target]);
}

export function newDeferredTypeMapper(sources: readonly Type[], targets: readonly (() => Type)[]): TypeMapper {
  return newDeferredArrayMapper(sources, targets);
}

export function newDeferredArrayMapper(sources: readonly Type[], targets: readonly (() => Type)[]): TypeMapper {
  if (sources.length !== targets.length) {
    throw new Error("Deferred type mapper source/target arity mismatch");
  }
  return {
    kind: MapperKind.Deferred,
    sources,
    map: (t) => {
      for (let i = 0; i < sources.length; i += 1) {
        if (t === sources[i]) return targets[i]!();
      }
      return t;
    },
  };
}

export function newBackreferenceMapper(
  inferences: readonly { typeParameter: Type }[],
  index: number,
  unknownType: Type,
): TypeMapper {
  return newArrayToSingleMapper(inferences.slice(index).map((inference) => inference.typeParameter), unknownType);
}

export function getMappedType(t: Type, mapper: TypeMapper | undefined): Type {
  if (mapper === undefined) return t;
  switch (mapper.kind) {
    case MapperKind.Unknown:
      return t;
    case MapperKind.Simple:
      if (mapper.sources![0] === t) return mapper.targets![0]!;
      return t;
    case MapperKind.Array:
      for (let i = 0; i < (mapper.sources?.length ?? 0); i += 1) {
        if (mapper.sources![i] === t) return mapper.targets![i]!;
      }
      return t;
    case MapperKind.ArrayToSingle:
      for (const source of mapper.sources ?? []) {
        if (source === t) return mapper.targets![0]!;
      }
      return t;
    case MapperKind.Function:
      return mapper.map!(t);
    case MapperKind.Merged: {
      if (mapper.map !== undefined) return mapper.map(t);
      return getMappedType(getMappedType(t, mapper.mapper1), mapper.mapper2);
    }
    case MapperKind.Deferred:
      return mapper.map!(t);
    default:
      return t;
  }
}

export function mapType(mapper: TypeMapper | undefined, type: Type): Type {
  return getMappedType(type, mapper);
}

export function kindOfTypeMapper(mapper: TypeMapper | undefined): MapperKind {
  return (mapper?.kind ?? MapperKind.Unknown) as MapperKind;
}

export interface InferenceTypeMapperContext {
  readonly inferences: readonly { readonly typeParameter: Type; isFixed?: boolean }[];
  readonly getInferredType: (index: number) => Type;
  readonly inferFromIntraExpressionSites?: () => void;
  readonly clearCachedInferences?: () => void;
}

export function newInferenceTypeMapper(context: InferenceTypeMapperContext, fixing: boolean): TypeMapper {
  return newFunctionTypeMapper((type) => {
    for (let index = 0; index < context.inferences.length; index += 1) {
      const inference = context.inferences[index]!;
      if (type !== inference.typeParameter) continue;
      if (fixing && inference.isFixed !== true) {
        context.inferFromIntraExpressionSites?.();
        context.clearCachedInferences?.();
        inference.isFixed = true;
      }
      return context.getInferredType(index);
    }
    return type;
  });
}

export function combineTypeMappers(
  mapper1: TypeMapper | undefined, mapper2: TypeMapper | undefined,
): TypeMapper | undefined {
  if (mapper1 === undefined) return mapper2;
  if (mapper2 === undefined) return mapper1;
  return newMergedMapper(mapper1, mapper2);
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
