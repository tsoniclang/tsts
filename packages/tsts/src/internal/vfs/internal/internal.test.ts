import assert from "node:assert/strict";
import { test } from "node:test";

import { BigEndian, LittleEndian } from "../../../go/encoding/binary.js";
import { decodeUtf16 } from "./internal.js";

function binaryString(bytes: number[]): string {
  return String.fromCharCode(...bytes);
}

test("decodeUtf16 uses Go unicode/utf16 replacement and surrogate-pair semantics", () => {
  assert.equal(decodeUtf16(binaryString([0x34, 0xd8, 0x1e, 0xdd]), LittleEndian), "𝄞");
  assert.equal(decodeUtf16(binaryString([0xd8, 0x34, 0xdd, 0x1e]), BigEndian), "𝄞");
  assert.equal(decodeUtf16(binaryString([0x34, 0xd8]), LittleEndian), "�");
  assert.equal(decodeUtf16(binaryString([0x1e, 0xdd]), LittleEndian), "�");
});

test("decodeUtf16 ignores a final odd byte like binary.Read into len(s)/2 uint16s", () => {
  assert.equal(decodeUtf16(binaryString([0x61, 0x00, 0xff]), LittleEndian), "a");
});
