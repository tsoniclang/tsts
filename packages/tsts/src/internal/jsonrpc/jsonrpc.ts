import type { bool, byte, int } from "../../go/scalars.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";
import type { GoError, GoPtr, GoSlice } from "../../go/compat.js";
import type { Value } from "../json/json.js";
import * as errors from "../../go/errors.js";
import * as fmt from "../../go/fmt.js";
import * as strconv from "../../go/strconv.js";
import * as json from "../json/json.js";

import type { GoInterface, GoRef } from "../../go/compat.js";
// Go's []byte(string) conversion: the UTF-8 encoding of the string.
const utf8Encoder: TextEncoder = new globalThis.TextEncoder();
const stringToBytes = (s: string): GoSlice<byte> => globalThis.Array.from(utf8Encoder.encode(s));

// Go's string([]byte) conversion: decode the byte slice as UTF-8.
const utf8Decoder: TextDecoder = new globalThis.TextDecoder();
const bytesToString = (b: GoSlice<byte>): string => utf8Decoder.decode(globalThis.Uint8Array.from(b));

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::JSONRPCVersion","kind":"type","status":"implemented","sigHash":"57944aa730fa3a5d0bf36879dfd621160da87adcffba194e603f65a468f2c624"}
 *
 * Go source:
 * JSONRPCVersion struct{}
 */
export interface JSONRPCVersion {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::constGroup::jsonRPCVersion","kind":"constGroup","status":"implemented","sigHash":"73beaf5aa05f79a267830cb14097626adba83da647495cab3d225d831583800c"}
 *
 * Go source:
 * const jsonRPCVersion = `"2.0"`
 */
export const jsonRPCVersion: string = `"2.0"`;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::JSONRPCVersion.MarshalJSON","kind":"method","status":"implemented","sigHash":"41328545af96741aa90376e95c2362acfb4d6123410c701cd4a9e285b6385a78"}
 *
 * Go source:
 * func (JSONRPCVersion) MarshalJSON() ([]byte, error) {
 * 	return []byte(jsonRPCVersion), nil
 * }
 */
export function JSONRPCVersion_MarshalJSON(receiver: JSONRPCVersion): [GoSlice<byte>, GoError] {
  return [stringToBytes(jsonRPCVersion), undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::varGroup::ErrInvalidJSONRPCVersion","kind":"varGroup","status":"implemented","sigHash":"ddb65661334e93c07974f3565d7f5e0dc9a00df99401e428f1469e048da5f7fc"}
 *
 * Go source:
 * var ErrInvalidJSONRPCVersion = errors.New("invalid JSON-RPC version")
 */
export let ErrInvalidJSONRPCVersion: GoError = errors.New("invalid JSON-RPC version");

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::JSONRPCVersion.UnmarshalJSON","kind":"method","status":"implemented","sigHash":"a64b96577d2d4da61797dfe2f3691b2c4dd3364e6d303a413bd2a93fd11fd12b"}
 *
 * Go source:
 * func (*JSONRPCVersion) UnmarshalJSON(data []byte) error {
 * 	if string(data) != jsonRPCVersion {
 * 		return ErrInvalidJSONRPCVersion
 * 	}
 * 	return nil
 * }
 */
export function JSONRPCVersion_UnmarshalJSON(receiver: GoPtr<JSONRPCVersion>, data: GoSlice<byte>): GoError {
  if (bytesToString(data) !== jsonRPCVersion) {
    return ErrInvalidJSONRPCVersion;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ID","kind":"type","status":"implemented","sigHash":"019362e4003e5b0099fa97e4501f178df1776c0a025f6fb59afa91f9cd0efd9e"}
 *
 * Go source:
 * ID struct {
 * 	str string
 * 	int int32
 * }
 */
export interface ID {
  str: string;
  int: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::func::NewID","kind":"func","status":"implemented","sigHash":"4a91b997ce593eef0e70a6a91e071167cf4fd9ea3088d076ce380841975f1896"}
 *
 * Go source:
 * func NewID(rawValue IntegerOrString) *ID {
 * 	if rawValue.String != nil {
 * 		return &ID{str: *rawValue.String}
 * 	}
 * 	return &ID{int: *rawValue.Integer}
 * }
 */
export function NewID(rawValue: IntegerOrString): GoPtr<ID> {
  if (rawValue.String !== undefined) {
    return { str: rawValue.String.v, int: 0 };
  }
  return { str: "", int: rawValue.Integer!.v };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::func::NewIDString","kind":"func","status":"implemented","sigHash":"dc46745ac23ca1952c01fee3ff555951c6325730fb19d077ed1998e76577b7ec"}
 *
 * Go source:
 * func NewIDString(str string) *ID {
 * 	return &ID{str: str}
 * }
 */
export function NewIDString(str: string): GoPtr<ID> {
  return { str: str, int: 0 };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::func::NewIDInt","kind":"func","status":"implemented","sigHash":"4f0c435533dad3bc8b1f092af52c5f6e4053f30e6089871aedfc789af1f0b773"}
 *
 * Go source:
 * func NewIDInt(i int32) *ID {
 * 	return &ID{int: i}
 * }
 */
export function NewIDInt(i: int): GoPtr<ID> {
  return { str: "", int: i };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ID.String","kind":"method","status":"implemented","sigHash":"6b6917e65e77ef16d5f4f874c63eda322fac28fe0a62dd95fb89c590300d536d"}
 *
 * Go source:
 * func (id *ID) String() string {
 * 	if id.str != "" {
 * 		return id.str
 * 	}
 * 	return strconv.Itoa(int(id.int))
 * }
 */
export function ID_String(receiver: GoPtr<ID>): string {
  const id = receiver!;
  if (id.str !== "") {
    return id.str;
  }
  return strconv.Itoa(id.int);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ID.MarshalJSON","kind":"method","status":"implemented","sigHash":"b12ea8402f1eb23f0ee8073a9ad5784c8b0a8b2aada279e036126b3f676961c9"}
 *
 * Go source:
 * func (id *ID) MarshalJSON() ([]byte, error) {
 * 	if id.str != "" {
 * 		return json.Marshal(id.str)
 * 	}
 * 	return json.Marshal(id.int)
 * }
 */
export function ID_MarshalJSON(receiver: GoPtr<ID>): [GoSlice<byte>, GoError] {
  const id = receiver!;
  if (id.str !== "") {
    return json.Marshal(id.str);
  }
  return json.Marshal(id.int);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ID.UnmarshalJSON","kind":"method","status":"implemented","sigHash":"a53e0eeb85ec7afe048658fe9d5a0a5d3dcef421949d19f2c94c72af4943ab9f"}
 *
 * Go source:
 * func (id *ID) UnmarshalJSON(data []byte) error {
 * 	*id = ID{}
 * 	if len(data) > 0 && data[0] == '"' {
 * 		return json.Unmarshal(data, &id.str)
 * 	}
 * 	return json.Unmarshal(data, &id.int)
 * }
 */
export function ID_UnmarshalJSON(receiver: GoPtr<ID>, data: GoSlice<byte>): GoError {
  const id = receiver!;
  id.str = "";
  id.int = 0;
  try {
    const value = globalThis.JSON.parse(bytesToString(data)) as unknown;
    if (typeof value === "string") {
      id.str = value;
      return undefined;
    }
    if (typeof value === "number" && globalThis.Number.isInteger(value)) {
      id.int = value as int;
      return undefined;
    }
    return new globalThis.Error("jsonrpc ID must be a string or integer");
  } catch (error) {
    return error instanceof globalThis.Error ? error : new globalThis.Error(String(error));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ID.TryInt","kind":"method","status":"implemented","sigHash":"604dd27bd26ede0b547dbc14bbdf362bbe13d690ddea1046c50ab7fec46a0f52"}
 *
 * Go source:
 * func (id *ID) TryInt() (int32, bool) {
 * 	if id == nil || id.str != "" {
 * 		return 0, false
 * 	}
 * 	return id.int, true
 * }
 */
export function ID_TryInt(receiver: GoPtr<ID>): [int, bool] {
  const id = receiver;
  if (id === undefined || id.str !== "") {
    return [0, false];
  }
  return [id.int, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ID.MustInt","kind":"method","status":"implemented","sigHash":"c2665aab5ac9c21f4669f8c083b2b596ff80f79a795e57212c647fe9dec251f2"}
 *
 * Go source:
 * func (id *ID) MustInt() int32 {
 * 	if id.str != "" {
 * 		panic("ID is not an integer")
 * 	}
 * 	return id.int
 * }
 */
export function ID_MustInt(receiver: GoPtr<ID>): int {
  const id = receiver!;
  if (id.str !== "") {
    throw new globalThis.Error("ID is not an integer");
  }
  return id.int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::IntegerOrString","kind":"type","status":"implemented","sigHash":"8c5993b849f8633c2e87f09c606e01e0d774f9057e350573bfbfef08c5629728"}
 *
 * Go source:
 * IntegerOrString struct {
 * 	Integer *int32
 * 	String  *string
 * }
 */
export interface IntegerOrString {
  Integer: GoRef<int>;
  String: GoRef<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ResponseError","kind":"type","status":"implemented","sigHash":"512e3bbd51a2bd267981fae634b61a976b260c2ac632a60f59e75f83f816d3b8"}
 *
 * Go source:
 * ResponseError struct {
 * 	Code    int32  `json:"code"`
 * 	Message string `json:"message"`
 * 	Data    any    `json:"data,omitzero"`
 * }
 */
export interface ResponseError {
  Code: int;
  Message: string;
  Data: GoInterface<unknown>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ResponseError.String","kind":"method","status":"implemented","sigHash":"078342a1d72e84cd3a4819b474a6c365c50c9d29679690933d2806ac4f2b0a8a"}
 *
 * Go source:
 * func (r *ResponseError) String() string {
 * 	if r == nil {
 * 		return ""
 * 	}
 * 	data, err := json.Marshal(r.Data)
 * 	if err != nil {
 * 		return fmt.Sprintf("[%d]: %s\n%v", r.Code, r.Message, data)
 * 	}
 * 	return fmt.Sprintf("[%d]: %s", r.Code, r.Message)
 * }
 */
export function ResponseError_String(receiver: GoPtr<ResponseError>): string {
  const r = receiver;
  if (r === undefined) {
    return "";
  }
  const [data, err] = json.Marshal(r.Data);
  if (err !== undefined) {
    return fmt.Sprintf("[%d]: %s\n%v", r.Code, r.Message, data);
  }
  return fmt.Sprintf("[%d]: %s", r.Code, r.Message);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::ResponseError.Error","kind":"method","status":"implemented","sigHash":"d3151d4585406cb4c4fc1b2ecae44375ff52e57491f936ecaf1de45cfcc9585a"}
 *
 * Go source:
 * func (r *ResponseError) Error() string {
 * 	return r.String()
 * }
 */
export function ResponseError_Error(receiver: GoPtr<ResponseError>): string {
  const r = receiver!;
  return ResponseError_String(r);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::constGroup::CodeParseError+CodeInvalidRequest+CodeMethodNotFound+CodeInvalidParams+CodeInternalError","kind":"constGroup","status":"implemented","sigHash":"81ad3d0c3b521e277644ecaff18276b08fdd8f26b82d481333f16165ee79b67e"}
 *
 * Go source:
 * const (
 * 	CodeParseError     int32 = -32700
 * 	CodeInvalidRequest int32 = -32600
 * 	CodeMethodNotFound int32 = -32601
 * 	CodeInvalidParams  int32 = -32602
 * 	CodeInternalError  int32 = -32603
 * )
 */
export const CodeParseError: int = -32700;
export const CodeInvalidRequest: int = -32600;
export const CodeMethodNotFound: int = -32601;
export const CodeInvalidParams: int = -32602;
export const CodeInternalError: int = -32603;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::MessageKind","kind":"type","status":"implemented","sigHash":"360de883f8c7cf9d47f7d2fea8d26892fe3ad442fa4f8d68ab9a49146f26416b"}
 *
 * Go source:
 * MessageKind int
 */
export type MessageKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::constGroup::MessageKindNotification+MessageKindRequest+MessageKindResponse","kind":"constGroup","status":"implemented","sigHash":"81c35a5bf4b27e366597146398bceb7744c625fbf1be7d7455ea20e8a169ffec"}
 *
 * Go source:
 * const (
 * 	MessageKindNotification MessageKind = iota
 * 	MessageKindRequest
 * 	MessageKindResponse
 * )
 */
export const MessageKindNotification: MessageKind = 0;
export const MessageKindRequest: MessageKind = 1;
export const MessageKindResponse: MessageKind = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::Message","kind":"type","status":"implemented","sigHash":"9ba7751eedf8edc9929829adaa8f6cecc7037f14a4f631038b23d57490966cbf"}
 *
 * Go source:
 * Message struct {
 * 	JSONRPC JSONRPCVersion `json:"jsonrpc"`
 * 	ID      *ID            `json:"id,omitzero"`
 * 	Method  string         `json:"method,omitzero"`
 * 	Params  json.Value     `json:"params,omitzero"`
 * 	Result  json.Value     `json:"result,omitzero"`
 * 	Error   *ResponseError `json:"error,omitzero"`
 * }
 */
export interface Message {
  JSONRPC: JSONRPCVersion;
  ID: GoPtr<ID>;
  Method: string;
  Params: Value;
  Result: Value;
  Error: GoPtr<ResponseError>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.Kind","kind":"method","status":"implemented","sigHash":"2b03d41d367e51d94b158e1376cd6cac0bf03d67e50709af7d6e595dbcccd29b"}
 *
 * Go source:
 * func (m *Message) Kind() MessageKind {
 * 	if m.ID != nil && m.Method == "" {
 * 		return MessageKindResponse
 * 	}
 * 	if m.ID == nil {
 * 		return MessageKindNotification
 * 	}
 * 	return MessageKindRequest
 * }
 */
export function Message_Kind(receiver: GoPtr<Message>): MessageKind {
  const m = receiver!;
  if (m.ID !== undefined && m.Method === "") {
    return MessageKindResponse;
  }
  if (m.ID === undefined) {
    return MessageKindNotification;
  }
  return MessageKindRequest;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.IsRequest","kind":"method","status":"implemented","sigHash":"1a678072590d54af60ea5cf78d883ccbc6afa56ea307ad2ed395265a8d9f6f14"}
 *
 * Go source:
 * func (m *Message) IsRequest() bool {
 * 	return m.ID != nil && m.Method != ""
 * }
 */
export function Message_IsRequest(receiver: GoPtr<Message>): bool {
  const m = receiver!;
  return m.ID !== undefined && m.Method !== "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.IsNotification","kind":"method","status":"implemented","sigHash":"91d03c1ecc4d0b37383d124743d07da9aa73cf1faa45d52ae6f2c73bc11c20bd"}
 *
 * Go source:
 * func (m *Message) IsNotification() bool {
 * 	return m.ID == nil && m.Method != ""
 * }
 */
export function Message_IsNotification(receiver: GoPtr<Message>): bool {
  const m = receiver!;
  return m.ID === undefined && m.Method !== "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.IsResponse","kind":"method","status":"implemented","sigHash":"6ba7e80bae3a98601fa9e3277068f4577c8b28cf4d18c0895eb4c5830e3c2596"}
 *
 * Go source:
 * func (m *Message) IsResponse() bool {
 * 	return m.ID != nil && m.Method == ""
 * }
 */
export function Message_IsResponse(receiver: GoPtr<Message>): bool {
  const m = receiver!;
  return m.ID !== undefined && m.Method === "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::RequestMessage","kind":"type","status":"implemented","sigHash":"130aebd0ccbc36b5e24eb55ef0d4fb3053ac6086e0e9841ccbb9b4ab2d4bbc04"}
 *
 * Go source:
 * RequestMessage struct {
 * 	JSONRPC JSONRPCVersion `json:"jsonrpc"`
 * 	ID      *ID            `json:"id,omitzero"`
 * 	Method  string         `json:"method"`
 * 	Params  any            `json:"params,omitzero"`
 * }
 */
export interface RequestMessage {
  JSONRPC: JSONRPCVersion;
  ID: GoPtr<ID>;
  Method: string;
  Params: GoInterface<unknown>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ResponseMessage","kind":"type","status":"implemented","sigHash":"e1e1ab59b79b0a01b898a6a4415a48684a158ea4151dd3562effc43cf452693c"}
 *
 * Go source:
 * ResponseMessage struct {
 * 	JSONRPC JSONRPCVersion `json:"jsonrpc"`
 * 	ID      *ID            `json:"id,omitzero"`
 * 	Result  any            `json:"result,omitzero"`
 * 	Error   *ResponseError `json:"error,omitzero"`
 * }
 */
export interface ResponseMessage {
  JSONRPC: JSONRPCVersion;
  ID: GoPtr<ID>;
  Result: GoInterface<unknown>;
  Error: GoPtr<ResponseError>;
}

type ResponseErrorJsonFields = JsonFieldNamesForGoStructContract<
  ResponseError,
  "github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ResponseError",
  {
    readonly Code: { readonly name: "code"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Message: { readonly name: "message"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Data: { readonly name: "data"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
  }
>;

type MessageJsonFields = JsonFieldNamesForGoStructContract<
  Message,
  "github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::Message",
  {
    readonly JSONRPC: { readonly name: "jsonrpc"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ID: { readonly name: "id"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Method: { readonly name: "method"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Params: { readonly name: "params"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Result: { readonly name: "result"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Error: { readonly name: "error"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
  }
>;

type RequestMessageJsonFields = JsonFieldNamesForGoStructContract<
  RequestMessage,
  "github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::RequestMessage",
  {
    readonly JSONRPC: { readonly name: "jsonrpc"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ID: { readonly name: "id"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Method: { readonly name: "method"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Params: { readonly name: "params"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
  }
>;

type ResponseMessageJsonFields = JsonFieldNamesForGoStructContract<
  ResponseMessage,
  "github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ResponseMessage",
  {
    readonly JSONRPC: { readonly name: "jsonrpc"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ID: { readonly name: "id"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Result: { readonly name: "result"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Error: { readonly name: "error"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
  }
>;
