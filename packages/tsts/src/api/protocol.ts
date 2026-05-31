import { JSONRPCProtocol } from "./protocol_jsonrpc.js";
import { MsgpackProtocol, type MsgpackProtocolHandler } from "./protocol_msgpack.js";

export type Protocol = "msgpack" | "jsonrpc";

export function newProtocol(protocol: Protocol): MsgpackProtocolHandler {
  return protocol === "jsonrpc" ? new JSONRPCProtocol() : new MsgpackProtocol();
}
