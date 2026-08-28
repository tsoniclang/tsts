import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { DeclarationFileLinks$Storage as DeclarationFileLinks__from_checker$Storage, DeclarationLinks$Storage as DeclarationLinks__from_checker$Storage, JSXLinks$Storage as JSXLinks__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/emitresolver.js";
import type { JsxElementLinks$Storage as JsxElementLinks__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/jsx.js";
import type { NodeBuilderLinks$Storage as NodeBuilderLinks__from_checker$Storage, NodeBuilderSymbolLinks$Storage as NodeBuilderSymbolLinks__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import type { AliasSymbolLinks$Storage as AliasSymbolLinks__from_checker$Storage, ArrayLiteralLinks$Storage as ArrayLiteralLinks__from_checker$Storage, AssertionLinks$Storage as AssertionLinks__from_checker$Storage, ContainingSymbolLinks$Storage as ContainingSymbolLinks__from_checker$Storage, DeclaredTypeLinks$Storage as DeclaredTypeLinks__from_checker$Storage, DeferredSymbolLinks$Storage as DeferredSymbolLinks__from_checker$Storage, EnumMemberLinks$Storage as EnumMemberLinks__from_checker$Storage, ExportTypeLinks$Storage as ExportTypeLinks__from_checker$Storage, LateBoundLinks$Storage as LateBoundLinks__from_checker$Storage, MappedSymbolLinks$Storage as MappedSymbolLinks__from_checker$Storage, MarkedAssignmentSymbolLinks$Storage as MarkedAssignmentSymbolLinks__from_checker$Storage, ModuleSymbolLinks$Storage as ModuleSymbolLinks__from_checker$Storage, NodeLinks$Storage as NodeLinks__from_checker$Storage, ReverseMappedSymbolLinks$Storage as ReverseMappedSymbolLinks__from_checker$Storage, SignatureLinks$Storage as SignatureLinks__from_checker$Storage, SourceFileLinks$Storage as SourceFileLinks__from_checker$Storage, SpreadLinks$Storage as SpreadLinks__from_checker$Storage, SwitchStatementLinks$Storage as SwitchStatementLinks__from_checker$Storage, SymbolNodeLinks$Storage as SymbolNodeLinks__from_checker$Storage, SymbolReferenceLinks$Storage as SymbolReferenceLinks__from_checker$Storage, TypeAliasLinks$Storage as TypeAliasLinks__from_checker$Storage, TypeNodeLinks$Storage as TypeNodeLinks__from_checker$Storage, ValueSymbolLinks$Storage as ValueSymbolLinks__from_checker$Storage, VarianceLinks$Storage as VarianceLinks__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { emitNode$Storage as emitNode__from_printer$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SymbolTable as SymbolTable__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import { DeclarationFileLinks as DeclarationFileLinks__from_checker, DeclarationLinks as DeclarationLinks__from_checker, JSXLinks as JSXLinks__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/emitresolver.js";
import { JsxElementLinks as JsxElementLinks__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/jsx.js";
import { NodeBuilderLinks as NodeBuilderLinks__from_checker, NodeBuilderSymbolLinks as NodeBuilderSymbolLinks__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/nodebuilderimpl.js";
import { AliasSymbolLinks as AliasSymbolLinks__from_checker, ArrayLiteralLinks as ArrayLiteralLinks__from_checker, AssertionLinks as AssertionLinks__from_checker, ContainingSymbolLinks as ContainingSymbolLinks__from_checker, DeclaredTypeLinks as DeclaredTypeLinks__from_checker, DeferredSymbolLinks as DeferredSymbolLinks__from_checker, EnumMemberLinks as EnumMemberLinks__from_checker, ExportTypeLinks as ExportTypeLinks__from_checker, LateBoundLinks as LateBoundLinks__from_checker, MappedSymbolLinks as MappedSymbolLinks__from_checker, MarkedAssignmentSymbolLinks as MarkedAssignmentSymbolLinks__from_checker, MembersAndExportsLinks as MembersAndExportsLinks__from_checker, ModuleSymbolLinks as ModuleSymbolLinks__from_checker, NodeLinks as NodeLinks__from_checker, ReverseMappedSymbolLinks as ReverseMappedSymbolLinks__from_checker, SignatureLinks as SignatureLinks__from_checker, SourceFileLinks as SourceFileLinks__from_checker, SpreadLinks as SpreadLinks__from_checker, SwitchStatementLinks as SwitchStatementLinks__from_checker, SymbolNodeLinks as SymbolNodeLinks__from_checker, SymbolReferenceLinks as SymbolReferenceLinks__from_checker, TypeAliasLinks as TypeAliasLinks__from_checker, TypeNodeLinks as TypeNodeLinks__from_checker, ValueSymbolLinks as ValueSymbolLinks__from_checker, VarianceLinks as VarianceLinks__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import { LinkStore as LinkStore__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/linkstore.js";
import { emitNode as emitNode__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/emitcontext.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$ArrayLiteralLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$AssertionLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationFileLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$EnumMemberLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$JSXLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$JsxElementLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$NodeBuilderLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$NodeLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$SwitchStatementLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$SymbolNodeLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$TypeNodeLinks, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$emitNode, $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_PointerTo_Named_checker$SourceFileLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$AliasSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ContainingSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$DeclaredTypeLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$DeferredSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ExportTypeLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$LateBoundLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$MappedSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$MarkedAssignmentSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$MembersAndExportsLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ModuleSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$NodeBuilderSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ReverseMappedSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$SpreadLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$SymbolReferenceLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$TypeAliasLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ValueSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$VarianceLinks, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$SignatureLinks as GoMap } from "../../../../../../../maps.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goSliceAddress } from "@gotots/runtime/slice.js";
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$ArrayLiteralLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ArrayLiteralLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ArrayLiteralLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ArrayLiteralLinks__from_checker>($argument0, ($argument0: RuntimeSlice<ArrayLiteralLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ArrayLiteralLinks__from_checker$Storage>): RuntimeSlice<ArrayLiteralLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: ArrayLiteralLinks__from_checker): ArrayLiteralLinks__from_checker => {
        return ArrayLiteralLinks__from_checker.$copy($argument0);
    }, ($argument0: ArrayLiteralLinks__from_checker$Storage): ArrayLiteralLinks__from_checker => {
        return ArrayLiteralLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ArrayLiteralLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ArrayLiteralLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ArrayLiteralLinks__from_checker$Storage, ArrayLiteralLinks__from_checker>(goSliceAddress<ArrayLiteralLinks__from_checker$Storage>($argument0, $argument1), ArrayLiteralLinks__from_checker.$fromStorage, ArrayLiteralLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<ArrayLiteralLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ArrayLiteralLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<ArrayLiteralLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$ArrayLiteralLinks.make(0, []);
    }, ($argument0: ArrayLiteralLinks__from_checker): ArrayLiteralLinks__from_checker$Storage => {
        return ArrayLiteralLinks__from_checker.$storageOf($argument0);
    }, (): ArrayLiteralLinks__from_checker => {
        return ArrayLiteralLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$AssertionLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, AssertionLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<AssertionLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, AssertionLinks__from_checker>($argument0, ($argument0: RuntimeSlice<AssertionLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<AssertionLinks__from_checker$Storage>): RuntimeSlice<AssertionLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: AssertionLinks__from_checker): AssertionLinks__from_checker => {
        return AssertionLinks__from_checker.$copy($argument0);
    }, ($argument0: AssertionLinks__from_checker$Storage): AssertionLinks__from_checker => {
        return AssertionLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<AssertionLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<AssertionLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<AssertionLinks__from_checker$Storage, AssertionLinks__from_checker>(goSliceAddress<AssertionLinks__from_checker$Storage>($argument0, $argument1), AssertionLinks__from_checker.$fromStorage, AssertionLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<AssertionLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<AssertionLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<AssertionLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$AssertionLinks.make(0, []);
    }, ($argument0: AssertionLinks__from_checker): AssertionLinks__from_checker$Storage => {
        return AssertionLinks__from_checker.$storageOf($argument0);
    }, (): AssertionLinks__from_checker => {
        return AssertionLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationFileLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationFileLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<DeclarationFileLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationFileLinks__from_checker>($argument0, ($argument0: RuntimeSlice<DeclarationFileLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<DeclarationFileLinks__from_checker$Storage>): RuntimeSlice<DeclarationFileLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: DeclarationFileLinks__from_checker): DeclarationFileLinks__from_checker => {
        return DeclarationFileLinks__from_checker.$copy($argument0);
    }, ($argument0: DeclarationFileLinks__from_checker$Storage): DeclarationFileLinks__from_checker => {
        return DeclarationFileLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<DeclarationFileLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<DeclarationFileLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<DeclarationFileLinks__from_checker$Storage, DeclarationFileLinks__from_checker>(goSliceAddress<DeclarationFileLinks__from_checker$Storage>($argument0, $argument1), DeclarationFileLinks__from_checker.$fromStorage, DeclarationFileLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<DeclarationFileLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<DeclarationFileLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<DeclarationFileLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationFileLinks.make(0, []);
    }, ($argument0: DeclarationFileLinks__from_checker): DeclarationFileLinks__from_checker$Storage => {
        return DeclarationFileLinks__from_checker.$storageOf($argument0);
    }, (): DeclarationFileLinks__from_checker => {
        return DeclarationFileLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$DeclarationLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<DeclarationLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, DeclarationLinks__from_checker>($argument0, ($argument0: RuntimeSlice<DeclarationLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<DeclarationLinks__from_checker$Storage>): RuntimeSlice<DeclarationLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: DeclarationLinks__from_checker): DeclarationLinks__from_checker => {
        return DeclarationLinks__from_checker.$copy($argument0);
    }, ($argument0: DeclarationLinks__from_checker$Storage): DeclarationLinks__from_checker => {
        return DeclarationLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<DeclarationLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<DeclarationLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<DeclarationLinks__from_checker$Storage, DeclarationLinks__from_checker>(goSliceAddress<DeclarationLinks__from_checker$Storage>($argument0, $argument1), DeclarationLinks__from_checker.$fromStorage, DeclarationLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<DeclarationLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<DeclarationLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<DeclarationLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$DeclarationLinks.make(0, []);
    }, ($argument0: DeclarationLinks__from_checker): DeclarationLinks__from_checker$Storage => {
        return DeclarationLinks__from_checker.$storageOf($argument0);
    }, (): DeclarationLinks__from_checker => {
        return DeclarationLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$EnumMemberLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, EnumMemberLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<EnumMemberLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, EnumMemberLinks__from_checker>($argument0, ($argument0: RuntimeSlice<EnumMemberLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<EnumMemberLinks__from_checker$Storage>): RuntimeSlice<EnumMemberLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: EnumMemberLinks__from_checker): EnumMemberLinks__from_checker => {
        return EnumMemberLinks__from_checker.$copy($argument0);
    }, ($argument0: EnumMemberLinks__from_checker$Storage): EnumMemberLinks__from_checker => {
        return EnumMemberLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<EnumMemberLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<EnumMemberLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<EnumMemberLinks__from_checker$Storage, EnumMemberLinks__from_checker>(goSliceAddress<EnumMemberLinks__from_checker$Storage>($argument0, $argument1), EnumMemberLinks__from_checker.$fromStorage, EnumMemberLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<EnumMemberLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<EnumMemberLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<EnumMemberLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$EnumMemberLinks.make(0, []);
    }, ($argument0: EnumMemberLinks__from_checker): EnumMemberLinks__from_checker$Storage => {
        return EnumMemberLinks__from_checker.$storageOf($argument0);
    }, (): EnumMemberLinks__from_checker => {
        return EnumMemberLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$JSXLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JSXLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<JSXLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JSXLinks__from_checker>($argument0, ($argument0: RuntimeSlice<JSXLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<JSXLinks__from_checker$Storage>): RuntimeSlice<JSXLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: JSXLinks__from_checker): JSXLinks__from_checker => {
        return JSXLinks__from_checker.$copy($argument0);
    }, ($argument0: JSXLinks__from_checker$Storage): JSXLinks__from_checker => {
        return JSXLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<JSXLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<JSXLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<JSXLinks__from_checker$Storage, JSXLinks__from_checker>(goSliceAddress<JSXLinks__from_checker$Storage>($argument0, $argument1), JSXLinks__from_checker.$fromStorage, JSXLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<JSXLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<JSXLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<JSXLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$JSXLinks.make(0, []);
    }, ($argument0: JSXLinks__from_checker): JSXLinks__from_checker$Storage => {
        return JSXLinks__from_checker.$storageOf($argument0);
    }, (): JSXLinks__from_checker => {
        return JSXLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$JsxElementLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JsxElementLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<JsxElementLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, JsxElementLinks__from_checker>($argument0, ($argument0: RuntimeSlice<JsxElementLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<JsxElementLinks__from_checker$Storage>): RuntimeSlice<JsxElementLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: JsxElementLinks__from_checker): JsxElementLinks__from_checker => {
        return JsxElementLinks__from_checker.$copy($argument0);
    }, ($argument0: JsxElementLinks__from_checker$Storage): JsxElementLinks__from_checker => {
        return JsxElementLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<JsxElementLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<JsxElementLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<JsxElementLinks__from_checker$Storage, JsxElementLinks__from_checker>(goSliceAddress<JsxElementLinks__from_checker$Storage>($argument0, $argument1), JsxElementLinks__from_checker.$fromStorage, JsxElementLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<JsxElementLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<JsxElementLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<JsxElementLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$JsxElementLinks.make(0, []);
    }, ($argument0: JsxElementLinks__from_checker): JsxElementLinks__from_checker$Storage => {
        return JsxElementLinks__from_checker.$storageOf($argument0);
    }, (): JsxElementLinks__from_checker => {
        return JsxElementLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeBuilderLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks__from_checker>($argument0, ($argument0: RuntimeSlice<NodeBuilderLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<NodeBuilderLinks__from_checker$Storage>): RuntimeSlice<NodeBuilderLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: NodeBuilderLinks__from_checker): NodeBuilderLinks__from_checker => {
        return NodeBuilderLinks__from_checker.$copy($argument0);
    }, ($argument0: NodeBuilderLinks__from_checker$Storage): NodeBuilderLinks__from_checker => {
        return NodeBuilderLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<NodeBuilderLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<NodeBuilderLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<NodeBuilderLinks__from_checker$Storage, NodeBuilderLinks__from_checker>(goSliceAddress<NodeBuilderLinks__from_checker$Storage>($argument0, $argument1), NodeBuilderLinks__from_checker.$fromStorage, NodeBuilderLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<NodeBuilderLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<NodeBuilderLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<NodeBuilderLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$NodeBuilderLinks.make(0, []);
    }, ($argument0: NodeBuilderLinks__from_checker): NodeBuilderLinks__from_checker$Storage => {
        return NodeBuilderLinks__from_checker.$storageOf($argument0);
    }, (): NodeBuilderLinks__from_checker => {
        return NodeBuilderLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeLinks__from_checker>($argument0, ($argument0: RuntimeSlice<NodeLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<NodeLinks__from_checker$Storage>): RuntimeSlice<NodeLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: NodeLinks__from_checker): NodeLinks__from_checker => {
        return NodeLinks__from_checker.$copy($argument0);
    }, ($argument0: NodeLinks__from_checker$Storage): NodeLinks__from_checker => {
        return NodeLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<NodeLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<NodeLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<NodeLinks__from_checker$Storage, NodeLinks__from_checker>(goSliceAddress<NodeLinks__from_checker$Storage>($argument0, $argument1), NodeLinks__from_checker.$fromStorage, NodeLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<NodeLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<NodeLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<NodeLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$NodeLinks.make(0, []);
    }, ($argument0: NodeLinks__from_checker): NodeLinks__from_checker$Storage => {
        return NodeLinks__from_checker.$storageOf($argument0);
    }, (): NodeLinks__from_checker => {
        return NodeLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SignatureLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SignatureLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SignatureLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SignatureLinks__from_checker>($argument0, ($argument0: RuntimeSlice<SignatureLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<SignatureLinks__from_checker$Storage>): RuntimeSlice<SignatureLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: SignatureLinks__from_checker): SignatureLinks__from_checker => {
        return SignatureLinks__from_checker.$copy($argument0);
    }, ($argument0: SignatureLinks__from_checker$Storage): SignatureLinks__from_checker => {
        return SignatureLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<SignatureLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<SignatureLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<SignatureLinks__from_checker$Storage, SignatureLinks__from_checker>(goSliceAddress<SignatureLinks__from_checker$Storage>($argument0, $argument1), SignatureLinks__from_checker.$fromStorage, SignatureLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<SignatureLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SignatureLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SignatureLinks__from_checker> | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: SignatureLinks__from_checker): SignatureLinks__from_checker$Storage => {
        return SignatureLinks__from_checker.$storageOf($argument0);
    }, (): SignatureLinks__from_checker => {
        return SignatureLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SwitchStatementLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SwitchStatementLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SwitchStatementLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SwitchStatementLinks__from_checker>($argument0, ($argument0: RuntimeSlice<SwitchStatementLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<SwitchStatementLinks__from_checker$Storage>): RuntimeSlice<SwitchStatementLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: SwitchStatementLinks__from_checker): SwitchStatementLinks__from_checker => {
        return SwitchStatementLinks__from_checker.$copy($argument0);
    }, ($argument0: SwitchStatementLinks__from_checker$Storage): SwitchStatementLinks__from_checker => {
        return SwitchStatementLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<SwitchStatementLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<SwitchStatementLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<SwitchStatementLinks__from_checker$Storage, SwitchStatementLinks__from_checker>(goSliceAddress<SwitchStatementLinks__from_checker$Storage>($argument0, $argument1), SwitchStatementLinks__from_checker.$fromStorage, SwitchStatementLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<SwitchStatementLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SwitchStatementLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SwitchStatementLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$SwitchStatementLinks.make(0, []);
    }, ($argument0: SwitchStatementLinks__from_checker): SwitchStatementLinks__from_checker$Storage => {
        return SwitchStatementLinks__from_checker.$storageOf($argument0);
    }, (): SwitchStatementLinks__from_checker => {
        return SwitchStatementLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SymbolNodeLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SymbolNodeLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SymbolNodeLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SymbolNodeLinks__from_checker>($argument0, ($argument0: RuntimeSlice<SymbolNodeLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<SymbolNodeLinks__from_checker$Storage>): RuntimeSlice<SymbolNodeLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: SymbolNodeLinks__from_checker): SymbolNodeLinks__from_checker => {
        return SymbolNodeLinks__from_checker.$copy($argument0);
    }, ($argument0: SymbolNodeLinks__from_checker$Storage): SymbolNodeLinks__from_checker => {
        return SymbolNodeLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<SymbolNodeLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<SymbolNodeLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<SymbolNodeLinks__from_checker$Storage, SymbolNodeLinks__from_checker>(goSliceAddress<SymbolNodeLinks__from_checker$Storage>($argument0, $argument1), SymbolNodeLinks__from_checker.$fromStorage, SymbolNodeLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<SymbolNodeLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SymbolNodeLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SymbolNodeLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$SymbolNodeLinks.make(0, []);
    }, ($argument0: SymbolNodeLinks__from_checker): SymbolNodeLinks__from_checker$Storage => {
        return SymbolNodeLinks__from_checker.$storageOf($argument0);
    }, (): SymbolNodeLinks__from_checker => {
        return SymbolNodeLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$TypeNodeLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, TypeNodeLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<TypeNodeLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, TypeNodeLinks__from_checker>($argument0, ($argument0: RuntimeSlice<TypeNodeLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeNodeLinks__from_checker$Storage>): RuntimeSlice<TypeNodeLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: TypeNodeLinks__from_checker): TypeNodeLinks__from_checker => {
        return TypeNodeLinks__from_checker.$copy($argument0);
    }, ($argument0: TypeNodeLinks__from_checker$Storage): TypeNodeLinks__from_checker => {
        return TypeNodeLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeNodeLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeNodeLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeNodeLinks__from_checker$Storage, TypeNodeLinks__from_checker>(goSliceAddress<TypeNodeLinks__from_checker$Storage>($argument0, $argument1), TypeNodeLinks__from_checker.$fromStorage, TypeNodeLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<TypeNodeLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<TypeNodeLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<TypeNodeLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$TypeNodeLinks.make(0, []);
    }, ($argument0: TypeNodeLinks__from_checker): TypeNodeLinks__from_checker$Storage => {
        return TypeNodeLinks__from_checker.$storageOf($argument0);
    }, (): TypeNodeLinks__from_checker => {
        return TypeNodeLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode__from_printer>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<emitNode__from_printer> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode__from_printer>($argument0, ($argument0: RuntimeSlice<emitNode__from_printer$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<emitNode__from_printer$Storage>): RuntimeSlice<emitNode__from_printer$Storage> => {
        return $argument0;
    }, ($argument0: emitNode__from_printer): emitNode__from_printer => {
        return emitNode__from_printer.$copy($argument0);
    }, ($argument0: emitNode__from_printer$Storage): emitNode__from_printer => {
        return emitNode__from_printer.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<emitNode__from_printer$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<emitNode__from_printer> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<emitNode__from_printer$Storage, emitNode__from_printer>(goSliceAddress<emitNode__from_printer$Storage>($argument0, $argument1), emitNode__from_printer.$fromStorage, emitNode__from_printer.$storageOf);
    }, ($argument0: RuntimeSlice<emitNode__from_printer$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<emitNode__from_printer> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<emitNode__from_printer> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$emitNode.make(0, []);
    }, ($argument0: emitNode__from_printer): emitNode__from_printer$Storage => {
        return emitNode__from_printer.$storageOf($argument0);
    }, (): emitNode__from_printer => {
        return emitNode__from_printer.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$SourceFile$Named_checker$SourceFileLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, SourceFileLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFileLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, SourceFileLinks__from_checker>($argument0, ($argument0: RuntimeSlice<SourceFileLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<SourceFileLinks__from_checker$Storage>): RuntimeSlice<SourceFileLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: SourceFileLinks__from_checker): SourceFileLinks__from_checker => {
        return SourceFileLinks__from_checker.$copy($argument0);
    }, ($argument0: SourceFileLinks__from_checker$Storage): SourceFileLinks__from_checker => {
        return SourceFileLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<SourceFileLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<SourceFileLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<SourceFileLinks__from_checker$Storage, SourceFileLinks__from_checker>(goSliceAddress<SourceFileLinks__from_checker$Storage>($argument0, $argument1), SourceFileLinks__from_checker.$fromStorage, SourceFileLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<SourceFileLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFileLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFileLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_PointerTo_Named_checker$SourceFileLinks.make(0, []);
    }, ($argument0: SourceFileLinks__from_checker): SourceFileLinks__from_checker$Storage => {
        return SourceFileLinks__from_checker.$storageOf($argument0);
    }, (): SourceFileLinks__from_checker => {
        return SourceFileLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$AliasSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, AliasSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<AliasSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, AliasSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<AliasSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<AliasSymbolLinks__from_checker$Storage>): RuntimeSlice<AliasSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: AliasSymbolLinks__from_checker): AliasSymbolLinks__from_checker => {
        return AliasSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: AliasSymbolLinks__from_checker$Storage): AliasSymbolLinks__from_checker => {
        return AliasSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<AliasSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<AliasSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<AliasSymbolLinks__from_checker$Storage, AliasSymbolLinks__from_checker>(goSliceAddress<AliasSymbolLinks__from_checker$Storage>($argument0, $argument1), AliasSymbolLinks__from_checker.$fromStorage, AliasSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<AliasSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<AliasSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<AliasSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$AliasSymbolLinks.make(0, []);
    }, ($argument0: AliasSymbolLinks__from_checker): AliasSymbolLinks__from_checker$Storage => {
        return AliasSymbolLinks__from_checker.$storageOf($argument0);
    }, (): AliasSymbolLinks__from_checker => {
        return AliasSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ContainingSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ContainingSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ContainingSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ContainingSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<ContainingSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ContainingSymbolLinks__from_checker$Storage>): RuntimeSlice<ContainingSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: ContainingSymbolLinks__from_checker): ContainingSymbolLinks__from_checker => {
        return ContainingSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: ContainingSymbolLinks__from_checker$Storage): ContainingSymbolLinks__from_checker => {
        return ContainingSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ContainingSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ContainingSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ContainingSymbolLinks__from_checker$Storage, ContainingSymbolLinks__from_checker>(goSliceAddress<ContainingSymbolLinks__from_checker$Storage>($argument0, $argument1), ContainingSymbolLinks__from_checker.$fromStorage, ContainingSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<ContainingSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ContainingSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<ContainingSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ContainingSymbolLinks.make(0, []);
    }, ($argument0: ContainingSymbolLinks__from_checker): ContainingSymbolLinks__from_checker$Storage => {
        return ContainingSymbolLinks__from_checker.$storageOf($argument0);
    }, (): ContainingSymbolLinks__from_checker => {
        return ContainingSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$DeclaredTypeLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, DeclaredTypeLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<DeclaredTypeLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, DeclaredTypeLinks__from_checker>($argument0, ($argument0: RuntimeSlice<DeclaredTypeLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<DeclaredTypeLinks__from_checker$Storage>): RuntimeSlice<DeclaredTypeLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: DeclaredTypeLinks__from_checker): DeclaredTypeLinks__from_checker => {
        return DeclaredTypeLinks__from_checker.$copy($argument0);
    }, ($argument0: DeclaredTypeLinks__from_checker$Storage): DeclaredTypeLinks__from_checker => {
        return DeclaredTypeLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<DeclaredTypeLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<DeclaredTypeLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<DeclaredTypeLinks__from_checker$Storage, DeclaredTypeLinks__from_checker>(goSliceAddress<DeclaredTypeLinks__from_checker$Storage>($argument0, $argument1), DeclaredTypeLinks__from_checker.$fromStorage, DeclaredTypeLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<DeclaredTypeLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<DeclaredTypeLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<DeclaredTypeLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$DeclaredTypeLinks.make(0, []);
    }, ($argument0: DeclaredTypeLinks__from_checker): DeclaredTypeLinks__from_checker$Storage => {
        return DeclaredTypeLinks__from_checker.$storageOf($argument0);
    }, (): DeclaredTypeLinks__from_checker => {
        return DeclaredTypeLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$DeferredSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, DeferredSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<DeferredSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, DeferredSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<DeferredSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<DeferredSymbolLinks__from_checker$Storage>): RuntimeSlice<DeferredSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: DeferredSymbolLinks__from_checker): DeferredSymbolLinks__from_checker => {
        return DeferredSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: DeferredSymbolLinks__from_checker$Storage): DeferredSymbolLinks__from_checker => {
        return DeferredSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<DeferredSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<DeferredSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<DeferredSymbolLinks__from_checker$Storage, DeferredSymbolLinks__from_checker>(goSliceAddress<DeferredSymbolLinks__from_checker$Storage>($argument0, $argument1), DeferredSymbolLinks__from_checker.$fromStorage, DeferredSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<DeferredSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<DeferredSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<DeferredSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$DeferredSymbolLinks.make(0, []);
    }, ($argument0: DeferredSymbolLinks__from_checker): DeferredSymbolLinks__from_checker$Storage => {
        return DeferredSymbolLinks__from_checker.$storageOf($argument0);
    }, (): DeferredSymbolLinks__from_checker => {
        return DeferredSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ExportTypeLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ExportTypeLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ExportTypeLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ExportTypeLinks__from_checker>($argument0, ($argument0: RuntimeSlice<ExportTypeLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ExportTypeLinks__from_checker$Storage>): RuntimeSlice<ExportTypeLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: ExportTypeLinks__from_checker): ExportTypeLinks__from_checker => {
        return ExportTypeLinks__from_checker.$copy($argument0);
    }, ($argument0: ExportTypeLinks__from_checker$Storage): ExportTypeLinks__from_checker => {
        return ExportTypeLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ExportTypeLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ExportTypeLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ExportTypeLinks__from_checker$Storage, ExportTypeLinks__from_checker>(goSliceAddress<ExportTypeLinks__from_checker$Storage>($argument0, $argument1), ExportTypeLinks__from_checker.$fromStorage, ExportTypeLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<ExportTypeLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ExportTypeLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<ExportTypeLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ExportTypeLinks.make(0, []);
    }, ($argument0: ExportTypeLinks__from_checker): ExportTypeLinks__from_checker$Storage => {
        return ExportTypeLinks__from_checker.$storageOf($argument0);
    }, (): ExportTypeLinks__from_checker => {
        return ExportTypeLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$LateBoundLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, LateBoundLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<LateBoundLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, LateBoundLinks__from_checker>($argument0, ($argument0: RuntimeSlice<LateBoundLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<LateBoundLinks__from_checker$Storage>): RuntimeSlice<LateBoundLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: LateBoundLinks__from_checker): LateBoundLinks__from_checker => {
        return LateBoundLinks__from_checker.$copy($argument0);
    }, ($argument0: LateBoundLinks__from_checker$Storage): LateBoundLinks__from_checker => {
        return LateBoundLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<LateBoundLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<LateBoundLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<LateBoundLinks__from_checker$Storage, LateBoundLinks__from_checker>(goSliceAddress<LateBoundLinks__from_checker$Storage>($argument0, $argument1), LateBoundLinks__from_checker.$fromStorage, LateBoundLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<LateBoundLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<LateBoundLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<LateBoundLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$LateBoundLinks.make(0, []);
    }, ($argument0: LateBoundLinks__from_checker): LateBoundLinks__from_checker$Storage => {
        return LateBoundLinks__from_checker.$storageOf($argument0);
    }, (): LateBoundLinks__from_checker => {
        return LateBoundLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$MappedSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MappedSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<MappedSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MappedSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<MappedSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<MappedSymbolLinks__from_checker$Storage>): RuntimeSlice<MappedSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: MappedSymbolLinks__from_checker): MappedSymbolLinks__from_checker => {
        return MappedSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: MappedSymbolLinks__from_checker$Storage): MappedSymbolLinks__from_checker => {
        return MappedSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<MappedSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<MappedSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<MappedSymbolLinks__from_checker$Storage, MappedSymbolLinks__from_checker>(goSliceAddress<MappedSymbolLinks__from_checker$Storage>($argument0, $argument1), MappedSymbolLinks__from_checker.$fromStorage, MappedSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<MappedSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<MappedSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<MappedSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$MappedSymbolLinks.make(0, []);
    }, ($argument0: MappedSymbolLinks__from_checker): MappedSymbolLinks__from_checker$Storage => {
        return MappedSymbolLinks__from_checker.$storageOf($argument0);
    }, (): MappedSymbolLinks__from_checker => {
        return MappedSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$MarkedAssignmentSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MarkedAssignmentSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<MarkedAssignmentSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MarkedAssignmentSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<MarkedAssignmentSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<MarkedAssignmentSymbolLinks__from_checker$Storage>): RuntimeSlice<MarkedAssignmentSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: MarkedAssignmentSymbolLinks__from_checker): MarkedAssignmentSymbolLinks__from_checker => {
        return MarkedAssignmentSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: MarkedAssignmentSymbolLinks__from_checker$Storage): MarkedAssignmentSymbolLinks__from_checker => {
        return MarkedAssignmentSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<MarkedAssignmentSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<MarkedAssignmentSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<MarkedAssignmentSymbolLinks__from_checker$Storage, MarkedAssignmentSymbolLinks__from_checker>(goSliceAddress<MarkedAssignmentSymbolLinks__from_checker$Storage>($argument0, $argument1), MarkedAssignmentSymbolLinks__from_checker.$fromStorage, MarkedAssignmentSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<MarkedAssignmentSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<MarkedAssignmentSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<MarkedAssignmentSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$MarkedAssignmentSymbolLinks.make(0, []);
    }, ($argument0: MarkedAssignmentSymbolLinks__from_checker): MarkedAssignmentSymbolLinks__from_checker$Storage => {
        return MarkedAssignmentSymbolLinks__from_checker.$storageOf($argument0);
    }, (): MarkedAssignmentSymbolLinks__from_checker => {
        return MarkedAssignmentSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$MembersAndExportsLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MembersAndExportsLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<MembersAndExportsLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, MembersAndExportsLinks__from_checker>($argument0, ($argument0: RuntimeSlice<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>>): RuntimeSlice<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>> => {
        return $argument0;
    }, ($argument0: MembersAndExportsLinks__from_checker): MembersAndExportsLinks__from_checker => {
        return new MembersAndExportsLinks__from_checker($argument0.$value.copy());
    }, ($argument0: GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>): MembersAndExportsLinks__from_checker => {
        return new MembersAndExportsLinks__from_checker($argument0);
    }, ($argument0: RuntimeSlice<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>>, $argument1: int): tsonicTypeScriptRuntime.Location<MembersAndExportsLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>, MembersAndExportsLinks__from_checker>(goSliceAddress<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>>($argument0, $argument1), ($go$storage: GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>): MembersAndExportsLinks__from_checker => {
            return new MembersAndExportsLinks__from_checker($go$storage);
        }, ($go$value: MembersAndExportsLinks__from_checker): GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2> => {
            return $go$value.$value;
        });
    }, ($argument0: RuntimeSlice<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<MembersAndExportsLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<MembersAndExportsLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$MembersAndExportsLinks.make(0, []);
    }, ($argument0: MembersAndExportsLinks__from_checker): GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2> => {
        return $argument0.$value;
    }, (): MembersAndExportsLinks__from_checker => {
        return new MembersAndExportsLinks__from_checker(GoArray.zero<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>(2, new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.nil()).$value));
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ModuleSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ModuleSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModuleSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ModuleSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<ModuleSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ModuleSymbolLinks__from_checker$Storage>): RuntimeSlice<ModuleSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: ModuleSymbolLinks__from_checker): ModuleSymbolLinks__from_checker => {
        return ModuleSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: ModuleSymbolLinks__from_checker$Storage): ModuleSymbolLinks__from_checker => {
        return ModuleSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ModuleSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ModuleSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ModuleSymbolLinks__from_checker$Storage, ModuleSymbolLinks__from_checker>(goSliceAddress<ModuleSymbolLinks__from_checker$Storage>($argument0, $argument1), ModuleSymbolLinks__from_checker.$fromStorage, ModuleSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<ModuleSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ModuleSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<ModuleSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ModuleSymbolLinks.make(0, []);
    }, ($argument0: ModuleSymbolLinks__from_checker): ModuleSymbolLinks__from_checker$Storage => {
        return ModuleSymbolLinks__from_checker.$storageOf($argument0);
    }, (): ModuleSymbolLinks__from_checker => {
        return ModuleSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$NodeBuilderSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, NodeBuilderSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, NodeBuilderSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<NodeBuilderSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<NodeBuilderSymbolLinks__from_checker$Storage>): RuntimeSlice<NodeBuilderSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: NodeBuilderSymbolLinks__from_checker): NodeBuilderSymbolLinks__from_checker => {
        return NodeBuilderSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: NodeBuilderSymbolLinks__from_checker$Storage): NodeBuilderSymbolLinks__from_checker => {
        return NodeBuilderSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<NodeBuilderSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<NodeBuilderSymbolLinks__from_checker$Storage, NodeBuilderSymbolLinks__from_checker>(goSliceAddress<NodeBuilderSymbolLinks__from_checker$Storage>($argument0, $argument1), NodeBuilderSymbolLinks__from_checker.$fromStorage, NodeBuilderSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<NodeBuilderSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$NodeBuilderSymbolLinks.make(0, []);
    }, ($argument0: NodeBuilderSymbolLinks__from_checker): NodeBuilderSymbolLinks__from_checker$Storage => {
        return NodeBuilderSymbolLinks__from_checker.$storageOf($argument0);
    }, (): NodeBuilderSymbolLinks__from_checker => {
        return NodeBuilderSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ReverseMappedSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<ReverseMappedSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ReverseMappedSymbolLinks__from_checker$Storage>): RuntimeSlice<ReverseMappedSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: ReverseMappedSymbolLinks__from_checker): ReverseMappedSymbolLinks__from_checker => {
        return ReverseMappedSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: ReverseMappedSymbolLinks__from_checker$Storage): ReverseMappedSymbolLinks__from_checker => {
        return ReverseMappedSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ReverseMappedSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ReverseMappedSymbolLinks__from_checker$Storage, ReverseMappedSymbolLinks__from_checker>(goSliceAddress<ReverseMappedSymbolLinks__from_checker$Storage>($argument0, $argument1), ReverseMappedSymbolLinks__from_checker.$fromStorage, ReverseMappedSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<ReverseMappedSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ReverseMappedSymbolLinks.make(0, []);
    }, ($argument0: ReverseMappedSymbolLinks__from_checker): ReverseMappedSymbolLinks__from_checker$Storage => {
        return ReverseMappedSymbolLinks__from_checker.$storageOf($argument0);
    }, (): ReverseMappedSymbolLinks__from_checker => {
        return ReverseMappedSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$SpreadLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, SpreadLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SpreadLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, SpreadLinks__from_checker>($argument0, ($argument0: RuntimeSlice<SpreadLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<SpreadLinks__from_checker$Storage>): RuntimeSlice<SpreadLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: SpreadLinks__from_checker): SpreadLinks__from_checker => {
        return SpreadLinks__from_checker.$copy($argument0);
    }, ($argument0: SpreadLinks__from_checker$Storage): SpreadLinks__from_checker => {
        return SpreadLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<SpreadLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<SpreadLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<SpreadLinks__from_checker$Storage, SpreadLinks__from_checker>(goSliceAddress<SpreadLinks__from_checker$Storage>($argument0, $argument1), SpreadLinks__from_checker.$fromStorage, SpreadLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<SpreadLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SpreadLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SpreadLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$SpreadLinks.make(0, []);
    }, ($argument0: SpreadLinks__from_checker): SpreadLinks__from_checker$Storage => {
        return SpreadLinks__from_checker.$storageOf($argument0);
    }, (): SpreadLinks__from_checker => {
        return SpreadLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$SymbolReferenceLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, SymbolReferenceLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SymbolReferenceLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, SymbolReferenceLinks__from_checker>($argument0, ($argument0: RuntimeSlice<SymbolReferenceLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<SymbolReferenceLinks__from_checker$Storage>): RuntimeSlice<SymbolReferenceLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: SymbolReferenceLinks__from_checker): SymbolReferenceLinks__from_checker => {
        return SymbolReferenceLinks__from_checker.$copy($argument0);
    }, ($argument0: SymbolReferenceLinks__from_checker$Storage): SymbolReferenceLinks__from_checker => {
        return SymbolReferenceLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<SymbolReferenceLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<SymbolReferenceLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<SymbolReferenceLinks__from_checker$Storage, SymbolReferenceLinks__from_checker>(goSliceAddress<SymbolReferenceLinks__from_checker$Storage>($argument0, $argument1), SymbolReferenceLinks__from_checker.$fromStorage, SymbolReferenceLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<SymbolReferenceLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SymbolReferenceLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SymbolReferenceLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$SymbolReferenceLinks.make(0, []);
    }, ($argument0: SymbolReferenceLinks__from_checker): SymbolReferenceLinks__from_checker$Storage => {
        return SymbolReferenceLinks__from_checker.$storageOf($argument0);
    }, (): SymbolReferenceLinks__from_checker => {
        return SymbolReferenceLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$TypeAliasLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, TypeAliasLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<TypeAliasLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, TypeAliasLinks__from_checker>($argument0, ($argument0: RuntimeSlice<TypeAliasLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeAliasLinks__from_checker$Storage>): RuntimeSlice<TypeAliasLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: TypeAliasLinks__from_checker): TypeAliasLinks__from_checker => {
        return TypeAliasLinks__from_checker.$copy($argument0);
    }, ($argument0: TypeAliasLinks__from_checker$Storage): TypeAliasLinks__from_checker => {
        return TypeAliasLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeAliasLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeAliasLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeAliasLinks__from_checker$Storage, TypeAliasLinks__from_checker>(goSliceAddress<TypeAliasLinks__from_checker$Storage>($argument0, $argument1), TypeAliasLinks__from_checker.$fromStorage, TypeAliasLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<TypeAliasLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<TypeAliasLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<TypeAliasLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$TypeAliasLinks.make(0, []);
    }, ($argument0: TypeAliasLinks__from_checker): TypeAliasLinks__from_checker$Storage => {
        return TypeAliasLinks__from_checker.$storageOf($argument0);
    }, (): TypeAliasLinks__from_checker => {
        return TypeAliasLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ValueSymbolLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks__from_checker>($argument0, ($argument0: RuntimeSlice<ValueSymbolLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ValueSymbolLinks__from_checker$Storage>): RuntimeSlice<ValueSymbolLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: ValueSymbolLinks__from_checker): ValueSymbolLinks__from_checker => {
        return ValueSymbolLinks__from_checker.$copy($argument0);
    }, ($argument0: ValueSymbolLinks__from_checker$Storage): ValueSymbolLinks__from_checker => {
        return ValueSymbolLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ValueSymbolLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ValueSymbolLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ValueSymbolLinks__from_checker$Storage, ValueSymbolLinks__from_checker>(goSliceAddress<ValueSymbolLinks__from_checker$Storage>($argument0, $argument1), ValueSymbolLinks__from_checker.$fromStorage, ValueSymbolLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<ValueSymbolLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ValueSymbolLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<ValueSymbolLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$ValueSymbolLinks.make(0, []);
    }, ($argument0: ValueSymbolLinks__from_checker): ValueSymbolLinks__from_checker$Storage => {
        return ValueSymbolLinks__from_checker.$storageOf($argument0);
    }, (): ValueSymbolLinks__from_checker => {
        return ValueSymbolLinks__from_checker.$zero();
    }, $argument1);
}
export function LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$VarianceLinks($argument0: tsonicTypeScriptRuntime.Location<LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, VarianceLinks__from_checker>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<VarianceLinks__from_checker> | undefined {
    return LinkStore__from_core.Get$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, VarianceLinks__from_checker>($argument0, ($argument0: RuntimeSlice<VarianceLinks__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<VarianceLinks__from_checker$Storage>): RuntimeSlice<VarianceLinks__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: VarianceLinks__from_checker): VarianceLinks__from_checker => {
        return VarianceLinks__from_checker.$copy($argument0);
    }, ($argument0: VarianceLinks__from_checker$Storage): VarianceLinks__from_checker => {
        return VarianceLinks__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<VarianceLinks__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<VarianceLinks__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<VarianceLinks__from_checker$Storage, VarianceLinks__from_checker>(goSliceAddress<VarianceLinks__from_checker$Storage>($argument0, $argument1), VarianceLinks__from_checker.$fromStorage, VarianceLinks__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<VarianceLinks__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<VarianceLinks__from_checker> | undefined): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<VarianceLinks__from_checker> | undefined> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$VarianceLinks.make(0, []);
    }, ($argument0: VarianceLinks__from_checker): VarianceLinks__from_checker$Storage => {
        return VarianceLinks__from_checker.$storageOf($argument0);
    }, (): VarianceLinks__from_checker => {
        return VarianceLinks__from_checker.$zero();
    }, $argument1);
}
