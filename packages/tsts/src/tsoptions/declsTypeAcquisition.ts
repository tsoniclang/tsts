/**
 * Type-acquisition option declarations.
 *
 * Port of TS-Go `internal/tsoptions/declstypeacquisition.go` (~29 LoC).
 */

import type { CommandLineOption } from "./commandLineOption.js";

export const typeAcquisitionDeclarations: readonly CommandLineOption[] = [
  { name: "enable", type: "boolean" },
  { name: "include", type: "list", element: { name: "include", type: "string" } },
  { name: "exclude", type: "list", element: { name: "exclude", type: "string" } },
  { name: "disableFilenameBasedTypeAcquisition", type: "boolean" },
];

export const typeAcquisitionDeclaration: CommandLineOption = {
  name: "typeAcquisition",
  type: "object",
};
