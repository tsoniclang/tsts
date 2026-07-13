import type { bool, byte, int, sbyte } from "../../go/scalars.js";
import { GoStringKey, type GoError, type GoPtr, type GoSlice } from "../../go/compat.js";
import { NewOrderedMapWithSizeHint, OrderedMap_Set } from "../collections/ordered_map.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import type { Decoder, UnmarshalerFrom } from "../json/json.js";

import type { GoInterface } from "../../go/compat.js";
const textDecoder: TextDecoder = new globalThis.TextDecoder();
type JSONValueElementFactory<T> = (value: JSONValue) => T;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::type::JSONValueType","kind":"type","status":"implemented","sigHash":"48653e3c18d9ae537114c84f85b8ef7b7ac29743e73e629426344b1a042b4309"}
 *
 * Go source:
 * JSONValueType int8
 */
export type JSONValueType = sbyte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::constGroup::JSONValueTypeNotPresent+JSONValueTypeNull+JSONValueTypeString+JSONValueTypeNumber+JSONValueTypeBoolean+JSONValueTypeArray+JSONValueTypeObject","kind":"constGroup","status":"implemented","sigHash":"0eb60a470b3f577cf37bd143dabb9eb1d3e738598ed65d83bae8302c50fc7895"}
 *
 * Go source:
 * const (
 * 	JSONValueTypeNotPresent JSONValueType = iota
 * 	JSONValueTypeNull
 * 	JSONValueTypeString
 * 	JSONValueTypeNumber
 * 	JSONValueTypeBoolean
 * 	JSONValueTypeArray
 * 	JSONValueTypeObject
 * )
 */
export const JSONValueTypeNotPresent: JSONValueType = 0 as JSONValueType;
export const JSONValueTypeNull: JSONValueType = 1 as JSONValueType;
export const JSONValueTypeString: JSONValueType = 2 as JSONValueType;
export const JSONValueTypeNumber: JSONValueType = 3 as JSONValueType;
export const JSONValueTypeBoolean: JSONValueType = 4 as JSONValueType;
export const JSONValueTypeArray: JSONValueType = 5 as JSONValueType;
export const JSONValueTypeObject: JSONValueType = 6 as JSONValueType;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValueType.String","kind":"method","status":"implemented","sigHash":"9f29d0e7fd171bcb5305baf2783ac6d97c258224a33da9dc759530e12081cc85"}
 *
 * Go source:
 * func (t JSONValueType) String() string {
 * 	switch t {
 * 	case JSONValueTypeNull:
 * 		return "null"
 * 	case JSONValueTypeString:
 * 		return "string"
 * 	case JSONValueTypeNumber:
 * 		return "number"
 * 	case JSONValueTypeBoolean:
 * 		return "boolean"
 * 	case JSONValueTypeArray:
 * 		return "array"
 * 	case JSONValueTypeObject:
 * 		return "object"
 * 	default:
 * 		return fmt.Sprintf("unknown(%d)", t)
 * 	}
 * }
 */
export function JSONValueType_String(receiver: JSONValueType): string {
  switch (receiver) {
    case JSONValueTypeNull:
      return "null";
    case JSONValueTypeString:
      return "string";
    case JSONValueTypeNumber:
      return "number";
    case JSONValueTypeBoolean:
      return "boolean";
    case JSONValueTypeArray:
      return "array";
    case JSONValueTypeObject:
      return "object";
    default:
      return `unknown(${receiver})`;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::type::JSONValue","kind":"type","status":"implemented","sigHash":"cfb3148c7eb9df24e19fdcf5f408a8bdcf46409505c6d31ba3d6cfb8df68ee4d"}
 *
 * Go source:
 * JSONValue struct {
 * 	Type  JSONValueType
 * 	Value any
 * }
 */
export interface JSONValue {
  Type: JSONValueType;
  Value: GoInterface<unknown>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValue.IsPresent","kind":"method","status":"implemented","sigHash":"8152b5707bade6933856986d12995c0f40301f3ee1988634c730b997a1e90b68"}
 *
 * Go source:
 * func (v *JSONValue) IsPresent() bool {
 * 	return v.Type != JSONValueTypeNotPresent
 * }
 */
export function JSONValue_IsPresent(receiver: GoPtr<JSONValue>): bool {
  return receiver!.Type !== JSONValueTypeNotPresent;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValue.IsFalsy","kind":"method","status":"implemented","sigHash":"865efc9dbf31b58ae0931b4222f66803df8e2d3f92b0feff43fe2eb64512f560"}
 *
 * Go source:
 * func (v *JSONValue) IsFalsy() bool {
 * 	switch v.Type {
 * 	case JSONValueTypeNotPresent, JSONValueTypeNull:
 * 		return true
 * 	case JSONValueTypeString:
 * 		return v.Value == ""
 * 	case JSONValueTypeNumber:
 * 		return v.Value == 0
 * 	case JSONValueTypeBoolean:
 * 		return !v.Value.(bool)
 * 	default:
 * 		return false
 * 	}
 * }
 */
export function JSONValue_IsFalsy(receiver: GoPtr<JSONValue>): bool {
  const v = receiver!;
  switch (v.Type) {
    case JSONValueTypeNotPresent:
    case JSONValueTypeNull:
      return true;
    case JSONValueTypeString:
      return v.Value === "";
    case JSONValueTypeNumber:
      return v.Value === 0;
    case JSONValueTypeBoolean:
      return !(v.Value as bool);
    default:
      return false;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValue.AsObject","kind":"method","status":"implemented","sigHash":"18a437dc320aabda941cc0411cc7ddfe4e33b354344a01fd3078ce5ba61361ac"}
 *
 * Go source:
 * func (v JSONValue) AsObject() *collections.OrderedMap[string, JSONValue] {
 * 	if v.Type != JSONValueTypeObject {
 * 		panic(fmt.Sprintf("expected object, got %v", v.Type))
 * 	}
 * 	return v.Value.(*collections.OrderedMap[string, JSONValue])
 * }
 */
export function JSONValue_AsObject(receiver: JSONValue): GoPtr<OrderedMap<string, JSONValue>> {
  if (receiver.Type !== JSONValueTypeObject) {
    throw new globalThis.Error(`expected object, got ${JSONValueType_String(receiver.Type)}`);
  }
  return receiver.Value as GoPtr<OrderedMap<string, JSONValue>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValue.AsArray","kind":"method","status":"implemented","sigHash":"240e82a60832f3396545ba113bd50df49b5611a74aa3b9d386ff3c24e0bd52ce"}
 *
 * Go source:
 * func (v JSONValue) AsArray() []JSONValue {
 * 	if v.Type != JSONValueTypeArray {
 * 		panic(fmt.Sprintf("expected array, got %v", v.Type))
 * 	}
 * 	return v.Value.([]JSONValue)
 * }
 */
export function JSONValue_AsArray(receiver: JSONValue): GoSlice<JSONValue> {
  if (receiver.Type !== JSONValueTypeArray) {
    throw new globalThis.Error(`expected array, got ${JSONValueType_String(receiver.Type)}`);
  }
  return receiver.Value as GoSlice<JSONValue>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValue.AsString","kind":"method","status":"implemented","sigHash":"fd92820770b9889501609ec2790176e422e07101a3e7e19b23ca4799649fd8a9"}
 *
 * Go source:
 * func (v JSONValue) AsString() string {
 * 	if v.Type != JSONValueTypeString {
 * 		panic(fmt.Sprintf("expected string, got %v", v.Type))
 * 	}
 * 	return v.Value.(string)
 * }
 */
export function JSONValue_AsString(receiver: JSONValue): string {
  if (receiver.Type !== JSONValueTypeString) {
    throw new globalThis.Error(`expected string, got ${JSONValueType_String(receiver.Type)}`);
  }
  return receiver.Value as string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ json.UnmarshalerFrom = (*JSONValue)(nil)
 */
export let __d3c38d60_0: GoInterface<UnmarshalerFrom> = JSONValue_as_json_UnmarshalerFrom(undefined);

export function JSONValue_as_json_UnmarshalerFrom(receiver: GoPtr<JSONValue>): UnmarshalerFrom {
  return {
    UnmarshalJSONFrom: (decoder: Decoder): GoError => JSONValue_UnmarshalJSONFrom(receiver, decoder),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::method::JSONValue.UnmarshalJSONFrom","kind":"method","status":"implemented","sigHash":"58ef06a751824f99c92048a67b7f9d966b45b19de3cf4d80037651e90d90c95d"}
 *
 * Go source:
 * func (v *JSONValue) UnmarshalJSONFrom(dec *json.Decoder) error {
 * 	return unmarshalJSONValueV2[JSONValue](v, dec)
 * }
 */
export function JSONValue_UnmarshalJSONFrom(receiver: GoPtr<JSONValue>, dec: GoPtr<Decoder>): GoError {
  return unmarshalJSONValueV2<JSONValue>(receiver, dec);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::func::unmarshalJSONValue","kind":"func","status":"implemented","sigHash":"e14ac71ae617061d90e60613b0171bad28ca5fc385c0eb9c85e7e805c398342c"}
 *
 * Go source:
 * func unmarshalJSONValue[T any](v *JSONValue, data []byte) error {
 * 	if string(data) == "null" {
 * 		*v = JSONValue{Type: JSONValueTypeNull}
 * 	} else if data[0] == '"' {
 * 		v.Type = JSONValueTypeString
 * 		return json.Unmarshal(data, &v.Value)
 * 	} else if data[0] == '[' {
 * 		var elements []T
 * 		if err := json.Unmarshal(data, &elements); err != nil {
 * 			return err
 * 		}
 * 		v.Type = JSONValueTypeArray
 * 		v.Value = elements
 * 	} else if data[0] == '{' {
 * 		var object collections.OrderedMap[string, T]
 * 		if err := json.Unmarshal(data, &object); err != nil {
 * 			return err
 * 		}
 * 		v.Type = JSONValueTypeObject
 * 		v.Value = &object
 * 	} else if string(data) == "true" {
 * 		v.Type = JSONValueTypeBoolean
 * 		v.Value = true
 * 	} else if string(data) == "false" {
 * 		v.Type = JSONValueTypeBoolean
 * 		v.Value = false
 * 	} else {
 * 		v.Type = JSONValueTypeNumber
 * 		return json.Unmarshal(data, &v.Value)
 * 	}
 * 	return nil
 * }
 */
export function unmarshalJSONValue<T>(v: GoPtr<JSONValue>, data: GoSlice<byte>): GoError {
  return unmarshalJSONValueWithFactory(v, data, (value: JSONValue): T => identityJSONValueElement<T>(value));
}

export function unmarshalJSONValueWithFactory<T>(v: GoPtr<JSONValue>, data: GoSlice<byte>, elementFactory: JSONValueElementFactory<T>): GoError {
  try {
    assignJSONValue(v, JSON.parse(textDecoder.decode(globalThis.Uint8Array.from(data as Array<number>))), elementFactory);
    return undefined;
  } catch (error) {
    return toJSONError(error);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/packagejson/jsonvalue.go::func::unmarshalJSONValueV2","kind":"func","status":"implemented","sigHash":"5cd9da10854a2c2a8b607f1f3c44f2ecda6a0c361d9e711befbdb497f489a826"}
 *
 * Go source:
 * func unmarshalJSONValueV2[T any](v *JSONValue, dec *json.Decoder) error {
 * 	switch dec.PeekKind() {
 * 	case 'n': // json.Null.Kind()
 * 		if _, err := dec.ReadToken(); err != nil {
 * 			return err
 * 		}
 * 		v.Value = nil
 * 		v.Type = JSONValueTypeNull
 * 		return nil
 * 	case '"':
 * 		v.Type = JSONValueTypeString
 * 		if err := json.UnmarshalDecode(dec, &v.Value); err != nil {
 * 			return err
 * 		}
 * 	case '[':
 * 		if _, err := dec.ReadToken(); err != nil {
 * 			return err
 * 		}
 * 		var elements []T
 * 		for dec.PeekKind() != json.EndArray.Kind() {
 * 			var element T
 * 			if err := json.UnmarshalDecode(dec, &element); err != nil {
 * 				return err
 * 			}
 * 			elements = append(elements, element)
 * 		}
 * 		if _, err := dec.ReadToken(); err != nil {
 * 			return err
 * 		}
 * 		v.Type = JSONValueTypeArray
 * 		v.Value = elements
 * 	case '{':
 * 		var object collections.OrderedMap[string, T]
 * 		if err := json.UnmarshalDecode(dec, &object); err != nil {
 * 			return err
 * 		}
 * 		v.Type = JSONValueTypeObject
 * 		v.Value = &object
 * 	case 't', 'f': // json.True.Kind(), json.False.Kind()
 * 		v.Type = JSONValueTypeBoolean
 * 		if err := json.UnmarshalDecode(dec, &v.Value); err != nil {
 * 			return err
 * 		}
 * 	default:
 * 		v.Type = JSONValueTypeNumber
 * 		if err := json.UnmarshalDecode(dec, &v.Value); err != nil {
 * 			return err
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function unmarshalJSONValueV2<T>(v: GoPtr<JSONValue>, dec: GoPtr<Decoder>): GoError {
  return unmarshalJSONValueV2WithFactory(v, dec, (value: JSONValue): T => identityJSONValueElement<T>(value));
}

export function unmarshalJSONValueV2WithFactory<T>(v: GoPtr<JSONValue>, dec: GoPtr<Decoder>, elementFactory: JSONValueElementFactory<T>): GoError {
  if (dec === undefined) {
    return new globalThis.Error("nil json decoder");
  }
  const [value, err] = dec.ReadValue();
  if (err !== undefined) {
    return err;
  }
  assignJSONValue(v, value, elementFactory);
  return undefined;
}

function assignJSONValue<T>(target: GoPtr<JSONValue>, value: unknown, elementFactory: JSONValueElementFactory<T>): void {
  const decoded = decodeJSONValue(value, elementFactory);
  target!.Type = decoded.Type;
  target!.Value = decoded.Value;
}

function decodeJSONValue<T>(value: unknown, elementFactory: JSONValueElementFactory<T>): JSONValue {
  if (value === null) {
    return { Type: JSONValueTypeNull, Value: undefined };
  }
  if (typeof value === "string") {
    return { Type: JSONValueTypeString, Value: value };
  }
  if (typeof value === "number") {
    return { Type: JSONValueTypeNumber, Value: value };
  }
  if (typeof value === "boolean") {
    return { Type: JSONValueTypeBoolean, Value: value };
  }
  if (globalThis.Array.isArray(value)) {
    return {
      Type: JSONValueTypeArray,
      Value: value.map(element => elementFactory(decodeJSONValue(element, elementFactory))) as GoSlice<T>,
    };
  }
  if (typeof value === "object") {
    const entries = globalThis.Object.entries(value as Record<string, unknown>);
    const object = NewOrderedMapWithSizeHint<string, T>(entries.length as int, GoStringKey)!;
    for (const [key, element] of entries) {
      OrderedMap_Set(object, key, elementFactory(decodeJSONValue(element, elementFactory)), GoStringKey);
    }
    return { Type: JSONValueTypeObject, Value: object };
  }
  throw new globalThis.Error(`unsupported JSON value: ${String(value)}`);
}

function identityJSONValueElement<T>(value: JSONValue): T {
  return value as T;
}

function toJSONError(error: unknown): globalThis.Error {
  return error instanceof globalThis.Error ? error : new globalThis.Error(String(error));
}
