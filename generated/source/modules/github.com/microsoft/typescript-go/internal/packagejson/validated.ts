import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$ActualJSONType$void_to_string, $goInterfaceMethod$ExpectedJSONType$void_to_string, $goInterfaceMethod$IsPresent$void_to_bool, $goInterfaceMethod$IsValid$void_to_bool } from "../../../../../../support/interface-methods.js";
export interface TypeValidatedField extends GoInterfaceValue {
    ActualJSONType(): gostring;
    ExpectedJSONType(): gostring;
    IsPresent(): bool;
    IsValid(): bool;
}
export const TypeValidatedField$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ActualJSONType$void_to_string, $goInterfaceMethod$ExpectedJSONType$void_to_string, $goInterfaceMethod$IsPresent$void_to_bool, $goInterfaceMethod$IsValid$void_to_bool]);
export function TypeValidatedField$is(value: GoInterfaceValue | undefined): value is TypeValidatedField {
    return value !== undefined && value.$go$implements(TypeValidatedField$contract);
}
