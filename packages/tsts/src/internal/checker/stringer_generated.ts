import type { byte } from "../../go/scalars.js";
import type { GoArray } from "../../go/compat.js";
import type { SignatureKind } from "./types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/stringer_generated.go::func::_","kind":"func","status":"implemented","sigHash":"c316d79b3f70efb48b99d2987b08743c8d4a739c9761bfa52b237422279585d6"}
 *
 * Go source:
 * func _() {
 * 	// An "invalid array index" compiler error signifies that the constant values have changed.
 * 	// Re-run the stringer command to generate them again.
 * 	var x [1]struct{}
 * 	_ = x[SignatureKindCall-0]
 * 	_ = x[SignatureKindConstruct-1]
 * }
 */
export function _(): void {
  // An "invalid array index" compiler error signifies that the constant values have changed.
  // Re-run the stringer command to generate them again.
  // (Compile-time index assertions in Go; no runtime effect.)
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/stringer_generated.go::constGroup::_SignatureKind_name","kind":"constGroup","status":"implemented","sigHash":"8770f950039543500736c176d44551bdacb8c9c3a8fc2acafa98b0e356a5284a"}
 *
 * Go source:
 * const _SignatureKind_name = "SignatureKindCallSignatureKindConstruct"
 */
export const _SignatureKind_name: string = "SignatureKindCallSignatureKindConstruct";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/stringer_generated.go::varGroup::_SignatureKind_index","kind":"varGroup","status":"implemented","sigHash":"8a6fbed6d474d055ed89f3608e6b754dbcb1de531f12c6a89d589b64fac3c5fb"}
 *
 * Go source:
 * var _SignatureKind_index = [...]uint8{0, 17, 39}
 */
export let _SignatureKind_index: GoArray<byte, "3"> = [0, 17, 39] as GoArray<byte, "3">;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/checker/stringer_generated.go::method::SignatureKind.String","kind":"method","status":"implemented","sigHash":"9c05bce595039d33dc85ac4993e7e65c8e1d135f000e0b65576ddae97eff31f0"}
 *
 * Go source:
 * func (i SignatureKind) String() string {
 * 	idx := int(i) - 0
 * 	if i < 0 || idx >= len(_SignatureKind_index)-1 {
 * 		return "SignatureKind(" + strconv.FormatInt(int64(i), 10) + ")"
 * 	}
 * 	return _SignatureKind_name[_SignatureKind_index[idx]:_SignatureKind_index[idx+1]]
 * }
 */
export function SignatureKind_String(receiver: SignatureKind): string {
  const i = receiver;
  const idx = i - 0;
  if (i < 0 || idx >= _SignatureKind_index.length - 1) {
    return "SignatureKind(" + i.toString(10) + ")";
  }
  return _SignatureKind_name.slice(_SignatureKind_index[idx], _SignatureKind_index[idx + 1]);
}
