import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { CommandLineOption } from "./commandlineoption.js";
import {
  CommandLineOptionTypeBoolean,
  CommandLineOptionTypeList,
  CommandLineOptionTypeObject,
  commandLineOptionsToMap,
  extraValidationNone,
  newCommandLineOption,
} from "./commandlineoption.js";
import { GoPointerValueOps, GoSliceBuild, GoSliceStore } from "../../go/compat.js";




/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declstypeacquisition.go::varGroup::typeAcquisitionDeclaration","kind":"varGroup","status":"implemented","sigHash":"91707cd0d85ab25bfc427d87b088e5f7ef2d799346b2da5f3d2726df4f446792"}
 *
 * Go source:
 * var typeAcquisitionDeclaration = &CommandLineOption{
 * 	Name:           "typeAcquisition",
 * 	Kind:           CommandLineOptionTypeObject,
 * 	ElementOptions: commandLineOptionsToMap(typeAcquisitionDecls),
 * }
 */
// Go initializes package-level vars by dependency order; typeAcquisitionDeclaration
// depends on typeAcquisitionDecls (defined below), so it is assigned after that
// declaration to avoid temporal-dead-zone access.
export let typeAcquisitionDeclaration: GoPtr<CommandLineOption> = undefined;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declstypeacquisition.go::varGroup::typeAcquisitionDecls","kind":"varGroup","status":"implemented","sigHash":"fc791c3a8b42b2c6eac11b7a803b847ac7561e8237d017c5c3c50993011d652b"}
 *
 * Go source:
 * var typeAcquisitionDecls = []*CommandLineOption{
 * 	{
 * 		Name:                    "enable",
 * 		Kind:                    CommandLineOptionTypeBoolean,
 * 		DefaultValueDescription: false,
 * 	},
 * 	{
 * 		Name: "include",
 * 		Kind: CommandLineOptionTypeList,
 * 	},
 * 	{
 * 		Name: "exclude",
 * 		Kind: CommandLineOptionTypeList,
 * 	},
 * 	{
 * 		Name:                    "disableFilenameBasedTypeAcquisition",
 * 		Kind:                    CommandLineOptionTypeBoolean,
 * 		DefaultValueDescription: false,
 * 	},
 * }
 */
export let typeAcquisitionDecls: GoSlice<GoPtr<CommandLineOption>> = GoSliceBuild(4, 4, GoPointerValueOps<CommandLineOption>(), (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, newCommandLineOption({
    Name: "enable",
    Kind: CommandLineOptionTypeBoolean,
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 1, newCommandLineOption({
    Name: "include",
    Kind: CommandLineOptionTypeList,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 2, newCommandLineOption({
    Name: "exclude",
    Kind: CommandLineOptionTypeList,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 3, newCommandLineOption({
    Name: "disableFilenameBasedTypeAcquisition",
    Kind: CommandLineOptionTypeBoolean,
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
});

// Assigned here (after typeAcquisitionDecls) to match
// Go's dependency-ordered package-level var initialization.
typeAcquisitionDeclaration = newCommandLineOption({
  Name: "typeAcquisition",
  Kind: CommandLineOptionTypeObject,
  ElementOptions: commandLineOptionsToMap(typeAcquisitionDecls),
});
