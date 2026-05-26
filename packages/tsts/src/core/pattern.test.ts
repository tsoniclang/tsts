import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  findBestPatternMatch,
  patternMatchedText,
  patternMatches,
  patternIsValid,
  tryParsePattern,
} from "./index.js";

export class PatternParseTests {
  exact_patterns_no_star(): void {
    const p = tryParsePattern("foo");
    Assert.Equal("foo", p.text);
    Assert.Equal(-1, p.starIndex);
    Assert.True(patternIsValid(p));
  }

  single_star_patterns(): void {
    const p = tryParsePattern("foo/*");
    Assert.Equal("foo/*", p.text);
    Assert.Equal(4, p.starIndex);
    Assert.True(patternIsValid(p));
  }

  multi_star_patterns_invalid(): void {
    const p = tryParsePattern("foo/*/bar/*");
    Assert.False(patternIsValid(p));
  }
}

export class PatternMatchTests {
  exact_match(): void {
    const p = tryParsePattern("foo");
    Assert.True(patternMatches(p, "foo"));
    Assert.False(patternMatches(p, "bar"));
  }

  prefix_star_match(): void {
    const p = tryParsePattern("foo/*");
    Assert.True(patternMatches(p, "foo/bar"));
    Assert.True(patternMatches(p, "foo/bar/baz"));
    Assert.False(patternMatches(p, "qux/bar"));
  }

  prefix_star_suffix_match(): void {
    const p = tryParsePattern("foo/*/bar");
    Assert.True(patternMatches(p, "foo/x/bar"));
    Assert.True(patternMatches(p, "foo/x/y/bar"));
  }
}

export class PatternMatchedTextTests {
  returns_wildcard_part(): void {
    const p = tryParsePattern("foo/*/bar");
    Assert.Equal("hello", patternMatchedText(p, "foo/hello/bar"));
  }

  empty_string_for_exact(): void {
    const p = tryParsePattern("foo");
    Assert.Equal("", patternMatchedText(p, "foo"));
  }
}

interface NamedPattern {
  readonly name: string;
  readonly pattern: string;
}

export class FindBestPatternMatchTests {
  returns_longest_prefix(): void {
    const values: readonly NamedPattern[] = [
      { name: "fallback", pattern: "*" },
      { name: "specific", pattern: "foo/*" },
      { name: "generic", pattern: "f*" },
    ];
    const best = findBestPatternMatch(values, (v) => tryParsePattern(v.pattern), "foo/bar");
    Assert.NotNull(best);
    Assert.Equal("specific", best!.name);
  }

  returns_undefined_if_nothing_matches(): void {
    const values: readonly NamedPattern[] = [{ name: "only", pattern: "foo/*" }];
    const best = findBestPatternMatch(values, (v) => tryParsePattern(v.pattern), "bar/baz");
    Assert.Null(best);
  }
}

A<PatternParseTests>().method((t) => t.exact_patterns_no_star).add(FactAttribute);
A<PatternParseTests>().method((t) => t.single_star_patterns).add(FactAttribute);
A<PatternParseTests>().method((t) => t.multi_star_patterns_invalid).add(FactAttribute);
A<PatternMatchTests>().method((t) => t.exact_match).add(FactAttribute);
A<PatternMatchTests>().method((t) => t.prefix_star_match).add(FactAttribute);
A<PatternMatchTests>().method((t) => t.prefix_star_suffix_match).add(FactAttribute);
A<PatternMatchedTextTests>().method((t) => t.returns_wildcard_part).add(FactAttribute);
A<PatternMatchedTextTests>().method((t) => t.empty_string_for_exact).add(FactAttribute);
A<FindBestPatternMatchTests>().method((t) => t.returns_longest_prefix).add(FactAttribute);
A<FindBestPatternMatchTests>().method((t) => t.returns_undefined_if_nothing_matches).add(FactAttribute);
