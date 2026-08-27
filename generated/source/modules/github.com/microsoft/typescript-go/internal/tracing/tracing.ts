import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int, int32, uint32, uint64 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { EscapeAllInternalSymbolNames as EscapeAllInternalSymbolNames__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Deterministic as Deterministic__from_json__package_1, MarshalIndent as MarshalIndent__from_json__package_1, MarshalWrite as MarshalWrite__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { GetECMALineAndUTF16CharacterOfPosition as GetECMALineAndUTF16CharacterOfPosition__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/state.js";
import { CombinePaths as CombinePaths__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Hasher as Hasher__from_xxh3, New as New__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Clone$MapOf_string_To_Interface_void$string$Interface_void } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { Clone$SliceOf_Named_tracing$TracedType$Named_tracing$TracedType } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { SortFunc$SliceOf_Named_tracing$TraceRecord$Named_tracing$TraceRecord } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_tracing$TypeDescriptor, $goInterfaceAdapter$Named_tracing$traceEvent, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$PointerTo_Named_tracing$typeTracer, $goInterfaceAdapter$SliceOf_Named_tracing$TraceRecord, $goInterfaceAdapter$int, $goInterfaceAdapter$uint32, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$AliasSymbol$void_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$AliasTypeArguments$void_to_SliceOf_Named_tracing$TracedType, $goInterfaceMethod$ConditionalCheckType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ConditionalExtendsType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ConditionalFalseType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ConditionalTrueType$void_to_Named_tracing$TracedType, $goInterfaceMethod$Display$void_to_string, $goInterfaceMethod$DumpTypes$void_to_Named_error, $goInterfaceMethod$EvolvingArrayElementType$void_to_Named_tracing$TracedType, $goInterfaceMethod$EvolvingArrayFinalType$void_to_Named_tracing$TracedType, $goInterfaceMethod$FormatFlags$void_to_SliceOf_string, $goInterfaceMethod$Id$void_to_uint32, $goInterfaceMethod$IndexType$void_to_Named_tracing$TracedType, $goInterfaceMethod$IndexedAccessIndexType$void_to_Named_tracing$TracedType, $goInterfaceMethod$IndexedAccessObjectType$void_to_Named_tracing$TracedType, $goInterfaceMethod$IntersectionTypes$void_to_SliceOf_Named_tracing$TracedType, $goInterfaceMethod$IntrinsicName$void_to_string, $goInterfaceMethod$IsConditional$void_to_bool, $goInterfaceMethod$IsTuple$void_to_bool, $goInterfaceMethod$Pattern$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$RecordType$Named_tracing$TracedType_to_void, $goInterfaceMethod$RecursionIdentity$void_to_Interface_void, $goInterfaceMethod$ReferenceNode$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$ReferenceTarget$void_to_Named_tracing$TracedType, $goInterfaceMethod$ReferenceTypeArguments$void_to_SliceOf_Named_tracing$TracedType, $goInterfaceMethod$ReverseMappedConstraintType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ReverseMappedMappedType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ReverseMappedSourceType$void_to_Named_tracing$TracedType, $goInterfaceMethod$SubstitutionBaseType$void_to_Named_tracing$TracedType, $goInterfaceMethod$SubstitutionConstraintType$void_to_Named_tracing$TracedType, $goInterfaceMethod$Symbol$void_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$UnionTypes$void_to_SliceOf_Named_tracing$TracedType } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Interface_void_To_int, $goMap$MapOf_int_To_Named_tracing$traceThreadKey, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_Named_tracing$traceThreadKey_To_int as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goIntegerRemainder, goUint64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export interface Tracer extends GoInterfaceValue {
    DumpTypes(): GoInterface | undefined;
    RecordType($argument0: TracedType | undefined): void;
}
export const Tracer$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$DumpTypes$void_to_Named_error, $goInterfaceMethod$RecordType$Named_tracing$TracedType_to_void]);
export function Tracer$is(value: GoInterfaceValue | undefined): value is Tracer {
    return value !== undefined && value.$go$implements(Tracer$contract);
}
export interface TracedType extends GoInterfaceValue {
    AliasSymbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    AliasTypeArguments(): RuntimeSlice<TracedType | undefined>;
    ConditionalCheckType(): TracedType | undefined;
    ConditionalExtendsType(): TracedType | undefined;
    ConditionalFalseType(): TracedType | undefined;
    ConditionalTrueType(): TracedType | undefined;
    Display(): gostring;
    EvolvingArrayElementType(): TracedType | undefined;
    EvolvingArrayFinalType(): TracedType | undefined;
    FormatFlags(): RuntimeSlice<gostring>;
    Id(): uint32;
    IndexType(): TracedType | undefined;
    IndexedAccessIndexType(): TracedType | undefined;
    IndexedAccessObjectType(): TracedType | undefined;
    IntersectionTypes(): RuntimeSlice<TracedType | undefined>;
    IntrinsicName(): gostring;
    IsConditional(): bool;
    IsTuple(): bool;
    Pattern(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    RecursionIdentity(): $goInterface$Interface_void | undefined;
    ReferenceNode(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    ReferenceTarget(): TracedType | undefined;
    ReferenceTypeArguments(): RuntimeSlice<TracedType | undefined>;
    ReverseMappedConstraintType(): TracedType | undefined;
    ReverseMappedMappedType(): TracedType | undefined;
    ReverseMappedSourceType(): TracedType | undefined;
    SubstitutionBaseType(): TracedType | undefined;
    SubstitutionConstraintType(): TracedType | undefined;
    Symbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    UnionTypes(): RuntimeSlice<TracedType | undefined>;
}
export const TracedType$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AliasSymbol$void_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$AliasTypeArguments$void_to_SliceOf_Named_tracing$TracedType, $goInterfaceMethod$ConditionalCheckType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ConditionalExtendsType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ConditionalFalseType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ConditionalTrueType$void_to_Named_tracing$TracedType, $goInterfaceMethod$Display$void_to_string, $goInterfaceMethod$EvolvingArrayElementType$void_to_Named_tracing$TracedType, $goInterfaceMethod$EvolvingArrayFinalType$void_to_Named_tracing$TracedType, $goInterfaceMethod$FormatFlags$void_to_SliceOf_string, $goInterfaceMethod$Id$void_to_uint32, $goInterfaceMethod$IndexType$void_to_Named_tracing$TracedType, $goInterfaceMethod$IndexedAccessIndexType$void_to_Named_tracing$TracedType, $goInterfaceMethod$IndexedAccessObjectType$void_to_Named_tracing$TracedType, $goInterfaceMethod$IntersectionTypes$void_to_SliceOf_Named_tracing$TracedType, $goInterfaceMethod$IntrinsicName$void_to_string, $goInterfaceMethod$IsConditional$void_to_bool, $goInterfaceMethod$IsTuple$void_to_bool, $goInterfaceMethod$Pattern$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$RecursionIdentity$void_to_Interface_void, $goInterfaceMethod$ReferenceNode$void_to_PointerTo_Named_ast$Node, $goInterfaceMethod$ReferenceTarget$void_to_Named_tracing$TracedType, $goInterfaceMethod$ReferenceTypeArguments$void_to_SliceOf_Named_tracing$TracedType, $goInterfaceMethod$ReverseMappedConstraintType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ReverseMappedMappedType$void_to_Named_tracing$TracedType, $goInterfaceMethod$ReverseMappedSourceType$void_to_Named_tracing$TracedType, $goInterfaceMethod$SubstitutionBaseType$void_to_Named_tracing$TracedType, $goInterfaceMethod$SubstitutionConstraintType$void_to_Named_tracing$TracedType, $goInterfaceMethod$Symbol$void_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$UnionTypes$void_to_SliceOf_Named_tracing$TracedType]);
export function TracedType$is(value: GoInterfaceValue | undefined): value is TracedType {
    return value !== undefined && value.$go$implements(TracedType$contract);
}
export type TraceRecord$Storage = {
    ConfigFilePath: gostring;
    TracePath: gostring;
    TypesPath: gostring;
    CheckerID: int;
};
export class TraceRecord implements GoContainerStoredValue<TraceRecord$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TraceRecord$Storage) {
    }
    public static $storageOf($source: TraceRecord): TraceRecord$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TraceRecord$Storage): TraceRecord {
        return new TraceRecord($source);
    }
    public get ConfigFilePath(): gostring {
        return this.$storage.ConfigFilePath;
    }
    public set ConfigFilePath($value: gostring) {
        this.$storage.ConfigFilePath = $value;
    }
    public get TracePath(): gostring {
        return this.$storage.TracePath;
    }
    public set TracePath($value: gostring) {
        this.$storage.TracePath = $value;
    }
    public get TypesPath(): gostring {
        return this.$storage.TypesPath;
    }
    public set TypesPath($value: gostring) {
        this.$storage.TypesPath = $value;
    }
    public get CheckerID(): int {
        return this.$storage.CheckerID;
    }
    public set CheckerID($value: int) {
        this.$storage.CheckerID = $value;
    }
    declare readonly [$goContainerStorageType]: TraceRecord$Storage;
    static $zero(): TraceRecord {
        return new TraceRecord({
            ConfigFilePath: "",
            TracePath: "",
            TypesPath: "",
            CheckerID: 0
        });
    }
    static $copy($source: TraceRecord): TraceRecord {
        return new TraceRecord({
            ConfigFilePath: $source.$storage.ConfigFilePath,
            TracePath: $source.$storage.TracePath,
            TypesPath: $source.$storage.TypesPath,
            CheckerID: $source.$storage.CheckerID
        });
    }
    static $equal($left: TraceRecord, $right: TraceRecord): bool {
        return $left.$storage.ConfigFilePath === $right.$storage.ConfigFilePath && $left.$storage.TracePath === $right.$storage.TracePath && $left.$storage.TypesPath === $right.$storage.TypesPath && $left.$storage.CheckerID === $right.$storage.CheckerID;
    }
    static $hash($source: TraceRecord): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.ConfigFilePath));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.TracePath));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.TypesPath));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.CheckerID));
        return $hash;
    }
    declare private readonly then?: never;
}
export class traceEvent {
    declare private readonly $goType: void;
    public constructor(public PID: int, public TID: int, public PH: gostring, public Cat: gostring, public TS: float64, public Name: gostring, public S: gostring, public Dur: tsonicTypeScriptRuntime.Location<float64> | undefined, public Args: GoMapValue<gostring, $goInterface$Interface_void | undefined>) {
    }
    static $copy($source: traceEvent): traceEvent {
        return new traceEvent($source.PID, $source.TID, $source.PH, $source.Cat, $source.TS, $source.Name, $source.S, $source.Dur, $source.Args);
    }
    declare private readonly then?: never;
}
export function sampleInterval$constant(): time__from_gostdlib.Duration {
    return named_time.TimeDurationValueOperations.$wrap(10000000n);
}
export const traceFileName$string: gostring = "trace.json";
export const mainThreadID$int: int = 1;
export const firstSyntheticThreadID$int: int = 2;
export const firstFileThreadID$int: int = 1000000;
export const fileThreadIDHashRange$uint64: uint64 = 1000000000n;
export const flushThreshold$int: int = 262144;
export class Tracing {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public traceDir: gostring, public tracePath: gostring, public configFilePath: gostring, public legend: RuntimeSlice<TraceRecord$Storage>, public tracers: RuntimeSlice<{
        value: typeTracer;
    } | undefined>, public traceContent: strings__from_gostdlib.Builder, public traceStarted: atomic__from_gostdlib.Bool, public threadIDs: GoMapValue<traceThreadKey, int>, public threadKeys: GoMapValue<int, traceThreadKey>, public metadataTS: float64, public deterministic: bool, public timestampCounter: uint64, public startTime: time__from_gostdlib.Time, public mu: sync__from_gostdlib.Mutex, public flushErr: GoInterface | undefined) {
    }
    static $copy($source: Tracing): Tracing {
        return new Tracing($source.fs, $source.traceDir, $source.tracePath, $source.configFilePath, $source.legend, $source.tracers, named_strings.StringsBuilderOperations.$copy($source.traceContent), named_sync_atomic.SyncAtomicBoolOperations.$copy($source.traceStarted), $source.threadIDs, $source.threadKeys, $source.metadataTS, $source.deterministic, $source.timestampCounter, named_time.TimeOperations.$copy($source.startTime), named_sync.SyncMutexOperations.$copy($source.mu), $source.flushErr);
    }
    declare private readonly then?: never;
    static Instant(tr: {
        value: Tracing;
    } | undefined, phase: Phase, name: gostring, args: GoMapValue<gostring, $goInterface$Interface_void | undefined>): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (tr === undefined || !atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_54 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_54, $go$recovery);
                    };
                    if (!atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
                        break __gotots_return_block_0;
                    }
                    let ts = Tracing.$go$private$tracing$timestamp(tr);
                    let tid = Tracing.$go$private$tracing$threadIDLocked(tr, args);
                    strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
                    Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, tid, "I", phase.$value, ts, name, "g", void 0, args));
                    Tracing.$go$private$tracing$maybeFlushLocked(tr);
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
    }
    static NewTypeTracer(tr: {
        value: Tracing;
    } | undefined, checkerIndex: int): Tracer | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: Tracer | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_52 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_52, $go$recovery);
                    };
                    let typesPath = CombinePaths__from_tspath((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceDir, RuntimeSlice.literal<gostring>([fmt__from_gostdlib.Sprintf("types_%d.json", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(checkerIndex)]))]));
                    let tracer: {
                        value: typeTracer;
                    } | undefined = { value: new typeTracer((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, checkerIndex, typesPath, RuntimeSlice.literal<TracedType | undefined>([]), named_sync.SyncMutexOperations.$zero()) };
                    (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracers = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracers.append(void 0, [tracer]);
                    const __gotots_slice_build_0 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.legend;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TraceRecord.$storageOf(TraceRecord.$fromStorage({
                            ConfigFilePath: (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath,
                            TracePath: (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracePath,
                            TypesPath: typesPath,
                            CheckerID: checkerIndex
                        })));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<TraceRecord$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, TraceRecord.$storageOf(TraceRecord.$copy(TraceRecord.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TraceRecord.$storageOf(TraceRecord.$fromStorage({
                            ConfigFilePath: (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath,
                            TracePath: (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracePath,
                            TypesPath: typesPath,
                            CheckerID: checkerIndex
                        })));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, TraceRecord.$storageOf(TraceRecord.$zero()));
                        }
                    }
                    (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.legend = __gotots_slice_build_1;
                    __gotots_return_0 = new $goInterfaceAdapter$PointerTo_Named_tracing$typeTracer(tracer);
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
    static Push(tr: {
        value: Tracing;
    } | undefined, phase: Phase, name: gostring, args: GoMapValue<gostring, $goInterface$Interface_void | undefined>, separateBeginAndEnd: bool): (() => void) | undefined {
        if (tr === undefined || !atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
            return (): void => {
            };
        }
        if (separateBeginAndEnd) {
            sync__from_gostdlib.Mutex.Lock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            if (!atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
                sync__from_gostdlib.Mutex.Unlock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                return (): void => {
                };
            }
            let ts = Tracing.$go$private$tracing$timestamp(tr);
            let tid = Tracing.$go$private$tracing$threadIDLocked(tr, args);
            strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
            Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, tid, "B", phase.$value, ts, name, "", void 0, args));
            Tracing.$go$private$tracing$maybeFlushLocked(tr);
            sync__from_gostdlib.Mutex.Unlock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return (): void => {
                let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_0: GoPanic | undefined = undefined;
                try {
                    try {
                        __gotots_return_block_0: {
                            sync__from_gostdlib.Mutex.Lock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                            const __gotots_receiver_51 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                            __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_51, $go$recovery);
                            };
                            if (!atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
                                break __gotots_return_block_0;
                            }
                            let endTs = Tracing.$go$private$tracing$timestamp(tr);
                            strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
                            Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, tid, "E", phase.$value, endTs, name, "", void 0, args));
                            Tracing.$go$private$tracing$maybeFlushLocked(tr);
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
            };
        }
        if ((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deterministic) {
            return (): void => {
            };
        }
        let startTime = time__from_gostdlib.Now();
        args = Clone$MapOf_string_To_Interface_void$string$Interface_void(args);
        return (): void => {
            let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_1: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_1: {
                        let dur = globalThis.Number(time__from_gostdlib.Since(named_time.TimeOperations.$copy(startTime)).Nanoseconds()) / 1000;
                        const dur$location = tsonicTypeScriptRuntime.boundLocation({}, () => dur, dur$next => dur = dur$next);
                        let startMicros = globalThis.Number(startTime.Sub(named_time.TimeOperations.$copy((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startTime)).Nanoseconds()) / 1000;
                        let intervalMicros = globalThis.Number(sampleInterval$constant().Nanoseconds()) / 1000;
                        if (intervalMicros - math__from_gostdlib.Mod(startMicros, intervalMicros) > dur) {
                            break __gotots_return_block_1;
                        }
                        sync__from_gostdlib.Mutex.Lock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                        const __gotots_receiver_52 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                        __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_52, $go$recovery);
                        };
                        if (!atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
                            break __gotots_return_block_1;
                        }
                        let tid = Tracing.$go$private$tracing$threadIDLocked(tr, args);
                        strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
                        Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, tid, "X", phase.$value, startMicros, name, "", dur$location, args));
                        Tracing.$go$private$tracing$maybeFlushLocked(tr);
                    }
                }
                catch (__gotots_caught_3) {
                    if (!(__gotots_caught_3 instanceof GoPanic)) {
                        throw __gotots_caught_3;
                    }
                    __gotots_panic_1 = __gotots_caught_3;
                }
            }
            finally {
                if (__gotots_deferred_1 !== undefined) {
                    const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                    try {
                        __gotots_deferred_1(__gotots_recovery_1);
                        if (__gotots_recovery_1.recovered()) {
                            __gotots_panic_1 = undefined;
                        }
                    }
                    catch (__gotots_caught_2) {
                        if (!(__gotots_caught_2 instanceof GoPanic)) {
                            throw __gotots_caught_2;
                        }
                        __gotots_panic_1 = __gotots_caught_2;
                    }
                }
            }
            if (__gotots_panic_1 !== undefined) {
                throw __gotots_panic_1;
            }
        };
    }
    static StopTracing(tr: {
        value: Tracing;
    } | undefined): GoInterface | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: GoInterface | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_range_0 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracers;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                        let tracer: {
                            value: typeTracer;
                        } | undefined = __gotots_range_value_0;
                        {
                            let err__shadow_1: GoInterface | undefined = typeTracer.DumpTypes(tracer);
                            if (!(err__shadow_1 === undefined)) {
                                __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to dump types for checker %d: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int((tracer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerIndex), err__shadow_1])));
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    sync__from_gostdlib.Mutex.Lock((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_1 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    if (atomic__from_gostdlib.Bool.Load((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted)) {
                        if (!((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushErr === undefined)) {
                            strings__from_gostdlib.Builder.Reset((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
                            atomic__from_gostdlib.Bool.Store((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted, false);
                            __gotots_return_0 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushErr;
                            break __gotots_return_block_0;
                        }
                        {
                            const __gotots_receiver_2 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                            const __gotots_argument_2 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracePath;
                            const __gotots_argument_3 = strings__from_gostdlib.Builder.String((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent) + "\n]\n";
                            let err__shadow_1: GoInterface | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).AppendFile(__gotots_argument_2, __gotots_argument_3);
                            if (!(err__shadow_1 === undefined)) {
                                __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to write trace file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                                break __gotots_return_block_0;
                            }
                        }
                        strings__from_gostdlib.Builder.Reset((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
                        atomic__from_gostdlib.Bool.Store((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted, false);
                    }
                    SortFunc$SliceOf_Named_tracing$TraceRecord$Named_tracing$TraceRecord((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.legend, (a: TraceRecord, b: TraceRecord): int => {
                        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(TraceRecord.$storageOf(a).TypesPath, TraceRecord.$storageOf(b).TypesPath)));
                    });
                    let legendPath = CombinePaths__from_tspath((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceDir, RuntimeSlice.literal<gostring>(["legend.json"]));
                    const __gotots_results_0 = MarshalIndent__from_json__package_1(new $goInterfaceAdapter$SliceOf_Named_tracing$TraceRecord((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.legend), "", "  ");
                    let legendData = __gotots_results_0[0];
                    let err: GoInterface | undefined = __gotots_results_0[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to marshal legend file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
                        break __gotots_return_block_0;
                    }
                    {
                        const __gotots_receiver_3 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                        const __gotots_argument_4 = legendPath;
                        const __gotots_conversion_0 = legendData;
                        let __gotots_conversion_1 = "";
                        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                        }
                        const __gotots_argument_5 = __gotots_conversion_1;
                        let err__shadow_1: GoInterface | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).WriteFile(__gotots_argument_4, __gotots_argument_5);
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to write legend file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                            break __gotots_return_block_0;
                        }
                    }
                    __gotots_return_0 = void 0;
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
    static $go$private$tracing$maybeFlushLocked(tr: {
        value: Tracing;
    } | undefined): void {
        if (!((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushErr === undefined)) {
            strings__from_gostdlib.Builder.Reset((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
            return;
        }
        if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent))) < flushThreshold$int) {
            return;
        }
        {
            const __gotots_receiver_51 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
            const __gotots_argument_15 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracePath;
            const __gotots_argument_16 = strings__from_gostdlib.Builder.String((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
            let err: GoInterface | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_51).AppendFile(__gotots_argument_15, __gotots_argument_16);
            if (!(err === undefined)) {
                (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushErr = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to flush trace file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
            }
        }
        strings__from_gostdlib.Builder.Reset((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
    }
    static $go$private$tracing$threadIDLocked(tr: {
        value: Tracing;
    } | undefined, args: GoMapValue<gostring, $goInterface$Interface_void | undefined>): int {
        const __gotots_results_4 = traceThreadKeyFromArgs(args);
        let key = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (!ok) {
            return mainThreadID$int;
        }
        {
            const __gotots_results_5 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.threadIDs.lookupOk(key);
            let tid__shadow_1 = __gotots_results_5[0];
            let ok__shadow_1 = __gotots_results_5[1];
            if (ok__shadow_1) {
                return tid__shadow_1;
            }
        }
        let tid = key.$go$private$tracing$defaultThreadID();
        for (;;) {
            {
                const __gotots_results_6 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.threadKeys.lookupOk(tid);
                let existingKey = __gotots_results_6[0];
                let ok__shadow_1 = __gotots_results_6[1];
                if (!ok__shadow_1 || traceThreadKey.$equal(existingKey, key)) {
                    break;
                }
            }
            tid++;
        }
        (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.threadIDs.store(key, tid);
        (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.threadKeys.store(tid, key);
        Tracing.$go$private$tracing$writeThreadNameEventLocked(tr, tid, key.$go$private$tracing$displayName());
        return tid;
    }
    static $go$private$tracing$timestamp(tr: {
        value: Tracing;
    } | undefined): float64 {
        if ((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deterministic) {
            const __gotots_store_0 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_0.timestampCounter = goUint64(__gotots_store_0.timestampCounter + 1n);
            return globalThis.Number((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.timestampCounter);
        }
        return globalThis.Number(time__from_gostdlib.Since(named_time.TimeOperations.$copy((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startTime)).Nanoseconds()) / 1000;
    }
    static $go$private$tracing$writeEvent(tr: {
        value: Tracing;
    } | undefined, event: traceEvent): void {
        const __gotots_store_1 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "traceContent");
        const __gotots_argument_7 = traceEvent.$copy(event);
        writeEventTo(__gotots_argument_6, __gotots_argument_7);
    }
    static $go$private$tracing$writeThreadNameEventLocked(tr: {
        value: Tracing;
    } | undefined, tid: int, name: gostring): void {
        strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
        Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, tid, "M", "__metadata", (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadataTS, "thread_name", "", void 0, $goMap$MapOf_string_To_Interface_void.make(1, [["name", new GoInterfaceAdapter(name)]])));
    }
}
export class Phase {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function PhaseParse$constant(): Phase {
    return new Phase("parse");
}
export function PhaseProgram$constant(): Phase {
    return new Phase("program");
}
export function PhaseBind$constant(): Phase {
    return new Phase("bind");
}
export function PhaseCheck$constant(): Phase {
    return new Phase("check");
}
export function PhaseCheckTypes$constant(): Phase {
    return new Phase("checkTypes");
}
export function PhaseEmit$constant(): Phase {
    return new Phase("emit");
}
export function StartTracing(fs: FS__from_vfs | undefined, traceDir: gostring, configFilePath: gostring, deterministic: bool): [
    {
        value: Tracing;
    } | undefined,
    GoInterface | undefined
] {
    let tr: {
        value: Tracing;
    } | undefined = { value: new Tracing(fs, traceDir, CombinePaths__from_tspath(traceDir, RuntimeSlice.literal<gostring>([traceFileName$string])), configFilePath, RuntimeSlice.literal<TraceRecord$Storage>([]), RuntimeSlice.literal<{
            value: typeTracer;
        } | undefined>([]), named_strings.StringsBuilderOperations.$zero(), named_sync_atomic.SyncAtomicBoolOperations.$zero(), GoMap.make(0, []), $goMap$MapOf_int_To_Named_tracing$traceThreadKey.make(0, []), 0, deterministic, 0n, time__from_gostdlib.Now(), named_sync.SyncMutexOperations.$zero(), void 0) };
    atomic__from_gostdlib.Bool.Store((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceStarted, true);
    strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, "[\n");
    let metaTs = Tracing.$go$private$tracing$timestamp(tr);
    (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadataTS = metaTs;
    Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, mainThreadID$int, "M", "__metadata", metaTs, "process_name", "", void 0, $goMap$MapOf_string_To_Interface_void.make(1, [["name", new GoInterfaceAdapter("tsgo")]])));
    strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
    Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, mainThreadID$int, "M", "__metadata", metaTs, "thread_name", "", void 0, $goMap$MapOf_string_To_Interface_void.make(1, [["name", new GoInterfaceAdapter("Main")]])));
    strings__from_gostdlib.Builder.WriteString((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent, ",\n");
    Tracing.$go$private$tracing$writeEvent(tr, new traceEvent(1, mainThreadID$int, "M", "disabled-by-default-devtools.timeline", metaTs, "TracingStartedInBrowser", "", void 0, $goMap$MapOf_string_To_Interface_void.nil()));
    {
        const __gotots_receiver_0 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_0 = (tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracePath;
        const __gotots_argument_1 = strings__from_gostdlib.Builder.String((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
        let err: GoInterface | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).WriteFile(__gotots_argument_0, __gotots_argument_1);
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to write trace file header: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
        }
    }
    strings__from_gostdlib.Builder.Reset((tr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.traceContent);
    return [tr, void 0];
}
export function writeEventTo(buf: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, event: traceEvent): void {
    {
        let err: GoInterface | undefined = MarshalWrite__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_strings$Builder(buf), new $goInterfaceAdapter$Named_tracing$traceEvent(traceEvent.$copy(event)), RuntimeSlice.literal<Options__from_jsonopts | undefined>([Deterministic__from_json__package_1(true)]));
        if (!(err === undefined)) {
            const __gotots_argument_14 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("failed to marshal trace event: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
            GoPanic.raise(__gotots_argument_14 === undefined ? GoPanicNilValue.create() : __gotots_argument_14);
        }
    }
}
export class traceThreadKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function traceThreadKindChecker$constant(): traceThreadKind {
    return new traceThreadKind("checker");
}
export function traceThreadKindFile$constant(): traceThreadKind {
    return new traceThreadKind("file");
}
export class traceThreadKey {
    declare private readonly $goType: void;
    public constructor(public kind: traceThreadKind, public text: gostring, public index: int, public hasIndex: bool) {
    }
    static $zero(): traceThreadKey {
        return new traceThreadKey(new traceThreadKind(""), "", 0, false);
    }
    static $copy($source: traceThreadKey): traceThreadKey {
        return new traceThreadKey($source.kind, $source.text, $source.index, $source.hasIndex);
    }
    static $equal($left: traceThreadKey, $right: traceThreadKey): bool {
        return $left.kind.$value === $right.kind.$value && $left.text === $right.text && $left.index === $right.index && $left.hasIndex === $right.hasIndex;
    }
    static $hash($source: traceThreadKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.kind.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.text));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.index));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.hasIndex));
        return $hash;
    }
    declare private readonly then?: never;
    $go$private$tracing$defaultThreadID(): int {
        if (this.kind.$value === traceThreadKindChecker$constant().$value && this.hasIndex && this.index >= 0) {
            return firstSyntheticThreadID$int + this.index;
        }
        return stableTraceThreadID(traceThreadKey.$copy(this));
    }
    $go$private$tracing$displayName(): gostring {
        if (this.hasIndex) {
            return this.kind.$value + ":" + strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(this.index)));
        }
        return this.kind.$value + ":" + this.text;
    }
}
export function traceThreadKeyFromArgs(args: GoMapValue<gostring, $goInterface$Interface_void | undefined>): [
    traceThreadKey,
    bool
] {
    if (args.length() === 0) {
        return [new traceThreadKey(new traceThreadKind(""), "", 0, false), false];
    }
    {
        const __gotots_results_7 = (($value: $goInterface$Interface_void | undefined): [
            int,
            boolean
        ] => {
            if (!$goInterfaceAdapter$int.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })(args.lookup("checkerId"));
        let checkerID = __gotots_results_7[0];
        let ok = __gotots_results_7[1];
        if (ok) {
            return [new traceThreadKey(traceThreadKindChecker$constant(), "", checkerID, true), true];
        }
    }
    const __gotots_range_3 = $state.traceThreadArgKeys.copy();
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < 5; __gotots_range_index_3++) {
        const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_3);
        let key = __gotots_range_value_5;
        {
            const __gotots_results_8 = args.lookupOk(key);
            let value: $goInterface$Interface_void | undefined = __gotots_results_8[0];
            let ok = __gotots_results_8[1];
            if (ok) {
                {
                    const __gotots_results_9 = (($value: $goInterface$Interface_void | undefined): [
                        gostring,
                        boolean
                    ] => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return ["", false];
                        }
                        return [$value.$go$value, true];
                    })(value);
                    let path = __gotots_results_9[0];
                    let ok__shadow_1 = __gotots_results_9[1];
                    if (ok__shadow_1 && path !== "") {
                        return [new traceThreadKey(traceThreadKindFile$constant(), path, 0, false), true];
                    }
                }
            }
        }
    }
    return [new traceThreadKey(new traceThreadKind(""), "", 0, false), false];
}
export function stableTraceThreadID(key: traceThreadKey): int {
    let hash: tsonicTypeScriptRuntime.Location<Hasher__from_xxh3> | undefined = New__from_xxh3();
    const __gotots_results_10 = Hasher__from_xxh3.WriteString(hash, key.kind.$value);
    const __gotots_results_11 = Hasher__from_xxh3.WriteString(hash, ":");
    if (key.hasIndex) {
        const __gotots_results_12 = Hasher__from_xxh3.WriteString(hash, strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(key.index))));
    }
    else {
        const __gotots_results_13 = Hasher__from_xxh3.WriteString(hash, key.text);
    }
    return firstFileThreadID$int + globalThis.Number(BigInt.asIntN(64, goUint64(goIntegerRemainder(Hasher__from_xxh3.Sum64(hash), fileThreadIDHashRange$uint64))));
}
export class typeTracer {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public checkerIndex: int, public typesPath: gostring, public types: RuntimeSlice<TracedType | undefined>, public mu: sync__from_gostdlib.Mutex) {
    }
    static $copy($source: typeTracer): typeTracer {
        return new typeTracer($source.fs, $source.checkerIndex, $source.typesPath, $source.types, named_sync.SyncMutexOperations.$copy($source.mu));
    }
    declare private readonly then?: never;
    static DumpTypes(t: {
        value: typeTracer;
    } | undefined): GoInterface | undefined {
        sync__from_gostdlib.Mutex.Lock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        let types = Clone$SliceOf_Named_tracing$TracedType$Named_tracing$TracedType((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types);
        sync__from_gostdlib.Mutex.Unlock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if (types.length === 0) {
            return void 0;
        }
        let sb = named_strings.StringsBuilderOperations.$zero();
        const sb$location = tsonicTypeScriptRuntime.boundLocation({}, () => sb, sb$next => sb = sb$next);
        strings__from_gostdlib.Builder.WriteString(sb, "[");
        let recursionIdentityMap: GoMapValue<$goInterface$Interface_void | undefined, int> = $goMap$MapOf_Interface_void_To_int.make(0, []);
        const __gotots_range_1 = types;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_1;
            let typ: TracedType | undefined = __gotots_range_value_2;
            let descriptor = typeTracer.$go$private$tracing$buildTypeDescriptor(t, typ, recursionIdentityMap);
            {
                let err: GoInterface | undefined = MarshalWrite__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_strings$Builder(sb$location), new $goInterfaceAdapter$Named_tracing$TypeDescriptor(TypeDescriptor.$copy(descriptor)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                if (!(err === undefined)) {
                    const __gotots_argument_10 = "failed to marshal type %d: %w";
                    const __gotots_receiver_3 = typ;
                    const __gotots_argument_8 = new $goInterfaceAdapter$uint32(goInterfaceNonNil<TracedType>(__gotots_receiver_3).Id());
                    const __gotots_argument_9 = err;
                    const __gotots_argument_11 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_8, __gotots_argument_9]);
                    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf(__gotots_argument_10, __gotots_argument_11));
                }
            }
            if (i < types.length - 1) {
                strings__from_gostdlib.Builder.WriteString(sb, ",\n");
            }
        }
        strings__from_gostdlib.Builder.WriteString(sb, "]\n");
        const __gotots_receiver_4 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_12 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typesPath;
        const __gotots_argument_13 = strings__from_gostdlib.Builder.String(sb);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).WriteFile(__gotots_argument_12, __gotots_argument_13);
    }
    static RecordType(t: {
        value: typeTracer;
    } | undefined, typ: TracedType | undefined): void {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_55 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_55, $go$recovery);
                    };
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types.append(void 0, [typ]);
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_2(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$tracing$buildTypeDescriptor(t: {
        value: typeTracer;
    } | undefined, typ: TracedType | undefined, recursionIdentityMap: GoMapValue<$goInterface$Interface_void | undefined, int>): TypeDescriptor {
        const __gotots_receiver_5 = typ;
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_5).Symbol();
        const __gotots_receiver_6 = typ;
        let aliasSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_6).AliasSymbol();
        const __gotots_receiver_7 = typ;
        const __gotots_field_0 = goInterfaceNonNil<TracedType>(__gotots_receiver_7).Id();
        const __gotots_receiver_8 = typ;
        const __gotots_field_1 = goInterfaceNonNil<TracedType>(__gotots_receiver_8).FormatFlags();
        let desc = new TypeDescriptor(__gotots_field_0, "", "", void 0, false, RuntimeSlice.nil<uint32>(), RuntimeSlice.nil<uint32>(), RuntimeSlice.nil<uint32>(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, RuntimeSlice.nil<uint32>(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, __gotots_field_1, "");
        {
            const __gotots_receiver_9 = typ;
            let identity: $goInterface$Interface_void | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_9).RecursionIdentity();
            if (!(identity === undefined)) {
                const __gotots_results_1 = recursionIdentityMap.lookupOk(identity);
                let token = __gotots_results_1[0];
                const token$location = tsonicTypeScriptRuntime.boundLocation({}, () => token, token$next => token = token$next);
                let ok = __gotots_results_1[1];
                if (!ok) {
                    token = recursionIdentityMap.length();
                    recursionIdentityMap.store(identity, token);
                }
                desc.RecursionID =
                    token$location;
            }
        }
        {
            const __gotots_receiver_10 = typ;
            let name = goInterfaceNonNil<TracedType>(__gotots_receiver_10).IntrinsicName();
            if (name !== "") {
                desc.IntrinsicName = name;
            }
        }
        {
            let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = aliasSymbol;
            if (!(sym === undefined)) {
                desc.SymbolName = EscapeAllInternalSymbolNames__from_ast(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            }
            else if (!(__go_symbol === undefined)) {
                desc.SymbolName = EscapeAllInternalSymbolNames__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            }
        }
        const __gotots_receiver_11 = typ;
        if (goInterfaceNonNil<TracedType>(__gotots_receiver_11).IsTuple()) {
            desc.IsTuple = true;
        }
        {
            const __gotots_receiver_12 = typ;
            let types = goInterfaceNonNil<TracedType>(__gotots_receiver_12).UnionTypes();
            if (types.length > 0) {
                desc.UnionTypes = mapTypeIds(types);
            }
        }
        {
            const __gotots_receiver_13 = typ;
            let types = goInterfaceNonNil<TracedType>(__gotots_receiver_13).IntersectionTypes();
            if (types.length > 0) {
                desc.IntersectionTypes = mapTypeIds(types);
            }
        }
        {
            const __gotots_receiver_14 = typ;
            let args = goInterfaceNonNil<TracedType>(__gotots_receiver_14).AliasTypeArguments();
            if (args.length > 0) {
                desc.AliasTypeArguments = mapTypeIds(args);
            }
        }
        {
            const __gotots_receiver_15 = typ;
            let indexType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_15).IndexType();
            if (!(indexType === undefined)) {
                const __gotots_receiver_16 = indexType;
                desc.KeyofType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_16).Id());
            }
        }
        {
            const __gotots_receiver_17 = typ;
            let objType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_17).IndexedAccessObjectType();
            if (!(objType === undefined)) {
                const __gotots_receiver_18 = objType;
                desc.IndexedAccessObjectType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_18).Id());
            }
        }
        {
            const __gotots_receiver_19 = typ;
            let idxType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_19).IndexedAccessIndexType();
            if (!(idxType === undefined)) {
                const __gotots_receiver_20 = idxType;
                desc.IndexedAccessIndexType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_20).Id());
            }
        }
        const __gotots_receiver_21 = typ;
        if (goInterfaceNonNil<TracedType>(__gotots_receiver_21).IsConditional()) {
            {
                const __gotots_receiver_22 = typ;
                let checkType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_22).ConditionalCheckType();
                if (!(checkType === undefined)) {
                    const __gotots_receiver_23 = checkType;
                    desc.ConditionalCheckType =
                        tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_23).Id());
                }
            }
            {
                const __gotots_receiver_24 = typ;
                let extendsType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_24).ConditionalExtendsType();
                if (!(extendsType === undefined)) {
                    const __gotots_receiver_25 = extendsType;
                    desc.ConditionalExtendsType =
                        tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_25).Id());
                }
            }
            {
                const __gotots_receiver_26 = typ;
                let trueType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_26).ConditionalTrueType();
                if (!(trueType === undefined)) {
                    const __gotots_receiver_27 = trueType;
                    desc.ConditionalTrueType =
                        tsonicTypeScriptRuntime.location<int32>(goInterfaceNonNil<TracedType>(__gotots_receiver_27).Id() | 0);
                }
                else {
                    desc.ConditionalTrueType =
                        tsonicTypeScriptRuntime.location<int32>(-1);
                }
            }
            {
                const __gotots_receiver_28 = typ;
                let falseType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_28).ConditionalFalseType();
                if (!(falseType === undefined)) {
                    const __gotots_receiver_29 = falseType;
                    desc.ConditionalFalseType =
                        tsonicTypeScriptRuntime.location<int32>(goInterfaceNonNil<TracedType>(__gotots_receiver_29).Id() | 0);
                }
                else {
                    desc.ConditionalFalseType =
                        tsonicTypeScriptRuntime.location<int32>(-1);
                }
            }
        }
        {
            const __gotots_receiver_30 = typ;
            let baseType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_30).SubstitutionBaseType();
            if (!(baseType === undefined)) {
                const __gotots_receiver_31 = baseType;
                desc.SubstitutionBaseType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_31).Id());
            }
        }
        {
            const __gotots_receiver_32 = typ;
            let constraint: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_32).SubstitutionConstraintType();
            if (!(constraint === undefined)) {
                const __gotots_receiver_33 = constraint;
                desc.ConstraintType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_33).Id());
            }
        }
        {
            const __gotots_receiver_34 = typ;
            let target: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_34).ReferenceTarget();
            if (!(target === undefined)) {
                const __gotots_receiver_35 = target;
                desc.InstantiatedType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_35).Id());
            }
        }
        {
            const __gotots_receiver_36 = typ;
            let args = goInterfaceNonNil<TracedType>(__gotots_receiver_36).ReferenceTypeArguments();
            if (args.length > 0) {
                desc.TypeArguments = mapTypeIds(args);
            }
        }
        {
            const __gotots_receiver_37 = typ;
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_37).ReferenceNode();
            if (!(node === undefined)) {
                desc.ReferenceLocation = getLocation(node);
            }
        }
        {
            const __gotots_receiver_38 = typ;
            let sourceType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_38).ReverseMappedSourceType();
            if (!(sourceType === undefined)) {
                const __gotots_receiver_39 = sourceType;
                desc.ReverseMappedSourceType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_39).Id());
            }
        }
        {
            const __gotots_receiver_40 = typ;
            let mappedType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_40).ReverseMappedMappedType();
            if (!(mappedType === undefined)) {
                const __gotots_receiver_41 = mappedType;
                desc.ReverseMappedMappedType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_41).Id());
            }
        }
        {
            const __gotots_receiver_42 = typ;
            let constraintType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_42).ReverseMappedConstraintType();
            if (!(constraintType === undefined)) {
                const __gotots_receiver_43 = constraintType;
                desc.ReverseMappedConstraintType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_43).Id());
            }
        }
        {
            const __gotots_receiver_44 = typ;
            let elemType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_44).EvolvingArrayElementType();
            if (!(elemType === undefined)) {
                const __gotots_receiver_45 = elemType;
                desc.EvolvingArrayElementType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_45).Id());
            }
        }
        {
            const __gotots_receiver_46 = typ;
            let finalType: TracedType | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_46).EvolvingArrayFinalType();
            if (!(finalType === undefined)) {
                const __gotots_receiver_47 = finalType;
                desc.EvolvingArrayFinalType =
                    tsonicTypeScriptRuntime.location<uint32>(goInterfaceNonNil<TracedType>(__gotots_receiver_47).Id());
            }
        }
        {
            const __gotots_receiver_48 = typ;
            let pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<TracedType>(__gotots_receiver_48).Pattern();
            if (!(pattern === undefined)) {
                desc.DestructuringPattern = getLocation(pattern);
            }
        }
        let firstDeclSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = aliasSymbol;
        if (firstDeclSymbol === undefined) {
            firstDeclSymbol = __go_symbol;
        }
        if (!(firstDeclSymbol === undefined) && Symbol__from_ast.$storageOf(((firstDeclSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
            desc.FirstDeclaration = getLocation(Symbol__from_ast.$storageOf(((firstDeclSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0));
        }
        {
            const __gotots_receiver_49 = typ;
            let display = goInterfaceNonNil<TracedType>(__gotots_receiver_49).Display();
            if (display !== "") {
                desc.Display = display;
            }
        }
        return TypeDescriptor.$copy(desc);
    }
}
export class TypeDescriptor {
    declare private readonly $goType: void;
    public constructor(public ID: uint32, public IntrinsicName: gostring, public SymbolName: gostring, public RecursionID: tsonicTypeScriptRuntime.Location<int> | undefined, public IsTuple: bool, public UnionTypes: RuntimeSlice<uint32>, public IntersectionTypes: RuntimeSlice<uint32>, public AliasTypeArguments: RuntimeSlice<uint32>, public KeyofType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public IndexedAccessObjectType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public IndexedAccessIndexType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public ConditionalCheckType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public ConditionalExtendsType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public ConditionalTrueType: tsonicTypeScriptRuntime.Location<int32> | undefined, public ConditionalFalseType: tsonicTypeScriptRuntime.Location<int32> | undefined, public SubstitutionBaseType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public ConstraintType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public InstantiatedType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public TypeArguments: RuntimeSlice<uint32>, public ReferenceLocation: {
        value: Location;
    } | undefined, public ReverseMappedSourceType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public ReverseMappedMappedType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public ReverseMappedConstraintType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public EvolvingArrayElementType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public EvolvingArrayFinalType: tsonicTypeScriptRuntime.Location<uint32> | undefined, public DestructuringPattern: {
        value: Location;
    } | undefined, public FirstDeclaration: {
        value: Location;
    } | undefined, public Flags: RuntimeSlice<gostring>, public Display: gostring) {
    }
    static $copy($source: TypeDescriptor): TypeDescriptor {
        return new TypeDescriptor($source.ID, $source.IntrinsicName, $source.SymbolName, $source.RecursionID, $source.IsTuple, $source.UnionTypes, $source.IntersectionTypes, $source.AliasTypeArguments, $source.KeyofType, $source.IndexedAccessObjectType, $source.IndexedAccessIndexType, $source.ConditionalCheckType, $source.ConditionalExtendsType, $source.ConditionalTrueType, $source.ConditionalFalseType, $source.SubstitutionBaseType, $source.ConstraintType, $source.InstantiatedType, $source.TypeArguments, $source.ReferenceLocation, $source.ReverseMappedSourceType, $source.ReverseMappedMappedType, $source.ReverseMappedConstraintType, $source.EvolvingArrayElementType, $source.EvolvingArrayFinalType, $source.DestructuringPattern, $source.FirstDeclaration, $source.Flags, $source.Display);
    }
    declare private readonly then?: never;
}
export class Location {
    declare private readonly $goType: void;
    public constructor(public Path: gostring, public Start: {
        value: LineAndChar;
    } | undefined, public End: {
        value: LineAndChar;
    } | undefined) {
    }
    static $copy($source: Location): Location {
        return new Location($source.Path, $source.Start, $source.End);
    }
    static $equal($left: Location, $right: Location): bool {
        return $left.Path === $right.Path &&
            $left.Start
                ===
                    $right.Start &&
            $left.End
                ===
                    $right.End;
    }
    static $hash($source: Location): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Path));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.Start));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.End));
        return $hash;
    }
    declare private readonly then?: never;
}
export class LineAndChar {
    declare private readonly $goType: void;
    public constructor(public Line: int, public Character: int) {
    }
    static $copy($source: LineAndChar): LineAndChar {
        return new LineAndChar($source.Line, $source.Character);
    }
    static $equal($left: LineAndChar, $right: LineAndChar): bool {
        return $left.Line === $right.Line && $left.Character === $right.Character;
    }
    static $hash($source: LineAndChar): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Line));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Character));
        return $hash;
    }
    declare private readonly then?: never;
}
export function mapTypeIds(types: RuntimeSlice<TracedType | undefined>): RuntimeSlice<uint32> {
    if (types.length === 0) {
        return RuntimeSlice.nil<uint32>();
    }
    let ids = RuntimeSlice.make<uint32>(types.length, null, 0);
    const __gotots_range_2 = types;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_3 = __gotots_range_index_2;
        const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
        let i = __gotots_range_value_3;
        let t: TracedType | undefined = __gotots_range_value_4;
        if (!(t === undefined)) {
            const __gotots_store_2 = ids;
            const __gotots_store_3 = i;
            const __gotots_receiver_50 = t;
            __gotots_store_2.set(__gotots_store_3, goInterfaceNonNil<TracedType>(__gotots_receiver_50).Id());
        }
    }
    return ids;
}
export function getLocation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
    value: Location;
} | undefined {
    if (node === undefined) {
        return void 0;
    }
    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
    if (file === undefined) {
        return void 0;
    }
    let startPos = GetTokenPosOfNode__from_scanner(node, file, false);
    const __gotots_results_2 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), startPos);
    let startLine = __gotots_results_2[0];
    let startChar = __gotots_results_2[1];
    const __gotots_results_3 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), Node__from_ast.End(node));
    let endLine = __gotots_results_3[0];
    let endChar = __gotots_results_3[1];
    return { value: new Location(ToPath__from_tspath(SourceFile__from_ast.FileName(file), "", false).$value, { value: new LineAndChar(startLine + 1, startChar.$value + 1) }, { value: new LineAndChar(endLine + 1, endChar.$value + 1) }) };
}
