import type { byte, int, long } from "../../go/scalars.js";
import type { GoArray } from "../../go/compat.js";
import { FormatInt } from "../../go/strconv.js";
import { CategoryError, CategoryMessage, CategorySuggestion, CategoryWarning } from "./diagnostics.js";
import type { Category } from "./diagnostics.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::func::_","kind":"func","status":"implemented","sigHash":"c316d79b3f70efb48b99d2987b08743c8d4a739c9761bfa52b237422279585d6","bodyHash":"09537e45776b1e81f341f8e53650dd2130d520102d83d355421dbf85869c70a4"}
 *
 * Go source:
 * func _() {
 * 	// An "invalid array index" compiler error signifies that the constant values have changed.
 * 	// Re-run the stringer command to generate them again.
 * 	var x [1]struct{}
 * 	_ = x[CategoryWarning-0]
 * 	_ = x[CategoryError-1]
 * 	_ = x[CategorySuggestion-2]
 * 	_ = x[CategoryMessage-3]
 * }
 */
export function _(): void {
  // An "invalid array index" compiler error signifies that the constant values have changed.
  // Re-run the stringer command to generate them again.
  const x: GoArray<Record<string, never>, "1"> = [{}];
  void x[CategoryWarning - 0];
  void x[CategoryError - 1];
  void x[CategorySuggestion - 2];
  void x[CategoryMessage - 3];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::constGroup::_Category_name","kind":"constGroup","status":"implemented","sigHash":"bb1ad6e552d875707a8203c89a551fb392db650fe66b412166fd2caca478063c","bodyHash":"3b4d8b57793e64ddb36e748810ae8cbf126c95571a96240dc90514892bc63a29"}
 *
 * Go source:
 * const _Category_name = "CategoryWarningCategoryErrorCategorySuggestionCategoryMessage"
 */
export const _Category_name: string = "CategoryWarningCategoryErrorCategorySuggestionCategoryMessage";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::varGroup::_Category_index","kind":"varGroup","status":"implemented","sigHash":"ce28331ace6833f187b4e8c84ee517f33a8205a22b66af3c90a51c0bc1117c6f","bodyHash":"b5585db3ac415217beee78cb63cb5b8876e3cca771bea91c27563d920d0499e8"}
 *
 * Go source:
 * var _Category_index = [...]uint8{0, 15, 28, 46, 61}
 */
export let _Category_index: GoArray<byte, "..."> = [0, 15, 28, 46, 61];

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::method::Category.String","kind":"method","status":"implemented","sigHash":"2ad4a6356d8f9f994b7f31619cb9fd44cb217f7ba029abec5692b0ecf22d9d24","bodyHash":"6f02e30f58fa21c6dcf0ef1fd9a8f99d016da6f7239898f0f530612ef65a6897"}
 *
 * Go source:
 * func (i Category) String() string {
 * 	idx := int(i) - 0
 * 	if i < 0 || idx >= len(_Category_index)-1 {
 * 		return "Category(" + strconv.FormatInt(int64(i), 10) + ")"
 * 	}
 * 	return _Category_name[_Category_index[idx]:_Category_index[idx+1]]
 * }
 */
export function Category_String(receiver: Category): string {
  const i: Category = receiver;
  const idx: int = (i as int) - 0;
  if (i < 0 || idx >= _Category_index.length - 1) {
    return "Category(" + FormatInt(i as long, 10) + ")";
  }
  return _Category_name.slice(_Category_index[idx]!, _Category_index[idx + 1]!);
}
