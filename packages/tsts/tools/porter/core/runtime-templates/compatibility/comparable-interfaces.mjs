export const comparableInterfaceRuntime = `export function GoDynamicValue<T>(descriptor: GoMapKeyDescriptor<T>, value: T): GoDynamicComparable<T> {
  return globalThis.Object.freeze({
    typeIdentity: descriptor.identity,
    value,
    appendHashParts(parts: unknown[]): void {
      descriptor.appendHashParts(parts, value);
    },
    snapshot(): GoDynamicComparable<T> {
      return GoDynamicValue(descriptor, descriptor.snapshot(value));
    },
  });
}

export function GoBoxComparableInterface<T>(descriptor: GoMapKeyDescriptor<T>, value: T): GoInterface<unknown> {
  return GoDynamicValue(descriptor, value);
}

export function GoRequireComparableInterface(value: GoInterface<unknown>): GoComparableInterface {
  if (value === undefined) return undefined;
  const dynamic = value as GoDynamicComparable<unknown>;
  if (typeof dynamic.typeIdentity !== "symbol") throw new TypeError("hash of unboxed Go interface value");
  return dynamic;
}

export function GoUnboxComparableInterface(value: GoInterface<unknown>): GoInterface<unknown> {
  return GoRequireComparableInterface(value)?.value;
}

export function GoAssertComparableInterface<T>(value: GoInterface<unknown>, descriptor: GoMapKeyDescriptor<T>, expectedType: string): T {
  if (value === undefined) throw new TypeError("interface conversion: interface is nil, not " + expectedType);
  const dynamic = GoRequireComparableInterface(value)!;
  if (dynamic.typeIdentity !== descriptor.identity) throw new TypeError("interface conversion: interface does not contain " + expectedType);
  return dynamic.value as T;
}

export function GoInterfaceKey<K>(
  dynamic: (value: K) => GoDynamicComparable | undefined,
  construct: (dynamic: GoDynamicComparable | undefined) => K,
): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor<K>((parts, value) => {
    const selected = dynamic(value);
    if (selected === undefined) {
      parts.push(goNilInterfaceKey);
      return;
    }
    parts.push(selected.typeIdentity);
    selected.appendHashParts(parts);
  }, (value) => {
    const selected = dynamic(value);
    return selected === undefined
      ? construct(undefined)
      : construct(selected.snapshot());
  }, newStructuredGoMap);
}

export const GoComparableInterfaceKey: GoMapKeyDescriptor<GoComparableInterface> = GoInterfaceKey<GoComparableInterface>(
  (value) => value,
  (value) => value,
);
`;
