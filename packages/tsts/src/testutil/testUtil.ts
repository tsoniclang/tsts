export function assert(condition: boolean, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}

export function must<T>(value: T | undefined, message = "expected value"): T {
  if (value === undefined) throw new Error(message);
  return value;
}

export function expectError(fn: () => void, message?: string): Error {
  try {
    fn();
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error(String(error));
  }
  throw new Error(message ?? "expected function to throw");
}
