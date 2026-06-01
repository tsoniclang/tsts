import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { newIDInt } from "../../jsonrpc/index.js";
import {
  MarkupKindMarkdown,
  MarkupKindPlainText,
  NotificationInfo,
  RequestInfo,
  getClientCapabilities,
  preferredMarkupKind,
  unmarshalPtrTo,
  withClientCapabilities,
} from "./index.js";

interface RequestParams {
  readonly text: string;
}

interface RequestResult {
  readonly ok: boolean;
}

export class LspCoreTests {
  request_info_creates_request_messages_and_decodes_results(): void {
    const info = new RequestInfo<RequestParams, RequestResult>("workspace/test");
    const id = newIDInt(7);
    const message = info.newRequestMessage(id, { text: "input" });

    Assert.Equal("workspace/test", message.method);
    Assert.Equal(7, message.id?.mustInt());
    Assert.Equal(true, info.unmarshalResult("{\"ok\":true}").ok);
    Assert.Equal(false, info.unmarshalResult({ ok: false }).ok);
  }

  notification_info_creates_notification_messages(): void {
    const info = new NotificationInfo<RequestParams>("workspace/didTest");
    const message = info.newNotificationMessage({ text: "payload" });

    Assert.Equal("workspace/didTest", message.method);
    Assert.Equal(undefined, message.id);
  }

  client_capabilities_context_defaults_to_empty_capabilities(): void {
    const empty = getClientCapabilities(undefined);
    Assert.Equal(undefined, empty.textDocument);

    const context = withClientCapabilities({ requestId: 1 }, { _vs_supportsVisualStudioExtensions: true });
    Assert.Equal(true, getClientCapabilities(context)._vs_supportsVisualStudioExtensions);
  }

  preferred_markup_kind_uses_first_format_or_plain_text(): void {
    Assert.Equal(MarkupKindPlainText, preferredMarkupKind([]));
    Assert.Equal(MarkupKindMarkdown, preferredMarkupKind([MarkupKindMarkdown, MarkupKindPlainText]));
  }

  unmarshal_ptr_to_matches_value_unmarshal_shape(): void {
    const value = unmarshalPtrTo<RequestResult>("{\"ok\":true}");

    Assert.Equal(true, value.ok);
  }
}

A<LspCoreTests>().method((t) => t.request_info_creates_request_messages_and_decodes_results).add(FactAttribute);
A<LspCoreTests>().method((t) => t.notification_info_creates_notification_messages).add(FactAttribute);
A<LspCoreTests>().method((t) => t.client_capabilities_context_defaults_to_empty_capabilities).add(FactAttribute);
A<LspCoreTests>().method((t) => t.preferred_markup_kind_uses_first_format_or_plain_text).add(FactAttribute);
A<LspCoreTests>().method((t) => t.unmarshal_ptr_to_matches_value_unmarshal_shape).add(FactAttribute);
