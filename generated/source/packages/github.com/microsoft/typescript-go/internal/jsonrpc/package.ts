import { MessageKindNotification$constant, MessageKindRequest$constant, MessageKindResponse$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsonrpc/jsonrpc.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
export function $initialize(): void {
    MessageKindNotification = MessageKindNotification$constant();
    MessageKindRequest = MessageKindRequest$constant();
    MessageKindResponse = MessageKindResponse$constant();
    $state.ErrInvalidContentLength = void 0;
    $state.ErrInvalidHeader = void 0;
    $state.ErrInvalidJSONRPCVersion = void 0;
    $state.ErrNoContentLength = void 0;
    {
        $state.ErrInvalidHeader = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("jsonrpc: invalid header"));
    }
    {
        $state.ErrInvalidContentLength = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("jsonrpc: invalid content length"));
    }
    {
        $state.ErrNoContentLength = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("jsonrpc: no content length"));
    }
    {
        $state.ErrInvalidJSONRPCVersion = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("invalid JSON-RPC version"));
    }
}
export { NewReader, NewWriter, Reader, Writer } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsonrpc/baseproto.js";
export { CodeInternalError, ID, JSONRPCVersion, Message, MessageKind, MessageKindNotification$constant, MessageKindRequest$constant, MessageKindResponse$constant, NewIDInt, NewIDString, RequestMessage, ResponseError, ResponseMessage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/jsonrpc/jsonrpc.js";
export let MessageKindNotification: ReturnType<typeof MessageKindNotification$constant>;
export let MessageKindRequest: ReturnType<typeof MessageKindRequest$constant>;
export let MessageKindResponse: ReturnType<typeof MessageKindResponse$constant>;
export { $state };
