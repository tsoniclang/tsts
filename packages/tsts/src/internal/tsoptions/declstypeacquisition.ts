import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { CommandLineOption } from "./commandlineoption.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declstypeacquisition.go::varGroup::typeAcquisitionDeclaration","kind":"varGroup","status":"stub","sigHash":"403792fd19363f2bf764316b7e9670761a5952b1c1cfaa7bafec8a00b5f5ae5c","bodyHash":"13d4c51e225422b2ccd9566cbc2b78658087fb7f7d50111f2c4f636b2eeb3e21"}
 *
 * Go source:
 * var typeAcquisitionDeclaration = &CommandLineOption{
 * 	Name:           "typeAcquisition",
 * 	Kind:           CommandLineOptionTypeObject,
 * 	ElementOptions: commandLineOptionsToMap(typeAcquisitionDecls),
 * }
 */
export let typeAcquisitionDeclaration: GoPtr<CommandLineOption> = undefined as never;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declstypeacquisition.go::varGroup::typeAcquisitionDecls","kind":"varGroup","status":"stub","sigHash":"56356b00bbf795538edacacf84cbc917ced76e422e7626daf230b8f048cbfb5e","bodyHash":"a93177d0a26521ccec32641f930940efc9336a8097c09a21913f75fd0ffd7fe6"}
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
export let typeAcquisitionDecls: GoSlice<GoPtr<CommandLineOption>> = undefined as never;
