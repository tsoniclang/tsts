import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import { GetNextJSDocCommentLocation as GetNextJSDocCommentLocation__from_ast, JSDoc as JSDoc__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function getAllJSDocTags(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0) {
        for (let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node; !(current === undefined); current = GetNextJSDocCommentLocation__from_ast(current)) {
            let jsdocs = Node__from_ast.JSDoc(current, void 0);
            if (jsdocs.length === 0) {
                continue;
            }
            let lastJSDoc: tsonicTypeScriptRuntime.Location<JSDoc__from_ast> | undefined = Node__from_ast.AsJSDoc(jsdocs.get(jsdocs.length - 1));
            if (!(JSDoc__from_ast.$storageOf(((lastJSDoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags === undefined)) {
                return NodeList__from_ast.$storageOf(((JSDoc__from_ast.$storageOf(((lastJSDoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            }
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
