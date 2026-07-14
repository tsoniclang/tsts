import { test } from "node:test";
import assert from "node:assert/strict";
import {
  Bool,
  BoolValueOps,
  Int32,
  Int32ValueOps,
  Uint64,
  Uint64ValueOps,
} from "./atomic.js";

test("atomic.Bool implements load, store, swap, and compare-and-swap", () => {
  const value = new Bool();
  assert.equal(value.Load(), false);
  assert.equal(value.Swap(true), false);
  assert.equal(value.Load(), true);
  assert.equal(value.CompareAndSwap(false, false), false);
  assert.equal(value.CompareAndSwap(true, false), true);
  assert.equal(value.Load(), false);
});

test("atomic.Int32 preserves signed 32-bit arithmetic and bit operations", () => {
  const value = new Int32();
  value.Store(0x7fff_ffff);
  assert.equal(value.Add(1), -0x8000_0000);
  assert.equal(value.Swap(7), -0x8000_0000);
  assert.equal(value.CompareAndSwap(8, 9), false);
  assert.equal(value.CompareAndSwap(7, -1), true);
  assert.equal(value.And(0x7fff_ffff), -1);
  assert.equal(value.Load(), 0x7fff_ffff);
  assert.equal(value.Or(0x8000_0000), 0x7fff_ffff);
  assert.equal(value.Load(), -1);
});

test("atomic.Uint64 preserves every bit and wraps modulo 2^64", () => {
  const value = new Uint64();
  const highValue = 0xfedc_ba98_7654_3210n;
  const allBits = 0xffff_ffff_ffff_ffffn;
  const replacement = 0x8000_0000_0000_0001n;

  assert.equal(value.Load(), 0n);
  value.Store(highValue);
  assert.equal(value.Load(), highValue);
  assert.equal(value.Swap(allBits), highValue);
  assert.equal(value.CompareAndSwap(highValue, replacement), false);
  assert.equal(value.CompareAndSwap(allBits, replacement), true);
  assert.equal(value.Load(), replacement);

  value.Store(allBits);
  assert.equal(value.Add(1n), 0n);
  value.Store(allBits);
  assert.equal(value.And(0xffn), allBits);
  assert.equal(value.Load(), 0xffn);
  assert.equal(value.Or(0x8000_0000_0000_0000n), 0xffn);
  assert.equal(value.Load(), 0x8000_0000_0000_00ffn);
});

test("atomic noCopy ValueOps create fresh zero values", () => {
  assert.notEqual(BoolValueOps.zero(), BoolValueOps.zero());
  assert.notEqual(Int32ValueOps.zero(), Int32ValueOps.zero());
  assert.notEqual(Uint64ValueOps.zero(), Uint64ValueOps.zero());
});

test("atomic noCopy ValueOps copy valid pre-use values into independent zero values", () => {
  const boolValue = new Bool();
  const copiedBool = BoolValueOps.copy(boolValue);
  boolValue.Store(true);
  assert.equal(copiedBool.Load(), false);

  const int32Value = new Int32();
  const copiedInt32 = Int32ValueOps.copy(int32Value);
  int32Value.Store(42);
  assert.equal(copiedInt32.Load(), 0);

  const uint64Value = new Uint64();
  const copiedUint64 = Uint64ValueOps.copy(uint64Value);
  uint64Value.Store(0xffff_ffff_ffff_ffffn);
  assert.equal(copiedUint64.Load(), 0n);
});
