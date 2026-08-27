import type { ArshalValues$Storage as ArshalValues__from_jsonopts$Storage, CoderValues$Storage as CoderValues__from_jsonopts$Storage, Options } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Flags$Storage as Flags__from_jsonflags$Storage } from "../jsonflags/package.js";
import type { bool, uint64 } from "@gotots/runtime/scalars.js";
import { ArshalValues, CoderValues, Struct } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Flags as Flags__from_jsonflags } from "../jsonflags/package.js";
import { $state } from "./state.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function $initialize(): void {
    $state.DefaultOptionsV1 = Struct.$storageOf(Struct.$zero());
    $state.DefaultOptionsV2 = Struct.$storageOf(Struct.$zero());
    $state.GetUnknownOption = void 0;
    $state.JoinUnknownOption = void 0;
    {
        $state.DefaultOptionsV2 = Struct.$storageOf(Struct.$fromStorage({
            Flags: Flags__from_jsonflags.$storageOf(Flags__from_jsonflags.$fromStorage({
                Presence: 3298010072614n,
                Values: 0n
            })),
            CoderValues: CoderValues.$storageOf(CoderValues.$zero()),
            ArshalValues: ArshalValues.$storageOf(ArshalValues.$zero())
        }));
    }
    {
        $state.DefaultOptionsV1 = Struct.$storageOf(Struct.$fromStorage({
            Flags: Flags__from_jsonflags.$storageOf(Flags__from_jsonflags.$fromStorage({
                Presence: 3298010072614n,
                Values: 3298010072614n
            })),
            CoderValues: CoderValues.$storageOf(CoderValues.$zero()),
            ArshalValues: ArshalValues.$storageOf(ArshalValues.$zero())
        }));
    }
    {
        $state.GetUnknownOption = ($0: Struct, $1: Options | undefined): [
            GoInterface | undefined,
            bool
        ] => {
            const __gotots_argument_0 = new GoInterfaceAdapter("unknown option");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            GoPanic.raiseRuntime("unreachable Go function end");
        };
    }
    {
        $state.JoinUnknownOption = ($0: Struct, $1: Options | undefined): Struct => {
            const __gotots_argument_1 = new GoInterfaceAdapter("unknown option");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
            GoPanic.raiseRuntime("unreachable Go function end");
        };
    }
}
export { ArshalValues, ArshalValues$Storage, ByteLimit, ChangedWhitespace, CoderValues, CoderValues$Storage, DepthLimit, Indent, IndentPrefix, Options, Options$contract, Options$is, Struct, Struct$Storage } from "../../../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
export { $state };
