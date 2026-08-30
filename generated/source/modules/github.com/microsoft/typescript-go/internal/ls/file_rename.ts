import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ObjectLiteralExpression as ObjectLiteralExpression__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Position$Storage as Position__from_lsproto$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsModuleWithStringLiteralName as IsModuleWithStringLiteralName__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsStringLiteral as IsStringLiteral__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PropertyAssignment as PropertyAssignment__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast, TryGetTextOfPropertyName as TryGetTextOfPropertyName__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewTextRange as NewTextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Tracker as Tracker__from_change } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/change/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { Position as Position__from_lsproto, Range as Range__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { ModuleSpecifierOptions as ModuleSpecifierOptions__from_modulespecifiers, UpdateModuleSpecifier as UpdateModuleSpecifier__from_modulespecifiers, UserPreferences as UserPreferences__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, EnsurePathIsNonModuleName as EnsurePathIsNonModuleName__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, NormalizePath as NormalizePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$Program, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class pathUpdater {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: gostring) => [
        gostring,
        bool
    ]) | undefined) {
    }
    declare private readonly then?: never;
}
export class toImport {
    declare private readonly $goType: void;
    public constructor(public newFileName: gostring, public updated: bool) {
    }
    declare private readonly then?: never;
}
export function updatePathsProperty(configFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, configDir: gostring, property: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, changeTracker: Tracker__from_change | undefined, oldToNew: pathUpdater, converters: {
    value: Converters__from_lsconv;
} | undefined, useCaseSensitiveFileNames: bool): bool {
    let elements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer]);
    if (IsArrayLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
        elements = Node__from_ast.Elements(PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
    }
    let foundExactMatch = false;
    const __gotots_range_1 = elements;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        foundExactMatch = tryUpdateConfigString(configFile, configDir, element, changeTracker, oldToNew, converters, useCaseSensitiveFileNames) || foundExactMatch;
    }
    return foundExactMatch;
}
export function tryUpdateConfigString(configFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, configDir: gostring, element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, changeTracker: Tracker__from_change | undefined, oldToNew: pathUpdater, converters: {
    value: Converters__from_lsconv;
} | undefined, useCaseSensitiveFileNames: bool): bool {
    if (!IsStringLiteral__from_ast(element)) {
        return false;
    }
    let elementFileName = NormalizePath__from_tspath(CombinePaths__from_tspath(configDir, RuntimeSlice.literal<gostring>([Node__from_ast.Text(element)])));
    const __gotots_callee_1 = oldToNew.$value;
    const __gotots_argument_2 = elementFileName;
    const __gotots_results_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
    let updated = __gotots_results_1[0];
    let ok = __gotots_results_1[1];
    if (!ok) {
        return false;
    }
    Tracker__from_change.ReplaceRangeWithText(changeTracker, configFile, Range__from_lsproto.$fromStorage({
        Start: Position__from_lsproto.$storageOf(Converters__from_lsconv.PositionToLineAndCharacter(converters, new GoInterfaceAdapter(configFile), GetTokenPosOfNode__from_scanner(element, configFile, false) + 1 | 0)),
        End: Position__from_lsproto.$storageOf(Converters__from_lsconv.PositionToLineAndCharacter(converters, new GoInterfaceAdapter(configFile), Node__from_ast.End(element) - 1 | 0))
    }), relativePathFromDirectory(configDir, updated, useCaseSensitiveFileNames));
    return true;
}
export function getSourceFileToImport(program: {
    value: Program__from_compiler;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, importLiteral: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, oldToNew: pathUpdater): toImport | undefined {
    {
        let resolved: ResolvedModule__from___go_module | undefined = Program__from_compiler.GetResolvedModuleFromModuleSpecifier(program, new GoInterfaceAdapter(sourceFile), importLiteral);
        if (!(resolved === undefined) && (resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName !== "") {
            let oldFileName = (resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
            {
                const __gotots_callee_2 = oldToNew.$value;
                const __gotots_argument_3 = oldFileName;
                const __gotots_results_2 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                let newFileName = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                if (ok) {
                    return new toImport(newFileName, true);
                }
            }
            return new toImport(oldFileName, false);
        }
    }
    return void 0;
}
export function getUpdatedImportSpecifierFromMovedSourceFiles(program: {
    value: Program__from_compiler;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, importLiteral: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, oldToNew: pathUpdater, importingSourceFileName: gostring, userPreferences: UserPreferences__from_modulespecifiers): gostring {
    let resolutionMode = Program__from_compiler.GetModeForUsageLocation(program, new GoInterfaceAdapter(sourceFile), importLiteral);
    const __gotots_range_2 = Program__from_compiler.GetSourceFiles(program);
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let candidate: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_2;
        const __gotots_callee_3 = oldToNew.$value;
        const __gotots_argument_4 = SourceFile__from_ast.FileName(candidate);
        const __gotots_results_3 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
        let newFileName = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (!ok) {
            continue;
        }
        let oldSpecifier = UpdateModuleSpecifier__from_modulespecifiers(Program__from_compiler.Options(program), new $goInterfaceAdapter$PointerTo_Named_compiler$Program(program), sourceFile, importingSourceFileName, Node__from_ast.Text(importLiteral), SourceFile__from_ast.FileName(candidate), UserPreferences__from_modulespecifiers.$copy(userPreferences), new ModuleSpecifierOptions__from_modulespecifiers(resolutionMode));
        if (oldSpecifier !== Node__from_ast.Text(importLiteral)) {
            continue;
        }
        return UpdateModuleSpecifier__from_modulespecifiers(Program__from_compiler.Options(program), new $goInterfaceAdapter$PointerTo_Named_compiler$Program(program), sourceFile, importingSourceFileName, Node__from_ast.Text(importLiteral), newFileName, UserPreferences__from_modulespecifiers.$copy(userPreferences), new ModuleSpecifierOptions__from_modulespecifiers(resolutionMode));
    }
    return "";
}
export function createStringTextRange(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    return NewTextRange__from_core(GetTokenPosOfNode__from_scanner(node, sourceFile, false) + 1, Node__from_ast.End(node) - 1);
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
export function forEachObjectProperty(objectLiteral: {
    value: ObjectLiteralExpression__from_ast;
} | undefined, cb: (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, $1: gostring) => void) | undefined): void {
    if (objectLiteral === undefined) {
        return;
    }
    const __gotots_range_0 = NodeList__from_ast.$storageOf((((objectLiteral ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let property: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (!IsPropertyAssignment__from_ast(property)) {
            continue;
        }
        {
            const __gotots_results_0 = TryGetTextOfPropertyName__from_ast(Node__from_ast.Name(property));
            let name = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                const __gotots_callee_0 = cb;
                const __gotots_argument_0 = Node__from_ast.AsPropertyAssignment(property);
                const __gotots_argument_1 = name;
                (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
            }
        }
    }
}
export function relativePathFromDirectory(fromDirectory: gostring, to: gostring, useCaseSensitiveFileNames: bool): gostring {
    return GetRelativePathFromDirectory__from_tspath(fromDirectory, to, new ComparePathsOptions__from_tspath(useCaseSensitiveFileNames, ""));
}
export function relativeImportPathFromDirectory(fromDirectory: gostring, to: gostring, useCaseSensitiveFileNames: bool): gostring {
    return EnsurePathIsNonModuleName__from_tspath(relativePathFromDirectory(fromDirectory, to, useCaseSensitiveFileNames));
}
export function isAmbientModuleSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (__go_symbol === undefined) {
        return false;
    }
    return ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsModuleWithStringLiteralName__from_ast);
}
