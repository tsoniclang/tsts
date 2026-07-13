import type { bool, byte } from "../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../go/compat.js";
import {
  Deterministic as json_Deterministic,
  JsonFieldNames,
  Marshal as json_Marshal,
  MarshalEncode as json_MarshalEncode,
  MarshalWrite as json_MarshalWrite,
  Unmarshal as json_Unmarshal,
  UnmarshalDecode as json_UnmarshalDecode,
  UnmarshalRead as json_UnmarshalRead,
} from "../../go/github.com/go-json-experiment/json.js";
import type { MarshalerTo as MarshalerTo_fd081708, Options, UnmarshalerFrom as UnmarshalerFrom_68b23da1 } from "../../go/github.com/go-json-experiment/json.js";
import type { GoInterface } from "../../go/compat.js";
export { JsonFieldNames };
export type { JsonFieldName, JsonFieldNameMap, JsonFieldSpec } from "../../go/github.com/go-json-experiment/json.js";
import {
  AllowDuplicateNames as jsontext_AllowDuplicateNames,
  AllowInvalidUTF8 as jsontext_AllowInvalidUTF8,
  NewDecoder as jsontext_NewDecoder,
  WithIndent as jsontext_WithIndent,
  WithIndentPrefix as jsontext_WithIndentPrefix,
} from "../../go/github.com/go-json-experiment/json/jsontext.js";
import type { Decoder as Decoder_d2f8186c, Encoder as Encoder_517f1597, Kind as Kind_c0fe0b38, Token as Token_b612ce55, Value as Value_6b3f2abd } from "../../go/github.com/go-json-experiment/json/jsontext.js";
import {
  BeginArray as BeginArray_jsontext,
  BeginObject as BeginObject_jsontext,
  EndArray as EndArray_jsontext,
  EndObject as EndObject_jsontext,
  Null as Null_jsontext,
} from "../../go/github.com/go-json-experiment/json/jsontext.js";
import type { Reader, Writer } from "../../go/io.js";
import { Clip } from "../../go/slices.js";

export type JsonFieldNamesForGoStructContract<T, Id extends string, Fields> = T & {
  readonly __jsonFieldNamesForGoStructContract?: readonly [Id, Fields];
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::varGroup::allowInvalid","kind":"varGroup","status":"implemented","sigHash":"4ca491a9062bcfff59a0c9819d0cecd849aa6ca334c47b7dbcc5fa97d2f6b829"}
 *
 * Go source:
 * var allowInvalid []json.Options = slices.Clip([]json.Options{jsontext.AllowInvalidUTF8(true)})
 */
export let allowInvalid: GoSlice<Options> = Clip([jsontext_AllowInvalidUTF8(true) as Options]);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::Marshal","kind":"func","status":"implemented","sigHash":"dae80d7bc275a95555465a2200ab5240a71e863562a537cf8f91a6c5974667fe"}
 *
 * Go source:
 * func Marshal(in any, opts ...json.Options) (out []byte, err error) {
 * 	if len(opts) == 0 {
 * 		opts = allowInvalid
 * 	} else {
 * 		opts = append(allowInvalid, opts...)
 * 	}
 * 	return json.Marshal(in, opts...)
 * }
 */
export function Marshal(in_: GoInterface<unknown>, ...opts: Array<Options>): [GoSlice<byte>, GoError] {
  const resolvedOpts: Array<Options> = opts.length === 0 ? allowInvalid : [...allowInvalid, ...opts];
  return json_Marshal(in_, ...resolvedOpts) as [GoSlice<byte>, GoError];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::MarshalEncode","kind":"func","status":"implemented","sigHash":"876eaa7e5d21bc38d2cc381cf997fc364d44f02df48a8152e394ed87943ec8da"}
 *
 * Go source:
 * func MarshalEncode(out *jsontext.Encoder, in any, opts ...json.Options) (err error) {
 * 	if len(opts) == 0 {
 * 		opts = allowInvalid
 * 	} else {
 * 		opts = append(allowInvalid, opts...)
 * 	}
 * 	return json.MarshalEncode(out, in, opts...)
 * }
 */
export function MarshalEncode(out: GoPtr<Encoder_517f1597>, in_: GoInterface<unknown>, ...opts: Array<Options>): GoError {
  const resolvedOpts: Array<Options> = opts.length === 0 ? allowInvalid : [...allowInvalid, ...opts];
  return json_MarshalEncode(out, in_, ...resolvedOpts) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::MarshalWrite","kind":"func","status":"implemented","sigHash":"97457c6dd9e39db0c9b18dd56661fe7a489b468f2033587d55b529dea944e976"}
 *
 * Go source:
 * func MarshalWrite(out io.Writer, in any, opts ...json.Options) (err error) {
 * 	if len(opts) == 0 {
 * 		opts = allowInvalid
 * 	} else {
 * 		opts = append(allowInvalid, opts...)
 * 	}
 * 	return json.MarshalWrite(out, in, opts...)
 * }
 */
export function MarshalWrite(out: GoInterface<Writer>, in_: GoInterface<unknown>, ...opts: Array<Options>): GoError {
  const resolvedOpts: Array<Options> = opts.length === 0 ? allowInvalid : [...allowInvalid, ...opts];
  return json_MarshalWrite(out!, in_, ...resolvedOpts) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::MarshalIndent","kind":"func","status":"implemented","sigHash":"d26f45ea8f2b4a34c03b5dc67ff89eb14656056ef9efcc74923cf5153abac298"}
 *
 * Go source:
 * func MarshalIndent(in any, prefix, indent string) (out []byte, err error) {
 * 	if prefix == "" && indent == "" {
 * 		// WithIndentPrefix and WithIndent imply multiline output, so skip them.
 * 		return Marshal(in)
 * 	}
 * 	return Marshal(in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
 * }
 */
export function MarshalIndent(in_: GoInterface<unknown>, prefix: string, indent: string): [GoSlice<byte>, GoError] {
  if (prefix === "" && indent === "") {
    return Marshal(in_);
  }
  return Marshal(in_, jsontext_WithIndentPrefix(prefix) as Options, jsontext_WithIndent(indent) as Options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::MarshalIndentWrite","kind":"func","status":"implemented","sigHash":"e502d9b521495abce43b485d8a1738ab6e51f05f653eda03881b16841ac01e8e"}
 *
 * Go source:
 * func MarshalIndentWrite(out io.Writer, in any, prefix, indent string) (err error) {
 * 	if prefix == "" && indent == "" {
 * 		// WithIndentPrefix and WithIndent imply multiline output, so skip them.
 * 		return MarshalWrite(out, in)
 * 	}
 * 	return MarshalWrite(out, in, jsontext.WithIndentPrefix(prefix), jsontext.WithIndent(indent))
 * }
 */
export function MarshalIndentWrite(out: GoInterface<Writer>, in_: GoInterface<unknown>, prefix: string, indent: string): GoError {
  if (prefix === "" && indent === "") {
    return MarshalWrite(out, in_);
  }
  return MarshalWrite(out, in_, jsontext_WithIndentPrefix(prefix) as Options, jsontext_WithIndent(indent) as Options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::Unmarshal","kind":"func","status":"implemented","sigHash":"de1aef5c7f7c49031891680cfd91939b7ecdf726f5caac6e3f32c227fa6545aa"}
 *
 * Go source:
 * func Unmarshal(in []byte, out any, opts ...json.Options) (err error) {
 * 	return json.Unmarshal(in, out, opts...)
 * }
 */
export function Unmarshal(in_: GoSlice<byte>, out: GoInterface<unknown>, ...opts: Array<Options>): GoError {
  return json_Unmarshal(in_, out, ...opts) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::UnmarshalDecode","kind":"func","status":"implemented","sigHash":"22458d086eafe73d5ef31c6027a25be7646f4dfe13e9be5e043197daa174a027"}
 *
 * Go source:
 * func UnmarshalDecode(in *jsontext.Decoder, out any, opts ...json.Options) (err error) {
 * 	return json.UnmarshalDecode(in, out, opts...)
 * }
 */
export function UnmarshalDecode(in_: GoPtr<Decoder_d2f8186c>, out: GoInterface<unknown>, ...opts: Array<Options>): GoError {
  return json_UnmarshalDecode(in_, out, ...opts) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::UnmarshalRead","kind":"func","status":"implemented","sigHash":"54af2abbd3d268ecd38b36310093cf40a41a915ab4998fa5ed0216cc6792f54a"}
 *
 * Go source:
 * func UnmarshalRead(in io.Reader, out any, opts ...json.Options) (err error) {
 * 	return json.UnmarshalRead(in, out, opts...)
 * }
 */
export function UnmarshalRead(in_: GoInterface<Reader>, out: GoInterface<unknown>, ...opts: Array<Options>): GoError {
  return json_UnmarshalRead(in_!, out, ...opts) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::AllowDuplicateNames","kind":"func","status":"implemented","sigHash":"92d203fcdd49acc2975c65617d3501ac157179e6f0c93ac9ea8897f5ebd3a734"}
 *
 * Go source:
 * func AllowDuplicateNames(allow bool) json.Options {
 * 	return jsontext.AllowDuplicateNames(allow)
 * }
 */
export function AllowDuplicateNames(allow: bool): GoInterface<Options> {
  return jsontext_AllowDuplicateNames(allow) as Options;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::Deterministic","kind":"func","status":"implemented","sigHash":"e64f14d2c17a847bdba7b95ad9c9a658c656a5a647d76934b150c317f1ea7f37"}
 *
 * Go source:
 * func Deterministic(v bool) json.Options {
 * 	return json.Deterministic(v)
 * }
 */
export function Deterministic(v: bool): GoInterface<Options> {
  return json_Deterministic(v) as Options;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::WithIndent","kind":"func","status":"implemented","sigHash":"233554c99fa3bdec99e6fdb8230ee5f7e0e46f54dd522ce8b509f83510c97f3f"}
 *
 * Go source:
 * func WithIndent(indent string) json.Options {
 * 	return jsontext.WithIndent(indent)
 * }
 */
export function WithIndent(indent: string): GoInterface<Options> {
  return jsontext_WithIndent(indent) as Options;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::func::NewDecoder","kind":"func","status":"implemented","sigHash":"4dd70f9993ded7d9737a3d963edc4b65648c3667d982ef12c45a79466dec6bb2"}
 *
 * Go source:
 * func NewDecoder(r io.Reader) *jsontext.Decoder {
 * 	return jsontext.NewDecoder(r)
 * }
 */
export function NewDecoder(r: GoInterface<Reader>): GoPtr<Decoder_d2f8186c> {
  return jsontext_NewDecoder(r!) as GoPtr<Decoder_d2f8186c>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::type::Value","kind":"type","status":"implemented","sigHash":"6698689ff698e18001dc88d4679c888f3b375d04f67c1dc3cd77810e09db309b"}
 *
 * Go source:
 * Value           = jsontext.Value
 */
export type Value = Value_6b3f2abd;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::type::Kind","kind":"type","status":"implemented","sigHash":"e0a1b3508ac52c4d956a2d2dc62eb63795a790f2e31911c40afa3ed9ee6004e0"}
 *
 * Go source:
 * Kind            = jsontext.Kind
 */
export type Kind = Kind_c0fe0b38;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::type::UnmarshalerFrom","kind":"type","status":"implemented","sigHash":"f01f6699315633fb8688649a26dc2ccae8cf24b9de4a6ae276ec0327311a4202"}
 *
 * Go source:
 * UnmarshalerFrom = json.UnmarshalerFrom
 */
export type UnmarshalerFrom = UnmarshalerFrom_68b23da1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::type::MarshalerTo","kind":"type","status":"implemented","sigHash":"9a8bc449349aa8ab63f43069406fd09a50f7ea76206c801a11bb5418b681d6a5"}
 *
 * Go source:
 * MarshalerTo     = json.MarshalerTo
 */
export type MarshalerTo = MarshalerTo_fd081708;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::type::Decoder","kind":"type","status":"implemented","sigHash":"dfbbb25d47bd696b560dd45cd13605536c83221e400acd19e557c44f702780a0"}
 *
 * Go source:
 * Decoder         = jsontext.Decoder
 */
export type Decoder = Decoder_d2f8186c;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::type::Encoder","kind":"type","status":"implemented","sigHash":"fa61b21198de3727e07287d714b3f5d7233461cbccc9a504dfe2adbf19e5f48d"}
 *
 * Go source:
 * Encoder         = jsontext.Encoder
 */
export type Encoder = Encoder_517f1597;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/json/json.go::varGroup::BeginObject+EndObject+Null+BeginArray+EndArray","kind":"varGroup","status":"implemented","sigHash":"fb8c55f79fbf45b5063e830ab2d30a7c7ed6f5321bb7436d3c0ecb44771cd3d1"}
 *
 * Go source:
 * var (
 * 	BeginObject = jsontext.BeginObject
 * 	EndObject   = jsontext.EndObject
 * 	Null        = jsontext.Null
 * 	BeginArray  = jsontext.BeginArray
 * 	EndArray    = jsontext.EndArray
 * )
 */
export let BeginObject: Token_b612ce55 = BeginObject_jsontext;
export let EndObject: Token_b612ce55 = EndObject_jsontext;
export let Null: Token_b612ce55 = Null_jsontext;
export let BeginArray: Token_b612ce55 = BeginArray_jsontext;
export let EndArray: Token_b612ce55 = EndArray_jsontext;
