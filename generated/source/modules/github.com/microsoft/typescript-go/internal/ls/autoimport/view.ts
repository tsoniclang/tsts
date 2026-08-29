import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node$Storage as Node__from_ast$Storage, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Position as Position__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { ResolvedEntrypoint as ResolvedEntrypoint__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { ModuleSpecifierEnding as ModuleSpecifierEnding__from_modulespecifiers, ResultKind as ResultKind__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import type { PackageJson as PackageJson__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { existingImport$Storage as existingImport__from_autoimport$Storage } from "./fix.js";
import type { Registry, RegistryBucket, directory } from "./registry.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { ImportClause as ImportClause__from_ast, IsJSDocImportTag as IsJSDocImportTag__from_ast, IsSourceFileJS as IsSourceFileJS__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsVariableDeclarationInitializedToRequire as IsVariableDeclarationInitializedToRequire__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, Kind_String as Kind_String__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, TryGetImportFromModuleSpecifier as TryGetImportFromModuleSpecifier__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { MultiMap as MultiMap__from_collections, Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { $state as $state__core, CompareBooleans as CompareBooleans__from_core, CompilerOptions as CompilerOptions__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindES2015$constant as ModuleKindES2015$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ScriptElementKind as ScriptElementKind__from_lsutil, ShouldUseUriStyleNodeCoreModules as ShouldUseUriStyleNodeCoreModules__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { AddAsTypeOnlyAllowed$constant as AddAsTypeOnlyAllowed$constant__from_lsproto, AddAsTypeOnlyNotAllowed$constant as AddAsTypeOnlyNotAllowed$constant__from_lsproto, AddAsTypeOnlyRequired$constant as AddAsTypeOnlyRequired$constant__from_lsproto, AutoImportFixKindAddNew$constant as AutoImportFixKindAddNew$constant__from_lsproto, AutoImportFixKindAddToExisting$constant as AutoImportFixKindAddToExisting$constant__from_lsproto, AutoImportFixKindJsdocTypeImport$constant as AutoImportFixKindJsdocTypeImport$constant__from_lsproto, AutoImportFixKindUseNamespace$constant as AutoImportFixKindUseNamespace$constant__from_lsproto, AutoImportFix as AutoImportFix__from_lsproto, ImportKindCommonJS$constant as ImportKindCommonJS$constant__from_lsproto, ImportKindDefault$constant as ImportKindDefault$constant__from_lsproto, ImportKindNamed$constant as ImportKindNamed$constant__from_lsproto, ImportKindNamespace$constant as ImportKindNamespace$constant__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetConditions as GetConditions__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetAllowedEndingsInPreferredOrder as GetAllowedEndingsInPreferredOrder__from_modulespecifiers, GetModuleSpecifiersForFileWithInfo as GetModuleSpecifiersForFileWithInfo__from_modulespecifiers, IsExcludedByRegex as IsExcludedByRegex__from_modulespecifiers, ModuleSpecifierOptions as ModuleSpecifierOptions__from_modulespecifiers, PathIsBareSpecifier as PathIsBareSpecifier__from_modulespecifiers, ProcessEntrypointEnding as ProcessEntrypointEnding__from_modulespecifiers, ResultKindAmbient$constant as ResultKindAmbient$constant__from_modulespecifiers, ResultKindNodeModules$constant as ResultKindNodeModules$constant__from_modulespecifiers, ResultKindNone$constant as ResultKindNone$constant__from_modulespecifiers, ResultKindRelative$constant as ResultKindRelative$constant__from_modulespecifiers, UserPreferences as UserPreferences__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { IsIdentifierText as IsIdentifierText__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CompareNumberOfDirectorySeparators as CompareNumberOfDirectorySeparators__from_tspath, HasJSFileExtension as HasJSFileExtension__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { Compare$Named_lsproto$ImportKind } from "../../../../../../../support/generics/concretizations/cmp/Compare.js";
import { MultiMap$Add$Named_autoimport$ModuleID$Named_autoimport$existingImport } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/MultiMap$Add.js";
import { NewMultiMapWithSizeHint$Named_autoimport$ModuleID$Named_autoimport$existingImport } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewMultiMapWithSizeHint.js";
import { NewSetFromItems$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetFromItems.js";
import { Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Intersects$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Intersects.js";
import { Set$IsSubsetOf$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$IsSubsetOf.js";
import { Set$UnionedWith$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$UnionedWith.js";
import { SyncMap$Load$Named_tspath$Path$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_tspath$Path$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { Every$Named_autoimport$existingImport } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Filter$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { FirstNonZero$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstNonZero.js";
import { MinAllFunc$PointerTo_Named_autoimport$FixAndExport } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MinAllFunc.js";
import { Index$Find$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/autoimport/Index$Find.js";
import { Index$SearchWordPrefix$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/autoimport/Index$SearchWordPrefix.js";
import { ForEachAncestorDirectoryPath$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectoryPath.js";
import { Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/slices/Grow.js";
import { Replace$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/slices/Replace.js";
import { SortFunc$SliceOf_PointerTo_Named_autoimport$FixAndExport$PointerTo_Named_autoimport$FixAndExport } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$Program, $goInterfaceAdapter$int32, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { Export, ExportID, ExportSyntax, ModuleID } from "./export.js";
import { Fix, compareFixKinds, compareModuleSpecifierRelativity, detectSyntax, existingImport, getAddAsTypeOnly, getImportKind, getNamespaceLikeImportText, isFixPossiblyReExportingImportingFile } from "./fix.js";
import { Index } from "./index.js";
import { addPackageJsonDependencies, tryGetModuleIDAndFileNameOfModuleSymbol } from "./util.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { GoMapHash, GoMapValue } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class View {
    declare private readonly $goType: void;
    public constructor(public registry: {
        value: Registry;
    } | undefined, public importingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public preferences: UserPreferences__from_modulespecifiers, public projectKey: Path__from_tspath, public allowedEndings: RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers>, public conditions: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public shouldUseUriStyleNodeCoreModules: Tristate__from_core, public existingImports: MultiMap__from_collections<ModuleID, existingImport> | undefined, public shouldUseRequireForFixes: tsonicTypeScriptRuntime.Location<bool> | undefined) {
    }
    declare private readonly then?: never;
    static CompareFixesForRanking(v: View | undefined, a: {
        value: Fix;
    } | undefined, b: {
        value: Fix;
    } | undefined): int {
        {
            let res = compareFixKinds(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind);
            if (res !== 0) {
                return res;
            }
        }
        return View.$go$private$autoimport$compareModuleSpecifiersForRanking(v, a, b);
    }
    static CompareFixesForSorting(v: View | undefined, a: {
        value: Fix;
    } | undefined, b: {
        value: Fix;
    } | undefined): int {
        {
            let res = View.CompareFixesForRanking(v, a, b);
            if (res !== 0) {
                return res;
            }
        }
        return View.$go$private$autoimport$compareModuleSpecifiersForSorting(v, a, b);
    }
    static GetCompletions(v: View | undefined, ctx: GoInterface | undefined, prefix: gostring, position: Position__from_lsproto, forJSX: bool, isTypeOnlyLocation: bool): RuntimeSlice<{
        value: FixAndExport;
    } | undefined> {
        const position$location = tsonicTypeScriptRuntime.boundLocation({}, () => position, position$next => position = position$next);
        let results = View.Search(v, prefix, QueryKindWordPrefix$constant());
        class exportGroupKey {
            declare private readonly $goType: void;
            public constructor(public target: ExportID, public name: gostring, public ambientModuleOrPackageName: gostring) {
            }
            static $copy($source: exportGroupKey): exportGroupKey {
                return new exportGroupKey(ExportID.$copy($source.target), $source.name, $source.ambientModuleOrPackageName);
            }
            static $equal($left: exportGroupKey, $right: exportGroupKey): bool {
                return ExportID.$equal($left.target, $right.target) && $left.name === $right.name && $left.ambientModuleOrPackageName === $right.ambientModuleOrPackageName;
            }
            static $hash($source: exportGroupKey): number {
                let $hash = 2166136261;
                $hash = GoMapHash.mix($hash, ExportID.$hash($source.target));
                $hash = GoMapHash.mix($hash, GoMapHash.string($source.name));
                $hash = GoMapHash.mix($hash, GoMapHash.string($source.ambientModuleOrPackageName));
                return $hash;
            }
            declare private readonly then?: never;
        }
        class $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export extends GoMapValue<exportGroupKey, RuntimeSlice<{
            value: Export;
        } | undefined>> {
            private constructor(private readonly zeroValue: RuntimeSlice<{
                value: Export;
            } | undefined>, private readonly buckets: Map<number, [
                exportGroupKey,
                RuntimeSlice<{
                    value: Export;
                } | undefined>
            ][]> | undefined, private count: number) {
                super();
            }
            private static $zeroValue(): RuntimeSlice<{
                value: Export;
            } | undefined> {
                return RuntimeSlice.nil<{
                    value: Export;
                } | undefined>();
            }
            private static $hash($key: exportGroupKey): number {
                return exportGroupKey.$hash($key);
            }
            private static $equal($left: exportGroupKey, $right: exportGroupKey): boolean {
                return exportGroupKey.$equal($left, $right);
            }
            private static $copyKey($key: exportGroupKey): exportGroupKey {
                return exportGroupKey.$copy($key);
            }
            private static $copyValue($value: RuntimeSlice<{
                value: Export;
            } | undefined>): RuntimeSlice<{
                value: Export;
            } | undefined> {
                return $value;
            }
            static nil(): $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export {
                return new $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export($goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$zeroValue(), undefined, 0);
            }
            static make(size: number | bigint, entries: [
                exportGroupKey,
                RuntimeSlice<{
                    value: Export;
                } | undefined>
            ][]): $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export {
                const result: $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export = new $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export($goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$zeroValue(), new Map<number, [
                    exportGroupKey,
                    RuntimeSlice<{
                        value: Export;
                    } | undefined>
                ][]>, 0);
                for (const entry of entries) {
                    result.store(entry[0], entry[1]);
                }
                return result;
            }
            private $find(key: exportGroupKey): [
                [
                    exportGroupKey,
                    RuntimeSlice<{
                        value: Export;
                    } | undefined>
                ],
                [
                    exportGroupKey,
                    RuntimeSlice<{
                        value: Export;
                    } | undefined>
                ][],
                number
            ] | undefined {
                const buckets = this.buckets;
                if (buckets === undefined) {
                    return undefined;
                }
                const bucket = buckets.get($goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$hash(key));
                if (bucket === undefined) {
                    return undefined;
                }
                let index = 0;
                for (const entry of bucket) {
                    if ($goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$equal(entry[0], key)) {
                        return [entry, bucket, index];
                    }
                    index++;
                }
                return undefined;
            }
            lookup(key: exportGroupKey): RuntimeSlice<{
                value: Export;
            } | undefined> {
                const found: [
                    [
                        exportGroupKey,
                        RuntimeSlice<{
                            value: Export;
                        } | undefined>
                    ],
                    [
                        exportGroupKey,
                        RuntimeSlice<{
                            value: Export;
                        } | undefined>
                    ][],
                    number
                ] | undefined = this.$find(key);
                return $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$copyValue(found === undefined ? this.zeroValue : found[0][1]);
            }
            lookupOk(key: exportGroupKey): [
                RuntimeSlice<{
                    value: Export;
                } | undefined>,
                boolean
            ] {
                const found: [
                    [
                        exportGroupKey,
                        RuntimeSlice<{
                            value: Export;
                        } | undefined>
                    ],
                    [
                        exportGroupKey,
                        RuntimeSlice<{
                            value: Export;
                        } | undefined>
                    ][],
                    number
                ] | undefined = this.$find(key);
                if (found === undefined) {
                    return [$goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$copyValue(this.zeroValue), false];
                }
                return [$goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$copyValue(found[0][1]), true];
            }
            store(key: exportGroupKey, value: RuntimeSlice<{
                value: Export;
            } | undefined>): void {
                const buckets: Map<number, [
                    exportGroupKey,
                    RuntimeSlice<{
                        value: Export;
                    } | undefined>
                ][]> | undefined = this.buckets;
                if (buckets === undefined) {
                    GoPanic.raiseRuntime("assignment to entry in nil map");
                }
                const hash: number = $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$hash(key);
                let bucket: [
                    exportGroupKey,
                    RuntimeSlice<{
                        value: Export;
                    } | undefined>
                ][] | undefined = buckets.get(hash);
                if (bucket === undefined) {
                    bucket = [];
                    buckets.set(hash, bucket);
                }
                for (const entry of bucket) {
                    if ($goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$equal(entry[0], key)) {
                        entry[1] = $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$copyValue(value);
                        return;
                    }
                }
                bucket.push([$goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$copyKey(key), $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$copyValue(value)]);
                this.count++;
            }
            delete(key: exportGroupKey): void {
                const found: [
                    [
                        exportGroupKey,
                        RuntimeSlice<{
                            value: Export;
                        } | undefined>
                    ],
                    [
                        exportGroupKey,
                        RuntimeSlice<{
                            value: Export;
                        } | undefined>
                    ][],
                    number
                ] | undefined = this.$find(key);
                if (found === undefined) {
                    return;
                }
                found[1].splice(found[2], 1);
                if (found[1].length === 0) {
                    if (!(this.buckets === undefined)) {
                        this.buckets.delete($goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.$hash(key));
                    }
                }
                this.count--;
            }
            length(): number {
                return this.count;
            }
            isNil(): boolean {
                return this.buckets === undefined;
            }
            clear(): void {
                if (this.buckets === undefined) {
                    return;
                }
                this.buckets.clear();
                this.count = 0;
            }
            keys(): exportGroupKey[] {
                const result: exportGroupKey[] = [];
                const buckets: Map<number, [
                    exportGroupKey,
                    RuntimeSlice<{
                        value: Export;
                    } | undefined>
                ][]> | undefined = this.buckets;
                if (buckets === undefined) {
                    return result;
                }
                for (const bucket of buckets.values()) {
                    for (const entry of bucket) {
                        result.push(entry[0]);
                    }
                }
                return result;
            }
        }
        let grouped: GoMapValue<exportGroupKey, RuntimeSlice<{
            value: Export;
        } | undefined>> = $goMap$MapOf_Named_exportGroupKey_To_SliceOf_PointerTo_Named_autoimport$Export.make(results.length, []);
        const __gotots_range_0 = results;
        outer: for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let e: {
                value: Export;
            } | undefined = __gotots_range_value_0;
            let name = Export.Name(e);
            if (!IsIdentifierText__from_scanner(name, LanguageVariantStandard$constant__from_core())) {
                continue;
            }
            if (forJSX && !(unicode__from_gostdlib.IsUpper(goStringIndex(name, 0)) || Export.IsRenameable(e))) {
                continue;
            }
            let target = ExportID.$copy((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID);
            if (!ExportID.$equal((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target, (new ExportID(new ModuleID(""), "")))) {
                target = ExportID.$copy((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target);
            }
            let key = new exportGroupKey(ExportID.$copy(target), name, FirstNonZero$string(RuntimeSlice.literal<gostring>([Export.AmbientModuleName(e), (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName])));
            if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName === "@types/node" || strings__from_gostdlib.Contains((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Path.$value, "/node_modules/@types/node/")) {
                {
                    const __gotots_results_0 = $state__core.UnprefixedNodeCoreModules.lookupOk(key.ambientModuleOrPackageName);
                    let ok = __gotots_results_0[1];
                    if (ok) {
                        key.ambientModuleOrPackageName = "node:" + key.ambientModuleOrPackageName;
                    }
                }
            }
            {
                const __gotots_results_1 = grouped.lookupOk(key);
                let existing = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    const __gotots_range_1 = existing;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_1 = __gotots_range_index_1;
                        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
                        let i = __gotots_range_value_1;
                        let ex: {
                            value: Export;
                        } | undefined = __gotots_range_value_2;
                        if (ExportID.$equal((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID, (ex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID)) {
                            grouped.store(key, Replace$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export(existing, i, i + 1, RuntimeSlice.literal<{
                                value: Export;
                            } | undefined>([
                                { value: new Export(ExportID.$copy((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID), (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleFileName, new ExportSyntax(globalThis.Math.min((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Syntax.$value, (ex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Syntax.$value)), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags | (ex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags) >>> 0, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName, "", ExportID.$copy((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target), (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly || (ex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly, new ScriptElementKind__from_lsutil(globalThis.Math.min((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKind.$value, (ex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKind.$value)), ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKindModifiers | (ex ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptElementKindModifiers) >>> 0, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Path, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName) },
                            ])));
                            continue outer;
                        }
                    }
                }
            }
            grouped.store(key, grouped.lookup(key).append(void 0, [e]));
        }
        let fixes = RuntimeSlice.make<{
            value: FixAndExport;
        } | undefined>(0, results.length, void 0);
        let compareFixes: (($0: {
            value: FixAndExport;
        } | undefined, $1: {
            value: FixAndExport;
        } | undefined) => int) | undefined = (a: {
            value: FixAndExport;
        } | undefined, b: {
            value: FixAndExport;
        } | undefined): int => {
            return View.CompareFixesForRanking(v, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fix, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fix);
        };
        const __gotots_range_2 = grouped;
        const __gotots_range_keys_0 = __gotots_range_2.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_0) {
            const __gotots_range_value_4 = __gotots_range_2.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_4[0];
            let exps = __gotots_range_value_5;
            let fixesForGroup = RuntimeSlice.make<{
                value: FixAndExport;
            } | undefined>(0, exps.length, void 0);
            const __gotots_range_3 = exps;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                const __gotots_range_value_6 = __gotots_range_3.get(__gotots_range_index_2);
                let e: {
                    value: Export;
                } | undefined = __gotots_range_value_6;
                const __gotots_range_4 = View.GetFixes(v, ctx, e, forJSX, isTypeOnlyLocation, position$location);
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                    const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_3);
                    let fix: {
                        value: Fix;
                    } | undefined = __gotots_range_value_7;
                    fixesForGroup = fixesForGroup.append(void 0, [
                        { value: new FixAndExport(fix, e) },
                    ]);
                }
            }
            fixes = goSliceAppendSlice<{
                value: FixAndExport;
            } | undefined>(fixes, MinAllFunc$PointerTo_Named_autoimport$FixAndExport(fixesForGroup, compareFixes), void 0);
        }
        SortFunc$SliceOf_PointerTo_Named_autoimport$FixAndExport$PointerTo_Named_autoimport$FixAndExport(fixes, (a: {
            value: FixAndExport;
        } | undefined, b: {
            value: FixAndExport;
        } | undefined): int => {
            return View.CompareFixesForSorting(v, (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fix, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fix);
        });
        return fixes;
    }
    static GetFixes(v: View | undefined, ctx: GoInterface | undefined, __go_export: {
        value: Export;
    } | undefined, forJSX: bool, isValidTypeOnlyUseSite: bool, usagePosition: tsonicTypeScriptRuntime.Location<Position__from_lsproto> | undefined): RuntimeSlice<{
        value: Fix;
    } | undefined> {
        let fixes = RuntimeSlice.nil<{
            value: Fix;
        } | undefined>();
        {
            let namespaceFix: {
                value: Fix;
            } | undefined = View.$go$private$autoimport$tryUseExistingNamespaceImport(v, ctx, __go_export, usagePosition);
            if (!(namespaceFix === undefined)) {
                fixes = fixes.append(void 0, [namespaceFix]);
            }
        }
        {
            let fix: {
                value: Fix;
            } | undefined = View.$go$private$autoimport$tryAddToExistingImport(v, ctx, __go_export, isValidTypeOnlyUseSite);
            if (!(fix === undefined)) {
                return fixes.append(void 0, [fix]);
            }
        }
        const __gotots_results_2 = View.GetModuleSpecifier(v, __go_export, UserPreferences__from_modulespecifiers.$copy((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
        let moduleSpecifier = __gotots_results_2[0];
        let moduleSpecifierKind = __gotots_results_2[1];
        if (moduleSpecifier === "") {
            if (fixes.length > 0) {
                return fixes;
            }
            return RuntimeSlice.nil<{
                value: Fix;
            } | undefined>();
        }
        let isJs = HasJSFileExtension__from_tspath(SourceFile__from_ast.FileName((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile));
        let importedSymbolHasValueMeaning = !(((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0) || Export.IsUnresolvedAlias(__go_export);
        if (!importedSymbolHasValueMeaning && isJs && !(usagePosition === undefined)) {
            return RuntimeSlice.literal<{
                value: Fix;
            } | undefined>([
                { value: new Fix({ value: new AutoImportFix__from_lsproto(AutoImportFixKindJsdocTypeImport$constant__from_lsproto(), Export.Name(__go_export), 0, false, 0, moduleSpecifier, 0, usagePosition, "") }, moduleSpecifierKind, !((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target.ModuleID.$value === (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value), (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleFileName, void 0) },
            ]);
        }
        let importKind = getImportKind((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, __go_export, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        let addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, __go_export, Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        let name = Export.Name(__go_export);
        let startsWithUpper = unicode__from_gostdlib.IsUpper(goStringIndex(name, 0));
        if (forJSX && !startsWithUpper) {
            if (Export.IsRenameable(__go_export)) {
                name = fmt__from_gostdlib.Sprintf("%c%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(unicode__from_gostdlib.ToUpper(goStringIndex(name, 0))), new $goInterfaceAdapter$string(goStringSlice(name, 1))]));
            }
            else {
                return RuntimeSlice.nil<{
                    value: Fix;
                } | undefined>();
            }
        }
        return fixes.append(void 0, [
            { value: new Fix({ value: new AutoImportFix__from_lsproto(AutoImportFixKindAddNew$constant__from_lsproto(), name, importKind, View.$go$private$autoimport$shouldUseRequire(v), addAsTypeOnly, moduleSpecifier, 0, void 0, "") }, moduleSpecifierKind, !((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target.ModuleID.$value === (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value), (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleFileName, void 0) },
        ]);
    }
    static GetModuleSpecifier(v: View | undefined, __go_export: {
        value: Export;
    } | undefined, userPreferences: UserPreferences__from_modulespecifiers): [
        gostring,
        ResultKind__from_modulespecifiers
    ] {
        if (PathIsBareSpecifier__from_modulespecifiers((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value)) {
            let specifier = (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value;
            if (IsExcludedByRegex__from_modulespecifiers(specifier, userPreferences.AutoImportSpecifierExcludeRegexes)) {
                return ["", ResultKindNone$constant__from_modulespecifiers()];
            }
            return [(__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value, ResultKindAmbient$constant__from_modulespecifiers()];
        }
        if ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName !== "") {
            {
                const __gotots_results_7 = ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entrypoints.lookupOk((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Path);
                let entrypoints = __gotots_results_7[0];
                let ok = __gotots_results_7[1];
                if (ok) {
                    const __gotots_range_10 = entrypoints;
                    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10.length; __gotots_range_index_8++) {
                        const __gotots_range_value_15 = __gotots_range_10.get(__gotots_range_index_8);
                        let entrypoint: ResolvedEntrypoint__from___go_module | undefined = __gotots_range_value_15;
                        if (Set$IsSubsetOf$string((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).IncludeConditions, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions) && !Set$Intersects$string((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conditions, (entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ExcludeConditions)) {
                            let specifier = ProcessEntrypointEnding__from_modulespecifiers(entrypoint, UserPreferences__from_modulespecifiers.$copy(userPreferences), new $goInterfaceAdapter$PointerTo_Named_compiler$Program((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), new GoInterfaceAdapter((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile), View.$go$private$autoimport$getAllowedEndings(v));
                            if (!IsExcludedByRegex__from_modulespecifiers(specifier, userPreferences.AutoImportSpecifierExcludeRegexes)) {
                                return [specifier, ResultKindNodeModules$constant__from_modulespecifiers()];
                            }
                        }
                    }
                    return ["", ResultKindNone$constant__from_modulespecifiers()];
                }
            }
        }
        let cache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined = ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.specifierCache.lookup(SourceFile__from_ast.Path((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile));
        if ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName === "") {
            {
                const __gotots_results_8 = SyncMap$Load$Named_tspath$Path$string(cache, (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Path);
                let specifier = __gotots_results_8[0];
                let ok = __gotots_results_8[1];
                if (ok) {
                    if (specifier === "") {
                        return ["", ResultKindNone$constant__from_modulespecifiers()];
                    }
                    return [specifier, ResultKindRelative$constant__from_modulespecifiers()];
                }
            }
        }
        const __gotots_results_9 = GetModuleSpecifiersForFileWithInfo__from_modulespecifiers(new GoInterfaceAdapter((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile), (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleFileName, Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), new $goInterfaceAdapter$PointerTo_Named_compiler$Program((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), UserPreferences__from_modulespecifiers.$copy(userPreferences), new ModuleSpecifierOptions__from_modulespecifiers(0), true);
        let specifiers = __gotots_results_9[0];
        let kind = __gotots_results_9[1];
        const __gotots_range_11 = specifiers;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_11.length; __gotots_range_index_9++) {
            const __gotots_range_value_16 = __gotots_range_11.get(__gotots_range_index_9);
            let specifier = __gotots_range_value_16;
            if (strings__from_gostdlib.Contains(specifier, "/node_modules/")) {
                continue;
            }
            SyncMap$Store$Named_tspath$Path$string(cache, (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Path, specifier);
            return [specifier, kind];
        }
        SyncMap$Store$Named_tspath$Path$string(cache, (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Path, "");
        return ["", ResultKindNone$constant__from_modulespecifiers()];
    }
    static Search(v: View | undefined, query: gostring, kind: QueryKind): RuntimeSlice<{
        value: Export;
    } | undefined> {
        let searchFn: (($0: RegistryBucket | undefined) => RuntimeSlice<{
            value: Export;
        } | undefined>) | undefined = (bucket: RegistryBucket | undefined): RuntimeSlice<{
            value: Export;
        } | undefined> => {
            switch (kind.$value) {
                case 0: {
                    return Index$SearchWordPrefix$PointerTo_Named_autoimport$Export((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index, query);
                    break;
                }
                case 1: {
                    return Index$Find$PointerTo_Named_autoimport$Export((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index, query, true);
                    break;
                }
                case 2: {
                    return Index$Find$PointerTo_Named_autoimport$Export((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index, query, false);
                    break;
                }
                default: {
                    const __gotots_argument_0 = new $goInterfaceAdapter$string("unreachable");
                    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    break;
                }
            }
        };
        return View.$go$private$autoimport$search(v, searchFn);
    }
    static SearchByExportID(v: View | undefined, id: ExportID): RuntimeSlice<{
        value: Export;
    } | undefined> {
        let search: (($0: RegistryBucket | undefined) => RuntimeSlice<{
            value: Export;
        } | undefined>) | undefined = (bucket: RegistryBucket | undefined): RuntimeSlice<{
            value: Export;
        } | undefined> => {
            return Filter$PointerTo_Named_autoimport$Export(Index.$storageOf(((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries, (e: {
                value: Export;
            } | undefined): bool => {
                return ExportID.$equal((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID, id);
            });
        };
        return View.$go$private$autoimport$search(v, search);
    }
    static $go$private$autoimport$compareModuleSpecifiersForRanking(v: View | undefined, a: {
        value: Fix;
    } | undefined, b: {
        value: Fix;
    } | undefined): int {
        {
            let comparison = compareModuleSpecifierRelativity(a, b, UserPreferences__from_modulespecifiers.$copy((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences));
            if (comparison !== 0) {
                return comparison;
            }
        }
        if ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifierKind === ResultKindAmbient$constant__from_modulespecifiers() && (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifierKind === ResultKindAmbient$constant__from_modulespecifiers()) {
            {
                let comparison = View.$go$private$autoimport$compareNodeCoreModuleSpecifiers(v, ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
                if (comparison !== 0) {
                    return comparison;
                }
            }
        }
        if ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifierKind === ResultKindRelative$constant__from_modulespecifiers() && (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifierKind === ResultKindRelative$constant__from_modulespecifiers()) {
            {
                let comparison = CompareBooleans__from_core(isFixPossiblyReExportingImportingFile(a, SourceFile__from_ast.FileName((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile)), isFixPossiblyReExportingImportingFile(b, SourceFile__from_ast.FileName((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile)));
                if (comparison !== 0) {
                    return comparison;
                }
            }
        }
        {
            let comparison = CompareNumberOfDirectorySeparators__from_tspath(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier);
            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    }
    static $go$private$autoimport$compareModuleSpecifiersForSorting(v: View | undefined, a: {
        value: Fix;
    } | undefined, b: {
        value: Fix;
    } | undefined): int {
        {
            let res = View.$go$private$autoimport$compareModuleSpecifiersForRanking(v, a, b);
            if (res !== 0) {
                return res;
            }
        }
        if (strings__from_gostdlib.HasPrefix(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, "./") && !strings__from_gostdlib.HasPrefix(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, "./")) {
            return -1;
        }
        if (strings__from_gostdlib.HasPrefix(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, "./") && !strings__from_gostdlib.HasPrefix(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, "./")) {
            return 1;
        }
        {
            let comparison = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier)));
            if (comparison !== 0) {
                return comparison;
            }
        }
        {
            let comparison = Compare$Named_lsproto$ImportKind(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportFix ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportKind);
            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    }
    static $go$private$autoimport$compareNodeCoreModuleSpecifiers(v: View | undefined, a: gostring, b: gostring, importingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, program: {
        value: Program__from_compiler;
    } | undefined): int {
        if (strings__from_gostdlib.HasPrefix(a, "node:") && !strings__from_gostdlib.HasPrefix(b, "node:")) {
            if (Tristate_IsTrue__from_core((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseUriStyleNodeCoreModules)) {
                return -1;
            }
            else if (Tristate_IsFalse__from_core((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseUriStyleNodeCoreModules)) {
                return 1;
            }
            return 0;
        }
        if (strings__from_gostdlib.HasPrefix(b, "node:") && !strings__from_gostdlib.HasPrefix(a, "node:")) {
            if (Tristate_IsTrue__from_core((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseUriStyleNodeCoreModules)) {
                return 1;
            }
            else if (Tristate_IsFalse__from_core((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseUriStyleNodeCoreModules)) {
                return -1;
            }
        }
        return 0;
    }
    static $go$private$autoimport$computeShouldUseRequire(v: View | undefined): bool {
        if (!HasJSFileExtension__from_tspath(SourceFile__from_ast.FileName((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile))) {
            return false;
        }
        switch (detectSyntax((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program)).$value) {
            case 2: {
                return true;
                break;
            }
            case 1: {
                return false;
                break;
            }
        }
        switch (Program__from_compiler.GetImpliedNodeFormatForEmit((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, new GoInterfaceAdapter((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile))) {
            case ModuleKindCommonJS$constant__from_core(): {
                return true;
                break;
            }
            case ModuleKindESNext$constant__from_core(): {
                return false;
                break;
            }
        }
        if ((Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
            return CompilerOptions__from_core.GetEmitModuleKind(Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program)) < ModuleKindES2015$constant__from_core();
        }
        const __gotots_range_13 = Program__from_compiler.GetSourceFiles((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_13.length; __gotots_range_index_11++) {
            const __gotots_range_value_19 = __gotots_range_13.get(__gotots_range_index_11);
            let otherFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_19;
            __gotots_control_target_0: {
                if (tsonicTypeScriptRuntime.sameLocation(otherFile, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile)
                    || !IsSourceFileJS__from_ast(otherFile) || Program__from_compiler.IsSourceFileFromExternalLibrary((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, otherFile)) {
                    continue;
                }
            }
            switch (detectSyntax(otherFile, Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program)).$value) {
                case 2: {
                    return true;
                    break;
                }
                case 1: {
                    return false;
                    break;
                }
            }
        }
        return true;
    }
    static $go$private$autoimport$getAllowedEndings(v: View | undefined): RuntimeSlice<ModuleSpecifierEnding__from_modulespecifiers> {
        if ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allowedEndings.isNil()) {
            let resolutionMode = Program__from_compiler.GetDefaultResolutionModeForFile((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, new GoInterfaceAdapter((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile));
            (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allowedEndings = GetAllowedEndingsInPreferredOrder__from_modulespecifiers(UserPreferences__from_modulespecifiers.$copy((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences), new $goInterfaceAdapter$PointerTo_Named_compiler$Program((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), new GoInterfaceAdapter((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile), "", resolutionMode);
        }
        return (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allowedEndings;
    }
    static $go$private$autoimport$getExistingImports(v: View | undefined, ctx: GoInterface | undefined): MultiMap__from_collections<ModuleID, existingImport> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: MultiMap__from_collections<ModuleID, existingImport> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).existingImports === undefined)) {
                        __gotots_return_0 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).existingImports;
                        break __gotots_return_block_0;
                    }
                    let result: MultiMap__from_collections<ModuleID, existingImport> | undefined = NewMultiMapWithSizeHint$Named_autoimport$ModuleID$Named_autoimport$existingImport(SourceFile__from_ast.Imports((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile).length);
                    const __gotots_results_10 = Program__from_compiler.GetTypeChecker((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, ctx);
                    let ch: {
                        value: Checker__from_checker;
                    } | undefined = __gotots_results_10[0];
                    let done: (() => void) | undefined = __gotots_results_10[1];
                    const __gotots_callee_2: (() => void) | undefined = done;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_2);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    };
                    const __gotots_range_12 = SourceFile__from_ast.Imports((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile);
                    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_12.length; __gotots_range_index_10++) {
                        const __gotots_range_value_17 = __gotots_range_index_10;
                        const __gotots_range_value_18 = __gotots_range_12.get(__gotots_range_index_10);
                        let i = __gotots_range_value_17;
                        let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_18;
                        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetImportFromModuleSpecifier__from_ast(moduleSpecifier);
                        if (node === undefined) {
                            const __gotots_argument_3 = new $goInterfaceAdapter$string("error: did not expect node kind " + Kind_String__from_ast(Node__from_ast.$storageOf(((moduleSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
                            GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
                        }
                        else if (IsVariableDeclarationInitializedToRequire__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            {
                                let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.ResolveExternalModuleName(ch, moduleSpecifier);
                                if (!(moduleSymbol === undefined)) {
                                    {
                                        const __gotots_results_11 = tryGetModuleIDAndFileNameOfModuleSymbol(moduleSymbol);
                                        let moduleID = __gotots_results_11[0];
                                        let ok = __gotots_results_11[2];
                                        if (ok) {
                                            MultiMap$Add$Named_autoimport$ModuleID$Named_autoimport$existingImport(result, moduleID, existingImport.$fromStorage({
                                                node: Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent,
                                                moduleSpecifier: Node__from_ast.Text(moduleSpecifier),
                                                index: i
                                            }));
                                        }
                                    }
                                }
                            }
                        }
                        else if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocImportTag$constant__from_ast()) {
                            {
                                let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(ch, moduleSpecifier);
                                if (!(moduleSymbol === undefined)) {
                                    {
                                        const __gotots_results_12 = tryGetModuleIDAndFileNameOfModuleSymbol(moduleSymbol);
                                        let moduleID = __gotots_results_12[0];
                                        let ok = __gotots_results_12[2];
                                        if (ok) {
                                            MultiMap$Add$Named_autoimport$ModuleID$Named_autoimport$existingImport(result, moduleID, existingImport.$fromStorage({
                                                node: node,
                                                moduleSpecifier: Node__from_ast.Text(moduleSpecifier),
                                                index: i
                                            }));
                                        }
                                    }
                                }
                            }
                        }
                    }
                    (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).existingImports = result;
                    __gotots_return_0 = result;
                    break __gotots_return_block_0;
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
        return __gotots_return_0;
    }
    static $go$private$autoimport$search(v: View | undefined, searchFn: (($0: RegistryBucket | undefined) => RuntimeSlice<{
        value: Export;
    } | undefined>) | undefined): RuntimeSlice<{
        value: Export;
    } | undefined> {
        let results = RuntimeSlice.nil<{
            value: Export;
        } | undefined>();
        {
            const __gotots_results_3 = ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projects.lookupOk((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectKey);
            let bucket: RegistryBucket | undefined = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                const __gotots_callee_0 = searchFn;
                const __gotots_argument_1 = bucket;
                let exports = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                results = Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export(results, exports.length);
                const __gotots_range_5 = exports;
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                    const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_4);
                    let e: {
                        value: Export;
                    } | undefined = __gotots_range_value_8;
                    if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value === SourceFile__from_ast.Path((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile).$value) {
                        continue;
                    }
                    results = results.append(void 0, [e]);
                }
            }
        }
        let allowedPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = void 0;
        ForEachAncestorDirectoryPath$Interface_void(SourceFile__from_ast.Path((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile).GetDirectoryPath(), (dirPath: Path__from_tspath): [
            $goInterface$Interface_void | undefined,
            bool
        ] => {
            let result: $goInterface$Interface_void | undefined = void 0;
            let stop: bool = false;
            {
                const __gotots_results_4 = ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.directories.lookupOk(dirPath);
                let dir: directory | undefined = __gotots_results_4[0];
                let ok = __gotots_results_4[1];
                if (ok) {
                    {
                        let pj: {
                            value: InfoCacheEntry__from_packagejson;
                        } | undefined = (dir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson;
                        if (InfoCacheEntry__from_packagejson.Exists(pj) && ((pj ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Parseable) {
                            if (allowedPackages === undefined) {
                                allowedPackages =
                                    tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                                        M: GoMap.nil()
                                    }));
                            }
                            addPackageJsonDependencies((pj ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents, allowedPackages);
                        }
                    }
                }
            }
            return [void 0, false];
        });
        if (!(allowedPackages === undefined)) {
            {
                const __gotots_results_5 = ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projects.lookupOk((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projectKey);
                let bucket: RegistryBucket | undefined = __gotots_results_5[0];
                let ok = __gotots_results_5[1];
                if (ok) {
                    allowedPackages = Set$UnionedWith$string(allowedPackages, (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedPackageNames);
                }
            }
        }
        let excludePackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: GoMap.nil()
        }));
        ForEachAncestorDirectoryPath$Interface_void(SourceFile__from_ast.Path((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile).GetDirectoryPath(), (dirPath: Path__from_tspath): [
            $goInterface$Interface_void | undefined,
            bool
        ] => {
            let result: $goInterface$Interface_void | undefined = void 0;
            let stop: bool = false;
            {
                const __gotots_results_6 = ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModules.lookupOk(dirPath);
                let nodeModulesBucket: RegistryBucket | undefined = __gotots_results_6[0];
                let ok = __gotots_results_6[1];
                if (ok) {
                    const __gotots_callee_1 = searchFn;
                    const __gotots_argument_2 = nodeModulesBucket;
                    let exports = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                    results = Grow$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export(results, exports.length);
                    const __gotots_range_6 = exports;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                        const __gotots_range_value_9 = __gotots_range_6.get(__gotots_range_index_5);
                        let e: {
                            value: Export;
                        } | undefined = __gotots_range_value_9;
                        if (Set__from_collections.Has<gostring>(excludePackages, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName)) {
                            continue;
                        }
                        if (!(allowedPackages === undefined) && !Set__from_collections.Has<gostring>(allowedPackages, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName)) {
                            continue;
                        }
                        results = results.append(void 0, [e]);
                    }
                    const __gotots_range_7 = (nodeModulesBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles;
                    const __gotots_range_keys_1 = __gotots_range_7.keys();
                    for (const __gotots_range_value_10 of __gotots_range_keys_1) {
                        const __gotots_range_value_11 = __gotots_range_7.lookupOk(__gotots_range_value_10);
                        if (!__gotots_range_value_11[1]) {
                            continue;
                        }
                        const __gotots_range_value_12 = __gotots_range_value_10;
                        let pkgName = __gotots_range_value_12;
                        Set$Add$string(excludePackages, pkgName);
                    }
                }
            }
            return [void 0, false];
        });
        return results;
    }
    static $go$private$autoimport$shouldUseRequire(v: View | undefined): bool {
        if (!((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseRequireForFixes === undefined)) {
            return (((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseRequireForFixes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value;
        }
        let shouldUseRequire = View.$go$private$autoimport$computeShouldUseRequire(v);
        const shouldUseRequire$location = tsonicTypeScriptRuntime.boundLocation({}, () => shouldUseRequire, shouldUseRequire$next => shouldUseRequire = shouldUseRequire$next);
        (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).shouldUseRequireForFixes =
            shouldUseRequire$location;
        return shouldUseRequire;
    }
    static $go$private$autoimport$tryAddToExistingImport(v: View | undefined, ctx: GoInterface | undefined, __go_export: {
        value: Export;
    } | undefined, isValidTypeOnlyUseSite: bool): {
        value: Fix;
    } | undefined {
        let existingImports: MultiMap__from_collections<ModuleID, existingImport> | undefined = View.$go$private$autoimport$getExistingImports(v, ctx);
        let matchingDeclarations = MultiMap__from_collections.Get<ModuleID, existingImport>(existingImports, (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID);
        if (matchingDeclarations.length === 0) {
            return void 0;
        }
        if (IsSourceFileJS__from_ast((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile) && ((__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0 && !Every$Named_autoimport$existingImport(matchingDeclarations, (i: existingImport): bool => {
            return IsJSDocImportTag__from_ast(existingImport.$storageOf(i).node);
        })) {
            return void 0;
        }
        let importKind = getImportKind((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, __go_export, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        if (importKind === ImportKindCommonJS$constant__from_lsproto() || importKind === ImportKindNamespace$constant__from_lsproto()) {
            return void 0;
        }
        let addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, __go_export, Program__from_compiler.Options((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        let best: {
            value: Fix;
        } | undefined = void 0;
        const __gotots_range_9 = matchingDeclarations;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
            const __gotots_range_value_14 = existingImport.$copy(existingImport.$fromStorage(__gotots_range_9.get(__gotots_range_index_7)));
            let existingImport__shadow_1 = __gotots_range_value_14;
            if (Node__from_ast.$storageOf(((existingImport.$storageOf(existingImport__shadow_1).node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast()) {
                continue;
            }
            if (Node__from_ast.$storageOf(((existingImport.$storageOf(existingImport__shadow_1).node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclaration$constant__from_ast()) {
                if ((importKind === ImportKindNamed$constant__from_lsproto() || importKind === ImportKindDefault$constant__from_lsproto()) && Node__from_ast.$storageOf(((Node__from_ast.Name(existingImport.$storageOf(existingImport__shadow_1).node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectBindingPattern$constant__from_ast()) {
                    let fix__shadow_1: {
                        value: Fix;
                    } | undefined = { value: new Fix({ value: new AutoImportFix__from_lsproto(AutoImportFixKindAddToExisting$constant__from_lsproto(), Export.Name(__go_export), importKind, false, addAsTypeOnly, existingImport.$storageOf(existingImport__shadow_1).moduleSpecifier, existingImport.$storageOf(existingImport__shadow_1).index | 0, void 0, "") }, 0, false, "", void 0) };
                    if (addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto()) {
                        return fix__shadow_1;
                    }
                    if (best === undefined) {
                        best = fix__shadow_1;
                    }
                }
                continue;
            }
            let importClauseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ImportClause(existingImport.$storageOf(existingImport__shadow_1).node);
            if (importClauseNode === undefined || !IsStringLiteralLike__from_ast(Node__from_ast.ModuleSpecifier(existingImport.$storageOf(existingImport__shadow_1).node))) {
                continue;
            }
            let importClause: {
                value: ImportClause__from_ast;
            } | undefined = Node__from_ast.AsImportClause(importClauseNode);
            let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
            const __gotots_store_0 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
            if (Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf)) && !(importKind === ImportKindNamed$constant__from_lsproto() && !(namedBindings === undefined))) {
                continue;
            }
            if (importKind === ImportKindDefault$constant__from_lsproto() && (!(ImportClause__from_ast.Name(importClause) === undefined) || addAsTypeOnly === AddAsTypeOnlyRequired$constant__from_lsproto() && !(namedBindings === undefined))) {
                continue;
            }
            if (importKind === ImportKindNamed$constant__from_lsproto() && !(namedBindings === undefined) && Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceImport$constant__from_ast()) {
                continue;
            }
            let fix: {
                value: Fix;
            } | undefined = { value: new Fix({ value: new AutoImportFix__from_lsproto(AutoImportFixKindAddToExisting$constant__from_lsproto(), Export.Name(__go_export), importKind, false, addAsTypeOnly, existingImport.$storageOf(existingImport__shadow_1).moduleSpecifier, existingImport.$storageOf(existingImport__shadow_1).index | 0, void 0, "") }, 0, false, "", void 0) };
            const __gotots_store_1 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
            let isTypeOnly = Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
            if ((!(addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto()) && isTypeOnly) || (addAsTypeOnly === AddAsTypeOnlyNotAllowed$constant__from_lsproto() && !isTypeOnly)) {
                return fix;
            }
            if (best === undefined) {
                best = fix;
            }
        }
        return best;
    }
    static $go$private$autoimport$tryUseExistingNamespaceImport(v: View | undefined, ctx: GoInterface | undefined, __go_export: {
        value: Export;
    } | undefined, usagePosition: tsonicTypeScriptRuntime.Location<Position__from_lsproto> | undefined): {
        value: Fix;
    } | undefined {
        if (usagePosition === undefined) {
            return void 0;
        }
        if (!(getImportKind((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importingFile, __go_export, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program) === ImportKindNamed$constant__from_lsproto())) {
            return void 0;
        }
        let existingImports: MultiMap__from_collections<ModuleID, existingImport> | undefined = View.$go$private$autoimport$getExistingImports(v, ctx);
        let matchingDeclarations = MultiMap__from_collections.Get<ModuleID, existingImport>(existingImports, (__go_export ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID);
        const __gotots_range_8 = matchingDeclarations;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
            const __gotots_range_value_13 = existingImport.$copy(existingImport.$fromStorage(__gotots_range_8.get(__gotots_range_index_6)));
            let existingImport__shadow_1 = __gotots_range_value_13;
            let namespacePrefix = getNamespaceLikeImportText(existingImport.$storageOf(existingImport__shadow_1).node);
            if (namespacePrefix === "" || existingImport.$storageOf(existingImport__shadow_1).moduleSpecifier === "") {
                continue;
            }
            return { value: new Fix({ value: new AutoImportFix__from_lsproto(AutoImportFixKindUseNamespace$constant__from_lsproto(), Export.Name(__go_export), ImportKindNamespace$constant__from_lsproto(), false, AddAsTypeOnlyAllowed$constant__from_lsproto(), existingImport.$storageOf(existingImport__shadow_1).moduleSpecifier, existingImport.$storageOf(existingImport__shadow_1).index | 0, usagePosition, namespacePrefix) }, 0, false, "", void 0) };
        }
        return void 0;
    }
}
export function NewView(registry: {
    value: Registry;
} | undefined, importingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, projectKey: Path__from_tspath, program: {
    value: Program__from_compiler;
} | undefined, preferences: UserPreferences__from_modulespecifiers): View | undefined {
    return new View(registry, importingFile, program, UserPreferences__from_modulespecifiers.$copy(preferences), projectKey, RuntimeSlice.nil<ModuleSpecifierEnding__from_modulespecifiers>(), NewSetFromItems$string(GetConditions__from___go_module(Program__from_compiler.Options(program), Program__from_compiler.GetDefaultResolutionModeForFile(program, new GoInterfaceAdapter(importingFile)))), ShouldUseUriStyleNodeCoreModules__from_lsutil(importingFile, program), void 0, void 0);
}
export class QueryKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function QueryKindWordPrefix$constant(): QueryKind {
    return new QueryKind(0);
}
export function QueryKindExactMatch$constant(): QueryKind {
    return new QueryKind(1);
}
export function QueryKindCaseInsensitiveMatch$constant(): QueryKind {
    return new QueryKind(2);
}
export class FixAndExport {
    declare private readonly $goType: void;
    public constructor(public Fix: {
        value: Fix;
    } | undefined, public Export: {
        value: Export;
    } | undefined) {
    }
    static $copy($source: FixAndExport): FixAndExport {
        return new FixAndExport($source.Fix, $source.Export);
    }
    static $equal($left: FixAndExport, $right: FixAndExport): bool {
        return $left.Fix
            ===
                $right.Fix
            &&
                $left.Export
                    ===
                        $right.Export;
    }
    static $hash($source: FixAndExport): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.Fix));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.Export));
        return $hash;
    }
    declare private readonly then?: never;
}
