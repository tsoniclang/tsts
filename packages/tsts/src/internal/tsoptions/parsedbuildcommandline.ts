import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";
import type { Once } from "../../go/sync.js";
import type { Diagnostic } from "../ast/diagnostic.js";
import type { BuildOptions } from "../core/buildoptions.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { Map } from "../core/core.js";
import { ResolveConfigFileNameOfProjectReference } from "../core/projectreference.js";
import type { WatchOptions } from "../core/watchoptions.js";
import type { Locale as Locale_b0d69dd1 } from "../locale/locale.js";
import { Parse } from "../locale/locale.js";
import type { ComparePathsOptions } from "../tspath/path.js";
import { ResolvePath } from "../tspath/path.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedbuildcommandline.go::type::ParsedBuildCommandLine","kind":"type","status":"implemented","sigHash":"38430521b70f19c4577653334ca223fc0270319362c20f5925094804f9baee54"}
 *
 * Go source:
 * ParsedBuildCommandLine struct {
 * 	BuildOptions    *core.BuildOptions    `json:"buildOptions"`
 * 	CompilerOptions *core.CompilerOptions `json:"compilerOptions"`
 * 	WatchOptions    *core.WatchOptions    `json:"watchOptions"`
 * 	Projects        []string              `json:"projects"`
 * 	Errors          []*ast.Diagnostic     `json:"errors"`
 * 	Raw             any                   `json:"raw"`
 * 
 * 	comparePathsOptions tspath.ComparePathsOptions
 * 
 * 	resolvedProjectPaths     []string
 * 	resolvedProjectPathsOnce sync.Once
 * 
 * 	locale     locale.Locale
 * 	localeOnce sync.Once
 * }
 */
export interface ParsedBuildCommandLine {
  BuildOptions: GoPtr<BuildOptions>;
  CompilerOptions: GoPtr<CompilerOptions>;
  WatchOptions: GoPtr<WatchOptions>;
  Projects: GoSlice<string>;
  Errors: GoSlice<GoPtr<Diagnostic>>;
  Raw: GoInterface<unknown>;
  comparePathsOptions: ComparePathsOptions;
  resolvedProjectPaths: GoSlice<string>;
  resolvedProjectPathsOnce: Once;
  locale: Locale_b0d69dd1;
  localeOnce: Once;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedbuildcommandline.go::method::ParsedBuildCommandLine.ResolvedProjectPaths","kind":"method","status":"implemented","sigHash":"62d754c0a97d15832830d10c5f4f3c52e86d46117e3f8b18cee454ea84eba9d3"}
 *
 * Go source:
 * func (p *ParsedBuildCommandLine) ResolvedProjectPaths() []string {
 * 	p.resolvedProjectPathsOnce.Do(func() {
 * 		p.resolvedProjectPaths = core.Map(p.Projects, func(project string) string {
 * 			return core.ResolveConfigFileNameOfProjectReference(
 * 				tspath.ResolvePath(p.comparePathsOptions.CurrentDirectory, project),
 * 			)
 * 		})
 * 	})
 * 	return p.resolvedProjectPaths
 * }
 */
export function ParsedBuildCommandLine_ResolvedProjectPaths(receiver: GoPtr<ParsedBuildCommandLine>): GoSlice<string> {
  const p = receiver!;
  p.resolvedProjectPathsOnce.Do(() => {
    p.resolvedProjectPaths = Map(p.Projects, (project: string): string => {
      return ResolveConfigFileNameOfProjectReference(
        ResolvePath(p.comparePathsOptions.CurrentDirectory, project),
      );
    });
  });
  return p.resolvedProjectPaths;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedbuildcommandline.go::method::ParsedBuildCommandLine.Locale","kind":"method","status":"implemented","sigHash":"9a8cd080656f5b01c936f67be6eefe5787f36aa224c0a6d49e1db0d2401fce0a"}
 *
 * Go source:
 * func (p *ParsedBuildCommandLine) Locale() locale.Locale {
 * 	p.localeOnce.Do(func() {
 * 		p.locale, _ = locale.Parse(p.CompilerOptions.Locale)
 * 	})
 * 	return p.locale
 * }
 */
export function ParsedBuildCommandLine_Locale(receiver: GoPtr<ParsedBuildCommandLine>): Locale_b0d69dd1 {
  const p = receiver!;
  p.localeOnce.Do(() => {
    [p.locale] = Parse(p.CompilerOptions!.Locale);
  });
  return p.locale;
}

type ParsedBuildCommandLineJsonFields = JsonFieldNamesForGoStructContract<
  ParsedBuildCommandLine,
  "github.com/microsoft/typescript-go::internal/tsoptions/parsedbuildcommandline.go::type::ParsedBuildCommandLine",
  {
    readonly BuildOptions: { readonly name: "buildOptions"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly CompilerOptions: { readonly name: "compilerOptions"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly WatchOptions: { readonly name: "watchOptions"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Projects: { readonly name: "projects"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Errors: { readonly name: "errors"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Raw: { readonly name: "raw"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
  }
>;
