import type { bool, sbyte, short } from "../../go/scalars.js";
import type { GoInterfaceValue, GoPtr, GoSlice } from "../../go/compat.js";
import type { Node } from "../ast/spine.js";
import type { TypeParameterDeclaration } from "../ast/generated/data.js";

import type { GoInterface } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceMake } from "../../go/compat.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeKind","kind":"type","status":"implemented","sigHash":"5e0117670ed21a396d4ef334e19781bf70c372e9558cf5ee02dd9a427e6bd841"}
 *
 * Go source:
 * PseudoTypeKind int16
 */
export type PseudoTypeKind = short;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::constGroup::PseudoTypeKindDirect+PseudoTypeKindInferred+PseudoTypeKindNoResult+PseudoTypeKindMaybeConstLocation+PseudoTypeKindUnion+PseudoTypeKindUndefined+PseudoTypeKindNull+PseudoTypeKindAny+PseudoTypeKindString+PseudoTypeKindNumber+PseudoTypeKindBigInt+PseudoTypeKindBoolean+PseudoTypeKindFalse+PseudoTypeKindTrue+PseudoTypeKindSingleCallSignature+PseudoTypeKindTuple+PseudoTypeKindObjectLiteral+PseudoTypeKindStringLiteral+PseudoTypeKindNumericLiteral+PseudoTypeKindBigIntLiteral","kind":"constGroup","status":"implemented","sigHash":"969a994a2af9435c20bcd90f7e7640d4f32b17053e0aca21a8ca2edaf344bd2e"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoType","kind":"type","status":"implemented","sigHash":"13a346d4a802f947c3798f16bdb2c89ec651d84c7266a5cf11f3f60d95250741"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::pseudoTypeData","kind":"type","status":"implemented","sigHash":"1cd120020bff59dbedb7d39329bdb4a5e9092fc363e0a2c8610eed5715d98bf5"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The interface receiver carrier adds the static Go receiver operation required to preserve dynamic pseudo-type dispatch without a side table or wrapper object.","goSignatureHash":"d27167a5c55e4e50d30b7f9a84b0b554acbf7231271959e73f01c8251eecedbb","tsSignatureHash":"2a554099e6ecb17a250610734ea99e020f3cc9e6f5bb14b29ecceafaf2fb5530"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeDefault","kind":"type","status":"implemented","sigHash":"f1e63826887b8865eea3a692b0b41860923b2d80c1ae61eb96afb77b304badd8"}
 *
 * Go source:
 * PseudoTypeDefault struct {
 * 	PseudoType
 * }
 */
export interface PseudoTypeDefault {
  __tsgoEmbedded0: PseudoType;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::method::PseudoTypeDefault.AsPseudoType","kind":"method","status":"implemented","sigHash":"2c795a57812741a4cd0e11255d67dd53d932fab81b07c379ef9bc28152a500eb"}
 *
 * Go source:
 * func (b *PseudoTypeDefault) AsPseudoType() *PseudoType { return &b.PseudoType }
 */
export function PseudoTypeDefault_AsPseudoType(receiver: GoPtr<PseudoTypeDefault>): GoPtr<PseudoType> {
  return receiver!.__tsgoEmbedded0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeBase","kind":"type","status":"implemented","sigHash":"037d05f16c567001cc1e5a0589f59df9a9148716928c319fb21532e8a635fb77"}
 *
 * Go source:
 * PseudoTypeBase struct {
 * 	PseudoTypeDefault
 * }
 */
export interface PseudoTypeBase {
  __tsgoEmbedded0: PseudoTypeDefault;
}

class PseudoTypeBaseData implements PseudoTypeBase, pseudoTypeData {
  __tsgoEmbedded0: PseudoTypeDefault = {
    __tsgoEmbedded0: {
      Kind: PseudoTypeKindDirect,
      data: undefined,
    },
  };

  __tsgoGoReceiver(): GoPtr<PseudoTypeBase> {
    return this;
  }

  AsPseudoType(): GoPtr<PseudoType> {
    return PseudoTypeDefault_AsPseudoType(this.__tsgoEmbedded0);
  }
}

abstract class PseudoTypeBaseEmbeddedData<TReceiver> implements pseudoTypeData {
  abstract __tsgoEmbedded0: PseudoTypeBaseData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsPseudoType(): GoPtr<PseudoType> {
    return this.__tsgoEmbedded0.AsPseudoType();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::varGroup::PseudoTypeUndefined+PseudoTypeNull+PseudoTypeAny+PseudoTypeString+PseudoTypeNumber+PseudoTypeBigInt+PseudoTypeBoolean+PseudoTypeFalse+PseudoTypeTrue","kind":"varGroup","status":"implemented","sigHash":"8ad68a56e30a72585cf5d5fcfc296d649f3615311adf0834334867aa31902c44"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeDirect","kind":"type","status":"implemented","sigHash":"1605673114a3a5119938a5becc9a84a8fe958d33a02f8bb9b24bcf17bd0c5768"}
 *
 * Go source:
 * PseudoTypeDirect struct {
 * 	PseudoTypeBase
 * 	TypeNode *ast.Node
 * }
 */
export interface PseudoTypeDirect {
  __tsgoEmbedded0: PseudoTypeBase;
  TypeNode: GoPtr<Node>;
}

class PseudoTypeDirectData extends PseudoTypeBaseEmbeddedData<PseudoTypeDirect> implements PseudoTypeDirect {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  TypeNode: GoPtr<Node>;

  constructor(typeNode: GoPtr<Node>) {
    super();
    this.TypeNode = typeNode;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeDirect> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeInferred","kind":"type","status":"implemented","sigHash":"8f6e78e38102dc0b42e7ca8814462b9541dab0f1c4aab25d1c2644a0dca60f9b"}
 *
 * Go source:
 * PseudoTypeInferred struct {
 * 	PseudoTypeBase
 * 	Expression *ast.Node
 * 	ErrorNodes []*ast.Node
 * }
 */
export interface PseudoTypeInferred {
  __tsgoEmbedded0: PseudoTypeBase;
  Expression: GoPtr<Node>;
  ErrorNodes: GoSlice<GoPtr<Node>>;
}

class PseudoTypeInferredData extends PseudoTypeBaseEmbeddedData<PseudoTypeInferred> implements PseudoTypeInferred {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Expression: GoPtr<Node>;
  ErrorNodes: GoSlice<GoPtr<Node>>;

  constructor(expression: GoPtr<Node>, errorNodes: GoSlice<GoPtr<Node>>) {
    super();
    this.Expression = expression;
    this.ErrorNodes = errorNodes;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeInferred> {
    return this;
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
  return newPseudoType(PseudoTypeKindInferred, new PseudoTypeInferredData(expr, GoSliceMake(0, 0, GoPointerValueOps<Node>())));
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeNoResult","kind":"type","status":"implemented","sigHash":"4c146bb1507b20d73703e1d589db21dd1a38aa6cc6d2e45680cc83b452cf20bc"}
 *
 * Go source:
 * PseudoTypeNoResult struct {
 * 	PseudoTypeBase
 * 	Declaration *ast.Node
 * }
 */
export interface PseudoTypeNoResult {
  __tsgoEmbedded0: PseudoTypeBase;
  Declaration: GoPtr<Node>;
}

class PseudoTypeNoResultData extends PseudoTypeBaseEmbeddedData<PseudoTypeNoResult> implements PseudoTypeNoResult {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Declaration: GoPtr<Node>;

  constructor(declaration: GoPtr<Node>) {
    super();
    this.Declaration = declaration;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeNoResult> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeMaybeConstLocation","kind":"type","status":"implemented","sigHash":"64042e0ffa56ad3745214a05696d1ef7c2845c21ed3d21458f995ceb6258d637"}
 *
 * Go source:
 * PseudoTypeMaybeConstLocation struct {
 * 	PseudoTypeBase
 * 	Node        *ast.Node
 * 	ConstType   *PseudoType
 * 	RegularType *PseudoType
 * }
 */
export interface PseudoTypeMaybeConstLocation {
  __tsgoEmbedded0: PseudoTypeBase;
  Node: GoPtr<Node>;
  ConstType: GoPtr<PseudoType>;
  RegularType: GoPtr<PseudoType>;
}

class PseudoTypeMaybeConstLocationData extends PseudoTypeBaseEmbeddedData<PseudoTypeMaybeConstLocation> implements PseudoTypeMaybeConstLocation {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Node: GoPtr<Node>;
  ConstType: GoPtr<PseudoType>;
  RegularType: GoPtr<PseudoType>;

  constructor(node: GoPtr<Node>, constType: GoPtr<PseudoType>, regularType: GoPtr<PseudoType>) {
    super();
    this.Node = node;
    this.ConstType = constType;
    this.RegularType = regularType;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeMaybeConstLocation> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeUnion","kind":"type","status":"implemented","sigHash":"117b65c5c6e44dbd460b6d14df45e4d2781bc90eed1368443b0a2b649be0f4b4"}
 *
 * Go source:
 * PseudoTypeUnion struct {
 * 	PseudoTypeBase
 * 	Types []*PseudoType
 * }
 */
export interface PseudoTypeUnion {
  __tsgoEmbedded0: PseudoTypeBase;
  Types: GoSlice<GoPtr<PseudoType>>;
}

class PseudoTypeUnionData extends PseudoTypeBaseEmbeddedData<PseudoTypeUnion> implements PseudoTypeUnion {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Types: GoSlice<GoPtr<PseudoType>>;

  constructor(types: GoSlice<GoPtr<PseudoType>>) {
    super();
    this.Types = types;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeUnion> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoParameter","kind":"type","status":"implemented","sigHash":"fd76f136a736b61bfa1830bfec6933cbc2b446081db26a240c619d56dfc5b54d"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeSingleCallSignature","kind":"type","status":"implemented","sigHash":"3ce2396888836fbe382731b72b91748a3ff04de62a654eea5385b50fc2f599ca"}
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
export interface PseudoTypeSingleCallSignature {
  __tsgoEmbedded0: PseudoTypeBase;
  Signature: GoPtr<Node>;
  Parameters: GoSlice<GoPtr<PseudoParameter>>;
  TypeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>;
  ReturnType: GoPtr<PseudoType>;
}

class PseudoTypeSingleCallSignatureData extends PseudoTypeBaseEmbeddedData<PseudoTypeSingleCallSignature> implements PseudoTypeSingleCallSignature {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
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

  __tsgoGoReceiver(): GoPtr<PseudoTypeSingleCallSignature> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeTuple","kind":"type","status":"implemented","sigHash":"90c646c52369ae3856d9f7194a347939e36f211ac782fb5e87939c28031fd27a"}
 *
 * Go source:
 * PseudoTypeTuple struct {
 * 	PseudoTypeBase
 * 	Elements []*PseudoType
 * }
 */
export interface PseudoTypeTuple {
  __tsgoEmbedded0: PseudoTypeBase;
  Elements: GoSlice<GoPtr<PseudoType>>;
}

class PseudoTypeTupleData extends PseudoTypeBaseEmbeddedData<PseudoTypeTuple> implements PseudoTypeTuple {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Elements: GoSlice<GoPtr<PseudoType>>;

  constructor(elements: GoSlice<GoPtr<PseudoType>>) {
    super();
    this.Elements = elements;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeTuple> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoObjectElement","kind":"type","status":"implemented","sigHash":"4153dfadbf73362865e4678a9a46658660250a48ef649604e6963c42525076b8"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoObjectElementKind","kind":"type","status":"implemented","sigHash":"0fa05fdb4aeebda24017a3a78b0b5205767da699aba2e87d218db8d41b02890b"}
 *
 * Go source:
 * PseudoObjectElementKind int8
 */
export type PseudoObjectElementKind = sbyte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::constGroup::PseudoObjectElementKindMethod+PseudoObjectElementKindPropertyAssignment+PseudoObjectElementKindSetAccessor+PseudoObjectElementKindGetAccessor","kind":"constGroup","status":"implemented","sigHash":"3a27a02a6f1335180a6997400ebfda63cbe9a0183c4d1ce45b6dd83e89799754"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::pseudoObjectElementData","kind":"type","status":"implemented","sigHash":"229775d39ea08f6de3e31abb27d1516b249b0d4cc805c244b676526cf84cf8b3"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"The interface receiver carrier adds the static Go receiver operation required to preserve dynamic pseudo-element dispatch without a side table or wrapper object.","goSignatureHash":"e55c690f70723b9e13dfafd09eff15e50e59e11b3130d686f4c10920469ed4ef","tsSignatureHash":"7c2b05b2130b39a5b696d8991c9fd732753977dd117aeb47246ec533cc53c6cc"}
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

abstract class PseudoObjectElementEmbeddedData<TReceiver> implements pseudoObjectElementData {
  abstract __tsgoEmbedded0: PseudoObjectElementData;
  abstract __tsgoGoReceiver(): GoPtr<TReceiver>;

  AsPseudoObjectElement(): GoPtr<PseudoObjectElement> {
    return this.__tsgoEmbedded0.AsPseudoObjectElement();
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoObjectMethod","kind":"type","status":"implemented","sigHash":"63ef8f7bddd89c7996cdd5aeb98a7121072de02865103788db0936b96fdf5de0"}
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
export interface PseudoObjectMethod {
  __tsgoEmbedded0: PseudoObjectElement;
  Signature: GoPtr<Node>;
  TypeParameters: GoSlice<GoPtr<TypeParameterDeclaration>>;
  Parameters: GoSlice<GoPtr<PseudoParameter>>;
  ReturnType: GoPtr<PseudoType>;
}

class PseudoObjectMethodData extends PseudoObjectElementEmbeddedData<PseudoObjectMethod> implements PseudoObjectMethod {
  __tsgoEmbedded0: PseudoObjectElementData = new PseudoObjectElementData();
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

  __tsgoGoReceiver(): GoPtr<PseudoObjectMethod> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoPropertyAssignment","kind":"type","status":"implemented","sigHash":"0bb016d7b3a582bff44e4777e81fbf94f54b50ab5f824c1bed0a29a7d2b5a5d0"}
 *
 * Go source:
 * PseudoPropertyAssignment struct {
 * 	PseudoObjectElement
 * 	Readonly bool
 * 	Type     *PseudoType
 * }
 */
export interface PseudoPropertyAssignment {
  __tsgoEmbedded0: PseudoObjectElement;
  Readonly: bool;
  Type: GoPtr<PseudoType>;
}

class PseudoPropertyAssignmentData extends PseudoObjectElementEmbeddedData<PseudoPropertyAssignment> implements PseudoPropertyAssignment {
  __tsgoEmbedded0: PseudoObjectElementData = new PseudoObjectElementData();
  Readonly: bool;
  Type: GoPtr<PseudoType>;

  constructor(readonly: bool, type: GoPtr<PseudoType>) {
    super();
    this.Readonly = readonly;
    this.Type = type;
  }

  __tsgoGoReceiver(): GoPtr<PseudoPropertyAssignment> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoSetAccessor","kind":"type","status":"implemented","sigHash":"b5f44b6e0a864c36a58e8d3ebcbcc86804c53ceb0895e782fb66c1535c584aa5"}
 *
 * Go source:
 * PseudoSetAccessor struct {
 * 	PseudoObjectElement
 * 	Signature *ast.Node
 * 	Parameter *PseudoParameter
 * }
 */
export interface PseudoSetAccessor {
  __tsgoEmbedded0: PseudoObjectElement;
  Signature: GoPtr<Node>;
  Parameter: GoPtr<PseudoParameter>;
}

class PseudoSetAccessorData extends PseudoObjectElementEmbeddedData<PseudoSetAccessor> implements PseudoSetAccessor {
  __tsgoEmbedded0: PseudoObjectElementData = new PseudoObjectElementData();
  Signature: GoPtr<Node>;
  Parameter: GoPtr<PseudoParameter>;

  constructor(signature: GoPtr<Node>, parameter: GoPtr<PseudoParameter>) {
    super();
    this.Signature = signature;
    this.Parameter = parameter;
  }

  __tsgoGoReceiver(): GoPtr<PseudoSetAccessor> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoGetAccessor","kind":"type","status":"implemented","sigHash":"7f0a57dcb2a4e5d3b2985ef8a5a6613426365ac7d9719541722951117ff52547"}
 *
 * Go source:
 * PseudoGetAccessor struct {
 * 	PseudoObjectElement
 * 	Signature *ast.Node
 * 	Type      *PseudoType
 * }
 */
export interface PseudoGetAccessor {
  __tsgoEmbedded0: PseudoObjectElement;
  Signature: GoPtr<Node>;
  Type: GoPtr<PseudoType>;
}

class PseudoGetAccessorData extends PseudoObjectElementEmbeddedData<PseudoGetAccessor> implements PseudoGetAccessor {
  __tsgoEmbedded0: PseudoObjectElementData = new PseudoObjectElementData();
  Signature: GoPtr<Node>;
  Type: GoPtr<PseudoType>;

  constructor(signature: GoPtr<Node>, type: GoPtr<PseudoType>) {
    super();
    this.Signature = signature;
    this.Type = type;
  }

  __tsgoGoReceiver(): GoPtr<PseudoGetAccessor> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeObjectLiteral","kind":"type","status":"implemented","sigHash":"6957b55584177826bf7cd76ae4e2a51550593f7eb56b64c6449b757b501ab941"}
 *
 * Go source:
 * PseudoTypeObjectLiteral struct {
 * 	PseudoTypeBase
 * 	Elements []*PseudoObjectElement
 * }
 */
export interface PseudoTypeObjectLiteral {
  __tsgoEmbedded0: PseudoTypeBase;
  Elements: GoSlice<GoPtr<PseudoObjectElement>>;
}

class PseudoTypeObjectLiteralData extends PseudoTypeBaseEmbeddedData<PseudoTypeObjectLiteral> implements PseudoTypeObjectLiteral {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Elements: GoSlice<GoPtr<PseudoObjectElement>>;

  constructor(elements: GoSlice<GoPtr<PseudoObjectElement>>) {
    super();
    this.Elements = elements;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeObjectLiteral> {
    return this;
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pseudochecker/type.go::type::PseudoTypeLiteral","kind":"type","status":"implemented","sigHash":"638149efffcd33a0fa9b37731f2a8ad720e3ef130762338f77470437bad3e04c"}
 *
 * Go source:
 * PseudoTypeLiteral struct {
 * 	PseudoTypeBase
 * 	Node *ast.Node
 * }
 */
export interface PseudoTypeLiteral {
  __tsgoEmbedded0: PseudoTypeBase;
  Node: GoPtr<Node>;
}

class PseudoTypeLiteralData extends PseudoTypeBaseEmbeddedData<PseudoTypeLiteral> implements PseudoTypeLiteral {
  __tsgoEmbedded0: PseudoTypeBaseData = new PseudoTypeBaseData();
  Node: GoPtr<Node>;

  constructor(node: GoPtr<Node>) {
    super();
    this.Node = node;
  }

  __tsgoGoReceiver(): GoPtr<PseudoTypeLiteral> {
    return this;
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
