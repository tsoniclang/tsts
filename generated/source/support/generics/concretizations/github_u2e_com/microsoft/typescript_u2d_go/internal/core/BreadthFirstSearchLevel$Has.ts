import type { searchNodeKey$Storage as searchNodeKey__from_project$Storage, searchNode as searchNode__from_project, searchNode$Storage as searchNode__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BreadthFirstSearchLevel as BreadthFirstSearchLevel__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/bfs.js";
import { searchNodeKey as searchNodeKey__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
export function BreadthFirstSearchLevel$Has$Named_project$searchNodeKey$Named_project$searchNode($argument0: BreadthFirstSearchLevel__from_core<searchNodeKey__from_project, searchNode__from_project> | undefined, $argument1: searchNodeKey__from_project): bool {
    return BreadthFirstSearchLevel__from_core.Has$kernel<searchNodeKey__from_project, searchNode__from_project>($argument0, ($argument0: searchNodeKey__from_project): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$copy($argument0);
    }, $argument1);
}
