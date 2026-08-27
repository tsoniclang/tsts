import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExpandoAssignmentInfo$Storage as ExpandoAssignmentInfo__from_binder$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/binder/binder.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FlowList as FlowList__from_ast, FlowList$Storage as FlowList__from_ast$Storage, FlowNode as FlowNode__from_ast, FlowNode$Storage as FlowNode__from_ast$Storage, Node as Node__from_ast, Symbol as Symbol__from_ast, Symbol$Storage as Symbol__from_ast$Storage } from "../ast/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Binder, ContainerFlagsHasLocals$constant, ContainerFlagsIsBlockScopedContainer$constant, ContainerFlagsIsContainer$constant, ContainerFlagsIsControlFlowContainer$constant, ContainerFlagsIsFunctionExpression$constant, ContainerFlagsIsFunctionLike$constant, ContainerFlagsIsInterface$constant, ContainerFlagsIsThisContainer$constant, ContainerFlagsNone$constant, ContainerFlagsPropagatesThisKeyword$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/binder/binder.js";
import { ReferenceResolverHooks, referenceResolver } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/binder/referenceresolver.js";
import { $goInterfaceAdapter$PointerTo_Named_binder$Binder as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { Set as Set__from_collections } from "../collections/package.js";
import { Arena as Arena__from_core } from "../core/package.js";
import { $state } from "./state.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    ContainerFlagsHasLocals = ContainerFlagsHasLocals$constant();
    ContainerFlagsIsBlockScopedContainer = ContainerFlagsIsBlockScopedContainer$constant();
    ContainerFlagsIsContainer = ContainerFlagsIsContainer$constant();
    ContainerFlagsIsControlFlowContainer = ContainerFlagsIsControlFlowContainer$constant();
    ContainerFlagsIsFunctionExpression = ContainerFlagsIsFunctionExpression$constant();
    ContainerFlagsIsFunctionLike = ContainerFlagsIsFunctionLike$constant();
    ContainerFlagsIsInterface = ContainerFlagsIsInterface$constant();
    ContainerFlagsIsThisContainer = ContainerFlagsIsThisContainer$constant();
    ContainerFlagsNone = ContainerFlagsNone$constant();
    ContainerFlagsPropagatesThisKeyword = ContainerFlagsPropagatesThisKeyword$constant();
    $state.binderPool = named_sync.SyncPoolOperations.$zero();
    {
        const __gotots_field_0 = (): GoInterface | undefined => {
            let b: {
                value: Binder;
            } | undefined = { value: new Binder(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, 0, false, false, false, false, false, 0, Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
                    return GoMap.nil();
                }), Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
                    return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.nil();
                }), Arena__from_core.$zero<Symbol__from_ast>(), Arena__from_core.$zero<FlowNode__from_ast>(), Arena__from_core.$zero<FlowList__from_ast>(), Arena__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<ExpandoAssignmentInfo__from_binder$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()) };
            const __gotots_receiver_0 = b;
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bindFunc = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return Binder.$go$private$binder$bind(__gotots_receiver_0, $argument0);
            };
            return new GoInterfaceAdapter(b);
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.binderPool = __gotots_struct_0;
    }
    {
        new referenceResolver(void 0, void 0, ReferenceResolverHooks.$zero());
    }
}
export { ActiveLabel, BindSourceFile, Binder, ContainerFlags, ContainerFlagsHasLocals$constant, ContainerFlagsIsBlockScopedContainer$constant, ContainerFlagsIsContainer$constant, ContainerFlagsIsControlFlowContainer$constant, ContainerFlagsIsFunctionExpression$constant, ContainerFlagsIsFunctionLike$constant, ContainerFlagsIsInterface$constant, ContainerFlagsIsThisContainer$constant, ContainerFlagsNone$constant, ContainerFlagsPropagatesThisKeyword$constant, ExpandoAssignmentInfo, ExpandoAssignmentInfo$Storage, FindUseStrictPrologue, GetContainerFlags, GetSymbolNameForPrivateIdentifier, SetValueDeclaration } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/binder/binder.js";
export { GetLocalSymbolForExportDefault, NameResolver } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/binder/nameresolver.js";
export { NewReferenceResolver, ReferenceResolver, ReferenceResolver$contract, ReferenceResolver$is, ReferenceResolverHooks } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/binder/referenceresolver.js";
export let ContainerFlagsHasLocals: ReturnType<typeof ContainerFlagsHasLocals$constant>;
export let ContainerFlagsIsBlockScopedContainer: ReturnType<typeof ContainerFlagsIsBlockScopedContainer$constant>;
export let ContainerFlagsIsContainer: ReturnType<typeof ContainerFlagsIsContainer$constant>;
export let ContainerFlagsIsControlFlowContainer: ReturnType<typeof ContainerFlagsIsControlFlowContainer$constant>;
export let ContainerFlagsIsFunctionExpression: ReturnType<typeof ContainerFlagsIsFunctionExpression$constant>;
export let ContainerFlagsIsFunctionLike: ReturnType<typeof ContainerFlagsIsFunctionLike$constant>;
export let ContainerFlagsIsInterface: ReturnType<typeof ContainerFlagsIsInterface$constant>;
export let ContainerFlagsIsThisContainer: ReturnType<typeof ContainerFlagsIsThisContainer$constant>;
export let ContainerFlagsNone: ReturnType<typeof ContainerFlagsNone$constant>;
export let ContainerFlagsPropagatesThisKeyword: ReturnType<typeof ContainerFlagsPropagatesThisKeyword$constant>;
