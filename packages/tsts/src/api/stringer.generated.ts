export type ProtocolKind = "msgpack" | "jsonrpc";

export function protocolKindToString(kind: ProtocolKind): string {
  return kind;
}
