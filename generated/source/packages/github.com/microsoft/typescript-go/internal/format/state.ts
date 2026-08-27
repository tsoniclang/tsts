import type { FormattingContext } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/context.js";
import type { ruleImpl } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/rule.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare anyContext: RuntimeSlice<(($0: FormattingContext | undefined) => bool) | undefined>;
    declare getRulesMap: (() => RuntimeSlice<RuntimeSlice<ruleImpl | undefined>>) | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
