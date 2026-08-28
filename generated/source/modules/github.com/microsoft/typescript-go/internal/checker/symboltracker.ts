import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SymbolTracker as SymbolTracker__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { NodeBuilderContext } from "./nodebuilderimpl.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $goInterfaceAdapter$PointerTo_Named_checker$SymbolTrackerImpl as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { TrackedSymbolArgs } from "./nodebuilderimpl.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class SymbolTrackerImpl {
    declare private readonly $goType: void;
    public constructor(public context: {
        value: NodeBuilderContext;
    } | undefined, public inner: SymbolTracker__from_nodebuilder | undefined, public DisableTrackSymbol: bool) {
    }
    static $copy($source: SymbolTrackerImpl): SymbolTrackerImpl {
        return new SymbolTrackerImpl($source.context, $source.inner, $source.DisableTrackSymbol);
    }
    static $equal($left: SymbolTrackerImpl, $right: SymbolTrackerImpl): bool {
        return $left.context
            ===
                $right.context
            && goInterfaceEqual($left.inner, $right.inner) && $left.DisableTrackSymbol === $right.DisableTrackSymbol;
    }
    static $hash($source: SymbolTrackerImpl): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.context));
        $hash = GoMapHash.mix($hash, $source.inner === undefined ? 0 : $source.inner.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.DisableTrackSymbol));
        return $hash;
    }
    declare private readonly then?: never;
    static PopErrorFallbackNode(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_0: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_0).PopErrorFallbackNode();
    }
    static PushErrorFallbackNode(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_1: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_0 = node;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_1).PushErrorFallbackNode(__gotots_argument_0);
    }
    static ReportCyclicStructureError(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_2: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_2).ReportCyclicStructureError();
    }
    static ReportInaccessibleThisError(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_3: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_3).ReportInaccessibleThisError();
    }
    static ReportInaccessibleUniqueSymbolError(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_4: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_4).ReportInaccessibleUniqueSymbolError();
    }
    static ReportInferenceFallback(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_5: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_1 = node;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_5).ReportInferenceFallback(__gotots_argument_1);
    }
    static ReportLikelyUnsafeImportRequiredError(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, specifier: gostring, symbolName: gostring): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_6: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_2 = specifier;
        const __gotots_argument_3 = symbolName;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_6).ReportLikelyUnsafeImportRequiredError(__gotots_argument_2, __gotots_argument_3);
    }
    static ReportNonSerializableProperty(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, propertyName: gostring): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_7: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_4 = propertyName;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_7).ReportNonSerializableProperty(__gotots_argument_4);
    }
    static ReportNonlocalAugmentation(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, containingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, augmentingSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_8: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_5 = containingFile;
        const __gotots_argument_6 = parentSymbol;
        const __gotots_argument_7 = augmentingSymbol;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_8).ReportNonlocalAugmentation(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
    }
    static ReportPrivateInBaseOfClassExpression(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, propertyName: gostring): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_9: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        const __gotots_argument_8 = propertyName;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_9).ReportPrivateInBaseOfClassExpression(__gotots_argument_8);
    }
    static ReportTruncationError(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined) {
            return;
        }
        const __gotots_receiver_10: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_10).ReportTruncationError();
    }
    static TrackSymbol(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, meaning: SymbolFlags__from_ast): bool {
        if (!(__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableTrackSymbol) {
            let __gotots_logical_result_0 = !((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner === undefined);
            if (__gotots_logical_result_0) {
                const __gotots_receiver_11: SymbolTrackerImpl["inner"] = (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
                const __gotots_argument_9 = __go_symbol;
                const __gotots_argument_10 = enclosingDeclaration;
                const __gotots_argument_11 = meaning;
                __gotots_logical_result_0 = goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_11).TrackSymbol(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
            }
            if (__gotots_logical_result_0) {
                SymbolTrackerImpl.$go$private$checker$onDiagnosticReported(__go_this);
                return true;
            }
            if ((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0) {
                ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols.append(void 0, [
                    { value: new TrackedSymbolArgs(__go_symbol, enclosingDeclaration, meaning) },
                ]);
            }
        }
        return false;
    }
    static $go$private$checker$onDiagnosticReported(__go_this: {
        value: SymbolTrackerImpl;
    } | undefined): void {
        ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportedDiagnostic = true;
    }
}
export function NewSymbolTrackerImpl(context: {
    value: NodeBuilderContext;
} | undefined, tracker: SymbolTracker__from_nodebuilder | undefined): {
    value: SymbolTrackerImpl;
} | undefined {
    if (!(tracker === undefined)) {
        for (;;) {
            const __gotots_results_0 = (($value: SymbolTracker__from_nodebuilder | undefined): [
                {
                    value: SymbolTrackerImpl;
                } | undefined,
                boolean
            ] => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(tracker);
            let t: {
                value: SymbolTrackerImpl;
            } | undefined = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (!ok) {
                break;
            }
            tracker = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inner;
        }
    }
    return { value: new SymbolTrackerImpl(context, tracker, false) };
}
