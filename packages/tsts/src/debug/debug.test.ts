import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import { assert, assertNever, fail } from "./debug.js";

export class DebugFailTests {
  throws_with_default_message(): void {
    Assert.ThrowsAny<Exception>(() => {
      fail();
    });
  }

  throws_with_custom_reason(): void {
    const ex = Assert.ThrowsAny<Exception>(() => {
      fail("something broke");
    });
    Assert.Contains("something broke", ex.Message);
  }
}

export class DebugAssertTests {
  returns_silently_for_true(): void {
    assert(true);
    assert(true, "fine");
  }

  throws_for_false_without_context(): void {
    const ex = Assert.ThrowsAny<Exception>(() => {
      assert(false);
    });
    Assert.Contains("False expression", ex.Message);
  }

  throws_for_false_with_context(): void {
    const ex = Assert.ThrowsAny<Exception>(() => {
      assert(false, "context");
    });
    Assert.Contains("False expression: context", ex.Message);
  }
}

export class DebugAssertNeverTests {
  throws_with_default_message(): void {
    const ex = Assert.ThrowsAny<Exception>(() => {
      assertNever("unreachable" as never);
    });
    Assert.Contains("Illegal value", ex.Message);
  }

  includes_member_detail(): void {
    const ex = Assert.ThrowsAny<Exception>(() => {
      assertNever("xyz" as never);
    });
    Assert.Contains("xyz", ex.Message);
  }
}

A<DebugFailTests>().method((t) => t.throws_with_default_message).add(FactAttribute);
A<DebugFailTests>().method((t) => t.throws_with_custom_reason).add(FactAttribute);
A<DebugAssertTests>().method((t) => t.returns_silently_for_true).add(FactAttribute);
A<DebugAssertTests>().method((t) => t.throws_for_false_without_context).add(FactAttribute);
A<DebugAssertTests>().method((t) => t.throws_for_false_with_context).add(FactAttribute);
A<DebugAssertNeverTests>().method((t) => t.throws_with_default_message).add(FactAttribute);
A<DebugAssertNeverTests>().method((t) => t.includes_member_detail).add(FactAttribute);
