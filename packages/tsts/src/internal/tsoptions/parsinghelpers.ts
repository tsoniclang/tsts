import type { bool, int } from "../../go/scalars.js";
import type { GoConstraint, GoPtr, GoSlice } from "../../go/compat.js";
import type { Diagnostic } from "../ast/diagnostic.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import {
  NewOrderedMapWithSizeHint,
  OrderedMap_Entries,
  OrderedMap_Get,
  OrderedMap_Set,
  OrderedMap_Size,
} from "../collections/ordered_map.js";
import type { BuildOptions } from "../core/buildoptions.js";
import type {
  CompilerOptions,
  JsxEmit,
  ModuleDetectionKind,
  ModuleKind,
  ModuleResolutionKind,
  NewLineKind,
  ScriptTarget,
} from "../core/compileroptions.js";
import { Map as core_Map } from "../core/core.js";
import type { ProjectReference } from "../core/projectreference.js";
import type { Tristate } from "../core/tristate.js";
import { TSFalse, TSTrue, TSUnknown } from "../core/tristate.js";
import type { TypeAcquisition } from "../core/typeacquisition.js";
import type {
  PollingKind,
  WatchDirectoryKind,
  WatchFileKind,
  WatchOptions,
} from "../core/watchoptions.js";
import type { Message } from "../diagnostics/diagnostics.js";
import { GetNormalizedAbsolutePath } from "../tspath/path.js";
import {
  CommandLineOption_Elements,
  CommandLineOptionTypeList,
} from "./commandlineoption.js";
import { extraKeyDiagnostics, extraKeyDidYouMeanDiagnostics } from "./errors.js";
import type { CommandLineOptionNameMap } from "./tsconfigparsing.js";
import {
  CommandLineCompilerOptionsMap,
  CommandLineOptionNameMap_Get,
  isOrderedMap,
} from "./tsconfigparsing.js";
import { BuildNameMap, NameMap_Get } from "./namemap.js";
import type { NameMap } from "./namemap.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseTristate","kind":"func","status":"implemented","sigHash":"49c663f5d4d2bfc54d4329d3c33406f6d96155082766b6de7630809dacb0801b","bodyHash":"5c576abd91bbe40ecd51373a6380cc36bcf1cfe3c57c1bf45e846fd8bcd7885f"}
 *
 * Go source:
 * func ParseTristate(value any) core.Tristate {
 * 	if value == nil {
 * 		return core.TSUnknown
 * 	}
 * 	if v, ok := value.(core.Tristate); ok {
 * 		return v
 * 	}
 * 	if value == true {
 * 		return core.TSTrue
 * 	} else {
 * 		return core.TSFalse
 * 	}
 * }
 */
export function ParseTristate(value: unknown): Tristate {
  if (value === undefined) {
    return TSUnknown;
  }
  if (typeof value === "number") {
    const v: Tristate = value as Tristate;
    return v;
  }
  if (value === true) {
    return TSTrue;
  } else {
    return TSFalse;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseStringArray","kind":"func","status":"implemented","sigHash":"36b233b78f885e44a5986a3a3605e2f65b58c5262604c75af06bdf4918ec8442","bodyHash":"a5b8c8cbb8f98466b8c26e8a3f0b799f81d8ba1dd33b909b42365ddd699b1bf0"}
 *
 * Go source:
 * func ParseStringArray(value any) []string {
 * 	if arr, ok := value.([]any); ok {
 * 		if arr == nil {
 * 			return nil
 * 		}
 * 		result := make([]string, 0, len(arr))
 * 		for _, v := range arr {
 * 			if str, ok := v.(string); ok {
 * 				result = append(result, str)
 * 			}
 * 		}
 * 		return result
 * 	}
 * 	return nil
 * }
 */
export function ParseStringArray(value: unknown): GoPtr<GoSlice<string>> {
  if (globalThis.Array.isArray(value)) {
    const arr = value as unknown[];
    const result: GoSlice<string> = [];
    for (const v of arr) {
      if (typeof v === "string") {
        result.push(v);
      }
    }
    return result;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseStringMap","kind":"func","status":"implemented","sigHash":"44db66c10f86c995c3674b1cf3c4074a364d8577dba6707a74e44b8bb59004ce","bodyHash":"2559ee4831f78efbceee2502059a69ed20babd3920b5c97f45f49e10a8e517d3"}
 *
 * Go source:
 * func parseStringMap(value any) *collections.OrderedMap[string, []string] {
 * 	if m, ok := value.(*collections.OrderedMap[string, any]); ok {
 * 		result := collections.NewOrderedMapWithSizeHint[string, []string](m.Size())
 * 		for k, v := range m.Entries() {
 * 			result.Set(k, ParseStringArray(v))
 * 		}
 * 		return result
 * 	}
 * 	return nil
 * }
 */
export function parseStringMap(value: unknown): GoPtr<OrderedMap<string, GoSlice<string>>> {
  const m = asOrderedMap(value);
  if (m !== undefined) {
    const result = NewOrderedMapWithSizeHint<string, GoSlice<string>>(OrderedMap_Size(m));
    OrderedMap_Entries(m as GoPtr<OrderedMap<string, unknown>>)((k: string, v: unknown): bool => {
      OrderedMap_Set(result, k, ParseStringArray(v));
      return true;
    });
    return result;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseString","kind":"func","status":"implemented","sigHash":"e2e4b2eb4386c97194e65b39bad6355bfc2d7aa1bc2872c43f57a2f826f48c5d","bodyHash":"5c2be08fe320f223e1ad3fd8e78f47a55cf55bd4a04f9c65e270d74b35de7fd6"}
 *
 * Go source:
 * func ParseString(value any) string {
 * 	if str, ok := value.(string); ok {
 * 		return str
 * 	}
 * 	return ""
 * }
 */
export function ParseString(value: unknown): string {
  if (typeof value === "string") {
    const str: string = value;
    return str;
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseNumber","kind":"func","status":"implemented","sigHash":"c8e2c76e517fa4a8fa061e2c3ce415d7652cdc1d3b38ebea5097e0d79fe4d3e4","bodyHash":"b00067537e686113ed8b821c9f3351b1c44129238827f4c5deadb4327bb529d5"}
 *
 * Go source:
 * func parseNumber(value any) *int {
 * 	if num, ok := value.(int); ok {
 * 		return &num
 * 	}
 * 	if num, ok := value.(float64); ok {
 * 		n := int(num)
 * 		return &n
 * 	}
 * 	return nil
 * }
 */
export function parseNumber(value: unknown): GoPtr<int> {
  // Go distinguishes `int` (returned as-is) from `float64` (truncated via `int(num)`).
  // TS/JS has a single number type; JSON-sourced values arrive as float64 in Go, so
  // truncate toward zero to match `int(num)` (a no-op for integer-valued numbers).
  if (typeof value === "number") {
    if (globalThis.Number.isInteger(value)) {
      const num: int = value as int;
      return num;
    }
    const n: int = globalThis.Math.trunc(value) as int;
    return n;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::projectReferenceParseResult","kind":"type","status":"implemented","sigHash":"539ddbc5676f2a4d6c4eb53cf7d9e5267971e217e0ca6e81ca122404a489db5d","bodyHash":"9794f991e0b59baa6f2543051806c3aa954b23d93223a7882ea8769c41fc6fcd"}
 *
 * Go source:
 * projectReferenceParseResult struct {
 * 	reference     core.ProjectReference
 * 	hasPath       bool
 * 	pathValid     bool
 * 	hasCircular   bool
 * 	circularValid bool
 * }
 */
export interface projectReferenceParseResult {
  reference: ProjectReference;
  hasPath: bool;
  pathValid: bool;
  hasCircular: bool;
  circularValid: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseProjectReference","kind":"func","status":"implemented","sigHash":"ba560292952792e8b5a6c295f9837e0f11f3ecbf0486473f8f21f3032fc905c2","bodyHash":"98aea41772f6ea945e7ba31aebd3fb6b7af07c4194a10389e03dba1f7d005b01"}
 *
 * Go source:
 * func parseProjectReference(json any) *projectReferenceParseResult {
 * 	if v, ok := json.(*collections.OrderedMap[string, any]); ok {
 * 		result := &projectReferenceParseResult{}
 * 		if value, ok := v.Get("path"); ok {
 * 			result.hasPath = true
 * 			if path, ok := value.(string); ok {
 * 				result.reference.Path = path
 * 				result.pathValid = true
 * 			}
 * 		}
 * 		if value, ok := v.Get("circular"); ok {
 * 			result.hasCircular = true
 * 			if circular, ok := value.(bool); ok {
 * 				result.reference.Circular = circular
 * 				result.circularValid = true
 * 			}
 * 		}
 * 		return result
 * 	}
 * 	return nil
 * }
 */
export function parseProjectReference(json: unknown): GoPtr<projectReferenceParseResult> {
  if (!isOrderedMap(json)) {
    return undefined;
  }
  const v = json;
  const result: projectReferenceParseResult = {
    reference: { Path: "", OriginalPath: "", Circular: false },
    hasPath: false as bool,
    pathValid: false as bool,
    hasCircular: false as bool,
    circularValid: false as bool,
  };
  {
    const [value, ok] = OrderedMap_Get(v as GoPtr<OrderedMap<string, unknown>>, "path", () => undefined);
    if (ok) {
      result.hasPath = true as bool;
      if (typeof value === "string") {
        result.reference.Path = value;
        result.pathValid = true as bool;
      }
    }
  }
  {
    const [value, ok] = OrderedMap_Get(v as GoPtr<OrderedMap<string, unknown>>, "circular", () => undefined);
    if (ok) {
      result.hasCircular = true as bool;
      if (typeof value === "boolean") {
        result.reference.Circular = value as bool;
        result.circularValid = true as bool;
      }
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseJsonToStringKey","kind":"func","status":"implemented","sigHash":"e2aa05789812ea7808caa85537dded05e3f9d10f47c7b0e69615566f66b7be8c","bodyHash":"2d1f01d3d00baf2d79696ea4adb225642d19c6fefee267a11cf8f92568f86a45"}
 *
 * Go source:
 * func parseJsonToStringKey(json any) *collections.OrderedMap[string, any] {
 * 	result := collections.NewOrderedMapWithSizeHint[string, any](6)
 * 	if m, ok := json.(*collections.OrderedMap[string, any]); ok {
 * 		if v, ok := m.Get("include"); ok {
 * 			result.Set("include", v)
 * 		}
 * 		if v, ok := m.Get("exclude"); ok {
 * 			result.Set("exclude", v)
 * 		}
 * 		if v, ok := m.Get("files"); ok {
 * 			result.Set("files", v)
 * 		}
 * 		if v, ok := m.Get("references"); ok {
 * 			result.Set("references", v)
 * 		}
 * 		if v, ok := m.Get("extends"); ok {
 * 			if str, ok := v.(string); ok {
 * 				result.Set("extends", []any{str})
 * 			}
 * 			result.Set("extends", v)
 * 		}
 * 		if v, ok := m.Get("compilerOptions"); ok {
 * 			result.Set("compilerOptions", v)
 * 		}
 * 		if v, ok := m.Get("excludes"); ok {
 * 			result.Set("excludes", v)
 * 		}
 * 		if v, ok := m.Get("typeAcquisition"); ok {
 * 			result.Set("typeAcquisition", v)
 * 		}
 * 	}
 * 	return result
 * }
 */
export function parseJsonToStringKey(json: unknown): GoPtr<OrderedMap<string, unknown>> {
  const result = NewOrderedMapWithSizeHint<string, unknown>(6 as int);
  const m = asOrderedMap(json) as GoPtr<OrderedMap<string, unknown>>;
  if (m !== undefined) {
    {
      const [v, ok] = OrderedMap_Get(m, "include", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "include", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "exclude", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "exclude", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "files", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "files", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "references", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "references", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "extends", () => undefined);
      if (ok) {
        if (typeof v === "string") {
          const str: string = v;
          OrderedMap_Set(result, "extends", [str] as GoSlice<unknown>);
        }
        OrderedMap_Set(result, "extends", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "compilerOptions", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "compilerOptions", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "excludes", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "excludes", v);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "typeAcquisition", () => undefined);
      if (ok) {
        OrderedMap_Set(result, "typeAcquisition", v);
      }
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::optionParser","kind":"type","status":"implemented","sigHash":"c409b167b74b0de7c2af5d5f47c3892bfb9612c524b3037b334afec6938063d7","bodyHash":"76bebf033feb06eb908a40f0dadd8562faf33be1877c89ab3bcb91043dd0a47e"}
 *
 * Go source:
 * optionParser interface {
 * 	ParseOption(key string, value any) []*ast.Diagnostic
 * 	UnknownOptionDiagnostic() *diagnostics.Message
 * 	UnknownDidYouMeanDiagnostic() *diagnostics.Message
 * }
 */
export interface optionParser {
  ParseOption(key: string, value: unknown): GoSlice<GoPtr<Diagnostic>>;
  UnknownOptionDiagnostic(): GoPtr<Message>;
  UnknownDidYouMeanDiagnostic(): GoPtr<Message>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::compilerOptionsParser","kind":"type","status":"implemented","sigHash":"7546cba537de554a50bcf32a30caa0b79ed2ed6598d92cc94e563f5d75580ba3","bodyHash":"31f1aea80830d374610b6c8a36cf1d579f81302c4617273ab320558d6bbe37fd"}
 *
 * Go source:
 * compilerOptionsParser struct {
 * 	*core.CompilerOptions
 * }
 */
export interface compilerOptionsParser {
  readonly __tsgoEmbedded0?: GoPtr<CompilerOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::compilerOptionsParser.ParseOption","kind":"method","status":"implemented","sigHash":"e3e5d3fa15a6c262a1dda4826b58471a520ff7c14b5aba00a340c7159f58db7a","bodyHash":"5038dce291d6eeaa8ddd6ddd8d6ab18502503877bc566bd94e5c2572f305bcd1"}
 *
 * Go source:
 * func (o *compilerOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseCompilerOptions(key, value, o.CompilerOptions)
 * }
 */
export function compilerOptionsParser_ParseOption(receiver: GoPtr<compilerOptionsParser>, key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseCompilerOptions(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::compilerOptionsParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"2805b20c83c398ecca3920b71c5f2cee674c7654617a7d39976a8a73630c56f0","bodyHash":"7b11f2c001ab97c2207804b3278afb761e72933af41b70109b335cd83f475136"}
 *
 * Go source:
 * func (o *compilerOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
 * 	return extraKeyDiagnostics("compilerOptions")
 * }
 */
export function compilerOptionsParser_UnknownOptionDiagnostic(receiver: GoPtr<compilerOptionsParser>): GoPtr<Message> {
  return extraKeyDiagnostics("compilerOptions");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::compilerOptionsParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"600d8c4e070559eeb11c56c6ab4520f80e829d22dc087bb193e74c0d8b1642e5","bodyHash":"1d8011c92f7bc7a8e6bc006c10d57c4d93c3a267c76ca4480fed95795c470b3e"}
 *
 * Go source:
 * func (o *compilerOptionsParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
 * 	return extraKeyDidYouMeanDiagnostics("compilerOptions")
 * }
 */
export function compilerOptionsParser_UnknownDidYouMeanDiagnostic(receiver: GoPtr<compilerOptionsParser>): GoPtr<Message> {
  return extraKeyDidYouMeanDiagnostics("compilerOptions");
}

export function compilerOptionsParser_as_optionParser(receiver: GoPtr<compilerOptionsParser>): optionParser {
  return {
    ParseOption: (key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> => compilerOptionsParser_ParseOption(receiver, key, value),
    UnknownOptionDiagnostic: (): GoPtr<Message> => compilerOptionsParser_UnknownOptionDiagnostic(receiver),
    UnknownDidYouMeanDiagnostic: (): GoPtr<Message> => compilerOptionsParser_UnknownDidYouMeanDiagnostic(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::watchOptionsParser","kind":"type","status":"implemented","sigHash":"717d985b9f4fbd959ea3dfa0bc4cefe234d97044ef558bdc4da4842c6f42d279","bodyHash":"9e3449cfacdb4ce17607d42cf450131ed77f40afdd891dcf5455088da61fc283"}
 *
 * Go source:
 * watchOptionsParser struct {
 * 	*core.WatchOptions
 * }
 */
export interface watchOptionsParser {
  readonly __tsgoEmbedded0?: GoPtr<WatchOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::watchOptionsParser.ParseOption","kind":"method","status":"implemented","sigHash":"b073e29c211f65f8841f95982afe6e4e380896b89bc36a6c6002eb18883d4f14","bodyHash":"fe0efae220519043bd6f2e27e87ebb60a43e25bc168342073403a41dc36d5e92"}
 *
 * Go source:
 * func (o *watchOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseWatchOptions(key, value, o.WatchOptions)
 * }
 */
export function watchOptionsParser_ParseOption(receiver: GoPtr<watchOptionsParser>, key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseWatchOptions(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::watchOptionsParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"386186a0698c47f990c81a35330acf866570e4d9e1774e0c2530c1442fd3e3fb","bodyHash":"560ea20a321b926fc4bda6581edbeafc35f950bc81e6330448f3f1bf6b30bc2d"}
 *
 * Go source:
 * func (o *watchOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
 * 	return extraKeyDiagnostics("watchOptions")
 * }
 */
export function watchOptionsParser_UnknownOptionDiagnostic(receiver: GoPtr<watchOptionsParser>): GoPtr<Message> {
  return extraKeyDiagnostics("watchOptions");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::watchOptionsParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"e3a95bc3f94b4b568bc7614455cbafed4cc687e33f80f2f764b558b872c6457d","bodyHash":"60d5c228919604de31526837270f0b06d50f362f5a23f462ca8182cc97acd5a3"}
 *
 * Go source:
 * func (o *watchOptionsParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
 * 	return extraKeyDidYouMeanDiagnostics("watchOptions")
 * }
 */
export function watchOptionsParser_UnknownDidYouMeanDiagnostic(receiver: GoPtr<watchOptionsParser>): GoPtr<Message> {
  return extraKeyDidYouMeanDiagnostics("watchOptions");
}

export function watchOptionsParser_as_optionParser(receiver: GoPtr<watchOptionsParser>): optionParser {
  return {
    ParseOption: (key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> => watchOptionsParser_ParseOption(receiver, key, value),
    UnknownOptionDiagnostic: (): GoPtr<Message> => watchOptionsParser_UnknownOptionDiagnostic(receiver),
    UnknownDidYouMeanDiagnostic: (): GoPtr<Message> => watchOptionsParser_UnknownDidYouMeanDiagnostic(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::typeAcquisitionParser","kind":"type","status":"implemented","sigHash":"77946037483b27af0b0c4ae904e5adb40be26fb99de8e2e96d2044a0bade7d10","bodyHash":"ccff6fccd1a6cc3ab79c03ef8f9c5f1b60c22e80d6d668fdf2d0c2db3b83ebe5"}
 *
 * Go source:
 * typeAcquisitionParser struct {
 * 	*core.TypeAcquisition
 * }
 */
export interface typeAcquisitionParser {
  readonly __tsgoEmbedded0?: GoPtr<TypeAcquisition>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::typeAcquisitionParser.ParseOption","kind":"method","status":"implemented","sigHash":"a227058fff8d5a5170e89c446fec7c0a6d152866673c34452c60ae230209cf79","bodyHash":"4e82fdce2656b2f7f39e2fc554d7a91dfc2728268dfe880c49c208cf1e6b2fc1"}
 *
 * Go source:
 * func (o *typeAcquisitionParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseTypeAcquisition(key, value, o.TypeAcquisition)
 * }
 */
export function typeAcquisitionParser_ParseOption(receiver: GoPtr<typeAcquisitionParser>, key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseTypeAcquisition(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::typeAcquisitionParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"d1f09afba585d4f8a973dd10339e1d133f59e05125fa8848041a796db6038b5d","bodyHash":"fbab6de5544100175e60f90dc36cf5ebdfdcc66ccb5653b1a62d52e94a831e86"}
 *
 * Go source:
 * func (o *typeAcquisitionParser) UnknownOptionDiagnostic() *diagnostics.Message {
 * 	return extraKeyDiagnostics("typeAcquisition")
 * }
 */
export function typeAcquisitionParser_UnknownOptionDiagnostic(receiver: GoPtr<typeAcquisitionParser>): GoPtr<Message> {
  return extraKeyDiagnostics("typeAcquisition");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::typeAcquisitionParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"f5d369b9e515a178f4c19ed221b47f064fd534f030cfd279ae81e0b64fa77856","bodyHash":"56eb4f434cd55edba887f5c78f17da84da8e39d48e69cd9beef0025d18f77e9a"}
 *
 * Go source:
 * func (o *typeAcquisitionParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
 * 	return extraKeyDidYouMeanDiagnostics("typeAcquisition")
 * }
 */
export function typeAcquisitionParser_UnknownDidYouMeanDiagnostic(receiver: GoPtr<typeAcquisitionParser>): GoPtr<Message> {
  return extraKeyDidYouMeanDiagnostics("typeAcquisition");
}

export function typeAcquisitionParser_as_optionParser(receiver: GoPtr<typeAcquisitionParser>): optionParser {
  return {
    ParseOption: (key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> => typeAcquisitionParser_ParseOption(receiver, key, value),
    UnknownOptionDiagnostic: (): GoPtr<Message> => typeAcquisitionParser_UnknownOptionDiagnostic(receiver),
    UnknownDidYouMeanDiagnostic: (): GoPtr<Message> => typeAcquisitionParser_UnknownDidYouMeanDiagnostic(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::buildOptionsParser","kind":"type","status":"implemented","sigHash":"2d4b139a2ed61f670d76f2f1f88010d9e88ef2137637c36959d2b404301ea721","bodyHash":"175101c1fd9d6b92c236fa198b07dedeb319571032fee1e7a6362786f043c099"}
 *
 * Go source:
 * buildOptionsParser struct {
 * 	*core.BuildOptions
 * }
 */
export interface buildOptionsParser {
  readonly __tsgoEmbedded0?: GoPtr<BuildOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::buildOptionsParser.ParseOption","kind":"method","status":"implemented","sigHash":"40f437214dbc7c3897c6a71142fcf2eb7a3811c20df1b3be0d75c73585fae2ad","bodyHash":"601ecea15399ca364a39cb21bdc1992ec88ed7d708b07b93804f5cd9679219f9"}
 *
 * Go source:
 * func (o *buildOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseBuildOptions(key, value, o.BuildOptions)
 * }
 */
export function buildOptionsParser_ParseOption(receiver: GoPtr<buildOptionsParser>, key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseBuildOptions(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::buildOptionsParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"127b39babd9dec69bc0bc017310e0790a343dd8c5ac7c097a1ae93edc6443d26","bodyHash":"466e7d71dd5b9e1784bc4e25fc977b3b766281cef656626fd728691eaea4b755"}
 *
 * Go source:
 * func (o *buildOptionsParser) UnknownOptionDiagnostic() *diagnostics.Message {
 * 	return extraKeyDiagnostics("buildOptions")
 * }
 */
export function buildOptionsParser_UnknownOptionDiagnostic(receiver: GoPtr<buildOptionsParser>): GoPtr<Message> {
  return extraKeyDiagnostics("buildOptions");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::buildOptionsParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"cf3326644424e4708bff1d8fd98c0ae5aea7a4d933ef171f3313e9f9d32f1b08","bodyHash":"3930cd123ded1785611a3c0bdbbca2a9e758c0112d139a839db44dd235aa4a28"}
 *
 * Go source:
 * func (o *buildOptionsParser) UnknownDidYouMeanDiagnostic() *diagnostics.Message {
 * 	return extraKeyDidYouMeanDiagnostics("buildOptions")
 * }
 */
export function buildOptionsParser_UnknownDidYouMeanDiagnostic(receiver: GoPtr<buildOptionsParser>): GoPtr<Message> {
  return extraKeyDidYouMeanDiagnostics("buildOptions");
}

export function buildOptionsParser_as_optionParser(receiver: GoPtr<buildOptionsParser>): optionParser {
  return {
    ParseOption: (key: string, value: unknown): GoSlice<GoPtr<Diagnostic>> => buildOptionsParser_ParseOption(receiver, key, value),
    UnknownOptionDiagnostic: (): GoPtr<Message> => buildOptionsParser_UnknownOptionDiagnostic(receiver),
    UnknownDidYouMeanDiagnostic: (): GoPtr<Message> => buildOptionsParser_UnknownDidYouMeanDiagnostic(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseCompilerOptions","kind":"func","status":"implemented","sigHash":"b68627376cdbbb84d8d916782adb8716c2b1da88ce4f01101eafc26ca2326d87","bodyHash":"8bea9a910d6b027ce1074dfc27dece31e284ab87e395875b051290d6d2c42f2b"}
 *
 * Go source:
 * func ParseCompilerOptions(key string, value any, allOptions *core.CompilerOptions) []*ast.Diagnostic {
 * 	if value == nil {
 * 		return nil
 * 	}
 * 	if allOptions == nil {
 * 		return nil
 * 	}
 * 	parseCompilerOptions(key, value, allOptions)
 * 	return nil
 * }
 */
export function ParseCompilerOptions(key: string, value: unknown, allOptions: GoPtr<CompilerOptions>): GoPtr<GoSlice<GoPtr<Diagnostic>>> {
  if (value === undefined) {
    return undefined;
  }
  if (allOptions === undefined) {
    return undefined;
  }
  parseCompilerOptions(key, value, allOptions);
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseCompilerOptions","kind":"func","status":"implemented","sigHash":"1232d65ea6f6391fbf016a09a53c9919379e0d6ad020090091e68ddc974f3db0","bodyHash":"9c68f9513226e2a697a9e81840cc3fac984713585a2905457a428372be77bf64"}
 *
 * Go source:
 * func parseCompilerOptions(key string, value any, allOptions *core.CompilerOptions) (foundKey bool) {
 * 	option := CommandLineCompilerOptionsMap.Get(key)
 * 	if option != nil {
 * 		key = option.Name
 * 	}
 * 	switch key {
 * 	case "allowJs":
 * 		allOptions.AllowJs = ParseTristate(value)
 * 	case "allowImportingTsExtensions":
 * 		allOptions.AllowImportingTsExtensions = ParseTristate(value)
 * 	case "allowSyntheticDefaultImports":
 * 		allOptions.AllowSyntheticDefaultImports = ParseTristate(value)
 * 	case "allowNonTsExtensions":
 * 		allOptions.AllowNonTsExtensions = ParseTristate(value)
 * 	case "allowUmdGlobalAccess":
 * 		allOptions.AllowUmdGlobalAccess = ParseTristate(value)
 * 	case "allowUnreachableCode":
 * 		allOptions.AllowUnreachableCode = ParseTristate(value)
 * 	case "allowUnusedLabels":
 * 		allOptions.AllowUnusedLabels = ParseTristate(value)
 * 	case "allowArbitraryExtensions":
 * 		allOptions.AllowArbitraryExtensions = ParseTristate(value)
 * 	case "alwaysStrict":
 * 		allOptions.AlwaysStrict = ParseTristate(value)
 * 	case "assumeChangesOnlyAffectDirectDependencies":
 * 		allOptions.AssumeChangesOnlyAffectDirectDependencies = ParseTristate(value)
 * 	case "baseUrl":
 * 		allOptions.BaseUrl = ParseString(value)
 * 	case "build":
 * 		allOptions.Build = ParseTristate(value)
 * 	case "checkJs":
 * 		allOptions.CheckJs = ParseTristate(value)
 * 	case "customConditions":
 * 		allOptions.CustomConditions = ParseStringArray(value)
 * 	case "composite":
 * 		allOptions.Composite = ParseTristate(value)
 * 	case "declarationDir":
 * 		allOptions.DeclarationDir = ParseString(value)
 * 	case "deduplicatePackages":
 * 		allOptions.DeduplicatePackages = ParseTristate(value)
 * 	case "diagnostics":
 * 		allOptions.Diagnostics = ParseTristate(value)
 * 	case "disableSizeLimit":
 * 		allOptions.DisableSizeLimit = ParseTristate(value)
 * 	case "disableSourceOfProjectReferenceRedirect":
 * 		allOptions.DisableSourceOfProjectReferenceRedirect = ParseTristate(value)
 * 	case "disableSolutionSearching":
 * 		allOptions.DisableSolutionSearching = ParseTristate(value)
 * 	case "disableReferencedProjectLoad":
 * 		allOptions.DisableReferencedProjectLoad = ParseTristate(value)
 * 	case "declarationMap":
 * 		allOptions.DeclarationMap = ParseTristate(value)
 * 	case "declaration":
 * 		allOptions.Declaration = ParseTristate(value)
 * 	case "downlevelIteration":
 * 		allOptions.DownlevelIteration = ParseTristate(value)
 * 	case "erasableSyntaxOnly":
 * 		allOptions.ErasableSyntaxOnly = ParseTristate(value)
 * 	case "emitDeclarationOnly":
 * 		allOptions.EmitDeclarationOnly = ParseTristate(value)
 * 	case "extendedDiagnostics":
 * 		allOptions.ExtendedDiagnostics = ParseTristate(value)
 * 	case "emitDecoratorMetadata":
 * 		allOptions.EmitDecoratorMetadata = ParseTristate(value)
 * 	case "emitBOM":
 * 		allOptions.EmitBOM = ParseTristate(value)
 * 	case "esModuleInterop":
 * 		allOptions.ESModuleInterop = ParseTristate(value)
 * 	case "exactOptionalPropertyTypes":
 * 		allOptions.ExactOptionalPropertyTypes = ParseTristate(value)
 * 	case "explainFiles":
 * 		allOptions.ExplainFiles = ParseTristate(value)
 * 	case "experimentalDecorators":
 * 		allOptions.ExperimentalDecorators = ParseTristate(value)
 * 	case "forceConsistentCasingInFileNames":
 * 		allOptions.ForceConsistentCasingInFileNames = ParseTristate(value)
 * 	case "generateCpuProfile":
 * 		allOptions.GenerateCpuProfile = ParseString(value)
 * 	case "generateTrace":
 * 		allOptions.GenerateTrace = ParseString(value)
 * 	case "isolatedModules":
 * 		allOptions.IsolatedModules = ParseTristate(value)
 * 	case "ignoreConfig":
 * 		allOptions.IgnoreConfig = ParseTristate(value)
 * 	case "ignoreDeprecations":
 * 		allOptions.IgnoreDeprecations = ParseString(value)
 * 	case "importHelpers":
 * 		allOptions.ImportHelpers = ParseTristate(value)
 * 	case "incremental":
 * 		allOptions.Incremental = ParseTristate(value)
 * 	case "init":
 * 		allOptions.Init = ParseTristate(value)
 * 	case "inlineSourceMap":
 * 		allOptions.InlineSourceMap = ParseTristate(value)
 * 	case "inlineSources":
 * 		allOptions.InlineSources = ParseTristate(value)
 * 	case "isolatedDeclarations":
 * 		allOptions.IsolatedDeclarations = ParseTristate(value)
 * 	case "jsx":
 * 		allOptions.Jsx = floatOrInt32ToFlag[core.JsxEmit](value)
 * 	case "jsxFactory":
 * 		allOptions.JsxFactory = ParseString(value)
 * 	case "jsxFragmentFactory":
 * 		allOptions.JsxFragmentFactory = ParseString(value)
 * 	case "jsxImportSource":
 * 		allOptions.JsxImportSource = ParseString(value)
 * 	case "lib":
 * 		if _, ok := value.([]string); ok {
 * 			allOptions.Lib = value.([]string)
 * 		} else {
 * 			allOptions.Lib = ParseStringArray(value)
 * 		}
 * 	case "libReplacement":
 * 		allOptions.LibReplacement = ParseTristate(value)
 * 	case "listEmittedFiles":
 * 		allOptions.ListEmittedFiles = ParseTristate(value)
 * 	case "listFiles":
 * 		allOptions.ListFiles = ParseTristate(value)
 * 	case "listFilesOnly":
 * 		allOptions.ListFilesOnly = ParseTristate(value)
 * 	case "locale":
 * 		allOptions.Locale = ParseString(value)
 * 	case "mapRoot":
 * 		allOptions.MapRoot = ParseString(value)
 * 	case "module":
 * 		allOptions.Module = floatOrInt32ToFlag[core.ModuleKind](value)
 * 	case "moduleDetectionKind":
 * 		allOptions.ModuleDetection = floatOrInt32ToFlag[core.ModuleDetectionKind](value)
 * 	case "moduleResolution":
 * 		allOptions.ModuleResolution = floatOrInt32ToFlag[core.ModuleResolutionKind](value)
 * 	case "moduleSuffixes":
 * 		allOptions.ModuleSuffixes = ParseStringArray(value)
 * 	case "moduleDetection":
 * 		allOptions.ModuleDetection = floatOrInt32ToFlag[core.ModuleDetectionKind](value)
 * 	case "noCheck":
 * 		allOptions.NoCheck = ParseTristate(value)
 * 	case "noFallthroughCasesInSwitch":
 * 		allOptions.NoFallthroughCasesInSwitch = ParseTristate(value)
 * 	case "noEmitForJsFiles":
 * 		allOptions.NoEmitForJsFiles = ParseTristate(value)
 * 	case "noErrorTruncation":
 * 		allOptions.NoErrorTruncation = ParseTristate(value)
 * 	case "noImplicitAny":
 * 		allOptions.NoImplicitAny = ParseTristate(value)
 * 	case "noImplicitThis":
 * 		allOptions.NoImplicitThis = ParseTristate(value)
 * 	case "noLib":
 * 		allOptions.NoLib = ParseTristate(value)
 * 	case "noPropertyAccessFromIndexSignature":
 * 		allOptions.NoPropertyAccessFromIndexSignature = ParseTristate(value)
 * 	case "noUncheckedIndexedAccess":
 * 		allOptions.NoUncheckedIndexedAccess = ParseTristate(value)
 * 	case "noEmitHelpers":
 * 		allOptions.NoEmitHelpers = ParseTristate(value)
 * 	case "noEmitOnError":
 * 		allOptions.NoEmitOnError = ParseTristate(value)
 * 	case "noImplicitReturns":
 * 		allOptions.NoImplicitReturns = ParseTristate(value)
 * 	case "noUnusedLocals":
 * 		allOptions.NoUnusedLocals = ParseTristate(value)
 * 	case "noUnusedParameters":
 * 		allOptions.NoUnusedParameters = ParseTristate(value)
 * 	case "noImplicitOverride":
 * 		allOptions.NoImplicitOverride = ParseTristate(value)
 * 	case "noUncheckedSideEffectImports":
 * 		allOptions.NoUncheckedSideEffectImports = ParseTristate(value)
 * 	case "outFile":
 * 		allOptions.OutFile = ParseString(value)
 * 	case "noResolve":
 * 		allOptions.NoResolve = ParseTristate(value)
 * 	case "paths":
 * 		allOptions.Paths = parseStringMap(value)
 * 	case "preserveWatchOutput":
 * 		allOptions.PreserveWatchOutput = ParseTristate(value)
 * 	case "preserveConstEnums":
 * 		allOptions.PreserveConstEnums = ParseTristate(value)
 * 	case "preserveSymlinks":
 * 		allOptions.PreserveSymlinks = ParseTristate(value)
 * 	case "project":
 * 		allOptions.Project = ParseString(value)
 * 	case "pretty":
 * 		allOptions.Pretty = ParseTristate(value)
 * 	case "resolveJsonModule":
 * 		allOptions.ResolveJsonModule = ParseTristate(value)
 * 	case "resolvePackageJsonExports":
 * 		allOptions.ResolvePackageJsonExports = ParseTristate(value)
 * 	case "resolvePackageJsonImports":
 * 		allOptions.ResolvePackageJsonImports = ParseTristate(value)
 * 	case "reactNamespace":
 * 		allOptions.ReactNamespace = ParseString(value)
 * 	case "rewriteRelativeImportExtensions":
 * 		allOptions.RewriteRelativeImportExtensions = ParseTristate(value)
 * 	case "rootDir":
 * 		allOptions.RootDir = ParseString(value)
 * 	case "rootDirs":
 * 		allOptions.RootDirs = ParseStringArray(value)
 * 	case "removeComments":
 * 		allOptions.RemoveComments = ParseTristate(value)
 * 	case "stableTypeOrdering":
 * 		allOptions.StableTypeOrdering = ParseTristate(value)
 * 	case "strict":
 * 		allOptions.Strict = ParseTristate(value)
 * 	case "strictBindCallApply":
 * 		allOptions.StrictBindCallApply = ParseTristate(value)
 * 	case "strictBuiltinIteratorReturn":
 * 		allOptions.StrictBuiltinIteratorReturn = ParseTristate(value)
 * 	case "strictFunctionTypes":
 * 		allOptions.StrictFunctionTypes = ParseTristate(value)
 * 	case "strictNullChecks":
 * 		allOptions.StrictNullChecks = ParseTristate(value)
 * 	case "strictPropertyInitialization":
 * 		allOptions.StrictPropertyInitialization = ParseTristate(value)
 * 	case "skipDefaultLibCheck":
 * 		allOptions.SkipDefaultLibCheck = ParseTristate(value)
 * 	case "sourceMap":
 * 		allOptions.SourceMap = ParseTristate(value)
 * 	case "sourceRoot":
 * 		allOptions.SourceRoot = ParseString(value)
 * 	case "stripInternal":
 * 		allOptions.StripInternal = ParseTristate(value)
 * 	case "suppressOutputPathCheck":
 * 		allOptions.SuppressOutputPathCheck = ParseTristate(value)
 * 	case "target":
 * 		allOptions.Target = floatOrInt32ToFlag[core.ScriptTarget](value)
 * 	case "traceResolution":
 * 		allOptions.TraceResolution = ParseTristate(value)
 * 	case "tsBuildInfoFile":
 * 		allOptions.TsBuildInfoFile = ParseString(value)
 * 	case "typeRoots":
 * 		allOptions.TypeRoots = ParseStringArray(value)
 * 	case "types":
 * 		allOptions.Types = ParseStringArray(value)
 * 	case "useDefineForClassFields":
 * 		allOptions.UseDefineForClassFields = ParseTristate(value)
 * 	case "useUnknownInCatchVariables":
 * 		allOptions.UseUnknownInCatchVariables = ParseTristate(value)
 * 	case "verbatimModuleSyntax":
 * 		allOptions.VerbatimModuleSyntax = ParseTristate(value)
 * 	case "version":
 * 		allOptions.Version = ParseTristate(value)
 * 	case "help":
 * 		allOptions.Help = ParseTristate(value)
 * 	case "all":
 * 		allOptions.All = ParseTristate(value)
 * 	case "maxNodeModuleJsDepth":
 * 		allOptions.MaxNodeModuleJsDepth = parseNumber(value)
 * 	case "skipLibCheck":
 * 		allOptions.SkipLibCheck = ParseTristate(value)
 * 	case "noEmit":
 * 		allOptions.NoEmit = ParseTristate(value)
 * 	case "showConfig":
 * 		allOptions.ShowConfig = ParseTristate(value)
 * 	case "configFilePath":
 * 		allOptions.ConfigFilePath = ParseString(value)
 * 	case "noDtsResolution":
 * 		allOptions.NoDtsResolution = ParseTristate(value)
 * 	case "pathsBasePath":
 * 		allOptions.PathsBasePath = ParseString(value)
 * 	case "outDir":
 * 		allOptions.OutDir = ParseString(value)
 * 	case "newLine":
 * 		allOptions.NewLine = floatOrInt32ToFlag[core.NewLineKind](value)
 * 	case "watch":
 * 		allOptions.Watch = ParseTristate(value)
 * 	case "pprofDir":
 * 		allOptions.PprofDir = ParseString(value)
 * 	case "singleThreaded":
 * 		allOptions.SingleThreaded = ParseTristate(value)
 * 	case "quiet":
 * 		allOptions.Quiet = ParseTristate(value)
 * 	case "checkers":
 * 		allOptions.Checkers = parseNumber(value)
 * 	default:
 * 		// different than any key above
 * 		return false
 * 	}
 * 	return true
 * }
 */
export function parseCompilerOptions(key: string, value: unknown, allOptions: GoPtr<CompilerOptions>): bool {
  const option = CommandLineOptionNameMap_Get(CommandLineCompilerOptionsMap, key);
  const k: string = option !== undefined ? option.Name : key;
  const o = allOptions!;
  switch (k) {
    case "allowJs":
      o.AllowJs = ParseTristate(value);
      break;
    case "allowImportingTsExtensions":
      o.AllowImportingTsExtensions = ParseTristate(value);
      break;
    case "allowSyntheticDefaultImports":
      o.AllowSyntheticDefaultImports = ParseTristate(value);
      break;
    case "allowNonTsExtensions":
      o.AllowNonTsExtensions = ParseTristate(value);
      break;
    case "allowUmdGlobalAccess":
      o.AllowUmdGlobalAccess = ParseTristate(value);
      break;
    case "allowUnreachableCode":
      o.AllowUnreachableCode = ParseTristate(value);
      break;
    case "allowUnusedLabels":
      o.AllowUnusedLabels = ParseTristate(value);
      break;
    case "allowArbitraryExtensions":
      o.AllowArbitraryExtensions = ParseTristate(value);
      break;
    case "alwaysStrict":
      o.AlwaysStrict = ParseTristate(value);
      break;
    case "assumeChangesOnlyAffectDirectDependencies":
      o.AssumeChangesOnlyAffectDirectDependencies = ParseTristate(value);
      break;
    case "baseUrl":
      o.BaseUrl = ParseString(value);
      break;
    case "build":
      o.Build = ParseTristate(value);
      break;
    case "checkJs":
      o.CheckJs = ParseTristate(value);
      break;
    case "customConditions":
      o.CustomConditions = ParseStringArray(value);
      break;
    case "composite":
      o.Composite = ParseTristate(value);
      break;
    case "declarationDir":
      o.DeclarationDir = ParseString(value);
      break;
    case "deduplicatePackages":
      o.DeduplicatePackages = ParseTristate(value);
      break;
    case "diagnostics":
      o.Diagnostics = ParseTristate(value);
      break;
    case "disableSizeLimit":
      o.DisableSizeLimit = ParseTristate(value);
      break;
    case "disableSourceOfProjectReferenceRedirect":
      o.DisableSourceOfProjectReferenceRedirect = ParseTristate(value);
      break;
    case "disableSolutionSearching":
      o.DisableSolutionSearching = ParseTristate(value);
      break;
    case "disableReferencedProjectLoad":
      o.DisableReferencedProjectLoad = ParseTristate(value);
      break;
    case "declarationMap":
      o.DeclarationMap = ParseTristate(value);
      break;
    case "declaration":
      o.Declaration = ParseTristate(value);
      break;
    case "downlevelIteration":
      o.DownlevelIteration = ParseTristate(value);
      break;
    case "erasableSyntaxOnly":
      o.ErasableSyntaxOnly = ParseTristate(value);
      break;
    case "emitDeclarationOnly":
      o.EmitDeclarationOnly = ParseTristate(value);
      break;
    case "extendedDiagnostics":
      o.ExtendedDiagnostics = ParseTristate(value);
      break;
    case "emitDecoratorMetadata":
      o.EmitDecoratorMetadata = ParseTristate(value);
      break;
    case "emitBOM":
      o.EmitBOM = ParseTristate(value);
      break;
    case "esModuleInterop":
      o.ESModuleInterop = ParseTristate(value);
      break;
    case "exactOptionalPropertyTypes":
      o.ExactOptionalPropertyTypes = ParseTristate(value);
      break;
    case "explainFiles":
      o.ExplainFiles = ParseTristate(value);
      break;
    case "experimentalDecorators":
      o.ExperimentalDecorators = ParseTristate(value);
      break;
    case "forceConsistentCasingInFileNames":
      o.ForceConsistentCasingInFileNames = ParseTristate(value);
      break;
    case "generateCpuProfile":
      o.GenerateCpuProfile = ParseString(value);
      break;
    case "generateTrace":
      o.GenerateTrace = ParseString(value);
      break;
    case "isolatedModules":
      o.IsolatedModules = ParseTristate(value);
      break;
    case "ignoreConfig":
      o.IgnoreConfig = ParseTristate(value);
      break;
    case "ignoreDeprecations":
      o.IgnoreDeprecations = ParseString(value);
      break;
    case "importHelpers":
      o.ImportHelpers = ParseTristate(value);
      break;
    case "incremental":
      o.Incremental = ParseTristate(value);
      break;
    case "init":
      o.Init = ParseTristate(value);
      break;
    case "inlineSourceMap":
      o.InlineSourceMap = ParseTristate(value);
      break;
    case "inlineSources":
      o.InlineSources = ParseTristate(value);
      break;
    case "isolatedDeclarations":
      o.IsolatedDeclarations = ParseTristate(value);
      break;
    case "jsx":
      o.Jsx = floatOrInt32ToFlag<JsxEmit>(value);
      break;
    case "jsxFactory":
      o.JsxFactory = ParseString(value);
      break;
    case "jsxFragmentFactory":
      o.JsxFragmentFactory = ParseString(value);
      break;
    case "jsxImportSource":
      o.JsxImportSource = ParseString(value);
      break;
    case "lib":
      if (globalThis.Array.isArray(value) && value.every((e): e is string => typeof e === "string")) {
        o.Lib = value;
      } else {
        o.Lib = ParseStringArray(value);
      }
      break;
    case "libReplacement":
      o.LibReplacement = ParseTristate(value);
      break;
    case "listEmittedFiles":
      o.ListEmittedFiles = ParseTristate(value);
      break;
    case "listFiles":
      o.ListFiles = ParseTristate(value);
      break;
    case "listFilesOnly":
      o.ListFilesOnly = ParseTristate(value);
      break;
    case "locale":
      o.Locale = ParseString(value);
      break;
    case "mapRoot":
      o.MapRoot = ParseString(value);
      break;
    case "module":
      o.Module = floatOrInt32ToFlag<ModuleKind>(value);
      break;
    case "moduleDetectionKind":
      o.ModuleDetection = floatOrInt32ToFlag<ModuleDetectionKind>(value);
      break;
    case "moduleResolution":
      o.ModuleResolution = floatOrInt32ToFlag<ModuleResolutionKind>(value);
      break;
    case "moduleSuffixes":
      o.ModuleSuffixes = ParseStringArray(value);
      break;
    case "moduleDetection":
      o.ModuleDetection = floatOrInt32ToFlag<ModuleDetectionKind>(value);
      break;
    case "noCheck":
      o.NoCheck = ParseTristate(value);
      break;
    case "noFallthroughCasesInSwitch":
      o.NoFallthroughCasesInSwitch = ParseTristate(value);
      break;
    case "noEmitForJsFiles":
      o.NoEmitForJsFiles = ParseTristate(value);
      break;
    case "noErrorTruncation":
      o.NoErrorTruncation = ParseTristate(value);
      break;
    case "noImplicitAny":
      o.NoImplicitAny = ParseTristate(value);
      break;
    case "noImplicitThis":
      o.NoImplicitThis = ParseTristate(value);
      break;
    case "noLib":
      o.NoLib = ParseTristate(value);
      break;
    case "noPropertyAccessFromIndexSignature":
      o.NoPropertyAccessFromIndexSignature = ParseTristate(value);
      break;
    case "noUncheckedIndexedAccess":
      o.NoUncheckedIndexedAccess = ParseTristate(value);
      break;
    case "noEmitHelpers":
      o.NoEmitHelpers = ParseTristate(value);
      break;
    case "noEmitOnError":
      o.NoEmitOnError = ParseTristate(value);
      break;
    case "noImplicitReturns":
      o.NoImplicitReturns = ParseTristate(value);
      break;
    case "noUnusedLocals":
      o.NoUnusedLocals = ParseTristate(value);
      break;
    case "noUnusedParameters":
      o.NoUnusedParameters = ParseTristate(value);
      break;
    case "noImplicitOverride":
      o.NoImplicitOverride = ParseTristate(value);
      break;
    case "noUncheckedSideEffectImports":
      o.NoUncheckedSideEffectImports = ParseTristate(value);
      break;
    case "outFile":
      o.OutFile = ParseString(value);
      break;
    case "noResolve":
      o.NoResolve = ParseTristate(value);
      break;
    case "paths":
      o.Paths = parseStringMap(value);
      break;
    case "preserveWatchOutput":
      o.PreserveWatchOutput = ParseTristate(value);
      break;
    case "preserveConstEnums":
      o.PreserveConstEnums = ParseTristate(value);
      break;
    case "preserveSymlinks":
      o.PreserveSymlinks = ParseTristate(value);
      break;
    case "project":
      o.Project = ParseString(value);
      break;
    case "pretty":
      o.Pretty = ParseTristate(value);
      break;
    case "resolveJsonModule":
      o.ResolveJsonModule = ParseTristate(value);
      break;
    case "resolvePackageJsonExports":
      o.ResolvePackageJsonExports = ParseTristate(value);
      break;
    case "resolvePackageJsonImports":
      o.ResolvePackageJsonImports = ParseTristate(value);
      break;
    case "reactNamespace":
      o.ReactNamespace = ParseString(value);
      break;
    case "rewriteRelativeImportExtensions":
      o.RewriteRelativeImportExtensions = ParseTristate(value);
      break;
    case "rootDir":
      o.RootDir = ParseString(value);
      break;
    case "rootDirs":
      o.RootDirs = ParseStringArray(value);
      break;
    case "removeComments":
      o.RemoveComments = ParseTristate(value);
      break;
    case "stableTypeOrdering":
      o.StableTypeOrdering = ParseTristate(value);
      break;
    case "strict":
      o.Strict = ParseTristate(value);
      break;
    case "strictBindCallApply":
      o.StrictBindCallApply = ParseTristate(value);
      break;
    case "strictBuiltinIteratorReturn":
      o.StrictBuiltinIteratorReturn = ParseTristate(value);
      break;
    case "strictFunctionTypes":
      o.StrictFunctionTypes = ParseTristate(value);
      break;
    case "strictNullChecks":
      o.StrictNullChecks = ParseTristate(value);
      break;
    case "strictPropertyInitialization":
      o.StrictPropertyInitialization = ParseTristate(value);
      break;
    case "skipDefaultLibCheck":
      o.SkipDefaultLibCheck = ParseTristate(value);
      break;
    case "sourceMap":
      o.SourceMap = ParseTristate(value);
      break;
    case "sourceRoot":
      o.SourceRoot = ParseString(value);
      break;
    case "stripInternal":
      o.StripInternal = ParseTristate(value);
      break;
    case "suppressOutputPathCheck":
      o.SuppressOutputPathCheck = ParseTristate(value);
      break;
    case "target":
      o.Target = floatOrInt32ToFlag<ScriptTarget>(value);
      break;
    case "traceResolution":
      o.TraceResolution = ParseTristate(value);
      break;
    case "tsBuildInfoFile":
      o.TsBuildInfoFile = ParseString(value);
      break;
    case "typeRoots":
      o.TypeRoots = ParseStringArray(value);
      break;
    case "types":
      o.Types = ParseStringArray(value);
      break;
    case "useDefineForClassFields":
      o.UseDefineForClassFields = ParseTristate(value);
      break;
    case "useUnknownInCatchVariables":
      o.UseUnknownInCatchVariables = ParseTristate(value);
      break;
    case "verbatimModuleSyntax":
      o.VerbatimModuleSyntax = ParseTristate(value);
      break;
    case "version":
      o.Version = ParseTristate(value);
      break;
    case "help":
      o.Help = ParseTristate(value);
      break;
    case "all":
      o.All = ParseTristate(value);
      break;
    case "maxNodeModuleJsDepth":
      o.MaxNodeModuleJsDepth = parseNumber(value);
      break;
    case "skipLibCheck":
      o.SkipLibCheck = ParseTristate(value);
      break;
    case "noEmit":
      o.NoEmit = ParseTristate(value);
      break;
    case "showConfig":
      o.ShowConfig = ParseTristate(value);
      break;
    case "configFilePath":
      o.ConfigFilePath = ParseString(value);
      break;
    case "noDtsResolution":
      o.NoDtsResolution = ParseTristate(value);
      break;
    case "pathsBasePath":
      o.PathsBasePath = ParseString(value);
      break;
    case "outDir":
      o.OutDir = ParseString(value);
      break;
    case "newLine":
      o.NewLine = floatOrInt32ToFlag<NewLineKind>(value);
      break;
    case "watch":
      o.Watch = ParseTristate(value);
      break;
    case "pprofDir":
      o.PprofDir = ParseString(value);
      break;
    case "singleThreaded":
      o.SingleThreaded = ParseTristate(value);
      break;
    case "quiet":
      o.Quiet = ParseTristate(value);
      break;
    case "checkers":
      o.Checkers = parseNumber(value);
      break;
    default:
      // different than any key above
      return false;
  }
  return true;
}

/**
* @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::floatOrInt32ToFlag","kind":"func","status":"implemented","sigHash":"20db0255f87e7140b6f355ea9e6fd6c8eb69783915b5e9cb30fc1e919c370e3a","bodyHash":"5e695971846c5a0862cf1487c978e12f30cb85e0aa3b7643e7aed0b0d4532921"}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"A named ~int32 flag type is number-backed at runtime; the local intersection retains the generic result identity while constraining the carrier used by the conversion.","goSignature":"func<T0 extends raw(~int32)>(unknown)=>T0","tsSignature":"func<T0 extends number&packages/tsts/src/go/compat.ts::GoConstraint<\"~int32\">>(unknown)=>T0"}
 *
 * Go source:
 * func floatOrInt32ToFlag[T ~int32](value any) T {
 * 	if v, ok := value.(T); ok {
 * 		return v
 * 	}
 * 	return T(value.(float64))
 * }
 */
export function floatOrInt32ToFlag<T extends GoConstraint<"~int32"> & number>(value: unknown): T {
  // The flag types (JsxEmit, ModuleKind, ...) are all int32-backed; a number
  // value either already is the flag (`value.(T)`) or is a float64 to convert.
  // In both branches the dynamic value is the same number cast to the flag type.
  return value as T;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseWatchOptions","kind":"func","status":"implemented","sigHash":"60340ca18f07bdf66135cd8b155722772318c7e04120721cdec472682fefb06b","bodyHash":"ea033c13152dc9f4298e73ba4dca33d6a57f597e9a8cc831f8a27023cbdcbb85"}
 *
 * Go source:
 * func ParseWatchOptions(key string, value any, allOptions *core.WatchOptions) []*ast.Diagnostic {
 * 	if allOptions == nil {
 * 		return nil
 * 	}
 * 	switch key {
 * 	case "watchInterval":
 * 		allOptions.Interval = parseNumber(value)
 * 	case "watchFile":
 * 		if value != nil {
 * 			allOptions.FileKind = value.(core.WatchFileKind)
 * 		}
 * 	case "watchDirectory":
 * 		if value != nil {
 * 			allOptions.DirectoryKind = value.(core.WatchDirectoryKind)
 * 		}
 * 	case "fallbackPolling":
 * 		if value != nil {
 * 			allOptions.FallbackPolling = value.(core.PollingKind)
 * 		}
 * 	case "synchronousWatchDirectory":
 * 		allOptions.SyncWatchDir = ParseTristate(value)
 * 	case "excludeDirectories":
 * 		allOptions.ExcludeDir = ParseStringArray(value)
 * 	case "excludeFiles":
 * 		allOptions.ExcludeFiles = ParseStringArray(value)
 * 	}
 * 	return nil
 * }
 */
export function ParseWatchOptions(key: string, value: unknown, allOptions: GoPtr<WatchOptions>): GoPtr<GoSlice<GoPtr<Diagnostic>>> {
  if (allOptions === undefined) {
    return undefined;
  }
  const o = allOptions;
  switch (key) {
    case "watchInterval":
      o.Interval = parseNumber(value);
      break;
    case "watchFile":
      if (value !== undefined) {
        o.FileKind = value as WatchFileKind;
      }
      break;
    case "watchDirectory":
      if (value !== undefined) {
        o.DirectoryKind = value as WatchDirectoryKind;
      }
      break;
    case "fallbackPolling":
      if (value !== undefined) {
        o.FallbackPolling = value as PollingKind;
      }
      break;
    case "synchronousWatchDirectory":
      o.SyncWatchDir = ParseTristate(value);
      break;
    case "excludeDirectories":
      o.ExcludeDir = ParseStringArray(value);
      break;
    case "excludeFiles":
      o.ExcludeFiles = ParseStringArray(value);
      break;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseTypeAcquisition","kind":"func","status":"implemented","sigHash":"e32da4dde2bd378439ee1d87ad6d59f3538a725f0fe450eb0dd91da4eb688e39","bodyHash":"4f234c6cb37fb91a781df4c53cd5e416973a04957101e5ac3c23453eaee47151"}
 *
 * Go source:
 * func ParseTypeAcquisition(key string, value any, allOptions *core.TypeAcquisition) []*ast.Diagnostic {
 * 	if value == nil {
 * 		return nil
 * 	}
 * 	if allOptions == nil {
 * 		return nil
 * 	}
 * 	switch key {
 * 	case "enable":
 * 		allOptions.Enable = ParseTristate(value)
 * 	case "include":
 * 		allOptions.Include = ParseStringArray(value)
 * 	case "exclude":
 * 		allOptions.Exclude = ParseStringArray(value)
 * 	case "disableFilenameBasedTypeAcquisition":
 * 		allOptions.DisableFilenameBasedTypeAcquisition = ParseTristate(value)
 * 	}
 * 	return nil
 * }
 */
export function ParseTypeAcquisition(key: string, value: unknown, allOptions: GoPtr<TypeAcquisition>): GoPtr<GoSlice<GoPtr<Diagnostic>>> {
  if (value === undefined) {
    return undefined;
  }
  if (allOptions === undefined) {
    return undefined;
  }
  const o = allOptions;
  switch (key) {
    case "enable":
      o.Enable = ParseTristate(value);
      break;
    case "include":
      o.Include = ParseStringArray(value);
      break;
    case "exclude":
      o.Exclude = ParseStringArray(value);
      break;
    case "disableFilenameBasedTypeAcquisition":
      o.DisableFilenameBasedTypeAcquisition = ParseTristate(value);
      break;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseBuildOptions","kind":"func","status":"implemented","sigHash":"794ee8a4473683f18c2a63b0d15f6baee31adf3dcc2195537a945317ef701a03","bodyHash":"f94ee9fa4666f6bb75f7df2407e865b98657b01a415d63ba912e2a4f7e761555"}
 *
 * Go source:
 * func ParseBuildOptions(key string, value any, allOptions *core.BuildOptions) []*ast.Diagnostic {
 * 	if value == nil {
 * 		return nil
 * 	}
 * 	if allOptions == nil {
 * 		return nil
 * 	}
 * 	option := BuildNameMap.Get(key)
 * 	if option != nil {
 * 		key = option.Name
 * 	}
 * 	switch key {
 * 	case "clean":
 * 		allOptions.Clean = ParseTristate(value)
 * 	case "dry":
 * 		allOptions.Dry = ParseTristate(value)
 * 	case "force":
 * 		allOptions.Force = ParseTristate(value)
 * 	case "builders":
 * 		allOptions.Builders = parseNumber(value)
 * 	case "stopBuildOnErrors":
 * 		allOptions.StopBuildOnErrors = ParseTristate(value)
 * 	case "verbose":
 * 		allOptions.Verbose = ParseTristate(value)
 * 	}
 * 	return nil
 * }
 */
export function ParseBuildOptions(key: string, value: unknown, allOptions: GoPtr<BuildOptions>): GoPtr<GoSlice<GoPtr<Diagnostic>>> {
  if (value === undefined) {
    return undefined;
  }
  if (allOptions === undefined) {
    return undefined;
  }
  const option = NameMap_Get(BuildNameMap as GoPtr<NameMap>, key);
  const k: string = option !== undefined ? option.Name : key;
  const o = allOptions;
  switch (k) {
    case "clean":
      o.Clean = ParseTristate(value);
      break;
    case "dry":
      o.Dry = ParseTristate(value);
      break;
    case "force":
      o.Force = ParseTristate(value);
      break;
    case "builders":
      o.Builders = parseNumber(value);
      break;
    case "stopBuildOnErrors":
      o.StopBuildOnErrors = ParseTristate(value);
      break;
    case "verbose":
      o.Verbose = ParseTristate(value);
      break;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::mergeCompilerOptions","kind":"func","status":"implemented","sigHash":"7c402d7880eb4e1a48806b603920f87a8449e640da732a4cec56b4a1d42dfb63","bodyHash":"8dd23a1ab9b5f12dd3d4fd9d4fa25e6dd7ef5c9086e369c0f8fdef9977cbf68e"}
 *
 * Go source:
 * func mergeCompilerOptions(targetOptions, sourceOptions *core.CompilerOptions, rawSource any) *core.CompilerOptions {
 * 	if sourceOptions == nil {
 * 		return targetOptions
 * 	}
 *
 * 	// Collect explicitly null field names from raw JSON
 * 	var explicitNullFields collections.Set[string]
 * 	if rawSource != nil {
 * 		if rawMap, ok := rawSource.(*collections.OrderedMap[string, any]); ok && rawMap != nil {
 * 			// Options are nested under "compilerOptions" in both tsconfig.json and wrapped command line options
 * 			if compilerOptionsRaw, exists := rawMap.Get("compilerOptions"); exists {
 * 				if compilerOptionsMap, ok := compilerOptionsRaw.(*collections.OrderedMap[string, any]); ok {
 * 					for key, value := range compilerOptionsMap.Entries() {
 * 						if value == nil {
 * 							explicitNullFields.Add(key)
 * 						}
 * 					}
 * 				}
 * 			}
 * 		}
 * 	}
 *
 * 	// Do the merge, handling explicit nulls during the normal merge
 * 	targetValue := reflect.ValueOf(targetOptions).Elem()
 * 	sourceValue := reflect.ValueOf(sourceOptions).Elem()
 * 	targetType := targetValue.Type()
 *
 * 	for i := range targetValue.NumField() {
 * 		targetField := targetValue.Field(i)
 * 		sourceField := sourceValue.Field(i)
 *
 * 		// Get the JSON field name for this struct field and check if it's explicitly null
 * 		if jsonTag := targetType.Field(i).Tag.Get("json"); jsonTag != "" {
 * 			if jsonFieldName, _, _ := strings.Cut(jsonTag, ","); jsonFieldName != "" && explicitNullFields.Has(jsonFieldName) {
 * 				targetField.SetZero()
 * 				continue
 * 			}
 * 		}
 *
 * 		// Normal merge behavior: copy non-zero fields
 * 		if !sourceField.IsZero() {
 * 			targetField.Set(sourceField)
 * 		}
 * 	}
 *
 * 	return targetOptions
 * }
 */
export function mergeCompilerOptions(targetOptions: GoPtr<CompilerOptions>, sourceOptions: GoPtr<CompilerOptions>, rawSource: unknown): GoPtr<CompilerOptions> {
  if (sourceOptions === undefined) {
    return targetOptions;
  }

  const explicitNullFields = new globalThis.Set<string>();
  if (rawSource !== undefined) {
    const rawMap = asOrderedMap(rawSource) as GoPtr<OrderedMap<string, unknown>>;
    if (rawMap !== undefined) {
      const [compilerOptionsRaw, exists] = OrderedMap_Get(rawMap, "compilerOptions", () => undefined);
      if (exists) {
        const compilerOptionsMap = asOrderedMap(compilerOptionsRaw) as GoPtr<OrderedMap<string, unknown>>;
        if (compilerOptionsMap !== undefined) {
          OrderedMap_Entries(compilerOptionsMap)((key: string, value: unknown): bool => {
            if (value === undefined || value === null) {
              explicitNullFields.add(key);
            }
            return true;
          });
        }
      }
    }
  }

  const target = targetOptions as unknown as globalThis.Record<string, unknown>;
  const source = sourceOptions as unknown as globalThis.Record<string, unknown>;
  for (const jsonKey of explicitNullFields) {
    target[compilerOptionJsonKeyToFieldName(jsonKey)] = undefined;
  }
  for (const key of globalThis.Object.keys(source)) {
    if (explicitNullFields.has(compilerOptionFieldNameToJsonKey(key))) {
      target[key] = undefined;
      continue;
    }
    const sourceVal = source[key];
    if (sourceVal !== undefined && sourceVal !== null && sourceVal !== 0 && sourceVal !== false && sourceVal !== "") {
      target[key] = sourceVal;
    }
  }

  return targetOptions;
}

function compilerOptionJsonKeyToFieldName(key: string): string {
  if (key === "esModuleInterop") {
    return "ESModuleInterop";
  }
  return key.slice(0, 1).toUpperCase() + key.slice(1);
}

function compilerOptionFieldNameToJsonKey(fieldName: string): string {
  if (fieldName === "ESModuleInterop") {
    return "esModuleInterop";
  }
  return fieldName.slice(0, 1).toLowerCase() + fieldName.slice(1);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::convertToOptionsWithAbsolutePaths","kind":"func","status":"implemented","sigHash":"01cfcc21dba9256e325c87a22ff7f4d7a177fbddff66a9de40f8e203feb7008e","bodyHash":"894635eebc14ab2dbef1b5c3cd16bbf3a14ce07e92be652ef89cb7918723c5ab"}
 *
 * Go source:
 * func convertToOptionsWithAbsolutePaths(optionsBase *collections.OrderedMap[string, any], optionMap CommandLineOptionNameMap, cwd string) *collections.OrderedMap[string, any] {
 * 	// !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
 * 	// !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
 * 	if optionsBase == nil {
 * 		return nil
 * 	}
 * 	for o, v := range optionsBase.Entries() {
 * 		result, ok := ConvertOptionToAbsolutePath(o, v, optionMap, cwd)
 * 		if ok {
 * 			optionsBase.Set(o, result)
 * 		}
 * 	}
 * 	return optionsBase
 * }
 */
export function convertToOptionsWithAbsolutePaths(optionsBase: GoPtr<OrderedMap<string, unknown>>, optionMap: CommandLineOptionNameMap, cwd: string): GoPtr<OrderedMap<string, unknown>> {
  // !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
  // !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
  if (optionsBase === undefined) {
    return undefined;
  }
  const base = optionsBase as GoPtr<OrderedMap<string, unknown>>;
  OrderedMap_Entries(base)((o: string, v: unknown): bool => {
    const [result, ok] = ConvertOptionToAbsolutePath(o, v, optionMap, cwd);
    if (ok) {
      OrderedMap_Set(base, o, result);
    }
    return true;
  });
  return optionsBase;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ConvertOptionToAbsolutePath","kind":"func","status":"implemented","sigHash":"a296fdd3a0da9cd23b4001dcceeb1fcb500c53d239df1bb01761c7a0c3d75ad6","bodyHash":"71ddad65eed23c562994b4c8d364a6e30ab3780024c2d7c7a486744d3a5247c8"}
 *
 * Go source:
 * func ConvertOptionToAbsolutePath(o string, v any, optionMap CommandLineOptionNameMap, cwd string) (any, bool) {
 * 	option := optionMap.Get(o)
 * 	if option == nil {
 * 		return nil, false
 * 	}
 * 	if option.Kind == "list" {
 * 		if option.Elements().IsFilePath {
 * 			if arr, ok := v.([]string); ok {
 * 				return core.Map(arr, func(item string) string {
 * 					return tspath.GetNormalizedAbsolutePath(item, cwd)
 * 				}), true
 * 			}
 * 			if arr, ok := v.([]any); ok {
 * 				return core.Map(arr, func(item any) any {
 * 					if s, isStr := item.(string); isStr {
 * 						return tspath.GetNormalizedAbsolutePath(s, cwd)
 * 					}
 * 					return item
 * 				}), true
 * 			}
 * 		}
 * 	} else if option.IsFilePath {
 * 		if value, ok := v.(string); ok {
 * 			return tspath.GetNormalizedAbsolutePath(value, cwd), true
 * 		}
 * 	}
 * 	return nil, false
 * }
 */
export function ConvertOptionToAbsolutePath(o: string, v: unknown, optionMap: CommandLineOptionNameMap, cwd: string): [unknown, bool] {
  const option = CommandLineOptionNameMap_Get(optionMap, o);
  if (option === undefined) {
    return [undefined, false];
  }
  if (option.Kind === CommandLineOptionTypeList) {
    if (CommandLineOption_Elements(option)!.IsFilePath) {
      if (globalThis.Array.isArray(v) && v.every((e): e is string => typeof e === "string")) {
        const arr: GoSlice<string> = v;
        return [
          core_Map(arr, (item: string): string => {
            return GetNormalizedAbsolutePath(item, cwd);
          }),
          true,
        ];
      }
      if (globalThis.Array.isArray(v)) {
        const arr: GoSlice<unknown> = v;
        return [
          core_Map(arr, (item: unknown): unknown => {
            if (typeof item === "string") {
              const s: string = item;
              return GetNormalizedAbsolutePath(s, cwd);
            }
            return item;
          }),
          true,
        ];
      }
    }
  } else if (option.IsFilePath) {
    if (typeof v === "string") {
      const value: string = v;
      return [GetNormalizedAbsolutePath(value, cwd), true];
    }
  }
  return [undefined, false];
}
