import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { isBundled, LibNames, Scheme, splitPath } from "./bundled.js";

export class BundledSchemeTests {
  is_bundled_recognizes_bundled_scheme(): void {
    Assert.True(isBundled(Scheme + "libs/lib.d.ts"));
    Assert.True(isBundled(Scheme));
  }

  is_bundled_rejects_non_scheme_paths(): void {
    Assert.False(isBundled("/usr/lib/lib.d.ts"));
    Assert.False(isBundled("lib.d.ts"));
    Assert.False(isBundled(""));
  }

  split_path_returns_rest_for_bundled_paths(): void {
    const result = splitPath(Scheme + "libs/lib.d.ts");
    Assert.True(result.ok);
    Assert.Equal("libs/lib.d.ts", result.rest);
  }

  split_path_handles_scheme_only(): void {
    const result = splitPath(Scheme);
    Assert.True(result.ok);
    Assert.Equal("", result.rest);
  }

  split_path_rejects_non_scheme(): void {
    const result = splitPath("/usr/lib/lib.d.ts");
    Assert.False(result.ok);
    Assert.Equal("", result.rest);
  }
}

export class BundledLibNamesTests {
  lib_names_includes_core_libs(): void {
    Assert.True(LibNames.includes("lib.d.ts"));
    Assert.True(LibNames.includes("lib.es5.d.ts"));
    Assert.True(LibNames.includes("lib.es2015.d.ts"));
    Assert.True(LibNames.includes("lib.esnext.d.ts"));
    Assert.True(LibNames.includes("lib.dom.d.ts"));
  }

  lib_names_is_sorted(): void {
    for (let i = 1; i < LibNames.length; i += 1) {
      const prev = LibNames[i - 1]!;
      const curr = LibNames[i]!;
      Assert.True(prev < curr);
    }
  }

  lib_names_has_expected_count(): void {
    Assert.Equal(106, LibNames.length);
  }
}

A<BundledSchemeTests>().method((t) => t.is_bundled_recognizes_bundled_scheme).add(FactAttribute);
A<BundledSchemeTests>().method((t) => t.is_bundled_rejects_non_scheme_paths).add(FactAttribute);
A<BundledSchemeTests>().method((t) => t.split_path_returns_rest_for_bundled_paths).add(FactAttribute);
A<BundledSchemeTests>().method((t) => t.split_path_handles_scheme_only).add(FactAttribute);
A<BundledSchemeTests>().method((t) => t.split_path_rejects_non_scheme).add(FactAttribute);
A<BundledLibNamesTests>().method((t) => t.lib_names_includes_core_libs).add(FactAttribute);
A<BundledLibNamesTests>().method((t) => t.lib_names_is_sorted).add(FactAttribute);
A<BundledLibNamesTests>().method((t) => t.lib_names_has_expected_count).add(FactAttribute);
