export function ignoringEINTR<T>(operation: () => T): T {
  for (;;) {
    try {
      return operation();
    } catch (error) {
      if (!isInterruptedSystemCall(error)) throw error;
    }
  }
}

export function isInterruptedSystemCall(error: unknown): boolean {
  return typeof error === "object"
    && error !== null
    && "code" in error
    && (error as { readonly code?: unknown }).code === "EINTR";
}
