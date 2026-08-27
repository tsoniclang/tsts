import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CPUInfo } from "./cpuid.js";
import type { bool, uint32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/klauspost/cpuid/v2@v2.2.10/_root/state.js";
export function initCPU(): void {
    $state.cpuid = ($0: uint32): [
        uint32,
        uint32,
        uint32,
        uint32
    ] => {
        let a: uint32 = 0;
        let b: uint32 = 0;
        let c: uint32 = 0;
        let d: uint32 = 0;
        return [0, 0, 0, 0];
    };
    $state.cpuidex = (x: uint32, y: uint32): [
        uint32,
        uint32,
        uint32,
        uint32
    ] => {
        let a: uint32 = 0;
        let b: uint32 = 0;
        let c: uint32 = 0;
        let d: uint32 = 0;
        return [0, 0, 0, 0];
    };
    $state.xgetbv = ($0: uint32): [
        uint32,
        uint32
    ] => {
        let a: uint32 = 0;
        let b: uint32 = 0;
        return [0, 0];
    };
    $state.rdtscpAsm = (): [
        uint32,
        uint32,
        uint32,
        uint32
    ] => {
        let a: uint32 = 0;
        let b: uint32 = 0;
        let c: uint32 = 0;
        let d: uint32 = 0;
        return [0, 0, 0, 0];
    };
}
export function addInfo(info: tsonicTypeScriptRuntime.Location<CPUInfo> | undefined, safe: bool): void {
}
