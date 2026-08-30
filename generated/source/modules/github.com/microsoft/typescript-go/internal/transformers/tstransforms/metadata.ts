import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ScriptTarget as ScriptTarget__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BodyBase as BodyBase__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassElementOrClassElementParameterIsDecorated as ClassElementOrClassElementParameterIsDecorated__from_ast, ClassExpression as ClassExpression__from_ast, ClassOrConstructorParameterIsDecorated as ClassOrConstructorParameterIsDecorated__from_ast, ExpressionBase as ExpressionBase__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, GetFirstConstructorWithBody as GetFirstConstructorWithBody__from_ast, HasDecorators as HasDecorators__from_ast, IsClassLike as IsClassLike__from_ast, IsDecorator as IsDecorator__from_ast, IsModifier as IsModifier__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, StatementBase as StatementBase__from_ast, SubtreeContainsDecorators$constant as SubtreeContainsDecorators$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { getDecoratorsOfParameters } from "./legacydecorators.js";
import { metadataSerializer, metadataSerializerContext, newMetadataSerializer } from "./typeserializer.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export const USE_NEW_TYPE_METADATA_FORMAT$bool: bool = false;
export class MetadataTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public legacyDecorators: bool, public resolver: EmitResolver__from_printer | undefined, public serializer: metadataSerializer | undefined, public languageVersion: ScriptTarget__from_core, public strictNullChecks: bool, public parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentLexicalScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$tstransforms$getNewTypeMetadata(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let properties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (MetadataTransformer.$go$private$tstransforms$shouldAddTypeMetadata(tx, node)) {
            const __gotots_argument_103 = properties;
            const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_101 = (Transformer__from_transformers.Factory(__gotots_store_100.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "NodeFactory");
            const __gotots_argument_98 = void 0;
            const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_103 = (Transformer__from_transformers.Factory(__gotots_store_102.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_99 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory"), "type");
            const __gotots_argument_100 = void 0;
            const __gotots_argument_101 = void 0;
            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory");
            const __gotots_argument_91 = void 0;
            const __gotots_argument_92 = void 0;
            const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_107 = (Transformer__from_transformers.Factory(__gotots_store_106.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_93 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_94 = void 0;
            const __gotots_argument_95 = void 0;
            const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_109 = (Transformer__from_transformers.Factory(__gotots_store_108.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_96 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
            const __gotots_argument_97 = metadataSerializer.SerializeTypeOfNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer, new metadataSerializerContext((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope, container, false), node, container);
            const __gotots_argument_102 = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_27, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93, __gotots_argument_94, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97);
            const __gotots_argument_104 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_28, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101, __gotots_argument_102);
            properties = __gotots_argument_103.append(void 0, [__gotots_argument_104]);
        }
        if (MetadataTransformer.$go$private$tstransforms$shouldAddParamTypesMetadata(tx, node)) {
            const __gotots_argument_117 = properties;
            const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_111 = (Transformer__from_transformers.Factory(__gotots_store_110.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "NodeFactory");
            const __gotots_argument_112 = void 0;
            const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_113 = (Transformer__from_transformers.Factory(__gotots_store_112.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_113 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory"), "paramTypes");
            const __gotots_argument_114 = void 0;
            const __gotots_argument_115 = void 0;
            const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_115 = (Transformer__from_transformers.Factory(__gotots_store_114.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory");
            const __gotots_argument_105 = void 0;
            const __gotots_argument_106 = void 0;
            const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_117 = (Transformer__from_transformers.Factory(__gotots_store_116.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_107 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_108 = void 0;
            const __gotots_argument_109 = void 0;
            const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_119 = (Transformer__from_transformers.Factory(__gotots_store_118.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_110 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
            const __gotots_argument_111 = metadataSerializer.SerializeParameterTypesOfNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer, new metadataSerializerContext((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope, container, false), node, container);
            const __gotots_argument_116 = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_29, __gotots_argument_105, __gotots_argument_106, __gotots_argument_107, __gotots_argument_108, __gotots_argument_109, __gotots_argument_110, __gotots_argument_111);
            const __gotots_argument_118 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_30, __gotots_argument_112, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116);
            properties = __gotots_argument_117.append(void 0, [__gotots_argument_118]);
        }
        if (MetadataTransformer.$go$private$tstransforms$shouldAddReturnTypeMetadata(tx, node)) {
            const __gotots_argument_131 = properties;
            const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_121 = (Transformer__from_transformers.Factory(__gotots_store_120.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory");
            const __gotots_argument_126 = void 0;
            const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_123 = (Transformer__from_transformers.Factory(__gotots_store_122.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_127 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "NodeFactory"), "returnType");
            const __gotots_argument_128 = void 0;
            const __gotots_argument_129 = void 0;
            const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_125 = (Transformer__from_transformers.Factory(__gotots_store_124.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "NodeFactory");
            const __gotots_argument_119 = void 0;
            const __gotots_argument_120 = void 0;
            const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_127 = (Transformer__from_transformers.Factory(__gotots_store_126.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_121 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
            const __gotots_argument_122 = void 0;
            const __gotots_argument_123 = void 0;
            const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_129 = (Transformer__from_transformers.Factory(__gotots_store_128.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_124 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "NodeFactory"), KindEqualsGreaterThanToken$constant__from_ast());
            const __gotots_argument_125 = metadataSerializer.SerializeReturnTypeOfNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer, new metadataSerializerContext((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope, container, false), node);
            const __gotots_argument_130 = NodeFactory__from_ast.NewArrowFunction(__gotots_receiver_31, __gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124, __gotots_argument_125);
            const __gotots_argument_132 = NodeFactory__from_ast.NewPropertyAssignment(__gotots_receiver_32, __gotots_argument_126, __gotots_argument_127, __gotots_argument_128, __gotots_argument_129, __gotots_argument_130);
            properties = __gotots_argument_131.append(void 0, [__gotots_argument_132]);
        }
        if (properties.length > 0) {
            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_34 = Transformer__from_transformers.Factory(__gotots_store_130.Transformer);
            const __gotots_argument_135 = "design:typeinfo";
            const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_132 = (Transformer__from_transformers.Factory(__gotots_store_131.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeFactory");
            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_134 = (Transformer__from_transformers.Factory(__gotots_store_133.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_133 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "NodeFactory"), properties);
            const __gotots_argument_134 = true;
            const __gotots_argument_136 = NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_33, __gotots_argument_133, __gotots_argument_134);
            let typeInfoMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewMetadataHelper(__gotots_receiver_34, __gotots_argument_135, __gotots_argument_136);
            const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_136 = (Transformer__from_transformers.Factory(__gotots_store_135.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_0 = NodeFactory__from_ast.NewDecorator(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "NodeFactory"), typeInfoMetadata);
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    static $go$private$tstransforms$getOldTypeMetadata(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let decorators = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (MetadataTransformer.$go$private$tstransforms$shouldAddTypeMetadata(tx, node)) {
            const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let typeMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewMetadataHelper(Transformer__from_transformers.Factory(__gotots_store_137.Transformer), "design:type", metadataSerializer.SerializeTypeOfNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer, new metadataSerializerContext((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope, container, false), node, container));
            const __gotots_argument_137 = decorators;
            const __gotots_store_138 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_139 = (Transformer__from_transformers.Factory(__gotots_store_138.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_138 = NodeFactory__from_ast.NewDecorator(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_139, "NodeFactory"), typeMetadata);
            decorators = __gotots_argument_137.append(void 0, [__gotots_argument_138]);
        }
        if (MetadataTransformer.$go$private$tstransforms$shouldAddParamTypesMetadata(tx, node)) {
            const __gotots_store_140 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let paramTypesMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewMetadataHelper(Transformer__from_transformers.Factory(__gotots_store_140.Transformer), "design:paramtypes", metadataSerializer.SerializeParameterTypesOfNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer, new metadataSerializerContext((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope, container, false), node, container));
            const __gotots_argument_139 = decorators;
            const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_142 = (Transformer__from_transformers.Factory(__gotots_store_141.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_140 = NodeFactory__from_ast.NewDecorator(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory"), paramTypesMetadata);
            decorators = __gotots_argument_139.append(void 0, [__gotots_argument_140]);
        }
        if (MetadataTransformer.$go$private$tstransforms$shouldAddReturnTypeMetadata(tx, node)) {
            const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let returnTypeMetadata: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewMetadataHelper(Transformer__from_transformers.Factory(__gotots_store_143.Transformer), "design:returntype", metadataSerializer.SerializeReturnTypeOfNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer, new metadataSerializerContext((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope, container, false), node));
            const __gotots_argument_141 = decorators;
            const __gotots_store_144 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_145 = (Transformer__from_transformers.Factory(__gotots_store_144.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_142 = NodeFactory__from_ast.NewDecorator(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_145, "NodeFactory"), returnTypeMetadata);
            decorators = __gotots_argument_141.append(void 0, [__gotots_argument_142]);
        }
        return decorators;
    }
    static $go$private$tstransforms$getTypeMetadata(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        if (USE_NEW_TYPE_METADATA_FORMAT$bool) {
            return MetadataTransformer.$go$private$tstransforms$getNewTypeMetadata(tx, node, container);
        }
        return MetadataTransformer.$go$private$tstransforms$getOldTypeMetadata(tx, node, container);
    }
    static $go$private$tstransforms$injectClassElementTypeMetadata(tx: MetadataTransformer | undefined, list: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        if (!IsClassLike__from_ast(container)) {
            return list;
        }
        if (!ClassElementOrClassElementParameterIsDecorated__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators, node, container)) {
            return list;
        }
        let metadata = MetadataTransformer.$go$private$tstransforms$getTypeMetadata(tx, node, container);
        if (metadata.length > 0) {
            let originalNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (!(list === undefined)) {
                originalNodes = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                    ModifierList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
            }
            if (originalNodes.length === 0) {
                const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_97 = (Transformer__from_transformers.Factory(__gotots_store_96.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let res__shadow_1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "NodeFactory"), metadata);
                if (!(list === undefined)) {
                    (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                        ModifierList__from_ast.$storageOf(((res__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                        ModifierList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc)));
                }
                return res__shadow_1;
            }
            let modifiersArray = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            let decos = Filter$PointerTo_Named_ast$Node(originalNodes, IsDecorator__from_ast);
            modifiersArray = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modifiersArray, decos, void 0);
            modifiersArray = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modifiersArray, metadata, void 0);
            let modifiers = Filter$PointerTo_Named_ast$Node(originalNodes, IsModifier__from_ast);
            modifiersArray = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modifiersArray, modifiers, void 0);
            const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_99 = (Transformer__from_transformers.Factory(__gotots_store_98.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let res: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "NodeFactory"), modifiersArray);
            (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc)));
            return res;
        }
        return list;
    }
    static $go$private$tstransforms$injectClassTypeMetadata(tx: MetadataTransformer | undefined, list: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        let metadata = MetadataTransformer.$go$private$tstransforms$getTypeMetadata(tx, node, node);
        if (metadata.length > 0) {
            let originalNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (!(list === undefined)) {
                originalNodes = (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                    ModifierList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes;
            }
            if (originalNodes.length === 0) {
                const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_93 = (Transformer__from_transformers.Factory(__gotots_store_92.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let res__shadow_1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeFactory"), metadata);
                if (!(list === undefined)) {
                    (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                        ModifierList__from_ast.$storageOf(((res__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                        ModifierList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc)));
                }
                return res__shadow_1;
            }
            let modifiersArray = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            if (IsModifier__from_ast(originalNodes.get(0)) && (Node__from_ast.$storageOf(((originalNodes.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast() || Node__from_ast.$storageOf(((originalNodes.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportKeyword$constant__from_ast())) {
                modifiersArray = modifiersArray.append(void 0, [originalNodes.get(0)]);
                if (originalNodes.length > 1 && (Node__from_ast.$storageOf(((originalNodes.get(1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast() || Node__from_ast.$storageOf(((originalNodes.get(1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportKeyword$constant__from_ast())) {
                    modifiersArray = modifiersArray.append(void 0, [originalNodes.get(1)]);
                }
            }
            let restStart = modifiersArray.length;
            let decos = Filter$PointerTo_Named_ast$Node(originalNodes, IsDecorator__from_ast);
            modifiersArray = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modifiersArray, decos, void 0);
            modifiersArray = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modifiersArray, metadata, void 0);
            let otherModifiers = Filter$PointerTo_Named_ast$Node(originalNodes.slice(restStart, null, null), IsModifier__from_ast);
            modifiersArray = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(modifiersArray, otherModifiers, void 0);
            const __gotots_store_94 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_95 = (Transformer__from_transformers.Factory(__gotots_store_94.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let res: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeFactory"), modifiersArray);
            (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc)));
            return res;
        }
        return list;
    }
    static $go$private$tstransforms$setCurrentLexicalScope(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope = node;
    }
    static $go$private$tstransforms$setParent(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent = node;
    }
    static $go$private$tstransforms$shouldAddParamTypesMetadata(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindClassDeclaration$constant__from_ast():
            case KindClassExpression$constant__from_ast(): {
                return !(GetFirstConstructorWithBody__from_ast(node) === undefined);
                break;
            }
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast(): {
                return true;
                break;
            }
        }
        return false;
    }
    static $go$private$tstransforms$shouldAddReturnTypeMetadata(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast();
    }
    static $go$private$tstransforms$shouldAddTypeMetadata(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindMethodDeclaration$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast(): {
                return true;
                break;
            }
        }
        return false;
    }
    static $go$private$tstransforms$visit(tx: MetadataTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (((Node__from_ast.SubtreeFacts(node) & SubtreeContainsDecorators$constant__from_ast()) >>> 0) === 0) {
                        __gotots_return_0 = node;
                        break __gotots_return_block_0;
                    }
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindClassDeclaration$constant__from_ast(): {
                            __gotots_return_0 = MetadataTransformer.$go$private$tstransforms$visitClassDeclaration(tx, Node__from_ast.AsClassDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassExpression$constant__from_ast(): {
                            __gotots_return_0 = MetadataTransformer.$go$private$tstransforms$visitClassExpression(tx, Node__from_ast.AsClassExpression(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindPropertyDeclaration$constant__from_ast(): {
                            __gotots_return_0 = MetadataTransformer.$go$private$tstransforms$visitPropertyDeclaration(tx, Node__from_ast.AsPropertyDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindMethodDeclaration$constant__from_ast(): {
                            __gotots_return_0 = MetadataTransformer.$go$private$tstransforms$visitMethodDeclaration(tx, Node__from_ast.AsMethodDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSetAccessor$constant__from_ast(): {
                            __gotots_return_0 = MetadataTransformer.$go$private$tstransforms$visitSetAccessor(tx, Node__from_ast.AsSetAccessorDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindGetAccessor$constant__from_ast(): {
                            __gotots_return_0 = MetadataTransformer.$go$private$tstransforms$visitGetAccessor(tx, Node__from_ast.AsGetAccessorDeclaration(node));
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSourceFile$constant__from_ast(): {
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent = void 0;
                            const __gotots_receiver_2 = tx;
                            const __gotots_argument_2 = void 0;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                MetadataTransformer.$go$private$tstransforms$setParent(__gotots_receiver_2, __gotots_argument_2);
                            });
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope = node;
                            const __gotots_receiver_3 = tx;
                            const __gotots_argument_3 = void 0;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                MetadataTransformer.$go$private$tstransforms$setCurrentLexicalScope(__gotots_receiver_3, __gotots_argument_3);
                            });
                            const __gotots_argument_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                            const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_5 = Transformer__from_transformers.Factory(__gotots_store_1.Transformer);
                            const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_6 = Transformer__from_transformers.EmitContext(__gotots_store_2.Transformer);
                            const __gotots_argument_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).languageVersion;
                            const __gotots_argument_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).strictNullChecks;
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).serializer = newMetadataSerializer(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                            const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_3.Transformer), node);
                            const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_4 = Transformer__from_transformers.EmitContext(__gotots_store_4.Transformer);
                            const __gotots_argument_9 = updated;
                            const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_10 = EmitContext__from_printer.ReadEmitHelpers(Transformer__from_transformers.EmitContext(__gotots_store_5.Transformer));
                            EmitContext__from_printer.AddEmitHelper(__gotots_receiver_4, __gotots_argument_9, __gotots_argument_10);
                            __gotots_return_0 = updated;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindModuleBlock$constant__from_ast():
                        case KindBlock$constant__from_ast():
                        case KindCaseBlock$constant__from_ast(): {
                            let oldScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope;
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentLexicalScope = node;
                            const __gotots_receiver_5 = tx;
                            const __gotots_argument_11 = oldScope;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                MetadataTransformer.$go$private$tstransforms$setCurrentLexicalScope(__gotots_receiver_5, __gotots_argument_11);
                            });
                            const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_6.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_7.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$tstransforms$visitClassDeclaration(tx: MetadataTransformer | undefined, node: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let oldParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent;
                    const __gotots_store_8 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_8, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_receiver_3 = tx;
                    const __gotots_argument_9 = oldParent;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        MetadataTransformer.$go$private$tstransforms$setParent(__gotots_receiver_3, __gotots_argument_9);
                    };
                    const __gotots_argument_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators;
                    const __gotots_store_9 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_11 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_9, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (!ClassOrConstructorParameterIsDecorated__from_ast(__gotots_argument_10, __gotots_argument_11)) {
                        const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_4 = Transformer__from_transformers.Visitor(__gotots_store_10.Transformer);
                        const __gotots_store_11 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                        const __gotots_argument_12 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_11, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_4, __gotots_argument_12);
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_6 = tx;
                    const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_5 = Transformer__from_transformers.Visitor(__gotots_store_12.Transformer);
                    const __gotots_store_13: ClassDeclaration__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                    const __gotots_argument_13 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "ModifiersBase"));
                    const __gotots_argument_14 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_5, __gotots_argument_13);
                    const __gotots_store_14 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_15 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_14, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = MetadataTransformer.$go$private$tstransforms$injectClassTypeMetadata(__gotots_receiver_6, __gotots_argument_14, __gotots_argument_15);
                    const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_16 = (Transformer__from_transformers.Factory(__gotots_store_15.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory");
                    const __gotots_argument_16 = node;
                    const __gotots_argument_17 = modifiers;
                    const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_18 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_17.Transformer), ClassDeclaration__from_ast.Name(node));
                    const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_19 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_18.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters);
                    const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_20 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_19.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                    const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_21 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_20.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateClassDeclaration(__gotots_receiver_7, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
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
    static $go$private$tstransforms$visitClassExpression(tx: MetadataTransformer | undefined, node: {
        value: ClassExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let oldParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent;
                    const __gotots_store_21 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_21, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_receiver_7 = tx;
                    const __gotots_argument_21 = oldParent;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        MetadataTransformer.$go$private$tstransforms$setParent(__gotots_receiver_7, __gotots_argument_21);
                    };
                    const __gotots_argument_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).legacyDecorators;
                    const __gotots_store_22 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_23 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_22, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (!ClassOrConstructorParameterIsDecorated__from_ast(__gotots_argument_22, __gotots_argument_23)) {
                        const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_8 = Transformer__from_transformers.Visitor(__gotots_store_23.Transformer);
                        const __gotots_store_24 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                        const __gotots_argument_24 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_24, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_8, __gotots_argument_24);
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_10 = tx;
                    const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_9 = Transformer__from_transformers.Visitor(__gotots_store_25.Transformer);
                    const __gotots_store_26: ClassExpression__from_ast["ClassLikeBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                    const __gotots_argument_25 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "ModifiersBase"));
                    const __gotots_argument_26 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_9, __gotots_argument_25);
                    const __gotots_store_27 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                            PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_27 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_27, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = MetadataTransformer.$go$private$tstransforms$injectClassTypeMetadata(__gotots_receiver_10, __gotots_argument_26, __gotots_argument_27);
                    const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_29 = (Transformer__from_transformers.Factory(__gotots_store_28.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory");
                    const __gotots_argument_28 = node;
                    const __gotots_argument_29 = modifiers;
                    const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_30 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_30.Transformer), ClassExpression__from_ast.Name(node));
                    const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_31 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_31.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters);
                    const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_32 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_32.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                    const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_33 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_33.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
                    __gotots_return_0 = NodeFactory__from_ast.UpdateClassExpression(__gotots_receiver_11, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
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
    static $go$private$tstransforms$visitGetAccessor(tx: MetadataTransformer | undefined, node: {
        value: GetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_78 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_77 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_78, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!HasDecorators__from_ast(__gotots_argument_77)) {
            const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_23 = Transformer__from_transformers.Visitor(__gotots_store_79.Transformer);
            const __gotots_store_80 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
            const __gotots_argument_78 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_80, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_23, __gotots_argument_78);
        }
        const __gotots_receiver_25 = tx;
        const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_24 = Transformer__from_transformers.Visitor(__gotots_store_81.Transformer);
        const __gotots_store_82: GetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_79 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_82, "NamedMemberBase"));
        const __gotots_argument_80 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_24, __gotots_argument_79);
        const __gotots_store_83 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_81 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_83, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent;
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = MetadataTransformer.$go$private$tstransforms$injectClassElementTypeMetadata(__gotots_receiver_25, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82);
        const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_85 = (Transformer__from_transformers.Factory(__gotots_store_84.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_85, "NodeFactory");
        const __gotots_argument_83 = node;
        const __gotots_argument_84 = modifiers;
        const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_85 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_86.Transformer), GetAccessorDeclaration__from_ast.Name(node));
        const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_86 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_87.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters);
        const __gotots_store_88 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_87 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_88.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_88 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_89.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type);
        const __gotots_store_90 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_89 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_90.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature);
        const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_90 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_91.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body);
        return NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_26, __gotots_argument_83, __gotots_argument_84, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89, __gotots_argument_90);
    }
    static $go$private$tstransforms$visitMethodDeclaration(tx: MetadataTransformer | undefined, node: {
        value: MethodDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_46 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_45 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_46, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let __gotots_logical_result_0 = !HasDecorators__from_ast(__gotots_argument_45);
        if (__gotots_logical_result_0) {
            const __gotots_store_47 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_46 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_47, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_binary_operand_0 = getDecoratorsOfParameters(__gotots_argument_46).length;
            const __gotots_binary_operand_1 = 0;
            __gotots_logical_result_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
        }
        if (__gotots_logical_result_0) {
            const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_15 = Transformer__from_transformers.Visitor(__gotots_store_48.Transformer);
            const __gotots_store_49 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_47 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_49, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_15, __gotots_argument_47);
        }
        const __gotots_receiver_17 = tx;
        const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_16 = Transformer__from_transformers.Visitor(__gotots_store_50.Transformer);
        const __gotots_store_51 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_48 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NamedMemberBase"));
        const __gotots_argument_49 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_16, __gotots_argument_48);
        const __gotots_store_52 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_50 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_52, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent;
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = MetadataTransformer.$go$private$tstransforms$injectClassElementTypeMetadata(__gotots_receiver_17, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
        const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_54 = (Transformer__from_transformers.Factory(__gotots_store_53.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory");
        const __gotots_argument_52 = node;
        const __gotots_argument_53 = modifiers;
        const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_54 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_55.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken);
        const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_55 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_56.Transformer), MethodDeclaration__from_ast.Name(node));
        const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_56 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_57.Transformer), NamedMemberBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken);
        const __gotots_store_58 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_57 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_58.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters);
        const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_58 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_59.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_store_60 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_59 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_60.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Type);
        const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_60 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_61.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature);
        const __gotots_store_62 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_61 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_62.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
        return NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_18, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
    }
    static $go$private$tstransforms$visitPropertyDeclaration(tx: MetadataTransformer | undefined, node: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_34 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_33 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_34, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!HasDecorators__from_ast(__gotots_argument_33)) {
            const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_11 = Transformer__from_transformers.Visitor(__gotots_store_35.Transformer);
            const __gotots_store_36 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_34 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_36, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_11, __gotots_argument_34);
        }
        const __gotots_receiver_13 = tx;
        const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_12 = Transformer__from_transformers.Visitor(__gotots_store_37.Transformer);
        const __gotots_store_38 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_35 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "NamedMemberBase"));
        const __gotots_argument_36 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_12, __gotots_argument_35);
        const __gotots_store_39 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_37 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_39, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent;
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = MetadataTransformer.$go$private$tstransforms$injectClassElementTypeMetadata(__gotots_receiver_13, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
        const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_41 = (Transformer__from_transformers.Factory(__gotots_store_40.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "NodeFactory");
        const __gotots_argument_39 = node;
        const __gotots_argument_40 = modifiers;
        const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_41 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_42.Transformer), PropertyDeclaration__from_ast.Name(node));
        const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_42 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_43.Transformer), NamedMemberBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken);
        const __gotots_store_44 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_43 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_44.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type);
        const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_44 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_45.Transformer), (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
        return NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_14, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44);
    }
    static $go$private$tstransforms$visitSetAccessor(tx: MetadataTransformer | undefined, node: {
        value: SetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_63 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_62 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_63, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let __gotots_logical_result_1 = !HasDecorators__from_ast(__gotots_argument_62);
        if (__gotots_logical_result_1) {
            const __gotots_store_64 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
            const __gotots_argument_63 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_64, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_binary_operand_2 = getDecoratorsOfParameters(__gotots_argument_63).length;
            const __gotots_binary_operand_3 = 0;
            __gotots_logical_result_1 = __gotots_binary_operand_2 === __gotots_binary_operand_3;
        }
        if (__gotots_logical_result_1) {
            const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_19 = Transformer__from_transformers.Visitor(__gotots_store_65.Transformer);
            const __gotots_store_66 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
            const __gotots_argument_64 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_66, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_19, __gotots_argument_64);
        }
        const __gotots_receiver_21 = tx;
        const __gotots_store_67 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_20 = Transformer__from_transformers.Visitor(__gotots_store_67.Transformer);
        const __gotots_store_68: SetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
        const __gotots_argument_65 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "NamedMemberBase"));
        const __gotots_argument_66 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_20, __gotots_argument_65);
        const __gotots_store_69 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_67 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_69, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parent;
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = MetadataTransformer.$go$private$tstransforms$injectClassElementTypeMetadata(__gotots_receiver_21, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68);
        const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_71 = (Transformer__from_transformers.Factory(__gotots_store_70.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeFactory");
        const __gotots_argument_69 = node;
        const __gotots_argument_70 = modifiers;
        const __gotots_store_72 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_71 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_72.Transformer), SetAccessorDeclaration__from_ast.Name(node));
        const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_72 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_73.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters);
        const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_73 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_74.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
        const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_74 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_75.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type);
        const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_75 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_76.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).FullSignature);
        const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_76 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_77.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body);
        return NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_22, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76);
    }
}
export function NewMetadataTransformer(opt: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: MetadataTransformer | undefined = new MetadataTransformer(Transformer__from_transformers.$zero(), Tristate_IsTrue__from_core(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators), (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitResolver, void 0, CompilerOptions__from_core.GetEmitScriptTarget((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions), CompilerOptions__from_core.GetStrictOptionValue((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions, ((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictNullChecks), void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return MetadataTransformer.$go$private$tstransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
