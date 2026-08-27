import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeList$Storage as NodeList__from_ast$Storage } from "./ast.js";
import type { uint32 } from "@gotots/runtime/scalars.js";
import { IfElse$Named_ast$SubtreeFacts } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { ModifierList, Node, NodeList } from "./ast.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type SubtreeFacts = uint32;
export function SubtreeContainsTypeScript$constant(): SubtreeFacts {
    return 1;
}
export function SubtreeContainsJsx$constant(): SubtreeFacts {
    return 2;
}
export function SubtreeContainsUsing$constant(): SubtreeFacts {
    return 8;
}
export function SubtreeContainsLogicalAssignments$constant(): SubtreeFacts {
    return 64;
}
export function SubtreeContainsNullishCoalescing$constant(): SubtreeFacts {
    return 128;
}
export function SubtreeContainsOptionalChaining$constant(): SubtreeFacts {
    return 256;
}
export function SubtreeContainsMissingCatchClauseVariable$constant(): SubtreeFacts {
    return 512;
}
export function SubtreeContainsESObjectRestOrSpread$constant(): SubtreeFacts {
    return 1024;
}
export function SubtreeContainsForAwaitOrAsyncGenerator$constant(): SubtreeFacts {
    return 2048;
}
export function SubtreeContainsAnyAwait$constant(): SubtreeFacts {
    return 4096;
}
export function SubtreeContainsExponentiationOperator$constant(): SubtreeFacts {
    return 8192;
}
export function SubtreeContainsLexicalThis$constant(): SubtreeFacts {
    return 16384;
}
export function SubtreeContainsLexicalSuper$constant(): SubtreeFacts {
    return 32768;
}
export function SubtreeContainsRestOrSpread$constant(): SubtreeFacts {
    return 65536;
}
export function SubtreeContainsObjectRestOrSpread$constant(): SubtreeFacts {
    return 131072;
}
export function SubtreeContainsAwait$constant(): SubtreeFacts {
    return 262144;
}
export function SubtreeContainsDynamicImport$constant(): SubtreeFacts {
    return 524288;
}
export function SubtreeContainsClassFields$constant(): SubtreeFacts {
    return 1048576;
}
export function SubtreeContainsDecorators$constant(): SubtreeFacts {
    return 2097152;
}
export function SubtreeContainsIdentifier$constant(): SubtreeFacts {
    return 4194304;
}
export function SubtreeContainsPrivateIdentifierInExpression$constant(): SubtreeFacts {
    return 8388608;
}
export function SubtreeContainsInvalidTemplateEscape$constant(): SubtreeFacts {
    return 16777216;
}
export function SubtreeFactsComputed$constant(): SubtreeFacts {
    return 33554432;
}
export function SubtreeFactsNone$constant(): SubtreeFacts {
    return 0;
}
export function SubtreeContainsLexicalThisOrSuper$constant(): SubtreeFacts {
    return 49152;
}
export function propagateEraseableSyntaxListSubtreeFacts(children: tsonicTypeScriptRuntime.Location<NodeList> | undefined): SubtreeFacts {
    return IfElse$Named_ast$SubtreeFacts(!(children === undefined), SubtreeContainsTypeScript$constant(), SubtreeFactsNone$constant());
}
export function propagateEraseableSyntaxSubtreeFacts(child: tsonicTypeScriptRuntime.Location<Node> | undefined): SubtreeFacts {
    return IfElse$Named_ast$SubtreeFacts(!(child === undefined), SubtreeContainsTypeScript$constant(), SubtreeFactsNone$constant());
}
export function propagateObjectBindingElementSubtreeFacts(child: tsonicTypeScriptRuntime.Location<Node> | undefined): SubtreeFacts {
    let facts = propagateSubtreeFacts(child);
    if (!((facts & SubtreeContainsRestOrSpread$constant()) >>> 0 === 0)) {
        facts = (facts & ~65536) >>> 0;
        facts = (facts | 132096) >>> 0;
    }
    return facts;
}
export function propagateBindingElementSubtreeFacts(child: tsonicTypeScriptRuntime.Location<Node> | undefined): SubtreeFacts {
    return (propagateSubtreeFacts(child) & 4294901759) >>> 0;
}
export function propagateSubtreeFacts(child: tsonicTypeScriptRuntime.Location<Node> | undefined): SubtreeFacts {
    if (child === undefined) {
        return SubtreeFactsNone$constant();
    }
    return Node.$go$private$ast$propagateSubtreeFacts(child);
}
export function propagateNodeListSubtreeFacts(children: tsonicTypeScriptRuntime.Location<NodeList> | undefined, propagate: (($0: tsonicTypeScriptRuntime.Location<Node> | undefined) => SubtreeFacts) | undefined): SubtreeFacts {
    if (children === undefined) {
        return SubtreeFactsNone$constant();
    }
    let facts = SubtreeFactsNone$constant();
    const __gotots_range_0 = NodeList.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let child: tsonicTypeScriptRuntime.Location<Node> | undefined = __gotots_range_value_0;
        const __gotots_callee_0 = propagate;
        const __gotots_argument_0 = child;
        facts = (facts | (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0)) >>> 0;
    }
    return facts;
}
export function propagateModifierListSubtreeFacts(children: tsonicTypeScriptRuntime.Location<ModifierList> | undefined): SubtreeFacts {
    if (children === undefined) {
        return SubtreeFactsNone$constant();
    }
    const __gotots_store_0 = ModifierList.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList>).value);
    const __gotots_argument_1 = tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeList"), ($go$storage: NodeList__from_ast$Storage): NodeList => {
        return NodeList.$fromStorage($go$storage);
    }, ($go$value: NodeList): NodeList__from_ast$Storage => {
        return NodeList.$storageOf($go$value);
    });
    const __gotots_argument_2 = propagateSubtreeFacts;
    return propagateNodeListSubtreeFacts(__gotots_argument_1, __gotots_argument_2);
}
