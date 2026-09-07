import assert from "node:assert/strict";
import test from "node:test";
import { exactAuthorityEnvironment } from "../scripts/toolchain-environment.mjs";

test("closed environments reject absent or invalid guard limits", () => {
  for (const key of ["TSTS_GO_MEMORY_LIMIT", "TSTS_GO_MAX_PROCS", "TSTS_NODE_OLD_SPACE_MIB"]) {
    const original = process.env[key];
    try {
      delete process.env[key];
      assert.throws(() => exactAuthorityEnvironment("/usr/bin", "/state"), /committed guarded process limits/u);
      process.env[key] = "0";
      assert.throws(() => exactAuthorityEnvironment("/usr/bin", "/state"), /committed guarded process limits/u);
    } finally {
      if (original === undefined) delete process.env[key];
      else process.env[key] = original;
    }
  }
});
