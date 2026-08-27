import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFileParseOptions$Storage as SourceFileParseOptions__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ScriptKind as ScriptKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Uint128$Storage as Uint128__from_xxh3$Storage } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import type { FileHandle } from "./overlayfs.js";
import type { RefCountCache } from "./refcountcache.js";
import type { bool, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { ParseSourceFile as ParseSourceFile__from_parser } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/parser/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { NewRefCountCache, RefCountCacheOptions } from "./refcountcache.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type ParseCacheKey$Storage = {
    SourceFileParseOptions: SourceFileParseOptions__from_ast$Storage;
    ScriptKind: int32;
    Hash: Uint128__from_xxh3$Storage;
};
export class ParseCacheKey implements GoContainerStoredValue<ParseCacheKey$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ParseCacheKey$Storage) {
    }
    public static $storageOf($source: ParseCacheKey): ParseCacheKey$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ParseCacheKey$Storage): ParseCacheKey {
        return new ParseCacheKey($source);
    }
    public get SourceFileParseOptions(): SourceFileParseOptions__from_ast {
        return SourceFileParseOptions__from_ast.$fromStorage(this.$storage.SourceFileParseOptions);
    }
    public set SourceFileParseOptions($value: SourceFileParseOptions__from_ast) {
        this.$storage.SourceFileParseOptions = SourceFileParseOptions__from_ast.$storageOf($value);
    }
    public get ScriptKind(): ScriptKind__from_core {
        return this.$storage.ScriptKind;
    }
    public set ScriptKind($value: ScriptKind__from_core) {
        this.$storage.ScriptKind = $value;
    }
    public get Hash(): Uint128__from_xxh3 {
        return Uint128__from_xxh3.$fromStorage(this.$storage.Hash);
    }
    public set Hash($value: Uint128__from_xxh3) {
        this.$storage.Hash = Uint128__from_xxh3.$storageOf($value);
    }
    declare readonly [$goContainerStorageType]: ParseCacheKey$Storage;
    static $zero(): ParseCacheKey {
        return new ParseCacheKey({
            SourceFileParseOptions: SourceFileParseOptions__from_ast.$storageOf(SourceFileParseOptions__from_ast.$zero()),
            ScriptKind: 0,
            Hash: Uint128__from_xxh3.$storageOf(Uint128__from_xxh3.$zero())
        });
    }
    static $copy($source: ParseCacheKey): ParseCacheKey {
        return new ParseCacheKey({
            SourceFileParseOptions: SourceFileParseOptions__from_ast.$storageOf(SourceFileParseOptions__from_ast.$copy(SourceFileParseOptions__from_ast.$fromStorage($source.$storage.SourceFileParseOptions))),
            ScriptKind: $source.$storage.ScriptKind,
            Hash: Uint128__from_xxh3.$storageOf(Uint128__from_xxh3.$copy(Uint128__from_xxh3.$fromStorage($source.$storage.Hash)))
        });
    }
    static $equal($left: ParseCacheKey, $right: ParseCacheKey): bool {
        return SourceFileParseOptions__from_ast.$equal(SourceFileParseOptions__from_ast.$fromStorage($left.$storage.SourceFileParseOptions), SourceFileParseOptions__from_ast.$fromStorage($right.$storage.SourceFileParseOptions)) && $left.$storage.ScriptKind === $right.$storage.ScriptKind && Uint128__from_xxh3.$equal(Uint128__from_xxh3.$fromStorage($left.$storage.Hash), Uint128__from_xxh3.$fromStorage($right.$storage.Hash));
    }
    static $hash($source: ParseCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, SourceFileParseOptions__from_ast.$hash(SourceFileParseOptions__from_ast.$fromStorage($source.$storage.SourceFileParseOptions)));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.ScriptKind));
        $hash = GoMapHash.mix($hash, Uint128__from_xxh3.$hash(Uint128__from_xxh3.$fromStorage($source.$storage.Hash)));
        return $hash;
    }
    declare private readonly then?: never;
}
export function NewParseCacheKey(options: SourceFileParseOptions__from_ast, hash__shadow_1: Uint128__from_xxh3, scriptKind: ScriptKind__from_core): ParseCacheKey {
    return ParseCacheKey.$fromStorage({
        SourceFileParseOptions: SourceFileParseOptions__from_ast.$storageOf(SourceFileParseOptions__from_ast.$copy(options)),
        Hash: Uint128__from_xxh3.$storageOf(Uint128__from_xxh3.$copy(hash__shadow_1)),
        ScriptKind: scriptKind
    });
}
export function NewParseCache(options: RefCountCacheOptions): {
    value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
} | undefined {
    return NewRefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>(RefCountCacheOptions.$copy(options), (key: ParseCacheKey, fh: FileHandle | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        const __gotots_argument_0 = SourceFileParseOptions__from_ast.$copy(SourceFileParseOptions__from_ast.$fromStorage(ParseCacheKey.$storageOf(key).SourceFileParseOptions));
        const __gotots_receiver_0 = fh;
        const __gotots_argument_1 = goInterfaceNonNil<FileHandle>(__gotots_receiver_0).Content();
        const __gotots_argument_2 = ParseCacheKey.$storageOf(key).ScriptKind;
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = ParseSourceFile__from_parser(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        const __gotots_receiver_1 = fh;
        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash = goInterfaceNonNil<FileHandle>(__gotots_receiver_1).Hash();
        return file;
    });
}
