import type { stringSlice as stringSlice__from_json } from "../../../../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { BuildInfoFileId as BuildInfoFileId__from_incremental } from "../../../../modules/github.com/microsoft/typescript-go/internal/execute/incremental/buildInfo.js";
import { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Sort$Named_json$stringSlice$string($argument0: stringSlice__from_json): void {
    return generic_slices_kernel.SlicesSortKernel<stringSlice__from_json, gostring, gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 < $argument1;
    }, ($argument0: stringSlice__from_json): RuntimeSlice<gostring> => {
        return $argument0.$value;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
export function Sort$SliceOf_Named_incremental$BuildInfoFileId$Named_incremental$BuildInfoFileId($argument0: RuntimeSlice<int>): void {
    return generic_slices_kernel.SlicesSortKernel<RuntimeSlice<int>, BuildInfoFileId__from_incremental, int>(($argument0: BuildInfoFileId__from_incremental, $argument1: BuildInfoFileId__from_incremental): bool => {
        return $argument0.$value < $argument1.$value;
    }, ($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: BuildInfoFileId__from_incremental): BuildInfoFileId__from_incremental => {
        return $argument0;
    }, ($argument0: BuildInfoFileId__from_incremental, $argument1: BuildInfoFileId__from_incremental): bool => {
        return $argument0.$value === $argument1.$value;
    }, ($argument0: int): BuildInfoFileId__from_incremental => {
        return new BuildInfoFileId__from_incremental($argument0);
    }, ($argument0: BuildInfoFileId__from_incremental): int => {
        return $argument0.$value;
    }, $argument0);
}
export function Sort$SliceOf_Named_tspath$Path$Named_tspath$Path($argument0: RuntimeSlice<gostring>): void {
    return generic_slices_kernel.SlicesSortKernel<RuntimeSlice<gostring>, Path__from_tspath, gostring>(($argument0: Path__from_tspath, $argument1: Path__from_tspath): bool => {
        return $argument0.$value < $argument1.$value;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath, $argument1: Path__from_tspath): bool => {
        return $argument0.$value === $argument1.$value;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, $argument0);
}
export function Sort$SliceOf_string$string($argument0: RuntimeSlice<gostring>): void {
    return generic_slices_kernel.SlicesSortKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 < $argument1;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
