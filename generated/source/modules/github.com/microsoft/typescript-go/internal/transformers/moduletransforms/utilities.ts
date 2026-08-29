import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { AutoGenerateInfo as AutoGenerateInfo__from_printer, EmitResolver as EmitResolver__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { GetExternalModuleName as GetExternalModuleName__from_ast, IsIdentifier as IsIdentifier__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, NodeFactory as NodeFactory__from_ast, Node as Node__from_ast, StringLiteral as StringLiteral__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { ShouldRewriteModuleSpecifier as ShouldRewriteModuleSpecifier__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetOutputExtension as GetOutputExtension__from_outputpaths } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { EmitContext as EmitContext__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsSimpleCopiableExpression as IsSimpleCopiableExpression__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { ChangeExtension as ChangeExtension__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function isDeclarationNameOfEnumOrNamespace(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    {
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(emitContext, node);
        if (!(original === undefined) && !(Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
            switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindEnumDeclaration$constant__from_ast():
                case KindModuleDeclaration$constant__from_ast(): {
                    return tsonicTypeScriptRuntime.sameLocation(original, Node__from_ast.Name(Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
                    break;
                }
            }
        }
    }
    return false;
}
export function rewriteModuleSpecifier(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined || !IsStringLiteral__from_ast(node) || !ShouldRewriteModuleSpecifier__from_core(Node__from_ast.Text(node), compilerOptions)) {
        return node;
    }
    let updatedText = ChangeExtension__from_tspath(Node__from_ast.Text(node), GetOutputExtension__from_outputpaths(Node__from_ast.Text(node), (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx));
    if (updatedText !== Node__from_ast.Text(node)) {
        const __gotots_store_3 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), updatedText, (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
            (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags);
        EmitContext__from_printer.SetOriginal(emitContext, updated, node);
        EmitContext__from_printer.AssignCommentAndSourceMapRanges(emitContext, updated, node);
        return updated;
    }
    return node;
}
export function createEmptyImports(factory: {
    value: NodeFactory__from_printer;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_store_0 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory");
    const __gotots_argument_1 = void 0;
    const __gotots_argument_2 = false;
    const __gotots_store_1 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory");
    const __gotots_store_2 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_0 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
    const __gotots_argument_3 = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_0, __gotots_argument_0);
    const __gotots_argument_4 = void 0;
    const __gotots_argument_5 = void 0;
    return NodeFactory__from_ast.NewExportDeclaration(__gotots_receiver_1, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
}
export function getExternalModuleNameLiteral(factory: {
    value: NodeFactory__from_printer;
} | undefined, importNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, host: GoInterface | undefined, resolver: EmitResolver__from_printer | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let moduleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetExternalModuleName__from_ast(importNode);
    if (!(moduleName === undefined) && IsStringLiteral__from_ast(moduleName)) {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = tryGetModuleNameFromDeclaration(importNode, host, factory, resolver, compilerOptions);
        if (name === undefined) {
            name = tryRenameExternalModule(factory, moduleName, sourceFile);
        }
        if (name === undefined) {
            const __gotots_store_4 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            name = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), Node__from_ast.Text(moduleName), TokenFlagsNone$constant__from_ast());
        }
        return name;
    }
    return void 0;
}
export function tryGetModuleNameFromFile(factory: {
    value: NodeFactory__from_printer;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, host: GoInterface | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (file === undefined) {
        return void 0;
    }
    return void 0;
}
export function tryGetModuleNameFromDeclaration(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, host: GoInterface | undefined, factory: {
    value: NodeFactory__from_printer;
} | undefined, resolver: EmitResolver__from_printer | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (resolver === undefined) {
        return void 0;
    }
    const __gotots_argument_7 = factory;
    const __gotots_receiver_2 = resolver;
    const __gotots_argument_6 = declaration;
    const __gotots_argument_8 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_2).GetExternalModuleFileFromDeclaration(__gotots_argument_6);
    const __gotots_argument_9 = host;
    const __gotots_argument_10 = compilerOptions;
    return tryGetModuleNameFromFile(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
}
export function tryRenameExternalModule(factory: {
    value: NodeFactory__from_printer;
} | undefined, moduleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return void 0;
}
export function isFileLevelReservedGeneratedIdentifier(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let info: AutoGenerateInfo__from_printer | undefined = EmitContext__from_printer.GetAutoGenerateInfo(emitContext, name);
    return !(info === undefined) && (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Flags.IsFileLevel() && (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Flags.IsOptimistic() && (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Flags.IsReservedInNestedScopes();
}
export function isSimpleInlineableExpression(expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !IsIdentifier__from_ast(expression) && IsSimpleCopiableExpression__from_transformers(expression);
}
