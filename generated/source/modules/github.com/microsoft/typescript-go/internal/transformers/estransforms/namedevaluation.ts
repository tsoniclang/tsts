import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ClassStaticBlockDeclaration as ClassStaticBlockDeclaration__from_ast, ExportAssignment as ExportAssignment__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, BindingElement as BindingElement__from_ast, CallExpression as CallExpression__from_ast, FunctionExpression as FunctionExpression__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsNamedEvaluationSource as IsNamedEvaluationSource__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyNameLiteral as IsPropertyNameLiteral__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PropertyAssignment as PropertyAssignment__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, VariableDeclaration as VariableDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug, Fail as Fail__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/IndexFunc.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { isClassThisAssignmentBlock } from "./classthis.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function isClassNamedEvaluationHelperBlock(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!IsClassStaticBlockDeclaration__from_ast(node) || Node__from_ast.Statements((Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body).length !== 1) {
        return false;
    }
    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Statements((Node__from_ast.AsClassStaticBlockDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Body).get(0);
    if (IsExpressionStatement__from_ast(statement)) {
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(statement);
        if (EmitContext__from_printer.IsCallToHelper(emitContext, expression, "__setFunctionName")) {
            let __go_arguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = CallExpression__from_ast.$storageOf(((Node__from_ast.AsCallExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments;
            return NodeList__from_ast.$storageOf(((__go_arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length >= 2 &&
                tsonicTypeScriptRuntime.sameLocation(NodeList__from_ast.$storageOf(((__go_arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(1), EmitContext__from_printer.AssignedName(emitContext, (void Node__from_ast.AsNode,
                    node)));
        }
    }
    return false;
}
export function classHasExplicitlyAssignedName(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    {
        let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.AssignedName(emitContext, node);
        if (!(assignedName === undefined)) {
            const __gotots_range_0 = Node__from_ast.Members(node);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                if (isClassNamedEvaluationHelperBlock(emitContext, member)) {
                    return true;
                }
            }
        }
    }
    return false;
}
export function classHasDeclaredOrExplicitlyAssignedName(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.Name(node) === undefined) || classHasExplicitlyAssignedName(emitContext, node);
}
export function isAnonymousFunctionDefinition(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, cb: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    node = SkipOuterExpressions__from_ast(node, OEKAll$constant__from_ast());
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassExpression$constant__from_ast(): {
            if (classHasDeclaredOrExplicitlyAssignedName(emitContext, node)) {
                return false;
            }
            break;
            break;
        }
        case KindFunctionExpression$constant__from_ast(): {
            if (!(FunctionExpression__from_ast.Name(Node__from_ast.AsFunctionExpression(node)) === undefined)) {
                return false;
            }
            break;
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            break;
            break;
        }
        default: {
            return false;
            break;
        }
    }
    if (!(cb === undefined)) {
        const __gotots_callee_0 = cb;
        const __gotots_argument_2 = node;
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
    }
    return true;
}
export function isNamedEvaluation(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return isNamedEvaluationAnd(emitContext, node, void 0);
}
export function isNamedEvaluationAnd(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, cb: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    if (!IsNamedEvaluationSource__from_ast(node)) {
        return false;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            return isAnonymousFunctionDefinition(emitContext, (Node__from_ast.AsShorthandPropertyAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer, cb);
            break;
        }
        case KindPropertyAssignment$constant__from_ast():
        case KindVariableDeclaration$constant__from_ast():
        case KindParameter$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast(): {
            return isAnonymousFunctionDefinition(emitContext, Node__from_ast.Initializer(node), cb);
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            return isAnonymousFunctionDefinition(emitContext, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, cb);
            break;
        }
        case KindExportAssignment$constant__from_ast(): {
            return isAnonymousFunctionDefinition(emitContext, Node__from_ast.Expression(node), cb);
            break;
        }
        default: {
            Fail__from_debug("Unhandled case in isNamedEvaluation");
            return false;
            break;
        }
    }
}
export function getAssignedNameOfIdentifier(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(emitContext, SkipOuterExpressions__from_ast(expression, OEKAll$constant__from_ast()));
    if ((IsClassDeclaration__from_ast(original) || IsFunctionDeclaration__from_ast(original)) && Node__from_ast.Name(original) === undefined && HasSyntacticModifier__from_ast(original, ModifierFlagsDefault$constant__from_ast())) {
        const __gotots_store_26 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), "default", TokenFlagsNone$constant__from_ast());
    }
    return NodeFactory__from_printer.NewStringLiteralFromNode((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, name);
}
export function getAssignedNameOfPropertyName(emitContext: {
    value: EmitContext__from_printer;
} | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, assignedNameText: gostring): [
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
] {
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let updatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    if (assignedNameText.length > 0) {
        const __gotots_store_24 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let assignedName__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
        return [assignedName__shadow_1, name];
    }
    if (IsPropertyNameLiteral__from_ast(name) || IsPrivateIdentifier__from_ast(name)) {
        let assignedName__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewStringLiteralFromNode(factory, name);
        return [assignedName__shadow_1, name];
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(name);
    if (IsPropertyNameLiteral__from_ast(expression) && !IsIdentifier__from_ast(expression)) {
        let assignedName__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewStringLiteralFromNode(factory, expression);
        return [assignedName__shadow_1, name];
    }
    Assert__from_debug(IsComputedPropertyName__from_ast(name), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Expected computed property name")]));
    assignedName = NodeFactory__from_printer.NewGeneratedNameForNode(factory, name);
    EmitContext__from_printer.AddVariableDeclaration(emitContext, assignedName);
    let key: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewPropKeyHelper(factory, expression);
    let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(factory, assignedName, key);
    const __gotots_store_25 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    updatedName = NodeFactory__from_ast.UpdateComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory"), Node__from_ast.AsComputedPropertyName(name), assignment);
    return [assignedName, updatedName];
}
export function createClassNamedEvaluationHelperBlock(emitContext: {
    value: EmitContext__from_printer;
} | undefined, assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, thisExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (thisExpression === undefined) {
        thisExpression = NodeFactory__from_printer.NewThisExpression((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory);
    }
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewSetFunctionNameHelper(factory, thisExpression, assignedName, "");
    const __gotots_store_3 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), expression);
    const __gotots_store_4 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory");
    const __gotots_store_5 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_0 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
    const __gotots_argument_1 = false;
    let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1);
    const __gotots_store_6 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewClassStaticBlockDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), void 0, body);
    EmitContext__from_printer.SetAssignedName(emitContext, block, assignedName);
    return (void Node__from_ast.AsNode,
        block);
}
export function injectClassNamedEvaluationHelperBlockIfMissing(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, thisExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (classHasExplicitlyAssignedName(emitContext, node)) {
        return node;
    }
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let namedEvaluationBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createClassNamedEvaluationHelperBlock(emitContext, assignedName, thisExpression);
    if (!(Node__from_ast.Name(node) === undefined)) {
        EmitContext__from_printer.SetSourceMapRange(emitContext, Node__from_ast.Statements(Node__from_ast.Body(namedEvaluationBlock)).get(0), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Name(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
    }
    let insertionIndex = IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.Members(node), (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return isClassThisAssignmentBlock(emitContext, n);
    }) + 1;
    let leading = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.Members(node).slice(0, insertionIndex, null));
    let trailing = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.Members(node).slice(insertionIndex, null, null));
    let members = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    members = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(members, leading, void 0);
    members = members.append(void 0, [namedEvaluationBlock]);
    members = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(members, trailing, void 0);
    const __gotots_store_0 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    let membersList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory"), members);
    NodeList__from_ast.$storageOf(((membersList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
    let oldNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    if (IsClassDeclaration__from_ast(node)) {
        const __gotots_store_1 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        node = NodeFactory__from_ast.UpdateClassDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory"), Node__from_ast.AsClassDeclaration(node), Node__from_ast.Modifiers(node), Node__from_ast.Name(node), Node__from_ast.TypeParameterList(node), (Node__from_ast.AsClassDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses, membersList);
    }
    else {
        const __gotots_store_2 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        node = NodeFactory__from_ast.UpdateClassExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory"), Node__from_ast.AsClassExpression(node), Node__from_ast.Modifiers(node), Node__from_ast.Name(node), Node__from_ast.TypeParameterList(node), (Node__from_ast.AsClassExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses, membersList);
    }
    EmitContext__from_printer.SetAssignedName(emitContext, node, assignedName);
    {
        let ct: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ClassThis(emitContext, oldNode);
        if (!(ct === undefined)) {
            EmitContext__from_printer.SetClassThis(emitContext, node, ct);
        }
    }
    return node;
}
export function finishTransformNamedEvaluation(emitContext: {
    value: EmitContext__from_printer;
} | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ignoreEmptyStringLiteral: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (ignoreEmptyStringLiteral && IsStringLiteral__from_ast(assignedName) && Node__from_ast.Text(assignedName).length === 0) {
        return expression;
    }
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(expression, OEKAll$constant__from_ast());
    let updatedExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (IsClassExpression__from_ast(innerExpression)) {
        updatedExpression = injectClassNamedEvaluationHelperBlockIfMissing(emitContext, innerExpression, assignedName, void 0);
    }
    else {
        updatedExpression = NodeFactory__from_printer.NewSetFunctionNameHelper(factory, innerExpression, assignedName, "");
    }
    return NodeFactory__from_printer.RestoreOuterExpressions(factory, expression, updatedExpression, OEKAll$constant__from_ast());
}
export function transformNamedEvaluationOfPropertyAssignment(context: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    const __gotots_results_0 = getAssignedNameOfPropertyName(context, PropertyAssignment__from_ast.Name(node), assignedNameText);
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[0];
    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[1];
    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(context, PropertyAssignment__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_7 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdatePropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory"), node, void 0, name, void 0, void 0, initializer);
}
export function transformNamedEvaluationOfShorthandAssignmentProperty(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: {
    value: ShorthandPropertyAssignment__from_ast;
} | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (assignedNameText.length > 0) {
        const __gotots_store_8 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
    }
    else {
        assignedName = getAssignedNameOfIdentifier(emitContext, ShorthandPropertyAssignment__from_ast.Name(node), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer);
    }
    let objectAssignmentInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_9 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdateShorthandPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), node, void 0, ShorthandPropertyAssignment__from_ast.Name(node), void 0, void 0, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken, objectAssignmentInitializer);
}
export function transformNamedEvaluationOfVariableDeclaration(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (assignedNameText.length > 0) {
        const __gotots_store_10 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
    }
    else {
        assignedName = getAssignedNameOfIdentifier(emitContext, VariableDeclaration__from_ast.Name(node), VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
    }
    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, VariableDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_11 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdateVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"), node, VariableDeclaration__from_ast.Name(node), void 0, void 0, initializer);
}
export function transformNamedEvaluationOfParameterDeclaration(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (assignedNameText.length > 0) {
        const __gotots_store_12 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
    }
    else {
        assignedName = getAssignedNameOfIdentifier(emitContext, ParameterDeclaration__from_ast.Name(node), ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
    }
    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_13 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdateParameterDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), node, void 0, ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, ParameterDeclaration__from_ast.Name(node), void 0, void 0, initializer);
}
export function transformNamedEvaluationOfBindingElement(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: {
    value: BindingElement__from_ast;
} | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (assignedNameText.length > 0) {
        const __gotots_store_14 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
    }
    else {
        assignedName = getAssignedNameOfIdentifier(emitContext, BindingElement__from_ast.Name(node), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
    }
    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_15 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdateBindingElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), node, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName, BindingElement__from_ast.Name(node), initializer);
}
export function transformNamedEvaluationOfPropertyDeclaration(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: {
    value: PropertyDeclaration__from_ast;
} | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    const __gotots_results_1 = getAssignedNameOfPropertyName(emitContext, PropertyDeclaration__from_ast.Name(node), assignedNameText);
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_1[0];
    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_1[1];
    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_16 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory");
    const __gotots_argument_3 = node;
    const __gotots_store_17 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_4 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NamedMemberBase"));
    const __gotots_argument_5 = name;
    const __gotots_argument_6 = void 0;
    const __gotots_argument_7 = void 0;
    const __gotots_argument_8 = initializer;
    return NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_1, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
}
export function transformNamedEvaluationOfAssignmentExpression(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (assignedNameText.length > 0) {
        const __gotots_store_18 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
    }
    else {
        assignedName = getAssignedNameOfIdentifier(emitContext, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
    }
    let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_19 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdateBinaryExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), node, void 0, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, void 0, BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, right);
}
export function transformNamedEvaluationOfExportAssignment(emitContext: {
    value: EmitContext__from_printer;
} | undefined, node: {
    value: ExportAssignment__from_ast;
} | undefined, ignoreEmptyStringLiteral: bool, assignedNameText: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let factory: {
        value: NodeFactory__from_printer;
    } | undefined = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
    let assignedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (assignedNameText.length > 0) {
        const __gotots_store_20 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), assignedNameText, TokenFlagsNone$constant__from_ast());
    }
    else if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
        const __gotots_store_21 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), "", TokenFlagsNone$constant__from_ast());
    }
    else {
        const __gotots_store_22 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        assignedName = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), "default", TokenFlagsNone$constant__from_ast());
    }
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = finishTransformNamedEvaluation(emitContext, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, assignedName, ignoreEmptyStringLiteral);
    const __gotots_store_23 = (factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    return NodeFactory__from_ast.UpdateExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), node, void 0, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals, void 0, expression);
}
export function transformNamedEvaluation(context: {
    value: EmitContext__from_printer;
} | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ignoreEmptyStringLiteral: bool, assignedName: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPropertyAssignment$constant__from_ast(): {
            return transformNamedEvaluationOfPropertyAssignment(context, Node__from_ast.AsPropertyAssignment(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            return transformNamedEvaluationOfShorthandAssignmentProperty(context, Node__from_ast.AsShorthandPropertyAssignment(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            return transformNamedEvaluationOfVariableDeclaration(context, Node__from_ast.AsVariableDeclaration(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindParameter$constant__from_ast(): {
            return transformNamedEvaluationOfParameterDeclaration(context, Node__from_ast.AsParameterDeclaration(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindBindingElement$constant__from_ast(): {
            return transformNamedEvaluationOfBindingElement(context, Node__from_ast.AsBindingElement(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindPropertyDeclaration$constant__from_ast(): {
            return transformNamedEvaluationOfPropertyDeclaration(context, Node__from_ast.AsPropertyDeclaration(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            return transformNamedEvaluationOfAssignmentExpression(context, Node__from_ast.AsBinaryExpression(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        case KindExportAssignment$constant__from_ast(): {
            return transformNamedEvaluationOfExportAssignment(context, Node__from_ast.AsExportAssignment(node), ignoreEmptyStringLiteral, assignedName);
            break;
        }
        default: {
            Fail__from_debug("Unhandled case in transformNamedEvaluation");
            return node;
            break;
        }
    }
}
