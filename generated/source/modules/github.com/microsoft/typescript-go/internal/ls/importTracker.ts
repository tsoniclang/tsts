import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, FileReference as FileReference__from_ast, ImportClause as ImportClause__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { BinaryExpression as BinaryExpression__from_ast, FindAncestor as FindAncestor__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetFirstIdentifier as GetFirstIdentifier__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, ImportFromModuleSpecifier as ImportFromModuleSpecifier__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCatchClause as IsCatchClause__from_ast, IsDefaultImport as IsDefaultImport__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExportSpecifier as IsExportSpecifier__from_ast, IsExternalModuleAugmentation as IsExternalModuleAugmentation__from_ast, IsExternalModuleReference as IsExternalModuleReference__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImplicitlyExportedJSDocDeclaration as IsImplicitlyExportedJSDocDeclaration__from_ast, IsImportCall as IsImportCall__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsImportTypeNode as IsImportTypeNode__from_ast, IsInJSFile as IsInJSFile__from_ast, IsJSDocCallbackTag as IsJSDocCallbackTag__from_ast, IsJSDocImportTag as IsJSDocImportTag__from_ast, IsJSDocTypedefTag as IsJSDocTypedefTag__from_ast, IsModuleBlock as IsModuleBlock__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsModuleExportsAccessExpression as IsModuleExportsAccessExpression__from_ast, IsNamedExports as IsNamedExports__from_ast, IsNamespaceExport as IsNamespaceExport__from_ast, IsNamespaceImport as IsNamespaceImport__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsSourceFile as IsSourceFile__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsVariableDeclarationInitializedToBareOrAccessedRequire as IsVariableDeclarationInitializedToBareOrAccessedRequire__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, IsVariableStatement as IsVariableStatement__from_ast, JSDeclarationKindModuleExports$constant as JSDeclarationKindModuleExports$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, SymbolName as SymbolName__from_ast, Symbol as Symbol__from_ast, WalkUpBindingElementsAndPatterns as WalkUpBindingElementsAndPatterns__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, IsExternalModuleSymbol as IsExternalModuleSymbol__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { Assert as Assert__from_debug, FailBadSyntaxKind as FailBadSyntaxKind__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { IfElse$Named_ls$ExportKind } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { OrElse$PointerTo_Named_ast$Node, OrElse$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/OrElse.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Symbol_To_SliceOf_PointerTo_Named_ast$Node as GoMap } from "../../../../../../support/maps.js";
import { getPropertySymbolOfObjectBindingPatternWithoutPropertyName, isSourceFileWithGlobalExports, nodeSeenTracker } from "./utilities.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type ImpExpKind = int32;
export function ImpExpKindUnknown$constant(): ImpExpKind {
    return 0;
}
export function ImpExpKindImport$constant(): ImpExpKind {
    return 1;
}
export function ImpExpKindExport$constant(): ImpExpKind {
    return 2;
}
export class ImportExportSymbol {
    declare private readonly $goType: void;
    public constructor(public kind: ImpExpKind, public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public exportInfo: ExportInfo | undefined) {
    }
    declare private readonly then?: never;
}
export class ExportKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ExportKindNamed$constant(): ExportKind {
    return new ExportKind(0);
}
export function ExportKindDefault$constant(): ExportKind {
    return new ExportKind(1);
}
export function ExportKindExportEquals$constant(): ExportKind {
    return new ExportKind(2);
}
export class ExportInfo {
    declare private readonly $goType: void;
    public constructor(public exportingModuleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public exportKind: ExportKind) {
    }
    declare private readonly then?: never;
}
export type LocationAndSymbol$Storage = {
    importLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    importSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class LocationAndSymbol {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: LocationAndSymbol$Storage) {
    }
    public static $storageOf($source: LocationAndSymbol): LocationAndSymbol$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: LocationAndSymbol$Storage): LocationAndSymbol {
        return new LocationAndSymbol($source);
    }
    public get importLocation(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.importLocation;
    }
    public set importLocation($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.importLocation = $value;
    }
    public get importSymbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.importSymbol;
    }
    public set importSymbol($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.importSymbol = $value;
    }
    static $copy($source: LocationAndSymbol): LocationAndSymbol {
        return new LocationAndSymbol({
            importLocation: $source.$storage.importLocation,
            importSymbol: $source.$storage.importSymbol
        });
    }
    static $zeroStorage(): LocationAndSymbol$Storage {
        return {
            importLocation: void 0,
            importSymbol: void 0
        };
    }
    declare private readonly then?: never;
}
export class ImportsResult {
    declare private readonly $goType: void;
    public constructor(public importSearches: RuntimeSlice<LocationAndSymbol$Storage>, public singleReferences: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public indirectUsers: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
}
export class ImportTracker {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: ExportInfo | undefined, $2: bool) => ImportsResult | undefined) | undefined) {
    }
    declare private readonly then?: never;
}
export type ModuleReferenceKind = int32;
export function ModuleReferenceKindImport$constant(): ModuleReferenceKind {
    return 0;
}
export function ModuleReferenceKindReference$constant(): ModuleReferenceKind {
    return 1;
}
export function ModuleReferenceKindImplicit$constant(): ModuleReferenceKind {
    return 2;
}
export type ModuleReference$Storage = {
    kind: int32;
    literal: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    referencingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    ref: {
        value: FileReference__from_ast;
    } | undefined;
};
export class ModuleReference implements GoContainerStoredValue<ModuleReference$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ModuleReference$Storage) {
    }
    public static $storageOf($source: ModuleReference): ModuleReference$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ModuleReference$Storage): ModuleReference {
        return new ModuleReference($source);
    }
    public get kind(): ModuleReferenceKind {
        return this.$storage.kind;
    }
    public set kind($value: ModuleReferenceKind) {
        this.$storage.kind = $value;
    }
    public get literal(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.literal;
    }
    public set literal($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.literal = $value;
    }
    public get referencingFile(): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return this.$storage.referencingFile;
    }
    public set referencingFile($value: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
        this.$storage.referencingFile = $value;
    }
    public get ref(): {
        value: FileReference__from_ast;
    } | undefined {
        return this.$storage.ref;
    }
    public set ref($value: {
        value: FileReference__from_ast;
    } | undefined) {
        this.$storage.ref = $value;
    }
    declare readonly [$goContainerStorageType]: ModuleReference$Storage;
    static $copy($source: ModuleReference): ModuleReference {
        return new ModuleReference({
            kind: $source.$storage.kind,
            literal: $source.$storage.literal,
            referencingFile: $source.$storage.referencingFile,
            ref: $source.$storage.ref
        });
    }
    static $zeroStorage(): ModuleReference$Storage {
        return {
            kind: 0,
            literal: void 0,
            referencingFile: void 0,
            ref: void 0
        };
    }
    declare private readonly then?: never;
}
export function createImportTracker(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, sourceFilesSet: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): ImportTracker {
    let allDirectImports: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> = getDirectImportsMap(ctx, program, sourceFiles, checker__shadow_1);
    return new ImportTracker((exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportInfo: ExportInfo | undefined, isForRename: bool): ImportsResult | undefined => {
        const __gotots_results_1 = getImportersForExport(sourceFiles, sourceFilesSet, allDirectImports, exportInfo, checker__shadow_1);
        let directImports = __gotots_results_1[0];
        let indirectUsers = __gotots_results_1[1];
        const __gotots_results_2 = getSearchesFromDirectImports(directImports, exportSymbol, (exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportKind, checker__shadow_1, isForRename);
        let importSearches = __gotots_results_2[0];
        let singleReferences = __gotots_results_2[1];
        return new ImportsResult(importSearches, singleReferences, indirectUsers);
    });
}
export function getDirectImportsMap(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> {
    let result: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> = GoMap.make(0, []);
    const __gotots_range_6 = sourceFiles;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_6;
        const __gotots_receiver_0 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined)) {
            return result;
        }
        forEachImport(program, sourceFile, (importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            {
                let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, moduleSpecifier);
                if (!(moduleSymbol === undefined)) {
                    result.store(moduleSymbol, result.lookup(moduleSymbol).append(void 0, [importDecl]));
                }
            }
        });
    }
    return result;
}
export function forEachImport(program: {
    value: Program__from_compiler;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, action: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
    let implicitImports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_results_0 = Program__from_compiler.GetJSXRuntimeImportSpecifier(program, SourceFile__from_ast.Path(sourceFile));
    let jsxSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[1];
    if (!(jsxSpecifier === undefined)) {
        implicitImports = implicitImports.append(void 0, [jsxSpecifier]);
    }
    let importHelpersSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Program__from_compiler.GetImportHelpersImportSpecifier(program, SourceFile__from_ast.Path(sourceFile));
    if (!(importHelpersSpecifier === undefined)) {
        implicitImports = implicitImports.append(void 0, [importHelpersSpecifier]);
    }
    if (!(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined) || SourceFile__from_ast.Imports(sourceFile).length + implicitImports.length !== 0) {
        const __gotots_range_3 = SourceFile__from_ast.Imports(sourceFile);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let i: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            const __gotots_callee_0 = action;
            const __gotots_argument_0 = ImportFromModuleSpecifier__from_ast(i);
            const __gotots_argument_1 = i;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
        }
        const __gotots_range_4 = implicitImports;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let i: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            const __gotots_callee_1 = action;
            const __gotots_argument_2 = ImportFromModuleSpecifier__from_ast(i);
            const __gotots_argument_3 = i;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
        }
    }
    else {
        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_8 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_9 = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindExportDeclaration$constant__from_ast():
                case KindImportDeclaration$constant__from_ast():
                case KindJSImportDeclaration$constant__from_ast(): {
                    {
                        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ModuleSpecifier(node);
                        if (!(specifier === undefined) && IsStringLiteral__from_ast(specifier)) {
                            const __gotots_callee_2 = action;
                            const __gotots_argument_4 = node;
                            const __gotots_argument_5 = specifier;
                            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
                        }
                    }
                    break;
                }
                case KindImportEqualsDeclaration$constant__from_ast(): {
                    if (isExternalModuleImportEquals(node)) {
                        const __gotots_callee_3 = action;
                        const __gotots_argument_6 = node;
                        const __gotots_argument_7 = Node__from_ast.Expression((Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
                        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
                    }
                    break;
                }
            }
            return false;
        };
        forEachPossibleImportOrExportStatement(__gotots_argument_8, __gotots_argument_9);
    }
}
export function forEachPossibleImportOrExportStatement(sourceFileLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, action: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    const __gotots_range_5 = getStatementsOfSourceFileLike(sourceFileLike);
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        const __gotots_callee_4 = action;
        const __gotots_argument_10 = statement;
        if ((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10) || isAmbientModuleDeclaration(statement) && forEachPossibleImportOrExportStatement(statement, action)) {
            return true;
        }
    }
    return false;
}
export function getSourceFileLikeForImportDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsCallExpression__from_ast(node) || IsJSDocImportTag__from_ast(node)) {
        const __gotots_store_3 = NodeBase__from_ast.$storageOf(((GetSourceFileOfNode__from_ast(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (IsSourceFile__from_ast(parent)) {
        return parent;
    }
    Assert__from_debug(IsModuleBlock__from_ast(parent) && isAmbientModuleDeclaration(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
}
export function isAmbientModuleDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsModuleDeclaration__from_ast(node) && IsStringLiteral__from_ast(Node__from_ast.Name(node));
}
export function getStatementsOfSourceFileLike(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsSourceFile__from_ast(node)) {
        return Node__from_ast.Statements(node);
    }
    {
        let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(node);
        if (!(body === undefined)) {
            return Node__from_ast.Statements(body);
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
export function getImportersForExport(sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, sourceFilesSet: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, allDirectImports: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, exportInfo: ExportInfo | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>
] {
    let directImports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let indirectUserDeclarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let markSeenDirectImport: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = nodeSeenTracker();
    let markSeenIndirectUser: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = nodeSeenTracker();
    let isAvailableThroughGlobal = isSourceFileWithGlobalExports(Symbol__from_ast.$storageOf((((exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportingModuleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
    let getDirectImports: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) | undefined = (moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return allDirectImports.lookup(moduleSymbol);
    };
    let addIndirectUser: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: bool) => void) | undefined;
    addIndirectUser = (sourceFileLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, addTransitiveDependencies: bool): void => {
        if (isAvailableThroughGlobal) {
            return;
        }
        const __gotots_callee_5 = markSeenIndirectUser;
        const __gotots_argument_11 = sourceFileLike;
        if (!(__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11)) {
            return;
        }
        indirectUserDeclarations = indirectUserDeclarations.append(void 0, [sourceFileLike]);
        if (!addTransitiveDependencies) {
            return;
        }
        let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol(checker__shadow_1, Node__from_ast.Symbol(sourceFileLike));
        if (moduleSymbol === undefined) {
            return;
        }
        Assert__from_debug(!((Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        const __gotots_callee_6 = getDirectImports;
        const __gotots_argument_12 = moduleSymbol;
        const __gotots_range_7 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let directImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
            if (!IsImportTypeNode__from_ast(directImport)) {
                const __gotots_callee_7 = addIndirectUser;
                const __gotots_argument_13 = getSourceFileLikeForImportDeclaration(directImport);
                const __gotots_argument_14 = true;
                (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14);
            }
        }
    };
    let isExported: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: bool) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, stopAtAmbientModule: bool): bool => {
        for (; !(node === undefined) && !(stopAtAmbientModule && isAmbientModuleDeclaration(node));) {
            if (HasSyntacticModifier__from_ast(node, ModifierFlagsExport$constant__from_ast())) {
                return true;
            }
            node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        return false;
    };
    let handleImportCall: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (importCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        let top: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(importCall, isAmbientModuleDeclaration);
        if (top === undefined) {
            const __gotots_store_1 = NodeBase__from_ast.$storageOf(((GetSourceFileOfNode__from_ast(importCall) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            top = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_callee_9 = addIndirectUser;
        const __gotots_argument_17 = top;
        const __gotots_callee_8 = isExported;
        const __gotots_argument_15 = importCall;
        const __gotots_argument_16 = true;
        const __gotots_argument_18 = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16);
        (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18);
    };
    let handleNamespaceImport: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: bool, $3: bool) => void) | undefined = (importDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isReExport: bool, alreadyAddedDirect: bool): void => {
        if ((exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportKind.$value === ExportKindExportEquals$constant().$value) {
            if (!alreadyAddedDirect) {
                directImports = directImports.append(void 0, [importDeclaration]);
            }
        }
        else if (!isAvailableThroughGlobal) {
            let sourceFileLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getSourceFileLikeForImportDeclaration(importDeclaration);
            Assert__from_debug(IsSourceFile__from_ast(sourceFileLike) || IsModuleDeclaration__from_ast(sourceFileLike), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            const __gotots_callee_10 = addIndirectUser;
            const __gotots_argument_19 = sourceFileLike;
            const __gotots_argument_20 = isReExport || findNamespaceReExports(sourceFileLike, name, checker__shadow_1);
            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20);
        }
    };
    let handleDirectImports: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined;
    handleDirectImports = (exportingModuleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void => {
        const __gotots_callee_11 = getDirectImports;
        const __gotots_argument_21 = exportingModuleSymbol;
        let theseDirectImports = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21);
        const __gotots_range_8 = theseDirectImports;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
            let direct: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            const __gotots_callee_12 = markSeenDirectImport;
            const __gotots_argument_22 = direct;
            if (!(__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22)) {
                continue;
            }
            switch (Node__from_ast.$storageOf(((direct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindCallExpression$constant__from_ast(): {
                    if (IsImportCall__from_ast(direct)) {
                        const __gotots_callee_13 = handleImportCall;
                        const __gotots_argument_23 = direct;
                        (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
                    }
                    else if (!isAvailableThroughGlobal) {
                        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((direct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        if ((exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportKind.$value === ExportKindExportEquals$constant().$value && IsVariableDeclaration__from_ast(parent)) {
                            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(parent);
                            if (IsIdentifier__from_ast(name)) {
                                directImports = directImports.append(void 0, [name]);
                            }
                        }
                    }
                    break;
                }
                case KindIdentifier$constant__from_ast(): {
                    break;
                }
                case KindImportEqualsDeclaration$constant__from_ast(): {
                    const __gotots_callee_14 = handleNamespaceImport;
                    const __gotots_argument_24 = direct;
                    const __gotots_argument_25 = Node__from_ast.Name(direct);
                    const __gotots_argument_26 = HasSyntacticModifier__from_ast(direct, ModifierFlagsExport$constant__from_ast());
                    const __gotots_argument_27 = false;
                    (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
                    break;
                }
                case KindImportDeclaration$constant__from_ast():
                case KindJSImportDeclaration$constant__from_ast():
                case KindJSDocImportTag$constant__from_ast(): {
                    directImports = directImports.append(void 0, [direct]);
                    {
                        let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ImportClause(direct);
                        if (!(importClause === undefined)) {
                            {
                                let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
                                if (!(namedBindings === undefined) && IsNamespaceImport__from_ast(namedBindings)) {
                                    const __gotots_callee_15 = handleNamespaceImport;
                                    const __gotots_argument_28 = direct;
                                    const __gotots_argument_29 = Node__from_ast.Name(namedBindings);
                                    const __gotots_argument_30 = false;
                                    const __gotots_argument_31 = true;
                                    (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31);
                                    break;
                                }
                            }
                        }
                    }
                    if (!isAvailableThroughGlobal && IsDefaultImport__from_ast(direct)) {
                        const __gotots_callee_16 = addIndirectUser;
                        const __gotots_argument_32 = getSourceFileLikeForImportDeclaration(direct);
                        const __gotots_argument_33 = false;
                        (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32, __gotots_argument_33);
                    }
                    break;
                }
                case KindExportDeclaration$constant__from_ast(): {
                    let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsExportDeclaration(direct) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                    if (exportClause === undefined) {
                        const __gotots_callee_17 = handleDirectImports;
                        const __gotots_argument_34 = getContainingModuleSymbol(direct, checker__shadow_1);
                        (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_34);
                    }
                    else if (IsNamespaceExport__from_ast(exportClause)) {
                        const __gotots_callee_18 = addIndirectUser;
                        const __gotots_argument_35 = getSourceFileLikeForImportDeclaration(direct);
                        const __gotots_argument_36 = true;
                        (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35, __gotots_argument_36);
                    }
                    else {
                        directImports = directImports.append(void 0, [direct]);
                    }
                    break;
                }
                case KindImportType$constant__from_ast(): {
                    let __gotots_logical_result_0 = !isAvailableThroughGlobal && (Node__from_ast.AsImportTypeNode(direct) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf && (Node__from_ast.AsImportTypeNode(direct) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier === undefined;
                    if (__gotots_logical_result_0) {
                        const __gotots_callee_19 = isExported;
                        const __gotots_argument_37 = direct;
                        const __gotots_argument_38 = false;
                        __gotots_logical_result_0 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37, __gotots_argument_38);
                    }
                    if (__gotots_logical_result_0) {
                        const __gotots_callee_20 = addIndirectUser;
                        const __gotots_store_2 = NodeBase__from_ast.$storageOf(((GetSourceFileOfNode__from_ast(direct) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                        const __gotots_argument_39 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        const __gotots_argument_40 = true;
                        (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39, __gotots_argument_40);
                    }
                    directImports = directImports.append(void 0, [direct]);
                    break;
                }
                default: {
                    FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(direct), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Unexpected import kind.")]));
                    break;
                }
            }
        }
    };
    let getIndirectUsers: (() => RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>) | undefined = (): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        if (isAvailableThroughGlobal) {
            return sourceFiles;
        }
        const __gotots_range_9 = Symbol__from_ast.$storageOf((((exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportingModuleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
            const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
            if (IsExternalModuleAugmentation__from_ast(decl) && Set__from_collections.Has<gostring>(sourceFilesSet, SourceFile__from_ast.FileName(GetSourceFileOfNode__from_ast(decl)))) {
                const __gotots_callee_21 = addIndirectUser;
                const __gotots_argument_41 = decl;
                const __gotots_argument_42 = false;
                (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41, __gotots_argument_42);
            }
        }
        return Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$SourceFile(indirectUserDeclarations, GetSourceFileOfNode__from_ast);
    };
    const __gotots_callee_22 = handleDirectImports;
    const __gotots_argument_43 = (exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportingModuleSymbol;
    (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43);
    const __gotots_results_3 = directImports;
    const __gotots_callee_23 = getIndirectUsers;
    const __gotots_results_4 = (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))();
    return [__gotots_results_3, __gotots_results_4];
}
export function getContainingModuleSymbol(importer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return Checker__from_checker.GetMergedSymbol(checker__shadow_1, Node__from_ast.Symbol(getSourceFileLikeForImportDeclaration(importer)));
}
export function findNamespaceReExports(sourceFileLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): bool {
    let namespaceImportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, name);
    return forEachPossibleImportOrExportStatement(sourceFileLike, (statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (!IsExportDeclaration__from_ast(statement)) {
            return false;
        }
        let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsExportDeclaration(statement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
        let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ModuleSpecifier(statement);
        return moduleSpecifier === undefined && !(exportClause === undefined) && IsNamedExports__from_ast(exportClause) && Some$PointerTo_Named_ast$Node(Node__from_ast.Elements(exportClause), (element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetExportSpecifierLocalTargetSymbol(checker__shadow_1, element), namespaceImportSymbol);
        });
    });
}
export function getSearchesFromDirectImports(directImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportKind: ExportKind, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined, isForRename: bool): [
    RuntimeSlice<LocationAndSymbol$Storage>,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>
] {
    let importSearches = RuntimeSlice.nil<LocationAndSymbol$Storage>();
    let singleReferences = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let addSearch: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined = (location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void => {
        const __gotots_slice_build_16 = importSearches;
        const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
        let __gotots_slice_build_17 = __gotots_slice_build_16;
        if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
            __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
            __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void LocationAndSymbol.$storageOf, (void LocationAndSymbol.$fromStorage,
                {
                    importLocation: location,
                    importSymbol: __go_symbol
                })));
        }
        else {
            __gotots_slice_build_17 = goSliceAllocate<LocationAndSymbol$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                __gotots_slice_build_17.set(__gotots_slice_build_19, LocationAndSymbol.$storageOf(LocationAndSymbol.$copy(LocationAndSymbol.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
            }
            __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void LocationAndSymbol.$storageOf, (void LocationAndSymbol.$fromStorage,
                {
                    importLocation: location,
                    importSymbol: __go_symbol
                })));
            for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                __gotots_slice_build_17.$initialize(__gotots_slice_build_19, LocationAndSymbol.$zeroStorage());
            }
        }
        importSearches = __gotots_slice_build_17;
    };
    let isNameMatch: (($0: gostring) => bool) | undefined = (name: gostring): bool => {
        return name === Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name || !(exportKind.$value === ExportKindNamed$constant().$value) && name === InternalSymbolNameDefault$string__from_ast;
    };
    let handleNamespaceImportLike: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (importName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        let __gotots_logical_result_2 = exportKind.$value === ExportKindExportEquals$constant().$value;
        if (__gotots_logical_result_2) {
            let __gotots_logical_result_1 = !isForRename;
            if (!__gotots_logical_result_1) {
                const __gotots_callee_24 = isNameMatch;
                const __gotots_argument_44 = Node__from_ast.Text(importName);
                __gotots_logical_result_1 = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44);
            }
            __gotots_logical_result_2 = (__gotots_logical_result_1);
        }
        if (__gotots_logical_result_2) {
            const __gotots_callee_25 = addSearch;
            const __gotots_argument_45 = importName;
            const __gotots_argument_46 = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, importName);
            (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45, __gotots_argument_46);
        }
    };
    let searchForNamedImport: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        if (namedBindings === undefined) {
            return;
        }
        const __gotots_range_10 = Node__from_ast.Elements(namedBindings);
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_10 = __gotots_range_10.get(__gotots_range_index_10);
            let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(element);
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.PropertyName(element);
            const __gotots_callee_26 = isNameMatch;
            const __gotots_argument_47 = Node__from_ast.Text(OrElse$PointerTo_Named_ast$Node(propertyName, name));
            if (!(__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47)) {
                continue;
            }
            if (!(propertyName === undefined)) {
                singleReferences = singleReferences.append(void 0, [propertyName]);
                if (!isForRename || Node__from_ast.Text(name) === Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) {
                    const __gotots_callee_27 = addSearch;
                    const __gotots_argument_48 = name;
                    const __gotots_argument_49 = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, name);
                    (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48, __gotots_argument_49);
                }
            }
            else {
                let localSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
                if (IsExportSpecifier__from_ast(element) && !(Node__from_ast.PropertyName(element) === undefined)) {
                    localSymbol = Checker__from_checker.GetExportSpecifierLocalTargetSymbol(checker__shadow_1, element);
                }
                else {
                    localSymbol = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, name);
                }
                const __gotots_callee_28 = addSearch;
                const __gotots_argument_50 = name;
                const __gotots_argument_51 = localSymbol;
                (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_50, __gotots_argument_51);
            }
        }
    };
    let handleImport: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        if (IsImportEqualsDeclaration__from_ast(decl)) {
            if (isExternalModuleImportEquals(decl)) {
                const __gotots_callee_29 = handleNamespaceImportLike;
                const __gotots_argument_52 = Node__from_ast.Name(decl);
                (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52);
            }
            return;
        }
        if (IsIdentifier__from_ast(decl)) {
            const __gotots_callee_30 = handleNamespaceImportLike;
            const __gotots_argument_53 = decl;
            (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_53);
            return;
        }
        if (IsImportTypeNode__from_ast(decl)) {
            {
                let qualifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportTypeNode(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier;
                if (!(qualifier === undefined)) {
                    let firstIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast(qualifier);
                    if (Node__from_ast.Text(firstIdentifier) === SymbolName__from_ast(exportSymbol)) {
                        singleReferences = singleReferences.append(void 0, [firstIdentifier]);
                    }
                }
                else if (exportKind.$value === ExportKindExportEquals$constant().$value) {
                    singleReferences = singleReferences.append(void 0, [LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode((Node__from_ast.AsImportTypeNode(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal]);
                }
            }
            return;
        }
        if (!IsStringLiteral__from_ast(Node__from_ast.ModuleSpecifier(decl))) {
            return;
        }
        if (IsExportDeclaration__from_ast(decl)) {
            {
                let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsExportDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                if (!(exportClause === undefined) && IsNamedExports__from_ast(exportClause)) {
                    const __gotots_callee_31 = searchForNamedImport;
                    const __gotots_argument_54 = exportClause;
                    (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54);
                }
            }
            return;
        }
        {
            let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.ImportClause(decl);
            if (!(importClause === undefined)) {
                {
                    let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause(importClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
                    if (!(namedBindings === undefined)) {
                        switch (Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                            case KindNamespaceImport$constant__from_ast(): {
                                const __gotots_callee_32 = handleNamespaceImportLike;
                                const __gotots_argument_55 = Node__from_ast.Name(namedBindings);
                                (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55);
                                break;
                            }
                            case KindNamedImports$constant__from_ast(): {
                                if (exportKind.$value === ExportKindNamed$constant().$value || exportKind.$value === ExportKindDefault$constant().$value) {
                                    const __gotots_callee_33 = searchForNamedImport;
                                    const __gotots_argument_56 = namedBindings;
                                    (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56);
                                }
                                break;
                            }
                        }
                    }
                }
                {
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(importClause);
                    if (!(name === undefined) && (exportKind.$value === ExportKindDefault$constant().$value || exportKind.$value === ExportKindExportEquals$constant().$value) && (!isForRename || Node__from_ast.Text(name) === symbolNameNoDefault(exportSymbol))) {
                        let defaultImportAlias: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, name);
                        const __gotots_callee_34 = addSearch;
                        const __gotots_argument_57 = name;
                        const __gotots_argument_58 = defaultImportAlias;
                        (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57, __gotots_argument_58);
                    }
                }
            }
        }
    };
    const __gotots_range_11 = directImports;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
        const __gotots_range_value_11 = __gotots_range_11.get(__gotots_range_index_11);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
        const __gotots_callee_35 = handleImport;
        const __gotots_argument_59 = decl;
        (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59);
    }
    return [importSearches, singleReferences];
}
export function getImportOrExportSymbol(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined, comingFromExport: bool): ImportExportSymbol | undefined {
    let exportInfo: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: ExportKind) => ImportExportSymbol | undefined) | undefined = (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, kind: ExportKind): ImportExportSymbol | undefined => {
        {
            let exportInfo__shadow_1: ExportInfo | undefined = getExportInfo(__go_symbol__shadow_1, kind, checker__shadow_1);
            if (!(exportInfo__shadow_1 === undefined)) {
                return new ImportExportSymbol(ImpExpKindExport$constant(), __go_symbol__shadow_1, exportInfo__shadow_1);
            }
        }
        return void 0;
    };
    let getExport: (() => ImportExportSymbol | undefined) | undefined = (): ImportExportSymbol | undefined => {
        let getExportAssignmentExport: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => ImportExportSymbol | undefined) | undefined = (ex: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ImportExportSymbol | undefined => {
            if (Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(ex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) {
                return void 0;
            }
            let exportKind = IfElse$Named_ls$ExportKind((Node__from_ast.AsExportAssignment(ex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals, ExportKindExportEquals$constant(), ExportKindDefault$constant());
            return new ImportExportSymbol(ImpExpKindExport$constant(), __go_symbol, new ExportInfo(Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(ex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, exportKind));
        };
        let getExportKindForDeclaration: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => ExportKind) | undefined = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ExportKind => {
            if (HasSyntacticModifier__from_ast(node__shadow_1, ModifierFlagsDefault$constant__from_ast())) {
                return ExportKindDefault$constant();
            }
            return ExportKindNamed$constant();
        };
        let getSpecialPropertyExport: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: bool) => ImportExportSymbol | undefined) | undefined = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, useLhsSymbol: bool): ImportExportSymbol | undefined => {
            let kind = new ExportKind(0);
            switch (GetAssignmentDeclarationKind__from_ast(node__shadow_1).$value) {
                case 2: {
                    kind = ExportKindNamed$constant();
                    break;
                }
                case 1: {
                    kind = ExportKindExportEquals$constant();
                    break;
                }
                default: {
                    return void 0;
                    break;
                }
            }
            let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __go_symbol;
            if (useLhsSymbol) {
                sym = Node__from_ast.Symbol(node__shadow_1);
            }
            if (sym === undefined) {
                return void 0;
            }
            const __gotots_callee_36 = exportInfo;
            const __gotots_argument_60 = sym;
            const __gotots_argument_61 = kind;
            return (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60, __gotots_argument_61);
        };
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        let grandparent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol === undefined)) {
            if (IsPropertyAccessExpression__from_ast(parent)) {
                if (IsBinaryExpression__from_ast(grandparent) && Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, parent)) {
                    const __gotots_callee_37 = getSpecialPropertyExport;
                    const __gotots_argument_62 = grandparent;
                    const __gotots_argument_63 = false;
                    return (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62, __gotots_argument_63);
                }
                return void 0;
            }
            const __gotots_callee_39 = exportInfo;
            const __gotots_argument_65 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol;
            const __gotots_callee_38 = getExportKindForDeclaration;
            const __gotots_argument_64 = parent;
            const __gotots_argument_66 = (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_64);
            return (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_65, __gotots_argument_66);
        }
        else {
            let exportNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getExportNode(parent, node);
            __gotots_control_target_0: {
                if (!(exportNode === undefined) && (HasSyntacticModifier__from_ast(exportNode, ModifierFlagsExport$constant__from_ast()) || IsImplicitlyExportedJSDocDeclaration__from_ast(exportNode))) {
                    if (IsImportEqualsDeclaration__from_ast(exportNode) &&
                        tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsImportEqualsDeclaration(exportNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, node)) {
                        if (comingFromExport) {
                            return void 0;
                        }
                        let lhsSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, Node__from_ast.Name(exportNode));
                        return new ImportExportSymbol(ImpExpKindImport$constant(), lhsSymbol, void 0);
                    }
                    const __gotots_callee_41 = exportInfo;
                    const __gotots_argument_68 = __go_symbol;
                    const __gotots_callee_40 = getExportKindForDeclaration;
                    const __gotots_argument_67 = exportNode;
                    const __gotots_argument_69 = (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_67);
                    return (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68, __gotots_argument_69);
                }
                else if (IsNamespaceExport__from_ast(parent)) {
                    const __gotots_callee_42 = exportInfo;
                    const __gotots_argument_70 = __go_symbol;
                    const __gotots_argument_71 = ExportKindNamed$constant();
                    return (__gotots_callee_42 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_70, __gotots_argument_71);
                }
                else if (IsExportAssignment__from_ast(parent)) {
                    const __gotots_callee_43 = getExportAssignmentExport;
                    const __gotots_argument_72 = parent;
                    return (__gotots_callee_43 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_72);
                }
                else if (IsExportAssignment__from_ast(grandparent)) {
                    const __gotots_callee_44 = getExportAssignmentExport;
                    const __gotots_argument_73 = grandparent;
                    return (__gotots_callee_44 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_73);
                }
                else if (IsBinaryExpression__from_ast(parent)) {
                    const __gotots_callee_45 = getSpecialPropertyExport;
                    const __gotots_argument_74 = parent;
                    const __gotots_argument_75 = true;
                    return (__gotots_callee_45 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_74, __gotots_argument_75);
                }
                else if (IsBinaryExpression__from_ast(grandparent)) {
                    const __gotots_callee_46 = getSpecialPropertyExport;
                    const __gotots_argument_76 = grandparent;
                    const __gotots_argument_77 = true;
                    return (__gotots_callee_46 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_76, __gotots_argument_77);
                }
                else if (IsJSDocTypedefTag__from_ast(parent) || IsJSDocCallbackTag__from_ast(parent)) {
                    const __gotots_callee_47 = exportInfo;
                    const __gotots_argument_78 = __go_symbol;
                    const __gotots_argument_79 = ExportKindNamed$constant();
                    return (__gotots_callee_47 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78, __gotots_argument_79);
                }
            }
        }
        return void 0;
    };
    let getImport: (() => ImportExportSymbol | undefined) | undefined = (): ImportExportSymbol | undefined => {
        if (!isNodeImport(node)) {
            return void 0;
        }
        let importedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
            importedSymbol = Checker__from_checker.GetImmediateAliasedSymbol(checker__shadow_1, __go_symbol);
        }
        else {
            importedSymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(__go_symbol, checker__shadow_1);
        }
        if (importedSymbol === undefined) {
            return void 0;
        }
        importedSymbol = skipExportSpecifierSymbol(importedSymbol, checker__shadow_1);
        if (importedSymbol === undefined) {
            return void 0;
        }
        if (Symbol__from_ast.$storageOf(((importedSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === "export=") {
            importedSymbol = getExportEqualsLocalSymbol(importedSymbol, checker__shadow_1);
            if (importedSymbol === undefined) {
                return void 0;
            }
        }
        let importedName = symbolNameNoDefault(importedSymbol);
        if (importedName === "" || importedName === InternalSymbolNameDefault$string__from_ast || importedName === Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) {
            return new ImportExportSymbol(ImpExpKindImport$constant(), importedSymbol, void 0);
        }
        return void 0;
    };
    const __gotots_callee_48 = getExport;
    let result: ImportExportSymbol | undefined = (__gotots_callee_48 ?? GoPanic.raiseRuntime("call of nil function"))();
    if (result === undefined && !comingFromExport) {
        const __gotots_callee_49 = getImport;
        result = (__gotots_callee_49 ?? GoPanic.raiseRuntime("call of nil function"))();
    }
    return result;
}
export function getExportInfo(exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportKind: ExportKind, c: {
    value: Checker__from_checker;
} | undefined): ExportInfo | undefined {
    if (!(Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
        let exportingModuleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol(c, Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent);
        if (IsExternalModuleSymbol__from_checker(exportingModuleSymbol)) {
            return new ExportInfo(exportingModuleSymbol, exportKind);
        }
    }
    return void 0;
}
export function getExportNode(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    __gotots_control_target_1: {
        if (IsVariableDeclaration__from_ast(parent)) {
            declaration = parent;
        }
        else if (IsBindingElement__from_ast(parent)) {
            declaration = WalkUpBindingElementsAndPatterns__from_ast(parent);
        }
    }
    if (!(declaration === undefined)) {
        if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(parent), node)
            && !IsCatchClause__from_ast(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsVariableStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        return void 0;
    }
    return parent;
}
export function isNodeImport(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportEqualsDeclaration$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(parent), node)
                && isExternalModuleImportEquals(parent);
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            return Node__from_ast.PropertyName(parent) === undefined;
            break;
        }
        case KindImportClause$constant__from_ast():
        case KindNamespaceImport$constant__from_ast(): {
            Assert__from_debug(tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(parent), node), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            return true;
            break;
        }
        case KindBindingElement$constant__from_ast(): {
            return IsInJSFile__from_ast(node) && IsVariableDeclarationInitializedToBareOrAccessedRequire__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
    }
    return false;
}
export function isExternalModuleImportEquals(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let moduleReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference;
    return IsExternalModuleReference__from_ast(moduleReference) && Node__from_ast.$storageOf(((Node__from_ast.Expression(moduleReference) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast();
}
export function skipExportSpecifierSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    const __gotots_range_13 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
        const __gotots_range_value_13 = __gotots_range_13.get(__gotots_range_index_13);
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
        __gotots_control_target_2: {
            if (IsExportSpecifier__from_ast(declaration) && Node__from_ast.PropertyName(declaration) === undefined && Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined) {
                return OrElse$PointerTo_Named_ast$Symbol(Checker__from_checker.GetExportSpecifierLocalTargetSymbol(checker__shadow_1, declaration), __go_symbol);
            }
            else if (IsPropertyAccessExpression__from_ast(declaration) && IsModuleExportsAccessExpression__from_ast(Node__from_ast.Expression(declaration)) && !IsPrivateIdentifier__from_ast(Node__from_ast.Name(declaration))) {
                return Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, declaration);
            }
            else if (IsShorthandPropertyAssignment__from_ast(declaration) && IsBinaryExpression__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && GetAssignmentDeclarationKind__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent).$value === JSDeclarationKindModuleExports$constant__from_ast().$value) {
                return Checker__from_checker.GetExportSpecifierLocalTargetSymbol(checker__shadow_1, Node__from_ast.Name(declaration));
            }
        }
    }
    return __go_symbol;
}
export function getExportEqualsLocalSymbol(importedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (!((Symbol__from_ast.$storageOf(((importedSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
        return Checker__from_checker.GetImmediateAliasedSymbol(checker__shadow_1, importedSymbol);
    }
    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((importedSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    Assert__from_debug(!(decl === undefined), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    __gotots_control_target_3: {
        if (IsExportAssignment__from_ast(decl)) {
            return Node__from_ast.Symbol(Node__from_ast.Expression(decl));
        }
        else if (IsBinaryExpression__from_ast(decl)) {
            return Node__from_ast.Symbol(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        }
        else if (IsSourceFile__from_ast(decl)) {
            return Node__from_ast.Symbol(decl);
        }
    }
    return void 0;
}
export function symbolNameNoDefault(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): gostring {
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name !== InternalSymbolNameDefault$string__from_ast) {
        return Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
    }
    const __gotots_range_12 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
        const __gotots_range_value_12 = __gotots_range_12.get(__gotots_range_index_12);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(decl);
        if (!(name === undefined) && IsIdentifier__from_ast(name)) {
            return Node__from_ast.Text(name);
        }
    }
    return "";
}
export function findModuleReferences(program: {
    value: Program__from_compiler;
} | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, searchModuleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): RuntimeSlice<ModuleReference$Storage> {
    let refs = RuntimeSlice.literal<ModuleReference$Storage>([]);
    const __gotots_range_0 = sourceFiles;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let referencingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
        let searchSourceFile: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((searchModuleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
        if (!(searchSourceFile === undefined) && Node__from_ast.$storageOf(((searchSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) {
            const __gotots_range_1 = ((referencingFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let ref: {
                    value: FileReference__from_ast;
                } | undefined = __gotots_range_value_1;
                if (tsonicTypeScriptRuntime.sameLocation(Program__from_compiler.GetSourceFileFromReference(program, referencingFile, ref), Node__from_ast.AsSourceFile(searchSourceFile))) {
                    const __gotots_slice_build_0 = refs;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindReference$constant(),
                                referencingFile: referencingFile,
                                ref: ref,
                                literal: void 0
                            })));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<ModuleReference$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, ModuleReference.$storageOf(ModuleReference.$copy(ModuleReference.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindReference$constant(),
                                referencingFile: referencingFile,
                                ref: ref,
                                literal: void 0
                            })));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, ModuleReference.$zeroStorage());
                        }
                    }
                    refs = __gotots_slice_build_1;
                }
            }
            const __gotots_range_2 = ((referencingFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let ref: {
                    value: FileReference__from_ast;
                } | undefined = __gotots_range_value_2;
                let referenced: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = Program__from_compiler.GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(program, ref, referencingFile);
                if (!(referenced === undefined) && ((referenced ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName === SourceFile__from_ast.FileName(Node__from_ast.AsSourceFile(searchSourceFile))) {
                    const __gotots_slice_build_4 = refs;
                    const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                    let __gotots_slice_build_5 = __gotots_slice_build_4;
                    if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                        __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                        __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindReference$constant(),
                                referencingFile: referencingFile,
                                ref: ref,
                                literal: void 0
                            })));
                    }
                    else {
                        __gotots_slice_build_5 = goSliceAllocate<ModuleReference$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                            __gotots_slice_build_5.set(__gotots_slice_build_7, ModuleReference.$storageOf(ModuleReference.$copy(ModuleReference.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                        }
                        __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindReference$constant(),
                                referencingFile: referencingFile,
                                ref: ref,
                                literal: void 0
                            })));
                        for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                            __gotots_slice_build_5.$initialize(__gotots_slice_build_7, ModuleReference.$zeroStorage());
                        }
                    }
                    refs = __gotots_slice_build_5;
                }
            }
        }
        forEachImport(program, referencingFile, (importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, moduleSpecifier);
            if (tsonicTypeScriptRuntime.sameLocation(moduleSymbol, searchModuleSymbol)) {
                if (NodeIsSynthesized__from_ast(importDecl)) {
                    const __gotots_slice_build_8 = refs;
                    const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
                    let __gotots_slice_build_9 = __gotots_slice_build_8;
                    if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                        __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                        __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindImplicit$constant(),
                                literal: moduleSpecifier,
                                referencingFile: referencingFile,
                                ref: void 0
                            })));
                    }
                    else {
                        __gotots_slice_build_9 = goSliceAllocate<ModuleReference$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                        for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                            __gotots_slice_build_9.set(__gotots_slice_build_11, ModuleReference.$storageOf(ModuleReference.$copy(ModuleReference.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                        }
                        __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindImplicit$constant(),
                                literal: moduleSpecifier,
                                referencingFile: referencingFile,
                                ref: void 0
                            })));
                        for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                            __gotots_slice_build_9.$initialize(__gotots_slice_build_11, ModuleReference.$zeroStorage());
                        }
                    }
                    refs = __gotots_slice_build_9;
                }
                else {
                    const __gotots_slice_build_12 = refs;
                    const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
                    let __gotots_slice_build_13 = __gotots_slice_build_12;
                    if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                        __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindImport$constant(),
                                literal: moduleSpecifier,
                                referencingFile: void 0,
                                ref: void 0
                            })));
                    }
                    else {
                        __gotots_slice_build_13 = goSliceAllocate<ModuleReference$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.set(__gotots_slice_build_15, ModuleReference.$storageOf(ModuleReference.$copy(ModuleReference.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                        }
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void ModuleReference.$storageOf, (void ModuleReference.$fromStorage,
                            {
                                kind: ModuleReferenceKindImport$constant(),
                                literal: moduleSpecifier,
                                referencingFile: void 0,
                                ref: void 0
                            })));
                        for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.$initialize(__gotots_slice_build_15, ModuleReference.$zeroStorage());
                        }
                    }
                    refs = __gotots_slice_build_13;
                }
            }
        });
    }
    return refs;
}
