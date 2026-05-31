import { JSONRPCProtocol } from "./protocolJsonRpc.js";
import { MsgpackProtocol, type MsgpackProtocolHandler } from "./protocolMsgpack.js";

export type Protocol = "msgpack" | "jsonrpc";

export function newProtocol(protocol: Protocol): MsgpackProtocolHandler {
  return protocol === "jsonrpc" ? new JSONRPCProtocol() : new MsgpackProtocol();
}
