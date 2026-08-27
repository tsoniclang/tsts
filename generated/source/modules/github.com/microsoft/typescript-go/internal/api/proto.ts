import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { ElementFlags as ElementFlags__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Category as Category__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint32, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { Decoder as Decoder__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/api/state.js";
import { Diagnostic as Diagnostic__from_ast, GetSymbolId as GetSymbolId__from_ast, PositionMap as PositionMap__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { ConditionalType as ConditionalType__from_checker, IndexType as IndexType__from_checker, IndexedAccessType as IndexedAccessType__from_checker, InterfaceType as InterfaceType__from_checker, IntrinsicType as IntrinsicType__from_checker, LiteralType as LiteralType__from_checker, ObjectFlagsClassOrInterface$constant as ObjectFlagsClassOrInterface$constant__from_checker, ObjectFlagsReference$constant as ObjectFlagsReference$constant__from_checker, ObjectFlagsTuple$constant as ObjectFlagsTuple$constant__from_checker, StringMappingType as StringMappingType__from_checker, SubstitutionType as SubstitutionType__from_checker, TemplateLiteralType as TemplateLiteralType__from_checker, TupleType as TupleType__from_checker, TypeAlias as TypeAlias__from_checker, TypeFlagsConditional$constant as TypeFlagsConditional$constant__from_checker, TypeFlagsFreshable$constant as TypeFlagsFreshable$constant__from_checker, TypeFlagsIndex$constant as TypeFlagsIndex$constant__from_checker, TypeFlagsIndexedAccess$constant as TypeFlagsIndexedAccess$constant__from_checker, TypeFlagsIntrinsic$constant as TypeFlagsIntrinsic$constant__from_checker, TypeFlagsLiteral$constant as TypeFlagsLiteral$constant__from_checker, TypeFlagsObject$constant as TypeFlagsObject$constant__from_checker, TypeFlagsStringMapping$constant as TypeFlagsStringMapping$constant__from_checker, TypeFlagsSubstitution$constant as TypeFlagsSubstitution$constant__from_checker, TypeFlagsTemplateLiteral$constant as TypeFlagsTemplateLiteral$constant__from_checker, TypeFlagsTypeParameter$constant as TypeFlagsTypeParameter$constant__from_checker, TypeFlagsUnionOrIntersection$constant as TypeFlagsUnionOrIntersection$constant__from_checker, TypeParameter as TypeParameter__from_checker, TypeReference as TypeReference__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { $state as $state__locale, Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { Project as Project__from_project } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$Named_jsontext$Kind, $goInterfaceAdapter$bool, $goInterfaceAdapter$float64, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_api$ProjectID_To_PointerTo_Named_api$ProjectFileChanges as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class Method {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export class SnapshotID {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
}
export class ProjectID {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export class SymbolID {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
}
export type TypeID = uint32;
export class SignatureID {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
}
export class NodeHandle {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function ProjectHandle(p: {
    value: Project__from_project;
} | undefined): ProjectID {
    return new ProjectID(Project__from_project.ID(p).$value);
}
export function SymbolHandle(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): SymbolID {
    return new SymbolID(GetSymbolId__from_ast(__go_symbol).$value);
}
export function TypeHandle(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): TypeID {
    return Type__from_checker.Id(t);
}
export function SignatureHandle(id: uint64): SignatureID {
    return new SignatureID(id);
}
export function parseProjectHandle(handle: ProjectID): Path__from_tspath {
    return new Path__from_tspath(handle.$value);
}
export function MethodRelease$constant(): Method {
    return new Method("release");
}
export function MethodInitialize$constant(): Method {
    return new Method("initialize");
}
export function MethodUpdateSnapshot$constant(): Method {
    return new Method("updateSnapshot");
}
export function MethodParseConfigFile$constant(): Method {
    return new Method("parseConfigFile");
}
export function MethodGetDefaultProjectForFile$constant(): Method {
    return new Method("getDefaultProjectForFile");
}
export function MethodGetSymbolAtPosition$constant(): Method {
    return new Method("getSymbolAtPosition");
}
export function MethodGetSymbolsAtPositions$constant(): Method {
    return new Method("getSymbolsAtPositions");
}
export function MethodGetSymbolAtLocation$constant(): Method {
    return new Method("getSymbolAtLocation");
}
export function MethodGetSymbolsAtLocations$constant(): Method {
    return new Method("getSymbolsAtLocations");
}
export function MethodGetTypeOfSymbol$constant(): Method {
    return new Method("getTypeOfSymbol");
}
export function MethodGetTypesOfSymbols$constant(): Method {
    return new Method("getTypesOfSymbols");
}
export function MethodGetDeclaredTypeOfSymbol$constant(): Method {
    return new Method("getDeclaredTypeOfSymbol");
}
export function MethodGetSourceFile$constant(): Method {
    return new Method("getSourceFile");
}
export function MethodResolveName$constant(): Method {
    return new Method("resolveName");
}
export function MethodGetParentOfSymbol$constant(): Method {
    return new Method("getParentOfSymbol");
}
export function MethodGetMembersOfSymbol$constant(): Method {
    return new Method("getMembersOfSymbol");
}
export function MethodGetExportsOfSymbol$constant(): Method {
    return new Method("getExportsOfSymbol");
}
export function MethodGetExportSymbolOfSymbol$constant(): Method {
    return new Method("getExportSymbolOfSymbol");
}
export function MethodGetSymbolOfType$constant(): Method {
    return new Method("getSymbolOfType");
}
export function MethodGetSignaturesOfType$constant(): Method {
    return new Method("getSignaturesOfType");
}
export function MethodGetResolvedSignature$constant(): Method {
    return new Method("getResolvedSignature");
}
export function MethodGetTypeAtLocation$constant(): Method {
    return new Method("getTypeAtLocation");
}
export function MethodGetTypeAtLocations$constant(): Method {
    return new Method("getTypeAtLocations");
}
export function MethodGetTypeAtPosition$constant(): Method {
    return new Method("getTypeAtPosition");
}
export function MethodGetTypesAtPositions$constant(): Method {
    return new Method("getTypesAtPositions");
}
export function MethodGetTargetOfType$constant(): Method {
    return new Method("getTargetOfType");
}
export function MethodGetFreshTypeOfType$constant(): Method {
    return new Method("getFreshTypeOfType");
}
export function MethodGetRegularTypeOfType$constant(): Method {
    return new Method("getRegularTypeOfType");
}
export function MethodGetTypesOfType$constant(): Method {
    return new Method("getTypesOfType");
}
export function MethodGetTypeParametersOfType$constant(): Method {
    return new Method("getTypeParametersOfType");
}
export function MethodGetOuterTypeParametersOfType$constant(): Method {
    return new Method("getOuterTypeParametersOfType");
}
export function MethodGetLocalTypeParametersOfType$constant(): Method {
    return new Method("getLocalTypeParametersOfType");
}
export function MethodGetAliasTypeArgumentsOfType$constant(): Method {
    return new Method("getAliasTypeArgumentsOfType");
}
export function MethodGetAliasSymbolOfType$constant(): Method {
    return new Method("getAliasSymbolOfType");
}
export function MethodGetObjectTypeOfType$constant(): Method {
    return new Method("getObjectTypeOfType");
}
export function MethodGetIndexTypeOfType$constant(): Method {
    return new Method("getIndexTypeOfType");
}
export function MethodGetCheckTypeOfType$constant(): Method {
    return new Method("getCheckTypeOfType");
}
export function MethodGetExtendsTypeOfType$constant(): Method {
    return new Method("getExtendsTypeOfType");
}
export function MethodGetBaseTypeOfType$constant(): Method {
    return new Method("getBaseTypeOfType");
}
export function MethodGetConstraintOfType$constant(): Method {
    return new Method("getConstraintOfType");
}
export function MethodGetContextualType$constant(): Method {
    return new Method("getContextualType");
}
export function MethodGetBaseTypeOfLiteralType$constant(): Method {
    return new Method("getBaseTypeOfLiteralType");
}
export function MethodGetNonNullableType$constant(): Method {
    return new Method("getNonNullableType");
}
export function MethodGetTypeFromTypeNode$constant(): Method {
    return new Method("getTypeFromTypeNode");
}
export function MethodGetWidenedType$constant(): Method {
    return new Method("getWidenedType");
}
export function MethodGetParameterType$constant(): Method {
    return new Method("getParameterType");
}
export function MethodIsArrayLikeType$constant(): Method {
    return new Method("isArrayLikeType");
}
export function MethodIsTypeAssignableTo$constant(): Method {
    return new Method("isTypeAssignableTo");
}
export function MethodGetShorthandAssignmentValueSymbol$constant(): Method {
    return new Method("getShorthandAssignmentValueSymbol");
}
export function MethodGetTypeOfSymbolAtLocation$constant(): Method {
    return new Method("getTypeOfSymbolAtLocation");
}
export function MethodTypeToTypeNode$constant(): Method {
    return new Method("typeToTypeNode");
}
export function MethodSignatureToSignatureDeclaration$constant(): Method {
    return new Method("signatureToSignatureDeclaration");
}
export function MethodTypeToString$constant(): Method {
    return new Method("typeToString");
}
export function MethodIsContextSensitive$constant(): Method {
    return new Method("isContextSensitive");
}
export function MethodGetReturnTypeOfSignature$constant(): Method {
    return new Method("getReturnTypeOfSignature");
}
export function MethodGetRestTypeOfSignature$constant(): Method {
    return new Method("getRestTypeOfSignature");
}
export function MethodGetTypePredicateOfSignature$constant(): Method {
    return new Method("getTypePredicateOfSignature");
}
export function MethodGetBaseTypes$constant(): Method {
    return new Method("getBaseTypes");
}
export function MethodGetPropertiesOfType$constant(): Method {
    return new Method("getPropertiesOfType");
}
export function MethodGetIndexInfosOfType$constant(): Method {
    return new Method("getIndexInfosOfType");
}
export function MethodGetConstraintOfTypeParameter$constant(): Method {
    return new Method("getConstraintOfTypeParameter");
}
export function MethodGetTypeArguments$constant(): Method {
    return new Method("getTypeArguments");
}
export function MethodGetReferencesToSymbolInFile$constant(): Method {
    return new Method("getReferencesToSymbolInFile");
}
export function MethodGetReferencedSymbolsForNode$constant(): Method {
    return new Method("getReferencedSymbolsForNode");
}
export function MethodGetSignatureUsages$constant(): Method {
    return new Method("getSignatureUsages");
}
export function MethodGetCompletionsAtPosition$constant(): Method {
    return new Method("getCompletionsAtPosition");
}
export function MethodGetSyntacticDiagnostics$constant(): Method {
    return new Method("getSyntacticDiagnostics");
}
export function MethodGetSemanticDiagnostics$constant(): Method {
    return new Method("getSemanticDiagnostics");
}
export function MethodGetSuggestionDiagnostics$constant(): Method {
    return new Method("getSuggestionDiagnostics");
}
export function MethodGetDeclarationDiagnostics$constant(): Method {
    return new Method("getDeclarationDiagnostics");
}
export function MethodGetConfigFileParsingDiagnostics$constant(): Method {
    return new Method("getConfigFileParsingDiagnostics");
}
export function MethodPrintNode$constant(): Method {
    return new Method("printNode");
}
export function MethodGetAnyType$constant(): Method {
    return new Method("getAnyType");
}
export function MethodGetStringType$constant(): Method {
    return new Method("getStringType");
}
export function MethodGetNumberType$constant(): Method {
    return new Method("getNumberType");
}
export function MethodGetBooleanType$constant(): Method {
    return new Method("getBooleanType");
}
export function MethodGetVoidType$constant(): Method {
    return new Method("getVoidType");
}
export function MethodGetUndefinedType$constant(): Method {
    return new Method("getUndefinedType");
}
export function MethodGetNullType$constant(): Method {
    return new Method("getNullType");
}
export function MethodGetNeverType$constant(): Method {
    return new Method("getNeverType");
}
export function MethodGetUnknownType$constant(): Method {
    return new Method("getUnknownType");
}
export function MethodGetBigIntType$constant(): Method {
    return new Method("getBigIntType");
}
export function MethodGetESSymbolType$constant(): Method {
    return new Method("getESSymbolType");
}
export function MethodStartCPUProfile$constant(): Method {
    return new Method("startCPUProfile");
}
export function MethodStopCPUProfile$constant(): Method {
    return new Method("stopCPUProfile");
}
export function MethodSaveHeapProfile$constant(): Method {
    return new Method("saveHeapProfile");
}
export class InitializeResponse {
    declare private readonly $goType: void;
    public constructor(public UseCaseSensitiveFileNames: bool, public CurrentDirectory: gostring) {
    }
    static $copy($source: InitializeResponse): InitializeResponse {
        return new InitializeResponse($source.UseCaseSensitiveFileNames, $source.CurrentDirectory);
    }
    static $equal($left: InitializeResponse, $right: InitializeResponse): bool {
        return $left.UseCaseSensitiveFileNames === $right.UseCaseSensitiveFileNames && $left.CurrentDirectory === $right.CurrentDirectory;
    }
    static $hash($source: InitializeResponse): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.UseCaseSensitiveFileNames));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.CurrentDirectory));
        return $hash;
    }
    declare private readonly then?: never;
}
export type DocumentIdentifier$Storage = {
    FileName: gostring;
    URI: gostring;
};
export class DocumentIdentifier {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DocumentIdentifier$Storage) {
    }
    public static $storageOf($source: DocumentIdentifier): DocumentIdentifier$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DocumentIdentifier$Storage): DocumentIdentifier {
        return new DocumentIdentifier($source);
    }
    public get FileName(): gostring {
        return this.$storage.FileName;
    }
    public set FileName($value: gostring) {
        this.$storage.FileName = $value;
    }
    public get URI(): DocumentUri__from_lsproto {
        return new DocumentUri__from_lsproto(this.$storage.URI);
    }
    public set URI($value: DocumentUri__from_lsproto) {
        this.$storage.URI = $value.$value;
    }
    static $zero(): DocumentIdentifier {
        return new DocumentIdentifier({
            FileName: "",
            URI: ((void DocumentUri__from_lsproto,
                "") as string)
        });
    }
    static $copy($source: DocumentIdentifier): DocumentIdentifier {
        return new DocumentIdentifier({
            FileName: $source.$storage.FileName,
            URI: ((void DocumentUri__from_lsproto,
                $source.$storage.URI) as string)
        });
    }
    static $equal($left: DocumentIdentifier, $right: DocumentIdentifier): bool {
        return $left.$storage.FileName === $right.$storage.FileName && ((void DocumentUri__from_lsproto,
            $left.$storage.URI) as string)
            ===
                ((void DocumentUri__from_lsproto,
                    $right.$storage.URI) as string);
    }
    static $hash($source: DocumentIdentifier): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.FileName));
        $hash = GoMapHash.mix($hash, GoMapHash.string(((void DocumentUri__from_lsproto,
            $source.$storage.URI) as string)));
        return $hash;
    }
    declare private readonly then?: never;
    static UnmarshalJSONFrom(d: tsonicTypeScriptRuntime.Location<DocumentIdentifier> | undefined, dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_results_1 = Decoder__from_jsontext.ReadToken(dec);
        let tok = __gotots_results_1[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
        if (!(err === undefined)) {
            return err;
        }
        switch (tok.Kind()) {
            case 34: {
                DocumentIdentifier.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentIdentifier>).value).FileName = tok.String();
                return void 0;
                break;
            }
            case 123: {
                for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
                    const __gotots_results_2 = Decoder__from_jsontext.ReadToken(dec);
                    let key = __gotots_results_2[0];
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                    let isURI = key.String() === "uri";
                    const __gotots_results_3 = Decoder__from_jsontext.ReadToken(dec);
                    let val = __gotots_results_3[0];
                    err__shadow_1 = __gotots_results_3[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                    if (isURI) {
                        DocumentIdentifier.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentIdentifier>).value).URI =
                            ((void DocumentUri__from_lsproto,
                                val.String()) as string);
                    }
                }
                {
                    const __gotots_results_4 = Decoder__from_jsontext.ReadToken(dec);
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                }
                return void 0;
                break;
            }
            default: {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("DocumentIdentifier: expected string or object, got %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_jsontext$Kind(tok.Kind())])));
                break;
            }
        }
    }
    String(): gostring {
        if (!(((void DocumentUri__from_lsproto,
            DocumentIdentifier.$storageOf(this).URI) as string)
            ===
                ((void DocumentUri__from_lsproto,
                    "") as string))) {
            return ((void DocumentUri__from_lsproto,
                DocumentIdentifier.$storageOf(this).URI) as string);
        }
        return DocumentIdentifier.$storageOf(this).FileName;
    }
    ToAbsoluteFileName(cwd: gostring): gostring {
        if (!(((void DocumentUri__from_lsproto,
            DocumentIdentifier.$storageOf(this).URI) as string)
            ===
                ((void DocumentUri__from_lsproto,
                    "") as string))) {
            return new DocumentUri__from_lsproto(DocumentIdentifier.$storageOf(this).URI).FileName();
        }
        return GetNormalizedAbsolutePath__from_tspath(DocumentIdentifier.$storageOf(this).FileName, cwd);
    }
    ToFileName(): gostring {
        if (!(((void DocumentUri__from_lsproto,
            DocumentIdentifier.$storageOf(this).URI) as string)
            ===
                ((void DocumentUri__from_lsproto,
                    "") as string))) {
            return new DocumentUri__from_lsproto(DocumentIdentifier.$storageOf(this).URI).FileName();
        }
        return DocumentIdentifier.$storageOf(this).FileName;
    }
    ToURI(): DocumentUri__from_lsproto {
        if (!(((void DocumentUri__from_lsproto,
            DocumentIdentifier.$storageOf(this).URI) as string)
            ===
                ((void DocumentUri__from_lsproto,
                    "") as string))) {
            return new DocumentUri__from_lsproto(DocumentIdentifier.$storageOf(this).URI);
        }
        return FileNameToDocumentURI__from_lsconv(DocumentIdentifier.$storageOf(this).FileName);
    }
}
export class APIFileChanges {
    declare private readonly $goType: void;
    public constructor(public InvalidateAll: bool, public Changed: RuntimeSlice<DocumentIdentifier$Storage>, public Created: RuntimeSlice<DocumentIdentifier$Storage>, public Deleted: RuntimeSlice<DocumentIdentifier$Storage>) {
    }
    static $copy($source: APIFileChanges): APIFileChanges {
        return new APIFileChanges($source.InvalidateAll, $source.Changed, $source.Created, $source.Deleted);
    }
    declare private readonly then?: never;
}
export class UpdateSnapshotParams {
    declare private readonly $goType: void;
    public constructor(public OpenProject: gostring, public FileChanges: tsonicTypeScriptRuntime.Location<APIFileChanges> | undefined) {
    }
    static $zero(): UpdateSnapshotParams {
        return new UpdateSnapshotParams("", void 0);
    }
    static $copy($source: UpdateSnapshotParams): UpdateSnapshotParams {
        return new UpdateSnapshotParams($source.OpenProject, $source.FileChanges);
    }
    static $equal($left: UpdateSnapshotParams, $right: UpdateSnapshotParams): bool {
        return $left.OpenProject === $right.OpenProject &&
            tsonicTypeScriptRuntime.sameLocation($left.FileChanges, $right.FileChanges);
    }
    static $hash($source: UpdateSnapshotParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.OpenProject));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.FileChanges));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ProjectFileChanges {
    declare private readonly $goType: void;
    public constructor(public ChangedFiles: RuntimeSlice<gostring>, public DeletedFiles: RuntimeSlice<gostring>) {
    }
    static $zero(): ProjectFileChanges {
        return new ProjectFileChanges(RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>());
    }
    declare private readonly then?: never;
}
export class SnapshotChanges {
    declare private readonly $goType: void;
    public constructor(public ChangedProjects: GoMapValue<ProjectID, tsonicTypeScriptRuntime.Location<ProjectFileChanges> | undefined>, public RemovedProjects: RuntimeSlice<gostring>) {
    }
    static $zero(): SnapshotChanges {
        return new SnapshotChanges(GoMap.nil(), RuntimeSlice.nil<gostring>());
    }
    static $copy($source: SnapshotChanges): SnapshotChanges {
        return new SnapshotChanges($source.ChangedProjects, $source.RemovedProjects);
    }
    declare private readonly then?: never;
}
export class UpdateSnapshotResponse {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Projects: RuntimeSlice<{
        value: ProjectResponse;
    } | undefined>, public Changes: tsonicTypeScriptRuntime.Location<SnapshotChanges> | undefined) {
    }
    static $copy($source: UpdateSnapshotResponse): UpdateSnapshotResponse {
        return new UpdateSnapshotResponse($source.Snapshot, $source.Projects, $source.Changes);
    }
    declare private readonly then?: never;
}
export class ParseConfigFileParams {
    declare private readonly $goType: void;
    public constructor(public File: DocumentIdentifier) {
    }
    static $zero(): ParseConfigFileParams {
        return new ParseConfigFileParams(DocumentIdentifier.$zero());
    }
    static $copy($source: ParseConfigFileParams): ParseConfigFileParams {
        return new ParseConfigFileParams(DocumentIdentifier.$copy($source.File));
    }
    static $equal($left: ParseConfigFileParams, $right: ParseConfigFileParams): bool {
        return DocumentIdentifier.$equal($left.File, $right.File);
    }
    static $hash($source: ParseConfigFileParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ReleaseParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID) {
    }
    static $zero(): ReleaseParams {
        return new ReleaseParams(new SnapshotID(0n));
    }
    static $copy($source: ReleaseParams): ReleaseParams {
        return new ReleaseParams($source.Snapshot);
    }
    static $equal($left: ReleaseParams, $right: ReleaseParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value;
    }
    static $hash($source: ReleaseParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ProfileParams {
    declare private readonly $goType: void;
    public constructor(public Dir: gostring) {
    }
    static $zero(): ProfileParams {
        return new ProfileParams("");
    }
    static $copy($source: ProfileParams): ProfileParams {
        return new ProfileParams($source.Dir);
    }
    static $equal($left: ProfileParams, $right: ProfileParams): bool {
        return $left.Dir === $right.Dir;
    }
    static $hash($source: ProfileParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Dir));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ProfileResult {
    declare private readonly $goType: void;
    public constructor(public File: gostring) {
    }
    static $copy($source: ProfileResult): ProfileResult {
        return new ProfileResult($source.File);
    }
    static $equal($left: ProfileResult, $right: ProfileResult): bool {
        return $left.File === $right.File;
    }
    static $hash($source: ProfileResult): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.File));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ConfigFileResponse {
    declare private readonly $goType: void;
    public constructor(public FileNames: RuntimeSlice<gostring>, public Options: {
        value: CompilerOptions__from_core;
    } | undefined) {
    }
    static $copy($source: ConfigFileResponse): ConfigFileResponse {
        return new ConfigFileResponse($source.FileNames, $source.Options);
    }
    declare private readonly then?: never;
}
export class GetDefaultProjectForFileParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public File: DocumentIdentifier) {
    }
    static $zero(): GetDefaultProjectForFileParams {
        return new GetDefaultProjectForFileParams(new SnapshotID(0n), DocumentIdentifier.$zero());
    }
    static $copy($source: GetDefaultProjectForFileParams): GetDefaultProjectForFileParams {
        return new GetDefaultProjectForFileParams($source.Snapshot, DocumentIdentifier.$copy($source.File));
    }
    static $equal($left: GetDefaultProjectForFileParams, $right: GetDefaultProjectForFileParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && DocumentIdentifier.$equal($left.File, $right.File);
    }
    static $hash($source: GetDefaultProjectForFileParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ProjectResponse {
    declare private readonly $goType: void;
    public constructor(public Id: ProjectID, public ConfigFileName: gostring, public RootFiles: RuntimeSlice<gostring>, public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined) {
    }
    static $copy($source: ProjectResponse): ProjectResponse {
        return new ProjectResponse($source.Id, $source.ConfigFileName, $source.RootFiles, $source.CompilerOptions);
    }
    declare private readonly then?: never;
}
export function NewProjectResponse(p: {
    value: Project__from_project;
} | undefined): {
    value: ProjectResponse;
} | undefined {
    return { value: new ProjectResponse(ProjectHandle(p), Project__from_project.Name(p), ParsedCommandLine__from_tsoptions.FileNames((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine), ParsedCommandLine__from_tsoptions.CompilerOptions((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine)) };
}
export class GetSymbolAtPositionParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier, public Position: uint32) {
    }
    static $zero(): GetSymbolAtPositionParams {
        return new GetSymbolAtPositionParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero(), 0);
    }
    static $copy($source: GetSymbolAtPositionParams): GetSymbolAtPositionParams {
        return new GetSymbolAtPositionParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File), $source.Position);
    }
    static $equal($left: GetSymbolAtPositionParams, $right: GetSymbolAtPositionParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && DocumentIdentifier.$equal($left.File, $right.File) && $left.Position === $right.Position;
    }
    static $hash($source: GetSymbolAtPositionParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Position));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetSymbolsAtPositionsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier, public Positions: RuntimeSlice<uint32>) {
    }
    static $zero(): GetSymbolsAtPositionsParams {
        return new GetSymbolsAtPositionsParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero(), RuntimeSlice.nil<uint32>());
    }
    static $copy($source: GetSymbolsAtPositionsParams): GetSymbolsAtPositionsParams {
        return new GetSymbolsAtPositionsParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File), $source.Positions);
    }
    declare private readonly then?: never;
}
export class GetSymbolAtLocationParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Location: NodeHandle) {
    }
    static $zero(): GetSymbolAtLocationParams {
        return new GetSymbolAtLocationParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""));
    }
    static $copy($source: GetSymbolAtLocationParams): GetSymbolAtLocationParams {
        return new GetSymbolAtLocationParams($source.Snapshot, $source.Project, $source.Location);
    }
    static $equal($left: GetSymbolAtLocationParams, $right: GetSymbolAtLocationParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Location.$value === $right.Location.$value;
    }
    static $hash($source: GetSymbolAtLocationParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetSymbolsAtLocationsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Locations: RuntimeSlice<gostring>) {
    }
    static $zero(): GetSymbolsAtLocationsParams {
        return new GetSymbolsAtLocationsParams(new SnapshotID(0n), new ProjectID(""), RuntimeSlice.nil<gostring>());
    }
    static $copy($source: GetSymbolsAtLocationsParams): GetSymbolsAtLocationsParams {
        return new GetSymbolsAtLocationsParams($source.Snapshot, $source.Project, $source.Locations);
    }
    declare private readonly then?: never;
}
export class SymbolResponse {
    declare private readonly $goType: void;
    public constructor(public Id: SymbolID, public Name: gostring, public Flags: uint32, public CheckFlags: uint32, public Declarations: RuntimeSlice<gostring>, public ValueDeclaration: NodeHandle) {
    }
    static $copy($source: SymbolResponse): SymbolResponse {
        return new SymbolResponse($source.Id, $source.Name, $source.Flags, $source.CheckFlags, $source.Declarations, $source.ValueDeclaration);
    }
    declare private readonly then?: never;
}
export function NewSymbolResponse(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): {
    value: SymbolResponse;
} | undefined {
    let resp: {
        value: SymbolResponse;
    } | undefined = { value: new SymbolResponse(SymbolHandle(__go_symbol), Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags, RuntimeSlice.nil<gostring>(), new NodeHandle("")) };
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declarations = RuntimeSlice.make<gostring>(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length, null, ((void NodeHandle,
            "") as gostring));
    }
    return resp;
}
export class GetTypeOfSymbolParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Symbol: SymbolID) {
    }
    static $zero(): GetTypeOfSymbolParams {
        return new GetTypeOfSymbolParams(new SnapshotID(0n), new ProjectID(""), new SymbolID(0n));
    }
    static $copy($source: GetTypeOfSymbolParams): GetTypeOfSymbolParams {
        return new GetTypeOfSymbolParams($source.Snapshot, $source.Project, $source.Symbol);
    }
    static $equal($left: GetTypeOfSymbolParams, $right: GetTypeOfSymbolParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Symbol.$value === $right.Symbol.$value;
    }
    static $hash($source: GetTypeOfSymbolParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypesOfSymbolsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Symbols: RuntimeSlice<uint64>) {
    }
    static $zero(): GetTypesOfSymbolsParams {
        return new GetTypesOfSymbolsParams(new SnapshotID(0n), new ProjectID(""), RuntimeSlice.nil<uint64>());
    }
    static $copy($source: GetTypesOfSymbolsParams): GetTypesOfSymbolsParams {
        return new GetTypesOfSymbolsParams($source.Snapshot, $source.Project, $source.Symbols);
    }
    declare private readonly then?: never;
}
export class TypeResponse {
    declare private readonly $goType: void;
    public constructor(public Id: TypeID, public Flags: uint32, public ObjectFlags: uint32, public Value: GoInterface | undefined, public Target: TypeID, public TypeParameters: RuntimeSlice<TypeID>, public OuterTypeParameters: RuntimeSlice<TypeID>, public LocalTypeParameters: RuntimeSlice<TypeID>, public ElementFlags: RuntimeSlice<ElementFlags__from_checker>, public FixedLength: tsonicTypeScriptRuntime.Location<int> | undefined, public TupleReadonly: tsonicTypeScriptRuntime.Location<bool> | undefined, public ObjectType: TypeID, public IndexType: TypeID, public CheckType: TypeID, public ExtendsType: TypeID, public BaseType: TypeID, public SubstConstraint: TypeID, public Texts: RuntimeSlice<gostring>, public FreshType: TypeID, public RegularType: TypeID, public IsThisType: bool, public IntrinsicName: gostring, public AliasTypeArguments: RuntimeSlice<TypeID>, public AliasSymbol: SymbolID, public Symbol: SymbolID) {
    }
    static $copy($source: TypeResponse): TypeResponse {
        return new TypeResponse($source.Id, $source.Flags, $source.ObjectFlags, $source.Value, $source.Target, $source.TypeParameters, $source.OuterTypeParameters, $source.LocalTypeParameters, $source.ElementFlags, $source.FixedLength, $source.TupleReadonly, $source.ObjectType, $source.IndexType, $source.CheckType, $source.ExtendsType, $source.BaseType, $source.SubstConstraint, $source.Texts, $source.FreshType, $source.RegularType, $source.IsThisType, $source.IntrinsicName, $source.AliasTypeArguments, $source.AliasSymbol, $source.Symbol);
    }
    declare private readonly then?: never;
}
export function newTypeData(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<TypeResponse> | undefined {
    let resp: tsonicTypeScriptRuntime.Location<TypeResponse> | undefined = tsonicTypeScriptRuntime.location<TypeResponse>(new TypeResponse(TypeHandle(t), Type__from_checker.Flags(t), 0, void 0, 0, RuntimeSlice.nil<TypeID>(), RuntimeSlice.nil<TypeID>(), RuntimeSlice.nil<TypeID>(), RuntimeSlice.nil<ElementFlags__from_checker>(), void 0, void 0, 0, 0, 0, 0, 0, 0, RuntimeSlice.nil<gostring>(), 0, 0, false, "", RuntimeSlice.nil<TypeID>(), new SymbolID(0n), new SymbolID(0n)));
    if (!(Type__from_checker.Symbol(t) === undefined)) {
        ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Symbol = SymbolHandle(Type__from_checker.Symbol(t));
    }
    if (!(Type__from_checker.Alias(t) === undefined)) {
        ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.AliasTypeArguments = typeHandles(TypeAlias__from_checker.TypeArguments(Type__from_checker.Alias(t)));
        if (!(TypeAlias__from_checker.Symbol(Type__from_checker.Alias(t)) === undefined)) {
            ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.AliasSymbol = SymbolHandle(TypeAlias__from_checker.Symbol(Type__from_checker.Alias(t)));
        }
    }
    {
        let flags = Type__from_checker.Flags(t);
        __gotots_control_target_0: {
            if (!((flags & TypeFlagsFreshable$constant__from_checker()) >>> 0 === 0)) {
                let lit: {
                    value: LiteralType__from_checker;
                } | undefined = Type__from_checker.AsLiteralType(t);
                if (!((flags & TypeFlagsLiteral$constant__from_checker()) >>> 0 === 0)) {
                    ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Value = literalValueToJSON(LiteralType__from_checker.Value(lit));
                }
                if (!(LiteralType__from_checker.FreshType(lit) === undefined)) {
                    ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.FreshType = TypeHandle(LiteralType__from_checker.FreshType(lit));
                }
                if (!(LiteralType__from_checker.RegularType(lit) === undefined)) {
                    ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.RegularType = TypeHandle(LiteralType__from_checker.RegularType(lit));
                }
            }
            else if (!((flags & TypeFlagsObject$constant__from_checker()) >>> 0 === 0)) {
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.ObjectFlags = Type__from_checker.ObjectFlags(t);
                let objectFlags = Type__from_checker.ObjectFlags(t);
                if (!((objectFlags & ObjectFlagsReference$constant__from_checker()) >>> 0 === 0)) {
                    let ref: tsonicTypeScriptRuntime.Location<TypeReference__from_checker> | undefined = void 0;
                    if (!((objectFlags & ObjectFlagsTuple$constant__from_checker()) >>> 0 === 0)) {
                        let tuple: {
                            value: TupleType__from_checker;
                        } | undefined = Type__from_checker.AsTupleType(t);
                        const __gotots_store_0 = (tuple ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InterfaceType;
                        ref = TypeReference__from_checker.AsTypeReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "TypeReference"));
                        ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.ElementFlags = TupleType__from_checker.ElementFlags(tuple);
                        let fixedLen = TupleType__from_checker.FixedLength(tuple);
                        const fixedLen$location = tsonicTypeScriptRuntime.boundLocation({}, () => fixedLen, fixedLen$next => fixedLen = fixedLen$next);
                        ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.FixedLength =
                            fixedLen$location;
                        let isReadonly = TupleType__from_checker.IsReadonly(tuple);
                        const isReadonly$location = tsonicTypeScriptRuntime.boundLocation({}, () => isReadonly, isReadonly$next => isReadonly = isReadonly$next);
                        ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.TupleReadonly =
                            isReadonly$location;
                    }
                    else {
                        ref = Type__from_checker.AsTypeReference(t);
                    }
                    const __gotots_store_1 = ((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference__from_checker>).value.ObjectType.StructuredType.ConstrainedType.TypeBase;
                    if (!(Type__from_checker.Target(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Type")) === undefined)) {
                        const __gotots_store_2 = ((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference__from_checker>).value.ObjectType.StructuredType.ConstrainedType.TypeBase;
                        const __gotots_argument_1 = Type__from_checker.Target(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Type"));
                        ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Target = TypeHandle(__gotots_argument_1);
                    }
                }
                if (!((objectFlags & ObjectFlagsClassOrInterface$constant__from_checker()) >>> 0 === 0)) {
                    let iface: tsonicTypeScriptRuntime.Location<InterfaceType__from_checker> | undefined = Type__from_checker.AsInterfaceType(t);
                    ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.TypeParameters = typeHandles(InterfaceType__from_checker.TypeParameters(iface));
                    ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.OuterTypeParameters = typeHandles(InterfaceType__from_checker.OuterTypeParameters(iface));
                    ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.LocalTypeParameters = typeHandles(InterfaceType__from_checker.LocalTypeParameters(iface));
                }
            }
            else if (!((flags & TypeFlagsUnionOrIntersection$constant__from_checker()) >>> 0 === 0)) {
            }
            else if (!((flags & TypeFlagsIndex$constant__from_checker()) >>> 0 === 0)) {
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Target = TypeHandle(IndexType__from_checker.Target(Type__from_checker.AsIndexType(t)));
            }
            else if (!((flags & TypeFlagsIndexedAccess$constant__from_checker()) >>> 0 === 0)) {
                let data: {
                    value: IndexedAccessType__from_checker;
                } | undefined = Type__from_checker.AsIndexedAccessType(t);
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.ObjectType = TypeHandle(IndexedAccessType__from_checker.ObjectType(data));
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.IndexType = TypeHandle(IndexedAccessType__from_checker.IndexType(data));
            }
            else if (!((flags & TypeFlagsConditional$constant__from_checker()) >>> 0 === 0)) {
                let data: {
                    value: ConditionalType__from_checker;
                } | undefined = Type__from_checker.AsConditionalType(t);
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.CheckType = TypeHandle(ConditionalType__from_checker.CheckType(data));
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.ExtendsType = TypeHandle(ConditionalType__from_checker.ExtendsType(data));
            }
            else if (!((flags & TypeFlagsSubstitution$constant__from_checker()) >>> 0 === 0)) {
                let data: {
                    value: SubstitutionType__from_checker;
                } | undefined = Type__from_checker.AsSubstitutionType(t);
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.BaseType = TypeHandle(SubstitutionType__from_checker.BaseType(data));
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.SubstConstraint = TypeHandle(SubstitutionType__from_checker.SubstConstraint(data));
            }
            else if (!((flags & TypeFlagsTemplateLiteral$constant__from_checker()) >>> 0 === 0)) {
                let tl: {
                    value: TemplateLiteralType__from_checker;
                } | undefined = Type__from_checker.AsTemplateLiteralType(t);
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Texts = TemplateLiteralType__from_checker.Texts(tl);
            }
            else if (!((flags & TypeFlagsStringMapping$constant__from_checker()) >>> 0 === 0)) {
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.Target = TypeHandle(StringMappingType__from_checker.Target(Type__from_checker.AsStringMappingType(t)));
            }
            else if (!((flags & TypeFlagsTypeParameter$constant__from_checker()) >>> 0 === 0)) {
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.IsThisType = TypeParameter__from_checker.IsThisType(Type__from_checker.AsTypeParameter(t));
            }
            else if (!((flags & TypeFlagsIntrinsic$constant__from_checker()) >>> 0 === 0)) {
                ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeResponse>).value.IntrinsicName = IntrinsicType__from_checker.IntrinsicName(Type__from_checker.AsIntrinsicType(t));
            }
        }
    }
    return resp;
}
export function typeHandles(types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<TypeID> {
    if (types.length === 0) {
        return RuntimeSlice.nil<TypeID>();
    }
    let handles = RuntimeSlice.make<TypeID>(types.length, null, 0);
    const __gotots_range_3 = types;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_6 = __gotots_range_index_3;
        const __gotots_range_value_7 = __gotots_range_3.get(__gotots_range_index_3);
        let i = __gotots_range_value_6;
        let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = __gotots_range_value_7;
        handles.set(i, TypeHandle(t));
    }
    return handles;
}
export function literalValueToJSON(value: GoInterface | undefined): GoInterface | undefined {
    const __gotots_type_switch_0: GoInterface | undefined = value;
    switch (true) {
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let v: gostring = __gotots_type_switch_0.$go$value;
            return new GoInterfaceAdapter(v);
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
            let v: Number__from_jsnum = __gotots_type_switch_0.$go$value;
            return new $goInterfaceAdapter$float64(v.$value);
            break;
        }
        case $goInterfaceAdapter$bool.$is(__gotots_type_switch_0): {
            let v: bool = __gotots_type_switch_0.$go$value;
            return new $goInterfaceAdapter$bool(v);
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_0): {
            let v: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_0.$go$value);
            return new GoInterfaceAdapter(v.String());
            break;
        }
        default: {
            let v: GoInterface | undefined = __gotots_type_switch_0;
            return void 0;
            break;
        }
    }
}
export class SignatureResponse {
    declare private readonly $goType: void;
    public constructor(public Id: SignatureID, public Flags: uint32, public Declaration: NodeHandle, public TypeParameters: RuntimeSlice<TypeID>, public Parameters: RuntimeSlice<uint64>, public ThisParameter: SymbolID, public Target: SignatureID) {
    }
    static $copy($source: SignatureResponse): SignatureResponse {
        return new SignatureResponse($source.Id, $source.Flags, $source.Declaration, $source.TypeParameters, $source.Parameters, $source.ThisParameter, $source.Target);
    }
    declare private readonly then?: never;
}
export class GetSourceFileParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier) {
    }
    static $zero(): GetSourceFileParams {
        return new GetSourceFileParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero());
    }
    static $copy($source: GetSourceFileParams): GetSourceFileParams {
        return new GetSourceFileParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File));
    }
    static $equal($left: GetSourceFileParams, $right: GetSourceFileParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && DocumentIdentifier.$equal($left.File, $right.File);
    }
    static $hash($source: GetSourceFileParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ResolveNameParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Name: gostring, public Location: NodeHandle, public File: tsonicTypeScriptRuntime.Location<DocumentIdentifier> | undefined, public Position: tsonicTypeScriptRuntime.Location<uint32> | undefined, public Meaning: uint32, public ExcludeGlobals: bool) {
    }
    static $zero(): ResolveNameParams {
        return new ResolveNameParams(new SnapshotID(0n), new ProjectID(""), "", new NodeHandle(""), void 0, void 0, 0, false);
    }
    static $copy($source: ResolveNameParams): ResolveNameParams {
        return new ResolveNameParams($source.Snapshot, $source.Project, $source.Name, $source.Location, $source.File, $source.Position, $source.Meaning, $source.ExcludeGlobals);
    }
    static $equal($left: ResolveNameParams, $right: ResolveNameParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Name === $right.Name && $left.Location.$value === $right.Location.$value &&
            tsonicTypeScriptRuntime.sameLocation($left.File, $right.File) &&
            tsonicTypeScriptRuntime.sameLocation($left.Position, $right.Position) && $left.Meaning === $right.Meaning && $left.ExcludeGlobals === $right.ExcludeGlobals;
    }
    static $hash($source: ResolveNameParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Name));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.File));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Position));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Meaning));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.ExcludeGlobals));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetParentOfSymbolParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Symbol: SymbolID) {
    }
    static $zero(): GetParentOfSymbolParams {
        return new GetParentOfSymbolParams(new SnapshotID(0n), new SymbolID(0n));
    }
    static $copy($source: GetParentOfSymbolParams): GetParentOfSymbolParams {
        return new GetParentOfSymbolParams($source.Snapshot, $source.Symbol);
    }
    static $equal($left: GetParentOfSymbolParams, $right: GetParentOfSymbolParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Symbol.$value === $right.Symbol.$value;
    }
    static $hash($source: GetParentOfSymbolParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetMembersOfSymbolParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Symbol: SymbolID) {
    }
    static $zero(): GetMembersOfSymbolParams {
        return new GetMembersOfSymbolParams(new SnapshotID(0n), new SymbolID(0n));
    }
    static $copy($source: GetMembersOfSymbolParams): GetMembersOfSymbolParams {
        return new GetMembersOfSymbolParams($source.Snapshot, $source.Symbol);
    }
    static $equal($left: GetMembersOfSymbolParams, $right: GetMembersOfSymbolParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Symbol.$value === $right.Symbol.$value;
    }
    static $hash($source: GetMembersOfSymbolParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetExportsOfSymbolParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Symbol: SymbolID) {
    }
    static $zero(): GetExportsOfSymbolParams {
        return new GetExportsOfSymbolParams(new SnapshotID(0n), new SymbolID(0n));
    }
    static $copy($source: GetExportsOfSymbolParams): GetExportsOfSymbolParams {
        return new GetExportsOfSymbolParams($source.Snapshot, $source.Symbol);
    }
    static $equal($left: GetExportsOfSymbolParams, $right: GetExportsOfSymbolParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Symbol.$value === $right.Symbol.$value;
    }
    static $hash($source: GetExportsOfSymbolParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetExportSymbolOfSymbolParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Symbol: SymbolID) {
    }
    static $zero(): GetExportSymbolOfSymbolParams {
        return new GetExportSymbolOfSymbolParams(new SnapshotID(0n), new SymbolID(0n));
    }
    static $copy($source: GetExportSymbolOfSymbolParams): GetExportSymbolOfSymbolParams {
        return new GetExportSymbolOfSymbolParams($source.Snapshot, $source.Symbol);
    }
    static $equal($left: GetExportSymbolOfSymbolParams, $right: GetExportSymbolOfSymbolParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Symbol.$value === $right.Symbol.$value;
    }
    static $hash($source: GetExportSymbolOfSymbolParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetSymbolOfTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Type: TypeID) {
    }
    static $zero(): GetSymbolOfTypeParams {
        return new GetSymbolOfTypeParams(new SnapshotID(0n), 0);
    }
    static $copy($source: GetSymbolOfTypeParams): GetSymbolOfTypeParams {
        return new GetSymbolOfTypeParams($source.Snapshot, $source.Type);
    }
    static $equal($left: GetSymbolOfTypeParams, $right: GetSymbolOfTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Type === $right.Type;
    }
    static $hash($source: GetSymbolOfTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypePropertyParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Type: TypeID) {
    }
    static $zero(): GetTypePropertyParams {
        return new GetTypePropertyParams(new SnapshotID(0n), 0);
    }
    static $copy($source: GetTypePropertyParams): GetTypePropertyParams {
        return new GetTypePropertyParams($source.Snapshot, $source.Type);
    }
    static $equal($left: GetTypePropertyParams, $right: GetTypePropertyParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Type === $right.Type;
    }
    static $hash($source: GetTypePropertyParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetContextualTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Location: NodeHandle) {
    }
    static $zero(): GetContextualTypeParams {
        return new GetContextualTypeParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""));
    }
    static $copy($source: GetContextualTypeParams): GetContextualTypeParams {
        return new GetContextualTypeParams($source.Snapshot, $source.Project, $source.Location);
    }
    static $equal($left: GetContextualTypeParams, $right: GetContextualTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Location.$value === $right.Location.$value;
    }
    static $hash($source: GetContextualTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypeOfSymbolAtLocationParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Symbol: SymbolID, public Location: NodeHandle) {
    }
    static $zero(): GetTypeOfSymbolAtLocationParams {
        return new GetTypeOfSymbolAtLocationParams(new SnapshotID(0n), new ProjectID(""), new SymbolID(0n), new NodeHandle(""));
    }
    static $copy($source: GetTypeOfSymbolAtLocationParams): GetTypeOfSymbolAtLocationParams {
        return new GetTypeOfSymbolAtLocationParams($source.Snapshot, $source.Project, $source.Symbol, $source.Location);
    }
    static $equal($left: GetTypeOfSymbolAtLocationParams, $right: GetTypeOfSymbolAtLocationParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Symbol.$value === $right.Symbol.$value && $left.Location.$value === $right.Location.$value;
    }
    static $hash($source: GetTypeOfSymbolAtLocationParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetReferencesToSymbolInFileParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier, public Symbol: SymbolID) {
    }
    static $zero(): GetReferencesToSymbolInFileParams {
        return new GetReferencesToSymbolInFileParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero(), new SymbolID(0n));
    }
    static $copy($source: GetReferencesToSymbolInFileParams): GetReferencesToSymbolInFileParams {
        return new GetReferencesToSymbolInFileParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File), $source.Symbol);
    }
    static $equal($left: GetReferencesToSymbolInFileParams, $right: GetReferencesToSymbolInFileParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && DocumentIdentifier.$equal($left.File, $right.File) && $left.Symbol.$value === $right.Symbol.$value;
    }
    static $hash($source: GetReferencesToSymbolInFileParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Symbol.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetReferencedSymbolsForNodeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Node: NodeHandle, public Position: int) {
    }
    static $zero(): GetReferencedSymbolsForNodeParams {
        return new GetReferencedSymbolsForNodeParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""), 0);
    }
    static $copy($source: GetReferencedSymbolsForNodeParams): GetReferencedSymbolsForNodeParams {
        return new GetReferencedSymbolsForNodeParams($source.Snapshot, $source.Project, $source.Node, $source.Position);
    }
    static $equal($left: GetReferencedSymbolsForNodeParams, $right: GetReferencedSymbolsForNodeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Node.$value === $right.Node.$value && $left.Position === $right.Position;
    }
    static $hash($source: GetReferencedSymbolsForNodeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Node.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Position));
        return $hash;
    }
    declare private readonly then?: never;
}
export type ReferencedSymbolEntry$Storage = {
    Definition: gostring;
    Symbol: {
        value: SymbolResponse;
    } | undefined;
    References: RuntimeSlice<gostring>;
};
export class ReferencedSymbolEntry {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ReferencedSymbolEntry$Storage) {
    }
    public static $storageOf($source: ReferencedSymbolEntry): ReferencedSymbolEntry$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ReferencedSymbolEntry$Storage): ReferencedSymbolEntry {
        return new ReferencedSymbolEntry($source);
    }
    public get Definition(): NodeHandle {
        return new NodeHandle(this.$storage.Definition);
    }
    public set Definition($value: NodeHandle) {
        this.$storage.Definition = $value.$value;
    }
    public get Symbol(): {
        value: SymbolResponse;
    } | undefined {
        return this.$storage.Symbol;
    }
    public set Symbol($value: {
        value: SymbolResponse;
    } | undefined) {
        this.$storage.Symbol = $value;
    }
    public get References(): RuntimeSlice<gostring> {
        return this.$storage.References;
    }
    public set References($value: RuntimeSlice<gostring>) {
        this.$storage.References = $value;
    }
    static $zero(): ReferencedSymbolEntry {
        return new ReferencedSymbolEntry({
            Definition: ((void NodeHandle,
                "") as gostring),
            Symbol: void 0,
            References: RuntimeSlice.nil<gostring>()
        });
    }
    static $copy($source: ReferencedSymbolEntry): ReferencedSymbolEntry {
        return new ReferencedSymbolEntry({
            Definition: ((void NodeHandle,
                $source.$storage.Definition) as gostring),
            Symbol: $source.$storage.Symbol,
            References: $source.$storage.References
        });
    }
    declare private readonly then?: never;
}
export class GetSignatureUsagesParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public SignatureDecl: NodeHandle) {
    }
    static $zero(): GetSignatureUsagesParams {
        return new GetSignatureUsagesParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""));
    }
    static $copy($source: GetSignatureUsagesParams): GetSignatureUsagesParams {
        return new GetSignatureUsagesParams($source.Snapshot, $source.Project, $source.SignatureDecl);
    }
    static $equal($left: GetSignatureUsagesParams, $right: GetSignatureUsagesParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.SignatureDecl.$value === $right.SignatureDecl.$value;
    }
    static $hash($source: GetSignatureUsagesParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.SignatureDecl.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export type SignatureUsageResponse$Storage = {
    Name: gostring;
    Call: gostring;
};
export class SignatureUsageResponse {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SignatureUsageResponse$Storage) {
    }
    public static $storageOf($source: SignatureUsageResponse): SignatureUsageResponse$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SignatureUsageResponse$Storage): SignatureUsageResponse {
        return new SignatureUsageResponse($source);
    }
    public get Name(): NodeHandle {
        return new NodeHandle(this.$storage.Name);
    }
    public set Name($value: NodeHandle) {
        this.$storage.Name = $value.$value;
    }
    public get Call(): NodeHandle {
        return new NodeHandle(this.$storage.Call);
    }
    public set Call($value: NodeHandle) {
        this.$storage.Call = $value.$value;
    }
    static $zero(): SignatureUsageResponse {
        return new SignatureUsageResponse({
            Name: ((void NodeHandle,
                "") as gostring),
            Call: ((void NodeHandle,
                "") as gostring)
        });
    }
    static $copy($source: SignatureUsageResponse): SignatureUsageResponse {
        return new SignatureUsageResponse({
            Name: ((void NodeHandle,
                $source.$storage.Name) as gostring),
            Call: ((void NodeHandle,
                $source.$storage.Call) as gostring)
        });
    }
    static $equal($left: SignatureUsageResponse, $right: SignatureUsageResponse): bool {
        return ((void NodeHandle,
            $left.$storage.Name) as gostring)
            ===
                ((void NodeHandle,
                    $right.$storage.Name) as gostring) && ((void NodeHandle,
            $left.$storage.Call) as gostring)
            ===
                ((void NodeHandle,
                    $right.$storage.Call) as gostring);
    }
    static $hash($source: SignatureUsageResponse): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string(((void NodeHandle,
            $source.$storage.Name) as gostring)));
        $hash = GoMapHash.mix($hash, GoMapHash.string(((void NodeHandle,
            $source.$storage.Call) as gostring)));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetCompletionsAtPositionParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier, public Position: uint32, public TriggerCharacter: tsonicTypeScriptRuntime.Location<gostring> | undefined, public IncludeSymbol: bool) {
    }
    static $zero(): GetCompletionsAtPositionParams {
        return new GetCompletionsAtPositionParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero(), 0, void 0, false);
    }
    static $copy($source: GetCompletionsAtPositionParams): GetCompletionsAtPositionParams {
        return new GetCompletionsAtPositionParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File), $source.Position, $source.TriggerCharacter, $source.IncludeSymbol);
    }
    static $equal($left: GetCompletionsAtPositionParams, $right: GetCompletionsAtPositionParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && DocumentIdentifier.$equal($left.File, $right.File) && $left.Position === $right.Position &&
            tsonicTypeScriptRuntime.sameLocation($left.TriggerCharacter, $right.TriggerCharacter) && $left.IncludeSymbol === $right.IncludeSymbol;
    }
    static $hash($source: GetCompletionsAtPositionParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Position));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.TriggerCharacter));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.IncludeSymbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CompletionEntryLabelDetailsResponse {
    declare private readonly $goType: void;
    public constructor(public Detail: tsonicTypeScriptRuntime.Location<gostring> | undefined, public Description: tsonicTypeScriptRuntime.Location<gostring> | undefined) {
    }
    static $copy($source: CompletionEntryLabelDetailsResponse): CompletionEntryLabelDetailsResponse {
        return new CompletionEntryLabelDetailsResponse($source.Detail, $source.Description);
    }
    static $equal($left: CompletionEntryLabelDetailsResponse, $right: CompletionEntryLabelDetailsResponse): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.Detail, $right.Detail)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.Description, $right.Description);
    }
    static $hash($source: CompletionEntryLabelDetailsResponse): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Detail));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Description));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CompletionEntryResponse {
    declare private readonly $goType: void;
    public constructor(public Name: gostring, public Kind: uint32, public SortText: tsonicTypeScriptRuntime.Location<gostring> | undefined, public InsertText: tsonicTypeScriptRuntime.Location<gostring> | undefined, public FilterText: tsonicTypeScriptRuntime.Location<gostring> | undefined, public Detail: tsonicTypeScriptRuntime.Location<gostring> | undefined, public LabelDetails: {
        value: CompletionEntryLabelDetailsResponse;
    } | undefined, public Symbol: {
        value: SymbolResponse;
    } | undefined) {
    }
    static $copy($source: CompletionEntryResponse): CompletionEntryResponse {
        return new CompletionEntryResponse($source.Name, $source.Kind, $source.SortText, $source.InsertText, $source.FilterText, $source.Detail, $source.LabelDetails, $source.Symbol);
    }
    static $equal($left: CompletionEntryResponse, $right: CompletionEntryResponse): bool {
        return $left.Name === $right.Name && $left.Kind === $right.Kind &&
            tsonicTypeScriptRuntime.sameLocation($left.SortText, $right.SortText) &&
            tsonicTypeScriptRuntime.sameLocation($left.InsertText, $right.InsertText) &&
            tsonicTypeScriptRuntime.sameLocation($left.FilterText, $right.FilterText) &&
            tsonicTypeScriptRuntime.sameLocation($left.Detail, $right.Detail) &&
            $left.LabelDetails
                ===
                    $right.LabelDetails &&
            $left.Symbol
                ===
                    $right.Symbol;
    }
    static $hash($source: CompletionEntryResponse): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Name));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.SortText));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.InsertText));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.FilterText));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Detail));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.LabelDetails));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.Symbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CompletionInfoResponse {
    declare private readonly $goType: void;
    public constructor(public IsIncomplete: bool, public Entries: RuntimeSlice<{
        value: CompletionEntryResponse;
    } | undefined>) {
    }
    static $copy($source: CompletionInfoResponse): CompletionInfoResponse {
        return new CompletionInfoResponse($source.IsIncomplete, $source.Entries);
    }
    declare private readonly then?: never;
}
export class GetIntrinsicTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID) {
    }
    static $zero(): GetIntrinsicTypeParams {
        return new GetIntrinsicTypeParams(new SnapshotID(0n), new ProjectID(""));
    }
    static $copy($source: GetIntrinsicTypeParams): GetIntrinsicTypeParams {
        return new GetIntrinsicTypeParams($source.Snapshot, $source.Project);
    }
    static $equal($left: GetIntrinsicTypeParams, $right: GetIntrinsicTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value;
    }
    static $hash($source: GetIntrinsicTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetBaseTypeOfLiteralTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID) {
    }
    static $zero(): GetBaseTypeOfLiteralTypeParams {
        return new GetBaseTypeOfLiteralTypeParams(new SnapshotID(0n), new ProjectID(""), 0);
    }
    static $copy($source: GetBaseTypeOfLiteralTypeParams): GetBaseTypeOfLiteralTypeParams {
        return new GetBaseTypeOfLiteralTypeParams($source.Snapshot, $source.Project, $source.Type);
    }
    static $equal($left: GetBaseTypeOfLiteralTypeParams, $right: GetBaseTypeOfLiteralTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type;
    }
    static $hash($source: GetBaseTypeOfLiteralTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetNonNullableTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID) {
    }
    static $zero(): GetNonNullableTypeParams {
        return new GetNonNullableTypeParams(new SnapshotID(0n), new ProjectID(""), 0);
    }
    static $copy($source: GetNonNullableTypeParams): GetNonNullableTypeParams {
        return new GetNonNullableTypeParams($source.Snapshot, $source.Project, $source.Type);
    }
    static $equal($left: GetNonNullableTypeParams, $right: GetNonNullableTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type;
    }
    static $hash($source: GetNonNullableTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypeFromTypeNodeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Location: NodeHandle) {
    }
    static $zero(): GetTypeFromTypeNodeParams {
        return new GetTypeFromTypeNodeParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""));
    }
    static $copy($source: GetTypeFromTypeNodeParams): GetTypeFromTypeNodeParams {
        return new GetTypeFromTypeNodeParams($source.Snapshot, $source.Project, $source.Location);
    }
    static $equal($left: GetTypeFromTypeNodeParams, $right: GetTypeFromTypeNodeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Location.$value === $right.Location.$value;
    }
    static $hash($source: GetTypeFromTypeNodeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetWidenedTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID) {
    }
    static $zero(): GetWidenedTypeParams {
        return new GetWidenedTypeParams(new SnapshotID(0n), new ProjectID(""), 0);
    }
    static $copy($source: GetWidenedTypeParams): GetWidenedTypeParams {
        return new GetWidenedTypeParams($source.Snapshot, $source.Project, $source.Type);
    }
    static $equal($left: GetWidenedTypeParams, $right: GetWidenedTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type;
    }
    static $hash($source: GetWidenedTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetParameterTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Signature: SignatureID, public Index: int32) {
    }
    static $zero(): GetParameterTypeParams {
        return new GetParameterTypeParams(new SnapshotID(0n), new ProjectID(""), new SignatureID(0n), 0);
    }
    static $copy($source: GetParameterTypeParams): GetParameterTypeParams {
        return new GetParameterTypeParams($source.Snapshot, $source.Project, $source.Signature, $source.Index);
    }
    static $equal($left: GetParameterTypeParams, $right: GetParameterTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Signature.$value === $right.Signature.$value && $left.Index === $right.Index;
    }
    static $hash($source: GetParameterTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Signature.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Index));
        return $hash;
    }
    declare private readonly then?: never;
}
export class IsArrayLikeTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID) {
    }
    static $zero(): IsArrayLikeTypeParams {
        return new IsArrayLikeTypeParams(new SnapshotID(0n), new ProjectID(""), 0);
    }
    static $copy($source: IsArrayLikeTypeParams): IsArrayLikeTypeParams {
        return new IsArrayLikeTypeParams($source.Snapshot, $source.Project, $source.Type);
    }
    static $equal($left: IsArrayLikeTypeParams, $right: IsArrayLikeTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type;
    }
    static $hash($source: IsArrayLikeTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class IsTypeAssignableToParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Source: TypeID, public Target: TypeID) {
    }
    static $zero(): IsTypeAssignableToParams {
        return new IsTypeAssignableToParams(new SnapshotID(0n), new ProjectID(""), 0, 0);
    }
    static $copy($source: IsTypeAssignableToParams): IsTypeAssignableToParams {
        return new IsTypeAssignableToParams($source.Snapshot, $source.Project, $source.Source, $source.Target);
    }
    static $equal($left: IsTypeAssignableToParams, $right: IsTypeAssignableToParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Source === $right.Source && $left.Target === $right.Target;
    }
    static $hash($source: IsTypeAssignableToParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Source));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Target));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetSignaturesOfTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID, public Kind: int32) {
    }
    static $zero(): GetSignaturesOfTypeParams {
        return new GetSignaturesOfTypeParams(new SnapshotID(0n), new ProjectID(""), 0, 0);
    }
    static $copy($source: GetSignaturesOfTypeParams): GetSignaturesOfTypeParams {
        return new GetSignaturesOfTypeParams($source.Snapshot, $source.Project, $source.Type, $source.Kind);
    }
    static $equal($left: GetSignaturesOfTypeParams, $right: GetSignaturesOfTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type && $left.Kind === $right.Kind;
    }
    static $hash($source: GetSignaturesOfTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetResolvedSignatureParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Location: NodeHandle) {
    }
    static $zero(): GetResolvedSignatureParams {
        return new GetResolvedSignatureParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""));
    }
    static $copy($source: GetResolvedSignatureParams): GetResolvedSignatureParams {
        return new GetResolvedSignatureParams($source.Snapshot, $source.Project, $source.Location);
    }
    static $equal($left: GetResolvedSignatureParams, $right: GetResolvedSignatureParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Location.$value === $right.Location.$value;
    }
    static $hash($source: GetResolvedSignatureParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypeAtLocationParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Location: NodeHandle) {
    }
    static $zero(): GetTypeAtLocationParams {
        return new GetTypeAtLocationParams(new SnapshotID(0n), new ProjectID(""), new NodeHandle(""));
    }
    static $copy($source: GetTypeAtLocationParams): GetTypeAtLocationParams {
        return new GetTypeAtLocationParams($source.Snapshot, $source.Project, $source.Location);
    }
    static $equal($left: GetTypeAtLocationParams, $right: GetTypeAtLocationParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Location.$value === $right.Location.$value;
    }
    static $hash($source: GetTypeAtLocationParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypeAtLocationsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Locations: RuntimeSlice<gostring>) {
    }
    static $zero(): GetTypeAtLocationsParams {
        return new GetTypeAtLocationsParams(new SnapshotID(0n), new ProjectID(""), RuntimeSlice.nil<gostring>());
    }
    static $copy($source: GetTypeAtLocationsParams): GetTypeAtLocationsParams {
        return new GetTypeAtLocationsParams($source.Snapshot, $source.Project, $source.Locations);
    }
    declare private readonly then?: never;
}
export class GetTypeAtPositionParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier, public Position: uint32) {
    }
    static $zero(): GetTypeAtPositionParams {
        return new GetTypeAtPositionParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero(), 0);
    }
    static $copy($source: GetTypeAtPositionParams): GetTypeAtPositionParams {
        return new GetTypeAtPositionParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File), $source.Position);
    }
    static $equal($left: GetTypeAtPositionParams, $right: GetTypeAtPositionParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && DocumentIdentifier.$equal($left.File, $right.File) && $left.Position === $right.Position;
    }
    static $hash($source: GetTypeAtPositionParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, DocumentIdentifier.$hash($source.File));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Position));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetTypesAtPositionsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: DocumentIdentifier, public Positions: RuntimeSlice<uint32>) {
    }
    static $zero(): GetTypesAtPositionsParams {
        return new GetTypesAtPositionsParams(new SnapshotID(0n), new ProjectID(""), DocumentIdentifier.$zero(), RuntimeSlice.nil<uint32>());
    }
    static $copy($source: GetTypesAtPositionsParams): GetTypesAtPositionsParams {
        return new GetTypesAtPositionsParams($source.Snapshot, $source.Project, DocumentIdentifier.$copy($source.File), $source.Positions);
    }
    declare private readonly then?: never;
}
export class TypeToTypeNodeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID, public Location: NodeHandle, public Flags: int32) {
    }
    static $zero(): TypeToTypeNodeParams {
        return new TypeToTypeNodeParams(new SnapshotID(0n), new ProjectID(""), 0, new NodeHandle(""), 0);
    }
    static $copy($source: TypeToTypeNodeParams): TypeToTypeNodeParams {
        return new TypeToTypeNodeParams($source.Snapshot, $source.Project, $source.Type, $source.Location, $source.Flags);
    }
    static $equal($left: TypeToTypeNodeParams, $right: TypeToTypeNodeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type && $left.Location.$value === $right.Location.$value && $left.Flags === $right.Flags;
    }
    static $hash($source: TypeToTypeNodeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Flags));
        return $hash;
    }
    declare private readonly then?: never;
}
export class SignatureToSignatureDeclarationParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Signature: SignatureID, public Kind: int32, public Location: NodeHandle, public Flags: int32) {
    }
    static $zero(): SignatureToSignatureDeclarationParams {
        return new SignatureToSignatureDeclarationParams(new SnapshotID(0n), new ProjectID(""), new SignatureID(0n), 0, new NodeHandle(""), 0);
    }
    static $copy($source: SignatureToSignatureDeclarationParams): SignatureToSignatureDeclarationParams {
        return new SignatureToSignatureDeclarationParams($source.Snapshot, $source.Project, $source.Signature, $source.Kind, $source.Location, $source.Flags);
    }
    static $equal($left: SignatureToSignatureDeclarationParams, $right: SignatureToSignatureDeclarationParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Signature.$value === $right.Signature.$value && $left.Kind === $right.Kind && $left.Location.$value === $right.Location.$value && $left.Flags === $right.Flags;
    }
    static $hash($source: SignatureToSignatureDeclarationParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Signature.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Location.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Flags));
        return $hash;
    }
    declare private readonly then?: never;
}
export class PrintNodeParams {
    declare private readonly $goType: void;
    public constructor(public Data: gostring, public PreserveSourceNewlines: bool, public NeverAsciiEscape: bool, public TerminateUnterminatedLiterals: bool) {
    }
    static $zero(): PrintNodeParams {
        return new PrintNodeParams("", false, false, false);
    }
    static $copy($source: PrintNodeParams): PrintNodeParams {
        return new PrintNodeParams($source.Data, $source.PreserveSourceNewlines, $source.NeverAsciiEscape, $source.TerminateUnterminatedLiterals);
    }
    static $equal($left: PrintNodeParams, $right: PrintNodeParams): bool {
        return $left.Data === $right.Data && $left.PreserveSourceNewlines === $right.PreserveSourceNewlines && $left.NeverAsciiEscape === $right.NeverAsciiEscape && $left.TerminateUnterminatedLiterals === $right.TerminateUnterminatedLiterals;
    }
    static $hash($source: PrintNodeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Data));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.PreserveSourceNewlines));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.NeverAsciiEscape));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.TerminateUnterminatedLiterals));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CheckerTypeParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Type: TypeID) {
    }
    static $zero(): CheckerTypeParams {
        return new CheckerTypeParams(new SnapshotID(0n), new ProjectID(""), 0);
    }
    static $copy($source: CheckerTypeParams): CheckerTypeParams {
        return new CheckerTypeParams($source.Snapshot, $source.Project, $source.Type);
    }
    static $equal($left: CheckerTypeParams, $right: CheckerTypeParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Type === $right.Type;
    }
    static $hash($source: CheckerTypeParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CheckerSignatureParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public Signature: SignatureID) {
    }
    static $zero(): CheckerSignatureParams {
        return new CheckerSignatureParams(new SnapshotID(0n), new ProjectID(""), new SignatureID(0n));
    }
    static $copy($source: CheckerSignatureParams): CheckerSignatureParams {
        return new CheckerSignatureParams($source.Snapshot, $source.Project, $source.Signature);
    }
    static $equal($left: CheckerSignatureParams, $right: CheckerSignatureParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value && $left.Signature.$value === $right.Signature.$value;
    }
    static $hash($source: CheckerSignatureParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Signature.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class TypePredicateResponse {
    declare private readonly $goType: void;
    public constructor(public Kind: int32, public ParameterIndex: int32, public ParameterName: gostring, public Type: tsonicTypeScriptRuntime.Location<TypeResponse> | undefined) {
    }
    static $copy($source: TypePredicateResponse): TypePredicateResponse {
        return new TypePredicateResponse($source.Kind, $source.ParameterIndex, $source.ParameterName, $source.Type);
    }
    static $equal($left: TypePredicateResponse, $right: TypePredicateResponse): bool {
        return $left.Kind === $right.Kind && $left.ParameterIndex === $right.ParameterIndex && $left.ParameterName === $right.ParameterName &&
            tsonicTypeScriptRuntime.sameLocation($left.Type, $right.Type);
    }
    static $hash($source: TypePredicateResponse): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ParameterIndex));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ParameterName));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class IndexInfoResponse {
    declare private readonly $goType: void;
    public constructor(public KeyType: TypeResponse, public ValueType: TypeResponse, public IsReadonly: bool, public Declaration: NodeHandle) {
    }
    static $copy($source: IndexInfoResponse): IndexInfoResponse {
        return new IndexInfoResponse(TypeResponse.$copy($source.KeyType), TypeResponse.$copy($source.ValueType), $source.IsReadonly, $source.Declaration);
    }
    declare private readonly then?: never;
}
export class SourceFileResponse {
    declare private readonly $goType: void;
    public constructor(public Data: gostring) {
    }
    static $copy($source: SourceFileResponse): SourceFileResponse {
        return new SourceFileResponse($source.Data);
    }
    static $equal($left: SourceFileResponse, $right: SourceFileResponse): bool {
        return $left.Data === $right.Data;
    }
    static $hash($source: SourceFileResponse): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Data));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetDiagnosticsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID, public File: tsonicTypeScriptRuntime.Location<DocumentIdentifier> | undefined) {
    }
    static $zero(): GetDiagnosticsParams {
        return new GetDiagnosticsParams(new SnapshotID(0n), new ProjectID(""), void 0);
    }
    static $copy($source: GetDiagnosticsParams): GetDiagnosticsParams {
        return new GetDiagnosticsParams($source.Snapshot, $source.Project, $source.File);
    }
    static $equal($left: GetDiagnosticsParams, $right: GetDiagnosticsParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value &&
            tsonicTypeScriptRuntime.sameLocation($left.File, $right.File);
    }
    static $hash($source: GetDiagnosticsParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.File));
        return $hash;
    }
    declare private readonly then?: never;
}
export class GetProjectDiagnosticsParams {
    declare private readonly $goType: void;
    public constructor(public Snapshot: SnapshotID, public Project: ProjectID) {
    }
    static $zero(): GetProjectDiagnosticsParams {
        return new GetProjectDiagnosticsParams(new SnapshotID(0n), new ProjectID(""));
    }
    static $copy($source: GetProjectDiagnosticsParams): GetProjectDiagnosticsParams {
        return new GetProjectDiagnosticsParams($source.Snapshot, $source.Project);
    }
    static $equal($left: GetProjectDiagnosticsParams, $right: GetProjectDiagnosticsParams): bool {
        return $left.Snapshot.$value === $right.Snapshot.$value && $left.Project.$value === $right.Project.$value;
    }
    static $hash($source: GetProjectDiagnosticsParams): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.Snapshot.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Project.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class DiagnosticResponse {
    declare private readonly $goType: void;
    public constructor(public FileName: gostring, public Pos: int, public End: int, public Code: int32, public Category: Category__from_diagnostics, public Text: gostring, public ReportsUnnecessary: bool, public ReportsDeprecated: bool, public MessageChain: RuntimeSlice<{
        value: DiagnosticResponse;
    } | undefined>, public RelatedInformation: RuntimeSlice<{
        value: DiagnosticResponse;
    } | undefined>) {
    }
    static $copy($source: DiagnosticResponse): DiagnosticResponse {
        return new DiagnosticResponse($source.FileName, $source.Pos, $source.End, $source.Code, $source.Category, $source.Text, $source.ReportsUnnecessary, $source.ReportsDeprecated, $source.MessageChain, $source.RelatedInformation);
    }
    declare private readonly then?: never;
}
export function NewDiagnosticResponse(d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): {
    value: DiagnosticResponse;
} | undefined {
    let pos = Diagnostic__from_ast.Pos(d);
    let end = Diagnostic__from_ast.End(d);
    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Diagnostic__from_ast.File(d);
    if (!(file === undefined)) {
        let positionMap: {
            value: PositionMap__from_ast;
        } | undefined = SourceFile__from_ast.GetPositionMap(file);
        pos = PositionMap__from_ast.UTF8ToUTF16(positionMap, pos);
        end = PositionMap__from_ast.UTF8ToUTF16(positionMap, end);
    }
    let resp: {
        value: DiagnosticResponse;
    } | undefined = { value: new DiagnosticResponse("", pos, end, Diagnostic__from_ast.Code(d), Diagnostic__from_ast.Category(d), Diagnostic__from_ast.Localize(d, Locale__from_locale.$copy(Locale__from_locale.$fromStorage($state__locale.Default))), Diagnostic__from_ast.ReportsUnnecessary(d), Diagnostic__from_ast.ReportsDeprecated(d), RuntimeSlice.nil<{
            value: DiagnosticResponse;
        } | undefined>(), RuntimeSlice.nil<{
            value: DiagnosticResponse;
        } | undefined>()) };
    if (!(file === undefined)) {
        (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName = SourceFile__from_ast.FileName(file);
    }
    {
        let chain = Diagnostic__from_ast.MessageChain(d);
        if (chain.length > 0) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MessageChain = RuntimeSlice.make<{
                value: DiagnosticResponse;
            } | undefined>(chain.length, null, void 0);
            const __gotots_range_1 = chain;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_2 = __gotots_range_index_1;
                const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_1);
                let i = __gotots_range_value_2;
                let c: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_3;
                (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MessageChain.set(i, NewDiagnosticResponse(c));
            }
        }
    }
    {
        let related = Diagnostic__from_ast.RelatedInformation(d);
        if (related.length > 0) {
            (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RelatedInformation = RuntimeSlice.make<{
                value: DiagnosticResponse;
            } | undefined>(related.length, null, void 0);
            const __gotots_range_2 = related;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_4 = __gotots_range_index_2;
                const __gotots_range_value_5 = __gotots_range_2.get(__gotots_range_index_2);
                let i = __gotots_range_value_4;
                let r: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_5;
                (resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RelatedInformation.set(i, NewDiagnosticResponse(r));
            }
        }
    }
    return resp;
}
export function NewDiagnosticResponses(diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<{
    value: DiagnosticResponse;
} | undefined> {
    if (diags.length === 0) {
        return RuntimeSlice.nil<{
            value: DiagnosticResponse;
        } | undefined>();
    }
    let result = RuntimeSlice.make<{
        value: DiagnosticResponse;
    } | undefined>(diags.length, null, void 0);
    const __gotots_range_0 = diags;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_1;
        result.set(i, NewDiagnosticResponse(d));
    }
    return result;
}
export function unmarshalPayload(method: gostring, payload: Value__from_jsontext): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_results_0 = $state.unmarshalers.lookupOk(new Method(method));
    let unmarshaler: (($0: RuntimeSlice<uint8>) => [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined = __gotots_results_0[0];
    let ok = __gotots_results_0[1];
    if (!ok) {
        return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unknown API method %q", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(method)])))];
    }
    const __gotots_callee_0 = unmarshaler;
    const __gotots_argument_0 = payload.$value;
    return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
}
export function unmarshallerFor$kernel<T>($go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => GoInterface | undefined, $go$zero$void_to_T0: () => T, data: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let v: T = $go$zero$void_to_T0();
    const v$location = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next => v = v$next);
    {
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, $go$interface_adapt$PointerTo_T0_to_Interface_void(v$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to unmarshal %T: %w", RuntimeSlice.literal<GoInterface | undefined>([$go$interface_adapt$PointerTo_T0_to_Interface_void(void 0), err])))];
        }
    }
    return [$go$interface_adapt$PointerTo_T0_to_Interface_void(v$location), void 0];
}
export function noParams(data: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return [void 0, void 0];
}
