import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Category as Category__from_diagnostics, Key as Key__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { TextRange as TextRange__from_core, UndefinedTextRange as UndefinedTextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Localize as Localize__from_diagnostics, Message as Message__from_diagnostics, StringifyArgs as StringifyArgs__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state as $state__locale, Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { BinarySearchFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/BinarySearchFunc.js";
import { Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { Compare$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Compare.js";
import { Equal$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { EqualFunc$SliceOf_PointerTo_Named_ast$Diagnostic$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/EqualFunc.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { SortStableFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_ast$Diagnostic as GoMap } from "../../../../../../support/maps.js";
import { SourceFile } from "./ast.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class RepopulateDiagnosticKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function RepopulateModeMismatch$constant(): RepopulateDiagnosticKind {
    return new RepopulateDiagnosticKind(1);
}
export function RepopulateModuleNotFound$constant(): RepopulateDiagnosticKind {
    return new RepopulateDiagnosticKind(2);
}
export class RepopulateDiagnosticInfo {
    declare private readonly $goType: void;
    public constructor(public Kind: RepopulateDiagnosticKind, public ModuleReference: gostring, public Mode: ModuleKind__from_core, public PackageName: gostring) {
    }
    static $copy($source: RepopulateDiagnosticInfo): RepopulateDiagnosticInfo {
        return new RepopulateDiagnosticInfo($source.Kind, $source.ModuleReference, $source.Mode, $source.PackageName);
    }
    static $equal($left: RepopulateDiagnosticInfo, $right: RepopulateDiagnosticInfo): bool {
        return $left.Kind.$value === $right.Kind.$value && $left.ModuleReference === $right.ModuleReference && $left.Mode === $right.Mode && $left.PackageName === $right.PackageName;
    }
    static $hash($source: RepopulateDiagnosticInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ModuleReference));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Mode));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PackageName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class Diagnostic {
    declare private readonly $goType: void;
    public constructor(public file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, public loc: TextRange__from_core, public code: int32, public category: Category__from_diagnostics, public message: {
        value: Message__from_diagnostics;
    } | undefined, public messageKey: Key__from_diagnostics, public messageArgs: RuntimeSlice<gostring>, public messageChain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public relatedInformation: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public reportsUnnecessary: bool, public reportsDeprecated: bool, public skippedOnNoEmit: bool, public repopulateInfo: {
        value: RepopulateDiagnosticInfo;
    } | undefined) {
    }
    static $copy($source: Diagnostic): Diagnostic {
        return new Diagnostic($source.file, TextRange__from_core.$copy($source.loc), $source.code, $source.category, $source.message, $source.messageKey, $source.messageArgs, $source.messageChain, $source.relatedInformation, $source.reportsUnnecessary, $source.reportsDeprecated, $source.skippedOnNoEmit, $source.repopulateInfo);
    }
    declare private readonly then?: never;
    static AddMessageChain(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, messageChain: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
        if (!(messageChain === undefined)) {
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageChain = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageChain.append(void 0, [messageChain]);
        }
        return d;
    }
    static AddRelatedInfo(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, relatedInformation: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
        if (!(relatedInformation === undefined)) {
            ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.relatedInformation = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.relatedInformation.append(void 0, [relatedInformation]);
        }
        return d;
    }
    static Category(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): Category__from_diagnostics {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.category;
    }
    static Clone(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
        let result = Diagnostic.$copy(Diagnostic.$copy(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value));
        const result$location = tsonicTypeScriptRuntime.boundLocation({}, () => result, result$next => result = result$next);
        return result$location;
    }
    static Code(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): int32 {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.code;
    }
    static End(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): int {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.loc.End();
    }
    static File(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): tsonicTypeScriptRuntime.Location<SourceFile> | undefined {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.file;
    }
    static Len(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): int {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.loc.Len();
    }
    static Loc(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): TextRange__from_core {
        return TextRange__from_core.$copy(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.loc);
    }
    static Localize(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, locale__shadow_1: Locale__from_locale): gostring {
        return Localize__from_diagnostics(Locale__from_locale.$copy(locale__shadow_1), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.message, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageKey, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageArgs);
    }
    static MessageArgs(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): RuntimeSlice<gostring> {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageArgs;
    }
    static MessageChain(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageChain;
    }
    static MessageKey(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): Key__from_diagnostics {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageKey;
    }
    static Pos(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): int {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.loc.Pos();
    }
    static RelatedInformation(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.relatedInformation;
    }
    static RepopulateInfo(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): {
        value: RepopulateDiagnosticInfo;
    } | undefined {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.repopulateInfo;
    }
    static ReportsDeprecated(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): bool {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.reportsDeprecated;
    }
    static ReportsUnnecessary(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): bool {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.reportsUnnecessary;
    }
    static SetCategory(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, category: Category__from_diagnostics): void {
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.category = category;
    }
    static SetFile(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined): void {
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.file = file;
    }
    static SetMessageChain(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, messageChain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageChain = messageChain;
        return d;
    }
    static SetRelatedInfo(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, relatedInformation: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.relatedInformation = relatedInformation;
        return d;
    }
    static SetRepopulateInfo(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, info: {
        value: RepopulateDiagnosticInfo;
    } | undefined): void {
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.repopulateInfo = info;
    }
    static SetSkippedOnNoEmit(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): void {
        ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.skippedOnNoEmit = true;
    }
    static SkippedOnNoEmit(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): bool {
        return ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.skippedOnNoEmit;
    }
    static String(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): gostring {
        return Localize__from_diagnostics(Locale__from_locale.$copy(Locale__from_locale.$fromStorage($state__locale.Default)), ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.message, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageKey, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.messageArgs);
    }
}
export function NewDiagnosticFromSerialized(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, loc: TextRange__from_core, code: int32, category: Category__from_diagnostics, messageKey: Key__from_diagnostics, messageArgs: RuntimeSlice<gostring>, messageChain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, relatedInformation: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, reportsUnnecessary: bool, reportsDeprecated: bool, skippedOnNoEmit: bool): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
    return tsonicTypeScriptRuntime.location<Diagnostic>(new Diagnostic(file, TextRange__from_core.$copy(loc), code, category, void 0, messageKey, messageArgs, messageChain, relatedInformation, reportsUnnecessary, reportsDeprecated, skippedOnNoEmit, void 0));
}
export function NewDiagnostic(file: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, loc: TextRange__from_core, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
    return tsonicTypeScriptRuntime.location<Diagnostic>(new Diagnostic(file, TextRange__from_core.$copy(loc), Message__from_diagnostics.Code(message), Message__from_diagnostics.Category(message), message, Message__from_diagnostics.Key(message), StringifyArgs__from_diagnostics(args), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>(), Message__from_diagnostics.ReportsUnnecessary(message), Message__from_diagnostics.ReportsDeprecated(message), false, void 0));
}
export function NewDiagnosticChain(chain: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
    if (!(chain === undefined)) {
        return Diagnostic.SetRelatedInfo(Diagnostic.AddMessageChain(NewDiagnostic(((chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.file, TextRange__from_core.$copy(((chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.loc), message, args), chain), ((chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Diagnostic>).value.relatedInformation);
    }
    const __gotots_argument_0 = void 0;
    const __gotots_struct_0 = TextRange__from_core.$zero();
    const __gotots_argument_1 = __gotots_struct_0;
    const __gotots_argument_2 = message;
    const __gotots_argument_3 = args;
    return NewDiagnostic(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
}
export function NewCompilerDiagnostic(message: {
    value: Message__from_diagnostics;
} | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
    return NewDiagnostic(void 0, UndefinedTextRange__from_core(), message, args);
}
export class DiagnosticsCollection {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public count: int, public fileDiagnostics: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>>, public fileDiagnosticsSorted: Set__from_collections<gostring>, public nonFileDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, public nonFileDiagnosticsSorted: bool) {
    }
    static $zero(): DiagnosticsCollection {
        return new DiagnosticsCollection(named_sync.SyncMutexOperations.$zero(), 0, GoMap.nil(), Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return $goMap$MapOf_string_To_Struct_void.nil();
        }), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>(), false);
    }
    static $copy($source: DiagnosticsCollection): DiagnosticsCollection {
        return new DiagnosticsCollection(named_sync.SyncMutexOperations.$copy($source.mu), $source.count, $source.fileDiagnostics, Set__from_collections.$copy<gostring>($source.fileDiagnosticsSorted), $source.nonFileDiagnostics, $source.nonFileDiagnosticsSorted);
    }
    declare private readonly then?: never;
    static Add(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu);
                    const __gotots_receiver_0 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_store_0 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value;
                    __gotots_store_0.count = __gotots_store_0.count + 1;
                    if (!(Diagnostic.File(diagnostic) === undefined)) {
                        let fileName = SourceFile.FileName(Diagnostic.File(diagnostic));
                        if (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics.isNil()) {
                            ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics = GoMap.make(0, []);
                        }
                        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics.store(fileName, ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics.lookup(fileName).append(void 0, [diagnostic]));
                        const __gotots_store_1 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value;
                        Set__from_collections.Delete<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "fileDiagnosticsSorted"), fileName);
                    }
                    else {
                        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnostics = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnostics.append(void 0, [diagnostic]);
                        ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnosticsSorted = false;
                    }
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
    static GetDiagnostics(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>();
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu);
                    const __gotots_receiver_1 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    let diagnostics__shadow_1 = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>(0, ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.count, void 0);
                    diagnostics__shadow_1 = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>(diagnostics__shadow_1, ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnostics, void 0);
                    const __gotots_range_3 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics;
                    const __gotots_range_keys_0 = __gotots_range_3.keys();
                    for (const __gotots_range_value_3 of __gotots_range_keys_0) {
                        const __gotots_range_value_4 = __gotots_range_3.lookupOk(__gotots_range_value_3);
                        if (!__gotots_range_value_4[1]) {
                            continue;
                        }
                        const __gotots_range_value_5 = __gotots_range_value_4[0];
                        let diags = __gotots_range_value_5;
                        diagnostics__shadow_1 = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>(diagnostics__shadow_1, diags, void 0);
                    }
                    SortFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(diagnostics__shadow_1, CompareDiagnostics);
                    __gotots_return_1 = diagnostics__shadow_1;
                    break __gotots_return_block_1;
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
        return __gotots_return_1;
    }
    static GetDiagnosticsForFile(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined, fileName: gostring): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>();
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu);
                    const __gotots_receiver_1 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    __gotots_return_1 = DiagnosticsCollection.$go$private$ast$getDiagnosticsForFileLocked(c, fileName);
                    break __gotots_return_block_1;
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
        return __gotots_return_1;
    }
    static GetGlobalDiagnostics(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>();
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu);
                    const __gotots_receiver_1 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    __gotots_return_1 = DiagnosticsCollection.$go$private$ast$getGlobalDiagnosticsLocked(c);
                    break __gotots_return_block_1;
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
        return __gotots_return_1;
    }
    static Lookup(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined, diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu);
                    const __gotots_receiver_0 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    let diagnostics__shadow_1 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>();
                    if (!(Diagnostic.File(diagnostic) === undefined)) {
                        diagnostics__shadow_1 = DiagnosticsCollection.$go$private$ast$getDiagnosticsForFileLocked(c, SourceFile.FileName(Diagnostic.File(diagnostic)));
                    }
                    else {
                        diagnostics__shadow_1 = DiagnosticsCollection.$go$private$ast$getGlobalDiagnosticsLocked(c);
                    }
                    {
                        const __gotots_results_0 = BinarySearchFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(diagnostics__shadow_1, diagnostic, CompareDiagnostics);
                        let i = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            __gotots_return_0 = diagnostics__shadow_1.get(i);
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
    static $go$private$ast$getDiagnosticsForFileLocked(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined, fileName: gostring): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        const __gotots_store_2 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value;
        if (!Set__from_collections.Has<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "fileDiagnosticsSorted"), fileName)) {
            SortStableFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics.lookup(fileName), CompareDiagnostics);
            const __gotots_store_3 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value;
            Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "fileDiagnosticsSorted"), fileName);
        }
        return Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.fileDiagnostics.lookup(fileName));
    }
    static $go$private$ast$getGlobalDiagnosticsLocked(c: tsonicTypeScriptRuntime.Location<DiagnosticsCollection> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined> {
        if (!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnosticsSorted) {
            SortStableFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnostics, CompareDiagnostics);
            ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnosticsSorted = true;
        }
        return Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DiagnosticsCollection>).value.nonFileDiagnostics);
    }
}
export function getDiagnosticPath(d: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): gostring {
    if (!(Diagnostic.File(d) === undefined)) {
        return SourceFile.FileName(Diagnostic.File(d));
    }
    return "";
}
export function EqualDiagnostics(d1: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, d2: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): bool {
    if (tsonicTypeScriptRuntime.sameLocation(d1, d2)) {
        return true;
    }
    return EqualDiagnosticsNoRelatedInfo(d1, d2) && EqualFunc$SliceOf_PointerTo_Named_ast$Diagnostic$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(Diagnostic.RelatedInformation(d1), Diagnostic.RelatedInformation(d2), EqualDiagnostics);
}
export function EqualDiagnosticsNoRelatedInfo(d1: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, d2: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): bool {
    if (tsonicTypeScriptRuntime.sameLocation(d1, d2)) {
        return true;
    }
    return getDiagnosticPath(d1) === getDiagnosticPath(d2) && TextRange__from_core.$equal(Diagnostic.Loc(d1), Diagnostic.Loc(d2)) && Diagnostic.Code(d1) === Diagnostic.Code(d2) && Equal$SliceOf_string$string(Diagnostic.MessageArgs(d1), Diagnostic.MessageArgs(d2)) && EqualFunc$SliceOf_PointerTo_Named_ast$Diagnostic$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(Diagnostic.MessageChain(d1), Diagnostic.MessageChain(d2), equalMessageChain);
}
export function equalMessageChain(c1: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, c2: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): bool {
    if (tsonicTypeScriptRuntime.sameLocation(c1, c2)) {
        return true;
    }
    return Diagnostic.Code(c1) === Diagnostic.Code(c2) && Equal$SliceOf_string$string(Diagnostic.MessageArgs(c1), Diagnostic.MessageArgs(c2)) && EqualFunc$SliceOf_PointerTo_Named_ast$Diagnostic$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(Diagnostic.MessageChain(c1), Diagnostic.MessageChain(c2), equalMessageChain);
}
export function compareMessageChainSize(c1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, c2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): int {
    let c = c2.length - c1.length;
    if (c !== 0) {
        return c;
    }
    const __gotots_range_0 = c1;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        let i = __gotots_range_value_0;
        c = compareMessageChainSize(Diagnostic.MessageChain(c1.get(i)), Diagnostic.MessageChain(c2.get(i)));
        if (c !== 0) {
            return c;
        }
    }
    return 0;
}
export function compareMessageChainContent(c1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, c2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): int {
    const __gotots_range_1 = c1;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        let i = __gotots_range_value_1;
        let c = Compare$SliceOf_string$string(Diagnostic.MessageArgs(c1.get(i)), Diagnostic.MessageArgs(c2.get(i)));
        if (c !== 0) {
            return c;
        }
        if (!Diagnostic.MessageChain(c1.get(i)).isNil()) {
            c = compareMessageChainContent(Diagnostic.MessageChain(c1.get(i)), Diagnostic.MessageChain(c2.get(i)));
            if (c !== 0) {
                return c;
            }
        }
    }
    return 0;
}
export function compareRelatedInfo(r1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>, r2: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic> | undefined>): int {
    let c = r2.length - r1.length;
    if (c !== 0) {
        return c;
    }
    const __gotots_range_2 = r1;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        let i = __gotots_range_value_2;
        c = CompareDiagnostics(r1.get(i), r2.get(i));
        if (c !== 0) {
            return c;
        }
    }
    return 0;
}
export function CompareDiagnostics(d1: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined, d2: tsonicTypeScriptRuntime.Location<Diagnostic> | undefined): int {
    if (tsonicTypeScriptRuntime.sameLocation(d1, d2)) {
        return 0;
    }
    let c = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(getDiagnosticPath(d1), getDiagnosticPath(d2))));
    if (c !== 0) {
        return c;
    }
    c = Diagnostic.Loc(d1).Pos() - Diagnostic.Loc(d2).Pos();
    if (c !== 0) {
        return c;
    }
    c = Diagnostic.Loc(d1).End() - Diagnostic.Loc(d2).End();
    if (c !== 0) {
        return c;
    }
    c = Diagnostic.Code(d1) - Diagnostic.Code(d2);
    if (c !== 0) {
        return c;
    }
    c = Compare$SliceOf_string$string(Diagnostic.MessageArgs(d1), Diagnostic.MessageArgs(d2));
    if (c !== 0) {
        return c;
    }
    c = compareMessageChainSize(Diagnostic.MessageChain(d1), Diagnostic.MessageChain(d2));
    if (c !== 0) {
        return c;
    }
    c = compareMessageChainContent(Diagnostic.MessageChain(d1), Diagnostic.MessageChain(d2));
    if (c !== 0) {
        return c;
    }
    return compareRelatedInfo(Diagnostic.RelatedInformation(d1), Diagnostic.RelatedInformation(d2));
}
