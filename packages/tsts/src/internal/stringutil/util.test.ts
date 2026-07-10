import { test } from "node:test";
import assert from "node:assert/strict";
import { ContainsNonASCII, EncodeURI } from "./util.js";

test("ContainsNonASCII detects the exact ASCII boundary without UTF-8 view churn", () => {
  assert.equal(ContainsNonASCII(""), false);
  assert.equal(ContainsNonASCII("\u0000\u007f"), false);
  assert.equal(ContainsNonASCII("\u0080"), true);
  assert.equal(ContainsNonASCII("plain ASCII source text".repeat(1024)), false);
  assert.equal(ContainsNonASCII(`${"a".repeat(4096)}ß`), true);
  assert.equal(ContainsNonASCII("💚"), true);
  assert.equal(ContainsNonASCII("\ud800"), true);
});

test("ContainsNonASCII matches the UTF-8 byte predicate for every UTF-16 code unit", () => {
  let mismatch = -1;
  for (let codeUnit = 0; codeUnit <= 0xffff; codeUnit++) {
    if (ContainsNonASCII(String.fromCharCode(codeUnit)) !== (codeUnit >= 0x80)) {
      mismatch = codeUnit;
      break;
    }
  }
  assert.equal(mismatch, -1);
});

test("EncodeURI mirrors upstream escaping cases", () => {
  const cases: Array<{ name: string; input: string; expected: string }> = [
    {
      name: "encodes spaces as percent20",
      input: "a b",
      expected: "a%20b",
    },
    {
      name: "preserves reserved uri characters",
      input: ";/?:@&=+$,#",
      expected: ";/?:@&=+$,#",
    },
    {
      name: "encodes brackets and unicode using utf8 bytes",
      input: "①Ⅻㄨㄩ U1[abc]",
      expected: "%E2%91%A0%E2%85%AB%E3%84%A8%E3%84%A9%20U1%5Babc%5D",
    },
  ];

  for (const testCase of cases) {
    assert.equal(EncodeURI(testCase.input), testCase.expected, testCase.name);
  }
});
