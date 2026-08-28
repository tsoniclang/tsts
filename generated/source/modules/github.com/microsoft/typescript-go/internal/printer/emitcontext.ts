import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { EmitFlags } from "./emitflags.js";
import type { GeneratedIdentifierFlags } from "./generatedidentifierflags.js";
import type { EmitHelper } from "./helpers.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int16, uint32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Block as Block__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlock as IsBlock__from_ast, IsCallExpression as IsCallExpression__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsMemberName as IsMemberName__from_ast, IsNotEmittedStatement as IsNotEmittedStatement__from_ast, IsParseTreeNode as IsParseTreeNode__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, ModifiersBase as ModifiersBase__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsSynthesized$constant as NodeFlagsSynthesized$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedSet as OrderedSet__from_collections, Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { LinkStore as LinkStore__from_core, NewTextRange as NewTextRange__from_core, Stack as Stack__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/state.js";
import { OrderedSet$Add$PointerTo_Named_printer$EmitHelper } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Add.js";
import { OrderedSet$Clear$PointerTo_Named_printer$EmitHelper } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Clear.js";
import { OrderedSet$Values$PointerTo_Named_printer$EmitHelper } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedSet$Values.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { AppendIfUnique$PointerTo_Named_printer$EmitHelper } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/AppendIfUnique.js";
import { Concatenate$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Concatenate.js";
import { Every$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LinkStore$Get.js";
import { Splice$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Splice.js";
import { Stack$Peek$PointerTo_Named_printer$varScope } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Stack$Peek.js";
import { Stack$Pop$PointerTo_Named_printer$varScope } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Stack$Pop.js";
import { Stack$Push$PointerTo_Named_printer$varScope } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Stack$Push.js";
import { findSpanEnd$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/printer/findSpanEnd.js";
import { findSpanEndWithEmitContext$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/printer/findSpanEndWithEmitContext.js";
import { Clone$MapOf_Named_ast$Kind_To_Named_core$TextRange$Named_ast$Kind$Named_core$TextRange } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, Clone$SliceOf_PointerTo_Named_printer$EmitHelper$PointerTo_Named_printer$EmitHelper } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { Collect$PointerTo_Named_printer$EmitHelper } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$EmitContext, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_ast$Kind_To_Named_core$TextRange, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$emitNode, $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$AutoGenerateInfo as GoMap } from "../../../../../../support/maps.js";
import { EFCustomPrologue$constant, EFExternalHelpers$constant, EFHelperName$constant, EFNoComments$constant, EFNoNestedSourceMaps$constant, EFNoSourceMap$constant, EFNone$constant } from "./emitflags.js";
import { NewNodeFactory, NodeFactory } from "./factory.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class EmitContext {
    declare private readonly $goType: void;
    public constructor(public Factory: {
        value: NodeFactory;
    } | undefined, public autoGenerate: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<AutoGenerateInfo> | undefined>, public textSource: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public original: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public emitNodes: LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>, public assignedName: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public classThis: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public varScopeStack: Stack__from_core<{
        value: varScope;
    } | undefined>, public letScopeStack: Stack__from_core<{
        value: varScope;
    } | undefined>, public emitHelpers: OrderedSet__from_collections<{
        value: EmitHelper;
    } | undefined>) {
    }
    static $zero(): EmitContext {
        return new EmitContext(void 0, GoMap.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<emitNode> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$emitNode.nil();
        }), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), Stack__from_core.$zero<{
            value: varScope;
        } | undefined>(), Stack__from_core.$zero<{
            value: varScope;
        } | undefined>(), OrderedSet__from_collections.$zero<{
            value: EmitHelper;
        } | undefined>((): GoMapValue<{
            value: EmitHelper;
        } | undefined, GoEmptyStruct> => {
            return $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void.nil();
        }));
    }
    static $copy($source: EmitContext): EmitContext {
        return new EmitContext($source.Factory, $source.autoGenerate, $source.textSource, $source.original, LinkStore__from_core.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>($source.emitNodes), $source.assignedName, $source.classThis, Stack__from_core.$copy<{
            value: varScope;
        } | undefined>($source.varScopeStack), Stack__from_core.$copy<{
            value: varScope;
        } | undefined>($source.letScopeStack), OrderedSet__from_collections.$copy<{
            value: EmitHelper;
        } | undefined>($source.emitHelpers));
    }
    declare private readonly then?: never;
    static AddEmitFlags(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: EmitFlags): void {
        const __gotots_store_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_store_3 = emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value);
        __gotots_store_3.emitFlags = (__gotots_store_3.emitFlags | flags) >>> 0;
    }
    static AddEmitHelper(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, helper: RuntimeSlice<{
        value: EmitHelper;
    } | undefined>): void {
        const __gotots_store_43 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "emitNodes"), node);
        const __gotots_range_0 = helper;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let h: {
                value: EmitHelper;
            } | undefined = __gotots_range_value_0;
            emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).helpers = AppendIfUnique$PointerTo_Named_printer$EmitHelper(emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).helpers, h);
        }
    }
    static AddInitializationStatement(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_86 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let scope: {
            value: varScope;
        } | undefined = Stack$Peek$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "varScopeStack"));
        if (scope === undefined) {
            const __gotots_argument_62 = new GoInterfaceAdapter("Tried to add an initialization statement without a surrounding variable scope");
            GoPanic.raise(__gotots_argument_62 === undefined ? GoPanicNilValue.create() : __gotots_argument_62);
        }
        EmitContext.AddEmitFlags(c, node, EFCustomPrologue$constant());
        (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationStatements = (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationStatements.append(void 0, [node]);
    }
    static AddLexicalDeclaration(c: {
        value: EmitContext;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_89 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "NodeFactory"), name, void 0, void 0, void 0);
        EmitContext.SetEmitFlags(c, varDecl, EFNoNestedSourceMaps$constant());
        const __gotots_store_90 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let scope: {
            value: varScope;
        } | undefined = Stack$Peek$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "letScopeStack"));
        (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables = (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables.append(void 0, [varDecl]);
    }
    static AddSyntheticLeadingComment(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast, text: gostring, hasTrailingNewLine: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_store_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_0 = emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).leadingComments;
        const __gotots_argument_1 = (void SynthesizedComment.$fromStorage,
            {
                Kind: kind,
                Loc: TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1)),
                HasTrailingNewLine: hasTrailingNewLine,
                Text: text,
                HasLeadingNewLine: false
            });
        const __gotots_slice_build_0 = __gotots_argument_0;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void SynthesizedComment.$storageOf,
                __gotots_argument_1));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<SynthesizedComment$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, SynthesizedComment.$storageOf(SynthesizedComment.$copy(SynthesizedComment.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void SynthesizedComment.$storageOf,
                __gotots_argument_1));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, SynthesizedComment.$storageOf(SynthesizedComment.$zero()));
            }
        }
        emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).leadingComments = __gotots_slice_build_1;
        return node;
    }
    static AddSyntheticTrailingComment(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast, text: gostring, hasTrailingNewLine: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_19 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_store_20 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_6 = emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).trailingComments;
        const __gotots_argument_7 = (void SynthesizedComment.$fromStorage,
            {
                Kind: kind,
                Loc: TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1)),
                HasTrailingNewLine: hasTrailingNewLine,
                Text: text,
                HasLeadingNewLine: false
            });
        const __gotots_slice_build_4 = __gotots_argument_6;
        const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
        let __gotots_slice_build_5 = __gotots_slice_build_4;
        if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
            __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
            __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void SynthesizedComment.$storageOf,
                __gotots_argument_7));
        }
        else {
            __gotots_slice_build_5 = goSliceAllocate<SynthesizedComment$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                __gotots_slice_build_5.set(__gotots_slice_build_7, SynthesizedComment.$storageOf(SynthesizedComment.$copy(SynthesizedComment.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
            }
            __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void SynthesizedComment.$storageOf,
                __gotots_argument_7));
            for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                __gotots_slice_build_5.$initialize(__gotots_slice_build_7, SynthesizedComment.$storageOf(SynthesizedComment.$zero()));
            }
        }
        emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).trailingComments = __gotots_slice_build_5;
        return node;
    }
    static AddVariableDeclaration(c: {
        value: EmitContext;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_63 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "NodeFactory"), name, void 0, void 0, void 0);
        EmitContext.SetEmitFlags(c, varDecl, EFNoNestedSourceMaps$constant());
        const __gotots_store_64 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let scope: {
            value: varScope;
        } | undefined = Stack$Peek$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "varScopeStack"));
        (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables = (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables.append(void 0, [varDecl]);
        if (!(((void environmentFlags,
            (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags.$value & environmentFlagsInParameters$constant().$value) as int)
            ===
                ((void environmentFlags,
                    0) as int))) {
            const __gotots_store_65 = (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_65.flags = new environmentFlags(__gotots_store_65.flags.$value | 2);
        }
    }
    static AssignCommentAndSourceMapRanges(c: {
        value: EmitContext;
    } | undefined, to: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_from: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_10 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "emitNodes"), to);
        let commentRange = EmitContext.CommentRange(c, __go_from);
        let sourceMapRange = EmitContext.SourceMapRange(c, __go_from);
        emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).commentRange = TextRange__from_core.$storageOf(TextRange__from_core.$copy(commentRange));
        emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).sourceMapRange = TextRange__from_core.$storageOf(TextRange__from_core.$copy(sourceMapRange));
        const __gotots_store_11 = emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value);
        __gotots_store_11.flags = (__gotots_store_11.flags | 3) >>> 0;
    }
    static AssignCommentRange(c: {
        value: EmitContext;
    } | undefined, to: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_from: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        EmitContext.SetCommentRange(c, to, EmitContext.CommentRange(c, __go_from));
    }
    static AssignSourceMapRange(c: {
        value: EmitContext;
    } | undefined, to: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_from: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        EmitContext.SetSourceMapRange(c, to, EmitContext.SourceMapRange(c, __go_from));
    }
    static AssignedName(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.assignedName.lookup(node);
    }
    static ClassThis(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.classThis.lookup(node);
    }
    static CommentRange(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
        {
            const __gotots_store_8 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "emitNodes"), node);
            if (!(emitNode__shadow_1 === undefined) && !((emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).flags & hasCommentRange$constant()) >>> 0 === 0)) {
                return TextRange__from_core.$copy(TextRange__from_core.$fromStorage(emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).commentRange));
            }
        }
        return TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
    }
    static EmitFlags(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): EmitFlags {
        {
            const __gotots_store_4 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "emitNodes"), node);
            if (!(emitNode__shadow_1 === undefined)) {
                return emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).emitFlags;
            }
        }
        return EFNone$constant();
    }
    static EndAndMergeVariableEnvironment(c: {
        value: EmitContext;
    } | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_results_8 = EmitContext.$go$private$printer$endAndMergeVariableEnvironment(c, statements);
        let result = __gotots_results_8[0];
        return result;
    }
    static EndAndMergeVariableEnvironmentList(c: {
        value: EmitContext;
    } | undefined, statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        let nodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(statements === undefined)) {
            nodes = NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        }
        {
            const __gotots_results_7 = EmitContext.$go$private$printer$endAndMergeVariableEnvironment(c, nodes);
            let result = __gotots_results_7[0];
            let changed = __gotots_results_7[1];
            if (changed) {
                const __gotots_store_57 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeFactory"), result);
                NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                return list;
            }
        }
        return statements;
    }
    static EndLexicalEnvironment(c: {
        value: EmitContext;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_53 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let scope: {
            value: varScope;
        } | undefined = Stack$Pop$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "letScopeStack"));
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables.length > 0) {
            const __gotots_store_54 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory");
            const __gotots_store_55 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_23 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "NodeFactory"), (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables);
            const __gotots_argument_24 = NodeFlagsLet$constant__from_ast();
            let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_12, __gotots_argument_23, __gotots_argument_24);
            const __gotots_store_56 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "NodeFactory"), void 0, varDeclList);
            EmitContext.SetEmitFlags(c, varStatement, EFCustomPrologue$constant());
            statements = statements.append(void 0, [varStatement]);
        }
        return statements;
    }
    static EndVariableEnvironment(c: {
        value: EmitContext;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_47 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let scope: {
            value: varScope;
        } | undefined = Stack$Pop$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "varScopeStack"));
        let statements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.functions.length > 0) {
            statements = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.functions);
        }
        if ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables.length > 0) {
            const __gotots_store_48 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeFactory");
            const __gotots_store_49 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_21 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory"), (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.variables);
            const __gotots_argument_22 = NodeFlagsNone$constant__from_ast();
            let varDeclList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_11, __gotots_argument_21, __gotots_argument_22);
            const __gotots_store_50 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let varStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory"), void 0, varDeclList);
            EmitContext.SetEmitFlags(c, varStatement, EFCustomPrologue$constant());
            statements = statements.append(void 0, [varStatement]);
        }
        if ((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationStatements.length > 0) {
            statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationStatements, void 0);
        }
        return goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, EmitContext.EndLexicalEnvironment(c), void 0);
    }
    static GetAutoGenerateInfo(c: {
        value: EmitContext;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<AutoGenerateInfo> | undefined {
        if (name === undefined) {
            return void 0;
        }
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.lookup(name);
    }
    static GetEmitHelpers(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<{
        value: EmitHelper;
    } | undefined> {
        const __gotots_store_14 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "emitNodes"), node);
        if (!(emitNode__shadow_1 === undefined)) {
            return emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).helpers;
        }
        return RuntimeSlice.nil<{
            value: EmitHelper;
        } | undefined>();
    }
    static GetExternalHelpersModuleName(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            const __gotots_receiver_0 = c;
            const __gotots_store_5 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let parseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.ParseNode(__gotots_receiver_0, __gotots_argument_2);
            if (!(parseNode === undefined)) {
                {
                    const __gotots_store_6 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "emitNodes"), parseNode);
                    if (!(emitNode__shadow_1 === undefined)) {
                        return emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).externalHelpersModuleName;
                    }
                }
            }
        }
        return void 0;
    }
    static GetNodeForGeneratedName(c: {
        value: EmitContext;
    } | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            let autoGenerate: tsonicTypeScriptRuntime.Location<AutoGenerateInfo> | undefined = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.lookup(name);
            if (!(autoGenerate === undefined) && ((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Flags.IsNode()) {
                return EmitContext.$go$private$printer$getNodeForGeneratedNameWorker(c, ((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Node, ((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Id);
            }
        }
        return name;
    }
    static GetSyntheticLeadingComments(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<SynthesizedComment$Storage> {
        const __gotots_store_21 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "emitNodes"), node)) {
            const __gotots_store_22 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).leadingComments;
        }
        return RuntimeSlice.nil<SynthesizedComment$Storage>();
    }
    static GetSyntheticTrailingComments(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<SynthesizedComment$Storage> {
        const __gotots_store_23 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "emitNodes"), node)) {
            const __gotots_store_24 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).trailingComments;
        }
        return RuntimeSlice.nil<SynthesizedComment$Storage>();
    }
    static GetTypeNode(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        {
            const __gotots_store_7 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "emitNodes"), node);
            if (!(emitNode__shadow_1 === undefined)) {
                return emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).typeNode;
            }
        }
        return void 0;
    }
    static HasAutoGenerateInfo(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!(node === undefined)) {
            const __gotots_results_4 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.lookupOk(node);
            let ok = __gotots_results_4[1];
            return ok;
        }
        return false;
    }
    static HasRecordedExternalHelpers(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        {
            const __gotots_receiver_1 = c;
            const __gotots_store_12 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_3 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let parseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.ParseNode(__gotots_receiver_1, __gotots_argument_3);
            if (!(parseNode === undefined)) {
                const __gotots_store_13 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "emitNodes"), parseNode);
                return !(emitNode__shadow_1 === undefined) && (!(emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).externalHelpersModuleName === undefined) || !((emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).emitFlags & EFExternalHelpers$constant()) >>> 0 === 0));
            }
        }
        return false;
    }
    static IsCallToHelper(c: {
        value: EmitContext;
    } | undefined, firstSegment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, helperName: gostring): bool {
        return IsCallExpression__from_ast(firstSegment) && IsIdentifier__from_ast(Node__from_ast.Expression(firstSegment)) && !(((EmitContext.EmitFlags(c, Node__from_ast.Expression(firstSegment)) & EFHelperName$constant()) >>> 0) === 0) && Node__from_ast.Text(Node__from_ast.Expression(firstSegment)) === helperName;
    }
    static MergeEnvironment(c: {
        value: EmitContext;
    } | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_results_5 = EmitContext.$go$private$printer$mergeEnvironment(c, statements, declarations);
        let result = __gotots_results_5[0];
        return result;
    }
    static MergeEnvironmentList(c: {
        value: EmitContext;
    } | undefined, statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        {
            const __gotots_results_6 = EmitContext.$go$private$printer$mergeEnvironment(c, NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, declarations);
            let result = __gotots_results_6[0];
            let changed = __gotots_results_6[1];
            if (changed) {
                const __gotots_store_51 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NodeFactory"), result);
                NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                return list;
            }
        }
        return statements;
    }
    static MostOriginal(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(node === undefined)) {
            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.Original(c, node);
            for (; !(original === undefined);) {
                node = original;
                original = EmitContext.Original(c, node);
            }
        }
        return node;
    }
    static NewNodeVisitor(c: {
        value: EmitContext;
    } | undefined, visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): {
        value: NodeVisitor__from_ast;
    } | undefined {
        const __gotots_argument_8 = visit;
        const __gotots_store_28 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_9 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "NodeFactory"));
        const __gotots_receiver_2 = c;
        const __gotots_field_0 = ($argument0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            return EmitContext.VisitParameters(__gotots_receiver_2, $argument0, $argument1);
        };
        const __gotots_receiver_3 = c;
        const __gotots_field_1 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return EmitContext.VisitFunctionBody(__gotots_receiver_3, $argument0, $argument1);
        };
        const __gotots_receiver_4 = c;
        const __gotots_field_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return EmitContext.VisitIterationBody(__gotots_receiver_4, $argument0, $argument1);
        };
        const __gotots_receiver_5 = c;
        const __gotots_field_3 = ($argument0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            return EmitContext.VisitVariableEnvironment(__gotots_receiver_5, $argument0, $argument1);
        };
        const __gotots_receiver_6 = c;
        const __gotots_field_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return EmitContext.VisitEmbeddedStatement(__gotots_receiver_6, $argument0, $argument1);
        };
        const __gotots_argument_10 = new NodeVisitorHooks__from_ast(void 0, void 0, void 0, void 0, __gotots_field_4, __gotots_field_2, __gotots_field_0, __gotots_field_1, __gotots_field_3);
        return NewNodeVisitor__from_ast(__gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
    }
    static NewNotEmittedStatement(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_58 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNotEmittedStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory"));
        Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        EmitContext.SetOriginal(c, statement, node);
        EmitContext.AssignCommentRange(c, statement, node);
        return statement;
    }
    static Original(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original.lookup(node);
    }
    static ParseNode(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        node = EmitContext.MostOriginal(c, node);
        if (!(node === undefined) && IsParseTreeNode__from_ast(node)) {
            return node;
        }
        return void 0;
    }
    static ReadEmitHelpers(c: {
        value: EmitContext;
    } | undefined): RuntimeSlice<{
        value: EmitHelper;
    } | undefined> {
        const __gotots_store_41 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_20 = OrderedSet$Values$PointerTo_Named_printer$EmitHelper(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "emitHelpers"));
        let helpers = Collect$PointerTo_Named_printer$EmitHelper(__gotots_argument_20);
        const __gotots_store_42 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        OrderedSet$Clear$PointerTo_Named_printer$EmitHelper(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "emitHelpers"));
        return helpers;
    }
    static RequestEmitHelper(c: {
        value: EmitContext;
    } | undefined, helper: {
        value: EmitHelper;
    } | undefined): void {
        if ((helper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Scoped) {
            const __gotots_argument_61 = new GoInterfaceAdapter("Cannot request a scoped emit helper");
            GoPanic.raise(__gotots_argument_61 === undefined ? GoPanicNilValue.create() : __gotots_argument_61);
        }
        const __gotots_range_3: EmitHelper["Dependencies"] = (helper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dependencies;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let h: {
                value: EmitHelper;
            } | undefined = __gotots_range_value_4;
            EmitContext.RequestEmitHelper(c, h);
        }
        const __gotots_store_85 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        OrderedSet$Add$PointerTo_Named_printer$EmitHelper(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "emitHelpers"), helper);
    }
    static Reset(c: {
        value: EmitContext;
    } | undefined): void {
        void ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new EmitContext((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, GoMap.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<emitNode> | undefined> => {
                return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$emitNode.nil();
            }), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), Stack__from_core.$zero<{
                value: varScope;
            } | undefined>(), Stack__from_core.$zero<{
                value: varScope;
            } | undefined>(), OrderedSet__from_collections.$zero<{
                value: EmitHelper;
            } | undefined>((): GoMapValue<{
                value: EmitHelper;
            } | undefined, GoEmptyStruct> => {
                return $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void.nil();
            })));
    }
    static SetAssignedName(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.assignedName.isNil()) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.assignedName = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.make(0, []);
        }
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.assignedName.store(node, name);
    }
    static SetClassThis(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, classThis: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.classThis.isNil()) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.classThis = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.make(0, []);
        }
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.classThis.store(node, classThis);
    }
    static SetCommentRange(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, loc: TextRange__from_core): void {
        const __gotots_store_26 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "emitNodes"), node);
        emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).commentRange = TextRange__from_core.$storageOf(TextRange__from_core.$copy(loc));
        const __gotots_store_27 = emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value);
        __gotots_store_27.flags = (__gotots_store_27.flags | 1) >>> 0;
    }
    static SetEmitFlags(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: EmitFlags): void {
        const __gotots_store_9 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).emitFlags = flags;
    }
    static SetExternalHelpersModuleName(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_receiver_28 = c;
        const __gotots_store_87 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_63 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let parseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.ParseNode(__gotots_receiver_28, __gotots_argument_63);
        if (parseNode === undefined) {
            const __gotots_argument_64 = new GoInterfaceAdapter("Node must be a parse tree node or have an Original pointer to a parse tree node.");
            GoPanic.raise(__gotots_argument_64 === undefined ? GoPanicNilValue.create() : __gotots_argument_64);
        }
        const __gotots_store_88 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "emitNodes"), parseNode);
        emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).externalHelpersModuleName = name;
    }
    static SetOriginal(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        EmitContext.SetOriginalEx(c, node, original, false);
    }
    static SetOriginalEx(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, allowOverwrite: bool): void {
        if (original === undefined) {
            const __gotots_argument_4 = new GoInterfaceAdapter("Original cannot be nil.");
            GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        }
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original.isNil()) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.make(0, []);
        }
        const __gotots_results_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original.lookupOk(node);
        let existing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (!ok) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original.store(node, original);
            {
                const __gotots_store_16 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "emitNodes"), original);
                if (!(emitNode__shadow_1 === undefined)) {
                    const __gotots_store_17 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    emitNode.$go$private$printer$copyFrom(LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "emitNodes"), node), emitNode__shadow_1);
                }
            }
        }
        else if (!allowOverwrite && !tsonicTypeScriptRuntime.sameLocation(existing, original)) {
            const __gotots_argument_5 = new GoInterfaceAdapter("Original node already set.");
            GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
        }
        else if (allowOverwrite) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original.store(node, original);
        }
    }
    static SetSourceMapRange(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, loc: TextRange__from_core): void {
        const __gotots_store_59 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "emitNodes"), node);
        emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).sourceMapRange = TextRange__from_core.$storageOf(TextRange__from_core.$copy(loc));
        const __gotots_store_60 = emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value);
        __gotots_store_60.flags = (__gotots_store_60.flags | 2) >>> 0;
    }
    static SetSyntheticLeadingComments(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comments: RuntimeSlice<SynthesizedComment$Storage>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_91 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).leadingComments = comments;
        return node;
    }
    static SetSyntheticTrailingComments(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comments: RuntimeSlice<SynthesizedComment$Storage>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_92 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).trailingComments = comments;
        return node;
    }
    static SetTypeNode(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_44 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        emitNode.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_printer$emitNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "emitNodes"), node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).typeNode = typeNode;
    }
    static SourceMapRange(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
        {
            const __gotots_store_18 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "emitNodes"), node);
            if (!(emitNode__shadow_1 === undefined) && !((emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).flags & hasSourceMapRange$constant()) >>> 0 === 0)) {
                return TextRange__from_core.$copy(TextRange__from_core.$fromStorage(emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).sourceMapRange));
            }
        }
        return TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
    }
    static StartLexicalEnvironment(c: {
        value: EmitContext;
    } | undefined): void {
        const __gotots_store_52 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        Stack$Push$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "letScopeStack"), { value: new varScope(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), new environmentFlags(0), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()) });
    }
    static StartVariableEnvironment(c: {
        value: EmitContext;
    } | undefined): void {
        const __gotots_store_45 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        Stack$Push$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "varScopeStack"), { value: new varScope(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), new environmentFlags(0), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()) });
        EmitContext.StartLexicalEnvironment(c);
    }
    static TextSource(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.textSource.lookup(node);
    }
    static TokenSourceMapRange(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast): [
        TextRange__from_core,
        bool
    ] {
        {
            const __gotots_store_25 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let emitNode__shadow_1: tsonicTypeScriptRuntime.Location<emitNode> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "emitNodes"), node);
            if (!(emitNode__shadow_1 === undefined) && !emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).tokenSourceMapRanges.isNil()) {
                {
                    const __gotots_results_1 = emitNode.$storageOf(((emitNode__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).tokenSourceMapRanges.lookupOk(kind);
                    let loc = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (ok) {
                        return [TextRange__from_core.$copy(loc), true];
                    }
                }
            }
        }
        const __gotots_struct_0 = TextRange__from_core.$zero();
        const __gotots_results_2 = __gotots_struct_0;
        const __gotots_results_3 = false;
        return [__gotots_results_2, __gotots_results_3];
    }
    static UnsetOriginal(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.original.delete(node);
    }
    static VisitEmbeddedStatement(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return void 0;
        }
        let embeddedStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEmbeddedStatement(visitor, node);
        if (embeddedStatement === undefined || IsNotEmittedStatement__from_ast(embeddedStatement)) {
            let emptyStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewEmptyStatement((visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory);
            Node__from_ast.$storageOf(((emptyStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            EmitContext.SetOriginal(c, emptyStatement, node);
            EmitContext.AssignCommentRange(c, emptyStatement, node);
            return emptyStatement;
        }
        return embeddedStatement;
    }
    static VisitFunctionBody(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(visitor, node);
        let declarations = EmitContext.EndVariableEnvironment(c);
        if (declarations.length === 0) {
            return updated;
        }
        if (updated === undefined) {
            const __gotots_store_31 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "NodeFactory");
            const __gotots_store_32 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_11 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory"), declarations);
            const __gotots_argument_12 = true;
            return NodeFactory__from_ast.NewBlock(__gotots_receiver_7, __gotots_argument_11, __gotots_argument_12);
        }
        if (!IsBlock__from_ast(updated)) {
            const __gotots_receiver_8 = c;
            const __gotots_store_33 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_0 = NodeFactory__from_ast.NewReturnStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeFactory"), updated);
            const __gotots_argument_13 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
            const __gotots_argument_14 = declarations;
            let statements = EmitContext.MergeEnvironment(__gotots_receiver_8, __gotots_argument_13, __gotots_argument_14);
            const __gotots_store_34 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory");
            const __gotots_store_35 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_15 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NodeFactory"), statements);
            const __gotots_argument_16 = false;
            return NodeFactory__from_ast.NewBlock(__gotots_receiver_9, __gotots_argument_15, __gotots_argument_16);
        }
        const __gotots_store_36 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory"), Node__from_ast.AsBlock(updated), EmitContext.MergeEnvironmentList(c, Node__from_ast.StatementList(updated), declarations), Block__from_ast.$storageOf(((Node__from_ast.AsBlock(updated) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
    }
    static VisitIterationBody(c: {
        value: EmitContext;
    } | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (body === undefined) {
            return void 0;
        }
        EmitContext.StartLexicalEnvironment(c);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.VisitEmbeddedStatement(c, body, visitor);
        if (updated === undefined) {
            const __gotots_argument_17 = new GoInterfaceAdapter("Expected visitor to return a statement.");
            GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
        }
        let statements = EmitContext.EndLexicalEnvironment(c);
        if (statements.length > 0) {
            if (IsBlock__from_ast(updated)) {
                statements = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(statements, Node__from_ast.Statements(updated), void 0);
                const __gotots_store_37 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let statementsList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NodeFactory"), statements);
                NodeList__from_ast.$storageOf(((statementsList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList(updated) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                const __gotots_store_38 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeFactory"), Node__from_ast.AsBlock(updated), statementsList, Block__from_ast.$storageOf(((Node__from_ast.AsBlock(updated) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).MultiLine);
            }
            statements = statements.append(void 0, [updated]);
            const __gotots_store_39 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory");
            const __gotots_store_40 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_18 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeFactory"), statements);
            const __gotots_argument_19 = true;
            return NodeFactory__from_ast.NewBlock(__gotots_receiver_10, __gotots_argument_18, __gotots_argument_19);
        }
        return updated;
    }
    static VisitParameters(c: {
        value: EmitContext;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        EmitContext.StartVariableEnvironment(c);
        const __gotots_store_29 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let scope: {
            value: varScope;
        } | undefined = Stack$Peek$PointerTo_Named_printer$varScope(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "varScopeStack"));
        let oldFlags: varScope["flags"] = (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags;
        const __gotots_store_30 = (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_30.flags = new environmentFlags(__gotots_store_30.flags.$value | 1);
        nodes = NodeVisitor__from_ast.VisitNodes(visitor, nodes);
        if (!(((void environmentFlags,
            (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags.$value & environmentFlagsVariablesHoistedInParameters$constant().$value) as int)
            ===
                ((void environmentFlags,
                    0) as int))) {
            nodes = EmitContext.$go$private$printer$addDefaultValueAssignmentsIfNeeded(c, nodes);
        }
        (scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags = oldFlags;
        return nodes;
    }
    static VisitVariableEnvironment(c: {
        value: EmitContext;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        EmitContext.StartVariableEnvironment(c);
        return EmitContext.EndAndMergeVariableEnvironmentList(c, NodeVisitor__from_ast.VisitNodes(visitor, nodes));
    }
    static $go$private$printer$addDefaultValueAssignmentForBindingPattern(c: {
        value: EmitContext;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let initNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined)) {
            const __gotots_store_66 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "NodeFactory");
            const __gotots_receiver_14: EmitContext["Factory"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
            const __gotots_receiver_13: EmitContext["Factory"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
            const __gotots_store_67 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_26 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_27 = NodeFactory.NewGeneratedNameForNode(__gotots_receiver_13, __gotots_argument_26);
            const __gotots_argument_28 = NodeFactory.NewVoidZeroExpression((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory);
            const __gotots_argument_30 = NodeFactory.NewStrictEqualityExpression(__gotots_receiver_14, __gotots_argument_27, __gotots_argument_28);
            const __gotots_store_68 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_31 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "NodeFactory"), KindQuestionToken$constant__from_ast());
            const __gotots_argument_32 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer;
            const __gotots_store_69 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_33 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory"), KindColonToken$constant__from_ast());
            const __gotots_receiver_15: EmitContext["Factory"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
            const __gotots_store_70 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_29 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_34 = NodeFactory.NewGeneratedNameForNode(__gotots_receiver_15, __gotots_argument_29);
            initNode = NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_16, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34);
        }
        else {
            const __gotots_receiver_17: EmitContext["Factory"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
            const __gotots_store_71 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_35 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            initNode = NodeFactory.NewGeneratedNameForNode(__gotots_receiver_17, __gotots_argument_35);
        }
        const __gotots_receiver_21 = c;
        const __gotots_store_72 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeFactory");
        const __gotots_argument_39 = void 0;
        const __gotots_store_73 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "NodeFactory");
        const __gotots_store_74 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeFactory");
        const __gotots_store_75 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_1 = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "NodeFactory"), ParameterDeclaration__from_ast.Name(parameter), void 0, ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type, initNode);
        const __gotots_argument_36 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
        const __gotots_argument_37 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_18, __gotots_argument_36);
        const __gotots_argument_38 = NodeFlagsNone$constant__from_ast();
        const __gotots_argument_40 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_19, __gotots_argument_37, __gotots_argument_38);
        const __gotots_argument_41 = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_20, __gotots_argument_39, __gotots_argument_40);
        EmitContext.AddInitializationStatement(__gotots_receiver_21, __gotots_argument_41);
        const __gotots_store_76 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "NodeFactory");
        const __gotots_argument_43 = parameter;
        const __gotots_store_77 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
        const __gotots_argument_44 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
        const __gotots_argument_45 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
        const __gotots_receiver_22: EmitContext["Factory"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
        const __gotots_store_78 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_42 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_46 = NodeFactory.NewGeneratedNameForNode(__gotots_receiver_22, __gotots_argument_42);
        const __gotots_argument_47 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken;
        const __gotots_argument_48 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type;
        const __gotots_argument_49 = void 0;
        return NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_23, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49);
    }
    static $go$private$printer$addDefaultValueAssignmentForInitializer(c: {
        value: EmitContext;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        EmitContext.AddEmitFlags(c, initializer, 396);
        let nameClone: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(name, new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory));
        EmitContext.AddEmitFlags(c, nameClone, EFNoSourceMap$constant());
        let initAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory.NewAssignmentExpression((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, nameClone, initializer);
        Node__from_ast.$storageOf(((initAssignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Loc)));
        EmitContext.AddEmitFlags(c, initAssignment, EFNoComments$constant());
        const __gotots_store_79 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "NodeFactory");
        const __gotots_store_80 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "NodeFactory");
        const __gotots_store_81 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_2 = NodeFactory__from_ast.NewExpressionStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory"), initAssignment);
        const __gotots_argument_50 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2]);
        const __gotots_argument_51 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_24, __gotots_argument_50);
        const __gotots_argument_52 = false;
        let initBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock(__gotots_receiver_25, __gotots_argument_51, __gotots_argument_52);
        Node__from_ast.$storageOf(((initBlock ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Loc)));
        EmitContext.AddEmitFlags(c, initBlock, 489);
        const __gotots_receiver_26 = c;
        const __gotots_store_82 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_53 = NodeFactory__from_ast.NewIfStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "NodeFactory"), NodeFactory.NewTypeCheck((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory, Node__from_ast.Clone(name, new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory)), "undefined"), initBlock, void 0);
        EmitContext.AddInitializationStatement(__gotots_receiver_26, __gotots_argument_53);
        const __gotots_store_83 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "NodeFactory");
        const __gotots_argument_54 = parameter;
        const __gotots_store_84 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
        const __gotots_argument_55 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
        const __gotots_argument_56 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
        const __gotots_argument_57 = ParameterDeclaration__from_ast.Name(parameter);
        const __gotots_argument_58 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken;
        const __gotots_argument_59 = ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type;
        const __gotots_argument_60 = void 0;
        return NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_27, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60);
    }
    static $go$private$printer$addDefaultValueAssignmentIfNeeded(c: {
        value: EmitContext;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) {
            const __gotots_store_61 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        else if (IsBindingPattern__from_ast(ParameterDeclaration__from_ast.Name(parameter))) {
            return EmitContext.$go$private$printer$addDefaultValueAssignmentForBindingPattern(c, parameter);
        }
        else if (!(ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined)) {
            return EmitContext.$go$private$printer$addDefaultValueAssignmentForInitializer(c, parameter, ParameterDeclaration__from_ast.Name(parameter), ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
        }
        const __gotots_store_62 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    static $go$private$printer$addDefaultValueAssignmentsIfNeeded(c: {
        value: EmitContext;
    } | undefined, nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (nodeList === undefined) {
            return nodeList;
        }
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let nodes = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        const __gotots_range_1 = nodes;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_1;
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.$go$private$printer$addDefaultValueAssignmentIfNeeded(c, Node__from_ast.AsParameterDeclaration(parameter));
            if (!tsonicTypeScriptRuntime.sameLocation(updated, parameter)) {
                if (result.isNil()) {
                    result = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes);
                }
                result.set(i, updated);
            }
        }
        if (!result.isNil()) {
            const __gotots_store_46 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let res: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory"), result);
            NodeList__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            return res;
        }
        return nodeList;
    }
    static $go$private$printer$endAndMergeVariableEnvironment(c: {
        value: EmitContext;
    } | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        bool
    ] {
        return EmitContext.$go$private$printer$mergeEnvironment(c, statements, EmitContext.EndVariableEnvironment(c));
    }
    static $go$private$printer$getNodeForGeneratedNameWorker(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, autoGenerateId: AutoGenerateId): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext.Original(c, node);
        for (; !(original === undefined);) {
            node = original;
            if (IsMemberName__from_ast(node)) {
                let autoGenerate: tsonicTypeScriptRuntime.Location<AutoGenerateInfo> | undefined = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.lookup(node);
                if (autoGenerate === undefined || ((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Flags.IsNode() && !(((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Id === autoGenerateId)) {
                    break;
                }
                if (((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Flags.IsNode()) {
                    original = ((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value.Node;
                    continue;
                }
            }
            original = EmitContext.Original(c, node);
        }
        return node;
    }
    static $go$private$printer$isCustomPrologue(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return !((EmitContext.EmitFlags(c, node) & EFCustomPrologue$constant()) >>> 0 === 0);
    }
    static $go$private$printer$isHoistedFunction(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return EmitContext.$go$private$printer$isCustomPrologue(c, node) && IsFunctionDeclaration__from_ast(node);
    }
    static $go$private$printer$isHoistedVariableStatement(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return EmitContext.$go$private$printer$isCustomPrologue(c, node) && IsVariableStatement__from_ast(node) && Every$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, isHoistedVariable);
    }
    static $go$private$printer$mergeEnvironment(c: {
        value: EmitContext;
    } | undefined, statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        bool
    ] {
        if (declarations.length === 0) {
            return [statements, false];
        }
        let changed = false;
        let leftStandardPrologueEnd = findSpanEnd$PointerTo_Named_ast$Node(statements, IsPrologueDirective__from_ast, 0);
        let leftHoistedFunctionsEnd = findSpanEndWithEmitContext$PointerTo_Named_ast$Node(c, statements, ($argument0: {
            value: EmitContext;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return EmitContext.$go$private$printer$isHoistedFunction($argument0, $argument1);
        }, leftStandardPrologueEnd);
        let leftHoistedVariablesEnd = findSpanEndWithEmitContext$PointerTo_Named_ast$Node(c, statements, ($argument0: {
            value: EmitContext;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return EmitContext.$go$private$printer$isHoistedVariableStatement($argument0, $argument1);
        }, leftHoistedFunctionsEnd);
        let rightStandardPrologueEnd = findSpanEnd$PointerTo_Named_ast$Node(declarations, IsPrologueDirective__from_ast, 0);
        let rightHoistedFunctionsEnd = findSpanEndWithEmitContext$PointerTo_Named_ast$Node(c, declarations, ($argument0: {
            value: EmitContext;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return EmitContext.$go$private$printer$isHoistedFunction($argument0, $argument1);
        }, rightStandardPrologueEnd);
        let rightHoistedVariablesEnd = findSpanEndWithEmitContext$PointerTo_Named_ast$Node(c, declarations, ($argument0: {
            value: EmitContext;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return EmitContext.$go$private$printer$isHoistedVariableStatement($argument0, $argument1);
        }, rightHoistedFunctionsEnd);
        let rightCustomPrologueEnd = findSpanEndWithEmitContext$PointerTo_Named_ast$Node(c, declarations, ($argument0: {
            value: EmitContext;
        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return EmitContext.$go$private$printer$isCustomPrologue($argument0, $argument1);
        }, rightHoistedVariablesEnd);
        if (rightCustomPrologueEnd !== declarations.length) {
            const __gotots_argument_25 = new GoInterfaceAdapter("Expected declarations to be valid standard or custom prologues");
            GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
        }
        let left = statements;
        if (rightCustomPrologueEnd > rightHoistedVariablesEnd) {
            left = Splice$PointerTo_Named_ast$Node(left, leftHoistedVariablesEnd, 0, declarations.slice(rightHoistedVariablesEnd, rightCustomPrologueEnd, null));
            changed = true;
        }
        if (rightHoistedVariablesEnd > rightHoistedFunctionsEnd) {
            left = Splice$PointerTo_Named_ast$Node(left, leftHoistedFunctionsEnd, 0, declarations.slice(rightHoistedFunctionsEnd, rightHoistedVariablesEnd, null));
            changed = true;
        }
        if (rightHoistedFunctionsEnd > rightStandardPrologueEnd) {
            left = Splice$PointerTo_Named_ast$Node(left, leftStandardPrologueEnd, 0, declarations.slice(rightStandardPrologueEnd, rightHoistedFunctionsEnd, null));
            changed = true;
        }
        if (rightStandardPrologueEnd > 0) {
            if (leftStandardPrologueEnd === 0) {
                left = Splice$PointerTo_Named_ast$Node(left, 0, 0, declarations.slice(0, rightStandardPrologueEnd, null));
                changed = true;
            }
            else {
                let leftPrologues = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
                    return $goMap$MapOf_string_To_Struct_void.nil();
                });
                const leftPrologues$location = tsonicTypeScriptRuntime.boundLocation({}, () => leftPrologues, leftPrologues$next => leftPrologues = leftPrologues$next);
                const __gotots_range_2 = leftStandardPrologueEnd;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2; __gotots_range_index_2++) {
                    const __gotots_range_value_3 = __gotots_range_index_2;
                    let i = __gotots_range_value_3;
                    let leftPrologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = statements.get(i);
                    Set$Add$string(leftPrologues$location, Node__from_ast.Text(Node__from_ast.Expression(leftPrologue)));
                }
                for (let i = rightStandardPrologueEnd - 1; i >= 0; i--) {
                    let rightPrologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = declarations.get(i);
                    if (!Set__from_collections.Has<gostring>(leftPrologues$location, Node__from_ast.Text(Node__from_ast.Expression(rightPrologue)))) {
                        left = Concatenate$PointerTo_Named_ast$Node(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([rightPrologue]), left);
                        changed = true;
                    }
                }
            }
        }
        return [left, changed];
    }
    static $go$private$printer$onClone(c: {
        value: EmitContext;
    } | undefined, updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        EmitContext.SetOriginal(c, updated, original);
        if (IsIdentifier__from_ast(updated) || IsPrivateIdentifier__from_ast(updated)) {
            {
                let autoGenerate: tsonicTypeScriptRuntime.Location<AutoGenerateInfo> | undefined = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.lookup(original);
                if (!(autoGenerate === undefined)) {
                    let autoGenerateCopy = AutoGenerateInfo.$copy(AutoGenerateInfo.$copy(((autoGenerate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<AutoGenerateInfo>).value));
                    const autoGenerateCopy$location = tsonicTypeScriptRuntime.boundLocation({}, () => autoGenerateCopy, autoGenerateCopy$next => autoGenerateCopy = autoGenerateCopy$next);
                    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoGenerate.store(updated, autoGenerateCopy$location);
                }
            }
        }
    }
    static $go$private$printer$onCreate(c: {
        value: EmitContext;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_15 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
        __gotots_store_15.Flags = (__gotots_store_15.Flags | 16) >>> 0;
    }
    static $go$private$printer$onUpdate(c: {
        value: EmitContext;
    } | undefined, updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        EmitContext.SetOriginal(c, updated, original);
    }
}
export class environmentFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function environmentFlagsInParameters$constant(): environmentFlags {
    return new environmentFlags(1);
}
export function environmentFlagsVariablesHoistedInParameters$constant(): environmentFlags {
    return new environmentFlags(2);
}
export class varScope {
    declare private readonly $goType: void;
    public constructor(public variables: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public functions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public flags: environmentFlags, public initializationStatements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    static $copy($source: varScope): varScope {
        return new varScope($source.variables, $source.functions, $source.flags, $source.initializationStatements);
    }
    declare private readonly then?: never;
}
export function NewEmitContext(): {
    value: EmitContext;
} | undefined {
    let c: {
        value: EmitContext;
    } | undefined = { value: new EmitContext(void 0, GoMap.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, emitNode>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<emitNode> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_printer$emitNode.nil();
        }), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Node.nil(), Stack__from_core.$zero<{
            value: varScope;
        } | undefined>(), Stack__from_core.$zero<{
            value: varScope;
        } | undefined>(), OrderedSet__from_collections.$zero<{
            value: EmitHelper;
        } | undefined>((): GoMapValue<{
            value: EmitHelper;
        } | undefined, GoEmptyStruct> => {
            return $goMap$MapOf_PointerTo_Named_printer$EmitHelper_To_Struct_void.nil();
        })) };
    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory = NewNodeFactory(c);
    return c;
}
export function GetEmitContext(): [
    {
        value: EmitContext;
    } | undefined,
    (() => void) | undefined
] {
    let c: {
        value: EmitContext;
    } | undefined = (($value: GoInterface | undefined): {
        value: EmitContext;
    } | undefined => {
        if (!$goInterfaceAdapter$PointerTo_Named_printer$EmitContext.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get($state.emitContextPool));
    return [c, (): void => {
            EmitContext.Reset(c);
            sync__from_gostdlib.Pool.Put($state.emitContextPool, new $goInterfaceAdapter$PointerTo_Named_printer$EmitContext(c));
        }];
}
export function isHoistedVariable(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsIdentifier__from_ast(Node__from_ast.Name(node)) && Node__from_ast.Initializer(node) === undefined;
}
export class AutoGenerateOptions {
    declare private readonly $goType: void;
    public constructor(public Flags: GeneratedIdentifierFlags, public Prefix: gostring, public Suffix: gostring) {
    }
    static $copy($source: AutoGenerateOptions): AutoGenerateOptions {
        return new AutoGenerateOptions($source.Flags, $source.Prefix, $source.Suffix);
    }
    declare private readonly then?: never;
}
export type AutoGenerateId = uint32;
export class AutoGenerateInfo {
    declare private readonly $goType: void;
    public constructor(public Flags: GeneratedIdentifierFlags, public Id: AutoGenerateId, public Prefix: gostring, public Suffix: gostring, public Node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: AutoGenerateInfo): AutoGenerateInfo {
        return new AutoGenerateInfo($source.Flags, $source.Id, $source.Prefix, $source.Suffix, $source.Node);
    }
    declare private readonly then?: never;
}
export type emitNodeFlags = uint32;
export function hasCommentRange$constant(): emitNodeFlags {
    return 1;
}
export function hasSourceMapRange$constant(): emitNodeFlags {
    return 2;
}
export type SynthesizedComment$Storage = {
    Kind: int16;
    Loc: TextRange__from_core$Storage;
    HasLeadingNewLine: bool;
    HasTrailingNewLine: bool;
    Text: gostring;
};
export class SynthesizedComment implements GoContainerStoredValue<SynthesizedComment$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SynthesizedComment$Storage) {
    }
    public static $storageOf($source: SynthesizedComment): SynthesizedComment$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SynthesizedComment$Storage): SynthesizedComment {
        return new SynthesizedComment($source);
    }
    public get Kind(): Kind__from_ast {
        return this.$storage.Kind;
    }
    public set Kind($value: Kind__from_ast) {
        this.$storage.Kind = $value;
    }
    public get Loc(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.Loc);
    }
    public set Loc($value: TextRange__from_core) {
        this.$storage.Loc = TextRange__from_core.$storageOf($value);
    }
    public get HasLeadingNewLine(): bool {
        return this.$storage.HasLeadingNewLine;
    }
    public set HasLeadingNewLine($value: bool) {
        this.$storage.HasLeadingNewLine = $value;
    }
    public get HasTrailingNewLine(): bool {
        return this.$storage.HasTrailingNewLine;
    }
    public set HasTrailingNewLine($value: bool) {
        this.$storage.HasTrailingNewLine = $value;
    }
    public get Text(): gostring {
        return this.$storage.Text;
    }
    public set Text($value: gostring) {
        this.$storage.Text = $value;
    }
    declare readonly [$goContainerStorageType]: SynthesizedComment$Storage;
    static $zero(): SynthesizedComment {
        return new SynthesizedComment({
            Kind: 0,
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            HasLeadingNewLine: false,
            HasTrailingNewLine: false,
            Text: ""
        });
    }
    static $copy($source: SynthesizedComment): SynthesizedComment {
        return new SynthesizedComment({
            Kind: $source.$storage.Kind,
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.Loc))),
            HasLeadingNewLine: $source.$storage.HasLeadingNewLine,
            HasTrailingNewLine: $source.$storage.HasTrailingNewLine,
            Text: $source.$storage.Text
        });
    }
    static $equal($left: SynthesizedComment, $right: SynthesizedComment): bool {
        return $left.$storage.Kind === $right.$storage.Kind && TextRange__from_core.$equal(TextRange__from_core.$fromStorage($left.$storage.Loc), TextRange__from_core.$fromStorage($right.$storage.Loc)) && $left.$storage.HasLeadingNewLine === $right.$storage.HasLeadingNewLine && $left.$storage.HasTrailingNewLine === $right.$storage.HasTrailingNewLine && $left.$storage.Text === $right.$storage.Text;
    }
    static $hash($source: SynthesizedComment): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Kind));
        $hash = GoMapHash.mix($hash, TextRange__from_core.$hash(TextRange__from_core.$fromStorage($source.$storage.Loc)));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.HasLeadingNewLine));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.HasTrailingNewLine));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Text));
        return $hash;
    }
    declare private readonly then?: never;
}
export type emitNode$Storage = {
    flags: uint32;
    emitFlags: uint32;
    commentRange: TextRange__from_core$Storage;
    sourceMapRange: TextRange__from_core$Storage;
    tokenSourceMapRanges: GoMapValue<Kind__from_ast, TextRange__from_core>;
    helpers: RuntimeSlice<{
        value: EmitHelper;
    } | undefined>;
    externalHelpersModuleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    leadingComments: RuntimeSlice<SynthesizedComment$Storage>;
    trailingComments: RuntimeSlice<SynthesizedComment$Storage>;
    typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class emitNode implements GoContainerStoredValue<emitNode$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: emitNode$Storage) {
    }
    public static $storageOf($source: emitNode): emitNode$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: emitNode$Storage): emitNode {
        return new emitNode($source);
    }
    public get flags(): emitNodeFlags {
        return this.$storage.flags;
    }
    public set flags($value: emitNodeFlags) {
        this.$storage.flags = $value;
    }
    public get emitFlags(): EmitFlags {
        return this.$storage.emitFlags;
    }
    public set emitFlags($value: EmitFlags) {
        this.$storage.emitFlags = $value;
    }
    public get commentRange(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.commentRange);
    }
    public set commentRange($value: TextRange__from_core) {
        this.$storage.commentRange = TextRange__from_core.$storageOf($value);
    }
    public get sourceMapRange(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.sourceMapRange);
    }
    public set sourceMapRange($value: TextRange__from_core) {
        this.$storage.sourceMapRange = TextRange__from_core.$storageOf($value);
    }
    public get tokenSourceMapRanges(): GoMapValue<Kind__from_ast, TextRange__from_core> {
        return this.$storage.tokenSourceMapRanges;
    }
    public set tokenSourceMapRanges($value: GoMapValue<Kind__from_ast, TextRange__from_core>) {
        this.$storage.tokenSourceMapRanges = $value;
    }
    public get helpers(): RuntimeSlice<{
        value: EmitHelper;
    } | undefined> {
        return this.$storage.helpers;
    }
    public set helpers($value: RuntimeSlice<{
        value: EmitHelper;
    } | undefined>) {
        this.$storage.helpers = $value;
    }
    public get externalHelpersModuleName(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.externalHelpersModuleName;
    }
    public set externalHelpersModuleName($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.externalHelpersModuleName = $value;
    }
    public get leadingComments(): RuntimeSlice<SynthesizedComment$Storage> {
        return this.$storage.leadingComments;
    }
    public set leadingComments($value: RuntimeSlice<SynthesizedComment$Storage>) {
        this.$storage.leadingComments = $value;
    }
    public get trailingComments(): RuntimeSlice<SynthesizedComment$Storage> {
        return this.$storage.trailingComments;
    }
    public set trailingComments($value: RuntimeSlice<SynthesizedComment$Storage>) {
        this.$storage.trailingComments = $value;
    }
    public get typeNode(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.typeNode;
    }
    public set typeNode($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.typeNode = $value;
    }
    declare readonly [$goContainerStorageType]: emitNode$Storage;
    static $zero(): emitNode {
        return new emitNode({
            flags: 0,
            emitFlags: 0,
            commentRange: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            sourceMapRange: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            tokenSourceMapRanges: $goMap$MapOf_Named_ast$Kind_To_Named_core$TextRange.nil(),
            helpers: RuntimeSlice.nil<{
                value: EmitHelper;
            } | undefined>(),
            externalHelpersModuleName: void 0,
            leadingComments: RuntimeSlice.nil<SynthesizedComment$Storage>(),
            trailingComments: RuntimeSlice.nil<SynthesizedComment$Storage>(),
            typeNode: void 0
        });
    }
    static $copy($source: emitNode): emitNode {
        return new emitNode({
            flags: $source.$storage.flags,
            emitFlags: $source.$storage.emitFlags,
            commentRange: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.commentRange))),
            sourceMapRange: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.sourceMapRange))),
            tokenSourceMapRanges: $source.$storage.tokenSourceMapRanges,
            helpers: $source.$storage.helpers,
            externalHelpersModuleName: $source.$storage.externalHelpersModuleName,
            leadingComments: $source.$storage.leadingComments,
            trailingComments: $source.$storage.trailingComments,
            typeNode: $source.$storage.typeNode
        });
    }
    declare private readonly then?: never;
    static $go$private$printer$copyFrom(e: tsonicTypeScriptRuntime.Location<emitNode> | undefined, source: tsonicTypeScriptRuntime.Location<emitNode> | undefined): void {
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).flags = emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).flags;
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).emitFlags = emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).emitFlags;
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).commentRange = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).commentRange)));
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).sourceMapRange = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).sourceMapRange)));
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).tokenSourceMapRanges = Clone$MapOf_Named_ast$Kind_To_Named_core$TextRange$Named_ast$Kind$Named_core$TextRange(emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).tokenSourceMapRanges);
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).helpers = Clone$SliceOf_PointerTo_Named_printer$EmitHelper$PointerTo_Named_printer$EmitHelper(emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).helpers);
        emitNode.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).externalHelpersModuleName = emitNode.$storageOf(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<emitNode>).value).externalHelpersModuleName;
    }
}
