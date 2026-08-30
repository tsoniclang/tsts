import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile } from "./ast.js";
import type { ImportEqualsDeclaration } from "./ast_generated.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/state.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitReactJSX$constant as JsxEmitReactJSX$constant__from_core, JsxEmitReactJSXDev$constant as JsxEmitReactJSXDev$constant__from_core, ModuleDetectionKindAuto$constant as ModuleDetectionKindAuto$constant__from_core, ModuleDetectionKindForce$constant as ModuleDetectionKindForce$constant__from_core, ModuleDetectionKindLegacy$constant as ModuleDetectionKindLegacy$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Node, NodeBase, NodeDefault, NodeList, SourceFileMetaData, Visitor } from "./ast.js";
import { IsExportAssignment, IsExportDeclaration, IsExternalModuleReference, IsImportDeclaration, IsImportEqualsDeclaration, IsJsxFragment } from "./ast_generated.js";
import { ModifierFlagsExport$constant } from "./modifierflags.js";
import { NodeFlagsPossiblyContainsImportMeta$constant } from "./nodeflags.js";
import { SubtreeContainsJsx$constant } from "./subtreefacts.js";
import { GetImpliedNodeFormatForEmitWorker, HasSyntacticModifier, IsImportMeta, IsJsxOpeningLikeElement } from "./utilities.js";
import { GoMapHash } from "@gotots/runtime/map.js";
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
export type SourceFileParseOptions$Storage = {
    FileName: gostring;
    Path: gostring;
    ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions$Storage;
};
export class SourceFileParseOptions implements GoContainerStoredValue<SourceFileParseOptions$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SourceFileParseOptions$Storage) {
    }
    public static $storageOf($source: SourceFileParseOptions): SourceFileParseOptions$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SourceFileParseOptions$Storage): SourceFileParseOptions {
        return new SourceFileParseOptions($source);
    }
    public get FileName(): gostring {
        return this.$storage.FileName;
    }
    public set FileName($value: gostring) {
        this.$storage.FileName = $value;
    }
    public get Path(): Path__from_tspath {
        return new Path__from_tspath(this.$storage.Path);
    }
    public set Path($value: Path__from_tspath) {
        this.$storage.Path = $value.$value;
    }
    public get ExternalModuleIndicatorOptions(): ExternalModuleIndicatorOptions {
        return ExternalModuleIndicatorOptions.$fromStorage(this.$storage.ExternalModuleIndicatorOptions);
    }
    public set ExternalModuleIndicatorOptions($value: ExternalModuleIndicatorOptions) {
        this.$storage.ExternalModuleIndicatorOptions = ExternalModuleIndicatorOptions.$storageOf($value);
    }
    declare readonly [$goContainerStorageType]: SourceFileParseOptions$Storage;
    static $zero(): SourceFileParseOptions {
        return new SourceFileParseOptions({
            FileName: "",
            Path: ((void Path__from_tspath,
                "") as string),
            ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions.$zeroStorage()
        });
    }
    static $copy($source: SourceFileParseOptions): SourceFileParseOptions {
        return new SourceFileParseOptions({
            FileName: $source.$storage.FileName,
            Path: ((void Path__from_tspath,
                $source.$storage.Path) as string),
            ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions.$storageOf(ExternalModuleIndicatorOptions.$copy(ExternalModuleIndicatorOptions.$fromStorage($source.$storage.ExternalModuleIndicatorOptions)))
        });
    }
    static $equal($left: SourceFileParseOptions, $right: SourceFileParseOptions): bool {
        return $left.$storage.FileName === $right.$storage.FileName && ((void Path__from_tspath,
            $left.$storage.Path) as string)
            ===
                ((void Path__from_tspath,
                    $right.$storage.Path) as string) && ExternalModuleIndicatorOptions.$equal(ExternalModuleIndicatorOptions.$fromStorage($left.$storage.ExternalModuleIndicatorOptions), ExternalModuleIndicatorOptions.$fromStorage($right.$storage.ExternalModuleIndicatorOptions));
    }
    static $hash($source: SourceFileParseOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.FileName));
        $hash = GoMapHash.mix($hash, GoMapHash.string(((void Path__from_tspath,
            $source.$storage.Path) as string)));
        $hash = GoMapHash.mix($hash, ExternalModuleIndicatorOptions.$hash(ExternalModuleIndicatorOptions.$fromStorage($source.$storage.ExternalModuleIndicatorOptions)));
        return $hash;
    }
    static $zeroStorage(): SourceFileParseOptions$Storage {
        return {
            FileName: "",
            Path: ((void Path__from_tspath,
                "") as string),
            ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions.$zeroStorage()
        };
    }
    declare private readonly then?: never;
}
export type ExternalModuleIndicatorOptions$Storage = {
    JSX: bool;
    Force: bool;
};
export class ExternalModuleIndicatorOptions {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ExternalModuleIndicatorOptions$Storage) {
    }
    public static $storageOf($source: ExternalModuleIndicatorOptions): ExternalModuleIndicatorOptions$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ExternalModuleIndicatorOptions$Storage): ExternalModuleIndicatorOptions {
        return new ExternalModuleIndicatorOptions($source);
    }
    public get JSX(): bool {
        return this.$storage.JSX;
    }
    public set JSX($value: bool) {
        this.$storage.JSX = $value;
    }
    public get Force(): bool {
        return this.$storage.Force;
    }
    public set Force($value: bool) {
        this.$storage.Force = $value;
    }
    static $copy($source: ExternalModuleIndicatorOptions): ExternalModuleIndicatorOptions {
        return new ExternalModuleIndicatorOptions({
            JSX: $source.$storage.JSX,
            Force: $source.$storage.Force
        });
    }
    static $equal($left: ExternalModuleIndicatorOptions, $right: ExternalModuleIndicatorOptions): bool {
        return $left.$storage.JSX === $right.$storage.JSX && $left.$storage.Force === $right.$storage.Force;
    }
    static $hash($source: ExternalModuleIndicatorOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.JSX));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.Force));
        return $hash;
    }
    static $zeroStorage(): ExternalModuleIndicatorOptions$Storage {
        return {
            JSX: false,
            Force: false
        };
    }
    declare private readonly then?: never;
}
export function GetExternalModuleIndicatorOptions(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, metadata: SourceFileMetaData): ExternalModuleIndicatorOptions {
    if (IsDeclarationFileName__from_tspath(fileName)) {
        return ExternalModuleIndicatorOptions.$fromStorage({
            JSX: false,
            Force: false
        });
    }
    switch (CompilerOptions__from_core.GetEmitModuleDetectionKind(options)) {
        case ModuleDetectionKindForce$constant__from_core(): {
            return ExternalModuleIndicatorOptions.$fromStorage({
                Force: true,
                JSX: false
            });
            break;
        }
        case ModuleDetectionKindLegacy$constant__from_core(): {
            return ExternalModuleIndicatorOptions.$fromStorage({
                JSX: false,
                Force: false
            });
            break;
        }
        case ModuleDetectionKindAuto$constant__from_core(): {
            return ExternalModuleIndicatorOptions.$fromStorage({
                JSX: (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSX$constant__from_core() || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core(),
                Force: isFileForcedToBeModuleByFormat(fileName, options, SourceFileMetaData.$copy(metadata))
            });
            break;
        }
        default: {
            return ExternalModuleIndicatorOptions.$fromStorage({
                JSX: false,
                Force: false
            });
            break;
        }
    }
}
export function isFileForcedToBeModuleByFormat(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, metadata: SourceFileMetaData): bool {
    if (GetImpliedNodeFormatForEmitWorker(fileName, CompilerOptions__from_core.GetEmitModuleKind(options), SourceFileMetaData.$copy(metadata)) === ModuleKindESNext$constant__from_core() || FileExtensionIsOneOf__from_tspath(fileName, $state.isFileForcedToBeModuleByFormatExtensions)) {
        return true;
    }
    return false;
}
export function SetExternalModuleIndicator(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, opts: ExternalModuleIndicatorOptions): void {
    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ExternalModuleIndicator = getExternalModuleIndicator(file, ExternalModuleIndicatorOptions.$copy(opts));
}
export function getExternalModuleIndicator(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, opts: ExternalModuleIndicatorOptions): tsonicTypeScriptRuntime.Location<Node> | undefined {
    if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.ScriptKind === ScriptKindJSON$constant__from_core()) {
        return void 0;
    }
    {
        let node: tsonicTypeScriptRuntime.Location<Node> | undefined = isFileProbablyExternalModule(file);
        if (!(node === undefined)) {
            return node;
        }
    }
    if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.IsDeclarationFile) {
        return void 0;
    }
    if (ExternalModuleIndicatorOptions.$storageOf(opts).JSX) {
        {
            let node: tsonicTypeScriptRuntime.Location<Node> | undefined = isFileModuleFromUsingJSXTag(file);
            if (!(node === undefined)) {
                return node;
            }
        }
    }
    if (ExternalModuleIndicatorOptions.$storageOf(opts).Force) {
        const __gotots_store_0 = NodeBase.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
        return NodeDefault.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault.$fromStorage, NodeDefault.$storageOf));
    }
    return void 0;
}
export function isFileProbablyExternalModule(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_range_0 = NodeList.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let statement: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_0;
        if (isAnExternalModuleIndicatorNode(statement)) {
            return statement;
        }
    }
    return getImportMetaIfNecessary(sourceFile);
}
export function isAnExternalModuleIndicatorNode(node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool {
    return HasSyntacticModifier(node, ModifierFlagsExport$constant()) || IsImportEqualsDeclaration(node) && IsExternalModuleReference((Node.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference) || IsImportDeclaration(node) || IsExportAssignment(node) || IsExportDeclaration(node);
}
export function getImportMetaIfNecessary(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_store_2 = NodeBase.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
    const __gotots_binary_operand_0 = Node.$storageOf(((NodeDefault.AsNode(new $ProjectedPropertyLocation(__gotots_store_2, "NodeDefault", NodeDefault.$fromStorage, NodeDefault.$storageOf)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Flags;
    const __gotots_binary_operand_1 = NodeFlagsPossiblyContainsImportMeta$constant();
    if (!((__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0 === 0)) {
        const __gotots_store_3 = NodeBase.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
        const __gotots_argument_1 = NodeDefault.AsNode(new $ProjectedPropertyLocation(__gotots_store_3, "NodeDefault", NodeDefault.$fromStorage, NodeDefault.$storageOf));
        const __gotots_argument_2 = IsImportMeta;
        return findChildNode(__gotots_argument_1, __gotots_argument_2);
    }
    return void 0;
}
export function findChildNode(root: tsonicTypeScriptRuntime.Location<Node> | undefined, check: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let result: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    let visit__shadow_1: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined;
    visit__shadow_1 = (node: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        const __gotots_callee_1 = check;
        const __gotots_argument_4 = node;
        if ((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4)) {
            result = node;
            return true;
        }
        return Node.ForEachChild(node, new Visitor(visit__shadow_1));
    };
    const __gotots_callee_2 = visit__shadow_1;
    const __gotots_argument_5 = root;
    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
    return result;
}
export function isFileModuleFromUsingJSXTag(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    const __gotots_store_1 = NodeBase.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile>).value.NodeBase);
    const __gotots_argument_0 = NodeDefault.AsNode(new $ProjectedPropertyLocation(__gotots_store_1, "NodeDefault", NodeDefault.$fromStorage, NodeDefault.$storageOf));
    return walkTreeForJSXTags(__gotots_argument_0);
}
export function walkTreeForJSXTags(node: tsonicTypeScriptRuntime.Location<Node> | undefined): tsonicTypeScriptRuntime.Location<Node> | undefined {
    let found: tsonicTypeScriptRuntime.Location<Node> | undefined = void 0;
    let visitor: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => bool) | undefined;
    visitor = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node> | undefined): bool => {
        if (!(found === undefined)) {
            return true;
        }
        if ((Node.SubtreeFacts(node__shadow_1) & SubtreeContainsJsx$constant()) >>> 0 === 0) {
            return false;
        }
        if (IsJsxOpeningLikeElement(node__shadow_1) || IsJsxFragment(node__shadow_1)) {
            found = node__shadow_1;
            return true;
        }
        return Node.ForEachChild(node__shadow_1, new Visitor(visitor));
    };
    const __gotots_callee_0 = visitor;
    const __gotots_argument_3 = node;
    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
    return found;
}
