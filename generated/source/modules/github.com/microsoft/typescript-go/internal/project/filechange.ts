import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { TextDocumentContentChangePartialOrWholeDocument$Storage as TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { DocumentUri as DocumentUri__from_lsproto, LanguageKind as LanguageKind__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { Set$Add$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export const excessiveChangeThreshold$int: int = 1000;
export class FileChangeKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    IsWatchKind(): bool {
        return this.$value === FileChangeKindWatchCreate$constant().$value || this.$value === FileChangeKindWatchChange$constant().$value || this.$value === FileChangeKindWatchDelete$constant().$value;
    }
}
export function FileChangeKindOpen$constant(): FileChangeKind {
    return new FileChangeKind(0);
}
export function FileChangeKindClose$constant(): FileChangeKind {
    return new FileChangeKind(1);
}
export function FileChangeKindChange$constant(): FileChangeKind {
    return new FileChangeKind(2);
}
export function FileChangeKindSave$constant(): FileChangeKind {
    return new FileChangeKind(3);
}
export function FileChangeKindWatchCreate$constant(): FileChangeKind {
    return new FileChangeKind(4);
}
export function FileChangeKindWatchChange$constant(): FileChangeKind {
    return new FileChangeKind(5);
}
export function FileChangeKindWatchDelete$constant(): FileChangeKind {
    return new FileChangeKind(6);
}
export type FileChange$Storage = {
    Kind: int;
    URI: gostring;
    Version: int32;
    Content: gostring;
    LanguageKind: gostring;
    Changes: RuntimeSlice<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>;
};
export class FileChange {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FileChange$Storage) {
    }
    public static $storageOf($source: FileChange): FileChange$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FileChange$Storage): FileChange {
        return new FileChange($source);
    }
    public get Kind(): FileChangeKind {
        return new FileChangeKind(this.$storage.Kind);
    }
    public set Kind($value: FileChangeKind) {
        this.$storage.Kind = $value.$value;
    }
    public get URI(): DocumentUri__from_lsproto {
        return new DocumentUri__from_lsproto(this.$storage.URI);
    }
    public set URI($value: DocumentUri__from_lsproto) {
        this.$storage.URI = $value.$value;
    }
    public get Version(): int32 {
        return this.$storage.Version;
    }
    public set Version($value: int32) {
        this.$storage.Version = $value;
    }
    public get Content(): gostring {
        return this.$storage.Content;
    }
    public set Content($value: gostring) {
        this.$storage.Content = $value;
    }
    public get LanguageKind(): LanguageKind__from_lsproto {
        return new LanguageKind__from_lsproto(this.$storage.LanguageKind);
    }
    public set LanguageKind($value: LanguageKind__from_lsproto) {
        this.$storage.LanguageKind = $value.$value;
    }
    public get Changes(): RuntimeSlice<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage> {
        return this.$storage.Changes;
    }
    public set Changes($value: RuntimeSlice<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>) {
        this.$storage.Changes = $value;
    }
    static $zero(): FileChange {
        return new FileChange({
            Kind: ((void FileChangeKind,
                0) as int),
            URI: ((void DocumentUri__from_lsproto,
                "") as string),
            Version: 0,
            Content: "",
            LanguageKind: ((void LanguageKind__from_lsproto,
                "") as string),
            Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
        });
    }
    static $copy($source: FileChange): FileChange {
        return new FileChange({
            Kind: ((void FileChangeKind,
                $source.$storage.Kind) as int),
            URI: ((void DocumentUri__from_lsproto,
                $source.$storage.URI) as string),
            Version: $source.$storage.Version,
            Content: $source.$storage.Content,
            LanguageKind: ((void LanguageKind__from_lsproto,
                $source.$storage.LanguageKind) as string),
            Changes: $source.$storage.Changes
        });
    }
    declare private readonly then?: never;
}
export class FileChangeSummary {
    declare private readonly $goType: void;
    public constructor(public Opened: DocumentUri__from_lsproto, public Reopened: DocumentUri__from_lsproto, public Closed: Set__from_collections<DocumentUri__from_lsproto>, public Changed: Set__from_collections<DocumentUri__from_lsproto>, public Created: Set__from_collections<DocumentUri__from_lsproto>, public Deleted: Set__from_collections<DocumentUri__from_lsproto>, public IncludesWatchChangeOutsideNodeModules: bool, public InvalidateAll: bool) {
    }
    static $zero(): FileChangeSummary {
        return new FileChangeSummary(new DocumentUri__from_lsproto(""), new DocumentUri__from_lsproto(""), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
            return GoMap.nil();
        }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
            return GoMap.nil();
        }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
            return GoMap.nil();
        }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
            return GoMap.nil();
        }), false, false);
    }
    static $copy($source: FileChangeSummary): FileChangeSummary {
        return new FileChangeSummary($source.Opened, $source.Reopened, Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Closed), Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Changed), Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Created), Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Deleted), $source.IncludesWatchChangeOutsideNodeModules, $source.InvalidateAll);
    }
    declare private readonly then?: never;
    HasExcessiveNonCreateWatchEvents(): bool {
        let __gotots_logical_result_5 = this.InvalidateAll;
        if (!__gotots_logical_result_5) {
            const __gotots_store_13 = this;
            const __gotots_binary_operand_14 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Deleted"));
            const __gotots_store_14 = this;
            const __gotots_binary_operand_15 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Changed"));
            const __gotots_binary_operand_16 = __gotots_binary_operand_14 + __gotots_binary_operand_15;
            const __gotots_binary_operand_17 = excessiveChangeThreshold$int;
            __gotots_logical_result_5 = __gotots_binary_operand_16 > __gotots_binary_operand_17;
        }
        return __gotots_logical_result_5;
    }
    HasExcessiveWatchEvents(): bool {
        let __gotots_logical_result_4 = this.InvalidateAll;
        if (!__gotots_logical_result_4) {
            const __gotots_store_10 = this;
            const __gotots_binary_operand_8 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Created"));
            const __gotots_store_11 = this;
            const __gotots_binary_operand_9 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Deleted"));
            const __gotots_binary_operand_10 = __gotots_binary_operand_8 + __gotots_binary_operand_9;
            const __gotots_store_12 = this;
            const __gotots_binary_operand_11 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Changed"));
            const __gotots_binary_operand_12 = __gotots_binary_operand_10 + __gotots_binary_operand_11;
            const __gotots_binary_operand_13 = excessiveChangeThreshold$int;
            __gotots_logical_result_4 = __gotots_binary_operand_12 > __gotots_binary_operand_13;
        }
        return __gotots_logical_result_4;
    }
    IsEmpty(): bool {
        let __gotots_logical_result_0 = !this.InvalidateAll && this.Opened.$value ===
            ((void DocumentUri__from_lsproto,
                "") as string) && this.Reopened.$value ===
            ((void DocumentUri__from_lsproto,
                "") as string);
        if (__gotots_logical_result_0) {
            const __gotots_store_6 = this;
            const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Closed"));
            const __gotots_binary_operand_1 = 0;
            __gotots_logical_result_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
        }
        let __gotots_logical_result_1 = __gotots_logical_result_0;
        if (__gotots_logical_result_1) {
            const __gotots_store_7 = this;
            const __gotots_binary_operand_2 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Changed"));
            const __gotots_binary_operand_3 = 0;
            __gotots_logical_result_1 = __gotots_binary_operand_2 === __gotots_binary_operand_3;
        }
        let __gotots_logical_result_2 = __gotots_logical_result_1;
        if (__gotots_logical_result_2) {
            const __gotots_store_8 = this;
            const __gotots_binary_operand_4 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Created"));
            const __gotots_binary_operand_5 = 0;
            __gotots_logical_result_2 = __gotots_binary_operand_4 === __gotots_binary_operand_5;
        }
        let __gotots_logical_result_3 = __gotots_logical_result_2;
        if (__gotots_logical_result_3) {
            const __gotots_store_9 = this;
            const __gotots_binary_operand_6 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Deleted"));
            const __gotots_binary_operand_7 = 0;
            __gotots_logical_result_3 = __gotots_binary_operand_6 === __gotots_binary_operand_7;
        }
        return __gotots_logical_result_3;
    }
}
export function mergeFileChangeSummary(dst: FileChangeSummary | undefined, src: FileChangeSummary): void {
    if (src.IsEmpty()) {
        return;
    }
    if (src.InvalidateAll) {
        (dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).InvalidateAll = true;
    }
    const __gotots_store_0 = src;
    const __gotots_range_0 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Changed"));
    const __gotots_range_keys_0 = __gotots_range_0.keys();
    for (const __gotots_range_value_0 of __gotots_range_keys_0) {
        const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
        if (!__gotots_range_value_1[1]) {
            continue;
        }
        const __gotots_range_value_2 = __gotots_range_value_0;
        let uri = __gotots_range_value_2;
        const __gotots_store_1 = (dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Changed"), uri);
    }
    const __gotots_store_2 = src;
    const __gotots_range_1 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Created"));
    const __gotots_range_keys_1 = __gotots_range_1.keys();
    for (const __gotots_range_value_3 of __gotots_range_keys_1) {
        const __gotots_range_value_4 = __gotots_range_1.lookupOk(__gotots_range_value_3);
        if (!__gotots_range_value_4[1]) {
            continue;
        }
        const __gotots_range_value_5 = __gotots_range_value_3;
        let uri = __gotots_range_value_5;
        const __gotots_store_3 = (dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Created"), uri);
    }
    const __gotots_store_4 = src;
    const __gotots_range_2 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Deleted"));
    const __gotots_range_keys_2 = __gotots_range_2.keys();
    for (const __gotots_range_value_6 of __gotots_range_keys_2) {
        const __gotots_range_value_7 = __gotots_range_2.lookupOk(__gotots_range_value_6);
        if (!__gotots_range_value_7[1]) {
            continue;
        }
        const __gotots_range_value_8 = __gotots_range_value_6;
        let uri = __gotots_range_value_8;
        const __gotots_store_5 = (dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Deleted"), uri);
    }
    if (src.IncludesWatchChangeOutsideNodeModules) {
        (dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).IncludesWatchChangeOutsideNodeModules = true;
    }
}
