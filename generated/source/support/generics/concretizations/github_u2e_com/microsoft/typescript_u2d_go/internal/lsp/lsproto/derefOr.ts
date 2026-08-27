import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CompletionItemKind as CompletionItemKind__from_lsproto, InsertTextMode as InsertTextMode__from_lsproto, PrepareSupportDefaultBehavior as PrepareSupportDefaultBehavior__from_lsproto, SymbolKind as SymbolKind__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { bool, gostring, int32, uint32 } from "@gotots/runtime/scalars.js";
import { BooleanOrClientSemanticTokensRequestFullDelta as BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto, BooleanOrEmptyObject as BooleanOrEmptyObject__from_lsproto, FailureHandlingKind as FailureHandlingKind__from_lsproto, derefOr$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function derefOr$Named_lsproto$BooleanOrClientSemanticTokensRequestFullDelta($argument0: tsonicTypeScriptRuntime.Location<BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto> | undefined): BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto {
    return derefOr$kernel<BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto>(($argument0: BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto): BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto => {
        return BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto.$copy($argument0);
    }, (): BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto => {
        return BooleanOrClientSemanticTokensRequestFullDelta__from_lsproto.$zero();
    }, $argument0);
}
export function derefOr$Named_lsproto$BooleanOrEmptyObject($argument0: tsonicTypeScriptRuntime.Location<BooleanOrEmptyObject__from_lsproto> | undefined): BooleanOrEmptyObject__from_lsproto {
    return derefOr$kernel<BooleanOrEmptyObject__from_lsproto>(($argument0: BooleanOrEmptyObject__from_lsproto): BooleanOrEmptyObject__from_lsproto => {
        return BooleanOrEmptyObject__from_lsproto.$copy($argument0);
    }, (): BooleanOrEmptyObject__from_lsproto => {
        return BooleanOrEmptyObject__from_lsproto.$zero();
    }, $argument0);
}
export function derefOr$Named_lsproto$FailureHandlingKind($argument0: tsonicTypeScriptRuntime.Location<FailureHandlingKind__from_lsproto> | undefined): FailureHandlingKind__from_lsproto {
    return derefOr$kernel<FailureHandlingKind__from_lsproto>(($argument0: FailureHandlingKind__from_lsproto): FailureHandlingKind__from_lsproto => {
        return $argument0;
    }, (): FailureHandlingKind__from_lsproto => {
        return new FailureHandlingKind__from_lsproto("");
    }, $argument0);
}
export function derefOr$Named_lsproto$InsertTextMode($argument0: tsonicTypeScriptRuntime.Location<InsertTextMode__from_lsproto> | undefined): InsertTextMode__from_lsproto {
    return derefOr$kernel<InsertTextMode__from_lsproto>(($argument0: InsertTextMode__from_lsproto): InsertTextMode__from_lsproto => {
        return $argument0;
    }, (): InsertTextMode__from_lsproto => {
        return 0;
    }, $argument0);
}
export function derefOr$Named_lsproto$PrepareSupportDefaultBehavior($argument0: tsonicTypeScriptRuntime.Location<PrepareSupportDefaultBehavior__from_lsproto> | undefined): PrepareSupportDefaultBehavior__from_lsproto {
    return derefOr$kernel<PrepareSupportDefaultBehavior__from_lsproto>(($argument0: PrepareSupportDefaultBehavior__from_lsproto): PrepareSupportDefaultBehavior__from_lsproto => {
        return $argument0;
    }, (): PrepareSupportDefaultBehavior__from_lsproto => {
        return 0;
    }, $argument0);
}
export function derefOr$SliceOf_Named_lsproto$CompletionItemKind($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<CompletionItemKind__from_lsproto>> | undefined): RuntimeSlice<CompletionItemKind__from_lsproto> {
    return derefOr$kernel<RuntimeSlice<CompletionItemKind__from_lsproto>>(($argument0: RuntimeSlice<CompletionItemKind__from_lsproto>): RuntimeSlice<CompletionItemKind__from_lsproto> => {
        return $argument0;
    }, (): RuntimeSlice<CompletionItemKind__from_lsproto> => {
        return RuntimeSlice.nil<CompletionItemKind__from_lsproto>();
    }, $argument0);
}
export function derefOr$SliceOf_Named_lsproto$FoldingRangeKind($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): RuntimeSlice<gostring> {
    return derefOr$kernel<RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument0);
}
export function derefOr$SliceOf_Named_lsproto$MarkupKind($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): RuntimeSlice<gostring> {
    return derefOr$kernel<RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument0);
}
export function derefOr$SliceOf_Named_lsproto$PositionEncodingKind($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): RuntimeSlice<gostring> {
    return derefOr$kernel<RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument0);
}
export function derefOr$SliceOf_Named_lsproto$ResourceOperationKind($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): RuntimeSlice<gostring> {
    return derefOr$kernel<RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument0);
}
export function derefOr$SliceOf_Named_lsproto$SymbolKind($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<SymbolKind__from_lsproto>> | undefined): RuntimeSlice<SymbolKind__from_lsproto> {
    return derefOr$kernel<RuntimeSlice<SymbolKind__from_lsproto>>(($argument0: RuntimeSlice<SymbolKind__from_lsproto>): RuntimeSlice<SymbolKind__from_lsproto> => {
        return $argument0;
    }, (): RuntimeSlice<SymbolKind__from_lsproto> => {
        return RuntimeSlice.nil<SymbolKind__from_lsproto>();
    }, $argument0);
}
export function derefOr$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<gostring>> | undefined): RuntimeSlice<gostring> {
    return derefOr$kernel<RuntimeSlice<gostring>>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, (): RuntimeSlice<gostring> => {
        return RuntimeSlice.nil<gostring>();
    }, $argument0);
}
export function derefOr$bool($argument0: tsonicTypeScriptRuntime.Location<bool> | undefined): bool {
    return derefOr$kernel<bool>(($argument0: bool): bool => {
        return $argument0;
    }, (): bool => {
        return false;
    }, $argument0);
}
export function derefOr$int32($argument0: tsonicTypeScriptRuntime.Location<int32> | undefined): int32 {
    return derefOr$kernel<int32>(($argument0: int32): int32 => {
        return $argument0;
    }, (): int32 => {
        return 0;
    }, $argument0);
}
export function derefOr$string($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined): gostring {
    return derefOr$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
export function derefOr$uint32($argument0: tsonicTypeScriptRuntime.Location<uint32> | undefined): uint32 {
    return derefOr$kernel<uint32>(($argument0: uint32): uint32 => {
        return $argument0;
    }, (): uint32 => {
        return 0;
    }, $argument0);
}
