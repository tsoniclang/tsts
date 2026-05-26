import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

export class SmokeTests {
  one_plus_one_is_two(): void {
    Assert.Equal(2, 1 + 1);
  }
}

A<SmokeTests>()
  .method((t) => t.one_plus_one_is_two)
  .add(FactAttribute);
