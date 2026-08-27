import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Identifier as Identifier__from_ast, SymbolId as SymbolId__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { NodeBuilderContext } from "./nodebuilderimpl.js";
import type { TypeId } from "./types.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { CopyOnWriteMap as CopyOnWriteMap__from_collections, CopyOnWriteSet as CopyOnWriteSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function cloneNodeBuilderContext(context: {
    value: NodeBuilderContext;
} | undefined): (() => void) | undefined {
    const __gotots_store_0 = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let restoreNames: (() => void) | undefined = CopyOnWriteMap__from_collections.EnterScope<TypeId, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "typeParameterNames"));
    const __gotots_store_1 = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let restoreNamesByText: (() => void) | undefined = CopyOnWriteSet__from_collections.EnterScope<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "typeParameterNamesByText"));
    const __gotots_store_2 = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let restoreNamesByTextNextNameCount: (() => void) | undefined = CopyOnWriteMap__from_collections.EnterScope<gostring, int>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "typeParameterNamesByTextNextNameCount"));
    const __gotots_store_3 = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let restoreSymbolList: (() => void) | undefined = CopyOnWriteSet__from_collections.EnterScope<SymbolId__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "typeParameterSymbolList"));
    return (): void => {
        const __gotots_callee_0 = restoreNames;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_callee_1 = restoreNamesByText;
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_callee_2 = restoreNamesByTextNextNameCount;
        (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_callee_3 = restoreSymbolList;
        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
    };
}
export type localsRecord$Storage = {
    name: gostring;
    oldSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class localsRecord {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: localsRecord$Storage) {
    }
    public static $storageOf($source: localsRecord): localsRecord$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: localsRecord$Storage): localsRecord {
        return new localsRecord($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get oldSymbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.oldSymbol;
    }
    public set oldSymbol($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.oldSymbol = $value;
    }
    static $zero(): localsRecord {
        return new localsRecord({
            name: "",
            oldSymbol: void 0
        });
    }
    static $copy($source: localsRecord): localsRecord {
        return new localsRecord({
            name: $source.$storage.name,
            oldSymbol: $source.$storage.oldSymbol
        });
    }
    declare private readonly then?: never;
}
