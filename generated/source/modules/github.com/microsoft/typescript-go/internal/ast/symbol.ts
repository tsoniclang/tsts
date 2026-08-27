import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CheckFlags } from "./checkflags.js";
import type { SymbolFlags } from "./symbolflags.js";
import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { Node } from "./ast.js";
import { SymbolFlagsModule$constant } from "./symbolflags.js";
import { IsPrivateIdentifierClassElementDeclaration } from "./utilities.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export type Symbol$Storage = {
    Flags: uint32;
    CheckFlags: uint32;
    Name: gostring;
    Declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>;
    ValueDeclaration: tsonicTypeScriptRuntime.Location<Node> | undefined;
    Members: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>;
    Exports: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>;
    id: atomic__from_gostdlib.Uint64;
    Parent: tsonicTypeScriptRuntime.Location<Symbol> | undefined;
    ExportSymbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined;
};
export class Symbol implements GoContainerStoredValue<Symbol$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Symbol$Storage) {
    }
    public static $storageOf($source: Symbol): Symbol$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Symbol$Storage): Symbol {
        return new Symbol($source);
    }
    public get Flags(): SymbolFlags {
        return this.$storage.Flags;
    }
    public set Flags($value: SymbolFlags) {
        this.$storage.Flags = $value;
    }
    public get CheckFlags(): CheckFlags {
        return this.$storage.CheckFlags;
    }
    public set CheckFlags($value: CheckFlags) {
        this.$storage.CheckFlags = $value;
    }
    public get Name(): gostring {
        return this.$storage.Name;
    }
    public set Name($value: gostring) {
        this.$storage.Name = $value;
    }
    public get Declarations(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined> {
        return this.$storage.Declarations;
    }
    public set Declarations($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>) {
        this.$storage.Declarations = $value;
    }
    public get ValueDeclaration(): tsonicTypeScriptRuntime.Location<Node> | undefined {
        return this.$storage.ValueDeclaration;
    }
    public set ValueDeclaration($value: tsonicTypeScriptRuntime.Location<Node> | undefined) {
        this.$storage.ValueDeclaration = $value;
    }
    public get Members(): SymbolTable {
        return new SymbolTable(this.$storage.Members);
    }
    public set Members($value: SymbolTable) {
        this.$storage.Members = $value.$value;
    }
    public get Exports(): SymbolTable {
        return new SymbolTable(this.$storage.Exports);
    }
    public set Exports($value: SymbolTable) {
        this.$storage.Exports = $value.$value;
    }
    public get id(): atomic__from_gostdlib.Uint64 {
        return this.$storage.id;
    }
    public set id($value: atomic__from_gostdlib.Uint64) {
        this.$storage.id = $value;
    }
    public get Parent(): tsonicTypeScriptRuntime.Location<Symbol> | undefined {
        return this.$storage.Parent;
    }
    public set Parent($value: tsonicTypeScriptRuntime.Location<Symbol> | undefined) {
        this.$storage.Parent = $value;
    }
    public get ExportSymbol(): tsonicTypeScriptRuntime.Location<Symbol> | undefined {
        return this.$storage.ExportSymbol;
    }
    public set ExportSymbol($value: tsonicTypeScriptRuntime.Location<Symbol> | undefined) {
        this.$storage.ExportSymbol = $value;
    }
    declare readonly [$goContainerStorageType]: Symbol$Storage;
    static $zero(): Symbol {
        return new Symbol({
            Flags: 0,
            CheckFlags: 0,
            Name: "",
            Declarations: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node> | undefined>(),
            ValueDeclaration: void 0,
            Members: new SymbolTable(GoMap.nil()).$value,
            Exports: new SymbolTable(GoMap.nil()).$value,
            id: named_sync_atomic.SyncAtomicUint64Operations.$zero(),
            Parent: void 0,
            ExportSymbol: void 0
        });
    }
    static $copy($source: Symbol): Symbol {
        return new Symbol({
            Flags: $source.$storage.Flags,
            CheckFlags: $source.$storage.CheckFlags,
            Name: $source.$storage.Name,
            Declarations: $source.$storage.Declarations,
            ValueDeclaration: $source.$storage.ValueDeclaration,
            Members: new SymbolTable($source.$storage.Members).$value,
            Exports: new SymbolTable($source.$storage.Exports).$value,
            id: named_sync_atomic.SyncAtomicUint64Operations.$copy($source.$storage.id),
            Parent: $source.$storage.Parent,
            ExportSymbol: $source.$storage.ExportSymbol
        });
    }
    declare private readonly then?: never;
    static CombinedLocalAndExportSymbolFlags(s: tsonicTypeScriptRuntime.Location<Symbol> | undefined): SymbolFlags {
        if (!(Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).ExportSymbol === undefined)) {
            return (Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags | Symbol.$storageOf(((Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).ExportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags) >>> 0;
        }
        return Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags;
    }
    static IsExternalModule(s: tsonicTypeScriptRuntime.Location<Symbol> | undefined): bool {
        return !((Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Flags & SymbolFlagsModule$constant()) >>> 0 === 0) && Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Name.length > 0 && goStringIndex(Symbol.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Name, 0) === 34;
    }
}
export class SymbolTable {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol> | undefined>) {
    }
    declare private readonly then?: never;
}
export const InternalSymbolNamePrefix$string: gostring = "\u00FE";
export const InternalSymbolNameCall$string: gostring = "\u00FEcall";
export const InternalSymbolNameConstructor$string: gostring = "\u00FEconstructor";
export const InternalSymbolNameNew$string: gostring = "\u00FEnew";
export const InternalSymbolNameIndex$string: gostring = "\u00FEindex";
export const InternalSymbolNameExportStar$string: gostring = "\u00FEexport";
export const InternalSymbolNameGlobal$string: gostring = "\u00FEglobal";
export const InternalSymbolNameMissing$string: gostring = "\u00FEmissing";
export const InternalSymbolNameType$string: gostring = "\u00FEtype";
export const InternalSymbolNameObject$string: gostring = "\u00FEobject";
export const InternalSymbolNameJSXAttributes$string: gostring = "\u00FEjsxAttributes";
export const InternalSymbolNameClass$string: gostring = "\u00FEclass";
export const InternalSymbolNameFunction$string: gostring = "\u00FEfunction";
export const InternalSymbolNameComputed$string: gostring = "\u00FEcomputed";
export const InternalSymbolNameAssignmentDeclaration$string: gostring = "\u00FEassignment";
export const InternalSymbolNameInstantiationExpression$string: gostring = "\u00FEinstantiationExpression";
export const InternalSymbolNameImportAttributes$string: gostring = "\u00FEimportAttributes";
export const InternalSymbolNameExportEquals$string: gostring = "export=";
export const InternalSymbolNameDefault$string: gostring = "default";
export const InternalSymbolNameThis$string: gostring = "this";
export const InternalSymbolNameModuleExports$string: gostring = "module.exports";
export function SymbolName(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol> | undefined): gostring {
    if (!(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).ValueDeclaration === undefined) && IsPrivateIdentifierClassElementDeclaration(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).ValueDeclaration)) {
        return Node.Text(Node.Name(Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).ValueDeclaration));
    }
    return Symbol.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol>).value).Name;
}
export function EscapeAllInternalSymbolNames(name: gostring): gostring {
    return strings__from_gostdlib.ReplaceAll(name, InternalSymbolNamePrefix$string, "__");
}
