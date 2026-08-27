import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node, SourceFile } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { gostring, uint16 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare _Kind_index: GoArray<uint16, 353>;
    declare isFileForcedToBeModuleByFormatExtensions: RuntimeSlice<gostring>;
    declare nextNodeId: atomic__from_gostdlib.Uint64;
    declare nextSymbolId: atomic__from_gostdlib.Uint64;
    declare parseJSDocForNode: (($0: tsonicTypeScriptRuntime.Location<SourceFile> | undefined, $1: tsonicTypeScriptRuntime.Location<Node> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Node> | undefined>) | undefined;
    declare setParentInChildrenPool: sync__from_gostdlib.Pool;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
