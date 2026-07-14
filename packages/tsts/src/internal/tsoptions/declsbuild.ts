import type { GoPtr, GoSlice } from "../../go/compat.js";
import { Concat } from "../../go/slices.js";
import * as diagnostics from "../diagnostics/generated/messages.js";
import type { CommandLineOption } from "./commandlineoption.js";
import {
  CommandLineOptionTypeNumber,
  extraValidationNone,
  newCommandLineOption,
} from "./commandlineoption.js";
import { commonOptionsWithBuild } from "./declscompiler.js";
import { GoPointerValueOps, GoSliceBuild, GoSliceStore } from "../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declsbuild.go::varGroup::TscBuildOption","kind":"varGroup","status":"implemented","sigHash":"f7d0d631fcdada6be3f24c7a1cf9c093b6f0ef11c0b6c40afdece2ace73f0da0"}
 *
 * Go source:
 * var TscBuildOption = CommandLineOption{
 * 	Name:                     "build",
 * 	Kind:                     "boolean",
 * 	ShortName:                "b",
 * 	ShowInSimplifiedHelpView: true,
 * 	Category:                 diagnostics.Command_line_Options,
 * 	Description:              diagnostics.Build_one_or_more_projects_and_their_dependencies_if_out_of_date,
 * 	DefaultValueDescription:  false,
 * }
 */
export let TscBuildOption: CommandLineOption = newCommandLineOption({
  Name: "build",
  Kind: "boolean",
  ShortName: "b",
  ShowInSimplifiedHelpView: true,
  Category: diagnostics.Command_line_Options,
  Description: diagnostics.Build_one_or_more_projects_and_their_dependencies_if_out_of_date,
  DefaultValueDescription: false,
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declsbuild.go::varGroup::OptionsForBuild","kind":"varGroup","status":"implemented","sigHash":"0918b24db3e3888e6db8f4f4e138d5dacec79a08404f5493d1993715efecdc2d"}
 *
 * Go source:
 * var OptionsForBuild = []*CommandLineOption{
 * 	&TscBuildOption,
 * 	{
 * 		Name:                    "verbose",
 * 		ShortName:               "v",
 * 		Category:                diagnostics.Command_line_Options,
 * 		Description:             diagnostics.Enable_verbose_logging,
 * 		Kind:                    "boolean",
 * 		DefaultValueDescription: false,
 * 	},
 * 	{
 * 		Name:                    "dry",
 * 		ShortName:               "d",
 * 		Category:                diagnostics.Command_line_Options,
 * 		Description:             diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
 * 		Kind:                    "boolean",
 * 		DefaultValueDescription: false,
 * 	},
 * 	{
 * 		Name:                    "force",
 * 		ShortName:               "f",
 * 		Category:                diagnostics.Command_line_Options,
 * 		Description:             diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
 * 		Kind:                    "boolean",
 * 		DefaultValueDescription: false,
 * 	},
 * 	{
 * 		Name:                    "clean",
 * 		Category:                diagnostics.Command_line_Options,
 * 		Description:             diagnostics.Delete_the_outputs_of_all_projects,
 * 		Kind:                    "boolean",
 * 		DefaultValueDescription: false,
 * 	},
 * 	{
 * 		Name:                    "builders",
 * 		Kind:                    CommandLineOptionTypeNumber,
 * 		Category:                diagnostics.Command_line_Options,
 * 		Description:             diagnostics.Set_the_number_of_projects_to_build_concurrently,
 * 		DefaultValueDescription: diagnostics.X_4_unless_singleThreaded_is_passed,
 * 		minValue:                1,
 * 	},
 * 	{
 * 		Name:                    "stopBuildOnErrors",
 * 		Category:                diagnostics.Command_line_Options,
 * 		Description:             diagnostics.Skip_building_downstream_projects_on_error_in_upstream_project,
 * 		Kind:                    "boolean",
 * 		DefaultValueDescription: false,
 * 	},
 * }
 */
export let OptionsForBuild: GoSlice<GoPtr<CommandLineOption>> = GoSliceBuild(7, 7, GoPointerValueOps<CommandLineOption>(), (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, TscBuildOption, GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 1, newCommandLineOption({
    Name: "verbose",
    ShortName: "v",
    Category: diagnostics.Command_line_Options,
    Description: diagnostics.Enable_verbose_logging,
    Kind: "boolean",
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 2, newCommandLineOption({
    Name: "dry",
    ShortName: "d",
    Category: diagnostics.Command_line_Options,
    Description: diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
    Kind: "boolean",
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 3, newCommandLineOption({
    Name: "force",
    ShortName: "f",
    Category: diagnostics.Command_line_Options,
    Description: diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
    Kind: "boolean",
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 4, newCommandLineOption({
    Name: "clean",
    Category: diagnostics.Command_line_Options,
    Description: diagnostics.Delete_the_outputs_of_all_projects,
    Kind: "boolean",
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 5, newCommandLineOption({
    Name: "builders",
    Kind: CommandLineOptionTypeNumber,
    Category: diagnostics.Command_line_Options,
    Description: diagnostics.Set_the_number_of_projects_to_build_concurrently,
    DefaultValueDescription: diagnostics.X_4_unless_singleThreaded_is_passed,
    minValue: 1,
  }), GoPointerValueOps<CommandLineOption>());
  GoSliceStore(__goSliceLiteral, 6, newCommandLineOption({
    Name: "stopBuildOnErrors",
    Category: diagnostics.Command_line_Options,
    Description: diagnostics.Skip_building_downstream_projects_on_error_in_upstream_project,
    Kind: "boolean",
    DefaultValueDescription: false,
  }), GoPointerValueOps<CommandLineOption>());
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/declsbuild.go::varGroup::BuildOpts","kind":"varGroup","status":"implemented","sigHash":"ba050040576845fb598bec7266fd2f8f40a68dd880b95234e445384541fd90ab"}
 *
 * Go source:
 * var BuildOpts = slices.Concat(commonOptionsWithBuild, OptionsForBuild)
 */
export let BuildOpts: GoSlice<GoPtr<CommandLineOption>> = Concat(commonOptionsWithBuild, OptionsForBuild);
