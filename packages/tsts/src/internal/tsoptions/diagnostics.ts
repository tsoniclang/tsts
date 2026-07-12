import type { GoPtr, GoSlice } from "../../go/compat.js";
import { Once } from "../../go/sync.js";
import type { Message } from "../diagnostics/diagnostics.js";
import type { CommandLineOption } from "./commandlineoption.js";
import { BuildNameMap, CompilerNameMap } from "./namemap.js";
import type { NameMap } from "./namemap.js";
import {
  Build_option_0_requires_a_value_of_type_1,
  Compiler_option_0_expects_an_argument,
  Compiler_option_0_may_not_be_used_with_build,
  Compiler_option_0_may_only_be_used_with_build,
  Unknown_build_option_0,
  Unknown_build_option_0_Did_you_mean_1,
  Unknown_compiler_option_0,
  Unknown_compiler_option_0_Did_you_mean_1,
  Unknown_watch_option_0,
  Unknown_watch_option_0_Did_you_mean_1,
  Watch_option_0_requires_a_value_of_type_1,
} from "../diagnostics/generated/messages.js";
import { BuildOpts } from "./declsbuild.js";
import { OptionsDeclarations } from "./declscompiler.js";
import { OptionsForWatch } from "./declswatch.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::type::DidYouMeanOptionsDiagnostics","kind":"type","status":"implemented","sigHash":"dc632d6912763754c1599dd99d1c79d6a6ab027017c8f569679c41c24ba85fb8"}
 *
 * Go source:
 * DidYouMeanOptionsDiagnostics struct {
 * 	alternateMode               *AlternateModeDiagnostics
 * 	OptionDeclarations          []*CommandLineOption
 * 	UnknownOptionDiagnostic     *diagnostics.Message
 * 	UnknownDidYouMeanDiagnostic *diagnostics.Message
 * }
 */
export interface DidYouMeanOptionsDiagnostics {
  alternateMode: GoPtr<AlternateModeDiagnostics>;
  OptionDeclarations: GoSlice<GoPtr<CommandLineOption>>;
  UnknownOptionDiagnostic: GoPtr<Message>;
  UnknownDidYouMeanDiagnostic: GoPtr<Message>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::type::AlternateModeDiagnostics","kind":"type","status":"implemented","sigHash":"975703251e52b09ff5c6705af7d1314a37a67f7da2cbd0945bac24f993a19af3"}
 *
 * Go source:
 * AlternateModeDiagnostics struct {
 * 	diagnostic     *diagnostics.Message
 * 	optionsNameMap *NameMap
 * }
 */
export interface AlternateModeDiagnostics {
  diagnostic: GoPtr<Message>;
  optionsNameMap: GoPtr<NameMap>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::type::ParseCommandLineWorkerDiagnostics","kind":"type","status":"implemented","sigHash":"40084db6819492a2e57dd92da28b40bb2b9556cb86fbb20864296d964f4f3a29"}
 *
 * Go source:
 * ParseCommandLineWorkerDiagnostics struct {
 * 	didYouMean                   DidYouMeanOptionsDiagnostics
 * 	optionsNameMap               *NameMap
 * 	optionsNameMapOnce           sync.Once
 * 	OptionTypeMismatchDiagnostic *diagnostics.Message
 * }
 */
export interface ParseCommandLineWorkerDiagnostics {
  didYouMean: DidYouMeanOptionsDiagnostics;
  optionsNameMap: GoPtr<NameMap>;
  optionsNameMapOnce: Once;
  OptionTypeMismatchDiagnostic: GoPtr<Message>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::varGroup::CompilerOptionsDidYouMeanDiagnostics","kind":"varGroup","status":"implemented","sigHash":"dcdfbf2c1ba0f27124c2d2c9715154c65a51e3d370cd82460a8be1d633b9d777"}
 *
 * Go source:
 * var CompilerOptionsDidYouMeanDiagnostics = getParseCommandLineWorkerDiagnostics(OptionsDeclarations)
 */
// Go initializes package-level vars by dependency order; assigned after
// OptionsDeclarations is initialized in declscompiler.ts.
export let CompilerOptionsDidYouMeanDiagnostics: GoPtr<ParseCommandLineWorkerDiagnostics> = undefined;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::func::getParseCommandLineWorkerDiagnostics","kind":"func","status":"implemented","sigHash":"5e6ee1a7dbb0b0305303b2ca7598920e4df8215ea06c1b71675ce63417f4e960"}
 *
 * Go source:
 * func getParseCommandLineWorkerDiagnostics(decls []*CommandLineOption) *ParseCommandLineWorkerDiagnostics {
 * 	// this will only return the correct diagnostics for `compiler` mode, and is factored into a function for testing reasons.
 * 	return &ParseCommandLineWorkerDiagnostics{
 * 		didYouMean: DidYouMeanOptionsDiagnostics{
 * 			alternateMode: &AlternateModeDiagnostics{
 * 				diagnostic:     diagnostics.Compiler_option_0_may_only_be_used_with_build,
 * 				optionsNameMap: BuildNameMap,
 * 			},
 * 			OptionDeclarations:          decls,
 * 			UnknownOptionDiagnostic:     diagnostics.Unknown_compiler_option_0,
 * 			UnknownDidYouMeanDiagnostic: diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
 * 		},
 * 		OptionTypeMismatchDiagnostic: diagnostics.Compiler_option_0_expects_an_argument,
 * 	}
 * }
 */
export function getParseCommandLineWorkerDiagnostics(decls: GoSlice<GoPtr<CommandLineOption>>): GoPtr<ParseCommandLineWorkerDiagnostics> {
  return {
    didYouMean: {
      alternateMode: {
        diagnostic: Compiler_option_0_may_only_be_used_with_build,
        optionsNameMap: BuildNameMap as GoPtr<NameMap>,
      },
      OptionDeclarations: decls,
      UnknownOptionDiagnostic: Unknown_compiler_option_0,
      UnknownDidYouMeanDiagnostic: Unknown_compiler_option_0_Did_you_mean_1,
    },
    optionsNameMap: undefined,
    optionsNameMapOnce: new Once(),
    OptionTypeMismatchDiagnostic: Compiler_option_0_expects_an_argument,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::varGroup::watchOptionsDidYouMeanDiagnostics","kind":"varGroup","status":"implemented","sigHash":"8904f04db16550d00bfc933d407974de479ec8b94304d957a3645284087191ef"}
 *
 * Go source:
 * var watchOptionsDidYouMeanDiagnostics = &ParseCommandLineWorkerDiagnostics{
 * 	didYouMean: DidYouMeanOptionsDiagnostics{
 * 		// no alternateMode
 * 		OptionDeclarations:          OptionsForWatch,
 * 		UnknownOptionDiagnostic:     diagnostics.Unknown_watch_option_0,
 * 		UnknownDidYouMeanDiagnostic: diagnostics.Unknown_watch_option_0_Did_you_mean_1,
 * 	},
 * 	OptionTypeMismatchDiagnostic: diagnostics.Watch_option_0_requires_a_value_of_type_1,
 * }
 */
// Go initializes package-level vars by dependency order; assigned after
// OptionsForWatch is initialized in declswatch.ts.
export let watchOptionsDidYouMeanDiagnostics: GoPtr<ParseCommandLineWorkerDiagnostics> = undefined;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/diagnostics.go::varGroup::buildOptionsDidYouMeanDiagnostics","kind":"varGroup","status":"implemented","sigHash":"82367338c4879fe397da04e723c5eb0818a1777fa154ea066902967579bff305"}
 *
 * Go source:
 * var buildOptionsDidYouMeanDiagnostics = &ParseCommandLineWorkerDiagnostics{
 * 	didYouMean: DidYouMeanOptionsDiagnostics{
 * 		alternateMode: &AlternateModeDiagnostics{
 * 			diagnostic:     diagnostics.Compiler_option_0_may_not_be_used_with_build,
 * 			optionsNameMap: CompilerNameMap,
 * 		},
 * 		OptionDeclarations:          BuildOpts,
 * 		UnknownOptionDiagnostic:     diagnostics.Unknown_build_option_0,
 * 		UnknownDidYouMeanDiagnostic: diagnostics.Unknown_build_option_0_Did_you_mean_1,
 * 	},
 * 	OptionTypeMismatchDiagnostic: diagnostics.Build_option_0_requires_a_value_of_type_1,
 * }
 */
// Go initializes package-level vars by dependency order; assigned after
// BuildOpts and CompilerNameMap are initialized.
export let buildOptionsDidYouMeanDiagnostics: GoPtr<ParseCommandLineWorkerDiagnostics> = undefined;

// Assigned here (after all dependent vars are initialized in their modules)
// to match Go's dependency-ordered package-level var initialization.
CompilerOptionsDidYouMeanDiagnostics = getParseCommandLineWorkerDiagnostics(OptionsDeclarations);

watchOptionsDidYouMeanDiagnostics = {
  didYouMean: {
    alternateMode: undefined,
    OptionDeclarations: OptionsForWatch,
    UnknownOptionDiagnostic: Unknown_watch_option_0,
    UnknownDidYouMeanDiagnostic: Unknown_watch_option_0_Did_you_mean_1,
  },
  optionsNameMap: undefined,
  optionsNameMapOnce: new Once(),
  OptionTypeMismatchDiagnostic: Watch_option_0_requires_a_value_of_type_1,
};

buildOptionsDidYouMeanDiagnostics = {
  didYouMean: {
    alternateMode: {
      diagnostic: Compiler_option_0_may_not_be_used_with_build,
      optionsNameMap: CompilerNameMap,
    },
    OptionDeclarations: BuildOpts,
    UnknownOptionDiagnostic: Unknown_build_option_0,
    UnknownDidYouMeanDiagnostic: Unknown_build_option_0_Did_you_mean_1,
  },
  optionsNameMap: undefined,
  optionsNameMapOnce: new Once(),
  OptionTypeMismatchDiagnostic: Build_option_0_requires_a_value_of_type_1,
};
