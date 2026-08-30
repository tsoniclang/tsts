import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { ForEachDynamicImportOrRequireCall as ForEachDynamicImportOrRequireCall__from_ast, GetExternalModuleName as GetExternalModuleName__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsAnyImportOrReExport as IsAnyImportOrReExport__from_ast, IsExternalModule as IsExternalModule__from_ast, IsInJSFile as IsInJSFile__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsStringLiteral as IsStringLiteral__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModuleDeclaration as ModuleDeclaration__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsPossiblyContainsDynamicImport$constant as NodeFlagsPossiblyContainsDynamicImport$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SetImportsOfSourceFile as SetImportsOfSourceFile__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $state as $state__core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
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
export function collectExternalModuleReferences(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    const __gotots_range_0 = NodeList__from_ast.$storageOf(((((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        collectModuleReferences(file, node, false);
    }
    let __gotots_logical_result_0 = !(((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault)).Node)).Flags & NodeFlagsPossiblyContainsDynamicImport$constant__from_ast()) >>> 0 === 0);
    if (!__gotots_logical_result_0) {
        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_0 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        __gotots_logical_result_0 = IsInJSFile__from_ast(__gotots_argument_0);
    }
    if (__gotots_logical_result_0) {
        ForEachDynamicImportOrRequireCall__from_ast(file, true, true, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            SetImportsOfSourceFile__from_ast(file, SourceFile__from_ast.Imports(file).append(void 0, [moduleSpecifier]));
            return false;
        });
    }
}
export function collectModuleReferences(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, inAmbientModule: bool): void {
    if (IsAnyImportOrReExport__from_ast(node)) {
        let moduleNameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetExternalModuleName__from_ast(node);
        if (!(moduleNameExpr === undefined) && IsStringLiteral__from_ast(moduleNameExpr)) {
            let moduleName = Node__from_ast.Text(moduleNameExpr);
            if (moduleName !== "" && (!inAmbientModule || !IsExternalModuleNameRelative__from_tspath(moduleName))) {
                SetImportsOfSourceFile__from_ast(file, SourceFile__from_ast.Imports(file).append(void 0, [moduleNameExpr]));
                if (!(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.UsesUriStyleNodeCoreModules === TSTrue$constant__from_core()) && !((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
                    if (strings__from_gostdlib.HasPrefix(moduleName, "node:") && !$state__core.ExclusivelyPrefixedNodeCoreModules.lookup(moduleName)) {
                        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.UsesUriStyleNodeCoreModules = TSTrue$constant__from_core();
                    }
                    else if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.UsesUriStyleNodeCoreModules === TSUnknown$constant__from_core() && $state__core.UnprefixedNodeCoreModules.lookup(moduleName)) {
                        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.UsesUriStyleNodeCoreModules = TSFalse$constant__from_core();
                    }
                }
            }
        }
        return;
    }
    if (IsModuleDeclaration__from_ast(node) && IsAmbientModule__from_ast(node) && (inAmbientModule || HasSyntacticModifier__from_ast(node, ModifierFlagsAmbient$constant__from_ast()) || ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile)) {
        let nameText = Node__from_ast.Text(ModuleDeclaration__from_ast.Name(Node__from_ast.AsModuleDeclaration(node)));
        if (IsExternalModule__from_ast(file) || (inAmbientModule && !IsExternalModuleNameRelative__from_tspath(nameText))) {
            ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations.append(void 0, [ModuleDeclaration__from_ast.Name(Node__from_ast.AsModuleDeclaration(node))]);
        }
        else if (!inAmbientModule) {
            ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames.append("", [nameText]);
            if (!(Node__from_ast.Body(node) === undefined)) {
                const __gotots_range_1 = Node__from_ast.Statements(Node__from_ast.Body(node));
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                    collectModuleReferences(file, statement, true);
                }
            }
        }
    }
}
