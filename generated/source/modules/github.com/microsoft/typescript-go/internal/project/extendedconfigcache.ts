import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExtendedConfigCache as ExtendedConfigCache__from_tsoptions, ParseConfigHost as ParseConfigHost__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FileHandle } from "./overlayfs.js";
import type { OwnerCache } from "./ownercache.js";
import type { FileSource } from "./snapshotfs.js";
import type { bool, gostring, uint64 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { ExtendedConfigCacheEntry as ExtendedConfigCacheEntry__from_tsoptions, ParseExtendedConfig as ParseExtendedConfig__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Hasher as Hasher__from_xxh3, New as New__from_xxh3, Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { NewOwnerCache } from "./ownercache.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class ExtendedConfigParseArgs {
    declare private readonly $goType: void;
    public constructor(public FileName: gostring, public Content: gostring, public FS: FileSource | undefined, public ResolutionStack: RuntimeSlice<gostring>, public Host: ParseConfigHost__from_tsoptions | undefined, public Cache: ExtendedConfigCache__from_tsoptions | undefined) {
    }
    static $copy($source: ExtendedConfigParseArgs): ExtendedConfigParseArgs {
        return new ExtendedConfigParseArgs($source.FileName, $source.Content, $source.FS, $source.ResolutionStack, $source.Host, $source.Cache);
    }
    declare private readonly then?: never;
}
export class ExtendedConfigCacheEntry {
    declare private readonly $goType: void;
    public constructor(public ExtendedConfigCacheEntry: {
        value: ExtendedConfigCacheEntry__from_tsoptions;
    } | undefined, public Hash: Uint128__from_xxh3) {
    }
    static $copy($source: ExtendedConfigCacheEntry): ExtendedConfigCacheEntry {
        return new ExtendedConfigCacheEntry($source.ExtendedConfigCacheEntry, Uint128__from_xxh3.$copy($source.Hash));
    }
    static $equal($left: ExtendedConfigCacheEntry, $right: ExtendedConfigCacheEntry): bool {
        return $left.ExtendedConfigCacheEntry
            ===
                $right.ExtendedConfigCacheEntry
            && Uint128__from_xxh3.$equal($left.Hash, $right.Hash);
    }
    static $hash($source: ExtendedConfigCacheEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.ExtendedConfigCacheEntry));
        $hash = GoMapHash.mix($hash, Uint128__from_xxh3.$hash($source.Hash));
        return $hash;
    }
    declare private readonly then?: never;
}
export function NewExtendedConfigCache(): {
    value: OwnerCache<Path__from_tspath, {
        value: ExtendedConfigCacheEntry;
    } | undefined, ExtendedConfigParseArgs>;
} | undefined {
    return NewOwnerCache<Path__from_tspath, {
        value: ExtendedConfigCacheEntry;
    } | undefined, ExtendedConfigParseArgs>((path: Path__from_tspath, args: ExtendedConfigParseArgs): {
        value: ExtendedConfigCacheEntry;
    } | undefined => {
        let result: {
            value: ExtendedConfigCacheEntry;
        } | undefined = { value: new ExtendedConfigCacheEntry(ParseExtendedConfig__from_tsoptions(args.FileName, path, args.ResolutionStack, args.Host, args.Cache), Uint128__from_xxh3.$zero()) };
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hash = hash((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedConfigCacheEntry, ExtendedConfigParseArgs.$copy(args));
        return result;
    }, (path: Path__from_tspath, entry: {
        value: ExtendedConfigCacheEntry;
    } | undefined, args: ExtendedConfigParseArgs): bool => {
        return Uint128__from_xxh3.$equal((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hash, Uint128__from_xxh3.$fromStorage({
            Hi: 0n,
            Lo: 0n
        })) || !Uint128__from_xxh3.$equal((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hash, hash((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedConfigCacheEntry, ExtendedConfigParseArgs.$copy(args)));
    });
}
export function hash(entry: {
    value: ExtendedConfigCacheEntry__from_tsoptions;
} | undefined, args: ExtendedConfigParseArgs): Uint128__from_xxh3 {
    let hasher: tsonicTypeScriptRuntime.Location<Hasher__from_xxh3> | undefined = New__from_xxh3();
    const __gotots_results_0 = Hasher__from_xxh3.WriteString(hasher, args.Content);
    const __gotots_range_0 = ExtendedConfigCacheEntry__from_tsoptions.ExtendedFileNames(entry);
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let fileName = __gotots_range_value_0;
        const __gotots_receiver_0 = args.FS;
        const __gotots_argument_0 = fileName;
        let fh: FileHandle | undefined = goInterfaceNonNil<FileSource>(__gotots_receiver_0).GetFile(__gotots_argument_0);
        if (fh === undefined) {
            return Uint128__from_xxh3.$fromStorage({
                Hi: 0n,
                Lo: 0n
            });
        }
        const __gotots_receiver_2 = hasher;
        const __gotots_receiver_1 = fh;
        const __gotots_argument_1 = goInterfaceNonNil<FileHandle>(__gotots_receiver_1).Content();
        const __gotots_results_1 = Hasher__from_xxh3.WriteString(__gotots_receiver_2, __gotots_argument_1);
    }
    return Hasher__from_xxh3.Sum128(hasher);
}
