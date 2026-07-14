import type { bool, int } from "../../go/scalars.js";
import { GoStringKey, GoZeroInterface, type GoConstraint, type GoPtr, type GoSlice } from "../../go/compat.js";
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
} from "./tsconfigparsing.js";
import { BuildNameMap, NameMap_Get } from "./namemap.js";
import type { NameMap } from "./namemap.js";

import { GoValueRef } from "../../go/compat.js";
import type { GoInterface, GoRef } from "../../go/compat.js";
// Go's `value.(*collections.OrderedMap[string, any])` type assertion: the JSON
// parser yields OrderedMap instances, which structurally carry `keys`/`mp`.
function asOrderedMap(value: GoInterface<unknown>): GoPtr<OrderedMap<string, GoInterface<unknown>>> {
  if (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    "keys" in value &&
    "mp" in value
  ) {
    return value as GoPtr<OrderedMap<string, GoInterface<unknown>>>;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseTristate","kind":"func","status":"implemented","sigHash":"49c663f5d4d2bfc54d4329d3c33406f6d96155082766b6de7630809dacb0801b"}
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
export function ParseTristate(value: GoInterface<unknown>): Tristate {
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseStringArray","kind":"func","status":"implemented","sigHash":"36b233b78f885e44a5986a3a3605e2f65b58c5262604c75af06bdf4918ec8442"}
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
export function ParseStringArray(value: GoInterface<unknown>): GoSlice<string> {
  if (globalThis.Array.isArray(value)) {
    const arr = value as unknown[];
    if (arr === null) {
      return [];
    }
    const result: GoSlice<string> = [];
    for (const v of arr) {
      if (typeof v === "string") {
        result.push(v);
      }
    }
    return result;
  }
  return [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseStringMap","kind":"func","status":"implemented","sigHash":"44db66c10f86c995c3674b1cf3c4074a364d8577dba6707a74e44b8bb59004ce"}
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
export function parseStringMap(value: GoInterface<unknown>): GoPtr<OrderedMap<string, GoSlice<string>>> {
  const m = asOrderedMap(value);
  if (m !== undefined) {
    const result = NewOrderedMapWithSizeHint<string, GoSlice<string>>(OrderedMap_Size(m), GoStringKey);
    OrderedMap_Entries(m as GoPtr<OrderedMap<string, GoInterface<unknown>>>)!((k: string, v: unknown): bool => {
      OrderedMap_Set(result, k, ParseStringArray(v), GoStringKey);
      return true;
    });
    return result;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseString","kind":"func","status":"implemented","sigHash":"e2e4b2eb4386c97194e65b39bad6355bfc2d7aa1bc2872c43f57a2f826f48c5d"}
 *
 * Go source:
 * func ParseString(value any) string {
 * 	if str, ok := value.(string); ok {
 * 		return str
 * 	}
 * 	return ""
 * }
 */
export function ParseString(value: GoInterface<unknown>): string {
  if (typeof value === "string") {
    const str: string = value;
    return str;
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseNumber","kind":"func","status":"implemented","sigHash":"c8e2c76e517fa4a8fa061e2c3ce415d7652cdc1d3b38ebea5097e0d79fe4d3e4"}
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
export function parseNumber(value: GoInterface<unknown>): GoRef<int> {
  // Go distinguishes `int` (returned as-is) from `float64` (truncated via `int(num)`).
  // TS/JS has a single number type; JSON-sourced values arrive as float64 in Go, so
  // truncate toward zero to match `int(num)` (a no-op for integer-valued numbers).
  if (typeof value === "number") {
    if (globalThis.Number.isInteger(value)) {
      const num: int = value as int;
      return GoValueRef(num);
    }
    const n: int = globalThis.Math.trunc(value) as int;
    return GoValueRef(n);
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseProjectReference","kind":"func","status":"implemented","sigHash":"818a4e147f733461a7da20f74182e641116a5c6ae1948c631b811ba9de557c2c"}
 *
 * Go source:
 * func parseProjectReference(json any) []*core.ProjectReference {
 * 	var result []*core.ProjectReference
 * 	if v, ok := json.(*collections.OrderedMap[string, any]); ok {
 * 		var reference core.ProjectReference
 * 		if v, ok := v.Get("path"); ok {
 * 			reference.Path = v.(string)
 * 		}
 * 		if v, ok := v.Get("circular"); ok {
 * 			reference.Circular = v.(bool)
 * 		}
 * 		result = append(result, &reference)
 * 	}
 * 	return result
 * }
 */
export function parseProjectReference(json: GoInterface<unknown>): GoSlice<GoPtr<ProjectReference>> {
  const result: GoSlice<GoPtr<ProjectReference>> = [];
  const v = asOrderedMap(json);
  if (v !== undefined) {
    const reference: ProjectReference = { Path: "", OriginalPath: "", Circular: false };
    {
      const [pv, ok] = OrderedMap_Get(v as GoPtr<OrderedMap<string, GoInterface<unknown>>>, "path", GoZeroInterface);
      if (ok) {
        reference.Path = pv as string;
      }
    }
    {
      const [cv, ok] = OrderedMap_Get(v as GoPtr<OrderedMap<string, GoInterface<unknown>>>, "circular", GoZeroInterface);
      if (ok) {
        reference.Circular = cv as bool;
      }
    }
    result.push(reference);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseJsonToStringKey","kind":"func","status":"implemented","sigHash":"e2aa05789812ea7808caa85537dded05e3f9d10f47c7b0e69615566f66b7be8c"}
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
export function parseJsonToStringKey(json: GoInterface<unknown>): GoPtr<OrderedMap<string, GoInterface<unknown>>> {
  const result = NewOrderedMapWithSizeHint<string, unknown>(6 as int, GoStringKey);
  const m = asOrderedMap(json) as GoPtr<OrderedMap<string, GoInterface<unknown>>>;
  if (m !== undefined) {
    {
      const [v, ok] = OrderedMap_Get(m, "include", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "include", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "exclude", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "exclude", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "files", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "files", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "references", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "references", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "extends", GoZeroInterface);
      if (ok) {
        if (typeof v === "string") {
          const str: string = v;
          OrderedMap_Set(result, "extends", [str] as GoSlice<GoInterface<unknown>>, GoStringKey);
        }
        OrderedMap_Set(result, "extends", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "compilerOptions", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "compilerOptions", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "excludes", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "excludes", v, GoStringKey);
      }
    }
    {
      const [v, ok] = OrderedMap_Get(m, "typeAcquisition", GoZeroInterface);
      if (ok) {
        OrderedMap_Set(result, "typeAcquisition", v, GoStringKey);
      }
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::optionParser","kind":"type","status":"implemented","sigHash":"76bebf033feb06eb908a40f0dadd8562faf33be1877c89ab3bcb91043dd0a47e"}
 *
 * Go source:
 * optionParser interface {
 * 	ParseOption(key string, value any) []*ast.Diagnostic
 * 	UnknownOptionDiagnostic() *diagnostics.Message
 * 	UnknownDidYouMeanDiagnostic() *diagnostics.Message
 * }
 */
export interface optionParser {
  ParseOption(key: string, value: GoInterface<unknown>): GoSlice<GoPtr<Diagnostic>>;
  UnknownOptionDiagnostic(): GoPtr<Message>;
  UnknownDidYouMeanDiagnostic(): GoPtr<Message>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::compilerOptionsParser","kind":"type","status":"implemented","sigHash":"31f1aea80830d374610b6c8a36cf1d579f81302c4617273ab320558d6bbe37fd"}
 *
 * Go source:
 * compilerOptionsParser struct {
 * 	*core.CompilerOptions
 * }
 */
export interface compilerOptionsParser {
  __tsgoEmbedded0: GoPtr<CompilerOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::compilerOptionsParser.ParseOption","kind":"method","status":"implemented","sigHash":"e3e5d3fa15a6c262a1dda4826b58471a520ff7c14b5aba00a340c7159f58db7a"}
 *
 * Go source:
 * func (o *compilerOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseCompilerOptions(key, value, o.CompilerOptions)
 * }
 */
export function compilerOptionsParser_ParseOption(receiver: GoPtr<compilerOptionsParser>, key: string, value: GoInterface<unknown>): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseCompilerOptions(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::compilerOptionsParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"2805b20c83c398ecca3920b71c5f2cee674c7654617a7d39976a8a73630c56f0"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::compilerOptionsParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"600d8c4e070559eeb11c56c6ab4520f80e829d22dc087bb193e74c0d8b1642e5"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::watchOptionsParser","kind":"type","status":"implemented","sigHash":"9e3449cfacdb4ce17607d42cf450131ed77f40afdd891dcf5455088da61fc283"}
 *
 * Go source:
 * watchOptionsParser struct {
 * 	*core.WatchOptions
 * }
 */
export interface watchOptionsParser {
  __tsgoEmbedded0: GoPtr<WatchOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::watchOptionsParser.ParseOption","kind":"method","status":"implemented","sigHash":"b073e29c211f65f8841f95982afe6e4e380896b89bc36a6c6002eb18883d4f14"}
 *
 * Go source:
 * func (o *watchOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseWatchOptions(key, value, o.WatchOptions)
 * }
 */
export function watchOptionsParser_ParseOption(receiver: GoPtr<watchOptionsParser>, key: string, value: GoInterface<unknown>): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseWatchOptions(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::watchOptionsParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"386186a0698c47f990c81a35330acf866570e4d9e1774e0c2530c1442fd3e3fb"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::watchOptionsParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"e3a95bc3f94b4b568bc7614455cbafed4cc687e33f80f2f764b558b872c6457d"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::typeAcquisitionParser","kind":"type","status":"implemented","sigHash":"ccff6fccd1a6cc3ab79c03ef8f9c5f1b60c22e80d6d668fdf2d0c2db3b83ebe5"}
 *
 * Go source:
 * typeAcquisitionParser struct {
 * 	*core.TypeAcquisition
 * }
 */
export interface typeAcquisitionParser {
  __tsgoEmbedded0: GoPtr<TypeAcquisition>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::typeAcquisitionParser.ParseOption","kind":"method","status":"implemented","sigHash":"a227058fff8d5a5170e89c446fec7c0a6d152866673c34452c60ae230209cf79"}
 *
 * Go source:
 * func (o *typeAcquisitionParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseTypeAcquisition(key, value, o.TypeAcquisition)
 * }
 */
export function typeAcquisitionParser_ParseOption(receiver: GoPtr<typeAcquisitionParser>, key: string, value: GoInterface<unknown>): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseTypeAcquisition(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::typeAcquisitionParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"d1f09afba585d4f8a973dd10339e1d133f59e05125fa8848041a796db6038b5d"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::typeAcquisitionParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"f5d369b9e515a178f4c19ed221b47f064fd534f030cfd279ae81e0b64fa77856"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::type::buildOptionsParser","kind":"type","status":"implemented","sigHash":"175101c1fd9d6b92c236fa198b07dedeb319571032fee1e7a6362786f043c099"}
 *
 * Go source:
 * buildOptionsParser struct {
 * 	*core.BuildOptions
 * }
 */
export interface buildOptionsParser {
  __tsgoEmbedded0: GoPtr<BuildOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::buildOptionsParser.ParseOption","kind":"method","status":"implemented","sigHash":"40f437214dbc7c3897c6a71142fcf2eb7a3811c20df1b3be0d75c73585fae2ad"}
 *
 * Go source:
 * func (o *buildOptionsParser) ParseOption(key string, value any) []*ast.Diagnostic {
 * 	return ParseBuildOptions(key, value, o.BuildOptions)
 * }
 */
export function buildOptionsParser_ParseOption(receiver: GoPtr<buildOptionsParser>, key: string, value: GoInterface<unknown>): GoSlice<GoPtr<Diagnostic>> {
  const o = receiver!;
  return ParseBuildOptions(key, value, o.__tsgoEmbedded0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::buildOptionsParser.UnknownOptionDiagnostic","kind":"method","status":"implemented","sigHash":"127b39babd9dec69bc0bc017310e0790a343dd8c5ac7c097a1ae93edc6443d26"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::method::buildOptionsParser.UnknownDidYouMeanDiagnostic","kind":"method","status":"implemented","sigHash":"cf3326644424e4708bff1d8fd98c0ae5aea7a4d933ef171f3313e9f9d32f1b08"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseCompilerOptions","kind":"func","status":"implemented","sigHash":"b68627376cdbbb84d8d916782adb8716c2b1da88ce4f01101eafc26ca2326d87"}
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
export function ParseCompilerOptions(key: string, value: GoInterface<unknown>, allOptions: GoPtr<CompilerOptions>): GoSlice<GoPtr<Diagnostic>> {
  if (value === undefined) {
    return [];
  }
  if (allOptions === undefined) {
    return [];
  }
  parseCompilerOptions(key, value, allOptions);
  return [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::parseCompilerOptions","kind":"func","status":"implemented","sigHash":"1232d65ea6f6391fbf016a09a53c9919379e0d6ad020090091e68ddc974f3db0"}
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
 * 	...
 * 	default:
 * 		// different than any key above
 * 		return false
 * 	}
 * 	return true
 * }
 */
export function parseCompilerOptions(key: string, value: GoInterface<unknown>, allOptions: GoPtr<CompilerOptions>): bool {
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::floatOrInt32ToFlag","kind":"func","status":"implemented","sigHash":"20db0255f87e7140b6f355ea9e6fd6c8eb69783915b5e9cb30fc1e919c370e3a"}
 *
 * Go source:
 * func floatOrInt32ToFlag[T ~int32](value any) T {
 * 	if v, ok := value.(T); ok {
 * 		return v
 * 	}
 * 	return T(value.(float64))
 * }
 */
export function floatOrInt32ToFlag<T extends GoConstraint<"~int32"> & number>(value: GoInterface<unknown>): T {
  // The flag types (JsxEmit, ModuleKind, ...) are all int32-backed; a number
  // value either already is the flag (`value.(T)`) or is a float64 to convert.
  // In both branches the dynamic value is the same number cast to the flag type.
  return value as T;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseWatchOptions","kind":"func","status":"implemented","sigHash":"60340ca18f07bdf66135cd8b155722772318c7e04120721cdec472682fefb06b"}
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
export function ParseWatchOptions(key: string, value: GoInterface<unknown>, allOptions: GoPtr<WatchOptions>): GoSlice<GoPtr<Diagnostic>> {
  if (allOptions === undefined) {
    return [];
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
  return [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseTypeAcquisition","kind":"func","status":"implemented","sigHash":"e32da4dde2bd378439ee1d87ad6d59f3538a725f0fe450eb0dd91da4eb688e39"}
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
export function ParseTypeAcquisition(key: string, value: GoInterface<unknown>, allOptions: GoPtr<TypeAcquisition>): GoSlice<GoPtr<Diagnostic>> {
  if (value === undefined) {
    return [];
  }
  if (allOptions === undefined) {
    return [];
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
  return [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ParseBuildOptions","kind":"func","status":"implemented","sigHash":"794ee8a4473683f18c2a63b0d15f6baee31adf3dcc2195537a945317ef701a03"}
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
export function ParseBuildOptions(key: string, value: GoInterface<unknown>, allOptions: GoPtr<BuildOptions>): GoSlice<GoPtr<Diagnostic>> {
  if (value === undefined) {
    return [];
  }
  if (allOptions === undefined) {
    return [];
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
  return [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::mergeCompilerOptions","kind":"func","status":"implemented","sigHash":"d720116fe56257adf2f50630135c4fc2926434fd3e12b47db535b4a6b8d9beea"}
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
export function mergeCompilerOptions(targetOptions: GoPtr<CompilerOptions>, sourceOptions: GoPtr<CompilerOptions>, rawSource: GoInterface<unknown>): GoPtr<CompilerOptions> {
  if (sourceOptions === undefined) {
    return targetOptions;
  }

  const explicitNullFields = new globalThis.Set<string>();
  if (rawSource !== undefined) {
    const rawMap = asOrderedMap(rawSource) as GoPtr<OrderedMap<string, GoInterface<unknown>>>;
    if (rawMap !== undefined) {
      const [compilerOptionsRaw, exists] = OrderedMap_Get(rawMap, "compilerOptions", GoZeroInterface);
      if (exists) {
        const compilerOptionsMap = asOrderedMap(compilerOptionsRaw) as GoPtr<OrderedMap<string, GoInterface<unknown>>>;
        if (compilerOptionsMap !== undefined) {
          OrderedMap_Entries(compilerOptionsMap)!((key: string, value: unknown): bool => {
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::convertToOptionsWithAbsolutePaths","kind":"func","status":"implemented","sigHash":"01cfcc21dba9256e325c87a22ff7f4d7a177fbddff66a9de40f8e203feb7008e"}
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
export function convertToOptionsWithAbsolutePaths(optionsBase: GoPtr<OrderedMap<string, GoInterface<unknown>>>, optionMap: CommandLineOptionNameMap, cwd: string): GoPtr<OrderedMap<string, GoInterface<unknown>>> {
  // !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
  // !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
  if (optionsBase === undefined) {
    return undefined;
  }
  const base = optionsBase as GoPtr<OrderedMap<string, GoInterface<unknown>>>;
  OrderedMap_Entries(base)!((o: string, v: unknown): bool => {
    const [result, ok] = ConvertOptionToAbsolutePath(o, v, optionMap, cwd);
    if (ok) {
      OrderedMap_Set(base, o, result, GoStringKey);
    }
    return true;
  });
  return optionsBase;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsinghelpers.go::func::ConvertOptionToAbsolutePath","kind":"func","status":"implemented","sigHash":"a296fdd3a0da9cd23b4001dcceeb1fcb500c53d239df1bb01761c7a0c3d75ad6"}
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
export function ConvertOptionToAbsolutePath(o: string, v: GoInterface<unknown>, optionMap: CommandLineOptionNameMap, cwd: string): [GoInterface<unknown>, bool] {
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
        const arr: GoSlice<GoInterface<unknown>> = v;
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
