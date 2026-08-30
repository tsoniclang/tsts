import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExternalModuleIndicatorOptions$Storage as ExternalModuleIndicatorOptions__from_ast$Storage, FileReference as FileReference__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { NodeModulePathParts as NodeModulePathParts__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import type { Expected as Expected__from_packagejson, PackageJson as PackageJson__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { DocumentPosition as DocumentPosition__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { refInfo } from "./findallreferences.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetExternalModuleName as GetExternalModuleName__from_ast, GetImpliedNodeFormatForFile as GetImpliedNodeFormatForFile__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, GetTextOfPropertyName as GetTextOfPropertyName__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsAnyImportOrReExport as IsAnyImportOrReExport__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsCallExpression as IsCallExpression__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsDeclaration as IsDeclaration__from_ast, IsDefaultImport as IsDefaultImport__from_ast, IsExportSpecifier as IsExportSpecifier__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportCall as IsImportCall__from_ast, IsImportClause as IsImportClause__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsImportSpecifier as IsImportSpecifier__from_ast, IsNamespaceImport as IsNamespaceImport__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsRequireCall as IsRequireCall__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, JSDeclarationKindNone$constant as JSDeclarationKindNone$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, ModifierFlagsExportDefault$constant as ModifierFlagsExportDefault$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTouchingPropertyName as GetTouchingPropertyName__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { BindSourceFile as BindSourceFile__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { Checker as Checker__from_checker, TryGetModuleSpecifierFromDeclaration as TryGetModuleSpecifierFromDeclaration__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { GetScriptKindFromFileName as GetScriptKindFromFileName__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetPackageNameFromTypesPackageName as GetPackageNameFromTypesPackageName__from___go_module, ResolvedModule as ResolvedModule__from___go_module, Resolver as Resolver__from___go_module, TryGetJSExtensionForFile as TryGetJSExtensionForFile__from___go_module, UnmangleScopedPackageName as UnmangleScopedPackageName__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetNodeModulePathParts as GetNodeModulePathParts__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { ParseSourceFile as ParseSourceFile__from_parser } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/parser/package.js";
import { ChangeExtension as ChangeExtension__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { MaxInt$int as MaxInt$int__from_math__package_1 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Deduplicate$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Deduplicate.js";
import { Filter$PointerTo_Named_ast$Node, Filter$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Expected$GetValue$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/Expected$GetValue.js";
import { Clip$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Clip.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_string_To_PointerTo_Named_ast$SourceFile as GoMap } from "../../../../../../support/maps.js";
import { getDeclarationsFromLocation, tryGetSignatureDeclaration } from "./definition.js";
import { getFileAndStartPosFromDeclaration } from "./findallreferences.js";
import { LanguageService } from "./languageservice.js";
import { getContainerNode, getReferenceAtPosition } from "./utilities.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMapValue } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class sourceDefResolver {
    declare private readonly $goType: void;
    public constructor(public ls: LanguageService | undefined, public fs: FS__from_vfs | undefined, public options: {
        value: CompilerOptions__from_core;
    } | undefined, public getSourceFile: (($0: gostring) => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) | undefined, public resolveFrom: gostring, public resolver: {
        value: Resolver__from___go_module;
    } | undefined, public parsedFiles: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$findDeclarationsInFile(r: sourceDefResolver | undefined, fileName: gostring, names: RuntimeSlice<gostring>, seen: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (fileName === "" || names.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        if (!Set$AddIfAbsent$string(seen, fileName)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = sourceDefResolver.$go$private$ls$getOrParseSourceFile(r, fileName);
        if (sourceFile === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let declarations = findDeclarationNodesByName(sourceFile, names);
        if (declarations.length !== 0 && hasConcreteSourceDeclarations(declarations)) {
            return declarations;
        }
        let forwarded = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_4 = sourceDefResolver.$go$private$ls$getForwardedImplementationFiles(r, sourceFile);
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let forwardedFile = __gotots_range_value_4;
            forwarded = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(forwarded, sourceDefResolver.$go$private$ls$findDeclarationsInFile(r, forwardedFile, names, seen), void 0);
        }
        if (forwarded.length !== 0) {
            if (hasConcreteSourceDeclarations(forwarded)) {
                return uniqueDeclarationNodes(forwarded);
            }
            return uniqueDeclarationNodes(goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(Clip$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(declarations), forwarded, void 0));
        }
        return declarations;
    }
    static $go$private$ls$findImplementationFileFromDtsFileName(r: sourceDefResolver | undefined, dtsFileName: gostring, preferredMode: ModuleKind__from_core): gostring {
        {
            let jsExt = TryGetJSExtensionForFile__from___go_module(dtsFileName, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options);
            if (jsExt !== "") {
                let candidate = ChangeExtension__from_tspath(dtsFileName, jsExt);
                const __gotots_receiver_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fs;
                const __gotots_argument_1 = candidate;
                if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).FileExists(__gotots_argument_1)) {
                    return candidate;
                }
            }
        }
        let parts: NodeModulePathParts__from_modulespecifiers | undefined = GetNodeModulePathParts__from_modulespecifiers(dtsFileName);
        if (parts === undefined) {
            return "";
        }
        if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(dtsFileName, "/node_modules/"))) !== (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TopLevelNodeModulesIndex) {
            return "";
        }
        let packageNamePathPart = goStringSlice(dtsFileName, (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TopLevelPackageNameIndex + 1, (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageRootIndex);
        let packageName = GetPackageNameFromTypesPackageName__from___go_module(UnmangleScopedPackageName__from___go_module(packageNamePathPart));
        if (packageName === "") {
            return "";
        }
        let pathToFileInPackage = goStringSlice(dtsFileName, (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageRootIndex + 1);
        if (pathToFileInPackage !== "") {
            let specifier = packageName + "/" + RemoveFileExtension__from_tspath(pathToFileInPackage);
            {
                let implementationFile = sourceDefResolver.$go$private$ls$resolveImplementation(r, specifier, preferredMode);
                if (implementationFile !== "") {
                    return implementationFile;
                }
            }
        }
        return sourceDefResolver.$go$private$ls$resolveImplementation(r, packageName, preferredMode);
    }
    static $go$private$ls$getForwardedImplementationFiles(r: sourceDefResolver | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<gostring> {
        let preferredMode = sourceDefResolver.$go$private$ls$inferImpliedNodeFormat(r, SourceFile__from_ast.FileName(sourceFile));
        let files = RuntimeSlice.nil<gostring>();
        const __gotots_range_7 = SourceFile__from_ast.Imports(sourceFile);
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            let moduleName = Node__from_ast.Text(imp);
            {
                let implementationFile = sourceDefResolver.$go$private$ls$resolveImplementationFrom(r, moduleName, SourceFile__from_ast.FileName(sourceFile), preferredMode);
                if (implementationFile !== "") {
                    files = files.append("", [implementationFile]);
                }
            }
        }
        return Deduplicate$string(files);
    }
    static $go$private$ls$getOrParseSourceFile(r: sourceDefResolver | undefined, fileName: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        {
            const __gotots_callee_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).getSourceFile;
            const __gotots_argument_0 = fileName;
            let sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            if (!(sourceFile__shadow_1 === undefined)) {
                return sourceFile__shadow_1;
            }
        }
        {
            const __gotots_results_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedFiles.lookupOk(fileName);
            let sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                return sourceFile__shadow_1;
            }
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        {
            const __gotots_results_2 = LanguageService.ReadFile((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ls, fileName);
            let text = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                sourceFile = ParseSourceFile__from_parser(SourceFileParseOptions__from_ast.$fromStorage({
                    FileName: fileName,
                    Path: LanguageService.$go$private$ls$toPath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ls, fileName).$value,
                    ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$zeroStorage()
                }), text, GetScriptKindFromFileName__from_core(fileName));
                BindSourceFile__from_binder(sourceFile);
            }
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedFiles.isNil()) {
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedFiles = GoMap.make(0, []);
        }
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parsedFiles.store(fileName, sourceFile);
        return sourceFile;
    }
    static $go$private$ls$inferImpliedNodeFormat(r: sourceDefResolver | undefined, fileName: gostring): ModuleKind__from_core {
        let packageJsonType = "";
        {
            let scope: {
                value: InfoCacheEntry__from_packagejson;
            } | undefined = Resolver__from___go_module.GetPackageScopeForPath((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver, GetDirectoryPath__from_tspath(fileName));
            if (InfoCacheEntry__from_packagejson.Exists(scope)) {
                {
                    const __gotots_store_1 = ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields;
                    const __gotots_results_3 = Expected$GetValue$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Type"));
                    let value = __gotots_results_3[0];
                    let ok = __gotots_results_3[1];
                    if (ok) {
                        packageJsonType = value;
                    }
                }
            }
        }
        return GetImpliedNodeFormatForFile__from_ast(fileName, packageJsonType);
    }
    static $go$private$ls$mapDeclarationToSource(r: sourceDefResolver | undefined, originalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, resolvedImplFile: gostring): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_results_5 = getFileAndStartPosFromDeclaration(declaration);
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_5[0];
        let startPos = __gotots_results_5[1];
        let fileName = SourceFile__from_ast.FileName(file);
        {
            let mapped: DocumentPosition__from_sourcemap | undefined = LanguageService.$go$private$ls$tryGetSourcePosition((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ls, fileName, startPos);
            if (!(mapped === undefined)) {
                {
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = sourceDefResolver.$go$private$ls$getOrParseSourceFile(r, (mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileName);
                    if (!(sourceFile === undefined)) {
                        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([findClosestDeclarationNode(sourceFile, (mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Pos)]);
                    }
                }
            }
        }
        if (!IsDeclarationFileName__from_tspath(fileName)) {
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([declaration]);
        }
        let implementationFile = resolvedImplFile;
        if (implementationFile === "") {
            let dtsFileName = SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(declaration));
            let preferredMode = sourceDefResolver.$go$private$ls$inferImpliedNodeFormat(r, dtsFileName);
            implementationFile = sourceDefResolver.$go$private$ls$findImplementationFileFromDtsFileName(r, dtsFileName, preferredMode);
        }
        return sourceDefResolver.$go$private$ls$searchImplementationFile(r, originalNode, implementationFile, getCandidateSourceDeclarationNames(originalNode, declaration));
    }
    static $go$private$ls$resolveFromCheckerInfo(r: sourceDefResolver | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, resolvedImplFile: gostring, checkerDeclarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, moduleSpecifier: gostring): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (resolvedImplFile === "" && moduleSpecifier !== "") {
            resolvedImplFile = sourceDefResolver.$go$private$ls$resolveImplementation(r, moduleSpecifier, sourceDefResolver.$go$private$ls$inferImpliedNodeFormat(r, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolveFrom));
        }
        if (checkerDeclarations.length === 0 && resolvedImplFile !== "") {
            let names = getCandidateSourceDeclarationNames(node, void 0);
            {
                let results = sourceDefResolver.$go$private$ls$searchImplementationFile(r, node, resolvedImplFile, names);
                if (!results.isNil()) {
                    return uniqueDeclarationNodes(results);
                }
            }
        }
        let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_2 = checkerDeclarations;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            declarations = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(declarations, sourceDefResolver.$go$private$ls$mapDeclarationToSource(r, node, declaration, resolvedImplFile), void 0);
        }
        declarations = uniqueDeclarationNodes(declarations);
        if (hasConcreteSourceDeclarations(declarations)) {
            return declarations;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    static $go$private$ls$resolveImplementation(r: sourceDefResolver | undefined, moduleName: gostring, preferredMode: ModuleKind__from_core): gostring {
        return sourceDefResolver.$go$private$ls$resolveImplementationFrom(r, moduleName, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolveFrom, preferredMode);
    }
    static $go$private$ls$resolveImplementationFrom(r: sourceDefResolver | undefined, moduleName: gostring, resolveFromFile: gostring, preferredMode: ModuleKind__from_core): gostring {
        let modes = RuntimeSlice.literal<ModuleKind__from_core>([preferredMode]);
        if (!(preferredMode === ModuleKindESNext$constant__from_core())) {
            modes = modes.append(0, [ModuleKindESNext$constant__from_core()]);
        }
        if (!(preferredMode === ModuleKindCommonJS$constant__from_core())) {
            modes = modes.append(0, [ModuleKindCommonJS$constant__from_core()]);
        }
        const __gotots_range_3 = modes;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let mode = __gotots_range_value_3;
            const __gotots_results_4 = Resolver__from___go_module.ResolveModuleName((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver, moduleName, resolveFromFile, mode, void 0);
            let resolved: ResolvedModule__from___go_module | undefined = __gotots_results_4[0];
            if (!(resolved === undefined) && ResolvedModule__from___go_module.IsResolved(resolved) && !IsDeclarationFileName__from_tspath((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName)) {
                return (resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
            }
        }
        return "";
    }
    static $go$private$ls$resolveTripleSlashReference(r: sourceDefResolver | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int, program: {
        value: Program__from_compiler;
    } | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        {
            value: FileReference__from_ast;
        } | undefined
    ] {
        let ref: refInfo | undefined = getReferenceAtPosition(file, pos, program);
        if (ref === undefined || (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file === undefined) {
            return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0];
        }
        if (!(((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            return [getSourceDefinitionEntryDeclarations((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file), (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reference];
        }
        let dtsFileName = SourceFile__from_ast.FileName((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file);
        let preferredMode = sourceDefResolver.$go$private$ls$inferImpliedNodeFormat(r, dtsFileName);
        let implementationFile = sourceDefResolver.$go$private$ls$findImplementationFileFromDtsFileName(r, dtsFileName, preferredMode);
        if (implementationFile === "") {
            return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0];
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = sourceDefResolver.$go$private$ls$getOrParseSourceFile(r, implementationFile);
        if (sourceFile === undefined) {
            return [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), void 0];
        }
        return [getSourceDefinitionEntryDeclarations(sourceFile), (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reference];
    }
    static $go$private$ls$searchImplementationFile(r: sourceDefResolver | undefined, originalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, implementationFile: gostring, names: RuntimeSlice<gostring>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (implementationFile === "") {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = sourceDefResolver.$go$private$ls$getOrParseSourceFile(r, implementationFile);
        if (sourceFile === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        if (isDefaultImportName(originalNode)) {
            let defaultDeclarations = sourceDefResolver.$go$private$ls$findDeclarationsInFile(r, implementationFile, RuntimeSlice.literal<gostring>(["default"]), tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                M: $goMap$MapOf_string_To_Struct_void.nil()
            })));
            if (defaultDeclarations.length !== 0) {
                return filterPreferredSourceDeclarations(originalNode, defaultDeclarations);
            }
            return getSourceDefinitionEntryDeclarations(sourceFile);
        }
        let declarations = sourceDefResolver.$go$private$ls$findDeclarationsInFile(r, implementationFile, names, tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: $goMap$MapOf_string_To_Struct_void.nil()
        })));
        if (declarations.length !== 0) {
            return filterPreferredSourceDeclarations(originalNode, declarations);
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
}
export function getSourceDefCheckerInfo(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
    gostring
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        gostring
    ] = [RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), ""];
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_0 = Program__from_compiler.GetTypeCheckerForFile(program, ctx, file);
                let c: {
                    value: Checker__from_checker;
                } | undefined = __gotots_results_0[0];
                let done: (() => void) | undefined = __gotots_results_0[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let declarations = getDeclarationsFromLocation(c, node);
                let isPropertyName = !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsAccessExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
                    tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
                if (declarations.length === 0 && isPropertyName) {
                    {
                        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        if (!(left === undefined)) {
                            {
                                let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertyOfType(c, Checker__from_checker.GetTypeAtLocation(c, left), Node__from_ast.Text(node));
                                if (!(prop === undefined)) {
                                    declarations = Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                                }
                            }
                        }
                    }
                }
                {
                    let calledDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = tryGetSignatureDeclaration(c, node);
                    if (!(calledDeclaration === undefined)) {
                        let nonFunctionDeclarations = Filter$PointerTo_Named_ast$Node(declarations, (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                            return !IsFunctionLike__from_ast(node__shadow_1);
                        });
                        declarations = nonFunctionDeclarations.append(void 0, [calledDeclaration]);
                    }
                }
                let moduleSpecifier = "";
                let resolveNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
                if (isPropertyName) {
                    let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    for (; !(expr === undefined) && IsAccessExpression__from_ast(expr);) {
                        expr = Node__from_ast.Expression(expr);
                    }
                    if (!(expr === undefined)) {
                        resolveNode = expr;
                    }
                }
                {
                    let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(c, resolveNode);
                    if (!(sym === undefined)) {
                        const __gotots_range_1 = Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                            let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                            if (!IsImportSpecifier__from_ast(d) && !IsImportClause__from_ast(d) && !IsNamespaceImport__from_ast(d) && !IsImportEqualsDeclaration__from_ast(d)) {
                                continue;
                            }
                            {
                                let spec: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetModuleSpecifierFromDeclaration__from_checker(d);
                                if (!(spec === undefined)) {
                                    moduleSpecifier = Node__from_ast.Text(spec);
                                    break;
                                }
                            }
                        }
                    }
                }
                __gotots_return_0 = [declarations, moduleSpecifier];
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
export function isDefaultImportName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined || !IsImportClause__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || !tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return false;
    }
    return IsDefaultImport__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function getSourceDefinitionEntryNode(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 0) {
        return (void Node__from_ast.AsNode,
            NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
    }
    const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
}
export function getSourceDefinitionEntryDeclarations(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([getSourceDefinitionEntryNode(sourceFile)]);
}
export function findContainingModuleSpecifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node; !(current === undefined); current = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) {
        if (IsAnyImportOrReExport__from_ast(current) || IsRequireCall__from_ast(current, true) || IsImportCall__from_ast(current)) {
            {
                let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetExternalModuleName__from_ast(current);
                if (!(moduleSpecifier === undefined) && IsStringLiteralLike__from_ast(moduleSpecifier)) {
                    return moduleSpecifier;
                }
            }
        }
    }
    return void 0;
}
export function getCandidateSourceDeclarationNames(originalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<gostring> {
    let names = RuntimeSlice.nil<gostring>();
    if (!(declaration === undefined)) {
        {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(declaration);
            if (!(name === undefined)) {
                {
                    let text = GetTextOfPropertyName__from_ast(name);
                    if (text !== "") {
                        names = names.append("", [text]);
                    }
                }
            }
        }
        if (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast()) {
            names = names.append("", ["default"]);
        }
        if ((IsFunctionDeclaration__from_ast(declaration) || IsClassDeclaration__from_ast(declaration)) && (Node__from_ast.ModifierFlags(declaration) & ModifierFlagsExportDefault$constant__from_ast()) >>> 0 === ModifierFlagsExportDefault$constant__from_ast()) {
            names = names.append("", ["default"]);
        }
        if (IsImportSpecifier__from_ast(declaration) || IsExportSpecifier__from_ast(declaration)) {
            {
                let propName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyName(declaration);
                if (!(propName === undefined)) {
                    names = names.append("", [Node__from_ast.Text(propName)]);
                }
            }
        }
    }
    if (!(originalNode === undefined)) {
        if (IsIdentifier__from_ast(originalNode) || IsPrivateIdentifier__from_ast(originalNode)) {
            names = names.append("", [Node__from_ast.Text(originalNode)]);
        }
        if (isDefaultImportName(originalNode)) {
            names = names.append("", ["default"]);
        }
        if (!(Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
            if (IsImportSpecifier__from_ast(Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsExportSpecifier__from_ast(Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                {
                    let propName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyName(Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (!(propName === undefined)) {
                        names = names.append("", [Node__from_ast.Text(propName)]);
                    }
                }
            }
        }
    }
    return names;
}
export function findDeclarationNodesByName(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, names: RuntimeSlice<gostring>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    names = Deduplicate$string(Filter$string(names, (name: gostring): bool => {
        return name !== "";
    }));
    if (names.length === 0) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let wanted = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.nil();
    });
    const wanted$location = tsonicTypeScriptRuntime.boundLocation({}, () => wanted, wanted$next => wanted = wanted$next);
    let wantDefault = false;
    const __gotots_range_5 = names;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let name = __gotots_range_value_5;
        if (name === "default") {
            wantDefault = true;
            continue;
        }
        Set$Add$string(wanted$location, name);
    }
    type candidate$Storage = {
        node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
        depth: int;
    };
    class candidate {
        declare private readonly $goType: void;
        public constructor(private readonly $storage: candidate$Storage) {
        }
        public static $storageOf($source: candidate): candidate$Storage {
            return $source.$storage;
        }
        public static $fromStorage($source: candidate$Storage): candidate {
            return new candidate($source);
        }
        public get node(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
            return this.$storage.node;
        }
        public set node($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
            this.$storage.node = $value;
        }
        public get depth(): int {
            return this.$storage.depth;
        }
        public set depth($value: int) {
            this.$storage.depth = $value;
        }
        static $copy($source: candidate): candidate {
            return new candidate({
                node: $source.$storage.node,
                depth: $source.$storage.depth
            });
        }
        static $zeroStorage(): candidate$Storage {
            return {
                node: void 0,
                depth: 0
            };
        }
        declare private readonly then?: never;
    }
    let candidates = RuntimeSlice.nil<candidate$Storage>();
    let minDepth = MaxInt$int__from_math__package_1;
    let visit: Visitor__from_ast = new Visitor__from_ast(void 0);
    visit = new Visitor__from_ast((node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        let matched = false;
        {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
            if (!(name === undefined)) {
                {
                    let text = GetTextOfPropertyName__from_ast(name);
                    if (text !== "") {
                        if (Set__from_collections.Has<gostring>(wanted$location, text)) {
                            matched = true;
                        }
                    }
                }
            }
        }
        if (wantDefault && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast()) {
            matched = true;
        }
        if (wantDefault && (IsFunctionDeclaration__from_ast(node) || IsClassDeclaration__from_ast(node)) && (Node__from_ast.ModifierFlags(node) & ModifierFlagsExportDefault$constant__from_ast()) >>> 0 === ModifierFlagsExportDefault$constant__from_ast()) {
            matched = true;
        }
        if (matched) {
            let depth = getContainerDepth(node);
            const __gotots_slice_build_0 = candidates;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void candidate.$storageOf, (void candidate.$fromStorage,
                    {
                        node: node,
                        depth: depth
                    })));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<candidate$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, candidate.$storageOf(candidate.$copy(candidate.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void candidate.$storageOf, (void candidate.$fromStorage,
                    {
                        node: node,
                        depth: depth
                    })));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, candidate.$zeroStorage());
                }
            }
            candidates = __gotots_slice_build_1;
            if (depth < minDepth) {
                minDepth = depth;
            }
        }
        return Node__from_ast.ForEachChild(node, visit);
    });
    const __gotots_store_2 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    Node__from_ast.ForEachChild(NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_2, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)), visit);
    let declarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_6 = candidates;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = candidate.$copy(candidate.$fromStorage(__gotots_range_6.get(__gotots_range_index_6)));
        let c = __gotots_range_value_6;
        if (candidate.$storageOf(c).depth === minDepth) {
            declarations = declarations.append(void 0, [candidate.$storageOf(c).node]);
        }
    }
    return uniqueDeclarationNodes(declarations);
}
export function getContainerDepth(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
    let depth = 0;
    let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    for (; !(current === undefined);) {
        current = getContainerNode(current);
        depth++;
    }
    return depth;
}
export function filterPreferredSourceDeclarations(originalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (declarations.length <= 1 || originalNode === undefined) {
        return declarations;
    }
    {
        let preferred = getPropertyLikeSourceDeclarations(originalNode, declarations);
        if (preferred.length !== 0) {
            return preferred;
        }
    }
    {
        let preferred = Filter$PointerTo_Named_ast$Node(declarations, isConcreteSourceDeclaration);
        if (preferred.length !== 0) {
            return preferred;
        }
    }
    return declarations;
}
export function getPropertyLikeSourceDeclarations(originalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined || !IsAccessExpression__from_ast(Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || !tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((originalNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), originalNode)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    return Filter$PointerTo_Named_ast$Node(declarations, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyAssignment$constant__from_ast():
            case KindShorthandPropertyAssignment$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast():
            case KindPropertySignature$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindMethodSignature$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindEnumMember$constant__from_ast(): {
                return true;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    });
}
export function hasConcreteSourceDeclarations(declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): bool {
    return ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(declarations, isConcreteSourceDeclaration);
}
export function isConcreteSourceDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!IsDeclaration__from_ast(node) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast()) {
        return false;
    }
    if ((IsBinaryExpression__from_ast(node) || IsCallExpression__from_ast(node)) && !(GetAssignmentDeclarationKind__from_ast(node).$value === JSDeclarationKindNone$constant__from_ast().$value)) {
        return false;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParameter$constant__from_ast():
        case KindTypeParameter$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindImportClause$constant__from_ast():
        case KindImportSpecifier$constant__from_ast():
        case KindNamespaceImport$constant__from_ast():
        case KindExportSpecifier$constant__from_ast():
        case KindPropertyAccessExpression$constant__from_ast():
        case KindElementAccessExpression$constant__from_ast(): {
            return false;
            break;
        }
        default: {
            return true;
            break;
        }
    }
}
export function uniqueDeclarationNodes(nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    class declarationKey {
        declare private readonly $goType: void;
        public constructor(public fileName: gostring, public loc: TextRange__from_core) {
        }
        static $copy($source: declarationKey): declarationKey {
            return new declarationKey($source.fileName, TextRange__from_core.$copy($source.loc));
        }
        static $equal($left: declarationKey, $right: declarationKey): bool {
            return $left.fileName === $right.fileName && TextRange__from_core.$equal($left.loc, $right.loc);
        }
        static $hash($source: declarationKey): number {
            let $hash = 2166136261;
            $hash = GoMapHash.mix($hash, GoMapHash.string($source.fileName));
            $hash = GoMapHash.mix($hash, TextRange__from_core.$hash($source.loc));
            return $hash;
        }
        declare private readonly then?: never;
    }
    class $goMap$MapOf_Named_declarationKey_To_Struct_void extends GoMapValue<declarationKey, GoEmptyStruct> {
        private constructor(private readonly zeroValue: GoEmptyStruct, private readonly buckets: Map<number, [
            declarationKey,
            GoEmptyStruct
        ][]> | undefined, private count: number) {
            super();
        }
        private static $zeroValue(): GoEmptyStruct {
            return GoEmptyStruct.$zero();
        }
        private static $hash($key: declarationKey): number {
            return declarationKey.$hash($key);
        }
        private static $equal($left: declarationKey, $right: declarationKey): boolean {
            return declarationKey.$equal($left, $right);
        }
        private static $copyKey($key: declarationKey): declarationKey {
            return declarationKey.$copy($key);
        }
        private static $copyValue($value: GoEmptyStruct): GoEmptyStruct {
            return (void GoEmptyStruct.$copy,
                $value);
        }
        static nil(): $goMap$MapOf_Named_declarationKey_To_Struct_void {
            return new $goMap$MapOf_Named_declarationKey_To_Struct_void($goMap$MapOf_Named_declarationKey_To_Struct_void.$zeroValue(), undefined, 0);
        }
        static make(size: number | bigint, entries: [
            declarationKey,
            GoEmptyStruct
        ][]): $goMap$MapOf_Named_declarationKey_To_Struct_void {
            const result: $goMap$MapOf_Named_declarationKey_To_Struct_void = new $goMap$MapOf_Named_declarationKey_To_Struct_void($goMap$MapOf_Named_declarationKey_To_Struct_void.$zeroValue(), new Map<number, [
                declarationKey,
                GoEmptyStruct
            ][]>, 0);
            for (const entry of entries) {
                result.store(entry[0], entry[1]);
            }
            return result;
        }
        private $find(key: declarationKey): [
            [
                declarationKey,
                GoEmptyStruct
            ],
            [
                declarationKey,
                GoEmptyStruct
            ][],
            number
        ] | undefined {
            const buckets = this.buckets;
            if (buckets === undefined) {
                return undefined;
            }
            const bucket = buckets.get($goMap$MapOf_Named_declarationKey_To_Struct_void.$hash(key));
            if (bucket === undefined) {
                return undefined;
            }
            let index = 0;
            for (const entry of bucket) {
                if ($goMap$MapOf_Named_declarationKey_To_Struct_void.$equal(entry[0], key)) {
                    return [entry, bucket, index];
                }
                index++;
            }
            return undefined;
        }
        lookup(key: declarationKey): GoEmptyStruct {
            const found: [
                [
                    declarationKey,
                    GoEmptyStruct
                ],
                [
                    declarationKey,
                    GoEmptyStruct
                ][],
                number
            ] | undefined = this.$find(key);
            return $goMap$MapOf_Named_declarationKey_To_Struct_void.$copyValue(found === undefined ? this.zeroValue : found[0][1]);
        }
        lookupOk(key: declarationKey): [
            GoEmptyStruct,
            boolean
        ] {
            const found: [
                [
                    declarationKey,
                    GoEmptyStruct
                ],
                [
                    declarationKey,
                    GoEmptyStruct
                ][],
                number
            ] | undefined = this.$find(key);
            if (found === undefined) {
                return [$goMap$MapOf_Named_declarationKey_To_Struct_void.$copyValue(this.zeroValue), false];
            }
            return [$goMap$MapOf_Named_declarationKey_To_Struct_void.$copyValue(found[0][1]), true];
        }
        store(key: declarationKey, value: GoEmptyStruct): void {
            const buckets: Map<number, [
                declarationKey,
                GoEmptyStruct
            ][]> | undefined = this.buckets;
            if (buckets === undefined) {
                GoPanic.raiseRuntime("assignment to entry in nil map");
            }
            const hash: number = $goMap$MapOf_Named_declarationKey_To_Struct_void.$hash(key);
            let bucket: [
                declarationKey,
                GoEmptyStruct
            ][] | undefined = buckets.get(hash);
            if (bucket === undefined) {
                bucket = [];
                buckets.set(hash, bucket);
            }
            for (const entry of bucket) {
                if ($goMap$MapOf_Named_declarationKey_To_Struct_void.$equal(entry[0], key)) {
                    entry[1] = $goMap$MapOf_Named_declarationKey_To_Struct_void.$copyValue(value);
                    return;
                }
            }
            bucket.push([$goMap$MapOf_Named_declarationKey_To_Struct_void.$copyKey(key), $goMap$MapOf_Named_declarationKey_To_Struct_void.$copyValue(value)]);
            this.count++;
        }
        delete(key: declarationKey): void {
            const found: [
                [
                    declarationKey,
                    GoEmptyStruct
                ],
                [
                    declarationKey,
                    GoEmptyStruct
                ][],
                number
            ] | undefined = this.$find(key);
            if (found === undefined) {
                return;
            }
            found[1].splice(found[2], 1);
            if (found[1].length === 0) {
                if (!(this.buckets === undefined)) {
                    this.buckets.delete($goMap$MapOf_Named_declarationKey_To_Struct_void.$hash(key));
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
        keys(): declarationKey[] {
            const result: declarationKey[] = [];
            const buckets: Map<number, [
                declarationKey,
                GoEmptyStruct
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
    function Set$AddIfAbsent$Named_declarationKey($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<declarationKey>> | undefined, $argument1: declarationKey): bool {
        return Set__from_collections.AddIfAbsent$kernel<declarationKey>($argument0, ($argument0: declarationKey): declarationKey => {
            return declarationKey.$copy($argument0);
        }, ($argument0: GoEmptyStruct): GoMapValue<declarationKey, GoEmptyStruct> => {
            return $goMap$MapOf_Named_declarationKey_To_Struct_void.make(0, []);
        }, $argument1);
    }
    let seen = Set__from_collections.$zero<declarationKey>((): GoMapValue<declarationKey, GoEmptyStruct> => {
        return $goMap$MapOf_Named_declarationKey_To_Struct_void.nil();
    });
    const seen$location = tsonicTypeScriptRuntime.boundLocation({}, () => seen, seen$next => seen = seen$next);
    let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, nodes.length, void 0);
    const __gotots_range_0 = nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (node === undefined) {
            continue;
        }
        let fileName = SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(node));
        let key = new declarationKey(fileName, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        if (!Set$AddIfAbsent$Named_declarationKey(seen$location, declarationKey.$copy(key))) {
            continue;
        }
        result = result.append(void 0, [node]);
    }
    return result;
}
export function findClosestDeclarationNode(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, pos);
    for (let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node; !(current === undefined); current = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) {
        if (IsDeclaration__from_ast(current) || Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast()) {
            return current;
        }
    }
    return getSourceDefinitionEntryNode(sourceFile);
}
