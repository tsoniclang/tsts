import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ECMALineStarts as ECMALineStarts__from_core, ScriptKind as ScriptKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { LSPLineMap as LSPLineMap__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import type { PositionEncodingKind as PositionEncodingKind__from_lsproto, TextDocumentContentChangePartial as TextDocumentContentChangePartial__from_lsproto, TextDocumentContentChangeWholeDocument as TextDocumentContentChangeWholeDocument__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { ECMALineInfo as ECMALineInfo__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { FileChange$Storage as FileChange__from_project$Storage } from "./filechange.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import { ComputeECMALineStarts as ComputeECMALineStarts__from_core, GetScriptKindFromFileName as GetScriptKindFromFileName__from_core, ScriptKindUnknown$constant as ScriptKindUnknown$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ComputeLSPLineStarts as ComputeLSPLineStarts__from_lsconv, Converters as Converters__from_lsconv, LanguageKindToScriptKind as LanguageKindToScriptKind__from_lsconv, NewConverters as NewConverters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { DocumentUri as DocumentUri__from_lsproto, LanguageKind as LanguageKind__from_lsproto, TextDocumentContentChangePartialOrWholeDocument as TextDocumentContentChangePartialOrWholeDocument__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { CreateECMALineInfo as CreateECMALineInfo__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import { IsDynamicFileName as IsDynamicFileName__from_tspath, Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { HashString128 as HashString128__from_xxh3, Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Set$Add$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay$Named_tspath$Path$PointerTo_Named_project$Overlay } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { $goInterfaceAdapter$Named_lsproto$DocumentUri, $goInterfaceAdapter$PointerTo_Named_project$Overlay, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Content$void_to_string, $goInterfaceMethod$ECMALineInfo$void_to_PointerTo_Named_sourcemap$ECMALineInfo, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Hash$void_to_Named_xxh3$Uint128, $goInterfaceMethod$IsOverlay$void_to_bool, $goInterfaceMethod$Kind$void_to_Named_core$ScriptKind, $goInterfaceMethod$LSPLineMap$void_to_PointerTo_Named_lsconv$LSPLineMap, $goInterfaceMethod$MatchesDiskText$void_to_bool, $goInterfaceMethod$Version$void_to_int32 } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay as GoMap } from "../../../../../../support/maps.js";
import { FileChange, FileChangeKind, FileChangeSummary } from "./filechange.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMapValue } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface FileHandle extends GoInterfaceValue {
    Content(): gostring;
    ECMALineInfo(): {
        value: ECMALineInfo__from_sourcemap;
    } | undefined;
    FileName(): gostring;
    Hash(): Uint128__from_xxh3;
    IsOverlay(): bool;
    Kind(): ScriptKind__from_core;
    LSPLineMap(): {
        value: LSPLineMap__from_lsconv;
    } | undefined;
    MatchesDiskText(): bool;
    Version(): int32;
}
export const FileHandle$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Content$void_to_string, $goInterfaceMethod$ECMALineInfo$void_to_PointerTo_Named_sourcemap$ECMALineInfo, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Hash$void_to_Named_xxh3$Uint128, $goInterfaceMethod$IsOverlay$void_to_bool, $goInterfaceMethod$Kind$void_to_Named_core$ScriptKind, $goInterfaceMethod$LSPLineMap$void_to_PointerTo_Named_lsconv$LSPLineMap, $goInterfaceMethod$MatchesDiskText$void_to_bool, $goInterfaceMethod$Version$void_to_int32]);
export function FileHandle$is(value: GoInterfaceValue | undefined): value is FileHandle {
    return value !== undefined && value.$go$implements(FileHandle$contract);
}
export class fileBase {
    declare private readonly $goType: void;
    public constructor(public fileName: gostring, public content: gostring, public hash: Uint128__from_xxh3, public lineMapOnce: sync__from_gostdlib.Once, public lineMap: {
        value: LSPLineMap__from_lsconv;
    } | undefined, public lineInfoOnce: sync__from_gostdlib.Once, public lineInfo: {
        value: ECMALineInfo__from_sourcemap;
    } | undefined) {
    }
    static $copy($source: fileBase): fileBase {
        return new fileBase($source.fileName, $source.content, Uint128__from_xxh3.$copy($source.hash), named_sync.SyncOnceOperations.$copy($source.lineMapOnce), $source.lineMap, named_sync.SyncOnceOperations.$copy($source.lineInfoOnce), $source.lineInfo);
    }
    static $equal($left: fileBase, $right: fileBase): bool {
        return $left.fileName === $right.fileName && $left.content === $right.content && Uint128__from_xxh3.$equal($left.hash, $right.hash) && named_sync.SyncOnceOperations.$equal($left.lineMapOnce, $right.lineMapOnce) &&
            $left.lineMap
                ===
                    $right.lineMap && named_sync.SyncOnceOperations.$equal($left.lineInfoOnce, $right.lineInfoOnce) &&
            $left.lineInfo
                ===
                    $right.lineInfo;
    }
    static $hash($source: fileBase): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.fileName));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.content));
        $hash = GoMapHash.mix($hash, Uint128__from_xxh3.$hash($source.hash));
        $hash = GoMapHash.mix($hash, named_sync.SyncOnceOperations.$hash($source.lineMapOnce));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.lineMap));
        $hash = GoMapHash.mix($hash, named_sync.SyncOnceOperations.$hash($source.lineInfoOnce));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.lineInfo));
        return $hash;
    }
    declare private readonly then?: never;
    static Content(f: tsonicTypeScriptRuntime.Location<fileBase> | undefined): gostring {
        return ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.content;
    }
    static ECMALineInfo(f: tsonicTypeScriptRuntime.Location<fileBase> | undefined): {
        value: ECMALineInfo__from_sourcemap;
    } | undefined {
        sync__from_gostdlib.Once.Do(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.lineInfoOnce, (): void => {
            let lineStarts: ECMALineStarts__from_core = ComputeECMALineStarts__from_core(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.content);
            ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.lineInfo = CreateECMALineInfo__from_sourcemap(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.content, lineStarts);
        });
        return ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.lineInfo;
    }
    static FileName(f: tsonicTypeScriptRuntime.Location<fileBase> | undefined): gostring {
        return ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.fileName;
    }
    static Hash(f: tsonicTypeScriptRuntime.Location<fileBase> | undefined): Uint128__from_xxh3 {
        return Uint128__from_xxh3.$copy(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.hash);
    }
    static LSPLineMap(f: tsonicTypeScriptRuntime.Location<fileBase> | undefined): {
        value: LSPLineMap__from_lsconv;
    } | undefined {
        sync__from_gostdlib.Once.Do(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.lineMapOnce, (): void => {
            ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.lineMap = ComputeLSPLineStarts__from_lsconv(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.content);
        });
        return ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileBase>).value.lineMap;
    }
}
export class diskFile {
    declare private readonly $goType: void;
    public constructor(public fileBase: fileBase, public needsReload: bool, public realpathPath: Path__from_tspath) {
    }
    static $copy($source: diskFile): diskFile {
        return new diskFile(fileBase.$copy($source.fileBase), $source.needsReload, $source.realpathPath);
    }
    static $equal($left: diskFile, $right: diskFile): bool {
        return fileBase.$equal($left.fileBase, $right.fileBase) && $left.needsReload === $right.needsReload && $left.realpathPath.$value === $right.realpathPath.$value;
    }
    static $hash($source: diskFile): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, fileBase.$hash($source.fileBase));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.needsReload));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.realpathPath.$value));
        return $hash;
    }
    declare private readonly then?: never;
    static Clone(f: tsonicTypeScriptRuntime.Location<diskFile> | undefined): tsonicTypeScriptRuntime.Location<diskFile> | undefined {
        return tsonicTypeScriptRuntime.location<diskFile>(new diskFile(new fileBase(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.fileName, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.content, Uint128__from_xxh3.$copy(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.hash), named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero(), void 0), false, ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.realpathPath));
    }
    static IsOverlay(f: tsonicTypeScriptRuntime.Location<diskFile> | undefined): bool {
        return false;
    }
    static Kind(f: tsonicTypeScriptRuntime.Location<diskFile> | undefined): ScriptKind__from_core {
        return GetScriptKindFromFileName__from_core(((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.fileName);
    }
    static MatchesDiskText(f: tsonicTypeScriptRuntime.Location<diskFile> | undefined): bool {
        return !((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.needsReload;
    }
    static Version(f: tsonicTypeScriptRuntime.Location<diskFile> | undefined): int32 {
        return 0;
    }
}
export function newDiskFile(fileName: gostring, content: gostring): tsonicTypeScriptRuntime.Location<diskFile> | undefined {
    return tsonicTypeScriptRuntime.location<diskFile>(new diskFile(new fileBase(fileName, content, HashString128__from_xxh3(content), named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero(), void 0), false, new Path__from_tspath("")));
}
export class Overlay {
    declare private readonly $goType: void;
    public constructor(public fileBase: fileBase, public version: int32, public kind: ScriptKind__from_core, public matchesDiskText: bool) {
    }
    static $copy($source: Overlay): Overlay {
        return new Overlay(fileBase.$copy($source.fileBase), $source.version, $source.kind, $source.matchesDiskText);
    }
    static $equal($left: Overlay, $right: Overlay): bool {
        return fileBase.$equal($left.fileBase, $right.fileBase) && $left.version === $right.version && $left.kind === $right.kind && $left.matchesDiskText === $right.matchesDiskText;
    }
    static $hash($source: Overlay): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, fileBase.$hash($source.fileBase));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.version));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.matchesDiskText));
        return $hash;
    }
    declare private readonly then?: never;
    static IsOverlay(o: tsonicTypeScriptRuntime.Location<Overlay> | undefined): bool {
        return true;
    }
    static Kind(o: tsonicTypeScriptRuntime.Location<Overlay> | undefined): ScriptKind__from_core {
        return ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.kind;
    }
    static MatchesDiskText(o: tsonicTypeScriptRuntime.Location<Overlay> | undefined): bool {
        return ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.matchesDiskText;
    }
    static Text(o: tsonicTypeScriptRuntime.Location<Overlay> | undefined): gostring {
        return ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.content;
    }
    static Version(o: tsonicTypeScriptRuntime.Location<Overlay> | undefined): int32 {
        return ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.version;
    }
    static $go$private$project$computeMatchesDiskText(o: tsonicTypeScriptRuntime.Location<Overlay> | undefined, fs: FS__from_vfs | undefined): [
        bool,
        bool
    ] {
        let matchesDiskText: bool = false;
        let exists: bool = false;
        if (IsDynamicFileName__from_tspath(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.fileName)) {
            return [false, false];
        }
        const __gotots_receiver_2 = fs;
        const __gotots_argument_14 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.fileName;
        const __gotots_results_2 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).ReadFile(__gotots_argument_14);
        let diskContent = __gotots_results_2[0];
        let ok = __gotots_results_2[1];
        if (!ok) {
            return [false, false];
        }
        return [Uint128__from_xxh3.$equal(HashString128__from_xxh3(diskContent), ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.hash), true];
    }
}
export function newOverlay(fileName: gostring, content: gostring, version: int32, kind: ScriptKind__from_core): tsonicTypeScriptRuntime.Location<Overlay> | undefined {
    return tsonicTypeScriptRuntime.location<Overlay>(new Overlay(new fileBase(fileName, content, HashString128__from_xxh3(content), named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero(), void 0), version, kind, false));
}
export class overlayFS {
    declare private readonly $goType: void;
    public constructor(public toPath: (($0: gostring) => Path__from_tspath) | undefined, public fs: FS__from_vfs | undefined, public positionEncoding: PositionEncodingKind__from_lsproto, public mu: sync__from_gostdlib.RWMutex, public overlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>) {
    }
    static $copy($source: overlayFS): overlayFS {
        return new overlayFS($source.toPath, $source.fs, $source.positionEncoding, named_sync.SyncRWMutexOperations.$copy($source.mu), $source.overlays);
    }
    declare private readonly then?: never;
    static Overlays(fs: {
        value: overlayFS;
    } | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined> = GoMap.nil();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.RWMutex.RLock((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0: overlayFS["mu"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncRWMutexRUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    __gotots_return_0 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$project$processChanges(fs: {
        value: overlayFS;
    } | undefined, changes: RuntimeSlice<FileChange__from_project$Storage>): [
        FileChangeSummary,
        GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>
    ] {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            FileChangeSummary,
            GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>
        ] = [FileChangeSummary.$zero(), GoMap.nil()];
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.RWMutex.Lock((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0: overlayFS["mu"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncRWMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    let result = FileChangeSummary.$zero();
                    let newOverlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined> = Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay$Named_tspath$Path$PointerTo_Named_project$Overlay((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays);
                    class fileEvents {
                        declare private readonly $goType: void;
                        public constructor(public openChange: tsonicTypeScriptRuntime.Location<FileChange> | undefined, public closeChange: tsonicTypeScriptRuntime.Location<FileChange> | undefined, public watchChanged: bool, public changes: RuntimeSlice<tsonicTypeScriptRuntime.Location<FileChange> | undefined>, public saved: bool, public created: bool, public deleted: bool) {
                        }
                        declare private readonly then?: never;
                    }
                    class $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents extends GoMapValue<DocumentUri__from_lsproto, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> {
                        private constructor(private readonly zeroValue: tsonicTypeScriptRuntime.Location<fileEvents> | undefined, private readonly values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined) {
                            super();
                        }
                        private static $zeroValue(): tsonicTypeScriptRuntime.Location<fileEvents> | undefined {
                            return void 0;
                        }
                        private static $copyValue($value: tsonicTypeScriptRuntime.Location<fileEvents> | undefined): tsonicTypeScriptRuntime.Location<fileEvents> | undefined {
                            return $value;
                        }
                        private static $projectKey($key: DocumentUri__from_lsproto): gostring {
                            return $key.$value;
                        }
                        private static $reifyKey($storageKey: gostring): DocumentUri__from_lsproto {
                            return new DocumentUri__from_lsproto($storageKey);
                        }
                        static nil(): $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents {
                            return new $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents($goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$zeroValue(), undefined);
                        }
                        static make(size: number | bigint, entries: [
                            DocumentUri__from_lsproto,
                            tsonicTypeScriptRuntime.Location<fileEvents> | undefined
                        ][]): $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents {
                            const result: $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents = new $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents($goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$zeroValue(), new Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined>);
                            for (const entry of entries) {
                                result.store(entry[0], entry[1]);
                            }
                            return result;
                        }
                        lookup(key: DocumentUri__from_lsproto): tsonicTypeScriptRuntime.Location<fileEvents> | undefined {
                            const storageKey: gostring = $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$projectKey(key);
                            const values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined = this.values;
                            if (values === undefined) {
                                return $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(this.zeroValue);
                            }
                            const storedValue: (tsonicTypeScriptRuntime.Location<fileEvents> | undefined) | undefined = values.get(storageKey);
                            return $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(storedValue === undefined ? this.zeroValue : storedValue);
                        }
                        lookupOk(key: DocumentUri__from_lsproto): [
                            tsonicTypeScriptRuntime.Location<fileEvents> | undefined,
                            boolean
                        ] {
                            const storageKey: gostring = $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$projectKey(key);
                            const values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined = this.values;
                            if (values === undefined) {
                                return [$goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(this.zeroValue), false];
                            }
                            const storedValue: (tsonicTypeScriptRuntime.Location<fileEvents> | undefined) | undefined = values.get(storageKey);
                            if (storedValue === undefined) {
                                if (!values.has(storageKey)) {
                                    return [$goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(this.zeroValue), false];
                                }
                                return [$goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(this.zeroValue), true];
                            }
                            return [$goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(storedValue), true];
                        }
                        store(key: DocumentUri__from_lsproto, value: tsonicTypeScriptRuntime.Location<fileEvents> | undefined): void {
                            const storageKey: gostring = $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$projectKey(key);
                            const values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined = this.values;
                            if (values === undefined)
                                GoPanic.raiseRuntime("assignment to entry in nil map");
                            values.set(storageKey, $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$copyValue(value));
                        }
                        delete(key: DocumentUri__from_lsproto): void {
                            const storageKey: gostring = $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$projectKey(key);
                            const values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined = this.values;
                            if (!(values === undefined))
                                values.delete(storageKey);
                        }
                        length(): number {
                            return this.values === undefined ? 0 : this.values.size;
                        }
                        isNil(): boolean {
                            return this.values === undefined;
                        }
                        clear(): void {
                            const values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined = this.values;
                            if (!(values === undefined))
                                values.clear();
                        }
                        keys(): DocumentUri__from_lsproto[] {
                            const result: DocumentUri__from_lsproto[] = [];
                            const values: Map<gostring, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> | undefined = this.values;
                            if (values === undefined) {
                                return result;
                            }
                            for (const storageKey of values.keys()) {
                                result.push($goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.$reifyKey(storageKey));
                            }
                            return result;
                        }
                    }
                    let fileEventMap: GoMapValue<DocumentUri__from_lsproto, tsonicTypeScriptRuntime.Location<fileEvents> | undefined> = $goMap$MapOf_Named_lsproto$DocumentUri_To_PointerTo_Named_fileEvents.make(0, []);
                    const __gotots_range_0 = changes;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = FileChange.$copy(FileChange.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                        let change = __gotots_range_value_0;
                        const change$location = tsonicTypeScriptRuntime.boundLocation({}, () => change, change$next => change = change$next);
                        let uri = new DocumentUri__from_lsproto(FileChange.$storageOf(change).URI);
                        const __gotots_results_0 = fileEventMap.lookupOk(uri);
                        let events: tsonicTypeScriptRuntime.Location<fileEvents> | undefined = __gotots_results_0[0];
                        let exists = __gotots_results_0[1];
                        if (exists) {
                            if (!(((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange === undefined)) {
                                const __gotots_argument_0 = new GoInterfaceAdapter("should see no changes after open");
                                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                            }
                        }
                        else {
                            events =
                                tsonicTypeScriptRuntime.location<fileEvents>(new fileEvents(void 0, void 0, false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<FileChange> | undefined>(), false, false, false));
                            fileEventMap.store(uri, events);
                        }
                        if (!result.IncludesWatchChangeOutsideNodeModules && new FileChangeKind(FileChange.$storageOf(change).Kind).IsWatchKind() && !strings__from_gostdlib.Contains(uri.$value, "/node_modules/")) {
                            result.IncludesWatchChangeOutsideNodeModules = true;
                        }
                        switch (((void FileChangeKind,
                            FileChange.$storageOf(change).Kind) as number)) {
                            case 0: {
                                if (!(((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.closeChange === undefined)) {
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.closeChange = void 0;
                                }
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange =
                                    change$location;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged = false;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.changes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<FileChange> | undefined>();
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved = false;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.created = false;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.deleted = false;
                                break;
                            }
                            case 1: {
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.closeChange =
                                    change$location;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.changes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<FileChange> | undefined>();
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved = false;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged = false;
                                break;
                            }
                            case 2: {
                                if (!(((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.closeChange === undefined)) {
                                    const __gotots_argument_1 = new GoInterfaceAdapter("should see no changes after close");
                                    GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                                }
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.changes = ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.changes.append(void 0, [
                                    change$location,
                                ]);
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved = false;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged = false;
                                break;
                            }
                            case 3: {
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved = true;
                                break;
                            }
                            case 4: {
                                if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.deleted) {
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.deleted = false;
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged = true;
                                }
                                else {
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.created = true;
                                }
                                break;
                            }
                            case 5: {
                                if (!((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.created) {
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged = true;
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved = false;
                                }
                                break;
                            }
                            case 6: {
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged = false;
                                ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved = false;
                                if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.created) {
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.created = false;
                                }
                                else {
                                    ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.deleted = true;
                                }
                                break;
                            }
                        }
                    }
                    const __gotots_range_1 = fileEventMap;
                    const __gotots_range_keys_0 = __gotots_range_1.keys();
                    for (const __gotots_range_value_1 of __gotots_range_keys_0) {
                        const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
                        if (!__gotots_range_value_2[1]) {
                            continue;
                        }
                        const __gotots_range_value_3 = __gotots_range_value_1;
                        const __gotots_range_value_4 = __gotots_range_value_2[0];
                        let uri = __gotots_range_value_3;
                        let events: tsonicTypeScriptRuntime.Location<fileEvents> | undefined = __gotots_range_value_4;
                        const __gotots_receiver_2 = uri;
                        const __gotots_receiver_1: overlayFS["fs"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                        const __gotots_argument_2 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).UseCaseSensitiveFileNames();
                        let path = __gotots_receiver_2.Path(__gotots_argument_2);
                        let o: tsonicTypeScriptRuntime.Location<Overlay> | undefined = newOverlays.lookup(path);
                        if (!(((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange === undefined)) {
                            if (!(result.Opened.$value ===
                                ((void DocumentUri__from_lsproto,
                                    "") as string)) || !(result.Reopened.$value ===
                                ((void DocumentUri__from_lsproto,
                                    "") as string))) {
                                const __gotots_argument_3 = new GoInterfaceAdapter("can only process one file open event at a time");
                                GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
                            }
                            let __gotots_logical_result_0 = !(o === undefined);
                            if (__gotots_logical_result_0) {
                                const __gotots_store_0 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                const __gotots_binary_operand_0 = fileBase.Content(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "fileBase"));
                                const __gotots_binary_operand_1 = FileChange.$storageOf(((((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Content;
                                __gotots_logical_result_0 = __gotots_binary_operand_0 !== __gotots_binary_operand_1;
                            }
                            if (__gotots_logical_result_0) {
                                const __gotots_store_1 = result;
                                Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Changed"), uri);
                            }
                            else if (o === undefined) {
                                result.Opened = uri;
                            }
                            else {
                                result.Reopened = uri;
                            }
                            let scriptKind = LanguageKindToScriptKind__from_lsconv(new LanguageKind__from_lsproto(FileChange.$storageOf(((((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).LanguageKind));
                            if (scriptKind === ScriptKindUnknown$constant__from_core()) {
                                scriptKind = GetScriptKindFromFileName__from_core(uri.FileName());
                            }
                            newOverlays.store(path, newOverlay(uri.FileName(), FileChange.$storageOf(((((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Content, FileChange.$storageOf(((((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.openChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Version, scriptKind));
                            continue;
                        }
                        if (!(((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.closeChange === undefined)) {
                            if (o === undefined) {
                                const __gotots_argument_4 = new $goInterfaceAdapter$Named_lsproto$DocumentUri(new DocumentUri__from_lsproto("overlay not found for closed file: " + uri.$value));
                                GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
                            }
                            const __gotots_store_2 = result;
                            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Closed"), uri);
                            newOverlays.delete(path);
                            o = void 0;
                        }
                        if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged) {
                            if (o === undefined) {
                                const __gotots_store_3 = result;
                                Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Changed"), uri);
                            }
                            else if (!(o === undefined) && !((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved) {
                                {
                                    const __gotots_results_1 = Overlay.$go$private$project$computeMatchesDiskText(o, (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs);
                                    let matchesDiskText = __gotots_results_1[0];
                                    if (matchesDiskText !== Overlay.MatchesDiskText(o)) {
                                        const __gotots_store_4 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                        const __gotots_argument_5 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "fileBase"));
                                        const __gotots_store_5 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                        const __gotots_argument_6 = fileBase.Content(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "fileBase"));
                                        const __gotots_argument_7 = Overlay.Version(o);
                                        const __gotots_argument_8 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.kind;
                                        o = newOverlay(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                                        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.matchesDiskText = matchesDiskText;
                                        newOverlays.store(path, o);
                                    }
                                }
                            }
                        }
                        if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.changes.length > 0) {
                            const __gotots_store_6 = result;
                            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Changed"), uri);
                            if (o === undefined) {
                                const __gotots_argument_9 = new $goInterfaceAdapter$Named_lsproto$DocumentUri(new DocumentUri__from_lsproto("overlay not found for changed file: " + uri.$value));
                                GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
                            }
                            const __gotots_range_2 = ((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.changes;
                            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
                                const __gotots_range_value_5 = __gotots_range_2.get(__gotots_range_index_1);
                                let change: tsonicTypeScriptRuntime.Location<FileChange> | undefined = __gotots_range_value_5;
                                let converters: {
                                    value: Converters__from_lsconv;
                                } | undefined = NewConverters__from_lsconv((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding, (fileName: gostring): {
                                    value: LSPLineMap__from_lsconv;
                                } | undefined => {
                                    const __gotots_store_7 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                    return fileBase.LSPLineMap(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "fileBase"));
                                });
                                const __gotots_range_3 = FileChange.$storageOf(((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Changes;
                                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                                    const __gotots_range_value_6 = TextDocumentContentChangePartialOrWholeDocument__from_lsproto.$copy(TextDocumentContentChangePartialOrWholeDocument__from_lsproto.$fromStorage(__gotots_range_3.get(__gotots_range_index_2)));
                                    let textChange = __gotots_range_value_6;
                                    {
                                        let partialChange: {
                                            value: TextDocumentContentChangePartial__from_lsproto;
                                        } | undefined = TextDocumentContentChangePartialOrWholeDocument__from_lsproto.$storageOf(textChange).Partial;
                                        if (!(partialChange === undefined)) {
                                            let newContent = Converters__from_lsconv.FromLSPTextChange(converters, new $goInterfaceAdapter$PointerTo_Named_project$Overlay(o), partialChange).ApplyTo(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.content);
                                            o = newOverlay(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.fileName, newContent, FileChange.$storageOf(((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Version, ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.kind);
                                        }
                                        else {
                                            let wholeChange: {
                                                value: TextDocumentContentChangeWholeDocument__from_lsproto;
                                            } | undefined = TextDocumentContentChangePartialOrWholeDocument__from_lsproto.$storageOf(textChange).WholeDocument;
                                            if (!(wholeChange === undefined)) {
                                                o = newOverlay(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.fileName, (wholeChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Text, FileChange.$storageOf(((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Version, ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.kind);
                                            }
                                        }
                                    }
                                }
                                if (FileChange.$storageOf(((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Changes.length > 0) {
                                    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.version = FileChange.$storageOf(((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FileChange>).value).Version;
                                    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.hash = HashString128__from_xxh3(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.fileBase.content);
                                    ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.matchesDiskText = false;
                                    newOverlays.store(path, o);
                                }
                            }
                        }
                        if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.saved) {
                            if (!(o === undefined)) {
                                const __gotots_store_8 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                const __gotots_argument_10 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "fileBase"));
                                const __gotots_store_9 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                const __gotots_argument_11 = fileBase.Content(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "fileBase"));
                                const __gotots_argument_12 = Overlay.Version(o);
                                const __gotots_argument_13 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.kind;
                                o = newOverlay(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
                                ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value.matchesDiskText = true;
                                newOverlays.store(path, o);
                            }
                            else if (!((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.watchChanged) {
                                const __gotots_store_10 = result;
                                Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Changed"), uri);
                            }
                        }
                        if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.created && o === undefined) {
                            const __gotots_store_11 = result;
                            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Created"), uri);
                        }
                        if (((events ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileEvents>).value.deleted && o === undefined) {
                            const __gotots_store_12 = result;
                            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Deleted"), uri);
                        }
                    }
                    (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays = newOverlays;
                    __gotots_return_0 = [FileChangeSummary.$copy(result), newOverlays];
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
}
export function newOverlayFS(fs: FS__from_vfs | undefined, overlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>, positionEncoding: PositionEncodingKind__from_lsproto, toPath: (($0: gostring) => Path__from_tspath) | undefined): {
    value: overlayFS;
} | undefined {
    return { value: new overlayFS(toPath, fs, positionEncoding, named_sync.SyncRWMutexOperations.$zero(), overlays) };
}
