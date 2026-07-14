// Package diagnostics contains generated localizable diagnostic messages.
//
// diagnostics.ts is the faithful 1:1 hand-port of TS-Go's
// internal/diagnostics/diagnostics.go. The generated message catalog
// (the ~2153 &Message{...} declarations + keyToMessage switch) is emitted
// separately by the porter:diagnostics generator into ./generated/messages.ts,
// mirroring how diagnostics_generated.go is produced by generate.go.

import type { bool, int } from "../../go/scalars.js";
import { GoDynamicValue, GoEqualStrict, GoNamedStringKey, GoNilMap, type GoInterface, type GoMap, type GoMapKeyDescriptor, type GoPtr, type GoSlice } from "../../go/compat.js";
import { Sprintf } from "../../go/fmt.js";
import * as regexp from "../../go/regexp.js";
import { ParseInt } from "../../go/strconv.js";
import { ToValidUTF8 } from "../../go/strings.js";
import { Map } from "../../go/sync.js";
import type { Tag } from "../../go/golang.org/x/text/language.js";
import { Und } from "../../go/golang.org/x/text/language.js";
import { SameMap } from "../core/core.js";
import type { Locale } from "../locale/locale.js";
import { loadMatchedLocaleMessages } from "./generated/loc.js";
import { keyToMessage } from "./generated/messages.js";
import { GoSliceMake, GoStringValueOps } from "../../go/compat.js";
import { GoSliceLoad, GoSliceStore } from "../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::type::Category","kind":"type","status":"implemented","sigHash":"9ed85a7d5c8305a2a52d73283412548b073e28ea8abb464ed426ed1cf24edfa4"}
 *
 * Go source:
 * Category int32
 */
export type Category = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::constGroup::CategoryWarning+CategoryError+CategorySuggestion+CategoryMessage","kind":"constGroup","status":"implemented","sigHash":"e433856e19e5d8fa028332edf00f48dc1749118c30cbb187580045bc8741b7de"}
 *
 * Go source:
 * const (
 * 	CategoryWarning Category = iota
 * 	CategoryError
 * 	CategorySuggestion
 * 	CategoryMessage
 * )
 */
export const CategoryWarning: Category = 0;
export const CategoryError: Category = 1;
export const CategorySuggestion: Category = 2;
export const CategoryMessage: Category = 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Category.Name","kind":"method","status":"implemented","sigHash":"108f3bd2da25942df270790a2a30cc068cf7aa501e65c33d5afeaad582914920"}
 *
 * Go source:
 * func (category Category) Name() string {
 * 	switch category {
 * 	case CategoryWarning:
 * 		return "warning"
 * 	case CategoryError:
 * 		return "error"
 * 	case CategorySuggestion:
 * 		return "suggestion"
 * 	case CategoryMessage:
 * 		return "message"
 * 	}
 * 	panic("Unhandled diagnostic category")
 * }
 */
export function Category_Name(receiver: Category): string {
  switch (receiver) {
    case CategoryWarning:
      return "warning";
    case CategoryError:
      return "error";
    case CategorySuggestion:
      return "suggestion";
    case CategoryMessage:
      return "message";
  }
  throw new globalThis.Error("Unhandled diagnostic category");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::type::Key","kind":"type","status":"implemented","sigHash":"8116d70899d0f2e878924414b202f2f869a6a96178635a65ac094ce45315fe00"}
 *
 * Go source:
 * Key string
 */
export type Key = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::type::Message","kind":"type","status":"implemented","sigHash":"bf4f4a72d8103bd1e15ec288b5cf66c29f0278fa07ce8a0284ef88ad31a240f9"}
 *
 * Go source:
 * Message struct {
 * 	code                         int32
 * 	category                     Category
 * 	key                          Key
 * 	text                         string
 * 	reportsUnnecessary           bool
 * 	elidedInCompatibilityPyramid bool
 * 	reportsDeprecated            bool
 * }
 */
export interface Message {
  code: int;
  category: Category;
  key: Key;
  text: string;
  reportsUnnecessary: bool;
  elidedInCompatibilityPyramid: bool;
  reportsDeprecated: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.Code","kind":"method","status":"implemented","sigHash":"640a8e501a394072dcac6d413cd63867f18e9cf1db1cf0cf6dbbe1c028616240"}
 *
 * Go source:
 * func (m *Message) Code() int32                        { return m.code }
 */
export function Message_Code(receiver: GoPtr<Message>): int {
  return receiver!.code;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.Category","kind":"method","status":"implemented","sigHash":"3994c12cdc1c98da3c76d4ec79d45278534e3a40e3f72b837610614cb15a7cb3"}
 *
 * Go source:
 * func (m *Message) Category() Category                 { return m.category }
 */
export function Message_Category(receiver: GoPtr<Message>): Category {
  return receiver!.category;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.Key","kind":"method","status":"implemented","sigHash":"47c1cfec108a4976f59180ea1124897f068072ca8d5079e16be53b3f8802b06c"}
 *
 * Go source:
 * func (m *Message) Key() Key                           { return m.key }
 */
export function Message_Key(receiver: GoPtr<Message>): Key {
  return receiver!.key;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.ReportsUnnecessary","kind":"method","status":"implemented","sigHash":"db14f472da1810823cb0ebdb51f23ec372b3e15f0bb2f68be35b53526532d741"}
 *
 * Go source:
 * func (m *Message) ReportsUnnecessary() bool           { return m.reportsUnnecessary }
 */
export function Message_ReportsUnnecessary(receiver: GoPtr<Message>): bool {
  return receiver!.reportsUnnecessary;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.ElidedInCompatibilityPyramid","kind":"method","status":"implemented","sigHash":"0a7766ab329c1d0816e7e54b337226b61cdbbc10766c831408c8cf27acab6b31"}
 *
 * Go source:
 * func (m *Message) ElidedInCompatibilityPyramid() bool { return m.elidedInCompatibilityPyramid }
 */
export function Message_ElidedInCompatibilityPyramid(receiver: GoPtr<Message>): bool {
  return receiver!.elidedInCompatibilityPyramid;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.ReportsDeprecated","kind":"method","status":"implemented","sigHash":"d411230f48c58c16e6bf3af672b4ba2429a1919022d5d45342ad3b505ce75f1a"}
 *
 * Go source:
 * func (m *Message) ReportsDeprecated() bool            { return m.reportsDeprecated }
 */
export function Message_ReportsDeprecated(receiver: GoPtr<Message>): bool {
  return receiver!.reportsDeprecated;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.String","kind":"method","status":"implemented","sigHash":"3b2d34891aaf83a982589606a69863ff2018dd8e276107b3c863b35c42dc6f39"}
 *
 * Go source:
 * func (m *Message) String() string {
 * 	return m.text
 * }
 */
export function Message_String(receiver: GoPtr<Message>): string {
  return receiver!.text;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::method::Message.Localize","kind":"method","status":"implemented","sigHash":"8aaca1a246f230d3fa731416048b45ea68a0da91351ea65ee0a30415fea93f0c"}
 *
 * Go source:
 * func (m *Message) Localize(locale locale.Locale, args ...any) string {
 * 	return Localize(locale, m, "", StringifyArgs(args)...)
 * }
 */
export function Message_Localize(receiver: GoPtr<Message>, locale: Locale, args: GoSlice<GoInterface<unknown>>): string {
  return Localize(locale, receiver, "", ...StringifyArgs(args));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::func::Localize","kind":"func","status":"implemented","sigHash":"f8b5db38eaa0ed90e1d11a4e41f6293fc61bf3f9267565e3eb74136821d87181"}
 *
 * Go source:
 * func Localize(locale locale.Locale, message *Message, key Key, args ...string) string {
 * 	if message == nil {
 * 		message = keyToMessage(key)
 * 	}
 * 	if message == nil {
 * 		panic("Unknown diagnostic message: " + string(key))
 * 	}
 *
 * 	text := message.text
 * 	if localized, ok := getLocalizedMessages(language.Tag(locale))[message.key]; ok {
 * 		text = localized
 * 	}
 *
 * 	return Format(text, args)
 * }
 */
export function Localize(locale: Locale, message: GoPtr<Message>, key: Key, args: GoSlice<string>): string {
  if (message === undefined) {
    message = keyToMessage(key);
  }
  if (message === undefined) {
    throw new globalThis.Error("Unknown diagnostic message: " + key);
  }

  let text = message.text;
  const localizedMessages = getLocalizedMessages(locale);
  const localized = localizedMessages.get(message.key);
  if (localized !== undefined) {
    text = localized;
  }

  return Format(text, args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::varGroup::localizedMessagesCache","kind":"varGroup","status":"implemented","sigHash":"7b859d2ffe9b554adce31140450ea5b6b042af92b5062af57a3f661163b46e71"}
 *
 * Go source:
 * var localizedMessagesCache sync.Map // map[language.Tag]map[Key]string
 */
export let localizedMessagesCache: Map = new Map();
const languageTagKey: GoMapKeyDescriptor<Tag> = GoNamedStringKey<Tag>();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::func::getLocalizedMessages","kind":"func","status":"implemented","sigHash":"938c8f866fbc7ee358e1b68eceb4d247f7dae4739f97723bc330ddc5a3047236"}
 *
 * Go source:
 * func getLocalizedMessages(loc language.Tag) map[Key]string {
 * 	if loc == language.Und {
 * 		return nil
 * 	}
 *
 * 	// Check cache first
 * 	if cached, ok := localizedMessagesCache.Load(loc); ok {
 * 		if cached == nil {
 * 			return nil
 * 		}
 * 		return cached.(map[Key]string)
 * 	}
 *
 * 	var messages map[Key]string
 *
 * 	_, index, confidence := matcher.Match(loc)
 * 	if confidence >= language.Low && index >= 0 && index < len(localeFuncs) {
 * 		if fn := localeFuncs[index]; fn != nil {
 * 			messages = fn()
 * 		}
 * 	}
 *
 * 	localizedMessagesCache.Store(loc, messages)
 * 	return messages
 * }
 */
export function getLocalizedMessages(loc: Tag): GoMap<Key, string> {
  function isLocalizedMessages(value: GoInterface<unknown>): value is GoMap<Key, string> {
    if (!(value instanceof globalThis.Map)) {
      return false;
    }
    for (const [key, message] of value) {
      if (typeof key !== "string" || typeof message !== "string") {
        return false;
      }
    }
    return true;
  }

  if (loc === Und) {
    return GoNilMap<Key, string>();
  }
  const cached = localizedMessagesCache.Load(GoDynamicValue(languageTagKey, loc));
  if (cached[1]) {
    const cachedMessages = cached[0];
    if (cachedMessages === undefined) {
      return GoNilMap<Key, string>();
    }
    if (!isLocalizedMessages(cachedMessages)) {
      throw new globalThis.TypeError("localized messages cache contains an invalid value");
    }
    return cachedMessages;
  }
  const loadedMessages = loadMatchedLocaleMessages(loc);
  const messages = loadedMessages === undefined ? GoNilMap<Key, string>() : loadedMessages;
  localizedMessagesCache.Store(GoDynamicValue(languageTagKey, loc), messages);
  return messages;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::varGroup::placeholderRegexp","kind":"varGroup","status":"implemented","sigHash":"8a1d4aa3fbc816e5c83458fa887971ec75cb880c58d6eee444e8a75fb7a7f903"}
 *
 * Go source:
 * var placeholderRegexp = regexp.MustCompile(`{(\d+)}`)
 */
export let placeholderRegexp: GoPtr<regexp.Regexp> = regexp.MustCompile("{(\\d+)}");

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::func::Format","kind":"func","status":"implemented","sigHash":"8d0ebfd027fe9bdc6d80156a5f0e328da2c262f3f22071796afad2985f458936"}
 *
 * Go source:
 * func Format(text string, args []string) string {
 * 	if len(args) == 0 {
 * 		return text
 * 	}
 *
 * 	// Replace invalid UTF-8 with Unicode replacement character
 * 	args = core.SameMap(args, func(arg string) string {
 * 		return strings.ToValidUTF8(arg, "�")
 * 	})
 *
 * 	return placeholderRegexp.ReplaceAllStringFunc(text, func(match string) string {
 * 		index, err := strconv.ParseInt(match[1:len(match)-1], 10, 0)
 * 		if err != nil || int(index) >= len(args) {
 * 			panic("Invalid formatting placeholder")
 * 		}
 * 		return args[int(index)]
 * 	})
 * }
 */
export function Format(text: string, args: GoSlice<string>): string {
  if (args.length === 0) {
    return text;
  }

  // Replace invalid UTF-8 with Unicode replacement character
  args = SameMap<string>(args, (arg: string): string => {
    return ToValidUTF8(arg, "�");
  }, GoEqualStrict);

  return placeholderRegexp!.ReplaceAllStringFunc(text, (match: string): string => {
    const [index, err] = ParseInt(byteSlice(match, 1, (byteLen(match) - 1) as int), 10, 0);
    if (err !== undefined || (index as int) >= args.length) {
      throw new globalThis.Error("Invalid formatting placeholder");
    }
    return GoSliceLoad(args, index as int, GoStringValueOps)!;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/diagnostics/diagnostics.go::func::StringifyArgs","kind":"func","status":"implemented","sigHash":"41bd6330cf3741f51a654e441300548d780906716a750ff1b4969190f2dbc7ff"}
 *
 * Go source:
 * func StringifyArgs(args []any) []string {
 * 	if len(args) == 0 {
 * 		return nil
 * 	}
 *
 * 	result := make([]string, len(args))
 * 	for i, arg := range args {
 * 		if s, ok := arg.(string); ok {
 * 			result[i] = s
 * 		} else {
 * 			result[i] = fmt.Sprintf("%v", arg)
 * 		}
 * 	}
 * 	return result
 * }
 */
export function StringifyArgs(args: GoSlice<GoInterface<unknown>>): GoSlice<string> {
  if (args.length === 0) {
    return GoSliceMake(0, 0, GoStringValueOps);
  }

  const result: GoSlice<string> = new globalThis.Array<string>(args.length);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (typeof arg === "string") {
      GoSliceStore(result, i, arg, GoStringValueOps);
    } else {
      GoSliceStore(result, i, Sprintf("%v", arg), GoStringValueOps);
    }
  }
  return result;
}

// Go byte-length / byte-slice helpers (mirroring the convention used in
// internal/jsnum/string.ts). `Format` slices the regexp placeholder match
// `match[1:len(match)-1]` with Go byte semantics; placeholder matches are
// ASCII (`{<digits>}`), so byte and code-unit offsets coincide.
const utf8Encoder: TextEncoder = new globalThis.TextEncoder();
function byteLen(s: string): int {
  return utf8Encoder.encode(s).length as int;
}
function byteSlice(s: string, start: int, end: int): string {
  const bytes = utf8Encoder.encode(s);
  return new globalThis.TextDecoder().decode(bytes.slice(start as number, end as number));
}
