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
const utf8Encoder = new globalThis.TextEncoder();
const stringToBytes = (s: string): GoSlice<byte> => globalThis.Array.from(utf8Encoder.encode(s));

// Go's string([]byte) conversion: decode the byte slice as UTF-8.
const utf8Decoder = new globalThis.TextDecoder();
const bytesToString = (b: GoSlice<byte>): string => utf8Decoder.decode(globalThis.Uint8Array.from(b));

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::JSONRPCVersion","kind":"type","status":"implemented","sigHash":"862966cbb3a87b3378ef0da3be95168f5876f23143ed055aeb03ff5807c0075b"}
 *
 * Go source:
 * JSONRPCVersion struct{}
 */
export interface JSONRPCVersion {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::constGroup::jsonRPCVersion","kind":"constGroup","status":"implemented","sigHash":"6019cfecab09cf4803b7e947f7d811d15d2c91673ccf221002817e1176f64f15"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::varGroup::ErrInvalidJSONRPCVersion","kind":"varGroup","status":"implemented","sigHash":"9fd721a1bd0323199f24e00eed6a40a4e7328da7f362cfe65139e09abf18ed3e"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ID","kind":"type","status":"implemented","sigHash":"3fb5aa3d6164f0282f2f474b4946382f626b3ecdb6b13b0886574e4892aca88d"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::func::NewID","kind":"func","status":"implemented","sigHash":"5b4fa60531ea281646f70b64289aa0f4ffed2a098d24fdb5a075e154007d539e"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::func::NewIDString","kind":"func","status":"implemented","sigHash":"5a9b195cbc88a8e1f0350842888cc34dd4e603891856af1ce9f2563df2b1cde4"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::func::NewIDInt","kind":"func","status":"implemented","sigHash":"b92b83fbeeaf0f40c2fef72bef1d699c60eb2d8660820c5ab3ff5d59008f061f"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::IntegerOrString","kind":"type","status":"implemented","sigHash":"8d1839679e464bd8e9b0ce0a5136c109f88e1773d24a0abf77e27ee663801312"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ResponseError","kind":"type","status":"implemented","sigHash":"dc4efbd12b7dcb1c860060cfd7e40832477d4ecfb0d951bc5bc312d315c89f4e"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::constGroup::CodeParseError+CodeInvalidRequest+CodeMethodNotFound+CodeInvalidParams+CodeInternalError","kind":"constGroup","status":"implemented","sigHash":"887ab2b2a0ae8658fb4dd5bb206925a792e547a88fd2d870ec4d8fcd7f7e7603"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::MessageKind","kind":"type","status":"implemented","sigHash":"72ff49b8dd3eeb5eab0a0efc66724caefaacef797f0eec347eb1c307dd29d571"}
 *
 * Go source:
 * MessageKind int
 */
export type MessageKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::constGroup::MessageKindNotification+MessageKindRequest+MessageKindResponse","kind":"constGroup","status":"implemented","sigHash":"9607231e573f0cd1201064ee819b46f28a3d51bbf4e002fab03ffb299c02afb8"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::Message","kind":"type","status":"implemented","sigHash":"a05b801837f37f9f77d233878f4cf76702957e58f1f0d2ebead3dd26d36b5861"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.Kind","kind":"method","status":"implemented","sigHash":"7ec366b5e0f6537af7a9bec0edf751bd93b787380c06a4bbff48b1cb5a9217ae"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.IsRequest","kind":"method","status":"implemented","sigHash":"f730f752f56194459abfbf2ced03e6b23335c6674378a6dd0b71aaa47c05ef67"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.IsNotification","kind":"method","status":"implemented","sigHash":"0daea8f67364519eddf20240eba67a60a9c5d5e3c77971af5c212da7fdc96224"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::method::Message.IsResponse","kind":"method","status":"implemented","sigHash":"484a7ac987f91c8aa0f23c3ab33ca05a7fec36d4fe4616b6b94e9330e122209c"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::RequestMessage","kind":"type","status":"implemented","sigHash":"4a33a8eafda826cc927f37e10dc1c50997d9ddb42da8c7180ee0940715c78f9e"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/jsonrpc.go::type::ResponseMessage","kind":"type","status":"implemented","sigHash":"549281559d9afe85a1c939a420fa85e4a588f7c1acf73aa3645931b5bf8978d7"}
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
