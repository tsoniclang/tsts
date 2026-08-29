import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { JsxElement as JsxElement__from_ast, JsxExpression as JsxExpression__from_ast, JsxFragment as JsxFragment__from_ast, JsxOpeningFragment as JsxOpeningFragment__from_ast, JsxSelfClosingElement as JsxSelfClosingElement__from_ast, JsxSpreadAttribute as JsxSpreadAttribute__from_ast, JsxText as JsxText__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, QualifiedName as QualifiedName__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, int64 } from "@gotots/runtime/scalars.js";
import { ExpressionBase as ExpressionBase__from_ast, GetJSXImplicitImportBase as GetJSXImplicitImportBase__from_ast, GetJSXRuntimeImport as GetJSXRuntimeImport__from_ast, GetSemanticJsxChildren as GetSemanticJsxChildren__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IsExternalModule as IsExternalModule__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsIdentifier as IsIdentifier__from_ast, IsJsxAttribute as IsJsxAttribute__from_ast, IsJsxElement as IsJsxElement__from_ast, IsJsxExpression as IsJsxExpression__from_ast, IsJsxFragment as IsJsxFragment__from_ast, IsJsxNamespacedName as IsJsxNamespacedName__from_ast, IsJsxOpeningLikeElement as IsJsxOpeningLikeElement__from_ast, IsJsxSelfClosingElement as IsJsxSelfClosingElement__from_ast, IsJsxSpreadAttribute as IsJsxSpreadAttribute__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsSourceFile as IsSourceFile__from_ast, IsSpreadAssignment as IsSpreadAssignment__from_ast, IsStringLiteral as IsStringLiteral__from_ast, JsxAttribute as JsxAttribute__from_ast, JsxNamespacedName as JsxNamespacedName__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxOpeningFragment$constant as KindJsxOpeningFragment$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxSpreadAttribute$constant as KindJsxSpreadAttribute$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, Kind_String as Kind_String__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsSynthesized$constant as NodeFlagsSynthesized$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SetParentInChildren as SetParentInChildren__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, SubtreeContainsJsx$constant as SubtreeContainsJsx$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclaration as VariableDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitReactJSXDev$constant as JsxEmitReactJSXDev$constant__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, NewTextRange as NewTextRange__from_core, ScriptTargetES2018$constant as ScriptTargetES2018$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EFCustomPrologue$constant as EFCustomPrologue$constant__from_printer, EFStartOnNewLine$constant as EFStartOnNewLine$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetECMALineAndUTF16CharacterOfPosition as GetECMALineAndUTF16CharacterOfPosition__from_scanner, IsIdentifierText as IsIdentifierText__from_scanner, IsIntrinsicJsxName as IsIntrinsicJsxName__from_scanner, SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CompareStringsCaseSensitive as CompareStringsCaseSensitive__from_stringutil, EncodeJSStringRune as EncodeJSStringRune__from_stringutil, IsDigit as IsDigit__from_stringutil, IsHexDigit as IsHexDigit__from_stringutil, IsLineBreak as IsLineBreak__from_stringutil, IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/jsxtransforms/state.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { OrderedMap$Clear$string$MapOf_string_To_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Clear.js";
import { OrderedMap$Entries$string$MapOf_string_To_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$string$MapOf_string_To_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$Set$string$MapOf_string_To_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$MapOf_string_To_PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { insertStatementAfterPrologue$PointerTo_Named_jsxtransforms$JSXTransformer } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/transformers/jsxtransforms/insertStatementAfterPrologue.js";
import { Values$MapOf_string_To_PointerTo_Named_ast$Node$string$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/maps/Values.js";
import { Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { Collect$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Collect.js";
import { Delete$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Delete.js";
import { Insert$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Insert.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_Named_ast$Node, $goMap$MapOf_string_To_MapOf_string_To_PointerTo_Named_ast$Node as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class JSXTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public emitResolver: EmitResolver__from_printer | undefined, public importSpecifier: gostring, public filenameDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public utilizedImplicitRuntimeImports: OrderedMap__from_collections<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, public inJsxChild: bool, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$jsxtransforms$combinePropertiesIntoNewExpression(tx: JSXTransformer | undefined, expressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, props: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>
    ] {
        if (props.length === 0) {
            return [expressions, props];
        }
        const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_195 = (Transformer__from_transformers.Factory(__gotots_store_194.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_50 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "NodeFactory");
        const __gotots_store_196 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_197 = (Transformer__from_transformers.Factory(__gotots_store_196.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_183 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "NodeFactory"), props);
        const __gotots_argument_184 = false;
        let newObj: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_50, __gotots_argument_183, __gotots_argument_184);
        expressions = expressions.append(void 0, [newObj]);
        return [expressions, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()];
    }
    static $go$private$jsxtransforms$convertJsxChildrenToChildrenPropAssignment(tx: JSXTransformer | undefined, children: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let nonWhitespceChildren = GetSemanticJsxChildren__from_ast(children);
        if (nonWhitespceChildren.length === 1 && (!(Node__from_ast.$storageOf(((nonWhitespceChildren.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxExpression$constant__from_ast()) || (Node__from_ast.AsJsxExpression(nonWhitespceChildren.get(0)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) {
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$transformJsxChildToExpression(tx, nonWhitespceChildren.get(0));
            if (result === undefined) {
                return void 0;
            }
            const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_103 = (Transformer__from_transformers.Factory(__gotots_store_102.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory");
            const __gotots_argument_97 = void 0;
            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_98 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory"), "children");
            const __gotots_argument_99 = void 0;
            const __gotots_argument_100 = void 0;
            const __gotots_argument_101 = result;
            return NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_27, __gotots_argument_97, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101);
        }
        let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, nonWhitespceChildren.length, void 0);
        const __gotots_range_10 = nonWhitespceChildren;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10.length; __gotots_range_index_8++) {
            const __gotots_range_value_13 = __gotots_range_10.get(__gotots_range_index_8);
            let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$transformJsxChildToExpression(tx, child);
            if (res === undefined) {
                continue;
            }
            const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_28 = Transformer__from_transformers.EmitContext(__gotots_store_106.Transformer);
            const __gotots_argument_102 = res;
            const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_binary_operand_4 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_107.Transformer), res);
            const __gotots_binary_operand_5 = 4294443007;
            const __gotots_argument_103 = (__gotots_binary_operand_4 & __gotots_binary_operand_5) >>> 0;
            EmitContext__from_printer.SetEmitFlags(__gotots_receiver_28, __gotots_argument_102, __gotots_argument_103);
            results = results.append(void 0, [res]);
        }
        if (results.length === 0) {
            return void 0;
        }
        const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_109 = (Transformer__from_transformers.Factory(__gotots_store_108.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory");
        const __gotots_argument_106 = void 0;
        const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_111 = (Transformer__from_transformers.Factory(__gotots_store_110.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_107 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "NodeFactory"), "children");
        const __gotots_argument_108 = void 0;
        const __gotots_argument_109 = void 0;
        const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_113 = (Transformer__from_transformers.Factory(__gotots_store_112.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory");
        const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_115 = (Transformer__from_transformers.Factory(__gotots_store_114.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_104 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory"), results);
        const __gotots_argument_105 = false;
        const __gotots_argument_110 = NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_29, __gotots_argument_104, __gotots_argument_105);
        return NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_30, __gotots_argument_106, __gotots_argument_107, __gotots_argument_108, __gotots_argument_109, __gotots_argument_110);
    }
    static $go$private$jsxtransforms$convertJsxChildrenToChildrenPropObject(tx: JSXTransformer | undefined, children: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$convertJsxChildrenToChildrenPropAssignment(tx, children);
        if (prop === undefined) {
            return void 0;
        }
        const __gotots_store_160 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_161 = (Transformer__from_transformers.Factory(__gotots_store_160.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_42 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_161, "NodeFactory");
        const __gotots_store_162 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_163 = (Transformer__from_transformers.Factory(__gotots_store_162.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_154 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_163, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([prop]));
        const __gotots_argument_155 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_42, __gotots_argument_154, __gotots_argument_155);
    }
    static $go$private$jsxtransforms$createJsxFactoryExpression(tx: JSXTransformer | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
        const __gotots_store_151 = NodeBase__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_147 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_151, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_39).GetJsxFactoryEntity(__gotots_argument_147);
        return JSXTransformer.$go$private$jsxtransforms$createJsxPseudoFactoryExpression(tx, parent, e, "createElement");
    }
    static $go$private$jsxtransforms$createJsxFactoryExpressionFromEntityName(tx: JSXTransformer | undefined, e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsQualifiedName__from_ast(e)) {
            let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$createJsxFactoryExpressionFromEntityName(tx, (Node__from_ast.AsQualifiedName(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left, parent);
            const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_199 = (Transformer__from_transformers.Factory(__gotots_store_198.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "NodeFactory"), Node__from_ast.Text((Node__from_ast.AsQualifiedName(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right));
            const __gotots_store_200 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_201 = (Transformer__from_transformers.Factory(__gotots_store_200.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_201, "NodeFactory"), left, void 0, right, NodeFlagsNone$constant__from_ast());
        }
        return JSXTransformer.$go$private$jsxtransforms$createReactNamespace(tx, Node__from_ast.Text(e), parent);
    }
    static $go$private$jsxtransforms$createJsxFragmentFactoryExpression(tx: JSXTransformer | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
        const __gotots_store_164 = NodeBase__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_156 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_43).GetJsxFragmentFactoryEntity(__gotots_argument_156);
        return JSXTransformer.$go$private$jsxtransforms$createJsxPseudoFactoryExpression(tx, parent, e, "Fragment");
    }
    static $go$private$jsxtransforms$createJsxPseudoFactoryExpression(tx: JSXTransformer | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, target: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(e === undefined)) {
            return JSXTransformer.$go$private$jsxtransforms$createJsxFactoryExpressionFromEntityName(tx, e, parent);
        }
        const __gotots_store_184 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_185 = (Transformer__from_transformers.Factory(__gotots_store_184.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeFactory");
        const __gotots_argument_177 = JSXTransformer.$go$private$jsxtransforms$createReactNamespace(tx, ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace, parent);
        const __gotots_argument_178 = void 0;
        const __gotots_store_186 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_187 = (Transformer__from_transformers.Factory(__gotots_store_186.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_179 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "NodeFactory"), target);
        const __gotots_argument_180 = NodeFlagsNone$constant__from_ast();
        return NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_48, __gotots_argument_177, __gotots_argument_178, __gotots_argument_179, __gotots_argument_180);
    }
    static $go$private$jsxtransforms$createReactNamespace(tx: JSXTransformer | undefined, reactNamespace: gostring, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (reactNamespace.length === 0) {
            reactNamespace = "React";
        }
        const __gotots_store_202 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_203 = (Transformer__from_transformers.Factory(__gotots_store_202.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let react: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_203, "NodeFactory"), reactNamespace);
        const __gotots_store_204 = Node__from_ast.$storageOf(((react ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
        __gotots_store_204.Flags = (__gotots_store_204.Flags & ~16) >>> 0;
        const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Node__from_ast.$storageOf(((react ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_205.Transformer), parent);
        {
            const __gotots_receiver_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
            const __gotots_argument_185 = react;
            const __gotots_argument_186 = false;
            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_51).GetReferencedExportContainer(__gotots_argument_185, __gotots_argument_186);
            if (!(container === undefined) && IsModuleDeclaration__from_ast(container)) {
                const __gotots_store_206 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let containerName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_206.Transformer), container);
                const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_208 = (Transformer__from_transformers.Factory(__gotots_store_207.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory"), containerName, void 0, react, NodeFlagsNone$constant__from_ast());
            }
        }
        return react;
    }
    static $go$private$jsxtransforms$getAttributeName(tx: JSXTransformer | undefined, node: {
        value: JsxAttribute__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JsxAttribute__from_ast.Name(node);
        if (IsIdentifier__from_ast(name)) {
            let text = Node__from_ast.Text(name);
            if (IsIdentifierText__from_scanner(text, LanguageVariantStandard$constant__from_core())) {
                return name;
            }
            const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_210 = (Transformer__from_transformers.Factory(__gotots_store_209.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_210, "NodeFactory"), text, TokenFlagsNone$constant__from_ast());
        }
        const __gotots_store_211 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_212 = (Transformer__from_transformers.Factory(__gotots_store_211.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_212, "NodeFactory"), Node__from_ast.Text((Node__from_ast.AsJsxNamespacedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace) + ":" + Node__from_ast.Text(JsxNamespacedName__from_ast.Name(Node__from_ast.AsJsxNamespacedName(name))), TokenFlagsNone$constant__from_ast());
    }
    static $go$private$jsxtransforms$getCurrentFileNameExpression(tx: JSXTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration === undefined)) {
            return VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration));
        }
        const __gotots_store_179 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_180 = (Transformer__from_transformers.Factory(__gotots_store_179.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_180, "NodeFactory");
        const __gotots_store_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_173 = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_181.Transformer), "_jsxFileName", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(48), "", ""));
        const __gotots_argument_174 = void 0;
        const __gotots_argument_175 = void 0;
        const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_183 = (Transformer__from_transformers.Factory(__gotots_store_182.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_176 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "NodeFactory"), SourceFile__from_ast.FileName((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile), TokenFlagsNone$constant__from_ast());
        let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_47, __gotots_argument_173, __gotots_argument_174, __gotots_argument_175, __gotots_argument_176);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration = d;
        return VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration(d));
    }
    static $go$private$jsxtransforms$getImplicitImportForName(tx: JSXTransformer | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let importSource = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSpecifier;
        if (name !== "createElement") {
            importSource = GetJSXRuntimeImport__from_ast(importSource, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
        }
        const __gotots_store_152 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_3 = OrderedMap$Get$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "utilizedImplicitRuntimeImports"), importSource);
        let existing: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (ok) {
            const __gotots_results_4 = existing.lookupOk(name);
            let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_4[0];
            let ok__shadow_1 = __gotots_results_4[1];
            if (ok__shadow_1) {
                return ImportSpecifier__from_ast.Name(Node__from_ast.AsImportSpecifier(elem));
            }
        }
        else {
            existing = $goMap$MapOf_string_To_PointerTo_Named_ast$Node.make(0, []);
            const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            OrderedMap$Set$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_153, "utilizedImplicitRuntimeImports"), importSource, existing);
        }
        const __gotots_store_154 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let generatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_154.Transformer), "_" + name, new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(112), "", ""));
        const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_156 = (Transformer__from_transformers.Factory(__gotots_store_155.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_40 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory");
        const __gotots_argument_148 = false;
        const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_158 = (Transformer__from_transformers.Factory(__gotots_store_157.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_149 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory"), name);
        const __gotots_argument_150 = generatedName;
        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportSpecifier(__gotots_receiver_40, __gotots_argument_148, __gotots_argument_149, __gotots_argument_150);
        const __gotots_receiver_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
        const __gotots_argument_151 = generatedName;
        const __gotots_argument_152 = specifier;
        goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_41).SetReferencedImportDeclaration(__gotots_argument_151, __gotots_argument_152);
        existing.store(name, specifier);
        return Node__from_ast.Name(specifier);
    }
    static $go$private$jsxtransforms$getImplicitJsxFragmentReference(tx: JSXTransformer | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return JSXTransformer.$go$private$jsxtransforms$getImplicitImportForName(tx, "Fragment");
    }
    static $go$private$jsxtransforms$getJsxFactoryCallee(tx: JSXTransformer | undefined, isStaticChildren: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let t = JSXTransformer.$go$private$jsxtransforms$getJsxFactoryCalleePrimitive(tx, isStaticChildren);
        return JSXTransformer.$go$private$jsxtransforms$getImplicitImportForName(tx, t);
    }
    static $go$private$jsxtransforms$getJsxFactoryCalleePrimitive(tx: JSXTransformer | undefined, isStaticChildren: bool): gostring {
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core()) {
            return "jsxDEV";
        }
        if (isStaticChildren) {
            return "jsxs";
        }
        return "jsx";
    }
    static $go$private$jsxtransforms$getTagName(tx: JSXTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxElement$constant__from_ast()) {
            return JSXTransformer.$go$private$jsxtransforms$getTagName(tx, (Node__from_ast.AsJsxElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement);
        }
        else if (IsJsxOpeningLikeElement__from_ast(node)) {
            let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.TagName(node);
            if (IsIdentifier__from_ast(tagName) && IsIntrinsicJsxName__from_scanner(Node__from_ast.Text(tagName))) {
                const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_98 = (Transformer__from_transformers.Factory(__gotots_store_97.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_98, "NodeFactory"), Node__from_ast.Text(tagName), TokenFlagsNone$constant__from_ast());
            }
            else if (IsJsxNamespacedName__from_ast(tagName)) {
                const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_100 = (Transformer__from_transformers.Factory(__gotots_store_99.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "NodeFactory"), Node__from_ast.Text((Node__from_ast.AsJsxNamespacedName(tagName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Namespace) + ":" + Node__from_ast.Text(JsxNamespacedName__from_ast.Name(Node__from_ast.AsJsxNamespacedName(tagName))), TokenFlagsNone$constant__from_ast());
            }
            else {
                const __gotots_store_101 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.CreateExpressionFromEntityName(Transformer__from_transformers.Factory(__gotots_store_101.Transformer), tagName);
            }
        }
        else {
            const __gotots_argument_96 = new GoInterfaceAdapter("unhandled node kind passed to getTagName: " + Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
            GoPanic.raise(__gotots_argument_96 === undefined ? GoPanicNilValue.create() : __gotots_argument_96);
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$jsxtransforms$insertStatementAfterCustomPrologue(tx: JSXTransformer | undefined, to: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return insertStatementAfterPrologue$PointerTo_Named_jsxtransforms$JSXTransformer(to, statement, ($argument0: JSXTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return JSXTransformer.$go$private$jsxtransforms$isAnyPrologueDirective($argument0, $argument1);
        }, tx);
    }
    static $go$private$jsxtransforms$isAnyPrologueDirective(tx: JSXTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_logical_result_0 = IsPrologueDirective__from_ast(node);
        if (!__gotots_logical_result_0) {
            const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_binary_operand_2 = EmitContext__from_printer.EmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_96.Transformer), node);
            const __gotots_binary_operand_3 = EFCustomPrologue$constant__from_printer();
            __gotots_logical_result_0 = (!((__gotots_binary_operand_2 & __gotots_binary_operand_3) >>> 0 === 0));
        }
        return __gotots_logical_result_0;
    }
    static $go$private$jsxtransforms$setInChild(tx: JSXTransformer | undefined, v: bool): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inJsxChild = v;
    }
    static $go$private$jsxtransforms$shouldUseCreateElement(tx: JSXTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSpecifier.length === 0 || hasKeyAfterPropsSpread(node);
    }
    static $go$private$jsxtransforms$transformJsxAttributeInitializer(tx: JSXTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            return NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_173.Transformer));
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast()) {
            const __gotots_store_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_175 = (Transformer__from_transformers.Factory(__gotots_store_174.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "NodeFactory"), decodeEntities(Node__from_ast.Text(node)), (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                    StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags);
            Node__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                    StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(res) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags = (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                    StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags;
            return res;
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxExpression$constant__from_ast()) {
            if (Node__from_ast.Expression(node) === undefined) {
                const __gotots_store_176 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_176.Transformer));
            }
            const __gotots_store_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_callee_9: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_177.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_170 = Node__from_ast.Expression(node);
            return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_170);
        }
        if (IsJsxElement__from_ast(node) || IsJsxSelfClosingElement__from_ast(node) || IsJsxFragment__from_ast(node)) {
            JSXTransformer.$go$private$jsxtransforms$setInChild(tx, false);
            const __gotots_store_178 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_callee_10: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_178.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_171 = node;
            return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_171);
        }
        const __gotots_argument_172 = new GoInterfaceAdapter("Unhandled node kind found in jsx initializer: " + Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
        GoPanic.raise(__gotots_argument_172 === undefined ? GoPanicNilValue.create() : __gotots_argument_172);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$jsxtransforms$transformJsxAttributeToObjectLiteralElement(tx: JSXTransformer | undefined, node: {
        value: JsxAttribute__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$getAttributeName(tx, node);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$transformJsxAttributeInitializer(tx, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        const __gotots_store_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_193 = (Transformer__from_transformers.Factory(__gotots_store_192.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewPropertyAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeFactory"), void 0, name, void 0, void 0, expression);
    }
    static $go$private$jsxtransforms$transformJsxAttributesToExpression(tx: JSXTransformer | undefined, attrs: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, childrenProp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expressions = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 2, void 0);
        let properties = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, attrs.length, void 0);
        const __gotots_range_13 = attrs;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_13.length; __gotots_range_index_11++) {
            const __gotots_range_value_16 = __gotots_range_13.get(__gotots_range_index_11);
            let attr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
            if (IsJsxSpreadAttribute__from_ast(attr)) {
                if (IsObjectLiteralExpression__from_ast(Node__from_ast.Expression(attr)) && !hasProto(Node__from_ast.AsObjectLiteralExpression(Node__from_ast.Expression(attr)))) {
                    const __gotots_range_14 = Node__from_ast.Properties(Node__from_ast.Expression(attr));
                    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_14.length; __gotots_range_index_12++) {
                        const __gotots_range_value_17 = __gotots_range_14.get(__gotots_range_index_12);
                        let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_17;
                        if (IsSpreadAssignment__from_ast(prop)) {
                            const __gotots_results_5 = JSXTransformer.$go$private$jsxtransforms$combinePropertiesIntoNewExpression(tx, expressions, properties);
                            expressions = __gotots_results_5[0];
                            properties = __gotots_results_5[1];
                            const __gotots_argument_158 = expressions;
                            const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_callee_6: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_165.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                            const __gotots_argument_157 = Node__from_ast.Expression(prop);
                            const __gotots_argument_159 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_157);
                            expressions = __gotots_argument_158.append(void 0, [__gotots_argument_159]);
                            continue;
                        }
                        const __gotots_argument_161 = properties;
                        const __gotots_store_166 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_callee_7: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_166.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                        const __gotots_argument_160 = prop;
                        const __gotots_argument_162 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_160);
                        properties = __gotots_argument_161.append(void 0, [__gotots_argument_162]);
                    }
                    continue;
                }
                const __gotots_results_6 = JSXTransformer.$go$private$jsxtransforms$combinePropertiesIntoNewExpression(tx, expressions, properties);
                expressions = __gotots_results_6[0];
                properties = __gotots_results_6[1];
                const __gotots_argument_164 = expressions;
                const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_callee_8: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_167.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                const __gotots_argument_163 = Node__from_ast.Expression(attr);
                const __gotots_argument_165 = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_163);
                expressions = __gotots_argument_164.append(void 0, [__gotots_argument_165]);
                continue;
            }
            properties = properties.append(void 0, [JSXTransformer.$go$private$jsxtransforms$transformJsxAttributeToObjectLiteralElement(tx, Node__from_ast.AsJsxAttribute(attr))]);
        }
        if (!(childrenProp === undefined)) {
            properties = properties.append(void 0, [childrenProp]);
        }
        const __gotots_results_7 = JSXTransformer.$go$private$jsxtransforms$combinePropertiesIntoNewExpression(tx, expressions, properties);
        expressions = __gotots_results_7[0];
        if (expressions.length > 0 && !IsObjectLiteralExpression__from_ast(expressions.get(0))) {
            const __gotots_store_168 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_169 = (Transformer__from_transformers.Factory(__gotots_store_168.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_46 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_169, "NodeFactory");
            const __gotots_store_170 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_171 = (Transformer__from_transformers.Factory(__gotots_store_170.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_166 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_171, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_167 = false;
            const __gotots_slice_element_5 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_46, __gotots_argument_166, __gotots_argument_167);
            const __gotots_argument_168 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_5]);
            const __gotots_argument_169 = expressions;
            expressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_168, __gotots_argument_169, void 0);
        }
        if (expressions.length === 1) {
            return expressions.get(0);
        }
        const __gotots_store_172 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeFactory__from_printer.NewAssignHelper(Transformer__from_transformers.Factory(__gotots_store_172.Transformer), expressions, CompilerOptions__from_core.GetEmitScriptTarget((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions));
    }
    static $go$private$jsxtransforms$transformJsxAttributesToObjectProps(tx: JSXTransformer | undefined, attrs: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, childrenProp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let target = CompilerOptions__from_core.GetEmitScriptTarget((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
        if (target >= ScriptTargetES2018$constant__from_core()) {
            const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_117 = (Transformer__from_transformers.Factory(__gotots_store_116.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory");
            const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_119 = (Transformer__from_transformers.Factory(__gotots_store_118.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_111 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeFactory"), JSXTransformer.$go$private$jsxtransforms$transformJsxAttributesToProps(tx, attrs, childrenProp));
            const __gotots_argument_112 = false;
            return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_31, __gotots_argument_111, __gotots_argument_112);
        }
        return JSXTransformer.$go$private$jsxtransforms$transformJsxAttributesToExpression(tx, attrs, childrenProp);
    }
    static $go$private$jsxtransforms$transformJsxAttributesToProps(tx: JSXTransformer | undefined, attrs: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, childrenProp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let props = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, attrs.length, void 0);
        const __gotots_range_12 = attrs;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_12.length; __gotots_range_index_10++) {
            const __gotots_range_value_15 = __gotots_range_12.get(__gotots_range_index_10);
            let attr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
            if (Node__from_ast.$storageOf(((attr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSpreadAttribute$constant__from_ast()) {
                let res = JSXTransformer.$go$private$jsxtransforms$transformJsxSpreadAttributesToProps(tx, Node__from_ast.AsJsxSpreadAttribute(attr));
                props = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(props, res, void 0);
            }
            else {
                props = props.append(void 0, [JSXTransformer.$go$private$jsxtransforms$transformJsxAttributeToObjectLiteralElement(tx, Node__from_ast.AsJsxAttribute(attr))]);
            }
        }
        if (!(childrenProp === undefined)) {
            props = props.append(void 0, [childrenProp]);
        }
        return props;
    }
    static $go$private$jsxtransforms$transformJsxChildToExpression(tx: JSXTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let prev = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inJsxChild;
                    JSXTransformer.$go$private$jsxtransforms$setInChild(tx, true);
                    const __gotots_receiver_42 = tx;
                    const __gotots_argument_153 = prev;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        JSXTransformer.$go$private$jsxtransforms$setInChild(__gotots_receiver_42, __gotots_argument_153);
                    };
                    const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_callee_5: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_159.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                    const __gotots_argument_154 = node;
                    __gotots_return_0 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_154);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$jsxtransforms$transformJsxSpreadAttributesToProps(tx: JSXTransformer | undefined, node: {
        value: JsxSpreadAttribute__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (IsObjectLiteralExpression__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression) && !hasProto(Node__from_ast.AsObjectLiteralExpression((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression))) {
            const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_9 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_188.Transformer), Node__from_ast.Properties((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression));
            let res = __gotots_results_9[0];
            return res;
        }
        const __gotots_store_189 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_190 = (Transformer__from_transformers.Factory(__gotots_store_189.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_190, "NodeFactory");
        const __gotots_store_191 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_11: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_191.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_181: JsxSpreadAttribute__from_ast["Expression"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
        const __gotots_argument_182 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_181);
        const __gotots_slice_element_6 = NodeFactory__from_ast.NewSpreadAssignment(__gotots_receiver_49, __gotots_argument_182);
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_6]);
    }
    static $go$private$jsxtransforms$visit(tx: JSXTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return void 0;
        }
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsJsx$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                JSXTransformer.$go$private$jsxtransforms$setInChild(tx, false);
                return JSXTransformer.$go$private$jsxtransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindJsxElement$constant__from_ast(): {
                return JSXTransformer.$go$private$jsxtransforms$visitJsxElement(tx, Node__from_ast.AsJsxElement(node));
                break;
            }
            case KindJsxSelfClosingElement$constant__from_ast(): {
                return JSXTransformer.$go$private$jsxtransforms$visitJsxSelfClosingElement(tx, Node__from_ast.AsJsxSelfClosingElement(node));
                break;
            }
            case KindJsxFragment$constant__from_ast(): {
                return JSXTransformer.$go$private$jsxtransforms$visitJsxFragment(tx, Node__from_ast.AsJsxFragment(node));
                break;
            }
            case KindJsxOpeningElement$constant__from_ast(): {
                const __gotots_argument_2 = new GoInterfaceAdapter("JsxOpeningElement should not be visited, handled in visitJsxElement");
                GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
                break;
            }
            case KindJsxOpeningFragment$constant__from_ast(): {
                const __gotots_argument_3 = new GoInterfaceAdapter("JsxOpeningFragment should not be visited, handled in visitJsxFragment");
                GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
                break;
            }
            case KindJsxText$constant__from_ast(): {
                JSXTransformer.$go$private$jsxtransforms$setInChild(tx, false);
                return JSXTransformer.$go$private$jsxtransforms$visitJsxText(tx, Node__from_ast.AsJsxText(node));
                break;
            }
            case KindJsxExpression$constant__from_ast(): {
                JSXTransformer.$go$private$jsxtransforms$setInChild(tx, false);
                return JSXTransformer.$go$private$jsxtransforms$visitJsxExpression(tx, Node__from_ast.AsJsxExpression(node));
                break;
            }
        }
        JSXTransformer.$go$private$jsxtransforms$setInChild(tx, false);
        const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
    }
    static $go$private$jsxtransforms$visitJsxElement(tx: JSXTransformer | undefined, element: {
        value: JsxElement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tagTransform: (($0: JSXTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $3: TextRange__from_core) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = ($argument0: JSXTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument3: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningLikeElementJSX($argument0, $argument1, $argument2, $argument3);
        };
        const __gotots_receiver_18 = tx;
        const __gotots_store_56 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_49 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (JSXTransformer.$go$private$jsxtransforms$shouldUseCreateElement(__gotots_receiver_18, __gotots_argument_49)) {
            tagTransform = ($argument0: JSXTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument3: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningLikeElementCreateElement($argument0, $argument1, $argument2, $argument3);
            };
        }
        const __gotots_argument_50 = SourceFile__from_ast.Text((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile);
        const __gotots_store_57 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
        const __gotots_argument_51 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        const __gotots_argument_52 = SkipTrivia__from_scanner(__gotots_argument_50, __gotots_argument_51);
        const __gotots_store_58 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
        const __gotots_argument_53 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        let location = NewTextRange__from_core(__gotots_argument_52, __gotots_argument_53);
        const __gotots_callee_0 = tagTransform;
        const __gotots_argument_54 = tx;
        const __gotots_argument_55: JsxElement__from_ast["OpeningElement"] = (element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement;
        const __gotots_argument_56: JsxElement__from_ast["Children"] = (element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
        const __gotots_argument_57 = TextRange__from_core.$copy(location);
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57);
    }
    static $go$private$jsxtransforms$visitJsxExpression(tx: JSXTransformer | undefined, expression: {
        value: JsxExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_67 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_3: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_67.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_75: JsxExpression__from_ast["Expression"] = (expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
        let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_75);
        if (!((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) {
            const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_69 = (Transformer__from_transformers.Factory(__gotots_store_68.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewSpreadElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory"), e);
        }
        return e;
    }
    static $go$private$jsxtransforms$visitJsxFragment(tx: JSXTransformer | undefined, fragment: {
        value: JsxFragment__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tagTransform: (($0: JSXTransformer | undefined, $1: {
            value: JsxOpeningFragment__from_ast;
        } | undefined, $2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $3: TextRange__from_core) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = ($argument0: JSXTransformer | undefined, $argument1: {
            value: JsxOpeningFragment__from_ast;
        } | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument3: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningFragmentJSX($argument0, $argument1, $argument2, $argument3);
        };
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSpecifier.length === 0) {
            tagTransform = ($argument0: JSXTransformer | undefined, $argument1: {
                value: JsxOpeningFragment__from_ast;
            } | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument3: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningFragmentCreateElement($argument0, $argument1, $argument2, $argument3);
            };
        }
        const __gotots_argument_67 = SourceFile__from_ast.Text((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile);
        const __gotots_store_63 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((fragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
        const __gotots_argument_68 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        const __gotots_argument_69 = SkipTrivia__from_scanner(__gotots_argument_67, __gotots_argument_68);
        const __gotots_store_64 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((fragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
        const __gotots_argument_70 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        let location = NewTextRange__from_core(__gotots_argument_69, __gotots_argument_70);
        const __gotots_callee_2 = tagTransform;
        const __gotots_argument_71 = tx;
        const __gotots_argument_72 = Node__from_ast.AsJsxOpeningFragment((fragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningFragment);
        const __gotots_argument_73: JsxFragment__from_ast["Children"] = (fragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
        const __gotots_argument_74 = TextRange__from_core.$copy(location);
        return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_71, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74);
    }
    static $go$private$jsxtransforms$visitJsxOpeningFragmentCreateElement(tx: JSXTransformer | undefined, fragment: {
        value: JsxOpeningFragment__from_ast;
    } | undefined, children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_23 = tx;
        const __gotots_store_86 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ExpressionBase__from_ast.$storageOf((fragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
        const __gotots_argument_85 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$createJsxFragmentFactoryExpression(__gotots_receiver_23, __gotots_argument_85);
        const __gotots_receiver_24 = tx;
        const __gotots_store_87 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ExpressionBase__from_ast.$storageOf((fragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExpressionBase).NodeBase));
        const __gotots_argument_86 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let callee: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$createJsxFactoryExpression(__gotots_receiver_24, __gotots_argument_86);
        let newChildren = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(children === undefined) && NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            const __gotots_range_8 = NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
                const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_6);
                let c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
                let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$transformJsxChildToExpression(tx, c);
                if (!(res === undefined)) {
                    newChildren = newChildren.append(void 0, [res]);
                }
            }
        }
        if (newChildren.length > 1) {
            const __gotots_range_9 = newChildren;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
                const __gotots_range_value_12 = __gotots_range_9.get(__gotots_range_index_7);
                let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
                const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_88.Transformer), child, EFStartOnNewLine$constant__from_printer());
            }
        }
        let args = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, newChildren.length + 2, void 0);
        args = args.append(void 0, [tagName]);
        const __gotots_argument_87 = args;
        const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_90 = (Transformer__from_transformers.Factory(__gotots_store_89.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_88 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeFactory"), KindNullKeyword$constant__from_ast());
        args = __gotots_argument_87.append(void 0, [__gotots_argument_88]);
        args = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(args, newChildren, void 0);
        const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_92 = (Transformer__from_transformers.Factory(__gotots_store_91.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "NodeFactory");
        const __gotots_argument_89 = callee;
        const __gotots_argument_90 = void 0;
        const __gotots_argument_91 = void 0;
        const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_94 = (Transformer__from_transformers.Factory(__gotots_store_93.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_92 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NodeFactory"), args);
        const __gotots_argument_93 = NodeFlagsNone$constant__from_ast();
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_25, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
        Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inJsxChild) {
            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_95.Transformer), result, EFStartOnNewLine$constant__from_printer());
        }
        return result;
    }
    static $go$private$jsxtransforms$visitJsxOpeningFragmentJSX(tx: JSXTransformer | undefined, fragment: {
        value: JsxOpeningFragment__from_ast;
    } | undefined, children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let childrenProps: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(children === undefined) && NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$convertJsxChildrenToChildrenPropObject(tx, NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            if (!(result === undefined)) {
                childrenProps = result;
            }
        }
        if (childrenProps === undefined) {
            const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_83 = (Transformer__from_transformers.Factory(__gotots_store_82.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "NodeFactory");
            const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_85 = (Transformer__from_transformers.Factory(__gotots_store_84.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_83 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_84 = false;
            childrenProps = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_22, __gotots_argument_83, __gotots_argument_84);
        }
        return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningLikeElementOrFragmentJSX(tx, JSXTransformer.$go$private$jsxtransforms$getImplicitJsxFragmentReference(tx), childrenProps, void 0, children, TextRange__from_core.$copy(location));
    }
    static $go$private$jsxtransforms$visitJsxOpeningLikeElementCreateElement(tx: JSXTransformer | undefined, element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$getTagName(tx, element);
        let attrs = Node__from_ast.Properties(Node__from_ast.Attributes(element));
        let objectProperties: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (attrs.length > 0) {
            objectProperties = JSXTransformer.$go$private$jsxtransforms$transformJsxAttributesToObjectProps(tx, attrs, void 0);
        }
        else {
            const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_75 = (Transformer__from_transformers.Factory(__gotots_store_74.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            objectProperties = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "NodeFactory"), KindNullKeyword$constant__from_ast());
        }
        let callee: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSpecifier.length === 0) {
            callee = JSXTransformer.$go$private$jsxtransforms$createJsxFactoryExpression(tx, element);
        }
        else {
            callee = JSXTransformer.$go$private$jsxtransforms$getImplicitImportForName(tx, "createElement");
        }
        let newChildren = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(children === undefined) && NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            const __gotots_range_6 = NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_6.length; __gotots_range_index_4++) {
                const __gotots_range_value_9 = __gotots_range_6.get(__gotots_range_index_4);
                let c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$transformJsxChildToExpression(tx, c);
                if (!(res === undefined)) {
                    newChildren = newChildren.append(void 0, [res]);
                }
            }
        }
        if (newChildren.length > 1) {
            const __gotots_range_7 = newChildren;
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_7.length; __gotots_range_index_5++) {
                const __gotots_range_value_10 = __gotots_range_7.get(__gotots_range_index_5);
                let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_76.Transformer), child, EFStartOnNewLine$constant__from_printer());
            }
        }
        let args = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, newChildren.length + 2, void 0);
        args = args.append(void 0, [tagName]);
        args = args.append(void 0, [objectProperties]);
        args = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(args, newChildren, void 0);
        const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_78 = (Transformer__from_transformers.Factory(__gotots_store_77.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "NodeFactory");
        const __gotots_argument_78 = callee;
        const __gotots_argument_79 = void 0;
        const __gotots_argument_80 = void 0;
        const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_80 = (Transformer__from_transformers.Factory(__gotots_store_79.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_81 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "NodeFactory"), args);
        const __gotots_argument_82 = NodeFlagsNone$constant__from_ast();
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_21, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82);
        Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inJsxChild) {
            const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_81.Transformer), result, EFStartOnNewLine$constant__from_printer());
        }
        return result;
    }
    static $go$private$jsxtransforms$visitJsxOpeningLikeElementJSX(tx: JSXTransformer | undefined, element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = JSXTransformer.$go$private$jsxtransforms$getTagName(tx, element);
        let childrenProp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(children === undefined) && NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            childrenProp = JSXTransformer.$go$private$jsxtransforms$convertJsxChildrenToChildrenPropAssignment(tx, NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        }
        let keyAttr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let attrs = Node__from_ast.Properties(Node__from_ast.Attributes(element));
        const __gotots_range_5 = attrs;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_5.length; __gotots_range_index_3++) {
            const __gotots_range_value_7 = __gotots_range_index_3;
            const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_3);
            let i = __gotots_range_value_7;
            let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            if (Node__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast() && !(JsxAttribute__from_ast.Name(Node__from_ast.AsJsxAttribute(p)) === undefined) && IsIdentifier__from_ast(JsxAttribute__from_ast.Name(Node__from_ast.AsJsxAttribute(p))) && Node__from_ast.Text(JsxAttribute__from_ast.Name(Node__from_ast.AsJsxAttribute(p))) === "key") {
                keyAttr = p;
                attrs = Clone$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(attrs);
                attrs = Delete$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(attrs, i, i + 1);
                break;
            }
        }
        let __go_object: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (attrs.length > 0) {
            __go_object = JSXTransformer.$go$private$jsxtransforms$transformJsxAttributesToObjectProps(tx, attrs, childrenProp);
        }
        else {
            let objectChildren = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
            if (!(childrenProp === undefined)) {
                objectChildren = objectChildren.append(void 0, [childrenProp]);
            }
            const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_71 = (Transformer__from_transformers.Factory(__gotots_store_70.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeFactory");
            const __gotots_store_72 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_73 = (Transformer__from_transformers.Factory(__gotots_store_72.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_76 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "NodeFactory"), objectChildren);
            const __gotots_argument_77 = false;
            __go_object = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_20, __gotots_argument_76, __gotots_argument_77);
        }
        return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningLikeElementOrFragmentJSX(tx, tagName, __go_object, keyAttr, children, TextRange__from_core.$copy(location));
    }
    static $go$private$jsxtransforms$visitJsxOpeningLikeElementOrFragmentJSX(tx: JSXTransformer | undefined, tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_object: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, keyAttr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let nonWhitespaceChildren = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(children === undefined)) {
            nonWhitespaceChildren = GetSemanticJsxChildren__from_ast(NodeList__from_ast.$storageOf(((children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        }
        let isStaticChildren = nonWhitespaceChildren.length > 1 || (nonWhitespaceChildren.length === 1 && IsJsxExpression__from_ast(nonWhitespaceChildren.get(0)) && !((Node__from_ast.AsJsxExpression(nonWhitespaceChildren.get(0)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined));
        let args = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 3, void 0);
        args = args.append(void 0, [tagName, __go_object]);
        if (!(keyAttr === undefined)) {
            args = args.append(void 0, [JSXTransformer.$go$private$jsxtransforms$transformJsxAttributeInitializer(tx, Node__from_ast.Initializer(keyAttr))]);
        }
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core()) {
            const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_32 = Transformer__from_transformers.EmitContext(__gotots_store_120.Transformer);
            const __gotots_store_121 = NodeBase__from_ast.$storageOf((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_113 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let originalFile: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(__gotots_receiver_32, __gotots_argument_113);
            if (!(originalFile === undefined) && IsSourceFile__from_ast(originalFile)) {
                if (keyAttr === undefined) {
                    const __gotots_argument_114 = args;
                    const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_115 = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(__gotots_store_122.Transformer));
                    args = __gotots_argument_114.append(void 0, [__gotots_argument_115]);
                }
                if (isStaticChildren) {
                    const __gotots_argument_116 = args;
                    const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_117 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(__gotots_store_123.Transformer));
                    args = __gotots_argument_116.append(void 0, [__gotots_argument_117]);
                }
                else {
                    const __gotots_argument_118 = args;
                    const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_119 = NodeFactory__from_printer.NewFalseExpression(Transformer__from_transformers.Factory(__gotots_store_124.Transformer));
                    args = __gotots_argument_118.append(void 0, [__gotots_argument_119]);
                }
                const __gotots_results_2 = GetECMALineAndUTF16CharacterOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(Node__from_ast.AsSourceFile(originalFile)), location.Pos());
                let line = __gotots_results_2[0];
                let col = __gotots_results_2[1];
                const __gotots_argument_138 = args;
                const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_126 = (Transformer__from_transformers.Factory(__gotots_store_125.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "NodeFactory");
                const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_128 = (Transformer__from_transformers.Factory(__gotots_store_127.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "NodeFactory");
                const __gotots_store_129 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_130 = (Transformer__from_transformers.Factory(__gotots_store_129.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeFactory");
                const __gotots_argument_120 = void 0;
                const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_132 = (Transformer__from_transformers.Factory(__gotots_store_131.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_121 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeFactory"), "fileName");
                const __gotots_argument_122 = void 0;
                const __gotots_argument_123 = void 0;
                const __gotots_argument_124 = JSXTransformer.$go$private$jsxtransforms$getCurrentFileNameExpression(tx);
                const __gotots_slice_element_2 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_33, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124);
                const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_134 = (Transformer__from_transformers.Factory(__gotots_store_133.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_34 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "NodeFactory");
                const __gotots_argument_125 = void 0;
                const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_136 = (Transformer__from_transformers.Factory(__gotots_store_135.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_126 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "NodeFactory"), "lineNumber");
                const __gotots_argument_127 = void 0;
                const __gotots_argument_128 = void 0;
                const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_138 = (Transformer__from_transformers.Factory(__gotots_store_137.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_129 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "NodeFactory"), strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(line + 1)), BigInt.asIntN(64, goNumberToBigInt(10))), TokenFlagsNone$constant__from_ast());
                const __gotots_slice_element_3 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_34, __gotots_argument_125, __gotots_argument_126, __gotots_argument_127, __gotots_argument_128, __gotots_argument_129);
                const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_140 = (Transformer__from_transformers.Factory(__gotots_store_139.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory");
                const __gotots_argument_130 = void 0;
                const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_142 = (Transformer__from_transformers.Factory(__gotots_store_141.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_131 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory"), "columnNumber");
                const __gotots_argument_132 = void 0;
                const __gotots_argument_133 = void 0;
                const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_144 = (Transformer__from_transformers.Factory(__gotots_store_143.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_134 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory"), strconv__from_gostdlib.FormatInt(goInt64(BigInt.asIntN(64, goNumberToBigInt(col.$value)) + 1n), BigInt.asIntN(64, goNumberToBigInt(10))), TokenFlagsNone$constant__from_ast());
                const __gotots_slice_element_4 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_35, __gotots_argument_130, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133, __gotots_argument_134);
                const __gotots_argument_135 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2, __gotots_slice_element_3, __gotots_slice_element_4]);
                const __gotots_argument_136 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_36, __gotots_argument_135);
                const __gotots_argument_137 = false;
                const __gotots_argument_139 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_37, __gotots_argument_136, __gotots_argument_137);
                args = __gotots_argument_138.append(void 0, [__gotots_argument_139]);
                const __gotots_argument_140 = args;
                const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_141 = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(__gotots_store_145.Transformer));
                args = __gotots_argument_140.append(void 0, [__gotots_argument_141]);
            }
        }
        const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_147 = (Transformer__from_transformers.Factory(__gotots_store_146.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeFactory");
        const __gotots_argument_142 = JSXTransformer.$go$private$jsxtransforms$getJsxFactoryCallee(tx, isStaticChildren);
        const __gotots_argument_143 = void 0;
        const __gotots_argument_144 = void 0;
        const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_149 = (Transformer__from_transformers.Factory(__gotots_store_148.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_145 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_149, "NodeFactory"), args);
        const __gotots_argument_146 = NodeFlagsNone$constant__from_ast();
        let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_38, __gotots_argument_142, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145, __gotots_argument_146);
        Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inJsxChild) {
            const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_150.Transformer), element, EFStartOnNewLine$constant__from_printer());
        }
        return element;
    }
    static $go$private$jsxtransforms$visitJsxSelfClosingElement(tx: JSXTransformer | undefined, element: {
        value: JsxSelfClosingElement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let tagTransform: (($0: JSXTransformer | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $3: TextRange__from_core) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = ($argument0: JSXTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument3: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningLikeElementJSX($argument0, $argument1, $argument2, $argument3);
        };
        const __gotots_receiver_19 = tx;
        const __gotots_store_59 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_58 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (JSXTransformer.$go$private$jsxtransforms$shouldUseCreateElement(__gotots_receiver_19, __gotots_argument_58)) {
            tagTransform = ($argument0: JSXTransformer | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument3: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return JSXTransformer.$go$private$jsxtransforms$visitJsxOpeningLikeElementCreateElement($argument0, $argument1, $argument2, $argument3);
            };
        }
        const __gotots_argument_59 = SourceFile__from_ast.Text((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile);
        const __gotots_store_60 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
        const __gotots_argument_60 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        const __gotots_argument_61 = SkipTrivia__from_scanner(__gotots_argument_59, __gotots_argument_60);
        const __gotots_store_61 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
        const __gotots_argument_62 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        let location = NewTextRange__from_core(__gotots_argument_61, __gotots_argument_62);
        const __gotots_callee_1 = tagTransform;
        const __gotots_argument_63 = tx;
        const __gotots_store_62 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_64 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_65 = void 0;
        const __gotots_argument_66 = TextRange__from_core.$copy(location);
        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66);
    }
    static $go$private$jsxtransforms$visitJsxText(tx: JSXTransformer | undefined, text: {
        value: JsxText__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let fixed = fixupWhitespaceAndDecodeEntities(LiteralLikeNodeBase__from_ast.$storageOf((text ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LiteralLikeNodeBase).Text);
        if (fixed.length === 0) {
            return void 0;
        }
        const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_66 = (Transformer__from_transformers.Factory(__gotots_store_65.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "NodeFactory"), fixed, TokenFlagsNone$constant__from_ast());
    }
    static $go$private$jsxtransforms$visitSourceFile(tx: JSXTransformer | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            const __gotots_store_2 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = file;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSpecifier = GetJSXImplicitImportBase__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions, file);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration = void 0;
        const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        OrderedMap$Clear$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "utilizedImplicitRuntimeImports"));
        const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_2 = Transformer__from_transformers.Visitor(__gotots_store_4.Transformer);
        const __gotots_store_5 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_4 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_2, __gotots_argument_4);
        const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_3 = Transformer__from_transformers.EmitContext(__gotots_store_6.Transformer);
        const __gotots_argument_5 = (void Node__from_ast.AsNode,
            visited);
        const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_6 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_7.Transformer));
        EmitContext__from_printer.AddEmitHelper(__gotots_receiver_3, __gotots_argument_5, __gotots_argument_6);
        let statements = Node__from_ast.Statements(visited);
        let statementsUpdated = false;
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration === undefined)) {
            const __gotots_receiver_6 = tx;
            const __gotots_argument_11 = statements;
            const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_9 = (Transformer__from_transformers.Factory(__gotots_store_8.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory");
            const __gotots_argument_9 = void 0;
            const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_11 = (Transformer__from_transformers.Factory(__gotots_store_10.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory");
            const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_7 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration]));
            const __gotots_argument_8 = NodeFlagsConst$constant__from_ast();
            const __gotots_argument_10 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_4, __gotots_argument_7, __gotots_argument_8);
            const __gotots_argument_12 = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_5, __gotots_argument_9, __gotots_argument_10);
            statements = JSXTransformer.$go$private$jsxtransforms$insertStatementAfterCustomPrologue(__gotots_receiver_6, __gotots_argument_11, __gotots_argument_12);
            statementsUpdated = true;
        }
        const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_binary_operand_0 = OrderedMap$Size$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "utilizedImplicitRuntimeImports"));
        const __gotots_binary_operand_1 = 0;
        if (__gotots_binary_operand_0 > __gotots_binary_operand_1) {
            if (IsExternalModule__from_ast(file)) {
                statementsUpdated = true;
                const __gotots_argument_13 = 0;
                const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_14 = OrderedMap$Size$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "utilizedImplicitRuntimeImports"));
                const __gotots_argument_15 = void 0;
                let newStatements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
                const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "utilizedImplicitRuntimeImports")));
                if (__gotots_range_0 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_0 = 1;
                __gotots_range_0(($argument0: gostring, $argument1: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): bool => {
                    if (__gotots_range_state_0 === 0) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    if (__gotots_range_state_0 === -1) {
                        GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                    }
                    if (__gotots_range_state_0 === -2) {
                        GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                    }
                    if (__gotots_range_state_0 === 2) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    __gotots_range_state_0 = -1;
                    const __gotots_range_value_0 = $argument0;
                    const __gotots_range_value_1 = $argument1;
                    let importSource = __gotots_range_value_0;
                    let importSpecifiersMap: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_range_value_1;
                    const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_18 = (Transformer__from_transformers.Factory(__gotots_store_17.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory");
                    const __gotots_argument_20 = void 0;
                    const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_20 = (Transformer__from_transformers.Factory(__gotots_store_19.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory");
                    const __gotots_argument_17 = KindUnknown$constant__from_ast();
                    const __gotots_argument_18 = void 0;
                    const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_22 = (Transformer__from_transformers.Factory(__gotots_store_21.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory");
                    const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_24 = (Transformer__from_transformers.Factory(__gotots_store_23.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_16 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), getSortedSpecifiers(importSpecifiersMap));
                    const __gotots_argument_19 = NodeFactory__from_ast.NewNamedImports(__gotots_receiver_7, __gotots_argument_16);
                    const __gotots_argument_21 = NodeFactory__from_ast.NewImportClause(__gotots_receiver_8, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                    const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_26 = (Transformer__from_transformers.Factory(__gotots_store_25.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_22 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), importSource, TokenFlagsNone$constant__from_ast());
                    const __gotots_argument_23 = void 0;
                    let s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportDeclaration(__gotots_receiver_9, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
                    SetParentInChildren__from_ast(s);
                    newStatements = newStatements.append(void 0, [s]);
                    __gotots_range_state_0 = 1;
                    return true;
                });
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_0 = -2;
                const __gotots_range_1 = newStatements;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                    const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_0);
                    let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                    statements = JSXTransformer.$go$private$jsxtransforms$insertStatementAfterCustomPrologue(tx, statements, e);
                }
            }
            else if (IsExternalOrCommonJSModule__from_ast(file)) {
                statementsUpdated = true;
                const __gotots_argument_24 = 0;
                const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_25 = OrderedMap$Size$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "utilizedImplicitRuntimeImports"));
                const __gotots_argument_26 = void 0;
                let newStatements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
                const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_range_2 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "utilizedImplicitRuntimeImports")));
                if (__gotots_range_2 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_1 = 1;
                __gotots_range_2(($argument0: gostring, $argument1: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): bool => {
                    if (__gotots_range_state_1 === 0) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    if (__gotots_range_state_1 === -1) {
                        GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                    }
                    if (__gotots_range_state_1 === -2) {
                        GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                    }
                    if (__gotots_range_state_1 === 2) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    __gotots_range_state_1 = -1;
                    const __gotots_range_value_3 = $argument0;
                    const __gotots_range_value_4 = $argument1;
                    let importSource = __gotots_range_value_3;
                    let importSpecifiersMap: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = __gotots_range_value_4;
                    let sorted = getSortedSpecifiers(importSpecifiersMap);
                    let asBindingElems = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, sorted.length, void 0);
                    const __gotots_range_3 = sorted;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
                        const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_1);
                        let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                        const __gotots_argument_27 = asBindingElems;
                        const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_30 = (Transformer__from_transformers.Factory(__gotots_store_29.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_28 = NodeFactory__from_ast.NewBindingElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "NodeFactory"), void 0, Node__from_ast.PropertyName(elem), ImportSpecifier__from_ast.Name(Node__from_ast.AsImportSpecifier(elem)), void 0);
                        asBindingElems = __gotots_argument_27.append(void 0, [__gotots_argument_28]);
                    }
                    const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_32 = (Transformer__from_transformers.Factory(__gotots_store_31.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory");
                    const __gotots_argument_44 = void 0;
                    const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_34 = (Transformer__from_transformers.Factory(__gotots_store_33.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "NodeFactory");
                    const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_36 = (Transformer__from_transformers.Factory(__gotots_store_35.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory");
                    const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_38 = (Transformer__from_transformers.Factory(__gotots_store_37.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NodeFactory");
                    const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_40 = (Transformer__from_transformers.Factory(__gotots_store_39.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "NodeFactory");
                    const __gotots_argument_29 = KindObjectBindingPattern$constant__from_ast();
                    const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_42 = (Transformer__from_transformers.Factory(__gotots_store_41.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_30 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory"), asBindingElems);
                    const __gotots_argument_37 = NodeFactory__from_ast.NewBindingPattern(__gotots_receiver_10, __gotots_argument_29, __gotots_argument_30);
                    const __gotots_argument_38 = void 0;
                    const __gotots_argument_39 = void 0;
                    const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_44 = (Transformer__from_transformers.Factory(__gotots_store_43.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory");
                    const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_46 = (Transformer__from_transformers.Factory(__gotots_store_45.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_32 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory"), "require");
                    const __gotots_argument_33 = void 0;
                    const __gotots_argument_34 = void 0;
                    const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_48 = (Transformer__from_transformers.Factory(__gotots_store_47.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NodeFactory");
                    const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_50 = (Transformer__from_transformers.Factory(__gotots_store_49.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_slice_element_0 = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "NodeFactory"), importSource, TokenFlagsNone$constant__from_ast());
                    const __gotots_argument_31 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
                    const __gotots_argument_35 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_11, __gotots_argument_31);
                    const __gotots_argument_36 = NodeFlagsNone$constant__from_ast();
                    const __gotots_argument_40 = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_12, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
                    const __gotots_slice_element_1 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_13, __gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
                    const __gotots_argument_41 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
                    const __gotots_argument_42 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_14, __gotots_argument_41);
                    const __gotots_argument_43 = NodeFlagsConst$constant__from_ast();
                    const __gotots_argument_45 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_15, __gotots_argument_42, __gotots_argument_43);
                    let s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_16, __gotots_argument_44, __gotots_argument_45);
                    SetParentInChildren__from_ast(s);
                    newStatements = newStatements.append(void 0, [s]);
                    __gotots_range_state_1 = 1;
                    return true;
                });
                if (__gotots_range_state_1 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_1 = -2;
                const __gotots_range_4 = newStatements;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_4.length; __gotots_range_index_2++) {
                    const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_2);
                    let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                    statements = JSXTransformer.$go$private$jsxtransforms$insertStatementAfterCustomPrologue(tx, statements, e);
                }
            }
            else {
            }
        }
        if (statementsUpdated) {
            const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_52 = (Transformer__from_transformers.Factory(__gotots_store_51.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory");
            const __gotots_argument_46 = file;
            const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_54 = (Transformer__from_transformers.Factory(__gotots_store_53.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_47 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory"), statements);
            const __gotots_argument_48 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken;
            visited = NodeFactory__from_ast.UpdateSourceFile(__gotots_receiver_17, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentSourceFile = void 0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSpecifier = "";
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filenameDeclaration = void 0;
        const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        OrderedMap$Clear$string$MapOf_string_To_PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "utilizedImplicitRuntimeImports"));
        return visited;
    }
}
export function NewJSXTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let tx: JSXTransformer | undefined = new JSXTransformer(Transformer__from_transformers.$zero(), compilerOptions, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitResolver, "", void 0, OrderedMap__from_collections.$zero<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>((): GoMapValue<gostring, GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> => {
        return GoMap.nil();
    }), false, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return JSXTransformer.$go$private$jsxtransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = emitContext;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export function hasKeyAfterPropsSpread(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let spread = false;
    let opener: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxElement$constant__from_ast()) {
        opener = (Node__from_ast.AsJsxElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement;
    }
    const __gotots_range_11 = Node__from_ast.Properties(Node__from_ast.Attributes(opener));
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_11.length; __gotots_range_index_9++) {
        const __gotots_range_value_14 = __gotots_range_11.get(__gotots_range_index_9);
        let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
        if (IsJsxSpreadAttribute__from_ast(elem) && (!IsObjectLiteralExpression__from_ast(Node__from_ast.Expression(elem)) || Some$PointerTo_Named_ast$Node(Node__from_ast.Properties(Node__from_ast.Expression(elem)), IsSpreadAssignment__from_ast))) {
            spread = true;
        }
        else if (spread && IsJsxAttribute__from_ast(elem) && IsIdentifier__from_ast(Node__from_ast.Name(elem)) && Node__from_ast.Text(Node__from_ast.Name(elem)) === "key") {
            return true;
        }
    }
    return false;
}
export function insertStatementAfterPrologue$kernel<T>(to: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isPrologueDirective: (($0: T, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined, callee: T): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (statement === undefined) {
        return to;
    }
    let statementIdx = 0;
    for (; statementIdx < to.length; statementIdx++) {
        const __gotots_callee_4 = isPrologueDirective;
        const __gotots_argument_94 = callee;
        const __gotots_argument_95 = to.get(statementIdx);
        if (!(__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_94, __gotots_argument_95)) {
            break;
        }
    }
    return Insert$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(to, statementIdx, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement]));
}
export function sortImportSpecifiers(a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
    let res = CompareStringsCaseSensitive__from_stringutil(Node__from_ast.Text(Node__from_ast.PropertyName(a)), Node__from_ast.Text(Node__from_ast.PropertyName(b)));
    if (res !== 0) {
        return res;
    }
    return CompareStringsCaseSensitive__from_stringutil(Node__from_ast.Text(ImportSpecifier__from_ast.Name(Node__from_ast.AsImportSpecifier(a))), Node__from_ast.Text(ImportSpecifier__from_ast.Name(Node__from_ast.AsImportSpecifier(b))));
}
export function getSortedSpecifiers(m: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let res = Collect$PointerTo_Named_ast$Node(Values$MapOf_string_To_PointerTo_Named_ast$Node$string$PointerTo_Named_ast$Node(m));
    SortFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(res, sortImportSpecifiers);
    return res;
}
export function hasProto(obj: {
    value: ObjectLiteralExpression__from_ast;
} | undefined): bool {
    const __gotots_range_15 = NodeList__from_ast.$storageOf((((obj ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_15.length; __gotots_range_index_13++) {
        const __gotots_range_value_18 = __gotots_range_15.get(__gotots_range_index_13);
        let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_18;
        if (IsPropertyAssignment__from_ast(p) && (IsStringLiteral__from_ast(Node__from_ast.Name(p)) || IsIdentifier__from_ast(Node__from_ast.Name(p))) && Node__from_ast.Text(Node__from_ast.Name(p)) === "__proto__") {
            return true;
        }
    }
    return false;
}
export function addLineOfJsxText(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, trimmedLine: gostring, isInitial: bool): void {
    let decoded = decodeEntities(trimmedLine);
    if (!isInitial) {
        const __gotots_receiver_44 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_44 === void 0 ? void 0 :
            (__gotots_receiver_44 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, " ");
    }
    const __gotots_receiver_45 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_45 === void 0 ? void 0 :
        (__gotots_receiver_45 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, decoded);
}
export function fixupWhitespaceAndDecodeEntities(text: gostring): gostring {
    const __gotots_struct_0 = named_strings.StringsBuilderOperations.$zero();
    let acc: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined = tsonicTypeScriptRuntime.location<strings__from_gostdlib.Builder>(__gotots_struct_0);
    let initial = true;
    let firstNonWhitespace = 0;
    let lastNonWhitespaceEnd = -1;
    for (let i = 0; i < text.length; i++) {
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, i));
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let c = __gotots_results_1[0];
        let size = __gotots_results_1[1];
        if (IsLineBreak__from_stringutil(c)) {
            if (firstNonWhitespace !== -1 && lastNonWhitespaceEnd !== -1) {
                addLineOfJsxText(acc, goStringSlice(text, firstNonWhitespace, lastNonWhitespaceEnd + 1), initial);
                initial = false;
            }
            firstNonWhitespace = -1;
        }
        else if (!IsWhiteSpaceSingleLine__from_stringutil(c)) {
            lastNonWhitespaceEnd = i + size - 1;
            if (firstNonWhitespace === -1) {
                firstNonWhitespace = i;
            }
        }
        if (size > 1) {
            i += (size - 1);
        }
    }
    if (firstNonWhitespace !== -1) {
        addLineOfJsxText(acc, goStringSlice(text, firstNonWhitespace), initial);
    }
    const __gotots_receiver_26 = acc;
    return strings__from_gostdlib.Builder.String(__gotots_receiver_26 === void 0 ? void 0 :
        (__gotots_receiver_26 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value);
}
export function decodeEntities(text: gostring): gostring {
    let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(text, 38)));
    if (i < 0) {
        return text;
    }
    let result = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.Grow(result, BigInt.asIntN(64, goNumberToBigInt(text.length)));
    for (;;) {
        strings__from_gostdlib.Builder.WriteString(result, goStringSlice(text, 0, i));
        text = goStringSlice(text, i);
        let semi = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(text, 59)));
        if (semi < 0) {
            break;
        }
        for (;;) {
            let nextAmp = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(goStringSlice(text, 1, semi), 38)));
            if (nextAmp < 0) {
                break;
            }
            strings__from_gostdlib.Builder.WriteString(result, goStringSlice(text, 0, nextAmp + 1));
            text = goStringSlice(text, nextAmp + 1);
            semi = semi - (nextAmp + 1);
        }
        let entity = goStringSlice(text, 1, semi);
        const __gotots_results_8 = decodeEntity(entity);
        let decoded = __gotots_results_8[0];
        let ok = __gotots_results_8[1];
        if (ok) {
            strings__from_gostdlib.Builder.WriteString(result, EncodeJSStringRune__from_stringutil(decoded));
        }
        else {
            strings__from_gostdlib.Builder.WriteString(result, goStringSlice(text, 0, semi + 1));
        }
        text = goStringSlice(text, semi + 1);
        i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(text, 38)));
        if (i < 0) {
            break;
        }
    }
    strings__from_gostdlib.Builder.WriteString(result, text);
    return strings__from_gostdlib.Builder.String(result);
}
export function decodeEntity(entity: gostring): [
    int32,
    bool
] {
    if (entity.length === 0) {
        return [0, false];
    }
    if (goStringIndex(entity, 0) === 35) {
        entity = goStringSlice(entity, 1);
        if (entity.length === 0) {
            return [0, false];
        }
        let base = 10;
        if (goStringIndex(entity, 0) === 120) {
            base = 16;
            entity = goStringSlice(entity, 1);
        }
        if (entity.length === 0) {
            return [0, false];
        }
        const __gotots_range_16 = entity;
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_16.length;) {
            const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_16, __gotots_range_index_14);
            const __gotots_range_value_19 = __gotots_range_decode_0[0];
            let c = __gotots_range_value_19;
            __gotots_range_index_14 += __gotots_range_decode_0[1];
            if (base === 16 && !IsHexDigit__from_stringutil(c)) {
                return [0, false];
            }
            if (base === 10 && !IsDigit__from_stringutil(c)) {
                return [0, false];
            }
        }
        const __gotots_results_10 = strconv__from_gostdlib.ParseInt(entity, BigInt.asIntN(64, goNumberToBigInt(base)), BigInt.asIntN(64, goNumberToBigInt(32)));
        const __gotots_results_11 = [__gotots_results_10[0], GoProviderInterfaceBridge.$from(__gotots_results_10[1])] satisfies [
            int64,
            GoInterface | undefined
        ];
        let parsed = __gotots_results_11[0];
        let err: GoInterface | undefined = __gotots_results_11[1];
        if (!(err === undefined)) {
            return [0, false];
        }
        return [globalThis.Number(BigInt.asIntN(32, parsed)), true];
    }
    const __gotots_results_12 = $state.entities.lookupOk(entity);
    let r = __gotots_results_12[0];
    let ok = __gotots_results_12[1];
    return [r, ok];
}
