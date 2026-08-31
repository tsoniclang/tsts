import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contract = JSON.parse(
  await readFile("implementations/hotpaths/core/contract.json", "utf8"),
);

test("core hot paths declare their bounded internal algorithm envelope", () => {
  assert.equal(contract.equivalenceEnvelope.kind, "internal-algorithm");
  assert.deepEqual(
    contract.callables.map((callable) => callable.export),
    ["arenaNew", "linkStoreGet"],
  );
  assert.ok(
    contract.equivalenceEnvelope.preservedObservables.some((observable) =>
      observable.includes("nil Arena or LinkStore receiver")
    ),
  );
  assert.ok(
    contract.equivalenceEnvelope.evidence.some((entry) =>
      entry.includes("Native-Go versus generated-TypeScript nil-receiver")
    ),
  );
});
