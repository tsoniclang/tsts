import type { byte, int, long } from "../../go/scalars.js";
import type { GoArray } from "../../go/compat.js";
import { FormatInt } from "../../go/strconv.js";
import {
  ScriptKindDeferred,
  ScriptKindExternal,
  ScriptKindJS,
  ScriptKindJSON,
  ScriptKindJSX,
  ScriptKindTS,
  ScriptKindTSX,
  ScriptKindUnknown,
} from "./scriptkind.js";
import type { ScriptKind } from "./scriptkind.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scriptkind_stringer_generated.go::func::_","kind":"func","status":"implemented","sigHash":"c316d79b3f70efb48b99d2987b08743c8d4a739c9761bfa52b237422279585d6"}
 *
 * Go source:
 * func _() {
 * 	// An "invalid array index" compiler error signifies that the constant values have changed.
 * 	// Re-run the stringer command to generate them again.
 * 	var x [1]struct{}
 * 	_ = x[ScriptKindUnknown-0]
 * 	_ = x[ScriptKindJS-1]
 * 	_ = x[ScriptKindJSX-2]
 * 	_ = x[ScriptKindTS-3]
 * 	_ = x[ScriptKindTSX-4]
 * 	_ = x[ScriptKindExternal-5]
 * 	_ = x[ScriptKindJSON-6]
 * 	_ = x[ScriptKindDeferred-7]
 * }
 */
export function _(): void {
  // An "invalid array index" compiler error signifies that the constant values have changed.
  // Re-run the stringer command to generate them again.
  const x: GoArray<Record<string, never>, "1"> = [{}];
  void x[ScriptKindUnknown - 0];
  void x[ScriptKindJS - 1];
  void x[ScriptKindJSX - 2];
  void x[ScriptKindTS - 3];
  void x[ScriptKindTSX - 4];
  void x[ScriptKindExternal - 5];
  void x[ScriptKindJSON - 6];
  void x[ScriptKindDeferred - 7];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scriptkind_stringer_generated.go::constGroup::_ScriptKind_name","kind":"constGroup","status":"implemented","sigHash":"6076ed28a4b51e65fab8f5dde68e0d76d33aa66b16a87e1a014361e820e66460"}
 *
 * Go source:
 * const _ScriptKind_name = "ScriptKindUnknownScriptKindJSScriptKindJSXScriptKindTSScriptKindTSXScriptKindExternalScriptKindJSONScriptKindDeferred"
 */
export const _ScriptKind_name: string = "ScriptKindUnknownScriptKindJSScriptKindJSXScriptKindTSScriptKindTSXScriptKindExternalScriptKindJSONScriptKindDeferred";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scriptkind_stringer_generated.go::varGroup::_ScriptKind_index","kind":"varGroup","status":"implemented","sigHash":"3e93ae2e60d0e642150da8fe9b7bc6c0827f8d5fb405c630a518ce244c3cba3b"}
 *
 * Go source:
 * var _ScriptKind_index = [...]uint8{0, 17, 29, 42, 54, 67, 85, 99, 117}
 */
export let _ScriptKind_index: GoArray<byte, "9"> = [0, 17, 29, 42, 54, 67, 85, 99, 117];

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scriptkind_stringer_generated.go::method::ScriptKind.String","kind":"method","status":"implemented","sigHash":"4bb4d86ed4f76384f3cc2e5106476df4e622c15b4243be4cba22c999d481ecc2"}
 *
 * Go source:
 * func (i ScriptKind) String() string {
 * 	idx := int(i) - 0
 * 	if i < 0 || idx >= len(_ScriptKind_index)-1 {
 * 		return "ScriptKind(" + strconv.FormatInt(int64(i), 10) + ")"
 * 	}
 * 	return _ScriptKind_name[_ScriptKind_index[idx]:_ScriptKind_index[idx+1]]
 * }
 */
export function ScriptKind_String(receiver: ScriptKind): string {
  const i: ScriptKind = receiver;
  const idx: int = (i as int) - 0;
  if (i < 0 || idx >= _ScriptKind_index.length - 1) {
    return "ScriptKind(" + FormatInt(i as long, 10) + ")";
  }
  return _ScriptKind_name.slice(_ScriptKind_index[idx]!, _ScriptKind_index[idx + 1]!);
}
