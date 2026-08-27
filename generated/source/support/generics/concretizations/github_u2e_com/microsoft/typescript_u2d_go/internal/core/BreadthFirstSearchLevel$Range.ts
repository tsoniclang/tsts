import type { breadthFirstSearchJob as breadthFirstSearchJob__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/bfs.js";
import type { searchNodeKey$Storage as searchNodeKey__from_project$Storage, searchNode$Storage as searchNode__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { BreadthFirstSearchLevel as BreadthFirstSearchLevel__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/bfs.js";
import { searchNodeKey as searchNodeKey__from_project, searchNode as searchNode__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
export function BreadthFirstSearchLevel$Range$Named_project$searchNodeKey$Named_project$searchNode($argument0: BreadthFirstSearchLevel__from_core<searchNodeKey__from_project, searchNode__from_project> | undefined, $argument1: (($0: searchNode__from_project) => bool) | undefined): void {
    return BreadthFirstSearchLevel__from_core.Range$kernel<searchNodeKey__from_project, searchNode__from_project>($argument0, ($argument0: searchNode__from_project): searchNode__from_project => {
        return searchNode__from_project.$copy($argument0);
    }, ($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined): breadthFirstSearchJob__from_core<searchNode__from_project> | undefined => {
        return $argument0;
    }, ($argument0: searchNode__from_project$Storage): searchNode__from_project => {
        return searchNode__from_project.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<searchNodeKey__from_project$Storage>, $argument1: int): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$fromStorage($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<searchNodeKey__from_project$Storage>): int => {
        return $argument0.length;
    }, $argument1);
}
