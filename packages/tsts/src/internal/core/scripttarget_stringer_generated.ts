import type { byte, long } from "../../go/scalars.js";
import type { GoArray } from "../../go/compat.js";
import { FormatInt } from "../../go/strconv.js";
import {
  ScriptTargetES5,
  ScriptTargetES2015,
  ScriptTargetES2016,
  ScriptTargetES2017,
  ScriptTargetES2018,
  ScriptTargetES2019,
  ScriptTargetES2020,
  ScriptTargetES2021,
  ScriptTargetES2022,
  ScriptTargetES2023,
  ScriptTargetES2024,
  ScriptTargetES2025,
  ScriptTargetESNext,
  ScriptTargetJSON,
  ScriptTargetLatest,
  ScriptTargetLatestStandard,
  ScriptTargetNone,
} from "./compileroptions.js";
import type { ScriptTarget } from "./compileroptions.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scripttarget_stringer_generated.go::func::_","kind":"func","status":"implemented","sigHash":"c316d79b3f70efb48b99d2987b08743c8d4a739c9761bfa52b237422279585d6"}
 *
 * Go source:
 * func _() {
 * 	// An "invalid array index" compiler error signifies that the constant values have changed.
 * 	// Re-run the stringer command to generate them again.
 * 	var x [1]struct{}
 * 	_ = x[ScriptTargetNone-0]
 * 	_ = x[ScriptTargetES5-1]
 * 	_ = x[ScriptTargetES2015-2]
 * 	_ = x[ScriptTargetES2016-3]
 * 	_ = x[ScriptTargetES2017-4]
 * 	_ = x[ScriptTargetES2018-5]
 * 	_ = x[ScriptTargetES2019-6]
 * 	_ = x[ScriptTargetES2020-7]
 * 	_ = x[ScriptTargetES2021-8]
 * 	_ = x[ScriptTargetES2022-9]
 * 	_ = x[ScriptTargetES2023-10]
 * 	_ = x[ScriptTargetES2024-11]
 * 	_ = x[ScriptTargetES2025-12]
 * 	_ = x[ScriptTargetESNext-99]
 * 	_ = x[ScriptTargetJSON-100]
 * 	_ = x[ScriptTargetLatest-99]
 * 	_ = x[ScriptTargetLatestStandard-12]
 * }
 */
export function _(): void {
  // An "invalid array index" compiler error signifies that the constant values have changed.
  // Re-run the stringer command to generate them again.
  const x: GoArray<Record<string, never>, "1"> = [{}];
  void x[ScriptTargetNone - 0];
  void x[ScriptTargetES5 - 1];
  void x[ScriptTargetES2015 - 2];
  void x[ScriptTargetES2016 - 3];
  void x[ScriptTargetES2017 - 4];
  void x[ScriptTargetES2018 - 5];
  void x[ScriptTargetES2019 - 6];
  void x[ScriptTargetES2020 - 7];
  void x[ScriptTargetES2021 - 8];
  void x[ScriptTargetES2022 - 9];
  void x[ScriptTargetES2023 - 10];
  void x[ScriptTargetES2024 - 11];
  void x[ScriptTargetES2025 - 12];
  void x[ScriptTargetESNext - 99];
  void x[ScriptTargetJSON - 100];
  void x[ScriptTargetLatest - 99];
  void x[ScriptTargetLatestStandard - 12];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scripttarget_stringer_generated.go::constGroup::_ScriptTarget_name_0+_ScriptTarget_name_1","kind":"constGroup","status":"implemented","sigHash":"4d7582e97c83a8d72f86905f3345ec238b4ffb67d84a8c0efd77769302d3151f"}
 *
 * Go source:
 * const (
 * 	_ScriptTarget_name_0 = "NoneES5ES2015ES2016ES2017ES2018ES2019ES2020ES2021ES2022ES2023ES2024ES2025"
 * 	_ScriptTarget_name_1 = "ESNextJSON"
 * )
 */
export const _ScriptTarget_name_0: string = "NoneES5ES2015ES2016ES2017ES2018ES2019ES2020ES2021ES2022ES2023ES2024ES2025";
export const _ScriptTarget_name_1: string = "ESNextJSON";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scripttarget_stringer_generated.go::varGroup::_ScriptTarget_index_0+_ScriptTarget_index_1","kind":"varGroup","status":"implemented","sigHash":"55ab4d543b42215cd09cdcf34f3c17f3ce5b5f3d29e916afd195bd30e05f0609"}
 *
 * Go source:
 * var (
 * 	_ScriptTarget_index_0 = [...]uint8{0, 4, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73}
 * 	_ScriptTarget_index_1 = [...]uint8{0, 6, 10}
 * )
 */
export let _ScriptTarget_index_0: GoArray<byte, "14"> = [0, 4, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73];
export let _ScriptTarget_index_1: GoArray<byte, "3"> = [0, 6, 10];

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/scripttarget_stringer_generated.go::method::ScriptTarget.String","kind":"method","status":"implemented","sigHash":"41a4d4874a348e3d33b91377d73aa247ca1205a90cb390cf81018469cf2f5a74"}
 *
 * Go source:
 * func (i ScriptTarget) String() string {
 * 	switch {
 * 	case 0 <= i && i <= 12:
 * 		return _ScriptTarget_name_0[_ScriptTarget_index_0[i]:_ScriptTarget_index_0[i+1]]
 * 	case 99 <= i && i <= 100:
 * 		i -= 99
 * 		return _ScriptTarget_name_1[_ScriptTarget_index_1[i]:_ScriptTarget_index_1[i+1]]
 * 	default:
 * 		return "ScriptTarget(" + strconv.FormatInt(int64(i), 10) + ")"
 * 	}
 * }
 */
export function ScriptTarget_String(receiver: ScriptTarget): string {
  let i: ScriptTarget = receiver;
  switch (true) {
    case 0 <= i && i <= 12:
      return _ScriptTarget_name_0.slice(_ScriptTarget_index_0[i]!, _ScriptTarget_index_0[i + 1]!);
    case 99 <= i && i <= 100:
      i -= 99;
      return _ScriptTarget_name_1.slice(_ScriptTarget_index_1[i]!, _ScriptTarget_index_1[i + 1]!);
    default:
      return "ScriptTarget(" + FormatInt(i as long, 10) + ")";
  }
}
