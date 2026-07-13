export function externalRuntimeStorageOperations(facade, operations) {
  const configured = facade.runtimeAdaptation?.basicStorage ?? [];
  const storage = new Map(configured.map((entry) => [entry.goBasic, entry.tsScalar]));
  const consumed = new Set();
  return {
    operations: {
      ...operations,
      basic: (name) => {
        const selected = storage.get(name);
        if (selected === undefined) return operations.basic(name);
        consumed.add(name);
        return selected;
      },
    },
    assertConsumed: () => {
      const unused = configured.filter((entry) => !consumed.has(entry.goBasic));
      if (unused.length > 0) {
        throw new Error(`external facade '${facade.objectId}' runtimeAdaptation.basicStorage is unused for: ${unused.map((entry) => entry.goBasic).join(", ")}`);
      }
    },
  };
}
