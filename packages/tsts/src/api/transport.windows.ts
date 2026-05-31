import type { Transport } from "./transport.js";

export interface WindowsPipeTransportOptions {
  readonly pipeName: string;
  readonly connect: (pipeName: string) => Transport;
}

export function newWindowsPipeTransport(options: WindowsPipeTransportOptions): Transport {
  return options.connect(options.pipeName);
}
