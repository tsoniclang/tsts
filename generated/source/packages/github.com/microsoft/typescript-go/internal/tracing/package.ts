import type { gostring } from "@gotots/runtime/scalars.js";
import { PhaseBind$constant, PhaseCheck$constant, PhaseCheckTypes$constant, PhaseEmit$constant, PhaseParse$constant, PhaseProgram$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/tracing/tracing.js";
import { $state } from "./state.js";
import { GoArray } from "@gotots/runtime/array.js";
export function $initialize(): void {
    PhaseBind = PhaseBind$constant();
    PhaseCheck = PhaseCheck$constant();
    PhaseCheckTypes = PhaseCheckTypes$constant();
    PhaseEmit = PhaseEmit$constant();
    PhaseParse = PhaseParse$constant();
    PhaseProgram = PhaseProgram$constant();
    $state.traceThreadArgKeys = GoArray.zero<gostring, 5>(5, "");
    {
        $state.traceThreadArgKeys = GoArray.literal<gostring, 5>(5, "", [0, 1, 2, 3, 4], ["path", "fileName", "containingFileName", "jsFilePath", "declarationFilePath"]);
    }
}
export { LineAndChar, Location, Phase, PhaseBind$constant, PhaseCheck$constant, PhaseCheckTypes$constant, PhaseEmit$constant, PhaseParse$constant, PhaseProgram$constant, StartTracing, TraceRecord, TraceRecord$Storage, TracedType, TracedType$contract, TracedType$is, Tracer, Tracer$contract, Tracer$is, Tracing, TypeDescriptor } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/tracing/tracing.js";
export let PhaseBind: ReturnType<typeof PhaseBind$constant>;
export let PhaseCheck: ReturnType<typeof PhaseCheck$constant>;
export let PhaseCheckTypes: ReturnType<typeof PhaseCheckTypes$constant>;
export let PhaseEmit: ReturnType<typeof PhaseEmit$constant>;
export let PhaseParse: ReturnType<typeof PhaseParse$constant>;
export let PhaseProgram: ReturnType<typeof PhaseProgram$constant>;
