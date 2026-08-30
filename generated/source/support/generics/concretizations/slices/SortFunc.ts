import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { structField$Storage as structField__from_json$Storage } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/fields.js";
import type { objectMember$Storage as objectMember__from_jsontext$Storage } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { redirectsFile as redirectsFile__from_compiler } from "../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { TextChange$Storage as TextChange__from_core$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/core/textchange.js";
import type { Fix as Fix__from_autoimport } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { BucketStats$Storage as BucketStats__from_autoimport$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { FixAndExport as FixAndExport__from_autoimport } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/view.js";
import type { fixInfo as fixInfo__from_ls } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/codeactions_importfixes.js";
import type { DeclarationInfo$Storage as DeclarationInfo__from_ls$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/symbols.js";
import type { CallHierarchyIncomingCall as CallHierarchyIncomingCall__from_lsproto, CallHierarchyOutgoingCall as CallHierarchyOutgoingCall__from_lsproto, DocumentSymbol as DocumentSymbol__from_lsproto, FoldingRange as FoldingRange__from_lsproto, Range$Storage as Range__from_lsproto$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { ModulePath$Storage as ModulePath__from_modulespecifiers$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import type { Project as Project__from_project } from "../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { MappedPosition as MappedPosition__from_sourcemap } from "../../../../modules/github.com/microsoft/typescript-go/internal/sourcemap/source_mapper.js";
import type { TraceRecord$Storage as TraceRecord__from_tracing$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/tracing/tracing.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { structField as structField__from_json } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/fields.js";
import { objectMember as objectMember__from_jsontext } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
import { TextChange as TextChange__from_core } from "../../../../modules/github.com/microsoft/typescript-go/internal/core/textchange.js";
import { BucketStats as BucketStats__from_autoimport } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import { DeclarationInfo as DeclarationInfo__from_ls } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/symbols.js";
import { Range as Range__from_lsproto } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { ModulePath as ModulePath__from_modulespecifiers } from "../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import { TraceRecord as TraceRecord__from_tracing } from "../../../../modules/github.com/microsoft/typescript-go/internal/tracing/tracing.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function SortFunc$SliceOf_Named_autoimport$BucketStats$Named_autoimport$BucketStats($argument0: RuntimeSlice<BucketStats__from_autoimport$Storage>, $argument1: (($0: BucketStats__from_autoimport, $1: BucketStats__from_autoimport) => int) | undefined): void {
    const __gotots_callee_8 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<BucketStats__from_autoimport$Storage>, BucketStats__from_autoimport, BucketStats__from_autoimport$Storage>(($argument0: RuntimeSlice<BucketStats__from_autoimport$Storage>): RuntimeSlice<BucketStats__from_autoimport$Storage> => {
        return $argument0;
    }, ($argument0: BucketStats__from_autoimport): BucketStats__from_autoimport => {
        return BucketStats__from_autoimport.$copy($argument0);
    }, ($argument0: BucketStats__from_autoimport$Storage): BucketStats__from_autoimport => {
        return BucketStats__from_autoimport.$fromStorage($argument0);
    }, ($argument0: BucketStats__from_autoimport): BucketStats__from_autoimport$Storage => {
        return BucketStats__from_autoimport.$storageOf($argument0);
    }, $argument0, __gotots_callee_8 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_8($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_core$TextChange$Named_core$TextChange($argument0: RuntimeSlice<TextChange__from_core$Storage>, $argument1: (($0: TextChange__from_core, $1: TextChange__from_core) => int) | undefined): void {
    const __gotots_callee_3 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<TextChange__from_core$Storage>, TextChange__from_core, TextChange__from_core$Storage>(($argument0: RuntimeSlice<TextChange__from_core$Storage>): RuntimeSlice<TextChange__from_core$Storage> => {
        return $argument0;
    }, ($argument0: TextChange__from_core): TextChange__from_core => {
        return TextChange__from_core.$copy($argument0);
    }, ($argument0: TextChange__from_core$Storage): TextChange__from_core => {
        return TextChange__from_core.$fromStorage($argument0);
    }, ($argument0: TextChange__from_core): TextChange__from_core$Storage => {
        return TextChange__from_core.$storageOf($argument0);
    }, $argument0, __gotots_callee_3 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_3($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_json$structField$Named_json$structField($argument0: RuntimeSlice<structField__from_json$Storage>, $argument1: (($0: structField__from_json, $1: structField__from_json) => int) | undefined): void {
    const __gotots_callee_13 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<structField__from_json$Storage>, structField__from_json, structField__from_json$Storage>(($argument0: RuntimeSlice<structField__from_json$Storage>): RuntimeSlice<structField__from_json$Storage> => {
        return $argument0;
    }, ($argument0: structField__from_json): structField__from_json => {
        return structField__from_json.$copy($argument0);
    }, ($argument0: structField__from_json$Storage): structField__from_json => {
        return structField__from_json.$fromStorage($argument0);
    }, ($argument0: structField__from_json): structField__from_json$Storage => {
        return structField__from_json.$storageOf($argument0);
    }, $argument0, __gotots_callee_13 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_13($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_jsontext$objectMember$Named_jsontext$objectMember($argument0: RuntimeSlice<objectMember__from_jsontext$Storage>, $argument1: (($0: objectMember__from_jsontext, $1: objectMember__from_jsontext) => int) | undefined): void {
    const __gotots_callee_17 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<objectMember__from_jsontext$Storage>, objectMember__from_jsontext, objectMember__from_jsontext$Storage>(($argument0: RuntimeSlice<objectMember__from_jsontext$Storage>): RuntimeSlice<objectMember__from_jsontext$Storage> => {
        return $argument0;
    }, ($argument0: objectMember__from_jsontext): objectMember__from_jsontext => {
        return objectMember__from_jsontext.$copy($argument0);
    }, ($argument0: objectMember__from_jsontext$Storage): objectMember__from_jsontext => {
        return objectMember__from_jsontext.$fromStorage($argument0);
    }, ($argument0: objectMember__from_jsontext): objectMember__from_jsontext$Storage => {
        return objectMember__from_jsontext.$storageOf($argument0);
    }, $argument0, __gotots_callee_17 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_17($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_ls$DeclarationInfo$Named_ls$DeclarationInfo($argument0: RuntimeSlice<DeclarationInfo__from_ls$Storage>, $argument1: (($0: DeclarationInfo__from_ls, $1: DeclarationInfo__from_ls) => int) | undefined): void {
    const __gotots_callee_20 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<DeclarationInfo__from_ls$Storage>, DeclarationInfo__from_ls, DeclarationInfo__from_ls$Storage>(($argument0: RuntimeSlice<DeclarationInfo__from_ls$Storage>): RuntimeSlice<DeclarationInfo__from_ls$Storage> => {
        return $argument0;
    }, ($argument0: DeclarationInfo__from_ls): DeclarationInfo__from_ls => {
        return DeclarationInfo__from_ls.$copy($argument0);
    }, ($argument0: DeclarationInfo__from_ls$Storage): DeclarationInfo__from_ls => {
        return DeclarationInfo__from_ls.$fromStorage($argument0);
    }, ($argument0: DeclarationInfo__from_ls): DeclarationInfo__from_ls$Storage => {
        return DeclarationInfo__from_ls.$storageOf($argument0);
    }, $argument0, __gotots_callee_20 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_20($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_lsproto$Range$Named_lsproto$Range($argument0: RuntimeSlice<Range__from_lsproto$Storage>, $argument1: (($0: Range__from_lsproto, $1: Range__from_lsproto) => int) | undefined): void {
    const __gotots_callee_25 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<Range__from_lsproto$Storage>, Range__from_lsproto, Range__from_lsproto$Storage>(($argument0: RuntimeSlice<Range__from_lsproto$Storage>): RuntimeSlice<Range__from_lsproto$Storage> => {
        return $argument0;
    }, ($argument0: Range__from_lsproto): Range__from_lsproto => {
        return Range__from_lsproto.$copy($argument0);
    }, ($argument0: Range__from_lsproto$Storage): Range__from_lsproto => {
        return Range__from_lsproto.$fromStorage($argument0);
    }, ($argument0: Range__from_lsproto): Range__from_lsproto$Storage => {
        return Range__from_lsproto.$storageOf($argument0);
    }, $argument0, __gotots_callee_25 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_25($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_modulespecifiers$ModulePath$Named_modulespecifiers$ModulePath($argument0: RuntimeSlice<ModulePath__from_modulespecifiers$Storage>, $argument1: (($0: ModulePath__from_modulespecifiers, $1: ModulePath__from_modulespecifiers) => int) | undefined): void {
    const __gotots_callee_1 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<ModulePath__from_modulespecifiers$Storage>, ModulePath__from_modulespecifiers, ModulePath__from_modulespecifiers$Storage>(($argument0: RuntimeSlice<ModulePath__from_modulespecifiers$Storage>): RuntimeSlice<ModulePath__from_modulespecifiers$Storage> => {
        return $argument0;
    }, ($argument0: ModulePath__from_modulespecifiers): ModulePath__from_modulespecifiers => {
        return ModulePath__from_modulespecifiers.$copy($argument0);
    }, ($argument0: ModulePath__from_modulespecifiers$Storage): ModulePath__from_modulespecifiers => {
        return ModulePath__from_modulespecifiers.$fromStorage($argument0);
    }, ($argument0: ModulePath__from_modulespecifiers): ModulePath__from_modulespecifiers$Storage => {
        return ModulePath__from_modulespecifiers.$storageOf($argument0);
    }, $argument0, __gotots_callee_1 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_1($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_Named_tracing$TraceRecord$Named_tracing$TraceRecord($argument0: RuntimeSlice<TraceRecord__from_tracing$Storage>, $argument1: (($0: TraceRecord__from_tracing, $1: TraceRecord__from_tracing) => int) | undefined): void {
    const __gotots_callee_9 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<TraceRecord__from_tracing$Storage>, TraceRecord__from_tracing, TraceRecord__from_tracing$Storage>(($argument0: RuntimeSlice<TraceRecord__from_tracing$Storage>): RuntimeSlice<TraceRecord__from_tracing$Storage> => {
        return $argument0;
    }, ($argument0: TraceRecord__from_tracing): TraceRecord__from_tracing => {
        return TraceRecord__from_tracing.$copy($argument0);
    }, ($argument0: TraceRecord__from_tracing$Storage): TraceRecord__from_tracing => {
        return TraceRecord__from_tracing.$fromStorage($argument0);
    }, ($argument0: TraceRecord__from_tracing): TraceRecord__from_tracing$Storage => {
        return TraceRecord__from_tracing.$storageOf($argument0);
    }, $argument0, __gotots_callee_9 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_9($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => int) | undefined): void {
    const __gotots_callee_0 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_0 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_0($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): void {
    const __gotots_callee_6 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_6 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_6($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => int) | undefined): void {
    const __gotots_callee_7 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_7 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_7($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_autoimport$Fix$PointerTo_Named_autoimport$Fix($argument0: RuntimeSlice<{
    value: Fix__from_autoimport;
} | undefined>, $argument1: (($0: {
    value: Fix__from_autoimport;
} | undefined, $1: {
    value: Fix__from_autoimport;
} | undefined) => int) | undefined): void {
    const __gotots_callee_14 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<{
        value: Fix__from_autoimport;
    } | undefined>, {
        value: Fix__from_autoimport;
    } | undefined, {
        value: Fix__from_autoimport;
    } | undefined>(($argument0: RuntimeSlice<{
        value: Fix__from_autoimport;
    } | undefined>): RuntimeSlice<{
        value: Fix__from_autoimport;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: Fix__from_autoimport;
    } | undefined): {
        value: Fix__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Fix__from_autoimport;
    } | undefined): {
        value: Fix__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Fix__from_autoimport;
    } | undefined): {
        value: Fix__from_autoimport;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_14 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_14($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_autoimport$FixAndExport$PointerTo_Named_autoimport$FixAndExport($argument0: RuntimeSlice<{
    value: FixAndExport__from_autoimport;
} | undefined>, $argument1: (($0: {
    value: FixAndExport__from_autoimport;
} | undefined, $1: {
    value: FixAndExport__from_autoimport;
} | undefined) => int) | undefined): void {
    const __gotots_callee_10 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<{
        value: FixAndExport__from_autoimport;
    } | undefined>, {
        value: FixAndExport__from_autoimport;
    } | undefined, {
        value: FixAndExport__from_autoimport;
    } | undefined>(($argument0: RuntimeSlice<{
        value: FixAndExport__from_autoimport;
    } | undefined>): RuntimeSlice<{
        value: FixAndExport__from_autoimport;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: FixAndExport__from_autoimport;
    } | undefined): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FixAndExport__from_autoimport;
    } | undefined): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FixAndExport__from_autoimport;
    } | undefined): {
        value: FixAndExport__from_autoimport;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_10 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_10($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_compiler$redirectsFile$PointerTo_Named_compiler$redirectsFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined, $1: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined) => int) | undefined): void {
    const __gotots_callee_15 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined>, tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined, tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_15 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_15($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_json$structField$PointerTo_Named_json$structField($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<structField__from_json> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<structField__from_json> | undefined, $1: tsonicTypeScriptRuntime.Location<structField__from_json> | undefined) => int) | undefined): void {
    const __gotots_callee_5 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<structField__from_json> | undefined>, tsonicTypeScriptRuntime.Location<structField__from_json> | undefined, tsonicTypeScriptRuntime.Location<structField__from_json> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<structField__from_json> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<structField__from_json> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<structField__from_json> | undefined): tsonicTypeScriptRuntime.Location<structField__from_json> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<structField__from_json> | undefined): tsonicTypeScriptRuntime.Location<structField__from_json> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<structField__from_json> | undefined): tsonicTypeScriptRuntime.Location<structField__from_json> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_5 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_5($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_ls$fixInfo$PointerTo_Named_ls$fixInfo($argument0: RuntimeSlice<fixInfo__from_ls | undefined>, $argument1: (($0: fixInfo__from_ls | undefined, $1: fixInfo__from_ls | undefined) => int) | undefined): void {
    const __gotots_callee_18 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<fixInfo__from_ls | undefined>, fixInfo__from_ls | undefined, fixInfo__from_ls | undefined>(($argument0: RuntimeSlice<fixInfo__from_ls | undefined>): RuntimeSlice<fixInfo__from_ls | undefined> => {
        return $argument0;
    }, ($argument0: fixInfo__from_ls | undefined): fixInfo__from_ls | undefined => {
        return $argument0;
    }, ($argument0: fixInfo__from_ls | undefined): fixInfo__from_ls | undefined => {
        return $argument0;
    }, ($argument0: fixInfo__from_ls | undefined): fixInfo__from_ls | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_18 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_18($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_lsproto$CallHierarchyIncomingCall$PointerTo_Named_lsproto$CallHierarchyIncomingCall($argument0: RuntimeSlice<{
    value: CallHierarchyIncomingCall__from_lsproto;
} | undefined>, $argument1: (($0: {
    value: CallHierarchyIncomingCall__from_lsproto;
} | undefined, $1: {
    value: CallHierarchyIncomingCall__from_lsproto;
} | undefined) => int) | undefined): void {
    const __gotots_callee_22 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<{
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined>, {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined, {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined>(($argument0: RuntimeSlice<{
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined>): RuntimeSlice<{
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined): {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined): {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined): {
        value: CallHierarchyIncomingCall__from_lsproto;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_22 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_22($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_lsproto$CallHierarchyOutgoingCall$PointerTo_Named_lsproto$CallHierarchyOutgoingCall($argument0: RuntimeSlice<{
    value: CallHierarchyOutgoingCall__from_lsproto;
} | undefined>, $argument1: (($0: {
    value: CallHierarchyOutgoingCall__from_lsproto;
} | undefined, $1: {
    value: CallHierarchyOutgoingCall__from_lsproto;
} | undefined) => int) | undefined): void {
    const __gotots_callee_24 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<{
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined>, {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined, {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined>(($argument0: RuntimeSlice<{
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined>): RuntimeSlice<{
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined): {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined): {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined): {
        value: CallHierarchyOutgoingCall__from_lsproto;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_24 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_24($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_lsproto$DocumentSymbol$PointerTo_Named_lsproto$DocumentSymbol($argument0: RuntimeSlice<{
    value: DocumentSymbol__from_lsproto;
} | undefined>, $argument1: (($0: {
    value: DocumentSymbol__from_lsproto;
} | undefined, $1: {
    value: DocumentSymbol__from_lsproto;
} | undefined) => int) | undefined): void {
    const __gotots_callee_23 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<{
        value: DocumentSymbol__from_lsproto;
    } | undefined>, {
        value: DocumentSymbol__from_lsproto;
    } | undefined, {
        value: DocumentSymbol__from_lsproto;
    } | undefined>(($argument0: RuntimeSlice<{
        value: DocumentSymbol__from_lsproto;
    } | undefined>): RuntimeSlice<{
        value: DocumentSymbol__from_lsproto;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: DocumentSymbol__from_lsproto;
    } | undefined): {
        value: DocumentSymbol__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: DocumentSymbol__from_lsproto;
    } | undefined): {
        value: DocumentSymbol__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: DocumentSymbol__from_lsproto;
    } | undefined): {
        value: DocumentSymbol__from_lsproto;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_23 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_23($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_lsproto$FoldingRange$PointerTo_Named_lsproto$FoldingRange($argument0: RuntimeSlice<{
    value: FoldingRange__from_lsproto;
} | undefined>, $argument1: (($0: {
    value: FoldingRange__from_lsproto;
} | undefined, $1: {
    value: FoldingRange__from_lsproto;
} | undefined) => int) | undefined): void {
    const __gotots_callee_21 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<{
        value: FoldingRange__from_lsproto;
    } | undefined>, {
        value: FoldingRange__from_lsproto;
    } | undefined, {
        value: FoldingRange__from_lsproto;
    } | undefined>(($argument0: RuntimeSlice<{
        value: FoldingRange__from_lsproto;
    } | undefined>): RuntimeSlice<{
        value: FoldingRange__from_lsproto;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: FoldingRange__from_lsproto;
    } | undefined): {
        value: FoldingRange__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FoldingRange__from_lsproto;
    } | undefined): {
        value: FoldingRange__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: FoldingRange__from_lsproto;
    } | undefined): {
        value: FoldingRange__from_lsproto;
    } | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_21 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_21($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_project$Project$PointerTo_Named_project$Project($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined, $1: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined) => int) | undefined): void {
    const __gotots_callee_11 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_11 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_11($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>, $argument1: (($0: MappedPosition__from_sourcemap | undefined, $1: MappedPosition__from_sourcemap | undefined) => int) | undefined): void {
    const __gotots_callee_16 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<MappedPosition__from_sourcemap | undefined>, MappedPosition__from_sourcemap | undefined, MappedPosition__from_sourcemap | undefined>(($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>): RuntimeSlice<MappedPosition__from_sourcemap | undefined> => {
        return $argument0;
    }, ($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, ($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, ($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_16 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_16($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_PointerTo_Named_tsoptions$CommandLineOption$PointerTo_Named_tsoptions$CommandLineOption($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, $1: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined) => int) | undefined): void {
    const __gotots_callee_4 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_4 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_4($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_SliceOf_PointerTo_Named_ast$Node$SliceOf_PointerTo_Named_ast$Node($argument0: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, $argument1: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => int) | undefined): void {
    const __gotots_callee_19 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(($argument0: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, $argument0, __gotots_callee_19 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_19($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_int$int($argument0: RuntimeSlice<int>, $argument1: (($0: int, $1: int) => int) | undefined): void {
    const __gotots_callee_26 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<int>, int, int>(($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, $argument0, __gotots_callee_26 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_26($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_string$string($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring, $1: gostring) => int) | undefined): void {
    const __gotots_callee_2 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, __gotots_callee_2 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_2($providerArgument0, $providerArgument1)));
    });
}
export function SortFunc$SliceOf_uint32$uint32($argument0: RuntimeSlice<uint32>, $argument1: (($0: uint32, $1: uint32) => int) | undefined): void {
    const __gotots_callee_12 = $argument1;
    return generic_slices_kernel.SlicesSortFuncKernel<RuntimeSlice<uint32>, uint32, uint32>(($argument0: RuntimeSlice<uint32>): RuntimeSlice<uint32> => {
        return $argument0;
    }, ($argument0: uint32): uint32 => {
        return $argument0;
    }, ($argument0: uint32): uint32 => {
        return $argument0;
    }, ($argument0: uint32): uint32 => {
        return $argument0;
    }, $argument0, __gotots_callee_12 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_12($providerArgument0, $providerArgument1)));
    });
}
