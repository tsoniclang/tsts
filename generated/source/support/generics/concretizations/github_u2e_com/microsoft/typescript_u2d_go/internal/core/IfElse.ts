import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierList as ModifierList__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { CheckFlags as CheckFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/checkflags.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { FlowNode as FlowNode__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/flow.js";
import type { NodeId as NodeId__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { Kind as Kind__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/kind_generated.js";
import type { NodeFlags as NodeFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/nodeflags.js";
import type { OperatorPrecedence as OperatorPrecedence__from_ast, TypePrecedence as TypePrecedence__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/precedence.js";
import type { SubtreeFacts as SubtreeFacts__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/subtreefacts.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { SymbolFlags as SymbolFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbolflags.js";
import type { TokenFlags as TokenFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/tokenflags.js";
import type { FindAncestorResult as FindAncestorResult__from_ast, OuterExpressionKinds as OuterExpressionKinds__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/utilities.js";
import type { NodeVisitor as NodeVisitor__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/visitor.js";
import type { CachedTypeKind as CachedTypeKind__from_checker, CheckMode as CheckMode__from_checker, InferenceFlags as InferenceFlags__from_checker, InferencePriority as InferencePriority__from_checker, IntersectionFlags as IntersectionFlags__from_checker, IterationTypesResolver as IterationTypesResolver__from_checker, IterationUse as IterationUse__from_checker, MappedTypeModifiers as MappedTypeModifiers__from_checker, TypeFacts as TypeFacts__from_checker, UnionReduction as UnionReduction__from_checker, UnusedKind as UnusedKind__from_checker, thisAssignmentDeclarationKind as thisAssignmentDeclarationKind__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { TypeMapper as TypeMapper__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/mapper.js";
import type { propertyNameNodeKind as propertyNameNodeKind__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import type { RelationComparisonResult as RelationComparisonResult__from_checker, SignatureCheckMode as SignatureCheckMode__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import type { AccessFlags as AccessFlags__from_checker, ContextFlags as ContextFlags__from_checker, ElementFlags as ElementFlags__from_checker, ExhaustiveState as ExhaustiveState__from_checker, IndexFlags as IndexFlags__from_checker, NodeCheckFlags as NodeCheckFlags__from_checker, ObjectFlags as ObjectFlags__from_checker, SignatureFlags as SignatureFlags__from_checker, SignatureKind as SignatureKind__from_checker, Signature as Signature__from_checker, Ternary as Ternary__from_checker, TypeFlags as TypeFlags__from_checker, TypePredicateKind as TypePredicateKind__from_checker, Type as Type__from_checker, VarianceFlags as VarianceFlags__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type { UTF16Offset as UTF16Offset__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import type { LanguageVariant as LanguageVariant__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/languagevariant.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/tristate.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/diagnostics/diagnostics.js";
import type { Diagnostic as Diagnostic__from_diagnosticwriter, FormattingOptions as FormattingOptions__from_diagnosticwriter } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/diagnosticwriter/diagnosticwriter.js";
import type { updateKind as updateKind__from_build } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/buildtask.js";
import type { upToDateStatusType as upToDateStatusType__from_build } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/build/uptodatestatus.js";
import type { FileEmitKind as FileEmitKind__from_incremental } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/snapshot.js";
import type { ExportSyntax as ExportSyntax__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { newImportBinding as newImportBinding__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { newProgramStructure as newProgramStructure__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { ExportKind as ExportKind__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/importTracker.js";
import type { InsertTextFormat as InsertTextFormat__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Ending as Ending__from___go_module } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
import type { Flags as Flags__from_nodebuilder } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/nodebuilder/types.js";
import type { Parser as Parser__from_parser } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/parser.js";
import type { ParseFlags as ParseFlags__from_parser } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/types.js";
import type { EmitFlags as EmitFlags__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitflags.js";
import type { nameGenerationScope as nameGenerationScope__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/namegenerator.js";
import type { ListFormat as ListFormat__from_printer, commentSeparator as commentSeparator__from_printer, tokenEmitFlags as tokenEmitFlags__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import type { EscapeSequenceScanningFlags as EscapeSequenceScanningFlags__from_scanner } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/scanner/scanner.js";
import type { NameIndex as NameIndex__from_sourcemap, SourceIndex as SourceIndex__from_sourcemap } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/sourcemap/generator.js";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CacheHashKey as CacheHashKey__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import { IfElse$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function IfElse$Named___go_module$Ending($argument0: bool, $argument1: Ending__from___go_module, $argument2: Ending__from___go_module): Ending__from___go_module {
    return IfElse$kernel<Ending__from___go_module>(($argument0: Ending__from___go_module): Ending__from___go_module => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$CheckFlags($argument0: bool, $argument1: CheckFlags__from_ast, $argument2: CheckFlags__from_ast): CheckFlags__from_ast {
    return IfElse$kernel<CheckFlags__from_ast>(($argument0: CheckFlags__from_ast): CheckFlags__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$FindAncestorResult($argument0: bool, $argument1: FindAncestorResult__from_ast, $argument2: FindAncestorResult__from_ast): FindAncestorResult__from_ast {
    return IfElse$kernel<FindAncestorResult__from_ast>(($argument0: FindAncestorResult__from_ast): FindAncestorResult__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$Kind($argument0: bool, $argument1: Kind__from_ast, $argument2: Kind__from_ast): Kind__from_ast {
    return IfElse$kernel<Kind__from_ast>(($argument0: Kind__from_ast): Kind__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$Kind_to_bool($argument0: bool, $argument1: (($0: Kind__from_ast) => bool) | undefined, $argument2: (($0: Kind__from_ast) => bool) | undefined): (($0: Kind__from_ast) => bool) | undefined {
    return IfElse$kernel<(($0: Kind__from_ast) => bool) | undefined>(($argument0: (($0: Kind__from_ast) => bool) | undefined): (($0: Kind__from_ast) => bool) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$NodeFlags($argument0: bool, $argument1: NodeFlags__from_ast, $argument2: NodeFlags__from_ast): NodeFlags__from_ast {
    return IfElse$kernel<NodeFlags__from_ast>(($argument0: NodeFlags__from_ast): NodeFlags__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$OperatorPrecedence($argument0: bool, $argument1: OperatorPrecedence__from_ast, $argument2: OperatorPrecedence__from_ast): OperatorPrecedence__from_ast {
    return IfElse$kernel<OperatorPrecedence__from_ast>(($argument0: OperatorPrecedence__from_ast): OperatorPrecedence__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$OuterExpressionKinds($argument0: bool, $argument1: OuterExpressionKinds__from_ast, $argument2: OuterExpressionKinds__from_ast): OuterExpressionKinds__from_ast {
    return IfElse$kernel<OuterExpressionKinds__from_ast>(($argument0: OuterExpressionKinds__from_ast): OuterExpressionKinds__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$SubtreeFacts($argument0: bool, $argument1: SubtreeFacts__from_ast, $argument2: SubtreeFacts__from_ast): SubtreeFacts__from_ast {
    return IfElse$kernel<SubtreeFacts__from_ast>(($argument0: SubtreeFacts__from_ast): SubtreeFacts__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$SymbolFlags($argument0: bool, $argument1: SymbolFlags__from_ast, $argument2: SymbolFlags__from_ast): SymbolFlags__from_ast {
    return IfElse$kernel<SymbolFlags__from_ast>(($argument0: SymbolFlags__from_ast): SymbolFlags__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$TokenFlags($argument0: bool, $argument1: TokenFlags__from_ast, $argument2: TokenFlags__from_ast): TokenFlags__from_ast {
    return IfElse$kernel<TokenFlags__from_ast>(($argument0: TokenFlags__from_ast): TokenFlags__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ast$TypePrecedence($argument0: bool, $argument1: TypePrecedence__from_ast, $argument2: TypePrecedence__from_ast): TypePrecedence__from_ast {
    return IfElse$kernel<TypePrecedence__from_ast>(($argument0: TypePrecedence__from_ast): TypePrecedence__from_ast => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_autoimport$ExportSyntax($argument0: bool, $argument1: ExportSyntax__from_autoimport, $argument2: ExportSyntax__from_autoimport): ExportSyntax__from_autoimport {
    return IfElse$kernel<ExportSyntax__from_autoimport>(($argument0: ExportSyntax__from_autoimport): ExportSyntax__from_autoimport => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_autoimport$newProgramStructure($argument0: bool, $argument1: newProgramStructure__from_autoimport, $argument2: newProgramStructure__from_autoimport): newProgramStructure__from_autoimport {
    return IfElse$kernel<newProgramStructure__from_autoimport>(($argument0: newProgramStructure__from_autoimport): newProgramStructure__from_autoimport => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_build$upToDateStatusType($argument0: bool, $argument1: upToDateStatusType__from_build, $argument2: upToDateStatusType__from_build): upToDateStatusType__from_build {
    return IfElse$kernel<upToDateStatusType__from_build>(($argument0: upToDateStatusType__from_build): upToDateStatusType__from_build => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_build$updateKind($argument0: bool, $argument1: updateKind__from_build, $argument2: updateKind__from_build): updateKind__from_build {
    return IfElse$kernel<updateKind__from_build>(($argument0: updateKind__from_build): updateKind__from_build => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$AccessFlags($argument0: bool, $argument1: AccessFlags__from_checker, $argument2: AccessFlags__from_checker): AccessFlags__from_checker {
    return IfElse$kernel<AccessFlags__from_checker>(($argument0: AccessFlags__from_checker): AccessFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$CacheHashKey($argument0: bool, $argument1: CacheHashKey__from_checker, $argument2: CacheHashKey__from_checker): CacheHashKey__from_checker {
    return IfElse$kernel<CacheHashKey__from_checker>(($argument0: CacheHashKey__from_checker): CacheHashKey__from_checker => {
        return CacheHashKey__from_checker.$copy($argument0);
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$CachedTypeKind($argument0: bool, $argument1: CachedTypeKind__from_checker, $argument2: CachedTypeKind__from_checker): CachedTypeKind__from_checker {
    return IfElse$kernel<CachedTypeKind__from_checker>(($argument0: CachedTypeKind__from_checker): CachedTypeKind__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$CheckMode($argument0: bool, $argument1: CheckMode__from_checker, $argument2: CheckMode__from_checker): CheckMode__from_checker {
    return IfElse$kernel<CheckMode__from_checker>(($argument0: CheckMode__from_checker): CheckMode__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$ContextFlags($argument0: bool, $argument1: ContextFlags__from_checker, $argument2: ContextFlags__from_checker): ContextFlags__from_checker {
    return IfElse$kernel<ContextFlags__from_checker>(($argument0: ContextFlags__from_checker): ContextFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$ElementFlags($argument0: bool, $argument1: ElementFlags__from_checker, $argument2: ElementFlags__from_checker): ElementFlags__from_checker {
    return IfElse$kernel<ElementFlags__from_checker>(($argument0: ElementFlags__from_checker): ElementFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$ExhaustiveState($argument0: bool, $argument1: ExhaustiveState__from_checker, $argument2: ExhaustiveState__from_checker): ExhaustiveState__from_checker {
    return IfElse$kernel<ExhaustiveState__from_checker>(($argument0: ExhaustiveState__from_checker): ExhaustiveState__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$IndexFlags($argument0: bool, $argument1: IndexFlags__from_checker, $argument2: IndexFlags__from_checker): IndexFlags__from_checker {
    return IfElse$kernel<IndexFlags__from_checker>(($argument0: IndexFlags__from_checker): IndexFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$InferenceFlags($argument0: bool, $argument1: InferenceFlags__from_checker, $argument2: InferenceFlags__from_checker): InferenceFlags__from_checker {
    return IfElse$kernel<InferenceFlags__from_checker>(($argument0: InferenceFlags__from_checker): InferenceFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$InferencePriority($argument0: bool, $argument1: InferencePriority__from_checker, $argument2: InferencePriority__from_checker): InferencePriority__from_checker {
    return IfElse$kernel<InferencePriority__from_checker>(($argument0: InferencePriority__from_checker): InferencePriority__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$IntersectionFlags($argument0: bool, $argument1: IntersectionFlags__from_checker, $argument2: IntersectionFlags__from_checker): IntersectionFlags__from_checker {
    return IfElse$kernel<IntersectionFlags__from_checker>(($argument0: IntersectionFlags__from_checker): IntersectionFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$IterationUse($argument0: bool, $argument1: IterationUse__from_checker, $argument2: IterationUse__from_checker): IterationUse__from_checker {
    return IfElse$kernel<IterationUse__from_checker>(($argument0: IterationUse__from_checker): IterationUse__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$MappedTypeModifiers($argument0: bool, $argument1: MappedTypeModifiers__from_checker, $argument2: MappedTypeModifiers__from_checker): MappedTypeModifiers__from_checker {
    return IfElse$kernel<MappedTypeModifiers__from_checker>(($argument0: MappedTypeModifiers__from_checker): MappedTypeModifiers__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$NodeCheckFlags($argument0: bool, $argument1: NodeCheckFlags__from_checker, $argument2: NodeCheckFlags__from_checker): NodeCheckFlags__from_checker {
    return IfElse$kernel<NodeCheckFlags__from_checker>(($argument0: NodeCheckFlags__from_checker): NodeCheckFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$ObjectFlags($argument0: bool, $argument1: ObjectFlags__from_checker, $argument2: ObjectFlags__from_checker): ObjectFlags__from_checker {
    return IfElse$kernel<ObjectFlags__from_checker>(($argument0: ObjectFlags__from_checker): ObjectFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$RelationComparisonResult($argument0: bool, $argument1: RelationComparisonResult__from_checker, $argument2: RelationComparisonResult__from_checker): RelationComparisonResult__from_checker {
    return IfElse$kernel<RelationComparisonResult__from_checker>(($argument0: RelationComparisonResult__from_checker): RelationComparisonResult__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$SignatureCheckMode($argument0: bool, $argument1: SignatureCheckMode__from_checker, $argument2: SignatureCheckMode__from_checker): SignatureCheckMode__from_checker {
    return IfElse$kernel<SignatureCheckMode__from_checker>(($argument0: SignatureCheckMode__from_checker): SignatureCheckMode__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$SignatureFlags($argument0: bool, $argument1: SignatureFlags__from_checker, $argument2: SignatureFlags__from_checker): SignatureFlags__from_checker {
    return IfElse$kernel<SignatureFlags__from_checker>(($argument0: SignatureFlags__from_checker): SignatureFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$SignatureKind($argument0: bool, $argument1: SignatureKind__from_checker, $argument2: SignatureKind__from_checker): SignatureKind__from_checker {
    return IfElse$kernel<SignatureKind__from_checker>(($argument0: SignatureKind__from_checker): SignatureKind__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$TypeFacts($argument0: bool, $argument1: TypeFacts__from_checker, $argument2: TypeFacts__from_checker): TypeFacts__from_checker {
    return IfElse$kernel<TypeFacts__from_checker>(($argument0: TypeFacts__from_checker): TypeFacts__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$TypeFlags($argument0: bool, $argument1: TypeFlags__from_checker, $argument2: TypeFlags__from_checker): TypeFlags__from_checker {
    return IfElse$kernel<TypeFlags__from_checker>(($argument0: TypeFlags__from_checker): TypeFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$TypePredicateKind($argument0: bool, $argument1: TypePredicateKind__from_checker, $argument2: TypePredicateKind__from_checker): TypePredicateKind__from_checker {
    return IfElse$kernel<TypePredicateKind__from_checker>(($argument0: TypePredicateKind__from_checker): TypePredicateKind__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$UnionReduction($argument0: bool, $argument1: UnionReduction__from_checker, $argument2: UnionReduction__from_checker): UnionReduction__from_checker {
    return IfElse$kernel<UnionReduction__from_checker>(($argument0: UnionReduction__from_checker): UnionReduction__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$UnusedKind($argument0: bool, $argument1: UnusedKind__from_checker, $argument2: UnusedKind__from_checker): UnusedKind__from_checker {
    return IfElse$kernel<UnusedKind__from_checker>(($argument0: UnusedKind__from_checker): UnusedKind__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$VarianceFlags($argument0: bool, $argument1: VarianceFlags__from_checker, $argument2: VarianceFlags__from_checker): VarianceFlags__from_checker {
    return IfElse$kernel<VarianceFlags__from_checker>(($argument0: VarianceFlags__from_checker): VarianceFlags__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$propertyNameNodeKind($argument0: bool, $argument1: propertyNameNodeKind__from_checker, $argument2: propertyNameNodeKind__from_checker): propertyNameNodeKind__from_checker {
    return IfElse$kernel<propertyNameNodeKind__from_checker>(($argument0: propertyNameNodeKind__from_checker): propertyNameNodeKind__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_checker$thisAssignmentDeclarationKind($argument0: bool, $argument1: thisAssignmentDeclarationKind__from_checker, $argument2: thisAssignmentDeclarationKind__from_checker): thisAssignmentDeclarationKind__from_checker {
    return IfElse$kernel<thisAssignmentDeclarationKind__from_checker>(($argument0: thisAssignmentDeclarationKind__from_checker): thisAssignmentDeclarationKind__from_checker => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_core$LanguageVariant($argument0: bool, $argument1: LanguageVariant__from_core, $argument2: LanguageVariant__from_core): LanguageVariant__from_core {
    return IfElse$kernel<LanguageVariant__from_core>(($argument0: LanguageVariant__from_core): LanguageVariant__from_core => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_core$ModuleKind($argument0: bool, $argument1: ModuleKind__from_core, $argument2: ModuleKind__from_core): ModuleKind__from_core {
    return IfElse$kernel<ModuleKind__from_core>(($argument0: ModuleKind__from_core): ModuleKind__from_core => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_core$Tristate($argument0: bool, $argument1: Tristate__from_core, $argument2: Tristate__from_core): Tristate__from_core {
    return IfElse$kernel<Tristate__from_core>(($argument0: Tristate__from_core): Tristate__from_core => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_core$UTF16Offset($argument0: bool, $argument1: UTF16Offset__from_core, $argument2: UTF16Offset__from_core): UTF16Offset__from_core {
    return IfElse$kernel<UTF16Offset__from_core>(($argument0: UTF16Offset__from_core): UTF16Offset__from_core => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_incremental$FileEmitKind($argument0: bool, $argument1: FileEmitKind__from_incremental, $argument2: FileEmitKind__from_incremental): FileEmitKind__from_incremental {
    return IfElse$kernel<FileEmitKind__from_incremental>(($argument0: FileEmitKind__from_incremental): FileEmitKind__from_incremental => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_io$Writer_string_Named_diagnosticwriter$Diagnostic_PointerTo_Named_diagnosticwriter$FormattingOptions_to_void($argument0: bool, $argument1: (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined, $argument2: (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined): (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined {
    return IfElse$kernel<(($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined>(($argument0: (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined): (($0: GoInterface | undefined, $1: gostring, $2: Diagnostic__from_diagnosticwriter | undefined, $3: FormattingOptions__from_diagnosticwriter | undefined) => void) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_ls$ExportKind($argument0: bool, $argument1: ExportKind__from_ls, $argument2: ExportKind__from_ls): ExportKind__from_ls {
    return IfElse$kernel<ExportKind__from_ls>(($argument0: ExportKind__from_ls): ExportKind__from_ls => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_nodebuilder$Flags($argument0: bool, $argument1: Flags__from_nodebuilder, $argument2: Flags__from_nodebuilder): Flags__from_nodebuilder {
    return IfElse$kernel<Flags__from_nodebuilder>(($argument0: Flags__from_nodebuilder): Flags__from_nodebuilder => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_parser$ParseFlags($argument0: bool, $argument1: ParseFlags__from_parser, $argument2: ParseFlags__from_parser): ParseFlags__from_parser {
    return IfElse$kernel<ParseFlags__from_parser>(($argument0: ParseFlags__from_parser): ParseFlags__from_parser => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_printer$EmitFlags($argument0: bool, $argument1: EmitFlags__from_printer, $argument2: EmitFlags__from_printer): EmitFlags__from_printer {
    return IfElse$kernel<EmitFlags__from_printer>(($argument0: EmitFlags__from_printer): EmitFlags__from_printer => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_printer$ListFormat($argument0: bool, $argument1: ListFormat__from_printer, $argument2: ListFormat__from_printer): ListFormat__from_printer {
    return IfElse$kernel<ListFormat__from_printer>(($argument0: ListFormat__from_printer): ListFormat__from_printer => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_printer$commentSeparator($argument0: bool, $argument1: commentSeparator__from_printer, $argument2: commentSeparator__from_printer): commentSeparator__from_printer {
    return IfElse$kernel<commentSeparator__from_printer>(($argument0: commentSeparator__from_printer): commentSeparator__from_printer => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_printer$tokenEmitFlags($argument0: bool, $argument1: tokenEmitFlags__from_printer, $argument2: tokenEmitFlags__from_printer): tokenEmitFlags__from_printer {
    return IfElse$kernel<tokenEmitFlags__from_printer>(($argument0: tokenEmitFlags__from_printer): tokenEmitFlags__from_printer => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_scanner$EscapeSequenceScanningFlags($argument0: bool, $argument1: EscapeSequenceScanningFlags__from_scanner, $argument2: EscapeSequenceScanningFlags__from_scanner): EscapeSequenceScanningFlags__from_scanner {
    return IfElse$kernel<EscapeSequenceScanningFlags__from_scanner>(($argument0: EscapeSequenceScanningFlags__from_scanner): EscapeSequenceScanningFlags__from_scanner => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_sourcemap$NameIndex($argument0: bool, $argument1: NameIndex__from_sourcemap, $argument2: NameIndex__from_sourcemap): NameIndex__from_sourcemap {
    return IfElse$kernel<NameIndex__from_sourcemap>(($argument0: NameIndex__from_sourcemap): NameIndex__from_sourcemap => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$Named_sourcemap$SourceIndex($argument0: bool, $argument1: SourceIndex__from_sourcemap, $argument2: SourceIndex__from_sourcemap): SourceIndex__from_sourcemap {
    return IfElse$kernel<SourceIndex__from_sourcemap>(($argument0: SourceIndex__from_sourcemap): SourceIndex__from_sourcemap => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_MapOf_Named_ast$NodeId_To_string($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<GoMapValue<NodeId__from_ast, gostring>> | undefined, $argument2: tsonicTypeScriptRuntime.Location<GoMapValue<NodeId__from_ast, gostring>> | undefined): tsonicTypeScriptRuntime.Location<GoMapValue<NodeId__from_ast, gostring>> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<GoMapValue<NodeId__from_ast, gostring>> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<GoMapValue<NodeId__from_ast, gostring>> | undefined): tsonicTypeScriptRuntime.Location<GoMapValue<NodeId__from_ast, gostring>> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_ast$FlowNode($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_ast$ModifierList($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_ast$Node($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_ast$NodeList($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_ast$NodeVisitor($argument0: bool, $argument1: {
    value: NodeVisitor__from_ast;
} | undefined, $argument2: {
    value: NodeVisitor__from_ast;
} | undefined): {
    value: NodeVisitor__from_ast;
} | undefined {
    return IfElse$kernel<{
        value: NodeVisitor__from_ast;
    } | undefined>(($argument0: {
        value: NodeVisitor__from_ast;
    } | undefined): {
        value: NodeVisitor__from_ast;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_ast$Symbol($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_autoimport$newImportBinding($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined, $argument2: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_checker$IterationTypesResolver($argument0: bool, $argument1: {
    value: IterationTypesResolver__from_checker;
} | undefined, $argument2: {
    value: IterationTypesResolver__from_checker;
} | undefined): {
    value: IterationTypesResolver__from_checker;
} | undefined {
    return IfElse$kernel<{
        value: IterationTypesResolver__from_checker;
    } | undefined>(($argument0: {
        value: IterationTypesResolver__from_checker;
    } | undefined): {
        value: IterationTypesResolver__from_checker;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_checker$Type($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_checker$TypeMapper($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument2: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_checker$Type_PointerTo_Named_checker$Type_to_Named_checker$Ternary($argument0: bool, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => Ternary__from_checker) | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => Ternary__from_checker) | undefined): (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => Ternary__from_checker) | undefined {
    return IfElse$kernel<(($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => Ternary__from_checker) | undefined>(($argument0: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => Ternary__from_checker) | undefined): (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => Ternary__from_checker) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_collections$SetOf_Named_tspath$Path($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_diagnostics$Message($argument0: bool, $argument1: {
    value: Message__from_diagnostics;
} | undefined, $argument2: {
    value: Message__from_diagnostics;
} | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    return IfElse$kernel<{
        value: Message__from_diagnostics;
    } | undefined>(($argument0: {
        value: Message__from_diagnostics;
    } | undefined): {
        value: Message__from_diagnostics;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void($argument0: bool, $argument1: (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined, $argument2: (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined): (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined {
    return IfElse$kernel<(($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined>(($argument0: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined): (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_lsproto$InsertTextFormat($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<InsertTextFormat__from_lsproto> | undefined, $argument2: tsonicTypeScriptRuntime.Location<InsertTextFormat__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<InsertTextFormat__from_lsproto> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<InsertTextFormat__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<InsertTextFormat__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<InsertTextFormat__from_lsproto> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_parser$Parser_to_PointerTo_Named_ast$Node($argument0: bool, $argument1: (($0: {
    value: Parser__from_parser;
} | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, $argument2: (($0: {
    value: Parser__from_parser;
} | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): (($0: {
    value: Parser__from_parser;
} | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined {
    return IfElse$kernel<(($0: {
        value: Parser__from_parser;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined>(($argument0: (($0: {
        value: Parser__from_parser;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): (($0: {
        value: Parser__from_parser;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_Named_tsoptions$CommandLineOption($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, $argument2: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$PointerTo_PointerTo_Named_printer$nameGenerationScope($argument0: bool, $argument1: tsonicTypeScriptRuntime.Location<nameGenerationScope__from_printer | undefined> | undefined, $argument2: tsonicTypeScriptRuntime.Location<nameGenerationScope__from_printer | undefined> | undefined): tsonicTypeScriptRuntime.Location<nameGenerationScope__from_printer | undefined> | undefined {
    return IfElse$kernel<tsonicTypeScriptRuntime.Location<nameGenerationScope__from_printer | undefined> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<nameGenerationScope__from_printer | undefined> | undefined): tsonicTypeScriptRuntime.Location<nameGenerationScope__from_printer | undefined> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$SliceOf_PointerTo_Named_ast$Diagnostic($argument0: bool, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    return IfElse$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$SliceOf_PointerTo_Named_ast$Node($argument0: bool, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return IfElse$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$SliceOf_PointerTo_Named_ast$Symbol($argument0: bool, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return IfElse$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$SliceOf_PointerTo_Named_autoimport$newImportBinding($argument0: bool, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined> {
    return IfElse$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$SliceOf_PointerTo_Named_checker$Signature($argument0: bool, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    return IfElse$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$SliceOf_PointerTo_Named_checker$Type($argument0: bool, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return IfElse$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$int($argument0: bool, $argument1: int, $argument2: int): int {
    return IfElse$kernel<int>(($argument0: int): int => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$string($argument0: bool, $argument1: gostring, $argument2: gostring): gostring {
    return IfElse$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$string_bool_to_bool($argument0: bool, $argument1: (($0: gostring, $1: bool) => bool) | undefined, $argument2: (($0: gostring, $1: bool) => bool) | undefined): (($0: gostring, $1: bool) => bool) | undefined {
    return IfElse$kernel<(($0: gostring, $1: bool) => bool) | undefined>(($argument0: (($0: gostring, $1: bool) => bool) | undefined): (($0: gostring, $1: bool) => bool) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function IfElse$string_to_Named_core$Tristate($argument0: bool, $argument1: (($0: gostring) => Tristate__from_core) | undefined, $argument2: (($0: gostring) => Tristate__from_core) | undefined): (($0: gostring) => Tristate__from_core) | undefined {
    return IfElse$kernel<(($0: gostring) => Tristate__from_core) | undefined>(($argument0: (($0: gostring) => Tristate__from_core) | undefined): (($0: gostring) => Tristate__from_core) | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
