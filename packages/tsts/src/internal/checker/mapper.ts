import type { bool, int } from "../../go/scalars.js";
import type { GoInterfaceValue, GoPtr, GoSlice } from "../../go/compat.js";
import * as core from "../core/core.js";
import type { Checker, InferenceContext, InferenceInfo } from "./checker/state.js";
import { Checker_instantiateType } from "./checker/types.js";
import {
  Checker_getInferredType,
  Checker_inferFromIntraExpressionSites,
  clearCachedInferences,
} from "./inference.js";
import type { Type } from "./types.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::TypeMapperKind","kind":"type","status":"implemented","sigHash":"93afd4209ed7acb0c7063285beb2cccdf1426ddedee7dce25c71f2770bdc60d2"}
 *
 * Go source:
 * TypeMapperKind int32
 */
export type TypeMapperKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::constGroup::TypeMapperKindUnknown+TypeMapperKindSimple+TypeMapperKindArray+TypeMapperKindMerged","kind":"constGroup","status":"implemented","sigHash":"b34374646f8ac24f87aa82fa231b9ce44b5b209e42251c803a88b80557274ace"}
 *
 * Go source:
 * const (
 * 	TypeMapperKindUnknown TypeMapperKind = iota
 * 	TypeMapperKindSimple
 * 	TypeMapperKindArray
 * 	TypeMapperKindMerged
 * )
 */
export const TypeMapperKindUnknown: TypeMapperKind = 0;
export const TypeMapperKindSimple: TypeMapperKind = 1;
export const TypeMapperKindArray: TypeMapperKind = 2;
export const TypeMapperKindMerged: TypeMapperKind = 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::TypeMapper","kind":"type","status":"implemented","sigHash":"a162d490ad1296cf69f3884f0983d506dfb2e0c4dd1285dedba923a237eaea19"}
 *
 * Go source:
 * TypeMapper struct {
 * 	data TypeMapperData
 * }
 */
export interface TypeMapper {
  data: GoInterface<TypeMapperData>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::TypeMapper.Map","kind":"method","status":"implemented","sigHash":"34cca19ca052c632261295859a6d2716864ada40fcbe544c95a25ac771f7a601"}
 *
 * Go source:
 * func (m *TypeMapper) Map(t *Type) *Type    { return m.data.Map(t) }
 */
export function TypeMapper_Map(receiver: GoPtr<TypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  return receiver!.data!.Map(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::TypeMapper.Kind","kind":"method","status":"implemented","sigHash":"3661f0425c581c3ccb03e97ede91641da8ee4d3384ba6c6b1a5b6392fffaeb29"}
 *
 * Go source:
 * func (m *TypeMapper) Kind() TypeMapperKind { return m.data.Kind() }
 */
export function TypeMapper_Kind(receiver: GoPtr<TypeMapper>): TypeMapperKind {
  return receiver!.data!.Kind();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::TypeMapperData","kind":"type","status":"implemented","sigHash":"2eca3e0d6789f5d4a9e42697fc145fec92c7347398a63786f4f7524e6304158a"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The interface receiver carrier adds the static Go receiver operation required to preserve dynamic mapper dispatch without a side table or wrapper object.","goSignatureHash":"45284edb6f62742a1ed49c2c3a89e8acf9c04d31a593b2176200915230705598","tsSignatureHash":"eb00a8c7d277bb724833cdde86b19bd44cfbdc28004f4d006f9b3ad26a272910"}
 *
 * Go source:
 * TypeMapperData interface {
 * 	Map(t *Type) *Type
 * 	Kind() TypeMapperKind
 * }
 */
export interface TypeMapperData extends GoInterfaceValue<unknown> {
  Map(t: GoPtr<Type>): GoPtr<Type>;
  Kind(): TypeMapperKind;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newTypeMapper","kind":"func","status":"implemented","sigHash":"ab1a8786574e9e2a6efb1736947d0240a0af389d42f74134c0537744f2652f78"}
 *
 * Go source:
 * func newTypeMapper(sources []*Type, targets []*Type) *TypeMapper {
 * 	if len(sources) == 1 {
 * 		return newSimpleTypeMapper(sources[0], targets[0])
 * 	}
 * 	return newArrayTypeMapper(sources, targets)
 * }
 */
export function newTypeMapper(sources: GoSlice<GoPtr<Type>>, targets: GoSlice<GoPtr<Type>>): GoPtr<TypeMapper> {
  if (sources.length === 1) {
    return newSimpleTypeMapper(sources[0], targets[0]);
  }
  return newArrayTypeMapper(sources, targets);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::Checker.combineTypeMappers","kind":"method","status":"implemented","sigHash":"c7e608de12817475822ba53d18d84f2cc23df1d0f2d81739421f324f904011dc"}
 *
 * Go source:
 * func (c *Checker) combineTypeMappers(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
 * 	if m1 != nil {
 * 		return newCompositeTypeMapper(c, m1, m2)
 * 	}
 * 	return m2
 * }
 */
export function Checker_combineTypeMappers(receiver: GoPtr<Checker>, m1: GoPtr<TypeMapper>, m2: GoPtr<TypeMapper>): GoPtr<TypeMapper> {
  if (m1 !== undefined) {
    return newCompositeTypeMapper(receiver, m1, m2);
  }
  return m2;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::mergeTypeMappers","kind":"func","status":"implemented","sigHash":"905a90bf89cf85e1ea06f1167c43b3e08d08b0e0b1586b0a1a7bad0c3dc384b5"}
 *
 * Go source:
 * func mergeTypeMappers(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
 * 	if m1 != nil {
 * 		return newMergedTypeMapper(m1, m2)
 * 	}
 * 	return m2
 * }
 */
export function mergeTypeMappers(m1: GoPtr<TypeMapper>, m2: GoPtr<TypeMapper>): GoPtr<TypeMapper> {
  if (m1 !== undefined) {
    return newMergedTypeMapper(m1, m2);
  }
  return m2;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::prependTypeMapping","kind":"func","status":"implemented","sigHash":"bce954401dba4cc7b6aef254122b30ce8003b109b5ad5364d4e39ad42f3e1c83"}
 *
 * Go source:
 * func prependTypeMapping(source *Type, target *Type, mapper *TypeMapper) *TypeMapper {
 * 	if mapper == nil {
 * 		return newSimpleTypeMapper(source, target)
 * 	}
 * 	return newMergedTypeMapper(newSimpleTypeMapper(source, target), mapper)
 * }
 */
export function prependTypeMapping(source: GoPtr<Type>, target: GoPtr<Type>, mapper: GoPtr<TypeMapper>): GoPtr<TypeMapper> {
  if (mapper === undefined) {
    return newSimpleTypeMapper(source, target);
  }
  return newMergedTypeMapper(newSimpleTypeMapper(source, target), mapper);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::appendTypeMapping","kind":"func","status":"implemented","sigHash":"87a138718099aae17e7a30634edbbb7d5da5918fd4732a87e0188a9c3d9f37c5"}
 *
 * Go source:
 * func appendTypeMapping(mapper *TypeMapper, source *Type, target *Type) *TypeMapper {
 * 	if mapper == nil {
 * 		return newSimpleTypeMapper(source, target)
 * 	}
 * 	return newMergedTypeMapper(mapper, newSimpleTypeMapper(source, target))
 * }
 */
export function appendTypeMapping(mapper: GoPtr<TypeMapper>, source: GoPtr<Type>, target: GoPtr<Type>): GoPtr<TypeMapper> {
  if (mapper === undefined) {
    return newSimpleTypeMapper(source, target);
  }
  return newMergedTypeMapper(mapper, newSimpleTypeMapper(source, target));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::Checker.newBackreferenceMapper","kind":"method","status":"implemented","sigHash":"33b62ae1202b70200875cb169293ab0529294c6822ec2847ab227c369055f93e"}
 *
 * Go source:
 * func (c *Checker) newBackreferenceMapper(context *InferenceContext, index int) *TypeMapper {
 * 	forwardInferences := context.inferences[index:]
 * 	typeParameters := core.Map(forwardInferences, func(i *InferenceInfo) *Type {
 * 		return i.typeParameter
 * 	})
 * 	return newArrayToSingleTypeMapper(typeParameters, c.unknownType)
 * }
 */
export function Checker_newBackreferenceMapper(receiver: GoPtr<Checker>, context: GoPtr<InferenceContext>, index: int): GoPtr<TypeMapper> {
  const forwardInferences = context!.inferences.slice(index);
  const typeParameters = core.Map(forwardInferences, (i: GoPtr<InferenceInfo>): GoPtr<Type> => {
    return i!.typeParameter;
  });
  return newArrayToSingleTypeMapper(typeParameters, receiver!.unknownType);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::TypeMapperBase","kind":"type","status":"implemented","sigHash":"204d6d2ba55d9a30cd266f2af45f123ab91a66d75868ae2df1d5294673b9c323"}
 *
 * Go source:
 * TypeMapperBase struct {
 * 	TypeMapper
 * }
 */
export interface TypeMapperBase {
  __tsgoEmbedded0: TypeMapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::TypeMapperBase.Map","kind":"method","status":"implemented","sigHash":"97eb9b7781290c28a86b7ebc1931cb8b1f13a84e79a9e51967728cf03caafc9b"}
 *
 * Go source:
 * func (m *TypeMapperBase) Map(t *Type) *Type    { return t }
 */
export function TypeMapperBase_Map(receiver: GoPtr<TypeMapperBase>, t: GoPtr<Type>): GoPtr<Type> {
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::TypeMapperBase.Kind","kind":"method","status":"implemented","sigHash":"d07ef427c8f62e3c919c0ee019deb6d96ef181c0069f0cbf1b42bb7d14781746"}
 *
 * Go source:
 * func (m *TypeMapperBase) Kind() TypeMapperKind { return TypeMapperKindUnknown }
 */
export function TypeMapperBase_Kind(receiver: GoPtr<TypeMapperBase>): TypeMapperKind {
  return TypeMapperKindUnknown;
}

class EmbeddedTypeMapper implements TypeMapper {
  data!: TypeMapperData;
}

function newEmbeddedTypeMapper(): [TypeMapperBase, TypeMapper] {
  const mapper = new EmbeddedTypeMapper();
  return [{ __tsgoEmbedded0: mapper }, mapper];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::SimpleTypeMapper","kind":"type","status":"implemented","sigHash":"85cfca898955cc7df26c9dadd16046fe02020f4903f1fca381cf5edfd4f6a23d"}
 *
 * Go source:
 * SimpleTypeMapper struct {
 * 	TypeMapperBase
 * 	source *Type
 * 	target *Type
 * }
 */
export interface SimpleTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  source: GoPtr<Type>;
  target: GoPtr<Type>;
}

class SimpleTypeMapperValue implements SimpleTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public source: GoPtr<Type>,
    public target: GoPtr<Type>,
  ) {}

  __tsgoGoReceiver(): GoPtr<SimpleTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return SimpleTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return SimpleTypeMapper_Kind(this);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newSimpleTypeMapper","kind":"func","status":"implemented","sigHash":"39a7a236196fa727dcebaed1f01dd5d908540788294fe84b67ca9cf127d94688"}
 *
 * Go source:
 * func newSimpleTypeMapper(source *Type, target *Type) *TypeMapper {
 * 	m := &SimpleTypeMapper{}
 * 	m.data = m
 * 	m.source = source
 * 	m.target = target
 * 	return &m.TypeMapper
 * }
 */
export function newSimpleTypeMapper(source: GoPtr<Type>, target: GoPtr<Type>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new SimpleTypeMapperValue(base, source, target);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::SimpleTypeMapper.Map","kind":"method","status":"implemented","sigHash":"c2d59c1f389a784ce8086b3ebef20f0dd6d13dbfeb37382d538fe460e2189bf0"}
 *
 * Go source:
 * func (m *SimpleTypeMapper) Map(t *Type) *Type {
 * 	if t == m.source {
 * 		return m.target
 * 	}
 * 	return t
 * }
 */
export function SimpleTypeMapper_Map(receiver: GoPtr<SimpleTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  if (t === receiver!.source) {
    return receiver!.target;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::SimpleTypeMapper.Kind","kind":"method","status":"implemented","sigHash":"028f84fe60ac5e57e29264a2a5db1360f3b23881c8d48a17a4dbe743eaa9dbd6"}
 *
 * Go source:
 * func (m *SimpleTypeMapper) Kind() TypeMapperKind {
 * 	return TypeMapperKindSimple
 * }
 */
export function SimpleTypeMapper_Kind(receiver: GoPtr<SimpleTypeMapper>): TypeMapperKind {
  return TypeMapperKindSimple;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::ArrayTypeMapper","kind":"type","status":"implemented","sigHash":"79137dedbeca1f796334d3023832b77509bb8c1ee65835e69c3f4b4d72c6616e"}
 *
 * Go source:
 * ArrayTypeMapper struct {
 * 	TypeMapperBase
 * 	sources []*Type
 * 	targets []*Type
 * }
 */
export interface ArrayTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  sources: GoSlice<GoPtr<Type>>;
  targets: GoSlice<GoPtr<Type>>;
}

class ArrayTypeMapperValue implements ArrayTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public sources: GoSlice<GoPtr<Type>>,
    public targets: GoSlice<GoPtr<Type>>,
  ) {}

  __tsgoGoReceiver(): GoPtr<ArrayTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return ArrayTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return ArrayTypeMapper_Kind(this);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newArrayTypeMapper","kind":"func","status":"implemented","sigHash":"5af187ba0d403d01152b1047b41c77e2bfbe4d9f1b6b5ff47dd0f16e3df7a9c5"}
 *
 * Go source:
 * func newArrayTypeMapper(sources []*Type, targets []*Type) *TypeMapper {
 * 	m := &ArrayTypeMapper{}
 * 	m.data = m
 * 	m.sources = sources
 * 	m.targets = targets
 * 	return &m.TypeMapper
 * }
 */
export function newArrayTypeMapper(sources: GoSlice<GoPtr<Type>>, targets: GoSlice<GoPtr<Type>>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new ArrayTypeMapperValue(base, sources, targets);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::ArrayTypeMapper.Map","kind":"method","status":"implemented","sigHash":"1907b42a4ad2c1aeb2037fa99dae183552f345dc4bdd8001a9fe974fcb5c3ca1"}
 *
 * Go source:
 * func (m *ArrayTypeMapper) Map(t *Type) *Type {
 * 	for i, s := range m.sources {
 * 		if t == s {
 * 			return m.targets[i]
 * 		}
 * 	}
 * 	return t
 * }
 */
export function ArrayTypeMapper_Map(receiver: GoPtr<ArrayTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  for (let i = 0; i < receiver!.sources.length; i++) {
    const s = receiver!.sources[i];
    if (t === s) {
      return receiver!.targets[i];
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::ArrayTypeMapper.Kind","kind":"method","status":"implemented","sigHash":"5fd27e4f543c4ee5938b7ab83a76039767614c175d6f940635badc9c30ffe139"}
 *
 * Go source:
 * func (m *ArrayTypeMapper) Kind() TypeMapperKind {
 * 	return TypeMapperKindArray
 * }
 */
export function ArrayTypeMapper_Kind(receiver: GoPtr<ArrayTypeMapper>): TypeMapperKind {
  return TypeMapperKindArray;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::ArrayToSingleTypeMapper","kind":"type","status":"implemented","sigHash":"9eec27fb902eaea204cc072baa25aa10245fbaf50a878689ae3a2af95a114c2e"}
 *
 * Go source:
 * ArrayToSingleTypeMapper struct {
 * 	TypeMapperBase
 * 	sources []*Type
 * 	target  *Type
 * }
 */
export interface ArrayToSingleTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  sources: GoSlice<GoPtr<Type>>;
  target: GoPtr<Type>;
}

class ArrayToSingleTypeMapperValue implements ArrayToSingleTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public sources: GoSlice<GoPtr<Type>>,
    public target: GoPtr<Type>,
  ) {}

  __tsgoGoReceiver(): GoPtr<ArrayToSingleTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return ArrayToSingleTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return TypeMapperBase_Kind(undefined);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newArrayToSingleTypeMapper","kind":"func","status":"implemented","sigHash":"66a15be83c8fa3657c7967e96dba9c0699dc618f20567633ca1696b01393f661"}
 *
 * Go source:
 * func newArrayToSingleTypeMapper(sources []*Type, target *Type) *TypeMapper {
 * 	m := &ArrayToSingleTypeMapper{}
 * 	m.data = m
 * 	m.sources = sources
 * 	m.target = target
 * 	return &m.TypeMapper
 * }
 */
export function newArrayToSingleTypeMapper(sources: GoSlice<GoPtr<Type>>, target: GoPtr<Type>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new ArrayToSingleTypeMapperValue(base, sources, target);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::ArrayToSingleTypeMapper.Map","kind":"method","status":"implemented","sigHash":"9345154b14e179cddad1146c361b8be344b320bb3bd106d33cb04a6692a96388"}
 *
 * Go source:
 * func (m *ArrayToSingleTypeMapper) Map(t *Type) *Type {
 * 	if slices.Contains(m.sources, t) {
 * 		return m.target
 * 	}
 * 	return t
 * }
 */
export function ArrayToSingleTypeMapper_Map(receiver: GoPtr<ArrayToSingleTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  if (receiver!.sources.includes(t)) {
    return receiver!.target;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::DeferredTypeMapper","kind":"type","status":"implemented","sigHash":"a1d2c929d50ac483786ef18d6d12e6ba2021b16477aecfd6e4e3919e8d4e5e1a"}
 *
 * Go source:
 * DeferredTypeMapper struct {
 * 	TypeMapperBase
 * 	sources []*Type
 * 	targets []func() *Type
 * }
 */
export interface DeferredTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  sources: GoSlice<GoPtr<Type>>;
  targets: GoSlice<GoFunc<() => GoPtr<Type>>>;
}

class DeferredTypeMapperValue implements DeferredTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public sources: GoSlice<GoPtr<Type>>,
    public targets: GoSlice<GoFunc<() => GoPtr<Type>>>,
  ) {}

  __tsgoGoReceiver(): GoPtr<DeferredTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return DeferredTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return TypeMapperBase_Kind(undefined);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newDeferredTypeMapper","kind":"func","status":"implemented","sigHash":"2f61952977ac436ca730fb92992033a5aa0fcd9c6dad40caa8c80331c9adcda7"}
 *
 * Go source:
 * func newDeferredTypeMapper(sources []*Type, targets []func() *Type) *TypeMapper {
 * 	m := &DeferredTypeMapper{}
 * 	m.data = m
 * 	m.sources = sources
 * 	m.targets = targets
 * 	return &m.TypeMapper
 * }
 */
export function newDeferredTypeMapper(sources: GoSlice<GoPtr<Type>>, targets: GoSlice<GoFunc<() => GoPtr<Type>>>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new DeferredTypeMapperValue(base, sources, targets);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::DeferredTypeMapper.Map","kind":"method","status":"implemented","sigHash":"d08eb3785ec5de3bae49b0f453e9b0e05f73ff99dcc77b414745b290e5407880"}
 *
 * Go source:
 * func (m *DeferredTypeMapper) Map(t *Type) *Type {
 * 	for i, s := range m.sources {
 * 		if t == s {
 * 			return m.targets[i]()
 * 		}
 * 	}
 * 	return t
 * }
 */
export function DeferredTypeMapper_Map(receiver: GoPtr<DeferredTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  for (let i = 0; i < receiver!.sources.length; i++) {
    const s = receiver!.sources[i];
    if (t === s) {
      return receiver!.targets[i]!();
    }
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::FunctionTypeMapper","kind":"type","status":"implemented","sigHash":"644f899b0b29b75e7a293b5aaa166d153f3e82d85be4ef9eba7967e6c9ccabee"}
 *
 * Go source:
 * FunctionTypeMapper struct {
 * 	TypeMapperBase
 * 	fn func(*Type) *Type
 * }
 */
export interface FunctionTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  fn: GoFunc<(arg0: GoPtr<Type>) => GoPtr<Type>>;
}

class FunctionTypeMapperValue implements FunctionTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public fn: GoFunc<(arg0: GoPtr<Type>) => GoPtr<Type>>,
  ) {}

  __tsgoGoReceiver(): GoPtr<FunctionTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return FunctionTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return TypeMapperBase_Kind(undefined);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newFunctionTypeMapper","kind":"func","status":"implemented","sigHash":"a7dd317a670447601b6ffb5fb1599bbea45f3b7ad5b2ce931bcf1bdcd478115f"}
 *
 * Go source:
 * func newFunctionTypeMapper(fn func(*Type) *Type) *TypeMapper {
 * 	m := &FunctionTypeMapper{}
 * 	m.data = m
 * 	m.fn = fn
 * 	return &m.TypeMapper
 * }
 */
export function newFunctionTypeMapper(fn: GoFunc<(arg0: GoPtr<Type>) => GoPtr<Type>>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new FunctionTypeMapperValue(base, fn);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::FunctionTypeMapper.Map","kind":"method","status":"implemented","sigHash":"9de49ff090455436d6cec54ae5c06ba405ae04b0809ea90fc53872486e59696a"}
 *
 * Go source:
 * func (m *FunctionTypeMapper) Map(t *Type) *Type {
 * 	return m.fn(t)
 * }
 */
export function FunctionTypeMapper_Map(receiver: GoPtr<FunctionTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  return receiver!.fn!(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::MergedTypeMapper","kind":"type","status":"implemented","sigHash":"c4f341f6ed422a1320f4e2ac71bc3f8a5e7b4d8f2fb6d898ff23eb978f64ecce"}
 *
 * Go source:
 * MergedTypeMapper struct {
 * 	TypeMapperBase
 * 	m1 *TypeMapper
 * 	m2 *TypeMapper
 * }
 */
export interface MergedTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  m1: GoPtr<TypeMapper>;
  m2: GoPtr<TypeMapper>;
}

class MergedTypeMapperValue implements MergedTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public m1: GoPtr<TypeMapper>,
    public m2: GoPtr<TypeMapper>,
  ) {}

  __tsgoGoReceiver(): GoPtr<MergedTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return MergedTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return MergedTypeMapper_Kind(this);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newMergedTypeMapper","kind":"func","status":"implemented","sigHash":"83908bc9f7bb40a9a061269ad4d33c5cf3e2c8098d846381a48e84cbdea2856b"}
 *
 * Go source:
 * func newMergedTypeMapper(m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
 * 	m := &MergedTypeMapper{}
 * 	m.data = m
 * 	m.m1 = m1
 * 	m.m2 = m2
 * 	return &m.TypeMapper
 * }
 */
export function newMergedTypeMapper(m1: GoPtr<TypeMapper>, m2: GoPtr<TypeMapper>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new MergedTypeMapperValue(base, m1, m2);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::MergedTypeMapper.Map","kind":"method","status":"implemented","sigHash":"439ab111a0227f26acf497a42d4030b775d27cd38d3b19dbc245f6c42fa8a52d"}
 *
 * Go source:
 * func (m *MergedTypeMapper) Map(t *Type) *Type {
 * 	return m.m2.Map(m.m1.Map(t))
 * }
 */
export function MergedTypeMapper_Map(receiver: GoPtr<MergedTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  return TypeMapper_Map(receiver!.m2, TypeMapper_Map(receiver!.m1, t));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::MergedTypeMapper.Kind","kind":"method","status":"implemented","sigHash":"7a2e8252d27fcb2fabf85d9fc028eae8e57d9219374fef7ce0b9db8d638d2f7e"}
 *
 * Go source:
 * func (m *MergedTypeMapper) Kind() TypeMapperKind {
 * 	return TypeMapperKindMerged
 * }
 */
export function MergedTypeMapper_Kind(receiver: GoPtr<MergedTypeMapper>): TypeMapperKind {
  return TypeMapperKindMerged;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::CompositeTypeMapper","kind":"type","status":"implemented","sigHash":"8aaefc4071358ab56b978cd27e76fc72292f8be60790012ebf8edcf18edce1bc"}
 *
 * Go source:
 * CompositeTypeMapper struct {
 * 	TypeMapperBase
 * 	c  *Checker
 * 	m1 *TypeMapper
 * 	m2 *TypeMapper
 * }
 */
export interface CompositeTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  c: GoPtr<Checker>;
  m1: GoPtr<TypeMapper>;
  m2: GoPtr<TypeMapper>;
}

class CompositeTypeMapperValue implements CompositeTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public c: GoPtr<Checker>,
    public m1: GoPtr<TypeMapper>,
    public m2: GoPtr<TypeMapper>,
  ) {}

  __tsgoGoReceiver(): GoPtr<CompositeTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return CompositeTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return TypeMapperBase_Kind(undefined);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::func::newCompositeTypeMapper","kind":"func","status":"implemented","sigHash":"81a346bfb68d6de7b42794caadeae83ebbadd5b58786cf7f09971df434afa105"}
 *
 * Go source:
 * func newCompositeTypeMapper(c *Checker, m1 *TypeMapper, m2 *TypeMapper) *TypeMapper {
 * 	m := &CompositeTypeMapper{}
 * 	m.data = m
 * 	m.c = c
 * 	m.m1 = m1
 * 	m.m2 = m2
 * 	return &m.TypeMapper
 * }
 */
export function newCompositeTypeMapper(c: GoPtr<Checker>, m1: GoPtr<TypeMapper>, m2: GoPtr<TypeMapper>): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new CompositeTypeMapperValue(base, c, m1, m2);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::CompositeTypeMapper.Map","kind":"method","status":"implemented","sigHash":"31472262f1ecd3a4ab964401a4197eb1b60c222e8defe9e3486888ee44136da8"}
 *
 * Go source:
 * func (m *CompositeTypeMapper) Map(t *Type) *Type {
 * 	t1 := m.m1.Map(t)
 * 	if t1 != t {
 * 		return m.c.instantiateType(t1, m.m2)
 * 	}
 * 	return m.m2.Map(t)
 * }
 */
export function CompositeTypeMapper_Map(receiver: GoPtr<CompositeTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  const t1 = TypeMapper_Map(receiver!.m1, t);
  if (t1 !== t) {
    return Checker_instantiateType(receiver!.c, t1, receiver!.m2);
  }
  return TypeMapper_Map(receiver!.m2, t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::type::InferenceTypeMapper","kind":"type","status":"implemented","sigHash":"c4e256cd8f6c8041b04c1a167d64caf7269ba4dcd853debcb28792db65b548e9"}
 *
 * Go source:
 * InferenceTypeMapper struct {
 * 	TypeMapperBase
 * 	c      *Checker
 * 	n      *InferenceContext
 * 	fixing bool
 * }
 */
export interface InferenceTypeMapper {
  __tsgoEmbedded0: TypeMapperBase;
  c: GoPtr<Checker>;
  n: GoPtr<InferenceContext>;
  fixing: bool;
}

class InferenceTypeMapperValue implements InferenceTypeMapper, TypeMapperData {
  constructor(
    public __tsgoEmbedded0: TypeMapperBase,
    public c: GoPtr<Checker>,
    public n: GoPtr<InferenceContext>,
    public fixing: bool,
  ) {}

  __tsgoGoReceiver(): GoPtr<InferenceTypeMapper> {
    return this;
  }

  Map(t: GoPtr<Type>): GoPtr<Type> {
    return InferenceTypeMapper_Map(this, t);
  }

  Kind(): TypeMapperKind {
    return TypeMapperBase_Kind(undefined);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::Checker.newInferenceTypeMapper","kind":"method","status":"implemented","sigHash":"3716c00d10957fcecca6cc19711c10de12b92e89d967997afef446e2f13095e3"}
 *
 * Go source:
 * func (c *Checker) newInferenceTypeMapper(n *InferenceContext, fixing bool) *TypeMapper {
 * 	m := &InferenceTypeMapper{}
 * 	m.data = m
 * 	m.c = c
 * 	m.n = n
 * 	m.fixing = fixing
 * 	return &m.TypeMapper
 * }
 */
export function Checker_newInferenceTypeMapper(receiver: GoPtr<Checker>, n: GoPtr<InferenceContext>, fixing: bool): GoPtr<TypeMapper> {
  const [base, mapper] = newEmbeddedTypeMapper();
  const m = new InferenceTypeMapperValue(base, receiver, n, fixing);
  mapper.data = m;
  return mapper;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/mapper.go::method::InferenceTypeMapper.Map","kind":"method","status":"implemented","sigHash":"b7c9bfb110b691524666ba870c54ee1f2abda8b821ceb52deb048247e5886538"}
 *
 * Go source:
 * func (m *InferenceTypeMapper) Map(t *Type) *Type {
 * 	for i, inference := range m.n.inferences {
 * 		if t == inference.typeParameter {
 * 			if m.fixing && !inference.isFixed {
 * 				// Before we commit to a particular inference (and thus lock out any further inferences),
 * 				// we infer from any intra-expression inference sites we have collected.
 * 				m.c.inferFromIntraExpressionSites(m.n)
 * 				clearCachedInferences(m.n.inferences)
 * 				inference.isFixed = true
 * 			}
 * 			return m.c.getInferredType(m.n, i)
 * 		}
 * 	}
 * 	return t
 * }
 */
export function InferenceTypeMapper_Map(receiver: GoPtr<InferenceTypeMapper>, t: GoPtr<Type>): GoPtr<Type> {
  for (let i = 0; i < receiver!.n!.inferences.length; i++) {
    const inference = receiver!.n!.inferences[i];
    if (t === inference!.typeParameter) {
      if (receiver!.fixing && !inference!.isFixed) {
        // Before we commit to a particular inference (and thus lock out any further inferences),
        // we infer from any intra-expression inference sites we have collected.
        Checker_inferFromIntraExpressionSites(receiver!.c, receiver!.n);
        clearCachedInferences(receiver!.n!.inferences);
        inference!.isFixed = true;
      }
      return Checker_getInferredType(receiver!.c, receiver!.n, i);
    }
  }
  return t;
}
