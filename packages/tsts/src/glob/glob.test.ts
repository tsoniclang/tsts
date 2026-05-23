import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import { parse } from "./index.js";

function matches(pattern: string, input: string): boolean {
  return parse(pattern).match(input);
}

export class GlobLiteralsTests {
  exact_literal_matches(): void {
    Assert.True(matches("foo.ts", "foo.ts"));
    Assert.False(matches("foo.ts", "bar.ts"));
  }

  literal_with_directory(): void {
    Assert.True(matches("src/foo.ts", "src/foo.ts"));
    Assert.False(matches("src/foo.ts", "lib/foo.ts"));
  }
}

export class GlobStarTests {
  matches_one_or_more_chars_in_a_segment(): void {
    Assert.True(matches("*.ts", "foo.ts"));
    Assert.True(matches("*.ts", "bar.ts"));
    Assert.False(matches("*.ts", "foo.js"));
  }

  does_not_cross_slashes(): void {
    Assert.False(matches("*.ts", "src/foo.ts"));
  }

  matches_prefix_in_segment(): void {
    Assert.True(matches("foo*.ts", "foobar.ts"));
  }
}

export class GlobDoubleStarTests {
  matches_any_number_of_path_segments(): void {
    Assert.True(matches("**/foo.ts", "foo.ts"));
    Assert.True(matches("**/foo.ts", "src/foo.ts"));
    Assert.True(matches("**/foo.ts", "src/deep/nested/foo.ts"));
  }

  matches_subdirectories(): void {
    Assert.True(matches("src/**/*.ts", "src/foo.ts"));
    Assert.True(matches("src/**/*.ts", "src/lib/foo.ts"));
    Assert.True(matches("src/**/*.ts", "src/lib/nested/foo.ts"));
  }
}

export class GlobQuestionTests {
  matches_a_single_char_in_a_segment(): void {
    Assert.True(matches("foo?.ts", "foo1.ts"));
    Assert.False(matches("foo?.ts", "foo12.ts"));
    Assert.False(matches("foo?.ts", "foo.ts"));
  }

  does_not_match_slash(): void {
    Assert.True(matches("?/foo.ts", "a/foo.ts"));
    Assert.False(matches("?/foo.ts", "/foo.ts"));
  }
}

export class GlobGroupsTests {
  alternation(): void {
    Assert.True(matches("*.{ts,js}", "foo.ts"));
    Assert.True(matches("*.{ts,js}", "foo.js"));
    Assert.False(matches("*.{ts,js}", "foo.tsx"));
  }

  nested_with_double_star(): void {
    Assert.True(matches("**/*.{ts,tsx,js,jsx}", "src/components/Foo.tsx"));
    Assert.True(matches("**/*.{ts,tsx,js,jsx}", "node_modules/foo/index.d.ts"));
    Assert.False(matches("**/*.{ts,tsx,js,jsx}", "README.md"));
  }
}

export class GlobCharacterRangesTests {
  range_matches(): void {
    Assert.True(matches("foo.[0-9]", "foo.5"));
    Assert.False(matches("foo.[0-9]", "foo.a"));
  }

  negated_range(): void {
    Assert.True(matches("foo.[!0-9]", "foo.a"));
    Assert.False(matches("foo.[!0-9]", "foo.5"));
  }
}

export class GlobErrorsTests {
  double_star_in_middle_of_segment_fails(): void {
    Assert.ThrowsAny<Exception>(() => { parse("foo**bar"); });
  }

  unclosed_brace_fails(): void {
    Assert.ThrowsAny<Exception>(() => { parse("foo.{ts"); });
  }

  malformed_range_fails(): void {
    Assert.ThrowsAny<Exception>(() => { parse("foo.[a]"); });
  }
}

export class GlobToStringTests {
  preserves_simple_patterns(): void {
    Assert.Equal("*.ts", parse("*.ts").toString());
    Assert.Equal("**/*.ts", parse("**/*.ts").toString());
    Assert.Equal("foo?bar", parse("foo?bar").toString());
  }
}

A<GlobLiteralsTests>().method((t) => t.exact_literal_matches).add(FactAttribute);
A<GlobLiteralsTests>().method((t) => t.literal_with_directory).add(FactAttribute);
A<GlobStarTests>().method((t) => t.matches_one_or_more_chars_in_a_segment).add(FactAttribute);
A<GlobStarTests>().method((t) => t.does_not_cross_slashes).add(FactAttribute);
A<GlobStarTests>().method((t) => t.matches_prefix_in_segment).add(FactAttribute);
A<GlobDoubleStarTests>().method((t) => t.matches_any_number_of_path_segments).add(FactAttribute);
A<GlobDoubleStarTests>().method((t) => t.matches_subdirectories).add(FactAttribute);
A<GlobQuestionTests>().method((t) => t.matches_a_single_char_in_a_segment).add(FactAttribute);
A<GlobQuestionTests>().method((t) => t.does_not_match_slash).add(FactAttribute);
A<GlobGroupsTests>().method((t) => t.alternation).add(FactAttribute);
A<GlobGroupsTests>().method((t) => t.nested_with_double_star).add(FactAttribute);
A<GlobCharacterRangesTests>().method((t) => t.range_matches).add(FactAttribute);
A<GlobCharacterRangesTests>().method((t) => t.negated_range).add(FactAttribute);
A<GlobErrorsTests>().method((t) => t.double_star_in_middle_of_segment_fails).add(FactAttribute);
A<GlobErrorsTests>().method((t) => t.unclosed_brace_fails).add(FactAttribute);
A<GlobErrorsTests>().method((t) => t.malformed_range_fails).add(FactAttribute);
A<GlobToStringTests>().method((t) => t.preserves_simple_patterns).add(FactAttribute);
