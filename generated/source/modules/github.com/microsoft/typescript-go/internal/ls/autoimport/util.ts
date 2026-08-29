import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Program as Program__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Resolver as Resolver__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { PackageJson as PackageJson__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { RegistryCloneHost } from "./registry.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetNonAugmentationDeclaration as GetNonAugmentationDeclaration__from_ast, GetSourceFileOfModule as GetSourceFileOfModule__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportSpecifier as IsExportSpecifier__from_ast, IsIdentifier as IsIdentifier__from_ast, IsModuleWithStringLiteralName as IsModuleWithStringLiteralName__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, IsExternalModuleSymbol as IsExternalModuleSymbol__from_checker, NewChecker as NewChecker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { $state as $state__core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetPackageNameFromTypesPackageName as GetPackageNameFromTypesPackageName__from___go_module, NewResolverWithOptions as NewResolverWithOptions__from___go_module, ParseNodeModuleFromPath as ParseNodeModuleFromPath__from___go_module, ResolverOptions as ResolverOptions__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetPackageNameFromDirectory as GetPackageNameFromDirectory__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { DependencyFields as DependencyFields__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { CombinePaths as CombinePaths__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $state as $state__vfs, Entries as Entries__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { Replacements as Replacements__from_wrapvfs, Wrap as Wrap__from_wrapvfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/wrapvfs/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { NewSetWithSizeHint$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { FirstResult$PointerTo_Named_checker$Checker, FirstResult$rune } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { Identity$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { $goInterfaceAdapter$PointerTo_Named_autoimport$resolutionHost, $goInterfaceAdapter$PointerTo_Named_sync__package_1$Mutex, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { ModuleID } from "./export.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as runtime__from_gostdlib from "@gotots/gostdlib/runtime.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoChannel, goSelectReady } from "@gotots/runtime/channel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function tryGetModuleIDAndFileNameOfModuleSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): [
    ModuleID,
    gostring,
    bool
] {
    if (!Symbol__from_ast.IsExternalModule(__go_symbol)) {
        return [new ModuleID(""), "", false];
    }
    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNonAugmentationDeclaration__from_ast(__go_symbol);
    if (decl === undefined) {
        return [new ModuleID(""), "", false];
    }
    if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
        return [new ModuleID(SourceFile__from_ast.Path(Node__from_ast.AsSourceFile(decl)).$value), SourceFile__from_ast.FileName(Node__from_ast.AsSourceFile(decl)), true];
    }
    if (IsModuleWithStringLiteralName__from_ast(decl)) {
        return [new ModuleID(Node__from_ast.Text(Node__from_ast.Name(decl))), "", true];
    }
    return [new ModuleID(""), "", false];
}
export function wordIndices(s: gostring): RuntimeSlice<int> {
    let indices = RuntimeSlice.nil<int>();
    const __gotots_range_7 = s;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_7, __gotots_range_index_4);
        const __gotots_range_value_14 = __gotots_range_index_4;
        const __gotots_range_value_15 = __gotots_range_decode_0[0];
        let byteIndex = __gotots_range_value_14;
        let runeValue = __gotots_range_value_15;
        __gotots_range_index_4 += __gotots_range_decode_0[1];
        if (byteIndex === 0) {
            indices = indices.append(0, [byteIndex]);
            continue;
        }
        if (runeValue === 95) {
            if (byteIndex + 1 < s.length && goStringIndex(s, byteIndex + 1) !== 95) {
                indices = indices.append(0, [byteIndex + 1]);
            }
            continue;
        }
        let __gotots_logical_result_2 = unicode__from_gostdlib.IsUpper(runeValue);
        if (__gotots_logical_result_2) {
            const __gotots_results_8 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(s, 0, byteIndex));
            const __gotots_results_9 = [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
                int32,
                int
            ];
            const __gotots_argument_8 = FirstResult$rune(__gotots_results_9[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(__gotots_results_9[1])]));
            let __gotots_logical_result_1 = unicode__from_gostdlib.IsLower(__gotots_argument_8);
            if (!__gotots_logical_result_1) {
                let __gotots_logical_result_0 = byteIndex + 1 < s.length;
                if (__gotots_logical_result_0) {
                    const __gotots_results_10 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(s, byteIndex + 1));
                    const __gotots_results_11 = [__gotots_results_10[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_10[1]))] satisfies [
                        int32,
                        int
                    ];
                    const __gotots_argument_9 = FirstResult$rune(__gotots_results_11[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(__gotots_results_11[1])]));
                    __gotots_logical_result_0 = unicode__from_gostdlib.IsLower(__gotots_argument_9);
                }
                __gotots_logical_result_1 = (__gotots_logical_result_0);
            }
            __gotots_logical_result_2 = (__gotots_logical_result_1);
        }
        if (__gotots_logical_result_2) {
            indices = indices.append(0, [byteIndex]);
        }
    }
    return indices;
}
export function getPackageNamesInNodeModules(nodeModulesDir: gostring, fs: FS__from_vfs | undefined): [
    tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let packageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
        M: GoMap.nil()
    }));
    if (GetBaseFileName__from_tspath(nodeModulesDir) !== "node_modules") {
        const __gotots_argument_0 = new GoInterfaceAdapter("nodeModulesDir is not a node_modules directory");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    const __gotots_receiver_0 = fs;
    const __gotots_argument_1 = nodeModulesDir;
    if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).DirectoryExists(__gotots_argument_1)) {
        return [void 0, $state__vfs.ErrNotExist];
    }
    const __gotots_receiver_1 = fs;
    const __gotots_argument_2 = nodeModulesDir;
    let entries = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).GetAccessibleEntries(__gotots_argument_2);
    const __gotots_range_5 = Entries__from_vfs.$storageOf(entries).Directories;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_5.length; __gotots_range_index_2++) {
        const __gotots_range_value_12 = __gotots_range_5.get(__gotots_range_index_2);
        let baseName = __gotots_range_value_12;
        if (goStringIndex(baseName, 0) === 46) {
            continue;
        }
        if (goStringIndex(baseName, 0) === 64) {
            let scopedDirPath = CombinePaths__from_tspath(nodeModulesDir, RuntimeSlice.literal<gostring>([baseName]));
            const __gotots_receiver_2 = fs;
            const __gotots_argument_3 = scopedDirPath;
            const __gotots_range_6 = Entries__from_vfs.$storageOf(goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).GetAccessibleEntries(__gotots_argument_3)).Directories;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_6.length; __gotots_range_index_3++) {
                const __gotots_range_value_13 = __gotots_range_6.get(__gotots_range_index_3);
                let scopedPackageDirName = __gotots_range_value_13;
                let scopedBaseName = GetBaseFileName__from_tspath(scopedPackageDirName);
                if (baseName === "@types") {
                    Set$Add$string(packageNames, GetPackageNameFromTypesPackageName__from___go_module(CombinePaths__from_tspath("@types", RuntimeSlice.literal<gostring>([scopedBaseName]))));
                }
                else {
                    Set$Add$string(packageNames, CombinePaths__from_tspath(baseName, RuntimeSlice.literal<gostring>([scopedBaseName])));
                }
            }
            continue;
        }
        Set$Add$string(packageNames, baseName);
    }
    return [packageNames, void 0];
}
export function getDefaultLikeExportNameFromDeclaration(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): gostring {
    const __gotots_range_8 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_8.length; __gotots_range_index_5++) {
        const __gotots_range_value_16 = __gotots_range_8.get(__gotots_range_index_5);
        let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
        if (IsExportAssignment__from_ast(d)) {
            {
                let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(Node__from_ast.Expression(d), OEKAll$constant__from_ast());
                if (IsIdentifier__from_ast(innerExpression)) {
                    return Node__from_ast.Text(innerExpression);
                }
            }
            continue;
        }
        if (IsExportSpecifier__from_ast(d) && Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags === SymbolFlagsAlias$constant__from_ast() && !(Node__from_ast.PropertyName(d) === undefined)) {
            if (Node__from_ast.$storageOf(((Node__from_ast.PropertyName(d) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                return Node__from_ast.Text(Node__from_ast.PropertyName(d));
            }
            continue;
        }
        {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(d);
            if (!(name === undefined) && Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                return Node__from_ast.Text(name);
            }
        }
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && !IsExternalModuleSymbol__from_checker(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
            return Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
        }
    }
    return "";
}
export function getResolvedPackageNames(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let rawNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = Program__from_compiler.ResolvedPackageNames(program);
                let unresolvedPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = Program__from_compiler.UnresolvedPackageNames(program);
                let resolvedPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = NewSetWithSizeHint$string(Set$Len$string(rawNames));
                const __gotots_range_0 = Set$Keys$string(rawNames);
                const __gotots_range_keys_0 = __gotots_range_0.keys();
                for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                    const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                    if (!__gotots_range_value_1[1]) {
                        continue;
                    }
                    const __gotots_range_value_2 = __gotots_range_value_0;
                    let name = __gotots_range_value_2;
                    Set$Add$string(resolvedPackageNames, GetPackageNameFromTypesPackageName__from___go_module(name));
                }
                const __gotots_range_1: CompilerOptions__from_core["Types"] = (Program__from_compiler.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                    const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
                    let name = __gotots_range_value_3;
                    if (name !== "*") {
                        Set$Add$string(resolvedPackageNames, GetPackageNameFromTypesPackageName__from___go_module(name));
                    }
                }
                if (Set$Len$string(unresolvedPackageNames) > 0) {
                    const __gotots_results_0 = Program__from_compiler.GetTypeChecker(program, ctx);
                    let checker__shadow_1: {
                        value: Checker__from_checker;
                    } | undefined = __gotots_results_0[0];
                    let done: (() => void) | undefined = __gotots_results_0[1];
                    const __gotots_callee_0: (() => void) | undefined = done;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    });
                    const __gotots_range_2 = Set$Keys$string(unresolvedPackageNames);
                    const __gotots_range_keys_1 = __gotots_range_2.keys();
                    for (const __gotots_range_value_4 of __gotots_range_keys_1) {
                        const __gotots_range_value_5 = __gotots_range_2.lookupOk(__gotots_range_value_4);
                        if (!__gotots_range_value_5[1]) {
                            continue;
                        }
                        const __gotots_range_value_6 = __gotots_range_value_4;
                        let name = __gotots_range_value_6;
                        {
                            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.TryFindAmbientModule(checker__shadow_1, name);
                            if (!(__go_symbol === undefined)) {
                                let declaringFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfModule__from_ast(__go_symbol);
                                {
                                    let packageName = GetPackageNameFromDirectory__from_modulespecifiers(SourceFile__from_ast.FileName(declaringFile));
                                    if (packageName !== "") {
                                        Set$Add$string(resolvedPackageNames, GetPackageNameFromTypesPackageName__from___go_module(packageName));
                                    }
                                }
                            }
                        }
                    }
                }
                __gotots_return_0 = resolvedPackageNames;
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return __gotots_return_0;
}
export function addProjectReferenceOutputMappings(program: {
    value: Program__from_compiler;
} | undefined, result: GoMapValue<Path__from_tspath, gostring>): void {
    let refs = Program__from_compiler.GetResolvedProjectReferences(program);
    const __gotots_range_3 = refs;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
        const __gotots_range_value_7 = __gotots_range_3.get(__gotots_range_index_1);
        let ref: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_range_value_7;
        if (ref === undefined) {
            continue;
        }
        ParsedCommandLine__from_tsoptions.ParseInputOutputNames(ref);
        const __gotots_range_4 = ParsedCommandLine__from_tsoptions.OutputDtsToProjectReference(ref);
        const __gotots_range_keys_2 = __gotots_range_4.keys();
        for (const __gotots_range_value_8 of __gotots_range_keys_2) {
            const __gotots_range_value_9 = __gotots_range_4.lookupOk(__gotots_range_value_8);
            if (!__gotots_range_value_9[1]) {
                continue;
            }
            const __gotots_range_value_10 = __gotots_range_value_8;
            const __gotots_range_value_11 = __gotots_range_value_9[0];
            let outputDtsPath = __gotots_range_value_10;
            let mapping: {
                value: SourceOutputAndProjectReference__from_tsoptions;
            } | undefined = __gotots_range_value_11;
            {
                const __gotots_results_1 = result.lookupOk(outputDtsPath);
                let exists = __gotots_results_1[1];
                if (!exists) {
                    result.store(outputDtsPath, (mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Source);
                }
            }
        }
    }
}
export function createCheckerPool(program: Program__from_checker | undefined): [
    (() => [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ]) | undefined,
    (() => void) | undefined,
    (() => int32) | undefined
] {
    let getChecker: (() => [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ]) | undefined = void 0;
    let closePool: (() => void) | undefined = void 0;
    let getCreatedCount: (() => int32) | undefined = void 0;
    let maxSize = globalThis.Number(BigInt.asIntN(64, runtime__from_gostdlib.GOMAXPROCS(BigInt.asIntN(64, goNumberToBigInt(0))))) | 0;
    let pool: GoChannel<{
        value: Checker__from_checker;
    } | undefined> | undefined = GoChannel.make<{
        value: Checker__from_checker;
    } | undefined>(maxSize, (): {
        value: Checker__from_checker;
    } | undefined => {
        return void 0;
    }, (value: {
        value: Checker__from_checker;
    } | undefined): {
        value: Checker__from_checker;
    } | undefined => {
        return value;
    });
    let created = named_sync_atomic.SyncAtomicInt32Operations.$zero();
    return [(): [
            {
                value: Checker__from_checker;
            } | undefined,
            (() => void) | undefined
        ] => {
            let __gotots_receive_0: [
                {
                    value: Checker__from_checker;
                } | undefined,
                boolean
            ] | undefined = undefined;
            const __gotots_select_0 = GoChannel.$selectReceive(pool, (value: {
                value: Checker__from_checker;
            } | undefined, ok: boolean): void => {
                __gotots_receive_0 = [value, ok];
            });
            const __gotots_switch_selection_0 = goSelectReady([__gotots_select_0]);
            switch (__gotots_switch_selection_0 === undefined ? -1 : __gotots_switch_selection_0) {
                case 0: {
                    if (__gotots_receive_0 === undefined) {
                        GoPanic.raiseRuntime("selected receive has no result");
                    }
                    let ch: {
                        value: Checker__from_checker;
                    } | undefined = __gotots_receive_0[0];
                    return [ch, (): void => {
                            GoChannel.send(pool, ch);
                        }];
                    break;
                }
                case -1: {
                    break;
                    break;
                }
                default: GoPanic.raiseRuntime("select returned an invalid case");
            }
            for (;;) {
                let current = atomic__from_gostdlib.Int32.Load(created);
                if (current >= maxSize) {
                    let ch: {
                        value: Checker__from_checker;
                    } | undefined = GoChannel.receive(pool)[0];
                    return [ch, (): void => {
                            GoChannel.send(pool, ch);
                        }];
                }
                if (atomic__from_gostdlib.Int32.CompareAndSwap(created, current, current + 1)) {
                    const __gotots_results_7 = NewChecker__from_checker(program, void 0);
                    let ch: {
                        value: Checker__from_checker;
                    } | undefined = FirstResult$PointerTo_Named_checker$Checker(__gotots_results_7[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$PointerTo_Named_sync__package_1$Mutex(__gotots_results_7[1])]));
                    return [ch, (): void => {
                            GoChannel.send(pool, ch);
                        }];
                }
            }
        }, (): void => {
            GoChannel.close(pool);
        }, (): int32 => {
            return atomic__from_gostdlib.Int32.Load(created);
        }];
}
export function addPackageJsonDependencies(contents: {
    value: PackageJson__from_packagejson;
} | undefined, deps: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): void {
    const __gotots_store_0: PackageJson__from_packagejson["Fields"] = (contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields;
    DependencyFields__from_packagejson.RangeDependencies(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "DependencyFields"), (name: gostring, $1: gostring, field: gostring): bool => {
        if (name === "" || name === "@types/" || goStringIndex(name, 0) === 46) {
            return true;
        }
        if (field === "dependencies" || field === "peerDependencies") {
            Set$Add$string(deps, GetPackageNameFromTypesPackageName__from___go_module(name));
        }
        return true;
    });
}
export function getPackageRealpathFuncs(fs: FS__from_vfs | undefined, packageDir: gostring): [
    (($0: gostring) => gostring) | undefined,
    (($0: gostring) => gostring) | undefined
] {
    let toRealpath: (($0: gostring) => gostring) | undefined = void 0;
    let toSymlink: (($0: gostring) => gostring) | undefined = void 0;
    const __gotots_receiver_3 = fs;
    const __gotots_argument_4 = packageDir;
    let realPackageDir = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).Realpath(__gotots_argument_4);
    let isSymlinked = realPackageDir !== packageDir;
    let dirCache: GoMapValue<gostring, gostring> = GoMap__from_gotots_runtime.make<gostring, gostring>("", 0, []);
    toRealpath = (fileName: gostring): gostring => {
        if (isSymlinked) {
            {
                const __gotots_results_3 = strings__from_gostdlib.CutPrefix(fileName, packageDir);
                let after = __gotots_results_3[0];
                let ok = __gotots_results_3[1];
                if (ok) {
                    return realPackageDir + after;
                }
            }
        }
        let pkgDir = ParseNodeModuleFromPath__from___go_module(fileName, false);
        if (pkgDir === "") {
            return fileName;
        }
        {
            const __gotots_results_4 = dirCache.lookupOk(pkgDir);
            let realDir__shadow_1 = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                if (realDir__shadow_1 === pkgDir) {
                    return fileName;
                }
                return realDir__shadow_1 + goStringSlice(fileName, pkgDir.length);
            }
        }
        const __gotots_receiver_4 = fs;
        const __gotots_argument_5 = pkgDir;
        let realDir = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).Realpath(__gotots_argument_5);
        dirCache.store(pkgDir, realDir);
        if (realDir === pkgDir) {
            return fileName;
        }
        return realDir + goStringSlice(fileName, pkgDir.length);
    };
    if (!isSymlinked) {
        return [toRealpath, ($argument0: gostring): gostring => {
                return Identity$string($argument0);
            }];
    }
    toSymlink = (fileName: gostring): gostring => {
        {
            const __gotots_results_6 = strings__from_gostdlib.CutPrefix(fileName, realPackageDir);
            let after = __gotots_results_6[0];
            let ok = __gotots_results_6[1];
            if (ok) {
                return packageDir + after;
            }
        }
        return fileName;
    };
    return [toRealpath, toSymlink];
}
export class resolutionHost {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public currentDirectory: gostring) {
    }
    static $copy($source: resolutionHost): resolutionHost {
        return new resolutionHost($source.fs, $source.currentDirectory);
    }
    static $equal($left: resolutionHost, $right: resolutionHost): bool {
        return goInterfaceEqual($left.fs, $right.fs) && $left.currentDirectory === $right.currentDirectory;
    }
    static $hash($source: resolutionHost): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.fs === undefined ? 0 : $source.fs.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.currentDirectory));
        return $hash;
    }
    declare private readonly then?: never;
    static FS(rh: {
        value: resolutionHost;
    } | undefined): FS__from_vfs | undefined {
        return (rh ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static GetCurrentDirectory(rh: {
        value: resolutionHost;
    } | undefined): gostring {
        return (rh ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
    }
}
export function getModuleResolver(host: RegistryCloneHost | undefined, realpath: (($0: gostring) => gostring) | undefined, opts: ResolverOptions__from___go_module): {
    value: Resolver__from___go_module;
} | undefined {
    const __gotots_receiver_5 = host;
    const __gotots_argument_6 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_5).FS();
    const __gotots_argument_7 = new Replacements__from_wrapvfs(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, realpath);
    const __gotots_field_0 = Wrap__from_wrapvfs(__gotots_argument_6, __gotots_argument_7);
    const __gotots_receiver_6 = host;
    const __gotots_field_1 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_6).GetCurrentDirectory();
    let rh: {
        value: resolutionHost;
    } | undefined = { value: new resolutionHost(__gotots_field_0, __gotots_field_1) };
    return NewResolverWithOptions__from___go_module(new $goInterfaceAdapter$PointerTo_Named_autoimport$resolutionHost(rh), $state__core.EmptyCompilerOptions, "", "", ResolverOptions__from___go_module.$copy(opts));
}
