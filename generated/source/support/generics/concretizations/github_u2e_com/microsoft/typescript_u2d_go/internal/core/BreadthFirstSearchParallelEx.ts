import type { MapEntry$Storage as MapEntry__from_collections$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import type { BreadthFirstSearchOptions as BreadthFirstSearchOptions__from_core, BreadthFirstSearchResult as BreadthFirstSearchResult__from_core, breadthFirstSearchJob as breadthFirstSearchJob__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/bfs.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { searchNodeKey$Storage as searchNodeKey__from_project$Storage, searchNode$Storage as searchNode__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { BreadthFirstSearchParallelEx$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/bfs.js";
import { searchNodeKey as searchNodeKey__from_project, searchNode as searchNode__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
import { $goInterfaceAdapter$Named_project$searchNodeKey, $goInterfaceAdapter$PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $goMap$MapOf_Named_project$searchNodeKey_To_PointerTo_Named_core$breadthFirstSearchJobOf_Named_project$searchNode, $goMap$MapOf_PointerTo_Named_project$Project_To_PointerTo_Named_core$breadthFirstSearchJobOf_PointerTo_Named_project$Project as GoMap } from "../../../../../../../maps.js";
export function BreadthFirstSearchParallelEx$Named_project$searchNodeKey$Named_project$searchNode($argument0: searchNode__from_project, $argument1: (($0: searchNode__from_project) => RuntimeSlice<searchNode__from_project$Storage>) | undefined, $argument2: (($0: searchNode__from_project) => [
    bool,
    bool
]) | undefined, $argument3: BreadthFirstSearchOptions__from_core<searchNodeKey__from_project, searchNode__from_project>, $argument4: (($0: searchNode__from_project) => searchNodeKey__from_project) | undefined): BreadthFirstSearchResult__from_core<searchNode__from_project> {
    return BreadthFirstSearchParallelEx$kernel<searchNodeKey__from_project, searchNode__from_project>(($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined): breadthFirstSearchJob__from_core<searchNode__from_project> | undefined => {
        return $argument0;
    }, ($argument0: searchNodeKey__from_project): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$copy($argument0);
    }, ($argument0: searchNode__from_project): searchNode__from_project => {
        return searchNode__from_project.$copy($argument0);
    }, ($argument0: searchNodeKey__from_project$Storage): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$fromStorage($argument0);
    }, ($argument0: searchNode__from_project$Storage): searchNode__from_project => {
        return searchNode__from_project.$fromStorage($argument0);
    }, ($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined): breadthFirstSearchJob__from_core<searchNode__from_project> | undefined => {
        return $argument0;
    }, ($argument0: searchNodeKey__from_project$Storage): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$fromStorage($argument0);
    }, ($argument0: searchNode__from_project$Storage): searchNode__from_project => {
        return searchNode__from_project.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<searchNodeKey__from_project$Storage>, $argument1: int): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$fromStorage($argument0.get($argument1));
    }, ($argument0: searchNodeKey__from_project): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_project$searchNodeKey(searchNodeKey__from_project.$copy($argument0));
    }, ($argument0: RuntimeSlice<searchNode__from_project$Storage>): int => {
        return $argument0.length;
    }, ($argument0: RuntimeSlice<searchNodeKey__from_project$Storage>): int => {
        return $argument0.length;
    }, ($argument0: RuntimeSlice<MapEntry__from_collections$Storage<searchNodeKey__from_project, breadthFirstSearchJob__from_core<searchNode__from_project> | undefined>>): int => {
        return $argument0.length;
    }, ($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined, $argument1: int): GoMapValue<searchNodeKey__from_project, breadthFirstSearchJob__from_core<searchNode__from_project> | undefined> => {
        return $goMap$MapOf_Named_project$searchNodeKey_To_PointerTo_Named_core$breadthFirstSearchJobOf_Named_project$searchNode.make($argument1, []);
    }, ($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined): GoMapValue<searchNodeKey__from_project, breadthFirstSearchJob__from_core<searchNode__from_project> | undefined> => {
        return $goMap$MapOf_Named_project$searchNodeKey_To_PointerTo_Named_core$breadthFirstSearchJobOf_Named_project$searchNode.make(0, []);
    }, ($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined): breadthFirstSearchJob__from_core<searchNode__from_project> | undefined => {
        return $argument0;
    }, ($argument0: searchNodeKey__from_project): searchNodeKey__from_project$Storage => {
        return searchNodeKey__from_project.$storageOf($argument0);
    }, ($argument0: searchNode__from_project): searchNode__from_project$Storage => {
        return searchNode__from_project.$storageOf($argument0);
    }, ($argument0: breadthFirstSearchJob__from_core<searchNode__from_project> | undefined): breadthFirstSearchJob__from_core<searchNode__from_project> | undefined => {
        return $argument0;
    }, ($argument0: searchNodeKey__from_project): searchNodeKey__from_project$Storage => {
        return searchNodeKey__from_project.$storageOf($argument0);
    }, ($argument0: searchNode__from_project): searchNode__from_project$Storage => {
        return searchNode__from_project.$storageOf($argument0);
    }, (): searchNode__from_project => {
        return searchNode__from_project.$zero();
    }, (): searchNodeKey__from_project => {
        return searchNodeKey__from_project.$zero();
    }, (): breadthFirstSearchJob__from_core<searchNode__from_project> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
export function BreadthFirstSearchParallelEx$PointerTo_Named_project$Project$PointerTo_Named_project$Project($argument0: {
    value: Project__from_project;
} | undefined, $argument1: (($0: {
    value: Project__from_project;
} | undefined) => RuntimeSlice<{
    value: Project__from_project;
} | undefined>) | undefined, $argument2: (($0: {
    value: Project__from_project;
} | undefined) => [
    bool,
    bool
]) | undefined, $argument3: BreadthFirstSearchOptions__from_core<{
    value: Project__from_project;
} | undefined, {
    value: Project__from_project;
} | undefined>, $argument4: (($0: {
    value: Project__from_project;
} | undefined) => {
    value: Project__from_project;
} | undefined) | undefined): BreadthFirstSearchResult__from_core<{
    value: Project__from_project;
} | undefined> {
    return BreadthFirstSearchParallelEx$kernel<{
        value: Project__from_project;
    } | undefined, {
        value: Project__from_project;
    } | undefined>(($argument0: breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined): breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined): breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: Project__from_project;
    } | undefined>, $argument1: int): {
        value: Project__from_project;
    } | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: RuntimeSlice<{
        value: Project__from_project;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: RuntimeSlice<{
        value: Project__from_project;
    } | undefined>): int => {
        return $argument0.length;
    }, ($argument0: RuntimeSlice<MapEntry__from_collections$Storage<{
        value: Project__from_project;
    } | undefined, breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined>>): int => {
        return $argument0.length;
    }, ($argument0: breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined, $argument1: int): GoMapValue<{
        value: Project__from_project;
    } | undefined, breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined> => {
        return GoMap.make($argument1, []);
    }, ($argument0: breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined): GoMapValue<{
        value: Project__from_project;
    } | undefined, breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined): breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined): breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Project__from_project;
    } | undefined => {
        return void 0;
    }, (): {
        value: Project__from_project;
    } | undefined => {
        return void 0;
    }, (): breadthFirstSearchJob__from_core<{
        value: Project__from_project;
    } | undefined> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
