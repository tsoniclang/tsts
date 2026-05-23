import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  comparePatternKeys,
  getPackageNameFromTypesPackageName,
  getTypesPackageName,
  mangleScopedPackageName,
  parseNodeModuleFromPath,
  parsePackageName,
  tryGetJSExtensionForFile,
  unmangleScopedPackageName,
} from "./util.js";
import { JsxEmit } from "../outputpaths/outputpaths.js";

export class ParseNodeModuleFromPathTests {
  returns_package_root_for_simple_package(): void {
    Assert.Equal(
      "/a/node_modules/foo",
      parseNodeModuleFromPath("/a/node_modules/foo/bar.ts", false)
    );
  }

  returns_package_root_for_scoped_package(): void {
    Assert.Equal(
      "/a/node_modules/@scope/pkg",
      parseNodeModuleFromPath("/a/node_modules/@scope/pkg/bar.ts", false)
    );
  }

  returns_empty_when_path_has_no_node_modules(): void {
    Assert.Equal("", parseNodeModuleFromPath("/a/something/bar.ts", false));
  }

  uses_the_last_occurrence_of_node_modules(): void {
    Assert.Equal(
      "/a/node_modules/x/node_modules/y",
      parseNodeModuleFromPath("/a/node_modules/x/node_modules/y/index.ts", false)
    );
  }
}

export class ParsePackageNameTests {
  splits_simple_specifier(): void {
    const r = parsePackageName("foo/bar");
    Assert.Equal("foo", r[0]);
    Assert.Equal("bar", r[1]);
  }

  splits_scoped_specifier(): void {
    const r = parsePackageName("@scope/pkg/sub");
    Assert.Equal("@scope/pkg", r[0]);
    Assert.Equal("sub", r[1]);
  }

  returns_whole_name_when_no_subpath(): void {
    const r = parsePackageName("foo");
    Assert.Equal("foo", r[0]);
    Assert.Equal("", r[1]);
  }

  returns_scoped_package_alone_when_no_subpath(): void {
    const r = parsePackageName("@scope/pkg");
    Assert.Equal("@scope/pkg", r[0]);
    Assert.Equal("", r[1]);
  }
}

export class MangleUnmangleTests {
  mangles_scoped_name(): void {
    Assert.Equal("scope__pkg", mangleScopedPackageName("@scope/pkg"));
  }

  leaves_unscoped_name_unchanged(): void {
    Assert.Equal("foo", mangleScopedPackageName("foo"));
  }

  unmangles_mangled_name(): void {
    Assert.Equal("@scope/pkg", unmangleScopedPackageName("scope__pkg"));
  }

  leaves_non_mangled_name_unchanged(): void {
    Assert.Equal("foo", unmangleScopedPackageName("foo"));
  }

  round_trips(): void {
    Assert.Equal("@a/b", unmangleScopedPackageName(mangleScopedPackageName("@a/b")));
  }
}

export class TypesPackageNameTests {
  wraps_unscoped_name(): void {
    Assert.Equal("@types/foo", getTypesPackageName("foo"));
  }

  wraps_scoped_name_with_mangling(): void {
    Assert.Equal("@types/scope__pkg", getTypesPackageName("@scope/pkg"));
  }

  unwraps_mangled_types_name(): void {
    Assert.Equal("@scope/pkg", getPackageNameFromTypesPackageName("@types/scope__pkg"));
  }

  unwraps_unscoped_types_name(): void {
    Assert.Equal("foo", getPackageNameFromTypesPackageName("@types/foo"));
  }

  returns_input_unchanged_when_not_types(): void {
    Assert.Equal("foo", getPackageNameFromTypesPackageName("foo"));
  }
}

export class ComparePatternKeysTests {
  ranks_longer_prefix_higher(): void {
    Assert.Equal(-1, comparePatternKeys("foo/bar/*", "foo/*"));
    Assert.Equal(1, comparePatternKeys("foo/*", "foo/bar/*"));
  }

  returns_zero_for_equal_patterns(): void {
    Assert.Equal(0, comparePatternKeys("foo/*", "foo/*"));
  }

  ranks_literal_below_wildcard_at_same_char_length(): void {
    Assert.Equal(1, comparePatternKeys("foo", "foo*"));
    Assert.Equal(-1, comparePatternKeys("foo*", "foo"));
  }

  ranks_literal_above_wildcard_when_baselens_tie(): void {
    Assert.Equal(1, comparePatternKeys("foo", "fo*"));
    Assert.Equal(-1, comparePatternKeys("fo*", "foo"));
  }
}

export class TryGetJSExtensionForFileTests {
  maps_ts_to_js(): void {
    Assert.Equal(".js", tryGetJSExtensionForFile("foo.ts", JsxEmit.None));
  }

  maps_dts_to_js(): void {
    Assert.Equal(".js", tryGetJSExtensionForFile("foo.d.ts", JsxEmit.None));
  }

  maps_tsx_with_jsx_preserve_to_jsx(): void {
    Assert.Equal(".jsx", tryGetJSExtensionForFile("foo.tsx", JsxEmit.Preserve));
  }

  maps_tsx_with_jsx_react_to_js(): void {
    Assert.Equal(".js", tryGetJSExtensionForFile("foo.tsx", JsxEmit.React));
  }

  maps_mts_to_mjs(): void {
    Assert.Equal(".mjs", tryGetJSExtensionForFile("foo.mts", JsxEmit.None));
  }

  maps_cts_to_cjs(): void {
    Assert.Equal(".cjs", tryGetJSExtensionForFile("foo.cts", JsxEmit.None));
  }

  preserves_json_extension(): void {
    Assert.Equal(".json", tryGetJSExtensionForFile("foo.json", JsxEmit.None));
  }

  returns_empty_for_unsupported_extension(): void {
    Assert.Equal("", tryGetJSExtensionForFile("foo.txt", JsxEmit.None));
  }
}

A<ParseNodeModuleFromPathTests>().method((t) => t.returns_package_root_for_simple_package).add(FactAttribute);
A<ParseNodeModuleFromPathTests>().method((t) => t.returns_package_root_for_scoped_package).add(FactAttribute);
A<ParseNodeModuleFromPathTests>().method((t) => t.returns_empty_when_path_has_no_node_modules).add(FactAttribute);
A<ParseNodeModuleFromPathTests>().method((t) => t.uses_the_last_occurrence_of_node_modules).add(FactAttribute);
A<ParsePackageNameTests>().method((t) => t.splits_simple_specifier).add(FactAttribute);
A<ParsePackageNameTests>().method((t) => t.splits_scoped_specifier).add(FactAttribute);
A<ParsePackageNameTests>().method((t) => t.returns_whole_name_when_no_subpath).add(FactAttribute);
A<ParsePackageNameTests>().method((t) => t.returns_scoped_package_alone_when_no_subpath).add(FactAttribute);
A<MangleUnmangleTests>().method((t) => t.mangles_scoped_name).add(FactAttribute);
A<MangleUnmangleTests>().method((t) => t.leaves_unscoped_name_unchanged).add(FactAttribute);
A<MangleUnmangleTests>().method((t) => t.unmangles_mangled_name).add(FactAttribute);
A<MangleUnmangleTests>().method((t) => t.leaves_non_mangled_name_unchanged).add(FactAttribute);
A<MangleUnmangleTests>().method((t) => t.round_trips).add(FactAttribute);
A<TypesPackageNameTests>().method((t) => t.wraps_unscoped_name).add(FactAttribute);
A<TypesPackageNameTests>().method((t) => t.wraps_scoped_name_with_mangling).add(FactAttribute);
A<TypesPackageNameTests>().method((t) => t.unwraps_mangled_types_name).add(FactAttribute);
A<TypesPackageNameTests>().method((t) => t.unwraps_unscoped_types_name).add(FactAttribute);
A<TypesPackageNameTests>().method((t) => t.returns_input_unchanged_when_not_types).add(FactAttribute);
A<ComparePatternKeysTests>().method((t) => t.ranks_longer_prefix_higher).add(FactAttribute);
A<ComparePatternKeysTests>().method((t) => t.returns_zero_for_equal_patterns).add(FactAttribute);
A<ComparePatternKeysTests>().method((t) => t.ranks_literal_below_wildcard_at_same_char_length).add(FactAttribute);
A<ComparePatternKeysTests>().method((t) => t.ranks_literal_above_wildcard_when_baselens_tie).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.maps_ts_to_js).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.maps_dts_to_js).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.maps_tsx_with_jsx_preserve_to_jsx).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.maps_tsx_with_jsx_react_to_js).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.maps_mts_to_mjs).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.maps_cts_to_cjs).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.preserves_json_extension).add(FactAttribute);
A<TryGetJSExtensionForFileTests>().method((t) => t.returns_empty_for_unsupported_extension).add(FactAttribute);
