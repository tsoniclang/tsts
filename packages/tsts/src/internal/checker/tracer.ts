import type { bool, int, uint } from "../../go/scalars.js";
import { goReceiverKey } from "../../go/compat.js";
import type { GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import * as maps from "../../go/maps.js";
import type { Node } from "../ast/spine.js";
import type { Symbol as Symbol_0b94c68b } from "../ast/symbol.js";
import type { Phase, TracedType, Tracer as Tracer_5708eec8, Tracing } from "../tracing/tracing.js";
import { Tracing_Instant, Tracing_NewTypeTracer, Tracing_Push } from "../tracing/tracing.js";
import type { Checker } from "./checker/state.js";
import { Checker_TypeToString } from "./printer.js";
import { getRecursionIdentity } from "./relater.js";
import {
  FormatTypeFlags,
  ObjectFlagsAnonymous,
  ObjectFlagsEvolvingArray,
  ObjectFlagsReference,
  ObjectFlagsReverseMapped,
  ObjectFlagsTuple,
  TypeAlias_Symbol,
  TypeAlias_TypeArguments,
  Type_AsConditionalType,
  Type_AsEvolvingArrayType,
  Type_AsIndexType,
  Type_AsIndexedAccessType,
  Type_AsReverseMappedType,
  Type_AsSubstitutionType,
  Type_AsTypeReference,
  Type_AsUnionOrIntersectionType,
  Type_Target,
  TypeFlagsConditional,
  TypeFlagsIndex,
  TypeFlagsIndexedAccess,
  TypeFlagsIntersection,
  TypeFlagsIntrinsic,
  TypeFlagsLiteral,
  TypeFlagsObject,
  TypeFlagsSubstitution,
  TypeFlagsTemplateLiteral,
  TypeFlagsUnion,
} from "./types.js";
import type { IntrinsicType, Type } from "./types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::type::Tracer","kind":"type","status":"implemented","sigHash":"f6f6cd010e9b895165c298c7bce581689d14754cbe933633c3878896feab31c3"}
 *
 * Go source:
 * Tracer struct {
 * 	tracing      *tracing.Tracing
 * 	recorder     tracing.Tracer
 * 	checkerIndex int
 * }
 */
export interface Tracer {
  tracing: GoPtr<Tracing>;
  recorder: Tracer_5708eec8;
  checkerIndex: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::func::NewTracer","kind":"func","status":"implemented","sigHash":"5a3eaee96bfab76e74b793560aeaf801e00b8c4e807ce1c849cb31588a5ed889"}
 *
 * Go source:
 * func NewTracer(tr *tracing.Tracing, checkerIndex int) *Tracer {
 * 	return &Tracer{tracing: tr, recorder: tr.NewTypeTracer(checkerIndex), checkerIndex: checkerIndex}
 * }
 */
export function NewTracer(tr: GoPtr<Tracing>, checkerIndex: int): GoPtr<Tracer> {
  return { tracing: tr, recorder: Tracing_NewTypeTracer(tr, checkerIndex), checkerIndex: checkerIndex };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::Tracer.RecordType","kind":"method","status":"implemented","sigHash":"7250d09f455bdc84863e3746776fb3531fc4777bfcfd794977bb19251dffc8b9"}
 *
 * Go source:
 * func (t *Tracer) RecordType(typ *Type) {
 * 	t.recorder.RecordType(wrapType(typ))
 * }
 */
export function Tracer_RecordType(receiver: GoPtr<Tracer>, typ: GoPtr<Type>): void {
  receiver!.recorder.RecordType(wrapType(typ));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::Tracer.Push","kind":"method","status":"implemented","sigHash":"c9e8f40f38ad2a360fb5d7feb268c01130cda07d7ae8e72ba50ddc9ba3ac61c2"}
 *
 * Go source:
 * func (t *Tracer) Push(phase tracing.Phase, name string, args map[string]any, separateBeginAndEnd bool) func() {
 * 	if !separateBeginAndEnd {
 * 		return t.tracing.Push(phase, name, t.copyWithCheckerIndex(args), separateBeginAndEnd)
 * 	}
 *
 * 	args, restore := t.temporarilyAddCheckerIndex(args)
 * 	pop := t.tracing.Push(phase, name, args, separateBeginAndEnd)
 * 	restore()
 *
 * 	return func() {
 * 		_, restoreEndArgs := t.temporarilyAddCheckerIndex(args)
 * 		defer restoreEndArgs()
 * 		pop()
 * 	}
 * }
 */
export function Tracer_Push(receiver: GoPtr<Tracer>, phase: Phase, name: string, args: GoMap<string, unknown>, separateBeginAndEnd: bool): () => void {
  if (!separateBeginAndEnd) {
    return Tracing_Push(receiver!.tracing, phase, name, Tracer_copyWithCheckerIndex(receiver, args), separateBeginAndEnd);
  }

  const [args_0, restore] = Tracer_temporarilyAddCheckerIndex(receiver, args);
  const pop = Tracing_Push(receiver!.tracing, phase, name, args_0, separateBeginAndEnd);
  restore();

  return (): void => {
    const [, restoreEndArgs] = Tracer_temporarilyAddCheckerIndex(receiver, args_0);
    try {
      pop();
    } finally {
      restoreEndArgs();
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::Tracer.Instant","kind":"method","status":"implemented","sigHash":"706c5c33b0b24d2ff2766778e6fd828c2a8b1fb2f36c5b7c89d5cbda913a0b3a"}
 *
 * Go source:
 * func (t *Tracer) Instant(phase tracing.Phase, name string, args map[string]any) {
 * 	t.tracing.Instant(phase, name, t.copyWithCheckerIndex(args))
 * }
 */
export function Tracer_Instant(receiver: GoPtr<Tracer>, phase: Phase, name: string, args: GoMap<string, unknown>): void {
  Tracing_Instant(receiver!.tracing, phase, name, Tracer_copyWithCheckerIndex(receiver, args));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::Tracer.copyWithCheckerIndex","kind":"method","status":"implemented","sigHash":"223309489e8ee567b3134b7f9f5b146a7c372d260d48dd64462dfb057b694808"}
 *
 * Go source:
 * func (t *Tracer) copyWithCheckerIndex(args map[string]any) map[string]any {
 * 	withCheckerIndex := make(map[string]any, len(args)+1)
 * 	maps.Copy(withCheckerIndex, args)
 * 	withCheckerIndex["checkerId"] = t.checkerIndex
 * 	return withCheckerIndex
 * }
 */
export function Tracer_copyWithCheckerIndex(receiver: GoPtr<Tracer>, args: GoMap<string, unknown>): GoMap<string, unknown> {
  const withCheckerIndex = new globalThis.Map<string, unknown>();
  maps.Copy(withCheckerIndex, args ?? new globalThis.Map<string, unknown>());
  withCheckerIndex.set("checkerId", receiver!.checkerIndex);
  return withCheckerIndex;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::Tracer.temporarilyAddCheckerIndex","kind":"method","status":"implemented","sigHash":"05c282d023cb1d080e7ef6ff0e0c9b32197ec454d6c2ccc99ac9937252de6309"}
 *
 * Go source:
 * func (t *Tracer) temporarilyAddCheckerIndex(args map[string]any) (map[string]any, func()) {
 * 	if args == nil {
 * 		args = map[string]any{}
 * 	}
 *
 * 	previous, hadPrevious := args["checkerId"]
 * 	args["checkerId"] = t.checkerIndex
 *
 * 	return args, func() {
 * 		if hadPrevious {
 * 			args["checkerId"] = previous
 * 		} else {
 * 			delete(args, "checkerId")
 * 		}
 * 	}
 * }
 */
export function Tracer_temporarilyAddCheckerIndex(receiver: GoPtr<Tracer>, args: GoMap<string, unknown>): [GoMap<string, unknown>, () => void] {
  if (args === undefined) {
    args = new globalThis.Map<string, unknown>();
  }

  const hadPrevious = args.has("checkerId");
  const previous = args.get("checkerId");
  args.set("checkerId", receiver!.checkerIndex);

  return [args, (): void => {
    if (hadPrevious) {
      args.set("checkerId", previous);
    } else {
      args.delete("checkerId");
    }
  }];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::type::tracedTypeAdapter","kind":"type","status":"implemented","sigHash":"34a478bcd924f0c355cebc624d5dc8b868aed28725c4fac42544c6f374b4b6cd"}
 *
 * Go source:
 * tracedTypeAdapter struct {
 * 	t       *Type
 * 	checker *Checker
 * }
 */
export interface tracedTypeAdapter {
  t: GoPtr<Type>;
  checker: GoPtr<Checker>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ tracing.TracedType = (*tracedTypeAdapter)(nil)
 */
export let __88a6f671_0: TracedType = wrapType(undefined);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.Id","kind":"method","status":"implemented","sigHash":"1b5527e62eddf3209bac5d770df27dc9fd21a153ab2cf9a0163fbeb8ec218011"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) Id() uint32 {
 * 	return uint32(a.t.id)
 * }
 */
export function tracedTypeAdapter_Id(receiver: GoPtr<tracedTypeAdapter>): uint {
  return receiver!.t!.id as uint;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.FormatFlags","kind":"method","status":"implemented","sigHash":"bc489d05b88aa7f8c0669457f5d8f489d759627319e78015cea7e72b818e0824"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) FormatFlags() []string {
 * 	return FormatTypeFlags(a.t.flags)
 * }
 */
export function tracedTypeAdapter_FormatFlags(receiver: GoPtr<tracedTypeAdapter>): GoSlice<string> {
  return FormatTypeFlags(receiver!.t!.flags);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IsConditional","kind":"method","status":"implemented","sigHash":"972ccb385f456915d0de9903fe0a4801e55811365d0e7790631575f1809f714e"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IsConditional() bool {
 * 	return a.t.flags&TypeFlagsConditional != 0
 * }
 */
export function tracedTypeAdapter_IsConditional(receiver: GoPtr<tracedTypeAdapter>): bool {
  return (receiver!.t!.flags & TypeFlagsConditional) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.Symbol","kind":"method","status":"implemented","sigHash":"b51146f3892acbdd9fd69c53e74af07ec3e43aa3f0d2817d34f812d48483194e"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) Symbol() *ast.Symbol {
 * 	return a.t.symbol
 * }
 */
export function tracedTypeAdapter_Symbol(receiver: GoPtr<tracedTypeAdapter>): GoPtr<Symbol_0b94c68b> {
  return receiver!.t!.symbol;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.AliasSymbol","kind":"method","status":"implemented","sigHash":"ace03b48f58dc3cb075aea0e007fe23d99b00fea01c0de1c19b6d4a524f1641d"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) AliasSymbol() *ast.Symbol {
 * 	if a.t.alias == nil {
 * 		return nil
 * 	}
 * 	return a.t.alias.Symbol()
 * }
 */
export function tracedTypeAdapter_AliasSymbol(receiver: GoPtr<tracedTypeAdapter>): GoPtr<Symbol_0b94c68b> {
  if (receiver!.t!.alias === undefined) {
    return undefined;
  }
  return TypeAlias_Symbol(receiver!.t!.alias);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.AliasTypeArguments","kind":"method","status":"implemented","sigHash":"62d2064ceb975d246b1a6b49dc7f0514684121d490739a5a044117358114e4df"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) AliasTypeArguments() []tracing.TracedType {
 * 	if a.t.alias == nil {
 * 		return nil
 * 	}
 * 	return wrapTypes(a.t.alias.TypeArguments())
 * }
 */
export function tracedTypeAdapter_AliasTypeArguments(receiver: GoPtr<tracedTypeAdapter>): GoSlice<TracedType> {
  if (receiver!.t!.alias === undefined) {
    return [];
  }
  return wrapTypes(TypeAlias_TypeArguments(receiver!.t!.alias));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IntrinsicName","kind":"method","status":"implemented","sigHash":"ecee283a6202a3a142a05e8c098f2b484f67e24dfe8a25cb7a6d4f486cf065e7"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IntrinsicName() string {
 * 	if a.t.flags&TypeFlagsIntrinsic == 0 {
 * 		return ""
 * 	}
 * 	data, ok := a.t.data.(*IntrinsicType)
 * 	if !ok {
 * 		return ""
 * 	}
 * 	return data.intrinsicName
 * }
 */
export function tracedTypeAdapter_IntrinsicName(receiver: GoPtr<tracedTypeAdapter>): string {
  if ((receiver!.t!.flags & TypeFlagsIntrinsic) === 0) {
    return "";
  }
  const data = receiver!.t!.data[goReceiverKey] as GoPtr<IntrinsicType>;
  if (data === undefined) {
    return "";
  }
  return data.intrinsicName;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.UnionTypes","kind":"method","status":"implemented","sigHash":"65a3fa55c87b1390db75843d555e44e5f3dd0d92b83bfa8e58efff474db45e0f"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) UnionTypes() []tracing.TracedType {
 * 	if a.t.flags&TypeFlagsUnion == 0 {
 * 		return nil
 * 	}
 * 	return wrapTypes(a.t.AsUnionType().types)
 * }
 */
export function tracedTypeAdapter_UnionTypes(receiver: GoPtr<tracedTypeAdapter>): GoSlice<TracedType> {
  if ((receiver!.t!.flags & TypeFlagsUnion) === 0) {
    return [];
  }
  return wrapTypes(Type_AsUnionOrIntersectionType(receiver!.t)!.types);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IntersectionTypes","kind":"method","status":"implemented","sigHash":"3c20096ee6093c6e875ac9431bcc3c72a9f9365b1c7a99fcbf9a6ba66b977ada"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IntersectionTypes() []tracing.TracedType {
 * 	if a.t.flags&TypeFlagsIntersection == 0 {
 * 		return nil
 * 	}
 * 	return wrapTypes(a.t.AsIntersectionType().types)
 * }
 */
export function tracedTypeAdapter_IntersectionTypes(receiver: GoPtr<tracedTypeAdapter>): GoSlice<TracedType> {
  if ((receiver!.t!.flags & TypeFlagsIntersection) === 0) {
    return [];
  }
  return wrapTypes(Type_AsUnionOrIntersectionType(receiver!.t)!.types);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IndexType","kind":"method","status":"implemented","sigHash":"061fa36913b5f12069e009b089d7441c25809bf473e65c6a0ca68cd467f2915d"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IndexType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsIndex == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsIndexType().target
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_IndexType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsIndex) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsIndexType(receiver!.t)!.target;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IndexedAccessObjectType","kind":"method","status":"implemented","sigHash":"f0b10117665c8e6367ff6949fb15e5bca77bd6f5cf7dbe442ad9d0e005c9ab46"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IndexedAccessObjectType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsIndexedAccess == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsIndexedAccessType().objectType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_IndexedAccessObjectType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsIndexedAccess) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsIndexedAccessType(receiver!.t)!.objectType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IndexedAccessIndexType","kind":"method","status":"implemented","sigHash":"1dc0ed3e6f957b5cded4163468478d4be50cd76fc79754ea2fa06755d776b25b"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IndexedAccessIndexType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsIndexedAccess == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsIndexedAccessType().indexType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_IndexedAccessIndexType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsIndexedAccess) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsIndexedAccessType(receiver!.t)!.indexType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ConditionalCheckType","kind":"method","status":"implemented","sigHash":"73b090c249fb0caf47d61366be098a61e8ac832f422724c229de7a4790a19459"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ConditionalCheckType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsConditional == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsConditionalType().checkType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ConditionalCheckType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsConditional) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsConditionalType(receiver!.t)!.checkType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ConditionalExtendsType","kind":"method","status":"implemented","sigHash":"b1d81bea74e82b63f78111d2bed446ec08ce1b3b09e4ee0eb7c6aad4d1f137df"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ConditionalExtendsType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsConditional == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsConditionalType().extendsType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ConditionalExtendsType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsConditional) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsConditionalType(receiver!.t)!.extendsType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ConditionalTrueType","kind":"method","status":"implemented","sigHash":"d34acd5a5f94325dcf848c03154dc8077c5612dd4988264fd17edcb42b8efe6a"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ConditionalTrueType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsConditional == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsConditionalType().resolvedTrueType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ConditionalTrueType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsConditional) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsConditionalType(receiver!.t)!.resolvedTrueType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ConditionalFalseType","kind":"method","status":"implemented","sigHash":"ae712b8108ba006b8749bb9cd40f370371925540e880e3c5993daa513929aebd"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ConditionalFalseType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsConditional == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsConditionalType().resolvedFalseType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ConditionalFalseType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsConditional) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsConditionalType(receiver!.t)!.resolvedFalseType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.SubstitutionBaseType","kind":"method","status":"implemented","sigHash":"89c0d978606c446ae0e067f29423b42d8c0374e762d7075ba17a684f1ef6f53f"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) SubstitutionBaseType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsSubstitution == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsSubstitutionType().baseType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_SubstitutionBaseType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsSubstitution) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsSubstitutionType(receiver!.t)!.baseType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.SubstitutionConstraintType","kind":"method","status":"implemented","sigHash":"fc4dd6291ad86742e7f38e20dd298c17956c0d51c7955eec9fe32159fa8405f1"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) SubstitutionConstraintType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsSubstitution == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsSubstitutionType().constraint
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_SubstitutionConstraintType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsSubstitution) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsSubstitutionType(receiver!.t)!.constraint;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ReferenceTarget","kind":"method","status":"implemented","sigHash":"d84c09b4f7badd37f8d74a9db1b26c6f75e6b03276c12cc8cf7b0f08f65377ab"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ReferenceTarget() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReference == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsTypeReference().target
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ReferenceTarget(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsReference) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_Target(receiver!.t);
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ReferenceTypeArguments","kind":"method","status":"implemented","sigHash":"4e448c44bd82775ca95cbb3b4f3b4ca50d36ac73282bdffc3e7e17dc3e0432ed"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ReferenceTypeArguments() []tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReference == 0 {
 * 		return nil
 * 	}
 * 	return wrapTypes(a.t.AsTypeReference().resolvedTypeArguments)
 * }
 */
export function tracedTypeAdapter_ReferenceTypeArguments(receiver: GoPtr<tracedTypeAdapter>): GoSlice<TracedType> {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsReference) === 0) {
    return [];
  }
  return wrapTypes(Type_AsTypeReference(receiver!.t)!.resolvedTypeArguments);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ReferenceNode","kind":"method","status":"implemented","sigHash":"9cd4a06aa03d674b5ac3688460765910c0bdfa2fee5c37250ce3b606c6a487cd"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ReferenceNode() *ast.Node {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReference == 0 {
 * 		return nil
 * 	}
 * 	return a.t.AsTypeReference().node
 * }
 */
export function tracedTypeAdapter_ReferenceNode(receiver: GoPtr<tracedTypeAdapter>): GoPtr<Node> {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsReference) === 0) {
    return undefined;
  }
  return Type_AsTypeReference(receiver!.t)!.node;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ReverseMappedSourceType","kind":"method","status":"implemented","sigHash":"e4e3981fc5eb8e887dee9f0137a12f0262e0a081b868cacebccd8b87e559cb70"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ReverseMappedSourceType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReverseMapped == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsReverseMappedType().source
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ReverseMappedSourceType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsReverseMapped) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsReverseMappedType(receiver!.t)!.source;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ReverseMappedMappedType","kind":"method","status":"implemented","sigHash":"56019ce52de2c19d288944a645c9c591aecabb88038d0ca41132d7293bb25ea1"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ReverseMappedMappedType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReverseMapped == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsReverseMappedType().mappedType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ReverseMappedMappedType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsReverseMapped) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsReverseMappedType(receiver!.t)!.mappedType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.ReverseMappedConstraintType","kind":"method","status":"implemented","sigHash":"55323d101b6409473b3e11786d0df89162b4ea81590f65dff2d491a7c0345c44"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) ReverseMappedConstraintType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsReverseMapped == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsReverseMappedType().constraintType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_ReverseMappedConstraintType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsReverseMapped) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsReverseMappedType(receiver!.t)!.constraintType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.EvolvingArrayElementType","kind":"method","status":"implemented","sigHash":"d8b11b0967f6a4214bb28e21339ed6acec13f4f5ddeb619cafb15bd0d93a1245"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) EvolvingArrayElementType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsEvolvingArray == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsEvolvingArrayType().elementType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_EvolvingArrayElementType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsEvolvingArray) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsEvolvingArrayType(receiver!.t)!.elementType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.EvolvingArrayFinalType","kind":"method","status":"implemented","sigHash":"ec77aa89254d64eaa37119c25192c092c5e217e8401e46d2c1dce2e3b8ab81d8"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) EvolvingArrayFinalType() tracing.TracedType {
 * 	if a.t.flags&TypeFlagsObject == 0 || a.t.objectFlags&ObjectFlagsEvolvingArray == 0 {
 * 		return nil
 * 	}
 * 	t := a.t.AsEvolvingArrayType().finalArrayType
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return wrapType(t)
 * }
 */
export function tracedTypeAdapter_EvolvingArrayFinalType(receiver: GoPtr<tracedTypeAdapter>): TracedType {
  if ((receiver!.t!.flags & TypeFlagsObject) === 0 || (receiver!.t!.objectFlags & ObjectFlagsEvolvingArray) === 0) {
    return undefined as unknown as TracedType;
  }
  const t = Type_AsEvolvingArrayType(receiver!.t)!.finalArrayType;
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  return wrapType(t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.IsTuple","kind":"method","status":"implemented","sigHash":"1623ceb2917cca03a230b494c21dc6edb54a78b7503e132b05b9dbb06f11e400"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) IsTuple() bool {
 * 	return a.t.objectFlags&ObjectFlagsTuple != 0
 * }
 */
export function tracedTypeAdapter_IsTuple(receiver: GoPtr<tracedTypeAdapter>): bool {
  return (receiver!.t!.objectFlags & ObjectFlagsTuple) !== 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.Pattern","kind":"method","status":"implemented","sigHash":"5813595b9dbb732433c5f2cc0ebc9c9dcd9adb5d086d63d4ae64e92dd98e082b"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) Pattern() *ast.Node {
 * 	if a.checker == nil {
 * 		return nil
 * 	}
 * 	return a.checker.patternForType[a.t]
 * }
 */
export function tracedTypeAdapter_Pattern(receiver: GoPtr<tracedTypeAdapter>): GoPtr<Node> {
  if (receiver!.checker === undefined) {
    return undefined;
  }
  return receiver!.checker!.patternForType.get(receiver!.t);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.RecursionIdentity","kind":"method","status":"implemented","sigHash":"51d3dfadce1a6acf5751398e7d5a43d13742cad1b70643523ad6948a9e5c31cc"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) RecursionIdentity() any {
 * 	return getRecursionIdentity(a.t).value
 * }
 */
export function tracedTypeAdapter_RecursionIdentity(receiver: GoPtr<tracedTypeAdapter>): unknown {
  return getRecursionIdentity(receiver!.t).value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::method::tracedTypeAdapter.Display","kind":"method","status":"implemented","sigHash":"9645e1e422c95990ec89e943b97aa0b2bcdd5f513773da7436423adb435a5d34"}
 *
 * Go source:
 * func (a *tracedTypeAdapter) Display() string {
 * 	// Compute display text for types where it's valuable for trace analysis.
 * 	// TypeScript only does this for Anonymous|Literal types, but we extend to
 * 	// unions, intersections, and template literals since they often lack
 * 	// firstDeclaration and the display text helps identify them.
 * 	// Incomplete types during tracing can cause panics, which we intentionally
 * 	// suppress (returning ""), matching TypeScript's try/catch around typeToString.
 * 	if a.checker == nil {
 * 		return ""
 * 	}
 * 	if a.t.objectFlags&ObjectFlagsAnonymous != 0 ||
 * 		a.t.flags&(TypeFlagsLiteral|TypeFlagsTemplateLiteral|TypeFlagsUnion|TypeFlagsIntersection) != 0 {
 * 		defer func() {
 * 			_ = recover()
 * 		}()
 * 		return a.checker.TypeToString(a.t)
 * 	}
 * 	return ""
 * }
 */
export function tracedTypeAdapter_Display(receiver: GoPtr<tracedTypeAdapter>): string {
  if (receiver!.checker === undefined) {
    return "";
  }
  if (
    (receiver!.t!.objectFlags & ObjectFlagsAnonymous) !== 0 ||
    (receiver!.t!.flags & (TypeFlagsLiteral | TypeFlagsTemplateLiteral | TypeFlagsUnion | TypeFlagsIntersection)) !== 0
  ) {
    try {
      return Checker_TypeToString(receiver!.checker, receiver!.t);
    } catch {
      return "";
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::func::wrapType","kind":"func","status":"implemented","sigHash":"673f6ede962d971ab2e52ad2e5dfe5a09abaf2e946cb9c074d271364cdfe6cf9"}
 *
 * Go source:
 * func wrapType(t *Type) tracing.TracedType {
 * 	if t == nil {
 * 		return nil
 * 	}
 * 	return &tracedTypeAdapter{t: t, checker: t.checker}
 * }
 */
export function wrapType(t: GoPtr<Type>): TracedType {
  if (t === undefined) {
    return undefined as unknown as TracedType;
  }
  const a: tracedTypeAdapter = { t, checker: t.checker };
  return {
    Id: () => tracedTypeAdapter_Id(a),
    FormatFlags: () => tracedTypeAdapter_FormatFlags(a),
    IsConditional: () => tracedTypeAdapter_IsConditional(a),
    Symbol: () => tracedTypeAdapter_Symbol(a),
    AliasSymbol: () => tracedTypeAdapter_AliasSymbol(a),
    AliasTypeArguments: () => tracedTypeAdapter_AliasTypeArguments(a),
    IntrinsicName: () => tracedTypeAdapter_IntrinsicName(a),
    UnionTypes: () => tracedTypeAdapter_UnionTypes(a),
    IntersectionTypes: () => tracedTypeAdapter_IntersectionTypes(a),
    IndexType: () => tracedTypeAdapter_IndexType(a),
    IndexedAccessObjectType: () => tracedTypeAdapter_IndexedAccessObjectType(a),
    IndexedAccessIndexType: () => tracedTypeAdapter_IndexedAccessIndexType(a),
    ConditionalCheckType: () => tracedTypeAdapter_ConditionalCheckType(a),
    ConditionalExtendsType: () => tracedTypeAdapter_ConditionalExtendsType(a),
    ConditionalTrueType: () => tracedTypeAdapter_ConditionalTrueType(a),
    ConditionalFalseType: () => tracedTypeAdapter_ConditionalFalseType(a),
    SubstitutionBaseType: () => tracedTypeAdapter_SubstitutionBaseType(a),
    SubstitutionConstraintType: () => tracedTypeAdapter_SubstitutionConstraintType(a),
    ReferenceTarget: () => tracedTypeAdapter_ReferenceTarget(a),
    ReferenceTypeArguments: () => tracedTypeAdapter_ReferenceTypeArguments(a),
    ReferenceNode: () => tracedTypeAdapter_ReferenceNode(a),
    ReverseMappedSourceType: () => tracedTypeAdapter_ReverseMappedSourceType(a),
    ReverseMappedMappedType: () => tracedTypeAdapter_ReverseMappedMappedType(a),
    ReverseMappedConstraintType: () => tracedTypeAdapter_ReverseMappedConstraintType(a),
    EvolvingArrayElementType: () => tracedTypeAdapter_EvolvingArrayElementType(a),
    EvolvingArrayFinalType: () => tracedTypeAdapter_EvolvingArrayFinalType(a),
    IsTuple: () => tracedTypeAdapter_IsTuple(a),
    Pattern: () => tracedTypeAdapter_Pattern(a),
    RecursionIdentity: () => tracedTypeAdapter_RecursionIdentity(a),
    Display: () => tracedTypeAdapter_Display(a),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/tracer.go::func::wrapTypes","kind":"func","status":"implemented","sigHash":"a7a48083636465ed8135b4dceded96b04ebaef7887f6ad3226e1285c5cdb0321"}
 *
 * Go source:
 * func wrapTypes(types []*Type) []tracing.TracedType {
 * 	if len(types) == 0 {
 * 		return nil
 * 	}
 * 	result := make([]tracing.TracedType, len(types))
 * 	for i, t := range types {
 * 		result[i] = wrapType(t)
 * 	}
 * 	return result
 * }
 */
export function wrapTypes(types: GoSlice<GoPtr<Type>>): GoSlice<TracedType> {
  if (types.length === 0) {
    return [];
  }
  const result: TracedType[] = new Array(types.length);
  for (let i = 0; i < types.length; i++) {
    result[i] = wrapType(types[i]);
  }
  return result;
}
