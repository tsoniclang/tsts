import { Locale } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/locale/locale.js";
import { $state } from "./state.js";
export function $initialize(): void {
    $state.Default = Locale.$zeroStorage();
}
export { FromContext, Locale, Locale$Storage, Parse, WithLocale } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/locale/locale.js";
export { $state };
