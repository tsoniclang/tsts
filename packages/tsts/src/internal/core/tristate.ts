import type { bool, byte } from "../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../go/compat.js";

import type { GoRef } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::type::Tristate","kind":"type","status":"implemented","sigHash":"afc2764db09003807b774c75192ce4d8150e55a00bf72b284d91e19797999d52"}
 *
 * Go source:
 * Tristate byte
 */
export type Tristate = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::constGroup::TSUnknown+TSFalse+TSTrue","kind":"constGroup","status":"implemented","sigHash":"447b9f2dd352c5faa8755a1f78e19219fb1b0c9281c6a560301494c883f4ea9e"}
 *
 * Go source:
 * const (
 * 	TSUnknown Tristate = iota
 * 	TSFalse
 * 	TSTrue
 * )
 */
export const TSUnknown: Tristate = 0;
export const TSFalse: Tristate = 1;
export const TSTrue: Tristate = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.IsTrue","kind":"method","status":"implemented","sigHash":"e6195916d72df7c155a5d2804d4ab17ef5a2fba381fec9cbcad3abdf2f2fd31f"}
 *
 * Go source:
 * func (t Tristate) IsTrue() bool {
 * 	return t == TSTrue
 * }
 */
export function Tristate_IsTrue(receiver: Tristate): bool {
  const t: Tristate = receiver ?? TSUnknown;
  return t === TSTrue;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.IsTrueOrUnknown","kind":"method","status":"implemented","sigHash":"28fbf1eb632c5bf167b0b7674146fef02a27e4b1927eebbe27bea3ba106720ed"}
 *
 * Go source:
 * func (t Tristate) IsTrueOrUnknown() bool {
 * 	return t == TSTrue || t == TSUnknown
 * }
 */
export function Tristate_IsTrueOrUnknown(receiver: Tristate): bool {
  const t: Tristate = receiver ?? TSUnknown;
  return t === TSTrue || t === TSUnknown;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.IsFalse","kind":"method","status":"implemented","sigHash":"f4ba0f4ff98dbdcb25bd04b496476eb265e475242f7f68a14db0a1b7c95149e5"}
 *
 * Go source:
 * func (t Tristate) IsFalse() bool {
 * 	return t == TSFalse
 * }
 */
export function Tristate_IsFalse(receiver: Tristate): bool {
  const t: Tristate = receiver ?? TSUnknown;
  return t === TSFalse;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.IsFalseOrUnknown","kind":"method","status":"implemented","sigHash":"44c0296d061628aadeb77636c1f505b4898f0254ff42f40f29efcb4ac6aa7dd7"}
 *
 * Go source:
 * func (t Tristate) IsFalseOrUnknown() bool {
 * 	return t == TSFalse || t == TSUnknown
 * }
 */
export function Tristate_IsFalseOrUnknown(receiver: Tristate): bool {
  const t: Tristate = receiver ?? TSUnknown;
  return t === TSFalse || t === TSUnknown;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.IsUnknown","kind":"method","status":"implemented","sigHash":"ac5a996c6d167da37f512e1294620fb132b2113feb3a526389a8adce3cb8a446"}
 *
 * Go source:
 * func (t Tristate) IsUnknown() bool {
 * 	return t == TSUnknown
 * }
 */
export function Tristate_IsUnknown(receiver: Tristate): bool {
  const t: Tristate = receiver ?? TSUnknown;
  return t === TSUnknown;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.DefaultIfUnknown","kind":"method","status":"implemented","sigHash":"a4e9b26be60541b4fa0bc1871011329e5f51087b7425a02dafc12345576ab462"}
 *
 * Go source:
 * func (t Tristate) DefaultIfUnknown(value Tristate) Tristate {
 * 	if t == TSUnknown {
 * 		return value
 * 	}
 * 	return t
 * }
 */
export function Tristate_DefaultIfUnknown(receiver: Tristate, value: Tristate): Tristate {
  const t: Tristate = receiver ?? TSUnknown;
  if (t === TSUnknown) {
    return value;
  }
  return t;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.UnmarshalJSON","kind":"method","status":"implemented","sigHash":"dc8dfb64123d255e6a8b487249722136d46b033cde4fe500423025367c121db7"}
 *
 * Go source:
 * func (t *Tristate) UnmarshalJSON(data []byte) error {
 * 	switch string(data) {
 * 	case "true":
 * 		*t = TSTrue
 * 	case "false":
 * 		*t = TSFalse
 * 	default:
 * 		*t = TSUnknown
 * 	}
 * 	return nil
 * }
 */
export function Tristate_UnmarshalJSON(receiver: GoRef<Tristate>, data: GoSlice<byte>): GoError {
  const str = bytesToString(data);
  const value = str === "true" ? TSTrue : str === "false" ? TSFalse : TSUnknown;
  if (typeof receiver === "object" && receiver !== null && "value" in receiver) {
    (receiver as unknown as { value: Tristate }).value = value;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::method::Tristate.MarshalJSON","kind":"method","status":"implemented","sigHash":"5f06b01d62b72021187964749c7c82392816dbd58dfc2c272820e257cc447a58"}
 *
 * Go source:
 * func (t Tristate) MarshalJSON() ([]byte, error) {
 * 	switch t {
 * 	case TSTrue:
 * 		return []byte("true"), nil
 * 	case TSFalse:
 * 		return []byte("false"), nil
 * 	default:
 * 		return []byte("null"), nil
 * 	}
 * }
 */
export function Tristate_MarshalJSON(receiver: Tristate): [GoSlice<byte>, GoError] {
  const t: Tristate = receiver;
  switch (t) {
    case TSTrue:
      return [stringToBytes("true"), undefined];
    case TSFalse:
      return [stringToBytes("false"), undefined];
    default:
      return [stringToBytes("null"), undefined];
  }
}

// Go's []byte(string) conversion: the UTF-8 encoding of the string as a byte slice.
const utf8Encoder = new globalThis.TextEncoder();
const utf8Decoder = new globalThis.TextDecoder();
function stringToBytes(s: string): GoSlice<byte> {
  return globalThis.Array.from(utf8Encoder.encode(s));
}

function bytesToString(data: GoSlice<byte>): string {
  return utf8Decoder.decode(new globalThis.Uint8Array(data as number[]));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/tristate.go::func::BoolToTristate","kind":"func","status":"implemented","sigHash":"4164fe9c4679bda4a48fd1cf34e5816a8563740d7d5d81243a3eeb4c62c60bbc"}
 *
 * Go source:
 * func BoolToTristate(b bool) Tristate {
 * 	if b {
 * 		return TSTrue
 * 	}
 * 	return TSFalse
 * }
 */
export function BoolToTristate(b: bool): Tristate {
  if (b) {
    return TSTrue;
  }
  return TSFalse;
}
