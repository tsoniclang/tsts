import assert from "node:assert/strict";
import { test } from "node:test";
import { JsonFieldNames, Marshal, Unmarshal } from "./json.js";

const bytes = (text: string): number[] => Array.from(new TextEncoder().encode(text));

test("struct metadata limits marshaling to declared JSON fields", () => {
  const value = {
    [JsonFieldNames]: {
      Exported: "exported",
    },
    Exported: "kept",
    internalState: "must not leak",
  };

  const [encoded, error] = Marshal(value);

  assert.equal(error, undefined);
  assert.equal(new TextDecoder().decode(Uint8Array.from(encoded)), '{"exported":"kept"}');
});

test("struct metadata ignores unknown JSON object members", () => {
  const value = {
    [JsonFieldNames]: {
      Exported: "exported",
    },
    Exported: "before",
  };

  const error = Unmarshal(bytes('{"exported":"after","unknown":"must not attach"}'), value);

  assert.equal(error, undefined);
  assert.equal(value.Exported, "after");
  assert.equal("unknown" in value, false);
});
