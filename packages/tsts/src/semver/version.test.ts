import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import { mustParse, tryParseVersion, Version } from "./index.js";

export class SemverParseTests {
  parses_full_x_y_z(): void {
    const v = tryParseVersion("1.2.3");
    Assert.Equal(1, v.major);
    Assert.Equal(2, v.minor);
    Assert.Equal(3, v.patch);
  }

  parses_partial_x(): void {
    const v = tryParseVersion("5");
    Assert.Equal(5, v.major);
    Assert.Equal(0, v.minor);
    Assert.Equal(0, v.patch);
  }

  parses_x_y(): void {
    const v = tryParseVersion("3.14");
    Assert.Equal(3, v.major);
    Assert.Equal(14, v.minor);
    Assert.Equal(0, v.patch);
  }

  parses_with_prerelease(): void {
    const v = tryParseVersion("1.2.3-alpha.1");
    Assert.Equal(2, v.prerelease.length);
    Assert.Equal("alpha", v.prerelease[0]);
    Assert.Equal("1", v.prerelease[1]);
  }

  parses_with_build(): void {
    const v = tryParseVersion("1.2.3+build.456");
    Assert.Equal(2, v.build.length);
    Assert.Equal("build", v.build[0]);
    Assert.Equal("456", v.build[1]);
  }

  parses_with_both_prerelease_and_build(): void {
    const v = tryParseVersion("1.2.3-alpha.1+build.456");
    Assert.Equal(2, v.prerelease.length);
    Assert.Equal("alpha", v.prerelease[0]);
    Assert.Equal("1", v.prerelease[1]);
    Assert.Equal(2, v.build.length);
    Assert.Equal("build", v.build[0]);
    Assert.Equal("456", v.build[1]);
  }

  rejects_invalid_input(): void {
    Assert.ThrowsAny<Exception>(() => { tryParseVersion("not.a.version"); });
    Assert.ThrowsAny<Exception>(() => { tryParseVersion(""); });
    Assert.ThrowsAny<Exception>(() => { tryParseVersion("01.2.3"); });
  }

  must_parse_alias(): void {
    const v = mustParse("1.0.0");
    Assert.True(v instanceof Version);
  }
}

export class SemverCompareTests {
  major_version_difference(): void {
    Assert.Equal(1, tryParseVersion("2.0.0").compare(tryParseVersion("1.0.0")));
    Assert.Equal(-1, tryParseVersion("1.0.0").compare(tryParseVersion("2.0.0")));
  }

  minor_version_difference(): void {
    Assert.Equal(1, tryParseVersion("1.2.0").compare(tryParseVersion("1.1.0")));
  }

  patch_version_difference(): void {
    Assert.Equal(1, tryParseVersion("1.2.3").compare(tryParseVersion("1.2.2")));
  }

  equal(): void {
    Assert.Equal(0, tryParseVersion("1.2.3").compare(tryParseVersion("1.2.3")));
  }

  prerelease_vs_no_prerelease_prerelease_loses(): void {
    Assert.Equal(-1, tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0")));
    Assert.Equal(1, tryParseVersion("1.0.0").compare(tryParseVersion("1.0.0-alpha")));
  }

  prerelease_numeric_vs_alpha(): void {
    Assert.Equal(-1, tryParseVersion("1.0.0-1").compare(tryParseVersion("1.0.0-alpha")));
  }

  prerelease_numeric_comparison(): void {
    Assert.Equal(-1, tryParseVersion("1.0.0-9").compare(tryParseVersion("1.0.0-10")));
  }

  prerelease_lexical_comparison(): void {
    Assert.Equal(-1, tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0-beta")));
  }

  longer_prerelease_wins_when_prefix_equal(): void {
    Assert.Equal(-1, tryParseVersion("1.0.0-alpha").compare(tryParseVersion("1.0.0-alpha.1")));
  }

  build_metadata_does_not_affect_precedence(): void {
    const a = tryParseVersion("1.0.0+build.1");
    const b = tryParseVersion("1.0.0+build.2");
    Assert.Equal(0, a.compare(b));
  }

  equals_method(): void {
    Assert.True(tryParseVersion("1.2.3").equals(tryParseVersion("1.2.3")));
    Assert.False(tryParseVersion("1.2.3").equals(tryParseVersion("1.2.4")));
  }
}

export class SemverIncrementTests {
  increment_major(): void {
    const v = tryParseVersion("1.2.3").incrementMajor();
    Assert.Equal(2, v.major);
    Assert.Equal(0, v.minor);
    Assert.Equal(0, v.patch);
  }

  increment_minor(): void {
    const v = tryParseVersion("1.2.3").incrementMinor();
    Assert.Equal(1, v.major);
    Assert.Equal(3, v.minor);
    Assert.Equal(0, v.patch);
  }

  increment_patch(): void {
    const v = tryParseVersion("1.2.3").incrementPatch();
    Assert.Equal(1, v.major);
    Assert.Equal(2, v.minor);
    Assert.Equal(4, v.patch);
  }
}

export class SemverToStringTests {
  round_trips_simple_versions(): void {
    Assert.Equal("1.2.3", tryParseVersion("1.2.3").toString());
  }

  includes_prerelease(): void {
    Assert.Equal("1.2.3-alpha.1", tryParseVersion("1.2.3-alpha.1").toString());
  }

  includes_build_metadata(): void {
    Assert.Equal("1.2.3+build.456", tryParseVersion("1.2.3+build.456").toString());
  }

  partial_parses_fill_with_zeros(): void {
    Assert.Equal("5.0.0", tryParseVersion("5").toString());
  }
}

A<SemverParseTests>().method((t) => t.parses_full_x_y_z).add(FactAttribute);
A<SemverParseTests>().method((t) => t.parses_partial_x).add(FactAttribute);
A<SemverParseTests>().method((t) => t.parses_x_y).add(FactAttribute);
A<SemverParseTests>().method((t) => t.parses_with_prerelease).add(FactAttribute);
A<SemverParseTests>().method((t) => t.parses_with_build).add(FactAttribute);
A<SemverParseTests>().method((t) => t.parses_with_both_prerelease_and_build).add(FactAttribute);
A<SemverParseTests>().method((t) => t.rejects_invalid_input).add(FactAttribute);
A<SemverParseTests>().method((t) => t.must_parse_alias).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.major_version_difference).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.minor_version_difference).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.patch_version_difference).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.equal).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.prerelease_vs_no_prerelease_prerelease_loses).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.prerelease_numeric_vs_alpha).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.prerelease_numeric_comparison).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.prerelease_lexical_comparison).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.longer_prerelease_wins_when_prefix_equal).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.build_metadata_does_not_affect_precedence).add(FactAttribute);
A<SemverCompareTests>().method((t) => t.equals_method).add(FactAttribute);
A<SemverIncrementTests>().method((t) => t.increment_major).add(FactAttribute);
A<SemverIncrementTests>().method((t) => t.increment_minor).add(FactAttribute);
A<SemverIncrementTests>().method((t) => t.increment_patch).add(FactAttribute);
A<SemverToStringTests>().method((t) => t.round_trips_simple_versions).add(FactAttribute);
A<SemverToStringTests>().method((t) => t.includes_prerelease).add(FactAttribute);
A<SemverToStringTests>().method((t) => t.includes_build_metadata).add(FactAttribute);
A<SemverToStringTests>().method((t) => t.partial_parses_fill_with_zeros).add(FactAttribute);
