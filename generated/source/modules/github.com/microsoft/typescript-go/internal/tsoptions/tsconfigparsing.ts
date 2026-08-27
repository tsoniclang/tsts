import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, ExternalModuleIndicatorOptions$Storage as ExternalModuleIndicatorOptions__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ScriptKind as ScriptKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Glob as Glob__from_glob } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/glob/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CompilerOptionsValue } from "./commandlineoption.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { GoRecovery } from "@gotots/runtime/panic.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { ExpressionBase as ExpressionBase__from_ast, ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsComputedNonLiteralName as IsComputedNonLiteralName__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, NewDiagnostic as NewDiagnostic__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAssignment as PropertyAssignment__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, TryGetTextOfPropertyName as TryGetTextOfPropertyName__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections, Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ParsedOptions as ParsedOptions__from_core, ProjectReference as ProjectReference__from_core, ScriptKindDeferred$constant as ScriptKindDeferred$constant__from_core, ScriptKindJS$constant as ScriptKindJS$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, StringifyJson as StringifyJson__from_core, TSTrue$constant as TSTrue$constant__from_core, TextRange as TextRange__from_core, TypeAcquisition as TypeAcquisition__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromString as FromString__from_jsnum, Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { Locale as Locale__from_locale, Parse as Parse__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { ResolveConfig as ResolveConfig__from___go_module, ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { ParseSourceFile as ParseSourceFile__from_parser } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/parser/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { $state as $state__tspath, ChangeExtension as ChangeExtension__from_tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ConvertToRelativePath as ConvertToRelativePath__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, IsRootedDiskPath as IsRootedDiskPath__from_tspath, NormalizePath as NormalizePath__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewSpecMatcher as NewSpecMatcher__from_vfsmatch, ReadDirectory as ReadDirectory__from_vfsmatch, SpecMatcher as SpecMatcher__from_vfsmatch, UnlimitedDepth$int as UnlimitedDepth$int__from_vfsmatch, UsageFiles$constant as UsageFiles$constant__from_vfsmatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { $goDeferred$string_string_to_int, $goDeferred$string_to_string_bool as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Compare$string, Compare$string$deferred } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { OrderedMap$Delete$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Delete.js";
import { OrderedMap$Entries$string$Interface_void, OrderedMap$Entries$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$GetOrZero$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$GetOrZero.js";
import { OrderedMap$Set$string$Interface_void, OrderedMap$Set$string$SliceOf_string, OrderedMap$Set$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$Interface_void, OrderedMap$Size$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { OrderedMap$Values$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Values.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Every$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Filter$Interface_void, Filter$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node, Find$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { Flatten$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Flatten.js";
import { InsertSorted$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/InsertSorted.js";
import { Map$Interface_void$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { MapIndex$Interface_void$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapIndex.js";
import { Must$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Must.js";
import { Same$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Same.js";
import { convertOptionsFromJson$PointerTo_Named_tsoptions$compilerOptionsParser, convertOptionsFromJson$PointerTo_Named_tsoptions$typeAcquisitionParser } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tsoptions/convertOptionsFromJson.js";
import { Clone$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { Concat$SliceOf_SliceOf_string$SliceOf_string } from "../../../../../../support/generics/concretizations/slices/Concat.js";
import { Contains$SliceOf_Named_tspath$Path$Named_tspath$Path, Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_tsoptions$resolverHost, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$Struct_void, $goInterfaceAdapter$bool, $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetExtendedConfig$string_Named_tspath$Path_SliceOf_Named_tspath$Path_Named_tsoptions$ParseConfigHost_to_PointerTo_Named_tsoptions$ExtendedConfigCacheEntry, $goInterfaceMethod$ReadFile$string_to_string_bool } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption, $goMap$MapOf_string_To_Struct_void } from "../../../../../../support/maps.js";
import { $goReflectType$Interface_void, $goReflectType$Named_tsoptions$CompilerOptionsValue } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { CommandLineOption, CommandLineOptionKind, extraValidation } from "./commandlineoption.js";
import { convertJsonOptionOfEnumType, tryReadFile } from "./commandlineparser.js";
import { CreateDiagnosticForNodeInSourceFile, CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic, createUnknownOptionError, extraKeyDiagnostics, extraKeyDidYouMeanDiagnostics, getCompilerOptionValueTypeString } from "./errors.js";
import { ParsedCommandLine } from "./parsedcommandline.js";
import { ParseCompilerOptions, ParseTypeAcquisition, compilerOptionsParser, mergeCompilerOptions, parseJsonToStringKey, parseProjectReference, typeAcquisitionParser } from "./parsinghelpers.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap, GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class extendsResult {
    declare private readonly $goType: void;
    public constructor(public options: {
        value: CompilerOptions__from_core;
    } | undefined, public watchOptionsCopied: bool, public include: RuntimeSlice<GoInterface | undefined>, public exclude: RuntimeSlice<GoInterface | undefined>, public files: RuntimeSlice<GoInterface | undefined>, public compileOnSave: bool, public extendedSourceFiles: Set__from_collections<gostring>) {
    }
    declare private readonly then?: never;
}
export class configFileSpecs {
    declare private readonly $goType: void;
    public constructor(public filesSpecs: GoInterface | undefined, public includeSpecs: GoInterface | undefined, public excludeSpecs: GoInterface | undefined, public validatedFilesSpec: RuntimeSlice<gostring>, public validatedIncludeSpecs: RuntimeSlice<gostring>, public validatedExcludeSpecs: RuntimeSlice<gostring>, public validatedFilesSpecBeforeSubstitution: RuntimeSlice<gostring>, public validatedIncludeSpecsBeforeSubstitution: RuntimeSlice<gostring>, public isDefaultIncludeSpec: bool) {
    }
    static $copy($source: configFileSpecs): configFileSpecs {
        return new configFileSpecs($source.filesSpecs, $source.includeSpecs, $source.excludeSpecs, $source.validatedFilesSpec, $source.validatedIncludeSpecs, $source.validatedExcludeSpecs, $source.validatedFilesSpecBeforeSubstitution, $source.validatedIncludeSpecsBeforeSubstitution, $source.isDefaultIncludeSpec);
    }
    declare private readonly then?: never;
    static $go$private$tsoptions$getMatchedFileSpec(c: tsonicTypeScriptRuntime.Location<configFileSpecs> | undefined, fileName: gostring, comparePathsOptions: ComparePathsOptions__from_tspath): gostring {
        if (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedFilesSpec.length === 0) {
            return "";
        }
        let filePath = ToPath__from_tspath(fileName, comparePathsOptions.CurrentDirectory, comparePathsOptions.UseCaseSensitiveFileNames);
        const __gotots_range_25 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedFilesSpec;
        for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_25.length; __gotots_range_index_18++) {
            const __gotots_range_value_32 = __gotots_range_index_18;
            const __gotots_range_value_33 = __gotots_range_25.get(__gotots_range_index_18);
            let index = __gotots_range_value_32;
            let spec = __gotots_range_value_33;
            if (ToPath__from_tspath(spec, comparePathsOptions.CurrentDirectory, comparePathsOptions.UseCaseSensitiveFileNames).$value === filePath.$value) {
                return ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedFilesSpecBeforeSubstitution.get(index);
            }
        }
        return "";
    }
    static $go$private$tsoptions$getMatchedIncludeSpec(c: tsonicTypeScriptRuntime.Location<configFileSpecs> | undefined, fileName: gostring, comparePathsOptions: ComparePathsOptions__from_tspath): gostring {
        if (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedIncludeSpecs.length === 0) {
            return "";
        }
        const __gotots_range_26 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedIncludeSpecs;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_26.length; __gotots_range_index_19++) {
            const __gotots_range_value_34 = __gotots_range_index_19;
            const __gotots_range_value_35 = __gotots_range_26.get(__gotots_range_index_19);
            let index = __gotots_range_value_34;
            let spec = __gotots_range_value_35;
            let includeMatcher: SpecMatcher__from_vfsmatch | undefined = NewSpecMatcher__from_vfsmatch(RuntimeSlice.literal<gostring>([spec]), comparePathsOptions.CurrentDirectory, UsageFiles$constant__from_vfsmatch(), comparePathsOptions.UseCaseSensitiveFileNames);
            if (!(includeMatcher === undefined) && SpecMatcher__from_vfsmatch.MatchString(includeMatcher, fileName)) {
                return ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedIncludeSpecsBeforeSubstitution.get(index);
            }
        }
        return "";
    }
}
export type FileExtensionInfo$Storage = {
    Extension: gostring;
    IsMixedContent: bool;
    ScriptKind: int32;
};
export class FileExtensionInfo {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FileExtensionInfo$Storage) {
    }
    public static $storageOf($source: FileExtensionInfo): FileExtensionInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: FileExtensionInfo$Storage): FileExtensionInfo {
        return new FileExtensionInfo($source);
    }
    public get Extension(): gostring {
        return this.$storage.Extension;
    }
    public set Extension($value: gostring) {
        this.$storage.Extension = $value;
    }
    public get IsMixedContent(): bool {
        return this.$storage.IsMixedContent;
    }
    public set IsMixedContent($value: bool) {
        this.$storage.IsMixedContent = $value;
    }
    public get ScriptKind(): ScriptKind__from_core {
        return this.$storage.ScriptKind;
    }
    public set ScriptKind($value: ScriptKind__from_core) {
        this.$storage.ScriptKind = $value;
    }
    static $zero(): FileExtensionInfo {
        return new FileExtensionInfo({
            Extension: "",
            IsMixedContent: false,
            ScriptKind: 0
        });
    }
    static $copy($source: FileExtensionInfo): FileExtensionInfo {
        return new FileExtensionInfo({
            Extension: $source.$storage.Extension,
            IsMixedContent: $source.$storage.IsMixedContent,
            ScriptKind: $source.$storage.ScriptKind
        });
    }
    static $equal($left: FileExtensionInfo, $right: FileExtensionInfo): bool {
        return $left.$storage.Extension === $right.$storage.Extension && $left.$storage.IsMixedContent === $right.$storage.IsMixedContent && $left.$storage.ScriptKind === $right.$storage.ScriptKind;
    }
    static $hash($source: FileExtensionInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Extension));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.IsMixedContent));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.ScriptKind));
        return $hash;
    }
    declare private readonly then?: never;
}
export interface ExtendedConfigCache extends GoInterfaceValue {
    GetExtendedConfig($argument0: gostring, $argument1: Path__from_tspath, $argument2: RuntimeSlice<gostring>, $argument3: ParseConfigHost | undefined): {
        value: ExtendedConfigCacheEntry;
    } | undefined;
}
export const ExtendedConfigCache$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetExtendedConfig$string_Named_tspath$Path_SliceOf_Named_tspath$Path_Named_tsoptions$ParseConfigHost_to_PointerTo_Named_tsoptions$ExtendedConfigCacheEntry]);
export function ExtendedConfigCache$is(value: GoInterfaceValue | undefined): value is ExtendedConfigCache {
    return value !== undefined && value.$go$implements(ExtendedConfigCache$contract);
}
export class ExtendedConfigCacheEntry {
    declare private readonly $goType: void;
    public constructor(public extendedResult: {
        value: TsConfigSourceFile;
    } | undefined, public extendedConfig: {
        value: parsedTsconfig;
    } | undefined, public errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) {
    }
    static $copy($source: ExtendedConfigCacheEntry): ExtendedConfigCacheEntry {
        return new ExtendedConfigCacheEntry($source.extendedResult, $source.extendedConfig, $source.errors);
    }
    declare private readonly then?: never;
    static ExtendedFileNames(e: {
        value: ExtendedConfigCacheEntry;
    } | undefined): RuntimeSlice<gostring> {
        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedResult === undefined)) {
            return ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedSourceFiles;
        }
        return RuntimeSlice.nil<gostring>();
    }
}
export class parsedTsconfig {
    declare private readonly $goType: void;
    public constructor(public raw: GoInterface | undefined, public options: {
        value: CompilerOptions__from_core;
    } | undefined, public typeAcquisition: {
        value: TypeAcquisition__from_core;
    } | undefined, public extendedConfigPath: GoInterface | undefined) {
    }
    static $copy($source: parsedTsconfig): parsedTsconfig {
        return new parsedTsconfig($source.raw, $source.options, $source.typeAcquisition, $source.extendedConfigPath);
    }
    static $equal($left: parsedTsconfig, $right: parsedTsconfig): bool {
        return goInterfaceEqual($left.raw, $right.raw) &&
            $left.options
                ===
                    $right.options &&
            $left.typeAcquisition
                ===
                    $right.typeAcquisition && goInterfaceEqual($left.extendedConfigPath, $right.extendedConfigPath);
    }
    static $hash($source: parsedTsconfig): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.raw === undefined ? 0 : $source.raw.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.options));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.typeAcquisition));
        $hash = GoMapHash.mix($hash, $source.extendedConfigPath === undefined ? 0 : $source.extendedConfigPath.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export function parseOwnConfigOfJsonSourceFile(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, host: ParseConfigHost | undefined, basePath: gostring, configFileName: gostring): [
    {
        value: parsedTsconfig;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = getDefaultCompilerOptions(configFileName);
    let typeAcquisition: {
        value: TypeAcquisition__from_core;
    } | undefined = getDefaultTypeAcquisition(configFileName);
    let extendedConfigPath: GoInterface | undefined = void 0;
    let rootCompilerOptions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    let onPropertySet: (($0: gostring, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, $3: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, $4: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined) => [
        GoInterface | undefined,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
    ]) | undefined = (keyText: gostring, value: GoInterface | undefined, propertyAssignment: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, parentOption: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): [
        GoInterface | undefined,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
    ] => {
        let propertySetErrors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        if (!(option === undefined) && !tsonicTypeScriptRuntime.sameLocation(option, $state.extendsOptionDeclaration)) {
            const __gotots_results_31 = convertJsonOption(option, value, basePath, propertyAssignment, PropertyAssignment__from_ast.$storageOf(((propertyAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer, sourceFile);
            value = __gotots_results_31[0];
            propertySetErrors = __gotots_results_31[1];
        }
        if (!(parentOption === undefined) && CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name !== "undefined" && !(value === undefined)) {
            if (!(option === undefined) && CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name !== "") {
                let parseDiagnostics = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
                switch (CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name) {
                    case "compilerOptions": {
                        parseDiagnostics = ParseCompilerOptions(CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, value, compilerOptions);
                        break;
                    }
                    case "typeAcquisition": {
                        parseDiagnostics = ParseTypeAcquisition(CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, value, typeAcquisition);
                        break;
                    }
                }
                propertySetErrors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(propertySetErrors, parseDiagnostics, void 0);
            }
            else if (keyText !== "" && !(extraKeyDiagnostics(CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name) === undefined)) {
                let unknownNameDiag: {
                    value: Message__from_diagnostics;
                } | undefined = extraKeyDiagnostics(CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name);
                if (!new CommandLineOptionNameMap(CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ElementOptions).$value.isNil()) {
                    let possibleOption: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = new CommandLineOptionNameMap(CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ElementOptions).Get(keyText);
                    if (!(possibleOption === undefined) && CommandLineOption.$storageOf(((possibleOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name !== keyText) {
                        propertySetErrors = propertySetErrors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, PropertyAssignment__from_ast.Name(propertyAssignment), extraKeyDidYouMeanDiagnostics(CommandLineOption.$storageOf(((parentOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(keyText), new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((possibleOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)]))]);
                    }
                    else {
                        propertySetErrors = propertySetErrors.append(void 0, [createUnknownOptionError(keyText, unknownNameDiag, "", PropertyAssignment__from_ast.Name(propertyAssignment), sourceFile, void 0)]);
                    }
                }
                else {
                }
            }
        }
        else if (tsonicTypeScriptRuntime.sameLocation(parentOption, $state.tsconfigRootOptionsMap)) {
            if (tsonicTypeScriptRuntime.sameLocation(option, $state.extendsOptionDeclaration)) {
                const __gotots_results_32 = getExtendsConfigPathOrArray(value, host, basePath, configFileName, propertyAssignment, PropertyAssignment__from_ast.$storageOf(((propertyAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer, sourceFile);
                let configPath = __gotots_results_32[0];
                let err__shadow_1 = __gotots_results_32[1];
                extendedConfigPath = new $goInterfaceAdapter$SliceOf_string(configPath);
                propertySetErrors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(propertySetErrors, err__shadow_1, void 0);
            }
            else if (option === undefined) {
                if (keyText === "excludes") {
                    propertySetErrors = propertySetErrors.append(void 0, [CreateDiagnosticForNodeInSourceFile(sourceFile, PropertyAssignment__from_ast.Name(propertyAssignment), $state__diagnostics.Unknown_option_excludes_Did_you_mean_exclude, RuntimeSlice.nil<GoInterface | undefined>())]);
                }
                if (!(Find$PointerTo_Named_tsoptions$CommandLineOption($state.OptionsDeclarations, (option__shadow_1: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined): bool => {
                    return CommandLineOption.$storageOf(((option__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name === keyText;
                }) === undefined)) {
                    rootCompilerOptions = rootCompilerOptions.append(void 0, [PropertyAssignment__from_ast.Name(propertyAssignment)]);
                }
            }
        }
        return [value, propertySetErrors];
    };
    const __gotots_results_33 = convertConfigFileToObject(sourceFile, new jsonConversionNotifier($state.tsconfigRootOptionsMap, onPropertySet));
    let json: GoInterface | undefined = __gotots_results_33[0];
    let err = __gotots_results_33[1];
    errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
    return [
        { value: new parsedTsconfig(json, compilerOptions, typeAcquisition, extendedConfigPath) }, errors];
}
export class TsConfigSourceFile {
    declare private readonly $goType: void;
    public constructor(public ExtendedSourceFiles: RuntimeSlice<gostring>, public configFileSpecs: tsonicTypeScriptRuntime.Location<configFileSpecs> | undefined, public SourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
    }
    static $copy($source: TsConfigSourceFile): TsConfigSourceFile {
        return new TsConfigSourceFile($source.ExtendedSourceFiles, $source.configFileSpecs, $source.SourceFile);
    }
    declare private readonly then?: never;
}
export function tsconfigToSourceFile(tsconfigSourceFile: {
    value: TsConfigSourceFile;
} | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
    if (tsconfigSourceFile === undefined) {
        return void 0;
    }
    return (tsconfigSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile;
}
export function NewTsconfigSourceFileFromFilePath(configFileName: gostring, configPath: Path__from_tspath, configSourceText: gostring): {
    value: TsConfigSourceFile;
} | undefined {
    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = ParseSourceFile__from_parser(SourceFileParseOptions__from_ast.$fromStorage({
        FileName: configFileName,
        Path: configPath.$value,
        ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$storageOf(ExternalModuleIndicatorOptions__from_ast.$zero())
    }), configSourceText, ScriptKindJSON$constant__from_core());
    return { value: new TsConfigSourceFile(RuntimeSlice.nil<gostring>(), void 0, sourceFile) };
}
export class jsonConversionNotifier {
    declare private readonly $goType: void;
    public constructor(public rootOptions: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, public onPropertySet: (($0: gostring, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, $3: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, $4: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined) => [
        GoInterface | undefined,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
    ]) | undefined) {
    }
    declare private readonly then?: never;
}
export function convertConfigFileToObject(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, jsonConversionNotifier__shadow_1: jsonConversionNotifier | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let rootExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
        rootExpression = Node__from_ast.Expression(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
    }
    if (!(rootExpression === undefined) && !(Node__from_ast.$storageOf(((rootExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast())) {
        let baseFileName = "tsconfig.json";
        if (GetBaseFileName__from_tspath(SourceFile__from_ast.FileName(sourceFile)) === "jsconfig.json") {
            baseFileName = "jsconfig.json";
        }
        let errors = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([NewCompilerDiagnostic__from_ast($state__diagnostics.The_root_value_of_a_0_file_must_be_an_object, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(baseFileName)]))]);
        if (IsArrayLiteralExpression__from_ast(rootExpression)) {
            let firstObject: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Node__from_ast.Elements(rootExpression), IsObjectLiteralExpression__from_ast);
            if (!(firstObject === undefined)) {
                return convertToJson(sourceFile, firstObject, true, jsonConversionNotifier__shadow_1);
            }
        }
        const __gotots_struct_5 = OrderedMap__from_collections.$zero<gostring, GoInterface | undefined>((): GoMapValue<gostring, GoInterface | undefined> => {
            return $goMap$MapOf_string_To_Interface_void.nil();
        });
        const __gotots_results_45 = new GoInterfaceAdapter(tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, GoInterface | undefined>>(__gotots_struct_5));
        const __gotots_results_46 = errors;
        return [__gotots_results_45, __gotots_results_46];
    }
    return convertToJson(sourceFile, rootExpression, true, jsonConversionNotifier__shadow_1);
}
export function isCompilerOptionsValue(option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: GoInterface | undefined): bool {
    if (!(option === undefined)) {
        if (value === undefined) {
            return !CommandLineOption.DisallowNullOrUndefined(option);
        }
        if (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "list") as string)) {
            const __gotots_receiver_41 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_41).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice);
        }
        if (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "listOrElement") as string)) {
            const __gotots_receiver_42 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_42).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice)) {
                return true;
            }
            else {
                return isCompilerOptionsValue(CommandLineOption.Elements(option), value);
            }
        }
        if (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "string") as string)) {
            const __gotots_receiver_43 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_43).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
        }
        if (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "boolean") as string)) {
            const __gotots_receiver_44 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_44).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Bool);
        }
        if (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "number") as string)) {
            const __gotots_receiver_45 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_45).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Float64);
        }
        if (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "object") as string)) {
            return goInterfaceEqual(named_reflect.ReflectTypeMetadataOperations.$typeOf(value), $state.orderedMapType);
        }
        let __gotots_logical_result_0 = ((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind,
                    "enum") as string);
        if (__gotots_logical_result_0) {
            const __gotots_receiver_46 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            __gotots_logical_result_0 = named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_46).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
        }
        if (__gotots_logical_result_0) {
            return true;
        }
    }
    return false;
}
export function validateJsonOptionValue(opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, val: GoInterface | undefined, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    if (val === undefined) {
        return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    switch (((void extraValidation,
        CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).extraValidation) as string)) {
        case "spec": {
            {
                let diag: {
                    value: Message__from_diagnostics;
                } | undefined = specToDiagnostic((($value: GoInterface | undefined): gostring => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(val), false);
                if (!(diag === undefined)) {
                    errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, diag, RuntimeSlice.nil<GoInterface | undefined>())]);
                }
            }
            break;
        }
        case "locale": {
            {
                const __gotots_results_16 = Parse__from_locale((($value: GoInterface | undefined): gostring => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(val));
                let ok = __gotots_results_16[1];
                if (!ok) {
                    errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, $state__diagnostics.Locale_must_be_an_IETF_BCP_47_language_tag_Examples_Colon_0_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("en"), new $goInterfaceAdapter$string("ja-jp")]))]);
                }
            }
            break;
        }
    }
    if (errors.length > 0) {
        return [void 0, errors];
    }
    return [val, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
}
export function convertJsonOptionOfListType(option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, values: GoInterface | undefined, basePath: gostring, propertyAssignment: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    RuntimeSlice<GoInterface | undefined>,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    {
        const __gotots_results_54 = (($value: GoInterface | undefined): [
            RuntimeSlice<GoInterface | undefined>,
            boolean
        ] => {
            if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                return [RuntimeSlice.nil<GoInterface | undefined>(), false];
            }
            return [$value.$go$value, true];
        })(values);
        let values__shadow_1 = __gotots_results_54[0];
        let ok = __gotots_results_54[1];
        if (ok) {
            let mappedValues = MapIndex$Interface_void$Interface_void(values__shadow_1, (v: GoInterface | undefined, index: int): GoInterface | undefined => {
                if (!(valueExpression === undefined)) {
                    expression = Node__from_ast.Elements(valueExpression).get(index);
                }
                const __gotots_results_55 = convertJsonOption(CommandLineOption.Elements(option), v, basePath, propertyAssignment, expression, sourceFile);
                let result: GoInterface | undefined = __gotots_results_55[0];
                let err = __gotots_results_55[1];
                errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
                return result;
            });
            let filteredValues = mappedValues;
            if (!CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).listPreserveFalsyValues) {
                filteredValues = Filter$Interface_void(mappedValues, (v: GoInterface | undefined): bool => {
                    return (!(v === undefined) && !goInterfaceEqual(v, new $goInterfaceAdapter$bool(false)) && !goInterfaceEqual(v, new $goInterfaceAdapter$int(0)) && !goInterfaceEqual(v, new $goInterfaceAdapter$string("")));
                });
            }
            return [filteredValues, errors];
        }
    }
    return [RuntimeSlice.nil<GoInterface | undefined>(), errors];
}
export const configDirTemplate$string: gostring = "${configDir}";
export function startsWithConfigDirTemplate(value: GoInterface | undefined): bool {
    const __gotots_results_34 = (($value: GoInterface | undefined): [
        gostring,
        boolean
    ] => {
        if (!$goInterfaceAdapter$string.$is($value)) {
            return ["", false];
        }
        return [$value.$go$value, true];
    })(value);
    let str = __gotots_results_34[0];
    let ok = __gotots_results_34[1];
    if (!ok) {
        return false;
    }
    return strings__from_gostdlib.HasPrefix(strings__from_gostdlib.ToLower(str), strings__from_gostdlib.ToLower(configDirTemplate$string));
}
export function normalizeNonListOptionValue(option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, basePath: gostring, value: GoInterface | undefined): GoInterface | undefined {
    if (CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsFilePath) {
        value = new $goInterfaceAdapter$string(NormalizeSlashes__from_tspath((($value: GoInterface | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(value)));
        if (!startsWithConfigDirTemplate(value)) {
            value = new $goInterfaceAdapter$string(GetNormalizedAbsolutePath__from_tspath((($value: GoInterface | undefined): gostring => {
                if (!$goInterfaceAdapter$string.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(value), basePath));
        }
        if (goInterfaceEqual(value, new $goInterfaceAdapter$string(""))) {
            value = new $goInterfaceAdapter$string(".");
        }
    }
    return value;
}
export function convertJsonOption(opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: GoInterface | undefined, basePath: gostring, propertyAssignment: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    if (CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsCommandLineOnly) {
        let nodeValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(propertyAssignment === undefined)) {
            nodeValue = PropertyAssignment__from_ast.Name(propertyAssignment);
        }
        if (sourceFile === undefined && nodeValue === undefined) {
            return [void 0, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([NewCompilerDiagnostic__from_ast($state__diagnostics.Option_0_can_only_be_specified_on_command_line, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)]))])];
        }
        else {
            return [void 0, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, $state__diagnostics.Option_0_can_only_be_specified_on_command_line, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)]))])];
        }
    }
    if (isCompilerOptionsValue(opt, value)) {
        switch (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)) {
            case "list": {
                const __gotots_results_42 = convertJsonOptionOfListType(opt, value, basePath, propertyAssignment, valueExpression, sourceFile);
                return [new $goInterfaceAdapter$SliceOf_Interface_void(__gotots_results_42[0]), __gotots_results_42[1]];
                break;
            }
            case "listOrElement": {
                const __gotots_receiver_36 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
                if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_36).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice)) {
                    const __gotots_results_43 = convertJsonOptionOfListType(opt, value, basePath, propertyAssignment, valueExpression, sourceFile);
                    return [new $goInterfaceAdapter$SliceOf_Interface_void(__gotots_results_43[0]), __gotots_results_43[1]];
                }
                else {
                    return convertJsonOption(CommandLineOption.Elements(opt), value, basePath, propertyAssignment, valueExpression, sourceFile);
                }
                break;
            }
            case "enum": {
                if (value === undefined) {
                    return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
                }
                return convertJsonOptionOfEnumType(opt, (($value: GoInterface | undefined): gostring => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(value), valueExpression, sourceFile);
                break;
            }
        }
        const __gotots_results_44 = validateJsonOptionValue(opt, value, valueExpression, sourceFile);
        let validatedValue: GoInterface | undefined = __gotots_results_44[0];
        let errors = __gotots_results_44[1];
        if (errors.length > 0 || validatedValue === undefined) {
            return [validatedValue, errors];
        }
        else {
            return [normalizeNonListOptionValue(opt, basePath, validatedValue), errors];
        }
    }
    else {
        return [void 0, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, $state__diagnostics.Compiler_option_0_requires_a_value_of_type_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), new $goInterfaceAdapter$string(getCompilerOptionValueTypeString(opt))]))])];
    }
}
export function getExtendsConfigPathOrArray(value: CompilerOptionsValue | undefined, host: ParseConfigHost | undefined, basePath: gostring, configFileName: gostring, propertyAssignment: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    RuntimeSlice<gostring>,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let extendedConfigPathArray = RuntimeSlice.nil<gostring>();
    let newBase = basePath;
    if (configFileName !== "") {
        newBase = directoryOfCombinedPath(configFileName, basePath);
    }
    if (value === undefined) {
        const __gotots_results_37 = convertJsonOption($state.extendsOptionDeclaration, value, basePath, propertyAssignment, valueExpression, sourceFile);
        let errors__shadow_1 = __gotots_results_37[1];
        return [extendedConfigPathArray, errors__shadow_1];
    }
    const __gotots_receiver_33 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
    if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_33).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String)) {
        const __gotots_results_38 = getExtendsConfigPath((($value: CompilerOptionsValue | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(value), host, newBase, valueExpression, sourceFile);
        let val = __gotots_results_38[0];
        let err = __gotots_results_38[1];
        if (val !== "") {
            extendedConfigPathArray = extendedConfigPathArray.append("", [val]);
        }
        return [extendedConfigPathArray, err];
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_receiver_34 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
    if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_34).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice)) {
        const __gotots_range_20 = (($value: CompilerOptionsValue | undefined): RuntimeSlice<GoInterface | undefined> => {
            if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(value);
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_20.length; __gotots_range_index_14++) {
            const __gotots_range_value_25 = __gotots_range_index_14;
            const __gotots_range_value_26 = __gotots_range_20.get(__gotots_range_index_14);
            let index = __gotots_range_value_25;
            let fileName: GoInterface | undefined = __gotots_range_value_26;
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(valueExpression === undefined)) {
                expression = Node__from_ast.Elements(valueExpression).get(index);
            }
            const __gotots_receiver_35 = named_reflect.ReflectTypeMetadataOperations.$typeOf(fileName);
            if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_35).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String)) {
                const __gotots_results_39 = getExtendsConfigPath((($value: GoInterface | undefined): gostring => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(fileName), host, newBase, expression, sourceFile);
                let val = __gotots_results_39[0];
                let err = __gotots_results_39[1];
                if (val !== "") {
                    extendedConfigPathArray = extendedConfigPathArray.append("", [val]);
                }
                errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
            }
            else {
                const __gotots_results_40 = convertJsonOption(CommandLineOption.Elements($state.extendsOptionDeclaration), value, basePath, propertyAssignment, expression, sourceFile);
                let err = __gotots_results_40[1];
                errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
            }
        }
    }
    else {
        const __gotots_results_41 = convertJsonOption($state.extendsOptionDeclaration, value, basePath, propertyAssignment, valueExpression, sourceFile);
        errors = __gotots_results_41[1];
    }
    return [extendedConfigPathArray, errors];
}
export function getExtendsConfigPath(extendedConfig: gostring, host: ParseConfigHost | undefined, basePath: gostring, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    gostring,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    extendedConfig = NormalizeSlashes__from_tspath(extendedConfig);
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    let errorFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
    if (!(sourceFile === undefined)) {
        errorFile = sourceFile;
    }
    if (IsRootedDiskPath__from_tspath(extendedConfig) || strings__from_gostdlib.HasPrefix(extendedConfig, "./") || strings__from_gostdlib.HasPrefix(extendedConfig, "../")) {
        let extendedConfigPath = GetNormalizedAbsolutePath__from_tspath(extendedConfig, basePath);
        const __gotots_receiver_37 = host;
        const __gotots_receiver_38 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_37).FS();
        const __gotots_argument_87 = extendedConfigPath;
        if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_38).FileExists(__gotots_argument_87) && !strings__from_gostdlib.HasSuffix(extendedConfigPath, ExtensionJson$string__from_tspath)) {
            extendedConfigPath = extendedConfigPath + ExtensionJson$string__from_tspath;
            const __gotots_receiver_39 = host;
            const __gotots_receiver_40 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_39).FS();
            const __gotots_argument_88 = extendedConfigPath;
            if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_40).FileExists(__gotots_argument_88)) {
                errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, $state__diagnostics.File_0_not_found, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(extendedConfig)]))]);
                return ["", errors];
            }
        }
        return [extendedConfigPath, errors];
    }
    let resolverHost__shadow_1: {
        value: resolverHost;
    } | undefined = { value: new resolverHost(host) };
    {
        let resolved: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = ResolveConfig__from___go_module(extendedConfig, CombinePaths__from_tspath(basePath, RuntimeSlice.literal<gostring>(["tsconfig.json"])), new $goInterfaceAdapter$PointerTo_Named_tsoptions$resolverHost(resolverHost__shadow_1));
        if (ResolvedModule__from___go_module.IsResolved(resolved)) {
            return [((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName, errors];
        }
    }
    if (extendedConfig === "") {
        errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, $state__diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("extends")]))]);
    }
    else {
        errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(errorFile, valueExpression, $state__diagnostics.File_0_not_found, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(extendedConfig)]))]);
    }
    return ["", errors];
}
export class CommandLineOptionNameMap {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>) {
    }
    declare private readonly then?: never;
    Get(name: gostring): tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined {
        const __gotots_results_3 = this.$value.lookupOk(name);
        let opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (!ok) {
            const __gotots_results_4 = this.$value.lookupOk(strings__from_gostdlib.ToLower(name));
            opt = __gotots_results_4[0];
        }
        return opt;
    }
}
export function commandLineOptionsToMap(compilerOptions: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined>): CommandLineOptionNameMap {
    let result: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined> = $goMap$MapOf_string_To_PointerTo_Named_tsoptions$CommandLineOption.make(compilerOptions.length * 2, []);
    const __gotots_range_27 = compilerOptions;
    for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_27.length; __gotots_range_index_20++) {
        const __gotots_range_value_36 = __gotots_range_index_20;
        let i = __gotots_range_value_36;
        result.store(CommandLineOption.$storageOf(((compilerOptions.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, compilerOptions.get(i));
        result.store(strings__from_gostdlib.ToLower(CommandLineOption.$storageOf(((compilerOptions.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), compilerOptions.get(i));
    }
    return new CommandLineOptionNameMap(result);
}
export function convertMapToOptions$kernel<O>($go$constraint_method$tsoptions$ParseOption$T0_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic: ($0: O, $1: gostring, $2: GoInterface | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, compilerOptions: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, result: O): O {
    const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(compilerOptions));
    if (__gotots_range_0 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_0(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
        if (__gotots_range_state_0 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_0 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_0 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_0 = -1;
        const __gotots_range_value_0 = $argument0;
        const __gotots_range_value_1 = $argument1;
        let key = __gotots_range_value_0;
        let value: GoInterface | undefined = __gotots_range_value_1;
        $go$constraint_method$tsoptions$ParseOption$T0_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic(result, key, value);
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    return result;
}
export function convertOptionsFromJson$kernel<O>($go$constraint_method$tsoptions$ParseOption$T0_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic: ($0: O, $1: gostring, $2: GoInterface | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$T0_to_PointerTo_Named_diagnostics$Message: ($0: O) => {
    value: Message__from_diagnostics;
} | undefined, $go$constraint_method$tsoptions$UnknownOptionDiagnostic$T0_to_PointerTo_Named_diagnostics$Message: ($0: O) => {
    value: Message__from_diagnostics;
} | undefined, optionsNameMap: CommandLineOptionNameMap, jsonOptions: GoInterface | undefined, basePath: gostring, result: O): [
    O,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    if (jsonOptions === undefined) {
        return [result, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    const __gotots_results_49 = (($value: GoInterface | undefined): [
        tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
        boolean
    ] => {
        if (!GoInterfaceAdapter.$is($value)) {
            return [void 0, false];
        }
        return [$value.$go$value, true];
    })(jsonOptions);
    let jsonMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_49[0];
    let ok = __gotots_results_49[1];
    if (!ok) {
        return [result, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_range_21 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(jsonMap));
    if (__gotots_range_21 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_5 = 1;
    __gotots_range_21(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
        if (__gotots_range_state_5 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_5 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_5 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_5 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_5 = -1;
        const __gotots_range_value_27 = $argument0;
        const __gotots_range_value_28 = $argument1;
        let key = __gotots_range_value_27;
        let value: GoInterface | undefined = __gotots_range_value_28;
        let opt: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = optionsNameMap.Get(key);
        if (!(opt === undefined) && CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name !== key) {
            errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(void 0, void 0, $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$T0_to_PointerTo_Named_diagnostics$Message(result), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(key), new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)]))]);
            __gotots_range_state_5 = 1;
            return true;
        }
        if (opt === undefined) {
            errors = errors.append(void 0, [createUnknownOptionError(key, $go$constraint_method$tsoptions$UnknownOptionDiagnostic$T0_to_PointerTo_Named_diagnostics$Message(result), "", void 0, void 0, void 0)]);
            __gotots_range_state_5 = 1;
            return true;
        }
        let commandLineOptionEnumMapVal: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = CommandLineOption.EnumMap(opt);
        if (!(commandLineOptionEnumMapVal === undefined)) {
            {
                const __gotots_results_50 = (($value: GoInterface | undefined): [
                    gostring,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return ["", false];
                    }
                    return [$value.$go$value, true];
                })(value);
                let value__shadow_1 = __gotots_results_50[0];
                let ok__shadow_1 = __gotots_results_50[1];
                if (ok__shadow_1) {
                    const __gotots_results_51 = OrderedMap$Get$string$Interface_void(commandLineOptionEnumMapVal, strings__from_gostdlib.ToLower(value__shadow_1));
                    let val: GoInterface | undefined = __gotots_results_51[0];
                    let ok__shadow_2 = __gotots_results_51[1];
                    if (ok__shadow_2) {
                        errors = $go$constraint_method$tsoptions$ParseOption$T0_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic(result, key, val);
                    }
                }
                else {
                    const __gotots_results_52 = convertJsonOption(opt, new $goInterfaceAdapter$string(value__shadow_1), basePath, void 0, void 0, void 0);
                    let convertJson: GoInterface | undefined = __gotots_results_52[0];
                    let err = __gotots_results_52[1];
                    errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
                    let compilerOptionsErr = $go$constraint_method$tsoptions$ParseOption$T0_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic(result, key, convertJson);
                    errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, compilerOptionsErr, void 0);
                }
            }
        }
        else {
            const __gotots_results_53 = convertJsonOption(opt, value, basePath, void 0, void 0, void 0);
            let convertJson: GoInterface | undefined = __gotots_results_53[0];
            let err = __gotots_results_53[1];
            errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
            let compilerOptionsErr = $go$constraint_method$tsoptions$ParseOption$T0_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic(result, key, convertJson);
            errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, compilerOptionsErr, void 0);
        }
        __gotots_range_state_5 = 1;
        return true;
    });
    if (__gotots_range_state_5 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_5 = -2;
    return [result, errors];
}
export function convertArrayLiteralExpressionToJson(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, elementOption: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, returnValue: bool): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    if (!returnValue) {
        const __gotots_range_23 = elements;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_23.length; __gotots_range_index_16++) {
            const __gotots_range_value_30 = __gotots_range_23.get(__gotots_range_index_16);
            let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_30;
            convertPropertyValueToJson(sourceFile, element, elementOption, returnValue, void 0);
        }
        return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    if (elements.length === 0) {
        return [new $goInterfaceAdapter$SliceOf_Interface_void(RuntimeSlice.literal<GoInterface | undefined>([])), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    let value = RuntimeSlice.nil<GoInterface | undefined>();
    const __gotots_range_24 = elements;
    for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_24.length; __gotots_range_index_17++) {
        const __gotots_range_value_31 = __gotots_range_24.get(__gotots_range_index_17);
        let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_31;
        const __gotots_results_59 = convertPropertyValueToJson(sourceFile, element, elementOption, returnValue, void 0);
        let convertedValue: GoInterface | undefined = __gotots_results_59[0];
        let err = __gotots_results_59[1];
        errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
        if (!(convertedValue === undefined)) {
            value = value.append(void 0, [convertedValue]);
        }
    }
    return [new $goInterfaceAdapter$SliceOf_Interface_void(value), errors];
}
export function directoryOfCombinedPath(fileName: gostring, basePath: gostring): gostring {
    return GetDirectoryPath__from_tspath(GetNormalizedAbsolutePath__from_tspath(fileName, basePath));
}
export interface ParseConfigHost extends GoInterfaceValue {
    FS(): FS__from_vfs | undefined;
    GetCurrentDirectory(): gostring;
}
export const ParseConfigHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string]);
export function ParseConfigHost$is(value: GoInterfaceValue | undefined): value is ParseConfigHost {
    return value !== undefined && value.$go$implements(ParseConfigHost$contract);
}
export class resolverHost {
    declare private readonly $goType: void;
    public constructor(public ParseConfigHost: ParseConfigHost | undefined) {
    }
    static $copy($source: resolverHost): resolverHost {
        return new resolverHost($source.ParseConfigHost);
    }
    static $equal($left: resolverHost, $right: resolverHost): bool {
        return goInterfaceEqual($left.ParseConfigHost, $right.ParseConfigHost);
    }
    static $hash($source: resolverHost): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.ParseConfigHost === undefined ? 0 : $source.ParseConfigHost.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export function ParseJsonSourceFileConfigFileContent(sourceFile: {
    value: TsConfigSourceFile;
} | undefined, host: ParseConfigHost | undefined, basePath: gostring, existingOptions: {
    value: CompilerOptions__from_core;
} | undefined, existingOptionsRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, configFileName: gostring, resolutionStack: RuntimeSlice<gostring>, extraFileExtensions: RuntimeSlice<FileExtensionInfo$Storage>, extendedConfigCache: ExtendedConfigCache | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined {
    let result: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined = parseJsonConfigFileContentWorker(void 0, sourceFile, host, basePath, existingOptions, existingOptionsRaw, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
    return result;
}
export function convertObjectLiteralExpressionToJson(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, returnValue: bool, node: {
    value: ObjectLiteralExpression__from_ast;
} | undefined, objectOption: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, jsonConversionNotifier__shadow_1: jsonConversionNotifier | undefined): [
    tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let result: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = void 0;
    if (returnValue) {
        const __gotots_struct_6 = OrderedMap__from_collections.$zero<gostring, GoInterface | undefined>((): GoMapValue<gostring, GoInterface | undefined> => {
            return $goMap$MapOf_string_To_Interface_void.nil();
        });
        result =
            tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, GoInterface | undefined>>(__gotots_struct_6);
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_range_22 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_22.length; __gotots_range_index_15++) {
        const __gotots_range_value_29 = __gotots_range_22.get(__gotots_range_index_15);
        let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_29;
        if (!(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAssignment$constant__from_ast())) {
            errors = errors.append(void 0, [NewDiagnostic__from_ast(sourceFile, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), $state__diagnostics.Property_assignment_expected, RuntimeSlice.nil<GoInterface | undefined>())]);
            continue;
        }
        {
            let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.QuestionToken(element);
            if (!(token === undefined)) {
                errors = errors.append(void 0, [NewDiagnostic__from_ast(sourceFile, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), $state__diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("?")]))]);
            }
        }
        let textOfKey = "";
        if (!IsComputedNonLiteralName__from_ast(Node__from_ast.Name(element))) {
            const __gotots_results_56 = TryGetTextOfPropertyName__from_ast(Node__from_ast.Name(element));
            textOfKey = __gotots_results_56[0];
        }
        let keyText = textOfKey;
        let option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = void 0;
        if (keyText !== "" && !(objectOption === undefined) && !new CommandLineOptionNameMap(CommandLineOption.$storageOf(((objectOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ElementOptions).$value.isNil()) {
            option = new CommandLineOptionNameMap(CommandLineOption.$storageOf(((objectOption ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ElementOptions).Get(keyText);
            if (!(option === undefined) && CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name !== keyText) {
                option = void 0;
            }
        }
        const __gotots_results_57 = convertPropertyValueToJson(sourceFile, PropertyAssignment__from_ast.$storageOf(((Node__from_ast.AsPropertyAssignment(element) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer, option, returnValue, jsonConversionNotifier__shadow_1);
        let value: GoInterface | undefined = __gotots_results_57[0];
        let err = __gotots_results_57[1];
        errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
        if (keyText !== "") {
            if (returnValue) {
                OrderedMap$Set$string$Interface_void(result, keyText, value);
            }
            if (!(jsonConversionNotifier__shadow_1 === undefined)) {
                const __gotots_callee_21 = (jsonConversionNotifier__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).onPropertySet;
                const __gotots_argument_89 = keyText;
                const __gotots_argument_90 = value;
                const __gotots_argument_91 = Node__from_ast.AsPropertyAssignment(element);
                const __gotots_argument_92 = objectOption;
                const __gotots_argument_93 = option;
                const __gotots_results_58 = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
                let err__shadow_1 = __gotots_results_58[1];
                errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err__shadow_1, void 0);
            }
        }
    }
    return [result, errors];
}
export function convertToJson(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, rootExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, returnValue: bool, jsonConversionNotifier__shadow_1: jsonConversionNotifier | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    if (rootExpression === undefined) {
        if (returnValue) {
            return [new $goInterfaceAdapter$Struct_void(new GoEmptyStruct), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
        }
        else {
            return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
        }
    }
    let rootOptions: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = void 0;
    if (!(jsonConversionNotifier__shadow_1 === undefined)) {
        rootOptions = (jsonConversionNotifier__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rootOptions;
    }
    return convertPropertyValueToJson(sourceFile, rootExpression, rootOptions, returnValue, jsonConversionNotifier__shadow_1);
}
export function isDoubleQuotedString(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsStringLiteral__from_ast(node);
}
export function convertPropertyValueToJson(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, valueExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, returnValue: bool, jsonConversionNotifier__shadow_1: jsonConversionNotifier | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    switch (Node__from_ast.$storageOf(((valueExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTrueKeyword$constant__from_ast(): {
            return [new $goInterfaceAdapter$bool(true), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
            break;
        }
        case KindFalseKeyword$constant__from_ast(): {
            return [new $goInterfaceAdapter$bool(false), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
            break;
        }
        case KindNullKeyword$constant__from_ast(): {
            return [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
            break;
        }
        case KindStringLiteral$constant__from_ast(): {
            if (!isDoubleQuotedString(valueExpression)) {
                return [new $goInterfaceAdapter$string(Node__from_ast.Text(valueExpression)), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([NewDiagnostic__from_ast(sourceFile, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((valueExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), $state__diagnostics.String_literal_with_double_quotes_expected, RuntimeSlice.nil<GoInterface | undefined>())])];
            }
            return [new $goInterfaceAdapter$string(Node__from_ast.Text(valueExpression)), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
            break;
        }
        case KindNumericLiteral$constant__from_ast(): {
            return [new $goInterfaceAdapter$float64(FromString__from_jsnum(Node__from_ast.Text(valueExpression)).$value), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
            break;
        }
        case KindPrefixUnaryExpression$constant__from_ast(): {
            if (!(PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(valueExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindMinusToken$constant__from_ast()) || !(Node__from_ast.$storageOf(((PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(valueExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNumericLiteral$constant__from_ast())) {
                break;
            }
            return [new $goInterfaceAdapter$float64(((void Number__from_jsnum,
                    -FromString__from_jsnum(Node__from_ast.Text(PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(valueExpression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand)).$value) as number)), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            let objectLiteralExpression: {
                value: ObjectLiteralExpression__from_ast;
            } | undefined = Node__from_ast.AsObjectLiteralExpression(valueExpression);
            const __gotots_results_47 = convertObjectLiteralExpressionToJson(sourceFile, returnValue, objectLiteralExpression, option, jsonConversionNotifier__shadow_1);
            return [new GoInterfaceAdapter(__gotots_results_47[0]), __gotots_results_47[1]];
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            const __gotots_results_48 = convertArrayLiteralExpressionToJson(sourceFile, Node__from_ast.Elements(valueExpression), option, returnValue);
            let result: GoInterface | undefined = __gotots_results_48[0];
            let errors__shadow_1 = __gotots_results_48[1];
            return [result, errors__shadow_1];
            break;
        }
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    if (!(option === undefined)) {
        errors = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([NewDiagnostic__from_ast(sourceFile, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((valueExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), $state__diagnostics.Compiler_option_0_requires_a_value_of_type_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name), new $goInterfaceAdapter$string(getCompilerOptionValueTypeString(option))]))]);
    }
    else {
        errors = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([NewDiagnostic__from_ast(sourceFile, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((valueExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), $state__diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal, RuntimeSlice.nil<GoInterface | undefined>())]);
    }
    return [void 0, errors];
}
export function convertToObject(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    GoInterface | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let rootExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 0) {
        rootExpression = Node__from_ast.Expression(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
    }
    return convertToJson(sourceFile, rootExpression, true, void 0);
}
export function getDefaultCompilerOptions(configFileName: gostring): {
    value: CompilerOptions__from_core;
} | undefined {
    const __gotots_struct_3 = CompilerOptions__from_core.$zero();
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = { value: __gotots_struct_3 };
    if (configFileName !== "" && GetBaseFileName__from_tspath(configFileName) === "jsconfig.json") {
        let depth = 2;
        const depth$location = tsonicTypeScriptRuntime.boundLocation({}, () => depth, depth$next => depth = depth$next);
        const __gotots_field_14 = TSTrue$constant__from_core();
        const __gotots_field_15 = depth$location;
        const __gotots_field_16 = TSTrue$constant__from_core();
        const __gotots_field_17 = TSTrue$constant__from_core();
        const __gotots_struct_4 = CompilerOptions__from_core.$zero();
        __gotots_struct_4.AllowJs = __gotots_field_14;
        __gotots_struct_4.MaxNodeModuleJsDepth = __gotots_field_15;
        __gotots_struct_4.SkipLibCheck = __gotots_field_16;
        __gotots_struct_4.NoEmit = __gotots_field_17;
        options =
            { value: __gotots_struct_4 };
    }
    return options;
}
export function getDefaultTypeAcquisition(configFileName: gostring): {
    value: TypeAcquisition__from_core;
} | undefined {
    let options: {
        value: TypeAcquisition__from_core;
    } | undefined = { value: new TypeAcquisition__from_core(0, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0) };
    if (configFileName !== "" && GetBaseFileName__from_tspath(configFileName) === "jsconfig.json") {
        (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable = TSTrue$constant__from_core();
    }
    return options;
}
export function convertCompilerOptionsFromJsonWorker(jsonOptions: GoInterface | undefined, basePath: gostring, configFileName: gostring): [
    {
        value: CompilerOptions__from_core;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = getDefaultCompilerOptions(configFileName);
    const __gotots_results_35 = convertOptionsFromJson$PointerTo_Named_tsoptions$compilerOptionsParser(new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap), jsonOptions, basePath, new compilerOptionsParser(options));
    let errors = __gotots_results_35[1];
    if (configFileName !== "") {
        (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath = NormalizeSlashes__from_tspath(configFileName);
    }
    return [options, errors];
}
export function convertTypeAcquisitionFromJsonWorker(jsonOptions: GoInterface | undefined, basePath: gostring, configFileName: gostring): [
    {
        value: TypeAcquisition__from_core;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let options: {
        value: TypeAcquisition__from_core;
    } | undefined = getDefaultTypeAcquisition(configFileName);
    const __gotots_results_36 = convertOptionsFromJson$PointerTo_Named_tsoptions$typeAcquisitionParser(new CommandLineOptionNameMap(CommandLineOption.$storageOf((($state.typeAcquisitionDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).ElementOptions), jsonOptions, basePath, new typeAcquisitionParser(options));
    let errors = __gotots_results_36[1];
    return [options, errors];
}
export function parseOwnConfigOfJson(json: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, host: ParseConfigHost | undefined, basePath: gostring, configFileName: gostring): [
    {
        value: parsedTsconfig;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    if (OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(json, "excludes")) {
        errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Unknown_option_excludes_Did_you_mean_exclude, RuntimeSlice.nil<GoInterface | undefined>())]);
    }
    const __gotots_results_28 = convertCompilerOptionsFromJsonWorker(OrderedMap$GetOrZero$string$Interface_void(json, "compilerOptions"), basePath, configFileName);
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = __gotots_results_28[0];
    let err = __gotots_results_28[1];
    const __gotots_results_29 = convertTypeAcquisitionFromJsonWorker(OrderedMap$GetOrZero$string$Interface_void(json, "typeAcquisition"), basePath, configFileName);
    let typeAcquisition: {
        value: TypeAcquisition__from_core;
    } | undefined = __gotots_results_29[0];
    let err2 = __gotots_results_29[1];
    errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0), err2, void 0);
    let extendedConfigPath = RuntimeSlice.nil<gostring>();
    {
        let __go_extends: GoInterface | undefined = OrderedMap$GetOrZero$string$Interface_void(json, "extends");
        if (!(__go_extends === undefined) && !goInterfaceEqual(__go_extends, new $goInterfaceAdapter$string(""))) {
            const __gotots_results_30 = getExtendsConfigPathOrArray(__go_extends, host, basePath, configFileName, void 0, void 0, void 0);
            extendedConfigPath = __gotots_results_30[0];
            err = __gotots_results_30[1];
            errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
        }
    }
    let parsedConfig: {
        value: parsedTsconfig;
    } | undefined = { value: new parsedTsconfig(new GoInterfaceAdapter(json), options, typeAcquisition, new $goInterfaceAdapter$SliceOf_string(extendedConfigPath)) };
    return [parsedConfig, errors];
}
export function readJsonConfigFile(fileName: gostring, path: Path__from_tspath, readFile: (($0: gostring) => [
    gostring,
    bool
]) | undefined): [
    {
        value: TsConfigSourceFile;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    const __gotots_results_5 = tryReadFile(fileName, readFile, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([]));
    let text = __gotots_results_5[0];
    let diagnostic = __gotots_results_5[1];
    if (text !== "") {
        return [
            { value: new TsConfigSourceFile(RuntimeSlice.nil<gostring>(), void 0, ParseSourceFile__from_parser(SourceFileParseOptions__from_ast.$fromStorage({
                    FileName: fileName,
                    Path: path.$value,
                    ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$storageOf(ExternalModuleIndicatorOptions__from_ast.$zero())
                }), text, ScriptKindJSON$constant__from_core())) }, diagnostic];
    }
    else {
        const __gotots_struct_0 = NodeFactory__from_ast.$zero();
        const __gotots_receiver_11 = (tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_0));
        const __gotots_argument_17 = SourceFileParseOptions__from_ast.$fromStorage({
            FileName: fileName,
            Path: path.$value,
            ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$storageOf(ExternalModuleIndicatorOptions__from_ast.$zero())
        });
        const __gotots_argument_18 = "";
        const __gotots_argument_19 = void 0;
        const __gotots_struct_1 = NodeFactory__from_ast.$zero();
        const __gotots_argument_20 = NodeFactory__from_ast.NewToken((tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_1)), KindEndOfFile$constant__from_ast());
        const __gotots_field_0 = Node__from_ast.AsSourceFile(NodeFactory__from_ast.NewSourceFile(__gotots_receiver_11, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20));
        let file: {
            value: TsConfigSourceFile;
        } | undefined = { value: new TsConfigSourceFile(RuntimeSlice.nil<gostring>(), void 0, __gotots_field_0) };
        SourceFile__from_ast.SetDiagnostics((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, diagnostic);
        return [file, diagnostic];
    }
}
export function getExtendedConfig(sourceFile: {
    value: TsConfigSourceFile;
} | undefined, extendedConfigFileName: gostring, host: ParseConfigHost | undefined, resolutionStack: RuntimeSlice<gostring>, extendedConfigCache: ExtendedConfigCache | undefined, result: extendsResult | undefined): [
    {
        value: parsedTsconfig;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_argument_73 = extendedConfigFileName;
    const __gotots_receiver_28 = host;
    const __gotots_argument_74 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_28).GetCurrentDirectory();
    const __gotots_receiver_29 = host;
    const __gotots_receiver_30 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_29).FS();
    const __gotots_argument_75 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_30).UseCaseSensitiveFileNames();
    let extendedConfigPath = ToPath__from_tspath(__gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
    let cacheEntry: {
        value: ExtendedConfigCacheEntry;
    } | undefined = void 0;
    if (!(extendedConfigCache === undefined) && !Contains$SliceOf_Named_tspath$Path$Named_tspath$Path(resolutionStack, extendedConfigPath)) {
        const __gotots_receiver_31 = extendedConfigCache;
        const __gotots_argument_76 = extendedConfigFileName;
        const __gotots_argument_77 = extendedConfigPath;
        const __gotots_argument_78 = resolutionStack;
        const __gotots_argument_79 = host;
        cacheEntry = goInterfaceNonNil<ExtendedConfigCache>(__gotots_receiver_31).GetExtendedConfig(__gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79);
    }
    else {
        cacheEntry = ParseExtendedConfig(extendedConfigFileName, extendedConfigPath, resolutionStack, host, extendedConfigCache);
    }
    if ((cacheEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.length > 0) {
        errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, (cacheEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors, void 0);
    }
    if (!((cacheEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedResult === undefined)) {
        if (!(sourceFile === undefined)) {
            const __gotots_store_2 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "extendedSourceFiles"), SourceFile__from_ast.FileName(((cacheEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile));
            const __gotots_range_13 = ((cacheEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedSourceFiles;
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_13.length; __gotots_range_index_8++) {
                const __gotots_range_value_16 = __gotots_range_13.get(__gotots_range_index_8);
                let extendedSourceFile = __gotots_range_value_16;
                const __gotots_store_3 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "extendedSourceFiles"), extendedSourceFile);
            }
        }
    }
    return [(cacheEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfig, errors];
}
export function ParseExtendedConfig(fileName: gostring, path: Path__from_tspath, resolutionStack: RuntimeSlice<gostring>, host: ParseConfigHost | undefined, extendedConfigCache: ExtendedConfigCache | undefined): {
    value: ExtendedConfigCacheEntry;
} | undefined {
    const __gotots_argument_14 = fileName;
    const __gotots_argument_15 = path;
    const __gotots_receiver_7 = host;
    const __gotots_receiver_8 = goInterfaceNonNil(goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_7).FS());
    const __gotots_argument_16 = DeferredCallableRegistry.register(($argument0: gostring): [
        gostring,
        bool
    ] => __gotots_receiver_8.ReadFile($argument0), ($go$recovery: GoRecovery, $argument0: gostring): [
        gostring,
        bool
    ] => {
        const __gotots_receiver_9: FS__from_vfs = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8);
        const __gotots_deferred_1 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$ReadFile$string_to_string_bool, __gotots_receiver_9);
        return __gotots_deferred_1 === undefined ? __gotots_receiver_9.ReadFile($argument0) : __gotots_deferred_1($go$recovery, __gotots_receiver_9, $argument0);
    });
    const __gotots_results_1 = readJsonConfigFile(__gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
    let extendedResult: {
        value: TsConfigSourceFile;
    } | undefined = __gotots_results_1[0];
    let readErrors = __gotots_results_1[1];
    let entry: {
        value: ExtendedConfigCacheEntry;
    } | undefined = { value: new ExtendedConfigCacheEntry(extendedResult, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()) };
    if (readErrors.length > 0) {
        (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = readErrors;
        return entry;
    }
    {
        let parseDiagnostics = SourceFile__from_ast.Diagnostics((extendedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile);
        if (parseDiagnostics.length > 0) {
            (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = parseDiagnostics;
            return entry;
        }
    }
    let parseErrors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_store_0 = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_results_2 = parseConfig(void 0, extendedResult, host, GetDirectoryPath__from_tspath(fileName), GetBaseFileName__from_tspath(fileName), resolutionStack, extendedConfigCache);
    __gotots_store_0.extendedConfig = __gotots_results_2[0];
    parseErrors = __gotots_results_2[1];
    (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = parseErrors;
    return entry;
}
export function parseConfig(json: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, sourceFile: {
    value: TsConfigSourceFile;
} | undefined, host: ParseConfigHost | undefined, basePath: gostring, configFileName: gostring, resolutionStack: RuntimeSlice<gostring>, extendedConfigCache: ExtendedConfigCache | undefined): [
    {
        value: parsedTsconfig;
    } | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    basePath = NormalizeSlashes__from_tspath(basePath);
    const __gotots_argument_21 = configFileName;
    const __gotots_argument_22 = basePath;
    const __gotots_receiver_12 = host;
    const __gotots_receiver_13 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_12).FS();
    const __gotots_argument_23 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_13).UseCaseSensitiveFileNames();
    let resolvedPath = ToPath__from_tspath(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    if (Contains$SliceOf_Named_tspath$Path$Named_tspath$Path(resolutionStack, resolvedPath)) {
        let result: {
            value: parsedTsconfig;
        } | undefined = void 0;
        errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Circularity_detected_while_resolving_configuration_Colon_0, RuntimeSlice.nil<GoInterface | undefined>())]);
        if (OrderedMap$Size$string$Interface_void(json) === 0) {
            result =
                { value: new parsedTsconfig(new GoInterfaceAdapter(json), void 0, void 0, void 0) };
        }
        else {
            const __gotots_results_6 = convertToObject((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile);
            let rawResult: GoInterface | undefined = __gotots_results_6[0];
            let err__shadow_1 = __gotots_results_6[1];
            errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err__shadow_1, void 0);
            result =
                { value: new parsedTsconfig(rawResult, void 0, void 0, void 0) };
        }
        return [result, errors];
    }
    let ownConfig: {
        value: parsedTsconfig;
    } | undefined = void 0;
    let err = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    if (!(json === undefined)) {
        const __gotots_results_7 = parseOwnConfigOfJson(json, host, basePath, configFileName);
        ownConfig = __gotots_results_7[0];
        err = __gotots_results_7[1];
    }
    else {
        const __gotots_results_8 = parseOwnConfigOfJsonSourceFile(tsconfigToSourceFile(sourceFile), host, basePath, configFileName);
        ownConfig = __gotots_results_8[0];
        err = __gotots_results_8[1];
    }
    errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
    if (!((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options === undefined) && !(((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths === undefined)) {
        ((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PathsBasePath = basePath;
    }
    let applyExtendedConfig: (($0: extendsResult | undefined, $1: gostring) => void) | undefined = (result: extendsResult | undefined, extendedConfigPath: gostring): void => {
        const __gotots_results_9 = getExtendedConfig(sourceFile, extendedConfigPath, host, resolutionStack, extendedConfigCache, result);
        let extendedConfig: {
            value: parsedTsconfig;
        } | undefined = __gotots_results_9[0];
        let extendedErrors = __gotots_results_9[1];
        errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, extendedErrors, void 0);
        if (!(extendedConfig === undefined) && !((extendedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options === undefined)) {
            let extendsRaw: GoInterface | undefined = (extendedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw;
            let relativeDifference = "";
            let setPropertyValue: (($0: gostring) => void) | undefined = (propertyName: gostring): void => {
                {
                    const __gotots_results_10 = (($value: GoInterface | undefined): [
                        tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
                        boolean
                    ] => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return [void 0, false];
                        }
                        return [$value.$go$value, true];
                    })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw);
                    let rawMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_10[0];
                    let ok = __gotots_results_10[1];
                    if (ok && OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(rawMap, propertyName)) {
                        return;
                    }
                }
                if (propertyName === "include" || propertyName === "exclude" || propertyName === "files") {
                    {
                        const __gotots_results_11 = (($value: GoInterface | undefined): [
                            tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
                            boolean
                        ] => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return [void 0, false];
                            }
                            return [$value.$go$value, true];
                        })(extendsRaw);
                        let rawMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_11[0];
                        let ok = __gotots_results_11[1];
                        if (ok && OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(rawMap, propertyName)) {
                            {
                                const __gotots_results_12 = (($value: GoInterface | undefined): [
                                    RuntimeSlice<GoInterface | undefined>,
                                    boolean
                                ] => {
                                    if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                                        return [RuntimeSlice.nil<GoInterface | undefined>(), false];
                                    }
                                    return [$value.$go$value, true];
                                })(OrderedMap$GetOrZero$string$Interface_void(rawMap, propertyName));
                                let slice = __gotots_results_12[0];
                                if (!slice.isNil()) {
                                    let value = Map$Interface_void$Interface_void(slice, (path: GoInterface | undefined): GoInterface | undefined => {
                                        if (startsWithConfigDirTemplate(path) || IsRootedDiskPath__from_tspath((($value: GoInterface | undefined): gostring => {
                                            if (!$goInterfaceAdapter$string.$is($value)) {
                                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                            }
                                            return $value.$go$value;
                                        })(path))) {
                                            return new $goInterfaceAdapter$string((($value: GoInterface | undefined): gostring => {
                                                if (!$goInterfaceAdapter$string.$is($value)) {
                                                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                                }
                                                return $value.$go$value;
                                            })(path));
                                        }
                                        else {
                                            if (relativeDifference === "") {
                                                const __gotots_receiver_14 = host;
                                                const __gotots_receiver_15 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_14).FS();
                                                const __gotots_field_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_15).UseCaseSensitiveFileNames();
                                                let t = new ComparePathsOptions__from_tspath(__gotots_field_1, basePath);
                                                relativeDifference = ConvertToRelativePath__from_tspath(GetDirectoryPath__from_tspath(extendedConfigPath), ComparePathsOptions__from_tspath.$copy(t));
                                            }
                                            return new $goInterfaceAdapter$string(CombinePaths__from_tspath(relativeDifference, RuntimeSlice.literal<gostring>([(($value: GoInterface | undefined): gostring => {
                                                    if (!$goInterfaceAdapter$string.$is($value)) {
                                                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                                    }
                                                    return $value.$go$value;
                                                })(path)])));
                                        }
                                    });
                                    if (propertyName === "include") {
                                        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).include = value;
                                    }
                                    else if (propertyName === "exclude") {
                                        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exclude = value;
                                    }
                                    else if (propertyName === "files") {
                                        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).files = value;
                                    }
                                }
                            }
                        }
                    }
                }
            };
            const __gotots_callee_0 = setPropertyValue;
            const __gotots_argument_24 = "include";
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
            const __gotots_callee_1 = setPropertyValue;
            const __gotots_argument_25 = "exclude";
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
            const __gotots_callee_2 = setPropertyValue;
            const __gotots_argument_26 = "files";
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26);
            {
                const __gotots_results_13 = (($value: GoInterface | undefined): [
                    tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [void 0, false];
                    }
                    return [$value.$go$value, true];
                })(extendsRaw);
                let extendedRawMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_13[0];
                let ok = __gotots_results_13[1];
                if (ok && OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(extendedRawMap, "compileOnSave")) {
                    {
                        const __gotots_results_14 = (($value: GoInterface | undefined): [
                            bool,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$bool.$is($value)) {
                                return [false, false];
                            }
                            return [$value.$go$value, true];
                        })(OrderedMap$GetOrZero$string$Interface_void(extendedRawMap, "compileOnSave"));
                        let compileOnSave = __gotots_results_14[0];
                        let ok__shadow_1 = __gotots_results_14[1];
                        if (ok__shadow_1) {
                            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compileOnSave = compileOnSave;
                        }
                    }
                }
            }
            mergeCompilerOptions((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, (extendedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options, extendsRaw);
        }
    };
    if (!((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigPath === undefined)) {
        resolutionStack = resolutionStack.append(((void Path__from_tspath,
            "") as string), [resolvedPath.$value]);
        const __gotots_struct_2 = CompilerOptions__from_core.$zero();
        const __gotots_field_2 = { value: __gotots_struct_2 };
        const __gotots_assign_0 = new extendsResult(__gotots_field_2, false, RuntimeSlice.nil<GoInterface | undefined>(), RuntimeSlice.nil<GoInterface | undefined>(), RuntimeSlice.nil<GoInterface | undefined>(), false, Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return $goMap$MapOf_string_To_Struct_void.nil();
        }));
        let result: extendsResult | undefined = __gotots_assign_0;
        const __gotots_receiver_16 = named_reflect.ReflectTypeMetadataOperations.$typeOf((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigPath);
        if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_16).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String)) {
            const __gotots_callee_3 = applyExtendedConfig;
            const __gotots_argument_27 = result;
            const __gotots_argument_28 = (($value: GoInterface | undefined): gostring => {
                if (!$goInterfaceAdapter$string.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigPath);
            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28);
        }
        else {
            const __gotots_results_15 = (($value: GoInterface | undefined): [
                RuntimeSlice<gostring>,
                boolean
            ] => {
                if (!$goInterfaceAdapter$SliceOf_string.$is($value)) {
                    return [RuntimeSlice.nil<gostring>(), false];
                }
                return [$value.$go$value, true];
            })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigPath);
            let configPath = __gotots_results_15[0];
            let ok = __gotots_results_15[1];
            if (ok) {
                const __gotots_range_1 = configPath;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                    const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_0);
                    let extendedConfigPath = __gotots_range_value_2;
                    const __gotots_callee_4 = applyExtendedConfig;
                    const __gotots_argument_29 = result;
                    const __gotots_argument_30 = extendedConfigPath;
                    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29, __gotots_argument_30);
                }
            }
        }
        if (!(result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).include.isNil()) {
            OrderedMap$Set$string$Interface_void((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw), "include", new $goInterfaceAdapter$SliceOf_Interface_void((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).include));
        }
        if (!(result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exclude.isNil()) {
            OrderedMap$Set$string$Interface_void((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw), "exclude", new $goInterfaceAdapter$SliceOf_Interface_void((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exclude));
        }
        if (!(result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).files.isNil()) {
            OrderedMap$Set$string$Interface_void((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw), "files", new $goInterfaceAdapter$SliceOf_Interface_void((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).files));
        }
        if ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compileOnSave && !OrderedMap__from_collections.Has<gostring, GoInterface | undefined>((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw), "compileOnSave")) {
            OrderedMap$Set$string$Interface_void((($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw), "compileOnSave", new $goInterfaceAdapter$bool((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compileOnSave));
        }
        if (!(sourceFile === undefined)) {
            const __gotots_store_1 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_range_2 = Set$Keys$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "extendedSourceFiles"));
            const __gotots_range_keys_0 = __gotots_range_2.keys();
            for (const __gotots_range_value_3 of __gotots_range_keys_0) {
                const __gotots_range_value_4 = __gotots_range_2.lookupOk(__gotots_range_value_3);
                if (!__gotots_range_value_4[1]) {
                    continue;
                }
                const __gotots_range_value_5 = __gotots_range_value_3;
                let extendedSourceFile = __gotots_range_value_5;
                (sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedSourceFiles = InsertSorted$string((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedSourceFiles, extendedSourceFile, $goDeferred$string_string_to_int.register(($argument0: gostring, $argument1: gostring): int => {
                    return Compare$string($argument0, $argument1);
                }, ($go$recovery: GoRecovery, $argument0: gostring, $argument1: gostring): int => {
                    return Compare$string$deferred($go$recovery, $argument0, $argument1);
                }));
            }
        }
        (ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options = mergeCompilerOptions((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options, (ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options, (ownConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw);
    }
    return [ownConfig, errors];
}
export const defaultIncludeSpec$string: gostring = "**/*";
export class propOfRaw {
    declare private readonly $goType: void;
    public constructor(public sliceValue: RuntimeSlice<GoInterface | undefined>, public wrongValue: gostring) {
    }
    declare private readonly then?: never;
}
export function parseJsonConfigFileContentWorker(json: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, sourceFile: {
    value: TsConfigSourceFile;
} | undefined, host: ParseConfigHost | undefined, basePath: gostring, existingOptions: {
    value: CompilerOptions__from_core;
} | undefined, existingOptionsRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, configFileName: gostring, resolutionStack: RuntimeSlice<gostring>, extraFileExtensions: RuntimeSlice<FileExtensionInfo$Storage>, extendedConfigCache: ExtendedConfigCache | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined {
    Assert__from_debug((json === undefined && !(sourceFile === undefined)) || (!(json === undefined) && sourceFile === undefined), RuntimeSlice.nil<GoInterface | undefined>());
    let basePathForFileNames = "";
    if (configFileName !== "") {
        basePathForFileNames = NormalizePath__from_tspath(directoryOfCombinedPath(configFileName, basePath));
    }
    else {
        basePathForFileNames = NormalizePath__from_tspath(basePath);
    }
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    const __gotots_results_17 = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, extendedConfigCache);
    let parsedConfig: {
        value: parsedTsconfig;
    } | undefined = __gotots_results_17[0];
    errors = __gotots_results_17[1];
    mergeCompilerOptions((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options, existingOptions, new GoInterfaceAdapter(existingOptionsRaw));
    handleOptionConfigDirTemplateSubstitution((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options, basePathForFileNames);
    let rawConfig: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = parseJsonToStringKey((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw);
    if (configFileName !== "" && !((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options === undefined)) {
        ((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath = NormalizeSlashes__from_tspath(configFileName);
    }
    let getPropFromRaw: (($0: gostring, $1: (($0: GoInterface | undefined) => bool) | undefined, $2: gostring) => propOfRaw) | undefined = (prop: gostring, validateElement: (($0: GoInterface | undefined) => bool) | undefined, elementTypeName: gostring): propOfRaw => {
        const __gotots_results_18 = OrderedMap$Get$string$Interface_void(rawConfig, prop);
        let value: GoInterface | undefined = __gotots_results_18[0];
        let exists = __gotots_results_18[1];
        if (exists && !(value === undefined)) {
            const __gotots_receiver_17 = named_reflect.ReflectTypeMetadataOperations.$typeOf(value);
            if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_17).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice)) {
                let result: GoInterface | undefined = OrderedMap$GetOrZero$string$Interface_void(rawConfig, prop);
                {
                    const __gotots_results_19 = (($value: GoInterface | undefined): [
                        RuntimeSlice<GoInterface | undefined>,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                            return [RuntimeSlice.nil<GoInterface | undefined>(), false];
                        }
                        return [$value.$go$value, true];
                    })(result);
                    let ok = __gotots_results_19[1];
                    if (ok) {
                        if (sourceFile === undefined && !Every$Interface_void((($value: GoInterface | undefined): RuntimeSlice<GoInterface | undefined> => {
                            if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })(result), validateElement)) {
                            errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Compiler_option_0_requires_a_value_of_type_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(prop), new $goInterfaceAdapter$string(elementTypeName)]))]);
                        }
                    }
                }
                return new propOfRaw((($value: GoInterface | undefined): RuntimeSlice<GoInterface | undefined> => {
                    if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(result), "");
            }
            else if (sourceFile === undefined) {
                errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Compiler_option_0_requires_a_value_of_type_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(prop), new $goInterfaceAdapter$string("Array")]))]);
                return new propOfRaw(RuntimeSlice.nil<GoInterface | undefined>(), "not-array");
            }
        }
        return new propOfRaw(RuntimeSlice.nil<GoInterface | undefined>(), "no-prop");
    };
    const __gotots_callee_5 = getPropFromRaw;
    const __gotots_argument_31 = "references";
    const __gotots_argument_32 = (element: GoInterface | undefined): bool => {
        return goInterfaceEqual(named_reflect.ReflectTypeMetadataOperations.$typeOf(element), $state.orderedMapType);
    };
    const __gotots_argument_33 = "object";
    let referencesOfRaw = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
    const __gotots_callee_6 = getPropFromRaw;
    const __gotots_argument_34 = "files";
    const __gotots_argument_35 = (element: GoInterface | undefined): bool => {
        const __gotots_receiver_18 = named_reflect.ReflectTypeMetadataOperations.$typeOf(element);
        return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_18).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
    };
    const __gotots_argument_36 = "string";
    let fileSpecs = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
    if (!fileSpecs.sliceValue.isNil() || fileSpecs.wrongValue === "") {
        let hasZeroOrNoReferences = false;
        if (referencesOfRaw.wrongValue === "no-prop" || referencesOfRaw.wrongValue === "not-array" || referencesOfRaw.sliceValue.length === 0) {
            hasZeroOrNoReferences = true;
        }
        let hasExtends: GoInterface | undefined = OrderedMap$GetOrZero$string$Interface_void(rawConfig, "extends");
        if (!fileSpecs.sliceValue.isNil() && fileSpecs.sliceValue.length === 0 && hasZeroOrNoReferences && hasExtends === undefined) {
            if (!(sourceFile === undefined)) {
                let fileName = "";
                if (configFileName !== "") {
                    fileName = configFileName;
                }
                else {
                    fileName = "tsconfig.json";
                }
                let diagnosticMessage: {
                    value: Message__from_diagnostics;
                } | undefined = $state__diagnostics.The_files_list_in_config_file_0_is_empty;
                let nodeValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ForEachTsConfigPropArray<Node__from_ast>((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, "files", (property: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer;
                });
                errors = errors.append(void 0, [CreateDiagnosticForNodeInSourceFile((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, nodeValue, diagnosticMessage, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fileName)]))]);
            }
            else {
                errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.The_files_list_in_config_file_0_is_empty, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(configFileName)]))]);
            }
        }
    }
    const __gotots_callee_7 = getPropFromRaw;
    const __gotots_argument_37 = "include";
    const __gotots_argument_38 = (element: GoInterface | undefined): bool => {
        const __gotots_receiver_19 = named_reflect.ReflectTypeMetadataOperations.$typeOf(element);
        return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_19).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
    };
    const __gotots_argument_39 = "string";
    let includeSpecs = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37, __gotots_argument_38, __gotots_argument_39);
    const __gotots_callee_8 = getPropFromRaw;
    const __gotots_argument_40 = "exclude";
    const __gotots_argument_41 = (element: GoInterface | undefined): bool => {
        const __gotots_receiver_20 = named_reflect.ReflectTypeMetadataOperations.$typeOf(element);
        return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_20).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
    };
    const __gotots_argument_42 = "string";
    let excludeSpecs = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
    let isDefaultIncludeSpec = false;
    if (excludeSpecs.wrongValue === "no-prop" && !((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options === undefined)) {
        let outDir = ((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir;
        let declarationDir = ((parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir;
        if (outDir !== "" || declarationDir !== "") {
            let values = RuntimeSlice.nil<GoInterface | undefined>();
            if (outDir !== "") {
                values = values.append(void 0, [new $goInterfaceAdapter$string(outDir)]);
            }
            if (declarationDir !== "") {
                values = values.append(void 0, [new $goInterfaceAdapter$string(declarationDir)]);
            }
            excludeSpecs = new propOfRaw(values, "");
        }
    }
    if (fileSpecs.sliceValue.isNil() && includeSpecs.sliceValue.isNil()) {
        includeSpecs = new propOfRaw(RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(defaultIncludeSpec$string)]), "");
        isDefaultIncludeSpec = true;
    }
    let validatedIncludeSpecs = RuntimeSlice.nil<gostring>();
    let validatedIncludeSpecsBeforeSubstitution = RuntimeSlice.nil<gostring>();
    let validatedExcludeSpecs = RuntimeSlice.nil<gostring>();
    let validatedFilesSpec = RuntimeSlice.nil<gostring>();
    let validatedFilesSpecBeforeSubstitution = RuntimeSlice.nil<gostring>();
    if (!includeSpecs.sliceValue.isNil()) {
        let err = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_results_20 = validateSpecs(new $goInterfaceAdapter$SliceOf_Interface_void(includeSpecs.sliceValue), true, tsconfigToSourceFile(sourceFile), "include");
        validatedIncludeSpecsBeforeSubstitution = __gotots_results_20[0];
        err = __gotots_results_20[1];
        errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
        {
            validatedIncludeSpecs = getSubstitutedStringArrayWithConfigDirTemplate(validatedIncludeSpecsBeforeSubstitution, basePathForFileNames);
            if (validatedIncludeSpecs.isNil()) {
                validatedIncludeSpecs = validatedIncludeSpecsBeforeSubstitution;
            }
        }
    }
    if (!excludeSpecs.sliceValue.isNil()) {
        let err = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_results_21 = validateSpecs(new $goInterfaceAdapter$SliceOf_Interface_void(excludeSpecs.sliceValue), false, tsconfigToSourceFile(sourceFile), "exclude");
        validatedExcludeSpecs = __gotots_results_21[0];
        err = __gotots_results_21[1];
        errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(errors, err, void 0);
        {
            let validatedExcludeSpecsWithSubstitution = getSubstitutedStringArrayWithConfigDirTemplate(validatedExcludeSpecs, basePathForFileNames);
            if (!validatedExcludeSpecsWithSubstitution.isNil()) {
                validatedExcludeSpecs = validatedExcludeSpecsWithSubstitution;
            }
        }
    }
    if (!fileSpecs.sliceValue.isNil()) {
        let fileSpecs__shadow_1 = Filter$Interface_void(fileSpecs.sliceValue, (spec: GoInterface | undefined): bool => {
            const __gotots_receiver_21 = named_reflect.ReflectTypeMetadataOperations.$typeOf(spec);
            return named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_21).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String);
        });
        const __gotots_range_3 = fileSpecs__shadow_1;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
            const __gotots_range_value_6 = __gotots_range_3.get(__gotots_range_index_1);
            let spec: GoInterface | undefined = __gotots_range_value_6;
            {
                const __gotots_results_22 = (($value: GoInterface | undefined): [
                    gostring,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return ["", false];
                    }
                    return [$value.$go$value, true];
                })(spec);
                let spec__shadow_1 = __gotots_results_22[0];
                let ok = __gotots_results_22[1];
                if (ok) {
                    validatedFilesSpecBeforeSubstitution = validatedFilesSpecBeforeSubstitution.append("", [spec__shadow_1]);
                }
            }
        }
        {
            validatedFilesSpec = getSubstitutedStringArrayWithConfigDirTemplate(validatedFilesSpecBeforeSubstitution, basePathForFileNames);
            if (validatedFilesSpec.isNil()) {
                validatedFilesSpec = validatedFilesSpecBeforeSubstitution;
            }
        }
    }
    let configFileSpecs__shadow_1 = new configFileSpecs(new $goInterfaceAdapter$SliceOf_Interface_void(fileSpecs.sliceValue), new $goInterfaceAdapter$SliceOf_Interface_void(includeSpecs.sliceValue), new $goInterfaceAdapter$SliceOf_Interface_void(excludeSpecs.sliceValue), validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs, validatedFilesSpecBeforeSubstitution, validatedIncludeSpecsBeforeSubstitution, isDefaultIncludeSpec);
    const configFileSpecs__shadow_1$location = tsonicTypeScriptRuntime.boundLocation({}, () => configFileSpecs__shadow_1, configFileSpecs__shadow_1$next => configFileSpecs__shadow_1 = configFileSpecs__shadow_1$next);
    if (!(sourceFile === undefined)) {
        (sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs =
            configFileSpecs__shadow_1$location;
    }
    let getFileNames: (($0: gostring) => [
        RuntimeSlice<gostring>,
        int
    ]) | undefined = (basePath__shadow_1: gostring): [
        RuntimeSlice<gostring>,
        int
    ] => {
        let parsedConfigOptions: {
            value: CompilerOptions__from_core;
        } | undefined = (parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options;
        const __gotots_argument_43 = configFileSpecs.$copy(configFileSpecs__shadow_1);
        const __gotots_argument_44 = basePath__shadow_1;
        const __gotots_argument_45 = parsedConfigOptions;
        const __gotots_receiver_22 = host;
        const __gotots_argument_46 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_22).FS();
        const __gotots_argument_47 = extraFileExtensions;
        const __gotots_results_23 = getFileNamesFromConfigSpecs(__gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47);
        let fileNames__shadow_1 = __gotots_results_23[0];
        let literalFileNamesLen__shadow_1 = __gotots_results_23[1];
        if (shouldReportNoInputFiles(fileNames__shadow_1, canJsonReportNoInputFiles(rawConfig), resolutionStack)) {
            let includeSpecs__shadow_1: GoInterface | undefined = configFileSpecs__shadow_1.includeSpecs;
            let excludeSpecs__shadow_1: GoInterface | undefined = configFileSpecs__shadow_1.excludeSpecs;
            if (includeSpecs__shadow_1 === undefined) {
                includeSpecs__shadow_1 = new $goInterfaceAdapter$SliceOf_string(RuntimeSlice.literal<gostring>([]));
            }
            if (excludeSpecs__shadow_1 === undefined) {
                excludeSpecs__shadow_1 = new $goInterfaceAdapter$SliceOf_string(RuntimeSlice.literal<gostring>([]));
            }
            const __gotots_argument_53 = errors;
            const __gotots_argument_51 = $state__diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2;
            const __gotots_argument_48 = new $goInterfaceAdapter$string(configFileName);
            const __gotots_results_24 = StringifyJson__from_core(includeSpecs__shadow_1, "", "");
            const __gotots_argument_49 = new $goInterfaceAdapter$string(Must$string(__gotots_results_24[0], __gotots_results_24[1]));
            const __gotots_results_25 = StringifyJson__from_core(excludeSpecs__shadow_1, "", "");
            const __gotots_argument_50 = new $goInterfaceAdapter$string(Must$string(__gotots_results_25[0], __gotots_results_25[1]));
            const __gotots_argument_52 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_48, __gotots_argument_49, __gotots_argument_50]);
            const __gotots_argument_54 = NewCompilerDiagnostic__from_ast(__gotots_argument_51, __gotots_argument_52);
            errors = __gotots_argument_53.append(void 0, [__gotots_argument_54]);
        }
        return [fileNames__shadow_1, literalFileNamesLen__shadow_1];
    };
    let getProjectReferences: (($0: gostring) => RuntimeSlice<tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined>) | undefined = (basePath__shadow_1: gostring): RuntimeSlice<tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined> => {
        let projectReferences = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined>();
        const __gotots_callee_9 = getPropFromRaw;
        const __gotots_argument_55 = "references";
        const __gotots_argument_56 = (element: GoInterface | undefined): bool => {
            return goInterfaceEqual(named_reflect.ReflectTypeMetadataOperations.$typeOf(element), $state.orderedMapType);
        };
        const __gotots_argument_57 = "object";
        let newReferencesOfRaw = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55, __gotots_argument_56, __gotots_argument_57);
        if (!newReferencesOfRaw.sliceValue.isNil()) {
            projectReferences = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined>([]);
            const __gotots_range_4 = newReferencesOfRaw.sliceValue;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_4.length; __gotots_range_index_2++) {
                const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_2);
                let reference: GoInterface | undefined = __gotots_range_value_7;
                const __gotots_range_5 = parseProjectReference(reference);
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_5.length; __gotots_range_index_3++) {
                    const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_3);
                    let ref: tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined = __gotots_range_value_8;
                    if (((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectReference__from_core>).value.Path === "") {
                        if (sourceFile === undefined) {
                            errors = errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Compiler_option_0_requires_a_value_of_type_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("reference.path"), new $goInterfaceAdapter$string("string")]))]);
                        }
                    }
                    else {
                        projectReferences = projectReferences.append(void 0, [
                            tsonicTypeScriptRuntime.location<ProjectReference__from_core>(new ProjectReference__from_core(GetNormalizedAbsolutePath__from_tspath(((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectReference__from_core>).value.Path, basePath__shadow_1), ((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectReference__from_core>).value.Path, ((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectReference__from_core>).value.Circular)),
                        ]);
                    }
                }
            }
        }
        return projectReferences;
    };
    const __gotots_callee_10 = getFileNames;
    const __gotots_argument_58 = basePathForFileNames;
    const __gotots_results_26 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_58);
    let fileNames = __gotots_results_26[0];
    let literalFileNamesLen = __gotots_results_26[1];
    const __gotots_field_3 = (parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options;
    const __gotots_field_4 = (parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeAcquisition;
    const __gotots_field_5 = fileNames;
    const __gotots_callee_11 = getProjectReferences;
    const __gotots_argument_59 = basePathForFileNames;
    const __gotots_field_6 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59);
    const __gotots_field_8 = tsonicTypeScriptRuntime.location<ParsedOptions__from_core>(new ParsedOptions__from_core(__gotots_field_3, void 0, __gotots_field_4, __gotots_field_5, __gotots_field_6));
    const __gotots_field_9 = sourceFile;
    const __gotots_field_10 = (parsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.raw;
    const __gotots_field_11 = errors;
    const __gotots_field_12 = extraFileExtensions;
    const __gotots_receiver_23 = host;
    const __gotots_receiver_24 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_23).FS();
    const __gotots_field_7 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_24).UseCaseSensitiveFileNames();
    const __gotots_field_13 = new ComparePathsOptions__from_tspath(__gotots_field_7, basePathForFileNames);
    return tsonicTypeScriptRuntime.location<ParsedCommandLine>(new ParsedCommandLine(__gotots_field_8, __gotots_field_9, __gotots_field_11, __gotots_field_10, void 0, __gotots_field_13, named_sync.SyncOnceOperations.$zero(), GoMap.nil<gostring, bool>(false), named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<{
        value: Glob__from_glob;
    } | undefined>(), __gotots_field_12, named_sync.SyncOnceOperations.$zero(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), "", named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<gostring>(), named_sync.SyncOnceOperations.$zero(), literalFileNamesLen, $goMap$MapOf_Named_tspath$Path_To_string.nil(), named_sync.SyncOnceOperations.$zero(), Locale__from_locale.$zero(), named_sync.SyncOnceOperations.$zero()));
}
export function canJsonReportNoInputFiles(rawConfig: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): bool {
    let filesExists = OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(rawConfig, "files");
    let referencesExists = OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(rawConfig, "references");
    return !filesExists && !referencesExists;
}
export function shouldReportNoInputFiles(fileNames: RuntimeSlice<gostring>, canJsonReportNoInputFiles__shadow_1: bool, resolutionStack: RuntimeSlice<gostring>): bool {
    return fileNames.length === 0 && canJsonReportNoInputFiles__shadow_1 && resolutionStack.length === 0;
}
export function validateSpecs(specs: GoInterface | undefined, disallowTrailingRecursion: bool, jsonSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, specKey: gostring): [
    RuntimeSlice<gostring>,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let createDiagnostic: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: gostring) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (message: {
        value: Message__from_diagnostics;
    } | undefined, spec: gostring): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        let element: tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined = GetTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(element === undefined)) {
            const __gotots_store_4 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf(PrimaryExpressionBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(StringLiteral__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            node = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
        }
        return CreateDiagnosticForNodeInSourceFileOrCompilerDiagnostic(jsonSourceFile, node, message, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(spec)]));
    };
    let errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    let finalSpecs = RuntimeSlice.nil<gostring>();
    const __gotots_range_15 = (($value: GoInterface | undefined): RuntimeSlice<GoInterface | undefined> => {
        if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(specs);
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_15.length; __gotots_range_index_9++) {
        const __gotots_range_value_19 = __gotots_range_15.get(__gotots_range_index_9);
        let spec: GoInterface | undefined = __gotots_range_value_19;
        const __gotots_receiver_32 = named_reflect.ReflectTypeMetadataOperations.$typeOf(spec);
        if (!(named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_32).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String))) {
            continue;
        }
        let diag: {
            value: Message__from_diagnostics;
        } | undefined = specToDiagnostic((($value: GoInterface | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(spec), disallowTrailingRecursion);
        if (!(diag === undefined)) {
            const __gotots_argument_82 = errors;
            const __gotots_callee_17 = createDiagnostic;
            const __gotots_argument_80 = diag;
            const __gotots_argument_81 = (($value: GoInterface | undefined): gostring => {
                if (!$goInterfaceAdapter$string.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })(spec);
            const __gotots_argument_83 = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_80, __gotots_argument_81);
            errors = __gotots_argument_82.append(void 0, [__gotots_argument_83]);
        }
        else {
            finalSpecs = finalSpecs.append("", [(($value: GoInterface | undefined): gostring => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(spec)]);
        }
    }
    return [finalSpecs, errors];
}
export function specToDiagnostic(spec: gostring, disallowTrailingRecursion: bool): {
    value: Message__from_diagnostics;
} | undefined {
    if (disallowTrailingRecursion && invalidTrailingRecursion(spec)) {
        return $state__diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
    }
    if (invalidDotDotAfterRecursiveWildcard(spec)) {
        return $state__diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0;
    }
    return void 0;
}
export function invalidTrailingRecursion(spec: gostring): bool {
    let s = strings__from_gostdlib.TrimSuffix(spec, "/");
    return s === "**" || strings__from_gostdlib.HasSuffix(s, "/**");
}
export function invalidDotDotAfterRecursiveWildcard(s: gostring): bool {
    let wildcardIndex = 0;
    if (strings__from_gostdlib.HasPrefix(s, "**/")) {
        wildcardIndex = 0;
    }
    else {
        wildcardIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(s, "/**/")));
    }
    if (wildcardIndex === -1) {
        return false;
    }
    let lastDotIndex = 0;
    if (strings__from_gostdlib.HasSuffix(s, "/..")) {
        lastDotIndex = s.length;
    }
    else {
        lastDotIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(s, "/../")));
    }
    return lastDotIndex > wildcardIndex;
}
export function GetTsConfigPropArrayElementValue(tsConfigSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, propKey: gostring, elementValue: gostring): tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined {
    let callback: (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = GetCallbackForFindingPropertyAssignmentByValue(elementValue);
    return ForEachTsConfigPropArray<StringLiteral__from_ast>(tsConfigSourceFile, propKey, (property: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined => {
        {
            const __gotots_callee_20 = callback;
            const __gotots_argument_86 = property;
            let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86);
            if (!(value === undefined)) {
                return Node__from_ast.AsStringLiteral(value);
            }
        }
        return void 0;
    });
}
export function ForEachTsConfigPropArray<T>(tsConfigSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, propKey: gostring, callback: (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<T> | undefined) | undefined): tsonicTypeScriptRuntime.Location<T> | undefined {
    if (!(tsConfigSourceFile === undefined)) {
        return ForEachPropertyAssignment<T>(getTsConfigObjectLiteralExpression(tsConfigSourceFile), propKey, callback, RuntimeSlice.nil<gostring>());
    }
    return void 0;
}
export function CreateDiagnosticAtReferenceSyntax(config: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, index: int, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    return ForEachTsConfigPropArray<Diagnostic__from_ast>((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, "references", (property: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        if (IsArrayLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
            let value = Node__from_ast.Elements(PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
            if (value.length > index) {
                return CreateDiagnosticForNodeInSourceFile((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, value.get(index), message, args);
            }
        }
        return void 0;
    });
}
export function GetCallbackForFindingPropertyAssignmentByValue(value: gostring): (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined {
    return (property: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (IsArrayLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
            return Find$PointerTo_Named_ast$Node(Node__from_ast.Elements(PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer), (element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return IsStringLiteral__from_ast(element) && Node__from_ast.Text(element) === value;
            });
        }
        return void 0;
    };
}
export function GetOptionsSyntaxByArrayElementValue(objectLiteral: {
    value: ObjectLiteralExpression__from_ast;
} | undefined, propKey: gostring, elementValue: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return ForEachPropertyAssignment<Node__from_ast>(objectLiteral, propKey, GetCallbackForFindingPropertyAssignmentByValue(elementValue), RuntimeSlice.nil<gostring>());
}
export function ForEachPropertyAssignment<T>(objectLiteral: {
    value: ObjectLiteralExpression__from_ast;
} | undefined, key: gostring, callback: (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<T> | undefined) | undefined, key2: RuntimeSlice<gostring>): tsonicTypeScriptRuntime.Location<T> | undefined {
    if (!(objectLiteral === undefined)) {
        const __gotots_range_7 = NodeList__from_ast.$storageOf((((objectLiteral ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_7.length; __gotots_range_index_5++) {
            const __gotots_range_value_10 = __gotots_range_7.get(__gotots_range_index_5);
            let property: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
            if (!IsPropertyAssignment__from_ast(property)) {
                continue;
            }
            {
                const __gotots_results_27 = TryGetTextOfPropertyName__from_ast(Node__from_ast.Name(property));
                let propName = __gotots_results_27[0];
                let ok = __gotots_results_27[1];
                if (ok) {
                    if (propName === key || (key2.length > 0 && key2.get(0) === propName)) {
                        const __gotots_callee_12 = callback;
                        const __gotots_argument_60 = Node__from_ast.AsPropertyAssignment(property);
                        return (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60);
                    }
                }
            }
        }
    }
    return void 0;
}
export function getTsConfigObjectLiteralExpression(tsConfigSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): {
    value: ObjectLiteralExpression__from_ast;
} | undefined {
    if (!(tsConfigSourceFile === undefined) && !(((tsConfigSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements === undefined) && NodeList__from_ast.$storageOf(((((tsConfigSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(NodeList__from_ast.$storageOf(((((tsConfigSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
        if (IsObjectLiteralExpression__from_ast(expression)) {
            return Node__from_ast.AsObjectLiteralExpression(expression);
        }
    }
    return void 0;
}
export function getSubstitutedPathWithConfigDirTemplate(value: gostring, basePath: gostring): gostring {
    return GetNormalizedAbsolutePath__from_tspath(strings__from_gostdlib.Replace(value, configDirTemplate$string, "./", BigInt.asIntN(64, goNumberToBigInt(1))), basePath);
}
export function getSubstitutedStringArrayWithConfigDirTemplate(list: RuntimeSlice<gostring>, basePath: gostring): RuntimeSlice<gostring> {
    let result = RuntimeSlice.nil<gostring>();
    const __gotots_range_16 = list;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_16.length; __gotots_range_index_10++) {
        const __gotots_range_value_20 = __gotots_range_index_10;
        const __gotots_range_value_21 = __gotots_range_16.get(__gotots_range_index_10);
        let i = __gotots_range_value_20;
        let element = __gotots_range_value_21;
        if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string(element))) {
            if (result.isNil()) {
                result = Clone$SliceOf_string$string(list);
            }
            result.set(i, getSubstitutedPathWithConfigDirTemplate(element, basePath));
        }
    }
    if (!result.isNil()) {
        return result;
    }
    return RuntimeSlice.nil<gostring>();
}
export function handleOptionConfigDirTemplateSubstitution(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, basePath: gostring): void {
    if (compilerOptions === undefined) {
        return;
    }
    const __gotots_range_14 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$SliceOf_string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths));
    if (__gotots_range_14 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_4 = 1;
    __gotots_range_14(($argument0: gostring, $argument1: RuntimeSlice<gostring>): bool => {
        if (__gotots_range_state_4 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_4 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_4 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_4 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_4 = -1;
        const __gotots_range_value_17 = $argument0;
        const __gotots_range_value_18 = $argument1;
        let k = __gotots_range_value_17;
        let v = __gotots_range_value_18;
        {
            let substitution = getSubstitutedStringArrayWithConfigDirTemplate(v, basePath);
            if (!substitution.isNil()) {
                OrderedMap$Set$string$SliceOf_string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths, k, substitution);
            }
        }
        __gotots_range_state_4 = 1;
        return true;
    });
    if (__gotots_range_state_4 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_4 = -2;
    {
        let rootDirs = getSubstitutedStringArrayWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs, basePath);
        if (!rootDirs.isNil()) {
            (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs = rootDirs;
        }
    }
    {
        let typeRoots = getSubstitutedStringArrayWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots, basePath);
        if (!typeRoots.isNil()) {
            (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots = typeRoots;
        }
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateCpuProfile))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateCpuProfile = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateCpuProfile, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateTrace))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateTrace = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateTrace, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUrl))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUrl = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUrl, basePath);
    }
    if (startsWithConfigDirTemplate(new $goInterfaceAdapter$string((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir))) {
        (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir = getSubstitutedPathWithConfigDirTemplate((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir, basePath);
    }
}
export function hasFileWithHigherPriorityExtension(file: gostring, extensions: RuntimeSlice<RuntimeSlice<gostring>>, hasFile: (($0: gostring) => bool) | undefined): bool {
    let extensionGroup = RuntimeSlice.nil<gostring>();
    const __gotots_range_17 = extensions;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_17.length; __gotots_range_index_11++) {
        const __gotots_range_value_22 = __gotots_range_17.get(__gotots_range_index_11);
        let group = __gotots_range_value_22;
        if (FileExtensionIsOneOf__from_tspath(file, group)) {
            extensionGroup = goSliceAppendSlice<gostring>(extensionGroup, group, "");
        }
    }
    if (extensionGroup.length === 0) {
        return false;
    }
    const __gotots_range_18 = extensionGroup;
    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_18.length; __gotots_range_index_12++) {
        const __gotots_range_value_23 = __gotots_range_18.get(__gotots_range_index_12);
        let ext = __gotots_range_value_23;
        if (FileExtensionIs__from_tspath(file, ext) && (ext !== ExtensionTs$string__from_tspath || !FileExtensionIs__from_tspath(file, ExtensionDts$string__from_tspath))) {
            return false;
        }
        const __gotots_callee_18 = hasFile;
        const __gotots_argument_84 = ChangeExtension__from_tspath(file, ext);
        if ((__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_84)) {
            if (ext === ExtensionDts$string__from_tspath && (FileExtensionIs__from_tspath(file, ExtensionJs$string__from_tspath) || FileExtensionIs__from_tspath(file, ExtensionJsx$string__from_tspath))) {
                continue;
            }
            return true;
        }
    }
    return false;
}
export function removeWildcardFilesWithLowerPriorityExtension(file: gostring, wildcardFiles: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, gostring>> | undefined, extensions: RuntimeSlice<RuntimeSlice<gostring>>, keyMapper: (($0: gostring) => gostring) | undefined): void {
    let extensionGroup = RuntimeSlice.nil<gostring>();
    const __gotots_range_19 = extensions;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_19.length; __gotots_range_index_13++) {
        const __gotots_range_value_24 = __gotots_range_19.get(__gotots_range_index_13);
        let group = __gotots_range_value_24;
        if (FileExtensionIsOneOf__from_tspath(file, group)) {
            extensionGroup = goSliceAppendSlice<gostring>(extensionGroup, group, "");
        }
    }
    if (extensionGroup.isNil()) {
        return;
    }
    for (let i = extensionGroup.length - 1; i >= 0; i--) {
        let ext = extensionGroup.get(i);
        if (FileExtensionIs__from_tspath(file, ext)) {
            return;
        }
        const __gotots_callee_19 = keyMapper;
        const __gotots_argument_85 = ChangeExtension__from_tspath(file, ext);
        let lowerPriorityPath = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_85);
        OrderedMap$Delete$string$string(wildcardFiles, lowerPriorityPath);
    }
}
export function getFileNamesFromConfigSpecs(configFileSpecs__shadow_1: configFileSpecs, basePath: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: FS__from_vfs | undefined, extraFileExtensions: RuntimeSlice<FileExtensionInfo$Storage>): [
    RuntimeSlice<gostring>,
    int
] {
    extraFileExtensions = RuntimeSlice.literal<FileExtensionInfo$Storage>([]);
    basePath = NormalizePath__from_tspath(basePath);
    let keyMappper: (($0: gostring) => gostring) | undefined = (value: gostring): gostring => {
        const __gotots_argument_61 = value;
        const __gotots_receiver_25 = host;
        const __gotots_argument_62 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_25).UseCaseSensitiveFileNames();
        return GetCanonicalFileName__from_tspath(__gotots_argument_61, __gotots_argument_62);
    };
    let literalFileMap = OrderedMap__from_collections.$zero<gostring, gostring>((): GoMapValue<gostring, gostring> => {
        return GoMap.nil<gostring, gostring>("");
    });
    const literalFileMap$location = tsonicTypeScriptRuntime.boundLocation({}, () => literalFileMap, literalFileMap$next => literalFileMap = literalFileMap$next);
    let wildcardFileMap = OrderedMap__from_collections.$zero<gostring, gostring>((): GoMapValue<gostring, gostring> => {
        return GoMap.nil<gostring, gostring>("");
    });
    const wildcardFileMap$location = tsonicTypeScriptRuntime.boundLocation({}, () => wildcardFileMap, wildcardFileMap$next => wildcardFileMap = wildcardFileMap$next);
    let wildCardJsonFileMap = OrderedMap__from_collections.$zero<gostring, gostring>((): GoMapValue<gostring, gostring> => {
        return GoMap.nil<gostring, gostring>("");
    });
    const wildCardJsonFileMap$location = tsonicTypeScriptRuntime.boundLocation({}, () => wildCardJsonFileMap, wildCardJsonFileMap$next => wildCardJsonFileMap = wildCardJsonFileMap$next);
    let validatedFilesSpec = configFileSpecs__shadow_1.validatedFilesSpec;
    let validatedIncludeSpecs = configFileSpecs__shadow_1.validatedIncludeSpecs;
    let validatedExcludeSpecs = configFileSpecs__shadow_1.validatedExcludeSpecs;
    let supportedExtensions = GetSupportedExtensions(options, extraFileExtensions);
    let supportedExtensionsWithJsonIfResolveJsonModule = GetSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);
    const __gotots_range_8 = validatedFilesSpec;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
        const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_6);
        let fileName = __gotots_range_value_11;
        let file = GetNormalizedAbsolutePath__from_tspath(fileName, basePath);
        const __gotots_receiver_26 = literalFileMap$location;
        const __gotots_callee_13 = keyMappper;
        const __gotots_argument_63 = fileName;
        const __gotots_argument_64 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63);
        const __gotots_argument_65 = file;
        OrderedMap$Set$string$string(__gotots_receiver_26, __gotots_argument_64, __gotots_argument_65);
    }
    let jsonOnlyIncludeMatchers: SpecMatcher__from_vfsmatch | undefined = void 0;
    if (validatedIncludeSpecs.length > 0) {
        let files__shadow_1 = ReadDirectory__from_vfsmatch(host, basePath, basePath, Flatten$string(supportedExtensionsWithJsonIfResolveJsonModule), validatedExcludeSpecs, validatedIncludeSpecs, UnlimitedDepth$int__from_vfsmatch);
        const __gotots_range_9 = files__shadow_1;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
            const __gotots_range_value_12 = __gotots_range_9.get(__gotots_range_index_7);
            let file = __gotots_range_value_12;
            if (FileExtensionIs__from_tspath(file, ExtensionJson$string__from_tspath)) {
                if (jsonOnlyIncludeMatchers === undefined) {
                    let includes = Filter$string(validatedIncludeSpecs, (include: gostring): bool => {
                        return strings__from_gostdlib.HasSuffix(include, ExtensionJson$string__from_tspath);
                    });
                    const __gotots_argument_66 = includes;
                    const __gotots_argument_67 = basePath;
                    const __gotots_argument_68 = UsageFiles$constant__from_vfsmatch();
                    const __gotots_receiver_27 = host;
                    const __gotots_argument_69 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_27).UseCaseSensitiveFileNames();
                    jsonOnlyIncludeMatchers = NewSpecMatcher__from_vfsmatch(__gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69);
                }
                let includeIndex = -1;
                if (!(jsonOnlyIncludeMatchers === undefined)) {
                    includeIndex = SpecMatcher__from_vfsmatch.MatchIndex(jsonOnlyIncludeMatchers, file);
                }
                if (includeIndex !== -1) {
                    const __gotots_callee_14 = keyMappper;
                    const __gotots_argument_70 = file;
                    let key__shadow_1 = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_70);
                    if (!OrderedMap__from_collections.Has<gostring, gostring>(literalFileMap$location, key__shadow_1) && !OrderedMap__from_collections.Has<gostring, gostring>(wildCardJsonFileMap$location, key__shadow_1)) {
                        OrderedMap$Set$string$string(wildCardJsonFileMap$location, key__shadow_1, file);
                    }
                }
                continue;
            }
            if (hasFileWithHigherPriorityExtension(file, supportedExtensions, (fileName: gostring): bool => {
                const __gotots_callee_15 = keyMappper;
                const __gotots_argument_71 = fileName;
                let canonicalFileName = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_71);
                return OrderedMap__from_collections.Has<gostring, gostring>(literalFileMap$location, canonicalFileName) || OrderedMap__from_collections.Has<gostring, gostring>(wildcardFileMap$location, canonicalFileName);
            })) {
                continue;
            }
            removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap$location, supportedExtensions, keyMappper);
            const __gotots_callee_16 = keyMappper;
            const __gotots_argument_72 = file;
            let key = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_72);
            if (!OrderedMap__from_collections.Has<gostring, gostring>(literalFileMap$location, key) && !OrderedMap__from_collections.Has<gostring, gostring>(wildcardFileMap$location, key)) {
                OrderedMap$Set$string$string(wildcardFileMap$location, key, file);
            }
        }
    }
    let files = RuntimeSlice.make<gostring>(0, OrderedMap$Size$string$string(literalFileMap$location) + OrderedMap$Size$string$string(wildcardFileMap$location) + OrderedMap$Size$string$string(wildCardJsonFileMap$location), "");
    const __gotots_range_10 = named_iter.IterSeqValueOperations.$project(OrderedMap$Values$string$string(literalFileMap$location));
    if (__gotots_range_10 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_1 = 1;
    __gotots_range_10(($argument0: gostring): bool => {
        if (__gotots_range_state_1 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_1 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_1 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_1 = -1;
        const __gotots_range_value_13 = $argument0;
        let file = __gotots_range_value_13;
        files = files.append("", [file]);
        __gotots_range_state_1 = 1;
        return true;
    });
    if (__gotots_range_state_1 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_1 = -2;
    const __gotots_range_11 = named_iter.IterSeqValueOperations.$project(OrderedMap$Values$string$string(wildcardFileMap$location));
    if (__gotots_range_11 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_2 = 1;
    __gotots_range_11(($argument0: gostring): bool => {
        if (__gotots_range_state_2 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_2 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_2 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_2 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_2 = -1;
        const __gotots_range_value_14 = $argument0;
        let file = __gotots_range_value_14;
        files = files.append("", [file]);
        __gotots_range_state_2 = 1;
        return true;
    });
    if (__gotots_range_state_2 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_2 = -2;
    const __gotots_range_12 = named_iter.IterSeqValueOperations.$project(OrderedMap$Values$string$string(wildCardJsonFileMap$location));
    if (__gotots_range_12 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_3 = 1;
    __gotots_range_12(($argument0: gostring): bool => {
        if (__gotots_range_state_3 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_3 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_3 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_3 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_3 = -1;
        const __gotots_range_value_15 = $argument0;
        let file = __gotots_range_value_15;
        files = files.append("", [file]);
        __gotots_range_state_3 = 1;
        return true;
    });
    if (__gotots_range_state_3 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_3 = -2;
    return [files, OrderedMap$Size$string$string(literalFileMap$location)];
}
export function GetSupportedExtensions(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, extraFileExtensions: RuntimeSlice<FileExtensionInfo$Storage>): RuntimeSlice<RuntimeSlice<gostring>> {
    let needJSExtensions = CompilerOptions__from_core.GetAllowJS(compilerOptions);
    if (extraFileExtensions.length === 0) {
        if (needJSExtensions) {
            return $state__tspath.AllSupportedExtensions;
        }
        else {
            return $state__tspath.SupportedTSExtensions;
        }
    }
    let builtins = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    if (needJSExtensions) {
        builtins = $state__tspath.AllSupportedExtensions;
    }
    else {
        builtins = $state__tspath.SupportedTSExtensions;
    }
    let flatBuiltins = Flatten$string(builtins);
    let result = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    const __gotots_range_6 = extraFileExtensions;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_6.length; __gotots_range_index_4++) {
        const __gotots_range_value_9 = FileExtensionInfo.$copy(FileExtensionInfo.$fromStorage(__gotots_range_6.get(__gotots_range_index_4)));
        let x = __gotots_range_value_9;
        if (FileExtensionInfo.$storageOf(x).ScriptKind === ScriptKindDeferred$constant__from_core() || (needJSExtensions && (FileExtensionInfo.$storageOf(x).ScriptKind === ScriptKindJS$constant__from_core() || FileExtensionInfo.$storageOf(x).ScriptKind === ScriptKindJSX$constant__from_core())) && !Contains$SliceOf_string$string(flatBuiltins, FileExtensionInfo.$storageOf(x).Extension)) {
            result = result.append(RuntimeSlice.nil<gostring>(), [RuntimeSlice.literal<gostring>([FileExtensionInfo.$storageOf(x).Extension])]);
        }
    }
    let extensions = Concat$SliceOf_SliceOf_string$SliceOf_string(RuntimeSlice.literal<RuntimeSlice<RuntimeSlice<gostring>>>([builtins, result]));
    return extensions;
}
export function GetSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, supportedExtensions: RuntimeSlice<RuntimeSlice<gostring>>): RuntimeSlice<RuntimeSlice<gostring>> {
    if (compilerOptions === undefined || !CompilerOptions__from_core.GetResolveJsonModule(compilerOptions)) {
        return supportedExtensions;
    }
    if (Same$SliceOf_string(supportedExtensions, $state__tspath.AllSupportedExtensions)) {
        return $state__tspath.AllSupportedExtensionsWithJson;
    }
    if (Same$SliceOf_string(supportedExtensions, $state__tspath.SupportedTSExtensions)) {
        return $state__tspath.SupportedTSExtensionsWithJson;
    }
    return Concat$SliceOf_SliceOf_string$SliceOf_string(RuntimeSlice.literal<RuntimeSlice<RuntimeSlice<gostring>>>([supportedExtensions, RuntimeSlice.literal<RuntimeSlice<gostring>>([RuntimeSlice.literal<gostring>([ExtensionJson$string__from_tspath])])]));
}
export function GetParsedCommandLineOfConfigFile(configFileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, optionsRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, sys: ParseConfigHost | undefined, extendedConfigCache: ExtendedConfigCache | undefined): [
    tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    const __gotots_argument_0 = configFileName;
    const __gotots_receiver_0 = sys;
    const __gotots_argument_1 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_0).GetCurrentDirectory();
    configFileName = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_0, __gotots_argument_1);
    const __gotots_argument_5 = configFileName;
    const __gotots_argument_2 = configFileName;
    const __gotots_receiver_1 = sys;
    const __gotots_argument_3 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_1).GetCurrentDirectory();
    const __gotots_receiver_2 = sys;
    const __gotots_receiver_3 = goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_2).FS();
    const __gotots_argument_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).UseCaseSensitiveFileNames();
    const __gotots_argument_6 = ToPath__from_tspath(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    const __gotots_argument_7 = options;
    const __gotots_argument_8 = optionsRaw;
    const __gotots_argument_9 = sys;
    const __gotots_argument_10 = extendedConfigCache;
    return GetParsedCommandLineOfConfigFilePath(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
}
export function GetParsedCommandLineOfConfigFilePath(configFileName: gostring, path: Path__from_tspath, options: {
    value: CompilerOptions__from_core;
} | undefined, optionsRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, sys: ParseConfigHost | undefined, extendedConfigCache: ExtendedConfigCache | undefined): [
    tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    let errors = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([]);
    const __gotots_argument_11 = configFileName;
    const __gotots_receiver_4 = sys;
    const __gotots_receiver_5 = goInterfaceNonNil(goInterfaceNonNil<ParseConfigHost>(__gotots_receiver_4).FS());
    const __gotots_argument_12 = DeferredCallableRegistry.register(($argument0: gostring): [
        gostring,
        bool
    ] => __gotots_receiver_5.ReadFile($argument0), ($go$recovery: GoRecovery, $argument0: gostring): [
        gostring,
        bool
    ] => {
        const __gotots_receiver_6: FS__from_vfs = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5);
        const __gotots_deferred_0 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$ReadFile$string_to_string_bool, __gotots_receiver_6);
        return __gotots_deferred_0 === undefined ? __gotots_receiver_6.ReadFile($argument0) : __gotots_deferred_0($go$recovery, __gotots_receiver_6, $argument0);
    });
    const __gotots_argument_13 = errors;
    const __gotots_results_0 = tryReadFile(__gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
    let configFileText = __gotots_results_0[0];
    errors = __gotots_results_0[1];
    if (errors.length > 0) {
        return [void 0, errors];
    }
    let tsConfigSourceFile: {
        value: TsConfigSourceFile;
    } | undefined = NewTsconfigSourceFileFromFilePath(configFileName, path, configFileText);
    return [ParseJsonSourceFileConfigFileContent(tsConfigSourceFile, sys, GetDirectoryPath__from_tspath(configFileName), options, optionsRaw, configFileName, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<FileExtensionInfo$Storage>(), extendedConfigCache), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
}
