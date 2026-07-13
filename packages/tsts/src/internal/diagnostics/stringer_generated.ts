import type { byte } from "../../go/scalars.js";
import type { GoArray } from "../../go/compat.js";
import type { Category } from "./diagnostics.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::func::_","kind":"func","status":"implemented","sigHash":"c316d79b3f70efb48b99d2987b08743c8d4a739c9761bfa52b237422279585d6"}
 *
 * Go source:
 * func _() {
 * \t// An "invalid array index" compiler error signifies that the constant values have changed.
 * \t// Re-run the stringer command to generate them again.
 * \tvar x [1]struct{}
 * \t_ = x[CategoryWarning-0]
 * \t_ = x[CategoryError-1]
 * \t_ = x[CategorySuggestion-2]
 * \t_ = x[CategoryMessage-3]
 * }
 */
export function _(): void {
  // Compile-time constant validation — no runtime behavior needed.
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::constGroup::_Category_name","kind":"constGroup","status":"implemented","sigHash":"8b627c4eabf518fe80ec657527be1dab01aa1c7ec877aa5b87e6081930757da2"}
 *
 * Go source:
 * const _Category_name = "CategoryWarningCategoryErrorCategorySuggestionCategoryMessage"
 */
export const _Category_name: string = "CategoryWarningCategoryErrorCategorySuggestionCategoryMessage";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::varGroup::_Category_index","kind":"varGroup","status":"implemented","sigHash":"dbc921a9532c2ae173770c5ce6e59a4d933844839e4dde5e5d6351e18404eb73"}
 *
 * Go source:
 * var _Category_index = [...]uint8{0, 15, 28, 46, 61}
 */
export let _Category_index: GoArray<byte, "5"> = [0, 15, 28, 46, 61];

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/stringer_generated.go::method::Category.String","kind":"method","status":"implemented","sigHash":"2ad4a6356d8f9f994b7f31619cb9fd44cb217f7ba029abec5692b0ecf22d9d24"}
 *
 * Go source:
 * func (i Category) String() string {
 * \tidx := int(i) - 0
 * \tif i < 0 || idx >= len(_Category_index)-1 {
 * \t\treturn "Category(" + strconv.FormatInt(int64(i), 10) + ")"
 * \t}
 * \treturn _Category_name[_Category_index[idx]:_Category_index[idx+1]]
 * }
 */
export function Category_String(receiver: Category): string {
  const i = receiver;
  const idx = i - 0;
  if (i < 0 || idx >= _Category_index.length - 1) {
    return "Category(" + i.toString(10) + ")";
  }
  return _Category_name.slice(_Category_index[idx], _Category_index[idx + 1]);
}
