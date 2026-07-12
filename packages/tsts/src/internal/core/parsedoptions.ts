import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";
import type { CompilerOptions } from "./compileroptions.js";
import type { ProjectReference } from "./projectreference.js";
import type { TypeAcquisition } from "./typeacquisition.js";
import type { WatchOptions } from "./watchoptions.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/parsedoptions.go::type::ParsedOptions","kind":"type","status":"implemented","sigHash":"4a3fa626f8748d10f8940cce5fe64dd831af1046e2c5dfd1dd533442aeb1f91c","bodyHash":"0f65410cc23f8d47bdf67aff7225c4756290c803a7e37daaa8e533ae6e7b22da"}
 *
 * Go source:
 * ParsedOptions struct {
 * 	CompilerOptions *CompilerOptions `json:"compilerOptions"`
 * 	WatchOptions    *WatchOptions    `json:"watchOptions"`
 * 	TypeAcquisition *TypeAcquisition `json:"typeAcquisition"`
 * 
 * 	FileNames         []string            `json:"fileNames"`
 * 	ProjectReferences []*ProjectReference `json:"projectReferences"`
 * }
 */
export interface ParsedOptions {
  CompilerOptions: GoPtr<CompilerOptions>;
  WatchOptions: GoPtr<WatchOptions>;
  TypeAcquisition: GoPtr<TypeAcquisition>;
  FileNames: GoSlice<string>;
  ProjectReferences: GoSlice<GoPtr<ProjectReference>>;
}

type ParsedOptionsJsonFields = JsonFieldNamesForGoStructContract<
  ParsedOptions,
  "github.com/microsoft/typescript-go::internal/core/parsedoptions.go::type::ParsedOptions",
  {
    readonly CompilerOptions: { readonly name: "compilerOptions"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly WatchOptions: { readonly name: "watchOptions"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly TypeAcquisition: { readonly name: "typeAcquisition"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly FileNames: { readonly name: "fileNames"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ProjectReferences: { readonly name: "projectReferences"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
  }
>;
