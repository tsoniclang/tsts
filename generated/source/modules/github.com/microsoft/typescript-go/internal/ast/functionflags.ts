import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { uint32 } from "@gotots/runtime/scalars.js";
import { Node } from "./ast.js";
import { BodyBase } from "./ast_generated.js";
import { KindArrowFunction$constant, KindFunctionDeclaration$constant, KindFunctionExpression$constant, KindMethodDeclaration$constant } from "./kind_generated.js";
import { ModifierFlagsAsync$constant } from "./modifierflags.js";
import { HasSyntacticModifier } from "./utilities.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type FunctionFlags = uint32;
export function FunctionFlagsNormal$constant(): FunctionFlags {
    return 0;
}
export function FunctionFlagsGenerator$constant(): FunctionFlags {
    return 1;
}
export function FunctionFlagsAsync$constant(): FunctionFlags {
    return 2;
}
export function FunctionFlagsInvalid$constant(): FunctionFlags {
    return 4;
}
export function FunctionFlagsAsyncGenerator$constant(): FunctionFlags {
    return 3;
}
export function GetFunctionFlags(node: tsonicTypeScriptRuntime.Location<Node> | undefined): FunctionFlags {
    if (node === undefined) {
        return FunctionFlagsInvalid$constant();
    }
    let data: tsonicTypeScriptRuntime.Location<BodyBase> | undefined = Node.BodyData(node);
    if (data === undefined) {
        return FunctionFlagsInvalid$constant();
    }
    let flags = FunctionFlagsNormal$constant();
    {
        const __gotots_switch_tag_0 = Node.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindFunctionExpression$constant();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindMethodDeclaration$constant();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindArrowFunction$constant();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                if (!(BodyBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase>).value).AsteriskToken === undefined)) {
                    flags = (flags | 1) >>> 0;
                }
                __gotots_switch_selection_0 = 1;
            }
            if (__gotots_switch_selection_0 === 1) {
                if (HasSyntacticModifier(node, ModifierFlagsAsync$constant())) {
                    flags = (flags | 2) >>> 0;
                }
                break __gotots_control_target_0;
            }
        }
    }
    if (BodyBase.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BodyBase>).value).Body === undefined) {
        flags = (flags | 4) >>> 0;
    }
    return flags;
}
