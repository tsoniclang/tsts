import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { isJsonArray, isJsonObject, marshal, marshalIndent, unmarshal } from "./index.js";

export class JsonMarshalTests {
  round_trips_simple_values(): void {
    Assert.Equal("null", marshal(null));
    Assert.Equal("true", marshal(true));
    Assert.Equal("42", marshal(42));
    Assert.Equal('"hello"', marshal("hello"));
  }

  marshal_indent_without_prefix(): void {
    const result = marshalIndent({ a: 1 }, "", "  ");
    Assert.Equal('{\n  "a": 1\n}', result);
  }

  marshal_indent_empty_prefix_and_indent_equals_marshal(): void {
    Assert.Equal(marshal({ a: 1 }), marshalIndent({ a: 1 }, "", ""));
  }

  marshal_indent_with_prefix_adds_prefix_to_subsequent_lines(): void {
    const result = marshalIndent({ a: 1 }, "> ", "  ");
    Assert.Equal('{\n>   "a": 1\n> }', result);
  }
}

export class JsonTypeGuardTests {
  is_json_object(): void {
    Assert.True(isJsonObject({}));
    Assert.False(isJsonObject([]));
    Assert.False(isJsonObject(null));
    Assert.False(isJsonObject("foo"));
  }

  is_json_array(): void {
    Assert.True(isJsonArray([]));
    Assert.False(isJsonArray({}));
    Assert.False(isJsonArray(null));
  }
}

A<JsonMarshalTests>().method((t) => t.round_trips_simple_values).add(FactAttribute);
A<JsonMarshalTests>().method((t) => t.marshal_indent_without_prefix).add(FactAttribute);
A<JsonMarshalTests>().method((t) => t.marshal_indent_empty_prefix_and_indent_equals_marshal).add(FactAttribute);
A<JsonMarshalTests>().method((t) => t.marshal_indent_with_prefix_adds_prefix_to_subsequent_lines).add(FactAttribute);
A<JsonTypeGuardTests>().method((t) => t.is_json_object).add(FactAttribute);
A<JsonTypeGuardTests>().method((t) => t.is_json_array).add(FactAttribute);
