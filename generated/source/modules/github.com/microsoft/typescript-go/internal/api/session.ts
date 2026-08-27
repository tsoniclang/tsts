import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompletionItem as CompletionItem__from_ls, CompletionList as CompletionList__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import type { CompletionItemKind as CompletionItemKind__from_lsproto, CompletionItemLabelDetails as CompletionItemLabelDetails__from_lsproto, CompletionItem as CompletionItem__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { FileExtensionInfo$Storage as FileExtensionInfo__from_tsoptions$Storage, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { APIFileChanges, CheckerSignatureParams, CheckerTypeParams, DiagnosticResponse, GetBaseTypeOfLiteralTypeParams, GetCompletionsAtPositionParams, GetContextualTypeParams, GetDefaultProjectForFileParams, GetDiagnosticsParams, GetExportSymbolOfSymbolParams, GetExportsOfSymbolParams, GetIntrinsicTypeParams, GetMembersOfSymbolParams, GetNonNullableTypeParams, GetParameterTypeParams, GetParentOfSymbolParams, GetProjectDiagnosticsParams, GetReferencedSymbolsForNodeParams, GetReferencesToSymbolInFileParams, GetResolvedSignatureParams, GetSignatureUsagesParams, GetSignaturesOfTypeParams, GetSourceFileParams, GetSymbolAtLocationParams, GetSymbolAtPositionParams, GetSymbolOfTypeParams, GetSymbolsAtLocationsParams, GetSymbolsAtPositionsParams, GetTypeAtLocationParams, GetTypeAtLocationsParams, GetTypeAtPositionParams, GetTypeFromTypeNodeParams, GetTypeOfSymbolAtLocationParams, GetTypeOfSymbolParams, GetTypePropertyParams, GetTypesAtPositionsParams, GetTypesOfSymbolsParams, GetWidenedTypeParams, IsArrayLikeTypeParams, IsTypeAssignableToParams, ParseConfigFileParams, PrintNodeParams, ProfileParams, ProjectResponse, ReferencedSymbolEntry$Storage as ReferencedSymbolEntry__from_api$Storage, ReleaseParams, ResolveNameParams, SignatureToSignatureDeclarationParams, SignatureUsageResponse$Storage as SignatureUsageResponse__from_api$Storage, SymbolResponse, TypeID, TypeToTypeNodeParams, UpdateSnapshotParams } from "./proto.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32, uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BuildNodeIndexTable as BuildNodeIndexTable__from_encoder, DecodeNodes as DecodeNodes__from_encoder, EncodeNode as EncodeNode__from_encoder, EncodeSourceFile as EncodeSourceFile__from_encoder, NodeIndexTable as NodeIndexTable__from_encoder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/api/encoder/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/api/state.js";
import { GetSourceFileOfNode as GetSourceFileOfNode__from_ast, Node as Node__from_ast, PositionMap as PositionMap__from_ast, SourceFile as SourceFile__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTouchingPropertyName as GetTouchingPropertyName__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, ConditionalType as ConditionalType__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, IndexInfo as IndexInfo__from_checker, IndexedAccessType as IndexedAccessType__from_checker, InterfaceType as InterfaceType__from_checker, LiteralType as LiteralType__from_checker, Signature as Signature__from_checker, SubstitutionType as SubstitutionType__from_checker, TypeAlias as TypeAlias__from_checker, TypeFlagsFreshable$constant as TypeFlagsFreshable$constant__from_checker, TypePredicate as TypePredicate__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CheckerLifetimeAPI$constant as CheckerLifetimeAPI$constant__from_core, CheckerLifetimeDiagnostics$constant as CheckerLifetimeDiagnostics$constant__from_core, WithCheckerLifetime as WithCheckerLifetime__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { LanguageService as LanguageService__from_ls, NewLanguageService as NewLanguageService__from_ls, ReferenceEntry as ReferenceEntry__from_ls, SignatureUsage as SignatureUsage__from_ls, SymbolAndEntries as SymbolAndEntries__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { CPUProfiler as CPUProfiler__from_pprof, SaveHeapProfile as SaveHeapProfile__from_pprof } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pprof/package.js";
import { NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { FileChangeSummary as FileChangeSummary__from_project, ProjectCollection as ProjectCollection__from_project, Project as Project__from_project, Session as Session__from_project, Snapshot as Snapshot__from_project } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/package.js";
import { NewTsconfigSourceFileFromFilePath as NewTsconfigSourceFileFromFilePath__from_tsoptions, ParseJsonSourceFileConfigFileContent as ParseJsonSourceFileConfigFileContent__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/DiffOrderedMaps.js";
import { Set$Add$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Len$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { DiffMaps$Named_tspath$Path$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/DiffMaps.js";
import { $goInterfaceAdapter$Named_api$DocumentIdentifier, $goInterfaceAdapter$Named_api$NodeHandle, $goInterfaceAdapter$Named_api$RawBinary, $goInterfaceAdapter$Named_api$SignatureID, $goInterfaceAdapter$Named_api$SnapshotID, $goInterfaceAdapter$Named_api$SymbolID, $goInterfaceAdapter$Named_api$TypeID, $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$Named_jsontext$Value, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_api$CheckerSignatureParams, $goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams, $goInterfaceAdapter$PointerTo_Named_api$CompletionInfoResponse, $goInterfaceAdapter$PointerTo_Named_api$ConfigFileResponse, $goInterfaceAdapter$PointerTo_Named_api$DocumentIdentifier, $goInterfaceAdapter$PointerTo_Named_api$GetBaseTypeOfLiteralTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetCompletionsAtPositionParams, $goInterfaceAdapter$PointerTo_Named_api$GetContextualTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetDefaultProjectForFileParams, $goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams, $goInterfaceAdapter$PointerTo_Named_api$GetExportSymbolOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetExportsOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetMembersOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetNonNullableTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetParameterTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetParentOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetProjectDiagnosticsParams, $goInterfaceAdapter$PointerTo_Named_api$GetReferencedSymbolsForNodeParams, $goInterfaceAdapter$PointerTo_Named_api$GetReferencesToSymbolInFileParams, $goInterfaceAdapter$PointerTo_Named_api$GetResolvedSignatureParams, $goInterfaceAdapter$PointerTo_Named_api$GetSignatureUsagesParams, $goInterfaceAdapter$PointerTo_Named_api$GetSignaturesOfTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetSourceFileParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtLocationParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtPositionParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolOfTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtLocationsParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtPositionsParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationsParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtPositionParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeFromTypeNodeParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolAtLocationParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypesAtPositionsParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypesOfSymbolsParams, $goInterfaceAdapter$PointerTo_Named_api$GetWidenedTypeParams, $goInterfaceAdapter$PointerTo_Named_api$InitializeResponse, $goInterfaceAdapter$PointerTo_Named_api$IsArrayLikeTypeParams, $goInterfaceAdapter$PointerTo_Named_api$IsTypeAssignableToParams, $goInterfaceAdapter$PointerTo_Named_api$ParseConfigFileParams, $goInterfaceAdapter$PointerTo_Named_api$PrintNodeParams, $goInterfaceAdapter$PointerTo_Named_api$ProfileParams, $goInterfaceAdapter$PointerTo_Named_api$ProfileResult, $goInterfaceAdapter$PointerTo_Named_api$ProjectResponse, $goInterfaceAdapter$PointerTo_Named_api$ReleaseParams, $goInterfaceAdapter$PointerTo_Named_api$ResolveNameParams, $goInterfaceAdapter$PointerTo_Named_api$SignatureResponse, $goInterfaceAdapter$PointerTo_Named_api$SignatureToSignatureDeclarationParams, $goInterfaceAdapter$PointerTo_Named_api$SourceFileResponse, $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse, $goInterfaceAdapter$PointerTo_Named_api$TypePredicateResponse, $goInterfaceAdapter$PointerTo_Named_api$TypeResponse, $goInterfaceAdapter$PointerTo_Named_api$TypeToTypeNodeParams, $goInterfaceAdapter$PointerTo_Named_api$UpdateSnapshotParams, $goInterfaceAdapter$PointerTo_Named_api$UpdateSnapshotResponse, $goInterfaceAdapter$PointerTo_Named_project$Session, $goInterfaceAdapter$PointerTo_Named_project$Snapshot, $goInterfaceAdapter$SliceOf_Named_api$NodeHandle, $goInterfaceAdapter$SliceOf_Named_api$ReferencedSymbolEntry, $goInterfaceAdapter$SliceOf_Named_api$SignatureUsageResponse, $goInterfaceAdapter$SliceOf_PointerTo_Named_api$DiagnosticResponse, $goInterfaceAdapter$SliceOf_PointerTo_Named_api$IndexInfoResponse, $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SignatureResponse, $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SymbolResponse, $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$uint32, $goInterfaceAdapter$uint64 as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_api$ProjectID_To_PointerTo_Named_api$ProjectFileChanges, $goMap$MapOf_Named_api$SignatureID_To_PointerTo_Named_checker$Signature, $goMap$MapOf_Named_api$SymbolID_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_Named_api$TypeID_To_PointerTo_Named_checker$Type, $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_encoder$NodeIndexTable, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_Named_api$SnapshotID_To_PointerTo_Named_api$snapshotData as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { CompletionEntryLabelDetailsResponse, CompletionEntryResponse, CompletionInfoResponse, ConfigFileResponse, DocumentIdentifier, IndexInfoResponse, InitializeResponse, NewDiagnosticResponses, NewProjectResponse, NewSymbolResponse, NodeHandle, ProfileResult, ProjectFileChanges, ProjectHandle, ProjectID, ReferencedSymbolEntry, SignatureHandle, SignatureID, SignatureResponse, SignatureUsageResponse, SnapshotChanges, SnapshotID, SourceFileResponse, SymbolHandle, SymbolID, TypeHandle, TypePredicateResponse, TypeResponse, UpdateSnapshotResponse, newTypeData, parseProjectHandle, unmarshalPayload } from "./proto.js";
import { RawBinary } from "./protocol_msgpack.js";
import * as base64__from_gostdlib from "@gotots/gostdlib/encoding/base64.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_encoding_base64 from "@gotots/gostdlib/internal/facets/provider-encoding-base64.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class snapshotData {
    declare private readonly $goType: void;
    public constructor(public snapshot: {
        value: Snapshot__from_project;
    } | undefined, public refCount: int, public symbolRegistry: GoMapValue<SymbolID, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public symbolRegistryMu: sync__from_gostdlib.RWMutex, public typeRegistry: GoMapValue<TypeID, tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, public typeRegistryMu: sync__from_gostdlib.RWMutex, public signatureRegistry: GoMapValue<SignatureID, tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, public signatureNextID: uint64, public signatureRegistryMu: sync__from_gostdlib.RWMutex, public nodeTablesByPath: GoMapValue<Path__from_tspath, NodeIndexTable__from_encoder | undefined>, public nodeTablesByPathMu: sync__from_gostdlib.RWMutex) {
    }
    declare private readonly then?: never;
    static $go$private$api$getProgram(sd: snapshotData | undefined, projectHandle: ProjectID): [
        {
            value: Program__from_compiler;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let projectName = parseProjectHandle(projectHandle);
        let proj: {
            value: Project__from_project;
        } | undefined = ProjectCollection__from_project.GetProjectByPath(((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection, projectName);
        if (proj === undefined) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: project %s not found", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_tspath$Path(projectName)])))];
        }
        let program: {
            value: Program__from_compiler;
        } | undefined = Project__from_project.GetProgram(proj);
        if (program === undefined) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: project has no program", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        return [program, void 0];
    }
    static $go$private$api$nodeHandleFrom(sd: snapshotData | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): NodeHandle {
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
        let path = SourceFile__from_ast.Path(sourceFile);
        sync__from_gostdlib.RWMutex.RLock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        let table: NodeIndexTable__from_encoder | undefined = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPath.lookup(path);
        sync__from_gostdlib.RWMutex.RUnlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        if (table === undefined) {
            let newTable: NodeIndexTable__from_encoder | undefined = BuildNodeIndexTable__from_encoder(sourceFile);
            sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
            if ((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPath.lookup(path) === undefined) {
                (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPath.store(path, newTable);
            }
            table = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPath.lookup(path);
            sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        }
        let idx = NodeIndexTable__from_encoder.GetIndex(table, node);
        return new NodeHandle(fmt__from_gostdlib.Sprintf("%d.%d.%s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$uint32(idx), new $goInterfaceAdapter$Named_ast$Kind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), new $goInterfaceAdapter$Named_tspath$Path(path)])));
    }
    static $go$private$api$registerSignature(sd: snapshotData | undefined, sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): {
        value: SignatureResponse;
    } | undefined {
        if (sig === undefined) {
            return void 0;
        }
        sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureRegistryMu);
        const __gotots_store_10 = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_10.signatureNextID = goUint64(__gotots_store_10.signatureNextID + 1n);
        let id = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureNextID;
        let handle = SignatureHandle(id);
        (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureRegistry.store(handle, sig);
        sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureRegistryMu);
        let resp: {
            value: SignatureResponse;
        } | undefined = { value: new SignatureResponse(handle, Signature__from_checker.Flags(sig), new NodeHandle(""), RuntimeSlice.nil<TypeID>(), RuntimeSlice.nil<uint64>(), new SymbolID(0n), new SignatureID(0n)) };
        if (!(Signature__from_checker.Declaration(sig) === undefined)) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declaration = snapshotData.$go$private$api$nodeHandleFrom(sd, Signature__from_checker.Declaration(sig));
        }
        if (Signature__from_checker.TypeParameters(sig).length > 0) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameters = RuntimeSlice.make<TypeID>(Signature__from_checker.TypeParameters(sig).length, null, 0);
            const __gotots_range_23 = Signature__from_checker.TypeParameters(sig);
            for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_23.length; __gotots_range_index_20++) {
                const __gotots_range_value_42 = __gotots_range_index_20;
                const __gotots_range_value_43 = __gotots_range_23.get(__gotots_range_index_20);
                let i = __gotots_range_value_42;
                let tp: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_43;
                (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameters.set(i, TypeHandle(tp));
                sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistryMu);
                (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistry.store((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameters.get(i), tp);
                sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistryMu);
            }
        }
        if (Signature__from_checker.Parameters(sig).length > 0) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Parameters = RuntimeSlice.make<uint64>(Signature__from_checker.Parameters(sig).length, null, ((void SymbolID,
                0n) as bigint));
            const __gotots_range_24 = Signature__from_checker.Parameters(sig);
            for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_24.length; __gotots_range_index_21++) {
                const __gotots_range_value_44 = __gotots_range_index_21;
                const __gotots_range_value_45 = __gotots_range_24.get(__gotots_range_index_21);
                let i = __gotots_range_value_44;
                let param: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_45;
                (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Parameters.set(i, SymbolHandle(param).$value);
                sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
                (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistry.store(new SymbolID((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Parameters.get(i)), param);
                sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
            }
        }
        if (!(Signature__from_checker.ThisParameter(sig) === undefined)) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ThisParameter = SymbolHandle(Signature__from_checker.ThisParameter(sig));
            sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
            (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistry.store((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ThisParameter, Signature__from_checker.ThisParameter(sig));
            sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
        }
        if (!(Signature__from_checker.Target(sig) === undefined)) {
            let targetResp: {
                value: SignatureResponse;
            } | undefined = snapshotData.$go$private$api$registerSignature(sd, Signature__from_checker.Target(sig));
            if (!(targetResp === undefined)) {
                (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target = (targetResp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Id;
            }
        }
        return resp;
    }
    static $go$private$api$registerSymbol(sd: snapshotData | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): {
        value: SymbolResponse;
    } | undefined {
        if (__go_symbol === undefined) {
            return void 0;
        }
        let resp: {
            value: SymbolResponse;
        } | undefined = NewSymbolResponse(__go_symbol);
        const __gotots_range_22 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_22.length; __gotots_range_index_19++) {
            const __gotots_range_value_40 = __gotots_range_index_19;
            const __gotots_range_value_41 = __gotots_range_22.get(__gotots_range_index_19);
            let i = __gotots_range_value_40;
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_41;
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declarations.set(i, snapshotData.$go$private$api$nodeHandleFrom(sd, decl).$value);
        }
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ValueDeclaration = snapshotData.$go$private$api$nodeHandleFrom(sd, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
        }
        sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
        (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistry.store((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Id, __go_symbol);
        sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
        return resp;
    }
    static $go$private$api$registerType(sd: snapshotData | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<TypeResponse> | undefined {
        if (t === undefined) {
            return void 0;
        }
        let resp: tsonicTypeScriptRuntime.Location<TypeResponse> | undefined = newTypeData(t);
        sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistryMu);
        (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistry.store(((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Id, t);
        sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistryMu);
        return resp;
    }
    static $go$private$api$resolveNodeHandle(sd: snapshotData | undefined, program: {
        value: Program__from_compiler;
    } | undefined, handle: NodeHandle): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let s = handle.$value;
        let firstDot = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(s, 46)));
        if (firstDot === -1) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: invalid node handle %q", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$NodeHandle(handle)])))];
        }
        let secondDot = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(goStringSlice(s, firstDot + 1), 46)));
        if (secondDot === -1) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: invalid node handle %q", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$NodeHandle(handle)])))];
        }
        secondDot += firstDot + 1;
        const __gotots_results_221 = strconv__from_gostdlib.ParseUint(goStringSlice(s, 0, firstDot), BigInt.asIntN(64, goNumberToBigInt(10)), BigInt.asIntN(64, goNumberToBigInt(32)));
        const __gotots_results_222 = [__gotots_results_221[0], GoProviderInterfaceBridge.$from(__gotots_results_221[1])] satisfies [
            uint64,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let idx = __gotots_results_222[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_222[1];
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: invalid node handle %q: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$NodeHandle(handle), err])))];
        }
        let path = new Path__from_tspath(goStringSlice(s, secondDot + 1));
        sync__from_gostdlib.RWMutex.RLock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        let table: NodeIndexTable__from_encoder | undefined = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPath.lookup(path);
        sync__from_gostdlib.RWMutex.RUnlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        if (!(table === undefined) && idx < BigInt.asUintN(64, goNumberToBigInt((table ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Nodes.length))) {
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (table ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Nodes.get(idx);
            if (!(node === undefined)) {
                return [node, void 0];
            }
        }
        return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: node handle %q could not be resolved (file may not be loaded)", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$NodeHandle(handle)])))];
    }
    static $go$private$api$resolveSignatureHandle(sd: snapshotData | undefined, handle: SignatureID): [
        tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (handle.$value ===
            ((void SignatureID,
                0n) as bigint)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: empty signature handle", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        sync__from_gostdlib.RWMutex.RLock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureRegistryMu);
        const __gotots_results_229 = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureRegistry.lookupOk(handle);
        let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_229[0];
        let ok = __gotots_results_229[1];
        sync__from_gostdlib.RWMutex.RUnlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).signatureRegistryMu);
        if (!ok) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: signature handle %d not found in snapshot registry", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$SignatureID(handle)])))];
        }
        return [sig, void 0];
    }
    static $go$private$api$resolveSymbolHandle(sd: snapshotData | undefined, handle: SymbolID): [
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (handle.$value ===
            ((void SymbolID,
                0n) as bigint)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: empty symbol handle", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        sync__from_gostdlib.RWMutex.RLock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
        const __gotots_results_223 = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistry.lookupOk(handle);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_223[0];
        let ok = __gotots_results_223[1];
        sync__from_gostdlib.RWMutex.RUnlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolRegistryMu);
        if (!ok) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: symbol handle %d not found in snapshot registry", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$SymbolID(handle)])))];
        }
        return [__go_symbol, void 0];
    }
    static $go$private$api$resolveTypeHandle(sd: snapshotData | undefined, handle: TypeID): [
        tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (handle === 0) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: empty type handle", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        sync__from_gostdlib.RWMutex.RLock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistryMu);
        const __gotots_results_224 = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistry.lookupOk(handle);
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_224[0];
        let ok = __gotots_results_224[1];
        sync__from_gostdlib.RWMutex.RUnlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeRegistryMu);
        if (!ok) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: type handle %d not found in snapshot registry", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$TypeID(handle)])))];
        }
        return [t, void 0];
    }
}
export class Session {
    declare private readonly $goType: void;
    public constructor(public id: gostring, public projectSession: {
        value: Session__from_project;
    } | undefined, public useBinaryResponses: bool, public snapshots: GoMapValue<SnapshotID, snapshotData | undefined>, public snapshotsMu: sync__from_gostdlib.RWMutex, public latestSnapshot: SnapshotID, public cpuProfiler: CPUProfiler__from_pprof) {
    }
    static $copy($source: Session): Session {
        return new Session($source.id, $source.projectSession, $source.useBinaryResponses, $source.snapshots, named_sync.SyncRWMutexOperations.$copy($source.snapshotsMu), $source.latestSnapshot, CPUProfiler__from_pprof.$copy($source.cpuProfiler));
    }
    declare private readonly then?: never;
    static Close(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.RWMutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
                    const __gotots_receiver_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncRWMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_range_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots;
                    const __gotots_range_keys_0 = __gotots_range_0.keys();
                    for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                        const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                        if (!__gotots_range_value_1[1]) {
                            continue;
                        }
                        const __gotots_range_value_2 = __gotots_range_value_0;
                        let handle = __gotots_range_value_2;
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.delete(handle);
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static HandleNotification(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, method: gostring, params: Value__from_jsontext): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return void 0;
    }
    static HandleRequest(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, method: gostring, params: Value__from_jsontext): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        switch (method) {
            case "echo": {
                if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useBinaryResponses) {
                    return [new $goInterfaceAdapter$Named_api$RawBinary(new RawBinary(params.$value)), void 0];
                }
                return [new $goInterfaceAdapter$Named_jsontext$Value(params), void 0];
                break;
            }
            case "ping": {
                return [new $goInterfaceAdapter$string("pong"), void 0];
                break;
            }
        }
        const __gotots_results_0 = unmarshalPayload(method, params);
        let parsed: GoInterface | undefined = __gotots_results_0[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrInvalidRequest, err])))];
        }
        switch (method) {
            case "release": {
                return Session.$go$private$api$handleRelease(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ReleaseParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$ReleaseParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                break;
            }
            case "initialize": {
                const __gotots_results_1 = Session.$go$private$api$handleInitialize(s, ctx);
                return [new $goInterfaceAdapter$PointerTo_Named_api$InitializeResponse(__gotots_results_1[0]), __gotots_results_1[1]];
                break;
            }
            case "updateSnapshot": {
                const __gotots_results_2 = Session.$go$private$api$handleUpdateSnapshot(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<UpdateSnapshotParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$UpdateSnapshotParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$UpdateSnapshotResponse(__gotots_results_2[0]), __gotots_results_2[1]];
                break;
            }
            case "parseConfigFile": {
                const __gotots_results_3 = Session.$go$private$api$handleParseConfigFile(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ParseConfigFileParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$ParseConfigFileParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$ConfigFileResponse(__gotots_results_3[0]), __gotots_results_3[1]];
                break;
            }
            case "getDefaultProjectForFile": {
                const __gotots_results_4 = Session.$go$private$api$handleGetDefaultProjectForFile(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetDefaultProjectForFileParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetDefaultProjectForFileParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$ProjectResponse(__gotots_results_4[0]), __gotots_results_4[1]];
                break;
            }
            case "getSourceFile": {
                return Session.$go$private$api$handleGetSourceFile(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSourceFileParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSourceFileParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                break;
            }
            case "getSymbolAtPosition": {
                const __gotots_results_5 = Session.$go$private$api$handleGetSymbolAtPosition(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtPositionParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_5[0]), __gotots_results_5[1]];
                break;
            }
            case "getSymbolsAtPositions": {
                const __gotots_results_6 = Session.$go$private$api$handleGetSymbolsAtPositions(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtPositionsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SymbolResponse(__gotots_results_6[0]), __gotots_results_6[1]];
                break;
            }
            case "getSymbolAtLocation": {
                const __gotots_results_7 = Session.$go$private$api$handleGetSymbolAtLocation(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSymbolAtLocationParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtLocationParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_7[0]), __gotots_results_7[1]];
                break;
            }
            case "getSymbolsAtLocations": {
                const __gotots_results_8 = Session.$go$private$api$handleGetSymbolsAtLocations(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtLocationsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SymbolResponse(__gotots_results_8[0]), __gotots_results_8[1]];
                break;
            }
            case "getTypeOfSymbol": {
                const __gotots_results_9 = Session.$go$private$api$handleGetTypeOfSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_9[0]), __gotots_results_9[1]];
                break;
            }
            case "getTypesOfSymbols": {
                const __gotots_results_10 = Session.$go$private$api$handleGetTypesOfSymbols(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypesOfSymbolsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_10[0]), __gotots_results_10[1]];
                break;
            }
            case "getDeclaredTypeOfSymbol": {
                const __gotots_results_11 = Session.$go$private$api$handleGetDeclaredTypeOfSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_11[0]), __gotots_results_11[1]];
                break;
            }
            case "resolveName": {
                const __gotots_results_12 = Session.$go$private$api$handleResolveName(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ResolveNameParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$ResolveNameParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_12[0]), __gotots_results_12[1]];
                break;
            }
            case "getParentOfSymbol": {
                const __gotots_results_13 = Session.$go$private$api$handleGetParentOfSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetParentOfSymbolParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetParentOfSymbolParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_13[0]), __gotots_results_13[1]];
                break;
            }
            case "getMembersOfSymbol": {
                const __gotots_results_14 = Session.$go$private$api$handleGetMembersOfSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetMembersOfSymbolParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetMembersOfSymbolParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SymbolResponse(__gotots_results_14[0]), __gotots_results_14[1]];
                break;
            }
            case "getExportsOfSymbol": {
                const __gotots_results_15 = Session.$go$private$api$handleGetExportsOfSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetExportsOfSymbolParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetExportsOfSymbolParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SymbolResponse(__gotots_results_15[0]), __gotots_results_15[1]];
                break;
            }
            case "getExportSymbolOfSymbol": {
                const __gotots_results_16 = Session.$go$private$api$handleGetExportSymbolOfSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetExportSymbolOfSymbolParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetExportSymbolOfSymbolParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_16[0]), __gotots_results_16[1]];
                break;
            }
            case "getSymbolOfType": {
                const __gotots_results_17 = Session.$go$private$api$handleGetSymbolOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSymbolOfTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSymbolOfTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_17[0]), __gotots_results_17[1]];
                break;
            }
            case "getSignaturesOfType": {
                const __gotots_results_18 = Session.$go$private$api$handleGetSignaturesOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSignaturesOfTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SignatureResponse(__gotots_results_18[0]), __gotots_results_18[1]];
                break;
            }
            case "getResolvedSignature": {
                const __gotots_results_19 = Session.$go$private$api$handleGetResolvedSignature(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetResolvedSignatureParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetResolvedSignatureParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SignatureResponse(__gotots_results_19[0]), __gotots_results_19[1]];
                break;
            }
            case "getTypeAtLocation": {
                const __gotots_results_20 = Session.$go$private$api$handleGetTypeAtLocation(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_20[0]), __gotots_results_20[1]];
                break;
            }
            case "getTypeAtLocations": {
                const __gotots_results_21 = Session.$go$private$api$handleGetTypeAtLocations(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_21[0]), __gotots_results_21[1]];
                break;
            }
            case "getTypeAtPosition": {
                const __gotots_results_22 = Session.$go$private$api$handleGetTypeAtPosition(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeAtPositionParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_22[0]), __gotots_results_22[1]];
                break;
            }
            case "getTypesAtPositions": {
                const __gotots_results_23 = Session.$go$private$api$handleGetTypesAtPositions(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypesAtPositionsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_23[0]), __gotots_results_23[1]];
                break;
            }
            case "getTargetOfType": {
                const __gotots_results_24 = Session.$go$private$api$handleGetTargetOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_24[0]), __gotots_results_24[1]];
                break;
            }
            case "getFreshTypeOfType": {
                const __gotots_results_25 = Session.$go$private$api$handleGetFreshTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_25[0]), __gotots_results_25[1]];
                break;
            }
            case "getRegularTypeOfType": {
                const __gotots_results_26 = Session.$go$private$api$handleGetRegularTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_26[0]), __gotots_results_26[1]];
                break;
            }
            case "getTypesOfType": {
                const __gotots_results_27 = Session.$go$private$api$handleGetTypesOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_27[0]), __gotots_results_27[1]];
                break;
            }
            case "getTypeParametersOfType": {
                const __gotots_results_28 = Session.$go$private$api$handleGetTypeParametersOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_28[0]), __gotots_results_28[1]];
                break;
            }
            case "getOuterTypeParametersOfType": {
                const __gotots_results_29 = Session.$go$private$api$handleGetOuterTypeParametersOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_29[0]), __gotots_results_29[1]];
                break;
            }
            case "getLocalTypeParametersOfType": {
                const __gotots_results_30 = Session.$go$private$api$handleGetLocalTypeParametersOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_30[0]), __gotots_results_30[1]];
                break;
            }
            case "getAliasTypeArgumentsOfType": {
                const __gotots_results_31 = Session.$go$private$api$handleGetAliasTypeArgumentsOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_31[0]), __gotots_results_31[1]];
                break;
            }
            case "getAliasSymbolOfType": {
                const __gotots_results_32 = Session.$go$private$api$handleGetAliasSymbolOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_32[0]), __gotots_results_32[1]];
                break;
            }
            case "getObjectTypeOfType": {
                const __gotots_results_33 = Session.$go$private$api$handleGetObjectTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_33[0]), __gotots_results_33[1]];
                break;
            }
            case "getIndexTypeOfType": {
                const __gotots_results_34 = Session.$go$private$api$handleGetIndexTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_34[0]), __gotots_results_34[1]];
                break;
            }
            case "getCheckTypeOfType": {
                const __gotots_results_35 = Session.$go$private$api$handleGetCheckTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_35[0]), __gotots_results_35[1]];
                break;
            }
            case "getExtendsTypeOfType": {
                const __gotots_results_36 = Session.$go$private$api$handleGetExtendsTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_36[0]), __gotots_results_36[1]];
                break;
            }
            case "getBaseTypeOfType": {
                const __gotots_results_37 = Session.$go$private$api$handleGetBaseTypeOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_37[0]), __gotots_results_37[1]];
                break;
            }
            case "getConstraintOfType": {
                const __gotots_results_38 = Session.$go$private$api$handleGetConstraintOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_38[0]), __gotots_results_38[1]];
                break;
            }
            case "getContextualType": {
                const __gotots_results_39 = Session.$go$private$api$handleGetContextualType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetContextualTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetContextualTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_39[0]), __gotots_results_39[1]];
                break;
            }
            case "getBaseTypeOfLiteralType": {
                const __gotots_results_40 = Session.$go$private$api$handleGetBaseTypeOfLiteralType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetBaseTypeOfLiteralTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetBaseTypeOfLiteralTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_40[0]), __gotots_results_40[1]];
                break;
            }
            case "getNonNullableType": {
                const __gotots_results_41 = Session.$go$private$api$handleGetNonNullableType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetNonNullableTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetNonNullableTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_41[0]), __gotots_results_41[1]];
                break;
            }
            case "getTypeFromTypeNode": {
                const __gotots_results_42 = Session.$go$private$api$handleGetTypeFromTypeNode(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeFromTypeNodeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeFromTypeNodeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_42[0]), __gotots_results_42[1]];
                break;
            }
            case "getWidenedType": {
                const __gotots_results_43 = Session.$go$private$api$handleGetWidenedType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetWidenedTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetWidenedTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_43[0]), __gotots_results_43[1]];
                break;
            }
            case "getParameterType": {
                const __gotots_results_44 = Session.$go$private$api$handleGetParameterType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetParameterTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetParameterTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_44[0]), __gotots_results_44[1]];
                break;
            }
            case "isArrayLikeType": {
                const __gotots_results_45 = Session.$go$private$api$handleIsArrayLikeType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<IsArrayLikeTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$IsArrayLikeTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$bool(__gotots_results_45[0]), __gotots_results_45[1]];
                break;
            }
            case "isTypeAssignableTo": {
                const __gotots_results_46 = Session.$go$private$api$handleIsTypeAssignableTo(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$IsTypeAssignableToParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$bool(__gotots_results_46[0]), __gotots_results_46[1]];
                break;
            }
            case "getShorthandAssignmentValueSymbol": {
                const __gotots_results_47 = Session.$go$private$api$handleGetShorthandAssignmentValueSymbol(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$SymbolResponse(__gotots_results_47[0]), __gotots_results_47[1]];
                break;
            }
            case "getTypeOfSymbolAtLocation": {
                const __gotots_results_48 = Session.$go$private$api$handleGetTypeOfSymbolAtLocation(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolAtLocationParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_48[0]), __gotots_results_48[1]];
                break;
            }
            case "typeToTypeNode": {
                return Session.$go$private$api$handleTypeToTypeNode(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$TypeToTypeNodeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                break;
            }
            case "signatureToSignatureDeclaration": {
                return Session.$go$private$api$handleSignatureToSignatureDeclaration(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$SignatureToSignatureDeclarationParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                break;
            }
            case "typeToString": {
                return Session.$go$private$api$handleTypeToString(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$TypeToTypeNodeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                break;
            }
            case "printNode": {
                const __gotots_results_49 = Session.$go$private$api$handlePrintNode(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<PrintNodeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$PrintNodeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$string(__gotots_results_49[0]), __gotots_results_49[1]];
                break;
            }
            case "isContextSensitive": {
                const __gotots_results_50 = Session.$go$private$api$handleIsContextSensitive(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetContextualTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetContextualTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$bool(__gotots_results_50[0]), __gotots_results_50[1]];
                break;
            }
            case "getReturnTypeOfSignature": {
                const __gotots_results_51 = Session.$go$private$api$handleGetReturnTypeOfSignature(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerSignatureParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerSignatureParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_51[0]), __gotots_results_51[1]];
                break;
            }
            case "getRestTypeOfSignature": {
                const __gotots_results_52 = Session.$go$private$api$handleGetRestTypeOfSignature(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerSignatureParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerSignatureParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_52[0]), __gotots_results_52[1]];
                break;
            }
            case "getTypePredicateOfSignature": {
                const __gotots_results_53 = Session.$go$private$api$handleGetTypePredicateOfSignature(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerSignatureParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerSignatureParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypePredicateResponse(__gotots_results_53[0]), __gotots_results_53[1]];
                break;
            }
            case "getBaseTypes": {
                const __gotots_results_54 = Session.$go$private$api$handleGetBaseTypes(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_54[0]), __gotots_results_54[1]];
                break;
            }
            case "getPropertiesOfType": {
                const __gotots_results_55 = Session.$go$private$api$handleGetPropertiesOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$SymbolResponse(__gotots_results_55[0]), __gotots_results_55[1]];
                break;
            }
            case "getIndexInfosOfType": {
                const __gotots_results_56 = Session.$go$private$api$handleGetIndexInfosOfType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$IndexInfoResponse(__gotots_results_56[0]), __gotots_results_56[1]];
                break;
            }
            case "getConstraintOfTypeParameter": {
                const __gotots_results_57 = Session.$go$private$api$handleGetConstraintOfTypeParameter(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_57[0]), __gotots_results_57[1]];
                break;
            }
            case "getTypeArguments": {
                const __gotots_results_58 = Session.$go$private$api$handleGetTypeArguments(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$TypeResponse(__gotots_results_58[0]), __gotots_results_58[1]];
                break;
            }
            case "getAnyType": {
                const __gotots_results_59 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetAnyType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_59[0]), __gotots_results_59[1]];
                break;
            }
            case "getStringType": {
                const __gotots_results_60 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetStringType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_60[0]), __gotots_results_60[1]];
                break;
            }
            case "getNumberType": {
                const __gotots_results_61 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetNumberType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_61[0]), __gotots_results_61[1]];
                break;
            }
            case "getBooleanType": {
                const __gotots_results_62 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetBooleanType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_62[0]), __gotots_results_62[1]];
                break;
            }
            case "getVoidType": {
                const __gotots_results_63 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetVoidType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_63[0]), __gotots_results_63[1]];
                break;
            }
            case "getUndefinedType": {
                const __gotots_results_64 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetUndefinedType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_64[0]), __gotots_results_64[1]];
                break;
            }
            case "getNullType": {
                const __gotots_results_65 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetNullType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_65[0]), __gotots_results_65[1]];
                break;
            }
            case "getNeverType": {
                const __gotots_results_66 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetNeverType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_66[0]), __gotots_results_66[1]];
                break;
            }
            case "getUnknownType": {
                const __gotots_results_67 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetUnknownType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_67[0]), __gotots_results_67[1]];
                break;
            }
            case "getBigIntType": {
                const __gotots_results_68 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetBigIntType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_68[0]), __gotots_results_68[1]];
                break;
            }
            case "getESSymbolType": {
                const __gotots_results_69 = Session.$go$private$api$handleGetIntrinsicType(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed), ($argument0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
                    return Checker__from_checker.GetESSymbolType($argument0);
                });
                return [new $goInterfaceAdapter$PointerTo_Named_api$TypeResponse(__gotots_results_69[0]), __gotots_results_69[1]];
                break;
            }
            case "getSyntacticDiagnostics": {
                const __gotots_results_70 = Session.$go$private$api$handleGetSyntacticDiagnostics(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$DiagnosticResponse(__gotots_results_70[0]), __gotots_results_70[1]];
                break;
            }
            case "getSemanticDiagnostics": {
                const __gotots_results_71 = Session.$go$private$api$handleGetSemanticDiagnostics(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$DiagnosticResponse(__gotots_results_71[0]), __gotots_results_71[1]];
                break;
            }
            case "getSuggestionDiagnostics": {
                const __gotots_results_72 = Session.$go$private$api$handleGetSuggestionDiagnostics(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$DiagnosticResponse(__gotots_results_72[0]), __gotots_results_72[1]];
                break;
            }
            case "getDeclarationDiagnostics": {
                const __gotots_results_73 = Session.$go$private$api$handleGetDeclarationDiagnostics(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$DiagnosticResponse(__gotots_results_73[0]), __gotots_results_73[1]];
                break;
            }
            case "getConfigFileParsingDiagnostics": {
                const __gotots_results_74 = Session.$go$private$api$handleGetConfigFileParsingDiagnostics(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetProjectDiagnosticsParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetProjectDiagnosticsParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_PointerTo_Named_api$DiagnosticResponse(__gotots_results_74[0]), __gotots_results_74[1]];
                break;
            }
            case "startCPUProfile": {
                return Session.$go$private$api$handleStartCPUProfile(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ProfileParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$ProfileParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                break;
            }
            case "stopCPUProfile": {
                const __gotots_results_75 = Session.$go$private$api$handleStopCPUProfile(s, ctx);
                return [new $goInterfaceAdapter$PointerTo_Named_api$ProfileResult(__gotots_results_75[0]), __gotots_results_75[1]];
                break;
            }
            case "saveHeapProfile": {
                const __gotots_results_76 = Session.$go$private$api$handleSaveHeapProfile(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ProfileParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$ProfileParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$ProfileResult(__gotots_results_76[0]), __gotots_results_76[1]];
                break;
            }
            case "getReferencesToSymbolInFile": {
                const __gotots_results_77 = Session.$go$private$api$handleGetReferencesToSymbolInFile(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetReferencesToSymbolInFileParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_Named_api$NodeHandle(__gotots_results_77[0]), __gotots_results_77[1]];
                break;
            }
            case "getReferencedSymbolsForNode": {
                const __gotots_results_78 = Session.$go$private$api$handleGetReferencedSymbolsForNode(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetReferencedSymbolsForNodeParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_Named_api$ReferencedSymbolEntry(__gotots_results_78[0]), __gotots_results_78[1]];
                break;
            }
            case "getSignatureUsages": {
                const __gotots_results_79 = Session.$go$private$api$handleGetSignatureUsages(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetSignatureUsagesParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$SliceOf_Named_api$SignatureUsageResponse(__gotots_results_79[0]), __gotots_results_79[1]];
                break;
            }
            case "getCompletionsAtPosition": {
                const __gotots_results_80 = Session.$go$private$api$handleGetCompletionsAtPosition(s, ctx, (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams> | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_api$GetCompletionsAtPositionParams.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(parsed));
                return [new $goInterfaceAdapter$PointerTo_Named_api$CompletionInfoResponse(__gotots_results_80[0]), __gotots_results_80[1]];
                break;
            }
            default: {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unknown method: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(method)])))];
                break;
            }
        }
    }
    static ID(s: {
        value: Session;
    } | undefined): gostring {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id;
    }
    static $go$private$api$getSnapshotData(s: {
        value: Session;
    } | undefined, handle: SnapshotID): [
        snapshotData | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        sync__from_gostdlib.RWMutex.RLock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        const __gotots_results_217 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.lookupOk(handle);
        let sd: snapshotData | undefined = __gotots_results_217[0];
        let ok = __gotots_results_217[1];
        sync__from_gostdlib.RWMutex.RUnlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        if (!ok) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: snapshot %d not found", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$SnapshotID(handle)])))];
        }
        return [sd, void 0];
    }
    static $go$private$api$handleGetAliasSymbolOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_126 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypePropertyParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_126[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_126[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_127 = snapshotData.$go$private$api$resolveTypeHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypePropertyParams>).value.Type);
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_127[0];
        err = __gotots_results_127[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        if (Type__from_checker.Alias(t) === undefined || TypeAlias__from_checker.Symbol(Type__from_checker.Alias(t)) === undefined) {
            return [void 0, void 0];
        }
        return [snapshotData.$go$private$api$registerSymbol(sd, TypeAlias__from_checker.Symbol(Type__from_checker.Alias(t))), void 0];
    }
    static $go$private$api$handleGetAliasTypeArgumentsOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeArrayProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
            if (Type__from_checker.Alias(t) === undefined) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
            }
            return TypeAlias__from_checker.TypeArguments(Type__from_checker.Alias(t));
        });
    }
    static $go$private$api$handleGetBaseTypeOfLiteralType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetBaseTypeOfLiteralTypeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_130 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetBaseTypeOfLiteralTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetBaseTypeOfLiteralTypeParams>).value.Project);
                    let setup = __gotots_results_130[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_130[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_131 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetBaseTypeOfLiteralTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_131[0];
                    err = __gotots_results_131[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let result: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetBaseTypeOfLiteralType(setup.checker, t);
                    if (result === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, result), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetBaseTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return SubstitutionType__from_checker.BaseType(Type__from_checker.AsSubstitutionType(t));
        });
    }
    static $go$private$api$handleGetBaseTypes(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_176 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Project);
                    let setup = __gotots_results_176[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_176[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_177 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_177[0];
                    err = __gotots_results_177[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    let baseTypes = Checker__from_checker.GetBaseTypes(setup.checker, t);
                    if (baseTypes.length === 0) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
                        break __gotots_return_block_1;
                    }
                    let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(baseTypes.length, null, void 0);
                    const __gotots_range_10 = baseTypes;
                    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_10.length; __gotots_range_index_7++) {
                        const __gotots_range_value_23 = __gotots_range_index_7;
                        const __gotots_range_value_24 = __gotots_range_10.get(__gotots_range_index_7);
                        let i = __gotots_range_value_23;
                        let bt: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_24;
                        results.set(i, snapshotData.$go$private$api$registerType(setup.sd, bt));
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetCheckTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return ConditionalType__from_checker.CheckType(Type__from_checker.AsConditionalType(t));
        });
    }
    static $go$private$api$handleGetCompletionsAtPosition(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams> | undefined): [
        {
            value: CompletionInfoResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_213 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_213[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_213[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_214 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_214[0];
        err = __gotots_results_214[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.File.ToFileName());
        if (sourceFile === undefined) {
            return [void 0, void 0];
        }
        const __gotots_results_215 = Session.$go$private$api$setupLanguageService(s, sd, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.Project, "");
        let langSvc: LanguageService__from_ls | undefined = __gotots_results_215[0];
        err = __gotots_results_215[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let positionMap: {
            value: PositionMap__from_ast;
        } | undefined = SourceFile__from_ast.GetPositionMap(sourceFile);
        let internalPos = PositionMap__from_ast.UTF16ToUTF8(positionMap, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.Position);
        const __gotots_results_216 = LanguageService__from_ls.GetCompletionsAtPosition(langSvc, ctx, sourceFile, internalPos, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.TriggerCharacter, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams>).value.IncludeSymbol);
        let result: CompletionList__from_ls | undefined = __gotots_results_216[0];
        err = __gotots_results_216[1];
        if (!(err === undefined) || result === undefined) {
            return [void 0, err];
        }
        let entries = RuntimeSlice.make<{
            value: CompletionEntryResponse;
        } | undefined>(0, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Items.length, void 0);
        const __gotots_range_18 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Items;
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_18.length; __gotots_range_index_15++) {
            const __gotots_range_value_36 = __gotots_range_18.get(__gotots_range_index_15);
            let item: {
                value: CompletionItem__from_ls;
            } | undefined = __gotots_range_value_36;
            let entry: {
                value: CompletionEntryResponse;
            } | undefined = { value: new CompletionEntryResponse((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Label, 0, (((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.SortText, (((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.InsertText, (((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.FilterText, (((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Detail, void 0, void 0) };
            if (!((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Kind === undefined)) {
                (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind =
                    (((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Kind ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItemKind__from_lsproto>).value;
            }
            if (!((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.LabelDetails === undefined)) {
                (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LabelDetails =
                    { value: new CompletionEntryLabelDetailsResponse(((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.LabelDetails ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Detail, ((((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.LabelDetails ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Description) };
            }
            if (!((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Symbol === undefined)) {
                (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Symbol = snapshotData.$go$private$api$registerSymbol(sd, (item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Symbol);
            }
            entries = entries.append(void 0, [entry]);
        }
        return [
            { value: new CompletionInfoResponse((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).IsIncomplete, entries) }, void 0];
    }
    static $go$private$api$handleGetConfigFileParsingDiagnostics(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetProjectDiagnosticsParams> | undefined): [
        RuntimeSlice<{
            value: DiagnosticResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_199 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetProjectDiagnosticsParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_199[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_199[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_200 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetProjectDiagnosticsParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_200[0];
        err = __gotots_results_200[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        let diags = Program__from_compiler.GetConfigFileParsingDiagnostics(program);
        return [NewDiagnosticResponses(diags), void 0];
    }
    static $go$private$api$handleGetConstraintOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return SubstitutionType__from_checker.SubstConstraint(Type__from_checker.AsSubstitutionType(t));
        });
    }
    static $go$private$api$handleGetConstraintOfTypeParameter(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_182 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Project);
                    let setup = __gotots_results_182[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_182[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_183 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_183[0];
                    err = __gotots_results_183[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let constraint: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetConstraintOfTypeParameter(setup.checker, t);
                    if (constraint === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, constraint), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetContextualType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetContextualTypeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_128 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetContextualTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetContextualTypeParams>).value.Project);
                    let setup = __gotots_results_128[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_128[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_129 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetContextualTypeParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_129[0];
                    err = __gotots_results_129[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(setup.checker, node, ContextFlagsNone$constant__from_checker());
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetDeclarationDiagnostics(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined): [
        RuntimeSlice<{
            value: DiagnosticResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        ctx = WithCheckerLifetime__from_core(ctx, CheckerLifetimeDiagnostics$constant__from_core());
        const __gotots_results_196 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_196[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_196[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_197 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_197[0];
        err = __gotots_results_197[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_198 = Session.$go$private$api$resolveOptionalSourceFile(s, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.File);
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_198[0];
        err = __gotots_results_198[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        let diags = Program__from_compiler.GetDeclarationDiagnostics(program, ctx, sourceFile);
        return [NewDiagnosticResponses(diags), void 0];
    }
    static $go$private$api$handleGetDeclaredTypeOfSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_102 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams>).value.Project);
                    let setup = __gotots_results_102[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_102[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_103 = snapshotData.$go$private$api$resolveSymbolHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams>).value.Symbol);
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_103[0];
                    err = __gotots_results_103[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetDeclaredTypeOfSymbol(setup.checker, __go_symbol);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetDefaultProjectForFile(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetDefaultProjectForFileParams> | undefined): [
        {
            value: ProjectResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_86 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDefaultProjectForFileParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_86[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_86[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let uri = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDefaultProjectForFileParams>).value.File.ToURI();
        let proj: {
            value: Project__from_project;
        } | undefined = Snapshot__from_project.GetDefaultProject((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, uri);
        if (proj === undefined) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: no project found for file %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDefaultProjectForFileParams>).value.File))])))];
        }
        return [NewProjectResponse(proj), void 0];
    }
    static $go$private$api$handleGetExportSymbolOfSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetExportSymbolOfSymbolParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_112 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetExportSymbolOfSymbolParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_112[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_112[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_113 = snapshotData.$go$private$api$resolveSymbolHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetExportSymbolOfSymbolParams>).value.Symbol);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_113[0];
        err = __gotots_results_113[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol === undefined)) {
            return [snapshotData.$go$private$api$registerSymbol(sd, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol), void 0];
        }
        return [snapshotData.$go$private$api$registerSymbol(sd, __go_symbol), void 0];
    }
    static $go$private$api$handleGetExportsOfSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetExportsOfSymbolParams> | undefined): [
        RuntimeSlice<{
            value: SymbolResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_110 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetExportsOfSymbolParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_110[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_110[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: SymbolResponse;
                } | undefined>(), err];
        }
        const __gotots_results_111 = snapshotData.$go$private$api$resolveSymbolHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetExportsOfSymbolParams>).value.Symbol);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_111[0];
        err = __gotots_results_111[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: SymbolResponse;
                } | undefined>(), err];
        }
        if (new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.isNil()) {
            return [RuntimeSlice.nil<{
                    value: SymbolResponse;
                } | undefined>(), void 0];
        }
        let results = RuntimeSlice.make<{
            value: SymbolResponse;
        } | undefined>(0, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.length(), void 0);
        const __gotots_range_6 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
        const __gotots_range_keys_2 = __gotots_range_6.keys();
        for (const __gotots_range_value_14 of __gotots_range_keys_2) {
            const __gotots_range_value_15 = __gotots_range_6.lookupOk(__gotots_range_value_14);
            if (!__gotots_range_value_15[1]) {
                continue;
            }
            const __gotots_range_value_16 = __gotots_range_value_15[0];
            let exp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_16;
            results = results.append(void 0, [snapshotData.$go$private$api$registerSymbol(sd, exp)]);
        }
        return [results, void 0];
    }
    static $go$private$api$handleGetExtendsTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return ConditionalType__from_checker.ExtendsType(Type__from_checker.AsConditionalType(t));
        });
    }
    static $go$private$api$handleGetFreshTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            if ((Type__from_checker.Flags(t) & TypeFlagsFreshable$constant__from_checker()) >>> 0 === 0) {
                return void 0;
            }
            return LiteralType__from_checker.FreshType(Type__from_checker.AsLiteralType(t));
        });
    }
    static $go$private$api$handleGetIndexInfosOfType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined): [
        RuntimeSlice<{
            value: IndexInfoResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<{
                value: IndexInfoResponse;
            } | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<{
                value: IndexInfoResponse;
            } | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_180 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Project);
                    let setup = __gotots_results_180[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_180[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: IndexInfoResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_181 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_181[0];
                    err = __gotots_results_181[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: IndexInfoResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    let infos = Checker__from_checker.GetIndexInfosOfType(setup.checker, t);
                    if (infos.length === 0) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: IndexInfoResponse;
                            } | undefined>(), void 0];
                        break __gotots_return_block_1;
                    }
                    let results = RuntimeSlice.make<{
                        value: IndexInfoResponse;
                    } | undefined>(infos.length, null, void 0);
                    const __gotots_range_12 = infos;
                    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_12.length; __gotots_range_index_9++) {
                        const __gotots_range_value_27 = __gotots_range_index_9;
                        const __gotots_range_value_28 = __gotots_range_12.get(__gotots_range_index_9);
                        let i = __gotots_range_value_27;
                        let info: tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined = __gotots_range_value_28;
                        results.set(i, { value: new IndexInfoResponse(TypeResponse.$copy(TypeResponse.$copy(((snapshotData.$go$private$api$registerType(setup.sd, IndexInfo__from_checker.KeyType(info)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value)), TypeResponse.$copy(TypeResponse.$copy(((snapshotData.$go$private$api$registerType(setup.sd, IndexInfo__from_checker.ValueType(info)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value)), IndexInfo__from_checker.IsReadonly(info), new NodeHandle("")) });
                        if (!(IndexInfo__from_checker.Declaration(info) === undefined)) {
                            (results.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declaration = snapshotData.$go$private$api$nodeHandleFrom(setup.sd, IndexInfo__from_checker.Declaration(info));
                        }
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetIndexTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return IndexedAccessType__from_checker.IndexType(Type__from_checker.AsIndexedAccessType(t));
        });
    }
    static $go$private$api$handleGetIntrinsicType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams> | undefined, getter: (($0: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_186 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams>).value.Project);
                    let setup = __gotots_results_186[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_186[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_callee_1 = getter;
                    const __gotots_argument_1 = setup.checker;
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetLocalTypeParametersOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeArrayProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
            return InterfaceType__from_checker.LocalTypeParameters(Type__from_checker.AsInterfaceType(t));
        });
    }
    static $go$private$api$handleGetMembersOfSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetMembersOfSymbolParams> | undefined): [
        RuntimeSlice<{
            value: SymbolResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_108 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetMembersOfSymbolParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_108[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_108[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: SymbolResponse;
                } | undefined>(), err];
        }
        const __gotots_results_109 = snapshotData.$go$private$api$resolveSymbolHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetMembersOfSymbolParams>).value.Symbol);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_109[0];
        err = __gotots_results_109[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: SymbolResponse;
                } | undefined>(), err];
        }
        if (new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.isNil()) {
            return [RuntimeSlice.nil<{
                    value: SymbolResponse;
                } | undefined>(), void 0];
        }
        let results = RuntimeSlice.make<{
            value: SymbolResponse;
        } | undefined>(0, new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.length(), void 0);
        const __gotots_range_5 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value;
        const __gotots_range_keys_1 = __gotots_range_5.keys();
        for (const __gotots_range_value_11 of __gotots_range_keys_1) {
            const __gotots_range_value_12 = __gotots_range_5.lookupOk(__gotots_range_value_11);
            if (!__gotots_range_value_12[1]) {
                continue;
            }
            const __gotots_range_value_13 = __gotots_range_value_12[0];
            let member: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_13;
            results = results.append(void 0, [snapshotData.$go$private$api$registerSymbol(sd, member)]);
        }
        return [results, void 0];
    }
    static $go$private$api$handleGetNonNullableType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetNonNullableTypeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_132 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetNonNullableTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetNonNullableTypeParams>).value.Project);
                    let setup = __gotots_results_132[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_132[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_133 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetNonNullableTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_133[0];
                    err = __gotots_results_133[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let result: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetNonNullableType(setup.checker, t);
                    if (result === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, result), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetObjectTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return IndexedAccessType__from_checker.ObjectType(Type__from_checker.AsIndexedAccessType(t));
        });
    }
    static $go$private$api$handleGetOuterTypeParametersOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeArrayProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
            return InterfaceType__from_checker.OuterTypeParameters(Type__from_checker.AsInterfaceType(t));
        });
    }
    static $go$private$api$handleGetParameterType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetParameterTypeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_138 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParameterTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParameterTypeParams>).value.Project);
                    let setup = __gotots_results_138[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_138[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_139 = snapshotData.$go$private$api$resolveSignatureHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParameterTypeParams>).value.Signature);
                    let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_139[0];
                    err = __gotots_results_139[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParameterTypeParams>).value.Index < 0) {
                        __gotots_return_0 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: invalid parameter index", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtPosition(setup.checker, sig, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParameterTypeParams>).value.Index);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetParentOfSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetParentOfSymbolParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_106 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParentOfSymbolParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_106[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_106[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_107 = snapshotData.$go$private$api$resolveSymbolHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetParentOfSymbolParams>).value.Symbol);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_107[0];
        err = __gotots_results_107[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent;
        if (parent === undefined) {
            return [void 0, void 0];
        }
        return [snapshotData.$go$private$api$registerSymbol(sd, parent), void 0];
    }
    static $go$private$api$handleGetPropertiesOfType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined): [
        RuntimeSlice<{
            value: SymbolResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<{
                value: SymbolResponse;
            } | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<{
                value: SymbolResponse;
            } | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_178 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Project);
                    let setup = __gotots_results_178[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_178[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SymbolResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_179 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_179[0];
                    err = __gotots_results_179[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SymbolResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    let props = Checker__from_checker.GetPropertiesOfType(setup.checker, t);
                    if (props.length === 0) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SymbolResponse;
                            } | undefined>(), void 0];
                        break __gotots_return_block_1;
                    }
                    let results = RuntimeSlice.make<{
                        value: SymbolResponse;
                    } | undefined>(props.length, null, void 0);
                    const __gotots_range_11 = props;
                    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_11.length; __gotots_range_index_8++) {
                        const __gotots_range_value_25 = __gotots_range_index_8;
                        const __gotots_range_value_26 = __gotots_range_11.get(__gotots_range_index_8);
                        let i = __gotots_range_value_25;
                        let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_26;
                        results.set(i, snapshotData.$go$private$api$registerSymbol(setup.sd, prop));
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetReferencedSymbolsForNode(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams> | undefined): [
        RuntimeSlice<ReferencedSymbolEntry__from_api$Storage>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_205 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_205[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_205[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>(), err];
        }
        const __gotots_results_206 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_206[0];
        err = __gotots_results_206[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>(), err];
        }
        const __gotots_results_207 = snapshotData.$go$private$api$resolveNodeHandle(sd, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams>).value.Node);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_207[0];
        err = __gotots_results_207[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>(), err];
        }
        if (node === undefined) {
            return [RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>(), void 0];
        }
        const __gotots_results_208 = Session.$go$private$api$setupLanguageService(s, sd, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams>).value.Project, "");
        let langSvc: LanguageService__from_ls | undefined = __gotots_results_208[0];
        err = __gotots_results_208[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>(), err];
        }
        let sourceFiles = Program__from_compiler.GetSourceFiles(program);
        let entries = LanguageService__from_ls.GetReferencedSymbolsForNode(langSvc, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams>).value.Position, node, sourceFiles);
        if (entries.isNil()) {
            return [RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>(), void 0];
        }
        let result = RuntimeSlice.nil<ReferencedSymbolEntry__from_api$Storage>();
        const __gotots_range_15 = entries;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_15.length; __gotots_range_index_12++) {
            const __gotots_range_value_33 = __gotots_range_15.get(__gotots_range_index_12);
            let entry: SymbolAndEntries__from_ls | undefined = __gotots_range_value_33;
            let defNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SymbolAndEntries__from_ls.DefinitionNode(entry);
            if (defNode === undefined) {
                continue;
            }
            let refs = RuntimeSlice.nil<gostring>();
            const __gotots_range_16 = SymbolAndEntries__from_ls.References(entry);
            for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_16.length; __gotots_range_index_13++) {
                const __gotots_range_value_34 = __gotots_range_16.get(__gotots_range_index_13);
                let ref: ReferenceEntry__from_ls | undefined = __gotots_range_value_34;
                if (ReferenceEntry__from_ls.IsNodeEntry(ref)) {
                    refs = refs.append(((void NodeHandle,
                        "") as string), [snapshotData.$go$private$api$nodeHandleFrom(sd, ReferenceEntry__from_ls.Node(ref)).$value]);
                }
            }
            let re = ReferencedSymbolEntry.$fromStorage({
                Definition: snapshotData.$go$private$api$nodeHandleFrom(sd, defNode).$value,
                References: refs,
                Symbol: void 0
            });
            {
                let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = SymbolAndEntries__from_ls.DefinitionSymbol(entry);
                if (!(sym === undefined)) {
                    ReferencedSymbolEntry.$storageOf(re).Symbol = snapshotData.$go$private$api$registerSymbol(sd, sym);
                }
            }
            const __gotots_slice_build_0 = result;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, ReferencedSymbolEntry.$storageOf(ReferencedSymbolEntry.$copy(re)));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<ReferencedSymbolEntry__from_api$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, ReferencedSymbolEntry.$storageOf(ReferencedSymbolEntry.$copy(ReferencedSymbolEntry.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, ReferencedSymbolEntry.$storageOf(ReferencedSymbolEntry.$copy(re)));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, ReferencedSymbolEntry.$storageOf(ReferencedSymbolEntry.$zero()));
                }
            }
            result = __gotots_slice_build_1;
        }
        return [result, void 0];
    }
    static $go$private$api$handleGetReferencesToSymbolInFile(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams> | undefined): [
        RuntimeSlice<gostring>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<gostring>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<gostring>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_203 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams>).value.Project);
                    let setup = __gotots_results_203[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_203[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<gostring>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_1: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_204 = snapshotData.$go$private$api$resolveSymbolHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams>).value.Symbol);
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_204[0];
                    err = __gotots_results_204[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<gostring>(), err];
                        break __gotots_return_block_1;
                    }
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [RuntimeSlice.nil<gostring>(), void 0];
                        break __gotots_return_block_1;
                    }
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams>).value.File.ToFileName());
                    if (sourceFile === undefined) {
                        __gotots_return_0 = [RuntimeSlice.nil<gostring>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams>).value.File))])))];
                        break __gotots_return_block_1;
                    }
                    let nodes = Checker__from_checker.GetReferencesToSymbolInFile(setup.checker, sourceFile, __go_symbol);
                    let result = RuntimeSlice.make<gostring>(nodes.length, null, ((void NodeHandle,
                        "") as string));
                    const __gotots_range_14 = nodes;
                    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_14.length; __gotots_range_index_11++) {
                        const __gotots_range_value_31 = __gotots_range_index_11;
                        const __gotots_range_value_32 = __gotots_range_14.get(__gotots_range_index_11);
                        let i = __gotots_range_value_31;
                        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_32;
                        result.set(i, snapshotData.$go$private$api$nodeHandleFrom(setup.sd, node).$value);
                    }
                    __gotots_return_0 = [result, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetRegularTypeOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            if ((Type__from_checker.Flags(t) & TypeFlagsFreshable$constant__from_checker()) >>> 0 === 0) {
                return void 0;
            }
            return LiteralType__from_checker.RegularType(Type__from_checker.AsLiteralType(t));
        });
    }
    static $go$private$api$handleGetResolvedSignature(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetResolvedSignatureParams> | undefined): [
        {
            value: SignatureResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SignatureResponse;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_118 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetResolvedSignatureParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetResolvedSignatureParams>).value.Project);
                    let setup = __gotots_results_118[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_118[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_119 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetResolvedSignatureParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_119[0];
                    err = __gotots_results_119[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetResolvedSignature(setup.checker, node);
                    __gotots_return_0 = [snapshotData.$go$private$api$registerSignature(setup.sd, sig), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetRestTypeOfSignature(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerSignatureParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_172 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Project);
                    let setup = __gotots_results_172[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_172[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_173 = snapshotData.$go$private$api$resolveSignatureHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Signature);
                    let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_173[0];
                    err = __gotots_results_173[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetRestTypeOfSignature(setup.checker, sig);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetReturnTypeOfSignature(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerSignatureParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_170 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Project);
                    let setup = __gotots_results_170[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_170[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_171 = snapshotData.$go$private$api$resolveSignatureHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Signature);
                    let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_171[0];
                    err = __gotots_results_171[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetReturnTypeOfSignature(setup.checker, sig);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSemanticDiagnostics(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined): [
        RuntimeSlice<{
            value: DiagnosticResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        ctx = WithCheckerLifetime__from_core(ctx, CheckerLifetimeDiagnostics$constant__from_core());
        const __gotots_results_190 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_190[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_190[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_191 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_191[0];
        err = __gotots_results_191[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_192 = Session.$go$private$api$resolveOptionalSourceFile(s, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.File);
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_192[0];
        err = __gotots_results_192[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        let diags = Program__from_compiler.GetSemanticDiagnostics(program, ctx, sourceFile);
        return [NewDiagnosticResponses(diags), void 0];
    }
    static $go$private$api$handleGetShorthandAssignmentValueSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SymbolResponse;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_145 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams>).value.Project);
                    let setup = __gotots_results_145[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_145[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_146 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_146[0];
                    err = __gotots_results_146[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetShorthandAssignmentValueSymbol(setup.checker, node);
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerSymbol(setup.sd, __go_symbol), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSignatureUsages(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams> | undefined): [
        RuntimeSlice<SignatureUsageResponse__from_api$Storage>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_209 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_209[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_209[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<SignatureUsageResponse__from_api$Storage>(), err];
        }
        const __gotots_results_210 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_210[0];
        err = __gotots_results_210[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<SignatureUsageResponse__from_api$Storage>(), err];
        }
        const __gotots_results_211 = snapshotData.$go$private$api$resolveNodeHandle(sd, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams>).value.SignatureDecl);
        let signatureDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_211[0];
        err = __gotots_results_211[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<SignatureUsageResponse__from_api$Storage>(), err];
        }
        if (signatureDecl === undefined) {
            return [RuntimeSlice.nil<SignatureUsageResponse__from_api$Storage>(), void 0];
        }
        const __gotots_results_212 = Session.$go$private$api$setupLanguageService(s, sd, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams>).value.Project, "");
        let langSvc: LanguageService__from_ls | undefined = __gotots_results_212[0];
        err = __gotots_results_212[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<SignatureUsageResponse__from_api$Storage>(), err];
        }
        let usages = LanguageService__from_ls.GetSignatureUsages(langSvc, ctx, signatureDecl);
        if (usages.isNil()) {
            return [RuntimeSlice.nil<SignatureUsageResponse__from_api$Storage>(), void 0];
        }
        const __gotots_slice_build_4 = goSliceAllocate<SignatureUsageResponse__from_api$Storage>(0, usages.length);
        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
            __gotots_slice_build_4.$initialize(__gotots_slice_build_5, SignatureUsageResponse.$storageOf(SignatureUsageResponse.$zero()));
        }
        let result = __gotots_slice_build_4;
        const __gotots_range_17 = usages;
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_17.length; __gotots_range_index_14++) {
            const __gotots_range_value_35 = SignatureUsage__from_ls.$copy(SignatureUsage__from_ls.$fromStorage(__gotots_range_17.get(__gotots_range_index_14)));
            let u = __gotots_range_value_35;
            let entry = SignatureUsageResponse.$fromStorage({
                Name: snapshotData.$go$private$api$nodeHandleFrom(sd, SignatureUsage__from_ls.$storageOf(u).Name).$value,
                Call: ((void NodeHandle,
                    "") as string)
            });
            if (!(SignatureUsage__from_ls.$storageOf(u).Call === undefined)) {
                SignatureUsageResponse.$storageOf(entry).Call = snapshotData.$go$private$api$nodeHandleFrom(sd, SignatureUsage__from_ls.$storageOf(u).Call).$value;
            }
            const __gotots_slice_build_6 = result;
            const __gotots_slice_build_8 = __gotots_slice_build_6.length + 1;
            let __gotots_slice_build_7 = __gotots_slice_build_6;
            if (__gotots_slice_build_8 <= __gotots_slice_build_6.capacity) {
                __gotots_slice_build_7 = __gotots_slice_build_6.$withLength(__gotots_slice_build_8);
                __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, SignatureUsageResponse.$storageOf(SignatureUsageResponse.$copy(entry)));
            }
            else {
                __gotots_slice_build_7 = goSliceAllocate<SignatureUsageResponse__from_api$Storage>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_8));
                for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
                    __gotots_slice_build_7.set(__gotots_slice_build_9, SignatureUsageResponse.$storageOf(SignatureUsageResponse.$copy(SignatureUsageResponse.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_9)))));
                }
                __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, SignatureUsageResponse.$storageOf(SignatureUsageResponse.$copy(entry)));
                for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
                    __gotots_slice_build_7.$initialize(__gotots_slice_build_9, SignatureUsageResponse.$storageOf(SignatureUsageResponse.$zero()));
                }
            }
            result = __gotots_slice_build_7;
        }
        return [result, void 0];
    }
    static $go$private$api$handleGetSignaturesOfType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams> | undefined): [
        RuntimeSlice<{
            value: SignatureResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<{
                value: SignatureResponse;
            } | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<{
                value: SignatureResponse;
            } | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_116 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams>).value.Project);
                    let setup = __gotots_results_116[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_116[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SignatureResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_117 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_117[0];
                    err = __gotots_results_117[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SignatureResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    let sigs = Checker__from_checker.GetSignaturesOfType(setup.checker, t, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams>).value.Kind);
                    let results = RuntimeSlice.make<{
                        value: SignatureResponse;
                    } | undefined>(sigs.length, null, void 0);
                    const __gotots_range_7 = sigs;
                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length; __gotots_range_index_4++) {
                        const __gotots_range_value_17 = __gotots_range_index_4;
                        const __gotots_range_value_18 = __gotots_range_7.get(__gotots_range_index_4);
                        let i = __gotots_range_value_17;
                        let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_range_value_18;
                        results.set(i, snapshotData.$go$private$api$registerSignature(setup.sd, sig));
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSourceFile(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSourceFileParams> | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_87 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSourceFileParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_87[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_87[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_88 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSourceFileParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_88[0];
        err = __gotots_results_88[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSourceFileParams>).value.File.ToFileName());
        if (sourceFile === undefined) {
            if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useBinaryResponses) {
                return [new $goInterfaceAdapter$Named_api$RawBinary(new RawBinary(RuntimeSlice.nil<uint8>())), void 0];
            }
            return [void 0, void 0];
        }
        const __gotots_results_89 = EncodeSourceFile__from_encoder(sourceFile);
        let data = __gotots_results_89[0];
        let nodeTable: NodeIndexTable__from_encoder | undefined = __gotots_results_89[1];
        err = __gotots_results_89[2];
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to encode source file: %w", RuntimeSlice.literal<GoInterface | undefined>([err])))];
        }
        sync__from_gostdlib.RWMutex.Lock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPath.store(SourceFile__from_ast.Path(sourceFile), nodeTable);
        sync__from_gostdlib.RWMutex.Unlock((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeTablesByPathMu);
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useBinaryResponses) {
            return [new $goInterfaceAdapter$Named_api$RawBinary(new RawBinary(data)), void 0];
        }
        const __gotots_conversion_0 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_3 = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_0, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
        const __gotots_field_1 = base64__from_gostdlib.Encoding.EncodeToString(__gotots_receiver_3 === void 0 ? void 0 :
            (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, data);
        const __gotots_results_90 = new $goInterfaceAdapter$PointerTo_Named_api$SourceFileResponse({ value: new SourceFileResponse(__gotots_field_1) });
        const __gotots_results_91 = void 0;
        return [__gotots_results_90, __gotots_results_91];
    }
    static $go$private$api$handleGetSuggestionDiagnostics(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined): [
        RuntimeSlice<{
            value: DiagnosticResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        ctx = WithCheckerLifetime__from_core(ctx, CheckerLifetimeDiagnostics$constant__from_core());
        const __gotots_results_193 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_193[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_193[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_194 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_194[0];
        err = __gotots_results_194[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_195 = Session.$go$private$api$resolveOptionalSourceFile(s, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.File);
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_195[0];
        err = __gotots_results_195[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        let diags = Program__from_compiler.GetSuggestionDiagnostics(program, ctx, sourceFile);
        return [NewDiagnosticResponses(diags), void 0];
    }
    static $go$private$api$handleGetSymbolAtLocation(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSymbolAtLocationParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SymbolResponse;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_94 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtLocationParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtLocationParams>).value.Project);
                    let setup = __gotots_results_94[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_94[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_95 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtLocationParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_95[0];
                    err = __gotots_results_95[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(setup.checker, node);
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerSymbol(setup.sd, __go_symbol), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSymbolAtPosition(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SymbolResponse;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_92 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams>).value.Project);
                    let setup = __gotots_results_92[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_92[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams>).value.File.ToFileName());
                    if (sourceFile === undefined) {
                        __gotots_return_0 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams>).value.File))])))];
                        break __gotots_return_block_1;
                    }
                    let positionMap: {
                        value: PositionMap__from_ast;
                    } | undefined = SourceFile__from_ast.GetPositionMap(sourceFile);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, PositionMap__from_ast.UTF16ToUTF8(positionMap, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams>).value.Position));
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(setup.checker, node);
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerSymbol(setup.sd, __go_symbol), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSymbolOfType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSymbolOfTypeParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_114 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolOfTypeParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_114[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_114[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_115 = snapshotData.$go$private$api$resolveTypeHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolOfTypeParams>).value.Type);
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_115[0];
        err = __gotots_results_115[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Type__from_checker.Symbol(t);
        if (__go_symbol === undefined) {
            return [void 0, void 0];
        }
        return [snapshotData.$go$private$api$registerSymbol(sd, __go_symbol), void 0];
    }
    static $go$private$api$handleGetSymbolsAtLocations(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams> | undefined): [
        RuntimeSlice<{
            value: SymbolResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<{
                value: SymbolResponse;
            } | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<{
                value: SymbolResponse;
            } | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_96 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams>).value.Project);
                    let setup = __gotots_results_96[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_96[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SymbolResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let results = RuntimeSlice.make<{
                        value: SymbolResponse;
                    } | undefined>(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams>).value.Locations.length, null, void 0);
                    const __gotots_range_3 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams>).value.Locations;
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                        const __gotots_range_value_7 = __gotots_range_index_2;
                        const __gotots_range_value_8 = new NodeHandle(__gotots_range_3.get(__gotots_range_index_2));
                        let i = __gotots_range_value_7;
                        let loc = __gotots_range_value_8;
                        const __gotots_results_97 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, loc);
                        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_97[0];
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_97[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = [RuntimeSlice.nil<{
                                    value: SymbolResponse;
                                } | undefined>(), err__shadow_1];
                            break __gotots_return_block_1;
                        }
                        if (node === undefined) {
                            continue;
                        }
                        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(setup.checker, node);
                        if (!(__go_symbol === undefined)) {
                            results.set(i, snapshotData.$go$private$api$registerSymbol(setup.sd, __go_symbol));
                        }
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSymbolsAtPositions(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams> | undefined): [
        RuntimeSlice<{
            value: SymbolResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<{
                value: SymbolResponse;
            } | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<{
                value: SymbolResponse;
            } | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_93 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams>).value.Project);
                    let setup = __gotots_results_93[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_93[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SymbolResponse;
                            } | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams>).value.File.ToFileName());
                    if (sourceFile === undefined) {
                        __gotots_return_0 = [RuntimeSlice.nil<{
                                value: SymbolResponse;
                            } | undefined>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams>).value.File))])))];
                        break __gotots_return_block_1;
                    }
                    let positionMap: {
                        value: PositionMap__from_ast;
                    } | undefined = SourceFile__from_ast.GetPositionMap(sourceFile);
                    let results = RuntimeSlice.make<{
                        value: SymbolResponse;
                    } | undefined>(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams>).value.Positions.length, null, void 0);
                    const __gotots_range_2 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams>).value.Positions;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
                        const __gotots_range_value_5 = __gotots_range_index_1;
                        const __gotots_range_value_6 = __gotots_range_2.get(__gotots_range_index_1);
                        let i = __gotots_range_value_5;
                        let pos = __gotots_range_value_6;
                        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, PositionMap__from_ast.UTF16ToUTF8(positionMap, pos));
                        if (node === undefined) {
                            continue;
                        }
                        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(setup.checker, node);
                        if (!(__go_symbol === undefined)) {
                            results.set(i, snapshotData.$go$private$api$registerSymbol(setup.sd, __go_symbol));
                        }
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetSyntacticDiagnostics(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetDiagnosticsParams> | undefined): [
        RuntimeSlice<{
            value: DiagnosticResponse;
        } | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        ctx = WithCheckerLifetime__from_core(ctx, CheckerLifetimeDiagnostics$constant__from_core());
        const __gotots_results_187 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_187[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_187[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_188 = snapshotData.$go$private$api$getProgram(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.Project);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_188[0];
        err = __gotots_results_188[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        const __gotots_results_189 = Session.$go$private$api$resolveOptionalSourceFile(s, program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetDiagnosticsParams>).value.File);
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_189[0];
        err = __gotots_results_189[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<{
                    value: DiagnosticResponse;
                } | undefined>(), err];
        }
        let diags = Program__from_compiler.GetSyntacticDiagnostics(program, ctx, sourceFile);
        return [NewDiagnosticResponses(diags), void 0];
    }
    static $go$private$api$handleGetTargetOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeProperty(s, params, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
            return Type__from_checker.Target($argument0);
        });
    }
    static $go$private$api$handleGetTypeArguments(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerTypeParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_184 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Project);
                    let setup = __gotots_results_184[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_184[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_185 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_185[0];
                    err = __gotots_results_185[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    let typeArgs = Checker__from_checker.GetTypeArguments(setup.checker, t);
                    if (typeArgs.length === 0) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
                        break __gotots_return_block_1;
                    }
                    let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(typeArgs.length, null, void 0);
                    const __gotots_range_13 = typeArgs;
                    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_13.length; __gotots_range_index_10++) {
                        const __gotots_range_value_29 = __gotots_range_index_10;
                        const __gotots_range_value_30 = __gotots_range_13.get(__gotots_range_index_10);
                        let i = __gotots_range_value_29;
                        let ta: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_30;
                        results.set(i, snapshotData.$go$private$api$registerType(setup.sd, ta));
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeAtLocation(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_120 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams>).value.Project);
                    let setup = __gotots_results_120[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_120[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_121 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_121[0];
                    err = __gotots_results_121[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(setup.checker, node);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeAtLocations(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_122 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams>).value.Project);
                    let setup = __gotots_results_122[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_122[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams>).value.Locations.length, null, void 0);
                    const __gotots_range_8 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams>).value.Locations;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_8.length; __gotots_range_index_5++) {
                        const __gotots_range_value_19 = __gotots_range_index_5;
                        const __gotots_range_value_20 = new NodeHandle(__gotots_range_8.get(__gotots_range_index_5));
                        let i = __gotots_range_value_19;
                        let loc = __gotots_range_value_20;
                        const __gotots_results_123 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, loc);
                        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_123[0];
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_123[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err__shadow_1];
                            break __gotots_return_block_1;
                        }
                        if (node === undefined) {
                            continue;
                        }
                        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(setup.checker, node);
                        if (!(t === undefined)) {
                            results.set(i, snapshotData.$go$private$api$registerType(setup.sd, t));
                        }
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeAtPosition(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_124 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams>).value.Project);
                    let setup = __gotots_results_124[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_124[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams>).value.File.ToFileName());
                    if (sourceFile === undefined) {
                        __gotots_return_0 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams>).value.File))])))];
                        break __gotots_return_block_1;
                    }
                    let positionMap: {
                        value: PositionMap__from_ast;
                    } | undefined = SourceFile__from_ast.GetPositionMap(sourceFile);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, PositionMap__from_ast.UTF16ToUTF8(positionMap, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams>).value.Position));
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(setup.checker, node);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeFromTypeNode(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeFromTypeNodeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_134 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeFromTypeNodeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeFromTypeNodeParams>).value.Project);
                    let setup = __gotots_results_134[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_134[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_135 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeFromTypeNodeParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_135[0];
                    err = __gotots_results_135[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeFromTypeNode(setup.checker, node);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeOfSymbol(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_98 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams>).value.Project);
                    let setup = __gotots_results_98[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_98[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_99 = snapshotData.$go$private$api$resolveSymbolHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams>).value.Symbol);
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_99[0];
                    err = __gotots_results_99[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbol(setup.checker, __go_symbol);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeOfSymbolAtLocation(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_147 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams>).value.Project);
                    let setup = __gotots_results_147[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_147[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_148 = snapshotData.$go$private$api$resolveSymbolHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams>).value.Symbol);
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_148[0];
                    err = __gotots_results_148[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    const __gotots_results_149 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_149[0];
                    err = __gotots_results_149[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbolAtLocation(setup.checker, __go_symbol, node);
                    if (t === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypeParametersOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeArrayProperty(s, params, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
            return InterfaceType__from_checker.TypeParameters(Type__from_checker.AsInterfaceType(t));
        });
    }
    static $go$private$api$handleGetTypePredicateOfSignature(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<CheckerSignatureParams> | undefined): [
        {
            value: TypePredicateResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: TypePredicateResponse;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_174 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Project);
                    let setup = __gotots_results_174[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_174[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_175 = snapshotData.$go$private$api$resolveSignatureHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CheckerSignatureParams>).value.Signature);
                    let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_175[0];
                    err = __gotots_results_175[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let pred: {
                        value: TypePredicate__from_checker;
                    } | undefined = Checker__from_checker.GetTypePredicateOfSignature(setup.checker, sig);
                    if (pred === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    let resp: {
                        value: TypePredicateResponse;
                    } | undefined = { value: new TypePredicateResponse(TypePredicate__from_checker.Kind(pred), TypePredicate__from_checker.ParameterIndex(pred), TypePredicate__from_checker.ParameterName(pred), void 0) };
                    if (!(TypePredicate__from_checker.Type(pred) === undefined)) {
                        (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type = snapshotData.$go$private$api$registerType(setup.sd, TypePredicate__from_checker.Type(pred));
                    }
                    __gotots_return_0 = [resp, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypesAtPositions(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_125 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams>).value.Project);
                    let setup = __gotots_results_125[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_125[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams>).value.File.ToFileName());
                    if (sourceFile === undefined) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams>).value.File))])))];
                        break __gotots_return_block_1;
                    }
                    let positionMap: {
                        value: PositionMap__from_ast;
                    } | undefined = SourceFile__from_ast.GetPositionMap(sourceFile);
                    let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams>).value.Positions.length, null, void 0);
                    const __gotots_range_9 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams>).value.Positions;
                    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_9.length; __gotots_range_index_6++) {
                        const __gotots_range_value_21 = __gotots_range_index_6;
                        const __gotots_range_value_22 = __gotots_range_9.get(__gotots_range_index_6);
                        let i = __gotots_range_value_21;
                        let pos = __gotots_range_value_22;
                        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, PositionMap__from_ast.UTF16ToUTF8(positionMap, pos));
                        if (node === undefined) {
                            continue;
                        }
                        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(setup.checker, node);
                        if (!(t === undefined)) {
                            results.set(i, snapshotData.$go$private$api$registerType(setup.sd, t));
                        }
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypesOfSymbols(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_100 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams>).value.Project);
                    let setup = __gotots_results_100[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_100[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams>).value.Symbols.length, null, void 0);
                    const __gotots_range_4 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams>).value.Symbols;
                    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                        const __gotots_range_value_9 = __gotots_range_index_3;
                        const __gotots_range_value_10 = new SymbolID(__gotots_range_4.get(__gotots_range_index_3));
                        let i = __gotots_range_value_9;
                        let symHandle = __gotots_range_value_10;
                        const __gotots_results_101 = snapshotData.$go$private$api$resolveSymbolHandle(setup.sd, symHandle);
                        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_101[0];
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_101[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err__shadow_1];
                            break __gotots_return_block_1;
                        }
                        if (__go_symbol === undefined) {
                            continue;
                        }
                        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbol(setup.checker, __go_symbol);
                        if (!(t === undefined)) {
                            results.set(i, snapshotData.$go$private$api$registerType(setup.sd, t));
                        }
                    }
                    __gotots_return_0 = [results, void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleGetTypesOfType(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session.$go$private$api$resolveTypeArrayProperty(s, params, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
            return Type__from_checker.Types($argument0);
        });
    }
    static $go$private$api$handleGetWidenedType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetWidenedTypeParams> | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_136 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetWidenedTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetWidenedTypeParams>).value.Project);
                    let setup = __gotots_results_136[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_136[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_137 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetWidenedTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_137[0];
                    err = __gotots_results_137[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let result: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetWidenedType(setup.checker, t);
                    if (result === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerType(setup.sd, result), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleInitialize(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): [
        {
            value: InitializeResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_1 = Session__from_project.FS((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
        const __gotots_field_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).UseCaseSensitiveFileNames();
        const __gotots_results_81 = { value: new InitializeResponse(__gotots_field_0, Session__from_project.GetCurrentDirectory((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession)) };
        const __gotots_results_82 = void 0;
        return [__gotots_results_81, __gotots_results_82];
    }
    static $go$private$api$handleIsArrayLikeType(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<IsArrayLikeTypeParams> | undefined): [
        bool,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            bool,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [false, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_140 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsArrayLikeTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsArrayLikeTypeParams>).value.Project);
                    let setup = __gotots_results_140[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_140[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_141 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsArrayLikeTypeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_141[0];
                    err = __gotots_results_141[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [Checker__from_checker.IsArrayLikeType(setup.checker, t), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleIsContextSensitive(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<GetContextualTypeParams> | undefined): [
        bool,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            bool,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [false, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_168 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetContextualTypeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetContextualTypeParams>).value.Project);
                    let setup = __gotots_results_168[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_168[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_169 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetContextualTypeParams>).value.Location);
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_169[0];
                    err = __gotots_results_169[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    if (node === undefined) {
                        __gotots_return_0 = [false, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [Checker__from_checker.IsContextSensitive(setup.checker, node), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleIsTypeAssignableTo(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams> | undefined): [
        bool,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            bool,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [false, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_142 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams>).value.Project);
                    let setup = __gotots_results_142[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_142[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_143 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams>).value.Source);
                    let source: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_143[0];
                    err = __gotots_results_143[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_results_144 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams>).value.Target);
                    let target: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_144[0];
                    err = __gotots_results_144[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [false, err];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [Checker__from_checker.IsTypeAssignableTo(setup.checker, source, target), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleParseConfigFile(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<ParseConfigFileParams> | undefined): [
        {
            value: ConfigFileResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let configFileName = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParseConfigFileParams>).value.File.ToAbsoluteFileName(Session__from_project.GetCurrentDirectory((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession));
        const __gotots_receiver_2 = Session__from_project.FS((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
        const __gotots_argument_0 = configFileName;
        const __gotots_results_85 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).ReadFile(__gotots_argument_0);
        let configFileContent = __gotots_results_85[0];
        let ok = __gotots_results_85[1];
        if (!ok) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: could not read file %q", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$string(configFileName)])))];
        }
        let configDir = GetDirectoryPath__from_tspath(configFileName);
        let tsConfigSourceFile: {
            value: TsConfigSourceFile__from_tsoptions;
        } | undefined = NewTsconfigSourceFileFromFilePath__from_tsoptions(configFileName, Session.$go$private$api$toPath(s, configFileName), configFileContent);
        let parsedCommandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = ParseJsonSourceFileConfigFileContent__from_tsoptions(tsConfigSourceFile, new $goInterfaceAdapter$PointerTo_Named_project$Session((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession), configDir, void 0, void 0, configFileName, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<FileExtensionInfo__from_tsoptions$Storage>(), void 0);
        return [
            { value: new ConfigFileResponse(ParsedCommandLine__from_tsoptions.FileNames(parsedCommandLine), ParsedCommandLine__from_tsoptions.CompilerOptions(parsedCommandLine)) }, void 0];
    }
    static $go$private$api$handlePrintNode(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<PrintNodeParams> | undefined): [
        gostring,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_conversion_3 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_6 = __gotots_conversion_3 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_3, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_3;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
            });
        const __gotots_results_165 = base64__from_gostdlib.Encoding.DecodeString(__gotots_receiver_6 === void 0 ? void 0 :
            (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrintNodeParams>).value.Data);
        const __gotots_results_166 = [__gotots_results_165[0], GoProviderInterfaceBridge.$from(__gotots_results_165[1])] satisfies [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let data = __gotots_results_166[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_166[1];
        if (!(err === undefined)) {
            return ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: invalid base64 data: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, err])))];
        }
        const __gotots_results_167 = DecodeNodes__from_encoder(data);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_167[0];
        err = __gotots_results_167[1];
        if (!(err === undefined)) {
            return ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: failed to decode AST: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, err])))];
        }
        let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(false, 0, false, 0, false, false, false, false, false, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrintNodeParams>).value.NeverAsciiEscape, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrintNodeParams>).value.PreserveSourceNewlines, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrintNodeParams>).value.TerminateUnterminatedLiterals), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), void 0);
        return [Printer__from_printer.Emit(p, node, void 0), void 0];
    }
    static $go$private$api$handleRelease(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<ReleaseParams> | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (params === undefined || ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReleaseParams>).value.Snapshot.$value ===
            ((void SnapshotID,
                0n) as bigint)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: empty handle", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        sync__from_gostdlib.RWMutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        let sd: snapshotData | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.lookup(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReleaseParams>).value.Snapshot);
        if (sd === undefined) {
            sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: snapshot %d not found", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$SnapshotID(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReleaseParams>).value.Snapshot)])))];
        }
        const __gotots_store_0 = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_0.refCount = __gotots_store_0.refCount - 1;
        if ((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).refCount <= 0) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.delete(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReleaseParams>).value.Snapshot);
            Snapshot__from_project.Deref((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
        }
        sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        return [new $goInterfaceAdapter$bool(true), void 0];
    }
    static $go$private$api$handleResolveName(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<ResolveNameParams> | undefined): [
        {
            value: SymbolResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SymbolResponse;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_104 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Project);
                    let setup = __gotots_results_104[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_104[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Location.$value ===
                        ((void NodeHandle,
                            "") as string))) {
                        const __gotots_results_105 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Location);
                        location = __gotots_results_105[0];
                        err = __gotots_results_105[1];
                        if (!(err === undefined)) {
                            __gotots_return_0 = [void 0, err];
                            break __gotots_return_block_1;
                        }
                    }
                    else if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.File === undefined) && !(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Position === undefined)) {
                        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(setup.program, ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.File ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentIdentifier>).value.ToFileName());
                        if (sourceFile === undefined) {
                            __gotots_return_0 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_api$DocumentIdentifier(DocumentIdentifier.$copy(DocumentIdentifier.$copy(((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.File ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentIdentifier>).value)))])))];
                            break __gotots_return_block_1;
                        }
                        location = GetTouchingPropertyName__from_astnav(sourceFile, PositionMap__from_ast.UTF16ToUTF8(SourceFile__from_ast.GetPositionMap(sourceFile), ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Position ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<uint32>).value));
                    }
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveName(setup.checker, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Name, location, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.Meaning, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolveNameParams>).value.ExcludeGlobals);
                    if (__go_symbol === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [snapshotData.$go$private$api$registerSymbol(setup.sd, __go_symbol), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleSaveHeapProfile(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<ProfileParams> | undefined): [
        {
            value: ProfileResult;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (params === undefined || ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams>).value.Dir === "") {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: dir is required", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        const __gotots_results_202 = SaveHeapProfile__from_pprof(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams>).value.Dir);
        let filePath = __gotots_results_202[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_202[1];
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: failed to save heap profile: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, err])))];
        }
        return [
            { value: new ProfileResult(filePath) }, void 0];
    }
    static $go$private$api$handleSignatureToSignatureDeclaration(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams> | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            GoInterface | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_156 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Project);
                    let setup = __gotots_results_156[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_156[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_157 = snapshotData.$go$private$api$resolveSignatureHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Signature);
                    let sig: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = __gotots_results_157[0];
                    err = __gotots_results_157[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Location.$value ===
                        ((void NodeHandle,
                            "") as string))) {
                        const __gotots_results_158 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Location);
                        enclosingDeclaration = __gotots_results_158[0];
                        err = __gotots_results_158[1];
                        if (!(err === undefined)) {
                            __gotots_return_0 = [void 0, err];
                            break __gotots_return_block_1;
                        }
                    }
                    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.SignatureToSignatureDeclaration(setup.checker, sig, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Kind << 16 >> 16, enclosingDeclaration, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams>).value.Flags >>> 0);
                    if (node === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    const __gotots_results_159 = EncodeNode__from_encoder(Node__from_ast.AsNode(node), void 0);
                    let data = __gotots_results_159[0];
                    err = __gotots_results_159[2];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to encode signature declaration: %w", RuntimeSlice.literal<GoInterface | undefined>([err])))];
                        break __gotots_return_block_1;
                    }
                    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useBinaryResponses) {
                        __gotots_return_0 = [new $goInterfaceAdapter$Named_api$RawBinary(new RawBinary(data)), void 0];
                        break __gotots_return_block_1;
                    }
                    const __gotots_conversion_2 = base64__from_gostdlib.state.StdEncoding;
                    const __gotots_receiver_5 = __gotots_conversion_2 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_2, (): base64__from_gostdlib.Encoding => {
                            return __gotots_conversion_2;
                        }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                            provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_2, $go$providerPointerValue);
                        });
                    const __gotots_field_3 = base64__from_gostdlib.Encoding.EncodeToString(__gotots_receiver_5 === void 0 ? void 0 :
                        (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, data);
                    const __gotots_results_160 = new $goInterfaceAdapter$PointerTo_Named_api$SourceFileResponse({ value: new SourceFileResponse(__gotots_field_3) });
                    const __gotots_results_161 = void 0;
                    __gotots_return_0 = [__gotots_results_160, __gotots_results_161];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleStartCPUProfile(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<ProfileParams> | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (params === undefined || ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams>).value.Dir === "") {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: dir is required", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError])))];
        }
        {
            const __gotots_store_2 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = CPUProfiler__from_pprof.StartCPUProfile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "cpuProfiler"), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams>).value.Dir);
            if (!(err === undefined)) {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: failed to start CPU profile: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, err])))];
            }
        }
        return [void 0, void 0];
    }
    static $go$private$api$handleStopCPUProfile(s: {
        value: Session;
    } | undefined, $0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): [
        {
            value: ProfileResult;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_store_3 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_201 = CPUProfiler__from_pprof.StopCPUProfile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "cpuProfiler"));
        let filePath = __gotots_results_201[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_201[1];
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: failed to stop CPU profile: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, err])))];
        }
        return [
            { value: new ProfileResult(filePath) }, void 0];
    }
    static $go$private$api$handleTypeToString(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams> | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            GoInterface | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_162 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Project);
                    let setup = __gotots_results_162[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_162[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_163 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_163[0];
                    err = __gotots_results_163[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Location.$value ===
                        ((void NodeHandle,
                            "") as string))) {
                        const __gotots_results_164 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Location);
                        enclosingDeclaration = __gotots_results_164[0];
                        err = __gotots_results_164[1];
                        if (!(err === undefined)) {
                            __gotots_return_0 = [void 0, err];
                            break __gotots_return_block_1;
                        }
                    }
                    if (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Flags !== 0) {
                        __gotots_return_0 = [new $goInterfaceAdapter$string(Checker__from_checker.TypeToStringEx(setup.checker, t, enclosingDeclaration, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Flags >>> 0, void 0)), void 0];
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = [new $goInterfaceAdapter$string(Checker__from_checker.TypeToStringEx(setup.checker, t, enclosingDeclaration, 1064960, void 0)), void 0];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleTypeToTypeNode(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams> | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            GoInterface | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_150 = Session.$go$private$api$setupChecker(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Snapshot, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Project);
                    let setup = __gotots_results_150[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_150[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    const __gotots_callee_0: (() => void) | undefined = setup.done;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_results_151 = snapshotData.$go$private$api$resolveTypeHandle(setup.sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Type);
                    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_151[0];
                    err = __gotots_results_151[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, err];
                        break __gotots_return_block_1;
                    }
                    let enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Location.$value ===
                        ((void NodeHandle,
                            "") as string))) {
                        const __gotots_results_152 = snapshotData.$go$private$api$resolveNodeHandle(setup.sd, setup.program, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Location);
                        enclosingDeclaration = __gotots_results_152[0];
                        err = __gotots_results_152[1];
                        if (!(err === undefined)) {
                            __gotots_return_0 = [void 0, err];
                            break __gotots_return_block_1;
                        }
                    }
                    let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypeToTypeNode(setup.checker, t, enclosingDeclaration, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams>).value.Flags >>> 0, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.nil());
                    if (typeNode === undefined) {
                        __gotots_return_0 = [void 0, void 0];
                        break __gotots_return_block_1;
                    }
                    const __gotots_results_153 = EncodeNode__from_encoder(Node__from_ast.AsNode(typeNode), void 0);
                    let data = __gotots_results_153[0];
                    err = __gotots_results_153[2];
                    if (!(err === undefined)) {
                        __gotots_return_0 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to encode type node: %w", RuntimeSlice.literal<GoInterface | undefined>([err])))];
                        break __gotots_return_block_1;
                    }
                    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useBinaryResponses) {
                        __gotots_return_0 = [new $goInterfaceAdapter$Named_api$RawBinary(new RawBinary(data)), void 0];
                        break __gotots_return_block_1;
                    }
                    const __gotots_conversion_1 = base64__from_gostdlib.state.StdEncoding;
                    const __gotots_receiver_4 = __gotots_conversion_1 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_1, (): base64__from_gostdlib.Encoding => {
                            return __gotots_conversion_1;
                        }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                            provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_1, $go$providerPointerValue);
                        });
                    const __gotots_field_2 = base64__from_gostdlib.Encoding.EncodeToString(__gotots_receiver_4 === void 0 ? void 0 :
                        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, data);
                    const __gotots_results_154 = new $goInterfaceAdapter$PointerTo_Named_api$SourceFileResponse({ value: new SourceFileResponse(__gotots_field_2) });
                    const __gotots_results_155 = void 0;
                    __gotots_return_0 = [__gotots_results_154, __gotots_results_155];
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_0;
    }
    static $go$private$api$handleUpdateSnapshot(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, params: tsonicTypeScriptRuntime.Location<UpdateSnapshotParams> | undefined): [
        {
            value: UpdateSnapshotResponse;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let snapshot: {
            value: Snapshot__from_project;
        } | undefined = void 0;
        let fileChanges = Session.$go$private$api$toFileChangeSummary(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UpdateSnapshotParams>).value.FileChanges);
        if (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UpdateSnapshotParams>).value.OpenProject !== "") {
            let configFileName = Session.$go$private$api$toAbsoluteFileName(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UpdateSnapshotParams>).value.OpenProject);
            const __gotots_results_83 = Session__from_project.APIOpenProject((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession, ctx, configFileName, FileChangeSummary__from_project.$copy(fileChanges));
            let newSnapshot: {
                value: Snapshot__from_project;
            } | undefined = __gotots_results_83[1];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_83[2];
            if (!(err === undefined)) {
                Snapshot__from_project.Deref(newSnapshot, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: failed to load project: %w", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, err])))];
            }
            snapshot = newSnapshot;
        }
        else {
            snapshot = Session__from_project.APIUpdateWithFileChanges((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession, ctx, FileChangeSummary__from_project.$copy(fileChanges));
        }
        let handle = snapshotHandle(snapshot);
        sync__from_gostdlib.RWMutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        const __gotots_results_84 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.lookupOk(handle);
        let sd: snapshotData | undefined = __gotots_results_84[0];
        let exists = __gotots_results_84[1];
        if (exists) {
            Snapshot__from_project.Deref(snapshot, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
            const __gotots_store_1 = (sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_1.refCount = __gotots_store_1.refCount + 1;
        }
        else {
            sd = new snapshotData(snapshot, 1, $goMap$MapOf_Named_api$SymbolID_To_PointerTo_Named_ast$Symbol.make(0, []), named_sync.SyncRWMutexOperations.$zero(), $goMap$MapOf_Named_api$TypeID_To_PointerTo_Named_checker$Type.make(0, []), named_sync.SyncRWMutexOperations.$zero(), $goMap$MapOf_Named_api$SignatureID_To_PointerTo_Named_checker$Signature.make(0, []), 0n, named_sync.SyncRWMutexOperations.$zero(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_encoder$NodeIndexTable.make(0, []), named_sync.SyncRWMutexOperations.$zero());
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.store(handle, sd);
        }
        sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        let projects = ProjectCollection__from_project.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        let projectResponses = RuntimeSlice.make<{
            value: ProjectResponse;
        } | undefined>(projects.length, null, void 0);
        const __gotots_range_1 = projects;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
            const __gotots_range_value_3 = __gotots_range_index_0;
            const __gotots_range_value_4 = __gotots_range_1.get(__gotots_range_index_0);
            let i = __gotots_range_value_3;
            let proj: {
                value: Project__from_project;
            } | undefined = __gotots_range_value_4;
            projectResponses.set(i, NewProjectResponse(proj));
        }
        let changes: tsonicTypeScriptRuntime.Location<SnapshotChanges> | undefined = void 0;
        sync__from_gostdlib.RWMutex.RLock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        let prevSD: snapshotData | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshots.lookup((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.latestSnapshot);
        sync__from_gostdlib.RWMutex.RUnlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        if (!(prevSD === undefined)) {
            changes = computeSnapshotChanges((prevSD ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, snapshot);
        }
        sync__from_gostdlib.RWMutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.latestSnapshot = handle;
        sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotsMu);
        return [
            { value: new UpdateSnapshotResponse(handle, projectResponses, changes) }, void 0];
    }
    static $go$private$api$resolveOptionalSourceFile(s: {
        value: Session;
    } | undefined, program: {
        value: Program__from_compiler;
    } | undefined, file: tsonicTypeScriptRuntime.Location<DocumentIdentifier> | undefined): [
        tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (file === undefined) {
            return [void 0, void 0];
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(program, ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentIdentifier>).value.ToFileName());
        if (sourceFile === undefined) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: source file not found: %v", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$PointerTo_Named_api$DocumentIdentifier(file)])))];
        }
        return [sourceFile, void 0];
    }
    static $go$private$api$resolveTypeArrayProperty(s: {
        value: Session;
    } | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined, getter: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>) | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_227 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypePropertyParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_227[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_227[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
        }
        const __gotots_results_228 = snapshotData.$go$private$api$resolveTypeHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypePropertyParams>).value.Type);
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_228[0];
        err = __gotots_results_228[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), err];
        }
        const __gotots_callee_2 = getter;
        const __gotots_argument_6 = t;
        let types = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
        if (types.length === 0) {
            return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(), void 0];
        }
        let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeResponse> | undefined>(types.length, null, void 0);
        const __gotots_range_25 = types;
        for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_25.length; __gotots_range_index_22++) {
            const __gotots_range_value_46 = __gotots_range_index_22;
            const __gotots_range_value_47 = __gotots_range_25.get(__gotots_range_index_22);
            let i = __gotots_range_value_46;
            let sub: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_47;
            results.set(i, snapshotData.$go$private$api$registerType(sd, sub));
        }
        return [results, void 0];
    }
    static $go$private$api$resolveTypeProperty(s: {
        value: Session;
    } | undefined, params: tsonicTypeScriptRuntime.Location<GetTypePropertyParams> | undefined, getter: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): [
        tsonicTypeScriptRuntime.Location<TypeResponse> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_225 = Session.$go$private$api$getSnapshotData(s, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypePropertyParams>).value.Snapshot);
        let sd: snapshotData | undefined = __gotots_results_225[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_225[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_results_226 = snapshotData.$go$private$api$resolveTypeHandle(sd, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GetTypePropertyParams>).value.Type);
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_results_226[0];
        err = __gotots_results_226[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_callee_1 = getter;
        const __gotots_argument_5 = t;
        let result: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
        if (result === undefined) {
            return [void 0, void 0];
        }
        return [snapshotData.$go$private$api$registerType(sd, result), void 0];
    }
    static $go$private$api$setupChecker(s: {
        value: Session;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, snapshot: SnapshotID, projectHandle: ProjectID): [
        checkerSetup,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_218 = Session.$go$private$api$getSnapshotData(s, snapshot);
        let sd: snapshotData | undefined = __gotots_results_218[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_218[1];
        if (!(err === undefined)) {
            return [new checkerSetup(void 0, void 0, void 0, void 0), err];
        }
        const __gotots_results_219 = snapshotData.$go$private$api$getProgram(sd, projectHandle);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_results_219[0];
        err = __gotots_results_219[1];
        if (!(err === undefined)) {
            return [new checkerSetup(void 0, void 0, void 0, void 0), err];
        }
        const __gotots_results_220 = Program__from_compiler.GetTypeChecker(program, WithCheckerLifetime__from_core(ctx, CheckerLifetimeAPI$constant__from_core()));
        let c: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_220[0];
        let done: (() => void) | undefined = __gotots_results_220[1];
        return [new checkerSetup(sd, program, c, done), void 0];
    }
    static $go$private$api$setupLanguageService(s: {
        value: Session;
    } | undefined, sd: snapshotData | undefined, program: {
        value: Program__from_compiler;
    } | undefined, projectHandle: ProjectID, activeFile: gostring): [
        LanguageService__from_ls | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let projectName = parseProjectHandle(projectHandle);
        let proj: {
            value: Project__from_project;
        } | undefined = ProjectCollection__from_project.GetProjectByPath(((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection, projectName);
        if (proj === undefined) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: project %s not found", RuntimeSlice.literal<GoInterface | undefined>([$state.ErrClientError, new $goInterfaceAdapter$Named_tspath$Path(projectName)])))];
        }
        return [NewLanguageService__from_ls(Project__from_project.ConfigFilePath(proj), program, new $goInterfaceAdapter$PointerTo_Named_project$Snapshot((sd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot), activeFile), void 0];
    }
    static $go$private$api$toAbsoluteFileName(s: {
        value: Session;
    } | undefined, fileName: gostring): gostring {
        return GetNormalizedAbsolutePath__from_tspath(fileName, Session__from_project.GetCurrentDirectory((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession));
    }
    static $go$private$api$toFileChangeSummary(s: {
        value: Session;
    } | undefined, changes: tsonicTypeScriptRuntime.Location<APIFileChanges> | undefined): FileChangeSummary__from_project {
        if (changes === undefined) {
            return new FileChangeSummary__from_project(new DocumentUri__from_lsproto(""), new DocumentUri__from_lsproto(""), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
            }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
            }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
            }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
            }), false, false);
        }
        let summary = FileChangeSummary__from_project.$zero();
        if (((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<APIFileChanges>).value.InvalidateAll) {
            summary.InvalidateAll = true;
            summary.IncludesWatchChangeOutsideNodeModules = true;
            return FileChangeSummary__from_project.$copy(summary);
        }
        const __gotots_range_19 = ((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<APIFileChanges>).value.Changed;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_19.length; __gotots_range_index_16++) {
            const __gotots_range_value_37 = DocumentIdentifier.$copy(DocumentIdentifier.$fromStorage(__gotots_range_19.get(__gotots_range_index_16)));
            let doc = __gotots_range_value_37;
            let uri = doc.ToURI();
            const __gotots_store_4 = summary;
            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Changed"), uri);
        }
        const __gotots_range_20 = ((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<APIFileChanges>).value.Created;
        for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_20.length; __gotots_range_index_17++) {
            const __gotots_range_value_38 = DocumentIdentifier.$copy(DocumentIdentifier.$fromStorage(__gotots_range_20.get(__gotots_range_index_17)));
            let doc = __gotots_range_value_38;
            let uri = doc.ToURI();
            const __gotots_store_5 = summary;
            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Created"), uri);
        }
        const __gotots_range_21 = ((changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<APIFileChanges>).value.Deleted;
        for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_21.length; __gotots_range_index_18++) {
            const __gotots_range_value_39 = DocumentIdentifier.$copy(DocumentIdentifier.$fromStorage(__gotots_range_21.get(__gotots_range_index_18)));
            let doc = __gotots_range_value_39;
            let uri = doc.ToURI();
            const __gotots_store_6 = summary;
            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Deleted"), uri);
        }
        const __gotots_store_7 = summary;
        const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Changed"));
        const __gotots_store_8 = summary;
        const __gotots_binary_operand_1 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Created"));
        const __gotots_binary_operand_2 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
        const __gotots_store_9 = summary;
        const __gotots_binary_operand_3 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Deleted"));
        const __gotots_binary_operand_4 = __gotots_binary_operand_2 + __gotots_binary_operand_3;
        const __gotots_binary_operand_5 = 0;
        if (__gotots_binary_operand_4 > __gotots_binary_operand_5) {
            summary.IncludesWatchChangeOutsideNodeModules = true;
        }
        return FileChangeSummary__from_project.$copy(summary);
    }
    static $go$private$api$toPath(s: {
        value: Session;
    } | undefined, fileName: gostring): Path__from_tspath {
        const __gotots_argument_2 = fileName;
        const __gotots_argument_3 = Session__from_project.GetCurrentDirectory((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
        const __gotots_receiver_7 = Session__from_project.FS((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectSession);
        const __gotots_argument_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).UseCaseSensitiveFileNames();
        return ToPath__from_tspath(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    }
}
export class SessionOptions {
    declare private readonly $goType: void;
    public constructor(public UseBinaryResponses: bool) {
    }
    declare private readonly then?: never;
}
export function NewSession(projectSession: {
    value: Session__from_project;
} | undefined, options: SessionOptions | undefined): {
    value: Session;
} | undefined {
    let id = atomic__from_gostdlib.Uint64.Add($state.sessionIDCounter, 1n);
    let s: {
        value: Session;
    } | undefined = { value: new Session(formatSessionID(id), projectSession, false, GoMap.make(0, []), named_sync.SyncRWMutexOperations.$zero(), new SnapshotID(0n), CPUProfiler__from_pprof.$zero()) };
    if (!(options === undefined)) {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useBinaryResponses = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).UseBinaryResponses;
    }
    return s;
}
export function snapshotHandle(snapshot: {
    value: Snapshot__from_project;
} | undefined): SnapshotID {
    return new SnapshotID(Snapshot__from_project.ID(snapshot));
}
export class checkerSetup {
    declare private readonly $goType: void;
    public constructor(public sd: snapshotData | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public checker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, public done: (() => void) | undefined) {
    }
    declare private readonly then?: never;
}
export function computeSnapshotChanges(prev: {
    value: Snapshot__from_project;
} | undefined, next: {
    value: Snapshot__from_project;
} | undefined): tsonicTypeScriptRuntime.Location<SnapshotChanges> | undefined {
    let prevProjects: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>> | undefined = ProjectCollection__from_project.ProjectsByPath((prev ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
    let nextProjects: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>> | undefined = ProjectCollection__from_project.ProjectsByPath((next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
    let changes = SnapshotChanges.$zero();
    const changes$location = tsonicTypeScriptRuntime.boundLocation({}, () => changes, changes$next => changes = changes$next);
    DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project(prevProjects, nextProjects, ($0: Path__from_tspath, $1: {
        value: Project__from_project;
    } | undefined): void => {
    }, ($0: Path__from_tspath, oldProj: {
        value: Project__from_project;
    } | undefined): void => {
        changes.RemovedProjects = changes.RemovedProjects.append(((void ProjectID,
            "") as string), [ProjectHandle(oldProj).$value]);
    }, ($0: Path__from_tspath, oldProj: {
        value: Project__from_project;
    } | undefined, newProj: {
        value: Project__from_project;
    } | undefined): void => {
        if (Project__from_project.GetProgram(oldProj)
            ===
                Project__from_project.GetProgram(newProj)) {
            return;
        }
        let oldFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile.nil(), newFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile.nil();
        {
            let p: {
                value: Program__from_compiler;
            } | undefined = Project__from_project.GetProgram(oldProj);
            if (!(p === undefined)) {
                oldFiles = Program__from_compiler.FilesByPath(p);
            }
        }
        {
            let p: {
                value: Program__from_compiler;
            } | undefined = Project__from_project.GetProgram(newProj);
            if (!(p === undefined)) {
                newFiles = Program__from_compiler.FilesByPath(p);
            }
        }
        let projectChanges = ProjectFileChanges.$zero();
        const projectChanges$location = tsonicTypeScriptRuntime.boundLocation({}, () => projectChanges, projectChanges$next => projectChanges = projectChanges$next);
        DiffMaps$Named_tspath$Path$PointerTo_Named_ast$SourceFile(oldFiles, newFiles, void 0, (path: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void => {
            projectChanges.DeletedFiles = projectChanges.DeletedFiles.append(((void Path__from_tspath,
                "") as string), [path.$value]);
        }, (path: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void => {
            projectChanges.ChangedFiles = projectChanges.ChangedFiles.append(((void Path__from_tspath,
                "") as string), [path.$value]);
        });
        if (projectChanges.ChangedFiles.length > 0 || projectChanges.DeletedFiles.length > 0) {
            if (changes.ChangedProjects.isNil()) {
                changes.ChangedProjects = $goMap$MapOf_Named_api$ProjectID_To_PointerTo_Named_api$ProjectFileChanges.make(0, []);
            }
            changes.ChangedProjects.store(ProjectHandle(newProj), projectChanges$location);
        }
    });
    return changes$location;
}
export function formatSessionID(id: uint64): gostring {
    return fmt__from_gostdlib.Sprintf("api-session-%d", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(id)]));
}
