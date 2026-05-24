import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { tryParseVersionRange, mustParse } from "./index.js";

function match(range: string, version: string): boolean {
  const r = tryParseVersionRange(range);
  if (r === undefined) throw new Error(`failed to parse range: ${range}`);
  return r.test(mustParse(version));
}

export class PrimitiveComparatorTests {
  gte_matches_exact_and_above(): void {
    Assert.True(match(">=1.2.3", "1.2.3"));
    Assert.True(match(">=1.2.3", "1.3.0"));
    Assert.False(match(">=1.2.3", "1.2.2"));
  }

  lt_matches_strict_below(): void {
    Assert.True(match("<2.0.0", "1.9.9"));
    Assert.False(match("<2.0.0", "2.0.0"));
  }

  eq_matches_exact(): void {
    Assert.True(match("=1.0.0", "1.0.0"));
    Assert.False(match("=1.0.0", "1.0.1"));
  }

  empty_op_behaves_like_eq(): void {
    Assert.True(match("1.0.0", "1.0.0"));
    Assert.False(match("1.0.0", "1.0.1"));
  }
}

export class TildeTests {
  tilde_patch_lock(): void {
    Assert.True(match("~1.2.3", "1.2.3"));
    Assert.True(match("~1.2.3", "1.2.99"));
    Assert.False(match("~1.2.3", "1.3.0"));
    Assert.False(match("~1.2.3", "1.2.2"));
  }

  tilde_minor_lock(): void {
    Assert.True(match("~1.2", "1.2.5"));
    Assert.False(match("~1.2", "1.3.0"));
  }
}

export class CaretTests {
  caret_major_one_or_more(): void {
    Assert.True(match("^1.2.3", "1.2.3"));
    Assert.True(match("^1.2.3", "1.999.999"));
    Assert.False(match("^1.2.3", "2.0.0"));
  }

  caret_zero_minor(): void {
    Assert.True(match("^0.2.3", "0.2.5"));
    Assert.False(match("^0.2.3", "0.3.0"));
  }

  caret_zero_zero_patch(): void {
    Assert.True(match("^0.0.3", "0.0.3"));
    Assert.False(match("^0.0.3", "0.0.4"));
  }
}

export class HyphenTests {
  full_range(): void {
    Assert.True(match("1.2.3 - 2.0.0", "1.2.3"));
    Assert.True(match("1.2.3 - 2.0.0", "2.0.0"));
    Assert.False(match("1.2.3 - 2.0.0", "2.0.1"));
  }

  partial_right_side_raises_upper(): void {
    Assert.True(match("1.2.3 - 2.3", "2.3.99"));
    Assert.False(match("1.2.3 - 2.3", "2.4.0"));
  }
}

export class WildcardTests {
  star_matches_anything(): void {
    Assert.True(match("*", "0.0.0"));
    Assert.True(match("*", "1.2.3"));
  }

  one_x_matches_one_y_z(): void {
    Assert.True(match("1.x", "1.0.0"));
    Assert.True(match("1.x", "1.99.99"));
    Assert.False(match("1.x", "2.0.0"));
  }
}

export class DisjunctionTests {
  or_combines_ranges(): void {
    Assert.True(match("1.x || >=3.0.0", "1.5.0"));
    Assert.True(match("1.x || >=3.0.0", "3.0.0"));
    Assert.False(match("1.x || >=3.0.0", "2.0.0"));
  }
}

export class InvalidInputTests {
  returns_undefined_for_nonsense(): void {
    Assert.Null(tryParseVersionRange("not a range"));
    Assert.Null(tryParseVersionRange("@@@"));
  }
}

export class ToStringTests {
  formats_parsed_ranges(): void {
    const r = tryParseVersionRange(">=1.0.0 <2.0.0");
    Assert.NotNull(r);
    Assert.Equal(">=1.0.0 <2.0.0", r!.toString());
  }

  empty_range_prints_as_star(): void {
    const r = tryParseVersionRange("");
    Assert.NotNull(r);
    Assert.Equal("*", r!.toString());
  }
}

A<PrimitiveComparatorTests>().method((t) => t.gte_matches_exact_and_above).add(FactAttribute);
A<PrimitiveComparatorTests>().method((t) => t.lt_matches_strict_below).add(FactAttribute);
A<PrimitiveComparatorTests>().method((t) => t.eq_matches_exact).add(FactAttribute);
A<PrimitiveComparatorTests>().method((t) => t.empty_op_behaves_like_eq).add(FactAttribute);
A<TildeTests>().method((t) => t.tilde_patch_lock).add(FactAttribute);
A<TildeTests>().method((t) => t.tilde_minor_lock).add(FactAttribute);
A<CaretTests>().method((t) => t.caret_major_one_or_more).add(FactAttribute);
A<CaretTests>().method((t) => t.caret_zero_minor).add(FactAttribute);
A<CaretTests>().method((t) => t.caret_zero_zero_patch).add(FactAttribute);
A<HyphenTests>().method((t) => t.full_range).add(FactAttribute);
A<HyphenTests>().method((t) => t.partial_right_side_raises_upper).add(FactAttribute);
A<WildcardTests>().method((t) => t.star_matches_anything).add(FactAttribute);
A<WildcardTests>().method((t) => t.one_x_matches_one_y_z).add(FactAttribute);
A<DisjunctionTests>().method((t) => t.or_combines_ranges).add(FactAttribute);
A<InvalidInputTests>().method((t) => t.returns_undefined_for_nonsense).add(FactAttribute);
A<ToStringTests>().method((t) => t.formats_parsed_ranges).add(FactAttribute);
A<ToStringTests>().method((t) => t.empty_range_prints_as_star).add(FactAttribute);
