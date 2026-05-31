import type { Transport } from "./transport.js";

export interface UnixSocketTransportOptions {
  readonly path: string;
  readonly connect: (path: string) => Transport;
}

export function newUnixSocketTransport(options: UnixSocketTransportOptions): Transport {
  return options.connect(options.path);
}
