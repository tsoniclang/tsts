import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import {
  boolToTristate,
  compareTextRanges,
  coalesce,
  filter,
  find,
  findLast,
  findLastIndex,
  flatMap,
  ifElse,
  lastOrUndefined,
  map,
  mapNonNil,
  newTextRange,
  same,
  sameMap,
  singleOrUndefined,
  Stack,
  Tristate,
  tristateDefaultIfUnknown,
  tristateIsFalse,
  tristateIsTrue,
  tristateIsUnknown,
  tristateFromJSON,
  tristateToJSON,
  undefinedTextRange,
  version,
  versionMajorMinor,
} from "./index.js";

export class TristateTests {
  predicates(): void {
    Assert.True(tristateIsTrue(Tristate.True));
    Assert.True(tristateIsFalse(Tristate.False));
    Assert.True(tristateIsUnknown(Tristate.Unknown));
  }

  bool_to_tristate(): void {
    Assert.Equal(Tristate.True, boolToTristate(true));
    Assert.Equal(Tristate.False, boolToTristate(false));
  }

  default_if_unknown(): void {
    Assert.Equal(Tristate.True, tristateDefaultIfUnknown(Tristate.Unknown, Tristate.True));
    Assert.Equal(Tristate.False, tristateDefaultIfUnknown(Tristate.False, Tristate.True));
  }

  json_conversion(): void {
    Assert.Equal(Tristate.True, tristateFromJSON(true));
    Assert.Equal(Tristate.False, tristateFromJSON(false));
    Assert.Equal(Tristate.Unknown, tristateFromJSON(null));
    Assert.Equal(true, tristateToJSON(Tristate.True));
    Assert.Null(tristateToJSON(Tristate.Unknown));
  }
}

export class TextRangeTests {
  basic_constructor_and_accessors(): void {
    const r = newTextRange(5, 10);
    Assert.Equal(5, r.pos);
    Assert.Equal(10, r.end);
    Assert.Equal(5, r.len());
    Assert.True(r.isValid());
  }

  undefined_range(): void {
    const r = undefinedTextRange();
    Assert.False(r.isValid());
  }

  contains_semantics(): void {
    const r = newTextRange(5, 10);
    Assert.True(r.contains(5));
    Assert.True(r.contains(9));
    Assert.False(r.contains(10));
    Assert.True(r.containsInclusive(10));
    Assert.False(r.containsExclusive(5));
    Assert.True(r.containsExclusive(7));
  }

  overlap_vs_intersect(): void {
    const a = newTextRange(0, 5);
    const b = newTextRange(5, 10);
    Assert.False(a.overlaps(b));
    Assert.True(a.intersects(b));
  }

  compare_text_ranges(): void {
    Assert.Equal(0, compareTextRanges(newTextRange(0, 5), newTextRange(0, 5)));
    Assert.True(compareTextRanges(newTextRange(0, 5), newTextRange(1, 5)) < 0);
  }
}

export class StackTests {
  push_pop_peek_size(): void {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    s.push(3);
    Assert.Equal(3, s.size);
    Assert.Equal(3, s.peek());
    Assert.Equal(3, s.pop());
    Assert.Equal(2, s.pop());
    Assert.Equal(1, s.size);
  }

  pop_on_empty_throws(): void {
    const s = new Stack<number>();
    Assert.ThrowsAny<Exception>(() => { s.pop(); });
  }
}

export class VersionTests {
  version_returns_semver_string(): void {
    Assert.Matches("^[0-9]+\\.[0-9]+\\.[0-9]+", version());
  }

  version_major_minor_returns_major_dot_minor(): void {
    Assert.Matches("^[0-9]+\\.[0-9]+$", versionMajorMinor());
  }
}

export class ArrayUtilitiesTests {
  filter_keeps_matching_elements(): void {
    Assert.Equal<readonly number[]>([2, 4], filter([1, 2, 3, 4], (n) => n % 2 === 0));
  }

  map_applies_transform(): void {
    Assert.Equal<readonly number[]>([2, 4, 6], map([1, 2, 3], (n) => n * 2));
  }

  map_non_nil_drops_undefined(): void {
    Assert.Equal<readonly number[]>([2], mapNonNil([1, 2, 3], (n) => (n % 2 === 0 ? n : undefined)));
  }

  flat_map(): void {
    Assert.Equal<readonly number[]>([1, 10, 2, 20], flatMap([1, 2], (n) => [n, n * 10]));
  }

  same_map_returns_original_when_no_change(): void {
    const arr = [1, 2, 3];
    const result = sameMap(arr, (n) => n);
    Assert.Same(arr, result);
  }

  same_map_returns_new_array_when_changed(): void {
    const arr = [1, 2, 3];
    const result = sameMap(arr, (n) => n * 2);
    Assert.NotSame(arr, result);
    Assert.Equal<readonly number[]>([2, 4, 6], [...result]);
  }

  same_is_reference_equal_by_element(): void {
    const obj = { x: 1 };
    Assert.True(same([obj], [obj]));
    Assert.False(same([obj], [{ x: 1 }]));
  }

  find_last_and_find_last_index(): void {
    Assert.Equal(4, findLast([1, 2, 3, 4], (n) => n % 2 === 0));
    Assert.Equal(3, findLastIndex([1, 2, 3, 4], (n) => n % 2 === 0));
  }

  find(): void {
    Assert.Equal(2, find([1, 2, 3], (n) => n > 1));
  }

  if_else_coalesce_single_last(): void {
    Assert.Equal("a", ifElse(true, "a", "b"));
    Assert.Equal("x", coalesce(undefined, "x", "y"));
    Assert.Equal(42, singleOrUndefined([42]));
    Assert.Null(singleOrUndefined([1, 2]));
    Assert.Equal(3, lastOrUndefined([1, 2, 3]));
    Assert.Null(lastOrUndefined([]));
  }
}

A<TristateTests>().method((t) => t.predicates).add(FactAttribute);
A<TristateTests>().method((t) => t.bool_to_tristate).add(FactAttribute);
A<TristateTests>().method((t) => t.default_if_unknown).add(FactAttribute);
A<TristateTests>().method((t) => t.json_conversion).add(FactAttribute);
A<TextRangeTests>().method((t) => t.basic_constructor_and_accessors).add(FactAttribute);
A<TextRangeTests>().method((t) => t.undefined_range).add(FactAttribute);
A<TextRangeTests>().method((t) => t.contains_semantics).add(FactAttribute);
A<TextRangeTests>().method((t) => t.overlap_vs_intersect).add(FactAttribute);
A<TextRangeTests>().method((t) => t.compare_text_ranges).add(FactAttribute);
A<StackTests>().method((t) => t.push_pop_peek_size).add(FactAttribute);
A<StackTests>().method((t) => t.pop_on_empty_throws).add(FactAttribute);
A<VersionTests>().method((t) => t.version_returns_semver_string).add(FactAttribute);
A<VersionTests>().method((t) => t.version_major_minor_returns_major_dot_minor).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.filter_keeps_matching_elements).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.map_applies_transform).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.map_non_nil_drops_undefined).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.flat_map).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.same_map_returns_original_when_no_change).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.same_map_returns_new_array_when_changed).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.same_is_reference_equal_by_element).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.find_last_and_find_last_index).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.find).add(FactAttribute);
A<ArrayUtilitiesTests>().method((t) => t.if_else_coalesce_single_last).add(FactAttribute);
