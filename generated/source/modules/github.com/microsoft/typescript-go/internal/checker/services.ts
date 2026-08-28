import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { LinkStore as LinkStore__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Signature, SignatureLinks$Storage as SignatureLinks__from_checker$Storage, Type, ValueSymbolLinks$Storage as ValueSymbolLinks__from_checker$Storage } from "./types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { ExportSpecifier as ExportSpecifier__from_ast, ExpressionBase as ExpressionBase__from_ast, FindAncestor as FindAncestor__from_ast, Identifier as Identifier__from_ast, IsCallLikeExpression as IsCallLikeExpression__from_ast, IsCallLikeOrFunctionLikeExpression as IsCallLikeOrFunctionLikeExpression__from_ast, IsFunctionExpressionOrArrowFunction as IsFunctionExpressionOrArrowFunction__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SourceFile as SourceFile__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetTouchingPropertyName as GetTouchingPropertyName__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/state.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { IsIdentifierPart as IsIdentifierPart__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { Set$Add$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clear$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clear.js";
import { LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SignatureLinks, LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LinkStore$Get.js";
import { MapNonNil$int$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_checker$ValueSymbolLinks_To_PointerTo_Named_checker$Type, $goMap$MapOf_PointerTo_Named_checker$SignatureLinks_To_PointerTo_Named_checker$Signature as GoMap } from "../../../../../../support/maps.js";
import { CheckModeIsForSignatureHelp$constant, Checker } from "./checker.js";
import { SignatureLinks, ValueSymbolLinks } from "./types.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function runWithInferenceBlockedFromSourceNode$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, c: tsonicTypeScriptRuntime.Location<Checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, fn: (() => T) | undefined): T {
    let containingCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsCallLikeExpression__from_ast);
    if (!(containingCall === undefined)) {
        let toMarkSkip: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
        for (;;) {
            const __gotots_store_0 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value;
            Set$Add$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "skipDirectInferenceNodes"), toMarkSkip);
            toMarkSkip = Node__from_ast.$storageOf(((toMarkSkip ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (toMarkSkip === undefined ||
                tsonicTypeScriptRuntime.sameLocation(toMarkSkip, containingCall)) {
                break;
            }
        }
    }
    ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.isInferencePartiallyBlocked = true;
    let result: T = $go$copy$T0_to_T0(runWithoutResolvedSignatureCaching$kernel<T>($go$copy$T0_to_T0, c, node, fn));
    ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value.isInferencePartiallyBlocked = false;
    const __gotots_store_1 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value;
    Set$Clear$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "skipDirectInferenceNodes"));
    return $go$copy$T0_to_T0(result);
}
export function GetResolvedSignatureForSignatureHelp(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, argumentCount: int, c: tsonicTypeScriptRuntime.Location<Checker> | undefined): [
    tsonicTypeScriptRuntime.Location<Signature> | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined>
] {
    class result {
        declare private readonly $goType: void;
        public constructor(public signature: tsonicTypeScriptRuntime.Location<Signature> | undefined, public candidates: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined>) {
        }
        static $copy($source: result): result {
            return new result($source.signature, $source.candidates);
        }
        declare private readonly then?: never;
    }
    function runWithoutResolvedSignatureCaching$Named_result($argument0: tsonicTypeScriptRuntime.Location<Checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: (() => result) | undefined): result {
        return runWithoutResolvedSignatureCaching$kernel<result>(($argument0: result): result => {
            return result.$copy($argument0);
        }, $argument0, $argument1, $argument2);
    }
    let res = runWithoutResolvedSignatureCaching$Named_result(c, node, (): result => {
        const __gotots_results_1 = Checker.$go$private$checker$getResolvedSignatureWorker(c, node, CheckModeIsForSignatureHelp$constant(), argumentCount);
        let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_results_1[0];
        let candidates = __gotots_results_1[1];
        return new result(signature, candidates);
    });
    return [res.signature, res.candidates];
}
export function runWithoutResolvedSignatureCaching$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, c: tsonicTypeScriptRuntime.Location<Checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, fn: (() => T) | undefined): T {
    let ancestorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsCallLikeOrFunctionLikeExpression__from_ast);
    if (!(ancestorNode === undefined)) {
        let cachedResolvedSignatures: GoMapValue<tsonicTypeScriptRuntime.Location<SignatureLinks> | undefined, tsonicTypeScriptRuntime.Location<Signature> | undefined> = GoMap.make(0, []);
        let cachedTypes: GoMapValue<tsonicTypeScriptRuntime.Location<ValueSymbolLinks> | undefined, tsonicTypeScriptRuntime.Location<Type> | undefined> = $goMap$MapOf_PointerTo_Named_checker$ValueSymbolLinks_To_PointerTo_Named_checker$Type.make(0, []);
        for (; !(ancestorNode === undefined);) {
            const __gotots_store_3 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value;
            let signatureLinks: tsonicTypeScriptRuntime.Location<SignatureLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SignatureLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "signatureLinks"), ancestorNode);
            cachedResolvedSignatures.store(signatureLinks, SignatureLinks.$storageOf(((signatureLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureLinks>).value).resolvedSignature);
            SignatureLinks.$storageOf(((signatureLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureLinks>).value).resolvedSignature = void 0;
            if (IsFunctionExpressionOrArrowFunction__from_ast(ancestorNode)) {
                const __gotots_store_4 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Checker>).value;
                let symbolLinks: tsonicTypeScriptRuntime.Location<ValueSymbolLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "valueSymbolLinks"), Checker.$go$private$checker$getSymbolOfDeclaration(c, ancestorNode));
                let resolvedType: tsonicTypeScriptRuntime.Location<Type> | undefined = ValueSymbolLinks.$storageOf(((symbolLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).resolvedType;
                cachedTypes.store(symbolLinks, resolvedType);
                ValueSymbolLinks.$storageOf(((symbolLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).resolvedType = void 0;
            }
            ancestorNode = FindAncestor__from_ast(Node__from_ast.$storageOf(((ancestorNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, IsCallLikeOrFunctionLikeExpression__from_ast);
        }
        const __gotots_callee_0 = fn;
        const __gotots_argument_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        let result: T = $go$copy$T0_to_T0(__gotots_argument_0);
        const __gotots_range_0 = cachedResolvedSignatures;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            const __gotots_range_value_3 = __gotots_range_value_1[0];
            let signatureLinks: tsonicTypeScriptRuntime.Location<SignatureLinks> | undefined = __gotots_range_value_2;
            let resolvedSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_3;
            SignatureLinks.$storageOf(((signatureLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureLinks>).value).resolvedSignature = resolvedSignature;
        }
        const __gotots_range_1 = cachedTypes;
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_1.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_4;
            const __gotots_range_value_7 = __gotots_range_value_5[0];
            let symbolLinks: tsonicTypeScriptRuntime.Location<ValueSymbolLinks> | undefined = __gotots_range_value_6;
            let resolvedType: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_7;
            ValueSymbolLinks.$storageOf(((symbolLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).resolvedType = resolvedType;
        }
        return $go$copy$T0_to_T0(result);
    }
    const __gotots_callee_1 = fn;
    const __gotots_argument_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
    return $go$copy$T0_to_T0(__gotots_argument_1);
}
export function isExportSpecifierAlias(referenceLocation: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined, exportSpecifier: {
    value: ExportSpecifier__from_ast;
} | undefined): bool {
    const __gotots_equal_operand_1: ExportSpecifier__from_ast["PropertyName"] = (exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
    const __gotots_store_6 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                            (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                Identifier__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
    let __gotots_logical_result_0 = tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_1, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
    if (!__gotots_logical_result_0) {
        const __gotots_equal_operand_2 = ExportSpecifier__from_ast.Name(exportSpecifier);
        const __gotots_store_7 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                    Identifier__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        __gotots_logical_result_0 =
            tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_2, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
    }
    const __gotots_argument_2 = __gotots_logical_result_0;
    const __gotots_argument_3 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("referenceLocation is not export specifier name or property name")]);
    Assert__from_debug(__gotots_argument_2, __gotots_argument_3);
    let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
    if (!(propertyName === undefined)) {
        const __gotots_equal_operand_3 = propertyName;
        const __gotots_store_8 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                    Identifier__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        return tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_3, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
    }
    else {
        return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined;
    }
}
export function getPossibleSymbolReferenceNodes(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, symbolName: gostring, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return MapNonNil$int$PointerTo_Named_ast$Node(getPossibleSymbolReferencePositions(sourceFile, symbolName, container), (pos: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        {
            let referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, pos);
            const __gotots_equal_operand_0 = referenceLocation;
            const __gotots_store_2 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            if (!tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)))) {
                return referenceLocation;
            }
        }
        return void 0;
    });
}
export function getPossibleSymbolReferencePositions(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, symbolName: gostring, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<int> {
    let positions = RuntimeSlice.literal<int>([]);
    if (symbolName === "") {
        return positions;
    }
    let text = SourceFile__from_ast.Text(sourceFile);
    let sourceLength = text.length;
    let symbolNameLength = symbolName.length;
    if (container === undefined) {
        const __gotots_store_5 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        container = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    let position = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(text, Node__from_ast.Pos(container)), symbolName)));
    let endPos = Node__from_ast.End(container);
    for (; position >= 0 && position < endPos;) {
        let endPosition = position + symbolNameLength;
        if ((position === 0 || !IsIdentifierPart__from_scanner(goStringIndex(text, position - 1))) && (endPosition === sourceLength || !IsIdentifierPart__from_scanner(goStringIndex(text, endPosition)))) {
            positions = positions.append(0, [position]);
        }
        let startIndex = position + symbolNameLength + 1;
        if (startIndex > text.length) {
            break;
        }
        {
            let foundIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(text, startIndex), symbolName)));
            if (foundIndex !== -1) {
                position = startIndex + foundIndex;
            }
            else {
                break;
            }
        }
    }
    return positions;
}
export function isKnownGenericTypeName(name: gostring): bool {
    const __gotots_results_0 = $state.knownGenericTypeNames.lookupOk(name);
    let exists = __gotots_results_0[1];
    return exists;
}
