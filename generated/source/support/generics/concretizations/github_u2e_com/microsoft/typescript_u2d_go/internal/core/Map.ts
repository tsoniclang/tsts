import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FileReference as FileReference__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { InferenceInfo as InferenceInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { sortedSymbolNamePair$Storage as sortedSymbolNamePair__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import type { IndexInfo as IndexInfo__from_checker, Signature as Signature__from_checker, TupleElementInfo$Storage as TupleElementInfo__from_checker$Storage, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { emitter as emitter__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/emitter.js";
import type { EmitResult as EmitResult__from_compiler, Program as Program__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/program.js";
import type { projectReferenceParseTask as projectReferenceParseTask__from_compiler } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/compiler/projectreferenceparser.js";
import type { ProjectReference as ProjectReference__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/projectreference.js";
import type { BuildInfoDiagnostic as BuildInfoDiagnostic__from_incremental, BuildInfoDiagnosticsOfFile as BuildInfoDiagnosticsOfFile__from_incremental, BuildInfoFileInfo as BuildInfoFileInfo__from_incremental, BuildInfoReferenceMapEntry as BuildInfoReferenceMapEntry__from_incremental, BuildInfoRoot as BuildInfoRoot__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/buildInfo.js";
import type { buildInfoDiagnosticWithFileName as buildInfoDiagnosticWithFileName__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { newImportBinding as newImportBinding__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { CompletionItem as CompletionItem__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/completions.js";
import type { ReferenceEntry as ReferenceEntry__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/findallreferences.js";
import type { moduleCompletionNameAndKind$Storage as moduleCompletionNameAndKind__from_ls$Storage, pathCompletion as pathCompletion__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import type { FileSystemWatcher as FileSystemWatcher__from_lsproto, LocationLink as LocationLink__from_lsproto, Location$Storage as Location__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { searchNode$Storage as searchNode__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import type { ReferencedFilePair$Storage as ReferencedFilePair__from_declarations$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/declarations/transform.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type * as time from "@gotots/gostdlib/time.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { sortedSymbolNamePair as sortedSymbolNamePair__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import { TupleElementInfo as TupleElementInfo__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import { Map$kernel as Map$kernel__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { BuildInfoFileId as BuildInfoFileId__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/buildInfo.js";
import { moduleCompletionNameAndKind as moduleCompletionNameAndKind__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import { Location as Location__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { searchNode as searchNode__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import { ReferencedFilePair as ReferencedFilePair__from_declarations } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/declarations/transform.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function Map$Interface_void$Interface_void($argument0: RuntimeSlice<GoInterface | undefined>, $argument1: (($0: GoInterface | undefined) => GoInterface | undefined) | undefined): RuntimeSlice<GoInterface | undefined> {
    return Map$kernel__from_core<GoInterface | undefined, GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<GoInterface | undefined>): int => {
        return $argument0.length;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$Interface_void$string($argument0: RuntimeSlice<GoInterface | undefined>, $argument1: (($0: GoInterface | undefined) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<GoInterface | undefined, gostring>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<GoInterface | undefined>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function Map$Named_incremental$BuildInfoFileId$string($argument0: RuntimeSlice<int>, $argument1: (($0: BuildInfoFileId__from_incremental) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<BuildInfoFileId__from_incremental, gostring>(($argument0: BuildInfoFileId__from_incremental): BuildInfoFileId__from_incremental => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: int): BuildInfoFileId__from_incremental => {
        return new BuildInfoFileId__from_incremental($argument0);
    }, ($argument0: RuntimeSlice<int>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function Map$Named_ls$moduleCompletionNameAndKind$PointerTo_Named_ls$pathCompletion($argument0: RuntimeSlice<moduleCompletionNameAndKind__from_ls$Storage>, $argument1: (($0: moduleCompletionNameAndKind__from_ls) => pathCompletion__from_ls | undefined) | undefined): RuntimeSlice<pathCompletion__from_ls | undefined> {
    return Map$kernel__from_core<moduleCompletionNameAndKind__from_ls, pathCompletion__from_ls | undefined>(($argument0: moduleCompletionNameAndKind__from_ls): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$copy($argument0);
    }, ($argument0: pathCompletion__from_ls | undefined): pathCompletion__from_ls | undefined => {
        return $argument0;
    }, ($argument0: moduleCompletionNameAndKind__from_ls$Storage): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<moduleCompletionNameAndKind__from_ls$Storage>): int => {
        return $argument0.length;
    }, ($argument0: pathCompletion__from_ls | undefined): pathCompletion__from_ls | undefined => {
        return $argument0;
    }, (): pathCompletion__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$Named_tspath$Path$Named_incremental$BuildInfoFileId($argument0: RuntimeSlice<gostring>, $argument1: (($0: Path__from_tspath) => BuildInfoFileId__from_incremental) | undefined): RuntimeSlice<int> {
    return Map$kernel__from_core<Path__from_tspath, BuildInfoFileId__from_incremental>(($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: BuildInfoFileId__from_incremental): BuildInfoFileId__from_incremental => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: BuildInfoFileId__from_incremental): int => {
        return $argument0.$value;
    }, (): BuildInfoFileId__from_incremental => {
        return new BuildInfoFileId__from_incremental(0);
    }, $argument0, $argument1);
}
export function Map$Named_tspath$Path$PointerTo_Named_incremental$BuildInfoDiagnosticsOfFile($argument0: RuntimeSlice<gostring>, $argument1: (($0: Path__from_tspath) => BuildInfoDiagnosticsOfFile__from_incremental | undefined) | undefined): RuntimeSlice<BuildInfoDiagnosticsOfFile__from_incremental | undefined> {
    return Map$kernel__from_core<Path__from_tspath, BuildInfoDiagnosticsOfFile__from_incremental | undefined>(($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: BuildInfoDiagnosticsOfFile__from_incremental | undefined): BuildInfoDiagnosticsOfFile__from_incremental | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: BuildInfoDiagnosticsOfFile__from_incremental | undefined): BuildInfoDiagnosticsOfFile__from_incremental | undefined => {
        return $argument0;
    }, (): BuildInfoDiagnosticsOfFile__from_incremental | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$Named_tspath$Path$PointerTo_Named_incremental$BuildInfoReferenceMapEntry($argument0: RuntimeSlice<gostring>, $argument1: (($0: Path__from_tspath) => {
    value: BuildInfoReferenceMapEntry__from_incremental;
} | undefined) | undefined): RuntimeSlice<{
    value: BuildInfoReferenceMapEntry__from_incremental;
} | undefined> {
    return Map$kernel__from_core<Path__from_tspath, {
        value: BuildInfoReferenceMapEntry__from_incremental;
    } | undefined>(($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: BuildInfoReferenceMapEntry__from_incremental;
    } | undefined): {
        value: BuildInfoReferenceMapEntry__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: BuildInfoReferenceMapEntry__from_incremental;
    } | undefined): {
        value: BuildInfoReferenceMapEntry__from_incremental;
    } | undefined => {
        return $argument0;
    }, (): {
        value: BuildInfoReferenceMapEntry__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Diagnostic$PointerTo_Named_incremental$BuildInfoDiagnostic($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => {
    value: BuildInfoDiagnostic__from_incremental;
} | undefined) | undefined): RuntimeSlice<{
    value: BuildInfoDiagnostic__from_incremental;
} | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return $argument0;
    }, (): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$FileReference$Named_declarations$ReferencedFilePair($argument0: RuntimeSlice<{
    value: FileReference__from_ast;
} | undefined>, $argument1: (($0: {
    value: FileReference__from_ast;
} | undefined) => ReferencedFilePair__from_declarations) | undefined): RuntimeSlice<ReferencedFilePair__from_declarations$Storage> {
    return Map$kernel__from_core<{
        value: FileReference__from_ast;
    } | undefined, ReferencedFilePair__from_declarations>(($argument0: {
        value: FileReference__from_ast;
    } | undefined): {
        value: FileReference__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: ReferencedFilePair__from_declarations): ReferencedFilePair__from_declarations => {
        return ReferencedFilePair__from_declarations.$copy($argument0);
    }, ($argument0: {
        value: FileReference__from_ast;
    } | undefined): {
        value: FileReference__from_ast;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: FileReference__from_ast;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: ReferencedFilePair__from_declarations): ReferencedFilePair__from_declarations$Storage => {
        return ReferencedFilePair__from_declarations.$storageOf($argument0);
    }, (): ReferencedFilePair__from_declarations => {
        return ReferencedFilePair__from_declarations.$zero();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Node$Named_checker$TupleElementInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => TupleElementInfo__from_checker) | undefined): RuntimeSlice<TupleElementInfo__from_checker$Storage> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, TupleElementInfo__from_checker>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker$Storage => {
        return TupleElementInfo__from_checker.$storageOf($argument0);
    }, (): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$zero();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Node$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => ReferenceEntry__from_ls | undefined) | undefined): RuntimeSlice<ReferenceEntry__from_ls | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ReferenceEntry__from_ls | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: ReferenceEntry__from_ls | undefined): ReferenceEntry__from_ls | undefined => {
        return $argument0;
    }, (): ReferenceEntry__from_ls | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Node$string($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, gostring>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$SourceFile$PointerTo_Named_incremental$BuildInfoFileInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined): tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined): tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<BuildInfoFileInfo__from_incremental> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$SourceFile$string($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, gostring>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Symbol$Named_checker$sortedSymbolNamePair($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => sortedSymbolNamePair__from_checker) | undefined): RuntimeSlice<sortedSymbolNamePair__from_checker$Storage> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, sortedSymbolNamePair__from_checker>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: sortedSymbolNamePair__from_checker): sortedSymbolNamePair__from_checker => {
        return sortedSymbolNamePair__from_checker.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: sortedSymbolNamePair__from_checker): sortedSymbolNamePair__from_checker$Storage => {
        return sortedSymbolNamePair__from_checker.$storageOf($argument0);
    }, (): sortedSymbolNamePair__from_checker => {
        return sortedSymbolNamePair__from_checker.$zero();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Symbol$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ast$Symbol$string($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_autoimport$newImportBinding$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$IndexInfo$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$InferenceInfo$PointerTo_Named_checker$InferenceInfo($argument0: RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined>, $argument1: (($0: {
    value: InferenceInfo__from_checker;
} | undefined) => {
    value: InferenceInfo__from_checker;
} | undefined) | undefined): RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined> {
    return Map$kernel__from_core<{
        value: InferenceInfo__from_checker;
    } | undefined, {
        value: InferenceInfo__from_checker;
    } | undefined>(($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: InferenceInfo__from_checker;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, (): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$InferenceInfo$PointerTo_Named_checker$Type($argument0: RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined>, $argument1: (($0: {
    value: InferenceInfo__from_checker;
} | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<{
        value: InferenceInfo__from_checker;
    } | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: InferenceInfo__from_checker;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Signature$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Signature$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$Named_checker$TupleElementInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => TupleElementInfo__from_checker) | undefined): RuntimeSlice<TupleElementInfo__from_checker$Storage> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, TupleElementInfo__from_checker>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: TupleElementInfo__from_checker): TupleElementInfo__from_checker$Storage => {
        return TupleElementInfo__from_checker.$storageOf($argument0);
    }, (): TupleElementInfo__from_checker => {
        return TupleElementInfo__from_checker.$zero();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$PointerTo_Named_checker$InferenceInfo($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => {
    value: InferenceInfo__from_checker;
} | undefined) | undefined): RuntimeSlice<{
    value: InferenceInfo__from_checker;
} | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, {
        value: InferenceInfo__from_checker;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: InferenceInfo__from_checker;
    } | undefined): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return $argument0;
    }, (): {
        value: InferenceInfo__from_checker;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$PointerTo_Named_ls$CompletionItem($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => {
    value: CompletionItem__from_ls;
} | undefined) | undefined): RuntimeSlice<{
    value: CompletionItem__from_ls;
} | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, {
        value: CompletionItem__from_ls;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CompletionItem__from_ls;
    } | undefined): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: CompletionItem__from_ls;
    } | undefined): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return $argument0;
    }, (): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$SliceOf_PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>) | undefined): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$SliceOf_PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>) | undefined): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_checker$Type$bool($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => bool) | undefined): RuntimeSlice<bool> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, bool>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: bool): bool => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: bool): bool => {
        return $argument0;
    }, (): bool => {
        return false;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_compiler$emitter$PointerTo_Named_compiler$EmitResult($argument0: RuntimeSlice<emitter__from_compiler | undefined>, $argument1: (($0: emitter__from_compiler | undefined) => tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined> {
    return Map$kernel__from_core<emitter__from_compiler | undefined, tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined>(($argument0: emitter__from_compiler | undefined): emitter__from_compiler | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined => {
        return $argument0;
    }, ($argument0: emitter__from_compiler | undefined): emitter__from_compiler | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<emitter__from_compiler | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_core$ProjectReference$string($argument0: RuntimeSlice<ProjectReference__from_core | undefined>, $argument1: (($0: ProjectReference__from_core | undefined) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<ProjectReference__from_core | undefined, gostring>(($argument0: ProjectReference__from_core | undefined): ProjectReference__from_core | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: ProjectReference__from_core | undefined): ProjectReference__from_core | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<ProjectReference__from_core | undefined>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_incremental$BuildInfoDiagnostic$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName($argument0: RuntimeSlice<{
    value: BuildInfoDiagnostic__from_incremental;
} | undefined>, $argument1: (($0: {
    value: BuildInfoDiagnostic__from_incremental;
} | undefined) => {
    value: buildInfoDiagnosticWithFileName__from_incremental;
} | undefined) | undefined): RuntimeSlice<{
    value: buildInfoDiagnosticWithFileName__from_incremental;
} | undefined> {
    return Map$kernel__from_core<{
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined, {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined>(($argument0: {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, (): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName$PointerTo_Named_ast$Diagnostic($argument0: RuntimeSlice<{
    value: buildInfoDiagnosticWithFileName__from_incremental;
} | undefined>, $argument1: (($0: {
    value: buildInfoDiagnosticWithFileName__from_incremental;
} | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    return Map$kernel__from_core<{
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(($argument0: {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName$PointerTo_Named_incremental$BuildInfoDiagnostic($argument0: RuntimeSlice<{
    value: buildInfoDiagnosticWithFileName__from_incremental;
} | undefined>, $argument1: (($0: {
    value: buildInfoDiagnosticWithFileName__from_incremental;
} | undefined) => {
    value: BuildInfoDiagnostic__from_incremental;
} | undefined) | undefined): RuntimeSlice<{
    value: BuildInfoDiagnostic__from_incremental;
} | undefined> {
    return Map$kernel__from_core<{
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined, {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined>(($argument0: {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined): {
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName__from_incremental;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return $argument0;
    }, (): {
        value: BuildInfoDiagnostic__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_ls$pathCompletion$PointerTo_Named_ls$CompletionItem($argument0: RuntimeSlice<pathCompletion__from_ls | undefined>, $argument1: (($0: pathCompletion__from_ls | undefined) => {
    value: CompletionItem__from_ls;
} | undefined) | undefined): RuntimeSlice<{
    value: CompletionItem__from_ls;
} | undefined> {
    return Map$kernel__from_core<pathCompletion__from_ls | undefined, {
        value: CompletionItem__from_ls;
    } | undefined>(($argument0: pathCompletion__from_ls | undefined): pathCompletion__from_ls | undefined => {
        return $argument0;
    }, ($argument0: {
        value: CompletionItem__from_ls;
    } | undefined): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return $argument0;
    }, ($argument0: pathCompletion__from_ls | undefined): pathCompletion__from_ls | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<pathCompletion__from_ls | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: CompletionItem__from_ls;
    } | undefined): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return $argument0;
    }, (): {
        value: CompletionItem__from_ls;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_lsproto$LocationLink$Named_lsproto$Location($argument0: RuntimeSlice<{
    value: LocationLink__from_lsproto;
} | undefined>, $argument1: (($0: {
    value: LocationLink__from_lsproto;
} | undefined) => Location__from_lsproto) | undefined): RuntimeSlice<Location__from_lsproto$Storage> {
    return Map$kernel__from_core<{
        value: LocationLink__from_lsproto;
    } | undefined, Location__from_lsproto>(($argument0: {
        value: LocationLink__from_lsproto;
    } | undefined): {
        value: LocationLink__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: Location__from_lsproto): Location__from_lsproto => {
        return Location__from_lsproto.$copy($argument0);
    }, ($argument0: {
        value: LocationLink__from_lsproto;
    } | undefined): {
        value: LocationLink__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: LocationLink__from_lsproto;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: Location__from_lsproto): Location__from_lsproto$Storage => {
        return Location__from_lsproto.$storageOf($argument0);
    }, (): Location__from_lsproto => {
        return Location__from_lsproto.$zero();
    }, $argument0, $argument1);
}
export function Map$PointerTo_Named_project$Project$PointerTo_Named_compiler$Program($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined) => {
    value: Program__from_compiler;
} | undefined) | undefined): RuntimeSlice<{
    value: Program__from_compiler;
} | undefined> {
    return Map$kernel__from_core<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined, {
        value: Program__from_compiler;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Program__from_compiler;
    } | undefined): {
        value: Program__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: Program__from_compiler;
    } | undefined): {
        value: Program__from_compiler;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Program__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$SliceOf_Named_incremental$BuildInfoFileId$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0: RuntimeSlice<RuntimeSlice<int>>, $argument1: (($0: RuntimeSlice<int>) => tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined> {
    return Map$kernel__from_core<RuntimeSlice<int>, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>(($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<RuntimeSlice<int>>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$string$Named_project$searchNode($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => searchNode__from_project) | undefined): RuntimeSlice<searchNode__from_project$Storage> {
    return Map$kernel__from_core<gostring, searchNode__from_project>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: searchNode__from_project): searchNode__from_project => {
        return searchNode__from_project.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: searchNode__from_project): searchNode__from_project$Storage => {
        return searchNode__from_project.$storageOf($argument0);
    }, (): searchNode__from_project => {
        return searchNode__from_project.$zero();
    }, $argument0, $argument1);
}
export function Map$string$Named_time$Time($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => time.Time) | undefined): RuntimeSlice<time.Time> {
    return Map$kernel__from_core<gostring, time.Time>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: time.Time): time.Time => {
        return named_time.TimeOperations.$copy($argument0);
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: time.Time): time.Time => {
        return $argument0;
    }, (): time.Time => {
        return named_time.TimeOperations.$zero();
    }, $argument0, $argument1);
}
export function Map$string$Named_tspath$Path($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => Path__from_tspath) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<gostring, Path__from_tspath>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, (): Path__from_tspath => {
        return new Path__from_tspath("");
    }, $argument0, $argument1);
}
export function Map$string$PointerTo_Named_ast$Node($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Map$kernel__from_core<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$string$PointerTo_Named_checker$Type($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return Map$kernel__from_core<gostring, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$string$PointerTo_Named_compiler$projectReferenceParseTask($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => {
    value: projectReferenceParseTask__from_compiler;
} | undefined) | undefined): RuntimeSlice<{
    value: projectReferenceParseTask__from_compiler;
} | undefined> {
    return Map$kernel__from_core<gostring, {
        value: projectReferenceParseTask__from_compiler;
    } | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: {
        value: projectReferenceParseTask__from_compiler;
    } | undefined): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: projectReferenceParseTask__from_compiler;
    } | undefined): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return $argument0;
    }, (): {
        value: projectReferenceParseTask__from_compiler;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$string$PointerTo_Named_incremental$BuildInfoRoot($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => {
    value: BuildInfoRoot__from_incremental;
} | undefined) | undefined): RuntimeSlice<{
    value: BuildInfoRoot__from_incremental;
} | undefined> {
    return Map$kernel__from_core<gostring, {
        value: BuildInfoRoot__from_incremental;
    } | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: {
        value: BuildInfoRoot__from_incremental;
    } | undefined): {
        value: BuildInfoRoot__from_incremental;
    } | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: {
        value: BuildInfoRoot__from_incremental;
    } | undefined): {
        value: BuildInfoRoot__from_incremental;
    } | undefined => {
        return $argument0;
    }, (): {
        value: BuildInfoRoot__from_incremental;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$string$PointerTo_Named_lsproto$FileSystemWatcher($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined> {
    return Map$kernel__from_core<gostring, tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<FileSystemWatcher__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function Map$string$string($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => gostring) | undefined): RuntimeSlice<gostring> {
    return Map$kernel__from_core<gostring, gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
