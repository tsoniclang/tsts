import type { GoSlice } from "../compat.js";
import type { Context, CancelFunc } from "../context.js";
import { WithCancel } from "../context.js";

export function NotifyContext(parent: Context, ...signals: GoSlice<NodeJS.Signals | string>): [Context, CancelFunc] {
  const [context, cancel] = WithCancel(parent);
  const handlers = new Map<NodeJS.Signals, () => void>();
  const removeHandlers = (): void => {
    for (const [signal, handler] of handlers) {
      process.off(signal, handler);
    }
    handlers.clear();
  };

  try {
    for (const signal of signals) {
      const signalName = signal as NodeJS.Signals;
      if (handlers.has(signalName)) {
        continue;
      }
      const handler = (): void => cancel();
      process.on(signalName, handler);
      handlers.set(signalName, handler);
    }
  } catch (error) {
    removeHandlers();
    cancel();
    throw error;
  }

  let stopped = false;
  const stop = (): void => {
    if (stopped) {
      return;
    }
    stopped = true;
    cancel();
    removeHandlers();
  };
  return [context, stop];
}
