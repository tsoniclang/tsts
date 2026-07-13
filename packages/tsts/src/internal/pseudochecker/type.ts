import type { bool, sbyte, short } from "../../go/scalars.js";
import type { GoInterfaceValue, GoPtr, GoSlice } from "../../go/compat.js";
import type { Node } from "../ast/spine.js";
import type { TypeParameterDeclaration } from "../ast/generated/data.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeKind","kind":"type","status":"implemented","sigHash":"5f6d05dddcd7c40b06567b6639fcc9e2653dcc7ba9a670dd5bc328b039640dea"}
 *
 * Go source:
 * PseudoTypeKind int16
 */
export type PseudoTypeKind = short;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::constGroup::PseudoTypeKindDirect+PseudoTypeKindInferred+PseudoTypeKindNoResult+PseudoTypeKindMaybeConstLocation+PseudoTypeKindUnion+PseudoTypeKindUndefined+PseudoTypeKindNull+PseudoTypeKindAny+PseudoTypeKindString+PseudoTypeKindNumber+PseudoTypeKindBigInt+PseudoTypeKindBoolean+PseudoTypeKindFalse+PseudoTypeKindTrue+PseudoTypeKindSingleCallSignature+PseudoTypeKindTuple+PseudoTypeKindObjectLiteral+PseudoTypeKindStringLiteral+PseudoTypeKindNumericLiteral+PseudoTypeKindBigIntLiteral","kind":"constGroup","status":"implemented","sigHash":"c4a11793330828765f8261ae785733cbfb1ae40dd7050d5f640d136c119af48c"}
 *
 * Go source:
 * const (
 * 	PseudoTypeKindDirect PseudoTypeKind = iota
 * 	PseudoTypeKindInferred
 * 	PseudoTypeKindNoResult
 * 	PseudoTypeKindMaybeConstLocation
 * 	PseudoTypeKindUnion
 * 	PseudoTypeKindUndefined
 * 	PseudoTypeKindNull
 * 	PseudoTypeKindAny
 * 	PseudoTypeKindString
 * 	PseudoTypeKindNumber
 * 	PseudoTypeKindBigInt
 * 	PseudoTypeKindBoolean
 * 	PseudoTypeKindFalse
 * 	PseudoTypeKindTrue
 * 	PseudoTypeKindSingleCallSignature
 * 	PseudoTypeKindTuple
 * 	PseudoTypeKindObjectLiteral
 * 	PseudoTypeKindStringLiteral
 * 	PseudoTypeKindNumericLiteral
 * 	PseudoTypeKindBigIntLiteral
 * )
 */
export const PseudoTypeKindDirect: PseudoTypeKind = 0 as short;
export const PseudoTypeKindInferred: PseudoTypeKind = 1 as short;
export const PseudoTypeKindNoResult: PseudoTypeKind = 2 as short;
export const PseudoTypeKindMaybeConstLocation: PseudoTypeKind = 3 as short;
export const PseudoTypeKindUnion: PseudoTypeKind = 4 as short;
export const PseudoTypeKindUndefined: PseudoTypeKind = 5 as short;
export const PseudoTypeKindNull: PseudoTypeKind = 6 as short;
export const PseudoTypeKindAny: PseudoTypeKind = 7 as short;
export const PseudoTypeKindString: PseudoTypeKind = 8 as short;
export const PseudoTypeKindNumber: PseudoTypeKind = 9 as short;
export const PseudoTypeKindBigInt: PseudoTypeKind = 10 as short;
export const PseudoTypeKindBoolean: PseudoTypeKind = 11 as short;
export const PseudoTypeKindFalse: PseudoTypeKind = 12 as short;
export const PseudoTypeKindTrue: PseudoTypeKind = 13 as short;
export const PseudoTypeKindSingleCallSignature: PseudoTypeKind = 14 as short;
export const PseudoTypeKindTuple: PseudoTypeKind = 15 as short;
export const PseudoTypeKindObjectLiteral: PseudoTypeKind = 16 as short;
export const PseudoTypeKindStringLiteral: PseudoTypeKind = 17 as short;
export const PseudoTypeKindNumericLiteral: PseudoTypeKind = 18 as short;
export const PseudoTypeKindBigIntLiteral: PseudoTypeKind = 19 as short;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoType","kind":"type","status":"implemented","sigHash":"6922048c7b65ea28cab3fcfbd9735bdbb4e502e1fced0f0fa92e135f3da7c2b6"}
 *
 * Go source:
 * PseudoType struct {
 * 	Kind PseudoTypeKind
 * 	data pseudoTypeData
 * }
 */
export interface PseudoType {
  Kind: PseudoTypeKind;
  data: GoInterface<pseudoTypeData>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::newPseudoType","kind":"func","status":"implemented","sigHash":"6937b8889e10a7cd40d04ad1549b4251c47430d175fba073f6a072722ac8e2e1"}
 *
 * Go source:
 * func newPseudoType(kind PseudoTypeKind, data pseudoTypeData) *PseudoType {
 * 	n := data.AsPseudoType()
 * 	n.Kind = kind
 * 	n.data = data
 * 	return n
 * }
 */
export function newPseudoType(kind: PseudoTypeKind, data: GoInterface<pseudoTypeData>): GoPtr<PseudoType> {
  const n = data!.AsPseudoType();
  n!.Kind = kind;
  n!.data = data;
  return n;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::pseudoTypeData","kind":"type","status":"implemented","sigHash":"364e55fe8444f9e686ba5a9261d288f7640824100e9fbf5e34b94d2f23645c7e"}
 *
 * Go source:
 * pseudoTypeData interface {
 * 	AsPseudoType() *PseudoType
 * }
 */
export interface pseudoTypeData extends GoInterfaceValue<unknown> {
  AsPseudoType(): GoPtr<PseudoType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeDefault","kind":"type","status":"implemented","sigHash":"971328e16f1aebc78356a48d9a86815f135e5454de8c2f6d190b284e38b01e99"}
 *
 * Go source:
 * PseudoTypeDefault struct {
 * 	PseudoType
 * }
 */
export interface PseudoTypeDefault extends PseudoType {
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoTypeDefault.AsPseudoType","kind":"method","status":"implemented","sigHash":"2c795a57812741a4cd0e11255d67dd53d932fab81b07c379ef9bc28152a500eb"}
 *
 * Go source:
 * func (b *PseudoTypeDefault) AsPseudoType() *PseudoType { return &b.PseudoType }
 */
export function PseudoTypeDefault_AsPseudoType(receiver: GoPtr<PseudoTypeDefault>): GoPtr<PseudoType> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeBase","kind":"type","status":"implemented","sigHash":"af3b0db064728f381648ac63897561196295370113016748a253bcd0340f2f86"}
 *
 * Go source:
 * PseudoTypeBase struct {
 * 	PseudoTypeDefault
 * }
 */
export interface PseudoTypeBase extends PseudoTypeDefault {
}

class PseudoTypeBaseData implements PseudoTypeBase, pseudoTypeData {
  Kind!: PseudoTypeKind;
  data!: GoInterface<pseudoTypeData>;

  __tsgoGoReceiver(): GoPtr<PseudoTypeBase> {
    return this;
  }

  AsPseudoType(): GoPtr<PseudoType> {
    return PseudoTypeDefault_AsPseudoType(this);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::varGroup::PseudoTypeUndefined+PseudoTypeNull+PseudoTypeAny+PseudoTypeString+PseudoTypeNumber+PseudoTypeBigInt+PseudoTypeBoolean+PseudoTypeFalse+PseudoTypeTrue","kind":"varGroup","status":"implemented","sigHash":"4791d024d013554a64e9e6e2f6ca43e65339de790b7773b9988cab3e870bcec9"}
 *
 * Go source:
 * var (
 * 	PseudoTypeUndefined = newPseudoType(PseudoTypeKindUndefined, &PseudoTypeBase{})
 * 	PseudoTypeNull      = newPseudoType(PseudoTypeKindNull, &PseudoTypeBase{})
 * 	PseudoTypeAny       = newPseudoType(PseudoTypeKindAny, &PseudoTypeBase{})
 * 	PseudoTypeString    = newPseudoType(PseudoTypeKindString, &PseudoTypeBase{})
 * 	PseudoTypeNumber    = newPseudoType(PseudoTypeKindNumber, &PseudoTypeBase{})
 * 	PseudoTypeBigInt    = newPseudoType(PseudoTypeKindBigInt, &PseudoTypeBase{})
 * 	PseudoTypeBoolean   = newPseudoType(PseudoTypeKindBoolean, &PseudoTypeBase{})
 * 	PseudoTypeFalse     = newPseudoType(PseudoTypeKindFalse, &PseudoTypeBase{})
 * 	PseudoTypeTrue      = newPseudoType(PseudoTypeKindTrue, &PseudoTypeBase{})
 * )
 */
export let PseudoTypeUndefined: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindUndefined, new PseudoTypeBaseData());
export let PseudoTypeNull: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindNull, new PseudoTypeBaseData());
export let PseudoTypeAny: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindAny, new PseudoTypeBaseData());
export let PseudoTypeString: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindString, new PseudoTypeBaseData());
export let PseudoTypeNumber: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindNumber, new PseudoTypeBaseData());
export let PseudoTypeBigInt: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindBigInt, new PseudoTypeBaseData());
export let PseudoTypeBoolean: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindBoolean, new PseudoTypeBaseData());
export let PseudoTypeFalse: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindFalse, new PseudoTypeBaseData());
export let PseudoTypeTrue: GoPtr<PseudoType> = newPseudoType(PseudoTypeKindTrue, new PseudoTypeBaseData());

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeDirect","kind":"type","status":"implemented","sigHash":"ae16d0b37acd2e0f8a650ca2db5b12d8652bf41bcaafbaaf370846f35d6008cf"}
 *
 * Go source:
 * PseudoTypeDirect struct {
 * 	PseudoTypeBase
 * 	TypeNode *ast.Node
 * }
 */
export interface PseudoTypeDirect extends PseudoTypeBase {
  TypeNode: GoPtr<Node>;
}

class PseudoTypeDirectData extends PseudoTypeBaseData implements PseudoTypeDirect {
  TypeNode: GoPtr<Node>;

  constructor(typeNode: GoPtr<Node>) {
    super();
    this.TypeNode = typeNode;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeDirect","kind":"func","status":"implemented","sigHash":"e97af9665f64edefbf10bec7ef1a35f59be09f8aa40bdb4e37ddc9bc154aa4d1"}
 *
 * Go source:
 * func NewPseudoTypeDirect(typeNode *ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindDirect, &PseudoTypeDirect{TypeNode: typeNode})
 * }
 */
export function NewPseudoTypeDirect(typeNode: GoPtr<Node>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindDirect, new PseudoTypeDirectData(typeNode));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeDirect","kind":"method","status":"implemented","sigHash":"b51343bf9272b1e25ae87737e43780d561b06bc85bda9114878b480849367f46"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeDirect() *PseudoTypeDirect { return t.data.(*PseudoTypeDirect) }
 */
export function PseudoType_AsPseudoTypeDirect(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeDirect> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeDirect>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeInferred","kind":"type","status":"implemented","sigHash":"37e28ee286ee7d687a0ff23130871f0e7c04c9c79e37cfa2fe90cd5032dbc1e5"}
 *
 * Go source:
 * PseudoTypeInferred struct {
 * 	PseudoTypeBase
 * 	Expression *ast.Node
 * 	ErrorNodes []*ast.Node
 * }
 */
export interface PseudoTypeInferred extends PseudoTypeBase {
  Expression: GoPtr<Node>;
  ErrorNodes: GoSlice<GoPtr<Node>>;
}

class PseudoTypeInferredData extends PseudoTypeBaseData implements PseudoTypeInferred {
  Expression: GoPtr<Node>;
  ErrorNodes: GoSlice<GoPtr<Node>>;

  constructor(expression: GoPtr<Node>, errorNodes: GoSlice<GoPtr<Node>>) {
    super();
    this.Expression = expression;
    this.ErrorNodes = errorNodes;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeInferred","kind":"func","status":"implemented","sigHash":"c308eb2c68531c0b5146a5d93959fcd535c7fcb87a846f23d06292968676ce03"}
 *
 * Go source:
 * func NewPseudoTypeInferred(expr *ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindInferred, &PseudoTypeInferred{Expression: expr})
 * }
 */
export function NewPseudoTypeInferred(expr: GoPtr<Node>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindInferred, new PseudoTypeInferredData(expr, []));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeInferredWithErrors","kind":"func","status":"implemented","sigHash":"93ffed57eb52ac9810bc587f44aa2b63c8e9b2a857cf5f5bf138343ddc5d5404"}
 *
 * Go source:
 * func NewPseudoTypeInferredWithErrors(expr *ast.Node, errorNodes []*ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindInferred, &PseudoTypeInferred{Expression: expr, ErrorNodes: errorNodes})
 * }
 */
export function NewPseudoTypeInferredWithErrors(expr: GoPtr<Node>, errorNodes: GoSlice<GoPtr<Node>>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindInferred, new PseudoTypeInferredData(expr, errorNodes));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeInferred","kind":"method","status":"implemented","sigHash":"d6ce33c3f721632e02c21d922f8b9fc44028e874434757b529332543a0644eda"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeInferred() *PseudoTypeInferred { return t.data.(*PseudoTypeInferred) }
 */
export function PseudoType_AsPseudoTypeInferred(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeInferred> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeInferred>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeNoResult","kind":"type","status":"implemented","sigHash":"c51fb71c7f2b31bca6147da3668e9c473fd04b311987dc060391e61a498eb57a"}
 *
 * Go source:
 * PseudoTypeNoResult struct {
 * 	PseudoTypeBase
 * 	Declaration *ast.Node
 * }
 */
export interface PseudoTypeNoResult extends PseudoTypeBase {
  Declaration: GoPtr<Node>;
}

class PseudoTypeNoResultData extends PseudoTypeBaseData implements PseudoTypeNoResult {
  Declaration: GoPtr<Node>;

  constructor(declaration: GoPtr<Node>) {
    super();
    this.Declaration = declaration;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeNoResult","kind":"func","status":"implemented","sigHash":"8770f7871ee64ee34131dc3b1ad2fbb44ac6b69cb3b0dac0ab1c75649c11c02c"}
 *
 * Go source:
 * func NewPseudoTypeNoResult(decl *ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindNoResult, &PseudoTypeNoResult{Declaration: decl})
 * }
 */
export function NewPseudoTypeNoResult(decl: GoPtr<Node>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindNoResult, new PseudoTypeNoResultData(decl));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeNoResult","kind":"method","status":"implemented","sigHash":"19cb7e0addd374dfb96bc7e44b7bc70450c3ec5ff9c89adac3c50f1703e2dc9f"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeNoResult() *PseudoTypeNoResult { return t.data.(*PseudoTypeNoResult) }
 */
export function PseudoType_AsPseudoTypeNoResult(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeNoResult> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeNoResult>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeMaybeConstLocation","kind":"type","status":"implemented","sigHash":"4de0021f15c651d22f0eff636df557dffff1083155899167cb9c8d2e2c0b068d"}
 *
 * Go source:
 * PseudoTypeMaybeConstLocation struct {
 * 	PseudoTypeBase
 * 	Node        *ast.Node
 * 	ConstType   *PseudoType
 * 	RegularType *PseudoType
 * }
 */
export interface PseudoTypeMaybeConstLocation extends PseudoTypeBase {
  Node: GoPtr<Node>;
  ConstType: GoPtr<PseudoType>;
  RegularType: GoPtr<PseudoType>;
}

class PseudoTypeMaybeConstLocationData extends PseudoTypeBaseData implements PseudoTypeMaybeConstLocation {
  Node: GoPtr<Node>;
  ConstType: GoPtr<PseudoType>;
  RegularType: GoPtr<PseudoType>;

  constructor(node: GoPtr<Node>, constType: GoPtr<PseudoType>, regularType: GoPtr<PseudoType>) {
    super();
    this.Node = node;
    this.ConstType = constType;
    this.RegularType = regularType;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeMaybeConstLocation","kind":"func","status":"implemented","sigHash":"e6e5a9e0201ee743500520ed545c9b34338044297287a9fd12c4163df42a4a9e"}
 *
 * Go source:
 * func NewPseudoTypeMaybeConstLocation(loc *ast.Node, ct *PseudoType, reg *PseudoType) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindMaybeConstLocation, &PseudoTypeMaybeConstLocation{Node: loc, ConstType: ct, RegularType: reg})
 * }
 */
export function NewPseudoTypeMaybeConstLocation(loc: GoPtr<Node>, ct: GoPtr<PseudoType>, reg: GoPtr<PseudoType>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindMaybeConstLocation, new PseudoTypeMaybeConstLocationData(loc, ct, reg));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeMaybeConstLocation","kind":"method","status":"implemented","sigHash":"4db17c2a0690534ce5ff18c7e421934a6728e8b382f46622f18b5dcdeeb13263"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeMaybeConstLocation() *PseudoTypeMaybeConstLocation {
 * 	return t.data.(*PseudoTypeMaybeConstLocation)
 * }
 */
export function PseudoType_AsPseudoTypeMaybeConstLocation(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeMaybeConstLocation> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeMaybeConstLocation>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeUnion","kind":"type","status":"implemented","sigHash":"0cd318d18c24a1b756ef3fab59341dad85609ca775ed87ccb4263325d42ec96e"}
 *
 * Go source:
 * PseudoTypeUnion struct {
 * 	PseudoTypeBase
 * 	Types []*PseudoType
 * }
 */
export interface PseudoTypeUnion extends PseudoTypeBase {
  Types: GoSlice<GoPtr<PseudoType>>;
}

class PseudoTypeUnionData extends PseudoTypeBaseData implements PseudoTypeUnion {
  Types: GoSlice<GoPtr<PseudoType>>;

  constructor(types: GoSlice<GoPtr<PseudoType>>) {
    super();
    this.Types = types;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeUnion","kind":"func","status":"implemented","sigHash":"de6ab4aac9ebcffd68af6f3cc6d0f2227729776f4a21718e6c6d11c3f8101072"}
 *
 * Go source:
 * func NewPseudoTypeUnion(types []*PseudoType) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindUnion, &PseudoTypeUnion{Types: types})
 * }
 */
export function NewPseudoTypeUnion(types: GoSlice<GoPtr<PseudoType>>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindUnion, new PseudoTypeUnionData(types));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeUnion","kind":"method","status":"implemented","sigHash":"e65d5369af0bd26c44e1d9c8aa480f537dd21b474186ac9931e57c033cecfac2"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeUnion() *PseudoTypeUnion {
 * 	return t.data.(*PseudoTypeUnion)
 * }
 */
export function PseudoType_AsPseudoTypeUnion(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeUnion> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeUnion>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoParameter","kind":"type","status":"implemented","sigHash":"03a272d502e0e1f4907d96573da9916a949a08d89f9e71b35210044a907c4757"}
 *
 * Go source:
 * PseudoParameter struct {
 * 	Rest     bool
 * 	Name     *ast.Node
 * 	Optional bool
 * 	Type     *PseudoType
 * }
 */
export interface PseudoParameter {
  Rest: bool;
  Name: GoPtr<Node>;
  Optional: bool;
  Type: GoPtr<PseudoType>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoParameter","kind":"func","status":"implemented","sigHash":"e70b1452459e602c1ad05b197850cb9f5f2c6b853e955798da8c00d08d1dece4"}
 *
 * Go source:
 * func NewPseudoParameter(isRest bool, name *ast.Node, isOptional bool, t *PseudoType) *PseudoParameter {
 * 	return &PseudoParameter{Rest: isRest, Name: name, Optional: isOptional, Type: t}
 * }
 */
export function NewPseudoParameter(isRest: bool, name: GoPtr<Node>, isOptional: bool, t: GoPtr<PseudoType>): GoPtr<PseudoParameter> {
  const p: PseudoParameter = {} as PseudoParameter;
  p.Rest = isRest;
  p.Name = name;
  p.Optional = isOptional;
  p.Type = t;
  return p;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeSingleCallSignature","kind":"type","status":"implemented","sigHash":"775f2de4e29f116615fc1c1c171970c39b83da346e1616266b17f7fc4eba9d95"}
 *
 * Go source:
 * PseudoTypeSingleCallSignature struct {
 * 	PseudoTypeBase
 * 	Signature      *ast.Node
 * 	Parameters     []*PseudoParameter
 * 	TypeParameters []*ast.TypeParameterDeclaration
 * 	ReturnType     *PseudoType
 * }
 */
export interface PseudoTypeSingleCallSignature extends PseudoTypeBase {
  Signature: GoPtr<Node>;
  Parameters: GoSlice<GoPtr<PseudoParameter>>;
  TypeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>;
  ReturnType: GoPtr<PseudoType>;
}

class PseudoTypeSingleCallSignatureData extends PseudoTypeBaseData implements PseudoTypeSingleCallSignature {
  Signature: GoPtr<Node>;
  Parameters: GoSlice<GoPtr<PseudoParameter>>;
  TypeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>;
  ReturnType: GoPtr<PseudoType>;

  constructor(
    signature: GoPtr<Node>,
    parameters: GoSlice<GoPtr<PseudoParameter>>,
    typeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>,
    returnType: GoPtr<PseudoType>,
  ) {
    super();
    this.Signature = signature;
    this.Parameters = parameters;
    this.TypeParameters = typeParameters;
    this.ReturnType = returnType;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeSingleCallSignature","kind":"func","status":"implemented","sigHash":"2abedf8c133c6c73caf378944e9b8adcd0b498b912e72e13a5466ef5e0b4c101"}
 *
 * Go source:
 * func NewPseudoTypeSingleCallSignature(signature *ast.Node, parameters []*PseudoParameter, typeParameters []*ast.TypeParameterDeclaration, returnType *PseudoType) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindSingleCallSignature, &PseudoTypeSingleCallSignature{
 * 		Signature:      signature,
 * 		Parameters:     parameters,
 * 		TypeParameters: typeParameters,
 * 		ReturnType:     returnType,
 * 	})
 * }
 */
export function NewPseudoTypeSingleCallSignature(signature: GoPtr<Node>, parameters: GoSlice<GoPtr<PseudoParameter>>, typeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>, returnType: GoPtr<PseudoType>): GoPtr<PseudoType> {
  return newPseudoType(
    PseudoTypeKindSingleCallSignature,
    new PseudoTypeSingleCallSignatureData(signature, parameters, typeParameters, returnType),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeSingleCallSignature","kind":"method","status":"implemented","sigHash":"def5e52d01d21adfe7a1e04be55ba2c739aa7ca3a520a7e913a8407864a6624f"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeSingleCallSignature() *PseudoTypeSingleCallSignature {
 * 	return t.data.(*PseudoTypeSingleCallSignature)
 * }
 */
export function PseudoType_AsPseudoTypeSingleCallSignature(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeSingleCallSignature> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeSingleCallSignature>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeTuple","kind":"type","status":"implemented","sigHash":"bbb542b2b6b3dfd068ad4f26267478d9f3c1e2733da7853563f661c9a789ee41"}
 *
 * Go source:
 * PseudoTypeTuple struct {
 * 	PseudoTypeBase
 * 	Elements []*PseudoType
 * }
 */
export interface PseudoTypeTuple extends PseudoTypeBase {
  Elements: GoSlice<GoPtr<PseudoType>>;
}

class PseudoTypeTupleData extends PseudoTypeBaseData implements PseudoTypeTuple {
  Elements: GoSlice<GoPtr<PseudoType>>;

  constructor(elements: GoSlice<GoPtr<PseudoType>>) {
    super();
    this.Elements = elements;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeTuple","kind":"func","status":"implemented","sigHash":"6fa3e50938e873fa47caa50fbfc649332b36af67255ef5c665f485af6d5b0e95"}
 *
 * Go source:
 * func NewPseudoTypeTuple(elements []*PseudoType) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindTuple, &PseudoTypeTuple{
 * 		Elements: elements,
 * 	})
 * }
 */
export function NewPseudoTypeTuple(elements: GoSlice<GoPtr<PseudoType>>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindTuple, new PseudoTypeTupleData(elements));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeTuple","kind":"method","status":"implemented","sigHash":"c62bed03e8b6c1894a17357afc3adc9d160da81e2b9210275eb4cb6ba5a8d77c"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeTuple() *PseudoTypeTuple {
 * 	return t.data.(*PseudoTypeTuple)
 * }
 */
export function PseudoType_AsPseudoTypeTuple(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeTuple> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeTuple>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoObjectElement","kind":"type","status":"implemented","sigHash":"3be03c8acb395c988719460d904575ff7f8360d6055d238b42f6e692a15894fa"}
 *
 * Go source:
 * PseudoObjectElement struct {
 * 	Name     *ast.Node
 * 	Optional bool
 * 	Kind     PseudoObjectElementKind
 * 	data     pseudoObjectElementData
 * }
 */
export interface PseudoObjectElement {
  Name: GoPtr<Node>;
  Optional: bool;
  Kind: PseudoObjectElementKind;
  data: GoInterface<pseudoObjectElementData>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoObjectElement.AsPseudoObjectElement","kind":"method","status":"implemented","sigHash":"10008f09a79768de8bbf886c04a1ba2d2272b2b1515534af4952fa34a2d56013"}
 *
 * Go source:
 * func (e *PseudoObjectElement) AsPseudoObjectElement() *PseudoObjectElement { return e }
 */
export function PseudoObjectElement_AsPseudoObjectElement(receiver: GoPtr<PseudoObjectElement>): GoPtr<PseudoObjectElement> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoObjectElement.Signature","kind":"method","status":"implemented","sigHash":"51a66c9519792b70164ec6c8be6c6970224e6c70b302e51b4a0113676d26b02f"}
 *
 * Go source:
 * func (e *PseudoObjectElement) Signature() *ast.Node {
 * 	switch e.Kind {
 * 	case PseudoObjectElementKindMethod:
 * 		return e.AsPseudoObjectMethod().Signature
 * 	case PseudoObjectElementKindSetAccessor:
 * 		return e.AsPseudoSetAccessor().Signature
 * 	case PseudoObjectElementKindGetAccessor:
 * 		return e.AsPseudoGetAccessor().Signature
 * 	default:
 * 		return nil
 * 	}
 * }
 */
export function PseudoObjectElement_Signature(receiver: GoPtr<PseudoObjectElement>): GoPtr<Node> {
  switch (receiver!.Kind) {
    case PseudoObjectElementKindMethod:
      return PseudoObjectElement_AsPseudoObjectMethod(receiver)!.Signature;
    case PseudoObjectElementKindSetAccessor:
      return PseudoObjectElement_AsPseudoSetAccessor(receiver)!.Signature;
    case PseudoObjectElementKindGetAccessor:
      return PseudoObjectElement_AsPseudoGetAccessor(receiver)!.Signature;
    default:
      return undefined;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoObjectElementKind","kind":"type","status":"implemented","sigHash":"75fa05afc2d3767bfcc7613cbe93a77242d6c585729db45c13222b50689c0052"}
 *
 * Go source:
 * PseudoObjectElementKind int8
 */
export type PseudoObjectElementKind = sbyte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::constGroup::PseudoObjectElementKindMethod+PseudoObjectElementKindPropertyAssignment+PseudoObjectElementKindSetAccessor+PseudoObjectElementKindGetAccessor","kind":"constGroup","status":"implemented","sigHash":"11b5fed49449b1c3353cd98a149d3acb9c29087bcf3a787152ab4c66ff197323"}
 *
 * Go source:
 * const (
 * 	PseudoObjectElementKindMethod PseudoObjectElementKind = iota
 * 	PseudoObjectElementKindPropertyAssignment
 * 	PseudoObjectElementKindSetAccessor
 * 	PseudoObjectElementKindGetAccessor
 * )
 */
export const PseudoObjectElementKindMethod: PseudoObjectElementKind = 0 as sbyte;
export const PseudoObjectElementKindPropertyAssignment: PseudoObjectElementKind = 1 as sbyte;
export const PseudoObjectElementKindSetAccessor: PseudoObjectElementKind = 2 as sbyte;
export const PseudoObjectElementKindGetAccessor: PseudoObjectElementKind = 3 as sbyte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::pseudoObjectElementData","kind":"type","status":"implemented","sigHash":"84e8709d8b6cabad9571818ae09e4abde1d5cb6e5f91f2e02156cfbb01d1e59d"}
 *
 * Go source:
 * pseudoObjectElementData interface {
 * 	AsPseudoObjectElement() *PseudoObjectElement
 * }
 */
export interface pseudoObjectElementData extends GoInterfaceValue<unknown> {
  AsPseudoObjectElement(): GoPtr<PseudoObjectElement>;
}

class PseudoObjectElementData implements PseudoObjectElement, pseudoObjectElementData {
  Name!: GoPtr<Node>;
  Optional!: bool;
  Kind!: PseudoObjectElementKind;
  data!: GoInterface<pseudoObjectElementData>;

  __tsgoGoReceiver(): GoPtr<PseudoObjectElement> {
    return this;
  }

  AsPseudoObjectElement(): GoPtr<PseudoObjectElement> {
    return PseudoObjectElement_AsPseudoObjectElement(this);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::newPseudoObjectElement","kind":"func","status":"implemented","sigHash":"f0e107343c492c6c34aa73673ce8ed9ade0be7af61b460c8999c3d562d4159d9"}
 *
 * Go source:
 * func newPseudoObjectElement(kind PseudoObjectElementKind, name *ast.Node, optional bool, data pseudoObjectElementData) *PseudoObjectElement {
 * 	e := data.AsPseudoObjectElement()
 * 	e.Kind = kind
 * 	e.Name = name
 * 	e.Optional = optional
 * 	e.data = data
 * 	return e
 * }
 */
export function newPseudoObjectElement(kind: PseudoObjectElementKind, name: GoPtr<Node>, optional: bool, data: GoInterface<pseudoObjectElementData>): GoPtr<PseudoObjectElement> {
  const e = data!.AsPseudoObjectElement();
  e!.Kind = kind;
  e!.Name = name;
  e!.Optional = optional;
  e!.data = data;
  return e;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoObjectMethod","kind":"type","status":"implemented","sigHash":"d0fe35a7f1a42d882d60e8b9c18733821e8d8a5a7fadce7e10f71a2cfd912166"}
 *
 * Go source:
 * PseudoObjectMethod struct {
 * 	PseudoObjectElement
 * 	Signature      *ast.Node
 * 	TypeParameters []*ast.TypeParameterDeclaration
 * 	Parameters     []*PseudoParameter
 * 	ReturnType     *PseudoType
 * }
 */
export interface PseudoObjectMethod extends PseudoObjectElement {
  Signature: GoPtr<Node>;
  TypeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>;
  Parameters: GoSlice<GoPtr<PseudoParameter>>;
  ReturnType: GoPtr<PseudoType>;
}

class PseudoObjectMethodData extends PseudoObjectElementData implements PseudoObjectMethod {
  Signature: GoPtr<Node>;
  TypeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>;
  Parameters: GoSlice<GoPtr<PseudoParameter>>;
  ReturnType: GoPtr<PseudoType>;

  constructor(
    signature: GoPtr<Node>,
    typeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>,
    parameters: GoSlice<GoPtr<PseudoParameter>>,
    returnType: GoPtr<PseudoType>,
  ) {
    super();
    this.Signature = signature;
    this.TypeParameters = typeParameters;
    this.Parameters = parameters;
    this.ReturnType = returnType;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoObjectMethod","kind":"func","status":"implemented","sigHash":"4092aed378242a1721e69c31e61f26bc57300a152f5eddf0445fba25f94da1d7"}
 *
 * Go source:
 * func NewPseudoObjectMethod(signature *ast.Node, name *ast.Node, optional bool, typeParameters []*ast.TypeParameterDeclaration, parameters []*PseudoParameter, returnType *PseudoType) *PseudoObjectElement {
 * 	return newPseudoObjectElement(PseudoObjectElementKindMethod, name, optional, &PseudoObjectMethod{
 * 		Signature:      signature,
 * 		TypeParameters: typeParameters,
 * 		Parameters:     parameters,
 * 		ReturnType:     returnType,
 * 	})
 * }
 */
export function NewPseudoObjectMethod(signature: GoPtr<Node>, name: GoPtr<Node>, optional: bool, typeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>, parameters: GoSlice<GoPtr<PseudoParameter>>, returnType: GoPtr<PseudoType>): GoPtr<PseudoObjectElement> {
  return newPseudoObjectElement(
    PseudoObjectElementKindMethod,
    name,
    optional,
    new PseudoObjectMethodData(signature, typeParameters, parameters, returnType),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoObjectElement.AsPseudoObjectMethod","kind":"method","status":"implemented","sigHash":"fc792984f9e713e6e1b4c20916e0979697d4768803474e193d2be60ae9c6247a"}
 *
 * Go source:
 * func (e *PseudoObjectElement) AsPseudoObjectMethod() *PseudoObjectMethod {
 * 	return e.data.(*PseudoObjectMethod)
 * }
 */
export function PseudoObjectElement_AsPseudoObjectMethod(receiver: GoPtr<PseudoObjectElement>): GoPtr<PseudoObjectMethod> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoObjectMethod>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoPropertyAssignment","kind":"type","status":"implemented","sigHash":"d0cdd2f2d04e8482935967a49d0964636327a6e29bf586079a237a732163ef2a"}
 *
 * Go source:
 * PseudoPropertyAssignment struct {
 * 	PseudoObjectElement
 * 	Readonly bool
 * 	Type     *PseudoType
 * }
 */
export interface PseudoPropertyAssignment extends PseudoObjectElement {
  Readonly: bool;
  Type: GoPtr<PseudoType>;
}

class PseudoPropertyAssignmentData extends PseudoObjectElementData implements PseudoPropertyAssignment {
  Readonly: bool;
  Type: GoPtr<PseudoType>;

  constructor(readonly: bool, type: GoPtr<PseudoType>) {
    super();
    this.Readonly = readonly;
    this.Type = type;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoPropertyAssignment","kind":"func","status":"implemented","sigHash":"a10ea7d043613ca66ab2d1247149632eedb080a95eab4bfdbb80462f032737ea"}
 *
 * Go source:
 * func NewPseudoPropertyAssignment(readonly bool, name *ast.Node, optional bool, t *PseudoType) *PseudoObjectElement {
 * 	return newPseudoObjectElement(PseudoObjectElementKindPropertyAssignment, name, optional, &PseudoPropertyAssignment{
 * 		Readonly: readonly,
 * 		Type:     t,
 * 	})
 * }
 */
export function NewPseudoPropertyAssignment(readonly: bool, name: GoPtr<Node>, optional: bool, t: GoPtr<PseudoType>): GoPtr<PseudoObjectElement> {
  return newPseudoObjectElement(
    PseudoObjectElementKindPropertyAssignment,
    name,
    optional,
    new PseudoPropertyAssignmentData(readonly, t),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoObjectElement.AsPseudoPropertyAssignment","kind":"method","status":"implemented","sigHash":"b87e9c790573378347cb63043fab48747ba7bb90f7e88570fc0e18e44ca58524"}
 *
 * Go source:
 * func (e *PseudoObjectElement) AsPseudoPropertyAssignment() *PseudoPropertyAssignment {
 * 	return e.data.(*PseudoPropertyAssignment)
 * }
 */
export function PseudoObjectElement_AsPseudoPropertyAssignment(receiver: GoPtr<PseudoObjectElement>): GoPtr<PseudoPropertyAssignment> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoPropertyAssignment>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoSetAccessor","kind":"type","status":"implemented","sigHash":"7f3dd71422cb6536e625c46cbf64c0a616d2d7942d9e679a0b26a488d9329ba2"}
 *
 * Go source:
 * PseudoSetAccessor struct {
 * 	PseudoObjectElement
 * 	Signature *ast.Node
 * 	Parameter *PseudoParameter
 * }
 */
export interface PseudoSetAccessor extends PseudoObjectElement {
  Signature: GoPtr<Node>;
  Parameter: GoPtr<PseudoParameter>;
}

class PseudoSetAccessorData extends PseudoObjectElementData implements PseudoSetAccessor {
  Signature: GoPtr<Node>;
  Parameter: GoPtr<PseudoParameter>;

  constructor(signature: GoPtr<Node>, parameter: GoPtr<PseudoParameter>) {
    super();
    this.Signature = signature;
    this.Parameter = parameter;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoSetAccessor","kind":"func","status":"implemented","sigHash":"311b865fccdb4cea34e429bfad8b8a428c0ab2e5323481cc22efb3fcdad047af"}
 *
 * Go source:
 * func NewPseudoSetAccessor(signature *ast.Node, name *ast.Node, optional bool, p *PseudoParameter) *PseudoObjectElement {
 * 	return newPseudoObjectElement(PseudoObjectElementKindSetAccessor, name, optional, &PseudoSetAccessor{
 * 		Signature: signature,
 * 		Parameter: p,
 * 	})
 * }
 */
export function NewPseudoSetAccessor(signature: GoPtr<Node>, name: GoPtr<Node>, optional: bool, p: GoPtr<PseudoParameter>): GoPtr<PseudoObjectElement> {
  return newPseudoObjectElement(
    PseudoObjectElementKindSetAccessor,
    name,
    optional,
    new PseudoSetAccessorData(signature, p),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoObjectElement.AsPseudoSetAccessor","kind":"method","status":"implemented","sigHash":"4b66eec659dac5fbfb7b0c86078729b63354640371499fc8e21784f6ed7f825b"}
 *
 * Go source:
 * func (e *PseudoObjectElement) AsPseudoSetAccessor() *PseudoSetAccessor {
 * 	return e.data.(*PseudoSetAccessor)
 * }
 */
export function PseudoObjectElement_AsPseudoSetAccessor(receiver: GoPtr<PseudoObjectElement>): GoPtr<PseudoSetAccessor> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoSetAccessor>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoGetAccessor","kind":"type","status":"implemented","sigHash":"d4f320ef34206fcfacebead68ec7ab319c1bc26ee7f0146aca5392dce97d9805"}
 *
 * Go source:
 * PseudoGetAccessor struct {
 * 	PseudoObjectElement
 * 	Signature *ast.Node
 * 	Type      *PseudoType
 * }
 */
export interface PseudoGetAccessor extends PseudoObjectElement {
  Signature: GoPtr<Node>;
  Type: GoPtr<PseudoType>;
}

class PseudoGetAccessorData extends PseudoObjectElementData implements PseudoGetAccessor {
  Signature: GoPtr<Node>;
  Type: GoPtr<PseudoType>;

  constructor(signature: GoPtr<Node>, type: GoPtr<PseudoType>) {
    super();
    this.Signature = signature;
    this.Type = type;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoGetAccessor","kind":"func","status":"implemented","sigHash":"f32e9241b76a4babc1be01a79d00b857fb6b70e2ed7edbab7f810f50e5d7c02d"}
 *
 * Go source:
 * func NewPseudoGetAccessor(signature *ast.Node, name *ast.Node, optional bool, t *PseudoType) *PseudoObjectElement {
 * 	return newPseudoObjectElement(PseudoObjectElementKindGetAccessor, name, optional, &PseudoGetAccessor{
 * 		Signature: signature,
 * 		Type:      t,
 * 	})
 * }
 */
export function NewPseudoGetAccessor(signature: GoPtr<Node>, name: GoPtr<Node>, optional: bool, t: GoPtr<PseudoType>): GoPtr<PseudoObjectElement> {
  return newPseudoObjectElement(
    PseudoObjectElementKindGetAccessor,
    name,
    optional,
    new PseudoGetAccessorData(signature, t),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoObjectElement.AsPseudoGetAccessor","kind":"method","status":"implemented","sigHash":"2b9ec410608d40d8cf7cc5397fa3bf4ccc6002269625cb1bab730e51ec40a3d9"}
 *
 * Go source:
 * func (e *PseudoObjectElement) AsPseudoGetAccessor() *PseudoGetAccessor {
 * 	return e.data.(*PseudoGetAccessor)
 * }
 */
export function PseudoObjectElement_AsPseudoGetAccessor(receiver: GoPtr<PseudoObjectElement>): GoPtr<PseudoGetAccessor> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoGetAccessor>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeObjectLiteral","kind":"type","status":"implemented","sigHash":"377feff4ba5a4d2e5aa6dff27036c4793af1a5e8995e77196469ff2607e8fc66"}
 *
 * Go source:
 * PseudoTypeObjectLiteral struct {
 * 	PseudoTypeBase
 * 	Elements []*PseudoObjectElement
 * }
 */
export interface PseudoTypeObjectLiteral extends PseudoTypeBase {
  Elements: GoSlice<GoPtr<PseudoObjectElement>>;
}

class PseudoTypeObjectLiteralData extends PseudoTypeBaseData implements PseudoTypeObjectLiteral {
  Elements: GoSlice<GoPtr<PseudoObjectElement>>;

  constructor(elements: GoSlice<GoPtr<PseudoObjectElement>>) {
    super();
    this.Elements = elements;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeObjectLiteral","kind":"func","status":"implemented","sigHash":"3e3857fc04138ddb4d59be4d4dfb16bf1545a07d23f2be7592f7e453c79b4532"}
 *
 * Go source:
 * func NewPseudoTypeObjectLiteral(elements []*PseudoObjectElement) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindObjectLiteral, &PseudoTypeObjectLiteral{
 * 		Elements: elements,
 * 	})
 * }
 */
export function NewPseudoTypeObjectLiteral(elements: GoSlice<GoPtr<PseudoObjectElement>>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindObjectLiteral, new PseudoTypeObjectLiteralData(elements));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeObjectLiteral","kind":"method","status":"implemented","sigHash":"57483ad46767b822fd64f439275ad6d8c4208ac05481fea2609524e95b9cc069"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeObjectLiteral() *PseudoTypeObjectLiteral {
 * 	return t.data.(*PseudoTypeObjectLiteral)
 * }
 */
export function PseudoType_AsPseudoTypeObjectLiteral(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeObjectLiteral> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeObjectLiteral>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeLiteral","kind":"type","status":"implemented","sigHash":"1891f91bef35d921093d3b033c48712e9288733839473a73fa9018c89f91217e"}
 *
 * Go source:
 * PseudoTypeLiteral struct {
 * 	PseudoTypeBase
 * 	Node *ast.Node
 * }
 */
export interface PseudoTypeLiteral extends PseudoTypeBase {
  Node: GoPtr<Node>;
}

class PseudoTypeLiteralData extends PseudoTypeBaseData implements PseudoTypeLiteral {
  Node: GoPtr<Node>;

  constructor(node: GoPtr<Node>) {
    super();
    this.Node = node;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeStringLiteral","kind":"func","status":"implemented","sigHash":"419092da265483021824191954ffee2b51e84ddedc232855137a729bdb37585f"}
 *
 * Go source:
 * func NewPseudoTypeStringLiteral(node *ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindStringLiteral, &PseudoTypeLiteral{
 * 		Node: node,
 * 	})
 * }
 */
export function NewPseudoTypeStringLiteral(node: GoPtr<Node>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindStringLiteral, new PseudoTypeLiteralData(node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeNumericLiteral","kind":"func","status":"implemented","sigHash":"eebe3f19a120c5c41d057c36530fb954edd604f80e58b795c305893ba418487e"}
 *
 * Go source:
 * func NewPseudoTypeNumericLiteral(node *ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindNumericLiteral, &PseudoTypeLiteral{
 * 		Node: node,
 * 	})
 * }
 */
export function NewPseudoTypeNumericLiteral(node: GoPtr<Node>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindNumericLiteral, new PseudoTypeLiteralData(node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::func::NewPseudoTypeBigIntLiteral","kind":"func","status":"implemented","sigHash":"ff6c17add5f3c1f9949d0fda4720d1c2a0e6cae945284e71bfcab7f64790f49b"}
 *
 * Go source:
 * func NewPseudoTypeBigIntLiteral(node *ast.Node) *PseudoType {
 * 	return newPseudoType(PseudoTypeKindBigIntLiteral, &PseudoTypeLiteral{
 * 		Node: node,
 * 	})
 * }
 */
export function NewPseudoTypeBigIntLiteral(node: GoPtr<Node>): GoPtr<PseudoType> {
  return newPseudoType(PseudoTypeKindBigIntLiteral, new PseudoTypeLiteralData(node));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoType.AsPseudoTypeLiteral","kind":"method","status":"implemented","sigHash":"d653a6c89a059518945ee573aed54cedbbf8a37912edb4e4ab44ca0c830ef253"}
 *
 * Go source:
 * func (t *PseudoType) AsPseudoTypeLiteral() *PseudoTypeLiteral {
 * 	return t.data.(*PseudoTypeLiteral)
 * }
 */
export function PseudoType_AsPseudoTypeLiteral(receiver: GoPtr<PseudoType>): GoPtr<PseudoTypeLiteral> {
  return receiver!.data!.__tsgoGoReceiver() as GoPtr<PseudoTypeLiteral>;
}
