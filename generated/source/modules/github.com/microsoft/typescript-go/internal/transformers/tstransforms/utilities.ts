import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { KindMinusToken$constant as KindMinusToken$constant__from_ast, NodeFactory as NodeFactory__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Number as Number__from_jsnum } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function constantExpression(value: GoInterface | undefined, factory: {
    value: NodeFactory__from_printer;
} | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    const __gotots_type_switch_0: GoInterface | undefined = value;
    switch (true) {
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let value__shadow_1: gostring = __gotots_type_switch_0.$go$value;
            const __gotots_store_0 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory"), value__shadow_1, TokenFlagsNone$constant__from_ast());
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
            let value__shadow_1: Number__from_jsnum = __gotots_type_switch_0.$go$value;
            if (value__shadow_1.IsInf()) {
                if (value__shadow_1.$value > 0) {
                    const __gotots_store_1 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory"), "Infinity");
                }
                const __gotots_store_2 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory");
                const __gotots_argument_0 = KindMinusToken$constant__from_ast();
                const __gotots_store_3 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_1 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), "Infinity");
                return NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1);
            }
            if (value__shadow_1.IsNaN()) {
                const __gotots_store_4 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), "NaN");
            }
            if (value__shadow_1.$value < 0) {
                const __gotots_store_5 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewPrefixUnaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), KindMinusToken$constant__from_ast(), constantExpression(new $goInterfaceAdapter$Named_jsnum$Number(new Number__from_jsnum(-value__shadow_1.$value)), factory));
            }
            const __gotots_store_6 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), value__shadow_1.String(), TokenFlagsNone$constant__from_ast());
            break;
        }
    }
    return void 0;
}
