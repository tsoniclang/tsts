import type { uint32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../packages/golang.org/x/text@v0.38.0/collate/state.js";
import { ContractTrieSet as ContractTrieSet__from_colltab, Table as Table__from_colltab, Trie as Trie__from_colltab } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/colltab/package.js";
import { varTop$uint32 } from "./tables.js";
import { goArraySlice } from "@gotots/runtime/slice.js";
export const blockSize$uint32: uint32 = 64;
export function getTable(t: tableIndex): Table__from_colltab | undefined {
    return new Table__from_colltab(new Trie__from_colltab(goArraySlice($state.mainLookup, 0, null, null).slice(blockSize$uint32 * tableIndex.$storageOf(t).lookupOffset, null, null), goArraySlice($state.mainValues, 0, null, null).slice(blockSize$uint32 * tableIndex.$storageOf(t).valuesOffset, null, null), goArraySlice($state.mainLookup, 0, null, null), goArraySlice($state.mainValues, 0, null, null)), goArraySlice($state.mainExpandElem, 0, null, null), new ContractTrieSet__from_colltab(goArraySlice($state.mainCTEntries, 0, null, null)), goArraySlice($state.mainContractElem, 0, null, null), 18, varTop$uint32);
}
export type tableIndex$Storage = {
    lookupOffset: uint32;
    valuesOffset: uint32;
};
export class tableIndex {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: tableIndex$Storage) {
    }
    public static $storageOf($source: tableIndex): tableIndex$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: tableIndex$Storage): tableIndex {
        return new tableIndex($source);
    }
    public get lookupOffset(): uint32 {
        return this.$storage.lookupOffset;
    }
    public set lookupOffset($value: uint32) {
        this.$storage.lookupOffset = $value;
    }
    public get valuesOffset(): uint32 {
        return this.$storage.valuesOffset;
    }
    public set valuesOffset($value: uint32) {
        this.$storage.valuesOffset = $value;
    }
    static $copy($source: tableIndex): tableIndex {
        return new tableIndex({
            lookupOffset: $source.$storage.lookupOffset,
            valuesOffset: $source.$storage.valuesOffset
        });
    }
    static $zeroStorage(): tableIndex$Storage {
        return {
            lookupOffset: 0,
            valuesOffset: 0
        };
    }
    declare private readonly then?: never;
}
