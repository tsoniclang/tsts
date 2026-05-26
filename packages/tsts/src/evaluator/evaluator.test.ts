import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { anyToString, isTruthy, newResult } from "./index.js";

export class AnyToStringTests {
  strings_pass_through(): void {
    Assert.Equal("hello", anyToString("hello"));
    Assert.Equal("", anyToString(""));
  }

  numbers_stringify_per_js_spec(): void {
    Assert.Equal("42", anyToString(42));
    Assert.Equal("1.5", anyToString(1.5));
    Assert.Equal("NaN", anyToString(NaN));
    Assert.Equal("Infinity", anyToString(Infinity));
  }

  booleans(): void {
    Assert.Equal("true", anyToString(true));
    Assert.Equal("false", anyToString(false));
  }

  bigints(): void {
    Assert.Equal("42", anyToString(42n));
  }
}

export class IsTruthyTests {
  strings(): void {
    Assert.True(isTruthy("hello"));
    Assert.False(isTruthy(""));
  }

  numbers(): void {
    Assert.True(isTruthy(1));
    Assert.False(isTruthy(0));
    Assert.False(isTruthy(NaN));
  }

  booleans(): void {
    Assert.True(isTruthy(true));
    Assert.False(isTruthy(false));
  }

  bigints(): void {
    Assert.True(isTruthy(1n));
    Assert.False(isTruthy(0n));
  }
}

export class NewResultTests {
  constructs_result_objects(): void {
    const r = newResult("foo", true, false, false);
    Assert.Equal("foo", r.value);
    Assert.True(r.isSyntacticallyString);
    Assert.False(r.resolvedOtherFiles);
    Assert.False(r.hasExternalReferences);
  }
}

A<AnyToStringTests>().method((t) => t.strings_pass_through).add(FactAttribute);
A<AnyToStringTests>().method((t) => t.numbers_stringify_per_js_spec).add(FactAttribute);
A<AnyToStringTests>().method((t) => t.booleans).add(FactAttribute);
A<AnyToStringTests>().method((t) => t.bigints).add(FactAttribute);
A<IsTruthyTests>().method((t) => t.strings).add(FactAttribute);
A<IsTruthyTests>().method((t) => t.numbers).add(FactAttribute);
A<IsTruthyTests>().method((t) => t.booleans).add(FactAttribute);
A<IsTruthyTests>().method((t) => t.bigints).add(FactAttribute);
A<NewResultTests>().method((t) => t.constructs_result_objects).add(FactAttribute);
