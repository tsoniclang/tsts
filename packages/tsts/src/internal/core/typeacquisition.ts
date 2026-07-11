import type { bool } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import * as slices from "../../go/slices.js";
import type { Tristate } from "./tristate.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/typeacquisition.go::type::TypeAcquisition","kind":"type","status":"implemented","sigHash":"304fe4744aa0d343ed60b1d0db76eeb9fbe805fcc96b18f512d1cfd5d8d85f08","bodyHash":"1bd4db91345c043ae1321e838a1ce8faeabd7c15dd77d0b6f33125945cc86102"}
 *
 * Go source:
 * TypeAcquisition struct {
 * 	Enable                              Tristate `json:"enable,omitzero"`
 * 	Include                             []string `json:"include,omitzero"`
 * 	Exclude                             []string `json:"exclude,omitzero"`
 * 	DisableFilenameBasedTypeAcquisition Tristate `json:"disableFilenameBasedTypeAcquisition,omitzero"`
 * }
 */
export interface TypeAcquisition {
  Enable: Tristate;
  Include: GoPtr<GoSlice<string>>;
  Exclude: GoPtr<GoSlice<string>>;
  DisableFilenameBasedTypeAcquisition: Tristate;
}

type typeAcquisitionJsonFields = JsonFieldNamesForGoStructContract<
  TypeAcquisition,
  "github.com/microsoft/typescript-go::internal/core/typeacquisition.go::type::TypeAcquisition",
  {
    Enable: { name: "enable", omitZero: true },
    Include: { name: "include", omitZero: true },
    Exclude: { name: "exclude", omitZero: true },
    DisableFilenameBasedTypeAcquisition: { name: "disableFilenameBasedTypeAcquisition", omitZero: true },
  },
  "source-metadata",
  "Type-acquisition JSON identities are consumed through explicit config parsing rather than generic struct marshaling."
>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/typeacquisition.go::method::TypeAcquisition.Equals","kind":"method","status":"implemented","sigHash":"5386e30ab6ccfe9cb39062c78348cbd4c2fe7cfdf5bf854c6a4713e20c73162d","bodyHash":"ce4f1e356107c826a51362cbc0aadb34aab77ea1f683c318987ea6db50061d31"}
 *
 * Go source:
 * func (ta *TypeAcquisition) Equals(other *TypeAcquisition) bool {
 * 	if ta == other {
 * 		return true
 * 	}
 * 	if ta == nil || other == nil {
 * 		return false
 * 	}
 *
 * 	return (ta.Enable == other.Enable &&
 * 		slices.Equal(ta.Include, other.Include) &&
 * 		slices.Equal(ta.Exclude, other.Exclude) &&
 * 		ta.DisableFilenameBasedTypeAcquisition == other.DisableFilenameBasedTypeAcquisition)
 * }
 */
export function TypeAcquisition_Equals(receiver: GoPtr<TypeAcquisition>, other: GoPtr<TypeAcquisition>): bool {
  const ta: GoPtr<TypeAcquisition> = receiver;
  if (ta === other) {
    return true;
  }
  if (ta === undefined || other === undefined) {
    return false;
  }

  return (
    ta.Enable === other.Enable &&
    slices.Equal(ta.Include, other.Include) &&
    slices.Equal(ta.Exclude, other.Exclude) &&
    ta.DisableFilenameBasedTypeAcquisition === other.DisableFilenameBasedTypeAcquisition
  );
}
